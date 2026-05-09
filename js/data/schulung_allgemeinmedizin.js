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
 * Status: produktiv. Vorlesungsbegleitendes Skript mit ≥ 50 quellenbasierten
 * IMPP-Fragen pro Kapitel und didaktisch ausgearbeiteten Lehrseiten
 * (Lernziele, numerierte Subsections, Tabellen, KaTeX-Formeln,
 * klinische Beispiele, Quellen-Footer).
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
            + '<blockquote><strong>Lernziele dieser Einheit.</strong> Nach Bearbeitung können Sie (1) das bio-psycho-soziale Modell und das Konzept des hermeneutischen Fallverstehens erklären, (2) Red-Flag-Strategien für die wichtigsten Beratungsanlässe der Primärversorgung anwenden, (3) abwartendes Offenlassen begründen und Delayed Prescription leitliniengerecht einsetzen, (4) den positiv-prädiktiven Wert eines diagnostischen Tests aus Prävalenz, Sensitivität und Spezifität herleiten und (5) die quartäre Prävention nach Jamoulle gegen Übermedikalisierung abgrenzen.</blockquote>'

            + '<h4>1.1.1 Was unterscheidet Allgemeinmedizin von Spezialdisziplinen?</h4>'
            + '<p>Die Allgemeinmedizin ist die Disziplin der Primärversorgung. Sie unterscheidet sich von hochspezialisierter Klinik nicht primär durch Faktenwissen, sondern durch ihren <strong>Denkrahmen</strong>: Beschwerden werden im Kontext von Lebenswelt, Familie und psychosozialer Situation interpretiert (<em>bio-psycho-soziales Modell</em> nach George Engel, Science 1977). Während die Klinik-Disziplinen vorgefilterte, tendenziell schwerere Krankheitsbilder sehen, bekommt der Hausarzt das ungefilterte Symptomspektrum der Bevölkerung — meist niedrige Vortestwahrscheinlichkeit für schwere Erkrankungen und hohe Variabilität.</p>'
            + '<p>Drei Kernfunktionen prägen die Disziplin: <strong>Filter</strong> (Triage zwischen banalen und ernsten Verläufen), <strong>Lotse</strong> (Steuerung durch das Gesundheitssystem) und <strong>kontinuierlicher Begleiter</strong> (longitudinale Betreuung über Jahre/Jahrzehnte). Dieser longitudinale Aspekt ist evidenzbasiert vorteilhaft: Pereira-Gray et al. (BMJ Open 2018) zeigten in einer Metaanalyse aus 22 Ländern, dass Kontinuität der hausärztlichen Betreuung mit reduzierter Gesamtmortalität assoziiert ist.</p>'

            + '<h4>1.1.2 Hermeneutisches Fallverstehen</h4>'
            + '<p>Symptome werden nicht isoliert betrachtet, sondern als Teil einer Erzählung des Patienten. Ein chronischer Rückenschmerz bei einer alleinerziehenden Mutter mit Pflegefall in der Familie hat eine andere Bedeutung als derselbe Schmerz bei einem leistungssportlich aktiven Patienten. Die hausärztliche Anamnese fragt deshalb explizit nach Lebenskontext, Arbeitsbelastung und sozialer Unterstützung. Das ist keine Esoterik: prospektive Kohortenstudien zeigen, dass die Erhebung psychosozialer Faktoren Adhärenz und Outcome messbar verbessert.</p>'
            + '<p>Strukturierte Anamnese-Tools:</p>'
            + '<ul>'
            + '<li><strong>SAMPLE</strong> (Symptome, Allergien, Medikamente, Patientengeschichte, Letzte Mahlzeit, Ereignis) — Notfall-Standard.</li>'
            + '<li><strong>OPQRST</strong> (Onset, Provokation, Qualität, Region/Ausstrahlung, Schwere, Time) — Schmerzanamnese.</li>'
            + '<li><strong>BATHE</strong> (Background, Affect, Trouble, Handling, Empathy) — psychosoziale Kurzanamnese in 5 Minuten (Stuart/Lieberman).</li>'
            + '</ul>'

            + '<h4>1.1.3 Abwendbar gefährliche Verläufe (AGV) und Red Flags</h4>'
            + '<p>Die primäre Aufgabe bei unklaren Symptomen ist nicht die exakte Diagnose, sondern der sichere Ausschluss lebensbedrohlicher Ursachen. Robert N. Braun (DEGAM-Pionier) prägte den Begriff <em>abwendbar gefährlicher Verlauf</em>. Die DEGAM-Leitlinien führen dafür strukturierte Red-Flag-Listen, die in jeder Konsultation aktiv abgefragt werden.</p>'
            + '<table><thead><tr><th>Beratungsanlass</th><th>Red Flags (Auswahl)</th></tr></thead><tbody>'
            + '<tr><td>Brustschmerz</td><td>Belastungsabhängig, Ausstrahlung in Arm/Kiefer, vegetative Symptome (ACS); plötzlicher Vernichtungsschmerz mit Rücken-Ausstrahlung, RR-Differenz Arme &gt; 20 mmHg (Aortendissektion); Dyspnoe + einseitiger Pleuritisschmerz, Tachykardie, Beinschwellung (LAE)</td></tr>'
            + '<tr><td>Kreuzschmerz</td><td>Trauma, Tumoranamnese, Fieber, Gewichtsverlust, neurologisches Defizit, Reithosenanästhesie, Blasen-/Mastdarmstörung (Cauda equina), nächtlicher Schmerz, Dauersteroide</td></tr>'
            + '<tr><td>Kopfschmerz</td><td>Donnerschlag (SAB), Fieber + Meningismus, fokal-neurologisch, Visusstörung + Kieferclaudicatio &gt; 50 J. (Riesenzellarteriitis), HIV/Immunsuppression</td></tr>'
            + '<tr><td>Husten</td><td>Hämoptyse, B-Symptomatik, Raucher mit Stimmänderung, Belastungsdyspnoe progredient</td></tr>'
            + '<tr><td>Bauchschmerz</td><td>Abwehrspannung, Schock, blutiger Stuhl, Ikterus, Schwangerschaft mit Vaginalblutung (EUG), &gt; 50 J. neu auftretend</td></tr>'
            + '</tbody></table>'

            + '<h4>1.1.4 Abwartendes Offenlassen und Delayed Prescription</h4>'
            + '<p>Bei selbstlimitierenden Erkrankungen (akute Bronchitis, unspezifischer Kreuzschmerz, leichte Gastroenteritis) ist die evidenzbasierte Strategie häufig <em>Aufklärung plus zeitlich begrenzte Re-Evaluation</em>, nicht sofortige Diagnostik oder Therapie. Diese Strategie verhindert Überdiagnostik (<strong>quartäre Prävention</strong> nach Marc Jamoulle 1986) und Medikalisierung.</p>'
            + '<p><strong>Delayed Prescription</strong> (Verzögertes Rezept) bedeutet: Rezept für den Bedarfsfall — einlösbar, wenn die Symptome bis Tag X nicht abklingen. Cochrane-Review Spurling et al. 2017: Antibiotika-Verbrauch bei akuten Atemwegsinfekten halbiert sich gegenüber sofortiger Verschreibung, ohne dass die Patientenzufriedenheit oder die Komplikationsrate steigen. S3-Leitlinien CAP/Husten und akute Rhinosinusitis empfehlen das Vorgehen explizit.</p>'

            + '<h4>1.1.5 Bayes-Logik in der Primärversorgung</h4>'
            + '<p>Der prädiktive Wert eines Tests hängt nicht nur von Sensitivität (Sens) und Spezifität (Spez) ab, sondern entscheidend von der <strong>Vortestwahrscheinlichkeit</strong> (Prävalenz $p$). Es gilt:</p>'
            + '<p>$$\\text{PPV}=\\frac{\\text{Sens}\\cdot p}{\\text{Sens}\\cdot p+(1-\\text{Spez})\\cdot(1-p)}\\quad\\quad \\text{NPV}=\\frac{\\text{Spez}\\cdot(1-p)}{\\text{Spez}\\cdot(1-p)+(1-\\text{Sens})\\cdot p}$$</p>'
            + '<p><strong>Rechenbeispiel:</strong> D-Dimer bei niedriger Wells-Wahrscheinlichkeit für eine LAE (Prätest ~5 %). Sens 95 %, Spez 50 %. PPV = (0,95 · 0,05) / (0,95 · 0,05 + 0,5 · 0,95) ≈ 9 %. Ein positives D-Dimer "beweist" also bei niedriger Vortestwahrscheinlichkeit nichts; sein Wert liegt im hohen <em>negativ-prädiktiven</em> Wert (Ausschlusstest). Lehre: Tests nur anfordern, deren Ergebnis das Vorgehen ändert (<em>Choosing Wisely</em>).</p>'
            + '<p>Likelihood-Ratios verdichten diese Logik in eine kompakte Form: $\\text{LR}^+ = \\text{Sens}/(1-\\text{Spez})$. LR⁺ &gt; 10 oder LR⁻ &lt; 0,1 verschiebt die posttest-Wahrscheinlichkeit klinisch relevant.</p>'

            + '<h4>1.1.6 Epidemiologie als Lernpriorisierung</h4>'
            + '<p>In der Hausarztpraxis dominieren zehn Beratungsanlässe rund zwei Drittel aller Konsultationen (ZI-Versorgungsatlas 2023): Hypertonie-Verlaufskontrolle, Husten, Rückenschmerz, Müdigkeit, Bauchschmerz, Kopfschmerz, depressive Verstimmung, Diabetes-Kontrolle, Impfung, Hautausschlag. Wer effizient lernt, gewichtet Vorbereitung nach realer Prävalenz, nicht nach Lehrbuch-Seitenzahl.</p>'

            + '<h4>1.1.7 Quartäre Prävention</h4>'
            + '<p>Die vier Präventionsebenen nach Leavell/Clark und Jamoulle:</p>'
            + '<table><thead><tr><th>Ebene</th><th>Ziel</th><th>Beispiel</th></tr></thead><tbody>'
            + '<tr><td>Primär</td><td>Erkrankung verhindern</td><td>Impfung, Tabakprävention</td></tr>'
            + '<tr><td>Sekundär</td><td>Frühstadium erkennen</td><td>Mammographie, FOBT</td></tr>'
            + '<tr><td>Tertiär</td><td>Folgeschäden verhindern</td><td>Rehabilitation nach Apoplex</td></tr>'
            + '<tr><td>Quartär</td><td>Schaden durch Medizin verhindern</td><td>Bagatell-PSA-Screening unterlassen, Polypharmazie reduzieren</td></tr>'
            + '</tbody></table>'

            + '<h4>1.1.8 EBM-Hierarchie und Leitlinien-Logik in Deutschland</h4>'
            + '<p>Evidenzhierarchie absteigend: systematische Reviews/Metaanalysen RCTs → einzelne RCTs → Kohortenstudien → Fall-Kontroll-Studien → Fallserien → Expertenmeinung. AWMF-Leitlinien werden klassifiziert als S1 (Expertenkonsens), S2k (konsensbasiert), S2e (evidenzbasiert), S3 (evidenz- und konsensbasiert, höchste Stufe). NVL = Nationale VersorgungsLeitlinie (BÄK + KBV + AWMF, immer S3-Niveau).</p>'

            + '<p class="quellen"><em>Quellen:</em> Engel GL, Science 1977; Pereira-Gray DJ et al. BMJ Open 2018; Spurling GK et al. Cochrane 2017; Braun RN, Lehrbuch Allgemeinmedizin 1976; Jamoulle M, 1986; DEGAM-Leitlinien (Husten 053-013, Kreuzschmerz NVL nvl-007); Choosing Wisely Deutschland 2024.</p>'
    };

    const PAGE_ANATOMIE = {
        title: '1.2 Anatomie und Histologie mit klinischem Bezug',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Nach Bearbeitung können Sie (1) den Verlauf des N. laryngeus recurrens und die Funktion der Kehlkopfmuskeln benennen, (2) das vegetative Nervensystem mit seinen Rezeptor-Subtypen und pharmakologischen Angriffspunkten verknüpfen, (3) die Wurzelsyndrome L4–S1 klinisch abgrenzen, (4) die Inhalte des Karpaltunnels und der Loge de Guyon korrekt zuordnen, (5) die histologischen Wandbauprinzipien Atemwege/Niere/Knochen mit pharmakologischen Angriffspunkten korrelieren.</blockquote>'

            + '<p>Anatomisches Wissen ist im IMPP-Stil fast nie reiner Selbstzweck — geprüft wird die <em>klinische Konsequenz</em>. Diese Vorlesungseinheit zeigt fünf Beispielsysteme, deren topographische Beziehungen in M1 und M2 wiederholt geprüft werden.</p>'

            + '<h4>1.2.1 Schilddrüse und N. laryngeus recurrens</h4>'
            + '<p>Der N. laryngeus recurrens (NLR) ist ein Ast des N. vagus (X). Links schlingt er sich um den <strong>Aortenbogen</strong> (zwischen Lig. arteriosum und Aorta), rechts um die <strong>A. subclavia</strong> und steigt im <strong>Sulcus tracheoesophageus</strong> wieder auf. In dieser Rinne verläuft er eng entlang der Schilddrüsenkapsel — bei Thyreoidektomie ist er der am häufigsten verletzte Nerv. Verletzungsrate in spezialisierten Zentren &lt; 1 %, in unspezialisierten bis 5 %.</p>'
            + '<p>Innervationsregel: <strong>alle inneren Kehlkopfmuskeln außer dem M. cricothyroideus</strong> (dieser wird vom N. laryngeus superior, R. externus, innerviert). Funktionell entscheidend ist der <strong>M. cricoarytenoideus posterior (Posticus)</strong> — der einzige Öffner der Stimmritze. Klinik:</p>'
            + '<ul>'
            + '<li><strong>Einseitige Recurrensparese:</strong> Heiserkeit, Hauchatmung, evtl. Aspirationsneigung.</li>'
            + '<li><strong>Beidseitige Parese in Paramedianstellung:</strong> lebensbedrohliche Atemnot in Ruhe, Tracheotomie-Indikation.</li>'
            + '<li><strong>Sensible Innervation des Larynx</strong> ober- und unterhalb der Glottis: oberhalb durch N. laryngeus superior R. internus, unterhalb durch NLR — wichtig bei Hustenreflex und Aspiration.</li>'
            + '</ul>'

            + '<h4>1.2.2 Vegetatives Nervensystem und seine Rezeptoren</h4>'
            + '<p>Sympathikus (thorakolumbaler Ursprung Th1–L2/3) und Parasympathikus (kraniosakraler Ursprung — Hirnnerven III, VII, IX, X und S2–S4) wirken antagonistisch. Die Pharmakologie greift an klar definierten Rezeptorklassen:</p>'
            + '<table><thead><tr><th>Rezeptor</th><th>Lokalisation</th><th>Effekt</th><th>Pharmakologie</th></tr></thead><tbody>'
            + '<tr><td>α1</td><td>Gefäße, Iris, Blasenhals, Prostata</td><td>Vasokonstriktion, Mydriasis</td><td>Phenylephrin (Decongestans), Doxazosin/Tamsulosin (BPH)</td></tr>'
            + '<tr><td>α2 (präsynaptisch)</td><td>Sympathische Nervenendigungen, ZNS</td><td>Auto-Inhibition der NA-Freisetzung</td><td>Clonidin (Sympathikolyse, RR ↓, Sedierung)</td></tr>'
            + '<tr><td>β1</td><td>Herz, Niere (Renin)</td><td>Inotropie ↑, Chronotropie ↑, Renin ↑</td><td>Bisoprolol/Metoprolol (HFrEF, KHK)</td></tr>'
            + '<tr><td>β2</td><td>Bronchien, Uterus, glatte Muskulatur</td><td>Bronchodilatation, Tokolyse</td><td>Salbutamol (SABA), Formoterol (LABA), Fenoterol (Tokolyse)</td></tr>'
            + '<tr><td>β3</td><td>Detrusor, Fettgewebe</td><td>Detrusor-Relaxation</td><td>Mirabegron (Reizblase, Alternative zu Anticholinergika)</td></tr>'
            + '<tr><td>M1</td><td>ZNS, autonome Ganglien</td><td>Kognition</td><td>Donepezil/Rivastigmin (AChE-Hemmer bei AD)</td></tr>'
            + '<tr><td>M2</td><td>Sinus-/AV-Knoten</td><td>Bradykardie, Überleitung ↓</td><td>Atropin (Bradykardie)</td></tr>'
            + '<tr><td>M3</td><td>Bronchien, glatte Muskulatur, Drüsen</td><td>Bronchokonstriktion, Sekretion</td><td>Tiotropium/Glycopyrronium (LAMA, COPD)</td></tr>'
            + '<tr><td>Nikotinisch (Nₘ)</td><td>Motorische Endplatte</td><td>Muskelkontraktion</td><td>Rocuronium (Muskelrelaxans), Pyridostigmin (Myasthenia gravis)</td></tr>'
            + '</tbody></table>'

            + '<h4>1.2.3 Wurzelsyndrome der Lendenwirbelsäule</h4>'
            + '<p>Bandscheibenvorfälle treffen in &gt; 90 % die Etagen L4/L5 und L5/S1. Wegen der schräg verlaufenden Nervenwurzeln komprimiert ein medio-lateraler Vorfall in der Etage L4/L5 typischerweise die <strong>L5</strong>-Wurzel; ein Vorfall L5/S1 die <strong>S1</strong>-Wurzel.</p>'
            + '<table><thead><tr><th>Wurzel</th><th>Reflex</th><th>Hypästhesie</th><th>Kennmuskel / Schwäche</th></tr></thead><tbody>'
            + '<tr><td>L4</td><td>PSR (Patellarsehnen-Reflex) ↓</td><td>Knie / mediale Wade</td><td>M. quadriceps, M. tibialis anterior (Knieextension, Fußheber)</td></tr>'
            + '<tr><td>L5</td><td>kein eigener Reflex</td><td>Fußrücken, Großzehe</td><td>M. extensor hallucis longus (Großzehenheber)</td></tr>'
            + '<tr><td>S1</td><td>ASR (Achillessehnenreflex) ↓</td><td>Laterale Fußkante</td><td>M. triceps surae (Plantarflexion, Zehenstand)</td></tr>'
            + '</tbody></table>'
            + '<p>Cauda-equina-Syndrom: Reithosenanästhesie, Blasen-/Mastdarmstörung, beidseitige Schwäche → notfallmäßige Bildgebung und neurochirurgische Dekompression &lt; 24 h.</p>'

            + '<h4>1.2.4 Karpaltunnel vs. Loge de Guyon</h4>'
            + '<p>Im <strong>Karpaltunnel</strong> verlaufen 10 Strukturen: N. medianus + 9 Beugesehnen (1 × M. flexor pollicis longus, 4 × M. flexor digitorum superficialis, 4 × M. flexor digitorum profundus). Die Sehne des M. flexor carpi radialis liegt in einer eigenen Loge radial davon. Die <strong>A. ulnaris</strong> verläuft zusammen mit dem N. ulnaris in der <em>Loge de Guyon</em> radial des Os pisiforme — nicht im Karpaltunnel.</p>'
            + '<p>Karpaltunnelsyndrom: nächtliche Brachialgia paraesthetica, Parästhesien Daumen/Zeigefinger/Mittelfinger und radiale Hälfte des Ringfingers, später Thenar-Atrophie. Tests: Phalen, Hoffmann-Tinel. Therapie: Nachtschiene → Cortison-Infiltration → operative Spaltung des Retinaculum flexorum.</p>'

            + '<h4>1.2.5 Hirnnerven mit Praxis-Konsequenz</h4>'
            + '<table><thead><tr><th>HN</th><th>Funktion</th><th>Klinischer Bezug</th></tr></thead><tbody>'
            + '<tr><td>V (Trigeminus, V3)</td><td>Motorisch Kau-Muskulatur, somatosensibel vordere 2/3 Zunge</td><td>Trigeminusneuralgie (Carbamazepin)</td></tr>'
            + '<tr><td>VII (Facialis)</td><td>Mimische Muskulatur, Geschmack vordere 2/3 (Chorda tympani), Tränen-/Speicheldrüsen</td><td>Periphere Fazialisparese (auch Stirnast!) vs. zentrale (Stirnast erhalten)</td></tr>'
            + '<tr><td>IX (Glossopharyngeus)</td><td>Geschmack hinteres 1/3 Zunge, Pharynx</td><td>Würgereflex, Schluckakt</td></tr>'
            + '<tr><td>X (Vagus)</td><td>Innere Organe, Larynx (NLR!)</td><td>Recurrensparese</td></tr>'
            + '<tr><td>XII (Hypoglossus)</td><td>Zungenmuskulatur</td><td>Zungenabweichung zur kranken Seite (Apoplex)</td></tr>'
            + '</tbody></table>'

            + '<h4>1.2.6 Histologie mit Krankheitsbezug</h4>'
            + '<ul>'
            + '<li><strong>Respiratorisches Flimmerepithel:</strong> mehrreihiges hochprismatisches Epithel mit Zilien und Becherzellen. Bei chronischer Bronchitis (COPD) entwickeln Raucher eine Plattenepithelmetaplasie — Zilienverlust, schlechtere mukoziliäre Clearance, Teufelskreis chronischer Infekte.</li>'
            + '<li><strong>Alveolarepithel:</strong> Typ-I-Pneumozyten (Gasaustausch, ~95 % der alveolären Oberfläche, kaum regenerationsfähig) und Typ-II-Pneumozyten (Surfactant-Produktion, Stammzelle für Typ I). Surfactant-Mangel beim Frühgeborenen → IRDS, Therapie mit exogenem Surfactant.</li>'
            + '<li><strong>Glomerulus / Tubulus-System:</strong> Wirkort der Diuretika. Schleifendiuretika (Furosemid, Torasemid) hemmen den Na-K-2Cl-Cotransporter (NKCC2) im aufsteigenden Ast der Henle-Schleife; Thiazide hemmen den Na-Cl-Cotransporter (NCC) im distalen Tubulus; MRA (Spironolacton, Eplerenon) blockieren Aldosteron-Rezeptoren der Hauptzellen im Sammelrohr; SGLT2-Inhibitoren wirken im proximalen Tubulus.</li>'
            + '<li><strong>Macula densa:</strong> spezialisierte Tubuluszellen am distalen Tubulus, sensieren NaCl-Konzentration. Bei niedrigem NaCl → Stimulation der Renin-Freisetzung aus juxtaglomerulären Zellen (tubuloglomerulärer Feedback). NSAR hemmen die prostaglandin-vermittelte Vasodilatation der Vas afferens — kritisch bei vorbestehender CKD.</li>'
            + '<li><strong>Knochen-Remodeling:</strong> Osteoklasten (Hemmung durch Bisphosphonate, Denosumab anti-RANKL) versus Osteoblasten (Stimulation durch Teriparatid PTH 1-34, Romosozumab anti-Sklerostin). Pharmakologische Anker für Osteoporose-Therapie nach DVO-Leitlinie.</li>'
            + '<li><strong>Erythropoese:</strong> Erythropoetin wird in den peritubulären Fibroblasten der Niere gebildet. Hypoxia-Inducible-Factor (HIF) stabilisiert das EPO-Gen-Transkript bei O₂-Mangel. Therapie der CKD-Anämie: ESA (Epoetin) oder HIF-Stabilisator (Roxadustat).</li>'
            + '</ul>'

            + '<p class="quellen"><em>Quellen:</em> Schünke/Schulte/Schumacher, Prometheus Lernatlas, 6. Aufl. 2022; Lüllmann-Rauch, Taschenlehrbuch Histologie, 6. Aufl.; Aktories et al., Allgemeine und spezielle Pharmakologie, 13. Aufl.; Mumenthaler/Mattle, Neurologie, 14. Aufl.</p>'
    };

    const PAGE_PHYSIO_BIOCHEM = {
        title: '1.3 Physiologie und Biochemie: prüfungsrelevante Schaltstellen',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) den Bohr-Effekt und die Rolle von 2,3-BPG quantitativ beschreiben, (2) Glykolyse, PDH, Citratzyklus und Atmungskette mit ihren Schlüsselenzymen und Vitamin-Coenzymen benennen, (3) RAAS und ADH-Wirkung am Tubulus auf zellulärer Ebene erklären, (4) den Säure-Basen-Haushalt mit Henderson-Hasselbalch berechnen, (5) Aktionspotenziale am Arbeits- vs. Knotenmyokard und (6) die Vitamin-K-abhängige Gerinnungsfaktor-Synthese mit Phenprocoumon-Wirkung verbinden.</blockquote>'

            + '<h4>1.3.1 Sauerstofftransport: Bohr-Effekt und 2,3-BPG</h4>'
            + '<p>Hämoglobin liegt im Gleichgewicht zwischen <strong>T-Form</strong> (tense, niedrige O₂-Affinität) und <strong>R-Form</strong> (relaxed, hohe Affinität). Vier Modulatoren verschieben das Gleichgewicht:</p>'
            + '<ul>'
            + '<li><strong>pH ↓ (Azidose):</strong> Rechtsverschiebung — Bohr-Effekt, erleichtert O₂-Abgabe im sauren Gewebe.</li>'
            + '<li><strong>pCO₂ ↑:</strong> Rechtsverschiebung (über H⁺ und Carbamatbindung).</li>'
            + '<li><strong>Temperatur ↑:</strong> Rechtsverschiebung — arbeitende Muskulatur.</li>'
            + '<li><strong>2,3-Bisphosphoglycerat (2,3-BPG) ↑:</strong> Rechtsverschiebung. 2,3-BPG entsteht im <em>Rapoport-Luebering-Bypass</em> der Glykolyse, bindet selektiv die T-Form und stabilisiert sie.</li>'
            + '</ul>'
            + '<p>Bei Höhenaufenthalt oder chronischer Hypoxie steigt die 2,3-BPG-Konzentration in den Erythrozyten innerhalb von Tagen: $$\\text{P}_{50}\\;\\uparrow \\;\\Rightarrow\\; \\text{O}_2\\text{-Affinität}\\;\\downarrow \\;\\Rightarrow\\; \\text{O}_2\\text{-Abgabe ans Gewebe}\\;\\uparrow.$$ Fetales Hb (HbF, $\\alpha_2\\gamma_2$) bindet 2,3-BPG schwach — daher höhere O₂-Affinität, was die transplazentare O₂-Übertragung an den Fetus ermöglicht. Erythrozyten haben keine Mitochondrien und decken ihren Energiebedarf rein durch anaerobe Glykolyse.</p>'

            + '<h4>1.3.2 Glykolyse, PDH und Citratzyklus</h4>'
            + '<p>Glykolyse (Zytosol): Glucose → 2 Pyruvat, Netto +2 ATP, +2 NADH. Schlüsselenzyme: Hexokinase/Glucokinase, Phosphofructokinase-1 (Schrittmacher, allosterisch durch ATP gehemmt, F-2,6-BP aktiviert), Pyruvatkinase. Unter aeroben Bedingungen wird Pyruvat in das Mitochondrium transportiert und durch den <strong>Pyruvatdehydrogenase-Komplex (PDH)</strong> oxidativ decarboxyliert zu Acetyl-CoA.</p>'
            + '<p>PDH benötigt fünf Coenzyme — alle aus B-Vitaminen oder Liponsäure: <em>TPP (B1), Liponamid, CoA (B5), FAD (B2), NAD⁺ (B3)</em>. Bei Vitamin-B1-Mangel (Alkoholismus, Mangelernährung) sammelt sich Pyruvat → Laktat → metabolische Azidose; klinisch <strong>Wernicke-Enzephalopathie</strong> (Trias: Ophthalmoplegie, Ataxie, Verwirrtheit). Therapie: Thiamin <em>vor</em> Glucose-Gabe.</p>'
            + '<p>Citratzyklus: pro Acetyl-CoA → 3 NADH, 1 FADH₂, 1 GTP, 2 CO₂. Atmungskette innere Mitochondrienmembran (Komplex I–IV + ATP-Synthase Komplex V). Ausbeute: ca. 30 ATP pro Glucose komplett aerob.</p>'

            + '<h4>1.3.3 Glukoneogenese und Schlüsselenzyme</h4>'
            + '<p>Drei irreversible Glykolyse-Schritte werden in der Glukoneogenese umgangen: Pyruvat-Carboxylase + PEP-Carboxykinase, Fructose-1,6-Bisphosphatase, Glucose-6-Phosphatase. <strong>Glucose-6-Phosphatase</strong> ist nur in <em>Leber, Niere und Darmepithel</em> exprimiert — der Muskel kann daher seinen Glykogenabbau nicht in Blutglucose umsetzen. Cori-Zyklus: Muskel-Laktat → Leber-Glucose.</p>'
            + '<p>Kontra-insulinäre (gluconeogene) Hormone: Glucagon, Cortisol, Adrenalin, GH. Pharmakologisch: Metformin hemmt mitochondriale Glycerophosphat-DH und reduziert hepatische Glukoneogenese — Erstlinie T2DM (NVL Diabetes 2023).</p>'

            + '<h4>1.3.4 Lipidstoffwechsel</h4>'
            + '<p><strong>Acetyl-CoA-Carboxylase (ACC)</strong> ist Schlüsselenzym der <em>Lipogenese</em> (Acetyl-CoA → Malonyl-CoA), aktiviert durch Insulin und Citrat, gehemmt durch Glucagon und langkettige Acyl-CoA. <strong>β-Oxidation</strong> der Fettsäuren benötigt den <em>Carnitin-Shuttle</em> (CPT1 außen, CPT2 innen) zum Mitochondrien-Import langkettiger Fettsäuren. Pro Zyklus β-Oxidation: 1 FADH₂, 1 NADH, 1 Acetyl-CoA. Ketogenese in der Leber bei langanhaltendem Hunger / Diabetes mellitus → β-Hydroxybutyrat, Acetoacetat (Ketoazidose, DKA).</p>'

            + '<h4>1.3.5 Aminosäuren und PKU</h4>'
            + '<p>Phenylalanin → (Phenylalanin-Hydroxylase, BH₄-Cofaktor) → Tyrosin → DOPA → Dopamin → Noradrenalin → Adrenalin. Phenylketonurie (PKU): Defekt der PAH, Akkumulation von Phenylalanin, Mangel an Tyrosin und Folgeprodukten — geistige Behinderung, helle Hautfarbe (Melanin-Mangel). Neugeborenenscreening obligat. Therapie: phenylalaninarme Diät + Tyrosin-Supplementation.</p>'

            + '<h4>1.3.6 ADH und RAAS</h4>'
            + '<p><strong>ADH (Vasopressin)</strong> wirkt am V2-Rezeptor des Sammelrohrs → Gs → cAMP ↑ → Einbau von <strong>Aquaporin-2</strong> in die luminale Membran → Wasser-Rückresorption. SIADH: zu viel ADH → Hyponatriämie + Hypoosmolarität (Therapie Flüssigkeitsrestriktion, Tolvaptan als V2-Antagonist).</p>'
            + '<p>RAAS: Renin (juxtaglomerulärer Apparat) → Angiotensin I → ACE → <strong>Angiotensin II</strong>. Ang II wirkt: Vasokonstriktion AT1-R, Aldosteron-Freisetzung NNR → Na-Retention im Sammelrohr, Durstgefühl, ADH-Freisetzung. Pharmakologische Hemmung: ACE-Hemmer, ARB, MRA — alle Säulen der HFrEF/Hypertonie. ACE-Hemmer-Husten durch Bradykinin-Akkumulation (ACE = Kininase II).</p>'

            + '<h4>1.3.7 Säure-Basen-Haushalt: Henderson-Hasselbalch</h4>'
            + '<p>$$\\text{pH}=6{,}1+\\log\\frac{[\\text{HCO}_3^-]}{0{,}03\\cdot p\\text{CO}_2}$$</p>'
            + '<p>Normwerte: pH 7,35–7,45; HCO₃⁻ 22–26 mmol/l; pCO₂ 35–45 mmHg. Vier Grundstörungen: respiratorische Azidose/Alkalose (pCO₂-Änderung) und metabolische Azidose/Alkalose (HCO₃⁻-Änderung). Anionenlücke = Na⁺ − (Cl⁻ + HCO₃⁻), Norm 8–16 mmol/l. Hohe AL: Ketoazidose, Laktatazidose, Urämie, Toxine.</p>'

            + '<h4>1.3.8 Niere: GFR und KDIGO-Stadien</h4>'
            + '<table><thead><tr><th>Stadium</th><th>eGFR (ml/min/1,73 m²)</th><th>Bezeichnung</th></tr></thead><tbody>'
            + '<tr><td>G1</td><td>≥ 90</td><td>Normal mit Schaden</td></tr>'
            + '<tr><td>G2</td><td>60–89</td><td>Leichte CKD</td></tr>'
            + '<tr><td>G3a</td><td>45–59</td><td>Mittelgradige CKD</td></tr>'
            + '<tr><td>G3b</td><td>30–44</td><td>Mittelgradige CKD</td></tr>'
            + '<tr><td>G4</td><td>15–29</td><td>Schwere CKD</td></tr>'
            + '<tr><td>G5</td><td>&lt; 15</td><td>Nierenversagen / Dialyse</td></tr>'
            + '</tbody></table>'
            + '<p>Spironolacton ist als MRA an den Aldosteron-Rezeptoren der Sammelrohr-Hauptzellen wirksam und führt zu <strong>Hyperkaliämie</strong> — besonders kritisch bei Kombination mit ACE-Hemmer/ARB und Niereninsuffizienz. Kalium-Monitoring obligat.</p>'

            + '<h4>1.3.9 Kardiale Aktionspotenziale</h4>'
            + '<table><thead><tr><th>Phase</th><th>Arbeitsmyokard</th><th>Sinus-/AV-Knoten</th></tr></thead><tbody>'
            + '<tr><td>0</td><td>schneller Na⁺-Einstrom</td><td>langsamer Ca²⁺-Einstrom (L-Typ)</td></tr>'
            + '<tr><td>1</td><td>transienter K⁺-Ausstrom</td><td>—</td></tr>'
            + '<tr><td>2</td><td>Plateau (Ca²⁺-Einstrom = K⁺-Ausstrom)</td><td>—</td></tr>'
            + '<tr><td>3</td><td>K⁺-Ausstrom (Repolarisation)</td><td>K⁺-Ausstrom</td></tr>'
            + '<tr><td>4</td><td>stabiles RP</td><td>diastolische Spontandepolarisation (If, "funny current")</td></tr>'
            + '</tbody></table>'
            + '<p>Ivabradin hemmt selektiv den If-Strom am Sinusknoten → Frequenzsenkung ohne negativ-inotrope Wirkung (HFrEF-Reservetherapie).</p>'

            + '<h4>1.3.10 Neurotransmitter und Pharmaka</h4>'
            + '<ul>'
            + '<li><strong>Glutamat / NMDA-Rezeptor:</strong> exzitatorisch, Ca²⁺-Einstrom, Lerntheorie LTP. Memantin als nicht-kompetitiver NMDA-Antagonist bei moderater bis schwerer Alzheimer-Demenz.</li>'
            + '<li><strong>GABA / GABA_A-Rezeptor:</strong> inhibitorisch, Cl⁻-Einstrom. Benzodiazepine binden allosterisch und erhöhen die Öffnungsfrequenz des Cl⁻-Kanals (nicht die Leitfähigkeit). Antagonist: Flumazenil.</li>'
            + '<li><strong>Acetylcholin:</strong> Endplatten-Übertragung; Hemmung durch nichtdepolarisierende Muskelrelaxanzien (Rocuronium); Reaktivierung durch AChE-Hemmer (Neostigmin).</li>'
            + '</ul>'

            + '<h4>1.3.11 Gerinnung und Vitamin K</h4>'
            + '<p>Vitamin-K-abhängige Faktoren: <strong>II, VII, IX, X</strong> sowie Protein C und Protein S. γ-Glutamylcarboxylierung am Carboxyterminus erlaubt Ca²⁺-Bindung an Membran-Phospholipide. Faktor X ist der gemeinsame Schnittpunkt von intrinsischem und extrinsischem Weg → Prothrombin (II) → Thrombin → Fibrinogen → Fibrin.</p>'
            + '<p><strong>Phenprocoumon</strong> hemmt VKORC1 → keine Regeneration von Hydrochinon-Vit-K → keine γ-Carboxylierung. Wegen unterschiedlicher Halbwertszeiten der Faktoren: Faktor VII ($t_{1/2}\\approx 6\\,\\text{h}$) fällt als erstes ab → INR steigt früh, antikoagulatorischer Vollschutz erst nach Tagen, weil Faktor II ($t_{1/2}\\approx 60\\,\\text{h}$) lange erhält. Daher Bridging mit Heparin bei akutem Antikoagulationsbedarf. Heparin wirkt indirekt via Aktivierung von <strong>Antithrombin III</strong> (1000-fache Beschleunigung der Inaktivierung von Thrombin und Faktor Xa).</p>'

            + '<p class="quellen"><em>Quellen:</em> Schmidt/Lang/Heckmann, Physiologie des Menschen, 32. Aufl. 2019; Rassow/Hauser/Netzker/Deutzmann, Biochemie (Duale Reihe), 5. Aufl. 2022; Boron/Boulpaep, Medical Physiology, 3rd ed. 2017; KDIGO 2024 CKD-Guideline.</p>'
    };

    const PAGE_PHARMAKO_GRUNDLAGEN = {
        title: '1.4 Pharmakologie-Grundlagen: LADME, Halbwertszeit, Therapeutischer Index',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) die LADME-Kette erklären und Bioverfügbarkeit, V_d, Clearance und Halbwertszeit definieren, (2) eine Aufdosierung und das Erreichen des Steady-State berechnen, (3) Phase-I- und Phase-II-Reaktionen mit ihren Coenzymen und Substratbeispielen benennen, (4) lineare 1.-Ordnungs-Kinetik gegen Sättigungs-(Michaelis-Menten-)Kinetik abgrenzen, (5) Wirkstoffe mit enger therapeutischer Breite identifizieren und (6) klinisch relevante CYP-Polymorphismen den Wirkstoffen zuordnen.</blockquote>'

            + '<p>Pharmakologie-Wissen aus der Vorklinik wird in M2 und in der hausärztlichen Praxis ständig abgerufen. Wer das LADME-Modell verstanden hat, kann Interaktionen, Dosisanpassungen und Nebenwirkungen systematisch herleiten — statt sie auswendig zu lernen.</p>'

            + '<h4>1.4.1 LADME-Modell</h4>'
            + '<table><thead><tr><th>Schritt</th><th>Inhalt</th><th>Klinik</th></tr></thead><tbody>'
            + '<tr><td>Liberation</td><td>Freisetzung aus Galenik</td><td>Retard-Tabletten nicht teilen → Dosis-Dumping</td></tr>'
            + '<tr><td>Absorption</td><td>Aufnahme über GI / Haut / SH / i.v.</td><td>Bioverfügbarkeit F (oral/i.v.)</td></tr>'
            + '<tr><td>Distribution</td><td>Verteilung im Körper</td><td>V_d = Dosis / c_Plasma</td></tr>'
            + '<tr><td>Metabolismus</td><td>Phase I + II in der Leber</td><td>CYP-Inhibitoren/-Induktoren</td></tr>'
            + '<tr><td>Elimination</td><td>renal / biliär</td><td>Dosisanpassung nach eGFR</td></tr>'
            + '</tbody></table>'

            + '<h4>1.4.2 Bioverfügbarkeit und First-Pass-Effekt</h4>'
            + '<p>Bioverfügbarkeit $F = \\text{AUC}_{po}/\\text{AUC}_{iv}$. Hoher First-Pass = niedrige Bioverfügbarkeit:</p>'
            + '<table><thead><tr><th>Wirkstoff</th><th>F (oral)</th><th>Konsequenz</th></tr></thead><tbody>'
            + '<tr><td>Propranolol</td><td>~ 0,3</td><td>große interindividuelle Spannweite</td></tr>'
            + '<tr><td>Metoprolol</td><td>~ 0,5</td><td>CYP2D6-abhängig</td></tr>'
            + '<tr><td>Morphin oral</td><td>~ 0,3</td><td>Faktor 3 oral → s.c./i.v.</td></tr>'
            + '<tr><td>Levothyroxin nüchtern</td><td>~ 0,8</td><td>Einnahme 30 min vor Frühstück</td></tr>'
            + '<tr><td>Glyceroltrinitrat oral</td><td>≈ 0</td><td>nur sublingual / transdermal sinnvoll</td></tr>'
            + '</tbody></table>'

            + '<h4>1.4.3 Verteilungsvolumen V_d</h4>'
            + '<p>$V_d = \\text{Dosis}/c_{\\text{Plasma}}$. Hohes V_d (&gt; 1 l/kg) bedeutet starke Gewebebindung:</p>'
            + '<ul>'
            + '<li><strong>Amiodaron</strong> V_d ~ 60 l/kg — extreme Lipophilie, $t_{1/2}$ ~ 50 Tage; Wirkungseintritt langsam, "Aufdosierung" notwendig, Nebenwirkungen (Hypothyreose/Hyperthyreose, Lungenfibrose, Korneaeinlagerungen) persistieren wochenlang nach Absetzen.</li>'
            + '<li><strong>Digoxin</strong> V_d ~ 7 l/kg.</li>'
            + '<li><strong>Warfarin/Phenprocoumon</strong> V_d ~ 0,15 l/kg — stark plasmaeiweißgebunden; Verdrängung aus Albuminbindung erhöht freie Wirkfraktion (Cave NSAR-Komedikation).</li>'
            + '</ul>'

            + '<h4>1.4.4 Halbwertszeit, Clearance, Steady-State</h4>'
            + '<p>$$t_{1/2}=\\frac{\\ln 2 \\cdot V_d}{\\text{CL}}$$</p>'
            + '<p>Bei wiederholter Gabe wird der Steady-State nach etwa <strong>4–5 Halbwertszeiten</strong> erreicht. Beispiel Levothyroxin ($t_{1/2}\\approx 7$ d) → stabile TSH-Kontrolle erst nach 4–6 Wochen, daher TSH-Re-Test frühestens nach 6 Wochen.</p>'
            + '<p>Loading Dose: $\\text{LD}=V_d \\cdot c_{\\text{Ziel}}$. Maintenance Dose: $\\text{MD}=\\text{CL}\\cdot c_{\\text{Ziel}}\\cdot \\tau$. Beispiel Digoxin: bei dringender Aufsättigung Loading Dose, sonst dauert das Erreichen der Wirkung &gt; 1 Woche.</p>'

            + '<h4>1.4.5 Lineare vs. nicht-lineare Kinetik</h4>'
            + '<p>Die meisten Wirkstoffe folgen linearer 1.-Ordnungs-Kinetik (Eliminationsrate proportional zur Plasmakonzentration). Wenige Wirkstoffe zeigen Sättigungskinetik (Michaelis-Menten):</p>'
            + '<ul>'
            + '<li><strong>Ethanol:</strong> Kapazität der Alkoholdehydrogenase begrenzt, ~0,1 ‰/h Eliminationsrate konstant.</li>'
            + '<li><strong>Phenytoin:</strong> bereits im therapeutischen Bereich Sättigung — kleine Dosissteigerung kann zu starker Spiegelerhöhung führen.</li>'
            + '<li><strong>ASS</strong> in höherer Dosis (analgetisch &gt; 1 g): nicht-lineare Pharmakokinetik.</li>'
            + '</ul>'

            + '<h4>1.4.6 Phase-I- und Phase-II-Reaktionen</h4>'
            + '<table><thead><tr><th>Phase</th><th>Reaktion</th><th>Enzyme</th><th>Beispiel</th></tr></thead><tbody>'
            + '<tr><td>I</td><td>Oxidation, Reduktion, Hydrolyse</td><td>CYP450 (CYP3A4 ~ 50 %, CYP2D6 ~ 25 %, CYP2C9, CYP2C19)</td><td>Diazepam → Oxazepam</td></tr>'
            + '<tr><td>II</td><td>Konjugation</td><td>UGT (Glucuronidierung), Sulfotransferasen, NAT (Acetylierung), GST (Glutathion)</td><td>Paracetamol → Glucuronid/Sulfat (sicher), CYP-Weg → NAPQI (toxisch)</td></tr>'
            + '</tbody></table>'

            + '<h4>1.4.7 CYP-Inhibitoren und -Induktoren</h4>'
            + '<ul>'
            + '<li><strong>Klassische Inhibitoren:</strong> Makrolide (Erythro/Clarithromycin, <em>nicht</em> Azithromycin), Azol-Antimykotika (Itra/Vori/Posaconazol), HIV-Proteasehemmer (Ritonavir), Grapefruitsaft, Verapamil, Diltiazem, Amiodaron, Cimetidin.</li>'
            + '<li><strong>Klassische Induktoren:</strong> Rifampicin, Carbamazepin, Phenytoin, Phenobarbital, Johanniskraut, chronischer Alkohol (CYP2E1).</li>'
            + '<li><strong>CYP2D6-Inhibitoren:</strong> Fluoxetin, Paroxetin, Bupropion → Codein wirkt nicht, Metoprolol-Spiegel ↑.</li>'
            + '</ul>'

            + '<h4>1.4.8 Pharmakogenetik im Alltag</h4>'
            + '<table><thead><tr><th>Gen / Polymorphismus</th><th>Wirkstoff</th><th>Klinische Folge</th></tr></thead><tbody>'
            + '<tr><td>CYP2D6 (PM 7–10 % MitteleuropäerInnen)</td><td>Codein → Morphin</td><td>PM: keine Analgesie; UM: rasche Atemdepression</td></tr>'
            + '<tr><td>CYP2C9 + VKORC1</td><td>Phenprocoumon, Warfarin</td><td>Dosisbedarf variiert um Faktor 10</td></tr>'
            + '<tr><td>CYP2C19</td><td>Clopidogrel (Prodrug)</td><td>PM: schlechte Aktivierung, Stent-Thrombose ↑ — alternativ Ticagrelor/Prasugrel</td></tr>'
            + '<tr><td>TPMT</td><td>Azathioprin / 6-MP</td><td>Defekt: schwere Knochenmarkdepression; Test vor Therapie</td></tr>'
            + '<tr><td>DPYD</td><td>5-FU, Capecitabin</td><td>EMA seit 2020: Test obligat; Defekt: lebensbedrohliche Toxizität</td></tr>'
            + '<tr><td>UGT1A1</td><td>Irinotecan</td><td>Gilbert-Meulengracht: schwere Diarrhoe / Neutropenie</td></tr>'
            + '<tr><td>HLA-B*57:01</td><td>Abacavir</td><td>Hypersensitivität — Test vor HIV-Therapie</td></tr>'
            + '</tbody></table>'

            + '<h4>1.4.9 Therapeutischer Index und enge therapeutische Breite</h4>'
            + '<p>Therapeutischer Index = LD₅₀ / ED₅₀. Wirkstoffe mit enger Breite erfordern Spiegelmonitoring oder INR-Management:</p>'
            + '<ul>'
            + '<li><strong>Phenprocoumon / Warfarin:</strong> INR-Ziel 2,0–3,0 (mech. Mitralklappe 2,5–3,5).</li>'
            + '<li><strong>Digoxin:</strong> Zielspiegel 0,5–0,8 ng/ml (HFrEF), Toxizitätsschwelle ab 1,2 ng/ml. Cave Hypokaliämie potenziert Digoxin-Toxizität.</li>'
            + '<li><strong>Lithium:</strong> 0,6–0,8 mmol/l (akute Manie bis 1,2); Intoxikation ab 1,5 mmol/l. Spiegel ↑ durch Thiazide, ACE-Hemmer, NSAR, Dehydratation.</li>'
            + '<li><strong>Theophyllin:</strong> 8–15 mg/l. CYP1A2-Substrat — Spiegel ↑ durch Ciprofloxacin.</li>'
            + '<li><strong>Aminoglykoside:</strong> Once-daily-Schema mit Talspiegel-Kontrolle, sonst Oto-/Nephrotoxizität.</li>'
            + '</ul>'

            + '<h4>1.4.10 Dosisanpassung bei Niereninsuffizienz</h4>'
            + '<p>Vor jeder Verschreibung in der Hausarztpraxis aktuelle eGFR (CKD-EPI 2021) prüfen:</p>'
            + '<ul>'
            + '<li><strong>Metformin:</strong> reduzierte Dosis bei eGFR 30–60, Stopp bei eGFR &lt; 30 — Laktatazidose.</li>'
            + '<li><strong>Apixaban:</strong> Reduktion auf 2 × 2,5 mg bei 2 von 3 Kriterien: Krea ≥ 1,5 mg/dl, Alter ≥ 80 J., Gewicht ≤ 60 kg.</li>'
            + '<li><strong>Aciclovir:</strong> bei eGFR &lt; 50 reduzieren — sonst kristalline Nephropathie.</li>'
            + '<li><strong>Aminoglykoside:</strong> jede Niereninsuffizienz → Spiegelmonitoring und Intervallverlängerung.</li>'
            + '</ul>'

            + '<h4>1.4.11 Paracetamol-Mechanismus (klinisch wichtig)</h4>'
            + '<p>Paracetamol wirkt überwiegend zentral: schwache COX-Hemmung im ZNS, möglicherweise Modulation des endocannabinoiden Systems. Metabolismus: ~ 90 % Phase-II-Konjugation (Glucuronid, Sulfat) — sicher; ~ 5–10 % CYP2E1 → reaktives <strong>NAPQI</strong>, das normalerweise mit Glutathion entgiftet wird. Bei Überdosis Glutathion-Erschöpfung → hepatozelluläre Nekrose. Antidot: <strong>N-Acetylcystein</strong> (NAC) als Glutathion-Vorstufe.</p>'

            + '<p class="quellen"><em>Quellen:</em> Aktories/Förstermann/Hofmann/Starke, Allgemeine und spezielle Pharmakologie, 13. Aufl. 2024; Lüllmann/Mohr/Hein, Pharmakologie und Toxikologie, 19. Aufl.; Goodman &amp; Gilman, 14th ed.; CPIC-Empfehlungen 2024.</p>'
    };

    // =========================================================================
    // KAPITEL 2 — KLINIK (M2)
    // =========================================================================

    const PAGE_KARDIO = {
        title: '2.1 Kardiologie: HFrEF, ACS, Vorhofflimmern',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) HFrEF/HFmrEF/HFpEF nach LVEF abgrenzen und die Fantastic Four eindosieren, (2) STEMI vs. NSTE-ACS triagieren mit Door-to-Balloon-Vorgaben, (3) CHA₂DS₂-VASc und HAS-BLED korrekt berechnen und DOAK indikationsgerecht wählen, (4) den akuten kardialen Notfall (Lungenödem, kardiogener Schock) initial versorgen und (5) die Sekundärprävention nach kardioembolischem Apoplex begründen.</blockquote>'

            + '<p>Kardiovaskuläre Erkrankungen sind in Deutschland Todesursache Nr. 1 (Statistisches Bundesamt 2023, ~ 33 % aller Todesfälle). Drei Krankheitsbilder dominieren M2-Prüfung und hausärztliche Praxis: Herzinsuffizienz, akutes Koronarsyndrom und Vorhofflimmern.</p>'

            + '<h4>2.1.1 Herzinsuffizienz: Klassifikation</h4>'
            + '<table><thead><tr><th>Typ</th><th>LVEF</th><th>Klinik</th></tr></thead><tbody>'
            + '<tr><td>HFrEF</td><td>≤ 40 %</td><td>Reduzierte EF, klassische systolische Insuffizienz</td></tr>'
            + '<tr><td>HFmrEF</td><td>41–49 %</td><td>Mid-Range, gleiche Therapie wie HFrEF (ESC 2021)</td></tr>'
            + '<tr><td>HFpEF</td><td>≥ 50 %</td><td>Diastolische Dysfunktion, BNP/NT-proBNP erhöht; SGLT2-Inhibitor evidenzbasiert (DELIVER, EMPEROR-Preserved)</td></tr>'
            + '</tbody></table>'
            + '<p>NYHA I–IV beschreibt Symptomschwere. Schlüsseluntersuchungen: Anamnese (Belastungsdyspnoe, Orthopnoe, paroxysmale nächtliche Dyspnoe, Knöchelödeme), klinisch (Halsvenenstauung, dritter Herzton, RGs basal), Echokardiographie (Goldstandard für LVEF), NT-proBNP (Ausschlusswert in der Hausarztpraxis &lt; 125 pg/ml; bei Akutdyspnoe &lt; 300 pg/ml).</p>'

            + '<h4>2.1.2 HFrEF-Therapie: die Fantastic Four (ESC 2021/2023)</h4>'
            + '<p>Vier prognoseverbessernde Säulen, die <em>parallel</em> — nicht sequenziell — eindosiert werden. Der "Quartet-Approach" ist ein zentraler Paradigmenwechsel der ESC-2021-Leitlinie.</p>'
            + '<ol>'
            + '<li><strong>RAAS-Inhibition:</strong> ARNI (Sacubitril/Valsartan) bevorzugt; alternativ ACE-Hemmer (Ramipril 10 mg, Enalapril 20 mg) oder ARB bei ACE-Hemmer-Unverträglichkeit. Sacubitril hemmt Neprilysin → BNP-Abbau ↓ → natriuretische Wirkung. Cave: kein gleichzeitiger ACE-Hemmer (Angioödem-Risiko, 36-h-Pause).</li>'
            + '<li><strong>Beta-Blocker:</strong> evidenzbasiert nur Bisoprolol (10 mg), Carvedilol (2 × 25 mg), Metoprololsuccinat (200 mg) oder Nebivolol (älter, &gt; 70 J.). "Start low, go slow": Verdopplung alle 2–4 Wochen.</li>'
            + '<li><strong>Mineralokortikoid-Rezeptor-Antagonist (MRA):</strong> Spironolacton 25–50 mg oder Eplerenon. Cave Hyperkaliämie — K⁺ und Krea nach 1, 4, 12 Wochen.</li>'
            + '<li><strong>SGLT2-Inhibitor:</strong> Dapagliflozin oder Empagliflozin 10 mg — unabhängig vom Diabetes-Status (DAPA-HF NEJM 2019, EMPEROR-Reduced NEJM 2020).</li>'
            + '</ol>'
            + '<p><strong>Symptomatisch (nicht prognoseverbessernd):</strong> Schleifendiuretika (Furosemid, Torasemid) zur Stauungstherapie. <strong>Kontraindiziert</strong>: Calciumkanalblocker vom Verapamil-/Diltiazem-Typ (negativ inotrop), klassische NSAR (Volumenretention, Niereninsuffizienz, Verschlechterung).</p>'
            + '<p><strong>Reservetherapie:</strong> Ivabradin (If-Hemmung am Sinusknoten) bei Sinusrhythmus &gt; 70/min trotz BB; Digitalis bei tachykardem Vorhofflimmern; Vericiguat (sGC-Stimulator) nach Dekompensation; CRT/ICD nach Indikation.</p>'

            + '<h4>2.1.3 Akute Herzinsuffizienz / Lungenödem</h4>'
            + '<p>Klinik: schwere Dyspnoe, Orthopnoe, feuchte RGs beidseits, rosa schaumiges Sputum, Tachykardie. Erstmaßnahmen ("LMNOP"-Schema):</p>'
            + '<ul>'
            + '<li><strong>O₂</strong> bei SpO₂ &lt; 92 %, Oberkörperhochlagerung mit hängenden Beinen.</li>'
            + '<li><strong>Furosemid</strong> 40–80 mg i. v. (bei Vorbehandlung Dosis verdoppeln).</li>'
            + '<li><strong>Nitrate</strong> i. v. (Vorlast-Senkung) — bei RR_sys &gt; 90 mmHg.</li>'
            + '<li><strong>NIV (CPAP/BiPAP)</strong> früh einsetzen — reduziert Intubationsrate und Mortalität.</li>'
            + '<li><strong>Morphin</strong> 2,5–5 mg i. v. nur bei massiver Dyspnoe/Angst (heute zurückhaltend wegen Übersterblichkeit-Signal).</li>'
            + '</ul>'

            + '<h4>2.1.4 Akutes Koronarsyndrom (ESC ACS 2023)</h4>'
            + '<p>Triage in zwei Schritten: 12-Kanal-EKG &lt; 10 min und hochsensitives Troponin (hsTn) bei Aufnahme + nach 1 h (0/1-h-Algorithmus).</p>'
            + '<table><thead><tr><th>Form</th><th>EKG</th><th>Reperfusion</th></tr></thead><tbody>'
            + '<tr><td>STEMI</td><td>persistierende ST-Hebung ≥ 0,1 mV in 2 zusammengehörigen Ableitungen (≥ 0,2 mV in V2/V3)</td><td>Primär-PCI &lt; 120 min nach Erstkontakt; sonst Lyse innerhalb 30 min, dann Transfer</td></tr>'
            + '<tr><td>NSTE-ACS</td><td>keine ST-Hebung; ST-Senkung, T-Negativierung oder normal</td><td>GRACE-Risikostratifizierung; Hochrisiko (GRACE &gt; 140, dyn. Troponin) → invasiv &lt; 24 h</td></tr>'
            + '</tbody></table>'
            + '<p>Standardmedikation ACS:</p>'
            + '<ul>'
            + '<li><strong>ASS</strong> 150–300 mg p. o. Loading.</li>'
            + '<li><strong>P2Y12-Inhibitor:</strong> Ticagrelor (180 mg LD) oder Prasugrel (60 mg LD; nur nach Koro vor PCI bei STEMI; Kontraindikationen: Apoplex/TIA, Alter ≥ 75 oder &lt; 60 kg → Reduktion); Clopidogrel nur bei Kontraindikation gegen die anderen oder bei OAK.</li>'
            + '<li><strong>Antikoagulation:</strong> UFH oder Enoxaparin.</li>'
            + '<li><strong>Statin Hochintensität:</strong> Atorvastatin 80 mg oder Rosuvastatin 40 mg.</li>'
            + '<li><strong>Beta-Blocker</strong> früh, sofern keine kardiogene Schock-Konstellation; ACE-Hemmer und MRA bei eingeschränkter LVEF.</li>'
            + '</ul>'

            + '<h4>2.1.5 Vorhofflimmern: CHA₂DS₂-VASc und HAS-BLED</h4>'
            + '<p>Bei nicht-valvulärem Vorhofflimmern entscheidet der <strong>CHA₂DS₂-VASc</strong>-Score über die orale Antikoagulation:</p>'
            + '<table><thead><tr><th>Buchstabe</th><th>Bedeutung</th><th>Punkte</th></tr></thead><tbody>'
            + '<tr><td>C</td><td>Congestive Heart Failure / LVEF ≤ 40 %</td><td>1</td></tr>'
            + '<tr><td>H</td><td>Hypertonie</td><td>1</td></tr>'
            + '<tr><td>A₂</td><td>Alter ≥ 75 J.</td><td>2</td></tr>'
            + '<tr><td>D</td><td>Diabetes mellitus</td><td>1</td></tr>'
            + '<tr><td>S₂</td><td>Schlaganfall / TIA / Thromboembolie</td><td>2</td></tr>'
            + '<tr><td>V</td><td>Vaskuläre Erkrankung (KHK, pAVK, Aortenplaque)</td><td>1</td></tr>'
            + '<tr><td>A</td><td>Alter 65–74 J.</td><td>1</td></tr>'
            + '<tr><td>Sc</td><td>Sex (weiblich)</td><td>1*</td></tr>'
            + '</tbody></table>'
            + '<p>* nur bei mind. einem weiteren Risikofaktor wertend. <strong>OAK indiziert</strong> ab Score ≥ 1 (Männer) bzw. ≥ 2 (Frauen). Therapie der Wahl: <strong>DOAK</strong> (Apixaban, Rivaroxaban, Edoxaban, Dabigatran) — keine VKA, außer bei mechanischer Klappe oder mittelschwerer/schwerer Mitralstenose ("valvuläres" VHF).</p>'
            + '<p>Blutungsrisiko via <strong>HAS-BLED</strong> (Hypertonie, abnorme Nieren-/Leberfunktion, Stroke, Bleeding history, Labile INR, Elderly &gt; 65, Drugs/Alcohol) — kein OAK-Stopp bei hohem Score, sondern Optimierung modifizierbarer Faktoren.</p>'
            + '<p><strong>Frequenz vs. Rhythmus:</strong> Frequenzkontrolle mit BB oder Verapamil/Diltiazem (HFpEF, ohne LV-Dysfunktion). Rhythmuskontrolle (Amiodaron, Flecainid bei strukturell unauffälligem Herzen) in EAST-AFNET 4 (NEJM 2020) bei früher Diagnose &lt; 1 Jahr besser als reine Frequenzkontrolle. Katheterablation bei symptomatischem paroxysmalem oder persistierendem AF.</p>'

            + '<h4>2.1.6 Akute Aortendissektion</h4>'
            + '<p>Plötzlicher Vernichtungsschmerz mit Rücken-Ausstrahlung, RR-Differenz &gt; 20 mmHg zwischen den Armen, Pulsdefizit, AI-Diastolikum. Klassifikation Stanford:</p>'
            + '<ul>'
            + '<li><strong>Typ A</strong> (Aorta ascendens betroffen) → notfallmäßige <em>chirurgische</em> Versorgung. Mortalität ohne OP 1 %/h.</li>'
            + '<li><strong>Typ B</strong> (nur descendens) → primär <em>medikamentös</em> (RR_sys 100–120, HF &lt; 60), interventionell (TEVAR) bei Komplikationen.</li>'
            + '</ul>'

            + '<h4>2.1.7 Sekundärprävention nach kardioembolischem Apoplex</h4>'
            + '<p>Bei erstmals diagnostiziertem AF nach Apoplex: DOAK ist gegenüber VKA bevorzugt (Effekt + Sicherheit), Beginn nach Schweregrad ("1-3-6-12-Tage-Regel"): TIA Tag 1, kleiner Infarkt Tag 3, mittlerer Tag 6, großer Tag 12 — wegen sekundärer Einblutungsgefahr. ASS-Monotherapie ist bei AF-bedingtem Apoplex <em>nicht</em> ausreichend.</p>'

            + '<h4>2.1.8 pAVK</h4>'
            + '<p>Fontaine I (asymptomatisch), II (Claudicatio &gt; 200 m / &lt; 200 m), III (Ruheschmerz), IV (Trophische Läsion). Therapie: Risikofaktorenkontrolle, Gehtraining (3 × 30 min/Woche), <strong>ASS + Statin</strong>. COMPASS-Studie (NEJM 2017): niedrigdosis Rivaroxaban 2 × 2,5 mg + ASS senkt MACE und schwere Beinereignisse bei stabiler pAVK/KHK.</p>'

            + '<p class="quellen"><em>Quellen:</em> ESC HF 2021 + Focused Update 2023; ESC ACS 2023; ESC AF 2024; ESC PAD/AAA 2024; NVL Chronische KHK; Herold, Innere Medizin 2024.</p>'
    };

    const PAGE_PNEUMO = {
        title: '2.2 Pneumologie: Asthma, COPD, Pneumonie, Lungenembolie',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) Asthma-Stufentherapie nach GINA 2024 anwenden (Track 1 ICS-Formoterol-Konzept), (2) COPD nach GOLD 2024 in A/B/E klassifizieren und stufengerecht behandeln, (3) ambulante Pneumonie nach CRB-65 triagieren und leitliniengerecht antibiotisch versorgen, (4) akute Bronchitis evidenzbasiert ohne Antibiotikum führen, (5) Lungenembolie nach ESC 2019 risikostratifizieren und akut therapieren.</blockquote>'

            + '<p>Atemwegserkrankungen gehören zu den häufigsten Beratungsanlässen. Vier Leitlinien strukturieren das Vorgehen: GINA 2024 (Asthma), GOLD 2024 (COPD), DEGAM-S3-Husten (AWMF 053-013) und S3 CAP 2021 (AWMF 020-020).</p>'

            + '<h4>2.2.1 Asthma bronchiale (GINA 2024)</h4>'
            + '<p>Pathophysiologie: chronische eosinophile Atemwegsentzündung mit reversibler Obstruktion und bronchialer Hyperreagibilität. Atopisches (allergisches) vs. nicht-allergisches Asthma; spezielle Phänotypen: Aspirin-Asthma (AERD), berufsbedingt, ABPA.</p>'
            + '<p>GINA hat 2019 die Empfehlung umgekehrt: <strong>SABA-only-Therapie ist obsolet</strong>, weil sie Mortalität nicht senkt und zur Übernutzung verleitet. Stattdessen MART-Konzept (Maintenance and Reliever Therapy) mit ICS-Formoterol bereits ab Track 1.</p>'
            + '<table><thead><tr><th>Stufe</th><th>Track 1 (bevorzugt)</th><th>Track 2</th></tr></thead><tbody>'
            + '<tr><td>1–2</td><td>niedrigdosiertes ICS-Formoterol bei Bedarf</td><td>niedrigdosiertes ICS täglich + SABA bei Bedarf</td></tr>'
            + '<tr><td>3</td><td>niedrigdosiertes ICS-Formoterol als Erhaltung + Bedarf (MART)</td><td>niedrigdosiertes ICS-LABA + SABA</td></tr>'
            + '<tr><td>4</td><td>mittel-/hochdosiertes ICS-Formoterol (MART)</td><td>mittel-/hochdosiertes ICS-LABA</td></tr>'
            + '<tr><td>5</td><td>+ LAMA, Phänotypisierung für Biologikum</td><td>+ LAMA, Biologikum, ggf. niedrigdosiertes OCS</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Biologika</strong> nach Phänotyp: Omalizumab (anti-IgE) bei allergischem Asthma; Mepolizumab/Benralizumab (anti-IL-5/-Rα) bei eosinophilem Asthma (Eos ≥ 300); Dupilumab (anti-IL-4Rα) bei T2-Asthma. Tezepelumab (anti-TSLP) phänotypübergreifend.</p>'
            + '<p><strong>Status asthmaticus:</strong> schwere refraktäre Obstruktion. Warnzeichen: stille Lunge, paradoxe Atmung, Erschöpfung, SpO₂ &lt; 92 %, pCO₂ steigt (zuvor Hyperventilation, jetzt drohende respiratorische Insuffizienz). Therapie: hochdosiert SABA + Ipratropium vernebelt, systemisch Prednisolon 50 mg p. o. oder i. v., Mg-Sulfat 2 g i. v. bei Therapieresistenz, frühzeitig Intensivstation.</p>'

            + '<h4>2.2.2 COPD (GOLD 2024)</h4>'
            + '<p>Diagnose: postbronchodilatatorischer FEV₁/FVC &lt; 0,7. Pathophysiologie: chronische neutrophile Entzündung, Lungenparenchymdestruktion (Emphysem), Hypersekretion. Hauptrisikofaktor: inhalatives Rauchen; α1-Antitrypsin-Mangel als seltene genetische Ursache (junge Patienten, basal betontes Emphysem).</p>'
            + '<p>Schweregrad-Klassifikation in Gruppen <strong>A / B / E</strong> (E = Exazerbierer, ersetzt seit 2023 die alten Gruppen C und D):</p>'
            + '<table><thead><tr><th>Gruppe</th><th>Symptome</th><th>Exazerbationen/Jahr</th><th>Therapie</th></tr></thead><tbody>'
            + '<tr><td>A</td><td>mMRC 0–1, CAT &lt; 10</td><td>≤ 1 moderate</td><td>1 Bronchodilatator (LABA oder LAMA)</td></tr>'
            + '<tr><td>B</td><td>mMRC ≥ 2, CAT ≥ 10</td><td>≤ 1 moderate</td><td>LABA + LAMA</td></tr>'
            + '<tr><td>E</td><td>egal</td><td>≥ 2 moderate oder ≥ 1 hospitalisierungspflichtig</td><td>LABA + LAMA; bei Eos ≥ 300/µl + ICS</td></tr>'
            + '</tbody></table>'
            + '<p><strong>ICS-Monotherapie ist bei COPD nicht indiziert</strong> (Pneumonie-Risiko, IMPACT-Studie). ICS sinnvoll <em>add-on</em> bei Eosinophilie ≥ 300/µl oder bei Asthma-COPD-Overlap. Reservetherapien: Roflumilast (PDE-4-Hemmer) bei chronischer Bronchitis mit häufigen Exazerbationen; Azithromycin 250 mg 3 ×/Wo. als Langzeit-Antiinflammation (Cave QT, Resistenz).</p>'
            + '<p>Akute Exazerbation: SABA + SAMA häufiger, systemisches Prednisolon 40 mg p. o. 5 Tage (REDUCE-Studie), Antibiotikum (Amoxicillin oder Doxycyclin) bei zwei der drei Anthonisen-Kriterien (zunehmender Auswurf, Purulenz, Dyspnoe). NIV bei respiratorischer Globalinsuffizienz (pH &lt; 7,35, pCO₂ ≥ 45) reduziert Mortalität. Sauerstoff titrieren auf SpO₂ 88–92 % (CO₂-Narkose vermeiden).</p>'

            + '<h4>2.2.3 Ambulant erworbene Pneumonie (S3 CAP 2021)</h4>'
            + '<p>Häufigster Erreger: <em>Streptococcus pneumoniae</em>; weitere: H. influenzae, Mycoplasma, Chlamydia pneumoniae, Legionella, Influenza/RSV. <strong>CRB-65-Score</strong> steuert die Entscheidung ambulant vs. stationär:</p>'
            + '<table><thead><tr><th>Kriterium</th><th>Definition</th></tr></thead><tbody>'
            + '<tr><td>C</td><td>Confusion (neue Verwirrtheit)</td></tr>'
            + '<tr><td>R</td><td>Respiratory rate ≥ 30/min</td></tr>'
            + '<tr><td>B</td><td>RR_sys &lt; 90 oder RR_dia ≤ 60 mmHg</td></tr>'
            + '<tr><td>65</td><td>Alter ≥ 65 J.</td></tr>'
            + '</tbody></table>'
            + '<p>0 Punkte → ambulant; 1–2 → stationäre Aufnahme erwägen; ≥ 3 → ITS-Aufnahme erwägen. Empirische Antibiotika ambulant: <strong>Amoxicillin 3 × 1 g p. o. 5 Tage</strong> (Erstlinie); bei Penicillin-Allergie Doxycyclin oder Clarithromycin. Bei Komorbidität (COPD, Diabetes, Herzinsuffizienz): Amoxicillin/Clavulansäure. Verlaufskontrolle nach 48–72 h.</p>'

            + '<h4>2.2.4 Akute Bronchitis und Sinusitis: Antibiotic Stewardship</h4>'
            + '<p>Akute Bronchitiden zu ~ 90 % viral (Cochrane Smith 2017). Antibiotika verkürzen die Krankheitsdauer im Mittel um 0,5 Tage, fördern aber Resistenzen, Diarrhoe und C.-difficile-Infektion. Empfohlene Strategie nach S3 Husten 053-013: <em>Delayed Prescription</em> — Rezept einlösbar bei verzögertem Verlauf nach 5–7 Tagen. Akute Rhinosinusitis: ebenfalls überwiegend viral; Antibiotikum nur bei <em>Double-Sickening</em> (Verschlechterung nach initialer Besserung), persistierendem Fieber &gt; 38,5 °C oder &gt; 10 Tagen Verlauf — Erstlinie Amoxicillin.</p>'

            + '<h4>2.2.5 Lungenembolie (ESC 2019)</h4>'
            + '<p>Risikostratifizierung in vier Stufen — entscheidend für Therapieintensität:</p>'
            + '<table><thead><tr><th>Risiko</th><th>Schock/Hypotonie</th><th>RV-Dysfunktion (Echo/CT)</th><th>hsTroponin</th><th>Therapie</th></tr></thead><tbody>'
            + '<tr><td>Hoch</td><td>+</td><td>+ (impliziert)</td><td>±</td><td>Lyse (Alteplase 100 mg/2 h), ggf. Embolektomie</td></tr>'
            + '<tr><td>Intermediär-hoch</td><td>−</td><td>+</td><td>+</td><td>Antikoagulation, Monitoring; Rescue-Lyse bei Verschlechterung</td></tr>'
            + '<tr><td>Intermediär-niedrig</td><td>−</td><td>nur eines positiv</td><td></td><td>Antikoagulation</td></tr>'
            + '<tr><td>Niedrig</td><td>−</td><td>−</td><td>−</td><td>Antikoagulation, ggf. ambulant (sPESI = 0)</td></tr>'
            + '</tbody></table>'
            + '<p>Standard-Antikoagulation: DOAK (Apixaban 2 × 10 mg für 7 Tage, dann 2 × 5 mg; Rivaroxaban 2 × 15 mg für 21 Tage, dann 1 × 20 mg). Dauer mindestens 3 Monate; bei provozierter LAE 3 Monate, bei unprovozierter oder rezidivierter Antikoagulation langfristig.</p>'

            + '<p class="quellen"><em>Quellen:</em> GINA Global Strategy 2024; GOLD Report 2024; AWMF S3 CAP 020-020 (2021); AWMF S3 Husten 053-013 (2021); ESC Pulmonary Embolism Guidelines 2019; NVL Asthma 2024; NVL COPD 2021/2024-Update.</p>'
    };

    const PAGE_PHARMA_INFEKT = {
        title: '2.3 Pharmakologie und Infektiologie: Interaktionen, HWI, Borreliose',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) DOAK-Pharmakokinetik unterscheiden und CYP3A4/P-gp-Interaktionen identifizieren, (2) DOAK-Antidote benennen, (3) unkomplizierten HWI nach S3 leitliniengerecht behandeln, (4) Lyme-Borreliose stadiengerecht antibiotisch versorgen, (5) H.-pylori-Eradikation, ACE-Hemmer-Husten-Mechanismus und antibiotic stewardship begründen.</blockquote>'

            + '<p>Pharmakologie ist im M2 weniger Auswendiglernen einzelner Wirkstoffe als Verständnis der <em>Mechanismen</em>: LADME-Pharmakokinetik, Cytochrom-Interaktionen, Transporter (P-gp). Diese Einheit bündelt drei Hochfrequenz-Themen.</p>'

            + '<h4>2.3.1 DOAK-Interaktionen: CYP3A4 und P-Glykoprotein</h4>'
            + '<table><thead><tr><th>Wirkstoff</th><th>Ziel</th><th>Renale Elimination</th><th>CYP/P-gp</th><th>Antidot</th></tr></thead><tbody>'
            + '<tr><td>Apixaban</td><td>F. Xa</td><td>~ 25 %</td><td>CYP3A4 + P-gp</td><td>Andexanet alfa; PPSB als Reserve</td></tr>'
            + '<tr><td>Rivaroxaban</td><td>F. Xa</td><td>~ 33 %</td><td>CYP3A4 + P-gp</td><td>Andexanet alfa; PPSB</td></tr>'
            + '<tr><td>Edoxaban</td><td>F. Xa</td><td>~ 50 %</td><td>P-gp dominant</td><td>Andexanet (Off-label) / PPSB</td></tr>'
            + '<tr><td>Dabigatran</td><td>F. IIa</td><td>~ 80 %</td><td>P-gp ohne CYP</td><td>Idarucizumab (spez. monoklonal)</td></tr>'
            + '</tbody></table>'
            + '<p>Klinische Konsequenz: starke <strong>CYP3A4- und P-gp-Inhibitoren</strong> (Makrolide außer Azithromycin, Azol-Antimykotika, Verapamil, Amiodaron, HIV-Proteasehemmer, Ciclosporin) heben Plasmaspiegel von Apixaban/Rivaroxaban deutlich an — Blutungsrisiko ↑. Klassischer Praxis-Fall: Apixaban-Patientin erhält Clarithromycin gegen Pneumonie und kommt mit GI-Blutung. Lehre: vor jeder neuen Verschreibung Interaktions-Check (ABDA-Datenbank, Mediq).</p>'
            + '<p>Starke <strong>CYP3A4- und P-gp-Induktoren</strong> (Rifampicin, Carbamazepin, Phenytoin, Phenobarbital, Johanniskraut) senken Spiegel — Thromboserisiko ↑. Bei diesen Komedikationen DOAK absetzen oder umstellen.</p>'

            + '<h4>2.3.2 Heparin und Phenprocoumon: Mechanismen</h4>'
            + '<p><strong>Heparin (UFH/LMWH):</strong> Aktivierung von Antithrombin III um Faktor 1000 → Inaktivierung von Thrombin (IIa) und Faktor Xa. UFH wirkt auf beide; LMWH (Enoxaparin) bevorzugt Xa. Monitoring: aPTT für UFH, Anti-Xa-Aktivität für LMWH (nur bei Niereninsuffizienz, SS, extremem Gewicht). HIT Typ II (immunogen, Tag 5–14, paradoxe Thrombosen) — Therapie Argatroban.</p>'
            + '<p><strong>Phenprocoumon</strong> hemmt VKORC1, Folge: nicht-funktionelle Vit-K-abhängige Faktoren II, VII, IX, X sowie Protein C/S. Faktor VII ($t_{1/2}$ ~ 6 h) fällt zuerst → INR steigt früh, antikoagulatorischer Vollschutz erst nach Tagen. Bridging mit LMWH bei akutem Bedarf. INR-Ziel 2,0–3,0 (Standard), 2,5–3,5 (mech. Mitralklappe).</p>'

            + '<h4>2.3.3 ACE-Hemmer-Husten und Bradykinin</h4>'
            + '<p>ACE = Kininase II baut Bradykinin ab. Hemmung → Bradykinin-Akkumulation → trockener Reizhusten in 5–20 % der Patienten, häufiger bei Frauen, Asiaten. Lösung: Wechsel auf ARB (Sartan), bei dem dieser Mechanismus fehlt. ARB blockieren AT1-Rezeptor selektiv und führen praktisch nie zu Husten oder Angioödem.</p>'

            + '<h4>2.3.4 Antibiotic Stewardship: zentrale Prinzipien</h4>'
            + '<ul>'
            + '<li><strong>Indikationsstellung:</strong> bakterielle Genese plausibel? Selbstlimitierender Verlauf erwartbar?</li>'
            + '<li><strong>Erregerspektrum:</strong> Schmalspektrum, sobald möglich (Deeskalation nach Antibiogramm).</li>'
            + '<li><strong>Therapiedauer kürzer als historisch:</strong> unkomplizierter HWI bei Frauen 1–5 Tage; CAP ambulant 5 Tage; Erysipel 5–7 Tage; akute Pyelonephritis 7–10 Tage; HWI Mann 7 Tage; akute unkomplizierte Sigmadivertikulitis Stadium Ia oft ohne Antibiotikum.</li>'
            + '<li><strong>Reserve-Antibiotika</strong> (Linezolid, Daptomycin, Tigecyclin, Cefiderocol, Ceftolozan/Tazobactam) restriktiv — nach Antibiogramm.</li>'
            + '</ul>'

            + '<h4>2.3.5 Unkomplizierter Harnwegsinfekt (S3 043-044, 2017/Update)</h4>'
            + '<p>Erstlinie für unkomplizierte Zystitis bei sonst gesunden, nicht-schwangeren Frauen:</p>'
            + '<ul>'
            + '<li><strong>Fosfomycin-Trometamol</strong> 3 g p. o. einmalig.</li>'
            + '<li><strong>Nitrofurantoin</strong> 4 × 50 mg / 5 Tage (KI: GFR &lt; 60).</li>'
            + '<li><strong>Pivmecillinam</strong> 3 × 400 mg / 3 Tage.</li>'
            + '</ul>'
            + '<p>Cotrimoxazol nur, wenn lokale E.-coli-Resistenzrate &lt; 20 %. Fluorchinolone (Ciprofloxacin) sind bei unkompliziertem HWI <em>nicht</em> Erstlinie (BfArM-Rote-Hand-Brief 2019: Sehnen- und Nervenschäden). Pyelonephritis: Cefpodoxim oder Ciprofloxacin 7–10 Tage. In der Schwangerschaft: Cephalosporine 2./3. Gen. oder Fosfomycin sicher; Nitrofurantoin nur 1./2. Trimenon, am Termin meiden.</p>'

            + '<h4>2.3.6 Lyme-Borreliose (S3 AWMF 013-080)</h4>'
            + '<p>Erreger: <em>Borrelia burgdorferi</em> sensu lato (in Mitteleuropa v. a. <em>B. afzelii</em>, <em>B. garinii</em>). Übertragung durch <em>Ixodes ricinus</em>. Risiko nach Zeckenstich ca. 1–6 % (RKI 2024); <strong>Antibiotikaprophylaxe nach Stich nicht empfohlen</strong>.</p>'
            + '<table><thead><tr><th>Stadium</th><th>Klinik</th><th>Diagnostik</th></tr></thead><tbody>'
            + '<tr><td>I (Lokal)</td><td>Erythema migrans (ringförmig, schmerzlos, Größenzunahme über Tage)</td><td>Blickdiagnose; Serologie im Frühstadium oft falsch-negativ</td></tr>'
            + '<tr><td>II (frühe Disseminierung)</td><td>multiple EM, Lyme-Karditis, frühe Neuroborreliose (Bannwarth-Syndrom: Meningoradikulitis ± Fazialisparese)</td><td>Serologie + Liquor (CXCL13, intrathekale AK-Synthese)</td></tr>'
            + '<tr><td>III (Spät)</td><td>Lyme-Arthritis (häufig Knie), Acrodermatitis chronica atrophicans, späte Neuroborreliose</td><td>Serologie hochtitrig; Synovia-PCR</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Therapie</strong>:</p>'
            + '<ul>'
            + '<li>Erwachsene Stadium I: <strong>Doxycyclin</strong> 200 mg/d p. o. für 14 Tage (KI: SS/Stillzeit, Kinder &lt; 9 J.).</li>'
            + '<li>Schwangere/Kinder: Amoxicillin 50 mg/kg/d in 3 ED.</li>'
            + '<li>Neuroborreliose / Karditis: Ceftriaxon 2 g/d i. v. 14–21 Tage.</li>'
            + '</ul>'
            + '<p>Cave: routinemäßige serologische Verlaufskontrolle ist <em>nicht</em> sinnvoll — Antikörper persistieren jahrelang als <strong>Seronarbe</strong>. Postborrelien-Symptome &lt; 6 Monate nach adäquater Therapie sind häufig und bessern sich spontan; "Chronische Borreliose" als Dauerdiagnose ist wissenschaftlich nicht belegt.</p>'

            + '<h4>2.3.7 Helicobacter pylori (S2k DGVS)</h4>'
            + '<p>Diagnostik: ¹³C-Atemtest oder Stuhl-Antigen-Test (nicht-invasiv); Biopsie + Histo + Urease-Test (invasiv). Therapie der Wahl in Deutschland (hohe Clarithromycin-Resistenz):</p>'
            + '<ul>'
            + '<li><strong>Bismut-Quadrupel-Therapie</strong> 10 Tage (PPI + Bismutsubcitrat + Tetracyclin + Metronidazol).</li>'
            + '<li>Alternativ: Konkomitante Quadrupel-Therapie (PPI + Amoxicillin + Clarithromycin + Metronidazol) 14 Tage, sofern lokale Clarithromycin-Resistenz &lt; 15 %.</li>'
            + '</ul>'
            + '<p>Kontrolle des Eradikationserfolgs frühestens 4 Wochen nach Therapieende, 14 Tage nach PPI-Pause.</p>'

            + '<h4>2.3.8 MRSA und KRINKO-Empfehlungen</h4>'
            + '<p>Aufnahme-Screening (Nasen-/Rachenabstrich, Wunden) bei Risikopatienten: vorherige MRSA-Anamnese, Aufenthalt in Endemieland, Dialyse, Pflegeeinrichtung, chronische Wunden. Eradikation: Mupirocin nasal 5 Tage + Octenidin-Ganzkörperwaschung. Antibiotische Therapie bei Infektion (nicht Kolonisation): Vancomycin i. v. oder Linezolid; bei MRSA-Pneumonie Linezolid bevorzugt (bessere Lungenkonzentration).</p>'

            + '<h4>2.3.9 Migräne (DGN-Leitlinie 2024)</h4>'
            + '<p>Akut: Triptane (Sumatriptan 50–100 mg p. o., 6 mg s. c.) als Erstlinie bei mittlerer/schwerer Migräne; alternativ ASS 1000 mg, Ibuprofen 600–800 mg, Metoclopramid 10–20 mg gegen Begleitübelkeit. Triptane KI bei KHK, unkontrollierter Hypertonie, Schwangerschaft. Prophylaxe ab ≥ 3 Attacken/Monat: Topiramat, Propranolol/Metoprolol, Amitriptylin, Flunarizin; neuere CGRP-Antikörper (Erenumab, Fremanezumab, Galcanezumab) und Gepante (Atogepant, Rimegepant) für Therapieversager.</p>'

            + '<p class="quellen"><em>Quellen:</em> AWMF S3 HWI 043-044 (2024); AWMF S3 Lyme 013-080; S2k H. pylori DGVS 2022; KRINKO 2014; DGN Migräne 2024; ESC AF 2024 (DOAK); Aktories Pharmakologie 13. Aufl.; BfArM Rote-Hand-Brief Fluorchinolone 2019.</p>'
    };

    const PAGE_ENDOKRIN_HTN = {
        title: '2.4 Endokrinologie, Hypertonie und Lipidstoffwechsel',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) die NVL-Stufentherapie bei T2DM mit kardio-/renoprotektivem Add-on einsetzen, (2) Blutdruckziele nach ESH/ESC altersgestaffelt anwenden und Single-Pill-Therapie wählen, (3) LDL-Zielwerte ESC nach Risikoklasse benennen und Statin/Ezetimib/PCSK9 stratifiziert eskalieren, (4) Hashimoto vs. M. Basedow serologisch differenzieren und thyreotoxische Krise behandeln, (5) Cushing- und Addison-Syndrom Screening- und Bestätigungstests korrekt zuordnen.</blockquote>'

            + '<p>Stoffwechselerkrankungen dominieren die hausärztliche Versorgung quantitativ. Diabetes, Hypertonie und Dyslipidämie sind durch klare Leitlinien standardisiert — Prüfungsfragen zielen auf Zielwerte und Stufentherapie.</p>'

            + '<h4>2.4.1 Diabetes mellitus Typ 2 (NVL 2023)</h4>'
            + '<p>Diagnose: HbA1c ≥ 6,5 % (48 mmol/mol) oder Nüchtern-Glukose ≥ 7,0 mmol/l (126 mg/dl) oder oGTT 2-h-Wert ≥ 11,1 mmol/l (200 mg/dl). Bestätigung an zweitem Tag erforderlich (außer Symptomatik + zufällige Glukose ≥ 11,1).</p>'
            + '<p><strong>HbA1c-Zielwert</strong> nach NVL: <strong>individualisiert 6,5–7,5 %</strong> (48–58 mmol/mol). Strenger (≤ 6,5 %) bei jungen, motivierten Patienten ohne Hypoglykämierisiko; höher (bis 8,0 %) bei multimorbiden, älteren Patienten mit kurzer Lebenserwartung. Faustregel: Zielwert ist immer eine Verhandlung — nicht Prüfung sturer Grenzen.</p>'
            + '<p>Stufentherapie:</p>'
            + '<ol>'
            + '<li><strong>Stufe 1:</strong> Lebensstil (Ernährung, Bewegung, Gewichtsreduktion) für 3–6 Monate.</li>'
            + '<li><strong>Stufe 2:</strong> Metformin (außer KI) — Erstlinie wegen geringer Hypoglykämieneigung und kardiovaskulärer Sicherheit.</li>'
            + '<li><strong>Stufe 3:</strong> bei kardiovaskulärer Begleiterkrankung oder CKD: <strong>SGLT2-Inhibitor oder GLP-1-Agonist</strong> hinzufügen — Outcome-Benefit (EMPA-REG, DAPA-CKD, LEADER, REWIND, SELECT). Bei manifester HFrEF: SGLT2-Inhibitor bevorzugt; bei kardiovaskulärer Hochrisikolage GLP-1-RA.</li>'
            + '<li><strong>Stufe 4:</strong> Insulin (Basal-Insulin Glargin/Degludec abends als Einstieg, später Basis-Bolus oder Mischanaloga).</li>'
            + '</ol>'
            + '<p>Metformin: KI bei eGFR &lt; 30 (Laktatazidose); reduzierte Dosis bei eGFR 30–45. Vor Kontrastmittelgabe pausieren bei eGFR &lt; 60. Vit-B12-Spiegel-Kontrolle nach Langzeittherapie.</p>'
            + '<p>SGLT2-Inhibitoren: zusätzliche Wirkmechanismen — natriuretisch, blutdrucksenkend, gewichtsreduzierend. Cave: euglykämische Ketoazidose unter Stress; genitale Mykosen; Fournier-Gangrän (selten); bei eGFR &lt; 20 absetzen (HF-Indikation auch bei eGFR ≥ 20 möglich nach EMPA-KIDNEY).</p>'
            + '<p>GLP-1-Agonisten: Semaglutid (s. c. wöchentlich oder oral täglich), Dulaglutid, Liraglutid, Tirzepatid (dual GIP/GLP-1). Gewichtsreduktion 5–15 %. NW: Übelkeit (Titration), Pankreatitis (selten).</p>'
            + '<p>Diabetische Polyneuropathie: distal-symmetrisch, Strumpf-Handschuh-Verteilung, Verlust Vibrationsempfinden 128-Hz-Stimmgabel und Schutzempfinden 10-g-Monofilament. Therapie neuropathischer Schmerzen: Duloxetin, Pregabalin, Gabapentin, Amitriptylin (im Alter PRISCUS-PIM!).</p>'

            + '<h4>2.4.2 Hypertonie (ESH 2023 / ESC 2024)</h4>'
            + '<p>Definition: ab 140/90 mmHg in Praxismessung; ABDM-Tagesmittel ≥ 135/85; Heimmessung ≥ 135/85. Sekundäre Hypertonie ausschließen bei: jungen Patienten, therapieresistenter HTN, hypokaliämischer HTN (Conn), paroxysmaler HTN (Phäo), Cushing-Stigmata, Schnarchen/Apnoe.</p>'
            + '<p><strong>Zielwerte</strong> nach erfolgreicher Eindosierung:</p>'
            + '<table><thead><tr><th>Patientengruppe</th><th>Zielblutdruck</th></tr></thead><tbody>'
            + '<tr><td>&lt; 65 J.</td><td>120–129 / 70–79 mmHg</td></tr>'
            + '<tr><td>65–79 J.</td><td>130–139 / 70–79 mmHg (sofern toleriert)</td></tr>'
            + '<tr><td>≥ 80 J.</td><td>&lt; 150/80, individuell &lt; 140 möglich</td></tr>'
            + '<tr><td>Diabetes / CKD / KHK</td><td>&lt; 130/80</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Erstlinie:</strong> Single-Pill-Combination aus zwei Substanzen — bevorzugt ACE-Hemmer (oder ARB) plus Calciumkanalblocker oder Thiazid-Diuretikum. Beta-Blocker sind <em>nicht mehr Erstlinie</em> ohne Komorbidität (HFrEF, KHK, AF). Stufe 2: Tripel-Kombi ACE-/ARB + CCB + Thiazid. Stufe 3: + Spironolacton (Resistenter Hypertonus, PATHWAY-2-Studie).</p>'
            + '<p>ACE-Hemmer-Husten: 5–20 %, durch Bradykinin (s. 2.3.3). Lösung: Wechsel auf ARB.</p>'

            + '<h4>2.4.3 Lipidstoffwechsel und KHK-Sekundärprävention</h4>'
            + '<p>LDL-Zielwerte nach ESC 2019/2023:</p>'
            + '<table><thead><tr><th>Risikoklasse</th><th>LDL-Ziel</th><th>Beispiele</th></tr></thead><tbody>'
            + '<tr><td>Sehr hoch</td><td>&lt; 1,4 mmol/l (55 mg/dl) und ≥ 50 % Reduktion</td><td>manifeste KHK/Apoplex, DM mit Endorganschaden, schwere CKD, FH mit RF, SCORE2 ≥ 10 %</td></tr>'
            + '<tr><td>Hoch</td><td>&lt; 1,8 mmol/l (70 mg/dl)</td><td>DM ohne Endorganschaden, mod. CKD, RR ≥ 180/110, FH ohne RF</td></tr>'
            + '<tr><td>Moderat</td><td>&lt; 2,6 mmol/l (100 mg/dl)</td><td>Junge ohne RF</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Erstlinie:</strong> Hochintensitäts-Statin (Atorvastatin 40–80 mg oder Rosuvastatin 20–40 mg). Add-on bei Zielverfehlung: Ezetimib (NPC1L1-Hemmer, 10 mg). Weiterhin verfehlt: PCSK9-Hemmer (Alirocumab, Evolocumab) oder Inclisiran (siRNA, 2 ×/Jahr s. c.). Bempedoinsäure als Statin-Alternative bei Statin-Intoleranz.</p>'
            + '<p>Statin-NW: Myalgien (CK-Kontrolle bei schwerer Form), selten Rhabdomyolyse, Transaminasenanstieg, Diabetes-Risiko (gering). Gravierende Statin-Myopathie: Statin pausieren, CK kontrollieren, ggf. CoQ10 versuchen, Wechsel auf Pravastatin/Fluvastatin oder Bempedoinsäure.</p>'

            + '<h4>2.4.4 Schilddrüse</h4>'
            + '<p><strong>Hyperthyreose</strong> (= Hyperthyreoidismus) — TSH supprimiert, fT3/fT4 erhöht. DD:</p>'
            + '<ul>'
            + '<li><strong>M. Basedow:</strong> TRAK positiv, diffus vergrößerte Schilddrüse, evtl. endokrine Orbitopathie. Therapie: Thyreostatika 12–18 Monate (Carbimazol → Thiamazol bzw. PTU im 1. Trimenon SS), bei Rezidiv Radiojod oder OP.</li>'
            + '<li><strong>Schilddrüsenautonomie:</strong> TRAK negativ, szintigraphisch heißer Knoten / multifokal. Therapie: Radiojod oder OP (Thyreostatika nur Vorbereitung).</li>'
            + '</ul>'
            + '<p><strong>Thyreotoxische Krise</strong> — Notfall, Mortalität 10–30 %. Trias: Tachykardie/Vorhofflimmern, hohes Fieber, Bewusstseinsstörung. Therapie: Thiamazol hochdosiert + Glucocorticoid (hemmt T4→T3-Konversion) + Lugolsche Lösung 2 h <em>nach</em> Thyreostatikum (Wolff-Chaikoff-Effekt) + Beta-Blocker (Propranolol).</p>'
            + '<p><strong>Hashimoto-Thyreoiditis</strong> — häufigste Hypothyreose-Ursache in Deutschland. Anti-TPO und anti-Tg-AK hochtitrig positiv, sonographisch echoarm/inhomogen. Therapie: Levothyroxin nach TSH-Ziel (0,5–2,5 mU/l). Levothyroxin nüchtern 30 min vor Frühstück, $t_{1/2}$ ~ 7 d, Steady-State nach 4–6 Wochen, dann TSH-Kontrolle.</p>'

            + '<h4>2.4.5 Cushing-Syndrom</h4>'
            + '<p>Klinik: stammbetonte Adipositas, Vollmondgesicht, Stiernacken, Striae rubrae, dünne Haut/Hämatome, Myopathie proximal, Hypertonie, Diabetes, Osteoporose, Depression. Häufigste Ursache: <em>iatrogen</em> durch chronische Glucocorticoid-Therapie. Endogen: ACTH-abhängig (M. Cushing — Hypophysenadenom 80 %, ektop ACTH-Sekretion 20 %) vs. ACTH-unabhängig (NNR-Adenom/Karzinom).</p>'
            + '<p><strong>Screeningtests</strong> (mind. 2 positiv für Diagnose):</p>'
            + '<ul>'
            + '<li>1-mg-Dexamethason-Hemmtest (23:00 Dexa, 8:00 Cortisol — Ausschluss bei &lt; 1,8 µg/dl bzw. &lt; 50 nmol/l).</li>'
            + '<li>24-h-Sammelharn-Cortisol.</li>'
            + '<li>Mitternachts-Speichel-Cortisol.</li>'
            + '</ul>'
            + '<p>Bestätigung: hochdosis-Dexamethason-Hemmtest (8 mg) + ACTH-Bestimmung + Bildgebung (MRT Hypophyse / CT NNR / Sinus-petrosus-Katheter).</p>'

            + '<h4>2.4.6 Addison-Syndrom (primäre NNR-Insuffizienz)</h4>'
            + '<p>Klinik: Hyperpigmentierung (POMC/MSH-Stimulation durch hohes ACTH), Hyponatriämie + Hyperkaliämie + leichte Azidose, postural Hypotonie, Müdigkeit, Anorexie. Häufigste Ursache in Industrieländern: Autoimmun-Adrenalitis (M. Addison).</p>'
            + '<p>Diagnostik: morgendliches Cortisol &lt; 5 µg/dl + ACTH erhöht → Hinweis. Bestätigung: <strong>ACTH-Stimulationstest (Synacthen 250 µg)</strong> — Cortisol nach 30/60 min &lt; 18 µg/dl bestätigt NNR-Insuffizienz. Therapie: Hydrocortison 15–25 mg/d in 2–3 Dosen (zirkadian) + Fludrocortison 0,05–0,2 mg morgens. Patient: Notfallausweis, Stress-Dosis-Anpassung (Verdopplung bei Fieber/Infektion), Hydrocortison-100-mg-Notfallspritze für die Reise.</p>'
            + '<p><strong>Addison-Krise:</strong> Schock, Erbrechen, Verwirrtheit, Hyponatriämie + Hyperkaliämie + Hypoglykämie. Therapie: Hydrocortison 100 mg i. v. Bolus, dann 200 mg/24 h; aggressives Volumen mit NaCl 0,9 %.</p>'

            + '<p class="quellen"><em>Quellen:</em> NVL Diabetes mellitus Typ 2 2023; ESH Hypertension Guidelines 2023; ESC Hypertension 2024; ESC Dyslipidaemias 2019/2023 Update; AWMF S2k Hyperthyreose; Endocrine Society Cushing 2008/2024-Update; Endocrine Society Addison 2016; Herold Innere 2024.</p>'
    };

    // =========================================================================
    // KAPITEL 3 — PJ & FACHARZT
    // =========================================================================

    const PAGE_POLYPHARMA = {
        title: '3.1 Multimorbidität und Polypharmazie',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) PIM nach PRISCUS 2.0 erkennen und Alternativen vorschlagen, (2) STOPP/START V3 als doppelte Liste (Über- und Unterversorgung) anwenden, (3) FORTA-Klassen einer Verschreibung zuordnen, (4) Anticholinerge Last mit ACB-Score quantifizieren, (5) ein strukturiertes Medikations-Review nach Hausarzt-Workflow durchführen.</blockquote>'

            + '<p>Patienten mit drei oder mehr chronischen Erkrankungen sind in der Hausarztpraxis Standard. Polypharmazie (≥ 5 Dauermedikamente) erhöht das Interaktions-, Sturz- und Hospitalisierungsrisiko überproportional. Das hausärztliche Mandat ist nicht nur das Verschreiben, sondern aktives <em>Deprescribing</em>.</p>'

            + '<h4>3.1.1 Pharmakologie des Alterns</h4>'
            + '<ul>'
            + '<li>Verteilungsvolumen: Körperwasser ↓, Fettmasse ↑ — lipophile Wirkstoffe (Diazepam) akkumulieren.</li>'
            + '<li>GFR sinkt ~ 10 ml/min pro Dekade nach 40 J. — bei normalem Krea! Renal eliminierte Wirkstoffe sind kritisch.</li>'
            + '<li>Hepatische CYP-Aktivität reduziert ~ 30 %.</li>'
            + '<li>Albuminbindung ↓ → freie Wirkfraktion ↑ (Phenprocoumon).</li>'
            + '<li>Veränderte Pharmakodynamik: gesteigerte Empfindlichkeit gegenüber Benzos, Opioiden, Anticholinergika; geringere Empfindlichkeit für Beta-Blocker.</li>'
            + '</ul>'

            + '<h4>3.1.2 PRISCUS-2.0-Liste (2023)</h4>'
            + '<p>Deutsche Liste potenziell inadäquater Medikation (PIM) im Alter — Universität Witten/Herdecke. Aktualisierung 2023 enthält rund 180 Wirkstoffe mit Bewertungen und konkreten Alternativen. Hochfrequente PIM:</p>'
            + '<table><thead><tr><th>Substanzklasse</th><th>Problem</th><th>Alternative</th></tr></thead><tbody>'
            + '<tr><td>Trizyklische Antidepressiva (Amitriptylin, Doxepin)</td><td>stark anticholinerg, α1-adrenolytisch (Sturzgefahr, Delir)</td><td>SSRI (Sertralin, Citalopram); bei Schmerz Duloxetin oder Pregabalin</td></tr>'
            + '<tr><td>Benzodiazepine mit langer HWZ (Diazepam, Flurazepam)</td><td>Akkumulation, Stürze, Delir</td><td>Schlafhygiene, Mirtazapin nieder dosiert; bei zwingender Indikation Lorazepam zeitlich begrenzt</td></tr>'
            + '<tr><td>Z-Substanzen (Zolpidem, Zopiclon)</td><td>Sturzrisiko, Abhängigkeit</td><td>Schlafhygiene, kurz Melatonin (Off-label-Hinweis)</td></tr>'
            + '<tr><td>NSAR-Dauergabe</td><td>GI-Blutung, Niereninsuffizienz, HF-Verschlechterung, RR ↑</td><td>Paracetamol, lokale NSAR, ggf. niedrigdosiertes Opioid</td></tr>'
            + '<tr><td>Anticholinergika (Oxybutynin, Tolterodin)</td><td>kognitive Verschlechterung</td><td>Mirabegron (β3)</td></tr>'
            + '<tr><td>Sulfonylharnstoffe (Glibenclamid)</td><td>schwere Hypoglykämien</td><td>Metformin, DPP-4-Hemmer, SGLT2-Inhibitor</td></tr>'
            + '<tr><td>Nifedipin schnell freisetzend</td><td>Reflextachykardie, Apoplex</td><td>Amlodipin/Lercanidipin retard</td></tr>'
            + '<tr><td>Antihistaminika 1. Generation (Diphenhydramin)</td><td>Sedierung, Delir, anticholinerg</td><td>Loratadin/Cetirizin (2. Gen.)</td></tr>'
            + '</tbody></table>'

            + '<h4>3.1.3 STOPP/START-Kriterien Version 3 (2023)</h4>'
            + '<p>Europäisches Pendant zu PRISCUS, herausgegeben von der European Geriatric Medicine Society (O\'Mahony et al., Eur Geriatr Med 2023). <strong>Doppelte Logik</strong>:</p>'
            + '<ul>'
            + '<li><strong>STOPP</strong> (Screening Tool of Older Persons\' potentially inappropriate Prescriptions): 133 Kriterien für Wirkstoffe, die abgesetzt werden sollten.</li>'
            + '<li><strong>START</strong> (Screening Tool to Alert doctors to Right Treatment): 57 Kriterien für fehlende, evidenzbasiert indizierte Medikamente — <em>Unterversorgung</em>.</li>'
            + '</ul>'
            + '<p>Klassische START-Indikationen, die im Alter häufig fehlen: Statin bei manifester KHK, ACE-Hemmer/ARB nach STEMI, Bisphosphonat bei manifester Osteoporose / Schenkelhalsfraktur, DOAK bei nicht-valvulärem AF, ICS-Formoterol bei Asthma, Vit-D-Substitution bei Sturzrisiko.</p>'

            + '<h4>3.1.4 FORTA-Klassifikation (Fit fOR The Aged, Wehling et al.)</h4>'
            + '<table><thead><tr><th>Klasse</th><th>Bedeutung</th><th>Beispiel</th></tr></thead><tbody>'
            + '<tr><td>A</td><td>absolutely — klare Indikation, gute Evidenz im Alter</td><td>Statin bei KHK; DOAK bei AF</td></tr>'
            + '<tr><td>B</td><td>beneficial — Wirksamkeit nachgewiesen, kleine Einschränkungen</td><td>ACE-Hemmer bei HFrEF</td></tr>'
            + '<tr><td>C</td><td>careful — fragwürdiger Nutzen, Alternativen prüfen</td><td>Digoxin außerhalb HFrEF; Sulfonylharnstoffe</td></tr>'
            + '<tr><td>D</td><td>don\'t — vermeiden (≈ PIM)</td><td>Amitriptylin, Diazepam Dauer, Glibenclamid</td></tr>'
            + '</tbody></table>'

            + '<h4>3.1.5 Anticholinerge Last (ACB-Score)</h4>'
            + '<p>Anticholinergic Burden Scale: jeder Wirkstoff mit relevanten anticholinergen Nebenwirkungen wird mit 1 (möglich) bis 3 (definitiv) gewichtet. Summe ≥ 3 ist mit erhöhter Sturz-, Delir- und Mortalitätsrate assoziiert (Fox et al., JAGS 2011; Coupland et al., JAMA Intern Med 2019). Hohe Werte v. a. durch TZA, Antihistaminika 1. Gen., Spasmolytika (Oxybutynin), Antipsychotika (Olanzapin, Clozapin), Antiemetika (Metoclopramid, Promethazin).</p>'

            + '<h4>3.1.6 Strukturiertes Medikations-Review</h4>'
            + '<p>Empfohlen mindestens jährlich, bei jeder Krankenhausentlassung und bei jedem neuen Symptom. Vorgehen nach <em>Brown-Bag-Methode</em>: Patient bringt alle Medikamente (auch OTC, Phytopharmaka, NEM) mit. Schritte:</p>'
            + '<ol>'
            + '<li><strong>Indikationscheck:</strong> Hat jedes Medikament noch eine aktuelle Indikation?</li>'
            + '<li><strong>Wirksamkeit:</strong> Ziel erreicht (HbA1c, RR, LDL, INR)?</li>'
            + '<li><strong>Sicherheit:</strong> Interaktionen (ABDA, AiDKlinik), PRISCUS/STOPP, eGFR-Check.</li>'
            + '<li><strong>Adhärenz:</strong> Therapietreue, Polypharmazie-Last, Tablettenform.</li>'
            + '<li><strong>Symptome als UAW prüfen:</strong> "Could this be a drug?"</li>'
            + '<li><strong>Deprescribing-Plan:</strong> ein Wirkstoff pro Konsultation absetzen, schrittweise tapern (insbesondere PPI, SSRI, Benzo, Opioid).</li>'
            + '</ol>'

            + '<h4>3.1.7 Klassischer Fall</h4>'
            + '<p><em>82-jährige Patientin</em>, Z. n. mehrfachen Stürzen. Medikamentenliste: Amitriptylin 25 mg zN (gegen Schlafstörung), Lorazepam 1 mg b. B., Bisoprolol 5 mg, Apixaban 2 × 5 mg, Atorvastatin 40 mg, Pantoprazol 20 mg seit 5 Jahren ohne klare Indikation, Ibuprofen 600 mg b. B. Probleme: Amitriptylin (PIM, anticholinerg + α1-blockierend → Sturz), Lorazepam (PIM), NSAR + DOAK (Blutungsrisiko), PPI ohne Indikation. Plan: Amitriptylin tapern, Lorazepam absetzen (Schlafhygiene), Ibuprofen → Paracetamol/lokale Salbe, PPI auslassen mit Re-Test der Symptomatik.</p>'

            + '<p class="quellen"><em>Quellen:</em> PRISCUS 2.0 (2023, Universität Witten/Herdecke); O\'Mahony D et al., STOPP/START V3, Eur Geriatr Med 2023; Wehling FORTA 2024; Fox C et al., JAGS 2011; Coupland CAC et al., JAMA Intern Med 2019; KBV-Hausarztzentrierte Versorgung Medikations-Review-Modul.</p>'
    };

    const PAGE_PRAEVENTION = {
        title: '3.2 Prävention, Screening und Impfungen',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) die vier Präventionsebenen mit Beispielen einordnen, (2) gesetzliche Vorsorgeprogramme nach G-BA aktueller Fassung durchführen, (3) STIKO-Empfehlungen 2024 für Erwachsene und Risikogruppen anwenden, (4) latente Hypothyreose evidenzbasiert <em>nicht</em> übertherapieren, (5) das SCORE2-Risiko abschätzen und Präventionsentscheidungen ableiten.</blockquote>'

            + '<p>Prävention ist Kernkompetenz der Hausarztpraxis. Die meisten Sterblichkeit-vermeidenden Maßnahmen (Tabakprävention, Hypertonie-Behandlung, Statin nach KHK) finden hier statt — nicht in der Hochleistungsmedizin.</p>'

            + '<h4>3.2.1 Präventionsebenen</h4>'
            + '<table><thead><tr><th>Ebene</th><th>Ziel</th><th>Beispiel</th></tr></thead><tbody>'
            + '<tr><td>Primär</td><td>Erkrankung verhindern</td><td>STIKO-Impfung, Tabakprävention, Hypertonie-Behandlung</td></tr>'
            + '<tr><td>Sekundär</td><td>Frühstadium erkennen</td><td>Mammographie, FOBT/Koloskopie, Pap/HPV</td></tr>'
            + '<tr><td>Tertiär</td><td>Folgeschäden mindern</td><td>Reha nach Apoplex, Lipidkontrolle nach STEMI</td></tr>'
            + '<tr><td>Quartär</td><td>Schaden durch Medizin verhindern</td><td>Kein PSA-Screening ohne Aufklärung; Polypharmazie reduzieren</td></tr>'
            + '</tbody></table>'

            + '<h4>3.2.2 Gesetzliche Vorsorgeprogramme (G-BA, Stand 2024)</h4>'
            + '<table><thead><tr><th>Untersuchung</th><th>Anspruchsberechtigt</th><th>Frequenz</th></tr></thead><tbody>'
            + '<tr><td>Check-up 35</td><td>ab 35 J.</td><td>alle 3 J. — Anamnese, klin. Untersuchung, Lipid, Nüchtern-Glukose, Urin-Stix</td></tr>'
            + '<tr><td>Hepatitis-B/C-Screening</td><td>ab 35 J.</td><td>einmalig im Rahmen Check-up 35 (seit 2021)</td></tr>'
            + '<tr><td>Hautkrebs-Screening</td><td>ab 35 J.</td><td>alle 2 J., Ganzkörperinspektion</td></tr>'
            + '<tr><td>Mammographie-Screening</td><td>Frauen 50–69 J.</td><td>alle 2 J. (Erweiterung auf 45–74 in mehreren Stufen ab 2024)</td></tr>'
            + '<tr><td>Zervix-Karzinom-Screening</td><td>Frauen 20–34 / ≥ 35</td><td>20–34: jährlich Pap; ab 35: alle 3 J. HPV-Co-Testing</td></tr>'
            + '<tr><td>Darmkrebs-Screening</td><td>Männer ≥ 50 / Frauen ≥ 55</td><td>iFOBT jährlich oder Koloskopie alle 10 J.</td></tr>'
            + '<tr><td>AAA-Screening</td><td>Männer ≥ 65</td><td>einmalig Sonographie der Bauchaorta</td></tr>'
            + '</tbody></table>'

            + '<h4>3.2.3 STIKO-Empfehlungen 2024 (Erwachsene)</h4>'
            + '<table><thead><tr><th>Impfung</th><th>Standard</th><th>Besonderheit</th></tr></thead><tbody>'
            + '<tr><td>Tetanus-Diphtherie-Pertussis (Tdap)</td><td>alle 10 J. Td-Auffrischung, einmalig als Tdap</td><td>Schwangere: 1 × Tdap im 3. Trimenon (Säuglings-Pertussis-Schutz)</td></tr>'
            + '<tr><td>Polio (IPV)</td><td>einmalige Auffrischung</td><td>Kein OPV mehr in DE seit 1998</td></tr>'
            + '<tr><td>Influenza</td><td>jährlich ≥ 60 J., Risikogruppen</td><td>Hochdosis- oder adjuvantierter Impfstoff bei ≥ 60</td></tr>'
            + '<tr><td>Pneumokokken (PCV20)</td><td>einmalig ≥ 60 J.</td><td>Seit 2023 PCV20 als bevorzugte Standardimpfung</td></tr>'
            + '<tr><td>Herpes zoster (Shingrix)</td><td>≥ 60 J., 2 Dosen 2–6 Mo. Abstand</td><td>Risikogruppen ab 50 J.</td></tr>'
            + '<tr><td>RSV (Arexvy/Abrysvo)</td><td>≥ 75 J. einmalig (seit 2024)</td><td>60–74 J. mit RF; Säuglinge: passiv Nirsevimab in RSV-Saison</td></tr>'
            + '<tr><td>COVID-19</td><td>Risikogruppen jährliche Auffrischung</td><td>Aktualisierter Impfstoff je Saison</td></tr>'
            + '<tr><td>HPV</td><td>Mädchen + Jungen 9–14 J. (Nachholen bis 17)</td><td>Schutz vor Zervix-, Anal-, Oropharynxkarzinom</td></tr>'
            + '<tr><td>MMR</td><td>nach 1970 Geborene mit unklarem Status: 1 × MMR</td><td>Masern-Schutzimpfgesetz 2020 für Kita/Schule</td></tr>'
            + '</tbody></table>'

            + '<h4>3.2.4 SCORE2 / SCORE2-OP</h4>'
            + '<p>ESC-Risikorechner 2021 für 10-Jahres-Risiko für tödliche und nicht-tödliche kardiovaskuläre Ereignisse, kalibriert für 4 europäische Risikoregionen (Deutschland: niedriges Risiko-Land). Eingangsgrößen: Alter, Geschlecht, Raucherstatus, RR_sys, Non-HDL-Cholesterin. SCORE2-OP für Patienten ≥ 70 J. Risikoklassen für Lipid-Therapieziele s. 2.4.3.</p>'

            + '<h4>3.2.5 Latente Hypothyreose: Klassiker quartärer Prävention</h4>'
            + '<p>Laborkonstellation: TSH erhöht, fT3 und fT4 normwertig, asymptomatisch. Prävalenz bei &gt; 60 J. ca. 10 %. <strong>DEGAM-Empfehlung:</strong> bei TSH &lt; 10 mU/l und Asymptomatik <em>keine</em> sofortige L-Thyroxin-Substitution; Kontrolle nach 2–3 Monaten, da TSH transient ansteigen kann (z. B. nach Infekten, im Winter, bei Adipositas). Übertherapie erhöht Risiko für Vorhofflimmern (HR ~ 1,4) und Osteoporose, ohne Outcome-Vorteil bei Asymptomatik (TRUST-Trial Stott NEJM 2017). Substitution erst bei TSH ≥ 10 mU/l, Symptomatik oder Schwangerschafts-Wunsch.</p>'

            + '<h4>3.2.6 Vitamin D, Folat, Vitamin B12</h4>'
            + '<ul>'
            + '<li><strong>Vitamin D:</strong> DGE empfiehlt 800 IE/d Substitution bei Personen, die ungenügende Sonnenexposition haben (≥ 65 J., Pflegeheim, Migrantenpopulation). Routinemäßige Spiegelmessung nicht empfohlen — Mehrwert in Mortalität nicht belegt.</li>'
            + '<li><strong>Folat:</strong> Substitution 400 µg/d in der Schwangerschaft (perikonzeptionell bis Ende 1. Trimenon) — Reduktion von Neuralrohrdefekten.</li>'
            + '<li><strong>Vitamin B12:</strong> bei Veganern, Metformin-Langzeit, PPI-Langzeit, älteren Patienten regelmäßige Kontrolle. Substitution oral 1000 µg/d sicher (auch bei perniziöser Anämie).</li>'
            + '</ul>'

            + '<h4>3.2.7 Tabakentwöhnung und Sucht-Beratung</h4>'
            + '<p>Stärkster modifizierbarer Risikofaktor — Tabakstopp senkt KV-Risiko bereits in den ersten 2 Jahren erheblich. Strategien: 5-A-Schema (Ask, Advise, Assess, Assist, Arrange), Verhaltensintervention + Pharmakotherapie (Nikotinersatz, Bupropion, Vareniclin). Hausarzt-Kurzintervention (3 min) ist evidenzbasiert wirksam (Cochrane Stead 2013).</p>'

            + '<p class="quellen"><em>Quellen:</em> STIKO Epid. Bull. 4/2024; G-BA-Richtlinien Vorsorge 2024; ESC SCORE2 + SCORE2-OP, Eur Heart J 2021; DEGAM S2k Hashimoto-Thyreoiditis 2023; TRUST-Trial Stott DJ et al. NEJM 2017; DGE Vitamin-D-Empfehlung 2024; Cochrane Stead 2013.</p>'
    };

    const PAGE_RECHT_GERIATRIE = {
        title: '3.3 Geriatrie, Palliativmedizin und juristische Grundlagen',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) Geriatrie-Assessments korrekt zuordnen (Frailty, MMST/MoCA, Barthel, GDS, Tinetti), (2) Demenz-Stufendiagnostik nach S3 abarbeiten und Cholinesterasehemmer/Memantin indikationsgerecht einsetzen, (3) BGB-§ 1827 Patientenverfügung formal prüfen, Vorsorgevollmacht von gesetzlicher Betreuung abgrenzen, (4) Sterbehilfe-Formen rechtlich und ethisch unterscheiden, (5) Palliativ-Symptome leitliniengerecht behandeln (Schmerz, Dyspnoe, terminale Unruhe, Sekretrasseln).</blockquote>'

            + '<p>Geriatrie und Palliativmedizin sind Hausarzt-Domäne. Beides verlangt strukturierte Diagnostik, Kenntnis rechtlicher Rahmenbedingungen und die Fähigkeit, Therapieziele am Patientenwillen auszurichten — nicht an Maximaltherapie.</p>'

            + '<h4>3.3.1 Frailty-Konzept (Fried-Phänotyp)</h4>'
            + '<p>Fünf Kriterien, ≥ 3 = frail, 1–2 = pre-frail (Fried LP et al., J Gerontol 2001):</p>'
            + '<ol>'
            + '<li>Unbeabsichtigter Gewichtsverlust ≥ 4,5 kg im letzten Jahr.</li>'
            + '<li>Selbstberichtete Erschöpfung (CES-D-Items).</li>'
            + '<li>Reduzierte Handgreifkraft (Dynamometer; geschlechts- und BMI-stratifiziert).</li>'
            + '<li>Verlangsamte Ganggeschwindigkeit über 4,57 m (≤ 0,8 m/s pathologisch).</li>'
            + '<li>Geringe körperliche Aktivität (kcal/Woche).</li>'
            + '</ol>'
            + '<p>Frailty prädiziert Stürze, Hospitalisation, Funktionsverlust, Mortalität. Therapieprinzip: <strong>Resistance-Training + ausreichend Eiweiß (≥ 1,0 g/kg KG/d, bei Akuterkrankung ≥ 1,2)</strong>; bei Sarkopenie EWGSOP2-Algorithmus mit Greifkraft, Muskelmasse (BIA, DXA) und Funktion (Gangtempo, SPPB).</p>'

            + '<h4>3.3.2 Geriatrische Standardtests</h4>'
            + '<table><thead><tr><th>Test</th><th>Domäne</th><th>Pathologisch</th></tr></thead><tbody>'
            + '<tr><td>MMST (Mini-Mental-Status)</td><td>Kognition (Screening)</td><td>≤ 26 / 30; &lt; 24 deutlich</td></tr>'
            + '<tr><td>MoCA</td><td>Kognition (sensitiver für MCI)</td><td>≤ 25 / 30</td></tr>'
            + '<tr><td>DemTect</td><td>Kognition (Praxis)</td><td>≤ 12 / 18</td></tr>'
            + '<tr><td>Uhrentest</td><td>visuokonstruktiv/exekutiv</td><td>Skala Shulman 0–5</td></tr>'
            + '<tr><td>Barthel-Index</td><td>ADL (Selbstpflege)</td><td>&lt; 100 = abhängig</td></tr>'
            + '<tr><td>IADL (Lawton)</td><td>instrumentelle ADL</td><td>geschlechtsabhängig</td></tr>'
            + '<tr><td>GDS (Geriatric Depression Scale)</td><td>Depression</td><td>≥ 6 / 15</td></tr>'
            + '<tr><td>Tinetti / TUG</td><td>Sturzrisiko</td><td>TUG &gt; 12 s</td></tr>'
            + '<tr><td>Mini-Nutritional-Assessment</td><td>Mangelernährung</td><td>&lt; 17 / 30</td></tr>'
            + '</tbody></table>'

            + '<h4>3.3.3 Demenz: S3-Stufendiagnostik (AWMF 038-013)</h4>'
            + '<ol>'
            + '<li><strong>Anamnese</strong> mit Fremdanamnese (Verlauf? frontale Verhaltensauffälligkeiten? Halluzinationen? Sturzanamnese?).</li>'
            + '<li><strong>Kognitives Screening</strong> (MMST + Uhrentest oder MoCA/DemTect).</li>'
            + '<li><strong>Labor zur DD reversibler Ursachen</strong>: TSH, Vit B12 + Folsäure, Krea, Elektrolyte, Leberwerte, Glukose, Blutbild, ggf. Lues, HIV, Borrelien, Cortisol.</li>'
            + '<li><strong>Bildgebung</strong>: <strong>MRT</strong> bevorzugt (Hippocampus-Atrophie? vaskuläre Läsionen? Normaldruckhydrozephalus?). CT bei MRT-KI.</li>'
            + '<li><strong>Erweiterte Diagnostik</strong> (Spezialambulanz): Liquor (Aβ42 ↓, Tau / phospho-Tau ↑ bei Alzheimer), FDG-PET, Amyloid-PET, ggf. genetische Testung bei früher Form.</li>'
            + '</ol>'
            + '<p>Therapie:</p>'
            + '<ul>'
            + '<li><strong>Cholinesterasehemmer</strong> (Donepezil, Rivastigmin, Galantamin) bei leichter bis mittelschwerer Alzheimer-Demenz (MMST 10–26).</li>'
            + '<li><strong>Memantin</strong> (NMDA-Antagonist) bei moderater bis schwerer Alzheimer-Demenz (MMST &lt; 20). Kombinations- oder Sequenztherapie möglich.</li>'
            + '<li><strong>Nicht-pharmakologisch</strong>: Realitätsorientierung, Erinnerungsarbeit, körperliche Aktivität, Ergotherapie, Logopädie, Angehörigenschulung. Antipsychotika nur bei Eigen-/Fremdgefährdung, möglichst kurz, Risperidon niedrig dosiert. <em>Nie</em> bei Lewy-Body-/Parkinson-Demenz konventionelle Antipsychotika (extreme Hypersensitivität).</li>'
            + '</ul>'

            + '<h4>3.3.4 Patientenverfügung — BGB § 1827 (i. d. F. 2023)</h4>'
            + '<p>Schriftliche Festlegung eines einwilligungsfähigen Volljährigen für den Fall späterer Einwilligungsunfähigkeit. <strong>Voraussetzungen für Bindungswirkung</strong>:</p>'
            + '<ul>'
            + '<li>Schriftform und eigenhändige Unterschrift (oder notariell beglaubigtes Handzeichen).</li>'
            + '<li>Verfasser bei Errichtung einwilligungsfähig und volljährig.</li>'
            + '<li><strong>Konkret-bestimmt</strong> für die spätere Behandlungssituation und für bestimmte ärztliche Maßnahmen (BGH XII ZB 61/16, 2016: pauschale Wendungen wie "keine lebenserhaltenden Maßnahmen" sind unzureichend).</li>'
            + '<li>Aktualität: keine gesetzliche Frist, Erneuerung alle 1–2 Jahre empfohlen.</li>'
            + '</ul>'
            + '<p>Bei zutreffender Patientenverfügung ist diese unmittelbar bindend — Arzt und Bevollmächtigter setzen sie um, ohne Betreuungsgericht. Nur bei <em>Auslegungsstreit</em> oder Abweichen Bevollmächtigter ↔ Arzt: § 1829 BGB Genehmigung Betreuungsgericht.</p>'

            + '<h4>3.3.5 Vorsorgevollmacht vs. gesetzliche Betreuung</h4>'
            + '<table><thead><tr><th></th><th>Vorsorgevollmacht</th><th>Gesetzliche Betreuung</th></tr></thead><tbody>'
            + '<tr><td>Errichtung</td><td>privatautonom, schriftlich (notariell empfohlen)</td><td>Betreuungsgericht, § 1814 BGB</td></tr>'
            + '<tr><td>Voraussetzung</td><td>Geschäftsfähigkeit bei Errichtung</td><td>Betreuungsbedürftigkeit aktuell</td></tr>'
            + '<tr><td>Reichweite</td><td>Gesundheits-, Aufenthalts-, Vermögenssorge — frei wählbar</td><td>nur soweit erforderlich (§ 1815, Subsidiaritätsprinzip)</td></tr>'
            + '<tr><td>Eingriffe in Freiheitsrechte</td><td>besonders zu erwähnen + Genehmigung Betreuungsgericht (z. B. Fixierung)</td><td>generell durch Gericht gesteuert</td></tr>'
            + '</tbody></table>'
            + '<p>Seit 2023: <strong>Ehegattenvertretungsrecht</strong> (§ 1358 BGB) — Ehegatten dürfen sich in akuten Gesundheitsangelegenheiten max. 6 Monate vertreten, ohne Vorsorgevollmacht.</p>'

            + '<h4>3.3.6 Sterbehilfe — Begriffsklärung</h4>'
            + '<table><thead><tr><th>Form</th><th>Definition</th><th>Rechtslage in DE</th></tr></thead><tbody>'
            + '<tr><td>Aktive Sterbehilfe</td><td>gezieltes Tötungshandeln durch Dritte</td><td>verboten, § 216 StGB</td></tr>'
            + '<tr><td>Indirekte Sterbehilfe</td><td>Symptomlinderung mit unbeabsichtigter Lebensverkürzung</td><td>erlaubt (Doppeleffekt)</td></tr>'
            + '<tr><td>Passive Sterbehilfe</td><td>Verzicht/Abbruch lebenserhaltender Maßnahmen entsprechend Patientenwille</td><td>erlaubt, geboten</td></tr>'
            + '<tr><td>Assistierter Suizid</td><td>Bereitstellung tödlicher Substanz, Einnahme durch Patient selbst</td><td>BVerfG 26.02.2020: § 217 StGB nichtig; ärztliche Pflicht zur Suizidassistenz besteht <em>nicht</em></td></tr>'
            + '</tbody></table>'

            + '<h4>3.3.7 Palliativ-Symptomtherapie</h4>'
            + '<ul>'
            + '<li><strong>Schmerz:</strong> WHO-Stufenschema (s. 3.4); Morphin oral 30 mg ≈ Hydromorphon 4 mg ≈ Oxycodon 20 mg; bei Niereninsuffizienz Hydromorphon bevorzugen.</li>'
            + '<li><strong>Dyspnoe</strong> (Cochrane Barnes 2016): niedrigdosiertes Morphin (z. B. 2,5–5 mg p. o. alle 4 h) — wirkt ohne Atemdepression bei opiatnaiven Palliativpatienten. Sauerstoff nur bei Hypoxie. Lorazepam 0,5–1 mg sublingual zusätzlich bei Angstkomponente.</li>'
            + '<li><strong>Terminale Unruhe:</strong> Midazolam 2,5–5 mg s. c.; Levomepromazin oder Haloperidol bei produktiv-deliranter Komponente.</li>'
            + '<li><strong>Sekretrasseln</strong> ("Death rattle"): Lagerung, Mund-/Rachenpflege; Butylscopolamin 20 mg s. c. (anticholinerg, antisekretorisch).</li>'
            + '<li><strong>Übelkeit/Erbrechen:</strong> Metoclopramid (KI Parkinson, QT), Haloperidol, Ondansetron, Dimenhydrinat.</li>'
            + '<li><strong>Obstipation unter Opioid:</strong> Macrogol oder Natriumpicosulfat <em>obligat</em>; bei Therapieversagen Methylnaltrexon s. c. (PAMORA).</li>'
            + '</ul>'

            + '<h4>3.3.8 Palliativversorgung — Strukturen</h4>'
            + '<p><strong>AAPV</strong> (Allgemeine ambulante Palliativversorgung) durch Hausarzt + Pflegedienst — Standardfall am Lebensende. <strong>SAPV</strong> (Spezialisierte ambulante Palliativversorgung) durch interdisziplinäres Team mit 24/7-Rufbereitschaft für komplexe Fälle (refraktäre Schmerzen, schwere Dyspnoe, terminale Unruhe). Stationäre Optionen: Palliativstation (zeitlich begrenzt, Symptomkontrolle), Hospiz (Sterbeort, Lebenserwartung typisch &lt; 6 Monate). Verordnung SAPV: Formular Muster 63.</p>'

            + '<p class="quellen"><em>Quellen:</em> AWMF S3 Demenz 038-013 (2023); AWMF S3 Palliativmedizin 128/001OL; BGB §§ 1814, 1815, 1827, 1829, 1358 i. d. F. 2023; BGH XII ZB 61/16; BVerfG 2 BvR 2347/15 vom 26.02.2020 (§ 217 StGB); EWGSOP2 Cruz-Jentoft AJ et al., Age Ageing 2019; Fried LP et al., J Gerontol A Biol Sci Med Sci 2001; Cochrane Barnes H et al. 2016 (Morphin bei Dyspnoe).</p>'
    };

    const PAGE_NOTFALL_SCHMERZ = {
        title: '3.4 Notfallmedizin und Schmerztherapie in der Hausarztpraxis',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie können (1) das ABCDE-Schema strukturiert anwenden und SAMPLE-Anamnese erheben, (2) Anaphylaxie nach Ring/Messmer einstufen und Adrenalin korrekt dosieren, (3) Hypoglykämie und hypertensive Krise/Notfall differenziert behandeln, (4) das WHO-Stufenschema mit Opioid-Rotation und Äquivalenzdosen umsetzen, (5) BLS-/ALS-Algorithmus inkl. reversibler 4 H/HITS abarbeiten.</blockquote>'

            + '<p>Auch in der Hausarztpraxis treten lebensbedrohliche Notfälle auf — Anaphylaxie, Hypoglykämie, hypertensiver Notfall, akutes Koronarsyndrom. Strukturiertes Vorgehen rettet Leben. Ergänzend: chronische Schmerztherapie ist die häufigste Dauerverordnung im hausärztlichen Alltag.</p>'

            + '<h4>3.4.1 ABCDE-Schema und SAMPLE-Anamnese</h4>'
            + '<table><thead><tr><th>Buchstabe</th><th>Inhalt</th><th>Maßnahme</th></tr></thead><tbody>'
            + '<tr><td>A — Airway</td><td>freie Atemwege?</td><td>Esmarch-Handgriff, Absaugen, ggf. Wendl-/Guedel-Tubus</td></tr>'
            + '<tr><td>B — Breathing</td><td>AF, SpO₂, Auskultation</td><td>O₂ bei SpO₂ &lt; 94 %; Beutel-Maske bei Apnoe</td></tr>'
            + '<tr><td>C — Circulation</td><td>Puls, RR, Rekapillarisierung</td><td>i. v.-Zugang, Volumen, Blutstillung</td></tr>'
            + '<tr><td>D — Disability</td><td>Bewusstsein (AVPU/GCS), Pupillen, BZ</td><td>Glukose, Naloxon falls indiziert</td></tr>'
            + '<tr><td>E — Exposure</td><td>Ganzkörperinspektion, Temperatur</td><td>Wärmeerhalt, SAMPLE</td></tr>'
            + '</tbody></table>'
            + '<p>SAMPLE: <strong>S</strong>ymptome, <strong>A</strong>llergien, <strong>M</strong>edikamente, <strong>P</strong>atientenanamnese, <strong>L</strong>etzte Mahlzeit, <strong>E</strong>reignis.</p>'

            + '<h4>3.4.2 Anaphylaxie (Ring/Messmer; AWMF S2k 061-025)</h4>'
            + '<table><thead><tr><th>Stadium</th><th>Klinik</th></tr></thead><tbody>'
            + '<tr><td>I</td><td>Hautsymptome (Urtikaria, Flush)</td></tr>'
            + '<tr><td>II</td><td>+ leichte Allgemeinreaktion (Übelkeit, Tachykardie, Dyspnoe)</td></tr>'
            + '<tr><td>III</td><td>Schock, Bronchospasmus, Larynxödem</td></tr>'
            + '<tr><td>IV</td><td>Atem-/Kreislaufstillstand</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Erstmaßnahme ab Stadium II:</strong> <em>Adrenalin i. m. lateral am Oberschenkel</em> 0,3–0,5 mg (1:1000-Lösung); Wiederholung nach 5–15 min. Frühe Adrenalin-Gabe ist mortalitätsentscheidend; Antihistaminika (H1- + H2-Blocker) und Glucocorticoide (250–500 mg Prednisolon) sind <em>nachgeordnet</em> mit verzögertem Wirkungseintritt.</p>'
            + '<p>Begleitend: kristalloide Volumengabe 500–1000 ml zügig, Sauerstoff, β2-Sympathomimetikum bei Bronchospasmus (Salbutamol DA), Lagerung mit hochgelegten Beinen (Schock-Lagerung — bei Atemnot halbsitzend). Notfallset für Patienten nach Erstereignis: Adrenalin-Autoinjektor (300 µg Erw., 150 µg Kinder &lt; 25 kg), Antihistaminikum p. o., Prednisolon p. o., Patientenschulung.</p>'

            + '<h4>3.4.3 Hypoglykämie</h4>'
            + '<p>Definition: BZ &lt; 70 mg/dl (3,9 mmol/l) mit Symptomen (Whipple-Trias: niedriger BZ, typische Symptomatik, Besserung nach Glukose). Häufige Ursache: Insulin- oder Sulfonylharnstoff-Therapie + ausgelassene Mahlzeit / körperliche Belastung / Alkohol.</p>'
            + '<ul>'
            + '<li><strong>Wach, schluckfähig:</strong> 15–20 g schnelle Glukose oral (Traubenzucker, 200 ml Saft); Re-Test nach 15 min, ggf. wiederholen, dann komplexe Kohlenhydrate.</li>'
            + '<li><strong>Bewusstlos:</strong> 20–40 ml G40 langsam i. v. oder <strong>Glucagon 1 mg i. m.</strong> (Hausbesuch). Glucagon wirkt <em>nicht</em> bei Glykogenspeicher-Erschöpfung (Alkohol, Mangelernährung, Lebererkrankung) — dann i. v.-Glucose obligat.</li>'
            + '</ul>'
            + '<p>Sulfonylharnstoff-Hypoglykämien können tagelang persistieren — stationäre Überwachung mit Glukose-Dauerinfusion.</p>'

            + '<h4>3.4.4 Hypertensive Krise vs. hypertensiver Notfall</h4>'
            + '<p>Beide ab RR ≥ 180/120 mmHg, Unterscheidung nach Endorganschaden:</p>'
            + '<ul>'
            + '<li><strong>Krise (Urgency):</strong> ohne akute Endorganschädigung. Senkung über Stunden, ambulant. Beispiel: Captopril 12,5–25 mg p. o., Nitroglycerin SL bei stenokardischer Komponente. Cave: keine zu schnelle Senkung — Hypoperfusion.</li>'
            + '<li><strong>Notfall (Emergency):</strong> mit akuter Endorganschädigung — Lungenödem, hypertensive Enzephalopathie, ACS, Aortendissektion, Eklampsie, intrazerebrale Blutung. <em>Klinikeinweisung</em>, i. v.-Therapie (Urapidil, Nitroglycerin, bei Aortendissektion Esmolol/Labetalol + Vasodilatator). <strong>Senkung max. 25 % in der ersten Stunde</strong>; Ausnahmen: Aortendissektion (sys. RR &lt; 120 mmHg innerhalb 20 min), Eklampsie (rasche Senkung indiziert).</li>'
            + '</ul>'

            + '<h4>3.4.5 WHO-Stufenschema der Schmerztherapie</h4>'
            + '<table><thead><tr><th>Stufe</th><th>Wirkstoff</th><th>Cave</th></tr></thead><tbody>'
            + '<tr><td>1</td><td>Paracetamol (max. 4 g/d), NSAR (Ibuprofen, Naproxen, Diclofenac), Metamizol</td><td>Paracetamol hepatotoxisch ab 8 g akut; NSAR GI/renal/HF; Metamizol Agranulozytose-Risiko (Aufklärung!)</td></tr>'
            + '<tr><td>2</td><td>Tramadol, Tilidin/Naloxon</td><td>Ceiling-Effekt, Krampfschwelle ↓ (Tramadol), serotonerge Komponente</td></tr>'
            + '<tr><td>3</td><td>Morphin, Hydromorphon, Oxycodon, Fentanyl-Pflaster (nur stabiler Schmerz!), Buprenorphin</td><td>Atemdepression, Obstipation, Toleranz, Hyperalgesie</td></tr>'
            + '</tbody></table>'
            + '<p>Adjuvanzien: Antikonvulsiva (Pregabalin, Gabapentin) bei neuropathischem Schmerz; Antidepressiva (Duloxetin, Amitriptylin — Cave PRISCUS) bei chronischen muskuloskelettalen / neuropathischen Schmerzen; Glucocorticoide bei Tumorschmerz mit Knochen- oder Nervenkompression; Bisphosphonate bei Knochenmetastasen.</p>'
            + '<p>Bei unzureichender Wirkung in Stufe 2: <strong>direkter Wechsel auf Stufe 3</strong> statt Stufe-2-Eskalation (kein Mischen Stufe 2 + 3). Retard-Basis + schnellwirksame Bedarfsmedikation 1/6 der Tagesdosis (max. 6 ×/d).</p>'

            + '<h4>3.4.6 Opioid-Rotation und Äquivalenzdosen</h4>'
            + '<p>Faustregel orale Morphin-Äquivalenz pro 24 h:</p>'
            + '<table><thead><tr><th>Opioid</th><th>Dosis äquivalent zu 30 mg Morphin oral</th></tr></thead><tbody>'
            + '<tr><td>Morphin oral</td><td>30 mg</td></tr>'
            + '<tr><td>Morphin s. c. / i. v.</td><td>10 mg (Faktor 3:1)</td></tr>'
            + '<tr><td>Hydromorphon oral</td><td>4 mg (Faktor 7,5:1)</td></tr>'
            + '<tr><td>Oxycodon oral</td><td>20 mg (Faktor 1,5:1)</td></tr>'
            + '<tr><td>Fentanyl-Pflaster</td><td>12 µg/h</td></tr>'
            + '<tr><td>Buprenorphin transdermal</td><td>20 µg/h</td></tr>'
            + '</tbody></table>'
            + '<p>Bei Rotation 25–30 % Dosis-Reduktion (unvollständige Kreuztoleranz). Begleitmedikation: <strong>Laxans obligat</strong> (Macrogol oder Natriumpicosulfat — Opioid-induzierte Obstipation, kein Toleranzeffekt!) und initial Antiemetikum (Metoclopramid 3 ×/d für 3–5 Tage; Toleranz entwickelt sich rasch). Niereninsuffizienz: Hydromorphon oder Buprenorphin bevorzugen (Morphin: Akkumulation aktiver Metabolite M3G/M6G).</p>'

            + '<h4>3.4.7 BLS / ALS — wichtigste Eckdaten (ERC 2021)</h4>'
            + '<ul>'
            + '<li>Reanimationsbeginn bei nicht ansprechbarem Patienten ohne normale Atmung — keine Pulskontrolle durch Laien.</li>'
            + '<li><strong>Thoraxkompressionen</strong>: Frequenz 100–120/min, Tiefe 5–6 cm, Verhältnis <strong>30 : 2</strong> (Erwachsene), volle Entlastung zwischen Kompressionen.</li>'
            + '<li>Defibrillation bei <strong>schockbarem Rhythmus</strong> (Kammerflimmern / pulslose VT) — sofort, danach 2 min CPR.</li>'
            + '<li><strong>Adrenalin</strong> 1 mg i. v./i. o. alle 3–5 min: bei nicht-schockbarem Rhythmus sofort, bei schockbarem nach dem 3. Schock.</li>'
            + '<li><strong>Amiodaron</strong> 300 mg i. v. nach dem 3. Schock bei refraktärem VF; 150 mg nach dem 5. Schock.</li>'
            + '<li>Atemwegssicherung: Beutel-Maske primär, supraglottischer Atemweg oder Intubation nicht-eilig (kontinuierliche Kompressionen 10/min unter Beatmung).</li>'
            + '</ul>'
            + '<p><strong>Reversible Ursachen — 4 H und HITS:</strong></p>'
            + '<table><thead><tr><th>4 H</th><th>HITS</th></tr></thead><tbody>'
            + '<tr><td>Hypoxie</td><td>Herzbeuteltamponade</td></tr>'
            + '<tr><td>Hypovolämie</td><td>Intoxikation</td></tr>'
            + '<tr><td>Hypo-/Hyperkaliämie (+ metabolisch)</td><td>Thromboembolie (Lungenembolie, Koronar)</td></tr>'
            + '<tr><td>Hypothermie</td><td>Spannungspneumothorax</td></tr>'
            + '</tbody></table>'

            + '<h4>3.4.8 Akutes Koronarsyndrom — hausärztliche Erstmaßnahmen</h4>'
            + '<p>Bei Verdacht auf STEMI/NSTEMI: <strong>MONA-BASH</strong> (modifiziert): Morphin (bei starkem Schmerz), Sauerstoff (nur bei SpO₂ &lt; 90 %!), Nitroglycerin SL (KI: RR sys &lt; 90, RV-Infarkt, PDE-5-Hemmer), ASS 250–500 mg (kauen oder i. v.), Beta-Blocker (nur stabil), Antikoagulation, Statin früh, Heparin (nach Klinik). <em>Sofort</em> Notarzt 112; STEMI: PCI-Ziel &lt; 90 min „Door-to-balloon".</p>'

            + '<p class="quellen"><em>Quellen:</em> ERC Resuscitation Guidelines 2021; AWMF S2k Anaphylaxie 061-025 (2021); ESC ACS 2023; AWMF S3 LONTS Langzeit-Opioidtherapie nicht-tumorbedingter Schmerzen; WHO Cancer Pain Ladder; Deutsche Gesellschaft für Schmerzmedizin Äquivalenztabellen 2023.</p>'
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
