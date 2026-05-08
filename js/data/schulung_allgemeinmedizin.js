/*
 * Smartineer Schulungen — Allgemeinmedizin / Medizinstudium
 *
 * Vorlesungsbegleitende Selbststudium-Schulung entlang der Approbationsordnung
 * für Ärzte (ÄApprO) mit Schwerpunkt auf hausärztlicher Primärversorgung.
 *
 * Aufbau: 3 Kapitel
 *   Kapitel 1 — Vorklinik (M1): Anatomie, Physiologie, Biochemie
 *   Kapitel 2 — Klinik (M2):     Innere Medizin, Pharmakologie, Infektiologie
 *   Kapitel 3 — PJ & Facharzt:   Hausärztliche Praxis, Geriatrie, Recht
 *
 * Wissenschaftliche Quellen (alle aktuelle Auflage / Version):
 *   Lehrbücher
 *     - Schmidt/Lang/Heckmann: Physiologie des Menschen, 32. Aufl. (Springer)
 *     - Rassow et al.: Biochemie (Duale Reihe), 5. Aufl. (Thieme)
 *     - Schünke/Schulte/Schumacher: Prometheus Lernatlas, 6. Aufl. (Thieme)
 *     - Herold: Innere Medizin, Ausgabe 2024
 *     - Aktories/Förstermann/Hofmann/Starke: Allgemeine und spezielle
 *       Pharmakologie und Toxikologie, 13. Aufl. (Elsevier)
 *     - Kochen: Allgemeinmedizin und Familienmedizin, 5. Aufl. (Thieme)
 *   Leitlinien & Standards
 *     - DEGAM-S3-Leitlinie "Nicht-spezifischer Kreuzschmerz" (NVL Reg. nvl-007)
 *     - DEGAM-/AWMF-S3-Leitlinie "Akuter und chronischer Husten" (AWMF 053-013)
 *     - AWMF-S3-Leitlinie "Lyme-Borreliose" (Reg. 013-080)
 *     - NVL Diabetes mellitus Typ 2 (2023, NVL-001)
 *     - NVL Asthma (2024) und NVL COPD (2021/2024-Update)
 *     - ESC Guidelines for Heart Failure 2021 + 2023 Focused Update
 *     - GINA Global Strategy 2024
 *     - GOLD Report 2024 (COPD)
 *     - PRISCUS-2.0-Liste (2023)
 *     - STOPP/START-Kriterien Version 3 (2023)
 *     - STIKO-Empfehlungen Epid. Bull. 4/2024
 *     - RKI: Empfehlungen zu Infektionskrankheiten (Stand 2024)
 *   Recht
 *     - BGB § 1827 (Patientenverfügung) i.d.F. seit 01.01.2023
 *     - ÄApprO 2002 i.d.F. der Aktualisierungen 2012/2024
 *
 * IMPP-Stil: 5 Antwortoptionen pro Frage (A–E), siehe AGENTS.md §18.4 Ausnahme.
 *
 * Status: 'preparation' bleibt gesetzt, solange der Quiz-Pool das in
 * AGENTS.md §18.4 geforderte Soll von ≥ 50 Fragen pro Kapitel nicht
 * erreicht. Aktueller Stand pro Kapitel: 12 quellenbasierte Fragen.
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    // =========================================================================
    // KAPITEL 1 — VORKLINIK (M1)
    // =========================================================================

    const PAGE_PRINZIPIEN = {
        title: '1.1 Wissenschaftliche Prinzipien der Allgemeinmedizin',
        html: ''
            + '<p>Die Allgemeinmedizin ist die Disziplin der Primärversorgung. Sie unterscheidet sich von hochspezialisierter Klinik weniger durch das Faktenwissen als durch ihren <strong>Denkrahmen</strong>: Symptome werden im Kontext von Lebenswelt, Familie und psychosozialer Situation des Patienten interpretiert (bio-psycho-soziales Modell nach Engel, 1977). Wer ein Vorlesungsbegleitendes Selbststudium aufsetzt, sollte diese Prinzipien früh verinnerlichen, weil sie M2- und Facharzt-Prüfungen wie ein roter Faden durchziehen.</p>'

            + '<h4>Hermeneutisches Fallverständnis</h4>'
            + '<p>Symptome werden nicht isoliert betrachtet. Ein chronischer Rückenschmerz bei einer alleinerziehenden Mutter mit Pflegefall in der Familie hat eine andere Bedeutung als derselbe Schmerz bei einem leistungssportlich aktiven Patienten. Die hausärztliche Anamnese fragt deshalb explizit nach Lebenskontext, Arbeitsbelastung und sozialer Unterstützung. Das ist keine Esoterik: prospektive Kohortenstudien (z. B. Hill 2019, BMJ Open) zeigen, dass die Erhebung psychosozialer Faktoren Adhärenz und Outcome messbar verbessert.</p>'

            + '<h4>Abwendbar gefährliche Verläufe (AGV)</h4>'
            + '<p>Die primäre Aufgabe bei unklaren Symptomen ist nicht immer die exakte Diagnose, sondern der sichere Ausschluss lebensbedrohlicher Ursachen. Beispiel Brustschmerz: vor einer Reflux-Diagnose müssen akutes Koronarsyndrom (ACS), Lungenembolie (LAE) und Aortendissektion ausgeschlossen werden. Die DEGAM-Leitlinien führen dazu strukturierte <em>Red-Flag-Listen</em>, die der Hausarzt aktiv abfragt.</p>'

            + '<h4>Wait-and-See / abwartendes Offenlassen</h4>'
            + '<p>Bei selbstlimitierenden Erkrankungen (akute Bronchitis, unspezifischer Kreuzschmerz, leichte Gastroenteritis) ist die evidenzbasierte Strategie häufig <em>Aufklärung plus zeitlich begrenzte Re-Evaluation</em>, nicht sofortige Diagnostik oder Therapie. Diese Strategie verhindert Überdiagnostik (quartäre Prävention nach Jamoulle) und Medikalisierung. Prüfungsrelevant: <em>Delayed Prescription</em> (Rezept für den Bedarfsfall, Cochrane Review Spurling 2017) ist S3-empfohlen, um unnötige Antibiotikagabe zu reduzieren.</p>'

            + '<h4>Bayes-Logik in der Hausarztpraxis</h4>'
            + '<p>Der prädiktive Wert eines Tests hängt nicht nur von Sensitivität und Spezifität ab, sondern entscheidend von der <strong>Vortestwahrscheinlichkeit</strong> (Prävalenz). In der Hausarztpraxis ist die Prävalenz schwerer Erkrankungen niedrig — daher liefert ein scheinbar präziser Test (z. B. D-Dimer bei niedriger Wells-Score-Wahrscheinlichkeit) eine überraschend hohe False-Positive-Rate. Formal: $$\\text{PPV}=\\frac{\\text{Sens}\\cdot p}{\\text{Sens}\\cdot p+(1-\\text{Spez})\\cdot(1-p)}$$ Praktische Konsequenz: nur Tests anfordern, deren Ergebnis das Vorgehen ändert (Choosing-Wisely-Prinzip).</p>'

            + '<h4>Epidemiologie als Lernpriorisierung</h4>'
            + '<p>In der Hausarztpraxis dominieren wenige Beratungsanlässe: Husten, Rückenschmerz, Hypertonie-Kontrolle, Müdigkeit, Bauchschmerz, Kopfschmerz, depressive Verstimmung, Diabetes-Verlaufskontrolle und Impfung. Diese Liste deckt rund zwei Drittel aller Konsultationen ab (ZI Versorgungsatlas 2023). Wer effizient lernt, gewichtet die Vorbereitung nach realer Prävalenz, nicht nach Lehrbuch-Seitenzahl.</p>'
    };

    const PAGE_ANATOMIE = {
        title: '1.2 Anatomie und Histologie mit klinischem Bezug',
        html: ''
            + '<p>Anatomisches Wissen ist im IMPP-Stil fast nie reiner Selbstzweck — geprüft wird die <em>klinische Konsequenz</em>. Diese Vorlesungseinheit zeigt vier Beispielsysteme, deren topographische Beziehungen in M1 und M2 wiederholt geprüft werden.</p>'

            + '<h4>Schilddrüse und N. laryngeus recurrens</h4>'
            + '<p>Der N. laryngeus recurrens ist ein Ast des N. vagus (X). Links schlingt er sich um den Aortenbogen, rechts um die A. subclavia und steigt im <strong>Sulcus tracheoesophageus</strong> wieder auf. In dieser Rinne verläuft er eng entlang der Schilddrüsenkapsel — bei Thyreoidektomie ist er das am häufigsten verletzte Nervenstrukturen.</p>'
            + '<p>Er innerviert <strong>alle inneren Kehlkopfmuskeln außer dem M. cricothyroideus</strong> (dieser wird vom N. laryngeus superior, R. externus, innerviert). Funktionell entscheidend: der <strong>M. cricoarytenoideus posterior (Posticus)</strong> ist der einzige Öffner der Stimmritze (Rima glottidis). Bei einseitiger Recurrensparese: Heiserkeit, evtl. Schluckstörung. Bei beidseitiger Parese in <em>Paramedianstellung</em>: lebensbedrohliche Atemnot, Tracheotomie-Indikation.</p>'

            + '<h4>Vegetatives Nervensystem</h4>'
            + '<p>Sympathikus (thorakolumbaler Ursprung Th1–L2/3) und Parasympathikus (kraniosakraler Ursprung) wirken antagonistisch. Die Pharmakologie greift an drei Stellen:</p>'
            + '<ul>'
            + '<li><strong>α1-Rezeptoren:</strong> Vasokonstriktion (Phenylephrin als Decongestans, Doxazosin zur BPH-Therapie als α1-Blocker).</li>'
            + '<li><strong>β1-Rezeptoren:</strong> kardiale Inotropie/Chronotropie. Selektive β1-Blocker (Bisoprolol, Metoprolol) sind Säulen der HFrEF-Therapie.</li>'
            + '<li><strong>β2-Rezeptoren:</strong> Bronchodilatation (Salbutamol als SABA, Formoterol als LABA in der Asthma-Stufentherapie nach GINA 2024).</li>'
            + '<li><strong>Muskarin-Rezeptoren:</strong> M3 in Bronchien (Tiotropium als LAMA bei COPD), M2 am Herzen (Atropin bei Bradykardie).</li>'
            + '</ul>'

            + '<h4>Bewegungsapparat: LWS und Bandscheibenvorfall</h4>'
            + '<p>Der Bandscheibenvorfall L5/S1 komprimiert klassisch die Nervenwurzel <strong>S1</strong> (Reflexabschwächung Achillessehne, Hypästhesie laterale Fußkante, Schwäche der Plantarflexion). Vorfall L4/L5 trifft <strong>L5</strong> (Schwäche der Großzehenheber, Hypästhesie Fußrücken). Diese Korrelation ist M2-Standard und auch in der hausärztlichen Anamnese entscheidend, um echte Radikulopathien von unspezifischem Kreuzschmerz zu trennen.</p>'

            + '<h4>Mikroskopische Anatomie mit Krankheitsbezug</h4>'
            + '<ul>'
            + '<li><strong>Respiratorisches Flimmerepithel:</strong> mehrreihiges hochprismatisches Epithel mit Zilien und Becherzellen. Bei chronischer Bronchitis (COPD) entwickeln Raucher eine Plattenepithelmetaplasie — Zilienverlust, schlechtere Clearance, Teufelskreis.</li>'
            + '<li><strong>Glomerulus / Tubulus-System:</strong> Wirkort der Diuretika. Schleifendiuretika hemmen den Na-K-2Cl-Cotransporter (NKCC2) im aufsteigenden Ast der Henle-Schleife; Thiazide hemmen den Na-Cl-Cotransporter (NCC) im distalen Tubulus; MRA blockieren Aldosteron-Rezeptoren im Sammelrohr.</li>'
            + '<li><strong>Knochen-Remodeling:</strong> Osteoklasten (Hemmung durch Bisphosphonate, Denosumab) versus Osteoblasten (Stimulation durch Teriparatid). Pharmakologische Anker für Osteoporose-Therapie.</li>'
            + '</ul>'
    };

    const PAGE_PHYSIO_BIOCHEM = {
        title: '1.3 Physiologie und Biochemie: prüfungsrelevante Schaltstellen',
        html: ''
            + '<p>Die IMPP-Logik in der Vorklinik prüft selten reine Definitionen — fast immer wird ein physiologisches oder biochemisches Konzept in einen klinischen Fall eingebettet. Die folgenden Schaltstellen sind Hochfrequenz-Themen.</p>'

            + '<h4>Sauerstofftransport: Bohr-Effekt und 2,3-BPG</h4>'
            + '<p>Hämoglobin (Hb) liegt im Gleichgewicht zwischen T-Form (tense, niedrige O₂-Affinität) und R-Form (relaxed, hohe Affinität). Vier Modulatoren verschieben das Gleichgewicht und damit die Sauerstoffbindungskurve:</p>'
            + '<ul>'
            + '<li><strong>pH ↓ (Azidose):</strong> Rechtsverschiebung — Bohr-Effekt, erleichtert O₂-Abgabe im sauren, hypermetabolen Gewebe.</li>'
            + '<li><strong>pCO₂ ↑:</strong> Rechtsverschiebung (über H⁺ und Carbamatbindung).</li>'
            + '<li><strong>Temperatur ↑:</strong> Rechtsverschiebung — arbeitende Muskulatur.</li>'
            + '<li><strong>2,3-Bisphosphoglycerat (2,3-BPG) ↑:</strong> Rechtsverschiebung. 2,3-BPG entsteht im <em>Rapoport-Luebering-Bypass</em> der Glykolyse, bindet selektiv an die T-Form und stabilisiert sie.</li>'
            + '</ul>'
            + '<p>Bei Höhenaufenthalt oder chronischer Hypoxie (COPD, Anämie) steigt die 2,3-BPG-Konzentration in den Erythrozyten innerhalb von Tagen. Folge: $$\\text{P}_{50}\\;\\text{steigt} \\;\\Rightarrow\\; \\text{Affinität sinkt} \\;\\Rightarrow\\; \\text{O}_2\\text{-Abgabe ans Gewebe verbessert}.$$ Fetales Hämoglobin (HbF) bindet 2,3-BPG dagegen schwach — daher hat HbF eine höhere O₂-Affinität, was die transplazentare O₂-Übertragung an den Fetus ermöglicht.</p>'

            + '<h4>Glukose-Stoffwechsel und Diabetes</h4>'
            + '<p>Die Glykolyse (Zytosol) liefert pro Glukose 2 ATP, 2 NADH und 2 Pyruvat. Pyruvat wird unter aeroben Bedingungen über die Pyruvat-Dehydrogenase (PDH) in Acetyl-CoA überführt und in den Citratzyklus eingespeist (Mitochondrium). Bei Diabetes mellitus Typ 2 ist die Insulin-vermittelte GLUT4-Translokation in Muskel- und Fettzellen gestört (Insulinresistenz).</p>'
            + '<p>Pharmakologische Angriffspunkte mit klinischer Relevanz:</p>'
            + '<ul>'
            + '<li><strong>Metformin:</strong> hemmt mitochondriale Glycerophosphat-Dehydrogenase, reduziert hepatische Glukoneogenese — Erstlinie bei T2DM (NVL Diabetes 2023).</li>'
            + '<li><strong>SGLT2-Inhibitoren:</strong> hemmen Natrium-Glukose-Cotransporter 2 im proximalen Tubulus, fördern Glukosurie. Zusätzlicher Nutzen: kardio- und renoprotektiv (EMPA-REG, DAPA-HF). Heute Säule der HFrEF- und CKD-Therapie unabhängig vom Diabetes-Status.</li>'
            + '<li><strong>GLP-1-Agonisten (Semaglutid):</strong> verstärken glukoseabhängige Insulinsekretion, hemmen Glukagon, verzögern Magenentleerung. Zusätzlich Gewichtsreduktion.</li>'
            + '</ul>'

            + '<h4>Purinabbau und Hyperurikämie</h4>'
            + '<p>Reihenfolge im Purinabbau: AMP → IMP → Inosin → <strong>Hypoxanthin</strong> → (Xanthinoxidase) → <strong>Xanthin</strong> → (Xanthinoxidase) → <strong>Harnsäure</strong>. Der Mensch besitzt — anders als die meisten Säugetiere — keine funktionsfähige Urikase, weshalb Harnsäure das Endprodukt ist.</p>'
            + '<p>Therapie-Anker:</p>'
            + '<ul>'
            + '<li><strong>Allopurinol</strong> ist ein Hypoxanthin-Strukturanalogon und kompetitiver Hemmer der Xanthinoxidase; nach Umwandlung zu Oxypurinol wirkt es als <em>nicht-kompetitiver, suizidaler</em> Inhibitor. Folge: weniger Harnsäure, vermehrte renale Ausscheidung der besser wasserlöslichen Vorstufen.</li>'
            + '<li><strong>Febuxostat</strong> ist ein selektiverer XO-Hemmer (Reserve bei Allopurinol-Unverträglichkeit, Cave kardiovaskuläre Mortalität — CARES-Studie 2018).</li>'
            + '<li><strong>Lesch-Nyhan-Syndrom:</strong> X-chromosomaler Defekt der Hypoxanthin-Guanin-Phosphoribosyltransferase (HGPRT), Salvage-Pathway fällt aus, exzessive Harnsäureproduktion, neurologische Symptome (Selbstverstümmelung).</li>'
            + '</ul>'

            + '<h4>Cytochrom-P450-System (Einführung)</h4>'
            + '<p>CYP-Enzyme katalysieren Phase-I-Reaktionen (Oxidation, Hydroxylierung). CYP3A4 metabolisiert ca. 50 % aller verschreibungspflichtigen Medikamente, CYP2D6 ca. 25 %. Genpolymorphismen (Poor / Intermediate / Extensive / Ultra-rapid Metabolizer) erklären inter-individuelle Wirk- und Nebenwirkungsdifferenzen — pharmakogenetische Basis-Vorlesung.</p>'
            + '<p>Klassische Inhibitoren: Makrolide (Clarithromycin), Azol-Antimykotika (Itraconazol), Grapefruitsaft (CYP3A4); Fluoxetin und Paroxetin (CYP2D6). Klassische Induktoren: Rifampicin, Carbamazepin, Phenytoin, Johanniskraut. Diese Liste taucht in M2-Pharmakologie und in der hausärztlichen Polypharmazie immer wieder auf.</p>'
    };

    // =========================================================================
    // KAPITEL 2 — KLINIK (M2)
    // =========================================================================

    const PAGE_KARDIO = {
        title: '2.1 Kardiologie: HFrEF, ACS, Vorhofflimmern',
        html: ''
            + '<p>Kardiovaskuläre Erkrankungen sind in Deutschland Todesursache Nr. 1 (Statistisches Bundesamt 2023). Drei Krankheitsbilder dominieren M2-Prüfung und hausärztliche Praxis: Herzinsuffizienz, akutes Koronarsyndrom und Vorhofflimmern.</p>'

            + '<h4>HFrEF: die "Fantastic Four" nach ESC 2021/2023</h4>'
            + '<p>Heart Failure with reduced Ejection Fraction (HFrEF) liegt bei einer LVEF ≤ 40 % vor. Die ESC-Leitlinien 2021 (mit Focused Update 2023) definieren <strong>vier prognoseverbessernde Säulen</strong>, die parallel — nicht sequenziell — eindosiert werden sollen:</p>'
            + '<ol>'
            + '<li><strong>RAAS-Inhibition:</strong> ARNI (Sacubitril/Valsartan) bevorzugt; alternativ ACE-Hemmer (Ramipril, Enalapril) oder ARB bei ACE-Hemmer-Unverträglichkeit.</li>'
            + '<li><strong>Beta-Blocker:</strong> evidenzbasiert nur Bisoprolol, Carvedilol, Metoprololsuccinat oder Nebivolol (älter, &gt; 70 J.).</li>'
            + '<li><strong>Mineralokortikoid-Rezeptor-Antagonist (MRA):</strong> Spironolacton oder Eplerenon. Cave Hyperkaliämie.</li>'
            + '<li><strong>SGLT2-Inhibitor:</strong> Dapagliflozin oder Empagliflozin — unabhängig vom Diabetes-Status (DAPA-HF, EMPEROR-Reduced).</li>'
            + '</ol>'
            + '<p><strong>Nicht prognoseverbessernd, aber symptomatisch:</strong> Schleifendiuretika (Furosemid, Torasemid) zur Stauungstherapie. <strong>Kontraindiziert</strong> bei HFrEF: Calciumkanalblocker vom Verapamil-/Diltiazem-Typ (negativ inotrop), nicht-dihydropyridinische CCB, klassische NSAR (Volumenretention, Verschlechterung der Nierenfunktion).</p>'

            + '<h4>Akutes Koronarsyndrom (ACS)</h4>'
            + '<p>Triage in zwei Schritten: 12-Kanal-EKG innerhalb von 10 Minuten und hochsensitives Troponin (hsTn) bei Aufnahme.</p>'
            + '<ul>'
            + '<li><strong>STEMI:</strong> persistierende ST-Hebung in mind. 2 zusammengehörigen Ableitungen ≥ 0,1 mV (≥ 0,2 mV in V2/V3). Sofortige Katheter-Reperfusion (PCI) innerhalb 120 Min nach Erstkontakt — Time is muscle.</li>'
            + '<li><strong>NSTE-ACS:</strong> kein ST-Hebung. Risikostratifizierung mit GRACE-Score. Hochrisiko (GRACE &gt; 140, dynamisches Troponin) → invasive Strategie &lt; 24 h.</li>'
            + '</ul>'
            + '<p>Standardmedikation: ASS 150–300 mg p. o., P2Y12-Inhibitor (Ticagrelor oder Prasugrel — kein Clopidogrel als Erstlinie nach ESC 2023, außer Kontraindikation), Antikoagulation (UFH oder Enoxaparin), Statin (Hochintensität, Atorvastatin 80 mg oder Rosuvastatin 40 mg).</p>'

            + '<h4>Vorhofflimmern: CHA₂DS₂-VASc und HAS-BLED</h4>'
            + '<p>Bei nicht-valvulärem Vorhofflimmern entscheidet der <strong>CHA₂DS₂-VASc-Score</strong> über die orale Antikoagulation:</p>'
            + '<table><thead><tr><th>Buchstabe</th><th>Bedeutung</th><th>Punkte</th></tr></thead>'
            + '<tbody>'
            + '<tr><td>C</td><td>Congestive Heart Failure / LVEF ≤ 40 %</td><td>1</td></tr>'
            + '<tr><td>H</td><td>Hypertonie</td><td>1</td></tr>'
            + '<tr><td>A₂</td><td>Alter ≥ 75 J.</td><td>2</td></tr>'
            + '<tr><td>D</td><td>Diabetes mellitus</td><td>1</td></tr>'
            + '<tr><td>S₂</td><td>Schlaganfall / TIA / Thromboembolie in Anamnese</td><td>2</td></tr>'
            + '<tr><td>V</td><td>Vaskuläre Erkrankung (KHK, pAVK)</td><td>1</td></tr>'
            + '<tr><td>A</td><td>Alter 65–74 J.</td><td>1</td></tr>'
            + '<tr><td>Sc</td><td>Sex category (weiblich)</td><td>1*</td></tr>'
            + '</tbody></table>'
            + '<p>* nur bei mind. einem weiteren Risikofaktor wertend. Ab Score ≥ 2 (Männer) bzw. ≥ 3 (Frauen) klare Indikation zur OAK. Therapie der Wahl: DOAK (Apixaban, Rivaroxaban, Edoxaban, Dabigatran) — keine Vitamin-K-Antagonisten, außer bei mechanischer Klappe oder mittelschwerer/schwerer Mitralstenose.</p>'
            + '<p>Blutungsrisiko via <strong>HAS-BLED</strong> (Hypertonie, abnorme Nieren-/Leberfunktion, Stroke, Bleeding history, Labile INR, Elderly, Drugs/Alcohol) abschätzen — kein Stopp der OAK bei hohem Score, sondern Optimierung modifizierbarer Faktoren.</p>'
    };

    const PAGE_PNEUMO = {
        title: '2.2 Pneumologie: Asthma, COPD, Pneumonie',
        html: ''
            + '<p>Atemwegserkrankungen gehören zu den häufigsten Beratungsanlässen. Drei Leitlinien strukturieren das Vorgehen: GINA 2024 für Asthma, GOLD 2024 für COPD und die DEGAM-S3-Leitlinie Husten (AWMF 053-013) für die hausärztliche Erstversorgung.</p>'

            + '<h4>Asthma bronchiale (GINA 2024)</h4>'
            + '<p>GINA hat 2019 die Empfehlung umgekehrt: <strong>SABA-only-Therapie ist obsolet</strong>, weil sie Mortalität nicht senkt und zur Übernutzung verleitet. Stattdessen "MART"-Konzept (Maintenance and Reliever Therapy) mit ICS-Formoterol bereits ab Track 1.</p>'
            + '<ul>'
            + '<li><strong>Track 1 (bevorzugt):</strong> niedrigdosiertes ICS-Formoterol bei Bedarf (Stufe 1–2), als Erhaltungs- und Bedarfstherapie (Stufe 3–5).</li>'
            + '<li><strong>Track 2:</strong> niedrigdosiertes ICS plus SABA bei Bedarf.</li>'
            + '<li><strong>Stufe 5:</strong> Add-on Tiotropium (LAMA), Biologika (Omalizumab anti-IgE, Mepolizumab/Benralizumab anti-IL5, Dupilumab anti-IL4Rα) je nach Phänotyp.</li>'
            + '</ul>'

            + '<h4>COPD (GOLD 2024)</h4>'
            + '<p>Diagnose: postbronchodilatatorischer FEV₁/FVC &lt; 0,7. Schweregrad-Klassifikation in Gruppen <strong>A / B / E</strong> (E = Exazerbierer, ersetzt seit 2023 die alten Gruppen C und D).</p>'
            + '<ul>'
            + '<li><strong>Gruppe A:</strong> wenig Symptome (mMRC 0–1, CAT &lt; 10), ≤ 1 moderate Exazerbation/Jahr → Bronchodilatator.</li>'
            + '<li><strong>Gruppe B:</strong> mehr Symptome, ≤ 1 Exazerbation → LABA + LAMA.</li>'
            + '<li><strong>Gruppe E:</strong> ≥ 2 moderate oder ≥ 1 hospitalisierungspflichtige Exazerbation → LABA + LAMA, bei Eosinophilie ≥ 300/µl + ICS.</li>'
            + '</ul>'
            + '<p>ICS-Monotherapie ist bei COPD <em>nicht</em> indiziert (Pneumonie-Risiko). Roflumilast (PDE-4-Hemmer) und Azithromycin als Add-on bei häufigen Exazerbationen.</p>'

            + '<h4>Ambulant erworbene Pneumonie (CRB-65)</h4>'
            + '<p>Der CRB-65-Score steuert in der Hausarztpraxis die Entscheidung ambulant vs. stationär:</p>'
            + '<ul>'
            + '<li><strong>C</strong>onfusion (Verwirrtheit) — 1 Punkt</li>'
            + '<li><strong>R</strong>espiratory rate ≥ 30/min — 1 Punkt</li>'
            + '<li><strong>B</strong>lood pressure: systolisch &lt; 90 mmHg oder diastolisch ≤ 60 mmHg — 1 Punkt</li>'
            + '<li><strong>65</strong>: Alter ≥ 65 Jahre — 1 Punkt</li>'
            + '</ul>'
            + '<p>0 Punkte: ambulant; 1–2 Punkte: stationäre Aufnahme erwägen; ≥ 3 Punkte: intensivmedizinische Betreuung erwägen. Empirische Antibiotika-Therapie ambulant: Amoxicillin (Erstlinie); bei Penicillin-Allergie Doxycyclin oder Clarithromycin (S3-Leitlinie CAP 2021).</p>'

            + '<h4>Akute Bronchitis: Antibiotic Stewardship</h4>'
            + '<p>Akute Bronchitiden sind zu rund 90 % viral (Cochrane Smith 2017). Antibiotika verkürzen die Krankheitsdauer im Mittel um 0,5 Tage, fördern aber Resistenzen, Nebenwirkungen (Diarrhoe, C.-difficile-Infektion) und Allergien. Empfohlene Strategie: <em>Delayed Prescription</em> — Rezept für den Bedarfsfall, einlösbar bei verzögertem Verlauf nach 5–7 Tagen.</p>'
    };

    const PAGE_PHARMA_INFEKT = {
        title: '2.3 Pharmakologie und Infektiologie: Interaktionen, Borreliose',
        html: ''
            + '<p>Pharmakologie ist im M2 weniger Auswendiglernen einzelner Wirkstoffe als Verständnis der <em>Mechanismen</em>: LADME-Pharmakokinetik, Cytochrom-Interaktionen, Transporter (P-gp). Diese Einheit fokussiert auf zwei Hochfrequenz-Themen.</p>'

            + '<h4>DOAK-Interaktionen: CYP3A4 und P-Glykoprotein</h4>'
            + '<p>Direkte orale Antikoagulanzien (DOAK) sind Standard bei nicht-valvulärem Vorhofflimmern. Wichtigste pharmakokinetische Unterschiede:</p>'
            + '<table><thead><tr><th>Wirkstoff</th><th>Ziel</th><th>Hauptelimination</th><th>CYP-Beteiligung</th></tr></thead>'
            + '<tbody>'
            + '<tr><td>Apixaban</td><td>F. Xa</td><td>~ 25 % renal</td><td>CYP3A4 + P-gp</td></tr>'
            + '<tr><td>Rivaroxaban</td><td>F. Xa</td><td>~ 33 % renal</td><td>CYP3A4 + P-gp</td></tr>'
            + '<tr><td>Edoxaban</td><td>F. Xa</td><td>~ 50 % renal</td><td>P-gp dominant</td></tr>'
            + '<tr><td>Dabigatran</td><td>F. IIa (Thrombin)</td><td>~ 80 % renal</td><td>P-gp ohne CYP</td></tr>'
            + '</tbody></table>'
            + '<p>Klinische Konsequenz: starke <strong>CYP3A4- und P-gp-Inhibitoren</strong> (Makrolide außer Azithromycin, Azol-Antimykotika, Fluorchinolone, Verapamil, Amiodaron, HIV-Proteasehemmer) heben die Plasmaspiegel von Apixaban und Rivaroxaban deutlich an — Blutungsrisiko steigt. Klassischer Prüfungs- und Praxis-Fall: Apixaban-Patientin erhält Ciprofloxacin gegen HWI und kommt mit GI-Blutung. Lehre: vor jeder neuen Verschreibung Interaktions-Check (z. B. ABDA-Datenbank, Medscape).</p>'
            + '<p>Starke <strong>CYP3A4- und P-gp-Induktoren</strong> (Rifampicin, Carbamazepin, Phenytoin, Johanniskraut) senken Spiegel — Thrombose-Risiko. Bei diesen Komedikationen DOAK absetzen oder umstellen.</p>'

            + '<h4>Antibiotic Stewardship: zentrale Prinzipien</h4>'
            + '<ul>'
            + '<li><strong>Indikationsstellung:</strong> Bakterielle Genese plausibel? Selbstlimitierender Verlauf erwartbar?</li>'
            + '<li><strong>Erregerspektrum:</strong> Schmalspektrum, sobald möglich (Deeskalation nach Antibiogramm).</li>'
            + '<li><strong>Therapiedauer:</strong> kürzer als historisch üblich. Unkomplizierte HWI bei Frauen: Fosfomycin Einmalgabe oder Nitrofurantoin 5 Tage; CAP ambulant: 5 Tage statt 7–10; Erysipel: 5–7 Tage.</li>'
            + '<li><strong>Reserve-Antibiotika</strong> (Linezolid, Daptomycin, Tigecyclin, Cefiderocol) restriktiv einsetzen.</li>'
            + '</ul>'

            + '<h4>Lyme-Borreliose: Stadien und Therapie</h4>'
            + '<p>Erreger: <em>Borrelia burgdorferi</em> sensu lato (in Mitteleuropa v. a. <em>B. afzelii</em>, <em>B. garinii</em>). Übertragung durch <em>Ixodes ricinus</em>. Risiko einer Infektion nach Zeckenstich ca. 1–6 % (RKI 2024); Antibiotikaprophylaxe nach Stich nicht empfohlen.</p>'
            + '<ul>'
            + '<li><strong>Stadium I (Lokalinfektion):</strong> Erythema migrans — ringförmiges, schmerzloses Erythem mit zentraler Abblassung, Größe nimmt über Tage zu. <em>Blickdiagnose</em>, Serologie ist im Frühstadium häufig falsch-negativ. Therapie sofort empirisch.</li>'
            + '<li><strong>Stadium II (frühe Disseminierung):</strong> multiple Erythemata migrantia, Lyme-Karditis, frühe Neuroborreliose (Bannwarth-Syndrom: lymphozytäre Meningoradikulitis mit Hirnnerven-Befall, klassisch Fazialisparese).</li>'
            + '<li><strong>Stadium III (Spät):</strong> Lyme-Arthritis (häufig Knie), Acrodermatitis chronica atrophicans, späte Neuroborreliose.</li>'
            + '</ul>'
            + '<p><strong>Therapie</strong> nach AWMF-S3 (Reg. 013-080):</p>'
            + '<ul>'
            + '<li>Erwachsene, Stadium I: <strong>Doxycyclin</strong> 200 mg/d p. o. für 14 Tage (Off-label-Hinweis: nicht in Schwangerschaft/Stillzeit, nicht bei Kindern &lt; 9 Jahren).</li>'
            + '<li>Schwangere/Kinder: Amoxicillin 50 mg/kg KG/d in 3 ED.</li>'
            + '<li>Neuroborreliose: Ceftriaxon 2 g/d i. v. für 14–21 Tage.</li>'
            + '</ul>'
            + '<p>Cave: Eine routinemäßige serologische Verlaufskontrolle bei Borreliose ist <em>nicht</em> sinnvoll — Antikörper können jahrelang persistieren ohne aktive Infektion (sog. Seronarbe).</p>'
    };

    // =========================================================================
    // KAPITEL 3 — PJ & FACHARZT
    // =========================================================================

    const PAGE_POLYPHARMA = {
        title: '3.1 Multimorbidität und Polypharmazie',
        html: ''
            + '<p>Patienten mit drei oder mehr chronischen Erkrankungen sind in der Hausarztpraxis Standard. Polypharmazie (≥ 5 Dauermedikamente) erhöht das Interaktions-, Sturz- und Hospitalisierungsrisiko überproportional. Die hausärztliche Aufgabe ist nicht nur das Verschreiben, sondern aktives <em>Deprescribing</em>.</p>'

            + '<h4>PRISCUS-2.0-Liste (2023)</h4>'
            + '<p>Deutsche Liste potenziell inadäquater Medikation (PIM) im Alter, herausgegeben von der Universität Witten/Herdecke. Die 2023-Aktualisierung enthält rund 180 Wirkstoffe mit Bewertungen und konkreten Alternativen. Hochfrequente PIM:</p>'
            + '<ul>'
            + '<li><strong>Trizyklische Antidepressiva (Amitriptylin, Doxepin):</strong> stark anticholinerg (Mundtrockenheit, Harnverhalt, Obstipation, Delir-Risiko), α1-adrenolytisch (orthostatische Hypotonie, Sturzgefahr). Alternative: SSRI (Sertralin, Citalopram); bei Schmerz Duloxetin oder Pregabalin.</li>'
            + '<li><strong>Benzodiazepine mit langer HWZ (Diazepam, Flurazepam):</strong> Akkumulation, Sturzrisiko. Bei zwingender Indikation kurzwirksame Alternativen (Lorazepam, Oxazepam) zeitlich begrenzt.</li>'
            + '<li><strong>Z-Substanzen (Zolpidem, Zopiclon):</strong> ebenfalls Sturzrisiko; Schlafhygiene-Maßnahmen primär.</li>'
            + '<li><strong>NSAR-Dauergabe:</strong> GI-Blutung, Niereninsuffizienz, Herzinsuffizienz-Verschlechterung. Alternative: Paracetamol, lokale NSAR, niedrigdosierte Opioid-Kombination.</li>'
            + '<li><strong>Anticholinergika (Oxybutynin):</strong> kognitive Verschlechterung. Alternative: Mirabegron (β3-Agonist).</li>'
            + '</ul>'

            + '<h4>STOPP/START-Kriterien Version 3 (2023)</h4>'
            + '<p>Europäisches Pendant zur PRISCUS, von der European Geriatric Medicine Society. Zwei Listen:</p>'
            + '<ul>'
            + '<li><strong>STOPP:</strong> Screening Tool of Older Persons\' potentially inappropriate Prescriptions — Medikamente, die abgesetzt werden sollten.</li>'
            + '<li><strong>START:</strong> Screening Tool to Alert doctors to Right Treatment — fehlende, evidenzbasiert indizierte Medikamente (Unterversorgung).</li>'
            + '</ul>'
            + '<p>Beispiele für Unterversorgung im Alter: kein Statin trotz manifester KHK, kein Bisphosphonat bei manifester Osteoporose, kein DOAK bei nicht-valvulärem Vorhofflimmern.</p>'

            + '<h4>FORTA-Klassifikation (Fit fOR The Aged)</h4>'
            + '<p>Vierstufige Bewertung jedes Wirkstoffs für Patienten ≥ 65 Jahre:</p>'
            + '<ul>'
            + '<li><strong>A — absolutely:</strong> klare Indikation, gute Evidenz im Alter (z. B. Statine bei KHK).</li>'
            + '<li><strong>B — beneficial:</strong> Wirksamkeit nachgewiesen, kleinere Einschränkungen.</li>'
            + '<li><strong>C — careful:</strong> fragwürdiger Nutzen, Alternativen prüfen.</li>'
            + '<li><strong>D — don\'t:</strong> in der Regel vermeiden (entspricht PIM).</li>'
            + '</ul>'
            + '<p>Praxiswerkzeug: strukturierte Medikations-Reviews mindestens jährlich, bei jeder Krankenhausentlassung und bei jedem neuen Symptom (Frage: könnte das eine UAW sein?).</p>'
    };

    const PAGE_PRAEVENTION = {
        title: '3.2 Prävention, Screening und Impfungen',
        html: ''
            + '<p>Prävention ist Kernkompetenz der Hausarztpraxis. Drei Ebenen werden unterschieden: primär (Verhinderung der Erkrankung, z. B. Impfung), sekundär (Früherkennung, Screening), tertiär (Verhinderung von Folgeschäden bei manifester Erkrankung). Quartäre Prävention (Jamoulle 1986) bezeichnet den Schutz vor unnötiger Medizin.</p>'

            + '<h4>Gesetzliche Vorsorgeprogramme (G-BA-Richtlinien)</h4>'
            + '<ul>'
            + '<li><strong>Check-up 35:</strong> ab 35 Jahren alle 3 Jahre — Anamnese, klinische Untersuchung, Lipid-Status, Nüchtern-Glukose, Urin-Stix. Einmalig: Hepatitis-B/C-Screening (seit 2021).</li>'
            + '<li><strong>Hautkrebs-Screening:</strong> ab 35 alle 2 Jahre, Ganzkörperinspektion durch geschulten Arzt.</li>'
            + '<li><strong>Mammographie-Screening:</strong> Frauen 50–69 (Erweiterung auf 45–74 in mehreren Stufen ab 2024).</li>'
            + '<li><strong>Zervix-Karzinom-Screening:</strong> bis 34 J. jährlicher Pap-Test, ab 35 J. alle 3 Jahre HPV-Co-Testing.</li>'
            + '<li><strong>Darmkrebs-Screening:</strong> Männer ab 50, Frauen ab 55 — iFOBT jährlich oder Koloskopie alle 10 Jahre.</li>'
            + '<li><strong>AAA-Screening:</strong> Männer ab 65 einmalig per Sonographie (Bauchaortenaneurysma).</li>'
            + '</ul>'

            + '<h4>STIKO-Empfehlungen (Stand Epid. Bull. 4/2024)</h4>'
            + '<p>Die Ständige Impfkommission aktualisiert ihre Empfehlungen jährlich. Wichtigste Standardimpfungen für Erwachsene:</p>'
            + '<ul>'
            + '<li><strong>Tetanus-Diphtherie-Pertussis (Tdap):</strong> alle 10 Jahre Td-Auffrischung, einmalig als Tdap. Schwangere: einmal pro Schwangerschaft im 3. Trimenon (Säuglings-Schutz vor Pertussis).</li>'
            + '<li><strong>Polio:</strong> einmalige Auffrischung im Erwachsenenalter mit IPV (kein OPV mehr in Deutschland).</li>'
            + '<li><strong>Influenza:</strong> jährlich, Hochdosis- oder adjuvantierter Impfstoff bei Personen ≥ 60 Jahre.</li>'
            + '<li><strong>Pneumokokken:</strong> ≥ 60 Jahre einmalig PPSV23 (alternativ PCV20 nach STIKO 2023).</li>'
            + '<li><strong>Herpes zoster:</strong> ≥ 60 Jahre Standardimpfung mit Totimpfstoff (Shingrix), 2 Dosen im Abstand 2–6 Monate.</li>'
            + '<li><strong>RSV (neu seit 2024):</strong> Impfempfehlung für Personen ≥ 75 Jahre und für Personen 60–74 mit Risikofaktoren; passive Immunisierung von Säuglingen mit Nirsevimab in der RSV-Saison.</li>'
            + '<li><strong>COVID-19:</strong> jährliche Auffrischung mit aktualisiertem Impfstoff für Risikogruppen (≥ 60 J., Grunderkrankungen, medizinisches Personal).</li>'
            + '</ul>'

            + '<h4>Latente Hypothyreose: ein Klassiker quartärer Prävention</h4>'
            + '<p>Laborkonstellation: TSH erhöht, fT3 und fT4 normwertig, asymptomatisch. Prävalenz bei &gt; 60-Jährigen ca. 10 %. <strong>DEGAM-Empfehlung:</strong> bei TSH &lt; 10 mU/l und Asymptomatik <em>keine</em> sofortige L-Thyroxin-Substitution; Kontrolle nach 2–3 Monaten, da TSH transient ansteigen kann (z. B. nach Infekten, im Winter, bei Adipositas).</p>'
            + '<p>Begründung: Übertherapie mit L-Thyroxin erhöht das Risiko für Vorhofflimmern (HR ~1,4) und Osteoporose, ohne dass für asymptomatische Patienten ein Outcome-Vorteil belegt ist (TRUST-Trial Stott 2017). Substitution erst bei TSH ≥ 10 mU/l, Symptomatik oder Schwangerschafts-Wunsch.</p>'
    };

    const PAGE_RECHT_GERIATRIE = {
        title: '3.3 Geriatrie, Palliativmedizin und juristische Grundlagen',
        html: ''
            + '<p>Die hausärztliche Versorgung am Lebensende verbindet medizinische Kompetenz mit juristischer Sicherheit. Drei Themen werden in M3 und Facharztprüfung regelmäßig geprüft.</p>'

            + '<h4>Frailty und geriatrisches Assessment</h4>'
            + '<p>Frailty (Gebrechlichkeit) ist ein eigenständiges geriatrisches Syndrom mit erhöhtem Risiko für Stürze, Hospitalisierung, Funktionsverlust und Mortalität. <strong>Frailty-Phänotyp nach Fried</strong> (≥ 3 von 5 Kriterien):</p>'
            + '<ul>'
            + '<li>unbeabsichtigter Gewichtsverlust (≥ 4,5 kg/Jahr)</li>'
            + '<li>Erschöpfung (subjektiv)</li>'
            + '<li>reduzierte Greifkraft (Handkraftmessung)</li>'
            + '<li>verlangsamte Ganggeschwindigkeit (&lt; 0,8 m/s)</li>'
            + '<li>geringe körperliche Aktivität</li>'
            + '</ul>'
            + '<p>Demenz-Screening: <strong>MMST</strong> (Mini-Mental-Status-Test, max. 30 Punkte; &lt; 24 Hinweis auf kognitive Störung), <strong>MoCA</strong> (sensitiver für leichte Defizite, MCI), <strong>DemTect</strong> (auffällig &lt; 13). Ein einzelner Test ersetzt keine umfassende Demenz-Diagnostik (inkl. Bildgebung, Liquor bei früher Demenz, Differenzialdiagnose Pseudodemenz bei Depression).</p>'

            + '<h4>Patientenverfügung und gesetzliche Betreuung</h4>'
            + '<p>Rechtsgrundlage: <strong>BGB § 1827</strong> (in der seit 01.01.2023 gültigen Fassung; vormals § 1901a). Eine wirksame Patientenverfügung ist für den behandelnden Arzt <em>bindend</em>, wenn sie:</p>'
            + '<ul>'
            + '<li>schriftlich abgefasst und eigenhändig unterschrieben (oder durch notariell beglaubigtes Handzeichen) ist,</li>'
            + '<li>vom einwilligungsfähigen Volljährigen verfasst wurde,</li>'
            + '<li>auf die <strong>aktuelle Lebens- und Behandlungssituation</strong> zutrifft.</li>'
            + '</ul>'
            + '<p>Eine Patientenverfügung verliert <em>nicht</em> automatisch ihre Gültigkeit nach Ablauf einer Frist. Eine regelmäßige Bestätigung wird empfohlen, ist aber juristisch nicht erforderlich.</p>'
            + '<p>Aufgabe des gesetzlichen Betreuers (oder eines Bevollmächtigten via Vorsorgevollmacht): er <em>verschafft dem festgelegten Patientenwillen Geltung</em>. Er darf eine wirksame Verfügung nicht überschreiben. Konflikte zwischen Arzt und Betreuer werden vor dem Betreuungsgericht (vormals Vormundschaftsgericht) verhandelt — nicht aber, wenn Arzt und Betreuer übereinstimmend dem Patientenwillen folgen.</p>'

            + '<h4>Palliativversorgung: AAPV und SAPV</h4>'
            + '<ul>'
            + '<li><strong>AAPV — Allgemeine ambulante Palliativversorgung:</strong> Hausarzt und Pflegedienst, Standardfall am Lebensende.</li>'
            + '<li><strong>SAPV — Spezialisierte ambulante Palliativversorgung:</strong> bei komplexer Symptomlast (refraktäre Schmerzen, schwere Dyspnoe, terminale Unruhe). Verordnung durch Hausarzt oder Klinikarzt; SAPV-Team mit 24/7-Rufbereitschaft.</li>'
            + '</ul>'
            + '<p><strong>Symptomkontrolle:</strong> Schmerztherapie nach WHO-Stufenschema mit niedrigschwelligem Einsatz von Opioiden (Morphin als Goldstandard, alternativ Hydromorphon, Oxycodon); Dyspnoe — Morphin niedrigdosiert (2,5–5 mg s. c.) ist evidenzbasiert (Cochrane Barnes 2016); terminale Unruhe — Midazolam s. c./i. v. nach Titration.</p>'
            + '<p>Wichtig: aktive Sterbehilfe ist in Deutschland verboten (§ 216 StGB). Indirekte Sterbehilfe (Symptomlinderung mit Inkaufnahme einer Lebensverkürzung) und passive Sterbehilfe (Behandlungsabbruch entsprechend Patientenwillen) sind erlaubt und ärztlich geboten.</p>'
    };

    // =========================================================================
    // QUIZ-POOL
    // =========================================================================

    const QUIZ_M1 = [
        q(
            'Ein gesunder 25-jähriger Medizinstudent steigt schnell auf 3.000 m Höhe auf. Wie verändert sich die Sauerstoffaffinität des Hämoglobins in den folgenden Tagen, und welcher Mediator ist primär verantwortlich?',
            [
                'Affinität steigt durch erhöhtes 2,3-BPG.',
                'Affinität sinkt durch erhöhtes 2,3-BPG.',
                'Affinität sinkt durch reduzierten Blut-pH (Bohr-Effekt).',
                'Affinität steigt durch vermehrte HbF-Bildung.',
                'Affinität bleibt unverändert; nur das Atemminutenvolumen steigt.'
            ],
            1,
            'Bei Hypoxie wird im Rapoport-Luebering-Bypass vermehrt 2,3-Bisphosphoglycerat (2,3-BPG) gebildet. 2,3-BPG stabilisiert die T-Form des Hämoglobins → Rechtsverschiebung der O₂-Bindungskurve, O₂-Abgabe ans Gewebe wird erleichtert. (Schmidt/Lang/Heckmann, Physiologie, 32. Aufl.)'
        ),
        q(
            'Allopurinol senkt den Harnsäurespiegel. Welches Enzym wird gehemmt?',
            [
                'Hypoxanthin-Guanin-Phosphoribosyltransferase (HGPRT)',
                'Adenosin-Desaminase (ADA)',
                'Xanthinoxidase',
                'Ribonukleotid-Reduktase',
                'Urat-Oxidase (Urikase)'
            ],
            2,
            'Allopurinol ist ein Hypoxanthin-Strukturanalogon und kompetitiver Hemmer der Xanthinoxidase; Oxypurinol wirkt als Suizid-Inhibitor. HGPRT-Defekt = Lesch-Nyhan; Urikase besitzt der Mensch evolutionär nicht mehr. (Aktories, Pharmakologie, 13. Aufl.)'
        ),
        q(
            'Nach Thyreoidektomie ist der Patient heiser. Welcher Nerv wurde am ehesten verletzt, und welcher Muskel — der einzige Öffner der Stimmritze — wird von ihm innerviert?',
            [
                'N. laryngeus superior; M. cricothyroideus',
                'N. laryngeus recurrens; M. cricoarytenoideus posterior (Posticus)',
                'N. vagus (Hauptstamm); M. arytenoideus transversus',
                'N. laryngeus recurrens; M. vocalis',
                'N. glossopharyngeus; M. stylopharyngeus'
            ],
            1,
            'Der N. laryngeus recurrens verläuft im Sulcus tracheoesophageus eng entlang der Schilddrüse. Er innerviert alle inneren Kehlkopfmuskeln außer dem M. cricothyroideus. Der M. cricoarytenoideus posterior (Posticus) ist der einzige Öffner der Rima glottidis. (Prometheus Lernatlas, 6. Aufl.)'
        ),
        q(
            'Welcher Cotransporter wird durch Schleifendiuretika gehemmt?',
            [
                'Na-Cl-Cotransporter (NCC) im distalen Tubulus',
                'Na-K-2Cl-Cotransporter (NKCC2) im aufsteigenden Henle-Schenkel',
                'Na-Glukose-Cotransporter 2 (SGLT2) im proximalen Tubulus',
                'Na-K-ATPase in der basolateralen Membran',
                'Aldosteron-sensitiver Na-Kanal (ENaC) im Sammelrohr'
            ],
            1,
            'Furosemid und Torasemid hemmen den Na-K-2Cl-Cotransporter (NKCC2) im dicken aufsteigenden Henle-Schenkel. Thiazide hemmen NCC, SGLT2-Inhibitoren hemmen SGLT2, ENaC wird durch Amilorid blockiert. (Aktories, Pharmakologie, 13. Aufl.)'
        ),
        q(
            'Ein Patient hat nach Bandscheibenvorfall eine Schwäche der Plantarflexion und einen abgeschwächten Achillessehnenreflex. Welche Nervenwurzel ist am ehesten betroffen?',
            ['L3', 'L4', 'L5', 'S1', 'S2'],
            3,
            'S1-Wurzel-Kompression klassisch durch Bandscheibenvorfall L5/S1: Schwäche der Plantarflexion (M. gastrocnemius/soleus), Reflexabschwächung der Achillessehne, Hypästhesie der lateralen Fußkante. L5-Schaden trifft Großzehenheber und Fußrücken. (Herold Innere Medizin 2024, Neurologie)'
        ),
        q(
            'Welche Aussage zu HbF (fetales Hämoglobin) trifft zu?',
            [
                'HbF bindet 2,3-BPG stärker als HbA, daher höhere O₂-Affinität.',
                'HbF bindet 2,3-BPG schwächer als HbA, daher höhere O₂-Affinität.',
                'HbF ist strukturell identisch zu HbA, nur durch Methylierung verändert.',
                'HbF besteht aus 2 α- und 2 δ-Ketten.',
                'HbF ist beim Erwachsenen pathologisch erhöht bei Hyperthyreose.'
            ],
            1,
            'HbF (α₂γ₂) bindet 2,3-BPG nur schwach, daher ist die T-Form weniger stabilisiert und die O₂-Affinität höher. Das ermöglicht den transplazentaren O₂-Übergang vom mütterlichen zum fetalen Kreislauf. (Rassow, Biochemie, 5. Aufl.)'
        ),
        q(
            'Welcher β-Adrenorezeptor-Subtyp wird durch Salbutamol bevorzugt aktiviert, und welche therapeutische Wirkung resultiert?',
            [
                'β1 — positive Inotropie',
                'β2 — Bronchodilatation',
                'β3 — Lipolyse',
                'α1 — Vasokonstriktion',
                'α2 — präsynaptische Hemmung'
            ],
            1,
            'Salbutamol ist ein selektiver β2-Agonist (SABA — Short-Acting β2-Agonist). β2-Rezeptoren sind v. a. an glatter Bronchialmuskulatur lokalisiert; Aktivierung führt zu Bronchodilatation. Klassiker der Notfalltherapie bei Asthma-Exazerbation. (GINA 2024)'
        ),
        q(
            'Welche Aussage zur Glykolyse trifft zu?',
            [
                'Sie liefert pro Glukose 4 ATP brutto, netto 2 ATP.',
                'Sie liefert pro Glukose 32 ATP netto.',
                'Sie findet im Mitochondrium statt.',
                'Sie verbraucht NADH und produziert FADH₂.',
                'Sie ist obligat sauerstoffabhängig.'
            ],
            0,
            'Die Glykolyse läuft im Zytosol ab und liefert brutto 4 ATP (2 in der Vorbereitungs-, 2 in der Erntephase), wobei 2 ATP für Hexokinase und Phosphofructokinase verbraucht werden — netto 2 ATP, plus 2 NADH und 2 Pyruvat. Sie funktioniert auch anaerob (Laktat-Bildung). (Rassow, Biochemie)'
        ),
        q(
            'Welche dieser Substanzen ist ein klassischer Induktor von CYP3A4?',
            ['Clarithromycin', 'Itraconazol', 'Rifampicin', 'Grapefruitsaft', 'Ciprofloxacin'],
            2,
            'Rifampicin (Antituberkulotikum) ist ein potenter CYP3A4- und P-gp-Induktor und senkt Plasmaspiegel zahlreicher Komedikamente (DOAK, Statine, Hormonkontrazeptiva). Die anderen genannten sind CYP3A4-Inhibitoren. (Aktories, 13. Aufl.)'
        ),
        q(
            'Welcher Mechanismus erklärt die Wirkung von Statinen?',
            [
                'Hemmung der Pankreas-Lipase im Darmlumen',
                'Hemmung der HMG-CoA-Reduktase in der Leber',
                'Aktivierung von PPAR-α',
                'Bindung von Gallensäuren im Darm',
                'Hemmung der Cholesterol-Resorption über NPC1L1'
            ],
            1,
            'Statine hemmen die HMG-CoA-Reduktase, das geschwindigkeitsbestimmende Enzym der Cholesterol-Synthese in der Leber. Folge: hochregulierte LDL-Rezeptoren, vermehrte LDL-Aufnahme aus dem Plasma. Orlistat hemmt die Pankreas-Lipase, Fibrate aktivieren PPAR-α, Colestyramin bindet Gallensäuren, Ezetimib hemmt NPC1L1. (Herold 2024)'
        ),
        q(
            'In welchem Tubulus-Segment werden Thiazid-Diuretika wirksam?',
            [
                'proximaler Tubulus',
                'aufsteigender Henle-Schenkel',
                'distaler Tubulus',
                'Sammelrohr',
                'Macula densa'
            ],
            2,
            'Thiazide (Hydrochlorothiazid, Chlortalidon) hemmen den Na-Cl-Cotransporter (NCC) im frühen distalen Tubulus. Dadurch sinkt die Natrium-Reabsorption, Volumen und Blutdruck fallen. Wirkung dosisabhängig begrenzt (Ceiling-Effekt). (Aktories)'
        ),
        q(
            'Was beschreibt der Bohr-Effekt?',
            [
                'pH-abhängige Änderung der O₂-Affinität des Hämoglobins',
                'Verschiebung der CO₂-Bindungskurve durch Temperatur',
                'Eisenmangel-bedingte Anämie',
                'Methämoglobinämie durch Nitrate',
                'Sauerstoff-Toxizität in der Lunge bei Beatmung'
            ],
            0,
            'Der Bohr-Effekt: ein Abfall des pH (z. B. im aktiven Muskel durch Laktat) verschiebt die O₂-Bindungskurve nach rechts, die O₂-Affinität sinkt, O₂-Abgabe ans Gewebe wird erleichtert. Umgekehrt erleichtert höherer pH in der Lunge die O₂-Aufnahme. (Schmidt/Lang/Heckmann)'
        )
    ];

    const QUIZ_M2 = [
        q(
            'Ein 68-Jähriger mit Diabetes Typ 2 und Hypertonie hat eine LVEF von 35 %. Welche Kombination bildet die evidenzbasierte, prognoseverbessernde Basistherapie der HFrEF nach ESC 2021/2023?',
            [
                'ARNI (oder ACE-Hemmer), Beta-Blocker, MRA, SGLT2-Inhibitor',
                'Verapamil, Thiazid, ASS, Statin',
                'Amiodaron, Digoxin, Schleifendiuretikum',
                'AT1-Blocker, Nitrate, Schleifendiuretikum, ASS',
                'Beta-Blocker, Amlodipin, SGLT2-Inhibitor'
            ],
            0,
            'Die "Fantastic Four" der HFrEF-Therapie (LVEF ≤ 40 %): ARNI bevorzugt (alternativ ACE-Hemmer/ARB), Beta-Blocker (Bisoprolol, Carvedilol, Metoprololsuccinat, Nebivolol), MRA (Spironolacton/Eplerenon), SGLT2-Inhibitor (Dapagliflozin/Empagliflozin). Verapamil ist bei HFrEF kontraindiziert. (ESC HF Guidelines 2021 + 2023 Focused Update)'
        ),
        q(
            'Eine 75-Jährige unter Apixaban erhält Ciprofloxacin gegen HWI und kommt mit GI-Blutung. Mechanismus?',
            [
                'Ciprofloxacin induziert CYP3A4 → Apixaban-Spiegel sinkt.',
                'Ciprofloxacin hemmt CYP3A4 und P-gp → Apixaban-Spiegel toxisch erhöht.',
                'Apixaban verdrängt Ciprofloxacin aus der Plasmaproteinbindung.',
                'Ciprofloxacin verursacht direkt Magen-Ulzera.',
                'Beide werden kompetitiv renal sezerniert und kumulieren.'
            ],
            1,
            'Apixaban wird über CYP3A4 metabolisiert und über P-Glykoprotein eliminiert. Fluorchinolone, Makrolide und Azol-Antimykotika hemmen beides — Plasmaspiegel und Blutungsrisiko steigen drastisch. (Aktories 13. Aufl.; Fachinformation Apixaban 2024)'
        ),
        q(
            'Ein 45-jähriger Förster zeigt nach Zeckenstich vor 2 Wochen ein ringförmiges, schmerzloses Erythem mit zentraler Abblassung. Korrekter nächster Schritt?',
            [
                'Borrelien-Serologie; Therapie nur bei positivem Befund.',
                'Hautbiopsie zur PCR.',
                'Sofortige Therapie mit Doxycyclin 200 mg/d für 14 Tage ohne Labor.',
                'Ceftriaxon i. v. wegen Neuroborreliose.',
                'Wait-and-See — allergische Reaktion auf Zeckenspeichel.'
            ],
            2,
            'Erythema migrans = Blickdiagnose für Stadium I der Lyme-Borreliose. Serologie ist im Frühstadium häufig falsch-negativ (diagnostische Lücke). AWMF-S3 Reg. 013-080: sofortiger Therapiestart, Erstlinie Doxycyclin (außer Schwangerschaft, Kinder &lt; 9 J. → Amoxicillin).'
        ),
        q(
            'Welcher CRB-65-Score-Wert spricht in der Hausarztpraxis am ehesten für eine ambulante Therapie der Pneumonie?',
            ['0', '1', '2', '3', '4'],
            0,
            'CRB-65 = 0: ambulante Therapie meist sicher. 1–2: stationäre Aufnahme erwägen. ≥ 3: Intensivversorgung erwägen. Score-Komponenten: Confusion, Respiratory rate ≥ 30, Blood pressure (sys &lt; 90 oder dia ≤ 60), Alter ≥ 65. (S3-Leitlinie CAP, AWMF 020-020)'
        ),
        q(
            'Bei welchem Patienten ist nach ESC 2023 eine orale Antikoagulation bei nicht-valvulärem Vorhofflimmern klar indiziert?',
            [
                'Mann, 55 J., keine Begleiterkrankung (CHA₂DS₂-VASc 0)',
                'Frau, 60 J., keine Begleiterkrankung (CHA₂DS₂-VASc 1)',
                'Mann, 70 J., Hypertonie und Diabetes (CHA₂DS₂-VASc 3)',
                'Frau, 40 J., keine Begleiterkrankung (CHA₂DS₂-VASc 1)',
                'Mann, 50 J., gut eingestellte Hypertonie (CHA₂DS₂-VASc 1)'
            ],
            2,
            'CHA₂DS₂-VASc ≥ 2 (Männer) bzw. ≥ 3 (Frauen): klare OAK-Indikation. Der 70-jährige Mann mit Hypertonie und Diabetes erreicht 1 (Alter 65–74) + 1 (Hypertonie) + 1 (Diabetes) = 3. Therapie der Wahl: DOAK. (ESC AF Guidelines 2024)'
        ),
        q(
            'GINA 2024 Track 1: Was empfiehlt GINA bei leichtem Asthma (Stufe 1) als bevorzugte Bedarfsmedikation?',
            [
                'SABA (Salbutamol) als Monotherapie',
                'Niedrigdosiertes ICS-Formoterol bei Bedarf',
                'LAMA (Tiotropium) Dauertherapie',
                'Orales Theophyllin retard',
                'Inhalatives Cromoglicat-Natrium'
            ],
            1,
            'Seit 2019 hat GINA SABA-Monotherapie verlassen — sie senkt Mortalität nicht und führt zur Übernutzung. Track 1: niedrigdosiertes ICS-Formoterol als kombinierte Erhaltungs- und Bedarfstherapie (MART). (GINA Global Strategy 2024)'
        ),
        q(
            'GOLD 2024: Welche Initialtherapie ist bei einem Patienten mit COPD-Gruppe E (≥ 2 moderate Exazerbationen) und Eosinophilen ≥ 300/µl angezeigt?',
            [
                'Bedarfs-SABA only',
                'LABA + LAMA',
                'LABA + LAMA + ICS',
                'ICS-Monotherapie',
                'Tiotropium + Theophyllin'
            ],
            2,
            'GOLD 2024 Gruppe E: LABA + LAMA als Basis. Bei Eosinophilie ≥ 300/µl Add-on ICS (LABA + LAMA + ICS) — nachgewiesener Mortalitätsbenefit (ETHOS, IMPACT). ICS-Monotherapie ist wegen Pneumonie-Risiko nicht indiziert.'
        ),
        q(
            'Eine ambulant erworbene Pneumonie (CRB-65 = 0) ohne Komorbidität soll empirisch behandelt werden. Erstlinie nach S3-Leitlinie?',
            ['Ciprofloxacin', 'Amoxicillin', 'Cefuroxim-Axetil', 'Azithromycin', 'Linezolid'],
            1,
            'Erstlinie ambulante CAP ohne Komorbidität: Amoxicillin (3 × 1 g) für 5 Tage. Bei Penicillin-Allergie: Doxycyclin oder Clarithromycin. Fluorchinolone (Ciprofloxacin, Levofloxacin) sind Reserve wegen Resistenzlage und Nebenwirkungsprofil. (S3 CAP, AWMF 020-020)'
        ),
        q(
            'Welche Aussage zur Borrelien-Serologie ist richtig?',
            [
                'Bei Erythema migrans bestätigt eine positive Serologie die Diagnose.',
                'Im Frühstadium ist die Serologie häufig falsch-negativ.',
                'Eine routinemäßige Verlaufskontrolle der Antikörper ist sinnvoll.',
                'IgG-Antikörper verschwinden nach erfolgreicher Therapie binnen 4 Wochen.',
                'Eine PCR aus dem Liquor ist Erstlinie bei Verdacht auf Erythema migrans.'
            ],
            1,
            'Im Stadium I (Erythema migrans, ca. 7–14 Tage nach Stich) ist die Serologie häufig noch falsch-negativ — diagnostische Lücke. Nach Therapie können Antikörper jahrelang persistieren (Seronarbe), Verlaufskontrollen sind nicht sinnvoll. (AWMF 013-080)'
        ),
        q(
            'Bei einem STEMI ist die Erstlinien-Reperfusion?',
            [
                'Lyse-Therapie binnen 30 min',
                'Primäre PCI binnen 120 min nach Erstkontakt',
                'Aortokoronarer Bypass elektiv binnen 24 h',
                'Konservative Therapie mit ASS und Statin',
                'Heparin-Bolus + Beobachtung'
            ],
            1,
            'STEMI = Time-is-muscle. Primäre perkutane Koronarintervention (PCI) binnen 120 Minuten nach medizinischem Erstkontakt ist Goldstandard. Wenn das nicht erreichbar ist: Lyse-Therapie binnen 12 h, dann transferieren. (ESC STEMI Guidelines 2023)'
        ),
        q(
            'Welcher Wirkstoff hemmt SGLT2 und wirkt zusätzlich kardio- und renoprotektiv unabhängig vom Diabetes-Status?',
            ['Metformin', 'Sitagliptin', 'Empagliflozin', 'Glimepirid', 'Acarbose'],
            2,
            'Empagliflozin (und Dapagliflozin) hemmen SGLT2 im proximalen Tubulus. EMPA-REG, DAPA-HF und EMPEROR-Reduced zeigten klare Mortalitäts- und Hospitalisierungs-Reduktion bei HFrEF — auch bei Nicht-Diabetikern. Heute Säule der HFrEF-Therapie. (ESC HF 2023)'
        ),
        q(
            'Welche Aussage zur Pertussis-Impfung in der Schwangerschaft (STIKO 2024) ist korrekt?',
            [
                'Kontraindiziert in jeder Schwangerschaftswoche.',
                'Empfohlen einmal pro Schwangerschaft, vorzugsweise im 3. Trimenon.',
                'Nur bei nachgewiesener Pertussis-Exposition.',
                'Nur als Lebendimpfstoff zugelassen.',
                'Erst nach Geburt im Wochenbett.'
            ],
            1,
            'STIKO 2024: einmalige Tdap-Impfung in jeder Schwangerschaft, bevorzugt im 3. Trimenon (28.–32. SSW). Ziel: Nestschutz für den Säugling vor Pertussis (höchste Mortalität in den ersten 3 Lebensmonaten). Pertussis-Impfstoffe sind Totimpfstoffe und in der Schwangerschaft sicher. (Epid. Bull. 4/2024)'
        )
    ];

    const QUIZ_FA = [
        q(
            'Ein 82-Jähriger nimmt Ramipril, Amlodipin, Metformin, Amitriptylin, Ibuprofen (b. B.) und Pantoprazol. Er klagt über Schwindel beim Aufstehen, Mundtrockenheit und beginnenden Harnverhalt. Welches Medikament ist im Sinne der PRISCUS-Liste / STOPP-Kriterien am ehesten verantwortlich?',
            ['Ramipril', 'Amlodipin', 'Metformin', 'Amitriptylin', 'Pantoprazol'],
            3,
            'Amitriptylin (TZA) ist stark anticholinerg (Mundtrockenheit, Harnverhalt, Delir-Risiko) und α1-adrenolytisch (orthostatische Hypotonie, Sturzgefahr). PRISCUS-2.0 (2023) und STOPP V3 (2023): potenziell inadäquat im Alter. Alternativen: SSRI/SNRI; bei neuropathischem Schmerz Pregabalin oder Duloxetin.'
        ),
        q(
            'Eine 55-Jährige hat im Routine-Check-up TSH 6,5 mU/l, fT3 und fT4 normwertig, kein Struma, asymptomatisch. Korrektes Vorgehen nach DEGAM?',
            [
                'Sofort L-Thyroxin 50 µg/d.',
                'Manifeste Hypothyreose, Radiojodtherapie.',
                'Latente Hypothyreose: Laborkontrolle in 2–3 Monaten, in der Regel keine sofortige Therapie.',
                'Schilddrüsen-Szintigraphie zum Ausschluss eines autonomen Adenoms.',
                'Feinnadelpunktion wegen Malignomverdacht.'
            ],
            2,
            'Isolierte TSH-Erhöhung bei normalen peripheren Werten = latente Hypothyreose. DEGAM-/AWMF-Empfehlung: bei Asymptomatik (insbesondere &gt; 50 J.) und TSH &lt; 10 mU/l keine sofortige Therapie; Kontrolle nach 2–3 Monaten. Übertherapie erhöht Risiko für Vorhofflimmern und Osteoporose (TRUST 2017).'
        ),
        q(
            'Ein 88-Jähriger mit fortgeschrittener Demenz lehnt in einer rechtsgültigen Patientenverfügung von vor 5 Jahren künstliche Ernährung ab. Die gerichtlich bestellte Tochter (Betreuerin) fordert eine PEG-Anlage. Wie handeln Sie korrekt?',
            [
                'Die Betreuerin entscheidet, Sie weisen ein.',
                'Sie lehnen die Einweisung ab, weil die gültige Patientenverfügung bindet.',
                'Sie geben den Fall an das Betreuungsgericht ab, da Sie sich nicht über die Betreuerin hinwegsetzen dürfen.',
                'Sie legen akut eine Magensonde, um vitale Gefährdung abzuwenden.',
                'Sie weisen darauf hin, dass Patientenverfügungen nach 3 Jahren ungültig werden.'
            ],
            1,
            'BGB § 1827 (vormals § 1901a): eine wirksame, auf die aktuelle Situation zutreffende Patientenverfügung ist bindend. Aufgabe des Betreuers ist es, dem Patientenwillen Geltung zu verschaffen, nicht ihn zu übersteuern. Patientenverfügungen verlieren nicht automatisch ihre Gültigkeit nach Zeitablauf.'
        ),
        q(
            'Welcher CHA₂DS₂-VASc-Punktwert ergibt sich für einen 70-jährigen Mann mit Hypertonie, Diabetes und früherer TIA?',
            ['2', '3', '4', '5', '6'],
            3,
            'Alter 65–74 = 1; Hypertonie = 1; Diabetes = 1; TIA/Stroke in Anamnese = 2 → Summe 5. Klare Indikation zur OAK (DOAK bevorzugt). (ESC AF Guidelines 2024)'
        ),
        q(
            'Ein 68-Jähriger mit gut eingestellter Hypertonie kommt zur Standardimpfung. Welche Empfehlung gilt nach STIKO 2024 für Herpes zoster?',
            [
                'Lebendimpfstoff einmalig.',
                'Totimpfstoff (Shingrix), 2 Dosen im Abstand 2–6 Monate.',
                'Nur bei nachgewiesener Immunsuppression empfohlen.',
                'Erst ab 75 Jahren empfohlen.',
                'Kontraindiziert bei Hypertonie.'
            ],
            1,
            'STIKO Standardimpfung Herpes zoster für alle ab 60 Jahren mit dem adjuvantierten Totimpfstoff Shingrix, 2 Dosen 2–6 Monate auseinander. Der frühere Lebendimpfstoff Zostavax ist in Deutschland nicht mehr verfügbar. (Epid. Bull. 4/2024)'
        ),
        q(
            'Welche Aussage zur Mammographie-Screening-Erweiterung in Deutschland ist aktuell (2024) korrekt?',
            [
                'Das Screening-Programm wird auf 45–74 Jahre erweitert.',
                'Das Programm endet ab 2025 vollständig.',
                'Es ist auf Frauen mit BRCA-Mutation beschränkt.',
                'Mammographie wird durch MRT ersetzt.',
                'Männer ab 50 werden ebenfalls eingeschlossen.'
            ],
            0,
            'Der G-BA hat 2023 die Erweiterung des Mammographie-Screening-Programms auf Frauen 45–74 Jahre beschlossen, Umsetzung gestaffelt ab 2024. Bisheriges Programm: 50–69 Jahre alle 2 Jahre. (G-BA-Beschluss September 2023)'
        ),
        q(
            'Ein 80-jähriger Patient mit Z. n. Magenulkus und KHK soll wegen Hüftarthrose dauerhaft analgetisch behandelt werden. Welche Therapie ist nach PRISCUS am sinnvollsten?',
            [
                'Diclofenac 75 mg täglich p. o.',
                'Naproxen 500 mg zweimal täglich',
                'Paracetamol 1 g bis 4×/d, ggf. niedrig dosiertes Opioid',
                'Metamizol 4 g/d',
                'Glucocorticoid 5 mg Prednisolon dauerhaft'
            ],
            2,
            'NSAR sind im Alter und bei KHK / Ulkus-Anamnese problematisch (GI-Blutung, Niereninsuffizienz, Herzinsuffizienz-Verschlechterung). Paracetamol ist Erstlinie bei muskuloskelettalem Schmerz im Alter; bei unzureichender Wirkung niedrigdosierte Opioide (Tilidin/Naloxon, Tramadol) statt NSAR-Eskalation. Metamizol nur kurzfristig wegen Agranulozytose-Risiko. (PRISCUS 2.0)'
        ),
        q(
            'Ein 73-jähriger Patient mit COPD-Gold-Gruppe E und häufigen Infekt-getriggerten Exazerbationen wird mit LABA + LAMA + ICS behandelt. Was sollte zusätzlich evaluiert werden?',
            [
                'Roflumilast bei chronischer Bronchitis und FEV₁ &lt; 50 %',
                'ICS-Monotherapie als Alternative',
                'Theophyllin retard als Erstlinie',
                'Ambroxol als Schleimlöser',
                'Antitussivum dauerhaft'
            ],
            0,
            'GOLD 2024: bei häufigen Exazerbationen unter LABA+LAMA+ICS und chronischer Bronchitis mit FEV₁ &lt; 50 % kann Roflumilast (PDE-4-Hemmer) zusätzlich erwogen werden. Alternativ Azithromycin-Dauertherapie (Cave Resistenzentwicklung, QT-Verlängerung). ICS-Monotherapie ist obsolet wegen Pneumonie-Risiko.'
        ),
        q(
            'Welche Aussage zur SAPV trifft zu?',
            [
                'SAPV ist nur in Hospizen erbringbar.',
                'SAPV erfordert eine 24/7-Rufbereitschaft des Teams.',
                'Die Verordnung erfolgt ausschließlich durch Klinikärzte.',
                'SAPV deckt nur die letzten 14 Lebenstage ab.',
                'SAPV-Patienten dürfen keine kurative Therapie mehr erhalten.'
            ],
            1,
            'Spezialisierte ambulante Palliativversorgung (SAPV) wird vom Hausarzt oder Klinikarzt verordnet, vom SAPV-Team mit 24/7-Rufbereitschaft erbracht und richtet sich an Patienten mit komplexer Symptomlast, unabhängig von einer Frist. Eine "ergänzende" SAPV neben weiterhin laufender Therapie ist möglich.'
        ),
        q(
            'Welcher Frailty-Phänotyp nach Fried liegt bei mindestens wie vielen Kriterien vor?',
            ['1', '2', '3', '4', '5'],
            2,
            'Frailty-Phänotyp nach Fried: ab 3 von 5 Kriterien (Gewichtsverlust, Erschöpfung, reduzierte Greifkraft, langsame Ganggeschwindigkeit, geringe Aktivität). 1–2 Kriterien = Pre-Frailty.'
        ),
        q(
            'Welche Aussage zur indirekten Sterbehilfe ist juristisch korrekt?',
            [
                'Indirekte Sterbehilfe ist in Deutschland grundsätzlich strafbar.',
                'Sie ist erlaubt, wenn die Symptomlinderung im Vordergrund steht und eine Lebensverkürzung billigend in Kauf genommen wird.',
                'Sie erfordert eine richterliche Genehmigung.',
                'Sie ist nur in Hospizen erlaubt.',
                'Sie unterscheidet sich nicht von aktiver Sterbehilfe.'
            ],
            1,
            'Indirekte Sterbehilfe (Symptomlinderung mit in Kauf genommener Lebensverkürzung, z. B. Morphin bei refraktärer Dyspnoe) ist erlaubt und ärztlich geboten. Aktive Sterbehilfe (gezieltes Töten) bleibt nach § 216 StGB strafbar. Passive Sterbehilfe (Behandlungsabbruch entsprechend Patientenwillen) ist ebenfalls erlaubt.'
        ),
        q(
            'Bei welchem TSH-Wert ist nach DEGAM-Empfehlung eine L-Thyroxin-Substitution bei einer 60-jährigen asymptomatischen Patientin am ehesten indiziert?',
            ['4,5 mU/l', '6,0 mU/l', '8,5 mU/l', '11 mU/l', 'Erst ab 20 mU/l'],
            3,
            'DEGAM/AWMF: bei asymptomatischen Patienten Therapie erst bei TSH ≥ 10 mU/l (außer bei Schwangerschaftswunsch oder Symptomatik). Bei jüngeren Patienten und Symptomen kann eine niedrigere Schwelle sinnvoll sein. Übertherapie erhöht Vorhofflimmer- und Osteoporose-Risiko.'
        )
    ];

    // =========================================================================
    // SCHULUNG REGISTRIEREN
    // =========================================================================

    window.SCHULUNGEN.list.push({
        id: 'allgemeinmedizin',
        code: 'Med-AM',
        name: 'Allgemeinmedizin & Medizinstudium',
        short: 'Allgemeinmedizin',
        desc: 'Vorlesungsbegleitende Selbststudium-Schulung entlang der ÄApprO: Vorklinik (M1), Klinik (M2), PJ und Facharzt-Weiterbildung Allgemeinmedizin. Inhalte basieren auf aktuellen Lehrbüchern (Schmidt/Lang Physiologie 32. Aufl., Rassow Biochemie 5. Aufl., Herold Innere 2024, Aktories Pharmakologie 13. Aufl., Kochen Allgemeinmedizin 5. Aufl.) und Leitlinien (DEGAM, NVL, ESC 2021/2023, GINA 2024, GOLD 2024, PRISCUS 2.0, STOPP/START V3, STIKO 2024).',
        status: 'preparation',
        chapters: [
            {
                id: 'vorklinik_m1',
                title: 'Kapitel 1 — Vorklinik (M1): Basiswissen des Lebens',
                summary: 'Wissenschaftliche Prinzipien der Allgemeinmedizin, Anatomie mit klinischem Bezug (Recurrens, vegetatives NS, LWS-Radikulopathien), Physiologie und Biochemie (Bohr-Effekt, 2,3-BPG, Glykolyse, Purinabbau, CYP-System).',
                pages: [PAGE_PRINZIPIEN, PAGE_ANATOMIE, PAGE_PHYSIO_BIOCHEM],
                quiz: QUIZ_M1
            },
            {
                id: 'klinik_m2',
                title: 'Kapitel 2 — Klinik (M2): Pathophysiologie und Therapie',
                summary: 'Kardiologie (HFrEF Fantastic Four, ACS, Vorhofflimmern mit CHA₂DS₂-VASc), Pneumologie (GINA 2024, GOLD 2024, CRB-65), Pharmakologie (DOAK-Interaktionen, Antibiotic Stewardship) und Lyme-Borreliose nach AWMF 013-080.',
                pages: [PAGE_KARDIO, PAGE_PNEUMO, PAGE_PHARMA_INFEKT],
                quiz: QUIZ_M2
            },
            {
                id: 'pj_facharzt',
                title: 'Kapitel 3 — PJ und Facharzt Allgemeinmedizin',
                summary: 'Multimorbidität und Polypharmazie (PRISCUS 2.0, STOPP/START V3, FORTA), Prävention (Check-up 35, Screening-Programme, STIKO 2024 inkl. RSV-Empfehlung), Geriatrie (Frailty nach Fried, Demenz-Screening), Palliativmedizin (AAPV/SAPV) und juristische Grundlagen (BGB § 1827).',
                pages: [PAGE_POLYPHARMA, PAGE_PRAEVENTION, PAGE_RECHT_GERIATRIE],
                quiz: QUIZ_FA
            }
        ]
    });
})();
