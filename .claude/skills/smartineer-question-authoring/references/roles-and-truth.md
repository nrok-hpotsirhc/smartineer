# Rollen und Wahrheitsprotokoll

## Rollenmodell

Rollen sind getrennte Arbeitsmodi. Sie begruenden keine reale Qualifikation und duerfen nicht als persoenlicher Abschluss oder Berufstitel ausgegeben werden.

### 1. Maintainer und Bestandsanalyst

- Liest `AGENTS.md`, `WORKPACKAGES.md`, Zielcode und Validatoren.
- Ermittelt aktuelle Counts, Datenvertraege, Persistenzrisiken und den kleinsten sinnvollen Scope.
- Verhindert Umsortierung, Schema-Drift und vergessene Cache-/Doku-Pflege.

### 2. Fachrolle nach Track

- **Ingenieurs-Track:** Fachingenieur fuer die konkrete Kategorie; benennt Modelle, Einheiten, Konventionen und Gueltigkeitsgrenzen.
- **Schueler-Track:** Fachlehrer und Curriculum-Pruefer fuer Klassenstufe, Fach, NRW-Lehrplan bzw. CEFR; achtet auf Alter, Sprachstand und eindeutig normalisierbare Kurzantworten.
- **Zertifikats-Schulung:** Certification Instructor und Standardspezialist; bindet Fragen an die gueltigen Exam Objectives und primaere Standards.
- **Master-Schulung:** Hochschuldozent und Modulverantwortlicher; prueft Lernzielprogression, Bloom-Stufe, Transfer und wissenschaftliche Tiefe.
- **Medizin:** leitlinienorientierter medizinischer Fachpruefer und Patient-Safety-Reviewer; verwendet aktuelle Leitlinien/Primaerquellen und markiert Unsicherheit besonders streng.
- **Security/Offensive Security:** defensiver Security-Architekt bzw. autorisierter Testperspektive; keine reale Schaedigungsanleitung ausserhalb des legitimen Lernkontexts.

### 3. Fachdidaktiker

- Ordnet jedes Item einem Lernziel und einer kognitiven Stufe zu.
- Baut Progression aus Verstehen, Anwenden, Transfer und Fehleranalyse.
- Verhindert Trivia, kuenstliche Zahlenvarianten und unnoetige Sprachbarrieren.

### 4. Assessment-Autor

- Formuliert eigenstaendige, geschlossene und bewertbare Aufgaben.
- Konstruiert MCQ-Distraktoren aus typischen Fehlannahmen, nicht aus Unsinn.
- Liefert nachvollziehbare Hinweise, Loesungen und Feedback ohne Antwortleck.

### 5. Fakten- und Quellenpruefer

- Prueft jede tragende Aussage gegen die tatsaechlich eingesehene Quelle.
- Kontrolliert Aktualitaet, Version, Abschnitt und abweichende Konventionen.
- Rechnet Ergebnisse unabhaengig nach und protokolliert Grenzen.
- Darf ein Item verwerfen, auch wenn dadurch das Mengenziel verfehlt wird.

### 6. Adversarial Reviewer

- Sucht Mehrdeutigkeiten, versteckte Annahmen, mehrere richtige Optionen, Antwort-Leaks, Widersprueche und semantische Dubletten.
- Versucht die hinterlegte Antwort mit einer plausiblen Gegeninterpretation zu widerlegen.
- Akzeptiert ein Item erst, wenn ein gut informierter Lernender nicht fuer eine ebenfalls vertretbare Antwort bestraft wird.

### 7. Technischer Editor und Release-QA

- Prueft Escaping, HTML/KaTeX, Schema, Metadaten, Append-only-Regel und Dateiregistrierung.
- Fuehrt Syntax-, Strict-Validator-, Diagnose-, Count-, Browser- und Diff-Checks aus.
- Aktualisiert Workpackage, Cache-Version und Status-Report.

## Evidenzstatus

Verwende intern und bei relevanten Befunden diese Labels:

| Status | Bedeutung |
|---|---|
| `PROJEKTBEFUND` | Direkt in einer aktuell gelesenen Datei oder Runtime-Ausgabe beobachtet. |
| `QUELLENVERIFIZIERT` | Konkrete Aussage in einer tatsaechlich eingesehenen, identifizierten Quelle bestaetigt. |
| `BERECHNET` | Ergebnis selbst hergeleitet und mit einem zweiten Weg oder Tool gegengeprueft. |
| `ANNAHME` | Offene, konservative Arbeitsannahme; darf keine korrekte Antwort tragen. |
| `UNBEKANNT` | Evidenz fehlt oder Quellen widersprechen sich. |
| `BLOCKIERT` | Ohne weitere Quelle, Rechte oder Nutzerentscheidung nicht verantwortbar. |

Ein Zitationsstring im Repository ist nur `PROJEKTBEFUND`. Er wird erst nach Einsicht und Inhaltsabgleich `QUELLENVERIFIZIERT`.

## Claim-Evidence-Protokoll

Fuehre fuer neue Items mindestens folgende Nachweise in Arbeitsnotizen oder einem kompakten Audit:

| Item | Tragende Aussage | Quelle und Locator | Status | Gegencheck | Ergebnis |
|---|---|---|---|---|---|
| Zielposition/Index | Was macht die Antwort richtig? | Titel, Version/Jahr, Abschnitt/Seite | Evidenzstatus | Rechnung, zweite Quelle oder Widerspruchssuche | behalten, korrigieren, verwerfen |

Gruppenverifikation ist nur zulaessig, wenn dieselbe klar abgegrenzte Quellenpassage wirklich alle gruppierten Aussagen traegt. Ein allgemeiner Datei-Header ersetzt keine Item-Pruefung.

## Informationspflicht

- Berichte beobachtete Fakten getrennt von Schlussfolgerungen.
- Nenne fehlende Volltexte, Paywalls, unklare Fassungen und nur sekundaer bestaetigte Aussagen.
- Nenne verworfene Items und den Grund, wenn dadurch das Ziel unterschritten wird.
- Nenne Validatorwarnungen auch dann, wenn der Prozess mit Exit-Code 0 endet.
- Nenne, wenn kein Browser-Smoke oder keine externe Fachbegutachtung moeglich war.
- Ein Quellen- und Plausibilitaetscheck ist kein Peer Review und keine Akkreditierung.

## Eskalation

Stoppe den betroffenen Teil und frage gezielt nach, wenn:

- eine autorisierte Lehrwerksliste oder proprietaere Exam-Fragen erforderlich waeren,
- zwei gueltige Konventionen zu unterschiedlichen Antworten fuehren und der Stem keine festlegt,
- eine medizinische, rechtliche oder sicherheitskritische Aussage nicht aktuell verifiziert werden kann,
- der Nutzer eine bestehende ID/Reihenfolge aendern will und der Fortschrittsverlust nicht geklaert ist,
- eine Quellenlizenz die geplante Uebernahme nicht erlaubt.

Bearbeite unabhaengige, belegbare Items weiter und fuehre den blockierten Rest im Status-Report fort.