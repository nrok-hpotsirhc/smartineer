function App() {
    const data = window.APP_DATA || {};
    const allOrder = (window.APP_ORDER && window.APP_ORDER.length) ? window.APP_ORDER : Object.keys(data);
    const auth = useAuth();
    const vis = useVisibleCategories(allOrder);
    const order = vis.visibleOrder;

    const readAudienceChoice = () => {
        try {
            const stored = localStorage.getItem(AUDIENCE_KEY);
            return stored === 'schueler' || stored === 'ingenieur' ? stored : null;
        } catch (e) { return null; }
    };
    const initialAudienceChoice = readAudienceChoice();

    const [audienceChoice, setAudienceChoice] = useState(initialAudienceChoice);
    const [audienceDialogOpen, setAudienceDialogOpen] = useState(!initialAudienceChoice);
    const [view, setView] = useState(initialAudienceChoice === 'schueler' ? 'schueler' : 'dashboard');
    const [currentCat, setCurrentCat] = useState(allOrder[0] || null);
    const { isSolved, setSolved, reset } = useProgress();
    // P-LP-SRS-OPEN: SRS-State wird im App-Root gehalten und an Training, Dashboard
    // sowie Schulungen durchgereicht, damit alle Tracks denselben SRS-Storage sehen.
    const { state: srsState, gradeMany: srsGradeMany, reset: resetSRS } = useSRSState();

    // Theme: Default hell. Pre-paint-Skript in index.html setzt die Klasse bereits am <html>,
    // hier wird der State synchron daraus initialisiert und bei Änderung sowohl <html> als auch <body> markiert.
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { return 'light'; }
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
    const [impressumOpen, setImpressumOpen] = useState(false);
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

    const chooseAudience = (choice) => {
        if (choice !== 'schueler' && choice !== 'ingenieur') return;
        try { localStorage.setItem(AUDIENCE_KEY, choice); } catch (e) { /* quota */ }
        setAudienceChoice(choice);
        setAudienceDialogOpen(false);
        setView(choice === 'schueler' ? 'schueler' : 'dashboard');
    };

    const resetAudienceChoice = () => {
        try { localStorage.removeItem(AUDIENCE_KEY); } catch (e) { /* quota */ }
        setAudienceChoice(null);
        setAudienceDialogOpen(true);
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

    // P-UI-DASHBOARD-RESUME: Ein-Klick-Wiedereinstieg in die zuletzt bearbeitete Schulung.
    // Ref puffert {tid, cid}; <Schulungen> konsumiert es per `getInitialOpen()`-Prop beim Mount
    // und springt direkt in den Reader an die gespeicherte `lastPage`.
    const pendingSchulungOpenRef = useRef(null);
    const onResumeSchulung = (tid, cid) => {
        pendingSchulungOpenRef.current = { tid, cid };
        setView('schulungen');
    };
    // Resume-Kandidat: juengste Schulungens-Aktivitaet aus Storage + Schulungs-Liste.
    const resumeCandidate = useMemo(() => computeResumeCandidate(), [view]);

    // P-UI-RESET-ALL: bisher leerte onReset nur den Ingenieurs-Track (STORAGE_KEY).
    // Schulungen-Lesefortschritt, SRS-Karten, Reader-Notizen/Bookmarks und Typografie
    // blieben hingegen liegen — entsprach nicht der User-Erwartung von „Fortschritt
    // zurueecksetzen". Wir leeren jetzt alle persistenten Lern-Tracks (NICHT Theme,
    // NICHT Install-Dismiss, NICHT Auth) und laden anschliessend neu, damit alle
    // Hooks den frischen Storage sehen.
    const onReset = () => {
        const msg = 'Wirklich allen lokalen Fortschritt zuruecksetzen?\n\n'
            + 'Es werden geleert:\n'
            + '  - Trainings-Fortschritt (gelloeste Aufgaben)\n'
            + '  - Schueler-Training-Fortschritt (geloeste Mittelstufen-Aufgaben)\n'
            + '  - Schulungen-Lesefortschritt + Quiz-Bestleistungen + Prufungs-Historie\n'
            + '  - Spaced-Repetition-Karten (alle Tracks)\n'
            + '  - Reader-Notizen, Bookmarks und Typografie-Einstellungen\n\n'
            + 'Theme, Login und der App-Install-Hinweis bleiben erhalten.\n'
            + 'Die App laedt anschliessend neu.';
        if (!window.confirm(msg)) return;
        try {
            reset();           // STORAGE_KEY (Ingenieurs-Track)
            resetSRS();        // SRS_KEY (alle Tracks inkl. __training__)
            localStorage.removeItem(SCHUELER_PROGRESS_KEY);
            localStorage.removeItem(SCHULUNGEN_KEY);
            localStorage.removeItem(READER_NOTES_KEY);
            localStorage.removeItem(READER_BOOKMARKS_KEY);
            localStorage.removeItem(READER_TYPO_KEY);
        } catch (e) { /* quota */ }
        // Reload (timeout, damit React den State-Reset zuerst commiten kann).
        setTimeout(() => { try { window.location.reload(); } catch (e) {} }, 50);
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
                        onResumeSchulung={onResumeSchulung}
                        resumeCandidate={resumeCandidate}
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
                        srsState={srsState} srsGradeMany={srsGradeMany}
                        getInitialOpen={() => {
                            const v = pendingSchulungOpenRef.current;
                            pendingSchulungOpenRef.current = null;
                            return v;
                        }} />
                )}
                {view === 'optionen' && (
                    <Optionen data={data} allOrder={allOrder} vis={vis} auth={auth}
                        onExport={onExport} onImport={onImportClick} onReset={onReset}
                        onInstall={showInstallButton ? () => setInstallOpen(true) : null}
                        installAvailable={!!showInstallButton}
                        audienceChoice={audienceChoice}
                        onSetAudience={chooseAudience}
                        onResetAudience={resetAudienceChoice} />
                )}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
                <p>Smartineer · Wissen Reloaded © 2026 · Ingenieur-Brain-Update · Christoph Korn</p>
                <p className="mt-2">
                    <button onClick={() => setImpressumOpen(true)}
                        className="text-slate-300 hover:text-white underline-offset-2 hover:underline transition">
                        Impressum
                    </button>
                </p>
            </footer>
            <InstallPrompt open={installOpen} onClose={closeInstall}
                deferredEvent={deferredEvent} platform={platform} />
            <AudienceChooser open={audienceDialogOpen} onChoose={chooseAudience} />
            <ImpressumModal open={impressumOpen} onClose={() => setImpressumOpen(false)} />
            <input ref={fileInputRef} type="file" accept="application/json,.json"
                onChange={onImportFile}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                aria-hidden="true" tabIndex={-1} />
        </>
    );
}

function AudienceChooser({ open, onChoose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="audience-title">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-white/70">
                <div className="px-5 sm:px-8 pt-7 pb-5 text-center border-b border-slate-200">
                    <h2 id="audience-title" className="text-3xl sm:text-4xl font-black text-slate-900">Schüler || Ingenieur</h2>
                    <p className="mt-2 text-sm sm:text-base text-slate-600">Wähle deinen Startbereich. Smartineer öffnet danach direkt den passenden Arbeitsmodus.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <button type="button" onClick={() => onChoose('schueler')}
                        className="group min-h-[250px] bg-emerald-600 hover:bg-emerald-700 text-white text-left p-7 sm:p-9 transition focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-inset"
                        aria-label="Schülerbereich starten">
                        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/15 border border-white/30 mb-7 text-white">
                            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 19.5V6.8A2.8 2.8 0 0 1 6.8 4H20v15H7a3 3 0 0 0-3 3" />
                                <path d="M8 8h8" />
                                <path d="M8 12h7" />
                                <path d="M7 19h13" />
                            </svg>
                        </span>
                        <span className="block text-3xl font-black mb-3">Schüler</span>
                        <span className="block text-base leading-relaxed text-emerald-50 max-w-sm">Direkt zum Schülerbereich mit Klassen, Fächern, Abschnittstraining und 10-Fragen-Quiz.</span>
                    </button>
                    <button type="button" onClick={() => onChoose('ingenieur')}
                        className="group min-h-[250px] bg-slate-900 hover:bg-blue-950 text-white text-left p-7 sm:p-9 transition focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-inset"
                        aria-label="Ingenieursbereich starten">
                        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-400/20 border border-amber-200/40 mb-7 text-amber-200">
                            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.05A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.05A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.05A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.05A1.7 1.7 0 0 0 19.4 15Z" />
                            </svg>
                        </span>
                        <span className="block text-3xl font-black mb-3">Ingenieur</span>
                        <span className="block text-base leading-relaxed text-slate-200 max-w-sm">Direkt zum Ingenieurs-Dashboard mit Reaktivierungstraining, Fortschritt und Kategorien.</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------- Mount
const rootEl = document.getElementById('react-root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
}
