/*
 * Schulung: Master Elektrotechnik — Schwerpunkt Automatisierungstechnik.
 *
 * Status: VORBEREITUNG (status: 'preparation', siehe AGENTS §18.9).
 *   - Modulhandbuch-Recherche steht aus. Generisches Skelett auf Basis
 *     verbreiteter deutscher MA-AT-Curricula (FTEI-Empfehlungen 2023,
 *     VDI/VDE-GMA-Roadmap, IFAC-Curricula).
 *   - Vor Veroeffentlichung der Inhalte ist ein konkretes Modulhandbuch zu
 *     waehlen (z.B. RWTH Aachen "MA-Elektrotechnik mit Vertiefung Auto-
 *     matisierungstechnik", TU Muenchen "MA-EI Spez. Automatisierungs- und
 *     Regelungstechnik", KIT "MA-ETIT Vertiefung Steuer-/Regelungstechnik",
 *     OTH Regensburg "MA-AT").
 *
 * Quellenpool fuer spaetere inhaltliche Pflege (Auswahl):
 *   - Lunze, "Regelungstechnik 1/2", 12./11. Aufl., Springer Vieweg 2023.
 *   - Foellinger, "Regelungstechnik", 13. Aufl., VDE-Verlag 2022.
 *   - Khalil, "Nonlinear Systems", 3rd ed., Pearson 2014.
 *   - Lutz/Wendt, "Taschenbuch der Regelungstechnik", 12. Aufl., Europa-
 *     Lehrmittel 2021.
 *   - Heinrich, "Automatisierung — IT in der Produktion", Hanser 2021.
 *   - John/Tiegelkamp, "SPS-Programmierung mit IEC 61131-3", 5. Aufl.,
 *     Springer 2010 (Standard-Referenz).
 *   - Spong/Hutchinson/Vidyasagar, "Robot Modeling and Control",
 *     2nd ed., Wiley 2020.
 *   - Standards: IEC 61131-3:2013, IEC 61499:2012, IEC 62541 (OPC UA),
 *     IEC 61784 (Feldbus-Profile), DIN EN ISO 10218 / ISO/TS 15066
 *     (Robotersicherheit), VDI/VDE 2206 (Mechatronik-Vorgehensmodell),
 *     ISO 23247 (Digital Twin Manufacturing).
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    function placeholderPage(title, scope) {
        return {
            title: title,
            html: '<p><strong>In Vorbereitung.</strong> Dieses Kapitel ist Teil des Master-ET-Automatisierungstechnik-Skeletts und enthaelt noch keine ausformulierten Lehrseiten. Inhalte werden quellengestuetzt nachgepflegt (siehe AGENTS.md §18.6 / §18.9).</p>'
                + '<p><strong>Geplanter Scope:</strong></p><ul>'
                + scope.map(s => '<li>' + s + '</li>').join('')
                + '</ul>'
                + '<p><strong>Vorgesehene Quellen:</strong> Modulhandbuch der vom Pflegeteam gewaehlten Hochschule, Lunze "Regelungstechnik" 1/2, Foellinger "Regelungstechnik", Khalil "Nonlinear Systems", einschlaegige IEC-/ISO-/VDI-Standards (siehe Datei-Header).</p>'
        };
    }

    function placeholderQuiz(topic) {
        return [{
            q: 'Platzhalter-Frage fuer den Bereich <strong>' + topic + '</strong>. Dieses Quiz wird im Rahmen der Inhalts-Recherche durch &ge;50 quellenbasierte Fragen ersetzt (AGENTS §18.4).',
            options: ['Inhalt in Vorbereitung — Antwort folgt mit Recherche', 'Distraktor 1 (Platzhalter)', 'Distraktor 2 (Platzhalter)', 'Distraktor 3 (Platzhalter)'],
            correct: 0,
            explanation: 'Platzhalter-Erlaeuterung. Bei Veroeffentlichung wird hier der konkrete Quellenanker stehen (Modulhandbuch-Modulnummer, Standard-Paragraph, Lehrbuch-Seite).'
        }];
    }

    window.SCHULUNGEN.list.push({
        id: 'master_et_automation',
        code: 'MA-ET Automation',
        name: 'Master Elektrotechnik — Automatisierungstechnik',
        short: 'MA-ET Automation',
        desc: 'Vertiefungsstudium Elektrotechnik mit Fokus Automatisierungstechnik: fortgeschrittene Regelungstechnik, SPS-Programmierung nach IEC 61131-3 / 61499, Feldbusse und OPC UA, Antriebs- und Leistungselektronik, Industrierobotik, Industrie 4.0 und Digital Twin.',
        status: 'preparation',
        chapters: [
            {
                id: 'control',
                title: 'Kapitel 1 — Fortgeschrittene Regelungstechnik',
                summary: 'Mehrgroessenregelung, Zustandsraumdarstellung, optimale Regelung (LQR), Beobachter (Luenberger, Kalman), nichtlineare Regelung (Lyapunov, Sliding Mode), robuste Regelung (H-infinity).',
                pages: [
                    placeholderPage('Zustandsraum und Mehrgroessensysteme', [
                        'Zustandsraum-Darstellung, Steuer- und Beobachtbarkeit',
                        'Polplatzierung via Ackermann-Formel',
                        'MIMO-Systeme: Entkopplungsregelung'
                    ]),
                    placeholderPage('Optimale Regelung', [
                        'LQR — Riccati-Gleichung, Gewichtungsmatrizen Q/R',
                        'LQG, Trennungsprinzip (Separation Principle)',
                        'Modellpraediktive Regelung (MPC) — Aufbau, Constraints'
                    ]),
                    placeholderPage('Beobachter und Filter', [
                        'Luenberger-Beobachter und Polplatzierung',
                        'Kalman-Filter (linear, EKF, UKF)',
                        'Sensor-Fusion fuer Antriebe und Mobilrobotik'
                    ]),
                    placeholderPage('Nichtlineare und robuste Regelung', [
                        'Lyapunov-Stabilitaet, Lyapunov-Funktionen',
                        'Sliding-Mode-Control, Backstepping, Feedback Linearization',
                        'H-infinity, Mu-Synthese, Mixed-Sensitivity'
                    ])
                ],
                quiz: placeholderQuiz('Fortgeschrittene Regelungstechnik')
            },
            {
                id: 'sps',
                title: 'Kapitel 2 — SPS-Programmierung (IEC 61131-3 / IEC 61499)',
                summary: 'Programmiersprachen IL, ST, LD, FBD, SFC; Programm-Organisations-Einheiten (POU); Funktionsbausteine; Echtzeit-Tasks; verteilte Steuerung mit IEC 61499.',
                pages: [
                    placeholderPage('IEC 61131-3 — Sprachen und Datenmodell', [
                        'Strukturierter Text (ST), Funktionsbausteinsprache (FBD)',
                        'Kontaktplan (KOP), Anweisungsliste (AWL, deprecated 3rd Ed)',
                        'Ablaufsprache (AS, SFC) — Schritte, Transitionen, Aktionen',
                        'Datentypen, Variablen, Geltungsbereiche'
                    ]),
                    placeholderPage('Programm-Organisations-Einheiten', [
                        'Programme, Funktionsbausteine, Funktionen',
                        'Wiederverwendung, Bibliotheken, Encapsulation',
                        'Task-Konfiguration, Scan-Zyklen, Echtzeit-Garantien'
                    ]),
                    placeholderPage('Sicherheitsgerichtete Steuerung', [
                        'IEC 61508 / IEC 62061 — SIL-Klassifizierung',
                        'PLCopen Safety, Safety-Funktionsbloecke',
                        'Diagnose, Fehlerreaktion, Validierung'
                    ]),
                    placeholderPage('Verteilte Steuerung mit IEC 61499', [
                        'Funktionsbloecke, Ereignisse vs. Daten',
                        'Application/Resource/Device-Struktur',
                        'Vergleich zu IEC 61131-3, Industrie-4.0-Eignung'
                    ])
                ],
                quiz: placeholderQuiz('SPS-Programmierung')
            },
            {
                id: 'fieldbus',
                title: 'Kapitel 3 — Feldbusse und OPC UA',
                summary: 'PROFINET, EtherCAT, Modbus, CANopen; OPC UA Pub/Sub und Sicherheitsmodell; Time-Sensitive Networking (TSN); industrielle Kommunikationsanforderungen.',
                pages: [
                    placeholderPage('Klassische und Echtzeit-Feldbusse', [
                        'PROFIBUS DP/PA, Modbus RTU/TCP',
                        'CANopen, DeviceNet, EtherNet/IP',
                        'PROFINET RT/IRT, EtherCAT — Latenz und Jitter'
                    ]),
                    placeholderPage('OPC UA — Architektur', [
                        'Adressraum, Information Modeling, Companion Specs',
                        'Client/Server vs. Pub/Sub',
                        'Security: User-Authentication, Message-Signing, Encryption'
                    ]),
                    placeholderPage('Time-Sensitive Networking (TSN)', [
                        'IEEE 802.1Q-2022 — Time-Aware Shaping',
                        'gPTP (IEEE 802.1AS), Frame Preemption',
                        'Konvergenz IT/OT, Industrial Ethernet 2.0'
                    ]),
                    placeholderPage('Auswahl und Migration', [
                        'Anforderungen: Latenz, Jitter, Topologie, Diagnose',
                        'Bruecken-/Gateway-Architekturen',
                        'Migration Legacy-Bus zu Industrial Ethernet'
                    ])
                ],
                quiz: placeholderQuiz('Feldbusse und OPC UA')
            },
            {
                id: 'drives',
                title: 'Kapitel 4 — Antriebs- und Leistungselektronik',
                summary: 'Drehstrommaschinen, feldorientierte Regelung (FOC), direktes Drehmomentregeln (DTC), Pulsweitenmodulation, Umrichter-Topologien, Servoachsen-Auslegung.',
                pages: [
                    placeholderPage('Asynchron- und Synchronmaschine', [
                        'Park-/Clarke-Transformation',
                        'Ersatzschaltbild, Drehmoment-Schlupf-Kennlinie',
                        'Permanenterregte Synchronmaschinen (PMSM)'
                    ]),
                    placeholderPage('Feldorientierte Regelung (FOC)', [
                        'd/q-Achsen-Regelung, Entkopplung',
                        'Stromregelung mit PI-Reglern',
                        'Sensorlose Verfahren (Back-EMF, HFI)'
                    ]),
                    placeholderPage('Umrichter und Modulation', [
                        '2-Level- und 3-Level-Topologien',
                        'PWM-Verfahren: Sinus-PWM, Raumzeiger-PWM (SVPWM)',
                        'EMV, Filterauslegung, Schaltverluste'
                    ]),
                    placeholderPage('Servoachsen-Auslegung', [
                        'Massentraegheits-Verhaeltnis Last/Motor',
                        'Reglerkaskade Strom-/Drehzahl-/Lageregelung',
                        'Bahnplanung: Trapez, S-Kurve, Jerk-limitiert'
                    ])
                ],
                quiz: placeholderQuiz('Antriebstechnik')
            },
            {
                id: 'robotics',
                title: 'Kapitel 5 — Industrierobotik',
                summary: 'Kinematik (DH-Konvention), Dynamik (Lagrange, Newton-Euler), Bahnplanung, Sensorintegration, Mensch-Roboter-Kollaboration nach ISO/TS 15066, KRL/RAPID-Programmierung.',
                pages: [
                    placeholderPage('Kinematik', [
                        'Denavit-Hartenberg-Konvention, Vorwaerts-Kinematik',
                        'Inverse Kinematik analytisch und numerisch',
                        'Singularitaeten, Konfigurationsraum'
                    ]),
                    placeholderPage('Dynamik und Bahnplanung', [
                        'Lagrange- und Newton-Euler-Formalismus',
                        'Bahnplanung in Gelenk- und Kartesischem Raum',
                        'Glaettung, Kollisionsvermeidung'
                    ]),
                    placeholderPage('Sicherheit und Kollaboration', [
                        'ISO 10218-1/-2, ISO/TS 15066:2016',
                        'Sicherheitsbewerteter ueberwachter Halt, Power-and-Force-Limiting',
                        'Risikobeurteilung kollaborativer Anwendungen'
                    ]),
                    placeholderPage('Programmiersprachen und Frameworks', [
                        'KUKA KRL, ABB RAPID, FANUC TPP, Universal Robots URScript',
                        'ROS / ROS 2, Real-Time mit ros2_control',
                        'Offline-Programmierung, digitaler Zwilling'
                    ])
                ],
                quiz: placeholderQuiz('Industrierobotik')
            },
            {
                id: 'i40',
                title: 'Kapitel 6 — Industrie 4.0 und Digital Twin',
                summary: 'RAMI 4.0 Referenzarchitektur, Verwaltungsschale (Asset Administration Shell), Digital Twin nach ISO 23247, MES/ERP-Integration, OEE-Kennzahlen, Edge/Cloud-Architekturen.',
                pages: [
                    placeholderPage('RAMI 4.0 und Verwaltungsschale', [
                        'DIN SPEC 91345 — RAMI-4.0-Achsen',
                        'Asset Administration Shell (AAS) Spezifikation 2024',
                        'Submodelle, Identifikation, Interoperabilitaet'
                    ]),
                    placeholderPage('Digital Twin', [
                        'ISO 23247 — Digital-Twin-Framework fuer Manufacturing',
                        'Modellfidelitaet, Synchronisation, Anwendungsfaelle',
                        'Tools: Siemens NX MCD, ANSYS Twin Builder, Microsoft Azure DT'
                    ]),
                    placeholderPage('MES / ERP / Edge', [
                        'IEC 62264 / ISA-95 — Hierarchie L0-L4',
                        'OEE-Kennzahlen (Verfuegbarkeit, Leistung, Qualitaet)',
                        'Edge-Computing-Architekturen, Container in OT (K3s, Docker)'
                    ]),
                    placeholderPage('Schnittmengen mit Cyber-Security', [
                        'IEC 62443 in I4.0-Anwendungen',
                        'Identitaeten und Vertrauensanker (PKI, SE)',
                        'Lifecycle-Sicherheit: Inbetriebnahme, Betrieb, Decommission'
                    ])
                ],
                quiz: placeholderQuiz('Industrie 4.0')
            }
        ]
    });
})();
