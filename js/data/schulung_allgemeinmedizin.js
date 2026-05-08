/*
 * Smartineer Schulungen — Allgemeinmedizin / Medizinstudium (Vorbereitung)
 *
 * Quelle dieser Erstbefuellung: docs/Allgemienmedizin.html (vom Auftraggeber
 * geliefert) sowie docs/Medizinstudium Selbststudium Lehrplan Erstellung.docx
 * (Zusammenfassung in derselben HTML-Datei abgebildet).
 *
 * Status: 'preparation' — die Inhalte sind als Erstbefuellung eingespielt, der
 * Quiz-Pool ist jedoch deutlich kleiner als der in AGENTS.md Sect. 18.4
 * geforderte Soll-Wert von >= 50 Fragen pro Kapitel. Solange das nicht
 * erreicht ist, bleibt der Vorbereitungs-Status erhalten.
 *
 * Konventionen:
 *   - Sprache: Deutsch, sachlich, keine Emojis.
 *   - Pages-HTML: nur die in AGENTS.md Sect. 18.6 erlaubten Elemente.
 *   - Quiz: 5 Antwortoptionen (IMPP-Stil) — siehe AGENTS.md Sect. 18.4 Abweichung.
 *
 * Quellen-Anker fuer die Erstbefuellung:
 *   - DEGAM-S3-Leitlinie "Nicht-spezifischer Kreuzschmerz" (AWMF Reg. nvl-007).
 *   - DEGAM-/AWMF-S3-Leitlinie "Akuter und chronischer Husten".
 *   - ESC Guidelines for the diagnosis and treatment of acute and chronic
 *     heart failure (2021/2023 Focused Update).
 *   - PRISCUS-2.0-Liste (2023) und STOPP/START-Kriterien Version 3 (2023).
 *   - AWMF-S3-Leitlinie Lyme-Borreliose (Reg. 013-080).
 *   - AeApprO 2002 i.d.F. der Aktualisierungen 2012/2024 (Lehrplan-Struktur).
 *   - BGB Sect. 1827 (Patientenverfuegung) i.d.F. seit 01.01.2023.
 *
 * Sobald die vom Auftraggeber angekuendigte erweiterte Recherche-Datei
 * vorliegt: Lehrseiten ausbauen, Quiz-Pool je Kapitel auf >= 50 Fragen
 * vergroessern, status: 'preparation' entfernen, CACHE_VERSION bumpen.
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    // ---------------- Lehrseiten ----------------

    const PAGE_PRINZIPIEN = {
        title: 'Wissenschaftliche Prinzipien der Allgemeinmedizin',
        html: ''
            + '<p>Die Allgemeinmedizin ist die Disziplin der Primaerversorgung. Sie unterscheidet sich von hochspezialisierter Klinik weniger durch das Faktenwissen als durch ihren <strong>Denkrahmen</strong>: Symptome werden im Kontext von Lebenswelt, Familie und psychosozialer Situation des Patienten interpretiert (bio-psycho-soziales Modell). Wer das Studium auf Selbststudium umstellt, sollte diese drei Saeulen frueh verinnerlichen, weil sie spaeter sowohl die M2-Pruefung als auch die fachaerztliche Weiterbildung pruefungsrelevant durchziehen.</p>'
            + '<h4>Hermeneutisches Fallverstaendnis</h4>'
            + '<p>Symptome werden nicht isoliert betrachtet. Ein chronischer Rueckenschmerz bei einer alleinerziehenden Mutter mit Pflegefall in der Familie hat eine andere Bedeutung als derselbe Schmerz bei einem leistungssportlich aktiven Patienten. Die hausaerztliche Anamnese fragt deshalb explizit nach Lebenskontext, Arbeitsbelastung, sozialer Unterstuetzung. Das ist keine Esoterik, sondern Voraussetzung dafuer, Therapietreue und Outcome richtig einzuschaetzen.</p>'
            + '<h4>Abwendbar gefaehrliche Verlaeufe (AGV)</h4>'
            + '<p>Die primaere Aufgabe bei unklaren Symptomen ist nicht immer die exakte Diagnose, sondern der sichere Ausschluss lebensbedrohlicher Ursachen. Beispiel Brustschmerz: Vor einer Reflux-Diagnose muessen akutes Koronarsyndrom, Lungenembolie und Aortendissektion ausgeschlossen werden. Dazu existieren standardisierte <em>Red-Flag-Listen</em> in den DEGAM-Leitlinien, die der Hausarzt aktiv abfragen muss.</p>'
            + '<h4>Wait-and-See / abwartendes Offenlassen</h4>'
            + '<p>Bei selbstlimitierenden Erkrankungen (akute Bronchitis, unspezifischer Kreuzschmerz, leichte Gastroenteritis) ist die evidenzbasierte Strategie haeufig <em>Aufklaerung plus zeitlich begrenzte Re-Evaluation</em>, nicht sofortige Diagnostik oder Therapie. Diese Strategie verhindert Ueberdiagnostik (quartaere Praevention) und Medikalisierung. Pruefungsrelevant: <em>Delayed Prescription</em> (Rezept fuer den Bedarfsfall) ist in S3-Leitlinien als Mittel gegen unnoetige Antibiotikagabe explizit empfohlen.</p>'
            + '<h4>Epidemiologie als Lernpriorisierung</h4>'
            + '<p>In der Hausarztpraxis dominieren wenige Beratungsanlaesse: Husten, Rueckenschmerz, Hypertonie-Kontrolle, Muedigkeit, Bauchschmerz, Kopfschmerz, depressive Verstimmung, Diabetes-Verlaufskontrolle und Impfung. Diese Liste deckt rund zwei Drittel aller Konsultationen ab. Wer effizient lernen will, gewichtet die Vorbereitung entsprechend — nicht nach Lehrbuch-Seitenzahl, sondern nach realer Praevalenz.</p>'
    };

    const PAGE_VORKLINIK = {
        title: 'Vorklinik (Semester 1-4): Basiswissen des Lebens',
        html: ''
            + '<p>Die Vorklinik schliesst mit dem ersten Abschnitt der Aerztlichen Pruefung (M1) ab und legt das Fundament fuer alles Klinische. Im Selbststudium gilt: nicht Lehrbuch-Kapitel chronologisch durcharbeiten, sondern Themen mit hoher Klinik-Relevanz priorisieren. Die folgende Uebersicht orientiert sich an der Approbationsordnung fuer Aerzte (AeApprO) und an den IMPP-Gegenstandskatalogen.</p>'
            + '<h4>Anatomie und Histologie</h4>'
            + '<ul>'
            + '<li><strong>Makroskopische Anatomie:</strong> Bewegungsapparat, Situs, Neuroanatomie. Klinischer Bezug: Lokalisation von Schmerzen (Appendizitis vs. Adnexitis), Verstaendnis von Gelenkverschleiss, Nervenlaesionen nach Operationen (Recurrensparese nach Thyreoidektomie).</li>'
            + '<li><strong>Mikroskopische Anatomie:</strong> Gewebelehre. Beispiel respiratorisches Flimmerepithel — relevant fuer das Verstaendnis der chronischen Bronchitis und der COPD-Pathogenese.</li>'
            + '<li><strong>Topographische Beziehungen:</strong> chirurgisch und allgemeinmedizinisch unverzichtbar (z. B. Verlauf des N. laryngeus recurrens entlang der Schilddruese im Sulcus tracheoesophageus).</li>'
            + '</ul>'
            + '<h4>Physiologie und Biochemie</h4>'
            + '<ul>'
            + '<li><strong>Vegetatives Nervensystem:</strong> Sympathikus vs. Parasympathikus. Wirkmechanismus von Betablockern, Anticholinergika und Sympathomimetika.</li>'
            + '<li><strong>Metabolismus:</strong> Glykolyse, Citratzyklus, Fettstoffwechsel. Pathophysiologische Anker fuer Diabetes mellitus Typ 2, Ketoazidose und den Wirkort der Statine.</li>'
            + '<li><strong>Saeure-Basen-Haushalt:</strong> Bohr-Effekt, 2,3-Bisphosphoglycerat (2,3-BPG) und Anpassung an Hypoxie (z. B. Hoehenaufenthalt). 2,3-BPG-Erhoehung verschiebt die Sauerstoffbindungskurve nach rechts und erleichtert die O2-Abgabe ans Gewebe.</li>'
            + '<li><strong>Purinabbau:</strong> Hypoxanthin -> Xanthin -> Harnsaeure ueber die Xanthinoxidase. Klinischer Bezug: Allopurinol als kompetitiver Inhibitor (Suizid-Inhibition durch Oxypurinol) ist Therapie der Wahl bei Hyperurikaemie und Gicht-Prophylaxe.</li>'
            + '</ul>'
            + '<h4>Lernstrategie fuer das M1</h4>'
            + '<p>IMPP-Fragen sind ueberwiegend Verknuepfungs-Fragen: ein vorklinisches Konzept (z. B. Enzym, Ionenkanal, anatomische Beziehung) wird in einen klinischen Kontext eingebettet. Effiziente Vorbereitung uebt diese Verknuepfung aktiv ein, statt reine Faktenlisten auswendig zu lernen. Konkrete Hilfsmittel: Altfragen-Cluster nach Themen, Karteikarten mit gepaarten Begriffen (Anatomisch / klinisches Korrelat) und Pruefungs-Simulation unter Zeitdruck.</p>'
    };

    const PAGE_KLINIK = {
        title: 'Klinischer Studienabschnitt (Semester 5-10): Pathologie und Therapie',
        html: ''
            + '<p>Der klinische Abschnitt verschiebt den Fokus von der Funktion zur Krankheit. Statt isolierter Faktenfragen pruefen M2 (Hammerexamen) und Facharztpruefungen <em>klinisches Reasoning</em>: aus Anamnese, Befund und Labor zur richtigen Diagnose und Therapie. Drei Saeulen sind dabei zentral.</p>'
            + '<h4>Innere Medizin</h4>'
            + '<ul>'
            + '<li><strong>Kardiologie:</strong> KHK, Herzinsuffizienz mit reduzierter Ejektionsfraktion (HFrEF, LVEF <= 40 Prozent), Vorhofflimmern. Aktuelle ESC-Leitlinien definieren die prognoseverbessernde Basistherapie der HFrEF als <em>Fantastic Four</em>: RAAS-Inhibition (ARNI oder ACE-Hemmer), Betablocker, Mineralokortikoid-Rezeptorantagonist (MRA), SGLT2-Inhibitor.</li>'
            + '<li><strong>Pulmologie:</strong> Asthma (GINA-Stufentherapie), COPD (GOLD-Klassifikation), Lungenembolie (Wells-Score, D-Dimer-Strategie).</li>'
            + '<li><strong>Endokrinologie:</strong> Diabetes mellitus Typ 2 (Stufen-Therapie nach NVL), Schilddruesenfunktionsstoerungen, Nebennieren-Achse.</li>'
            + '<li><strong>Infektiologie:</strong> Antibiotic Stewardship, Pneumonie-Algorithmus (CRB-65), Lyme-Borreliose-Stadien (Erythema migrans als Blickdiagnose).</li>'
            + '</ul>'
            + '<h4>Pharmakologie</h4>'
            + '<p>Die LADME-Pharmakokinetik (Liberation, Absorption, Distribution, Metabolismus, Elimination) und das Cytochrom-P450-System sind das Rueckgrat aller Interaktions-Fragen. Pruefungsklassiker: Apixaban (DOAK) wird ueber CYP3A4 und P-Glykoprotein metabolisiert; gleichzeitige Gabe starker CYP3A4-/P-gp-Inhibitoren wie Makrolide, Azol-Antimykotika oder Fluorchinolone (Ciprofloxacin) treibt den Plasmaspiegel toxisch hoch und provoziert Blutungen.</p>'
            + '<p>Im Alter relevant: Die <strong>PRISCUS-2.0-Liste</strong> (2023) und die <strong>STOPP/START-Kriterien Version 3</strong> (2023) listen potenziell inadaequate Medikation. Trizyklische Antidepressiva (z. B. Amitriptylin) sind wegen anticholinerger und alpha-1-adrenolytischer Wirkungen (Sturzgefahr, Harnverhalt, Delir) bei aelteren Patienten zu vermeiden.</p>'
            + '<h4>Psychosomatik und Psychiatrie</h4>'
            + '<p>Diagnostik nach ICD-10 / ICD-11 und DSM-5. Praxisrelevante Themen sind Depression (PHQ-9-Screening), Angststoerungen, Somatisierungsstoerungen und Suizidalitaets-Einschaetzung. Gespraechsfuehrung nach <em>Shared Decision Making</em> ist nicht nur ethisch geboten, sondern messbar mit besserer Adhaerenz und Outcome assoziiert.</p>'
            + '<h4>Pruefungsstil M2</h4>'
            + '<p>Fallvignette + Frage. Erwartete Kompetenz: Diagnose erkennen, Differenzialdiagnose ausschliessen, evidenzbasierte Therapie auswaehlen, Kontraindikationen identifizieren. Wer sich auf reine Faktenwiederholung verlaesst, scheitert. Empfehlung: Lerngruppen-Fallbesprechungen, Altfragen mit Erklaerungs-Karten, gezieltes Lesen aktueller Leitlinien.</p>'
    };

    const PAGE_PJ_FACHARZT = {
        title: 'PJ und Facharzt fuer Allgemeinmedizin',
        html: ''
            + '<p>Im Praktischen Jahr (PJ) wird das Wissen am Patienten unter Supervision angewendet — Vorbereitung auf das mundlich-praktische M3 und die fuenfjaehrige Weiterbildung zum Facharzt fuer Allgemeinmedizin. Die hausaerztliche Praxis verlangt dabei Kompetenzen, die im Studium oft unterbelichtet bleiben.</p>'
            + '<h4>Multimorbiditaet und Polypharmazie</h4>'
            + '<p>Patienten mit drei oder mehr chronischen Erkrankungen sind in der hausaerztlichen Versorgung Standard. Polypharmazie (>= 5 Dauermedikamente) erhoeht das Interaktions- und Sturzrisiko. Werkzeuge: PRISCUS-2.0-Liste (2023), STOPP/START-Version-3-Kriterien (2023), Medication-Review-Checklisten, FORTA-Klassifikation. Ziel ist <em>Deprescribing</em> ohne therapeutische Unterversorgung.</p>'
            + '<h4>Praevention und Screening</h4>'
            + '<ul>'
            + '<li><strong>Check-up 35:</strong> alle drei Jahre. Standardlabor, Blutdruck, ggf. Hepatitis-B/C-Screening (einmalig).</li>'
            + '<li><strong>Hautkrebs-Screening:</strong> ab 35 alle zwei Jahre.</li>'
            + '<li><strong>Krebs-Frueherkennungs-Richtlinie</strong> des G-BA: Mammographie-Screening 50-69 (Erweiterung auf 45-74 in Diskussion), Zervix-Karzinom (Pap-Test/HPV-Co-Testing), Darmkrebs (iFOBT, Koloskopie).</li>'
            + '<li><strong>STIKO-Empfehlungen:</strong> jaehrlich aktualisiert, Stand 2024 mit Erweiterung der Pertussis-Auffrischung und neuen RSV-Impfempfehlungen fuer Aeltere.</li>'
            + '</ul>'
            + '<h4>Geriatrie und Palliativmedizin</h4>'
            + '<p>Frailty-Syndrom (Gebrechlichkeit, Frailty-Index nach Fried), Demenzdiagnostik (MMST, MoCA, DemTect), Sturzrisiko-Assessment, Begleitung am Lebensende (AAPV/SAPV). Patientenverfuegung gemaess BGB Sect. 1827 ist fuer den behandelnden Arzt bindend, sofern sie auf die aktuelle Lebens- und Behandlungssituation zutrifft. Ein gerichtlich bestellter Betreuer hat die Aufgabe, dem Patientenwillen Geltung zu verschaffen, nicht ihn zu ueberschreiben.</p>'
            + '<h4>Schnittstellenmanagement</h4>'
            + '<p>Der Hausarzt ist Lotse im Gesundheitssystem: Indikationsstellung fuer fachaerztliche Ueberweisung oder Krankenhauseinweisung, Entlassmanagement, Reha-Antraege, Rezept-Pflege ueber Sektorengrenzen hinweg. Pruefungsrelevant sind Indikationskriterien fuer stationaere Einweisung (z. B. CRB-65 bei Pneumonie, hsTnT bei Verdacht auf akutes Koronarsyndrom) und der korrekte Umgang mit Rettungskette und Notarzt-Indikation.</p>'
    };

    const PAGE_LEITLINIEN = {
        title: 'Evidenzbasierte Medizin: DEGAM-Leitlinien im Praxisalltag',
        html: ''
            + '<p>Leitlinien sind die wissenschaftliche Handlungsgrundlage des Hausarztes. Pruefungsfragen orientieren sich seit Jahren an aktuellen S3-Leitlinien der DEGAM und der AWMF. Die folgenden zwei Beispiele zeigen das Muster: <em>Was muss man ausschliessen, was darf man getrost abwarten</em>.</p>'
            + '<h4>S3-Leitlinie nicht-spezifischer Kreuzschmerz (NVL)</h4>'
            + '<p>Kreuzschmerzen sind einer der haeufigsten hausaerztlichen Beratungsanlaesse. Etwa 85 Prozent der Faelle sind nicht-spezifisch — keine strukturelle Ursache (Fraktur, Bandscheibenvorfall, Tumor, Infekt) nachweisbar.</p>'
            + '<p><strong>Red Flags (sofortige Abklaerung):</strong></p>'
            + '<ul>'
            + '<li>Trauma in der Anamnese (Frakturverdacht)</li>'
            + '<li>Unerklaerlicher Gewichtsverlust oder Tumoranamnese (Metastasen)</li>'
            + '<li>Fieber, i.v.-Drogenkonsum, Immunsuppression (Spondylodiszitis)</li>'
            + '<li>Neurologische Ausfaelle, Reithosen-Anaesthesie, Sphinkterstoerung (Cauda-equina-Syndrom: Notfall)</li>'
            + '</ul>'
            + '<p><strong>Therapie ohne Red Flags:</strong> Aufklaerung mit guter Prognose, keine Bettruhe, Bewegungserhalt foerdern, zeitlich limitierte Analgesie (z. B. Ibuprofen). <em>Nicht</em> indiziert ist Bildgebung (Roentgen, MRT) in den ersten vier bis sechs Wochen ohne Red Flags — sie foerdert Ueberdiagnostik und Chronifizierung (Nocebo-Effekt durch Zufallsbefunde).</p>'
            + '<h4>S3-Leitlinie akuter und chronischer Husten</h4>'
            + '<p>Klassifikation nach Dauer: akut (< 2 Wochen), subakut (2-8 Wochen), chronisch (> 8 Wochen). Pruefungsrelevant ist die strukturierte Suche nach abwendbar gefaehrlichen Verlaeufen.</p>'
            + '<p><strong>Abwendbar gefaehrliche Verlaeufe:</strong></p>'
            + '<ul>'
            + '<li>Pneumonie (Tachypnoe > 20/min, Fieber, Rasselgeraeusche; CRB-65-Score)</li>'
            + '<li>Lungenembolie (akute Dyspnoe, Thoraxschmerz; Wells-Score, D-Dimere)</li>'
            + '<li>Malignom (Haemoptysen, B-Symptomatik, Risikofaktor Rauchen)</li>'
            + '<li>Herzinsuffizienz (Beinoedeme, Nykturie, Orthopnoe)</li>'
            + '</ul>'
            + '<p><strong>Cave Antibiotika:</strong> Akute Bronchitiden sind zu rund 90 Prozent viral. Antibiotika verkuerzen die Krankheitsdauer im Mittel um etwa einen halben Tag, foerdern aber Resistenzen und Nebenwirkungen. Empfohlene Strategie: <em>Delayed Prescription</em> — Rezept fuer den Bedarfsfall, einloesbar bei verzoegertem Verlauf.</p>'
            + '<h4>Lyme-Borreliose: Erythema migrans</h4>'
            + '<p>Das ringfoermige, schmerzlose Erythem mit zentraler Abblassung nach Zeckenstich ist <em>pathognomonisch</em> fuer das Stadium I einer Lyme-Borreliose. Es ist eine Blickdiagnose. Die Serologie ist im Frueh-Stadium oft falsch-negativ (diagnostische Luecke). DEGAM- und AWMF-S3-Leitlinie (Reg. 013-080) fordern den sofortigen Therapie-Start mit Doxycyclin (200 mg pro Tag fuer 14 Tage bei Erwachsenen, keine Schwangerschaft, kein Kind unter 9 Jahren) ohne vorherige Labordiagnostik.</p>'
    };

    // Platzhalterseiten fuer noch nicht ausgearbeitete Schwerpunkte. Werden
    // ersetzt, sobald die erweiterte Recherche-Datei vorliegt.
    function placeholderPage(title, scope) {
        return {
            title: title,
            html: ''
                + '<p><strong>In Vorbereitung.</strong> Diese Lehrseite wird befuellt, sobald die'
                + ' erweiterte Recherche-Datei vorliegt. Geplanter Inhalt:</p>'
                + '<ul>' + scope.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>'
        };
    }

    // ---------------- Quiz-Pool ----------------
    // Quelle: docs/Allgemienmedizin.html (vom Auftraggeber geliefert),
    // didaktische Erlaeuterungen leicht in die Smartineer-Konventionen
    // ueberfuehrt. 5 Optionen pro Frage (IMPP-Stil).

    const QUIZ_M1 = [
        q(
            'Ein gesunder 25-jaehriger Medizinstudent steigt schnell auf eine Hoehe von 3.000 Metern auf. Wie veraendert sich die Affinitaet des Haemoglobins zu Sauerstoff in den folgenden Tagen physiologisch, und welcher Mediator ist primaer dafuer verantwortlich?',
            [
                'Die Affinitaet steigt durch eine Erhoehung der 2,3-Bisphosphoglycerat-Konzentration.',
                'Die Affinitaet sinkt durch eine Erhoehung der 2,3-Bisphosphoglycerat-Konzentration.',
                'Die Affinitaet sinkt durch eine Reduktion des Blut-pH-Wertes (Bohr-Effekt).',
                'Die Affinitaet steigt durch vermehrte Bildung von fetalem Haemoglobin (HbF).',
                'Die Affinitaet bleibt unveraendert, lediglich das Atemminutenvolumen steigt.'
            ],
            1,
            'Auf Hoehe (Hypoxie) wird ueber einen Bypass in der Glykolyse vermehrt 2,3-BPG gebildet. 2,3-BPG stabilisiert die T-Form des Haemoglobins, dadurch <em>sinkt</em> die Sauerstoffaffinitaet (Rechtsverschiebung der O2-Bindungskurve), die O2-Abgabe ans Gewebe wird erleichtert.'
        ),
        q(
            'Ein Patient stellt sich mit anfallsartigen Schmerzen im Grosszehengrundgelenk (Podagra) und Hyperurikaemie vor. Zur Langzeittherapie verordnen Sie Allopurinol. Welches Enzym wird inhibiert?',
            [
                'Hypoxanthin-Guanin-Phosphoribosyltransferase (HGPRT)',
                'Adenosin-Desaminase (ADA)',
                'Xanthinoxidase (XO)',
                'Ribonukleotid-Reduktase',
                'Urat-Oxidase (Urikase)'
            ],
            2,
            'Allopurinol ist ein Hypoxanthin-Strukturanalogon und hemmt die Xanthinoxidase (kompetitiv; nach Umwandlung zu Oxypurinol als Suizid-Inhibitor). Folge: weniger Harnsaeure, vermehrte Ausscheidung der besser loeslichen Vorstufen Hypoxanthin und Xanthin. HGPRT ist bei Lesch-Nyhan-Syndrom defekt; Urikase besitzt der Mensch evolutionaer nicht mehr.'
        ),
        q(
            'Nach Thyreoidektomie klagt der Patient ueber Heiserkeit. Welcher Nerv wurde am ehesten verletzt und welchen Muskel — den einzigen Oeffner der Stimmritze — innerviert er?',
            [
                'N. laryngeus superior; M. cricothyroideus',
                'N. laryngeus recurrens; M. cricoarytenoideus posterior (Posticus)',
                'N. vagus (Hauptstamm); M. arytenoideus transversus',
                'N. laryngeus recurrens; M. vocalis',
                'N. glossopharyngeus; M. stylopharyngeus'
            ],
            1,
            'Der N. laryngeus recurrens verlaeuft im Sulcus tracheoesophageus und ist bei Schilddruesen-OPs gefaehrdet (Recurrensparese). Er innerviert alle inneren Kehlkopfmuskeln ausser dem M. cricothyroideus. Der M. cricoarytenoideus posterior (Posticus) ist der einzige Oeffner der Stimmritze.'
        )
    ];

    const QUIZ_M2 = [
        q(
            'Ein 68-jaehriger Patient mit Diabetes mellitus Typ 2 und Hypertonie zeigt eine LVEF von 35 Prozent. Welche Kombination bildet die evidenzbasierte, prognoseverbessernde Basistherapie der HFrEF nach aktuellen ESC-Leitlinien?',
            [
                'ACE-Hemmer (oder ARNI), Beta-Blocker, SGLT2-Inhibitor, Mineralokortikoid-Rezeptorantagonist',
                'Calciumkanalblocker (Verapamil-Typ), Thiazid-Diuretikum, ASS, Statin',
                'Amiodaron, Digoxin, Schleifendiuretikum',
                'AT1-Blocker, Nitrate, Schleifendiuretikum, ASS',
                'Beta-Blocker, Calciumkanalblocker (Amlodipin-Typ), SGLT2-Inhibitor'
            ],
            0,
            'Die <em>Fantastic Four</em> der HFrEF-Therapie (LVEF <= 40 Prozent): RAAS-Inhibition (ARNI bevorzugt, alternativ ACE-Hemmer), Beta-Blocker (z. B. Bisoprolol, Metoprololsuccinat), Mineralokortikoid-Rezeptorantagonist (Spironolacton, Eplerenon), SGLT2-Inhibitor (Dapagliflozin, Empagliflozin). Verapamil/Diltiazem sind bei HFrEF kontraindiziert; Schleifendiuretika lindern Stauung, verbessern aber die Prognose nicht signifikant.'
        ),
        q(
            'Eine 75-jaehrige Patientin unter Apixaban (DOAK) erhaelt ambulant Ciprofloxacin gegen einen Harnwegsinfekt und kommt einige Tage spaeter mit gastrointestinaler Blutung. Welcher Mechanismus erklaert die Komplikation am wahrscheinlichsten?',
            [
                'Ciprofloxacin induziert CYP3A4, was Apixaban beschleunigt abbaut.',
                'Ciprofloxacin hemmt CYP3A4 und P-Glykoprotein, der Apixaban-Plasmaspiegel steigt toxisch an.',
                'Apixaban verdraengt Ciprofloxacin aus der Plasmaproteinbindung.',
                'Ciprofloxacin verursacht direkt Magen-Ulzera (wie NSAR).',
                'Beide Wirkstoffe werden kompetitiv renal sezerniert und kumulieren wechselseitig.'
            ],
            1,
            'Apixaban (und Rivaroxaban) wird ueber CYP3A4 metabolisiert und ueber P-Glykoprotein (P-gp) ausgeschleust. Fluorchinolone, Makrolide und Azol-Antimykotika hemmen beides — der Apixaban-Spiegel steigt toxisch, Blutungsrisiko explodiert. Klassische Pruefungs- und Praxisinteraktion.'
        ),
        q(
            'Ein 45-jaehriger Foerster zeigt nach Zeckenstich vor zwei Wochen ein ringfoermiges, schmerzloses Erythem mit zentraler Abblassung am Unterschenkel (8 cm). Was ist der korrekte naechste Schritt?',
            [
                'Sofortige Borrelien-Serologie (IgM/IgG); Therapie nur bei positivem Befund.',
                'Hautbiopsie vom Erythem-Rand zur PCR.',
                'Sofortige antibiotische Therapie mit Doxycyclin (200 mg/d, 14 Tage) ohne Labordiagnostik.',
                'Ceftriaxon i.v. wegen lebensbedrohlicher Neuroborreliose.',
                'Wait-and-See, da es sich um eine allergische Lokalreaktion auf Zeckenspeichel handelt.'
            ],
            2,
            'Das beschriebene Bild ist ein Erythema migrans — pathognomonisch fuer Stadium I der Lyme-Borreliose und eine Blickdiagnose. Die Serologie ist im Frueh-Stadium oft falsch-negativ (diagnostische Luecke). DEGAM-/AWMF-S3-Leitlinie (Reg. 013-080) fordert sofortigen Therapiestart mit Doxycyclin, ohne Antikoerperbestimmung abzuwarten. Eine allergische Reaktion auf Zeckenspeichel tritt unmittelbar auf und wandert nicht.'
        )
    ];

    const QUIZ_FA = [
        q(
            'Ein 82-jaehriger, kognitiv intakter Patient nimmt Ramipril, Amlodipin, Metformin, Amitriptylin, Ibuprofen (b. B.) und Pantoprazol. Er klagt ueber Schwindel beim Aufstehen, Mundtrockenheit und beginnenden Harnverhalt. Welches Medikament ist im Sinne der PRISCUS-Liste / STOPP-Kriterien am ehesten verantwortlich?',
            [
                'Ramipril',
                'Amlodipin',
                'Metformin',
                'Amitriptylin',
                'Pantoprazol'
            ],
            3,
            'Amitriptylin (trizyklisches Antidepressivum) hat starke anticholinerge Wirkung (Mundtrockenheit, Obstipation, Harnverhalt, Tachykardie, Delir-Risiko) und wirkt alpha-1-adrenolytisch (orthostatische Hypotonie, Sturzgefahr). PRISCUS-2.0-Liste (2023) und STOPP-Kriterien V3 (2023) fuehren es als potenziell inadaequate Medikation im Alter — Ersatz durch SSRI/SNRI oder bei Schmerzen Alternativen.'
        ),
        q(
            'Eine 55-jaehrige asymptomatische Patientin zeigt im Check-up: TSH 6.5 mU/l (Norm 0.4-4.0), fT3 und fT4 normwertig, kein Struma. Korrektes Vorgehen nach DEGAM-Leitlinie?',
            [
                'Sofort L-Thyroxin 50 ug/d.',
                'Manifeste Hypothyreose, Radiojodtherapie einleiten.',
                'Latente (subklinische) Hypothyreose; Laborkontrolle in 2-3 Monaten, in der Regel keine sofortige Therapie bei Asymptomatik.',
                'Schilddruesen-Szintigraphie zum Ausschluss eines autonomen Adenoms.',
                'Feinnadelpunktion wegen erhoehten Malignomrisikos.'
            ],
            2,
            'Isolierte TSH-Erhoehung bei normalen peripheren Werten = latente Hypothyreose. DEGAM-/AWMF-Leitlinie: bei Asymptomatik (insbesondere > 50 Jahre) und TSH < 10 mU/l keine sofortige Therapie; Laborkontrolle nach 2-3 Monaten, da TSH transient (z. B. nach Infekten) schwankt. Uebertherapie erhoeht Risiko fuer Vorhofflimmern und Osteoporose.'
        ),
        q(
            'Ein 88-jaehriger Patient mit fortgeschrittener Demenz lehnt in einer rechtsgueltigen Patientenverfuegung von vor fuenf Jahren kuenstliche Ernaehrung ab. Die gerichtlich bestellte Tochter (Betreuerin) fordert eine PEG-Anlage. Wie handeln Sie korrekt?',
            [
                'Die Betreuerin entscheidet, Sie weisen ein.',
                'Sie lehnen die Einweisung ab, weil die gueltige Patientenverfuegung bindet.',
                'Sie geben den Fall an das Vormundschaftsgericht ab, da Sie sich nicht ueber die Betreuerin hinwegsetzen duerfen.',
                'Sie legen akut eine Magensonde, um vitale Gefaehrdung abzuwenden.',
                'Sie weisen die Tochter darauf hin, dass Patientenverfuegungen nach 3 Jahren ungueltig werden.'
            ],
            1,
            'BGB Sect. 1827 (vormals Sect. 1901a): eine wirksame Patientenverfuegung, die auf die aktuelle Behandlungssituation zutrifft, ist fuer den behandelnden Arzt bindend. Aufgabe des Betreuers ist es, dem Patientenwillen Geltung zu verschaffen, nicht ihn zu uebersteuern. Patientenverfuegungen verlieren ihre Gueltigkeit nicht automatisch nach Ablauf einer Frist.'
        )
    ];

    // Erweiterungs-Pool (Platzhalter), bis die volle Recherche-Datei vorliegt.
    function quizPlaceholder(label) {
        return q(
            'Inhaltliche Erweiterung fuer "' + label + '": welche Aussage trifft zu?',
            [
                'Der Quiz-Pool wird erweitert, sobald die Recherche-Datei vorliegt.',
                'Die Schulung ist bereits vollstaendig.',
                'Es sind keine weiteren Inhalte geplant.',
                'Die Schulung wurde verworfen.',
                'Diese Frage ist eine echte Pruefungsfrage.'
            ],
            0,
            'Platzhalter — wird durch quellenbasierte Pruefungsfragen ersetzt, sobald die erweiterte Recherche-Datei vorliegt.'
        );
    }

    // ---------------- Schulung registrieren ----------------

    window.SCHULUNGEN.list.push({
        id: 'allgemeinmedizin',
        code: 'Med-AM',
        name: 'Allgemeinmedizin & Medizinstudium',
        short: 'Allgemeinmedizin',
        desc: 'Selbststudium-orientierter Lernpfad entlang der AeApprO: Vorklinik (M1), klinischer Abschnitt (M2) und PJ/Facharzt-Weiterbildung Allgemeinmedizin. Erstbefuellung aus mitgelieferter Quelle; Quiz-Pool wird auf Soll-Mindestmass ergaenzt, sobald die erweiterte Recherche-Datei vorliegt.',
        status: 'preparation',
        chapters: [
            {
                id: 'vorklinik_m1',
                title: 'Kapitel 1 — Vorklinik (M1): Basiswissen des Lebens',
                summary: 'Anatomie, Physiologie, Biochemie als Fundament. Schwerpunkte: vegetative Steuerung, Stoffwechsel, klinische Anker (Hypoxie/2,3-BPG, Purinabbau/Allopurinol, Larynx-Innervation).',
                pages: [
                    PAGE_PRINZIPIEN,
                    PAGE_VORKLINIK,
                    placeholderPage('Vertiefung Histologie und Embryologie', [
                        'Gewebearten und ihre klinische Relevanz',
                        'Embryologische Fehlbildungen mit hausaerztlicher Bedeutung',
                        'Mikroskopische Anatomie der Niere (Glomerulum, Tubulus) im Hinblick auf Diuretika-Wirkorte',
                        'Knochen-/Knorpelhistologie bezogen auf Arthrose und Osteoporose'
                    ])
                ],
                quiz: QUIZ_M1.concat([
                    quizPlaceholder('M1 Erweiterung Saeure-Basen-Haushalt'),
                    quizPlaceholder('M1 Erweiterung Neuroanatomie')
                ])
            },
            {
                id: 'klinik_m2',
                title: 'Kapitel 2 — Klinik (M2): Pathophysiologie und Therapie',
                summary: 'Innere Medizin (HFrEF Fantastic Four, COPD, Diabetes), Pharmakologie (CYP/P-gp-Interaktionen, PRISCUS), Infektiologie (Lyme, Pneumonie), Psychosomatik.',
                pages: [
                    PAGE_KLINIK,
                    PAGE_LEITLINIEN,
                    placeholderPage('Vertiefung Innere Medizin und Pharmakologie', [
                        'EKG-Befundung systematisch',
                        'NVL Diabetes mellitus Typ 2 Stufentherapie',
                        'Antibiotic Stewardship in der Praxis',
                        'Antikoagulation bei Vorhofflimmern (CHA2DS2-VASc, HAS-BLED)'
                    ])
                ],
                quiz: QUIZ_M2.concat([
                    quizPlaceholder('M2 Erweiterung Kardiologie'),
                    quizPlaceholder('M2 Erweiterung Pneumologie')
                ])
            },
            {
                id: 'pj_facharzt',
                title: 'Kapitel 3 — PJ und Facharzt Allgemeinmedizin',
                summary: 'Multimorbiditaet, Polypharmazie (PRISCUS 2.0, STOPP/START V3), Praevention (Check-up 35, STIKO), Geriatrie/Palliativ, juristische Grundlagen (BGB Sect. 1827).',
                pages: [
                    PAGE_PJ_FACHARZT,
                    placeholderPage('Vertiefung Geriatrie und Palliativmedizin', [
                        'Frailty-Index nach Fried in der Praxis',
                        'Demenzdiagnostik (MMST, MoCA, DemTect) im Vergleich',
                        'AAPV/SAPV: Indikationen und Abrechnung',
                        'Symptomkontrolle am Lebensende (Schmerz, Dyspnoe, Unruhe)'
                    ]),
                    placeholderPage('Vertiefung Recht, Ethik und Schnittstellen', [
                        'BGB Sect. 1827 Patientenverfuegung im Detail',
                        'Schweigepflicht und ihre Grenzen',
                        'AU-Bescheinigung, Heilmittel-/Hilfsmittel-Verordnung',
                        'Rettungskette und Notarzt-Indikationen'
                    ])
                ],
                quiz: QUIZ_FA.concat([
                    quizPlaceholder('Facharzt Erweiterung Polypharmazie'),
                    quizPlaceholder('Facharzt Erweiterung Praevention')
                ])
            }
        ]
    });
})();
