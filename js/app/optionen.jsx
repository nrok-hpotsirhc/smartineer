// ---------------------------------------------------------------- Optionen
// Tabs: Konto, Kategorien, Daten (Export/Import + Reset), Store (Skeleton),
// PWA (Install), Admin (nur fuer admin-Rolle).
function Optionen({ data, allOrder, vis, visClasses, allClassIds, classLabels, auth, onExport, onImport, onReset, onInstall, installAvailable, audienceChoice, onSetAudience, onResetAudience }) {
    const [tab, setTab] = useState('konto');
    // P-UI-RESTRUCTURE (v85): Klassen-Tab nur fuer Schueler-Audience sichtbar.
    const tabs = [
        { id: 'start',      label: 'Startbereich' },
        { id: 'konto',      label: 'Konto' },
        { id: 'kategorien', label: 'Kategorien' }
    ];
    if (audienceChoice === 'schueler') tabs.push({ id: 'klassen', label: 'Klassen' });
    tabs.push(
        { id: 'daten',      label: 'Daten' },
        { id: 'store',      label: 'Store' },
        { id: 'pwa',        label: 'App-Installation' }
    );
    if (auth.isAdmin) tabs.push({ id: 'admin', label: 'Admin' });

    return (
        <section className="view-fade max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Einstellungen</h1>
                <p className="text-slate-600 text-sm">Konto, Bereich, sichtbare Kategorien / Klassen, Daten-Sync, App-Installation.</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-200">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`px-4 py-2 text-sm font-bold border-b-2 transition ${tab === t.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'start' && <OptionenStartbereich audienceChoice={audienceChoice} onSetAudience={onSetAudience} onResetAudience={onResetAudience} />}
            {tab === 'konto' && <OptionenKonto auth={auth} />}
            {tab === 'kategorien' && <OptionenKategorien data={data} allOrder={allOrder} vis={vis} />}
            {tab === 'klassen' && <OptionenKlassen allClassIds={allClassIds} classLabels={classLabels} visClasses={visClasses} />}
            {tab === 'daten' && <OptionenDaten onExport={onExport} onImport={onImport} onReset={onReset} />}
            {tab === 'store' && <OptionenStore auth={auth} />}
            {tab === 'pwa' && <OptionenPwa onInstall={onInstall} installAvailable={installAvailable} />}
            {tab === 'admin' && auth.isAdmin && <OptionenAdmin auth={auth} vis={vis} />}
        </section>
    );
}

// ---------------------------------------------------------------- OptionenKlassen (P-UI-RESTRUCTURE, v85)
// Klassenfilter fuer den Schueler-Track: gleiches Pattern wie OptionenKategorien,
// aber pro Klasse (k1..k10). Persistiert in VISIBLE_CLASSES_KEY ueber useVisibleClasses.
function OptionenKlassen({ allClassIds, classLabels, visClasses }) {
    if (!visClasses) return null;
    const labelOf = (id) => {
        const c = (classLabels || []).find(x => x.id === id);
        return c ? c.label : id;
    };
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Sichtbare Klassen</h2>
            <p className="text-sm text-slate-600 mb-4">Wähle, welche Klassenstufen im Schülerbereich und im Schüler-Dashboard angezeigt werden.</p>
            <div className="flex flex-wrap gap-2 mb-3">
                <button onClick={() => visClasses.setSelection(allClassIds.slice())}
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition">Alle anzeigen</button>
                <button onClick={visClasses.reset}
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition">Standard wiederherstellen</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(allClassIds || []).map(id => {
                    const visible = visClasses.isVisible(id);
                    return (
                        <label key={id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${visible ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                            <input type="checkbox" checked={visible} onChange={() => visClasses.toggle(id)}
                                className="w-4 h-4 accent-blue-600" />
                            <span className="text-sm font-bold text-slate-800">{labelOf(id)}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

function OptionenStartbereich({ audienceChoice, onSetAudience, onResetAudience }) {
    const current = audienceChoice === 'schueler' ? 'Schüler' : audienceChoice === 'ingenieur' ? 'Ingenieur' : 'Noch nicht gewählt';
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Startbereich</h3>
            <p className="text-sm text-slate-600 mb-4">Aktuelle Auswahl: <strong>{current}</strong>. Die Auswahl bestimmt, wohin Smartineer beim ersten Betreten direkt springt.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => onSetAudience('schueler')}
                    className={`text-left rounded-xl border p-5 transition ${audienceChoice === 'schueler' ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-slate-50 hover:bg-emerald-50'}`}>
                    <span className="flex items-center gap-3 mb-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 19.5V6.8A2.8 2.8 0 0 1 6.8 4H20v15H7a3 3 0 0 0-3 3" />
                                <path d="M8 8h8" />
                                <path d="M8 12h7" />
                            </svg>
                        </span>
                        <span className="text-base font-black text-slate-900">Schüler</span>
                    </span>
                    <span className="text-sm text-slate-600">Beim Start direkt in Klassen- und Fachauswahl wechseln.</span>
                </button>
                <button type="button" onClick={() => onSetAudience('ingenieur')}
                    className={`text-left rounded-xl border p-5 transition ${audienceChoice === 'ingenieur' ? 'border-blue-600 bg-blue-50 text-blue-950' : 'border-slate-200 bg-slate-50 hover:bg-blue-50'}`}>
                    <span className="flex items-center gap-3 mb-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-amber-200">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.05A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.05A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.05A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.05A1.7 1.7 0 0 0 19.4 15Z" />
                            </svg>
                        </span>
                        <span className="text-base font-black text-slate-900">Ingenieur</span>
                    </span>
                    <span className="text-sm text-slate-600">Beim Start direkt das Ingenieurs-Dashboard öffnen.</span>
                </button>
            </div>
            <button type="button" onClick={onResetAudience}
                className="mt-4 px-4 py-2 text-sm font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg transition">
                Auswahl zurücksetzen
            </button>
        </div>
    );
}

function OptionenKonto({ auth }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState(null);
    const submit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const r = auth.login(user.trim(), pass.trim());
        if (r.ok) { setUser(''); setPass(''); setErr(null); }
        else setErr(r.error || 'Anmeldung fehlgeschlagen.');
    };
    if (auth.disabled) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Login temporaer deaktiviert</h3>
                <p className="text-sm text-slate-600 mb-3">Der Schulungen-Bereich ist voruebergehend ohne Anmeldung nutzbar. Die Reaktivierung ist als Arbeitspaket <code>P-UI-LOGIN-REACTIVATE</code> in <code>WORKPACKAGES.md</code> vermerkt.</p>
                <p className="text-xs text-slate-400">Hinweis: Auch nach Reaktivierung bleibt diese Frontend-Only-Anmeldung nur eine UX-Hilfe und kein echter Schutz.</p>
            </div>
        );
    }
    if (auth.session) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Angemeldet</h3>
                <p className="text-sm text-slate-700 mb-1">Benutzer: <strong>{auth.session.user}</strong> ({auth.session.role})</p>
                <p className="text-xs text-slate-500 mb-4">Sitzung gueltig bis {new Date(auth.session.expires).toLocaleString()}.</p>
                <button onClick={auth.logout}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-5 rounded-lg shadow transition">Abmelden</button>
                <p className="text-xs text-slate-400 mt-4">Hinweis: Die Anmeldung dient allein der Zugangs-Bequemlichkeit, nicht der Sicherheit. Credentials liegen client-seitig in <code>js/auth-credentials.js</code>.</p>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Anmelden</h3>
            <p className="text-sm text-slate-600 mb-4">Notwendig nur fuer den Schulungen-Bereich. Dashboard, Training, Cheatsheets und Schueler-Bereich sind ohne Anmeldung nutzbar.</p>
            {/* {auth.configured && (
                <div className="bg-blue-50 border border-blue-200 text-blue-900 text-sm p-3 rounded-lg mb-4">
                    Default-Zugangsdaten (siehe <code>js/auth-credentials.js</code>): <strong>admin / admin</strong> oder <strong>user / user</strong>. Lokal in <code>js/auth-credentials.js</code> anpassen.
                </div>
            )} */}
            {!auth.configured && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm p-3 rounded-lg mb-4">
                    Auth-Konfiguration fehlt: <code>js/auth-credentials.js</code> nicht geladen. Beispiel siehe <code>js/auth-credentials.example.js</code>.
                </div>
            )}
            <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm">
                <label className="flex flex-col gap-1 text-sm">
                    <span className="font-bold text-slate-700">Benutzername</span>
                    <input type="text" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white text-slate-800" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                    <span className="font-bold text-slate-700">Passwort</span>
                    <input type="password" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white text-slate-800" />
                </label>
                {err && <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded p-2">{err}</div>}
                <button type="submit" disabled={!auth.configured || !user.trim() || !pass}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg shadow transition w-fit">
                    Anmelden
                </button>
            </form>
        </div>
    );
}

function OptionenKategorien({ data, allOrder, vis }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Sichtbare Kategorien</h3>
            <p className="text-sm text-slate-600 mb-4">Deaktivierte Kategorien verschwinden aus Dashboard, Training, Cheatsheet und Radar. Aufgaben-Fortschritt bleibt erhalten und kommt zurueck, sobald du eine Kategorie wieder einblendest.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allOrder.map(k => {
                    const cat = data[k]; if (!cat) return null;
                    const visible = vis.isVisible(k);
                    return (
                        <label key={k} className={`flex items-start gap-3 px-3 py-2 rounded-lg border cursor-pointer transition ${visible ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200 bg-slate-50'}`}>
                            <input type="checkbox" className="mt-1" checked={visible} onChange={() => vis.toggle(k)} />
                            <div className="min-w-0">
                                <div className="font-bold text-slate-800 text-sm">{cat.name}</div>
                                <div className="text-xs text-slate-500 line-clamp-2">{cat.desc}</div>
                            </div>
                        </label>
                    );
                })}
            </div>
            <button onClick={vis.reset}
                className="mt-4 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition">Alle einblenden</button>
        </div>
    );
}

function OptionenDaten({ onExport, onImport, onReset }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Lernfortschritt</h3>
            <p className="text-sm text-slate-600 mb-4">Geraeteuebergreifender Abgleich ueber portable JSON-Datei. Theme und Anmeldung werden bewusst nicht exportiert (geraete-spezifisch).</p>
            <div className="flex flex-wrap gap-3">
                <button onClick={onExport}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-5 rounded-lg transition">Fortschritt exportieren</button>
                <button onClick={onImport}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2 px-5 rounded-lg transition">Fortschritt importieren</button>
                <button onClick={onReset}
                    className="bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold py-2 px-5 rounded-lg transition">Fortschritt zuruecksetzen</button>
            </div>
        </div>
    );
}

function OptionenStore({ auth }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Store — Kategorien &amp; Schulungen freischalten</h3>
            <p className="text-sm text-slate-600 mb-4">Geplante Funktion: hier wirst du in Zukunft zusaetzliche Kategorien und Schulungen freischalten oder eigene zur Aufnahme vorschlagen koennen. Das Backend dafuer ist noch nicht implementiert &mdash; Smartineer ist eine reine Static-Site (siehe AGENTS.md §1).</p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 space-y-2">
                <div><strong>Status:</strong> Skeleton / Coming Soon</div>
                <div><strong>Geplant:</strong></div>
                <ul className="list-disc list-inside text-slate-600 ml-2">
                    <li>Freischalt-Codes fuer proprietaere Kategorien (lokal validiert).</li>
                    <li>User-Vorschlag fuer neue Kategorie / Schulung (per Mailto-Link, kein Backend).</li>
                    <li>Optional: Anbindung an einen Static-File-Manifest mit signierten Modulen.</li>
                </ul>
                <div className="text-xs text-slate-500 mt-2">Hinweis: Da Smartineer kein Backend hat, ist eine echte Bezahlung/Lizenzierung nur mit zusaetzlicher Infrastruktur moeglich. Dies waere eine Architektur-Aenderung und muss vorher diskutiert werden (siehe AGENTS.md §1).</div>
            </div>
            <a href="mailto:?subject=Smartineer%20Store%20-%20Vorschlag&body=Bitte%20beschreibe%20deinen%20Wunsch%20fuer%20eine%20neue%20Kategorie%20oder%20Schulung."
                className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow text-sm hover:shadow-lg transition">
                Vorschlag per E-Mail senden
            </a>
            {!auth.disabled && !auth.session && (
                <p className="text-xs text-slate-400 mt-4">Hinweis: Spaeter wird der Store an dein Konto gekoppelt sein.</p>
            )}
        </div>
    );
}

function OptionenPwa({ onInstall, installAvailable }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">App-Installation</h3>
            <p className="text-sm text-slate-600 mb-4">Smartineer ist eine PWA und kann auf Smartphone, Tablet und Desktop wie eine native App installiert werden. Service Worker speichert die App-Shell offline.</p>
            <button onClick={onInstall} disabled={!installAvailable}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-lg shadow transition">
                Als App installieren
            </button>
            {!installAvailable && (
                <p className="text-xs text-slate-500 mt-3">Smartineer ist bereits installiert oder dein Browser unterstuetzt keine PWA-Installation.</p>
            )}
        </div>
    );
}

function OptionenAdmin({ auth }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Admin</h3>
            <p className="text-sm text-slate-600 mb-2">Eingeloggt als <strong>{auth.session.user}</strong> (admin).</p>
            <p className="text-sm text-slate-500">Reservierter Bereich fuer kuenftige globale Konfigurationen (Default-Sichtbarkeit von Kategorien, Store-Manifest-URL, Auth-Defaults). Aktuell keine Aktionen verfuegbar.</p>
        </div>
    );
}

// ---------------------------------------------------------------- App
