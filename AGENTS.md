# AGENTS.md — Leitfaden für die Weiterentwicklung von Smartineer

Dieses Dokument richtet sich an **menschliche Entwickler** und **AI-Coding-Agents** (Copilot, Claude, etc.), die an diesem Projekt arbeiten. Es definiert verbindliche Konventionen, Pflege-Pflichten und Qualitätsstandards.

> **Lies dieses Dokument, bevor du Änderungen einreichst.**  
> Bei Konflikten gilt: AGENTS.md > README.md > eigener Stil.

---

## 1. Projekt-Mission

Smartineer ist eine **statische Single-Page-Anwendung** zum Reaktivieren von Ingenieurs-Studienwissen über 9 Kategorien × 3 Schwierigkeitsstufen.

**Nicht-Ziele** (bewusst weggelassen):
- Kein Backend, keine Datenbank, kein Auth.
- Kein Build-Schritt (kein npm/webpack/vite/babel).
- Kein User-Tracking, keine Telemetrie.
- Keine schweren Frameworks (React/Vue/Angular).

Wer eines dieser Nicht-Ziele einführen will, **muss vorher in einem Issue diskutieren**.

---

## 2. Tech-Stack & Constraints

| Schicht | Wahl | Lieferweg | Anmerkung |
|---|---|---|---|
| Layout | Tailwind CSS | CDN (`cdn.tailwindcss.com`) | JIT im Browser, keine `tailwind.config.js` |
| Charts | Chart.js v4 | jsdelivr CDN | Nur für Radar auf Dashboard |
| Math | KaTeX 0.16.x + auto-render | jsdelivr CDN | Delimiters: `$...$`, `$$...$$` |
| Logik | Vanilla JS (ES2017+) | lokal | Kein Modul-Bundling, keine `import`-Statements |
| Persistenz | `localStorage` | Browser | Key: `wissen_reloaded_progress_v1` |

**Browser-Ziele**: aktuelle Evergreen-Browser (Chrome, Firefox, Edge, Safari letzte 2 Jahre). IE wird nicht unterstützt.

---

## 3. Repository-Struktur (verbindlich)

```
smartineer/
├── index.html              # SPA-Shell — DOM-Skelett, Script-Ladereihenfolge
├── .nojekyll               # MUSS existieren (GitHub Pages)
├── README.md               # Anwender-Doku (DE)
├── AGENTS.md               # dieses Dokument
├── css/
│   └── styles.css          # eigenes CSS (Pills, Tabs, Status)
└── js/
    ├── app.js              # Anwendungslogik (Routing, Render, Progress)
    └── data/
        ├── <id>.js         # eine Datei pro Kategorie (siehe §5)
        └── ...
```

**Regeln**:
- Keine neuen Top-Level-Ordner ohne Diskussion.
- Keine Binärdateien (Bilder, Fonts) ohne Notwendigkeit — Lade-Performance!
- Keine Lockfiles, keine `node_modules/`, keine `package.json` (es gibt kein npm-Projekt).

---

## 4. Script-Lade-Reihenfolge

In `index.html` werden Skripte in dieser Reihenfolge geladen:

1. Tailwind, Chart.js, KaTeX (CDN, im `<head>` mit `defer` wo möglich).
2. **Alle** `js/data/<id>.js` — Reihenfolge bestimmt die Reihenfolge in Sidebar/Dashboard/Radar.
3. Zuletzt `js/app.js`.

Wer eine neue Kategorie einfügt, muss den `<script>`-Tag manuell vor `js/app.js` ergänzen.

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
| `id` | `string` | ✅ | snake_case, eindeutig, nie ändern (sonst Reset des Lernfortschritts!) |
| `name` | `string` | ✅ | Anzeige in Sidebar/Dashboard |
| `desc` | `string` | ✅ | Plain text |
| `formulas` | `string` (HTML) | ✅ | Mind. die für die Aufgaben benötigten Formeln |
| `levels` | `Array[3]` | ✅ | **Genau drei** Sub-Arrays |

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

- ❌ Aufgabentexte aus urheberrechtlich geschützten Lehrbüchern wörtlich kopieren.
- ❌ "Trivialaufgaben" wie "Was ist 2+2" auf L1 setzen — auch L1 muss noch Reaktivierung von Studienwissen sein.
- ❌ Auf L3 schwammige Essay-Fragen ohne klar überprüfbare Lösung.
- ❌ Backslashes im JS-String einfach (`\frac` → wird zu `frac`).
- ❌ HTML-Tags in `formulas`, die KaTeX-Output zerschießen (z.B. `<style>` inline).

---

## 7. Workflow: Neue Kategorie hinzufügen

1. Datei `js/data/<id>.js` nach Vorlage einer bestehenden Kategorie anlegen.
2. In `index.html` einen `<script src="js/data/<id>.js"></script>` **vor** `js/app.js` einfügen.
3. Mind. **6 Aufgaben pro Stufe** (Minimum-Standard, siehe §9).
4. README-Tabelle "Kategorien-Übersicht" um die Kategorie ergänzen.
5. Radarchart funktioniert automatisch (keine Code-Änderung nötig).

---

## 8. Wissenschaftliche Korrektheit

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

---

## 13. Validierung vor Commit

Minimum-Set:

1. `get_errors` (oder Linter) auf alle geänderten `js/**/*.js` Dateien.
2. `index.html` lokal öffnen, alle 9 Kategorien durchklicken, mind. eine L1/L2/L3-Aufgabe je Kategorie betrachten — KaTeX rendert?
3. Cheatsheet-Reiter "Formeln" und "Musterlösungen" prüfen — keine Render-Fehler?
4. Dashboard: Radar zeigt alle 9 Kategorien?
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
