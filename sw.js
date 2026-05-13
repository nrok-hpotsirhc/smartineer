/* Smartineer Service Worker
 * Strategie:
 *   - App-Shell precachen (Install) — resilient: einzelne Fehler brechen Install nicht ab.
 *   - Navigation: Cache-First mit Hintergrundupdate (kein Blank-Screen bei schlechter Verbindung).
 *   - Same-origin GET: Cache-First mit Background-Update.
 *   - Cross-origin (CDN): Stale-while-revalidate.
 *   - Navigation-Fallback: index.html (offline-fähig).
 */
const CACHE_VERSION = 'smartineer-v97-eng-min70-crypto';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.webmanifest',
    './css/styles.css',
    './js/app/_core.jsx',
    './js/app/training.jsx',
    './js/app/cheatsheet.jsx',
    './js/app/schueler.jsx',
    './js/app/schulungen.jsx',
    './js/app/install.jsx',
    './js/app/optionen.jsx',
    './js/app/ingenieur.jsx',
    './js/app.jsx',
    './js/auth-credentials.example.js',
    './js/data/math.js',
    './js/data/control.js',
    './js/data/digital_control.js',
    './js/data/robotics.js',
    './js/data/system_theory.js',
    './js/data/physics.js',
    './js/data/crypto.js',
    './js/data/blockchain.js',
    './js/data/neural_nets.js',
    './js/data/plc.js',
    './js/data/cyber_security.js',
    './js/data/krl.js',
    './js/data/fuegetechniken.js',
    './js/data/agentic_ai.js',
    './js/data/sensorik.js',
    './js/data/ai_models.js',
    './js/data/schueler.js',
    './js/data/schueler_200_topups.js',
    './js/data/schulung_securityx.js',
    './js/data/schulung_starter.js',
    './js/data/schulung_allgemeinmedizin.js',
    './js/data/schulung_master_et_cybersec.js',
    './js/data/schulung_master_et_automation.js',
    './icons/icon.svg',
    './icons/favicon.svg',
    './icons/smartineer-logo.png',
    './icons/icon-192.svg',
    './icons/icon-512.svg'
];

// Jede Datei einzeln cachen — ein Fehler bricht nicht die gesamte Installation ab.
function precacheAll(cache, urls) {
    return Promise.all(
        urls.map((url) =>
            cache.add(url).catch((err) => {
                console.warn('[SW] Precache fehlgeschlagen für', url, err);
            })
        )
    );
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => precacheAll(cache, APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    const sameOrigin = url.origin === self.location.origin;

    // Navigation: Cache-First → sofortiger Start aus Cache, Hintergrundupdate.
    // Kein network-first, damit die App auch bei schlechter Verbindung sofort lädt.
    if (req.mode === 'navigate') {
        event.respondWith(
            caches.match('./index.html').then((cached) => {
                // Hintergrundupdate: index.html im Cache aktualisieren
                const networkUpdate = fetch(req).then((res) => {
                    if (res && res.status === 200) {
                        const copy = res.clone();
                        caches.open(CACHE_VERSION).then((c) => c.put('./index.html', copy));
                    }
                    return res;
                }).catch(() => null);

                // Sofort aus Cache liefern; falls kein Cache, auf Netzwerk warten
                return cached || networkUpdate;
            })
        );
        return;
    }

    if (sameOrigin) {
        // Cache-First mit Background-Refresh
        event.respondWith(
            caches.match(req).then((cached) => {
                const network = fetch(req).then((res) => {
                    if (res && res.status === 200) {
                        const copy = res.clone();
                        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
                    }
                    return res;
                }).catch(() => null);
                return cached || network;
            })
        );
        return;
    }

    // Cross-origin (CDNs): Stale-while-revalidate
    event.respondWith(
        caches.open(CACHE_VERSION).then((cache) =>
            cache.match(req).then((cached) => {
                const fetchPromise = fetch(req).then((res) => {
                    if (res && res.status === 200) cache.put(req, res.clone());
                    return res;
                }).catch(() => cached);
                return cached || fetchPromise;
            })
        )
    );
});
