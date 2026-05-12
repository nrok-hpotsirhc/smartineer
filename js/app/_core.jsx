/*
 * Smartineer — React-App (JSX, in-browser via Babel-standalone, kein Build-Schritt).
 * Daten kommen aus js/data/<id>.js (legen window.APP_DATA und window.APP_ORDER an).
 */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

const STORAGE_KEY = 'wissen_reloaded_progress_v1';
const SCHUELER_PROGRESS_KEY = 'smartineer_schueler_progress_v1';
const INSTALL_DISMISS_KEY = 'smartineer_install_dismissed_v1';
const THEME_KEY = 'smartineer_theme_v1'; // 'dark' | 'light' (Default: 'light')
const AUDIENCE_KEY = 'smartineer_audience_v1'; // 'schueler' | 'ingenieur' — Startbereich, geraetespezifisch
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
const VISIBLE_CATS_KEY = 'smartineer_visible_categories_v1'; // { [catId]: false } — Default: alle sichtbar (P-UI-INTERESTS v85)
// P-UI-INTERESTS (v85): Schueler-Klassen-Sichtbarkeitsfilter, parallel zu VISIBLE_CATS_KEY.
// Default: alle Klassen sichtbar; nur ausgeblendete Klassen werden mit Wert false persistiert.
const VISIBLE_CLASSES_KEY = 'smartineer_visible_classes_v1';
// P-UI-INTERESTS (v85): Marker, ob der Erst-Interessens-Picker fuer dieses Profil
// schon durchlaufen wurde. Existiert er nicht und ein Audience-Wert ist gesetzt,
// rendert die App den Picker einmalig.
const INTERESTS_PICKED_KEY = 'smartineer_interests_picked_v1';
const ADMIN_GLOBAL_KEY = 'smartineer_admin_global_v1'; // reserviert fuer kuenftige globale Settings

// ---------------------------------------------------------------- Multi-Profil (P-ARCH-PROFILES, v84)
// Smartineer unterstuetzt bis zu 5 lokale Lern-Profile auf demselben Geraet.
// Jedes Profil hat einen festen Slot (p1..p5) mit Farbe, spektakulaerem
// Formelzeichen und Klartextnamen — die Tile-Identitaet ist Teil der Spec
// (siehe AGENTS.md §24). Profile sind streng client-seitig; KEINE Authentifizierung,
// KEINE personenbezogenen Daten, KEIN Backend.
//
// Datenmodell ("live mirror"):
//   - Die Lern-Keys (STORAGE_KEY, SCHUELER_PROGRESS_KEY, SCHULUNGEN_KEY, SRS_KEY,
//     READER_NOTES_KEY, READER_BOOKMARKS_KEY, AUDIENCE_KEY) spiegeln IMMER das
//     aktive Profil. Bestehender Code liest/schreibt direkt diese Keys und
//     braucht keine Anpassung.
//   - Pro Profil gibt es einen Snapshot-Key `smartineer_p_<pid>_<originalKey>`.
//   - Beim Profilwechsel: live -> alte Snapshot-Slot, neuer Snapshot -> live, reload.
//
// Geraetespezifische Keys bleiben global (NICHT per Profil): THEME_KEY,
// INSTALL_DISMISS_KEY, AUTH_KEY, VISIBLE_CATS_KEY, READER_TYPO_KEY.
const PROFILES_ACTIVE_KEY = 'smartineer_active_profile_v1'; // 'p1'..'p5' | null
const PROFILES_META_KEY = 'smartineer_profiles_meta_v1';    // { p1: { used:true, since:ISO, lastUsed:ISO }, ... }
const PROFILES = [
    { id: 'p1', name: 'Summe',     symbol: 'Σ',  desc: 'Summenzeichen',     accent: 'emerald', bg: '#10b981', fg: '#ffffff' },
    { id: 'p2', name: 'Integral',  symbol: '∫',  desc: 'Integralzeichen',   accent: 'sky',     bg: '#0ea5e9', fg: '#ffffff' },
    { id: 'p3', name: 'Nabla',     symbol: '∇',  desc: 'Nabla-Operator',    accent: 'amber',   bg: '#f59e0b', fg: '#1f2937' },
    { id: 'p4', name: 'Pi',        symbol: 'π',  desc: 'Kreiszahl',         accent: 'rose',    bg: '#f43f5e', fg: '#ffffff' },
    { id: 'p5', name: 'Unendlich', symbol: '∞',  desc: 'Unendlich-Symbol',  accent: 'violet',  bg: '#8b5cf6', fg: '#ffffff' }
];
const PROFILE_IDS = PROFILES.map(p => p.id);
// Diese Keys werden pro Profil snapshotted und beim Wechsel umgeschaltet.
// AUDIENCE_KEY ist mit dabei, weil jedes Profil seinen Startbereich (Schueler vs Ingenieur)
// fuer sich behalten soll. THEME/AUTH/INSTALL bleiben geraetespezifisch.
// P-UI-INTERESTS (v85): Sichtbarkeitsfilter fuer Kategorien/Klassen und der
// Interessens-Picked-Marker sind ebenfalls profil-spezifisch — verschiedene Profile
// duerfen sich fuer verschiedene Themen bzw. Klassen interessieren.
const PROFILE_SCOPED_KEYS = [
    'wissen_reloaded_progress_v1',
    'smartineer_schueler_progress_v1',
    'smartineer_schulungen_v2',
    'smartineer_srs_v2',
    'smartineer_reader_notes_v1',
    'smartineer_reader_bookmarks_v1',
    'smartineer_audience_v1',
    'smartineer_visible_categories_v1',
    'smartineer_visible_classes_v1',
    'smartineer_interests_picked_v1'
];
function profileSlotKey(pid, originalKey) { return 'smartineer_p_' + pid + '_' + originalKey; }
function getActiveProfileId() {
    try { const v = localStorage.getItem(PROFILES_ACTIVE_KEY); return PROFILE_IDS.includes(v) ? v : null; }
    catch (e) { return null; }
}
function getProfileMeta() {
    try { return JSON.parse(localStorage.getItem(PROFILES_META_KEY)) || {}; }
    catch (e) { return {}; }
}
function setProfileMeta(meta) {
    try { localStorage.setItem(PROFILES_META_KEY, JSON.stringify(meta || {})); } catch (e) { /* quota */ }
}
function markProfileUsed(pid) {
    if (!PROFILE_IDS.includes(pid)) return;
    const meta = getProfileMeta();
    const cur = meta[pid] || {};
    meta[pid] = { used: true, since: cur.since || new Date().toISOString(), lastUsed: new Date().toISOString() };
    setProfileMeta(meta);
}
function snapshotLiveTo(pid) {
    if (!PROFILE_IDS.includes(pid)) return;
    PROFILE_SCOPED_KEYS.forEach(k => {
        try {
            const v = localStorage.getItem(k);
            const slot = profileSlotKey(pid, k);
            if (v == null) localStorage.removeItem(slot);
            else localStorage.setItem(slot, v);
        } catch (e) { /* ignore */ }
    });
}
function restoreLiveFrom(pid) {
    if (!PROFILE_IDS.includes(pid)) return;
    PROFILE_SCOPED_KEYS.forEach(k => {
        try {
            const slot = profileSlotKey(pid, k);
            const v = localStorage.getItem(slot);
            if (v == null) localStorage.removeItem(k);
            else localStorage.setItem(k, v);
        } catch (e) { /* ignore */ }
    });
}
function clearLiveScoped() {
    PROFILE_SCOPED_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
}
// Wechsel auf ein Profil. Wenn `prevPid` gesetzt ist, werden die live-Keys vorher
// in dessen Slot gesichert. Anschliessend wird der neue Slot in die live-Keys
// gespiegelt. Der Aufrufer ist fuer das `window.location.reload()` zustaendig.
function switchToProfile(nextPid, prevPid) {
    if (!PROFILE_IDS.includes(nextPid)) return false;
    if (prevPid && PROFILE_IDS.includes(prevPid) && prevPid !== nextPid) {
        snapshotLiveTo(prevPid);
    }
    restoreLiveFrom(nextPid);
    try { localStorage.setItem(PROFILES_ACTIVE_KEY, nextPid); } catch (e) {}
    markProfileUsed(nextPid);
    return true;
}
// Bei allererstem Profil-Pick: die bereits in den live-Keys liegenden Lerndaten
// werden uebernommen — wir snapshotten sie als Inhalt des gewaehlten Profils.
function adoptLiveAsProfile(pid) {
    if (!PROFILE_IDS.includes(pid)) return false;
    snapshotLiveTo(pid);
    try { localStorage.setItem(PROFILES_ACTIVE_KEY, pid); } catch (e) {}
    markProfileUsed(pid);
    return true;
}
// Vollstaendig zuruecksetzen: live-Slot und Snapshot loeschen. Theme/Auth bleiben.
function wipeProfileData(pid) {
    if (!PROFILE_IDS.includes(pid)) return;
    PROFILE_SCOPED_KEYS.forEach(k => {
        try { localStorage.removeItem(profileSlotKey(pid, k)); } catch (e) {}
    });
    if (getActiveProfileId() === pid) clearLiveScoped();
    const meta = getProfileMeta();
    delete meta[pid];
    setProfileMeta(meta);
}
function getProfileById(pid) { return PROFILES.find(p => p.id === pid) || null; }
// Hat ein Profil-Slot bereits Daten? Heuristik: irgendein scoped Key hat Inhalt
// im Slot ODER (fuer das aktive Profil) im live-Bereich. Wird in der ProfileGate
// genutzt, um Slots mit Fortschritt zu markieren.
function profileSlotHasData(pid) {
    if (!PROFILE_IDS.includes(pid)) return false;
    const active = getActiveProfileId();
    return PROFILE_SCOPED_KEYS.some(k => {
        try {
            const slotVal = localStorage.getItem(profileSlotKey(pid, k));
            if (slotVal && slotVal !== '{}' && slotVal !== 'null') return true;
            if (active === pid) {
                const live = localStorage.getItem(k);
                if (live && live !== '{}' && live !== 'null') return true;
            }
        } catch (e) {}
        return false;
    });
}
function hasAnyLiveScopedData() {
    return PROFILE_SCOPED_KEYS.some(k => {
        try {
            const v = localStorage.getItem(k);
            return v && v !== '{}' && v !== 'null';
        } catch (e) { return false; }
    });
}

// ---------------------------------------------------------------- Export / Import
// Plattform-portables JSON-Format zur Synchronisation des Lernfortschritts
// zwischen Geräten. Enthält bewusst KEINE personenbezogenen Daten — nur
// die in localStorage gehaltenen Lern-Keys. Theme/Install-Dismiss bleiben
// gerätespezifisch und werden NICHT exportiert.
//
// Format v2 (P-ARCH-PROFILES): exportiert ALLE 5 Profile gemeinsam. Pro Profil
// die snapshotted Lern-Keys; zusaetzlich das aktive Profil und die Profil-Metadaten.
// v1-Importe werden weiterhin akzeptiert und ins aktive Profil gemerged.
const EXPORT_FORMAT = 'smartineer-progress';
const EXPORT_VERSION = 2;
const EXPORT_KEYS = [STORAGE_KEY, SCHUELER_PROGRESS_KEY, SCHULUNGEN_KEY, SRS_KEY, READER_NOTES_KEY, READER_BOOKMARKS_KEY];

function buildExportPayload() {
    // P-ARCH-PROFILES: v2 — alle 5 Profil-Snapshots werden gebuendelt exportiert.
    // Damit kann der User auf einem neuen Geraet/Browser den vollstaendigen Stand
    // aller Personen wiederherstellen.
    const profiles = {};
    const activePid = getActiveProfileId();
    PROFILE_IDS.forEach(pid => {
        const slot = {};
        let any = false;
        PROFILE_SCOPED_KEYS.forEach(k => {
            try {
                // Beim aktiven Profil liest live-Key; sonst Snapshot-Slot.
                const raw = (pid === activePid)
                    ? localStorage.getItem(k)
                    : localStorage.getItem(profileSlotKey(pid, k));
                if (raw != null) { slot[k] = JSON.parse(raw); any = true; }
            } catch (e) { /* corrupt entry — skip */ }
        });
        if (any) profiles[pid] = slot;
    });
    return {
        format: EXPORT_FORMAT,
        version: EXPORT_VERSION,
        exportedAt: new Date().toISOString(),
        activeProfile: activePid || null,
        profilesMeta: getProfileMeta(),
        profiles
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
    // ---- v2 (Multi-Profil) ----
    if (payload.version >= 2 && payload.profiles) {
        const activePid = getActiveProfileId();
        const incomingProfiles = payload.profiles || {};
        // Profile-Meta merge: importierte Eintraege uebernehmen, vorhandene erhalten.
        try {
            const curMeta = getProfileMeta();
            const incMeta = payload.profilesMeta || {};
            const mergedMeta = { ...curMeta };
            PROFILE_IDS.forEach(pid => {
                if (incMeta[pid]) {
                    const a = curMeta[pid] || {};
                    const b = incMeta[pid];
                    mergedMeta[pid] = {
                        used: !!(a.used || b.used),
                        since: a.since && (a.since <= (b.since || a.since)) ? a.since : (b.since || a.since),
                        lastUsed: (a.lastUsed || '') >= (b.lastUsed || '') ? (a.lastUsed || b.lastUsed) : b.lastUsed
                    };
                } else if (incomingProfiles[pid]) {
                    mergedMeta[pid] = mergedMeta[pid] || { used: true, since: new Date().toISOString(), lastUsed: new Date().toISOString() };
                }
            });
            setProfileMeta(mergedMeta);
        } catch (e) { /* ignore meta-merge issues */ }
        // Pro Profil-Slot mergen oder ersetzen.
        PROFILE_IDS.forEach(pid => {
            const inc = incomingProfiles[pid];
            if (!inc) return;
            const writeForPid = (k, val) => {
                if (pid === activePid) {
                    // live-Keys schreiben
                    if (val === null || val === undefined) {
                        if (mode === 'replace') localStorage.removeItem(k);
                        return;
                    }
                    if (mode === 'merge') {
                        let current = {};
                        try { current = JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { current = {}; }
                        const merged = mergeProgressKey(k, current, val);
                        localStorage.setItem(k, JSON.stringify(merged));
                    } else {
                        localStorage.setItem(k, JSON.stringify(val));
                    }
                } else {
                    // Snapshot-Slot schreiben
                    const slot = profileSlotKey(pid, k);
                    if (val === null || val === undefined) {
                        if (mode === 'replace') localStorage.removeItem(slot);
                        return;
                    }
                    if (mode === 'merge') {
                        let current = {};
                        try { current = JSON.parse(localStorage.getItem(slot)) || {}; } catch (e) { current = {}; }
                        const merged = mergeProgressKey(k, current, val);
                        localStorage.setItem(slot, JSON.stringify(merged));
                    } else {
                        localStorage.setItem(slot, JSON.stringify(val));
                    }
                }
            };
            // EXPORT_KEYS reflektieren die alten v1-Lernkeys; AUDIENCE_KEY ist v2-spezifisch
            // und steht in PROFILE_SCOPED_KEYS — wir nutzen die Vereinigung beim Schreiben.
            const allKeys = Array.from(new Set([...EXPORT_KEYS, ...PROFILE_SCOPED_KEYS]));
            allKeys.forEach(k => {
                if (inc[k] !== undefined) writeForPid(k, inc[k]);
            });
        });
        return;
    }
    // ---- v1 (Single-Profil-Datei) ----
    // Wir mergen v1 in das aktuell aktive Profil. Falls keines aktiv ist, in die live-Keys
    // (der naechste Profil-Pick adoptiert die Daten).
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

function useSchuelerProgress() {
    const [progress, setProgress] = useState(() => {
        try { return JSON.parse(localStorage.getItem(SCHUELER_PROGRESS_KEY)) || {}; }
        catch (e) { return {}; }
    });
    const persist = useCallback((next) => {
        setProgress(next);
        try { localStorage.setItem(SCHUELER_PROGRESS_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
    }, []);
    const setSolved = useCallback((taskKey, solved) => {
        if (!taskKey) return;
        const next = { ...progress };
        if (solved) next[taskKey] = 1; else delete next[taskKey];
        persist(next);
    }, [progress, persist]);
    const isSolved = useCallback((taskKey) => !!progress[taskKey], [progress]);
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
    // P-UI-INTERESTS (v85): bewusste Wahl "nur diese N anzeigen" \u2014 alle nicht in `picked`
    // enthaltenen Kategorien werden ausgeblendet. Wenn `picked` leer ist, werden ALLE eingeblendet
    // (Sicherheitsnetz, damit das UI nie leer wirkt).
    const setSelection = useCallback((picked) => {
        const set = Array.isArray(picked) ? new Set(picked) : new Set();
        const next = {};
        if (set.size > 0) {
            allOrder.forEach(k => { if (!set.has(k)) next[k] = true; });
        }
        persist(next);
    }, [allOrder, persist]);
    return { hidden, isVisible, visibleOrder, toggle, reset, setSelection };
}

// P-UI-INTERESTS (v85): Schueler-Klassen-Sichtbarkeitsfilter, parallel zu useVisibleCategories.
// `allClassIds` ist eine flache Liste (z.B. ['k1','k2',...,'k10']). Persistenzform identisch:
// { [classId]: false } fuer ausgeblendete. Default leer = alle sichtbar.
function useVisibleClasses(allClassIds) {
    const [hidden, setHidden] = useState(() => {
        try { return JSON.parse(localStorage.getItem(VISIBLE_CLASSES_KEY)) || {}; }
        catch (e) { return {}; }
    });
    const persist = useCallback((next) => {
        setHidden(next);
        try { localStorage.setItem(VISIBLE_CLASSES_KEY, JSON.stringify(next)); } catch (e) { /* quota */ }
    }, []);
    const toggle = useCallback((cid) => {
        setHidden(prev => {
            const next = { ...prev };
            if (next[cid]) delete next[cid]; else next[cid] = true;
            try { localStorage.setItem(VISIBLE_CLASSES_KEY, JSON.stringify(next)); } catch (e) {}
            return next;
        });
    }, []);
    const isVisible = useCallback((cid) => !hidden[cid], [hidden]);
    const visibleClasses = useMemo(() => allClassIds.filter(c => !hidden[c]), [allClassIds, hidden]);
    const reset = useCallback(() => persist({}), [persist]);
    const setSelection = useCallback((picked) => {
        const set = Array.isArray(picked) ? new Set(picked) : new Set();
        const next = {};
        if (set.size > 0) {
            allClassIds.forEach(c => { if (!set.has(c)) next[c] = true; });
        }
        persist(next);
    }, [allClassIds, persist]);
    return { hidden, isVisible, visibleClasses, toggle, reset, setSelection };
}

// P-UI-INTERESTS (v85): Marker im localStorage, ob der Erst-Picker fuer das aktive Profil
// schon durchlaufen wurde. Profil-scoped via PROFILE_SCOPED_KEYS.
function isInterestsPicked() {
    try { return localStorage.getItem(INTERESTS_PICKED_KEY) === '1'; } catch (e) { return false; }
}
function markInterestsPicked() {
    try { localStorage.setItem(INTERESTS_PICKED_KEY, '1'); } catch (e) { /* quota */ }
}
function clearInterestsPicked() {
    try { localStorage.removeItem(INTERESTS_PICKED_KEY); } catch (e) {}
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
