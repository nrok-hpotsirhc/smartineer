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
