// ---------------------------------------------------------------- SchuelerDashboard (P-UI-RESTRUCTURE, v85)
// Audience-spezifische Dashboard-Variante fuer den Schueler-Bereich. Zeigt pro
// sichtbarer Klasse einen farbigen Fortschrittsbalken (10-Farben-Palette) und
// optional ein zusammenfassendes Chart.js-Balkendiagramm. Bezieht Fortschritt aus
// `useSchuelerProgress` (Storage-Key SCHUELER_PROGRESS_KEY).
const SCHUELER_CLASS_COLORS = [
    '#10b981', // k1 emerald
    '#0ea5e9', // k2 sky
    '#f59e0b', // k3 amber
    '#f43f5e', // k4 rose
    '#8b5cf6', // k5 violet
    '#14b8a6', // k6 teal
    '#6366f1', // k7 indigo
    '#ec4899', // k8 pink
    '#84cc16', // k9 lime
    '#fb923c'  // k10 orange
];

function schuelerClassStats(SCH, classId, progress) {
    const cls = SCH && SCH.classes && SCH.classes.find(c => c.id === classId);
    if (!cls) return { total: 0, done: 0, pct: 0, mode: 'unknown' };
    let total = 0, done = 0, hasPool = false, hasGenerated = false;
    (cls.subjects || []).forEach(sub => {
        const cfg = SCH.content && SCH.content[`${classId}.${sub}`];
        if (!cfg) return;
        if (cfg.mode === 'pool' && Array.isArray(cfg.pool)) {
            hasPool = true;
            cfg.pool.forEach((item, idx) => {
                total++;
                const qid = stableQid({ q: item && item.q, a: item && item.a });
                const key = `${classId}.${sub}|${qid || idx}`;
                if (progress[key]) done++;
            });
        } else if (cfg.mode === 'generated') {
            hasGenerated = true;
        }
    });
    if (!hasPool && hasGenerated) {
        // K1/K2 (rein generiert): kein fester Pool — wir zaehlen direkt persistierte Items.
        let gDone = 0;
        Object.keys(progress).forEach(k => { if (k.indexOf(classId + '.') === 0) gDone++; });
        return { total: 0, done: gDone, pct: 0, mode: 'generated' };
    }
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0, mode: 'pool' };
}

function SchuelerChart({ classRows }) {
    const ref = useRef(null);
    const chartRef = useRef(null);
    useEffect(() => {
        if (!ref.current || !window.Chart) return;
        const labels = classRows.map(r => r.label);
        const data = classRows.map(r => r.pct);
        const colors = classRows.map(r => r.color);
        if (chartRef.current) {
            chartRef.current.data.labels = labels;
            chartRef.current.data.datasets[0].data = data;
            chartRef.current.data.datasets[0].backgroundColor = colors;
            chartRef.current.update();
            return;
        }
        chartRef.current = new window.Chart(ref.current.getContext('2d'), {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Fortschritt (%)',
                    data,
                    backgroundColor: colors,
                    borderRadius: 6,
                    maxBarThickness: 28
                }]
            },
            options: {
                indexAxis: 'y',
                maintainAspectRatio: false,
                animation: { duration: 700, easing: 'easeOutQuart' },
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } },
                    y: { ticks: { font: { weight: '600' } } }
                }
            }
        });
    }, [classRows]);
    useEffect(() => () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } }, []);
    return (
        <div className="schueler-chart-box" style={{ height: Math.max(140, classRows.length * 34) + 'px' }}>
            <canvas ref={ref}></canvas>
        </div>
    );
}

function SchuelerDashboard({ activeProfile, visibleClassIds, onOpenSchueler, onGoToOptionen, onExport, onImport, onReset, onInstall }) {
    const SCH = window.SCHUELER;
    const schuelerProgress = useSchuelerProgress();
    const allClasses = (SCH && SCH.classes) ? SCH.classes : [];
    const visibleSet = Array.isArray(visibleClassIds) ? new Set(visibleClassIds) : null;
    const rows = useMemo(() => {
        return allClasses
            .filter(c => !visibleSet || visibleSet.has(c.id))
            .map((c) => {
                const idx = allClasses.findIndex(x => x.id === c.id);
                const color = SCHUELER_CLASS_COLORS[idx % SCHUELER_CLASS_COLORS.length];
                const stats = schuelerClassStats(SCH, c.id, schuelerProgress.progress || {});
                return { id: c.id, label: c.label, color, ...stats };
            });
    }, [allClasses, visibleSet, schuelerProgress.progress]);
    const totals = useMemo(() => {
        let total = 0, done = 0;
        rows.forEach(r => { if (r.mode === 'pool') { total += r.total; done += r.done; } });
        return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
    }, [rows]);
    const chartRows = rows.filter(r => r.mode === 'pool');

    return (
        <section className="view-fade">
            <div className="text-center max-w-3xl mx-auto mb-8">
                <img src="icons/smartineer-logo.png" alt="" width="80" height="80"
                     className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 drop-shadow-md" />
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Dein Schüler-Cockpit.</h1>
                <p className="text-sm md:text-base text-slate-600">Fortschritt pro Klasse, lokal auf diesem Gerät gespeichert.</p>
                {activeProfile && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs text-slate-600">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-serif font-bold"
                            style={{ backgroundColor: activeProfile.bg, color: activeProfile.fg }}>{activeProfile.symbol}</span>
                        <span className="font-bold">{activeProfile.name}</span>
                        <span className="text-slate-400">·</span>
                        <span>Schülerbereich</span>
                    </div>
                )}
            </div>

            <div className="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-2xl shadow-sm border border-slate-200 p-5 md:p-7 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-slate-800 mb-1">Gesamtfortschritt</h2>
                        <p className="text-sm text-slate-600 mb-3">{rows.length} sichtbare Klassen · {totals.done} / {totals.total} Pool-Aufgaben gelöst ({totals.pct}%).</p>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={onOpenSchueler}
                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-2 px-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                                Schülerbereich öffnen →
                            </button>
                            {onGoToOptionen && (
                                <button onClick={onGoToOptionen}
                                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-5 rounded-xl transition-all">
                                    Klassen verwalten
                                </button>
                            )}
                        </div>
                    </div>
                    {chartRows.length > 0 && (
                        <div className="w-full md:w-1/2">
                            <SchuelerChart classRows={chartRows} />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rows.map((r, i) => (
                    <button key={r.id} onClick={onOpenSchueler}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className="card-fade group relative overflow-hidden bg-white text-left rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
                        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-15 group-hover:opacity-30 transition-opacity"
                            style={{ backgroundColor: r.color }}></div>
                        <div className="flex justify-between items-start mb-2 relative">
                            <h3 className="font-bold text-slate-800 text-lg">{r.label}</h3>
                            {r.mode === 'pool' ? (
                                <span className="text-xs font-bold px-2 py-1 rounded-full text-white"
                                    style={{ backgroundColor: r.color }}>{r.pct}%</span>
                            ) : (
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-200 text-slate-700">offen</span>
                            )}
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden relative">
                            <div className="h-2 rounded-full transition-all duration-700 ease-out"
                                style={{ width: (r.mode === 'pool' ? r.pct : 0) + '%', backgroundColor: r.color }}></div>
                        </div>
                        <p className="text-xs text-slate-500 relative">
                            {r.mode === 'pool'
                                ? <>{r.done} / {r.total} Aufgaben gelöst</>
                                : <>{r.done} Aufgaben gemeistert (generierte Aufgaben)</>}
                        </p>
                    </button>
                ))}
            </div>

            {(onExport || onImport || onReset || onInstall) && (
                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                    {onExport && <button onClick={onExport} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-4 rounded-lg text-sm transition">Fortschritt exportieren</button>}
                    {onImport && <button onClick={onImport} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-4 rounded-lg text-sm transition">Fortschritt importieren</button>}
                    {onReset && <button onClick={onReset} className="bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold py-2 px-4 rounded-lg text-sm transition">Fortschritt zurücksetzen</button>}
                    {onInstall && <button onClick={onInstall} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg text-sm shadow transition">Als App installieren</button>}
                </div>
            )}
        </section>
    );
}

function Schueler({ visibleClassIds }) {
    const SCH = window.SCHUELER;
    // P-UI-CLASS-FILTER-SCHUELER (v88): Klassen-Auswahl auf die im InterestPicker /
    // Einstellungen freigeschalteten Klassen reduzieren. Leere/Default-Whitelist (alles)
    // -> alle Klassen wie bisher. Ist nur genau eine Klasse sichtbar, wird der
    // Klassen-Picker uebersprungen und direkt der Faecher-Picker geoeffnet.
    const allowedClassSet = React.useMemo(() => {
        if (!Array.isArray(visibleClassIds) || !visibleClassIds.length) return null;
        return new Set(visibleClassIds);
    }, [visibleClassIds]);
    const visibleClasses = React.useMemo(() => {
        if (!SCH || !Array.isArray(SCH.classes)) return [];
        if (!allowedClassSet) return SCH.classes;
        const filtered = SCH.classes.filter(c => allowedClassSet.has(c.id));
        return filtered.length ? filtered : SCH.classes;
    }, [SCH, allowedClassSet]);
    const [stage, setStage] = useState(() => (visibleClasses.length === 1 ? 'subjects' : 'classes'));
    const [klass, setKlass] = useState(() => (visibleClasses.length === 1 ? visibleClasses[0].id : null));
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
    // P-UI-SCHUELER-TRAINING-K1-K4 (v104): Training ist seit v104 fuer alle Klassen
    // verfuegbar. Pool-Faecher (K3-K10) brauchen mindestens ein Item; generierte
    // Faecher (K1/K2 Mathe) bauen die Trainings-Batch zur Laufzeit. Formel/Loesung
    // bleiben optional — Aufgabe + "Als geloest markieren" reichen aus.
    const hasSchuelerTraining = (klassId, cfg) => {
        if (!cfg) return false;
        if (cfg.mode === 'pool') return Array.isArray(cfg.pool) && cfg.pool.length > 0;
        if (cfg.mode === 'generated') return typeof cfg.gen === 'function';
        return false;
    };
    const TRAINING_GENERATED_BATCH = 20; // K1/K2: Anzahl frischer Aufgaben pro Trainings-Start
    const studentTaskKey = (klassId, subjId, item, itemIdx) => {
        const qid = stableQid({ q: item && item.q, a: item && item.a });
        return `${klassId}.${subjId}|${qid || itemIdx}`;
    };
    // P-UI-SCHUELER-SECTIONS-ALL (v78): Lehrplan-orientierte Abschnitte fuer alle
    // Mittelstufen-Faecher. Sprachfaecher haben tagged data (`section`-Feld via
    // `kind`/Datenpflege), die anderen Faecher werden heuristisch nach NRW-KLP-
    // Domaenen zugeordnet. P-UI-SCHUELER-GESCHICHTE-SUBEPOCHS (v80): Geschichte
    // hat zusaetzlich klassenstufen-spezifische Sub-Epochen (K5 Steinzeit/AEgypten/
    // Griechen/Roemer; K6 Frueh-/Hoch-/Spaetmittelalter; K7 Renaissance/Reformation/
    // Absolutismus/Aufklaerung; K8 Franzoesische Revolution/Napoleon/Vormaerz/
    // Industrialisierung/Reichsgruendung; K9 Kaiserreich/WK1/Weimar/NS-Aufstieg;
    // K10 WK2/Shoah/Kalter Krieg/BRD-DDR/Wiedervereinigung/Globalisierung).
    // Mindestgroesse pro Abschnitt: 20 Aufgaben (`MIN_SECTION_ITEMS`).
    const MIN_SECTION_ITEMS = 20;
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
        ]
        // Geschichte: siehe GESCHICHTE_SUBEPOCHS (klassenstufenspezifisch).
    };
    const GESCHICHTE_SUBEPOCHS = {
        k5: [
            { id: 'k5_steinzeit', label: 'Steinzeit', desc: 'Altsteinzeit, Jungsteinzeit, Nomaden, Sesshaftwerdung.' },
            { id: 'k5_aegypten', label: 'AEgypten', desc: 'Pharaonen, Pyramiden, Nil, Hieroglyphen.' },
            { id: 'k5_griechen', label: 'Griechen', desc: 'Polis, Athen, Sparta, Demokratie, Alexander.' },
            { id: 'k5_roemer', label: 'Roemer', desc: 'Republik, Kaiserzeit, Legion, Provinzen.' }
        ],
        k6: [
            { id: 'k6_fruehmittel', label: 'Fruehmittelalter', desc: 'Voelkerwanderung, Franken, Karolinger, Ottonen.' },
            { id: 'k6_hochmittel', label: 'Hochmittelalter', desc: 'Ritter, Burgen, Kreuzzuege, Staufer, Investitur.' },
            { id: 'k6_spaetmittel', label: 'Spaetmittelalter', desc: 'Hanse, Stadtwesen, Pest, Buergertum.' }
        ],
        k7: [
            { id: 'k7_renaissance', label: 'Renaissance & Entdeckungen', desc: 'Humanismus, Buchdruck, Kolumbus, Magellan.' },
            { id: 'k7_reformation', label: 'Reformation', desc: 'Luther, 95 Thesen, Konfessionalisierung, Augsburger Religionsfrieden.' },
            { id: 'k7_absolutismus', label: 'Absolutismus & 30j. Krieg', desc: 'Ludwig XIV, Versailles, Westfaelischer Friede.' },
            { id: 'k7_aufklaerung', label: 'Aufklaerung & USA', desc: 'Kant, Voltaire, US-Unabhaengigkeit, Menschenrechte.' }
        ],
        k8: [
            { id: 'k8_franzrev', label: 'Franzoesische Revolution', desc: '1789, Bastille, Jakobiner, Menschen- und Buergerrechte.' },
            { id: 'k8_napoleon', label: 'Napoleon', desc: 'Code civil, Voelkerschlacht, Wiener Kongress, Restauration.' },
            { id: 'k8_vormaerz', label: 'Vormaerz & 1848', desc: 'Burschenschaften, Hambacher Fest, Paulskirche.' },
            { id: 'k8_industrie', label: 'Industrialisierung', desc: 'Dampfmaschine, Eisenbahn, Soziale Frage, Gewerkschaften.' },
            { id: 'k8_reich', label: 'Reichsgruendung 1871', desc: 'Bismarck, Norddt. Bund, Krieg gegen Frankreich, Versailles.' }
        ],
        k9: [
            { id: 'k9_kaiserreich', label: 'Kaiserreich 1871-1914', desc: 'Wilhelm II, Kolonien, Flottenpolitik, Kulturkampf.' },
            { id: 'k9_wk1', label: 'Erster Weltkrieg', desc: 'Sarajevo, Verdun, Stellungskrieg, Versailler Vertrag.' },
            { id: 'k9_weimar', label: 'Weimarer Republik', desc: 'Verfassung, Inflation 1923, Goldene Zwanziger, Stresemann.' },
            { id: 'k9_nsaufstieg', label: 'Aufstieg des NS', desc: 'NSDAP, Machtergreifung 1933, Gleichschaltung, Nuernberger Gesetze.' }
        ],
        k10: [
            { id: 'k10_wk2', label: 'Zweiter Weltkrieg', desc: '1939-1945, Kriegsverlauf, Kapitulation 1945.' },
            { id: 'k10_shoah', label: 'Shoah & NS-Verbrechen', desc: 'Holocaust, KZ, Wannsee-Konferenz, Widerstand.' },
            { id: 'k10_kalterkrieg', label: 'Kalter Krieg', desc: 'Eiserner Vorhang, Mauerbau, NATO vs. Warschauer Pakt.' },
            { id: 'k10_brdddr', label: 'BRD & DDR', desc: 'Adenauer, Brandt, Wirtschaftswunder, SED, Stasi.' },
            { id: 'k10_wiedervereinigung', label: 'Wiedervereinigung', desc: '1989, Mauerfall, Tag der Deutschen Einheit, Zwei-plus-Vier.' },
            { id: 'k10_globalisierung', label: 'Globalisierung & EU', desc: 'Maastricht, Euro, 9/11, Klimawandel, Migration.' }
        ]
    };
    const sectionsFor = (subjId, klassId) => {
        if (subjId === 'geschichte' && klassId) return GESCHICHTE_SUBEPOCHS[klassId] || null;
        return SUBJECT_SECTIONS[subjId] || null;
    };
    const hasSubjectSections = (subjId, klassId) => Array.isArray(sectionsFor(subjId, klassId));
    const sectionLabel = (sectionId, subjId, klassId) => {
        if (!sectionId) return '';
        const list = sectionsFor(subjId, klassId);
        if (list) {
            const m = list.find(s => s.id === sectionId);
            if (m) return m.label;
        }
        // Fallback ueber alle Subjects (z.B. wenn subjId nicht gesetzt ist)
        for (const k of Object.keys(SUBJECT_SECTIONS)) {
            const m = SUBJECT_SECTIONS[k].find(s => s.id === sectionId);
            if (m) return m.label;
        }
        for (const kk of Object.keys(GESCHICHTE_SUBEPOCHS)) {
            const m = GESCHICHTE_SUBEPOCHS[kk].find(s => s.id === sectionId);
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
            // P-UI-SCHUELER-GESCHICHTE-SUBEPOCHS (v80): klassenstufen-spezifische
            // Sub-Epochen. Heuristik kombiniert Jahreszahl-Cutoffs mit kuratierten
            // Stichworten je Sub-Epoche. Faellt nichts, geht es auf die erste
            // Sub-Epoche der Klasse (z.B. K8 -> 'k8_franzrev').
            const yearMatch = text.match(/\b(\d{3,4})(?:\s*(?:v\.?\s*chr|bc|n\.?\s*chr|ad))?\b/);
            let year = null;
            let isBC = false;
            if (yearMatch) {
                year = parseInt(yearMatch[1], 10);
                isBC = /v\.?\s*chr|bc/.test(text.slice(yearMatch.index, yearMatch.index + 20));
            }
            if (klassId === 'k5') {
                if (/steinzeit|altsteinzeit|jungsteinzeit|jaeger|jäger|sammler|neandert|nomad|sesshaft|faustkeil|hoehlenmal|höhlenmal|lascaux/.test(text)) return 'k5_steinzeit';
                if (/aegypten|ägypten|pharao|pyramide|nil\b|hieroglyph|tutench|cheops|mumi|niltal|osiris/.test(text)) return 'k5_aegypten';
                if (/griech|olymp|sparta|athen\b|polis|demokrat|alexander|aristoteles|sokrates|platon|homer|trojan|perikles|hellen|akropolis/.test(text)) return 'k5_griechen';
                if (/\brom\b|roem|römer|caesar|augustus|republik|senat|legion|imperator|gladiator|kolosseum|cicero|forum|provinz|patriz|plebej|punisch/.test(text)) return 'k5_roemer';
                if (isBC && year !== null) {
                    if (year >= 3000) return 'k5_steinzeit';
                    if (year >= 500) return 'k5_aegypten';
                    if (year >= 100) return 'k5_griechen';
                    return 'k5_roemer';
                }
                if (year !== null && year < 500) return 'k5_roemer';
                return 'k5_steinzeit';
            }
            if (klassId === 'k6') {
                if (/voelkerwander|völkerwander|karoling|karl der|otto i|otto der|merow|frank\b|franken|wikinger|normann|chlodwig|verdun.*843|sachsenkaiser|salier/.test(text)) return 'k6_fruehmittel';
                if (/ritter|burg\b|kreuzzug|staufer|hohenstauf|barbarossa|lehnswesen|investiturstreit|gotik|romanik|byzanz|jerusalem|kloster|moench|mönch|minnesang|tempel/.test(text)) return 'k6_hochmittel';
                if (/hanse|pest|schwarzer tod|reichstag|reichsstadt|landfrieden|interregnum|hexen|spaetmittel|spätmittel|zunft|gilde|buergertum|bürgertum/.test(text)) return 'k6_spaetmittel';
                if (year !== null) {
                    if (year < 1000) return 'k6_fruehmittel';
                    if (year < 1300) return 'k6_hochmittel';
                    return 'k6_spaetmittel';
                }
                return 'k6_hochmittel';
            }
            if (klassId === 'k7') {
                if (/renaissance|humanism|leonardo|michelangelo|gutenberg|buchdruck|kolumbus|entdeck|magellan|inka|aztek|kolonie|neue welt|amerika.*entdeck/.test(text)) return 'k7_renaissance';
                if (/reformation|luther|95 thesen|95-thesen|protestant|calvin|zwingli|melanchth|kirchspaltung|konfession|augsburger religion|tridentin|dreissigjaehrig|dreißigjährig|westfaelisch|westfälisch/.test(text)) return 'k7_reformation';
                if (/absolutismus|ludwig xiv|versailles|sonnenkoenig|sonnenkönig|merkantil|preussen|preußen|friedrich der|friedrich ii\.|maria theres|hofstaat|standesgesellschaft/.test(text)) return 'k7_absolutismus';
                if (/aufkl|kant\b|voltaire|rousseau|locke|montesquieu|unabhaengigkeit|unabhängigkeit|amerikanisch|\busa\b|gewaltenteilung|menschenrecht|enzyklopaed|enzyklopäd/.test(text)) return 'k7_aufklaerung';
                if (year !== null) {
                    if (year < 1550) return 'k7_renaissance';
                    if (year < 1648) return 'k7_reformation';
                    if (year < 1740) return 'k7_absolutismus';
                    return 'k7_aufklaerung';
                }
                return 'k7_reformation';
            }
            if (klassId === 'k8') {
                if (/franzoesische revolution|französische revolution|sturm auf die bastille|bastille|jakobin|robespierre|guillot|nationalversamm|menschen- und buergerrecht|menschen- und bürgerrecht|terreur|tuilerien/.test(text)) return 'k8_franzrev';
                if (/napoleon|austerlitz|leipzig|voelkerschlacht|völkerschlacht|elba|sankt helena|st\. helena|kontinentalsperre|code civil|wiener kongress|metternich|restauration|befreiungskrieg|waterloo/.test(text)) return 'k8_napoleon';
                if (/vormärz|vormaerz|hambacher|burschenschaft|wartburgfest|biedermeier|paulskirche|maerzrevolution|märzrevolution|frankfurter parlament|nationalversammlung 1848|karlsbader/.test(text)) return 'k8_vormaerz';
                if (/industrialisier|industrielle revolution|dampfmaschine|eisenbahn|fabrik\b|maschinenbau|krupp|kohle|stahl|soziale frage|pauperism|kinderarbeit|gewerkschaft|sozialdemokrat|marx\b|kapital\b|proletariat/.test(text)) return 'k8_industrie';
                if (/bismarck|reichsgruendung|reichsgründung|norddt|norddeutscher bund|deutsch-franzoesisch|deutsch-französisch|sedan|spiegelsaal|emser depesche|eiserner kanzler|1871|kaiserproklamation/.test(text)) return 'k8_reich';
                if (year !== null) {
                    if (year >= 1789 && year < 1799) return 'k8_franzrev';
                    if (year >= 1799 && year < 1815) return 'k8_napoleon';
                    if (year >= 1815 && year < 1849) return 'k8_vormaerz';
                    if (year >= 1849 && year < 1866) return 'k8_industrie';
                    if (year >= 1866 && year < 1880) return 'k8_reich';
                }
                return 'k8_industrie';
            }
            if (klassId === 'k9') {
                if (/nsdap|nationalsoz|\bhitler\b|machtergreifung|machtuebernahme|machtübernahme|gleichschaltung|hitlerputsch|nuernberger gesetze|nürnberger gesetze|reichstagsbrand|ermaechtigungsgesetz|ermächtigungsgesetz/.test(text)) return 'k9_nsaufstieg';
                if (/erster weltkrieg|wk1|wk 1|sarajevo|tannenberg|verdun|somme|stellungskrieg|burgfrieden|hindenburg|ludendorff|versailler vertrag|versailles 1919|14 punkte|kriegsschuld/.test(text)) return 'k9_wk1';
                if (/weimar|weimarer|reichspraesident|reichspräsident|\bebert\b|inflation 1923|hyperinflation|stresemann|locarno|goldene zwanziger|kapp-putsch|raeterepublik|räterepublik|dolchstoss/.test(text)) return 'k9_weimar';
                if (/kaiserreich|wilhelm ii|wilhelm i\.|kolonia|kolonialpolitik|herero|samoa|flottenpolitik|tirpitz|weltpolitik|kulturkampf|sozialistenges|bismarcksche|gruenderzeit|gründerzeit|1888|1890/.test(text)) return 'k9_kaiserreich';
                if (year !== null) {
                    if (year >= 1933) return 'k9_nsaufstieg';
                    if (year >= 1918 && year < 1933) return 'k9_weimar';
                    if (year >= 1914 && year < 1919) return 'k9_wk1';
                    if (year >= 1871 && year < 1914) return 'k9_kaiserreich';
                }
                return 'k9_kaiserreich';
            }
            if (klassId === 'k10') {
                if (/shoah|holocaust|judenverfolgung|wannsee|konzentrationslager|\bkz\b|auschwitz|endloesung|endlösung|nuernberger prozess|nürnberger prozess|widerstand.*ns|stauffenberg|reichspogrom|kristallnacht/.test(text)) return 'k10_shoah';
                if (/zweiter weltkrieg|wk2|wk 2|polenfeldzug|barbarossa|stalingrad|d-day|kapitulation|atombomb|hiroshima|nagasaki|kriegsende 1945|el alamein/.test(text)) return 'k10_wk2';
                if (/wiedervereinigung|mauerfall|9\. november 1989|3\. oktober|tag der deutschen einheit|gorbatschow|perestrojka|glasnost|zwei-plus-vier|monday demo|montagsdemo/.test(text)) return 'k10_wiedervereinigung';
                if (/kalter krieg|eiserner vorhang|sowjet|kuba-krise|kuba krise|berlin-blockade|berlinblockade|mauerbau|\bmauer\b|\bnato\b|warschauer pakt|vietnam.*krieg|abruestung|abrüstung|wettrueste|wettrüste/.test(text)) return 'k10_kalterkrieg';
                if (/\bbrd\b|\bddr\b|\bbonn\b|adenauer|brandt|kohl\b|honecker|ulbricht|wirtschaftswunder|ostpolitik|grundgesetz|stasi|sed\b|sozialistische einheits/.test(text)) return 'k10_brdddr';
                if (/globalisier|\beuro\b|europaeische union|europäische union|maastricht|lissabon|nato-osterw|osterweiterung|9\/11|11\. september 2001|terror|finanzkrise|klimawandel|migration|brexit|pandemie/.test(text)) return 'k10_globalisierung';
                if (year !== null) {
                    if (year >= 1939 && year < 1946) return 'k10_wk2';
                    if (year >= 1946 && year < 1989) return 'k10_kalterkrieg';
                    if (year >= 1989 && year < 1991) return 'k10_wiedervereinigung';
                    if (year >= 1991) return 'k10_globalisierung';
                }
                return 'k10_kalterkrieg';
            }
            return null;
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
        const sections = sectionsFor(subjId, klassId);
        if (!sections || !cfg || !Array.isArray(cfg.pool)) return null;
        // Abschnitte mit weniger als MIN_SECTION_ITEMS Aufgaben werden ausgeblendet
        // (Lehrplan-Floor, P-UI-SCHUELER-SECTION-FLOOR, v80). So entstehen keine
        // visuell duennen Sections; betroffene Items sind ueber Gesamttraining/-
        // Gesamtquiz weiterhin erreichbar.
        const rows = sections
            .map(section => ({ section, count: poolForSection(cfg, section.id, subjId, klassId).length }))
            .filter(r => r.count >= MIN_SECTION_ITEMS);
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
        let pool = [];
        if (cfg.mode === 'generated') {
            // K1/K2: frische Batch generieren. Dedupliziere ueber den Frage-Stem,
            // damit die kleinen Zahlraeume nicht zwei mal die exakt gleiche Aufgabe
            // liefern.
            const seen = new Set();
            for (let i = 0; i < TRAINING_GENERATED_BATCH * 3 && pool.length < TRAINING_GENERATED_BATCH; i++) {
                const it = cfg.gen();
                if (!it || !it.q || seen.has(it.q)) continue;
                seen.add(it.q);
                pool.push(it);
            }
        } else {
            pool = poolForSection(cfg, sectionId, subjId, klassId);
        }
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
        // P-UI-SCHUELER-QUIZ-PROGRESS (v95): Richtig beantwortete Quiz-Items in den
        // Schueler-Fortschritt schreiben. studentTaskKey nutzt stableQid({q,a}) —
        // damit deckt sich der Key 1:1 mit dem, was schuelerClassStats erwartet,
        // und das Klassen-Dashboard zaehlt das Item ab sofort als geloest. Wirkt
        // sowohl fuer Pool-Faecher (Mittelstufe / Klasse 3-4) als auch fuer
        // generierte Faecher (K1/K2): generierte Items haben pro {q,a} eine
        // eigene qid und tragen damit zur K1/K2-"gemeistert"-Zaehlung bei.
        if (correct) {
            schuelerProgress.setSolved(studentTaskKey(klass, subject, item, idx), true);
        }
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
        const sectionL = sectionId ? sectionLabel(sectionId, subjId, klassId) : '';
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
                    {visibleClasses.map((c, i) => {
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
        // P-UI-RESET-SCOPED (v104): Zaehle geloeste Aufgaben je Fach fuer die
        // Anzeige neben dem Reset-Button und fuer den Klassen-Gesamtwert.
        const classSolvedCount = Object.keys(schuelerProgress.progress || {})
            .filter(k => k.indexOf(`${klass}.`) === 0).length;
        const handleResetClass = () => {
            if (!classSolvedCount) return;
            if (window.confirm(`Fortschritt für ${klassObj.label} wirklich zurücksetzen? (${classSolvedCount} gelöste Aufgaben)`)) {
                schuelerProgress.resetClass(klass);
            }
        };
        return (
            <section className="view-fade">
                <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{klassObj.label} — Fach wählen</h1>
                    <div className="flex flex-wrap gap-2">
                        {classSolvedCount > 0 && (
                            <button onClick={handleResetClass}
                                className="px-3 py-2 text-sm bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg font-bold transition"
                                title={`Setzt alle gelösten Aufgaben in ${klassObj.label} zurück`}>
                                Klasse zurücksetzen ({classSolvedCount})
                            </button>
                        )}
                        <button onClick={() => setStage('classes')}
                            className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition">← Klassenübersicht</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {klassObj.subjects.map(s => {
                        const cfg = SCH.content[`${klass}.${s}`];
                        const ready = cfg && cfg.mode !== 'stub';
                        const trainingReady = hasSchuelerTraining(klass, cfg);
                        const poolCount = cfg && Array.isArray(cfg.pool) ? cfg.pool.length : null;
                        const subjSolvedCount = Object.keys(schuelerProgress.progress || {})
                            .filter(k => k.indexOf(`${klass}.${s}|`) === 0).length;
                        const handleResetSubject = (e) => {
                            e.stopPropagation();
                            if (window.confirm(`Fortschritt für ${SCH.subjects[s].label} (${klassObj.label}) wirklich zurücksetzen? (${subjSolvedCount} gelöste Aufgaben)`)) {
                                schuelerProgress.resetSubject(klass, s);
                            }
                        };
                        return (
                            <div key={s}
                                className={`text-left bg-white rounded-2xl border border-slate-200 p-6 transition ${ready
                                    ? 'hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                                    : 'opacity-60 cursor-not-allowed'}`}>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-slate-800">{SCH.subjects[s].label}</h3>
                                    {ready && subjSolvedCount > 0 && (
                                        <button onClick={handleResetSubject}
                                            className="text-xs px-2 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold transition shrink-0"
                                            title={`Setzt ${subjSolvedCount} gelöste Aufgaben zurück`}>
                                            Reset ({subjSolvedCount})
                                        </button>
                                    )}
                                </div>
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
                            {selectedSection && <span className="text-slate-500"> · {sectionLabel(selectedSection, subject, klass)}</span>}
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
                    {(item.f && item.f.trim()) ? (
                    <div className="schueler-formula-box bg-cyan-50 border-l-4 border-cyan-400 p-4 mb-5 rounded-r-lg">
                        <div className="flex items-center justify-between gap-3 mb-2">
                            <h3 className="schueler-formula-title text-sm font-bold text-cyan-800 uppercase tracking-wide">Formel / Merksatz</h3>
                            <button onClick={() => setShowTrainingFormula(v => !v)}
                                aria-expanded={showTrainingFormula}
                                className="text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white py-1 px-3 rounded transition">
                                {showTrainingFormula ? 'Ausblenden' : 'Tipp anzeigen'}
                            </button>
                        </div>
                        {showTrainingFormula ? (
                            <div className="schueler-formula-body text-cyan-950 math-block slide-in" dangerouslySetInnerHTML={{ __html: item.f }} />
                        ) : (
                            <p className="schueler-formula-hint text-xs italic text-cyan-700">Versuche es zuerst selbst. Bei Bedarf den Tipp einblenden.</p>
                        )}
                    </div>
                    ) : null}
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
                    {showTrainingSolution && item.s && item.s.trim() && (
                        <div className="schueler-solution-box bg-emerald-50 border border-emerald-200 p-5 rounded-xl slide-in">
                            <h3 className="schueler-solution-title text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3 border-b border-emerald-200 pb-2">Musterlösung</h3>
                            <div className="schueler-solution-body text-emerald-950 math-block" dangerouslySetInnerHTML={{ __html: item.s }} />
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
                        Quiz{selectedSection ? ` · ${sectionLabel(selectedSection, subject, klass)}` : ''} · Aufgabe {idx + 1} von {items.length}
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
                    <p className="text-slate-600 mb-6">{klassObj ? klassObj.label : ''} · {SCH.subjects[subject] ? SCH.subjects[subject].label : ''}{selectedSection ? ` · ${sectionLabel(selectedSection, subject, klass)}` : ''}</p>
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
                                {((a.formula && a.formula.trim()) || (a.solution && a.solution.trim())) && (
                                    <details className="schueler-result-details mt-2">
                                        <summary className="cursor-pointer text-xs font-bold text-slate-600 hover:text-slate-900">Formel und Musterlösung</summary>
                                        {a.formula && a.formula.trim() && <div className="schueler-formula-body mt-2 text-sm text-cyan-950 math-block" dangerouslySetInnerHTML={{ __html: a.formula }} />}
                                        {a.solution && a.solution.trim() && <div className="schueler-solution-body mt-2 text-sm text-emerald-950 math-block" dangerouslySetInnerHTML={{ __html: a.solution }} />}
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
