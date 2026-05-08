/*
 * Smartineer — React-App (JSX, in-browser via Babel-standalone, kein Build-Schritt).
 * Daten kommen aus js/data/<id>.js (legen window.APP_DATA und window.APP_ORDER an).
 */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

const STORAGE_KEY = 'wissen_reloaded_progress_v1';
const INSTALL_DISMISS_KEY = 'smartineer_install_dismissed_v1';

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
function Nav({ view, setView }) {
    const items = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'training', label: 'Training' },
        { id: 'cheatsheet', label: 'Cheatsheets' }
    ];
    return (
        <nav className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/90 text-white shadow-lg border-b border-slate-700/50 w-full">
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
                                    className={`nav-btn whitespace-nowrap px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${active
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}`}>
                                    {it.label}
                                </button>
                            );
                        })}
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
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">Willkommen zurück, Ingenieur.</h1>
                <p className="text-base md:text-lg text-slate-600">Reaktiviere systematisch dein Wissen in {order.length} Kategorien. Jede gelöste Aufgabe füllt das Wissensradar — Fortschritt wird lokal gespeichert.</p>
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
            <Nav view={view} setView={setView} />
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
