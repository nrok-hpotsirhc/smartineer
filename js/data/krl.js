/*
 * KRL — KUKA Robot Language (KRC2 / KRC4 / KSS 8.x).
 *
 * Quellen (oeffentliche KUKA-Dokumentation):
 *   - KUKA System Software (KSS) 8.3 / 8.5 / 8.6 — Bedien- und Programmieranleitung
 *     fuer Systemintegratoren ("Programmierhandbuch KSS"), Stand 2018-2023.
 *   - KUKA.SafeOperation, KUKA.RoboTeam, KUKA.HMI — Funktionsbeschreibungen.
 *   - DIN EN ISO 10218-1/-2:2011, DIN EN ISO 9787:2013 (Roboter-Koordinatensysteme).
 *
 * KRL ist eine Pascal-aehnliche, statisch typisierte Sprache mit speziellen
 * Robotik-Anweisungen (PTP, LIN, CIRC), Frame-Datentypen (POS, FRAME, E6POS,
 * E6AXIS) und systemvariablen-getriebener Konfiguration ($BASE, $TOOL, $VEL,
 * $APO). FOLD/ENDFOLD-Bloecke sind editorgesteuerte Sichtbarkeits-Marker und
 * werden vom Interpreter ignoriert.
 */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'krl';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    const code = (lang, body) =>
        '<pre class="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs md:text-sm overflow-x-auto my-2"><code>' +
        '<span class="text-cyan-300">[' + lang + ']</span>\n' + body +
        '</code></pre>';

    window.APP_DATA[id] = {
        id,
        name: 'KRL — KUKA Robot Language',
        desc: 'Programmierung von KUKA-Industrierobotern (KRC2/KRC4, KSS 8.x): Bewegungsbefehle PTP/LIN/CIRC, Frame-Datentypen (POS, E6POS, FRAME), Systemvariablen ($BASE, $TOOL, $VEL, $APO), SAK-Stop, FOLD/ENDFOLD, Interrupt- und BAS-Programmierung.',
        formulas: `
            <strong>KRL-Bewegungsbefehle</strong><br>
            <ul class="list-disc list-inside text-sm">
                <li><code>PTP</code> &mdash; Punkt-zu-Punkt, achsensynchrones Fahren auf der schnellsten Bahn (nicht linear im TCP).</li>
                <li><code>LIN</code> &mdash; Linear, der TCP faehrt eine Gerade im Raum.</li>
                <li><code>CIRC</code> &mdash; Kreisbahn ueber Hilfspunkt zum Zielpunkt.</li>
                <li>Vorabannaeherung: Suffix <code>_REL</code> (relativ) und Annaeherung via <code>C_PTP</code>, <code>C_DIS</code>, <code>C_VEL</code>, <code>C_ORI</code>.</li>
            </ul><br>

            <strong>Wichtige Systemvariablen (Auszug, KSS 8.x)</strong><br>
            <table class="text-xs my-2"><tbody>
                <tr><td class="pr-3"><code>$BASE</code></td><td>Aktuelles Basis-Frame (Werkstueck-Koordinatensystem)</td></tr>
                <tr><td class="pr-3"><code>$TOOL</code></td><td>Aktuelles Werkzeug-Frame (TCP-Offset)</td></tr>
                <tr><td class="pr-3"><code>$VEL.CP</code></td><td>Bahngeschwindigkeit fuer LIN/CIRC in m/s</td></tr>
                <tr><td class="pr-3"><code>$ACC.CP</code></td><td>Bahnbeschleunigung in m/s$^2$</td></tr>
                <tr><td class="pr-3"><code>$APO.CDIS</code></td><td>Annaeherungsdistanz fuer <code>C_DIS</code> in mm</td></tr>
                <tr><td class="pr-3"><code>$ADVANCE</code></td><td>Vorausschaubare Saetze (Default 3) fuer Bahnplanung</td></tr>
                <tr><td class="pr-3"><code>$OV_PRO</code></td><td>Programm-Override 0&hellip;100 %</td></tr>
                <tr><td class="pr-3"><code>$POS_ACT</code></td><td>Aktuelle Roboterposition (Lese-Variable, E6POS)</td></tr>
                <tr><td class="pr-3"><code>$AXIS_ACT</code></td><td>Aktuelle Achswinkel (E6AXIS)</td></tr>
            </tbody></table>

            <strong>Frame-Datentypen</strong><br>
            <code>POS</code> = Struktur mit kartesischen Komponenten (X, Y, Z, A, B, C) plus Status/Turn (S, T).<br>
            <code>E6POS</code> = <code>POS</code> + Zusatzachsen E1&hellip;E6.<br>
            <code>FRAME</code> = Koordinatensystem (X, Y, Z, A, B, C) ohne Status.<br>
            <code>AXIS</code> = nur Achswinkel A1&hellip;A6; <code>E6AXIS</code> = AXIS + E1&hellip;E6.<br>
            Eulerwinkel-Konvention: <strong>ZYX-Karden</strong> (intrinsisch) &mdash; A um Z, B um neues Y, C um neues X (KUKA-Konvention).<br><br>

            <strong>SAK (Satz-Anwahl-Korrektur)</strong><br>
            Beim Start aus einer beliebigen Programmzeile faehrt der Roboter <em>zwingend</em> auf die Endposition des aktuellen Bewegungssatzes &mdash; die sog. <em>SAK-Fahrt</em>. Bahn ist undefiniert (kartesisch oder achsensynchron je nach Anweisung), deshalb mit reduziertem Override testen.<br><br>

            <strong>FOLD / ENDFOLD</strong><br>
            Editor-Sichtbarkeitsmarker (kein Interpreter-Token). Inline-Folds werden vom KUKA-SmartPad zugeklappt dargestellt; der Code dazwischen ist semantisch irrelevant fuer den Interpreter.<br><br>

            <strong>Programmstruktur (.SRC + .DAT)</strong><br>
            Pro Modul zwei Dateien: <code>name.src</code> (ausfuehrbarer Code) und <code>name.dat</code> (Punktdaten).<br>
            <code>DEF name() &hellip; END</code> umschliesst die Hauptprozedur. <code>INI</code>/<code>;FOLD INI</code> initialisiert <code>$BASE</code>, <code>$TOOL</code>, <code>$BWDSTART</code>, <code>BAS(...)</code>; <code>;FOLD PTP HOME</code> faehrt Home an.<br><br>

            <strong>BAS-Funktion</strong><br>
            <code>BAS(#VEL_PTP, 100)</code> setzt PTP-Override auf 100 %.<br>
            <code>BAS(#TOOL, n)</code> waehlt Werkzeugindex n (laed <code>TOOL_DATA[n]</code> in <code>$TOOL</code>).<br>
            <code>BAS(#BASE, n)</code> waehlt Basis-Index n.<br>
            <code>BAS(#INITMOV, 0)</code> initialisiert Bewegungs-Defaultwerte.<br><br>

            <strong>Interrupt-Programmierung</strong><br>
            <code>INTERRUPT DECL prio WHEN bedingung DO upname()</code> &mdash; Unterprogramm wird bei Bedingung ausgefuehrt.<br>
            <code>INTERRUPT ON 1</code> / <code>OFF 1</code> aktiviert/deaktiviert Interrupt 1.<br>
            <code>BRAKE</code> haelt den Roboter im Interrupt an, <code>RESUME</code> bricht uebergeordnete Bewegung ab.<br><br>

            <strong>Status- und Turn-Bits</strong><br>
            <em>Status (S):</em> Bit 0 = Hauptachs-Konfiguration (Hand vor/hinter Schulter), Bit 1 = Ellenbogen oben/unten, Bit 2 = Handgelenks-Flip. <em>Turn (T):</em> 6 Vorzeichen-Bits fuer Achswinkel-Vielfache von $\\pm 180^\\circ$. Damit ist eine kartesische Position eindeutig in Achsraum auflösbar.
        `,

        levels: [
            // ============================== LEVEL 1 ==============================
            [
                {
                    q: 'Erklaere den Unterschied zwischen <code>PTP</code> und <code>LIN</code>. Welcher Befehl ist auf der schnellsten Bahn, welcher fuehrt den TCP geradlinig im Raum?',
                    h: 'PTP = Joint-Interpolation, LIN = kartesische Interpolation.',
                    s: '<code>PTP</code> (Point-to-Point) interpoliert achsensynchron: alle Achsen erreichen den Zielpunkt zur gleichen Zeit, die langsamste Achse limitiert die Bewegung. Die Bahn des TCP ist eine Kurve im Raum, deren Form von der Roboterkinematik abhaengt &mdash; sie ist <strong>nicht linear</strong>. Vorteil: schnellste Bewegung, ungefaehrlich gegenueber Singularitaeten.<br>'
                        + '<code>LIN</code> interpoliert kartesisch: der TCP faehrt eine Gerade. Alle Achsen werden so gesteuert, dass der TCP-Pfad linear bleibt; Orientierung wird parallel interpoliert. Singularitaeten (z.B. Handwurzel) koennen LIN-Bewegungen abbrechen.<br>'
                        + '$\\boxed{\\text{PTP = schnellste Bahn (achssynchron),\\;LIN = TCP-Gerade}}$'
                },
                {
                    q: 'Was ist eine SAK-Fahrt, und welche Sicherheits-Massnahme empfiehlt das KUKA-Handbuch beim manuellen Programmstart aus der Mitte eines Programms?',
                    h: 'SAK = Satz-Anwahl-Korrektur.',
                    s: 'Wird ein KRL-Programm aus einer beliebigen Zeile gestartet (statt von oben), faehrt der Roboter zunaechst auf den <em>Endpunkt</em> des angewaehlten Bewegungssatzes &mdash; die SAK-Fahrt. Diese Bahn ist <strong>nicht zwingend kollisionsfrei</strong> und folgt der zur Anweisung passenden Interpolation: <code>PTP</code> faehrt achssynchron (Joint-Bahn), <code>LIN/CIRC</code> versuchen kartesische Interpolation aus der Ist-Lage.<br>'
                        + 'Empfohlen (KSS-Bedienhandbuch): Override auf $\\leq 30\\,\\%$, T1-Modus, Sicherheitsabstand zum Werkstueck, Hand auf Zustimmtaster &mdash; und visuell mitverfolgen, da die SAK-Bahn vom Bediener zu pruefen ist.'
                },
                {
                    q: 'Wodurch unterscheiden sich die Datentypen <code>POS</code>, <code>E6POS</code>, <code>FRAME</code> und <code>AXIS</code> in KRL?',
                    h: 'Status/Turn-Bits, Zusatzachsen, kartesisch vs. achsbasiert.',
                    s: '<strong>FRAME</strong>: rein kartesisches Koordinatensystem mit (X, Y, Z, A, B, C). Keine Status/Turn-Bits, keine Zusatzachsen. Genutzt fuer <code>$BASE</code>, <code>$TOOL</code>.<br>'
                        + '<strong>POS</strong>: <code>FRAME</code> + Status (S) und Turn (T). Damit ist die Pose eindeutig in den Gelenkraum aufloesbar (z.B. Hand-vor/hinter-Schulter).<br>'
                        + '<strong>E6POS</strong>: <code>POS</code> + sechs Zusatzachsen E1&hellip;E6 (Linearschienen, Drehtische).<br>'
                        + '<strong>AXIS</strong>: nur Achswinkel A1&hellip;A6 (keine kartesische Komponente).<br>'
                        + '<strong>E6AXIS</strong>: <code>AXIS</code> + E1&hellip;E6.<br>'
                        + 'Faustregel: Bewegungsbefehle akzeptieren <code>POS</code>/<code>E6POS</code> fuer LIN/CIRC und <code>AXIS</code>/<code>E6AXIS</code> fuer reine PTP-Achsanfahrten.'
                },
                {
                    q: 'Was bewirken die Anweisungen <code>;FOLD ... ;ENDFOLD</code> in KRL?',
                    h: 'Editor-Feature, kein Interpreter-Token.',
                    s: 'FOLD/ENDFOLD sind <strong>reine Editor-Marker</strong> fuer das KUKA-SmartPad: Zeilen zwischen den Markern werden im Bedienpanel zugeklappt dargestellt (Inline-Form). Der KRL-Interpreter ignoriert FOLD/ENDFOLD vollstaendig &mdash; semantisch wirkt der Code dazwischen wie normaler KRL-Code. Sie werden meist von <code>BAS()</code>-Hilfsfunktionen automatisch erzeugt, damit Anwender Bewegungssaetze als Einzeilen sehen, der dahinterliegende Code aber lesbar bleibt.<br>'
                        + '<strong>Wichtig:</strong> Kein Datenfluss-Effekt. Variablen, die im FOLD geaendert werden, sind nach ENDFOLD weiterhin geaendert.'
                },
                {
                    q: 'Welche zwei Dateien gehoeren zu einem KRL-Programmmodul, und welcher Inhalt liegt in welcher Datei?',
                    h: 'SRC vs. DAT.',
                    s: 'Pro Programmmodul existieren zwei Dateien mit gleichem Basisnamen:<br>'
                        + '<code>name.src</code> &mdash; <strong>Source-Datei</strong> mit dem ausfuehrbaren Code: <code>DEF name() &hellip; END</code>, Variablendeklarationen, Bewegungsbefehle, Logik.<br>'
                        + '<code>name.dat</code> &mdash; <strong>Datendatei</strong> mit Punktdaten und Konstanten: <code>DEFDAT name() &hellip; ENDDAT</code>, typischerweise <code>DECL E6POS XP1 = ...</code>, <code>DECL FDAT FP1 = ...</code> etc. Wird beim Teach-In automatisch durch das SmartPad gepflegt.<br>'
                        + 'Das System laedt beide Dateien zusammen, wenn das Modul angewaehlt wird. Ohne <code>.dat</code>-Datei waeren die geteachten Punkte verloren.'
                },
                {
                    q: 'Welche Bedeutung haben die Systemvariablen <code>$BASE</code> und <code>$TOOL</code>, und wie werden sie typischerweise gesetzt?',
                    h: 'Werkstueck- vs. Werkzeug-Frame, BAS()-Funktion.',
                    s: '<code>$BASE</code> ist das aktive <strong>Werkstueck-Koordinatensystem</strong> (Frame), in dem kartesische Bewegungsbefehle (LIN/CIRC) interpretiert werden. Es entkoppelt Programmpfade vom Roboter-Welt-Koordinatensystem &mdash; verschiebt sich das Werkstueck, reicht ein neues <code>$BASE</code>.<br>'
                        + '<code>$TOOL</code> ist der <strong>TCP-Offset</strong> vom Flansch (FLANGE) bis zur Werkzeugspitze (Schweissduese, Greifer-Mitte). Alle kartesischen Bewegungen referenzieren auf diesen TCP.<br>'
                        + 'Typische Initialisierung im <code>;FOLD INI</code>:<br>'
                        + code('KRL', 'BAS(#INITMOV, 0)\nBAS(#TOOL, 1)   ; laed TOOL_DATA[1] nach $TOOL\nBAS(#BASE, 2)   ; laed BASE_DATA[2] nach $BASE')
                        + 'Die Konfigurationsdaten <code>TOOL_DATA[]</code> und <code>BASE_DATA[]</code> liegen in <code>$config.dat</code> und werden ueber das SmartPad gepflegt.'
                },
                {
                    q: 'Was ist der Unterschied zwischen <code>$VEL.CP</code> und <code>$VEL_AXIS[i]</code>?',
                    h: 'Bahn-CP vs. Achs-PTP.',
                    s: '<code>$VEL.CP</code> (CP = Continuous Path) ist die <strong>kartesische Bahngeschwindigkeit</strong> in $\\text{m/s}$ fuer <code>LIN</code>- und <code>CIRC</code>-Bewegungen. Sie wird auf die TCP-Bahn angewendet, nicht auf einzelne Achsen.<br>'
                        + '<code>$VEL_AXIS[i]</code> (Array A1&hellip;A6 + E1&hellip;E6) ist die <strong>achssynchrone Drehzahl-Begrenzung</strong> fuer <code>PTP</code>-Bewegungen, angegeben in <strong>Prozent</strong> der maximalen Achsdrehzahl ($0\\ldots 100$).<br>'
                        + 'Beispiel:<br>'
                        + code('KRL', '$VEL.CP = 0.5            ; 500 mm/s fuer LIN/CIRC\n$VEL_AXIS[1] = 80         ; A1 max. 80 % der Spitzendrehzahl\nLIN P2 C_DIS             ; faehrt mit 0.5 m/s zu P2')
                        + '$\\boxed{\\text{\\$VEL.CP fuer LIN/CIRC (m/s),\\;\\$VEL\\_AXIS fuer PTP (\\%)}}$<br>'
                        + 'Quelle: KSS 8.5 Programmierhandbuch §10.2 Geschwindigkeits-Variablen.'
                },
                {
                    q: 'Welche <strong>Annaeherungsarten (Continuous-Path-Modi)</strong> kennt KRL? Erklaere C_PTP, C_DIS, C_VEL und C_ORI.',
                    h: 'Annaeherung statt Exaktstopp am Bahnpunkt.',
                    s: 'Wird ein Bewegungssatz mit einem Suffix versehen, faehrt der Roboter nicht exakt durch den Zielpunkt (Exaktstopp), sondern <em>annaehernd</em> &mdash; das spart Taktzeit:<br>'
                        + '&bull; <code>C_PTP</code> &mdash; Annaeherung im PTP-Modus (nur bei <code>PTP</code>-Bewegungen sinnvoll); achssynchron, geometrisch nicht exakt vorhersagbare Annaeherungsbahn.<br>'
                        + '&bull; <code>C_DIS</code> &mdash; Annaeherung mit fester <em>Distanz</em>; gesteuert durch <code>$APO.CDIS</code> (mm). Bahn wird abgebogen, wenn TCP $\\leq$ CDIS vom Punkt entfernt ist.<br>'
                        + '&bull; <code>C_VEL</code> &mdash; Annaeherung gesteuert durch <em>Geschwindigkeit</em>; abgebogen, wenn die Bremsphase noch CVEL % der programmierten Bahngeschwindigkeit erreichen wuerde.<br>'
                        + '&bull; <code>C_ORI</code> &mdash; Annaeherung gesteuert durch <em>Orientierungsabweichung</em>; abgebogen, wenn der Winkelfehler &lt; CORI ist.<br>'
                        + 'Beispiel:<br>'
                        + code('KRL', '$APO.CDIS = 50\nLIN P1 C_DIS    ; biegt 50 mm vor P1 ab\nLIN P2          ; exakter Stopp an P2')
                        + 'Quelle: KSS 8.x Programmierhandbuch §11 (Bahnannaeherung), DIN EN ISO 9787:2013 (Bezugskoordinatensysteme).'
                },
                {
                    q: 'Was unterscheidet die Datentypen <code>POS</code>, <code>E6POS</code> und <code>FRAME</code> in KRL?',
                    h: 'XYZ+ABC, mit/ohne Zusatzachsen, mit/ohne Status.',
                    s: '<strong><code>FRAME</code></strong>: Koordinatensystem mit 6 Werten <code>{X, Y, Z, A, B, C}</code> &mdash; Verschiebung XYZ in mm, ZYX-Karden-Winkel A/B/C in Grad. <em>Ohne</em> Status/Turn. Verwendung: <code>$BASE</code>, <code>$TOOL</code>, $BASE_DATA[]$, $TOOL_DATA[]$.<br>'
                        + '<strong><code>POS</code></strong>: <code>FRAME</code> + zusaetzlich <code>S</code> (Status, INT) und <code>T</code> (Turn, INT) &mdash; eindeutige Achs-Konfiguration einer kartesischen Position. Verwendung: Werkstueck-Stuetzpunkte $P_n$ in der .DAT-Datei.<br>'
                        + '<strong><code>E6POS</code></strong>: <code>POS</code> + 6 Zusatzachsen <code>E1&hellip;E6</code> (Verfahrtisch, Linearachse, Drehkranz). Verwendung bei Anlagen mit externen Achsen.<br>'
                        + 'Beispiel-Deklaration in .DAT:<br>'
                        + code('KRL', 'DECL FRAME BASE_DATA[1] = {X 100, Y 200, Z 0, A 0, B 0, C 0}\nDECL E6POS XHOME = {X 0, Y 0, Z 1000, A 0, B 90, C 0, S 2, T 35, E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}')
                        + 'Quelle: KSS 8.x Programmierhandbuch §6.4 Datentypen.'
                },
                {
                    q: 'Erklaere die <strong>ZYX-Karden-Eulerwinkel-Konvention</strong> (intrinsisch) und ordne A, B, C zu.',
                    h: 'A um Z, B um neues Y, C um neues X.',
                    s: 'KUKA verwendet die <strong>intrinsische ZYX-Karden-Konvention</strong> &mdash; jede Rotation erfolgt um das <em>neue</em> (mitgedrehte) Koordinatensystem:<br>'
                        + '<strong>1. Drehung um $\\mathbf{A}$ (um Z-Achse):</strong> die ganze Koordinaten-Triade dreht um die ortsfeste Z-Achse um den Winkel $A$.<br>'
                        + '<strong>2. Drehung um $\\mathbf{B}$ (um neue Y-Achse):</strong> jetzt um die <em>schon gedrehte</em> Y-Achse um Winkel $B$.<br>'
                        + '<strong>3. Drehung um $\\mathbf{C}$ (um neue X-Achse):</strong> abschliessend um die zweimal gedrehte X-Achse um Winkel $C$.<br>'
                        + 'Mathematisch ist die Gesamtrotationsmatrix:<br>'
                        + '$$\\mathbf{R}_{ZYX}(A,B,C) = \\mathbf{R}_z(A) \\cdot \\mathbf{R}_y(B) \\cdot \\mathbf{R}_x(C).$$'
                        + 'Reihenfolge ist <strong>nicht kommutativ</strong> &mdash; $A=90^\\circ, B=0, C=0$ ist nicht dasselbe wie $A=0, B=0, C=90^\\circ$.<br>'
                        + '<strong>Konvertierung zu anderen Robotern:</strong> ABB nutzt Quaternionen, Fanuc WPR (X-Y-Z extrinsisch, also <em>umgekehrte</em> Reihenfolge). Beim Datenexport ueber RoboDK / Simulationspaket muss man die Konvention explizit setzen, sonst rotieren Posen falsch.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §7.3 Frame-Darstellung; DIN EN ISO 9787:2013.'
                },
                {
                    q: 'Was sind die <strong>Status- und Turn-Bits (S, T)</strong> in einer POS-Variable und warum sind sie noetig?',
                    h: 'Mehrdeutigkeit der inversen Kinematik.',
                    s: 'Eine kartesische Pose <code>{X, Y, Z, A, B, C}</code> ist im Achsraum eines 6-Achs-Roboters <em>nicht eindeutig</em> &mdash; in der Regel gibt es bis zu <strong>8 verschiedene Achs-Konfigurationen</strong>, die dieselbe TCP-Pose erzeugen (z.B. Ellenbogen oben/unten, Schulter rechts/links, Hand vorne/hinten).<br>'
                        + '<strong>Status-Bits (S, INT):</strong> 3 Bits codieren die <em>Konfiguration</em>:<br>'
                        + '&bull; Bit 0 &mdash; Lage der Handwurzel (Hand vor/hinter Schulter, Vorzeichen Achse 1);<br>'
                        + '&bull; Bit 1 &mdash; Ellenbogen oben (=0) / unten (=1), Vorzeichen Achse 3;<br>'
                        + '&bull; Bit 2 &mdash; Handflip (Achse 5 positiv/negativ).<br>'
                        + 'Typisch $S = 2$ (= bin 010) = Hand vor Schulter, Ellenbogen unten, kein Handflip.<br>'
                        + '<strong>Turn-Bits (T, INT):</strong> 6 Bits, je eines pro Achse, geben das <em>Vorzeichen der Achswinkel</em> als Vielfache von $\\pm 180^\\circ$ an. Damit unterscheidet KRL zwischen Achse 6 bei $+90^\\circ$ und bei $-270^\\circ$ &mdash; beide TCP-aequivalent, aber kabel-/anschlagbedingt unterschiedlich.<br>'
                        + '<strong>Praktische Konsequenz:</strong> beim Anfahren von POS-Punkten mit <code>PTP</code> wird die durch S/T vorgegebene Konfiguration angefahren &mdash; daher koennen zwei optisch identische Posen <em>voellig verschiedene Achswege</em> erfordern. Bei <code>LIN/CIRC</code> ignoriert der Interpreter S/T (nur die kartesische Bahn zaehlt).<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §6.4.3 Status und Turn.'
                },
                {
                    q: 'Was bewirken <code>FOLD</code> und <code>ENDFOLD</code> in einer KRL-Datei?',
                    h: 'Editor-Anzeige, kein Interpreter-Effekt.',
                    s: '<code>;FOLD &lt;name&gt;</code> und <code>;ENDFOLD</code> sind reine <strong>Editor-Sichtbarkeitsmarker</strong> fuer das KUKA-SmartPad / WorkVisual. Der Code dazwischen wird im SmartPad als <em>eine zusammenklappbare Zeile</em> angezeigt (mit dem Foldnamen als Anzeigetext) &mdash; der Bediener sieht nur die abstrakte Aktion, nicht die einzelnen Anweisungen.<br>'
                        + 'Beispiel:<br>'
                        + code('KRL', ';FOLD PTP HOME Vel=100 % DEFAULT\n  $BWDSTART = FALSE\n  PDAT_ACT = PDEFAULT\n  FDAT_ACT = FHOME\n  BAS(#PTP_PARAMS, 100)\n  $H_POS = XHOME\n  PTP XHOME\n;ENDFOLD')
                        + '<strong>Wichtig:</strong> Das Schluesselwort beginnt mit Semikolon (<code>;FOLD</code>) &mdash; es <em>ist</em> ein Kommentar fuer den Interpreter. Der Code zwischen FOLD und ENDFOLD wird <em>normal ausgefuehrt</em>; die Marker haben keinen semantischen Effekt.<br>'
                        + 'Konsequenz: Beim externen Bearbeiten der .SRC-Datei nicht das FOLD-Geruest entfernen &mdash; das SmartPad zeigt dann roh viele Zeilen, was den Bediener ueberfordert.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §3.2 SmartPad-Anzeige.'
                },
                {
                    q: 'Was unterscheidet eine <code>.SRC</code>- von einer <code>.DAT</code>-Datei in einem KRL-Modul?',
                    h: 'Code vs. Daten.',
                    s: 'Jedes KRL-Modul besteht aus <strong>zwei</strong> Dateien mit demselben Basis-Namen:<br>'
                        + '<strong><code>name.src</code>:</strong> enthaelt <em>ausfuehrbaren Code</em> &mdash; Funktionen, Prozeduren, Variablendeklarationen lokal in der Funktion, Bewegungsbefehle. Wird vom Roboter-Interpreter zur Laufzeit Zeile fuer Zeile abgearbeitet.<br>'
                        + '<strong><code>name.dat</code>:</strong> enthaelt <em>Punkt- und Konfigurationsdaten</em> &mdash; globale Variablen, Frame-Definitionen, Tool/Base-Daten, PDAT/FDAT-Strukturen. Wird beim Programmstart in den Speicher geladen.<br>'
                        + 'Beispiel-Paar:<br>'
                        + code('KRL', '[name.src]\nDEF schweissen()\n  PTP HOME\n  LIN P1\n  LIN P2\nEND')
                        + code('KRL', '[name.dat]\nDEFDAT schweissen\nDECL E6POS XP1 = {X 100, Y 0, Z 500, A 0, B 90, C 0, S 2, T 35, E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}\nDECL E6POS XP2 = {X 100, Y 200, Z 500, A 0, B 90, C 0, S 2, T 35, E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}\nENDDAT')
                        + 'Bediener kann <em>Punkte teachen</em>, indem im SmartPad die .DAT-Datei (ueber den Eintrag des Bewegungssatzes in der .SRC-Datei) editiert wird. Die .SRC-Datei bleibt unveraendert &mdash; saubere Trennung Code/Daten.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §4 Programm-Struktur.'
                },
                {
                    q: 'Was sind die <strong>Betriebsarten T1, T2, AUT und EXT</strong> beim KUKA-Roboter, und welche Override-Grenze gilt fuer T1?',
                    h: 'Test-Manuell vs. Automatik vs. extern angesteuert.',
                    s: '<strong>T1 (Manuell-Reduzierte-Geschwindigkeit):</strong> Bediener-Test mit Zustimmtaster, <em>Override $\\leq 250\\,\\text{mm/s}$ TCP-Geschwindigkeit</em> ist hartwarseitig erzwungen (Sicherheits-SPS). Override-Regler maximal 100 %, aber die Bahngeschwindigkeit wird gleichzeitig auf 250 mm/s limitiert. Programmstart nur mit gedruecktem Zustimmtaster + Vorlauftaste am SmartPad.<br>'
                        + '<strong>T2 (Manuell-Hohe-Geschwindigkeit):</strong> wie T1, aber <em>volle Programmgeschwindigkeit</em>. Zustimmtaster zwingend. Verwendung: Inbetriebnahme, Programmtest im Einrichtbetrieb. Hat in T2-Mode keine TCP-Geschwindigkeitsbegrenzung &mdash; daher hochriskant; in vielen Anlagen verboten oder durch SafeOperation gefiltert.<br>'
                        + '<strong>AUT (Automatik):</strong> Programmlauf ohne Bediener-Aufsicht im Inneren der Zelle. Tueren der Schutzeinrichtung muessen geschlossen sein, sonst Sicherheitsschaltkreis-Stop. Programm wird durch Start-Taste auf SmartPad oder externen Schluesselschalter freigegeben.<br>'
                        + '<strong>EXT (Extern):</strong> Programm wird ueber externe SPS (z.B. ProfiNet, EtherNet/IP) gestartet und gesteuert. Default-Betriebsart in der Serienfertigung.<br>'
                        + '<strong>Quelle:</strong> DIN EN ISO 10218-1:2011 §5.7 (Betriebsarten), KUKA SystemSoftware KSS 8.x Bedienhandbuch §5.5.'
                },
                {
                    q: 'Wozu dient der Befehl <code>PTP HOME</code> am Anfang eines KRL-Programms?',
                    h: 'Sichere Ausgangsposition, vermeiden von SAK-Problemen.',
                    s: '<code>PTP HOME</code> faehrt den Roboter auf die <strong>HOME-Position</strong> &mdash; eine im KSS definierte, gut abgestimmte Achsstellung (z.B. alle Achsen $0^\\circ$ oder ein freigespielter Vorbereitungspunkt), die <em>sicher kollisionsfrei</em> ist und sich im freien Arbeitsraum befindet.<br>'
                        + 'HOME ist als Variable <code>XHOME</code> in der <code>$config.dat</code> deklariert (Default: <code>{A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}</code> &mdash; abhaengig von Robotertyp).<br>'
                        + '<strong>Zwecke am Programmanfang:</strong><br>'
                        + '&bull; <em>Definierter Startpunkt</em> nach Notaus / Programmunterbrechung &mdash; Bediener kann visuell pruefen, ob der Roboter in der erwarteten Konfiguration steht.<br>'
                        + '&bull; <em>SAK-Sicherheit</em> &mdash; beim Programmstart aus der Mitte (Satz-Anwahl-Korrektur) ist die Bewegung zum ersten echten Arbeitspunkt sehr unvorhersehbar. Eine HOME-Position als ersten Bewegungssatz reduziert die Wahrscheinlichkeit von Kollisionen.<br>'
                        + '&bull; <em>Wiederholbare Reset-Position</em> nach jedem Zyklus &mdash; vermeidet, dass Folge-Zyklen aus einer arbeitsplatzgebundenen Pose starten.<br>'
                        + '<strong>Anti-Pattern:</strong> HOME als Werkstueckwechsel-Position nutzen. HOME soll <em>nur</em> die Sicherheitsfunktion erfuellen; Werkstueckwechselposen sind separat zu definieren (<code>XPREPARK</code>, <code>XWECHSEL</code>).<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §13.4 HOME-Position.'
                },
                {
                    q: 'Was steht in der <strong>INI-Folge</strong> (<code>;FOLD INI</code>) am Anfang eines KRL-Programms, und warum darf sie nicht entfernt werden?',
                    h: 'BAS-Initialisierung, $BWDSTART.',
                    s: 'Die <code>;FOLD INI</code>-Sektion initialisiert die Robotersystem-Variablen, die fuer einen reproduzierbaren Programmstart erforderlich sind. Standardinhalt (KSS 8.x):<br>'
                        + code('KRL', ';FOLD INI\n  ;FOLD BASISTECH INI\n    GLOBAL INTERRUPT DECL 3 WHEN $STOPMESS == TRUE DO IR_STOPM()\n    INTERRUPT ON 3\n    BAS(#INITMOV, 0)   ; Default-Werte fuer Bewegungen\n  ;ENDFOLD\n  ;FOLD USER INI\n    ; ----- User-spezifische Initialisierungen -----\n  ;ENDFOLD\n;ENDFOLD')
                        + '<strong>Aufgaben der INI-Sektion:</strong><br>'
                        + '&bull; <code>INTERRUPT DECL 3 WHEN $STOPMESS == TRUE DO IR_STOPM()</code> &mdash; meldet eine Notabschaltung dem Anwender; obligatorische Sicherheits-Interrupt nach KSS-Standard.<br>'
                        + '&bull; <code>BAS(#INITMOV, 0)</code> &mdash; setzt Geschwindigkeits- und Beschleunigungs-Default-Werte ($\\$VEL, \\$ACC, \\$APO).<br>'
                        + '&bull; Optional: <code>$BWDSTART = FALSE</code>, $TOOL$/$BASE$-Auswahl, externe E/A-Initialisierung.<br>'
                        + '<strong>Warum nicht entfernen?</strong> Wenn die INI-Sektion fehlt, sind die Bewegungsdefault-Werte <em>undefiniert</em> &mdash; das Programm faehrt mit zufaelligen Geschwindigkeiten/Beschleunigungen, oft viel zu schnell. Der Robotercontroller geht in einen sicheren Fehlerzustand. Zusaetzlich fehlt der STOPMESS-Interrupt &mdash; Notaus-Verarbeitung kann fehlschlagen.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §13.2 BAS-Funktion, §13.5 INI-Folge.'
                },
                {
                    q: 'Was bewirkt <code>$OV_PRO</code> und in welchem Wertebereich liegt es?',
                    h: 'Programm-Override.',
                    s: '<code>$OV_PRO</code> ist der <strong>Programm-Override</strong> &mdash; ein globaler Geschwindigkeits-Skalierungsfaktor fuer <em>alle</em> Bewegungsbefehle in Prozent. Wertebereich: <strong>$0\\ldots 100$</strong> (INT).<br>'
                        + 'Die effektive Bahngeschwindigkeit ergibt sich aus:<br>'
                        + '$$v_\\text{eff} = v_\\text{programmiert} \\cdot \\frac{\\$OV\\_PRO}{100}.$$'
                        + 'Beispiel: <code>$VEL.CP = 1.0</code> (1 m/s) und <code>$OV_PRO = 50</code> &rArr; effektive Geschwindigkeit 0,5 m/s.<br>'
                        + '<strong>Praxis-Anwendung:</strong><br>'
                        + '&bull; Bediener stellt den Override am SmartPad ueber die "+/-"-Tasten ein &mdash; bequeme Geschwindigkeits-Anpassung im T1-Test ohne Code zu aendern;<br>'
                        + '&bull; Im Programm gesetzt (<code>$OV_PRO = 30</code>) fuer kritische Abschnitte (z.B. SAK-Faehrt, Einlauf in Werkzeug) und am Ende wieder hochgesetzt;<br>'
                        + '&bull; in T1-Modus ist <code>$OV_PRO</code> implizit durch die TCP-250-mm/s-Grenze gekappt (Sicherheitsfunktion).<br>'
                        + '<strong>Wichtig:</strong> der Override skaliert <em>nur</em> die Bahn-/Achsgeschwindigkeiten, nicht die programmierten Beschleunigungen ($\\$ACC$). Wer langsam fahren <em>und</em> sanft beschleunigen will, muss auch $\\$ACC$ reduzieren.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §10.4 Override.'
                },
                {
                    q: 'Was bewirkt die Systemvariable <code>$ADVANCE</code>?',
                    h: 'Vorausschau des Bahnplaners.',
                    s: '<code>$ADVANCE</code> (Wertebereich $0\\ldots 5$, Default 3) bestimmt, <strong>wie viele Bewegungssaetze der Bahnplaner vorausschaut</strong> &mdash; also wie viele zukuenftige <code>PTP/LIN/CIRC</code>-Befehle der Interpreter <em>vorab</em> interpretiert und in die Bahnplanung einbezieht.<br>'
                        + '<strong>Wirkung:</strong><br>'
                        + '&bull; <em>$\\$ADVANCE = 0$:</em> keine Vorausschau &mdash; der Bahnplaner sieht nur den aktuellen Satz. <strong>Bahnannaeherung (C_DIS etc.) funktioniert nicht</strong>, weil dafuer der Folge-Satz schon bekannt sein muss. Verwendung: nach <code>WAIT FOR</code> oder Interrupt, wenn Reaktionsschritte unabhaengig vom Folgesatz erfolgen muessen.<br>'
                        + '&bull; <em>$\\$ADVANCE = 3$ (Default):</em> 3 Saetze Vorausschau &mdash; ausreichend fuer Bahnannaeherung; gute Reaktionsfaehigkeit auf E/A-Ereignisse.<br>'
                        + '&bull; <em>$\\$ADVANCE = 5$ (Max):</em> hoechste Bahnglaette, lange Reaktionszeit &mdash; Roboter "weiss" 5 Saetze im Voraus, was er tun wird. Verwendung: lange Bahnen ohne sensorische Echtzeit-Reaktion.<br>'
                        + '<strong>Stopper:</strong> Anweisungen wie <code>WAIT FOR</code>, <code>WAIT SEC</code>, Variablen-Zuweisungen aus E/A werden vom Bahnplaner als <em>Stop-Punkte</em> behandelt &mdash; die Vorausschau endet dort.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §11.6 Bahnplaner-Vorausschau.'
                },
                {
                    q: 'Was ist eine <strong>kartesische Singularitaet</strong>, welche Typen kennt der KUKA-6-Achs-Roboter und wie reagiert KRL darauf?',
                    h: 'Schulter-, Ellenbogen-, Handwurzel-Singularitaet.',
                    s: 'Eine <strong>Singularitaet</strong> ist eine Roboter-Konfiguration, in der die Jakobi-Matrix der inversen Kinematik <strong>nicht mehr invertierbar</strong> ist &mdash; die Achsgeschwindigkeiten, die zum Erreichen einer endlichen TCP-Geschwindigkeit notwendig waeren, gehen gegen unendlich.<br>'
                        + '<strong>Drei Typen bei 6-Achs-Knickarmroboter:</strong><br>'
                        + '&bull; <em>Schulter-Singularitaet:</em> TCP liegt auf der Achse-1-Drehachse &mdash; A1 ist nicht eindeutig bestimmt. Tritt auf, wenn der TCP "direkt ueber dem Sockel" liegt.<br>'
                        + '&bull; <em>Ellenbogen-Singularitaet:</em> Achse 3 vollstaendig gestreckt ($A3 = 0$ oder $\\pi$) &mdash; Roboterarm in einer Linie. Ein kleiner TCP-Schritt erfordert dann viel A2/A3-Bewegung.<br>'
                        + '&bull; <em>Handwurzel-Singularitaet (Wrist-Singularitaet):</em> Achsen 4 und 6 sind parallel ($A5 = 0$) &mdash; sie wirken in derselben Richtung, eine Drehung um die TCP-Hochachse ist sowohl ueber A4 als auch ueber A6 darstellbar. <em>Haeufigste praktische Singularitaet</em>.<br>'
                        + '<strong>KRL-Reaktion:</strong> bei <code>LIN/CIRC</code>-Bewegung in der Naehe einer Singularitaet wird die berechnete Achsgeschwindigkeit kurzfristig sehr hoch &mdash; der KSS limitiert per Software, sodass die maximalen Achsdrehzahlen nicht ueberschritten werden, <em>aber</em> dadurch wird die Bahn langsamer als programmiert oder das Programm bricht mit <em>"Bahngeschwindigkeit nicht haltbar"</em> ab. Bei <code>PTP</code>-Bewegung passiert das nicht (achssynchrone Bewegung).<br>'
                        + '<strong>Loesung:</strong> Bahn umlegen (TCP-Hochachse leicht neigen, sodass A5 nicht durch null geht), Spline-Bewegung mit Bahnglaettung, oder bewusst PTP statt LIN waehlen.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §12.5 Singularitaeten; Spong "Robot Modeling and Control" 2. Aufl. §4.5.'
                },
                {
                    q: 'Wie liest man die aktuelle Roboterposition zur Laufzeit aus? Erklaere <code>$POS_ACT</code> und <code>$AXIS_ACT</code>.',
                    h: 'Lesevariablen im KSS.',
                    s: '<code>$POS_ACT</code> ist eine <strong>schreibgeschuetzte Systemvariable vom Typ E6POS</strong> &mdash; sie enthaelt die <em>aktuelle TCP-Pose</em> (kartesisch, im aktuellen Basis-Koordinatensystem). Wird zyklisch vom IPO-Takt aktualisiert.<br>'
                        + '<code>$AXIS_ACT</code> ist eine <strong>schreibgeschuetzte Systemvariable vom Typ E6AXIS</strong> &mdash; enthaelt die <em>aktuellen Achswinkel</em> $A1\\ldots A6, E1\\ldots E6$ in Grad bzw. mm.<br>'
                        + 'Beispiel-Verwendung:<br>'
                        + code('KRL', 'DECL E6POS XAKTUELL\nXAKTUELL = $POS_ACT             ; Snapshot der aktuellen TCP-Pose\nMSG "X=" + XAKTUELL.X + " Y=" + XAKTUELL.Y\nIF $POS_ACT.Z < 100 THEN          ; Hoehentest\n  HALT                            ; sofort anhalten\nENDIF')
                        + '<strong>Wichtig:</strong><br>'
                        + '&bull; Aenderungen an <code>$POS_ACT</code> sind <em>nicht erlaubt</em> &mdash; nur lesen.<br>'
                        + '&bull; Die Werte sind zum Lesezeitpunkt aktuell &mdash; bei laufender Bewegung aendern sie sich permanent.<br>'
                        + '&bull; In hochfrequenten Anwendungen (Sensor-Korrektur) ist <code>RSI</code> mit Echtzeit-IPO-Takt $4\\,\\text{ms}$ besser geeignet als das Polling von <code>$POS_ACT</code> aus dem Submit-Interpreter (zu langsam).<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §6.4 Systemvariablen.'
                },
                {
                    q: 'Welche <strong>Datentypen</strong> kennt KRL fuer Standard-Variablen, und wie deklariert man sie?',
                    h: 'BOOL, INT, REAL, CHAR, FRAME, POS, ...',
                    s: 'KRL ist eine <strong>statisch typisierte</strong> Sprache (Pascal-Familie). Standarddatentypen:<br>'
                        + '&bull; <code>BOOL</code> &mdash; logisch (TRUE/FALSE).<br>'
                        + '&bull; <code>INT</code> &mdash; ganzzahlig (32-Bit, $-2^{31}\\ldots 2^{31}-1$).<br>'
                        + '&bull; <code>REAL</code> &mdash; Gleitkomma (32-Bit Single Precision, IEEE 754).<br>'
                        + '&bull; <code>CHAR</code> &mdash; ein ASCII-Zeichen.<br>'
                        + '&bull; <code>CHAR-Array</code> als String (es gibt keinen nativen STRING-Datentyp).<br>'
                        + '&bull; <code>FRAME</code>, <code>POS</code>, <code>E6POS</code>, <code>AXIS</code>, <code>E6AXIS</code> &mdash; Struktur-Datentypen (siehe eigene Aufgabe).<br>'
                        + '&bull; <code>STRUC</code>, <code>ENUM</code> &mdash; benutzerdefinierte Typen.<br>'
                        + 'Deklarationssyntax:<br>'
                        + code('KRL', 'DECL INT ZAEHLER = 0                ; lokale Variable mit Initialwert\nDECL REAL TEMP = 25.5\nDECL BOOL FLAG = FALSE\nDECL CHAR NAME[20]                  ; 20 ASCII-Zeichen\nGLOBAL DEFAULT FRAME XOFFSET = {X 0, Y 0, Z 0, A 0, B 0, C 0}')
                        + '<strong>Scope-Regeln:</strong><br>'
                        + '&bull; In <code>.SRC</code>-Datei deklariert: lokale Sichtbarkeit zur umgebenden DEF;<br>'
                        + '&bull; In <code>.DAT</code>-Datei: modulglobal (innerhalb der DEFDAT...ENDDAT-Sektion);<br>'
                        + '&bull; In <code>$config.dat</code> mit Schluesselwort <code>GLOBAL</code>: systemweit sichtbar.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §6 Datentypen und Variablen.'
                },
                {
                    q: 'Wie unterscheidet man <code>$STOPMESS</code>, <code>$PRO_STATE</code> und <code>$DRIVES_ON</code> als Statussignale?',
                    h: 'Sicherheits-Stop, Programmstatus, Antriebsfreigabe.',
                    s: '<code>$STOPMESS</code> &mdash; <strong>BOOL, schreibgeschuetzt.</strong> Wird TRUE, sobald eine sicherheitsgerichtete Stopursache aktiv ist (Notaus, oeffnen der Schutztueren in AUT, Pruefbahn-Verletzung in T1, SafeOperation-Limit). Wird in der INI-Folge typischerweise per Interrupt 3 abgefangen (<code>IR_STOPM()</code>-Routine zeigt Meldung am SmartPad).<br>'
                        + '<code>$PRO_STATE</code> &mdash; <strong>ENUM, schreibgeschuetzt.</strong> Aktueller Programmzustand: <code>#P_FREE</code> (kein Programm angewaehlt), <code>#P_RESET</code> (angewaehlt, ungestartet), <code>#P_ACTIVE</code> (laeuft), <code>#P_STOP</code> (gestoppt), <code>#P_END</code> (fertig). Wird von der SPS und vom Submit-Interpreter abgefragt, um den Anlagenzyklus zu synchronisieren.<br>'
                        + '<code>$DRIVES_ON</code> &mdash; <strong>BOOL, schreibgeschuetzt.</strong> TRUE, wenn die Antriebe (Servos) freigegeben sind. Wird FALSE bei Notaus, Tuerenoeffnung in AUT, oder wenn Bediener den Zustimmtaster in T1 loslaesst. Programm laeuft <em>nicht</em> ohne Antriebsfreigabe &mdash; Bewegungsbefehle warten implizit darauf.<br>'
                        + '<strong>Verwendung in der SPS-Anbindung:</strong> die Anlagen-SPS prueft zyklisch <code>$PRO_STATE</code> + <code>$DRIVES_ON</code>, um zu wissen, ob ein neuer Zyklus gestartet werden darf. Bei <code>$STOPMESS = TRUE</code> wird die Anlage abgeschaltet, Fehlertext gelesen, und Bediener-Quittierung angefordert.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §13.6 Statusvariablen; KUKA SafeOperation-Handbuch §4.2.'
                },
                {
                    q: 'Wie schreibt man in KRL eine einfache <strong>If-Else-Verzweigung</strong> und eine <strong>FOR-Schleife</strong>?',
                    h: 'Pascal-Syntax.',
                    s: 'KRL-Kontrollstrukturen folgen Pascal-Konventionen mit Schluesselwort-Ende-Markierungen (<code>ENDIF</code>, <code>ENDFOR</code>):<br>'
                        + '<strong>IF-Verzweigung:</strong><br>'
                        + code('KRL', 'IF ZAEHLER >= 10 THEN\n  MSG "Limit erreicht"\n  ZAEHLER = 0\nELSE\n  ZAEHLER = ZAEHLER + 1\nENDIF')
                        + '<strong>FOR-Schleife (mit Schrittweite):</strong><br>'
                        + code('KRL', 'DECL INT I\nFOR I = 1 TO 10 STEP 1\n  LIN XP[I] C_DIS\nENDFOR\n; Rueckwaerts:\nFOR I = 10 TO 1 STEP -1\n  $OUT[I] = TRUE\nENDFOR')
                        + '<strong>WHILE-Schleife:</strong><br>'
                        + code('KRL', 'WHILE $IN[5] == FALSE\n  WAIT SEC 0.1\nENDWHILE')
                        + '<strong>REPEAT-Schleife (mindestens einmal):</strong><br>'
                        + code('KRL', 'REPEAT\n  PTP XHOME\n  ZAEHLER = ZAEHLER + 1\nUNTIL ZAEHLER >= 5')
                        + '<strong>SWITCH-Anweisung:</strong><br>'
                        + code('KRL', 'SWITCH PRODUKT\n  CASE 1\n    schweissen_typ1()\n  CASE 2, 3\n    schweissen_typ2()\n  DEFAULT\n    MSG "Unbekanntes Produkt"\nENDSWITCH')
                        + 'Quelle: KSS 8.x Programmierhandbuch §8 Kontrollstrukturen.'
                },
                {
                    q: 'Welche <strong>elementaren Datentypen</strong> kennt KRL, und wie werden Variablen typisch deklariert (lokal in <code>.SRC</code> vs. global in <code>.DAT</code>)?',
                    h: 'INT, REAL, BOOL, CHAR; DECL ... bzw. DECL GLOBAL ...; .DAT-Datei haelt persistente Daten.',
                    s: 'KRL ist statisch und stark typisiert. Die <strong>vier elementaren Datentypen</strong> sind:<br>'
                        + '<table class="text-xs my-2"><thead><tr><th class="pr-3 text-left">Typ</th><th class="pr-3 text-left">Wertebereich</th><th class="text-left">Beispiel</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3"><code>INT</code></td><td class="pr-3">-2147483648 &hellip; +2147483647 (32 Bit)</td><td><code>DECL INT ZAEHLER = 0</code></td></tr>'
                        + '<tr><td class="pr-3"><code>REAL</code></td><td class="pr-3">$\pm 1{,}4 \cdot 10^{-45} \ldots \pm 3{,}4 \cdot 10^{38}$ (32 Bit IEEE-754)</td><td><code>DECL REAL ABSTAND = 12.5</code></td></tr>'
                        + '<tr><td class="pr-3"><code>BOOL</code></td><td class="pr-3"><code>TRUE</code> / <code>FALSE</code></td><td><code>DECL BOOL FERTIG = FALSE</code></td></tr>'
                        + '<tr><td class="pr-3"><code>CHAR</code></td><td class="pr-3">Einzelzeichen, ASCII (0&hellip;255)</td><td><code>DECL CHAR TEXT[20]</code> (String als Array)</td></tr>'
                        + '</tbody></table>'
                        + 'Zusaetzlich existieren <em>strukturierte</em> Typen (<code>POS</code>, <code>E6POS</code>, <code>FRAME</code>, <code>AXIS</code>, <code>E6AXIS</code>) und <em>aufzaehlende</em> Typen via <code>ENUM</code>.<br>'
                        + '<strong>Lokal vs. global / persistent:</strong><br>'
                        + code('KRL', 'DEF main()\n  DECL INT zaehler   ; lokal in .SRC, fluechtig, sichtbar nur in main\n  zaehler = 0\nEND')
                        + 'Daten, die <em>persistent</em> sein und beim Reboot erhalten bleiben sollen, gehoeren in die <code>.DAT</code>-Datei und werden dort als globale Variablen gehalten:<br>'
                        + code('KRL', '[main.dat]\nDEFDAT MAIN\n  DECL GLOBAL INT MAX_ZYKLEN = 1000\n  DECL E6POS XHOME = {X 0, Y 0, Z 1500, A 0, B 90, C 0, S 6, T 27, E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}\nENDDAT')
                        + 'Wichtige Regeln: jede Deklaration beginnt mit <code>DECL</code> (Pflicht in KSS 8.x); Variablen vor Verwendung initialisieren (sonst undefiniertes Verhalten bei <code>INT</code>/<code>REAL</code>); <code>GLOBAL</code> nur in <code>.DAT</code>-Dateien zulaessig.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §3 (Variablen und Vereinbarungen); KUKA Systemintegratoren-Handbuch §3.2 Datentypen.'
                }
            ],

            // ============================== LEVEL 2 ==============================
            [
                {
                    q: 'Was bewirkt der Bahnannaeherungsmodus <code>C_DIS</code> in einem PTP-Befehl, und welche Systemvariable steuert die Annaeherungsdistanz?',
                    h: '<code>$APO.CDIS</code>.',
                    s: 'Mit <code>PTP P2 C_DIS</code> wird der Punkt P2 <strong>nicht exakt angefahren</strong>; der Roboter beginnt frueher mit der Bewegung zum naechsten Punkt P3 und glaettet die Bahn. Genauer: sobald der TCP innerhalb der Distanz $\\$APO.CDIS$ (in mm) am programmierten Punkt vorbeikommt, beginnt die Ueberblendung zum naechsten Satz.<br>'
                        + 'Vorteil: keine Halte-Pause an Stuetzpunkten, hoehere Bahngeschwindigkeit, kontinuierlicher Prozess (Klebenahnt, Lackierung).<br>'
                        + 'Alternative Annaeherungs-Modi: <code>C_PTP</code> (achs-basiert), <code>C_VEL</code> (geschwindigkeitsbasiert &mdash; Annaeherung beginnt, wenn die programmierte $\\$APO.CVEL$-Schwelle in Prozent unterschritten wird), <code>C_ORI</code> (orientierungsbasiert).<br>'
                        + 'Konsequenz: programmierter Punkt wird <em>nicht</em> erreicht. Wenn ein Punkt exakt angefahren werden muss (Schraubvorgang, Pickup), kein <code>C_*</code> verwenden.'
                },
                {
                    q: 'Wie definiert man in KRL einen Interrupt, der bei einem digitalen Eingang die Bewegung anhaelt und ein Unterprogramm <code>StopHandler()</code> aufruft? Welche Aufgabe hat <code>BRAKE</code>?',
                    h: '<code>INTERRUPT DECL ... WHEN ... DO ...</code> + <code>INTERRUPT ON</code>.',
                    s: 'Skelett:'
                        + code('KRL', 'GLOBAL INTERRUPT DECL 3 WHEN $IN[17] == TRUE DO StopHandler()\nINTERRUPT ON 3\n; ... Hauptbewegungen ...\nINTERRUPT OFF 3\n\nDEF StopHandler()\n  BRAKE       ; haelt Bewegung sofort an, bleibt im Interrupt\n  ; Logging, Fehlermeldung\n  RESUME      ; bricht uebergeordnete Bewegung ab\nEND')
                        + '<strong>Erklaerung:</strong><br>'
                        + '<code>INTERRUPT DECL 3 WHEN ...</code> deklariert Interrupt mit Prioritaet 3 (1 = hoechste, 16 = niedrigste).<br>'
                        + '<code>INTERRUPT ON 3</code> aktiviert ihn; <code>OFF 3</code> deaktiviert. Trigger ist die <em>steigende Flanke</em> der Bedingung.<br>'
                        + '<code>BRAKE</code> stoppt die laufende Roboterbewegung (Bahn-Brake oder, mit <code>BRAKE F</code>, Schnellhalt) ohne den Interrupt-Kontext zu verlassen.<br>'
                        + '<code>RESUME</code> beendet den Interrupt und bricht <strong>alle laufenden Bewegungs- und Programm-Ebenen bis zur Ebene, in der der Interrupt deklariert wurde</strong> ab &mdash; oft ein Sprung zurueck in eine Sicherheits-Position.'
                },
                {
                    q: 'Was bewirken Status- (S) und Turn- (T) Bits in einem <code>POS</code>, und warum sind sie fuer eine eindeutige Pose-Definition unverzichtbar?',
                    h: 'Inverse Kinematik ist mehrdeutig.',
                    s: 'Die inverse Kinematik eines 6-Achs-Industrieroboters hat fuer eine kartesische Pose typischerweise <strong>bis zu 8 Loesungen</strong> (je 2 Konfigurationen fuer Schulter/Ellenbogen/Handgelenk). Mit (X, Y, Z, A, B, C) allein ist die Konfiguration unterbestimmt.<br>'
                        + '<strong>Status (S, 3 Bits):</strong><br>'
                        + 'Bit 0: Hand <em>vor</em> oder <em>hinter</em> Schulter ($a_1 \\pm 90^\\circ$).<br>'
                        + 'Bit 1: Ellenbogen oben oder unten.<br>'
                        + 'Bit 2: Handgelenks-Flip (Achse 5 positiv/negativ).<br>'
                        + '<strong>Turn (T, 6 Bits):</strong> ein Vorzeichen-Bit pro Achse (A1&hellip;A6). Setzt das Vorzeichen des aktuellen Achswinkels. Damit kann eine identische kartesische Pose mit Achswinkeln $+170^\\circ$ oder $-190^\\circ$ unterschieden werden &mdash; relevant, wenn der Roboter Vielfache von $360^\\circ$ aufgewickelt hat.<br>'
                        + 'Bei Bewegungssaetzen ohne S/T (oder S/T = 0) waehlt der Roboter die naechstgelegene IK-Loesung. Reproduzierbar wird die Pose nur mit explizit gesetzten S/T-Bits.'
                },
                {
                    q: 'Was ist der Unterschied zwischen den Override-Variablen <code>$OV_PRO</code> und <code>$OV_JOG</code>?',
                    h: 'Programm-Override vs. Hand-Override.',
                    s: '<code>$OV_PRO</code> ist der <strong>Programm-Override</strong> (0&hellip;100 %), der die programmierte Geschwindigkeit waehrend des Programmlaufs (T1, T2, AUT, AUT-EXT) skaliert. Im Bedienmodus T1 ist $\\$OV_PRO \\leq 25\\%$ <em>per Sicherheitslogik erzwungen</em>. Beeinflusst sowohl Joint- als auch Bahn-Geschwindigkeit.<br>'
                        + '<code>$OV_JOG</code> ist der <strong>Hand-Override</strong> fuer manuelles Verfahren (Tippbetrieb mit Verfahrtasten oder Space-Mouse), unabhaengig vom Programm-Override.<br>'
                        + 'Beide sind ueber das SmartPad einstellbar. Programmgesteuert auf <code>$OV_PRO</code> zugreifen ist erlaubt (z.B. fuer Tempo-Rampen), aber im Sicherheitsbereich vermeiden &mdash; das KUKA-Sicherheitskonzept geht von festen Override-Schwellen aus.'
                },
                {
                    q: 'Erklaere den Begriff <strong>Vorlauf</strong> ($ADVANCE) und warum eine Variable, die direkt nach einem Bewegungsbefehl gesetzt wird, oft "zu frueh" beeinflusst wird.',
                    h: 'Bahnplaner schaut Saetze voraus.',
                    s: 'Der KRL-Interpreter trennt <strong>Vorlauf</strong> (Bahnplaner, schaut bis zu $\\$ADVANCE$ Saetze in die Zukunft, Default 3) und <strong>Hauptlauf</strong> (laeuft synchron zur Bewegung). Anweisungen, die rein der Logik dienen (Variablen-Zuweisungen, mathematische Berechnungen), werden im <em>Vorlauf</em> ausgefuehrt &mdash; oft mehrere Bewegungssaetze, bevor der Roboter physikalisch dort ist.<br>'
                        + '<strong>Folge:</strong>'
                        + code('KRL', 'LIN P10 C_DIS\nLIN P11\n$OUT[5] = TRUE   ; wird oft schon waehrend P10 ausgefuehrt!')
                        + 'Setzt das Output-Signal nicht beim Erreichen von P11, sondern sobald der Vorlauf den Satz erreicht.<br>'
                        + '<strong>Loesung:</strong> Vorlauf-Stop erzwingen mit <code>WAIT SEC 0</code> oder <code>WAIT FOR TRUE</code>:'
                        + code('KRL', 'LIN P11\nWAIT SEC 0   ; Vorlauf wartet auf Hauptlauf\n$OUT[5] = TRUE')
                        + 'Damit wird $\\$OUT[5]$ exakt nach Erreichen von P11 gesetzt &mdash; allerdings auch die Bahn unterbrochen (kein C_DIS-Glaetten ueber diesen Punkt).'
                },
                {
                    q: 'Welche KUKA-Konvention wird fuer die Eulerwinkel A, B, C in einem <code>FRAME</code> verwendet (Drehreihenfolge, Achsen, intrinsisch vs. extrinsisch)?',
                    h: 'KUKA: Karden ZYX, intrinsisch.',
                    s: 'KUKA verwendet die <strong>Karden-Konvention ZYX intrinsisch</strong> (auch "ZY\'X\'\'" geschrieben):<br>'
                        + '1. <strong>A</strong> dreht um die <em>Welt-Z-Achse</em>.<br>'
                        + '2. <strong>B</strong> dreht um die <em>neue Y-Achse</em> (nach A-Drehung).<br>'
                        + '3. <strong>C</strong> dreht um die <em>neue X-Achse</em> (nach A- und B-Drehung).<br>'
                        + 'Bereich: A $\\in (-180^\\circ,\\,180^\\circ]$, B $\\in [-90^\\circ,\\,90^\\circ]$, C $\\in (-180^\\circ,\\,180^\\circ]$.<br>'
                        + 'Bei $B = \\pm 90^\\circ$ tritt Gimbal-Lock auf &mdash; A und C werden mehrdeutig.<br>'
                        + 'Achtung: ABB verwendet Quaternionen, FANUC verwendet WPR (X-Y-Z extrinsisch). Beim Datenaustausch zwischen Roboterherstellern muss die Konvention konvertiert werden &mdash; sonst gespiegelte oder verdrehte Posen.'
                },
                {
                    q: 'Erklaere das <strong>INTERRUPT</strong>-Konzept in KRL, inklusive <code>BRAKE</code> und <code>RESUME</code>.',
                    h: 'Interrupt-Deklaration, Prioritaet, Bahnabbruch.',
                    s: '<strong>Interrupts</strong> in KRL sind ereignisgesteuerte Programmabbrueche &mdash; aehnlich Hardware-Interrupts in der Mikrocontroller-Welt. Verwendung: Reaktion auf Notabschaltung, Kollisionssensor, Bediener-Eingriff.<br>'
                        + '<strong>Deklaration und Aktivierung:</strong><br>'
                        + code('KRL', 'GLOBAL INTERRUPT DECL 5 WHEN $IN[12] == TRUE DO KOLLISION()\nINTERRUPT ON 5             ; aktivieren\n; ... Programm laeuft ...\nINTERRUPT OFF 5            ; deaktivieren')
                        + 'Prioritaet 5 (Wertebereich 1&hellip;39 vom User nutzbar, 40&hellip;128 vom System reserviert; hoehere Prioritaet = wichtiger). Wenn <code>$IN[12]</code> TRUE wird, springt der Interpreter in die <code>KOLLISION()</code>-Routine.<br>'
                        + '<strong><code>BRAKE</code>:</strong> stoppt die laufende Bewegung <em>sofort</em> mit Stoptyp 2 (rampengefuehrt). Verwendung <em>nur</em> in einer Interrupt-Service-Routine &mdash; verhindert, dass der Roboter waehrend der Sensor-Reaktion weiter ueber das Werkstueck rast.<br>'
                        + '<strong><code>RESUME</code>:</strong> beendet die Interrupt-Service-Routine und kehrt <em>nicht</em> zum Hauptprogramm zurueck, sondern <em>verlaesst die aktuelle DEF</em> ganz. Verwendung bei kritischen Fehlern (Notaus-Recovery), wenn ein Wiederaufnehmen am Unterbrechungspunkt nicht sicher ist.<br>'
                        + 'Beispiel-ISR:<br>'
                        + code('KRL', 'DEF KOLLISION()\n  BRAKE                ; sofortiger Stop\n  MSG "Kollision erkannt"\n  PTP XHOME            ; Reset\n  RESUME               ; verlaesst Hauptprogramm\nEND')
                        + 'Quelle: KSS 8.x Programmierhandbuch §16 Interrupts.'
                },
                {
                    q: 'Wie funktioniert ein <code>TRIGGER WHEN DISTANCE</code>-Befehl, und wofuer wird er typisch verwendet?',
                    h: 'Bewegungs-synchrone Aktion.',
                    s: '<code>TRIGGER WHEN DISTANCE</code> ist ein <strong>bahn-synchroner Trigger</strong>: ein Befehl wird ausgefuehrt, wenn der TCP einen <em>relativen Bahn-Punkt</em> erreicht (vor oder nach dem aktuellen Bewegungsziel), nicht bei einem absoluten Punkt oder einer Zeitmarke.<br>'
                        + '<strong>Syntax:</strong><br>'
                        + code('KRL', 'TRIGGER WHEN DISTANCE = 0 DELAY = -50 DO $OUT[10] = TRUE\nLIN P1\nTRIGGER WHEN DISTANCE = 1 DELAY = +100 DO klebstoff_AUS()\nLIN P2')
                        + '<strong>Parameter:</strong><br>'
                        + '&bull; <code>DISTANCE = 0</code> &mdash; bezieht sich auf den <em>Startpunkt</em> der naechsten Bewegung.<br>'
                        + '&bull; <code>DISTANCE = 1</code> &mdash; bezieht sich auf den <em>Zielpunkt</em>.<br>'
                        + '&bull; <code>DELAY</code> in <em>mm</em>: Versatz entlang der Bahn (negativ = vor, positiv = nach dem Bezugspunkt).<br>'
                        + '&bull; <code>DO</code> &mdash; Anweisung (Ausgang setzen, Funktion aufrufen, Variable schreiben).<br>'
                        + 'Vorteil gegenueber Zeit-/E-A-Polling: <em>geschwindigkeitsunabhaengig</em> &mdash; bei halber Geschwindigkeit zuendet der Trigger an derselben Bahnstelle. Daher unentbehrlich fuer:<br>'
                        + '&bull; Klebstoff-Auf/Aus bei variierender Bahngeschwindigkeit;<br>'
                        + '&bull; Schweissstrom-Schalten an Naht-Anfang/Ende;<br>'
                        + '&bull; Foto-Trigger bei Vision-Inspektion in Bewegung.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §11.4 Trigger.'
                },
                {
                    q: 'Was sind <strong>Spline-Bewegungen (SPL, SLIN, SCIRC)</strong> in KRL und welche Vorteile bringen sie?',
                    h: 'Lineare/Splining/Kreisspline-Bahnglaettung.',
                    s: '<strong>Spline-Bewegungen</strong> (eingefuehrt in KSS 5.6, weiterentwickelt in KSS 8.x) ersetzen die klassische Bahnannaeherung (<code>C_DIS/C_VEL/C_ORI</code>) durch eine <em>geschlossene</em> Spline-Kurve durch alle Bahnpunkte:<br>'
                        + '&bull; <code>SPLINE ... ENDSPLINE</code>-Block umschliesst mehrere Bahnpunkte;<br>'
                        + '&bull; <code>SPL P</code> &mdash; Spline-Segment durch P (3D-B-Spline-Interpolation);<br>'
                        + '&bull; <code>SLIN P</code> &mdash; Linear-Segment innerhalb des Splines;<br>'
                        + '&bull; <code>SCIRC P, Q</code> &mdash; Kreissegment.<br>'
                        + 'Beispiel:<br>'
                        + code('KRL', 'SPLINE\n  SPL P1\n  SPL P2\n  SPL P3\n  SLIN P4\n  SCIRC P5, P6\nENDSPLINE')
                        + '<strong>Vorteile gegenueber C_DIS-Annaeherung:</strong><br>'
                        + '&bull; <em>Kontinuierliche zweite Ableitung</em> der Bahn (Beschleunigungsglatt) &mdash; deutlich weniger Vibration, bessere Oberflaeche bei Schweissen/Kleben/Lackieren;<br>'
                        + '&bull; <em>Bahn ist exakt vorhersehbar</em> &mdash; das ist bei C_DIS nicht der Fall (Bahn haengt von $\\$APO$ und vorausschaubaren Saetzen ab);<br>'
                        + '&bull; <em>Geschwindigkeitskorrekturen</em> entlang der Bahn moeglich;<br>'
                        + '&bull; <em>Kollisionspruefung</em> kann auf der Spline-Bahn statt auf einer Naeherung erfolgen.<br>'
                        + 'Nachteil: hoehere Rechenlast im KSS, geringerer "Drueck-Effekt" der Bahnglaettung gegenueber harten Punkten (die Spline weicht von den Bahnpunkten ab &mdash; nicht immer erwuenscht).<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §11.5 Spline-Bewegungen.'
                },
                {
                    q: 'Was ist der <strong>Submit-Interpreter (SPS.SUB)</strong>, und welcher Zyklustakt liegt vor?',
                    h: 'Hintergrundprozess parallel zum Roboter-Programm.',
                    s: 'Der <strong>Submit-Interpreter</strong> ist ein <em>zweiter, paralleler Interpreter</em> im KSS, der unabhaengig vom Roboterprogramm laeuft. Er fuehrt die Datei <code>SPS.SUB</code> im Endlosbetrieb aus. Verwendung:<br>'
                        + '&bull; <em>SPS-Logik:</em> Schnittstelle zwischen Anlage und Roboter (Tuerenstatus, Werkstueck-anwesend-Signale, Materialfluss-Steuerung);<br>'
                        + '&bull; <em>Hintergrund-Ueberwachung:</em> kontinuierliche Pruefung von E/A-Status, Sensorwerten;<br>'
                        + '&bull; <em>Anlagen-Quittierungen:</em> Setzen/Loeschen von Zustandsanzeigen am SmartPad.<br>'
                        + '<strong>Zyklustakt:</strong> typischerweise $\\sim 12\\,\\text{ms}$ (1 IPO-Takt; je nach KSS-Version $4\\,\\text{ms}$ in Echtzeitversionen). Innerhalb eines Zyklus arbeitet der Submit-Interpreter <em>genau einen Pass</em> durch <code>SPS.SUB</code> ab und kehrt zum Anfang zurueck.<br>'
                        + '<strong>Wichtig:</strong> der Submit-Interpreter darf <em>keine Bewegungsbefehle</em> ausfuehren (kein <code>PTP/LIN/CIRC</code>) &mdash; nur Variablen, E/A, Funktionsaufrufe, kurze Logik. Eine Endlosschleife <em>ohne</em> WAIT-Anweisung blockiert den naechsten Zyklus nicht (der Interpreter bricht am Dateiende implizit ab); der Bediener muss aber auf Anlagenebene fuer Reaktivierungsbedingungen sorgen.<br>'
                        + 'Beispiel:<br>'
                        + code('KRL', 'DEF SPS()\n  ; Reset-Taster pruefen\n  IF $IN[15] == TRUE THEN\n    FEHLER_AKTIV = FALSE\n  ENDIF\n  ; Stueckzaehler\n  IF $OUT[20] == TRUE THEN\n    STUECKE = STUECKE + 1\n  ENDIF\nEND')
                        + 'Quelle: KSS 8.x Programmierhandbuch §17 Submit-Interpreter.'
                },
                {
                    q: 'Wie kombiniert man <code>$BASE</code> und <code>$TOOL</code> ueber den <strong>Geometrieoperator (:)</strong>?',
                    h: 'Frame-Verkettung als Matrixmultiplikation.',
                    s: 'Der <strong>Geometrieoperator <code>:</code></strong> verkettet zwei Frames durch <em>Matrixmultiplikation</em> in homogenen Transformationen. Syntax:<br>'
                        + '$$\\mathbf{F}_{\\text{kombiniert}} = \\mathbf{F}_1 : \\mathbf{F}_2 = \\mathbf{T}_1 \\cdot \\mathbf{T}_2,$$'
                        + 'wobei $\\mathbf{T}_i$ die $4\\times 4$-Transformationsmatrix von $\\mathbf{F}_i$ ist.<br>'
                        + 'KRL-Beispiel:<br>'
                        + code('KRL', 'DECL FRAME F_BAUTEIL = {X 500, Y 0, Z 100, A 0, B 0, C 0}\nDECL FRAME F_OFFSET  = {X 0, Y 0, Z 50, A 0, B 0, C 0}\nDECL FRAME F_ZIEL\nF_ZIEL = F_BAUTEIL : F_OFFSET    ; Offset relativ zum Bauteil\nLIN F_ZIEL')
                        + 'Anwendungen:<br>'
                        + '&bull; <em>Werkstueck-Raster:</em> einer Stuetzposition wird ein Index-Offset draufaddiert;<br>'
                        + '&bull; <em>Korrektur-Verschiebung:</em> Sensorgemessenes Delta wird auf eine programmierte Position appliziert &mdash; <code>P_KORR = P_PROG : DELTA_SENSOR</code>;<br>'
                        + '&bull; <em>Tool-Wechsel:</em> mehrere Werkzeuge auf einem Greifer &mdash; $TOOL = TOOL_GREIFER : T_OFFSET_X$, je nach aktivem Tool.<br>'
                        + '<strong>Inverse:</strong> der Operator <code>INVERSE(F)</code> liefert die inverse Transformation: $\\mathbf{T}^{-1}$. Damit laesst sich z.B. ein Punkt von einer Basis in eine andere transformieren:<br>'
                        + code('KRL', 'P_IN_BASIS_NEU = INVERSE(F_BASE_NEU) : F_BASE_ALT : P_IN_BASIS_ALT')
                        + 'Quelle: KSS 8.x Programmierhandbuch §7.5 Geometrieoperator.'
                },
                {
                    q: 'Wie liest man <strong>digitale E/A</strong> ueber <code>$IN[]</code> und <code>$OUT[]</code>, und wie viele Kanaele sind ueblich?',
                    h: 'Eingaenge und Ausgaenge als BOOL-Arrays.',
                    s: '<code>$IN[i]</code> ist ein BOOL-Array fuer die <strong>digitalen Eingaenge</strong>, <code>$OUT[i]</code> fuer die <strong>digitalen Ausgaenge</strong>. Der Indexbereich $i = 1\\ldots 4096$ in KSS 8.x &mdash; tatsaechlich vorhandene Kanaele haengen von der E/A-Hardware (ProfiNet, EtherNet/IP, DeviceNet, Profibus) ab.<br>'
                        + 'Beispiel-Ablauf:<br>'
                        + code('KRL', 'WAIT FOR $IN[5] == TRUE              ; warten bis Eingang 5 high\n$OUT[12] = TRUE                       ; Ausgang 12 setzen\nWAIT SEC 0.5\n$OUT[12] = FALSE                      ; Ausgang 12 ruecksetzen\nIF $IN[20] == FALSE THEN\n  MSG "Werkstueck fehlt"\n  HALT\nENDIF')
                        + '<strong>Mappings:</strong> die physischen E/A-Bus-Adressen werden im KSS-Tool <em>WorkVisual</em> auf <code>$IN/$OUT</code>-Indizes gemappt &mdash; das KRL-Programm bleibt damit hardware-unabhaengig.<br>'
                        + '<strong>Analoge E/A:</strong> <code>$ANIN[i]</code> (Lese-REAL, $-1{,}0\\ldots 1{,}0$ normiert) und <code>$ANOUT[i]</code> (Schreib-REAL) &mdash; typisch 8 Kanaele.<br>'
                        + '<strong>Sicherheits-E/A:</strong> separate Variablen <code>$NEAR_POSRET</code>, <code>$STOPMESS</code> etc., die ueber die KUKA Safe-Schnittstelle (PROFIsafe / FSoE) gefuehrt werden; nicht als $IN/$OUT auslesbar.<br>'
                        + '<strong>Performance:</strong> $IN/$OUT$ wird zyklisch ueber den Bus (typ. 4&ndash;12 ms) aktualisiert &mdash; nicht jeder Zyklus, daher bei sehr kurzen Pulsen WAIT-Funktion verwenden, nicht Polling.<br>'
                        + 'Quelle: KSS 8.x E/A-Handbuch §3 (digitale E/A); WorkVisual 6 Benutzerhandbuch §7 E/A-Mapping.'
                },
                {
                    q: 'Wie funktioniert die <strong>Drehmoment-Ueberwachung</strong> ueber <code>$TORQUE_AXIS_ACT</code>, und wofuer wird sie genutzt?',
                    h: 'Achsmoment-Lesen, Kollisionserkennung ohne Sensor.',
                    s: '<code>$TORQUE_AXIS_ACT[i]</code> (Array A1&hellip;A6) ist eine <strong>schreibgeschuetzte Systemvariable</strong>, die das <em>aktuelle, motorseitig wirksame Drehmoment</em> jeder Achse in <em>Prozent</em> des Spitzenmoments enthaelt ($-100\\ldots +100$). Wird im IPO-Takt aktualisiert.<br>'
                        + '<strong>Anwendung Kollisionserkennung:</strong> ein abrupter Drehmoment-Anstieg, der nicht durch das programmierte Bewegungsprofil zu erklaeren ist, deutet auf einen Kollisionswiderstand hin. KSS bietet dafuer das Modul <code>KUKA.SafeOperation</code> bzw. <code>$COLLISION</code>-Mechanismus, der ueber einen erlernten Drehmoment-Korridor vorhersagt, welches Moment "normal" ist und welches eine Kollision indiziert.<br>'
                        + 'Beispiel-Polling im Submit-Interpreter:<br>'
                        + code('KRL', 'IF ABS($TORQUE_AXIS_ACT[2]) > 80 THEN\n  MSG "A2 Ueberlast"\n  $OV_PRO = 10                  ; Notreduktion auf 10 %\nENDIF')
                        + '<strong>Force-Control-Anwendungen:</strong> bei Schweissen-mit-Andrueckkraft, Schleifen, Polieren, Einsenken (Pin-in-Hole-Montage) wird das gemessene Moment in eine Kraft-Schaetzung umgerechnet und als Regelgroesse fuer eine kraftgeregelte Bahn verwendet. KUKA-Funktion: <em>RoboTeam Force</em> (Erweiterungs-Paket).<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §15.2 Drehmoment-Variablen; KUKA SafeOperation-Handbuch.'
                },
                {
                    q: 'Was ist die <strong>Konfigurations-Ueberwachung (ConfigMon)</strong>, und welchen Zweck erfuellt sie?',
                    h: 'Konfigurationsraum-Ueberwachung, Achsdrehung.',
                    s: '<strong>ConfigMon</strong> ist ein KSS-Sicherheitsmechanismus, der <em>vor</em> jeder Bewegung prueft, ob die ausgefuehrte Achs-Konfiguration mit der programmierten Konfiguration (Status/Turn-Bits) konsistent ist. Tritt waehrend einer <code>LIN/CIRC</code>-Bewegung eine <em>Konfigurationsaenderung</em> auf (z.B. Wechsel von Ellenbogen-oben zu unten oder Vorzeichenwechsel an A4 &mdash; "Wrist-Flip"), bricht das Programm mit einer Sicherheitsmeldung ab.<br>'
                        + '<strong>Warum ist das wichtig?</strong> Eine "harmlose" kartesische Bewegung kann implizit eine grosse Achsbewegung erfordern (z.B. A4 muss um $360^\\circ$ drehen, weil die programmierte Turn-Konfiguration es vorschreibt) &mdash; das fuehrt im Bediener-Test zu unerwarteten Bahnen und Crashs.<br>'
                        + '<strong>Konfiguration:</strong> in <code>$config.dat</code>:<br>'
                        + code('KRL', '; ConfigMon-Toleranz\n$CONFIG_OPT = #ALLOW_ENABLE     ; Erlaubt kontrollierte Aenderung\nDECL E6POS XSTART = {... S 2, T 35 ...}\n$STARTPOS_S = 2                  ; erwartetes S-Bit\n$STARTPOS_T = 35                 ; erwartetes T-Bit')
                        + 'Wird waehrend einer <code>LIN</code>-Bewegung ein anderes S/T-Bit erforderlich, bricht das Programm ab. Bediener muss dann manuell auf eine kompatible Pose fahren oder das Programm umschreiben, sodass der Konfigurationswechsel in einer <code>PTP</code>-Bewegung erfolgt (wo der Konfigwechsel sicher abgefangen wird).<br>'
                        + 'Quelle: KUKA SafeOperation-Handbuch §6.4 ConfigMon; DIN EN ISO 10218-1:2011 §5.10.'
                },
                {
                    q: 'Was ist <strong>Soft-Servo</strong> (Soft Mode), und wann setzt man es ein?',
                    h: 'Achsweiche, Nachgiebigkeitsverhalten.',
                    s: 'Im <strong>Soft-Servo-Mode</strong> wird die <em>Lageregelung</em> einer oder mehrerer Achsen <em>nachgiebig</em> ausgelegt &mdash; statt fest auf den Soll-Wert zu klemmen, gibt der Achsregler bei aeusserer Kraft <em>kontrolliert nach</em>. Das KSS realisiert das durch Reduktion der Regler-Verstaerkungen und Aufpraegen einer virtuellen Steifigkeit/Daempfung.<br>'
                        + '<strong>KRL-Befehl:</strong><br>'
                        + code('KRL', 'SOFTAXIS ON 3, 50                 ; A3 weichschalten, 50 % Steifigkeit\n; ... Bewegung ...\nSOFTAXIS OFF 3')
                        + '<strong>Anwendungen:</strong><br>'
                        + '&bull; <em>Pin-in-Hole-Montage:</em> der Roboter "fuehlt" beim Einsenken die Lochmitte, statt sie exakt anzufahren;<br>'
                        + '&bull; <em>Werkstueck-Aufnahme</em> mit unbekannter Pose: weiches Achsverhalten gleicht Toleranzen ohne harte Stoesse aus;<br>'
                        + '&bull; <em>Schleif-/Polieranwendung:</em> kontrollierte Anpresskraft auf gekruemmten Oberflaechen ohne aufwendige Kraftsensorik;<br>'
                        + '&bull; <em>Mensch-Roboter-Kollaboration</em> in nicht-kollaborativen Robotern (Soft-Servo erhoeht passive Sicherheit gegen Quetschen).<br>'
                        + 'Achtung: Soft-Servo aendert die Wiederholgenauigkeit von $\\pm 0{,}05\\,\\text{mm}$ auf $\\geq \\pm 0{,}5\\,\\text{mm}$ &mdash; nicht fuer Positionierungs-Aufgaben verwenden.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §15.5 Soft Mode; KUKA.ForceTorqueControl Optionspaket.'
                },
                {
                    q: 'Was bedeuten <code>WAIT FOR</code> und <code>WAIT SEC</code>, und welcher Unterschied zur Bahnvorausschau besteht?',
                    h: 'Bedingungs-Wait vs. Zeit-Wait, Bahnplaner-Stop.',
                    s: '<strong><code>WAIT FOR &lt;bedingung&gt;</code>:</strong> haelt den Programmlauf an, bis die Bedingung erfuellt ist. Verwendung: Synchronisation mit der Anlage:<br>'
                        + code('KRL', 'WAIT FOR ($IN[5] == TRUE) AND ($IN[6] == FALSE)\n$OUT[10] = TRUE\nWAIT FOR $IN[10] == TRUE\nLIN P1')
                        + '<strong><code>WAIT SEC &lt;zeit&gt;</code>:</strong> Pause fester Dauer in Sekunden (REAL):<br>'
                        + code('KRL', 'WAIT SEC 0.5\nWAIT SEC 2.0    ; 2-Sekunden-Pause')
                        + '<strong>Unterschied zur Bahnvorausschau:</strong> Beide WAIT-Befehle wirken als <strong>Bahnplaner-Stopper</strong> &mdash; der Vorausschau-Puffer (siehe <code>$ADVANCE</code>) wird geleert. Das hat zwei Konsequenzen:<br>'
                        + '&bull; <em>Annaeherung (C_DIS/SPL) bricht ab</em> &mdash; der vor dem WAIT liegende Bewegungssatz wird exakt zu Ende gefahren, dann WAIT, dann der naechste Satz mit Anlauf-Beschleunigung;<br>'
                        + '&bull; <em>Reaktionszeit</em> verkuerzt sich &mdash; der Interpreter steht direkt vor dem WAIT bereit, statt mehrere Saetze vorauszuplanen.<br>'
                        + '<strong>Workaround:</strong> bei zeitkritischen Bewegungen ohne Bahnabbruch <code>WAIT FOR ... DO ... ENDWAIT</code> (KSS 8.x), das den Bahnplaner <em>nicht</em> stoppt &mdash; aber dann ist die Reaktion auf das Ereignis bahnverzoegert.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §11.7 WAIT.'
                },
                {
                    q: 'Wie definiert man <strong>Werkzeug- und Basis-Vermessung</strong> ueber die 4-Punkt-XYZ-Methode (ISO 9787)?',
                    h: 'Vier Posen, Kalibrierwuerfel, TCP-Berechnung.',
                    s: 'Die <strong>4-Punkt-XYZ-Methode</strong> (DIN EN ISO 9787:2013 §6.4) bestimmt den TCP relativ zum Flansch-Koordinatensystem:<br>'
                        + '<strong>Verfahren:</strong> ein <em>Kalibrierpin</em> (spitze Werkzeugspitze) wird an einer ortsfesten <em>Referenzspitze</em> (Kalibrierwuerfel-Eckpunkt im Arbeitsraum) angesetzt &mdash; aus <strong>vier unterschiedlichen Roboterposen</strong>, bei denen die Werkzeugspitze immer denselben Raumpunkt beruehrt.<br>'
                        + '<strong>Mathematik:</strong> bei jeder Pose $i$ liest der Controller die Flansch-Pose $\\mathbf{T}_{F,i}$ aus. Die TCP-Position im Flanschsystem $\\mathbf{p}_{TCP}^F$ ist konstant. Im Welt-System ist der angepeilte Punkt $\\mathbf{p}_W$ ebenfalls konstant:<br>'
                        + '$$\\mathbf{p}_W = \\mathbf{T}_{F,i} \\cdot \\mathbf{p}_{TCP}^F \\quad \\forall\\, i.$$'
                        + 'Aus diesen 4 Gleichungen mit 6 Unbekannten ($\\mathbf{p}_{TCP}^F$ in 3D, $\\mathbf{p}_W$ in 3D) folgt im ueberbestimmten Least-Squares-Sinn die TCP-Position $\\mathbf{p}_{TCP}^F = (X, Y, Z)$.<br>'
                        + '<strong>Wichtige Bedingungen:</strong><br>'
                        + '&bull; Die 4 Roboterposen muessen <em>signifikant unterschiedlich</em> sein &mdash; verschiedene A, B, C-Winkel. Vorzugsweise alle 4 Achsen so unterscheidlich, dass die Konditionierung der Gleichung gut ist;<br>'
                        + '&bull; <em>Genauigkeit</em>: typisch $\\pm 0{,}5\\,\\text{mm}$, mit hochauflo&ouml;sender Mehrkamera-Vermessung $\\leq 0{,}1\\,\\text{mm}$;<br>'
                        + '&bull; Fuer die Orientierung wird zusaetzlich die <strong>XYZ-4-Punkt-mit-ABC</strong>-Methode oder die <strong>3-Punkt-XYZ-ABC</strong> verwendet.<br>'
                        + '<strong>SmartPad-Workflow:</strong> Menue <em>Inbetriebnahme &gt; Vermessung &gt; Werkzeug &gt; XYZ-4-Punkt</em>; nach Eingabe der 4 Posen wird der TCP automatisch in <code>TOOL_DATA[i]</code> geschrieben.<br>'
                        + 'Quelle: DIN EN ISO 9787:2013 "Industrieroboter &mdash; Vermessungsmethoden"; KSS 8.x Bedienhandbuch §13 Werkzeug- und Basisvermessung.'
                },
                {
                    q: 'Wie greifen mehrere Roboter ueber <strong>RoboTeam (KUKA Master-Slave-Kopplung)</strong> auf eine gemeinsame Bahn zu?',
                    h: 'Geometrische Verkopplung, Master gibt Bahn vor.',
                    s: '<strong>RoboTeam</strong> ist ein KUKA-Erweiterungspaket fuer die <em>geometrische Verkopplung</em> mehrerer Roboter auf einer gemeinsamen Bahn. Anwendung: Tragen grosser/schwerer Werkstuecke durch zwei oder mehr Roboter, kollaboratives Schweissen einer langen Naht durch zwei Brenner-Roboter, Mehrkopf-Bearbeitung.<br>'
                        + '<strong>Master-Slave-Konzept:</strong><br>'
                        + '&bull; Ein Roboter wird als <em>Master</em> deklariert. Er gibt die Bahn vor.<br>'
                        + '&bull; Andere Roboter ("Slaves") empfangen ueber den RoboTeam-Bus (Ethernet, deterministisch, Zyklustakt $\\sim 12\\,\\text{ms}$) den Soll-Bahnpunkt des Masters und berechnen aus einer fest definierten <em>geometrischen Beziehung</em> (Frame-Verkettung) ihre eigene Soll-Pose.<br>'
                        + '<strong>KRL-Konfiguration:</strong> der Master- und Slave-Controller werden ueber <em>WorkVisual</em> miteinander gekoppelt. Im KRL-Programm des Slaves wird der Master als <em>"externe Kinematik"</em> (Erweiterung des Achsraumes auf E1&hellip;E6 fuer Master-Achsen) eingebunden &mdash; der Slave behandelt den Master-TCP wie eine eigene Zusatzachse.<br>'
                        + '<strong>Anwendungs-Beispiel:</strong> Schweissen einer Karosserie:<br>'
                        + '&bull; <em>Master:</em> haelt die Karosserie und bewegt sie kontrolliert;<br>'
                        + '&bull; <em>Slave 1+2:</em> Punktschweisszangen, die in der bewegten Karosserie nachfuehren.<br>'
                        + 'Damit lassen sich Bahnpunkte programmieren, die nur durch die geometrische Verkopplung erreichbar sind &mdash; klassisch waere das durch eine Drehkippeinheit (Workplate) zu loesen.<br>'
                        + '<strong>Sicherheit:</strong> Die Sicherheits-Steuerung der Roboter ist ueber PROFIsafe verkoppelt &mdash; ein Notaus an einem Controller stoppt alle Roboter im Team synchron.<br>'
                        + 'Quelle: KUKA RoboTeam-Handbuch (Optionspaket); KSS 8.x Programmierhandbuch §18 Externe Kinematik.'
                },
                {
                    q: 'Wie wird in KRL ein <strong>String</strong> verarbeitet, da es keinen nativen STRING-Datentyp gibt?',
                    h: 'CHAR-Array, STRCOPY, STRCLEAR, STRCOMP.',
                    s: 'KRL hat <em>keinen</em> nativen STRING-Datentyp. Stattdessen werden Zeichenketten als <strong>CHAR-Arrays</strong> mit fester Maximallaenge implementiert. Die Standardbibliothek bietet Manipulationsfunktionen.<br>'
                        + '<strong>Deklaration:</strong><br>'
                        + code('KRL', 'DECL CHAR MEINTEXT[40]            ; max. 40 Zeichen\nDECL CHAR ANTWORT[20]')
                        + '<strong>Wichtige Funktionen:</strong><br>'
                        + '&bull; <code>STRCOPY(QUELLE[], ZIEL[])</code> &mdash; kopiert eine Zeichenkette;<br>'
                        + '&bull; <code>STRCLEAR(STR[])</code> &mdash; leert die Zeichenkette;<br>'
                        + '&bull; <code>STRCOMP(STR1[], STR2[])</code> &mdash; vergleicht (Rueckgabe: TRUE/FALSE);<br>'
                        + '&bull; <code>STRADD(ZIEL[], QUELLE[])</code> &mdash; haengt an;<br>'
                        + '&bull; <code>STRLEN(STR[])</code> &mdash; Laenge;<br>'
                        + '&bull; <code>STRTOREAL(STR[], WERT)</code> / <code>REALTOSTR(WERT, STR[])</code> &mdash; Konvertierung Zahl&harr;String;<br>'
                        + '&bull; <code>STRFIND(HEUSTACK[], NEEDLE[])</code> &mdash; Substring-Suche, Rueckgabe Index.<br>'
                        + 'Beispiel:<br>'
                        + code('KRL', 'STRCLEAR(MEINTEXT[])\nSTRCOPY("Stueck Nr. ", MEINTEXT[])\nDECL CHAR ZAHL[10]\nREALTOSTR(ZAEHLER, ZAHL[])\nSTRADD(MEINTEXT[], ZAHL[])\nMSG MEINTEXT[]                   ; "Stueck Nr. 42"')
                        + '<strong>String-Konkatenation per Operator <code>+</code></strong> ist zwar in KRL-Ausgabe-Anweisungen wie <code>MSG</code> moeglich &mdash; in Variablen-Zuweisungen aber nicht. Daher fuer Programmlogik immer die STR*-Funktionen.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §6.7 Zeichenketten; KRC-Library-Referenz.'
                },
                {
                    q: 'Was sind <strong>ENUM-Datentypen</strong> in KRL, und wozu nutzt man sie?',
                    h: 'Benannte Konstanten statt magischer Zahlen.',
                    s: '<strong>ENUM</strong>-Datentypen sind <em>benutzerdefinierte Aufzaehlungstypen</em> &mdash; eine Menge von benannten Konstanten, die zur Lesbarkeit und Typsicherheit beitragen.<br>'
                        + '<strong>Definition (in .DAT-Datei):</strong><br>'
                        + code('KRL', 'GLOBAL ENUM PRODUKT_TYP\n  #PROD_KAROSSERIE\n  #PROD_ACHSE\n  #PROD_TUER\nENDENUM\n\nGLOBAL ENUM ZUSTAND\n  #BEREIT\n  #LAEUFT\n  #GESTOPPT\n  #FEHLER\nENDENUM')
                        + 'Verwendung:<br>'
                        + code('KRL', 'DECL PRODUKT_TYP AKT_PRODUKT = #PROD_KAROSSERIE\nDECL ZUSTAND AKT_ZUSTAND = #BEREIT\n\nSWITCH AKT_PRODUKT\n  CASE #PROD_KAROSSERIE\n    schweissen_karosserie()\n  CASE #PROD_ACHSE\n    schweissen_achse()\n  CASE #PROD_TUER\n    schweissen_tuer()\nENDSWITCH')
                        + '<strong>Vorteile gegenueber INT-Konstanten:</strong><br>'
                        + '&bull; <em>Typsicherheit:</em> der Compiler verhindert, dass man versehentlich <code>AKT_PRODUKT = #BEREIT</code> zuweist (anderer ENUM-Typ);<br>'
                        + '&bull; <em>Lesbarkeit:</em> <code>AKT_ZUSTAND = #FEHLER</code> sagt mehr als <code>AKT_ZUSTAND = 3</code>;<br>'
                        + '&bull; <em>Erweiterbarkeit:</em> Hinzufuegen eines neuen Werts (z.B. <code>#PROD_HAUBE</code>) erfordert kein Umnumerieren bestehender Konstanten.<br>'
                        + '<strong>Eingebaute Enums:</strong> KRL kennt eine Reihe von Standard-Enums wie <code>#PTP_PARAMS</code>, <code>#VEL_PTP</code>, <code>#INITMOV</code> (BAS-Funktionsargumente), <code>#P_ACTIVE</code> ($PRO_STATE), <code>#STOPRAMPA</code> u.a.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §6.8 ENUM-Datentypen.'
                },
                {
                    q: 'Was ist die <strong>Arbeitsraumueberwachung ($WORKSPACE)</strong>, und wie konfiguriert man sie?',
                    h: 'Kartesische Schutzkubus-Definition, Kollisionsschutz.',
                    s: '<code>$WORKSPACE[i]</code> ist ein Array (typ. 8 Slots) zur Definition von <strong>kartesischen Arbeitsraum-Quadern</strong>, die der Roboter <em>nicht verletzen</em> darf (Ausschluss-Raum) oder <em>nicht verlassen</em> darf (Beschraenkungs-Raum).<br>'
                        + '<strong>Konfiguration in $config.dat:</strong><br>'
                        + code('KRL', '$WORKSPACE[1] = {MODE #INSIDE, X1 -1000, Y1 -1000, Z1 0, X2 1000, Y2 1000, Z2 2000, A 0, B 0, C 0, AXIS 0}\n$WORKSPACE[2] = {MODE #OUTSIDE, X1 -200, Y1 -200, Z1 0, X2 200, Y2 200, Z2 500, A 0, B 0, C 0, AXIS 0}')
                        + '<strong>Modi:</strong><br>'
                        + '&bull; <code>#INSIDE</code> &mdash; TCP <em>muss</em> innerhalb des Quaders bleiben (Bewegungsraum-Limit). Verletzt &rArr; Sicherheits-Stop.<br>'
                        + '&bull; <code>#OUTSIDE</code> &mdash; TCP <em>darf nicht</em> in den Quader eintreten (Schutzobjekt &mdash; z.B. Anlagenwand, Werkzeugmagazin).<br>'
                        + '&bull; <code>#OFF</code> &mdash; deaktiviert (Default).<br>'
                        + '<strong>Pruefung:</strong> der KSS prueft <em>vor</em> jeder Bewegung, ob die geplante Bahn die Workspace-Limits verletzt. Wenn ja: Stop mit Meldung <em>"$WORKSPACE_VIOL"</em>.<br>'
                        + '<strong>Erweiterte Form:</strong> $WORKSPACE$ kann ueber <code>AXIS</code>-Modus auch Achs-Quader (statt kartesisch) ueberwachen &mdash; nuetzlich, wenn der TCP an mehreren Stellen erlaubt ist, aber bestimmte Achsstellungen verboten (z.B. A4 nicht ueber 270 Grad).<br>'
                        + '<strong>Sicherheit:</strong> $WORKSPACE$ allein ist <em>kein</em> sicherheitsgerichtetes Feature &mdash; fuer Personenschutz muss <em>KUKA.SafeOperation</em> mit zertifizierten Schutzraeumen (Kategorie 3 PL d gemaess EN ISO 13849-1) eingesetzt werden.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §14 Arbeitsraumueberwachung.'
                },
                {
                    q: 'Wie funktioniert <strong>Touch-Sensing</strong> (Lichtbogenzuendung als Sensor, "Touch Sense") beim Lichtbogenschweissen?',
                    h: 'Spannungsmessung am Werkstueck, Kontaktpunkt.',
                    s: '<strong>Touch-Sensing</strong> nutzt den <em>Schweissbrenner</em> selbst als beruehrungslosen / beruehrenden Sensor zur Werkstueck-Positionserkennung vor dem Schweissen. Es gibt zwei Varianten:<br>'
                        + '<strong>1. Beruehrungs-Touch-Sense:</strong> die Schweissstromquelle legt eine niedrige Pruefspannung (typ. 24 V DC) zwischen Brennerdraht und Werkstueck. Der Roboter faehrt mit dem Brennerdraht langsam in Richtung Werkstueck. <em>Bei elektrischem Kontakt</em> schliesst der Stromkreis &mdash; der Stromfluss wird detektiert und der Roboter stoppt. Die <em>aktuelle TCP-Pose</em> (<code>$POS_ACT</code>) ist die gemessene Werkstueck-Position.<br>'
                        + '<strong>KRL-Implementierung (vereinfacht):</strong><br>'
                        + code('KRL', 'DECL E6POS XGEMESSEN\n; Tip-Sense aktivieren (Stromquelle-Schnittstelle)\n$OUT[TIP_SENSE_ENA] = TRUE\nLIN_REL {Z -50}                  ; langsam in Richtung Werkstueck\nIF $IN[TIP_TOUCHED] == TRUE THEN\n  XGEMESSEN = $POS_ACT\nELSE\n  MSG "Kein Kontakt"\nENDIF\n$OUT[TIP_SENSE_ENA] = FALSE')
                        + 'Genauigkeit: $\\pm 0{,}2\\,\\text{mm}$ bei sauberem Werkstueck. Drei orthogonale Touch-Punkte liefern die <strong>Werkstueck-Verlagerung</strong> (Frame-Offset) &mdash; das Programm korrigiert die programmierten Bahnen entsprechend.<br>'
                        + '<strong>2. Lichtbogen-Suche ("Through-the-Arc Seam Tracking", TAST):</strong> waehrend des Schweissens variiert der Lichtbogenstrom mit dem Brenner-Werkstueck-Abstand. Eine pendelnde Brennerbewegung (Weben) misst die Stromfluss-Modulation und korrigiert die Bahn in Echtzeit, sodass der Brenner in der Naht bleibt &mdash; klassisches Verfahren fuer raue Nahtgeometrien (z.B. Kehlnaht V-Form).<br>'
                        + 'Quelle: DIN EN ISO 17655 (TAST), KUKA.ArcSense-Optionspaket (Touch-Sense Implementierung).'
                },
                {
                    q: 'Wie wird ein <strong>Roboter-Programm aus einer SPS</strong> heraus ueber EXT-Mode gestartet, und welche Schnittstellensignale sind ueblich?',
                    h: 'PGNO, $MOVE_ENABLE, $EXT_START.',
                    s: '<strong>EXT-Mode (Externer Automatikbetrieb)</strong> ist die Standardbetriebsart in der Serienfertigung. Die Anlagen-SPS (z.B. Siemens S7-1500 + ProfiNet) steuert den Robotercontroller ueber ein definiertes Signal-Set.<br>'
                        + '<strong>Wichtige Schnittstellensignale (KUKA Standard PROFINET):</strong><br>'
                        + '<table style="margin: 6px 0"><tr><th>Signal</th><th>Richtung</th><th>Funktion</th></tr>'
                        + '<tr><td><code>$EXT_START</code></td><td>SPS &rarr; KRC</td><td>Startsignal (Flanke)</td></tr>'
                        + '<tr><td><code>$MOVE_ENABLE</code></td><td>SPS &rarr; KRC</td><td>Bewegungsfreigabe (Pegel)</td></tr>'
                        + '<tr><td><code>$DRIVES_ON</code></td><td>SPS &rarr; KRC</td><td>Antriebsfreigabe-Anforderung</td></tr>'
                        + '<tr><td><code>$CONF_MESS</code></td><td>SPS &rarr; KRC</td><td>Fehler quittieren</td></tr>'
                        + '<tr><td><code>$PGNO[]</code></td><td>SPS &rarr; KRC</td><td>Programm-Nummer (typ. INT, 8 Bit)</td></tr>'
                        + '<tr><td><code>$PGNO_VALID</code></td><td>SPS &rarr; KRC</td><td>PGNO ist gueltig</td></tr>'
                        + '<tr><td><code>$PRO_ACT</code></td><td>KRC &rarr; SPS</td><td>Programm laeuft</td></tr>'
                        + '<tr><td><code>$PRO_END</code></td><td>KRC &rarr; SPS</td><td>Programm fertig (Zyklusende)</td></tr>'
                        + '<tr><td><code>$IN_HOME</code></td><td>KRC &rarr; SPS</td><td>Roboter in HOME-Position</td></tr></table>'
                        + '<strong>Programmwahl-Logik:</strong> in der <code>CELL.SRC</code> wartet der Roboter im EXT-Mode auf <code>$EXT_START</code>. Nach Empfang liest er <code>$PGNO</code> und ruft das passende Unterprogramm:<br>'
                        + code('KRL', 'DEF CELL()\n  ; CELL initialisieren\n  REPEAT\n    WAIT FOR ($EXT_START == TRUE) AND ($PGNO_VALID == TRUE)\n    SWITCH $PGNO\n      CASE 1\n        zyklus_karosserie()\n      CASE 2\n        zyklus_tuer()\n      DEFAULT\n        MSG "Unbekannte PGNO"\n    ENDSWITCH\n    PTP XHOME\n  UNTIL FALSE\nEND')
                        + 'Quelle: KSS 8.x Bedienhandbuch §6 (Externer Automatikbetrieb); KUKA PROFINET-Handbuch §4 Schnittstellensignale.'
                },
                {
                    q: 'Welcher Unterschied besteht zwischen <code>WAIT SEC</code>, <code>WAIT FOR</code> und einer <strong>TRIGGER</strong>-Anweisung in KRL, und welche Auswirkungen hat das jeweils auf den <strong>Advance-Run</strong>?',
                    h: 'WAIT SEC: Pause; WAIT FOR: bedingtes Warten; TRIGGER: zeit-/wegsynchrone Aktion auf der Bahn ohne Stop.',
                    s: 'Alle drei sind Synchronisationsmittel in KRL, unterscheiden sich aber fundamental im Verhalten gegenueber dem <strong>Advance-Run</strong> ($\$ADVANCE$, Default 3 Saetze Vorausschau).<br>'
                        + '<strong>1. <code>WAIT SEC t</code> (Zeit-Pause):</strong> erzeugt einen <em>Advance-Run-Stopp</em>. Der Interpreter haelt den Vorlauf an, der Roboter erreicht einen <em>Genauhalt</em>, dann laeuft die Zeit $t$ &mdash; danach geht es weiter. Verhindert Bahn-Annaeherung (<code>C_DIS</code>, <code>C_PTP</code>) am davorliegenden Bewegungssatz.<br>'
                        + code('KRL', 'LIN P10 C_DIS\nWAIT SEC 0.5   ; HIER Genauhalt + 500 ms Pause\nLIN P20 C_DIS')
                        + '<strong>2. <code>WAIT FOR bedingung</code> (Pegel-/Eingangswarten):</strong> ebenfalls Advance-Run-Stopp. Der Roboter haelt an und wartet, bis die Bedingung <code>TRUE</code> wird.<br>'
                        + code('KRL', 'LIN P10 C_DIS\nWAIT FOR $IN[5] == TRUE   ; Stop, warte auf Sensor\nLIN P20 C_DIS')
                        + '<strong>3. <code>TRIGGER WHEN PATH = x DELAY = y DO anweisung</code>:</strong> <em>kein</em> Advance-Run-Stopp. Die Aktion (z.B. <code>$OUT[3] = TRUE</code>, Unterprogramm-Aufruf) wird <strong>auf der Bahn</strong> ausgeloest, zeit- bzw. wegsynchron zum Bezugspunkt &mdash; die Bewegung laeuft ohne Verzoegerung durch.<br>'
                        + code('KRL', '; 50 ms vor Erreichen von P20 die Schweisszange schliessen\nTRIGGER WHEN DISTANCE = 1 DELAY = -50 DO $OUT[3] = TRUE\nLIN P20 C_DIS\n\n; Alternative mit PATH: 20 mm vor Bahnende\nTRIGGER WHEN PATH = -20 DELAY = 0 DO zange_zu()')
                        + '<strong>Konsequenzen fuer die Programmqualitaet:</strong> wer in einer Schweiss-/Klebe-Roboterzelle die Zange mit <code>WAIT FOR $IN[..]</code> statt mit <code>TRIGGER</code> ansteuert, erzwingt einen Genauhalt vor jedem Schweisspunkt &mdash; Zykluszeit steigt typ. um 200&hellip;400 ms pro Punkt. Korrekt ist die <code>TRIGGER</code>-Variante, die Bahnannaeherung erhalten bleibt.<br>'
                        + '<strong>Sonderfall:</strong> <code>CONTINUE</code> vor einem <code>WAIT FOR</code> verhindert den Advance-Run-Stopp <em>nicht</em>; es bewirkt nur, dass die <em>folgende</em> Anweisung beim Vorlauf nicht stoppt &mdash; oft missverstanden.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §11 (Synchronisationsanweisungen) sowie KUKA Schulungsmaterial "Bahnplanung und Advance-Run".'
                }
            ],

            // ============================== LEVEL 3 ==============================
            [
                {
                    q: 'Wie erweitert man KRL um <strong>Sensor-gesteuerte Bahnkorrektur</strong>, z.B. ueber den RSI (Robot Sensor Interface)? Welcher Zyklustakt liegt typischerweise vor?',
                    h: 'RSI-Objektgraph, 4 / 12 ms IPO-Takt.',
                    s: 'KUKA.RSI (Robot Sensor Interface, KUKA-Optionspaket) erweitert KRL um eine <strong>echtzeitfaehige Sensor-Schleife</strong>. Statt Bewegungssaetze diskret anzufahren, baut der Programmierer im RSI-Editor einen <em>Objektgraphen</em> aus Bloecken (ETHERNET-Empfang, Filter, KORREKTUR), der pro Interpolations-Takt einmal abgearbeitet wird.<br>'
                        + '<strong>Zyklustakt:</strong> KRC4 IPO-Takt $T_\\text{IPO} = 12\\,\\text{ms}$ (Standard) oder $4\\,\\text{ms}$ (Fast IPO mit Optionspaket); jeder Takt liefert eine kartesische Korrekturoffset $\\Delta x,\\,\\Delta y,\\,\\Delta z,\\,\\Delta a,\\,\\Delta b,\\,\\Delta c$, das auf die geplante Bahn aufaddiert wird.<br>'
                        + 'KRL-seitig wird RSI mit:'
                        + code('KRL', 'CONTID = RSI_CREATE("Sensor.rsi", CONTAINERID, FALSE)\nRSI_ON(#RELATIVE)\nLIN P10\nRSI_OFF()')
                        + 'aktiviert. Ein RELATIVE-Modus addiert die Sensor-Korrektur zur programmierten Bahn (Schweissnahtfolgung, Schleifen mit Kraftregelung).<br>'
                        + '<strong>Stabilitaet:</strong> Sensor-Daten muessen synchron im IPO-Takt eintreffen (UDP/TCP-Latenz $\\leq T_\\text{IPO}$); bei Drop-Out triggert RSI einen Sicherheitshalt (RSI-Watchdog).<br>'
                        + 'Quelle: KUKA.RobotSensorInterface 4.x, Dokumentation Stand 2022.'
                },
                {
                    q: 'Beschreibe das Konzept der <strong>Submitinterpreter</strong> (SUBMIT/SPS.SUB) und in welchem Verhaeltnis er zum Hauptprogramm steht.',
                    h: 'Eigener Interpreter, niedrige Prioritaet, parallel.',
                    s: 'Der Submitinterpreter (SUB) ist ein <strong>zweiter, parallel laufender KRL-Interpreter</strong> auf der KRC. Er fuehrt zyklisch das Modul <code>SPS.SUB</code> aus &mdash; im Wesentlichen eine SPS-aehnliche Endlosschleife, die <em>unabhaengig</em> vom Hauptprogramm laeuft.<br>'
                        + '<strong>Eigenschaften:</strong><br>'
                        + '&bull; Niedrigere Prioritaet als Hauptinterpreter; Bewegungsbefehle (PTP/LIN/CIRC) sind im SUB <em>verboten</em>.<br>'
                        + '&bull; Typische Aufgaben: I/O-Kommunikation, Statusausgaben, Sicherheits-Logik, BetriebsartenWechsel, Heartbeat-Pings.<br>'
                        + '&bull; Zykluszeit $T_\\text{SUB} \\approx 12\\,\\text{ms}$ (gleicher IPO-Takt), aber unter Last variabel.<br>'
                        + '&bull; Greift auf dieselben Systemvariablen ($\\$IN$, $\\$OUT$, $\\$FLAG$) zu wie der Hauptinterpreter &mdash; Synchronisation ueber Flags, nicht ueber Locks.<br>'
                        + 'Skelett:'
                        + code('KRL', 'DEF SPS()\n  LOOP\n    ; zyklisch ausgefuehrt\n    IF $IN[1] AND NOT $FLAG[1] THEN\n      $OUT[10] = TRUE\n    ENDIF\n    WAIT SEC 0   ; gibt CPU frei\n  ENDLOOP\nEND')
                        + 'Fehlt das <code>WAIT SEC 0</code>, blockiert der SUB-Interpreter den Hauptlauf und KSS triggert nach Sekunden einen "Submit verschluckt"-Watchdog.'
                },
                {
                    q: 'Erklaere die Singularitaet im <strong>Handgelenk</strong> eines klassischen 6-Achs-Roboters (Achsen 4-5-6 schneiden sich) und welche KRL-Massnahmen LIN-Bewegungen durch eine solche Singularitaet ueberhaupt erlauben.',
                    h: 'Achse 5 = $0^\\circ$ &rarr; Achsen 4 und 6 koaxial, IK-Jacobi singulaer.',
                    s: 'Handgelenks-Singularitaet (Wrist-Singularity) tritt auf, wenn <strong>Achse 5 = $0^\\circ$</strong> ist: Achsen 4 und 6 werden koaxial. Damit gibt es <em>unendlich viele</em> Achswinkel-Kombinationen ($a_4, a_6$ mit konstantem $a_4 + a_6$) fuer dieselbe Endorientierung. Die inverse Jacobi-Matrix wird singulaer, die fuer LIN noetigen Achs-Geschwindigkeiten gehen gegen unendlich.<br>'
                        + '$$\\det J(\\mathbf{q}) \\to 0 \\quad \\text{bei}\\;a_5 \\to 0$$'
                        + '<strong>KUKA-Massnahmen:</strong><br>'
                        + '&bull; <code>$SINGUL_POS[]</code> setzt automatische Verlangsamung in Singularitaetsnaehe.<br>'
                        + '&bull; <em>Singularitaetsstrategie</em> ueber <code>$SINGUL_STRATEGY</code> (KSS 8.5+): #STOP, #DEGRADE_VELOCITY, #LIN_AS_PTP &mdash; bei der letzten Variante wird die LIN-Bewegung in Singularitaetsnaehe in eine PTP-aehnliche umgewandelt, mit Verlust der TCP-Linearitaet, aber ohne Stop.<br>'
                        + '&bull; Programmtechnisch: Bahn so planen, dass Achse 5 nicht durch Null laeuft; ggf. einen Zwischenpunkt mit $|a_5| > 5^\\circ$ setzen.<br>'
                        + 'Weitere Singularitaeten: <em>Schulter-Singularitaet</em> ($a_1 = 0$ und TCP auf Achse 1 senkrecht) sowie <em>Ueberkopf-Singularitaet</em> (TCP auf der Hauptachse).'
                },
                {
                    q: 'Wie realisiert man in KRL eine <strong>nachgiebige Regelung</strong> (Compliance) mit dem Optionspaket KUKA.ForceTorqueControl, und welcher Variablentyp beschreibt eine Steifigkeitsmatrix?',
                    h: 'FT-Control aktiviert kartesische Impedanz, $K \\in \\mathbb{R}^{6\\times 6}$ diagonal.',
                    s: 'Mit dem Optionspaket <code>KUKA.ForceTorqueControl</code> (FTC) laesst sich der Roboter so betreiben, dass er an einem oder mehreren TCP-Freiheitsgraden eine Soll-Kraft/Moment regelt statt einer Soll-Position &mdash; das nennt sich <em>Hybrid-Position-Force-Control</em> oder <em>kartesische Impedanz</em>.<br>'
                        + 'Skelett (vereinfacht):'
                        + code('KRL', 'FT_INIT()\nFT_SET_FT_MAGNITUDE(20.0, 0.0, 0.0, 0.0, 0.0, 0.0)   ; Sollkraft Fx = 20 N\nFT_SET_STIFFNESS(2000, 5000, 5000, 200, 200, 200)    ; K_xx ... K_cc\nFT_ON()\nLIN P_TARGET\nFT_OFF()')
                        + 'Steifigkeit $K$ ist im Wesentlichen eine <strong>diagonale 6x6-Matrix</strong> mit Eintraegen pro kartesischem DoF (translatorisch in N/m, rotatorisch in Nm/rad bzw. Nm/${}^\\circ$). In KRL wird sie als sechs Skalare uebergeben.<br>'
                        + 'Reglergleichung (Impedanz):<br>'
                        + '$$F_\\text{ext} = K(\\mathbf{x}_\\text{ist} - \\mathbf{x}_\\text{soll}) + D\\dot{\\mathbf{x}} + M\\ddot{\\mathbf{x}}$$'
                        + 'mit Steifigkeit $K$, Daempfung $D$ (typisch automatisch ueber kritische Daempfung gesetzt) und virtueller Traegheit $M$ (FTC: meist gleich der gemessenen Last).<br>'
                        + '<strong>Praxisrelevanz:</strong> Schraubprozesse, Konturfolgen, Snap-Fit-Montagen, Polieren. Sicherheits-Anforderungen nach ISO 10218-2 muessen weiter erfuellt sein &mdash; Krafteingriff ersetzt kein Kollisions-Schutzkonzept.<br>'
                        + 'Quelle: KUKA.ForceTorqueControl 5.x, Dokumentation Stand 2023.'
                },
                {
                    q: 'Wie funktioniert die <strong>RoboTeam</strong>-Synchronisation zweier KRC4-Steuerungen ueber die Roboter-Zeitachse, und welcher Befehl synchronisiert eine kollaborative Bewegung?',
                    h: 'TIMER_LIMIT, MASTER/SLAVE, COOP-Sync.',
                    s: 'KUKA.RoboTeam koppelt mehrere KRC4-Steuerungen so, dass sie ein gemeinsames Werkstueck handhaben (z.B. zwei Roboter heben einen Karosseriebogen). Eine Steuerung wird zum <strong>Master</strong>, die anderen zu <strong>Slaves</strong>; die Master-Zeitachse $t_\\text{master}$ ist Referenz fuer alle Slaves.<br>'
                        + '<strong>Bewegungs-Synchronisation</strong> ueber den Befehl <code>SYNC()</code> bzw. <code>COUPLE()</code>:<br>'
                        + '&bull; <code>SYNC P_LIN</code> zwingt alle Roboter, einen markierten Punkt <em>zur selben Zeit</em> zu erreichen &mdash; der Bahnplaner skaliert die Geschwindigkeiten so, dass die langsamste Bewegung das Tempo bestimmt.<br>'
                        + '&bull; <code>COUPLE(MASTER_BASE)</code> verknuepft das Slave-<code>$BASE</code> mit dem Master-TCP &mdash; bewegt sich der Master, bewegt sich das Slave-Frame mit; der Slave kann darin relativ programmierte Bahnen fahren.<br>'
                        + '<strong>Zeit-/Datenbasis:</strong> KRC4-Steuerungen tauschen ueber Ethernet (KUKAVarProxy / KLI) im IPO-Takt synchronisierte Zustands-Pakete aus. Eine PTP-Zeitsynchronisation (IEEE 1588 PTPv2) sorgt fuer Mikrosekunden-Genauigkeit zwischen den Master- und Slave-Steuerungen.<br>'
                        + 'Sicherheitsrelevant: gemeinsame Sicherheitskreise muessen nach ISO 13849 PL d / Cat. 3 ausgelegt sein; <code>SafeOperation</code> erlaubt sicheren Geschwindigkeits-/Bereichsmonitor pro Roboter.<br>'
                        + 'Quelle: KUKA.RoboTeam 2.x, Dokumentation Stand 2021.'
                },
                {
                    q: 'Welche Schutzmassnahmen sieht KSS gegen <strong>"runaway" Variablen-Schreibzugriffe</strong> aus dem Submit-Interpreter auf $\\$OUT$/$\\$FLAG$ vor, und welche Best-Practice gilt fuer die Trennung von Bewegungs- und I/O-Logik?',
                    h: 'Read-Modify-Write Race, Atomare Operationen, Flag-Hand-Shake.',
                    s: '<strong>Problem:</strong> Sowohl Hauptinterpreter als auch Submitinterpreter koennen $\\$OUT[]$, $\\$FLAG[]$ und globale Variablen schreiben. KRL bietet <em>keine</em> expliziten Mutex/Semaphor-Primitive. Eine read-modify-write Sequenz wie:'
                        + code('KRL', 'counter = counter + 1   ; Race zwischen MAIN und SUB moeglich')
                        + 'kann unter Last verlorene Inkremente produzieren.<br>'
                        + '<strong>KSS-Massnahmen:</strong><br>'
                        + '&bull; Schreibzugriff auf $\\$OUT[]$ ist auf KRL-Ebene <em>atomar pro Bit</em> (KSS 8.5+); zusammenhaengende Mehrbit-Schreibvorgaenge nicht.<br>'
                        + '&bull; Bei <code>BOOL</code>-Flags reicht ein Hand-Shake-Pattern (Producer setzt, Consumer setzt zurueck).<br>'
                        + '&bull; Bei <code>INT</code>/<code>REAL</code>-Werten: <strong>Eindeutige Schreib-Ownership</strong> &mdash; nur ein Interpreter darf eine Variable schreiben, der andere nur lesen.<br>'
                        + '<strong>Best-Practice (KUKA-Programmierhandbuch §11.3 Submitinterpreter):</strong><br>'
                        + '&bull; Bewegungslogik (PTP/LIN/CIRC) <strong>ausschliesslich</strong> im Hauptinterpreter.<br>'
                        + '&bull; I/O-Logik, Statusanzeigen, Anlagen-Heartbeat <strong>ausschliesslich</strong> im SUB-Interpreter.<br>'
                        + '&bull; Kommunikation MAIN &harr; SUB ueber dedizierte $\\$FLAG$-Bits ($MAIN_TO_SUB_*$, $SUB_TO_MAIN_*$).<br>'
                        + '&bull; Pro Anlagentakt $\\geq 1\\,\\text{ms}$ <code>WAIT SEC 0</code> im SUB, damit Bahnplaner CPU-Budget behaelt.<br>'
                        + 'Wer Hochgeschwindigkeits-Synchronisation $< 1\\,\\text{ms}$ braucht: nicht KRL/SUB sondern <code>RSI</code> oder <code>EthernetKRL</code> auf IPO-Takt $4\\,\\text{ms}$.'
                },
                {
                    q: 'Wie funktioniert <strong>kraftgeregeltes Schweissen / Schleifen</strong> ueber <code>$TORQUE_AXIS_ACT</code> ohne externen Kraftsensor? Welche Modell-Grenzen gibt es?',
                    h: 'Achsmoment-zu-TCP-Kraft-Mapping ueber Jacobi-Transponierte.',
                    s: '<strong>Konzept:</strong> die TCP-Kraft $\\mathbf{F}_{TCP}$ und das Drehmoment-Vektor an den Achsen $\\boldsymbol{\\tau}$ sind durch die <em>transponierte Jakobi-Matrix</em> verknuepft:<br>'
                        + '$$\\boldsymbol{\\tau} = \\mathbf{J}^T(\\mathbf{q}) \\cdot \\mathbf{F}_{TCP}.$$'
                        + 'Bei bekannter Pose $\\mathbf{q}$ und bekannter Achsdrehmoment-Messung laesst sich (durch Pseudo-Inverse) auf die TCP-Kraft <em>zurueckschliessen</em>:<br>'
                        + '$$\\mathbf{F}_{TCP} \\approx (\\mathbf{J}^T)^+ \\cdot (\\boldsymbol{\\tau}_\\text{gemessen} - \\boldsymbol{\\tau}_\\text{nominal}),$$'
                        + 'wobei $\\boldsymbol{\\tau}_\\text{nominal}$ das vom Bewegungs-Modell vorhergesagte Moment (Schwerkraft, Beschleunigungs-, Reib-Moment) ist. Die Differenz wird als <em>externe Kraft</em> interpretiert.<br>'
                        + '<strong>Modellgrenzen:</strong><br>'
                        + '&bull; <em>Reibungsmodell</em> ist ungenau &mdash; Coulomb-Reibung schwankt $\\pm 20\\,\\%$, gerade bei langsamer Bewegung dominant. Praktisch erreichbare Kraftaufloesung: $\\pm 20\\ldots 50\\,\\text{N}$ am TCP. Fuer feinere Kraftregelung externer 6-DOF-Kraft-Drehmoment-Sensor (z.B. ATI Mini-45) noetig: Aufloesung $\\pm 0{,}1\\,\\text{N}$.<br>'
                        + '&bull; <em>Singularitaeten</em>: in der Naehe einer Singularitaet wird $\\mathbf{J}^T$ rangmindernd &mdash; Kraftschaetzung extrem ungenau.<br>'
                        + '&bull; <em>Schwerkraft-Modell</em> muss das Werkzeug + Werkstueck-Massen kennen ($\\$LOAD$). Falsche Lastdaten &rArr; systematischer Kraftfehler.<br>'
                        + '<strong>KUKA-Realisierung:</strong> Optionspaket <em>KUKA.ForceTorqueControl</em>; KRL-Befehl <code>FT_CTRL_TASK START</code> mit Soll-Kraft und Bahnvorgabe.<br>'
                        + 'Quelle: Spong "Robot Modeling and Control" 2. Aufl. §6.4 (Jacobi); Khalil/Dombre "Modeling, Identification and Control of Robots" 2002 §11; KUKA.ForceTorqueControl 4.x Handbuch.'
                },
                {
                    q: 'Wie funktioniert das <strong>Robot Sensor Interface (RSI)</strong> auf der Ebene des XML-Objekt-Graphen, und was bedeutet "Echtzeit-Takt 4 ms"?',
                    h: 'Graphisches Daten-Flow, IPO_FAST, ST_SKIPPED.',
                    s: '<strong>RSI</strong> ist ein KUKA-Optionspaket fuer <em>Echtzeit-Sensorintegration</em>. Es basiert auf einem <em>Objekt-Graphen</em>, der als XML-Datei (<code>*.rsi</code>, <code>*.rsix</code>) im KRC abgelegt ist. Die Knoten ("RSI-Objekte") sind Funktionsbloecke (Eingang, Filter, Logik, Koordinatentransformation, Ausgang), die ueber typisierte Datenleitungen verbunden sind &mdash; aehnlich Matlab/Simulink oder LabVIEW.<br>'
                        + '<strong>Beispiel-Objekt-Graph (Kraft-Pfad-Korrektur):</strong><br>'
                        + '<code>ETHERNET_RECV(Kraft) &rarr; PT1-Filter &rarr; PID-Regler &rarr; ENA-Schalter &rarr; POS_CORR(Z)</code><br>'
                        + 'Jeder Knoten wird im Echtzeit-Takt einmal abgearbeitet. Der Takt ist <em>4 ms</em> in modernen KSS 8.x mit RSI 4.x ("IPO_FAST"), $12\\,\\text{ms}$ in alteren KSS-Versionen.<br>'
                        + '<strong>Was bedeutet "Echtzeit 4 ms" konkret?</strong><br>'
                        + '&bull; <em>Deterministisch:</em> jeder Zyklus startet exakt $4\\,\\text{ms}$ nach dem vorigen Start &mdash; Jitter $&lt; 100\\,\\mu\\text{s}$;<br>'
                        + '&bull; <em>Geschlossene Latenz</em> Sensor &rarr; Bahn-Korrektur: typ. 3 Zyklen = $12\\,\\text{ms}$ (1 Zyklus Eingang, 1 Zyklus Filter, 1 Zyklus Bahnplaner);<br>'
                        + '&bull; <em>Ueberlauf-Schutz:</em> wird ein Knoten zu langsam, wird der ganze Zyklus mit Status <code>ST_SKIPPED</code> markiert und das System geht in einen sicheren Stoppzustand &mdash; <em>keine</em> stille Datenkorruption.<br>'
                        + '<strong>Anwendungen:</strong> Reibruehrschweissen mit Kraftregelung, Vision-Bahnkorrektur (Kamera ueber EthernetKRL streamt Pixel-Korrekturen), kraftgeregelte Montage.<br>'
                        + 'Quelle: KUKA RSI 4.x Handbuch §3 Objekt-Graph; §6 Echtzeit-Verhalten.'
                },
                {
                    q: 'Was beschreibt das Variablen-Paar <strong><code>$ROBROOT</code> und <code>$ROBROOT_CAL</code></strong>? Welche Konsequenz hat eine falsche Roboter-Basis-Kalibrierung?',
                    h: 'Roboter-Welt-Koordinatensystem, Anlagenvermessung.',
                    s: '<strong><code>$ROBROOT</code></strong> ist das <em>Welt-Koordinatensystem</em> in dem der Roboter steht. <strong><code>$ROBROOT_CAL</code></strong> ist die Frame-Beziehung <em>Welt &rarr; Roboterfuss</em>, die per Anlagenvermessung (Lasertracker, Theodolit) bestimmt wird.<br>'
                        + '<strong>Bedeutung in der Anlage:</strong> mehrere Roboter, Werkzeuge, Werkstuecktraeger, Anlagen-Stuetzpunkte und CAD-Modelle koennen <em>nur</em> dann gemeinsam in einem Koordinatensystem arbeiten, wenn $\\$ROBROOT\\_CAL$ fuer jeden Roboter exakt vermessen ist. Eine 1 mm-Drift fuehrt sich durch <em>jede</em> programmierte Position fort.<br>'
                        + '<strong>Kalibrierungsverfahren:</strong> typischerweise mit Laser-Tracker (Leica AT960, FARO Vantage): drei oder mehr Reflektorkugeln werden an definierten Punkten am Roboter-Flansch angebracht; der Roboter faehrt in mehreren Posen, die Tracker-Messung liefert die Welt-Pose des Flansches; aus diesen Daten plus den intern bekannten Achsenwinkeln wird $\\$ROBROOT\\_CAL$ berechnet (Least-Squares-Fit, Aufloesung typ. $\\pm 0{,}1\\,\\text{mm}$).<br>'
                        + '<strong>Konsequenz falscher Kalibrierung:</strong><br>'
                        + '&bull; <em>Mehr-Roboter-Koordination</em> (RoboTeam) bricht zusammen &mdash; Slave folgt falscher Master-Pose;<br>'
                        + '&bull; <em>Offline-Programmierung</em> aus CAD-Daten (KUKA.OfficeLite, RoboDK) liefert verschobene Bahnen &mdash; das Werkstueck wird neben statt am Punkt geschweisst;<br>'
                        + '&bull; <em>Vision-Bahnkorrekturen</em> in Welt-Koordinaten werden auf den falschen Roboter angewendet.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §13.7 Robroot-Vermessung; DIN EN ISO 9787:2013 §7.'
                },
                {
                    q: 'Wie identifiziert man <strong>Lastdaten</strong> ($LOAD: Masse, Schwerpunkt, Traegheitstensor) eines Werkzeugs automatisch, und warum ist das so wichtig?',
                    h: 'Test-Bewegung, Drehmomentmessung, Online-Identifikation.',
                    s: '<strong>$LOAD-Struktur:</strong><br>'
                        + code('KRL', 'DECL LOAD MEINE_LAST\nMEINE_LAST.M = 15.5                       ; Masse [kg]\nMEINE_LAST.CM = {X 50, Y 0, Z 100, A 0, B 0, C 0}  ; Schwerpunkt-Position [mm]\nMEINE_LAST.J = {JX 0.5, JY 0.5, JZ 0.3}   ; Massentraegheitsmomente [kg*m^2]\n$LOAD = MEINE_LAST')
                        + '<strong>Warum so wichtig?</strong><br>'
                        + '&bull; <em>Bahnregelung</em>: die KSS-Steuerung berechnet aus $\\$LOAD$ und Bewegungs-Soll-Werten die nominellen Achsmomente. Falsche $\\$LOAD$ &rArr; falsche Vorsteuerung &rArr; Bahnabweichung, Vibration, Schleppfehler.<br>'
                        + '&bull; <em>Schwerkraft-Kompensation</em> in der Lageregelung &mdash; zu kleine $\\$LOAD$ fuehrt zu Durchhang im Stillstand.<br>'
                        + '&bull; <em>Kollisionserkennung</em> per $\\$TORQUE\\_AXIS\\_ACT$ (vgl. eigene Aufgabe) basiert auf der Vorhersage des nominellen Moments &mdash; falsche $\\$LOAD$ &rArr; falsche Erwartung &rArr; Fehlauslosung;<br>'
                        + '&bull; <em>Lebensdauer</em>: dauerhafte Ueberlast bei falscher Annahme &rArr; vorzeitige Lagerschaeden.<br>'
                        + '<strong>Automatische Identifikation</strong> ueber Funktion <code>KUKA.LoadDataDetermination</code>:<br>'
                        + '&bull; Roboter faehrt eine vorgegebene <em>Anregungs-Bahn</em> (z.B. 10 verschiedene Achsstellungen + Bewegungen);<br>'
                        + '&bull; Bei jeder Stellung wird das gemessene Achsmoment $\\boldsymbol{\\tau}_\\text{gemessen}$ aufgezeichnet;<br>'
                        + '&bull; Aus der Newton-Euler-Gleichung der Robot-Dynamik laesst sich (Least-Squares, ueberbestimmt) Massen $m$, Schwerpunkt $\\mathbf{r}_C$ und Traegheitstensor $\\mathbf{J}$ rueckwaerts schaetzen;<br>'
                        + '&bull; Aufloesung typ.: $m \\pm 0{,}1\\,\\text{kg}$, $\\mathbf{r}_C \\pm 5\\,\\text{mm}$, $\\mathbf{J} \\pm 10\\,\\%$.<br>'
                        + 'Quelle: KUKA.LoadDataDetermination 5.x Handbuch; Khalil/Dombre §11 Identification of Inertial Parameters.'
                },
                {
                    q: 'Erklaere die <strong>kollaborativen Sicherheitsfunktionen</strong> gemaess ISO/TS 15066 (Power and Force Limiting, PFL). Welche Grenzwerte gelten?',
                    h: 'Quasi-statische und transiente Kontakte, biomechanische Schwellen.',
                    s: '<strong>ISO/TS 15066:2016</strong> "Roboter und Robotik &mdash; Kollaborierende Roboter" definiert biomechanische Grenzwerte fuer den Kontakt zwischen Mensch und Roboter. <em>Power and Force Limiting (PFL)</em> ist eine der vier Schutzprinzipien (neben Hand-Guiding, Speed-Separation-Monitoring, Safety-Rated Monitored Stop).<br>'
                        + '<strong>Kontaktklassen:</strong><br>'
                        + '&bull; <em>Quasi-statischer Kontakt</em> (Einklemmen, Roboter draengt gegen Bediener gegen einen Anschlag) &mdash; Grenze: zulaessige <em>Druckkraft</em> ueber laengere Zeit.<br>'
                        + '&bull; <em>Transienter Kontakt</em> (kurzer Stoss / Kollision in freier Luft) &mdash; Grenze: zulaessige <em>Spitzenkraft + Energie</em> in $&lt; 0{,}5\\,\\text{s}$ Kontaktdauer.<br>'
                        + '<strong>Konkrete Grenzwerte (ISO/TS 15066:2016 Tab. A.2, Auswahl in N und N/cm$^2$):</strong><br>'
                        + '<table style="margin: 6px 0"><tr><th>Koerperregion</th><th>quasi-stat. Kraft</th><th>quasi-stat. Druck</th><th>transient Kraft</th></tr>'
                        + '<tr><td>Stirn</td><td>130 N</td><td>30 N/cm$^2$</td><td>175 N</td></tr>'
                        + '<tr><td>Schulter</td><td>210 N</td><td>70 N/cm$^2$</td><td>420 N</td></tr>'
                        + '<tr><td>Rueckseite Hand</td><td>140 N</td><td>140 N/cm$^2$</td><td>280 N</td></tr>'
                        + '<tr><td>Oberbauch</td><td>110 N</td><td>20 N/cm$^2$</td><td>220 N</td></tr>'
                        + '<tr><td>Oberschenkel</td><td>140 N</td><td>25 N/cm$^2$</td><td>280 N</td></tr></table>'
                        + '<strong>Implementierung:</strong> die Roboter-Steuerung schaetzt zyklisch (typ. $4\\,\\text{ms}$) aus Achsmomenten + Modell die TCP-Kraft. Wird ein Schwellwert ueberschritten, wird ein <em>safety-rated stop</em> ausgeloest. Zertifizierte Implementierungen: KUKA.SafeOperation 3.x in Verbindung mit LBR iiwa (collaborative robot).<br>'
                        + '<strong>Konsequenz fuer das Engineering:</strong> die Kontaktgeometrie (Greifer-Form, weiche Polster) ist Teil der Sicherheitsbewertung &mdash; eine scharfe Kante erreicht den Druck-Grenzwert auch bei niedriger Gesamtkraft.<br>'
                        + 'Quelle: ISO/TS 15066:2016 §5 + Anhang A; KUKA LBR iiwa Sicherheits-Konformitaetserklaerung.'
                },
                {
                    q: 'Wie wird ein <strong>Quaternionen-basierter Orientierungsregler</strong> implementiert, der die Mehrdeutigkeit der ZYX-Karden-Konvention umgeht?',
                    h: 'Einheits-Quaternion, SLERP, kontinuierliche Orientierung.',
                    s: '<strong>Problem mit ZYX-Karden:</strong> Bei $B = \\pm 90^\\circ$ tritt Gimbal-Lock auf; A und C werden mehrdeutig (eine Drehung um A ist <em>aequivalent</em> zu einer entgegengesetzten Drehung um C). Bei Interpolation zwischen zwei Orientierungen kann der KSS einen "weiteren Weg" um eine Achse waehlen als noetig &mdash; "Wrist Flip" &mdash; ein Werkzeug, das hochkant in eine Bohrung eintauchen soll, dreht sich pl&ouml;tzlich um 180&deg;.<br>'
                        + '<strong>Quaternionen:</strong> Ein <em>Einheits-Quaternion</em> $\\mathbf{q} = (w, x, y, z)$ mit $w^2 + x^2 + y^2 + z^2 = 1$ codiert eine Orientierung im 3D-Raum. Es gibt <strong>keine</strong> Singularitaeten in der Quaternionen-Darstellung &mdash; deshalb von ABB nativ verwendet, von KUKA in RSI/Spline-Bewegungen intern eingesetzt.<br>'
                        + '<strong>Konvertierung Karden &rarr; Quaternion:</strong><br>'
                        + '$$w = \\cos(A/2)\\cos(B/2)\\cos(C/2) + \\sin(A/2)\\sin(B/2)\\sin(C/2),$$'
                        + '$$x = \\cos(A/2)\\cos(B/2)\\sin(C/2) - \\sin(A/2)\\sin(B/2)\\cos(C/2),$$'
                        + '$$y = \\cos(A/2)\\sin(B/2)\\cos(C/2) + \\sin(A/2)\\cos(B/2)\\sin(C/2),$$'
                        + '$$z = \\sin(A/2)\\cos(B/2)\\cos(C/2) - \\cos(A/2)\\sin(B/2)\\sin(C/2).$$'
                        + '<strong>Interpolation per SLERP</strong> (Spherical Linear Interpolation, Shoemake 1985):<br>'
                        + '$$\\mathbf{q}(t) = \\frac{\\sin((1-t)\\Omega)}{\\sin\\Omega} \\, \\mathbf{q}_0 + \\frac{\\sin(t\\Omega)}{\\sin\\Omega} \\, \\mathbf{q}_1, \\quad t \\in [0, 1],$$'
                        + 'mit $\\cos\\Omega = \\mathbf{q}_0 \\cdot \\mathbf{q}_1$ (Skalarprodukt). SLERP bewegt sich auf einem Grosskreis der 4D-Einheits-Sphaere &mdash; <em>kuerzester</em> Drehweg, konstante Drehrate. Das verhindert Wrist-Flip und liefert eine geometrisch optimale Orientierungs-Trajektorie.<br>'
                        + '<strong>KRL/RSI-Praxis:</strong> bei kritischen Werkzeugorientierungen (z.B. Laserschweissen mit definiertem Auftreff-Winkel) wird die Bahn in <code>SPLINE...ENDSPLINE</code> programmiert; intern verwendet die Spline-Engine SLERP &mdash; explizite Quaternion-Programmierung ist auf KRL-Ebene nicht noetig (RSI-Knoten <code>QUAT_*</code> existieren aber).<br>'
                        + 'Quelle: Shoemake "Animating Rotation with Quaternion Curves" SIGGRAPH 1985; Siciliano/Khatib (Hrsg.) "Springer Handbook of Robotics" 2. Aufl. §1.3.3.'
                },
                {
                    q: 'Wie modelliert man die <strong>analytische Bahninterpolation</strong> einer LIN-Bewegung mit S-Kurven-Beschleunigungsprofil (Jerk-limited)?',
                    h: '7-Phasen-Profil, Ruck-Begrenzung, vollstaendige Differenzialgleichungen.',
                    s: 'Eine <strong>jerk-limitierte LIN-Bewegung</strong> minimiert mechanische Stoesse und Verschleiss. Das Beschleunigungs-Profil hat 7 Phasen ("S-Kurve"):<br>'
                        + '<table style="margin: 6px 0"><tr><th>Phase</th><th>Ruck $j$</th><th>Beschleunigung $a$</th><th>Geschwindigkeit $v$</th></tr>'
                        + '<tr><td>1 Anlauf</td><td>$+j_\\text{max}$</td><td>$0 \\to a_\\text{max}$</td><td>steigt parabolisch</td></tr>'
                        + '<tr><td>2 Const-$a$</td><td>0</td><td>$a_\\text{max}$</td><td>steigt linear</td></tr>'
                        + '<tr><td>3 Abbau</td><td>$-j_\\text{max}$</td><td>$a_\\text{max} \\to 0$</td><td>$\\to v_\\text{max}$</td></tr>'
                        + '<tr><td>4 Const-$v$</td><td>0</td><td>0</td><td>$v_\\text{max}$</td></tr>'
                        + '<tr><td>5 Bremsanlauf</td><td>$-j_\\text{max}$</td><td>$0 \\to -a_\\text{max}$</td><td>sinkt parabolisch</td></tr>'
                        + '<tr><td>6 Const-Brems</td><td>0</td><td>$-a_\\text{max}$</td><td>sinkt linear</td></tr>'
                        + '<tr><td>7 Bremsabbau</td><td>$+j_\\text{max}$</td><td>$-a_\\text{max} \\to 0$</td><td>$\\to 0$</td></tr></table>'
                        + '<strong>Mathematik (Phase 1, Anlauf-S-Kurve):</strong><br>'
                        + '$$j(t) = j_\\text{max},\\;\\; a(t) = j_\\text{max}\\,t,\\;\\; v(t) = \\tfrac12 j_\\text{max}\\,t^2,\\;\\; s(t) = \\tfrac16 j_\\text{max}\\,t^3.$$'
                        + 'Bei $t = t_1 = a_\\text{max}/j_\\text{max}$ ist $a$ maximal &rarr; Phase 2.<br>'
                        + '<strong>Dauer der Bewegungsphasen:</strong><br>'
                        + '&bull; $t_1 = t_3 = t_5 = t_7 = a_\\text{max}/j_\\text{max}$ (Ruck-Phasen);<br>'
                        + '&bull; $t_2 = t_6 = (v_\\text{max} - v_1)/a_\\text{max} = (v_\\text{max}/a_\\text{max}) - (a_\\text{max}/j_\\text{max})$ (Konst-$a$-Phasen, nur wenn $v_\\text{max}$ erreichbar);<br>'
                        + '&bull; $t_4$ aus Reststrecke.<br>'
                        + 'Wenn die Bewegungsstrecke kurz ist, entfaellt Phase 4 (Trapez-) oder zusaetzlich Phase 2+6 (Dreieck-S-Kurve) &mdash; <em>fall case</em>.<br>'
                        + '<strong>KSS-Implementation:</strong> $\\$ACC\\_CP$ ist $a_\\text{max}$, $\\$JERK\\_CP$ (in m/s$^3$, intern verwaltet) ist $j_\\text{max}$. Default-Werte: $a_\\text{max} = 2{,}3\\,\\text{m/s}^2$, $j_\\text{max} \\sim 50\\,\\text{m/s}^3$. Diese Profile sind im KSS-Pfadinterpolator implementiert &mdash; KRL-Programmierer aendert nur $\\$ACC$ und $\\$VEL$.<br>'
                        + 'Quelle: Khalil/Dombre "Modeling, Identification and Control of Robots" 2002 §13.3; Lloyd/Hayward "Trajectory Generation for Sensor-Driven and Time-Varying Tasks" Int. J. Robotics Res. 1993.'
                },
                {
                    q: 'Was unterscheidet die <strong>absolute Genauigkeit</strong> von der <strong>Wiederholgenauigkeit</strong> eines Knickarm-Industrieroboters? Mit welchen Werten muss man rechnen?',
                    h: 'Kalibrierter Modellfehler vs. Pose-Reproduzierbarkeit.',
                    s: '<strong>Wiederholgenauigkeit (Repeatability, ISO 9283:1998 §7.2.4):</strong> der Roboter fuehrt mehrfach <em>dieselbe</em> programmierte Pose an. Die Standardabweichung der gemessenen TCP-Positionen ist die Wiederholgenauigkeit $RP$. Typische Werte:<br>'
                        + '&bull; KUKA KR 6 R900: $RP \\leq 0{,}03\\,\\text{mm}$;<br>'
                        + '&bull; KUKA KR 60 HA (High-Accuracy): $RP \\leq 0{,}05\\,\\text{mm}$;<br>'
                        + '&bull; KUKA KR 1000 titan (Schwerlast): $RP \\leq 0{,}10\\,\\text{mm}$.<br>'
                        + 'Wiederholgenauigkeit ist <em>hoch</em>, weil die Servomotoren mit Encodern $0{,}001^\\circ$-Aufloesung haben und das Spielspiel der Getriebe (Cycloid, Harmonic Drive) gut reproduzierbar ist.<br>'
                        + '<strong>Absolute Genauigkeit (Accuracy, ISO 9283:1998 §7.2.2):</strong> der Roboter wird auf eine <em>programmierte kartesische Pose</em> kommandiert. Die Abweichung der real erreichten Pose von der programmierten ist die absolute Genauigkeit $AP$. Typische Werte (<em>ohne</em> Modell-Kalibrierung):<br>'
                        + '&bull; Standard-Roboter: $AP = 1\\ldots 3\\,\\text{mm}$;<br>'
                        + '&bull; Schwerlast-Roboter: $AP = 3\\ldots 8\\,\\text{mm}$ (Eigengewicht-Verformung).<br>'
                        + 'Mit Modell-Kalibrierung (Lasertracker, $\\sim 200$ Posen, Identifikation von Achs-Offsets, Getriebe-Elastizitaeten, Werkzeug-Verformung) laesst sich $AP \\leq 0{,}3\\,\\text{mm}$ erreichen.<br>'
                        + '<strong>Fehlerquellen Absolut-Genauigkeit:</strong><br>'
                        + '&bull; <em>Achs-Offsets</em> (Nullpunkt-Drift der Encoder);<br>'
                        + '&bull; <em>Glied-Laengen</em> (Toleranzen $\\pm 0{,}1\\,\\text{mm}$ in Roboter-Geometrie);<br>'
                        + '&bull; <em>Getriebe-Elastizitaeten</em> (Lastabhaengig);<br>'
                        + '&bull; <em>Thermische Drift</em> (Achsmotoren erwaermen sich &mdash; $1\\,\\text{mm}$ Drift bei $\\Delta T = 30\\,\\text{K}$ ueblich);<br>'
                        + '&bull; <em>Werkzeug-Bias</em>.<br>'
                        + '<strong>Konsequenz fuer die Programmierung:</strong> Bahnen, die geteacht wurden (Roboter im T1-Modus an die Pose gefahren), erreichen <em>Wiederholgenauigkeit</em>. Bahnen, die <em>offline</em> aus CAD-Daten programmiert wurden, erreichen nur die absolute Genauigkeit. Daher in der Praxis: Schluesselpunkte teachen, Zwischenpunkte interpolieren.<br>'
                        + 'Quelle: DIN EN ISO 9283:1998 "Industrieroboter &mdash; Leistungskenngroessen und ihre zugehoerigen Pruefverfahren".'
                },
                {
                    q: 'Wie erkennt man eine <strong>Kollision per Drehmoment-Residuum</strong> ohne externen Kraftsensor? Welche mathematischen Schritte sind noetig?',
                    h: 'Residual-Observer, Generalized Momentum, dynamisches Modell.',
                    s: '<strong>Konzept Generalized Momentum Observer</strong> (De Luca/Mattone 2003): die externe Kraft auf den Roboter wird ohne Zugriff auf die Beschleunigungs-Messung geschaetzt (numerisches Ableiten waere zu rauschig), indem ein <em>generalisierter Impuls</em> $\\mathbf{p}$ beobachtet wird:<br>'
                        + '$$\\mathbf{p} = \\mathbf{M}(\\mathbf{q})\\,\\dot{\\mathbf{q}},$$'
                        + 'mit Massentraegheits-Matrix $\\mathbf{M}(\\mathbf{q})$. Aus der Bewegungsgleichung des Roboters folgt:<br>'
                        + '$$\\dot{\\mathbf{p}} = \\boldsymbol{\\tau}_\\text{motor} + \\mathbf{g}(\\mathbf{q}) + \\mathbf{C}^T(\\mathbf{q}, \\dot{\\mathbf{q}})\\,\\dot{\\mathbf{q}} - \\boldsymbol{\\tau}_\\text{friction} + \\boldsymbol{\\tau}_\\text{ext},$$'
                        + 'wobei alle Modelltermini bekannt sind ausser $\\boldsymbol{\\tau}_\\text{ext}$ (das gesuchte externe Drehmoment-Vektor). Der Beobachter integriert die bekannten Anteile und vergleicht mit dem gemessenen Impuls:<br>'
                        + '$$\\boldsymbol{\\hat{\\tau}}_\\text{ext} = \\mathbf{K} \\cdot \\left(\\mathbf{p}_\\text{mess} - \\hat{\\mathbf{p}}_\\text{modell}\\right).$$'
                        + '$\\mathbf{K}$ ist eine diagonale Beobachter-Verstaerkung; typische Werte $\\mathbf{K} \\in 20\\ldots 50$.<br>'
                        + '<strong>Schritte praktisch:</strong><br>'
                        + '1. <em>Modell:</em> $\\mathbf{M}, \\mathbf{C}, \\mathbf{g}, \\boldsymbol{\\tau}_\\text{friction}$ aus dem dynamischen Roboter-Modell (DH-Parameter + Lastdaten + Reibungs-Identifikation);<br>'
                        + '2. <em>Erwartetes Drehmoment</em>: $\\boldsymbol{\\tau}_\\text{nominal} = \\mathbf{M}\\ddot{\\mathbf{q}} + \\mathbf{C}\\dot{\\mathbf{q}} + \\mathbf{g} + \\boldsymbol{\\tau}_\\text{friction}$;<br>'
                        + '3. <em>Residuum</em>: $\\mathbf{r} = \\boldsymbol{\\tau}_\\text{motor,gemessen} - \\boldsymbol{\\tau}_\\text{nominal}$;<br>'
                        + '4. <em>Filterung</em>: $\\mathbf{r}$ wird ueber PT1- oder Kalman-Filter geglaettet (Reibungs-Modell-Rest).<br>'
                        + '5. <em>Schwellwert-Pruefung</em>: $|\\mathbf{r}_i| &gt; T_i$ &rArr; Kollision an Achse $i$.<br>'
                        + '<strong>Praxis-Aufloesung:</strong> Kollisionserkennung-Latenz $\\sim 20\\,\\text{ms}$ (RSI-Takt), Schwellwert typ. $5\\,\\%$ des Achsmoments &mdash; bei einem KR 60 entspricht das $\\sim 50\\,\\text{N}$ TCP-Kraft fuer eine seitliche Kollision.<br>'
                        + 'Quelle: De Luca/Mattone "Sensorless Robot Collision Detection and Hybrid Force/Motion Control" ICRA 2005; KUKA.SafeOperation 3.x Implementierungs-Beschreibung.'
                },
                {
                    q: 'Wie funktioniert <strong>EthernetKRL</strong> fuer hochfrequente externe Datenkanaele (z.B. Vision-System, externe SPS), und was sind seine Grenzen?',
                    h: 'XML-konfigurierter UDP/TCP-Stream, IPO-Takt-Integration.',
                    s: '<strong>EthernetKRL</strong> ist die KUKA-Schnittstelle, die einen <em>generischen Ethernet-Kanal</em> zwischen externer Applikation und KRL-Programm bzw. RSI-Objektgraph bereitstellt. Im Gegensatz zu klassischen Feldbussen (ProfiNet, EtherCAT) ist EthernetKRL nicht safety-rated und nicht streng deterministisch &mdash; aber flexibler.<br>'
                        + '<strong>Konfiguration:</strong> Ein XML-Schema in <code>EthernetKRL/RoboterID_Sensor.xml</code> definiert den Daten-Stream:<br>'
                        + code('XML', '<ETHERNETKRLXML>\n  <CONFIGURATION>\n    <EXTERNAL>\n      <TYPE>Dummy</TYPE>\n      <IP>192.168.1.100</IP>\n      <PORT>49152</PORT>\n      <PROTOCOL>UDP</PROTOCOL>\n      <ELEMENTS>\n        <ELEMENT TAG="Position.X" TYPE="REAL"/>\n        <ELEMENT TAG="Position.Y" TYPE="REAL"/>\n        <ELEMENT TAG="Trigger" TYPE="BOOL"/>\n      </ELEMENTS>\n    </EXTERNAL>\n  </CONFIGURATION>\n</ETHERNETKRLXML>')
                        + '<strong>KRL-Zugriff:</strong><br>'
                        + code('KRL', 'EKI_INIT("MeinSensor")              ; Schnittstelle initialisieren\nEKI_OPEN("MeinSensor")               ; Verbindung aufbauen\nDECL REAL POS_X\nEKI_GETREAL("MeinSensor", "Position.X", POS_X)\nMSG "Sensor X = " + POS_X\nEKI_CLOSE("MeinSensor")')
                        + '<strong>Grenzen:</strong><br>'
                        + '&bull; <em>Latenz:</em> typ. $4\\ldots 20\\,\\text{ms}$ je nach Netz-Auslastung &mdash; nicht echtzeit-deterministisch im strengen Sinn;<br>'
                        + '&bull; <em>Datenrate:</em> bis $\\sim 1000\\,\\text{Telegramme/s}$ stabil moeglich; darueber verlieren UDP-Pakete (kein Reasse-Mechanismus);<br>'
                        + '&bull; <em>Nicht sicherheits-zertifiziert</em> &mdash; fuer safety-kritische Daten (z.B. Schutzraum-Verlassen-Signal) <em>nicht</em> verwendbar; dafuer PROFIsafe oder FSoE;<br>'
                        + '&bull; <em>Pro-Verbindung-Limit:</em> max. 32 gleichzeitige EKI-Kanaele.<br>'
                        + 'Praxis-Anwendung: Vision-Daten vom Kameracontroller (Cognex, SICK Inspector), Datalogger-Anbindung, externes Werkzeugmanagement.<br>'
                        + 'Quelle: KUKA EthernetKRL 3.x Handbuch §3 XML-Konfiguration, §5 KRL-API.'
                },
                {
                    q: 'Was ist eine <strong>Singularitaeten-Robustheits-Strategie</strong> ueber gedaempfte Pseudoinverse (Damped Least-Squares, DLS)? Mathematische Formulierung.',
                    h: 'Levenberg-Marquardt fuer inverse Kinematik, Daempfungsfaktor.',
                    s: '<strong>Problem:</strong> klassische inverse Kinematik fuer eine LIN-Bewegung verlangt $\\dot{\\mathbf{q}} = \\mathbf{J}^{-1}\\dot{\\mathbf{x}}$. In Singularitaeten wird $\\mathbf{J}$ singulaer, $\\mathbf{J}^{-1}$ explodiert &rArr; Achsgeschwindigkeiten gehen gegen unendlich.<br>'
                        + '<strong>DLS-Loesung (Wampler 1986; Nakamura/Hanafusa 1986):</strong> statt der echten Inverse wird die <em>gedaempfte Pseudoinverse</em> verwendet:<br>'
                        + '$$\\dot{\\mathbf{q}} = \\mathbf{J}^T \\left(\\mathbf{J}\\mathbf{J}^T + \\lambda^2 \\mathbf{I}\\right)^{-1} \\dot{\\mathbf{x}}.$$'
                        + '$\\lambda &gt; 0$ ist der <em>Daempfungsfaktor</em> &mdash; eine kleine positive Konstante, die das System der linearen Gleichungen "weichmacht":<br>'
                        + '&bull; Bei <em>nicht-singulaeren</em> Konfigurationen ist $\\lambda \\ll \\sigma_\\text{min}(\\mathbf{J})$ (kleinster singulaerer Wert von $\\mathbf{J}$) &mdash; die Loesung weicht <em>kaum</em> von der exakten Pseudoinverse ab;<br>'
                        + '&bull; In <em>Singularitaeten</em> verhindert $\\lambda$ die Divergenz der inversen Matrix &mdash; die Loesung opfert exakte Bahnverfolgung gegen <em>endliche</em> Achsgeschwindigkeiten.<br>'
                        + '<strong>Adaptive Daempfung</strong> (Maciejewski 1990): $\\lambda$ wird abhaengig vom kleinsten singulaeren Wert $\\sigma_\\text{min}$ gewaehlt:<br>'
                        + '$$\\lambda^2 = \\begin{cases} 0 & \\sigma_\\text{min} \\geq \\sigma_\\text{thres} \\\\ \\lambda_0^2 \\cdot (1 - \\sigma_\\text{min}/\\sigma_\\text{thres})^2 & \\sigma_\\text{min} &lt; \\sigma_\\text{thres} \\end{cases}.$$'
                        + 'Typische Werte: $\\sigma_\\text{thres} = 0{,}05\\,\\text{rad/s}$, $\\lambda_0 = 0{,}02$.<br>'
                        + '<strong>Konsequenz fuer die Bahn:</strong> in der Singularitaet weicht die tatsaechliche Bahn von der programmierten ab &mdash; das ist im Maschinenbau akzeptabel, weil sonst der Bewegungssatz mit "Bahnabweichung nicht moeglich" abgebrochen werden muesste. Der KSS implementiert DLS implizit in den Bahninterpolator (<code>SPL</code>-Splines, RSI-Korrekturen). Bei klassischen <code>LIN</code> ohne Spline ist die Reaktion strikter &mdash; das Programm bricht ab, wenn der Geschwindigkeits-Korrekturfaktor zu klein wuerde.<br>'
                        + 'Quelle: Wampler "Manipulator Inverse Kinematic Solutions Based on Vector Formulations and Damped Least-Squares Methods" IEEE SMC 1986; Siciliano/Khatib (Hrsg.) "Springer Handbook of Robotics" 2. Aufl. §3.5.'
                },
                {
                    q: 'Wie wird ein <strong>RoboTeam-Synchron-Master-Slave</strong> mathematisch koordiniert, wenn der Slave eine Bahnkorrektur am Master-Werkstueck ausfuehren soll?',
                    h: 'Frame-Verkettung, Echtzeit-Master-Pose, Sensor-Delay-Korrektur.',
                    s: '<strong>Setup:</strong> Master haelt ein Werkstueck und bewegt es. Slave hat einen Schweissbrenner und soll relativ zum bewegten Werkstueck eine Naht schweissen.<br>'
                        + '<strong>Mathematik:</strong> Im Welt-Koordinatensystem gilt:<br>'
                        + '$$\\mathbf{T}_\\text{Slave-TCP, Welt}(t) = \\mathbf{T}_\\text{Master-TCP, Welt}(t) \\cdot \\mathbf{T}_\\text{Workpiece, Master-TCP} \\cdot \\mathbf{T}_\\text{Seam, Workpiece}.$$'
                        + 'Hier ist:<br>'
                        + '&bull; $\\mathbf{T}_\\text{Master-TCP, Welt}(t)$ &mdash; die zeitvariante Pose des Master-TCP (zyklisch ueber RoboTeam-Bus uebertragen);<br>'
                        + '&bull; $\\mathbf{T}_\\text{Workpiece, Master-TCP}$ &mdash; statische Aufnahme-Frame (Werkstueck im Greifer fest);<br>'
                        + '&bull; $\\mathbf{T}_\\text{Seam, Workpiece}$ &mdash; die programmierte Naht-Trajektorie auf dem Werkstueck (offline aus CAD).<br>'
                        + 'Der Slave-Controller berechnet daraus zyklisch (IPO-Takt $4\\,\\text{ms}$) seine eigene TCP-Soll-Pose und faehrt sie ueber inverse Kinematik an.<br>'
                        + '<strong>Sensor-Delay-Korrektur:</strong> der RoboTeam-Bus liefert die Master-Pose mit einer Latenz $\\Delta t \\approx 4\\ldots 12\\,\\text{ms}$. In dieser Zeit hat sich der Master weiterbewegt. Korrektur durch <em>lineare Praediktion</em>:<br>'
                        + '$$\\hat{\\mathbf{T}}_\\text{Master, jetzt} \\approx \\mathbf{T}_\\text{Master, gemessen} + \\Delta t \\cdot \\dot{\\mathbf{T}}_\\text{Master, gemessen}.$$'
                        + 'Bei rein translatorischer Master-Bewegung: $\\hat{\\mathbf{p}} = \\mathbf{p}_\\text{gemessen} + \\Delta t \\cdot \\mathbf{v}_\\text{gemessen}$. Bei Rotation: Quaternion-Praediktion ueber Winkelgeschwindigkeit.<br>'
                        + '<strong>Stabilitaet:</strong> der Slave-Regler darf nicht steifer sein als die Master-Geschwindigkeitsdynamik &mdash; sonst entstehen Oszillationen. Typische Verstaerkung: $K_p \\leq 1/(2 \\Delta t) = 1/(2 \\cdot 12\\,\\text{ms}) \\approx 40\\,\\text{rad/s}$ Bandbreite.<br>'
                        + '<strong>Wenn das System divergiert:</strong> sicheres Fallback ist ein <em>Geschwindigkeits-Limit</em> &mdash; bei zu grosser Slave-Korrektur wird die Master-Bewegung automatisch verlangsamt (RoboTeam-Synchron-Stopp).<br>'
                        + 'Quelle: KUKA RoboTeam Handbuch §5 Mathematische Modellierung; Astrom/Wittenmark "Computer-Controlled Systems" 3. Aufl. §7 (Sample-Delay-Effekte).'
                },
                {
                    q: 'Erklaere den <strong>Stossausgleich</strong> bei einer ploetzlichen Bewegungsumlenkung in der KUKA-Bahnplanung (S-Kurven-Profil im 3D-Raum).',
                    h: 'Bahnumlenkung, vektorielle Beschleunigungs-Begrenzung, Daempfung.',
                    s: '<strong>Problem:</strong> bei einer Bahnumlenkung (z.B. 90&deg;-Knick in einer LIN-LIN-Folge mit C_DIS-Annaeherung) muss der Roboter den TCP von einer Geschwindigkeitsrichtung $\\mathbf{v}_1$ zu einer anderen Geschwindigkeitsrichtung $\\mathbf{v}_2$ ueberfuehren &mdash; idealerweise ohne abrupten Stoss.<br>'
                        + '<strong>Bahnplanung:</strong> der KSS-Bahnplaner uberlagert die beiden LIN-Saetze in einem <em>Annaeherungs-Bereich</em>, in dem die TCP-Geschwindigkeit eine Spline-Kurve beschreibt &mdash; aus dem Auslauf von Bahn 1 wird stetig in den Anlauf von Bahn 2 ueberblendet:<br>'
                        + '$$\\mathbf{v}_\\text{Mix}(t) = (1 - \\alpha(t)) \\cdot \\mathbf{v}_1 + \\alpha(t) \\cdot \\mathbf{v}_2, \\quad \\alpha(t) \\in [0, 1] \\text{ glatte S-Kurve}.$$'
                        + 'Die <em>vektorielle Beschleunigung</em> ist:<br>'
                        + '$$\\mathbf{a}(t) = \\dot{\\alpha}(t) \\cdot (\\mathbf{v}_2 - \\mathbf{v}_1).$$'
                        + 'Bei einer 90&deg;-Umlenkung mit $|\\mathbf{v}_1| = |\\mathbf{v}_2| = v$ ist $|\\mathbf{v}_2 - \\mathbf{v}_1| = v \\sqrt{2}$. Der maximale Beschleunigungsbetrag $|\\mathbf{a}|_\\text{max} = v\\sqrt{2} \\cdot \\dot{\\alpha}_\\text{max}$.<br>'
                        + '<strong>Limit:</strong> $|\\mathbf{a}|_\\text{max} \\leq a_\\text{max}$ ($\\$ACC\\_CP$) muss respektiert werden. Bei zu hoher Eintritts-Geschwindigkeit reduziert der Bahnplaner $v$ automatisch &mdash; der TCP wird vor der Umlenkung verlangsamt, danach wieder beschleunigt. Bei <code>C_VEL</code>-Modus wird das ueber den CVEL-Wert (%) gesteuert.<br>'
                        + '<strong>Ruck-Begrenzung:</strong> zusaetzlich limitiert der Bahnplaner $\\dot{\\mathbf{a}}$ ueber $\\$JERK\\_CP$ &mdash; der Beschleunigungs-Anstieg in der Umlenkung wird auf $j_\\text{max} \\approx 50\\,\\text{m/s}^3$ begrenzt; ergibt die typische <em>S-Kurven</em>-Annaeherung.<br>'
                        + '<strong>Praktische Folge:</strong> wer eine 90&deg;-Umlenkung mit hoher Bahn-Geschwindigkeit programmiert, sieht im Echtbetrieb den TCP <em>vor</em> der Ecke abbremsen. Das ist physikalisch unvermeidbar. Workaround: Annaeherungs-Radius $\\$APO.CDIS$ vergroessern, sodass die Umlenkung ueber einen laengeren Bahn-Bereich verteilt wird.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §11.5 Bahnumlenkung; Lloyd/Hayward Int. J. Robotics Res. 1993 §4.'
                },
                {
                    q: 'Wie ist die <strong>SafeOperation</strong> (KSS-Erweiterungs-Paket) gemaess EN ISO 13849-1 Kategorie 3 PL d realisiert? Welche Funktionen bietet es?',
                    h: 'Sichere Achsueberwachung, Schutzraeume, Stand-Still-Monitoring.',
                    s: '<strong>KUKA SafeOperation</strong> ist ein zertifiziertes Sicherheits-Optionspaket fuer den KUKA-Controller (KRC4, KRC5), das die folgenden sicherheitsgerichteten Funktionen bereitstellt &mdash; alle nach <em>EN ISO 13849-1 Kategorie 3, Performance Level d</em>:<br>'
                        + '&bull; <em>Safe Stop 1 (SS1)</em> &mdash; kontrolliertes Stillsetzen mit rampengefuehrtem Bremsen; nach max. 1 s sind die Antriebe abgeschaltet.<br>'
                        + '&bull; <em>Safe Stop 2 (SS2)</em> &mdash; Stillsetzen ohne Abschalten der Antriebe (Regler bleibt aktiv);<br>'
                        + '&bull; <em>Safely Limited Speed (SLS)</em> &mdash; achs- und kartesisch begrenzte Geschwindigkeit (zertifiziert);<br>'
                        + '&bull; <em>Safe Operating Stop (SOS)</em> &mdash; geregelter Stillstand mit Drehmomenten-Erhaltung gegen aeussere Kraefte;<br>'
                        + '&bull; <em>Sichere Schutzraeume</em> (Schutzkubus, Schutzzylinder, freie Polygon-Definition) mit Toleranzueberwachung;<br>'
                        + '&bull; <em>Sichere Tool/Base-Vermessung</em> &mdash; mehrfach-Pruefung mit Trip-Mode.<br>'
                        + '<strong>Architektur (Kategorie 3 PL d):</strong> zwei <em>diversitaere</em> Kanaele berechnen unabhaengig:<br>'
                        + '&bull; <em>Kanal 1:</em> Standard-KRC-Bewegungs-Steuerung (Pose, Geschwindigkeit, Drehmoment) &mdash; ueberwacht die kommandierte Bahn;<br>'
                        + '&bull; <em>Kanal 2:</em> Safety-Controller (FPGA-basiert, eigene Firmware) &mdash; berechnet aus den unabhaengig redundant gemessenen Achs-Positionen via doppeltem Encoder (Singleturn + Multiturn) die Welt-Pose und prueft sie gegen die definierten Schutzraum-Grenzen.<br>'
                        + 'Bei Abweichung zwischen Kanal 1 und Kanal 2 &gt; Toleranz &rArr; SS1.<br>'
                        + '<strong>Zertifizierung:</strong> bestaetigt durch TUEV / BIA. PFH $&lt; 10^{-6}\\,\\text{h}^{-1}$, MTTFd $\\geq 100$ Jahre &mdash; entspricht PL d nach EN ISO 13849-1:2015.<br>'
                        + '<strong>Programmierung:</strong> SafeOperation wird ueber WorkVisual (separater Safety-Konfigurations-Editor) gepflegt; KRL-Programme sehen die Schutzraeume nicht direkt &mdash; sie werden vom Safety-Controller hardware-rueckwirkend durchgesetzt.<br>'
                        + 'Quelle: EN ISO 13849-1:2015 §6.2; KUKA SafeOperation 4.x Sicherheits-Konformitaetserklaerung (TUEV-zertifiziert).'
                },
                {
                    q: 'Wie ist die <strong>analytische inverse Kinematik</strong> eines 6-Achs-Knickarm-Roboters mit sphaerischer Handwurzel strukturiert ("Pieper-Loesung")?',
                    h: 'Position-Orientierung-Entkopplung, geschlossene Loesung.',
                    s: '<strong>Pieper-Bedingung (1968):</strong> ein 6-Achs-Knickarm hat <em>geschlossene</em> inverse Kinematik genau dann, wenn die letzten drei Achsen einen <em>sphaerischen Handgelenk-Punkt</em> bilden &mdash; d.h. die drei Achsen schneiden sich in einem Punkt $W$ (dem "wrist center"). Diese Bedingung erfuellen praktisch alle Industrieroboter (KUKA, ABB, FANUC, Stäubli, Yaskawa).<br>'
                        + '<strong>Loesungs-Strategie (Entkopplung):</strong><br>'
                        + '<strong>1. Wrist-Center-Berechnung:</strong> aus der gewuenschten TCP-Pose $\\mathbf{T}_\\text{TCP}$ und der Werkzeuglaenge $d_6$:<br>'
                        + '$$\\mathbf{p}_W = \\mathbf{p}_\\text{TCP} - d_6 \\cdot \\mathbf{R}_\\text{TCP} \\cdot \\hat{\\mathbf{z}}.$$'
                        + 'Der Wrist-Center liegt $d_6$ entfernt entlang der TCP-z-Achse.<br>'
                        + '<strong>2. Achsen 1-3 (Positionierung des Wrist-Center):</strong><br>'
                        + 'A1 aus Atan2 der xy-Komponenten von $\\mathbf{p}_W$:<br>'
                        + '$$A1 = \\operatorname{atan2}(p_{W,y}, p_{W,x}).$$'
                        + 'A2, A3 aus Cosinus-Satz im Dreieck (Schulter-Ellenbogen-Wrist):<br>'
                        + '$$\\cos(A3) = \\frac{r^2 + z^2 - a_2^2 - d_4^2}{2 a_2 d_4}, \\quad A2 = \\operatorname{atan2}(z, r) - \\operatorname{atan2}(d_4 \\sin A3, a_2 + d_4 \\cos A3),$$'
                        + 'mit $r = \\sqrt{p_{W,x}^2 + p_{W,y}^2}$, $z = p_{W,z} - d_1$. Es gibt typisch 2 Loesungen (Ellenbogen oben/unten) &times; 2 (Schulter rechts/links) = 4 Konfigurationen.<br>'
                        + '<strong>3. Achsen 4-6 (Orientierung):</strong> aus der gewuenschten TCP-Orientierung $\\mathbf{R}_\\text{TCP}$ und der bereits berechneten Orientierung $\\mathbf{R}_{0\\to3}$ (Achsen 1-3) folgt:<br>'
                        + '$$\\mathbf{R}_{3\\to6} = \\mathbf{R}_{0\\to3}^T \\cdot \\mathbf{R}_\\text{TCP}.$$'
                        + 'A4, A5, A6 werden aus $\\mathbf{R}_{3\\to6}$ als ZYZ-Karden-Winkel extrahiert &mdash; geschlossene Formeln, jedoch <em>zwei</em> Loesungen je nach Vorzeichen von $A5$ (Hand-Flip-Vorzeichen).<br>'
                        + '<strong>Gesamt: 8 Konfigurationen</strong> (siehe Status/Turn-Bits Aufgabe in L1). Die Konfiguration wird ueber die Status- und Turn-Bits selektiert.<br>'
                        + '<strong>Bedeutung in der KSS-Implementation:</strong> der KSS-Inverse-Kinematik-Loeser ist eine optimierte C-Implementierung der Pieper-Formeln. Bei <code>PTP</code>-Bewegung wird die Konfiguration aus S/T-Bits der Ziel-POS gewaehlt; bei <code>LIN/CIRC</code> behaelt der Loeser die initiale Konfiguration bei und schaltet bei einem ConfigMon-Verstoss ab.<br>'
                        + 'Quelle: Pieper "The Kinematics of Manipulators Under Computer Control" Dissertation Stanford 1968; Spong "Robot Modeling and Control" 2. Aufl. §4.4; Siciliano/Khatib (Hrsg.) "Springer Handbook of Robotics" 2. Aufl. §1.5.'
                },
                {
                    q: 'Wie funktioniert die <strong>Schwerkraft-Kompensation</strong> einer Werkstueck-Last in einem 6-Achs-Roboter, und welcher Beitrag steckt im Drehmoment der jeweiligen Achse?',
                    h: 'Newton-Euler-Rueckwaertsrekursion, achsweise Schwerkraftmoment.',
                    s: '<strong>Problem:</strong> jede Achse muss <em>im Stillstand</em> ein Drehmoment aufbringen, das das Gewicht aller distalen Glieder (inklusive Werkzeug und Werkstueck) gegen die Schwerkraft haelt &mdash; sonst sackt der Roboter ab.<br>'
                        + '<strong>Berechnung per Newton-Euler-Rueckwaertsrekursion:</strong> beginnend am Werkzeug, ruecklaeufig Richtung Sockel:<br>'
                        + 'Fuer jedes Glied $i$ (Masse $m_i$, Schwerpunkt $\\mathbf{r}_{C,i}$ im Welt-System, distale Kraefte/Momente $\\mathbf{f}_{i+1}, \\boldsymbol{\\tau}_{i+1}$ aus dem naechstdistalen Glied):<br>'
                        + '$$\\mathbf{f}_i = \\mathbf{f}_{i+1} + m_i \\mathbf{g},$$'
                        + '$$\\boldsymbol{\\tau}_i = \\boldsymbol{\\tau}_{i+1} + \\mathbf{r}_{i, C_i} \\times m_i \\mathbf{g} + \\mathbf{r}_{i, i+1} \\times \\mathbf{f}_{i+1}.$$'
                        + 'Die Achs-Komponente $\\tau_i \\cdot \\hat{\\mathbf{z}}_i$ (Projektion auf die Achsenrichtung) ist das <em>achsmotorseitige Halte-Drehmoment</em>, das die Achse aufbringen muss.<br>'
                        + '<strong>Konkrete Beitraege bei einer typischen Pose (Arm waagrecht ausgestreckt, 50 kg Last am TCP, Schwerpunkt 200 mm vor Flansch):</strong><br>'
                        + '&bull; <em>A6 (Werkzeug-Drehachse):</em> $\\tau_6 = 0$ (Last in der Achse von A6 zentriert) &mdash; trivial.<br>'
                        + '&bull; <em>A5 (Hand-Beugung):</em> $\\tau_5 = m \\cdot g \\cdot r_\\text{TCP} = 50 \\cdot 9{,}81 \\cdot 0{,}2 \\approx 98\\,\\text{Nm}$. Plus alle Werkzeuge.<br>'
                        + '&bull; <em>A4 (Hand-Drehachse):</em> $\\tau_4 \\approx 0$ (Achse parallel zur Schwerkraft) &mdash; trivial.<br>'
                        + '&bull; <em>A3 (Ellenbogen):</em> $\\tau_3 = m \\cdot g \\cdot (L_\\text{Unterarm} + r_\\text{TCP}) \\approx 50 \\cdot 9{,}81 \\cdot 0{,}9 \\approx 442\\,\\text{Nm}$. Plus Eigengewicht Unterarm.<br>'
                        + '&bull; <em>A2 (Schulter):</em> $\\tau_2 = $ Summe aller Massen $\\times$ Hebelarme. Bei einem KR 60 R2100 in voller Ausladung typ. $1500\\ldots 2000\\,\\text{Nm}$ &mdash; dimensionierungstreibend fuer das Schultergetriebe.<br>'
                        + '&bull; <em>A1 (Drehachse senkrecht):</em> $\\tau_1 \\approx 0$ bei symmetrischer Pose &mdash; bei seitlicher Ausladung (TCP weit "neben" dem Sockel) entsteht ein zusaetzliches Kippmoment, das aber meist von Schwerlinealen der Schulterachse aufgenommen wird.<br>'
                        + '<strong>KSS-Implementation:</strong> die Schwerkraft-Kompensation ist Bestandteil der Vorsteuerung &mdash; das vom $\\$LOAD$-Modell berechnete Halte-Drehmoment wird zum vom Regler kommandierten Beschleunigungs-Moment addiert, sodass die Stoerung durch die Schwerkraft bereits am Eingang des Motorreglers ausgeglichen wird. Daher: <em>korrekte $\\$LOAD$ ist die zentrale Voraussetzung fuer gute Bahnqualitaet</em> &mdash; ohne sie wuerde der Lageregler im Stillstand kraeftig einbrechen.<br>'
                        + 'Quelle: Khalil/Dombre "Modeling, Identification and Control of Robots" 2002 §9; Featherstone "Rigid Body Dynamics Algorithms" Springer 2008.'
                },
                {
                    q: 'Welche <strong>Identifikationsmethode</strong> nutzt man, um die <em>DH-Parameter</em> eines Roboters experimentell zu vermessen (Kalibrierung)?',
                    h: 'Lasertracker, Least-Squares-Identifikation, ueberbestimmtes System.',
                    s: '<strong>Modell:</strong> ein 6-Achs-Roboter hat 4 Denavit-Hartenberg-Parameter pro Achse ($\\theta_i, d_i, a_i, \\alpha_i$) = 24 Parameter, von denen meist nur 18-20 experimentell identifizierbar sind (Rest ist redundant). Plus 6 Werkzeug-Parameter (TCP-Position + Orientierung) und 6 Welt-Frame-Parameter ($\\$ROBROOT$).<br>'
                        + '<strong>Standardverfahren CPC (Complete and Parametrically Continuous, Zhuang/Roth 1992):</strong><br>'
                        + '<strong>1. Messung:</strong> der Roboter faehrt $\\sim 100\\ldots 500$ verschiedene Posen an. Bei jeder Pose wird die <em>tatsaechliche</em> Welt-Pose des TCP (bzw. eines Reflektorballs am Flansch) mit einem Lasertracker (Leica AT960, FARO Vantage) auf $\\pm 0{,}05\\,\\text{mm}$ vermessen. Gleichzeitig werden die Achs-Encoder-Werte des Roboters gespeichert.<br>'
                        + '<strong>2. Modell-Aufstellung:</strong> fuer jede Pose $i$ wird die Soll-Vorwaertskinematik basierend auf den <em>aktuellen</em> DH-Parametern berechnet:<br>'
                        + '$$\\mathbf{p}_\\text{model}^{(i)} = f(\\boldsymbol{\\theta}^{(i)}, \\mathbf{p}_\\text{DH}).$$'
                        + '$\\mathbf{p}_\\text{DH}$ ist der zu identifizierende Parametervektor (20-dim).<br>'
                        + '<strong>3. Residuum-Vektor:</strong><br>'
                        + '$$\\mathbf{r}^{(i)} = \\mathbf{p}_\\text{gemessen}^{(i)} - \\mathbf{p}_\\text{model}^{(i)}.$$'
                        + '<strong>4. Linearisierung und Least-Squares-Update:</strong><br>'
                        + '$$\\mathbf{r}^{(i)} \\approx \\mathbf{J}_\\text{cal}^{(i)} \\cdot \\Delta \\mathbf{p}_\\text{DH},$$'
                        + 'mit $\\mathbf{J}_\\text{cal} = \\partial \\mathbf{p}_\\text{model}/\\partial \\mathbf{p}_\\text{DH}$. Stacking aller Posen:<br>'
                        + '$$\\Delta \\mathbf{p}_\\text{DH} = (\\mathbf{J}_\\text{stack}^T \\mathbf{J}_\\text{stack})^{-1} \\mathbf{J}_\\text{stack}^T \\, \\mathbf{r}_\\text{stack}.$$'
                        + '<strong>5. Iteration:</strong> Update $\\mathbf{p}_\\text{DH} \\leftarrow \\mathbf{p}_\\text{DH} + \\Delta \\mathbf{p}_\\text{DH}$, Wiederholen bis Konvergenz ($\\|\\Delta \\mathbf{p}_\\text{DH}\\| &lt; 10^{-6}$, typ. 3-5 Iterationen).<br>'
                        + '<strong>Ergebnis:</strong> aus typ. $\\pm 2\\,\\text{mm}$ absoluter Genauigkeit wird $\\pm 0{,}3\\,\\text{mm}$ &mdash; eine 10-fache Verbesserung. Die identifizierten Parameter werden in $\\$config.dat$ geschrieben und beim naechsten Boot vom KSS-Inverse-Kinematik-Loeser verwendet.<br>'
                        + '<strong>Aufwand:</strong> Setup + Messungen + Auswertung typ. 2-3 Tage. Anschliessend lasertracker-zertifizierter Kalibrier-Status fuer 6-12 Monate (bis thermische Drift oder Crashs eine Neukalibrierung erfordern).<br>'
                        + 'Quelle: Zhuang/Roth "Comprehensive Robot Calibration with Special Reference to Industrial Robots" Wiley 1996; KUKA AbsoluteAccuracy-Optionspaket Handbuch.'
                },
                {
                    q: 'Wie ist die <strong>Konfigurationsangabe</strong> in einem KRL-<code>E6POS</code> (Felder <code>S</code> = Status und <code>T</code> = Turn) definiert, und warum kann ein und derselbe kartesische TCP-Punkt dennoch durch <em>mehrere</em> Achsstellungen erreicht werden?',
                    h: 'S kodiert Schulter/Ellenbogen/Handgelenk-Lage (3 Bit), T kodiert die volle Umdrehungs-Zaehlung der Achsen 4/6 (12 Bit).',
                    s: 'Ein 6-DoF-Knickarmroboter (KUKA KR-Serie) hat fuer eine vorgegebene TCP-Pose $\mathbf{T}_\text{TCP} \in SE(3)$ typischerweise <strong>bis zu acht</strong> diskrete Inverse-Kinematik-Loesungen (Schulter links/rechts, Ellenbogen oben/unten, Handgelenk geflippt/nicht-geflippt) plus theoretisch unendlich viele Loesungen, die sich nur in vollen Umdrehungen einzelner Achsen unterscheiden. KRL macht diese Information ueber zwei Felder im <code>E6POS</code> eindeutig:<br>'
                        + '<strong>Status-Bits <code>S</code> (3 Bit, 0&hellip;7):</strong><br>'
                        + '<table class="text-xs my-2"><thead><tr><th class="pr-3 text-left">Bit</th><th class="pr-3 text-left">Bedeutung</th><th class="text-left">Wert = 1</th></tr></thead><tbody>'
                        + '<tr><td class="pr-3">Bit 0</td><td class="pr-3">Position von Achse 1 (Grundstellung)</td><td><em>overhead</em> &mdash; Roboter zeigt nach hinten</td></tr>'
                        + '<tr><td class="pr-3">Bit 1</td><td class="pr-3">Position von Achse 3 (Ellenbogen)</td><td>Ellenbogen <em>unter</em> dem Werkzeug</td></tr>'
                        + '<tr><td class="pr-3">Bit 2</td><td class="pr-3">Position von Achse 5 (Handgelenk)</td><td>$\theta_5 &lt; 0$ (flip)</td></tr>'
                        + '</tbody></table>'
                        + '<strong>Turn-Bits <code>T</code> (12 Bit, 0&hellip;4095):</strong> 2 Bit pro Achse fuer Achsen 1&hellip;6, kodieren das Vorzeichen-Quadranten / die Periodenzaehlung. Bit $i$ gesetzt = Achse $i+1$ steht in einem $\geq 0$-Quadranten bzw. zaehlt eine zusaetzliche Umdrehung.<br>'
                        + '<strong>Konsequenzen fuer die Bahnplanung:</strong><br>'
                        + '<ul class="list-disc list-inside text-sm">'
                        + '<li><strong>PTP:</strong> S und T werden ausgewertet. Stehen S/T im Zielpunkt anders als in der aktuellen Stellung, wechselt der Inverse-Kinematik-Loeser die Konfiguration &mdash; der Roboter fuehrt einen Konfigurationswechsel durch (Schulter-/Ellenbogen-Umkehr).</li>'
                        + '<li><strong>LIN/CIRC:</strong> S und T werden <em>ignoriert</em>. Der Bahnplaner haelt die aktuelle Konfiguration bei und faehrt linear. Liegt das Ziel ausserhalb der mit dieser Konfiguration erreichbaren Region, bricht KSS mit <em>"Stop wegen kinematischer Singularitaet"</em> oder <em>"Status-Turn-Aenderung waehrend Bahnbewegung"</em> ab.</li>'
                        + '<li><strong>Singularitaeten</strong> (Achse 5 nahe 0°, Handgelenk-Singularitaet) erfordern <code>LIN</code> oder eine PTP-Bewegung mit Status-Wechsel; eine Bahnbewegung durch die Singularitaet ist nicht moeglich, da die inverse Jacobi-Matrix dort unbestimmt wird.</li>'
                        + '</ul>'
                        + '<strong>Praxis-Beispiel:</strong><br>'
                        + code('KRL', '; Punkt mit explizitem S/T:\nDECL E6POS XHOME = {X 1200, Y 0, Z 1500, A 0, B 90, C 0, S \'B010\', T \'B000010\', E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}\n\nPTP XHOME      ; loest ggf. Konfigurationswechsel aus\nLIN PNEU       ; behaelt aktuelle Konfiguration')
                        + 'In <code>B</code>-Schreibweise (binaer) sind die Bits direkt sichtbar. Wer Programme zwischen unterschiedlichen Robotervarianten (KR-Quantec vs. KR-Iontec) portiert, muss S/T pruefen &mdash; identische TCP-Koordinaten, aber andere Konfiguration fuehren in der neuen Zelle zu Kollisionen.<br>'
                        + 'Quelle: KSS 8.x Programmierhandbuch §5 (Datentyp <code>POS</code>/<code>E6POS</code>, Status- und Turn-Felder); Siciliano et al. "Robotics: Modelling, Planning and Control", Springer 2009, §2.12 (Multiple IK-Loesungen) sowie §3.7 (kinematische Singularitaeten).'
                }
            ]
        ]
    };
})();
