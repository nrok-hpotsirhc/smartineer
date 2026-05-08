# Smartineer — Engineering Knowledge Reloaded

Eine schlanke, modulare **React-SPA + Progressive Web App** (PWA), mit der ein erfahrener Ingenieur sein Studienwissen schrittweise reaktivieren kann — über 10 Kategorien, 3 Schwierigkeitsstufen, ~30 Aufgaben je Kategorie (~300 gesamt) und mit isolierten Musterlösungen samt Rechenweg.

> **Stack**: React 18 (CDN, JSX via Babel-standalone) · Tailwind CSS (CDN) · Chart.js · KaTeX  
> **Auslieferung**: Klassische Website **und** installierbare PWA (Desktop, Android, iOS)  
> **Hosting**: optimiert für GitHub Pages — **kein Build-Schritt**

---

## Inhalt

- [Features](#features)
- [Live-Demo / Hosting](#live-demo--hosting)
- [Als App installieren (PWA)](#als-app-installieren-pwa)
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

- 🎯 **10 Kategorien**: Höhere Mathematik, Regelungstechnik, Digitale Regelungstechnik, Robotik, Systemtheorie, Physik, Kryptographie, Blockchain, Neuronale Netze, PLC-Programmierung (IEC 61131-3)
- 📊 **Drei Schwierigkeitsstufen** pro Kategorie (Grundlagen → Vertiefung → Expertise) mit jeweils ca. **10 Aufgaben** = ~**270 Aufgaben** insgesamt
- 🧮 **KaTeX-gerenderte Formeln** in Aufgaben, Hinweisen und Lösungen
- ⚛️ **React-UI** (Hooks, Functional Components) mit weichen Übergangs-Animationen, Gradient-Hero, animierten Fortschrittsbalken und Hover-Effekten
- 📲 **PWA**: voll installierbar auf Desktop / Android / iOS, **offline-fähig** durch Service-Worker-Caching
- 🧭 **Cheatsheets** je Kategorie mit zwei Reitern:
  1. **Formeln** (kompakte Übersicht)
  2. **Musterlösungen** (vollständig isoliert mit Rechenweg und Kommentaren)
- 💾 **Lokaler Lernfortschritt** via `localStorage` (kein Backend, kein Tracking)
- 📈 **Dashboard** mit Radarchart deiner Kompetenzverteilung
- 🌐 **Modular & erweiterbar**: jede Kategorie ist eine eigene Datei in `js/data/`. Neue Aufgaben hinzufügen = eine Datei editieren, Browser neu laden, fertig.
- 🚀 **Zero-Build**: kein npm, kein Webpack — React/JSX werden via **Babel-standalone zur Laufzeit** im Browser transpiliert

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

> **Hinweis zum Service Worker**: Der SW registriert sich nur über `http(s)://`-Origins, **nicht** über `file://`. Für ein vollständiges PWA-Verhalten (Offline-Cache, Install-Prompt) lokal einen kleinen Webserver verwenden.

---

## Als App installieren (PWA)

Smartineer kann zusätzlich zur klassischen Website-Nutzung als **eigenständige App** auf Desktop und Mobilgerät installiert werden. Nach der Installation startet die App ohne Browser-Leiste, ist offline verfügbar und lädt deutlich schneller.

### 🖥️ Desktop (Chrome / Edge / Brave)

1. Smartineer im Browser öffnen.
2. In der Adressleiste rechts erscheint ein **Install-Symbol** (kleines Monitor-/Plus-Icon).
3. Klicken → **„Installieren"**. Die App taucht im Startmenü / Dock auf.

Alternativ: Auf dem Dashboard den Button **„📲 Als App installieren"** klicken.

### 🤖 Android (Chrome / Edge)

1. Smartineer in Chrome öffnen.
2. Bei erstem Besuch erscheint nach kurzer Zeit ein Hinweis-Popup — auf **„Jetzt installieren"** tippen.
3. Falls geschlossen: **Menü** (⋮ oben rechts) → **„App installieren"** bzw. **„Zum Startbildschirm hinzufügen"**.

### 🍏 iOS / iPadOS (Safari)

Auf iOS unterstützt nur **Safari** die Installation als PWA (Chrome auf iOS funktioniert **nicht** — Apple-Restriktion).

1. Smartineer in **Safari** öffnen.
2. Unten in der Browser-Leiste auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben) tippen.
3. Im Aktions-Sheet nach unten scrollen → **„Zum Home-Bildschirm"** wählen.
4. Oben rechts mit **„Hinzufügen"** bestätigen.

Die App erscheint dann mit eigenem Icon auf dem Homescreen und läuft im Vollbild ohne Adressleiste.

> Beim ersten Besuch auf einem Mobilgerät blendet Smartineer automatisch eine kurze Installations-Anleitung ein. Mit „Nicht mehr fragen" wird der Hinweis dauerhaft ausgeblendet (`localStorage`-Flag `smartineer_install_dismissed_v1`).

### Offline-Verhalten

Nach erstem Aufruf werden alle App-Shell-Dateien (HTML, CSS, JSX, alle Aufgaben-Module, Icons, Manifest) sowie die wichtigsten CDN-Ressourcen (Tailwind, Chart.js, KaTeX) lokal zwischengespeichert. Smartineer ist danach **vollständig offline nutzbar**, der Lernfortschritt bleibt im `localStorage` erhalten.

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
├── index.html                  # SPA-Shell (React-Mount, PWA-Hooks, Script-Reihenfolge)
├── manifest.webmanifest        # PWA-Manifest (Name, Icons, Display-Mode)
├── sw.js                       # Service Worker (Offline-Cache, Stale-while-revalidate)
├── .nojekyll                   # GitHub Pages: Jekyll deaktivieren
├── README.md                   # diese Datei
├── AGENTS.md                   # Konventionen für Entwickler/AI-Agents
├── icons/                      # PWA-Icons (SVG, gradient-basiert)
│   ├── icon.svg
│   ├── icon-192.svg
│   └── icon-512.svg
├── css/
│   └── styles.css              # Pills, Animationen, Safe-Area, Scrollbars
└── js/
    ├── app.jsx                 # React-App (Hooks, Komponenten, Install-Prompt)
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

Jede Kategorie-Datei registriert sich autonom in `window.APP_DATA[id]` und pusht ihre `id` in `window.APP_ORDER`. Reihenfolge in der UI = Reihenfolge der `<script>`-Tags in `index.html`. React liest beim Mount aus diesen Globals — **keine** `import`-Statements nötig.

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
| PLC-Programmierung | IEC 61131-3 (ST/KOP/FUP/AWL), Datentypen, Selbsthaltung, TON/CTU/R_TRIG, Scan-Zyklus, Hysterese, PI mit Anti-Windup, Race-Conditions |

---

## Aufgaben hinzufügen / bearbeiten

1. Datei der Zielkategorie öffnen, z.B. `js/data/control.js`.
2. In `levels` das gewünschte Array (Index 0=Grundlagen, 1=Vertiefung, 2=Expertise) finden.
3. Neues Aufgabenobjekt anhängen — siehe [Datenformat](#datenformat-schema).
4. Optional `formulas` (Cheatsheet-Reiter "Formeln") ergänzen.
5. Browser neu laden — keine weiteren Schritte nötig.

### Neue Kategorie hinzufügen

1. Neue Datei `js/data/<id>.js` nach Vorbild der bestehenden anlegen.
2. In `index.html` einen `<script src="js/data/<id>.js"></script>` **vor** den React-/Babel-Skripten einfügen.
3. Die Datei zusätzlich in der `APP_SHELL`-Liste in `sw.js` ergänzen (sonst kein Offline-Cache).
4. `CACHE_VERSION` in `sw.js` hochzählen, damit Bestandsuser den neuen Stand beziehen.
5. Die UI (Sidebar, Dashboard, Radarchart) übernimmt die Kategorie automatisch.

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

> ⚠️ **VERBINDLICH: Alle Aufgaben, Hinweise und Musterlösungen MÜSSEN wissenschaftlich korrekt sein.**  
> Eine inhaltlich falsche Aufgabe ist ein **Bug** — nicht eine „Kleinigkeit". Bevor eine Aufgabe ins Repo geht, ist die Korrektheit gegen mindestens eine etablierte Quelle (Lehrbuch, peer-reviewter Artikel, akzeptierter Standard) zu prüfen. Im Zweifel: weglassen, nicht raten.

Konkrete Mindestanforderungen:

- Alle Formeln, Schritte und Endergebnisse werden **nachgerechnet** und gegen die Quelle geprüft.
- Bei mehreren legitimen Konventionen (Vorzeichen, Frequenz vs. Kreisfrequenz, …) wird die gewählte **explizit** im Lösungstext genannt.
- Numerik auf 3 signifikante Stellen, Annäherungen mit `\\approx`, Standards mit Jahr/Version.
- Bei Sicherheits-/Crypto-Themen: keine veralteten Verfahren (DES, MD5, SHA-1, RSA-1024) als „ok" darstellen — nur als **klar gekennzeichnetes** Negativbeispiel.
- Modellannahmen (Linearisierung, kleine Auslenkung, ideale Bauteile, …) **vor** der Lösung explizit nennen.

Die Inhalte folgen den Konventionen etablierter Lehrwerke (Lutz/Wendt, Föllinger, Lunze, Khalil, Bishop, Goodfellow, Spong, Nakamoto-Whitepaper, NIST-Standards). Numerische Ergebnisse sind im Allgemeinen auf 3 signifikante Stellen gerundet. Bei zwei legitimen Vorzeichen-/Definitions-Konventionen ist die jeweils gewählte Konvention im Lösungsweg angegeben.

> Trotz sorgfältiger Erstellung können Tippfehler oder Inkonsistenzen auftreten — bitte sofort als Issue/PR melden, **insbesondere** bei inhaltlich-fachlichen Fehlern.

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
