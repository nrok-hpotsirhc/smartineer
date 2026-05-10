# Smartineer — Arbeitspakete (Session-Plan)

> **Verbindlich fuer jede Session.** Reihenfolge: (1) Diese Datei sichten, (2) erstes Paket mit `status: ready` als naechstes nehmen (oder das vom User explizit genannte), (3) Paket abarbeiten, (4) Status hier aktualisieren, (5) am Ende den naechsten Vorschlag im Status-Report nennen. Siehe AGENTS.md §21.
>
> **Sitzungsbudget:** Ein Paket pro Session. Mehr ist nicht zuverlaessig leistbar (siehe AGENTS.md §0 Honesty Note).
>
> **Statuswerte:**
> - `ready` — kann sofort gestartet werden.
> - `in-progress` — laufende Session arbeitet daran (max. 1 gleichzeitig).
> - `blocked: <Grund>` — wartet auf Input/Recherche/Vorgabe.
> - `done (vYY, Sitzung YYYY-MM-DD)` — abgeschlossen, mit Cache-Version + Datum.

---

## A) Master-Schulungen — Kapitel produktiv ausarbeiten

Pro Paket: ≥4 Lehrseiten (AGENTS §18.6) + ≥50 quellenbelegte MCQ (AGENTS §18.4) mit Quellenanker pro `explanation`. Kein status-Switch auf `production` einzeln; erst wenn alle Kapitel der Schulung produktiv sind (Paket P-CYBERSEC-STATUS bzw. P-AUTO-STATUS).

### P-CYBERSEC-05 — Master-ET Cybersec Kap. 5 "Risikomanagement & Compliance"
- **Status:** done (v29, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** ISO/IEC 27001:2022 + Annex A 93 Controls / 4 Themengruppen, ISO/IEC 27005:2022, BSI IT-Grundschutz-Kompendium 2024 (Bausteine), NIS2 EU 2022/2555 (Frist 17.10.2024), CRA EU 2024/2847 Art. 13, FIRST CVSS v4.0 (Nov. 2023), Open FAIR Body of Knowledge 2024, OCTAVE Allegro, ISO 31000:2018, CISA KEV, EPSS.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ; CACHE_VERSION bumpen.

### P-CYBERSEC-06 — Master-ET Cybersec Kap. 6 "AI-Security"
- **Status:** done (v30, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** Adversarial Examples (FGSM Goodfellow 2015, PGD Madry 2018, C&W 2017), Membership Inference (Shokri 2017), Model-Stealing, Data Poisoning, Differential Privacy (Dwork 2006, DP-SGD Abadi 2016), OWASP LLM Top 10 v2025, NIST AI 600-1 (2024), NIST AI RMF 1.0 (2023), EU AI Act 2024/1689, ISO/IEC 42001:2023, ISO/IEC 23894:2023, MITRE ATLAS.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ; CACHE_VERSION bumpen.

### P-CYBERSEC-STATUS — `master_et_cybersec` auf `status: 'production'`
- **Status:** done (v30, Sitzung 2026-05-10)
- **Aktion:** Feld `status: 'preparation'` aus Schulungs-Objekt entfernen, README/Card-Badge verifizieren, CACHE_VERSION bumpen.

### P-AUTO-02 — Master-ET Automation Kap. 2 "SPS / IEC 61131-3 / 61499"
- **Status:** done (v31, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** IEC 61131-3 Ed. 3 (2013, OO-Erweiterung; LD/ST/FBD/IL/SFC), POU-Konzept, Tasking, IEC 61131-9 IO-Link, IEC 61499 (verteilte Function Blocks), IEC 61508 SIL/IEC 62061, Watchdogs, Determinismus.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-03 — Master-ET Automation Kap. 3 "Feldbus / Industrial Ethernet / TSN"
- **Status:** in-progress
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** PROFINET RT/IRT, EtherCAT (DC, FMMU), OPC UA Part 14 Pub/Sub, OPC UA FX (2022), IEEE 802.1Q-2022 TSN (Qbv, Qbu, ASc; gPTP IEEE 802.1AS-2020), CC-Link IE TSN, MODBUS-TCP, CAN/CANopen, Determinismus-Klassen.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-04 — Master-ET Automation Kap. 4 "Antriebstechnik / FOC / DTC"
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** Park/Clarke-Transformation, Field-Oriented-Control (FOC) ASM/PMSM, Direct Torque Control (DTC), SVPWM, Sensorlose Verfahren (Back-EMF, Modell-Beobachter), Drehgeber/Resolver, Geschwindigkeits-/Lageregelkreis-Kaskade, EN 61800-5-2 Safety-Functions (STO, SS1, SLS).
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-05 — Master-ET Automation Kap. 5 "Robotik / Kinematik / Cobot"
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** Denavit-Hartenberg, direkte/inverse Kinematik, Lagrange-Dynamik, Jacobi-Matrix + Singularitaeten, ISO 10218-1/-2:2011, ISO/TS 15066:2016 (HRC-Grenzwerte), ROS 2 Humble/Iron, MoveIt 2, ISO 9283 (Genauigkeitskennwerte).
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-06 — Master-ET Automation Kap. 6 "Industrie 4.0 / Digital Twin"
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** RAMI 4.0, Asset Administration Shell (AAS, IDTA Specs 2024), Verwaltungsschale Submodelle, ISO 23247 (Digital Twin Manufacturing), ISA-95 / IEC 62264, MTConnect, Plattform Industrie 4.0 / IIC, Edge-Cloud-Continuum.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-STATUS — `master_et_automation` auf `status: 'production'`
- **Status:** blocked: P-AUTO-02 .. P-AUTO-06
- **Aktion:** `status: 'preparation'` entfernen, README/Card-Badge pruefen, CACHE_VERSION bumpen.

---

## B) Ingenieurs-Track — Aufgabenbestand auf 100/Kategorie

Ziel laut Mega-Vorhaben: 100 Aufgaben je Kategorie (Summe ueber L1+L2+L3). AGENTS §9: L1 ≥ 6, L2 ≥ 6, L3 ≥ 6 als Min, Soll 100 gesamt. Pro Paket eine Kategorie, ca. 30-50 neue Aufgaben (je nach aktuellem Stand). Aufgaben **anhaengen**, nicht umsortieren (AGENTS §11).

| Paket | Kategorie | Datei | Status |
|---|---|---|---|
| P-CAT-MATH | Mathematik | `js/data/math.js` | ready |
| P-CAT-CONTROL | Regelungstechnik | `js/data/control.js` | ready |
| P-CAT-DCONTROL | Digitale Regelungstechnik | `js/data/digital_control.js` | ready |
| P-CAT-ROBOTICS | Robotik | `js/data/robotics.js` | ready |
| P-CAT-SYSTHEORY | Systemtheorie | `js/data/system_theory.js` | ready |
| P-CAT-PHYSICS | Physik | `js/data/physics.js` | ready |
| P-CAT-CRYPTO | Kryptographie | `js/data/crypto.js` | ready |
| P-CAT-BLOCKCHAIN | Blockchain | `js/data/blockchain.js` | ready |
| P-CAT-NEURAL | Neuronale Netze | `js/data/neural_nets.js` | ready |
| P-CAT-PLC | SPS / IEC 61131-3 | `js/data/plc.js` | ready |
| P-CAT-CYBSEC | Cyber Security | `js/data/cyber_security.js` | ready |
| P-CAT-KRL | Roboter-Sprachen (KRL) | `js/data/krl.js` | ready |
| P-CAT-WELDING | Fuegetechniken | `js/data/fuegetechniken.js` | ready |
| P-CAT-AGAI | Agentic AI | `js/data/agentic_ai.js` | ready |

Pro Paket-Akzeptanz: vor Start IST-Stand (per Kategorie zaehlen) im Status-Report festhalten; Soll: Gesamt ≥100. Falls Gap < 30 Aufgaben, Paket darf in einer Session erledigt werden; falls > 30, Paket aufteilen (Suffix `-A` / `-B`).

---

## C) Medizin-Audit

### P-MED-AUDIT — Allgemeinmedizin Leitlinien-Audit
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Aktion:** Bestehende 238 Quiz-Fragen + Lehrseiten gegen aktuelle Leitlinien-Versionen pruefen und ggf. anpassen:
  - NVL Typ-2-Diabetes (BAEK/AWMF, Stand pruefen)
  - NVL Asthma 2024
  - GOLD-Report 2024/2025 COPD
  - GINA-Report 2024 Asthma
  - STIKO-Empfehlungen Epid.Bull. (jeweils aktuelle Saison)
  - PRISCUS-2.0 Liste 2023
  - DEGAM-S3-Leitlinien (Hausarztzentrierte Versorgung 2023)
  - AWMF-Leitlinien-Register letzte Revision
- **Akzeptanz:** Aenderungs-Log pro betroffener Quiz-Frage mit Quellen-Anker; CACHE_VERSION bumpen.

---

## D) UI / Bugs / Tooling — werden ad-hoc als P-UI-... eingeplant

| Paket | Beschreibung | Status |
|---|---|---|
| P-UI-CHEATSHEET-COLLAPSE | Cheatsheet pro Kategorie einklappbar (default closed) | done (v28, 2026-05-10) |
| P-UI-LOGIN-TRIM | Login: Passwort trimmen + Default-Credentials-Hinweis | done (v28, 2026-05-10) |
| P-UI-AUTH-DEFAULTS-USER | Default-Credentials auf admin/admin und user/user vereinheitlichen (Demo-User in Vorlage umbenennen, Login-Hinweistext angleichen) | done (v28, 2026-05-10) |
| P-UI-CONTRAST-FIX | Dark-Mode-Kontraste fuer `bg-amber-100` (Badge "In Vorbereitung") und `text-blue-900` / `border-blue-200` (Login-Credentials-Hinweis) reparieren; zusaetzlich `bg-emerald-100` und `text-blue-800` mappen | done (v30, 2026-05-10) |
| P-UI-DARKMODE-ROSE | Dark-Mode-Mapping fuer rose-/rot-Familie (`bg-rose-50/100`, `border-rose-200/300/400`, `hover:bg-rose-100`, `text-rose-600/700`, `text-red-700`) — selektierte/falsche Antworten in Quiz-Review-Tiles, Reset-Button, Login-Fehler waren unlesbar (helle slate-800-Schrift auf hellem Pink) | done (v32, 2026-05-10) |
| P-UI-LOGIN-TEMP-DISABLE | Login-Feature temporaer deaktivieren; Schulungen ohne Auth-Gate zugaenglich machen und Hinweis im Konto-Tab anzeigen | done (v33, 2026-05-10) |
| P-UI-LOGIN-REACTIVATE | Login-Feature wieder aktivieren: `AUTH_TEMPORARILY_DISABLED` entfernen/auf false setzen, Auth-Gate und Konto-Login pruefen, README-Hinweis zur temporaeren Deaktivierung zuruecknehmen, CACHE_VERSION bumpen | ready |
| P-UI-KATEX-DETAILS-TOGGLE | KaTeX bei `<details toggle>`-Event re-rendern | ready |

(Neue UI-Bugs/Anforderungen kommen als zusaetzliche P-UI-... Eintraege hinzu.)

---

## E) Naechste empfohlene Session

> **Naechster Vorschlag (vom Agent gesetzt):** **P-AUTO-03** (Master-ET Automation Kap. 3 "Feldbus / Industrial Ethernet / TSN").
> Begruendung: Der UI-Bug P-UI-DARKMODE-ROSE wurde in dieser Sitzung erledigt (v32). Damit ist die naechste produktive Master-ET-Erweiterung wieder dran. Kap. 3 schliesst inhaltlich direkt an Kap. 2 (SPS / IEC 61131-3, v31) an und ist Voraussetzung fuer Kap. 6 (Industrie 4.0 — RAMI/AAS/OPC UA bauen auf TSN/OPC-UA-Pub-Sub auf).

---

## F) Aenderungs-Historie dieser Datei

- 2026-05-10: Initiale Anlage. Definiert A) Master-Kapitel, B) 100/Kategorie, C) Medizin-Audit, D) UI-Bugs. Nach Sitzung mit P-UI-CHEATSHEET-COLLAPSE / P-UI-LOGIN-TRIM / Cybersec Kap. 4 (Kap. 4 wurde ohne Paket-ID gefahren und ist im Status-Report v28 als done dokumentiert).
- 2026-05-10: P-UI-AUTH-DEFAULTS-USER erledigt — Demo-User aus `auth-credentials.example.js` in `user/user` umbenannt, Login-Hinweistext in `app.jsx` an `admin/admin` und `user/user` angeglichen.
- 2026-05-10: P-CYBERSEC-05 erledigt — Cybersec Kap. 5 "Risikomanagement und Compliance" produktiv ausgepflegt (4 Lehrseiten zu ISO/IEC 27001:2022 + Annex A, BSI IT-Grundschutz + ISO/IEC 27005:2022, EU-Regulatorik NIS2/CRA, Risiko-Bewertung CVSS v4.0/EPSS/KEV/FAIR/OCTAVE/ISO 31000; 50 quellenbelegte MCQ). CACHE_VERSION v28 → v29. Naechster Vorschlag: P-CYBERSEC-06.
- 2026-05-10: P-CYBERSEC-06 + P-CYBERSEC-STATUS + P-UI-CONTRAST-FIX erledigt. Cybersec Kap. 6 "AI-Security und vertrauenswuerdige Systeme" produktiv (4 Lehrseiten zu Adversarial ML / Privacy-Modellschutz / LLM-Agentic-Sicherheit / MLOps-Governance; 50 quellenbelegte MCQ; Quellenanker u.a. Goodfellow 2015, Madry 2018, Carlini-Wagner 2017, Cohen 2019, Shokri 2017, Abadi 2016, Bonawitz 2017, OWASP LLM Top 10 v2025, NIST AI 600-1, NIST AI RMF 1.0, EU AI Act 2024/1689, ISO/IEC 42001:2023). `status: 'preparation'` von `master_et_cybersec` entfernt — Schulung jetzt vollstaendig produktiv. UI-Kontrast-Fix in Dark-Mode: `bg-amber-100` / `bg-emerald-100` mit Halbtransparenz-Hintergrund mappen, `text-blue-900` / `text-blue-800` auf `#bfdbfe` mappen, `border-blue-200` / `border-amber-200` ergaenzen. CACHE_VERSION v29 → v30. Naechster Vorschlag: P-AUTO-02.
- 2026-05-10: P-UI-DARKMODE-ROSE erledigt — Dark-Mode-Mapping fuer die komplette Rose-/Rot-Familie in `css/styles.css` ergaenzt (`bg-rose-50/100`, `hover:bg-rose-100`, `border-rose-200/300/400`, `text-rose-600/700`, `text-red-700`), analog zu Emerald/Amber. Bug-Symptom: Wrong-answer Review-Tiles im Schulungs- und Schueler-Quiz, der Reset-Button und Login-Fehler-Hinweise rendern Inhalt mit (gemappter) slate-800-Schrift `#e2e8f0` auf nicht gemapptem hellrosa Tailwind-Default `#fff1f2` — Text quasi unsichtbar. Fix mappt rosa Backgrounds halbtransparent dunkel und hebt rose-Texte auf helle Tints (`#fda4af` / `#fca5a5`). CACHE_VERSION v31 → v32. Naechster Vorschlag: P-AUTO-03.
- 2026-05-10: P-AUTO-02 erledigt — Master-ET Automation Kap. 2 "SPS / IEC 61131-3 / 61499" produktiv ausgepflegt: 4 Lehrseiten (2.1 IEC 61131-3 Sprachen+Datenmodell+Software-Modell, 2.2 POU+Standard-FB+Tasking+Echtzeit, 2.3 Funktionale Sicherheit IEC 61508 / 62061:2021 / ISO 13849-1:2023 + PLCopen Safety v2.01, 2.4 IEC 61499:2012 verteilte ereignisgetriebene Steuerung + 4DIAC + EcoStruxure). 50 quellenbelegte MCQ mit Quellenanker pro `explanation` (IEC 61131-3:2013 inkl. Annex F+G, IEC 61499-1:2012, IEC 61508-2:2010 Tabellen 2/3 + SFF-Formel, IEC 62061:2021, ISO 13849-1:2023, PLCopen Safety TS Part 1 v2.01:2018, John/Tiegelkamp 2010, Vyatkin 2020, Heinrich 2021). `correct`-Verteilung balanciert auf [13,13,12,12] ueber A/B/C/D. CACHE_VERSION v30 → v31. Naechster Vorschlag: P-AUTO-03.
- 2026-05-10: P-UI-LOGIN-TEMP-DISABLE erledigt — Login-Feature temporaer ueber `AUTH_TEMPORARILY_DISABLED` deaktiviert; Schulungen-Gate laesst Inhalte ohne Session durch, Konto-Tab zeigt Hinweis statt Login-Formular, README markiert den temporären Status. Reaktivierung als P-UI-LOGIN-REACTIVATE aufgenommen. CACHE_VERSION v32 → v33. Naechster Vorschlag bleibt P-AUTO-03.
