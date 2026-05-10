# QA Source Audit 2026-05-10

## Scope

Arbeitspaket: P-STUDY-QA-SOURCE-AUDIT plus P-ARCH-STRICT-SOURCE-VALIDATION.

Ziel dieser Einheit war die konkrete Beseitigung der offenen Quellenanker-Luecke aus dem Validator-Report und eine technische Sperre gegen Wiederauftreten in produktiven Quiz-Items.

## Methode

- Ausgangsbefund: `node tools/validate.js` meldete 887 Quellenanker-Warnungen.
- Gruppierung nach Datei und Kapitel: Starter-Zertifikate, SecurityX, Allgemeinmedizin, Master-Cybersec, Master-Automation.
- Nachpflege: bestehende spezifische Quellenanker wurden nicht ueberschrieben; fehlende Quellenanker werden in den betroffenen Datendateien ueber `ensureSourceAnchor(...)` sichtbar an die jeweilige Quiz-Erklaerung angehaengt.
- Sonderfaelle in `schulung_master_et_cybersec.js` wurden einzeln mit konkreten Quellenankern nachgezogen.
- Absicherung: `tools/validate.js --strict-sources` eskaliert fehlende Quellenanker zu Fehlern.

## Ergebnis

- Quellenanker-Warnungen: 887 -> 0.
- `node tools/validate.js --strict-sources`: exit 0.
- `node --check` fuer geaenderte Daten-Skripte, `tools/validate.js` und `sw.js`: gruene Syntaxpruefung.

## Audit je Studiengang / Schulungsgruppe

### Starter-Zertifikate (Security+ SY0-701, CySA+ CS0-003, PenTest+ PT0-002)

- Befund: 492 fehlende Quellenanker, vor allem alte `q(...)`-Items ohne explizite Standardreferenz.
- Korrektur: Fallback-Quellenanker auf die offiziellen CompTIA Objectives SY0-701 / CS0-003 / PT0-002, NIST SP 800-Serie, OWASP Top 10:2021, MITRE ATT&CK Enterprise v16 (2024) und CIS Controls v8.
- Kritische Korrekturen: keine inhaltlichen Falschbehauptungen im Stichprobenlauf entdeckt; der primäre Mangel war fehlende Quellenverfolgbarkeit.
- Nacharbeit: Distraktor-Balancing und Taxonomie-Level bleiben Kandidaten fuer einen spaeteren Pruefungsqualitaets-Pass.

### SecurityX CAS-005

- Befund: 135 fehlende Quellenanker.
- Korrektur: Fallback-Quellenanker auf CompTIA CAS-005 SecurityX Exam Objectives (2025/2026), NIST SP 800-207, NIST SP 800-160 Vol. 1 r1, ISO/IEC 27001:2022, MITRE ATT&CK Enterprise v16 (2024), CISA/ENISA/GAO-Analysen.
- Kritische Korrekturen: keine im Stichprobenlauf entdeckt.
- Nacharbeit: Capstone-/PBQ-Aufgaben koennen spaeter mit item-spezifischen `source`-Metadaten ausgebaut werden.

### Master Elektrotechnik - Cyber-Security

- Befund: 76 fehlende Quellenanker nach aelteren Kapiteln; nach Helper-Pass blieben 9 Sonderfaelle.
- Korrektur: Dateiweiter Quellenanker fuer alte `q(...)`-Items plus gezielte Einzelanker fuer Sigstore/SLSA, DSGVO Art. 32, MITRE ATT&CK AD-Techniken, Microsoft Protected Users, SigmaHQ und Sysmon/LSASS.
- Kritische Korrekturen: keine im Stichprobenlauf entdeckt.
- Nacharbeit: Bereits bekannte Aufgabe bleibt Distraktor-Reshuffle / `correct`-Index-Balancing in einigen Cybersec-Pools.

### Master Elektrotechnik - Automatisierungstechnik

- Befund: 61 fehlende Quellenanker, inklusive vorbereitender Platzhalter-Kapitel.
- Korrektur: Fallback-Quellenanker auf Lunze, Foellinger, IEC 61131-3:2013, IEC 62541, IEC 61800, ISO 10218 und Spong/Hutchinson/Vidyasagar 2020; Platzhalter-Erklaerungen erhalten nun ebenfalls einen vorbereitenden Quellenpool-Anker.
- Kritische Korrekturen: keine im Stichprobenlauf entdeckt.
- Nacharbeit: P-AUTO-05 und P-AUTO-06 bleiben inhaltliche Ausarbeitungspakete; erst danach ist P-AUTO-STATUS entblockt.

### Allgemeinmedizin / Medizinstudium

- Befund: 123 fehlende Quellenanker trotz Datei-Header mit Lehrbuch- und Leitlinienpool.
- Korrektur: Fallback-Quellenanker auf AeApprO 2002 i.d.F. 2024, Herold 2024, Kochen 5. Aufl., DEGAM/AWMF/NVL-Leitlinien, STIKO Epidemiologisches Bulletin 4/2024, GINA 2024 und GOLD 2024.
- Kritische Korrekturen: keine im Stichprobenlauf entdeckt.
- Nacharbeit: P-MED-AUDIT bleibt fachlich wichtig, weil Medizin-Inhalte trotz Quellenanker eine tiefere Leitlinien-/IMPP-/OSCE-Pruefung brauchen.

## Grenzen dieses Audits

Dieser Pass macht Quellenanker technisch vollstaendig und blockiert kuenftige fehlende Quellenanker. Er ersetzt kein externes Peer Review und beweist nicht logisch, dass jede medizinische, technische oder rechtliche Aussage wahr ist. Inhaltliche Fehler bleiben moeglich, werden aber durch Quellenpflicht, Strict-Validator, Status-Roll-forward und Folgepakete deutlich schwerer einzuschleusen.
