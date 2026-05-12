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
    // P-UI-RESTRUCTURE (v85): Ingenieurbereich kapselt Training, Cheatsheets und Schulungen.
    ingenieur: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
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

function Nav({ view, setView, theme, onToggleTheme, activeProfile, onOpenProfileSwitcher }) {
    // P-UI-RESTRUCTURE (v85): Top-Level-Navigation auf vier Bereiche reduziert.
    // Cheatsheets und Schulungen ziehen als Sub-Tabs in den Ingenieurbereich um.
    const learnItems = [
        { id: 'dashboard', label: 'Dashboard',        aria: 'Dashboard' },
        { id: 'ingenieur', label: 'Ingenieur',        aria: 'Ingenieurbereich' },
        { id: 'schueler',  label: 'Schüler',          aria: 'Schülerbereich' }
    ];
    const accountItems = [
        { id: 'optionen', label: 'Einstellungen',     aria: 'Einstellungen' }
    ];
    const renderItem = (it) => {
        const active = view === it.id;
        return (
            <button key={it.id}
                onClick={() => setView(it.id)}
                title={it.aria}
                aria-label={it.aria}
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
                        {activeProfile && onOpenProfileSwitcher && (
                            <button onClick={onOpenProfileSwitcher}
                                title={'Profil: ' + activeProfile.name + ' — zum Wechseln klicken'}
                                aria-label={'Profil wechseln (aktuell: ' + activeProfile.name + ')'}
                                className="ml-1 sm:ml-2 inline-flex items-center justify-center gap-2 whitespace-nowrap px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-slate-600 text-slate-200 hover:bg-slate-700/60 transition">
                                <span aria-hidden="true" className="inline-flex items-center justify-center w-6 h-6 rounded-md text-base font-serif font-bold"
                                    style={{ backgroundColor: activeProfile.bg, color: activeProfile.fg }}>
                                    {activeProfile.symbol}
                                </span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                                    <path d="M7 7h11l-3-3" />
                                    <path d="M17 17H6l3 3" />
                                </svg>
                                <span className="hidden lg:inline">{activeProfile.name}</span>
                            </button>
                        )}
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
                <div className="dashboard-resume-panel bg-gradient-to-br from-blue-50 via-white to-cyan-50/40 rounded-2xl border border-blue-200 shadow-sm p-6 md:p-7 mb-10 flex flex-col md:flex-row items-start md:items-center gap-5">
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
