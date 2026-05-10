/*
 * Fuegetechniken — Maschinenbau / Fertigungstechnik.
 *
 * Quellen (oeffentlich, primaer):
 *   - DIN 8593-0:2003 "Fertigungsverfahren Fuegen — Einordnung, Begriffe"
 *     (sieben Hauptgruppen 8593-1 bis 8593-7).
 *   - DIN EN ISO 4063:2023 "Schweissen, Hartloeten, Weichloeten und
 *     Loetschweissen — Aufstellung der Verfahren und Ordnungsnummern".
 *   - DIN EN ISO 17659:2005 "Schweissen — Mehrsprachige Benennungen fuer
 *     Schweissverbindungen mit Bildern".
 *   - DIN EN ISO 13585:2012 "Hartloeten".
 *   - VDI 2229 "Metallische Pressverbindungen", VDI 2230 "Schraubenverbindungen".
 *   - Fritz/Schulze, "Fertigungstechnik", 12. Aufl., Springer 2018.
 */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'fuegetechniken';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Fügetechniken',
        desc: 'DIN 8593: Sieben Hauptgruppen der Fügetechnik (Zusammensetzen, Füllen, An-/Einpressen, Urformen, Umformen, Stoffschluss, textiles Fügen). Schweißen (MAG/MIG/WIG/UP/LS), Löten, Kleben, Nieten, Schraub- und Pressverbindungen.',
        formulas: `
            <strong>DIN 8593 — Sieben Hauptgruppen Fügen</strong><br>
            <table class="text-xs my-2"><tbody>
                <tr><td class="pr-3"><strong>8593-1</strong></td><td>Zusammensetzen (Auflegen, Einlegen, Einhaengen)</td></tr>
                <tr><td class="pr-3"><strong>8593-2</strong></td><td>Fuellen (Tränken, Imprägnieren)</td></tr>
                <tr><td class="pr-3"><strong>8593-3</strong></td><td>An- und Einpressen (Nieten, Schraubverbindungen, Klemmen)</td></tr>
                <tr><td class="pr-3"><strong>8593-4</strong></td><td>Fügen durch Urformen (Eingiessen, Einbetten in Kunststoff)</td></tr>
                <tr><td class="pr-3"><strong>8593-5</strong></td><td>Fügen durch Umformen (Bördeln, Sicken, Verstemmen, Clinchen)</td></tr>
                <tr><td class="pr-3"><strong>8593-6</strong></td><td>Fügen durch Schweissen, Löten, Kleben (Stoffschluss)</td></tr>
                <tr><td class="pr-3"><strong>8593-7</strong></td><td>Textiles Fügen (Nähen, Knoten — z.B. Faser-Composites)</td></tr>
            </tbody></table>

            <strong>Schweissverfahren (Auszug ISO 4063, Ordnungsnummer in Klammern)</strong><br>
            <ul class="list-disc list-inside text-sm">
                <li><strong>MAG</strong> (135) — Metall-Aktivgas, CO$_2$/Mischgas, Stahl bis hoeherfest.</li>
                <li><strong>MIG</strong> (131) — Metall-Inertgas, Argon/Helium, Aluminium/Buntmetalle.</li>
                <li><strong>WIG / TIG / GTAW</strong> (141) — Wolfram-Inertgas, hochwertige Naehte, Edelstahl/Alu.</li>
                <li><strong>E-Hand / SMAW</strong> (111) — Lichtbogenhandschweissen mit Stabelektrode.</li>
                <li><strong>UP</strong> (12) — Unterpulver, hohe Abschmelzleistung im Schiffbau.</li>
                <li><strong>LS</strong> (52) — Laserstrahl, schmale tiefe Naht (Tiefschweisseffekt).</li>
                <li><strong>EBS</strong> (51) — Elektronenstrahl im Vakuum, dickste Bauteile.</li>
                <li><strong>RP</strong> (21) — Punktschweissen (Widerstand), Karosseriebau.</li>
                <li><strong>RR</strong> (23) — Rollnahtschweissen.</li>
                <li><strong>FSW</strong> (43) — Friction-Stir-Welding (Reibruehren, Aluminium-Verbindungen).</li>
            </ul>

            <strong>Streckenenergie (Linienenergie) beim Schmelzschweissen</strong>
            $$E = \\eta \\cdot \\frac{U \\cdot I}{v}$$
            $E$ in J/mm, $\\eta$ thermischer Wirkungsgrad (WIG $\\approx 0{,}65$, MAG $\\approx 0{,}85$, UP $\\approx 0{,}9$), $U$ in V, $I$ in A, $v$ Schweissgeschwindigkeit in mm/s.<br><br>

            <strong>Lötverfahren (DIN ISO 17672)</strong><br>
            <em>Weichlöten</em>: Arbeitstemperatur $T_\\text{arb} \\leq 450^\\circ\\text{C}$ (Sn-Pb, Sn-Ag, Sn-Cu).<br>
            <em>Hartlöten</em>: $T_\\text{arb} > 450^\\circ\\text{C}$ (Ag-, Cu-, Ni-Basislote).<br>
            <em>Hochtemperaturlöten</em>: $T_\\text{arb} > 900^\\circ\\text{C}$ im Vakuum/Schutzgas, ohne Flussmittel.<br><br>

            <strong>Klebverbindung — Volkersen-Modell (Schubspannungsverteilung)</strong><br>
            Fuer eine einschnittige Ueberlappung mit Klebschicht:
            $$\\tau(x) = \\tau_\\text{max} \\cdot \\frac{\\cosh(\\beta x)}{\\sinh(\\beta L/2)} \\cdot \\frac{\\beta L}{2}$$
            mit $\\beta = \\sqrt{G/(E \\cdot t \\cdot d)}$, $G$ Klebschicht-Schubmodul, $E$ Fuegeteil-E-Modul, $t$ Klebschichtdicke, $d$ Fuegeteildicke. Zeigt: Schubspannung ist <em>nicht</em> gleichverteilt &mdash; Spitzen an den Enden der Ueberlappung.<br><br>

            <strong>Schraubenverbindung — Vorspannkraft (VDI 2230)</strong>
            $$F_M = \\frac{M_A}{0{,}16 \\cdot P + 0{,}58 \\cdot d_2 \\cdot \\mu_G + \\frac{D_\\text{Km}}{2} \\cdot \\mu_K}$$
            $M_A$ Anzugsmoment, $P$ Steigung, $d_2$ Flankendurchmesser, $\\mu_G$/$\\mu_K$ Reibwerte Gewinde/Kopfauflage, $D_\\text{Km}$ mittlerer Kopfauflagedurchmesser.<br><br>

            <strong>Pressverband (Welle-Nabe, DIN 7190)</strong>
            $$p_F = \\frac{|U|}{d_F} \\cdot \\frac{1}{\\frac{1}{E_a}\\left(\\frac{1+Q_a^2}{1-Q_a^2} + \\nu_a\\right) + \\frac{1}{E_i}\\left(\\frac{1+Q_i^2}{1-Q_i^2} - \\nu_i\\right)}$$
            $U$ Uebermass, $d_F$ Fuegedurchmesser, $Q_a = d_F/d_{Aa}$, $Q_i = d_{Ii}/d_F$.<br>
            Uebertragbares Drehmoment: $M_T = \\mu \\cdot p_F \\cdot \\pi \\cdot d_F^2 \\cdot l_F / 2$, $\\mu$ Haftreibung (Stahl/Stahl gepresst $\\approx 0{,}10\\ldots 0{,}14$).<br><br>

            <strong>Nietverbindung (DIN EN ISO 14589, Blindniet)</strong><br>
            Zulaessige Lochleibungs-/Scherspannungen pro Niet: $\\tau_\\text{zul,a} = 0{,}6 \\cdot R_m / S$ (Gleitsicherheit $S \\approx 1{,}5$).<br>
            Mindestrand-Abstand $e \\geq 1{,}5 \\cdot d_0$, Mindest-Nietteilung $p \\geq 3 \\cdot d_0$ ($d_0$ = Nietlochdurchmesser).<br><br>

            <strong>Zerstoerungsfreie Pruefung (ZfP) von Schweissnaehten (DIN EN ISO 17635)</strong><br>
            VT &mdash; Sichtpruefung; PT &mdash; Eindringpruefung (Farbeindringverfahren); MT &mdash; Magnetpulver; UT &mdash; Ultraschall; RT &mdash; Roentgen/Durchstrahlung; ET &mdash; Wirbelstrom.
        `,

        levels: [
            // ============================== LEVEL 1 ==============================
            [
                {
                    q: 'Nenne die sieben Hauptgruppen der Fuegetechnik nach DIN 8593 und ordne <strong>Nieten, Schweissen, Clinchen, Naehen</strong> zu.',
                    h: '8593-3, -5, -6, -7.',
                    s: 'DIN 8593 (Stand 2003) gliedert das Fuegen in sieben Hauptgruppen:<br>'
                        + '<strong>1. Zusammensetzen</strong> (Auflegen, Einlegen, Einhaengen).<br>'
                        + '<strong>2. Fuellen</strong> (Imprägnieren, Tränken).<br>'
                        + '<strong>3. An- und Einpressen</strong> &mdash; <em>Nieten</em>, Schrauben, Klemmen.<br>'
                        + '<strong>4. Fuegen durch Urformen</strong> (Eingiessen, Einbetten).<br>'
                        + '<strong>5. Fuegen durch Umformen</strong> &mdash; <em>Clinchen</em>, Boerdeln, Sicken, Verstemmen.<br>'
                        + '<strong>6. Fuegen durch Stoffschluss</strong> &mdash; <em>Schweissen</em>, Loeten, Kleben.<br>'
                        + '<strong>7. Textiles Fuegen</strong> &mdash; <em>Naehen</em>, Knoten (Faser-Composites).<br>'
                        + 'Die Hauptgruppen unterscheiden sich nach dem physikalischen Fuegeprinzip (formschluessig vs. kraftschluessig vs. stoffschluessig); innerhalb jeder Gruppe gibt es zahlreiche Untergruppen (DIN 8593-1 bis -7).'
                },
                {
                    q: 'Erklaere kurz den Unterschied zwischen <strong>MAG- und WIG-Schweissen</strong>: Schutzgas, Elektrode, typische Anwendung.',
                    h: 'Aktiv- vs. Inertgas, abschmelzend vs. nicht-abschmelzend.',
                    s: '<strong>MAG (Metall-Aktivgas, ISO 4063: 135)</strong>:<br>'
                        + '&bull; Schutzgas: <em>aktiv</em> (CO$_2$ oder Argon-CO$_2$/O$_2$-Mischung), reagiert mit Schmelzbad.<br>'
                        + '&bull; Elektrode: abschmelzender Massivdraht oder Fuelldraht, Drahtvorschub kontinuierlich.<br>'
                        + '&bull; Typische Anwendung: un-/niedriglegierte Stähle, Karosseriebau, Stahlbau, Leichtbau-Massenproduktion.<br>'
                        + '<strong>WIG (Wolfram-Inertgas / TIG, ISO 4063: 141)</strong>:<br>'
                        + '&bull; Schutzgas: <em>inert</em> (reines Argon, Helium oder Ar/He-Mischung).<br>'
                        + '&bull; Elektrode: nicht-abschmelzende Wolfram-Elektrode (mit Lanthan- oder Ceroxid-Dotierung). Zusatzwerkstoff manuell als Schweissstab zugefuehrt.<br>'
                        + '&bull; Typische Anwendung: hochwertige Naehte in Edelstahl, Aluminium, Titan, Wurzellagen, Rohrleitungsbau, Apparatebau.<br>'
                        + '$\\boxed{\\text{MAG = aktiv, abschmelzend; WIG = inert, nicht-abschmelzend}}$'
                },
                {
                    q: 'Was ist der Unterschied zwischen <strong>Weichloeten und Hartloeten</strong>, und wo liegt die Temperaturgrenze nach DIN ISO 17672?',
                    h: '450 °C.',
                    s: 'Die Norm DIN ISO 17672 (bzw. der ältere Standard DIN 8505) zieht die Grenze bei der <strong>Solidustemperatur des Lots</strong>:<br>'
                        + '<strong>Weichloeten:</strong> $T_\\text{liquidus,Lot} \\leq 450^\\circ\\text{C}$.<br>'
                        + '&bull; Lote: Sn-Pb (klassisch, heute fuer Konsumelektronik durch RoHS verboten), Sn-Ag-Cu (SAC305), Sn-Cu, Sn-Bi.<br>'
                        + '&bull; Anwendung: Elektronik (Reflow, Wellenloeten), Sanitärinstallation Cu-Rohr, Karosseriespachtelung historisch.<br>'
                        + '<strong>Hartloeten:</strong> $T_\\text{liquidus,Lot} > 450^\\circ\\text{C}$.<br>'
                        + '&bull; Lote: Ag-Basis (z.B. Ag145), Cu-Zn-Lote (Messinglot), Cu-P, Ni-Basis (Hochtemperatur).<br>'
                        + '&bull; Anwendung: Hartmetall-Werkzeuge (Wendeschneidplatten auf Stahl), Wärmetauscher, Fahrradrahmen historisch.<br>'
                        + '<strong>Hochtemperaturloeten</strong> (Sondergruppe): $T_\\text{arb} > 900^\\circ\\text{C}$, im Vakuum oder Schutzgas, <em>ohne</em> Flussmittel &mdash; z.B. Plattenwärmetauscher Edelstahl.<br>'
                        + 'Beim Loeten wird der Grundwerkstoff <em>nicht</em> aufgeschmolzen &mdash; das ist der Unterschied zum Schweissen.'
                },
                {
                    q: 'Welche Vorteile hat eine <strong>Klebverbindung</strong> gegenueber einer Schraubverbindung, und welcher zentrale Nachteil schraenkt den Einsatz ein?',
                    h: 'Spannungsverteilung, Mischbau &mdash; Temperatur/Kriechen.',
                    s: '<strong>Vorteile:</strong><br>'
                        + '&bull; Flaechige Lasteinleitung &mdash; keine Lochschwaechung, keine Spannungsspitzen wie bei Bohrungen.<br>'
                        + '&bull; <em>Mischbau</em> moeglich: Aluminium an CFK, Stahl an Glas, Metall an Kunststoff &mdash; ohne Kontaktkorrosion (bei isolierender Klebschicht).<br>'
                        + '&bull; Kein Verzug durch Wärmeeinbringen (vs. Schweissen).<br>'
                        + '&bull; Daempfung von Vibrationen, Abdichtung gegen Feuchtigkeit.<br>'
                        + '&bull; Geringere Bauteilmasse (kein Verbindungselement).<br>'
                        + '<strong>Zentraler Nachteil:</strong> begrenzte Temperatur- und Alterungsbestaendigkeit. Typische Konstruktionsklebstoffe (Epoxy, PUR, MS-Polymer) sind bis $\\approx 80\\ldots 150^\\circ\\text{C}$ einsetzbar; darueber Festigkeitsabfall, Kriechen, Hydrolyse. Hochtemperatur-Klebstoffe (Polyimide, Bismaleimide) bis $\\approx 250^\\circ\\text{C}$, aber teuer und sproede.<br>'
                        + 'Weitere Einschraenkungen: Aushaertezeit, hohe Anforderung an Oberflaechenvorbehandlung (Reinigung, Aktivierung), schwer zerstörungsfrei prüfbar (Klebschichtdicke!).'
                },
                {
                    q: 'Welche zwei Funktionsprinzipien stehen hinter einer Schraubverbindung &mdash; und welche zentrale physikalische Groesse muss bei der Montage erreicht werden, damit die Verbindung dauerhaft halt?',
                    h: 'Vorspannkraft, Reibschluss.',
                    s: 'Eine Schraubverbindung wirkt typischerweise <strong>kraftschluessig</strong>:<br>'
                        + '<strong>1. Vorspannkraft $F_M$:</strong> Beim Anziehen wird die Schraube elastisch gedehnt, die Fuegeteile elastisch zusammengedrueckt. Die so aufgebaute Klemmkraft $F_M$ ist <em>Voraussetzung</em> fuer alle weiteren Funktionen.<br>'
                        + '<strong>2. Reibschluss in der Trennfuge:</strong> Die durch $F_M$ erzeugte Normalkraft erlaubt die Uebertragung von <em>Querkräften</em> ueber Reibung ($F_R = \\mu \\cdot F_M$, typische Reibwerte $\\mu \\approx 0{,}1\\ldots 0{,}5$).<br>'
                        + 'Die <strong>Vorspannkraft $F_M$</strong> muss laut VDI 2230 mindestens dem 1,2- bis 1,5-fachen der maximalen Betriebslast entsprechen, damit:<br>'
                        + '&bull; die Trennfuge nie aufklafft (Dichtigkeit, kein Spiel),<br>'
                        + '&bull; die Schraube nicht durch Schwingungen losgeruettelt wird,<br>'
                        + '&bull; ueberlagerte dynamische Lasten zu kleinen Spannungsamplituden in der Schraube fuehren (Dauerfestigkeit).<br>'
                        + 'Die Vorspannkraft wird ueber das Anzugsmoment $M_A$ erzeugt; nur ca. 10&ndash;15 % von $M_A$ wandern in die Vorspannung, der Rest wird in Gewinde- und Kopfreibung verbraucht.'
                },
                {
                    q: 'Welche zerstoerungsfreien Pruefverfahren (ZfP) eignen sich fuer eine Schweissnaht im <strong>Inneren</strong> eines dickwandigen Stahlrohrs &mdash; und welche zwei verbreiteten Verfahren werden hierfuer typischerweise eingesetzt?',
                    h: 'Volumenpruefung: UT, RT.',
                    s: 'Volumenfehler (Poren, Schlackeneinschluesse, Wurzelfehler) im Nahtinneren erkennen <em>nicht</em> die Oberflaechenverfahren VT/PT/MT &mdash; sie brauchen ein Verfahren, das in den Werkstoff eindringt:<br>'
                        + '<strong>UT &mdash; Ultraschallpruefung (DIN EN ISO 17640):</strong><br>'
                        + '&bull; Schallkopf koppelt 2&ndash;10 MHz Pulse ueber Koppelmittel (Gel, Wasser) ein.<br>'
                        + '&bull; Echos von Diskontinuitaeten werden als A/B/C-Bild dargestellt; in moderner Praxis Phased-Array (PA) und TOFD (Time-of-Flight-Diffraction).<br>'
                        + '&bull; Vorteil: keine ionisierende Strahlung, geeignet fuer dicke Wandstaerken &gt; 50 mm.<br>'
                        + '<strong>RT &mdash; Durchstrahlungspruefung (DIN EN ISO 17636):</strong><br>'
                        + '&bull; Roentgen- (bis ca. 60 mm Stahl) oder Gammastrahlung (Ir-192, Co-60, fuer dickere Wandstaerken).<br>'
                        + '&bull; Film oder digitaler Detektor, Bildguete nach Bildguete-Indikatoren (DIN EN ISO 19232).<br>'
                        + '&bull; Vorteil: dokumentierbares Bild, gute Detektion volumiger Fehler. Nachteil: Strahlenschutz, lange Belichtungszeiten, schlecht fuer flaechige Risse senkrecht zum Strahl.<br>'
                        + 'Fuer kritische Druckbehaelter werden RT und UT haeufig <em>kombiniert</em> eingesetzt; die Pruefklasse (B, C nach DIN EN ISO 17635) regelt die geforderte Empfindlichkeit.'
                }
            ],

            // ============================== LEVEL 2 ==============================
            [
                {
                    q: 'Berechne die <strong>Streckenenergie</strong> beim MAG-Schweissen einer Naht mit $U = 25\\,\\text{V}$, $I = 240\\,\\text{A}$, $v = 5\\,\\text{mm/s}$ und $\\eta = 0{,}85$. Was sagt der Wert ueber den waermebeeinflussten Bereich (WEZ) aus?',
                    h: '$E = \\eta \\cdot UI/v$.',
                    s: 'Streckenenergie (Linienenergie) nach DIN EN ISO 17659:<br>'
                        + '$$E = \\eta \\cdot \\frac{U \\cdot I}{v} = 0{,}85 \\cdot \\frac{25\\,\\text{V} \\cdot 240\\,\\text{A}}{5\\,\\text{mm/s}}$$'
                        + '$$E = 0{,}85 \\cdot \\frac{6000\\,\\text{W}}{5\\,\\text{mm/s}} = 1020\\,\\text{J/mm}$$'
                        + '$\\boxed{E \\approx 1{,}0\\,\\text{kJ/mm}}$<br><br>'
                        + '<strong>WEZ-Bedeutung:</strong> Die Streckenenergie korreliert direkt mit der Breite der waermebeeinflussten Zone (WEZ) und der Abkuehlzeit $t_{8/5}$ (Zeit von 800&deg;C auf 500&deg;C). Hohe Streckenenergie $\\Rightarrow$ langsame Abkuehlung $\\Rightarrow$ groesserer WEZ, weicheres Gefuege (Ferrit/Perlit), reduziertes Risiko von Aufhaertung/Risse, aber auch reduzierte Festigkeit und groesserer Verzug.<br>'
                        + 'Hochfeste Feinkornstaehle (z.B. S690QL, S960QL) erfordern $E$-Begrenzungen (typisch $0{,}5\\ldots 1{,}5\\,\\text{kJ/mm}$), damit das Vergueten nicht durch zu hohen Waermeeintrag aufgehoben wird (DIN EN 1011-2). Der Wert hier ist im oberen erlaubten Bereich fuer S690QL.'
                },
                {
                    q: 'Beschreibe das <strong>Volkersen-Modell</strong> der Klebverbindung. Wo treten die maximalen Schubspannungen auf, und welche konstruktive Konsequenz folgt fuer die Auslegung der Ueberlappungslaenge?',
                    h: 'Schubspannungsspitzen an den Enden der Ueberlappung.',
                    s: 'Das Volkersen-Modell (1938) ist die <strong>einfachste analytische Loesung</strong> fuer die Schubspannungsverteilung in einer einschnittigen Klebverbindung mit symmetrischer Belastung. Es nimmt linear-elastische Fuegeteile, eine reine Schubschicht (Klebstoff) und vernachlaessigt Biegeeffekte an.<br>'
                        + 'Resultat: Schubspannung ist <em>nicht</em> konstant, sondern haengt mit $\\cosh$ vom Ort ab:<br>'
                        + '$$\\tau(x) = \\frac{F\\beta}{2b\\sinh(\\beta L/2)} \\cdot \\cosh(\\beta x)$$'
                        + 'mit $\\beta = \\sqrt{2G/(E \\cdot t_F \\cdot d)}$ (Klebschicht-Schubmodul $G$, Fuegeteil-E-Modul $E$, Fuegeteildicke $d$, Klebschichtdicke $t_F$, Ueberlappungslaenge $L$, Breite $b$).<br>'
                        + '<strong>Maxima an den Ueberlappungs-Enden</strong> ($x = \\pm L/2$); in der Mitte fast lastfrei.<br>'
                        + '$$\\frac{\\tau_\\text{max}}{\\tau_\\text{mittel}} = \\frac{\\beta L/2}{\\tanh(\\beta L/2)}$$'
                        + 'Fuer $\\beta L \\to \\infty$ (sehr lange Ueberlappung) waechst dieser Quotient ohne Grenze &mdash; <strong>eine doppelt so lange Ueberlappung verdoppelt die uebertragbare Last NICHT</strong>. Optimum: $\\beta L \\approx 2\\ldots 4$, danach bringt mehr Laenge kaum noch Tragfaehigkeit, nur mehr Material.<br>'
                        + 'Konstruktive Konsequenz: Statt &laquo;laenger&raquo; lieber &laquo;breiter&raquo; oder &laquo;mehrschnittig&raquo; (z.B. Doppellaschenstoss). Schaeftungen (Skarf-Joints) verteilen die Last gleichmaessiger.<br>'
                        + 'Verfeinerungen des Modells: Goland/Reissner (mit Biegung), Hart-Smith (plastische Klebschicht).'
                },
                {
                    q: 'Eine Stahlwelle wird in eine Stahlnabe per Pressverband gefuegt. Gegeben: $d_F = 60\\,\\text{mm}$, $l_F = 80\\,\\text{mm}$, Uebertragungs-Drehmoment $M_T = 1500\\,\\text{Nm}$, Haftreibwert $\\mu = 0{,}12$, Sicherheit $S = 1{,}5$. Welcher minimale Fugendruck $p_F$ ist noetig?',
                    h: '$M_T = \\mu \\, p_F \\, \\pi \\, d_F^2 \\, l_F / 2$.',
                    s: 'Aus DIN 7190-1, Drehmomentuebertragung Pressverband:<br>'
                        + '$$M_T = \\mu \\cdot p_F \\cdot A_F \\cdot \\frac{d_F}{2} = \\mu \\cdot p_F \\cdot \\pi \\cdot d_F \\cdot l_F \\cdot \\frac{d_F}{2} = \\frac{\\mu \\cdot p_F \\cdot \\pi \\cdot d_F^2 \\cdot l_F}{2}$$'
                        + 'Aufloesen nach $p_F$ und Sicherheit anwenden ($M_\\text{erf} = S \\cdot M_T$):<br>'
                        + '$$p_F = \\frac{2 \\cdot S \\cdot M_T}{\\mu \\cdot \\pi \\cdot d_F^2 \\cdot l_F}$$'
                        + '$$p_F = \\frac{2 \\cdot 1{,}5 \\cdot 1500\\,\\text{Nm}}{0{,}12 \\cdot \\pi \\cdot (0{,}060\\,\\text{m})^2 \\cdot 0{,}080\\,\\text{m}}$$'
                        + '$$p_F = \\frac{4500\\,\\text{Nm}}{0{,}12 \\cdot 3{,}1416 \\cdot 0{,}0036\\,\\text{m}^2 \\cdot 0{,}080\\,\\text{m}} = \\frac{4500}{1{,}086 \\cdot 10^{-4}}\\,\\text{Pa}$$'
                        + '$$\\boxed{p_F \\approx 41{,}4\\,\\text{MPa}}$$'
                        + 'Plausibilitaet: Stahl C45 Fliessgrenze $R_p \\approx 340\\,\\text{MPa}$ &mdash; der Fugendruck liegt deutlich darunter, aber die <em>Vergleichsspannung in der Nabe</em> (Lame-Gleichung) kann je nach Wandstaerke deutlich groesser sein und muss separat geprueft werden (DIN 7190-1 §6).<br>'
                        + 'Aus $p_F$ folgt das benoetigte Uebermass via Lame; das ist die naechste Berechnung in der Auslegungs-Kette.'
                },
                {
                    q: 'Erklaere die <strong>Reibungs-Reibverschleiss-Korrosion (Passungsrost / Fretting Corrosion)</strong> in Pressverbaenden und Schraubverbindungen. Welche konstruktive Massnahme reduziert sie?',
                    h: 'Mikrobewegungen, oxidativer Verschleiss.',
                    s: '<strong>Mechanismus:</strong> Bei dynamisch belasteten Verbindungen treten in der Trennfuge sehr kleine relative Bewegungen (Mikro-Slip, $\\Delta s \\approx 1\\ldots 100\\,\\mu\\text{m}$) auf, ohne dass es zu makroskopischem Gleiten kommt. Diese Mikrobewegungen reissen die schuetzende Oxidschicht auf, Frischmetall oxidiert sofort wieder &mdash; ein Kreislauf aus Adhaesion, Abrieb und Oxidation entsteht. Charakteristisch: rotbrauner (Stahl) bzw. schwarzer (Aluminium) Abriebstaub in der Fuge.<br>'
                        + 'Folgen:<br>'
                        + '&bull; Materialabtrag, lokales Spiel &mdash; Vorspannungsverlust.<br>'
                        + '&bull; Anrisse durch Kerbwirkung der Reibverschleiss-Mulden &mdash; <em>Reibdauerbruch</em> (Fretting Fatigue), oft am Pressverband-Rand bei rotierender Welle.<br>'
                        + '&bull; Vermeintlich &laquo;ploetzliche&raquo; Brueche unter Nennspannungen weit unter Dauerfestigkeit.<br>'
                        + '<strong>Konstruktive Gegenmassnahmen:</strong><br>'
                        + '&bull; <em>Hoehere Vorspannung / Fugendruck</em> &mdash; verhindert Mikro-Slip.<br>'
                        + '&bull; <em>Entlastungskerben oder gefraeste Kantenruecknahmen</em> am Pressverband-Rand reduzieren Spannungsspitze.<br>'
                        + '&bull; <em>Reibschicht-Optimierung:</em> Molybdaen-Disulfid-Pasten, MoS$_2$-Festschmierstoff, oder gerade umgekehrt erhoehter Reibwert (Diamantpartikel-Folien, Stridon).<br>'
                        + '&bull; <em>Festigkeitssteigernde Oberflaechenbehandlung</em>: Kugelstrahlen (Druckeigenspannungen), Nitrieren, Oberflaechenharten.<br>'
                        + '&bull; <em>Material-Paarung:</em> identische Werkstoffpaarung vermeiden (Adhaesionsneigung), z.B. gehaerteter Stahl gegen vergueteten Stahl statt Stahl gegen Stahl gleicher Haerte.<br>'
                        + 'Quelle: Niemann/Winter "Maschinenelemente Bd. 1", DIN 7190-1, FKM-Richtlinie.'
                },
                {
                    q: 'Was ist <strong>Friction-Stir-Welding (FSW, ISO 4063: 43)</strong>, und welche Vorteile hat es gegenueber konventionellem Schmelzschweissen bei Aluminium-Konstruktionen?',
                    h: 'Reibruehrschweissen, festphasig.',
                    s: 'Friction-Stir-Welding (FSW), erfunden 1991 vom TWI (UK), ist ein <strong>festphasiges Schweissverfahren</strong>: ein rotierendes, profiliertes Werkzeug (Schulter + Stift) wird mit hoher Andruckkraft in den Stoss gepresst und entlang der Naht gefuehrt. Der Reibwaerme-Eintrag bringt das Material auf typisch 80&ndash;90 % der Solidustemperatur (bei Aluminium ca. $450\\ldots 500^\\circ\\text{C}$), <em>ohne</em> es aufzuschmelzen. Das Material wird vom Stift plastisch durchmischt und hinter dem Werkzeug konsolidiert.<br>'
                        + '<strong>Vorteile gegenueber MIG/WIG-Schmelzschweissen bei Aluminium:</strong><br>'
                        + '&bull; <em>Keine Heisseise</em> (Heissrissempfindlichkeit von 6xxx- und 7xxx-Legierungen entfaellt).<br>'
                        + '&bull; <em>Geringer Verzug</em> &mdash; Waermeeintrag nur lokal, keine Schmelzkontraktion.<br>'
                        + '&bull; <em>Hohe Festigkeit</em> der Naht: 70&ndash;90 % der Grundwerkstoff-Festigkeit, bei aushaertbaren Legierungen (2xxx, 7xxx) deutlich besser als WIG.<br>'
                        + '&bull; <em>Keine Schutzgase, kein Zusatzwerkstoff, keine Spritzer</em> &mdash; saubere und reproduzierbare Prozesse.<br>'
                        + '&bull; <em>Verbinden unschmelzbarer Paarungen:</em> Al/Cu, Al/Mg, Al/Stahl &mdash; ohne sproede intermetallische Phasen aus dem Schmelzbad.<br>'
                        + '<strong>Anwendungsfelder:</strong> Eisenbahn-Wagenkasten (z.B. Hitachi A-Train), Schiffbau (Aluminium-Decks), Luftfahrt (Eclipse-500-Rumpf), E-Auto-Batteriewannen (Audi e-tron, Tesla).<br>'
                        + '<strong>Limitierungen:</strong> Hohe Andruckkraefte ($\\sim 20\\ldots 100\\,\\text{kN}$) erfordern stabile Maschinen; nur lineare oder gefraeste Bahnen, keine 3D-freihand. Endloch des Stiftes bleibt am Naht-Ende (Loesung: Run-Off-Tab oder Retractable-Pin-Tool).<br>'
                        + 'Quelle: ISO 25239-1 bis -5 "Reibruehrschweissen Aluminium", Mishra/Ma "Friction stir welding and processing", Mater. Sci. Eng. R 50 (2005) 1&ndash;78.'
                },
                {
                    q: 'Wie funktioniert das <strong>Clinchen (Druckfuegen, DIN 8593-5)</strong>, und in welchen Konstruktionen verdraengt es zunehmend Punktschweissen?',
                    h: 'Kaltumformung, Halbhohl- vs. Vollstempel.',
                    s: 'Clinchen (auch &laquo;Druckfuegen&raquo; oder &laquo;Tox-Clinchen&raquo;) ist ein <strong>kaltumformendes Fuegeverfahren</strong> ohne Hilfsfuegeteil und ohne Waermeeintrag:<br>'
                        + '&bull; Stempel (Punze) druckt die uebereinanderliegenden Bleche in eine Matrize.<br>'
                        + '&bull; Das Material fliesst unter dem Stempel zunaechst nach unten (Tiefziehphase), dann nach aussen (Stauchphase) bis zum Anschlag in der Matrize.<br>'
                        + '&bull; Es entsteht ein <strong>Hinterschnitt</strong> &mdash; das oberseitige Blech haelt das unterseitige formschluessig.<br>'
                        + 'Werkzeugvarianten: Rundpunkt (klassisch, axialsymmetrisch) und Rechteckpunkt (rissfreier bei hohen Festigkeiten); Vollstempel (mit fester Matrize) und Halbhohlstempel (mit beweglichen Lamellen, fuer dickere Bleche).<br>'
                        + '<strong>Vorteile vs. Punktschweissen:</strong><br>'
                        + '&bull; Mischbau: Stahl + Aluminium, Stahl + Kunststoff, beschichtete Bleche &mdash; kein Schmelzbad, keine Spritzer auf Beschichtungen.<br>'
                        + '&bull; Keine elektromagnetische Belastung, keine Stromzufuehrung &mdash; geeignet fuer Karosseriebau mit Hochvoltkomponenten in der Naehe.<br>'
                        + '&bull; Keine Schweissrauche, keine Schutzgase, geringer Energiebedarf.<br>'
                        + '&bull; Dichtfaehigkeit (mit Klebstoffkombination) und Korrosionsschutz: Beschichtungen bleiben unbeschaedigt.<br>'
                        + '<strong>Nachteile:</strong><br>'
                        + '&bull; Geringere Scherzugfestigkeit pro Punkt als Punktschweissen ($\\approx 60$&ndash;80 % der RP-Festigkeit) &mdash; mehr Punkte erforderlich.<br>'
                        + '&bull; Sichtbarer Punkt von einer Seite (Designeinschraenkung).<br>'
                        + '&bull; Hohe Werkzeug-Anpressdrucke ($\\sim 50\\ldots 100\\,\\text{kN}$) &mdash; schwere Zangen.<br>'
                        + '<strong>Anwendung:</strong> Multi-Material-Karosserie (z.B. Audi-Spaceframe-ASF), Kuehlgeraete, Lueftungstechnik.<br>'
                        + 'Verwandte Verfahren: <em>Stanznieten</em> (mit Halbhohlniet als Hilfsfuegeteil) und <em>Vollstanznieten</em> &mdash; uebertragen hoehere Lasten als reines Clinchen.'
                }
            ],

            // ============================== LEVEL 3 ==============================
            [
                {
                    q: 'Eine <strong>einschnittige Klebverbindung</strong> aus 2 mm Aluminium-Blechen ($E = 70\\,\\text{GPa}$) mit Epoxy-Klebschicht ($G = 1{,}2\\,\\text{GPa}$, $t_F = 0{,}2\\,\\text{mm}$, $L = 25\\,\\text{mm}$, $b = 25\\,\\text{mm}$) wird mit $F = 5\\,\\text{kN}$ belastet. Berechne den Volkersen-Faktor $\\beta L$ und die Spannungsspitze $\\tau_\\text{max}$ am Ueberlappungsende.',
                    h: '$\\beta = \\sqrt{2G/(E\\,t_F\\,d)}$.',
                    s: '<strong>Schritt 1 &mdash; Volkersen-Parameter $\\beta$:</strong><br>'
                        + '$$\\beta = \\sqrt{\\frac{2G}{E \\cdot t_F \\cdot d}} = \\sqrt{\\frac{2 \\cdot 1{,}2 \\cdot 10^9}{70 \\cdot 10^9 \\cdot 0{,}0002 \\cdot 0{,}002}}$$'
                        + '$$\\beta = \\sqrt{\\frac{2{,}4 \\cdot 10^9}{2{,}8 \\cdot 10^4}} = \\sqrt{8{,}57 \\cdot 10^4}\\,\\text{m}^{-1} \\approx 293\\,\\text{m}^{-1}$$'
                        + '$$\\beta L = 293 \\cdot 0{,}025 = 7{,}3$$'
                        + '<strong>Schritt 2 &mdash; mittlere Schubspannung:</strong><br>'
                        + '$$\\tau_\\text{m} = \\frac{F}{b \\cdot L} = \\frac{5000\\,\\text{N}}{0{,}025 \\cdot 0{,}025\\,\\text{m}^2} = 8{,}0\\,\\text{MPa}$$'
                        + '<strong>Schritt 3 &mdash; Spannungsspitze am Ueberlappungsende:</strong><br>'
                        + 'Das Volkersen-Verhaeltnis ist:'
                        + '$$\\frac{\\tau_\\text{max}}{\\tau_\\text{m}} = \\frac{\\beta L/2}{\\tanh(\\beta L/2)} = \\frac{3{,}65}{\\tanh(3{,}65)}$$'
                        + '$\\tanh(3{,}65) \\approx 0{,}9986$, also:<br>'
                        + '$$\\frac{\\tau_\\text{max}}{\\tau_\\text{m}} \\approx \\frac{3{,}65}{0{,}9986} \\approx 3{,}65$$'
                        + '$$\\boxed{\\tau_\\text{max} \\approx 3{,}65 \\cdot 8{,}0\\,\\text{MPa} \\approx 29{,}2\\,\\text{MPa}}$$'
                        + '<strong>Beurteilung:</strong> Typische Epoxy-Konstruktionsklebstoffe (DELO Pur, 3M Scotch-Weld DP460) haben Schubfestigkeit $\\tau_B \\approx 20\\ldots 35\\,\\text{MPa}$ &mdash; die Verbindung liegt am Limit. Eine Verlaengerung der Ueberlappung von 25 auf 50 mm reduziert $\\tau_\\text{max}$ <em>nicht</em> proportional, weil $\\tanh(\\beta L /2)\\to 1$ schon erreicht ist; sinnvoller waere eine breitere oder doppellaschige Verbindung, oder ein zaeherer Klebstoff mit niedrigerem $G$.'
                },
                {
                    q: 'Erklaere den <strong>Wasserstoffinduzierten Risskorrosion / Wasserstoff-Versproedung</strong> bei hochfesten Schraubenstaehlen (10.9, 12.9). Welche konstruktiven und prozesstechnischen Massnahmen verlangt die VDI 2230 in Verbindung mit DIN EN ISO 4042?',
                    h: 'Diffundierender Wasserstoff bei galvanischen Beschichtungen.',
                    s: '<strong>Mechanismus:</strong> Hochfeste Staehle (Festigkeitsklasse 10.9: $R_m \\geq 1040\\,\\text{MPa}$, 12.9: $R_m \\geq 1220\\,\\text{MPa}$) sind anfaellig fuer Wasserstoff-induzierte Spannungsrisskorrosion (HISC, hydrogen-induced stress cracking). Diffundierender atomarer Wasserstoff sammelt sich an Korngrenzen, Versetzungen und Inklusionen, fuehrt zu lokal stark reduzierter Bruchzaehigkeit und kann <em>Stunden bis Wochen nach der Montage</em> spontane Brueche ausloesen &mdash; oft Spaltbruch (intergranular), ohne Vorankuendigung.<br>'
                        + 'Quellen des Wasserstoffs:<br>'
                        + '&bull; <em>Galvanische Verzinkung</em> (kathodischer Prozess) &mdash; bringt H in das Schraubgefuege ein.<br>'
                        + '&bull; Beize/Saeurereinigung vor Beschichtung.<br>'
                        + '&bull; Korrosion in feuchter Umgebung.<br>'
                        + '<strong>VDI 2230 / DIN EN ISO 4042 Massnahmen:</strong><br>'
                        + '<strong>1. Wasserstoff-Effusionsgluehen</strong> (Tempern) nach DIN EN ISO 4042 Abschnitt 7: bei $190\\ldots 230^\\circ\\text{C}$ fuer mind. 4 Stunden, innerhalb $\\leq 4$ h nach galvanischer Behandlung. Treibt diffundierenden Wasserstoff aus.<br>'
                        + '<strong>2. Vorzug nicht-galvanischer Beschichtungen</strong> bei 10.9/12.9: Zink-Lamellen-Beschichtungen (Dacromet, Geomet, Delta-Tone) oder mechanische Verzinkung &mdash; bringen keinen H ein.<br>'
                        + '<strong>3. Vermeidung Festigkeitsklasse 12.9</strong> in feuchten/korrosiven Umgebungen, sofern moeglich; alternativ 10.9 vorziehen.<br>'
                        + '<strong>4. Konstruktive Vermeidung von Spaltkorrosion</strong> (Drainage, abgedichteter Schraubenkopf).<br>'
                        + '<strong>5. Werkstoffwahl:</strong> bevorzugt Staehle mit hohem $R_p/R_m$-Verhaeltnis und feinem Gefuege; Mn- und P-arme Schmelzen (Korngrenzen-Versproedung minimieren).<br>'
                        + '<strong>Pruefung:</strong> SP-/PT-Pruefung kann nicht alle HISC-Risse finden &mdash; lieber prozessseitig vermeiden.<br>'
                        + '<strong>Hinweis:</strong> Norm DIN EN ISO 15330 beschreibt eine genormte Pruefung (Belastungsversuch nach Beschichtung) zur Wasserstoffversproedungs-Empfindlichkeit; bei kritischen Anwendungen Pflicht.<br>'
                        + 'Historische Schadensfaelle: Bay-Bridge-Bolts San Francisco 2013, mehrere Windkraftanlagen-Naben.'
                },
                {
                    q: 'Analysiere die <strong>Eigenspannungsverteilung</strong> in einer Mehrlagen-MAG-Schweissung an dickem Stahl (Wandstaerke $> 30\\,\\text{mm}$). Welche Ursache liegt zugrunde, welche Folgen hat sie fuer die Bauteilfestigkeit, und welche typischen Massnahmen reduzieren sie?',
                    h: 'Schrumpfung, Behinderung &mdash; Wärmebehandlung.',
                    s: '<strong>Ursache:</strong> Beim Schweissen erhitzt sich das Material lokal in der Naht und in der WEZ auf bis zu $1500^\\circ\\text{C}$. Beim Abkuehlen schrumpft das Schweissgut gegen den noch kalten Grundwerkstoff; die thermische Kontraktion wird durch die starre Umgebung <strong>behindert</strong> (constraint), das Schweissgut wird elastisch-plastisch gedehnt. Nach Erkalten verbleibt eine <strong>Zugspannung in Naht und WEZ</strong>, kompensiert durch Druckeigenspannungen weiter aussen im Bauteil. Bei mehrlagigen Naehten kommt fuer jede Lage ein zusaetzlicher Schrumpfschritt hinzu; die letzte Decklage erzeugt typischerweise die hoechsten Eigenspannungen, weil sie auf bereits weitgehend ausgehaertetes Material schrumpft.<br>'
                        + 'Groessenordnung: Zugeigenspannungen in der Naht erreichen <strong>$0{,}8\\ldots 1{,}0 \\cdot R_e$</strong> des Schweissguts (ca. $400\\ldots 500\\,\\text{MPa}$ bei S355).<br>'
                        + '<strong>Folgen:</strong><br>'
                        + '&bull; <em>Reduzierte Schwingfestigkeit</em>: Zugeigenspannungen ueberlagern die Lastamplitude und verschieben das Mittelspannungsniveau zum Bauteilversagen hin.<br>'
                        + '&bull; <em>Spannungsrisskorrosion</em> in chloridhaltigen Medien (austenitischer Edelstahl) und in H$_2$S-haltigen Medien (Sour-Service-Anwendungen, NACE MR0175).<br>'
                        + '&bull; <em>Verzug</em> nach Bearbeitung: spannungsrelaxiertes Material verzieht sich nachtraeglich.<br>'
                        + '&bull; <em>Kerbwirkung mit Schweissfehler</em>: Eigenspannungen senken die Schwellwerte fuer Sproedbruch und Risswachstum.<br>'
                        + '<strong>Massnahmen (DIN EN 1011-2, DIN EN 13445-4):</strong><br>'
                        + '<strong>1. Spannungsarmgluehen</strong> (Stress Relief, SR / PWHT): $580\\ldots 680^\\circ\\text{C}$ fuer 1&ndash;4 h, langsame Abkuehlung. Reduziert Eigenspannungen auf $\\approx 20\\ldots 30\\,\\%$ des Ausgangsniveaus.<br>'
                        + '<strong>2. Vorwaermen</strong> auf $100\\ldots 250^\\circ\\text{C}$ (je Werkstoff/Wandstaerke nach EN 1011-2 Abschnitt 16): reduziert Abkuehlrate, verhindert Aufhaertung und reduziert auch Eigenspannungen geringfuegig.<br>'
                        + '<strong>3. Schweissfolge optimieren</strong>: symmetrisches Mehrlagen-Schweissen, Pilgerschritt-Methode, Gegenschritt-Schweissen.<br>'
                        + '<strong>4. Mechanische Massnahmen</strong>: Hammern (HiFiT, Ultrasonic Impact Treatment UIT), Kugelstrahlen, Strecken &mdash; bringen <em>Druck</em>eigenspannungen lokal an Nahtuebergaengen ein und kompensieren die Zugspannungen oberflaechig.<br>'
                        + '<strong>5. Niedertemperatur-PWHT</strong>: Vibrations-Stress-Relief (VSR) oder lokales induktives PWHT &mdash; Alternative bei zu grossen Bauteilen.<br>'
                        + 'Bei Druckbehaeltern und Pipelines schreibt der ASME-Code (Section VIII) bzw. DIN EN 13445 ab definierten Wandstaerken (typ. $\\geq 35\\,\\text{mm}$ unbehandelt) zwingend PWHT vor.'
                },
                {
                    q: 'Welche Versagensformen sind in einer <strong>einschnittigen Schraubverbindung</strong> nach VDI 2230 zu pruefen, und welche der Anstrengungen begrenzt typischerweise eine ermuedungsbeanspruchte Schraube zuerst?',
                    h: 'Sechs Hauptnachweise; Dauerfestigkeit der Schraube.',
                    s: 'VDI 2230 Blatt 1 (Ausgabe 2015) verlangt fuer eine Hochfest-vorgespannte Schraubverbindung folgende <strong>Nachweise</strong>:<br>'
                        + '<strong>R0 — Vorspannung:</strong> Erforderliche Mindest-Klemmkraft $F_K$ aus Querkraft- und Dichtigkeitsforderung; sicherer Anzug ueber $F_M$.<br>'
                        + '<strong>R1 — Anziehfaktor $\\alpha_A$:</strong> Streuung des erreichten $F_M$ je nach Anziehverfahren (drehmomentkontrolliert: $\\alpha_A \\approx 1{,}4\\ldots 1{,}6$; streckgrenzgesteuert: $\\approx 1{,}1\\ldots 1{,}2$; Anziehwinkelgesteuert: $\\approx 1{,}1\\ldots 1{,}2$).<br>'
                        + '<strong>R2 — Setzbetrag $f_Z$:</strong> Plastische Einebnung der Auflageflaechen; Vorspannungsverlust $F_Z$.<br>'
                        + '<strong>R3 — Schraubenspannung statisch:</strong> Vergleichsspannung $\\sigma_v$ im Spannungsquerschnitt $\\leq 0{,}9 \\cdot R_{p,0{,}2}$ inklusive Torsionsanteil aus dem Anziehmoment.<br>'
                        + '<strong>R4 — Flaechenpressung Auflage:</strong> $p_\\text{max} \\leq p_G$ (Grenzwert nach VDI 2230 Tabelle).<br>'
                        + '<strong>R5 — Mindesteinschraubtiefe:</strong> Gewindebruch ausschliessen (Innengewinde im Mutterwerkstoff vor Schraubenwerkstoff fliesst). Faustregel: $l_\\text{min} \\approx 0{,}8 \\cdot d$ bei gleichem Werkstoff, $\\approx 1{,}2\\ldots 1{,}5 \\cdot d$ bei weicherem Mutterwerkstoff (Aluminium).<br>'
                        + '<strong>R6 — Schraubenspannung dynamisch (Dauerfestigkeit):</strong> Spannungsamplitude $\\sigma_a \\leq \\sigma_A$ (zulaessige Dauerfestigkeit der gerollten Schraube nach VDI 2230 Tabelle 4).<br>'
                        + '<strong>R7/R8 — Querkraft- und Drehmoment-Uebertragung</strong>: Reibschluss in Trennfuge ausreichend.<br>'
                        + '<strong>R9 — Schadensbild bei Aussagen ueber Schadensursache</strong> (forensisch).<br><br>'
                        + '<strong>Welcher Nachweis begrenzt typischerweise zuerst?</strong> Bei dynamisch belasteten Schrauben ist <strong>R6 (Dauerfestigkeit)</strong> meist die kritische Anstrengung. Grund: Die zulaessige Spannungsamplitude $\\sigma_A$ einer gerollten ISO-Metric-Schraube ist auch in Festigkeitsklasse 12.9 nur ca. $50\\ldots 70\\,\\text{MPa}$ (10.9 etwa $40\\ldots 60\\,\\text{MPa}$, schlussvergueteten Schrauben deutlich weniger), waehrend $R_{p,0{,}2}$ bis $1080\\,\\text{MPa}$ erreicht. Faktor $\\geq 10$.<br>'
                        + 'Praktische Folge: hohe Vorspannung haelt die Spannungsamplitude an der Schraube klein (gross-elastisches Volumen entkoppelt). Wenn die Klemmkraft verloren geht (Setzen, Selbstloesen), waechst $\\sigma_a$ schlagartig &mdash; klassisches Versagensbild &laquo;Bruch im ersten tragenden Gewindegang&raquo; (Kerbgrund).'
                },
                {
                    q: 'Welche Verfahren stehen in der Schweissnaht-<strong>Bewertung</strong> nach DIN EN ISO 5817 zur Verfuegung, und welche drei Bewertungsgruppen unterscheidet die Norm?',
                    h: 'Bewertungsgruppen B, C, D.',
                    s: 'DIN EN ISO 5817 (aktuell 2014, technisch noch gueltig) ist die zentrale <strong>Bewertungsnorm</strong> fuer Unregelmaessigkeiten in Schmelzschweissnaehten an Stahl, Nickel, Titan und ihren Legierungen. Sie definiert <strong>drei Bewertungsgruppen</strong>:<br>'
                        + '<strong>B &mdash; hoch:</strong> Strengste Anforderungen. Z.B. Druckbehaelter, Sicherheitsbauteile, Bauteile mit hoher Wechselbeanspruchung. Beispiele: Kantenversatz $\\leq 0{,}1 t$, Nahtueberhoehung $\\leq 1\\,\\text{mm} + 0{,}1 b$, Einbrandkerbe nicht erlaubt.<br>'
                        + '<strong>C &mdash; mittel:</strong> Maschinen-/Stahlbau allgemein. Beispiele: Kantenversatz $\\leq 0{,}15 t$, kleinere Einbrandkerben (max. 0,5 mm Tiefe) erlaubt.<br>'
                        + '<strong>D &mdash; massig:</strong> Untergeordnete, statisch belastete Bauteile. Tolerierte Unregelmaessigkeiten am groessten.<br>'
                        + 'Die Bewertungsgruppe wird in der Konstruktionszeichnung angegeben (z.B. <code>EN ISO 5817-B</code>) und ist Vertragsgegenstand zwischen Hersteller und Auftraggeber.<br><br>'
                        + '<strong>Bewertete Unregelmaessigkeiten</strong> (Auswahl, jeweils mit zulaessiger Groesse pro Gruppe):<br>'
                        + '&bull; <em>Risse</em>: in allen Gruppen unzulaessig.<br>'
                        + '&bull; <em>Poren</em>: einzeln und Porennester (Flaechen-/Volumenanteil).<br>'
                        + '&bull; <em>Schlackeneinschluesse</em>: Laenge und Tiefe.<br>'
                        + '&bull; <em>Bindefehler / unvollstaendige Durchschweissung</em>: in B/C unzulaessig, in D bedingt.<br>'
                        + '&bull; <em>Geometrische Unregelmaessigkeiten</em>: Kantenversatz, Einbrandkerbe, Nahtueberhoehung, Wurzelruecksprung, Asymmetrie.<br><br>'
                        + '<strong>Pruefverfahren zur Bewertung:</strong><br>'
                        + '&bull; Visuelle Pruefung (VT) nach DIN EN ISO 17637 &mdash; Geometrie, Oberflaechenfehler.<br>'
                        + '&bull; Eindringpruefung (PT, ISO 3452) und Magnetpulverpruefung (MT, ISO 17638) &mdash; Oberflaechen-/oberflaechennahe Risse.<br>'
                        + '&bull; Ultraschall- (UT, ISO 17640) und Durchstrahlungspruefung (RT, ISO 17636) &mdash; volumetrische Unregelmaessigkeiten.<br>'
                        + 'Die <em>Pruefumfaenge</em> (Anteil zu pruefender Schweissnahtlaenge) ergeben sich aus DIN EN ISO 17635 abhaengig von der Beanspruchungsklasse und Bewertungsgruppe.<br>'
                        + 'Verwandte Normen: DIN EN ISO 10042 fuer Aluminium, DIN EN ISO 13919-1/-2 fuer Strahlschweissen, DIN EN ISO 6520-1 fuer Begriffsdefinitionen.'
                },
                {
                    q: 'Beschreibe das Konzept der <strong>WEZ-Aufhaertung (HAZ Hardening)</strong> beim Schweissen von Verguetungsstaehlen. Welche Werkstoff- und Prozessparameter beeinflussen die Aufhaertung, und wie quantifiziert man das Risiko?',
                    h: 'Kohlenstoffaequivalent CE, Abkuehlzeit $t_{8/5}$.',
                    s: '<strong>Mechanismus:</strong> In der Waermeeinflusszone (WEZ) eines schweissten Bauteils erreicht das Material lokal Austenitisierungstemperatur ($> A_{c3} \\approx 850^\\circ\\text{C}$). Die anschliessende Abkuehlrate haengt von Wandstaerke, Streckenenergie, Vorwaermung und Werkstoff ab. Bei Verguetungsstaehlen mit hoehrem Kohlenstoff- und Legierungsgehalt fuehrt schnelle Abkuehlung zur Bildung von <strong>Martensit</strong> &mdash; einem harten, sproeden Gefuege mit hoher Versproedung und Risiko fuer Kaltrisse (Wasserstoffinduzierte Risse).<br>'
                        + '<strong>Quantifizierung:</strong><br>'
                        + '<strong>1. Kohlenstoffaequivalent CE</strong> (IIW-Formel, DIN EN 1011-2):<br>'
                        + '$$CE_\\text{IIW} = C + \\frac{Mn}{6} + \\frac{Cr+Mo+V}{5} + \\frac{Ni+Cu}{15}$$'
                        + '$CE \\leq 0{,}40$: gut schweissbar ohne besondere Massnahmen.<br>'
                        + '$0{,}40 < CE \\leq 0{,}55$: maessig schweissbar, Vorwaermen und/oder kontrollierte Streckenenergie.<br>'
                        + '$CE > 0{,}55$: schwierig schweissbar, individuell zu bewerten (Vorwaermung, ggf. PWHT, Wasserstoff-arme Verfahren).<br>'
                        + 'Alternative Formel <em>CET</em> (Yurioka, EN 1011-2 Anhang C) fuer hochfeste Feinkornstaehle:<br>'
                        + '$$CET = C + \\frac{Mn+Mo}{10} + \\frac{Cr+Cu}{20} + \\frac{Ni}{40}$$'
                        + '<strong>2. Abkuehlzeit $t_{8/5}$</strong>: Zeit von $800^\\circ\\text{C}$ auf $500^\\circ\\text{C}$ in der WEZ. Skaliert mit Streckenenergie, Vorwaermung und Wandstaerke (DIN EN 1011-2 Anhang D, Rosenthal-Loesung der Waermeleitgleichung). Optimaler Bereich werkstoffabhaengig:<br>'
                        + '&bull; S355: $t_{8/5} \\approx 5\\ldots 25\\,\\text{s}$.<br>'
                        + '&bull; S690QL: $t_{8/5} \\approx 8\\ldots 20\\,\\text{s}$ (eng, da zu lang das Vergueten zerstoert wird, zu kurz Aufhaertung).<br>'
                        + '&bull; S960QL: $t_{8/5} \\approx 6\\ldots 12\\,\\text{s}$.<br>'
                        + '<strong>3. Vorwaermtemperatur $T_p$</strong>: bei kritischen Werkstoffen / dicken Wandstaerken zwingend; berechnet nach EN 1011-2 als Funktion von $CET$, Wandstaerke, Wasserstoff-Gehalt des Schweissguts und Eigenspannungen.<br><br>'
                        + '<strong>Folgen unkontrollierter Aufhaertung:</strong><br>'
                        + '&bull; <em>Kaltrisse</em> in WEZ binnen Stunden bis Tagen nach Schweissen, vor allem in der Wurzelnaht.<br>'
                        + '&bull; Reduzierte Bruchzaehigkeit, Sprödbruchgefahr.<br>'
                        + '&bull; Reduzierte Korrosionsbestaendigkeit (Mikrozellbildung).<br>'
                        + '<strong>Praxis:</strong> Werkstoff-Datenblatt (z.B. SSAB Strenx, Dillinger Bisplate) gibt $CE$, empfohlene $t_{8/5}$-Bereiche und Vorwaermkurven. Schweisswärmebehandlungs-Vorgabewerte sind in WPS (Welding Procedure Specification, DIN EN ISO 15614) festzuhalten.'
                }
            ]
        ]
    };
})();
