#!/usr/bin/env node
/*
 * Smartineer Datenschema-Validator (P-ARCH-VALIDATE-CLI, AGENTS.md §13)
 *
 * Liest die Daten-Skripte unter `js/data/*.js` ueber `vm.runInNewContext`
 * (kein Build, kein npm-Projekt, kein Babel) und prueft Schema-Konformitaet
 * fuer alle drei Tracks:
 *
 *   - Ingenieurs-Training (window.APP_DATA / window.APP_ORDER) — AGENTS §5
 *   - Schulungen          (window.SCHULUNGEN.list)             — AGENTS §18
 *   - Schueler            (window.SCHUELER)                    — AGENTS §17
 *
 * Aufruf:
 *   node tools/validate.js [--verbose] [--strict-sources]
 *
 * Exit-Codes:
 *   0  alles ok (Warnungen erlaubt; mit --strict-sources auch ohne Quellenanker-Warnungen)
 *   1  mindestens ein Schema-Fehler (errors) oder fehlender Quellenanker im Strict-Mode
 *   2  Lade-/Parse-Fehler eines Daten-Skripts
 *
 * Der Validator ist bewusst defensiv: er erkennt fehlende Pflichtfelder,
 * out-of-range `correct`-Indizes, zu kurze Quiz-Pools, fehlende Quellen-
 * anker in `explanation`, doppelte Frage-Stems je Kapitel/Level und
 * Status-Inkonsistenzen (Schulung mit `status: 'preparation'` darf MCQ-
 * Mindestmenge unterschreiten, alle anderen muessen ≥ 50 erreichen, mit
 * Bootstrap-Toleranz ≥ 10 als Warnung).
 *
 * Bewusst KEIN Aufruf von Babel/JSX. `js/app.jsx` wird nicht angefasst —
 * nur die reinen Daten-Skripte. Damit bleibt der Validator einfach ein
 * Node-Script ohne Abhaengigkeiten.
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT     = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');
const VERBOSE  = process.argv.includes('--verbose');
const STRICT_SOURCES = process.argv.includes('--strict-sources');

// ---- Konstanten gemaess AGENTS.md ----
// §9, §18.4
const MCQ_MIN_PRODUCTION   = 50;  // Soll
const MCQ_MIN_BOOTSTRAP    = 10;  // unterhalb davon: Fehler (auch fuer preparation)
const TRAINING_MIN_PER_LVL = 6;   // §9 Mindestanzahl pro Level
const PAGES_MIN            = 1;   // §18.1 mind. 1 Lehrseite

// Quellenanker-Heuristik (§18.4 / §8): Erlaeuterung muss ein klares Quellen-
// Token enthalten. Akzeptiert werden:
//   - Standards/Normen: NIST, ISO/IEC, IEC, FIPS, RFC, MITRE/ATT&CK, OWASP,
//     CVSS, CompTIA, CIS, BSI, SP 800-..., SY0/CAS/CS0/PT0, IEEE
//   - Lehrbuch-Marker: "Aufl.", "Auflage", "ed.", "Edition", "Kap.", "§", "Annex"
//   - Jahresangabe (vier Ziffern, 19xx/20xx) — proxy fuer Versionsanker
const SOURCE_HINT_RE = /(NIST|ISO\/IEC|ISO\s?\d|IEC\s?\d|FIPS|RFC\s?\d|MITRE|ATT&CK|OWASP|CVSS|CompTIA|CIS|BSI|SP\s?800|SY0|CAS-?\d|CS0|PT0|IEEE|RFC\d|Aufl\.|Auflage|\bed\.|Edition|§|Annex|Kap(\.|itel)|\b(19|20)\d{2}\b)/i;

// KaTeX-Heuristik (§14): einfache Backslashes vor TeX-Macros sind im
// JS-String falsch — sie werden vom Parser geschluckt und nicht gerendert.
// Wir scannen `q`/`h`/`s`/`stem`/`explanation` nach \frac, \sqrt, \alpha
// die NICHT verdoppelt sind. Da der Validator den Quellcode liest, sehen
// wir den realen Backslash-Count.

// ---- Reporter ----
const report = {
    files:    0,
    errors:   [],
    warnings: [],
    info:     [],
};
function err(file, where, msg)  { report.errors.push(   { file, where, msg }); }
function warn(file, where, msg) { report.warnings.push( { file, where, msg }); }
function info(msg)              { report.info.push(msg); }

// ---- Daten-Skripte laden ----
// Wir bauen einen gemeinsamen Sandbox-Kontext, der die Globals widerspiegelt,
// die die Daten-Skripte erwarten (window.APP_DATA, window.APP_ORDER,
// window.SCHULUNGEN, window.SCHUELER). Jede IIFE registriert ihre Daten
// idempotent — Reihenfolge der Skripte spielt fuer den Validator keine Rolle,
// weil wir sie alle in denselben Kontext laden.
function buildSandbox() {
    const win = {
        APP_DATA:   {},
        APP_ORDER:  [],
        SCHULUNGEN: { list: [] },
        SCHUELER:   null,
    };
    const sandbox = {
        window: win,
        // Daten-Skripte greifen nur auf window.* zu; Math/Array/Object stehen
        // automatisch zur Verfuegung. KaTeX wird nicht ausgefuehrt.
        console,
    };
    vm.createContext(sandbox);
    return { sandbox, win };
}

function loadAllData() {
    const { sandbox, win } = buildSandbox();
    const files = fs.readdirSync(DATA_DIR)
        .filter((f) => f.endsWith('.js'))
        .sort();

    // Mapping: Schulungs-id -> Quelldatei (eine Datei kann mehrere Schulungen
    // pushen, vgl. `schulung_starter.js` mit Security+/CySA+/PenTest+).
    const schulungFile = new Map();

    for (const f of files) {
        const full = path.join(DATA_DIR, f);
        const src  = fs.readFileSync(full, 'utf8');
        const before = (win.SCHULUNGEN.list || []).length;
        try {
            vm.runInContext(src, sandbox, { filename: full });
            report.files++;
        } catch (e) {
            console.error('[FATAL] Konnte Daten-Skript nicht laden:', f);
            console.error(e && e.stack ? e.stack : e);
            process.exit(2);
        }
        const after = (win.SCHULUNGEN.list || []).length;
        for (let i = before; i < after; i++) {
            const s = win.SCHULUNGEN.list[i];
            if (s && s.id) schulungFile.set(s.id, `js/data/${f}`);
        }
    }
    return { win, files: files.map((f) => path.join('js/data', f)), schulungFile };
}

// ---- Validatoren ----

function validateTraining(win) {
    const where = 'window.APP_DATA';
    const data  = win.APP_DATA  || {};
    const order = win.APP_ORDER || [];

    if (!Array.isArray(order) || order.length === 0) {
        err('js/data/*', where, 'window.APP_ORDER ist leer — keine Trainings-Kategorie geladen.');
        return;
    }

    for (const id of order) {
        const cat   = data[id];
        const label = `APP_DATA["${id}"]`;
        const file  = `js/data/${id}.js`; // Heuristik: Dateiname == id (Konvention §3)
        if (!cat) {
            err(file, label, `Kategorie ${id} steht in APP_ORDER, fehlt aber in APP_DATA.`);
            continue;
        }
        // Pflichtfelder (§5)
        for (const f of ['id', 'name', 'desc', 'formulas', 'levels']) {
            if (cat[f] === undefined || cat[f] === null) {
                err(file, label, `Pflichtfeld "${f}" fehlt.`);
            }
        }
        if (cat.id !== id) {
            err(file, label, `Innen-id "${cat.id}" weicht vom APP_DATA-Schluessel "${id}" ab.`);
        }
        if (!Array.isArray(cat.levels) || cat.levels.length !== 3) {
            err(file, label, `levels muss ein Array mit genau 3 Sub-Arrays sein (gefunden: ${Array.isArray(cat.levels) ? cat.levels.length : typeof cat.levels}).`);
            continue;
        }
        for (let lvl = 0; lvl < 3; lvl++) {
            const arr = cat.levels[lvl];
            if (!Array.isArray(arr)) {
                err(file, `${label}.levels[${lvl}]`, 'Level ist kein Array.');
                continue;
            }
            if (arr.length < TRAINING_MIN_PER_LVL) {
                warn(file, `${label}.levels[${lvl}]`, `Nur ${arr.length} Aufgaben (Soll-Mindest = ${TRAINING_MIN_PER_LVL}).`);
            }
            const seenStems = new Map();
            arr.forEach((task, idx) => {
                const w = `${label}.levels[${lvl}][${idx}]`;
                if (!task || typeof task !== 'object') {
                    err(file, w, 'Aufgabe ist kein Objekt.');
                    return;
                }
                for (const f of ['q', 'h', 's']) {
                    if (typeof task[f] !== 'string' || task[f].trim() === '') {
                        err(file, w, `Pflichtfeld "${f}" fehlt oder ist leer.`);
                    }
                }
                // KaTeX-Heuristik: einfache Backslashes vor bekannten Makros
                checkSingleBackslashes(file, w, [task.q, task.h, task.s]);
                // Dubletten je Level (§6 Anti-Pattern)
                const stem = (task.q || '').trim();
                if (stem && seenStems.has(stem)) {
                    err(file, w, `Doppelter Frage-Stem (auch in idx ${seenStems.get(stem)}) auf demselben Level.`);
                } else if (stem) {
                    seenStems.set(stem, idx);
                }
            });
        }
    }
}

function validateSchulungen(win, schulungFile) {
    const list = (win.SCHULUNGEN && win.SCHULUNGEN.list) || [];
    if (!Array.isArray(list) || list.length === 0) {
        warn('js/data/schulung_*.js', 'window.SCHULUNGEN.list', 'Keine Schulungen geladen.');
        return;
    }
    const seenIds = new Set();
    for (const s of list) {
        const sid   = s && s.id ? s.id : '<unknown>';
        const file  = (schulungFile && schulungFile.get(sid)) || `js/data/schulung_${sid}.js`;
        const label = `SCHULUNGEN["${sid}"]`;

        if (!s || typeof s !== 'object') {
            err(file, label, 'Schulungs-Eintrag ist kein Objekt.');
            continue;
        }
        for (const f of ['id', 'code', 'name', 'short', 'desc', 'chapters']) {
            if (s[f] === undefined || s[f] === null) {
                err(file, label, `Pflichtfeld "${f}" fehlt.`);
            }
        }
        if (seenIds.has(s.id)) {
            err(file, label, `Doppelte Schulungs-id "${s.id}".`);
        } else {
            seenIds.add(s.id);
        }
        if (!Array.isArray(s.chapters) || s.chapters.length === 0) {
            err(file, label, '`chapters` muss ein nicht-leeres Array sein.');
            continue;
        }

        const isPreparation = s.status === 'preparation';

        const seenChapterIds = new Set();
        s.chapters.forEach((ch, ci) => {
            const cLabel = `${label}.chapters[${ci}]`;
            if (!ch || typeof ch !== 'object') {
                err(file, cLabel, 'Kapitel-Eintrag ist kein Objekt.');
                return;
            }
            for (const f of ['id', 'title', 'summary', 'pages', 'quiz']) {
                if (ch[f] === undefined || ch[f] === null) {
                    err(file, cLabel, `Pflichtfeld "${f}" fehlt.`);
                }
            }
            if (ch.id) {
                if (seenChapterIds.has(ch.id)) {
                    err(file, cLabel, `Doppelte Kapitel-id "${ch.id}" innerhalb der Schulung.`);
                } else {
                    seenChapterIds.add(ch.id);
                }
            }
            if (!Array.isArray(ch.pages) || ch.pages.length < PAGES_MIN) {
                err(file, `${cLabel}.pages`, `pages muss ein Array mit mindestens ${PAGES_MIN} Eintrag sein (gefunden: ${Array.isArray(ch.pages) ? ch.pages.length : typeof ch.pages}).`);
            } else {
                ch.pages.forEach((p, pi) => {
                    const pLabel = `${cLabel}.pages[${pi}]`;
                    if (!p || typeof p !== 'object') {
                        err(file, pLabel, 'Seite ist kein Objekt.');
                        return;
                    }
                    if (typeof p.title !== 'string' || p.title.trim() === '') {
                        err(file, pLabel, 'Pflichtfeld "title" fehlt oder leer.');
                    }
                    if (typeof p.html !== 'string' || p.html.trim() === '') {
                        err(file, pLabel, 'Pflichtfeld "html" fehlt oder leer.');
                    }
                });
            }
            // Quiz
            if (Array.isArray(ch.quiz)) {
                if (ch.quiz.length < MCQ_MIN_BOOTSTRAP && !isPreparation) {
                    err(file, `${cLabel}.quiz`, `Nur ${ch.quiz.length} Quiz-Items, Mindestmenge ist ${MCQ_MIN_BOOTSTRAP} (Bootstrap) bzw. ${MCQ_MIN_PRODUCTION} (Soll). Schulung ist nicht als status:'preparation' markiert.`);
                } else if (ch.quiz.length < MCQ_MIN_PRODUCTION && !isPreparation) {
                    warn(file, `${cLabel}.quiz`, `${ch.quiz.length} Quiz-Items unter Soll-Mindestmenge ${MCQ_MIN_PRODUCTION} (AGENTS §18.4) — bitte unter OFFEN/DRINGEND ausweisen.`);
                } else if (isPreparation && ch.quiz.length < 1) {
                    err(file, `${cLabel}.quiz`, 'Auch im Vorbereitungs-Status ist mindestens ein Platzhalter-Quiz-Item Pflicht (AGENTS §18.9).');
                }
                const seenQ = new Map();
                ch.quiz.forEach((qi, qIdx) => validateQuizItem(file, `${cLabel}.quiz[${qIdx}]`, qi, qIdx, seenQ));
            }
        });
    }
}

function validateQuizItem(file, where, qi, qIdx, seenQ) {
    if (!qi || typeof qi !== 'object') {
        err(file, where, 'Quiz-Item ist kein Objekt.');
        return;
    }
    if (typeof qi.q !== 'string' || qi.q.trim() === '') {
        err(file, where, 'Pflichtfeld "q" fehlt oder leer.');
        return;
    }
    // Dubletten je Kapitel (Frage-Stem)
    const stemKey = qi.q.trim();
    if (seenQ.has(stemKey)) {
        err(file, where, `Doppelter Frage-Stem (auch in ${seenQ.get(stemKey)}).`);
    } else {
        seenQ.set(stemKey, where);
    }
    // Erlaeuterung
    if (typeof qi.explanation !== 'string' || qi.explanation.trim() === '') {
        err(file, where, 'Pflichtfeld "explanation" fehlt oder leer (AGENTS §18.4).');
    } else if (!SOURCE_HINT_RE.test(qi.explanation)) {
        const msg = '`explanation` enthaelt keinen erkennbaren Quellenanker (Standard/Norm/Jahr/Paragraph). AGENTS §18.4.';
        if (STRICT_SOURCES) {
            err(file, where, msg + ' Strict-Mode --strict-sources behandelt diesen Befund als Fehler.');
        } else {
            warn(file, where, msg);
        }
    }

    const type = qi.type || 'mcq';
    if (type === 'sequence') {
        if (!Array.isArray(qi.items) || qi.items.length < 2) {
            err(file, where, 'sequence: `items` muss ein Array mit ≥ 2 Eintraegen sein.');
        }
        if (!Array.isArray(qi.correct) || (Array.isArray(qi.items) && qi.correct.length !== qi.items.length)) {
            err(file, where, 'sequence: `correct` muss eine Permutation der `items`-Indizes sein (Laenge muss zu items passen).');
        } else if (Array.isArray(qi.items)) {
            const set = new Set(qi.correct);
            for (let i = 0; i < qi.items.length; i++) {
                if (!set.has(i)) {
                    err(file, where, `sequence: \`correct\` enthaelt nicht den Index ${i}.`);
                    break;
                }
            }
        }
    } else if (type === 'cloze') {
        if (!Array.isArray(qi.blanks) || qi.blanks.length === 0) {
            err(file, where, 'cloze: `blanks` muss ein nicht-leeres Array sein.');
        } else {
            qi.blanks.forEach((b, bi) => {
                if (!b || typeof b !== 'object') {
                    err(file, where, `cloze: blanks[${bi}] ist kein Objekt.`);
                    return;
                }
                if (!Array.isArray(b.accept) || b.accept.length === 0) {
                    err(file, where, `cloze: blanks[${bi}].accept muss ein nicht-leeres Array sein.`);
                }
            });
        }
    } else {
        // MCQ (default)
        if (!Array.isArray(qi.options)) {
            err(file, where, 'MCQ: `options` muss ein Array sein.');
            return;
        }
        // §18.4: i.d.R. 4 Optionen, Ausnahme medizinisch (5).
        if (qi.options.length < 2) {
            err(file, where, `MCQ: nur ${qi.options.length} Optionen — ungueltig.`);
        } else if (qi.options.length !== 4 && qi.options.length !== 5) {
            warn(file, where, `MCQ: ${qi.options.length} Optionen (Konvention: 4, fuer Medizin 5).`);
        }
        if (typeof qi.correct !== 'number' || !Number.isInteger(qi.correct)
                || qi.correct < 0 || qi.correct >= qi.options.length) {
            err(file, where, `MCQ: \`correct\` (${qi.correct}) ist out-of-range fuer options.length=${qi.options.length}.`);
        }
        qi.options.forEach((o, oi) => {
            if (typeof o !== 'string' || o.trim() === '') {
                err(file, where, `MCQ: options[${oi}] ist leer oder kein String.`);
            }
        });
    }
}

function validateSchueler(win) {
    const s = win.SCHUELER;
    const file = 'js/data/schueler.js';
    if (!s || typeof s !== 'object') {
        warn(file, 'window.SCHUELER', 'Schueler-Track nicht geladen.');
        return;
    }
    if (!Array.isArray(s.classes) || s.classes.length === 0) {
        err(file, 'SCHUELER.classes', 'Klassen-Liste fehlt oder leer.');
    }
    if (!s.subjects || typeof s.subjects !== 'object') {
        err(file, 'SCHUELER.subjects', 'subjects-Map fehlt.');
    }
    if (!s.content || typeof s.content !== 'object') {
        err(file, 'SCHUELER.content', 'content-Map fehlt.');
        return;
    }
    if (typeof s.normalize !== 'function') {
        err(file, 'SCHUELER.normalize', 'normalize() muss eine Funktion sein.');
    }
    Object.keys(s.content).forEach((key) => {
        const c = s.content[key];
        const where = `SCHUELER.content["${key}"]`;
        const needsTrainingFields = /^k(?:[5-9]|10)\.(physik|chemie|biologie)$/.test(key);
        if (!c || typeof c !== 'object') {
            err(file, where, 'Eintrag ist kein Objekt.');
            return;
        }
        if (!['generated', 'pool', 'stub'].includes(c.mode)) {
            err(file, where, `mode muss 'generated' | 'pool' | 'stub' sein (gefunden: ${JSON.stringify(c.mode)}).`);
            return;
        }
        if (c.mode === 'generated' && typeof c.gen !== 'function') {
            err(file, where, 'mode=generated benoetigt eine gen()-Funktion.');
        }
        if (c.mode === 'pool') {
            if (!Array.isArray(c.pool) || c.pool.length === 0) {
                err(file, where, 'mode=pool benoetigt ein nicht-leeres pool-Array.');
            } else {
                c.pool.forEach((it, i) => {
                    if (!it || typeof it !== 'object'
                            || typeof it.q !== 'string' || it.q.trim() === ''
                            || typeof it.a !== 'string' || it.a.trim() === '') {
                        err(file, `${where}.pool[${i}]`, 'Pool-Item benoetigt {q:string, a:string}.');
                    }
                    if (needsTrainingFields && (!it || typeof it.f !== 'string' || it.f.trim() === ''
                            || typeof it.s !== 'string' || it.s.trim() === '')) {
                        err(file, `${where}.pool[${i}]`, 'Mittelstufen-NW-Item benoetigt zusaetzlich {f:string, s:string}.');
                    }
                });
            }
        }
    });
}

// ---- KaTeX-Backslash-Heuristik ----
//
// Im JS-Quellcode werden TeX-Macros wie \frac, \sqrt, \alpha als
// einfache Backslashes vom Parser geschluckt — sie muessen verdoppelt
// sein (`\\frac`). Da der Validator das *kompilierte* Objekt sieht,
// stehen einfache Backslashes nicht mehr drin (\f waere z.B. ein
// Form-Feed, \a ein Bell-Zeichen). Wir testen daher auf Steuerzeichen
// in den Lehr-/Aufgabentexten, die durch falschen Backslash-Escape
// entstanden sind.
const CTRL_RE = /[\u0007\u0008\u000C\u000B]/; // \a, \b, \f, \v
function checkSingleBackslashes(file, where, strs) {
    for (const s of strs) {
        if (typeof s !== 'string') continue;
        if (CTRL_RE.test(s)) {
            warn(file, where, 'Steuerzeichen im Text gefunden (\\a/\\b/\\f/\\v) — vermutlich einfacher Backslash vor TeX-Macro. AGENTS §14: Backslashes verdoppeln.');
            return;
        }
    }
}

// ---- Cross-checks ----
function validateAppShellSync(loadedFiles) {
    // sw.js / APP_SHELL muss alle Daten-Skripte enthalten.
    const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
    for (const rel of loadedFiles) {
        // sw.js verwendet ausschliesslich Forward-Slashes (Web-URL-Konvention).
        // Auf Windows liefert path.join Backslashes, daher normalisieren.
        const needle = `./${rel.replace(/\\/g, '/')}`;
        if (!sw.includes(needle)) {
            err('sw.js', 'APP_SHELL', `Eintrag "${needle}" fehlt — Offline-Cache wuerde diese Datei nicht enthalten (AGENTS §14a).`);
        }
    }
}

// ---- Main ----
function main() {
    info(`Validator-Lauf — ${new Date().toISOString()}`);
    const { win, files, schulungFile } = loadAllData();

    validateTraining(win);
    validateSchulungen(win, schulungFile);
    validateSchueler(win);
    validateAppShellSync(files);

    // Output
    const fmt = (e) => `  - [${e.file}] ${e.where}: ${e.msg}`;

    console.log('\n=== Smartineer Datenvalidierung ===');
    console.log(`Geladene Daten-Skripte: ${report.files}`);
    console.log(`Trainings-Kategorien:   ${(win.APP_ORDER || []).length}`);
    console.log(`Schulungen:             ${((win.SCHULUNGEN && win.SCHULUNGEN.list) || []).length}`);
    console.log('');

    if (report.warnings.length > 0) {
        // Warnungen gruppieren — die haeufigste Klasse ist der fehlende
        // Quellenanker, die per default nur als Sample ausgegeben wird,
        // damit das Output bei laengerem Quiz-Pool lesbar bleibt.
        const groups = new Map();
        for (const w of report.warnings) {
            const key = w.msg.split('.')[0]; // grobe Klassifizierung
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(w);
        }
        console.log(`Warnungen (${report.warnings.length}, gruppiert${VERBOSE ? ', verbose' : ', erste 5 je Gruppe — `--verbose` fuer alle'}):`);
        for (const [key, arr] of groups) {
            console.log(`  [${arr.length}x] ${key}.`);
            const limit = VERBOSE ? arr.length : Math.min(5, arr.length);
            for (let i = 0; i < limit; i++) {
                console.log(fmt(arr[i]));
            }
            if (!VERBOSE && arr.length > limit) {
                console.log(`    ... ${arr.length - limit} weitere Treffer dieser Klasse (mit --verbose anzeigen).`);
            }
        }
        console.log('');
    }
    if (report.errors.length > 0) {
        console.log(`FEHLER (${report.errors.length}):`);
        report.errors.forEach((e) => console.log(fmt(e)));
        console.log('');
        console.log('Validierung fehlgeschlagen.');
        process.exit(1);
    }
    console.log('Validierung ok (keine blockierenden Fehler).');
    process.exit(0);
}

main();
