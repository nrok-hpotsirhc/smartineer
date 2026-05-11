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
                    <img src="icons/smartineer-logo.png" alt="" width="48" height="48" className="w-12 h-12" />
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

// ---------------------------------------------------------------- Impressum
// TMG §5 / DSG-VVO-konformes Impressum-Modal. Reine Anbieter-Kennzeichnung,
// kein Tracking, keine Datenerhebung — Smartineer ist eine statische PWA.
function ImpressumModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 fade-in"
            onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative slide-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full hover:bg-slate-100 transition text-xl leading-none" aria-label="Schließen">×</button>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Impressum</h2>
                <p className="text-xs text-slate-500 mb-4">Angaben gemäß § 5 TMG</p>

                <div className="space-y-4 text-sm text-slate-700">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Anbieter</h3>
                        <p className="font-semibold text-slate-900">Christoph Korn</p>
                        <p>Riemkeestraße 159</p>
                        <p>33102 Paderborn</p>
                        <p>Deutschland</p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Verantwortlich für den Inhalt</h3>
                        <p>Christoph Korn (Anschrift wie oben)</p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Haftungshinweis</h3>
                        <p className="text-xs text-slate-600">Smartineer ist ein privates, nicht-kommerzielles Lernprojekt und dient ausschließlich
                        der Reaktivierung von Studienwissen. Trotz sorgfältiger inhaltlicher Kontrolle wird keine Gewähr für die
                        Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte übernommen. Für den Inhalt
                        externer Standards und Quellen sind ausschließlich deren Herausgeber verantwortlich.</p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Datenschutz</h3>
                        <p className="text-xs text-slate-600">Diese Anwendung ist eine statische Progressive Web App ohne Backend.
                        Es findet keine Erhebung, Speicherung oder Übertragung personenbezogener Daten an den Anbieter statt.
                        Lernfortschritt und Einstellungen werden ausschließlich lokal im Browser (<code>localStorage</code>) gespeichert.</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button onClick={onClose}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold py-2 px-5 rounded-lg transition">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    );
}
