# Smartineer — Engineering Knowledge Reloaded

Eine schlanke, modulare Single-Page-Anwendung, mit der ein erfahrener Ingenieur sein Studienwissen schrittweise reaktivieren kann — über 9 Kategorien, 3 Schwierigkeitsstufen, ~30 Aufgaben je Kategorie (~270 gesamt) und mit isolierten Musterlösungen samt Rechenweg.

> **Stack**: Vanilla JS · Tailwind CSS (CDN) · Chart.js · KaTeX  
> **Hosting**: optimiert für GitHub Pages (kein Build-Schritt)

---

## Inhalt

- [Features](#features)
- [Live-Demo / Hosting](#live-demo--hosting)
- [Schnellstart lokal](#schnellstart-lokal)
- [Projektstruktur](#projektstruktur)
- [Kategorien-Übersicht](#kategorien-übersicht)
- [Aufgaben hinzufügen / bearbeiten](#aufgaben-hinzufügen--bearbeiten)
- [Datenformat (Schema)](#datenformat-schema)
- [Wissenschaftliche Korrektheit](#wissenschaftliche-korrektheit)
- [Roadmap](#roadmap)
- [Lizenz & Haftungsausschluss](#lizenz--haftungsausschluss)

---

## Features

- 🎯 **9 Kategorien**: Höhere Mathematik, Regelungstechnik, Digitale Regelungstechnik, Robotik, Systemtheorie, Physik, Kryptographie, Blockchain, Neuronale Netze
- 📊 **Drei Schwierigkeitsstufen** pro Kategorie (Grundlagen → Vertiefung → Expertise) mit jeweils ca. **10 Aufgaben** = ~**270 Aufgaben** insgesamt
- 🧮 **KaTeX-gerenderte Formeln** in Aufgaben, Hinweisen und Lösungen
- 🧠 **Cheatsheets** je Kategorie mit zwei Reitern:
  1. **Formeln** (kompakte Übersicht)
  2. **Musterlösungen** (vollständig isoliert mit Rechenweg und Kommentaren)
- 💾 **Lokaler Lernfortschritt** via `localStorage` (kein Backend, kein Tracking)
- 📈 **Dashboard** mit Radarchart deiner Kompetenzverteilung
- 🌐 **Modular & erweiterbar**: jede Kategorie ist eine eigene Datei in `js/data/`. Neue Aufgaben hinzufügen = eine Datei editieren, Browser neu laden, fertig.
- 🚀 **Zero-Build**: kein npm, kein Webpack, kein Babel — pure HTML/CSS/JS

---

## Live-Demo / Hosting

### GitHub Pages

1. Repo auf GitHub anlegen und alle Dateien pushen.
2. Im Repository: **Settings → Pages → Source: Deploy from branch**, Branch `main`, Ordner `/` (root) wählen.
3. Die Datei `.nojekyll` ist bereits enthalten (verhindert Jekyll-Verarbeitung). 
4. Nach 1–2 Minuten ist die Seite unter `https://<username>.github.io/<repo>/` verfügbar.

### Lokal serven

Eine reine `file://`-Öffnung funktioniert. Falls Browser CORS-Probleme bei lokalen Skripten meldet:

```powershell
# Python (falls installiert)
python -m http.server 8000

# Node (npx)
npx serve .
```

Dann `http://localhost:8000` öffnen.

---

## Schnellstart lokal

```powershell
git clone <repo-url>
cd smartineer
# index.html im Browser öffnen — fertig.
```

Es werden keine Abhängigkeiten installiert. Alle Bibliotheken werden per CDN geladen (Tailwind, Chart.js, KaTeX).

---

## Projektstruktur

```
smartineer/
├── index.html                  # SPA-Shell (Dashboard / Training / Cheatsheet)
├── .nojekyll                   # GitHub Pages: Jekyll deaktivieren
├── README.md                   # diese Datei
├── css/
│   └── styles.css              # eigenes Styling (Pills, Tabs, Status-Badges …)
└── js/
    ├── app.js                  # Anwendungslogik (Routing, Rendering, Progress)
    └── data/
        ├── math.js             # Höhere Mathematik
        ├── control.js          # Regelungstechnik
        ├── digital_control.js  # Digitale Regelungstechnik
        ├── robotics.js         # Robotik
        ├── system_theory.js    # Systemtheorie
        ├── physics.js          # Physik
        ├── crypto.js           # Kryptographie
        ├── blockchain.js       # Blockchain
        └── neural_nets.js      # Neuronale Netze
```

Jede Kategorie-Datei registriert sich autonom in `window.APP_DATA[id]` und pusht ihre `id` in `window.APP_ORDER`. Reihenfolge in der UI = Reihenfolge der `<script>`-Tags in `index.html`.

---

## Kategorien-Übersicht

| Kategorie | Themen (Auszug) |
|---|---|
| Höhere Mathematik | Komplexe Zahlen, Integration, ODEs, Laplace, Fourier, Eigenwerte, Vektoranalysis, Residuensatz |
| Regelungstechnik | PID, Stabilität, Hurwitz/Routh, Bode/Nyquist, Wurzelortskurve, Zustandsraum, Optimumeinstellungen |
| Digitale Regelungstechnik | Z-Transform, Tustin, Stabilität in der z-Ebene, Dead-Beat, Jury, ZOH, Aliasing |
| Robotik | Grübler-Kutzbach, DH-Konvention, Vorwärts-/Rückwärts-Kinematik, Jacobi, Singularitäten, Lagrange-Dynamik |
| Systemtheorie | LTI, Kausalität, Zustandsraum, Steuerbarkeit, Beobachtbarkeit, Stabilität, Lyapunov |
| Physik | Mechanik, Schwingungen, Elektrodynamik, Thermodynamik, Optik, Quanten, Spezielle Relativität |
| Kryptographie | Modulararithmetik, RSA, Diffie-Hellman, ECDSA, ECC, Hashes, Post-Quantum |
| Blockchain | Hash-Ketten, Merkle-Trees, PoW/PoS, Difficulty, Smart Contracts, Layer-2, Rollups |
| Neuronale Netze | Aktivierungen, Backprop, SGD/Adam, Regularisierung, CNN, Batch-Norm, Universal Approximation |

---

## Aufgaben hinzufügen / bearbeiten

1. Datei der Zielkategorie öffnen, z.B. `js/data/control.js`.
2. In `levels` das gewünschte Array (Index 0=Grundlagen, 1=Vertiefung, 2=Expertise) finden.
3. Neues Aufgabenobjekt anhängen — siehe [Datenformat](#datenformat-schema).
4. Optional `formulas` (Cheatsheet-Reiter "Formeln") ergänzen.
5. Browser neu laden — keine weiteren Schritte nötig.

### Neue Kategorie hinzufügen

1. Neue Datei `js/data/<id>.js` nach Vorbild der bestehenden anlegen.
2. In `index.html` einen `<script src="js/data/<id>.js"></script>` **vor** `js/app.js` einfügen.
3. Die UI (Sidebar, Dashboard, Radarchart) übernimmt die Kategorie automatisch.

---

## Datenformat (Schema)

Jede Kategorie-Datei ist ein IIFE und füllt:

```js
window.APP_DATA[id] = {
  id:    'control',
  name:  'Regelungstechnik',
  desc:  'Kurzbeschreibung für Sidebar/Dashboard.',

  // HTML-String mit KaTeX-Formeln; rendert im Cheatsheet-Reiter "Formeln"
  formulas: `
    <strong>Standard-Übertragungsfunktion</strong><br>
    $G(s) = K\\dfrac{1}{1+sT}$
  `,

  // Genau drei Level-Arrays: Grundlagen, Vertiefung, Expertise
  levels: [
    [
      { q: 'Frage als HTML-String', h: 'Hinweis', s: 'Musterlösung mit Rechenweg' },
      // …
    ],
    [ /* Vertiefung */ ],
    [ /* Expertise */ ]
  ]
};
```

**Konventionen für `q`, `h`, `s`:**

- HTML erlaubt (`<br>`, `<strong>`, `<table>`, `<ul>` …).
- Mathe wird mit KaTeX gerendert: inline `$...$`, abgesetzt `$$...$$`.
- Backslashes in JS-Strings doppelt schreiben: `\\frac`, `\\bmod`, `\\sin`.
- Lösungen sollen die Rechnung **in nachvollziehbaren Schritten** zeigen, plus Endergebnis, idealerweise in `\\boxed{...}`.

---

## Wissenschaftliche Korrektheit

Alle Aufgaben und Lösungen wurden bewusst auf etablierte Lehrbuch-Konventionen ausgerichtet (Lutz/Wendt, Föllinger, Lunze, Khalil, Bishop, Goodfellow, Spong, Nakamoto-Whitepaper, NIST-Standards). Numerische Ergebnisse sind im Allgemeinen auf 3 signifikante Stellen gerundet. Bei zwei legitimen Vorzeichen-/Definitions-Konventionen ist die jeweils gewählte Konvention im Lösungsweg angegeben.

> Trotz sorgfältiger Erstellung können Tippfehler oder Inkonsistenzen auftreten. Bitte Issues / PRs willkommen!

---

## Roadmap

- [ ] Suchfunktion über Aufgaben
- [ ] Export gelöster Aufgaben als PDF
- [ ] "Aufgabe melden / korrigieren"-Button mit GitHub-Issue-Vorlage
- [ ] Optionaler Dark-Mode
- [ ] i18n (DE/EN) — derzeit reiner DE-Inhalt
- [ ] Unit-Tests für Formelparser

---

## Lizenz & Haftungsausschluss

MIT-Lizenz (sofern nicht anders angegeben).

Die Inhalte dienen ausschließlich der **persönlichen Wissensauffrischung** und ersetzen weder eine Vorlesung, noch ein Lehrbuch, noch eine professionelle Beratung. Bei sicherheitsrelevanten Anwendungen (Kryptographie, Regelungstechnik in sicherheitskritischen Systemen, etc.) **immer** einschlägige Standards und peer-reviewte Quellen konsultieren.
