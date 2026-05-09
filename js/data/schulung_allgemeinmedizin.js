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

    const PAGE_PHARMAKO_GRUNDLAGEN = {
        title: '1.4 Pharmakologie-Grundlagen: LADME, Halbwertszeit, Therapeutischer Index',
        html: ''
            + '<p>Pharmakologie-Wissen aus der Vorklinik wird in M2 und in der hausärztlichen Praxis ständig abgerufen. Wer das LADME-Modell verstanden hat, kann Interaktionen, Dosisanpassungen und Nebenwirkungen systematisch herleiten — statt sie auswendig zu lernen.</p>'

            + '<h4>LADME-Modell der Pharmakokinetik</h4>'
            + '<ul>'
            + '<li><strong>Liberation:</strong> Freisetzung des Wirkstoffs aus der Galenik (Tablette, Retard-Form). Klinisch relevant: Retard-Tabletten dürfen nicht zerteilt werden, sonst Dosis-Dumping.</li>'
            + '<li><strong>Absorption:</strong> Aufnahme über GI-Trakt (oral), Haut, Schleimhäute oder direkt i. v. Maß: <em>Bioverfügbarkeit F</em> = Fläche unter der Plasmaspiegelkurve oral / i. v. Beispiele: Propranolol F ≈ 0,3 (hoher First-Pass), Metoprolol F ≈ 0,5; Levothyroxin F ≈ 0,8 nüchtern.</li>'
            + '<li><strong>Distribution:</strong> Verteilung im Körper. Maß: <em>Verteilungsvolumen V_d = Dosis / Plasmakonzentration</em>. Ein hohes V_d (&gt; 1 l/kg) bedeutet starke Gewebeverteilung (Amiodaron V_d ~ 60 l/kg → lange Eliminationsphase).</li>'
            + '<li><strong>Metabolismus:</strong> Phase I (Oxidation, Reduktion, Hydrolyse — v. a. CYP-Enzyme) und Phase II (Konjugation: Glucuronidierung, Sulfatierung). Die Leber ist Hauptort.</li>'
            + '<li><strong>Elimination:</strong> renal (filtriert, sezerniert) oder biliär. Renale Elimination → Dosisanpassung nach eGFR (z. B. Apixaban, DOAK).</li>'
            + '</ul>'

            + '<h4>Halbwertszeit und Steady-State</h4>'
            + '<p>Die Plasmahalbwertszeit $t_{1/2}$ ist die Zeit, in der die Plasmakonzentration auf 50 % abfällt. Formel: $$t_{1/2}=\\frac{\\ln 2 \\cdot V_d}{\\text{CL}}$$ (CL = Clearance). Bei wiederholter Gabe wird der Steady-State nach etwa 4–5 Halbwertszeiten erreicht — daher dauert die Aufdosierung von Levothyroxin (t₁/₂ ~ 7 Tage) etwa 4–6 Wochen bis zur stabilen TSH-Kontrolle.</p>'

            + '<h4>Therapeutischer Index und enge therapeutische Breite</h4>'
            + '<p>Der therapeutische Index = LD₅₀ / ED₅₀ beschreibt die Sicherheitsspanne. Wirkstoffe mit enger Breite erfordern Spiegelmonitoring oder strenges INR-Management:</p>'
            + '<ul>'
            + '<li><strong>Phenprocoumon / Warfarin:</strong> INR-Ziel 2,0–3,0 (mechanische Mitralklappe 2,5–3,5).</li>'
            + '<li><strong>Digoxin:</strong> Zielspiegel 0,5–0,8 ng/ml (HFrEF), Toxizitätsschwelle bereits ab 1,2 ng/ml.</li>'
            + '<li><strong>Lithium:</strong> Zielspiegel 0,6–0,8 mmol/l, Intoxikation ab 1,5 mmol/l.</li>'
            + '<li><strong>Theophyllin:</strong> Zielspiegel 8–15 mg/l.</li>'
            + '<li><strong>Aminoglykoside:</strong> Talspiegel-Monitoring zur Vermeidung von Oto- und Nephrotoxizität.</li>'
            + '</ul>'

            + '<h4>Pharmakogenetik im Alltag</h4>'
            + '<p>Genpolymorphismen erklären inter-individuelle Wirk- und Nebenwirkungs-Differenzen. Praxisrelevante Beispiele:</p>'
            + '<ul>'
            + '<li><strong>CYP2D6:</strong> 7–10 % der Mitteleuropäer sind Poor Metabolizer — Codein wird nicht zu Morphin aktiviert (keine Analgesie); Ultra-rapid Metabolizer hingegen entwickeln rasch Atemdepression.</li>'
            + '<li><strong>CYP2C9 + VKORC1:</strong> Phenprocoumon-Dosis variiert um Faktor 10 zwischen Polymorphismus-Trägern.</li>'
            + '<li><strong>TPMT:</strong> Defekt-Allele führen zu schwerer Knochenmark-Toxizität unter Azathioprin / 6-Mercaptopurin (Standardtest vor Therapiebeginn).</li>'
            + '<li><strong>DPYD:</strong> Defekt-Allele verursachen lebensbedrohliche Toxizität unter 5-FU / Capecitabin (seit 2020 vorgeschriebener Test in der EU).</li>'
            + '</ul>'

            + '<h4>Dosisanpassung bei Niereninsuffizienz</h4>'
            + '<p>Faustregel: vor jeder Verschreibung in der Hausarztpraxis aktuelle eGFR (CKD-EPI, nicht Cockcroft-Gault!) prüfen. Klassische Anpassungen:</p>'
            + '<ul>'
            + '<li><strong>Metformin:</strong> bis eGFR 30 ml/min reduzierte Dosis, &lt; 30 absetzen — Laktatazidose-Risiko.</li>'
            + '<li><strong>DOAK:</strong> Apixaban-Dosisreduktion bei Krea ≥ 1,5 mg/dl + Alter ≥ 80 oder Gewicht ≤ 60 kg.</li>'
            + '<li><strong>Aciclovir:</strong> bei eGFR &lt; 50 reduzieren (sonst kristalline Nephropathie).</li>'
            + '<li><strong>Aminoglykoside:</strong> bei jeder Niereninsuffizienz strenges Spiegelmonitoring.</li>'
            + '</ul>'
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

    const PAGE_ENDOKRIN_HTN = {
        title: '2.4 Endokrinologie, Hypertonie und Lipidstoffwechsel',
        html: ''
            + '<p>Stoffwechselerkrankungen dominieren die hausärztliche Versorgung quantitativ. Diabetes, Hypertonie und Dyslipidämie sind durch klare Leitlinien (NVL, ESH/ESC) standardisiert — Prüfungsfragen zielen typischerweise auf Zielwerte und Stufentherapie.</p>'

            + '<h4>Diabetes mellitus Typ 2 (NVL 2023)</h4>'
            + '<p>HbA1c-Zielwert nach NVL: <strong>individualisiert 6,5–7,5 %</strong> (48–58 mmol/mol). Strenger (≤ 6,5 %) bei jungen, motivierten Patienten ohne Hypoglykämierisiko; höher (bis 8 %) bei multimorbiden, älteren Patienten mit kurzer Lebenserwartung.</p>'
            + '<p>Stufentherapie:</p>'
            + '<ol>'
            + '<li><strong>Stufe 1:</strong> Lebensstil (Ernährung, Bewegung, Gewichtsreduktion) für 3–6 Monate.</li>'
            + '<li><strong>Stufe 2:</strong> Metformin (außer Kontraindikation) — Erstlinie wegen geringer Hypoglykämieneigung und kardiovaskulärer Sicherheit.</li>'
            + '<li><strong>Stufe 3:</strong> Bei kardiovaskulärer Begleiterkrankung oder CKD: SGLT2-Inhibitor oder GLP-1-Agonist hinzufügen — beide mit kardio-/nephroprotektivem Outcome-Benefit (EMPA-REG, LEADER, REWIND).</li>'
            + '<li><strong>Stufe 4:</strong> Insulin (Basal-Insulin abends als Einstieg).</li>'
            + '</ol>'
            + '<p>Metformin ist kontraindiziert bei eGFR &lt; 30 ml/min (Laktatazidose-Risiko); bei eGFR 30–45 reduzierte Dosis. Vor Kontrastmittel-Gabe pausieren.</p>'

            + '<h4>Hypertonie nach ESH 2023 / ESC 2024</h4>'
            + '<p>Definition unverändert: ab 140/90 mmHg in der Praxismessung; ABDM-Tagesmittel ≥ 135/85 mmHg. Zielwerte nach erfolgreicher Eindosierung:</p>'
            + '<ul>'
            + '<li><strong>&lt; 65 Jahre:</strong> 120–129 / 70–79 mmHg</li>'
            + '<li><strong>≥ 65 Jahre:</strong> 130–139 / 70–79 mmHg (sofern toleriert)</li>'
            + '<li><strong>Diabetes / CKD / KHK:</strong> &lt; 130/80, sofern toleriert</li>'
            + '</ul>'
            + '<p>Erstlinien-Therapie nach ESC: <em>Single-Pill Combination</em> aus zwei Substanzen. Bevorzugt ACE-Hemmer (oder ARB) plus Calciumkanalblocker oder Thiazid-Diuretikum. Beta-Blocker sind nicht mehr Erstlinie ohne Komorbidität (HFrEF, KHK, Vorhofflimmern).</p>'
            + '<p>ACE-Hemmer-Husten ist eine häufige Nebenwirkung (5–20 %), bedingt durch Bradykinin-Akkumulation. Lösung: Wechsel auf ARB (Sartan), bei dem dieser Mechanismus fehlt.</p>'

            + '<h4>Lipidstoffwechsel und KHK-Sekundärprävention</h4>'
            + '<p>LDL-Zielwerte nach ESC 2019/2023:</p>'
            + '<ul>'
            + '<li><strong>Sehr hohes Risiko</strong> (manifeste KHK, Diabetes mit Endorganschaden, schwere CKD): LDL &lt; 1,4 mmol/l (55 mg/dl) und ≥ 50 % Reduktion.</li>'
            + '<li><strong>Hohes Risiko:</strong> LDL &lt; 1,8 mmol/l (70 mg/dl).</li>'
            + '<li><strong>Moderates Risiko:</strong> LDL &lt; 2,6 mmol/l (100 mg/dl).</li>'
            + '</ul>'
            + '<p>Erstlinie: Hochintensitäts-Statin (Atorvastatin 40–80 mg oder Rosuvastatin 20–40 mg). Bei Zielverfehlung Add-on: Ezetimib (NPC1L1-Hemmer), bei weiterer Verfehlung PCSK9-Hemmer (Alirocumab, Evolocumab) oder Inclisiran (siRNA).</p>'

            + '<h4>Schilddrüse: Hyper- und Hypothyreose</h4>'
            + '<p><strong>Hyperthyreose</strong> — TSH supprimiert, fT3/fT4 erhöht. DD: Morbus Basedow (TRAK positiv, Autoimmun) vs. Schilddrüsenautonomie (TRAK negativ, szintigraphisch heißer Knoten). Therapie: Thyreostatika (Carbimazol, Thiamazol), bei Versagen Radiojod oder OP.</p>'
            + '<p><strong>Hashimoto-Thyreoiditis</strong> — häufigste Hypothyreose-Ursache in Deutschland. TPO-Antikörper hochtitrig positiv, fragmentierte Echogenität sonographisch. Therapie: L-Thyroxin nach TSH-Ziel (0,4–2,5 mU/l).</p>'

            + '<h4>Cushing- vs. Addison-Syndrom (Kurzdiagnostik)</h4>'
            + '<ul>'
            + '<li><strong>Cushing-Verdacht:</strong> Stammbetonte Adipositas, Striae rubrae, Myopathie, Hypertonie, Osteoporose. Screening: 1-mg-Dexamethason-Hemmtest oder 24-h-Sammelharn-Cortisol oder Mitternachts-Speichel-Cortisol. Ein normaler Suppressionstest (&lt; 1,8 µg/dl morgens) schließt Cushing weitgehend aus.</li>'
            + '<li><strong>Addison-Verdacht</strong> (primäre NNR-Insuffizienz): Hyperpigmentierung, Hyponatriämie/Hyperkaliämie, postural Hypotonie, Müdigkeit. Screening: morgendliches Cortisol + ACTH. Bestätigung: ACTH-Stimulationstest (Synacthen). Therapie: Hydrocortison + Fludrocortison; Patientenschulung Notfallausweis.</li>'
            + '</ul>'
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

    const PAGE_NOTFALL_SCHMERZ = {
        title: '3.4 Notfallmedizin und Schmerztherapie in der Hausarztpraxis',
        html: ''
            + '<p>Auch in der Hausarztpraxis treten lebensbedrohliche Notfälle auf — Anaphylaxie, Hypoglykämie, hypertensive Notfälle, akutes Koronarsyndrom. Strukturiertes Vorgehen nach <em>ABCDE</em> rettet Leben. Ergänzend zur Notfallmedizin: chronische Schmerztherapie nach WHO-Stufenschema ist die häufigste Dauerverordnung im hausärztlichen Alltag.</p>'

            + '<h4>ABCDE-Schema der Notfallversorgung</h4>'
            + '<ul>'
            + '<li><strong>A — Airway:</strong> freie Atemwege? Bewusstsein, Schwellung, Verlegung?</li>'
            + '<li><strong>B — Breathing:</strong> Atemfrequenz, SpO₂, Auskultation. Sauerstoff bei SpO₂ &lt; 94 %.</li>'
            + '<li><strong>C — Circulation:</strong> Puls, RR, Rekapillarisierung, peripherer Zugang.</li>'
            + '<li><strong>D — Disability:</strong> Bewusstsein nach AVPU oder GCS, Pupillen, Blutzucker.</li>'
            + '<li><strong>E — Exposure / Environment:</strong> Ganzkörperinspektion, Temperatur, Anamnese (SAMPLE).</li>'
            + '</ul>'

            + '<h4>Anaphylaxie</h4>'
            + '<p>Notfall-Erstmaßnahme bei systemischer Anaphylaxie (Stadium II–IV nach Ring/Messmer): <strong>Adrenalin i. m. lateral am Oberschenkel</strong> in der Erwachsenendosis 0,3–0,5 mg (1:1000-Lösung). Bei Bedarf nach 5–15 Minuten wiederholen. Frühe Adrenalin-Gabe ist mortalitätsentscheidend; Antihistaminika und Glucocorticoide sind nachgeordnete Maßnahmen mit verzögertem Wirkungseintritt.</p>'
            + '<p>Begleitend: Volumengabe (kristalloid, 500–1000 ml zügig), Sauerstoff, β2-Sympathomimetikum bei Bronchospasmus (Salbutamol DA), Lagerung mit hochgelegten Beinen. Anaphylaxie-Patienten benötigen nach Erstereignis ein Notfallset (Adrenalin-Autoinjektor, Antihistaminikum p. o., Prednisolon p. o.) und Patientenschulung.</p>'

            + '<h4>Hypoglykämie</h4>'
            + '<p>Definition: Blutzucker &lt; 70 mg/dl (3,9 mmol/l) mit Symptomen (Whipple-Trias). Häufige Ursache: Insulin- oder Sulfonylharnstoff-Therapie bei T2DM mit ausgelassener Mahlzeit oder erhöhter körperlicher Belastung.</p>'
            + '<ul>'
            + '<li><strong>Wach, schluckfähig:</strong> 15–20 g schnelle Glucose oral (Traubenzucker, Saft); Re-Test nach 15 min.</li>'
            + '<li><strong>Bewusstlos:</strong> 20–40 ml G40 langsam i. v. oder Glucagon 1 mg i. m. (im Hausbesuch). Glucagon wirkt nicht bei Glykogenspeicher-Erschöpfung (Alkohol, Mangelernährung).</li>'
            + '</ul>'

            + '<h4>Hypertensive Krise vs. hypertensiver Notfall</h4>'
            + '<p>Beide ab RR ≥ 180/120 mmHg, aber:</p>'
            + '<ul>'
            + '<li><strong>Hypertensive Krise (Urgency):</strong> ohne akute Endorganschädigung. Therapie ambulant über Stunden — keine zu schnelle Senkung. Beispiel: Captopril 12,5–25 mg p. o.</li>'
            + '<li><strong>Hypertensiver Notfall (Emergency):</strong> mit akuter Endorganschädigung (Lungenödem, hypertensive Enzephalopathie, ACS, Aortendissektion, Eklampsie). Sofort i. v. (Urapidil, Nitroglycerin), Klinikeinweisung. Senkung um nicht mehr als 25 % in der ersten Stunde — sonst Hypoperfusion vital wichtiger Organe.</li>'
            + '</ul>'

            + '<h4>WHO-Stufenschema der Schmerztherapie</h4>'
            + '<ol>'
            + '<li><strong>Stufe 1:</strong> Nicht-Opioid-Analgetika — Paracetamol (max. 4 g/d, hepatotoxisch ab 8 g akut), NSAR (Ibuprofen, Naproxen — GI-/Renale-Toxizität, KI bei HFrEF), Metamizol (Cave Agranulozytose-Risiko, Aufklärungspflicht).</li>'
            + '<li><strong>Stufe 2:</strong> schwache Opioide — Tramadol, Tilidin/Naloxon. Ceiling-Effekt bei höheren Dosen.</li>'
            + '<li><strong>Stufe 3:</strong> starke Opioide — Morphin, Hydromorphon, Oxycodon, Fentanyl-Pflaster (nur bei stabilem Schmerz!). Adjuvanzien: Antikonvulsiva (Pregabalin, Gabapentin) bei neuropathischem Schmerz; Antidepressiva (Duloxetin) bei chronischem muskuloskelettalem oder neuropathischem Schmerz; Glucocorticoide bei Tumorschmerz mit Knochenbeteiligung.</li>'
            + '</ol>'
            + '<p>Bei Therapieversagen oder unzureichender Wirkung in Stufe 2 ist der direkte Wechsel auf Stufe 3 statt Eskalation der Stufe-2-Dosis empfohlen (kein Mischen Stufe 2 + 3).</p>'

            + '<h4>Opioid-Rotation und Äquivalenzdosen (Anhalt)</h4>'
            + '<p>Faustregel orale Morphin-Äquivalenzdosis (OMED) pro 24 h:</p>'
            + '<ul>'
            + '<li>Morphin oral 30 mg ≈ Hydromorphon oral 4 mg ≈ Oxycodon oral 20 mg</li>'
            + '<li>Morphin oral 30 mg ≈ Morphin s. c./i. v. 10 mg ≈ Fentanyl-Pflaster 12 µg/h</li>'
            + '</ul>'
            + '<p>Bei Rotation 25–30 % Dosis-Reduktion einplanen wegen unvollständiger Kreuztoleranz. Begleitmedikation: <strong>obligat</strong> ein Laxans (Opioid-induzierte Obstipation) und initial ein Antiemetikum (Metoclopramid für 3–5 Tage).</p>'

            + '<h4>BLS / ALS — die wichtigsten Eckdaten</h4>'
            + '<ul>'
            + '<li>Thoraxkompressionen Frequenz 100–120/min, Tiefe 5–6 cm, Verhältnis 30 : 2 (Erwachsene).</li>'
            + '<li>Defibrillation bei Kammerflimmern / pulsloser VT — schockbarer Rhythmus.</li>'
            + '<li>Adrenalin 1 mg i. v./i. o. alle 3–5 min nach 3. Schock (schockbar) bzw. sofort (nicht-schockbar).</li>'
            + '<li>Amiodaron 300 mg i. v. nach 3. Schock bei refraktärem VF.</li>'
            + '<li>4 H und HITS reversibel: Hypoxie, Hypovolämie, Hypo-/Hyperkaliämie, Hypothermie — Herzbeuteltamponade, Intoxikation, Thromboembolie, Spannungspneumothorax.</li>'
            + '</ul>'
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
        ),
        q('Welches Enzym katalysiert den irreversiblen Schritt vom Pyruvat zum Acetyl-CoA?',
            ['Pyruvat-Carboxylase', 'Pyruvat-Dehydrogenase-Komplex (PDH)', 'Pyruvat-Kinase', 'Lactat-Dehydrogenase', 'Citrat-Synthase'],
            1,
            'Der PDH-Komplex katalysiert die oxidative Decarboxylierung von Pyruvat zu Acetyl-CoA in der mitochondrialen Matrix. Coenzyme: TPP, Liponsäure, FAD, NAD⁺, CoA. Klinisch relevant: Vitamin-B1-Mangel (Thiamin) führt zu PDH-Dysfunktion (Wernicke-Enzephalopathie bei chronischem Alkoholismus). (Rassow Biochemie)'),
        q('Wo findet die oxidative Phosphorylierung statt?',
            ['Im Zytosol', 'An der äußeren Mitochondrienmembran', 'An der inneren Mitochondrienmembran', 'Im Lysosom', 'Im glatten ER'],
            2,
            'Die ATP-Synthase und die Atmungskettenkomplexe I–IV sitzen in der inneren Mitochondrienmembran. Pro NADH werden ca. 2,5 ATP, pro FADH₂ ca. 1,5 ATP gebildet. Entkoppler (z. B. 2,4-Dinitrophenol) heben den Protonengradienten auf, die Energie wird als Wärme frei. (Rassow)'),
        q('Welches ist das Schlüsselenzym der Gluconeogenese im Muskel — und warum kann der Muskel nicht zur Glukose-Bereitstellung im Hungerzustand beitragen?',
            ['Hexokinase fehlt', 'Glucose-6-Phosphatase fehlt im Muskel', 'Phosphofructokinase fehlt', 'Fructose-1,6-Bisphosphatase fehlt', 'Pyruvat-Carboxylase fehlt'],
            1,
            'Glucose-6-Phosphatase katalysiert den letzten Schritt der Gluconeogenese (Glucose-6-P → Glucose). Sie kommt nur in Leber und Niere vor, nicht im Muskel. Daher kann der Muskel zwar Glykogen abbauen, aber Glucose nicht ins Blut abgeben — Glykogenolyse im Muskel dient nur dem Eigenbedarf. (Rassow)'),
        q('Welche Hormone wirken antagonistisch zu Insulin und steigern den Blutzucker?',
            ['Somatostatin und Atriopeptin', 'Glucagon, Cortisol, Adrenalin, Wachstumshormon', 'Aldosteron und ADH', 'TSH und ACTH', 'Calcitonin und Parathormon'],
            1,
            'Insulin senkt den Blutzucker; Glucagon, Cortisol, Adrenalin und Wachstumshormon (GH) wirken kontrainsulinär — sie steigern Glykogenolyse und Gluconeogenese und hemmen die periphere Glucoseaufnahme. Klinisch wichtig: Cortisol-Therapie verschlechtert die Diabeteseinstellung. (Schmidt/Lang)'),
        q('Was ist das Schlüsselenzym der Fettsäuresynthese, und wie wird es reguliert?',
            ['ATP-Citrat-Lyase, durch ATP gehemmt', 'Acetyl-CoA-Carboxylase, durch Citrat aktiviert und Palmitoyl-CoA gehemmt', 'Carnitin-Acyltransferase, durch Malonyl-CoA aktiviert', 'HMG-CoA-Reduktase, durch Insulin gehemmt', 'Fructose-1,6-Bisphosphatase, durch AMP aktiviert'],
            1,
            'Acetyl-CoA-Carboxylase (ACC) katalysiert die Bildung von Malonyl-CoA aus Acetyl-CoA — der geschwindigkeitsbestimmende Schritt der Lipogenese. Sie wird allosterisch durch Citrat aktiviert, durch Palmitoyl-CoA und durch Phosphorylierung (Glucagon, Adrenalin) gehemmt. Insulin aktiviert ACC durch Dephosphorylierung. (Rassow)'),
        q('Welcher Transporter limitiert die β-Oxidation langkettiger Fettsäuren in den Mitochondrien?',
            ['SGLT2', 'GLUT4', 'Carnitin-Palmitoyl-Transferase 1 (CPT1)', 'P-Glykoprotein', 'OAT1'],
            2,
            'CPT1 an der äußeren Mitochondrienmembran überträgt Acyl-Reste von Acyl-CoA auf Carnitin und ermöglicht so den Eintritt in den mitochondrialen Matrixraum. CPT1 wird durch Malonyl-CoA gehemmt — dadurch wird β-Oxidation und Lipogenese reziprok reguliert. (Rassow)'),
        q('Welche Aminosäure ist Vorstufe von Adrenalin, Noradrenalin und Dopamin?',
            ['Tryptophan', 'Tyrosin / Phenylalanin', 'Histidin', 'Glutamat', 'Methionin'],
            1,
            'Phenylalanin → Tyrosin → DOPA → Dopamin → Noradrenalin → Adrenalin. Phenylketonurie (PKU) beruht auf einem Defekt der Phenylalanin-Hydroxylase — daher PAH-Mangel führt zu Phenylalanin-Akkumulation und Hirnschäden, wenn nicht durch Neugeborenenscreening (TSH/Phenylalanin) erkannt. (Rassow)'),
        q('Wo wird die Niere durch das ADH (Vasopressin) primär in der Wasserrückresorption beeinflusst?',
            ['proximaler Tubulus', 'absteigender Henle-Schenkel', 'aufsteigender Henle-Schenkel', 'distaler Tubulus', 'Sammelrohr (Aquaporin-2-Einbau)'],
            4,
            'ADH bindet an V2-Rezeptoren der Hauptzellen im Sammelrohr und veranlasst den Einbau von Aquaporin-2 in die luminale Membran. Folge: Wasser wird passiv aus dem hypertonen Lumen in die Markzone resorbiert, der Harn wird konzentriert. Defekte: zentraler Diabetes insipidus (ADH-Mangel) vs. nephrogener Diabetes insipidus (V2-Rezeptor-Defekt). (Schmidt/Lang)'),
        q('Welcher Schritt der Renin-Angiotensin-Aldosteron-Achse wird durch ACE-Hemmer blockiert?',
            ['Renin-Freisetzung in der Macula densa', 'Umwandlung Angiotensinogen → Angiotensin I', 'Umwandlung Angiotensin I → Angiotensin II', 'Bindung von Angiotensin II an den AT1-Rezeptor', 'Aldosteron-Wirkung im Sammelrohr'],
            2,
            'ACE (Angiotensin-Converting-Enzyme) wandelt Angiotensin I in Angiotensin II um. ACE-Hemmer (Ramipril, Enalapril) blockieren diesen Schritt. Bradykinin wird ebenfalls durch ACE abgebaut — dadurch Bradykinin-Akkumulation als Ursache des ACE-Hemmer-Hustens. ARB (Sartane) blockieren erst den AT1-Rezeptor. (Aktories)'),
        q('Welche Aussage zum kardialen Aktionspotenzial trifft zu?',
            ['Phase 0 ist durch K⁺-Einstrom getrieben.', 'Phase 0 (Depolarisation) ist durch Na⁺-Einstrom getrieben (außer Sinus-/AV-Knoten).', 'Phase 2 (Plateau) entsteht durch Na⁺-Ausstrom.', 'Die Repolarisation erfolgt primär durch Cl⁻-Einstrom.', 'Die Refraktärzeit ist beim Kardiomyozyten kürzer als die Aktionspotenzial-Dauer.'],
            1,
            'Im Arbeitsmyokard löst Na⁺-Einstrom über schnelle Na⁺-Kanäle die steile Phase 0 aus. Die Plateauphase 2 entsteht durch Ca²⁺-Einstrom (L-Typ) bei gleichzeitig reduziertem K⁺-Ausstrom. Im Sinus- und AV-Knoten dominiert Ca²⁺-Einstrom in Phase 0 (langsame Antwort) — daher wirken Calciumkanalblocker am Sinus-/AV-Knoten dromotrop negativ. (Schmidt/Lang)'),
        q('Welcher Neurotransmitter wirkt am NMDA-Rezeptor exzitatorisch und ist ein wichtiger Modulator der Langzeitpotenzierung (LTP)?',
            ['GABA', 'Glycin', 'Glutamat', 'Acetylcholin', 'Serotonin'],
            2,
            'Glutamat ist der wichtigste exzitatorische Neurotransmitter im ZNS. Der NMDA-Rezeptor ist ein Glutamat-Rezeptor mit Ca²⁺-Permeabilität, der bei der Langzeitpotenzierung — der zellulären Grundlage des Lernens — aktiviert wird. Memantin ist ein nicht-kompetitiver NMDA-Antagonist und wird in der Demenz-Therapie eingesetzt. (Schmidt/Lang)'),
        q('Welcher Rezeptor wird durch Benzodiazepine moduliert?',
            ['NMDA-Rezeptor', 'Nikotinischer Acetylcholin-Rezeptor', 'GABA_A-Rezeptor', 'GABA_B-Rezeptor', '5-HT₃-Rezeptor'],
            2,
            'Benzodiazepine binden an eine allosterische Bindestelle des GABA_A-Rezeptors (ein Cl⁻-Kanal) und erhöhen die Cl⁻-Leitfähigkeit nach GABA-Bindung — dadurch verstärkte Hyperpolarisation und sedativ-anxiolytische, antikonvulsive, muskelrelaxierende Wirkung. Der GABA_A-Rezeptor wird auch durch Barbiturate, Alkohol, Propofol und Anästhetika moduliert. (Aktories)'),
        q('Was beschreibt die Bioverfügbarkeit (F) korrekt?',
            ['Verhältnis von Plasmaspiegel-Maximum zu verabreichter Dosis', 'Verhältnis der AUC oraler Gabe zu AUC i. v. Gabe', 'Halbwertszeit nach oraler Gabe', 'Plasma-Eiweißbindung', 'Verteilungsvolumen pro kg Körpergewicht'],
            1,
            'Bioverfügbarkeit F = AUC_oral / AUC_iv (jeweils dosisnormiert). I. v. Gabe entspricht definitionsgemäß F = 1. Hoher First-Pass-Effekt (Propranolol, Morphin) reduziert F drastisch. (Aktories)'),
        q('Ein Wirkstoff hat eine Plasma-Halbwertszeit von 12 h. Nach welcher Zeit ist Steady-State unter Dauergabe erreicht?',
            ['Nach 12 h', 'Nach 24 h', 'Nach ca. 2–3 Tagen (4–5 Halbwertszeiten)', 'Nach 1 Woche', 'Nach 2 Wochen'],
            2,
            'Steady-State wird nach 4–5 Halbwertszeiten erreicht. Bei t₁/₂ = 12 h also nach 48–60 h, also ca. 2–3 Tagen. Diese Faustregel gilt unabhängig von der Eindosierung; sie ist auch Grundlage für die "Aufdosierungs-Wartezeit" bei Phenprocoumon, Levothyroxin oder SSRIs. (Aktories)'),
        q('Welcher Cytochrom-P450-Inhibitor ist Bestandteil der HCV-Therapie und blockiert die Apixaban-Elimination?',
            ['Sofosbuvir', 'Ritonavir', 'Glecaprevir', 'Velpatasvir', 'Daclatasvir'],
            1,
            'Ritonavir wird als pharmakokinetischer "Booster" eingesetzt und ist ein potenter CYP3A4- und P-gp-Inhibitor. In der Kombination mit DOAK (Apixaban, Rivaroxaban) sind dadurch Plasmaspiegel und Blutungsrisiko massiv erhöht — Komedikation kontraindiziert oder strenge Dosisanpassung erforderlich. (Fachinformation, EMA 2024)'),
        q('Welche Aussage zur Galle-Salz-Resorption trifft zu?',
            ['Sie erfolgt im Magen', 'Sie erfolgt im Duodenum aktiv', 'Sie erfolgt zu 95 % im terminalen Ileum (enterohepatischer Kreislauf)', 'Sie erfolgt im Colon ascendens', 'Sie erfolgt erst nach Ileozökalklappe'],
            2,
            'Gallensäuren werden zu ca. 95 % im terminalen Ileum aktiv resorbiert (enterohepatischer Kreislauf), nur 5 % gelangen in den Stuhl. Bei Resektion oder Erkrankung des terminalen Ileums (M. Crohn) → Gallensäureverlust-Syndrom mit chologener Diarrhoe. Therapie: Colestyramin. (Herold)'),
        q('Welcher Vitamin-K-abhängige Faktor ist bei oraler Antikoagulation mit Phenprocoumon zuerst niedrig?',
            ['Faktor II', 'Faktor VII', 'Faktor IX', 'Faktor X', 'Protein C'],
            1,
            'Vitamin-K-abhängige Faktoren: II, VII, IX, X (1972) sowie Protein C und S. Die Halbwertszeiten sind unterschiedlich: VII ca. 6 h (kürzeste), II ca. 60 h. Daher fällt Faktor VII unter Phenprocoumon zuerst, INR steigt rasch — die effektive Antikoagulation tritt aber erst ein, wenn auch II abfällt. Cumarin-Nekrose-Risiko zu Beginn durch früheren Protein-C-Abfall (kürzere HWZ als II). (Aktories)'),
        q('Welcher Zelltyp produziert Surfactant in der Lunge?',
            ['Typ-I-Pneumozyt', 'Typ-II-Pneumozyt', 'Alveolarmakrophage', 'Klara-Zelle', 'Becherzelle'],
            1,
            'Typ-II-Pneumozyten (alveoläre Epithelzellen Typ II) produzieren Surfactant — Phospholipid-Protein-Gemisch (DPPC, SP-A bis SP-D), das die Oberflächenspannung reduziert und Atelektasen verhindert. Surfactant-Mangel bei Frühgeborenen → Atemnotsyndrom (IRDS); Therapie mit exogenem Surfactant. (Schmidt/Lang)'),
        q('Welche Funktion hat die Macula densa in der Niere?',
            ['Erythropoietin-Bildung', 'Renin-Speicherung', 'Sensorzellen für NaCl-Konzentration im distalen Tubulus → Steuerung der Renin-Freisetzung', 'Aldosteron-Produktion', 'ADH-Sensoren'],
            2,
            'Die Macula densa besteht aus spezialisierten Tubulusepithelzellen am distalen Tubulus, die die NaCl-Konzentration messen. Bei niedriger NaCl-Konzentration → Stimulation der Renin-Freisetzung aus den juxtaglomerulären Zellen (tubuloglomerulärer Feedback). NSAR hemmen die Prostaglandin-vermittelte Vasodilatation der Vas afferens und verschlechtern dadurch die GFR — kritisch bei vorbestehender CKD. (Schmidt/Lang)'),
        q('Welcher Blutgerinnungsfaktor verbindet extrinsischen und intrinsischen Weg?',
            ['Faktor V', 'Faktor X', 'Fibrinogen', 'Thrombin (IIa)', 'von-Willebrand-Faktor'],
            1,
            'Faktor X bildet zusammen mit Faktor V und Calcium den Prothrombinase-Komplex, der Prothrombin (II) zu Thrombin (IIa) aktiviert. Faktor X ist Schnittpunkt von extrinsischem (Tissue Factor / VIIa) und intrinsischem Weg. Direkte Faktor-Xa-Inhibitoren (Apixaban, Rivaroxaban, Edoxaban) sind Standard-DOAK. (Aktories)'),
        q('Welcher Hirnnerv versorgt die Kau-Muskulatur und ist somatosensibel für die vorderen 2/3 der Zunge?',
            ['N. olfactorius (I)', 'N. trigeminus, V3', 'N. facialis (VII)', 'N. glossopharyngeus (IX)', 'N. hypoglossus (XII)'],
            1,
            'N. trigeminus, V3 (Mandibularis) versorgt motorisch die Kau-Muskulatur (Mm. masseter, temporalis, pterygoidei) und somatosensibel die vorderen 2/3 der Zunge. Geschmack der vorderen 2/3 wird durch die Chorda tympani (N. facialis) übertragen, die V3 anlagert. (Prometheus)'),
        q('Welcher Muskel hebt die Großzehe (Dorsalextension) und ist primär durch L5 versorgt?',
            ['M. tibialis anterior', 'M. extensor hallucis longus', 'M. peroneus longus', 'M. gastrocnemius', 'M. flexor hallucis longus'],
            1,
            'Der M. extensor hallucis longus wird von L5 innerviert und ist klassischer Muskeltest bei L5-Wurzel-Kompression (Bandscheibenvorfall L4/L5). Schwäche der Großzehenheber bei normaler Plantarflexion: typisch L5. (Prometheus)'),
        q('Welche Struktur passiert nicht den Karpaltunnel?',
            ['N. medianus', 'Sehne des M. flexor pollicis longus', 'Sehnen der Mm. flexores digitorum superficialis und profundus', 'A. ulnaris', 'Sehne des M. flexor carpi radialis (in eigener Loge)'],
            3,
            'Im Karpaltunnel verlaufen N. medianus + 9 Beugesehnen (FPL, 4× FDS, 4× FDP). Die A. ulnaris verläuft im Loge-de-Guyon-Kanal radial der Pisiforme zusammen mit dem N. ulnaris — nicht durch den Karpaltunnel. Karpaltunnelsyndrom: Mediansus-Kompression mit Parästhesien Daumen/Zeigefinger/Mittelfinger, Thenar-Atrophie. (Prometheus)'),
        q('Welcher Teil der Atemmechanik beschreibt die Compliance der Lunge?',
            ['Volumen-Druck-Beziehung — ΔV / ΔP', 'Druck-Strömungs-Beziehung — ΔP / Q', 'Verhältnis Atemfrequenz zu Tidalvolumen', 'Sauerstoffaufnahme pro Atemzug', 'Diffusionskapazität für CO'],
            0,
            'Compliance C = ΔV / ΔP. Sie misst die Dehnbarkeit der Lunge. Niedrige Compliance bei Fibrose, ARDS (steife Lunge); hohe Compliance bei Emphysem (schlaffe Lunge mit verlorener elastischer Rückstellkraft). Bei Surfactant-Mangel sinkt die Compliance ebenfalls. (Schmidt/Lang)'),
        q('Welcher Ionenstrom verursacht die typische ST-Hebung im STEMI auf dem EKG?',
            ['Vermehrter K⁺-Ausstrom', 'Verlängerte Repolarisation durch Ca²⁺', 'Verletzungsstrom durch ischämische Zellen mit veränderter Ionenpermeabilität', 'Hyperpolarisation des Vorhofs', 'Vorzeitige Sinusknoten-Entladung'],
            2,
            'Ischämische Zellen verlieren K⁺ und werden weniger negativ polarisiert. In der ST-Strecke (eigentlich isoelektrisch nach Phase-0-Depolarisation) entsteht so ein "Verletzungsstrom" zwischen ischämischen und gesunden Zellen — auf dem EKG als ST-Hebung sichtbar. Reziproke ST-Senkung in gegenüberliegenden Ableitungen. (Herold)'),
        q('Welche Aussage zum Säure-Basen-Haushalt ist korrekt?',
            ['Die Henderson-Hasselbalch-Gleichung lautet pH = pKa + log([HCO₃⁻] / pCO₂)', 'Das Bikarbonat ist Hauptpuffer im Erythrozyten', 'Eine respiratorische Azidose wird vor allem renal ausgeglichen', 'Eine metabolische Alkalose ist häufig bei chronischem Erbrechen', 'Alle obigen Aussagen sind korrekt'],
            4,
            'Alle Aussagen sind richtig. Die Henderson-Hasselbalch-Gleichung beschreibt das Bikarbonat-Puffersystem; Hb ist Hauptpuffer in der Erythrozyte (Bikarbonat im Plasma); respiratorische Azidose wird langsam renal kompensiert (vermehrte HCO₃⁻-Reabsorption); chronisches Erbrechen führt zu HCl-Verlust → metabolische Alkalose. (Schmidt/Lang)'),
        q('Wie groß ist näherungsweise die normale glomeruläre Filtrationsrate (GFR) eines gesunden jungen Erwachsenen?',
            ['ca. 30 ml/min', 'ca. 60 ml/min', 'ca. 90–120 ml/min', 'ca. 200 ml/min', 'ca. 500 ml/min'],
            2,
            'Normale GFR: ca. 90–120 ml/min/1,73 m². Stadien CKD nach KDIGO: G1 ≥ 90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 &lt; 15. Mit Alter sinkt die GFR um ca. 1 ml/min/Jahr ab dem 30. Lebensjahr. (Herold)'),
        q('Welcher Hormon-Effekt erklärt die Hyperkaliämie unter Spironolacton?',
            ['Spironolacton aktiviert den ENaC im Sammelrohr', 'Spironolacton blockiert den Mineralokortikoid-Rezeptor — weniger K⁺-Ausscheidung', 'Spironolacton stimuliert die Aldosteron-Produktion', 'Spironolacton erhöht die GFR', 'Spironolacton hemmt den NKCC2'],
            1,
            'Spironolacton ist ein Mineralokortikoid-Rezeptor-Antagonist (MRA). Aldosteron stimuliert normalerweise Na⁺-Reabsorption und K⁺-Sekretion im Sammelrohr; durch MRA-Blockade wird K⁺ retiniert → Hyperkaliämie-Risiko, vor allem bei CKD oder Komedikation mit ACE-Hemmer / ARB. (Aktories)'),
        q('Welcher Faktor stimuliert die Erythropoetin-Bildung in der Niere?',
            ['Hyperkalämie', 'Hypoxie (HIF-Stabilisierung)', 'Hyperkalziämie', 'Hypernatriämie', 'Hypoglykämie'],
            1,
            'Erythropoetin wird in den peritubulären Fibroblasten der Niere gebildet. Bei Hypoxie wird der Hypoxia-Inducible-Factor (HIF) stabilisiert und transkribiert das EPO-Gen. Klinisch: CKD-Anämie durch EPO-Mangel — Therapie mit Erythropoese-stimulierenden Substanzen (ESA) wie Epoetin oder dem HIF-Stabilisator Roxadustat. (Schmidt/Lang)'),
        q('Welche Aussage zur Gerinnung mit Heparin trifft zu?',
            ['Unfraktioniertes Heparin (UFH) bindet Antithrombin III und beschleunigt dessen Hemmung von Faktor IIa und Xa.', 'Niedermolekulare Heparine hemmen primär Thrombin (IIa).', 'Heparin verlängert die INR.', 'Heparin überquert die Plazenta-Schranke.', 'Heparin wird über CYP3A4 abgebaut.'],
            0,
            'UFH bindet Antithrombin III über eine Pentasaccharid-Sequenz; der Komplex hemmt v. a. IIa (Thrombin) und Xa. NMH (Enoxaparin, Dalteparin) hemmen überwiegend Xa, weniger IIa. UFH-Monitoring durch aPTT, NMH-Monitoring (selten) durch Anti-Xa-Aktivität. Heparin überquert die Plazenta nicht — daher Mittel der Wahl in der Schwangerschaft. (Aktories)'),
        q('Welcher Mechanismus erklärt die analgetische Wirkung von Paracetamol?',
            ['Direkter Antagonist am μ-Opioid-Rezeptor', 'Hemmung der peripheren COX-2', 'Zentrale Hemmung der COX (vermutlich COX-3 oder zentrale COX-2-Isoform) und Modulation des Endocannabinoid-Systems', 'Hemmung der Lipoxygenase', 'Aktivierung der ASIC-Kanäle'],
            2,
            'Paracetamol wirkt vermutlich durch zentrale COX-Hemmung (umstritten ob COX-3 / spezifische COX-2-Isoform) und über aktive Metaboliten, die ans Endocannabinoid-System binden. Periphere antiinflammatorische Wirkung ist gering — daher anders als NSAR. Hepatotoxizität durch NAPQI bei Glutathion-Erschöpfung; Antidot N-Acetylcystein. (Aktories)'),
        q('Was beschreibt die Phase II der Arzneimittel-Metabolisierung?',
            ['Oxidation, Reduktion, Hydrolyse', 'Konjugation mit Glucuronsäure, Sulfat, Glycin oder Glutathion', 'Aktiver Transport durch P-Glykoprotein', 'Plasma-Eiweißbindung', 'Renale Sekretion über OATs'],
            1,
            'Phase I: funktionelle Gruppen einführen oder demaskieren (CYP-Enzyme, Reduktionen). Phase II: Konjugation der hydrophilen Gruppe — Glucuronidierung (UGT), Sulfatierung (SULT), Acetylierung (NAT), Methylierung (TPMT, COMT), GSH-Konjugation. Ziel: bessere Wasserlöslichkeit für renale/biliäre Ausscheidung. (Aktories)'),
        q('Was bewirkt die Aktivierung der α2-Adrenozeptoren?',
            ['Vasokonstriktion peripher', 'Bronchodilatation', 'Präsynaptische Hemmung der Noradrenalin-Freisetzung', 'Tachykardie', 'Lipolyse'],
            2,
            'α2-Rezeptoren sitzen präsynaptisch und vermitteln eine Autoinhibition: nach NA-Freisetzung bremsen sie die weitere Ausschüttung (negativ-feedback). Klinisch: Clonidin (zentraler α2-Agonist) → Sympathikusdämpfung, Blutdruck-Senkung, Sedierung; auch in der Anästhesie und beim Opioid-Entzug eingesetzt. (Aktories)'),
        q('Welcher Wirkstoff ist ein selektiver SGLT2-Inhibitor mit nachgewiesenem renoprotektivem Effekt bei CKD (DAPA-CKD-Studie)?',
            ['Sitagliptin', 'Liraglutid', 'Dapagliflozin', 'Pioglitazon', 'Metformin'],
            2,
            'Dapagliflozin (und Empagliflozin) hemmen SGLT2 im proximalen Tubulus. DAPA-CKD und EMPA-KIDNEY zeigten signifikante Reduktion der CKD-Progression auch bei Nicht-Diabetikern. Heute Standard-Add-on bei CKD mit Albuminurie. (NEJM 2020/2022)'),
        q('Welche Aussage zur klassischen Wirkung der Schilddrüsenhormone (T3/T4) trifft zu?',
            ['Sie senken den Grundumsatz.', 'Sie führen zu Bradykardie und Hypothermie.', 'T4 ist die aktive Form, T3 inaktiv.', 'Sie binden an nukleäre Rezeptoren und steigern den Grundumsatz, die Wärmebildung sowie die kardiale Sensitivität für Katecholamine.', 'Sie hemmen die Glukoneogenese.'],
            3,
            'Schilddrüsenhormone binden an nukleäre Rezeptoren und regulieren die Genexpression — Steigerung des Grundumsatzes, Wärmeproduktion, β-Adrenozeptor-Expression (Tachykardie bei Hyperthyreose). T4 ist die "Speicherform"; aktive Form ist T3 (durch Dejodase intrazellulär gebildet). (Schmidt/Lang)'),
        q('Welche Aussage zur Halbwertszeit von Levothyroxin im Hinblick auf TSH-Kontrollen trifft zu?',
            ['t₁/₂ ca. 6 h, Kontrolle nach 2 Tagen', 't₁/₂ ca. 24 h, Kontrolle nach 1 Woche', 't₁/₂ ca. 7 Tage, frühestens nach 4–6 Wochen TSH-Kontrolle (Steady-State)', 't₁/₂ ca. 14 Tage, Kontrolle erst nach 3 Monaten', 't₁/₂ ca. 1 h, daher mehrere Tagesdosen'],
            2,
            'Levothyroxin (T4) hat eine Plasma-Halbwertszeit von ca. 7 Tagen. Steady-State und damit aussagefähiges TSH werden erst nach 4–5 Halbwertszeiten erreicht — frühestens 4–6 Wochen nach Dosisanpassung kontrollieren. Vor diesem Zeitpunkt sind TSH-Werte nicht interpretierbar. (Aktories)'),
        q('Was beschreibt der erste Hauptsatz der Pharmakokinetik (Lineare Pharmakokinetik 1. Ordnung)?',
            ['Eliminationsrate ist konstant unabhängig von der Konzentration.', 'Eliminationsrate ist proportional zur Konzentration — gleichbleibende Halbwertszeit.', 'Eliminationsrate verdoppelt sich mit jeder Dosisverdopplung exponentiell.', 'Es gibt keine Halbwertszeit.', 'Halbwertszeit verkürzt sich bei höherer Dosis.'],
            1,
            'Lineare (1. Ordnung) Kinetik: dC/dt = -k·C — die Elimination ist proportional zur Konzentration; t₁/₂ ist konstant. Beispiele: die meisten Wirkstoffe in therapeutischer Dosis. Sättigungs- (0. Ordnung) Kinetik tritt z. B. bei Ethanol oder Phenytoin im hochdosierten Bereich auf — kleine Dosiserhöhungen führen dann zu disproportionalem Spiegelanstieg. (Aktories)'),
        q('Welche Aussage zur Verteilung von Arzneistoffen im Körper trifft zu?',
            ['Das Verteilungsvolumen V_d ist immer gleich dem Plasmavolumen.', 'V_d &gt; Gesamtkörperwasser bedeutet starke Gewebebindung (z. B. Amiodaron, Digoxin).', 'Stark plasmaeiweißgebundene Substanzen haben ein hohes V_d.', 'V_d ist unabhängig von Lipophilie.', 'V_d hat keinen Einfluss auf die Loading-Dose.'],
            1,
            'V_d = Dosis / Plasmakonzentration. Substanzen mit starker Gewebebindung (Amiodaron V_d ≈ 60 l/kg, Digoxin V_d ≈ 7 l/kg) haben ein V_d weit über dem Gesamtkörperwasser. Stark plasmaeiweißgebundene Stoffe (z. B. Warfarin) haben dagegen ein niedriges V_d. Loading-Dose = V_d × Ziel-C, d. h. V_d bestimmt die Aufsättigung. (Aktories)')
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
        ),
        q('Welche Erstlinien-Therapie der HFrEF (LVEF ≤ 40 %) ist nach ESC HF 2023 nicht Bestandteil der "Fantastic Four"?',
            ['ARNI / ACE-Hemmer', 'Beta-Blocker (Bisoprolol, Carvedilol, Metoprolol-Succinat)', 'MRA (Spironolacton, Eplerenon)', 'SGLT2-Inhibitor (Dapagliflozin, Empagliflozin)', 'Digitalis'],
            4,
            'Die "Fantastic Four" der HFrEF-Therapie sind ARNI/ACE-Hemmer, BB, MRA, SGLT2i — alle mit prognoseverbessernder Evidenz. Digitalis ist Reservemittel zur symptomatischen Frequenzkontrolle bei Vorhofflimmern, jedoch ohne Mortalitätsbenefit (DIG-Studie). (ESC HF 2021/2023)'),
        q('Ein 68-Jähriger mit Vorhofflimmern, Hypertonie, Diabetes, Z. n. TIA. Wie hoch ist sein CHA₂DS₂-VASc-Score und wie ist die Antikoagulationsindikation?',
            ['Score 3, OAK fakultativ', 'Score 4, OAK indiziert (DOAK 1. Wahl)', 'Score 5, OAK indiziert (DOAK 1. Wahl)', 'Score 6, ASS ausreichend', 'Score 2, OAK nicht indiziert'],
            2,
            'CHA₂DS₂-VASc: C(HF)=0, H(HTN)=1, A(≥75)=0, D(DM)=1, S(Stroke/TIA)=2, V=0, A(65–74)=1, Sc(weibl)=0 → Summe 5. Ab Score ≥ 2 (Männer) bzw. ≥ 3 (Frauen) klare OAK-Indikation. DOAK sind 1. Wahl bei nicht-valvulärem AFib. (ESC AF 2024)'),
        q('Welche Aussage zur GINA-Stufentherapie (2024) bei Erwachsenen-Asthma ist richtig?',
            ['Auf allen Stufen 1–5 sind kurzwirksame β2-Agonisten (SABA) als Monotherapie 1. Wahl.', 'GINA empfiehlt seit 2019 keine SABA-Monotherapie mehr; stattdessen ICS-Formoterol als Kontroller und Reliever.', 'LABA als Monotherapie ist sicher.', 'Tiotropium ist Erstlinie ab Stufe 1.', 'Theophyllin ist Standardtherapie.'],
            1,
            'GINA 2024 (Track 1): ICS-Formoterol (Budesonid-Formoterol oder Beclomethason-Formoterol) ist Reliever und Kontroller in allen Stufen — auch bei mildem Asthma. SABA-Monotherapie wurde verlassen wegen erhöhter Mortalität (SMART-Konzept). Track 2 (mit SABA-Reliever) ist Alternative bei schlechter Compliance.'),
        q('Welcher CRB-65-Score-Wert führt nach DEGAM/AWMF zur stationären Einweisung bei ambulant erworbener Pneumonie?',
            ['CRB-65 = 0', 'CRB-65 ≥ 1 (zumindest erwägen)', 'CRB-65 = 5', 'CRB-65 ist obsolet', 'CRB-65 nur bei Influenza'],
            1,
            'CRB-65 (Confusion, Atemfrequenz ≥ 30, RR sys &lt; 90 oder diast ≤ 60, Alter ≥ 65): 0 = ambulant; ≥ 1 = stationäre Aufnahme erwägen; ≥ 2 = klar stationär; ≥ 3 = ICU-Indikation prüfen. (AWMF S3 020-020)'),
        q('Welches Antibiotikum ist bei ambulant erworbener Pneumonie ohne Komorbiditäten Erstlinie nach AWMF S3 (2021)?',
            ['Ciprofloxacin', 'Cefuroxim oral', 'Aminopenicillin (Amoxicillin) oral', 'Clindamycin', 'Meropenem'],
            2,
            'AWMF S3 CAP 020-020: Aminopenicillin (Amoxicillin) ist Erstlinie bei jüngeren Patienten ohne Komorbiditäten. Bei Komorbiditäten Aminopenicillin + β-Laktamase-Inhibitor (Amoxicillin/Clavulansäure). Makrolide nur bei V. a. atypische Erreger oder β-Laktam-Allergie. Fluorchinolone sind Reservemittel.'),
        q('Welcher Befund spricht am ehesten für eine bakterielle Sinusitis (DEGAM "Halsschmerzen / Rhinosinusitis")?',
            ['Symptomdauer &lt; 5 Tage', 'Symptomdauer &gt; 10 Tage oder Verschlechterung nach initialer Besserung ("double sickening")', 'Klare wässrige Rhinorrhoe', 'Niesen und tränende Augen', 'Anosmie isoliert'],
            1,
            'Hinweise auf bakterielle akute Rhinosinusitis: Symptomdauer &gt; 10 Tage, "double sickening" (Verschlechterung nach Besserung), eitrige Sekretion, Fieber &gt; 38,5 °C, einseitige Schmerzen. Die meisten akuten Rhinosinusitiden sind viral und selbstlimitierend; Antibiotika nur bei klarer bakterieller Genese. (DEGAM/AWMF)'),
        q('Welche Aussage zur Therapie der akuten unkomplizierten Zystitis bei nicht-schwangeren Frauen ist korrekt (S3 043-044)?',
            ['Ciprofloxacin 500 mg 1× täglich für 7 Tage ist 1. Wahl.', 'Fosfomycin-Trometamol 3 g einmalig oder Nitrofurantoin 100 mg 4× tgl. für 5 Tage sind 1. Wahl.', 'Cotrimoxazol für 14 Tage', 'Cefuroxim für 7 Tage 1. Wahl', 'Erythromycin 500 mg für 5 Tage'],
            1,
            'AWMF S3 043-044: Fosfomycin-Trometamol 3 g einmalig oder Nitrofurantoin 100 mg 4× für 5 Tage. Auch Pivmecillinam ist 1. Wahl. Fluorchinolone sind aufgrund von Resistenzentwicklung und Nebenwirkungsprofil (Tendinopathie, Aortendissektion) als 1. Wahl bei unkomplizierten Infekten verlassen worden.'),
        q('Welcher Befund ist bei akuter Lumbago ("Hexenschuss") nach AWMF NVL Kreuzschmerz Indikation für Bildgebung?',
            ['Schmerz &gt; 3 Tage', 'Reflexabschwächung ASR ohne weitere Symptome', 'Red Flags: Trauma, Tumoranamnese, neurologisches Defizit, Fieber, Kortisonlangzeitanwendung, schwere ungeklärte Gewichtsabnahme', 'Schmerz seit 6 Wochen ohne Red Flag', 'Beruflicher Stress'],
            2,
            'NVL Kreuzschmerz: keine Routine-Bildgebung in den ersten 6 Wochen ohne Red Flags. Red Flags = Hinweise auf spezifische Genese (Fraktur, Malignom, Infekt, Cauda equina). Ohne diese Frühmobilisation, Schmerztherapie nach WHO-Stufe, Aufklärung. (NVL Kreuzschmerz 2017)'),
        q('Welche Aussage zur S3-Leitlinie Husten (053-013) trifft zu?',
            ['Akuter Husten &lt; 8 Wochen ist meist viral; Antibiotika nur bei klarer bakterieller Genese.', 'Antibiotika sind Standardtherapie bei jedem akuten Husten.', 'CT-Thorax bei jedem Husten &gt; 1 Woche.', 'Codein ist 1. Wahl.', 'Ein Sputum-Antigen-Test ist obligat.'],
            0,
            'S3 053-013: akuter Husten &lt; 8 Wochen ist überwiegend viral; symptomatische Therapie. Bei Husten &gt; 8 Wochen (chronisch) Abklärung — Bronchitis, Asthma, GERD, ACE-Hemmer-induziert, postnasal-drip, Tumor. Diagnostik gestuft.'),
        q('Eine 30-Jährige stellt sich mit Erythema migrans vor. Welche Therapie ist 1. Wahl nach AWMF 013-080?',
            ['Penicillin V 3× 1,5 Mio IE für 7 Tage', 'Doxycyclin 200 mg/d für 10–14 Tage', 'Ceftriaxon 2 g i. v. für 21 Tage', 'Azithromycin 500 mg für 5 Tage', 'Keine Therapie nötig'],
            1,
            'AWMF 013-080 Lyme-Borreliose: Erythema migrans → orales Doxycyclin 200 mg/d für 10–14 Tage. Alternativen: Amoxicillin oder Cefuroxim-Axetil. Doxycyclin ist KI in der Schwangerschaft und bei Kindern &lt; 9 Jahren — dann Amoxicillin. Ceftriaxon i. v. nur bei Neuroborreliose oder Lyme-Karditis 3°.'),
        q('Welcher Mechanismus erklärt den ACE-Hemmer-induzierten Husten?',
            ['Direkte Bronchokonstriktion durch ACE-Hemmer', 'Bradykinin- und Substanz-P-Akkumulation durch ACE-Hemmung', 'Eosinophile Lungeninfiltration', 'Zentrale Hustenstimulation', 'Reflux-induziert'],
            1,
            'ACE baut nicht nur Angiotensin I ab, sondern auch Bradykinin und Substanz P. Unter ACE-Hemmern reichern diese Mediatoren in den Atemwegen an und reizen den Hustenreflex. Auswege: Wechsel auf ARB (Sartan) — keine Bradykinin-Akkumulation. Inzidenz Husten unter ACE-Hemmer ca. 10–15 %.'),
        q('Welche Aussage zur Glomerulonephritis vs. Pyelonephritis ist richtig?',
            ['Pyelonephritis zeigt typisch Proteinurie nephritischen Ausmaßes.', 'Akute Glomerulonephritis zeigt Hämaturie mit dysmorphen Erythrozyten und Erythrozyten-Zylindern, ggf. Proteinurie und Hypertonie.', 'Pyelonephritis ist immer chronisch.', 'Eine Glomerulonephritis verursacht typische Flankenschmerzen.', 'Eine Pyelonephritis verursacht Erythrozyten-Zylinder.'],
            1,
            'Glomerulonephritis: nephritisches Syndrom (Hämaturie mit Erythrozyten-Zylindern, milde Proteinurie, RR-Erhöhung, GFR-Verlust) oder nephrotisches Syndrom (Proteinurie &gt; 3,5 g/d, Hypoalbuminämie, Ödeme, Hyperlipidämie). Pyelonephritis: Fieber, Flankenschmerz, Leukozyturie, Bakteriurie. (Herold)'),
        q('Welche Aussage zum akuten Koronarsyndrom (ACS) trifft zu?',
            ['STEMI = ST-Hebung in mindestens 2 benachbarten Ableitungen → sofortige Reperfusion (PCI &lt; 90 min).', 'NSTEMI hat normale Troponin-Werte.', 'Instabile Angina hat erhöhte Troponin-Werte.', 'Reperfusion ist beim NSTEMI nicht indiziert.', 'Beim STEMI ist Lyse 1. Wahl in der City.'],
            0,
            'STEMI: ST-Hebung in 2 benachbarten Ableitungen, sofortige Koronarintervention (Door-to-Balloon &lt; 90 min in PCI-Zentrum, Lyse nur bei nicht erreichbarem PCI-Zentrum &gt; 120 min). NSTEMI: Troponin-Erhöhung, ST-Senkung/T-Negativierung; instabile AP: typische Klinik ohne Troponin-Erhöhung. (ESC ACS 2023)'),
        q('Was ist der häufigste auslösende Erreger der akuten Bronchitis?',
            ['S. pneumoniae', 'H. influenzae', 'Mycoplasma pneumoniae', 'Viren (Rhino-, Influenza-, RSV-Viren)', 'M. tuberculosis'],
            3,
            'Über 90 % der akuten Bronchitiden sind viral (Rhino-, Influenza-, RSV-, Adenoviren). Antibiotika sind nicht indiziert; symptomatische Therapie. Ausnahme: Pertussis (Bordetella pertussis) bei prolongiertem Husten &gt; 2 Wochen — hier Makrolid. (DEGAM)'),
        q('Welcher Befund ist KEIN Hinweis auf einen Status asthmaticus?',
            ['Schwierigkeit zu sprechen', 'Sauerstoffsättigung &lt; 92 % unter Raumluft', '"Stille Lunge" auskultatorisch', 'Hyperventilations-Tachypnoe', 'Bradykardie und Bewusstseinstrübung'],
            3,
            'Schwerer Asthmaanfall / Status asthmaticus: kein Sprechen möglich, AF erhöht, SpO₂ &lt; 92 %, "stille Lunge" (Atemgeräusche kaum hörbar), Bradykardie und Bewusstseinstrübung sind PräFinalzeichen. Hyperventilations-Tachypnoe ist eher Anfall, aber kein eindeutig "schweres Stadium"-Kriterium. (GINA 2024)'),
        q('Welche Aussage zur Diabetes-mellitus-Diagnose nach NVL 2023 ist korrekt?',
            ['HbA1c ≥ 6,5 % (48 mmol/mol) oder Nüchternblutzucker ≥ 126 mg/dl oder oGTT-2h-Wert ≥ 200 mg/dl bestätigen DM.', 'Eine einmalige Glucose-Messung reicht.', 'HbA1c ist nur unter Insulintherapie aussagekräftig.', 'Der oGTT ist obsolet.', 'Nüchternblutzucker &gt; 100 mg/dl bedeutet Diabetes.'],
            0,
            'Diagnostik DM: HbA1c ≥ 6,5 % (48 mmol/mol), Nüchternglukose ≥ 126 mg/dl (zweimalig), oGTT 2h-Wert ≥ 200 mg/dl, oder Gelegenheitsglukose ≥ 200 mg/dl mit Symptomatik. Bei einmaligem grenzwertigem Wert Bestätigung am 2. Tag. (NVL Diabetes 2023)'),
        q('Welche Therapie-Erstlinie ist bei Hypertonie ohne weitere Komorbiditäten nach ESH 2023 / ESC 2024 standard?',
            ['Single-Pill-Kombination ACE-Hemmer/ARB + Calcium-Antagonist oder + Thiazid-Diuretikum als Initialtherapie', 'β-Blocker-Monotherapie', 'Spironolacton-Monotherapie', 'α-Blocker-Monotherapie', 'Clonidin-Monotherapie'],
            0,
            'ESH 2023 / ESC 2024 Hypertonie: 2-Substanz-Single-Pill (RAS-Blocker + CCB oder + Thiazid) als Initialtherapie zur Compliance-Verbesserung und schnelleren RR-Kontrolle. β-Blocker nur bei Komorbidität (KHK, HF, Tachyarrhythmie). RR-Ziel: &lt; 130/80 (in der Praxis), bei ≥ 80 J. individualisieren.'),
        q('Welcher Wirkstoff hemmt die Lipogenese in der Leber und ist 1. Wahl bei T2DM ohne Kontraindikationen (NVL 2023)?',
            ['Sulfonylharnstoff', 'Metformin', 'Insulin', 'Glitazon', 'Acarbose'],
            1,
            'Metformin reduziert die hepatische Gluconeogenese und steigert die periphere Insulinsensitivität. Es ist 1. Wahl bei T2DM bei eGFR &gt; 30 ml/min (Reduzieren ab 45). Cave Laktatazidose bei akutem Nierenversagen oder Sepsis — peri-OP pausieren. (NVL Diabetes 2023)'),
        q('Welche Aussage zur Helicobacter-pylori-Eradikation ist korrekt?',
            ['Standardtripletherapie: PPI + Clarithromycin + Amoxicillin für 5 Tage.', 'Bismuth-Quadruple-Therapie (PPI + Bismutsalz + Tetrazyklin + Metronidazol) für 10–14 Tage ist 1. Wahl bei hoher Clarithromycin-Resistenz.', 'Eine Therapie ist nur bei Adenokarzinom indiziert.', 'Eradikationskontrolle mittels Endoskopie nach 24 h.', 'Clarithromycin allein für 7 Tage.'],
            1,
            'Wegen zunehmender Clarithromycin-Resistenz wird in Deutschland die Bismuth-Quadruple-Therapie 10–14 Tage als 1. Wahl empfohlen (S2k DGVS). Alternative: konkomitierende Therapie (PPI + Amoxicillin + Clarithromycin + Metronidazol). Eradikationskontrolle mittels ¹³C-Atemtest oder Stuhl-Antigen 4–8 Wochen nach Therapieende.'),
        q('Welcher Risikofaktor erhöht die Wahrscheinlichkeit eines GI-Blutungsereignisses unter NSAR-Dauertherapie am stärksten?',
            ['Junges Alter', 'Niedriges Körpergewicht', 'Z. n. peptischem Ulkus oder GI-Blutung', 'Hyperlipidämie', 'Vegetarische Ernährung'],
            2,
            'Hauptrisikofaktoren GI-Blutung unter NSAR: Z. n. Ulkus / GI-Blutung, höheres Alter (&gt; 65), Komedikation mit ASS / OAK / SSRI / Glucocorticoiden, H. pylori-Infektion, hohe NSAR-Dosis. Bei Hochrisikopatienten: NSAR vermeiden oder mit PPI + COX-2-selektivem NSAR (Celecoxib) kombinieren. (DEGAM)'),
        q('Welche Aussage zur Therapie der Migräneattacke nach DGN/AWMF ist korrekt?',
            ['Triptane sind kontraindiziert in der akuten Attacke.', 'NSAR (z. B. Ibuprofen 400–800 mg) oder ASS 1 g sind Erstlinie der leichten/mittelschweren Attacke; Triptane bei mittelschwerer/schwerer Attacke.', 'Opioide sind 1. Wahl in der Migräneattacke.', 'Migräneprophylaxe ist erst nach 20 Attacken pro Monat indiziert.', 'CGRP-Antikörper sind oral verabreichbare Triptane.'],
            1,
            'Erstlinie Akuttherapie: NSAR oder ASS, ggf. + Antiemetikum (Metoclopramid). Triptane (z. B. Sumatriptan 50–100 mg p. o. oder 6 mg s. c.) bei mittelschwerer/schwerer Attacke; KI bei KHK, Z. n. Schlaganfall, schwerer Hypertonie. Prophylaxe ab 3 Attacken/Monat oder hoher Belastung — Topiramat, Metoprolol, ggf. CGRP-Antikörper (Erenumab, Galcanezumab).'),
        q('Was ist die häufigste Ursache einer Hypothyreose in Deutschland?',
            ['Jodmangel', 'Hashimoto-Thyreoiditis', 'Z. n. Radiojodtherapie', 'Lithiumtherapie', 'Hypophysenadenom'],
            1,
            'Hashimoto-Thyreoiditis (Autoimmunthyreoiditis Typ 1A) ist in Deutschland mit ausreichender Jodversorgung mit Abstand häufigste Ursache. Diagnostisch: TPO-AK (in &gt; 90 %), echoarme Schilddrüse im Ultraschall. Therapie L-Thyroxin lebenslang.'),
        q('Welcher Notfall liegt klinisch typisch bei akutem retrosternalem Vernichtungsschmerz mit Ausstrahlung in den Rücken und Pulsdifferenz zwischen Armen vor?',
            ['ACS / STEMI', 'Aortendissektion (Stanford A oder B)', 'Lungenembolie', 'Pneumothorax', 'Perikarditis'],
            1,
            'Aortendissektion: Vernichtungsschmerz, Ausstrahlung in den Rücken, Pulsdifferenz, RR-Differenz &gt; 20 mmHg, ggf. Aortenklappeninsuffizienz. Diagnostik CT-Angio. Stanford A (Aorta ascendens) → notfallmäßige OP; Stanford B (nach A. subclavia) → primär konservativ (RR-Kontrolle β-Blocker).'),
        q('Welche Aussage zur ESC-Hypertonie-Leitlinie 2024 zum RR-Ziel bei ≥ 65 Jahren ist korrekt?',
            ['RR-Ziel &lt; 120/70 unabhängig vom Alter', 'RR-Ziel 130–139 / 70–79 mmHg bei guter Verträglichkeit; bei &gt; 80 J. Ziel 140–149 systolisch', 'RR-Ziel 100/60 bei geriatrischen Patienten', 'Antihypertensive Therapie ab 65 J. nicht empfohlen', 'Ziel ist nur DBP &lt; 60 mmHg'],
            1,
            'ESC 2024: RR-Ziel ≤ 65 J. systolisch &lt; 130 mmHg; 65–79 J. ein erstes Ziel &lt; 140, dann nach Verträglichkeit weiter senken; ≥ 80 J. systolisch 140–149 anstreben (Frailty individualisiert berücksichtigen). Diastolisch &gt; 70 mmHg halten — J-Kurve bei zu niedrigem DBP (Hypoperfusion).'),
        q('Welche Aussage zur DOAK-Auswahl bei eGFR 25 ml/min ist richtig?',
            ['Apixaban 2,5 mg 2× tgl. ist möglich; Dabigatran ist KI.', 'Rivaroxaban 20 mg ist Standarddosis.', 'Edoxaban Standarddosis bei jedem GFR-Wert.', 'Phenprocoumon ist ab eGFR &lt; 30 KI.', 'Bei eGFR &lt; 30 sind alle DOAK obsolet.'],
            0,
            'Apixaban hat die geringste renale Elimination (~27 %) und kann bei eGFR ≥ 15 ml/min (mit Dosisanpassung 2,5 mg 2× bei mind. 2 von: ≥ 80 J., ≤ 60 kg, Krea ≥ 1,5 mg/dl) eingesetzt werden. Dabigatran ist bei eGFR &lt; 30 KI (80 % renale Elimination). Rivaroxaban: 15 mg 1× bei eGFR 15–49. (Fachinformation)'),
        q('Welcher Befund ist 1. Hinweis auf eine Polymyalgia rheumatica?',
            ['Junges Alter (&lt; 30 J.)', 'Schmerzhafte symmetrische Schulter-/Beckengürtel-Steifigkeit, vor allem morgens, BSG erhöht, Alter &gt; 50 J.', 'Asymmetrische Knieschmerzen', 'Erhöhte Harnsäure', 'Periphere Polyneuropathie'],
            1,
            'PMR: Alter typisch &gt; 50 J., bilaterale Schulter-/Beckengürtel-Schmerzen mit ausgeprägter Morgensteifigkeit, BSG/CRP deutlich erhöht. Prompte Glucocorticoid-Antwort (Prednisolon 15–25 mg/d). Cave Komorbidität Riesenzellarteriitis (RZA) — bei Kopfschmerzen, Sehstörungen, Kieferclaudicatio sofortige Hochdosis-Glucocorticoide und Schläfenarterienbiopsie.'),
        q('Welche Aussage zur Untersuchung bei V. a. Schlaganfall ist korrekt?',
            ['Bei Onset &lt; 4,5 h und ausgeschlossener Blutung im CT/MRT ist eine systemische Lyse (rt-PA, Tenecteplase) Standard.', 'Lyse ist nur bei intrazerebraler Blutung indiziert.', 'CT-Angio ist obsolet.', 'Ein FAST-Test ist nur klinisch und ohne Bedeutung.', 'Heparin-Vollantikoagulation ist Standardtherapie in der Akutphase.'],
            0,
            'Akuter ischämischer Schlaganfall: CT/MRT zum Blutungsausschluss, dann systemische Lyse mit rt-PA (Alteplase) oder Tenecteplase innerhalb 4,5 h Onset. Bei Großgefäßverschluss (LVO) zusätzlich mechanische Thrombektomie bis 6 h (in selektierten Fällen bis 24 h). Heparin-Vollantikoagulation in der Akutphase erhöht das Blutungsrisiko ohne Outcome-Verbesserung.'),
        q('Welcher Befund ist Indikation für eine Notfall-Koronarangiographie?',
            ['Stabile Angina pectoris', 'STEMI oder NSTEMI mit hohem Risiko (hämodynamische Instabilität, refraktäre Angina, ventrikuläre Arrhythmie)', 'Asymptomatische Patienten mit erhöhtem CRP', 'Erstdiagnose Hypertonie', 'Akuter Asthmaanfall'],
            1,
            'STEMI: Sofort-PCI &lt; 90 min. NSTEMI mit GRACE ≥ 140 oder Hochrisiko-Kriterien (hämodynamisch instabil, refraktäre Angina, lebensbedrohliche Arrhythmie): innerhalb 2 h. Stabile Angina: erst nicht-invasive Diagnostik (Ergometrie, Stress-MRT, CCTA). (ESC ACS 2023)'),
        q('Welche Aussage zur Vitamin-D-Substitution ist nach DGE / S3-Leitlinie korrekt?',
            ['Tägliche Substitution für jeden Erwachsenen empfohlen.', 'Routinescreening 25-OH-D und Substitution bei nachgewiesenem Mangel oder Risikogruppen (Heimbewohner, Migranten mit dunklem Hauttyp, kaum Sonnenexposition); Standard 800–1000 IE/d.', 'Hochdosis 100 000 IE/Monat ist 1. Wahl.', 'Vitamin-D-Spiegel sind unwichtig für Knochengesundheit.', 'Vitamin D ist bei Sarkoidose 1. Wahl.'],
            1,
            'DGE-Empfehlung: bei nicht ausreichender endogener Synthese (Sonnenexposition) Vitamin-D-Substitution 800 IE/d. Routinescreening 25-OH-D nicht, aber bei Risikogruppen (immobile Senioren, Heimbewohner, dunkler Hauttyp ohne Sonne) und Osteoporose. Hochdosis monatlich kann erhöhte Frakturrate auslösen (VITAL-Studie ausgewogen).'),
        q('Welche Aussage zur Therapie der akuten Gicht-Attacke ist richtig?',
            ['Allopurinol Hochdosis startet die Akutphase.', 'NSAR (Naproxen, Indomethacin) sind 1. Wahl bei akuter Gicht ohne KI; Alternativen Colchicin (initial 1 mg, dann 0,5 mg nach 1 h) oder Glucocorticoide oral.', 'ASS niedrig dosiert ist Standardtherapie.', 'Allopurinol ist akut sofort 600 mg/d.', 'Antibiotika sind 1. Wahl.'],
            1,
            'Akute Gicht: NSAR (Naproxen 500 mg 2×) oder Colchicin niedrig dosiert (Schema 1 mg + 0,5 mg nach 1 h, max 1,5 mg in den ersten 24 h) oder Glucocorticoide oral (Prednisolon 30–35 mg/d für 5 Tage). Allopurinol darf während der Akutattacke nicht neu begonnen werden (paradox verlängern), aber bestehende Therapie weitergeben.'),
        q('Welcher Schritt ist KEIN Bestandteil der Therapie der akuten Lungenembolie?',
            ['CT-Angio Pulmonalis zur Diagnosesicherung bei mittlerer/hoher Wahrscheinlichkeit', 'Antikoagulation mit NMH oder DOAK', 'Lyse (Alteplase) bei hämodynamischer Instabilität', 'Thrombolyse bei niedriger Wahrscheinlichkeit zur Prophylaxe', 'Stratifizierung mit sPESI / hsTropT / NT-proBNP'],
            3,
            'ESC 2019: Lungenembolie-Therapie nach Risiko-Stratifizierung. Hochrisiko (Schock, Reanimationspflicht): Lyse. Intermediär-Hoch (sPESI ≥ 1, RV-Dysfunktion, hsTrop+): NMH/DOAK + Monitoring. Intermediär-Niedrig: NMH/DOAK. Niedrig: ambulante Antikoagulation. Lyse niemals "prophylaktisch" bei niedriger Wahrscheinlichkeit — Blutungsrisiko überwiegt.'),
        q('Welche Aussage zum CHA₂DS₂-VASc-Score ist falsch?',
            ['"S" mit 2 Punkten = Stroke / TIA-Vorgeschichte', '"V" mit 1 Punkt = Vascular disease (KHK, pAVK)', 'Männer ab Score ≥ 2, Frauen ab Score ≥ 3 → OAK indiziert (Sc-Punkt nicht zählend)', 'Diabetes mellitus = 2 Punkte', 'Alter 75 J. = 2 Punkte'],
            3,
            'CHA₂DS₂-VASc: Diabetes mellitus = 1 Punkt (nicht 2). Stroke / TIA = 2 Punkte; ≥ 75 J. = 2 Punkte. Übrige je 1 Punkt: Herzinsuffizienz, Hypertonie, 65–74 J., vaskuläre Erkrankung, weibliches Geschlecht. (ESC AF 2024)'),
        q('Welche Aussage zur Cholezystolithiasis ist korrekt (S3 021-008)?',
            ['Asymptomatische Gallensteine im Ultraschallbefund sind grundsätzlich Operations-Indikation.', 'Symptomatische Gallensteine (typische Koliken) sind Indikation zur laparoskopischen Cholezystektomie.', 'Auch nach erstmaliger akuter Cholezystitis ist eine OP nicht zu empfehlen.', 'ERCP ist 1. Wahl bei einfacher Cholezystolithiasis ohne Choledochus-Beteiligung.', 'Litholyse mit Ursodeoxycholsäure ist Standardtherapie.'],
            1,
            'Symptomatische Cholezystolithiasis (Koliken, akute Cholezystitis) → laparoskopische Cholezystektomie. Asymptomatische Steine i. d. R. keine OP-Indikation (Ausnahme Risikopatienten). Bei Choledocholithiasis ergänzend ERCP. Litholyse ist obsolet (lange Therapie, hohe Rezidivrate). (DGVS S3 021-008)'),
        q('Was beschreibt das Charcot-Trias der akuten Cholangitis?',
            ['Fieber – Ikterus – rechter Oberbauchschmerz', 'Husten – Auswurf – Belastungsdyspnoe', 'Dyspnoe – Brustschmerz – Hämoptysen', 'Polyurie – Polydipsie – Gewichtsverlust', 'Tremor – Rigor – Akinese'],
            0,
            'Charcot-Trias: Fieber + Ikterus + rechter Oberbauchschmerz → akute aszendierende Cholangitis. Reynolds-Pentade ergänzt um Schock + Bewusstseinsstörung. Therapie: Antibiotika, ERCP zur Drainage. (Herold)'),
        q('Welche Aussage zum Diabetes-mellitus-Typ-2-Therapieziel HbA1c trifft zu?',
            ['Festes Ziel HbA1c &lt; 5,5 % unabhängig vom Alter', 'Individuelles Ziel HbA1c 6,5–7,5 % (NVL 2023); strenger bei jüngeren ohne Komorbidität, lockerer bei Älteren oder Frailty', 'HbA1c &gt; 9 % ist Therapieziel', 'HbA1c-Ziel nur unter Insulin', 'HbA1c &lt; 4 % bei Älteren'],
            1,
            'NVL Diabetes 2023: individualisiertes HbA1c-Zielband 6,5–7,5 % (Standard); strenger (≤ 6,5 %) bei jungen Patienten ohne Komorbidität; lockerer (7,5–8 %, evtl. höher) bei Älteren mit Frailty oder ausgeprägter Komorbidität. Hypoglykämien vermeiden, da kardiovaskulär ungünstig.'),
        q('Welcher klinische Befund ist Hinweis auf eine Hypothyreose-Manifestation im Verlauf?',
            ['Tremor und Diarrhoe', 'Müdigkeit, Gewichtszunahme, Bradykardie, Kälteintoleranz, trockene Haut', 'Hyperhidrose und Tachykardie', 'Diabetische Ketoazidose', 'Hypertonie krise'],
            1,
            'Klassische Hypothyreose-Symptomatik: Müdigkeit, Antriebsarmut, Gewichtszunahme, Obstipation, Kälteintoleranz, Bradykardie, trockene Haut, brüchige Haare, Periphere Ödeme (Myxödem). Labor: TSH ↑, fT4 ↓ (manifest); subklinisch: TSH ↑ bei normwertigem fT4. (Herold)'),
        q('Welche Aussage zur GINA-Asthma-Therapie ist korrekt?',
            ['Ausschließlich SABA-Monotherapie über 5 Jahre ist sicher.', 'Eine ICS-haltige Therapie ist die Basistherapie auf allen Stufen 1–5; SABA-Monotherapie wurde verlassen.', 'LABA als Monotherapie ist Standard.', 'Theophyllin ist 1. Wahl.', 'Asthma-Kontrolle ist nicht relevant für die Stufenanpassung.'],
            1,
            'Seit GINA 2019 keine SABA-Monotherapie mehr — auch milde Asthmatiker erhalten ICS-Formoterol als Reliever-/Maintenance-Therapie. Begründung: SABA-Monotherapie war mit höherer Mortalität assoziiert (SMART-Konzept). Stufenanpassung nach Asthma-Kontrolle (ACT-Score, Symptome, Reliever-Häufigkeit, Exazerbationen).'),
        q('Welche Aussage zur Akuttherapie der dekompensierten HFrEF (akutes Lungenödem) trifft zu?',
            ['Hochdosis-Beta-Blocker i. v. zur RR-Senkung', 'Sauerstoff bei SpO₂ &lt; 90 %, Furosemid 20–40 mg i. v., Nitroglycerin bei RR sys &gt; 110, ggf. NIV; ACE-Hemmer / SGLT2i / MRA / BB — Dauertherapie nicht akut absetzen', 'Heparin Vollantikoagulation bei jedem Lungenödem', 'Lyse mit Alteplase ist 1. Wahl', 'Dobutamin ist 1. Wahl bei jedem Patienten'],
            1,
            'Akute HFrEF-Dekompensation: Sauerstoff bei SpO₂ &lt; 90 %, Furosemid 20–40 mg i. v. (oder doppelte orale Tagesdosis), Nitrate bei adäquatem RR. NIV (CPAP) bei Lungenödem. Inotropika (Dobutamin) nur bei kardiogenem Schock / Hypotonie. Bestehende prognoseverbessernde Medikation (ARNI/ACE, BB, MRA, SGLT2i) möglichst nicht pausieren — nur kurzfristige Dosisreduktion bei Hypotonie. (ESC HF 2023)')
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
        ),
        q('Eine 84-Jährige stürzt zum 3. Mal in 6 Monaten. Welcher Schritt ist nach DEGAM-Sturzleitlinie / S3 Geriatrie obligat?',
            ['Sofortige Verschreibung eines Bisphosphonats', 'Multifaktorielle Sturzrisiko-Abklärung (Medikation/PRISCUS, Visus, Orthostase, Sarkopenie, Wohnumfeld) plus DEXA und Vitamin-D-Status', 'Bettlägerigkeit empfehlen', 'Routine-MRT-Schädel', 'Anlage eines Dauerkatheters'],
            1,
            'Multifaktorielle Sturzabklärung: Medikamenten-Review (PRISCUS 2.0/STOPP V3 — Benzodiazepine, anticholinerge, antihypertensive Substanzen), Visus, Orthostase-Test (Schellong), Muskelkraft (Hand-Grip), Ganganalyse (Timed-Up-and-Go), Wohnungsbegehung. Plus Osteoporose-Diagnostik (DEXA, T-Score) und Vitamin-D-Status.'),
        q('Welche Indikation rechtfertigt nach DOAK-Fachinformation und ESC die DOAK-Reduktionsdosis bei Apixaban?',
            ['Hypertonie allein', 'Mind. 2 von 3: Alter ≥ 80 J., Krea ≥ 1,5 mg/dl, Körpergewicht ≤ 60 kg', 'Diabetes mellitus', 'Eine Magenblutung in der Anamnese', 'Schluckstörung'],
            1,
            'Apixaban-Reduktionsdosis 2,5 mg 2× tgl.: bei mind. 2 der 3 Kriterien Alter ≥ 80 J., Krea ≥ 1,5 mg/dl, Gewicht ≤ 60 kg — oder bei eGFR 15–29 ml/min unabhängig vom Alter. Bei AFib-Indikation; dosis-reduzierende Indikation für VTE-Therapie unterscheidet sich. (Fachinformation)'),
        q('Welche Aussage zum Behandlungsabbruch nach Patientenwillen (BGB § 1827) ist korrekt?',
            ['Eine wirksame Patientenverfügung ist immer schriftlich, frei verfasst, ohne Notar.', 'Eine Patientenverfügung muss schriftlich verfasst und von einem volljährigen, einwilligungsfähigen Verfasser unterschrieben sein und konkrete Behandlungssituationen benennen; keine Notarpflicht.', 'Patientenverfügung ist nur bei Krebserkrankungen wirksam.', 'Eine Vorsorgevollmacht ersetzt keine Patientenverfügung.', 'Patientenverfügung ist immer 5 Jahre gültig.'],
            1,
            'BGB § 1827 (i. d. F. 2023): Patientenverfügung schriftlich, von einer volljährigen einwilligungsfähigen Person unterschrieben, mit konkretem Bezug auf bestimmte Behandlungssituationen. Keine Notarpflicht. Vorsorgevollmacht regelt zusätzlich, wer entscheiden darf — empfehlenswerte Kombination. Regelmäßig (z. B. alle 1–2 Jahre) bestätigen lassen, aber kein gesetzliches Verfallsdatum.'),
        q('Welche Aussage zur palliativen Therapie der Tumordyspnoe trifft zu?',
            ['Hochdosis-Glucocorticoide sind 1. Wahl.', 'Niedrig dosiertes Morphin oral (z. B. 2,5–5 mg alle 4 h) ist evidenzbasiert wirksam zur Dyspnoe-Linderung.', 'Antibiotika sind Standard.', 'Sauerstoff hilft jedem Patienten unabhängig von SpO₂.', 'Benzodiazepine sind 1. Wahl bei Tumordyspnoe.'],
            1,
            'Niedrig dosiertes Morphin oral 2,5–5 mg q4h ist evidenzbasiert wirksam (Cochrane). Sauerstoff nur bei Hypoxämie nutzbringend; bei normoxämen Patienten oft nur Placebo-Effekt. Benzodiazepine ergänzend bei Angst-Komponente. (S3 Palliativmedizin)'),
        q('Welche Aussage zur Diabetes-mellitus-Therapie bei Niereninsuffizienz CKD G4 ist korrekt?',
            ['Metformin ist Standard auch bei eGFR 25 ml/min.', 'Metformin ist bei eGFR &lt; 30 KI; Insulin oder DPP-4-Hemmer (z. B. Linagliptin, keine Dosisanpassung) sind Optionen.', 'SGLT2-Hemmer sind bei jedem GFR-Wert kontraindiziert.', 'Sulfonylharnstoffe sind 1. Wahl bei CKD wegen geringer Hypoglykämieneigung.', 'Pioglitazon ist bei CKD 1. Wahl.'],
            1,
            'CKD G4 (eGFR 15–29): Metformin KI. Linagliptin (DPP-4i, biliär eliminiert) ohne Dosisanpassung. Insulin gut steuerbar. SGLT2i: Dapagliflozin und Empagliflozin sind ab eGFR ≥ 20 (DAPA-CKD/EMPA-KIDNEY). Sulfonylharnstoffe wegen Hypoglykämie-Risiko vermeiden. Pioglitazon: Wassereinlagerung, HF-Risiko.'),
        q('Welche Substanz auf der PRISCUS-2.0-Liste ist im Alter besonders kritisch wegen Anti-Cholinerg-Effekt?',
            ['Lisinopril', 'Amitriptylin', 'Metformin', 'Pantoprazol', 'Lipitor (Atorvastatin)'],
            1,
            'Amitriptylin ist potent anticholinerg (Mundtrockenheit, Obstipation, Harnverhalt, Delir, Sturz) und α1-blockierend (Orthostase). PRISCUS-2.0/STOPP V3: vermeiden im Alter; Alternativen SSRI/SNRI bei Depression, Pregabalin/Gabapentin/Duloxetin bei neuropathischem Schmerz.'),
        q('Welche Aussage zum SAPV-Antrag ist korrekt?',
            ['SAPV ist nur stationär möglich.', 'SAPV-Verordnung über Muster 63, durch Hausarzt oder Klinikarzt; SAPV-Team mit 24/7-Bereitschaft, Krankenkasse trägt Kosten.', 'Patienten zahlen die SAPV selbst.', 'SAPV ist auf onkologische Patienten beschränkt.', 'Voraussetzung ist Lebenserwartung &lt; 14 Tage.'],
            1,
            'SAPV: spezialisierte ambulante Palliativversorgung. Verordnung über Muster 63, Patient mit komplexer Symptomlast und einer in absehbarer Zeit lebensbegrenzenden Erkrankung. Multiprofessionelles Team (Arzt + Pflege + Sozialarbeit), 24/7-Rufbereitschaft. Kostenträger: GKV. Auch nicht-onkologische Erkrankungen (HF, COPD, ALS) qualifizieren.'),
        q('Welcher Schritt ist KEIN Bestandteil des MRSA-Screening-Programms in Risikobereichen?',
            ['Nasen-Rachen-Abstrich', 'Wunden-/Hautläsion-Abstrich', 'Routine-Blutkultur bei jedem Aufnahme-Patienten', 'Isolierung bis Ergebnis vorliegt (bei Risikofaktoren)', 'Dekolonisation mit Mupirocin nasal + Octenidin/Chlorhexidin Waschungen'],
            2,
            'MRSA-Aufnahme-Screening (KRINKO/RKI) bei Risikopatienten: Nasen-Rachen-Abstrich, Hautläsionen/Wunden, ggf. Perineum/Leiste. Dekolonisation Mupirocin nasal 5 Tage + antiseptische Waschungen. Routine-Blutkultur ist nicht Teil des Screenings (nur klinisch bei V. a. Bakteriämie).'),
        q('Welche Antibiose ist 1. Wahl bei akuter Pyelonephritis ambulant ohne Komplikationen (S3 043-044)?',
            ['Doxycyclin 100 mg 2× tgl.', 'Cefpodoxim oder Ciprofloxacin oral für 7–10 Tage', 'Azithromycin 500 mg 1×', 'Penicillin V 1 Mio IE 3×', 'Trimethoprim Mono 5 Tage'],
            1,
            'AWMF S3 043-044: ambulante Pyelonephritis Cefpodoxim oder Ciprofloxacin oral für 7–10 Tage (oder Cotrimoxazol bei nachgewiesener Empfindlichkeit, 14 Tage). Bei stationärer Aufnahme parenteral (Cephalosporin der 3. Generation oder Aminopenicillin/BLI). Schwangerschaft: Cefpodoxim, Cefuroxim, Pivmecillinam.'),
        q('Welcher Tumormarker ist beim Pankreaskarzinom diagnostisch und Verlaufsmarker einsetzbar (mit Limitationen)?',
            ['CEA', 'CA 19-9', 'AFP', 'PSA', 'β-HCG'],
            1,
            'CA 19-9 ist der etablierte Marker bei Pankreaskarzinom (Sensitivität ca. 80 %, Spezifität ca. 80 %). Falsch erniedrigt bei Lewis-negativen Patienten (~5–10 %). Falsch erhöht bei Cholestase. Nicht für Screening, aber für Therapieverlauf und Rezidivdiagnostik geeignet.'),
        q('Welche Substanz ist nach NVL Kreuzschmerz Erstlinien-Analgetikum bei akutem unspezifischem Kreuzschmerz?',
            ['Tramadol 100 mg 3×', 'Paracetamol 1 g 4× plus Ibuprofen 400 mg 3× (kurzzeitig)', 'Diclofenac 75 mg parenteral', 'Tilidin/Naloxon 100 mg 4×', 'Morphin 10 mg s. c.'],
            1,
            'NVL Kreuzschmerz: NSAR (Ibuprofen, Diclofenac p. o.) sind Erstlinien-Analgetika bei akuter Lumbago, Paracetamol ist als Add-on nutzbar. Opioide nur kurzzeitig bei unzureichender Wirkung der NSAR. Frühe Mobilisation, keine Bettruhe. Patientenedukation gegen Chronifizierung.'),
        q('Was ist der Unterschied zwischen Hyperthyreose und Hyperthyreoidismus laut Definition?',
            ['Hyperthyreose = Schilddrüsenüberfunktion mit zu hohen Hormonspiegeln; "Hyperthyreoidismus" wird im deutschen Sprachraum synonym verwendet.', 'Hyperthyreose ist eine eigene Krankheit, Hyperthyreoidismus eine Therapieform.', 'Hyperthyreose ist immer maligne.', 'Hyperthyreoidismus ist die hypophysäre Form.', 'Es gibt keinen klinischen Unterschied zur Hypothyreose.'],
            0,
            'Hyperthyreose und Hyperthyreoidismus werden synonym verwendet; im Deutschen ist "Hyperthyreose" gebräuchlich. Hauptursachen: M. Basedow, fokale/multifokale Autonomie. Klinik: Tachykardie, Gewichtsverlust, Tremor, Schwitzen, Reizbarkeit. Labor: TSH ↓, fT3/fT4 ↑.'),
        q('Welche Aussage zum thyreotoxischen Sturm trifft zu?',
            ['Niedriges Mortalitätsrisiko unter 5 %.', 'Lebensgefährlicher Notfall mit Tachyarrhythmie, Hyperthermie, Bewusstseinsstörung; Therapie Thyreostatika hochdosiert + β-Blocker + Glucocorticoide + Iod.', 'Therapie ausschließlich symptomatisch.', 'Tritt nur nach Schilddrüsen-OP auf.', 'Standardtherapie L-Thyroxin.'],
            1,
            'Thyreotoxische Krise: Mortalität bis 30 %. Auslöser: Infekt, Stress, OP, Iodexposition. Therapie: Thiamazol 80–240 mg/d (oral oder via Magensonde), β-Blocker (Propranolol), Glucocorticoide (Hydrocortison/Prednisolon — hemmen T4 → T3-Konversion), Lugol-Iod (nach Thyreostatikum-Beginn) und ITS-Monitoring.'),
        q('Was ist Standard der Erstlinien-Insulintherapie bei T2DM?',
            ['Komplexe ICT mit Mahlzeiten- und Basal-Insulin', 'Bedtime-Basalinsulin (NPH oder lang wirksames Analogon) als Add-on zur oralen Therapie', 'Insulinpumpe', 'Hochdosis-Bolus-Insulin', 'Inhalatives Insulin'],
            1,
            'NVL Diabetes 2023 / DEGAM: bei T2DM mit unzureichender Glucose-Einstellung trotz oraler Therapie ist die Basalinsulin-Therapie (z. B. Insulin Glargin abends) als Erstlinien-Insulinregime Standard. ICT erst bei weiterhin unzureichender Kontrolle.'),
        q('Welche Aussage zur Sarkopenie nach EWGSOP2 ist korrekt?',
            ['Sarkopenie = Muskelmasse-Verlust ohne klinische Relevanz', 'Sarkopenie = niedrige Muskelkraft (Hand-Grip, Sit-to-Stand) plus reduzierte Muskelmasse oder -funktion; Diagnostik mit DEXA/BIA und Ganggeschwindigkeit', 'Sarkopenie tritt nur bei Krebs auf', 'Sarkopenie ist nicht behandelbar', 'Therapie ausschließlich Krafttraining ohne Ernährungsberatung'],
            1,
            'EWGSOP2: Definition Sarkopenie über 1) niedrige Muskelkraft (Handkraft, Chair-Stand-Test), 2) reduzierte Muskelmasse (DEXA, BIA) und 3) reduzierte körperliche Leistungsfähigkeit (Ganggeschwindigkeit, SPPB). Therapie: Resistance Training + Eiweiß-Supplementation (1,0–1,2 g/kg/d) + Vitamin D bei Mangel.'),
        q('Welcher Befund ist typisch für die Polyneuropathie bei T2DM?',
            ['Asymmetrisch proximal beginnend', 'Symmetrische distal beginnende sensorische Polyneuropathie ("Strumpf-Handschuh-Verteilung")', 'Akutes Bild mit Lähmung', 'Reine Schmerzform ohne Sensibilitätsstörung', 'Hyperreflexie an den Beinen'],
            1,
            'Diabetische Polyneuropathie: distal-symmetrisch, sensorisch beginnend (Vibration, Temperatur), später motorisch und autonom. Inspektion und Vibration mit 128-Hz-Stimmgabel sowie Monofilament-Test (10 g) bei jedem Diabetiker mind. jährlich. Folgeschäden: Fußulzera, Charcot-Fuß. Therapie: gute Glucose-Einstellung, ggf. Pregabalin/Gabapentin/Duloxetin bei schmerzhafter Form. (NVL)'),
        q('Welche Aussage zur DOAK-Reversion bei lebensbedrohlicher Blutung ist richtig?',
            ['Es gibt kein Antidot.', 'Idarucizumab spezifisch gegen Dabigatran; Andexanet alfa gegen Faktor-Xa-Hemmer (Apixaban, Rivaroxaban).', 'Vitamin K reversiert sofort jedes DOAK.', 'PPSB ist immer 1. Wahl, auch ohne Idarucizumab/Andexanet.', 'Plasma-Gabe ist ausreichend.'],
            1,
            'Spezifische Antidote: Idarucizumab (humanisierter monoklonaler Fab-Antikörper) gegen Dabigatran; Andexanet alfa (rekombinanter Faktor-Xa-Köder) gegen Apixaban/Rivaroxaban (in DE eingeschränkt verfügbar). Bei lebensbedrohlicher Blutung Faktor-Xa-Hemmer: alternativ PPSB 25–50 IE/kg, Tranexamsäure. Vitamin K wirkt nicht bei DOAK (nur bei Cumarinen).'),
        q('Welche Aussage zum Gerinnungsmonitoring von DOAKs ist korrekt?',
            ['INR / Quick zeigen DOAK-Wirkung verlässlich.', 'Routine-Monitoring der Gerinnung ist nicht erforderlich; bei Bedarf Kalibrierter Anti-Xa-Test (FXa-Hemmer) oder Hemoclot-Test (Dabigatran).', 'aPTT zeigt jeden DOAK-Effekt zuverlässig.', 'Thrombinzeit ist Standard für Apixaban.', 'Eine Standardgerinnung schließt eine DOAK-Wirkung sicher aus.'],
            1,
            'DOAK benötigen kein Routine-Gerinnungsmonitoring (das ist Vorteil ggü. Cumarinen). Spezialtests: kalibrierter Anti-Xa-Test für Apixaban/Rivaroxaban/Edoxaban; verdünnte Thrombinzeit (Hemoclot) oder ECT für Dabigatran. Globaltests (Quick, INR, aPTT) sind unzuverlässig.'),
        q('Welcher Befund spricht am ehesten gegen eine Lewy-Body-Demenz und für eine Alzheimer-Demenz?',
            ['Frühe Visushalluzinationen', 'Fluktuierende Vigilanz', 'Parkinson-Symptomatik', 'Frühe ausgeprägte Episodische-Gedächtnisstörung als Leitsymptom; klassische Persönlichkeit erhalten', 'REM-Schlaf-Verhaltensstörung'],
            3,
            'Alzheimer: vor allem episodisches Gedächtnis früh betroffen, langsam progredient, Visushalluzinationen und Parkinson-Symptome eher spät. Lewy-Body: Visushalluzinationen, fluktuierende Vigilanz, Parkinson-Symptome, REM-Schlaf-Verhaltensstörung in der Anamnese. Frontotemporale Demenz: Persönlichkeitswandel früh.'),
        q('Was ist die korrekte initiale Maßnahme bei akuter Anaphylaxie Stadium III (Bronchospasmus + Hypotonie)?',
            ['Antihistaminikum oral', 'Glucocorticoid i. v.', 'Adrenalin 0,3–0,5 mg i. m. lateral am Oberschenkel sofort, dann i. v. Volumen, β2-Agonist, Sauerstoff, ggf. wiederholen', 'Diphenhydramin i. m. zuerst', 'Wartezeit 30 min beobachten'],
            2,
            'Anaphylaxie Stadium III/IV: sofort Adrenalin 0,3–0,5 mg i. m. lateral am Oberschenkel (1:1000-Lösung). Wiederholung nach 5–15 min möglich. Danach kristalloide Volumengabe, β2-Sympathomimetikum bei Bronchospasmus, Sauerstoff. Antihistaminika und Glucocorticoide wirken erst verzögert — sind nicht primär lebensrettend.'),
        q('Welche Substanz ist 1. Wahl in der Therapie der Hypertonie bei eGFR 35 ml/min ohne Albuminurie?',
            ['Spironolacton', 'ACE-Hemmer / ARB plus Calcium-Antagonist (Single-Pill bevorzugt)', 'Furosemid 80 mg/d Standard', 'Hydrochlorothiazid Hochdosis', 'Doxazosin'],
            1,
            'CKD G3b ohne Albuminurie: ACE-Hemmer / ARB plus CCB (Amlodipin) als Single-Pill. Bei Albuminurie ist RAS-Blocker zwingend. Thiazide wirken bei eGFR &lt; 30 schlechter (dann Schleifendiuretikum). Spironolacton: Cave Hyperkaliämie bei CKD; nur unter strenger K⁺-Kontrolle.'),
        q('Welche Aussage zur Therapie der akuten Glomerulonephritis ist korrekt?',
            ['Sofortige Hämodialyse', 'Symptomatische Therapie (RR-Senkung, Salz-/Flüssigkeitsbeschränkung) plus ursachenspezifische Therapie nach Nierenbiopsie (Steroide, Immunsuppression bei rapid progressiver oder ANCA-assoziierter GN)', 'Antibiotika-Hochdosis immer 1. Wahl', 'Diuretika-Hochdosis ohne weitere Diagnostik', 'NSAR Hochdosis'],
            1,
            'Therapie der GN richtet sich nach Histologie (Biopsie). Klassische Postinfektiöse GN: meist selbstlimitierend, symptomatische Therapie. Rapid-progressive GN (z. B. ANCA-assoziiert, Goodpasture): Hochdosis-Glucocorticoide + Cyclophosphamid/Rituximab. Nicht-spezifisch: RR-Kontrolle (Ziel &lt; 130/80), RAS-Blocker.'),
        q('Welche Aussage zum Notfall Lungenembolie mit hämodynamischem Schock trifft zu?',
            ['Sofortige Antikoagulation reicht aus.', 'Hochrisiko-LE: systemische Lyse mit Alteplase 100 mg über 2 h (oder 0,6 mg/kg über 15 min), bei KI Thrombektomie chirurgisch oder katheterbasiert.', 'Lyse ist KI bei jeder LE.', 'Heparin Niedrigdosis-Therapie ist Standard.', 'Lyse nur nach 24 h Beobachtung.'],
            1,
            'Hochrisiko-Lungenembolie (Schock, Reanimationspflicht): systemische Lyse Alteplase 100 mg über 2 h (oder 0,6 mg/kg max. 50 mg über 15 min). Alternativen Tenecteplase (off-label). Bei Lyse-KI: chirurgische oder katheterbasierte Thrombektomie. UFH-Therapie + Lyse. (ESC PE 2019)'),
        q('Welche Aussage zur klassischen Schlaganfall-Sekundärprävention nach kardioembolischem Apoplex bei Vorhofflimmern ist richtig?',
            ['ASS 100 mg/d ist Standard', 'OAK mit DOAK (Apixaban, Rivaroxaban, Edoxaban) oder bei mech. Klappe / mittelschwerer Mitralstenose Phenprocoumon', 'Clopidogrel 75 mg ist 1. Wahl', 'ASS plus Clopidogrel dauerhaft', 'Keine Antikoagulation, da Blutungsrisiko zu hoch'],
            1,
            'Kardioembolischer Apoplex bei AFib: OAK Standard. DOAK 1. Wahl bei nicht-valvulärem AFib. Bei mechanischer Klappe oder mittelschwerer/schwerer Mitralstenose ist Phenprocoumon (Cumarin) Pflicht (DOAK ungeeignet/KI nach RE-ALIGN). Beginn 1–14 Tage nach Apoplex je nach Infarktgröße.'),
        q('Welcher Schritt ist Teil der ABCDE-Reanimations-Adaption bei Verdacht auf Anaphylaxie?',
            ['Erst Glucocorticoid, dann Adrenalin', 'A: Atemwege beurteilen (Schwellung?); B: Sauerstoff hochdosiert; C: Adrenalin i. m., dann Volumen; D: Bewusstsein; E: Allergen entfernen, Hautcheck', 'A: Antihistaminikum geben', 'C: ASS 500 mg p. o.', 'E: Endoskopische Diagnostik'],
            1,
            'ABCDE bei Anaphylaxie: A) Atemwegsschwellung beurteilen (ggf. Intubation in Bereitschaft). B) Sauerstoff. C) Adrenalin 0,3–0,5 mg i. m. + Volumen 500–1000 ml kristalloid. D) Bewusstsein/AVPU. E) Allergen entfernen, Haut/Schleimhautbefund. Anschließend Glucocorticoid und Antihistaminikum als Add-on.'),
        q('Welche Aussage zur akuten Cholezystitis ist korrekt?',
            ['Konservative Therapie über Wochen ist Standard', 'Frühe (innerhalb 24–72 h) laparoskopische Cholezystektomie ist 1. Wahl bei akuter Cholezystitis (S3 021-008)', 'Antibiotika allein ohne OP sind Standardtherapie', 'PTCD-Drainage ist 1. Wahl bei jedem Patienten', 'OP ausschließlich offen'],
            1,
            'S3 021-008: bei akuter Cholezystitis frühe (innerhalb 24–72 h) laparoskopische Cholezystektomie. Bei Hochrisikopatienten (Frailty, ASA IV) ist eine PTCD-Drainage als Bridging möglich. Verzögerte OP nach Wochen erhöht Komplikationsrate.'),
        q('Welche Aussage zur antithrombotischen Therapie bei pAVK Stadium IIa nach Fontaine ist richtig?',
            ['ASS 100 mg/d und Statin (LDL-Ziel &lt; 1,4 mmol/l) sowie strukturiertes Gehtraining + Lebensstil', 'OAK mit DOAK in Vollantikoagulation', 'Heparin lebenslang', 'Keine Therapie, da nur Stadium IIa', 'Aldosteron-Antagonist'],
            0,
            'pAVK: ASS 100 mg + Hochdosis-Statin (Atorvastatin 40–80 oder Rosuvastatin 20–40, LDL-Ziel &lt; 1,4 mmol/l), Rauchstopp, strukturiertes Gehtraining (3×/Woche, 30–60 min). Bei symptomatischer Persistenz Cilostazol oder Naftidrofuryl; revaskularisierende Verfahren bei Stadium III/IV. Niedrigdosis Rivaroxaban 2,5 mg 2× + ASS bei Hochrisiko (COMPASS).'),
        q('Welche Aussage zur AWMF-Leitlinie Lyme-Borreliose 013-080 ist richtig?',
            ['Eine antikörperbasierte Verlaufskontrolle nach Erythema migrans ist sinnvoll.', 'Erythema migrans ist klinisch gesichert; keine Serologie nötig — sofort Doxycyclin 200 mg/d 10–14 Tage; Verlaufsserologie nicht aussagekräftig (Seronarbe).', 'Eine Serologie nach 3 Monaten beweist Therapieversagen.', 'IgG-Titeranstieg trotz erfolgreicher Therapie ist Therapieversagen.', 'Penicillin V ist 1. Wahl.'],
            1,
            'AWMF 013-080: Erythema migrans ist klinische Diagnose, keine Serologie nötig. Therapie: Doxycyclin oral 200 mg/d für 10–14 Tage (KI in Schwangerschaft / Kinder &lt; 9 J. → Amoxicillin). IgG-Titer können nach Therapie persistieren ("Seronarbe") und sind kein Therapieversagen.'),
        q('Welche Aussage zur akuten Harnstauungsniere ist korrekt?',
            ['Konservative Beobachtung über Tage ist Standard.', 'Sofortige Entlastung über Doppel-J-Stent oder perkutane Nephrostomie bei Obstruktion und Infekt / Niereninsuffizienz / starken Schmerzen.', 'Antibiotika allein ohne Drainage ausreichend.', 'Diuretika-Hochdosis ist 1. Wahl.', 'Ureterstein wird immer offen operiert.'],
            1,
            'Akute Harnstauungsniere mit Infekt (Urosepsis-Risiko), GFR-Verlust oder unbeherrschbaren Koliken → notfallmäßige Drainage durch Doppel-J-Stent retrograd oder perkutane Nephrostomie. Anschließend kausale Therapie (ESWL, URS) nach Infektkontrolle.'),
        q('Welche Aussage zum WHO-Stufenschema der Schmerztherapie ist richtig?',
            ['Stufe 1: starke Opioide; Stufe 3: Paracetamol', 'Stufe 1: Nicht-Opioid (Paracetamol, NSAR, Metamizol); Stufe 2: schwache Opioide (Tramadol, Tilidin); Stufe 3: starke Opioide (Morphin, Oxycodon, Hydromorphon, Fentanyl)', 'Mischen Stufe 2 + 3 ist Standard', 'Adjuvanzien sind nicht erlaubt', 'Stufe 3 nur bei Karzinomschmerz'],
            1,
            'WHO-Stufenschema: 1) Nicht-Opioide; 2) schwache Opioide; 3) starke Opioide. Bei Versagen Stufe 2 direkter Wechsel auf Stufe 3 (kein Mischen 2+3). Adjuvanzien (Pregabalin, Duloxetin, Glucocorticoide, Bisphosphonate) ergänzend bei neuropathischem oder Knochenschmerz. Stufe 3 ist auch bei chronischem Nicht-Tumorschmerz indiziert (Cave: kritisch indizieren, Risiko Abhängigkeit).'),
        q('Welche Aussage zur Pharmakogenetik der Phenprocoumon-Therapie trifft zu?',
            ['Es gibt keinen genetischen Einfluss.', 'CYP2C9- und VKORC1-Varianten beeinflussen Dosis und Blutungsrisiko maßgeblich; in Studien bessere INR-Stabilität bei genotyp-geleiteter Initialdosierung.', 'Nur CYP3A4 ist relevant.', 'Nur CYP2D6 ist relevant.', 'Pharmakogenetik wirkt nur bei DOAK.'],
            1,
            'CYP2C9 (langsamer Abbau bei *2/*3) und VKORC1 (-1639 G&gt;A) bestimmen ca. 30 % der interindividuellen Phenprocoumon-/Warfarin-Variabilität. Patienten mit Hochrisiko-Variante: niedrigere Erhaltungsdosis, höheres Blutungsrisiko. Dosis-Anpassungs-Algorithmen im Einsatz.'),
        q('Was ist beim Opioid-Switch (Rotation) Standard?',
            ['Verwendung der Standarddosis 1:1', 'Dosisreduktion um 25–30 % bei Wechsel zur Berücksichtigung unvollständiger Kreuztoleranz', 'Verdoppelung der Dosis nach Rotation', 'Lyse-Pause vor Rotation', 'Nur Wechsel zwischen i. v. und oral, ohne Wirkstoffwechsel'],
            1,
            'Beim Opioid-Switch (Rotation) z. B. Morphin → Hydromorphon oder Oxycodon → 25–30 % Reduktion der Äquivalenzdosis einplanen wegen unvollständiger Kreuztoleranz; titrieren je nach Wirkung. Begleitend Laxans (obligat, Opioid-induzierte Obstipation) und initial Antiemetikum.'),
        q('Welche Aussage zur primären Prävention durch Statine bei Hochrisiko-Patient (z. B. T2DM mit pAVK) ist richtig?',
            ['LDL-Ziel &lt; 1,4 mmol/l (55 mg/dl) und mind. 50 % Reduktion gegenüber Ausgangswert (ESC 2019/2021)', 'LDL-Ziel &lt; 3 mmol/l ausreichend', 'Statin nicht indiziert bei T2DM allein', 'HDL muss erhöht werden', 'Triglyzeride &lt; 200 ist primäres Ziel'],
            0,
            'Sehr hohes Risiko (KHK, Z. n. ACS, Diabetes mit Endorganschaden, pAVK, CKD G4–5): LDL-Ziel &lt; 1,4 mmol/l (55 mg/dl) und mind. 50 % Reduktion. Hohes Risiko: &lt; 1,8 mmol/l. Therapie: Hochdosis-Statin (Atorvastatin 40–80, Rosuvastatin 20–40), bei Versagen Ezetimib, dann PCSK9-Hemmer. (ESC Lipide 2019/2021)'),
        q('Welche Aussage zum APGAR-Score in der ersten Lebensminute ist falsch?',
            ['Beurteilung von Atmung, Puls, Grundtonus, Aussehen, Reflexe (5 Items à 0–2 Punkte)', 'APGAR &lt; 7 nach 5 min ist Indikation für unmittelbare neonatologische Intervention', 'APGAR korreliert mit dem Langzeit-Outcome bei Termingeborenen', 'APGAR wird nach 1, 5 und 10 min erhoben', 'APGAR ersetzt die Nabelschnur-pH-Messung'],
            4,
            'APGAR-Score erfasst Atmung, Puls, Grundtonus, Aussehen (Hautfarbe), Reflexe — Erhebung nach 1, 5 und 10 min. APGAR ersetzt nicht die Nabelschnur-pH-Messung (objektives Maß der peripartalen Azidose). Beide ergänzen sich. APGAR &lt; 7 nach 5 min: erweiterte Adaptation/Reanimation.'),
        q('Welcher Befund ist NICHT typisch für die Cushing-Syndrom-Symptomatik?',
            ['Vollmondgesicht', 'Stammbetonte Adipositas', 'Striae rubrae', 'Muskelhypertrophie der Extremitäten', 'Hypertonie + Diabetes-Manifestation'],
            3,
            'Cushing-Syndrom: Vollmondgesicht, Stiernacken, stammbetonte Adipositas, Striae rubrae, dünne Extremitäten mit Muskelatrophie (Cortisol → Proteolyse), Hypertonie, Diabetes, Osteoporose, Hautatrophie, Akne. Diagnostik: 1-mg-Dexamethason-Suppressionstest, 24-h-Urin-Cortisol, später ACTH-Differenzierung.'),
        q('Welche Aussage zur Hypertonie-Stufentherapie ist nach ESC 2024 falsch?',
            ['Single-Pill-Kombination ACE-Hemmer/ARB + Calcium-Antagonist oder + Thiazid als Initialtherapie ist Standard.', 'β-Blocker sind 1. Wahl bei jedem Hypertoniker ohne Komorbidität.', 'Spironolacton ist 4. Stufe bei resistenter Hypertonie.', 'RR-Ziel ≤ 65 J. systolisch &lt; 130 mmHg.', 'Bei ≥ 80 J. systolischer Zielkorridor 140–149 mmHg.'],
            1,
            'β-Blocker sind nicht 1. Wahl bei isolierter Hypertonie ohne Komorbidität — Indikation v. a. bei KHK, Herzinsuffizienz, Tachyarrhythmie. Erstlinien-Single-Pill: ACE-Hemmer/ARB + CCB oder + Thiazid. Spironolacton 4. Stufe bei resistenter Hypertonie (PATHWAY-2). RR-Ziele wie zitiert. (ESC 2024)'),
        q('Welche Aussage zur S3-Leitlinie Patientenverfügung / Angehörigenkommunikation in der Geriatrie ist korrekt?',
            ['Patientenverfügung ist verpflichtend für alle &gt; 60 J.', 'Frühzeitige strukturierte Vorausplanung ("Advance Care Planning") wird im Alter und bei Polymorbidität empfohlen, schriftliche Patientenverfügung sowie Vorsorgevollmacht stärken die Patientenautonomie.', 'Angehörige entscheiden ohne Vollmacht.', 'Patientenverfügung ist nur in Hospizen erforderlich.', 'Eine schriftliche Patientenverfügung ist juristisch nicht bindend.'],
            1,
            'Advance Care Planning (ACP) und Patientenverfügung + Vorsorgevollmacht stärken die Patientenautonomie und entlasten Angehörige. § 1827 BGB verlangt schriftliche Verfügung mit konkreter Bezugnahme auf bestimmte Behandlungssituationen. Ohne Vorsorgevollmacht entscheidet im Bedarfsfall ein Betreuungsgericht über Bestellung eines Betreuers (seit 2023 Ehegattennotvertretungsrecht in begrenztem Umfang).'),
        q('Welche Aussage zur Demenzdiagnostik in der Hausarztpraxis (S3-Demenz 038-013) ist richtig?',
            ['Eine Bildgebung ist obsolet.', 'Stufendiagnostik: Anamnese inkl. Fremdanamnese, Mini-Mental-Status (MMSE) oder Montreal Cognitive Assessment (MoCA) als Screening, Labor zum Ausschluss reversibler Ursachen (TSH, B12, Folat), zerebrale Bildgebung (MRT bevorzugt) zur Differenzialdiagnostik.', 'L-Thyroxin ist Standardtherapie der Demenz.', 'Donepezil 10 mg ist 1. Wahl bei jeder Demenzform unabhängig von der Ursache.', 'Eine Liquor-Diagnostik ist routinemäßig erforderlich.'],
            1,
            'S3 Demenz 038-013: Stufendiagnostik. Screening MMSE/MoCA (MoCA sensitiver für leichte kognitive Störung). Labor: TSH, B12, Folat (reversible Ursachen). Bildgebung MRT (oder CT): Atrophiemuster, Gefäßänderungen, Tumor. Liquor (Aβ42/Tau) bei differenzialdiagnostischer Unsicherheit. Therapie: Cholinesterasehemmer (Donepezil, Rivastigmin, Galantamin) bei AD leicht–mittel; Memantin (NMDA-Antagonist) bei mittel–schwer.')
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
        chapters: [
            {
                id: 'vorklinik_m1',
                title: 'Kapitel 1 — Vorklinik (M1): Basiswissen des Lebens',
                summary: 'Wissenschaftliche Prinzipien der Allgemeinmedizin, Anatomie mit klinischem Bezug (Recurrens, vegetatives NS, LWS-Radikulopathien), Physiologie und Biochemie (Bohr-Effekt, 2,3-BPG, Glykolyse, Purinabbau, CYP-System) sowie pharmakologische Grundlagen (LADME, t₁/₂, therapeutischer Index, Pharmakogenetik CYP2D6/CYP2C9/VKORC1/TPMT/DPYD, Dosis-Anpassung bei Niereninsuffizienz).',
                pages: [PAGE_PRINZIPIEN, PAGE_ANATOMIE, PAGE_PHYSIO_BIOCHEM, PAGE_PHARMAKO_GRUNDLAGEN],
                quiz: QUIZ_M1
            },
            {
                id: 'klinik_m2',
                title: 'Kapitel 2 — Klinik (M2): Pathophysiologie und Therapie',
                summary: 'Kardiologie (HFrEF Fantastic Four, ACS, Vorhofflimmern mit CHA₂DS₂-VASc), Pneumologie (GINA 2024, GOLD 2024, CRB-65), Pharmakologie (DOAK-Interaktionen, Antibiotic Stewardship), Lyme-Borreliose nach AWMF 013-080 sowie Endokrinologie & Hypertonie (NVL Diabetes 2023, ESH 2023/ESC 2024 RR-Ziele, Schilddrüse Hashimoto/Basedow, Cushing/Addison).',
                pages: [PAGE_KARDIO, PAGE_PNEUMO, PAGE_PHARMA_INFEKT, PAGE_ENDOKRIN_HTN],
                quiz: QUIZ_M2
            },
            {
                id: 'pj_facharzt',
                title: 'Kapitel 3 — PJ und Facharzt Allgemeinmedizin',
                summary: 'Multimorbidität und Polypharmazie (PRISCUS 2.0, STOPP/START V3, FORTA), Prävention (Check-up 35, Screening-Programme, STIKO 2024 inkl. RSV-Empfehlung), Geriatrie (Frailty nach Fried, Demenz-Screening), Palliativmedizin (AAPV/SAPV), juristische Grundlagen (BGB § 1827) sowie Notfallmedizin und Schmerztherapie (ABCDE, Anaphylaxie, Hypoglykämie, hypertensiver Notfall, WHO-Stufenschema, Opioid-Rotation, BLS/ALS).',
                pages: [PAGE_POLYPHARMA, PAGE_PRAEVENTION, PAGE_RECHT_GERIATRIE, PAGE_NOTFALL_SCHMERZ],
                quiz: QUIZ_FA
            }
        ]
    });
})();
