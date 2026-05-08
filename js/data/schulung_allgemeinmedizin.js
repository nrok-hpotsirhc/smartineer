/*
 * Smartineer Schulungen — Allgemeinmedizin (Vorbereitungsstand)
 *
 * Status: Geruest. Inhalte werden vom Auftraggeber nachgeliefert.
 *   - Kapitelstruktur und Quiz sind als Platzhalter vorhanden.
 *   - Sobald die Recherche-/Quellen-Datei eintrifft, werden Lehrseiten
 *     und Quiz-Fragen analog zu den CompTIA-Schulungen befuellt
 *     (>= 4 Lehrseiten pro Kapitel, >= 50 Quiz-Fragen pro Kapitel,
 *      gemaess AGENTS.md Sect. 18.4 / 18.6).
 *
 * Bis dahin wird die Schulung im UI als "in Vorbereitung" angezeigt.
 * Quellen-Vorgabe (AGENTS.md Sect. 8): primaere, aktuelle Leitlinien
 *   - AWMF-Leitlinien (Register-Nr. dokumentieren)
 *   - DEGAM-Leitlinien (Deutsche Gesellschaft fuer Allgemeinmedizin)
 *   - NVL (Nationale VersorgungsLeitlinien)
 *   - aktuelle Auflagen relevanter Lehrbuecher (Herold Innere Medizin u.a.)
 *   - WHO/RKI/PEI/BfArM Empfehlungen mit Datum.
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    // Platzhalter-Quiz, das im UI nicht startbar ist, aber dem Schema
    // entspricht (4 Optionen, correct-Index, explanation). Wird durch
    // echte Fragen aus der Recherche-Datei ersetzt.
    function placeholderQuiz(label) {
        return [
            q(
                'Inhalte fuer "' + label + '" werden gerade vorbereitet. Welche Aussage trifft zu?',
                [
                    'Die Recherche-Datei wird noch eingespielt.',
                    'Die Schulung ist bereits vollstaendig.',
                    'Es gibt keine geplanten Inhalte.',
                    'Die Schulung wurde verworfen.'
                ],
                0,
                'Platzhalter — wird durch quellenbasierte Fragen ersetzt, sobald die Recherche-Datei vorliegt.'
            )
        ];
    }

    // Platzhalter-Lehrseite. Wird durch volle didaktische Prosa ersetzt,
    // sobald die Recherche-Datei vorliegt.
    function placeholderPage(title, scope) {
        return {
            title: title,
            html: ''
                + '<p><strong>In Vorbereitung.</strong> Diese Lehrseite wird befuellt, sobald die'
                + ' Recherche-Datei zum Thema vorliegt. Geplanter Inhalt:</p>'
                + '<ul>' + scope.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>'
                + '<p class="text-sm" style="opacity:0.7">Quellen-Vorgabe: AWMF-/DEGAM-Leitlinien,'
                + ' Nationale VersorgungsLeitlinien, aktuelle Lehrbuch-Auflagen, RKI/WHO-Empfehlungen'
                + ' (jeweils mit Jahr/Version dokumentiert).</p>'
        };
    }

    window.SCHULUNGEN.list.push({
        id: 'allgemeinmedizin',
        code: 'Med-AM',
        name: 'Allgemeinmedizin',
        short: 'Allgemeinmedizin',
        desc: 'Vorbereitungs-Geruest fuer eine Schulung zur Allgemeinmedizin. Lehrseiten und Quiz-Fragen werden ergaenzt, sobald die Recherche-Datei vorliegt.',
        status: 'preparation',
        chapters: [
            {
                id: 'grundlagen_am',
                title: 'Kapitel 1 — Grundlagen der Allgemeinmedizin',
                summary: 'Selbstverstaendnis des Faches, Versorgungsebenen, hausaerztliche Funktion, Anamnese, Befunderhebung.',
                pages: [
                    placeholderPage('Selbstverstaendnis und Versorgungsauftrag', [
                        'Definition Allgemeinmedizin (DEGAM/WONCA)',
                        'Hausaerztliche Funktion und Filterfunktion',
                        'Versorgungsebenen (primaer/sekundaer/tertiaer)',
                        'Quartaere Praevention'
                    ]),
                    placeholderPage('Anamnese und Gespraechsfuehrung', [
                        'SAMPLE-/OPQRST-Schema',
                        'Biopsychosoziales Modell',
                        'Arzt-Patienten-Kommunikation',
                        'Shared Decision Making'
                    ]),
                    placeholderPage('Koerperliche Untersuchung', [
                        'Inspektion, Palpation, Perkussion, Auskultation',
                        'Vitalparameter und Normwerte',
                        'Apparative Basisdiagnostik in der Praxis',
                        'Red Flags vs. Yellow Flags'
                    ]),
                    placeholderPage('Diagnostik-Strategie', [
                        'Abwendbar gefaehrliche Verlaeufe (AGV)',
                        'Praetest- vs. Posttest-Wahrscheinlichkeit',
                        'Sensitivitaet und Spezifitaet im Praxis-Setting',
                        'Choosing Wisely / Vermeidung von Ueberdiagnostik'
                    ])
                ],
                quiz: placeholderQuiz('Kapitel 1 — Grundlagen')
            },
            {
                id: 'haeufige_beratungsanlaesse',
                title: 'Kapitel 2 — Haeufige Beratungsanlaesse',
                summary: 'Husten, Brustschmerz, Bauchschmerz, Rueckenschmerz, Kopfschmerz, Mued/Erschoepft, Schwindel.',
                pages: [
                    placeholderPage('Akute Atemwegsbeschwerden', [
                        'Husten: AGV ausschliessen',
                        'COPD/Asthma-Differenzierung',
                        'Pneumonie-Algorithmus (CRB-65)',
                        'Antibiotic Stewardship'
                    ]),
                    placeholderPage('Brust- und Bauchschmerz', [
                        'AKS-Verdacht, Marburg-Score',
                        'Akutes Abdomen — Triagekriterien',
                        'Differenzialdiagnose Oberbauch',
                        'Sonographie als Praxis-Werkzeug'
                    ]),
                    placeholderPage('Bewegungsapparat und Kopfschmerz', [
                        'Kreuzschmerz — NVL-Algorithmus',
                        'Red Flags Wirbelsaeule',
                        'Spannungs- vs. Migraene-Kopfschmerz',
                        'Sekundaere Kopfschmerzen'
                    ]),
                    placeholderPage('Allgemeinsymptome', [
                        'Muedigkeit/Erschoepfung — Differenzialdiagnose',
                        'Schwindel-Algorithmus',
                        'Fieber unklarer Genese',
                        'Gewichtsverlust unklarer Ursache'
                    ])
                ],
                quiz: placeholderQuiz('Kapitel 2 — Beratungsanlaesse')
            },
            {
                id: 'chronische_erkrankungen',
                title: 'Kapitel 3 — Chronische Erkrankungen und DMP',
                summary: 'Diabetes, Hypertonie, KHK, Herzinsuffizienz, COPD, Asthma, chronischer Rueckenschmerz, Depression.',
                pages: [
                    placeholderPage('Kardiovaskulaeres Spektrum', [
                        'Hypertonie nach aktueller ESC-Leitlinie',
                        'KHK-DMP, Sekundaerpraevention',
                        'Herzinsuffizienz mit/ohne reduzierter EF',
                        'Lipidmanagement und CV-Risiko-Score'
                    ]),
                    placeholderPage('Diabetes und Stoffwechsel', [
                        'Typ-2-Diabetes-NVL',
                        'GLP-1-Analoga, SGLT2-Inhibitoren',
                        'Hypoglykaemie-Management',
                        'Diabetisches Fusssyndrom'
                    ]),
                    placeholderPage('Pulmonale Erkrankungen', [
                        'COPD-GOLD-Klassifikation',
                        'Asthma-Stufentherapie GINA',
                        'Inhalations-Schulung in der Praxis',
                        'Exazerbationsmanagement'
                    ]),
                    placeholderPage('Psychische Komorbiditaet', [
                        'Depressionsscreening (PHQ-9)',
                        'Antidepressiva-Auswahl',
                        'Suizidalitaets-Screening',
                        'Schnittstelle zur Psychotherapie'
                    ])
                ],
                quiz: placeholderQuiz('Kapitel 3 — Chronische Erkrankungen')
            },
            {
                id: 'praevention_impfungen',
                title: 'Kapitel 4 — Praevention, Impfungen, Notfaelle',
                summary: 'STIKO-Empfehlungen, Vorsorgeuntersuchungen, Reisemedizin-Grundlagen, Notfaelle in der Praxis.',
                pages: [
                    placeholderPage('Impfungen und STIKO', [
                        'Aktuelles STIKO-Schema (Erwachsene)',
                        'Standard- vs. Indikationsimpfungen',
                        'Auffrischintervalle',
                        'Impfdokumentation und -aufklaerung'
                    ]),
                    placeholderPage('Frueherkennung und Vorsorge', [
                        'Check-up 35 / Hautkrebsscreening',
                        'Krebs-Frueherkennungs-Richtlinie',
                        'Kinder-/Jugend-Vorsorgen (U/J)',
                        'Geriatrisches Assessment'
                    ]),
                    placeholderPage('Reise- und Tropenmedizin', [
                        'Reiseimpfungen nach Zielregion',
                        'Malariaprophylaxe',
                        'Reisediarrhoe-Beratung',
                        'Hoehenmedizin-Basics'
                    ]),
                    placeholderPage('Notfaelle in der Praxis', [
                        'BLS/ALS-Algorithmus aktuell',
                        'Anaphylaxie-Stufen und Adrenalin-Anwendung',
                        'Akuter Asthma-/COPD-Anfall',
                        'Schlaganfall-FAST und Lyse-Zeitfenster'
                    ])
                ],
                quiz: placeholderQuiz('Kapitel 4 — Praevention und Notfaelle')
            }
        ]
    });
})();
