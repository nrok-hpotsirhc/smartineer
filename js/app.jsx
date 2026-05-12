function App() {
    const data = window.APP_DATA || {};
    const allOrder = (window.APP_ORDER && window.APP_ORDER.length) ? window.APP_ORDER : Object.keys(data);
    // P-ARCH-PROFILES (v84): aktives Profil muss vor jedem Lernschritt gesetzt sein.
    // Die ProfileGate blockiert die App vollstaendig, solange keines aktiv ist.
    const [activeProfileId, setActiveProfileId] = useState(() => getActiveProfileId());
    const [profileSwitcherOpen, setProfileSwitcherOpen] = useState(false);
    const handlePickProfile = useCallback((pid) => {
        if (!PROFILE_IDS.includes(pid)) return;
        const prev = getActiveProfileId();
        if (prev === pid) {
            setProfileSwitcherOpen(false);
            return;
        }
        // Erstmaliger Pick und live-Daten vorhanden -> adoptieren (Legacy-Migration).
        if (!prev && hasAnyLiveScopedData()) {
            const useExisting = window.confirm(
                'Es liegt bereits Lernfortschritt auf diesem Geraet vor. '
                + 'Diesen Fortschritt dem Profil "' + (getProfileById(pid)?.name || pid) + '" zuordnen?\n\n'
                + 'OK = uebernehmen (empfohlen, kein Datenverlust).\n'
                + 'Abbrechen = leeres Profil starten (vorhandener Fortschritt bleibt nicht zugeordnet im Speicher liegen).'
            );
            if (useExisting) {
                adoptLiveAsProfile(pid);
                setActiveProfileId(pid);
                setProfileSwitcherOpen(false);
                setTimeout(() => { try { window.location.reload(); } catch (e) {} }, 30);
                return;
            }
        }
        switchToProfile(pid, prev);
        setActiveProfileId(pid);
        setProfileSwitcherOpen(false);
        setTimeout(() => { try { window.location.reload(); } catch (e) {} }, 30);
    }, []);
    const handleWipeProfile = useCallback((pid) => {
        if (!PROFILE_IDS.includes(pid)) return;
        const p = getProfileById(pid);
        if (!window.confirm('Profil "' + (p?.name || pid) + '" inklusive Lernfortschritt wirklich loeschen?\n\n'
            + 'Theme, Login und der App-Install-Hinweis bleiben erhalten.\n'
            + 'Die App laedt anschliessend neu.')) return;
        const wasActive = getActiveProfileId() === pid;
        wipeProfileData(pid);
        if (wasActive) { try { localStorage.removeItem(PROFILES_ACTIVE_KEY); } catch (e) {} setActiveProfileId(null); }
        setTimeout(() => { try { window.location.reload(); } catch (e) {} }, 30);
    }, []);

    const auth = useAuth();
    const vis = useVisibleCategories(allOrder);
    const order = vis.visibleOrder;
    // P-UI-RESTRUCTURE (v85): Schueler-Klassenfilter parallel zu Kategoriefilter.
    // K1..K10 sind die fixen Slot-IDs der Schueler-Datenstruktur.
    const ALL_CLASS_IDS = ['k1','k2','k3','k4','k5','k6','k7','k8','k9','k10'];
    const visClasses = useVisibleClasses(ALL_CLASS_IDS);

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
    // P-UI-RESTRUCTURE (v85): Sub-Tab innerhalb des Ingenieurbereich-Wrappers.
    const [ingenieurSub, setIngenieurSub] = useState('training');
    // P-UI-INTERESTS (v85): Multi-Select-Picker fuer Kategorien/Klassen.
    const [interestPicker, setInterestPicker] = useState(null); // null | 'ingenieur' | 'schueler'
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
        // P-UI-INTERESTS (v85): Beim ersten Audience-Pick (oder nach Reset) Interessen abfragen.
        if (!isInterestsPicked()) setInterestPicker(choice);
    };

    const resetAudienceChoice = () => {
        try { localStorage.removeItem(AUDIENCE_KEY); } catch (e) { /* quota */ }
        setAudienceChoice(null);
        setAudienceDialogOpen(true);
        // Auch Interessen zuruecksetzen, damit der naechste Audience-Pick wieder fragt.
        clearInterestsPicked();
    };

    const openCategory = (k, targetView) => {
        setCurrentCat(k);
        // P-UI-RESTRUCTURE (v85): Training/Cheatsheets sind jetzt Sub-Views des Ingenieurbereichs.
        if (targetView === 'training' || targetView === 'cheatsheet') {
            setIngenieurSub(targetView);
            setView('ingenieur');
        } else if (targetView) {
            setView(targetView);
        }
    };

    // P-LP-DAILY-MIX: oeffnet eine Trainings-Aufgabe an genauer (catId, level, idx)-
    // Position. Die Position wird in einem Ref zwischengepuffert; <Training> liest
    // sie beim Mount oder bei catId-Wechsel ueber `initialLevel`/`initialIdx` und
    // ruft anschliessend consumeInitialPos() auf.
    const pendingTrainingPosRef = useRef(null);
    const openTrainingAt = (catId, level, idx) => {
        pendingTrainingPosRef.current = { level, idx };
        setCurrentCat(catId);
        setIngenieurSub('training');
        setView('ingenieur');
    };

    // P-UI-DASHBOARD-RESUME: Ein-Klick-Wiedereinstieg in die zuletzt bearbeitete Schulung.
    // Ref puffert {tid, cid}; <Schulungen> konsumiert es per `getInitialOpen()`-Prop beim Mount
    // und springt direkt in den Reader an die gespeicherte `lastPage`.
    const pendingSchulungOpenRef = useRef(null);
    const onResumeSchulung = (tid, cid) => {
        pendingSchulungOpenRef.current = { tid, cid };
        setIngenieurSub('schulungen');
        setView('ingenieur');
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

    // P-ARCH-PROFILES: ProfileGate blockiert die App, bis ein Profil aktiv ist.
    if (!activeProfileId) {
        return <ProfileGate onPick={handlePickProfile} onWipe={handleWipeProfile} />;
    }

    const activeProfile = getProfileById(activeProfileId);

    return (
        <>
            <Nav view={view} setView={setView} theme={theme} onToggleTheme={toggleTheme}
                activeProfile={activeProfile}
                onOpenProfileSwitcher={() => setProfileSwitcherOpen(true)} />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {view === 'dashboard' && audienceChoice === 'schueler' && (
                    <SchuelerDashboard
                        activeProfile={activeProfile}
                        visibleClassIds={visClasses.visibleClasses}
                        onOpenSchueler={() => setView('schueler')}
                        onGoToOptionen={() => setView('optionen')}
                        onReset={null} onExport={null} onImport={null} onInstall={null} />
                )}
                {view === 'dashboard' && audienceChoice !== 'schueler' && (
                    <Dashboard data={data} order={order} isSolved={isSolved}
                        srsState={srsState}
                        onOpenCategory={openCategory} onOpenTrainingAt={(catId, level, idx) => openTrainingAt(catId, level, idx)}
                        onResumeSchulung={onResumeSchulung}
                        resumeCandidate={resumeCandidate}
                        onReset={null}
                        onExport={null} onImport={null}
                        onInstall={null} />
                )}
                {view === 'ingenieur' && (
                    <Ingenieur data={data} order={order} allOrder={allOrder}
                        isSolved={isSolved} setSolved={setSolved}
                        srsState={srsState} srsGradeMany={srsGradeMany}
                        auth={auth}
                        currentCat={(order.includes(currentCat) ? currentCat : order[0])} setCurrentCat={setCurrentCat}
                        initialLevel={pendingTrainingPosRef.current ? pendingTrainingPosRef.current.level : null}
                        initialIdx={pendingTrainingPosRef.current ? pendingTrainingPosRef.current.idx : null}
                        consumeInitialPos={() => { pendingTrainingPosRef.current = null; }}
                        subview={ingenieurSub} setSubview={setIngenieurSub}
                        schulungenGetInitialOpen={() => {
                            const v = pendingSchulungOpenRef.current;
                            pendingSchulungOpenRef.current = null;
                            return v;
                        }}
                        onGoToOptionen={() => setView('optionen')} />
                )}
                {view === 'schueler' && (
                    <Schueler visibleClassIds={visClasses.visibleClasses} />
                )}
                {view === 'schulungen' && (
                    // P-UI-RESTRUCTURE (v85): Direct-Routes auf 'schulungen' werden in den
                    // Ingenieurbereich umgeleitet. Diese Branch existiert nur als Fallback fuer
                    // alte tiefe Links/State und faechert sofort auf den Wrapper auf.
                    <Ingenieur data={data} order={order} allOrder={allOrder}
                        isSolved={isSolved} setSolved={setSolved}
                        srsState={srsState} srsGradeMany={srsGradeMany}
                        auth={auth}
                        currentCat={(order.includes(currentCat) ? currentCat : order[0])} setCurrentCat={setCurrentCat}
                        initialLevel={null} initialIdx={null}
                        consumeInitialPos={() => {}}
                        subview='schulungen' setSubview={(s) => { setIngenieurSub(s); setView('ingenieur'); }}
                        schulungenGetInitialOpen={() => {
                            const v = pendingSchulungOpenRef.current;
                            pendingSchulungOpenRef.current = null;
                            return v;
                        }}
                        onGoToOptionen={() => setView('optionen')} />
                )}
                {view === 'optionen' && (
                    <Optionen data={data} allOrder={allOrder} vis={vis} visClasses={visClasses}
                        allClassIds={ALL_CLASS_IDS} classLabels={(window.SCHUELER && window.SCHUELER.classes) || []}
                        auth={auth}
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
            <InterestPicker open={!!interestPicker} audience={interestPicker}
                data={data} allOrder={allOrder}
                allClassIds={ALL_CLASS_IDS} classLabels={(window.SCHUELER && window.SCHUELER.classes) || []}
                vis={vis} visClasses={visClasses}
                onSubmit={() => { markInterestsPicked(); setInterestPicker(null); }}
                onSkip={() => { markInterestsPicked(); setInterestPicker(null); }} />
            <ImpressumModal open={impressumOpen} onClose={() => setImpressumOpen(false)} />
            <ProfileSwitcher open={profileSwitcherOpen} activeId={activeProfileId}
                onClose={() => setProfileSwitcherOpen(false)}
                onPick={handlePickProfile} onWipe={handleWipeProfile} />
            <input ref={fileInputRef} type="file" accept="application/json,.json"
                onChange={onImportFile}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                aria-hidden="true" tabIndex={-1} />
        </>
    );
}

// ---------------------------------------------------------------- InterestPicker (P-UI-INTERESTS, v85)
// Multi-Select-Modal nach dem Audience-Pick. Ingenieurs-Pfad zeigt alle Kategorien
// (window.APP_DATA), Schueler-Pfad zeigt alle 10 Klassen (window.SCHUELER.classes).
// Die Auswahl wird in `vis.setSelection(...)` bzw. `visClasses.setSelection(...)`
// uebergeben und im Profil-Storage persistiert. "Ueberspringen" akzeptiert den
// Default (alle sichtbar). AGENTS §10/§12: keine Emojis, nur Text/SVG.
function InterestPicker({ open, audience, data, allOrder, allClassIds, classLabels, vis, visClasses, onSubmit, onSkip }) {
    const isSchueler = audience === 'schueler';
    const allIds = isSchueler ? (allClassIds || []) : (allOrder || []);
    const [picked, setPicked] = useState(() => new Set(allIds));
    useEffect(() => {
        if (!open) return;
        // Vor-Auswahl aus aktuell sichtbaren IDs befuellen, damit nachtraegliche Pflege Sinn ergibt.
        const current = isSchueler ? (visClasses ? visClasses.visibleClasses : allIds)
                                   : (vis ? vis.visibleOrder : allIds);
        setPicked(new Set(current && current.length ? current : allIds));
    }, [open, audience]);
    if (!open) return null;

    const toggle = (id) => {
        const next = new Set(picked);
        if (next.has(id)) next.delete(id); else next.add(id);
        setPicked(next);
    };
    const selectAll = () => setPicked(new Set(allIds));
    const selectNone = () => setPicked(new Set());

    const submit = () => {
        const arr = allIds.filter(id => picked.has(id));
        // Defensive: leere Auswahl waere ein toter Bildschirm — wir akzeptieren leer als
        // "alle sichtbar" (analog zur useVisibleX-Konvention).
        const payload = arr.length ? arr : allIds.slice();
        if (isSchueler && visClasses) visClasses.setSelection(payload);
        if (!isSchueler && vis) vis.setSelection(payload);
        onSubmit && onSubmit();
    };

    const title = isSchueler ? 'Welche Klassen interessieren dich?' : 'Welche Kategorien interessieren dich?';
    const sub = isSchueler
        ? 'Wähle eine oder mehrere Klassen. Du kannst die Auswahl jederzeit in den Einstellungen anpassen.'
        : 'Wähle die Themengebiete, die du reaktivieren willst. Du kannst die Auswahl jederzeit in den Einstellungen anpassen.';

    const items = isSchueler
        ? allClassIds.map(id => {
            const cls = (classLabels || []).find(c => c.id === id);
            return { id, label: cls ? cls.label : id, desc: cls ? ((cls.subjects || []).length + ' Fächer') : '' };
        })
        : allOrder.map(id => {
            const cat = data[id];
            return { id, label: cat ? cat.name : id, desc: cat ? (cat.desc || '') : '' };
        });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="interest-title">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl border border-white/70 flex flex-col">
                <div className="px-5 sm:px-7 pt-6 pb-4 border-b border-slate-200">
                    <h2 id="interest-title" className="text-2xl sm:text-3xl font-black text-slate-900">{title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{sub}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <button onClick={selectAll} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition">Alle auswählen</button>
                        <button onClick={selectNone} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition">Keine</button>
                        <span className="ml-auto text-slate-500 self-center">{picked.size} / {allIds.length} ausgewählt</span>
                    </div>
                </div>
                <div className="px-5 sm:px-7 py-4 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {items.map(it => {
                            const checked = picked.has(it.id);
                            return (
                                <label key={it.id}
                                    className={`flex items-start gap-3 px-3 py-2 rounded-lg border cursor-pointer transition ${checked
                                        ? 'border-blue-400 bg-blue-50'
                                        : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                                    <input type="checkbox" checked={checked} onChange={() => toggle(it.id)}
                                        className="mt-1 w-4 h-4 accent-blue-600" />
                                    <span className="flex-1 min-w-0">
                                        <span className="block text-sm font-bold text-slate-800">{it.label}</span>
                                        {it.desc && <span className="block text-xs text-slate-500 mt-0.5 line-clamp-2">{it.desc}</span>}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div className="px-5 sm:px-7 py-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end bg-slate-50">
                    <button onClick={onSkip}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition">
                        Überspringen
                    </button>
                    <button onClick={submit}
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold shadow-md transition">
                        Weiter
                    </button>
                </div>
            </div>
        </div>
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

// ---------------------------------------------------------------- Profile (P-ARCH-PROFILES, v84)
function ProfileTile({ profile, used, lastUsed, isActive, onPick, onWipe, large }) {
    const sizeCls = large ? 'min-h-[210px] sm:min-h-[260px] p-6 sm:p-8' : 'min-h-[180px] p-5';
    const symbolCls = large ? 'text-7xl sm:text-8xl' : 'text-6xl';
    return (
        <div className={'profile-tile relative rounded-2xl shadow-lg overflow-hidden border-4 ' + sizeCls
            + (isActive ? ' ring-4 ring-offset-2 ring-white/80 border-white' : ' border-white/30 hover:border-white/60')}
            style={{ backgroundColor: profile.bg, color: profile.fg }}>
            <button type="button"
                onClick={() => onPick(profile.id)}
                className="w-full h-full flex flex-col items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-white/60 rounded-xl"
                aria-label={'Profil ' + profile.name + ' (' + profile.desc + ') waehlen'}>
                <span className={symbolCls + ' font-serif leading-none drop-shadow-md'} aria-hidden="true">{profile.symbol}</span>
                <span className="text-lg sm:text-xl font-extrabold tracking-wide uppercase">{profile.name}</span>
                <span className="text-xs sm:text-sm opacity-90">{profile.desc}</span>
                {used && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/25 text-[10px] sm:text-xs font-bold backdrop-blur-sm border border-white/40">
                        Fortschritt vorhanden
                    </span>
                )}
                {isActive && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white text-slate-900 text-[10px] sm:text-xs font-extrabold">
                        AKTIV
                    </span>
                )}
            </button>
            {used && onWipe && (
                <button type="button" onClick={(e) => { e.stopPropagation(); onWipe(profile.id); }}
                    className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/30 hover:bg-black/50 text-white text-[10px] sm:text-xs font-medium border border-white/30"
                    aria-label={'Profil ' + profile.name + ' loeschen'}>
                    Löschen
                </button>
            )}
        </div>
    );
}

function ProfileGate({ onPick, onWipe }) {
    const meta = getProfileMeta();
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4 py-8">
            <div className="w-full max-w-6xl">
                <header className="text-center mb-8">
                    <img src="icons/smartineer-logo.png" alt="Smartineer" width="64" height="64" className="mx-auto w-16 h-16 mb-3" />
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Wer lernt heute?
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                        Smartineer haelt bis zu fuenf eigenstaendige Lernfortschritte auf diesem Geraet.
                        Waehle ein Profil, um zu starten. Der Wechsel ist jederzeit ueber das Wechselsymbol oben rechts moeglich.
                    </p>
                </header>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                    {PROFILES.map(p => (
                        <ProfileTile key={p.id} profile={p}
                            used={!!(meta[p.id] && meta[p.id].used)}
                            lastUsed={meta[p.id] && meta[p.id].lastUsed}
                            isActive={false}
                            large={true}
                            onPick={onPick} onWipe={onWipe} />
                    ))}
                </div>
                <p className="mt-6 text-center text-xs text-slate-400">
                    Hinweis: Profile sind nur lokal auf diesem Geraet (kein Server, keine Anmeldung).
                    Theme und PWA-Einstellungen bleiben geraetewerter Bestandteil; sie werden nicht je Profil getrennt.
                </p>
            </div>
        </div>
    );
}

function ProfileSwitcher({ open, activeId, onClose, onPick, onWipe }) {
    if (!open) return null;
    const meta = getProfileMeta();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6"
            role="dialog" aria-modal="true" aria-labelledby="profile-switch-title"
            onClick={onClose}>
            <div className="w-full max-w-5xl rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 overflow-hidden"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-700">
                    <h2 id="profile-switch-title" className="text-xl sm:text-2xl font-bold">Profil wechseln</h2>
                    <button onClick={onClose}
                        className="text-slate-300 hover:text-white text-2xl leading-none px-2"
                        aria-label="Dialog schliessen">×</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 p-5 sm:p-7">
                    {PROFILES.map(p => (
                        <ProfileTile key={p.id} profile={p}
                            used={!!(meta[p.id] && meta[p.id].used)}
                            lastUsed={meta[p.id] && meta[p.id].lastUsed}
                            isActive={activeId === p.id}
                            large={false}
                            onPick={onPick} onWipe={onWipe} />
                    ))}
                </div>
                <p className="px-5 sm:px-7 pb-5 text-xs text-slate-400">
                    Beim Wechsel wird der aktuelle Stand des aktiven Profils gespeichert. Die App laedt anschliessend neu.
                </p>
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
