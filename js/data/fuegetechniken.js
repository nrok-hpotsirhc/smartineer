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
                },
                {
                    q: 'Welche <strong>Polaritaet</strong> waehlt man beim WIG-Schweissen fuer (a) Stahl/Edelstahl und (b) Aluminium &mdash; und warum?',
                    h: 'DC-, DC+, AC.',
                    s: '(a) <strong>Stahl, Edelstahl, Titan: Gleichstrom Minus (DC&minus; / EN, electrode negative)</strong> &mdash; ca. 70 % der Waerme im Werkstueck, 30 % in der Elektrode &rArr; tiefe Einbrand, geringe Wolfram-Abnutzung.<br>'
                        + '(b) <strong>Aluminium: Wechselstrom (AC)</strong> &mdash; in der Plus-Halbwelle wird die Aluminiumoxid-Schicht ($\\text{Al}_2\\text{O}_3$, Schmelzpunkt $2050\\,^\\circ\\text{C}$ &gt;&gt; Al-Schmelzpunkt $660\\,^\\circ\\text{C}$) aufgebrochen (sog. <em>Reinigungseffekt</em>); in der Minus-Halbwelle erfolgt der Einbrand. DC+ alleine ueberhitzt die Elektrode.<br>'
                        + '$\\boxed{\\text{Stahl/Edelstahl} \\to \\text{DC}-;\\quad \\text{Aluminium} \\to \\text{AC}}$<br>'
                        + 'Quelle: DIN EN ISO 14175 (Schutzgase) i.V.m. DVS-Merkblatt 0937 (WIG-Schweissen Aluminium).'
                },
                {
                    q: 'Was unterscheidet eine <strong>V-Naht</strong>, eine <strong>X-Naht</strong> und eine <strong>Kehlnaht</strong> nach DIN EN ISO 9692-1?',
                    h: 'Stumpfstoss vs. T-Stoss, ein- vs. beidseitig.',
                    s: '<strong>V-Naht (V-Fuge)</strong>: einseitige V-foermige Nahtvorbereitung am Stumpfstoss, Oeffnungswinkel typ. $60^\\circ$ ($\\pm 5^\\circ$). Wirtschaftlich bis Blechdicke $\\approx 16\\,\\text{mm}$; darueber zu viel Schweissgut.<br>'
                        + '<strong>X-Naht (Doppel-V)</strong>: beidseitig V-foermig am Stumpfstoss, Oeffnungswinkel $60^\\circ$ pro Seite. Ab $\\approx 16\\,\\text{mm}$ Blechdicke wirtschaftlicher als V; geringerer Verzug durch symmetrische Schweissfolge.<br>'
                        + '<strong>Kehlnaht</strong>: Verbindung am T-, Eck- oder Ueberlappungsstoss <em>ohne</em> Nahtvorbereitung. Berechnungsmass ist das <em>a-Mass</em> (Hoehe des einbeschriebenen gleichschenkligen Dreiecks im Nahtquerschnitt).<br>'
                        + 'Quelle: DIN EN ISO 9692-1:2013 "Empfehlungen zur Schweissnahtvorbereitung &mdash; Lichtbogenschweissen von Staehlen".'
                },
                {
                    q: 'Eine durchgehende <strong>Kehlnaht</strong> mit $a = 5\\,\\text{mm}$, $\\ell = 200\\,\\text{mm}$ wird auf Zug belastet. Welche Bruchspannung wirkt auf die rechnerische Nahtflaeche bei $F = 100\\,\\text{kN}$?',
                    h: 'Nahtflaeche $A = a \\cdot \\ell$.',
                    s: 'Die rechnerische Nahtflaeche der Kehlnaht ist die Rechteckflaeche im Bruchquerschnitt:<br>'
                        + '$$A = a \\cdot \\ell = 5\\,\\text{mm} \\cdot 200\\,\\text{mm} = 1000\\,\\text{mm}^2.$$'
                        + 'Bruchspannung (vereinfacht, ohne Winkelvergleichsspannung):<br>'
                        + '$$\\sigma = \\frac{F}{A} = \\frac{100\\,000\\,\\text{N}}{1000\\,\\text{mm}^2} = 100\\,\\text{N/mm}^2.$$'
                        + '$\\boxed{\\sigma = 100\\,\\text{MPa}}$ &mdash; deutlich unter $f_{vw,d}$ einer S235-Kehlnaht ($\\approx 207\\,\\text{MPa}$ nach EC3-1-8 mit $\\beta_w = 0{,}8$, $\\gamma_{M2} = 1{,}25$).<br>'
                        + 'Quelle: DIN EN 1993-1-8:2010 (Eurocode 3-1-8) §4.5.3.2.'
                },
                {
                    q: 'Nenne die <strong>Schweisspositionen</strong> nach DIN EN ISO 6947 (PA, PB, PC, PD, PE, PF, PG) und ordne sie zu (waagerecht, senkrecht steigend/fallend, ueberkopf, horizontal an der Wand).',
                    h: 'PA = Wanne, PG = fallend.',
                    s: '<strong>PA</strong> &mdash; Wannenlage (waagerecht, von oben).<br>'
                        + '<strong>PB</strong> &mdash; horizontale Kehlnaht (T-Stoss, Naht horizontal, Bauteil vertikal/horizontal).<br>'
                        + '<strong>PC</strong> &mdash; Quernaht (horizontal an der Wand, Bauteil vertikal).<br>'
                        + '<strong>PD</strong> &mdash; ueberkopf-Kehlnaht (an der Decke).<br>'
                        + '<strong>PE</strong> &mdash; Ueberkopflage (Stumpfnaht an der Decke).<br>'
                        + '<strong>PF</strong> &mdash; senkrecht steigend (von unten nach oben).<br>'
                        + '<strong>PG</strong> &mdash; senkrecht fallend (von oben nach unten, nur bei duennen Blechen oder Hochleistungsverfahren).<br>'
                        + 'Quelle: DIN EN ISO 6947:2019. WPQR-Zertifikate sind positionsspezifisch; PF deckt PA/PB/PC ab, PE deckt alle ab.'
                },
                {
                    q: 'Welche <strong>Lichtbogenarten</strong> kennt man beim MAG-Schweissen, und welche ist fuer duenne Bleche im Wurzelbereich geeignet?',
                    h: 'Kurz, Lang/Spruehlichtbogen, Impuls.',
                    s: '<strong>Kurzlichtbogen</strong> ($U \\approx 14\\ldots 22\\,\\text{V}$, $I \\approx 60\\ldots 180\\,\\text{A}$): zyklischer Kurzschluss-Werkstoffuebergang, kalte Naht, niedrige Streckenenergie &mdash; <em>ideal fuer duenne Bleche und Wurzellagen</em>.<br>'
                        + '<strong>Uebergangslichtbogen</strong>: instabil, vermeiden &mdash; viele Spritzer.<br>'
                        + '<strong>Spruehlichtbogen / Langer Lichtbogen</strong> ($U &gt; 28\\,\\text{V}$, hoher $I$): kontinuierlicher feiner Tropfenuebergang, hohe Abschmelzleistung, fuer Fuell-/Decklagen ab $\\approx 4\\,\\text{mm}$ Blechdicke.<br>'
                        + '<strong>Impulslichtbogen</strong>: Wechsel zwischen Grund- und Pulsstrom &mdash; gezielter Tropfenabriss pro Puls, spritzerarm, fuer Position $\\mathit{PF}$ und CrNi-Staehle.<br>'
                        + 'Quelle: DVS-Merkblatt 0916 (MAG-Lichtbogenarten); DIN EN ISO 4063 Verfahren 135/138.'
                },
                {
                    q: 'Welche Aufgabe hat das <strong>Flussmittel</strong> beim Loeten, und welche Korrosionsklassen kennt DIN EN ISO 9454-1?',
                    h: 'Reduzieren von Oxiden; F-SH / F-W.',
                    s: '<strong>Aufgabe des Flussmittels:</strong><br>'
                        + '&bull; reduziert Oxidschichten auf den Fuegeteilen (Aktivierung der Oberflaeche);<br>'
                        + '&bull; verhindert Re-Oxidation waehrend des Loetvorgangs;<br>'
                        + '&bull; erniedrigt die Oberflaechenspannung &rArr; besseres Benetzen und Kapillarfluss.<br>'
                        + '<strong>Korrosionsklassen nach DIN EN ISO 9454-1:2018 (Weichloeten):</strong><br>'
                        + '&bull; Typ 1.1.x &mdash; Kolofonium-Basis (rosin), R/RMA/RA &mdash; minimale Korrosionswirkung, Reste duerfen oft auf Elektronik bleiben.<br>'
                        + '&bull; Typ 2.x.x &mdash; organisch, wasserloeslich &mdash; staerker, muss abgewaschen werden.<br>'
                        + '&bull; Typ 3.x.x &mdash; anorganisch (Chloride/Fluoride) &mdash; aggressiv, nur Sanitaer/Klima, niemals Elektronik.<br>'
                        + 'Hartloet-Flussmittel separat in DIN EN 1045 geregelt (FH10, FH21 fuer Ag-Lote).'
                },
                {
                    q: 'Welche <strong>Klebstoff-Familien</strong> kennt man im Maschinenbau, und welche eignet sich fuer eine flexible, witterungsbestaendige Karosserie-Direktverglasung?',
                    h: 'Epoxy, PUR, Acrylat, Silikon, MS-Polymer.',
                    s: '<strong>Epoxidharz (EP):</strong> hochfest, sproede, 1K (warmhaertend) oder 2K (kalthaertend). Strukturklebung Aluminium-Karosserie, Faser-Composites.<br>'
                        + '<strong>Polyurethan (PUR):</strong> zaeh-elastisch, mittlere Festigkeit, gute Schlagzaehigkeit. <em>Direktverglasung KFZ</em> (Scheibenklebung), Schiffbau Deckplatten.<br>'
                        + '<strong>Acrylat / Methacrylat (MMA):</strong> mittlere Festigkeit, schnell, oeltolerant. Verklebung von metallischen Strukturen, Schienenfahrzeugen.<br>'
                        + '<strong>Cyanoacrylat (CA, "Sekundenkleber"):</strong> sehr schnell, niedrige Schaelfestigkeit, feuchtigkeitsempfindlich.<br>'
                        + '<strong>Silikon / MS-Polymer (silane modified polymer):</strong> hochelastisch, witterungsbestaendig, geringe Strukturfestigkeit. Fassaden, Sanitaer.<br>'
                        + '<strong>Antwort:</strong> Fuer flexible witterungsbestaendige Karosserie-Direktverglasung &rArr; <strong>1K-PUR</strong> (Sika Tack, Henkel Teroson Terostat). Quelle: VDI 2229-Begleitliteratur, DIN EN 15870.'
                },
                {
                    q: 'Welche Schritte umfasst die <strong>Klebflaechenvorbereitung</strong> von Aluminium fuer eine strukturelle Klebung, und warum reicht Entfetten alleine nicht?',
                    h: 'Entfetten, Aufrauen, Aktivieren, Primer.',
                    s: '<strong>Aluminium</strong> bildet binnen Sekunden eine $5\\ldots 10\\,\\text{nm}$ dicke Oxidschicht ($\\text{Al}_2\\text{O}_3$), die mechanisch fest, aber chemisch schwach mit Klebstoffen wechselwirkt. Daher reicht Entfetten <em>nicht</em>; man muss die Oxidschicht entweder gezielt aufrauen, durch eine andere Konversionsschicht ersetzen oder mit Primer absichern.<br>'
                        + '<strong>Standard-Vorbereitung (DIN EN 13887:2003):</strong><br>'
                        + '1. <em>Entfetten</em> (Isopropanol, MEK, Aceton) &mdash; entfernt Walzoele.<br>'
                        + '2. <em>Mechanisch aufrauen</em> (Strahlen mit Korund $\\text{F}_{120}\\ldots\\text{F}_{180}$, oder Schleifen $\\text{P}_{180}$) &mdash; vergroessert die effektive Oberflaeche, bricht die Oxidschicht.<br>'
                        + '3. <em>Erneut entfetten</em> &mdash; entfernt Strahlmittel-Reste.<br>'
                        + '4. <em>Konversion</em> (z.B. <strong>Chromsaeure-Anodisieren CAA</strong> nach BAC 5555 in Luftfahrt, oder phosphorhaltige Anodisierung PAA) oder <em>Primer</em> (z.B. Cytec BR127).<br>'
                        + '5. Klebstoffauftrag innerhalb der Vorbereitungsoffenzeit ($\\sim 8\\,\\text{h}$ bei CAA).<br>'
                        + 'Ohne Schritt 4 sinkt die Langzeitfestigkeit unter Feuchteklima um 50&ndash;80 %.'
                },
                {
                    q: 'Welche <strong>Festigkeitsklassen</strong> nach DIN EN ISO 898-1 kennt man bei Schrauben (z.B. 8.8, 10.9, 12.9), und was bedeuten die beiden Zahlen?',
                    h: 'Erste Zahl $\\times 100$ = $R_m$ in N/mm$^2$.',
                    s: '<strong>Notation nach DIN EN ISO 898-1:2013</strong>: zweistellige Zahl, getrennt durch einen Punkt. Erste Zahl = Zugfestigkeit $R_m$ in Hundert MPa; zweite Zahl = $10 \\cdot (R_{p0{,}2}/R_m)$ (Streckgrenzenverhaeltnis).<br>'
                        + '<strong>Beispiel 8.8:</strong> $R_m \\geq 800\\,\\text{MPa}$, $R_{p0{,}2}/R_m = 0{,}8$ &rArr; $R_{p0{,}2} \\geq 640\\,\\text{MPa}$.<br>'
                        + '<strong>Beispiel 10.9:</strong> $R_m \\geq 1000\\,\\text{MPa}$, $R_{p0{,}2} \\geq 900\\,\\text{MPa}$.<br>'
                        + '<strong>Beispiel 12.9:</strong> $R_m \\geq 1200\\,\\text{MPa}$, $R_{p0{,}2} \\geq 1080\\,\\text{MPa}$.<br>'
                        + 'Hoehere Klassen ab 10.9 sind <em>vergueteter</em> Stahl (40CrMnMo7 o.ae.). Eine Klasse-12.9-Schraube ist allerdings empfindlich gegenueber Wasserstoffversproedung &mdash; korrosionsschutz vor allem ueber Zink-Lamellen statt galvanisch Zink.<br>'
                        + '<strong>Edelstahl</strong> nach DIN EN ISO 3506-1 (A2-70, A4-80) &mdash; eigenes Klassifikationssystem.'
                },
                {
                    q: 'Nenne drei Wirkprinzipien zur <strong>Schraubensicherung</strong> gegen selbsttaetiges Loesen und ordne ihnen jeweils ein Produkt zu (Sperrkant-, Nord-Lock-, Loctite-, Sicherungsmutter, Schnorr).',
                    h: 'Formschluessig, kraftschluessig, klebend.',
                    s: '<strong>1. Formschluessige Sicherung</strong> (durch Sperrnocken/Hinterschnitt): Nord-Lock-Scheibenpaar (zwei Keilflaechen mit Sperrkanten), Sperrkantringe (z.B. Heico-Lock). Gegen Vibrationsloesen nach Junker-Test bestens geeignet.<br>'
                        + '<strong>2. Kraftschluessige Sicherung</strong> (durch zusaetzliche Reibung/Klemmkraft): Schnorr-Sicherungsscheibe, federnde Faecherscheibe, polyamid-eingelegte Sicherungsmutter (Stoppmutter, DIN 985). Begrenzt wirksam &mdash; reine Reibungsschluss-Loesung fuer kleine dynamische Belastungen.<br>'
                        + '<strong>3. Klebend / stoffschluessig</strong>: anaerobe Klebstoffe (Loctite 243 mittelfest, 270 hochfest) &mdash; mikroverkapselter Klebstoff (precoat z.B. Tuflok 3M Scotch-Grip) im Gewinde. Erfordert metallische Aktivierung &mdash; haertet nur unter Sauerstoffabschluss zwischen Gewindeflanken.<br>'
                        + 'Quelle: VDI 2230-1:2015 §5.5; DIN 25201 (Schienenfahrzeug-Sicherungsanforderung).'
                },
                {
                    q: 'Unterscheide <strong>Vollniet</strong>, <strong>Halbhohlniet</strong>, <strong>Blindniet</strong> und <strong>Stanzniet</strong>: Aufbau und typische Anwendung.',
                    h: 'Vollniet = klassisch erwaermt, Blindniet = einseitig setzbar.',
                    s: '<strong>Vollniet</strong> (DIN 660&ndash;DIN 674): Vollmaterial-Niet mit Setzkopf und Schliesskopf. Klassische Form, frueher warmgesetzt im Stahlbau (Bruecken, Schiffbau bis 1950er). Heute praktisch nur noch in der Luftfahrt fuer Aluminium-Bleche (z.B. DIN 7337).<br>'
                        + '<strong>Halbhohlniet</strong>: hohle Spitze, kann ohne grossen Druck umgeformt werden. Verwendet als Hilfsfuegeteil beim <em>Stanznieten mit Halbhohlniet</em> (s.u.).<br>'
                        + '<strong>Blindniet</strong> (DIN EN ISO 14589, DIN EN ISO 16584): einseitig setzbarer Niet aus zwei Teilen &mdash; Hohlniet mit Dorn. Das Setzgeraet zieht den Dorn, der Hohlniet wird auf der Blindseite gestaucht und der Dorn reisst an einer Sollbruchstelle ab. Anwendung: Karosserie, Fassaden, ueberall wo nur eine Seite zugaenglich ist.<br>'
                        + '<strong>Stanzniet</strong> (DIN EN ISO 19166-2 / DVS/EFB-Merkblatt 3410): der Niet stanzt sich beim Setzen <em>selbst</em> durch das obere Blech und formt sich im unteren Blech auf, ohne dieses zu durchstossen. Anwendung: Aluminium-Spaceframe Audi A8, Multi-Material-Karosserie. Ohne Vorbohrung, hoechste Lasten.'
                },
                {
                    q: 'Welche <strong>typischen Schweissnahtfehler</strong> kennt DIN EN ISO 6520-1, und welche ZfP-Methode detektiert sie am besten?',
                    h: 'Pore, Schlackeneinschluss, Bindefehler, Riss, Wurzelfehler.',
                    s: '<strong>1. Pore</strong> (kugelfoermiger Gaseinschluss) &mdash; durch Wasserstoff, Feuchtigkeit, falsches Gas. <em>Detektion:</em> RT (Roentgen) zeigt runde Schwaerzung; UT bei Volumenporen.<br>'
                        + '<strong>2. Schlackeneinschluss</strong> &mdash; nichtmetallischer Einschluss in der Naht. <em>Detektion:</em> RT zeigt unregelmaessige Schwaerzung; UT mittel.<br>'
                        + '<strong>3. Bindefehler</strong> (Flankenbindefehler) &mdash; mangelnde Verschmelzung zwischen Naht und Grundwerkstoff. <em>Detektion:</em> UT (planare Anzeige), RT nur wenn senkrecht zum Strahl.<br>'
                        + '<strong>4. Riss</strong> (Heissriss, Kaltriss, Erstarrungsriss) &mdash; gefaehrlichster Fehler. <em>Detektion:</em> Oberflaechenrisse &rarr; MT (magn. Pulvermarkierung) bei ferromagnetischen Materialien, PT (Eindringen) bei nicht-magnetisch (CrNi, Al); innere Risse &rarr; UT.<br>'
                        + '<strong>5. Wurzelfehler</strong> (Wurzeldurchhang, Wurzeleinfall, Wurzelriss) &mdash; im Bereich der Schweissnahtwurzel. <em>Detektion:</em> RT zeigt Wurzelkonturfehler; UT auf der Gegenseite.<br>'
                        + 'Bewertungsgruppen B (streng) / C / D nach DIN EN ISO 5817:2014.'
                },
                {
                    q: 'Was regelt eine <strong>Schweissanweisung (WPS)</strong> nach DIN EN ISO 15609, und wie wird sie qualifiziert?',
                    h: 'WPS + WPQR.',
                    s: 'Eine <strong>Welding Procedure Specification (WPS, Schweissanweisung)</strong> nach DIN EN ISO 15609-1:2019 legt fuer eine konkrete Schweissaufgabe verbindlich fest:<br>'
                        + '&bull; Grundwerkstoff (Werkstoffgruppe nach CEN ISO/TR 15608), Werkstuecksabmessungen, Schweissposition (ISO 6947);<br>'
                        + '&bull; Verfahren (ISO 4063: 111, 135, 141, &hellip;) und Verfahrenskombination (z.B. Wurzel WIG, Fuelllagen MAG);<br>'
                        + '&bull; Zusatzwerkstoff (Norm, Bezeichnung, Durchmesser), Schutzgas (ISO 14175);<br>'
                        + '&bull; elektrische Parameter (U, I, Polaritaet, Drahtvorschub), Schweissgeschwindigkeit, Streckenenergie;<br>'
                        + '&bull; Vorwaerm- und Zwischenlagentemperatur, Waermebehandlung nach dem Schweissen (PWHT);<br>'
                        + '&bull; Nahtaufbau (Lagenfolge), Pruefumfang.<br>'
                        + '<strong>Qualifizierung:</strong> ueber eine <em>Verfahrenspruefung</em> nach DIN EN ISO 15614-1:2017 (Pruefstueck mit Zerstoerungs- und ZfP-Pruefung) erhaelt der Hersteller einen <strong>WPQR (Welding Procedure Qualification Record)</strong>; aus ihm werden WPS abgeleitet, deren Geltungsbereich durch ISO 15614-1 §8 (Werkstoffgruppe, Dicke, Durchmesser, Position) festgelegt ist.'
                },
                {
                    q: 'Welche Pruefung muss ein Schweisser nach DIN EN ISO 9606-1 ablegen, und was umfasst der Geltungsbereich des Schweisserzertifikats?',
                    h: 'Probestueck + Pruefer + 6 Bedingungen.',
                    s: '<strong>DIN EN ISO 9606-1:2017 "Pruefung von Schweissern &mdash; Schmelzschweissen Teil 1: Staehle"</strong> verlangt:<br>'
                        + '&bull; Probestueck (Blech oder Rohr) mit Pruefnahtart (Stumpf, Kehl), Position, Werkstoffgruppe, Dicke entsprechend dem Pruefziel;<br>'
                        + '&bull; Pruefablauf unter Aufsicht eines zugelassenen <em>Pruefers / Pruefkoerperschaft</em> (z.B. SLV, TUeV);<br>'
                        + '&bull; ZfP nach Vorgabe: Sichtpruefung VT + Roentgen RT <em>oder</em> Ultraschall UT, ggf. Biege-/Bruchpruefung als Pruefstueck-Zerstoerung.<br>'
                        + '<strong>Geltungsbereich</strong> wird durch <strong>sechs Pruefparameter</strong> bestimmt: Schweissverfahren (111/135/141&hellip;), Erzeugnisform (Blech/Rohr), Werkstoffgruppe, Schweisszusatz, Pruefstuecksdicke (Bereich z.B. $t = 10\\,\\text{mm} \\Rightarrow 3\\ldots 20\\,\\text{mm}$), Schweissposition.<br>'
                        + '<strong>Gueltigkeit:</strong> 3 Jahre, jaehrliche Verlaengerung durch Arbeitgeber-Bestaetigung der Beschaeftigung mit dem Verfahren plus Pruefnachweis (Sicht/RT) im 6-Monats-Rhythmus.<br>'
                        + 'CrNi-Staehle laufen unter DIN EN ISO 9606-2, Aluminium unter 9606-2 (Al-Anhang), Kunststoff unter DVS 2212.'
                },
                {
                    q: 'Erklaere kurz das Wirkprinzip von <strong>Querpress- und Laengspressverband</strong> (Welle-Nabe nach DIN 7190).',
                    h: 'Erwaermen vs. axiales Aufpressen.',
                    s: '<strong>Querpressverband</strong> (auch Thermo-Schrumpfsitz): die Nabe wird auf typ. $200\\ldots 300\\,^\\circ\\text{C}$ erwaermt (oder die Welle in flussigem Stickstoff abgekuehlt), beide Teile spannungsfrei zusammengefuegt, und nach Temperaturausgleich entsteht durch die thermische Ausdehnungsdifferenz das Uebermass und damit der Pressdruck. <em>Vorteil:</em> keine axiale Fuegekraft, keine Oberflaechenbeschaedigung; geeignet fuer grosse Uebermasse.<br>'
                        + '<strong>Laengspressverband</strong>: die Welle wird mit Pressfuegekraft $F_e$ axial in die Nabe gedrueckt. Reibung beim Fuegen plaettet die Oberflaechenrauheit ($R_z$), das wirksame Uebermass sinkt um $\\sim 1\\,\\text{R_z}$ pro Seite. <em>Nachteil:</em> hohe Fuegekraft, Oberflaechen-Beschaedigung; <em>Vorteil:</em> demontierbar mit Hydraulik (Oeldruck unter die Nabe gepresst, Oelfilm hebt Nabe ab &mdash; "Oeldruckverband").<br>'
                        + 'Quelle: DIN 7190-1:2017 (Berechnung), DIN 7190-2:2017 (Querpressverband).'
                },
                {
                    q: 'Was ist das Grundprinzip des <strong>Reibschweissens</strong> (ISO 4063: 42, FRW; 43, FSW)?',
                    h: 'Plastifizierung durch Reibwaerme, dann Stauchdruck.',
                    s: '<strong>Reibschweissen (FRW, ISO 4063: 42)</strong> ist ein Pressschweissverfahren: eines der Fuegeteile rotiert mit Drehzahl $n$ und wird mit axialer Kraft $F_\\text{R}$ an das ruhende Gegenstueck gedrueckt. Reibung erzeugt Waerme &rArr; Fuegezone wird plastifiziert (aber <em>nicht</em> aufgeschmolzen). Nach Erreichen der Reibphase wird die Drehung gestoppt und eine erhoehte <em>Stauchkraft</em> $F_\\text{S}$ aufgebracht; die Werkstuecke verschweissen unter Volumenkontakt im festen Zustand.<br>'
                        + '<strong>Vorteile:</strong> keine Schmelzphase (kein Heisspriss, kein Erstarrungslunker); fuegen unterschiedlicher Werkstoffe (Stahl/Cu, Al/Stahl, Stahl/Ti) moeglich; sehr enge WEZ; hohe Reproduzierbarkeit. <strong>Anwendung:</strong> Antriebswellen mit Flansch, Ventilkegel, Kolbenstange (Al-Stahl).<br>'
                        + '<strong>FSW (ISO 4063: 43, Friction-Stir-Welding):</strong> Spezialvariante &mdash; ein rotierender, profilierter <em>Stift</em> wird zwischen zwei stumpf gestossene Bleche eingestochen und entlang der Naht bewegt; plastifiziert das Material, das den Pin umstroemt. Anwendung: Aluminium-Schiffe, Eisenbahnwagons, Tesla-Battery-Trays.<br>'
                        + 'Quelle: DIN EN ISO 15620:2019 (FRW), DIN EN ISO 25239 (FSW).'
                },
                {
                    q: 'Welche drei Materialgruppen lassen sich mit <strong>Punktschweissen (RP, ISO 4063: 21)</strong> besonders gut verbinden, und was begrenzt die Anwendung bei Aluminium?',
                    h: 'Stahl &gt; Edelstahl &gt; Alu.',
                    s: '<strong>Stahl (un-/niedriglegiert)</strong>: ideal &mdash; hoher elektrischer Widerstand $\\Rightarrow$ effizient ohmsche Erwaermung am Stossquerschnitt; Karosseriebau (typ. 4000&ndash;6000 Schweisspunkte pro PKW).<br>'
                        + '<strong>Edelstahl (CrNi-Austenit, 1.4301 etc.)</strong>: gut &mdash; hoher Widerstand, mittlere Waermeleitfaehigkeit. Erhoehtes Risiko der interkristallinen Korrosion (Sensibilisierung) bei langer Stromzeit.<br>'
                        + '<strong>Kupfer / Aluminium</strong>: kritisch &mdash; sehr hoher Waermeleitwert ($\\lambda_\\text{Al} \\approx 235\\,\\text{W/(m\\,K)}$ vs. Stahl $\\approx 45$) und niedriger elektrischer Widerstand ($\\rho_\\text{Al}/\\rho_\\text{Stahl} \\approx 1/3$) fuehren dazu, dass die Waerme aus der Kontaktzone schnell abfliesst, bevor lokal aufgeschmolzen wird. Loesungen: sehr hohe Stroeme (50&ndash;100 kA), kurze Pulszeiten, profilierte Kupfer-Elektroden mit Kappenfraeser-Service nach $\\sim 500$ Punkten. Audi und BMW haben darauf verzichtet und stattdessen <em>Stanznieten</em> + <em>Kleben</em> fuer Al-Karosserien gewaehlt.<br>'
                        + 'Quelle: DVS-Merkblatt 2902-1 (Widerstandsschweissen Stahl), 2902-2 (Aluminium).'
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
                },
                {
                    q: 'Berechne fuer eine MAG-Schweissung an S355 ($t = 12\\,\\text{mm}$) das <strong>CET (Carbon Equivalent Thyssen)</strong> und die noetige <strong>Vorwaermtemperatur</strong> $T_p$ nach DIN EN 1011-2 fuer einen Wasserstoffgehalt $H = 5\\,\\text{ml/100\\,g}$ und eine Streckenenergie $E = 1{,}0\\,\\text{kJ/mm}$. Stahlanalyse: C = 0,18 %, Mn = 1,4 %, Mo = 0,05 %, Cr = 0,2 %, Cu = 0,15 %, Ni = 0,1 %.',
                    h: '$CET = C + (Mn+Mo)/10 + (Cr+Cu)/20 + Ni/40$.',
                    s: '<strong>1. CET nach DIN EN 1011-2:2001 Anhang C:</strong><br>'
                        + '$$CET = C + \\frac{Mn + Mo}{10} + \\frac{Cr + Cu}{20} + \\frac{Ni}{40}.$$'
                        + 'Einsetzen (Massen-%):<br>'
                        + '$$CET = 0{,}18 + \\frac{1{,}40 + 0{,}05}{10} + \\frac{0{,}20 + 0{,}15}{20} + \\frac{0{,}10}{40}$$'
                        + '$$= 0{,}18 + 0{,}145 + 0{,}0175 + 0{,}0025 = 0{,}345.$$'
                        + '<strong>2. Vorwaermtemperatur</strong> nach DIN EN 1011-2 Gl. (C.1):<br>'
                        + '$$T_p = 700 \\cdot CET + 160 \\cdot \\tanh\\!\\left(\\frac{d}{35}\\right) + 62 \\cdot H^{0{,}35} + (53 \\cdot CET - 32) \\cdot E - 330$$'
                        + 'mit $d$ in mm, $H$ in ml/100&nbsp;g, $E$ in kJ/mm.<br>'
                        + 'Einsetzen ($d = 12$, $E = 1{,}0$, $H = 5$):<br>'
                        + '&bull; $700 \\cdot 0{,}345 = 241{,}5$<br>'
                        + '&bull; $160 \\cdot \\tanh(12/35) = 160 \\cdot \\tanh(0{,}343) = 160 \\cdot 0{,}330 = 52{,}8$<br>'
                        + '&bull; $62 \\cdot 5^{0{,}35} = 62 \\cdot 1{,}746 = 108{,}2$<br>'
                        + '&bull; $(53 \\cdot 0{,}345 - 32) \\cdot 1{,}0 = (18{,}29 - 32) = -13{,}7$<br>'
                        + '$$T_p = 241{,}5 + 52{,}8 + 108{,}2 - 13{,}7 - 330 \\approx 58{,}8\\,^\\circ\\text{C}.$$'
                        + '$\\boxed{T_p \\approx 60\\,^\\circ\\text{C}}$ &mdash; in der Praxis aufgerundet auf $75\\,^\\circ\\text{C}$ (Sicherheitszuschlag).'
                },
                {
                    q: 'Berechne die <strong>$t_{8/5}$-Zeit</strong> einer MAG-Schweissung in S355 ($t = 15\\,\\text{mm}$) im 3-dimensionalen Waermeableitungsfall (dicke Bleche) bei Streckenenergie $E = 1{,}5\\,\\text{kJ/mm}$ und $T_0 = 20\\,^\\circ\\text{C}$. Welche Konsequenz hat ein zu kurzes $t_{8/5}$?',
                    h: '3D-Naeherung: $t_{8/5} = (6700 - 5T_0) \\cdot E \\cdot [1/(500-T_0) - 1/(800-T_0)] \\cdot F_3$.',
                    s: 'Naeherungsformel nach DIN EN 1011-2 Anhang D fuer den <strong>dreidimensionalen Waermeableitungsfall</strong> (dicke Bleche, $t &gt; t_\\text{grenz}$):<br>'
                        + '$$t_{8/5} = (6700 - 5\\,T_0) \\cdot E \\cdot \\left( \\frac{1}{500 - T_0} - \\frac{1}{800 - T_0} \\right) \\cdot F_3.$$'
                        + 'Mit $T_0 = 20\\,^\\circ\\text{C}$, $E = 1{,}5\\,\\text{kJ/mm}$, $F_3 = 1$ (Stumpfnaht):<br>'
                        + '$$t_{8/5} = (6700 - 100) \\cdot 1{,}5 \\cdot \\left(\\frac{1}{480} - \\frac{1}{780}\\right) \\cdot 1$$'
                        + '$$= 9900 \\cdot (2{,}083 \\cdot 10^{-3} - 1{,}282 \\cdot 10^{-3}) = 9900 \\cdot 0{,}801 \\cdot 10^{-3} \\approx 7{,}9\\,\\text{s}.$$'
                        + '$\\boxed{t_{8/5} \\approx 8\\,\\text{s}}$<br>'
                        + '<strong>Konsequenz eines zu kurzen $t_{8/5}$</strong> ($&lt; 5\\,\\text{s}$): hohe Abkuehlrate &rArr; martensitisches Gefuege in der WEZ &rArr; <em>Kaltrisse</em> (insb. wasserstoffinduzierte Risse, sog. Hard Spot) und sproede Bruchneigung. Abhilfe: Vorwaermen, Streckenenergie erhoehen, Wasserstoffarmes Verfahren (z.B. WIG-Wurzel).<br>'
                        + 'Zielbereich fuer S355: $t_{8/5} = 6\\ldots 25\\,\\text{s}$.'
                },
                {
                    q: 'Was ist das Wirkprinzip des <strong>UP-Schweissens</strong> (Unterpulver, ISO 4063: 12) und welche Vor-/Nachteile bringt es?',
                    h: 'Endlosdraht unter Pulverberg, kein sichtbarer Lichtbogen.',
                    s: '<strong>Wirkprinzip:</strong> eine endlose Drahtelektrode wird unter einer aufgeschuetteten <em>Pulverschicht</em> abgeschmolzen. Der Lichtbogen brennt unter dem Pulver, ist also <em>nicht sichtbar</em>. Das Pulver schmilzt teilweise auf, schuetzt das Schmelzbad metallurgisch (Sauerstoff, Stickstoff), bildet eine Schlackenschicht die nach dem Erstarren abklopfbar ist; das restliche Pulver wird abgesaugt und wiederverwendet.<br>'
                        + '<strong>Vorteile:</strong><br>'
                        + '&bull; sehr hohe Abschmelzleistung (bis $30\\,\\text{kg/h}$ pro Draht, mit Tandemkopf $60\\,\\text{kg/h}$);<br>'
                        + '&bull; hohe Streckenenergie ($E = 2\\ldots 8\\,\\text{kJ/mm}$) &rArr; tiefer Einbrand, dicke Bleche in einer Lage bis $\\sim 20\\,\\text{mm}$;<br>'
                        + '&bull; spritzerfrei, kein Lichtbogen-Blitz fuer den Schweisser;<br>'
                        + '&bull; gute Reproduzierbarkeit, gut automatisierbar.<br>'
                        + '<strong>Nachteile:</strong><br>'
                        + '&bull; nur Wannenlage PA (Pulver muss liegen bleiben) und horizontal &mdash; <em>nicht</em> ueberkopf;<br>'
                        + '&bull; geringe Flexibilitaet bei kleinen Bauteilen / Kurznaehten (Pulver-Handling-Aufwand);<br>'
                        + '&bull; hohe Streckenenergie kann zu grobem Korn in der WEZ fuehren &rArr; Zaehigkeitsabfall.<br>'
                        + '<strong>Anwendung:</strong> Druckbehaelterboeden, Pipeline-Laengsnaehte, Schiffbau-Doppelboeden, Windturmsegmente. Quelle: DIN EN ISO 14171 (UP-Drahtelektroden), DIN EN ISO 14174 (UP-Schweisspulver).'
                },
                {
                    q: 'Was ist der <strong>Tiefschweisseffekt</strong> beim Laserstrahlschweissen, und welche Geometrie ergibt sich daraus?',
                    h: 'Dampfkapillare ("Keyhole").',
                    s: '<strong>Tiefschweisseffekt (Keyhole-Mode):</strong> bei Leistungsdichten $&gt; 10^6\\,\\text{W/cm}^2$ verdampft der Werkstoff lokal; der Dampfdruck draengt das fluessige Material zur Seite und es entsteht eine <strong>Dampfkapillare ("Keyhole")</strong>, deren Wand das Laserlicht durch Mehrfachreflexion absorbiert. Die Energie wird damit <em>in die Tiefe</em> uebertragen statt nur an der Oberflaeche.<br>'
                        + '<strong>Folge der Geometrie:</strong> Aspect Ratio (Tiefe / Breite) typ. $5\\ldots 20$ &mdash; deutlich mehr als beim klassischen Waermeleitschweissen (AR $\\approx 1$, halbkreisfoermige Schmelze). Ein Faserlaser mit $4\\,\\text{kW}$ schweisst S355 mit $4\\,\\text{m/min}$ ueber $\\sim 5\\,\\text{mm}$ tief in einer Lage.<br>'
                        + '<strong>Konsequenz fuer Prozessfuehrung:</strong> Keyhole-Schweissungen sind dynamisch instabil &mdash; Spritzer, Wurzelporen durch zusammenklappende Keyholes. Loesung: Strahlbewegung (Oszillation, "Wobble"), Hybrid-Verfahren (Laser + MAG), Filter-Optiken mit dynamischer Fokussteuerung. Bei zu niedriger Leistungsdichte fuellt sich das Keyhole zu &rArr; Uebergang in Waermeleitmodus &rArr; Aspect Ratio sinkt.<br>'
                        + 'Quelle: DVS-Merkblatt 3203 (Laserstrahlschweissen Stahl), Steen/Mazumder "Laser Material Processing" 4. Aufl. 2010.'
                },
                {
                    q: 'Was unterscheidet das <strong>Plasma-Stichlochschweissen</strong> (ISO 4063: 152) vom WIG-Schweissen?',
                    h: 'Eingeschnuerter Lichtbogen + Stichlocheffekt.',
                    s: 'Beim <strong>Plasma-Stichlochschweissen</strong> wird der Lichtbogen durch eine wassergekuehlte Kupfer-Duese (Plasma-Duese) <strong>eingeschnuert</strong> &mdash; die Energiedichte steigt auf das $\\sim 10$-fache eines WIG-Lichtbogens, der Strahl ist nahezu parallel statt konisch. Zusaetzlich wird durch die Duese ein Plasmagas (Argon oder Ar/H$_2$) gefuehrt, das den Lichtbogen einschnuert und das Plasma mit hoher Geschwindigkeit beschleunigt.<br>'
                        + '<strong>Stichlocheffekt:</strong> bei Blechdicken bis $\\sim 8\\,\\text{mm}$ (Stahl) bzw. $6\\,\\text{mm}$ (Al) durchstoesst das Plasma das Werkstueck vollstaendig &mdash; es entsteht ein durchgehendes "Stichloch" im Schmelzbad, das hinter dem Plasma-Strahl wieder verlaeuft und die Naht ohne Wurzelschweissung ausbildet. Aequivalent zum Laser-Keyhole, aber mit deutlich geringerem Anlageninvestment.<br>'
                        + '<strong>Unterschiede zu WIG:</strong><br>'
                        + '&bull; eingeschnuerter (Plasma) statt freier (WIG) Lichtbogen;<br>'
                        + '&bull; deutlich hoehere Energiedichte, hoehere Schweissgeschwindigkeit;<br>'
                        + '&bull; Stichlocheffekt &rArr; einlagige Verbindung bis $\\sim 8\\,\\text{mm}$ ohne Nahtvorbereitung;<br>'
                        + '&bull; geringere thermische WEZ, weniger Verzug.<br>'
                        + 'Quelle: DIN EN ISO 4063:2010 (Verfahren 15: Plasma), DVS 0938-1 (Plasma-Schweissen).'
                },
                {
                    q: 'Bei einer <strong>FSW (Friction-Stir-Welding)</strong>-Naht aus AlMgSi (EN AW 6082-T6) werden Schweissgeschwindigkeit $v = 200\\,\\text{mm/min}$ und Drehzahl $n = 1500\\,\\text{min}^{-1}$ verwendet. Was bedeutet dies fuer den <strong>Vorschubpro-Umdrehung</strong> $f$, und welche typische Streckenenergie ist zu erwarten?',
                    h: '$f = v/n$.',
                    s: '<strong>Vorschub pro Umdrehung:</strong><br>'
                        + '$$f = \\frac{v}{n} = \\frac{200\\,\\text{mm/min}}{1500\\,\\text{min}^{-1}} = 0{,}133\\,\\text{mm/U}.$$'
                        + 'Typischer FSW-Bereich fuer Al ist $f = 0{,}1\\ldots 0{,}5\\,\\text{mm/U}$ &mdash; der gewaehlte Wert liegt am unteren Ende ("hot welding"), d.h. viel Reibwaerme pro Vorschubschritt, weiches Materialfluss, eher grobe Mikrostruktur.<br>'
                        + '<strong>Streckenenergie</strong> nach Schmidt/Hattel 2008:<br>'
                        + '$$E = \\frac{P_\\text{Werkzeug}}{v} = \\frac{2\\pi n \\cdot M}{v}.$$'
                        + 'Mit typischem Werkzeugmoment $M = 30\\,\\text{Nm}$ fuer 5-mm-Al:<br>'
                        + '$$P = 2\\pi \\cdot 25\\,\\text{s}^{-1} \\cdot 30\\,\\text{Nm} \\approx 4710\\,\\text{W}.$$'
                        + '$$E = \\frac{4710\\,\\text{W}}{200/60\\,\\text{mm/s}} = \\frac{4710}{3{,}33} \\approx 1413\\,\\text{J/mm} \\approx 1{,}4\\,\\text{kJ/mm}.$$'
                        + '$\\boxed{E \\approx 1{,}4\\,\\text{kJ/mm}}$ &mdash; in der typischen FSW-Bandbreite ($0{,}8\\ldots 2{,}5\\,\\text{kJ/mm}$).<br>'
                        + 'Quelle: Mishra/Ma "Friction Stir Welding and Processing" Mater. Sci. Eng. R 50 (2005); DIN EN ISO 25239-3.'
                },
                {
                    q: 'Was sind die typischen <strong>Punktschweissparameter</strong> beim RP-Schweissen von $2 \\times 1\\,\\text{mm}$ Karosserie-Stahl (DP600), und was bedeutet die Faustformel "Punktabstand $\\geq 3d_e$"?',
                    h: '$d_e \\approx 5\\sqrt{t}$, $I \\approx 8$&ndash;$11\\,\\text{kA}$.',
                    s: '<strong>Typische Parameter (DVS 2902-2):</strong><br>'
                        + '&bull; Elektrodenkraft: $F_E \\approx 2{,}5\\ldots 4\\,\\text{kN}$;<br>'
                        + '&bull; Schweissstrom: $I_S \\approx 8\\ldots 11\\,\\text{kA}$;<br>'
                        + '&bull; Schweisszeit: $t_S \\approx 200\\ldots 350\\,\\text{ms}$ (10&ndash;18 Perioden bei 50 Hz);<br>'
                        + '&bull; Nachhaltzeit (Forge): $\\approx 100\\,\\text{ms}$ &mdash; Erstarrung unter Kraft, verhindert Lunker und Endkrater.<br>'
                        + '<strong>Faustformel Linsendurchmesser:</strong> $d_e = (4\\ldots 6) \\sqrt{t}$ mit $t$ = Einzelblechdicke in mm; hier $d_e \\approx 5\\sqrt{1} = 5\\,\\text{mm}$.<br>'
                        + '<strong>Punktabstand $a \\geq 3\\,d_e$</strong>: bei kleinerem Abstand fliesst ein erheblicher Teil des Schweissstroms <strong>als Nebenschluss durch bereits geschweisste Punkte</strong>, weil deren Kontaktwiderstand niedrig ist. Folge: der aktuelle Punkt erhaelt zu wenig Strom, die Schweisslinse wird zu klein oder gar keine Verbindung. Daher bei $d_e = 5\\,\\text{mm}$ &rArr; $a \\geq 15\\,\\text{mm}$.<br>'
                        + 'Quelle: DVS-Merkblatt 2902-3:2017 §6, AWS D8.1M:2013.'
                },
                {
                    q: 'Erklaere die Bedeutung der <strong>Lochleibung</strong> bei einer Schraubverbindung und nenne die Grenze nach EC3-1-8.',
                    h: 'Druckspannung Lochwand &mdash; $f_{b,Rd} = k_1 \\alpha_b f_u d t / \\gamma_{M2}$.',
                    s: '<strong>Lochleibung</strong> bezeichnet den Druck, den der Schraubenschaft (oder Bolzen) auf die Innenwand der Bohrung im verbundenen Blech ausuebt. Bei Scherbeanspruchung einer geschraubten Verbindung ist die Lochleibung der Bauteilflanke <em>oft</em> die massgebende Versagensart &mdash; vor dem Abscheren der Schraube selbst, besonders bei duennen Blechen.<br>'
                        + '<strong>Bemessungswert nach DIN EN 1993-1-8:2010 §3.6.1 Tab. 3.4:</strong><br>'
                        + '$$F_{b,Rd} = \\frac{k_1 \\cdot \\alpha_b \\cdot f_u \\cdot d \\cdot t}{\\gamma_{M2}}.$$'
                        + 'Mit:<br>'
                        + '&bull; $k_1 = \\min(2{,}8 e_2/d_0 - 1{,}7;\\; 2{,}5)$ &mdash; Randabstand quer zur Kraft;<br>'
                        + '&bull; $\\alpha_b = \\min(\\alpha_d;\\; f_{ub}/f_u;\\; 1{,}0)$ mit $\\alpha_d = e_1/(3 d_0)$ am Rand bzw. $p_1/(3 d_0) - 0{,}25$ innen;<br>'
                        + '&bull; $f_u$ = Zugfestigkeit des Blechs, $d$ = Schraubendurchmesser, $t$ = Blechdicke;<br>'
                        + '&bull; $\\gamma_{M2} = 1{,}25$.<br>'
                        + 'Beispiel M16 8.8 in S355 ($f_u = 510\\,\\text{MPa}$), $t = 10\\,\\text{mm}$, $e_1 = e_2 = 30\\,\\text{mm}$, $d_0 = 18\\,\\text{mm}$:<br>'
                        + '$k_1 = \\min(2{,}8 \\cdot 30/18 - 1{,}7;\\; 2{,}5) = \\min(2{,}97;\\; 2{,}5) = 2{,}5$;<br>'
                        + '$\\alpha_d = 30/54 = 0{,}556$; $f_{ub}/f_u = 800/510 = 1{,}57$ &rArr; $\\alpha_b = 0{,}556$;<br>'
                        + '$F_{b,Rd} = (2{,}5 \\cdot 0{,}556 \\cdot 510 \\cdot 16 \\cdot 10)/1{,}25 = 90\\,700\\,\\text{N} = 90{,}7\\,\\text{kN}$.<br>'
                        + '$\\boxed{F_{b,Rd} \\approx 90\\,\\text{kN}}$.'
                },
                {
                    q: 'Vergleiche drei <strong>Anziehverfahren</strong> nach VDI 2230-1 &mdash; Drehmoment-, Drehwinkel- und Streckgrenzgesteuertes Anziehen &mdash; bezueglich Streuung der erreichten Vorspannkraft $F_M$.',
                    h: 'Anziehfaktor $\\alpha_A$.',
                    s: 'Die <strong>Vorspannkraft-Streuung</strong> wird in VDI 2230-1:2015 Tab. A8 durch den <em>Anziehfaktor</em> $\\alpha_A = F_{M\\,\\max}/F_{M\\,\\min}$ ausgedrueckt:<br>'
                        + '<strong>1. Drehmomentgesteuert</strong> ($M_A$ via Drehmomentschluessel oder Schlagschrauber):<br>'
                        + '&bull; Streuung des Reibwertes $\\mu$ ($\\pm 10\\,\\%$) wirkt sich voll durch &mdash; $\\sim 90\\,\\%$ des Moments deckt Reibung, nur $\\sim 10\\,\\%$ erzeugt Vorspannkraft. Folge: $\\alpha_A \\approx 1{,}4\\ldots 1{,}6$ (Schlagschrauber unkalibriert: 2,5&ndash;4,0). Klassiker im Allgemeinmaschinenbau.<br>'
                        + '<strong>2. Drehwinkelgesteuert</strong> (Anziehen bis zur Snug-tight-Position, dann definierter Weiterdrehwinkel):<br>'
                        + '&bull; Reibwert-Streuung wird umgangen, da Drehwinkel direkt mit Schraubendehnung korreliert. $\\alpha_A \\approx 1{,}2\\ldots 1{,}3$.<br>'
                        + '<strong>3. Streckgrenzgesteuert</strong> (Steigung $dM/d\\varphi$ wird waehrend des Anziehens ueberwacht; Sensor erkennt Knick = Erreichen von $R_{p0{,}2}$):<br>'
                        + '&bull; $\\alpha_A \\approx 1{,}05\\ldots 1{,}15$ &mdash; nahezu reibwertunabhaengig. Voraussetzung: motorischer Schrauber mit Drehmoment- und Winkelaufnehmer. Klassiker im Motorbau (Pleuel, Zylinderkopf), wo eng-tolerierte Vorspannkraft erforderlich ist.<br>'
                        + '$\\boxed{\\alpha_A: 1{,}5 \\to 1{,}25 \\to 1{,}1\\;(\\text{Moment} \\to \\text{Winkel} \\to \\text{Streckgrenze})}$.<br>'
                        + 'Quelle: VDI 2230-1:2015 §5.4 + Tab. A8.'
                },
                {
                    q: 'Berechne nach <strong>VDI 2230-1 (vereinfacht)</strong> die Montagevorspannkraft $F_M$ einer M12-10.9-Schraube ($A_S = 84{,}3\\,\\text{mm}^2$, $R_{p0{,}2} = 900\\,\\text{MPa}$) bei Ausnutzung $\\nu = 0{,}9$ und Reibwert $\\mu_G = 0{,}12$.',
                    h: '$F_{M,\\max} = \\nu \\cdot R_{p0{,}2} \\cdot A_S \\cdot k_\\tau$ &mdash; mit $k_\\tau \\approx 0{,}9$ fuer Standardreibung.',
                    s: 'VDI 2230-1:2015 §5.4 vereinfachte Formel fuer Streckgrenzen-Ausnutzung:<br>'
                        + '$$F_{M,\\max} \\approx \\nu \\cdot R_{p0{,}2} \\cdot A_S \\cdot \\sqrt{1 - 3\\left(\\frac{3 d_2}{2 d_S} \\cdot \\frac{P/\\pi + 1{,}155 \\mu_G d_2}{d_2}\\right)^2}.$$'
                        + 'In der gaengigen Naeherung wird der Wurzelterm $k_\\tau \\approx 0{,}9$ fuer typische Reibwerte $\\mu_G \\approx 0{,}10\\ldots 0{,}14$ (entspricht der reduzierten Streckgrenze unter Schubspannung aus dem Anziehmoment).<br>'
                        + 'Einsetzen:<br>'
                        + '$$F_{M,\\max} \\approx 0{,}9 \\cdot 900\\,\\text{N/mm}^2 \\cdot 84{,}3\\,\\text{mm}^2 \\cdot 0{,}9 = 61\\,470\\,\\text{N}.$$'
                        + '$\\boxed{F_{M,\\max} \\approx 61{,}5\\,\\text{kN}}$.<br>'
                        + 'Vorhaltefaktor $\\alpha_A = 1{,}4$ (drehmomentgesteuert): $F_{M,\\min} = F_{M,\\max}/\\alpha_A \\approx 44\\,\\text{kN}$ als minimale verlaessliche Vorspannkraft im Betrieb. Quelle: VDI 2230-1:2015 Gl. (5.4/1) und Tab. A8.'
                },
                {
                    q: 'Eine Welle ($d_F = 80\\,\\text{mm}$) wird in eine Nabe mit Aussendurchmesser $D_A = 160\\,\\text{mm}$ gepresst. Es liegt ein effektives Uebermass $U_\\text{eff} = 50\\,\\mu\\text{m}$ vor. Berechne den Fugendruck $p_F$ fuer Stahl/Stahl ($E = 210\\,\\text{GPa}$, $\\nu = 0{,}3$).',
                    h: '$p_F = E \\cdot U_\\text{eff}/(d_F \\cdot K)$ mit Geometriefaktor $K$.',
                    s: 'Nach DIN 7190-1:2017 (Berechnung eines Pressverbandes mit Innenteil) gilt fuer vollwellige Welle in elastischer Nabe (Q = $d_F/D_A$):<br>'
                        + '$$p_F = \\frac{E \\cdot U_\\text{eff}}{d_F} \\cdot \\frac{1}{K}, \\quad K = \\frac{1 + Q^2}{1 - Q^2} + \\nu_A \\;-\\; (\\nu_I - 1).$$'
                        + 'Fuer Welle-Vollmaterial (Innenteil ohne Bohrung, $Q_I = 0$) vereinfacht sich der Stahl/Stahl-Fall (DIN 7190-1, Tab. 5):<br>'
                        + '$$p_F = \\frac{E \\cdot U_\\text{eff}}{d_F \\cdot K^*}, \\quad K^* = \\frac{2}{1 - Q^2}.$$'
                        + 'Hier $Q = 80/160 = 0{,}5$:<br>'
                        + '$$K^* = \\frac{2}{1 - 0{,}25} = 2{,}667.$$'
                        + '$$p_F = \\frac{210\\,000\\,\\text{N/mm}^2 \\cdot 0{,}050\\,\\text{mm}}{80\\,\\text{mm} \\cdot 2{,}667} = \\frac{10\\,500}{213{,}3} = 49{,}2\\,\\text{N/mm}^2.$$'
                        + '$\\boxed{p_F \\approx 49\\,\\text{MPa}}$.<br>'
                        + 'Pruefen: Streckgrenze C45 ($R_{p0{,}2} \\approx 430\\,\\text{MPa}$) wird nicht ueberschritten &mdash; Pressverband bleibt elastisch.'
                },
                {
                    q: 'Welche Vor- und Nachteile hat die <strong>Chromsaeure-Anodisierung CAA</strong> (BAC 5555) gegenueber der Phosphorsaeure-Anodisierung PAA (ASTM D3933) bei Klebvorbehandlung von Aluminium-Strukturen in der Luftfahrt?',
                    h: 'Dichte vs. poroese Schichtstruktur, REACH.',
                    s: '<strong>CAA (Chromic Acid Anodizing):</strong><br>'
                        + '&bull; bildet eine $2\\ldots 5\\,\\mu\\text{m}$ dicke, dichte, an der Aussenseite porig zerklueftete Aluminiumoxidschicht (Saeulen-Struktur mit Wabenoeffnungen);<br>'
                        + '&bull; ausgezeichnete Haftung &mdash; Klebstoff dringt mechanisch in Poren ein und bildet Mikroverhakung;<br>'
                        + '&bull; sehr gute <em>Hydrolysebestaendigkeit</em> (Langzeitfeuchte) &mdash; Goldstandard fuer Luftfahrt;<br>'
                        + '&bull; <strong>Problem:</strong> Chromsaeure-Bad enthaelt Cr(VI), <em>REACH SVHC</em> &mdash; seit 2017 (Cr-VI Sunset Date) genehmigungspflichtig, faktisch in der EU nur noch mit Sonderzulassung verwendbar.<br>'
                        + '<strong>PAA (Phosphoric Acid Anodizing):</strong><br>'
                        + '&bull; bildet $\\sim 400\\,\\text{nm}$ duenne Schicht mit poroeser Oberflaeche, Wabenstruktur mit Phosphat-Ueberzug;<br>'
                        + '&bull; sehr hohe Anfangsklebkraft (eher hoeher als CAA);<br>'
                        + '&bull; <em>etwas niedrigere</em> Langzeit-Feucht-Bestaendigkeit als CAA, in modernen Anwendungen aber als gleichwertig akzeptiert;<br>'
                        + '&bull; <strong>Cr-VI-frei</strong> &mdash; REACH-konform.<br>'
                        + 'Konsequenz: Boeing/Airbus haben CAA in den vergangenen 15 Jahren weitgehend durch PAA (BAC 5632, Airbus AIPS 02-01-007) bzw. neuer durch <em>Sol-Gel-Verfahren</em> (AC-130, AC-131) ersetzt.<br>'
                        + 'Quelle: ASTM D3933-98(2017), Airbus PS 12-30-602.'
                },
                {
                    q: 'Was sind die typischen <strong>Belastungsarten einer Klebverbindung</strong> (Schaeluen, Spalten, Schub, Zug), und welche ist am unguenstigsten?',
                    h: 'Schubparallel = guenstig, Schaelung = unguenstig.',
                    s: 'Klebverbindungen tragen am besten <strong>flaechig</strong> &mdash; die Konstruktionsregel ist, Spannungen ueber die gesamte Klebflaeche zu verteilen.<br>'
                        + '<strong>1. Schub parallel zur Klebflaeche</strong> (Scherzug): die Klebschicht wird auf <em>Schub</em> beansprucht, Spannungen sind ueber die Laenge der Ueberlappung relativ gleichmaessig verteilt (Volkersen-Modell zeigt Spitzen an den Raendern; mehr dazu in L3-Aufgaben). <em>Tragfaehigste Belastungsart</em>.<br>'
                        + '<strong>2. Zug normal zur Klebflaeche</strong> (Stirnzug): Spannungen relativ gleichmaessig, aber begrenzt durch die Querfestigkeit der Klebung. Mittel.<br>'
                        + '<strong>3. Spalten (Cleavage):</strong> Lasteinleitung am Rand der Klebung mit Momentanteil &mdash; an einer Stelle entsteht Spannungsspitze, die mit zunehmender Lasteinleitung weiterlaeuft. <em>Schlechter Lastfall</em>.<br>'
                        + '<strong>4. Schaelen (Peeling):</strong> einseitig elastisch flexibles Bauteil wird vom anderen abgezogen; an der Schaellinie konzentriert sich die Spannung auf eine schmale Zone &mdash; Risslaengs-Energiefreisetzungsrate steigt mit jedem Millimeter Schaellaenge. <strong>Schlechtester Lastfall:</strong> oft Bruchspannung &lt; 10 % der Scherzug-Festigkeit.<br>'
                        + 'Konstruktionsregel: Bauteile so gestalten, dass <em>moeglichst nur Schub</em> auftritt &mdash; z.B. durch Sicken, Falzen, Hinterschneidungen, die Schaelkraefte abblocken.<br>'
                        + 'Quelle: Habenicht "Kleben" 6. Aufl. Springer 2009 §10; DIN EN 15870.'
                },
                {
                    q: 'Was sind die Vorteile des <strong>Stanznietens mit Halbhohlniet</strong> gegenueber dem Punktschweissen bei Mischbauweise (Stahl-Alu) im Karosseriebau?',
                    h: 'Kein Aufschmelzen, kein Lochfraess.',
                    s: '<strong>Punktschweissen bei Mischbauweise:</strong> <em>scheitert in der Regel</em>, weil sich an der Stahl-Al-Grenzschicht sproede intermetallische Phasen (FeAl$_2$, Fe$_2$Al$_5$) bilden, die unter Schwingbelastung versagen. Aluminium leitet ausserdem die Waerme zu schnell ab (vgl. L1-Aufgabe), Stahl ueberhitzt. Klassiche RP-Anlagen sind dafuer ungeeignet.<br>'
                        + '<strong>Stanznieten mit Halbhohlniet (SPR &mdash; Self-Pierce Riveting)</strong> umgeht diese Probleme:<br>'
                        + '&bull; rein mechanisches Verfahren &mdash; keine Hitzeeinbringung, keine intermetallischen Phasen;<br>'
                        + '&bull; der Halbhohlniet stanzt sich durch das obere Blech (z.B. Al-Aussenhaut, 1,5 mm) und spreizt sich im unteren Blech (z.B. DP600-Stahl, 1,0 mm) auf, ohne dieses zu durchstossen &mdash; Aussenseite des Niets bleibt sichtbar, Unterseite glatt;<br>'
                        + '&bull; sehr gute <em>dynamische</em> Festigkeit (besser als RP-Punkt im Stahl-Stahl-Vergleich);<br>'
                        + '&bull; kein Vorbohren noetig &mdash; Taktzeit $&lt; 1\\,\\text{s}$ pro Niet;<br>'
                        + '&bull; Korrosionstrennschicht (Klebstoff oder Lack) zwischen Stahl und Al moeglich &mdash; verhindert galvanische Kontaktkorrosion;<br>'
                        + '&bull; Schiebepruefung und Querschliff bewertbar nach VDA 239-300.<br>'
                        + '<strong>Nachteile:</strong> hoehere Kosten pro Verbindung (Niet $\\sim 0{,}10\\ldots 0{,}30$ EUR vs. Punktschweissung $\\sim 0{,}03$ EUR), grosse C-Buegelzangen (Zugaenglichkeit), erforderliche Nietzufuehrung.<br>'
                        + 'Anwendung: Audi A8/A2 Spaceframe (1994 erstmals serienreif), Range Rover, Ford F-150 Aluminium-Karosserie 2015.'
                },
                {
                    q: 'Was sind <strong>Eigenspannungen</strong> in einer Schweissnaht, wie entstehen sie und wie misst man sie?',
                    h: 'Abkuehlschrumpfung, Zwang.',
                    s: '<strong>Entstehung:</strong> Wenn die heisse Schweissnaht abkuehlt, wuerde sie thermisch schrumpfen ($\\Delta L = \\alpha \\cdot \\Delta T \\cdot L$). Wird die Schrumpfung durch das umgebende, kalte Grundmaterial behindert (innerer Zwang in der Naht durch den umgebenden kalten Bereich, oder aeusserer Zwang durch eine Einspannung), entstehen <strong>Zugeigenspannungen in der Schweissnaht</strong> und <strong>Drucke igenspannungen im Grundmaterial</strong>. Im Maximum erreichen die Zugeigenspannungen die <em>Streckgrenze</em> des Grundwerkstoffs.<br>'
                        + '<strong>Bedeutung:</strong> Zugeigenspannungen reduzieren die <em>Schwingfestigkeit</em>, beguenstigen <em>Spannungsrisskorrosion</em>, fuehren zu <em>Verzug</em> (besonders bei einseitigem Schweissen) und ueberlagern sich mit Betriebsspannungen.<br>'
                        + '<strong>Messverfahren:</strong><br>'
                        + '&bull; <em>Roentgendiffraktion (XRD)</em> &mdash; oberflaechennah ($\\sim 10\\,\\mu\\text{m}$), zerstoerungsfrei, ueber Gitterabstandsaenderung. Genauigkeit $\\pm 20\\,\\text{MPa}$.<br>'
                        + '&bull; <em>Neutronendiffraktion</em> &mdash; bis in $\\sim 30\\,\\text{mm}$ Tiefe, nur an Forschungsreaktoren (HZB, ILL, FRM-II) verfuegbar.<br>'
                        + '&bull; <em>Bohrloch-Methode (Hole Drilling, ASTM E837-13)</em> &mdash; ein kleines Loch ($d \\approx 1\\,\\text{mm}$) wird in eine DMS-Rosette gebohrt; aus der gemessenen Verformung werden die Eigenspannungen rueckgerechnet. Halbzerstoerend, in der Werkstatt einsetzbar.<br>'
                        + '<strong>Abbau</strong>: Spannungsarmgluehen (PWHT) bei $550\\ldots 650\\,^\\circ\\text{C}$ fuer S355, Schwingungsarmgluehen (VSR) als Alternative.'
                },
                {
                    q: 'Wofuer steht die <strong>FAT-Klasse</strong> (z.B. FAT 100, FAT 90) bei einer Schweissverbindung in der Schwingfestigkeitsbemessung, und welche Norm definiert sie?',
                    h: 'Fatigue Class &mdash; Wechsel-Nennspannung bei $2 \\cdot 10^6$ Zyklen.',
                    s: '<strong>FAT-Klasse</strong> (Fatigue Class) bezeichnet die <strong>charakteristische Nennspannungsschwingbreite</strong> $\\Delta\\sigma_C$ (in MPa) einer geschweissten Konstruktionsdetail-Kategorie, bei der das Detail bei <strong>$N = 2 \\cdot 10^6$ Lastwechseln</strong> einen Versagensanteil von $&lt; 5\\,\\%$ (95-%-Ueberlebenswahrscheinlichkeit) zeigt &mdash; bei rein wechselnder Belastung im Nennspannungs-Konzept.<br>'
                        + '<strong>Beispiele (Hobbacher / IIW XIII-1965-03 Recommendations 2008):</strong><br>'
                        + '&bull; <em>FAT 160</em> &mdash; Grundmaterial S355 walzhart, ohne Schweissung.<br>'
                        + '&bull; <em>FAT 90</em> &mdash; Stumpfnaht, beidseitig geschweisst, Wurzel und Decklage NDT-geprueft, B-Bewertung nach ISO 5817.<br>'
                        + '&bull; <em>FAT 71</em> &mdash; Stumpfnaht einseitig mit Wurzeldurchhang.<br>'
                        + '&bull; <em>FAT 36</em> &mdash; Kehlnaht-T-Stoss, Lasteinleitung in den Steg (kritisch &mdash; Wurzelversagen).<br>'
                        + 'Die <strong>Woehlerkurve</strong> setzt sich zusammen aus Steigung $m = 3$ bis $N = 5 \\cdot 10^6$, dann Knick auf $m = 5$ bis $N = 10^8$ (Dauerfestigkeit).<br>'
                        + '<strong>Normen:</strong><br>'
                        + '&bull; <em>Eurocode 3-1-9 (DIN EN 1993-1-9:2010)</em> &mdash; Stahlbau (Bruecken, Hochbau);<br>'
                        + '&bull; <em>IIW Hobbacher Recommendations XIII-2151r4-07</em> &mdash; international anerkannt;<br>'
                        + '&bull; <em>FKM-Richtlinie 2020</em> &mdash; Maschinenbau Deutschland.<br>'
                        + 'Bei Spannungskonzentration (Kerbe) sinkt die zulaessige Schwingbreite drastisch &mdash; das ist im FAT-Wert <em>bereits enthalten</em>, der Konstrukteur darf mit Nennspannung rechnen.'
                },
                {
                    q: 'Was unterscheidet das <strong>Lichtbogen-Bolzenschweissen mit Hubzuendung</strong> (Drawn-Arc Stud Welding, ISO 14555) vom <strong>Spitzenzuendungs-Bolzenschweissen</strong> (Capacitor Discharge), und wo wird welches verwendet?',
                    h: 'Zeitdauer, Bolzendurchmesser, Anwendung.',
                    s: '<strong>Hubzuendung (Drawn-Arc, ISO 4063: 783):</strong><br>'
                        + '&bull; Bolzen wird unter Strom auf das Werkstueck aufgesetzt, dann angehoben (Hub $\\sim 1\\,\\text{mm}$) &mdash; Lichtbogen brennt, beide Flaechen schmelzen auf;<br>'
                        + '&bull; nach Lichtbogenzeit von $100\\ldots 1000\\,\\text{ms}$ (je nach Bolzendurchmesser) wird der Bolzen wieder ins Schmelzbad getaucht;<br>'
                        + '&bull; Keramik- oder Schutzgas-Ferrule schuetzt das Schmelzbad und formt einen Schweisswulst;<br>'
                        + '&bull; <strong>Anwendung:</strong> Bolzen $M5\\ldots M30$ auf Schiffsdecks, Stahlbau (Kopfbolzen-Duebel fuer Verbundbau nach DIN EN ISO 13918), Karosserie-Haltepunkte, Heizungsbau.<br>'
                        + '<strong>Spitzenzuendung (Capacitor Discharge, ISO 4063: 786):</strong><br>'
                        + '&bull; Bolzen hat an seiner Stirnseite eine kleine <em>Zuendspitze</em> ($\\sim 1\\,\\text{mm}$);<br>'
                        + '&bull; Schweissstrom kommt aus einem Kondensator-Bank-Entladung &mdash; Stromzeit $\\sim 1\\ldots 3\\,\\text{ms}$ (also $100\\times$ kuerzer als Hubzuendung);<br>'
                        + '&bull; sehr geringe Waermeeintragung &rArr; <em>kein Verzug</em>, kein Anlauffleck auf der Rueckseite des Blechs &mdash; auch fuer duenne Bleche (Edelstahl-Kuechen, Display-Backplanes) und beschichtete Oberflaechen geeignet;<br>'
                        + '&bull; Bolzendurchmesser begrenzt auf $\\sim M3\\ldots M10$.<br>'
                        + '<strong>Faustregel:</strong> Hubzuendung fuer Lasttragende Bolzen ab $\\sim M8$ und dicke Bleche; Spitzenzuendung fuer Kleinteile auf duennem Blech (Sichtflaechen).<br>'
                        + 'Quelle: DIN EN ISO 14555:2017 (Bolzenschweissen Metall).'
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
                },
                {
                    q: 'Leite das <strong>Volkersen-Modell</strong> fuer die Schubspannung $\\tau(x)$ einer einschnittigen Klebung kurz her und gib die Stelle und den Wert von $\\tau_\\text{max}$ an. Vereinfachende Annahmen klar nennen.',
                    h: 'Differentialgleichung der Klebschicht-Schub, $\\tau\\propto \\cosh(\\beta x)$.',
                    s: '<strong>Annahmen (Volkersen 1938):</strong><br>'
                        + '&bull; beide Fuegeteile sind elastisch, nur auf Zug beansprucht; Klebschicht ist elastisch, nur auf Schub beansprucht;<br>'
                        + '&bull; gleiche Steifigkeit der Fuegeteile $Et$ (sonst Asymmetrie);<br>'
                        + '&bull; <strong>keine</strong> Biegung der Fuegeteile (eccentricity vernachlaessigt) &mdash; das macht das Modell zur unteren Schranke fuer real einschnittige Klebungen, die zusaetzlich Schaelspannung haben (vgl. Goland/Reissner).<br>'
                        + '<strong>DGL:</strong> Aus dem Gleichgewicht im differentiellen Klebelement $\\mathrm{d}x$ und dem Schubgesetz $\\tau = G \\gamma = G (u_1 - u_2)/t_F$ folgt:<br>'
                        + '$$\\frac{\\mathrm{d}^2 \\tau}{\\mathrm{d}x^2} = \\beta^2 \\tau, \\qquad \\beta = \\sqrt{\\frac{2 G}{E \\cdot t \\cdot t_F}}.$$'
                        + 'Loesung mit symmetrischen Randbedingungen ($\\tau(\\pm L/2)$ gleich, beide Lasteinleitungen):<br>'
                        + '$$\\tau(x) = \\tau_\\text{max} \\cdot \\frac{\\cosh(\\beta x)}{\\cosh(\\beta L/2)}, \\qquad \\tau_\\text{max} = \\frac{F}{b} \\cdot \\beta \\cdot \\coth\\!\\left(\\beta L/2\\right) \\cdot \\frac{1}{2}.$$'
                        + '<strong>Stelle:</strong> $\\tau_\\text{max}$ tritt an den <em>Raendern</em> der Ueberlappung ($x = \\pm L/2$) auf, $\\tau_\\text{min}$ in der Mitte ($x = 0$). Bei langer Klebung ($\\beta L \\gg 1$): Mitte fast spannungsfrei &mdash; "die Mitte traegt nichts mit".<br>'
                        + '<strong>Konsequenz:</strong> Verdoppelung von $L$ verdoppelt <em>nicht</em> die Klebkraft &mdash; nur die Steigung der $\\tau(x)$-Kurve aendert sich. Stattdessen Konstruktionsmassnahmen wie Schaeftung, Stufung oder Klebstoff mit niedrigerem $G$ (z.B. zaehelastisches PUR statt sproedes Epoxy) verteilen die Spannung besser.<br>'
                        + 'Quelle: Volkersen "Die Nietkraftverteilung in zugbeanspruchten Nietverbindungen mit konstanten Laschenquerschnitten" Luftfahrtforschung 15 (1938); Habenicht "Kleben" 6. Aufl. §6.'
                },
                {
                    q: 'Wie verhalten sich <strong>Maraging-Staehle</strong> (z.B. 18Ni300, 1.6358) beim Schweissen, und warum gilt fuer sie eine ganz andere Verfahrensweise als fuer un-/niedriglegierte Staehle?',
                    h: 'Wenig C, viel Ni, Ti, Mo; Festigkeit durch Auslagern.',
                    s: '<strong>Werkstoff:</strong> 18Ni300 = $\\sim 18\\,\\%\\,\\text{Ni}$, $\\sim 9\\,\\%\\,\\text{Co}$, $\\sim 5\\,\\%\\,\\text{Mo}$, $\\sim 0{,}7\\,\\%\\,\\text{Ti}$, <strong>$C \\leq 0{,}03\\,\\%$</strong>. Festigkeit kommt nicht aus C-Martensit (zu wenig C), sondern aus einem <em>Ni-Lattice-Martensit</em>, der durch Auslagern bei $\\sim 480\\ldots 510\\,^\\circ\\text{C}$ kohaerente intermetallische Praezipitate ausscheidet (Ni$_3$(Ti, Mo)). Zugfestigkeit nach Auslagern: $R_m \\geq 2000\\,\\text{MPa}$.<br>'
                        + '<strong>Beim Schweissen:</strong><br>'
                        + '&bull; <em>Keine</em> Aufhaertungsprobleme im klassischen Sinn &mdash; ohne C kein C-Martensit, keine Kaltrissgefahr durch Wasserstoff;<br>'
                        + '&bull; <em>Aber</em>: die WEZ wird auf Loesungstemperatur ($820\\,^\\circ\\text{C}$) erwaermt und durchlaeuft den Praezipitations-Temperaturbereich beim Abkuehlen schnell &mdash; die Naht selbst ist nach dem Schweissen <em>weichgegluet</em> ($R_m \\approx 1000\\,\\text{MPa}$, ca. die Haelfte der Auslagerungs-Festigkeit);<br>'
                        + '&bull; <em>Nachbehandlung</em>: vollstaendiges <em>Reauslagern</em> der gesamten Komponente bei $480\\,^\\circ\\text{C}$ fuer 3&ndash;6 h. Die Naht "lernt" die Festigkeit des Grundwerkstoffs zurueck.<br>'
                        + '<strong>Verfahren:</strong> bevorzugt <em>WIG</em> oder <em>Elektronenstrahl/Laser</em> (saubere Schmelze, geringe Streckenenergie). Schutzgas Ar 4.6 oder besser. Schweisszusatzwerkstoff mit gleicher Analyse (z.B. Marlok C1, AMS 6520). Wasserstoffarm wegen Ti-Affinitaet.<br>'
                        + 'Quelle: AMS 6520 (Welding Wire Maraging C300), Yu/Yi "Welding of Maraging Steel" J. Mater. Eng. Perform. 27 (2018).'
                },
                {
                    q: 'Erklaere das Konzept der <strong>$\\delta$-Ferrit-Balance</strong> beim Schweissen von Duplex-Edelstaehlen (z.B. 1.4462 / 2205) und nenne das Werkzeug zur Vorhersage.',
                    h: 'WRC-1992 Diagramm, $Cr_\\text{eq}$ / $Ni_\\text{eq}$.',
                    s: '<strong>Duplex-Werkstoffe</strong> (z.B. 1.4462 / UNS S31803 / 2205) haben im Anlieferzustand eine Mikrostruktur aus $\\sim 50\\,\\%$ Austenit und $\\sim 50\\,\\%$ $\\delta$-Ferrit. Diese Balance ist <em>kuenstlich</em> &mdash; Walzen, Loesungsglueh-Anlassen bei $\\sim 1050\\,^\\circ\\text{C}$ und Wasserabschrecken. Sie liefert hohe Festigkeit ($R_m \\geq 620\\,\\text{MPa}$), gute Zaehigkeit und ausgezeichnete <em>Chloridkorrosionsbestaendigkeit</em> (Spannungsrisskorrosion).<br>'
                        + '<strong>Beim Schweissen</strong> wird die Schweissnaht aus der vollferritischen Schmelze ($\\delta$-Ferrit) abgekuehlt. Bei zu schneller Abkuehlung ($t_{12/8} &lt; 4\\,\\text{s}$) bleibt zu wenig Zeit fuer die diffusionsgesteuerte Bildung von Austenit &mdash; die Naht erstarrt mit $&gt; 80\\,\\%$ Ferrit, was die Zaehigkeit massiv reduziert und die Korrosionsbestaendigkeit zerstoert. Bei zu langsamer Abkuehlung ($t_{12/8} &gt; 30\\,\\text{s}$) entstehen <em>sigma- und chi-Phasen</em> ($\\sim 700\\ldots 950\\,^\\circ\\text{C}$, sproede intermetallische Phasen Cr-Fe-Mo).<br>'
                        + '<strong>Zielfenster:</strong> $t_{12/8} = 8\\ldots 25\\,\\text{s}$ und Ferritgehalt der Naht $30\\ldots 70\\,\\%$, ueberwacht via Ferritscope (Foerster Sensor) nach ISO 17655.<br>'
                        + '<strong>Vorhersage-Werkzeug:</strong> WRC-1992-Diagramm (Welding Research Council). Achsen:<br>'
                        + '&bull; $Cr_\\text{eq} = Cr + Mo + 0{,}7\\,Nb$<br>'
                        + '&bull; $Ni_\\text{eq} = Ni + 35\\,C + 20\\,N + 0{,}25\\,Cu$.<br>'
                        + 'Aus den Werten des Grundwerkstoffs und Zusatzwerkstoffs (gewichtet ueber Aufmischungsgrad $\\sim 30\\,\\%$) wird ein Punkt im WRC-Diagramm gelegt; die FN (Ferrit-Nummer) wird abgelesen. Zielwert FN 30&ndash;70.<br>'
                        + 'Quelle: ASTM A923 (Verfahren A/B/C fuer sigma-Phasen-Nachweis), ISO/TR 17671-3 (Schweissen von Duplexstahl), DVS-Merkblatt 0946.'
                },
                {
                    q: 'Warum sind <strong>aushaertbare AlMgSi-Legierungen</strong> (6xxx) wie EN AW 6082-T6 beim Schweissen <em>rissempfindlich</em>, und welche Schweisszusatzwerkstoffe gleichen das aus?',
                    h: 'Erstarrungsrisse durch Mg-Si-Eutektikum.',
                    s: '<strong>Rissmechanismus:</strong> waehrend der Erstarrung der Schmelze entstehen Resteutektika niedrigschmelzender Mg- und Si-Phasen (z.B. Mg$_2$Si bei $\\sim 595\\,^\\circ\\text{C}$). Diese Filme liegen entlang der Korngrenzen und reduzieren in einem schmalen Temperaturintervall die Zaehigkeit fast auf null. Wenn waehrend dieser Erstarrungsphase Spannungen (Schweissschrumpf, Zwang) auftreten, reissen die Filme auf &mdash; <em>Erstarrungsrisse / Heissrisse</em> (Solidification Cracks) in der Naht.<br>'
                        + '<strong>Empfindlichkeitsbereich:</strong> $0{,}5\\ldots 1{,}5\\,\\%$ Mg+Si bei Mg/Si-Verhaeltnis $\\approx 1{,}73$ (st&ouml;chiometrisches Mg$_2$Si) &mdash; genau der Bereich der 6xxx-Legierungen.<br>'
                        + '<strong>Loesung:</strong> Zumischen von <em>Silizium-reichen</em> oder <em>Magnesium-reichen</em> Zusatzwerkstoffen, um die Naht-Analyse aus dem kritischen Bereich heraus zu verschieben:<br>'
                        + '&bull; <em>S-AlSi5 (AA 4043)</em> &mdash; 5 % Si, verlagert die Naht in den Si-reichen Eutektikum-Bereich, kein Mg$_2$Si-Eutektikum &rArr; rissunempfindlich. Festigkeit der Naht: $\\sim 150\\,\\text{MPa}$.<br>'
                        + '&bull; <em>S-AlMg5 (AA 5356)</em> &mdash; 5 % Mg, verlagert in Mg-Reichen Bereich. Festigkeit: $\\sim 220\\,\\text{MPa}$, etwas rissempfindlicher als 4043 aber besser anodisierbar.<br>'
                        + 'Niemals <em>artgleich</em> (S-AlSi1MgMn = 6082 als Schweisszusatz) schweissen.<br>'
                        + '<strong>Festigkeitsabfall der WEZ:</strong> ist trotz richtigem Zusatz unvermeidbar &mdash; das T6-Gefuege wird in der WEZ ueberaltert (Ostwald-Reifung der Mg$_2$Si-Praezipitate) und faellt von $R_{p0{,}2} = 260\\,\\text{MPa}$ auf $\\sim 120\\,\\text{MPa}$. Konstruktionsregel: AlMgSi-Naehte in Bereichen niedriger Beanspruchung legen oder T6-Behandlung nach dem Schweissen wiederholen.<br>'
                        + 'Quelle: DIN EN 1011-4:2018 (Schweissen von Aluminium), Mathers "The Welding of Aluminium and its Alloys" Woodhead 2002 §7.'
                },
                {
                    q: 'Welche Besonderheit ist beim Schweissen von <strong>Inconel 718</strong> (Ni-Cr-Fe-Nb mit $\\gamma\\\'\\\'$-Aushaertung) zu beachten?',
                    h: 'Strain-Age Cracking durch Nb-haltige $\\gamma\\\'\\\'$-Phase.',
                    s: '<strong>Werkstoff:</strong> Inconel 718 (UNS N07718) ist eine Nickel-Basis-Superlegierung mit $\\sim 53\\,\\%\\,\\text{Ni}$, $19\\,\\%\\,\\text{Cr}$, $18\\,\\%\\,\\text{Fe}$, $5\\,\\%\\,\\text{Nb}$, $3\\,\\%\\,\\text{Mo}$. Festigkeit kommt aus der kohaerenten $\\gamma\\\'\\\'$-Phase ($\\text{Ni}_3\\text{Nb}$, Bo-Volumen-Praezipitate) nach Loesungsgluehen $+$ Doppelauslagerung. Anwendung: Turbinen-Scheiben (Aerospace), bis $\\sim 650\\,^\\circ\\text{C}$.<br>'
                        + '<strong>Schweissproblem &mdash; Strain-Age Cracking (SAC):</strong><br>'
                        + 'Bei der Waermebehandlung <em>nach</em> dem Schweissen (Solution + Aging) wird die Naht-WEZ durch das Aging-Fenster ($\\sim 650\\ldots 760\\,^\\circ\\text{C}$) gefahren. In dieser Zeit:<br>'
                        + '&bull; <em>scheidet</em> die WEZ $\\gamma\\\'\\\'$ aus &rArr; volumenbehaftete Festigkeitssteigerung;<br>'
                        + '&bull; <em>gleichzeitig</em> wirken Eigenspannungen aus dem Schweissen, die durch die ploetzliche Festigkeitssteigerung nicht mehr relaxieren koennen;<br>'
                        + '&bull; Folge: spontane Risse in der WEZ <em>waehrend</em> der Waermebehandlung (auch wenn die Schweissnaht sauber war).<br>'
                        + '<strong>Gegenmassnahmen:</strong><br>'
                        + '&bull; Schweissen im <em>weichen</em> Zustand (loesungsgegluet), nicht im voll ausgehaerteten T-Zustand;<br>'
                        + '&bull; vor dem Aging eine <em>Stress-Relief</em>-Behandlung ($\\sim 980\\,^\\circ\\text{C}$, 1 h) durchfuehren &mdash; baut Eigenspannungen ab, bevor sie mit dem Aushaerteprozess konkurrieren;<br>'
                        + '&bull; sehr <em>niedrige Streckenenergie</em> (geringer Eigenspannungs-Eintrag) &mdash; bevorzugt EBW (Elektronenstrahl) oder Laser anstelle WIG;<br>'
                        + '&bull; Zusatzwerkstoff Inconel 625 (UNS N06625, niedrigerer Nb-Gehalt, $\\gamma\\\'\\\'$-frei) statt artgleichem 718 fuer reparaturkritische Anwendungen.<br>'
                        + 'Quelle: AMS 5832 (Welding Wire Inconel 718), DuPont/Lippold/Kiser "Welding Metallurgy and Weldability of Nickel-Base Alloys" Wiley 2009 §6.'
                },
                {
                    q: 'Wie funktioniert das <strong>Diffusionsschweissen</strong> ($\\text{Ti}_6\\text{Al}_4\\text{V}$ mit superplastischer Umformung kombiniert, SPF/DB), und warum ist es im Triebwerksbau attraktiv?',
                    h: 'Pressung, Vakuum, Halbschmelzgrenze, atomare Diffusion.',
                    s: '<strong>Diffusionsschweissen (Diffusion Bonding, DB, ISO 4063: 45):</strong> Beide Fuegeflaechen werden hochrein praepariert (Plansauber, Oxidationsfrei), miteinander in Kontakt gebracht und im <em>Vakuum</em> oder unter Schutzgas auf typ. $0{,}5\\ldots 0{,}8 \\cdot T_\\text{Schmelz}$ erwaermt, dann mit moderater Pressung (5&ndash;30 MPa) ueber Stunden gehalten. Die Verbindung entsteht durch atomare Diffusion ueber die Grenzflaeche und Rekristallisation &mdash; <em>ohne</em> Aufschmelzen, ohne Schweisszusatz.<br>'
                        + '<strong>$\\text{Ti}_6\\text{Al}_4\\text{V}$-Spezialfall:</strong> Ti hat eine geringe Loeslichkeit fuer O/N/H und neigt sehr stark zur Oberflaechenoxidation. Im Diffusionsschweissprozess wird der Ti-Oxidfilm durch Loesung im Grundwerkstoff "verdaut" (statt mechanisch zerstoert) &mdash; das macht Ti zum <em>besten</em> Diffusionsschweiss-Werkstoff.<br>'
                        + '<strong>Kombination SPF/DB</strong> (Superplastic Forming + Diffusion Bonding):<br>'
                        + '&bull; $\\text{Ti}_6\\text{Al}_4\\text{V}$ zeigt bei $\\sim 925\\,^\\circ\\text{C}$ <em>superplastisches Verhalten</em> (Dehnung &gt; 500 %);<br>'
                        + '&bull; In <strong>einem</strong> Werkzeugzyklus werden mehrere Bleche zunaechst durch DB an definierten Stellen miteinander verbunden, danach wird die Struktur durch Gasdruck <em>superplastisch</em> aufgeblasen &mdash; die Bleche dehnen sich zwischen den Schweissinseln zu Stuetzwaben.<br>'
                        + '<strong>Triebwerksbau-Anwendung:</strong> Hohl-Schaufeln in Fan-Stufen (z.B. Rolls-Royce Trent &mdash; Wide-Chord-Hollow-Fan-Blade), Leitschaufel-Cluster, hochbelastete Strukturen mit minimaler Masse.<br>'
                        + 'Quelle: ASM Handbook Vol. 6 "Welding, Brazing, and Soldering" §"Diffusion Welding"; AGARD-CP-256 (Superplastic Forming).'
                },
                {
                    q: 'Wann ist <strong>Spannungsarmgluehen (PWHT)</strong> nach dem Schweissen vorgeschrieben, und welche Konsequenzen hat es metallurgisch?',
                    h: 'Druckbehaelter, Dicke, AD2000.',
                    s: '<strong>Vorschrift PWHT</strong> (Post-Weld Heat Treatment, Spannungsarmgluehen / Stress Relieving):<br>'
                        + '&bull; <em>Druckbehaelter</em> nach AD 2000-Merkblatt HP 7/1 (DE) bzw. ASME BPVC Sec. VIII Div. 1 §UCS-56 (US) &mdash; abhaengig von Werkstoffgruppe (P-Number) und Wanddicke. Bsp. P355GH ab $t &gt; 35\\,\\text{mm}$.<br>'
                        + '&bull; <em>Schweissnaehte in CrMo-Staehlen</em> (z.B. 13CrMo4-5, 10CrMo9-10) ab geringer Dicke fast immer, um Spannungsrisskorrosion zu vermeiden.<br>'
                        + '&bull; <em>Schweissungen mit kompliziertem Spannungsfeld</em> (Stutzen, T-Stoesse mit Zwang) auf Anweisung des Konstrukteurs.<br>'
                        + '<strong>Temperatur-Halte-Zeit-Regime:</strong> typ. $t = 1\\,\\text{h pro 25\\,\\text{mm}}$ Wanddicke, mindestens 1 h.<br>'
                        + '&bull; un-/niedriglegierte Staehle (S235, S355, P265GH, P355GH): $550\\ldots 620\\,^\\circ\\text{C}$.<br>'
                        + '&bull; CrMo-Staehle (P22, 10CrMo9-10): $680\\ldots 720\\,^\\circ\\text{C}$.<br>'
                        + '&bull; CrMoV-Staehle (P91): $730\\ldots 760\\,^\\circ\\text{C}$.<br>'
                        + 'Aufheiz-/Abkuehlrate $\\leq 100\\,\\text{K/h}$ ab $\\sim 300\\,^\\circ\\text{C}$.<br>'
                        + '<strong>Metallurgische Konsequenzen:</strong><br>'
                        + '&bull; <em>Erwuenscht:</strong> Abbau von Eigenspannungen auf $\\sim 30\\,\\%$ des Streckgrenze-Wertes, Diffusion von Wasserstoff ("Aushydrierung"), Anlassen der martensitischen WEZ zu zaehem Anlassgefuege.<br>'
                        + '&bull; <em>Unerwuenscht:</strong> Carbid-Vergroeberung, in CrMo-Staehlen <em>Anlassversproedung</em>, in Duplex-Stahl <em>sigma-Phasen-Bildung</em> (vgl. eigene Aufgabe). Bei P91 darf $750\\,^\\circ\\text{C}$ nie ueberschritten werden &mdash; sonst Loesung der $M_{23}C_6$-Carbide und Verlust der Kriechfestigkeit.<br>'
                        + 'Quelle: AD 2000-Merkblatt HP 7/1, ASME BPVC Sec. VIII Div. 1 Table UCS-56, DIN EN 13445-4 §10.'
                },
                {
                    q: 'Erklaere die <strong>Bohrlochmethode</strong> nach ASTM E837 zur Eigenspannungsmessung &mdash; mathematisches Grundgesetz und Genauigkeitsgrenzen.',
                    h: 'DMS-Rosette, Bohrtiefe $\\sim d_0$, Spannungen aus Verformung.',
                    s: '<strong>Verfahren:</strong> eine standardisierte 3-DMS-Rosette (Vishay CEA-XX-062UM, Type A/B/C) wird auf die Bauteiloberflaeche geklebt; in das Zentrum der Rosette wird ein Sackloch $d_0 \\approx 1{,}6\\ldots 2{,}0\\,\\text{mm}$, Tiefe $0{,}4 \\cdot d_0$ gebohrt. Durch das Loch werden die <em>oberflaechennahen</em> Eigenspannungen "freigegeben" &mdash; das Material relaxiert lokal, die Rosette misst die Dehnungs-Aenderungen $\\varepsilon_1, \\varepsilon_2, \\varepsilon_3$ in den drei Messrichtungen $0^\\circ, 45^\\circ, 90^\\circ$.<br>'
                        + '<strong>Mathematik (homogenes biaxiales Spannungsfeld):</strong><br>'
                        + 'Aus den drei Dehnungen lassen sich die beiden Hauptspannungen $\\sigma_\\text{max}, \\sigma_\\text{min}$ und der Hauptwinkel $\\varphi$ ableiten:<br>'
                        + '$$\\sigma_\\text{max,min} = \\frac{\\varepsilon_1 + \\varepsilon_3}{4 \\bar{A}} \\pm \\frac{1}{4 \\bar{B}} \\sqrt{(\\varepsilon_1 - \\varepsilon_3)^2 + (\\varepsilon_1 - 2\\varepsilon_2 + \\varepsilon_3)^2},$$'
                        + '$$\\tan 2\\varphi = \\frac{\\varepsilon_1 - 2\\varepsilon_2 + \\varepsilon_3}{\\varepsilon_1 - \\varepsilon_3}.$$'
                        + 'Mit den dimensionslosen Kalibrierkonstanten $\\bar{A}, \\bar{B}$ aus ASTM E837-13 Tab. 1 (FE-Simulation, abhaengig von Lochdurchmesser / Rosettengeometrie / Loch-Tiefe / Werkstoff).<br>'
                        + '<strong>Genauigkeit:</strong> bei homogenem Spannungsfeld $\\pm 30\\,\\text{MPa}$, bei stark inhomogenem (Schweissnahtrand) $\\pm 80\\,\\text{MPa}$. Bei Spannungs<em>gradienten</em> ueber die Tiefe ist die Integral-Methode mit gestufter Bohrung zu verwenden (Schajer-Integralmethode, ASTM E837 §8). Begrenzung auf $\\sim 80\\,\\%\\,R_{p0{,}2}$ &mdash; darueber sind plastische Effekte nicht mehr zu vernachlaessigen.<br>'
                        + 'Quelle: ASTM E837-13 "Standard Test Method for Determining Residual Stresses by the Hole-Drilling Strain-Gage Method".'
                },
                {
                    q: 'Erklaere fuenf <strong>FAT-Detail-Klassen</strong> von Schweisskonstruktionen nach IIW Hobbacher Recommendations und ordne sie absteigend (FAT 160 bis FAT 36) zu.',
                    h: 'Grundmaterial bis Kreuzstoss-Kehlnaht.',
                    s: 'IIW-Empfehlungen (Hobbacher 2008 / 2016) listen $\\sim 80$ Konstruktionsdetail-Kategorien fuer die Schwingfestigkeitsbemessung. Aus dem Maschinen- und Stahlbau die wichtigsten:<br>'
                        + '<strong>FAT 160</strong> &mdash; <em>Grundwerkstoff</em> walzhart, ohne jede Schweissung. Theoretischer Maximalwert.<br>'
                        + '<strong>FAT 125</strong> &mdash; <em>Maschinenbearbeitete Stumpfnaht</em>, Naht bearbeitet (frei von Kerbe), beidseitig geschweisst, Bewertungsgruppe B.<br>'
                        + '<strong>FAT 90</strong> &mdash; <em>Stumpfnaht</em>, beidseitig geschweisst, Wurzelnaht und Decklage NDT-geprueft, Bewertungsgruppe B. Geeignet fuer Standard-Druckbehaelter und Bruecken.<br>'
                        + '<strong>FAT 80</strong> &mdash; <em>Querstoss-Steg-Kehlnaht</em>, durchgeschweisst, lokales Detail (Anschlussblech-Stirnseite). Versagen am Kehlnaht-Wurzelpunkt oder Naht-Uebergang.<br>'
                        + '<strong>FAT 71</strong> &mdash; <em>einseitig geschweisste Stumpfnaht</em> ohne Gegenlage (Wurzeldurchhang moeglich).<br>'
                        + '<strong>FAT 50</strong> &mdash; <em>laengsbelastete Kehlnaht</em> bei Anbauteilen ($\\sim 50\\,\\text{mm}$ Anbaulaenge); Naht-Uebergang ist Kerbe.<br>'
                        + '<strong>FAT 36</strong> &mdash; <em>nicht durchgeschweisste Kreuzstoss-Kehlnaht</em> mit Wurzelversagen (Steg unter Zug, Wurzelpunkt ist Risskeim). Schlechteste Detail-Kategorie &mdash; in Schwingungsanwendungen unbedingt vermeiden.<br>'
                        + '<strong>Werkstoffabhaengigkeit:</strong> FAT-Klassen gelten unabhaengig vom Stahltyp (S235, S355, S690) &mdash; die Festigkeit des Grundwerkstoffs spielt im Nennspannungs-Konzept keine Rolle, weil das <em>Detail</em> (Kerbe) die Lebensdauer dominiert. Erst bei kerbarmen Details &gt; FAT 100 zeigt sich der Werkstoffeinfluss.<br>'
                        + 'Quelle: IIW Doc. XIII-2151r4-07 "Recommendations for Fatigue Design of Welded Joints and Components"; DIN EN 1993-1-9 Tab. 8.1&ndash;8.10.'
                },
                {
                    q: 'Leite die <strong>Rosenthal-Loesung</strong> fuer das Temperaturfeld einer wandernden Linien-Punktquelle in einem halbunendlichen Bauteil her und nenne ihre Annahmen.',
                    h: 'Stationaere Punktquelle, mitbewegtes Koordinatensystem.',
                    s: '<strong>Annahmen (Rosenthal 1941):</strong><br>'
                        + '&bull; halbunendlicher, isotroper Koerper, konstante Materialwerte ($\\lambda, \\rho c$);<br>'
                        + '&bull; Punktquelle (3D) bzw. Linienquelle (2D, dicke Bleche) mit konstanter Leistung $q$, die mit konstanter Geschwindigkeit $v$ in x-Richtung wandert;<br>'
                        + '&bull; <em>stationaerer</em> (zeitunabhaengiger) Zustand im mit der Quelle mitbewegten Koordinatensystem $\\xi = x - vt$;<br>'
                        + '&bull; keine Phasenuebergaenge, keine konvektive Waermeableitung durch die Schmelze (das macht Rosenthal zur Idealisierung &mdash; Marangoni-, Lorentz-Stroemung bleiben unberuecksichtigt).<br>'
                        + '<strong>3D-Loesung (Punktquelle, Halbraum):</strong><br>'
                        + '$$T(\\xi, r) - T_0 = \\frac{q}{2\\pi \\lambda \\cdot R} \\cdot \\exp\\!\\left(- \\frac{v (R + \\xi)}{2 \\alpha}\\right),$$'
                        + 'mit $R = \\sqrt{\\xi^2 + r^2}$, $r = \\sqrt{y^2 + z^2}$, Temperaturleitfaehigkeit $\\alpha = \\lambda/(\\rho c)$ und Wirkungsgrad-korrigierter Quellleistung $q = \\eta \\cdot U I$.<br>'
                        + '<strong>2D-Loesung (Linienquelle, duenne Bleche):</strong><br>'
                        + '$$T(\\xi, r) - T_0 = \\frac{q/t}{2\\pi \\lambda} \\cdot \\exp\\!\\left(-\\frac{v \\xi}{2\\alpha}\\right) \\cdot K_0\\!\\left(\\frac{v R}{2\\alpha}\\right),$$'
                        + 'mit $K_0$ = modifizierte Bessel-Funktion 2. Art. Blechdicke $t$ skaliert die Quellleistung.<br>'
                        + '<strong>Praktische Anwendung:</strong> Bestimmung der WEZ-Breite (Isotherme bei $A_{c1} = 723\\,^\\circ\\text{C}$ fuer Stahl), Schmelzzonenform (Isotherme bei $T_\\text{liq} \\approx 1500\\,^\\circ\\text{C}$), $t_{8/5}$-Abkuehlzeit. Begrenzungen: in der Naehe der Quelle ($R \\to 0$) divergiert die Loesung &mdash; das wird durch lineare Quellenverteilungen (Goldak-Doppel-Ellipsoid) realistischer modelliert.<br>'
                        + 'Quelle: Rosenthal "Mathematical Theory of Heat Distribution During Welding and Cutting" Welding J. 20 (1941) 220s; Goldak/Akhlaghi "Computational Welding Mechanics" Springer 2005.'
                },
                {
                    q: 'Leite den <strong>Lamé-Spannungszustand</strong> einer dickwandigen Pressverbindung her: Tangential- und Radialspannung an der Fuge und am Aussendurchmesser.',
                    h: 'Hohlzylinder unter Innendruck, $\\sigma_t$ am Innenradius maximal.',
                    s: '<strong>Lamésche Gleichungen</strong> fuer einen dickwandigen Hohlzylinder unter Innendruck $p_i$, Aussendruck $p_a = 0$ (Innenradius $r_i$, Aussenradius $r_a$):<br>'
                        + '$$\\sigma_r(r) = \\frac{r_i^2 p_i}{r_a^2 - r_i^2} \\cdot \\left(1 - \\frac{r_a^2}{r^2}\\right),$$'
                        + '$$\\sigma_t(r) = \\frac{r_i^2 p_i}{r_a^2 - r_i^2} \\cdot \\left(1 + \\frac{r_a^2}{r^2}\\right).$$'
                        + 'Auf der Fuge der Nabe ($r = r_i$, also Innenradius der Nabe = Fugendurchmesser $d_F/2$) ergibt sich der <em>Fugendruck</em>:<br>'
                        + '$$\\sigma_r(r_i) = -p_F.$$'
                        + 'Die Tangentialspannung an der Fuge:<br>'
                        + '$$\\sigma_t(r_i) = p_F \\cdot \\frac{r_a^2 + r_i^2}{r_a^2 - r_i^2} = p_F \\cdot \\frac{1 + Q^2}{1 - Q^2},$$'
                        + 'mit Durchmesserverhaeltnis $Q = d_F/D_A$. Dies ist der <em>kritische Punkt</em> &mdash; hier ist die Vergleichsspannung am hoechsten.<br>'
                        + 'Aussenoberflaeche ($r = r_a$):<br>'
                        + '$$\\sigma_r(r_a) = 0, \\qquad \\sigma_t(r_a) = p_F \\cdot \\frac{2 r_i^2}{r_a^2 - r_i^2} = p_F \\cdot \\frac{2 Q^2}{1 - Q^2}.$$'
                        + '<strong>Vergleichsspannung Tresca</strong> auf der Fuge:<br>'
                        + '$$\\sigma_v = \\sigma_t(r_i) - \\sigma_r(r_i) = p_F \\cdot \\frac{1 + Q^2}{1 - Q^2} + p_F = p_F \\cdot \\frac{2}{1 - Q^2}.$$'
                        + 'Forderung: $\\sigma_v \\leq R_{p0{,}2,\\text{Nabe}}/\\nu$, sonst plastisches Aufweiten der Nabe. Mit $Q = 0{,}5 \\Rightarrow \\sigma_v = 2{,}67\\,p_F$ &mdash; bei $p_F = 100\\,\\text{MPa}$ sind $\\sigma_v = 267\\,\\text{MPa}$ &lt; $R_{p0{,}2}$ einer C45-Nabe ($\\approx 430\\,\\text{MPa}$).<br>'
                        + 'Quelle: DIN 7190-1:2017 §4; Roark/Young "Formulas for Stress and Strain" 7. Aufl. Tab. 28.'
                },
                {
                    q: 'Erklaere das <strong>Steifigkeitsdreieck</strong> der Schraubenverbindung nach VDI 2230-1 und seine Bedeutung fuer das Verspannungs-Diagramm.',
                    h: 'Federkonstanten $\\delta_S$, $\\delta_P$, Lasteinleitungsfaktor $n$.',
                    s: 'Eine Schraubenverbindung wird in VDI 2230-1:2015 als <strong>Parallelschaltung zweier Federn</strong> modelliert:<br>'
                        + '&bull; <em>Schrauben-Nachgiebigkeit</em> $\\delta_S = \\sum_i l_i/(E_S \\cdot A_i)$ &mdash; aus Gewindekern, Schaft, Kopf;<br>'
                        + '&bull; <em>Plattennachgiebigkeit</em> $\\delta_P$ &mdash; ueber den Druckkegel (Rotscher-Modell): die Druckspannung breitet sich vom Kopf in einem Kegel mit halbem Oeffnungswinkel $\\sim 30^\\circ$ aus.<br>'
                        + '<strong>Steifigkeitsdreieck im Verspannungsdiagramm</strong> ($F$ ueber $\\delta$):<br>'
                        + '&bull; Schraube wird in Zug gespannt (positive Steigung $1/\\delta_S$);<br>'
                        + '&bull; Platten werden gleichzeitig in Druck verspannt (negative Steigung $-1/\\delta_P$);<br>'
                        + '&bull; im Schnittpunkt der beiden Geraden bei der Montagevorspannkraft $F_M$ liegt der Arbeitspunkt vor Belastung.<br>'
                        + '<strong>Lasteinleitungsfaktor $n$</strong> beruecksichtigt, dass die Betriebslast $F_A$ nicht an Kopf und Mutter angreift, sondern <em>im Inneren</em> der verspannten Platten (z.B. Flansch mit Dichtung). Effektive Schraubenkraft-Aenderung bei Betriebslast:<br>'
                        + '$$F_{SA} = \\frac{n \\, \\delta_P}{\\delta_S + \\delta_P} \\cdot F_A = n \\, \\Phi_K \\cdot F_A,$$'
                        + 'mit Krafteinleitungsfaktor $\\Phi_K = \\delta_P/(\\delta_S + \\delta_P)$. Typische Werte $n = 0{,}3\\ldots 0{,}5$, $\\Phi_K = 0{,}1\\ldots 0{,}3$ &rArr; <em>nur 3&ndash;15&nbsp;%</em> der Betriebslast erreichen die Schraube zusaetzlich zur Vorspannkraft &mdash; das ist der Sinn der Vorspannung: die Schraube wird ueber das Vorspannungs-Niveau hinaus kaum staerker belastet.<br>'
                        + '<strong>Folgerung:</strong> hoehere Plattennachgiebigkeit (z.B. weiche Dichtung) <em>vergroessert</em> die zyklische Spannungsamplitude in der Schraube &mdash; deshalb sind Soft-Joints (Gummidichtung) schwingbruchgefaehrdet.<br>'
                        + 'Quelle: VDI 2230-1:2015 §5.2 + Bild 5.4-1.'
                },
                {
                    q: 'Was ist der <strong>Setz-Verlust</strong> einer Schraubenverbindung, wie quantifiziert ihn VDI 2230, und welche Massnahmen reduzieren ihn?',
                    h: 'Glaetten der Rauheitsspitzen, $f_z$.',
                    s: '<strong>Setz-Verlust</strong> (Setzbetrag $f_z$): nach der Montage werden die Rauheitsspitzen ($R_z$) der Kontaktflaechen zwischen Schraubenkopf/Mutter und Bauteil sowie zwischen den verspannten Bauteilen unter der Vorspannkraft <em>geplaettet</em>. Die wirksame Klemmlaenge verkuerzt sich um $f_z$, die Schraubendehnung sinkt entsprechend &mdash; das ergibt einen <strong>Vorspannkraftverlust</strong>:<br>'
                        + '$$F_Z = \\frac{f_z}{\\delta_S + \\delta_P}.$$'
                        + '<strong>Typische Setzbetraege nach VDI 2230-1 Tab. A5</strong> (in $\\mu\\text{m}$ pro Trennfuge / pro Gewindegang):<br>'
                        + '&bull; Trennfuge unter Schraubenkopf (Stahl/Stahl, $R_z = 10\\,\\mu\\text{m}$): $f_z \\approx 3\\,\\mu\\text{m}$.<br>'
                        + '&bull; Trennfuge zwischen verspannten Teilen: $f_z \\approx 3\\,\\mu\\text{m}$.<br>'
                        + '&bull; Mutter-Auflage: $f_z \\approx 3\\,\\mu\\text{m}$.<br>'
                        + '&bull; Gewindegang: $f_z \\approx 3\\,\\mu\\text{m}$.<br>'
                        + '&rArr; Summe bei 3 Trennfugen + Gewinde: $\\sum f_z \\approx 12\\,\\mu\\text{m}$.<br>'
                        + 'Beispielrechnung M12-Schraube mit $\\delta_S = 5{,}5 \\cdot 10^{-6}\\,\\text{mm/N}$, $\\delta_P = 0{,}9 \\cdot 10^{-6}\\,\\text{mm/N}$:<br>'
                        + '$$F_Z = \\frac{12 \\cdot 10^{-3}\\,\\text{mm}}{6{,}4 \\cdot 10^{-6}\\,\\text{mm/N}} = 1875\\,\\text{N} \\approx 1{,}9\\,\\text{kN}.$$'
                        + '<strong>Gegenmassnahmen:</strong><br>'
                        + '&bull; <em>Anzahl der Trennfugen</em> reduzieren (keine Beilagscheiben, wenn nicht zwingend erforderlich).<br>'
                        + '&bull; <em>Oberflaechen glaetten</em> (Rz < 6 $\\mu$m, geschliffen statt gefraest).<br>'
                        + '&bull; <em>Nachziehen</em> nach $\\sim 1\\,\\text{h}$ Setzzeit (klassiche Methode im Anlagenbau bei kritischen Verbindungen).<br>'
                        + '&bull; <em>Vorspannungs-Verlust einkalkulieren</em> &mdash; $F_M$ ueber das benoetigte Minimum hoeher waehlen (Faktor $\\alpha_A$ und $F_Z$ aus VDI 2230 in die Bemessung einrechnen).<br>'
                        + 'Quelle: VDI 2230-1:2015 §5.4.2 und Tab. A5.'
                },
                {
                    q: 'Welche drei <strong>Bruchmoden einer Klebverbindung</strong> kennt DIN EN ISO 10365 (AF, CF, MF), und was deuten sie aus?',
                    h: 'Adhaesion, Kohaesion, Materialbruch.',
                    s: '<strong>AF &mdash; Adhaesionsbruch</strong> ("adhesive failure"): die Klebschicht loest sich vollstaendig von <em>einer</em> der Fuegeflaechen ab. Die andere Flaeche ist mit Klebstoff bedeckt. <em>Deutung:</em> die Klebstoff-Substrat-Anbindung ist die schwaechste Stelle &mdash; meist ein Hinweis auf <em>unzureichende Oberflaechenvorbereitung</em> (Fett, Trennmittel, Oxidschicht nicht entfernt) oder falsche Materialpaarung (Klebstoff/Substrat).<br>'
                        + '<strong>CF &mdash; Kohaesionsbruch</strong> ("cohesive failure"): der Bruch verlaeuft <em>innerhalb</em> der Klebschicht. Beide Fuegeflaechen sind nach dem Bruch mit Klebstoff bedeckt. <em>Deutung:</em> der Klebstoff selbst ist die schwaechste Komponente &mdash; <strong>idealer Bruchmodus</strong>, weil die Anbindung an die Substrate die Festigkeit des Klebstoffs erreicht. Klebstoff-Wahl ist Optimierungspotenzial.<br>'
                        + '<strong>MF / SF &mdash; Materialbruch</strong> ("substrate failure"): das Substrat selbst bricht ausserhalb der Klebung; die Klebverbindung haelt einer hoeheren Last stand als das Bauteil. <em>Deutung:</em> Klebverbindung ist <em>ueberdimensioniert</em> bzgl. des Substrats &mdash; bei Faserverbund (CFK/GFK) ist das oft ein klassisches Versagensmuster.<br>'
                        + '<strong>Praxis-Kombinationen:</strong> reale Klebungen zeigen oft <em>Mischbrueche</em>. DIN EN ISO 10365 verlangt eine prozentuale Schaetzung pro Bruchmode, z.B. "70 % CF, 20 % AF, 10 % MF". In Pruefberichten wird die Bruchflaeche fotografiert (heute zusaetzlich digital ausgewertet, z.B. ImageJ-Pixelanalyse).<br>'
                        + '<strong>Konsequenzen fuer die Qualitaetspruefung:</strong> ein Pruefkoerper mit hoher Festigkeit aber dominantem AF-Modus ist <em>kritisch</em> &mdash; im Feldbetrieb (Feuchte, Alterung) faellt die Adhaesion frueher als die Kohaesion ab, die Festigkeit kann unvorhersehbar zusammenbrechen. Akzeptanzkriterien fuer Luftfahrt-Klebungen: $&gt; 90\\,\\%$ CF.<br>'
                        + 'Quelle: DIN EN ISO 10365:2022 "Klebstoffe &mdash; Bezeichnung der wichtigsten Bruchbilder".'
                },
                {
                    q: 'Erklaere den Unterschied zwischen <strong>Bainit und Martensit</strong> in der WEZ einer C45-Schweissung und ihre Bedeutung fuer die Zaehigkeit.',
                    h: 'Diffusionskontrollierte vs. diffusionslose Umwandlung.',
                    s: '<strong>Martensit (M):</strong> entsteht bei <em>schneller</em> Abkuehlung (t$_{8/5} &lt; 5\\,\\text{s}$ fuer C45). Die kubisch-flaechenzentrierte $\\gamma$-Austenit-Struktur wandelt sich <em>diffusionslos</em> durch Scher-Mechanismus in eine tetragonal verzerrte $\\alpha\\prime$-Phase. Der Kohlenstoff bleibt zwangsgeloest in den oktaedrischen Luecken &mdash; das verzerrt das Gitter (Tetragonalitaet $c/a &gt; 1$) und macht das Material <em>hart und sproede</em>.<br>'
                        + '&bull; Haerte C45-Martensit: $\\sim 700\\,\\text{HV}$ ($\\approx 60\\,\\text{HRC}$).<br>'
                        + '&bull; Bruchzaehigkeit Charpy-Kerbschlagarbeit: $K_V &lt; 10\\,\\text{J}$ bei Raumtemperatur &mdash; sproed.<br>'
                        + '&bull; Risiko: <em>Kaltrisse</em> in der WEZ unter Wasserstoff-Einfluss, besonders an Wurzelnaht.<br>'
                        + '<strong>Bainit (B):</strong> entsteht bei <em>mittlerer</em> Abkuehlung ($t_{8/5} \\approx 10\\ldots 30\\,\\text{s}$). Es handelt sich um eine <em>diffusionskontrollierte</em> Umwandlung: der Austenit zerlegt sich in <strong>ferritische Lamellen</strong> mit dazwischen ausgeschiedenen <strong>Carbiden</strong> (Fe$_3$C-Plaettchen). Die Carbide sind zu fein, um das Material sproede zu machen, aber zu zahlreich, um es weich zu lassen.<br>'
                        + '&bull; <strong>Oberbainit (oB, 400&ndash;550 $^\\circ$C):</strong> grobe Carbide an Korngrenzen &mdash; mittlere Zaehigkeit.<br>'
                        + '&bull; <strong>Unterbainit (uB, 250&ndash;400 $^\\circ$C):</strong> feine intragranulare Carbide &mdash; <em>beste Kombination aus Festigkeit und Zaehigkeit</em>; in Hochfest-Konstruktionsstaehlen (S690QL, S960QL) angestrebt.<br>'
                        + 'Haerte: $\\sim 350\\ldots 450\\,\\text{HV}$; $K_V \\sim 50\\,\\text{J}$.<br>'
                        + '<strong>Konsequenz fuer Schweisspraxis:</strong> man steuert $t_{8/5}$ so, dass das WEZ-Gefuege im (unteren) Bainit-Bereich landet. Wird das aufgrund von Bauteildicke / Werkstoff (CET hoch) nicht erreicht, hilft Anlassen (PWHT, $\\sim 600\\,^\\circ\\text{C}$) &mdash; Martensit wird zu Anlass-Martensit (zaehbainitisches Gefuege), Haerte sinkt, Zaehigkeit steigt.<br>'
                        + 'Quelle: Bargel/Schulze "Werkstoffkunde" 12. Aufl. 2018 §10.4, ZTU-Diagramm C45 (Atlas of Isothermal Transformation, ASM 1977).'
                },
                {
                    q: 'Was ist <strong>FSSW (Friction Stir Spot Welding)</strong> und welche Vorteile bringt es gegenueber dem klassischen Punktschweissen (RP) im Aluminium-Karosseriebau?',
                    h: 'Reibruehrpunktschweissen, kein Schmelzen.',
                    s: '<strong>FSSW (Friction Stir Spot Welding):</strong> rotierendes Werkzeug (Schulter $\\sim 10\\ldots 15\\,\\text{mm}$, Pin $\\sim 5\\,\\text{mm}$, Drehzahl $1500\\ldots 3000\\,\\text{min}^{-1}$) wird in zwei uebereinanderliegende Bleche eingetaucht. Die Reibung erzeugt Waerme &mdash; das Material wird plastifiziert (aber <em>nicht</em> aufgeschmolzen). Nach typ. $1\\ldots 3\\,\\text{s}$ Eintauchzeit wird das Werkzeug zurueckgezogen; im Zentrum bleibt eine charakteristische Vertiefung (Keyhole) zurueck.<br>'
                        + '<strong>Varianten:</strong> einfaches FSSW (mit Keyhole), Refill-FSSW (Mazda/Helmholtz: Schulter und Pin trennen sich, Pin geht weiter rein, Schulter fuellt das Loch wieder; ohne Keyhole), Swing-FSSW (Werkzeug schwenkt nach dem Eintauchen).<br>'
                        + '<strong>Vorteile gegenueber RP:</strong><br>'
                        + '&bull; <em>Aluminium-tauglich</em> &mdash; ohne hochstrom-Kupferelektroden, ohne Schmelzphase, ohne Spritzer; bei RP sind Al-Punktschweissungen wegen hoher Waermeleitfaehigkeit und Cu-Migration ins Al kritisch (s. L1).<br>'
                        + '&bull; <em>Mischbau Stahl-Al</em> moeglich &mdash; das Werkzeug rotiert in der weicheren Al-Seite, die Stahl-Seite wird nur an der Grenzflaeche thermomechanisch aktiviert; sehr duenne intermetallische Schicht $&lt; 5\\,\\mu\\text{m}$ &rArr; gute Festigkeit, kein klassisches IMC-Versagen.<br>'
                        + '&bull; <em>Energieverbrauch</em> $\\sim 30\\,\\%$ eines RP-Punktes.<br>'
                        + '&bull; <em>Geringe Verformung / WEZ</em> &mdash; mechanischer Energie-Eintrag konzentriert sich auf das Schweisszentrum.<br>'
                        + '<strong>Nachteile:</strong> langsamer als RP ($\\sim 2\\,\\text{s}$ vs. $\\sim 0{,}3\\,\\text{s}$), grosse Gegenhaltergewichte, sichtbares Werkzeug-Keyhole (sofern nicht Refill-Variante).<br>'
                        + '<strong>Serienanwendung:</strong> Mazda RX-8 Heckklappe (2003, weltweit erstes Serien-FSSW), Toyota Prius, Honda Civic Heckklappe.<br>'
                        + 'Quelle: DIN EN ISO 18785 (FSSW Aluminium); Awang/Mucino "Friction Stir Spot Welding" Procedia Engineering 2017.'
                },
                {
                    q: 'Wie verbindet man im Karosseriebau einen <strong>Mischstoss Stahl-Aluminium</strong>, wenn weder Punktschweissen noch klassisches Schmelzschweissen einsetzbar sind? Nenne und vergleiche drei Verfahren.',
                    h: 'Stanznieten, Kleben, FSSW.',
                    s: 'Klassisches Schmelzschweissen scheitert an der Bildung sproeder intermetallischer Phasen (IMC: Fe$_2$Al$_5$, FeAl$_3$, FeAl$_2$), die in einer Schmelze unkontrolliert wachsen und Zugspannungen aufnehmen, aber kaum dynamische Lasten ertragen. Industrielle Loesungen:<br>'
                        + '<strong>1. Stanznieten (SPR &mdash; Self-Pierce Riveting, ISO 4063: 791):</strong><br>'
                        + '&bull; Halbhohlniet aus Stahl (typ. 6.8 / 1.0050) stanzt sich durch Al-Aussenhaut (1,5 mm) und spreizt sich im Stahlblech;<br>'
                        + '&bull; rein mechanisch &mdash; <em>keine IMC</em>;<br>'
                        + '&bull; Klebstoff dazwischen verhindert galvanische Kontaktkorrosion;<br>'
                        + '&bull; Festigkeit pro Niet (Schubzug): $\\sim 4\\ldots 6\\,\\text{kN}$;<br>'
                        + '&bull; Beispiel: Audi A8 Spaceframe, Ford F-150 (~ 3000 SPR pro Auto).<br>'
                        + '<strong>2. Strukturkleben (1K-Epoxy oder 1K-PUR):</strong><br>'
                        + '&bull; flaechige Verbindung &mdash; verteilt Last besser als Punktverbindung, hoehere Steifigkeit der Karosserie;<br>'
                        + '&bull; CAA/PAA-Vorbehandlung der Al-Seite zwingend (s. L2);<br>'
                        + '&bull; <em>nie alleine</em> &mdash; immer in Kombination mit punktbasiertem Verfahren (Punktschweisskleben &harr; rivbonding), um Procezsbedingt-Sicherung bis zum Aushaerten des Klebstoffs zu gewaehrleisten;<br>'
                        + '&bull; haerter dauerhaft erst nach KTL-Lacktrocknung (ED-Coat, $\\sim 180\\,^\\circ\\text{C}$, 20 min).<br>'
                        + '<strong>3. FSSW (Friction Stir Spot Welding):</strong><br>'
                        + '&bull; Werkzeug rotiert auf der weicheren Al-Seite, Stahl-Seite wird nur thermomechanisch aktiviert;<br>'
                        + '&bull; sehr duenne IMC-Schicht $&lt; 5\\,\\mu\\text{m}$, gute Festigkeit;<br>'
                        + '&bull; geringere Energie als RP, kein Spritzer.<br>'
                        + '<strong>Vergleich:</strong> SPR ist mengenmaessig dominant (Karosseriebau), Strukturkleben liefert die Steifigkeit (Crash-Performance), FSSW ist eine Nischenloesung fuer Sonderpunkte. In der Praxis kombiniert (z.B. "Bond&amp;Pierce": Klebstoff + SPR auf einer Naht).<br>'
                        + 'Quelle: VDA 239-300 (Stanznieten), Mathers Welding of Aluminium 2002 §9, Audi-Karosseriebau-Whitepaper "Audi Spaceframe A8".'
                },
                {
                    q: 'Berechne den <strong>Pcm- und das X-Faktor</strong>-Wert (Wasserstoffversproedungs-Index) fuer einen hochfesten Stahl S690QL und erlaeutere die Aussage von $X &lt; 12$ bzw. $&lt; 17$.',
                    h: '$P_{cm} = C + Si/30 + (Mn+Cu+Cr)/20 + Ni/60 + Mo/15 + V/10 + 5B$.',
                    s: '<strong>Beispiel-Analyse S690QL (DIN EN 10025-6):</strong><br>'
                        + 'C = 0{,}16, Si = 0{,}40, Mn = 1{,}40, Cu = 0{,}30, Cr = 0{,}40, Ni = 1{,}50, Mo = 0{,}50, V = 0{,}05, B = 0{,}002 (Massen-%).<br>'
                        + '<strong>Pcm-Wert (Ito / Bessyo, 1968)</strong> &mdash; "carbon equivalent for crack measurement", korreliert mit Kaltrissempfindlichkeit:<br>'
                        + '$$P_{cm} = C + \\frac{Si}{30} + \\frac{Mn + Cu + Cr}{20} + \\frac{Ni}{60} + \\frac{Mo}{15} + \\frac{V}{10} + 5B.$$'
                        + 'Einsetzen:<br>'
                        + '$$P_{cm} = 0{,}16 + \\frac{0{,}40}{30} + \\frac{1{,}40 + 0{,}30 + 0{,}40}{20} + \\frac{1{,}50}{60} + \\frac{0{,}50}{15} + \\frac{0{,}05}{10} + 5 \\cdot 0{,}002$$'
                        + '$$= 0{,}160 + 0{,}013 + 0{,}105 + 0{,}025 + 0{,}033 + 0{,}005 + 0{,}010 = 0{,}351.$$'
                        + '$\\boxed{P_{cm} \\approx 0{,}35}$ &mdash; hoch, S690QL ist <em>kaltrissempfindlich</em>; Vorwaermen $\\geq 150\\,^\\circ\\text{C}$ empfohlen.<br>'
                        + '<strong>X-Faktor (Wasserstoff-Diffusion-Index, JSSC 1981)</strong> &mdash; in der UCI-Bewertung der Schweisseignung gegen wasserstoffinduzierte Risse:<br>'
                        + '$$X = 10\\,P_{cm} + \\log_{10}(H_D),$$'
                        + 'mit $H_D$ in $\\text{ml/100\\,g}$ (Wasserstoffgehalt im Schweissgut).<br>'
                        + 'Bei wasserstoffarmem Verfahren (basisch umhuellte Elektroden DIN EN ISO 2560-A: E xxxx B; basisch-MAG mit Ar-CO$_2$-Gemisch), $H_D \\leq 5\\,\\text{ml/100\\,g}$:<br>'
                        + '$$X = 10 \\cdot 0{,}35 + \\log_{10}(5) = 3{,}5 + 0{,}70 = 4{,}2.$$'
                        + 'Bei feuchten Bedingungen, $H_D = 15$: $X = 3{,}5 + 1{,}18 = 4{,}7$.<br>'
                        + '<strong>Bewertung:</strong> $X &lt; 12$ gilt fuer normale Bauteildicken als <em>akzeptabel</em>; $X &lt; 17$ ist die Grenze fuer dicke Bauteile mit hoher Steifigkeit. Im obigen Beispiel liegt $X$ deutlich unter beiden Grenzen &mdash; aber nur, wenn das wasserstoffarme Verfahren eingehalten wird (basisch umhuellte Elektroden, Trockenlagerung, Vorwaermen bei dicken Bauteilen).<br>'
                        + 'Quelle: DIN EN 1011-2:2001 Anhang C; Ito/Bessyo "Cracking parameter of high strength steels related to heat-affected zone cracking" J. Japan Welding Soc. 37 (1968).'
                }
            ]
        ]
    };
})();
