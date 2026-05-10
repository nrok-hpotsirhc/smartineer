# Smartineer — Kompetenzmatrix und Modulhandbuch

> **Zweck.** Dieses Dokument legt fuer die drei Smartineer-Studiengaenge die Soll-Abdeckung
> aus Dozentensicht fest und stellt sie der Ist-Abdeckung der App gegenueber. Es ist die
> verbindliche Referenz fuer die Auswahl und Priorisierung von Arbeitspaketen in
> `WORKPACKAGES.md` (siehe AGENTS.md §21 und Block 0 "Fernstudium-Audit").
>
> **Methodik.**
> - Lernziele formuliert auf Bloom-Taxonomiestufe (V = Verstehen, A = Anwenden,
>   An = Analysieren, Sy = Synthetisieren, B = Bewerten).
> - ECTS-Schaetzung gemaess ECTS-Users Guide 2015 (1 ECTS ≈ 25–30 h Workload).
> - Ist-Abdeckung gemessen an: Anzahl produktiver Lehrseiten je Kapitel, Quiz-Pool-Groesse
>   gegen das AGENTS.md §18.4-Soll von ≥ 50 MCQ pro Kapitel, vorhandene Fall-/Labor-/PBQ-Items.
> - Gap und naechstes Paket verlinken auf den Bezeichner in `WORKPACKAGES.md`. Aenderungen am
>   Bestand erfolgen nur ueber dort verzeichnete Pakete (kein silent edit).
>
> **Abkuerzungen.** "Lehrseite" = `pages[i]` in `js/data/schulung_*.js`. "MCQ" = Single-Choice-Quizfrage.
> "PBQ" = Performance-Based Question (`type: 'sequence'` oder `type: 'cloze'`, AGENTS §18.8).

---

## 1. Master Elektrotechnik — Cyber-Security

**Datei:** `js/data/schulung_master_et_cybersec.js` · **Code:** `MA-ET CyberSec` · **Status (App):** `production`

### 1.1 Studiengangsprofil

- **Zielgruppe.** Berufsbegleitende Master-Studierende der Elektrotechnik mit Vorbildung in
  digitaler Signalverarbeitung, Embedded Systems und Netzwerkgrundlagen.
- **Studiengangsumfang (Soll).** 30 ECTS Pflichtbereich Cyber-Security (≈ 750–900 h).
  Smartineer deckt davon den Selbststudien- und Pruefungsvorbereitungsanteil
  (geschaetzt 12–15 ECTS) ab; Praktika und Seminare verbleiben am Lehrstuhl.
- **Pruefungsform (Soll).** Modulpruefungen je Kapitel (60 min, 30–40 MCQ + 1 PBQ-Fall),
  Modulabschluss als 90-min-Klausur ueber zwei Kapitel, Capstone als Projektarbeit mit
  Bewertungsrubrik.

### 1.2 Voraussetzungen

| Themenfeld                 | Erwartete Vorkenntnisse                                                                |
|----------------------------|----------------------------------------------------------------------------------------|
| Mathematik                 | Lineare Algebra, Wahrscheinlichkeitsrechnung, Modulare Arithmetik                      |
| Informatik / SW            | C/C++ oder Rust, Python, Datenstrukturen, Betriebssystemgrundlagen                     |
| Netze                      | OSI-Modell, TCP/IP, Routing, TLS-Grundverstaendnis                                     |
| Embedded                   | Mikrocontroller-Architektur, Bus-Systeme (I2C/SPI/UART), Speicherarchitektur           |
| Standards-Lesefaehigkeit   | RFC-/ISO-/NIST-/IEC-Dokumente eigenstaendig auswerten koennen                          |

### 1.3 Modulhandbuch — Soll vs. Ist

| # | Modul (Soll)                                                | ECTS | Bloom    | Soll-Inhalte (Kernkompetenzen)                                                                                                  | Ist-Kapitel (App)             | Lehrseiten Ist | MCQ Ist | Lehrseiten Soll | MCQ Soll | Gap                                                                   | Paket                        |
|---|-------------------------------------------------------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------|----------------|---------|-----------------|----------|-----------------------------------------------------------------------|------------------------------|
| 1 | Angewandte Kryptographie                                    | 3    | A/An     | AES-Modi/AEAD, KDF/HKDF, asym. Verfahren, FIPS 203/204/205, PKI-Lifecycle, HSM/FIPS 140-3                                       | `krypto`                      | 4              | 30      | 4               | 50       | 20 MCQ fehlen                                                         | P-CYBERSEC-01-TOPUP          |
| 2 | Embedded Security                                           | 3    | An/Sy    | Secure Boot/RoT, TEE/Confidential Computing, sichere FW-Updates, Side-Channel/Fault-Injection, ETSI EN 303 645                  | `embedded`                    | 4              | 50      | 4               | 50       | -                                                                     | -                            |
| 3 | Industrielle Netzsicherheit (OT, IEC 62443)                 | 3    | An/Sy    | OT-vs-IT Schutzziele, Zonen/Conduits, IEC 62443-3-3 SLs, Industrieprotokolle, Vorfaelle Stuxnet/Industroyer/TRITON              | `industrial`                  | 4              | 50      | 4               | 50       | -                                                                     | -                            |
| 4 | Sichere Softwareentwicklung (S-SDLC)                        | 3    | An/Sy    | STRIDE/LINDDUN, Memory-Safety, SAST/DAST/Fuzzing/SCA, NIST SP 800-218 SSDF, Supply-Chain                                        | `sse`                         | 4              | 50      | 4               | 50       | -                                                                     | -                            |
| 5 | Risikomanagement und Compliance                             | 3    | An/B     | ISO/IEC 27001:2022 + Annex A, ISO/IEC 27005:2022, BSI IT-Grundschutz 2024, NIS2/CRA, CVSS v4.0/EPSS/KEV, FAIR/OCTAVE/ISO 31000  | `risk`                        | 4              | 50      | 4               | 50       | -                                                                     | -                            |
| 6 | AI-Security und vertrauenswuerdige Systeme                  | 3    | An/B     | Adversarial ML (FGSM/PGD/CW), DP-SGD, OWASP LLM Top 10 v2025, MITRE ATLAS, NIST AI RMF 1.0, EU AI Act, ISO/IEC 42001            | `aisec`                       | 4              | 50      | 4               | 50       | -                                                                     | -                            |
| 7 | Security Architecture, Zero Trust, Cloud/Kubernetes         | 3    | A/An/Sy  | NIST SP 800-207 ZT, Cloud Shared Responsibility, IAM/PAM, Kubernetes Threat Model, Container Supply Chain, CSPM/CWPP            | -                             | 0              | 0       | 4               | 50       | komplettes Kapitel fehlt                                              | P-CYBERSEC-07                |
| 8 | Incident Response, Forensik und Malware-Analyse             | 3    | An/Sy/B  | NIST SP 800-61r2, ISO/IEC 27035, Chain of Custody, Speicher-/Disk-Forensik, SIEM/EDR-Triage, Ransomware-Playbooks               | -                             | 0              | 0       | 4               | 50 + 2 PBQ | komplettes Kapitel + 2 PBQ-Faelle fehlen                              | P-CYBERSEC-08                |
| 9 | Offensive Security und Security Testing                     | 3    | An/Sy/B  | OWASP WSTG/ASVS, NIST SP 800-115, MITRE ATT&CK Enterprise, AD-Pfade, Web/API-Security, Reporting/Ethik                          | -                             | 0              | 0       | 4               | 50       | komplettes Kapitel fehlt; defensive Perspektive Pflicht               | P-CYBERSEC-09                |
| C | Capstone — Architekturbewertung Industrie/Embedded          | 3    | Sy/B     | Threat Model, Risikoanalyse, Controls, Testplan, IR-Runbook, Management-Summary; Selbstbewertung anhand Rubrik                  | -                             | 0              | 0       | 1 Kapitel       | 20 Review-Q | Capstone fehlt vollstaendig                                            | P-CYBERSEC-CAPSTONE          |

**Stand der Modulpruefungen.** Aktuell beruht jede Modulpruefung auf dem 10-MCQ-Quiz-Modus
des Readers (AGENTS §18.2). Pruefungsmodus mit Bestehensgrenze, Lernziel-Feedback und
Modulabschluss-Klausur (zwei Kapitel) wird im Querschnitt von **P-STUDY-ASSESSMENT-MODES**
geliefert.

**Stand der Fall-/PBQ-Aufgaben.** Bisher keine PBQ-Aufgaben in `master_et_cybersec`.
Mindestens ein Cyber-IR-Fall pro Modul (3, 7, 8) ist Pflicht — Lieferung ueber
**P-STUDY-PBQ-LABS**, ergaenzt durch P-CYBERSEC-08 (2 Faelle) und P-CYBERSEC-CAPSTONE.

**Quellenanker (verbindlich).** Fuer alle MCQ und Lehrseiten gelten primaere Standards in
aktueller Fassung: NIST SP 800-Serie (53r5, 61r2, 115, 160 Vol. 1 r1, 207, 218),
FIPS 140-3, FIPS 203/204/205 (2024), MITRE ATT&CK (Versions-Tag), ISO/IEC 27001/27002:2022,
ISO/IEC 27005:2022, OWASP Top 10 2021 / ASVS 4.0.x, FIRST CVSS v4.0 (2023), CISA KEV,
EU NIS2 (2022/2555), EU CRA (2024/2847), EU AI Act (2024/1689). Veraltete Verfahren
(DES/3DES/MD5/SHA-1/RSA<2048/TLS<1.2) ausschliesslich als Negativbeispiel mit Kennzeichnung.

---

## 2. Master Elektrotechnik — Automatisierungstechnik

**Datei:** `js/data/schulung_master_et_automation.js` · **Code:** `MA-ET Automation` · **Status (App):** `preparation`

### 2.1 Studiengangsprofil

- **Zielgruppe.** Berufsbegleitende Master-Studierende der Elektrotechnik mit Vorbildung
  in Regelungstechnik, Leistungselektronik und SPS-Programmierung.
- **Studiengangsumfang (Soll).** 30 ECTS Pflichtbereich Automatisierungstechnik
  (≈ 750–900 h). Smartineer deckt geschaetzt 14–18 ECTS Selbststudium und Pruefungs-
  vorbereitung ab; Inbetriebnahme-Praktika und Konstruktionsuebungen verbleiben am Lehrstuhl
  bzw. werden ueber das Lab-Paket (P-AUTO-LABS) als Trockenuebung abgebildet.
- **Pruefungsform (Soll).** Modulpruefungen je Kapitel (60 min, 30–40 MCQ + 1 Auslegungs-/PBQ-Fall),
  Modulabschluss als 90-min-Klausur ueber zwei Kapitel, Capstone als Anlagenentwurf mit Rubrik.

### 2.2 Voraussetzungen

| Themenfeld                  | Erwartete Vorkenntnisse                                                            |
|-----------------------------|------------------------------------------------------------------------------------|
| Mathematik                  | Lineare Algebra, Differentialgleichungen, Laplace-/z-Transformation                |
| Regelungstechnik            | Bode-/Wurzelortskurven-Analyse, PID-Auslegung, Stabilitaet im Frequenzbereich      |
| Antriebe                    | Drehfeldmaschinen, Park/Clarke-Verstaendnis, Pulsweitenmodulation                  |
| Informatik                  | Strukturierter Text (ST) oder Funktionsblockdiagramm-Grundlagen                    |
| Industriestandards          | IEC- und ISO-Normen eigenstaendig auswerten                                        |

### 2.3 Modulhandbuch — Soll vs. Ist

| # | Modul (Soll)                                                | ECTS | Bloom    | Soll-Inhalte (Kernkompetenzen)                                                                                                            | Ist-Kapitel (App)        | Lehrseiten Ist | MCQ Ist | Lehrseiten Soll | MCQ Soll | Gap                                                              | Paket                       |
|---|-------------------------------------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|----------------|---------|-----------------|----------|------------------------------------------------------------------|-----------------------------|
| 1 | Fortgeschrittene Regelungstechnik                           | 3    | An/Sy    | MIMO-Zustandsraum, Kalman, LQR/LQI, MPC, Robustheit/H∞, Lyapunov, Sliding Mode, Anti-Windup, Diskretisierung                              | `control`                | 4              | 30      | 4               | 50       | 20 MCQ fehlen                                                    | P-AUTO-01-TOPUP             |
| 2 | SPS / IEC 61131-3 / IEC 61499                               | 3    | A/An     | LD/ST/FBD/IL/SFC, POU/Tasking, IEC 61508/62061/ISO 13849-1, IEC 61499, Determinismus, Watchdogs                                           | `sps`                    | 4              | 50      | 4               | 50       | -                                                                | -                           |
| 3 | Feldbus / Industrial Ethernet / TSN                         | 3    | A/An     | PROFINET RT/IRT, EtherCAT (DC/FMMU), OPC UA Pub/Sub und FX (2022), IEEE 802.1Q-2022 TSN (Qbv/Qbu/ASc), Determinismus-Klassen              | `fieldbus`               | 4              | 50      | 4               | 50       | -                                                                | -                           |
| 4 | Antriebs- und Leistungselektronik (FOC/DTC)                 | 3    | An/Sy    | Park/Clarke, FOC ASM/PMSM, DTC, SVPWM, sensorlos (Back-EMF/HFI), Kaskade, EN 61800-5-2 STO/SS1/SLS                                        | `drives`                 | 4              | 50      | 4               | 50       | -                                                                | -                           |
| 5 | Robotik / Kinematik / Cobot                                 | 3    | An/Sy    | DH-Konvention, direkte/inverse Kinematik, Lagrange-Dynamik, Jacobi/Singularitaeten, ISO 10218-1/-2 + ISO/TS 15066, ROS 2, ISO 9283        | `robotics`               | 4 (Stub)       | 1       | 4               | 50       | Inhalt fehlt; Quiz nahezu leer                                   | P-AUTO-05                   |
| 6 | Industrie 4.0 / Digital Twin                                | 3    | An/B     | RAMI 4.0, AAS (IDTA Specs 2024), ISO 23247, ISA-95/IEC 62264, MTConnect, Edge-Cloud-Continuum                                             | `i40`                    | 4 (Stub)       | 1       | 4               | 50       | Inhalt fehlt; Quiz nahezu leer                                   | P-AUTO-06                   |
| 7 | Sensorik, Messtechnik und Signalverarbeitung                | 3    | A/An     | Messkette, Kalibrierung, GUM-Unsicherheit, Encoder/Resolver/IMU, Kraft-/Druck-/Temperatursensorik, ADC/DAC, EMV-gerechtes Messen          | -                        | 0              | 0       | 4               | 50 + 1 Auslegungsfall | komplettes Kapitel fehlt                                         | P-AUTO-07                   |
| 8 | Systemidentifikation, Simulation, Digital-Commissioning     | 3    | An/Sy    | ARX/ARMAX, Subspace-ID, Frequenzgangmessung, Grey-Box, MIL/HIL, virtuelle Inbetriebnahme, FMI/FMU                                         | -                        | 0              | 0       | 4               | 50 + 1 PBQ | komplettes Kapitel fehlt                                         | P-AUTO-08                   |
| 9 | Prozessautomation, SCADA/MES, Batch/Continuous              | 3    | An/B     | ISA-88, ISA-95/IEC 62264, P&ID, ISA-18.2 Alarmmanagement, SCADA/HMI, Historian, APC, IEC 61511 SIS                                        | -                        | 0              | 0       | 4               | 50       | komplettes Kapitel fehlt; Cyber-/I4.0-Verweise verpflichtend     | P-AUTO-09                   |
| L | Inbetriebnahme-Labs (SPS, Antrieb, Feldbus, Robotik)        | 3    | A/Sy/B   | Strukturierte Fehlersuche, Safety-Check, Achsinbetriebnahme, Feldbusdiagnose, Robot-Kalibrierung, Taktzeit, Abnahmetest                   | -                        | 0              | 0       | ≥ 4 PBQ-Labs    | -        | Lab-Paket fehlt; bestehende MCQ-Kapitel bleiben unveraendert     | P-AUTO-LABS                 |
| C | Capstone — Anlagenentwurf                                   | 3    | Sy/B     | Zellenentwurf SPS + Feldbus + Servo + Roboter + Safety + Digital Twin + HMI/MES + Abnahmeplan                                              | -                        | 0              | 0       | 1 Kapitel       | 20 Review-Q | Capstone fehlt vollstaendig                                       | P-AUTO-CAPSTONE             |

**Stand der Schulung.** `status: 'preparation'` bleibt bis P-AUTO-01-TOPUP, P-AUTO-05 und
P-AUTO-06 produktiv sind (Bedingung von **P-AUTO-STATUS**). Die optionalen Module 7, 8, 9
sowie L und C sind fuer ein vollstaendiges Fernstudium aus Dozentensicht erforderlich,
aber kein Blocker fuer den Statuswechsel der Schulung selbst.

**Stand der Fall-/PBQ-Aufgaben.** Aktuell keine PBQ-Items im Automation-Track. Mindestens
1 Auslegungsfall in Kapitel 7, 1 PBQ in Kapitel 8 und 4 Inbetriebnahme-Labs in Block L
sind Pflicht.

**Quellenanker (verbindlich).** IEC 61131-3:2013 (incl. Annex F/G), IEC 61499:2012,
IEC 61508-2:2010, IEC 62061:2021, ISO 13849-1:2023, IEC 61784-2:2019, IEC 62541 Parts 1/4/6/14,
IEEE 802.1Q-2022, IEEE 802.1AS-2020, IEEE 802.1CB-2017, IEC 60034-30-1:2014, IEC 61800-3:2017,
IEC 61800-5-2:2016, IEC 61800-9-2:2017, IEEE 519-2022, ISO 10218-1/-2:2011, ISO/TS 15066:2016,
ISO 9283, ISO 23247, ISA-88, ISA-95/IEC 62264, ISA-18.2, IEC 61511, IDTA AAS Specs 2024,
EU-VO 2019/1781.

---

## 3. Allgemeinmedizin & Medizinstudium

**Datei:** `js/data/schulung_allgemeinmedizin.js` · **Code:** `Med-AM` · **Status (App):** `production`

### 3.1 Studiengangsprofil

- **Zielgruppe.** Medizinstudierende entlang der ÄApprO (M1/M2/M3) sowie Aerztinnen und
  Aerzte in der Facharzt-Weiterbildung Allgemeinmedizin.
- **Studiengangsumfang (Soll).** Smartineer deckt **kein** vollstaendiges Medizinstudium ab
  (das setzt klinische Praktika, Famulaturen, OSCE und Examenspruefungen am Lehrstuhl voraus),
  sondern den **pruefungsnahen Selbststudien- und Wiederholungsanteil**. Soll-Workload:
  ≈ 200–300 h Selbststudium pro Pruefungsabschnitt (M1/M2/M3).
- **Pruefungsform (Soll).** IMPP-naher MCQ-Stil mit **fuenf** Antwortoptionen (AGENTS §18.4
  Ausnahme), Fallvignetten, OSCE-Stationen, Progress-Tests pro Studienabschnitt.

### 3.2 Voraussetzungen

| Studienabschnitt        | Erwartete Vorkenntnisse                                                                  |
|-------------------------|------------------------------------------------------------------------------------------|
| Vorklinik (M1)          | Naturwissenschaftliches Abitur, Grundverstaendnis Chemie/Physik/Biologie                 |
| Klinik (M2)             | Bestandene M1, Anatomie/Physiologie/Biochemie sicher                                     |
| PJ / Facharzt           | Bestandene M2, klinische Erfahrung in mind. 3 Faechern                                   |

### 3.3 Modulhandbuch — Soll vs. Ist

Smartineer fuehrt heute drei sehr breit angelegte Kapitel. Aus Dozentensicht muss diese
Granularitaet mittelfristig zu Gunsten von Fachkapiteln aufgebrochen werden — dabei
ist AGENTS §11 zwingend zu beachten: Reihenfolge bestehender Quiz-Items darf nicht veraendert
werden (sonst Drift im SRS-Karteikartensystem `smartineer_srs_v1`). Neue Fachkapitel werden
**zusaetzlich angelegt**, bestehende Kapitel bleiben in ihrer Reihenfolge erhalten und
werden ggf. nach Migration als Wiederholungs-/Querschnitts-Kapitel umetikettiert.

| Studienabschnitt | Soll-Module                                                                                                              | Bloom    | Ist-Kapitel (App)  | Lehrseiten Ist | MCQ Ist | Lehrseiten Soll | MCQ Soll | Gap                                                                                                              |
|------------------|--------------------------------------------------------------------------------------------------------------------------|----------|--------------------|----------------|---------|-----------------|----------|------------------------------------------------------------------------------------------------------------------|
| **M1 Vorklinik** | Anatomie, Histologie, Physiologie, Biochemie, Medizinische Psychologie/Soziologie, Terminologie, Wissenschaftl. Arbeiten | V/A      | `vorklinik_m1`     | 5              | 68      | je 4 (≥ 6 Module) | je 50  | Module noch nicht getrennt; M1-Coverage M-Psy/Soziologie/Terminologie/Wiss. Arbeiten fehlt strukturiert          |
| **M2 Klinik**    | Innere Medizin (Kardio/Pneumo/Gastro/Nephro/Endokrin/Haema), Chirurgie, Paediatrie, Gynaekologie, Neurologie/Psychiatrie, Dermato, Anaesthesie/Notfall, Radiologie, Pharmakologie, Mikrobiologie/Hygiene, Klinische Chemie, Klinische Faecher als eigene Module | An/Sy    | `klinik_m2`        | 11             | 84      | je 4 (≥ 12 Module) | je 50  | Module noch nicht getrennt; Chirurgie, Gynaekologie, Anaesthesie, Klin. Chemie, Mikrobiologie/Hygiene unterabgedeckt |
| **M3 PJ/Facharzt** | Innere Medizin, Chirurgie, Wahlfach (z.B. Allgemeinmedizin), DEGAM-Leitlinien, Multimorbiditaet, Geriatrie, Praevention, Praxisfuehrung, Notfall, POCUS, Reise-/Tropenmedizin   | An/Sy/B  | `pj_facharzt`      | 7              | 90      | je 4 (≥ 8 Module) | je 50  | Heute Allgemeinmedizin-zentriert; Innere/Chirurgie als M3-Kernfaecher fehlen noch                                |

### 3.4 Querschnitts-Anforderungen

- **OSCE / Fallvignetten.** Heute keine systematische OSCE-Abdeckung. Mittelfristig pro
  Modul mindestens 2 Fallvignetten (PBQ `cloze` fuer Anamnese/Therapieentscheid,
  PBQ `sequence` fuer Diagnostik-Reihenfolge). Lieferung ueber **P-STUDY-PBQ-LABS** sowie
  fachspezifische Folgepakete.
- **Longitudinale Verknuepfung.** Anatomie ↔ Klinik, Pharmakologie ↔ Innere/Notfall,
  Pathologie ↔ Bildgebung. Heute teilweise inline in den breiten Kapiteln; ein
  Glossar/Quervernetzungs-Modul kommt mit **P-ARCH-GLOSSARY** + **P-LP-FEEDBACK-LINKS**.
- **Leitlinien-Audit.** AWMF-/DEGAM-/STIKO-/IMPP-Aktualitaet ist wartungsintensiv.
  Pflichtaudit pro Halbjahr ueber **P-STUDY-QA-SOURCE-AUDIT**, mit Versionsanker je
  `explanation` (z.B. "AWMF S3-Leitlinie Asthma 2023").
- **Pruefungsmodus.** IMPP-Stil-Klausur (60 Fragen, 90 min) und Progress-Test (180 Fragen,
  M1/M2/M3 gemischt) liefert **P-STUDY-ASSESSMENT-MODES**.

### 3.5 Quellenanker (verbindlich, AGENTS §18.5)

Schmidt/Lang Physiologie 33. Aufl., Loeffler/Petrides Biochemie 10. Aufl., Schuenke/Schulte/Schumacher
PROMETHEUS 6. Aufl., Herold Innere Medizin 2024/2025, Mutschler Pharmakologie 11. Aufl.,
AWMF-Leitlinien (Versions-Tag und Jahr), DEGAM-Leitlinien (Versions-Tag und Jahr),
STIKO-Empfehlungen 2024 inkl. RSV, ÄApprO 2002 in der jeweils geltenden Fassung,
IMPP-Gegenstandskataloge M1/M2 (Versions-Tag), Fried-Frailty-Score, PRISCUS 2.0,
STOPP/START V3, FORTA, GINA 2024, GOLD 2024, CHA₂DS₂-VASc, CRB-65.

---

## 4. Cross-Cutting — Anforderungen ausserhalb der Studiengaenge

Diese Anforderungen gelten **fuer alle drei** Studiengaenge gleichzeitig und werden ueber die
Querschnitts-Pakete in `WORKPACKAGES.md` Abschnitt 0 sowie Bloecke G/H/I geliefert.

| Querschnitts-Anforderung                                           | Verantwortliches Paket          |
|--------------------------------------------------------------------|---------------------------------|
| Einheitliche Lehrseiten-Didaktik (Lernziele, Vorwissen, Worked Examples, Selbstcheck, Transfer, Quellen) | P-STUDY-DIDACTIC-TEMPLATE       |
| Pruefungs-, Modulabschluss- und Progress-Test-Modus                | P-STUDY-ASSESSMENT-MODES        |
| Fall-/Labor-/PBQ-Aufgaben pro Studiengang                          | P-STUDY-PBQ-LABS                |
| Quellen-, Aktualitaets- und Distraktorqualitaets-Audit             | P-STUDY-QA-SOURCE-AUDIT         |
| Stabile Quiz-Item-IDs (gegen SRS-Drift bei Umstrukturierung)       | P-ARCH-STABLE-QID               |
| Erweitertes Quiz-Item-Schema (Lernziel-Tag, Taxonomie, Quelle)     | P-ARCH-ITEM-SCHEMA              |
| Lernziel-/Kompetenzfeld-Auswertung im Quiz                         | P-ARCH-LO-COMPETENCE            |
| Glossar und Cross-Chapter-Verlinkung                               | P-ARCH-GLOSSARY                 |
| Modulabschluss-Klausur ueber mehrere Kapitel                       | P-ARCH-CROSS-CHAPTER-EXAM       |

---

## 5. Pflege dieses Dokuments

- Bei jeder Erledigung eines Pakets aus den Tabellen oben: Ist-Spalte hier
  aktualisieren, Gap auf "-" setzen, Paket-Verweis stehen lassen (mit `done`-Vermerk
  in `WORKPACKAGES.md` Historie).
- Bei jedem **neuen** Modul-Soll: Zeile in der jeweiligen Modulhandbuch-Tabelle ergaenzen
  und in `WORKPACKAGES.md` ein Paket dafuer anlegen (Naming `P-<TRACK>-<KENNUNG>`).
- Niemals Quiz-Items oder Kapitel umsortieren — bei Restrukturierung neue Kapitel
  zusaetzlich anlegen (AGENTS §11, §18.3).
- ECTS-Schaetzungen sind orientierend (Soll-Workload), keine Akkreditierungsaussage —
  Akkreditierung obliegt der jeweiligen Hochschule.
