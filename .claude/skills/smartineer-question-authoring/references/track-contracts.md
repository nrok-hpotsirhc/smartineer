# Track-Vertraege und Qualitaetsgates

Diese Datei fasst den Einstieg zusammen. Vor einer Aenderung bleiben die aktuellen Regeln in `AGENTS.md`, das reale Zielschema und `tools/validate.js` massgeblich.

## Gemeinsame Item-Qualitaet

Jedes neue Item muss:

- ein benennbares Lernziel pruefen,
- gegen eine konkrete Quelle verifiziert sein,
- eigenstaendig formuliert und urheberrechtlich unbedenklich sein,
- vollstaendig, eindeutig und mit den angegebenen Daten loesbar sein,
- eine fachlich und didaktisch passende Schwierigkeit besitzen,
- einen nachvollziehbaren Loesungs- oder Erklaerungsweg liefern,
- von vorhandenen Items semantisch verschieden sein,
- das vom Renderer erwartete HTML-/KaTeX-/Plain-Text-Format einhalten,
- keine Emojis oder Unicode-Dingbats enthalten; Symbole nur gemaess `AGENTS.md` ueber KaTeX oder den Latin-/Math-Block verwenden,
- den Persistenzvertrag des Tracks respektieren.

Neue Items sollten `lo`, `bloom`, `difficulty`, `tags` und `source` tragen, sofern das aktuelle Zielschema und Curriculum passende Werte bereitstellen. Neue Lernziel-IDs zuerst gegen `docs/CURRICULUM-MATRIX.md` pruefen.

## Ingenieurs-Track

### Schema und Einordnung

- Zieldatei: `js/data/<id>.js`, IIFE unter `window.APP_DATA`.
- Genau drei Level; Aufgabe mindestens `{ q, h, s }`.
- Optionale Hint-Leiter: `h1`, `h2`, `h3`; klassisches `h` bleibt Pflicht und letzte Stufe.
- `q`, `h`, `s` sind statisches HTML mit doppelt escapten KaTeX-Backslashes.
- Geschlossene numerische oder symbolische Ergebnisse in `\\boxed{...}`.
- Modellannahmen und Konventionen vor der Rechnung nennen; SI-Einheiten und sinnvolle Rundung verwenden.

### Didaktik

- L1 reaktiviert Hochschulgrundlagen und ist keine triviale Schulaufgabe.
- L2 verlangt Kombination, Auslegung oder mehrschrittige Anwendung.
- L3 verlangt Analyse, Synthese, Fehlerbewertung oder anspruchsvollen Transfer mit pruefbarer Loesung.
- Hinweise staffeln von Konzept ueber Strategie zu konkretem Ansatz; die Musterloesung zeigt Schritte und Bedeutung.
- Bei neuer Formel oder Definition das `formulas`-Cheatsheet ergaenzen.

### Persistenz und Einfuegung

- Bestehende Aufgaben nicht umsortieren; neue Aufgaben an das passende Level anhaengen.
- Vorher alle drei Level auf inhaltliche Dubletten pruefen.
- Aenderungen an bestehendem `q` oder `s` koennen Stable-QID/SRS beeinflussen; Indexverschiebungen koennen Fortschritt falsch zuordnen.

## Schueler-Track

### Schema nach Zielgruppe

- Klassen 1-2 Mathematik koennen `generated` mit `{ q, a }` verwenden; Generatoren muessen gueltige, altersgerechte Varianten liefern.
- Pool-basierte Klassen 1-4 verwenden grundsaetzlich `{ q, a }` in Plain-Text.
- Klassen 5-10 verwenden nach Runtime-Anreicherung `{ q, a, f, s }`; `f` und `s` sind Strings und duerfen als bewusster Opt-out leer sein.
- Sprachitems tragen `kind` und `section`: Zahlen/Vokabeln als `vocab` mit `numbers`/`vocab`, Grammatik als `grammar` mit `grammar`.
- Keine Multiple-Choice-Aufgaben; Antwortvergleich erfolgt ueber `SCH.normalize()`.

### Curriculum- und Antwortqualitaet

- Pruefe Klasse, Fach und Thema gegen den aktuellen NRW-Lehrplan/KLP bzw. CEFR und die im Projekt dokumentierte Progression.
- Keine Lehrwerksgenauigkeit behaupten, solange keine autorisierte konkrete Liste vorliegt.
- `a` muss nach `SCH.normalize()` nicht leer und eindeutig sein.
- Dezimalpunkt und Dezimalkomma muessen gleichwertig bleiben; Tausendertrennzeichen vermeiden.
- Formathinweise duerfen die konkrete Antwort nicht verraten; neutrale Beispiele verwenden.
- Gleicher Stem mit abweichender Antwort ist blockierend. Exakte und semantische Dubletten vermeiden.
- Tipp und Musterloesung muessen lernwirksam sein; generische Floskeln weglassen und bei fehlendem Mehrwert den erlaubten leeren String nutzen.
- Altersgerechte Sprache darf den fachlichen Anspruch reduzieren, aber nicht die Wahrheit oder Eindeutigkeit.

### Einfuegung

- Erweiterungen append-only in die aktuell vorgesehene Basis- oder Top-up-Datei einfuegen.
- Vor dem Edit die reale Ladereihenfolge in `index.html`, die Validator-Dateiliste und `sw.js` pruefen.
- Bei neuen Datendateien alle drei Stellen synchron aktualisieren.

## Schulungen und Fernstudium

### MCQ

- Standard: `{ q, options, correct, explanation }` mit genau vier Optionen.
- Medizinische IMPP-nahe Schulungen duerfen fuenf Optionen verwenden.
- `correct` ist ein gueltiger nullbasierter Index.
- `explanation` erklaert, warum die richtige Antwort gilt, und nennt einen konkreten Quellenanker mit Version/Jahr und Abschnitt, soweit verfuegbar.
- Jede falsche Option einzeln gegenpruefen. Distraktoren muessen plausibel, homogen und eindeutig falsch sein.
- Verteile korrekte Positionen ueber den Batch ausgewogen; keine erkennbare Positionsserie. Veraendere dafuer nicht ungeprueft bestehende Items.

### PBQ

- Sequence: `{ type: 'sequence', q, items, correct, explanation }`; `correct` ist eine vollstaendige Permutation der Item-Indizes.
- Cloze: `{ type: 'cloze', q, blanks: [{ label, accept }], explanation }`; jede Luecke braucht mindestens eine eindeutige akzeptierte Antwort.
- PBQ bewertet eine reale Reihenfolge, Zuordnung oder Entscheidung und darf nicht nur ein MCQ in anderer Optik sein.

### Curriculum und Quellen

- Ordne Items vorhandenen `learningObjectives`, Seiten-`lo` und `tags` zu, wenn diese gepflegt sind.
- Produktive Kapitel zielen auf mindestens 50 Quiz-Items; Bootstrap-, Vorbereitungs- und Capstone-Ausnahmen nur gemaess aktuellem `AGENTS.md` und mit offenem Statushinweis.
- Certification-Fragen muessen zur aktuell gueltigen Objective-Version passen.
- Master-Fragen muessen Hochschulniveau, Bloom-Progression und Transfer abdecken.
- Medizinische Fragen benoetigen aktuelle Leitlinien-/Standardpruefung; Quellenanker allein ersetzen keinen Leitlinien-Audit.
- Keine woertliche Uebernahme geschuetzter Pruefungsfragen oder kommerzieller Trainingsbanken.

### Persistenz und Einfuegung

- Quiz-Items grundsaetzlich anhaengen. Stable-QID schuetzt nur bei unveraendertem Stem und unveraenderter korrekter Antwort.
- Kapitel und Seiten nicht umsortieren; Lesestand und Feedback-Verlinkung koennen sonst driften.
- Neue MCQ koennen den Pool bestehender `assessments` veraendern. Fuer referenzierte Kapitel Filterwirkung und `count <= pool.length` erneut pruefen.
- Bringt der Auftrag neue Lehrseiten mit, muessen sie das aktuelle achtteilige Didaktik-Template aus `AGENTS.md` von Lernzielen bis Quellen erfuellen.

## Review-Gates pro Item

| Gate | Bestehensfrage |
|---|---|
| Wahrheit | Ist jede tragende Aussage in einer eingesehenen Quelle belegt? |
| Aktualitaet | Ist die relevante Fassung/Leitlinie/Objective am Pruefdatum aktuell? |
| Eindeutigkeit | Gibt es unter den genannten Annahmen genau eine bewertete Antwort? |
| Rechenweg | Stimmen Ansatz, Zwischenwerte, Einheit, Rundung und Endergebnis? |
| Didaktik | Prueft das Item das geplante Lernziel auf der geplanten Stufe? |
| Distraktoren | Sind alle Distraktoren plausibel und nachweislich falsch? |
| Originalitaet | Ist die Formulierung eigenstaendig und keine geschuetzte Kopie? |
| Redundanz | Fuegt das Item neue Abdeckung statt nur eine Zahlenvariante hinzu? |
| Rendering | Sind HTML, KaTeX, Escaping und Plain-Text-Konvention korrekt? |
| Persistenz | Bleiben Reihenfolge, IDs und bestehende Stable-QIDs unangetastet? |

Ein Item, das ein Gate nicht besteht, wird korrigiert oder verworfen. Es wird nicht nur deshalb behalten, damit ein Mengenziel erreicht wird.