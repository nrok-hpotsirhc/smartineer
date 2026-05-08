/*
 * Smartineer — React-App (JSX, in-browser via Babel-standalone, kein Build-Schritt).
 * Daten kommen aus js/data/<id>.js (legen window.APP_DATA und window.APP_ORDER an).
 */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

const STORAGE_KEY = 'wissen_reloaded_progress_v1';
const INSTALL_DISMISS_KEY = 'smartineer_install_dismissed_v1';
const THEME_KEY = 'smartineer_theme_v1'; // 'dark' | 'light' (Default: 'dark')
const SCHULUNGEN_KEY = 'smartineer_schulungen_v1'; // { [trainingId]: { [chapterId]: { lastPage, quizBest } } }

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

// ---------------------------------------------------------------- Nav
function Nav({ view, setView, theme, onToggleTheme }) {
    const items = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'training', label: 'Training' },
        { id: 'cheatsheet', label: 'Cheatsheets' },
        { id: 'schulungen', label: 'Schulungen' },
        { id: 'schueler', label: 'Schüler' }
    ];
    return (
        <nav className="nav-glass sticky top-0 z-40 backdrop-blur-md bg-slate-900/90 text-white shadow-lg border-b border-slate-700/50 w-full">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between gap-2 h-16 items-center min-w-0">
                    <a href="./" className="flex items-center gap-2 min-w-0 flex-shrink" aria-label="Smartineer Home">
                        <img src="icons/icon.svg" alt="" width="36" height="36"
                             className="w-9 h-9 rounded-xl shadow-lg flex-shrink-0" />
                        <span className="text-base sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent truncate">Smartineer</span>
                    </a>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {items.map(it => {
                            const active = view === it.id;
                            return (
                                <button key={it.id}
                                    onClick={() => setView(it.id)}
                                    className={`nav-btn whitespace-nowrap px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${active
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}`}>
                                    {it.label}
                                </button>
                            );
                        })}
                        <button onClick={onToggleTheme}
                            title={theme === 'dark' ? 'Auf hell umschalten' : 'Auf dunkel umschalten'}
                            aria-label="Farbschema umschalten"
                            className="ml-1 sm:ml-2 whitespace-nowrap px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-slate-600 text-slate-200 hover:bg-slate-700/60 transition">
                            {theme === 'dark' ? 'Hell' : 'Dunkel'}
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

function Dashboard({ data, order, isSolved, onOpenCategory, onReset, onInstall }) {
    const totals = useMemo(() => {
        let total = 0, done = 0;
        order.forEach(k => { const s = categoryStats(data[k], isSolved); total += s.total; done += s.done; });
        const pct = total ? Math.round((done / total) * 100) : 0;
        return { total, done, pct };
    }, [data, order, isSolved]);

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
                        <button onClick={onReset}
                            className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition-all">
                            Fortschritt zurücksetzen
                        </button>
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
        </section>
    );
}

// ---------------------------------------------------------------- Training
function Sidebar({ data, order, currentCat, isSolved, onSelect }) {
    return (
        <aside className="w-full md:w-1/4 flex flex-col gap-2">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wider mb-3 border-b pb-2">Kategorien</h3>
                <div className="flex flex-col gap-1">
                    {order.map(k => {
                        const cat = data[k]; if (!cat) return null;
                        const s = categoryStats(cat, isSolved);
                        const active = k === currentCat;
                        return (
                            <button key={k} onClick={() => onSelect(k)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition border ${active
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 border-transparent'}`}>
                                <div className="flex justify-between items-center gap-2">
                                    <span>{cat.name}</span>
                                    <span className={`text-xs ${s.pct === 100 ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>{s.done}/{s.total}</span>
                                </div>
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

function TaskView({ task, catId, lvl, idx, total, isSolved, onPrev, onNext, onMark }) {
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    useEffect(() => { setShowHint(false); setShowSolution(false); }, [catId, lvl, idx]);

    const ref = useKaTeX([catId, lvl, idx, task && task.q, showHint, showSolution]);
    const solved = isSolved(catId, lvl, idx);

    if (!task) {
        return (
            <div className="text-slate-500 italic">
                Noch keine Aufgaben in diesem Level. Erweitere <code>js/data/{catId}.js</code>.
            </div>
        );
    }

    return (
        <div ref={ref}>
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
                    dangerouslySetInnerHTML={{ __html: task.q }} />
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
                    <div className="text-amber-900 math-block" dangerouslySetInnerHTML={{ __html: task.h }} />
                </div>
            )}
            {showSolution && (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl slide-in">
                    <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3 border-b border-emerald-200 pb-2">Musterlösung &amp; Rechenweg</h4>
                    <div className="text-emerald-900 math-block" dangerouslySetInnerHTML={{ __html: task.s }} />
                </div>
            )}
        </div>
    );
}

function Training({ data, order, isSolved, setSolved, currentCat, setCurrentCat }) {
    const [level, setLevel] = useState(0);
    const [idx, setIdx] = useState(0);
    useEffect(() => { setLevel(0); setIdx(0); }, [currentCat]);

    const cat = data[currentCat];
    const tasks = (cat && cat.levels[level]) || [];
    const task = tasks[idx];

    const next = () => setIdx(i => tasks.length ? (i + 1) % tasks.length : 0);
    const prev = () => setIdx(i => tasks.length ? (i - 1 + tasks.length) % tasks.length : 0);

    const titleRef = useKaTeX([currentCat]);

    return (
        <section className="view-fade flex flex-col md:flex-row gap-6">
            <Sidebar data={data} order={order} currentCat={currentCat} isSolved={isSolved} onSelect={setCurrentCat} />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {order.map(k => {
                        const cat = data[k]; if (!cat) return null;
                        return (
                            <div key={k} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                                <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">{cat.name}</h3>
                                <div className="text-slate-700 math-block" dangerouslySetInnerHTML={{ __html: cat.formulas }} />
                            </div>
                        );
                    })}
                </div>
            )}
            {tab === 'solutions' && (
                <div className="flex flex-col gap-8">
                    {order.map(k => {
                        const cat = data[k]; if (!cat) return null;
                        return (
                            <div key={k} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-4">{cat.name} — Isolierte Musterlösungen</h3>
                                {cat.levels.map((tasks, lvl) => tasks.length === 0 ? null : (
                                    <details key={lvl} className="mb-4" open={lvl === 0}>
                                        <summary className="font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded">
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

function shuffleSample(arr, n) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, Math.min(n, a.length));
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

function Schulungen() {
    const trainings = (window.SCHULUNGEN && window.SCHULUNGEN.list) || [];
    const { state, setLastPage, recordQuiz } = useSchulungenState();
    const [stage, setStage] = useState('index'); // index | chapters | reader | quiz | quizResult
    const [tid, setTid] = useState(null);
    const [cid, setCid] = useState(null);
    const [page, setPage] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);
    const [jumpOpen, setJumpOpen] = useState(false);
    const [quizSet, setQuizSet] = useState([]);
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizSelected, setQuizSelected] = useState(null);

    const readerRef = useKaTeX([stage, tid, cid, page]);
    const quizRef = useKaTeX([stage, quizIdx]);
    const resultRef = useKaTeX([stage, quizAnswers.length]);

    if (!trainings.length) {
        return <section className="view-fade p-8 text-red-700">
            Keine Schulungen geladen. Prüfe <code>js/data/schulung_*.js</code> in <code>index.html</code>.
        </section>;
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
        const sample = shuffleSample(pool, Math.min(10, pool.length));
        setQuizSet(sample); setQuizIdx(0); setQuizAnswers([]); setQuizSelected(null);
        setStage('quiz');
    };

    const submitQuizAnswer = () => {
        if (quizSelected === null) return;
        const item = quizSet[quizIdx];
        const correct = quizSelected === item.correct;
        const next = quizAnswers.concat([{ q: item.q, options: item.options, correct: item.correct, given: quizSelected, ok: correct, explanation: item.explanation }]);
        setQuizAnswers(next);
        setQuizSelected(null);
        if (quizIdx + 1 >= quizSet.length) {
            const score = next.filter(a => a.ok).length;
            recordQuiz(tid, cid, score, quizSet.length);
            setStage('quizResult');
        } else {
            setQuizIdx(quizIdx + 1);
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
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">{tp.chapterCount} Kapitel</span>
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
    if (stage === 'quiz' && training && chapter) {
        const item = quizSet[quizIdx];
        if (!item) { setStage('chapters'); return null; }
        return (
            <section className="view-fade max-w-2xl mx-auto" ref={quizRef}>
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        Frage {quizIdx + 1} von {quizSet.length}
                    </div>
                    <button onClick={() => { if (window.confirm('Quiz abbrechen? Antworten gehen verloren.')) setStage('chapters'); }}
                        className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded transition">Abbrechen</button>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 transition-all duration-500"
                        style={{ width: `${(quizIdx / quizSet.length) * 100}%` }}></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 task-fade" key={quizIdx}>
                    <div className="text-base md:text-lg font-bold text-slate-900 mb-5 math-block"
                        dangerouslySetInnerHTML={{ __html: item.q }} />
                    <div className="flex flex-col gap-2 mb-5">
                        {item.options.map((opt, i) => {
                            const sel = quizSelected === i;
                            return (
                                <button key={i} onClick={() => setQuizSelected(i)}
                                    className={`text-left px-4 py-3 rounded-lg border transition ${sel
                                        ? 'border-blue-500 bg-blue-50 text-blue-900 shadow'
                                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'}`}>
                                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)})</span>
                                    <span dangerouslySetInnerHTML={{ __html: opt }} />
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={submitQuizAnswer} disabled={quizSelected === null}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/30 transition">
                        Antwort bestätigen
                    </button>
                </div>
            </section>
        );
    }

    // ---------- Stage: QuizResult ----------
    if (stage === 'quizResult' && training && chapter) {
        const score = quizAnswers.filter(a => a.ok).length;
        const wrong = quizAnswers.length - score;
        return (
            <section className="view-fade max-w-3xl mx-auto" ref={resultRef}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Quiz-Auswertung</h2>
                    <p className="text-slate-600 mb-6">{training.short || training.name} · {chapter.title}</p>
                    <div className="flex justify-center gap-8 mb-2 flex-wrap">
                        <div><div className="text-5xl font-extrabold text-emerald-600">{score}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">richtig</div></div>
                        <div><div className="text-5xl font-extrabold text-rose-600">{wrong}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">falsch</div></div>
                        <div><div className="text-5xl font-extrabold text-slate-700">{Math.round((score / quizAnswers.length) * 100)}%</div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quote</div></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">Aufgaben im Überblick</h3>
                    <ol className="flex flex-col gap-3">
                        {quizAnswers.map((a, i) => (
                            <li key={i} className={`p-3 rounded-lg border-l-4 ${a.ok ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50'}`}>
                                <div className="font-bold text-slate-800 math-block" dangerouslySetInnerHTML={{ __html: `${i + 1}. ${a.q}` }} />
                                <div className="text-sm mt-2">
                                    Deine Antwort: <strong className={a.ok ? 'text-emerald-700' : 'text-rose-700'}>
                                        {String.fromCharCode(65 + a.given)}) <span dangerouslySetInnerHTML={{ __html: a.options[a.given] }} />
                                    </strong>
                                    {!a.ok && <div className="text-slate-700 mt-1">Richtig: <strong>{String.fromCharCode(65 + a.correct)}) <span dangerouslySetInnerHTML={{ __html: a.options[a.correct] }} /></strong></div>}
                                </div>
                                {a.explanation && <div className="text-xs text-slate-600 mt-2 italic">{a.explanation}</div>}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    <button onClick={startQuiz} className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">Quiz wiederholen</button>
                    <button onClick={() => setStage('reader')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Zurück zum Kapitel</button>
                    <button onClick={() => setStage('chapters')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition">Anderes Kapitel</button>
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

// ---------------------------------------------------------------- App
function App() {
    const data = window.APP_DATA || {};
    const order = (window.APP_ORDER && window.APP_ORDER.length) ? window.APP_ORDER : Object.keys(data);

    const [view, setView] = useState('dashboard');
    const [currentCat, setCurrentCat] = useState(order[0] || null);
    const { isSolved, setSolved, reset } = useProgress();

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

    const onReset = () => {
        if (window.confirm('Wirklich allen lokalen Fortschritt zurücksetzen?')) reset();
    };

    const showInstallButton = !platform.isStandalone && (deferredEvent || platform.isIOS || platform.isAndroid);

    if (!order.length) {
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
                        onOpenCategory={openCategory} onReset={onReset}
                        onInstall={showInstallButton ? () => setInstallOpen(true) : null} />
                )}
                {view === 'training' && (
                    <Training data={data} order={order}
                        isSolved={isSolved} setSolved={setSolved}
                        currentCat={currentCat || order[0]} setCurrentCat={setCurrentCat} />
                )}
                {view === 'cheatsheet' && (
                    <Cheatsheet data={data} order={order} />
                )}
                {view === 'schueler' && (
                    <Schueler />
                )}
                {view === 'schulungen' && (
                    <Schulungen />
                )}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
                <p>Smartineer · Wissen Reloaded © 2026 · Ingenieur-Brain-Update</p>
            </footer>
            <InstallPrompt open={installOpen} onClose={closeInstall}
                deferredEvent={deferredEvent} platform={platform} />
        </>
    );
}

// ---------------------------------------------------------------- Mount
const rootEl = document.getElementById('react-root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
}
