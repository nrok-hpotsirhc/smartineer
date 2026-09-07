---
name: smartineer-question-authoring
description: 'Entwickelt, erweitert und prueft Fragen/Aufgaben fuer Smartineer streng evidenz- und quellenbasiert. Verwenden bei neuen Fragen, Quiz-Items, Aufgabenpools, Kategorie-Top-ups, Schulungs-MCQ/PBQ, Schueler-Aufgaben, Quellen-Audits, Schwierigkeits- und Curriculum-Abdeckung. Liest den aktuellen Projektstand, nimmt die passenden Fach-, Dozenten-, Didaktik-, Faktenpruefer- und QA-Rollen ein und setzt AGENTS-/WORKPACKAGES-Pflichten um.'
argument-hint: '[Track und Kategorie/Klasse/Schulung] [Anzahl oder Ziel]'
user-invocable: true
disable-model-invocation: false
---

# Smartineer Question Authoring

## Ziel

Entwickle neue, eigenstaendige Lernfragen fuer den aktuellen Smartineer-Bestand. Arbeite nicht aus einem statischen Wissensstand dieses Skills: Ermittle bei jedem Aufruf den tatsaechlichen Repository-Stand und belege fachliche Aussagen mit geprueften Quellen.

Dieser Skill ist ein Arbeitsablauf, kein Freibrief zum Raten. Wenn die geforderte Menge nicht sauber verifiziert werden kann, liefere weniger Fragen und weise die Luecke deutlich aus.

## Verbindliche Rangfolge

1. Aktueller Nutzerauftrag.
2. Die fuer das Repository geltende `AGENTS.md`.
3. Aktueller Status und offene Pakete in `WORKPACKAGES.md`.
4. Bestehende Daten, Renderer, Validatoren und Tests im Workspace.
5. Dieser Skill.

Bei Widerspruch gilt die hoehere Ebene. Veraltete Zahlen, Dateinamen oder Regeln aus Chatverlauf und Modellwissen duerfen den gelesenen Repository-Stand nicht ueberschreiben.

Lies fuer Rollen- und Evidenzregeln [roles-and-truth.md](./references/roles-and-truth.md). Lies nach Bestimmung des Tracks [track-contracts.md](./references/track-contracts.md). Beide Dateien liegen relativ zu dieser `SKILL.md` im Unterordner `references/`; konstruiere einen absoluten Pfad aus dem Skill-Pfad, falls das jeweilige Lesetool relative Pfade nicht aufloest.

## Arbeitsablauf

### 1. Auftrag und Ist-Stand feststellen

1. Lies `AGENTS.md` und `WORKPACKAGES.md`, einschliesslich des letzten Status-Reports und Abschnitt E.
2. Bestimme Track, Ziel, Zielgruppe, Kategorie/Klasse/Fach oder Schulung/Kapitel, Umfang und gewuenschtes Ergebnis.
3. Wenn eine Unklarheit die fachliche Richtigkeit oder das Datenziel veraendert, stelle hoechstens drei gezielte Fragen. Sonst arbeite mit einer offen genannten, konservativen Annahme weiter.
4. Lies die Zieldatei, die direkt benachbarten Items, relevante Renderer-/Validatorregeln und gegebenenfalls `docs/CURRICULUM-MATRIX.md`.
5. Ermittle Zahlen aus dem laufenden Datenbestand oder einem vorhandenen Zaehlscript. Uebernimm keine alten Counts aus Berichten ungeprueft.
6. Bei einer Aenderung lege gemaess `AGENTS.md` ein Arbeitspaket an oder aktualisiere das passende Paket und setze begonnene Pakete vor Inhaltsarbeit auf `in-progress`.

### 2. Lokalen Befund formulieren

Halte vor dem Schreiben knapp fest:

- beobachteter Ist-Bestand und Zielschema,
- vorhandene Themen-, Lernziel-, Schwierigkeits- und Fragetyp-Abdeckung,
- konkrete Luecke statt nur gewuenschter Stueckzahl,
- naheliegende Dubletten- und Persistenzrisiken,
- benoetigte Quellen und ihr erforderlicher Aktualitaetsstand,
- eine falsifizierbare Hypothese fuer die kleinste sinnvolle Erweiterung,
- den guenstigsten Check, der diese Hypothese widerlegen koennte.

Sobald dies feststeht, beginne mit einer kleinen, pruefbaren Aenderung. Vermeide eine breite Bestandskartierung ohne Entscheidungsnutzen.

### 3. Rollen nacheinander einnehmen

Nutze die Rollen aus [roles-and-truth.md](./references/roles-and-truth.md) als getrennte Pruefperspektiven. Waehle die passende Fachrolle anhand des Tracks. Behaupte niemals reale Berufsabschluesse, Zulassungen oder persoenliche Erfahrung; die Rollen sind Arbeitsmodi.

Mindestens erforderlich:

1. Maintainer und Bestandsanalyst.
2. Passender Fachexperte oder Curriculum-/Leitlinienpruefer.
3. Hochschuldozent bzw. Fachdidaktiker.
4. Assessment-Autor.
5. Unabhaengiger Fakten- und Quellenpruefer.
6. Adversarial Reviewer fuer Eindeutigkeit und Distraktoren.
7. Technischer Dateneditor und Release-QA.

Die Autor-Perspektive darf ihre eigenen Aussagen nicht stillschweigend als geprueft markieren. Fuehre einen getrennten Faktencheck-Pass durch.

### 4. Abdeckungsmatrix vor dem Formulieren

Plane den Batch als kompakte Matrix mit mindestens:

| Feld | Inhalt |
|---|---|
| Zielposition | Track, Datei, Kategorie/Klasse/Kapitel, Level/Section |
| Lernziel | beobachtetes Curriculum- oder Kompetenzziel |
| Kognitive Stufe | Bloom bzw. projektspezifische Schwierigkeit |
| Aufgabentyp | Rechnung, Begriff, Transfer, Fehleranalyse, MCQ, PBQ usw. |
| Primaerquelle | Titel, Version/Jahr und moeglichst Abschnitt |
| Verifikationsbedarf | Aussage, Rechnung, Konvention, Aktualitaet |
| Dublettenabstand | Unterschied zu vorhandenen Nachbaraufgaben |

Mische Erinnern, Anwenden, Transfer und Fehleranalyse passend zur Zielstufe. Eine reine Umformulierung bestehender Fragen zaehlt nicht als neue Abdeckung.

### 5. Quellen pruefen

1. Bevorzuge Primaerquellen, aktuelle Standards, offizielle Curricula/Leitlinien und etablierte Lehrbuecher in der von `AGENTS.md` geforderten Reihenfolge.
2. Pruefe die konkrete Behauptung im tatsaechlich eingesehenen Dokument. Ein plausibel klingender Titel oder ein vorhandener Repository-Zitationsstring ist kein Beleg.
3. Erfasse Titel, Herausgeber/Autor, Version oder Jahr, Abschnitt/Seite und Pruefdatum, soweit verfuegbar.
4. Kennzeichne Paywall, fehlenden Volltext, nur sekundaere Bestaetigung, veraltete Fassung und widerspruechliche Quellen.
5. Bei Standards, Recht, Security, Medizin und Curriculum pruefe ausdruecklich, ob die Fassung am Tag der Bearbeitung aktuell ist.
6. Rechne numerische Ergebnisse unabhaengig nach. Nenne Annahmen, Konventionen, Einheiten, Rundung und Naeherungsfehler.
7. Kopiere keine geschuetzten Aufgaben oder Lehrwerkslisten. Erzeuge eigenstaendige Formulierungen auf Basis der Fakten und Lernziele.

Kann eine zentrale Behauptung nicht verifiziert werden, verwende sie nicht. Markiere das Item oder den betroffenen Umfang als `UNBEKANNT / BLOCKIERT`.

### 6. Fragen erstellen und gegenpruefen

1. Schreibe nach dem Vertrag des Zieltracks aus [track-contracts.md](./references/track-contracts.md).
2. Teste pro Item: genaues Lernziel, eindeutige Fragestellung, vollstaendige Angaben, richtige Loesung, plausible aber eindeutig falsche Distraktoren, angemessene Schwierigkeit, keine unbeabsichtigte Antwortpreisgabe.
3. Pruefe bei Rechnungen jeden Zwischenschritt mit einem unabhaengigen Rechenweg oder ausfuehrbarem Check.
4. Pruefe bei MCQ jede Option einzeln. "Die richtige Option klingt am besten" ist kein Nachweis dafuer, dass alle anderen falsch sind.
5. Suche im gesamten relevanten Pool nach semantischen Dubletten, widerspruechlichen Antworten und zu aehnlichen Zahlenvarianten.
6. Verwende bei strittigen Konventionen eine explizite Festlegung im Stem oder in der Loesung.
7. Fuehre anschliessend den unabhaengigen Faktencheck- und Adversarial-Review-Pass aus. Korrigiere oder verwerfe unsichere Items.

### 7. Repository-konform umsetzen

- Bestehende Items nicht umsortieren. Neue Items grundsaetzlich append-only einfuegen, soweit `AGENTS.md` fuer den Track nichts Strengeres vorgibt.
- Bestehende IDs, Frage-Stems oder korrekte Antworten nur bewusst aendern: Stable-QID, SRS oder indexbasierter Fortschritt koennen betroffen sein.
- Erforderliche Cheatsheets, Quellenmetadaten, Curriculum-Matrix, README-Zaehler, `index.html` und `sw.js` mitpflegen.
- Bei App-Shell- oder Datenskript-Aenderungen `CACHE_VERSION` nach Projektregel bumpen.
- Keine neuen Frameworks, Build-Schritte oder Datenformate einfuehren, sofern der Auftrag dies nicht mit den Projektregeln vereinbart.

### 8. Sofort und abschliessend validieren

Nach der ersten substantiellen Aenderung sofort den kleinsten falsifizierenden Check ausfuehren. Danach mindestens:

1. `node --check <jede geaenderte JS-/JSX-Datendatei, soweit Node sie parsen kann>`.
2. `node tools/validate.js --strict-sources`.
3. Im Schueler-Track zusaetzlich `node tools/audit_schueler_answers.js`, sofern die Datei im aktuellen Projekt vorhanden ist; seine Kandidaten manuell bewerten.
4. VS-Code-Diagnostik fuer alle geaenderten Dateien.
5. Gezielte Counts sowie Dubletten-, Antwort- und Verteilungschecks fuer den geaenderten Pool.
6. Browser-Smoke fuer Frage, Hinweis/Tipp, Loesung/Feedback und KaTeX; bei neuen Kategorien oder Dateien auch Navigation und Offline-App-Shell.
7. `git diff --check` und abschliessende Sichtung des fokussierten Diffs.

Ein gruener Validator beweist Schema-Konformitaet, nicht wissenschaftliche Wahrheit. Berichte beide Pruefarten getrennt.

### 9. Abschluss und Informationspflicht

Aktualisiere `WORKPACKAGES.md`: erledigte Pakete auf `done`, Teilstaende ehrlich auf `in-progress`, nicht begonnene Pakete zurueck auf `ready` oder `blocked`; Abschnitt E auf den sinnvollsten naechsten Batch setzen.

Der Abschluss muss enthalten:

- **DONE**: konkrete Dateien, Mengen, Abdeckung, fachliche Pruefung und ausgefuehrte Validierung.
- **OFFEN / DRINGEND**: alle funktionalen, fachlichen, Quellen-, Mengen- oder Smoke-Test-Luecken; vorherige offene Punkte einzeln fortschreiben.
- **NICE-TO-HAVE**: nur optionale Verbesserungen.
- **WORKLOG-OFFEN**: `offene Arbeitspakete / alle Arbeitspakete inklusive erledigter Pakete` als Prozentwert; Zaehllogik nennen, falls blockierte Pakete einbezogen sind.

Nenne ausserdem pro Quellenklasse, was tatsaechlich geprueft wurde und was nicht. Formuliere niemals "wissenschaftlich geprueft", wenn nur Syntax, Schema oder ein vorhandener Quellenanker kontrolliert wurde.

## Harte Stop-Regeln

- Keine erfundenen Quellen, Abschnitte, Versionen, Seitenzahlen, Messwerte oder Zitate.
- Keine ungepruefte Uebernahme bestehender Projektinhalte als fachliche Wahrheit.
- Keine Quotenfuellung mit Varianten, deren einziger Unterschied Zahlen, Namen oder Wortstellung sind.
- Keine verschwiegenen Minderumfaenge, Warnungen, fehlenden Browser-Smokes oder nicht eingesehenen Quellen.
- Keine Aussage "aktuell", ohne den Stand gegen eine datierte Quelle geprueft zu haben.
- Keine medizinische Dosierung, rechtliche Frist oder Security-Empfehlung aus Modellgedaechtnis allein.
- Keine Produktionsfreigabe, solange ein blockierender fachlicher oder technischer Check offen ist.

## Beispielaufrufe

In Copilot und Claude kann der Skill ueber den Slash-Namen aufgerufen werden, soweit die jeweilige Oberflaeche Skills als Slash-Befehl anbietet; durch die konkrete Beschreibung darf er auch bei einem passenden natuerlichsprachlichen Auftrag automatisch geladen werden.

- `/smartineer-question-authoring Ingenieurs-Track Sensorik: 12 neue L2-Aufgaben zu Messunsicherheit und Kalibrierung`
- `/smartineer-question-authoring Schueler Klasse 7 Chemie: pruefe den Bestand und ergaenze 20 nicht redundante Aufgaben`
- `/smartineer-question-authoring SecurityX Kapitel GRC: 10 MCQ mit aktuellen Primaerquellen und Distraktor-Audit`
- `/smartineer-question-authoring Allgemeinmedizin: erst Quellenlage und Leitlinienstand pruefen, dann 5 Fallvignetten entwerfen`