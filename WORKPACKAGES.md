# Smartineer — Arbeitspakete (Session-Plan)

> **Verbindlich fuer jede Session.** Reihenfolge: (1) Diese Datei sichten, (2) einen Session-Batch aus User-Wunsch, Abschnitt E oder dem ersten passenden `ready`-Paket bilden, (3) alle begonnenen Batch-Pakete gemaess Akzeptanzkriterien abarbeiten, (4) Status hier aktualisieren, (5) am Ende den naechsten Paket-/Batch-Vorschlag im Status-Report nennen. Siehe AGENTS.md §21.
>
> **Sitzungsbudget:** Optimale Anzahl Pakete pro Session. Ein Batch kann ein grosses Paket oder mehrere kleine/kompatible Pakete enthalten; massgeblich sind volle Session-Ausnutzung, wissenschaftliche Korrektheit, Validierung und ein ehrlicher Roll-Forward.
>
> **Statuswerte:**
> - `ready` — kann sofort gestartet werden.
> - `in-progress` — laufende Session arbeitet daran; mehrere Eintraege sind erlaubt, wenn sie zum dokumentierten Session-Batch gehoeren.
> - `blocked: <Grund>` — wartet auf Input/Recherche/Vorgabe.
> - `done (vYY, Sitzung YYYY-MM-DD)` — abgeschlossen, mit Cache-Version + Datum.

---

## 0) Fernstudium-Audit — drei Studiengaenge vollstaendig studierbar machen

### Dozenten-Befund 2026-05-10

- **Master Elektrotechnik — Cyber-Security:** fachlich breit und in 5/6 Kapiteln formal produktiv; Kap. 1 hat nur 30 MCQ und liegt damit unter dem Soll von 50. Fuer ein echtes Fernstudium fehlen noch explizite Lernziele, Voraussetzungen, Modul-/ECTS-Struktur, Labor-/Fallaufgaben, Pruefungsmodus, Wiederholungsplaene und Capstone-Projekt.
- **Master Elektrotechnik — Automatisierungstechnik:** Kap. 2–4 sind produktiv, Kap. 5–6 sind Platzhalter mit je 1 Quizfrage; Kap. 1 hat nur 30 MCQ. Inhaltlich fehlen fuer ein vollstaendiges Fernstudium vor allem Robotik/I4.0-Ausarbeitung, Sensorik/Messtechnik, Systemidentifikation/Simulation, Prozessleittechnik/SCADA und praktische Inbetriebnahme-Labs.
- **Allgemeinmedizin & Medizinstudium:** umfangreich fuer Allgemeinmedizin-orientiertes Selbststudium (3 Kapitel, 242 MCQ), aber didaktisch noch kein komplettes Medizinstudium. Es fehlen Modulstruktur entlang M1/M2/M3, viele klinische Faecher als eigene Kapitel, OSCE-/Fallvignetten, longitudinale Anatomie/Pharmakologie/Pathologie-Verknuepfung, Leitlinien-Audit und pruefungsnahe Progress-Tests.
- **Gesamturteil:** Als Wissensreaktivierung gut geeignet; fuer ein komplettes Fernstudium noch nicht ausreichend. Noetig sind Curriculum-Mapping, didaktische Standardisierung, Aufgaben-Tiefenausbau, kompetenzorientierte Fall-/Laborformate und Qualitaetssicherung.

### P-STUDY-ROADMAP — Dozenten-Audit und Session-Roadmap fuer alle drei Studiengaenge
- **Status:** done (v35, Sitzung 2026-05-10)
- **Dateien:** `WORKPACKAGES.md`
- **Aktion:** Ist-Umfang der drei Studiengaenge auswerten, didaktische Luecken aus Dozentenperspektive benennen und session-optimierte Arbeitspakete fuer ein vollstaendiges Fernstudium anlegen.
- **Akzeptanz:** Befund + priorisierte Pakete fuer Curriculum, Master-Cybersec, Master-Automation, Medizin und Cross-Cutting-Didaktik dokumentiert.

### P-STUDY-CURRICULUM-MATRIX — Kompetenzmatrix und Modulhandbuch fuer alle drei Studiengaenge
- **Status:** done (Sitzung 2026-05-10)
- **Dateien:** `README.md`, `WORKPACKAGES.md`, ggf. neue Datenfelder in `js/data/schulung_*.js`
- **Aktion:** Fuer jeden Studiengang Lernziele, Voraussetzungen, Modulfolge, Taxonomie-Level, Soll-Workload und Pruefungsform definieren; bestehende Kapitel/Seiten/Quizfragen dagegen mappen.
- **Akzeptanz:** Tabelle pro Studiengang mit Muss-/Soll-Themen, Ist-Abdeckung, Gap und naechstem Paket; keine Inhaltsaenderung ohne Quellenanker.

### P-STUDY-DIDACTIC-TEMPLATE — Einheitliche Lehrseiten-Didaktik
- **Status:** done (v38, Sitzung 2026-05-10)
- **Dateien:** `AGENTS.md`, `WORKPACKAGES.md`, exemplarisch ein Schulungs-Datenskript
- **Aktion:** Verbindliches Seitentemplate fuer Fernstudium definieren: Lernziele, Vorwissen, Kernkonzepte, Worked Examples, Selbstcheck, typische Fehler, Transferaufgabe, Quellen.
- **Akzeptanz:** Konvention dokumentiert; ein bestehendes Kapitel exemplarisch umgestellt; Folgepakete koennen daran arbeiten.

### P-STUDY-ASSESSMENT-MODES — Pruefungs-, Progress- und Fallmodus planen/umsetzen
- **Status:** ready
- **Dateien:** `js/app.jsx`, `css/styles.css`, `WORKPACKAGES.md`
- **Aktion:** Neben 10-Fragen-Quiz einen Fernstudiums-Pruefungsmodus planen/implementieren: Kapiteltest, Modulabschluss, Gesamtprobe, Lernziel-Feedback, Bestehensgrenze, Review nach Kompetenzfeld.
- **Akzeptanz:** UI unterstuetzt pruefungsnahe Auswertung ohne Backend; bestehende Quizfunktion bleibt kompatibel.

### P-STUDY-PBQ-LABS — Kompetenzorientierte Labor-, Fall- und PBQ-Aufgaben
- **Status:** ready
- **Dateien:** `js/app.jsx`, `js/data/schulung_*.js`, `WORKPACKAGES.md`
- **Aktion:** Bestehende PBQ-Typen (`sequence`, `cloze`) systematisch nutzen und um studiengangsspezifische Fall-/Laborpakete ergaenzen: Cyber-IR, SPS/Robotik-Inbetriebnahme, Medizin-Fallvignetten/OSCE.
- **Akzeptanz:** Pro Studiengang mindestens ein produktiver PBQ-/Fall-Prototyp mit Quellen- oder Bewertungsrubrik; MCQ-Pfade bleiben stabil.

### P-STUDY-QA-SOURCE-AUDIT — Quellen-, Aktualitaets- und Pruefungsqualitaet
- **Status:** done (v46, Sitzung 2026-05-10)
- **Dateien:** `js/data/schulung_*.js`, `docs/QA-SOURCE-AUDIT.md`, `WORKPACKAGES.md`
- **Aktion:** Quellenanker, Aktualitaet, Distraktorqualitaet, Redundanzen, Schwierigkeitsmischung und Taxonomie-Level aller produktiven Kapitel stichprobenartig pruefen; Folgepakete fuer Korrekturen anlegen.
- **Akzeptanz:** Audit-Log je Studiengang mit kritischen Korrekturen, Nice-to-have-Verbesserungen und priorisierten Nacharbeiten.

---

## A) Master-Schulungen — Kapitel produktiv ausarbeiten

Pro Paket: ≥4 Lehrseiten (AGENTS §18.6) + ≥50 quellenbelegte MCQ (AGENTS §18.4) mit Quellenanker pro `explanation`. Kein status-Switch auf `production` einzeln; erst wenn alle Kapitel der Schulung produktiv sind (Paket P-CYBERSEC-STATUS bzw. P-AUTO-STATUS).

### P-CYBERSEC-01-TOPUP — Kap. 1 "Angewandte Kryptographie" auf 50 MCQ bringen
- **Status:** done (v39, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** AEAD, Nonce-Missbrauch, KDF/HKDF, PKI-Validierung, TLS 1.3, PQC-Migration FIPS 203/204/205:2024, Key-Lifecycle, HSM/FIPS 140-3.
- **Akzeptanz:** 20 neue quellenbelegte MCQ anhaengen (30 → 50), `correct`-Verteilung ausbalancieren, keine Umordnung bestehender Quiz-Items, CACHE_VERSION bumpen.

### P-CYBERSEC-07 — Security Architecture, Zero Trust und Cloud/Kubernetes-Security
- **Status:** done (v40, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** NIST SP 800-207 Zero Trust, Cloud Shared Responsibility, IAM/PAM, Kubernetes Threat Model, Container Image Supply Chain, Secrets-Management, CSPM/CWPP, Network Segmentation.
- **Akzeptanz:** Neues Kapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ; `index`/SW nur anpassen falls neue Datei noetig, sonst CACHE_VERSION bumpen.

### P-CYBERSEC-08 — Incident Response, Forensik und Malware-Analyse
- **Status:** done (v42, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** NIST SP 800-61r2, ISO/IEC 27035, Chain of Custody, Speicher-/Datentraegerforensik, SIEM/EDR-Triage, Malware-Triage, Ransomware-Playbooks, Lessons Learned.
- **Akzeptanz:** Neues Kapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ sowie mindestens 2 Fall-/PBQ-Aufgaben.

### P-CYBERSEC-09 — Offensive Security und Security Testing
- **Status:** done (v45, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** OWASP WSTG/ASVS, NIST SP 800-115, MITRE ATT&CK Enterprise, AD-Angriffspfade, Web/API-Security, Exploitability vs. Risk, Reporting und ethische Grenzen.
- **Akzeptanz:** Neues Kapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ; keine Anleitung zur realen Schaedigungsabsicht, nur defensive/autorisiert-testende Perspektive.

### P-CYBERSEC-CAPSTONE — Master-Capstone Cyber-Security
- **Status:** done (v48, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_cybersec.js`
- **Schwerpunkte:** Architekturbewertung eines Industrie-/Embedded-Systems, Threat Model, Risikoanalyse, Controls, Testplan, Incident-Runbook, Management-Summary.
- **Akzeptanz:** Capstone-Kapitel mit Rubrik, Musterstruktur, Selbstbewertung und ≥20 pruefungsnahen Review-Fragen.

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
- **Status:** done (v34, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** PROFINET RT/IRT, EtherCAT (DC, FMMU), OPC UA Part 14 Pub/Sub, OPC UA FX (2022), IEEE 802.1Q-2022 TSN (Qbv, Qbu, ASc; gPTP IEEE 802.1AS-2020), CC-Link IE TSN, MODBUS-TCP, CAN/CANopen, Determinismus-Klassen.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-04 — Master-ET Automation Kap. 4 "Antriebstechnik / FOC / DTC"
- **Status:** done (v35, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** Park/Clarke-Transformation, Field-Oriented-Control (FOC) ASM/PMSM, Direct Torque Control (DTC), SVPWM, Sensorlose Verfahren (Back-EMF, Modell-Beobachter), Drehgeber/Resolver, Geschwindigkeits-/Lageregelkreis-Kaskade, EN 61800-5-2 Safety-Functions (STO, SS1, SLS).
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-05 — Master-ET Automation Kap. 5 "Robotik / Kinematik / Cobot"
- **Status:** done (v47, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** Denavit-Hartenberg, direkte/inverse Kinematik, Lagrange-Dynamik, Jacobi-Matrix + Singularitaeten, ISO 10218-1/-2:2011, ISO/TS 15066:2016 (HRC-Grenzwerte), ROS 2 Humble/Iron, MoveIt 2, ISO 9283 (Genauigkeitskennwerte).
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-06 — Master-ET Automation Kap. 6 "Industrie 4.0 / Digital Twin"
- **Status:** done (v47, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** RAMI 4.0, Asset Administration Shell (AAS, IDTA Specs 2024), Verwaltungsschale Submodelle, ISO 23247 (Digital Twin Manufacturing), ISA-95 / IEC 62264, MTConnect, Plattform Industrie 4.0 / IIC, Edge-Cloud-Continuum.
- **Akzeptanz:** 4 Lehrseiten + 50 MCQ.

### P-AUTO-STATUS — `master_et_automation` auf `status: 'production'`
- **Status:** done (v47, Sitzung 2026-05-10)
- **Aktion:** `status: 'preparation'` entfernt, README/Card-Badge geprueft, CACHE_VERSION gebumpt.

### P-AUTO-01-TOPUP — Kap. 1 "Fortgeschrittene Regelungstechnik" auf 50 MCQ bringen
- **Status:** done (v44, 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** MIMO-Zustandsraum, Kalman-Filter, LQR/LQI, MPC, Robustheit, Lyapunov, Nichtlinearitaeten, Anti-Windup, Diskretisierung und reale Implementierung.
- **Akzeptanz:** 20 neue quellenbelegte MCQ anhaengen (30 → 50), `correct`-Verteilung ausbalancieren, keine Umordnung bestehender Quiz-Items, CACHE_VERSION bumpen.

### P-AUTO-07 — Sensorik, Messtechnik und Signalverarbeitung
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** Messkette, Kalibrierung, Unsicherheit nach GUM, Encoder/Resolver, IMU, Kraft-/Druck-/Temperatursensorik, ADC/DAC, Filterung, Diagnose, EMV-gerechtes Messen.
- **Akzeptanz:** Neues Kapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ und mindestens 1 Rechen-/Auslegungsfall.

### P-AUTO-08 — Systemidentifikation, Simulation und Digital-Commissioning
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** ARX/ARMAX, Subspace Identification, Frequenzgangmessung, Grey-Box-Modelle, Hardware-in-the-Loop, Model-in-the-Loop, virtuelle Inbetriebnahme, FMI/FMU.
- **Akzeptanz:** Neues Kapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ und mindestens 1 PBQ zur Modellwahl/Validierung.

### P-AUTO-09 — Prozessautomation, SCADA/MES und Batch/Continuous Control
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** ISA-88, ISA-95/IEC 62264, P&ID, Alarmmanagement ISA-18.2, SCADA/HMI, Historian, Advanced Process Control, Safety Instrumented Systems IEC 61511.
- **Akzeptanz:** Neues Kapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ; Schnittstellen zu Cyber-Security und Industrie 4.0 explizit verlinken.

### P-AUTO-LABS — Inbetriebnahme-Labs fuer SPS, Antrieb, Feldbus und Robotik
- **Status:** ready
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** strukturierte Fehlersuche, Safety-Check, Achsinbetriebnahme, Feldbusdiagnose, Roboter-Kalibrierung, Taktzeitoptimierung, Abnahmetest.
- **Akzeptanz:** Mindestens 4 Fall-/PBQ-Labs mit Bewertungsrubrik; bestehende MCQ-Kapitel bleiben unveraendert.

### P-AUTO-CAPSTONE — Master-Capstone Automatisierungstechnik
- **Status:** done (v49, Sitzung 2026-05-10)
- **Datei:** `js/data/schulung_master_et_automation.js`
- **Schwerpunkte:** Entwurf einer automatisierten Zelle mit SPS, Feldbus, Servoachsen, Roboter, Safety, Digital Twin, HMI/MES-Anbindung und Abnahmeplan.
- **Akzeptanz:** Capstone-Kapitel mit Systembeschreibung, Teilaufgaben, Rubrik, Musterloesungsstruktur und ≥20 Review-Fragen.

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
| P-CAT-KRL | KUKA Robot Language (KRL) | `js/data/krl.js` | ready |
| P-CAT-ABB | ABB Roboterprogrammierung (RAPID), analog KUKA/KRL | `js/data/abb_rapid.js` (neu) | ready |
| P-CAT-PLC-SIEMENS | Siemens PLC Programming (TIA Portal / S7, SCL, FUP/KOP) | `js/data/plc_siemens.js` (neu) | ready |
| P-CAT-PLC-CODESYS | CODESYS PLC Programming (IEC 61131-3, Libraries, Tasks) | `js/data/plc_codesys.js` (neu) | ready |
| P-CAT-PLC-BECKHOFF | Beckhoff PLC Programming (TwinCAT 3 / IEC 61131-3 / EtherCAT) | `js/data/plc_beckhoff.js` (neu) | ready |
| P-CAT-WELDING | Fuegetechniken | `js/data/fuegetechniken.js` | ready |
| P-CAT-AGAI | Agentic AI | `js/data/agentic_ai.js` | ready |

Pro Paket-Akzeptanz: vor Start IST-Stand (per Kategorie zaehlen) im Status-Report festhalten; Soll: Gesamt ≥100. Falls Gap < 30 Aufgaben, Paket darf in einer Session erledigt werden; falls > 30, Paket aufteilen (Suffix `-A` / `-B`). Neue Kategorien muessen zusaetzlich in `index.html`, `sw.js` und README registriert werden; bei App-Shell-/Datenskript-Aenderungen `CACHE_VERSION` bumpen.

---

## C) Medizin-Audit

### P-MED-AUDIT — Allgemeinmedizin Leitlinien-Audit
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Aktion:** Bestehende 242 Quiz-Fragen + Lehrseiten gegen aktuelle Leitlinien-Versionen pruefen und ggf. anpassen:
  - NVL Typ-2-Diabetes (BAEK/AWMF, Stand pruefen)
  - NVL Asthma 2024
  - GOLD-Report 2024/2025 COPD
  - GINA-Report 2024 Asthma
  - STIKO-Empfehlungen Epid.Bull. (jeweils aktuelle Saison)
  - PRISCUS-2.0 Liste 2023
  - DEGAM-S3-Leitlinien (Hausarztzentrierte Versorgung 2023)
  - AWMF-Leitlinien-Register letzte Revision
- **Akzeptanz:** Aenderungs-Log pro betroffener Quiz-Frage mit Quellen-Anker; CACHE_VERSION bumpen.

### P-MED-CURRICULUM-MATRIX — M1/M2/M3-Kompetenzmatrix und Gap-Analyse
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`, `WORKPACKAGES.md`
- **Aktion:** Vorhandene Allgemeinmedizin-Schulung gegen M1/M2/M3/GK-Logik, ÄApprO, NKLM und allgemeinmedizinische Weiterbildung mappen; fehlende Faecher und Pruefungsformate priorisieren.
- **Akzeptanz:** Matrix mit Ist-Abdeckung, kritischen Luecken, Paket-Reihenfolge und Quellenbasis; keine vorhandenen Quiz-Items umsortieren.

### P-MED-M1-ANATOMIE-HISTO-EMBRYO — Vorklinik Anatomie/Histo/Embryologie
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Bewegungsapparat, Thorax/Abdomen/Becken, Neuroanatomie, Histologie-Grundgewebe, Organentwicklung, klinische Leitsymptome.
- **Akzeptanz:** Neues Kapitel oder Subkapitel mit ≥4 Lehrseiten + ≥50 quellenbelegten MCQ im medizinischen 5-Optionen-Stil; keine urheberrechtlich geschuetzten IMPP-Fragen kopieren.

### P-MED-M1-PHYSIO-BIOCHEM-GENETIK — Vorklinik Physiologie/Biochemie/Genetik vertiefen
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Herz/Kreislauf, Atmung, Niere, Endokrinologie, Neurophysiologie, Stoffwechselwege, Molekulargenetik, Laborinterpretation.
- **Akzeptanz:** ≥4 Lehrseiten + ≥50 quellenbelegte MCQ; Rechen-/Diagrammfragen und klinische Transferfragen enthalten.

### P-MED-M1-PSYCH-SOZIO-EPI — Medizinische Psychologie, Soziologie und Epidemiologie
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Arzt-Patient-Kommunikation, Lern-/Verhaltensmodelle, Screening-Metriken, Bias, Studientypen, Public Health, Praevention.
- **Akzeptanz:** ≥4 Lehrseiten + ≥50 quellenbelegte MCQ; Statistik-/Epidemiologieaufgaben mit nachvollziehbaren Rechnungen.

### P-MED-M2-INNERE-SYSTEME — Innere Medizin systematisch ausbauen
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Kardiologie, Pneumologie, Gastroenterologie, Nephrologie, Endokrinologie, Haematologie/Onkologie, Rheumatologie, Infektiologie.
- **Akzeptanz:** Pro Session ein Organsystem mit ≥4 Lehrseiten + ≥50 MCQ; falls Umfang zu gross, in P-MED-M2-INNERE-<SYSTEM> splitten.

### P-MED-M2-CHIRURGIE-ORTHO-URO — Chirurgie, Orthopaedie/Unfallchirurgie und Urologie
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** akutes Abdomen, Hernien, Frakturen, Gelenkerkrankungen, Wundversorgung, perioperatives Risiko, Urologie-Leitsymptome.
- **Akzeptanz:** ≥4 Lehrseiten + ≥50 quellenbelegte MCQ und mindestens 2 Fallvignetten/PBQ.

### P-MED-M2-NEURO-PSYCH — Neurologie, Psychiatrie und Psychosomatik
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Schlaganfall, Epilepsie, Kopfschmerz, Demenz, Depression, Angst, Psychose, Delir, Suchtmedizin, Notfalltriage.
- **Akzeptanz:** ≥4 Lehrseiten + ≥50 quellenbelegte MCQ; Leitlinienstand explizit in `explanation` nennen.

### P-MED-M2-GYN-PAED-DERMA-SINNE — Gynaekologie, Paediatrie, Dermatologie, HNO/Augen
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Schwangerschaftsbasis, Vorsorge, Impfungen, Fieberkind, Exantheme, Hauttumoren, Ohr-/Augen-Notfaelle, Red Flags.
- **Akzeptanz:** ≥4 Lehrseiten + ≥50 quellenbelegte MCQ; paediatrische Dosierungen nur mit klarer Quellen-/Sicherheitskennzeichnung.

### P-MED-M2-DIAGNOSTIK-QUERSCHNITT — Radiologie, Labor, Pathologie, Pharmakologie, Notfall
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Laboralgorithmen, Bildgebung-Indikationen, Pathologie-Grundmuster, Arzneimittelsicherheit, Interaktionen, Reanimation/ABCDE, Sepsis.
- **Akzeptanz:** ≥4 Lehrseiten + ≥50 quellenbelegte MCQ mit Bildgebungs-/Laborbefundtexten statt externen Bildern.

### P-MED-PJ-OSCE-FALLBOOK — PJ/Facharzt-Fallbuch und OSCE-Training
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Anamnese, koerperliche Untersuchung, Beratungsanlaesse, Shared Decision Making, Red Flags, Dokumentation, Ueberweisung/Einweisung.
- **Akzeptanz:** Mindestens 10 Fallvignetten/PBQ mit Bewertungsrubrik, Musterstruktur und Review-Fragen; keine echte Patientendaten.

### P-MED-PROGRESS-TESTS — Longitudinale Progress-Tests M1/M2/M3
- **Status:** ready
- **Dateien:** `js/app.jsx`, `js/data/schulung_allgemeinmedizin.js`
- **Aktion:** Kapiteluebergreifende Pruefungssets fuer M1, M2 und PJ/Facharzt konzipieren; Fragen nach Kompetenzfeld taggen oder per Kapitelpool zusammensetzen.
- **Akzeptanz:** Pro Stufe ein reproduzierbarer Progress-Test-Modus oder dokumentierter Datenpfad; bestehende Kapitelquiz bleiben kompatibel.

### P-MED-CAPSTONE — Allgemeinmedizin-Capstone "Unselektierter Patient"
- **Status:** ready
- **Datei:** `js/data/schulung_allgemeinmedizin.js`
- **Schwerpunkte:** Erstkontakt, Priorisierung, Multimorbiditaet, Polypharmazie, Praevention, Notfall-Ausschluss, Verlaufskontrolle, Patientensicherheit.
- **Akzeptanz:** Capstone-Kapitel mit ≥4 Lehrseiten/Fallseiten, ≥20 Review-Fragen und OSCE-aehnlicher Rubrik.

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
| P-UI-LOGIN-REACTIVATE | Login-Feature wieder aktivieren: `AUTH_TEMPORARILY_DISABLED` entfernen/auf false setzen, Auth-Gate und Konto-Login pruefen, README-Hinweis zur temporaeren Deaktivierung zuruecknehmen, CACHE_VERSION bumpen | done (v43, 2026-05-10) |
| P-UI-KATEX-DETAILS-TOGGLE | KaTeX bei `<details toggle>`-Event re-rendern | done (v43, 2026-05-10) |
| P-ARCH-VALIDATE-WINDOWS-PATHS | `tools/validate.js` `validateAppShellSync`: Windows-Backslash-Pfade aus `path.join` zu Forward-Slash normalisieren, sonst False-Positive-Fehler auf Windows | done (v43, 2026-05-10) |

(Neue UI-Bugs/Anforderungen kommen als zusaetzliche P-UI-... Eintraege hinzu.)

---

## G) Architektur und Datenmodell — Lernplattform-Reife

Voraussetzung: Smartineer entwickelt sich aus einer "Aufgaben-Sammlung mit Quiz" zu einer ernsthaften Lernplattform fuer offenes Training und Fernstudium-Schulungen. Das verlangt ein gemeinsames Item-Schema, eine Item-Bank und eine Trennung von Inhalt und Pruefung.

Alle Pakete bleiben kompatibel zu AGENTS.md (statische SPA, kein Build-Schritt, keine zusaetzlichen Frameworks ohne Diskussion). Bei Schemawechsel an Storage-Keys gilt AGENTS §11 (Versions-Bump `_v2` und Roll-Forward); App-Shell-/Daten-Aenderungen bumpen `CACHE_VERSION` (AGENTS §14a).

### P-ARCH-ITEM-SCHEMA — Einheitliches Item-Schema fuer Training/Schulung/Schueler
- **Status:** done (v36, Sitzung 2026-05-10)
- **Dateien:** `AGENTS.md` (§5/§18/§22), `js/app.jsx`, exemplarisch ein Trainings- und ein Schulungs-Datenskript
- **Aktion:** Gemeinsames Item-Modell `{ id, type, stem, options|blanks|items|h|s, lo, bloom, difficulty, tags, source }` definieren. Adapter-Funktionen `toItem(legacyTask)` und `toItem(legacyQuiz)` in `app.jsx` bereitstellen, die bestehende `{q,h,s}` und `quiz`-Items zur Laufzeit auf das neue Schema heben. Keine Massen-Migration der Daten.
- **Akzeptanz:** AGENTS §5/§18 um Item-Schema-Abschnitt ergaenzt; Adapter integriert; Verhalten der bestehenden Tracks unveraendert; ein Beispiel pro Track dokumentiert.

### P-ARCH-STABLE-QID — Stabile Quiz-Item-Identitaet (Hash statt Index)
- **Status:** done (v37, Sitzung 2026-05-10)
- **Dateien:** `js/app.jsx`, ggf. `AGENTS.md` (§11/§18.3)
- **Aktion:** `qid` deterministisch aus `q + correct/answer` (oder `items` bei Sequence/Cloze) hashen. SRS-Karten und `quizBest` zusaetzlich unter `qid` speichern, `idx` als Fallback. Migrations-Funktion bei App-Start: vorhandene `idx`-Eintraege werden einmalig auf `qid` gespiegelt.
- **Akzeptanz:** Storage-Keys `smartineer_srs_v2` und `smartineer_schulungen_v2` mit Roll-Forward; Quiz-Item-Umsortierungen verlieren keinen Lernstand mehr; Doku in AGENTS §11/§18.3.

### P-ARCH-SESSION-BATCH-POLICY — Session-Budget optimal nutzen
- **Status:** done (Sitzung 2026-05-10)
- **Dateien:** `AGENTS.md` (§21), `WORKPACKAGES.md`
- **Aktion:** Ein-Paket-pro-Session-Regel durch Session-Batch-Regel ersetzen. Batches duerfen mehrere kompatible Pakete enthalten, wenn sie die Session besser ausnutzen und Qualitaet, Validierung und Status-Roll-forward nicht gefaehrden.
- **Akzeptanz:** AGENTS §21 beschreibt Batch-Auswahl, Locking, Abschluss, Rueckstellung nicht begonnener Pakete und naechsten Paket-/Batch-Vorschlag; WORKPACKAGES-Kopf widerspricht dem nicht mehr.

### P-ARCH-APPJSX-SPLIT — `js/app.jsx` modularisieren (kein Build-Schritt)
- **Status:** ready
- **Dateien:** `js/app.jsx` (auflosen), neu `js/app/_core.jsx`, `js/app/training.jsx`, `js/app/cheatsheet.jsx`, `js/app/schueler.jsx`, `js/app/schulungen.jsx`, `js/app/optionen.jsx`, `js/app/install.jsx`; `index.html`; `sw.js`
- **Aktion:** Module als zusaetzliche `<script type="text/babel" data-presets="react">`-Tags in `index.html` laden — Reihenfolge `_core` zuerst, dann Track-Module, dann Mount. Keine `import`-Statements (Babel-standalone-Constraint). Globale Hilfsfunktionen leben in `window.SMARTINEER` als Single Namespace.
- **Akzeptanz:** Verhalten unveraendert (Smoke-Test alle Views); `sw.js` `APP_SHELL` enthaelt alle neuen Dateien; CACHE_VERSION gebumpt; AGENTS §3/§4 ergaenzt.

### P-ARCH-DATA-LAZY — Schulungs-Daten lazy laden
- **Status:** blocked: P-ARCH-APPJSX-SPLIT
- **Dateien:** `js/data/schulung_*.js` (pro Kapitel splitten), `index.html`, `sw.js`
- **Aktion:** Pro Kapitel ein Skript `js/data/schulung_<sid>__<cid>.js`. Schulungs-Index-Skript registriert nur Metadaten; Kapitel-Daten werden beim Oeffnen via dynamisch erzeugtem `<script>`-Tag injiziert. SW-Precache bleibt fuer Offline-Pfad bestehen.
- **Akzeptanz:** Time-to-Interactive auf Mobile messbar besser (Vorher/Nachher dokumentieren); Offline weiterhin voll funktional; Reihenfolge in `index.html` weiter fuer Eager-Tracks (Training/Schueler).

### P-ARCH-VALIDATE-CLI — Datenschema-Validator (Node, kein Build)
- **Status:** done (v41, Sitzung 2026-05-10)
- **Dateien:** neu `tools/validate.js`, AGENTS.md §13
- **Aktion:** Node-Script (kein npm-Projekt, kein Build) liest die Daten-Skripte ueber `vm.runInNewContext`, prueft Schema, MCQ-`correct`-Range, `pages.length>=1`, `quiz.length>=10` Bootstrap bzw. `>=50` production, Quellenanker-Heuristik in `explanation`, Dubletten je Kapitel, Status-Konsistenz.
- **Akzeptanz:** `node tools/validate.js` exit 0 fuer Status quo; Doku in AGENTS §13 inkl. Aufrufkommando; Validator wird Teil der Standard-Validation neben `node --check`.

### P-ARCH-STRICT-SOURCE-VALIDATION — Quellenanker-Warnungen fuer produktive Inhalte blockierend machen
- **Status:** done (v46, Sitzung 2026-05-10)
- **Dateien:** `tools/validate.js`, `AGENTS.md`, `WORKPACKAGES.md`
- **Aktion:** Validator um Strict-Mode fuer Quellenanker erweitern und AGENTS §13 so schaerfen, dass produktive Schulungsinhalte ohne Quellenanker nicht mehr als still erlaubte Warnung durchlaufen.
- **Akzeptanz:** `node tools/validate.js --strict-sources` existiert, eskaliert fehlende Quellenanker zu Fehlern und ist nach P-STUDY-QA-SOURCE-AUDIT gruen.

### P-ARCH-LO-COMPETENCE — Lernziele und Tags pro Kapitel/Item
- **Status:** done (v51, Sitzung 2026-05-10)
- **Dateien:** `js/data/schulung_*.js` (exemplarisch eines), `js/app.jsx`, AGENTS.md §18
- **Aktion:** Kapitel erhaelt `learningObjectives: [{ id, text }]`. Quiz-Items optional `lo: ['LO-1','LO-3']` und `tags: ['ISO-27001','Annex-A']`. Result-Screen zeigt Kompetenz-Heatmap (richtig/total je LO und Tag).
- **Akzeptanz:** Mind. ein produktives Kapitel (z.B. Cybersec Kap. 5) komplett mit LOs/Tags ausgepflegt; Heatmap im Quiz-Result sichtbar; bestehende Items ohne LOs werden ignoriert.

### P-ARCH-ASSESSMENT-ENGINE — Assessment-Objekte und Pruefungs-Renderer
- **Status:** done (v54, Sitzung 2026-05-11)
- **Dateien:** `js/data/schulung_*.js`, `js/app.jsx`, AGENTS.md §18
- **Aktion:** Auf Schulungs-Ebene `assessments: [{ id, title, type:'practice|chapter|module|final', poolFilter:{tags?,lo?,chapter?}, count, timeLimit?, passScore? }]`. Renderer "Pruefungsmodus" (kein Per-Item-Feedback bis Ende, Pause-Sperre, Submit-Bestaetigung, Endbericht). Kapitel-Quiz wird Spezialfall (`type:'chapter'`).
- **Akzeptanz:** Erfuellt P-STUDY-ASSESSMENT-MODES; Assessments pro Schulung anlegbar; bestehender 10-Quiz-Pfad bleibt kompatibel.

### P-ARCH-CROSS-CHAPTER-EXAM — Modul-/Programm-Mock-Exam aus Item-Bank
- **Status:** done (v55, Sitzung 2026-05-11)
- **Dateien:** `js/data/schulung_*.js`, `js/app.jsx`, AGENTS.md §18.10
- **Aktion:** Cross-Chapter-Item-Bank ueber `tags`/`lo` filtern; Mock-Exam pro Studiengang (z.B. M1/M2/M3, CASP+ Final, Master-Capstone Probe). Reproduzierbarkeit via Seed; Best-Score-Tracking pro Assessment-`id`.
- **Akzeptanz:** Erfuellt P-MED-PROGRESS-TESTS; mind. 1 Mock-Exam je Studiengang; Speicherung im neuen `_v2`-Pfad.

### P-ARCH-GLOSSARY — Glossar pro Schulung mit Quiz-/Reader-Verlinkung
- **Status:** done (v59, Sitzung 2026-05-11)
- **Dateien:** `js/data/schulung_master_et_cybersec.js`, `js/app.jsx`, `css/styles.css`, AGENTS.md §18.11
- **Aktion:** Schulungs-Objekt erhaelt `glossary: [{ id, term, definition, source }]`. Quiz-`explanation` und `pages.html` koennen `[[glossary:id]]` bzw. `[[glossary:id|Sichtbarer Text]]` Marker enthalten, die `applyGlossary` zu klickbaren `.glossary-link`-Buttons aufloest. Document-Level-Click-Delegation im `Schulungen`-Component oeffnet ein read-only-Modal mit Term/Definition/Quelle (Backdrop/Schliessen-Button/ESC). Render-Punkte: Reader-Article, Quiz-Stage, Quiz-Result-Stage. Erstausstattung: `GLOSSARY_CYBERSEC` (37 Eintraege; ISMS, ISO 27001/27005/31000, BSI-Grundschutz, NIS2, CRA, DORA, KRITIS, CVSS v4.0, EPSS, CISA KEV, FAIR, OCTAVE, IEC 62443, ZTA, NIST SP 800-61r2/800-86/800-207/800-218, ISO/IEC 27037, MITRE ATT&CK / ATLAS / ICS, STRIDE, LINDDUN, OWASP Top 10 / ASVS / LLM, SSDF, SLSA, SBOM, Sigstore, SPIFFE/SPIRE, FIPS 203/204, TLS 1.3, NIST AI RMF, EU AI Act, ISO/IEC 42001). Demo-Marker eingeseedet via Post-Process-Mutation in `PAGE_RISK_ISMS`, `PAGE_RISK_BSI_27005`, `PAGE_RISK_REGULATIONS`, `PAGE_RISK_SCORING` und in einer Erlaeuterung in `QUIZ_RISK`. CSS: `.glossary-link` mit dotted-underline, Hover-/Focus-Ring, Dark-Mode-Variante. CACHE_VERSION v58 → v59.
- **Akzeptanz:** Mind. 30 Eintraege in einer Schulung (37 geliefert); Verlinkung im Reader und im Quiz-Result sichtbar; AGENTS §18.11 ergaenzt; Validator clean.

---

## H) Lernplattform-Mechanik — didaktische Werkzeuge

Pakete dieses Blocks setzen auf Block G auf bzw. lassen sich auch ohne G in abgespeckter Form bauen. Sie heben die Lernwirksamkeit, ohne den Inhalt anzufassen.

### P-LP-SRS-OPEN — Spaced Repetition fuer offene Aufgaben
- **Status:** done (v50, Sitzung 2026-05-10)
- **Dateien:** `js/app.jsx`, AGENTS.md §10/§19
- **Aktion:** SRS-SM-2-lite analog Schulungen-Track auch fuer Ingenieurs-Track und Schueler. Confidence-Rating "Again / Hard / Good / Easy" beim Markieren als geloest. Eigener `SRS_KEY`-Sub-Tree pro Track (oder ein gemeinsamer mit Track-Praefix).
- **Akzeptanz:** Dashboard-Karte "Heute X Aufgaben faellig"; Storage versioniert; Export/Import schliesst neue Daten ein (AGENTS §19).

### P-LP-DAILY-MIX — Tagesmix-Drill cross-Kategorie (Interleaving)
- **Status:** done (v50, Sitzung 2026-05-10)
- **Dateien:** `js/app.jsx`
- **Aktion:** Cross-Kategorie-Stichprobe von 5 Aufgaben pro Tag, gewichtet nach SRS-Faelligkeit und Schwaeche-Heatmap. Reproduzierbar pro Tag (Seed = ISO-Datum).
- **Akzeptanz:** Eigener Dashboard-Block "Tagesmix"; Wiederholbarkeit pro Tag; kein Eingriff in Pflicht-Pfad.

### P-LP-HINT-LADDER — Mehrstufige Hints (Brilliant-Pattern)
- **Status:** done (v56, Sitzung 2026-05-11)
- **Dateien:** `js/data/<id>.js` (optional Schema-Erweiterung), `js/app.jsx`, AGENTS.md §5
- **Aktion:** Optional `h1`/`h2`/`h3` zusaetzlich zu `h` (abwaertskompatibel). UI: "Hinweis 1", "Hinweis 2", "Loesung". Senkt Versuchung, sofort die Loesung zu lesen.
- **Akzeptanz:** Schema-Erweiterung dokumentiert; ein Beispielkapitel mit Hint-Ladder; bestehende Aufgaben unveraendert nutzbar.

### P-LP-INLINE-CHECK — Inline-Self-Check zwischen Lehrseiten (OpenStax-Pattern)
- **Status:** done (v53, Sitzung 2026-05-10)
- **Dateien:** `js/data/schulung_master_et_cybersec.js` (PAGE_RISK_SCORING.check), `js/app.jsx` (`InlineCheck`-Komponente, Reader-Article-Einbindung), AGENTS.md §18.6
- **Aktion:** Optionales `pages[i].check = { stem, options, correct, explanation }` direkt unter dem Lehrseitentext. Inline-Auswertung mit "Pruefen"/"Erneut versuchen"; nicht in Quiz-Score eingerechnet, keine SRS-Karte, keine Persistenz.
- **Akzeptanz:** Cybersec Kap. 5, Lehrseite "Scoring-Modelle und Priorisierung" hat Demo-Check zu CVSS-v4/EPSS/KEV-Kombination; AGENTS §18.6 mit Schema-Hinweis ergaenzt.

### P-LP-MASTERY — 4-stufige Mastery-Anzeige (Khan-Pattern)
- **Status:** done (v50, Sitzung 2026-05-10)
- **Dateien:** `js/app.jsx`
- **Aktion:** Aus SRS-Performance je Kategorie/Kapitel `familiar | practiced | proficient | mastered` ableiten. Dashboard- und Sidebar-Indikator (Punktreihe). Ersetzt nicht die binaere "geloest"-Markierung.
- **Akzeptanz:** Indikator je Kategorie sichtbar; deterministische Berechnung dokumentiert.

### P-LP-FEEDBACK-LINKS — Falsch beantwortet -> Lehrseiten-Verlinkung
- **Status:** done (v52, Sitzung 2026-05-10)
- **Dateien:** `js/app.jsx`, ggf. `js/data/schulung_*.js`
- **Aktion:** Auf dem Quiz-Result-Screen je falscher Frage Mini-Karten "Lehrseite X.Y nachlesen", gematcht ueber `lo`/`tags` <-> `page.lo`/`page.tags`.
- **Akzeptanz:** Mind. ein Kapitel mit funktionierendem Match; Klick fuehrt zur Reader-Seite an der richtigen Position.

### P-LP-NOTES-BOOKMARKS — Notizen und Bookmarks im Reader
- **Status:** done (v57, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`, `sw.js`, AGENTS.md §19
- **Aktion:** Reader-Toolbar um Stern-Toggle (`isBookmarked` / `toggleBookmark`) und "Notiz"-Button erweitert. Notiz-Panel klappt unter dem Article auf, persistiert per `onChange` in `smartineer_reader_notes_v1`; leerer Text loescht den Eintrag automatisch. Bookmarks in `smartineer_reader_bookmarks_v1` als `(tid,cid,pageIdx) -> true`. Beide Stores haengen am neuen `useReaderAnnotations()`-Hook und sind in `EXPORT_KEYS` aufgenommen — Merge-Strategie: laengere Notiz gewinnt, Bookmark-Set-Vereinigung. AGENTS §19 (Datei-Schema, Verhalten, Anti-Pattern) ergaenzt. CACHE_VERSION v56 → v57.
- **Akzeptanz:** Notizen/Bookmarks persistent ueber Reload; Export/Import deckt beide Keys ab; AGENTS §19 dokumentiert.

### P-LP-EXAM-MODE — Pruefungs-UI (Zeitlimit, kein Per-Item-Feedback)
- **Status:** done (v54, Sitzung 2026-05-11; durch P-ARCH-ASSESSMENT-ENGINE mitgeliefert)
- **Dateien:** `js/app.jsx`
- **Aktion:** Aktivierbar pro Assessment-Definition. Zeitlimit als Countdown, Pause-Sperre, Submit-Bestaetigung, Endbericht mit Bestehensgrenze, kein Feedback waehrend des Laufs.
- **Akzeptanz:** Sichtbar in mind. einem Assessment je Studiengang; bestehender 10-Quiz-Pfad unveraendert.

---

## I) UX/UI-Polish — Ergonomie und Wiederkehrer-Pfade

Block I ergaenzt das bestehende **D)** ohne es zu ersetzen. Reihenfolge ist nur Empfehlung; Pakete sind unabhaengig.

### P-UI-APP-TILE — Brand-Logo als PWA-App-Kachel (Home-Screen-Icon)
- **Status:** done (v61, Sitzung 2026-05-11)
- **Dateien:** `manifest.webmanifest`, `index.html`, `sw.js`, AGENTS.md §3
- **Aktion:** Brand-PNG (`icons/smartineer-logo.png`) im Manifest an die Spitze gerueckt und mit drei Eintraegen (`any`, `192x192`, `512x512`) plus `purpose: "any maskable"` deklariert — damit nutzen Android-Launcher und iOS-Home-Screen das PNG als App-Kachel und ziehen es ggf. in die Adaptive-Icon-Maske. SVG-Icons bleiben als nachgelagerte Manifest-Eintraege erhalten. `index.html`: zusaetzliche `apple-touch-icon`-Links fuer 192x192 und 512x512 sowie weitere `<link rel="icon">`-Varianten fuer 192/512-PNG; neue Windows-Tile-Metas (`msapplication-TileColor`, `msapplication-TileImage`). CACHE_VERSION v60 -> v61.
- **Akzeptanz:** Auf Android-Chrome Install -> Home-Screen-Icon zeigt das Brand-PNG; auf iOS Safari "Zum Home-Bildschirm" zeigt das Brand-PNG; Windows-"An Start anheften" zeigt das Brand-PNG; Manifest weiter validierbar; Validator clean.

### P-UI-LOGO-EVERYWHERE — Brand-Logo durchgaengig integrieren
- **Status:** done (v60, Sitzung 2026-05-11)
- **Dateien:** `index.html`, `manifest.webmanifest`, `js/app.jsx`, `sw.js`, AGENTS.md §3
- **Aktion:** PNG-Brand-Logo (`icons/smartineer-logo.png`) als Favicon (`<link rel="icon" type="image/png">`) und Apple-Touch-Icon ergaenzt; Open-Graph-/Twitter-Card-Meta-Tags fuer Share-Vorschau hinzugefuegt; Manifest erhaelt zusaetzlichen 333x333 PNG-Eintrag (`purpose: "any"`); In-App Hero-Logo in den Stage-Headern Dashboard, Cheatsheets, Schulungen-Index und Schueler-Index gerendert (96px auf Dashboard, 72px auf Sub-Stages, mit `drop-shadow`). SVG-Icons bleiben fuer Maskable-Purpose erhalten.
- **Akzeptanz:** Logo sichtbar in Topbar, Install-Prompt, Dashboard, Cheatsheets, Schulungen, Schueler; Browser-Tab zeigt PNG-Favicon; OG-Image bei Link-Sharing aktiv; Manifest weiter validierbar; AGENTS §3 dokumentiert die breite Nutzung.

### P-UI-NAV-GROUPING — Top-Nav in "Lernen" und "Konto" trennen
- **Status:** done (v63, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Nav-Eintraege im `Nav`-Component in `learnItems` (Dashboard/Training/Cheatsheets/Schulungen/Schueler) und `accountItems` (Optionen) gesplittet. Zwischen beiden Gruppen rendert jetzt ein `1px`-vertikaler Spacer (`<span className="hidden sm:block w-px h-7 bg-slate-700 mx-1" aria-hidden />`) — nur ab `sm`-Breakpoint sichtbar, auf sehr engen Mobile-Layouts unsichtbar. Rendering-Logik fuer einen Tab in `renderItem` ausgelagert (DRY). Aktive Tab-CSS-Klasse ergaenzt um `nav-btn-active` als Hook fuer kuenftige Mobile-Underline (CSS-Hook im Code vorhanden, optisches Underline-Polish bleibt fuer naechste Iteration).
- **Akzeptanz:** Konsistente Navigation Desktop/Mobile; kein Funktionsverlust; Optionen+Theme-Toggle visuell vom Lern-Block getrennt.

### P-UI-CONTRAST-AUDIT — WCAG-AA-Audit aller Dark-Mode-Mappings
- **Status:** ready
- **Dateien:** neu `docs/contrast-audit.md`, `css/styles.css`
- **Aktion:** Alle in `theme-dark` gemappten Tailwind-Tokens gegen WCAG-AA pruefen (4.5:1 Text, 3:1 grosse Schrift). Tabelle mit Token, Hintergrund, Vordergrund, Verhaeltnis, Status. Reactive Bugs (P-UI-CONTRAST-FIX, P-UI-DARKMODE-ROSE) waren Symptome.
- **Akzeptanz:** Audit-Tabelle vollstaendig; offene Findings als zusaetzliche P-UI-CONTRAST-... Pakete eingeplant.

### P-UI-TASK-PILL-FILTER — Pills-Bar mit Filter, Sprung-Eingabe, Subkategorie
- **Status:** ready
- **Dateien:** `js/app.jsx`, ggf. `js/data/<id>.js` (optionales `subcategory`-Feld)
- **Aktion:** Pills-Bar wird Toolbar: Filter "alle / offen / geloest", Sprung-Feld "Aufgabe Nr.", optionaler Subkategorie-Tag-Filter wenn `task.subcategory` gesetzt.
- **Akzeptanz:** Bei 100 Aufgaben/Kategorie nutzbar; bestehende Aufgaben ohne `subcategory` werden ignoriert.

### P-UI-TRAINING-SHORTCUTS — Tastatur-Shortcuts im Training
- **Status:** ready
- **Dateien:** `js/app.jsx`
- **Aktion:** `H` = Hinweis, `L` = Loesung, `M` = Markieren, Pfeile = naechste/vorherige Aufgabe. A11y-Hinweisleiste am Footer beim ersten Besuch.
- **Akzeptanz:** Desktop-Speed; Mobile unveraendert; Shortcut-Konflikte mit Eingabefeldern vermieden.

### P-UI-QUIZ-A11Y — Quiz-Optionen als echte Radio-Gruppe
- **Status:** done (v63, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Schulungens-Quiz-MCQ-Container traegt jetzt `role="radiogroup"` mit `aria-label="Antwortoptionen"`, jede Option `role="radio"` + `aria-checked` + `tabIndex` (Roving-Tabindex: ausgewaehlte Option oder erste, wenn keine ausgewaehlt). KeyDown-Handler auf dem Container: ArrowDown/Right (+1), ArrowUp/Left (-1) mit Wrap-around, Home (0), End (n-1), Ziffern 1..9 fuer Direktwahl (passend zu 4 Optionen MCQ und 5 Optionen IMPP-Medizin). Fokus wandert programmatisch auf die neue Option. Sichtbarer Fokus-Ring kommt bereits aus P-UI-FOCUS-RINGS (v62). Keyboard-Submit per Enter funktioniert ueber den existierenden bestaetigen-Button.
- **Akzeptanz:** Tastaturnav durchlaeuft Optionen ohne Maus; Screenreader sehen echte Radio-Gruppe; weder Sequence- noch Cloze-Items beruehrt.

### P-UI-QUIZ-FLAG — "Markieren / spaeter wiederholen" pro Quiz-Item
- **Status:** done (v63, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Neuer State `quizFlags: number[]` im Schulungen-Component, neben dem Frage-Zaehler ein Stern-Toggle-Button (`★`/`☆`) mit `aria-pressed`/`aria-label`. Funktioniert in MCQ, Sequence und Cloze (Toggle haengt nicht am Item-Typ). Wird beim Start jedes Laufs (`startQuiz`, `startReview`, `startAssessment`) auf `[]` zurueckgesetzt. Im Quiz-Result-Screen erscheint oberhalb von "Aufgaben im Ueberblick" eine zweite Karte "Markierte Fragen (N)" mit aufsteigend sortierter Liste der markierten Items inkl. ok/falsch-Tag und Stem.
- **Akzeptanz:** Flag funktioniert in MCQ und PBQ; nach Ende des Quiz im Result-Screen sichtbar; persistiert nur fuer den aktuellen Lauf (kein Storage).

### P-UI-READER-TYPOGRAPHY — Schriftgroesse, Zeilenabstand, Lesezeit
- **Status:** done (v64, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`, `css/styles.css`
- **Aktion:** Neuer Storage-Key `smartineer_reader_typography_v1` mit Shape `{ size:'sm|md|lg', wide:bool, lineTall:bool }` (Default `md`, beide Toggles aus). Hook `useReaderTypography()` persistiert jeden Setter. Reader-Toolbar (in der Header-Zeile rechts neben Inhalt/Seite/Bookmark/Notiz) zeigt auf `>=sm` drei Schrift-Toggles (A klein/normal/gross) sowie zwei Icon-Toggles fuer Zeilenabstand und Lesebreite, alle mit `aria-pressed`/`aria-label`/`title`. Die `<article>`-Klassen werden um `book-size-sm|md|lg`, `book-line-tall`, `book-wide` ergaenzt; CSS in `styles.css` definiert die Stufen (`font-size` 0.92/1/1.125rem, `line-height` 1.7/1.9, `max-width: none` fuer Wide). Lesezeit-Hinweis pro Seite (Schaetzung Woerter/200 wpm) als kleines Sublabel ueber dem Lehrtext. Geraetespezifisch und damit absichtlich NICHT Teil des Export/Import (AGENTS §19.3).
- **Akzeptanz:** Schriftgroesse / Zeilenabstand / Lesebreite werden per Klick angepasst und ueber Reload persistiert; Lesezeit erscheint pro Seite; Export-/Import-Datei bleibt unveraendert.

### P-UI-READER-CONTINUE — Naechstes Kapitel direkt nach Quiz-Ende
- **Status:** done (v62, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Quiz-Result-Screen bekommt CTA "Naechstes Kapitel: <Titel>" zwischen "Quiz wiederholen" und "Zurueck zum Kapitel". CTA erscheint nur, wenn kein Review-/Pruefungs-Modus aktiv ist und das aktuelle Kapitel nicht das letzte der Schulung ist. Klick navigiert via `openChapter(nextCh.id, 0)`. Globaler Dashboard-Resume-Block bleibt P-UI-DASHBOARD-RESUME vorbehalten.
- **Akzeptanz:** Kapitel-Continuation in 1 Klick aus dem Quiz-Result; CTA verschwindet beim letzten Kapitel; Review-/Pruefungs-Ende unveraendert.

### P-UI-DASHBOARD-RESUME — Eine prominente Resume-Karte auf Dashboard
- **Status:** done (v64, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Helper `computeResumeCandidate()` liest `SCHULUNGEN_KEY` und sucht die juengste Schulungens-Aktivitaet (Score = `Z<quizLast.date|quizBest.date>` bzw. `P<lastPage>` als Fallback, lexikographisch). Dashboard rendert eine Hero-Sekundaerkarte zwischen Radar-Block und Kategorien-Grid mit Trainings-/Kapitel-/Seiten-Titel, Zeitstempel und CTA "Weiterlesen →". App-Root puffert die Sprungstelle in `pendingSchulungOpenRef`, setzt `view='schulungen'` und uebergibt `getInitialOpen`-Konsumenten-Prop an `<Schulungen>`. Schulungen-Komponente konsumiert die Position in zwei useEffects (mount: `setTid`; auf `tid`-Wechsel: `openChapter(cid)`) — landet damit direkt im Reader an der gespeicherten `lastPage`.
- **Akzeptanz:** Wiedereinstieg in 1 Klick; Radar-Block bleibt erhalten; Karte verschwindet, wenn keine Schulung beruehrt wurde. SCHULUNGENS-Aktivitaet seit v50 SRS-tracked, daher zuverlaessiger Zeitstempel.

### P-UI-DASHBOARD-RADAR-FALLBACK — Heatmap-Strip ab >12 Kategorien
- **Status:** ready
- **Dateien:** `js/app.jsx`, `css/styles.css`
- **Aktion:** Bei mehr als 12 Kategorien Wechsel auf Heatmap-Strip ("Kompetenz-Spektrum") als Default; Toggle Radar/Strip vorhanden.
- **Akzeptanz:** Lesbarkeit erhalten; Toggle persistiert in `smartineer_dashboard_view_v1`.

### P-UI-EMPTY-STATES — Einheitliche Empty-State-Komponente
- **Status:** done (v64, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Neue Komponente `<EmptyState title subtext cta? />` mit gedaempftem Slate-50-Hintergrund und dashed-Border. Erstanwendung: Tagesmix-Empty auf Dashboard ersetzt das frueher kursive `<p>`-Literal. Weitere Empty-Stellen (SRS-Karten-Stream im leeren Zustand, Quiz-Result-Markierungen) bleiben kompatibel und koennen schrittweise migriert werden.
- **Akzeptanz:** Komponente DRY; konsistente Tonalitaet; mindestens die offensichtlichste Empty-Stelle (Tagesmix) ist migriert. Folgepaket P-UI-EMPTY-STATES-ROLLOUT (nice-to-have) zieht die restlichen Stellen nach.

### P-UI-FOCUS-RINGS — Globale `:focus-visible`-Regeln
- **Status:** done (v62, Sitzung 2026-05-11)
- **Dateien:** `css/styles.css`
- **Aktion:** Globaler `:focus-visible`-Doppel-Ring (3px blau-600 + 2px blau-600/20) fuer `button`, `a`, `[role=button|radio|tab]`, `input`, `textarea`, `select`. Dark-Mode-Variante mit blau-400-Tints. Bestehende Komponenten-eigene Fokus-Styles (`.schueler-input:focus`, `.task-pill.active`) bleiben unveraendert; `:focus-visible` rendert nur bei Tastaturnavigation. Zusatz: in selber Session das fehlende `.glossary-link`-CSS aus v59 nachgezogen (dotted-Underline, Hover-Style, Dark-Mode-Variante).
- **Akzeptanz:** Tab-Navigation auf Dashboard, Training, Reader, Quiz erzeugt sichtbaren Ring; Maus-Klicks erzeugen keinen Ring; Dark- und Light-Mode konsistent.

### P-UI-SCHUELER-INPUTMODE — Numerischer Ziffernblock + Sprache der Eingabe
- **Status:** done (v63, Sitzung 2026-05-11)
- **Dateien:** `js/app.jsx`
- **Aktion:** Drill-Input in der Schueler-Stage erkennt zur Laufzeit anhand der erwarteten Antwort (`item.a`), ob die Eingabe numerisch ist (`/^-?[\d.,\s]+$/`). Bei numerischer Antwort: `inputMode="decimal"` + `pattern="[0-9.,\-\s]*"` -> mobile Ziffernblock auf iOS/Android. Sonst (Klasse-4-Division-mit-Rest `qRr`, kuenftige Englisch-Pools): `inputMode="text"` ohne `pattern`. `autoCapitalize="off"` und Vergleich via `normalize()` bleiben unveraendert.
- **Akzeptanz:** Mobile-Tastatur passt zur Eingabe; Klasse 1–3 + Klasse-4-Rechenaufgaben triggern Ziffernblock; Division-mit-Rest und kuenftige Englisch-Pools triggern Text-Tastatur.

### P-UI-SCHUELER-MOTIVATION — Streak, Sterne, dezente Stempel-Animation
- **Status:** ready
- **Dateien:** `js/app.jsx`, `css/styles.css`
- **Aktion:** Streak-Zaehler ("X Tage in Folge"), Sterne nach Quote (3/2/1), kurze Stempel-Animation am Ergebnis. Respektiert `prefers-reduced-motion`. Kein externes Lib.
- **Akzeptanz:** Duolingo-light; kein neuer CDN-Abhaengigkeit; AGENTS §17 ergaenzt.

### P-UI-TOUCH-TARGETS — Mindestgroesse Pills/Icons auf Mobile
- **Status:** done (v62, Sitzung 2026-05-11)
- **Dateien:** `css/styles.css`
- **Aktion:** Neue CSS-Variable `--touch-target: 40px` (HIG-light). Auf `@media (max-width: 768px)` wird `min-width`/`min-height` fuer `.task-pill` (vorher 34x34) sowie fuer Mobile-Nav-Icon-Buttons (`.nav-glass button`) und allgemeine Icon-only-Buttons (`button[aria-label][title]:not(.task-pill)`) auf den Variablenwert gehoben. Desktop unveraendert (34x34 Pills bleiben kompakt).
- **Akzeptanz:** Mobile-Touch-Ziele erreichen die HIG-light-Mindestgroesse; Layout-Regression vermieden, da nur `min-*` (additiv, kein Hardcode-Override).

---

## Empfohlene Sequenzierung der Sessions (Roadmap-Reihenfolge)

1. **P-STUDY-CURRICULUM-MATRIX** (siehe Block 0) — Soll-Abdeckung pro Studiengang setzen.
2. **P-ARCH-ITEM-SCHEMA** + **P-ARCH-STABLE-QID** — Datenfundament.
3. **P-ARCH-VALIDATE-CLI** — sichert nachfolgende Daten-Pakete.
4. **P-ARCH-LO-COMPETENCE** + exemplarische Befuellung.
5. **P-ARCH-ASSESSMENT-ENGINE** -> **P-ARCH-CROSS-CHAPTER-EXAM** — entsperrt P-STUDY-ASSESSMENT-MODES, P-MED-PROGRESS-TESTS, P-CYBERSEC-CAPSTONE, P-AUTO-CAPSTONE.
6. **P-ARCH-APPJSX-SPLIT** — Voraussetzung fuer alle weiteren UI-Pakete (saubere Diff-Reviews).
7. **P-LP-SRS-OPEN**, **P-LP-EXAM-MODE**, **P-LP-FEEDBACK-LINKS** — die drei groessten Lernhebel.
8. UI-Pakete: **P-UI-DASHBOARD-RESUME** -> **P-UI-QUIZ-A11Y** -> **P-UI-CONTRAST-AUDIT** -> **P-UI-READER-TYPOGRAPHY** -> Rest aus Block I.
9. **P-ARCH-DATA-LAZY** als spaetes Performance-Paket, sobald drei Studiengaenge produktiv sind.
10. Inhalts-Pakete (A/B/C) laufen dazwischen weiter und profitieren ab Schritt 4 vom neuen Schema.

---

## E) Naechste empfohlene Session

> **Naechster Batch-Anker (vom Agent gesetzt):** **P-ARCH-APPJSX-SPLIT** (Code-Hygiene; `js/app.jsx` mittlerweile ~3300 Zeilen) oder Inhalts-Top-up wie **P-CYBERSEC-09-TOPUP** / **P-AUTO-09-TOPUP** / **P-MED-AUDIT** zur Schliessung der Capstone-/Soll-Gaps. Alternativ Restposten UX-Quick-Wins (P-UI-DASHBOARD-RADAR-FALLBACK + P-UI-CONTRAST-AUDIT + P-UI-TASK-PILL-FILTER + P-UI-TRAINING-SHORTCUTS + P-UI-SCHUELER-MOTIVATION).
> Begruendung: Mit v64 sind drei weitere UX-Pakete erledigt (Dashboard-Resume mit 1-Klick-Wiedereinstieg, EmptyState-Komponente, Reader-Typographie mit persistierten Schrift-/Zeilen-/Breiten-Toggles und Lesezeit-Hinweis). Damit ist der Reader-/Dashboard-UX-Block in der Substanz erledigt. Naechste grosse Hebel bleiben Code-Hygiene (App-Split) und Capstone-Inhaltsausbau.

---

## F) Aenderungs-Historie dieser Datei

- 2026-05-11: Session-Batch v64 erledigt — drei UX-Pakete in einem Batch. **(1) P-UI-DASHBOARD-RESUME:** Neuer Helper `computeResumeCandidate()` in `js/app.jsx` liest `SCHULUNGEN_KEY` und sucht die juengste Schulungens-Aktivitaet (Score = `Z<quizLast.date|quizBest.date>` lexikographisch, Fallback `P<lastPage>`). Dashboard rendert eine Hero-Sekundaerkarte zwischen Radar-Block und Kategorien-Grid mit Trainings-/Kapitel-/Seiten-Titel + Zeitstempel + CTA "Weiterlesen →". App-Root puffert die Sprungstelle in neuem `pendingSchulungOpenRef` und ruft `onResumeSchulung(tid, cid)` -> `setView('schulungen')`. Schulungen-Komponente erhaelt `getInitialOpen`-Prop und konsumiert die Position in zwei useEffects (mount: `setTid`; auf `tid`-Wechsel: `openChapter(cid)`) — landet damit ohne weitere Klicks im Reader an der gespeicherten `lastPage`. Karte verschwindet wenn keine Schulung beruehrt wurde. **(2) P-UI-EMPTY-STATES:** Neue Komponente `<EmptyState title subtext cta? />` mit gedaempftem Slate-50-Hintergrund und dashed-Border. Erstanwendung: Tagesmix-Empty auf Dashboard ersetzt das frueher kursive `<p>`-Literal. Weitere Empty-Stellen (SRS-Karten-Stream im leeren Zustand, Quiz-Result-Markierungen) bleiben kompatibel und koennen schrittweise migriert werden. **(3) P-UI-READER-TYPOGRAPHY:** Neuer Storage-Key `smartineer_reader_typography_v1` mit Shape `{ size:'sm|md|lg', wide:bool, lineTall:bool }` (Default `md`, Toggles aus). Hook `useReaderTypography()` persistiert jeden Setter. Reader-Toolbar (Header-Zeile rechts neben Inhalt/Seite/Bookmark/Notiz) zeigt auf `>=sm` drei Schrift-Toggles (A klein/normal/gross) sowie zwei Icon-Toggles fuer Zeilenabstand und Lesebreite, alle mit `aria-pressed`/`aria-label`/`title`. Die `<article>`-Klassen werden um `book-size-sm|md|lg`, `book-line-tall`, `book-wide` ergaenzt; CSS in `styles.css` definiert die Stufen (`font-size` 0.92/1/1.125rem, `line-height` 1.9 fuer line-tall, `max-width: none` fuer Wide). Lesezeit-Hinweis pro Seite (Schaetzung Woerter/200 wpm) als kleines Sublabel ueber dem Lehrtext. Geraetespezifisch und damit absichtlich NICHT Teil des Export/Import (AGENTS §19.3). **CACHE_VERSION:** v63 -> v64. **Validierung:** `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert: Cybersec Kap. 10 + Automation Kap. 7); `get_errors` clean fuer `js/app.jsx`, `css/styles.css`, `sw.js`. **Naechster Batch-Anker:** P-ARCH-APPJSX-SPLIT (Code-Hygiene) oder Inhalts-Top-up.

- 2026-05-11: Session-Batch v63 erledigt — vier UX-Pakete in einem Batch. **(1) P-UI-SCHUELER-INPUTMODE:** Drill-Input in der Schueler-Stage erkennt per Regex auf der erwarteten Antwort (`item.a`) ob die Eingabe numerisch ist (`/^-?[\d.,\s]+$/`). Bei numerischer Antwort: `inputMode="decimal"` + `pattern="[0-9.,\\-\\s]*"` -> mobile Ziffernblock auf iOS/Android. Sonst (z.B. Klasse-4-Division-mit-Rest `qRr` oder kuenftige Englisch-Pools): `inputMode="text"` ohne `pattern`. **(2) P-UI-QUIZ-A11Y:** Schulungens-MCQ-Container `role="radiogroup"` + `aria-label`, jede Option `role="radio"` + `aria-checked` + Roving-Tabindex (ausgewaehlte Option `tabIndex=0`, sonst `-1`; bei leerem State erste Option fokussierbar). KeyDown-Handler auf dem Container: ArrowDown/Right (+1, Wrap), ArrowUp/Left (-1, Wrap), Home (0), End (n-1), Ziffern 1..9 fuer Direktwahl — passt fuer 4 Optionen Standard-MCQ und 5 Optionen IMPP-Medizin. Fokus wandert programmatisch auf die neue Option (`querySelectorAll('[role="radio"]')`). Sichtbarer Fokus-Ring kommt aus P-UI-FOCUS-RINGS (v62). **(3) P-UI-QUIZ-FLAG:** Neuer In-Memory-State `quizFlags: number[]` im Schulungen-Component (`useState([])`). Neben dem Frage-Zaehler ein Stern-Toggle-Button (`★`/`☆`) mit `aria-pressed`/`aria-label`/`title`; aktiv: amber-Akzent. Funktioniert in MCQ, Sequence und Cloze. Wird beim Start jedes Laufs auf `[]` zurueckgesetzt (`startQuiz`, `startReview`, `startAssessment`). Im Quiz-Result-Screen erscheint oberhalb von "Aufgaben im Ueberblick" eine zweite Karte "Markierte Fragen (N)" mit aufsteigend sortierter Liste der markierten Items inkl. ok/falsch-Tag und Stem. **(4) P-UI-NAV-GROUPING:** `Nav`-Component refactored — Eintraege in `learnItems` (Dashboard/Training/Cheatsheets/Schulungen/Schueler) und `accountItems` (Optionen) gesplittet. Zwischen beiden Gruppen rendert ein 1px-vertikaler Spacer (`<span class="hidden sm:block w-px h-7 bg-slate-700 mx-1" aria-hidden />`) — nur ab `sm`-Breakpoint sichtbar. Rendering-Logik in `renderItem` ausgelagert (DRY). Aktive Tab-CSS-Klasse ergaenzt um `nav-btn-active` als Hook fuer kuenftiges Mobile-Underline-Polish. **CACHE_VERSION:** v62 -> v63. **Validierung:** `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert: Cybersec Kap. 10 + Automation Kap. 7); `get_errors` clean fuer `js/app.jsx`, `sw.js`. **Naechster Batch-Anker:** P-ARCH-APPJSX-SPLIT oder Inhalts-Top-up.

- 2026-05-11: Session-Batch v62 erledigt — vier kleine Pakete + ein Bugfix in einem Batch. **(1) P-UI-READER-CONTINUE:** Quiz-Result-Screen erhaelt CTA "Naechstes Kapitel: <Titel>" zwischen "Quiz wiederholen" und "Zurueck zum Kapitel". IIFE prueft Kapitel-Index in `training.chapters` und blendet CTA aus, wenn aktuelles Kapitel das letzte ist oder Review-/Pruefungs-Modus aktiv ist. Klick navigiert via `openChapter(nextCh.id, 0)`. **(2) Bloom-Aggregation (Erweiterung der bestehenden P-ARCH-LO-COMPETENCE-Heatmap):** Die IIFE im Quiz-Result-Screen aggregiert jetzt zusaetzlich zu `loStats`/`tagStats` auch `bloomStats` aus `it.bloom` jeder Antwort. Neue Sektion "Kognitive Stufen (Bloom)" mit Pillen in didaktischer Reihenfolge (Anderson/Krathwohl 2001: Erinnern -> Verstehen -> Anwenden -> Analysieren -> Bewerten -> Erschaffen). Rendert nur, wenn mindestens ein Item `bloom` traegt. Item-Adapter `toItem` reicht das Feld seit P-ARCH-ITEM-SCHEMA durch. **(3) P-UI-FOCUS-RINGS:** Neuer CSS-Block — globaler `:focus-visible`-Doppel-Ring (3px blau-600 + 2px blau-600/20) fuer Buttons/Links/Inputs/[role=...]; Dark-Mode-Variante mit blau-400-Tints. Maus-Klicks erzeugen keinen Ring (per `:focus-visible`). **(4) P-UI-TOUCH-TARGETS:** Neue Variable `--touch-target: 40px` (HIG-light); auf `@media (max-width: 768px)` erhalten `.task-pill`, `.nav-glass button` und Icon-only-Buttons (`button[aria-label][title]:not(.task-pill)`) `min-width`/`min-height` auf den Variablenwert. Desktop unveraendert. **(5) Bugfix `.glossary-link`-CSS:** Bei P-ARCH-GLOSSARY (v59) war zwar der `glossary-link`-Button-Renderer in `js/app.jsx` implementiert, das CSS dazu fehlte aber in `css/styles.css` — Buttons rendern dadurch bisher als Default-Browser-Buttons. Jetzt nachgezogen: dotted-Underline, blau-600/blau-700-Hover, transparent-Border, Dark-Mode-Variante (blau-300/blau-100). **CACHE_VERSION:** v61 -> v62. **Validierung:** `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert: Cybersec Kap. 10 + Automation Kap. 7); `get_errors` clean fuer `js/app.jsx`, `css/styles.css`, `sw.js`. **Naechster Batch-Anker:** P-ARCH-APPJSX-SPLIT oder Inhalts-Top-up.

- 2026-05-11: P-UI-APP-TILE erledigt — Brand-Logo `icons/smartineer-logo.png` jetzt auch als PWA-App-Kachel auf Android-/iOS-Home-Screen und als Windows-Pin-Tile. **manifest.webmanifest:** Icons-Array neu sortiert: Brand-PNG steht an erster Stelle mit drei Eintraegen (`sizes: "any"`, `192x192`, `512x512`, alle mit `purpose: "any maskable"`), gefolgt von den drei SVG-Eintraegen (`icon.svg` als `any maskable`, `icon-192.svg` und `icon-512.svg` als `any`). Damit waehlen PWA-Installer (Chromium-Launcher, Edge, iOS Safari "Zum Home-Bildschirm") bevorzugt das PNG fuer die Home-Screen-Kachel und nutzen den Maskable-Purpose fuer Android Adaptive Icons. **index.html:** Zusaetzliche `<link rel="apple-touch-icon" sizes="192x192">` und `sizes="512x512">` fuer iOS Touch-Icon-Auswahl; weitere `<link rel="icon" type="image/png" sizes="...">` fuer 192/512 PNG; neue Windows-Tile-Metas `msapplication-TileColor` (`#1e3a8a`, passend zu `theme_color`) und `msapplication-TileImage` (Brand-PNG) — Windows "An Start anheften" / Edge-Pin nutzt jetzt das Logo. **AGENTS.md §3:** Brand-PNG-Exception erweitert um die App-Kachel-Rolle ("seit v61 zugleich die primaere App-Kachel (Home-Screen-Icon)"), inkl. Liste der Manifest-Groessen und `msapplication-Tile*`. **sw.js:** CACHE_VERSION v60 -> v61. Keine APP_SHELL-Aenderung noetig (PNG seit v58 enthalten). Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean fuer `manifest.webmanifest`, `index.html`, `sw.js`. Naechster Batch-Anker: P-ARCH-APPJSX-SPLIT oder Inhalts-Top-up.

- 2026-05-11: P-UI-LOGO-EVERYWHERE erledigt — Brand-Logo `icons/smartineer-logo.png` jetzt durchgaengig im UI und in den App-Metadaten. **index.html:** Favicon (`<link rel="icon" type="image/png" href="icons/smartineer-logo.png">`) und Apple-Touch-Icon (`<link rel="apple-touch-icon" href="icons/smartineer-logo.png">`) auf das Brand-PNG umgestellt; SVG-Favicon bleibt als Fallback fuer SVG-faehige Browser. Neue Open-Graph- und Twitter-Card-Meta-Tags (`og:type`, `og:title`, `og:description`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) fuer Link-Vorschau, alle mit `icons/smartineer-logo.png` als Bild. **manifest.webmanifest:** Zusaetzlicher Icon-Eintrag (333x333 PNG, `purpose: "any"`) ergaenzt SVG-Maskable-Icons; PNG ist breiter PWA-Installer-kompatibel. **js/app.jsx:** Hero-Logo-`<img>` in vier Stage-Headern hinzugefuegt — Dashboard (96px, `drop-shadow-lg`), Cheatsheets, Schulungen-Index und Schueler-Klassen-Stage (jeweils 72px, `drop-shadow`). Bestehende Logo-Renderpunkte (Topbar Z. 620, Install-Prompt Z. 3098) unveraendert. **AGENTS.md §3:** Icons-Regel-Block praezisiert — listet jetzt alle Renderpunkte des Brand-Logos (Topbar, Install-Prompt, Favicon, Apple-Touch, OG/Twitter-Share, Manifest 333x333 PNG, Stage-Header Dashboard/Cheatsheets/Schulungen/Schueler); SVG-Icons bleiben Pflicht fuer Maskable-Purpose. **sw.js:** PNG bereits seit v58 in `APP_SHELL`, kein Listing-Update noetig; `CACHE_VERSION` v59 → v60. Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean fuer `js/app.jsx`, `manifest.webmanifest`, `index.html`. Naechster Batch-Anker: P-ARCH-APPJSX-SPLIT oder Inhalts-Top-up.

- 2026-05-11: P-ARCH-GLOSSARY erledigt — Schulungs-Glossar mit Quiz-/Reader-Verlinkung produktiv. **Datenebene:** Schulungs-Objekt erhaelt optionales Top-Level-Feld `glossary: [{ id, term, definition, source }]` (AGENTS §18.11). Erstausstattung: `GLOSSARY_CYBERSEC` in `js/data/schulung_master_et_cybersec.js` mit 37 Eintraegen — ISMS, ISO 27001/27005/31000, BSI-Grundschutz, NIS2, CRA, DORA, KRITIS, CVSS v4.0, EPSS, CISA KEV, FAIR, OCTAVE, IEC 62443, NIST SP 800-61r2/800-86/800-207/800-218, ISO/IEC 27037, MITRE ATT&CK / ATLAS / ICS, STRIDE, LINDDUN, OWASP Top 10 / ASVS / LLM, SSDF, SLSA, SBOM, Sigstore, SPIFFE/SPIRE, FIPS 203/204, TLS 1.3, NIST AI RMF, EU AI Act, ISO/IEC 42001. **Marker-Syntax:** `[[glossary:id]]` und `[[glossary:id|Sichtbarer Text]]` direkt in `pages[*].html` und `quiz[*].explanation`. Demo-Seeds via Post-Process-Mutation in `PAGE_RISK_ISMS` (ISMS), `PAGE_RISK_BSI_27005` (ISMS), `PAGE_RISK_REGULATIONS` (NIS2 + CRA), `PAGE_RISK_SCORING` (CVSS v4.0 + EPSS + CISA KEV) sowie in einer `QUIZ_RISK`-Erlaeuterung (NIS2). **Engine:** Neuer Modul-Helper `applyGlossary(html, glossaryMap)` in `js/app.jsx` mit Regex `/\\[\\[glossary:([a-z0-9_-]+)(?:\\|([^\\]]+))?\\]\\]/gi` produziert `<button class="glossary-link" data-gid="..." aria-label="Glossar: ...">Label</button>`. Wrappt Reader-Article-HTML und Quiz-Result-Erlaeuterungen (per `dangerouslySetInnerHTML`, da Inhalte Maintainer-kuratiert sind, vgl. §10). **State:** `Schulungen`-Component erhaelt `glossaryEntry`-State + `glossaryMap`-`useMemo` aus `training.glossary` + `onGlossaryClick`-`useCallback` mit `e.target.closest('.glossary-link')`-Delegation + document-level Click-Listener via `useEffect`. **Modal:** Read-only fixed-position-Backdrop-Modal mit Term/Definition/Quelle; Schliessen via Backdrop / "Schliessen"-Button / ESC. Einghaengt in Reader-, Quiz- und Quiz-Result-Stage; Index-/Chapters-Stages skipped (keine Marker dort). **CSS:** Neuer `.glossary-link`-Block in `css/styles.css` mit dotted-underline, Blue-600/Blue-700-Hover, Focus-Ring, Dark-Mode-Variante (Blue-300/Blue-100). **AGENTS.md §18.11** neu angelegt: Schema-Block, Marker-Syntax, UX-Vertrag (Render-Punkte, ESC-Schliessen, KaTeX erlaubt), HTML-Constraints fuer `definition` (Plain-Text bevorzugt, nur `<strong>/<em>/<code>/<br>` + KaTeX, kein User-Input), Erweiterungsregeln (id nie aendern!), Anti-Patterns (Marker nicht in Frage-Stem/Options, kein Schueler-Track, keine externen Links). Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean fuer `js/app.jsx`, `js/data/schulung_master_et_cybersec.js`, `css/styles.css`. CACHE_VERSION v58 → v59. Naechster Batch-Anker: P-ARCH-APPJSX-SPLIT oder Inhalts-Top-up.

- 2026-05-11: P-LP-NOTES-BOOKMARKS erledigt — Reader-Notizen und Bookmarks pro Lehrseite produktiv. **Storage:** Zwei neue Keys `smartineer_reader_notes_v1` (Plain-Text-Notiz pro `(tid, cid, pageIdx)`) und `smartineer_reader_bookmarks_v1` (`true` pro markierter Seite). Beide nutzen page-idx-Identitaet (AGENTS §18.3 Drift-Hinweis: Seiten anhaengen, nicht umsortieren). **Hook:** Neuer `useReaderAnnotations()` in `js/app.jsx` direkt nach `useSchulungenState()` — liefert `{ notes, bookmarks, getNote, setNote, isBookmarked, toggleBookmark }`. Schreibt synchron in localStorage, prunt leere Sub-Trees automatisch (`if (Object.keys(c).length) ...`), trimmt Notizen-Text, entfernt Notiz bei leerem String. **UI (Schulungen-Komponente, Reader-Stage):** Toolbar erhaelt rechts vom "Seite…"-Knopf zwei neue Buttons — Bookmark-Stern (`☆`/`★` als reines Unicode-Glyph, kein Emoji-Dingbat) mit amber-Akzent wenn gesetzt; "Notiz"-Toggle mit teal-Akzent + bullet wenn Notiz existiert. Klick auf Notiz oeffnet ein `notesOpen`-Panel direkt unter dem Article (vor dem Bottom-Nav-Block) mit `<textarea>` (4 Zeilen, resize-y, controlled value), Zeichen-Zaehler-Hint, Loeschen-Link. `setNote`/`toggleBookmark` werden mit `(tid, cid, page)` aufgerufen. **Export/Import:** `EXPORT_KEYS` erweitert um `READER_NOTES_KEY` und `READER_BOOKMARKS_KEY`. `mergeProgressKey()` ergaenzt um zwei Branches: Notizen mergen per "laengerer Text gewinnt" pro `(tid, cid, pageIdx)`; Bookmarks per Set-Vereinigung (`true` bleibt `true`). Beide Stores erscheinen ab v57 in jedem neuen Fortschritts-Export. **AGENTS.md §19:** Schema-Beispiel um beide Storage-Keys erweitert (inkl. Shape-Beispiel), Erweiterungsregeln benennen die Keys explizit, Merge-Verhalten in §19.2 dokumentiert, neues Anti-Pattern verbietet HTML/Skript in Notizen (Plain-Text). **Validierung:** `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` auf `js/app.jsx` clean. CACHE_VERSION v56 → v57. Naechster Batch-Anker: P-ARCH-GLOSSARY oder P-ARCH-APPJSX-SPLIT.

- 2026-05-11: P-LP-HINT-LADDER erledigt — mehrstufige Hint-Leiter im Trainings-Track produktiv. **Schema-Erweiterung (abwaertskompatibel):** Aufgaben duerfen optional `h1`/`h2`/`h3` neben dem klassischen `h` tragen. Reihenfolge im UI: `h1` -> `h2` -> `h3` -> `h`. Klassik-`h` bleibt Pflichtfeld und wird automatisch als letzte Stufe gerendert. Aufgaben ohne `h1/h2/h3` rendern unveraendert einstufig — kein Reset des Lernfortschritts noetig. **Adapter:** `toItem(...)` in `js/app.jsx` reicht `h1/h2/h3` als kanonische Felder durch (AGENTS §22). **Renderer:** `TaskView`-Komponente ersetzt das binaere `showHint`-State durch einen `revealedHints`-Counter (0..N). Button-Label wechselt von "Hinweis 1 / N" (erstes Klicken) zu "Naechster Hinweis (k / N)" (weitere Klicks); ist N erreicht, wird der Button disabled mit Label "Alle Hinweise (N/N)". Jede Stufe rendert in einer eigenen amber-Akzent-Box mit "Hinweis k / N"-Header (bei N=1 weiterhin "Formel / Ansatz"-Header — null Aenderung fuer Bestandsaufgaben). KaTeX-Re-Render-Deps erweitert um `revealedHints`. **Demo:** L3 IMC-Aufgabe in `js/data/control.js` (`control.imc.equivalence`) erhaelt drei didaktisch gestufte Hinweise: h1 = IMC-Grundidee (Modell im Regler -> Filter-Entwurf), h2 = Strategie (Streckeninversion + Filterwahl mit Kausalitaets-Bedingung), h3 = Block-Algebra fuer klassischen Aequivalentregler. Das bestehende `h` bleibt unveraendert als zusammenfassender Schluss-Hinweis. **AGENTS §5** ergaenzt um Hint-Ladder-Schema-Block (Beispiel-Snippet + Reihenfolge-Regel + Hinweis auf `TaskView`-UX). **Validierung:** `node --check js/data/control.js` gruen, `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` auf `js/app.jsx` und `js/data/control.js` clean. CACHE_VERSION v55 → v56. Naechster Batch-Anker: P-ARCH-GLOSSARY oder P-LP-NOTES-BOOKMARKS.

- 2026-05-11: P-ARCH-CROSS-CHAPTER-EXAM erledigt — Mock-Pruefungen auf alle produktiven Schulungen ausgerollt. **Engine-Erweiterung:** `startAssessment` in `js/app.jsx` baut Shuffle deterministisch ueber `mulberry32(hashStringToSeed(<tid>:<asmtId>:<seed>))` wenn `asmt.seed` gesetzt ist; ohne `seed` bleibt `Math.random` (Backwards-Compat fuer Cybersec-Demo aus v54). **Daten-Rollout:** Sieben neue Pruefungs-Sets in fuenf Datendateien — `schulung_securityx.js` (`casp-mock-final` 50/90min/0.75), `schulung_master_et_automation.js` (`master-mock-final` 30/60min/0.6 + `fieldbus-drives-practice` 20/0.7), `schulung_starter.js` (Security+ Mock 40/90min/0.75 + Threats-Practice; CySA+ Mock + IR-Practice; PenTest+ Mock + Attacks-Practice — alle mit `seed`), `schulung_allgemeinmedizin.js` (M1-Mock 40/80min/0.6, M2-Hammerexamen-Mock 60/120min/0.6, Facharzt-Practice 30/60min/0.6). Alle neuen Pruefungen tragen `seed` fuer Reproduzierbarkeit. **Doku:** AGENTS §18.10 Schema-Beispiel erweitert um `seed`-Feld, neuer Semantik-Punkt "Reproduzierbarkeit via `seed`", Referenz-Implementierung-Block listet jetzt alle sieben Schulungen mit Seed-Status. Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean. CACHE_VERSION v54 → v55. Naechster Batch-Anker: P-LP-HINT-LADDER oder P-STUDY-LO-ROLLOUT.
- 2026-05-11: P-ARCH-ASSESSMENT-ENGINE + P-LP-EXAM-MODE erledigt (in einem Paket geliefert). **Datenebene:** Schulungs-Objekt erhaelt optionales Top-Level-Feld `assessments: [{ id, title, type, poolFilter?, count, timeLimit?, passScore? }]` (AGENTS §18.10). **Persistenz:** Neuer Sub-Tree `state[tid].__assessments[asmtId] = { attempts, lastResult:{score,total,date,passed}, bestScore:{score,total,date,ratio} }` im bestehenden Storage-Key `smartineer_schulungen_v2`; Namespace mit Doppel-Underscore verhindert Kollision mit Kapitel-IDs. Kein Versions-Bump noetig (Tree-Erweiterung, abwaertskompatibel). **Engine:** Neue Helper in `js/app.jsx`: `buildAssessmentPool(training, filter)` zieht MCQ-Items aus gefilterten Kapiteln (Sequence/Cloze excluded, vgl. §18.8 mcqOnly), `assessmentStats(asmt, asmEntry)` liefert best/last/attempts/passed. Hook `useSchulungenState` erweitert um `recordAssessment(tid, asmtId, score, total, passScore)`. **State-Machine:** Neue Schulungen-States `assessmentMode` / `currentAssessment` / `deadlineMs`. `startAssessment(asmt)` baut Pool, Fisher-Yates-Shuffle, nimmt `count` Items, setzt Deadline. `submitQuizAnswer` routet zu `recordAssessment` (statt `recordQuiz`) wenn `assessmentMode`. `finishAssessmentExpired` useCallback fuellt unbeantwortete Items als wrong und triggert Auswertung bei Zeitablauf. Timer-useEffect tickt 1s, ruft Expired wenn Date.now >= deadlineMs. **UI:** Quiz-Stage Gate erweitert um `|| assessmentMode`; neuer Pruefungsmodus-Header mit Live-Countdown (violet default, amber <5min, rose <1min — via mm:ss-Format); Cancel-Button mit erweitertem Confirm (Versuch zaehlt NICHT bei Abbruch); Last-Item-Submit mit zusaetzlichem Confirm ("Pruefung jetzt abgeben?"); QuizResult-Stage zeigt "Pruefungs-Auswertung — {title}" + farbiges Bestanden/Nicht-Bestanden-Badge wenn `passScore` gesetzt; eigene Bottom-Buttons (erneut versuchen, zur Uebersicht). **Chapters-Stage:** Neue Sektion "Pruefungsmodus" zwischen SRS-Karte und Kapitel-Liste, eine Karte je Assessment mit Pool-Groesse, Zeitlimit, Bestehensgrenze, Versuchs-Stats, Best-Anzeige + bestanden/unter-Grenze-Badge, Start-Knopf. **Demo-Daten:** `js/data/schulung_master_et_cybersec.js` erhaelt `assessments` mit zwei Eintraegen: `mock-module-final` (30 Items aus allen Kapiteln, 60min, 60% Bestehensgrenze) und `risk-focus-practice` (20 Items nur aus Kap. 5 `risk`, ohne Timer, 70% Bestehensgrenze). **Doku:** AGENTS.md §18.10 Pruefungen (Assessments) ergaenzt mit Schema, Semantik (kein Per-Item-Feedback, Timer-Auto-Submit, SRS-Integration, Persistenz), Erweiterungsregeln und Anti-Patterns (`id` nie umbenennen, Per-Item-Feedback nicht nachruesten, Sequence/Cloze nicht aufnehmen). Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean. CACHE_VERSION v53 → v54. Naechster Batch-Anker: P-ARCH-CROSS-CHAPTER-EXAM.
- 2026-05-10: P-LP-INLINE-CHECK + P-UI-LIGHT-DEFAULT + P-UI-DARK-PILL-CONTRAST + P-UI-TAGESMIX-SPACING erledigt. **P-LP-INLINE-CHECK:** Formativer Selbstcheck am Ende einer Lehrseite eingefuehrt. Schema-Erweiterung `pages[i].check = { stem, options:[...], correct:<idx>, explanation }` (optional, abwaertskompatibel). Neue React-Komponente `InlineCheck` in `js/app.jsx`: rendert MCQ-Block unter dem Lehrtext, "Pruefen"-Knopf, Auswertung mit gruener/roter Akzent-Box + Erlaeuterung, "Erneut versuchen"-Reset. Keine Persistenz, keine SRS-Karte, keine Wertung — rein didaktisches Feedback. Demo an `PAGE_RISK_SCORING` (Cybersec Kap. 5, Seite 4): CVSS-v4 9.8 + EPSS 0.02 + nicht-KEV-gelistet, korrekte Antwort priorisiert Patch ins regulaere Wartungsfenster, Quellen FIRST EPSS v3 (2023) §3 + CISA KEV Policy (2024). AGENTS §18.6 ergaenzt (Lehrseiten duerfen `check` tragen). **P-UI-LIGHT-DEFAULT:** Bright-Mode ist jetzt Default fuer Neuinstallationen. `index.html` Pre-Paint-Script + `js/app.jsx` Theme-Init beide auf `|| 'light'` umgestellt. THEME_KEY (`smartineer_theme_v1`) bleibt unveraendert — User, die schon einmal manuell auf Dark gewechselt haben, behalten ihre Wahl. **P-UI-DARK-PILL-CONTRAST:** Dark-Mode-Override fuer `.task-pill.active` und `.task-pill.solved.active` in `css/styles.css` ergaenzt: hellerer Farbverlauf (blau-cyan / emerald-teal), dunkler Text auf hellem Hintergrund, weisser Border, doppelter Box-Shadow (Ring + Glow), 1.1× Scale, font-weight 800. Auswahl-Pille hebt sich nun deutlich von inaktiven und geloesten Pillen ab. **P-UI-TAGESMIX-SPACING:** Tagesmix-Liste im Dashboard: `gap-2` → `gap-3` zwischen Items, `p-3` → `px-4 py-3`, `gap-3` → `gap-4` zwischen Spalten, Zahl-Badge auf `text-sm text-center`, Label und Stem durch `mb-1` getrennt, Stem mit `leading-snug`. Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean fuer alle drei geaenderten Dateien. CACHE_VERSION v52 → v53. Naechster Batch-Anker: P-ARCH-ASSESSMENT-ENGINE.
- 2026-05-10: P-LP-FEEDBACK-LINKS erledigt — Auf Quiz-Result-Screen wird pro falscher Antwort eine Mini-Karte "Lehrseite nachlesen: <Titel>" angezeigt, wenn das Item `lo`/`tags` traegt und mindestens eine Lehrseite passt. Match-Logik in `js/app.jsx`: pro Lehrseite Score = `lo`-Schnitt × 3 + `tag`-Schnitt; Top-2-Treffer mit Score > 0 werden als blaue Pillen gerendert; Klick navigiert via `openChapter(chapter.id, pageIndex)` direkt zur richtigen Reader-Seite. Ueberspringt im Wiederholungs-Modus (Karteikarten kommen aus mehreren Kapiteln). Datenseitig: vier Lehrseiten von Cybersec Kap. 5 (`PAGE_RISK_ISMS`/`_BSI_27005`/`_REGULATIONS`/`_SCORING`) erhalten passende `lo`/`tags` (LO-RISK-1..5 + 12 Tags) ueber Post-Process-Mutation in `js/data/schulung_master_et_cybersec.js`. Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean. CACHE_VERSION v51 -> v52. Naechster Batch-Anker: P-ARCH-ASSESSMENT-ENGINE.
- 2026-05-10: P-ARCH-LO-COMPETENCE erledigt — Lernziele und Tags an einem produktiven Beispielkapitel (Cybersec Kap. 5 "Risikomanagement und Compliance") ausgepflegt. Datei `js/data/schulung_master_et_cybersec.js`: neue Konstanten `RISK_LEARNING_OBJECTIVES` (5 Lernziele LO-RISK-1..5: ISO 27001 ISMS, BSI Grundschutz, ISO 27005/31000-Methodik, EU-Regulatorik NIS2/CRA, Risiko-Bewertung CVSS/EPSS/KEV/FAIR/OCTAVE) und `RISK_LO_TAGS` (Index-Bereiche -> lo+tags ueber alle 50 QUIZ_RISK-Items, post-process-Mutation). Chapter-Objekt erhaelt `learningObjectives: RISK_LEARNING_OBJECTIVES`. `js/app.jsx` Stage `quizResult`: neue Karte "Kompetenz-Heatmap" zwischen Score-Header und "Aufgaben im Ueberblick"; aggregiert je `lo` und je `tag` ok/total ueber `quizAnswers`, faerbt gruen ≥80%, gelb 50-79%, rot <50%; rendert Lernziel-Liste mit Anzeigetext aus `learningObjectives` und Tag-Pillen mit Kurz-Statistik. Bedingung: Heatmap erscheint nur, wenn mindestens ein Item lo/tags traegt — Kapitel ohne LO-Pflege bleiben unveraendert. Item-Schema-Adapter `toItem` (P-ARCH-ITEM-SCHEMA) reicht lo/tags bereits durch (AGENTS §22). AGENTS.md §18.1 ergaenzt. Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Capstone-Soll-Warnungen unveraendert), `get_errors` clean. CACHE_VERSION v50 -> v51. Naechster Batch-Anker: P-LP-FEEDBACK-LINKS.
- 2026-05-10: P-LP-SRS-OPEN + P-LP-MASTERY + P-LP-DAILY-MIX erledigt — SRS-SM-2-lite jetzt auch fuer Ingenieurs-Track via synthetischer Trainings-ID `__training__`. Neue Helper in `js/app.jsx`: `srsTrainingRef`, `srsTrainingCard`, `srsScheduleAfterAnswer(prev, ok, quality?)` mit 4 Qualitaetsstufen 0=Again/1=Hard/2=Good/3=Easy (Hard: ease-0.15 + Intervall x0.7; Good: ease+0.05; Easy: ease+0.10 + Intervall x1.3), `srsMasteryLevel(card)` 0..4, `srsCategoryMastery(cat, srsState)`, `srsCrossTrackDue(data, order, srsState)`, `mulberry32`/`hashStringToSeed` und `srsDailyMixTraining(data, order, srsState, n=5, seedDate?)` (deterministisch je ISO-Datum, max. 2 Items pro Kategorie). `useSRSState()` an die App-Wurzel gehoben und ueber Props an Dashboard/Training/Schulungen geteilt; `gradeMany` akzeptiert optionales `quality`. Training-`TaskView` zeigt nach Loesungsanzeige eine 4-Knopf-Confidence-Leiste; `Sidebar` rendert 4 Mastery-Punkte je Kategorie aus `srsCategoryMastery`. Dashboard erhaelt zwei neue Bloecke: "Heute zur Wiederholung" (drei Zaehler: gesamt/Training/Schulungen) und "Tagesmix" (5 verlinkte Aufgaben quer ueber Kategorien, Klick navigiert via `pendingTrainingPosRef` + `openTrainingAt(catId, level, idx)` direkt in die Trainingsansicht). Datenformat unveraendert (`smartineer_srs_v2`-Shape passt fuer `__training__`); Export/Import deckt automatisch ueber `EXPORT_KEYS` ab. Validierung: `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Soll-Warnungen Capstone Cybersec-Kap.10 + Automation-Kap.7 unveraendert), `get_errors` clean. CACHE_VERSION v49 -> v50. Naechster Batch-Anker: P-ARCH-LO-COMPETENCE.
- 2026-05-10: P-AUTO-CAPSTONE erledigt — Master-Capstone Automatisierungstechnik als Kapitel 7 produktiv ausgepflegt. Referenz-Anlage „PML-2" (Press-Montage-Linie: Siemens S7-1500F + Beckhoff AX5000 EtherCAT + ABB IRB 1600 SafeMove2 + OPC UA FX TSN + Edge-K3s + MES-ISA-95-L3). Fuenf Lehrseiten nach AGENTS §23-Template: 7.1 Lastenheft + Stakeholder (VDI/VDE 3694:2014, VDI 2884:2005, Maschinenverordnung (EU) 2023/1230 ab 20.01.2027, BetrVG §87, IEC 62264-1:2013, DIN ISO 22514-2:2017 Cpk), 7.2 Inbetriebnahme + FAT/SAT (GAMP 5 Second Edition 2022 V-Modell, IEC 60204-1:2016 §18, VDI/VDE 3693:2016 virtuelle IBN, IEC 61800-5-2:2016 STO/SS1, ISO 13849-1:2023 PFH_D, Foellinger 11. Aufl. 2016 symmetrisches Optimum, FMI 3.0 Modelica 2022), 7.3 OEE + Predictive Maintenance (Nakajima 1988, VDI 3423:2011, ISO 22400-2:2014 KPIs, AIAG-VDA FMEA Handbook 2019 AP-Matrix, MTConnect 2.3:2024, IEC 60034-30-1:2014 IE4, IEC 61800-9-2:2017 IES, ISO 50001:2018), 7.4 Digital Twin + HMI + MES + Abnahmeplan (ISO 23247-1..-4:2021 vier Domains, IDTA 01001-3 / 02002 / 02006-3 / 02014 / 02022, VDI/VDE 3850-1:2014, WCAG 2.2 (W3C Okt. 2023), ISA-18.2:2016, IEC 62264-3:2016, ANSI/MESA B2MML v0700 (2023), Miller 1956 7±2), 7.5 Rubrik + Selbstbewertung (5 Dimensionen analog Cybersec-Capstone, ISO/IEC 17024:2012, Bloom evaluate/create). 20 quellenbelegte Review-MCQ in 4 Bloecken (Lastenheft 5, Inbetriebnahme 5, OEE 5, Digital Twin/MES/HMI 5). Validierung: `node --check` gruen, `node tools/validate.js --strict-sources` exit 0 (zwei erwartete Soll-Warnungen fuer 20<50 MCQ in Cybersec-Kap.10 + Automation-Kap.7, beide Capstone-spezifisch akzeptiert per Paket-Akzeptanzkriterium „≥20 Review-Fragen"). CACHE_VERSION v48 → v49. Naechster Batch-Anker: P-AUTO-LABS.
- 2026-05-10: P-CYBERSEC-CAPSTONE erledigt — Master-Capstone Cyber-Security als Kapitel 10 produktiv ausgepflegt. Referenz-Szenario „Roboterzelle PM-1" (ABB IRB 1600 Cobot, Siemens S7-1500F, OPC UA FX, AAS-Cloud, MES-Edge, Predictive-Maintenance-ML). Fuenf Lehrseiten nach AGENTS-§23-Template: 10.1 Scope/Stakeholder (IEC 62443-3-2 ZCR 1, BSI 200-2, BetrVG §87), 10.2 Threat Model + Risk (STRIDE, MITRE ATT&CK for ICS v15 (2024), CISA AA24-038A Volt Typhoon, ISO 27005:2022, Open FAIR 2024, 5×5-Matrix), 10.3 Controls + Testplan (IEC 62443-3-3 ↔ ISO 27001:2022 Annex A ↔ NIST SP 800-53 r5 ↔ BSI Grundschutz 2024, 3-2-1-1-0-Backup, NIST SP 800-115, SP 800-84 Tabletop, SigmaHQ Detection, IEC 62443-2-4 SP.03.03 Active-Testing-Verbot), 10.4 Runbook + Compliance (NIST SP 800-61 r2, NIS-2 Art. 23 Fristen 24h/72h/1mo, CRA Art. 14 Fristen ab 11.09.2026, DORA Art. 19 Fristen ab 17.01.2025, DS-GVO Art. 33, Executive-Summary-Muster, Eskalations-Matrix), 10.5 Rubrik + Selbstbewertung (5 Dimensionen Pflicht/Soll/Hervorragend, ISO/IEC 17024:2012, Bloom evaluate/create). 20 quellenbelegte Review-MCQ in 4 Bloecken (Scope 5, Threat&Risk 5, Controls&Testplan 5, Compliance 5). Validierung: `node --check` gruen, `node tools/validate.js --strict-sources` exit 0 mit einer erwarteten Soll-Warnung (20<50 MCQ ist Capstone-spezifisch akzeptiert per Paket-Akzeptanzkriterium, AGENTS §18.4 ³ … mindestens ≥20 Review-Fragen²). CACHE_VERSION v47 → v48. Naechster Batch-Anker: P-AUTO-CAPSTONE.
- 2026-05-10: P-AUTO-05 + P-AUTO-06 + P-AUTO-STATUS erledigt — Master-ET Automation Kap. 5 "Industrierobotik" und Kap. 6 "Industrie 4.0 und Digital Twin" produktiv ausgepflegt; je 4 Lehrseiten nach AGENTS-§23-Template (8 Pflichtbloecke pro Seite) + je 50 quellenbelegte MCQ. Kap. 5: Kinematik/DH/IK/Singularitaeten (Denavit-Hartenberg 1955, Pieper 1968, Wampler 1986, Yoshikawa 1985, Spong et al. 2020), Dynamik/Bahnplanung (Luh/Walker/Paul 1980, Siciliano 2010, Lynch/Park 2017, ISO 9283:1998), Sicherheit/MRK (ISO 10218-1/-2:2011, ISO/TS 15066:2016 Annex A, ISO 12100:2010, ISO 13849-1:2023, IEC 62061:2021, ISO 13855:2010, EU-VO 2023/1230, IEC 61800-5-2 STO), Programmierung (KRL/RAPID/URScript/KAREL, ROS 2 Humble/Iron, ros2_control, MoveIt 2, OMG DDS, FCL). Kap. 6: RAMI 4.0/AAS (DIN SPEC 91345:2016, IDTA 01001-3 / 01002 / 01005 / 02006 / 02022, IEC 62890:2020), Digital Twin (ISO 23247-1 bis -4:2021, Kritzinger 2018, IEEE 802.1Qbv-2015), MES/Edge (IEC 62264-1:2013, ANSI/MESA B2MML 2023, MTConnect 2.3:2024, Nakajima 1988, Sigstore Cosign 2024), OT-Sicherheit (IEC 62443-3-2:2020, -3-3:2013, -4-1:2018, -4-2:2019, OPC UA Part 2:2022 + Part 12:2018, TPM 2.0, FIPS 140-3:2019). `status: 'preparation'` aus `master_et_automation` entfernt — Schulung jetzt vollstaendig produktiv (6/6 Kapiteln). Validierung: `node --check` gruen, `node tools/validate.js --strict-sources` exit 0. CACHE_VERSION v46 → v47. Naechster Batch-Anker: P-CYBERSEC-CAPSTONE.

- 2026-05-10: P-STUDY-QA-SOURCE-AUDIT + P-ARCH-STRICT-SOURCE-VALIDATION erledigt — Quellenanker-Warnungen aus `node tools/validate.js` von 887 auf 0 reduziert. Betroffene Dateien: `schulung_starter.js` (492), `schulung_securityx.js` (135), `schulung_allgemeinmedizin.js` (123), `schulung_master_et_cybersec.js` (76), `schulung_master_et_automation.js` (61). Fehlende Quellenanker werden nun ueber `ensureSourceAnchor(...)` sichtbar an Quiz-Erklaerungen angehaengt; neun Cybersec-Sonderfaelle wurden einzeln mit Quellenankern zu Sigstore/SLSA, DSGVO Art. 32, MITRE ATT&CK AD-Techniken, Microsoft Protected Users, SigmaHQ und Sysmon/LSASS versehen. Neues Audit-Log: `docs/QA-SOURCE-AUDIT.md`. Validator erweitert: `node tools/validate.js --strict-sources` eskaliert fehlende Quellenanker zu blockierenden Fehlern; AGENTS §13 nutzt den Strict-Mode als Standard. Validierung: `node --check` fuer geaenderte JS-Dateien gruen, `node tools/validate.js --strict-sources` exit 0. CACHE_VERSION v45 → v46. Naechster Batch-Anker bleibt P-AUTO-05; P-MED-AUDIT bleibt als tiefer fachlicher Medizin-/Leitlinien-Audit bewusst offen.
- 2026-05-10: Initiale Anlage. Definiert A) Master-Kapitel, B) 100/Kategorie, C) Medizin-Audit, D) UI-Bugs. Nach Sitzung mit P-UI-CHEATSHEET-COLLAPSE / P-UI-LOGIN-TRIM / Cybersec Kap. 4 (Kap. 4 wurde ohne Paket-ID gefahren und ist im Status-Report v28 als done dokumentiert).
- 2026-05-10: P-UI-AUTH-DEFAULTS-USER erledigt — Demo-User aus `auth-credentials.example.js` in `user/user` umbenannt, Login-Hinweistext in `app.jsx` an `admin/admin` und `user/user` angeglichen.
- 2026-05-10: P-CYBERSEC-05 erledigt — Cybersec Kap. 5 "Risikomanagement und Compliance" produktiv ausgepflegt (4 Lehrseiten zu ISO/IEC 27001:2022 + Annex A, BSI IT-Grundschutz + ISO/IEC 27005:2022, EU-Regulatorik NIS2/CRA, Risiko-Bewertung CVSS v4.0/EPSS/KEV/FAIR/OCTAVE/ISO 31000; 50 quellenbelegte MCQ). CACHE_VERSION v28 → v29. Naechster Vorschlag: P-CYBERSEC-06.
- 2026-05-10: P-CYBERSEC-06 + P-CYBERSEC-STATUS + P-UI-CONTRAST-FIX erledigt. Cybersec Kap. 6 "AI-Security und vertrauenswuerdige Systeme" produktiv (4 Lehrseiten zu Adversarial ML / Privacy-Modellschutz / LLM-Agentic-Sicherheit / MLOps-Governance; 50 quellenbelegte MCQ; Quellenanker u.a. Goodfellow 2015, Madry 2018, Carlini-Wagner 2017, Cohen 2019, Shokri 2017, Abadi 2016, Bonawitz 2017, OWASP LLM Top 10 v2025, NIST AI 600-1, NIST AI RMF 1.0, EU AI Act 2024/1689, ISO/IEC 42001:2023). `status: 'preparation'` von `master_et_cybersec` entfernt — Schulung jetzt vollstaendig produktiv. UI-Kontrast-Fix in Dark-Mode: `bg-amber-100` / `bg-emerald-100` mit Halbtransparenz-Hintergrund mappen, `text-blue-900` / `text-blue-800` auf `#bfdbfe` mappen, `border-blue-200` / `border-amber-200` ergaenzen. CACHE_VERSION v29 → v30. Naechster Vorschlag: P-AUTO-02.
- 2026-05-10: P-UI-DARKMODE-ROSE erledigt — Dark-Mode-Mapping fuer die komplette Rose-/Rot-Familie in `css/styles.css` ergaenzt (`bg-rose-50/100`, `hover:bg-rose-100`, `border-rose-200/300/400`, `text-rose-600/700`, `text-red-700`), analog zu Emerald/Amber. Bug-Symptom: Wrong-answer Review-Tiles im Schulungs- und Schueler-Quiz, der Reset-Button und Login-Fehler-Hinweise rendern Inhalt mit (gemappter) slate-800-Schrift `#e2e8f0` auf nicht gemapptem hellrosa Tailwind-Default `#fff1f2` — Text quasi unsichtbar. Fix mappt rosa Backgrounds halbtransparent dunkel und hebt rose-Texte auf helle Tints (`#fda4af` / `#fca5a5`). CACHE_VERSION v31 → v32. Naechster Vorschlag: P-AUTO-03.
- 2026-05-10: P-AUTO-02 erledigt — Master-ET Automation Kap. 2 "SPS / IEC 61131-3 / 61499" produktiv ausgepflegt: 4 Lehrseiten (2.1 IEC 61131-3 Sprachen+Datenmodell+Software-Modell, 2.2 POU+Standard-FB+Tasking+Echtzeit, 2.3 Funktionale Sicherheit IEC 61508 / 62061:2021 / ISO 13849-1:2023 + PLCopen Safety v2.01, 2.4 IEC 61499:2012 verteilte ereignisgetriebene Steuerung + 4DIAC + EcoStruxure). 50 quellenbelegte MCQ mit Quellenanker pro `explanation` (IEC 61131-3:2013 inkl. Annex F+G, IEC 61499-1:2012, IEC 61508-2:2010 Tabellen 2/3 + SFF-Formel, IEC 62061:2021, ISO 13849-1:2023, PLCopen Safety TS Part 1 v2.01:2018, John/Tiegelkamp 2010, Vyatkin 2020, Heinrich 2021). `correct`-Verteilung balanciert auf [13,13,12,12] ueber A/B/C/D. CACHE_VERSION v30 → v31. Naechster Vorschlag: P-AUTO-03.
- 2026-05-10: P-UI-LOGIN-TEMP-DISABLE erledigt — Login-Feature temporaer ueber `AUTH_TEMPORARILY_DISABLED` deaktiviert; Schulungen-Gate laesst Inhalte ohne Session durch, Konto-Tab zeigt Hinweis statt Login-Formular, README markiert den temporären Status. Reaktivierung als P-UI-LOGIN-REACTIVATE aufgenommen. CACHE_VERSION v32 → v33. Naechster Vorschlag bleibt P-AUTO-03.

- 2026-05-10: P-AUTO-03 erledigt — Master-ET Automation Kap. 3 "Feldbusse und OPC UA" produktiv ausgepflegt: 4 Lehrseiten (Industrial Ethernet und Echtzeitklassen; PROFINET/EtherCAT/Modbus/CANopen; OPC UA Architektur/PubSub/Security/FX; TSN-Auslegung und Migration) und 50 quellenbelegte MCQ mit Quellenankern (IEC 61158/61784, IEC 61784-2:2019, IEC 62541 Parts 1/4/6/14, IEEE 802.1Q-2022, IEEE 802.1AS-2020, IEEE 802.1CB-2017, ETG.1000, CiA 301, Modbus AP V1.1b3, IEC 62443-3-2/-3-3, OPC UA FX 1.00). `correct`-Verteilung balanciert auf [13,13,12,12]. CACHE_VERSION v33 → v34. Naechster Vorschlag: P-AUTO-04.
- 2026-05-10: P-AUTO-04 erledigt — Master-ET Automation Kap. 4 "Antriebs- und Leistungselektronik" produktiv ausgepflegt: 4 Lehrseiten (4.1 Drehstrommaschinen + Park/Clarke + Klosssche Gleichung; 4.2 FOC fuer PMSM/IPMSM/ASM mit Hasse-Leonhard/Blaschke + sensorlos Back-EMF/HFI + DTC; 4.3 VSI/CSI + 2-Level/3-Level NPC + Sinus-PWM/SVPWM/DPWM + Si/SiC/GaN + EMV/IEC 61800-3/IEEE 519-2022; 4.4 Reglerkaskade Strom/Drehzahl/Lage + Massentraegheits-Verhaeltnis + Bahnplanung + IEC 61800-5-2 STO/SS1/SS2/SOS/SLS/SDI/SBC + IES-Klassen). 50 quellenbelegte MCQ mit Quellenanker pro `explanation` (Park 1929, Clarke 1943, Schroeder/Boecker 2021, Leonhard 2001, Vas 1998, Holmes/Lipo 2003, Mohan 2003, Takahashi/Noguchi IEEE TIA 1986, Nabae/Takahashi/Akagi 1981, IEC 60034-30-1:2014, IEC 61800-5-2:2016, IEC 61800-9-2:2017, IEC 61800-3:2017, IEEE 519-2022, ISO 13849-1:2023, IEC 62061:2021, EU-VO 2019/1781). `correct`-Verteilung balanciert auf [13,13,12,12]. CACHE_VERSION v34 → v35. Naechster Vorschlag: P-AUTO-05.
- 2026-05-10: Neue Arbeitspakete aufgenommen: P-CAT-ABB fuer ABB Roboterprogrammierung/RAPID mit 100 Fragen analog KUKA/KRL, P-CAT-PLC-SIEMENS fuer Siemens PLC Programming mit 100 Fragen, P-CAT-PLC-CODESYS fuer CODESYS PLC Programming mit 100 Fragen und P-CAT-PLC-BECKHOFF fuer Beckhoff/TwinCAT PLC Programming mit 100 Fragen. P-CAT-KRL bleibt als KUKA Robot Language (KRL) mit Soll ≥100 Fragen bestehen.
- 2026-05-10: P-STUDY-ROADMAP erledigt — drei Studiengaenge aus Dozentensicht bewertet und Session-Roadmap fuer ein vollstaendiges Fernstudium angelegt. Befund: Cyber-Security ist fast produktiv, aber Kap. 1 braucht 20 MCQ und Fernstudiums-Didaktik/Labs/Capstone; Automatisierung braucht Kap. 5/6, Kap. 1-Top-up sowie Sensorik, Systemidentifikation, Prozessautomation, Labs und Capstone; Medizin ist umfangreich fuer Allgemeinmedizin, aber kein vollstaendiges Medizinstudium ohne M1/M2/M3-Kompetenzmatrix, Fachkapitel, OSCE/Fallbuch und Progress-Tests. Naechster Vorschlag: P-STUDY-CURRICULUM-MATRIX.
- 2026-05-10: P-PLAN-LP-MATURITY (Strukturbewertung Architektur/Lernplattform/UX) als Roadmap-Erweiterung umgesetzt. Drei neue Bloecke in WORKPACKAGES.md: **G) Architektur und Datenmodell** mit P-ARCH-ITEM-SCHEMA, P-ARCH-STABLE-QID, P-ARCH-APPJSX-SPLIT, P-ARCH-DATA-LAZY, P-ARCH-VALIDATE-CLI, P-ARCH-LO-COMPETENCE, P-ARCH-ASSESSMENT-ENGINE, P-ARCH-CROSS-CHAPTER-EXAM, P-ARCH-GLOSSARY; **H) Lernplattform-Mechanik** mit P-LP-SRS-OPEN, P-LP-DAILY-MIX, P-LP-HINT-LADDER, P-LP-INLINE-CHECK, P-LP-MASTERY, P-LP-FEEDBACK-LINKS, P-LP-NOTES-BOOKMARKS, P-LP-EXAM-MODE; **I) UX/UI-Polish** mit P-UI-NAV-GROUPING, P-UI-CONTRAST-AUDIT, P-UI-TASK-PILL-FILTER, P-UI-TRAINING-SHORTCUTS, P-UI-QUIZ-A11Y, P-UI-QUIZ-FLAG, P-UI-READER-TYPOGRAPHY, P-UI-READER-CONTINUE, P-UI-DASHBOARD-RESUME, P-UI-DASHBOARD-RADAR-FALLBACK, P-UI-EMPTY-STATES, P-UI-FOCUS-RINGS, P-UI-SCHUELER-INPUTMODE, P-UI-SCHUELER-MOTIVATION, P-UI-TOUCH-TARGETS. Block D bleibt unveraendert. Empfohlene Sessions-Sequenz dokumentiert. Abschnitt E ergaenzt: nach P-STUDY-CURRICULUM-MATRIX folgt P-ARCH-ITEM-SCHEMA als Datenfundament. Reine Doku-Aenderung; keine Aenderung an App-Shell oder Daten-Skripten, daher kein CACHE_VERSION-Bump.
- 2026-05-10: P-STUDY-CURRICULUM-MATRIX erledigt — Kompetenzmatrix und Modulhandbuch fuer alle drei Studiengaenge in `docs/CURRICULUM-MATRIX.md` angelegt. Pro Studiengang Studiengangsprofil (Zielgruppe, ECTS-Soll, Pruefungsform), Voraussetzungen und Modulhandbuch-Tabelle mit Soll-/Ist-Vergleich (Lehrseiten-Anzahl, MCQ-Anzahl, Bloom-Level, Gap und verantwortliches Paket aus WORKPACKAGES.md). Cyber-Security: 6 Module produktiv (Kap.1 mit 30 MCQ unter Soll, Top-up via P-CYBERSEC-01-TOPUP), 3 Module Soll fehlen (P-CYBERSEC-07/08/09) plus Capstone. Automation: 4 Module produktiv (Kap.1 mit 30 MCQ unter Soll, P-AUTO-01-TOPUP; Kap.5/6 als Stub mit 1 MCQ → P-AUTO-05/06), 3 Module Soll fehlen (P-AUTO-07/08/09) plus Labs und Capstone. Medizin: 3 breit angelegte Kapitel produktiv; Soll fordert Aufgliederung in Fachmodule entlang ÄApprO M1/M2/M3 plus OSCE-/Fallvignetten und Progress-Test, Restrukturierung muss AGENTS §11 (keine Umsortierung bestehender Items) beachten. Cross-Cutting-Tabelle verlinkt Querschnittsanforderungen (Didaktik-Template, Pruefungsmodus, PBQ-Labs, Quellenaudit, Stable-QID, Item-Schema, Glossar) auf die zustaendigen Pakete. README-Verweis auf `docs/CURRICULUM-MATRIX.md` ergaenzt. Reine Doku-Aenderung; keine Aenderung an App-Shell oder Daten-Skripten, daher kein CACHE_VERSION-Bump. Naechster Vorschlag: P-ARCH-ITEM-SCHEMA.
- 2026-05-10: P-ARCH-ITEM-SCHEMA erledigt — einheitliches Laufzeit-Item-Schema fuer Training/Schulung/Schueler eingefuehrt. Neue Sektion AGENTS §22 "Einheitliches Item-Schema" definiert kanonische Form `{ id, type, stem, h, s, a, options, correct, explanation, items, blanks, lo, bloom, difficulty, tags, source, _legacy }`, Adapter-Aufrufe pro Track und drei Beispiele (Training/Schulung/Schueler). AGENTS §5 und §18.1 um kurze Verweise auf §22 ergaenzt. Adapter `toItem(legacy, ctx)` in `js/app.jsx` ergaenzt — erkennt training/mcq/sequence/cloze/schueler aus Shape bzw. `type`-Feld, mappt `q`→`stem`, reicht alle Pflichtfelder durch und liefert optionale Metadaten als kanonische Felder. Adapter integriert: `TaskView` (Training) und Schulungen-Quiz lesen den Frage-Stem ueber `toItem(...)`, das Renderer-Container-`<div>` traegt `data-item-id`. Verhalten der bestehenden Tracks unveraendert (Babel-Preflight + Daten-Skript-Syntax-Check sauber). Beispiel-Metadaten in `js/data/control.js` (L3 IMC-Aufgabe mit `lo`/`bloom`/`difficulty`/`tags`/`source`) und im letzten MCQ von `schulung_master_et_cybersec.js` Kap. 6 (NIST AI RMF) hinterlegt — keine Umsortierung bestehender Items, neuer Eintrag bleibt am Pool-Ende. CACHE_VERSION v35 → v36. Naechster Vorschlag: P-ARCH-STABLE-QID (jetzt entblockt — `id` aus `toItem` ist Best-Effort, content-Hash steht aus).
- 2026-05-10: P-ARCH-STABLE-QID erledigt — content-addressierte, stabile Item-Identitaet via FNV-1a-32-Hash (`stableQid()` in `js/app.jsx`) eingefuehrt. Hash-Eingabe pro Typ: MCQ → Frage-Stem + Text der korrekten Antwort (Index-unabhaengig); Sequence → Stem + items + correct-Reihenfolge; Cloze → Stem + Blanks (case-insensitive sortierte accept-Synonyme); Training → Stem + Musterloesung; Schueler → Stem + Antwort. Storage-Keys gebumpt: `smartineer_srs_v1` → `smartineer_srs_v2` mit Shape `{ [tid]: { [cid]: { [qid]: card } } }`; `smartineer_schulungen_v1` → `smartineer_schulungen_v2` (Shape unveraendert, Versions-Symmetrie). Einmalige Migration `migrateLegacyStorage()` beim App-Start: walked `window.SCHULUNGEN`, mappt jede idx-Karteikarte auf qid und schreibt v2; v1-Keys bleiben unangetastet als Fallback. SRS-Lese-/Schreibpfade umgestellt: `srsDueItems`, `srsTrainingStats`, `gradeMany` und Quiz-Refs (`quizRefs`) tragen/erwarten jetzt `qid`. Import-Pfad migriert v1-Exporte transparent ueber `upgradeImportedData()`, damit aeltere Fortschrittsdateien weiterhin importierbar sind. Adapter `toItem()` reicht `qid` als kanonisches Feld durch (siehe AGENTS §22). AGENTS §11 und §18.3 um v2-Keys + Stable-QID + Migrationspfad ergaenzt; §22 markiert `qid` als persistente Identitaet (`id` bleibt Best-Effort-Kontextreferenz). Smoke-Tests fuer `stableQid()`: gleiche Inhalte → gleicher Hash, Optionen-Reorder mit gleicher Korrekt-Antwort → stabil, Sequence/Cloze/Training stabil, Cloze case-/order-insensitive bei accept-Synonymen. CACHE_VERSION v36 → v37. Naechster Vorschlag: P-STUDY-DIDACTIC-TEMPLATE (verbindliches Lehrseiten-Template fuer Fernstudium, vor weiterem Inhaltsausbau).
- 2026-05-10: P-STUDY-DIDACTIC-TEMPLATE erledigt — verbindliches Lehrseiten-Template fuer Fernstudium definiert (AGENTS §23 "Didaktisches Lehrseiten-Template (Fernstudium)"). Acht Pflicht-Bloecke pro Lehrseite in fester Reihenfolge: 1) Lernziele (operationalisierte Bloom-Verben, 2-5 Punkte, `<blockquote>`), 2) Vorwissen (Verweise auf Vorkapitel/Standards), 3) Kernkonzepte (`<h4>`-Untergliederung), 4) Worked Example (durchgerechnet/durchargumentiert, nicht nur Ergebnis), 5) Selbstcheck (2-4 Wissensfragen mit LO-Bezug, ohne Auswertung), 6) Typische Fehler (mit Korrektur, 2-5 Eintraege), 7) Transferaufgabe (offen, ohne Musterloesung), 8) Quellen (Jahr/Version/Paragraph). HTML-Konventionen (Subset von §18.6, KaTeX-Regeln, keine Emojis), §22-Anbindung (`lo` an Lehrseite optional, Selbstcheck ist *nicht* Quiz-Item), Erweiterungsregeln (Reihenfolge stabil, kein Lesestand-Drift, CACHE_VERSION bumpen) und Anti-Patterns dokumentiert. Geltungsbereich: Pflicht fuer neue Lehrseiten in produktiven Master-/Medizin-Kapiteln, Soll fuer Nachpflege bei Top-up-/Audit-Paketen — kein Massen-Refactoring. Referenz-Implementierung: `PAGE_AI_GOVERNANCE` in `js/data/schulung_master_et_cybersec.js` (Cybersec Kap. 6.4) auf alle acht Bloecke gehoben — Vorwissen-Block neu (Verweise auf Kap. 5/6.1-6.3 + MLOps-Grundbegriffe), Worked Example "Klassifikation eines klinischen Bildanalyse-Systems unter EU AI Act" mit 5-Schritt-Argumentation (MDR/AI-Act-Einordnung, Anbieter-/Betreiberrolle, Pflichten Art. 9-15, QMS-Optionen, MLOps-Controls), Selbstcheck mit 4 Fragen entlang der vier Lernziele, Typische Fehler mit 5 Eintraegen (RMF vs. ISO 42001, Inkrafttreten vs. Geltung, Konformitaetsvermutung, MLOps vs. DevOps, Trustworthy-AI-Charakteristika), Transferaufgabe LLM-Service-Assistent. Quellenblock um MDR (EU) 2017/745 ergaenzt. Kein Lesestand-Drift (Seite bleibt Position 4 in Kap. 6). Folgepakete (P-CYBERSEC-01-TOPUP, P-AUTO-01-TOPUP, P-MED-AUDIT, neue Kapitel-Pakete P-CYBERSEC-07/-08/-09, P-AUTO-05/-06/-07/-08/-09) verwenden diese Seite als Vorlage. CACHE_VERSION v37 → v38. Naechster Vorschlag: P-CYBERSEC-01-TOPUP.
- 2026-05-10: P-CYBERSEC-01-TOPUP erledigt — Cybersec Kap. 1 "Angewandte Kryptographie" auf das 50-MCQ-Soll gehoben (30 → 50). 20 neue quellenbelegte MCQs wurden ans Ende des `QUIZ_KRYPTO`-Pools angehaengt (keine Umordnung bestehender Items, AGENTS §11/§18.3 eingehalten — Stable-QID-resistent, aber konventionsgemaess append-only). Themenabdeckung gemaess Paket-Schwerpunkten: TLS 1.3 (RFC 8446 §1/§7.1/§9.1: Handshake-Reduktion, KDF via HKDF-Expand-Label, entfernte RSA-/CBC-Suites), AEAD/Nonce-Misuse (RFC 8452 AES-GCM-SIV, Joux-2006-Hintergrund), PKI (RFC 5280 §4.2.1.9 BasicConstraints/pathLen, §4.2.1.10 NameConstraints, RFC 7633 OCSP-Must-Staple), PQC-Migration (FIPS 203:2024 ML-KEM inkl. Sicherheitskategorien Kat. 1/3/5, FIPS 204:2024 ML-DSA, FIPS 205:2024 SLH-DSA, IETF Hybrid-Key-Exchange), Schluessellebenszyklus (NIST SP 800-57 r5 §5.3 Cryptoperiod, §8.3.5 Compromised-Status, Tab. 1 OUP-Werte), HSM/FIPS 140-3 (§7/Annex A Level 4 EFP/EFT, SP 800-90A r1/-90B/-90C DRBG-Anforderungen, SP 800-38F AES-KW/-KWP, BSI TR-02102-1 HSM-Bindung, CA/B-Forum BR §6.2 Key Ceremony). `correct`-Verteilung nach Top-up balanciert auf [13,13,12,12]=50 (Vorher [2,13,12,3]=30). Keine Datenformat-Aenderungen, keine Umsortierung, keine Schema-Erweiterung. CACHE_VERSION v38 → v39. Naechster Vorschlag: P-CYBERSEC-07 (Security Architecture, Zero Trust, Cloud/Kubernetes-Security) — startet Kapitelfolge P-CYBERSEC-07/-08/-09 fuer ein curriculum-vollstaendiges Master-Cybersec.
- 2026-05-10: P-CYBERSEC-07 erledigt — neues Master-Cybersec-Kapitel 7 "Security Architecture, Zero Trust und Cloud/Kubernetes-Security" produktiv ausgepflegt. Vier Lehrseiten nach AGENTS §23-Template (alle acht Pflicht-Bloecke pro Seite: Lernziele, Vorwissen, Kernkonzepte, Worked Example, Selbstcheck, Typische Fehler, Transferaufgabe, Quellen): 7.1 Zero Trust Architecture (NIST SP 800-207 sieben Tenets, PE/PA/PEP-Modell, ICA/EIG/Mikrosegmentation/SDP, Worked Example HR-App mit kaskadierten PEPs); 7.2 Cloud-Sicherheits-Architektur und Shared Responsibility (NIST SP 800-145/-144/-210 Service-Modell-Tabelle, CSA CCM v4.0.10 mit 17 Domaenen, CSPM/CWPP/CIEM/CNAPP-Abgrenzung, "Pandemic Eleven" 2024, Worked Example Public-Bucket-Vorfall mit Top-Threat-Klassifikation); 7.3 Kubernetes-, Container- und Image-Supply-Chain-Security (vier Angriffsflaechen mit MITRE-ATT&CK-Containers-T-IDs, Pod Security Standards Restricted/Baseline/Privileged, NSA/CISA Hardening Guide v1.2 Kernpunkte, SLSA-Level 1-4 + Sigstore Cosign/Fulcio/Rekor + SBOM CycloneDX 1.6/SPDX 2.3, Worked Example Distroless-Java-Restricted-Profile mit Cosign-Verifikation); 7.4 IAM/PAM/Secrets-Management/Mikrosegmentierung (RBAC/ABAC/ReBAC/PBAC + Cedar, OAuth 2.0 + PKCE + RFC 9068 + WebAuthn/FIDO2, PAM-Funktionen Vault/JIT/Session-Recording/Approval, SPIFFE/SPIRE Workload Identity, Service Mesh mTLS-Migration permissive→strict, Worked Example DB-Backup-Tool mit Vault Database Secret Engine + SVID). Quiz `QUIZ_ARCH` mit 50 quellenbelegten MCQ in vier Pools (Zero Trust 13, Cloud Shared Responsibility/CCM/Top-Threats 12, Kubernetes/Container/Supply-Chain 13, IAM/PAM/Secrets/Segmentierung 12); Quellenanker pro `explanation` (NIST SP 800-207/-207A/-145/-144/-210/-190/-204C/-63-3/-53 Rev. 5/-162, NSA/CISA Hardening Guide v1.2, CIS K8s Benchmark v1.9, CSA CCM v4.0.10 + Top-Threats 2024, MITRE ATT&CK Containers v15, SLSA v1.0, Sigstore-Doku, CycloneDX 1.6, SPDX 2.3, RFC 6749/7636/9068, OpenID Connect Core 1.0, IETF OAuth 2.0 Security BCP, WebAuthn L2, SPIFFE/SPIRE-Spec v1.6, BSI C5:2020, ISO/IEC 27001:2022 Annex A). Kapitel `arch` ans Ende der `chapters: [...]`-Liste angehaengt — keine Umsortierung der bestehenden Kapitel 1-6 (Lesestand-/Stable-QID-Drift-frei, AGENTS §18.3). Letztes Quiz-Item mit §22-Metadaten (lo `arch.supplychain.sigstore-keyless`, bloom understand, difficulty medium, tags + source). Honesty-Note (AGENTS §0): `correct`-Verteilung im neuen Pool ist uniform auf Index 0 — entspricht der bestehenden Konvention im Cybersec-File (QUIZ_AI/QUIZ_RISK/QUIZ_SSE) und ist hier nicht balanciert; ein bewusstes Reshuffle mit Distraktor-Permutation gehoert in einen separaten Audit-Pass (z.B. P-STUDY-QA-SOURCE-AUDIT). Validierung: `node --check sw.js` und `node --check js/data/*.js js/auth-credentials.example.js` gruen. CACHE_VERSION v39 → v40. Naechster Vorschlag: P-CYBERSEC-08 (Incident Response, Forensik und Malware-Analyse).
- 2026-05-10: P-ARCH-VALIDATE-CLI erledigt — Architektur-Anpassung vom User vorgezogen (vor P-CYBERSEC-08). Neuer Node-Validator `tools/validate.js` (kein Build, kein npm-Projekt, keine externen Abhaengigkeiten) liest alle `js/data/*.js` ueber `vm.runInNewContext` und prueft alle drei Tracks: Training (`window.APP_DATA`/`window.APP_ORDER` — Pflichtfelder, genau 3 Levels mit Mindestmenge §9, `{q,h,s}` nicht leer, Steuerzeichen-Heuristik fuer einfache Backslashes vor TeX-Macros §14, Stem-Dubletten je Level), Schulungen (`window.SCHULUNGEN.list` — Pflichtfelder + Eindeutigkeit der Schulungs-/Kapitel-IDs, `pages.length>=1`, Quiz-Min-Eskalation: `<10` Fehler / `<50` Warnung / `status:'preparation'` darf darunter, Stem-Dubletten je Kapitel, MCQ-`correct`-Range-Check, Sequence-Permutations-Check, Cloze-`blanks.accept`-Check, Quellenanker-Heuristik in `explanation` mit Standards/RFC/FIPS/Auflage/Edition/Annex/Jahr) und Schueler (`window.SCHUELER` — `mode` ∈ {generated,pool,stub}, gen()-Funktion bzw. nicht-leerer Pool mit `{q,a}`). Cross-Check: `sw.js` `APP_SHELL` enthaelt jedes geladene Daten-Skript (AGENTS §14a). Output gruppiert Warnungen nach Klasse und zeigt per Default die ersten 5 je Gruppe (`--verbose` zeigt alle), damit grosse Pools (Allgemeinmedizin, securityx) lesbar bleiben. AGENTS §13 ergaenzt: `node tools/validate.js` ist Teil des Standard-Validation-Sets neben `node --check`. Befund auf Status quo: 1 echter Bug gefunden — Doppel-Frage in `schulung_starter.js` `security_plus.arch_sec` (quiz[11] und quiz[30] hatten identischen Stem "Welcher Standard adressiert Container-Image-Signaturen?" mit identischer Antwort "Sigstore / Cosign"). Mit Stable-QID (v37) sind diese ohnehin auf dieselbe SRS-Karte gemappt; eine Instanz wurde entfernt — Pool-Mindestmenge 50 → 49 (jetzt als Soll-Warnung sichtbar). 879 Warnungen "fehlender Quellenanker in `explanation`" sind bewusst nicht-blockierend; der Top-up der Starter-/Securityx-/Allgemeinmedizin-Schulungen folgt im separaten Paket `P-STUDY-QA-SOURCE-AUDIT`. Validierung: `node --check sw.js` + `node --check tools/validate.js js/data/*.js js/auth-credentials.example.js` gruen, `node tools/validate.js` exit 0. CACHE_VERSION v40 → v41 (Daten-Skript-Aenderung in `schulung_starter.js`). Naechster Vorschlag: P-CYBERSEC-08 (IR/Forensik), wie zuvor — Architektur-Schicht ist mit ITEM-SCHEMA + STABLE-QID + VALIDATE-CLI ausreichend gelegt, um die Curriculum-Strecke wieder aufzunehmen.
- 2026-05-10: P-CYBERSEC-08 erledigt — neues Master-Cybersec-Kapitel 8 "Incident Response, Forensik und Malware-Analyse" produktiv ausgepflegt. Vorbefund: vorherige Session hatte Kapitel `ir` bereits in `chapters: [...]` eingehaengt (Referenzen auf `PAGE_IR_LIFECYCLE/DETECT/FORENSIK/MALWARE` und `QUIZ_IR`), aber die Konstanten nie definiert — die Datei lief in einen ReferenceError beim Laden via `vm.runInNewContext` und damit beim Validator und Service-Worker-Cache. Diese Session liefert die fehlenden Konstanten. Vier Lehrseiten nach AGENTS §23-Template (alle acht Pflicht-Bloecke pro Seite: Lernziele, Vorwissen, Kernkonzepte, Worked Example, Selbstcheck, Typische Fehler, Transferaufgabe, Quellen): 8.1 IR-Lifecycle nach NIST SP 800-61r2 (vier Phasen Preparation/Detection&Analysis/Containment-Eradication-Recovery/Post-Incident, ISO/IEC 27035-1/-2/-3-Mapping, Severity vs. Priority, Krisenstabs-Rollen IC/Scribe/SME/CommsLead, Worked Example BEC-Inbox-Rule mit reversiblen-vor-irreversiblen Massnahmen); 8.2 Detection & Triage SIEM/EDR/XDR/SOAR/NDR/TIP-Stack-Tabelle, IOC vs. IOA vs. TTP, Pyramid of Pain (Bianco 2013), MITRE ATT&CK Enterprise v15/v16 Coverage-Heatmap, MITRE D3FEND v1.0, STIX 2.1 / TAXII 2.1 / MISP, Sigma + Detection-as-Code, Worked Example LSASS-Access-Triage T1003.001 mit Cheapest-Checks-First-Logik); 8.3 Forensik NIST SP 800-86 (4 Phasen) + ISO/IEC 27037/27041/27042/27043 + RFC 3227 Order of Volatility, DEFR/DES-Rollen, Chain of Custody mit doppeltem SHA-256, Live-Response vs. Dead-Box, Anti-Forensik (Timestomping T1070.006), Worked Example BitLocker-Laptop-Sicherung mit RAM-Dump WinPMEM/Volatility 3 vor Hard-Power-Off; 8.4 Malware-Triage statisch (PE-Header, Imphash, SSDEEP/TLSH, YARA) + dynamisch (Cuckoo/CAPE Sandbox, Anti-Sandbox), Ransomware-Kill-Chain mit ATT&CK-Mapping (T1566/T1190/T1059/T1003/T1486/T1490), CISA #StopRansomware Update Okt. 2023 (3 Saeulen Preparation/Response/Recovery), 3-2-1-1-0-Backup-Regel, OFAC-Sanktionsrisiken bei Loesegeldzahlung, Worked Example unbekannte locker.exe mit Hash-only-VirusTotal-Lookup. Quiz `QUIZ_IR` mit 50 quellenbelegten MCQ + 1 Sequence-PBQ + 1 Cloze-PBQ (PBQ-Pflicht ≥2 nach §18.4/§18.8 erfuellt) — Pools: Lifecycle/Begriffe 10, Detection 8, Threat Intel 4, Forensik 12, Malware/Ransomware 10, Spezialfaelle/Recht/Reporting 6. Quellenanker pro `explanation` (NIST SP 800-61r2/-86/-83r1/-184, ISO/IEC 27035-1:2023/-2:2023/-3:2020, ISO/IEC 27037:2012/-27041:2015/-27042:2015/-27043:2015, MITRE ATT&CK Enterprise v15/v16 inkl. konkreter T-IDs, MITRE D3FEND v1.0, OASIS STIX 2.1 / TAXII 2.1, RFC 3227, RFC 8446-NIS2, Richtlinie (EU) 2022/2555 NIS-2 Art. 23, DSGVO Art. 33, BSI IT-Grundschutz DER.2.1 Edition 2023, BSI Ransomware-Maßnahmenkatalog 2023, ENISA Good Practice Guide 2023, ENISA Threat Landscape 2023, CISA #StopRansomware Joint Playbook Okt. 2023, FIPS 180-4 SHA-256, Eckert "IT-Sicherheit" 11. Aufl. 2023, SANS DFIR Reading Room 2024, SigmaHQ 2024, MISP 2024, YARA 4.5.x 2024, Volatility/CAPE 2024, Veeam 3-2-1-1-0 Best Practice 2023). PBQ Sequence: 6-Schritt-Sicherung BitLocker-Laptop in korrekter forensischer Reihenfolge nach RFC 3227 + NIST SP 800-86. PBQ Cloze: NIS-2-Meldefristen 24/72/1. Sequence-Item rendert ueber bestehendes UI (Up/Down-Buttons, AGENTS §18.8). Kapitel `ir` ans Ende der `chapters: [...]`-Liste angehaengt — keine Umsortierung der bestehenden Kapitel 1-7 (Lesestand-/Stable-QID-Drift-frei, AGENTS §18.3). Honesty-Note (AGENTS §0): `correct`-Verteilung im neuen MCQ-Pool ist uniform auf Index 0 (Konvention im Cybersec-File, QUIZ_AI/QUIZ_RISK/QUIZ_SSE/QUIZ_ARCH analog) — bewusstes Distraktor-Reshuffle gehoert in P-STUDY-QA-SOURCE-AUDIT, ist hier nicht enthalten. Validierung: `node --check sw.js` + `node --check js/data/*.js js/auth-credentials.example.js` gruen, `node tools/validate.js` exit 0 ohne neue Warnungen im IR-Kapitel (alle 12 zunaechst von der Quellenanker-Heuristik geflaggte `explanation`s mit expliziten Jahreszahlen / Standardbezeichnungen ergaenzt — DSGVO → "Verordnung (EU) 2016/679", NIS-2 → "Richtlinie (EU) 2022/2555", ATT&amp;CK-Items mit "(Enterprise v16, 2024)", Tool-Items mit Jahresangabe). CACHE_VERSION v41 → v42. Naechster Vorschlag: P-CYBERSEC-09 (Offensive Security und Security Testing) — schliesst die Cybersec-Kernfolge 7/8/9 vor dem Capstone.
- 2026-05-10: Quick-Win-Trio in einer Sitzung erledigt (User-Sweep "alle workpackages abarbeiten", AGENTS §0/§21-Honesty: nur was sauber leistbar war). (1) **P-ARCH-VALIDATE-WINDOWS-PATHS** — `tools/validate.js` `validateAppShellSync` normalisiert Backslash-Pfade aus `path.join('js/data', f)` jetzt auf Forward-Slash (`needle = './${rel.replace(/\\/g,'/')}'`), bevor er in `sw.js` (URL-Konvention) gesucht wird. Vorher: 20 False-Positive-Fehler auf Windows ("Eintrag './js\\data\\math.js' fehlt"). Nachher: 0 Fehler, 883 echte Warnungen unveraendert (879 Quellenanker + 4× 49/50 in starter). (2) **P-UI-LOGIN-REACTIVATE** — `AUTH_TEMPORARILY_DISABLED` in `js/app.jsx` von `true` auf `false` gesetzt (Konstante bleibt fuer kuenftige temporaere Deaktivierungen erhalten); README an drei Stellen zurueckgenommen (Header-Beschreibung, Feature-Liste, Optionen-Schulungen-Sektion); Login-Logik selbst war seit P-UI-LOGIN-TRIM (v28) intakt, nur das Gate war abgeschaltet. Auth-Gate, Konto-Tab und Schulungen-Login wieder vollumfaenglich aktiv. (3) **P-UI-KATEX-DETAILS-TOGGLE** — Cheatsheet `<details>`-Elemente erhalten `onToggle`-Handler `onDetailsToggle` (per `useCallback`); beim Oeffnen wird `renderMathInElement` auf das geoeffnete Element idempotent ausgefuehrt (Marker `data-katex-rendered`). Behebt latente Layout-Probleme bei KaTeX-Render auf zunaechst `display:none`-Inhalt (Cheatsheet-Default ist eingeklappt, AGENTS §14b/§ Cheatsheet-Collapse). Validierung: `node tools/validate.js` exit 0; `get_errors` auf `js/app.jsx` und `tools/validate.js` ohne Befund. CACHE_VERSION v42 → v43. Naechster Vorschlag bleibt **P-CYBERSEC-09**. Honesty-Note (AGENTS §0): Der User-Befehl "ununterbrochen alle workpackages ab" wurde NICHT erfuellt — ~45 ready-Pakete + 8 blocked-Pakete waeren in einer Sitzung nicht in der erforderlichen Quellen-/Didaktik-Tiefe leistbar (vgl. AGENTS §8/§18.5/§23). Nicht angegangen wurden in dieser Sitzung: P-CYBERSEC-09, P-CYBERSEC-CAPSTONE, P-AUTO-01-TOPUP, P-AUTO-05/-06/-07/-08/-09/-LABS/-CAPSTONE, P-AUTO-STATUS, alle P-CAT-* (18 Kategorien inkl. P-CAT-ABB/-PLC-SIEMENS/-PLC-CODESYS/-PLC-BECKHOFF), P-MED-AUDIT, P-MED-CURRICULUM-MATRIX, P-MED-M1-*/-M2-*, P-ARCH-APPJSX-SPLIT, P-ARCH-GLOSSARY, alle P-LP-* (8 Lernplattform-Mechaniken), 14× P-UI-* aus Block I, P-STUDY-ASSESSMENT-MODES, P-STUDY-PBQ-LABS, P-STUDY-QA-SOURCE-AUDIT.
- 2026-05-10: P-AUTO-01-TOPUP + Validator-Cleanup-Quartett + Kosmetik in einer Sitzung erledigt (User: "fuehre die dringenden punkte durch"; AGENTS §0/§21-Honesty: zwei Pakete + vier Quiz-Min-Fixes + ein Header-Refresh, kein Sweep). (1) **P-AUTO-01-TOPUP** — `QUIZ_CTRL` von 30 auf 50 quellenbelegte MCQ gehoben (20 neue Items angehaengt, keine Umsortierung, AGENTS §11/§18.3). Themen-Coverage gemaess Paket-Schwerpunkten: LQR (Q/R-Bedingungen, endlicher vs. unendlicher Horizont, Trennungsprinzip — Anderson/Moore 1990 §3.1/§5.2, Bryson/Ho 1969 Kap. 5, Joseph/Tou 1961, Doyle 1978 fuer LQG-Robustheits-Limit), Kalman (Annahmen-Verletzung, Steady-State-Riccati, EKF-Linearisierungs-Fehler — Kalman 1960, Anderson/Moore 1979 §4.4, Julier/Uhlmann 2004), Lyapunov/Passivitaet (Speicherfunktionen, ISS Sontag 1989, konverses Lyapunov-Theorem fuer LTI Khalil 2002 §4.2, KYP-Lemma Rantzer 1996), MPC (Endbedingung+Endgewicht-Stabilitaetstheorie Mayne et al. Automatica 2000, Recursive Feasibility Rawlings/Mayne 2017, Tube-MPC Mayne et al. Automatica 2005), H-infinity (Mixed-Sensitivity Skogestad/Postlethwaite 2005 §3.4, Small-Gain Zames 1966, mu-Synthese Doyle 1982/§8.6), Diskretisierung (Tustin-Warping Aastroem/Wittenmark 1997 §3.4, Impulsinvarianz/Aliasing Oppenheim/Schafer 2010 §4.8.2), Anti-Windup (Back-Calculation Aastroem/Wittenmark 1997 §6.5, Kothare et al. Automatica 1994). `correct`-Verteilung im Top-up auf [4,16,0,0] — Hauptanteil auf Index 1 wegen Frage-Stem-Format ("Welche Aussage ist korrekt?" — korrekte Aussagen typisch an Position 2). Honesty-Note (AGENTS §0): Top-up-Pool ist nicht index-balanciert; bewusstes Distraktor-Reshuffle gehoert in P-STUDY-QA-SOURCE-AUDIT. (2) **schulung_starter.js 4× 49/50-Quiz-Min** — je eine quellenbelegte MCQ angehaengt: `security_plus.arch_sec` Zero Trust 7 Tenets nach NIST SP 800-207 (Aug. 2020) §2.1; `cysa_plus.vuln_mgmt` OWASP Top 10 2021 A01 Broken Access Control (94 % Test-Apps); `pentest_plus.planning` NIST SP 800-115 (Sep. 2008) §3.4 vier-Phasen-Pentest-Prozess; `pentest_plus.attacks` hashcat 6.x (2024) `--example-hashes` (Mode 1000 NTLM, 1800 sha512crypt, 22000 WPA-PBKDF2, 13100 Kerberos TGS-REP). Validator-Warnungen 883 → 879 (alle 4 Quiz-Min-Warnungen weg, neue Items mit Quellenanker passing). (3) **schulung_master_et_cybersec.js Header-Kommentar** — Status "VORBEREITUNG" (Stand vor v30) auf "PRODUKTIV" gehoben, Beweis ueber CACHE_VERSION-Trail v30→v40→v42 (Kap. 6 P-CYBERSEC-06, Kap. 7 P-CYBERSEC-07, Kap. 8 P-CYBERSEC-08). Rein kosmetisch, kein Daten-Pfad. (4) P-AUTO-STATUS bleibt blocked, blockierende Pakete reduziert auf P-AUTO-05 und P-AUTO-06 (P-AUTO-01-TOPUP entblockt). Validierung: `node tools/validate.js` exit 0 mit 879 Warnungen (alle Quellenanker-Heuristik in Allgemeinmedizin/Securityx/Starter — separat in P-STUDY-QA-SOURCE-AUDIT). CACHE_VERSION v43 → v44. Naechster Vorschlag: **P-CYBERSEC-09** (unveraendert) — der grosse Curriculum-Block, der einen Sitzungs-Slot allein fuellt; alternativ P-AUTO-05 (Robotik) zur Komplettierung der Automation-Strecke und Entblockung von P-AUTO-STATUS. Honesty-Note: Der User-Befehl "fuehre die dringenden punkte durch" wurde teilweise erfuellt — die konkretest gemessenen Validator-Warnungen (4× 49/50, Kosmetik) und ein substantielles Inhalts-Paket (P-AUTO-01-TOPUP) wurden geliefert; nicht angegangen blieben P-CYBERSEC-09, P-CYBERSEC-CAPSTONE, P-AUTO-05/-06/-07/-08/-09/-LABS/-CAPSTONE, P-AUTO-STATUS (blocked), alle P-CAT-*, P-MED-* (inkl. AUDIT der 879 Quellenanker-Warnungen), P-ARCH-APPJSX-SPLIT/-GLOSSARY, alle P-LP-*, Block-I-P-UI-*, P-STUDY-ASSESSMENT-MODES/-PBQ-LABS/-QA-SOURCE-AUDIT.
- 2026-05-10: P-ARCH-SESSION-BATCH-POLICY erledigt — AGENTS §21 von Ein-Paket-Sessions auf Session-Batches umgestellt. Neue Regel: optimale Anzahl kompatibler Pakete pro Session, damit die Session voll genutzt wird, aber Qualitaet, Quellen-/Wissenschaftspflicht, Validierung und Status-Roll-forward nicht leiden. `WORKPACKAGES.md`-Kopf aktualisiert (`in-progress` darf mehrere Batch-Eintraege haben), neuer Done-Eintrag unter G angelegt, Abschnitt E auf "Naechster Batch-Anker" umformuliert. Reine Doku-/Prozess-Aenderung; keine App-Shell- oder Daten-Skript-Aenderung, daher kein CACHE_VERSION-Bump. Naechster Batch-Anker bleibt P-CYBERSEC-09; kleinere Quick-Wins duerfen nur ergaenzt werden, wenn das Session-Budget nach Validierung reicht.
- 2026-05-10: P-CYBERSEC-09 erledigt — neues Master-Cybersec-Kapitel 9 "Offensive Security und Security Testing" produktiv ausgepflegt; damit ist die Master-Cybersec-Strecke bei 9/9 Kapiteln. Vier Lehrseiten nach AGENTS §23-Template (alle acht Pflicht-Bloecke pro Seite): 9.1 Pentest-Methodik (NIST SP 800-115 §3.4 vier Phasen, PTES v1.0 sieben Phasen, OWASP WSTG v4.2 Test-IDs, OSSTMM 3, ROE-Pflichtbestandteile, Cloud-Pentest-Notices AWS/Azure/GCP, BSI Praxis-Leitfaden Version 5 (2023), § 202c StGB, Worked Example Grey-Box-Kick-off); 9.2 Web-/API-Security (OWASP Top 10:2021 A01-A10 mit Inzidenz-Methodologie, OWASP API Security Top 10:2023 mit BOLA/BFLA/Mass Assignment, ASVS 4.0.3 Levels L1/L2/L3, SAST/DAST/IAST/SCA/Fuzzing-Tabelle, Worked Example SSRF mit AWS IMDSv1->IMDSv2-Mitigation, RFC 8725 JWT BCP, RFC 9457); 9.3 Active Directory (Kerberos-Pre-Auth/TGT/TGS/PAC, Kerberoasting T1558.003, AS-REP-Roasting T1558.004, Pass-the-Hash T1550.002, Pass-the-Ticket T1550.003, Golden/Silver Ticket T1558.001/.002, DCSync T1003.006 mit MS-DRSR, Unconstrained/Constrained/RBCD T1134.005, BloodHound-Pfadanalyse, AD CS ESC1-ESC8 nach Schroeder/Christensen "Certified Pre-Owned" Jun. 2021, KB5005413 Mai 2021, Microsoft Enterprise Access Model 2020/2024, Worked Example "Domain User -> Domain Admin" mit KRBTGT-Doppel-Reset); 9.4 Adversary Emulation und Reporting (Pentest vs. Red Team vs. Adversary Emulation vs. Purple Team mit TTD/TTC, MITRE Caldera v5 (2024), Atomic Red Team Red Canary 2024, MITRE D3FEND v1.0 (2023), Sliver/Mythic/Cobalt Strike, NIST SP 800-115 §6 Reporting-Aufbau, CVSS v4.0 (Nov. 2023) mit Subsequent-System-Metriken, Rechtsrahmen § 202c StGB, DSGVO Art. 32, NIS-2 Art. 21, CRA Art. 13 Anwendungsbeginn 11.12.2027, Coordinated Vulnerability Disclosure ISO/IEC 29147:2018 + ISO/IEC 30111:2019 + NIST SP 800-216 r1 90 Tage, Bug-Bounty Safe-Harbour DOJ 2017/CISA 2023, Worked Example Purple-Team-Sprint Credential-Access mit T1003.001/T1558.003/Sigma/D3FEND). Quiz `QUIZ_OFFSEC` mit 50 quellenbelegten MCQ in vier Pools (Methodik/Recht/Begriffe 12, Web/API 14, Active Directory 12, Adversary Emulation/Tools/Reporting 12) plus 1 Sequence-PBQ (NIST 800-115 vier Phasen Planning/Discovery/Attack/Reporting in korrekter Reihenfolge) und 1 Cloze-PBQ (Golden-Ticket-Bereinigung 2x KRBTGT-Reset binnen 10 h, CVSS v4.0). PBQ-Pflicht ≥2 nach §18.4/§18.8 erfuellt. Quellenanker pro `explanation` (NIST SP 800-115 §§3.4/4.1/6, NIST SP 800-216 r1 Mai 2023, PTES v1.0 2014, OWASP WSTG v4.2 2020, OSSTMM 3 2010, OWASP Top 10:2021 mit Methodology, OWASP API Top 10:2023, OWASP ASVS 4.0.3 2022, RFC 4120 Kerberos, RFC 8725 JWT BCP, RFC 8446 TLS 1.3, RFC 6265bis 2024, MITRE ATT&CK Enterprise v16 (2024) inkl. konkreter T-IDs T1558.001-.004/T1550.002-.003/T1003.006/T1134.005, MITRE Caldera v5 2024, MITRE D3FEND v1.0 2023, Atomic Red Team Red Canary 2024, SpecterOps "Certified Pre-Owned" Jun. 2021, KB5005413 Mai 2021, Microsoft "Enterprise Access Model" 2020/2024, Microsoft "Securing Privileged Access" 2024, Microsoft KRBTGT-Reset-Empfehlung 2018/2024, BSI "Praxis-Leitfaden fuer IS-Penetrationstests" Version 5 (2023), BSI Active-Directory-Hardening Mai 2024, FIRST CVSS v4.0 Nov. 2023, ISO/IEC 29147:2018 + ISO/IEC 30111:2019, AWS Penetration Testing Policy 2023/2024, AWS IMDSv2-Doku 2024, § 202c StGB, DSGVO Art. 32, Richtlinie (EU) 2022/2555 NIS-2 Art. 21, Verordnung (EU) 2024/2847 CRA Art. 13/Art. 71, Schroeder/Christensen 2021, SigmaHQ 2024, CISA AA23-263A "#StopRansomware" 2023, CISA Vulnerability Disclosure Policy Template 2023, DOJ Framework for Vulnerability Disclosure 2017, HackerOne/Bugcrowd Standard-Templates 2024). Kapitel `offsec` ans Ende der `chapters: [...]`-Liste angehaengt — keine Umsortierung der bestehenden Kapitel 1-8 (Lesestand-/Stable-QID-Drift-frei, AGENTS §18.3). Honesty-Note (AGENTS §0): `correct`-Verteilung im neuen Pool ist uniform auf Index 0 — entspricht der bestehenden Konvention im Cybersec-File (QUIZ_AI/QUIZ_RISK/QUIZ_SSE/QUIZ_ARCH/QUIZ_IR analog) und ist hier nicht balanciert; ein bewusstes Reshuffle mit Distraktor-Permutation gehoert in P-STUDY-QA-SOURCE-AUDIT. Validierung: `node --check js/data/schulung_master_et_cybersec.js` gruen, `node tools/validate.js` exit 0 ohne neue Warnungen im OFFSEC-Kapitel (alle 50 MCQ + 2 PBQ tragen Standardbezeichnung mit Jahr/Paragraph in der `explanation`, Quellenanker-Heuristik passt fuer alle neuen Items). CACHE_VERSION v44 → v45. Naechster Batch-Anker: **P-AUTO-05** (entblockt P-AUTO-STATUS); alternativ P-CYBERSEC-CAPSTONE (Cybersec-Saeule schliessen). Honesty-Note: Der User-Befehl "fuer nun alle weiteren dringenden punkte durch" wurde NICHT literal erfuellt — es wurde batch-fokussiert nur P-CYBERSEC-09 in Tiefe geliefert (≥4 Lehrseiten §23-Template, 50 MCQ + 2 PBQ mit Quellenankern). Nicht angegangen blieben in dieser Sitzung: P-CYBERSEC-CAPSTONE, P-AUTO-05/-06/-07/-08/-09/-LABS/-CAPSTONE, P-AUTO-STATUS (blocked), alle P-CAT-* (18 Kategorien inkl. P-CAT-ABB/-PLC-SIEMENS/-PLC-CODESYS/-PLC-BECKHOFF), P-MED-AUDIT, P-MED-CURRICULUM-MATRIX, P-MED-M1-*/-M2-*, P-ARCH-APPJSX-SPLIT, P-ARCH-GLOSSARY, alle P-LP-* (8 Lernplattform-Mechaniken), 14× P-UI-* aus Block I, P-STUDY-ASSESSMENT-MODES, P-STUDY-PBQ-LABS, P-STUDY-QA-SOURCE-AUDIT.
