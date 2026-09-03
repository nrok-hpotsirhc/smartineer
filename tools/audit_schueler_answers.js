// Einmal-Audit der Schueler-Pools (P-DATA-SCHUELER-ANSWER-AUDIT).
// Aufruf: node tools/audit_schueler_answers.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const FILES = [
    'js/data/schueler.js',
    'js/data/schueler_200_topups.js',
    'js/data/schueler_topups_v109.js',
    'js/data/schueler_sprachen_v110.js'
];

global.window = {};
const ctx = { window: global.window, console };
vm.createContext(ctx);
FILES.forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }));

const SCH = ctx.window.SCHUELER;
const norm = SCH.normalize;

const stem = (q) => String(q || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

const report = {
    emptyAnswer: [],
    thousandSep: [],
    decimalAnswers: 0,
    contradictions: [],
    duplicateStems: [],
    giveaway: [],
    longAnswer: [],
    total: 0
};

Object.keys(SCH.content).forEach((key) => {
    const cfg = SCH.content[key];
    if (!cfg || cfg.mode !== 'pool' || !Array.isArray(cfg.pool)) return;
    const byStem = new Map();
    cfg.pool.forEach((it, i) => {
        report.total++;
        const a = String(it && it.a != null ? it.a : '');
        const n = norm(a);
        const s = stem(it && it.q);
        if (!n) report.emptyAnswer.push(`${key}[${i}] q=${s.slice(0, 70)} a=${JSON.stringify(a)}`);
        if (/^\d{1,3}(?:\.\d{3})+$/.test(a.trim())) report.thousandSep.push(`${key}[${i}] a=${JSON.stringify(a)}`);
        if (/\d[.,]\d/.test(a)) report.decimalAnswers++;
        if (n.length > 40) report.longAnswer.push(`${key}[${i}] a=${JSON.stringify(a)}`);
        const prev = byStem.get(s);
        if (prev) {
            if (prev.n !== n) report.contradictions.push(`${key}: "${s.slice(0, 80)}" -> ${JSON.stringify(prev.a)} vs ${JSON.stringify(a)}`);
            else report.duplicateStems.push(`${key}: "${s.slice(0, 80)}"`);
        } else {
            byStem.set(s, { a, n });
        }
        // Antwort steht woertlich in der Frage (Loesungsverrat)
        if (n.length >= 5 && stem(it && it.q).replace(/\s+/g, '').includes(n)) {
            report.giveaway.push(`${key}[${i}] a=${JSON.stringify(a)} q=${s.slice(0, 80)}`);
        }
    });
});

const show = (label, arr, max) => {
    console.log(`\n=== ${label}: ${arr.length} ===`);
    arr.slice(0, max || 15).forEach((x) => console.log('  ' + x));
    if (arr.length > (max || 15)) console.log(`  ... (${arr.length - (max || 15)} weitere)`);
};

console.log('Pool-Items gesamt:', report.total);
console.log('Items mit Dezimalantwort:', report.decimalAnswers);
show('Leere Antwort nach normalize', report.emptyAnswer);
show('Tausenderpunkt-Risiko', report.thousandSep);
show('Widersprueche (gleiche Frage, andere Antwort)', report.contradictions, 40);
show('Exakte Dubletten (gleiche Frage, gleiche Antwort)', report.duplicateStems, 40);
show('Antwort woertlich in der Frage', report.giveaway, 25);
show('Sehr lange Antworten (>40 Zeichen normalisiert)', report.longAnswer, 25);
