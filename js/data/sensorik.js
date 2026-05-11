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
 *   - Pt100: Bezugswiderstand $R_0 = 100\,\Omega$ bei $0\,^\circ\text{C}$,
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
            Quadratisch (Callendar–Van-Dusen, $0\\,^\\circ\\text{C} \\le \\vartheta \\le 850\\,^\\circ\\text{C}$):
            $R(\\vartheta) = R_0[1 + A\\vartheta + B\\vartheta^2]$ mit
            $A=3{,}9083\\cdot 10^{-3}$, $B=-5{,}775\\cdot 10^{-7}$.<br>
            Toleranzklassen: AA ($\\pm 0{,}1\\,\\text{K}$ bei $0\\,^\\circ\\text{C}$), A ($\\pm 0{,}15$), B ($\\pm 0{,}3$).<br><br>

            <strong>Thermoelement (Seebeck-Effekt, DIN EN 60584-1)</strong><br>
            $U_\\text{th} = \\int_{T_\\text{ref}}^{T} (S_A(T)-S_B(T))\\,dT$ — Spannung
            entsteht im Temperaturgradient, nicht am Verbindungspunkt.<br>
            Typ K (NiCr-Ni): $\\approx 41\\,\\mu\\text{V/K}$ bei Raumtemperatur,
            -270 bis +1372 °C. <strong>Vergleichsstelle</strong> erforderlich!<br><br>

            <strong>Dehnungsmessstreifen (DMS, Wheatstone-Brücke)</strong><br>
            $\\dfrac{\\Delta R}{R} = k \\cdot \\varepsilon$ (k-Faktor ≈ 2 für Konstantan).<br>
            Halbbrücke: $\\dfrac{U_a}{U_B} = \\dfrac{k\\,\\varepsilon}{2}$ (Temperatur-kompensiert).<br>
            Vollbrücke: $\\dfrac{U_a}{U_B} = k\\,\\varepsilon$ (höchste Empfindlichkeit).<br><br>

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
            Gray-Code vermeidet Doppelsprünge an Bitgrenzen.<br><br>

            <strong>IMU (MEMS)</strong><br>
            Beschleunigungssensor: kapazitiver Comb-Drive misst Auslenkung einer Federmasse.<br>
            Gyroskop: Coriolis-Effekt $\\vec F_C = -2m\\,\\vec\\Omega\\times\\vec v$ an
            oszillierender Masse.<br>
            Sensor-Fusion (Madgwick/Kalman) kombiniert Acc + Gyro + Mag zu Lage.<br><br>

            <strong>4...20 mA (NAMUR NE 43)</strong><br>
            Live-Zero-Stromschleife: $4\\,\\text{mA} = 0\\,\\%$, $20\\,\\text{mA} = 100\\,\\%$
            Messbereich. NAMUR NE 43 (1994): $\\le 3{,}6\\,\\text{mA}$ oder $\\ge 21\\,\\text{mA}$ = Fehler;
            Mess-Untergrenze $3{,}8\\,\\text{mA}$, Obergrenze $20{,}5\\,\\text{mA}$.
            Vorteile: Drahtbruchsicher, eingeprägter Strom unempfindlich gegen Spannungsabfall.<br><br>

            <strong>IO-Link (DIN EN 61131-9:2014)</strong><br>
            Punkt-zu-Punkt-Kommunikation Master ↔ Device (max. 20 m).<br>
            COM1 = 4,8 kBaud · COM2 = 38,4 kBaud · COM3 = 230,4 kBaud.<br>
            3-Leiter (L+, L−, C/Q) — kompatibel zu Standard-Schalt-Sensoren (SIO-Mode).<br><br>

            <strong>Auflösung A/D-Wandler</strong><br>
            $\\Delta U = U_\\text{ref}/2^N$ pro LSB. SNR (ideal): $6{,}02\\cdot N + 1{,}76\\,\\text{dB}$.<br>
            Quantisierungsrauschen: $\\sigma_q = \\Delta U/\\sqrt{12}$.<br><br>

            <strong>Funktionssicherheit (IEC 61508:2010)</strong><br>
            SIL = Safety Integrity Level (1...4). Low Demand: $\\text{PFD}_\\text{avg}$,
            High Demand: PFH (Probability of Failure per Hour).<br>
            SIL 1: $10^{-2} \\le \\text{PFD} < 10^{-1}$, SIL 2: $10^{-3} \\le \\text{PFD} < 10^{-2}$,
            SIL 3: $10^{-4} \\le \\text{PFD} < 10^{-3}$, SIL 4: $10^{-5} \\le \\text{PFD} < 10^{-4}$.
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
                    s: '$R_0 = 100{,}00\\,\\Omega$ bei $0\\,^\\circ\\text{C}$.<br>'
                        + '$\\alpha = (R_{100}-R_0)/(R_0\\cdot 100\\,\\text{K}) = 3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}$.<br>'
                        + '$$\\boxed{R_0=100\\,\\Omega,\\ \\alpha=3{,}851\\cdot 10^{-3}\\,\\text{K}^{-1}}$$'
                        + 'Toleranzklassen: AA ($\\pm 0{,}1\\,\\text{K}$), A ($\\pm 0{,}15$), B ($\\pm 0{,}3$) bei $0\\,^\\circ\\text{C}$.'
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
                        + '<tr><td class="pr-3">Temperatur</td><td class="pr-3">$\\text{K}$ (oder $^\\circ\\text{C}$)</td><td>$-200\\ldots +850\\,^\\circ\\text{C}$ (Pt100)</td></tr>'
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
                }
            ],

            // ============================== LEVEL 2 ==============================
            [
                {
                    q: 'Ein Pt100 wird bei $\\vartheta=120\\,^\\circ\\text{C}$ betrieben. Berechne $R(\\vartheta)$ <em>linear</em> und <em>nach Callendar–Van-Dusen</em> und vergleiche den Fehler der linearen Näherung.',
                    h: 'Linear: $R_0(1+\\alpha\\vartheta)$. CVD (positive $\\vartheta$): $R_0[1+A\\vartheta+B\\vartheta^2]$.',
                    s: '<strong>Linear:</strong> $R = 100\\cdot(1+3{,}851\\cdot 10^{-3}\\cdot 120) = 100\\cdot 1{,}46212 = 146{,}212\\,\\Omega$.<br>'
                        + '<strong>CVD ($0\\le\\vartheta\\le 850\\,^\\circ\\text{C}$):</strong> $R = 100[1 + 3{,}9083\\cdot 10^{-3}\\cdot 120 + (-5{,}775\\cdot 10^{-7})\\cdot 120^2]$.<br>'
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
                }
            ],

            // ============================== LEVEL 3 ==============================
            [
                {
                    q: 'Berechne die <strong>kleinste auflösbare Temperaturdifferenz</strong> bei einem Pt100 mit 4-Leiter-Anschluss und einem 24-Bit-Sigma-Delta-ADC bei Vollaussteuerung $\\pm 250\\,\\Omega$ ($-200\\ldots+400\\,^\\circ\\text{C}$). Effektive Auflösung (ENOB) sei 20 Bit.',
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
                    q: 'Berechne den <strong>Schaltabstands-Drift</strong> eines induktiven Näherungssensors über den Temperaturbereich $-25\\,^\\circ\\text{C}$ bis $+70\\,^\\circ\\text{C}$ bei einem Temperaturkoeffizienten von $\\alpha_T=\\pm 10\\,\\%$ über den genannten Bereich (typischer Industriewert). Was bedeutet das für die Auslegung des nominalen Schaltabstands?',
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
                        + 'Allerdings: bei höheren Temperaturen (z.B. $400\\,^\\circ\\text{C}$) ist $R\\approx 247\\,\\Omega$ und damit $P\\approx 0{,}247\\,\\text{mW}\\to\\Delta\\vartheta\\approx 12{,}3\\,\\text{mK}$.<br>'
                        + 'Praktische Konsequenzen:<br>'
                        + '<ul class="list-disc list-inside text-sm"><li>Messstrom möglichst klein halten ($\\le 1\\,\\text{mA}$).</li>'
                        + '<li>Pulsförmiger Messstrom (z.B. $5\\,\\text{ms}$ ein / $50\\,\\text{ms}$ aus) reduziert mittlere Leistung um Faktor 10.</li>'
                        + '<li>$G_\\text{th}$ stark medienabhängig: in Luft $\\sim 20\\,\\text{mW/K}$, in Wasser $\\sim 200\\,\\text{mW/K}$, in bewegtem Öl bis $1\\,\\text{W/K}$.</li>'
                        + '<li>Hochpräzisions-Messungen ($< 1\\,\\text{mK}$) erfordern Strom-Pulsbetrieb oder Brückenmessung mit minimaler Leistung.</li></ul>'
                        + 'Datenblatt-Klassifizierung: Selbsterwärmungs-Faktor $\\delta=P/\\Delta\\vartheta$ in mW/K — entspricht $G_\\text{th}$.'
                }
            ]
        ]
    };
})();
