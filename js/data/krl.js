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
                        + 'Steifigkeit $K$ ist im Wesentlichen eine <strong>diagonale 6x6-Matrix</strong> mit Eintraegen pro kartesischem DoF (translatorisch in N/m, rotatorisch in Nm/rad bzw. Nm/$^\\circ$). In KRL wird sie als sechs Skalare uebergeben.<br>'
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
                }
            ]
        ]
    };
})();
