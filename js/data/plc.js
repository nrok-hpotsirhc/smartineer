/* PLC-Programmierung (IEC 61131-3) */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'plc';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    // Helper: code block (Tailwind-styled)
    const code = (lang, body) =>
        '<pre class="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs md:text-sm overflow-x-auto my-2"><code>' +
        '<span class="text-cyan-300">[' + lang + ']</span>\n' + body +
        '</code></pre>';

    window.APP_DATA[id] = {
        id,
        name: 'PLC-Programmierung',
        desc: 'IEC 61131-3: Strukturierter Text (ST), Kontaktplan (KOP/LD), Funktionsbausteinsprache (FUP/FBD) und Anweisungsliste (AWL/IL). Datentypen, Operatoren, Standard-Funktionsbausteine, Selbsthaltung, Edge/Trigger, Timer, Zähler, Scan-Zyklus.',
        formulas: `
            <strong>IEC 61131-3 Sprachen (Edition 3, 2013)</strong><br>
            <ul class="list-disc list-inside text-sm">
                <li><strong>ST</strong> &mdash; Structured Text (Pascal-ähnlich, textuell)</li>
                <li><strong>KOP / LD</strong> &mdash; Kontaktplan / Ladder Diagram (Relais-Logik)</li>
                <li><strong>FUP / FBD</strong> &mdash; Funktionsbausteinsprache / Function Block Diagram</li>
                <li><strong>AWL / IL</strong> &mdash; Anweisungsliste / Instruction List (Assembler-ähnlich, in 3. Auflage als <em>deprecated</em> markiert)</li>
                <li><strong>AS / SFC</strong> &mdash; Ablaufsprache / Sequential Function Chart</li>
            </ul><br>

            <strong>Standard-Datentypen (Auswahl)</strong>
            <table class="text-xs my-2"><tbody>
                <tr><td class="pr-3"><code>BOOL</code></td><td>1 bit, FALSE/TRUE</td></tr>
                <tr><td class="pr-3"><code>BYTE/WORD/DWORD/LWORD</code></td><td>Bitstrings 8/16/32/64</td></tr>
                <tr><td class="pr-3"><code>SINT</code></td><td>8 bit signed: $-128 \\ldots 127$</td></tr>
                <tr><td class="pr-3"><code>INT</code></td><td>16 bit signed: $-32768 \\ldots 32767$</td></tr>
                <tr><td class="pr-3"><code>DINT</code></td><td>32 bit signed: $-2^{31} \\ldots 2^{31}-1$</td></tr>
                <tr><td class="pr-3"><code>UINT</code></td><td>16 bit unsigned: $0 \\ldots 65535$</td></tr>
                <tr><td class="pr-3"><code>REAL</code></td><td>32 bit IEEE-754 single</td></tr>
                <tr><td class="pr-3"><code>LREAL</code></td><td>64 bit IEEE-754 double</td></tr>
                <tr><td class="pr-3"><code>TIME</code></td><td>Dauer, z.B. <code>T#250ms</code></td></tr>
                <tr><td class="pr-3"><code>STRING</code></td><td>Default 80 Zeichen, <code>STRING(n)</code></td></tr>
            </tbody></table>

            <strong>ST-Operatoren (Priorität ↓)</strong><br>
            <code>( )</code> &nbsp; <code>**</code> &nbsp; unäres <code>NOT</code>, <code>-</code> &nbsp; <code>* / MOD</code> &nbsp; <code>+ -</code> &nbsp; <code>&lt; &gt; &lt;= &gt;=</code> &nbsp; <code>= &lt;&gt;</code> &nbsp; <code>AND (&amp;)</code> &nbsp; <code>XOR</code> &nbsp; <code>OR</code><br>
            Bitweise auf Integer-Typen: <code>AND, OR, XOR, NOT</code> sind <em>bitweise</em>, auf <code>BOOL</code> <em>logisch</em>.<br>
            Schiebebefehle: <code>SHL(IN, N)</code>, <code>SHR</code>, <code>ROL</code>, <code>ROR</code>.<br><br>

            <strong>Selbsthaltung (Halte-Schaltung)</strong> &mdash; klassisches Anlauf/Stopp-Pattern:
            $$Q := (\\text{Start} \\;\\lor\\; Q) \\;\\land\\; \\overline{\\text{Stop}}$$
            Stopp ist <em>vorrangig</em>, weil es mit AND verknüpft wird (Schließer: <code>Stop = TRUE</code>, Drahtbruch-sicher mit Öffner negieren).<br><br>

            <strong>Standard-FBs</strong><br>
            <code>TON(IN, PT) → Q, ET</code> &mdash; Einschaltverzögerung: $Q = 1$ erst, wenn $IN = 1$ für $\\geq PT$.<br>
            <code>TOF(IN, PT) → Q, ET</code> &mdash; Ausschaltverzögerung: $Q$ fällt erst $PT$ nach fallender Flanke ab.<br>
            <code>TP(IN, PT) → Q, ET</code> &mdash; Impulsgeber fester Länge.<br>
            <code>CTU(CU, R, PV) → Q, CV</code> &mdash; Vorwärtszähler (positive Flanke an CU).<br>
            <code>CTD(CD, LD, PV) → Q, CV</code>; <code>CTUD(CU, CD, R, LD, PV) → QU, QD, CV</code><br>
            <code>R_TRIG(CLK) → Q</code> / <code>F_TRIG(CLK) → Q</code> &mdash; Flankenerkennung.<br>
            <code>SR(S1, R) → Q1</code> &mdash; Setz-dominant; <code>RS(S, R1) → Q1</code> &mdash; Rücksetz-dominant.<br><br>

            <strong>Variablen-Scopes</strong><br>
            <code>VAR</code> (lokal), <code>VAR_INPUT</code>, <code>VAR_OUTPUT</code>, <code>VAR_IN_OUT</code> (by-reference),
            <code>VAR_GLOBAL</code>, <code>VAR_TEMP</code>, <code>VAR_RETAIN</code> (überlebt Warmstart),
            <code>VAR_PERSISTENT</code> (überlebt Kaltstart, herstellerspezifisch), <code>CONSTANT</code>.<br><br>

            <strong>Zyklus eines PLC-Programms</strong><br>
            $$\\text{Read Inputs} \\to \\text{Execute Program} \\to \\text{Write Outputs} \\to \\text{Housekeeping}$$
            Reaktionszeit-Worst-Case auf einen Eingangswechsel: $T_\\text{react} \\leq 2\\,T_\\text{cycle} + T_\\text{filter,IN} + T_\\text{delay,OUT}$.<br><br>

            <strong>Function vs. Function Block</strong><br>
            <em>Function (FUN)</em>: kein interner Zustand, gleicher Output bei gleichem Input.<br>
            <em>Function Block (FB)</em>: hat Instanzdaten, behält Zustand zwischen Aufrufen &mdash; <strong>jede Instanz</strong> hat eigenen Speicher (z.B. <code>TON</code> muss als Instanz deklariert werden).<br><br>

            <strong>Häufige Fallen</strong><br>
            &bull; Auf <code>BOOL</code>: <code>NOT</code> ist logisch; auf <code>WORD</code>: <code>NOT</code> ist bitweise (1er-Komplement).<br>
            &bull; <code>INT</code>-Überlauf wickelt modulo $2^{16}$ um (Implementation-defined kann sich unterscheiden).<br>
            &bull; <code>MOD</code> auf negative Operanden: Vorzeichen folgt herstellerabhängig dem Dividenden (CODESYS) bzw. ist genormt durch IEC ($a\\,\\text{MOD}\\,b$ = Rest mit Vorzeichen von $a$).<br>
            &bull; Floating-Compare mit <code>=</code> ist gefährlich &mdash; immer mit Toleranz $\\varepsilon$.<br><br>

            <strong>Funktionale Sicherheit (IEC 61508 / ISO 13849)</strong>
            <table class="text-xs my-2"><tbody>
                <tr><td class="pr-3">SIL</td><td class="pr-3">PFD<sub>avg</sub> (low demand)</td><td>PFH [1/h] (high demand)</td></tr>
                <tr><td>1</td><td>$[10^{-2},10^{-1})$</td><td>$[10^{-6},10^{-5})$</td></tr>
                <tr><td>2</td><td>$[10^{-3},10^{-2})$</td><td>$[10^{-7},10^{-6})$</td></tr>
                <tr><td>3</td><td>$[10^{-4},10^{-3})$</td><td>$[10^{-8},10^{-7})$</td></tr>
            </tbody></table>
            $\\mathrm{SFF}=\\dfrac{\\lambda_S+\\lambda_{DD}}{\\lambda_S+\\lambda_{DD}+\\lambda_{DU}}$, $\\mathrm{DC}=\\dfrac{\\sum\\lambda_{DD}}{\\sum\\lambda_D}$<br>
            1oo1: $\\mathrm{PFD_{avg}}\\approx\\lambda_{DU}\\,T_1/2$; PL d $\\leftrightarrow$ SIL 2, PL e $\\leftrightarrow$ SIL 3<br>
            MTTF<sub>d</sub>: low 3-10 a, medium 10-30 a, high 30-100 a; DC: none&lt;60% &le; low&lt;90% &le; medium&lt;99% &le; high<br><br>

            <strong>Echtzeit / Diskretisierung</strong><br>
            Reaktionszeit (Worst Case): $T_\\text{react}\\le T_\\text{filter}+2\\,T_\\text{cycle}+T_\\text{out}$<br>
            Auslastung: $U=\\sum C_i/T_i\\le 1$ (notwendig)<br>
            Tustin: $s\\leftarrow\\dfrac{2}{T_a}\\dfrac{z-1}{z+1}$; PT1/EMA: $y_k=y_{k-1}+\\alpha(x_k-y_{k-1})$, $\\alpha=\\dfrac{T_a}{\\tau+T_a}$<br>
            Q15-Festkomma: $\\text{Wert}=\\text{int}/2^{15}$, Bereich $[-1,\\,1-2^{-15}]$<br><br>

            <strong>Kommunikation</strong><br>
            Modbus RTU: seriell + CRC-16 (Poly 0xA001); Modbus TCP: Port 502 + MBAP, kein CRC<br>
            PROFINET RT (SW-priorisiert, ms) / IRT (HW-geplant, &le;250 µs, Jitter &lt;1 µs)<br>
            CANopen: PDO (schnell, unbestätigt) / SDO (bestätigt, Objektverzeichnis)<br>
            OPC UA Security: None &lt; Sign &lt; SignAndEncrypt; MQTT QoS 0/1/2 = höchstens/mindestens/genau einmal<br>
            EtherCAT DC: $\\le 100$ ns Slave-Synchronität
        `,

        levels: [
            // ============================== LEVEL 1 — Grundlagen ==============================
            [
                {
                    q: 'Welchen Wertebereich hat ein <code>INT</code> nach IEC 61131-3, und wie viele Bits belegt er? Was passiert beim Überlauf von <code>INT</code> über das Maximum hinaus?',
                    h: '<code>INT</code> ist <em>signed</em> 16 bit, Zweierkomplement-Darstellung.',
                    s: 'Ein <code>INT</code> belegt 16 bit (signed, Zweierkomplement) und überdeckt $-32768 \\ldots 32767$, also $[-2^{15},\\,2^{15}-1]$.<br>Beim Überlauf über $32767$ wickelt der Wert auf $-32768$ um (modulo $2^{16}$). Dies ist IEC-konform; einzelne Hersteller (z.B. CODESYS) lösen Overflow per Default <em>nicht</em> als Exception aus &mdash; defensive Prüfung obliegt dem Programmierer.<br>$\\boxed{\\text{INT}\\in[-32768,\\,32767],\\;16\\,\\text{bit}}$'
                },
                {
                    q: 'Folgendes ST-Programm wird in einem Zyklus ausgeführt:' +
                        code('ST', 'VAR\n  a, b, c : BOOL;\nEND_VAR\n\na := TRUE;\nb := FALSE;\nc := a AND NOT b OR FALSE;') +
                        'Welchen Wert hat <code>c</code> nach Ausführung? Begründe mit der Operator-Priorität.',
                    h: 'Priorität: <code>NOT</code> &gt; <code>AND</code> &gt; <code>OR</code>.',
                    s: 'Nach IEC-Priorität wird zuerst <code>NOT b</code>, dann <code>AND</code>, zuletzt <code>OR</code> ausgewertet:<br>$c = (a \\land \\lnot b) \\lor \\text{FALSE} = (\\text{TRUE} \\land \\text{TRUE}) \\lor \\text{FALSE} = \\text{TRUE}.$<br>$\\boxed{c = \\text{TRUE}}$'
                },
                {
                    q: 'Bei dem ST-Ausdruck <code>x AND y</code> &mdash; ist die Operation logisch oder bitweise? Begründe für die beiden Fälle:<br>(a) <code>x, y : BOOL</code><br>(b) <code>x, y : WORD</code> mit <code>x := 16#00FF; y := 16#0F0F;</code>. Berechne im Fall (b) das Ergebnis hexadezimal.',
                    h: 'IEC: <code>AND/OR/XOR/NOT</code> sind <em>logisch</em> auf <code>BOOL</code> und <em>bitweise</em> auf Bitstring/Integer-Typen.',
                    s: '(a) <code>BOOL</code>: logisches UND.<br>(b) <code>WORD</code>: bitweises UND.<br>$\\text{16\\#00FF} = 0000\\,0000\\,1111\\,1111_2$<br>$\\text{16\\#0F0F} = 0000\\,1111\\,0000\\,1111_2$<br>$\\text{AND}\\;\\;\\;\\;\\;\\;\\;\\;\\,= 0000\\,0000\\,0000\\,1111_2 = \\text{16\\#000F}$<br>$\\boxed{x\\,\\text{AND}\\,y = 16\\#000F = 15}$'
                },
                {
                    q: 'Erkläre die <strong>Selbsthaltung</strong> (Anlauf/Stopp-Schaltung) im Kontaktplan. Skizziere sie symbolisch und gib das gleichwertige ST-Statement an. Warum ist Stopp <em>vorrangig</em>?',
                    h: 'Boolesche Form: $Q := (\\text{Start} \\lor Q) \\land \\overline{\\text{Stop}}$.',
                    s: '<strong>KOP-Skizze (eine Strompfad-Sprosse):</strong>' +
                        code('KOP', '|--[ Start ]--+--[/Stop]--( Q )--|\n|             |\n|--[  Q   ]---+\n(parallele Brücke = Halteglied)') +
                        'Sobald <code>Start</code> einmal HIGH war, hält sich der Ausgang <code>Q</code> über den parallelen Halte-Kontakt selbst &mdash; bis <code>Stop</code> die Sprosse unterbricht.<br><br><strong>ST-Äquivalent:</strong>' +
                        code('ST', 'Q := (Start OR Q) AND NOT Stop;') +
                        'Stopp ist vorrangig, weil <code>NOT Stop</code> mit <code>AND</code> die gesamte Halte-Kette unterbricht &mdash; unabhängig vom Zustand von <code>Start</code> oder <code>Q</code>. <br>Sicherheitstechnisch wird <code>Stop</code> physikalisch als <em>Öffner</em> (NC) verdrahtet, sodass ein Drahtbruch wie ein gedrückter Stopp wirkt (drahtbruchsicher).<br>$\\boxed{Q := (\\text{Start} \\lor Q) \\land \\lnot \\text{Stop}}$'
                },
                {
                    q: 'Im Kontaktplan: was ist der Unterschied zwischen einem <strong>Schließer</strong> (NO, normally open) und einem <strong>Öffner</strong> (NC, normally closed)? Welches Element ergibt am Ausgang einer einzigen Sprosse mit Eingang <code>X</code>:' +
                        code('KOP', '|--[ X  ]--( Y )--|     bzw.     |--[/X ]--( Y )--|'),
                    h: 'Schließer leitet bei TRUE, Öffner leitet bei FALSE.',
                    s: 'Ein <strong>Schließer</strong> <code>--[X]--</code> leitet, wenn $X=\\text{TRUE}$. Damit gilt $Y = X$.<br>Ein <strong>Öffner</strong> <code>--[/X]--</code> leitet, wenn $X=\\text{FALSE}$. Damit gilt $Y = \\lnot X$.<br>Beide Symbole beschreiben <em>logische</em> Kontakte; der elektrische Zustand am realen Eingangsklemmenkontakt kann durch die Verdrahtung (Hardware-NC vs. NO) zusätzlich invertiert sein &mdash; die übliche sichere Praxis: <em>Stopptaster und Sicherheitskreise hardwareseitig als NC, im KOP als Schließer auswerten</em>.<br>$\\boxed{Y_\\text{NO}=X,\\quad Y_\\text{NC}=\\lnot X}$'
                },
                {
                    q: 'Worin unterscheiden sich <code>R_TRIG</code> und <code>F_TRIG</code>? Skizziere ein Timing-Diagramm für <code>CLK</code> und gib jeweils <code>Q</code> an.',
                    h: 'Beide melden eine <em>Flanke</em>, nicht den Pegel.',
                    s: '<code>R_TRIG</code> (Rising-Edge-Trigger) liefert <code>Q := TRUE</code> für genau <strong>einen</strong> Zyklus, wenn <code>CLK</code> von <code>FALSE</code> auf <code>TRUE</code> wechselt. <code>F_TRIG</code> reagiert symmetrisch auf die fallende Flanke.<br><br>' +
                        code('Timing', 'CLK   :  ___|‾‾‾‾‾‾|________|‾‾‾|________\n              ↑       ↓        ↑   ↓\nR_TRIG.Q :  ___[1]____________[1]_______\nF_TRIG.Q :  __________[1]________[1]____\n(jeweils 1 Zyklus breit)') +
                        'Implementierung intern entspricht: <code>Q := CLK AND NOT M; M := CLK;</code> (mit <code>M</code> als gespeicherter Vorzustand pro <em>Instanz</em>).'
                },
                {
                    q: 'Ein <code>TON</code>-Timer wird so verwendet:' +
                        code('ST', 'VAR\n  T1 : TON;\n  Out: BOOL;\nEND_VAR\n\nT1(IN := Start, PT := T#500ms);\nOut := T1.Q;') +
                        'Der Eingang <code>Start</code> ist 200&nbsp;ms HIGH, dann 600&nbsp;ms LOW, dann 800&nbsp;ms HIGH. Wann ist <code>Out = TRUE</code>?',
                    h: '<code>TON.Q</code> wird HIGH erst, wenn <code>IN</code> ununterbrochen für mindestens <code>PT</code> HIGH war. Wird <code>IN</code> vorher LOW, resettet der Timer.',
                    s: 'Phase 1 (200&nbsp;ms HIGH): Da $200\\,\\text{ms} < 500\\,\\text{ms}$, wird <code>Out</code> nicht gesetzt. Beim LOW-Wechsel wird <code>ET</code> auf 0 zurückgesetzt.<br>Phase 2 (600&nbsp;ms LOW): <code>Out = FALSE</code>.<br>Phase 3 (800&nbsp;ms HIGH): Nach 500&nbsp;ms HIGH-Phase wird <code>Out = TRUE</code> und bleibt für die restlichen 300&nbsp;ms HIGH.<br><br>$\\boxed{\\text{Out HIGH von }t = 200{+}600{+}500 = 1300\\,\\text{ms bis }1600\\,\\text{ms}}$'
                },
                {
                    q: 'Ein <code>CTU</code> (Vorwärtszähler) wird so deklariert:' +
                        code('ST', 'VAR\n  C : CTU;\nEND_VAR\nC(CU := Btn, R := Reset, PV := 3);\nDone := C.Q;') +
                        'Sequenz: <code>Btn</code> liefert die Flanken (1)↑ (2)↑ (3)↑ (4)↑, dazwischen kein Reset. Wann ist <code>Done = TRUE</code>, was steht in <code>C.CV</code> nach der vierten Flanke?',
                    h: '<code>CTU.Q := (CV ≥ PV)</code>. <code>CV</code> wird je <em>positiver Flanke</em> an <code>CU</code> inkrementiert.',
                    s: 'Nach jeder positiven Flanke an <code>CU</code> wird <code>CV</code> inkrementiert. <code>CV</code>: $0 \\to 1 \\to 2 \\to 3 \\to 4$. <code>Q</code> ist genau dann TRUE, wenn $CV \\geq PV$:<ul><li>nach Flanke 1: $CV=1$, $Q=\\text{FALSE}$</li><li>nach Flanke 2: $CV=2$, $Q=\\text{FALSE}$</li><li>nach Flanke 3: $CV=3$, $Q=\\text{TRUE}$ (erstmals)</li><li>nach Flanke 4: $CV=4$, $Q=\\text{TRUE}$</li></ul>$\\boxed{\\text{Done = TRUE ab 3. Flanke},\\;\\text{C.CV} = 4}$'
                },
                {
                    q: 'In FUP/FBD: Welche Boolesche Funktion realisiert das untenstehende Netz? Drücke das Ergebnis als ST-Ausdruck aus.' +
                        code('FUP', 'A ──┐\n    │AND├──┐\nB ──┘      │OR├── Y\n           │\nC ─[NOT]───┘'),
                    h: 'Erst die Eingänge zum AND-Block, dann das Ergebnis mit <code>NOT C</code> ODER-verknüpft.',
                    s: 'Der AND-Block bildet $A \\land B$. Das Ergebnis wird mit $\\lnot C$ ODER-verknüpft:<br>$Y = (A \\land B) \\lor \\lnot C$.<br><br><strong>ST-Äquivalent:</strong>' +
                        code('ST', 'Y := (A AND B) OR NOT C;') +
                        '$\\boxed{Y = (A \\land B) \\lor \\lnot C}$'
                },
                {
                    q: 'Was ist der Unterschied zwischen einer <code>FUNCTION</code> und einem <code>FUNCTION_BLOCK</code> in IEC 61131-3? Nenne ein Beispiel, in dem du zwingend einen FB brauchst.',
                    h: 'Stichwort: interner Zustand und Instanzen.',
                    s: 'Eine <code>FUNCTION</code> ist <em>zustandslos</em>: gleicher Input liefert immer den gleichen Output, kein Speicher zwischen Aufrufen (vergleichbar einer mathematischen Funktion). Beispiel: <code>SQRT</code>, <code>LIMIT</code>.<br><br>Ein <code>FUNCTION_BLOCK</code> hat <em>Instanzdaten</em> (eigener Speicherbereich pro Instanz), behält Zustand zwischen Zyklen und benötigt eine deklarierte Instanz vor der Verwendung. Beispiele: <code>TON</code>, <code>CTU</code>, <code>R_TRIG</code>, <code>SR</code>.<br><br><strong>Zwingend FB nötig</strong> u.a. bei:<ul><li>Timern (<code>ET</code> wächst über mehrere Zyklen)</li><li>Zählern (<code>CV</code> wird inkrementell aktualisiert)</li><li>Flankenerkennung (alter Zustand wird intern gespeichert)</li><li>Filter/Regler mit Historie (<code>z^{-1}</code>-Speicher)</li></ul>$\\boxed{\\text{FB = Klasse mit Instanz; FUN = stateless}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5; John/Tiegelkamp, IEC 61131-3: Programming Industrial Automation Systems, Springer 2010, §3.4.'
                },
                {
                    q: 'Welchen Wertebereich hat der Datentyp <code>INT</code> nach IEC 61131-3? Was passiert bei <code>x := 32767; x := x + 1;</code>?',
                    h: '<code>INT</code> ist 16-bit signed, Two-Complement.',
                    s: 'Bereich: $-2^{15} \\ldots 2^{15}-1 = -32768 \\ldots 32767$. Bei $32767+1$ tritt <strong>Overflow</strong> auf; in Two-Complement-Wrap-Around wird das Ergebnis $-32768$. IEC 61131-3 fordert die Behandlung nicht zwingend — viele Compiler/Targets setzen das ENO-Flag oder lösen <code>ERR_OVERFLOW</code> aus; das Default-Verhalten ist <em>implementation-defined</em>.<br>$\\boxed{\\text{INT}: -32768 \\ldots 32767;\\; 32767+1 \\to -32768\\text{ (Wrap)}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) Tab. 10 elementare Datentypen.'
                },
                {
                    q: 'Ein <code>TON</code> wird mit <code>PT := T#500ms</code> parametriert. Skizziere den Verlauf von <code>Q</code> und <code>ET</code>, wenn <code>IN</code> bei $t=0$ steigt und bei $t=300\\,\\text{ms}$ fällt. Wann ist <code>Q = TRUE</code>?',
                    h: 'TON = on-delay: Q geht TRUE, wenn IN $\\geq$ PT ununterbrochen TRUE war.',
                    s: 'IN fällt bei $t=300\\,\\text{ms}$ vor Ablauf von PT = 500 ms zurück → Timer wird abgebrochen, <code>ET</code> wird auf 0 zurückgesetzt, <code>Q</code> bleibt FALSE. <strong>Q wird in diesem Szenario nie TRUE.</strong> ET-Verlauf: linear von 0 ms auf 300 ms ansteigend, dann beim Fallen von IN sofort auf 0.<br>$\\boxed{Q \\equiv \\text{FALSE},\\; \\max(ET)=300\\,\\text{ms}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2 Standard-Funktionsbausteine, TON-Timing-Diagramm.'
                },
                {
                    q: 'Ein <code>CTU</code> (Up-Counter) wird mit <code>PV := 5</code> betrieben. <code>CU</code> erhält 7 Aufwärtsflanken; <code>R</code> wird nicht gesetzt. Was sind die Werte von <code>CV</code> und <code>Q</code> nach den 7 Flanken?',
                    h: 'CTU zählt CV bei jeder positiven CU-Flanke hoch; Q := (CV ≥ PV); CV ist vom Typ INT.',
                    s: '<code>CV</code> wird bei jeder positiven Flanke an <code>CU</code> inkrementiert (solange kein Reset und $CV < \\text{INT}_{\\max}$). Nach 7 Flanken: $CV=7$. Q := (CV ≥ PV) = (7 ≥ 5) = <strong>TRUE</strong>.<br>$\\boxed{CV=7,\\;Q=\\text{TRUE}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.4 Counters (CTU).'
                },
                {
                    q: 'Was ist der Unterschied zwischen <code>R_TRIG</code> und <code>F_TRIG</code> in IEC 61131-3? Auf welchem Eingang reagieren sie?',
                    h: 'R = Rising, F = Falling. Beide haben den Eingang <code>CLK : BOOL</code>.',
                    s: '<code>R_TRIG</code> (Rising Edge) erzeugt einen einzigen TRUE-Zyklus an <code>Q</code>, wenn <code>CLK</code> eine $0 \\to 1$-Flanke hat. <code>F_TRIG</code> (Falling Edge) analog für $1 \\to 0$-Flanken. Beide speichern intern den letzten <code>CLK</code>-Zustand (<code>M : BOOL</code>) und vergleichen ihn pro Zyklus mit dem aktuellen Wert.<br>$\\boxed{\\text{R\\_TRIG: Q}=\\uparrow\\text{CLK};\\;\\text{F\\_TRIG: Q}=\\downarrow\\text{CLK}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.3 Bistable function blocks, R_TRIG/F_TRIG.'
                },
                {
                    q: 'Was berechnet folgendes ST-Snippet für <code>a=4, b=3, c=2</code>?' +
                        code('ST', 'y := a + b * c - 2 ** 3;'),
                    h: 'IEC-Operator-Priorität: <code>**</code> > unäres NOT/- > <code>* / MOD</code> > <code>+ -</code>.',
                    s: 'Auswertung: $2^3 = 8$; $b\\cdot c = 3\\cdot 2 = 6$; $y = 4 + 6 - 8 = 2$.<br>$\\boxed{y = 2}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5 Operatorenpriorität.'
                },
                {
                    q: 'Was ist der Unterschied zwischen <code>SR</code> und <code>RS</code> in IEC 61131-3? Welcher Eingang dominiert jeweils, wenn beide TRUE sind?',
                    h: 'Stichwort: Set-dominant vs. Reset-dominant Latch.',
                    s: '<code>SR</code>: <em>Set-dominant</em> bistabil. Eingänge <code>S1</code> (Set) und <code>R</code> (Reset). Wenn beide TRUE → <code>Q1 = TRUE</code> (Set gewinnt).<br><code>RS</code>: <em>Reset-dominant</em> bistabil. Eingänge <code>S</code> (Set) und <code>R1</code> (Reset). Wenn beide TRUE → <code>Q1 = FALSE</code> (Reset gewinnt).<br>Faustregel: der Eingang mit der "1" im Namen (S1 bzw. R1) hat Priorität. Sicherheitsgerichtete Stopp-Logik nutzt typischerweise <code>RS</code> (Reset-dominant).<br>$\\boxed{\\text{SR: Set gewinnt; RS: Reset gewinnt}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.3 Bistable function blocks.'
                },
                {
                    q: 'Konvertiere das IEC-TIME-Literal <code>T#1m30s500ms</code> in Millisekunden.',
                    h: 'TIME-Literal: <code>T#</code> oder <code>TIME#</code>, mit Komponenten d/h/m/s/ms; intern in ms gespeichert.',
                    s: '$1\\,\\text{min} = 60\\,\\text{s} = 60\\,000\\,\\text{ms}$; $30\\,\\text{s} = 30\\,000\\,\\text{ms}$; $500\\,\\text{ms} = 500\\,\\text{ms}$. Summe: $60\\,000 + 30\\,000 + 500 = 90\\,500\\,\\text{ms}$.<br>$\\boxed{\\text{T\\#1m30s500ms} = 90\\,500\\,\\text{ms}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.2.1.2 Zeitliterale.'
                },
                {
                    q: 'Was liefert <code>SHL(IN := 16#0F, N := 4)</code> auf einem <code>BYTE</code> (8 bit)?',
                    h: 'SHL schiebt links und füllt rechts mit 0; nach 4 Plätzen.',
                    s: '$\\text{0x0F} = \\text{0b0000\\,1111}$. Linksschieben um 4 Plätze: <code>0b1111 0000</code> = <code>0xF0</code> = $240$ dezimal. Auf einem 8-bit-BYTE gehen keine Bits verloren, weil die Einsen ursprünglich rechts standen.<br>$\\boxed{\\text{SHL(0x0F, 4)} = \\text{0xF0} = 240_{10}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.4.5 Shift-Operatoren (SHL/SHR/ROL/ROR).'
                },
                {
                    q: 'Wie viel Byte belegt eine Variable <code>arr : ARRAY[1..10] OF INT</code> nach IEC 61131-3?',
                    h: '<code>INT</code> = 16 bit = 2 Byte; das Array hat 10 Elemente.',
                    s: 'Indexbereich $[1\\ldots 10]$ → 10 Elemente. Element-Größe: $\\text{INT} = 16\\,\\text{bit} = 2\\,\\text{Byte}$. Gesamt: $10 \\cdot 2 = 20\\,\\text{Byte}$. (Hersteller-spezifisches Padding/Alignment kann zusätzlich auftreten, ist aber nicht IEC-spezifiziert.)<br>$\\boxed{20\\,\\text{Byte}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) Tab. 10 (INT = 16 bit), §6.4.4.1 Arrays.'
                },
                {
                    q: 'Welche Aussagen über die fünf IEC-61131-3-Sprachen sind <em>nicht</em> korrekt? (a) ST ist textuell; (b) AS/SFC ist grafisch; (c) AWL/IL ist in Edition 3 abgekündigt; (d) KOP/LD darf keine Funktionsbausteine aufrufen; (e) FUP/FBD ist grafisch.',
                    h: 'Edition-3-Statusaussage zu AWL prüfen; LD-Aufruf von FBs prüfen.',
                    s: 'Aussage (d) ist <em>falsch</em>: KOP/LD darf seit jeher Funktionsbausteine als Box-Symbole einbinden — TON, CTU, SR werden in Praxis sehr häufig direkt im KOP instanziiert. Alle übrigen Aussagen sind korrekt: ST textuell (a), AS/SFC grafisch (b), AWL/IL in Ed. 3 als <em>deprecated</em> markiert (c), FUP/FBD grafisch (e).<br>$\\boxed{\\text{Falsch: (d) — KOP darf FBs aufrufen}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §B.2 (Status of IL), §8.2 (LD), §8.3 (FBD).'
                },
                {
                    q: 'Was berechnet folgender ST-Code, und auf welche Maschinen-Eigenschaft verlässt er sich nicht?' +
                        code('ST', 'a := 7;\nb := 3;\nq := a / b;\nr := a MOD b;'),
                    h: 'Division von <code>INT</code>: ganzzahlige Division mit Rest; <code>MOD</code> gibt Rest.',
                    s: 'Für ganzzahlige Typen ist <code>/</code> die abgerundete Ganzzahldivision (truncation toward zero in IEC) und <code>MOD</code> der zugehörige Rest. $7/3 = 2$, $7\\bmod 3 = 1$. Es gilt $a = q\\cdot b + r$ also $7 = 2\\cdot 3 + 1$. Der Code verlässt sich <em>nicht</em> auf eine Gleitkomma-FPU, da Operanden vom Typ <code>INT</code> sind.<br>$\\boxed{q=2,\\;r=1}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.3 arithmetische Operatoren.'
                },
                {
                    q: 'Was unterscheidet einen ENUMERATED-Typ <code>TYPE eMode : (IDLE, RUN, STOP); END_TYPE</code> von einer Reihe <code>VAR CONSTANT IDLE := 0; RUN := 1; ... END_VAR</code>? Nenne zwei Vorteile.',
                    h: 'Stichworte: Typsicherheit, Lesbarkeit, Wertebereich-Prüfung.',
                    s: 'Vorteile des <code>ENUM</code>:<ul><li><strong>Typsicherheit</strong>: ein Parameter <code>mode : eMode</code> akzeptiert nur Werte aus <code>{IDLE, RUN, STOP}</code>; Zuweisung einer "fremden" Konstante ist Compile-Fehler. CONSTANT-Integers haben keinerlei Schutz vor falscher Belegung.</li><li><strong>Lesbarkeit / Refactoring</strong>: Compiler/IDE listen die zulässigen Werte automatisch; bei Erweiterung des Enums werden alle CASE-Verzweigungen vom Compiler auf Vollständigkeit geprüft (vendor-abhängig, z.B. CODESYS-Warning bei unvollständigem CASE).</li></ul>(Ed. 3 erlaubt zudem benannte Werte: <code>(IDLE := 10, RUN := 20)</code>.)<br>$\\boxed{\\text{ENUM = typisierter, geschlossener Wertebereich}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.4.4.3 Enumerated data types.'
                },
                {
                    q: 'Wie viele Bits belegt der Datentyp <code>BOOL</code> nach IEC 61131-3, und welche Werte kann er annehmen? Wie viel Speicher belegt er in der Praxis?',
                    h: '<code>BOOL</code> trägt logisch genau ein Bit.',
                    s: 'Ein <code>BOOL</code> trägt logisch 1 Bit mit den Werten <code>FALSE</code> (0) und <code>TRUE</code> (1). In der Praxis allokieren viele Targets aus Adressierungs-/Alignmentgründen ein ganzes Byte pro einzelner <code>BOOL</code>-Variable; nur in gepackten Strukturen (<code>ARRAY OF BOOL</code> bzw. Bit-in-WORD) wird tatsächlich bitweise gespeichert.<br>$\\boxed{\\text{BOOL: 1 bit logisch, FALSE/TRUE}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) Tab. 10 elementare Datentypen.'
                },
                {
                    q: 'Welche Genauigkeit und welchen ungefähren Wertebereich hat der Datentyp <code>REAL</code> (IEEE-754 single)? Warum ist ein exakter Gleichheitsvergleich problematisch?',
                    h: '32 bit: 1 Vorzeichen, 8 Exponent, 23 Mantisse.',
                    s: '<code>REAL</code> ist IEEE-754 single (32 bit): ca. <strong>7 signifikante Dezimalstellen</strong>, Bereich etwa $\\pm 1{,}18\\cdot 10^{-38}\\dots\\pm 3{,}4\\cdot 10^{38}$. Die Maschinengenauigkeit ist $\\varepsilon_\\text{m}\\approx 1{,}19\\cdot 10^{-7}$.<br>Viele Dezimalbrüche (z.B. 0,1) sind binär nicht endlich darstellbar; deshalb scheitert <code>IF x = 0.1</code> häufig — Toleranzvergleich <code>ABS(x-0.1) &lt; eps</code> verwenden.<br>$\\boxed{\\text{REAL: 32 bit, } \\approx 7 \\text{ Dezimalstellen}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) Tab. 10; IEEE 754-2019 §3.'
                },
                {
                    q: 'Welchen Wertebereich hat ein <code>DINT</code> nach IEC 61131-3?',
                    h: '<code>DINT</code> ist 32 bit signed (Zweierkomplement).',
                    s: 'Bereich: $-2^{31}\\ldots 2^{31}-1 = -2\\,147\\,483\\,648\\ldots 2\\,147\\,483\\,647$.<br>$\\boxed{\\text{DINT}\\in[-2^{31},\\,2^{31}-1]}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) Tab. 10 elementare Datentypen.'
                },
                {
                    q: 'Ein <code>UINT</code> hat den Wert <code>65535</code>. Was ergibt <code>x := x + 1;</code>?',
                    h: '<code>UINT</code> ist 16 bit unsigned: $0 \\ldots 65535$.',
                    s: 'Bei $65535+1$ läuft der vorzeichenlose 16-bit-Wert über und wickelt modulo $2^{16}$ auf <strong>0</strong> um.<br>$\\boxed{65535+1 \\to 0\\ (\\text{Wrap mod } 2^{16})}$<br>Defensive Programmierung muss den Überlauf selbst prüfen — IEC schreibt keine Exception vor. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) Tab. 10.'
                },
                {
                    q: 'Wie viele Zeichen fasst ein <code>STRING</code> ohne Längenangabe standardmäßig, und wie deklariert man eine kürzere Variante?',
                    h: 'Default-Kapazität ist herstellerüblich 80 Zeichen; <code>STRING(n)</code> begrenzt sie.',
                    s: 'Ohne Angabe reserviert ein <code>STRING</code> üblicherweise <strong>80 Zeichen</strong> Nutzlast (plus interne Längen-/Terminierungsbytes). Mit <code>STRING(n)</code> wird die maximale Länge auf $n$ Zeichen festgelegt, z.B. <code>name : STRING(20);</code>.<br>$\\boxed{\\text{Default 80 Zeichen; STRING(n) begrenzt}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.3.3 Zeichenketten.'
                },
                {
                    q: 'Wandle das IEC-TIME-Literal <code>T#1h15m</code> in Millisekunden um.',
                    h: '$1\\,\\text{h}=3\\,600\\,000\\,\\text{ms}$, $1\\,\\text{min}=60\\,000\\,\\text{ms}$.',
                    s: '$1\\,\\text{h}=3\\,600\\,000\\,\\text{ms}$; $15\\,\\text{min}=15\\cdot 60\\,000=900\\,000\\,\\text{ms}$. Summe $=4\\,500\\,000\\,\\text{ms}$.<br>$\\boxed{\\text{T\\#1h15m}=4\\,500\\,000\\,\\text{ms}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.2.1.2 Zeitliterale.'
                },
                {
                    q: 'Berechne <code>16#FF XOR 16#0F</code> auf einem <code>BYTE</code> (bitweise).',
                    h: 'XOR setzt das Ergebnisbit, wenn die Eingangsbits <em>verschieden</em> sind.',
                    s: '$\\text{1111\\,1111} \\oplus \\text{0000\\,1111} = \\text{1111\\,0000} = \\text{16\\#F0}$.<br>$\\boxed{\\text{16\\#FF XOR 16\\#0F} = \\text{16\\#F0} = 240}$<br>XOR mit $\\text{16\\#FF}$ invertiert alle Bits (1er-Komplement). <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.4 bitweise Operatoren.'
                },
                {
                    q: 'Was ergibt <code>17 MOD 5</code> für <code>INT</code>-Operanden?',
                    h: '<code>MOD</code> liefert den Rest der Ganzzahldivision.',
                    s: '$17 = 3\\cdot 5 + 2$, also $17 \\bmod 5 = 2$.<br>$\\boxed{\\text{17 MOD 5} = 2}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.3 arithmetische Operatoren.'
                },
                {
                    q: 'Welchen Wahrheitswert hat der ST-Ausdruck <code>(5 &gt; 3) AND (2 = 2)</code>?',
                    h: 'Vergleichsoperatoren liefern <code>BOOL</code>; <code>=</code> ist hier der Vergleich (nicht die Zuweisung).',
                    s: '$(5>3)=\\text{TRUE}$, $(2=2)=\\text{TRUE}$, $\\text{TRUE} \\land \\text{TRUE} = \\text{TRUE}$.<br>$\\boxed{=\\text{TRUE}}$<br>Beachte: Zuweisung ist <code>:=</code>, Gleichheitsvergleich ist <code>=</code>. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.2 Vergleichsoperatoren.'
                },
                {
                    q: 'Was ergibt der ST-Potenzoperator <code>3 ** 3</code>?',
                    h: '<code>**</code> ist die Potenzierung mit der höchsten Operator-Priorität.',
                    s: '$3^3 = 27$.<br>$\\boxed{\\text{3 ** 3} = 27}$<br>Das Ergebnis ist je nach Operandentyp <code>REAL</code> (viele Targets rechnen <code>**</code> in Gleitkomma). <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5 Operatorenpriorität.'
                },
                {
                    q: 'Was liefert <code>NOT 16#00FF</code> auf einem <code>WORD</code> (16 bit)?',
                    h: 'Auf Bitstring-Typen ist <code>NOT</code> das bitweise 1er-Komplement.',
                    s: '$\\text{16\\#00FF} = \\text{0000\\,0000\\,1111\\,1111}$. Bitweise invertiert: $\\text{1111\\,1111\\,0000\\,0000} = \\text{16\\#FF00}$.<br>$\\boxed{\\text{NOT 16\\#00FF} = \\text{16\\#FF00}}$<br>Auf <code>BOOL</code> wäre <code>NOT</code> dagegen die logische Negation. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.4.'
                },
                {
                    q: 'Wandle das Hexadezimal-Literal <code>16#1A</code> in eine Dezimalzahl um.',
                    h: '$16\\#1A = 1\\cdot 16 + 10$.',
                    s: '$1\\cdot 16^1 + A\\cdot 16^0 = 16 + 10 = 26$.<br>$\\boxed{\\text{16\\#1A} = 26}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.2.1.1 Zahlenliterale (typisierte/basierte Literale).'
                },
                {
                    q: 'Wandle das Binär-Literal <code>2#1010</code> in eine Dezimalzahl um.',
                    h: 'Stellenwerte $8,4,2,1$.',
                    s: '$1\\cdot 8 + 0\\cdot 4 + 1\\cdot 2 + 0\\cdot 1 = 10$.<br>$\\boxed{\\text{2\\#1010} = 10}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.2.1.1 basierte Literale.'
                },
                {
                    q: 'Worin unterscheiden sich in ST die Operatoren <code>:=</code> und <code>=</code>? Was bedeutet daher <code>a := b = c;</code>?',
                    h: '<code>:=</code> weist zu, <code>=</code> vergleicht (liefert BOOL).',
                    s: '<code>:=</code> ist die <strong>Zuweisung</strong>, <code>=</code> der <strong>Gleichheitsvergleich</strong> (Ergebnistyp <code>BOOL</code>). Daher: <code>a := b = c;</code> wertet zuerst <code>b = c</code> aus (TRUE/FALSE) und weist dieses boolesche Ergebnis <code>a</code> zu — <code>a</code> muss also <code>BOOL</code> sein.<br>$\\boxed{\\text{a := (b = c); a ist BOOL}}$<br>Verwechslung mit C (<code>=</code> als Zuweisung) ist eine klassische Fehlerquelle. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §7.3.2 Zuweisung; §6.5.2 Vergleich.'
                },
                {
                    q: 'Im Kontaktplan stehen zwei Schließer <code>A</code> und <code>B</code> in <em>Reihe</em> vor einer Spule <code>Y</code>. Welche Boolesche Verknüpfung ergibt das, und wie lautet das ST-Äquivalent?',
                    h: 'Kontakte in Reihe = logisches UND.',
                    s: 'Strom fließt nur, wenn <em>beide</em> Schließer leiten — das ist ein logisches UND.<br>$Y = A \\land B$, ST: <code>Y := A AND B;</code><br>$\\boxed{\\text{Reihe} \\Rightarrow \\text{AND}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.3 Ladder Diagram (LD).'
                },
                {
                    q: 'Im Kontaktplan stehen zwei Schließer <code>A</code> und <code>B</code> <em>parallel</em> (Brücke) vor einer Spule <code>Y</code>. Welche Verknüpfung ist das?',
                    h: 'Parallele Strompfade = logisches ODER.',
                    s: 'Strom fließt, wenn <em>mindestens einer</em> der parallelen Pfade leitet — logisches ODER.<br>$Y = A \\lor B$, ST: <code>Y := A OR B;</code><br>$\\boxed{\\text{Parallel} \\Rightarrow \\text{OR}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.3 Ladder Diagram (LD).'
                },
                {
                    q: 'Was bewirken die KOP-Spulentypen <strong>Set-Spule</strong> <code>-(S)-</code> und <strong>Reset-Spule</strong> <code>-(R)-</code> im Unterschied zur normalen Spule?',
                    h: 'Set/Reset sind <em>speichernd</em> (latch), die normale Spule folgt dem Sprossenzustand direkt.',
                    s: 'Die normale Spule <code>-( )-</code> setzt <code>Y</code> in jedem Zyklus auf den aktuellen Sprossenwert (nicht speichernd). <code>-(S)-</code> setzt <code>Y := TRUE</code> und <strong>hält</strong> diesen Zustand, auch wenn die Sprosse wieder FALSE wird; erst eine <code>-(R)-</code>-Spule mit gleichem Operanden setzt <code>Y := FALSE</code>. Set/Reset bilden zusammen ein Flip-Flop.<br>$\\boxed{\\text{-(S)- latcht TRUE, -(R)- latcht FALSE}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.3 (Set/Reset coils).'
                },
                {
                    q: 'Beschreibe das Zeitverhalten des Standard-FB <code>TP</code> (Impulsglied). Wann geht <code>Q</code> TRUE und wann wieder FALSE, wenn <code>IN</code> bei $t=0$ steigt und <code>PT = T\\#2s</code> ist?',
                    h: '<code>TP</code> erzeugt einen Impuls fester Länge <code>PT</code>, unabhängig vom weiteren Verlauf von <code>IN</code>.',
                    s: 'Die steigende <code>IN</code>-Flanke startet einen Impuls: <code>Q := TRUE</code> für genau <code>PT = 2 s</code>, danach <code>Q := FALSE</code> — <em>unabhängig</em> davon, ob <code>IN</code> während des Impulses bereits abfällt oder HIGH bleibt. Während des laufenden Impulses werden weitere <code>IN</code>-Flanken ignoriert (nicht retriggerbar).<br>$\\boxed{Q\\ \\text{TRUE von } t=0 \\text{ bis } t=2\\,\\text{s}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.5 (TP pulse timer).'
                },
                {
                    q: 'Wie arbeitet der Abwärtszähler <code>CTD</code>? Was bewirken <code>CD</code>, <code>LD</code> und wann ist <code>Q = TRUE</code>?',
                    h: '<code>CTD</code> zählt von <code>PV</code> herunter; <code>LD</code> lädt <code>CV := PV</code>.',
                    s: '<code>LD := TRUE</code> lädt <code>CV := PV</code>. Jede positive Flanke an <code>CD</code> dekrementiert <code>CV</code> (bis 0, kein Unterlauf). <code>Q := (CV ≤ 0)</code>, d.h. der Ausgang wird TRUE, sobald heruntergezählt ist.<br>$\\boxed{\\text{CTD: CV von PV abwärts, Q := (CV ≤ 0)}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.4 Counters (CTD).'
                },
                {
                    q: 'Warum muss ein <code>TON</code> vor der Verwendung als <em>Instanz</em> deklariert werden, während eine <code>FUNCTION</code> wie <code>SQRT</code> direkt aufgerufen wird?',
                    h: 'Stichwort: interner Zustand (ET) über Zyklen.',
                    s: '<code>TON</code> ist ein <code>FUNCTION_BLOCK</code> mit Instanzdaten (u.a. die abgelaufene Zeit <code>ET</code>), die über Zyklen erhalten bleiben müssen. Jede unabhängige Verzögerung braucht daher einen eigenen Speicherbereich → eigene Instanz (<code>T1 : TON;</code>). <code>SQRT</code> ist eine zustandslose <code>FUNCTION</code>: gleicher Input → gleicher Output, kein Speicher, daher kein Instanzbedarf.<br>$\\boxed{\\text{FB = Instanz mit Zustand; FUN = stateless}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.2/§6.6.1.'
                },
                {
                    q: 'Wozu dienen die Deklarationsbereiche <code>VAR_INPUT</code> und <code>VAR_OUTPUT</code> in einem Funktionsbaustein?',
                    h: 'Schnittstelle des FB nach außen — Eingangs- bzw. Ausgangsparameter.',
                    s: '<code>VAR_INPUT</code> deklariert die <em>Eingangsparameter</em> (werden beim Aufruf <code>von außen</code> belegt, im FB nur gelesen). <code>VAR_OUTPUT</code> deklariert die <em>Ausgangsparameter</em>, die der FB schreibt und die der Aufrufer nach dem Aufruf liest (<code>fbInst.OutVar</code>). Interne, nach außen unsichtbare Größen liegen in <code>VAR</code>.<br>$\\boxed{\\text{VAR\\_INPUT = rein, VAR\\_OUTPUT = raus}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.2 Variablendeklaration.'
                },
                {
                    q: 'Was bewirkt das Schlüsselwort <code>CONSTANT</code> in einer Variablendeklaration, z.B. <code>VAR CONSTANT PI : REAL := 3.14159; END_VAR</code>?',
                    h: 'Schreibschutz nach Initialisierung.',
                    s: 'Eine mit <code>CONSTANT</code> deklarierte Variable erhält ihren Wert bei der Initialisierung und ist danach <strong>schreibgeschützt</strong> — jeder Schreibzugriff im Code ist ein Compile-Fehler. Das sichert Festwerte (Kennlinien, Grenzwerte, $\\pi$) gegen versehentliches Überschreiben und erlaubt dem Compiler Optimierungen.<br>$\\boxed{\\text{CONSTANT = read-only nach Init}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.2.'
                },
                {
                    q: 'Was liefert <code>SHR(IN := 16#80, N := 1)</code> auf einem <code>BYTE</code> (8 bit)?',
                    h: '<code>SHR</code> schiebt nach rechts und füllt links mit 0 (logischer Shift).',
                    s: '$\\text{16\\#80} = \\text{1000\\,0000}$. Rechtsschieben um 1: $\\text{0100\\,0000} = \\text{16\\#40} = 64$.<br>$\\boxed{\\text{SHR(16\\#80, 1)} = \\text{16\\#40} = 64}$<br>Logischer Shift (0-Fill) — keine Vorzeichenerweiterung wie bei arithmetischem Shift. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.4.5 Shift-Operatoren.'
                },
                {
                    q: 'Was berechnet die Standard-Funktion <code>SEL(G := g, IN0 := a, IN1 := b)</code> in Abhängigkeit von <code>g : BOOL</code>?',
                    h: 'Binärer Selektor: ein Eingang wird durchgeschaltet.',
                    s: '<code>SEL</code> gibt <code>IN0</code> zurück, wenn <code>G = FALSE</code>, und <code>IN1</code>, wenn <code>G = TRUE</code> — ein typisierter Zweifach-Multiplexer.<br>$\\boxed{\\text{SEL} = (G)\\,?\\,\\text{IN1}:\\text{IN0}}$<br>Für mehr als zwei Quellen nutzt man <code>MUX(K, IN0, IN1, ...)</code> mit ganzzahligem Selektor <code>K</code>. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.1 Standardfunktionen (selection functions).'
                }
            ],

            // ============================== LEVEL 2 — Vertiefung ==============================
            [
                {
                    q: 'Werte das folgende ST-Snippet aus. Welchen Wert hat <code>res</code> am Ende?' +
                        code('ST', 'VAR\n  res : INT := 0;\n  i   : INT;\nEND_VAR\n\nFOR i := 0 TO 10 BY 2 DO\n  res := res + i;\nEND_FOR;'),
                    h: '<code>BY 2</code> heißt: $i \\in \\{0, 2, 4, 6, 8, 10\\}$.',
                    s: 'Die Schleife durchläuft $i = 0, 2, 4, 6, 8, 10$ (sechs Iterationen, da Endwert <em>einschließlich</em> ist).<br>$\\text{res} = 0 + 2 + 4 + 6 + 8 + 10 = 30$.<br>Allgemein: Summe der geraden Zahlen von $0$ bis $2n$ ist $n(n+1)$. Hier $n=5$: $5 \\cdot 6 = 30.$<br>$\\boxed{\\text{res} = 30}$'
                },
                {
                    q: 'Berechne das Ergebnis der ST-Schiebeoperation.' +
                        code('ST', 'VAR\n  a : WORD := 16#00A5;\n  b : WORD;\nEND_VAR\nb := SHL(a, 4);'),
                    h: '<code>SHL(IN, N)</code> verschiebt um $N$ Bits nach links, links freiwerdende Bits = 0; nach rechts geschobene Bits gehen verloren.',
                    s: '$\\text{16\\#00A5} = 0000\\,0000\\,1010\\,0101_2$<br>Linksshift um 4: $0000\\,1010\\,0101\\,0000_2 = \\text{16\\#0A50}$.<br>Numerisch: $\\text{SHL}(a, 4) = a \\cdot 2^4 \\;\\bmod\\; 2^{16} = 165 \\cdot 16 = 2640 = \\text{16\\#0A50}$.<br>$\\boxed{b = 16\\#0A50 = 2640}$'
                },
                {
                    q: 'Realisiere ohne <code>R_TRIG</code> eine eigene steigende Flankenerkennung in ST. Eingang <code>X : BOOL</code>, Ausgang <code>RisingEdge : BOOL</code>. Erkläre, warum die Reihenfolge der Anweisungen kritisch ist.',
                    h: 'Brauche einen statischen Speicher des Vorwerts (z.B. lokale Variable in <code>VAR</code>, <em>nicht</em> <code>VAR_TEMP</code>).',
                    s: 'Implementierung:' +
                        code('ST', 'VAR  // statisch, behält Wert über Zyklen\n  X_old : BOOL;\nEND_VAR\n\nRisingEdge := X AND NOT X_old;   // (1) zuerst auswerten\nX_old      := X;                  // (2) dann Vorwert aktualisieren') +
                        'Begründung: Würde Schritt (2) <em>vor</em> (1) stehen, wäre <code>X_old</code> bereits gleich <code>X</code> &mdash; die Flanke würde nie erkannt (immer <code>FALSE</code>). Die Variable <code>X_old</code> muss in <code>VAR</code> stehen (instanz-/programmpersistent), nicht in <code>VAR_TEMP</code> (das wird zyklisch genullt).<br>Dies ist exakt die Implementierung, die <code>R_TRIG</code> intern realisiert.'
                },
                {
                    q: 'Was tut der folgende Code-Schnipsel? Welcher Wert steht in <code>y</code> nach 5 ms, 25 ms, 60 ms (CPU-Zyklus 1 ms)?' +
                        code('ST', 'VAR\n  T1 : TOF;\nEND_VAR\nT1(IN := pulse, PT := T#20ms);\ny := T1.Q;') +
                        'Sequenz: <code>pulse</code> ist 0–10&nbsp;ms TRUE, danach FALSE.',
                    h: '<code>TOF</code>: <code>Q</code> folgt <code>IN</code> bei steigender Flanke <em>sofort</em>; bei fallender Flanke fällt <code>Q</code> erst nach <code>PT</code> ab.',
                    s: '<code>TOF</code>-Verhalten:<ul><li>steigende Flanke: $Q$ wird sofort TRUE</li><li>fallende Flanke: $Q$ bleibt für $PT$ TRUE, fällt dann ab</li></ul>Sequenz mit $PT = 20\\,\\text{ms}$:<ul><li>$t = 5\\,\\text{ms}$: pulse = TRUE → $y = \\text{TRUE}$</li><li>$t = 10\\,\\text{ms}$: fallende Flanke; Timer startet</li><li>$t = 25\\,\\text{ms}$: Pulse seit 15&nbsp;ms FALSE, $15<20$ → $y = \\text{TRUE}$</li><li>$t = 30\\,\\text{ms}$: 20&nbsp;ms erreicht, $y$ fällt auf FALSE</li><li>$t = 60\\,\\text{ms}$: $y = \\text{FALSE}$</li></ul>$\\boxed{y(5)=\\text{T},\\;y(25)=\\text{T},\\;y(60)=\\text{F}}$'
                },
                {
                    q: 'Übersetze die folgende KOP-Sprosse in äquivalenten ST-Code:' +
                        code('KOP', '|--[ S1 ]--+--[/S2]--+--( M1 )--|\n|          |         |\n|--[ M1 ]--+         |\n|                    |\n|--[ AUTO ]--[ Tmr.Q ]+'),
                    h: 'Zwei parallele Pfade ergeben ein <code>OR</code>; eine Reihe von Kontakten ergibt ein <code>AND</code>.',
                    s: 'Die linke Parallelschaltung ist die <em>Selbsthaltung</em> $(\\text{S1} \\lor \\text{M1})$. Der zweite parallele Pfad <code>AUTO AND Tmr.Q</code> ist eine alternative Set-Bedingung. In Reihe folgt der Öffner <code>/S2</code> als Stopp.<br><br>$M1 = \\big( (\\text{S1} \\lor M1) \\lor (\\text{AUTO} \\land \\text{Tmr.Q}) \\big) \\land \\lnot \\text{S2}$<br><br>' +
                        code('ST', 'M1 := ( S1 OR M1 OR (AUTO AND Tmr.Q) ) AND NOT S2;') +
                        '$\\boxed{M_1 := (S_1 \\lor M_1 \\lor (\\text{AUTO} \\land T_\\text{mr.Q})) \\land \\lnot S_2}$'
                },
                {
                    q: 'Welcher Wert steht in <code>r</code> nach Ausführung? Beachte ganzzahlige Division und MOD.' +
                        code('ST', 'VAR\n  a : INT := -7;\n  b : INT :=  3;\n  q, m, r : INT;\nEND_VAR\nq := a / b;\nm := a MOD b;\nr := q*b + m;'),
                    h: 'IEC: $a\\,\\text{MOD}\\,b$ ist als $a - (a/b) \\cdot b$ definiert; das Vorzeichen folgt dem Dividenden.',
                    s: 'IEC-Definition: ganzzahlige Division rundet gegen Null (Truncation), <code>MOD</code> ergibt Rest mit Vorzeichen des Dividenden.<br>$q = -7 / 3 = -2$ (Truncation; $-2.33\\ldots$ wird zu $-2$).<br>$m = -7 - (-2)\\cdot 3 = -7 + 6 = -1$.<br>Konsistenzprüfung: $r = q\\cdot b + m = (-2)\\cdot 3 + (-1) = -7 = a.\\;\\checkmark$<br>$\\boxed{q = -2,\\;m = -1,\\;r = -7}$'
                },
                {
                    q: 'Im FUP wird ein <code>CTUD</code> (Auf-/Abwärtszähler) eingesetzt:' +
                        code('FUP', '         ┌─────────────┐\n CU ────►│             │── QU\n CD ────►│    CTUD     │── QD\n  R ────►│             │── CV\n LD ────►│             │\n PV ────►│ PV = 5      │\n         └─────────────┘') +
                        'Reihenfolge: $\\text{CV}_0 = 0$, dann CU↑, CU↑, CU↑, CD↑, CU↑, R↑. Was sind <code>CV</code> und <code>QU, QD</code> nach jeder Operation?',
                    h: '<code>QU = (CV ≥ PV)</code>, <code>QD = (CV ≤ 0)</code>. <code>R</code> setzt <code>CV := 0</code>; <code>LD</code> würde <code>CV := PV</code> laden.',
                    s: 'Schrittweise Auswertung mit $PV=5$:<table class="text-xs"><thead><tr><th class="pr-3">Schritt</th><th class="pr-3">CV</th><th class="pr-3">QU=(CV≥5)</th><th>QD=(CV≤0)</th></tr></thead><tbody><tr><td>Start</td><td>0</td><td>F</td><td>T</td></tr><tr><td>CU↑</td><td>1</td><td>F</td><td>F</td></tr><tr><td>CU↑</td><td>2</td><td>F</td><td>F</td></tr><tr><td>CU↑</td><td>3</td><td>F</td><td>F</td></tr><tr><td>CD↑</td><td>2</td><td>F</td><td>F</td></tr><tr><td>CU↑</td><td>3</td><td>F</td><td>F</td></tr><tr><td>R↑</td><td>0</td><td>F</td><td>T</td></tr></tbody></table>$\\boxed{\\text{Endzustand: CV}=0,\\;\\text{QU}=\\text{F},\\;\\text{QD}=\\text{T}}$'
                },
                {
                    q: 'Was ist der Unterschied zwischen <code>SR</code> und <code>RS</code>? Bei welchem Eingangsmuster $(S{=}\\text{T}, R{=}\\text{T})$ unterscheiden sie sich?' +
                        code('ST', 'VAR  Latch1 : SR;  Latch2 : RS;  END_VAR\nLatch1(SET1 := S, RESET := R);    // Set-dominant\nLatch2(SET   := S, RESET1 := R);  // Reset-dominant'),
                    h: 'Stichwort "dominant" gibt an, welcher Eingang gewinnt, wenn beide gleichzeitig aktiv sind.',
                    s: '<code>SR</code> ist <strong>Set-dominant</strong>: bei $S=R=\\text{T}$ ergibt $Q_1=\\text{T}$.<br><code>RS</code> ist <strong>Reset-dominant</strong>: bei $S=R=\\text{T}$ ergibt $Q_1=\\text{F}$.<br><br>Wahrheitstabelle (gleiche Zustände sonst):<table class="text-xs"><tbody><tr><td class="pr-3">S</td><td class="pr-3">R</td><td class="pr-3">SR.Q1</td><td>RS.Q1</td></tr><tr><td>0</td><td>0</td><td>$Q_1$ (hält)</td><td>$Q_1$ (hält)</td></tr><tr><td>1</td><td>0</td><td>1</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td><td>0</td></tr></tbody></table>Wahl in der Praxis: <em>Sicherheits-Stopp</em> als <code>RS</code> (Reset gewinnt), <em>Alarm-Latch</em> oft <code>SR</code> (Alarm muss aktiv quittiert werden).<br>$\\boxed{S{=}R{=}\\text{T}\\Rightarrow \\text{SR}.Q_1=1,\\;\\text{RS}.Q_1=0}$'
                },
                {
                    q: 'Programmiere in ST eine <strong>entprellte</strong> Taster-Auswertung: ein <code>BOOL Btn_raw</code> ist ggf. verprellt; gib eine stabile Flanke <code>Btn_pressed</code> aus, die nur dann TRUE für einen Zyklus wird, wenn <code>Btn_raw</code> mindestens 30&nbsp;ms ununterbrochen TRUE war.',
                    h: 'Kombiniere <code>TON</code> für Entprellung und <code>R_TRIG</code> für Einzelflanke.',
                    s: 'Pattern: <code>TON</code> erzeugt einen stabilen Pegel <code>Btn_stable</code>, daran wird ein <code>R_TRIG</code> gehängt.<br><br>' +
                        code('ST', 'VAR\n  TDeb : TON;\n  Edge : R_TRIG;\n  Btn_stable, Btn_pressed : BOOL;\nEND_VAR\n\nTDeb(IN := Btn_raw, PT := T#30ms);\nBtn_stable := TDeb.Q;\n\nEdge(CLK := Btn_stable);\nBtn_pressed := Edge.Q;') +
                        '<code>TDeb.Q</code> ist stabil-TRUE genau dann, wenn der Eingang $\\geq 30\\,\\text{ms}$ TRUE war &mdash; kurze Prellungen (typisch $<5\\,\\text{ms}$) werden verworfen. <code>R_TRIG</code> liefert daraus einen einzigen High-Zyklus pro Tastendruck (kein Dauerfeuer beim Halten).<br>$\\boxed{\\text{Btn\\_pressed} = \\uparrow(\\text{TON}_{30\\text{ms}}(\\text{Btn\\_raw}))}$'
                },
                {
                    q: 'In ST: was loggt diese <code>CASE</code>-Anweisung in <code>txt</code> für <code>state = 2</code> bzw. <code>state = 7</code>?' +
                        code('ST', 'CASE state OF\n  0      : txt := \'IDLE\';\n  1, 3   : txt := \'RUN\';\n  2..5   : txt := \'WORK\';\n  10     : txt := \'DONE\';\nELSE\n           txt := \'ERR\';\nEND_CASE'),
                    h: '<code>1, 3</code> ist Liste, <code>2..5</code> ist Bereich (inklusive). <code>1</code> wird durch die Liste, nicht durch den Bereich gefangen &mdash; <em>nicht</em> aber 2,4,5 (die fängt der Bereich).',
                    s: 'IEC-CASE wertet Labels in deklarierter Reihenfolge aus, der erste Treffer gewinnt &mdash; der CASE-Vergleich ist <em>disjunkt</em>, d.h. die Reihenfolge spielt nur eine Rolle, wenn Labels überlappen würden (was IEC-konform <em>nicht</em> erlaubt ist; viele Compiler warnen).<br>Hier sind die Bereiche disjunkt:<ul><li>$\\text{state}=2$: fällt in den Bereich <code>2..5</code> → <code>txt = \'WORK\'</code></li><li>$\\text{state}=7$: trifft kein Label → <code>ELSE</code> → <code>txt = \'ERR\'</code></li></ul>$\\boxed{\\text{state}=2 \\Rightarrow \\text{WORK},\\;\\text{state}=7 \\Rightarrow \\text{ERR}}$'
                },
                {
                    q: 'Beschreibe das Timing-Verhalten eines <code>TOF</code> (off-delay) und einer <code>TP</code> (pulse) im Vergleich zum <code>TON</code>. Wann geht jeweils <code>Q</code> TRUE und wann FALSE?',
                    h: 'TON = on-delay; TOF = off-delay; TP = monostabile Pulsverlängerung.',
                    s: '<strong>TON (on-delay):</strong> <code>IN</code> TRUE startet Timer; <code>Q</code> wird TRUE, sobald <code>ET ≥ PT</code> ohne Unterbrechung. Bei <code>IN = FALSE</code> sofort <code>Q = FALSE, ET = 0</code>.<br><strong>TOF (off-delay):</strong> <code>IN = TRUE</code> setzt <code>Q = TRUE</code> sofort. Bei fallender Flanke startet Timer; <code>Q</code> bleibt TRUE bis <code>ET = PT</code>, dann fällt <code>Q</code>. Erneute <code>IN = TRUE</code>-Flanke vor Ablauf resettet Timer (retriggerbar in einigen Targets).<br><strong>TP (pulse):</strong> Steigende <code>IN</code>-Flanke setzt <code>Q = TRUE</code> für genau <code>PT</code>, unabhängig davon, ob <code>IN</code> bleibt oder schon vorher fällt; während des Pulses werden weitere Flanken ignoriert (nicht retriggerbar).<br>$\\boxed{\\text{TON: ON-Delay; TOF: OFF-Delay; TP: feste Pulslänge PT}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.5 Timer function blocks (TON/TOF/TP).'
                },
                {
                    q: 'Was zählt ein <code>CTUD</code> nach folgender Eingangsfolge bei <code>PV = 10</code>, Start <code>CV = 0</code>: 6 CU-Flanken, dann 2 CD-Flanken, dann 1 R-Puls, dann 3 CU-Flanken? Wie stehen <code>QU</code> und <code>QD</code> am Ende?',
                    h: 'CTUD: <code>CU</code> hoch, <code>CD</code> runter, <code>R</code> resettet auf 0, <code>LD</code> lädt PV. QU := (CV ≥ PV), QD := (CV ≤ 0).',
                    s: 'Schritt-für-Schritt: $0 \\xrightarrow{+6} 6 \\xrightarrow{-2} 4 \\xrightarrow{R} 0 \\xrightarrow{+3} 3$. Endwerte: <code>CV = 3</code>; <code>QU = (3 ≥ 10) = FALSE</code>; <code>QD = (3 ≤ 0) = FALSE</code>.<br>$\\boxed{CV=3,\\;QU=\\text{FALSE},\\;QD=\\text{FALSE}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.4 Counters (CTUD).'
                },
                {
                    q: 'Was berechnet folgende FOR-Schleife in ST am Ende für <code>sum</code>?' +
                        code('ST', 'sum := 0;\nFOR i := 1 TO 10 BY 2 DO\n  sum := sum + i;\nEND_FOR;'),
                    h: 'BY 2 → Schrittweite 2, Werte i = 1, 3, 5, 7, 9.',
                    s: 'i durchläuft die ungeraden Zahlen von 1 bis 9 (10 wird nicht erreicht, da 1+5·2 = 11 > 10): $1+3+5+7+9 = 25$.<br>$\\boxed{\\text{sum} = 25}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.3 FOR statement.'
                },
                {
                    q: 'Welcher subtile Unterschied besteht zwischen einer <code>WHILE</code>- und einer <code>REPEAT</code>-Schleife in ST? Wann führt <code>REPEAT</code> mindestens einen Durchlauf aus, während <code>WHILE</code> ihn überspringt?',
                    h: 'WHILE prüft am Anfang, REPEAT am Ende.',
                    s: '<code>WHILE cond DO ... END_WHILE</code> prüft die Bedingung <em>vor</em> dem ersten Eintritt — ist <code>cond</code> initial FALSE, läuft die Schleife <strong>nie</strong>.<br><code>REPEAT ... UNTIL cond END_REPEAT</code> führt den Rumpf <em>einmal</em> aus, dann prüft die Abbruchbedingung am Ende — <code>cond</code> ist die Beendigungs-Bedingung (Schleife läuft, solange <code>cond = FALSE</code>); mindestens ein Durchlauf erfolgt immer.<br><strong>Pitfall:</strong> beide Konstrukte sind in <em>harten Echtzeit-PLCs</em> mit Vorsicht zu verwenden: ein versehentlich nicht abbrechender Loop hält die Task bis zum Watchdog-Timeout. Best Practice: feste Iterationsschranke (FOR mit Limit) bevorzugen.<br>$\\boxed{\\text{WHILE: 0..n Durchläufe;}\\;\\text{REPEAT: 1..n Durchläufe}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.4 WHILE / §6.7.5.5 REPEAT.'
                },
                {
                    q: 'Nenne die fünf wichtigsten <em>Action Qualifiers</em> in SFC/AS und beschreibe ihre Wirkung: <code>N</code>, <code>S</code>, <code>R</code>, <code>P</code>, <code>L</code>.',
                    h: 'N = Non-stored; S = Set; R = Reset; P = Pulse (1 Zyklus); L = time-Limited.',
                    s: '<table class="text-xs my-2"><thead><tr><th class="pr-3">Qualifier</th><th>Bedeutung</th></tr></thead><tbody><tr><td><code>N</code></td><td>Non-stored: Aktion ist aktiv, solange der Schritt aktiv ist.</td></tr><tr><td><code>S</code></td><td>Set: Aktion wird beim Schritt-Eintritt aktiviert und bleibt aktiv, bis ein <code>R</code> sie zurücksetzt — auch über Schrittgrenzen hinweg.</td></tr><tr><td><code>R</code></td><td>Reset: deaktiviert eine zuvor mit <code>S</code> aktivierte Aktion.</td></tr><tr><td><code>P</code></td><td>Pulse: Aktion ist genau einen Zyklus aktiv (bei Schritt-Eintritt — <code>P</code>/<code>P1</code> — oder Schritt-Austritt — <code>P0</code>).</td></tr><tr><td><code>L</code></td><td>time-Limited: Aktion ist maximal eine vorgegebene Zeit lang aktiv (Parameter <code>T</code>), z.B. <code>L T#5s</code>.</td></tr></tbody></table>Weitere: <code>D</code> (delayed), <code>SD</code>/<code>SL</code>/<code>DS</code> (kombiniert).<br>$\\boxed{\\text{N, S, R, P, L: 5 Kern-Qualifier der SFC-Aktionen}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.2.2 Step actions, Tab. 73 Action qualifiers.'
                },
                {
                    q: 'Berechne mit dem Standard-Funktionsbaustein <code>SCALE</code> (häufig auch <code>NORM_X</code> + <code>SCALE_X</code> bei Siemens) den physikalischen Druckwert in bar für einen 4-20-mA-Sensor (0–10 bar) mit aktuellem ADC-Rohwert $I = 12\\,\\text{mA}$.',
                    h: 'Lineare Skalierung: $p = p_{\\min} + \\dfrac{I - I_{\\min}}{I_{\\max} - I_{\\min}}\\,(p_{\\max} - p_{\\min})$.',
                    s: 'Einsetzen mit $I_{\\min} = 4\\,\\text{mA}, I_{\\max} = 20\\,\\text{mA}, p_{\\min} = 0\\,\\text{bar}, p_{\\max} = 10\\,\\text{bar}, I = 12\\,\\text{mA}$:<br>$p = 0 + \\dfrac{12 - 4}{20 - 4}\\cdot (10 - 0) = \\dfrac{8}{16}\\cdot 10 = 5{,}00\\,\\text{bar}$.<br>$\\boxed{p = 5{,}00\\,\\text{bar}}$<br><em>Quelle:</em> Berger, Automation mit SIMATIC S7-1500, 5. Aufl. Publicis 2017, §6.3 Analogwertskalierung (NORM_X/SCALE_X).'
                },
                {
                    q: 'Was ist eine <code>METHOD</code> in IEC 61131-3 Edition 3, und wie unterscheidet sie sich vom Aufruf des Funktionsbausteins selbst?',
                    h: 'Stichwort: OO-Erweiterung 2013, Methoden gehören zu einer FB-Klasse.',
                    s: 'Eine <code>METHOD</code> ist eine an einen <code>FUNCTION_BLOCK</code> oder eine <code>CLASS</code> gebundene Funktion, die explizit aufgerufen wird (<code>fbInst.MethodName(args);</code>). Sie kann auf die Instanzvariablen des FB zugreifen, hat aber <strong>keinen</strong> impliziten Aufruf in jedem Zyklus — der "normale" FB-Body (<code>BODY</code> bzw. die Implementierung ohne Methoden-Wrapper) wird beim <code>fbInst(args);</code>-Aufruf ausgeführt; Methoden nur, wenn sie namentlich gerufen werden. Methoden eignen sich für Lese-/Schreib-Zugriffe (Getter/Setter), seltene Konfigurations-Aufrufe oder explizit getrennte Verhaltensweisen (z.B. <code>.Reset()</code>, <code>.Configure()</code>).<br>$\\boxed{\\text{METHOD = bewusst aufgerufene Member-Funktion einer FB-Klasse}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.3 Methods (object-oriented features).'
                },
                {
                    q: 'Was bewirkt <code>INTERFACE I_Motor; METHOD Start; METHOD Stop; END_INTERFACE</code> in IEC 61131-3 Ed. 3? Erkläre, wie ein FB die Schnittstelle implementiert und welcher Vorteil sich daraus für die Steuerungs-Architektur ergibt.',
                    h: 'IMPLEMENTS + Polymorphismus.',
                    s: 'Eine <code>INTERFACE</code> deklariert eine Menge von Methodensignaturen ohne Implementierung. Ein FB implementiert sie via <code>FUNCTION_BLOCK MotorDC IMPLEMENTS I_Motor</code> und muss alle Methoden bereitstellen. Variablen vom Typ <code>I_Motor</code> können verschiedene FB-Instanzen (DC-Motor, Schrittmotor, virtueller Sim-Motor) aufnehmen — der aufrufende Code (z.B. eine Sequenzsteuerung) ist <em>nicht</em> an einen konkreten Motortyp gebunden:<br>' +
                        code('ST', 'VAR\n  Motors : ARRAY[1..N] OF I_Motor;\nEND_VAR\n\nFOR i := 1 TO N DO\n  Motors[i].Stop();\nEND_FOR;') +
                        '<strong>Vorteil:</strong> Austauschbarkeit (Hardware-Tausch ohne Sequenz-Refactoring), Testbarkeit (Mock-FB implementiert das Interface), und klar definierte API-Verträge zwischen Teams. Vorbild: OO-Pattern aus Java/C#.<br>$\\boxed{\\text{INTERFACE + IMPLEMENTS = Polymorphismus für FBs}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.4 Interfaces; John/Tiegelkamp, Springer 2010, §6.7 Objektorientierte Erweiterungen.'
                },
                {
                    q: 'Was leistet das Schlüsselwort <code>EXTENDS</code> in IEC 61131-3 Ed. 3? Gib ein Mini-Beispiel für einen <code>FUNCTION_BLOCK FB_Drive EXTENDS FB_Motor</code>.',
                    h: 'Einfach-Vererbung in der OO-Erweiterung der Norm.',
                    s: '<code>EXTENDS</code> realisiert <strong>einfache Vererbung</strong>: der abgeleitete FB erbt Variablen und Methoden des Basis-FBs und kann Methoden überschreiben (Override) oder erweitern (mit <code>SUPER^</code>-Aufruf, target-abhängig). Mehrfach-Vererbung ist <em>nicht</em> Teil der Norm.<br>' +
                        code('ST', 'FUNCTION_BLOCK FB_Motor\nVAR Speed : REAL; END_VAR\nMETHOD Start ... END_METHOD\nEND_FUNCTION_BLOCK\n\nFUNCTION_BLOCK FB_Drive EXTENDS FB_Motor\nVAR Ramp : REAL; END_VAR\nMETHOD Start          // Override\n  SUPER^.Start();    // Basis aufrufen\n  Ramp := 0.0;\nEND_METHOD\nEND_FUNCTION_BLOCK') +
                        'Die Instanzdaten von <code>FB_Drive</code> enthalten implizit auch <code>Speed</code>.<br>$\\boxed{\\text{EXTENDS: single inheritance + SUPER\\^{} für Basisaufruf}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.5 EXTENDS / inheritance.'
                },
                {
                    q: 'Was unterscheidet die vier POU-Typen <code>PROGRAM</code>, <code>FUNCTION_BLOCK</code>, <code>FUNCTION</code> und <code>METHOD</code>? Welche Programmeinheit darf direkt von einer <code>TASK</code> aufgerufen werden?',
                    h: 'Stichwort: Instanz-Daten, Wiederverwendbarkeit, Task-Zuordnung.',
                    s: '<table class="text-xs my-2"><thead><tr><th class="pr-3">POU</th><th class="pr-3">Zustand</th><th class="pr-3">Task-fähig</th><th>Aufrufart</th></tr></thead><tbody><tr><td><code>PROGRAM</code></td><td>ja (eine Top-Instanz)</td><td><strong>ja</strong></td><td>direkt von Task</td></tr><tr><td><code>FUNCTION_BLOCK</code></td><td>ja (mehrere Instanzen)</td><td>nein</td><td>aus PROGRAM oder anderem FB</td></tr><tr><td><code>FUNCTION</code></td><td>nein</td><td>nein</td><td>aus FB/Program</td></tr><tr><td><code>METHOD</code></td><td>ja (Instanzdaten des Trägers)</td><td>nein</td><td>als <code>fb.M()</code></td></tr></tbody></table>Nur <code>PROGRAM</code>-POUs werden via Task-Konfiguration zyklisch aufgerufen (cyclic, freewheeling, interrupt, event). FBs werden hierarchisch aus Programmen aufgerufen. Funktionen sind reentrant und stateless.<br>$\\boxed{\\text{Task ruft PROGRAM auf; PROGRAM ruft FBs/Funktionen}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6 POU types; §6.8 Configuration and tasks.'
                },
                {
                    q: 'Welche Eingangs-/Ausgangsabbildung verwendet eine zyklische SPS, und warum darf eine Programmlogik <em>im laufenden Zyklus</em> nicht direkt vom physikalischen Eingang lesen?',
                    h: 'Stichwort: PII (Prozess-Eingangs-Image) und PIO (Prozess-Ausgangs-Image).',
                    s: 'IEC-Zykluszyklus: (1) <strong>PII lesen</strong> — alle physikalischen Eingänge werden am Zyklusanfang in das <em>Prozess-Eingangs-Image</em> kopiert; (2) <strong>Anwender-Logik</strong> liest/schreibt ausschließlich PII/PIO; (3) <strong>PIO schreiben</strong> — am Zyklusende werden alle Werte aus dem <em>Prozess-Ausgangs-Image</em> auf die physikalischen Ausgänge gelegt.<br><strong>Begründung der Indirektion:</strong> innerhalb eines Zyklus sind alle Eingänge <em>konsistent</em> (ein "Foto" zum Zyklusstart); ein Algorithmus, der zweimal denselben Eingang abfragt, sieht garantiert denselben Wert — selbst wenn das physikalische Signal mittendrin wechselt. Ohne PII würden Race-Conditions und sprungartige Werte die Zustandslogik (Schrittketten, Vergleichsoperationen) korrumpieren.<br>$\\boxed{\\text{PII/PIO sichern Konsistenz innerhalb eines Zyklus}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.8.2 Cyclic execution model.'
                },
                {
                    q: 'Was unterscheidet die Tasks <em>cyclic</em>, <em>freewheeling</em>, <em>interrupt</em> und <em>event</em> in IEC 61131-3?',
                    h: 'Stichwort: feste Zykluszeit, "so schnell wie möglich", Hardware-Interrupt, Software-Ereignis.',
                    s: '<strong>cyclic:</strong> wird alle <code>T_cycle</code> ms aufgerufen (z.B. alle 10 ms). Bei Überschreitung der Zykluszeit löst die Laufzeit einen Task-Overrun aus.<br><strong>freewheeling:</strong> nach jedem Durchlauf sofort neu aufgerufen — keine deterministische Periode, dafür minimale Latenz für Vordergrund-Logik.<br><strong>interrupt:</strong> hardware-getriggert (digitaler Eingang, Counter-Überlauf, Encoder-Index). Höchste Priorität — direkt nach Interrupt-Erkennung wird der Task gestartet, typischerweise mit Latenzen $\\leq 100\\,\\mu\\text{s}$.<br><strong>event:</strong> software-getriggert (Boolesche Variable, OPC UA Event). Latenz höher als bei <em>interrupt</em>, da event-Prüfung auf Zyklusebene erfolgt.<br>Prioritäten und Präemption sind herstellerabhängig; harte Echtzeit benötigt typischerweise <em>cyclic</em>- oder <em>interrupt</em>-Tasks mit deterministischer Latenzgarantie.<br>$\\boxed{\\text{cyclic: T fix; freewheeling: ASAP; interrupt: HW; event: SW}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.8.2 Tasks; Berger, Automation mit SIMATIC S7-1500, 5. Aufl. 2017, §3.4 Task-Klassen.'
                },
                {
                    q: 'Welchen Wert hat <code>sum</code> nach dieser WHILE-Schleife?' +
                        code('ST', 'sum := 0;\ni   := 1;\nWHILE i <= 5 DO\n  sum := sum + i;\n  i   := i + 1;\nEND_WHILE;'),
                    h: 'WHILE prüft die Bedingung <em>vor</em> jedem Durchlauf; $i$ läuft $1\\ldots 5$.',
                    s: 'Die Schleife addiert $1+2+3+4+5 = 15$. Bei $i=6$ ist die Bedingung falsch, die Schleife endet.<br>$\\boxed{\\text{sum} = 15}$<br>Wichtig: ohne <code>i := i + 1</code> entstünde eine Endlosschleife bis zum Watchdog. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.4 WHILE statement.'
                },
                {
                    q: 'Wie oft wird der Rumpf dieser REPEAT-Schleife mindestens ausgeführt, und welchen Wert hat <code>n</code> am Ende?' +
                        code('ST', 'n := 0;\nREPEAT\n  n := n + 1;\nUNTIL n >= 3\nEND_REPEAT;'),
                    h: 'REPEAT prüft die Abbruchbedingung am <em>Ende</em>.',
                    s: 'Der Rumpf läuft, bis <code>n &gt;= 3</code> wahr ist: $n = 1, 2, 3$. Da die Prüfung am Ende erfolgt, wird der Rumpf <strong>mindestens einmal</strong> ausgeführt (auch wenn die Bedingung initial schon wahr wäre).<br>$\\boxed{n = 3,\\ \\geq 1 \\text{ Durchlauf garantiert}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.5 REPEAT statement.'
                },
                {
                    q: 'Welchen Wert hat <code>last</code> nach dieser Schleife mit <code>EXIT</code>?' +
                        code('ST', 'last := 0;\nFOR i := 1 TO 10 DO\n  IF i = 4 THEN EXIT; END_IF;\n  last := i;\nEND_FOR;'),
                    h: '<code>EXIT</code> verlässt die Schleife sofort, bevor der Rest des Rumpfes läuft.',
                    s: 'Für $i=1,2,3$ wird <code>last := i</code> gesetzt. Bei $i=4$ greift <code>EXIT</code> <em>vor</em> der Zuweisung, die Schleife bricht ab.<br>$\\boxed{\\text{last} = 3}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.6 EXIT statement.'
                },
                {
                    q: 'Welchen Wert hat <code>k</code> für <code>x = 7</code>?' +
                        code('ST', 'IF x < 0 THEN k := -1;\nELSIF x = 0 THEN k := 0;\nELSIF x < 10 THEN k := 1;\nELSE k := 2;\nEND_IF;'),
                    h: '<code>ELSIF</code> wird in Reihenfolge geprüft; der erste wahre Zweig gewinnt.',
                    s: '$x=7$: nicht $<0$, nicht $=0$, aber $<10$ ist wahr → <code>k := 1</code>. Die folgenden Zweige werden nicht mehr geprüft.<br>$\\boxed{k = 1}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.1 IF statement.'
                },
                {
                    q: 'Was steht in <code>y</code> nach folgendem CASE über einen Aufzählungstyp, wenn <code>mode = RUN</code>?' +
                        code('ST', 'TYPE eMode : (IDLE, RUN, STOP); END_TYPE\n\nCASE mode OF\n  IDLE : y := 0;\n  RUN  : y := 1;\n  STOP : y := 2;\nEND_CASE'),
                    h: 'Der CASE-Selektor darf ein Aufzählungstyp sein; jeder Wert ist ein Label.',
                    s: 'Bei <code>mode = RUN</code> trifft das Label <code>RUN</code> → <code>y := 1</code>.<br>$\\boxed{y = 1}$<br>Vorteil gegenüber Integer-CASE: der Compiler kann auf Vollständigkeit aller Enum-Werte prüfen. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.7.5.2 CASE; §6.4.4.3 Enums.'
                },
                {
                    q: 'Wie viel Speicher belegt <code>m : ARRAY[1..3, 1..4] OF INT</code> nach IEC 61131-3 (ohne Padding)?',
                    h: '$3\\cdot 4$ Elemente, <code>INT</code> = 2 Byte.',
                    s: 'Elementanzahl $=3\\cdot 4 = 12$. Größe $=12\\cdot 2\\,\\text{Byte} = 24\\,\\text{Byte}$.<br>$\\boxed{24\\,\\text{Byte}}$<br>(Hersteller-Alignment kann zusätzlich Padding einfügen, IEC-unspezifiziert.) <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.4.4.1 Arrays.'
                },
                {
                    q: 'Was berechnet die Schleife für <code>arr : ARRAY[1..4] OF INT := [10, 20, 30, 40]</code>?' +
                        code('ST', 'sum := 0;\nFOR i := 1 TO 4 DO\n  sum := sum + arr[i];\nEND_FOR;'),
                    h: 'Iteration über alle Array-Indizes.',
                    s: '$\\text{sum} = 10+20+30+40 = 100$.<br>$\\boxed{\\text{sum} = 100}$<br>Faustregel: Array-Grenzen über <code>LOWER_BOUND</code>/<code>UPPER_BOUND</code> abfragen, um die Schleife robust gegen Größenänderungen zu halten. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.4.4.1; §6.7.5.3 FOR.'
                },
                {
                    q: 'Wie greift man auf das Element einer Struktur zu? Gegeben:' +
                        code('ST', 'TYPE tPoint : STRUCT\n  x : INT;\n  y : INT;\nEND_STRUCT END_TYPE\n\nVAR p : tPoint; END_VAR'),
                    h: 'Strukturzugriff mit dem Punkt-Operator.',
                    s: 'Auf Strukturmember wird mit dem Punkt zugegriffen: <code>p.x := 5; p.y := 8;</code>. Verschachtelte Strukturen entsprechend: <code>maschine.achse.position</code>. Strukturen bündeln zusammengehörige Daten (z.B. ein Rezept, eine Achse) und werden als Ganzes per Zuweisung kopiert.<br>$\\boxed{\\text{Zugriff: p.x, p.y}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.4.4.2 Structured data types.'
                },
                {
                    q: 'Was liefern die String-Funktionen <code>CONCAT(\'AB\', \'CD\')</code> und <code>LEN</code> des Ergebnisses?',
                    h: '<code>CONCAT</code> verkettet, <code>LEN</code> zählt Zeichen.',
                    s: '<code>CONCAT(\'AB\', \'CD\') = \'ABCD\'</code>; <code>LEN(\'ABCD\') = 4</code>.<br>$\\boxed{\\text{\'ABCD\', LEN} = 4}$<br>Achtung auf die maximale <code>STRING</code>-Länge — bei Überlauf wird hersteller­abhängig abgeschnitten. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.1 Standardfunktionen für Zeichenketten.'
                },
                {
                    q: 'Welche Position liefert <code>FIND(\'HELLO\', \'LL\')</code> nach IEC 61131-3?',
                    h: '<code>FIND(IN1, IN2)</code> gibt die 1-basierte Startposition von <code>IN2</code> in <code>IN1</code> zurück (0, falls nicht gefunden).',
                    s: 'In <code>\'HELLO\'</code> beginnt <code>\'LL\'</code> an Position 3 (H=1, E=2, L=3).<br>$\\boxed{\\text{FIND(\'HELLO\', \'LL\')} = 3}$<br>Wird die Teilkette nicht gefunden, ist das Ergebnis 0. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.1 (FIND).'
                },
                {
                    q: 'Ein Siemens-Analogeingang liefert den Rohwert <code>0…27648</code> für <code>0…100 %</code>. Berechne mit der linearen Skalierung den Prozentwert für den Rohwert $13824$.',
                    h: 'Linear: $w = w_{\\min} + \\dfrac{\\text{raw}-\\text{raw}_{\\min}}{\\text{raw}_{\\max}-\\text{raw}_{\\min}}(w_{\\max}-w_{\\min})$. Bei Siemens: <code>NORM_X</code> normiert auf 0..1, <code>SCALE_X</code> skaliert.',
                    s: '$\\dfrac{13824-0}{27648-0} = 0{,}5$ (NORM_X). SCALE_X auf $0\\ldots 100\\,\\%$: $0{,}5\\cdot 100 = 50\\,\\%$.<br>$\\boxed{w = 50{,}0\\,\\%}$<br>$27648 = 2^{15}-2^{14}\\dots$ ist der Siemens-Nennbereich (entspricht 10 V bzw. 20 mA bei genau Nennwert). <em>Quelle:</em> Berger, Automation mit SIMATIC S7-1500, 5. Aufl. 2017, §6.3 (NORM_X/SCALE_X).'
                },
                {
                    q: 'Implementiere in ST einen rekursiven Glättungsfilter (exponentiell gewichteter gleitender Mittelwert) <code>y := y + alpha*(x - y)</code>. Was bewirkt der Parameter <code>alpha</code> und in welchem Bereich liegt er?',
                    h: '$\\alpha$ ist die Glättungskonstante; kleines $\\alpha$ glättet stärker.',
                    s: 'Der EWMA-Filter $y_k = y_{k-1} + \\alpha(x_k - y_{k-1})$ entspricht einem zeitdiskreten PT1-Glied mit $\\alpha = \\dfrac{T_a}{\\tau + T_a}$ ($T_a$ Abtastzeit, $\\tau$ Zeitkonstante), $\\alpha \\in (0,1]$.' +
                        code('ST', 'VAR y : REAL; CONSTANT alpha : REAL := 0.1; END_VAR\ny := y + alpha * (x - y);') +
                        'Kleines $\\alpha$ (z.B. 0,1) → starke Glättung, träge Reaktion; $\\alpha = 1$ → keine Glättung (<code>y = x</code>).<br>$\\boxed{0 < \\alpha \\leq 1,\\ \\text{PT1-Verhalten}}$<br><em>Quelle:</em> Åström/Wittenmark, Computer-Controlled Systems, 3rd ed. (1997), §3.'
                },
                {
                    q: 'Begründe, warum ein <code>TP</code> (Impulsglied) <em>nicht retriggerbar</em> ist, und was das für eine schnelle Folge von <code>IN</code>-Flanken bedeutet.',
                    h: 'Während des laufenden Impulses werden neue Flanken ignoriert.',
                    s: 'Nach der ersten steigenden <code>IN</code>-Flanke läuft der Impuls für <code>PT</code> unabhängig weiter. Treffen während dieser Zeit weitere steigende Flanken ein, werden sie <strong>ignoriert</strong> — der Impuls wird nicht verlängert oder neu gestartet. Folge: bei Flankenabständen $< PT$ erscheint am Ausgang ein <em>einzelner</em> durchgehender Impuls statt mehrerer. Für Verlängerung bei jeder Flanke braucht man eine retriggerbare Eigenimplementierung (Timer bei jeder Flanke neu starten).<br>$\\boxed{\\text{TP: fester Impuls PT, neue Flanken ignoriert}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.5 (TP).'
                },
                {
                    q: 'Beim Auf-/Abwärtszähler <code>CTUD</code> — was bewirkt der Eingang <code>LD</code> im Unterschied zu <code>R</code>?',
                    h: '<code>R</code> setzt auf 0, <code>LD</code> lädt den Vorgabewert.',
                    s: '<code>R := TRUE</code> setzt <code>CV := 0</code> (Reset). <code>LD := TRUE</code> lädt <code>CV := PV</code> (Preset/Load) — nützlich, um beim Abwärtszählen von einem Sollwert zu starten. Bei gleichzeitig aktivem <code>R</code> und <code>LD</code> hat <code>R</code> Vorrang (Reset dominiert).<br>$\\boxed{\\text{R: CV:=0; LD: CV:=PV}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §5.5.2.4 Counters (CTUD).'
                },
                {
                    q: 'Wozu dient der Deklarationsbereich <code>VAR_IN_OUT</code> und worin unterscheidet er sich von <code>VAR_INPUT</code>?',
                    h: 'Stichwort: Übergabe per Referenz (by reference).',
                    s: '<code>VAR_IN_OUT</code>-Parameter werden <strong>per Referenz</strong> übergeben: der FB liest <em>und</em> schreibt direkt die Variable des Aufrufers, Änderungen wirken nach außen. <code>VAR_INPUT</code> hingegen wird per Wert (Kopie) übergeben und im FB nur gelesen. <code>VAR_IN_OUT</code> eignet sich für große Strukturen/Arrays (keine Kopie nötig) und für FBs, die ihren Eingang modifizieren (z.B. ein Sortier-FB auf einem Array).<br>$\\boxed{\\text{VAR\\_IN\\_OUT = by reference (lesen+schreiben)}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.2 (VAR_IN_OUT).'
                },
                {
                    q: 'Was bewirken <code>ADR</code> und der Dereferenzierungsoperator <code>^</code> (Pointer, CODESYS-Erweiterung zu IEC 61131-3)?',
                    h: '<code>ADR</code> liefert die Adresse, <code>^</code> greift auf den Inhalt zu.',
                    s: '<code>pt := ADR(var);</code> weist <code>pt</code> (Typ <code>POINTER TO ...</code>) die Speicheradresse von <code>var</code> zu. <code>pt^</code> dereferenziert — liest/schreibt den Inhalt an dieser Adresse. Pointer ermöglichen generische FBs und effizienten Zugriff, sind aber unsicher (kein Bounds-Check) — fehlerhafte Pointer können beliebigen Speicher überschreiben. IEC 61131-3 Ed. 3 kennt <code>REF_TO</code>/<code>REF=</code> als typsicherere, genormte Variante.<br>$\\boxed{\\text{ADR: Adresse; \\^{}: Inhalt}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.5.2 (reference types); CODESYS-Dokumentation (POINTER/ADR).'
                },
                {
                    q: 'Was ist im SFC/AS eine <strong>Simultanverzweigung</strong> (parallele Verzweigung), und woran erkennt man sie grafisch?',
                    h: 'Doppelte horizontale Linie; mehrere Zweige werden gleichzeitig aktiv.',
                    s: 'Eine Simultanverzweigung (parallel branch) wird durch eine <strong>doppelte horizontale Linie</strong> dargestellt. Bei Erfüllung der <em>einen</em> gemeinsamen Transition werden <strong>alle</strong> parallelen Zweige gleichzeitig aktiviert und laufen nebenläufig. Die Zusammenführung (Synchronisation) wartet, bis <em>alle</em> Zweige ihren Endschritt erreicht haben, bevor die nachfolgende Transition prüfen darf.<br>$\\boxed{\\text{Parallel: doppelte Linie, alle Zweige aktiv}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.2.3 (simultaneous sequences).'
                },
                {
                    q: 'Worin unterscheidet sich im SFC eine <strong>Alternativverzweigung</strong> von der Simultanverzweigung?',
                    h: 'Einfache horizontale Linie; genau ein Zweig wird gewählt.',
                    s: 'Die Alternativverzweigung (selection/divergence) wird durch eine <strong>einfache horizontale Linie</strong> dargestellt. Nur der Zweig wird aktiv, dessen Transition <em>zuerst/als einzige</em> erfüllt ist — die Zweige sind <strong>einander ausschließend</strong>. Der Programmierer muss disjunkte Transitionsbedingungen sicherstellen (sonst entscheidet die hersteller­definierte Auswertereihenfolge, typischerweise links→rechts).<br>$\\boxed{\\text{Alternativ: einfache Linie, genau ein Zweig}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.2.3 (selection of sequences).'
                },
                {
                    q: 'Was liefert die implizite Schrittvariable <code>Schritt.T</code> (bzw. <code>Step.T</code>) in einem SFC, und wofür nutzt man sie?',
                    h: 'Aktivzeit des Schritts als <code>TIME</code>.',
                    s: 'Zu jedem Schritt gehört implizit ein Aktivflag <code>Schritt.X</code> (BOOL) und die <strong>Aktivzeit</strong> <code>Schritt.T</code> (TIME) — die Dauer, seit der der Schritt aktiv ist. Damit lassen sich zeitabhängige Transitionen formulieren, z.B. <code>Schritt5.T &gt; T#3s</code> als Weiterschaltbedingung (Timeout/Mindestverweildauer), ohne separaten <code>TON</code>.<br>$\\boxed{\\text{Schritt.T = Aktivzeit (TIME)}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.2.1 (step flags/elapsed time).'
                },
                {
                    q: 'Was liefert <code>LIMIT(MN := 0, IN := 150, MX := 100)</code> nach IEC 61131-3?',
                    h: '<code>LIMIT</code> begrenzt <code>IN</code> auf das Intervall $[MN, MX]$.',
                    s: '<code>LIMIT</code> klemmt: Ergebnis $= \\min(\\max(IN, MN), MX) = \\min(\\max(150,0),100) = \\min(150,100) = 100$.<br>$\\boxed{\\text{LIMIT(0, 150, 100)} = 100}$<br>Praxis: Stellgrößen-/Sollwertbegrenzung vor der Ausgabe an einen Aktor. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.1 (LIMIT).'
                },
                {
                    q: 'Was liefert <code>MUX(K := 2, IN0 := 10, IN1 := 20, IN2 := 30, IN3 := 40)</code>?',
                    h: '<code>MUX</code> wählt anhand des ganzzahligen Selektors <code>K</code> den Eingang <code>IN(K)</code> (0-basiert).',
                    s: 'Mit $K=2$ wird <code>IN2 = 30</code> durchgeschaltet.<br>$\\boxed{\\text{MUX(2, ...)} = 30}$<br>Im Unterschied zu <code>SEL</code> (binär, BOOL-Selektor) erlaubt <code>MUX</code> $n$ Quellen mit ganzzahligem Selektor. Ungültiges <code>K</code> ist hersteller­abhängig zu behandeln. <em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.1 (MUX selection function).'
                }
            ],

            // ============================== LEVEL 3 — Expertise ==============================
            [
                {
                    q: 'Welcher semantische Unterschied besteht zwischen <code>VAR</code>, <code>VAR_RETAIN</code> und <code>VAR_PERSISTENT</code>? Welcher Variablentyp eignet sich für (a) einen Betriebsstundenzähler, (b) einen Maschinen-Seriennummern-Counter? Begründe.',
                    h: 'Stichworte: Warmstart vs. Kaltstart vs. Power-On, RAM-gepuffert vs. Flash.',
                    s: '<table class="text-xs my-2"><thead><tr><th class="pr-3">Scope</th><th class="pr-3">Power-Off</th><th class="pr-3">Warmstart</th><th>Kaltstart</th></tr></thead><tbody><tr><td><code>VAR</code></td><td>verloren</td><td>verloren</td><td>verloren</td></tr><tr><td><code>VAR_RETAIN</code></td><td>erhalten</td><td>erhalten</td><td>verloren</td></tr><tr><td><code>VAR_PERSISTENT</code></td><td>erhalten</td><td>erhalten</td><td>erhalten</td></tr></tbody></table>(IEC 61131-3 Ed. 3 unterscheidet RETAIN [batteriegepufferter SRAM oder NVRAM] und PERSISTENT [auf nicht-flüchtigen Speicher geschrieben, übersteht auch Programmdownload &mdash; bei vielen Herstellern wie CODESYS in einer separaten <code>VAR_GLOBAL PERSISTENT RETAIN</code>-Liste].)<br><br>(a) Betriebsstundenzähler: muss Power-Off und Warmstart überleben &mdash; <code>RETAIN</code> reicht typischerweise. Bei Wunsch, dass auch nach Programmupload nicht zurückgesetzt wird → <code>PERSISTENT RETAIN</code>.<br>(b) Seriennummern-Counter: muss <em>auch</em> Kaltstart und Reload überleben → <code>PERSISTENT</code> (mit RETAIN) ist Pflicht.<br>$\\boxed{(a)\\;\\text{RETAIN},\\quad (b)\\;\\text{PERSISTENT (RETAIN)}}$'
                },
                {
                    q: 'Bei einer SPS mit Zykluszeit $T_\\text{cycle} = 10\\,\\text{ms}$ und einer Eingangsfilterzeit $T_\\text{filter} = 3\\,\\text{ms}$ wird ein digitales Signal mit Pulsbreite $T_\\text{p} = 8\\,\\text{ms}$ erfasst. Wie groß ist die Worst-Case-Reaktionszeit $T_\\text{react}$ vom physikalischen Signalwechsel bis zum gesetzten Ausgang? Wird der Puls garantiert erkannt?',
                    h: 'Worst Case: Signalflanke trifft <em>kurz nach</em> dem Lesefenster; ein vollständiger Zyklus geht vorbei, dann wird gelesen, dann verarbeitet, dann geschrieben.',
                    s: 'PLC-Zyklus: <em>Read Inputs</em> → <em>Execute</em> → <em>Write Outputs</em>. Worst-Case-Reaktionszeit:<br>$$T_\\text{react} = T_\\text{filter} + 2\\,T_\\text{cycle} + T_\\text{out,delay}$$<br>(Ein Zyklus, weil das Signal das aktuelle Lesefenster knapp verpasst hat; ein weiterer Zyklus für die Ausführung und das Schreiben.)<br>Mit $T_\\text{out,delay} \\approx 0$ (digitaler Halbleiterausgang):<br>$T_\\text{react} \\approx 3\\,\\text{ms} + 2 \\cdot 10\\,\\text{ms} = 23\\,\\text{ms}.$<br><br><strong>Pulserkennung</strong>: Der Puls muss mindestens <em>einen</em> Lese-Tick treffen. Notwendige Bedingung: $T_\\text{p} > T_\\text{filter} + T_\\text{cycle}$ &mdash; konservativ. Mit $T_\\text{p} = 8\\,\\text{ms}$ und $T_\\text{filter}+T_\\text{cycle} = 13\\,\\text{ms}$ ist die Erkennung <strong>nicht garantiert</strong>: ein 8-ms-Puls, der unmittelbar nach dem Lesefenster anliegt, ist beim nächsten Lesefenster (10&nbsp;ms später) bereits abgefallen, und die Eingangsfilterung benötigt zudem 3&nbsp;ms stabile Anliegen.<br>Abhilfe: Hardware-Latch (z.B. Pulsverlängerung), kürzere Zykluszeit, oder Hochgeschwindigkeits-Inputs mit eigenem Erfass-IC (Counter-Modul, Interrupt-Input).<br>$\\boxed{T_\\text{react} \\approx 23\\,\\text{ms};\\;\\text{Erkennung NICHT garantiert}}$'
                },
                {
                    q: 'Eine Selbsthaltung ist im KOP fehlerhaft kodiert &mdash; finde den Fehler und korrigiere:' +
                        code('KOP (fehlerhaft)', '|--[ Stop ]--+--[ Start ]--+--( M )--|\n|             |             |\n|             +--[  M   ]----+'),
                    h: 'Welche Bedingungen sollen Stopp <em>vorrangig</em> machen? Ist Stopp hier ein Schließer oder Öffner?',
                    s: 'Im gezeigten Schaltbild ist <code>Stop</code> als <em>Schließer</em> ausgeführt. Damit muss <code>Stop = TRUE</code> sein, damit überhaupt Strom fließt &mdash; das ist <strong>nicht</strong> drahtbruchsicher und auch logisch falsch, weil ein gedrückter Stopp die Sprosse aktivieren würde, statt sie zu unterbrechen.<br><br><strong>Korrekt:</strong> Stopp als <em>Öffner</em> <code>[/Stop]</code> in Reihe schalten, die Stop-Logik <em>nach</em> der Halte-OR-Verzweigung platzieren, sodass Stopp die ganze Sprosse unterbricht:<br>' +
                        code('KOP (korrekt)', '|--[ Start ]--+--[/Stop]--( M )--|\n|             |\n|--[  M   ]---+') +
                        '<strong>Hardware-Verdrahtung:</strong> der reale Stopp-Taster wird als <em>NC</em> verdrahtet. Drahtbruch im Stopp-Kreis ⇒ Eingang fällt auf FALSE ⇒ <code>/Stop</code> im KOP wird FALSE-invertiert zu TRUE-wirksam-blocking ⇒ Maschine geht aus. <em>Fail-safe</em>.<br>$\\boxed{M := (\\text{Start} \\lor M) \\land \\lnot \\text{Stop}_\\text{eingang}}$'
                },
                {
                    q: 'In einer Pumpensteuerung wird folgender Code in jedem Zyklus ausgeführt:' +
                        code('ST', 'IF Level > High_SP THEN\n  Pump := FALSE;\nELSIF Level < Low_SP THEN\n  Pump := TRUE;\nEND_IF;') +
                        'Was passiert, wenn $\\text{Low\\_SP} < \\text{Level} < \\text{High\\_SP}$? Welche essenzielle Eigenschaft hat dieser Regler? Wie würde reines $\\text{Pump} := (\\text{Level} < \\text{SP})$ sich davon unterscheiden?',
                    h: 'Stichwort: Hysterese, Schalt-Schutz vor Flattern.',
                    s: 'Im Bereich $\\text{Low\\_SP} < \\text{Level} < \\text{High\\_SP}$ wird keiner der beiden Zweige ausgeführt &mdash; <code>Pump</code> behält seinen <strong>vorherigen Wert</strong> (implizite Selbsthaltung durch fehlenden <code>ELSE</code>-Pfad). Das ist Absicht: dies ist eine <strong>Zweipunkt-Regelung mit Hysterese</strong> (auch Bang-Bang mit Totband).<br><br><strong>Charakteristik:</strong><ul><li>Pumpe fällt erst aus, wenn $\\text{Level}$ <em>über</em> <code>High_SP</code> steigt.</li><li>Pumpe schaltet erst ein, wenn $\\text{Level}$ <em>unter</em> <code>Low_SP</code> fällt.</li><li>Hysterese-Breite $\\Delta = \\text{High\\_SP} - \\text{Low\\_SP}$ verhindert Schalt-Flattern um den Sollwert.</li></ul>Reine Variante <code>Pump := Level < SP;</code> hätte <em>keine</em> Hysterese und würde im Mess-Rauschen $n$-mal pro Sekunde schalten &mdash; Schütz/Relais würden binnen Stunden zerstört.<br><br>Implizit hängt die Korrektheit hier davon ab, dass <code>Pump</code> als <code>VAR</code> (statisch, nicht <code>VAR_TEMP</code>) deklariert ist.<br>$\\boxed{\\text{Zweipunkt-Regelung mit Hysterese }\\Delta = H - L}$'
                },
                {
                    q: 'Implementiere in ST einen <strong>diskreten PI-Regler</strong> mit Anti-Windup (Clamping) gemäß der Differenzengleichung<br>$u_k = K_p\\,e_k + K_i T_a \\sum e_i$,&nbsp;&nbsp; mit $u_\\text{min} \\leq u_k \\leq u_\\text{max}$.<br>Eingänge: <code>SP, PV : REAL</code>; Parameter <code>Kp, Ki, Ta, u_min, u_max</code>; Ausgang <code>u : REAL</code>. Erkläre den Anti-Windup-Mechanismus.',
                    h: 'Anti-Windup-Clamping: Integrator nur dann weiterintegrieren, wenn $u$ <em>nicht</em> sättigt oder die Integration aus der Sättigung herausführt.',
                    s: 'Implementierung:<br>' +
                        code('ST', 'FUNCTION_BLOCK PI_AW\nVAR_INPUT\n  SP, PV     : REAL;\n  Kp, Ki, Ta : REAL;\n  u_min, u_max : REAL;\nEND_VAR\nVAR_OUTPUT\n  u : REAL;\nEND_VAR\nVAR\n  I_sum : REAL := 0.0;   // Integratorzustand (statisch!)\nEND_VAR\nVAR_TEMP\n  e, u_unsat, dI : REAL;\nEND_VAR\n\ne       := SP - PV;\ndI      := Ki * Ta * e;\nu_unsat := Kp * e + I_sum + dI;\n\n// Clamping + bedingte Integration\nIF (u_unsat > u_max) AND (e > 0.0) THEN\n  u := u_max;            // gesättigt, e würde I weiter aufpumpen → I einfrieren\nELSIF (u_unsat < u_min) AND (e < 0.0) THEN\n  u := u_min;            // symmetrisch unten\nELSE\n  I_sum := I_sum + dI;   // nur hier integrieren\n  u := LIMIT(u_min, Kp*e + I_sum, u_max);\nEND_IF;') +
                        '<strong>Mechanismus:</strong> Sobald $u$ am Stellanschlag (<code>u_max</code>/<code>u_min</code>) hängt und der Regelfehler weiter in dieselbe Richtung treibt, würde der Integrator monoton anwachsen (<em>Windup</em>) &mdash; bei Vorzeichenwechsel von $e$ würde der Regler erst nach langer Entladezeit reagieren.<br>Das Clamping friert <code>I_sum</code> in dieser Konfiguration ein. Sobald $e$ das Vorzeichen wechselt (Regler will herausfahren), wird wieder integriert.<br>Alternativen: <em>Back-Calculation</em> $I_{k+1} = I_k + K_i T_a e_k - T_t (u - u_\\text{unsat})$, oder <em>Conditional Integration</em>.<br>$\\boxed{u = \\text{LIMIT}(u_\\text{min},\\, K_p e + I_\\text{sum},\\, u_\\text{max})\\text{ mit eingefrorenem }I\\text{ in Sättigung}}$'
                },
                {
                    q: 'In einer Schrittkette (SFC/AS) mit Schritten $S_1 \\to S_2$ und Transition <code>T1: (Sensor AND NOT Fault)</code>: warum darf eine Aktion <em>im Schritt</em> $S_1$ nicht selbst <code>Sensor := TRUE</code> setzen, kurz bevor das Programm in den nächsten Zyklus geht? Was ist das allgemeine Prinzip?',
                    h: 'Stichwort: Determinismus, Schreib/Lese-Reihenfolge, Schritt-Aktion vs. Transition.',
                    s: 'In IEC 61131-3 SFC werden Aktionen eines aktiven Schritts <em>vor</em> der Transition-Auswertung des selben Zyklus ausgeführt (Action Qualifier wie <code>N</code>, <code>P0/P1</code>). Wenn $S_1$ selbst <code>Sensor := TRUE</code> setzt, ist <code>T1</code> noch im selben Zyklus erfüllt &mdash; der Schritt wird nach exakt einem Zyklus weitergeschaltet, <em>unabhängig</em> davon, ob der externe Geber wirklich getriggert hat. Das ist:<ul><li><strong>logisch falsch</strong> (Sensor ist Eingangsgröße, nicht Logikvariable),</li><li><strong>nicht determinismus-konform</strong> beim Übergang: bei Reaktivierung von $S_1$ käme $T_1$ schon im allerersten Zyklus erneut zustande (SFC verlangt typischerweise mindestens einen Zyklus Verweildauer mit erfüllter Transition).</li></ul><strong>Allgemeines Prinzip (Trennung Steuerung/Sensorik):</strong> Eingangsvariablen werden <em>nur</em> aus dem PII (Prozess-Eingangs-Image) gelesen, niemals von der Anwenderlogik überschrieben. Sollen interne Bedingungen Transitionen treiben, gehören sie als eigene <code>Flag</code>-Variablen modelliert &mdash; nicht als verkleideter "Sensor".<br>Korrekt:<br>' +
                        code('ST/SFC', '// Schritt S1 setzt Flag\nN  S1.action :=  Done := TRUE;\n// Transition T1 prüft Flag\nT1: Done AND NOT Fault') +
                        '$\\boxed{\\text{Eingänge } \\Rightarrow \\text{nur lesen};\\;\\text{Schritt-Aktionen schreiben Outputs/Flags, keine Sensoren}}$'
                },
                {
                    q: 'Welcher subtile Bug versteckt sich im folgenden ST-Code, wenn er als <code>FUNCTION_BLOCK</code> instanziiert wird, der pro Zyklus mehrfach aufgerufen werden kann? Wie behebt man ihn?' +
                        code('ST', 'FUNCTION_BLOCK Edge_Counter\nVAR_INPUT  X : BOOL; END_VAR\nVAR_OUTPUT N : INT; END_VAR\nVAR\n  X_prev : BOOL;\nEND_VAR\n\nIF X AND NOT X_prev THEN\n  N := N + 1;\nEND_IF;\nX_prev := X;'),
                    h: 'Was passiert, wenn die <em>gleiche Instanz</em> innerhalb eines Zyklus von zwei verschiedenen Stellen aufgerufen wird?',
                    s: 'Der FB ist korrekt für <strong>einen Aufruf pro Zyklus</strong>. Mehrfachaufruf <em>derselben Instanz</em> im selben Zyklus zerstört die Flankenerkennung:<ul><li>Aufruf 1 mit $X=\\text{TRUE}$, $X_\\text{prev,0}=\\text{FALSE}$ → $N$ wird inkrementiert, $X_\\text{prev}:=\\text{TRUE}$.</li><li>Aufruf 2 (selbe Instanz, selber Zyklus) mit $X=\\text{TRUE}$ → Bedingung nicht mehr erfüllt → $N$ unverändert.</li></ul>Bei zwischenzeitlich geändertem $X$ kann es zu <em>doppeltem Zählen</em> oder verlorenen Flanken kommen.<br><br><strong>Behebung:</strong> entweder die Anwendung darauf festlegen, dass jede Instanz exakt einmal pro Zyklus aufgerufen wird (gängige IEC-Konvention für Stateful FBs wie <code>TON</code>, <code>R_TRIG</code>) &mdash; oder das interne Update <em>einmal pro Zyklus</em> kapseln und den FB selbst nur Lese-Schnittstelle bieten:<br>' +
                        code('ST', 'METHOD Sample : BOOL  // einmal pro Zyklus aufrufen\n  IF X AND NOT X_prev THEN N := N + 1; END_IF;\n  X_prev := X;\nEND_METHOD') +
                        'Doku: <em>"This FB must be called exactly once per task cycle"</em> ist die Standard-Disclaimer-Formulierung in IEC-Bibliotheken (z.B. CODESYS Util-FBs).<br>$\\boxed{\\text{FBs mit Flanken-/Zeitlogik: 1 Aufruf pro Zyklus pro Instanz}}$'
                },
                {
                    q: 'In einer Multitasking-SPS schreiben zwei Tasks (T_fast 1&nbsp;ms, T_slow 50&nbsp;ms) auf <em>dieselbe</em> globale Variable <code>VAR_GLOBAL Counter : DINT;</code> mittels <code>Counter := Counter + 1;</code>. Erläutere die Race-Condition und nenne die zwei IEC-konformen Standardlösungen.',
                    h: 'Atomarität: Read-Modify-Write ist <em>nicht</em> atomar &mdash; auch eine 32-bit-Lese-/Schreib-Operation kann durch Task-Preemption unterbrochen werden.',
                    s: '<strong>Race-Condition:</strong> Die Sequenz <code>Counter := Counter + 1;</code> zerfällt in (1) Lesen, (2) Inkrementieren, (3) Schreiben. Wenn die schnelle Task während (1)–(3) der langsamen Task läuft, kann sie zwischen (1) und (3) der langsamen Task einen Inkrement durchführen, der dann von der langsamen Task <em>überschrieben</em> wird → verlorene Inkremente.<br>Die Atomarität einer einzelnen 32-bit-Schreib-/Leseoperation auf <code>DINT</code> ist <em>plattformabhängig</em> (auf 32-bit-CPUs typischerweise atomar, auf 16-bit-PLCs nicht); IEC garantiert sie nicht.<br><br><strong>Lösung 1 &mdash; Synchronisation:</strong> Hersteller-spezifische Semaphore (CODESYS: <code>SysSemEnter</code>/<code>SysSemLeave</code>; B&amp;R: <code>tcCriticalSection</code>). Innerhalb des Critical Sections wird der RMW geschützt. Nachteil: blockiert die schnelle Task, kann Echtzeitverhalten verschlechtern.<br><br><strong>Lösung 2 &mdash; Single-Writer-Pattern:</strong> Genau eine Task <em>schreibt</em> <code>Counter</code>; die andere triggert nur über separate Flag-/Event-Variablen, die der Single-Writer beim nächsten Zyklus konsumiert. Dies ist in Industrie-Umgebungen die bevorzugte Lösung &mdash; deterministisch, lock-frei, einfach diagnostizierbar:<br>' +
                        code('ST', '// in T_fast (high prio): nur Event setzen\nIF trigger THEN inc_request := TRUE; END_IF;\n\n// in T_slow (low prio, Single Writer):\nIF inc_request THEN\n  Counter      := Counter + 1;\n  inc_request  := FALSE;   // Event quittieren\nEND_IF;') +
                        'Risiko: bei dichten Events innerhalb eines T_slow-Zyklus gehen Anforderungen verloren &mdash; in dem Fall stattdessen einen <code>UDINT</code>-Zähler in der schnellen Task führen und in der langsamen die Differenz auswerten.<br>$\\boxed{\\text{RMW über Tasks ist nicht atomar} \\Rightarrow \\text{Critical Section ODER Single-Writer-Pattern}}$'
                },
                {
                    q: 'In FUP/FBD: erkläre, warum die Reihenfolge der Netze (Networks) <em>auf derselben POU</em> deterministisch das Ergebnis bestimmt, und konstruiere einen Fall, in dem dasselbe FUP-Netz bei umgekehrter Auswertereihenfolge ein anderes Ergebnis liefert.',
                    h: 'IEC 61131-3 garantiert: Netze einer POU werden in textueller/grafischer Reihenfolge oben→unten ausgewertet.',
                    s: 'IEC 61131-3 §6.5 spezifiziert: innerhalb einer POU werden Anweisungen/Netze sequenziell in der Reihenfolge ihrer Notation ausgewertet (textuell oder grafisch oben→unten, links→rechts). Das ist <em>nicht</em> wie bei einem digitalen Schaltnetz parallel.<br><br><strong>Beispiel mit Reihenfolge-Abhängigkeit:</strong>' +
                        code('FUP — Variante A (oben → unten)', 'Netz 1:  Y := A AND X;\nNetz 2:  X := B OR Y;') +
                        code('FUP — Variante B (vertauscht)', 'Netz 1:  X := B OR Y;\nNetz 2:  Y := A AND X;') +
                        'Annahme: $A=\\text{TRUE}, B=\\text{FALSE}$, vor Zyklusbeginn $X=Y=\\text{FALSE}$.<br>Variante A: $Y := A \\land X = \\text{T} \\land \\text{F} = \\text{F}$; danach $X := B \\lor Y = \\text{F} \\lor \\text{F} = \\text{F}$. Ende: $(X,Y)=(F,F)$.<br>Variante B: $X := B \\lor Y_\\text{prev} = F$; $Y := A \\land X = \\text{T}\\land \\text{F} = F$. Ende: $(X,Y)=(F,F)$ &mdash; in diesem speziellen Initialfall gleich.<br><br>Setze nun vor Zyklusbeginn $Y = \\text{TRUE}$ (z.B. aus Vorzyklus):<br>Variante A: $Y := \\text{T}\\land\\text{F} = F$; $X := \\text{F}\\lor\\text{F} = F$. Ende: $(X,Y)=(F,F)$.<br>Variante B: $X := \\text{F}\\lor\\text{T} = T$; $Y := \\text{T}\\land\\text{T} = T$. Ende: $(X,Y)=(T,T)$.<br><br>→ Reihenfolge der Netze ändert das Zyklusergebnis und kann <em>Selbstrückkopplung</em> innerhalb desselben Zyklus etablieren oder unterbrechen. Praktische Konsequenz: Halteschaltungen, Selbstauslöser und Rückkopplungs-FBs müssen mit klarer Reihenfolgensicht entworfen werden &mdash; in der Regel: <em>Update-Stage</em> (Eingänge/Bedingungen) zuerst, <em>Latch-Stage</em> (Halteglieder) danach, <em>Output-Stage</em> zuletzt.<br>$\\boxed{\\text{IEC garantiert sequenzielle Netz-Auswertung; Reihenfolge ist Teil der Spezifikation, nicht Implementierungsdetail}}$'
                },
                {
                    q: 'Begründe, warum der ST-Vergleich <code>IF x = 0.1 THEN ...</code> für <code>x : REAL</code> in der Praxis fast immer ein Bug ist. Wie wertest du IEEE-754-konform sicher? Berechne den Abstand zwischen <code>0.1</code> als <code>REAL</code> (32 bit) und dem mathematischen Wert $\\frac{1}{10}$.',
                    h: 'IEEE-754 Single hat ca. 7 dezimale signifikante Stellen; $0.1$ ist binär nicht endlich darstellbar.',
                    s: '$\\frac{1}{10}$ hat keine endliche Binärdarstellung &mdash; in IEEE-754 single (32 bit) wird $0.1$ auf den nächstgelegenen darstellbaren Wert gerundet:<br>$0.1 \\to 0.100000001490116119384765625$ ($\\approx 0.1 + 1.49\\cdot 10^{-9}$).<br>Der absolute Fehler beträgt also etwa $\\Delta \\approx 1.49 \\cdot 10^{-9}$. Über mehrere Operationen akkumuliert sich der Fehler weiter; der Vergleich auf exakte Gleichheit schlägt deshalb mit hoher Wahrscheinlichkeit fehl, sobald <code>x</code> aus einer Berechnung stammt.<br><br><strong>Sicherer Vergleich:</strong>' +
                        code('ST', 'CONSTANT EPS : REAL := 1.0E-6;   // problemspezifisch wählen\n\n// Absoluter Toleranz-Vergleich (für Werte ähnlicher Größenordnung)\nIF ABS(x - 0.1) < EPS THEN ... END_IF;\n\n// Relativer Toleranz-Vergleich (für stark variierende Beträge)\nIF ABS(x - y) <= EPS * MAX(ABS(x), ABS(y)) THEN ... END_IF;') +
                        '<strong>Wahl von $\\varepsilon$:</strong><ul><li>für <code>REAL</code> (single): $\\varepsilon \\geq 10^{-6}$ als untere Faustregel ($\\sim 10$-fache Maschinengenauigkeit $\\epsilon_\\text{m} \\approx 1.19\\cdot 10^{-7}$).</li><li>für <code>LREAL</code> (double): $\\varepsilon \\geq 10^{-12}$.</li></ul>Praktisch problemspezifisch &mdash; eine Position-Toleranz von 1&nbsp;µm hat andere $\\varepsilon$ als ein Druck-Vergleich in bar.<br>$\\boxed{|x - 0.1|_{\\text{REAL}} \\approx 1.49\\cdot 10^{-9},\\;\\text{daher Toleranzvergleich mit }\\varepsilon}$'
                },
                {
                    q: 'Eine Sicherheitsfunktion soll nach IEC 61508 eine angeforderte Sicherheits-Integritätsstufe von <strong>SIL 2</strong> bei <em>low demand</em> erreichen. Welcher PFD<sub>avg</sub>-Bereich ist gefordert, und wie verhält sich das zur PFH bei <em>high demand</em>?',
                    h: 'IEC 61508 Tab. 2 (low demand) und Tab. 3 (high demand / continuous).',
                    s: 'IEC 61508-1 Tab. 2 (Low Demand): $\\mathrm{PFD_{avg}} \\in [10^{-3}, 10^{-2})$ für SIL 2.<br>IEC 61508-1 Tab. 3 (High Demand / Continuous): $\\mathrm{PFH} \\in [10^{-7}, 10^{-6})\\,h^{-1}$ für SIL 2.<br>Der Faktor 10 zwischen den SIL-Stufen ist innerhalb derselben Tabelle, nicht über die Tabellen hinweg. Beispiel-Architektur für SIL 2: 1oo2-Sensoren mit HFT $\\geq 1$, SFF $\\geq 60\\%$, $T_1 \\leq 1\\,$a (Proof-Test-Intervall), $\\beta \\leq 5\\%$ (Common-Cause-Faktor).<br>$\\boxed{\\text{SIL 2: PFD}_\\text{avg}\\in[10^{-3},10^{-2}),\\;\\text{PFH}\\in[10^{-7},10^{-6})\\,h^{-1}}$<br><em>Quelle:</em> IEC 61508-1:2010 §7.6.2.9, Tabellen 2 und 3.'
                },
                {
                    q: 'Welche Beziehung besteht zwischen <strong>PL</strong> nach ISO 13849-1 und <strong>SIL</strong> nach IEC 62061? Begründe, warum die Zuordnung nicht exakt 1:1 ist.',
                    h: 'PL a..e vs SIL 1..3 (SIL 4 ist im Maschinenbereich praktisch nicht erreichbar).',
                    s: 'Beide Normen geben einen Sicherheitsintegritätslevel für Maschinensicherheits-Funktionen vor, basieren aber auf unterschiedlichen Berechnungsgrundlagen:<br><table class="text-xs my-2"><thead><tr><th class="pr-3">PL (ISO 13849-1)</th><th class="pr-3">PFH-Bereich [1/h]</th><th>SIL (IEC 62061)</th></tr></thead><tbody><tr><td>a</td><td>$[10^{-5}, 10^{-4})$</td><td>&mdash;</td></tr><tr><td>b</td><td>$[3\\cdot 10^{-6}, 10^{-5})$</td><td>1</td></tr><tr><td>c</td><td>$[10^{-6}, 3\\cdot 10^{-6})$</td><td>1</td></tr><tr><td>d</td><td>$[10^{-7}, 10^{-6})$</td><td>2</td></tr><tr><td>e</td><td>$[10^{-8}, 10^{-7})$</td><td>3</td></tr></tbody></table>Die Zuordnung ist nicht 1:1, weil ISO 13849-1 zusätzlich <em>Kategorien</em> (B, 1, 2, 3, 4 — strukturelle Architektur), MTTF<sub>D</sub> und DC<sub>avg</sub> als <em>qualitative</em> Anforderungen einbezieht, während IEC 62061 eine rein quantitative PFH-Berechnung anhand der HW-Architektur (1oo1, 1oo2, 2oo3) verlangt. Eine SIL-2-Funktion kann theoretisch durch eine PL-c-Lösung erreicht werden, wenn deren PFH zufällig im überlappenden Bereich liegt — formal muss aber jede Norm separat erfüllt sein.<br>$\\boxed{\\text{PL d} \\leftrightarrow \\text{SIL 2; PL e} \\leftrightarrow \\text{SIL 3 (über PFH-Bereich, nicht 1:1)}}$<br><em>Quelle:</em> ISO 13849-1:2023 Tab. 4; IEC 62061:2021 Tab. 3.'
                },
                {
                    q: 'Beschreibe das <em>Black-Channel</em>-Konzept von PROFIsafe (IEC 61784-3-3). Welche fünf Maßnahmen im Sicherheits-Frame schützen vor Übertragungsfehlern auf einem unsicheren Bus?',
                    h: 'Sequenznummer, Timeout, CRC, Datenkonsistenz, Kennung.',
                    s: 'Black Channel: der Standard-Feldbus (PROFINET/PROFIBUS) wird als unsicher angesehen. Das Sicherheits-Protokoll legt eine F-PDU mit eigenen Schutzmaßnahmen über die normale Bus-Übertragung:<ol><li><strong>Fortlaufende Sequenznummer</strong> (Consecutive Number) — erkennt Verlust, Wiederholung, Vertauschung.</li><li><strong>Timeout-Überwachung F-WD-Time</strong> — erkennt Verzögerung/Ausfall; bei Überschreitung sicherer Zustand.</li><li><strong>CRC der F-PDU</strong> (mind. 24 bit, Hamming-Distanz $\\geq 4$) — erkennt zufällige und 1-bit-Korruption mit Restfehler $\\leq 10^{-9}$.</li><li><strong>Codename / Kennung F-Adresse</strong> — erkennt Vertauschung (Maskerade) zweier F-Slaves auf demselben Bus.</li><li><strong>Datenkonsistenz</strong> — F-Daten werden atomar (in einem Bus-Zyklus) übertragen, kein Splitting.</li></ol>Diese Maßnahmen liefern den residual Bit Error Rate, mit dem die PFH der F-Kommunikation in die Gesamt-Sicherheitsfunktion einfließt (typisch vernachlässigbar: $< 10^{-10}\\,h^{-1}$).<br>$\\boxed{\\text{Black Channel: Bus bleibt Standard; Sicherheit liegt in der F-PDU}}$<br><em>Quelle:</em> IEC 61784-3-3:2021 Communication profile PROFIsafe, §6 Safety measures.'
                },
                {
                    q: 'Vergleiche <strong>OPC UA Client/Server</strong> und <strong>OPC UA PubSub</strong>: welcher Mechanismus eignet sich besser für (a) eine Vertikale Integration (PLC → MES), (b) eine Maschine-zu-Maschine-Echtzeit-Kommunikation auf einem TSN-Netz?',
                    h: 'C/S: sessionbasiert mit Acknowledgements; PubSub: verbindungslos via UDP-Multicast / MQTT.',
                    s: '<strong>OPC UA C/S</strong> (Part 4): TCP-Session zwischen Client und Server, sicher (Sign+Encrypt), zustandsbehaftet, Subscriptions mit MonitoredItems liefern Updates mit Acknowledgement. Latenz: typisch 10-100 ms; Throughput: durch session-Overhead begrenzt; gut für (a) — vertikale Integration mit niedriger Update-Rate, hohem Sicherheits-Anspruch (X.509-Authentifizierung, Audit).<br><strong>OPC UA PubSub</strong> (Part 14, 2018): Publisher schickt DataSetMessages über UDP-Multicast (UADP) oder Broker (MQTT/AMQP) — keine Session, kein Acknowledgement, sehr niedrige Latenz. Mit Time-Sensitive Networking (TSN, IEEE 802.1) und gPTP-Zeitsynchronisation sind deterministische Zykluszeiten im 100-µs-Bereich erreichbar; gut für (b) — Maschine-zu-Maschine, viele Subscriber, Multicast-Topologie.<br><strong>Faustregel:</strong> C/S für Cloud/MES (Sicherheit, Audit, wenige Knoten); PubSub für Shop-Floor / Field (Echtzeit, viele Knoten, Multicast).<br>$\\boxed{\\text{C/S: vertikal; PubSub: horizontal/TSN}}$<br><em>Quelle:</em> OPC UA Specification Part 4 (Services) und Part 14 (PubSub), OPC Foundation 2018/2022.'
                },
                {
                    q: 'Was unterscheidet die <em>Event-Data-Trennung</em> in IEC 61499 von der zyklischen Ausführung in IEC 61131-3, und welcher Anwendungsbereich profitiert besonders davon?',
                    h: 'IEC 61499: Function Blocks haben Event-Inputs/Outputs zusätzlich zu Data-Inputs/Outputs.',
                    s: '<strong>IEC 61131-3:</strong> Programme laufen rein zyklisch — alle Eingänge werden in jedem Zyklus eingelesen, alle FBs aufgerufen. Die Steuerung ist <em>zentral</em> (eine Task auf einer SPS).<br><strong>IEC 61499:</strong> jeder FB hat <em>Event-Inputs</em> (z.B. <code>REQ</code>, <code>CNF</code>) und <em>Data-Inputs</em>. Events triggern FB-Ausführung; Daten werden <em>nur</em> in den Zyklen aktualisiert, in denen ein Event ankommt. Damit ist die Ausführungsreihenfolge nicht implizit (zyklisch), sondern <em>explizit über Event-Verbindungen</em> festgelegt.<br><strong>Vorteil:</strong> verteilte Steuerung über mehrere Geräte/Netze ("distributed control") — Events können über Netzwerke transportiert werden; jeder FB kann auf einem anderen Knoten laufen. Anwendungsbereich: rekonfigurierbare Anlagen (Industrie 4.0), modulare Produktion (Plug-and-Produce), wo die Maschinen-Topologie zur Laufzeit geändert wird.<br>$\\boxed{\\text{IEC 61131-3: zyklisch, zentral; IEC 61499: event-getrieben, verteilt}}$<br><em>Quelle:</em> IEC 61499-1:2012 §3 Concept; §4 Function block model.'
                },
                {
                    q: 'Implementiere in ST einen Software-Watchdog, der den Sicherheits-Zustand auslöst, wenn ein zyklischer Heartbeat-Zähler (geliefert von einer anderen Steuerung) länger als 100 ms nicht inkrementiert. Diskutiere, warum der Watchdog selbst <em>nicht</em> für SIL ≥ 2 ausreicht.',
                    h: 'Zähler-Wert puffern, Differenz prüfen, TON für Timeout.',
                    s: '<pre class="bg-slate-900 text-slate-100 p-3 text-xs rounded my-2"><code>FUNCTION_BLOCK FB_Heartbeat_WD\nVAR_INPUT\n  HeartbeatRemote : UINT;    // vom Partner alle 20-50 ms inkrementiert\n  Enable          : BOOL;\nEND_VAR\nVAR_OUTPUT\n  Alive           : BOOL;\n  TimeoutFault    : BOOL;\nEND_VAR\nVAR\n  WD_TO        : TON;\n  Edge         : R_TRIG;\n  PrevHB       : UINT;\nEND_VAR\n\n// Flanke bei Zählerwechsel\nEdge(CLK := (HeartbeatRemote &lt;&gt; PrevHB));\nPrevHB := HeartbeatRemote;\n\n// Timer wird durch jede Flanke zurückgesetzt\nWD_TO(IN := NOT Edge.Q AND Enable, PT := T#100ms);\nTimeoutFault := WD_TO.Q;\nAlive        := NOT TimeoutFault;\nEND_FUNCTION_BLOCK</code></pre>Warum nicht SIL ≥ 2 alleine?<ul><li><strong>Common-Cause-Failure:</strong> wenn Sender und Watchdog auf derselben CPU laufen, fällt bei CPU-Stop <em>beides</em> aus — der Watchdog kann den eigenen Fehler nicht melden. Lösung: dedizierte Sicherheits-SPS oder externer HW-Watchdog.</li><li><strong>Diagnose-Abdeckung (DC):</strong> ein reiner Software-Watchdog erkennt nur "Sender steht" — nicht "Sender liefert konstanten falschen Wert" (Maskerade), nicht "Sender liefert verzögert, aber innerhalb 100 ms" (Drift).</li><li><strong>Quervergleich nötig:</strong> für SIL 2 typischerweise 1oo2 mit unabhängiger Validierungslogik und CRC der Heartbeat-Payload.</li></ul>$\\boxed{T_\\text{react} \\leq T_\\text{PT} + T_\\text{cycle}}$<br><em>Quelle:</em> IEC 61508-2:2010 Anhang A (techniques for SIL); IEC 61784-3:2021 §6.4 (E2E-watchdog).'
                },
                {
                    q: 'Eine zyklische Task läuft nominell mit $T_\\text{cycle} = 10\\,\\text{ms}$, beobachtet wurde ein Jitter (Streuung der tatsächlichen Aufrufzeitpunkte) von $\\sigma_J = 0.5\\,\\text{ms}$. Wie wirkt sich der Jitter auf eine darin implementierte zeitdiskrete PI-Reglung mit Integrationsschritt $T_s$ aus, und wie groß ist die relative Verfälschung des I-Anteils?',
                    h: 'Jitter ändert effektives $T_s$ pro Zyklus.',
                    s: 'Der I-Anteil eines diskreten PI-Reglers ist $u_I[k] = u_I[k-1] + K_I \\cdot T_s \\cdot e[k]$. Bei Jitter $\\sigma_J$ schwankt $T_s$ pro Zyklus um seinen Sollwert: $T_s \\to T_s + \\delta_k$ mit $\\mathbb{E}[\\delta_k]=0$ und $\\sigma_\\delta = \\sqrt{2}\\,\\sigma_J$ (zwei Sample-Zeitpunkte gehen in $T_s$ ein).<br>Relative Verfälschung des I-Inkrements je Zyklus: $\\dfrac{\\sigma_\\delta}{T_s} = \\dfrac{\\sqrt{2}\\cdot 0.5\\,\\text{ms}}{10\\,\\text{ms}} \\approx 7{,}1\\,\\%$.<br>Über viele Zyklen mittelt sich der Fehler aus, kurzfristig führt der Jitter zu erhöhter Stellgröße-Varianz und ggf. zu Grenzschwingungen, wenn die Verstärkung $K_I$ aggressiv eingestellt ist. <strong>Abhilfe:</strong> echten $\\Delta t$ pro Zyklus aus einem Hardware-Timer/Counter messen und in die I-Update-Formel einsetzen, statt das nominelle $T_s$ zu verwenden.<br>$\\boxed{\\sigma_{T_s}/T_s \\approx 7{,}1\\,\\%;\\;\\text{Abhilfe: gemessenes }\\Delta t}$<br><em>Quelle:</em> Berger, Automation mit SIMATIC S7-1500, 5. Aufl. Publicis 2017, §3.4 Task-Determinismus; Åström/Wittenmark, Computer-Controlled Systems, 3rd ed. Prentice Hall 1997, §3.3.'
                },
                {
                    q: 'Berechne die CRC-16 eines Modbus-RTU-Frames mit Bytes $\\{\\text{0x01, 0x03, 0x00, 0x00, 0x00, 0x0A}\\}$. Welches Polynom verwendet Modbus, und in welcher Bit-Reihenfolge wird das CRC angehängt?',
                    h: 'Modbus-RTU: $x^{16}+x^{15}+x^2+1$, reflektiert → Polynom 0xA001, Init 0xFFFF.',
                    s: 'Modbus-RTU verwendet das Polynom $0xA001$ (reflektiert von $0x8005$). Berechnung byte-weise:<br>Init: $\\text{CRC} = 0xFFFF$. Pro Daten-Byte: $\\text{CRC} \\leftarrow \\text{CRC} \\oplus \\text{byte}$, dann 8× rechtsschieben mit Bit-0-Test → wenn 1, $\\text{CRC} \\leftarrow (\\text{CRC} \\gg 1) \\oplus 0xA001$; sonst nur $\\text{CRC} \\gg 1$.<br>Für die Bytes $\\{\\text{0x01, 0x03, 0x00, 0x00, 0x00, 0x0A}\\}$ liefert die Standard-Implementierung $\\text{CRC} = 0xC5CD$.<br>Im Frame wird das CRC als <strong>LSB zuerst</strong> übertragen: $\\ldots\\,0xCD\\,0xC5$ (Low-Byte vor High-Byte). Der Empfänger berechnet das CRC über alle Bytes inklusive empfangenem CRC — Ergebnis muss 0 sein (oder alternativ: er berechnet ohne CRC und vergleicht mit den letzten zwei empfangenen Bytes in LSB-MSB-Reihenfolge).<br>$\\boxed{\\text{CRC-16/Modbus} = 0xC5CD,\\;\\text{Polynom } 0xA001,\\;\\text{LSB first}}$<br><em>Quelle:</em> Modbus over Serial Line Specification V1.02, Modbus Organization 2006, §2.5.1.2 CRC Checking.'
                },
                {
                    q: 'Erkläre, wie <strong>Distributed Clocks (DC)</strong> in EtherCAT funktionieren, und welche Synchronisations-Genauigkeit damit erreichbar ist. Welche Geräte-Hardware ist Voraussetzung?',
                    h: 'ETG.1000-Suite — DC liefert sub-µs-Synchronisation zwischen Slaves.',
                    s: '<strong>Konzept:</strong> Jeder DC-fähige EtherCAT-Slave hat eine 64-bit-Uhr (in ns seit Systemstart, oft 32-bit-Variante in vielen Geräten). Der erste DC-Slave nach dem Master fungiert als <em>Reference Clock</em> (RefClk). Der Master liest beim Initialisieren die lokale Uhr jedes Slaves <em>im Vorbei-Lauf des EtherCAT-Frames</em> aus und kompensiert:<ol><li><strong>Propagation Delay Measurement:</strong> der Frame durchläuft die Kette einmal hin, einmal zurück; pro Port wird der Rundlauf gemessen → Hardware-Delay je Link bekannt.</li><li><strong>Offset Compensation:</strong> Differenz zur RefClk wird in jedem Slave dauerhaft ausgeglichen.</li><li><strong>Drift Compensation:</strong> während des Betriebs werden Drift-Korrekturen kontinuierlich nachgeführt (Slave-Quartz-Drift typ. ±50 ppm).</li></ol><strong>Genauigkeit:</strong> typisch $\\leq 100\\,\\text{ns}$ Synchronität zwischen beliebigen Slaves, das ist um Größenordnungen besser als Software-PTP/gPTP auf Standard-Ethernet (typ. 1-10 µs).<br><strong>Hardware-Voraussetzung:</strong> EtherCAT-Slave-Controller (ESC) mit DC-Hardware (z.B. ET1100, ET1200, LAN9252) — die DC-Logik ist in Silizium implementiert, daher ist die Genauigkeit unabhängig von Stack-Latenzen. Master benötigt keine Spezial-HW, kann auf Standard-NIC laufen.<br>$\\boxed{\\text{EtherCAT DC: typ. }\\leq 100\\,\\text{ns Slave-zu-Slave-Synchronität}}$<br><em>Quelle:</em> ETG.1000.6 EtherCAT Slave Implementation Guide, EtherCAT Technology Group 2017, §5.4 Distributed Clocks.'
                },
                {
                    q: 'Worin liegt der Fehler im folgenden ST-Codeausschnitt, der einen Zustandsautomaten mit acht Zuständen implementiert? Zeige eine sichere Refactoring-Variante.' +
                        code('ST', 'CASE state OF\n  0: IF startBtn THEN state := 1; END_IF\n  1: outA := TRUE; state := 2;\n  2: IF sensor1 THEN state := 3; END_IF\n  3: outB := TRUE; state := 1;   // (* zurück zu 1, ohne outA zu löschen *)\n  // ...\nEND_CASE'),
                    h: 'Outputs nicht explizit zurückgesetzt → "Hängenbleiben"; Zustand 3 schreibt outB, lässt outA TRUE.',
                    s: '<strong>Bug:</strong> Outputs werden im Zustandsautomaten <em>nur gesetzt</em>, nie zurückgesetzt. Wenn der Automat von Zustand 3 zurück nach 1 springt, bleibt <code>outB := TRUE</code> ungelöscht, im nächsten Durchlauf wird <code>outA := TRUE</code> erneut gesetzt — am Ende sind beide Outputs aktiv, obwohl die Zustandskette das nicht beabsichtigt. Bei einem Aktor (Ventil/Motor) führt das zu unbeabsichtigtem Dauerbetrieb.<br><strong>Refactoring: Moore-/Mealy-Pattern mit expliziter Output-Vorbelegung.</strong> Outputs werden <em>vor</em> dem CASE auf den sicheren Default gesetzt, und im CASE-Zweig nur aktivierende Bedingungen formuliert:<br>' +
                        code('ST', '// 1. Outputs auf sicheren Default\noutA := FALSE;\noutB := FALSE;\n\n// 2. Zustands-abhängige Aktivierung\nCASE state OF\n  0: IF startBtn THEN state := 1; END_IF;\n  1: outA := TRUE;\n     IF sensor1 THEN state := 2; END_IF;\n  2: outA := TRUE;\n     outB := TRUE;\n     IF sensor2 THEN state := 0; END_IF;\nEND_CASE;') +
                        'Vorteil: jeder Zyklus startet mit einer eindeutigen Output-Konfiguration; "Vergessen" eines Reset-Pfads ist unmöglich. Das Pattern entspricht dem klassischen Moore-Automaten (Output ist Funktion des Zustands), implementiert in einem Zyklus-deterministischen Schema.<br>$\\boxed{\\text{Moore-Pattern: erst Defaults, dann zustandsbedingte Aktivierung}}$<br><em>Quelle:</em> John/Tiegelkamp, IEC 61131-3: Programmierung industrieller Automatisierungssysteme, Springer 2010 (2. Aufl.), §7.5 Schrittketten-Pattern.'
                },
                {
                    q: 'Wann ist eine <code>POINTER TO</code>-/<code>REF_TO</code>-Variable in ST ein Problem für die Echtzeit-Sicherheit, und welche zwei Maßnahmen sichern den Zugriff?',
                    h: 'Stichworte: dangling pointer, Initialisierung, Bounds-Check.',
                    s: '<strong>Problem 1 — Dangling Pointer:</strong> ein Pointer kann auf eine FB-Instanz oder einen Array-Bereich verweisen, dessen Lebensdauer kürzer ist als die des Pointers. Beispiel: ein temporärer FB in einer Methode wird nach Methoden-Ende ungültig, ein darauf zeigender <code>REF_TO</code> aber bleibt; nächster Dereferenzierung-Zugriff liest Speichermüll oder schreibt in eine andere Variable. PLCs haben (normalerweise) keinen Garbage Collector und keinen MMU-Schutz.<br><strong>Problem 2 — Bounds-Verletzung:</strong> ein Array-Index-Cast über Pointer-Arithmetik (<code>p^[i]</code> mit i außerhalb des Array-Bereichs) verändert Nachbar-Variablen oder den Stack — Folge sind sporadische, schwer reproduzierbare Fehler.<br><strong>Maßnahme 1 — Bound-Checks:</strong> in zertifizierten Targets (CODESYS SafetyOS, TwinSAFE) sind Pointer-Operationen entweder verboten oder werden zur Laufzeit auf <code>SIZEOF(p^)</code> geprüft; offenes Programmieren mit <code>ADR()</code> und Pointer-Arithmetik sollte nur in unterer Bibliotheksschicht erfolgen.<br><strong>Maßnahme 2 — Initialisierung & Nil-Check:</strong> jede Pointer-Dereferenzierung wird mit <code>IF p &lt;&gt; 0 THEN p^ ... END_IF</code> (bzw. <code>__ISVALIDREF</code> bei CODESYS) abgesichert; vor dem ersten Zugriff wird der Pointer auf eine gültige Adresse oder NULL gesetzt.<br>Für sicherheitsrelevante POUs (SIL/PL) sind Pointer in der Regel verboten oder müssen statisch geprüft sein (z.B. MISRA-konforme Tools).<br>$\\boxed{\\text{Bound-Check + Nil-Check + statische Pointer-Analyse}}$<br><em>Quelle:</em> CODESYS Online-Help, Reference / Pointer Operators; IEC 61508-3:2010 Tab. C.13 (Coding standards).'
                },
                {
                    q: 'Warum darf in einem zyklischen Schrittkettenwerk eine Schrittaktion <em>keine</em> Eingangs-Variable überschreiben (Aktor-Vorgabe, Befehl an Subsystem)? Welche zwei IEC-konformen Alternativen gibt es?',
                    h: 'Eingänge sind read-only Spiegel des PII; Determinismus bricht, wenn Schritt-Output und Eingang denselben Speicherplatz teilen.',
                    s: 'Im IEC-Zyklusmodell sind <em>Eingangs-Variablen</em> die read-only-Sicht auf das PII (siehe Aufgabe Prozess-Abbild). Würde eine Schrittaktion einen Eingang überschreiben, wäre der nächste Vergleich auf dieser Variable nicht mehr deterministisch — und das nächste PII-Update am Zyklusanfang überschreibt den Wert ohnehin wieder. Beide Effekte verletzen die Schrittketten-Semantik.<br><strong>Alternative 1 — Output-Variable schreiben:</strong> die Aktion setzt eine <em>Ausgangsvariable</em> (Bestandteil des PIO), die beim Zyklusende auf den physikalischen Aktor gelegt wird. Die Sensorrückmeldung bleibt im PII unbeeinflusst.<br><strong>Alternative 2 — Sollwert-Variable + separater Subsystem-FB:</strong> die Aktion setzt eine <em>interne Variable</em> <code>Sollwert</code> (kein Eingang, kein Ausgang), und ein parallel laufender Subsystem-FB (Regler, Achssteuerung) liest sie und stellt die physikalische Reaktion her. Vorteil: die Schrittkette ist hardware-unabhängig und kann mit Mock-FBs simuliert werden.<br><strong>Konsequenz für Architektur:</strong> Schrittketten-Schritte sind <em>Sollwertgeber</em>, nicht direkte Aktor-Treiber.<br>$\\boxed{\\text{Schritt → Sollwert/Output; nie zurück auf Eingang}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §8.2 SFC, Anhang B Best Practices.'
                },
                {
                    q: 'Welche $\\mathrm{PFD_{avg}}$- und PFH-Bereiche fordert IEC 61508 für <strong>SIL 3</strong> bei <em>low demand</em> bzw. <em>high demand</em>?',
                    h: 'Jede SIL-Stufe ist um Faktor 10 strenger als die vorige.',
                    s: 'Low Demand (Tab. 2): $\\mathrm{PFD_{avg}}\\in[10^{-4},10^{-3})$. High Demand/Continuous (Tab. 3): $\\mathrm{PFH}\\in[10^{-8},10^{-7})\\,h^{-1}$.<br>$\\boxed{\\text{SIL 3: PFD}_\\text{avg}\\in[10^{-4},10^{-3}),\\ \\text{PFH}\\in[10^{-8},10^{-7})\\,h^{-1}}$<br>SIL 3 verlangt typischerweise HFT $\\geq 1$ (redundante Architektur, z.B. 1oo2/2oo3) und SFF $\\geq 90\\,\\%$. <em>Quelle:</em> IEC 61508-1:2010 Tab. 2 und 3.'
                },
                {
                    q: 'Berechne die Safe Failure Fraction (SFF) für ein Bauteil mit $\\lambda_S=200$ FIT (sicher), $\\lambda_{DD}=150$ FIT (gefährlich erkannt), $\\lambda_{DU}=50$ FIT (gefährlich unerkannt).',
                    h: '$\\mathrm{SFF}=\\dfrac{\\lambda_S+\\lambda_{DD}}{\\lambda_S+\\lambda_{DD}+\\lambda_{DU}}$.',
                    s: '$\\mathrm{SFF}=\\dfrac{200+150}{200+150+50}=\\dfrac{350}{400}=0{,}875=87{,}5\\,\\%$.<br>$\\boxed{\\mathrm{SFF}=87{,}5\\,\\%}$<br>Mit HFT=0 erlaubt $\\mathrm{SFF}\\in[60\\%,90\\%)$ nach IEC 61508-2 Route $1_H$ maximal SIL 2 (Typ B). <em>Quelle:</em> IEC 61508-2:2010 §7.4.4, Tab. 3 (architectural constraints).'
                },
                {
                    q: 'Worin unterscheiden sich die Kategorien <strong>3</strong> und <strong>4</strong> nach ISO 13849-1 bezüglich Fehlertoleranz?',
                    h: 'Beide sind zweikanalig; Unterschied liegt in Fehlererkennung und Fehlerhäufung.',
                    s: 'Beide Kategorien sind zweikanalig mit Diagnose. <strong>Kategorie 3:</strong> ein <em>einzelner</em> Fehler führt nicht zum Verlust der Sicherheitsfunktion, wird aber nicht in jedem Fall erkannt — bei Fehler<em>häufung</em> kann die Funktion verloren gehen. <strong>Kategorie 4:</strong> ein einzelner Fehler wird bei oder vor der nächsten Anforderung <em>erkannt</em>; bleibt er unerkannt, darf die Häufung weiterer Fehler die Sicherheitsfunktion trotzdem nicht aushebeln (höhere DC, $\\mathrm{DC_{avg}}\\geq 99\\,\\%$).<br>$\\boxed{\\text{Kat. 3: 1 Fehler toleriert; Kat. 4: + Fehlererkennung + Häufungsschutz}}$<br><em>Quelle:</em> ISO 13849-1:2023 §6.2.6/§6.2.7 (designated architectures).'
                },
                {
                    q: 'Welche drei Bänder für die mittlere Zeit bis zum gefährlichen Ausfall <code>MTTFd</code> definiert ISO 13849-1 pro Kanal?',
                    h: 'low / medium / high in Jahren.',
                    s: '<strong>low:</strong> $3\\,\\text{a}\\leq \\mathrm{MTTF_d} < 10\\,\\text{a}$. <strong>medium:</strong> $10\\,\\text{a}\\leq \\mathrm{MTTF_d} < 30\\,\\text{a}$. <strong>high:</strong> $30\\,\\text{a}\\leq \\mathrm{MTTF_d} \\leq 100\\,\\text{a}$ (Kappung bei 100 a pro Kanal).<br>$\\boxed{\\text{low }3\\text{-}10,\\ \\text{medium }10\\text{-}30,\\ \\text{high }30\\text{-}100\\ \\text{Jahre}}$<br>Zusammen mit Kategorie und $\\mathrm{DC_{avg}}$ ergibt sich der PL aus dem vereinfachten Verfahren (Bild 5 der Norm). <em>Quelle:</em> ISO 13849-1:2023 §4.5.2, Tab. 5.'
                },
                {
                    q: 'Welche Bänder definiert ISO 13849-1 für den Diagnosedeckungsgrad <code>DCavg</code>?',
                    h: 'none / low / medium / high.',
                    s: '<strong>none:</strong> $\\mathrm{DC}<60\\,\\%$. <strong>low:</strong> $60\\,\\%\\leq \\mathrm{DC}<90\\,\\%$. <strong>medium:</strong> $90\\,\\%\\leq \\mathrm{DC}<99\\,\\%$. <strong>high:</strong> $\\mathrm{DC}\\geq 99\\,\\%$.<br>$\\boxed{\\text{none}<60\\le\\text{low}<90\\le\\text{medium}<99\\le\\text{high}}$<br>$\\mathrm{DC}=\\dfrac{\\sum\\lambda_{DD}}{\\sum\\lambda_D}$ misst, welcher Anteil gefährlicher Ausfälle durch Diagnose erkannt wird. <em>Quelle:</em> ISO 13849-1:2023 §4.5.3, Tab. 6.'
                },
                {
                    q: 'Worin unterscheiden sich <strong>PROFINET RT</strong> und <strong>PROFINET IRT</strong> bezüglich Echtzeitverhalten und Hardware?',
                    h: 'RT priorisiert Standard-Ethernet-Frames; IRT plant Übertragungen hardwareseitig (isochron).',
                    s: '<strong>RT (Real-Time):</strong> nutzt priorisierte Ethernet-Frames (VLAN-Priorität, EtherType 0x8892) über Standard-Switches, umgeht den TCP/IP-Stack. Typische Zykluszeiten 1-10 ms, Jitter im Bereich mehrerer hundert µs — ausreichend für Standard-I/O.<br><strong>IRT (Isochronous Real-Time):</strong> reserviert per Hardware-Scheduling feste Zeitschlitze auf der Leitung (bandwidth reservation); benötigt IRT-fähige Switch-ASICs in jedem Knoten. Zykluszeiten bis $\\leq 250\\,\\mu\\text{s}$ mit Jitter $<1\\,\\mu\\text{s}$ — für Motion Control / Taktsynchronität.<br>$\\boxed{\\text{RT: SW-priorisiert, ms; IRT: HW-geplant, <1\\,\\mu s Jitter}}$<br><em>Quelle:</em> IEC 61784-2 (CP 3/4, 3/5, 3/6 PROFINET); PI System Description 2018.'
                },
                {
                    q: 'Worin unterscheiden sich <strong>Modbus RTU</strong> und <strong>Modbus TCP</strong> bezüglich Übertragung und Fehlersicherung?',
                    h: 'RTU: serielle Leitung mit CRC; TCP: Ethernet mit MBAP-Header.',
                    s: '<strong>Modbus RTU:</strong> serielle Übertragung (RS-485/232), kompaktes Binärformat, Frame-Sicherung über <strong>CRC-16</strong>, Frame-Trennung über Stille von $\\geq 3{,}5$ Zeichen. Adressierung über Slave-Adresse (1 Byte).<br><strong>Modbus TCP:</strong> Kapselung der PDU in TCP/IP (Port 502) mit <strong>MBAP-Header</strong> (Transaction-/Protocol-/Length-/Unit-ID). <em>Kein</em> Modbus-CRC — die Integrität sichert die TCP/IP-Prüfsumme. Mehrere offene Transaktionen über die Transaction-ID möglich.<br>$\\boxed{\\text{RTU: seriell + CRC-16; TCP: Ethernet + MBAP, kein CRC}}$<br><em>Quelle:</em> Modbus Application Protocol Specification V1.1b3 (2012); Modbus Messaging on TCP/IP Implementation Guide V1.0b.'
                },
                {
                    q: 'Worin unterscheiden sich in CANopen <strong>PDO</strong> und <strong>SDO</strong>?',
                    h: 'PDO = Prozessdaten (schnell, unbestätigt); SDO = Servicedaten (bestätigt, Objektverzeichnis).',
                    s: '<strong>PDO (Process Data Object):</strong> überträgt Echtzeit-Prozessdaten in einem einzigen CAN-Frame (max. 8 Byte Nutzlast), unbestätigt (Producer/Consumer), ereignis-/zeit-/sync-getriggert — niedrige Latenz, hoher Durchsatz.<br><strong>SDO (Service Data Object):</strong> Client/Server-Zugriff auf das <em>Objektverzeichnis</em> eines Knotens (Lesen/Schreiben von Parametern), bestätigt (jede Anforderung wird quittiert), für beliebig große Daten (Segment-/Block-Transfer). Höherer Overhead, für Konfiguration statt zyklischen Betrieb.<br>$\\boxed{\\text{PDO: schnell/unbestätigt; SDO: bestätigt/Parameterzugriff}}$<br><em>Quelle:</em> CiA 301 (CANopen Application Layer and Communication Profile) V4.2.'
                },
                {
                    q: 'Welche drei <code>MessageSecurityMode</code>-Stufen kennt OPC UA, und was sichern sie jeweils?',
                    h: 'None, Sign, SignAndEncrypt.',
                    s: '<strong>None:</strong> keine Sicherung — nur in vertrauenswürdigen, abgeschotteten Netzen vertretbar.<br><strong>Sign:</strong> jede Nachricht wird signiert (Integrität + Authentizität), aber im Klartext übertragen — Manipulation wird erkannt, Mitlesen nicht verhindert.<br><strong>SignAndEncrypt:</strong> Nachrichten werden signiert <em>und</em> verschlüsselt (Integrität + Authentizität + Vertraulichkeit). Empfohlen für produktive/öffentliche Netze.<br>Grundlage sind X.509-Zertifikate und Security Policies (z.B. <code>Aes256_Sha256_RsaPss</code>).<br>$\\boxed{\\text{None < Sign < SignAndEncrypt}}$<br><em>Quelle:</em> OPC UA Specification Part 2 (Security Model) und Part 4, OPC Foundation 2022.'
                },
                {
                    q: 'Welche Zustellgarantien geben die MQTT-QoS-Stufen 0, 1 und 2?',
                    h: 'at most once / at least once / exactly once.',
                    s: '<strong>QoS 0 (at most once):</strong> "fire and forget" — keine Bestätigung, Nachricht kann verloren gehen, kein Duplikat.<br><strong>QoS 1 (at least once):</strong> Bestätigung per <code>PUBACK</code>; bei Timeout wird erneut gesendet — Nachricht kommt mindestens einmal, <em>Duplikate möglich</em>.<br><strong>QoS 2 (exactly once):</strong> Vier-Wege-Handshake (<code>PUBLISH/PUBREC/PUBREL/PUBCOMP</code>) — genau einmal, kein Verlust, kein Duplikat; höchster Overhead.<br>$\\boxed{\\text{QoS 0/1/2 = höchstens/mindestens/genau einmal}}$<br>In der Automatisierung (Sparkplug B) ist QoS 1 üblich. <em>Quelle:</em> MQTT Version 5.0, OASIS Standard 2019, §4.3.'
                },
                {
                    q: 'Auf einer CPU laufen drei zyklische Tasks mit Worst-Case-Laufzeiten $C_1=2\\,\\text{ms}$ ($T_1=10\\,\\text{ms}$), $C_2=3\\,\\text{ms}$ ($T_2=20\\,\\text{ms}$), $C_3=5\\,\\text{ms}$ ($T_3=50\\,\\text{ms}$). Ist das System auslastbar?',
                    h: 'Prozessorauslastung $U=\\sum C_i/T_i$; notwendig $U\\leq 1$.',
                    s: '$U=\\dfrac{2}{10}+\\dfrac{3}{20}+\\dfrac{5}{50}=0{,}2+0{,}15+0{,}1=0{,}45=45\\,\\%$.<br>$U=0{,}45<1$ — die <em>notwendige</em> Bedingung ist erfüllt; bei Rate-Monotonic gilt zusätzlich die hinreichende Schranke $U\\leq n(2^{1/n}-1)=0{,}78$ für $n=3$, ebenfalls erfüllt.<br>$\\boxed{U=45\\,\\%\\ \\Rightarrow\\ \\text{planbar (mit Reserve)}}$<br>Reserve ist wichtig für Interrupts, Kommunikation und Jitter. <em>Quelle:</em> Liu &amp; Layland, J. ACM 20 (1973) 46-61 (Rate-Monotonic Scheduling).'
                },
                {
                    q: 'Wie überwacht eine SPS die Einhaltung der Zykluszeit, und was passiert bei einem <em>Task-Overrun</em> (Watchdog-Auslösung)?',
                    h: 'Zyklus-Watchdog vergleicht die tatsächliche Zykluszeit mit einem konfigurierten Maximum.',
                    s: 'Jede zyklische Task hat eine konfigurierte <strong>maximale Zykluszeit</strong> (Watchdog-Zeit). Überschreitet die reale Ausführungszeit diese Schranke (z.B. durch eine zu lange Schleife, blockierende Kommunikation), löst die Laufzeit einen <strong>Task-Overrun</strong> aus. Typische Reaktionen (herstellerabhängig konfigurierbar): Aufruf eines OB für Zeitfehler (Siemens OB80), Übergang in STOP mit sicheren Ausgängen, oder Überspringen des nächsten Zyklus. Der Watchdog schützt vor "stehender" Steuerung und ist Teil des Fail-Safe-Konzepts.<br>$\\boxed{\\text{Overrun} \\Rightarrow \\text{Fehler-OB / STOP / sichere Ausgänge}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.8.2; Berger, S7-1500, 5. Aufl. 2017, §10.3.'
                },
                {
                    q: 'Was bedeutet <strong>Präemption</strong> bei prioritätsbasiertem Multitasking in einer SPS, und welche Task gewinnt bei gleichzeitiger Bereitschaft?',
                    h: 'Höhere Priorität verdrängt niedrigere.',
                    s: 'Bei präemptivem Scheduling unterbricht (verdrängt) eine bereitwerdende Task <strong>höherer</strong> Priorität sofort eine gerade laufende Task <em>niedrigerer</em> Priorität; die unterbrochene Task setzt nach Abarbeitung der höher-prioren Task fort. Eine Interrupt-Task (höchste Prio) verdrängt also die zyklische Hintergrund-Task. Konsequenz: gemeinsame Variablen zwischen Tasks unterschiedlicher Priorität brauchen Schutz (Single-Writer/Critical Section), weil ein Read-Modify-Write mitten unterbrochen werden kann.<br>$\\boxed{\\text{Höhere Priorität verdrängt niedrigere (präemptiv)}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.8.2 (task priority/preemption).'
                },
                {
                    q: 'Diskretisiere einen kontinuierlichen Regler $G(s)$ mit der <strong>Tustin-/Bilinear-Transformation</strong>. Wie lautet die Substitution, und welche Eigenschaft bleibt erhalten?',
                    h: 'Tustin: $s \\leftarrow \\dfrac{2}{T_a}\\dfrac{z-1}{z+1}$.',
                    s: 'Die Tustin-Approximation ersetzt $s$ durch $\\dfrac{2}{T_a}\\dfrac{z-1}{z+1}$ ($T_a$ = Abtastzeit). Sie bildet die gesamte linke $s$-Halbebene auf das Innere des Einheitskreises ab — damit bleibt <strong>Stabilität erhalten</strong> (ein stabiler kontinuierlicher Regler ergibt einen stabilen diskreten). Nachteil: <em>Frequenz-Warping</em> — die Frequenzachse wird nichtlinear gestaucht; per Pre-Warping kann eine Eckfrequenz exakt getroffen werden.<br>$\\boxed{s \\leftarrow \\dfrac{2}{T_a}\\dfrac{z-1}{z+1}\\ (\\text{stabilitätserhaltend})}$<br><em>Quelle:</em> Åström/Wittenmark, Computer-Controlled Systems, 3rd ed. (1997), §8.4.'
                },
                {
                    q: 'Ein zeitdiskreter PT1-Tiefpass wird als <code>y := y + alpha*(x - y)</code> implementiert. Drücke die Zeitkonstante $\\tau$ über $\\alpha$ und die Abtastzeit $T_a$ aus.',
                    h: 'Vergleich mit $y_k=(1-\\alpha)y_{k-1}+\\alpha x_k$ und $\\alpha=\\dfrac{T_a}{\\tau+T_a}$.',
                    s: 'Die Rekursion entspricht einem PT1 mit $\\alpha=\\dfrac{T_a}{\\tau+T_a}$. Nach $\\tau$ aufgelöst:<br>$\\tau=T_a\\cdot\\dfrac{1-\\alpha}{\\alpha}$.<br>Beispiel $T_a=10\\,\\text{ms}$, $\\alpha=0{,}1$: $\\tau=10\\,\\text{ms}\\cdot 9=90\\,\\text{ms}$.<br>$\\boxed{\\tau=T_a\\dfrac{1-\\alpha}{\\alpha}}$<br>Kleines $\\alpha$ → großes $\\tau$ → starke Glättung. <em>Quelle:</em> Åström/Wittenmark, Computer-Controlled Systems, 3rd ed. (1997), §3.'
                },
                {
                    q: 'Was bedeutet das Festkomma-Format <strong>Q15</strong>, und welchen Zahlenbereich deckt es ab? Wie wird $0{,}5$ in Q15 dargestellt?',
                    h: 'Q15: 16-bit-Integer, 15 Nachkommabits; Wert $=\\text{int}/2^{15}$.',
                    s: 'Q15 interpretiert einen 16-bit-Integer als Bruch mit 15 Nachkommastellen: $\\text{Wert}=\\dfrac{\\text{int}}{2^{15}}$. Bereich: $[-1,\\ 1-2^{-15}]=[-1,\\ 0{,}99997]$. $0{,}5$ entspricht $0{,}5\\cdot 32768=16384=\\text{16\\#4000}$.<br>Multiplikation zweier Q15-Werte ergibt Q30 — das Ergebnis muss um 15 Bit zurückgeschoben werden. Festkomma vermeidet FPU-Last und ist deterministisch, erfordert aber Skalierungs-/Überlaufdisziplin.<br>$\\boxed{0{,}5_\\text{Q15}=16384=\\text{16\\#4000}}$<br><em>Quelle:</em> Oppenheim/Schafer, Discrete-Time Signal Processing, 3rd ed. (2010), §6.7.'
                },
                {
                    q: 'Wie erkennt man in ST einen <strong>Überlauf</strong> bei der Addition zweier <code>DINT</code>-Werte $a+b$ ohne Bibliotheksfunktion?',
                    h: 'Vorzeichen-Regel: Überlauf, wenn $a$ und $b$ gleiches Vorzeichen haben, das Ergebnis aber das andere.',
                    s: 'Für Zweierkomplement gilt: ein vorzeichenbehafteter Überlauf tritt genau dann auf, wenn die Summanden <em>gleiches</em> Vorzeichen haben, das Ergebnis aber das <em>entgegengesetzte</em>:' +
                        code('ST', 's := a + b;\noverflow := (a > 0 AND b > 0 AND s < 0)\n        OR (a < 0 AND b < 0 AND s > 0);') +
                        'Addiert man zwei positive Zahlen und erhält ein negatives Ergebnis (oder umgekehrt), ist der Wertebereich gesprengt. Bei vorzeichenlosen Typen prüft man stattdessen <code>s &lt; a</code> (Carry).<br>$\\boxed{\\text{Overflow} = \\text{gleiche Operanden-Vorzeichen} \\neq \\text{Ergebnis-Vorzeichen}}$<br><em>Quelle:</em> Warren, Hacker\'s Delight, 2nd ed. (2013), §2-13 (overflow detection).'
                },
                {
                    q: 'Was bewirkt das Schlüsselwort <code>ABSTRACT</code> bei einem <code>FUNCTION_BLOCK</code> bzw. einer <code>METHOD</code> in IEC 61131-3 Ed. 3, und wie entsteht daraus Polymorphismus?',
                    h: 'Abstrakte FBs/Methoden können nicht instanziiert/aufgerufen werden, ohne überschrieben zu sein.',
                    s: 'Ein <code>ABSTRACT FUNCTION_BLOCK</code> kann <strong>nicht direkt instanziiert</strong> werden; eine <code>ABSTRACT METHOD</code> hat keinen Rumpf und <strong>muss</strong> in einem abgeleiteten FB (<code>EXTENDS</code>) überschrieben werden. Über eine Basis-/Interface-Referenz aufgerufen, wird zur Laufzeit die konkrete Implementierung des tatsächlichen Instanztyps ausgeführt (<em>dynamic dispatch</em>). So lässt sich z.B. ein <code>ARRAY OF I_Drive</code> generisch über <code>drive.Move()</code> ansteuern, unabhängig vom konkreten Antriebstyp.<br>$\\boxed{\\text{ABSTRACT erzwingt Override; Dispatch macht Polymorphismus}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.3/§6.6.5 (OO features).'
                },
                {
                    q: 'Wozu dient der Selbstreferenz-Pointer <code>THIS^</code> in einem objektorientierten IEC-61131-3-Funktionsbaustein?',
                    h: 'Verweis auf die eigene Instanz.',
                    s: '<code>THIS^</code> ist ein Zeiger auf die <em>eigene</em> FB-Instanz. Man nutzt ihn, um (a) eine lokale Variable von einem gleichnamigen Parameter zu unterscheiden (<code>THIS^.x := x;</code>), (b) die eigene Instanz an eine Methode/Funktion weiterzugeben (Registrierung in einer Liste, Callback) oder (c) bei Vererbung in Kombination mit <code>SUPER^</code> eindeutig auf die aktuelle Ebene zu verweisen.<br>$\\boxed{\\text{THIS\\^{} = Referenz auf die eigene Instanz}}$<br><em>Quelle:</em> IEC 61131-3:2013 (Ed. 3) §6.6.3 (methods, THIS); CODESYS Online-Help.'
                },
                {
                    q: 'Welche Ausgänge hat der PLCopen-Motion-FB <code>MC_MoveAbsolute</code>, und welche Bedeutung haben <code>Done</code>, <code>Busy</code> und <code>CommandAborted</code>?',
                    h: 'PLCopen Motion Control Part 1 — Zustandsausgänge eines bewegenden FB.',
                    s: '<code>MC_MoveAbsolute</code> fährt eine Achse auf eine absolute Zielposition. Wichtige Ausgänge: <code>Busy</code> (FB ist aktiv), <code>Active</code> (FB hat die Kontrolle über die Achse), <code>Done</code> (Zielposition erreicht), <code>CommandAborted</code> (Befehl durch einen anderen Motion-FB verdrängt), <code>Error</code>/<code>ErrorID</code>. Genau <em>einer</em> der terminalen Ausgänge <code>Done</code>/<code>CommandAborted</code>/<code>Error</code> wird gesetzt und bleibt gesetzt, solange <code>Execute</code> TRUE ist. Die Achse durchläuft dabei die PLCopen-Zustandsmaschine (<code>Standstill</code> → <code>Discrete Motion</code> → <code>Standstill</code>).<br>$\\boxed{\\text{Done: Ziel erreicht; Busy: aktiv; CommandAborted: verdrängt}}$<br><em>Quelle:</em> PLCopen, Function Blocks for Motion Control Part 1, V2.0 (2011).'
                },
                {
                    q: 'Was beschreibt das <strong>PackML</strong>-Zustandsmodell (ISA-TR88.00.02 / OMAC), und wozu dient es?',
                    h: 'Standardisierte Maschinenzustände und Betriebsarten für die Linienintegration.',
                    s: 'PackML definiert ein herstellerübergreifendes <strong>Zustandsmodell</strong> für Produktionsmaschinen mit (in der Vollausprägung) 17 Zuständen — u.a. <code>Idle</code>, <code>Starting</code>, <code>Execute</code>, <code>Holding</code>/<code>Held</code>, <code>Suspending</code>/<code>Suspended</code>, <code>Stopping</code>/<code>Stopped</code>, <code>Aborting</code>/<code>Aborted</code>, <code>Resetting</code>, <code>Completing</code>/<code>Complete</code> — plus Betriebsarten (<code>Producing</code>, <code>Maintenance</code>, <code>Manual</code>). Ziel: einheitliche Schnittstelle für MES/SCADA, vergleichbare Zustands- und OEE-Daten über verschiedene Maschinen, schnellere Integration.<br>$\\boxed{\\text{PackML: standardisierte Maschinenzustände + Modi}}$<br><em>Quelle:</em> ISA-TR88.00.02 (PackML Implementation Guide); OMAC Packaging Workgroup.'
                },
                {
                    q: 'Welche Konsistenzbedingung muss ein <strong>Online-Change</strong> (Laden bei laufender Steuerung) bezüglich <code>RETAIN</code>-/<code>PERSISTENT</code>-Daten erfüllen, und warum ist das kritisch?',
                    h: 'Das Speicher-Layout der remanenten Variablen darf sich nicht inkonsistent verschieben.',
                    s: 'Beim Online-Change bleibt die Steuerung im RUN, während geänderter Code geladen wird. Kritisch ist das <strong>Speicher-Layout</strong> der remanenten Variablen (<code>RETAIN</code>/<code>PERSISTENT</code>): fügt man eine Variable mittendrin ein oder ändert Typen/Reihenfolge, verschieben sich die Offsets — alte remanente Werte würden dann <em>falschen</em> Variablen zugeordnet (Daten-Drift, analog zu einem verschobenen Index). Laufzeitsysteme prüfen daher per <strong>Prüfsumme/Layout-Vergleich</strong>; passt das Layout nicht, ist nur ein Download (mit Reinitialisierung) möglich. Best Practice: remanente Variablen <em>anhängen</em>, nicht umsortieren.<br>$\\boxed{\\text{Retain-Layout muss stabil bleiben (sonst Daten-Drift)}}$<br><em>Quelle:</em> CODESYS Online-Help (Online Change, Retain Handling); IEC 61131-3:2013 (Ed. 3) §6.5.2.'
                },
                {
                    q: 'Worin unterscheiden sich in EtherNet/IP die <strong>impliziten</strong> (I/O-)Verbindungen von den <strong>expliziten</strong> Nachrichten (CIP)?',
                    h: 'Implicit: zyklische I/O über UDP; Explicit: azyklische Dienste über TCP.',
                    s: '<strong>Implicit Messaging (I/O):</strong> zyklischer Austausch von Prozessdaten über <em>UDP</em> (Class 1, Producer/Consumer), niedrige Latenz, keine Bestätigung pro Telegramm — für Echtzeit-I/O. Mit CIP Sync/CIP Motion auch taktsynchron.<br><strong>Explicit Messaging:</strong> azyklische Anfrage/Antwort über <em>TCP</em> (Class 3 / UCMM) auf das CIP-Objektmodell (Lesen/Schreiben von Attributen, Diagnose, Parametrierung) — bestätigt, höherer Overhead, für Konfiguration und seltene Zugriffe.<br>$\\boxed{\\text{Implicit: UDP zyklisch I/O; Explicit: TCP azyklisch CIP-Dienste}}$<br><em>Quelle:</em> ODVA, The CIP Networks Library Vol. 1 (CIP) und Vol. 2 (EtherNet/IP Adaptation), 2021.'
                },
                {
                    q: 'Was ist eine <strong>2oo3</strong>-Architektur (MooN-Voting), und welchen Vorteil bietet sie gegenüber 1oo2 in Bezug auf <em>Verfügbarkeit</em>?',
                    h: '2oo3: zwei von drei Kanälen müssen übereinstimmen (Mehrheitsentscheid).',
                    s: 'Bei <strong>2oo3</strong> (two-out-of-three) liefern drei unabhängige Kanäle ein Ergebnis; ein Mehrheits-Voter löst aus, wenn <em>mindestens zwei</em> Kanäle es fordern. Das toleriert <strong>einen</strong> beliebigen Kanalfehler (egal ob er fälschlich auslöst oder fälschlich nicht auslöst) ohne Verlust der Funktion und <em>ohne</em> einen Fehlauslöser (Spurious Trip) zu erzwingen.<br>Vorteil gegenüber 1oo2: 1oo2 erhöht zwar die Sicherheit (jeder Kanal kann auslösen), neigt aber zu <em>Fehlauslösungen</em>. 2oo3 verbindet hohe Sicherheit mit <strong>hoher Verfügbarkeit</strong> (kein Spurious Trip bei Einzelfehler) — Standard in der Prozessindustrie für teure Anlagen.<br>$\\boxed{\\text{2oo3: 1 Fehler toleriert, kein Fehl-Trip, hohe Verfügbarkeit}}$<br><em>Quelle:</em> IEC 61508-6:2010 §B.3 (MooN-Architekturen); Smith/Simpson, Safety Critical Systems Handbook, 4th ed. (2016), §8.'
                },
                {
                    q: 'Was unterscheidet <strong>Typ-A</strong>- von <strong>Typ-B</strong>-Bauteilen nach IEC 61508-2, und welche Folge hat das für die SIL-Fähigkeit?',
                    h: 'Typ A: einfach, alle Fehlermodi bekannt; Typ B: komplex (z.B. µC), nicht alle Fehlermodi bestimmbar.',
                    s: '<strong>Typ A</strong> (einfache Bauteile): das Fehlerverhalten <em>aller</em> Komponenten ist vollständig bekannt, und das Verhalten unter Fehlerbedingungen ist eindeutig bestimmbar (z.B. Relais, Schalter, einfache Sensoren). <strong>Typ B</strong> (komplexe Bauteile): mindestens eine Komponente hat nicht vollständig bestimmbares Fehlerverhalten (z.B. Mikrocontroller, ASIC, FPGA).<br>Folge: für dieselbe SIL fordert IEC 61508-2 bei Typ B eine <strong>höhere</strong> Safe Failure Fraction bzw. HFT (strengere architektonische Randbedingungen, Tab. 2 vs. Tab. 3). Eine SPS-CPU ist immer Typ B.<br>$\\boxed{\\text{Typ B (komplex) braucht höhere SFF/HFT als Typ A}}$<br><em>Quelle:</em> IEC 61508-2:2010 §7.4.4.1.2/§7.4.4.1.3, Tab. 2 und 3.'
                },
                {
                    q: 'Eine Sicherheits-Funktion hat eine berechnete $\\mathrm{PFD_{avg}} = 4{,}5 \\cdot 10^{-3}$ bei einem Proof-Test-Intervall $T_1 = 1\\,$Jahr und einem Common-Cause-Faktor $\\beta = 5\\,\\%$. Reicht das für <strong>SIL 2</strong>? Was passiert, wenn $T_1$ auf 5 Jahre verlängert wird (lineare Näherung)?',
                    h: 'SIL 2 (low demand): $\\mathrm{PFD_{avg}} \\in [10^{-3}, 10^{-2})$. PFD skaliert in erster Näherung linear mit $T_1$ (für nicht-redundante / 1oo1-Architektur).',
                    s: '<strong>Aktueller Stand:</strong> $\\mathrm{PFD_{avg}} = 4{,}5 \\cdot 10^{-3}$ liegt im Bereich $[10^{-3}, 10^{-2})$ → <strong>SIL 2 erfüllt</strong> (mit Reserve zum oberen Limit, der Bereich ist noch um etwa Faktor 2,2 weit weg).<br><strong>Verlängerung auf $T_1 = 5\\,$a:</strong> für 1oo1 gilt $\\mathrm{PFD_{avg}} \\approx \\lambda_\\mathrm{DU} \\cdot T_1 / 2$. Der Faktor 5 erhöht PFD linear:<br>$\\mathrm{PFD_{avg, neu}} \\approx 4{,}5 \\cdot 10^{-3} \\cdot 5 = 2{,}25 \\cdot 10^{-2}$.<br>Das liegt <strong>oberhalb</strong> des SIL-2-Bereichs $[10^{-3}, 10^{-2})$ und sogar oberhalb der SIL-1-Obergrenze — die Funktion würde formal aus SIL 2 herausfallen.<br><strong>Anmerkung zum $\\beta$-Faktor:</strong> Common Cause wirkt nur bei redundanten Architekturen (1oo2, 2oo3). Bei 1oo1 ist $\\beta$ irrelevant. Hätte die Funktion 1oo2 mit $\\beta = 5\\,\\%$, dominiert der CCF-Term $\\beta\\cdot\\lambda_\\mathrm{DU}\\cdot T_1/2$ die PFD — eine Reduktion von $\\beta$ (durch konstruktive Diversität, getrennte Energieversorgung, Software-Diversifizierung) ist dann der wirksamste Stellhebel; eine Verlängerung von $T_1$ verschlechtert die PFD trotz Redundanz linear.<br>$\\boxed{T_1\\!\\uparrow\\!5\\!\\times \\Rightarrow \\mathrm{PFD_{avg}}\\!\\uparrow\\!5\\!\\times;\\; \\text{SIL 2 nicht mehr erfüllt}}$<br><em>Quelle:</em> IEC 61508-6:2010 §B.3 (1oo1-Formeln); §B.3.2 ($\\beta$-Modell für Common Cause); Smith/Simpson, Safety Critical Systems Handbook, 4th ed. Elsevier 2016, §7.</br>'
                }
            ]
        ]
    };
})();
