# AGENTS.md — Leitfaden für die Weiterentwicklung von Smartineer

Dieses Dokument richtet sich an **menschliche Entwickler** und **AI-Coding-Agents** (Copilot, Claude, etc.), die an diesem Projekt arbeiten. Es definiert verbindliche Konventionen, Pflege-Pflichten und Qualitätsstandards.

> **Lies dieses Dokument, bevor du Änderungen einreichst.**  
> Bei Konflikten gilt: AGENTS.md > README.md > eigener Stil.

---

## 0. Status-Report-Pflicht (verbindlich)

Am Ende **jeder** Arbeitseinheit (Commit, PR, Agent-Antwort) ist ein knapper **Status-Report** zurückzumelden. Format:

- **DONE** — was in dieser Einheit fertig wurde.
- **OFFEN / DRINGEND** — Punkte, die noch fehlen *und* den Funktionsumfang oder die wissenschaftliche Korrektheit beeinträchtigen, oder bei denen Optimierungsbedarf besteht. **Diese Punkte müssen klar hervorgehoben werden.**
- **NICE-TO-HAVE** — optionale TODOs nur stichpunktartig.

Ehrlichkeit ist Pflicht: Lücken (z.B. zu wenige Quiz-Fragen, fehlende PBQ-Simulation, ungeprüfte Quelle) **dürfen nicht verschwiegen werden**. Wer einen Block knapp unter die Mindestanforderung liefert, muss den Gap explizit benennen.

### 0.1 Gegenprüfungs- und Roll-Forward-Pflicht (verbindlich)

Vor jedem neuen Status-Report ist der **vorherige** Status-Report aus der laufenden Konversation zu sichten und Punkt für Punkt durchzugehen:

- Jeder zuvor unter **OFFEN / DRINGEND** gelistete Punkt ist explizit zu prüfen:
  - Erledigt? → in den neuen **DONE**-Block übernehmen (mit Verweis darauf, dass er aus dem letzten Report stammt).
  - Weiterhin offen? → erneut unter **OFFEN / DRINGEND** auflisten, ggf. mit aktualisiertem Stand.
  - Hinfällig geworden? → kurz begründen, warum (Anforderung verworfen, durch andere Lösung ersetzt, …).
- Anschließend werden die alten **OFFEN / DRINGEND**-Punkte durch die **neuen** offenen Punkte ersetzt — der Report bildet damit immer den aktuellen Stand ab, nicht nur die Delta-Sicht der letzten Aktion.
- **NICE-TO-HAVE** wird ebenfalls fortgeschrieben: erledigte Items entfernen, neue ergänzen.
- Werden offene Punkte bewusst **nicht** angegangen (z.B. wegen Scope), ist das im Report festzuhalten — sie verschwinden nicht stillschweigend.

Diese Roll-Forward-Pflicht gilt insbesondere für AI-Coding-Agents: Verlasse dich nicht darauf, dass der Nutzer die alten Punkte mitgibt — lies den letzten Status-Report im Konversations-Verlauf und gleiche ab.

---

## 1. Projekt-Mission

Smartineer ist eine **statische Single-Page-Anwendung** zum Reaktivieren von Ingenieurs-Studienwissen über 11 Kategorien × 3 Schwierigkeitsstufen, ergänzt um einen Schüler-Bereich (Klassen 1–10, Mathematik aktiv für 1–4).

**Nicht-Ziele** (bewusst weggelassen):
- Kein Backend, keine Datenbank, kein Auth.
- Kein Build-Schritt (kein npm/webpack/vite). React + JSX werden via **Babel-standalone zur Laufzeit im Browser** transpiliert.
- Kein User-Tracking, keine Telemetrie.

**Erlaubt** seit der React-/PWA-Migration:
- React (UMD-CDN) + ReactDOM + Babel-standalone.
- Service Worker + Web App Manifest (PWA).
- Tailwind-basierte Animationen / CSS-Keyframes.

Wer trotzdem einen Build-Schritt, ein zusätzliches Framework, ein Backend o.ä. einführen will, **muss vorher in einem Issue diskutieren**.

---

## 2. Tech-Stack & Constraints

| Schicht | Wahl | Lieferweg | Anmerkung |
|---|---|---|---|
| Layout | Tailwind CSS | CDN (`cdn.tailwindcss.com`) | JIT im Browser, keine `tailwind.config.js` |
| UI-Framework | React 18 (UMD) | unpkg-CDN | Functional Components + Hooks |
| JSX-Transform | Babel-standalone | unpkg-CDN | `<script type="text/babel" data-presets="react">` — **kein Build-Schritt** |
| Charts | Chart.js v4 | jsdelivr CDN | Nur für Radar auf Dashboard |
| Math | KaTeX 0.16.x + auto-render | jsdelivr CDN | Delimiters: `$...$`, `$$...$$` |
| Logik | JSX / ES2017+ | lokal | Kein Modul-Bundling, keine `import`-Statements (React/ReactDOM aus globalem Scope) |
| Persistenz | `localStorage` | Browser | Key: `wissen_reloaded_progress_v1`, Install-Dismiss: `smartineer_install_dismissed_v1` |
| PWA | Web App Manifest + Service Worker | lokal (`manifest.webmanifest`, `sw.js`) | Cache-First für App-Shell, Stale-While-Revalidate für CDNs |

**Browser-Ziele**: aktuelle Evergreen-Browser (Chrome, Firefox, Edge, Safari letzte 2 Jahre). IE wird nicht unterstützt.

---

## 3. Repository-Struktur (verbindlich)

```
smartineer/
├── index.html              # SPA-Shell — React-Mount, Script-Ladereihenfolge, PWA-Hooks
├── manifest.webmanifest    # PWA-Manifest (Name, Icons, Display-Mode)
├── sw.js                   # Service Worker (App-Shell-Cache, Offline-Support)
├── .nojekyll               # MUSS existieren (GitHub Pages)
├── README.md               # Anwender-Doku (DE)
├── AGENTS.md               # dieses Dokument
├── icons/
│   ├── icon.svg            # Master-Icon (any/maskable)
│   ├── icon-192.svg        # 192px-Variante
│   └── icon-512.svg        # 512px-Variante
├── css/
│   └── styles.css          # eigenes CSS (Pills, Animationen, Safe-Area, Scrollbar)
└── js/
    ├── app.jsx             # React-App (alle Komponenten, Hooks, Install-Prompt, Routing)
    └── data/
        ├── <id>.js         # eine Datei pro Kategorie (siehe §5)
        └── ...
```

**Regeln**:
- Keine neuen Top-Level-Ordner ohne Diskussion.
- **Keine Binär-Bilder** (PNG/JPG) — Icons sind SVG (Performance + git-friendly).
- Keine Lockfiles, keine `node_modules/`, keine `package.json` (es gibt kein npm-Projekt).
- `manifest.webmanifest` und `sw.js` müssen am **Repo-Root** liegen (Service-Worker-Scope = `/`).

---

## 4. Script-Lade-Reihenfolge

In `index.html` werden Skripte in dieser Reihenfolge geladen:

1. Tailwind, Chart.js, KaTeX (CDN, im `<head>` mit `defer` wo möglich).
2. **Alle** `js/data/<id>.js` — Reihenfolge bestimmt die Reihenfolge in Sidebar/Dashboard/Radar. Diese Skripte registrieren `window.APP_DATA` / `window.APP_ORDER` und müssen **vor** React/Babel laden.
3. React + ReactDOM (UMD, production) und Babel-standalone (CDN).
4. `<script type="text/babel" data-presets="react" src="js/app.jsx"></script>` — die App.
5. Inline-Snippet für `navigator.serviceWorker.register('sw.js')`.

Wer eine neue Kategorie einfügt, muss den `<script>`-Tag manuell **vor** den React/Babel-Skripten ergänzen **und** `sw.js`-`APP_SHELL` um die Datei erweitern (sonst kein Offline-Fallback).

---

## 5. Datenformat einer Kategorie (Schema)

Jede Datei ist ein IIFE und schreibt in zwei globale Strukturen:

```js
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = '<eindeutige_id>';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name:  'Anzeigename',
        desc:  'Sidebar-/Dashboardbeschreibung (1–2 Sätze).',
        formulas: `<!-- HTML mit KaTeX-Formeln, gerendert im Cheatsheet -->`,
        levels: [
            [ /* Level 1 — Grundlagen */    /* {q,h,s}, ... */ ],
            [ /* Level 2 — Vertiefung */    /* {q,h,s}, ... */ ],
            [ /* Level 3 — Expertise   */   /* {q,h,s}, ... */ ]
        ]
    };
})();
```

Eine Aufgabe ist ein Objekt:

```js
{ q: 'Frage als HTML-String', h: 'Hinweis-HTML', s: 'Musterlösung-HTML' }
```

### Pflichtfelder

| Feld | Typ | Pflicht | Hinweise |
|---|---|---|---|
| `id` | `string` | ja | snake_case, eindeutig, nie ändern (sonst Reset des Lernfortschritts!) |
| `name` | `string` | ja | Anzeige in Sidebar/Dashboard |
| `desc` | `string` | ja | Plain text |
| `formulas` | `string` (HTML) | ja | Mind. die für die Aufgaben benötigten Formeln |
| `levels` | `Array[3]` | ja | **Genau drei** Sub-Arrays |

### Konventionen für `q`, `h`, `s`

- **HTML erlaubt**: `<br>`, `<strong>`, `<em>`, `<table>`, `<ul>/<li>`, `<code>`, `<sub>/<sup>`.
- **Mathematik via KaTeX**: inline `$...$`, abgesetzt `$$...$$`.
- **Backslashes doppeln**: `\\frac`, `\\bmod`, `\\sin`, `\\boxed{...}`.
- **Endergebnis** in `\\boxed{...}` einrahmen.
- **Lösungsweg in Schritten**, nicht nur Ergebnis. Kommentare zur physikalischen/ingenieursmäßigen Bedeutung erwünscht.
- **Keine externen Bilder/SVGs** — nur Text+Formeln+ASCII-Tabellen.
- **Sprache**: Deutsch. Fachbegriffe ggf. englisch in Klammern.
- **Einheiten** SI, mit `\\,` als schmaler Schutzraum: `9{,}81\\,\\text{m/s}^2`.

---

## 6. Workflow: Neue Aufgabe hinzufügen

Wenn du **eine** Aufgabe hinzufügst, müssen **alle** folgenden Punkte erledigt werden:

### Pflicht-Checkliste

- [ ] Aufgabe in das richtige Level-Array (`levels[0|1|2]`) eingefügt.
- [ ] Schema `{q, h, s}` eingehalten, KaTeX korrekt escaped.
- [ ] **Keine inhaltliche Dublette** zu bestehenden Aufgaben in derselben Kategorie (Stichprobe in allen 3 Stufen).
- [ ] Endergebnis in `\\boxed{...}` (sofern numerisch/symbolisch geschlossen).
- [ ] **Cheatsheet-Pflege** (`formulas`):
  - [ ] Wenn die Aufgabe eine Formel/Definition nutzt, die noch nicht im Cheatsheet steht → ergänzen.
  - [ ] Wenn eine bestehende Formel nun nicht mehr von einer Aufgabe gebraucht wird → trotzdem behalten (Cheatsheet ist Lernhilfe, nicht Index).
  - [ ] Cheatsheet thematisch geordnet halten (Grundlagen → Spezialfälle).
- [ ] **Wissenschaftliche Korrektheit** geprüft (siehe §8).
- [ ] **Lint** — keine JS-Syntaxfehler (`get_errors` der Datei).
- [ ] **Smoke-Test** im Browser (Aufgabe + Hinweis + Lösung rendern, KaTeX kompiliert).
- [ ] **README**-Zähler ggf. aktualisieren (Gesamtzahl Aufgaben in der Übersicht).

### Anti-Pattern (vermeiden)

- Aufgabentexte aus urheberrechtlich geschützten Lehrbüchern wörtlich kopieren.
- "Trivialaufgaben" wie "Was ist 2+2" auf L1 setzen — auch L1 muss noch Reaktivierung von Studienwissen sein.
- Auf L3 schwammige Essay-Fragen ohne klar überprüfbare Lösung.
- Backslashes im JS-String einfach (`\frac` → wird zu `frac`).
- HTML-Tags in `formulas`, die KaTeX-Output zerschießen (z.B. `<style>` inline).

---

## 7. Workflow: Neue Kategorie hinzufügen

1. Datei `js/data/<id>.js` nach Vorlage einer bestehenden Kategorie anlegen.
2. In `index.html` einen `<script src="js/data/<id>.js"></script>` **vor** `js/app.js` einfügen.
3. Mind. **6 Aufgaben pro Stufe** (Minimum-Standard, siehe §9).
4. README-Tabelle "Kategorien-Übersicht" um die Kategorie ergänzen.
5. Radarchart funktioniert automatisch (keine Code-Änderung nötig).

---

## 8. Wissenschaftliche Korrektheit — **VERBINDLICH**

> **HARTE ANFORDERUNG: Alle Aufgaben, Hinweise und Lösungen MÜSSEN wissenschaftlich korrekt sein.**  
> Eine inhaltlich falsche Aufgabe ist **kein** akzeptabler Zustand — sie ist ein Bug und muss vor dem Einchecken behoben werden. Im Zweifel: Aufgabe weglassen oder im Issue diskutieren, **nicht** raten.

Konkret bedeutet das:

- Jede Formel, jeder Lösungsschritt und jedes numerische Ergebnis ist gegen mindestens eine **etablierte Quelle** (Lehrbuch, peer-reviewter Artikel, akzeptierter Standard) zu verifizieren.
- Bei mehreren legitimen Konventionen wird die gewählte **explizit benannt** (z.B. Vorzeichen-Konvention, Frequenz vs. Kreisfrequenz, Zeitkonstante vs. Eigenfrequenz).
- Numerische Ergebnisse sind nachzurechnen — nicht nur abzuschreiben — und auf **3 signifikante Stellen** zu runden, sofern nicht anders sinnvoll.
- Annäherungen mit `\\approx` und Fehlerangabe.
- Bei Standards (NIST PQC, IEEE, ISO, RFC) **immer** Jahr / Version angeben.
- Bei Sicherheits-/Crypto-Themen: keine veralteten Empfehlungen (DES, MD5, SHA-1, RSA-1024) als „ok" darstellen — nur als Negativbeispiel mit klarer Kennzeichnung.
- Bei Modellannahmen (lineare Näherung, idealisierte Bauteile, kleine Auslenkung, …) Annahme **vor** der Lösung explizit nennen.

### Bevorzugte Standardquellen

- Quellen-Konventionen (Lutz/Wendt, Föllinger, Lunze, Khalil, Bishop, Goodfellow, Spong, Nakamoto, NIST) bevorzugen.
- Bei zwei legitimen Vorzeichen-/Definitions-Konventionen die gewählte **explizit benennen**.
- Numerische Ergebnisse auf **3 signifikante Stellen** runden, sofern nicht anders sinnvoll.
- Bei Näherungen: Symbol `\\approx` und ggf. relativen Fehler nennen.
- Bei Standards (NIST PQC, IEEE, ISO) immer **Jahr / Version** angeben.
- Bei Sicherheits-/Crypto-Themen: keine veralteten Empfehlungen (DES, MD5, SHA-1, RSA-1024) als "ok" darstellen — nur als Negativbeispiel.

---

## 9. Aufgaben-Bestand & Wachstumsregel

| Stufe | Mindestanzahl pro Kategorie | Soll-Wachstum |
|---|---|---|
| L1 (Grundlagen) | 6 | 10+ |
| L2 (Vertiefung) | 6 | 10+ |
| L3 (Expertise) | 6 | 8+ |

**Faustregel**: Wer eine neue Aufgabe hinzufügt, sollte sie an die thematisch passende Position einreihen (nicht einfach ans Ende). Verwandte Aufgaben gehören gruppiert.

---

## 10. UI / DOM-Verträge (für `app.js`-Änderungen)

Folgende DOM-IDs/Klassen sind Vertrag zwischen `index.html`, `css/styles.css` und `js/app.js`. **Nicht ohne Anpassung aller drei Stellen umbenennen.**

**Views**: `view-dashboard`, `view-training`, `view-cheatsheet`

**Sidebar**: `category-list`, `cat-title`, `cat-desc`

**Training**: `task-area`, `task-pills`, `task-question`, `task-hint`, `task-solution`, `hint-box`, `solution-box`, `btn-show-hint`, `btn-show-solution`, `btn-mark-solved`, `btn-prev-task`, `btn-next-task`

**Level-Tabs**: `.lvl-btn[data-lvl="0|1|2"]`, `<span class="count" data-lvl-count="...">`

**Cheatsheet**: `tab-formulas`, `tab-solutions`, `cheatsheet-formulas`, `cheatsheet-solutions`

**Dashboard**: `dashboard-cards`, `progress-summary`, `btn-start-training`, `btn-reset-progress`, `skillsRadarChart`

**Navigation**: `.nav-btn[data-view=...]`

**Status-Klassen**: `.task-pill.active`, `.task-pill.solved`, `.cat-btn-active`, `.hide`

---

## 11. Persistenz / Migrationen

- Storage-Key: `wissen_reloaded_progress_v1`.
- Format: `{ "<catId>|<level>|<idx>": 1, ... }`.
- **Wenn sich die Reihenfolge (`idx`) bestehender Aufgaben ändert**, kann der Lernfortschritt eines Users falschen Aufgaben zugeordnet werden. Daher:
  - **Neue Aufgaben bevorzugt anhängen**, nicht mittendrin einsortieren.
  - Wenn eine inhaltliche Umsortierung **doch** nötig ist, Storage-Key bumpen (`_v2`) und in Release-Notes erwähnen.
- Niemals personenbezogene Daten in `localStorage` schreiben.

---

## 12. Code-Style

- **JavaScript**: 4 Spaces, einfache Anführungszeichen, ES2017+, keine Pfeilfunktionen für Methoden mit `this`-Bedarf, `const` > `let` > nie `var`.
- **HTML**: 4 Spaces, semantisch korrekt, ARIA-Attribute wo angebracht.
- **CSS**: kebab-case-Klassen, keine `!important` außer für `.hide`.
- **Markdown**: ATX-Headings (`#`), Tabellen mit Leerzeichen-Padding für Lesbarkeit.
- **Keine Emojis** in Code, UI, Commit-Messages, Aufgabentexten oder Dokumentation. Verwendet werden ausschließlich:
  - reine Text-Labels (z.B. `Musterlösung`, `Als gelöst markieren`),
  - Inline-SVG / SVG-Icons in `icons/` für Marken/Logo,
  - mathematische Symbole über **KaTeX** (z.B. `\\checkmark`, `\\square`, `\\rightarrow`),
  - typografische Sonderzeichen aus dem Latin/Math-Block (z.B. `×`, `→`, `±`, `≈`).
  Unicode-Dingbats / Pictographs (`✓ ✗ ⚠ ✅ ❌ 📲 ⬆️ ⋮ 🎯 📊 🧮 ⚛️` etc.) sind **verboten**, da sie schriftartabhängig rendern, in Tabellen verrutschen und nicht zum sachlichen Ton des Projekts passen.

---

## 13. Validierung vor Commit

Minimum-Set:

1. `get_errors` (oder Linter) auf alle geänderten `js/**/*.js` Dateien.
2. `index.html` lokal öffnen, alle 11 Kategorien durchklicken, mind. eine L1/L2/L3-Aufgabe je Kategorie betrachten — KaTeX rendert?
3. Cheatsheet-Reiter "Formeln" und "Musterlösungen" prüfen — keine Render-Fehler?
4. Dashboard: Radar zeigt alle 11 Kategorien?
5. "Fortschritt zurücksetzen" funktioniert?

---

## 14. Häufige Fallen (Lessons Learned)

| Fehler | Ursache | Fix |
|---|---|---|
| `\frac` wird als Text angezeigt | einfacher Backslash im JS-String | `\\frac` |
| KaTeX-Fehler "Expected 'EOF'" | unbalancierte `$` | inline `$...$` matching prüfen |
| Aufgabenpills falsch sortiert | neue Aufgabe an falsche Level-Position | korrektes `levels[i]` wählen |
| Radar zeigt Kategorie nicht | Skript nicht in `index.html` registriert | `<script>` vor `app.js` einfügen |
| Lernfortschritt scheinbar verschwunden | `idx` einer Aufgabe verändert | Aufgaben bevorzugt anhängen |
| GitHub Pages 404 für `js/data/...` | `.nojekyll` fehlt | leere Datei `.nojekyll` im Repo-Root |

---

## 14a. PWA-Architektur

Smartineer ist gleichzeitig **Website** und **installierbare PWA**. Beides muss funktionsfähig bleiben.

**Manifest (`manifest.webmanifest`)**:
- `start_url`/`scope` = `./` (relativ — funktioniert auf GitHub Pages und localhost).
- `display: standalone`, `theme_color: #1e3a8a`, `background_color: #0f172a`.
- Icons als SVG (`icons/icon.svg`, `icon-192.svg`, `icon-512.svg`).
- Bei Änderungen am Manifest: `CACHE_VERSION` in `sw.js` bumpen.

**Service Worker (`sw.js`)**:
- `CACHE_VERSION` als String-Konstante; **Bei jeder Änderung an App-Shell oder Daten-Skripten hochzählen** — sonst zeigen User die alte Version.
- `APP_SHELL`-Liste enthält **alle** lokal gehosteten Dateien (HTML, CSS, JSX, alle `js/data/*.js`, Manifest, Icons). Beim Hinzufügen einer neuen Kategorie unbedingt erweitern.
- Strategie: Cache-First für same-origin, Stale-While-Revalidate für CDN-Ressourcen, Navigation-Fallback auf `index.html`.
- Niemals POSTs/Sensible Daten cachen (gibt es im Projekt nicht — falls eingeführt: explizit ausschließen).

**Install-Prompt** (`InstallPrompt`-Komponente in `app.jsx`):
- Listener auf `beforeinstallprompt` (Chrome/Edge/Android) — Event abfangen, später triggern.
- iOS-Erkennung via `/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream` → eigenes Modal mit Anleitung „Teilen → Zum Home-Bildschirm".
- Standalone-Erkennung via `matchMedia('(display-mode: standalone)')` und `navigator.standalone` — wenn schon installiert, kein Prompt.
- Persistente Ablehnung via `localStorage`-Key `smartineer_install_dismissed_v1`. Diesen Key nicht ohne Versions-Bump umbenennen.

**iOS-Besonderheiten**:
- Apple-spezifische Meta-Tags: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, `apple-touch-icon`.
- Safe-Area in `css/styles.css` via `env(safe-area-inset-*)`.

## 14b. React-UI / Animationen

- **Functional Components** + Hooks (`useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`). **Keine** Class-Components.
- KaTeX wird nach Mount/Update via `useKaTeX(deps)`-Custom-Hook über einen `ref` aufgerufen.
- **Keine** State-Management-Bibliothek (Redux/Zustand/Recoil) — Zustand bleibt im `<App>`-Root und wird per Props heruntergereicht.
- Animationen ausschließlich via CSS-Keyframes in `css/styles.css` (`view-fade`, `card-fade`, `slide-in`, `slide-up`, `task-fade`) und Tailwind-Transitions. **Keine** Framer-Motion-/Lottie-CDN-Abhängigkeiten ohne Diskussion.
- `prefers-reduced-motion` MUSS respektiert werden (bereits in `styles.css`).
- HTML-Inhalt aus `q`/`h`/`s`/`formulas` wird via `dangerouslySetInnerHTML` injiziert — daher: **keine** vom User beeinflussten Daten in diese Felder; nur statische, von Maintainern gepflegte Inhalte.

## 15. Roadmap-Pflege

Wer Roadmap-Punkte aus README umsetzt: dort als erledigt markieren. Wer neue Ideen hat: in README-Roadmap eintragen, **nicht** in AGENTS.md.

---

## 16. Definition of Done für eine Aufgaben-Erweiterung

Eine PR/Änderung gilt als fertig, wenn:

- [ ] Alle Aufgaben dem Schema entsprechen.
- [ ] Cheatsheet `formulas` enthält alle benötigten Formeln.
- [ ] Keine Dubletten innerhalb der Kategorie.
- [ ] Lint sauber.
- [ ] Browser-Smoke-Test ok (KaTeX-Rendering, Pills, Hint/Solution-Toggle, "gelöst"-Badge).
- [ ] README-Aufgabenzähler/Tabelle aktualisiert (falls Gesamtzahl geändert).
- [ ] Keine Änderung an Storage-Key ohne `_vN`-Bump.
- [ ] Diese Datei (`AGENTS.md`) aktualisiert, falls neue Konvention eingeführt wurde.

---

## 17. Schüler-Bereich (Mathematik Klasse 1–10, später Englisch ab Klasse 5)

Der Schüler-Bereich (`view === 'schueler'`) ist **getrennt** vom Ingenieurs-Track:

- Eigener Top-Level-Nav-Tab "Schüler" (links neben dem Theme-Toggle).
- Eigene Datendatei `js/data/schueler.js` mit globalem `window.SCHUELER`.
- Eigener Komponenten-Block `Schueler` in `app.jsx` (Stages: `classes` → `subjects` → `drill` → `result`).
- **Eigener** Storage-Namespace (Prefix `smartineer_schueler_*`); der Ingenieurs-Storage-Key (`wissen_reloaded_progress_v1`) wird **nicht** angefasst.
- KaTeX wird im Drill mitgerendert (nur falls eine Aufgabe `$...$` enthält); die generierten Klasse-1/2-Aufgaben sind reiner Text.

### 17.1 Datenstruktur (`window.SCHUELER`)

```js
{
    classes:  [{ id: 'k1', label: 'Klasse 1', subjects: ['mathe'] }, ... ],
    subjects: { mathe: { label: 'Mathematik' }, englisch: { label: 'Englisch' } },
    content: {
        'k1.mathe': { mode: 'generated', gen: () => ({ q, a }), note: '...' },
        'k3.mathe': { mode: 'pool',      pool: [{ q, a }, ...],  note: '...' },
        'k5.mathe': { mode: 'stub' },
        ...
    },
    normalize: (s) => s.trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase()
}
```

`mode`-Werte:

- `generated` — Aufgaben werden über `gen()` prozedural erzeugt (Klasse 1–2, gut für unbegrenzte Wiederholungen).
- `pool` — Aufgaben werden zufällig aus einem festen, kuratierten Array gezogen (Klasse 3–4, garantiert Lehrplan-Coverage).
- `stub` — UI zeigt "in Vorbereitung" und deaktiviert die Karte.

### 17.2 UX-Vertrag

- **Sets von genau 10 Aufgaben.** Keine Konfiguration der Set-Größe durch User.
- **Kein Multiple-Choice.** Eingabe ausschließlich als Text/Zahl. Antwort-Vergleich erfolgt nach Normalisierung (Whitespace weg, Komma → Punkt, Lowercase).
- **Kein Hint, keine Musterlösung während des Drills** — Schüler sollen handschriftlich rechnen.
- Endbildschirm: Anzahl korrekt/falsch, Quote in %, Liste aller 10 Aufgaben mit eigener Antwort und (bei Fehler) der Musterlösung.
- Buttons am Ende: "Neuer Durchgang", "Anderes Fach", "Andere Klasse".
- Eingabefeld nutzt eigene Klasse `.schueler-input` (groß, zentriert) — Default heller Hintergrund, dunkler im Dark-Mode.
- Bei Klassen 3+4 zusätzlich Hinweis: *"Rechne wenn nötig im Heft, gib hier nur das Endergebnis ein."*

### 17.3 Aufgabenverteilung (verbindlich)

| Klasse | Modus    | Inhalte                                                                                |
|--------|----------|----------------------------------------------------------------------------------------|
| 1      | generated| Plus/Minus im Zahlenraum bis 20 (überwiegend ohne Zehnerübergang).                     |
| 2      | generated| Plus/Minus bis 100, Vorübung Einmaleins (×2, ×5, ×10).                                 |
| 3      | pool     | Vollständiges kleines 1×1, Geteilt aus 1×1, schriftliche Addition/Subtraktion bis 1000.|
| 4      | pool     | Halbschriftliches/schriftliches Mal/Geteilt, Division mit Rest, einfache Sachaufgaben.  |
| 5–10   | stub     | Mathematik in Vorbereitung; Englisch ab Klasse 5 ebenfalls in Vorbereitung.            |

### 17.4 Erweiterungsregeln

- **Neue Aufgabe für Klasse 3 oder 4 hinzufügen**: an das passende `pool_*`-Array anhängen (Reihenfolge irrelevant — die UI sampelt zufällig).
- **Neuen Generator (Klasse 1 oder 2)**: rein deterministisches `gen()` schreiben; immer `{ q: string, a: string }` zurückgeben. Antwort als String, damit `normalize()` greift. Schwerere Generatoren (z.B. Zehnerübergang) in eigene Funktion auslagern und in `gen_klasse2_mathe` per Wahrscheinlichkeit einsteuern.
- **Klasse 5–10 freischalten**: `mode: 'stub'` durch `pool` oder `generated` ersetzen, `pool`/`gen` und `note` ergänzen. UI braucht keine Änderung — die Karten werden automatisch aktiv.
- **Englisch ab Klasse 5**: gleiches Schema (`{ q, a }`). Da Antworten Texte sein können, muss `normalize()` ggf. erweitert werden (z.B. Bindestriche, Apostrophe). Vor Erweiterung in einem Issue diskutieren.
- **Antwortformat-Konventionen** dokumentieren: Sachaufgaben — Antworten ohne Einheit; Division-mit-Rest — Format `qRr` (z.B. `7R3`), Vergleich case-insensitiv über `normalize()`.

### 17.5 Anti-Pattern

- Schüler-Aufgaben in eine Ingenieurs-Kategorie mischen.
- Antworten in `q` oder `a` mit HTML-Tags, die User-Input rendern (XSS-Risiko) — beide Felder sind Plain-Text.
- Multiple-Choice-Komponente einführen (nicht im Konzept).
- Fortschritt der Schüler in `wissen_reloaded_progress_v1` schreiben.
- Set-Größe ändern oder konfigurierbar machen (10 ist hart kodiert).

---

## 18. Schulungen-Bereich (Cert-Prep, Multi-Choice)

Der Schulungen-Bereich (`view === 'schulungen'`) ist der dritte parallele Track neben Ingenieurs-Training und Schüler-Bereich. Er bündelt **Zertifikats-Vorbereitungskurse** (z.B. CompTIA SecurityX/CASP+, Security+, CySA+, PenTest+) als kapitelweise Lernpfade mit Quiz am Kapitelende.

### 18.1 Datenstruktur (`window.SCHULUNGEN`)

Pro Schulung eine Datei `js/data/schulung_<id>.js` als IIFE:

```js
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };
    window.SCHULUNGEN.list.push({
        id: 'securityx',                 // eindeutig, snake_case, nie ändern
        code: 'CompTIA CAS-005',         // Zertifikatsbezeichnung
        name: 'SecurityX (CASP+)',       // Anzeige-Titel
        short: 'SecurityX',              // Kurztitel im Reader-Header
        desc: '1–2 Sätze für die Übersicht.',
        chapters: [
            {
                id: 'grc',
                title: 'Governance, Risk & Compliance',
                summary: 'Kurzbeschreibung 1 Satz.',
                pages: [
                    { title: 'Seitentitel', html: '<p>...</p>' },
                    // ... weitere Seiten
                ],
                quiz: [
                    { q: 'Frage als HTML', options: ['A', 'B', 'C', 'D'], correct: 0,
                      explanation: 'Quellenanker, 1–2 Sätze.' },
                    // ... 50+ Fragen pro Kapitel (Mindestziel)
                ]
            }
            // ... weitere Kapitel
        ]
    });
})();
```

Pflichtfelder pro Kapitel: `id`, `title`, `summary`, `pages` (≥ 1), `quiz` (≥ 50 Soll, ≥ 10 Mindest-Bootstrap).

### 18.2 UX-Vertrag (Buch-Navigation)

- **Buchartiger Reader**: eine Seite pro Bildschirm, prev/next Buttons unten, fortlaufender Fortschrittsbalken.
- **Letzte gelesene Seite** wird pro `(trainingId, chapterId)` automatisch in `localStorage` gespeichert; "Weiterlesen"-Button springt direkt dorthin.
- **TOC-Overlay** (Icon-Button "Inhalt") öffnet das Inhaltsverzeichnis des aktuellen Kapitels.
- **Page-Jump-Overlay** (Icon-Button "Seite…") erlaubt direktes Springen via Zahleneingabe.
- **Quiz am Kapitelende**: auf der letzten Seite wird "Weiter →" durch "Quiz starten" ersetzt.
- **Quiz**: 10 zufällig gezogene Fragen aus dem Pool des Kapitels; Multi-Choice mit Radio-Buttons (4 Optionen); Erläuterung pro Frage erst im Endergebnis.
- **Quiz-Endbildschirm**: Quote, Liste aller 10 Fragen mit Auswahl + korrekter Antwort + Erläuterung.
- **Best-Score-Tracking** pro Kapitel; auf Übersicht sichtbar.

### 18.3 Persistenz

- Eigener Storage-Key `smartineer_schulungen_v1`. **Niemals** an `wissen_reloaded_progress_v1` oder `smartineer_schueler_*` mischen.
- Format: `{ [trainingId]: { [chapterId]: { lastPage: int, quizBest: { score, total, date }, quizLast: {...} } } }`.
- Bei Schema-Änderung: Key auf `_v2` bumpen.
- Reihenfolge der Kapitel/Seiten **nicht** nachträglich ändern (Lesestand-Drift). Lieber neue Seiten anhängen.

### 18.4 Aufgabenanzahl & Wachstumsregel (HARTE Anforderung)

| Kapitel-Status   | Quiz-Fragen  | Kommentar                                            |
|------------------|--------------|------------------------------------------------------|
| Soll (Ziel)      | **≥ 50**     | Volltext-Vorgabe vom Auftraggeber.                   |
| Akzeptables Min. | ≥ 30         | nur für Bootstrap-Phase, im Status-Report ausweisen. |
| Starter-Pool     | ~ 10         | nur initial, MUSS als „offen/dringend" markiert sein.|

- Neue Quiz-Fragen werden an das `quiz`-Array **angehängt** — nie mittendrin einsortieren (Random-Sampling braucht keine Reihenfolge, Stabilität ist trotzdem nützlich).
- Pro Frage genau 4 Antwortoptionen. `correct` ist der 0-basierte Index.
- `explanation` ist Pflicht: 1–3 Sätze mit **konkretem Quellenanker** (z.B. „NIST SP 800-207 §3.1", „MITRE ATT&CK T1110", „CompTIA SY0-701 Objective 2.4", „RFC 8446 §4.1.2", „FIPS 203:2024").

### 18.5 Wissenschaftliche Korrektheit (gilt §8 verschärft)

- Alle Behauptungen, Frageoptionen und Erläuterungen müssen gegen **primäre, aktuelle Standards** geprüft sein:
  - CompTIA-Objectives in der **aktuell gültigen Version** (CAS-005, SY0-701, CS0-003, PT0-002).
  - NIST SP 800-Serie (insb. 207, 218, 61r2, 53r5, 160 Vol. 1 r1, 115, 86), FIPS 140-3, FIPS 203/204/205 (PQC, 2024).
  - MITRE ATT&CK in jeweils aktueller Version (Versions-Tag im Text).
  - ISO/IEC 27001:2022, 27002:2022, 27005, 31000.
  - OWASP Top 10 2021 (bzw. neuere ASVS-Version mit Jahr).
  - CISA KEV, FIRST CVSS v3.1/v4.0 (Version benennen).
- **Veraltete Empfehlungen** (DES, 3DES, MD5, SHA-1, RSA < 2048, TLS < 1.2) ausschließlich als Negativbeispiel mit klarer Kennzeichnung.
- Bei Umstrittenem Aspekt: kürzeste, herstellerneutrale, standardkonforme Antwort wählen.

### 18.6 Inhaltliche Pflege (Curriculum-Pages)

- Pro Kapitel **mindestens 4 Lehrseiten** (Soll ≥ 6) — eine pro Schwerpunktthema.
- Seitenformat: `html` als sauberes Plain-HTML (keine Inline-Styles, keine Scripts, keine externen Bilder). Erlaubte Elemente: `<p>`, `<h3>`, `<h4>`, `<ul>/<ol>/<li>`, `<table>/<thead>/<tbody>/<tr>/<th>/<td>`, `<strong>`, `<em>`, `<code>`, `<blockquote>`.
- Mathe wenn nötig via KaTeX (`$...$`, `$$...$$`, Backslashes verdoppeln).
- Sprache: Deutsch. Fachbegriffe in Klammern auf Englisch wenn üblich (z.B. „Zero Trust Architecture (ZTA)").

### 18.7 Anti-Pattern

- Quiz-Pool unter 50 Fragen pro Kapitel ohne **expliziten Hinweis** im Status-Report.
- Frage- oder Antworttext aus geschützten Trainings-Materialien wörtlich kopieren.
- Halb-richtige Antworten als „falsch" werten oder umgekehrt — Distraktoren müssen eindeutig falsch sein.
- Quiz-Fortschritt der Schulungen in `wissen_reloaded_progress_v1` schreiben.
- Externe Bilder/SVGs in `pages.html`.
- Multi-Antwort-Fragen (Checkbox) — nur Single-Choice (Radio).

### 18.8 Erweiterungsregeln

- **Neue Schulung**: neue Datei `js/data/schulung_<id>.js`, in `index.html` **vor** den React-UMD-Skripten als `<script>` einbinden, in `sw.js` zum `APP_SHELL` hinzufügen, `CACHE_VERSION` bumpen.
- **Mehr Quiz-Fragen**: einfach an `quiz`-Array anhängen. UI sampelt automatisch 10 zufällige.
- **Mehr Lehrseiten**: an `pages` anhängen. Reader nutzt `pages.length` automatisch.
- **PBQ-Style-Aufgaben** (Drag-Drop / Sequenz-Eingabe): noch **nicht** implementiert; bei Bedarf neue Stage einführen, **nicht** Multi-Choice missbrauchen.

### 18.9 Vorbereitungs-Status für unfertige Schulungen

Schulungen, deren Inhalte noch in Recherche/Vorbereitung sind, dürfen als Gerüst eingespielt werden, müssen aber **klar gekennzeichnet** sein:

- Auf Schulungs-Ebene Feld `status: 'preparation'` setzen — die Schulungen-Index-Karte zeigt dann automatisch den Badge „In Vorbereitung".
- Schema-Vollständigkeit ist Pflicht: Jedes Kapitel braucht `pages` (mindestens Platzhalter-Lehrseiten mit `<p><strong>In Vorbereitung.</strong> …</p>` und Scope-Liste) und `quiz` (mindestens eine Schema-konforme Platzhalter-Frage). Kein leeres `pages: []` oder `quiz: []`.
- Quellen-Vorgabe für die spätere Befüllung in der IIFE-Header-Kommentar-Sektion dokumentieren (welche Leitlinien, Lehrbuch-Auflagen, Standards mit Jahr/Version).
- Sobald die Recherche-Datei vorliegt: `status` entfernen, Platzhalter-Pages durch volle didaktische Prosa ersetzen (§18.6), Platzhalter-Quiz durch ≥ 50 quellenbasierte Fragen pro Kapitel ersetzen (§18.4), `CACHE_VERSION` bumpen.
- Beispiel: `js/data/schulung_allgemeinmedizin.js` (Stand: Vorbereitung, wartet auf Recherche-Datei).

---

## 19. Export / Import des Lernfortschritts (plattformübergreifend)

Da der Fortschritt rein in `localStorage` lebt und damit gerätegebunden ist, bietet das Dashboard Buttons zum Export und Import einer **plattform-portablen JSON-Datei**.

### 19.1 Datei-Schema

```json
{
  "format": "smartineer-progress",
  "version": 1,
  "exportedAt": "2026-05-08T12:34:56.000Z",
  "data": {
    "wissen_reloaded_progress_v1": { "<catId>|<level>|<idx>": 1, ... },
    "smartineer_schulungen_v1": { "<trainingId>": { "<chapterId>": { "lastPage": 0, "quizBest": { "score": 8, "total": 10, "date": "..." } } } }
  }
}
```

- Pflichtfelder: `format`, `version`, `data`. `format === 'smartineer-progress'` ist die Validierungs-Magic.
- Erlaubte Storage-Keys im `data`-Objekt sind ausschließlich die in `EXPORT_KEYS` definierten — derzeit `STORAGE_KEY` (Ingenieurs-Track) und `SCHULUNGEN_KEY` (Schulungen-Track).
- **Nicht im Export**: `THEME_KEY`, `INSTALL_DISMISS_KEY`, Schüler-Drill-Zustand. Diese sind gerätespezifisch und sollen beim Wechsel zwischen Geräten **nicht** überschrieben werden.

### 19.2 Verhalten

- **Export**: erzeugt Blob, lädt als `smartineer-fortschritt-<ISO-Stamp>.json` herunter. Funktioniert auf Chrome/Edge/Firefox/Safari (Desktop und mobil). Auf iOS landet die Datei in „Dateien"; per AirDrop/E-Mail portabel.
- **Import**: liest JSON via `FileReader`, validiert `format`/`version`, führt einen **Merge** durch:
  - Ingenieurs-Track: Vereinigung der Solved-Keys (gelöst bleibt gelöst).
  - Schulungen-Track: pro `(training, chapter)` größtes `lastPage` und besseres `quizBest` (höhere Quote gewinnt) wird übernommen.
- Nach erfolgreichem Import: `window.location.reload()`, damit alle Hooks den neuen Storage-Stand lesen.

### 19.3 Erweiterungsregeln

- Neuer Storage-Key (z.B. zukünftiger Schüler-Persistenz-Key) wird ergänzt, indem er in `EXPORT_KEYS` aufgenommen wird **und** ein passender Merge-Pfad in `mergeProgressKey()` definiert wird. Schema-Version bei jeder breaking-change inkrementieren (`EXPORT_VERSION`) und im Import-Pfad alte Versionen migrieren oder ablehnen.
- Niemals personenbezogene Daten in den Export aufnehmen.
- Niemals `THEME_KEY` oder `INSTALL_DISMISS_KEY` in den Export aufnehmen — würde User-Einstellungen auf dem Zielgerät stillschweigend verändern.
- Keine binären Formate (z.B. msgpack, protobuf): das Format muss in jedem Texteditor lesbar bleiben — auch zur manuellen Inspektion und Debugging.

### 19.4 Anti-Pattern

- Export per Cloud-Upload an einen Server — widerspricht der Architektur (kein Backend, keine Telemetrie, §1).
- Import ohne Merge (Hard-Replace als Default) — würde fortgeschrittene Lerner auf dem Zielgerät zurücksetzen.
- Reset des Fortschritts vor dem Import „zur Sicherheit" — bricht die Merge-Garantien.

---

## 20. Responsive Navigation

Die Top-Navigation wird auf Mobil/PWA häufig zu breit, wenn alle Tabs als Text gerendert werden. Daher gilt:

- Desktop ab Tailwind-Breakpoint `md` (≥ 768 px): klassische Text-Labels (`Dashboard`, `Training`, `Cheatsheets`, `Schulungen`, `Schüler`, `Hell/Dunkel`).
- Unter `md`: nur **Icons** (24×24 Inline-SVG, Stroke-only, `currentColor`), Texte sind via `hidden md:inline` ausgeblendet. Brand-Wortmarke „Smartineer" verschwindet unter `sm`, das Logo bleibt sichtbar.
- Jeder Icon-Button hat `title` und `aria-label` mit dem Klartext-Label. Aktiver Tab zusätzlich `aria-current="page"`.
- Icons leben inline in `app.jsx` (`NAV_ICONS`), nicht als separate Asset-Dateien — Service Worker muss nicht zusätzlich cachen.
- Beim Hinzufügen neuer Top-Level-Views: passendes Icon in `NAV_ICONS` ergänzen, sonst rendert die Mobile-Variante leer.
- Keine externen Icon-Bibliotheken (Heroicons-CDN, FontAwesome) — vermeidet zusätzliche CDN-Abhängigkeit und respektiert §1 (keine zusätzlichen Frameworks ohne Diskussion).


