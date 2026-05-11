function Schueler() {
    const SCH = window.SCHUELER;
    const [stage, setStage] = useState('classes'); // classes | subjects | training | quiz | result
    const [klass, setKlass] = useState(null);
    const [subject, setSubject] = useState(null);
    const [items, setItems] = useState([]);
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [val, setVal] = useState('');
    const [trainingIdx, setTrainingIdx] = useState(0);
    const [showTrainingSolution, setShowTrainingSolution] = useState(false);
    const [showTrainingFormula, setShowTrainingFormula] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const schuelerProgress = useSchuelerProgress();

    const drillRef = useKaTeX([stage, idx]);
    const resultRef = useKaTeX([stage, answers.length]);
    const trainingRef = useKaTeX([stage, klass, subject, trainingIdx, showTrainingSolution, showTrainingFormula, Object.keys(schuelerProgress.progress).length]);

    if (!SCH) {
        return <section className="view-fade p-8 text-red-700">Schüler-Daten nicht geladen. Prüfe <code>js/data/schueler.js</code> in <code>index.html</code>.</section>;
    }

    const isMittelstufeClass = (klassId) => /^k(?:[5-9]|10)$/.test(klassId || '');
    const hasSchuelerTraining = (klassId, cfg) => !!(cfg && cfg.mode === 'pool' && isMittelstufeClass(klassId)
        && Array.isArray(cfg.pool) && cfg.pool.some(it => it && (it.f || it.s)));
    const studentTaskKey = (klassId, subjId, item, itemIdx) => {
        const qid = stableQid({ q: item && item.q, a: item && item.a });
        return `${klassId}.${subjId}|${qid || itemIdx}`;
    };
    // P-UI-SCHUELER-SECTIONS-ALL (v78): Lehrplan-orientierte Abschnitte fuer alle
    // Mittelstufen-Faecher. Sprachfaecher haben tagged data (`section`-Feld via
    // `kind`/Datenpflege), die anderen Faecher werden heuristisch nach NRW-KLP-
    // Domaenen (Mathe: Arithmetik/Funktionen/Geometrie/Stochastik; Physik:
    // Mechanik/Elektrik/Optik/Waerme/Atom; Chemie: Stoffe/Atomare/Saeurebase/
    // Organik; Biologie: Zelle/Mensch/Natur/Oekologie; Geschichte: Antike/MA/
    // FNZ/Revolution/Kaiserreich/Modern; Deutsch: existing) zugeordnet.
    const languageSections = [
        { id: 'numbers', label: 'Zahlen', desc: 'Zahlenwoerter sicher erkennen und schreiben.' },
        { id: 'vocab', label: 'Vokabeln', desc: 'Grundwortschatz in beide Richtungen abrufen.' },
        { id: 'grammar', label: 'Grammatik', desc: 'Formen, Satzbau und typische Regeln trainieren.' }
    ];
    const SUBJECT_SECTIONS = {
        englisch: languageSections,
        franzoesisch: languageSections,
        latein: languageSections,
        deutsch: [
            { id: 'sprache', label: 'Sprache & Grammatik', desc: 'Wortarten, Satzbau, Tempora, Kasus.' },
            { id: 'rechtschreibung', label: 'Rechtschreibung', desc: 'Gross-/Kleinschreibung, Kommasetzung, Dehnung.' },
            { id: 'schreiben', label: 'Schreiben', desc: 'Bericht, Eroerterung, Bewerbung, Analyse.' },
            { id: 'literatur', label: 'Literatur', desc: 'Maerchen, Gedicht, Ballade, Drama, Novelle.' },
            { id: 'lesen', label: 'Lesen / Sachtexte', desc: 'Textverstaendnis und Argumentationsstruktur.' },
            { id: 'medien', label: 'Medien', desc: 'Medienkritik und Informationsbewertung.' }
        ],
        mathe: [
            { id: 'arithmetik', label: 'Arithmetik & Algebra', desc: 'Rechnen, Brueche, Gleichungen, Potenzen.' },
            { id: 'funktionen', label: 'Funktionen', desc: 'Lineare, quadratische, trigonometrische, exponentielle Funktionen.' },
            { id: 'geometrie', label: 'Geometrie', desc: 'Flaechen, Volumen, Pythagoras, Trigonometrie.' },
            { id: 'stochastik', label: 'Stochastik', desc: 'Wahrscheinlichkeit, Mittelwert, Statistik.' }
        ],
        physik: [
            { id: 'mechanik', label: 'Mechanik', desc: 'Kraft, Geschwindigkeit, Energie, Druck.' },
            { id: 'elektrik', label: 'Elektrik & Magnetismus', desc: 'Strom, Spannung, Widerstand, Magnetfeld.' },
            { id: 'optik', label: 'Optik & Akustik', desc: 'Licht, Reflexion, Linsen, Schall, Wellen.' },
            { id: 'waerme', label: 'Waerme & Energie', desc: 'Temperatur, Energieformen, Aggregatzustaende.' },
            { id: 'atom', label: 'Atom & Kern', desc: 'Atommodelle, Radioaktivitaet, Strahlung.' }
        ],
        chemie: [
            { id: 'stoffe', label: 'Stoffe & Aggregate', desc: 'Aggregatzustaende, Trennverfahren, Reinstoffe.' },
            { id: 'atomare', label: 'Atome & Reaktionen', desc: 'Atombau, Periodensystem, Reaktionsgleichungen.' },
            { id: 'saeurebase', label: 'Saeuren, Basen, Salze', desc: 'pH-Wert, Indikatoren, Neutralisation.' },
            { id: 'organik', label: 'Organische Chemie', desc: 'Kohlenstoffverbindungen, Alkane, Alkohole.' }
        ],
        biologie: [
            { id: 'zelle', label: 'Zelle & Genetik', desc: 'Zellbau, DNA, Chromosomen, Vererbung.' },
            { id: 'mensch', label: 'Mensch & Gesundheit', desc: 'Organsysteme, Atmung, Verdauung, Kreislauf.' },
            { id: 'natur', label: 'Pflanzen & Tiere', desc: 'Fotosynthese, Wirbeltiere, Insekten, Pflanzenteile.' },
            { id: 'oekologie', label: 'Oekologie & Evolution', desc: 'Oekosystem, Nahrungskette, Evolution.' }
        ],
        geschichte: [
            { id: 'antike', label: 'Steinzeit & Antike', desc: 'Steinzeit, Aegypten, Griechen, Roemer.' },
            { id: 'mittelalter', label: 'Mittelalter', desc: 'Ritter, Burg, Kirche, Kaiser.' },
            { id: 'fruehneuzeit', label: 'Fruehe Neuzeit', desc: 'Reformation, Absolutismus, Aufklaerung.' },
            { id: 'revolution', label: 'Revolution & Industrie', desc: 'Franzoesische Revolution, Industrialisierung.' },
            { id: 'kaiserreich', label: 'Kaiserreich & WK1', desc: 'Bismarck, Wilhelm II., Erster Weltkrieg.' },
            { id: 'modern', label: 'WK2 & Gegenwart', desc: 'Zweiter Weltkrieg, Kalter Krieg, Wiedervereinigung.' }
        ]
    };
    const sectionsFor = (subjId) => SUBJECT_SECTIONS[subjId] || null;
    const hasSubjectSections = (subjId) => Array.isArray(sectionsFor(subjId));
    const sectionLabel = (sectionId, subjId) => {
        if (!sectionId) return '';
        const list = subjId ? sectionsFor(subjId) : null;
        if (list) {
            const m = list.find(s => s.id === sectionId);
            if (m) return m.label;
        }
        // Fallback ueber alle Subjects (z.B. wenn subjId nicht gesetzt ist)
        for (const k of Object.keys(SUBJECT_SECTIONS)) {
            const m = SUBJECT_SECTIONS[k].find(s => s.id === sectionId);
            if (m) return m.label;
        }
        return '';
    };
    const deriveSection = (item, subjId, klassId) => {
        if (!item) return null;
        if (item.section) return item.section;
        if (item.kind === 'grammar') return 'grammar';
        if (item.kind === 'vocab') return /Zahlenwort/i.test(item.q || '') ? 'numbers' : 'vocab';
        const text = ((item.q || '') + ' ' + (item.a || '') + ' ' + (item.f || '')).toLowerCase();
        if (subjId === 'mathe') {
            if (/wahrscheinlich|stochastik|mittelwert|median|erwartungswert|zufalls|laplace/.test(text)) return 'stochastik';
            if (/funktion|steigung|gerade durch|parabel|sinus|cosinus|tangens|exponential|logarithm|nullstelle|scheitel/.test(text)) return 'funktionen';
            if (/dreieck|rechteck|quadrat\b|kreis|kugel|quader|zylinder|pythagoras|volumen|flaeche|fläche|winkel|trigonomet|umfang|prisma|pyramide|koerper|körper/.test(text)) return 'geometrie';
            return 'arithmetik';
        }
        if (subjId === 'physik') {
            if (/magnet|strom|spannung|widerstand|volt|ampere|ohm|schaltung|elektr|leiter|kondensator/.test(text)) return 'elektrik';
            if (/licht|reflexion|linse|brechung|spiegel|prisma|schall|welle|frequenz|akustik|farbe/.test(text)) return 'optik';
            if (/atom|kern|radioaktiv|strahlung|alpha|beta|gamma|isotop|neutron|proton|quanten|huelle|hülle|elektronenh/.test(text)) return 'atom';
            if (/waerme|wärme|temperatur|joule|thermo|aggregat|schmelz|verdampf|kondens|kelvin/.test(text)) return 'waerme';
            return 'mechanik';
        }
        if (subjId === 'chemie') {
            if (/saeure|säure|base|salz|ph[-\s]|lauge|indikator|neutral|sauer|basisch/.test(text)) return 'saeurebase';
            if (/alkan|methan|ethan|propan|butan|kohlenstoff|organisch|alkohol|ester|aromat|kohlenwasserstoff|alken|alkin/.test(text)) return 'organik';
            if (/atom|proton|neutron|elektron|periodensystem|modell|schale|element|reaktionsgleichung|edukt|produkt|valenz|bindung|molekuel|molekül/.test(text)) return 'atomare';
            return 'stoffe';
        }
        if (subjId === 'biologie') {
            if (/dna|gen\b|chromosom|mitose|meiose|erbe|vererb|replikation|protein|allel|nukleo/.test(text)) return 'zelle';
            if (/herz|lunge|niere|magen|muskel|knochen|atem|verdauung|blut|hormon|pubertaet|pubertät|gehirn|nerv|sinnes/.test(text)) return 'mensch';
            if (/oekosystem|ökosystem|nahrungsk|symbiose|konkurrenz|evolution|selektion|darwin|biodivers|umwelt|stoffkreislauf|art\b/.test(text)) return 'oekologie';
            if (/pflanze|tier|blatt|wurzel|insekt|saeugetier|säugetier|vogel|fisch|wirbel|fotosynthese|chloroph|bluete|blüte/.test(text)) return 'natur';
            return 'zelle';
        }
        if (subjId === 'geschichte') {
            if (/steinzeit|jaeger|jäger|aegypten|ägypten|pharao|pyramide|griech|rom\b|roem|römer|caesar|republik|antik|senat|legion|olymp/.test(text)) return 'antike';
            if (/mittelalter|ritter|burg\b|kirche|kaiser karl|karl der|lehnswesen|kreuzzug|papst|hanse|gilde|mönch|moench/.test(text)) return 'mittelalter';
            if (/reformation|luther|absolutismus|aufkl|renaissance|gutenberg|buchdruck|kolumbus|entdeck|dreissigjaehrig|dreißigjährig|ludwig xiv/.test(text)) return 'fruehneuzeit';
            if (/franzoesische revolution|französische revolution|napoleon|industrialisier|dampf|industrie|wiener kongress|1789|1848|fabrik/.test(text)) return 'revolution';
            if (/bismarck|wilhelm ii|kaiserreich|reichsgruendung|reichsgründung|erster weltkrieg|weimar|1871|1914|1918/.test(text)) return 'kaiserreich';
            if (/zweiter weltkrieg|nationalsoz|hitler|shoah|holocaust|kalter krieg|wiedervereinigung|berliner mauer|1939|1945|1989|nato|warschauer/.test(text)) return 'modern';
            const byGrade = { k5: 'antike', k6: 'mittelalter', k7: 'fruehneuzeit', k8: 'revolution', k9: 'kaiserreich', k10: 'modern' };
            return byGrade[klassId] || null;
        }
        return null;
    };
    const itemSection = (item, subjId, klassId) => deriveSection(item, subjId, klassId);
    const poolForSection = (cfg, sectionId, subjId, klassId) => {
        if (!cfg || !Array.isArray(cfg.pool)) return [];
        if (!sectionId) return cfg.pool;
        return cfg.pool.filter(item => deriveSection(item, subjId, klassId) === sectionId);
    };
    const renderSubjectSections = (klassId, subjId, cfg, trainingReady) => {
        const sections = sectionsFor(subjId);
        if (!sections || !cfg || !Array.isArray(cfg.pool)) return null;
        // Sektionen mit 0 Aufgaben blenden wir aus, damit Heuristik-Luecken nicht
        // als leere Abschnitte erscheinen.
        const rows = sections
            .map(section => ({ section, count: poolForSection(cfg, section.id, subjId, klassId).length }))
            .filter(r => r.count > 0);
        if (!rows.length) return null;
        return (
            <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Abschnitte</div>
                <div className="space-y-2">
                    {rows.map(({ section, count }) => (
                        <details key={section.id} className="schueler-section rounded-lg border border-slate-200 bg-slate-50">
                            <summary className="cursor-pointer px-3 py-2 text-sm font-bold text-slate-800">
                                <span className="inline-flex w-full items-center justify-between gap-3">
                                    <span>{section.label}</span>
                                    <span className="schueler-section-count text-xs font-bold px-2 py-1 rounded-full bg-white border border-slate-200 text-slate-600">{count} Aufgaben</span>
                                </span>
                            </summary>
                            <div className="px-3 pb-3">
                                <p className="text-xs text-slate-600 mb-3">{section.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {trainingReady && (
                                        <button onClick={() => startTraining(klassId, subjId, 0, section.id)}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition">
                                            Training
                                        </button>
                                    )}
                                    <button onClick={() => startQuiz(klassId, subjId, section.id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition">
                                        Quiz
                                    </button>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        );
    };

    const startTraining = (klassId, subjId, startAt, sectionId) => {
        const key = `${klassId}.${subjId}`;
        const cfg = SCH.content[key];
        if (!hasSchuelerTraining(klassId, cfg)) return;
        const pool = poolForSection(cfg, sectionId, subjId, klassId);
        if (!pool.length) return;
        setKlass(klassId); setSubject(subjId);
        setItems(pool.slice());
        setTrainingIdx(typeof startAt === 'number' ? startAt : 0);
        setSelectedSection(sectionId || null);
        setShowTrainingSolution(false);
        setShowTrainingFormula(false);
        setStage('training');
    };

    const startQuiz = (klassId, subjId, sectionId) => {
        const key = `${klassId}.${subjId}`;
        const cfg = SCH.content[key];
        if (!cfg || cfg.mode === 'stub') return;
        let arr = [];
        if (cfg.mode === 'generated') {
            for (let i = 0; i < 10; i++) arr.push(cfg.gen());
        } else if (cfg.mode === 'pool') {
            const pool = poolForSection(cfg, sectionId, subjId, klassId).slice();
            for (let i = 0; i < 10 && pool.length; i++) {
                const k = Math.floor(Math.random() * pool.length);
                arr.push(pool.splice(k, 1)[0]);
            }
        }
        setKlass(klassId); setSubject(subjId);
        setItems(arr); setIdx(0); setAnswers([]); setVal('');
        setSelectedSection(sectionId || null);
        setShowTrainingSolution(false);
        setShowTrainingFormula(false);
        setStage('quiz');
    };

    const submit = () => {
        if (!val.trim()) return;
        const item = items[idx];
        const correct = SCH.normalize(val) === SCH.normalize(item.a);
        const meta = splitQuestionMeta(item.q, klass, subject, selectedSection);
        const next = answers.concat([{ q: item.q, body: meta.body, crumbs: meta.crumbs, expected: item.a, given: val, correct, formula: item.f, solution: item.s }]);
        setAnswers(next); setVal('');
        if (idx + 1 >= items.length) setStage('result');
        else setIdx(idx + 1);
    };

    const onKey = (e) => { if (e.key === 'Enter') submit(); };

    // P-UI-SCHUELER-QUESTION-LAYOUT: Trenne den Aufgaben-Stamm vom Metadaten-Prefix
    // ("Englisch Klasse 5 Vokabel Zahlenwort: ...") und liefere getrennt Crumbs +
    // bereinigten Body. Crumbs werden aus Kontext (Fach, Klasse, Section) und ggf.
    // einem zusaetzlichen Topic-Token aus dem Prefix aufgebaut.
    const klassLabelOf = (klassId) => { const k = SCH.classes && SCH.classes.find(c => c.id === klassId); return k ? k.label : ''; };
    const subjectLabelOf = (subjId) => (SCH.subjects && SCH.subjects[subjId] ? SCH.subjects[subjId].label : '');
    const splitQuestionMeta = (rawQ, klassId, subjId, sectionId) => {
        const fach = subjectLabelOf(subjId);
        const klassL = klassLabelOf(klassId);
        const sectionL = sectionId ? sectionLabel(sectionId, subjId) : '';
        let body = (rawQ == null ? '' : String(rawQ));
        let topic = '';
        const colonIdx = body.indexOf(':');
        if (colonIdx > 0 && colonIdx < 120) {
            const head = body.slice(0, colonIdx);
            // Prefix nur strippen, wenn er kein HTML enthaelt und Fach- oder
            // Klassen-Kennung traegt.
            if (!/[<>]/.test(head) && (/klasse\s*\d+/i.test(head) || (fach && head.toLowerCase().includes(fach.toLowerCase())))) {
                let rest = head;
                if (fach) rest = rest.replace(new RegExp('^' + fach.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '').trim();
                rest = rest.replace(/^klasse\s*\d+/i, '').trim();
                rest = rest.replace(/\s+\d+$/, '').trim();
                // Falls die Section bereits im Prefix steht (Vokabel/Grammatik/Numbers),
                // entfernen wir das Section-Wort, weil es bereits als sectionL-Crumb
                // dargestellt wird. Ohne aktive Section behalten wir das Topic-Wort,
                // damit z.B. fuer Deutsch 'Sprache' weiterhin als Crumb sichtbar ist.
                if (sectionL) {
                    rest = rest.replace(new RegExp('^' + sectionL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '').trim();
                    rest = rest.replace(/^(vokabel|grammatik|sprache|literatur|sachtext|schreiben|rechtschreibung|lesen|medien)\b\s*/i, '').trim();
                }
                topic = rest;
                body = body.slice(colonIdx + 1).trim();
            }
        }
        const crumbs = [];
        if (fach) crumbs.push(fach);
        if (klassL) crumbs.push(klassL);
        if (sectionL) crumbs.push(sectionL);
        if (topic && !crumbs.some(c => c.toLowerCase() === topic.toLowerCase())) {
            const capped = topic.charAt(0).toUpperCase() + topic.slice(1);
            crumbs.push(capped);
        }
        return { crumbs, body };
    };
    const Crumbs = ({ items: list, tone }) => {
        if (!list || !list.length) return null;
        const palette = tone === 'light'
            ? 'text-slate-500'
            : 'text-slate-500';
        return (
            <nav aria-label="Kategorie" className={`flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${palette}`}>
                {list.map((c, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && <span className="schueler-crumb-sep text-slate-300" aria-hidden="true">›</span>}
                        <span className="schueler-crumb-pill bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{c}</span>
                    </span>
                ))}
            </nav>
        );
    };

    // ---------- Stage: Klassen-Auswahl ----------
    if (stage === 'classes') {
        return (
            <section className="view-fade">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <img src="icons/smartineer-logo.png" alt="" width="72" height="72"
                         className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 drop-shadow" />
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Schüler-Bereich</h1>
                    <p className="text-slate-600">Wähle eine Klassenstufe. Mathematik ist verfügbar für Klasse 1–10; ab Klasse 5 kommen Deutsch, Naturwissenschaften, Geschichte sowie Englisch, Französisch und Latein dazu. Alle Mittelstufenfächer bieten getrenntes Training mit Formeln/Merksätzen, Musterlösungen und ein 10-Fragen-Quiz.</p>
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
                        const trainingReady = hasSchuelerTraining(klass, cfg);
                        const poolCount = cfg && Array.isArray(cfg.pool) ? cfg.pool.length : null;
                        return (
                            <div key={s}
                                className={`text-left bg-white rounded-2xl border border-slate-200 p-6 transition ${ready
                                    ? 'hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                                    : 'opacity-60 cursor-not-allowed'}`}>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{SCH.subjects[s].label}</h3>
                                <p className="text-sm text-slate-600 mb-3">{ready && cfg.note ? cfg.note : 'In Vorbereitung. Bald verfügbar.'}</p>
                                {ready ? (
                                    <>
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {trainingReady && (
                                                <button onClick={() => startTraining(klass, s)}
                                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition">
                                                    Training öffnen
                                                </button>
                                            )}
                                            <button onClick={() => startQuiz(klass, s)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition">
                                                10-Fragen-Quiz
                                            </button>
                                            {poolCount != null && <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">{poolCount} Aufgaben</span>}
                                        </div>
                                        {renderSubjectSections(klass, s, cfg, trainingReady)}
                                    </>
                                ) : (
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500">in Vorbereitung</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ---------- Stage: Training (Mittelstufe, einzelne Aufgaben) ----------
    if (stage === 'training') {
        const item = items[trainingIdx];
        const cfg = SCH.content[`${klass}.${subject}`];
        if (!item || !hasSchuelerTraining(klass, cfg)) { setStage('subjects'); return null; }
        const klassObj = SCH.classes.find(c => c.id === klass);
        const taskKey = studentTaskKey(klass, subject, item, trainingIdx);
        const solved = schuelerProgress.isSolved(taskKey);
        const solvedCount = items.reduce((sum, it, i) => sum + (schuelerProgress.isSolved(studentTaskKey(klass, subject, it, i)) ? 1 : 0), 0);
        const pct = items.length ? Math.round((solvedCount / items.length) * 100) : 0;
        const goTo = (nextIdx) => {
            const bounded = (nextIdx + items.length) % items.length;
            setTrainingIdx(bounded);
            setShowTrainingSolution(false);
            setShowTrainingFormula(false);
        };
        return (
            <section className="view-fade max-w-5xl mx-auto" ref={trainingRef}>
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Schüler-Training</div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                            {klassObj ? klassObj.label : ''} · {SCH.subjects[subject] ? SCH.subjects[subject].label : ''}
                            {selectedSection && <span className="text-slate-500"> · {sectionLabel(selectedSection, subject)}</span>}
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => startQuiz(klass, subject, selectedSection)}
                            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition">Quiz starten</button>
                        <button onClick={() => setStage('subjects')}
                            className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition">Fachübersicht</button>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Aufgabe {trainingIdx + 1} von {items.length}</div>
                        <div className="text-sm font-bold text-emerald-700">{solvedCount} gelöst · {pct}%</div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 transition-all duration-500"
                             style={{ width: `${pct}%` }}></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 task-fade" key={`${klass}-${subject}-${trainingIdx}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${solved ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {solved ? 'gelöst' : 'offen'}
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => goTo(trainingIdx - 1)} className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">← Vorherige</button>
                            <span className="text-sm text-slate-500">{trainingIdx + 1} / {items.length}</span>
                            <button onClick={() => goTo(trainingIdx + 1)} className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Nächste →</button>
                        </div>
                    </div>
                    {(() => { const meta = splitQuestionMeta(item.q, klass, subject, selectedSection); return (
                    <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 p-5 rounded-xl border border-slate-200 mb-5">
                        <div className="mb-3"><Crumbs items={meta.crumbs} /></div>
                        <div className="text-xl md:text-2xl text-slate-900 font-semibold leading-snug math-block" dangerouslySetInnerHTML={{ __html: meta.body }} />
                    </div>
                    ); })()}
                    <div className="bg-cyan-50 border-l-4 border-cyan-400 p-4 mb-5 rounded-r-lg">
                        <div className="flex items-center justify-between gap-3 mb-2">
                            <h3 className="text-sm font-bold text-cyan-800 uppercase tracking-wide">Formel / Merksatz</h3>
                            <button onClick={() => setShowTrainingFormula(v => !v)}
                                aria-expanded={showTrainingFormula}
                                className="text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white py-1 px-3 rounded transition">
                                {showTrainingFormula ? 'Ausblenden' : 'Tipp anzeigen'}
                            </button>
                        </div>
                        {showTrainingFormula ? (
                            <div className="text-cyan-950 math-block slide-in" dangerouslySetInnerHTML={{ __html: item.f || '<p>Nutze den passenden Fachbegriff und pruefe die Einheit.</p>' }} />
                        ) : (
                            <p className="text-xs italic text-cyan-700">Versuche es zuerst selbst. Bei Bedarf den Tipp einblenden.</p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3 mb-5">
                        <button onClick={() => setShowTrainingSolution(v => !v)}
                            className="bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg transition">
                            {showTrainingSolution ? 'Musterlösung ausblenden' : 'Musterlösung zeigen'}
                        </button>
                        <button onClick={() => schuelerProgress.setSolved(taskKey, !solved)}
                            className={`font-medium py-2 px-4 rounded-lg transition text-white ${solved
                                ? 'bg-slate-500 hover:bg-slate-600'
                                : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/30'}`}>
                            {solved ? 'Gelöst zurücknehmen' : 'Als gelöst markieren'}
                        </button>
                    </div>
                    {showTrainingSolution && (
                        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl slide-in">
                            <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3 border-b border-emerald-200 pb-2">Musterlösung</h3>
                            <div className="text-emerald-950 math-block" dangerouslySetInnerHTML={{ __html: item.s }} />
                        </div>
                    )}
                </div>
                <div className="mt-5 grid grid-cols-10 sm:grid-cols-12 gap-2">
                    {items.map((it, i) => {
                        const pillSolved = schuelerProgress.isSolved(studentTaskKey(klass, subject, it, i));
                        return (
                            <button key={i} onClick={() => goTo(i)} title={`Aufgabe ${i + 1}${pillSolved ? ' gelöst' : ''}`}
                                className={`h-8 rounded text-xs font-bold border transition ${i === trainingIdx
                                    ? 'bg-blue-600 border-blue-700 text-white'
                                    : pillSolved
                                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
            </section>
        );
    }

    // ---------- Stage: Quiz (10 Aufgaben) ----------
    if (stage === 'quiz') {
        const item = items[idx];
        if (!item) { setStage('classes'); return null; }
        return (
            <section className="view-fade max-w-2xl mx-auto" ref={drillRef}>
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        Quiz{selectedSection ? ` · ${sectionLabel(selectedSection, subject)}` : ''} · Aufgabe {idx + 1} von {items.length}
                    </div>
                    <button onClick={() => { if (window.confirm('Quiz abbrechen? Antworten gehen verloren.')) setStage('subjects'); }}
                        className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Abbrechen</button>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 transition-all duration-500"
                         style={{ width: `${(idx / items.length) * 100}%` }}></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 task-fade" key={idx}>
                    {(() => { const meta = splitQuestionMeta(item.q, klass, subject, selectedSection); return (<>
                        <div className="flex justify-center mb-4"><Crumbs items={meta.crumbs} /></div>
                        <div className="text-3xl md:text-4xl font-bold text-slate-900 text-center leading-tight mb-8 math-block"
                             dangerouslySetInnerHTML={{ __html: meta.body }} />
                    </>); })()}
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
                    <p className="text-xs text-slate-500 text-center mt-3">Hinweis: Im Quiz werden Formel und Musterlösung erst in der Auswertung sichtbar.</p>
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
                    <p className="text-slate-600 mb-6">{klassObj ? klassObj.label : ''} · {SCH.subjects[subject] ? SCH.subjects[subject].label : ''}{selectedSection ? ` · ${sectionLabel(selectedSection, subject)}` : ''}</p>
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
                                {a.crumbs && a.crumbs.length > 0 && (
                                    <div className="mb-1"><Crumbs items={a.crumbs} /></div>
                                )}
                                <div className="font-bold text-slate-800">
                                    <span className="text-slate-500 mr-1">{i + 1}.</span>
                                    <span className="math-block" dangerouslySetInnerHTML={{ __html: a.body || a.q }} />
                                </div>
                                <div className="text-sm mt-1">
                                    Deine Antwort: <strong className={a.correct ? 'text-emerald-700' : 'text-rose-700'}>{a.given || '—'}</strong>
                                    {!a.correct && <span className="text-slate-700"> · richtig: <strong>{a.expected}</strong></span>}
                                </div>
                                {(a.formula || a.solution) && (
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-xs font-bold text-slate-600 hover:text-slate-900">Formel und Musterlösung</summary>
                                        {a.formula && <div className="mt-2 text-sm text-cyan-950 math-block" dangerouslySetInnerHTML={{ __html: a.formula }} />}
                                        {a.solution && <div className="mt-2 text-sm text-emerald-950 math-block" dangerouslySetInnerHTML={{ __html: a.solution }} />}
                                    </details>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    <button onClick={() => startQuiz(klass, subject, selectedSection)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition">
                        Neues Quiz (10 Aufgaben)
                    </button>
                    {hasSchuelerTraining(klass, SCH.content[`${klass}.${subject}`]) && (
                        <button onClick={() => startTraining(klass, subject, 0, selectedSection)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition">
                            Training öffnen
                        </button>
                    )}
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
