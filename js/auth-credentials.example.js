/*
 * Smartineer — Auth-Credentials VORLAGE
 *
 * KOPIE DIESER DATEI als `js/auth-credentials.js` ablegen (gitignored) und
 * die Default-Passwoerter ersetzen. Die produktive Datei wird NICHT
 * eingecheckt (siehe `.gitignore`).
 *
 * WICHTIG — Sicherheits-Disclaimer:
 *   Smartineer ist eine reine Frontend-PWA ohne Backend. Diese "Auth" ist
 *   ausschliesslich eine UX-Convenience: sie blendet den Schulungen-Bereich
 *   fuer Gelegenheits-Besucher aus und unterscheidet User- von Admin-Rollen
 *   in der UI. Sie bietet KEINEN echten Datenschutz — wer den Browser
 *   oeffnet (DevTools, View-Source, Cache, Service-Worker-Inspektor) sieht
 *   die hier gespeicherten Klartext-Passwoerter.
 *
 *   Verwende daher NIEMALS Passwoerter, die anderswo wiederverwendet werden.
 *   Sensible Inhalte gehoeren nicht in eine statische SPA.
 *
 * Format:
 *   window.SMARTINEER_AUTH = {
 *       users: {
 *           '<username>': { pass: '<plaintext>', role: 'admin' | 'user' }
 *       },
 *       // optional: Anzahl Tage, bevor ein Login erneut bestaetigt werden muss.
 *       sessionDays: 30
 *   };
 *
 * Die Anwendung erkennt diese Datei am Praesenz-Check `window.SMARTINEER_AUTH`.
 * Fehlt sie, gilt jeder Besucher als "guest" und der Schulungen-Tab ist
 * gesperrt (siehe Optionen → Konto).
 */
(function () {
    window.SMARTINEER_AUTH = {
        users: {
            // Admin sieht alle Schulungen, kann Kategorien global ein/ausblenden
            // und User-Anfragen aus dem Store sehen.
            'admin': { pass: 'admin', role: 'admin' },

            // Standard-User (nur Lese-Zugriff auf Schulungen).
            'user':  { pass: 'user', role: 'user' }
        },
        sessionDays: 30
    };
})();
