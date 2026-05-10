/*
 * Smartineer — React-App (JSX, in-browser via Babel-standalone, kein Build-Schritt).
 * Daten kommen aus js/data/<id>.js (legen window.APP_DATA und window.APP_ORDER an).
 */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

const STORAGE_KEY = 'wissen_reloaded_progress_v1';
const INSTALL_DISMISS_KEY = 'smartineer_install_dismissed_v1';
const THEME_KEY = 'smartineer_theme_v1'; // 'dark' | 'light' (Default: 'dark')
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
const EXPORT_KEYS = [STORAGE_KEY, SCHULUNGEN_KEY, SRS_KEY];

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
    const items = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'training', label: 'Training' },
        { id: 'cheatsheet', label: 'Cheatsheets' },
        { id: 'schulungen', label: 'Schulungen' },
        { id: 'schueler', label: 'Schüler' },
        { id: 'optionen', label: 'Optionen' }
    ];
    return (
        <nav className="nav-glass sticky top-0 z-40 backdrop-blur-md bg-slate-900/90 text-white shadow-lg border-b border-slate-700/50 w-full">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between gap-2 h-16 items-center min-w-0">
                    <a href="./" className="flex items-center gap-2 min-w-0 flex-shrink" aria-label="Smartineer Home">
                        <img src="icons/icon.svg" alt="" width="36" height="36"
                             className="w-9 h-9 rounded-xl shadow-lg flex-shrink-0" />
                        <span className="hidden sm:inline text-base sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent truncate">Smartineer</span>
                    </a>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {items.map(it => {
                            const active = view === it.id;
                            return (
                                <button key={it.id}
                                    onClick={() => setView(it.id)}
                                    title={it.label}
                                    aria-label={it.label}
                                    aria-current={active ? 'page' : undefined}
                                    className={`nav-btn inline-flex items-center justify-center gap-2 whitespace-nowrap px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${active
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}`}>
                                    <span className="md:hidden flex" aria-hidden="true">{NAV_ICONS[it.id]}</span>
                                    <span className="hidden md:inline">{it.label}</span>
                                </button>
                            );
                        })}
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

function Dashboard({ data, order, isSolved, srsState, onOpenCategory, onOpenTrainingAt, onReset, onInstall, onExport, onImport }) {
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
                                <p className="text-slate-500 text-sm italic">Noch keine Aufgaben verfuegbar.</p>
                            ) : (
                                <ol ref={dailyMixRef} className="flex flex-col gap-2">
                                    {dailyMix.map((entry, i) => {
                                        const stem = (entry.task && (entry.task.q || '')) + '';
                                        const short = stem.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140);
                                        const cat = data[entry.catId];
                                        const catName = cat ? cat.name : entry.catId;
                                        return (
                                            <li key={`${entry.catId}-${entry.level}-${entry.idx}`} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-3 hover:border-emerald-400 transition">
                                                <span className="text-xs font-bold text-slate-400 w-6 flex-shrink-0">{i + 1}.</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs uppercase tracking-wide text-slate-500">{catName} · L{entry.level + 1} · #{entry.idx + 1}</div>
                                                    <div className="text-sm text-slate-700 truncate">{short || '(Aufgabe)'}</div>
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
                                    <div className="flex items-center gap-1 mt-2" title={`Mastery (SRS): ${MASTERY_LABELS[mIdx]}`}>
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
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    useEffect(() => { setShowHint(false); setShowSolution(false); }, [catId, lvl, idx]);

    // Einheitliches Item-Schema (siehe AGENTS §22). Verhalten unveraendert: Stem/Hint/Solution
    // werden ueber den Adapter gelesen, der Legacy-Felder `q`/`h`/`s` 1:1 auf `stem`/`h`/`s` mappt.
    const item = toItem(task, { kind: 'training', catId, level: lvl, idx });
    const stem = item ? item.stem : (task && task.q);
    const hintHtml = item ? item.h : (task && task.h);
    const solutionHtml = item ? item.s : (task && task.s);

    const ref = useKaTeX([catId, lvl, idx, stem, showHint, showSolution]);
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
                <button onClick={() => setShowHint(true)}
                    className="bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 font-medium py-2 px-4 rounded-lg transition">
                    Formel / Ansatz
                </button>
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

            {showHint && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg slide-in">
                    <h4 className="text-sm font-bold text-amber-800 mb-1">Formel / Ansatz</h4>
                    <div className="text-amber-900 math-block" dangerouslySetInnerHTML={{ __html: hintHtml }} />
                </div>
            )}
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
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Schüler-Bereich</h1>
                    <p className="text-slate-600">Wähle eine Klassenstufe. Mathematik ist verfügbar für Klasse 1–4. Klassen 5–10 sind in Vorbereitung; Englisch folgt ab Klasse 5.</p>
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
                    <input type="text" inputMode="text" autoComplete="off" autoCapitalize="off" autoFocus
                        value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={onKey}
                        placeholder="Deine Antwort"
                        className="schueler-input mb-4" />
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
    const reset = useCallback(() => persist({}), [persist]);
    return { state, setLastPage, recordQuiz, reset };
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
// 0 = unbekannt (keine Karte), 1 = familiar (1 reps oder lapses),
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

const MASTERY_LABELS = ['unbekannt', 'familiar', 'practiced', 'proficient', 'mastered'];
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

function Schulungen({ auth, onGoToOptionen, srsState, srsGradeMany }) {
    const trainings = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
    const { state, setLastPage, recordQuiz } = useSchulungenState();
    const [stage, setStage] = useState('index'); // index | chapters | reader | quiz | quizResult
    const [tid, setTid] = useState(null);
    const [cid, setCid] = useState(null);
    const [page, setPage] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);
    const [jumpOpen, setJumpOpen] = useState(false);
    const [quizSet, setQuizSet] = useState([]);
    const [quizRefs, setQuizRefs] = useState([]); // parallel zu quizSet: {tid,cid,idx} pro Item
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizInput, setQuizInput] = useState(null);
    const [reviewMode, setReviewMode] = useState(false);

    const readerRef = useKaTeX([stage, tid, cid, page]);
    const quizRef = useKaTeX([stage, quizIdx]);
    const resultRef = useKaTeX([stage, quizAnswers.length]);

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
        setQuizSet(sample); setQuizRefs(refs); setQuizIdx(0); setQuizAnswers([]);
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
        setQuizSet(items); setQuizRefs(refs); setQuizIdx(0); setQuizAnswers([]);
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
            // Quiz-Best/Last nur fuer regulaere Kapitel-Quizze: im Review-Modus
            // wuerde ein Score, der Karten aus mehreren Kapiteln mischt, die
            // Kapitel-Statistiken verfaelschen.
            if (!reviewMode) recordQuiz(tid, cid, score, quizSet.length);
            setQuizInput(null);
            setStage('quizResult');
        } else {
            const nextItem = quizSet[quizIdx + 1];
            setQuizIdx(quizIdx + 1);
            setQuizInput(defaultInputForItem(nextItem));
        }
    };

    // ---------- Stage: Index ----------
    if (stage === 'index') {
        return (
            <section className="view-fade">
                <div className="text-center max-w-3xl mx-auto mb-8">
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
                        </div>
                        <div className="text-xs text-slate-600 font-bold">Seite {page + 1} / {total}</div>
                    </div>
                    <div className="px-4 py-2 text-xs text-slate-500 truncate border-b border-slate-100">
                        <span className="font-bold">{training.short || training.name}</span> · {chapter.title}
                    </div>
                    <div className="w-full bg-slate-100 h-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1 transition-all" style={{ width: `${((page + 1) / total) * 100}%` }}></div>
                    </div>
                    <article className="p-5 md:p-7 task-fade book-page" key={`${cid}-${page}`}>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">{cur.title}</h2>
                        <div className="prose-book text-slate-800" dangerouslySetInnerHTML={{ __html: cur.html }} />
                    </article>
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
                    <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 fade-in"
                        onClick={() => setTocOpen(false)}>
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto slide-up" onClick={(e) => e.stopPropagation()}>
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
                    <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
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
            </section>
        );
    }

    // ---------- Stage: Quiz ----------
    // Im Wiederholungs-Modus (reviewMode) ist `chapter` null — die Karten kommen
    // aus mehreren Kapiteln. Wir akzeptieren stattdessen `training` allein.
    if (stage === 'quiz' && training && (chapter || reviewMode)) {
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
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        Frage {quizIdx + 1} von {quizSet.length}
                        {itype !== 'mcq' && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px]">
                                {itype === 'sequence' ? 'Reihenfolge' : 'Lückentext'}
                            </span>
                        )}
                    </div>
                    <button onClick={() => { if (window.confirm('Quiz abbrechen? Antworten gehen verloren.')) { setReviewMode(false); setStage('chapters'); } }}
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
                        <div className="flex flex-col gap-2 mb-5">
                            {item.options.map((opt, i) => {
                                const sel = quizInput === i;
                                return (
                                    <button key={i} onClick={() => setQuizInput(i)}
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

                    <button onClick={submitQuizAnswer} disabled={!canSubmit}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/30 transition">
                        Antwort bestätigen
                    </button>
                </div>
            </section>
        );
    }

    // ---------- Stage: QuizResult ----------
    if (stage === 'quizResult' && training && (chapter || reviewMode)) {
        const score = quizAnswers.filter(a => a.ok).length;
        const wrong = quizAnswers.length - score;
        return (
            <section className="view-fade max-w-3xl mx-auto" ref={resultRef}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{reviewMode ? 'Wiederholung — Auswertung' : 'Quiz-Auswertung'}</h2>
                    <p className="text-slate-600 mb-6">
                        {training.short || training.name}
                        {!reviewMode && chapter ? ` · ${chapter.title}` : ''}
                        {reviewMode ? ` · ${quizAnswers.length} Karteikarte${quizAnswers.length === 1 ? '' : 'n'}` : ''}
                    </p>
                    <div className="flex justify-center gap-8 mb-2 flex-wrap">
                        <div><div className="text-5xl font-extrabold text-emerald-600">{score}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">richtig</div></div>
                        <div><div className="text-5xl font-extrabold text-rose-600">{wrong}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">falsch</div></div>
                        <div><div className="text-5xl font-extrabold text-slate-700">{Math.round((score / quizAnswers.length) * 100)}%</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quote</div></div>
                    </div>
                    {reviewMode && (
                        <p className="text-xs text-slate-500 mt-4">Karteikarten wurden aktualisiert. Falsche Antworten kommen morgen wieder, richtige nach gestaffelten Intervallen (Spaced Repetition).</p>
                    )}
                </div>
                {/* P-ARCH-LO-COMPETENCE: Kompetenz-Heatmap (richtig/total je LO und Tag).
                    Wird nur gerendert, wenn das Kapitel learningObjectives definiert oder Items lo/tags tragen. */}
                {(() => {
                    const losCh = (chapter && chapter.learningObjectives) || [];
                    const loStats = {};
                    const tagStats = {};
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
                    });
                    const loKeys = Object.keys(loStats);
                    const tagKeys = Object.keys(tagStats);
                    if (!loKeys.length && !tagKeys.length) return null;
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
                        </div>
                    );
                })()}
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
                                    {a.explanation && <div className="text-xs text-slate-600 mt-2 italic">{a.explanation}</div>}
                                </li>
                            );
                        })}
                    </ol>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    {reviewMode ? (
                        <>
                            <button onClick={startReview} className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">Weiter wiederholen</button>
                            <button onClick={() => { setReviewMode(false); setStage('chapters'); }} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Zur Kapitelübersicht</button>
                        </>
                    ) : (
                        <>
                            <button onClick={startQuiz} className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">Quiz wiederholen</button>
                            <button onClick={() => setStage('reader')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Zurück zum Kapitel</button>
                            <button onClick={() => setStage('chapters')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Anderes Kapitel</button>
                        </>
                    )}
                </div>
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
                    <img src="icons/icon.svg" alt="" width="48" height="48" className="w-12 h-12 rounded-xl shadow-lg" />
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
            {auth.configured && (
                <div className="bg-blue-50 border border-blue-200 text-blue-900 text-sm p-3 rounded-lg mb-4">
                    Default-Zugangsdaten (siehe <code>js/auth-credentials.js</code>): <strong>admin / admin</strong> oder <strong>user / user</strong>. Lokal in <code>js/auth-credentials.js</code> anpassen.
                </div>
            )}
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

    // Theme: Default dunkel. Pre-paint-Skript in index.html setzt die Klasse bereits am <html>,
    // hier wird der State synchron daraus initialisiert und bei Änderung sowohl <html> als auch <body> markiert.
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { return 'dark'; }
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

    const onReset = () => {
        if (window.confirm('Wirklich allen lokalen Fortschritt zurücksetzen?')) reset();
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
                        srsState={srsState} srsGradeMany={srsGradeMany} />
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
