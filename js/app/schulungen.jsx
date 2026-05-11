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
