/*
 * Smartineer — React-App (JSX, in-browser via Babel-standalone, kein Build-Schritt).
 * Daten kommen aus js/data/<id>.js (legen window.APP_DATA und window.APP_ORDER an).
 */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

const STORAGE_KEY = 'wissen_reloaded_progress_v1';
const INSTALL_DISMISS_KEY = 'smartineer_install_dismissed_v1';
const THEME_KEY = 'smartineer_theme_v1'; // 'dark' | 'light' (Default: 'light')
// Schulungen-State (Stand v2): wie v1, mit Versions-Bump fuer Stable-QID-Symmetrie.
// Shape unveraendert: { [trainingId]: { [chapterId]: { lastPage, quizBest, quizLast } } }.
const SCHULUNGEN_KEY = 'smartineer_schulungen_v2';
const SCHULUNGEN_KEY_V1 = 'smartineer_schulungen_v1';
// Spaced Repetition (SM-2 lite): pro Quiz-Item Karteikarte mit Faelligkeit.
// Schema v2 (stable QID): { [trainingId]: { [chapterId]: { [qid]: { ease, interval, due, reps, lapses, last } } } }.
// `qid` ist ein content-Hash (stableQid()) ueber Frage + antwortdefinierende Felder
// (siehe AGENTS.md §11/§18.3). Damit verlieren Quiz-Item-Umsortierungen keinen Lernstand mehr
// — Karteikarten haengen am Inhalt, nicht am 0-basierten Index. Beim ersten App-Start nach
// dem Schema-Bump wird das v1-Format einmalig nach v2 migriert (siehe migrateLegacyStorage()).
const SRS_KEY = 'smartineer_srs_v2';
const SRS_KEY_V1 = 'smartineer_srs_v1';
const SRS_INTERVALS_DAYS = [1, 3, 7, 16, 35, 70, 140]; // SM-2 lite, gestaffelt
// Reader-Notizen und Bookmarks pro Schulungs-Lehrseite (P-LP-NOTES-BOOKMARKS).
// Form: { [trainingId]: { [chapterId]: { [pageIdx]: <value> } } }.
// Notizen-Wert = trimmter String (Plain-Text), Bookmark-Wert = `true`.
// Identitaet ueber `pageIdx` — Drift bei Seiten-Umsortierung ist akzeptiert
// (AGENTS §18.3 / §18.8: Seiten werden bevorzugt angehaengt, nicht mittendrin
// einsortiert). Keine personenbezogenen Daten — Notizen sind reine Lern-
// Markierungen des Anwenders und werden ueber Export/Import mitgenommen.
const READER_NOTES_KEY = 'smartineer_reader_notes_v1';
const READER_BOOKMARKS_KEY = 'smartineer_reader_bookmarks_v1';
// P-UI-READER-TYPOGRAPHY: Shape `{ size: 'sm'|'md'|'lg', wide: bool, lineTall: bool }`.
const READER_TYPO_KEY = 'smartineer_reader_typography_v1';
// ----- Optionen / Auth (Schulungen-Bereich, FRONTEND-ONLY UX-CONVENIENCE) -----
// WICHTIG: Diese Auth ist KEIN echter Schutz — Credentials liegen client-seitig
// in window.SMARTINEER_AUTH (siehe js/auth-credentials.js, gitignored). Im
// DevTools sichtbar. Geeignet nur fuer leichten Zugang-Schutz im Bereich der
// Schulungen, nicht fuer regulatorisch sensible Inhalte.
const AUTH_KEY = 'smartineer_auth_v1'; // { user, role, since (ISO), expires (ISO) }
const AUTH_TEMPORARILY_DISABLED = false; // P-UI-LOGIN-REACTIVATE (v43): Auth-Gate wieder aktiv.
const VISIBLE_CATS_KEY = 'smartineer_visible_categories_v1'; // { [catId]: false } — Default: alle sichtbar
const ADMIN_GLOBAL_KEY = 'smartineer_admin_global_v1'; // reserviert fuer kuenftige globale Settings

// ---------------------------------------------------------------- Export / Import
// Plattform-portables JSON-Format zur Synchronisation des Lernfortschritts
// zwischen Geräten. Enthält bewusst KEINE personenbezogenen Daten — nur
// die in localStorage gehaltenen Lern-Keys. Theme/Install-Dismiss bleiben
// gerätespezifisch und werden NICHT exportiert.
const EXPORT_FORMAT = 'smartineer-progress';
const EXPORT_VERSION = 1;
const EXPORT_KEYS = [STORAGE_KEY, SCHULUNGEN_KEY, SRS_KEY, READER_NOTES_KEY, READER_BOOKMARKS_KEY];

function buildExportPayload() {
    const data = {};
    EXPORT_KEYS.forEach((k) => {
        try {
            const raw = localStorage.getItem(k);
            data[k] = raw ? JSON.parse(raw) : null;
        } catch (e) { data[k] = null; }
    });
    return {
        format: EXPORT_FORMAT,
        version: EXPORT_VERSION,
        exportedAt: new Date().toISOString(),
        data
    };
}

function downloadProgressFile() {
    const payload = buildExportPayload();
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    a.href = url;
    a.download = `smartineer-fortschritt-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Migriert einen aus einer aelteren App-Version exportierten `data`-Block
// (z.B. mit `smartineer_srs_v1` / `smartineer_schulungen_v1`) auf das aktuelle
// v2-Schema. Aufgerufen vor dem eigentlichen Merge — die nachgelagerte Logik
// in mergeProgressKey() arbeitet dann nur mit v2-Keys. Bestehende v2-Eintraege
// im Import gewinnen Vorrang vor v1-Spiegelungen.
function upgradeImportedData(data) {
    if (!data || typeof data !== 'object') return data || {};
    const out = { ...data };
    // Schulungen v1 -> v2: gleiche Form, nur Key.
    if (out[SCHULUNGEN_KEY_V1] && out[SCHULUNGEN_KEY] == null) {
        out[SCHULUNGEN_KEY] = out[SCHULUNGEN_KEY_V1];
    }
    // SRS v1 -> v2: idx-Schluessel auf qid-Schluessel umrechnen.
    if (out[SRS_KEY_V1] && out[SRS_KEY] == null) {
        const v1 = out[SRS_KEY_V1] || {};
        const v2 = {};
        const trainings = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
        trainings.forEach(t => {
            const tState = v1[t.id]; if (!tState) return;
            const tOut = {};
            (t.chapters || []).forEach(ch => {
                const cState = tState[ch.id]; if (!cState) return;
                const cOut = {};
                (ch.quiz || []).forEach((item, idx) => {
                    const card = cState[idx]; if (!card) return;
                    const qid = stableQid(item); if (!qid) return;
                    const prev = cOut[qid];
                    if (!prev || (card.last || '') >= (prev.last || '')) cOut[qid] = card;
                });
                if (Object.keys(cOut).length) tOut[ch.id] = cOut;
            });
            if (Object.keys(tOut).length) v2[t.id] = tOut;
        });
        out[SRS_KEY] = v2;
    }
    return out;
}

function applyImportedPayload(payload, mode) {
    if (!payload || payload.format !== EXPORT_FORMAT) {
        throw new Error('Datei ist keine Smartineer-Fortschrittsdatei.');
    }
    if (typeof payload.version !== 'number' || payload.version > EXPORT_VERSION) {
        throw new Error('Dateiversion wird nicht unterstützt (' + payload.version + ').');
    }
    const incoming = upgradeImportedData(payload.data || {});
    EXPORT_KEYS.forEach((k) => {
        const next = incoming[k];
        if (next === undefined) return;
        if (next === null) {
            if (mode === 'replace') localStorage.removeItem(k);
            return;
        }
        if (mode === 'merge') {
            let current = {};
            try { current = JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { current = {}; }
            const merged = mergeProgressKey(k, current, next);
            localStorage.setItem(k, JSON.stringify(merged));
        } else {
            localStorage.setItem(k, JSON.stringify(next));
        }
    });
}

// Tiefen-Merge speziell für die zwei bekannten Strukturen.
function mergeProgressKey(key, current, incoming) {
    if (key === STORAGE_KEY) {
        // Flach: { 'cat|lvl|idx': 1 } — Vereinigung reicht (gelöst bleibt gelöst).
        return { ...current, ...incoming };
    }
    if (key === SCHULUNGEN_KEY) {
        // { trainingId: { chapterId: { lastPage, quizBest, quizLast } } }
        const out = { ...current };
        Object.keys(incoming || {}).forEach((tid) => {
            const cur = out[tid] || {};
            const inc = incoming[tid] || {};
            const merged = { ...cur };
            Object.keys(inc).forEach((cid) => {
                const a = cur[cid] || {};
                const b = inc[cid] || {};
                merged[cid] = {
                    ...a, ...b,
                    lastPage: Math.max(a.lastPage || 0, b.lastPage || 0),
                    quizBest: pickBetterQuiz(a.quizBest, b.quizBest)
                };
            });
            out[tid] = merged;
        });
        return out;
    }
    if (key === SRS_KEY) {
        // { trainingId: { chapterId: { quizIdx: card } } }
        // Merge pro Karte: jeweils der spaetere "last"-Stempel gewinnt — das spiegelt
        // den juengsten Lernstand wider, ohne Faelligkeiten zu verkuerzen.
        const out = { ...current };
        Object.keys(incoming || {}).forEach((tid) => {
            const curT = out[tid] || {};
            const incT = incoming[tid] || {};
            const mergedT = { ...curT };
            Object.keys(incT).forEach((cid) => {
                const curC = curT[cid] || {};
                const incC = incT[cid] || {};
                const mergedC = { ...curC };
                Object.keys(incC).forEach((idx) => {
                    const a = curC[idx];
                    const b = incC[idx];
                    if (!a) { mergedC[idx] = b; return; }
                    if (!b) { mergedC[idx] = a; return; }
                    const la = a.last || ''; const lb = b.last || '';
                    mergedC[idx] = (lb >= la) ? b : a;
                });
                mergedT[cid] = mergedC;
            });
            out[tid] = mergedT;
        });
        return out;
    }
    if (key === READER_NOTES_KEY) {
        // { trainingId: { chapterId: { pageIdx: 'text' } } }
        // Merge pro Seite: laengerer Notiz-Text gewinnt (Anwender hat mehr geschrieben).
        // Konflikt-Heuristik bewusst simpel — Notizen sind Plain-Text-Markierungen,
        // keine kollaborative Live-Editor-Datenbank.
        const out = { ...current };
        Object.keys(incoming || {}).forEach((tid) => {
            const curT = out[tid] || {};
            const incT = incoming[tid] || {};
            const mergedT = { ...curT };
            Object.keys(incT).forEach((cid) => {
                const curC = curT[cid] || {};
                const incC = incT[cid] || {};
                const mergedC = { ...curC };
                Object.keys(incC).forEach((pidx) => {
                    const a = typeof curC[pidx] === 'string' ? curC[pidx] : '';
                    const b = typeof incC[pidx] === 'string' ? incC[pidx] : '';
                    mergedC[pidx] = (b.length > a.length) ? b : (a || b);
                });
                mergedT[cid] = mergedC;
            });
            out[tid] = mergedT;
        });
        return out;
    }
    if (key === READER_BOOKMARKS_KEY) {
        // { trainingId: { chapterId: { pageIdx: true } } } — Set-Vereinigung.
        const out = { ...current };
        Object.keys(incoming || {}).forEach((tid) => {
            const curT = out[tid] || {};
            const incT = incoming[tid] || {};
            const mergedT = { ...curT };
            Object.keys(incT).forEach((cid) => {
                const curC = curT[cid] || {};
                const incC = incT[cid] || {};
                mergedT[cid] = { ...curC, ...incC };
            });
            out[tid] = mergedT;
        });
        return out;
    }
    return { ...current, ...incoming };
}

function pickBetterQuiz(a, b) {
    if (!a) return b || undefined;
    if (!b) return a;
    const ra = (a.score || 0) / Math.max(1, a.total || 0);
    const rb = (b.score || 0) / Math.max(1, b.total || 0);
    return rb > ra ? b : a;
}

// ---------------------------------------------------------------- Hooks
function useProgress() {
    const [progress, setProgress] = useState(() => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
        catch (e) { return {}; }
    });
    const persist = useCallback((next) => {
        setProgress(next);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
    }, []);
    const setSolved = useCallback((catId, lvl, idx, solved) => {
        const k = `${catId}|${lvl}|${idx}`;
        const next = { ...progress };
        if (solved) next[k] = 1; else delete next[k];
        persist(next);
    }, [progress, persist]);
    const isSolved = useCallback((catId, lvl, idx) =>
        !!progress[`${catId}|${lvl}|${idx}`], [progress]);
    const reset = useCallback(() => persist({}), [persist]);
    return { progress, isSolved, setSolved, reset };
}

function useKaTeX(deps) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current || !window.renderMathInElement) return;
        try {
            window.renderMathInElement(ref.current, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        } catch (e) { /* ignore render errors */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return ref;
}

// Auth: liest window.SMARTINEER_AUTH (aus js/auth-credentials.js); persistiert
// Login-Session in localStorage. KEIN echter Schutz, nur UX-Gate.
function useAuth() {
    const [session, setSession] = useState(() => {
        try {
            const raw = localStorage.getItem(AUTH_KEY);
            if (!raw) return null;
            const s = JSON.parse(raw);
            if (s && s.expires && new Date(s.expires).getTime() > Date.now()) return s;
            localStorage.removeItem(AUTH_KEY);
            return null;
        } catch (e) { return null; }
    });
    const cfg = (typeof window !== 'undefined') ? window.SMARTINEER_AUTH : null;
    const login = useCallback((user, pass) => {
        if (AUTH_TEMPORARILY_DISABLED) return { ok: false, disabled: true, error: 'Login ist temporaer deaktiviert.' };
        if (!cfg || !cfg.users) return { ok: false, error: 'Auth-Konfiguration fehlt (js/auth-credentials.js).' };
        const u = cfg.users[user];
        if (!u || u.pass !== pass) return { ok: false, error: 'Benutzername oder Passwort falsch.' };
        const days = (cfg.sessionDays | 0) || 30;
        const expires = new Date(Date.now() + days * 86400000).toISOString();
        const s = { user, role: u.role || 'user', since: new Date().toISOString(), expires };
        try { localStorage.setItem(AUTH_KEY, JSON.stringify(s)); } catch (e) { /* quota */ }
        setSession(s);
        return { ok: true };
    }, [cfg]);
    const logout = useCallback(() => {
        try { localStorage.removeItem(AUTH_KEY); } catch (e) { /* ignore */ }
        setSession(null);
    }, []);
    const isAdmin = !AUTH_TEMPORARILY_DISABLED && !!(session && session.role === 'admin');
    return {
        session: AUTH_TEMPORARILY_DISABLED ? null : session,
        login,
        logout,
        isAdmin,
        configured: !AUTH_TEMPORARILY_DISABLED && !!cfg,
        disabled: AUTH_TEMPORARILY_DISABLED
    };
}

// Sichtbare Kategorien: Default alle sichtbar. Speichert nur die deaktivierten
// (Wert false). Filter wird im Dashboard / Training / Cheatsheet / Radar genutzt.
function useVisibleCategories(allOrder) {
    const [hidden, setHidden] = useState(() => {
        try { return JSON.parse(localStorage.getItem(VISIBLE_CATS_KEY)) || {}; }
        catch (e) { return {}; }
    });
    const persist = useCallback((next) => {
        setHidden(next);
        try { localStorage.setItem(VISIBLE_CATS_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
    }, []);
    const toggle = useCallback((catId) => {
        setHidden(prev => {
            const next = { ...prev };
            if (next[catId]) delete next[catId]; else next[catId] = true;
            try { localStorage.setItem(VISIBLE_CATS_KEY, JSON.stringify(next)); } catch (e) {}
            return next;
        });
    }, []);
    const isVisible = useCallback((catId) => !hidden[catId], [hidden]);
    const visibleOrder = useMemo(() => allOrder.filter(k => !hidden[k]), [allOrder, hidden]);
    const reset = useCallback(() => persist({}), [persist]);
    return { hidden, isVisible, visibleOrder, toggle, reset };
}

function categoryStats(cat, isSolved) {
    let total = 0, done = 0;
    cat.levels.forEach((tasks, lvl) => {
        tasks.forEach((_, idx) => {
            total++;
            if (isSolved(cat.id, lvl, idx)) done++;
        });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

// ---------------------------------------------------------------- Stable QID
// Deterministischer 32-bit FNV-1a-Hash (8-stelliges Hex). Wird als content-addressierte
// Item-Identitaet fuer Spaced-Repetition-Karten und kuenftige item-bezogene Statistiken
// genutzt — damit Quiz-Items in einem Kapitel umsortiert werden duerfen, ohne den
// Lernstand zu verlieren (vgl. AGENTS §11/§18.3, P-ARCH-STABLE-QID).
function fnv1a32Hex(str) {
    let h = 0x811c9dc5;
    const s = String(str);
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        // h *= 16777619, expressed as additions/shifts to keep 32-bit unsigned.
        h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('00000000' + h.toString(16)).slice(-8);
}

// Liefert eine stabile, content-addressierte Identitaet fuer ein Legacy-Item.
// Die Hash-Eingabe enthaelt einen Typ-Praefix sowie alle Felder, die die
// Identitaet einer Aufgabe definieren — bei MCQ den Frage-Stem plus den Text
// der korrekten Antwort (nicht den Index — so bleibt qid stabil, wenn Optionen
// umsortiert werden). Bei Sequence/Cloze die zu sortierenden Bloecke bzw. die
// akzeptierten Antworten der Lueckentexte.
function stableQid(legacy) {
    if (!legacy) return null;
    const q = String(legacy.q || '');
    const t = legacy.type || (Array.isArray(legacy.options) ? 'mcq' : null);
    let payload;
    if (t === 'sequence') {
        payload = 'seq|' + q + '|'
            + JSON.stringify(legacy.items || []) + '|'
            + JSON.stringify(legacy.correct || []);
    } else if (t === 'cloze') {
        // Synonyme normalisieren + sortieren, damit Reihenfolge in `accept`
        // nicht den Hash veraendert.
        const blanks = (legacy.blanks || []).map(b => ({
            label: b.label || '',
            accept: (b.accept || []).map(s => String(s).toLowerCase().trim()).sort()
        }));
        payload = 'cloze|' + q + '|' + JSON.stringify(blanks);
    } else if (t === 'mcq' || Array.isArray(legacy.options)) {
        const correctIdx = legacy.correct;
        const correctText = (Array.isArray(legacy.options) && correctIdx != null)
            ? String(legacy.options[correctIdx] != null ? legacy.options[correctIdx] : '')
            : '';
        payload = 'mcq|' + q + '|' + correctText;
    } else if (typeof legacy.h === 'string' || typeof legacy.s === 'string') {
        // Trainings-Aufgabe (Ingenieurs-Track). Stem + Musterloesung sind
        // typischerweise unique innerhalb einer Kategorie.
        payload = 'training|' + q + '|' + (legacy.s || '');
    } else if (typeof legacy.a === 'string') {
        // Schueler-Drill-Item.
        payload = 'sch|' + q + '|' + legacy.a;
    } else {
        payload = 'x|' + q;
    }
    return fnv1a32Hex(payload);
}

// Migration v1 -> v2 fuer SRS-/Schulungen-Storage (P-ARCH-STABLE-QID, AGENTS §11/§18.3).
// Wird genau einmal beim App-Start ausgefuehrt — sobald der v2-Key gesetzt ist,
// passiert nichts mehr. v1-Keys bleiben unangetastet als Fallback fuer Rollback.
function migrateLegacyStorage() {
    if (typeof localStorage === 'undefined') return;
    // Schulungen v1 -> v2: gleiche Form, nur Key-Bump.
    try {
        if (localStorage.getItem(SCHULUNGEN_KEY) == null) {
            const v1 = localStorage.getItem(SCHULUNGEN_KEY_V1);
            if (v1 != null) localStorage.setItem(SCHULUNGEN_KEY, v1);
        }
    } catch (e) { /* quota / privacy mode */ }
    // SRS v1 -> v2: idx-Schluessel gegen qid (content-Hash) tauschen. Wir laufen
    // ueber window.SCHULUNGEN, damit jede Karte ihren Inhalt findet. Items, die
    // im Daten-Skript nicht mehr existieren, werden verworfen (entspricht dem
    // Verhalten unter v1, wo der Index ins Leere zeigte).
    try {
        if (localStorage.getItem(SRS_KEY) != null) return;
        const v1raw = localStorage.getItem(SRS_KEY_V1);
        if (!v1raw) return;
        const v1 = JSON.parse(v1raw) || {};
        const v2 = {};
        const trainings = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
        trainings.forEach(t => {
            const tState = v1[t.id]; if (!tState) return;
            const tOut = {};
            (t.chapters || []).forEach(ch => {
                const cState = tState[ch.id]; if (!cState) return;
                const cOut = {};
                (ch.quiz || []).forEach((item, idx) => {
                    const card = cState[idx];
                    if (!card) return;
                    const qid = stableQid(item);
                    if (!qid) return;
                    // Bei (theoretischen) Hash-Kollisionen / Duplikaten: juengsten
                    // Lernstand behalten — analog zu mergeProgressKey(SRS_KEY).
                    const prev = cOut[qid];
                    if (!prev || (card.last || '') >= (prev.last || '')) cOut[qid] = card;
                });
                if (Object.keys(cOut).length) tOut[ch.id] = cOut;
            });
            if (Object.keys(tOut).length) v2[t.id] = tOut;
        });
        localStorage.setItem(SRS_KEY, JSON.stringify(v2));
    } catch (e) { /* ignore */ }
}
// Beim ersten Modul-Eval ausfuehren — Daten-Skripte sind zu diesem Zeitpunkt geladen
// (siehe Script-Lade-Reihenfolge in AGENTS §4: Daten-Skripte vor React/Babel/app.jsx).
migrateLegacyStorage();

// ---------------------------------------------------------------- Einheitliches Item-Schema
// Kanonische Laufzeit-Form fuer Training-Aufgaben, Schulungen-Quizfragen und Schueler-Drill-Items.
// Siehe AGENTS.md §22. Daten-Skripte werden NICHT migriert — der Adapter hebt Legacy-Items
// `{q,h,s}` (Training) bzw. `{q,options,correct,explanation}` / `{type:'sequence'|'cloze',...}`
// (Schulung) bzw. `{q,a}` (Schueler) zur Laufzeit auf das einheitliche Schema:
//   { id, type, stem, h?, s?, a?, options?, correct?, explanation?, items?, blanks?,
//     lo?, bloom?, difficulty?, tags, source?, _legacy }
// Optionale Metadaten (`lo`, `bloom`, `difficulty`, `tags`, `source`) werden — sofern am
// Legacy-Item gesetzt — durchgereicht; fehlen sie, bleiben sie `undefined` (bzw. `tags = []`).
function toItem(legacy, ctx) {
    if (!legacy) return null;
    const c = ctx || {};
    const kind = c.kind || (
        Array.isArray(legacy.options) ? 'mcq'
            : (legacy.type === 'sequence' || legacy.type === 'cloze') ? legacy.type
            : (typeof legacy.h === 'string' || typeof legacy.s === 'string') ? 'training'
            : (typeof legacy.a === 'string') ? 'schueler'
            : 'unknown'
    );
    // Type explizit aus Legacy oder Kontext ableiten:
    const type = legacy.type
        || (kind === 'mcq' ? 'mcq'
            : kind === 'training' ? 'training'
            : kind === 'schueler' ? 'schueler'
            : kind);
    // Stabile, content-addressierte Identitaet (P-ARCH-STABLE-QID, AGENTS §22).
    // Wird fuer SRS-Karten und kuenftige item-bezogene Statistiken genutzt; ist
    // unabhaengig vom 0-basierten Index im Pool — Quiz-Items duerfen also umsortiert
    // werden, ohne den Lernstand zu verlieren.
    const qid = stableQid(legacy);
    // Stabile Referenz-ID (best-effort; vollstaendige Stable-QID folgt in P-ARCH-STABLE-QID):
    let id = legacy.id;
    if (!id) {
        if (c.kind === 'training' || type === 'training') {
            id = `t|${c.catId || '?'}|${c.level != null ? c.level : '?'}|${c.idx != null ? c.idx : '?'}`;
        } else if (c.tid || c.cid) {
            id = `s|${c.tid || '?'}|${c.cid || '?'}|${c.idx != null ? c.idx : '?'}`;
        } else if (c.kind === 'schueler') {
            id = `k|${c.classId || '?'}|${c.subject || '?'}|${c.idx != null ? c.idx : '?'}`;
        } else {
            id = `?|${c.idx != null ? c.idx : '?'}`;
        }
    }
    return {
        id,
        qid,
        type,
        stem: legacy.q,
        // Training-Felder
        h: legacy.h,
        // Optionale Hint-Leiter (P-LP-HINT-LADDER, AGENTS §5):
        // h1/h2/h3 = mehrstufige Hinweise (Brilliant/OpenStax-Pattern). Abwaertskompatibel:
        // Aufgaben ohne h1/h2/h3 fallen auf den klassischen einstufigen `h`-Hinweis zurueck.
        h1: legacy.h1,
        h2: legacy.h2,
        h3: legacy.h3,
        s: legacy.s,
        // Schueler-Feld
        a: legacy.a,
        // MCQ / PBQ-Felder
        options: legacy.options,
        correct: legacy.correct,
        explanation: legacy.explanation,
        items: legacy.items,
        blanks: legacy.blanks,
        // Optionale Lernplattform-Metadaten (siehe AGENTS §22):
        lo: legacy.lo,
        bloom: legacy.bloom,
        difficulty: legacy.difficulty,
        tags: Array.isArray(legacy.tags) ? legacy.tags : [],
        source: legacy.source,
        // Original fuer Code, der noch direkt auf Legacy-Felder zugreift:
        _legacy: legacy
    };
}

// ---------------------------------------------------------------- Nav
const NAV_ICONS = {
    dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
        </svg>
    ),
    training: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <path d="M12 2v4" />
            <path d="M5 10l-2 2 2 2" />
            <path d="M19 10l2 2-2 2" />
            <circle cx="12" cy="14" r="6" />
            <path d="M9 14l2 2 4-4" />
        </svg>
    ),
    cheatsheet: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" />
            <path d="M8 8h7" />
            <path d="M8 12h7" />
            <path d="M8 16h4" />
        </svg>
    ),
    schulungen: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <path d="M3 7l9-4 9 4-9 4-9-4z" />
            <path d="M3 7v6c0 2 4 4 9 4s9-2 9-4V7" />
            <path d="M21 11v5" />
        </svg>
    ),
    schueler: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        </svg>
    ),
    optionen: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    )
};

function Nav({ view, setView, theme, onToggleTheme }) {
    // P-UI-NAV-GROUPING: Lern-Tabs (Dashboard/Training/Cheatsheets/Schulungen/Schueler)
    // visuell von Konto/Theme (Optionen + Theme-Toggle) trennen.
    const learnItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'training', label: 'Training' },
        { id: 'cheatsheet', label: 'Cheatsheets' },
        { id: 'schulungen', label: 'Schulungen' },
        { id: 'schueler', label: 'Schüler' }
    ];
    const accountItems = [
        { id: 'optionen', label: 'Optionen' }
    ];
    const renderItem = (it) => {
        const active = view === it.id;
        return (
            <button key={it.id}
                onClick={() => setView(it.id)}
                title={it.label}
                aria-label={it.label}
                aria-current={active ? 'page' : undefined}
                className={`nav-btn inline-flex items-center justify-center gap-2 whitespace-nowrap px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30 nav-btn-active'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}`}>
                <span className="md:hidden flex" aria-hidden="true">{NAV_ICONS[it.id]}</span>
                <span className="hidden md:inline">{it.label}</span>
            </button>
        );
    };
    return (
        <nav className="nav-glass sticky top-0 z-40 backdrop-blur-md bg-slate-900/90 text-white shadow-lg border-b border-slate-700/50 w-full">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between gap-2 h-16 items-center min-w-0">
                    <a href="./" className="flex items-center gap-2 min-w-0 flex-shrink" aria-label="Smartineer Home">
                        <img src="icons/smartineer-logo.png" alt="" width="36" height="36"
                             className="w-9 h-9 flex-shrink-0" />
                        <span className="hidden sm:inline text-base sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent truncate">Smartineer</span>
                    </a>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {learnItems.map(renderItem)}
                        <span className="hidden sm:block w-px h-7 bg-slate-700 mx-1" aria-hidden="true" />
                        {accountItems.map(renderItem)}
                        <button onClick={onToggleTheme}
                            title={theme === 'dark' ? 'Auf hell umschalten' : 'Auf dunkel umschalten'}
                            aria-label="Farbschema umschalten"
                            className="ml-1 sm:ml-2 inline-flex items-center justify-center whitespace-nowrap px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-slate-600 text-slate-200 hover:bg-slate-700/60 transition">
                            <span className="md:hidden flex" aria-hidden="true">
                                {theme === 'dark' ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                                    </svg>
                                )}
                            </span>
                            <span className="hidden md:inline">{theme === 'dark' ? 'Hell' : 'Dunkel'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// ---------------------------------------------------------------- Radar
function Radar({ data, order, isSolved }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !window.Chart) return;
        const labels = order.map(k => data[k].name);
        const target = order.map(() => 100);
        const current = order.map(k => categoryStats(data[k], isSolved).pct);

        if (chartRef.current) {
            chartRef.current.data.datasets[1].data = current;
            chartRef.current.update();
            return;
        }
        chartRef.current = new window.Chart(canvasRef.current.getContext('2d'), {
            type: 'radar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Ziel-Kompetenz (%)',
                        data: target,
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.10)',
                        borderColor: 'rgba(59, 130, 246, 0.9)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                    },
                    {
                        label: 'Aktueller Fortschritt (%)',
                        data: current,
                        fill: true,
                        backgroundColor: 'rgba(245, 158, 11, 0.30)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(245, 158, 11, 1)'
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                animation: { duration: 800, easing: 'easeOutQuart' },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(15,23,42,0.10)' },
                        grid: { color: 'rgba(15,23,42,0.10)' },
                        pointLabels: { color: '#475569', font: { size: 11, weight: '600' } },
                        ticks: { stepSize: 20, min: 0, max: 100, display: false }
                    }
                },
                plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } }
            }
        });
        return () => { /* keep chart instance across renders */ };
    }, [data, order, isSolved]);

    useEffect(() => () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } }, []);

    return (
        <div className="chart-container">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

// ---------------------------------------------------------------- Dashboard
function CategoryCard({ cat, stats, onOpen, idx }) {
    const ringColor = stats.pct === 100 ? 'from-emerald-400 to-emerald-600' : 'from-blue-400 to-cyan-500';
    return (
        <button onClick={onOpen}
            style={{ animationDelay: `${idx * 60}ms` }}
            className="card-fade group relative overflow-hidden bg-white text-left rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
            <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br ${ringColor} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-2 relative">
                <h3 className="font-bold text-slate-800 text-lg">{cat.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stats.pct === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{stats.pct}%</span>
            </div>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2 relative">{cat.desc}</p>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden relative">
                <div className={`bg-gradient-to-r ${ringColor} h-2 rounded-full transition-all duration-700 ease-out`} style={{ width: `${stats.pct}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 relative">{stats.done} / {stats.total} gelöst</p>
        </button>
    );
}

function Dashboard({ data, order, isSolved, srsState, onOpenCategory, onOpenTrainingAt, onResumeSchulung, resumeCandidate, onReset, onInstall, onExport, onImport }) {
    const totals = useMemo(() => {
        let total = 0, done = 0;
        order.forEach(k => { const s = categoryStats(data[k], isSolved); total += s.total; done += s.done; });
        const pct = total ? Math.round((done / total) * 100) : 0;
        return { total, done, pct };
    }, [data, order, isSolved]);

    // P-LP-SRS-OPEN: Heute-faellig-Zaehler ueber Training und Schulungen.
    const dueStats = useMemo(() => srsState
        ? srsCrossTrackDue(data, order, srsState)
        : { dueTraining: 0, dueSchulungen: 0, freshTraining: 0 },
    [data, order, srsState]);
    // P-LP-DAILY-MIX: deterministischer Tagesmix (5 Items, cross-Kategorie).
    const dailyMix = useMemo(() => srsState
        ? srsDailyMixTraining(data, order, srsState, 5)
        : [], [data, order, srsState]);
    const dailyMixRef = useKaTeX([dailyMix.length, dailyMix.map(e => e.catId + e.level + e.idx).join(',')]);

    return (
        <section className="view-fade">
            <div className="text-center max-w-3xl mx-auto mb-10">
                <img src="icons/smartineer-logo.png" alt="" width="96" height="96"
                     className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 drop-shadow-lg" />
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">Smartineer — dein Lern-Cockpit.</h1>
                <p className="text-base md:text-lg text-slate-600">Reaktiviere Ingenieurs-Wissen über drei Schwierigkeitsstufen oder wechsle in den Schüler-Bereich für Mathematik der Klassen 1–10. Fortschritt wird lokal gespeichert.</p>
            </div>

            <div className="bg-gradient-to-br from-white via-white to-blue-50/40 rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Dein Kompetenz-Profil</h2>
                    <p className="text-slate-600 mb-6">Blau = Ziel, Orange = aktueller Fortschritt (Anteil als gelöst markierter Aufgaben pro Kategorie).</p>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => onOpenCategory(order[0], 'training')}
                            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all">
                            Training starten →
                        </button>
                        {onReset && (
                            <button onClick={onReset}
                                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition-all">
                                Fortschritt zurücksetzen
                            </button>
                        )}
                        {onExport && (
                            <button onClick={onExport}
                                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition-all"
                                title="Lernfortschritt als JSON-Datei sichern und auf andere Geräte übertragen">
                                Fortschritt exportieren
                            </button>
                        )}
                        {onImport && (
                            <button onClick={onImport}
                                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition-all"
                                title="Fortschritt aus zuvor exportierter JSON-Datei einspielen">
                                Fortschritt importieren
                            </button>
                        )}
                        {onInstall && (
                            <button onClick={onInstall}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/30 transition-all">
                                Als App installieren
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-4">Gesamt: <strong>{totals.done} / {totals.total}</strong> Aufgaben gelöst ({totals.pct}%).</p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <Radar data={data} order={order} isSolved={isSolved} />
                </div>
            </div>

            {/* P-UI-DASHBOARD-RESUME: Wiedereinstiegs-Hero. Wird nur gerendert, wenn
                eine Schulung kuerzlich bearbeitet wurde (lastPage > 0 oder ein Quiz-Lauf vorliegt). */}
            {resumeCandidate && onResumeSchulung && (
                <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50/40 rounded-2xl border border-blue-200 shadow-sm p-6 md:p-7 mb-10 flex flex-col md:flex-row items-start md:items-center gap-5">
                    <div className="flex-1 min-w-0">
                        <div className="text-[11px] uppercase tracking-wider text-blue-700 font-bold mb-1">Weiterlernen</div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 truncate">{resumeCandidate.trainingName}</h2>
                        <p className="text-slate-700 text-sm md:text-base">
                            <span className="font-bold">{resumeCandidate.chapterTitle}</span>
                            {resumeCandidate.pageTitle ? <> · Seite {resumeCandidate.pageIdx + 1}: <em>{resumeCandidate.pageTitle}</em></> : null}
                        </p>
                        {resumeCandidate.lastDate && (
                            <p className="text-xs text-slate-500 mt-1">Zuletzt aktiv: {resumeCandidate.lastDate}</p>
                        )}
                    </div>
                    <button onClick={() => onResumeSchulung(resumeCandidate.tid, resumeCandidate.cid)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex-shrink-0">
                        Weiterlesen →
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.map((k, i) => {
                    const cat = data[k]; if (!cat) return null;
                    const s = categoryStats(cat, isSolved);
                    return <CategoryCard key={k} cat={cat} stats={s} onOpen={() => onOpenCategory(k, 'training')} idx={i} />;
                })}
            </div>

            {srsState && (dueStats.dueTraining + dueStats.dueSchulungen > 0 || dailyMix.length > 0) && (
                <div className="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mt-10">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Heute zur Wiederholung</h2>
                            <p className="text-slate-600 text-sm mb-4">Spaced-Repetition-Karteikarten faellig auf Basis deines Lernverlaufs (SM-2 lite). Karten entstehen, sobald du eine Aufgabe oder ein Quiz-Item bewertest.</p>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white rounded-lg border border-slate-200 p-3">
                                    <div className="text-2xl font-bold text-emerald-600">{dueStats.dueTraining + dueStats.dueSchulungen}</div>
                                    <div className="text-[11px] uppercase tracking-wide text-slate-500">heute faellig</div>
                                </div>
                                <div className="bg-white rounded-lg border border-slate-200 p-3">
                                    <div className="text-2xl font-bold text-blue-600">{dueStats.dueTraining}</div>
                                    <div className="text-[11px] uppercase tracking-wide text-slate-500">Training</div>
                                </div>
                                <div className="bg-white rounded-lg border border-slate-200 p-3">
                                    <div className="text-2xl font-bold text-violet-600">{dueStats.dueSchulungen}</div>
                                    <div className="text-[11px] uppercase tracking-wide text-slate-500">Schulungen</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <div className="flex items-baseline justify-between mb-2">
                                <h2 className="text-xl font-bold text-slate-800">Tagesmix</h2>
                                <span className="text-xs text-slate-500">deterministisch je Tag · 5 Aufgaben · max. 2/Kategorie</span>
                            </div>
                            {dailyMix.length === 0 ? (
                                <EmptyState title="Noch keine Aufgaben verfuegbar."
                                    subtext="Loese ein paar Trainings-Aufgaben, dann erscheint hier ein Tagesmix aus deinem Lernverlauf." />
                            ) : (
                                <ol ref={dailyMixRef} className="flex flex-col gap-3">
                                    {dailyMix.map((entry, i) => {
                                        const stem = (entry.task && (entry.task.q || '')) + '';
                                        const short = stem.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140);
                                        const cat = data[entry.catId];
                                        const catName = cat ? cat.name : entry.catId;
                                        return (
                                            <li key={`${entry.catId}-${entry.level}-${entry.idx}`} className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-emerald-400 transition">
                                                <span className="text-sm font-bold text-slate-400 w-6 flex-shrink-0 text-center">{i + 1}.</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">{catName} · L{entry.level + 1} · #{entry.idx + 1}</div>
                                                    <div className="text-sm text-slate-700 truncate leading-snug">{short || '(Aufgabe)'}</div>
                                                </div>
                                                <button onClick={() => onOpenTrainingAt && onOpenTrainingAt(entry.catId, entry.level, entry.idx)}
                                                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition flex-shrink-0">
                                                    Oeffnen
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ol>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// ---------------------------------------------------------------- Training
function Sidebar({ data, order, currentCat, isSolved, srsState, onSelect }) {
    return (
        <aside className="w-full md:w-1/4 flex flex-col gap-2">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wider mb-3 border-b pb-2">Kategorien</h3>
                <div className="flex flex-col gap-1">
                    {order.map(k => {
                        const cat = data[k]; if (!cat) return null;
                        const s = categoryStats(cat, isSolved);
                        const active = k === currentCat;
                        // P-LP-MASTERY: vier Punkte je Kategorie. Anzahl gefuellt = ganzzahlige
                        // Mastery-Stufe (1..4) aus SRS, Default 0 = unbekannt.
                        const m = srsState ? srsCategoryMastery(cat, srsState) : 0;
                        const mIdx = Math.round(m);
                        return (
                            <button key={k} onClick={() => onSelect(k)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition border ${active
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 border-transparent'}`}>
                                <div className="flex justify-between items-center gap-2">
                                    <span>{cat.name}</span>
                                    <span className={`text-xs ${s.pct === 100 ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>{s.done}/{s.total}</span>
                                </div>
                                {srsState && (
                                    <div className="flex items-center gap-1 mt-2" title={mIdx === 0 ? 'Mastery (SRS): noch keine Wiederholungen — Karten entstehen, sobald du Aufgaben bewertest.' : `Mastery (SRS): ${MASTERY_LABELS[mIdx]}`}>
                                        {[1, 2, 3, 4].map((lvl) => (
                                            <span key={lvl}
                                                className={`inline-block w-2 h-2 rounded-full ${lvl <= mIdx ? MASTERY_DOT_CLASS[mIdx] : 'bg-slate-200'}`}></span>
                                        ))}
                                        <span className="ml-2 text-[10px] uppercase tracking-wide text-slate-400">{MASTERY_LABELS[mIdx]}</span>
                                    </div>
                                )}
                                {active && (
                                    <div className="w-full bg-blue-100 rounded-full h-1 mt-2 overflow-hidden">
                                        <div className="bg-blue-500 h-1 rounded-full transition-all" style={{ width: `${s.pct}%` }}></div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}

function LevelTabs({ cat, level, setLevel }) {
    return (
        <div className="flex flex-wrap border-b border-slate-200 mb-6">
            {[0, 1, 2].map(i => {
                const tasks = cat.levels[i] || [];
                const active = i === level;
                return (
                    <button key={i} onClick={() => setLevel(i)}
                        className={`border-b-2 font-medium py-2 px-4 transition focus:outline-none ${active
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        Level {i + 1} <span className="text-xs opacity-70 ml-1">({tasks.length})</span>
                    </button>
                );
            })}
        </div>
    );
}

function TaskPills({ tasks, currentIdx, setIdx, isSolved, catId, lvl }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tasks.map((_, idx) => {
                const solved = isSolved(catId, lvl, idx);
                const active = idx === currentIdx;
                let cls = 'task-pill';
                if (active) cls += ' active';
                if (solved) cls += ' solved';
                return (
                    <button key={idx} onClick={() => setIdx(idx)} className={cls}
                        title={`Aufgabe ${idx + 1}${solved ? ' (gelöst)' : ''}`}>
                        {idx + 1}
                    </button>
                );
            })}
        </div>
    );
}

function TaskView({ task, catId, lvl, idx, total, isSolved, onPrev, onNext, onMark, srsCard, onGrade }) {
    const [revealedHints, setRevealedHints] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    useEffect(() => { setRevealedHints(0); setShowSolution(false); }, [catId, lvl, idx]);

    // Einheitliches Item-Schema (siehe AGENTS §22). Verhalten unveraendert: Stem/Hint/Solution
    // werden ueber den Adapter gelesen, der Legacy-Felder `q`/`h`/`s` 1:1 auf `stem`/`h`/`s` mappt.
    const item = toItem(task, { kind: 'training', catId, level: lvl, idx });
    const stem = item ? item.stem : (task && task.q);
    const solutionHtml = item ? item.s : (task && task.s);

    // Hint-Leiter (P-LP-HINT-LADDER, AGENTS §5). Reihenfolge: h1 -> h2 -> h3 -> h
    // (Legacy-Einzelhinweis als letzte Stufe). Aufgaben ohne h1/h2/h3 bleiben einstufig.
    const hintLadder = [];
    if (item) {
        if (typeof item.h1 === 'string' && item.h1.trim()) hintLadder.push(item.h1);
        if (typeof item.h2 === 'string' && item.h2.trim()) hintLadder.push(item.h2);
        if (typeof item.h3 === 'string' && item.h3.trim()) hintLadder.push(item.h3);
        if (typeof item.h === 'string' && item.h.trim()) hintLadder.push(item.h);
    } else if (task && typeof task.h === 'string' && task.h.trim()) {
        hintLadder.push(task.h);
    }
    const totalHints = hintLadder.length;
    const hasMoreHints = revealedHints < totalHints;
    const hintButtonLabel = totalHints <= 1
        ? 'Formel / Ansatz'
        : (revealedHints === 0
            ? `Hinweis 1${totalHints > 1 ? ` / ${totalHints}` : ''}`
            : `Nächster Hinweis (${revealedHints + 1} / ${totalHints})`);

    const ref = useKaTeX([catId, lvl, idx, stem, revealedHints, showSolution]);
    const solved = isSolved(catId, lvl, idx);

    if (!task) {
        return (
            <div className="text-slate-500 italic">
                Noch keine Aufgaben in diesem Level. Erweitere <code>js/data/{catId}.js</code>.
            </div>
        );
    }

    return (
        <div ref={ref} data-item-id={item ? item.id : undefined}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div></div>
                <div className="flex items-center gap-2">
                    <button onClick={onPrev} className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">← Vorherige</button>
                    <span className="text-sm text-slate-500">{idx + 1} / {total}</span>
                    <button onClick={onNext} className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Nächste →</button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-xl border border-slate-200 mb-6 task-fade" key={`${catId}-${lvl}-${idx}`}>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Aufgabe</h4>
                <div className="text-base md:text-lg text-slate-800 math-block min-h-[60px]"
                    dangerouslySetInnerHTML={{ __html: stem }} />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                {totalHints > 0 && (
                    <button onClick={() => setRevealedHints((n) => Math.min(n + 1, totalHints))}
                        disabled={!hasMoreHints}
                        className={`border font-medium py-2 px-4 rounded-lg transition ${hasMoreHints
                            ? 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100'
                            : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}>
                        {hasMoreHints ? hintButtonLabel : `Alle Hinweise (${totalHints}/${totalHints})`}
                    </button>
                )}
                <button onClick={() => setShowSolution(true)}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg transition">
                    Musterlösung
                </button>
                <button onClick={() => onMark(!solved)}
                    className={`font-medium py-2 px-4 rounded-lg transition text-white ${solved
                        ? 'bg-slate-500 hover:bg-slate-600'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/30'}`}>
                    {solved ? 'Gelöst (rückgängig)' : 'Als gelöst markieren'}
                </button>
            </div>

            {hintLadder.slice(0, revealedHints).map((hintHtml, i) => (
                <div key={i} className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg slide-in">
                    <h4 className="text-sm font-bold text-amber-800 mb-1">
                        {totalHints > 1 ? `Hinweis ${i + 1} / ${totalHints}` : 'Formel / Ansatz'}
                    </h4>
                    <div className="text-amber-900 math-block" dangerouslySetInnerHTML={{ __html: hintHtml }} />
                </div>
            ))}
            {showSolution && (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl slide-in">
                    <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3 border-b border-emerald-200 pb-2">Musterlösung &amp; Rechenweg</h4>
                    <div className="text-emerald-900 math-block" dangerouslySetInnerHTML={{ __html: solutionHtml }} />
                </div>
            )}
            {showSolution && onGrade && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-col text-xs text-slate-600">
                            <span className="font-bold uppercase tracking-wide text-slate-500">Wie sicher hast du diese Aufgabe geloest?</span>
                            <span className="text-slate-500">SRS plant naechsten Wiederholungstermin. Karteikarte: {
                                srsCard
                                    ? `${MASTERY_LABELS[srsMasteryLevel(srsCard)]} · ${srsCard.reps || 0} Reps · faellig ${srsCard.due || '?'}`
                                    : 'neu'
                            }</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => onGrade(0)}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300 transition"
                                title="Falsch / nicht gewusst — Karte zurueck auf 1 Tag">
                                Again
                            </button>
                            <button onClick={() => onGrade(1)}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition"
                                title="Mit Muehe geloest — kuerzeres Intervall, ease sinkt">
                                Hard
                            </button>
                            <button onClick={() => onGrade(2)}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-700 transition"
                                title="Gut geloest — Standard-Intervall">
                                Good
                            </button>
                            <button onClick={() => onGrade(3)}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 border border-blue-700 transition"
                                title="Muehelos geloest — verlaengertes Intervall, ease steigt">
                                Easy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Training({ data, order, isSolved, setSolved, currentCat, setCurrentCat,
                    srsState, srsGradeMany, initialLevel, initialIdx, consumeInitialPos }) {
    const [level, setLevel] = useState(0);
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        // Wenn das Dashboard eine Daily-Mix-Position uebergeben hat, springen wir dorthin,
        // sonst auf den Anfang der Kategorie. consumeInitialPos() loescht den Puffer im App-Root.
        if (initialLevel != null && initialIdx != null) {
            setLevel(initialLevel);
            setIdx(initialIdx);
            if (consumeInitialPos) consumeInitialPos();
        } else {
            setLevel(0);
            setIdx(0);
        }
    }, [currentCat]);

    const cat = data[currentCat];
    const tasks = (cat && cat.levels[level]) || [];
    const task = tasks[idx];

    const next = () => setIdx(i => tasks.length ? (i + 1) % tasks.length : 0);
    const prev = () => setIdx(i => tasks.length ? (i - 1 + tasks.length) % tasks.length : 0);

    const onGradeTraining = useCallback((quality) => {
        if (!cat || !task || !srsGradeMany) return;
        const ref = srsTrainingRef(cat.id, task);
        if (!ref) return;
        srsGradeMany([{ ref, ok: quality > 0, quality }]);
    }, [cat, task, srsGradeMany]);

    const titleRef = useKaTeX([currentCat]);

    return (
        <section className="view-fade flex flex-col md:flex-row gap-6">
            <Sidebar data={data} order={order} currentCat={currentCat} isSolved={isSolved}
                srsState={srsState} onSelect={setCurrentCat} />
            <div className="w-full md:w-3/4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 min-h-[600px]">
                    <div ref={titleRef} className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{cat ? cat.name : 'Kategorie wählen'}</h2>
                        <p className="text-slate-600">{cat ? cat.desc : 'Wähle links ein Thema aus.'}</p>
                    </div>
                    {cat && (
                        <>
                            <LevelTabs cat={cat} level={level} setLevel={(l) => { setLevel(l); setIdx(0); }} />
                            <div className="mb-4">
                                <TaskPills tasks={tasks} currentIdx={idx} setIdx={setIdx}
                                    isSolved={isSolved} catId={cat.id} lvl={level} />
                            </div>
                            <TaskView
                                task={task}
                                catId={cat.id}
                                lvl={level}
                                idx={idx}
                                total={tasks.length}
                                isSolved={isSolved}
                                onPrev={prev}
                                onNext={next}
                                onMark={(v) => setSolved(cat.id, level, idx, v)}
                                srsCard={task ? srsTrainingCard(srsState, cat.id, task) : null}
                                onGrade={onGradeTraining}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------- Cheatsheet
function Cheatsheet({ data, order }) {
    const [tab, setTab] = useState('formulas');
    const ref = useKaTeX([tab, order.length]);

    // P-UI-KATEX-DETAILS-TOGGLE: native <details>-Elemente sind bei Erst-Render
    // geschlossen (display:none auf Inhalt). KaTeX measure-Pfade liefern dann
    // gelegentlich Layout-Fehler. Beim Oeffnen explizit auf dem geoeffneten
    // Element nochmal rendern. Idempotent dank `data-katex-rendered`-Flag.
    const onDetailsToggle = useCallback((e) => {
        const el = e.currentTarget;
        if (!el.open) return;
        if (el.dataset.katexRendered === '1') return;
        if (!window.renderMathInElement) return;
        try {
            window.renderMathInElement(el, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
            el.dataset.katexRendered = '1';
        } catch (err) { /* ignore */ }
    }, []);

    return (
        <section className="view-fade" ref={ref}>
            <div className="text-center max-w-3xl mx-auto mb-8">
                <img src="icons/smartineer-logo.png" alt="" width="72" height="72"
                     className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 drop-shadow" />
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Cheatsheets &amp; Isolierte Musterlösungen</h1>
                <p className="text-slate-600">Zwei strikt getrennte Bereiche: <strong>1)</strong> kompakte Formelsammlung und <strong>2)</strong> isolierter Lösungskatalog mit Rechenweg und Kommentaren.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button onClick={() => setTab('formulas')}
                    className={`font-bold py-2.5 px-6 rounded-xl shadow transition ${tab === 'formulas'
                        ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'}`}>
                    1) Formelsammlung
                </button>
                <button onClick={() => setTab('solutions')}
                    className={`font-bold py-2.5 px-6 rounded-xl shadow transition ${tab === 'solutions'
                        ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'}`}>
                    2) Isolierte Lösungen
                </button>
            </div>

            {tab === 'formulas' && (
                <div className="flex flex-col gap-3 max-w-5xl mx-auto">
                    {order.length === 0 && (
                        <p className="text-center text-slate-500 italic">Keine Kategorien aktiv. Aktiviere Kategorien unter <strong>Optionen → Kategorien</strong>.</p>
                    )}
                    {order.map(k => {
                        const cat = data[k]; if (!cat) return null;
                        return (
                            <details key={k} onToggle={onDetailsToggle} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <summary className="cursor-pointer select-none px-6 py-4 font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between">
                                    <span>{cat.name}</span>
                                    <span className="text-xs text-slate-500 font-normal">Formelsammlung</span>
                                </summary>
                                <div className="px-6 pb-6 pt-2 text-slate-700 math-block" dangerouslySetInnerHTML={{ __html: cat.formulas }} />
                            </details>
                        );
                    })}
                </div>
            )}
            {tab === 'solutions' && (
                <div className="flex flex-col gap-3 max-w-5xl mx-auto">
                    {order.length === 0 && (
                        <p className="text-center text-slate-500 italic">Keine Kategorien aktiv. Aktiviere Kategorien unter <strong>Optionen → Kategorien</strong>.</p>
                    )}
                    {order.map(k => {
                        const cat = data[k]; if (!cat) return null;
                        const totalTasks = cat.levels.reduce((s, t) => s + t.length, 0);
                        return (
                            <details key={k} onToggle={onDetailsToggle} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <summary className="cursor-pointer select-none px-6 py-4 font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between">
                                    <span>{cat.name} — Isolierte Musterlösungen</span>
                                    <span className="text-xs text-slate-500 font-normal">{totalTasks} Aufgaben</span>
                                </summary>
                                <div className="px-6 pb-6 pt-2">
                                    {cat.levels.map((tasks, lvl) => tasks.length === 0 ? null : (
                                        <details key={lvl} onToggle={onDetailsToggle} className="mb-3">
                                            <summary className="cursor-pointer font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded">
                                                Level {lvl + 1} — {tasks.length} Aufgaben
                                            </summary>
                                            <div className="mt-4 flex flex-col gap-6">
                                                {tasks.map((t, i) => (
                                                    <div key={i} className="border-l-4 border-emerald-300 pl-4">
                                                        <h4 className="font-bold text-slate-600 mb-1">Aufgabe {lvl + 1}.{i + 1}</h4>
                                                        <div className="bg-slate-50 p-3 rounded mb-3 text-slate-800 math-block" dangerouslySetInnerHTML={{ __html: t.q }} />
                                                        <h5 className="font-bold text-emerald-700 mb-1">Rechenweg &amp; Kommentar</h5>
                                                        <div className="text-slate-700 math-block" dangerouslySetInnerHTML={{ __html: t.s }} />
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </details>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

// ---------------------------------------------------------------- Schüler-Bereich
function Schueler() {
    const SCH = window.SCHUELER;
    const [stage, setStage] = useState('classes'); // classes | subjects | drill | result
    const [klass, setKlass] = useState(null);
    const [subject, setSubject] = useState(null);
    const [items, setItems] = useState([]);
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [val, setVal] = useState('');

    const drillRef = useKaTeX([stage, idx]);
    const resultRef = useKaTeX([stage, answers.length]);

    if (!SCH) {
        return <section className="view-fade p-8 text-red-700">Schüler-Daten nicht geladen. Prüfe <code>js/data/schueler.js</code> in <code>index.html</code>.</section>;
    }

    const startDrill = (klassId, subjId) => {
        const key = `${klassId}.${subjId}`;
        const cfg = SCH.content[key];
        if (!cfg || cfg.mode === 'stub') return;
        let arr = [];
        if (cfg.mode === 'generated') {
            for (let i = 0; i < 10; i++) arr.push(cfg.gen());
        } else if (cfg.mode === 'pool') {
            const pool = cfg.pool.slice();
            for (let i = 0; i < 10 && pool.length; i++) {
                const k = Math.floor(Math.random() * pool.length);
                arr.push(pool.splice(k, 1)[0]);
            }
        }
        setKlass(klassId); setSubject(subjId);
        setItems(arr); setIdx(0); setAnswers([]); setVal('');
        setStage('drill');
    };

    const submit = () => {
        if (!val.trim()) return;
        const item = items[idx];
        const correct = SCH.normalize(val) === SCH.normalize(item.a);
        const next = answers.concat([{ q: item.q, expected: item.a, given: val, correct }]);
        setAnswers(next); setVal('');
        if (idx + 1 >= items.length) setStage('result');
        else setIdx(idx + 1);
    };

    const onKey = (e) => { if (e.key === 'Enter') submit(); };

    // ---------- Stage: Klassen-Auswahl ----------
    if (stage === 'classes') {
        return (
            <section className="view-fade">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <img src="icons/smartineer-logo.png" alt="" width="72" height="72"
                         className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 drop-shadow" />
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Schüler-Bereich</h1>
                    <p className="text-slate-600">Wähle eine Klassenstufe. Mathematik ist verfügbar für Klasse 1–4; Mittelstufen-Naturwissenschaften (Physik, Chemie und Biologie ab Klasse 5, gemäß NRW-Kernlehrplan SI) enthalten je 50 Drill-Fragen pro Klasse/Fach. Mathematik 5–10 und Englisch folgen.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {SCH.classes.map((c, i) => {
                        const ready = c.subjects.some(s => {
                            const cfg = SCH.content[`${c.id}.${s}`];
                            return cfg && cfg.mode !== 'stub';
                        });
                        return (
                            <button key={c.id}
                                onClick={() => { setKlass(c.id); setStage('subjects'); }}
                                style={{ animationDelay: `${i * 50}ms` }}
                                className="card-fade group bg-white rounded-2xl border border-slate-200 p-5 text-left hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Klassenstufe</div>
                                <div className="text-2xl font-extrabold text-slate-800 mb-2">{c.label}</div>
                                <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${ready ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {ready ? 'verfügbar' : 'in Vorbereitung'}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ---------- Stage: Fächer-Auswahl ----------
    if (stage === 'subjects') {
        const klassObj = SCH.classes.find(c => c.id === klass);
        if (!klassObj) { setStage('classes'); return null; }
        return (
            <section className="view-fade">
                <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{klassObj.label} — Fach wählen</h1>
                    <button onClick={() => setStage('classes')}
                        className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition">← Klassenübersicht</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {klassObj.subjects.map(s => {
                        const cfg = SCH.content[`${klass}.${s}`];
                        const ready = cfg && cfg.mode !== 'stub';
                        return (
                            <button key={s}
                                onClick={() => { if (ready) startDrill(klass, s); }}
                                disabled={!ready}
                                className={`text-left bg-white rounded-2xl border border-slate-200 p-6 transition ${ready
                                    ? 'hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                                    : 'opacity-60 cursor-not-allowed'}`}>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{SCH.subjects[s].label}</h3>
                                <p className="text-sm text-slate-600 mb-3">{ready && cfg.note ? cfg.note : 'In Vorbereitung. Bald verfügbar.'}</p>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${ready ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {ready ? '10 Aufgaben starten' : 'in Vorbereitung'}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ---------- Stage: Drill (10 Aufgaben) ----------
    if (stage === 'drill') {
        const item = items[idx];
        if (!item) { setStage('classes'); return null; }
        return (
            <section className="view-fade max-w-2xl mx-auto" ref={drillRef}>
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        Aufgabe {idx + 1} von {items.length}
                    </div>
                    <button onClick={() => { if (window.confirm('Drill abbrechen? Antworten gehen verloren.')) setStage('classes'); }}
                        className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Abbrechen</button>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 transition-all duration-500"
                         style={{ width: `${(idx / items.length) * 100}%` }}></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 task-fade" key={idx}>
                    <div className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8 math-block">
                        {item.q}
                    </div>
                    {/* P-UI-SCHUELER-INPUTMODE: Mobile-Tastatur passend zur erwarteten Antwort.
                        Reine Zahl (mit/ohne Komma/Punkt/Minus) -> `decimal`-Ziffernblock.
                        Sonstige Antworten (z.B. `7R3` bei Division-mit-Rest, oder Englisch) -> Text. */}
                    {(() => {
                        const isNumeric = typeof item.a === 'string' && /^-?[\d.,\s]+$/.test(item.a);
                        return (
                            <input type="text"
                                inputMode={isNumeric ? 'decimal' : 'text'}
                                pattern={isNumeric ? '[0-9.,\\-\\s]*' : undefined}
                                autoComplete="off" autoCapitalize="off" autoFocus
                                value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={onKey}
                                placeholder="Deine Antwort"
                                className="schueler-input mb-4" />
                        );
                    })()}
                    <button onClick={submit} disabled={!val.trim()}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition">
                        Antwort prüfen
                    </button>
                    <p className="text-xs text-slate-500 text-center mt-3">Hinweis: Rechne wenn nötig im Heft, gib hier nur das Endergebnis ein.</p>
                </div>
            </section>
        );
    }

    // ---------- Stage: Ergebnis ----------
    if (stage === 'result') {
        const correct = answers.filter(a => a.correct).length;
        const wrong = answers.length - correct;
        const klassObj = SCH.classes.find(c => c.id === klass);
        return (
            <section className="view-fade max-w-3xl mx-auto" ref={resultRef}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Auswertung</h2>
                    <p className="text-slate-600 mb-6">{klassObj ? klassObj.label : ''} · {SCH.subjects[subject] ? SCH.subjects[subject].label : ''}</p>
                    <div className="flex justify-center gap-8 mb-4">
                        <div>
                            <div className="text-5xl font-extrabold text-emerald-600">{correct}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">richtig</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold text-rose-600">{wrong}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">falsch</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold text-slate-700">{Math.round((correct / answers.length) * 100)}%</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Quote</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">Aufgaben im Überblick</h3>
                    <ol className="flex flex-col gap-3">
                        {answers.map((a, i) => (
                            <li key={i} className={`p-3 rounded-lg border-l-4 ${a.correct ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50'}`}>
                                <div className="font-bold text-slate-800">{i + 1}. {a.q}</div>
                                <div className="text-sm mt-1">
                                    Deine Antwort: <strong className={a.correct ? 'text-emerald-700' : 'text-rose-700'}>{a.given || '—'}</strong>
                                    {!a.correct && <span className="text-slate-700"> · richtig: <strong>{a.expected}</strong></span>}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    <button onClick={() => startDrill(klass, subject)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition">
                        Neuer Durchgang (10 Aufgaben)
                    </button>
                    <button onClick={() => setStage('subjects')}
                        className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">
                        Anderes Fach
                    </button>
                    <button onClick={() => setStage('classes')}
                        className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">
                        Andere Klasse
                    </button>
                </div>
            </section>
        );
    }

    return null;
}

// ---------------------------------------------------------------- Schulungen (Cert-Tracks)
function useSchulungenState() {
    const [state, setState] = useState(() => {
        try { return JSON.parse(localStorage.getItem(SCHULUNGEN_KEY)) || {}; }
        catch (e) { return {}; }
    });
    const persist = useCallback((next) => {
        setState(next);
        try { localStorage.setItem(SCHULUNGEN_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
    }, []);
    const setLastPage = useCallback((tid, cid, page) => {
        setState(prev => {
            const next = { ...prev };
            next[tid] = { ...(next[tid] || {}) };
            next[tid][cid] = { ...(next[tid][cid] || {}), lastPage: page };
            try { localStorage.setItem(SCHULUNGEN_KEY, JSON.stringify(next)); } catch (e) {}
            return next;
        });
    }, []);
    const recordQuiz = useCallback((tid, cid, score, total) => {
        setState(prev => {
            const next = { ...prev };
            next[tid] = { ...(next[tid] || {}) };
            const ch = { ...(next[tid][cid] || {}) };
            const best = ch.quizBest;
            const ratio = total ? score / total : 0;
            const bestRatio = best ? best.score / best.total : 0;
            if (!best || ratio >= bestRatio) {
                ch.quizBest = { score, total, date: new Date().toISOString() };
            }
            ch.quizLast = { score, total, date: new Date().toISOString() };
            next[tid][cid] = ch;
            try { localStorage.setItem(SCHULUNGEN_KEY, JSON.stringify(next)); } catch (e) {}
            return next;
        });
    }, []);
    // P-ARCH-ASSESSMENT-ENGINE: separater Schluessel `__assessments` pro Schulung,
    // damit Pruefungs-Bestleistungen nicht mit Kapitel-Quiz-Scores vermischt werden
    // und Auswertung pro Pruefungs-`id` reproduzierbar bleibt.
    const recordAssessment = useCallback((tid, asmtId, score, total, passScore) => {
        setState(prev => {
            const next = { ...prev };
            next[tid] = { ...(next[tid] || {}) };
            const asm = { ...((next[tid].__assessments) || {}) };
            const prevEntry = asm[asmtId] || { attempts: 0 };
            const ratio = total ? score / total : 0;
            const passed = typeof passScore === 'number' ? ratio >= passScore : null;
            const result = { score, total, date: new Date().toISOString(), passed };
            const best = prevEntry.bestScore;
            const bestRatio = best ? best.score / best.total : -1;
            const nextEntry = {
                attempts: (prevEntry.attempts || 0) + 1,
                lastResult: result,
                bestScore: (!best || ratio >= bestRatio) ? result : best
            };
            asm[asmtId] = nextEntry;
            next[tid].__assessments = asm;
            try { localStorage.setItem(SCHULUNGEN_KEY, JSON.stringify(next)); } catch (e) {}
            return next;
        });
    }, []);
    const reset = useCallback(() => persist({}), [persist]);
    return { state, setLastPage, recordQuiz, recordAssessment, reset };
}

// ---------- Reader-Notizen und Bookmarks (P-LP-NOTES-BOOKMARKS) ----------
// Zwei Storage-Keys, beide mit Shape `{ [tid]: { [cid]: { [pageIdx]: <val> } } }`.
// Notiz-Werte: getrimmter Plain-Text-String; leerer String / null entfernt die Notiz.
// Bookmark-Werte: `true` markiert, fehlender Eintrag = nicht markiert.
function useReaderAnnotations() {
    const readKey = (k) => {
        try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; }
    };
    const [notes, setNotes] = useState(() => readKey(READER_NOTES_KEY));
    const [bookmarks, setBookmarks] = useState(() => readKey(READER_BOOKMARKS_KEY));
    const writeKey = (k, value) => {
        try { localStorage.setItem(k, JSON.stringify(value)); } catch (e) { /* quota */ }
    };
    const getNote = useCallback((tid, cid, page) => {
        const t = notes[tid]; if (!t) return '';
        const c = t[cid]; if (!c) return '';
        const v = c[page];
        return typeof v === 'string' ? v : '';
    }, [notes]);
    const setNote = useCallback((tid, cid, page, text) => {
        setNotes(prev => {
            const next = { ...prev };
            const t = { ...(next[tid] || {}) };
            const c = { ...(t[cid] || {}) };
            const trimmed = typeof text === 'string' ? text.trim() : '';
            if (trimmed) c[page] = trimmed;
            else delete c[page];
            if (Object.keys(c).length) t[cid] = c; else delete t[cid];
            if (Object.keys(t).length) next[tid] = t; else delete next[tid];
            writeKey(READER_NOTES_KEY, next);
            return next;
        });
    }, []);
    const isBookmarked = useCallback((tid, cid, page) => {
        const t = bookmarks[tid]; if (!t) return false;
        const c = t[cid]; if (!c) return false;
        return c[page] === true;
    }, [bookmarks]);
    const toggleBookmark = useCallback((tid, cid, page) => {
        setBookmarks(prev => {
            const next = { ...prev };
            const t = { ...(next[tid] || {}) };
            const c = { ...(t[cid] || {}) };
            if (c[page]) delete c[page]; else c[page] = true;
            if (Object.keys(c).length) t[cid] = c; else delete t[cid];
            if (Object.keys(t).length) next[tid] = t; else delete next[tid];
            writeKey(READER_BOOKMARKS_KEY, next);
            return next;
        });
    }, []);
    return { notes, bookmarks, getNote, setNote, isBookmarked, toggleBookmark };
}

// ---------- Reader-Typographie (P-UI-READER-TYPOGRAPHY) ----------
// Persistiert pro Geraet Schriftgroesse, Zeilenabstand und Lesebreite des
// Schulungen-Readers. KEIN Export-/Import-Inhalt (geraetespezifisch, AGENTS §19.3).
const READER_TYPO_DEFAULT = { size: 'md', wide: false, lineTall: false };
function useReaderTypography() {
    const [typo, setTypoState] = useState(() => {
        try {
            const raw = JSON.parse(localStorage.getItem(READER_TYPO_KEY) || 'null');
            if (raw && typeof raw === 'object') return Object.assign({}, READER_TYPO_DEFAULT, raw);
        } catch (e) { /* corrupt */ }
        return READER_TYPO_DEFAULT;
    });
    const setTypo = useCallback((patch) => {
        setTypoState(prev => {
            const next = Object.assign({}, prev, patch);
            try { localStorage.setItem(READER_TYPO_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
            return next;
        });
    }, []);
    return { typo, setTypo };
}

// ---------- Resume-Kandidat (P-UI-DASHBOARD-RESUME) ----------
// Liest den Schulungens-State aus localStorage und sucht die juengste Aktivitaet
// (max von quizLast.date / quizBest.date), faellt sonst auf lastPage > 0 zurueck.
// Liefert null, wenn keine Schulung jemals beruehrt wurde.
function computeResumeCandidate() {
    try {
        const st = JSON.parse(localStorage.getItem(SCHULUNGEN_KEY) || '{}');
        const list = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
        if (!list.length) return null;
        let best = null;
        for (const tid of Object.keys(st)) {
            const tEntry = st[tid] || {};
            for (const cid of Object.keys(tEntry)) {
                if (cid.startsWith('__')) continue;
                const e = tEntry[cid] || {};
                const date = (e.quizLast && e.quizLast.date) || (e.quizBest && e.quizBest.date) || null;
                const lastPage = e.lastPage || 0;
                if (!date && !lastPage) continue;
                const score = date ? `Z${date}` : `P${String(lastPage).padStart(6, '0')}`;
                if (!best || score > best.score) best = { tid, cid, date, lastPage, score };
            }
        }
        if (!best) return null;
        const training = list.find(t => t.id === best.tid);
        if (!training) return null;
        const chapter = (training.chapters || []).find(c => c.id === best.cid);
        if (!chapter) return null;
        const pageIdx = Math.min(best.lastPage || 0, Math.max(0, (chapter.pages || []).length - 1));
        const pageTitle = (chapter.pages && chapter.pages[pageIdx] && chapter.pages[pageIdx].title) || null;
        return {
            tid: best.tid,
            cid: best.cid,
            trainingName: training.name,
            chapterTitle: chapter.title,
            pageIdx,
            pageTitle,
            lastDate: best.date
        };
    } catch (e) { return null; }
}

// ---------- EmptyState (P-UI-EMPTY-STATES) ----------
// Einheitliche leere Zustaende: Titel + Subtext + optionale CTA. Ersetzt verstreute
// `<p>...kursiv...</p>`-Literale (AGENTS-konformer Look statt Ad-hoc-Styling).
function EmptyState({ title, subtext, cta }) {
    return (
        <div className="flex flex-col items-center gap-2 py-6 px-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <div className="font-bold text-slate-700">{title}</div>
            {subtext && <p className="text-sm text-slate-500 max-w-md">{subtext}</p>}
            {cta && <div className="mt-2">{cta}</div>}
        </div>
    );
}

// ---------- Spaced Repetition (SM-2 lite) ----------
function srsTodayISO() { return new Date().toISOString().slice(0, 10); }
function srsAddDaysISO(days) {
    const d = new Date(); d.setUTCHours(0, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() + (days | 0));
    return d.toISOString().slice(0, 10);
}
// Aktualisiert eine Karteikarte nach beantworteter Frage. Konventionen:
// - Erste richtige Antwort → 1 Tag faellig.
// - Folgerichtige Antworten → naechstes Intervall aus SRS_INTERVALS_DAYS.
// - Falsche Antwort → reps zurueck auf 0, Intervall 1 Tag, ease leicht abgesenkt.
// - `quality` (P-LP-SRS-OPEN, optional): 0=Again, 1=Hard, 2=Good, 3=Easy. Modu-
//   liert ease und Intervall. Wenn nicht gesetzt, wird aus `ok` abgeleitet
//   (true -> 2, false -> 0). Erhaelt Rueckwaertskompatibilitaet zum Schulungs-Quiz.
function srsScheduleAfterAnswer(prev, ok, quality) {
    const today = srsTodayISO();
    const easePrev = (prev && typeof prev.ease === 'number') ? prev.ease : 2.5;
    const repsPrev = (prev && prev.reps) || 0;
    const lapsesPrev = (prev && prev.lapses) || 0;
    const q = (typeof quality === 'number') ? quality : (ok ? 2 : 0);
    if (q <= 0 || !ok) {
        return {
            ease: Math.max(1.3, easePrev - 0.2),
            interval: 1,
            reps: 0,
            lapses: lapsesPrev + 1,
            due: srsAddDaysISO(1),
            last: today
        };
    }
    const repsNext = repsPrev + 1;
    let intervalIdx = Math.min(repsNext - 1, SRS_INTERVALS_DAYS.length - 1);
    let interval = SRS_INTERVALS_DAYS[intervalIdx];
    let easeDelta = 0.05;
    if (q === 1) { easeDelta = -0.15; interval = Math.max(1, Math.round(interval * 0.7)); }
    else if (q === 3) { easeDelta = 0.10; interval = Math.round(interval * 1.3); }
    const easeNext = Math.min(2.9, Math.max(1.3, easePrev + easeDelta));
    return {
        ease: easeNext,
        interval,
        reps: repsNext,
        lapses: lapsesPrev,
        due: srsAddDaysISO(interval),
        last: today
    };
}
// Liefert alle Karten, die heute oder frueher faellig sind, plus alle, fuer die
// noch nie eine Karte angelegt wurde (`new`). Reihenfolge: ueberfaellige zuerst,
// dann neue. Nuetzlich fuer den Wiederholen-Pool ueber alle Kapitel hinweg.
function srsDueItems(training, srsState, includeNew) {
    const today = srsTodayISO();
    const tState = (srsState && srsState[training.id]) || {};
    const due = [];
    const fresh = [];
    training.chapters.forEach((ch) => {
        const cState = tState[ch.id] || {};
        ch.quiz.forEach((item, idx) => {
            // Stable-QID (P-ARCH-STABLE-QID): Karten haengen am Inhalt, nicht am Index.
            const qid = stableQid(item);
            const card = qid ? cState[qid] : null;
            if (!card) {
                if (includeNew) fresh.push({ item, trainingId: training.id, chapterId: ch.id, idx, qid, status: 'new' });
                return;
            }
            if (card.due && card.due <= today) {
                due.push({ item, trainingId: training.id, chapterId: ch.id, idx, qid, status: 'due', card });
            }
        });
    });
    // Aelteste Faelligkeit zuerst.
    due.sort((a, b) => (a.card.due || '').localeCompare(b.card.due || ''));
    return due.concat(fresh);
}
function srsTrainingStats(training, srsState) {
    const today = srsTodayISO();
    const tState = (srsState && srsState[training.id]) || {};
    let total = 0, learned = 0, due = 0, lapsed = 0;
    training.chapters.forEach((ch) => {
        const cState = tState[ch.id] || {};
        ch.quiz.forEach((item) => {
            total++;
            const qid = stableQid(item);
            const card = qid ? cState[qid] : null;
            if (!card) return;
            learned++;
            if (card.due && card.due <= today) due++;
            if ((card.lapses || 0) > 0) lapsed++;
        });
    });
    return { total, learned, due, fresh: total - learned, lapsed };
}

function useSRSState() {
    const [state, setState] = useState(() => {
        try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; }
        catch (e) { return {}; }
    });
    // Nimmt eine Liste von { ref:{tid,cid,qid,idx?}, ok:boolean } und schreibt alle
    // Karten in einem Rutsch — ein localStorage-Write pro Quiz-Lauf. Schluessel ist
    // die stable QID (P-ARCH-STABLE-QID); der idx im ref bleibt nur Diagnosehilfe.
    const gradeMany = useCallback((updates) => {
        if (!Array.isArray(updates) || !updates.length) return;
        setState((prev) => {
            const next = { ...prev };
            updates.forEach(({ ref, ok, quality }) => {
                if (!ref || !ref.qid) return;
                next[ref.tid] = { ...(next[ref.tid] || {}) };
                next[ref.tid][ref.cid] = { ...(next[ref.tid][ref.cid] || {}) };
                const prevCard = next[ref.tid][ref.cid][ref.qid];
                next[ref.tid][ref.cid][ref.qid] = srsScheduleAfterAnswer(prevCard, ok, quality);
            });
            try { localStorage.setItem(SRS_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
            return next;
        });
    }, []);
    const reset = useCallback(() => {
        setState({});
        try { localStorage.removeItem(SRS_KEY); } catch (e) {}
    }, []);
    return { state, gradeMany, reset };
}

// ---------- P-LP-SRS-OPEN: SRS fuer Ingenieurs-Training ----------
// Karteikarten fuer den Ingenieurs-Track liegen im selben SRS_KEY-Storage wie die
// Schulungs-Karten, aber unter einer synthetischen Trainings-ID. So bleibt die
// Daten-Form { [tid]: { [cid]: { [qid]: card } } } unveraendert und Export/Import
// (EXPORT_KEYS enthaelt SRS_KEY) deckt den neuen Pfad automatisch ab.
const TRAINING_SRS_TID = '__training__';

function srsTrainingRef(catId, task) {
    if (!task) return null;
    const qid = stableQid(task);
    if (!qid) return null;
    return { tid: TRAINING_SRS_TID, cid: catId, qid };
}

function srsTrainingCard(srsState, catId, task) {
    const ref = srsTrainingRef(catId, task);
    if (!ref) return null;
    const t = srsState && srsState[TRAINING_SRS_TID];
    const c = t && t[catId];
    return (c && c[ref.qid]) || null;
}

// Mastery-Stufen (P-LP-MASTERY): aus der Karteikarte abgeleitet.
// 0 = neu (keine Karte / noch nicht wiederholt), 1 = familiar (1 reps oder lapses),
// 2 = practiced (>=2 reps), 3 = proficient (>=4 reps, ease >=2.5),
// 4 = mastered (>=6 reps, ease >=2.6, lapses<=1).
function srsMasteryLevel(card) {
    if (!card) return 0;
    const reps = card.reps || 0;
    const ease = (typeof card.ease === 'number') ? card.ease : 2.5;
    const lapses = card.lapses || 0;
    if (reps >= 6 && ease >= 2.6 && lapses <= 1) return 4;
    if (reps >= 4 && ease >= 2.5) return 3;
    if (reps >= 2) return 2;
    if (reps >= 1 || lapses > 0) return 1;
    return 0;
}

// P-UI-MASTERY-LABEL-NEU: Stufe 0 (keine SRS-Karte) heisst nicht mehr "unbekannt"
// — das wurde von Nutzern als Fehlermeldung interpretiert. "neu" ist klar als
// "noch nicht wiederholt" lesbar; tooltip am Sidebar-Eintrag ergaenzt die Bedeutung.
const MASTERY_LABELS = ['neu', 'familiar', 'practiced', 'proficient', 'mastered'];
const MASTERY_DOT_CLASS = [
    'bg-slate-300',           // 0
    'bg-amber-400',           // 1
    'bg-yellow-500',          // 2
    'bg-emerald-500',         // 3
    'bg-emerald-600'          // 4
];

// Durchschnittliche Mastery einer Trainings-Kategorie (0..4 als float).
function srsCategoryMastery(cat, srsState) {
    if (!cat || !cat.levels) return 0;
    let sum = 0, total = 0;
    cat.levels.forEach((tasks) => {
        (tasks || []).forEach((task) => {
            total++;
            sum += srsMasteryLevel(srsTrainingCard(srsState, cat.id, task));
        });
    });
    return total ? (sum / total) : 0;
}

// Zaehlt heute faellige Items aller Tracks (Training + Schulungen) +
// neu-noch-nie-gesehene Karten (only fuer Trainings, weil Schulungen-Quizzes
// nur ueber Quiz-Lauf angefasst werden). Wird im Dashboard als „Heute faellig"-
// Karte und als Basis fuer Daily-Mix genutzt.
function srsCrossTrackDue(data, order, srsState) {
    const today = srsTodayISO();
    let dueTraining = 0, freshTraining = 0;
    (order || []).forEach((catId) => {
        const cat = data[catId]; if (!cat) return;
        (cat.levels || []).forEach((tasks) => {
            (tasks || []).forEach((task) => {
                const card = srsTrainingCard(srsState, catId, task);
                if (!card) { freshTraining++; return; }
                if (card.due && card.due <= today) dueTraining++;
            });
        });
    });
    let dueSchulungen = 0;
    const trainings = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
    trainings.forEach((t) => {
        const tState = (srsState && srsState[t.id]) || {};
        (t.chapters || []).forEach((ch) => {
            const cState = tState[ch.id] || {};
            (ch.quiz || []).forEach((item) => {
                const qid = stableQid(item);
                const card = qid ? cState[qid] : null;
                if (!card) return;
                if (card.due && card.due <= today) dueSchulungen++;
            });
        });
    });
    return { dueTraining, dueSchulungen, freshTraining };
}

// Deterministische PRNG fuer Daily-Mix (mulberry32). Seed aus Datum + Salt.
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hashStringToSeed(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

// Cross-Kategorie Daily-Mix (P-LP-DAILY-MIX). Liefert n Items deterministisch
// pro Tag. Strategie: zunaechst alle ueberfaelligen Trainings-Items (mit
// Prioritaet), dann mit neuen (noch-nie-gesehenen) Items auffuellen. Pro
// Kategorie hoechstens 2 Items, damit Interleaving entsteht. Seed = ISO-Datum.
function srsDailyMixTraining(data, order, srsState, n, seedDate) {
    n = n || 5;
    const today = srsTodayISO();
    const seedStr = (seedDate || today) + '|smartineer-daily-mix-v1';
    const rand = mulberry32(hashStringToSeed(seedStr));
    const due = [];
    const fresh = [];
    (order || []).forEach((catId) => {
        const cat = data[catId]; if (!cat) return;
        (cat.levels || []).forEach((tasks, level) => {
            (tasks || []).forEach((task, idx) => {
                const card = srsTrainingCard(srsState, catId, task);
                const entry = { catId, level, idx, task };
                if (!card) { fresh.push(entry); return; }
                if (card.due && card.due <= today) due.push(entry);
            });
        });
    });
    function seededShuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const pool = seededShuffle(due).concat(seededShuffle(fresh));
    const perCat = {};
    const pick = [];
    for (const entry of pool) {
        const c = perCat[entry.catId] || 0;
        if (c >= 2) continue;
        perCat[entry.catId] = c + 1;
        pick.push(entry);
        if (pick.length >= n) break;
    }
    // Falls cross-Kategorie-Limit nicht reicht: ohne Limit auffuellen.
    if (pick.length < n) {
        for (const entry of pool) {
            if (pick.indexOf(entry) !== -1) continue;
            pick.push(entry);
            if (pick.length >= n) break;
        }
    }
    return pick;
}

function shuffleSample(arr, n) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, Math.min(n, a.length));
}

// ---------- Quiz-Item-Typen (PBQ) ----------
// MCQ:      { q, options, correct, explanation }                            (kein type)
// SEQUENCE: { type:'sequence', q, items:[...], correct:[idxOrder], explanation }
// CLOZE:    { type:'cloze',    q, blanks:[{label, accept:[...]}], explanation }
function quizItemType(item) { return (item && item.type) || 'mcq'; }

function normalizeAnswer(s) {
    return String(s == null ? '' : s)
        .trim().toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[.,;:!?]+$/, '');
}

function defaultInputForItem(item) {
    const t = quizItemType(item);
    if (t === 'sequence') {
        // Shuffle initial order (sonst trivial)
        const idxs = item.items.map((_, i) => i);
        for (let i = idxs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
        }
        // Wenn (zufällig) bereits korrekt: rotiere 1, sonst zu einfach
        if (item.correct && idxs.every((v, i) => v === item.correct[i]) && idxs.length > 1) {
            idxs.push(idxs.shift());
        }
        return idxs;
    }
    if (t === 'cloze') {
        return item.blanks.map(() => '');
    }
    return null; // mcq
}

function isInputComplete(item, input) {
    const t = quizItemType(item);
    if (t === 'sequence') return Array.isArray(input) && input.length === item.items.length;
    if (t === 'cloze') return Array.isArray(input) && input.every(s => normalizeAnswer(s).length > 0);
    return input !== null && input !== undefined;
}

function gradeQuizItem(item, input) {
    const t = quizItemType(item);
    if (t === 'sequence') {
        return Array.isArray(input)
            && Array.isArray(item.correct)
            && input.length === item.correct.length
            && input.every((v, i) => v === item.correct[i]);
    }
    if (t === 'cloze') {
        if (!Array.isArray(input) || input.length !== item.blanks.length) return false;
        return item.blanks.every((b, i) => {
            const got = normalizeAnswer(input[i]);
            return (b.accept || []).some(a => normalizeAnswer(a) === got);
        });
    }
    return input === item.correct;
}

function chapterProgress(chapter, chState) {
    const totalPages = chapter.pages.length;
    const lastPage = chState ? (chState.lastPage || 0) : 0;
    const pagePct = totalPages ? Math.round(((lastPage + 1) / totalPages) * 100) : 0;
    const quizBest = chState && chState.quizBest;
    return { totalPages, lastPage, pagePct, quizBest };
}

// P-ARCH-ASSESSMENT-ENGINE: baut einen Quiz-Item-Pool aus einer Schulung
// gemaess einem optionalen Filter `{ chapter?:string[], lo?:string[], tags?:string[] }`.
// Items werden mit Kontext (`tid`, `cid`, `idx`, `qid`) zurueckgegeben, damit der
// gleiche Quiz-Renderer wie fuer Kapitel-Quizze und Wiederholungs-Modus genutzt werden kann.
function buildAssessmentPool(training, filter) {
    if (!training || !Array.isArray(training.chapters)) return [];
    const f = filter || {};
    const allowChapter = Array.isArray(f.chapter) && f.chapter.length ? new Set(f.chapter) : null;
    const allowLo = Array.isArray(f.lo) && f.lo.length ? new Set(f.lo) : null;
    const allowTags = Array.isArray(f.tags) && f.tags.length ? new Set(f.tags) : null;
    const out = [];
    training.chapters.forEach(ch => {
        if (allowChapter && !allowChapter.has(ch.id)) return;
        const pool = Array.isArray(ch.quiz) ? ch.quiz : [];
        pool.forEach((item, idx) => {
            if (allowLo) {
                const ilo = Array.isArray(item.lo) ? item.lo : (item.lo ? [item.lo] : []);
                if (!ilo.some(x => allowLo.has(x))) return;
            }
            if (allowTags) {
                const itags = Array.isArray(item.tags) ? item.tags : [];
                if (!itags.some(x => allowTags.has(x))) return;
            }
            out.push({ item, tid: training.id, cid: ch.id, idx, qid: stableQid(item) });
        });
    });
    return out;
}

function assessmentStats(asmt, asmEntry) {
    const best = asmEntry && asmEntry.bestScore;
    const last = asmEntry && asmEntry.lastResult;
    const attempts = (asmEntry && asmEntry.attempts) || 0;
    const passScore = typeof asmt.passScore === 'number' ? asmt.passScore : null;
    const bestRatio = best ? best.score / best.total : 0;
    const passed = (passScore != null && best) ? bestRatio >= passScore : null;
    return { best, last, attempts, passScore, bestRatio, passed };
}

function trainingProgress(training, tState) {
    let pages = 0, pageDone = 0, quizSum = 0, quizCount = 0;
    training.chapters.forEach(ch => {
        pages += ch.pages.length;
        const cs = tState ? tState[ch.id] : null;
        pageDone += cs ? Math.min((cs.lastPage || 0) + 1, ch.pages.length) : 0;
        if (cs && cs.quizBest) {
            quizSum += cs.quizBest.score / cs.quizBest.total;
            quizCount++;
        }
    });
    const readPct = pages ? Math.round((pageDone / pages) * 100) : 0;
    const quizPct = quizCount ? Math.round((quizSum / quizCount) * 100) : 0;
    return { readPct, quizPct, chapterCount: training.chapters.length };
}

// P-LP-INLINE-CHECK: formativer Selbstcheck am Ende einer Lehrseite.
// Optionales Feld `pages[i].check = { stem, options:[...], correct, explanation }`.
// Keine Persistenz, keine Wertung — rein didaktisches Feedback beim Lesen.
function InlineCheck({ check }) {
    const [selected, setSelected] = React.useState(null);
    const [submitted, setSubmitted] = React.useState(false);
    const ref = useKaTeX([submitted, check && check.stem]);
    if (!check || !Array.isArray(check.options) || check.options.length < 2) return null;
    const correctIdx = check.correct | 0;
    const isCorrect = submitted && selected === correctIdx;
    return (
        <div ref={ref} className="mt-6 border-t border-slate-200 pt-5">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">?</span>
                    <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Selbstcheck</h4>
                    <span className="text-[11px] text-blue-700/80">formativ, keine Wertung</span>
                </div>
                <p className="text-slate-800 mb-3" dangerouslySetInnerHTML={{ __html: check.stem }} />
                <ul className="flex flex-col gap-2 mb-3">
                    {check.options.map((opt, i) => {
                        const isSel = selected === i;
                        const isRight = submitted && i === correctIdx;
                        const isWrongSel = submitted && isSel && i !== correctIdx;
                        let cls = 'border border-slate-300 bg-white hover:border-blue-400';
                        if (submitted) {
                            if (isRight) cls = 'border-2 border-emerald-500 bg-emerald-50';
                            else if (isWrongSel) cls = 'border-2 border-rose-500 bg-rose-50';
                            else cls = 'border border-slate-300 bg-white opacity-70';
                        } else if (isSel) {
                            cls = 'border-2 border-blue-500 bg-blue-50';
                        }
                        return (
                            <li key={i}>
                                <button type="button" disabled={submitted}
                                    onClick={() => setSelected(i)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${cls} disabled:cursor-default`}>
                                    <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + i)}.</span>
                                    <span dangerouslySetInnerHTML={{ __html: opt }} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {!submitted && (
                    <button type="button" onClick={() => setSubmitted(true)} disabled={selected === null}
                        className="px-4 py-1.5 text-sm bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed">
                        Pruefen
                    </button>
                )}
                {submitted && (
                    <div className={`mt-2 rounded-lg p-3 text-sm ${isCorrect ? 'bg-emerald-100 border border-emerald-300 text-emerald-900' : 'bg-rose-100 border border-rose-300 text-rose-900'}`}>
                        <div className="font-bold mb-1">{isCorrect ? 'Richtig.' : 'Nicht ganz.'}</div>
                        <div dangerouslySetInnerHTML={{ __html: check.explanation || '' }} />
                        <button type="button" onClick={() => { setSelected(null); setSubmitted(false); }}
                            className="mt-2 text-xs underline text-slate-700 hover:text-slate-900">Erneut versuchen</button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ---------- Glossar (P-ARCH-GLOSSARY) ----------
// Eine Schulung darf optional `glossary: [{ id, term, definition, source }]` tragen.
// Marker im HTML: `[[glossary:id]]` oder `[[glossary:id|Sichtbarer Text]]`.
// Beim Rendern wird der Marker zu einem klickbaren `<button class="glossary-link">`
// ersetzt. Klick oeffnet eine kleine Detail-Karte mit Term/Definition/Quelle.
function applyGlossary(html, gmap) {
    if (!html) return '';
    if (!gmap) return html;
    return html.replace(/\[\[glossary:([a-z0-9_-]+)(?:\|([^\]]+))?\]\]/gi, (m, id, custom) => {
        const e = gmap[id];
        const fallback = custom || (e && e.term) || id;
        if (!e) return fallback;
        const safeLabel = String(fallback).replace(/"/g, '&quot;');
        const safeTerm = String(e.term).replace(/"/g, '&quot;');
        return `<button type="button" class="glossary-link" data-gid="${id}" aria-label="Glossar: ${safeTerm}">${safeLabel}</button>`;
    });
}

function Schulungen({ auth, onGoToOptionen, srsState, srsGradeMany, getInitialOpen }) {
    const trainings = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
    const { state, setLastPage, recordQuiz, recordAssessment } = useSchulungenState();
    const { getNote, setNote, isBookmarked, toggleBookmark } = useReaderAnnotations();
    // P-UI-READER-TYPOGRAPHY: Schriftgroesse / Zeilenabstand / Breite des Readers.
    const { typo, setTypo } = useReaderTypography();
    const [stage, setStage] = useState('index'); // index | chapters | reader | quiz | quizResult
    const [tid, setTid] = useState(null);
    const [cid, setCid] = useState(null);
    const [page, setPage] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);
    const [jumpOpen, setJumpOpen] = useState(false);
    const [notesOpen, setNotesOpen] = useState(false);
    const [quizSet, setQuizSet] = useState([]);
    const [quizRefs, setQuizRefs] = useState([]); // parallel zu quizSet: {tid,cid,idx} pro Item
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizInput, setQuizInput] = useState(null);
    const [reviewMode, setReviewMode] = useState(false);
    // P-ARCH-ASSESSMENT-ENGINE: assessmentMode wird parallel zu reviewMode gefuehrt.
    // currentAssessment ist das Pruefungs-Definitions-Objekt (id/title/type/poolFilter/count/passScore/timeLimit).
    // deadlineMs (ms-Epoch) startet bei Quiz-Start und bewirkt Auto-Submit beim Ablauf, falls timeLimit gesetzt.
    const [assessmentMode, setAssessmentMode] = useState(false);
    const [currentAssessment, setCurrentAssessment] = useState(null);
    const [deadlineMs, setDeadlineMs] = useState(null);
    const [, setNowTick] = useState(0);
    // P-ARCH-GLOSSARY: aktuell geoeffneter Glossar-Eintrag (null oder {id, term, definition, source}).
    const [glossaryEntry, setGlossaryEntry] = useState(null);
    // P-UI-QUIZ-FLAG: pro Quiz-Lauf gemerkte Fragen-Indizes (in `quizSet`).
    // Nur in-memory; wird bei jedem startQuiz/startReview/startAssessment zurueckgesetzt.
    const [quizFlags, setQuizFlags] = useState([]);

    const readerRef = useKaTeX([stage, tid, cid, page]);
    const quizRef = useKaTeX([stage, quizIdx]);
    const resultRef = useKaTeX([stage, quizAnswers.length]);

    // P-UI-READER-SCROLL-TOP: bei Seitenwechsel im Reader (auch bei Sprung via TOC /
    // Seite-Jump / Resume) zum Seitenanfang zurueckspringen — sonst landet man dort,
    // wo man auf der Vorgaengerseite gescrollt hatte.
    useEffect(() => {
        if (stage !== 'reader') return;
        try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) { /* no-op */ }
        if (readerRef && readerRef.current && typeof readerRef.current.scrollIntoView === 'function') {
            try { readerRef.current.scrollIntoView({ block: 'start' }); } catch (e) { /* no-op */ }
        }
    }, [stage, tid, cid, page]);

    if (!trainings.length) {
        return <section className="view-fade p-8 text-red-700">
            Keine Schulungen geladen. Prüfe <code>js/data/schulung_*.js</code> in <code>index.html</code>.
        </section>;
    }

    // Auth-Gate: nur sichtbar fuer eingeloggte Nutzer. Sehr leichter Schutz —
    // siehe Disclaimer in js/auth-credentials.js (Frontend-only).
    // Temporaer deaktiviert: siehe P-UI-LOGIN-REACTIVATE in WORKPACKAGES.md.
    if (auth && !auth.disabled && !auth.session) {
        return (
            <section className="view-fade max-w-xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                    <div className="text-5xl mb-3" aria-hidden="true">·</div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Schulungen — Anmeldung erforderlich</h1>
                    <p className="text-slate-600 mb-6">Der Schulungs-Bereich (Cert-Prep) ist passwortgeschuetzt. Melde dich unter <strong>Optionen → Konto</strong> an. Dashboard, Training, Cheatsheets und Schueler-Bereich sind ohne Anmeldung nutzbar.</p>
                    <button onClick={onGoToOptionen}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition">
                        Zu den Optionen
                    </button>
                    <p className="text-xs text-slate-400 mt-6">Hinweis: Die Anmeldung dient allein der Zugangs-Bequemlichkeit, nicht der Sicherheit. Inhalte werden nicht verschluesselt.</p>
                </div>
            </section>
        );
    }

    const training = trainings.find(t => t.id === tid);
    const chapter = training && training.chapters.find(c => c.id === cid);

    // P-ARCH-GLOSSARY: Map id -> entry fuer die aktuelle Schulung. Click-Delegation
    // faengt jeden Klick auf `.glossary-link` innerhalb des Schulungen-Bereichs ab
    // und oeffnet die Detail-Karte. Funktioniert in Reader, Quiz und Quiz-Result,
    // weil das gemeinsame Root-`<section>` den Handler traegt.
    const glossaryMap = useMemo(() => {
        const list = (training && training.glossary) || [];
        const m = {};
        list.forEach(e => { if (e && e.id) m[e.id] = e; });
        return m;
    }, [training]);
    const onGlossaryClick = useCallback((e) => {
        const btn = e.target && e.target.closest && e.target.closest('.glossary-link');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        const gid = btn.getAttribute('data-gid');
        const entry = glossaryMap[gid];
        if (entry) setGlossaryEntry(entry);
    }, [glossaryMap]);
    // Global click delegation, damit Marker in Reader-Article, Quiz-Result und
    // InlineCheck-Explanations gleichermassen reagieren (verschiedene `<section>`-Roots).
    useEffect(() => {
        document.addEventListener('click', onGlossaryClick);
        return () => document.removeEventListener('click', onGlossaryClick);
    }, [onGlossaryClick]);
    // Glossar-Modal (geteilt zwischen allen Schulungen-Stages). Wird via {glossaryModal}
    // direkt vor dem schliessenden `</section>` jeder Stage gerendert.
    const glossaryModal = glossaryEntry ? (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
            onClick={() => setGlossaryEntry(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 slide-up relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setGlossaryEntry(null)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full hover:bg-slate-100 transition text-xl leading-none" aria-label="Schließen">×</button>
                <div className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-1">Glossar</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{glossaryEntry.term}</h3>
                <p className="text-sm text-slate-700 mb-3" dangerouslySetInnerHTML={{ __html: glossaryEntry.definition || '' }} />
                {glossaryEntry.source && (
                    <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-2 mt-2">Quelle: {glossaryEntry.source}</p>
                )}
            </div>
        </div>
    ) : null;

    const openTraining = (trainingId) => {
        setTid(trainingId); setCid(null); setPage(0); setStage('chapters');
    };

    const openChapter = (chapterId, resumePage) => {
        setCid(chapterId);
        const ch = training.chapters.find(c => c.id === chapterId);
        const start = (typeof resumePage === 'number') ? resumePage
            : ((state[tid] && state[tid][chapterId] && state[tid][chapterId].lastPage) || 0);
        setPage(Math.min(Math.max(0, start), Math.max(0, ch.pages.length - 1)));
        setStage('reader');
    };

    // P-UI-DASHBOARD-RESUME: konsumiert die vom App-Root gesetzte (tid,cid)-Position
    // beim ersten Render. tid wird sofort gesetzt, cid kommt im naechsten Effekt
    // (sobald `training` aus dem neuen tid abgeleitet ist).
    const pendingInitialCidRef = useRef(null);
    useEffect(() => {
        if (typeof getInitialOpen !== 'function') return;
        const v = getInitialOpen();
        if (!v || !v.tid) return;
        setTid(v.tid);
        pendingInitialCidRef.current = v.cid || null;
    }, []);
    useEffect(() => {
        const targetCid = pendingInitialCidRef.current;
        if (!targetCid || !training) return;
        const ch = (training.chapters || []).find(c => c.id === targetCid);
        if (!ch) { pendingInitialCidRef.current = null; return; }
        pendingInitialCidRef.current = null;
        openChapter(targetCid);
    }, [tid]);

    const goPage = (p) => {
        const total = chapter.pages.length;
        const np = Math.min(Math.max(0, p), total - 1);
        setPage(np);
        setLastPage(tid, cid, np);
    };

    const startQuiz = () => {
        const pool = chapter.quiz || [];
        // Gleicher Sampling-Effekt wie shuffleSample, aber wir behalten die
        // Original-Indizes — die brauchen wir, um danach SRS-Karten zu schreiben.
        const indices = pool.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const picked = indices.slice(0, Math.min(10, indices.length));
        const sample = picked.map(i => pool[i]);
        const refs = picked.map(i => ({ tid, cid, idx: i, qid: stableQid(pool[i]) }));
        setReviewMode(false);
        setQuizSet(sample); setQuizRefs(refs); setQuizIdx(0); setQuizAnswers([]); setQuizFlags([]);
        setQuizInput(sample.length ? defaultInputForItem(sample[0]) : null);
        setStage('quiz');
    };

    // Wiederholungs-Modus: zieht ueber alle Kapitel der Schulung hinweg
    // faellige Karten (heute due) und ergaenzt mit neuen Karten, falls
    // weniger als 20 zusammenkommen. Spaced Repetition lebt davon, dass
    // jeden Tag ein paar Karten beruehrt werden — kein Cramming.
    const startReview = () => {
        if (!training) return;
        const dueAll = srsDueItems(training, srsState, true);
        if (!dueAll.length) {
            window.alert('Keine Karteikarten zum Wiederholen vorhanden. Beantworte zuerst ein Kapitel-Quiz.');
            return;
        }
        // Maximal 20 Karten pro Sitzung, ueberfaellige zuerst (srsDueItems sortiert bereits).
        const sample = dueAll.slice(0, Math.min(20, dueAll.length));
        // Innerhalb der Auswahl mischen, damit nicht immer Kapitel 1 zuerst kommt.
        for (let i = sample.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sample[i], sample[j]] = [sample[j], sample[i]];
        }
        const items = sample.map(s => s.item);
        const refs = sample.map(s => ({ tid: s.trainingId, cid: s.chapterId, idx: s.idx, qid: s.qid }));
        setReviewMode(true);
        setQuizSet(items); setQuizRefs(refs); setQuizIdx(0); setQuizAnswers([]); setQuizFlags([]);
        setQuizInput(items.length ? defaultInputForItem(items[0]) : null);
        setStage('quiz');
    };

    // P-ARCH-ASSESSMENT-ENGINE: startet eine Pruefung gemaess Definition.
    // Items werden zufaellig (Fisher-Yates) aus dem gefilterten Pool gezogen,
    // bei `timeLimit > 0` startet ein Countdown der bei Ablauf den Submit ausloest.
    // Pruefungsmodus erbt die "kein-Per-Item-Feedback"-Eigenschaft vom regulaeren Quiz-Flow.
    const startAssessment = (asmt) => {
        if (!training || !asmt) return;
        const pool = buildAssessmentPool(training, asmt.poolFilter || {});
        if (pool.length < 1) {
            window.alert('Keine passenden Items fuer diese Pruefung gefunden.');
            return;
        }
        const count = Math.min(Math.max(1, asmt.count | 0 || 10), pool.length);
        if (pool.length < count) {
            // Wir tolerieren weniger Items als gewuenscht — Pool kann mit der Zeit wachsen.
        }
        const shuffled = pool.slice();
        // P-ARCH-CROSS-CHAPTER-EXAM: Reproduzierbarkeit. Wenn `asmt.seed` gesetzt ist,
        // wird der Pool deterministisch gemischt (mulberry32 ueber hashStringToSeed(seed)).
        // Sonst Math.random (jeder Versuch eine andere Auswahl).
        const rand = asmt.seed != null
            ? mulberry32(hashStringToSeed(String(asmt.seed)))
            : Math.random;
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const picked = shuffled.slice(0, count);
        const items = picked.map(p => p.item);
        const refs = picked.map(p => ({ tid: p.tid, cid: p.cid, idx: p.idx, qid: p.qid }));
        setReviewMode(false);
        setAssessmentMode(true);
        setCurrentAssessment(asmt);
        const dl = (asmt.timeLimit > 0) ? (Date.now() + asmt.timeLimit * 60 * 1000) : null;
        setDeadlineMs(dl);
        setQuizSet(items); setQuizRefs(refs); setQuizIdx(0); setQuizAnswers([]); setQuizFlags([]);
        setQuizInput(items.length ? defaultInputForItem(items[0]) : null);
        setStage('quiz');
    };

    const submitQuizAnswer = () => {
        const item = quizSet[quizIdx];
        if (!item) return;
        if (!isInputComplete(item, quizInput)) return;
        const ok = gradeQuizItem(item, quizInput);
        const next = quizAnswers.concat([{
            item,
            given: quizInput,
            ok,
            explanation: item.explanation,
            ref: quizRefs[quizIdx] || null
        }]);
        setQuizAnswers(next);
        if (quizIdx + 1 >= quizSet.length) {
            const score = next.filter(a => a.ok).length;
            // Karteikarten aktualisieren — auch im Wiederholungs-Modus.
            srsGradeMany(next.map(a => ({ ref: a.ref, ok: a.ok })).filter(u => u.ref));
            // Persistenz: regulaeres Kapitel-Quiz -> recordQuiz, Pruefung -> recordAssessment,
            // Wiederholung -> nichts (Karten kommen aus mehreren Kapiteln, Score wuerde verfaelschen).
            if (assessmentMode && currentAssessment) {
                recordAssessment(tid, currentAssessment.id, score, quizSet.length, currentAssessment.passScore);
            } else if (!reviewMode) {
                recordQuiz(tid, cid, score, quizSet.length);
            }
            setQuizInput(null);
            setDeadlineMs(null);
            setStage('quizResult');
        } else {
            const nextItem = quizSet[quizIdx + 1];
            setQuizIdx(quizIdx + 1);
            setQuizInput(defaultInputForItem(nextItem));
        }
    };

    // P-ARCH-ASSESSMENT-ENGINE: Auto-Submit beim Ablauf der Pruefungszeit.
    // Bei Ablauf wird der Rest des Quizzes mit den bisherigen Antworten + leeren
    // Antworten fuer noch nicht beantwortete Items abgeschlossen.
    const finishAssessmentExpired = useCallback(() => {
        if (!assessmentMode) return;
        // Beantwortete bleiben, unbeantwortete werden als falsch gewertet.
        const answered = quizAnswers.slice();
        for (let i = answered.length; i < quizSet.length; i++) {
            answered.push({
                item: quizSet[i],
                given: null,
                ok: false,
                explanation: quizSet[i] && quizSet[i].explanation,
                ref: quizRefs[i] || null
            });
        }
        const score = answered.filter(a => a.ok).length;
        srsGradeMany(answered.map(a => ({ ref: a.ref, ok: a.ok })).filter(u => u.ref));
        if (currentAssessment) {
            recordAssessment(tid, currentAssessment.id, score, quizSet.length, currentAssessment.passScore);
        }
        setQuizAnswers(answered);
        setQuizInput(null);
        setDeadlineMs(null);
        setStage('quizResult');
    }, [assessmentMode, quizAnswers, quizSet, quizRefs, currentAssessment, tid, recordAssessment, srsGradeMany]);

    // Tick-Effekt fuer Timer-Anzeige + Auto-Submit. Re-rendert jede Sekunde,
    // wenn deadlineMs gesetzt ist; loest beim Ablauf finishAssessmentExpired aus.
    useEffect(() => {
        if (!deadlineMs || stage !== 'quiz') return;
        const id = setInterval(() => {
            if (Date.now() >= deadlineMs) {
                clearInterval(id);
                finishAssessmentExpired();
            } else {
                setNowTick(t => (t + 1) % 1000000);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [deadlineMs, stage, finishAssessmentExpired]);

    // ---------- Stage: Index ----------
    if (stage === 'index') {
        return (
            <section className="view-fade">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <img src="icons/smartineer-logo.png" alt="" width="72" height="72"
                         className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 drop-shadow" />
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Schulungen — Zertifikats-Vorbereitung</h1>
                    <p className="text-slate-600">Buchartig aufgebaute, kapitelweise Lernpfade. Fortschritt und letzte Seite werden lokal gespeichert. Am Ende jedes Kapitels wartet ein Quiz mit zufällig gezogenen Fragen.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {trainings.map((t, i) => {
                        const tp = trainingProgress(t, state[t.id]);
                        return (
                            <button key={t.id} onClick={() => openTraining(t.id)}
                                style={{ animationDelay: `${i * 70}ms` }}
                                className="card-fade text-left bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all p-6">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.code}</div>
                                        <h3 className="text-xl font-bold text-slate-800">{t.name}</h3>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">{tp.chapterCount} Kapitel</span>
                                        {t.status === 'preparation' && (
                                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800 whitespace-nowrap">In Vorbereitung</span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-4">{t.desc}</p>
                                <div className="space-y-2">
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                                            <span>Gelesen</span><span>{tp.readPct}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 transition-all" style={{ width: `${tp.readPct}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                                            <span>Quiz-Schnitt (Best)</span><span>{tp.quizPct}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 transition-all" style={{ width: `${tp.quizPct}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ---------- Stage: Chapters ----------
    if (stage === 'chapters' && training) {
        const tState = state[training.id] || {};
        const srsStats = srsTrainingStats(training, srsState);
        return (
            <section className="view-fade">
                <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                    <div>
                        <button onClick={() => setStage('index')}
                            className="text-sm text-slate-500 hover:text-slate-800 mb-2">← Alle Schulungen</button>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{training.name}</h1>
                        <p className="text-sm text-slate-500">{training.code}</p>
                    </div>
                </div>
                {srsStats.total > 0 && (
                    <div className="mb-5 bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200 rounded-2xl p-4 md:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <div className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">Spaced Repetition</div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900">
                                    {srsStats.due > 0
                                        ? `${srsStats.due} Karteikarte${srsStats.due === 1 ? '' : 'n'} heute fällig`
                                        : srsStats.learned > 0
                                            ? 'Heute alle Karten erledigt'
                                            : 'Noch keine Karteikarten'}
                                </h3>
                                <p className="text-xs text-slate-600 mt-0.5">
                                    {srsStats.learned}/{srsStats.total} Karten gelernt
                                    {srsStats.lapsed > 0 && ` · ${srsStats.lapsed} mit Fehlerhistorie`}
                                </p>
                            </div>
                            <button onClick={startReview} disabled={srsStats.due === 0 && srsStats.fresh === 0}
                                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg shadow text-sm transition">
                                {srsStats.due > 0 ? 'Wiederholen starten' : srsStats.fresh > 0 ? 'Neue Karten lernen' : 'Nichts fällig'}
                            </button>
                        </div>
                    </div>
                )}
                {/* P-ARCH-ASSESSMENT-ENGINE: Pruefungs-Section. Wird nur gerendert,
                    wenn die Schulung `assessments: [...]` definiert. Liest Bestleistungen
                    aus `state[training.id].__assessments[asmt.id]`. */}
                {Array.isArray(training.assessments) && training.assessments.length > 0 && (
                    <div className="mb-5 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-4 md:p-5">
                        <div className="mb-3">
                            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Pruefungsmodus</div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900">Cross-Chapter-Pruefungen</h3>
                            <p className="text-xs text-slate-600 mt-0.5">Pruefung uebergreifend ueber Kapitel hinweg. Kein Per-Item-Feedback bis zum Ende; optional mit Zeitlimit und Bestehensgrenze.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {training.assessments.map(asmt => {
                                const asmEntry = (tState.__assessments || {})[asmt.id];
                                const st = assessmentStats(asmt, asmEntry);
                                const pool = buildAssessmentPool(training, asmt.poolFilter || {});
                                const enough = pool.length >= 1;
                                return (
                                    <div key={asmt.id} className="bg-white border border-indigo-200 rounded-lg px-4 py-3 flex items-center gap-4 flex-wrap">
                                        <div className="flex-1 min-w-[220px]">
                                            <div className="text-sm font-bold text-slate-800">{asmt.title}</div>
                                            <div className="text-[11px] text-slate-500 mt-0.5">
                                                {asmt.count} Items aus {pool.length} verfuegbar
                                                {asmt.timeLimit > 0 && ` · ${asmt.timeLimit} min`}
                                                {typeof asmt.passScore === 'number' && ` · Bestehen ab ${Math.round(asmt.passScore * 100)}%`}
                                                {st.attempts > 0 && ` · ${st.attempts} Versuch${st.attempts === 1 ? '' : 'e'}`}
                                            </div>
                                            {st.best && (
                                                <div className="text-[11px] mt-1">
                                                    <span className="text-slate-500">Best: </span>
                                                    <span className="font-bold text-slate-700">{st.best.score}/{st.best.total} ({Math.round(st.bestRatio * 100)}%)</span>
                                                    {st.passed === true && <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">bestanden</span>}
                                                    {st.passed === false && <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">unter Grenze</span>}
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => startAssessment(asmt)} disabled={!enough}
                                            className="text-sm font-bold px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow transition">
                                            {st.attempts > 0 ? 'Wiederholen' : 'Pruefung starten'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    {training.chapters.map((ch, i) => {
                        const cs = tState[ch.id];
                        const cp = chapterProgress(ch, cs);
                        const hasResume = cs && typeof cs.lastPage === 'number';
                        return (
                            <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">
                                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                                    <div className="flex-1 min-w-[260px]">
                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Kapitel {i + 1}</div>
                                        <h3 className="text-lg font-bold text-slate-800">{ch.title}</h3>
                                        <p className="text-sm text-slate-600 mt-1">{ch.summary}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 text-xs">
                                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">{ch.pages.length} Seite{ch.pages.length === 1 ? '' : 'n'}</span>
                                        <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">{ch.quiz.length} Quiz-Fragen</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden my-3">
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 transition-all" style={{ width: `${cp.pagePct}%` }}></div>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center justify-between">
                                    <div className="text-xs text-slate-500">
                                        Letzte Seite: {hasResume ? `${cp.lastPage + 1}/${cp.totalPages}` : '—'}
                                        {cp.quizBest && <span> · Quiz-Best: <strong>{cp.quizBest.score}/{cp.quizBest.total}</strong></span>}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {hasResume && cp.lastPage > 0 && (
                                            <button onClick={() => openChapter(ch.id)}
                                                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow text-sm hover:shadow-lg transition">
                                                Weiterlesen ({cp.lastPage + 1}/{cp.totalPages})
                                            </button>
                                        )}
                                        <button onClick={() => openChapter(ch.id, 0)}
                                            className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-4 rounded-lg text-sm transition">
                                            {hasResume ? 'Von vorn' : 'Lesen starten'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ---------- Stage: Reader ----------
    if (stage === 'reader' && training && chapter) {
        const total = chapter.pages.length;
        const cur = chapter.pages[page];
        const isLast = page >= total - 1;
        const bookmarked = isBookmarked(tid, cid, page);
        const noteValue = getNote(tid, cid, page);
        return (
            <section className="view-fade max-w-3xl mx-auto" ref={readerRef}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                            <button onClick={() => setStage('chapters')}
                                title="Zur Kapitelübersicht"
                                className="px-2 py-1 text-xs bg-white border border-slate-300 hover:bg-slate-100 rounded transition flex-shrink-0">←</button>
                            <button onClick={() => setTocOpen(true)}
                                title="Inhaltsverzeichnis"
                                className="px-2 py-1 text-xs bg-white border border-slate-300 hover:bg-slate-100 rounded transition flex-shrink-0">Inhalt</button>
                            <button onClick={() => setJumpOpen(true)}
                                title="Zu Seite springen"
                                className="px-2 py-1 text-xs bg-white border border-slate-300 hover:bg-slate-100 rounded transition flex-shrink-0">Seite…</button>
                            <button onClick={() => toggleBookmark(tid, cid, page)}
                                title={bookmarked ? 'Bookmark entfernen' : 'Diese Seite markieren'}
                                aria-pressed={bookmarked}
                                className={`px-2 py-1 text-xs rounded transition flex-shrink-0 border ${bookmarked ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-600'}`}>
                                <span aria-hidden="true">{bookmarked ? '\u2605' : '\u2606'}</span>
                                <span className="sr-only">{bookmarked ? 'Bookmark gesetzt' : 'Bookmark setzen'}</span>
                            </button>
                            <button onClick={() => setNotesOpen(v => !v)}
                                title="Notiz zu dieser Seite"
                                aria-pressed={notesOpen}
                                className={`px-2 py-1 text-xs rounded transition flex-shrink-0 border ${noteValue ? 'bg-teal-100 border-teal-300 text-teal-800' : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-600'}`}>
                                Notiz{noteValue ? ' ●' : ''}
                            </button>
                        </div>
                        <div className="text-xs text-slate-600 font-bold flex items-center gap-2">
                            {/* P-UI-READER-TYPOGRAPHY: Typografie-Toolbar (3 Groessen, Zeilenabstand, Breite). */}
                            <span className="hidden sm:inline-flex items-center gap-0.5 mr-1" role="group" aria-label="Schriftgroesse">
                                {[['sm','A','Kleinere Schrift'],['md','A','Standardschrift'],['lg','A','Groessere Schrift']].map(([sz, lbl, ttl], i) => (
                                    <button key={sz} onClick={() => setTypo({ size: sz })}
                                        title={ttl} aria-label={ttl} aria-pressed={typo.size === sz}
                                        className={`px-1.5 py-0.5 rounded border ${typo.size === sz ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-600'}`}
                                        style={{ fontSize: ['11px','13px','15px'][i] }}>{lbl}</button>
                                ))}
                            </span>
                            <button onClick={() => setTypo({ lineTall: !typo.lineTall })}
                                title="Zeilenabstand" aria-label="Zeilenabstand umschalten" aria-pressed={typo.lineTall}
                                className={`hidden sm:inline-flex px-2 py-0.5 rounded border text-[10px] ${typo.lineTall ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-600'}`}>☰</button>
                            <button onClick={() => setTypo({ wide: !typo.wide })}
                                title="Lesebreite" aria-label="Breite umschalten" aria-pressed={typo.wide}
                                className={`hidden sm:inline-flex px-2 py-0.5 rounded border text-[10px] ${typo.wide ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-600'}`}>↔</button>
                            <span>Seite {page + 1} / {total}</span>
                        </div>
                    </div>
                    <div className="px-4 py-2 text-xs text-slate-500 truncate border-b border-slate-100">
                        <span className="font-bold">{training.short || training.name}</span> · {chapter.title}
                    </div>
                    <div className="w-full bg-slate-100 h-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1 transition-all" style={{ width: `${((page + 1) / total) * 100}%` }}></div>
                    </div>
                    <article className={`p-5 md:p-7 task-fade book-page book-size-${typo.size}${typo.lineTall ? ' book-line-tall' : ''}${typo.wide ? ' book-wide' : ''}`} key={`${cid}-${page}`}>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">{cur.title}</h2>
                        {/* P-UI-READER-TYPOGRAPHY: Lesezeit-Hinweis (Annahme 200 wpm). */}
                        {(() => {
                            const wordCount = (cur.html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
                            const minutes = Math.max(1, Math.round(wordCount / 200));
                            return (
                                <p className="text-[11px] text-slate-400 mb-3">~ {minutes} min Lesezeit · {wordCount} Wörter</p>
                            );
                        })()}
                        <div className="prose-book text-slate-800" dangerouslySetInnerHTML={{ __html: applyGlossary(cur.html, glossaryMap) }} />
                        {cur.check && <InlineCheck check={cur.check} key={`check-${cid}-${page}`} />}
                    </article>
                    {notesOpen && (
                        <div className="border-t border-slate-200 bg-teal-50/50 px-4 py-3 slide-in">
                            <label className="text-xs font-bold text-teal-800 uppercase tracking-wide block mb-1">
                                Notiz zu Seite {page + 1} · {cur.title}
                            </label>
                            <textarea value={noteValue}
                                onChange={(e) => setNote(tid, cid, page, e.target.value)}
                                placeholder="Eigene Notiz, Merksatz oder Querverweis (Plain-Text, wird im Export mitgenommen)…"
                                rows={4}
                                className="w-full px-3 py-2 text-sm bg-white border border-teal-200 rounded resize-y focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                                <span>{noteValue ? `${noteValue.length} Zeichen` : 'Leere Notiz wird automatisch entfernt.'}</span>
                                {noteValue && (
                                    <button onClick={() => { setNote(tid, cid, page, ''); }}
                                        className="text-rose-700 hover:text-rose-900 underline">
                                        Notiz löschen
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
                        <button onClick={() => goPage(page - 1)} disabled={page <= 0}
                            className="px-3 py-1.5 text-sm bg-white border border-slate-300 hover:bg-slate-100 rounded transition disabled:opacity-40 disabled:cursor-not-allowed">← Zurück</button>
                        {!isLast && (
                            <button onClick={() => goPage(page + 1)}
                                className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded shadow hover:shadow-lg transition">Weiter →</button>
                        )}
                        {isLast && (
                            <button onClick={startQuiz}
                                className="px-3 py-1.5 text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded shadow hover:shadow-lg transition">
                                Quiz starten ({Math.min(10, chapter.quiz.length)} von {chapter.quiz.length})
                            </button>
                        )}
                    </div>
                </div>

                {/* TOC Overlay */}
                {tocOpen && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in overflow-y-auto"
                        onClick={() => setTocOpen(false)}>
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto slide-up my-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="border-b border-slate-200 px-5 py-3 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800">Inhaltsverzeichnis</h3>
                                <button onClick={() => setTocOpen(false)} className="text-slate-400 hover:text-slate-700 text-xl leading-none w-7 h-7 rounded-full hover:bg-slate-100" aria-label="Schließen">×</button>
                            </div>
                            <ol className="p-3">
                                {chapter.pages.map((p, i) => (
                                    <li key={i}>
                                        <button onClick={() => { goPage(i); setTocOpen(false); }}
                                            className={`w-full text-left px-3 py-2 rounded text-sm transition ${i === page ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}>
                                            <span className="text-xs text-slate-400 mr-2">{i + 1}.</span>{p.title}
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}

                {/* Page-Jump Overlay */}
                {jumpOpen && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in overflow-y-auto"
                        onClick={() => setJumpOpen(false)}>
                        <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-5 slide-up" onClick={(e) => e.stopPropagation()}>
                            <h3 className="font-bold text-slate-800 mb-3">Zu Seite springen</h3>
                            <input type="number" min={1} max={total} defaultValue={page + 1}
                                onKeyDown={(e) => { if (e.key === 'Enter') { const n = parseInt(e.target.value, 10); if (!isNaN(n)) { goPage(n - 1); setJumpOpen(false); } } }}
                                className="schueler-input mb-3" autoFocus />
                            <div className="text-xs text-slate-500 mb-3">Seite 1 bis {total}. Enter zum Springen.</div>
                            <button onClick={() => setJumpOpen(false)} className="w-full px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Abbrechen</button>
                        </div>
                    </div>
                )}
                {glossaryModal}
            </section>
        );
    }

    // ---------- Stage: Quiz ----------
    // Im Wiederholungs-Modus (reviewMode) ist `chapter` null — die Karten kommen
    // aus mehreren Kapiteln. Wir akzeptieren stattdessen `training` allein.
    if (stage === 'quiz' && training && (chapter || reviewMode || assessmentMode)) {
        const item = quizSet[quizIdx];
        if (!item) { setStage('chapters'); return null; }
        const itype = quizItemType(item);
        // Einheitliches Item-Schema (siehe AGENTS §22). `unifiedItem.stem` mappt 1:1 auf `item.q`;
        // andere Felder werden aus Stabilitaetsgruenden weiterhin direkt vom Legacy-Item gelesen.
        const qref = quizRefs[quizIdx] || {};
        const unifiedItem = toItem(item, { kind: itype, tid: qref.tid, cid: qref.cid, idx: qref.idx });
        const canSubmit = isInputComplete(item, quizInput);

        const moveSeq = (from, to) => {
            if (!Array.isArray(quizInput)) return;
            if (to < 0 || to >= quizInput.length) return;
            const next = quizInput.slice();
            [next[from], next[to]] = [next[to], next[from]];
            setQuizInput(next);
        };
        const setBlank = (i, v) => {
            if (!Array.isArray(quizInput)) return;
            const next = quizInput.slice();
            next[i] = v;
            setQuizInput(next);
        };

        return (
            <section className="view-fade max-w-2xl mx-auto" ref={quizRef}>
                {assessmentMode && currentAssessment && (() => {
                    const remainingMs = deadlineMs ? Math.max(0, deadlineMs - Date.now()) : null;
                    const lowTime = remainingMs != null && remainingMs < 60 * 1000;
                    const mm = remainingMs != null ? Math.floor(remainingMs / 60000) : null;
                    const ss = remainingMs != null ? Math.floor((remainingMs % 60000) / 1000) : null;
                    return (
                        <div className={`mb-3 rounded-xl border px-4 py-2 flex items-center justify-between gap-3 flex-wrap ${lowTime ? 'border-rose-400 bg-rose-50' : 'border-violet-300 bg-violet-50'}`}>
                            <div className="text-sm">
                                <span className="font-bold text-violet-900">Pruefungsmodus</span>
                                <span className="text-slate-700"> · {currentAssessment.title}</span>
                            </div>
                            {remainingMs != null && (
                                <div className={`text-sm font-mono font-bold ${lowTime ? 'text-rose-700' : 'text-violet-700'}`} aria-live="polite">
                                    {mm}:{String(ss).padStart(2, '0')}
                                </div>
                            )}
                        </div>
                    );
                })()}
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <span>Frage {quizIdx + 1} von {quizSet.length}</span>
                        {itype !== 'mcq' && (
                            <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px]">
                                {itype === 'sequence' ? 'Reihenfolge' : 'Lückentext'}
                            </span>
                        )}
                        {/* P-UI-QUIZ-FLAG: Stern-Toggle pro Frage. Im Endergebnis erscheinen markierte Fragen separat. */}
                        {(() => {
                            const flagged = quizFlags.indexOf(quizIdx) !== -1;
                            return (
                                <button onClick={() => setQuizFlags(flagged
                                        ? quizFlags.filter(x => x !== quizIdx)
                                        : quizFlags.concat([quizIdx]))}
                                    title={flagged ? 'Markierung entfernen' : 'Frage markieren (spaeter wiederholen)'}
                                    aria-label={flagged ? 'Markierung entfernen' : 'Frage markieren'}
                                    aria-pressed={flagged}
                                    className={`text-base leading-none px-2 py-0.5 rounded-full border transition ${flagged
                                        ? 'border-amber-400 bg-amber-100 text-amber-700'
                                        : 'border-slate-300 bg-white text-slate-400 hover:text-amber-600 hover:border-amber-300'}`}>
                                    {flagged ? '★' : '☆'}
                                </button>
                            );
                        })()}
                    </div>
                    <button onClick={() => {
                        const msg = assessmentMode
                            ? 'Pruefung abbrechen? Antworten gehen verloren und der Versuch zaehlt NICHT.'
                            : 'Quiz abbrechen? Antworten gehen verloren.';
                        if (window.confirm(msg)) {
                            setReviewMode(false);
                            setAssessmentMode(false);
                            setCurrentAssessment(null);
                            setDeadlineMs(null);
                            setStage('chapters');
                        }
                    }}
                        className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Abbrechen</button>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 transition-all duration-500"
                        style={{ width: `${(quizIdx / quizSet.length) * 100}%` }}></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 task-fade" key={quizIdx} data-item-id={unifiedItem ? unifiedItem.id : undefined}>
                    <div className="text-base md:text-lg font-bold text-slate-900 mb-5 math-block"
                        dangerouslySetInnerHTML={{ __html: unifiedItem ? unifiedItem.stem : item.q }} />

                    {itype === 'mcq' && (
                        <div className="flex flex-col gap-2 mb-5"
                            role="radiogroup"
                            aria-label="Antwortoptionen"
                            onKeyDown={(e) => {
                                // P-UI-QUIZ-A11Y: Pfeil-Tasten + Home/End + 1..9 Direktwahl.
                                const n = item.options.length;
                                let next = null;
                                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (typeof quizInput === 'number' ? quizInput + 1 : 0);
                                else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (typeof quizInput === 'number' ? quizInput - 1 : 0);
                                else if (e.key === 'Home') next = 0;
                                else if (e.key === 'End') next = n - 1;
                                else if (/^[1-9]$/.test(e.key)) {
                                    const idx = parseInt(e.key, 10) - 1;
                                    if (idx < n) next = idx;
                                }
                                if (next !== null) {
                                    e.preventDefault();
                                    const wrapped = ((next % n) + n) % n;
                                    setQuizInput(wrapped);
                                    const btns = e.currentTarget.querySelectorAll('[role="radio"]');
                                    if (btns[wrapped]) btns[wrapped].focus();
                                }
                            }}>
                            {item.options.map((opt, i) => {
                                const sel = quizInput === i;
                                return (
                                    <button key={i}
                                        role="radio"
                                        aria-checked={sel}
                                        tabIndex={sel || (typeof quizInput !== 'number' && i === 0) ? 0 : -1}
                                        onClick={() => setQuizInput(i)}
                                        className={`text-left px-4 py-3 rounded-lg border transition ${sel
                                            ? 'border-blue-500 bg-blue-50 text-blue-900 shadow'
                                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'}`}>
                                        <span className="font-bold mr-2">{String.fromCharCode(65 + i)})</span>
                                        <span dangerouslySetInnerHTML={{ __html: opt }} />
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {itype === 'sequence' && Array.isArray(quizInput) && (
                        <div className="flex flex-col gap-2 mb-5">
                            <p className="text-xs text-slate-500 mb-1">Bringe die Schritte in die korrekte Reihenfolge (oben = zuerst).</p>
                            {quizInput.map((origIdx, pos) => (
                                <div key={pos} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white">
                                    <span className="font-bold text-slate-500 w-6 text-right">{pos + 1}.</span>
                                    <span className="flex-1 text-slate-800" dangerouslySetInnerHTML={{ __html: item.items[origIdx] }} />
                                    <button onClick={() => moveSeq(pos, pos - 1)} disabled={pos === 0}
                                        className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-30" aria-label="Hoch">↑</button>
                                    <button onClick={() => moveSeq(pos, pos + 1)} disabled={pos === quizInput.length - 1}
                                        className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-30" aria-label="Runter">↓</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {itype === 'cloze' && Array.isArray(quizInput) && (
                        <div className="flex flex-col gap-3 mb-5">
                            <p className="text-xs text-slate-500">Trage die fehlenden Begriffe ein. Groß-/Kleinschreibung egal.</p>
                            {item.blanks.map((b, i) => (
                                <label key={i} className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-slate-700">{i + 1}. {b.label}</span>
                                    <input type="text" value={quizInput[i] || ''}
                                        onChange={(e) => setBlank(i, e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit) submitQuizAnswer(); }}
                                        className="px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-slate-800"
                                        autoFocus={i === 0} />
                                </label>
                            ))}
                        </div>
                    )}

                    <button onClick={() => {
                        const isLast = quizIdx + 1 >= quizSet.length;
                        if (assessmentMode && isLast) {
                            const answered = quizAnswers.length + 1;
                            const total = quizSet.length;
                            if (!window.confirm(`Pruefung jetzt abgeben? ${answered} von ${total} Fragen beantwortet. Eine Korrektur ist danach nicht moeglich.`)) return;
                        }
                        submitQuizAnswer();
                    }} disabled={!canSubmit}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/30 transition">
                        {assessmentMode && quizIdx + 1 >= quizSet.length ? 'Pruefung abgeben' : 'Antwort bestätigen'}
                    </button>
                </div>
                {glossaryModal}
            </section>
        );
    }

    // ---------- Stage: QuizResult ----------
    if (stage === 'quizResult' && training && (chapter || reviewMode || assessmentMode)) {
        const score = quizAnswers.filter(a => a.ok).length;
        const wrong = quizAnswers.length - score;
        const asmtPct = quizAnswers.length ? score / quizAnswers.length : 0;
        const asmtPassScore = (assessmentMode && currentAssessment && typeof currentAssessment.passScore === 'number') ? currentAssessment.passScore : null;
        const asmtPassed = asmtPassScore != null ? asmtPct >= asmtPassScore : null;
        return (
            <section className="view-fade max-w-3xl mx-auto" ref={resultRef}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                        {assessmentMode ? 'Pruefungs-Auswertung' : reviewMode ? 'Wiederholung — Auswertung' : 'Quiz-Auswertung'}
                    </h2>
                    <p className="text-slate-600 mb-4">
                        {training.short || training.name}
                        {assessmentMode && currentAssessment ? ` · ${currentAssessment.title}` : ''}
                        {!assessmentMode && !reviewMode && chapter ? ` · ${chapter.title}` : ''}
                        {reviewMode ? ` · ${quizAnswers.length} Karteikarte${quizAnswers.length === 1 ? '' : 'n'}` : ''}
                    </p>
                    {assessmentMode && asmtPassed != null && (
                        <div className={`inline-block mb-5 px-4 py-2 rounded-full text-sm font-bold border-2 ${asmtPassed ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-rose-50 border-rose-500 text-rose-800'}`}>
                            {asmtPassed ? `Bestanden (Bestehensgrenze ${Math.round(asmtPassScore * 100)}%)` : `Nicht bestanden (benoetigt: ${Math.round(asmtPassScore * 100)}%)`}
                        </div>
                    )}
                    <div className="flex justify-center gap-8 mb-2 flex-wrap">
                        <div><div className="text-5xl font-extrabold text-emerald-600">{score}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">richtig</div></div>
                        <div><div className="text-5xl font-extrabold text-rose-600">{wrong}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">falsch</div></div>
                        <div><div className="text-5xl font-extrabold text-slate-700">{Math.round((score / quizAnswers.length) * 100)}%</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quote</div></div>
                    </div>
                    {reviewMode && (
                        <p className="text-xs text-slate-500 mt-4">Karteikarten wurden aktualisiert. Falsche Antworten kommen morgen wieder, richtige nach gestaffelten Intervallen (Spaced Repetition).</p>
                    )}
                </div>
                {/* P-ARCH-LO-COMPETENCE + P-LP-MASTERY: Kompetenz-Heatmap (richtig/total je LO, Tag und Bloom-Stufe).
                    Wird nur gerendert, wenn das Kapitel learningObjectives definiert oder Items lo/tags/bloom tragen. */}
                {(() => {
                    const losCh = (chapter && chapter.learningObjectives) || [];
                    const loStats = {};
                    const tagStats = {};
                    const bloomStats = {};
                    quizAnswers.forEach(a => {
                        const it = a.item || {};
                        (it.lo || []).forEach(loId => {
                            loStats[loId] = loStats[loId] || { ok: 0, total: 0 };
                            loStats[loId].total += 1;
                            if (a.ok) loStats[loId].ok += 1;
                        });
                        (it.tags || []).forEach(tg => {
                            tagStats[tg] = tagStats[tg] || { ok: 0, total: 0 };
                            tagStats[tg].total += 1;
                            if (a.ok) tagStats[tg].ok += 1;
                        });
                        if (it.bloom) {
                            bloomStats[it.bloom] = bloomStats[it.bloom] || { ok: 0, total: 0 };
                            bloomStats[it.bloom].total += 1;
                            if (a.ok) bloomStats[it.bloom].ok += 1;
                        }
                    });
                    const loKeys = Object.keys(loStats);
                    const tagKeys = Object.keys(tagStats);
                    // Bloom-Stufen in didaktischer Reihenfolge (Anderson/Krathwohl 2001).
                    const BLOOM_ORDER = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'];
                    const BLOOM_LABEL = {
                        remember: 'Erinnern',
                        understand: 'Verstehen',
                        apply: 'Anwenden',
                        analyze: 'Analysieren',
                        evaluate: 'Bewerten',
                        create: 'Erschaffen'
                    };
                    const bloomKeys = BLOOM_ORDER.filter(b => bloomStats[b]);
                    if (!loKeys.length && !tagKeys.length && !bloomKeys.length) return null;
                    const heatColor = (ok, total) => {
                        if (!total) return 'bg-slate-100 text-slate-500 border-slate-200';
                        const pct = ok / total;
                        if (pct >= 0.8) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
                        if (pct >= 0.5) return 'bg-amber-100 text-amber-900 border-amber-300';
                        return 'bg-rose-100 text-rose-800 border-rose-300';
                    };
                    return (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                            <h3 className="font-bold text-slate-800 mb-1">Kompetenz-Heatmap</h3>
                            <p className="text-xs text-slate-500 mb-4">Auswertung je Lernziel und Tag (gruen ≥ 80 %, gelb 50-79 %, rot &lt; 50 %).</p>
                            {loKeys.length > 0 && (
                                <div className="mb-5">
                                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Lernziele</h4>
                                    <ul className="flex flex-col gap-2">
                                        {loKeys.map(id => {
                                            const s = loStats[id];
                                            const lo = losCh.find(x => x.id === id);
                                            const pct = Math.round((s.ok / s.total) * 100);
                                            return (
                                                <li key={id} className={`flex items-start gap-3 p-3 rounded-lg border ${heatColor(s.ok, s.total)}`}>
                                                    <span className="font-mono text-xs font-bold flex-shrink-0">{id}</span>
                                                    <span className="flex-1 text-sm">{lo ? lo.text : '(Lernziel nicht definiert)'}</span>
                                                    <span className="text-sm font-bold flex-shrink-0 whitespace-nowrap">{s.ok}/{s.total} · {pct}%</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {tagKeys.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {tagKeys.map(tg => {
                                            const s = tagStats[tg];
                                            const pct = Math.round((s.ok / s.total) * 100);
                                            return (
                                                <span key={tg} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${heatColor(s.ok, s.total)}`}>
                                                    {tg} · {s.ok}/{s.total} · {pct}%
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {bloomKeys.length > 0 && (
                                <div className="mt-5">
                                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Kognitive Stufen (Bloom)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {bloomKeys.map(bk => {
                                            const s = bloomStats[bk];
                                            const pct = Math.round((s.ok / s.total) * 100);
                                            return (
                                                <span key={bk} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${heatColor(s.ok, s.total)}`}>
                                                    {BLOOM_LABEL[bk] || bk} · {s.ok}/{s.total} · {pct}%
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}
                {/* P-UI-QUIZ-FLAG: Liste der waehrend des Quiz markierten Fragen, falls vorhanden. */}
                {quizFlags.length > 0 && (
                    <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-6">
                        <h3 className="font-bold text-amber-900 mb-2">Markierte Fragen ({quizFlags.length})</h3>
                        <p className="text-xs text-amber-800 mb-3">Fragen, die du waehrend des Laufs zur Wiederholung markiert hast.</p>
                        <ul className="flex flex-col gap-2">
                            {quizFlags.slice().sort((a, b) => a - b).map(fi => {
                                const a = quizAnswers[fi];
                                if (!a) return null;
                                return (
                                    <li key={fi} className="text-sm text-slate-800 bg-white rounded-lg border border-amber-200 px-3 py-2">
                                        <span className="font-bold text-amber-700 mr-2">Frage {fi + 1}.</span>
                                        <span className={a.ok ? 'text-emerald-700' : 'text-rose-700'}>{a.ok ? 'richtig' : 'falsch'}</span>
                                        <span className="text-slate-700"> — </span>
                                        <span className="text-slate-600" dangerouslySetInnerHTML={{ __html: a.item.q }} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">Aufgaben im Überblick</h3>
                    <ol className="flex flex-col gap-3">
                        {quizAnswers.map((a, i) => {
                            const it = a.item;
                            const itype = quizItemType(it);
                            return (
                                <li key={i} className={`p-3 rounded-lg border-l-4 ${a.ok ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50'}`}>
                                    <div className="font-bold text-slate-800 math-block" dangerouslySetInnerHTML={{ __html: `${i + 1}. ${it.q}` }} />
                                    {itype === 'mcq' && (
                                        <div className="text-sm mt-2">
                                            Deine Antwort: <strong className={a.ok ? 'text-emerald-700' : 'text-rose-700'}>
                                                {String.fromCharCode(65 + a.given)}) <span dangerouslySetInnerHTML={{ __html: it.options[a.given] }} />
                                            </strong>
                                            {!a.ok && <div className="text-slate-700 mt-1">Richtig: <strong>{String.fromCharCode(65 + it.correct)}) <span dangerouslySetInnerHTML={{ __html: it.options[it.correct] }} /></strong></div>}
                                        </div>
                                    )}
                                    {itype === 'sequence' && (
                                        <div className="text-sm mt-2 space-y-1">
                                            <div>Deine Reihenfolge: <strong className={a.ok ? 'text-emerald-700' : 'text-rose-700'}>
                                                {a.given.map((idx, k) => (k > 0 ? ' → ' : '') + String.fromCharCode(65 + idx)).join('')}
                                            </strong></div>
                                            {!a.ok && (
                                                <div className="text-slate-700">Korrekt: <strong>{it.correct.map((idx, k) => (k > 0 ? ' → ' : '') + String.fromCharCode(65 + idx)).join('')}</strong></div>
                                            )}
                                            <ol className="text-xs text-slate-600 list-none pl-0 mt-1">
                                                {it.items.map((s, k) => (
                                                    <li key={k}><span className="font-bold mr-1">{String.fromCharCode(65 + k)})</span><span dangerouslySetInnerHTML={{ __html: s }} /></li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}
                                    {itype === 'cloze' && (
                                        <div className="text-sm mt-2 space-y-1">
                                            {it.blanks.map((b, k) => {
                                                const got = (a.given && a.given[k]) || '';
                                                const okBlank = (b.accept || []).some(x => normalizeAnswer(x) === normalizeAnswer(got));
                                                return (
                                                    <div key={k}>
                                                        <span className="text-slate-600">{b.label}:</span>{' '}
                                                        <strong className={okBlank ? 'text-emerald-700' : 'text-rose-700'}>{got || '—'}</strong>
                                                        {!okBlank && <span className="text-slate-700"> · richtig: <strong>{(b.accept || [])[0]}</strong></span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {a.explanation && <div className="text-xs text-slate-600 mt-2 italic" dangerouslySetInnerHTML={{ __html: applyGlossary(a.explanation, glossaryMap) }} />}
                                    {/* P-LP-FEEDBACK-LINKS: bei falscher Antwort Lehrseiten-Vorschlaege via lo/tags-Match.
                                        Reviewmode: ueberspringt (Karteikarten kommen aus mehreren Kapiteln). */}
                                    {!a.ok && !reviewMode && chapter && (() => {
                                        const itLo = (it.lo || []);
                                        const itTags = (it.tags || []);
                                        if (!itLo.length && !itTags.length) return null;
                                        const matches = chapter.pages.map((p, pi) => {
                                            const pLo = (p.lo || []);
                                            const pTags = (p.tags || []);
                                            const loHit = pLo.filter(x => itLo.indexOf(x) !== -1).length;
                                            const tagHit = pTags.filter(x => itTags.indexOf(x) !== -1).length;
                                            return { pi, page: p, score: loHit * 3 + tagHit };
                                        }).filter(m => m.score > 0).sort((x, y) => y.score - x.score).slice(0, 2);
                                        if (!matches.length) return null;
                                        return (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {matches.map(m => (
                                                    <button key={m.pi}
                                                        onClick={() => openChapter(chapter.id, m.pi)}
                                                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition">
                                                        Lehrseite nachlesen: {m.page.title}
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })()}
                                </li>
                            );
                        })}
                    </ol>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    {assessmentMode ? (
                        <>
                            <button onClick={() => { const a = currentAssessment; setAssessmentMode(false); setCurrentAssessment(null); startAssessment(a); }}
                                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">Pruefung erneut versuchen</button>
                            <button onClick={() => { setAssessmentMode(false); setCurrentAssessment(null); setStage('chapters'); }}
                                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Zur Kapitelübersicht</button>
                        </>
                    ) : reviewMode ? (
                        <>
                            <button onClick={startReview} className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">Weiter wiederholen</button>
                            <button onClick={() => { setReviewMode(false); setStage('chapters'); }} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Zur Kapitelübersicht</button>
                        </>
                    ) : (
                        <>
                            <button onClick={startQuiz} className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">Quiz wiederholen</button>
                            {/* P-UI-READER-CONTINUE: direkter Sprung in das naechste Kapitel der Schulung,
                                falls vorhanden. Vermeidet den Umweg ueber die Kapiteluebersicht. */}
                            {(() => {
                                if (!chapter || !training) return null;
                                const idx = training.chapters.findIndex(c => c.id === chapter.id);
                                if (idx < 0 || idx >= training.chapters.length - 1) return null;
                                const nextCh = training.chapters[idx + 1];
                                return (
                                    <button onClick={() => openChapter(nextCh.id, 0)}
                                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">
                                        Naechstes Kapitel: {nextCh.title}
                                    </button>
                                );
                            })()}
                            <button onClick={() => setStage('reader')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Zurück zum Kapitel</button>
                            <button onClick={() => setStage('chapters')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Anderes Kapitel</button>
                        </>
                    )}
                </div>
                {glossaryModal}
            </section>
        );
    }

    return null;
}

// ---------------------------------------------------------------- Install Prompt
function detectPlatform() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isAndroid = /Android/.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    return { isIOS, isAndroid, isStandalone };
}

function InstallPrompt({ open, onClose, deferredEvent, platform }) {
    if (!open) return null;
    const installNative = async () => {
        if (deferredEvent) {
            deferredEvent.prompt();
            try { await deferredEvent.userChoice; } catch (e) { /* ignore */ }
        }
        onClose(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 fade-in"
            onClick={() => onClose(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative slide-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => onClose(false)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full hover:bg-slate-100 transition text-xl leading-none" aria-label="Schließen">×</button>
                <div className="flex items-center gap-3 mb-4">
                    <img src="icons/smartineer-logo.png" alt="" width="48" height="48" className="w-12 h-12" />
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Smartineer als App</h3>
                        <p className="text-xs text-slate-500">Offline lernen, schneller Start vom Homescreen</p>
                    </div>
                </div>

                {platform.isIOS && (
                    <div className="space-y-3 text-sm text-slate-700">
                        <p>Auf <strong>iPhone / iPad</strong> in Safari:</p>
                        <ol className="list-decimal list-inside space-y-2 bg-slate-50 p-4 rounded-lg">
                            <li>Tippe unten auf das <strong>Teilen-Symbol</strong> (Quadrat mit Pfeil nach oben).</li>
                            <li>Wähle <strong>„Zum Home-Bildschirm"</strong>.</li>
                            <li>Bestätige mit <strong>Hinzufügen</strong> oben rechts.</li>
                        </ol>
                        <p className="text-xs text-slate-500">Smartineer startet danach wie eine native App, auch offline.</p>
                    </div>
                )}

                {!platform.isIOS && deferredEvent && (
                    <div className="space-y-4 text-sm text-slate-700">
                        <p>Smartineer kann als App installiert werden — offline-fähig, ohne Browser-Leiste.</p>
                        <button onClick={installNative}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">
                            Jetzt installieren
                        </button>
                    </div>
                )}

                {!platform.isIOS && !deferredEvent && (
                    <div className="space-y-3 text-sm text-slate-700">
                        <p>Auf <strong>Android (Chrome / Edge)</strong>:</p>
                        <ol className="list-decimal list-inside space-y-2 bg-slate-50 p-4 rounded-lg">
                            <li>Öffne das <strong>Menü</strong> (Drei-Punkte oben rechts).</li>
                            <li>Wähle <strong>„App installieren"</strong> oder <strong>„Zum Startbildschirm hinzufügen"</strong>.</li>
                            <li>Bestätigen.</li>
                        </ol>
                        <p>Auf <strong>Desktop</strong>: in der Adressleiste auf das Install-Icon klicken (Chrome/Edge).</p>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-5">
                    <button onClick={() => onClose(true)}
                        className="text-sm text-slate-500 hover:text-slate-800 px-3 py-1.5 transition">Nicht mehr fragen</button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------- Optionen
// Tabs: Konto, Kategorien, Daten (Export/Import + Reset), Store (Skeleton),
// PWA (Install), Admin (nur fuer admin-Rolle).
function Optionen({ data, allOrder, vis, auth, onExport, onImport, onReset, onInstall, installAvailable }) {
    const [tab, setTab] = useState('konto');
    const tabs = [
        { id: 'konto',      label: 'Konto' },
        { id: 'kategorien', label: 'Kategorien' },
        { id: 'daten',      label: 'Daten' },
        { id: 'store',      label: 'Store' },
        { id: 'pwa',        label: 'App-Installation' }
    ];
    if (auth.isAdmin) tabs.push({ id: 'admin', label: 'Admin' });

    return (
        <section className="view-fade max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Optionen</h1>
                <p className="text-slate-600 text-sm">Konto, Kategorie-Sichtbarkeit, Daten-Sync, App-Installation.</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-200">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`px-4 py-2 text-sm font-bold border-b-2 transition ${tab === t.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'konto' && <OptionenKonto auth={auth} />}
            {tab === 'kategorien' && <OptionenKategorien data={data} allOrder={allOrder} vis={vis} />}
            {tab === 'daten' && <OptionenDaten onExport={onExport} onImport={onImport} onReset={onReset} />}
            {tab === 'store' && <OptionenStore auth={auth} />}
            {tab === 'pwa' && <OptionenPwa onInstall={onInstall} installAvailable={installAvailable} />}
            {tab === 'admin' && auth.isAdmin && <OptionenAdmin auth={auth} vis={vis} />}
        </section>
    );
}

function OptionenKonto({ auth }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState(null);
    const submit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const r = auth.login(user.trim(), pass.trim());
        if (r.ok) { setUser(''); setPass(''); setErr(null); }
        else setErr(r.error || 'Anmeldung fehlgeschlagen.');
    };
    if (auth.disabled) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Login temporaer deaktiviert</h3>
                <p className="text-sm text-slate-600 mb-3">Der Schulungen-Bereich ist voruebergehend ohne Anmeldung nutzbar. Die Reaktivierung ist als Arbeitspaket <code>P-UI-LOGIN-REACTIVATE</code> in <code>WORKPACKAGES.md</code> vermerkt.</p>
                <p className="text-xs text-slate-400">Hinweis: Auch nach Reaktivierung bleibt diese Frontend-Only-Anmeldung nur eine UX-Hilfe und kein echter Schutz.</p>
            </div>
        );
    }
    if (auth.session) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Angemeldet</h3>
                <p className="text-sm text-slate-700 mb-1">Benutzer: <strong>{auth.session.user}</strong> ({auth.session.role})</p>
                <p className="text-xs text-slate-500 mb-4">Sitzung gueltig bis {new Date(auth.session.expires).toLocaleString()}.</p>
                <button onClick={auth.logout}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-5 rounded-lg shadow transition">Abmelden</button>
                <p className="text-xs text-slate-400 mt-4">Hinweis: Die Anmeldung dient allein der Zugangs-Bequemlichkeit, nicht der Sicherheit. Credentials liegen client-seitig in <code>js/auth-credentials.js</code>.</p>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Anmelden</h3>
            <p className="text-sm text-slate-600 mb-4">Notwendig nur fuer den Schulungen-Bereich. Dashboard, Training, Cheatsheets und Schueler-Bereich sind ohne Anmeldung nutzbar.</p>
            {/* {auth.configured && (
                <div className="bg-blue-50 border border-blue-200 text-blue-900 text-sm p-3 rounded-lg mb-4">
                    Default-Zugangsdaten (siehe <code>js/auth-credentials.js</code>): <strong>admin / admin</strong> oder <strong>user / user</strong>. Lokal in <code>js/auth-credentials.js</code> anpassen.
                </div>
            )} */}
            {!auth.configured && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm p-3 rounded-lg mb-4">
                    Auth-Konfiguration fehlt: <code>js/auth-credentials.js</code> nicht geladen. Beispiel siehe <code>js/auth-credentials.example.js</code>.
                </div>
            )}
            <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm">
                <label className="flex flex-col gap-1 text-sm">
                    <span className="font-bold text-slate-700">Benutzername</span>
                    <input type="text" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white text-slate-800" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                    <span className="font-bold text-slate-700">Passwort</span>
                    <input type="password" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white text-slate-800" />
                </label>
                {err && <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-2">{err}</div>}
                <button type="submit" disabled={!auth.configured || !user.trim() || !pass}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg shadow transition w-fit">
                    Anmelden
                </button>
            </form>
        </div>
    );
}

function OptionenKategorien({ data, allOrder, vis }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Sichtbare Kategorien</h3>
            <p className="text-sm text-slate-600 mb-4">Deaktivierte Kategorien verschwinden aus Dashboard, Training, Cheatsheet und Radar. Aufgaben-Fortschritt bleibt erhalten und kommt zurueck, sobald du eine Kategorie wieder einblendest.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allOrder.map(k => {
                    const cat = data[k]; if (!cat) return null;
                    const visible = vis.isVisible(k);
                    return (
                        <label key={k} className={`flex items-start gap-3 px-3 py-2 rounded-lg border cursor-pointer transition ${visible ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200 bg-slate-50'}`}>
                            <input type="checkbox" className="mt-1" checked={visible} onChange={() => vis.toggle(k)} />
                            <div className="min-w-0">
                                <div className="font-bold text-slate-800 text-sm">{cat.name}</div>
                                <div className="text-xs text-slate-500 line-clamp-2">{cat.desc}</div>
                            </div>
                        </label>
                    );
                })}
            </div>
            <button onClick={vis.reset}
                className="mt-4 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition">Alle einblenden</button>
        </div>
    );
}

function OptionenDaten({ onExport, onImport, onReset }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Lernfortschritt</h3>
            <p className="text-sm text-slate-600 mb-4">Geraeteuebergreifender Abgleich ueber portable JSON-Datei. Theme und Anmeldung werden bewusst nicht exportiert (geraete-spezifisch).</p>
            <div className="flex flex-wrap gap-3">
                <button onClick={onExport}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-5 rounded-lg transition">Fortschritt exportieren</button>
                <button onClick={onImport}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-5 rounded-lg transition">Fortschritt importieren</button>
                <button onClick={onReset}
                    className="bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold py-2 px-5 rounded-lg transition">Fortschritt zuruecksetzen</button>
            </div>
        </div>
    );
}

function OptionenStore({ auth }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Store — Kategorien &amp; Schulungen freischalten</h3>
            <p className="text-sm text-slate-600 mb-4">Geplante Funktion: hier wirst du in Zukunft zusaetzliche Kategorien und Schulungen freischalten oder eigene zur Aufnahme vorschlagen koennen. Das Backend dafuer ist noch nicht implementiert &mdash; Smartineer ist eine reine Static-Site (siehe AGENTS.md §1).</p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 space-y-2">
                <div><strong>Status:</strong> Skeleton / Coming Soon</div>
                <div><strong>Geplant:</strong></div>
                <ul className="list-disc list-inside text-slate-600 ml-2">
                    <li>Freischalt-Codes fuer proprietaere Kategorien (lokal validiert).</li>
                    <li>User-Vorschlag fuer neue Kategorie / Schulung (per Mailto-Link, kein Backend).</li>
                    <li>Optional: Anbindung an einen Static-File-Manifest mit signierten Modulen.</li>
                </ul>
                <div className="text-xs text-slate-500 mt-2">Hinweis: Da Smartineer kein Backend hat, ist eine echte Bezahlung/Lizenzierung nur mit zusaetzlicher Infrastruktur moeglich. Dies waere eine Architektur-Aenderung und muss vorher diskutiert werden (siehe AGENTS.md §1).</div>
            </div>
            <a href="mailto:?subject=Smartineer%20Store%20-%20Vorschlag&body=Bitte%20beschreibe%20deinen%20Wunsch%20fuer%20eine%20neue%20Kategorie%20oder%20Schulung."
                className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow text-sm hover:shadow-lg transition">
                Vorschlag per E-Mail senden
            </a>
            {!auth.disabled && !auth.session && (
                <p className="text-xs text-slate-400 mt-4">Hinweis: Spaeter wird der Store an dein Konto gekoppelt sein.</p>
            )}
        </div>
    );
}

function OptionenPwa({ onInstall, installAvailable }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">App-Installation</h3>
            <p className="text-sm text-slate-600 mb-4">Smartineer ist eine PWA und kann auf Smartphone, Tablet und Desktop wie eine native App installiert werden. Service Worker speichert die App-Shell offline.</p>
            <button onClick={onInstall} disabled={!installAvailable}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg shadow transition">
                Als App installieren
            </button>
            {!installAvailable && (
                <p className="text-xs text-slate-500 mt-3">Smartineer ist bereits installiert oder dein Browser unterstuetzt keine PWA-Installation.</p>
            )}
        </div>
    );
}

function OptionenAdmin({ auth }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Admin</h3>
            <p className="text-sm text-slate-600 mb-2">Eingeloggt als <strong>{auth.session.user}</strong> (admin).</p>
            <p className="text-sm text-slate-500">Reservierter Bereich fuer kuenftige globale Konfigurationen (Default-Sichtbarkeit von Kategorien, Store-Manifest-URL, Auth-Defaults). Aktuell keine Aktionen verfuegbar.</p>
        </div>
    );
}

// ---------------------------------------------------------------- App
function App() {
    const data = window.APP_DATA || {};
    const allOrder = (window.APP_ORDER && window.APP_ORDER.length) ? window.APP_ORDER : Object.keys(data);
    const auth = useAuth();
    const vis = useVisibleCategories(allOrder);
    const order = vis.visibleOrder;

    const [view, setView] = useState('dashboard');
    const [currentCat, setCurrentCat] = useState(allOrder[0] || null);
    const { isSolved, setSolved, reset } = useProgress();
    // P-LP-SRS-OPEN: SRS-State wird im App-Root gehalten und an Training, Dashboard
    // sowie Schulungen durchgereicht, damit alle Tracks denselben SRS-Storage sehen.
    const { state: srsState, gradeMany: srsGradeMany, reset: resetSRS } = useSRSState();

    // Theme: Default hell. Pre-paint-Skript in index.html setzt die Klasse bereits am <html>,
    // hier wird der State synchron daraus initialisiert und bei Änderung sowohl <html> als auch <body> markiert.
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { return 'light'; }
    });
    useEffect(() => {
        const el = document.documentElement;
        const body = document.body;
        el.classList.remove('theme-dark', 'theme-light');
        body.classList.remove('theme-dark', 'theme-light');
        el.classList.add('theme-' + theme);
        body.classList.add('theme-' + theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* quota */ }
    }, [theme]);
    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    // PWA Install
    const [deferredEvent, setDeferredEvent] = useState(null);
    const [installOpen, setInstallOpen] = useState(false);
    const [platform] = useState(() => detectPlatform());

    useEffect(() => {
        const onBefore = (e) => { e.preventDefault(); setDeferredEvent(e); };
        window.addEventListener('beforeinstallprompt', onBefore);
        const onInstalled = () => { setDeferredEvent(null); setInstallOpen(false); };
        window.addEventListener('appinstalled', onInstalled);
        return () => {
            window.removeEventListener('beforeinstallprompt', onBefore);
            window.removeEventListener('appinstalled', onInstalled);
        };
    }, []);

    // Auto-open install hint once on mobile (if not standalone, not dismissed)
    useEffect(() => {
        const dismissed = localStorage.getItem(INSTALL_DISMISS_KEY);
        if (dismissed === '1') return;
        if (platform.isStandalone) return;
        if (!(platform.isIOS || platform.isAndroid)) return;
        const t = setTimeout(() => setInstallOpen(true), 2500);
        return () => clearTimeout(t);
    }, [platform]);

    const closeInstall = (dismissPersistent) => {
        if (dismissPersistent) localStorage.setItem(INSTALL_DISMISS_KEY, '1');
        setInstallOpen(false);
    };

    const openCategory = (k, targetView) => {
        setCurrentCat(k);
        if (targetView) setView(targetView);
    };

    // P-LP-DAILY-MIX: oeffnet eine Trainings-Aufgabe an genauer (catId, level, idx)-
    // Position. Die Position wird in einem Ref zwischengepuffert; <Training> liest
    // sie beim Mount oder bei catId-Wechsel ueber `initialLevel`/`initialIdx` und
    // ruft anschliessend consumeInitialPos() auf.
    const pendingTrainingPosRef = useRef(null);
    const openTrainingAt = (catId, level, idx) => {
        pendingTrainingPosRef.current = { level, idx };
        setCurrentCat(catId);
        setView('training');
    };

    // P-UI-DASHBOARD-RESUME: Ein-Klick-Wiedereinstieg in die zuletzt bearbeitete Schulung.
    // Ref puffert {tid, cid}; <Schulungen> konsumiert es per `getInitialOpen()`-Prop beim Mount
    // und springt direkt in den Reader an die gespeicherte `lastPage`.
    const pendingSchulungOpenRef = useRef(null);
    const onResumeSchulung = (tid, cid) => {
        pendingSchulungOpenRef.current = { tid, cid };
        setView('schulungen');
    };
    // Resume-Kandidat: juengste Schulungens-Aktivitaet aus Storage + Schulungs-Liste.
    const resumeCandidate = useMemo(() => computeResumeCandidate(), [view]);

    // P-UI-RESET-ALL: bisher leerte onReset nur den Ingenieurs-Track (STORAGE_KEY).
    // Schulungen-Lesefortschritt, SRS-Karten, Reader-Notizen/Bookmarks und Typografie
    // blieben hingegen liegen — entsprach nicht der User-Erwartung von „Fortschritt
    // zurueecksetzen". Wir leeren jetzt alle persistenten Lern-Tracks (NICHT Theme,
    // NICHT Install-Dismiss, NICHT Auth) und laden anschliessend neu, damit alle
    // Hooks den frischen Storage sehen.
    const onReset = () => {
        const msg = 'Wirklich allen lokalen Fortschritt zuruecksetzen?\n\n'
            + 'Es werden geleert:\n'
            + '  - Trainings-Fortschritt (gelloeste Aufgaben)\n'
            + '  - Schulungen-Lesefortschritt + Quiz-Bestleistungen + Prufungs-Historie\n'
            + '  - Spaced-Repetition-Karten (alle Tracks)\n'
            + '  - Reader-Notizen, Bookmarks und Typografie-Einstellungen\n\n'
            + 'Theme, Login und der App-Install-Hinweis bleiben erhalten.\n'
            + 'Die App laedt anschliessend neu.';
        if (!window.confirm(msg)) return;
        try {
            reset();           // STORAGE_KEY (Ingenieurs-Track)
            resetSRS();        // SRS_KEY (alle Tracks inkl. __training__)
            localStorage.removeItem(SCHULUNGEN_KEY);
            localStorage.removeItem(READER_NOTES_KEY);
            localStorage.removeItem(READER_BOOKMARKS_KEY);
            localStorage.removeItem(READER_TYPO_KEY);
        } catch (e) { /* quota */ }
        // Reload (timeout, damit React den State-Reset zuerst commiten kann).
        setTimeout(() => { try { window.location.reload(); } catch (e) {} }, 50);
    };

    // ---------- Export / Import Fortschritt
    const fileInputRef = useRef(null);

    const onExport = () => {
        try { downloadProgressFile(); }
        catch (e) { window.alert('Export fehlgeschlagen: ' + (e && e.message || e)); }
    };

    const onImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    const onImportFile = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            let payload;
            try { payload = JSON.parse(reader.result); }
            catch (err) {
                window.alert('Datei ist kein gültiges JSON.');
                return;
            }
            const choice = window.confirm(
                'Fortschritt aus Datei importieren.\n\n'
                + 'OK = mit vorhandenem Fortschritt zusammenführen (gelöste Aufgaben bleiben gelöst, beste Quiz-Werte gewinnen).\n'
                + 'Abbrechen = Import abbrechen.'
            );
            if (!choice) return;
            try {
                applyImportedPayload(payload, 'merge');
                window.alert('Import erfolgreich. Die App wird jetzt neu geladen, damit alle Ansichten aktualisiert werden.');
                window.location.reload();
            } catch (err) {
                window.alert('Import fehlgeschlagen: ' + (err && err.message || err));
            }
        };
        reader.onerror = () => window.alert('Datei konnte nicht gelesen werden.');
        reader.readAsText(file);
    };

    const showInstallButton = !platform.isStandalone && (deferredEvent || platform.isIOS || platform.isAndroid);

    if (!allOrder.length) {
        return (
            <div className="p-8 text-red-700">
                Keine Daten geladen. Prüfe die Skript-Reihenfolge in <code>index.html</code>.
            </div>
        );
    }

    return (
        <>
            <Nav view={view} setView={setView} theme={theme} onToggleTheme={toggleTheme} />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {view === 'dashboard' && (
                    <Dashboard data={data} order={order} isSolved={isSolved}
                        srsState={srsState}
                        onOpenCategory={openCategory} onOpenTrainingAt={(catId, level, idx) => openTrainingAt(catId, level, idx)}
                        onResumeSchulung={onResumeSchulung}
                        resumeCandidate={resumeCandidate}
                        onReset={null}
                        onExport={null} onImport={null}
                        onInstall={null} />
                )}
                {view === 'training' && (
                    <Training data={data} order={order}
                        isSolved={isSolved} setSolved={setSolved}
                        srsState={srsState} srsGradeMany={srsGradeMany}
                        currentCat={(order.includes(currentCat) ? currentCat : order[0])} setCurrentCat={setCurrentCat}
                        initialLevel={pendingTrainingPosRef.current ? pendingTrainingPosRef.current.level : null}
                        initialIdx={pendingTrainingPosRef.current ? pendingTrainingPosRef.current.idx : null}
                        consumeInitialPos={() => { pendingTrainingPosRef.current = null; }}
                        />
                )}
                {view === 'cheatsheet' && (
                    <Cheatsheet data={data} order={order} />
                )}
                {view === 'schueler' && (
                    <Schueler />
                )}
                {view === 'schulungen' && (
                    <Schulungen auth={auth} onGoToOptionen={() => setView('optionen')}
                        srsState={srsState} srsGradeMany={srsGradeMany}
                        getInitialOpen={() => {
                            const v = pendingSchulungOpenRef.current;
                            pendingSchulungOpenRef.current = null;
                            return v;
                        }} />
                )}
                {view === 'optionen' && (
                    <Optionen data={data} allOrder={allOrder} vis={vis} auth={auth}
                        onExport={onExport} onImport={onImportClick} onReset={onReset}
                        onInstall={showInstallButton ? () => setInstallOpen(true) : null}
                        installAvailable={!!showInstallButton} />
                )}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
                <p>Smartineer · Wissen Reloaded © 2026 · Ingenieur-Brain-Update</p>
            </footer>
            <InstallPrompt open={installOpen} onClose={closeInstall}
                deferredEvent={deferredEvent} platform={platform} />
            <input ref={fileInputRef} type="file" accept="application/json,.json"
                onChange={onImportFile}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                aria-hidden="true" tabIndex={-1} />
        </>
    );
}

// ---------------------------------------------------------------- Mount
const rootEl = document.getElementById('react-root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
}
