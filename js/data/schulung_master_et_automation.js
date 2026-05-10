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

    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    // ----------------------------------------------------------------------
    // Kapitel 1 — Fortgeschrittene Regelungstechnik (PRODUKTIV)
    // Quellen: Lunze "Regelungstechnik 1/2" 12./9. Aufl. 2020/2020;
    // Foellinger "Regelungstechnik" 12. Aufl. 2022; Khalil "Nonlinear Systems"
    // 3rd ed. 2002; Skogestad/Postlethwaite "Multivariable Feedback Control"
    // 2nd ed. 2005; Anderson/Moore "Optimal Control" 1990; Stengel "Optimal
    // Control and Estimation" 1994.
    // ----------------------------------------------------------------------
    const PAGE_CTRL_STATE = {
        title: '1.1 Zustandsraum und Mehrgroessensysteme',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) ein System in Zustandsraumdarstellung ueberfuehren, (2) Steuerbarkeit und Beobachtbarkeit pruefen, (3) Eigenwerte durch Polplatzierung gezielt verschieben, (4) Mehrgroessen-Effekte (Kopplung) erkennen.</blockquote>'

            + '<h4>1.1.1 Zustandsraumdarstellung</h4>'
            + '<p>Ein lineares zeitinvariantes (LTI) System hat die Form $\\dot{x}=Ax+Bu,\\;y=Cx+Du$ mit Zustand $x\\in\\mathbb{R}^n$, Eingang $u\\in\\mathbb{R}^m$ und Ausgang $y\\in\\mathbb{R}^p$. Die Uebertragungsfunktion ergibt sich zu $G(s)=C(sI-A)^{-1}B+D$. Pole = Eigenwerte von $A$.</p>'

            + '<h4>1.1.2 Steuerbarkeit und Beobachtbarkeit</h4>'
            + '<p><strong>Kalman-Steuerbarkeitsmatrix:</strong> $\\mathcal{C}=[B\\;AB\\;A^2B\\;\\cdots\\;A^{n-1}B]$. System steuerbar $\\Leftrightarrow$ $\\mathrm{rang}\\,\\mathcal{C}=n$. Analog Beobachtbarkeitsmatrix $\\mathcal{O}=[C^T\\;(CA)^T\\;\\cdots\\;(CA^{n-1})^T]^T$ mit Rang $n$.</p>'
            + '<p>Lunze §3.4: nicht-steuerbare Eigenmoden koennen <em>nicht</em> durch Stellgroesse beeinflusst werden — sie muessen bereits stabil sein (Stabilisierbarkeit) oder das Modell ist unbrauchbar fuer Reglerentwurf.</p>'

            + '<h4>1.1.3 Polplatzierung (Ackermann-Formel)</h4>'
            + '<p>Bei steuerbarem SISO-System mit gewuenschten Polen $p_1,\\ldots,p_n$ liefert <strong>Ackermann</strong>: $K=[0\\,\\cdots\\,0\\,1]\\,\\mathcal{C}^{-1}\\,\\phi(A)$ mit Wunsch-Charakteristikum $\\phi(\\lambda)=\\prod_i(\\lambda-p_i)$. Polplatzierung verschiebt die Eigenwerte des geschlossenen Kreises $A_\\text{cl}=A-BK$ exakt auf die Wunschpole.</p>'
            + '<p>Praxis-Falle: Wunschpole nicht beliebig schnell waehlen — fuehrt zu hohen Stellgroessen und Saettigung. Faustregel Foellinger §8.2: Wunschpole maximal Faktor 5-10 schneller als langsamster offener Pol.</p>'

            + '<h4>1.1.4 Mehrgroessensysteme</h4>'
            + '<p>MIMO-Systeme weisen <strong>Kopplungen</strong> auf — eine Stellgroesse beeinflusst mehrere Ausgaenge. Quantifiziert durch <strong>RGA</strong> (Relative Gain Array, Bristol 1966): $\\Lambda = G(0)\\circ (G(0)^{-1})^T$ (Hadamard-Produkt). $\\lambda_{ii}\\approx 1$: gute Paarung; $\\lambda_{ii}\\le 0$: vermeiden.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Lunze, Regelungstechnik 1, 12. Aufl. 2020, Kap. 3-5; Foellinger, Regelungstechnik 12. Aufl. 2022, Kap. 8; Skogestad/Postlethwaite 2005, Kap. 3; Bristol, IEEE Trans. Autom. Control 1966.</em></p>'
    };

    const PAGE_CTRL_LQR = {
        title: '1.2 Optimale Regelung — LQR und MPC',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) das LQR-Guetekriterium definieren, (2) die algebraische Riccati-Gleichung und ihre Loesung benennen, (3) Q/R-Matrizen sinnvoll waehlen, (4) MPC gegen LQR abgrenzen.</blockquote>'

            + '<h4>1.2.1 Linear-Quadratischer-Regler (LQR)</h4>'
            + '<p>Minimiere das Funktional $J=\\int_0^\\infty (x^T Q x + u^T R u)\\,dt$ mit $Q\\succeq 0,\\;R\\succ 0$. Die optimale Stellgroesse ist Zustands-rueckgekoppelt: $u^*=-Kx,\\;K=R^{-1}B^TP$, wobei $P=P^T\\succeq 0$ Loesung der <strong>algebraischen Riccati-Gleichung</strong> ist:</p>'
            + '<p>$$A^TP+PA-PBR^{-1}B^TP+Q=0$$</p>'
            + '<p>Eigenschaften (Anderson/Moore 1990): geschlossener Kreis $A-BK$ ist <em>asymptotisch stabil</em>, sofern $(A,B)$ stabilisierbar und $(A,Q^{1/2})$ detektierbar. Phase-Margin &ge; 60°, Gain-Margin $[0{,}5,\\infty)$ — sehr robuster Entwurf.</p>'

            + '<h4>1.2.2 Wahl von Q und R</h4>'
            + '<p>$Q$ gewichtet Zustandsabweichung, $R$ den Stellaufwand. Bryson-Regel (Bryson/Ho 1969): $Q_{ii}=1/x_{i,\\text{max}}^2$, $R_{ii}=1/u_{i,\\text{max}}^2$. Skalierung mit Skalar $\\rho$: kleines $\\rho$ = aggressiv, grosses $\\rho$ = konservativ.</p>'

            + '<h4>1.2.3 LQG und Trennungsprinzip</h4>'
            + '<p>Wenn der Zustand nicht messbar ist, kombiniert <strong>LQG</strong> einen LQR mit einem Kalman-Filter. Das <em>Trennungsprinzip</em> (Joseph/Tou 1961) erlaubt getrennten Entwurf: Beobachter-Polynom bestimmt Schaetzgenauigkeit, LQR-Entwurf bestimmt Stellverhalten — Stabilitaet bleibt erhalten. Achtung: Robustheit kann verloren gehen (Doyle 1978: "Guaranteed margins for LQG regulators? None.").</p>'

            + '<h4>1.2.4 Modellpraediktive Regelung (MPC)</h4>'
            + '<p>MPC loest in jedem Abtastschritt ein endliches Optimierungsproblem ueber den Praediktionshorizont $N$:</p>'
            + '<p>$$\\min_{u_0,\\ldots,u_{N-1}}\\;\\sum_{k=0}^{N-1}(x_k^T Q x_k+u_k^T R u_k)+x_N^T P x_N \\quad\\text{u.B.v. }\\;x_{k+1}=Ax_k+Bu_k,\\;u_k\\in\\mathcal{U},\\;x_k\\in\\mathcal{X}$$</p>'
            + '<p>Nur $u_0^*$ wird angewendet, dann <em>Receding Horizon</em>. Vorteile: Constraints (Stellsaettigung, Sicherheitsgrenzen) explizit. Nachteil: hohe Rechenlast — fuer $N>50$ und Echtzeit-ms-Tasks meist nur lineares MPC mit QP-Loesern.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Anderson/Moore, Optimal Control, Prentice Hall 1990; Bryson/Ho, Applied Optimal Control, 1969; Doyle, IEEE Trans. AC 1978; Rawlings/Mayne/Diehl, Model Predictive Control, 2nd ed. 2017.</em></p>'
    };

    const PAGE_CTRL_OBS = {
        title: '1.3 Beobachter und Filter',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Luenberger-Beobachter entwerfen, (2) das Kalman-Filter aus dem MMSE-Prinzip herleiten, (3) EKF gegen UKF abgrenzen.</blockquote>'

            + '<h4>1.3.1 Luenberger-Beobachter</h4>'
            + '<p>Schaetzgleichung $\\dot{\\hat x}=A\\hat x+Bu+L(y-C\\hat x)$. Schaetzfehler $e=x-\\hat x$ folgt $\\dot e=(A-LC)e$. Bei beobachtbarem System koennen die Eigenwerte von $A-LC$ via Polplatzierung beliebig gewaehlt werden. Faustregel: 2-5x schneller als die LQR-Pole.</p>'

            + '<h4>1.3.2 Kalman-Filter</h4>'
            + '<p>Annahme: Prozessrauschen $w\\sim\\mathcal{N}(0,Q_w)$, Messrauschen $v\\sim\\mathcal{N}(0,R_v)$. Optimaler MMSE-Schaetzer:</p>'
            + '<p>$$L=P C^T R_v^{-1},\\quad A^TP+PA-PC^TR_v^{-1}CP+Q_w=0$$</p>'
            + '<p>(Riccati dual zu LQR). Kalman 1960. Diskrete Version Predict-Update-Form (Welch/Bishop 2006).</p>'

            + '<h4>1.3.3 EKF und UKF</h4>'
            + '<table><thead><tr><th>Filter</th><th>Linearisierung</th><th>Eigenschaft</th></tr></thead><tbody>'
            + '<tr><td>EKF</td><td>Jacobi $\\partial f/\\partial x$ um Schaetzpunkt</td><td>Standard in Robotik &amp; INS. Kann divergieren bei starken Nichtlinearitaeten.</td></tr>'
            + '<tr><td>UKF</td><td>Sigma-Punkte (Unscented Transform)</td><td>Bessere Mittelwert/Kovarianz-Approximation 3. Ordnung. Kein Jacobi-Bedarf.</td></tr>'
            + '<tr><td>Particle Filter</td><td>Monte-Carlo</td><td>Auch fuer nicht-Gauss/multimodale Probleme. Hoher Rechenaufwand.</td></tr>'
            + '</tbody></table>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Kalman, Trans. ASME 1960; Luenberger, IEEE Trans. AC 1971; Julier/Uhlmann, Proc. AeroSense 1997; Welch/Bishop, UNC-TR-95-041, Rev. 2006.</em></p>'
    };

    const PAGE_CTRL_NL = {
        title: '1.4 Nichtlineare und robuste Regelung',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Lyapunov-Stabilitaet definieren, (2) Sliding-Mode- gegen Backstepping-Ansaetze abgrenzen, (3) das H-infinity-Mixed-Sensitivity-Problem formulieren.</blockquote>'

            + '<h4>1.4.1 Lyapunov-Stabilitaet</h4>'
            + '<p>Eine Ruhelage $x^*=0$ von $\\dot x=f(x)$ ist <em>stabil im Sinne Lyapunov</em>, falls eine $\\mathcal{C}^1$-Funktion $V(x)>0$ existiert mit $V(0)=0$ und $\\dot V(x)\\le 0$. Asymptotisch stabil, falls $\\dot V(x)<0$ (LaSalle-Invarianzprinzip schwaecht das auf).</p>'

            + '<h4>1.4.2 Sliding-Mode-Control</h4>'
            + '<p>Definiere Sliding-Surface $s(x)=0$. Wahl $u=-K\\,\\mathrm{sign}(s)$ erzwingt $s\\dot s<0$ (Reaching-Bedingung). System gleitet danach in $s=0$, Verhalten ist robust gegen passende Stoerungen. Nachteil: <em>Chattering</em> durch sign-Funktion; Mitigation via Saturation oder Higher-Order-SMC (Levant 2003).</p>'

            + '<h4>1.4.3 Backstepping und Feedback-Linearisierung</h4>'
            + '<p>Feedback-Linearisierung: bei $\\dot x=f(x)+g(x)u$ und glatter Inversion waehle $u=g^{-1}(x)(v-f(x))$, das ergibt $\\dot x=v$ — linear. Voraussetzung: voller relativer Grad und involutive Distribution (Khalil §13).</p>'
            + '<p>Backstepping (Krstic/Kanellakopoulos/Kokotovic 1995): rekursiver Lyapunov-Entwurf fuer kaskadierte Systeme; jede Stufe waehlt eine virtuelle Stellgroesse, die die innere Schleife stabilisiert.</p>'

            + '<h4>1.4.4 H-infinity und Mixed-Sensitivity</h4>'
            + '<p>Robust-Regler-Entwurf minimiert $\\|T_{zw}\\|_\\infty$ — die maximale Energie-Verstaerkung von Stoerung $w$ zu Bewertungssignal $z$. Klassische Mixed-Sensitivity-Formulierung:</p>'
            + '<p>$$\\min_K\\;\\left\\|\\begin{bmatrix}W_S\\,S\\\\W_T\\,T\\end{bmatrix}\\right\\|_\\infty,\\quad S=(I+GK)^{-1},\\;T=GK(I+GK)^{-1}$$</p>'
            + '<p>$W_S$ formt Tracking/Disturbance-Rejection im niedrigen Frequenzbereich, $W_T$ Robustheit gegen Modellfehler im hohen Frequenzbereich. Loesung via Riccati (Doyle/Glover/Khargonekar/Francis 1989) oder LMI (Gahinet/Apkarian 1994).</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Khalil, Nonlinear Systems, 3rd ed. 2002, Kap. 4, 13, 14; Krstic et al., Nonlinear and Adaptive Control Design, Wiley 1995; Skogestad/Postlethwaite 2005, Kap. 3, 9; Doyle et al., IEEE Trans. AC 1989; Levant, Int. J. Control 2003.</em></p>'
    };

    // ----------------------------------------------------------------------
    // Kapitel 2 — SPS-Programmierung (IEC 61131-3 / IEC 61499) — PRODUKTIV
    // Quellen: IEC 61131-3:2013 (Ed. 3.0) "Programmable controllers — Part 3:
    // Programming languages"; IEC 61131-1:2003 (Allgemeine Information);
    // IEC 61499-1:2012 (Function blocks for distributed systems); IEC 61508
    // Ed. 2.0:2010 (Functional safety of E/E/PE safety-related systems);
    // IEC 62061:2021 (Safety of machinery — functional safety); ISO 13849-1:
    // 2023 (Safety-related parts of control systems); PLCopen "Safety
    // Software" Technical Specification Part 1 v2.01 (2018) und Part 2 v1.0;
    // John/Tiegelkamp "SPS-Programmierung mit IEC 61131-3", 5. Aufl. Springer
    // 2010; Vyatkin "IEC 61499 Function Blocks for Embedded and Distributed
    // Control Systems Design", 3rd ed. ISA 2020; Heinrich, "Automatisierung",
    // Hanser 2021.
    // ----------------------------------------------------------------------
    const PAGE_SPS_LANG = {
        title: '2.1 IEC 61131-3 — Sprachen, Datenmodell und Software-Modell',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die fuenf Sprachen der IEC 61131-3 Ed. 3 voneinander abgrenzen, (2) das Software-Modell (Configuration / Resource / Task / Program / POU) erklaeren, (3) elementare und abgeleitete Datentypen korrekt verwenden, (4) Geltungsbereiche von Variablen einordnen.</blockquote>'

            + '<h4>2.1.1 Geschichte und Geltungsbereich</h4>'
            + '<p>IEC 61131-3 ist Teil 3 der Norm IEC 61131 fuer speicherprogrammierbare Steuerungen (SPS / engl. PLC). Die <strong>3. Ausgabe (2013)</strong> definiert vier Programmiersprachen — Strukturierter Text (ST), Funktionsbausteinsprache (FBD), Kontaktplan (LD) und Ablaufsprache (SFC) — sowie die textuelle Anweisungsliste (IL) als <em>deprecated</em> (sie ist nur noch im informativen Anhang). Industrieprodukte (CODESYS, TIA Portal, B&amp;R Automation Studio, TwinCAT) implementieren die Norm mit jeweils eigenen Erweiterungen, dokumentieren aber die Konformitaetsstufe (Base/Compliance Level).</p>'
            + '<p>Die Ed. 3 fuehrte gegenueber Ed. 2 (2003) eine <strong>objektorientierte Erweiterung</strong> ein: <code>CLASS</code>, <code>METHOD</code>, <code>EXTENDS</code>, <code>INTERFACE</code>, <code>THIS^</code>. Diese OO-Mechanismen sind im IEC-61131-3-Sinn <em>optional</em>; viele sicherheitsgerichtete Steuerungen (z.B. nach IEC 61508 SIL 3) verzichten weiterhin darauf, weil die Verifikation von dynamischer Bindung aufwendig ist.</p>'

            + '<h4>2.1.2 Software-Modell</h4>'
            + '<p>Das hierarchische Modell (IEC 61131-3 §6) besteht aus:</p>'
            + '<ul>'
            + '<li><strong>Configuration:</strong> Top-Element pro Steuerungssystem.</li>'
            + '<li><strong>Resource:</strong> Verarbeitungseinheit (typisch: ein CPU-Modul). Pro Resource laufen mehrere Tasks.</li>'
            + '<li><strong>Task:</strong> Ablaufeinheit; <em>cyclic</em> mit Periode (z.B. $T=10\\,\\text{ms}$) oder <em>event-triggered</em> (Eingangsflanke). Eine Task hat <em>priority</em>, <em>interval</em> und referenziert ein oder mehrere Programme.</li>'
            + '<li><strong>Program / POU:</strong> Programm-Organisations-Einheit, ausgefuehrt durch eine Task.</li>'
            + '<li><strong>Global Variables / Access Paths:</strong> ueber Resource-Grenzen hinweg sichtbare Variablen; <code>VAR_ACCESS</code> definiert nach aussen sichtbare Bezeichner.</li>'
            + '</ul>'
            + '<p>Ein <strong>Scan-Zyklus</strong> einer cyclic Task lautet konventionell: <em>(1) Eingaenge lesen → (2) Programme ausfuehren → (3) Ausgaenge schreiben → (4) Diagnose/Idle</em>. Die Norm schreibt diese Reihenfolge nicht zwingend vor, aber alle gaengigen Plattformen halten sie ein, weil sie <em>Konsistenz der Prozessabbild-Sicht</em> garantiert (E/A wird nicht mitten im Programm aktualisiert).</p>'

            + '<h4>2.1.3 POU-Typen</h4>'
            + '<p>Drei Typen von Program Organisation Units:</p>'
            + '<ul>'
            + '<li><strong>FUNCTION (FUN):</strong> stateless — bei gleichen Eingaengen identischer Ausgang. Genau ein Rueckgabewert vom Typ der Funktion. Beispiele: <code>SQRT</code>, <code>SEL</code>, <code>MAX</code>.</li>'
            + '<li><strong>FUNCTION_BLOCK (FB):</strong> instanziiert; haelt internen Zustand zwischen Aufrufen (z.B. Timer <code>TON</code>, Flankenerkennung <code>R_TRIG</code>, PI-Regler). Mehrere Ein-/Ausgaenge moeglich.</li>'
            + '<li><strong>PROGRAM (PRG):</strong> oberste Ebene der Anwendungs-Logik; wird einer Task zugewiesen.</li>'
            + '</ul>'

            + '<h4>2.1.4 Datentypen</h4>'
            + '<p>Elementare Typen mit definierter Bitbreite:</p>'
            + '<ul>'
            + '<li>Bool: <code>BOOL</code> (1 Bit logisch).</li>'
            + '<li>Ganzzahl: <code>SINT</code>/<code>USINT</code> (8), <code>INT</code>/<code>UINT</code> (16), <code>DINT</code>/<code>UDINT</code> (32), <code>LINT</code>/<code>ULINT</code> (64).</li>'
            + '<li>Gleitkomma: <code>REAL</code> (32, IEEE 754 single), <code>LREAL</code> (64, double).</li>'
            + '<li>Bitfolge: <code>BYTE</code>, <code>WORD</code>, <code>DWORD</code>, <code>LWORD</code>.</li>'
            + '<li>Zeit: <code>TIME</code>, <code>DATE</code>, <code>TIME_OF_DAY</code> (TOD), <code>DATE_AND_TIME</code> (DT).</li>'
            + '<li>Zeichen: <code>CHAR</code>, <code>WCHAR</code>, <code>STRING</code>, <code>WSTRING</code>.</li>'
            + '</ul>'
            + '<p>Abgeleitete Typen via <code>TYPE ... END_TYPE</code>: <em>Strukturen</em> (<code>STRUCT</code>), <em>Aufzaehlungen</em> (<code>ENUM</code>), <em>Felder</em> (<code>ARRAY[1..10] OF INT</code>), <em>Subranges</em> (<code>INT(0..100)</code>), <em>Aliase</em>. Literale tragen Typ-Praefix: <code>16#FF</code> (hex), <code>2#1010</code> (binaer), <code>T#100ms</code> (Zeit), <code>UINT#42</code> (typed).</p>'

            + '<h4>2.1.5 Variablen-Geltungsbereiche (Scopes)</h4>'
            + '<p>Pro POU werden Variablen in Sektionen deklariert. Die wichtigsten:</p>'
            + '<ul>'
            + '<li><code>VAR ... END_VAR</code> — lokale Variablen.</li>'
            + '<li><code>VAR_INPUT</code> / <code>VAR_OUTPUT</code> / <code>VAR_IN_OUT</code> — Schnittstelle eines FB/FUN.</li>'
            + '<li><code>VAR_TEMP</code> — temporaer (wird im PRG/FB pro Aufruf neu initialisiert; in Funktionen implizit).</li>'
            + '<li><code>VAR_GLOBAL</code> — auf Resource-/Configuration-Ebene.</li>'
            + '<li><code>VAR_EXTERNAL</code> — Zugriff auf <code>VAR_GLOBAL</code> in einer POU.</li>'
            + '<li><code>VAR_ACCESS</code> — definiert nach aussen sichtbare Zugriffspfade (Configuration-Ebene).</li>'
            + '<li><code>RETAIN</code>/<code>NON_RETAIN</code>/<code>PERSISTENT</code> — Verhalten bei Warm-/Kaltstart und Spannungsausfall.</li>'
            + '<li><code>CONSTANT</code> — Compile-Zeit-Konstante.</li>'
            + '</ul>'

            + '<h4>2.1.6 Die fuenf Sprachen</h4>'
            + '<p><strong>Strukturierter Text (ST)</strong> — pascal-aehnlich; Pflicht-Sprache fuer komplexe Algorithmen. Kontrollstrukturen <code>IF/ELSIF/ELSE</code>, <code>CASE</code>, <code>FOR</code>, <code>WHILE</code>, <code>REPEAT</code>, <code>EXIT</code>, <code>RETURN</code>. Ausdruecke folgen Operator-Praezedenz wie in C/Pascal; Zuweisung ist <code>:=</code>.</p>'
            + '<p><strong>Funktionsbausteinsprache (FBD)</strong> — grafisch; Bausteine werden ueber Datenfluss-Linien verbunden. Auswertung typischerweise <em>links nach rechts</em>; bei Rueckkopplungen muss explizit eine 1-Zyklus-Verzoegerung modelliert werden.</p>'
            + '<p><strong>Kontaktplan (LD, Ladder Diagram)</strong> — grafisch; angelehnt an Relais-Schaltplaene. Linke Sammelschiene = Power-Rail; Strompfad ueber Schliesser/Oeffner zu Spulen. Pflicht in vielen US-amerikanischen Anlagen wegen Wartungs-Tradition.</p>'
            + '<p><strong>Anweisungsliste (IL)</strong> — textuell, akkumulator-basiert (<code>LD</code>, <code>ST</code>, <code>AND</code>, <code>JMP</code>). <em>In Ed. 3 (2013) als deprecated markiert</em>; nur noch im informativen Anhang gefuehrt. Neue Projekte sollten IL nicht mehr einsetzen.</p>'
            + '<p><strong>Ablaufsprache (SFC, Sequential Function Chart)</strong> — grafisch; Schritte (Steps) und Transitionen modellieren Ablaeufe. Ein Schritt traegt <em>Aktionen</em> mit Qualifizierern (<code>N</code> non-stored, <code>S</code>/<code>R</code> set/reset, <code>L</code> time-limited, <code>D</code> time-delayed, <code>P</code> pulse, <code>P1</code>/<code>P0</code> rising/falling). SFC ist als <em>Strukturierungselement</em> gedacht; Aktionen werden in einer der anderen Sprachen geschrieben.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 61131-3:2013 §5–§7 (Datenmodell, Software-Modell, POU); §6.5.1 (Tasks); Annex G (deprecated IL); John/Tiegelkamp 2010 Kap. 2–4; Heinrich 2021 §6.</em></p>'
    };

    const PAGE_SPS_POU = {
        title: '2.2 POU, Tasking und Echtzeit-Verhalten',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) FB-Instanzen korrekt deklarieren und aufrufen, (2) Standard-FB <code>TON</code>/<code>TOF</code>/<code>TP</code>/<code>R_TRIG</code>/<code>F_TRIG</code>/<code>CTU</code>/<code>CTD</code> einsetzen, (3) Task-Konfigurationen (cyclic vs. event) auslegen, (4) WCET, Jitter und Pre-emption einschaetzen.</blockquote>'

            + '<h4>2.2.1 Funktionsbaustein-Instanzen</h4>'
            + '<p>Jeder Funktionsbaustein wird <em>instanziiert</em>; die Instanz haelt zwischen Aufrufen Zustand. Beispiel ST:</p>'
            + '<pre><code>VAR\n    tonHeating : TON;     (* eine TON-Instanz *)\n    tonCooling : TON;     (* unabhaengige zweite Instanz *)\nEND_VAR\n\ntonHeating(IN := bSensorOn, PT := T#5s);\nIF tonHeating.Q THEN bRelay := TRUE; END_IF</code></pre>'
            + '<p>Wichtige Regel (IEC 61131-3 §6.6.4): jede Instanz muss <em>periodisch aufgerufen</em> werden, damit interne Zeitbasis aktualisiert wird; ein TON, der nur in einem nicht-aktiven IF-Zweig steht, „faehrt" nicht. Standard-FB (Anhang) sind immer mit den Anschluessen <code>EN</code>/<code>ENO</code> kompatibel.</p>'

            + '<h4>2.2.2 Standard-Funktionsbausteine</h4>'
            + '<table><thead><tr><th>FB</th><th>Verhalten</th><th>Kernparameter</th></tr></thead><tbody>'
            + '<tr><td><code>TON</code></td><td>On-delay: $Q$ wird $\\text{PT}$ nach steigender Flanke an $IN$ wahr.</td><td>$IN$, $PT$ → $Q$, $ET$</td></tr>'
            + '<tr><td><code>TOF</code></td><td>Off-delay: $Q$ folgt $IN$ steigend; bei fallender Flanke bleibt $Q$ noch $PT$ wahr.</td><td>$IN$, $PT$ → $Q$, $ET$</td></tr>'
            + '<tr><td><code>TP</code></td><td>Pulse: bei steigender Flanke wird $Q$ fuer genau $PT$ wahr (nicht retriggerbar).</td><td>$IN$, $PT$ → $Q$, $ET$</td></tr>'
            + '<tr><td><code>R_TRIG</code></td><td>Erkennt steigende Flanke an $CLK$.</td><td>$CLK$ → $Q$</td></tr>'
            + '<tr><td><code>F_TRIG</code></td><td>Erkennt fallende Flanke.</td><td>$CLK$ → $Q$</td></tr>'
            + '<tr><td><code>CTU</code></td><td>Aufwaerts-Zaehler; $CV$ inkrementiert bei steigender Flanke an $CU$ bis $PV$.</td><td>$CU$, $R$, $PV$ → $Q$, $CV$</td></tr>'
            + '<tr><td><code>CTD</code></td><td>Abwaerts-Zaehler.</td><td>$CD$, $LD$, $PV$ → $Q$, $CV$</td></tr>'
            + '<tr><td><code>SR</code></td><td>Set-dominantes Flipflop ($S1$ hat Vorrang vor $R$).</td><td>$S1$, $R$ → $Q1$</td></tr>'
            + '<tr><td><code>RS</code></td><td>Reset-dominantes Flipflop ($R1$ hat Vorrang).</td><td>$S$, $R1$ → $Q1$</td></tr>'
            + '</tbody></table>'

            + '<h4>2.2.3 Tasks und Scheduling</h4>'
            + '<p>Eine <em>cyclic</em> Task hat eine fest konfigurierte Periode (Beispiel: $T=10\\,\\text{ms}$). Ihre Worst-Case-Ausfuehrungszeit (WCET) muss <em>kleiner</em> als die Periode sein, sonst tritt ein <em>Task-Overrun</em> auf. Die Norm verlangt, dass Overruns als Diagnosebit verfuegbar sind; viele Plattformen erlauben konfigurierbare Reaktion (z.B. Stopp oder Watchdog-Trip).</p>'
            + '<p>Eine <em>event-triggered</em> Task wird durch ein Ereignis ausgeloest (Eingangsflanke, Bus-Telegramm, externes Interrupt). Sinnvoll fuer asynchrone Reaktionen wie Not-Aus, aber Vorsicht: die <em>Aufrufrate</em> ist nicht durch die Hardware deterministisch begrenzt — daher in IEC 61508-Kontexten meist mit Maximalrate-Filter abgesichert.</p>'
            + '<p>Bei mehreren Tasks pro Resource entscheidet die <em>priority</em> (kleinerer Wert = hoehere Prioritaet ist Plattform-Konvention, IEC 61131-3 schreibt sie nicht zwingend vor — daher Plattform-Doku konsultieren). Gaengig ist <strong>fixed-priority preemptive scheduling</strong>: hochprior unterbricht niedrigprior. Der Datenaustausch zwischen Prioritaetsstufen muss konsistent sein — Loesungen: Doppelpufferung, Shadow-Variables, oder explizite IEC-61131-Konstrukte wie <code>VAR_GLOBAL</code> mit atomarem Zugriff (Plattform-spezifisch garantiert).</p>'

            + '<h4>2.2.4 Determinismus und Jitter</h4>'
            + '<p>Eine harte Echtzeitgarantie verlangt: $\\text{WCET} + J + I \\le T$, wobei $T$ die Task-Periode, $J$ der Scheduling-Jitter und $I$ die maximale Interrupt-Latenz ist. Lesehinweis: ein <em>10-ms-Task</em> bei 80 % Last hat im Schnitt 8 ms Code-Ausfuehrung — <em>nicht</em> die WCET. Ohne Lasttest und Worst-Case-Pfadanalyse ist die Echtzeitgarantie unbelegt.</p>'

            + '<h4>2.2.5 Wiederverwendung — Bibliotheken und OO</h4>'
            + '<p>Bibliotheken bundlen FB/FUN/Datentypen wiederverwendbar. Konventionen:</p>'
            + '<ul>'
            + '<li>Eindeutige Praefixe (Hersteller- oder Domaenen-Praefix) gegen Namenskollisionen.</li>'
            + '<li>Versionierung im Bibliotheks-Header (PLCopen XML <code>&lt;header&gt;</code>).</li>'
            + '<li>Ed. 3 OO: <code>CLASS</code> + <code>METHOD</code> + <code>EXTENDS</code>; <code>INTERFACE</code> fuer dynamische Bindung. <code>FINAL</code>/<code>ABSTRACT</code> wie in Java. Verwendung in SIL-zertifizierten Projekten kritisch pruefen, weil dynamische Bindung WCET schwerer abschaetzbar macht.</li>'
            + '</ul>'

            + '<h4>2.2.6 PLCopen XML — Austauschformat</h4>'
            + '<p>PLCopen TC 6 spezifiziert ein XML-Format fuer den Austausch von IEC-61131-3-Projekten zwischen Engineering-Tools. Aktuell <strong>Version 2.01 (2009)</strong>, Erweiterungen fuer OO-Elemente in V3.0 (Draft). Damit ist Tool-uebergreifende Wiederverwendung von Bibliotheken moeglich, ohne herstellerspezifisches Bin-Format.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 61131-3:2013 §6.6 (POU), Annex F (Standard-FB); John/Tiegelkamp 2010 Kap. 5–7; PLCopen TC6 XML v2.01; Heinrich 2021 §6.4.</em></p>'
    };

    const PAGE_SPS_SAFETY = {
        title: '2.3 Sicherheitsgerichtete Steuerung — IEC 61508 / 62061 / ISO 13849-1',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) SIL- und PL-Klassifizierung gegeneinander einordnen, (2) Hardware Fault Tolerance (HFT) und Safe-Failure-Fraction (SFF) berechnen, (3) PLCopen-Safety-FB anwenden, (4) Safety- und Standard-Steuerung sauber trennen.</blockquote>'

            + '<h4>2.3.1 Normensystematik</h4>'
            + '<p>Sicherheitsgerichtete Steuerungen folgen einem Normen-Zoo, der historisch gewachsen ist:</p>'
            + '<ul>'
            + '<li><strong>IEC 61508 Ed. 2.0:2010</strong> — Grundnorm fuer funktionale Sicherheit von <em>elektrischen / elektronischen / programmierbaren elektronischen</em> Systemen. Definiert SIL 1 bis SIL 4 ueber tolerierbare Versagenswahrscheinlichkeiten (PFD bzw. PFH).</li>'
            + '<li><strong>IEC 62061:2021</strong> — Maschinen-spezifische Anwendung von IEC 61508 (sektorale Norm). Ersetzt die Vorgaengerversion 2005+A2:2015.</li>'
            + '<li><strong>ISO 13849-1:2023</strong> — alternative Maschinen-Norm; klassifiziert in <em>Performance Level</em> PL a–e.</li>'
            + '<li><strong>IEC 61131-6:2012</strong> — Functional Safety fuer SPS speziell, darauf aufbauend.</li>'
            + '</ul>'
            + '<p>Im Maschinenkontext duerfen sowohl IEC 62061 als auch ISO 13849-1 angewendet werden (Maschinenrichtlinie EU 2006/42/EG bzw. ab 2027 EU 2023/1230 Maschinen-Verordnung). Eine Quervergleichstabelle ist in IEC 62061:2021 Annex C enthalten.</p>'

            + '<h4>2.3.2 SIL-Tabelle (IEC 61508 / 62061)</h4>'
            + '<table><thead><tr><th>SIL</th><th>PFD<sub>avg</sub> (Low Demand)</th><th>PFH (High Demand)</th><th>Risikoreduktion</th></tr></thead><tbody>'
            + '<tr><td>1</td><td>$10^{-2}$ … $10^{-1}$</td><td>$10^{-6}$ … $10^{-5}$ /h</td><td>10–100×</td></tr>'
            + '<tr><td>2</td><td>$10^{-3}$ … $10^{-2}$</td><td>$10^{-7}$ … $10^{-6}$ /h</td><td>100–1000×</td></tr>'
            + '<tr><td>3</td><td>$10^{-4}$ … $10^{-3}$</td><td>$10^{-8}$ … $10^{-7}$ /h</td><td>1000–10 000×</td></tr>'
            + '<tr><td>4</td><td>$10^{-5}$ … $10^{-4}$</td><td>$10^{-9}$ … $10^{-8}$ /h</td><td>10 000–100 000×</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Low demand</strong>: Anforderung an die Sicherheitsfunktion seltener als $1/\\text{Jahr}$ (z.B. Druckentlastung). <strong>High demand / continuous</strong>: haeufiger oder kontinuierlich (typisch fuer Maschinensicherheit; deshalb dort PFH).</p>'

            + '<h4>2.3.3 SFF und HFT</h4>'
            + '<p>Die <em>Safe Failure Fraction</em> ist nach IEC 61508-2 §7.4.4.1.2:</p>'
            + '<p>$$\\mathrm{SFF}=\\frac{\\sum\\lambda_S+\\sum\\lambda_{DD}}{\\sum\\lambda_S+\\sum\\lambda_D}$$</p>'
            + '<p>$\\lambda_S$ = sichere Ausfaelle, $\\lambda_D$ = gefaehrliche Ausfaelle (Index $DD$ = detektiert, $DU$ = nicht detektiert). Zusammen mit der <em>Hardware Fault Tolerance</em> (HFT — Anzahl der Faults, die das Element noch tolerieren kann, ohne die Sicherheitsfunktion zu verlieren) ergibt sich der erreichbare SIL aus den Tabellen 2/3 der IEC 61508-2. Beispiel: <em>Type-B-Element</em> (komplex, z.B. Mikrocontroller) mit HFT = 1 und SFF = 90 % erreicht maximal SIL 3.</p>'
            + '<p><strong>Architekturen:</strong> 1oo1 (single channel), 1oo2 (zwei Kanaele, einer reicht zum Ausloesen — hohe Verfuegbarkeit der Sicherheitsfunktion, aber haeufiger Fehl-Ausloesungen), 2oo2, 2oo3, 1oo2D (mit Diagnose). Wahl je nach SIL-Ziel und Verfuegbarkeitsanforderung.</p>'

            + '<h4>2.3.4 PL nach ISO 13849-1</h4>'
            + '<p>ISO 13849-1 klassifiziert ueber Kategorie (B, 1, 2, 3, 4), MTTF<sub>D</sub> (Mean Time To Dangerous Failure) und DC<sub>avg</sub> (Diagnostic Coverage) in PL a (geringste) bis PL e (hoechste Risikoreduktion). PFH-Bandbreiten der PL korrespondieren grob mit den SIL — Quervergleich in IEC 62061:2021 Annex C: PL e ≈ SIL 3, PL d ≈ SIL 2, PL c ≈ SIL 1 (<em>nicht</em> 1:1, sondern als Orientierung).</p>'

            + '<h4>2.3.5 PLCopen Safety</h4>'
            + '<p>Die PLCopen-Spezifikation <em>"Safety Software Technical Specification Part 1 — Concepts and Function Blocks", Version 2.01 (2018)</em> definiert sicherheitsgerichtete FB mit dem Praefix <code>SF_</code>. Wichtige Bausteine:</p>'
            + '<ul>'
            + '<li><code>SF_EmergencyStop</code> — Notausschaltung gemaess EN/IEC 60204-1.</li>'
            + '<li><code>SF_SafetyGuard</code> — Schutztuer-Ueberwachung (incl. Reset).</li>'
            + '<li><code>SF_TwoHandControlTypeII/III</code> — Zwei-Hand-Schaltung (ISO 13851).</li>'
            + '<li><code>SF_EnableSwitch</code> — Zustimm-Taster.</li>'
            + '<li><code>SF_SafelyLimitedSpeed</code> — sicher begrenzte Geschwindigkeit (SLS, EN 61800-5-2).</li>'
            + '<li><code>SF_TestableSafetySensor</code>, <code>SF_OutControl</code>.</li>'
            + '</ul>'
            + '<p>Konvention: alle Sicherheitssignale sind <em>aktiv-low</em> auf der Steuerungsseite (Drahtbruch ist sicherer Zustand). Eingangs-Sicherheits-Signale werden ueber zertifizierte Auswerte-FB diagnostiziert (z.B. Diskrepanzueberwachung bei Zwei-Kanal-Eingaengen).</p>'

            + '<h4>2.3.6 Trennung Standard / Safety</h4>'
            + '<p>Sicherheitsgerichtete Software wird auf der Steuerung in einem <em>separaten Programm-Bereich</em> ausgefuehrt — Speichersegmentierung, eigene Task, oft eigener Co-Prozessor (z.B. Siemens F-CPU, B&amp;R SafeLOGIC, Pilz PNOZmulti). <em>Standard-Variablen duerfen Safety-Variablen lesen, aber nicht schreiben</em> — der Datenfluss von Safety nach Standard ist erlaubt, von Standard nach Safety nur ueber dedizierte Mechanismen mit Ruecklesepruefung.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 61508-2:2010 §7.4 (SFF/HFT, Tabellen 2/3); IEC 62061:2021 §5.2, Annex C; ISO 13849-1:2023 §4.5; PLCopen Safety TS Part 1 v2.01 (2018); IEC 61131-6:2012.</em></p>'
    };

    const PAGE_SPS_61499 = {
        title: '2.4 IEC 61499 — Verteilte ereignisgetriebene Steuerung',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Event- und Datenfluss in IEC-61499-Function-Blocks unterscheiden, (2) System-/Device-/Resource-/Application-Modell einordnen, (3) Vor- und Nachteile gegenueber IEC 61131-3 benennen, (4) Industrie-4.0-Bezug herstellen.</blockquote>'

            + '<h4>2.4.1 Motivation</h4>'
            + '<p>IEC 61131-3 wurde fuer <em>einzelne</em> Steuerungen entworfen — verteilte Anwendungen erfordern manuelles Splitting der Logik auf mehrere SPS-Programme plus Engineering der Kommunikation (Feldbus-Variablen, OPC UA, etc.). <strong>IEC 61499:2012 (Ed. 2.0)</strong> macht den Gegenentwurf: <em>eine Anwendung</em>, die deklarativ ueber mehrere Geraete (Devices) verteilt wird; das Engineering-Tool generiert die noetige Kommunikation automatisch.</p>'

            + '<h4>2.4.2 Modell-Ebenen</h4>'
            + '<ul>'
            + '<li><strong>System:</strong> Gesamtanwendung; enthaelt Devices und Application(s).</li>'
            + '<li><strong>Device:</strong> physisches Geraet (CPU, Edge-Box). Enthaelt Resources.</li>'
            + '<li><strong>Resource:</strong> unabhaengige Verarbeitungseinheit; haelt einen Teil der Anwendung.</li>'
            + '<li><strong>Application:</strong> Netz aus Function Blocks; wird per <em>Mapping</em> auf Resources/Devices verteilt.</li>'
            + '<li><strong>Function Block:</strong> Grundbaustein.</li>'
            + '</ul>'

            + '<h4>2.4.3 Function-Block-Typen</h4>'
            + '<ul>'
            + '<li><strong>Basic FB:</strong> intern als <em>Execution Control Chart (ECC)</em> realisiert — Zustandsautomat, dessen Transitionen durch eingehende Events ausgeloest werden. Aktionen rufen interne Algorithmen auf (in beliebiger Sprache, z.B. ST).</li>'
            + '<li><strong>Composite FB:</strong> Netz aus weiteren FBs.</li>'
            + '<li><strong>Service Interface FB (SIFB):</strong> Schnittstelle zu Hardware/IO/Kommunikation; werden vom Plattform-Anbieter geliefert.</li>'
            + '<li><strong>Adapter Interface:</strong> ab Ed. 2.0 — gebuendelte Schnittstellen mit Events + Daten + Plug/Socket-Konzept fuer einfacheres Wiring.</li>'
            + '</ul>'

            + '<h4>2.4.4 Event-getriebene Ausfuehrung</h4>'
            + '<p>Im Unterschied zur zyklischen Abarbeitung der IEC 61131-3 sind FBs in IEC 61499 <em>passiv</em>: sie werden erst durch ein eingehendes Event aktiviert. Datenleitungen (DI/DO) tragen Werte; Event-Leitungen (EI/EO) triggern. Die Norm verlangt <em>WITH-Beziehungen</em>, die Daten an Events koppeln — damit ist klar, welche Daten beim Eintreffen eines Events <em>gueltig</em> sein sollen.</p>'
            + '<p>Konsequenz: ein FB, das nur Daten erhaelt, aber kein zugehoeriges Event, fuehrt seinen Algorithmus nicht aus. Das ist gewollt, kann aber Anfaenger irritieren.</p>'

            + '<h4>2.4.5 Vergleich zu IEC 61131-3</h4>'
            + '<table><thead><tr><th>Aspekt</th><th>IEC 61131-3</th><th>IEC 61499</th></tr></thead><tbody>'
            + '<tr><td>Ausfuehrungsmodell</td><td>zyklisch (scan)</td><td>ereignisgetrieben</td></tr>'
            + '<tr><td>Verteilung</td><td>manuell, Bus-Variablen</td><td>deklarativ, ueber Mapping</td></tr>'
            + '<tr><td>Wiederverwendung</td><td>POU, Bibliotheken</td><td>FB, Adapter, Plug/Socket</td></tr>'
            + '<tr><td>Werkzeugverbreitung</td><td>sehr hoch (alle SPS-Anbieter)</td><td>begrenzt (nxtControl/Schneider, 4DIAC, ISaGRAF)</td></tr>'
            + '<tr><td>Echtzeitgarantie</td><td>WCET pro Task gut analysierbar</td><td>komplexer durch verteilte Events</td></tr>'
            + '<tr><td>I4.0-Eignung</td><td>via OPC UA + Engineering</td><td>nativ verteilt, mit OPC-UA-Mapping (Ed. 2.0)</td></tr>'
            + '</tbody></table>'

            + '<h4>2.4.6 4DIAC und Industrie-4.0-Bezug</h4>'
            + '<p>Die Open-Source-Implementierung <strong>Eclipse 4DIAC</strong> (Forge: 4diac-ide, Runtime FORTE) ist die Referenzplattform fuer Lehre und Forschung; sie unterstuetzt seit 2.x auch OPC UA Pub/Sub als Transport. Industriell ist IEC 61499 bislang Nische — relevante Anbieter: Schneider Electric (EcoStruxure Automation Expert seit 2021, basiert auf IEC 61499), nxtControl (in Schneider integriert), ISaGRAF.</p>'
            + '<p>Im RAMI-4.0-Kontext spielt IEC 61499 dort, wo Anwendungen ueber Feldgeraete, Edge-Knoten und Cloud verteilt werden sollen, ohne fuer jede Verschiebung das Engineering neu aufzusetzen — das ist konzeptionell die Verwandtschaft zur Asset-Administration-Shell-Idee „portable Software-Komponenten".</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 61499-1:2012 §4–§5 (Modell), §6 (FB-Typen), §7 (ECC); Vyatkin, "IEC 61499 Function Blocks", 3rd ed. 2020 Kap. 2–4; Eclipse 4DIAC Doku v2.0 (2023); Schneider Electric EcoStruxure Automation Expert White Paper 2021.</em></p>'
    };

    const QUIZ_SPS = [
        // ---- IEC 61131-3 — Sprachen, Datenmodell, Software-Modell (1-15)
        q('Welche Ausgabe der IEC 61131-3 fuehrte die objektorientierten Erweiterungen (CLASS, METHOD, EXTENDS, INTERFACE) ein?',
            ['Ed. 2.0 (2003)', 'Ed. 3.0 (2013)', 'Ed. 4.0 (2024)', 'Ed. 1.0 (1993)'], 1,
            'IEC 61131-3:2013 (Ed. 3.0) §2 fuehrt OO-Konstrukte CLASS, METHOD, EXTENDS, INTERFACE, THIS^ ein; in Ed. 2.0 (2003) noch nicht enthalten.'),
        q('Welcher Status hat die Anweisungsliste (IL, Instruction List) in IEC 61131-3 Ed. 3?',
            ['Empfohlen fuer alle Neuprojekte', 'Als deprecated markiert, nur noch im informativen Anhang', 'Wurde unveraendert beibehalten', 'Pflicht-Sprache fuer Compliance Level 2'], 1,
            'IEC 61131-3:2013 Annex G: IL ist deprecated und nur noch informativ — neue Projekte sollen ST/FBD/LD/SFC verwenden.'),
        q('Welche Sprachen normiert IEC 61131-3 Ed. 3 als <em>verbindliche</em> Programmiersprachen?',
            ['ST, FBD, LD, SFC (IL nur informativ)', 'Nur ST und LD', 'C, C++, ST, FBD', 'IL, ST, FBD, LD, SFC'], 0,
            'Ed. 3.0 fuehrt ST, FBD, LD und SFC; IL ist auf den informativen Anhang G abgewertet.'),
        q('Was bezeichnet eine "Resource" im Software-Modell der IEC 61131-3?',
            ['Ein Speicherbereich fuer Konstanten', 'Eine Stellgroesse', 'Eine Verarbeitungseinheit innerhalb einer Configuration (typisch eine CPU)', 'Ein Eingangssignal'], 2,
            'IEC 61131-3:2013 §6.2: Configuration enthaelt Resources, jede Resource ist eine eigenstaendige Verarbeitungseinheit, die Tasks ausfuehrt.'),
        q('Welche Reihenfolge entspricht der ueblichen zyklischen Abarbeitung einer Cyclic-Task in einer SPS?',
            ['Ausgaenge → Eingaenge → Programme', 'Diagnose → Ausgaenge → Eingaenge → Programme', 'Programm → Eingaenge → Ausgaenge', 'Eingaenge lesen → Programme ausfuehren → Ausgaenge schreiben'], 3,
            'Konventioneller Scan-Zyklus: konsistente Eingangsabbildung → Logik → Ausgangsabbildung. Garantiert konsistente Sicht auf das Prozessabbild (vgl. Heinrich 2021 §6.2).'),
        q('Welche POU-Art behaelt zwischen Aufrufen einen internen Zustand?',
            ['FUNCTION', 'FUNCTION_BLOCK', 'TYPE', 'CONFIGURATION'], 1,
            'IEC 61131-3 §6.6.4: FUNCTION_BLOCK-Instanzen halten Zustand; FUNCTION ist explizit zustandslos (gleiche Eingaenge → gleicher Ausgang).'),
        q('Welche Anzahl von Rueckgabewerten besitzt eine FUNCTION nach IEC 61131-3?',
            ['Genau einen, vom Typ der FUNCTION', 'Beliebig viele ueber VAR_OUTPUT', 'Maximal drei', 'Null'], 0,
            'IEC 61131-3 §6.6.2: Eine FUNCTION liefert genau einen Wert vom deklarierten Funktionstyp; weitere Ausgaenge werden ueber FB modelliert.'),
        q('Welcher Datentyp ist ein 32-Bit-IEEE-754-Gleitkomma in IEC 61131-3?',
            ['DWORD', 'DINT', 'REAL', 'LREAL'], 2,
            'IEC 61131-3 §6.5.1 Tabelle: REAL = 32-Bit IEEE 754 single precision; LREAL = 64-Bit double.'),
        q('Welches Literal ist gemaess IEC 61131-3 syntaktisch korrekt fuer hexadezimal $\\mathrm{FF}$?',
            ['$FF', '16#FF', 'FFh', '0xFF'], 1,
            'IEC 61131-3 §6.5.2: typisierte Literale verwenden Basenotation <Basis>#<Wert>; hex = 16#, binaer = 2#, oktal = 8#.'),
        q('Wie wird in IEC 61131-3 ST eine Zuweisung geschrieben?',
            ['<code>==</code>', '<code>&lt;-</code>', '<code>=</code>', '<code>:=</code>'], 3,
            'IEC 61131-3 §7.3.2: Zuweisungsoperator in ST ist <code>:=</code> (pascal-aehnlich); <code>=</code> ist Gleichheits-Vergleich.'),
        q('Welche Variablensektion enthaelt die Eingangsschnittstelle eines Funktionsbausteins?',
            ['VAR_GLOBAL', 'VAR_TEMP', 'VAR', 'VAR_INPUT'], 3,
            'IEC 61131-3 §6.5.5: VAR_INPUT deklariert Schnittstellen-Eingaenge; VAR ist lokaler Speicher der POU.'),
        q('Welche Eigenschaft hat ein Bezeichner mit Attribut <code>RETAIN</code>?',
            ['Behaelt seinen Wert ueber einen Warmstart hinweg', 'Ist nur in Funktionen erlaubt', 'Erzeugt eine Compile-Zeit-Konstante', 'Wird bei jedem Zyklus zurueckgesetzt'], 0,
            'IEC 61131-3 §6.5.4: RETAIN-Variablen behalten ihren Wert beim Warmstart; PERSISTENT zusaetzlich beim Kaltstart (Plattform-spezifisch).'),
        q('Welcher Qualifizierer in einer SFC-Aktion bewirkt ein <em>einmaliges</em> Setzen ohne Speicherverhalten?',
            ['<code>R</code>', '<code>N</code>', '<code>L</code>', '<code>S</code>'], 1,
            'IEC 61131-3 §6.7.5: <code>N</code> (non-stored) — Aktion ist solange aktiv, wie der Schritt aktiv ist; <code>S</code> setzt gespeichert (bleibt nach Schritt-Verlassen aktiv), <code>R</code> setzt zurueck.'),
        q('Was unterscheidet <code>VAR_GLOBAL</code> von <code>VAR_EXTERNAL</code>?',
            ['<code>VAR_GLOBAL</code> deklariert die Variable, <code>VAR_EXTERNAL</code> importiert sie in eine POU', '<code>VAR_EXTERNAL</code> ist ein Synonym fuer <code>VAR_TEMP</code>', '<code>VAR_GLOBAL</code> ist nur in Funktionen erlaubt', 'Kein Unterschied'], 0,
            'IEC 61131-3 §6.5.5: VAR_GLOBAL deklariert auf Resource/Configuration-Ebene; VAR_EXTERNAL ist die Sichtbarkeit innerhalb einer einzelnen POU auf eine bestehende globale Variable.'),
        q('Auf welcher Ebene des Software-Modells werden Tasks konfiguriert?',
            ['Program', 'Function', 'Configuration', 'Resource'], 3,
            'IEC 61131-3 §6.7.1: Tasks werden innerhalb einer Resource definiert (CYCLIC mit INTERVAL und PRIORITY oder SINGLE event-triggered).'),

        // ---- POU, Tasking, Standard-FB (16-30)
        q('Was passiert, wenn ein Aufruf eines TON-Bausteins in einem nicht-aktiven IF-Zweig liegt?',
            ['Der Compiler verweigert die Uebersetzung', 'Q wird sofort TRUE', 'Die interne Zeit laeuft trotzdem', 'Die Instanz bleibt eingefroren — die Zeitbasis wird nicht aktualisiert'], 3,
            'IEC 61131-3 §6.6.4: FB-Instanzen werden nur aktualisiert, wenn sie aufgerufen werden — fehlt der zyklische Aufruf, friert der Zustand ein.'),
        q('Welche Standard-FB-Beschreibung trifft auf <code>TP</code> (Pulse) zu?',
            ['Off-delay: Q bleibt nach fallender Flanke noch PT TRUE', 'Bei steigender Flanke wird Q fuer genau PT TRUE und ist nicht retriggerbar', 'Aufwaerts-Zaehler bis PV', 'On-delay: Q wird PT nach steigender Flanke TRUE'], 1,
            'IEC 61131-3 Annex F: TP — bei steigender Flanke an IN wird Q fuer die Pulszeit PT wahr; weitere Flanken waehrend des Pulses werden ignoriert.'),
        q('Welche Funktion erfuellt <code>R_TRIG</code>?',
            ['PI-Regler', 'Tiefpassfilter', 'Erkennung einer steigenden Flanke an CLK', 'Wurzelfunktion'], 2,
            'IEC 61131-3 Annex F: R_TRIG erzeugt einen einzelnen TRUE-Impuls (Q) bei steigender Flanke an CLK; F_TRIG analog fuer fallende Flanke.'),
        q('Welche FB-Variante ist <em>set-dominant</em>?',
            ['Keiner der Standard-FB ist dominant', '<code>SR</code> (Inputs S1, R)', '<code>RS</code> (Inputs S, R1)', 'Beide gleich'], 1,
            'IEC 61131-3 Annex F: SR-FB hat S1 als dominanten Setz-Eingang (bei S1=1 und R=1 bleibt Q1=1); RS ist reset-dominant (R1 dominant).'),
        q('Welche Variablen liefert ein <code>CTU</code> (Up-Counter) zurueck?',
            ['Q (Schwelle erreicht), CV (aktueller Zaehlerstand)', 'Nur CV', 'Q, CV, ET, IN', 'Q, PT'], 0,
            'IEC 61131-3 Annex F: CTU mit Eingaengen CU (count-up), R (reset), PV (preset) liefert Q (TRUE wenn CV ≥ PV) und CV (current value).'),
        q('Welche Bedingung ist hinreichend, dass eine cyclic Task die Echtzeitanforderung erfuellt?',
            ['WCET + Jitter + Interrupt-Latenz <= Periode', 'WCET = Periode', 'Periode beliebig waehlbar', 'Mittlere Ausfuehrungszeit < Periode'], 0,
            'Klassische harte Echtzeit-Bedingung (Liu/Layland 1973, allg. anwendbar): die Worst-Case-Antwortzeit der Task muss kleiner-gleich der Deadline / Periode sein.'),
        q('Was bedeutet ein "Task-Overrun" auf einer SPS?',
            ['Der Stack laeuft ueber', 'Eine Task hat ihre Periode ueberschritten', 'Eine Task wurde gestrichen', 'Die Spannung ist ausgefallen'], 1,
            'Heinrich 2021 §6.4.2: Task-Overrun = die Ausfuehrung einer Task war noch nicht fertig, als die naechste Periode begann; Diagnose-Bit + Reaktion sind Plattform-konfigurierbar.'),
        q('Welche Scheduling-Strategie ist auf einer Industrie-SPS am verbreitetsten?',
            ['Cooperative ohne Pre-emption', 'Round-Robin ohne Prioritaet', 'Earliest-Deadline-First (EDF)', 'Fixed-Priority preemptive'], 3,
            'In allen verbreiteten Echtzeit-Kerneln (VxWorks, Tasking-Layer von CODESYS, TwinCAT) wird Fixed-Priority preemptive Scheduling eingesetzt — RM/DM-Analyse ist anwendbar.'),
        q('Welche Funktion hat das PLCopen-XML-Format?',
            ['Definition von OPC-UA-Knotenids', 'Visualisierung von HMI', 'Tool-uebergreifender Austausch von IEC-61131-3-Projekten', 'Kompilierung in Maschinencode'], 2,
            'PLCopen TC6 XML v2.01 (2009): herstelleruebergreifender Austausch von POU, Bibliotheken, Tasks zwischen Engineering-Tools.'),
        q('Welche objektorientierte Erweiterung in IEC 61131-3 Ed. 3 entspricht in etwa der Java-Schnittstelle (interface)?',
            ['<code>NAMESPACE</code>', '<code>ALIAS</code>', '<code>CLASS</code>', '<code>INTERFACE</code>'], 3,
            'IEC 61131-3:2013 §6.6.5: INTERFACE deklariert eine reine Methodensignatur ohne Implementierung; mehrfach-implementierbar.'),
        q('Welche Sprache ist fuer komplexe Algorithmen am besten geeignet?',
            ['Strukturierter Text (ST)', 'SFC ohne ST-Aktionen', 'Kontaktplan (LD)', 'Anweisungsliste (IL)'], 0,
            'ST ist pascal-aehnlich, deckt Kontrollstrukturen, Funktionen, Mathematik vollstaendig ab; LD ist auf bool/zaehler-Logik spezialisiert.'),
        q('Welche Aussage zu <code>VAR_TEMP</code> ist korrekt?',
            ['Nur in CONFIGURATION zulaessig', 'Erzeugt eine retentive Variable', 'Wert bleibt zwischen Aufrufen erhalten', 'Wird bei jedem POU-Aufruf neu initialisiert'], 3,
            'IEC 61131-3 §6.5.5: VAR_TEMP existiert nur waehrend eines Aufrufs; in FUNCTIONs sind alle lokalen Variablen implizit temporaer.'),
        q('Welche Methode wird verwendet, um Daten zwischen Tasks unterschiedlicher Prioritaet konsistent auszutauschen?',
            ['Doppelpufferung / Shadow-Variables / atomarer Zugriff', 'Spinlocks im Anwendungsprogramm', 'Signal/SIGINT', 'Globale Variable ohne Schutz'], 0,
            'Plattform-Praxis (Heinrich 2021 §6.4.4): zur Vermeidung von Race-Conditions zwischen Tasks unterschiedlicher Prioritaet werden Doppelpuffer oder atomare Plattform-Mechanismen verwendet.'),
        q('Was ist ein typischer SPS-Watchdog?',
            ['Eine Diagnose-LED', 'Ein Sensor zur Stromueberwachung', 'Ein Timer, der bei Ueberschreitung einer Grenz-Ausfuehrungszeit eine Reaktion ausloest', 'Ein RPC-Mechanismus zur Cloud'], 2,
            'Watchdog-Timer: wird zyklisch zurueckgesetzt; bleibt das Reset aus, wird die Steuerung in den sicheren Zustand gefahren — ueblich in IEC 61508-konformen Systemen.'),
        q('Welche Bibliotheks-Konvention reduziert Namenskollisionen?',
            ['Kurze, generische Namen', 'Eindeutige Hersteller- oder Domaenen-Praefixe', 'Nur Kleinbuchstaben', 'Keine — Namen sind global frei'], 1,
            'PLCopen-Empfehlung und Industrie-Praxis: Praefixe wie <code>SF_</code> (Safety), Hersteller-Kuerzel oder Domaenen-Praefixe schuetzen vor Kollisionen.'),

        // ---- Funktionale Sicherheit IEC 61508 / 62061 / ISO 13849-1 (31-42)
        q('Welche Norm ist die <em>Grundnorm</em> fuer funktionale Sicherheit programmierbarer Systeme?',
            ['IEC 61508', 'ISO 9001', 'ISO 27001', 'IEC 61131-3'], 0,
            'IEC 61508 Ed. 2.0:2010 ist die generische Grundnorm; sektorale Anwendungen (62061 Maschinen, 61511 Prozessindustrie, 50128 Bahn) leiten daraus ab.'),
        q('In welcher Bandbreite liegt PFH fuer SIL 3 (high demand)?',
            ['$10^{-7}$ … $10^{-6}$ /h', '$10^{-8}$ … $10^{-7}$ /h', '$10^{-9}$ … $10^{-8}$ /h', '$10^{-5}$ … $10^{-4}$ /h'], 1,
            'IEC 61508-1:2010 Tabelle 3: SIL 3 (high demand or continuous mode) entspricht PFH von $10^{-8}$ bis $10^{-7}$ pro Stunde.'),
        q('Wie ist die Safe Failure Fraction (SFF) definiert?',
            ['Reziprokes der MTTF', 'Anzahl der Tests pro Jahr', 'Anteil sicherer plus detektierter gefaehrlicher Ausfaelle an allen Ausfaellen', 'Quotient aus PFD und PFH'], 2,
            'IEC 61508-2:2010 §7.4.4: $\\mathrm{SFF}=(\\sum\\lambda_S+\\sum\\lambda_{DD})/(\\sum\\lambda_S+\\sum\\lambda_D)$.'),
        q('Welcher SIL ist maximal erreichbar bei Type-B-Element, HFT = 1, SFF = 90%?',
            ['SIL 1', 'SIL 2', 'SIL 3', 'SIL 4'], 2,
            'IEC 61508-2:2010 Tabelle 3 (Type-B-Subsystems): HFT=1 + SFF in [90%, 99%] -> max. SIL 3.'),
        q('Was bedeutet eine Architektur "1oo2"?',
            ['Zwei Kanaele fuehren parallel verschiedene Funktionen aus', 'Einer-aus-zwei: ein Kanal genuegt zum Ausloesen der Sicherheitsfunktion', 'Ein Kanal nur fuer Diagnose', 'Zwei Kanaele muessen beide ausloesen'], 1,
            'IEC 61508-6 Annex B: 1oo2 = 1-out-of-2 — ein Kanal allein loest aus; hohe Sicherheit, aber haeufigere Fehl-Ausloesungen.'),
        q('Welche Norm ist die Maschinen-spezifische Anwendung von IEC 61508?',
            ['IEC 60204-1', 'ISO 12100', 'IEC 61131-6', 'IEC 62061:2021'], 3,
            'IEC 62061:2021 ist die sektorale Anwendung von IEC 61508 fuer Maschinen-Sicherheit; ISO 13849-1 ist die alternative Maschinen-Norm.'),
        q('Welche Klassifizierung verwendet ISO 13849-1?',
            ['SIL 1–4', 'PL a–e', 'Class A–D', 'Tier 1–3'], 1,
            'ISO 13849-1:2023 §4.5: Performance Level PL a (geringste Risikoreduktion) bis PL e (hoechste).'),
        q('Welche Eingangsgroessen bestimmen den PL nach ISO 13849-1?',
            ['Nur Anzahl Kanaele', 'SFF und HFT', 'Kategorie + MTTF<sub>D</sub> + DC<sub>avg</sub>', 'Nur PFH'], 2,
            'ISO 13849-1:2023 §4.5: Kategorie (B, 1, 2, 3, 4), Mean Time To Dangerous Failure und Diagnostic Coverage avg ergeben den PL.'),
        q('Was ist gemaess IEC 61508 ein "Type B"-Subsystem?',
            ['Sensor in Niederspannung', 'Mechanischer Schalter', 'Komplexes Element (z.B. Mikrocontroller) mit nicht vollstaendig vorhersagbarem Versagensverhalten', 'Element mit Ausfallrate 0'], 2,
            'IEC 61508-2:2010 §7.4.4.1.3: Type B = mindestens ein Bauteil mit nicht vollstaendig spezifiziertem Ausfallverhalten (typ. Mikrocontroller, ASIC); Type A umfasst nur einfache, voll spezifizierte Bauteile.'),
        q('Welcher PLCopen-Safety-FB realisiert eine Notausschaltung?',
            ['<code>SF_EmergencyStop</code>', '<code>SF_SafetyGuard</code>', '<code>SF_EnableSwitch</code>', '<code>SF_TwoHandControlTypeII</code>'], 0,
            'PLCopen Safety TS Part 1 v2.01 (2018) §5.3.2: SF_EmergencyStop konformiert Not-Aus gemaess EN/IEC 60204-1 + ISO 13850.'),
        q('Was schreibt IEC 61131-6:2012 vor?',
            ['Kommunikationsprofile fuer EtherCAT', 'Programmiersprachen fuer Visualisierung', 'Funktionale Sicherheit speziell fuer SPS, ergaenzend zu IEC 61508', 'OPC-UA-Companion-Specs'], 2,
            'IEC 61131-6:2012: Functional Safety speziell fuer SPS — definiert sicherheitsbezogene Software-Anforderungen ergaenzend zu IEC 61508.'),
        q('Welcher Datenfluss ist zwischen Standard- und Safety-Steuerung typischerweise <em>nicht</em> direkt erlaubt?',
            ['Standard schreibt direkt in Safety-Variablen', 'Safety liest eigene Diagnose-Werte', 'Safety liest Standard-Variablen', 'Standard liest Safety-Variablen'], 0,
            'Standard-Praxis (z.B. Siemens F-CPU, B&amp;R SafeLOGIC): Standard nach Safety nur ueber dedizierte Mechanismen mit Ruecklesepruefung; direktes Schreiben verletzt die Trennung der Bewertungspfade.'),

        // ---- IEC 61499 (43-50)
        q('Welche Ausgabe der IEC 61499 ist aktuell gueltig?',
            ['Ed. 1.0:1999', 'Ed. 1.0:2005', 'Ed. 2.0:2012', 'Ed. 3.0:2018'], 2,
            'IEC 61499-1:2012 (Ed. 2.0) ist die aktuelle Ausgabe der Function-Block-Norm fuer verteilte Steuerungssysteme.'),
        q('Was ist das zentrale Ausfuehrungsmodell der IEC 61499?',
            ['Continuous-Time-Simulation', 'Polling jedes Datenflusses', 'Zyklische Abarbeitung wie IEC 61131-3', 'Ereignisgetriebene Ausfuehrung mit Event-Eingaengen/-Ausgaengen'], 3,
            'IEC 61499-1:2012 §6: FBs werden durch Events (EI/EO) aktiviert; Daten (DI/DO) sind ueber WITH-Beziehungen an Events gekoppelt.'),
        q('Welche Zustandsbeschreibung verwendet ein Basic Function Block in IEC 61499 intern?',
            ['Execution Control Chart (ECC)', 'Klassen-Diagramm', 'Sequence Diagram', 'Petri-Netz'], 0,
            'IEC 61499-1:2012 §6.2: Basic FB enthaelt ein ECC — Zustandsautomat mit Transitionen, die durch Events getriggert werden und Algorithmen aufrufen.'),
        q('Welche Modell-Ebene umfasst in IEC 61499 das Mapping einer Application auf physische Geraete?',
            ['Configuration', 'POU', 'Resource', 'Device'], 3,
            'IEC 61499-1:2012 §4.4: Devices kapseln Resources; eine Application wird ueber das Device-Modell auf konkrete physische Knoten verteilt.'),
        q('Welche FB-Variante in IEC 61499 dient als Schnittstelle zu Hardware oder Kommunikation?',
            ['Composite FB', 'Service Interface FB (SIFB)', 'Adapter FB', 'Basic FB'], 1,
            'IEC 61499-1:2012 §6.4: SIFB stellen Hardware-/Kommunikations-Schnittstellen bereit (I/O-Zugriff, Bus-Telegramme); werden vom Plattform-Anbieter geliefert.'),
        q('Welche Open-Source-Plattform ist die verbreitete Referenzimplementierung der IEC 61499?',
            ['TwinCAT', 'CODESYS', 'Eclipse 4DIAC (4diac-ide / FORTE)', 'TIA Portal'], 2,
            'Eclipse 4DIAC (Foundation: 4diac-ide als Engineering, FORTE als Runtime) ist die offene Referenzplattform fuer IEC 61499.'),
        q('Welcher industrielle Anbieter hat 2021 eine kommerzielle Plattform auf Basis von IEC 61499 (EcoStruxure Automation Expert) eingefuehrt?',
            ['Schneider Electric', 'Mitsubishi', 'Siemens', 'Rockwell'], 0,
            'Schneider Electric "EcoStruxure Automation Expert" (eingefuehrt 2021): kommerzielle IEC-61499-Plattform basierend auf nxtControl-Akquisition.'),
        q('Was leistet eine WITH-Beziehung in IEC 61499?',
            ['Definiert eine Vererbung', 'Realisiert eine Sicherheits-Ueberwachung', 'Verbindet zwei Devices', 'Koppelt einen Daten-Pin an einen Event-Pin, sodass die Daten beim Event als gueltig gelten'], 3,
            'IEC 61499-1:2012 §6.1: WITH ordnet einer Datenleitung den Event zu, der die Gueltigkeit signalisiert — ohne WITH ist der Datenwert beim Event nicht zwingend frisch.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 3 — Feldbus / Industrial Ethernet / TSN — PRODUKTIV
    // Quellen: IEC 61158/61784 Feldbusprofile; IEC 61784-2:2019; IEC 62541
    // (OPC UA) Parts 1/4/6/14; IEEE 802.1Q-2022, IEEE 802.1AS-2020,
    // IEEE 802.1CB-2017; ETG.1000 EtherCAT; CiA 301; Modbus AP V1.1b3;
    // IEC 62443-3-2:2020 / -3-3:2013; OPC Foundation OPC UA FX 1.00.
    // ----------------------------------------------------------------------
    const PAGE_FIELD_REALTIME = {
        title: '3.1 Industrial Ethernet und Echtzeitklassen',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) klassische Feldbusse gegen Industrial Ethernet abgrenzen, (2) harte von weicher Echtzeit unterscheiden, (3) Latenz und Jitter fuer Steuerungsaufgaben bewerten, (4) PROFINET, EtherCAT, EtherNet/IP, Modbus-TCP und CANopen grob einordnen.</blockquote><h4>3.1.1 Von Feldbus zu Industrial Ethernet</h4><p>Klassische Feldbusse wie PROFIBUS DP/PA, CANopen oder DeviceNet wurden fuer zyklische Prozessdaten mit begrenzter Bandbreite und deterministischem Zugriff entworfen. Industrial Ethernet nutzt dagegen IEEE-802.3-Physik und Switches, kombiniert aber zyklische Echtzeit-Kommunikation mit TCP/IP-Diagnose, Engineering und vertikaler Integration.</p><p><strong>Wichtig:</strong> Ethernet allein ist nicht automatisch echtzeitfaehig. Determinismus entsteht erst durch Kommunikationsprofil, Scheduling, Priorisierung, Zeit-Synchronisation und begrenzte Netztopologie.</p><h4>3.1.2 Echtzeitbegriffe</h4><ul><li><strong>Latenz:</strong> Zeit vom Senden bis zur nutzbaren Ankunft eines Prozessdatums.</li><li><strong>Jitter:</strong> Schwankung dieser Latenz bzw. des Zyklusstarts.</li><li><strong>Isochron:</strong> feste, synchronisierte Zykluslage fuer Antriebe und Motion-Control.</li><li><strong>Deterministisch:</strong> obere Schranke fuer Latenz/Jitter ist bekannt und im Engineering eingehalten.</li></ul><p>Fuer diskrete SPS-Logik reichen oft Zyklen von 4-20 ms. Mehrachs-Motion verlangt haeufig 250 us bis 1 ms und sehr kleinen Jitter, weil Sollwerte phasengleich an allen Achsen ankommen muessen.</p><h4>3.1.3 Protokollfamilien</h4><table><thead><tr><th>Technik</th><th>Prinzip</th><th>Typische Staerke</th></tr></thead><tbody><tr><td>PROFINET RT/IRT</td><td>RT priorisiert Ethernet-Frames; IRT nutzt geplante Zeitfenster</td><td>Breite SPS-/Antriebs-Integration</td></tr><tr><td>EtherCAT</td><td>Telegramm wird im Durchlauf verarbeitet (processing on the fly)</td><td>Sehr kurze Zyklen, Motion-Control</td></tr><tr><td>EtherNet/IP</td><td>CIP ueber TCP/UDP, implizite zyklische I/O-Verbindungen</td><td>Rockwell-/ODVA-Oekosystem</td></tr><tr><td>Modbus-TCP</td><td>Einfaches Registermodell ueber TCP</td><td>Gateway, einfache Geraete, Diagnose</td></tr><tr><td>CANopen</td><td>CAN-basierte Objektverzeichnisse und PDO/SDO</td><td>Kompakte Maschinenmodule, Embedded-Antriebe</td></tr></tbody></table><p class="text-xs text-slate-500"><em>Quellen: IEC 61158/61784 Feldbusprofile; IEC 61784-2:2019 Industrial-Communication-Profiles; Popp, Industrial Communication with Fieldbus and Ethernet, 2010; ODVA EtherNet/IP Specification Vol. 1; CiA 301 CANopen Application Layer.</em></p>'
    };

    const PAGE_FIELD_PROTOCOLS = {
        title: '3.2 PROFINET, EtherCAT, Modbus, CANopen',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) PROFINET RT und IRT unterscheiden, (2) das EtherCAT-Durchlaufprinzip erklaeren, (3) Modbus-TCP als nicht-hart-echtzeitfaehig einordnen, (4) CANopen-Objektverzeichnis und PDO/SDO beschreiben.</blockquote><h4>3.2.1 PROFINET</h4><p>PROFINET ist in IEC 61158/61784 als Industrial-Ethernet-Profil (CPF 3) beschrieben. <strong>PROFINET RT</strong> nutzt Ethernet-Frames mit Priorisierung fuer zyklische Prozessdaten und laeuft ueber Standard-Switches. <strong>PROFINET IRT</strong> reserviert geplante Zeitfenster im Zyklus und benoetigt Engineering von Topologie, Kommunikationsbeziehungen und Geraetezeiten.</p><p>Redundanz kann u.a. ueber MRP-Ringe realisiert werden; Diagnose, Geraeteidentifikation und Profile (z.B. PROFIdrive, PROFIsafe) sind zentrale Staerken im Maschinenbau.</p><h4>3.2.2 EtherCAT</h4><p>EtherCAT (IEC 61158/61784, ETG.1000) sendet ein oder wenige Summen-Telegramme durch die Linie. Jedes Slave-Geraet liest und schreibt seine Daten <em>on the fly</em>, waehrend das Telegramm vorbeilaeuft. Die <strong>FMMU</strong> (Fieldbus Memory Management Unit) mappt logische Prozessabbild-Adressen auf lokale Slave-Speicherbereiche; <strong>Distributed Clocks</strong> synchronisieren Geraetezeiten fuer isochrone Achsen.</p><h4>3.2.3 Modbus-TCP und CANopen</h4><p>Modbus-TCP kapselt das einfache Modbus-Registermodell in TCP. Es ist leicht zu implementieren und fuer Gateways beliebt, liefert aber wegen TCP, Request/Response-Modell und fehlendem globalen Zyklus keine harte Echtzeitgarantie.</p><p>CANopen (CiA 301) baut auf CAN-Arbitration auf: niedrigere Identifier haben hoehere Prioritaet. Das <strong>Object Dictionary</strong> strukturiert Parameter; PDOs transportieren Prozessdaten, SDOs dienen Parametrierung und Diagnose.</p><p class="text-xs text-slate-500"><em>Quellen: IEC 61784-2:2019 CPF 3 (PROFINET), ETG.1000 EtherCAT Specification, Modbus Application Protocol Specification V1.1b3, CiA 301 CANopen Application Layer and Communication Profile.</em></p>'
    };

    const PAGE_FIELD_OPCUA = {
        title: '3.3 OPC UA — Architektur, Pub/Sub und Security',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) OPC-UA-Client/Server und Pub/Sub unterscheiden, (2) Information-Modeling mit Nodes und References einordnen, (3) Security-Policies und Zertifikate erklaeren, (4) OPC UA FX als Bruecke zur Feldebene beschreiben.</blockquote><h4>3.3.1 Architektur und Informationsmodell</h4><p>OPC UA ist in IEC 62541 standardisiert. Der Kern ist ein typisierter Adressraum aus <strong>Nodes</strong> und <strong>References</strong>. Namespaces trennen Hersteller-, Companion-Spec- und Anlagenmodelle. Dadurch uebertraegt OPC UA nicht nur Bytes, sondern Bedeutung: Einheit, Datentyp, Methode, Alarm, Zustand und Beziehungen koennen maschinenlesbar beschrieben werden.</p><p><strong>Client/Server</strong> ist zustandsbehaftet: Sessions, Subscriptions, Monitored Items und Services fuer Lesen, Schreiben, Browsen und Methodenaufruf. Es passt gut fuer SCADA, MES, Engineering und Diagnose.</p><h4>3.3.2 Pub/Sub und OPC UA FX</h4><p><strong>OPC UA Pub/Sub</strong> (IEC 62541 Part 14) entkoppelt Publisher und Subscriber. Nachrichten koennen als UADP ueber UDP oder ueber Broker-Transporte wie MQTT laufen. Fuer Feldkommunikation wird Pub/Sub mit TSN kombiniert, damit zyklische Daten zeitlich geplant uebertragen werden koennen.</p><p><strong>OPC UA FX</strong> (Field eXchange) erweitert OPC UA um Controller-to-Controller- und Controller-to-Device-Kommunikation, Profile, Deskriptoren und Konformitaetsklassen fuer die Feldebene. Ziel ist semantische Interoperabilitaet plus deterministischer Transport ueber Ethernet/TSN.</p><h4>3.3.3 Security</h4><p>OPC UA verwendet Application-Instance-Zertifikate, Security-Policies, Message-Signing und Verschluesselung. User-Authentication (z.B. Username/Password, Zertifikat, Token) ist von der Secure-Channel-Absicherung zu unterscheiden. In OT-Netzen gehoeren Zertifikats-Lifecycle, Trust-Lists und Rollenmodell zum Engineering — sonst scheitert Interoperabilitaet oft an falsch gepflegten Trust Stores.</p><p class="text-xs text-slate-500"><em>Quellen: IEC 62541-1:2020 Overview and Concepts; IEC 62541-4:2020 Services; IEC 62541-6:2020 Mappings; IEC 62541-14:2020 PubSub; OPC Foundation OPC UA FX Release 1.00; IEC 62443-3-3:2013 Security Requirements.</em></p>'
    };

    const PAGE_FIELD_TSN = {
        title: '3.4 Time-Sensitive Networking, Auslegung und Migration',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) TSN als IEEE-802.1-Werkzeugkasten erklaeren, (2) Qbv, Qbu/802.3br, 802.1AS und 802.1CB einordnen, (3) Netz-Auslegung fuer deterministische OT-Kommunikation strukturieren, (4) Migrationsrisiken von Legacy-Bussen benennen.</blockquote><h4>3.4.1 TSN-Bausteine</h4><p>Time-Sensitive Networking ist kein einzelnes Protokoll, sondern eine Familie von IEEE-802.1-Erweiterungen. <strong>IEEE 802.1AS-2020</strong> liefert gPTP-Zeitsynchronisation. <strong>IEEE 802.1Qbv</strong> definiert Time-Aware Shaping: Ausgangsqueues werden per Gate-Control-List in geplanten Zeitfenstern geoeffnet oder gesperrt. <strong>IEEE 802.1Qbu / IEEE 802.3br</strong> erlauben Frame Preemption, damit kurze Echtzeitframes grosse Best-Effort-Frames unterbrechen koennen. <strong>IEEE 802.1CB</strong> repliziert und eliminiert Frames fuer hoehere Verfuegbarkeit.</p><h4>3.4.2 Engineering-Prinzipien</h4><p>Deterministische Netze entstehen durch Engineering: Zykluszeit, Datenmenge, Topologie, Switch-Latenzen, Queue-Prioritaeten, Zeitsynchronisation und Stoerreserven muessen zusammenpassen. VLAN-PCP nach IEEE 802.1Q priorisiert Traffic, garantiert aber allein keine harte Schranke; dafuer braucht es geplante Fenster oder per-stream Reservierung.</p><p>Ein typischer Entwurf trennt Traffic-Klassen: Safety und Motion mit kurzen Zyklen, zyklische I/O-Daten, azyklische Diagnose, Engineering/IT. Fuer Security wird das Kommunikationsmodell in IEC-62443-Zonen und -Conduits ueberfuehrt, statt ein flaches Produktionsnetz zu betreiben.</p><h4>3.4.3 Migration</h4><p>Legacy-Feldbusse werden selten in einem Schritt ersetzt. Gateways koennen Prozessdaten uebersetzen, verlieren aber oft Semantik, Diagnose-Tiefe oder Echtzeitgarantien. Darum zuerst Kommunikationsanforderungen erfassen: Zykluszeit, Jitterbudget, Safety-Profil, Diagnose, Hersteller-Oekosystem, Kabelwege, Redundanz und Lifecycle.</p><p>Bei Brownfield-Anlagen ist eine hybride Architektur ueblich: bestehende Bussegmente bleiben lokal, neue Zellen nutzen Industrial Ethernet/TSN, und OPC UA stellt semantische Daten an SCADA/MES/Cloud bereit.</p><p class="text-xs text-slate-500"><em>Quellen: IEEE 802.1Q-2022 (Bridge/VLAN, Qbv, Qbu), IEEE 802.1AS-2020 gPTP, IEEE 802.1CB-2017 FRER, IEC/IEEE 60802 TSN Profile for Industrial Automation (Draft/Profiles), IEC 62443-3-2:2020 Zones and Conduits.</em></p>'
    };

    const QUIZ_FIELD = [
        q('Was unterscheidet PROFINET IRT am deutlichsten von PROFINET RT?',
            ['IRT nutzt nur TCP und ist daher langsamer', 'IRT verwendet geplante/reservierte Zeitfenster fuer isochrone Kommunikation', 'IRT ist ausschliesslich fuer Modbus-Gateways gedacht', 'IRT verzichtet auf Ethernet-Switches'], 1,
            'IEC 61784-2 CPF 3: PROFINET IRT reserviert deterministische Kommunikationsphasen; RT priorisiert Frames, plant aber keine isochronen Fenster.'),
        q('Was ist das zentrale EtherCAT-Prinzip fuer kurze Zykluszeiten?',
            ['Slaves verarbeiten das Telegramm im Durchlauf (processing on the fly)', 'Jeder Slave baut eine TCP-Session auf', 'Alle Nutzdaten werden per MQTT brokerbasiert verteilt', 'Nur azyklische Registerzugriffe sind erlaubt'], 0,
            'ETG.1000 EtherCAT: Prozessdaten werden waehrend des Telegrammdurchlaufs gelesen/geschrieben, statt pro Geraet separate Frames zu senden.'),
        q('Welche Aufgabe hat die FMMU in EtherCAT-Slaves?',
            ['Verschluesselung des Prozessabbilds', 'Vergabe von IPv6-Adressen', 'Mapping logischer Prozessabbild-Adressen auf lokale Slave-Speicherbereiche', 'Berechnung von Safety-CRC fuer PROFIsafe'], 2,
            'ETG.1000 beschreibt die Fieldbus Memory Management Unit als Mechanismus fuer logische Adressierung des Prozessdatenabbilds.'),
        q('Wofuer werden EtherCAT Distributed Clocks primaer genutzt?',
            ['Nutzerverwaltung im Engineering-Tool', 'Automatische IP-Vergabe', 'Konvertierung von CANopen-Objekten', 'Synchronisation verteilter Geraetezeiten fuer isochrone Achsen'], 3,
            'EtherCAT Distributed Clocks synchronisieren lokale Uhren, damit Achsen und I/O zeitgleich abtasten bzw. ausgeben koennen.'),
        q('Warum gilt Modbus-TCP nicht als harte Echtzeit-Kommunikation?',
            ['Weil es nur auf seriellen Leitungen laeuft', 'Wegen TCP/Request-Response-Modell ohne deterministisch geplanten globalen Zyklus', 'Weil es keine Register kennt', 'Weil es Verschluesselung zwingend erfordert'], 1,
            'Modbus Application Protocol V1.1b3: Modbus-TCP nutzt ein einfaches Request/Response-Modell ueber TCP; deterministische Zeitfenster gehoeren nicht zum Protokoll.'),
        q('Wie funktioniert CAN-Arbitration qualitativ?',
            ['Niedrigere Identifier gewinnen die bitweise Arbitration und haben hoehere Prioritaet', 'Hoehere Nutzdatenlaenge gewinnt immer', 'Alle Teilnehmer senden strikt reihum', 'Arbitration erfolgt nur durch einen zentralen Master'], 0,
            'CAN nutzt nicht-destruktive bitweise Arbitration; dominante Bits niedriger Identifier setzen sich durch, siehe ISO 11898/CAN-Grundprinzip.'),
        q('Was ist das CANopen Object Dictionary?',
            ['Ein verschluesseltes Passwort-Verzeichnis', 'Eine Liste aller Ethernet-Switches', 'Strukturierter Parameter- und Datenraum eines CANopen-Geraets', 'Ein OPC-UA-Namespace fuer Cloud-Daten'], 2,
            'CiA 301 definiert das Object Dictionary als zentrales Modell fuer Kommunikations- und Applikationsobjekte.'),
        q('Was modelliert der OPC-UA-Adressraum?',
            ['Nur lineare Register ab Adresse 40001', 'Ausschliesslich MQTT-Topics', 'Nur Rohbytes ohne Typinformationen', 'Nodes und References mit Typen, Methoden, Ereignissen und semantischen Beziehungen'], 3,
            'IEC 62541-3 beschreibt Nodes, References, NodeClasses und Typinformationen als Kern des OPC-UA-Informationsmodells.'),
        q('Was ist der Hauptzweck von OPC UA Pub/Sub nach Part 14?',
            ['Ersetzen aller SPS-Tasks durch JavaScript', 'Entkopplung von Publishern und Subscribern fuer verteilte Datenverteilung', 'Ausschliesslich Dateiuebertragung', 'Nur Benutzer-Login fuer SCADA'], 1,
            'IEC 62541-14: PubSub entkoppelt Datenquelle und Empfaenger; UADP/UDP oder Broker-Transporte sind moeglich.'),
        q('Welche Aussage zu OPC-UA-Security ist korrekt?',
            ['Application-Instance-Zertifikate, Security-Policies, Signieren und Verschluesselung sichern den Secure Channel', 'OPC UA verbietet Zertifikate', 'Security besteht nur aus VLAN-Prioritaet', 'Passwort im Klartext ist die empfohlene Standardloesung'], 0,
            'IEC 62541-2/4/6: Secure Channel nutzt Zertifikate und Security-Policies mit Sign/Encrypt; User-Authentication ist davon getrennt.'),
        q('Wofuer steht OPC UA FX?',
            ['Ein Ersatz fuer HTML in HMIs', 'Eine Feldbusvariante ohne Informationsmodell', 'Field eXchange: OPC-UA-Profile fuer Controller/Device-Kommunikation in der Feldebene', 'Ein reiner Cloud-Broker ohne Echtzeitbezug'], 2,
            'OPC Foundation OPC UA FX Release 1.00 zielt auf Field eXchange mit Profilen fuer Controller-to-Controller und Controller-to-Device.'),
        q('Was leistet IEEE 802.1Qbv?',
            ['Zufaellige Backoff-Steuerung wie altes Halbduplex-Ethernet', 'Automatische Passwortrotation', 'Ersetzen von TCP durch CAN', 'Time-Aware Shaping mit Gate-Control-Listen fuer Ausgangsqueues'], 3,
            'IEEE 802.1Q-2022 enthaelt Qbv Time-Aware Shaper: Queues werden in geplanten Zeitfenstern freigegeben oder gesperrt.'),
        q('Welche Rolle hat IEEE 802.1AS-2020 in TSN-Netzen?',
            ['Definition von Modbus-Funktionscodes', 'gPTP-Zeitsynchronisation fuer Bridges und Endstationen', 'Spezifikation von PROFIsafe', 'Kompression von OPC-UA-Nodes'], 1,
            'IEEE 802.1AS-2020 definiert generalized Precision Time Protocol (gPTP) fuer zeitbewusste Ethernet-Systeme.'),
        q('Was ist der Zweck von Frame Preemption nach IEEE 802.1Qbu/802.3br?',
            ['Kurze Express-Frames koennen lange preemptable Frames unterbrechen', 'Alle Frames werden absichtlich verzoegert', 'Zertifikate werden automatisch signiert', 'CAN-Identifier werden in VLANs uebersetzt'], 0,
            'IEEE 802.1Qbu und IEEE 802.3br definieren Frame Preemption, um Blocking durch lange Best-Effort-Frames zu reduzieren.'),
        q('Welche Aussage beschreibt TSN am besten?',
            ['Ein einzelnes proprietaeres Feldbusprotokoll', 'Ein Ersatz fuer jede Applikationsschicht', 'Ein IEEE-802.1-Werkzeugkasten fuer deterministische Ethernet-Kommunikation', 'Nur ein Security-Standard fuer Passwoerter'], 2,
            'TSN besteht aus mehreren IEEE-802.1-Mechanismen wie 802.1AS, Qbv, Qbu und 802.1CB; es ist kein einzelnes Applikationsprotokoll.'),
        q('Was erfordert PROFINET IRT typischerweise im Engineering?',
            ['Keine Topologiekenntnis', 'Nur manuelle Registerlisten', 'Ausschliesslich WLAN', 'Planung von Topologie, Kommunikationsbeziehungen und reservierten Zyklusphasen'], 3,
            'PROFINET IRT erreicht Determinismus durch geplante Kommunikationsphasen; Topologie und Geraeterollen sind deshalb Engineering-relevant.'),
        q('Worauf basiert EtherNet/IP technisch?',
            ['Nur I2C auf Backplane', 'CIP ueber TCP/UDP/IP mit impliziten und expliziten Verbindungen', 'Ausschliesslich OPC-UA-PubSub', 'CANopen-SDO ohne Ethernet'], 1,
            'ODVA EtherNet/IP: Common Industrial Protocol (CIP) wird ueber TCP/UDP/IP transportiert; zyklische I/O nutzt implizite Messaging-Verbindungen.'),
        q('Welche Zeitbasis nutzt CIP Sync?',
            ['IEEE 1588 Precision Time Protocol', 'NTP ohne Hardware-Zeitstempel', 'Manuelle Uhrzeit aus HMI', 'Nur CAN-Bus-Arbitration'], 0,
            'ODVA CIP Sync basiert auf IEEE 1588/PTP fuer Zeitsynchronisation in EtherNet/IP-Systemen.'),
        q('Was kennzeichnet OPC UA Client/Server?',
            ['Zustandslose Broadcast-Telegramme ohne Sessions', 'Ausschliesslich deterministische Motion-Zyklen', 'Services, Sessions, Subscriptions und Monitored Items fuer Lesen/Schreiben/Browsen', 'Nur Register 0 bis 9999'], 2,
            'IEC 62541-4 definiert OPC-UA-Services; Client/Server nutzt Sessions, Subscriptions und Monitored Items.'),
        q('Welcher Transport ist fuer OPC UA Pub/Sub mit UADP typisch?',
            ['Nur RS-232', 'Nur PROFIBUS-PA', 'Ausschliesslich SMS', 'UDP-Multicast bzw. UDP-basierte Verteilung, alternativ Broker-Transporte'], 3,
            'IEC 62541-14 beschreibt UADP ueber UDP sowie Broker-basierte Mappings, z.B. MQTT.'),
        q('Was ist bei OPC-UA-Zertifikaten besonders wichtig?',
            ['Zertifikate sind nur optische UI-Elemente', 'Trust-Lists und Zertifikats-Lifecycle muessen gepflegt werden', 'Sie ersetzen jede Netzwerksegmentierung', 'Sie duplizieren VLAN-PCP'], 1,
            'IEC 62541 Security-Modell: Application Instance Certificates und Trust Lists sind Betriebsobjekte; abgelaufene oder nicht vertraute Zertifikate verhindern Verbindungen.'),
        q('Welche IEC-62443-Konzepte helfen bei OT-Netzsegmentierung?',
            ['Zones und Conduits', 'Nur Passwortlaenge', 'Nur Display-Aufloesung', 'Nur CAN-Identifier'], 0,
            'IEC 62443-3-2:2020 strukturiert industrielle Systeme in Zonen und Conduits fuer Risikoanalyse und Security-Anforderungen.'),
        q('Was ist ein typisches Gateway-Risiko bei Legacy-Bus-Migration?',
            ['Gateways erhoehen automatisch jede Echtzeitgarantie', 'Gateways entfernen alle Diagnosefunktionen immer vollstaendig', 'Semantik, Diagnose-Tiefe oder Echtzeitverhalten gehen bei Protokolluebersetzung teilweise verloren', 'Gateways machen Safety-Zertifizierung ueberfluessig'], 2,
            'Gateway-Architekturen koennen Prozesswerte uebersetzen, aber nicht zwingend alle Diagnoseobjekte, Profile und Zeitgarantien erhalten.'),
        q('Warum ist Topologie fuer Industrial Ethernet relevant?',
            ['Sie bestimmt nie Latenzen', 'Sie ersetzt das Safety-Konzept', 'Sie ist nur fuer WLAN wichtig', 'Switch-Hops, Ringe, Linien und Redundanzpfade beeinflussen Latenz, Jitter und Ausfallverhalten'], 3,
            'IEC 61784-2-Profile und TSN-Engineering betrachten Topologie, Switch-Latenzen und Redundanz als zentrale Auslegungsparameter.'),
        q('Was bewirkt Cut-Through-Switching gegenueber Store-and-Forward?',
            ['Es verschluesselt automatisch Nutzdaten', 'Es kann Weiterleitungsverzoegerung reduzieren, weil nicht der ganze Frame gepuffert werden muss', 'Es macht Zeitsynchronisation unnoetig', 'Es ersetzt OPC-UA-Informationsmodelle'], 1,
            'Ethernet-Switching-Grundlagen: Cut-through beginnt Weiterleitung nach Header-Auswertung; store-and-forward wartet auf den kompletten Frame und FCS-Pruefung.'),
        q('Warum gibt es in voll-duplex switched Ethernet keine klassischen Kollisionen?',
            ['Weil CSMA/CD in Punkt-zu-Punkt-Full-Duplex-Links nicht verwendet wird', 'Weil alle Frames UDP sein muessen', 'Weil nur ein Teilnehmer existiert', 'Weil Switches immer WLAN nutzen'], 0,
            'IEEE 802.3 Full-Duplex Punkt-zu-Punkt-Links trennen Senden/Empfangen; CSMA/CD ist fuer moderne switched Industrial-Ethernet-Netze nicht relevant.'),
        q('Wofuer wird VLAN PCP nach IEEE 802.1Q genutzt?',
            ['Als Ersatz fuer PTP-Uhren', 'Zur Vergabe von Modbus-Registern', 'Zur Priorisierung von Ethernet-Frames in Traffic-Klassen', 'Zur Verschluesselung von OPC-UA-Nachrichten'], 2,
            'IEEE 802.1Q definiert Priority Code Point (PCP) im VLAN-Tag fuer Traffic-Klassen und Queue-Auswahl.'),
        q('Warum reicht QoS-Priorisierung allein nicht immer fuer harte Echtzeit?',
            ['Priorisierung deaktiviert alle Switches', 'Priorisierung ist nur fuer serielle Busse erlaubt', 'Priorisierung verhindert Semantik in OPC UA', 'Ohne Scheduling/Reservierung koennen Blocking und Lastspitzen weiterhin Jitter verursachen'], 3,
            'TSN fuehrt Time-Aware Shaping und weitere Mechanismen ein, weil reine Priorisierung keine strikte obere Schranke fuer alle Lastsituationen garantiert.'),
        q('Was unterscheidet MQTT grundsaetzlich von OPC UA Pub/Sub mit Informationsmodell?',
            ['MQTT garantiert immer Sub-Mikrosekunden-Jitter', 'MQTT ist brokerbasiert und transportiert Topics/Payloads, aber liefert allein kein standardisiertes industrielles Typ-/Objektmodell', 'MQTT ist identisch mit PROFINET IRT', 'MQTT benoetigt zwingend CAN-Arbitration'], 1,
            'MQTT ist ein leichtgewichtiges Broker-Protokoll; Semantik muss ueber Payload-Konventionen ergaenzt werden. OPC UA bringt ein standardisiertes Informationsmodell mit.'),
        q('Welche Aussage beschreibt DDS passend?',
            ['Datenzentrierter Pub/Sub-Middleware-Standard mit QoS-Policies', 'Ein Registersatz fuer Modbus', 'Ein Safety-Profil fuer PROFIBUS', 'Ein Ersatz fuer VLAN-PCP'], 0,
            'OMG DDS ist datenorientierte Pub/Sub-Middleware mit QoS-Policies; in Industrie/Robotik relevant, aber nicht identisch mit OPC UA.'),
        q('In welchem Normkontext ist PROFINET als Industrial-Ethernet-Profil eingeordnet?',
            ['Nur in HTML5', 'Nur in ISO 9001', 'IEC 61784-2, Communication Profile Family CPF 3', 'Ausschliesslich in IEEE 802.11'], 2,
            'IEC 61784-2 ordnet Real-Time-Ethernet-Profile ein; PROFINET gehoert zu CPF 3.'),
        q('Wie ist EtherCAT normativ eingeordnet?',
            ['Nur als proprietaeres HMI-Dateiformat', 'Nur als WLAN-Profil', 'Ausschliesslich als MQTT-Topic', 'IEC 61158/61784, Communication Profile Family CPF 12'], 3,
            'EtherCAT ist in IEC 61158/61784 als CPF 12 standardisiert; ETG.1000 beschreibt die technische Spezifikation.'),
        q('Welche Spezifikation ist der Kern der CANopen-Applikationsschicht?',
            ['OPC UA Part 14', 'CiA 301', 'IEEE 802.1Qbv', 'IEC 61508-2 Tabelle 2'], 1,
            'CiA 301 definiert CANopen Application Layer and Communication Profile inklusive Object Dictionary, PDO, SDO und NMT.'),
        q('Was sind Modbus Function Codes?',
            ['Operationen wie Read Holding Registers oder Write Multiple Registers', 'TSN-Gate-Zeitplaene', 'OPC-UA-Namespaces', 'EtherCAT-Distributed-Clocks'], 0,
            'Modbus Application Protocol V1.1b3 definiert Funktionscodes fuer Lese-/Schreiboperationen auf Coils und Register.'),
        q('Wovon haengt die erreichbare Zykluszeit eines Industrial-Ethernet-Systems wesentlich ab?',
            ['Nur von der Farbe des Kabels', 'Nur vom HMI-Theme', 'Datenmenge, Geraetezahl, Topologie, Switch-/Slave-Latenzen und Kommunikationsprofil', 'Nur vom Namen des SPS-Programms'], 2,
            'IEC 61784-2 und TSN-Engineering: Zykluszeit ergibt sich aus Nutzdaten, Teilnehmerzahl, Topologie, Scheduling und Geraetelatenzen.'),
        q('Was bedeutet Jitter in zyklischer Kommunikation?',
            ['Maximale Nutzdatenlaenge', 'Anzahl der OPC-UA-Nodes', 'Name des Safety-Profils', 'Zeitliche Schwankung von Zyklusstart, Ankunft oder Latenz'], 3,
            'Echtzeitdefinition: Jitter ist die Abweichung von idealen periodischen Zeitpunkten; fuer Motion-Control oft kritischer als mittlere Latenz.'),
        q('Wie unterscheiden sich Latenz und Jitter?',
            ['Beides bedeutet VLAN-ID', 'Latenz ist absolute Uebertragungsverzoegerung, Jitter deren Schwankung', 'Jitter ist immer groesser als Bandbreite', 'Latenz ist ein Passworttyp'], 1,
            'Latenz misst Verzoegerung; Jitter misst Variation der Verzoegerung oder Zykluszeit.'),
        q('Was meint das Black-Channel-Prinzip bei Safety-over-Fieldbus?',
            ['Das Safety-Protokoll erkennt Kommunikationsfehler ende-zu-ende, der darunterliegende Kanal muss nicht sicherheitszertifiziert sein', 'Der Bus darf keinerlei Diagnose haben', 'Alle Nutzdaten werden schwarz eingefärbt', 'Safety wird durch hoehere Bandbreite ersetzt'], 0,
            'IEC 61784-3 Safety Communication Profiles nutzen Ende-zu-Ende-Mechanismen wie Sequenz, Timeout und CRC ueber einem nicht-sicheren Kommunikationskanal.'),
        q('Welches Safety-Profil ist typisch fuer EtherCAT?',
            ['PROFIsafe', 'CIP Safety', 'FSoE (Fail Safe over EtherCAT)', 'OPC UA Alarms'], 2,
            'ETG.5100 spezifiziert FSoE als Safety-over-EtherCAT-Profil nach Black-Channel-Prinzip.'),
        q('Welches Safety-Profil wird mit PROFIBUS/PROFINET assoziiert?',
            ['FSoE', 'CANopen Safety only', 'MQTT Safety', 'PROFIsafe'], 3,
            'PROFIsafe ist das Safety-Communication-Profil der PROFIBUS/PROFINET-Welt, standardisiert im Kontext IEC 61784-3.'),
        q('Was definieren OPC-UA-Companion-Spezifikationen?',
            ['Nur Ethernet-Kabeltypen', 'Domaenenspezifische Informationsmodelle, z.B. fuer Maschinen, Robotik oder PLCopen', 'CAN-Arbitrationspegel', 'TSN-Gate-Hardware'], 1,
            'OPC Foundation Companion Specs standardisieren branchenspezifische Nodes, Typen und Semantik auf Basis von IEC 62541.'),
        q('Warum sind stabile Namespace-URIs in OPC UA wichtig?',
            ['Sie identifizieren semantische Modelle eindeutig ueber Server und Versionen hinweg', 'Sie ersetzen alle Zertifikate', 'Sie definieren die CAN-Bitrate', 'Sie aktivieren automatisch Frame Preemption'], 0,
            'IEC 62541 Namespace-Konzept: Namespace-URIs vermeiden Namenskollisionen und erlauben eindeutige Interpretation von Typen und BrowseNames.'),
        q('Welche Datenart sollte fuer harte zyklische Regelung bevorzugt werden?',
            ['Ausschliesslich HMI-Screenshots', 'Nur E-Mail-Anhaenge', 'Zyklische Prozessdaten mit geplantem Timing statt ungebundener azyklischer Diagnose', 'Beliebige Cloud-REST-Calls im Steuerungszyklus'], 2,
            'Echtzeit-Kommunikation trennt zyklische Prozessdaten von azyklischer Diagnose; ungebundene Diagnose darf den Regelzyklus nicht dominieren.'),
        q('Was ist eine gute Security-Grundregel fuer IT/OT-Konvergenz?',
            ['Produktionsnetz flach mit Office-Netz koppeln', 'Alle Firewalls entfernen', 'Nur Default-Passwoerter verwenden', 'Zonen, Conduits und OT-DMZ statt direkter ungefilterter Kopplung nutzen'], 3,
            'IEC 62443-3-2 und Purdue/DMZ-Architekturen empfehlen Segmentierung in Zonen und kontrollierte Conduits zwischen IT und OT.'),
        q('Warum ist NTP fuer sub-millisekundengenaue Motion-Synchronisation meist ungeeignet?',
            ['NTP ist ein Safety-Profil', 'NTP ersetzt keine hardwaregestuetzte PTP/gPTP-Synchronisation mit geringer Unsicherheit', 'NTP definiert Modbus-Register', 'NTP ist nur fuer CAN-Identifier'], 1,
            'Motion/TSN-Systeme verwenden IEEE 1588/PTP bzw. IEEE 802.1AS gPTP mit Hardware-Zeitstempeln; NTP ist fuer solche Jitterbudgets typischerweise zu ungenau.'),
        q('Was leistet IEEE 802.1CB?',
            ['Frame Replication and Elimination for Reliability (FRER)', 'Passwortspeicherung in SPS', 'Definition von Modbus Function Codes', 'Ersetzen von OPC UA Namespaces'], 0,
            'IEEE 802.1CB-2017 definiert FRER: Frames werden ueber redundante Pfade repliziert und Duplikate am Ziel eliminiert.'),
        q('Welche Voraussetzung ist fuer TSN-Scheduling wesentlich?',
            ['Nur ein schneller Internetzugang', 'Ausschliesslich TCP-Verkehr', 'Zeitbewusste Endstationen/Switches und ein konsistenter, engineerter Zeitplan', 'Keine Topologiedokumentation'], 2,
            'IEEE 802.1Qbv/802.1AS-basierte Netze brauchen synchronisierte Teilnehmer und Gate-Zeitplaene, sonst entsteht kein deterministisches Verhalten.'),
        q('Wovon haengt Store-and-Forward-Switch-Latenz ab?',
            ['Nur von der OPC-UA-Rolle', 'Nur von der CAN-ID', 'Nur vom HMI-Benutzer', 'Frame-Laenge und Link-Geschwindigkeit, weil der ganze Frame vor Weiterleitung empfangen wird'], 3,
            'Store-and-forward prueft den kompletten Frame inklusive FCS; Serialisierungszeit skaliert mit Frame-Laenge und Bitrate.'),
        q('Wofuer steht MRP im PROFINET-Umfeld?',
            ['MQTT Register Profile', 'Media Redundancy Protocol fuer Ringredundanz', 'Motion Runtime Password', 'Modbus Routing Procedure'], 1,
            'PROFINET nutzt u.a. MRP fuer Medienredundanz in Ringtopologien; es reduziert Ausfallfolgen bei Leitungsunterbrechung.'),
        q('Welche Kriterien sind fuer die Protokollauswahl am sinnvollsten?',
            ['Latenz/Jitter, Safety, Diagnose, Semantik, Hersteller-Oekosystem, Lifecycle und Migrationsaufwand', 'Nur maximale Bruttobandbreite', 'Nur Farbe der Switches', 'Nur die Laenge des Schulungsnamens'], 0,
            'Industrielle Kommunikationsauswahl ist Multi-Kriterien-Engineering; Bandbreite allein sagt wenig ueber Determinismus, Diagnose, Safety und Wartbarkeit aus.')
    ];

    const QUIZ_CTRL = [
        q('Wie lautet die Uebertragungsfunktion eines LTI-Zustandsraummodells?',
            ['$G(s)=B(sI-A)^{-1}C+D$', '$G(s)=C(sI-A)^{-1}B+D$', '$G(s)=(sI-A)^{-1}BC$', '$G(s)=A(sI-B)^{-1}C$'], 1,
            'Lunze §3.2: $G(s)=C(sI-A)^{-1}B+D$.'),
        q('Welche Bedingung garantiert vollstaendige Steuerbarkeit eines SISO-Systems der Ordnung $n$?',
            ['$\\det A\\neq 0$', '$\\mathrm{rang}\\,[B\\,AB\\,\\ldots\\,A^{n-1}B]=n$', '$C$ regulaer', '$D=0$'], 1,
            'Kalman-Kriterium: Steuerbarkeitsmatrix muss vollen Rang haben.'),
        q('Wovon haengt die Beobachtbarkeit ab?',
            ['Nur von $A$', 'Nur von $B$', 'Vom Paar $(A,C)$', 'Von $D$'], 2,
            'Beobachtbarkeitsmatrix $\\mathcal{O}=[C^T\\,(CA)^T\\,\\ldots]^T$ — Rang $n$ erforderlich.'),
        q('Was bewirkt die Ackermann-Formel?',
            ['LQR-Loesung in geschlossener Form', 'Polplatzierung des geschlossenen Kreises', 'Minimierung der $H_\\infty$-Norm', 'Identifikation der Zustandsgleichung'], 1,
            'Ackermann 1972: explizite Formel fuer Zustands-Rueckfuehrung mit gewuenschten Polen.'),
        q('Wie erkennt man eine schlechte MIMO-Paarung im RGA?',
            ['$\\lambda_{ii}\\approx 1$', '$\\lambda_{ii}\\le 0$', '$\\lambda_{ii}\\to\\infty$', 'RGA hat negative Spur'], 1,
            'Bristol 1966: $\\lambda_{ii}\\le 0$ bedeutet, die Paarung dreht das Vorzeichen — vermeiden.'),
        q('Welche Gleichung loest der LQR-Entwurf?',
            ['Lyapunov-Gleichung', 'Algebraische Riccati-Gleichung', 'Sylvester-Gleichung', 'Bezout-Gleichung'], 1,
            'CARE: $A^TP+PA-PBR^{-1}B^TP+Q=0$.'),
        q('Welche Bedingung ist hinreichend, dass der LQR existiert?',
            ['$Q\\prec 0$', '$(A,B)$ stabilisierbar und $R\\succ 0$', '$D=I$', '$A$ Hurwitz'], 1,
            'Anderson/Moore 1990: Stabilisierbarkeit + $R$ positiv-definit garantieren eindeutige stabilisierende Loesung.'),
        q('Welche Eigenschaft gilt fuer den geschlossenen LQR-Kreis?',
            ['Phase-Margin >= 60°, Gain-Margin [0.5, ∞)', 'Phase-Margin = 30°', 'Bandbreite genau $\\omega_n$', 'Aequivalent zu PI-Regler'], 0,
            'Klassische LQR-Robustheits-Eigenschaft (Anderson/Moore §3.4): grosse Stabilitaetsreserven.'),
        q('Was sagt die Bryson-Regel?',
            ['$Q_{ii}=x_{i,\\text{max}}^2$', '$Q_{ii}=1/x_{i,\\text{max}}^2$', '$R=I$ immer', '$P$ ist diagonal'], 1,
            'Bryson/Ho 1969: kehre Quadrat der maximal zulaessigen Auslenkung als Gewichtung — normalisierte Skalierung.'),
        q('Wofuer steht "Receding Horizon" in MPC?',
            ['Konstanter Praediktionshorizont, der nicht wandert', 'Verschiebung des Horizonts um einen Schritt nach jeder Optimierung', 'Rueckwaertsintegration', 'Negative Praediktion'], 1,
            'Rawlings/Mayne 2017: zu jedem Zeitschritt wird neu optimiert, nur erstes $u_0^*$ angewendet.'),
        q('Was besagt das Trennungsprinzip (Separation Principle)?',
            ['LQR und Kalman koennen nur gemeinsam entworfen werden', 'Beobachter und LQR koennen unabhaengig entworfen werden, Stabilitaet bleibt erhalten', 'Alle Pole muessen reell sein', 'Keine Aussage zu Robustheit'], 1,
            'Joseph/Tou 1961. Achtung: garantiert Stabilitaet, nicht Robustheit (Doyle 1978).'),
        q('Welcher Beitrag von Doyle 1978 ist fuer LQG kritisch?',
            ['LQG ist robuster als LQR', 'LQG hat keine garantierten Stabilitaetsmargins', 'LQG benoetigt keinen Beobachter', 'LQG ist nichtlinear'], 1,
            '"Guaranteed margins for LQG regulators? None." — Robustheit muss separat sichergestellt werden (LQG/LTR).'),
        q('Wie wird ein Luenberger-Beobachter typischerweise dimensioniert?',
            ['Pole gleich der LQR-Pole', 'Pole 2-5x schneller als LQR-Pole', 'Pole genau imaginaer', 'Pole = Eigenwerte von $A$'], 1,
            'Faustregel Lunze §6.3: schnellere Beobachter-Dynamik, damit Schaetzfehler nicht den Regler dominiert.'),
        q('Was minimiert das Kalman-Filter?',
            ['Maximalabweichung', 'Erwartungswert des quadratischen Schaetzfehlers (MMSE)', '$L_1$-Norm', '$H_\\infty$-Norm'], 1,
            'Kalman 1960: optimaler Minimum-Mean-Square-Error-Schaetzer fuer lineare Gauss-Systeme.'),
        q('Was unterscheidet UKF von EKF?',
            ['UKF benoetigt Jacobi-Matrix', 'UKF nutzt Sigma-Punkte (Unscented Transform), kein Jacobi', 'UKF ist nur fuer lineare Systeme gedacht', 'UKF schaetzt nicht den Mittelwert'], 1,
            'Julier/Uhlmann 1997: UKF approximiert Mittelwert/Kovarianz bis 3. Ordnung exakt — keine Linearisierung noetig.'),
        q('Was ist ein "Particle Filter" gut fuer?',
            ['Lineare Gauss-Probleme', 'Nicht-Gauss / multimodale Verteilungen', 'Reine Frequenzbereichsanalyse', 'Symbolische Regelung'], 1,
            'Sequential-Monte-Carlo: Naeherung beliebiger Posterior-Verteilungen ueber Stichproben.'),
        q('Welche Eigenschaft hat eine Lyapunov-Funktion zur asymptotischen Stabilitaet?',
            ['$V<0,\\dot V>0$', '$V>0,\\dot V<0$ (mit $V(0)=0$)', '$V$ konstant', '$V$ linear'], 1,
            'Khalil §4.1: $V$ positiv-definit, $\\dot V$ negativ-definit garantiert asymptotische Stabilitaet.'),
        q('Was beschreibt das LaSalle-Invarianzprinzip?',
            ['Stabilitaet trotz $\\dot V\\equiv 0$', 'Konvergenz in groesste invariante Teilmenge wo $\\dot V=0$', 'Frequenz-Domaenen-Methode', 'Existenz einer Riccati-Loesung'], 1,
            'LaSalle 1960: Schwaecht Lyapunov auf $\\dot V\\le 0$ ab; Trajektorien laufen in groesste invariante Menge mit $\\dot V=0$.'),
        q('Was ist der Hauptnachteil klassischer Sliding-Mode-Control?',
            ['Mangelnde Robustheit', 'Chattering durch sign-Funktion', 'Hohe Rechenlast', 'Kein Stabilitaetsbeweis moeglich'], 1,
            'Hochfrequente Schaltvorgaenge belasten Aktoren; Mitigation: Saturation-Funktion oder Higher-Order-SMC (Levant 2003).'),
        q('Welche Voraussetzung erfordert Feedback-Linearisierung?',
            ['Volle Aktorzahl beliebig', 'Voller relativer Grad und involutive Distribution', 'Lineares Modell', 'Stabiles offenes System'], 1,
            'Khalil §13: Lie-Klammern muessen involutive Distribution erzeugen; sonst keine globale Linearisierung moeglich.'),
        q('Was minimiert ein H-infinity-Regler?',
            ['$L_2$-Norm der Stellgroesse', 'Maximale Energie-Verstaerkung von Stoerung zu Bewertungssignal', '$L_1$-Norm', 'Integralfehler'], 1,
            '$\\|T_{zw}\\|_\\infty$ = induzierte $L_2$-Verstaerkung — Worst-Case-Robustheit.'),
        q('Welche Sensitivitaetsfunktion bewertet Disturbance-Rejection?',
            ['Komplementaere Sensitivitaet $T$', 'Sensitivitaet $S=(I+GK)^{-1}$', 'Loop-Transfer $L=GK$', 'Plant $G$'], 1,
            'Stoerungs-Uebertragung von Stoerung zu Ausgang ist gerade $S$.'),
        q('In welchem Frequenzbereich sollte $|T|$ klein sein fuer Robustheit?',
            ['Nur bei DC', 'Hoher Frequenzbereich (Modellunsicherheit)', 'Genau bei $\\omega_n$', '$T$ irrelevant'], 1,
            'Modellfehler dominieren bei hohen Frequenzen; deshalb Roll-off von $T$ erforderlich.'),
        q('Welche Methode loest H-infinity-Probleme typischerweise?',
            ['Bode-Plot', 'Riccati-Gleichungen oder LMIs', 'Wurzelortskurve', 'Smith-Praediktor'], 1,
            'Doyle/Glover/Khargonekar/Francis 1989 (DGKF): zwei Riccati-Gleichungen. LMI-Variante Gahinet/Apkarian 1994.'),
        q('Was bedeutet "passend" (matched) im SMC-Kontext?',
            ['Stoerung greift im Stellgroessen-Kanal an', 'Stoerung im Sensorkanal', 'Stoerung exogen', 'Stoerung null'], 0,
            'SMC ist robust gegen Stoerungen, die durch dieselbe Eingangsmatrix wirken wie die Stellgroesse — "matched uncertainty".'),
        q('Was beschreibt der Backstepping-Ansatz?',
            ['Rueckwaertsintegration der Trajektorie', 'Rekursiver Lyapunov-basierter Reglerentwurf in kaskadierten Systemen', 'Diskretisierung mittels Backward-Euler', 'Frequenzbereichsmethode'], 1,
            'Krstic/Kanellakopoulos/Kokotovic 1995: Schritt-fuer-Schritt-Lyapunov-Konstruktion mit virtuellen Stellgroessen.'),
        q('Was sagt die KYP-Lemma-Aussage qualitativ?',
            ['Kein Zusammenhang zu Riccati', 'Frequenzbereich-Bedingung ist aequivalent zu LMI im Zeitbereich', 'Polplatzierung trivial', 'Nichtlineare Systeme stabil'], 1,
            'Kalman-Yakubovich-Popov-Lemma: Frequenz-Domaenen-Bedingungen <=> Riccati-/LMI-Bedingungen — Brueckenschlag.'),
        q('Welche Stabilitaet garantiert das LQR-Schema fuer einen offenen instabilen Prozess?',
            ['Asymptotische Stabilitaet des geschlossenen Kreises bei Stabilisierbarkeit', 'BIBO ohne Voraussetzungen', 'Globale Optimalitaet ohne Beweis', 'Keine'], 0,
            'Wenn $(A,B)$ stabilisierbar ist, ergibt CARE eine eindeutige $P\\succeq 0$, mit der $A-BK$ Hurwitz wird.'),
        q('Welche Norm misst $\\|G\\|_2$?',
            ['Maximale Verstaerkung im Frequenzgang', '$\\sqrt{\\frac{1}{2\\pi}\\int|G(j\\omega)|^2 d\\omega}$', 'Anzahl instabiler Pole', 'Relative Verstaerkung'], 1,
            '$H_2$-Norm = Energie der Impulsantwort = Wurzel aus Frequenzintegral der Spektraldichte.'),
        q('Welcher Industrie-Standard benennt funktionale Sicherheit fuer programmierbare Systeme?',
            ['IEC 61131-3', 'IEC 61508', 'IEC 60870-5-104', 'ISO 9001'], 1,
            'IEC 61508 (Ed. 2.0, 2010): Funktionale Sicherheit elektrischer/elektronischer/programmierbarer Systeme; SIL 1-4.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 4 — Antriebs- und Leistungselektronik (PRODUKTIV)
    // Quellen: Schroeder/Boecker "Elektrische Antriebe — Regelung von Antriebs-
    //   systemen", 5. Aufl., Springer Vieweg 2021; Leonhard "Control of
    //   Electrical Drives", 3rd ed., Springer 2001; Vas "Sensorless Vector and
    //   Direct Torque Control", Oxford UP 1998; Holmes/Lipo "Pulse Width
    //   Modulation for Power Converters", IEEE/Wiley 2003;
    //   Mohan/Undeland/Robbins "Power Electronics", 3rd ed., Wiley 2003;
    //   Park "Two-Reaction Theory of Synchronous Machines" AIEE Trans. 1929;
    //   Takahashi/Noguchi DTC IEEE Trans. IA-22 1986; Depenbrock "DSC" 1988.
    //   Standards: IEC 60034-30-1:2014 (IE-Wirkungsgradklassen),
    //   IEC 61800-5-2:2016 (PDS-SR Safety), IEC 61800-9-2:2017 (IES-Klassen),
    //   IEC 61800-3:2017 (EMV), IEEE 519-2022 (Harmonics-Limits),
    //   IEC 60364-5-52 (Kabel), DIN EN 60034-1 (rotating machines).
    // ----------------------------------------------------------------------
    const PAGE_DRIVES_MACH = {
        title: '4.1 Drehstrommaschinen und Park-/Clarke-Transformation',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Asynchron- (ASM) und permanenterregte Synchronmaschine (PMSM) abgrenzen, (2) Clarke- ($\\alpha\\beta$) und Park-Transformation ($dq$) physikalisch und mathematisch erklaeren, (3) das Drehmoment in $dq$-Koordinaten formulieren, (4) Schlupf, Drehmoment-Schlupf-Kennlinie und Kippmoment der ASM einordnen.</blockquote><h4>4.1.1 Maschinentypen im industriellen Antrieb</h4><p>Die <strong>Asynchronmaschine</strong> (Kaefiglaeufer-ASM) ist robust, wartungsarm und der Standard fuer Pumpen, Lueftungen und Foerderantriebe. Drehmoment entsteht durch das im Laeufer induzierte Stromsystem; der Laeufer folgt dem Drehfeld mit dem Schlupf $s=\\frac{n_s-n}{n_s}$ und $n_s=\\frac{60\\,f}{p}$ (in min$^{-1}$, $p$ Polpaare).</p><p>Die <strong>permanenterregte Synchronmaschine</strong> (PMSM) erreicht hohe Wirkungsgrade und Leistungsdichte. Der Rotor traegt Magnete (oberflaechen- oder vergraben/IPMSM); das Statorfeld muss synchron mitlaufen. PMSM dominieren in Servoantrieben, E-Mobilitaet und vielen modernen Hauptantrieben. Die <strong>Reluktanzmaschine</strong> (SynRM) gewinnt in Pumpen-/Geblaeseanwendungen Marktanteile, da sie ohne Magnete auskommt.</p><h4>4.1.2 Clarke- und Park-Transformation</h4><p>Drehstromgroessen $i_a, i_b, i_c$ werden zunaechst per <strong>Clarke-Transformation</strong> in das ortsfeste Zweiphasensystem $\\alpha\\beta$ ueberfuehrt:</p><p>$$\\begin{pmatrix}i_\\alpha\\\\ i_\\beta\\end{pmatrix}=\\frac{2}{3}\\begin{pmatrix}1 & -\\tfrac{1}{2} & -\\tfrac{1}{2}\\\\ 0 & \\tfrac{\\sqrt{3}}{2} & -\\tfrac{\\sqrt{3}}{2}\\end{pmatrix}\\begin{pmatrix}i_a\\\\ i_b\\\\ i_c\\end{pmatrix}.$$</p><p>Bei amplitudeninvarianter Form ($\\tfrac{2}{3}$-Skalierung) bleiben Spitzenwerte erhalten; mit $\\sqrt{2/3}$ ist die Transformation leistungsinvariant.</p><p>Die <strong>Park-Transformation</strong> dreht $\\alpha\\beta$ in das mit dem Rotor- bzw. Flusswinkel $\\vartheta$ rotierende $dq$-System:</p><p>$$\\begin{pmatrix}i_d\\\\ i_q\\end{pmatrix}=\\begin{pmatrix}\\cos\\vartheta & \\sin\\vartheta\\\\ -\\sin\\vartheta & \\cos\\vartheta\\end{pmatrix}\\begin{pmatrix}i_\\alpha\\\\ i_\\beta\\end{pmatrix}.$$</p><p>Im stationaeren Betrieb sind $i_d, i_q$ Gleichgroessen — daraus stammt der Vorteil von $dq$-PI-Reglern.</p><h4>4.1.3 Drehmoment in dq-Koordinaten</h4><p>Fuer die PMSM gilt</p><p>$$M=\\tfrac{3}{2}\\,p\\,\\bigl(\\Psi_{PM}\\,i_q+(L_d-L_q)\\,i_d i_q\\bigr).$$</p><p>Bei oberflaechenmagnetischer PMSM ist $L_d\\approx L_q$, der Reluktanzanteil verschwindet und Drehmoment ist proportional zu $i_q$. Bei der ASM in rotorflussfester $dq$-Orientierung gilt analog $M=\\tfrac{3}{2}\\,p\\,\\tfrac{L_m}{L_r}\\,\\Psi_r\\,i_q$.</p><h4>4.1.4 Drehmoment-Schlupf-Kennlinie der ASM</h4><p>Die <strong>Klosssche Gleichung</strong> beschreibt im stationaeren Zustand</p><p>$$\\frac{M}{M_{kipp}}=\\frac{2}{\\tfrac{s}{s_{kipp}}+\\tfrac{s_{kipp}}{s}}.$$</p><p>$M_{kipp}$ ist das Kippmoment, $s_{kipp}$ der zugehoerige Kippschlupf. Im stabilen Bereich $0<s<s_{kipp}$ steigt $M$ ungefaehr linear mit $s$; bei Ueberschreiten kippt die Maschine. Der Stator-Strom verhaelt sich qualitativ wie ein Transformator-Kurzschlussstrom mit lastabhaengigem Sekundaerwiderstand $R_2/s$.</p><p class="text-xs text-slate-500"><em>Quellen: Schroeder/Boecker "Elektrische Antriebe" 5. Aufl. 2021 Kap. 5/8; Park, AIEE Trans. 1929; Clarke "Circuit Analysis of A-C Power Systems" 1943; Leonhard "Control of Electrical Drives" 3rd ed. 2001 Kap. 10-12; IEC 60034-1.</em></p>'
    };

    const PAGE_DRIVES_FOC = {
        title: '4.2 Feldorientierte Regelung (FOC) und DTC',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) das Grundprinzip der feldorientierten Regelung (FOC) erklaeren, (2) FOC fuer PMSM und ASM unterscheiden, (3) Stromregelung im $dq$-System mit Entkopplung beschreiben, (4) sensorlose Verfahren (Back-EMF, HFI) und Direct Torque Control (DTC) einordnen.</blockquote><h4>4.2.1 Idee der FOC</h4><p>FOC, auch <em>Vector Control</em>, regelt eine Drehfeldmaschine im rotierenden $dq$-System, in dem flussbildende und drehmomentbildende Komponente entkoppelt sind: $i_d$ steuert den magnetischen Fluss, $i_q$ das Drehmoment. Damit verhaelt sich die Maschine in der Regelung wie eine fremderregte Gleichstrommaschine mit unabhaengiger Erregung und Anker.</p><p>Standardstruktur: Drehzahl-/Lageregler liefert Drehmoment-Sollwert; daraus werden $i_d^*, i_q^*$ bestimmt; PI-Stromregler in $dq$ erzeugen Spannungs-Sollwerte $u_d^*, u_q^*$; inverse Park/Clarke-Transformation liefert die Statorspannungen, die per PWM gestellt werden.</p><h4>4.2.2 PMSM-FOC</h4><p>Fuer oberflaechenmagnetische PMSM (SPMSM) ist die Standardstrategie <strong>$i_d=0$</strong>: dann ist $M\\propto i_q$, der Stator-Strom minimiert (max. M/A) und Verluste reduziert. Bei IPMSM mit $L_d\\ne L_q$ wird MTPA (Maximum Torque per Ampere) bzw. MTPV (Maximum Torque per Volt) eingesetzt — bei Feldschwaechung liefert ein negatives $i_d$ ein gegen den Magnetfluss wirkendes Statorfeld und erlaubt Drehzahlen oberhalb der Nenndrehzahl.</p><p>Die Stromregelstrecke ist im $dq$-System verkoppelt: $u_d=R_s i_d+L_d \\dot i_d-\\omega_e L_q i_q$ und $u_q=R_s i_q+L_q \\dot i_q+\\omega_e (L_d i_d+\\Psi_{PM})$. PI-Regler arbeiten gut, wenn die <strong>Kreuzkopplung</strong> per Vorsteuerung kompensiert wird — Feedforward-Terme $\\omega_e L_q i_q$ und $\\omega_e (L_d i_d+\\Psi_{PM})$ werden zum Reglerausgang addiert.</p><h4>4.2.3 ASM-FOC</h4><p>Bei der ASM gibt es keinen physikalischen Magnetfluss; der Rotorfluss muss aus Statorgroessen geschaetzt oder eingepraegt werden. Die <strong>indirekte FOC</strong> (Hasse-Leonhard) berechnet die Schlupffrequenz aus $\\omega_{sl}=\\frac{1}{T_r}\\frac{i_q}{i_d}$ ($T_r=L_r/R_r$ ist die Rotorzeitkonstante) und integriert sie zum Flusswinkel. Die <strong>direkte FOC</strong> (Blaschke) misst oder schaetzt $\\Psi_r$ explizit. $i_d$ baut den Rotorfluss auf und wird ueblicherweise konstant gehalten, $i_q$ stellt das Drehmoment.</p><h4>4.2.4 Sensorlose Verfahren</h4><p>Mittlere bis hohe Drehzahlen: Modellbasierte <strong>Back-EMF-Beobachter</strong> (z.B. erweiterter Luenberger, EKF, Sliding-Mode-Beobachter) schaetzen den Rotorlagewinkel aus Spannungen und Stroemen. Bei sehr niedrigen Drehzahlen verschwindet die Back-EMF; <strong>HFI</strong> (High Frequency Injection) speist ein hochfrequentes Pruefsignal ein und nutzt die magnetische Anisotropie ($L_d\\ne L_q$) der IPMSM zur Lageschaetzung.</p><h4>4.2.5 Direct Torque Control (DTC)</h4><p>DTC nach Takahashi/Noguchi (IEEE TIA 1986) regelt Statorfluss und Drehmoment direkt durch Hystereseregler und eine Schalttabelle, die je nach Lage des Statorflusszeigers einen der acht Wechselrichter-Zustaende auswaehlt. Vorteile: sehr schnelle Drehmoment-Antwort (typ. < 1 ms), keine PWM/Stromregler im klassischen Sinn. Nachteile: variable Schaltfrequenz, Drehmoment-Welligkeit und groesserer Berechnungsaufwand der Flussschaetzung. Moderne Varianten (DTC-SVM, predictive DTC) kombinieren DTC-Schaltlogik mit Raumzeiger-Modulation und reduzieren so die Welligkeit.</p><p class="text-xs text-slate-500"><em>Quellen: Vas "Sensorless Vector and Direct Torque Control" 1998; Schroeder/Boecker 2021 Kap. 13/14; Leonhard 2001 Kap. 12/13; Takahashi/Noguchi IEEE Trans. IA-22 1986; Depenbrock IEEE Trans. PE-3 1988 (DSC); Holtz "Sensorless Control of Induction Machines" Proc. IEEE 2002.</em></p>'
    };

    const PAGE_DRIVES_INV = {
        title: '4.3 Umrichter-Topologien und Pulsweitenmodulation',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Spannungs- und Stromzwischenkreis-Umrichter (VSI/CSI) abgrenzen, (2) 2-Level- und Multilevel-Topologien (NPC, T-type, MMC) einordnen, (3) Sinus-PWM, dritter-Harmonischer-Injektion und Raumzeiger-Modulation (SVPWM) unterscheiden, (4) Schaltverluste, EMV und $du/dt$ als Auslegungsgroessen einordnen.</blockquote><h4>4.3.1 Topologien</h4><p>Industrieller Standard ist der <strong>Spannungszwischenkreis-Umrichter</strong> (VSI) mit 3-phasiger 2-Level-B6-Brueckenschaltung. Pro Phase schalten zwei IGBT/MOSFET zwischen $+U_{ZK}$ und $0$. Der Zwischenkreiskondensator stuetzt die Gleichspannung. Stromzwischenkreis-Umrichter (CSI) mit Drosseln im Zwischenkreis sind heute auf Hochleistungsanwendungen (z.B. Sehr-Grosse-Antriebe) beschraenkt.</p><p><strong>Multilevel</strong>-Topologien (NPC nach Nabae/Takahashi/Akagi 1981, T-Type, FCC, MMC) reduzieren $du/dt$, Filteraufwand und Spannungsbeanspruchung der Halbleiter; Preis sind mehr Schalter und komplexere Modulation. Im Mittelspannungsbereich (3,3 / 6,6 kV) sind 3-Level-NPC und MMC Standard, in Servoanwendungen meist 2-Level mit Wide-Bandgap-Halbleitern (SiC/GaN).</p><h4>4.3.2 Sinus-PWM und Modulationsindex</h4><p>Bei Sinus-PWM wird ein dreiphasiges Sollspannungssystem $u_a^*, u_b^*, u_c^*$ mit einer hochfrequenten Dreiecksspannung verglichen; Schnittpunkte schalten den jeweiligen Bruckenzweig. Der lineare Modulationsbereich ist auf den Modulationsgrad $m\\le 1$ begrenzt: die maximale Phasenspannungsamplitude ist $\\hat{U}_{ph}=\\tfrac{1}{2}U_{ZK}$, die maximale Aussenleiterspannung $\\sqrt{3}\\,\\hat{U}_{ph}\\approx 0{,}866\\,U_{ZK}$.</p><h4>4.3.3 Dritte-Harmonische-Injektion und SVPWM</h4><p>Mit Injektion einer dritten Harmonischen oder mit <strong>Raumzeiger-PWM (SVPWM)</strong> wird der lineare Bereich auf $\\hat{U}_{ph,\\max}=\\tfrac{U_{ZK}}{\\sqrt{3}}$ erweitert — ein Spannungsgewinn von $\\tfrac{2}{\\sqrt{3}}\\approx 1{,}155$. Die Aussenleiterspannung ist dann $U_{LL,\\max}=U_{ZK}$. SVPWM betrachtet die acht moeglichen Schaltzustaende des B6 als Raumzeiger ($V_0\\dots V_7$, davon 6 aktive und 2 Null-Vektoren) und kombiniert sie zeitlich, um den Sollzeiger zu erzeugen.</p><h4>4.3.4 Schaltfrequenz, Verluste und EMV</h4><p>Die Schaltfrequenz $f_s$ bestimmt Stromripple, Geraeuschspektrum, Schaltverluste und Filterbedarf. <strong>Schaltverluste</strong> wachsen ungefaehr linear mit $f_s$, <strong>Durchlassverluste</strong> haengen vom Strom-Mittelwert ab. Hohe $du/dt$-Werte verursachen Lagerstroeme (EDM-Erosion), Wicklungsbeanspruchung an der ersten Wicklung und EMV-Probleme — Gegenmittel sind $du/dt$-Filter, Sinusfilter, isolierte Lager oder Wellenerdung. EMV-Anforderungen ergeben sich aus IEC 61800-3 (PDS-EMV) und industriellen Umgebungsklassen.</p><h4>4.3.5 Halbleiter-Materialien</h4><p>Si-IGBT bleiben Arbeitspferd fuer mittlere Schaltfrequenzen (typ. 2-16 kHz). <strong>SiC-MOSFET</strong> erlauben hoehere Sperrspannungen und schaltgeschwindigkeiten bei kleineren Verlusten und werden in Antrieben mit hoher Leistungsdichte eingesetzt. <strong>GaN-HEMT</strong> dominieren niedrige Spannungsklassen (≤ 650 V) mit sehr hohen Schaltfrequenzen, sind aber im klassischen Industrieantrieb noch Nische. Wirkungsgrade bewegen sich heute fuer Industrieumrichter im Bereich 96-99 %.</p><p class="text-xs text-slate-500"><em>Quellen: Holmes/Lipo "PWM for Power Converters" 2003; Mohan/Undeland/Robbins "Power Electronics" 3rd ed. 2003; Kazmierkowski/Krishnan/Blaabjerg "Control in Power Electronics" 2002; Nabae/Takahashi/Akagi IEEE Trans. IA-17 1981 (NPC); IEC 61800-3:2017 EMV; IEEE 519-2022 Harmonics; Schroeder 2021 Kap. 4.</em></p>'
    };

    const PAGE_DRIVES_SERVO = {
        title: '4.4 Servoachsen-Auslegung, Reglerkaskade und Antriebs-Safety',
        html: '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die klassische Reglerkaskade Strom-/Drehzahl-/Lageregelung dimensionieren, (2) das Massentraegheits-Verhaeltnis $J_{Last}/J_{Motor}$ bewerten, (3) Trapez-, S-Kurven- und Jerk-limitierte Bahnen unterscheiden, (4) sicherheitsbezogene Stoppfunktionen nach IEC 61800-5-2 (STO/SS1/SS2/SLS/SOS/SDI/SLA) einordnen, (5) Geberarten und IES-Wirkungsgradklassen einordnen.</blockquote><h4>4.4.1 Reglerkaskade</h4><p>Servoantriebe nutzen drei kaskadierte Schleifen — innen Strom, mittig Drehzahl, aussen Lage. Faustregel ist <strong>Bandbreitentrennung 1:5</strong> (oder 1:5:5): jede aeussere Schleife hat ungefaehr ein Fuenftel der Bandbreite der inneren, damit innere Schleife als idealer Ein-Eingang/Ein-Ausgang-Pfad erscheint.</p><ul><li><strong>Stromregler</strong> (innen): typ. 1-3 kHz Bandbreite; PI in $dq$-Koordinaten (siehe 4.2). Tastrate haeufig $f_s/1$ oder $f_s/2$ der PWM.</li><li><strong>Drehzahlregler</strong>: typ. 200-500 Hz; meist PI, Filterung der Geberauswertung.</li><li><strong>Lageregler</strong>: typ. 50-150 Hz; haeufig P-Regler mit Geschwindigkeitsvorsteuerung.</li></ul><p>Symmetrisches Optimum und Betrags-Optimum (nach Kessler/Schroeder) sind Standard-Auslegungsregeln; bei resonanten Achsen wird zusaetzlich ein Notch- oder Bi-Quad-Filter eingesetzt.</p><h4>4.4.2 Massentraegheits-Verhaeltnis</h4><p>Das Verhaeltnis $J_{Last}^*/J_{Motor}$ (Last bezogen auf die Motorwelle, also durch Getriebeuebersetzung quadratisch reduziert) ist ein zentraler Auslegungsparameter. Werte unter etwa 5:1 sind unkritisch; oberhalb 10:1 wird die Achse schwingungsanfaellig, Eigenfrequenzen ruecken in die Reglerbandbreite, und Resonanzen muessen aktiv gedaempft werden. Sehr niedrige Verhaeltnisse (< 1:1) deuten auf einen ueberdimensionierten Motor und sind oekonomisch ineffizient.</p><h4>4.4.3 Bahnplanung</h4><p>Eine <strong>Trapezbahn</strong> hat konstante Beschleunigung, dafuer Spruenge im Ruck (Jerk) — sie regt mechanische Eigenfrequenzen an. Eine <strong>S-Kurve</strong> begrenzt die Beschleunigungs-Aenderung und reduziert dadurch Schwingungen, Geraeusche und Werkzeugverschleiss. <strong>Jerk-limitierte</strong> oder polynomiale Bahnen (z.B. Bahn 7-Segment, Spline) erlauben gezieltes Vorgeben aller Ableitungen bis zur Schnappe; sie sind Standard in modernen Robotern und Werkzeugmaschinen.</p><h4>4.4.4 Antriebs-Safety nach IEC 61800-5-2</h4><p>IEC 61800-5-2:2016 (PDS-SR — Power Drive System with Safety-Related functions) standardisiert sicherheitsbezogene Stoppfunktionen, die im Antrieb selbst integriert sind:</p><ul><li><strong>STO</strong> Safe Torque Off — Drehmoment wird abgeschaltet, Energiezufuhr unterbrochen; entspricht Stoppkategorie 0 nach EN 60204-1.</li><li><strong>SS1</strong> Safe Stop 1 — gefuehrtes Bremsen, danach STO; Stoppkategorie 1.</li><li><strong>SS2</strong> Safe Stop 2 — gefuehrtes Bremsen, danach SOS (Achse haelt Lage geregelt); Stoppkategorie 2.</li><li><strong>SOS</strong> Safe Operating Stop — Lage wird ueberwacht gehalten, Motor bleibt aktiv.</li><li><strong>SLS</strong> Safely-Limited Speed — Drehzahl ist sicher unterhalb einer Grenze.</li><li><strong>SLA / SLT</strong> Safely-Limited Acceleration / Torque — analog fuer Beschleunigung bzw. Drehmoment.</li><li><strong>SDI</strong> Safe Direction — Drehrichtung sicher festgelegt.</li><li><strong>SBC</strong> Safe Brake Control — sichere Ansteuerung externer Haltebremsen.</li></ul><p>Die Funktionen erreichen typischerweise PL e nach ISO 13849-1:2023 oder SIL 3 nach IEC 62061:2021, abhaengig von Architektur und Diagnoseabdeckung. STO ist die meistverbaute Funktion und schaltet die Pulsfreigabe der Wechselrichter-Treiber redundant ab — der Schuetz im Hauptstromkreis kann entfallen, was Verschleiss spart.</p><h4>4.4.5 Geber, Wirkungsgrad und Norm-Klassen</h4><p><strong>Geber</strong>: Inkremental-Encoder geben Impulse mit AB-Quadratur und Index; Absolut-Encoder (SSI, BiSS-C, EnDat 2.2, HIPERFACE DSL) liefern absolute Position auch nach Spannungsausfall; Resolver sind robust und temperaturfest. Multi-Turn-Absolutgeber sparen Referenzfahrt.</p><p><strong>Wirkungsgrad</strong>: IEC 60034-30-1:2014 klassifiziert Motoren in IE1-IE5; IEC 61800-9-2:2017 klassifiziert das gesamte Antriebssystem (Motor + CDM) in IES0-IES2. Die EU-Oekodesign-Verordnung 2019/1781 schreibt fuer viele neue Antriebe Mindestklassen IE3/IE4 vor.</p><p class="text-xs text-slate-500"><em>Quellen: Schroeder/Boecker "Elektrische Antriebe" 5. Aufl. 2021 Kap. 14-16; Leonhard 2001 Kap. 9; IEC 61800-5-2:2016 (PDS-SR); IEC 61800-9-2:2017; IEC 60034-30-1:2014; ISO 13849-1:2023; IEC 62061:2021; EN 60204-1:2018; EU-Verordnung 2019/1781.</em></p>'
    };

    const QUIZ_DRIVES = [
        // 4.1 — Maschinen, Park/Clarke (12 Fragen)
        q('Wodurch entsteht das Drehmoment in einer Asynchronmaschine mit Kaefiglaeufer?',
            ['Durch Hall-Sensoren in den Statornuten', 'Durch Permanentmagnete im Rotor', 'Durch geschaltete Reluktanz wie bei der SRM', 'Durch im Laeufer induzierte Stroeme im Drehfeld'], 3,
            'Schroeder/Boecker 2021 Kap. 5: Im Kaefiglaeufer werden durch das relative Drehfeld Stroeme induziert; Wechselwirkung mit dem Statorfeld erzeugt das Drehmoment.'),
        q('Welche Beziehung gilt fuer die Synchrondrehzahl einer Drehfeldmaschine?',
            ['$n_s = 60\\,p\\,f$', '$n_s = \\frac{60\\,f}{p}$', '$n_s = \\frac{f}{60\\,p}$', '$n_s = p\\,f$'], 1,
            'Standardbeziehung mit $p$ als Polpaarzahl und $f$ in Hz; Ergebnis in min$^{-1}$.'),
        q('Was beschreibt der Schlupf $s$ einer ASM?',
            ['Verhaeltnis von Stator- zu Rotorstrom', 'Differenz zwischen Synchron- und Laeuferdrehzahl, normiert auf $n_s$', 'Frequenz der Statorspannung', 'Verhaeltnis Laeuferinduktivitaet/Statorinduktivitaet'], 1,
            '$s = (n_s - n)/n_s$. Bei $s=0$ laeuft der Rotor synchron und es wird kein Strom induziert, also kein Drehmoment.'),
        q('Was leistet die Clarke-Transformation?',
            ['Wandlung dreiphasiger Groessen in das ortsfeste $\\alpha\\beta$-System', 'Wandlung in das rotorfeste $dq$-System', 'Berechnung des Schlupfs', 'Glaettung der PWM-Spannung'], 0,
            'Clarke 1943 / Schroeder Kap. 8: Die Clarke-Transformation ueberfuehrt $abc$ in das ortsfeste Zweiphasensystem $\\alpha\\beta$; ein Bezug auf die Drehlage erfolgt erst durch Park.'),
        q('Wofuer dient die Park-Transformation?',
            ['Schalten der IGBT', 'Drehung von $\\alpha\\beta$ in das mit dem Rotor- oder Flusswinkel rotierende $dq$-System', 'Pruefung der Phasenfolge', 'Messung der Zwischenkreisspannung'], 1,
            'Park "Two-Reaction Theory" AIEE 1929: Drehung mit dem Winkel $\\vartheta$ in $dq$, in dem stationaere Groessen Gleichgroessen werden.'),
        q('Welche Strategie minimiert bei oberflaechenmagnetischer PMSM den Stator-Strom fuer ein gegebenes Drehmoment?',
            ['$i_q=0$', '$i_d=i_q$', '$i_d=0$', '$i_d=-i_q$'], 2,
            'SPMSM: $L_d\\approx L_q$, kein Reluktanzanteil; $M\\propto i_q$. Mit $i_d=0$ wird $|i_s|=|i_q|$ minimal fuer das geforderte Drehmoment.'),
        q('Was ist der Reluktanzanteil im Drehmoment einer IPMSM?',
            ['Kupferverluste im Stator', 'Der Anteil $\\Psi_{PM}\\,i_d$', 'Reibung im Lager', 'Der Anteil $\\tfrac{3}{2}p(L_d-L_q)i_d i_q$'], 3,
            'Schroeder 2021 Kap. 13: Bei $L_d\\ne L_q$ tragen Reluktanzkraefte zusaetzlich zum Magnetanteil bei; in IPMSM gezielt genutzt.'),
        q('Worin unterscheidet sich die amplitudeninvariante von der leistungsinvarianten Clarke-Transformation?',
            ['Sie verwendet andere Frequenzen', 'Sie ist nur fuer DC zulaessig', 'Vorfaktor $\\tfrac{2}{3}$ erhaelt Spitzenwerte; $\\sqrt{2/3}$ erhaelt die Wirkleistung', 'Eine erlaubt nur 6-pulsigen Betrieb'], 2,
            'Standard: Vorfaktor $\\tfrac{2}{3}$ liefert gleiche Amplituden wie im $abc$-System; $\\sqrt{2/3}$ liefert leistungsinvariante Form.'),
        q('Welche Aussage zur Klosschen Gleichung der ASM ist korrekt?',
            ['Sie beschreibt das Verhaeltnis $M/M_{kipp}$ als Funktion von $s/s_{kipp}$', 'Sie gilt nur fuer Synchronmaschinen', 'Sie ersetzt die Park-Transformation', 'Sie ist nur fuer Permanentmagnetmaschinen anwendbar'], 0,
            'Stationaere Drehmoment-Schlupf-Kennlinie: $M/M_{kipp}=2/(s/s_{kipp}+s_{kipp}/s)$.'),
        q('Was kennzeichnet den stabilen Betriebsbereich einer ASM mit konstanter Statorspannung?',
            ['Schlupf grosser als $s_{kipp}$', 'Schlupf gleich 1 (Stillstand)', 'Schlupf $s>1$ (Generatorbetrieb mit Bremswirkung)', 'Schlupf $0<s<s_{kipp}$, $M$ steigt monoton mit $s$'], 3,
            'Im stabilen Bereich kann ein Lastsprung durch leichten Schlupfanstieg ausgeglichen werden; jenseits $s_{kipp}$ kippt die Maschine.'),
        q('Welche Maschine kommt ohne Permanentmagnete und ohne Laeuferwicklung mit Klemmen aus?',
            ['Permanenterregte Synchronmaschine', 'Schleifring-ASM', 'Stromrichtergespeiste DC-Maschine', 'Synchron-Reluktanzmaschine (SynRM)'], 3,
            'SynRM nutzt nur die anisotrope Reluktanz des Rotors; weder Magnete noch Wicklung mit Aussenanschluss.'),
        q('Welche Stromkomponente baut bei der ASM in rotorflussfester $dq$-Orientierung den Rotorfluss auf?',
            ['$i_q$', '$i_d$', '$i_0$ (Nullsystem)', 'Der Aussenleiterstrom $i_a$ direkt'], 1,
            'Hasse-Leonhard / Blaschke: $i_d$ entspricht dem Magnetisierungsstrom; $i_q$ ist drehmomentbildend.'),

        // 4.2 — FOC und DTC (13 Fragen)
        q('Was ist das Kernziel der feldorientierten Regelung?',
            ['Vermeidung jeder Strommessung', 'Entkopplung von flussbildender und drehmomentbildender Stromkomponente', 'Synchronisation auf das Netz', 'Direkter Verzicht auf einen Wechselrichter'], 1,
            'Schroeder Kap. 13/14: FOC zerlegt den Statorstromzeiger in $i_d$ (Fluss) und $i_q$ (Drehmoment) und regelt beide getrennt.'),
        q('Welche Groesse wird in der indirekten ASM-FOC typischerweise berechnet, statt sie zu messen?',
            ['Statorstrom', 'Zwischenkreisspannung', 'Schlupffrequenz aus $i_q/i_d$ und Rotorzeitkonstante $T_r$', 'PWM-Periode'], 2,
            'Hasse-Leonhard: $\\omega_{sl} = \\tfrac{1}{T_r}\\tfrac{i_q}{i_d}$, daraus wird der Flusswinkel integriert (indirekt).'),
        q('Was bedeutet "Feldschwaechung" bei einer PMSM?',
            ['Demagnetisierung der Magnete im Normalbetrieb', 'Negativer $i_d$ erzeugt Statorfeld gegen den Magnetfluss; ermoeglicht hoehere Drehzahlen', 'Abschaltung der Permanentmagnete', 'Reduktion von $i_q$ auf null'], 1,
            'Schroeder 2021 Kap. 13: Oberhalb der Nenndrehzahl wird durch negatives $i_d$ die Spannungsgrenze des Umrichters eingehalten und das wirksame Statorfeld reduziert.'),
        q('Welche Aufgabe hat die Vorsteuerung in einer $dq$-Stromregelung?',
            ['Sicherheitsfunktion STO', 'Erzeugen der PWM-Tabelle', 'Ueberwachung der Geberauswertung', 'Kompensation der drehzahlabhaengigen Kreuzkopplung zwischen $d$- und $q$-Achse'], 3,
            'Kreuzkopplungsterme $\\omega_e L_q i_q$ und $\\omega_e (L_d i_d+\\Psi_{PM})$ werden vorgesteuert; PI-Regler muessen sie nicht ausregeln.'),
        q('Welcher Beobachter wird typisch bei sensorloser PMSM-Regelung im mittleren Drehzahlbereich verwendet?',
            ['Reduzierter Luenberger-Beobachter / EKF auf Basis der Back-EMF', 'Filter erster Ordnung der Statorspannung', 'Hall-Sensor-Auswertung', 'Lookup-Tabelle der Lastdrehmomente'], 0,
            'Holtz Proc. IEEE 2002: Modellbasierte Beobachter (Luenberger, EKF, Sliding Mode) extrahieren die Lage aus der induzierten Spannung.'),
        q('Warum versagen reine Back-EMF-Beobachter bei sehr niedrigen PMSM-Drehzahlen?',
            ['Wegen TCP-Kollisionen', 'Wegen Schaltverlusten der IGBT', 'Weil die induzierte Spannung gegen null geht und im Mess-/Modellrauschen verschwindet', 'Wegen der Klemmenspannung am Zwischenkreis'], 2,
            'Bei niedriger Drehzahl ist $|e|=\\omega_e\\Psi_{PM}$ klein; deshalb HFI-Methoden mit Anisotropie-Auswertung.'),
        q('Worauf nutzt HFI (High Frequency Injection) bei IPMSM aus?',
            ['Auf die Induktivitaetsanisotropie $L_d\\ne L_q$ zur Lageschaetzung', 'Auf Hall-Sensoren', 'Auf den Zwischenkreisstrom', 'Auf Temperaturdrift der Magnete'], 0,
            'Vas 1998: Ein hochfrequentes Pruefsignal erzeugt anisotropie-abhaengige Stromantworten, aus denen die Rotorlage ableitbar ist; funktioniert auch im Stillstand.'),
        q('Was ist das Kernprinzip von Direct Torque Control (DTC) nach Takahashi/Noguchi?',
            ['PWM mit symmetrischer Dreiecksspannung', 'Hystereseregler fuer Statorfluss und Drehmoment + Schalttabelle waehlen einen der acht Wechselrichter-Zustaende', 'Strommessung im Zwischenkreis ohne Spannungssensor', 'Kaskadierte PI-Regler nur in $abc$'], 1,
            'IEEE TIA 1986: DTC vermeidet $dq$-Stromregler und PWM; Hystereseband + Lookup-Schalttabelle waehlt direkt den Schaltvektor.'),
        q('Welche Eigenschaft ist ein typischer Nachteil klassischer DTC?',
            ['Sehr langsame Drehmoment-Antwort', 'Notwendigkeit eines Lagegebers im Rotor', 'Variable Schaltfrequenz und Drehmoment-Welligkeit', 'Unmoeglichkeit der Ausregelung der Wirkleistung'], 2,
            'Vas 1998 / Schroeder 2021: Hysteresegrenzen fuehren zu drehzahl- und lastabhaengiger Schaltfrequenz und groesserer Welligkeit als FOC mit fester PWM.'),
        q('Welche Aussage trifft auf MTPA-Strategie bei IPMSM zu?',
            ['Ignoriert den Reluktanzanteil', 'Setzt $i_d=0$', 'Maximiert das Drehmoment pro Statorstromamplitude unter Nutzung des Reluktanzbeitrags', 'Schaltet die Magnete ab'], 2,
            'Maximum-Torque-per-Ampere optimiert die Aufteilung $i_d/i_q$ unter Beruecksichtigung von $L_d\\ne L_q$.'),
        q('Welcher Reglertyp ist Standard fuer den Stromregler in $dq$-FOC?',
            ['Bang-Bang ohne Vorsteuerung', 'Reines P-Glied', 'PI mit Anti-Windup und Vorsteuerung', 'Pures Differenzierglied'], 2,
            'Schroeder 2021 Kap. 14: PI mit Anti-Windup ist Industriestandard; Vorsteuerung kompensiert Kreuzkopplung.'),
        q('Was modelliert die Rotorzeitkonstante $T_r$ einer ASM?',
            ['Mechanische Anlaufzeit der Achse', 'Verhaeltnis $L_r/R_r$ — Zeitkonstante fuer Auf-/Abbau des Rotorflusses', 'Tastrate des Stromreglers', 'Schaltzeit des IGBT'], 1,
            'Definition: $T_r=L_r/R_r$. $T_r$ bestimmt die Bandbreite des Flussaufbaus und ist temperaturabhaengig (Rotorerwaermung).'),
        q('Welche Variante kombiniert DTC-Schaltlogik mit Raumzeiger-Modulation, um die Drehmoment-Welligkeit zu reduzieren?',
            ['Skalare Stromsteuerung', 'Pure Sinus-PWM', 'V/f-Steuerung', 'DTC-SVM'], 3,
            'DTC-SVM (auch Predictive DTC) berechnet aus Soll-Fluss/-Drehmoment einen Spannungs-Sollzeiger und stellt ihn per SVPWM mit fester Schaltfrequenz.'),

        // 4.3 — Umrichter, PWM, EMV (13 Fragen)
        q('Was ist die Grundstruktur eines industriellen 2-Level-Spannungszwischenkreis-Umrichters?',
            ['12-pulsige Thyristorbruecke ohne Kondensator', 'Halbbruecke mit nur 2 Schaltern', 'Vollbruecke mit Drosseln statt Kondensator', 'B6-Brueckenschaltung mit 6 IGBT/MOSFET und Zwischenkreiskondensator'], 3,
            'Mohan/Undeland/Robbins 2003: Standard-VSI ist die dreiphasige B6-Bruecke mit DC-Kondensator-Stuetzung.'),
        q('Welche maximale Phasenspannung (Amplitude) erreicht reine Sinus-PWM linear?',
            ['$\\hat{U}_{ph,\\max}=U_{ZK}$', '$\\hat{U}_{ph,\\max}=\\tfrac{1}{2}U_{ZK}$', '$\\hat{U}_{ph,\\max}=\\sqrt{2}U_{ZK}$', '$\\hat{U}_{ph,\\max}=\\tfrac{1}{\\sqrt{3}}U_{ZK}$'], 1,
            'Holmes/Lipo 2003 Kap. 3: Linearer Bereich Sinus-PWM hat $\\hat{U}_{ph,\\max}=U_{ZK}/2$.'),
        q('Welchen Spannungsgewinn bietet SVPWM (oder Sinus + dritte Harmonische) im linearen Bereich gegenueber reiner Sinus-PWM?',
            ['Faktor 2', 'Faktor $\\sqrt{2}$', 'Faktor $\\tfrac{2}{\\sqrt{3}}\\approx 1{,}155$', 'Faktor 3'], 2,
            'Holmes/Lipo: Mit Nullsystem-Injektion verschiebt sich der lineare Bereich auf $\\hat{U}_{ph,\\max}=U_{ZK}/\\sqrt{3}$, Gewinn $2/\\sqrt{3}$.'),
        q('Wieviele Schaltzustaende und davon aktive Raumzeiger besitzt ein 3-phasiger 2-Level-VSI?',
            ['4 Zustaende ohne Null-Vektor', '6 Zustaende, alle aktiv', '12 Zustaende, davon 8 aktiv', '8 Zustaende, davon 6 aktive und 2 Null-Vektoren'], 3,
            'SVPWM-Grundlagen: Mit drei Halbbruecken ergeben sich $2^3=8$ Schaltkombinationen ($V_0\\dots V_7$), davon $V_1\\dots V_6$ aktiv und $V_0,V_7$ Null.'),
        q('Was beschreibt den Modulationsgrad $m$ ueblicher Definition?',
            ['Verhaeltnis Schaltfrequenz zu Grundfrequenz', 'Verhaeltnis der Sollspannungs-Amplitude zur halben Zwischenkreisspannung (bei Sinus-PWM)', 'Anteil der Verluste an der Wirkleistung', 'Anzahl der Schaltvorgaenge pro Periode'], 1,
            'Mohan: $m = \\hat{U}_{soll}/\\tfrac{U_{ZK}}{2}$ in der Standardform; $m=1$ ist die lineare Aussteuerungsgrenze der Sinus-PWM.'),
        q('Welcher Effekt entsteht durch hohe $du/dt$ am Motorklemmen?',
            ['Verbessertes Wirkungsgrad-Verhalten der Magnete', 'Reduzierte Lebensdauer der Schalter', 'Lagerstroeme (EDM-Erosion), Wicklungsbeanspruchung an der ersten Wicklung, EMV-Probleme', 'Hoehere mechanische Eigenfrequenz'], 2,
            'Schroeder 2021 / IEC 61800-3: Hohe Spannungsanstiegsraten verursachen Common-Mode-Stroeme, Lagerstrom-Erosion und Klemmen-Ueberspannungen ueber die erste Wicklung.'),
        q('Welche Topologie reduziert $du/dt$ und Spannungsbeanspruchung der Halbleiter durch geschaltete Mittelpunkt-Klemmung?',
            ['1-Level-VSI', 'Stromzwischenkreis-CSI ohne Modulation', '3-Level-NPC nach Nabae/Takahashi/Akagi 1981', 'Pure Vollbruecken-Halbbruecke'], 2,
            'IEEE Trans. IA-17 1981: NPC-Konverter klemmt einen Mittelpunkt; jeder Schalter sperrt nur die halbe Zwischenkreisspannung.'),
        q('In welchem Spannungsbereich werden GaN-HEMT in Antrieben aktuell typisch eingesetzt?',
            ['Ausschliesslich in Mittelspannungsantrieben > 3 kV', 'Erst ab 6 kV', 'Nur in der Hochspannungs-DC-Uebertragung', 'Bis ca. 650 V mit hohen Schaltfrequenzen (Niedrig- und Mittelvoltbereich)'], 3,
            'Industriepraxis: GaN dominiert <= 650 V mit hohen Schaltfrequenzen; SiC adressiert 600 V - 1700 V; Si-IGBT bleibt im klassischen Industrieantrieb verbreitet.'),
        q('Was ist eine typische Standardschaltfrequenz fuer industrielle Si-IGBT-Servoumrichter?',
            ['unter 100 Hz', 'ca. 50 Hz Netzfrequenz', '2-16 kHz', '2-10 MHz'], 2,
            'Mohan 2003 / Praxis: Si-IGBT-Servoumrichter werden ueblicherweise zwischen 2 und 16 kHz getaktet; SiC erlaubt deutlich hoehere Werte.'),
        q('Welcher Standard regelt EMV-Anforderungen an Power Drive Systems?',
            ['IEC 61800-3:2017', 'IEC 60870-5-104', 'IEC 61131-3', 'ISO 9001'], 0,
            'IEC 61800-3:2017 — EMV-Anforderungen und spezifische Pruefverfahren fuer drehzahlveraenderbare elektrische Antriebe.'),
        q('Welche Norm definiert Harmonics-Grenzwerte am Verknuepfungspunkt zum Versorgungsnetz?',
            ['IEC 62443-3-3', 'IEC 61131-3', 'ISO 13849-1', 'IEEE 519-2022'], 3,
            'IEEE 519-2022: Recommended Practice and Requirements for Harmonic Control in Electric Power Systems.'),
        q('Was unterscheidet Stromzwischenkreis-Umrichter (CSI) qualitativ vom Spannungszwischenkreis-Umrichter (VSI)?',
            ['CSI nutzt eine grosse Drossel im Zwischenkreis und impraegniert einen eingepraegten Strom', 'CSI hat keinen Wechselrichter', 'CSI verzichtet auf Halbleiter', 'CSI arbeitet ohne Netzanschluss'], 0,
            'Mohan 2003: CSI hat statt Stuetzkondensator eine Drossel; Eingangs- und Ausgangscharakteristik kehren sich um. Anwendung in Sehr-Grosse-Antrieben.'),
        q('Welche Methode reduziert Schaltverluste durch zeitweises Klemmen auf einen Zwischenkreis-Pol?',
            ['Diskontinuierliche PWM (DPWM)', 'Klassische 3-Phasen-Sinus-PWM ohne Nullsystem', 'Zufallsmodulation', 'PWM ohne Traegersignal'], 0,
            'Holmes/Lipo: DPWM-Varianten klemmen je 60 Grad eine Phase, sparen ca. 33 Prozent Schaltvorgaenge und damit Schaltverluste.'),

        // 4.4 — Servoachse, Kaskade, Safety, Wirkungsgrad (12 Fragen)
        q('Was ist die uebliche Bandbreitentrennung in einer Servo-Reglerkaskade?',
            ['Faktor 100 zwischen aufeinanderfolgenden Schleifen', 'Alle Schleifen mit identischer Bandbreite', 'Aussen schneller als innen', 'Faktor ca. 5 zwischen aufeinanderfolgenden Schleifen (innen schneller als aussen)'], 3,
            'Schroeder 2021 Kap. 14: Faustregel 1:5 (oder 1:5:5) — innere Schleife muss schneller einschwingen als die naechste aeussere.'),
        q('Welche Stoppfunktion nach IEC 61800-5-2 schaltet sicher das Drehmoment ab und entspricht Stoppkategorie 0 nach EN 60204-1?',
            ['SOS', 'STO', 'SLS', 'SDI'], 1,
            'IEC 61800-5-2:2016: Safe Torque Off (STO) — keine drehmomentbildende Energie, keine geregelte Bremsung; Kategorie 0 nach EN 60204-1.'),
        q('Welche Stoppfunktion bremst gefuehrt und geht anschliessend in STO ueber?',
            ['SS1', 'SS2', 'SOS', 'STO direkt'], 0,
            'IEC 61800-5-2: Safe Stop 1 — kontrollierte Bremsung, danach sicheres Abschalten des Drehmoments (Kat. 1 nach EN 60204-1).'),
        q('Welche Stoppfunktion haelt die Achse ueberwacht in Position, ohne Drehmoment abzuschalten?',
            ['STO', 'SS1', 'SOS Safe Operating Stop', 'SDI'], 2,
            'IEC 61800-5-2: SOS ueberwacht die Lage; Motor liefert weiterhin Haltemoment. SS2 fuehrt vor SOS eine kontrollierte Bremsung durch.'),
        q('Welche Funktion gewaehrleistet eine sicher begrenzte Drehzahl im laufenden Betrieb?',
            ['SLS Safely-Limited Speed', 'STO', 'SS1', 'SBC'], 0,
            'IEC 61800-5-2: SLS ueberwacht eine maximale Drehzahl; bei Ueberschreitung greift definierte Reaktion.'),
        q('Welcher Performance Level / SIL wird fuer STO heute typisch angestrebt?',
            ['PL e nach ISO 13849-1:2023 bzw. SIL 3 nach IEC 62061:2021', 'PL a / SIL 1', 'Keine Anforderung', 'Nur PL b'], 0,
            'Industriepraxis: STO an modernen Servoreglern erreicht ueberwiegend PL e / SIL 3; Architektur Kategorie 3 oder 4 mit hoher Diagnosedeckung.'),
        q('Was ist ein typischer Grenzwert fuer das auf den Motor reduzierte Massentraegheits-Verhaeltnis $J_{Last}/J_{Motor}$, ab dem aktive Schwingungs-Daempfung sinnvoll wird?',
            ['Ungefaehr 10:1 oder hoeher', '0{,}001:1', '0{,}1:1', '50000:1'], 0,
            'Schroeder 2021 / Praxis: Bis etwa 5:1 problemlos, ab ca. 10:1 werden Resonanzen im Reglerbereich praesent und Notch-/Bi-Quad-Filter sinnvoll.'),
        q('Welcher Bahnentwurf hat sprunghafte Beschleunigungs-Aenderungen (unendlicher Ruck)?',
            ['S-Kurve', 'Trapezbahn (linearer Geschwindigkeitsverlauf)', 'Polynom 5. Ordnung', 'Jerk-limitierte Bahn'], 1,
            'Trapezprofile haben konstante Beschleunigungsplateaus mit Sprung am Anfang/Ende — der Ruck ist unbegrenzt und regt Resonanzen an.'),
        q('Welche Geberform liefert eine absolute Position direkt nach dem Einschalten ohne Referenzfahrt?',
            ['Inkremental-Encoder mit Index', 'Absolutgeber (z.B. EnDat 2.2, BiSS-C, SSI, HIPERFACE DSL)', 'Tachogenerator', 'Motorstrommessung allein'], 1,
            'Datenblaetter EnDat 2.2 / BiSS-C / HIPERFACE DSL: Absolute Position ueber serielles Protokoll, Multi-Turn moeglich; daher keine Referenzfahrt noetig.'),
        q('Welche Norm klassifiziert Motoren in Wirkungsgradklassen IE1-IE5?',
            ['IEC 60034-30-1:2014', 'IEC 61800-5-2', 'IEC 61131-3', 'IEC 61508'], 0,
            'IEC 60034-30-1:2014 definiert IE1 (Standard) bis IE5 (Ultra Premium); EU-VO 2019/1781 referenziert diese Klassen fuer Oekodesign.'),
        q('Welche Norm klassifiziert das gesamte Antriebssystem (Motor + Complete Drive Module) energetisch?',
            ['IEC 61800-9-2:2017 (IES-Klassen)', 'ISO 9001', 'IEC 62443-3-3', 'ISO 13849-1'], 0,
            'IEC 61800-9-2:2017 definiert IES0 (Referenz), IES1 (Standard) und IES2 (Premium) auf Systemebene; ergaenzt IE-Klassen des Motors.'),
        q('Welche Auslegungsregel ist Standard fuer den Stromregler im Servoumrichter?',
            ['Auslegung nur durch Probieren ohne Streckenmodell', 'Bang-Bang ohne Vorsteuerung', 'Reine Steuerung ohne Rueckfuehrung', 'Symmetrisches/Betrags-Optimum (Kessler/Schroeder)'], 3,
            'Schroeder 2021 Kap. 14: Symmetrisches Optimum / Betrags-Optimum sind die etablierten analytischen Auslegungsverfahren fuer kaskadierte Antriebsregler.')
    ];

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
                pages: [PAGE_CTRL_STATE, PAGE_CTRL_LQR, PAGE_CTRL_OBS, PAGE_CTRL_NL],
                quiz: QUIZ_CTRL
            },
            {
                id: 'sps',
                title: 'Kapitel 2 — SPS-Programmierung (IEC 61131-3 / IEC 61499)',
                summary: 'Programmiersprachen ST, FBD, LD, SFC; Programm-Organisations-Einheiten (POU); Standard-Funktionsbausteine; Echtzeit-Tasks; sicherheitsgerichtete Steuerung nach IEC 61508 / 62061 / ISO 13849-1; verteilte ereignisgetriebene Steuerung mit IEC 61499.',
                pages: [PAGE_SPS_LANG, PAGE_SPS_POU, PAGE_SPS_SAFETY, PAGE_SPS_61499],
                quiz: QUIZ_SPS
            },
            {
                id: 'fieldbus',
                title: 'Kapitel 3 — Feldbusse und OPC UA',
                summary: 'PROFINET, EtherCAT, Modbus, CANopen; OPC UA Pub/Sub und Sicherheitsmodell; Time-Sensitive Networking (TSN); industrielle Kommunikationsanforderungen.',
                pages: [PAGE_FIELD_REALTIME, PAGE_FIELD_PROTOCOLS, PAGE_FIELD_OPCUA, PAGE_FIELD_TSN],
                quiz: QUIZ_FIELD
            },
            {
                id: 'drives',
                title: 'Kapitel 4 — Antriebs- und Leistungselektronik',
                summary: 'Drehstrommaschinen (ASM, PMSM, SynRM), Park-/Clarke-Transformation, feldorientierte Regelung (FOC), Direct Torque Control (DTC), Wechselrichter-Topologien (2-Level, 3-Level NPC), Pulsweitenmodulation (Sinus-PWM, SVPWM, DPWM), Servoachsen-Auslegung mit Reglerkaskade, Bahnplanung, Antriebs-Safety nach IEC 61800-5-2 (STO/SS1/SS2/SOS/SLS/SDI/SBC) und Wirkungsgrad-Klassen IE/IES.',
                pages: [PAGE_DRIVES_MACH, PAGE_DRIVES_FOC, PAGE_DRIVES_INV, PAGE_DRIVES_SERVO],
                quiz: QUIZ_DRIVES
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
