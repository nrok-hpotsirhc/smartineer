/*
 * Sensorik — industrielle Messtechnik und Sensorprinzipien.
 *
 * Quellen (oeffentlich, mit Auflage/Jahr):
 *   - Hering/Schoenfelder: Sensoren in Wissenschaft und Technik, Springer Vieweg,
 *     2. Aufl. 2018 (ISBN 978-3-658-12561-5).
 *   - Profos/Pfeifer: Handbuch der industriellen Messtechnik, 7. Aufl., Oldenbourg
 *     Industrieverlag 2002 (Standardwerk).
 *   - Schrueffer/Reindl/Zagar: Elektrische Messtechnik, Hanser, 12. Aufl. 2018.
 *   - DIN EN 60751:2009 (Pt100/Pt1000-Kennlinie, Toleranzklassen A/B/AA).
 *   - DIN EN 60584-1:2014 (Thermoelement-Grundwerte, Typen K, J, T, S, R, B, N, E).
 *   - DIN EN 61131-9:2014 (IO-Link — Single-Drop-Digital-Communication-Interface).
 *   - DIN EN 60529:2014 (IP-Schutzarten).
 *   - DIN EN 61508:2010 (Funktionale Sicherheit, SIL-Level, PFD/PFH).
 *   - VDI/VDE 2600 (Metrologie-Begriffe).
 *
 * Konventionen:
 *   - SI-Einheiten, schmale Schutzraeume via `\,`.
 *   - Pt100: Bezugswiderstand $R_0 = 100\,\Omega$ bei $0\,{}^\circ\text{C}$,
 *     Temperaturkoeffizient $\alpha = 3{,}851\cdot 10^{-3}\,\text{K}^{-1}$
 *     (Klasse W0.00385, Industriestandard nach DIN EN 60751).
 *   - Thermoelement Typ K (NiCr-Ni): mittlere Empfindlichkeit
 *     $\approx 41\,\mu\text{V/K}$ (Messbereich -270 bis +1372 °C).
 *   - 4...20 mA: Live-Zero-Stromschnittstelle nach NAMUR NE 43 (3,6/3,8 mA und
 *     21 mA als Diagnose-Bereiche).
 */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'sensorik';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Sensorik',
        desc: 'Industrielle Messtechnik: Sensorprinzipien (resistiv, kapazitiv, induktiv, optisch, piezoelektrisch), Temperatur-/Druck-/Dehnungs-/Hall-/Encoder-/IMU-Sensoren, Kenngrößen (Sensitivität, Linearität, Hysterese, Drift), Signalkonditionierung (Wheatstone, Verstärkung, A/D), Schnittstellen (4-20 mA, IO-Link, IEPE) und Funktionssicherheit (IEC 61508).',
        formulas: `
            <strong>Statische Kenngrössen</strong><br>
            Empfindlichkeit (Sensitivity): $S = \\dfrac{dy}{dx}$ bei Arbeitspunkt.<br>
            Linearitätsfehler (best fit): $\\Delta_\\text{lin} = \\max|y_\\text{ist}-y_\\text{lin}|/y_\\text{FS}$ in % FS.<br>
            Hysterese: $H = \\max|y_\\uparrow - y_\\downarrow|/y_\\text{FS}$ in % FS.<br>
            Auflösung digital: $\\Delta x = x_\\text{FS}/2^N$ (N-Bit-ADC).<br>
            Genauigkeit (accuracy class) = Summe aus systematischen Fehlern (Linearität, Hysterese, Offset, Verstärkung, Temperaturdrift).<br><br>

            <strong>Pt100 (DIN EN 60751:2009)</strong><br>
            Linearer Bereich: $R(\\vartheta) \\approx R_0 (1 + \\alpha\\,\\vartheta)$ mit
            $R_0 = 100\\,\\Omega$, $\\alpha = 3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}$.<br>
            Quadratisch (Callendar–Van-Dusen, $0\\,{}^\\circ\\text{C} \\le \\vartheta \\le 850\\,{}^\\circ\\text{C}$):
            $R(\\vartheta) = R_0[1 + A\\vartheta + B\\vartheta^2]$ mit
            $A=3{,}9083\\cdot 10^{-3}$, $B=-5{,}775\\cdot 10^{-7}$.<br>
            Toleranzklassen: AA ($\\pm 0{,}1\\,\\text{K}$ bei $0\\,{}^\\circ\\text{C}$), A ($\\pm 0{,}15$), B ($\\pm 0{,}3$).<br><br>

            <strong>Thermoelement (Seebeck-Effekt, DIN EN 60584-1)</strong><br>
            $U_\\text{th} = \\int_{T_\\text{ref}}^{T} (S_A(T)-S_B(T))\\,dT$ — Spannung
            entsteht im Temperaturgradient, nicht am Verbindungspunkt.<br>
            Typ K (NiCr-Ni): $\\approx 41\\,\\mu\\text{V/K}$ bei Raumtemperatur,
            -270 bis +1372 °C. <strong>Vergleichsstelle</strong> erforderlich!<br><br>

            <strong>NTC / PTC / Steinhart-Hart</strong><br>
            NTC-$\\beta$-Modell: $R(T)=R_{25}\\,\\exp\\!\\left[\\beta\\left(\\dfrac{1}{T}-\\dfrac{1}{T_{25}}\\right)\\right]$ mit $T$ in Kelvin.<br>
            Steinhart-Hart: $\\dfrac{1}{T}=A+B\\ln R+C(\\ln R)^3$ — genauer ueber weiten Temperaturbereich; $A,B,C$ aus drei Kalibrierpunkten.<br>
            PTC: positiver Temperaturkoeffizient; Widerstand steigt mit Temperatur, oft fuer Schutz-/Schaltfunktionen.<br><br>

            <strong>Dehnungsmessstreifen (DMS, Wheatstone-Brücke)</strong><br>
            $\\dfrac{\\Delta R}{R} = k \\cdot \\varepsilon$ (k-Faktor ≈ 2 für Konstantan).<br>
            Halbbrücke: $\\dfrac{U_a}{U_B} = \\dfrac{k\\,\\varepsilon}{2}$ (Temperatur-kompensiert).<br>
            Vollbrücke: $\\dfrac{U_a}{U_B} = k\\,\\varepsilon$ (höchste Empfindlichkeit).<br>
            Biegebalken mit Poisson-Effekt: effektiver Faktor haeufig $k_\\text{eff}=k(1+\\nu)$, z.B. $k=2$, $\\nu=0{,}3$ -> $k_\\text{eff}=2{,}6$.<br><br>

            <strong>Kapazitive Sensoren</strong><br>
            $C = \\varepsilon_0\\varepsilon_r\\dfrac{A}{d}$ — Änderung von $A$, $d$ oder
            $\\varepsilon_r$ wird messtechnisch ausgewertet.<br><br>

            <strong>Induktiv (LVDT) / Wirbelstrom</strong><br>
            Bewegung eines Ferritkerns ändert die Kopplung zweier Sekundärspulen;
            Wirbelstromsensor detektiert leitfähige Objekte über Bedämpfung des Schwingkreises.<br><br>

            <strong>Piezoelektrischer Sensor (IEPE / ICP)</strong><br>
            $Q = d_{ij}\\cdot F$ (Ladung proportional zur Kraft).<br>
            Ausgangsspannung über Ladungsverstärker: $U_a = -Q/C_F$.<br>
            <strong>Nur dynamische Messungen</strong> (Ladung leckt ab) — typ. Hochpass bei 0,1–1 Hz.<br><br>

            <strong>Hall-Sensor</strong><br>
            $U_H = \\dfrac{R_H \\cdot I \\cdot B}{d}$ mit Hall-Konstante $R_H = 1/(n\\,e)$.
            Wichtig für berührungslose Strommessung und Lageerkennung.<br><br>

            <strong>Encoder</strong><br>
            Inkremental: zwei Kanäle A/B (90° versetzt) plus Indexkanal Z; Auflösung
            $4\\cdot N$ Schritte/Umdrehung mit N Strichen (4-fach-Auswertung).<br>
            Absolut: Single-Turn liefert Position innerhalb einer Umdrehung
            (z.B. 13 Bit = 8192 Schritte), Multi-Turn zählt Umdrehungen (z.B. 12 Bit).<br>
            Gray-Code vermeidet Doppelsprünge an Bitgrenzen.<br>
            Sin/Cos-Interpolation: $\\varphi=\\operatorname{atan2}(S,C)$; Teilung $T$ mit $M$ Interpolationsschritten ergibt $\\Delta x=T/M$.<br>
            SSI: synchron-seriell, Clock vom Master, Daten MSB-first; typisch Gray-Code bis 25 Bit und Takt im MHz-Bereich.<br><br>

            <strong>IMU (MEMS)</strong><br>
            Beschleunigungssensor: kapazitiver Comb-Drive misst Auslenkung einer Federmasse.<br>
            Gyroskop: Coriolis-Effekt $\\vec F_C = -2m\\,\\vec\\Omega\\times\\vec v$ an
            oszillierender Masse.<br>
            Allan-Varianz: log-log-Steigungen helfen Bias-Instabilitaet, White Noise, Rate Random Walk und Drift zu unterscheiden.<br>
            Kalman-Filter (linear): Prediction $\\hat x_k^- = A\\hat x_{k-1}+Bu_k$, $P_k^- = AP_{k-1}A^T+Q$; Update $K_k=P_k^-H^T(HP_k^-H^T+R)^{-1}$, $\\hat x_k=\\hat x_k^-+K_k(z_k-H\\hat x_k^-)$.<br>
            Bayes-Fusion zweier unabhaengiger Normalmessungen: $\\sigma^{-2}=\\sigma_1^{-2}+\\sigma_2^{-2}$, $\\mu=\\sigma^2(\\mu_1/\\sigma_1^2+\\mu_2/\\sigma_2^2)$.<br>
            Magnetometer-Kalibrierung: $\\vec B_\\text{korr}=\\mathbf A^{-1}(\\vec B-\\vec b)$ (Hard-Iron-Offset $\\vec b$, Soft-Iron-Matrix $\\mathbf A$).<br><br>

            <strong>4...20 mA (NAMUR NE 43)</strong><br>
            Live-Zero-Stromschleife: $4\\,\\text{mA} = 0\\,\\%$, $20\\,\\text{mA} = 100\\,\\%$
            Messbereich. NAMUR NE 43 (1994): $\\le 3{,}6\\,\\text{mA}$ oder $\\ge 21\\,\\text{mA}$ = Fehler;
            Mess-Untergrenze $3{,}8\\,\\text{mA}$, Obergrenze $20{,}5\\,\\text{mA}$.
            Vorteile: Drahtbruchsicher, eingeprägter Strom unempfindlich gegen Spannungsabfall.<br>
            Linearabbildung: $I=4\\,\\text{mA}+16\\,\\text{mA}\\cdot \\dfrac{x-x_\\text{min}}{x_\\text{max}-x_\\text{min}}$.<br>
            Buerde: $R_{B,\\max}=\\dfrac{U_S-U_{S,\\min}}{20\\,\\text{mA}}$; z.B. $(24-12)\\,\\text{V}/0{,}02\\,\\text{A}=600\\,\\Omega$.<br><br>

            <strong>IO-Link (DIN EN 61131-9:2014)</strong><br>
            Punkt-zu-Punkt-Kommunikation Master ↔ Device (max. 20 m).<br>
            COM1 = 4,8 kBaud · COM2 = 38,4 kBaud · COM3 = 230,4 kBaud.<br>
            3-Leiter (L+, L−, C/Q) — kompatibel zu Standard-Schalt-Sensoren (SIO-Mode).<br><br>

            <strong>HART / Profibus / PROFINET</strong><br>
            HART: Bell-202-FSK mit 1200/2200 Hz und kleiner Strommodulation ueber 4-20 mA; analoger Prozesswert bleibt erhalten.<br>
            Profibus DP: RS-485, Master-Slave + Token, typ. 9,6 kbit/s bis 12 Mbit/s; DP-V0/V1/V2.<br>
            PROFINET: Switched Ethernet, RT und IRT; IRT nutzt synchronisierte Zeitfenster, Zykluszeiten bis $31{,}25\\,\\mu\\text{s}$ moeglich.<br><br>

            <strong>Auflösung A/D-Wandler</strong><br>
            $\\Delta U = U_\\text{ref}/2^N$ pro LSB. SNR (ideal): $6{,}02\\cdot N + 1{,}76\\,\\text{dB}$.<br>
            Quantisierungsrauschen: $\\sigma_q = \\Delta U/\\sqrt{12}$.<br>
            Architekturwahl: SAR = mittlere Geschwindigkeit/niedrige Latenz; Sigma-Delta = hohe Aufloesung durch Oversampling/Noise-Shaping; Pipeline = hohe Geschwindigkeit mit Latenz.<br>
            Sigma-Delta-ENOB-Gewinn: grob $\\Delta\\text{ENOB}\\approx (L+0{,}5)\\log_2(\\text{OSR})$ fuer Modulatorordnung $L$.<br><br>

            <strong>Funktionssicherheit (IEC 61508:2010)</strong><br>
            SIL = Safety Integrity Level (1...4). Low Demand: $\\text{PFD}_\\text{avg}$,
            High Demand: PFH (Probability of Failure per Hour).<br>
            SIL 1: $10^{-2} \\le \\text{PFD} < 10^{-1}$, SIL 2: $10^{-3} \\le \\text{PFD} < 10^{-2}$,
            SIL 3: $10^{-4} \\le \\text{PFD} < 10^{-3}$, SIL 4: $10^{-5} \\le \\text{PFD} < 10^{-4}$.<br>
            Safe Failure Fraction: $\\text{SFF}=\\dfrac{\\lambda_S+\\lambda_{DD}}{\\lambda_S+\\lambda_{DD}+\\lambda_{DU}}$.<br>
            Typ-A/B-Architektur: fuer SIL 2 duerfen einfache Typ-A-Komponenten bei $60\\,\\%\\le\\text{SFF}<90\\,\\%$ mit $\\text{HFT}=0$ auskommen; komplexe Typ-B-Komponenten brauchen dort meist $\\text{HFT}\\ge 1$ (IEC 61508-2 Tabellen 2/3).<br>
            Low-Demand-Naeherung fuer ein 1oo1-Element: $\\text{PFD}_\\text{avg}\\approx \\lambda_{DU}\\,T_I/2$.
        `,

        levels: [
            // ============================== LEVEL 1 ==============================
            [
                {
                    q: 'Definiere die <strong>Empfindlichkeit</strong> (Sensitivity) eines Sensors am Arbeitspunkt und nenne ihre SI-Einheit am Beispiel eines Pt100 (Eingang Temperatur, Ausgang Widerstand).',
                    h: 'Empfindlichkeit = Ableitung der Kennlinie $y(x)$ am Arbeitspunkt.',
                    s: 'Die Empfindlichkeit ist die Steigung der Sensorkennlinie: $S=\\dfrac{dy}{dx}$ am Arbeitspunkt. Bei einem linearen Sensor ist $S$ konstant.<br>'
                        + 'Pt100 (DIN EN 60751): $R(\\vartheta)\\approx 100\\,\\Omega\\cdot(1+\\alpha\\vartheta)$ mit $\\alpha=3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}$. Damit:<br>'
                        + '$S=\\dfrac{dR}{d\\vartheta}=R_0\\,\\alpha = 100\\cdot 3{,}851\\cdot 10^{-3}\\,\\Omega/\\text{K}$.<br>'
                        + '$$\\boxed{S_\\text{Pt100}\\approx 0{,}385\\,\\Omega/\\text{K}}$$'
                },
                {
                    q: 'Welcher Bezugswiderstand $R_0$ und welcher Temperaturkoeffizient $\\alpha$ gehören laut <strong>DIN EN 60751:2009</strong> zu einem Pt100, Klasse W0.00385?',
                    h: 'Industriestandard, Klasse W0.00385 (entspricht IEC 751).',
                    s: '$R_0 = 100{,}00\\,\\Omega$ bei $0\\,{}^\\circ\\text{C}$.<br>'
                        + '$\\alpha = (R_{100}-R_0)/(R_0\\cdot 100\\,\\text{K}) = 3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}$.<br>'
                        + '$$\\boxed{R_0=100\\,\\Omega,\\ \\alpha=3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}}$$'
                        + 'Toleranzklassen: AA ($\\pm 0{,}1\\,\\text{K}$), A ($\\pm 0{,}15$), B ($\\pm 0{,}3$) bei $0\\,{}^\\circ\\text{C}$.'
                },
                {
                    q: 'Warum benötigt ein Thermoelement zwingend eine <strong>Vergleichsstelle</strong> (cold junction)?',
                    h: 'Seebeck-Spannung entsteht im Temperatur<em>gradienten</em>, nicht am Anschlusspunkt.',
                    s: 'Der Seebeck-Effekt erzeugt entlang eines Leiters mit Temperaturgradient eine Thermospannung. Misst man die Spannung zwischen den freien Enden zweier verschiedener Metalle, ergibt sich $U_\\text{th}=\\int_{T_\\text{ref}}^{T_\\text{Messstelle}}(S_A-S_B)\\,dT$.<br>'
                        + 'Damit das Messgerät <em>absolute</em> Temperaturen liefert, muss die Temperatur der Anschlussstelle (Vergleichsstelle, cold junction) bekannt sein — sonst misst man nur die Differenz $T_\\text{Mess}-T_\\text{ref}$.<br>'
                        + 'Industriell: elektronische Cold-Junction-Compensation (Pt100 oder Halbleitersensor am Klemmenblock).<br>'
                        + '$$\\boxed{U_\\text{th}\\ \\text{ist relativ zur Vergleichsstellentemperatur}}$$'
                },
                {
                    q: 'Berechne die Hallspannung $U_H$ in einem Si-Halbleiter-Plättchen mit Strom $I=10\\,\\text{mA}$, Magnetfeld $B=0{,}5\\,\\text{T}$, Dicke $d=0{,}1\\,\\text{mm}$ und Hallkonstante $R_H=7{,}35\\cdot 10^{-5}\\,\\text{m}^3/\\text{C}$.',
                    h: '$U_H = R_H \\cdot I \\cdot B / d$.',
                    s: '$U_H = \\dfrac{R_H\\cdot I\\cdot B}{d} = \\dfrac{7{,}35\\cdot 10^{-5}\\cdot 0{,}01\\cdot 0{,}5}{1\\cdot 10^{-4}}\\,\\text{V}$.<br>'
                        + '$= 3{,}675\\cdot 10^{-3}\\,\\text{V}$.<br>'
                        + '$$\\boxed{U_H \\approx 3{,}68\\,\\text{mV}}$$'
                        + 'Anmerkung: Halbleiter haben deutlich grössere $R_H$ als Metalle (Faktor $\\sim 10^4$), weshalb sie für Hallsensoren bevorzugt werden.'
                },
                {
                    q: 'Was bedeutet die Stromschnittstelle <strong>4–20 mA</strong> und welche Werte signalisieren laut <strong>NAMUR NE 43</strong> einen Sensorfehler?',
                    h: '"Live Zero" mit definiertem Fehler-Band.',
                    s: '4–20 mA ist eine eingeprägte Stromschleife: $4\\,\\text{mA}=0\\,\\%$ des Messbereichs, $20\\,\\text{mA}=100\\,\\%$. Der Live-Zero-Strom ermöglicht Drahtbruch- und Kurzschlusserkennung.<br>'
                        + 'NAMUR NE 43 (1994/Update 2003) definiert:<br>'
                        + '<table class="text-sm my-2"><tbody>'
                        + '<tr><td class="pr-3"><code>≤ 3,6 mA</code></td><td>Fehler (Drahtbruch / Sensor defekt)</td></tr>'
                        + '<tr><td class="pr-3"><code>3,8...4,0 mA</code></td><td>Messbereichsunterschreitung (Underrange)</td></tr>'
                        + '<tr><td class="pr-3"><code>20,0...20,5 mA</code></td><td>Messbereichsüberschreitung (Overrange)</td></tr>'
                        + '<tr><td class="pr-3"><code>≥ 21 mA</code></td><td>Fehler (Sensor / Verkabelung)</td></tr>'
                        + '</tbody></table>'
                        + '$$\\boxed{\\text{Live-Zero: }4\\,\\text{mA}=0\\,\\%,\\ 20\\,\\text{mA}=100\\,\\%}$$'
                },
                {
                    q: 'Erkläre den Unterschied zwischen <strong>Auflösung</strong> und <strong>Genauigkeit</strong> eines Sensors.',
                    h: 'Auflösung = kleinster unterscheidbarer Schritt; Genauigkeit = Abweichung vom wahren Wert.',
                    s: '<strong>Auflösung</strong> ist die kleinste vom Sensor noch unterscheidbare Eingangsänderung. Bei einem 16-Bit-ADC mit $U_\\text{ref}=10\\,\\text{V}$ ist die Auflösung $10/2^{16}\\approx 153\\,\\mu\\text{V}$.<br>'
                        + '<strong>Genauigkeit (accuracy)</strong> ist die maximale systematische Abweichung des Messwerts vom wahren Wert über den gesamten Messbereich. Sie umfasst Linearitäts-, Hysterese-, Offset-, Verstärkungs- und Temperaturfehler.<br>'
                        + 'Ein hochauflösender Sensor (24 Bit) muss nicht genau sein — er kann viele Bits Rauschen liefern. Genauigkeit wird in %&nbsp;FS oder absoluten Einheiten angegeben.<br>'
                        + '$$\\boxed{\\text{Auflösung} \\ne \\text{Genauigkeit}}$$'
                },
                {
                    q: 'Nenne typische <strong>SI-Einheiten und Wertebereiche</strong> für Beschleunigung, Drehrate und Druck in der industriellen Sensorik.',
                    h: 'g vs. m/s², °/s vs. rad/s, bar vs. Pa.',
                    s: '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Größe</th><th class="text-left pr-3">SI</th><th class="text-left">Typ. Bereich</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">Beschleunigung</td><td class="pr-3">$\\text{m/s}^2$</td><td>$\\pm 2\\ldots\\pm 200\\,g$ (MEMS), $1\\,g=9{,}81\\,\\text{m/s}^2$</td></tr>'
                        + '<tr><td class="pr-3">Drehrate</td><td class="pr-3">$\\text{rad/s}$</td><td>$\\pm 125\\ldots\\pm 2000\\,°/\\text{s}$ (MEMS)</td></tr>'
                        + '<tr><td class="pr-3">Druck (Prozess)</td><td class="pr-3">$\\text{Pa}$</td><td>$0\\ldots 1000\\,\\text{bar}$, $1\\,\\text{bar}=10^5\\,\\text{Pa}$</td></tr>'
                        + '<tr><td class="pr-3">Kraft</td><td class="pr-3">$\\text{N}$</td><td>$10\\,\\text{mN}\\ldots 10\\,\\text{kN}$ (DMS)</td></tr>'
                        + '<tr><td class="pr-3">Temperatur</td><td class="pr-3">$\\text{K}$ (oder ${}^\\circ\\text{C}$)</td><td>$-200\\ldots +850\\,{}^\\circ\\text{C}$ (Pt100)</td></tr>'
                        + '</tbody></table>'
                        + 'Konvertierung Drehrate: $\\omega[\\text{rad/s}] = \\omega[°/\\text{s}]\\cdot \\pi/180$.'
                },
                {
                    q: 'Welche <strong>IP-Schutzart nach DIN EN 60529</strong> bedeutet "staubdicht und schutz gegen zeitweiliges Untertauchen"?',
                    h: 'Erste Ziffer = Festkörperschutz, zweite Ziffer = Wasserschutz.',
                    s: 'Die IP-Klassen sind zweistellig (DIN EN 60529:2014):<br>'
                        + '<strong>Erste Ziffer</strong> (Festkörper/Staub): 0 (kein Schutz) ... 6 (staubdicht).<br>'
                        + '<strong>Zweite Ziffer</strong> (Wasser): 0 (kein) ... 8 (dauerhaftes Untertauchen) ... 9K (Hochdruck-Heißwasserstrahl).<br>'
                        + '"Staubdicht" = erste Ziffer 6. "Zeitweiliges Untertauchen" = zweite Ziffer 7 (max. 1 m Wassersäule, 30 min).<br>'
                        + '$$\\boxed{\\text{IP67}}$$ '
                        + 'IP68 wäre dauerhaftes Untertauchen unter Herstellervorgaben.'
                },
                {
                    q: 'Wie viele Schritte pro Umdrehung liefert ein <strong>inkrementaler Encoder</strong> mit $N=1024$ Strichen bei <strong>4-fach-Auswertung</strong>?',
                    h: 'Beide Flanken beider Kanäle (A und B) werden gezählt.',
                    s: 'Inkrementale Encoder liefern zwei Rechtecksignale A und B, 90° phasenverschoben (Quadratursignal). Pro Strich entstehen vier auswertbare Flanken (A↑, B↑, A↓, B↓). Damit:<br>'
                        + '$\\text{Schritte} = 4\\cdot N = 4\\cdot 1024 = 4096$.<br>'
                        + '$$\\boxed{4096\\ \\text{Schritte/Umdrehung}}$$'
                        + 'Vorteil 4-fach: vierfache Auflösung ohne zusätzliche Hardware. Index-Kanal Z gibt zusätzlich einen Nullimpuls pro Umdrehung.'
                },
                {
                    q: 'Was ist die <strong>Hysterese</strong> eines Sensors? Wie wird sie definiert und üblicherweise angegeben?',
                    h: 'Differenz zwischen aufsteigender und absteigender Kennlinie bei gleichem Eingangswert.',
                    s: 'Bei einem hysteresebehafteten Sensor unterscheidet sich der Ausgangswert beim gleichen Eingangswert je nachdem, aus welcher Richtung dieser angefahren wird (aufsteigend vs. absteigend). Definition:<br>'
                        + '$H = \\dfrac{\\max\\limits_{x}\\,|y_\\uparrow(x) - y_\\downarrow(x)|}{y_\\text{FS}}\\cdot 100\\,\\%$<br>'
                        + 'Typische Werte: DMS-Sensor $\\le 0{,}05\\,\\%$ FS, mechanische Druckmessdose $\\le 0{,}5\\,\\%$, kapazitiver Näherungssensor je nach Anwendung $1\\ldots 20\\,\\%$ (gewünscht, um Schaltspielen zu vermeiden).<br>'
                        + '$$\\boxed{H\\ \\text{in \\% FS, max. Differenz zwischen Auf- und Abfahrt}}$$'
                },
                {
                    q: 'Berechne die Spannungsauflösung pro LSB eines <strong>12-Bit-ADC</strong> bei $U_\\text{ref}=10\\,\\text{V}$ (unipolar).',
                    h: '$\\Delta U = U_\\text{ref}/2^N$.',
                    s: '$\\Delta U = 10\\,\\text{V}/2^{12} = 10/4096\\,\\text{V} \\approx 2{,}44\\,\\text{mV}$ pro LSB.<br>'
                        + '$$\\boxed{\\Delta U \\approx 2{,}44\\,\\text{mV}}$$'
                        + 'Bei bipolarem Eingang ($\\pm 5\\,\\text{V}$) bleibt $\\Delta U$ gleich, der Wertebereich wird auf $-2048\\ldots +2047$ codiert. <em>Quelle:</em> Schrüffer/Reindl/Zagar, Elektrische Messtechnik, Hanser 12. Aufl. 2018, §5.3.'
                },
                {
                    q: 'Worin unterscheiden sich <strong>NTC</strong> und <strong>PTC</strong>-Thermistoren in ihrer Kennlinie?',
                    h: 'Negativer bzw. positiver Temperaturkoeffizient.',
                    s: '<strong>NTC (Negative Temperature Coefficient):</strong> Widerstand <em>fällt</em> mit steigender Temperatur (typ. Halbleitermaterialien wie Mn-/Ni-/Co-Oxide). Nichtlinear, beschrieben durch Steinhart-Hart oder $\\beta$-Modell: $R(T)=R_{25}\\,e^{\\beta(1/T-1/T_{25})}$ mit $\\beta\\approx 3000\\ldots 4500\\,\\text{K}$.<br>'
                        + '<strong>PTC (Positive Temperature Coefficient):</strong> Widerstand <em>steigt</em> oberhalb der Curie-Temperatur sprunghaft (BaTiO$_3$-Keramik). Anwendung: Übertemperatur-Schutz, Selbstregulierung.<br>'
                        + '$$\\boxed{\\text{NTC: }dR/dT<0,\\ \\text{PTC: }dR/dT>0}$$'
                        + '<em>Quelle:</em> Hering/Schoenfelder, Sensoren in Wissenschaft und Technik, Springer Vieweg 2. Aufl. 2018, §4.2.'
                },
                {
                    q: 'Welchen typischen <strong>k-Faktor</strong> hat ein DMS aus <strong>Konstantan</strong>, und welche Anteile setzen ihn zusammen?',
                    h: 'Geometrieänderung + Widerstandsänderung des Materials.',
                    s: 'Der k-Faktor ($k=\\Delta R/R / \\varepsilon$) eines Konstantan-DMS beträgt $k\\approx 2{,}0$.<br>'
                        + 'Beiträge: (1) Geometrischer Anteil (Längenzunahme, Querschnittsverringerung) liefert $1+2\\nu \\approx 1{,}6$ bei $\\nu=0{,}3$. (2) Spezifische Widerstandsänderung $\\Delta\\rho/\\rho$ ergibt den Rest auf $\\approx 2{,}0$.<br>'
                        + 'Andere Werkstoffe: Halbleiter-DMS (Si) erreichen $k=100\\ldots 200$ (dominiert vom Piezowiderstandseffekt), sind aber stark temperaturabhängig.<br>'
                        + '$$\\boxed{k_\\text{Konstantan}\\approx 2{,}0}$$'
                        + '<em>Quelle:</em> K. Hoffmann, Eine Einführung in die Technik des Messens mit Dehnungsmessstreifen, HBM Hottinger 1987, §3.'
                },
                {
                    q: 'Eine <strong>Photodiode</strong> im Sperrbetrieb liefert einen Photostrom $I_\\text{ph}$. Wie hängt $I_\\text{ph}$ idealisiert von der einfallenden Lichtleistung $P_\\text{opt}$ ab, und was ist die Empfindlichkeit (Responsivity)?',
                    h: 'Linearer Bereich; $R_\\lambda$ in A/W.',
                    s: 'Im Sperrbetrieb ist der Photostrom proportional zur einfallenden Lichtleistung:<br>'
                        + '$I_\\text{ph} = R_\\lambda \\cdot P_\\text{opt}$<br>'
                        + 'mit der wellenlängenabhängigen Responsivity $R_\\lambda$ in $\\text{A/W}$. Si-Photodioden erreichen $R_\\lambda \\approx 0{,}5\\,\\text{A/W}$ bei $\\lambda=850\\,\\text{nm}$ (entspricht externer Quantenausbeute $\\eta\\approx 0{,}7$).<br>'
                        + 'Theoretische Obergrenze: $R_\\lambda = \\eta\\cdot e\\cdot\\lambda/(h\\cdot c)$.<br>'
                        + '$$\\boxed{I_\\text{ph} = R_\\lambda\\cdot P_\\text{opt}}$$'
                        + '<em>Quelle:</em> Tipler/Mosca, Physik für Wissenschaftler und Ingenieure, Springer 7. Aufl. 2015, §32.5.'
                },
                {
                    q: 'Was ist ein <strong>Reed-Kontakt</strong>, und wo wird er als Sensor eingesetzt?',
                    h: 'Bistabiler Magnetschalter aus ferromagnetischen Zungen im Glasrohr.',
                    s: 'Ein Reed-Kontakt besteht aus zwei ferromagnetischen Zungen in einem hermetisch geschlossenen Glasröhrchen (Inertgas). Bei Annäherung eines Magnetfelds schliessen sich die Zungen mechanisch zu einem elektrischen Kontakt.<br>'
                        + 'Eigenschaften:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Kontaktbehaftet (Verschleiss durch Kontaktabbrand bei hohen Lasten).</li>'
                        + '<li>Schaltstrom typ. 100 mA, Schaltspannung bis 200 V.</li>'
                        + '<li>Lebensdauer $10^6$ bis $10^9$ Schaltspiele.</li>'
                        + '<li>Spannungsfest, kein Reststrom im Offen-Zustand.</li></ul>'
                        + 'Anwendung: Endlagen-Sensor an Zylindern (über Magnet am Kolben), Türöffnungsmelder, Tachoimpulsgeber.<br>'
                        + '<em>Quelle:</em> Tränkler/Reindl, Sensortechnik, Springer Vieweg 2. Aufl. 2014, §11.4.'
                },
                {
                    q: 'Wie unterscheidet sich ein <strong>Pt1000</strong> von einem Pt100 nach DIN EN 60751?',
                    h: 'Bezugswiderstand 10-fach grösser, $\\alpha$ identisch.',
                    s: 'Pt1000: $R_0 = 1000\\,\\Omega$ bei $0\\,{}^\\circ\\text{C}$. $\\alpha = 3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}$ ist identisch zum Pt100.<br>'
                        + 'Empfindlichkeit: $S=R_0\\alpha = 3{,}851\\,\\Omega/\\text{K}$ — 10-fach höher als Pt100.<br>'
                        + 'Vorteile: Leitungswiderstands-Fehler relativ kleiner (gleiches absolutes $R_L$, aber 10× grösserer Sensor-$R$). 2- oder 3-Leiter genügt oft, 4-Leiter selten nötig.<br>'
                        + 'Nachteil: höherer Eigenerwärmungseinfluss bei gleicher Spannung über dem Sensor.<br>'
                        + '$$\\boxed{R_{0,\\text{Pt1000}}=1000\\,\\Omega,\\ \\alpha = 3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}}$$'
                        + '<em>Quelle:</em> DIN EN 60751:2009, §5.1.2 (Industrielle Pt-Widerstandsthermometer).'
                },
                {
                    q: 'Wozu dient ein <strong>PWM-Sensorausgang</strong>, und welche Größe trägt die Information?',
                    h: 'Tastverhältnis (Duty Cycle) als Messsignal.',
                    s: 'Beim PWM-Ausgang gibt der Sensor ein Rechtecksignal mit konstanter Frequenz aus; die Messinformation steckt im <strong>Tastverhältnis</strong> (Pulsbreite / Periodendauer).<br>'
                        + 'Vorteile gegenüber Analogspannung:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Robust gegen Spannungsabfälle auf der Leitung (digitales Zeit-Verhältnis).</li>'
                        + '<li>Einfache Digitalauswertung (Capture-Compare-Timer im µC).</li>'
                        + '<li>EMV-unkritisch (Schaltsignal).</li>'
                        + '<li>Direkt parametrierbar (z.B. PWM-Ausgang skaliert in % Füllstand).</li></ul>'
                        + 'Typische Frequenzen: 100 Hz bis 10 kHz; Duty Cycle linear $0\\ldots 100\\,\\%$ entspricht $0\\ldots\\text{FS}$.<br>'
                        + '<em>Quelle:</em> Hering/Schoenfelder, Sensoren in Wissenschaft und Technik, Springer Vieweg 2. Aufl. 2018, §13.7.'
                },
                {
                    q: 'Welcher Bezugswerkstoff definiert den <strong>nominalen Schaltabstand $s_n$</strong> bei induktiven Näherungssensoren nach IEC 60947-5-2?',
                    h: 'Normwerkstoff: Stahl FE360.',
                    s: 'IEC 60947-5-2:2019 (Niederspannungsschaltgeräte — Steuergeräte und Schaltelemente, §3.5.1) definiert den nominalen Schaltabstand $s_n$ als den Schaltabstand bei <strong>Standard-Messplatte aus Stahl FE360</strong> (heute S235JR genannt).<br>'
                        + 'Abmessungen der Messplatte: quadratisch, Kantenlänge $a$ = Durchmesser der Sensorfläche oder $3\\cdot s_n$ (der grössere Wert), Dicke 1 mm.<br>'
                        + 'Andere Werkstoffe (Edelstahl V2A, Al, Cu, Messing) werden über Reduktionsfaktoren $k_R$ verrechnet.<br>'
                        + '$$\\boxed{\\text{Bezug: Stahl FE360 (S235JR), Reduktionsfaktor } k_R=1{,}0}$$'
                        + '<em>Quelle:</em> IEC 60947-5-2:2019, §3.5.1.'
                },
                {
                    q: 'Wofür dient eine <strong>galvanische Trennung</strong> in einem Sensor-Eingangsmodul, und welche drei gängigen Technologien gibt es?',
                    h: 'Trennung von Mess- und Versorgungs-/Auswertepotenzial.',
                    s: 'Eine galvanische Trennung unterbricht den DC-Stromfluss zwischen Sensor und Auswertung. Gründe: Schutz gegen Ausgleichsströme (Erdpotenzialdifferenzen), EMV-Robustheit, Personenschutz (Sicherheitskleinspannung), Vermeidung von Brummschleifen.<br>'
                        + 'Gängige Technologien:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Optokoppler:</strong> LED → Photodiode/-transistor; einfach, langsam ($\\sim 100\\,\\text{kHz}$), driftet mit Alterung.</li>'
                        + '<li><strong>Transformator:</strong> AC-Übertragung (Modulation nötig), schnell, höhere Trennspannungen, mehr Bauraum.</li>'
                        + '<li><strong>Kapazitiv / magnetisch (digital isolators):</strong> ADuM, Si86xx; bis GHz-Bereich, kompakt, mit Modulationsschema (OOK/PWM).</li></ul>'
                        + 'Prüfung nach DIN EN 61010-1: Trennspannung $\\ge 1500\\,\\text{V}_\\text{eff}$ für Funktionstrennung, $\\ge 4000\\,\\text{V}$ für Schutztrennung.<br>'
                        + '<em>Quelle:</em> DIN EN 61010-1:2020, §6.7 (Sicherheitsbestimmungen für elektrische Mess-, Steuer-, Regel- und Laborgeräte).'
                },
                {
                    q: 'Welche Topologie und welche maximalen Reichweiten/Knotenanzahl spezifiziert <strong>TIA/EIA-485</strong> (RS-485) für Sensor-Bus-Verkabelung?',
                    h: 'Differenz-Bus, max 32 Standard-Treiber, 1200 m bei 100 kbit/s.',
                    s: 'RS-485 (TIA/EIA-485-A:1998) verwendet eine <strong>differentielle Halbduplex-Übertragung</strong> auf einem verdrillten Adernpaar (A/B) mit zwei Abschlusswiderständen $120\\,\\Omega$ an den Busenden.<br>'
                        + 'Maximale Parameter:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Bis 32 Standard-Treiber pro Bus (1/8-Unit-Load-Treiber: bis 256).</li>'
                        + '<li>Leitungslänge: 1200 m bei 100 kbit/s; bei 10 Mbit/s nur 12 m (Faustregel $\\text{Bitrate}\\cdot\\text{Länge} \\le 10^8\\,\\text{m·bit/s}$).</li>'
                        + '<li>Common-Mode-Bereich: $-7\\ldots +12\\,\\text{V}$.</li></ul>'
                        + 'Anwendungen: Modbus RTU, Profibus DP-Physical-Layer, sensor-spezifische Industriebusse.<br>'
                        + '$$\\boxed{\\text{max. 32 Knoten / 1200 m / 100 kbit/s}}$$'
                        + '<em>Quelle:</em> TIA/EIA-485-A:1998, §4.'
                },
                {
                    q: 'Worauf basiert die <strong>Steinhart-Hart-Gleichung</strong> für NTC-Thermistoren, und wann wird sie anstelle des $\\beta$-Modells verwendet?',
                    h: 'Drei Parameter A, B, C aus drei Kalibrierpunkten.',
                    s: 'Die Steinhart-Hart-Gleichung beschreibt die nichtlineare $R(T)$-Kennlinie eines NTC mit drei Konstanten:<br>'
                        + '$\\dfrac{1}{T} = A + B\\,\\ln R + C\\,(\\ln R)^3$<br>'
                        + 'Sie ist deutlich genauer als das einfache $\\beta$-Modell ($1/T = 1/T_0 + (1/\\beta)\\ln(R/R_0)$), das nur über einen schmalen Temperaturbereich ($\\pm 25\\,\\text{K}$ um den Kalibrierpunkt) brauchbar ist.<br>'
                        + 'Steinhart-Hart erreicht über den gesamten Arbeitsbereich des NTC ($-50\\ldots +150\\,{}^\\circ\\text{C}$) eine Genauigkeit von $\\le 0{,}01\\,\\text{K}$.<br>'
                        + 'Bestimmung von A, B, C: drei Kalibrierpunkte $(T_i, R_i)$ → lineares Gleichungssystem.<br>'
                        + '$$\\boxed{1/T = A + B\\ln R + C(\\ln R)^3}$$'
                        + '<em>Quelle:</em> J. S. Steinhart, S. R. Hart, "Calibration curves for thermistors", Deep-Sea Research, Vol. 15(4), 1968, pp. 497–503.'
                },
                {
                    q: 'Welche Größe misst ein <strong>Differenzdruckaufnehmer</strong>, und welche Anwendung ist typisch in der Prozesstechnik?',
                    h: 'Druckdifferenz $\\Delta p = p_+ - p_-$.',
                    s: 'Ein Differenzdruckaufnehmer hat zwei Druckanschlüsse (high und low) und misst die <em>Differenz</em> $\\Delta p = p_+ - p_-$, unabhängig vom absoluten Niveau.<br>'
                        + 'Typische Industrieanwendungen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Wirkdruck-Durchflussmessung</strong> (Blende, Düse, Venturi): $\\dot V \\propto \\sqrt{\\Delta p}$ (Bernoulli).</li>'
                        + '<li><strong>Filterüberwachung:</strong> $\\Delta p$ über Filter zeigt Verschmutzungsgrad.</li>'
                        + '<li><strong>Hydrostatische Füllstandsmessung in geschlossenen Behältern:</strong> $\\Delta p = \\rho g h$, kompensiert Dampfdruck im Kopfraum.</li></ul>'
                        + 'Typische Genauigkeit: $\\le 0{,}1\\,\\%$ vom Messbereich, Druckbereiche von $0\\ldots 1\\,\\text{mbar}$ (Reinraum-Differenzdruck) bis $0\\ldots 1000\\,\\text{bar}$ (Hydraulik).<br>'
                        + '<em>Quelle:</em> Endress+Hauser, Druckmesstechnik-Handbuch, 2017, §3.2.'
                },
                {
                    q: 'Wie erreicht ein <strong>inkrementaler Glasmaßstab</strong> (linearer Messstab) mit Strichteilung $20\\,\\mu\\text{m}$ eine Auflösung von $0{,}1\\,\\mu\\text{m}$?',
                    h: 'Sinus-Cosinus-Interpolation.',
                    s: 'Der Glasmaßstab liefert nicht reine Rechtecksignale, sondern <strong>analoge Sinus- und Cosinus-Spuren</strong> (1 V$_\\text{ss}$ oder ähnlich) mit der Periode der Strichteilung $T=20\\,\\mu\\text{m}$.<br>'
                        + 'Die Phasenlage $\\varphi=\\arctan(\\sin/\\cos)$ wird interpoliert; bei 256-facher Interpolation: $\\Delta x = T/256 \\approx 0{,}08\\,\\mu\\text{m}$, gerundet $0{,}1\\,\\mu\\text{m}$.<br>'
                        + 'Voraussetzung: Sin/Cos-Spuren müssen amplituden- und offsetbereinigt sein (Lissajous-Figur als Kreis um Ursprung). Heidenhain-Auswerteelektronik macht das automatisch ("Adjusting"-Phase).<br>'
                        + '$$\\boxed{\\Delta x = T/n_\\text{Interp},\\ n_\\text{Interp}\\ \\text{bis 4096}}$$'
                        + 'Damit erreichen lineare Glasmaßstäbe Auflösungen im Nanometerbereich.<br>'
                        + '<em>Quelle:</em> Heidenhain, Messsysteme für CNC-Werkzeugmaschinen, Hauptkatalog 2020, §2.'
                },
                {
                    q: 'Wann wird ein <strong>Schwellenwert-Schaltsensor</strong> einem analog-messenden Sensor vorgezogen?',
                    h: 'Binäre Entscheidung statt absolutes Messsignal.',
                    s: 'Schwellenwert-Sensoren (z.B. PNP/NPN-Näherungsschalter, kapazitive Füllstandsgrenzschalter) liefern nur ein binäres Signal "EIN/AUS" — d.h. überschreitet die Messgröße einen festen Schwellwert?<br>'
                        + 'Vorzug gegenüber Analogsensor, wenn:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Nur eine <strong>Schaltentscheidung</strong> nötig ist (Endlage erreicht, Behälter voll, Werkstück da).</li>'
                        + '<li>Geringere Kosten und einfachere Verdrahtung (24-V-DI-Karte statt Analog-Karte mit Wandler).</li>'
                        + '<li>Robustheit gegen EMV (digitales Signal mit grossen Spannungspegeln).</li>'
                        + '<li>Direkter Eingang an Sicherheits-SPS möglich (binäre Sicherheitskreise).</li></ul>'
                        + 'Gegenargument: Bei prozessanalytischen Aufgaben (Trending, Diagnose, Regelung) liefert nur ein analoger Sensor (oder IO-Link-Sensor mit Prozessdaten) ausreichende Information.<br>'
                        + '<em>Quelle:</em> Hering/Schoenfelder, Sensoren in Wissenschaft und Technik, Springer Vieweg 2. Aufl. 2018, §13.'
                }
            ],

            // ============================== LEVEL 2 ==============================
            [
                {
                    q: 'Ein Pt100 wird bei $\\vartheta=120\\,{}^\\circ\\text{C}$ betrieben. Berechne $R(\\vartheta)$ <em>linear</em> und <em>nach Callendar–Van-Dusen</em> und vergleiche den Fehler der linearen Näherung.',
                    h: 'Linear: $R_0(1+\\alpha\\vartheta)$. CVD (positive $\\vartheta$): $R_0[1+A\\vartheta+B\\vartheta^2]$.',
                    s: '<strong>Linear:</strong> $R = 100\\cdot(1+3{,}851\\cdot 10^{-3}\\cdot 120) = 100\\cdot 1{,}46212 = 146{,}212\\,\\Omega$.<br>'
                        + '<strong>CVD ($0\\le\\vartheta\\le 850\\,{}^\\circ\\text{C}$):</strong> $R = 100[1 + 3{,}9083\\cdot 10^{-3}\\cdot 120 + (-5{,}775\\cdot 10^{-7})\\cdot 120^2]$.<br>'
                        + '$=100[1 + 0{,}469 - 8{,}316\\cdot 10^{-3}] = 100\\cdot 1{,}46064 = 146{,}064\\,\\Omega$.<br>'
                        + 'Differenz: $146{,}212 - 146{,}064 = 0{,}148\\,\\Omega$, entspricht $\\approx 0{,}38\\,\\text{K}$.<br>'
                        + '$$\\boxed{R_\\text{lin}\\approx 146{,}21\\,\\Omega,\\ R_\\text{CVD}\\approx 146{,}06\\,\\Omega,\\ \\Delta\\vartheta\\approx 0{,}4\\,\\text{K}}$$'
                        + 'Bei Genauigkeitsanforderungen unter Toleranzklasse B muss die CVD-Linearisierung erfolgen.'
                },
                {
                    q: 'Eine <strong>Wheatstone-Vollbrücke</strong> mit vier DMS ($k=2$) wird zur Messung von Zug an einem Stab eingesetzt. Bei einer Dehnung $\\varepsilon=1\\,\\text{mm/m}$ und Brückenspeisung $U_B=5\\,\\text{V}$: berechne die Ausgangsspannung $U_a$.',
                    h: 'Vollbrücke (alle vier DMS aktiv, je 2 +$\\varepsilon$ und 2 −$\\varepsilon$): $U_a/U_B = k\\varepsilon$.',
                    s: 'Bei einer Vollbrücke werden zwei DMS auf der Zugseite ($+\\varepsilon$) und zwei auf der Druckseite ($-\\varepsilon$, z.B. Querkontraktion mit Poisson-Faktor) verbaut. Die Brückengleichung vereinfacht sich zu:<br>'
                        + '$\\dfrac{U_a}{U_B} = k\\,\\varepsilon$.<br>'
                        + '$U_a = 5\\,\\text{V}\\cdot 2\\cdot 10^{-3} = 10\\,\\text{mV}$.<br>'
                        + '$$\\boxed{U_a = 10\\,\\text{mV}}$$'
                        + 'Halbbrücke wäre $U_a = U_B\\cdot k\\varepsilon/2 = 5\\,\\text{mV}$, Viertelbrücke nur $2{,}5\\,\\text{mV}$. Die Vollbrücke kompensiert zudem Temperatur- und Längsdehnung der Trägerstruktur.'
                },
                {
                    q: 'Welche <strong>Bandbreite</strong> braucht ein A/D-Wandler mit Abtastrate $f_s = 100\\,\\text{kSPS}$, und warum muss vor dem Wandler ein Anti-Alias-Filter sitzen?',
                    h: 'Nyquist: $f_\\text{Signal,max}<f_s/2$.',
                    s: 'Nach dem <strong>Nyquist-Shannon-Theorem</strong> muss die maximale Signalfrequenz strikt kleiner als $f_s/2 = 50\\,\\text{kHz}$ sein. Sonst kommt es zu <em>Aliasing</em>: Frequenzanteile oberhalb der Nyquistgrenze werden in das Basisband zurückgespiegelt und sind im Digitalsignal nicht mehr unterscheidbar.<br>'
                        + 'Ein Anti-Alias-Filter (Tiefpass) vor dem A/D begrenzt das Signal auf $\\le f_s/2$. In der Praxis wird der Filter so gewählt, dass bei der halben Abtastfrequenz bereits die Dämpfung des Quantisierungsrauschens erreicht ist (z.B. $\\ge 6{,}02\\cdot N\\,\\text{dB}$ bei N-Bit-ADC).<br>'
                        + 'Sigma-Delta-ADCs (oversampling, z.B. 256x) entlasten die analoge Filterauslegung, da der digitale Decimation-Filter die steile Flanke übernimmt.<br>'
                        + '$$\\boxed{f_\\text{Signal,max}<f_s/2 = 50\\,\\text{kHz}}$$'
                },
                {
                    q: 'Ein piezoelektrischer Beschleunigungssensor (IEPE) liefert eine Empfindlichkeit von $100\\,\\text{mV}/g$ und wird mit Ladungsverstärker betrieben. Warum eignet er sich <strong>nicht für statische</strong> Messungen?',
                    h: 'Ladung leckt über endlichen Innenwiderstand des Ladungsverstärkers ab — Hochpassverhalten.',
                    s: 'Das piezoelektrische Element erzeugt eine Ladung $Q=d\\cdot F$ proportional zur Kraft. Diese Ladung wird durch den Ladungsverstärker in eine Spannung umgewandelt: $U_a=-Q/C_F$.<br>'
                        + 'Der Ladungsverstärker hat einen endlichen Innenwiderstand $R_F$ parallel zum Rückkopplungskondensator $C_F$. Damit entsteht ein <strong>Hochpassfilter</strong> 1. Ordnung mit Grenzfrequenz $f_g = 1/(2\\pi R_F C_F)$, typisch 0,1–1 Hz.<br>'
                        + 'Bei DC oder sehr niedrigen Frequenzen sinkt die Ausgangsspannung auf null — die Ladung kann sich über $R_F$ entladen. Daher misst der Sensor nur <strong>dynamische</strong> Vorgänge (Vibration, Schock).<br>'
                        + 'IEPE = "Integrated Electronics Piezo Electric"; 2-Draht-Versorgung mit eingebautem Ladungsverstärker, typ. 2–10 mA Konstantstrom über DC-Coupling 18–24 V.<br>'
                        + '$$\\boxed{f_g = \\dfrac{1}{2\\pi R_F C_F} \\Rightarrow \\text{DC nicht messbar}}$$'
                },
                {
                    q: 'Ein induktiver Näherungssensor (Wirbelstromprinzip) wird zur Erkennung eines Aluminium-Targets eingesetzt. Wieso reduziert sich der nominale Schaltabstand $s_n$ gegenüber Stahl?',
                    h: 'Stichwort: Reduktionsfaktor $k_R$.',
                    s: 'Wirbelstromsensoren detektieren leitfähige Targets über die Bedämpfung des LC-Schwingkreises in der Sensorspule. Die Stärke der Bedämpfung hängt vom <strong>spezifischen Widerstand</strong> $\\rho$ und der <strong>magnetischen Permeabilität</strong> $\\mu_r$ des Targets ab.<br>'
                        + 'IEC 60947-5-2 definiert <strong>Reduktionsfaktoren</strong> $k_R$ relativ zum Bezugswerkstoff Stahl FE360 ($k_R=1{,}0$):<br>'
                        + '<table class="text-sm my-2"><tbody>'
                        + '<tr><td class="pr-3">Stahl ST37 / FE360</td><td>$1{,}0$</td></tr>'
                        + '<tr><td class="pr-3">Edelstahl (V2A)</td><td>$\\approx 0{,}7$</td></tr>'
                        + '<tr><td class="pr-3">Messing</td><td>$\\approx 0{,}45$</td></tr>'
                        + '<tr><td class="pr-3">Aluminium</td><td>$\\approx 0{,}4$</td></tr>'
                        + '<tr><td class="pr-3">Kupfer</td><td>$\\approx 0{,}35$</td></tr>'
                        + '</tbody></table>'
                        + 'Effektiver Schaltabstand: $s_\\text{eff} = k_R\\cdot s_n$.<br>'
                        + '$$\\boxed{s_\\text{eff,Al}\\approx 0{,}4\\cdot s_n}$$'
                        + 'Faktor-1-Sensoren (Faktor 1 für alle Metalle) kompensieren dies elektronisch durch Frequenzauswertung.'
                },
                {
                    q: 'Berechne den <strong>Quantisierungs-SNR</strong> eines idealen 12-Bit-ADC bei Vollaussteuerung und vergleiche mit 16 Bit.',
                    h: 'SNR-Formel: $6{,}02\\cdot N + 1{,}76\\,\\text{dB}$.',
                    s: 'Bei einem idealen N-Bit-ADC liegt das Quantisierungsrauschen bei $\\sigma_q = \\Delta U/\\sqrt{12}$ mit $\\Delta U = U_\\text{FS}/2^N$.<br>'
                        + 'Bei Vollaussteuerung mit Sinussignal: $\\text{SNR} = 6{,}02\\cdot N + 1{,}76\\,\\text{dB}$.<br>'
                        + '12 Bit: $\\text{SNR} = 6{,}02\\cdot 12 + 1{,}76 = 74\\,\\text{dB}$.<br>'
                        + '16 Bit: $\\text{SNR} = 6{,}02\\cdot 16 + 1{,}76 = 98{,}1\\,\\text{dB}$.<br>'
                        + 'Differenz $\\approx 24\\,\\text{dB}$, also Faktor $\\approx 16$ in Spannung.<br>'
                        + '$$\\boxed{\\text{SNR}_{12}\\approx 74\\,\\text{dB},\\ \\text{SNR}_{16}\\approx 98\\,\\text{dB}}$$'
                        + 'Reale ADCs erreichen meist 1–2 Bit weniger (ENOB) durch Eingangsrauschen und INL/DNL-Fehler.'
                },
                {
                    q: 'Welche Vorteile bietet <strong>IO-Link (DIN EN 61131-9)</strong> gegenüber einer reinen Schaltsignal-Verkabelung (24 V)?',
                    h: 'Bidirektionale Kommunikation, Diagnose, Parametrierung.',
                    s: 'IO-Link ist die digitale Erweiterung des Standard-3-Leiter-Sensorinterfaces (L+, L−, C/Q). Der C/Q-Pin kann wahlweise als SIO-Schaltsignal (Standard-PNP/NPN) oder als bidirektionale Halbduplex-Kommunikation zwischen Master und Device betrieben werden.<br>'
                        + 'Vorteile (DIN EN 61131-9:2014, IO-Link Spec V1.1.3):<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Parametrierung:</strong> Schaltschwellen, Filterzeiten, Skalierungen werden zentral aus der SPS gesetzt.</li>'
                        + '<li><strong>Diagnose:</strong> Sensor meldet Fehler, Übertemperatur, Versorgungsspannungs-Drift.</li>'
                        + '<li><strong>Prozessdaten:</strong> Messwerte (z.B. Temperatur, Distanz) statt nur Schaltsignal.</li>'
                        + '<li><strong>Identifikation:</strong> Sensor liefert Hersteller-ID, Typ, Seriennummer (Plug&Play).</li>'
                        + '<li><strong>COM-Geschwindigkeiten:</strong> 4,8 / 38,4 / 230,4 kBaud.</li>'
                        + '<li><strong>Rückwärtskompatibilität:</strong> Standard-Sensor in IO-Link-Port = SIO-Mode.</li></ul>'
                        + '$$\\boxed{\\text{Punkt-zu-Punkt, max. 20 m, ungeschirmte 3-Draht-Leitung}}$$'
                },
                {
                    q: 'Ein Druckaufnehmer (DMS-Vollbrücke) hat eine Empfindlichkeit von $2\\,\\text{mV/V}$ bei Vollausschlag. Bei welcher Speisespannung erreicht der Ausgang exakt $20\\,\\text{mV}$?',
                    h: 'mV/V-Angabe bedeutet $U_a/U_B$ bei Vollaussteuerung.',
                    s: 'Die Angabe "$2\\,\\text{mV/V}$" bedeutet: bei jeder Versorgungsvolt $U_B$ erzeugt der Sensor bei Vollausschlag $2\\,\\text{mV}$ Ausgangssignal:<br>'
                        + '$U_a = U_B\\cdot 2\\,\\text{mV/V}$<br>'
                        + 'Für $U_a = 20\\,\\text{mV}$: $U_B = 20/2 = 10\\,\\text{V}$.<br>'
                        + '$$\\boxed{U_B = 10\\,\\text{V}}$$'
                        + 'Typische Speisung: 5 oder 10 V; höhere $U_B$ erhöhen das Signal, aber auch Eigenerwärmung der DMS und damit Drift.'
                },
                {
                    q: 'Welcher <strong>Encoder-Typ</strong> behält seine Position auch nach Spannungsausfall — und welche elektronische Erweiterung wird zusätzlich benötigt, um Umdrehungen zu zählen?',
                    h: 'Absolut vs. inkremental; Multi-Turn.',
                    s: '<strong>Absolutwert-Encoder (single-turn)</strong> liefern direkt eine eindeutige digitale Position (z.B. 13 Bit = 8192 Schritte) innerhalb einer Umdrehung. Nach Power-Cycle ist die Position sofort verfügbar — keine Referenzfahrt nötig.<br>'
                        + 'Für mehrere Umdrehungen wird ein <strong>Multi-Turn-Encoder</strong> verwendet: Mechanische Variante mit Getriebe + zusätzlichen Codescheiben (passiv, batterielos), oder elektronisch mit gepuffertem Zähler.<br>'
                        + 'Single-Turn: Position innerhalb 360° (z.B. 13 Bit).<br>'
                        + 'Multi-Turn: zusätzliche 12 Bit ergeben 4096 zählbare Umdrehungen (z.B. SSI 25 Bit).<br>'
                        + 'Inkremental-Encoder verlieren die Position bei Power-Off und brauchen Referenzfahrt.<br>'
                        + '$$\\boxed{\\text{Absolut single-turn + Multi-Turn = positionssicher nach Power-Cycle}}$$'
                },
                {
                    q: 'Erkläre, warum bei einer Pt100-Messung in <strong>2-Leiter-Schaltung</strong> ein systematischer Fehler entsteht, und wie er in der <strong>4-Leiter-Schaltung</strong> eliminiert wird.',
                    h: 'Leitungswiderstand wird mitgemessen.',
                    s: '<strong>2-Leiter:</strong> Der Pt100-Widerstand wird mit zwei Leitungen vom Auswertegerät zum Sensor verbunden. Da die Auswertung $R_\\text{Pt100}+R_L+R_L$ sieht, entsteht ein Offset-Fehler durch den Leitungswiderstand $R_L$. Bei $R_L = 0{,}5\\,\\Omega/\\text{Leiter}$ und 10 m Kabel: Offset = $1\\,\\Omega \\to$ Fehler $\\approx 2{,}6\\,\\text{K}$ (bei $S=0{,}385\\,\\Omega/\\text{K}$).<br>'
                        + '<strong>3-Leiter:</strong> Eine dritte Leitung erlaubt Kompensation bei <em>symmetrischen</em> Leitungen. Verbleibt: Asymmetrie-Fehler.<br>'
                        + '<strong>4-Leiter (Kelvin):</strong> Zwei Leitungen prägen den Konstantstrom ein, zwei <em>strom-frei</em>e Leitungen messen die Spannung direkt am Sensor. Wegen $I\\approx 0$ in den Messleitungen tritt <em>kein</em> Leitungsspannungsabfall auf — der Leitungswiderstand wird vollständig eliminiert.<br>'
                        + '$$\\boxed{\\text{4-Leiter: }R_L\\ \\text{eliminiert, höchste Genauigkeit}}$$'
                        + 'Standard in Labor- und Hochgenauigkeits-Anwendungen.'
                },
                {
                    q: 'Ein <strong>Thermoelement Typ K</strong> wird in einem Ofen bei $T=400\\,{}^\\circ\\text{C}$ eingesetzt, die Vergleichsstelle ist $T_\\text{ref}=20\\,{}^\\circ\\text{C}$. Schätze die zu erwartende Thermospannung über die mittlere Empfindlichkeit ab.',
                    h: 'Mittlere Empfindlichkeit Typ K $\\approx 41\\,\\mu\\text{V/K}$.',
                    s: '$\\Delta T = 400 - 20 = 380\\,\\text{K}$.<br>'
                        + '$U_\\text{th} \\approx S\\cdot\\Delta T = 41\\,\\mu\\text{V/K}\\cdot 380\\,\\text{K} \\approx 15{,}6\\,\\text{mV}$.<br>'
                        + '$$\\boxed{U_\\text{th}\\approx 15{,}6\\,\\text{mV}}$$'
                        + 'Tabellenwert nach DIN EN 60584-1:2014 (Bezug 0 °C): $U(400\\,{}^\\circ\\text{C})=16{,}397\\,\\text{mV}$, $U(20\\,{}^\\circ\\text{C})=0{,}798\\,\\text{mV}$, Differenz $15{,}60\\,\\text{mV}$ — Schätzwert deckt sich auf 3 signifikante Stellen. Die Sensitivität ist temperaturabhängig (Seebeck-Koeffizient nicht konstant); für genaue Messungen wird die Tabelle interpoliert oder die ITS-90-Polynome benutzt.<br>'
                        + '<em>Quelle:</em> DIN EN 60584-1:2014, Tabelle Typ K (NiCr-Ni).'
                },
                {
                    q: 'Ein Druckaufnehmer mit Messbereich $0\\ldots 10\\,\\text{bar}$ liefert $4{-}20\\,\\text{mA}$. Welcher Druck entspricht $12\\,\\text{mA}$, und welcher Strom bedeutet $7{,}5\\,\\text{bar}$?',
                    h: 'Linear: $p = (I-4)/(20-4)\\cdot 10\\,\\text{bar}$.',
                    s: 'Lineare Skalierung 4–20 mA → 0–10 bar:<br>'
                        + '$p(12\\,\\text{mA}) = (12-4)/16\\cdot 10 = 0{,}5\\cdot 10 = 5{,}0\\,\\text{bar}$.<br>'
                        + '$I(7{,}5\\,\\text{bar}) = 4 + (7{,}5/10)\\cdot 16 = 4 + 12 = 16{,}0\\,\\text{mA}$.<br>'
                        + '$$\\boxed{12\\,\\text{mA}\\equiv 5{,}0\\,\\text{bar};\\ 7{,}5\\,\\text{bar}\\equiv 16{,}0\\,\\text{mA}}$$'
                        + 'Live-Zero (NAMUR NE 43): $3{,}8\\,\\text{mA}=$ Bereichsunterschreitung, $\\ge 21\\,\\text{mA}=$ Fehler.<br>'
                        + '<em>Quelle:</em> NAMUR NE 43 "Vereinheitlichung des Signalpegels für die Ausfallinformation von digitalen Messumformern mit analogem Ausgangssignal", Stand 2003, §2.'
                },
                {
                    q: 'Warum wird ein Hallsensor in präzisen Anwendungen mit <strong>Konstantstrom</strong> statt Konstantspannung gespeist?',
                    h: 'Beweglichkeit $\\mu_n$ ist temperaturabhängig.',
                    s: 'Die Hallspannung ist $U_H = R_H\\cdot I\\cdot B/d$ mit $R_H=1/(n\\cdot e)$, wobei $n$ die Ladungsträgerdichte ist.<br>'
                        + 'Bei <strong>Konstantspannung</strong>: Strom durchs Plättchen ändert sich mit dem temperaturabhängigen Widerstand $R = L/(n\\,e\\,\\mu_n\\,A)$. Da $\\mu_n$ stark temperaturabhängig ist (Phononen-Streuung, $\\mu\\propto T^{-3/2}$ bei Si), driftet auch der Hallstrom und damit $U_H$.<br>'
                        + 'Bei <strong>Konstantstrom</strong>: $I$ bleibt fix, $U_H$ hängt nur noch über $R_H=1/(n e)$ von der Temperatur ab. $n$ ist in dotiertem Si über weite Bereiche temperatur-stabil (im Sättigungsbereich der Dotierung). Restdrift wird typisch zu $\\le 0{,}05\\,\\%/\\text{K}$.<br>'
                        + '$$\\boxed{\\text{Konstantstrom: } U_H = R_H\\,I\\,B/d \\text{ ohne } \\mu_n\\text{-Drift}}$$'
                        + 'Praktisch realisiert mit Stromspiegel oder Bandgap-Referenz + OPV-Stromsenke.<br>'
                        + '<em>Quelle:</em> Tränkler/Reindl, Sensortechnik, Springer Vieweg 2. Aufl. 2014, §9.3.'
                },
                {
                    q: 'Ein <strong>LVDT</strong> hat Linearbereich $\\pm 10\\,\\text{mm}$, Sensitivität $100\\,\\text{mV}/\\text{mm}$ bei Speisung. Welche Auflösung erreicht ein nachgeschalteter 16-Bit-ADC mit Eingangsbereich $\\pm 5\\,\\text{V}$?',
                    h: '$U_a^\\text{FS}=10\\,\\text{mm}\\cdot 100\\,\\text{mV/mm}=1\\,\\text{V}$; LSB des ADC umrechnen.',
                    s: 'LVDT-Vollausschlag: $U_a^\\text{FS}=\\pm 10\\,\\text{mm}\\cdot 100\\,\\text{mV/mm}=\\pm 1\\,\\text{V}$.<br>'
                        + 'ADC-Bereich: $\\pm 5\\,\\text{V}=10\\,\\text{V}_\\text{pp}$, $2^{16}=65\\,536$ Stufen.<br>'
                        + '$\\Delta U_\\text{LSB} = 10/65\\,536 \\approx 153\\,\\mu\\text{V}$.<br>'
                        + 'Umrechnung über Sensitivität: $\\Delta x = 153\\,\\mu\\text{V}/100\\,\\text{mV/mm} = 1{,}53\\,\\mu\\text{m}$ pro LSB.<br>'
                        + 'Effektiv nutzbare Auflösung (LVDT nutzt nur 20 % des ADC-Bereichs): $\\approx 13{,}7$ effektive Bits.<br>'
                        + '$$\\boxed{\\Delta x \\approx 1{,}5\\,\\mu\\text{m}/\\text{LSB}}$$'
                        + 'Optimierung: Vor-Verstärkung $\\times 5$ auf $\\pm 5\\,\\text{V}$ Vollaussteuerung → $\\Delta x \\approx 0{,}3\\,\\mu\\text{m}/\\text{LSB}$.<br>'
                        + '<em>Quelle:</em> Hering/Schoenfelder, Sensoren in Wissenschaft und Technik, Springer Vieweg 2. Aufl. 2018, §6.4.'
                },
                {
                    q: 'Wie lautet die <strong>Doppler-Gleichung</strong> für Radar-Geschwindigkeitsmessung, und welche Frequenzverschiebung entsteht bei $v=10\\,\\text{m/s}$, $f_0=24\\,\\text{GHz}$, $\\cos\\theta=1$?',
                    h: '$\\Delta f = 2 f_0 v\\cos\\theta / c$ (Hin- und Rückweg, $c=3\\cdot 10^8\\,\\text{m/s}$).',
                    s: 'Beim monostatischen CW-Doppler-Radar:<br>'
                        + '$\\Delta f = \\dfrac{2 f_0\\,v\\cos\\theta}{c}$<br>'
                        + 'Beispiel: $\\Delta f = 2\\cdot 24\\cdot 10^9\\cdot 10/(3\\cdot 10^8) = 4{,}8\\cdot 10^{11}/(3\\cdot 10^8) = 1600\\,\\text{Hz}$.<br>'
                        + '$$\\boxed{\\Delta f \\approx 1{,}6\\,\\text{kHz}}$$'
                        + 'Hörbarer NF-Bereich → unmittelbare Audioauswertung möglich (klassisches "Polizeiradar"). Bei Ultraschall (z.B. $f_0=40\\,\\text{kHz}$, $c=343\\,\\text{m/s}$): gleiche Geschwindigkeit erzeugt $\\Delta f \\approx 2{,}3\\,\\text{kHz}$ — relativ höher, da $c$ kleiner.<br>'
                        + 'Cos-Term: Bei schräger Anströmung sinkt die radiale Geschwindigkeitskomponente. $\\theta=90°$ liefert $\\Delta f=0$.<br>'
                        + '<em>Quelle:</em> M. I. Skolnik, Radar Handbook, McGraw-Hill 3rd ed. 2008, Ch. 18.'
                },
                {
                    q: 'Wie groß ist die <strong>Grenzfrequenz</strong> eines Tiefpasses 1. Ordnung mit $R=10\\,\\text{k}\\Omega$, $C=1\\,\\mu\\text{F}$, und welche Dämpfung erzielt er bei $10\\,f_g$?',
                    h: '$f_g = 1/(2\\pi R C)$. 1. Ordnung: $-20\\,\\text{dB/Dekade}$.',
                    s: '$f_g = 1/(2\\pi\\cdot 10\\,\\text{k}\\Omega\\cdot 1\\,\\mu\\text{F}) = 1/(2\\pi\\cdot 10^{-2}) \\approx 15{,}9\\,\\text{Hz}$.<br>'
                        + 'Bei $f=10\\,f_g=159\\,\\text{Hz}$: Übertragungsfunktion $|H| = 1/\\sqrt{1+(f/f_g)^2} \\approx 1/10 = 0{,}1 \\to -20\\,\\text{dB}$.<br>'
                        + '$$\\boxed{f_g \\approx 15{,}9\\,\\text{Hz},\\ \\text{Dämpfung@10}f_g \\approx -20\\,\\text{dB}}$$'
                        + 'Anwendung: Anti-Alias-Filter vor langsamen ADCs, Glättung von PWM-Sensorsignalen, Rauschunterdrückung in DMS-Brücken. Bei höheren Filterordnungen $-20\\,\\text{dB/Dekade}$ pro Ordnung.<br>'
                        + '<em>Quelle:</em> R. Schrüffer/L. Reindl/B. Zagar, Elektrische Messtechnik, Hanser 12. Aufl. 2018, §3.4.'
                },
                {
                    q: 'Wozu dient die <strong>Common-Mode Rejection Ratio (CMRR)</strong> eines Instrumentenverstärkers, und welcher Wert ist beim AD620 typisch?',
                    h: 'Unterdrückung von Gleichtakt-Störspannungen.',
                    s: 'CMRR ist das Verhältnis aus Differenz- zu Gleichtaktverstärkung in dB:<br>'
                        + '$\\text{CMRR} = 20\\log_{10}(A_\\text{diff}/A_\\text{cm})$.<br>'
                        + 'In der DMS-Brücke oder Pt100-3-Leiter-Anordnung liegen Mess- und Bezugsknoten oft auf einem grossen, störbehafteten Gleichtaktpegel (Versorgungsspannung). Der Instrumentenverstärker (z.B. AD620) muss diesen Pegel unterdrücken, ohne das Differenzsignal zu verzerren.<br>'
                        + 'AD620 (Analog Devices) bei Gain $G=100$:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>CMRR (DC, $G=100$): $\\ge 120\\,\\text{dB}$ (typisch 130 dB).</li>'
                        + '<li>CMRR @ 60 Hz: $\\ge 100\\,\\text{dB}$ (Netzbrumm-Unterdrückung).</li></ul>'
                        + 'Externe Layout-Massnahmen: symmetrische Leiterbahnen, geschirmte Zuleitung, Guard-Driver für Schirm.<br>'
                        + '$$\\boxed{\\text{AD620: CMRR}\\ge 120\\,\\text{dB@DC}, G=100}$$'
                        + '<em>Quelle:</em> Analog Devices, AD620 Low Cost Low Power Instrumentation Amplifier, Datasheet Rev. H, 2011.'
                },
                {
                    q: 'Welchen maximalen <strong>Bürdewiderstand</strong> $R_\\text{B,max}$ darf eine 4-20-mA-Stromschleife haben, wenn die Versorgung $U_S=24\\,\\text{V}$ und der Sensor mindestens $U_\\text{S,min}=12\\,\\text{V}$ benötigt?',
                    h: '$R_\\text{B,max} = (U_S - U_\\text{S,min})/I_\\text{max}$ bei $I_\\text{max}=20\\,\\text{mA}$.',
                    s: 'Die Schleife muss bei maximaler Stromaufnahme (20 mA) noch ausreichend Spannung am Sensor liefern:<br>'
                        + '$U_S = U_\\text{S,min} + I_\\text{max}\\cdot R_\\text{B,max}$<br>'
                        + '$R_\\text{B,max} = (24 - 12)/0{,}020 = 12/0{,}020 = 600\\,\\Omega$.<br>'
                        + '$$\\boxed{R_\\text{B,max} = 600\\,\\Omega}$$'
                        + 'Aufteilung der Bürde: typischer Eingangs-Shunt $250\\,\\Omega$ (für 1–5 V Wandlung) + Leitungswiderstand + HART-Modem-Eingang. Daher kommt man bei realen Anlagen oft an die Grenze. Lösung: höhere Versorgung (z.B. 30 V), oder mehrere Eingänge mit eigener Versorgung.<br>'
                        + '<em>Quelle:</em> NAMUR NE 43, Anhang B (Lastdiagramm).'
                },
                {
                    q: 'Was ist eine <strong>Drei-Punkt-Kalibrierung</strong>, und welche Fehlerkomponenten werden damit korrigiert?',
                    h: 'Nullpunkt, Vollausschlag, Mittelpunkt.',
                    s: 'Bei einer Drei-Punkt-Kalibrierung werden drei definierte Eingangswerte $x_1<x_2<x_3$ (typ. Nullpunkt, Mitte, Endwert) gemessen und mit den Ausgangswerten verglichen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Nullpunktfehler (Offset):</strong> $y(x_1)\\ne 0$ → Offset-Korrektur $y_\\text{korr}=y-y_0$.</li>'
                        + '<li><strong>Verstärkungsfehler (Span/Gain):</strong> $y(x_3)\\ne y_\\text{FS}$ → Multiplikation $y_\\text{korr}=k\\cdot y$.</li>'
                        + '<li><strong>Linearitätsfehler:</strong> Abweichung des Mittelpunkts $y(x_2)$ von der Geraden zwischen $(x_1,y_1)$ und $(x_3,y_3)$. Wird durch quadratische oder stückweise Korrektur ausgeglichen.</li></ul>'
                        + 'Bei Sensoren mit höherer Nichtlinearität (z.B. NTC, Thermoelement) sind mehr Stützstellen (5–11) und nichtlineare Modelle (Polynom, Spline) sinnvoll.<br>'
                        + '$$\\boxed{\\text{3-Punkt: Offset + Span + Linearität (Mitte)}}$$'
                        + '<em>Quelle:</em> VDI/VDE 2600 (Metrologie-Begriffe), §3.4.'
                },
                {
                    q: 'Wie funktioniert das <strong>SSI</strong> (Synchronous Serial Interface) bei Absolut-Drehgebern, und welcher Code wird typischerweise übertragen?',
                    h: 'Master taktet, Sensor schiebt Position seriell raus. Gray-Code.',
                    s: 'SSI ist eine synchron-serielle 5-Draht-Schnittstelle (Power, Ground, Data+/-, Clock+/-):<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Master gibt Takt vor (typ. 100 kHz bis 2 MHz).</li>'
                        + '<li>Bei der ersten fallenden Flanke "frozen" der Sensor seinen aktuellen Positionswert.</li>'
                        + '<li>Bei jeder steigenden Flanke wird ein Bit übertragen (MSB zuerst).</li>'
                        + '<li>Telegramm-Länge: 13 Bit (Single-Turn) bis 25 Bit (Single + Multi-Turn).</li>'
                        + '<li>Übertragungscode: <strong>Gray-Code</strong> — nur ein Bit ändert sich bei Inkrement, vermeidet Übertragungsfehler bei Schaltflanken.</li>'
                        + '<li>Nach dem letzten Bit: Pause $\\ge 20\\,\\mu\\text{s}$, dann nächste Anforderung möglich.</li></ul>'
                        + 'Differential RS-422-Pegel ($\\pm 5\\,\\text{V}$), Reichweiten bis 400 m bei 100 kHz.<br>'
                        + '$$\\boxed{\\text{SSI: synchron-seriell, Gray-codiert, bis 25 Bit / 2 MHz}}$$'
                        + '<em>Quelle:</em> Stegmann (SICK), SSI-Spezifikation; Norm EN 50325-4.'
                },
                {
                    q: 'Ein <strong>Ultraschall-Distanzsensor</strong> arbeitet mit Time-of-Flight. Welche Distanz misst er bei $t_\\text{ToF}=2{,}5\\,\\text{ms}$ ($c=343\\,\\text{m/s}$ in Luft, 20 °C)?',
                    h: 'Hin- und Rückweg: $d = c\\,t/2$.',
                    s: '$d = c\\,t/2 = 343\\,\\text{m/s}\\cdot 2{,}5\\cdot 10^{-3}\\,\\text{s}/2 = 0{,}4287\\,\\text{m}$.<br>'
                        + '$$\\boxed{d \\approx 42{,}9\\,\\text{cm}}$$'
                        + 'Wichtige Korrekturen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Temperaturkompensation:</strong> $c(T) = 331{,}3 + 0{,}606\\,T\\,[°C]\\,\\text{m/s}$. Bei 40 °C ist $c\\approx 355\\,\\text{m/s}$ — 3,5 % höher als bei 20 °C.</li>'
                        + '<li><strong>Luftfeuchte:</strong> Einfluss $\\le 0{,}5\\,\\%$ über $0\\ldots 100\\,\\%$ rH.</li>'
                        + '<li><strong>Druck:</strong> nicht relevant für $c$, da Gas idealisiert.</li></ul>'
                        + 'Hochwertige Sensoren haben Pt100 oder NTC integriert für automatische Temperaturkompensation.<br>'
                        + '<em>Quelle:</em> Tränkler/Reindl, Sensortechnik, Springer Vieweg 2. Aufl. 2014, §10.6.'
                },
                {
                    q: 'Worin unterscheidet sich <strong>Profibus DP</strong> von <strong>PROFINET</strong> bezüglich Physical Layer und Echtzeitfähigkeit?',
                    h: 'RS-485 vs. Ethernet, Token-Passing vs. Switched.',
                    s: '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Aspekt</th><th class="text-left pr-3">Profibus DP</th><th class="text-left">PROFINET</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">Physical Layer</td><td class="pr-3">RS-485, 2-Draht, max 12 Mbit/s</td><td>Industrial Ethernet 100 Mbit/s (RJ45 / M12)</td></tr>'
                        + '<tr><td class="pr-3">Topologie</td><td class="pr-3">Linie/Stich, max 32 Geräte/Segment</td><td>Stern/Linie/Ring (PRP/HSR redundant)</td></tr>'
                        + '<tr><td class="pr-3">Zugriffsverfahren</td><td class="pr-3">Master-Slave + Token-Passing</td><td>Switched Ethernet + Provider/Consumer</td></tr>'
                        + '<tr><td class="pr-3">Zykluszeit</td><td class="pr-3">$\\ge 1\\,\\text{ms}$ (typ. 5–10 ms)</td><td>RT $\\ge 1\\,\\text{ms}$, IRT $\\ge 31{,}25\\,\\mu\\text{s}$</td></tr>'
                        + '<tr><td class="pr-3">Echtzeit-Klassen</td><td class="pr-3">DP-V0/V1/V2</td><td>RT (Layer 2) / IRT (sync) / TSN</td></tr>'
                        + '</tbody></table>'
                        + 'Profibus DP wird seit Mitte der 2010er sukzessive durch PROFINET ersetzt; Profibus PA (Prozesstechnik, eigensicher) lebt weiter und wird über PROFINET-Proxies eingebunden, Migration zu Ethernet-APL.<br>'
                        + '$$\\boxed{\\text{PROFINET: Ethernet-basiert, IRT bis 31{,}25\\,\\mu s}}$$'
                        + '<em>Quelle:</em> PROFIBUS & PROFINET International (PI), "Profibus & Profinet — A Pocket Guide", 2020; IEC 61158/61784.'
                },
                {
                    q: 'Welche Filterdämpfung erreicht ein <strong>Anti-Alias-Filter 4. Ordnung Butterworth</strong> bei der doppelten Grenzfrequenz $f=2 f_g$?',
                    h: 'Butterworth $|H| = 1/\\sqrt{1+(f/f_g)^{2N}}$ mit Ordnung $N$.',
                    s: 'Bei $N=4$, $f=2 f_g$:<br>'
                        + '$|H|^2 = 1/(1 + 2^{2\\cdot 4}) = 1/(1+256) = 1/257$.<br>'
                        + '$|H| = 1/\\sqrt{257}\\approx 0{,}0624$.<br>'
                        + '$\\text{Dämpfung} = 20\\log_{10}(0{,}0624) \\approx -24{,}1\\,\\text{dB}$.<br>'
                        + '$$\\boxed{|H(2 f_g)| \\approx -24\\,\\text{dB}\\ \\text{bei Butterworth }N=4}$$'
                        + 'Asymptotisch fällt jeder Ordnungs-Pol mit $-6\\,\\text{dB/Oktave}\\equiv -20\\,\\text{dB/Dekade}$. Bei $N=4$: $-24\\,\\text{dB/Oktave}\\equiv -80\\,\\text{dB/Dekade}$. Praxis: Anti-Alias-Filter so dimensionieren, dass bei $f_s/2$ die Dämpfung > Quantisierungsrauschen-Spannweite ($6{,}02\\cdot N_\\text{ADC}+1{,}76\\,\\text{dB}$) ist.<br>'
                        + '<em>Quelle:</em> U. Tietze / Ch. Schenk, Halbleiter-Schaltungstechnik, Springer 16. Aufl. 2019, §13.5.'
                },
                {
                    q: 'Was ist die <strong>Safe Failure Fraction (SFF)</strong> eines Sensors nach IEC 61508, und wie wird sie berechnet?',
                    h: '$\\text{SFF} = (\\lambda_S+\\lambda_{DD})/(\\lambda_S+\\lambda_{DD}+\\lambda_{DU})$.',
                    s: 'IEC 61508 unterscheidet Ausfallraten:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>$\\lambda_S$ — sichere Ausfälle (führen in den sicheren Zustand).</li>'
                        + '<li>$\\lambda_{DD}$ — gefährliche, aber durch Diagnose erkannte Ausfälle.</li>'
                        + '<li>$\\lambda_{DU}$ — gefährliche unerkannte Ausfälle (kritisch).</li></ul>'
                        + 'SFF ist der Anteil der ungefährlichen + erkannten gefährlichen Ausfälle:<br>'
                        + '$\\text{SFF} = \\dfrac{\\lambda_S + \\lambda_{DD}}{\\lambda_S + \\lambda_{DD} + \\lambda_{DU}}$<br>'
                        + 'Hohe SFF → weniger Hardware-Redundanz (HFT) für gleichen SIL nötig (IEC 61508-2, Tab. 2/3).<br>'
                        + 'Beispiel: $\\lambda_S=2\\cdot 10^{-7}$, $\\lambda_{DD}=4\\cdot 10^{-7}$, $\\lambda_{DU}=1\\cdot 10^{-7}$ pro Stunde → SFF $=(2+4)/(2+4+1)=6/7\\approx 0{,}857=85{,}7\\,\\%$.<br>'
                        + '$$\\boxed{\\text{SFF} = \\dfrac{\\lambda_S+\\lambda_{DD}}{\\lambda_\\text{total}}}$$'
                        + '<em>Quelle:</em> IEC 61508-2:2010, Anhang C.'
                }
            ],

            // ============================== LEVEL 3 ==============================
            [
                {
                    q: 'Berechne die <strong>kleinste auflösbare Temperaturdifferenz</strong> bei einem Pt100 mit 4-Leiter-Anschluss und einem 24-Bit-Sigma-Delta-ADC bei Vollaussteuerung $\\pm 250\\,\\Omega$ ($-200\\ldots+400\\,{}^\\circ\\text{C}$). Effektive Auflösung (ENOB) sei 20 Bit.',
                    h: 'Pro LSB: $\\Delta R = R_\\text{FS}/2^\\text{ENOB}$. Umrechnung mit $S=R_0\\alpha$.',
                    s: 'LSB-Widerstand: $\\Delta R = 500\\,\\Omega/2^{20} = 500/1\\,048\\,576\\,\\Omega \\approx 0{,}477\\,\\text{m}\\Omega$.<br>'
                        + 'Pt100-Empfindlichkeit: $S=R_0\\alpha = 100\\cdot 3{,}851\\cdot 10^{-3}=0{,}3851\\,\\Omega/\\text{K}$.<br>'
                        + 'Temperaturauflösung: $\\Delta\\vartheta = \\Delta R/S = 0{,}477\\cdot 10^{-3}/0{,}3851 \\approx 1{,}24\\,\\text{mK}$.<br>'
                        + '$$\\boxed{\\Delta\\vartheta \\approx 1{,}2\\,\\text{mK}}$$'
                        + 'In der Realität wird diese theoretische Auflösung durch Eigenrauschen des ADC, Eigenerwärmung des Pt100 (Selbsterwärmung typ. $20\\,\\text{mW}/\\text{K}$ in Luft), Thermospannungen an Klemmen und Drift des Referenzwiderstands begrenzt. Erreichbar sind etwa 5–10 mK in der industriellen Praxis.'
                },
                {
                    q: 'Ein Beschleunigungssensor (MEMS) hat eine Empfindlichkeit von $100\\,\\text{mV}/g$, Rauschdichte $\\eta = 100\\,\\mu g/\\sqrt{\\text{Hz}}$. Berechne den <strong>Rauschpegel</strong> (RMS) in $\\mu g$ bei einer Bandbreite von $200\\,\\text{Hz}$ und gib die <strong>Auflösungsgrenze</strong> an, ab der der Sensor nicht mehr unterscheidet.',
                    h: 'Weißes Rauschen: $n_\\text{rms} = \\eta\\cdot\\sqrt{f_\\text{BW}}$. Für Spitze-Spitze meist $\\times 6$ (3$\\sigma$).',
                    s: 'RMS-Rauschen über Bandbreite $f_\\text{BW}$ (weißes, gauß-verteiltes Rauschen):<br>'
                        + '$n_\\text{rms} = \\eta\\cdot\\sqrt{f_\\text{BW}} = 100\\,\\mu g\\cdot\\sqrt{200} \\approx 100\\cdot 14{,}14 = 1414\\,\\mu g = 1{,}4\\,\\text{m}g$ RMS.<br>'
                        + 'Spitze-Spitze (6$\\sigma$, Wahrscheinlichkeit $\\le 0{,}3\\,\\%$): $n_\\text{pp}\\approx 6\\cdot 1{,}4 = 8{,}5\\,\\text{m}g$.<br>'
                        + 'Auflösungsgrenze (Smallest detectable signal, SNR=1): $\\approx 1{,}4\\,\\text{m}g$ RMS, oder ca. $8{,}5\\,\\text{m}g$ wenn man eindeutige Peaks fordert.<br>'
                        + '$$\\boxed{n_\\text{rms}\\approx 1{,}4\\,\\text{m}g\\ @\\ 200\\,\\text{Hz}}$$'
                        + 'Bandbreitenreduzierung (z.B. Tiefpass-Filter auf 50 Hz) halbiert das Rauschen auf $\\sqrt{50/200}=1/2$ der Werte. Klassischer Trade-off Bandbreite vs. Auflösung.'
                },
                {
                    q: 'Ein Sicherheits-Kreis nach <strong>IEC 61508:2010</strong> soll <strong>SIL 2</strong> erreichen (Low Demand). Welche $\\text{PFD}_\\text{avg}$-Werte sind zulässig, und welche zusätzlichen architekturalen Anforderungen (HFT, SFF) stellt die Norm an Typ-A-/Typ-B-Komponenten?',
                    h: 'SIL-2 Low Demand: $10^{-3}\\le\\text{PFD}<10^{-2}$. HFT-Tabellen 2 und 3 in IEC 61508-2.',
                    s: '<strong>SIL 2 Low Demand</strong> (IEC 61508-1, Tabelle 2): $10^{-3}\\le\\text{PFD}_\\text{avg}<10^{-2}$. Das entspricht einer mittleren Versagenswahrscheinlichkeit pro Anforderung zwischen 1:100 und 1:1000.<br>'
                        + '<strong>Hardware Fault Tolerance (HFT)</strong> nach IEC 61508-2 (Tabellen 2/3, Edition 2):<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">SFF</th><th class="text-left pr-3">Typ A (einf. Bauteile)</th><th class="text-left">Typ B (Mikroproz.)</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">SFF < 60 %</td><td class="pr-3">HFT ≥ 1</td><td>HFT ≥ 2</td></tr>'
                        + '<tr><td class="pr-3">60 % ≤ SFF < 90 %</td><td class="pr-3">HFT = 0</td><td>HFT ≥ 1</td></tr>'
                        + '<tr><td class="pr-3">90 % ≤ SFF < 99 %</td><td class="pr-3">HFT = 0</td><td>HFT = 0</td></tr>'
                        + '</tbody></table>'
                        + '(SFF = Safe Failure Fraction; Werte gelten für SIL 2.)<br>'
                        + '$$\\boxed{\\text{SIL 2: PFD}\\in[10^{-3},10^{-2}),\\ \\text{HFT/SFF nach IEC 61508-2 Tab. 2/3}}$$'
                        + 'Diagnose-Deckungsgrad (DC) erhöht SFF — typisch durch Plausibilitätsprüfung, redundante Auswertung, Watchdog.'
                },
                {
                    q: 'Ein piezoresistiver Druckaufnehmer mit DMS-Vollbrücke ($k=2{,}0$, $\\varepsilon_\\text{FS}=2\\,\\text{mm/m}$) liefert bei $U_B=10\\,\\text{V}$ und einer Nennlast von $100\\,\\text{bar}$ eine Ausgangsspannung. Berechne $U_a$ und gib die <strong>Sensitivität in mV/bar</strong> an. Welcher Verstärkungsfaktor wird vor einem 4–20-mA-Transmitter mit Eingangsbereich $\\pm 50\\,\\text{mV}$ benötigt?',
                    h: 'Vollbrücke: $U_a=U_B\\cdot k\\varepsilon$. Skalierung auf den Transmitter-Vollausschlag.',
                    s: '<strong>Vollbrücke:</strong> $U_a = U_B\\cdot k\\varepsilon = 10\\cdot 2\\cdot 2\\cdot 10^{-3} = 40\\,\\text{mV}$ bei $100\\,\\text{bar}$.<br>'
                        + 'Sensitivität: $40/100 = 0{,}4\\,\\text{mV/bar}$.<br>'
                        + '$$\\boxed{U_a = 40\\,\\text{mV},\\ S=0{,}4\\,\\text{mV/bar}}$$'
                        + '<strong>Verstärkung zum Transmitter:</strong> Der Transmitter erwartet maximal $50\\,\\text{mV}$ am Eingang. Der Sensor liefert nur $40\\,\\text{mV}$ bei Vollausschlag — der Transmitter wäre also nicht voll ausgesteuert (80 %). Um die volle 4-20-mA-Skala zu nutzen:<br>'
                        + '$V = 50/40 = 1{,}25\\,\\text{V/V}$.<br>'
                        + 'Praktisch: Instrumentenverstärker (AD620 o.ä.) mit Gain-Widerstand $R_G = 49{,}4\\,\\text{k}\\Omega/(G-1) = 49{,}4\\,\\text{k}\\Omega/0{,}25 \\approx 198\\,\\text{k}\\Omega$.<br>'
                        + 'Alternativ: Verstärkung auf $V=20$ (auf 800 mV) und nachgelagerter $\\pm 1\\,\\text{V}$-Eingang des Transmitters — weniger anfällig für Offset/Drift.'
                },
                {
                    q: 'Erkläre, warum bei <strong>kapazitiven Näherungssensoren</strong> der Schaltabstand stark vom <em>Dielektrikum</em> abhängt und welcher Reduktionsfaktor für Wasser vs. Kunststoff (PE) zu erwarten ist.',
                    h: 'Schaltschwelle wird über $\\varepsilon_r$ erreicht.',
                    s: 'Kapazitive Sensoren detektieren das Eindringen eines Mediums in das Streufeld einer Plattenkapazität. Die effektive Kapazität ist $C=\\varepsilon_0\\varepsilon_r A_\\text{eff}/d_\\text{eff}$. Die Auswerteelektronik bewertet die Frequenzänderung eines LC-Oszillators.<br>'
                        + 'Da die Kapazitätsänderung proportional zu $\\varepsilon_r-1$ des Mediums ist, steigt die Empfindlichkeit mit hoher Dielektrizitätskonstante:<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Medium</th><th class="text-left pr-3">$\\varepsilon_r$</th><th class="text-left">Reduktionsfaktor $k$</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">Wasser</td><td class="pr-3">80</td><td>1,0 (Bezug)</td></tr>'
                        + '<tr><td class="pr-3">Glas</td><td class="pr-3">5–10</td><td>0,4–0,5</td></tr>'
                        + '<tr><td class="pr-3">PE (Kunststoff)</td><td class="pr-3">2,3</td><td>0,3</td></tr>'
                        + '<tr><td class="pr-3">Holz (trocken)</td><td class="pr-3">2–6</td><td>0,2–0,5</td></tr>'
                        + '<tr><td class="pr-3">Öl</td><td class="pr-3">2,2–2,8</td><td>0,3</td></tr>'
                        + '</tbody></table>'
                        + 'Beispiel: Sensor mit $s_n=20\\,\\text{mm}$ (kalibriert auf Wasser): für PE-Behälter $s_\\text{eff}\\approx 6\\,\\text{mm}$.<br>'
                        + '$$\\boxed{s_\\text{eff}=k\\cdot s_n\\ \\text{mit }k\\propto (\\varepsilon_r-1)}$$'
                        + 'Praxis-Konsequenz: Kapazitive Füllstandssensoren müssen für das tatsächliche Medium kalibriert werden; Wechsel von Wasser auf Öl kann den Schaltpunkt um Faktor 3 verschieben.'
                },
                {
                    q: 'Bei einem Sensor-Fusion-Algorithmus (Kalman-Filter) werden Beschleunigung (Acc), Drehrate (Gyro) und Magnetfeld zur Lageschätzung kombiniert. Welche typischen <strong>Fehlerquellen</strong> hat jedes Einzelsignal, und wie ergänzen sie sich in der Fusion?',
                    h: 'Acc: rauschanfällig, aber DC-stabil. Gyro: glatt, aber Drift. Mag: störanfällig.',
                    s: 'Charakteristische Fehler:<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Sensor</th><th class="text-left pr-3">Stärke</th><th class="text-left">Schwäche</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3"><strong>Acc</strong></td><td class="pr-3">DC-stabil, langfristig korrekt (misst Gravitation)</td><td>hohes Rauschen, Vibration verfälscht Lage</td></tr>'
                        + '<tr><td class="pr-3"><strong>Gyro</strong></td><td class="pr-3">kurzfristig sehr glatt, dynamisch genau</td><td>integrative Drift ($\\sim °/\\text{h}$); Bias temperaturabhängig</td></tr>'
                        + '<tr><td class="pr-3"><strong>Mag</strong></td><td class="pr-3">absoluter Heading (Nordreferenz)</td><td>hohe Empfindlichkeit gegen ferromagnetische Störungen (Eisenstrukturen, Strom)</td></tr>'
                        + '</tbody></table>'
                        + '<strong>Komplementärfilter-Idee:</strong> $\\theta_\\text{est} = \\alpha\\cdot(\\theta_\\text{est}+\\omega_g\\,dt) + (1-\\alpha)\\cdot\\theta_\\text{acc}$ mit $\\alpha\\approx 0{,}98$. Kurzzeitig dominiert Gyro (glatt), langfristig korrigiert Acc die Drift.<br>'
                        + '<strong>Kalman:</strong> Stochastische Optimallösung mit Kovarianzmatrix; gewichtet Mess- und Prozessrauschen.<br>'
                        + '<strong>Madgwick:</strong> Gradient-Descent-basierte Quaternion-Schätzung, recheneffizient für eingebettete Systeme.<br>'
                        + '$$\\boxed{\\text{Acc + Gyro = drift-freie Lage; Mag = Heading}}$$'
                        + 'Magnetometer wird oft im Indoor-Bereich deaktiviert, da Stör-Eisenstrukturen den Heading verfälschen.'
                },
                {
                    q: 'Berechne den <strong>Schaltabstands-Drift</strong> eines induktiven Näherungssensors über den Temperaturbereich $-25\\,{}^\\circ\\text{C}$ bis $+70\\,{}^\\circ\\text{C}$ bei einem Temperaturkoeffizienten von $\\alpha_T=\\pm 10\\,\\%$ über den genannten Bereich (typischer Industriewert). Was bedeutet das für die Auslegung des nominalen Schaltabstands?',
                    h: 'Effektiver Schaltabstand $s_a$ muss innerhalb der Toleranz bleiben.',
                    s: 'IEC 60947-5-2 unterscheidet drei Schaltabstands-Größen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>$s_n$ — nominaler Schaltabstand (Datenblatt-Wert, ohne Toleranzen)</li>'
                        + '<li>$s_r$ — realer Schaltabstand, $0{,}9\\cdot s_n\\le s_r\\le 1{,}1\\cdot s_n$ (Fertigungstoleranz)</li>'
                        + '<li>$s_a$ — abgesicherter Schaltabstand, $s_a\\le 0{,}81\\cdot s_n$ (über Temperatur und Versorgungsspannung garantiert)</li></ul>'
                        + '$0{,}81 = 0{,}9 \\cdot 0{,}9$ (Fertigung × Temperatur).<br>'
                        + 'Bei $\\alpha_T=\\pm 10\\,\\%$: $s_\\text{min,T}=0{,}9\\cdot s_r=0{,}9\\cdot 0{,}9\\cdot s_n = 0{,}81\\,s_n$.<br>'
                        + '$$\\boxed{s_a = 0{,}81\\cdot s_n}$$'
                        + 'Praktische Konsequenz: bei $s_n=10\\,\\text{mm}$ ist nur $s_a=8{,}1\\,\\text{mm}$ als Auslegungswert sicher. Daher wird der Sensor in der Anwendung typischerweise auf $\\le 0{,}7\\cdot s_n$ eingestellt, um zusätzliche Reserve für Verschmutzung, Vibration und Alterung zu haben.'
                },
                {
                    q: 'In einer Anlage werden 64 Pt100-Messstellen über eine zentrale Auswertung erfasst. Aus EMV-Gründen und zur Diagnose soll <strong>HART</strong> über eine 4–20-mA-Schleife genutzt werden. Erkläre <strong>HART-Protokoll</strong>-Grundlagen und Vorteile gegenüber reinem Analog-Betrieb.',
                    h: 'Bell 202 FSK, $\\pm 0{,}5\\,\\text{mA}$ Modulation über 4-20 mA.',
                    s: '<strong>HART (Highway Addressable Remote Transducer)</strong> ist ein digitales Halbduplex-Kommunikationsprotokoll, das <em>auf</em> der 4–20-mA-Stromschleife liegt:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Modulation: <strong>FSK Bell 202</strong> — "0" = 2200 Hz, "1" = 1200 Hz, $\\pm 0{,}5\\,\\text{mA}$ um das DC-Signal.</li>'
                        + '<li>Übertragungsrate: 1200 Baud (HART 5/7), bis 9600 Baud bei HART-IP/WirelessHART.</li>'
                        + '<li>DC-Mittelwert bleibt unverändert — das analoge $4–20\\,\\text{mA}$-Signal wird <strong>nicht gestört</strong>.</li>'
                        + '<li>Master/Slave: Primary Master (DCS/SPS), Secondary Master (Handheld), Slave = Sensor/Aktor.</li>'
                        + '<li>Adressierung: 0 = Standard-Punkt-zu-Punkt mit Analog-Strom; 1–15 = Multi-Drop (mehrere Geräte an einer Leitung, dann fester Strom $\\approx 4\\,\\text{mA}$ pro Gerät).</li></ul>'
                        + 'Vorteile gegenüber reinem 4–20-mA:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Parametrierung über Bus (Range, Damping, Linearisierung).</li>'
                        + '<li>Diagnose: Geräte-Status, Sensor-Bruch, Eigenfehler.</li>'
                        + '<li>Sekundärvariablen: zusätzlich zur primären Messgröße können bis zu 4 weitere übertragen werden.</li>'
                        + '<li>Asset-Management: DD-/EDDL-Files für Plant-Asset-Management-Systeme.</li></ul>'
                        + '$$\\boxed{\\text{HART: digital auf 4-20 mA, DC unverändert, FSK Bell 202}}$$'
                        + 'Heute oft Migration zu WirelessHART (IEEE 802.15.4 @ 2,4 GHz) oder Profinet/Ethernet-APL.'
                },
                {
                    q: 'Welche <strong>Eigenerwärmung</strong> erzeugt ein Pt100 bei einem Messstrom von $I=1\\,\\text{mA}$ in ruhender Luft (typischer Wärmeübergangskoeffizient $G_\\text{th}=20\\,\\text{mW/K}$), und welcher resultierende Messfehler entsteht?',
                    h: 'Eigenerwärmung: $\\Delta\\vartheta = P/G_\\text{th}$ mit $P = I^2 R$.',
                    s: 'Verlustleistung am Pt100 bei $R\\approx 100\\,\\Omega$ und $I=1\\,\\text{mA}$:<br>'
                        + '$P = I^2 R = (10^{-3})^2\\cdot 100 = 10^{-4}\\,\\text{W} = 0{,}1\\,\\text{mW}$.<br>'
                        + 'Eigenerwärmung: $\\Delta\\vartheta = P/G_\\text{th} = 0{,}1\\,\\text{mW}/20\\,\\text{mW/K} = 5\\,\\text{mK}$.<br>'
                        + '$$\\boxed{\\Delta\\vartheta_\\text{self} \\approx 5\\,\\text{mK}}$$'
                        + 'Allerdings: bei höheren Temperaturen (z.B. $400\\,{}^\\circ\\text{C}$) ist $R\\approx 247\\,\\Omega$ und damit $P\\approx 0{,}247\\,\\text{mW}\\to\\Delta\\vartheta\\approx 12{,}3\\,\\text{mK}$.<br>'
                        + 'Praktische Konsequenzen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Messstrom möglichst klein halten ($\\le 1\\,\\text{mA}$).</li>'
                        + '<li>Pulsförmiger Messstrom (z.B. $5\\,\\text{ms}$ ein / $50\\,\\text{ms}$ aus) reduziert mittlere Leistung um Faktor 10.</li>'
                        + '<li>$G_\\text{th}$ stark medienabhängig: in Luft $\\sim 20\\,\\text{mW/K}$, in Wasser $\\sim 200\\,\\text{mW/K}$, in bewegtem Öl bis $1\\,\\text{W/K}$.</li>'
                        + '<li>Hochpräzisions-Messungen ($< 1\\,\\text{mK}$) erfordern Strom-Pulsbetrieb oder Brückenmessung mit minimaler Leistung.</li></ul>'
                        + 'Datenblatt-Klassifizierung: Selbsterwärmungs-Faktor $\\delta=P/\\Delta\\vartheta$ in mW/K — entspricht $G_\\text{th}$.'
                },
                {
                    q: 'Eine <strong>DMS-Vollbrücke</strong> wird so verbaut, dass zwei DMS in Längsrichtung ($+\\varepsilon$) und zwei in Querrichtung ($-\\nu\\varepsilon$) liegen (Poisson-Brücke). Leite die Brückengleichung ab und gib den effektiven k-Faktor an ($\\nu=0{,}3$, $k_\\text{DMS}=2$).',
                    h: 'Brückengleichung: $U_a/U_B = (k/4)(\\varepsilon_1-\\varepsilon_2+\\varepsilon_3-\\varepsilon_4)$.',
                    s: 'Mit $\\varepsilon_1=\\varepsilon_3=+\\varepsilon$ (längs, Zug) und $\\varepsilon_2=\\varepsilon_4=-\\nu\\varepsilon$ (Querkontraktion):<br>'
                        + '$\\dfrac{U_a}{U_B} = \\dfrac{k}{4}\\bigl(\\varepsilon - (-\\nu\\varepsilon) + \\varepsilon - (-\\nu\\varepsilon)\\bigr) = \\dfrac{k}{4}\\cdot 2(1+\\nu)\\varepsilon = \\dfrac{k(1+\\nu)}{2}\\,\\varepsilon$<br>'
                        + 'Effektiver k-Faktor: $k_\\text{eff} = k(1+\\nu) = 2\\cdot 1{,}3 = 2{,}6$.<br>'
                        + 'Empfindlichkeit: $(U_a/U_B)/\\varepsilon = k_\\text{eff}/2 = 1{,}3\\,\\text{V/V pro Einheitsdehnung}$, das sind $1{,}3\\,\\text{mV/V}$ pro mm/m.<br>'
                        + '$$\\boxed{U_a/U_B = (k(1+\\nu)/2)\\,\\varepsilon,\\ k_\\text{eff}=2{,}6}$$'
                        + 'Vorteil dieser Anordnung: vollständige Kompensation von Längsbiegung (Biege-Anteile $\\varepsilon_\\text{Biege}$ erzeugen entgegengesetzte Dehnungen in den 4 DMS-Paaren und löschen sich aus). Erlaubt reine Zug-/Druck-Kraftmessung.<br>'
                        + '<em>Quelle:</em> K. Hoffmann, Eine Einführung in die Technik des Messens mit Dehnungsmessstreifen, HBM Hottinger 1987, §5.'
                },
                {
                    q: 'Was beschreibt die <strong>Allan-Varianz $\\sigma_A^2(\\tau)$</strong> eines IMU-Sensors, und welche Charakteristika lassen sich aus dem Allan-Plot ablesen?',
                    h: 'Stochastik-Tool für nicht-stationäre Driftprozesse; Steigungen im log-log-Plot.',
                    s: 'Die Allan-Varianz ist die Varianz <em>zwischen</em> aufeinanderfolgenden Mittelwerten über ein Zeitfenster $\\tau$:<br>'
                        + '$\\sigma_A^2(\\tau) = \\dfrac{1}{2}\\langle(\\bar y_{k+1}-\\bar y_k)^2\\rangle$<br>'
                        + 'Im log-log-Plot $\\sigma_A(\\tau)$ vs. $\\tau$ erscheinen typische Rauschterme als <em>Geraden mit charakteristischen Steigungen</em>:<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Steigung</th><th class="text-left pr-3">Rauschterm</th><th class="text-left">Größe</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">$-1/2$</td><td class="pr-3">Angle/Velocity Random Walk (white noise)</td><td>$N$ in $°/\\sqrt{\\text{h}}$ bzw. $\\text{m/s}/\\sqrt{\\text{h}}$</td></tr>'
                        + '<tr><td class="pr-3">$0$ (Minimum)</td><td class="pr-3">Bias-Instabilität (1/f flicker)</td><td>$B$ in $°/\\text{h}$</td></tr>'
                        + '<tr><td class="pr-3">$+1/2$</td><td class="pr-3">Rate Random Walk (red noise)</td><td>$K$ in $°/\\text{h}/\\sqrt{\\text{h}}$</td></tr>'
                        + '<tr><td class="pr-3">$+1$</td><td class="pr-3">Rate Ramp (deterministisches Drift)</td><td>$R$ in $°/\\text{h}^2$</td></tr>'
                        + '</tbody></table>'
                        + 'Das Minimum (Plateau, Steigung 0) liefert die <strong>Bias-Instabilität</strong> — die wichtigste Kenngrösse für Trägheitsnavigation. Typische MEMS-Gyros: $10\\,°/\\text{h}$, FOG: $0{,}01\\,°/\\text{h}$, RLG: $0{,}001\\,°/\\text{h}$.<br>'
                        + '$$\\boxed{\\sigma_A^2(\\tau)\\ \\text{trennt Rauschtypen über Steigungen}}$$'
                        + '<em>Quelle:</em> IEEE Std 952-1997, "Standard Specification Format Guide and Test Procedure for Single-Axis Interferometric Fiber Optic Gyros", §5.5.'
                },
                {
                    q: 'Wann verwendet man <strong>SAR-, Pipeline- oder Sigma-Delta-ADC</strong>? Vergleiche die drei Architekturen entlang Geschwindigkeit, Auflösung und Latenz.',
                    h: 'SAR: mittel/mittel, geringe Latenz. Pipeline: schnell/mittel. Sigma-Delta: langsam/hoch.',
                    s: '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Architektur</th><th class="text-left pr-3">Auflösung</th><th class="text-left pr-3">Speed</th><th class="text-left pr-3">Latenz</th><th class="text-left">Anwendung</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3"><strong>SAR</strong></td><td class="pr-3">8–18 Bit</td><td class="pr-3">10 kSPS–10 MSPS</td><td class="pr-3">1 Zyklus (low)</td><td>Multiplex-Mehrkanal, IO-Karten</td></tr>'
                        + '<tr><td class="pr-3"><strong>Pipeline</strong></td><td class="pr-3">10–16 Bit</td><td class="pr-3">10–500 MSPS</td><td class="pr-3">$\\ge 5$ Zyklen</td><td>Video, Software-Defined-Radio</td></tr>'
                        + '<tr><td class="pr-3"><strong>Sigma-Delta</strong></td><td class="pr-3">16–24 Bit</td><td class="pr-3">10 SPS–1 MSPS</td><td class="pr-3">hoch ($\\sim$ Decimation-Filter)</td><td>Temperatur, Wägezellen, Audio</td></tr>'
                        + '</tbody></table>'
                        + '<strong>SAR:</strong> sukzessive Approximation, eine Komparatorentscheidung pro Bit, kein Aliasing-Problem (1-Zyklus). Beispiel: AD7980, 16 Bit @ 1 MSPS.<br>'
                        + '<strong>Pipeline:</strong> mehrstufig (z.B. 8 Stufen à 2 Bit), parallel; hoher Durchsatz, aber Latenz und Verzerrung. Beispiel: ADC12D1600, 12 Bit @ 3,2 GSPS.<br>'
                        + '<strong>Sigma-Delta:</strong> Oversampling + Noise-Shaping + digitales Dezimationsfilter. Sehr hoch auflösend, intern $f_s\\cdot\\text{OSR}$, OSR bis 256x. Beispiel: AD7124, 24 Bit @ 19,2 kSPS.<br>'
                        + '$$\\boxed{\\text{SAR: low-latency, Pipeline: high-speed, }\\Sigma\\Delta\\text{: high-res}}$$'
                        + '<em>Quelle:</em> Walt Kester (Hrsg.), The Data Conversion Handbook, Analog Devices / Newnes 2005, §3.'
                },
                {
                    q: 'In einem <strong>ISO 26262 ASIL B</strong>-Sensorpfad (Automotive) ist ein redundanter Beschleunigungssensor verbaut. Welche Diagnose-Mechanismen verlangt die Norm typischerweise auf Sensor-Element-Ebene?',
                    h: 'Plausibilitätsprüfung, Watchdog, Self-Test.',
                    s: 'ISO 26262-5:2018 ("Product development at the hardware level") fordert für ASIL B in der Sensor-Stufe typische Diagnose-Maßnahmen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Range-Check</strong>: physikalisch unsinnige Werte (z.B. $\\pm \\text{Vollausschlag}\\cdot 1{,}2$) führen zur Fehlermeldung.</li>'
                        + '<li><strong>Cross-Check</strong>: Vergleich zweier redundanter Kanäle (z.B. zwei MEMS-Acc-Chips), Toleranz typ. $\\pm 5\\,\\%$.</li>'
                        + '<li><strong>Built-In Self Test (BIST)</strong>: aktive Auslenkung der MEMS-Masse durch elektrostatischen Aktuator beim Power-On.</li>'
                        + '<li><strong>Watchdog</strong>: regelmäßige Lebensmeldung des Sensor-ICs an die Auswerte-MCU.</li>'
                        + '<li><strong>Signal-Validity</strong>: Out-of-Range, Saturation, Internal-Fault-Flags im SPI/I²C-Telegramm (z.B. ASIL-Status-Bits).</li>'
                        + '<li><strong>Time-out</strong>: max. Antwortzeit überwacht; ohne neue Daten → SafeState.</li></ul>'
                        + 'Diagnose-Deckungsgrad (DC) muss laut ISO 26262-5 Tabelle 1 für ASIL B bei Random-Hardware-Fault $\\ge 90\\,\\%$ liegen, Latent-Fault-Metric $\\ge 60\\,\\%$.<br>'
                        + '$$\\boxed{\\text{DC} \\ge 90\\,\\%\\ \\text{für ASIL B}}$$'
                        + '<em>Quelle:</em> ISO 26262-5:2018, Tabelle 1 und §6.4.'
                },
                {
                    q: 'Erkläre die <strong>Bayessche Sensor-Fusion</strong>: posterior $\\propto$ likelihood $\\times$ prior. Wie wird sie konkret in einem Beispiel mit zwei verrauschten Distanzsensoren angewandt?',
                    h: 'Multiplikation zweier Gauß-Verteilungen ergibt Gauß-Verteilung mit gewichtetem Mittelwert.',
                    s: 'Allgemeines Bayes-Update für die Zustandsschätzung $x$:<br>'
                        + '$p(x|z_1,z_2) \\propto p(z_1|x)\\,p(z_2|x)\\,p(x)$.<br>'
                        + 'Mit zwei gauß-verteilten Messungen $z_i\\sim\\mathcal{N}(x,\\sigma_i^2)$ wird die Posterior wieder gauß-verteilt:<br>'
                        + '$\\mu_\\text{post} = \\dfrac{z_1/\\sigma_1^2 + z_2/\\sigma_2^2 + \\mu_0/\\sigma_0^2}{1/\\sigma_1^2 + 1/\\sigma_2^2 + 1/\\sigma_0^2}$, $\\sigma_\\text{post}^2 = \\bigl(\\sum 1/\\sigma_i^2\\bigr)^{-1}$.<br>'
                        + '<strong>Beispiel:</strong> Laser-Sensor liefert $z_1=2{,}03\\,\\text{m}$ mit $\\sigma_1=0{,}01\\,\\text{m}$, Ultraschall liefert $z_2=1{,}98\\,\\text{m}$ mit $\\sigma_2=0{,}05\\,\\text{m}$, kein informativer Prior ($\\sigma_0\\to\\infty$):<br>'
                        + '$\\mu_\\text{post} = \\dfrac{2{,}03/10^{-4} + 1{,}98/(25\\cdot 10^{-4})}{1/10^{-4}+1/(25\\cdot 10^{-4})} = \\dfrac{20\\,300+792}{10\\,000+400}=\\dfrac{21\\,092}{10\\,400}\\approx 2{,}028\\,\\text{m}$.<br>'
                        + '$\\sigma_\\text{post}=1/\\sqrt{1/10^{-4}+1/(25\\cdot 10^{-4})}=1/\\sqrt{10\\,400}\\approx 0{,}0098\\,\\text{m}$.<br>'
                        + '$$\\boxed{\\mu_\\text{post}\\approx 2{,}03\\,\\text{m},\\ \\sigma_\\text{post}\\approx 9{,}8\\,\\text{mm}}$$'
                        + 'Der Laser dominiert wegen kleinerem $\\sigma$; die Fusion ist genauer als jeder Einzelsensor (Varianz kleiner).<br>'
                        + '<em>Quelle:</em> S. Thrun, W. Burgard, D. Fox, Probabilistic Robotics, MIT Press 2005, §2.4.'
                },
                {
                    q: 'Beschreibe das <strong>diskrete Kalman-Filter</strong> in seinen zwei Schritten (Prädiktion / Korrektur) am Beispiel der 1D-Tracking-Aufgabe mit Acc-Sensor.',
                    h: 'State $x = [p, v]^T$; Prädiktion mit konstanter Beschleunigung; Korrektur mit Messung.',
                    s: 'Zustandsmodell mit konstanter Beschleunigung $u_k=a_k$ und Sampling-Zeit $T$:<br>'
                        + '$\\mathbf{x}_{k+1} = \\mathbf{F}\\mathbf{x}_k + \\mathbf{B}u_k + \\mathbf{w}_k$ mit $\\mathbf{F}=\\begin{pmatrix}1 & T\\\\ 0 & 1\\end{pmatrix}$, $\\mathbf{B}=\\begin{pmatrix}T^2/2\\\\ T\\end{pmatrix}$.<br>'
                        + '<strong>Prädiktion:</strong><br>'
                        + '$\\hat{\\mathbf{x}}_{k+1|k} = \\mathbf{F}\\hat{\\mathbf{x}}_{k|k} + \\mathbf{B}u_k$<br>'
                        + '$\\mathbf{P}_{k+1|k} = \\mathbf{F}\\mathbf{P}_{k|k}\\mathbf{F}^T + \\mathbf{Q}$<br>'
                        + '<strong>Korrektur</strong> mit Messgleichung $z_{k+1} = \\mathbf{H}\\mathbf{x}_{k+1} + v_{k+1}$ (z.B. nur Position: $\\mathbf{H}=[1\\ 0]$):<br>'
                        + '$\\mathbf{K}_{k+1} = \\mathbf{P}_{k+1|k}\\mathbf{H}^T(\\mathbf{H}\\mathbf{P}_{k+1|k}\\mathbf{H}^T + R)^{-1}$<br>'
                        + '$\\hat{\\mathbf{x}}_{k+1|k+1} = \\hat{\\mathbf{x}}_{k+1|k} + \\mathbf{K}_{k+1}(z_{k+1}-\\mathbf{H}\\hat{\\mathbf{x}}_{k+1|k})$<br>'
                        + '$\\mathbf{P}_{k+1|k+1} = (\\mathbf{I}-\\mathbf{K}_{k+1}\\mathbf{H})\\mathbf{P}_{k+1|k}$<br>'
                        + '$\\mathbf{Q}$ (Prozessrauschen): Unsicherheit über Modellabweichung der Beschleunigung. $R$: Messrauschen-Varianz.<br>'
                        + '$$\\boxed{\\text{Kalman: Prädiktion + Korrektur, optimal für lineare Gauß-Systeme}}$$'
                        + '<em>Quelle:</em> R. E. Kalman, "A New Approach to Linear Filtering and Prediction Problems", ASME Journal of Basic Engineering 82(D), 1960, pp. 35–45.'
                },
                {
                    q: 'Wie misst ein <strong>Lasertriangulationssensor</strong> Distanz, und welche typische Genauigkeit erreicht er bei Messbereich $50\\ldots 100\\,\\text{mm}$?',
                    h: 'Laser projiziert Punkt; CMOS-Zeile detektiert Position des Reflexes.',
                    s: 'Ein Laser-Triangulationssensor projiziert einen Laserpunkt auf das Messobjekt; eine seitlich angebrachte Kamera/CMOS-Zeile beobachtet die Reflexion unter Triangulationswinkel $\\alpha$.<br>'
                        + 'Bei Abstandsänderung $\\Delta d$ verschiebt sich der Reflex auf dem Sensor um $\\Delta x = \\Delta d\\cdot\\tan\\alpha\\cdot f_\\text{ob}/d$ (mit Objektiv-Brennweite $f_\\text{ob}$).<br>'
                        + 'Geometrie: $d = (f_\\text{ob}\\cdot b)/(x\\cdot\\cos\\alpha + f_\\text{ob}\\sin\\alpha)$, mit Basisabstand $b$ Laser-Sensor.<br>'
                        + 'Typische Werte:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Messbereich $50\\ldots 100\\,\\text{mm}$ ($\\Delta 50\\,\\text{mm}$).</li>'
                        + '<li>Linearität $\\le 0{,}05\\,\\%$ vom Messbereich, hier $\\approx 25\\,\\mu\\text{m}$.</li>'
                        + '<li>Auflösung $\\le 1\\,\\mu\\text{m}$ durch Sub-Pixel-Interpolation (Schwerpunktbildung).</li>'
                        + '<li>Sample-Rate 1–100 kHz.</li></ul>'
                        + 'Probleme: Oberflächenneigung, glänzende Oberflächen (Speckle, Spiegelreflexion), Transparenz. Lösung: Mehrkamera-Systeme, polarisierte Detektion, blauer Laser für glänzende Oberflächen.<br>'
                        + '$$\\boxed{\\Delta x = f_\\text{ob}\\sin\\alpha\\cdot\\Delta d/d^2,\\ \\text{Auflösung typ. }1\\,\\mu\\text{m}}$$'
                        + '<em>Quelle:</em> Hering/Schoenfelder, Sensoren in Wissenschaft und Technik, Springer Vieweg 2. Aufl. 2018, §7.6.'
                },
                {
                    q: 'Welche <strong>Echtzeit-Klassen</strong> spezifiziert IEC 61784-2 für PROFINET, und welche Zykluszeit/Jitter ist mit <strong>IRT</strong> erreichbar?',
                    h: 'NRT / RT (Layer 2) / IRT (synchronisiert) / TSN.',
                    s: 'IEC 61784-2:2019 (Industrial Communication Networks – Profiles) definiert für PROFINET:<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Klasse</th><th class="text-left pr-3">Zyklus</th><th class="text-left pr-3">Jitter</th><th class="text-left">Anwendung</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">NRT</td><td class="pr-3">$\\ge 100\\,\\text{ms}$</td><td class="pr-3">unbestimmt</td><td>Parametrierung, Diagnose</td></tr>'
                        + '<tr><td class="pr-3">RT (Class 1)</td><td class="pr-3">$1\\ldots 10\\,\\text{ms}$</td><td class="pr-3">$\\le 1\\,\\text{ms}$</td><td>Standard-IO</td></tr>'
                        + '<tr><td class="pr-3">IRT (Class 3)</td><td class="pr-3">$\\ge 250\\,\\mu\\text{s}$</td><td class="pr-3">$\\le 1\\,\\mu\\text{s}$</td><td>Motion-Control, isochron</td></tr>'
                        + '<tr><td class="pr-3">TSN</td><td class="pr-3">$\\ge 31{,}25\\,\\mu\\text{s}$</td><td class="pr-3">$\\le 1\\,\\mu\\text{s}$</td><td>konvergente OT/IT-Netze</td></tr>'
                        + '</tbody></table>'
                        + 'IRT (Isochronous Real-Time) nutzt zeitgeschlitzte Frame-Übertragung — alle Switches im Netz sind synchronisiert (Sync-Master + Sync-Slaves nach IEEE 1588 / PTP-Profil). Eigene Hardware-MAC nötig.<br>'
                        + '$$\\boxed{\\text{IRT: Zyklus 250\\,\\mu s, Jitter} \\le 1\\,\\mu\\text{s}}$$'
                        + 'Für höchste Anforderungen (Drehbearbeitung mit Synchron-Spindel) wird PROFINET zunehmend durch Time-Sensitive Networking (TSN, IEEE 802.1Q-2022) abgelöst.<br>'
                        + '<em>Quelle:</em> IEC 61784-2:2019, §6.'
                },
                {
                    q: 'Wie funktioniert die <strong>Hard-Iron- und Soft-Iron-Kalibrierung</strong> eines Drei-Achs-Magnetometers, und wozu wird sie benötigt?',
                    h: 'Ellipsoid-Fit der Rohdaten; Verschiebung + lineare Verzerrung kompensieren.',
                    s: 'Ein 3D-Magnetometer misst im idealen Fall einen Vektor $\\vec B = R_\\text{Erde}\\,\\vec B_\\text{Erde}$ konstanten Betrags. Wird der Sensor über alle Lagen rotiert, sollte er eine <em>Kugel</em> mit Radius $|\\vec B_\\text{Erde}|$ abbilden.<br>'
                        + 'Reale Daten zeigen ein <strong>verschobenes Ellipsoid</strong>:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li><strong>Hard-Iron</strong>: permanente Magneten (z.B. Lautsprecher, Reedrelais) erzeugen einen konstanten Offset-Vektor $\\vec b$ — verschiebt das Ellipsoid vom Ursprung weg.</li>'
                        + '<li><strong>Soft-Iron</strong>: ferromagnetische Strukturen (Eisenstruktur des Geräts) verzerren das Feld linear → das Ellipsoid wird gestreckt/gekippt, beschrieben durch Matrix $\\mathbf{A}$.</li></ul>'
                        + 'Korrekturmodell: $\\vec B_\\text{korr} = \\mathbf{A}^{-1}(\\vec B_\\text{mess}-\\vec b)$.<br>'
                        + 'Bestimmung: Sensor rotiert in beliebigen Lagen → Ellipsoid-Fit (numerisch über Singular Value Decomposition oder Least-Squares mit quadratischer Form) liefert $\\vec b$ und $\\mathbf{A}$.<br>'
                        + '$$\\boxed{\\vec B_\\text{korr} = \\mathbf{A}^{-1}(\\vec B_\\text{mess}-\\vec b)}$$'
                        + 'Ohne Kalibrierung: Heading-Fehler bis $\\pm 30°$ in Eisenstrukturen, kein zuverlässiger Kompass.<br>'
                        + '<em>Quelle:</em> J. F. Vasconcelos et al., "Geometric Approach to Strapdown Magnetometer Calibration in Sensor Frame", IEEE Trans. Instrum. Meas. 60(2), 2011, pp. 606–619.'
                },
                {
                    q: 'Was ist der Unterschied zwischen <strong>Self-Capacitance</strong> und <strong>Mutual-Capacitance</strong> bei kapazitiven Touch-Sensoren?',
                    h: 'Self: Kapazität gegen GND. Mutual: Kapazität zwischen Tx und Rx.',
                    s: '<strong>Self-Capacitance:</strong> Eine Elektrode wird abwechselnd geladen/entladen; gemessen wird die Kapazität gegen Massepotenzial. Eine Fingerannäherung <em>vergrössert</em> die Kapazität (Finger als "fast geerdet"). Vorteil: hohe Empfindlichkeit, Single-Touch leicht. Nachteil: Multi-Touch ergibt Ghost-Touches (4 Punkte erscheinen als 4 mögliche Kombinationen).<br>'
                        + '<strong>Mutual-Capacitance:</strong> Matrix-Anordnung aus Tx-Reihen (sendend) und Rx-Spalten (empfangend). Gemessen wird die Kreuz-Kapazität $C_M$ an jedem Schnittpunkt. Eine Fingerannäherung <em>verringert</em> $C_M$ (Finger leitet das Feld zur Masse ab). Vorteil: echte Multi-Touch-Lokalisierung pro Pixel. Nachteil: aufwendigere Auswerteelektronik (Charge-Transfer pro Pixel).<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Größe</th><th class="text-left pr-3">Self</th><th class="text-left">Mutual</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">Effekt Finger</td><td class="pr-3">$+\\Delta C$</td><td>$-\\Delta C$</td></tr>'
                        + '<tr><td class="pr-3">Multi-Touch</td><td class="pr-3">Ghost-Touches</td><td>echtes Multi-Touch</td></tr>'
                        + '<tr><td class="pr-3">Stromaufnahme</td><td class="pr-3">niedrig</td><td>höher</td></tr>'
                        + '<tr><td class="pr-3">Anwendung</td><td class="pr-3">Tasten, Slider</td><td>Smartphone, Tablet</td></tr>'
                        + '</tbody></table>'
                        + '$$\\boxed{\\text{Mutual = Matrix, Multi-Touch; Self = einfach, höhere Sensitivität}}$$'
                        + '<em>Quelle:</em> Cypress Semiconductor (Infineon), Application Note AN64846 "Getting Started with CapSense", Rev. 2019, §2.'
                },
                {
                    q: 'Wo liegt der Unterschied zwischen einem <strong>Resolver</strong> und einem <strong>Sinus/Cosinus-Encoder</strong> bei der Rotorlagemessung an einem Servomotor?',
                    h: 'Resolver: Trafo-Prinzip, robust. Sin/Cos-Encoder: optisch, hoch auflösend.',
                    s: '<strong>Resolver:</strong> elektromechanisch nach Drehtransformator-Prinzip — eine Rotorwicklung wird mit AC-Sinussignal ($\\sim 5\\ldots 20\\,\\text{kHz}$) gespeist; zwei Statorwicklungen unter 90° liefern $U_\\sin = U_0\\sin\\theta\\cdot\\sin\\omega t$ und $U_\\cos = U_0\\cos\\theta\\cdot\\sin\\omega t$. Die Lage $\\theta$ wird über $\\arctan$ aus Hüllkurven gewonnen (RDC-IC mit Tracking-Loop). Vorteile: keine Optik/Elektronik im Rotor, hohe Robustheit (bis $200\\,{}^\\circ\\text{C}$, Vibration), absolut innerhalb einer Umdrehung. Nachteil: typ. Genauigkeit $\\pm 10\'$ (entspricht $\\pm 0{,}17°$).<br>'
                        + '<strong>Sinus/Cosinus-Encoder:</strong> optisch (Glasmaßstab) oder magnetisch — analoge Sin/Cos-Spuren mit feiner Strichteilung (z.B. $T=20\\,\\mu\\text{m}$ linear oder 1024 Perioden/Umdrehung). Interpolation in der Auswerteelektronik erreicht $\\le 0{,}001°$. Nachteil: Optik empfindlich gegen Schmutz, höhere Komponentenkosten, eingeschränkter Temperaturbereich.<br>'
                        + '<table class="text-sm my-2"><thead><tr><th class="text-left pr-3">Kriterium</th><th class="text-left pr-3">Resolver</th><th class="text-left">Sin/Cos-Encoder</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">Genauigkeit</td><td class="pr-3">$\\sim 0{,}1\\ldots 0{,}3°$</td><td>$\\le 0{,}001°$</td></tr>'
                        + '<tr><td class="pr-3">Temperatur</td><td class="pr-3">bis 200 °C</td><td>typ. $\\le 100\\,{}^\\circ\\text{C}$</td></tr>'
                        + '<tr><td class="pr-3">Vibration</td><td class="pr-3">sehr robust</td><td>begrenzt</td></tr>'
                        + '<tr><td class="pr-3">Einsatzbereich</td><td class="pr-3">Servoindustrie, Bahn, E-Auto</td><td>Werkzeugmaschine, Robotik</td></tr>'
                        + '</tbody></table>'
                        + '$$\\boxed{\\text{Resolver = robust + grob; Sin/Cos = hochauflösend + empfindlich}}$$'
                        + '<em>Quelle:</em> Heidenhain, Encoders for Servo Drives, Katalog 2020.'
                },
                {
                    q: 'Welcher <strong>ENOB-Gewinn</strong> entsteht bei einem <strong>Sigma-Delta-Modulator 1. Ordnung</strong> mit OSR=256 gegenüber einem 1-Bit-Modulator ohne Oversampling?',
                    h: '1. Ordnung: $\\text{SNR-Gewinn} = 30\\log_{10}(\\text{OSR})$ in dB.',
                    s: 'Allgemein für einen Sigma-Delta-Modulator $N$-ter Ordnung mit Oversampling-Faktor OSR:<br>'
                        + '$\\text{SNR}_\\text{max} = 6{,}02\\cdot N_\\text{Quant} + 1{,}76 - 10\\log_{10}\\bigl(\\dfrac{\\pi^{2N}}{2N+1}\\bigr) + (2N+1)\\cdot 10\\log_{10}(\\text{OSR})\\ \\text{dB}$<br>'
                        + 'Konkret für $N=1$, 1-Bit-Quantizer und OSR=256: $30\\log_{10}(256)\\approx 30\\cdot 2{,}41 \\approx 72\\,\\text{dB}$ Oversampling-Gewinn; abzüglich $\\approx 5{,}17\\,\\text{dB}$ Noise-Shaping-Konstante und plus $1{,}76\\,\\text{dB}$ Sinus-Skalierung ergibt sich:<br>'
                        + '$\\text{SNR}\\approx 6{,}02\\cdot 1 + 1{,}76 - 5{,}17 + 72 \\approx 74{,}6\\,\\text{dB}$.<br>'
                        + 'ENOB: $(74{,}6 - 1{,}76)/6{,}02 \\approx 12$ effektive Bits. Aus einem 1-Bit-Modulator werden also ca. <strong>12 effektive Bits</strong>.<br>'
                        + '$$\\boxed{\\text{ENOB-Gain}\\approx 11\\ldots 12\\,\\text{Bit bei OSR=256, }N=1}$$'
                        + 'Höhere Ordnungen sind in der Praxis üblich: $N=2$ liefert ca. 17 Bit, $N=3$ ca. 22 Bit bei gleicher OSR. Audio-Codecs (AKM, Cirrus) nutzen typ. $N=4\\ldots 5$ mit OSR=64.<br>'
                        + 'Trade-off: höhere Ordnung → potenzielle Instabilität, höherer Stromverbrauch.<br>'
                        + '<em>Quelle:</em> R. Schreier, G. C. Temes, Understanding Delta-Sigma Data Converters, Wiley/IEEE Press 2nd ed. 2017, §3.'
                },
                {
                    q: 'Definiere den <strong>Q-Faktor</strong> eines schwingenden Sensor-Systems (Coriolis-Gyro, Quarzwaage) und gib die Beziehung zur Dämpfung an.',
                    h: '$Q = 2\\pi\\cdot E_\\text{gespeichert}/E_\\text{dissipiert pro Periode}$ bzw. $Q=\\omega_0/\\Delta\\omega_{-3\\,\\text{dB}}$.',
                    s: 'Der Q-Faktor (Quality Factor) eines gedämpften Oszillators ist:<br>'
                        + '$Q = \\dfrac{\\omega_0}{\\Delta\\omega_{-3\\,\\text{dB}}} = \\dfrac{1}{2\\zeta}$, mit Dämpfungsmass $\\zeta$.<br>'
                        + 'Energie-Definition: $Q = 2\\pi\\cdot\\dfrac{\\text{gespeicherte Energie}}{\\text{dissipierte Energie pro Periode}}$.<br>'
                        + 'Typische Werte:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Quarz-Resonator (Vakuum): $Q\\approx 10^5\\ldots 10^6$.</li>'
                        + '<li>MEMS-Gyro (Vakuum-gekapselt): $Q\\approx 10^3\\ldots 10^4$.</li>'
                        + '<li>MEMS-Acc (gasgefüllt, damped): $Q\\approx 0{,}5\\ldots 5$ (kritisch gedämpft).</li></ul>'
                        + 'Höhere $Q$ bedeuten <em>höhere Empfindlichkeit</em> bei Resonanz (Amplitudenüberhöhung $A_\\text{res}=Q\\cdot A_\\text{stat}$), aber <em>schmalere Bandbreite</em> und längere Einschwingzeit ($\\tau\\propto Q/\\omega_0$).<br>'
                        + 'Bei Coriolis-Gyros wird $Q$ über Vakuumkapselung maximiert (Bias-Stabilität); bei Beschleunigungs-Sensoren über Gasdruck/Squeeze-Film-Damping auf $\\zeta\\approx 0{,}7$ eingestellt (kritisch gedämpft für maximale Bandbreite ohne Überschwingen).<br>'
                        + '$$\\boxed{Q = 1/(2\\zeta) = \\omega_0/\\Delta\\omega_{-3\\,\\text{dB}}}$$'
                        + '<em>Quelle:</em> Tränkler/Reindl, Sensortechnik, Springer Vieweg 2. Aufl. 2014, §9.7.'
                }
            ]
        ]
    };
})();
