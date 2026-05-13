// ---------------------------------------------------------------- Ingenieurbereich (P-UI-RESTRUCTURE, v85)
// Wrapper-Component, die den frueheren separaten Top-Level-Views fuer Training,
// Cheatsheets und Schulungen einen gemeinsamen Container gibt. Sub-Tab-State wird
// lokal gehalten und durch Props gesteuert, damit Dashboard-Links und Resume-Hooks
// gezielt einen Sub-Bereich oeffnen koennen.
function Ingenieur({
    data, order, allOrder, isSolved, setSolved,
    srsState, srsGradeMany,
    auth,
    currentCat, setCurrentCat,
    initialLevel, initialIdx, consumeInitialPos,
    subview, setSubview,
    schulungenGetInitialOpen,
    onGoToOptionen,
    progressMap, resetCategory, resetTrainingSrsCategory
}) {
    const tabs = [
        { id: 'training',   label: 'Training' },
        { id: 'cheatsheet', label: 'Cheatsheets' },
        { id: 'schulungen', label: 'Schulungen' }
    ];

    return (
        <section className="view-fade ingenieur-shell">
            <div className="mb-5 -mt-2">
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200">
                    {tabs.map(t => {
                        const active = subview === t.id;
                        return (
                            <button key={t.id}
                                onClick={() => setSubview(t.id)}
                                aria-current={active ? 'page' : undefined}
                                className={`px-4 py-2 text-sm font-bold border-b-2 transition ${active
                                    ? 'border-blue-600 text-blue-700'
                                    : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {subview === 'training' && (
                <Training data={data} order={order}
                    isSolved={isSolved} setSolved={setSolved}
                    srsState={srsState} srsGradeMany={srsGradeMany}
                    currentCat={(order.includes(currentCat) ? currentCat : order[0])} setCurrentCat={setCurrentCat}
                    initialLevel={initialLevel}
                    initialIdx={initialIdx}
                    consumeInitialPos={consumeInitialPos}
                    progressMap={progressMap}
                    resetCategory={resetCategory}
                    resetTrainingSrsCategory={resetTrainingSrsCategory}
                />
            )}
            {subview === 'cheatsheet' && (
                <Cheatsheet data={data} order={order} />
            )}
            {subview === 'schulungen' && (
                <Schulungen auth={auth} onGoToOptionen={onGoToOptionen}
                    srsState={srsState} srsGradeMany={srsGradeMany}
                    getInitialOpen={schulungenGetInitialOpen} />
            )}
        </section>
    );
}
