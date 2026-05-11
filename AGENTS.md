# AGENTS.md — Leitfaden für die Weiterentwicklung von Smartineer

Dieses Dokument richtet sich an **menschliche Entwickler** und **AI-Coding-Agents** (Copilot, Claude, etc.), die an diesem Projekt arbeiten. Es definiert verbindliche Konventionen, Pflege-Pflichten und Qualitätsstandards.

> **Lies dieses Dokument, bevor du Änderungen einreichst.**  
> Bei Konflikten gilt: AGENTS.md > README.md > eigener Stil.

> **Modellvorgabe für diesen Workspace:** Nur Claude Opus 4.7 verwenden.

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
- **Keine Binär-Bilder** (PNG/JPG) — App-Icons sind SVG (Performance + git-friendly). **Ausnahme:** Das Brand-Logo (`icons/smartineer-logo.png`) ist eine vorgegebene 3D-Illustration und liegt als optimiertes PNG mit transparentem Hintergrund vor. Es wird seit v60 breit genutzt: Topbar, PWA-Install-Prompt, Favicon (`<link rel="icon">`), Apple-Touch-Icon (`<link rel="apple-touch-icon">`), Open-Graph-/Twitter-Share-Bild sowie als zusaetzlicher PNG-Eintrag im Manifest (`purpose: "any"`, 333x333). Innerhalb der App wird es als Hero-Logo in den Stage-Headern Dashboard, Cheatsheets, Schulungen-Index und Schueler-Index gerendert. Die SVG-Icons (`icons/icon.svg`, `icon-192.svg`, `icon-512.svg`) bleiben Pflicht fuer Maskable-Purpose und als Fallback. Eine vektorisierte, vereinfachte Variante des Brand-Logos liegt zur freien Verwendung in `logo/smartineer-logo-flat.svg`.
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

Optional duerfen Aufgaben zusaetzlich eine **Hint-Leiter** (P-LP-HINT-LADDER, Brilliant-/OpenStax-Pattern) tragen:

```js
{
    q: 'Frage als HTML-String',
    h1: 'Hinweis-Stufe 1 (Idee/Konzept, lenkt nur)',
    h2: 'Hinweis-Stufe 2 (Strategie/Methodenwahl)',
    h3: 'Hinweis-Stufe 3 (konkrete Formel/Schritt)',
    h:  'Klassischer Schluss-Hinweis (wird als letzte Leiter-Stufe gerendert; bleibt Pflichtfeld)',
    s:  'Musterlösung-HTML'
}
```

Reihenfolge im UI: `h1` -> `h2` -> `h3` -> `h`. Der Klassik-Hinweis `h` bleibt **Pflicht** und wird automatisch als letzte Stufe angezeigt. `h1/h2/h3` sind **optional** und einzeln weglassbar — Aufgaben ohne Hint-Leiter rendern wie bisher einstufig. Im Renderer (`TaskView` in `js/app.jsx`) sieht der Lernende einen Button „Hinweis 1 / N", der bei jedem Klick die naechste Stufe aufdeckt; danach „Naechster Hinweis (k / N)", bis alle Stufen offen sind.

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

### Optionale Lernplattform-Metadaten

Aufgaben duerfen zusaetzlich die optionalen Felder `lo`, `bloom`, `difficulty`, `tags`, `source` tragen (siehe §22). Sie werden vom Renderer ignoriert und ueber den Adapter `toItem(...)` als kanonische Felder verfuegbar gemacht — Voraussetzung fuer kuenftige Pruefungs-/Mastery-Modi (P-LP-EXAM-MODE, P-LP-MASTERY) und kompetenzorientierte Auswertung.

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

- Ingenieurs-Track: Storage-Key `wissen_reloaded_progress_v1`, Format `{ "<catId>|<level>|<idx>": 1, ... }`. Identitaet ueber `(catId, level, idx)`.
- Schulungen-Track: Storage-Key `smartineer_schulungen_v2` (vorher `_v1`; gleiche Form, Versions-Bump zur Symmetrie mit SRS). v1 bleibt nach der Migration als Fallback im Storage.
- Spaced Repetition: Storage-Key `smartineer_srs_v2`. **Schluessel-Identitaet ist die stable QID (content-Hash), nicht der `idx`** — siehe §18.3 / P-ARCH-STABLE-QID. Damit ueberleben Karteikarten beliebige Quiz-Item-Umsortierungen innerhalb eines Kapitels. Migration v1 -> v2 laeuft genau einmal beim App-Start; v1 bleibt unangetastet. Seit v50 (P-LP-SRS-OPEN) deckt der gleiche Storage-Tree auch den Ingenieurs-Track ab — er wird unter dem synthetischen Trainings-Schluessel `__training__` gefuehrt, mit `chapterId = catId` und `qid` aus `stableQid({q,s})`. Schema unveraendert; kein Versions-Bump noetig.
- **Wenn sich die Reihenfolge (`idx`) bestehender Aufgaben aendert**, kann der Lernfortschritt eines Users falschen Aufgaben zugeordnet werden — gilt fuer alle Tracks, deren Identitaet noch ueber `idx` laeuft (Ingenieurs-Track, Schueler-Pools). Daher:
  - **Neue Aufgaben bevorzugt anhaengen**, nicht mittendrin einsortieren.
  - Wenn eine inhaltliche Umsortierung **doch** noetig ist, Storage-Key bumpen (`_vN`) und in Release-Notes erwaehnen.
  - Schulungen-Quiz sind seit Stable-QID **gegen Umsortierung resistent**, solange `q` + Antwort-Felder identisch bleiben — Aenderungen am Frage-Stem oder an der korrekten Antwort erzeugen einen neuen `qid` und damit eine neue Karteikarte.
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
2. **`node tools/validate.js --strict-sources`** — Datenschema-Validator (P-ARCH-VALIDATE-CLI / P-ARCH-STRICT-SOURCE-VALIDATION). Prueft alle drei Tracks (`window.APP_DATA`, `window.SCHULUNGEN.list`, `window.SCHUELER`) gegen das in AGENTS §5/§17/§18 definierte Schema: Pflichtfelder, MCQ-`correct`-Range, `pages.length>=1`, Quiz-Mindestmenge (Bootstrap ≥ 10 als Fehler, Soll ≥ 50 als Warnung; `status: 'preparation'` darf unter Soll bleiben, AGENTS §18.9), Quellenanker-Heuristik in `explanation`, Dubletten je Kapitel/Level, Schulungs-/Kapitel-IDs eindeutig, `sw.js`-`APP_SHELL`-Sync. Im Strict-Mode werden fehlende Quellenanker bei Quiz-Items als blockierende Fehler behandelt. Mit `--verbose` werden alle Warnungen einzeln gelistet, sonst pro Klasse die ersten 5.
3. `index.html` lokal öffnen, alle 11 Kategorien durchklicken, mind. eine L1/L2/L3-Aufgabe je Kategorie betrachten — KaTeX rendert?
4. Cheatsheet-Reiter "Formeln" und "Musterlösungen" prüfen — keine Render-Fehler?
5. Dashboard: Radar zeigt alle 11 Kategorien?
6. "Fortschritt zurücksetzen" funktioniert?

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

Optionales Kapitelfeld `learningObjectives` (P-ARCH-LO-COMPETENCE, seit v51): Liste `[{ id: 'LO-<KAP>-<N>', text: '…' }]`. Die LO-IDs werden von Quiz-Items im Feld `lo: ['LO-…']` referenziert; zusaetzliche Themen-Tags liegen in `tags: ['Standard', 'Bereich']`. Die Quiz-Result-Heatmap (`js/app.jsx`, Stage `quizResult`) aggregiert ok/total je `lo` und je `tag` und faerbt gruen (≥ 80 %) / gelb (50-79 %) / rot (< 50 %). Die Heatmap rendert nur, wenn das Kapitel `learningObjectives` definiert oder mindestens ein Item `lo`/`tags` traegt — Kapitel ohne LO-Pflege bleiben unveraendert. Beispielkapitel: Cybersec Kap. 5 (`risk`) in `js/data/schulung_master_et_cybersec.js` mit den Konstanten `RISK_LEARNING_OBJECTIVES` und `RISK_LO_TAGS` (Index-Bereiche -> lo+tags via Post-Process-Mutation).

Lehrseiten (`pages[i]`) duerfen seit v52 (P-LP-FEEDBACK-LINKS) ebenfalls die optionalen Felder `lo: ['LO-…']` und `tags: ['…']` tragen. Im Quiz-Result-Screen wird pro falsch beantwortetem Item, das `lo`/`tags` traegt, ein Direktlink "Lehrseite nachlesen: <Titel>" angezeigt; gematcht wird mit Score = `lo`-Schnitt × 3 + `tag`-Schnitt, Top-2-Treffer mit Score > 0. Klick navigiert via `openChapter(chapter.id, pageIndex)` an die Reader-Position. Ueberspringt den Wiederholungs-Modus (Karten aus mehreren Kapiteln).

Quiz-Items duerfen zusaetzlich die optionalen Lernplattform-Metadaten `lo`, `bloom`, `difficulty`, `tags`, `source` tragen — siehe §22 (einheitliches Item-Schema, Adapter `toItem`). Diese Felder sind kompatibel mit MCQ-, Sequence- und Cloze-Items.

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

- Eigener Storage-Key `smartineer_schulungen_v2` (vorher `_v1`; Versions-Bump fuer Symmetrie mit SRS, Shape unveraendert). **Niemals** an `wissen_reloaded_progress_v1` oder `smartineer_schueler_*` mischen.
- Spaced-Repetition-Karteikarten leben separat in `smartineer_srs_v2` mit Schema `{ [trainingId]: { [chapterId]: { [qid]: { ease, interval, due (YYYY-MM-DD), reps, lapses, last } } } }`. SM-2 lite: bei richtiger Antwort Intervall aus `[1,3,7,16,35,70,140]` (Tage) je nach `reps`; bei falscher Antwort `reps=0`, Intervall 1 Tag, `ease -= 0.2`. Item-Identitaet ist seit P-ARCH-STABLE-QID die **stable QID** (FNV-1a-Hash ueber Frage-Stem + antwortdefinierende Felder, siehe `stableQid()` in `js/app.jsx`). Quiz-Items duerfen damit umsortiert werden, ohne den Lernstand zu verlieren — aber Aenderungen am Frage-Stem oder am korrekten Antwort-Text erzeugen einen neuen `qid` und damit eine neue Karte. Migration v1 -> v2 (idx -> qid) laeuft einmalig beim App-Start; v1 (`smartineer_srs_v1`) bleibt als Fallback liegen.
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
  - **Ausnahme medizinische Schulungen**: Pruefungen nach IMPP-Stil (z.B. Allgemeinmedizin, M1/M2/M3) verwenden traditionell 5 Optionen (A-E). Fuer diese Schulungen sind 5 Optionen erlaubt; das Quiz-UI rendert beliebig viele Eintraege via `options.map`. In allen anderen Schulungen bleibt es bei 4 Optionen.
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
- **Optionaler Inline-Selbstcheck (P-LP-INLINE-CHECK, seit v53):** Eine Lehrseite darf zusaetzlich ein optionales Feld `check = { stem, options:[...], correct:<idx>, explanation }` tragen. Der Reader rendert darunter eine formative MCQ-Box mit "Pruefen"/"Erneut versuchen". Keine Persistenz, keine SRS-Karte, keine Wertung — die Frage zaehlt nicht zum Kapitel-Quiz. Das eigentliche Kapitel-Quiz bleibt im `quiz`-Array (§18.1) die einzige bewertete Pruefung. Empfehlung: nicht jede Seite braucht einen Check; setze ihn dort, wo eine konzeptionelle Schluesselentscheidung typische Fehleinordnungen provoziert (z.B. Scoring-Priorisierung, Verteilung von Pflichten, Schluesselwahl).

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
- **PBQ-Style-Aufgaben**: Reihenfolge- und Lückentext-Items werden im selben `quiz`-Array wie MCQ gehalten und über das Feld `type` unterschieden (`'sequence'` bzw. `'cloze'`). MCQ-Items lassen `type` weg (Default). Schema:
  - Sequence: `{ type: 'sequence', q: 'Frage', items: ['A','B','C'], correct: [2,0,1], explanation: 'Quelle' }` — `correct` ist die Reihenfolge der `items`-Indizes. UI rendert Up/Down-Buttons (kein externes Drag-Drop-Lib, siehe §1).
  - Cloze: `{ type: 'cloze', q: 'Text mit ___ Lücken', blanks: [{ label: 'Anzeige', accept: ['hauptantwort','synonym'] }], explanation: 'Quelle' }` — pro Lücke ein Text-Input; Vergleich nach `normalizeAnswer` (trim, lowercase, kollabierte Whitespace).
  - Trainings-Spiegelung: `mcqOnly()` filtert PBQ-Items aus, da das Trainings-Backend nur MCQ erwartet. Neue Quiz-Typen analog filtern.
  - Drag-Drop mit Maus: bewusst **nicht** implementiert; Up/Down-Buttons sind didaktisch gleichwertig und erfordern keine Framework-Erweiterung.

### 18.9 Vorbereitungs-Status für unfertige Schulungen

Schulungen, deren Inhalte noch in Recherche/Vorbereitung sind, dürfen als Gerüst eingespielt werden, müssen aber **klar gekennzeichnet** sein:

- Auf Schulungs-Ebene Feld `status: 'preparation'` setzen — die Schulungen-Index-Karte zeigt dann automatisch den Badge „In Vorbereitung".
- Schema-Vollständigkeit ist Pflicht: Jedes Kapitel braucht `pages` (mindestens Platzhalter-Lehrseiten mit `<p><strong>In Vorbereitung.</strong> …</p>` und Scope-Liste) und `quiz` (mindestens eine Schema-konforme Platzhalter-Frage). Kein leeres `pages: []` oder `quiz: []`.
- Quellen-Vorgabe für die spätere Befüllung in der IIFE-Header-Kommentar-Sektion dokumentieren (welche Leitlinien, Lehrbuch-Auflagen, Standards mit Jahr/Version).
- Sobald die Recherche-Datei vorliegt: `status` entfernen, Platzhalter-Pages durch volle didaktische Prosa ersetzen (§18.6), Platzhalter-Quiz durch ≥ 50 quellenbasierte Fragen pro Kapitel ersetzen (§18.4), `CACHE_VERSION` bumpen.
- Beispiel: `js/data/schulung_allgemeinmedizin.js` (Stand: Vorbereitung, wartet auf Recherche-Datei).

### 18.10 Pruefungen (Assessments)

Seit v54 (`P-ARCH-ASSESSMENT-ENGINE`) unterstuetzt der Schulungen-Track einen **Pruefungsmodus** parallel zum Kapitel-Quiz und zum SRS-Wiederholungs-Modus. Pruefungen sind in der Schulungs-Datei als optionales Top-Level-Feld `assessments: [...]` deklariert und werden auf der Kapiteluebersicht in einer eigenen Sektion „Pruefungsmodus" angeboten.

**Schema** (pro Eintrag):

```js
{
    id: 'mock-module-final',     // Pflicht. Eindeutig je Schulung, snake_case, nie aendern (Persistenz!).
    title: 'Modul-Mock-Pruefung',// Pflicht. Anzeige.
    type: 'module',              // Optional: 'module'|'final'|'practice'|'chapter'. Reiner Tag.
    poolFilter: {                // Optional. Default {} = alle Kapitel, alle MCQ-Items.
        chapter: ['risk', 'aisec'],  // Whitelist Kapitel-IDs. Default: alle Kapitel.
        lo: ['aisec.governance.*'],  // Optional, future use.
        tags: ['compliance']          // Optional, future use.
    },
    count: 30,                   // Pflicht. Anzahl Items pro Versuch (Fisher-Yates aus dem Pool).
    timeLimit: 60,               // Optional, in Minuten. 0/undefined = ohne Zeitlimit.
    passScore: 0.6,              // Optional, 0..1. Anteil korrekter Antworten zum Bestehen.
    seed: 'mock-final-v1'        // Optional. String. Wenn gesetzt, deterministischer Shuffle ueber mulberry32(hashStringToSeed(tid+asmtId+seed)) - selbe Item-Auswahl bei jedem Versuch. Geeignet fuer Mock-Pruefungen mit fixem Pool; weglassen fuer reine Stichprobenpruefungen.
}
```

**Semantik:**

- **Kein Per-Item-Feedback waehrend des Laufs.** Alle Antworten werden gesammelt; Ergebnis erst am Ende. Unterscheidet Pruefung vom Kapitel-Quiz (das ohnehin erst am Ende auswertet, aber innerhalb eines Kapitels) und vom SRS-Wiederholungs-Modus (gleiches Verhalten).
- **Pool wird zur Laufzeit gebaut** ueber `buildAssessmentPool(training, filter)` aus den MCQ-Items aller Kapitel, die `poolFilter.chapter` matcht (Default: alle Kapitel). Sequence- und Cloze-Items werden nicht aufgenommen (Trainings-Spiegelung, siehe §18.8 `mcqOnly`).
- **Timer**: Wenn `timeLimit > 0`, laeuft ein Countdown. Beim Ablauf werden alle noch nicht beantworteten Items als falsch gewertet und das Ergebnis automatisch festgeschrieben (`finishAssessmentExpired`). Pill ist amber unter 5 min, rot unter 1 min.
- **Pass/Fail-Badge** im Result-Screen nur, wenn `passScore` gesetzt ist. Sonst nur Quote.
- **SRS-Integration**: Antworten werden zusaetzlich als SRS-Updates an die zugehoerigen Karten geschickt (gleiche `srsGradeMany`-Logik wie Kapitel-Quiz). Pruefungs-Versuch traegt also zum Lernstand bei.
- **Persistenz**: `state[trainingId].__assessments[asmtId] = { attempts, lastResult: { score, total, date, passed }, bestScore: { score, total, date, ratio } }`. Doppelter Underscore-Prefix `__assessments` verhindert Kollision mit Kapitel-IDs im selben Tree. Gespeichert im Storage-Key `smartineer_schulungen_v2`.
- **Abbruch** via Cancel-Button: Versuch wird **nicht** gezaehlt (kein `attempts++`, kein `lastResult`). Zeit-Ablauf hingegen zaehlt als regulaer beendeter Versuch.
- **Reproduzierbarkeit via `seed`** (seit v55, P-ARCH-CROSS-CHAPTER-EXAM): Ist `seed` gesetzt, baut `startAssessment` den Shuffle aus `mulberry32(hashStringToSeed(<tid>:<asmtId>:<seed>))` anstelle von `Math.random`. Resultat: jeder Versuch derselben Pruefung zieht *dieselben* Items in derselben Reihenfolge. Geeignet fuer Mock-Pruefungen, die zwischen Lernenden vergleichbar sein sollen. Wer Variation will, laesst `seed` weg.

**Erweiterungsregeln:**

- Neue Pruefung anlegen: Eintrag an `assessments` der Schulung anhaengen. Reihenfolge irrelevant. `id` darf nie nachtraeglich geaendert werden (sonst neuer Eintrag in `__assessments`, Bestleistung verloren).
- Pruefung umbenennen (`title` aendern): erlaubt; `id` bleibt stabil.
- Pruefung **entfernen**: Eintrag aus `assessments` loeschen. `__assessments[asmtId]` bleibt als Karteileiche im Storage liegen — schadet nicht, da kein Render-Pfad mehr darauf zugreift.
- Pool-Erweiterung (neue Kapitel hinzufuegen): automatisch, sofern `poolFilter.chapter` nicht hartkodiert ist. Bei `poolFilter: {}` werden alle aktuellen Kapitel beruecksichtigt.
- **Validator**: `tools/validate.js` prueft Pflichtfelder `id`/`title`/`count` und dass `count <= pool.length` ist (Pool aus aktuell konfigurierten Kapiteln). Mehrere Pruefungen mit gleicher `id` -> Fehler.

**Anti-Pattern:**

- Pruefungs-Versuche in `wissen_reloaded_progress_v1` schreiben — verletzt Track-Trennung.
- Per-Item-Feedback im Pruefungsmodus nachruesten — verletzt die didaktische Semantik (closed-book exam simulation). Wer formative Inline-Checks will, nutzt `P-LP-INLINE-CHECK` (§18.6) auf Lehrseiten.
- Sequence-/Cloze-Items in Pool aufnehmen — verletzt MCQ-only-Konvention der Pruefung. Falls in Zukunft PBQ-Sektionen gewuenscht, eigener Pool-Pfad mit eigener Item-Renderer-Logik.
- `id` einer Pruefung umbenennen — Persistenz bricht. Stattdessen neue Pruefung anlegen.
- `count` so hoch setzen, dass `count > pool.length`. Validator faengt das; UI deaktiviert Start-Button bei leerem Pool.

**Referenz-Implementierung:** Alle produktiven Schulungen tragen seit v55 ein Top-Level-Feld `assessments` mit mindestens einer Mock-Pruefung. Vorlage / Erstausstattung: `js/data/schulung_master_et_cybersec.js` (Modul-Mock + Risk-Fokus, ohne `seed`). Seed-Beispiele (deterministischer Shuffle): `schulung_starter.js` (Security+, CySA+, PenTest+ — je 40-Item-Final + 20-Item-Domain-Practice), `schulung_securityx.js` (CASP+-Final), `schulung_master_et_automation.js` (Modul-Mock + Antrieb/Feldbus-Practice), `schulung_allgemeinmedizin.js` (M1-/M2-/Facharzt-Mocks).

### 18.11 Glossar (P-ARCH-GLOSSARY)

Seit v59 darf eine Schulung ein optionales **Glossar** als Top-Level-Feld `glossary: [...]` fuehren. Glossar-Eintraege werden im Lehrtext und in Quiz-Erlaeuterungen via Marker referenziert und im Reader als kompakte Detail-Karte (Modal) aufgeloest. Ziel: Standards/Abkuerzungen (NIS2, CRA, CVSS v4.0, ML-KEM, …) ein Mal sauber definieren und im Kontext verlinken, statt sie auf jeder Lehrseite neu erklaeren zu muessen.

**Schema:**

```js
{
    glossary: [
        {
            id: 'isms',                                           // Pflicht. snake-/kebab-case, eindeutig je Schulung, nie aendern (Marker-Drift in HTML-Strings!).
            term: 'ISMS — Information Security Management System',// Pflicht. Anzeige im Modal-Header.
            definition: 'Systematischer Managementrahmen ...',    // Pflicht. Plain-Text bzw. enges HTML (s.u.).
            source: 'ISO/IEC 27001:2022, §4-10 sowie Annex A.'    // Pflicht. Standard + Jahr + Abschnitt (AGENTS §8 / §18.5).
        }
    ]
}
```

**Marker-Syntax** in `pages[*].html` und in `quiz[*].explanation`:

- `[[glossary:id]]` -> rendert den `term` als klickbaren Link.
- `[[glossary:id|Sichtbarer Text]]` -> rendert „Sichtbarer Text" als klickbaren Link, behaelt aber denselben Eintrag.

Der Adapter `applyGlossary(html, glossaryMap)` in `js/app.jsx` ersetzt jeden Marker durch `<button type="button" class="glossary-link" data-gid="<id>" aria-label="Glossar: <term>">Label</button>`. Ein Document-Level-Click-Listener im `Schulungen`-Component faengt Klicks auf `.glossary-link[data-gid]` und oeffnet das Modal mit Term, Definition und Quelle. Schliessen via Backdrop, „Schliessen"-Button oder ESC-Taste (im Modal-Component).

**UX-Vertrag:**

- Modal ist read-only — keine Verlinkung zu anderen Seiten, keine Bearbeitung. Bei Bedarf in der naechsten Stufe (P-ARCH-CROSSLINK) auf „springe zur Lehrseite" erweitern.
- Sichtbar nur in Reader-, Quiz- und Quiz-Result-Stage (dort koennen Marker auftauchen). Im Stage-Index/Chapters-Stage wird das Modal nicht eingehaengt — Marker tauchen dort nicht auf.
- KaTeX in `definition` ist erlaubt; Backslashes wie ueblich verdoppeln.

**HTML-Constraints fuer `definition`:**

- Plain-Text bevorzugt. Erlaubte Tags: `<strong>`, `<em>`, `<code>`, `<br>`, KaTeX (`$...$`, `$$...$$`).
- **Keine** `<script>`, `<style>`, externen Bilder, Links zu externen URLs, Inline-Eventhandler. Modal rendert via `dangerouslySetInnerHTML` — daher gilt §10 (nur Maintainer-gepflegte Inhalte, **keine** User-Eingaben).
- Sprache: Deutsch; englische Fachbegriffe in Klammern.

**Erweiterungsregeln:**

- **Neuer Eintrag:** an `glossary`-Array anhaengen. Reihenfolge im Modal irrelevant (Lookup ueber `id`).
- **Eintrag umbenennen:** `term`/`definition`/`source` aendern erlaubt. `id` **nie** aendern — sonst werden alle existierenden Marker zu „unbekannt".
- **Marker setzen:** Entweder direkt im HTML-String oder per Post-Process-Mutation der Page-Variable (Beispiel: `PAGE_RISK_REGULATIONS.html = PAGE_RISK_REGULATIONS.html.replace('NIS2-Richtlinie (EU) 2022/2555', '[[glossary:nis2|NIS2-Richtlinie (EU) 2022/2555]]')`). First-Match-Replace bevorzugt, damit das Lehrbild „Begriff einmal verlinkt, danach normal lesen" entsteht.
- Mindest-Pflege pro Schulung mit aktivem Glossar: **mindestens 30 Eintraege** zum Start (Cybersec-Schulung erfuellt das, siehe `GLOSSARY_CYBERSEC`). Weitere Schulungen werden bei eigenem Glossar-Rollout (z.B. P-ARCH-GLOSSARY-AUTO) inkrementell befuellt.

**Anti-Pattern:**

- `id` einer Glossar-Karte umbenennen — bricht alle bestehenden `[[glossary:id]]`-Marker im Lehrtext.
- Marker in den Frage-Stem (`q`) oder in Antwort-Optionen (`options[]`) eines Quiz-Items setzen — wuerde die Antwort verraten oder die Lesbarkeit kaputtmachen. Marker gehoeren in `pages[*].html` und in `quiz[*].explanation` (Quiz-Result-Phase).
- Marker im Schueler-Track (§17) — nicht vorgesehen.
- Externer Quellverweis (Link auf https://…) im `definition` — widerspricht §1 (keine Telemetrie, keine externe Datenabhaengigkeit).

**Referenz-Implementierung:** `GLOSSARY_CYBERSEC` in `js/data/schulung_master_et_cybersec.js` (37 Eintraege; Standards, Frameworks, kryptographische Primitive). Demo-Marker eingeseedet in `PAGE_RISK_ISMS`, `PAGE_RISK_BSI_27005`, `PAGE_RISK_REGULATIONS`, `PAGE_RISK_SCORING` sowie in einer Quiz-Erlaeuterung in `QUIZ_RISK`.

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
    "smartineer_schulungen_v2": { "<trainingId>": { "<chapterId>": { "lastPage": 0, "quizBest": { "score": 8, "total": 10, "date": "..." } } } },
    "smartineer_srs_v2": { "<trainingId>": { "<chapterId>": { "<qid>": { "ease": 2.5, "interval": 7, "due": "2026-05-16", "reps": 3, "lapses": 0, "last": "2026-05-09" } } } },
    "smartineer_reader_notes_v1": { "<trainingId>": { "<chapterId>": { "<pageIdx>": "Plain-Text-Notiz" } } },
    "smartineer_reader_bookmarks_v1": { "<trainingId>": { "<chapterId>": { "<pageIdx>": true } } }
  }
}
```

- Pflichtfelder: `format`, `version`, `data`. `format === 'smartineer-progress'` ist die Validierungs-Magic.
- Erlaubte Storage-Keys im `data`-Objekt sind ausschließlich die in `EXPORT_KEYS` definierten: `STORAGE_KEY` (Ingenieurs-Track), `SCHULUNGEN_KEY` (Schulungen-Track), `SRS_KEY` (Spaced Repetition v2), `READER_NOTES_KEY` (Reader-Notizen, P-LP-NOTES-BOOKMARKS) und `READER_BOOKMARKS_KEY` (Reader-Bookmarks, P-LP-NOTES-BOOKMARKS).
- **Nicht im Export**: `THEME_KEY`, `INSTALL_DISMISS_KEY`, Schüler-Drill-Zustand. Diese sind gerätespezifisch und sollen beim Wechsel zwischen Geräten **nicht** überschrieben werden.

### 19.2 Verhalten

- **Export**: erzeugt Blob, lädt als `smartineer-fortschritt-<ISO-Stamp>.json` herunter. Funktioniert auf Chrome/Edge/Firefox/Safari (Desktop und mobil). Auf iOS landet die Datei in „Dateien"; per AirDrop/E-Mail portabel.
- **Import**: liest JSON via `FileReader`, validiert `format`/`version`, führt einen **Merge** durch:
  - Ingenieurs-Track: Vereinigung der Solved-Keys (gelöst bleibt gelöst).
  - Schulungen-Track: pro `(training, chapter)` größtes `lastPage` und besseres `quizBest` (höhere Quote gewinnt) wird übernommen.
  - SRS-Karteikarten: pro `qid` der spaetere `last`-Stempel gewinnt.
  - Reader-Notizen (P-LP-NOTES-BOOKMARKS): pro `(tid, cid, pageIdx)` gewinnt der laengere Plain-Text-String (mehr geschriebene Notiz schlaegt kuerzere); leerer String entfernt die Notiz lokal vor dem Schreiben.
  - Reader-Bookmarks (P-LP-NOTES-BOOKMARKS): Set-Vereinigung pro `(tid, cid)`; ein gesetzter Bookmark bleibt gesetzt.
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
- HTML, Skript oder personenbezogene Daten in Reader-Notizen schreiben — Notizen sind Plain-Text und werden vom Reader nicht als HTML gerendert. Wer Querverweise auf Standards/Quellen pflegen will, nutzt die offizielle `lo`/`tags`/`source`-Metadaten-Pflege (AGENTS §22) oder spaeter das Glossar (P-ARCH-GLOSSARY).

---

## 20. Responsive Navigation

Die Top-Navigation wird auf Mobil/PWA häufig zu breit, wenn alle Tabs als Text gerendert werden. Daher gilt:

- Desktop ab Tailwind-Breakpoint `md` (≥ 768 px): klassische Text-Labels (`Dashboard`, `Training`, `Cheatsheets`, `Schulungen`, `Schüler`, `Hell/Dunkel`).
- Unter `md`: nur **Icons** (24×24 Inline-SVG, Stroke-only, `currentColor`), Texte sind via `hidden md:inline` ausgeblendet. Brand-Wortmarke „Smartineer" verschwindet unter `sm`, das Logo bleibt sichtbar.
- Jeder Icon-Button hat `title` und `aria-label` mit dem Klartext-Label. Aktiver Tab zusätzlich `aria-current="page"`.
- Icons leben inline in `app.jsx` (`NAV_ICONS`), nicht als separate Asset-Dateien — Service Worker muss nicht zusätzlich cachen.
- Beim Hinzufügen neuer Top-Level-Views: passendes Icon in `NAV_ICONS` ergänzen, sonst rendert die Mobile-Variante leer.
- Keine externen Icon-Bibliotheken (Heroicons-CDN, FontAwesome) — vermeidet zusätzliche CDN-Abhängigkeit und respektiert §1 (keine zusätzlichen Frameworks ohne Diskussion).

---

## 21. Arbeitspakete (Session-Plan, verbindlich)

Smartineer wird in **mobilen Agent-Sessions** weiterentwickelt. Damit jede Session einen klaren Auftrag hat und nichts zwischen Sessions verloren geht, existiert die Datei **`WORKPACKAGES.md`** im Repo-Root.

**Pflicht-Workflow fuer jede Session (auch mobil):**

1. **Sichten.** Zu Beginn jeder Session zuerst `WORKPACKAGES.md` lesen und einen **Session-Batch** bestimmen. Der Batch enthaelt die optimale Anzahl an Paketen, die in der verfuegbaren Session realistisch sauber erledigt werden koennen. Ziel ist volle Session-Ausnutzung, nicht kuenstlich ein Paket pro Session.
    - Wenn der User explizit ein oder mehrere Pakete nennt (z.B. "P-CYBERSEC-05" oder "P-AUTO-05 und P-AUTO-06") → diese Pakete bilden den Start des Batches. Weitere passende Pakete duerfen ergaenzt werden, sofern der User nicht ausdruecklich "nur" dieses Paket verlangt.
    - Sonst das Paket bzw. die Paketgruppe aus Abschnitt **E) Naechste empfohlene Session** als Batch-Anker uebernehmen.
    - Sonst das erste Paket mit `status: ready` (in der Reihenfolge A → B → C → D) als Batch-Anker waehlen.
    - Danach kompatible `ready`-Pakete ergaenzen, bis der Batch eine sinnvolle Session-Groesse erreicht: gleicher Themenblock, gleiche Datei, gemeinsamer Validator-/Cache-Bump, Blocker-Abbau, Quick-Wins oder fachlich eng zusammenhaengende Top-ups.
    - Batch nicht erweitern, wenn das naechste Paket eigene Quellenrecherche, eigenes didaktisches Lehrseitenpaket oder ein separates Validierungsrisiko braucht und dadurch Qualitaet, wissenschaftliche Korrektheit oder Status-Report leiden wuerden.
2. **Locken.** Status aller Pakete im Session-Batch in `WORKPACKAGES.md` auf `in-progress` setzen, bevor inhaltlich gearbeitet wird. Pakete, die am Ende doch nicht begonnen wurden, muessen im Abschluss-Update wieder auf `ready` oder `blocked` zurueckgestellt und im Status-Report erwaehnt werden.
3. **Bearbeiten.** Pakete gemaess ihren Akzeptanzkriterien abschliessen (siehe AGENTS §0, §8, §18.4–18.6 fuer Master-Kapitel; §9 fuer Aufgabenkategorien). Innerhalb des Batches wird sequenziell gearbeitet; nach jedem fertigen Paket wird entschieden, ob noch genug Session-Budget fuer das naechste Batch-Paket inklusive Validierung bleibt.
4. **Abschliessen.** Erledigte Pakete auf `done (v<CACHE_VERSION>, Sitzung YYYY-MM-DD)` setzen. Teilweise erledigte Pakete bleiben auf `in-progress` und erhalten im Eintrag den genauen Stand (z.B. "Lehrseiten fertig, Quiz 30/50"). Nicht begonnene Batch-Pakete werden nicht als `in-progress` liegen gelassen.
5. **Naechsten Vorschlag setzen.** Abschnitt **E) Naechste empfohlene Session** in `WORKPACKAGES.md` mit dem konkret naechsten Paket oder Batch aktualisieren (mit Begruendung in einem Satz). Der Vorschlag soll die verbleibenden Blocker und den groessten Nutzen fuer die naechste Session priorisieren.
6. **Status-Report.** Im finalen Status-Report (AGENTS §0/§0.1) alle erledigten, teilweise erledigten und bewusst nicht begonnenen Batch-Pakete nennen sowie den naechsten Paket-/Batch-Vorschlag explizit auffuehren.

**Pflege der Pakete:**

- **Neue Anforderungen** (User-Wunsch, neuer Bug, neue Schulung, neue Kategorie) werden vom Agent **selbst** als neue P-...-Eintraege in `WORKPACKAGES.md` aufgenommen. Naming: `P-<BEREICH>-<KENNUNG>` (z.B. `P-UI-DARKMODE-FIX`, `P-CAT-NEW-MECHATRONIK`).
- **Pakete aufteilen**, wenn der Aufwand ein sinnvolles Batch-Budget sprengen wuerde (z.B. mehr als ein Master-Kapitel mit 4 Lehrseiten + 50 MCQ oder ein grosser Quellen-Audit-Block). Suffix `-A`/`-B`/...
- **Pakete blockieren** (z.B. abhaengig von vorherigem Paket): Status `blocked: <Verweis>`. Auflocken erfolgt automatisch, sobald das Vorpaket auf `done` gesetzt wird.
- **Roll-Forward (AGENTS §0.1):** Das Statusfeld in `WORKPACKAGES.md` ist die einzige Wahrheitsquelle fuer den Roadmap-Zustand. Status-Report bezieht sich auf die Eintraege dort.
- **Cache-Version** bei jeder Paket-Erledigung, die App-Shell oder Daten-Skripte aendert, in `sw.js` bumpen (siehe §14a).

**Konvention fuer mobile Agent-Sessions:**

- Mobile-Trigger: User schickt einen kurzen Prompt wie "neue Session bitte" oder nennt direkt ein Paket-Kuerzel. Der Agent sichtet `WORKPACKAGES.md`, waehlt deterministisch einen Session-Batch (kein Raten), bestaetigt den Batch im ersten Output-Satz und liefert am Ende Roll-Forward + naechsten Paket-/Batch-Vorschlag.
- Keine Session ohne Update von `WORKPACKAGES.md`: auch eine reine Bugfix-Session muss mindestens einen Done-Eintrag, einen aktualisierten Batch-Stand und ggf. einen neuen P-UI-... Eintrag setzen.

---

## 22. Einheitliches Item-Schema (Training / Schulung / Schueler)

Smartineer haelt drei getrennte Tracks (Ingenieurs-Training §5, Schulungen §18, Schueler §17) mit historisch unterschiedlich geformten Item-Objekten. Damit kuenftige Lernplattform-Mechaniken (Stable-QID, Pruefungs-/Mastery-Modus, kompetenzorientierte Auswertung, kapitelübergreifender Glossar/Crosslink, Daily-Mix) **einheitlich** auf alle drei Tracks zugreifen koennen, gibt es ein gemeinsames Laufzeit-Schema und einen Adapter `toItem(legacy, ctx)` in `js/app.jsx`.

**Wichtig:** Es gibt **keine Massen-Migration** der Daten-Skripte. Die Datenformate aus §5 (Training: `{q, h, s}`) und §18.1 (Schulung: `{q, options, correct, explanation}` bzw. `{type:'sequence'|'cloze', ...}`) sowie §17.1 (Schueler: `{q, a}`) bleiben unveraendert die Quelle der Wahrheit. Der Adapter hebt sie zur Laufzeit auf das Schema; Renderer koennen wahlweise legacy oder unified zugreifen.

### 22.1 Kanonische Item-Form

```js
{
    id,           // Best-Effort-Referenz aus dem Kontext (kind/catId/level/idx). Fuer persistente Item-Identitaet die separate `qid` verwenden.
    qid,          // Stable QID — FNV-1a-32-Hash ueber Frage-Stem + antwortdefinierende Felder (P-ARCH-STABLE-QID, AGENTS §11/§18.3).
    type,         // 'training' | 'mcq' | 'sequence' | 'cloze' | 'schueler'
    stem,         // Frage-/Aufgabentext als HTML (entspricht Legacy `q`)
    h, s,         // Training: Hinweis / Musterloesung (HTML)
    a,            // Schueler: Musterantwort (Plain-Text, vergleicht via normalize())
    options,      // MCQ: Antwortoptionen
    correct,      // MCQ: Index | Sequence: Reihenfolge der Item-Indizes
    explanation,  // MCQ / Sequence / Cloze: Quellenanker-Erlaeuterung
    items,        // Sequence: zu sortierende Bloecke
    blanks,       // Cloze: Liste { label, accept:[...] }
    // Optionale Lernplattform-Metadaten (Pflege schrittweise; default-leer):
    lo,           // Lernziel-ID (Modulhandbuch / Curriculum-Matrix), z.B. 'control.imc.equivalence'
    bloom,        // Bloom-Stufe: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
    difficulty,   // 'easy' | 'medium' | 'hard'  bzw. 'L1' | 'L2' | 'L3' (Training)
    tags,         // string[] (Themen-/Standard-Tags), Default []
    source,       // Quellenanker (Lehrbuch + Auflage + Paragraph; Standard + Version + Abschnitt)
    _legacy       // Original-Objekt fuer Code-Pfade, die noch direkt auf Legacy-Felder zugreifen
}
```

### 22.2 Adapter-Aufruf

```js
// Training:
const item = toItem(task, { kind: 'training', catId, level: lvl, idx });

// Schulung-Quiz:
const item = toItem(quizItem, { kind: itype /* 'mcq' | 'sequence' | 'cloze' */, tid, cid, idx });

// Schueler:
const item = toItem(drillItem, { kind: 'schueler', classId, subject, idx });
```

`kind` ist optional — der Adapter erkennt den Typ sonst aus dem Shape (`type`-Feld, `options`/`a`/`h+s`).

### 22.3 Beispiele pro Track

**Training (`js/data/control.js`, L3 IMC-Aufgabe)** — Legacy `{q,h,s}` mit optionalen Metadaten:

```js
{
    q: 'IMC: ... Gib den IMC-Regler $G_R$ und den klassischen Regler $G_C$ an.',
    h: 'IMC-Regler: $G_R = G_S^{-1} F$ ...',
    s: '... $$\\boxed{G_C(s)=...}$$',
    lo: 'control.imc.equivalence',
    bloom: 'apply',
    difficulty: 'L3',
    tags: ['imc', 'robust-control', 'tuning'],
    source: 'Skogestad & Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §2.4'
}
```

**Schulung-MCQ (`js/data/schulung_master_et_cybersec.js`, Kap. 6, letztes Item)**:

```js
{
    q: 'Welche Eigenschaft gehoert NICHT zu den "Trustworthy AI Characteristics" des NIST AI RMF 1.0?',
    options: ['Profitable', 'Valid &amp; Reliable', 'Safe', 'Privacy-Enhanced'],
    correct: 0,
    explanation: 'NIST AI 100-1: ... "Profitable" gehoert nicht dazu.',
    lo: 'aisec.governance.nist-rmf',
    bloom: 'remember',
    difficulty: 'easy',
    tags: ['ai-security', 'governance', 'nist-ai-rmf'],
    source: 'NIST AI 100-1, AI Risk Management Framework 1.0 (Jan. 2023), §3.2 Trustworthy AI Characteristics'
}
```

**Schueler-Pool-Item (`js/data/schueler.js`, Klasse 4 Mathe, illustrativ)**:

```js
{
    q: 'Eine Tafel Schokolade kostet 1,20 EUR. Wie viel kosten 7 Tafeln?',
    a: '8.40',
    lo: 'k4.mathe.sachaufgabe.multiplikation',
    bloom: 'apply',
    difficulty: 'easy',
    tags: ['sachaufgabe', 'multiplikation', 'dezimalzahlen'],
    source: 'Lehrplan Klasse 4 Bayern (LehrplanPLUS), Mathematik, Lernbereich 1.3'
}
```

### 22.4 Erweiterungsregeln

- **Optional, nicht verpflichtend.** Bestehende Items ohne Metadaten bleiben gueltig; der Adapter setzt fehlende Felder auf `undefined` (bzw. `tags = []`).
- **Schrittweise Pflege.** Neue Items sollten Metadaten direkt mitliefern; alte Items werden im Rahmen von `P-STUDY-QA-SOURCE-AUDIT` und kapitel-spezifischen Top-up-Paketen rueckwirkend ergaenzt.
- **`lo`-IDs** stammen aus `docs/CURRICULUM-MATRIX.md` (Modulhandbuch). Wenn die ID dort noch nicht existiert, dort zuerst eintragen.
- **`source` ist Pflicht** in jeder Aufgabe, deren `lo` produktiv ist (Pruefungsmodus zeigt sie an). Bis dahin: jede neue Frage kriegt Quelle, sobald sie hinzugefuegt wird (siehe §8 / §18.5).
- **Keine Reihenfolge-Aenderung** beim Hinzufuegen von Metadaten (gleiche Regel wie §11 / §18.3): Felder *am bestehenden Objekt* ergaenzen, nicht das Objekt im Array verschieben.
- **Stable-QID** (`P-ARCH-STABLE-QID`) liefert seit v37 die kanonische `qid` aus `toItem` als FNV-1a-32-Hash (8 Hex). Die Hilfs-`id` bleibt als Kontext-Referenz (Anzeige/Routing); fuer persistente Speicherung (z.B. SRS-Karten) immer `qid` nutzen.

### 22.5 Anti-Pattern

- Adapter umgehen und gleichzeitig das Datenformat aendern — fuehrt zu Doppelmigration. Adapter ist die einzige Brücke.
- Pflichtfelder eines Tracks (z.B. `q`/`h`/`s` im Training, `correct` in MCQ) durch Adapter-Felder ersetzen. Legacy-Felder bleiben primaer.
- Metadaten in `_legacy` schreiben — `_legacy` ist ein read-only Verweis auf das Originalobjekt, kein Schreibziel.
- `id` aus `toItem` als persistenten Schluessel in `localStorage` verwenden — der Wert ist Best-Effort und kontextabhaengig. Fuer persistente Identitaet die `qid` aus `toItem` nutzen (oder direkt `stableQid(legacy)`).

---

## 23. Didaktisches Lehrseiten-Template (Fernstudium)

Damit Master- und Medizin-Schulungen gleichmaessig studierbar sind und nicht je Kapitel didaktisch driften, gilt fuer alle Lehrseiten in `js/data/schulung_*.js` ab v38 das folgende Lehrseiten-Template (`P-STUDY-DIDACTIC-TEMPLATE`). Es konkretisiert §18.6 (HTML-Form) und ergaenzt §22 (Item-Metadaten).

> **Geltungsbereich.** Pflicht fuer **neue** Lehrseiten in produktiven Master-Kapiteln (Cybersec, Automation) und in produktiven Medizin-Kapiteln. **Soll** fuer das Nachpflegen bestehender Seiten — bestehende Kapitel werden nicht massenhaft umgeschrieben, sondern bei jedem Top-up- oder Audit-Paket (P-CYBERSEC-01-TOPUP, P-AUTO-01-TOPUP, P-MED-AUDIT, …) inkrementell auf das Template gehoben. Kein Lesestand-Drift: keine Reihenfolge-Aenderung der Seiten, nur Inhaltsanreicherung pro Seite.
>
> **Nicht-Geltungsbereich.** Schueler-Track (§17) und Ingenieurs-Cheatsheets (§5 `formulas`) — beide haben eigene Didaktik-Regeln und brauchen das Template nicht.

### 23.1 Pflicht-Bloecke pro Lehrseite (Reihenfolge)

Eine vollstaendige Lehrseite hat acht Bloecke in dieser Reihenfolge:

1. **Lernziele** — was die studierende Person nach dieser Seite *kann*. Operationalisierte Verben (Bloom: `erlaeutern`, `anwenden`, `analysieren`, `bewerten`, `entwerfen`). 2–5 Punkte. Empfohlenes Markup: `<blockquote><strong>Lernziele.</strong> Sie koennen (1) …, (2) …, (3) …</blockquote>`.
2. **Vorwissen** — Verweis auf vorherige Kapitel/Seiten oder Standardlehrwerke; explizit benannt, nicht `siehe vorne`. Empfohlenes Markup: `<p><strong>Vorwissen.</strong> Kapitel 5.1 (ISMS), Grundbegriffe Wahrscheinlichkeit, …</p>`. 1 Satz oder kompakte Liste.
3. **Kernkonzepte** — der Lehrtext im engeren Sinn. Untergliederung mit `<h4>` (z.B. `6.4.1`, `6.4.2`, …), Tabellen / Listen erlaubt (§18.6). Hier liegt der Hauptumfang.
4. **Worked Example** — *mindestens ein* durchgerechnetes oder durchargumentiertes Beispiel mit Loesungsweg, nicht nur Endergebnis. Empfohlenes Markup: `<h4>Worked Example: …</h4>` gefolgt von Schritten als `<ol>` oder Pruefungsformular-Tabelle. Bei Mathe: KaTeX inline + abgesetzt. Bei Cases (Medizin/Compliance/IR): Anamnese / Rahmenbedingung -> Schritte -> Bewertung.
5. **Selbstcheck** — 2–4 kurze Wissensfragen *im Lehrtext*, ohne Auswertung (Auswertung passiert via Kapitelquiz oder spaeter via P-LP-INLINE-CHECK). Empfohlenes Markup: `<h4>Selbstcheck</h4><ul><li>Frage 1?</li>…</ul>`. Lernziel-Bezug: jede Frage adressiert eines der Lernziele aus Block 1.
6. **Typische Fehler** — was Studierende erfahrungsgemaess falsch machen, mit Korrektur. Empfohlenes Markup: `<h4>Typische Fehler</h4><ul><li><em>Fehler:</em> … <em>Korrekt:</em> …</li>…</ul>`. 2–5 Eintraege.
7. **Transferaufgabe** — eine offene Aufgabe ohne Musterloesung im Text (Loesung erfolgt im Kapitel-Quiz, Capstone oder PBQ-Lab). Sie verbindet das Seiten-Thema mit einem realitaetsnahen Szenario (Industrie-/Klinik-/Anlagen-Kontext). Empfohlenes Markup: `<h4>Transferaufgabe</h4><p>…</p>`.
8. **Quellen** — Quellenliste mit Jahr/Version/Paragraph. Empfohlenes Markup: `<p class="text-xs text-slate-500"><em>Quellen: …</em></p>`. Mindestanforderung: pro nicht-trivialer Aussage in Block 3/4 ist eine Quelle in Block 8 nachweisbar (siehe §8 / §18.5).

### 23.2 HTML-Konventionen

- Erlaubte Tags wie in §18.6: `<p>`, `<h3>`/`<h4>`, `<ul>/<ol>/<li>`, `<table>/<thead>/<tbody>/<tr>/<th>/<td>`, `<strong>`, `<em>`, `<code>`, `<blockquote>`. Plus `<details>/<summary>` fuer optional einklappbare Tiefenexkurse (rendert plain, KaTeX siehe P-UI-KATEX-DETAILS-TOGGLE).
- Keine Inline-Styles, keine `<script>`, keine externen Bilder/SVGs.
- KaTeX nur in Block 3, 4, 5: `$...$` inline, `$$...$$` abgesetzt, Backslashes verdoppeln.
- Sprache Deutsch, Fachbegriffe ggf. englisch in Klammern (z.B. „Asset Administration Shell (AAS)").
- Keine Emojis (AGENTS §12); Aufzaehlungs-Marker via `<ul>`/`<ol>`.

### 23.3 Item-Metadaten (Verbindung zu §22)

- Jede Lehrseite *kann* ein optionales Feld `lo` tragen (Lernziel-IDs aus dem Modulhandbuch, vgl. `docs/CURRICULUM-MATRIX.md`), z.B. `lo: ['aisec.governance.nist-rmf', 'aisec.governance.eu-ai-act']`.
- Die `lo`-IDs der Quiz-Items eines Kapitels sollen Teilmenge der `lo`-IDs der Lehrseiten desselben Kapitels sein — sonst entsteht eine Quizfrage ohne abdeckende Lehrseite (Anti-Pattern fuer P-LP-FEEDBACK-LINKS).
- Selbstcheck-Fragen in Block 5 sind *nicht* Quiz-Items im Sinne von §18.1 — sie tauchen nicht im `quiz`-Array auf, werden nicht gescored und brauchen kein `qid`.

### 23.4 Erweiterungsregeln

- **Neue Lehrseite anlegen:** acht Bloecke in der genannten Reihenfolge; bei sehr kurzen Seiten (< 250 Woerter Kernkonzepte) duerfen Block 4 und Block 7 zusammenfallen, alle anderen Bloecke bleiben Pflicht.
- **Bestehende Lehrseite anreichern:** Bloecke einfach **ergaenzen**, nicht umsortieren — die Reader-Reihenfolge der Seiten in `chapters[*].pages` bleibt stabil (Lesestand-Drift, vgl. §11/§18.3).
- **Kapitel-Status `production`:** wird nur gesetzt, wenn alle Lehrseiten des Kapitels alle acht Bloecke haben oder im Top-up-Paket explizit als „Block 4–7 nachzuziehen" markiert sind.
- **CACHE_VERSION** bumpen, sobald eine Lehrseite inhaltlich erweitert wird (App-Shell-/Datenskript-Aenderung, §14a).

### 23.5 Anti-Pattern

- Lehrseite ohne Lernziele oder ohne Quellenblock — verstoesst gleich gegen §8 und §18.5.
- Worked Example, das nur das Ergebnis nennt (ohne nachvollziehbaren Schritt-Weg) — keine Reaktivierung von Studienwissen.
- Selbstcheck mit eingeblendeter Loesung im Lehrtext — entwertet das didaktische Format. Loesung gehoert ins Kapitel-Quiz oder spaeter in den Inline-Check (P-LP-INLINE-CHECK).
- Transferaufgabe als verkappte Quizfrage im Lehrtext (z.B. „Welche der folgenden Antworten …") — die Aufgabe ist offen, nicht MCQ. MCQ gehoert ins `quiz`-Array.
- Reihenfolge der Pflicht-Bloecke aendern, um „besser zu lesen" — der Reader laeuft konstant von oben nach unten; die Bloecke sind ein Pruefkatalog fuer Vollstaendigkeit, nicht eine Komposition.
- Massen-Refactoring bestehender Seiten in einer Session — wuerde Lesestand-Drift und Diff-Review-Last erzeugen. Inkrementell pro Top-up-/Audit-Paket vorgehen.

### 23.6 Referenz-Implementierung

`PAGE_AI_GOVERNANCE` in `js/data/schulung_master_et_cybersec.js` (Cybersec Kap. 6.4 „MLOps-Sicherheit, NIST AI RMF, EU AI Act, ISO/IEC 42001") ist die exemplarische Lehrseite, die alle acht Bloecke in der vorgeschriebenen Reihenfolge fuehrt. Folgepakete (P-CYBERSEC-01-TOPUP, P-AUTO-01-TOPUP, P-MED-AUDIT, P-CYBERSEC-07/-08/-09, P-AUTO-05/-06/-07/-08/-09) verwenden diese Seite als Vorlage.


