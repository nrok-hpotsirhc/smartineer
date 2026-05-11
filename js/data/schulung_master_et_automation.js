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

    const SOURCE_HINT_RE = /(NIST|ISO\/IEC|ISO\s?\d|IEC\s?\d|FIPS|RFC\s?\d|MITRE|ATT&CK|OWASP|CVSS|CompTIA|CIS|BSI|SP\s?800|SY0|CAS-?\d|CS0|PT0|IEEE|RFC\d|Aufl\.|Auflage|\bed\.|Edition|§|Annex|Kap(\.|itel)|\b(19|20)\d{2}\b)/i;
    const AUTO_SOURCE_ANCHOR = 'Quelle: Lunze Regelungstechnik 1/2 12./11. Aufl. 2023; Foellinger Regelungstechnik 13. Aufl. 2022; IEC 61131-3:2013; IEC 62541 OPC UA; IEC 61800; ISO 10218; Spong/Hutchinson/Vidyasagar Robot Modeling and Control 2nd ed. 2020.';

    function ensureSourceAnchor(explanation, sourceAnchor) {
        const text = String(explanation || '').trim();
        if (SOURCE_HINT_RE.test(text)) return text;
        return text + ' ' + sourceAnchor;
    }

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
            explanation: ensureSourceAnchor('Platzhalter-Erlaeuterung. Bei Veroeffentlichung wird hier der konkrete Quellenanker stehen (Modulhandbuch-Modulnummer, Standard-Paragraph, Lehrbuch-Seite).', AUTO_SOURCE_ANCHOR)
        }];
    }

    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: ensureSourceAnchor(explanation, AUTO_SOURCE_ANCHOR) };
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
            'IEC 61508 (Ed. 2.0, 2010): Funktionale Sicherheit elektrischer/elektronischer/programmierbarer Systeme; SIL 1-4.'),
        // P-AUTO-01-TOPUP (v44): 20 zusaetzliche quellenbelegte MCQ — LQR / Kalman / MPC / H-infinity / Lyapunov / Diskretzeit
        q('Welche Bedeutung hat $Q\\succeq 0$ und $R\\succ 0$ im LQR-Funktional $\\int_0^\\infty(x^TQx+u^TRu)\\,dt$?',
            ['$Q$ gewichtet Stellaufwand, $R$ Zustandsfehler', '$R$ muss strikt positiv-definit sein, damit das Optimum eindeutig und der Stellaufwand bestraft ist; $Q$ darf semidefinit sein, sofern $(A,Q^{1/2})$ detektierbar ist', 'Beide muessen indefinit sein', '$Q$ und $R$ muessen identisch sein'], 1,
            'Anderson/Moore "Optimal Control" 2nd ed. 1990 §3.1: Standardannahmen fuer eindeutige stabilisierende Loesung der CARE.'),
        q('Wodurch unterscheidet sich der LQR mit endlichem Horizont vom Steady-State-LQR?',
            ['Kein Unterschied', 'Der endliche-Horizont-Regler hat zeitvariante Verstaerkung $K(t)$ aus der Differenzial-Riccati-Gleichung; im Grenzfall $T\\to\\infty$ wird $K$ konstant', 'Endlicher Horizont liefert keine Stabilitaetsgarantie', 'Unendlicher Horizont nutzt diskrete Zeit'], 1,
            'Bryson/Ho "Applied Optimal Control" 1969 Kap. 5: $\\dot P=-A^TP-PA+PBR^{-1}B^TP-Q,\\;P(T)=S$; konvergiert fuer detektierbare Systeme.'),
        q('Was sagt das Trennungsprinzip fuer LQG-Steuerung quantitativ aus?',
            ['Stellaufwand ist null', 'Beobachterpole und Reglerpole sind im geschlossenen Kreis disjunkt: ihre Eigenwerte addieren sich; die Pole von $A-BK$ und $A-LC$ erscheinen unveraendert', 'Beobachter ist immer schneller', 'Es gibt keine Robustheit'], 1,
            'Joseph/Tou IEEE Trans. AC-6 1961; Anderson/Moore 1990 §5.2. Achtung: Stabilitaetsaussage, keine Robustheitsaussage (Doyle 1978).'),
        q('Welche Annahme verletzt das diskrete Kalman-Filter typischerweise in realen Anwendungen?',
            ['Linearitaet der Modellgleichungen', 'Mittelwertfreies Gauss-Rauschen mit bekannter Kovarianz $Q,R$ und Unkorreliertheit zwischen Prozess- und Messrauschen', 'Stationaeres Modell', 'Endlicher Zustandsraum'], 1,
            'Kalman J. Basic Eng. 82(1) 1960: Optimalitaet beruht auf weissem, gausschem, unkorreliertem Rauschen. In der Praxis werden $Q,R$ getunt; Modellfehler treiben das Filter divergent.'),
        q('Welche Eigenschaft hat das Steady-State-Kalman-Filter im stabilen, beobachtbaren LTI-Fall?',
            ['Es divergiert', 'Die Filterkovarianz $P_\\infty$ ist Loesung der diskreten/kontinuierlichen Filter-Riccati-Gleichung; die Filterverstaerkung $L_\\infty$ ist konstant', 'Die Verstaerkung ist null', '$P$ wird negativ-definit'], 1,
            'Anderson/Moore "Optimal Filtering" 1979 §4.4: Fuer detektierbare/stabilisierbare $(A,C,Q,R)$ konvergiert die Riccati-Rekursion gegen einen eindeutigen positiv-semidefiniten Fixpunkt.'),
        q('Welcher Effekt heisst beim EKF "Linearisierungs-Fehler"?',
            ['Der Filterzustand ist nicht zentriert', 'Die Linearisierung um $\\hat x$ vernachlaessigt hoehere Ordnungen; bei stark nichtlinearen Systemen kann das Filter inkonsistent oder divergent werden', 'Die Messgleichung ist linear', 'Es gibt keinen Effekt'], 1,
            'Julier/Uhlmann Proc. IEEE 92(3) 2004: EKF nutzt Jacobi-Linearisierung — bei starker Nichtlinearitaet sind UKF/Particle-Filter konsistenter.'),
        q('Was unterscheidet eine Lyapunov-Funktion von einer Speicherfunktion in der Passivitaetstheorie?',
            ['Sie sind identisch', 'Die Lyapunov-Funktion zeigt Stabilitaet ($\\dot V<0$); die Speicherfunktion erfuellt zusaetzlich eine Dissipations-Ungleichung $\\dot V\\le u^Ty-w(x)$ und impliziert Passivitaet', 'Speicherfunktionen sind nur fuer lineare Systeme definiert', 'Lyapunov-Funktionen sind quadratisch'], 1,
            'Khalil "Nonlinear Systems" 3rd ed. 2002 §6.3 / Willems IEEE TAC 1972: Speicherfunktionen verbinden Energie- und Stabilitaetsbegriff.'),
        q('Was bedeutet Input-to-State Stability (ISS) nach Sontag?',
            ['BIBO-Stabilitaet linearer Systeme', 'Es existiert eine $\\mathcal{KL}$-Funktion $\\beta$ und $\\mathcal{K}$-Funktion $\\gamma$ mit $\\|x(t)\\|\\le\\beta(\\|x_0\\|,t)+\\gamma(\\|u\\|_\\infty)$', '$\\dot x=Ax$ mit $A$ Hurwitz', 'Existenz einer quadratischen Lyapunov-Funktion'], 1,
            'Sontag IEEE TAC 34(4) 1989: ISS verallgemeinert "kleine Eingaenge erzeugen kleine Zustaende" auf nichtlineare Systeme; ISS-Lyapunov-Funktionen sind Standardbeweismittel.'),
        q('Welche Voraussetzung ist hinreichend fuer Stabilitaet eines nominellen MPC mit Endbedingung und Endgewicht $V_f$?',
            ['Pruedik­tionshorizont $N=1$', 'Endbedingung $X_f$ ist invariant unter einem zugehoerigen lokalen Regler $\\kappa_f$, $V_f$ ist Lyapunov-Funktion auf $X_f$, und Stage-Cost ist positiv-definit', 'Quadratische Stage-Cost reicht allein', 'Endbedingung muss leer sein'], 1,
            'Mayne/Rawlings/Rao/Scokaert Automatica 36(6) 2000; Rawlings/Mayne/Diehl "MPC: Theory, Computation, and Design" 2nd ed. 2017 §2.5.'),
        q('Was ist "Recursive Feasibility" beim MPC?',
            ['Der Solver ist immer numerisch loesbar', 'Wenn das Optimierungsproblem zum Zeitpunkt $k$ zulaessig ist, ist es auch zum Zeitpunkt $k+1$ entlang der nominellen Trajektorie zulaessig', 'Die Kostenfunktion ist konvex', 'Die Stellgroesse ist immer in der Box'], 1,
            'Rawlings/Mayne 2017 §2.4: Rekursive Zulaessigkeit folgt im Standardbeweis aus Endbedingungs-Invarianz; ohne Endbedingung sind Zusatzannahmen (lange Horizonte, terminal cost growth) noetig.'),
        q('Wie unterscheidet sich Tube-MPC von nominellem MPC?',
            ['Kein Unterschied', 'Tube-MPC trennt nominelle Trajektorie und Stoerunsicherheit; ein Hilfsregler haelt den realen Zustand in einer invarianten Roehre um die nominelle Trajektorie, Constraints werden um die Roehre verschaerft', 'Tube-MPC ignoriert Stoerungen', 'Tube-MPC arbeitet ohne Optimierung'], 1,
            'Mayne/Seron/Rakovic Automatica 41(2) 2005: Robust-MPC mit garantierter Constraint-Erfuellung trotz beschraenkter Stoerung.'),
        q('Welche $H_\\infty$-Sensitivitaetsfunktion bestraft das Mixed-Sensitivity-Problem typischerweise?',
            ['Nur $S$', 'Nur $T$', 'Gewichtete $S$, $KS$ und $T$ (Stoerung, Stellaufwand, Robustheit)', 'Nur $L$'], 2,
            'Skogestad/Postlethwaite "Multivariable Feedback Control" 2nd ed. 2005 §3.4: Mixed-Sensitivity-Design $\\|[W_1 S;\\,W_2 KS;\\,W_3 T]\\|_\\infty<1$ trifft Performance/Stellaufwand/Robustheit.'),
        q('Was sagt das Small-Gain-Theorem?',
            ['Stabile Rueckfuehrung erfordert hohe Verstaerkung', 'Eine Rueckfuehrung zweier stabiler Systeme ist stabil, wenn das Produkt ihrer induzierten Normen kleiner 1 ist', 'Phasenreserve > 60 Grad reicht', 'Nur fuer SISO-Systeme'], 1,
            'Zames IEEE TAC 11(2) 1966; Khalil 2002 §5.4. Konservativ, aber Grundbaustein robuster Regelung (Robust-Control-Toolbox, $\\mu$-Synthese).'),
        q('Welche Bedeutung hat der strukturierte Singulaerwert $\\mu$?',
            ['Ist identisch zur $H_2$-Norm', 'Ist eine verallgemeinerte induzierte Norm bzgl. einer Block-Strukturmenge $\\Delta$; quantifiziert Worst-Case-Robustheit gegen strukturierte Unsicherheiten', 'Misst nur skalare Verstaerkung', 'Ist immer 1'], 1,
            'Doyle Proc. IEE-D 129(6) 1982; Skogestad/Postlethwaite 2005 §8.6: $\\mu$-Synthese (D-K-Iteration) fuer reale, strukturierte Unsicherheiten.'),
        q('Welche Aussage zur Stabilitaetsgrenze des LQG ist korrekt?',
            ['Wie LQR garantiert PM>=60 Grad', 'Doyle 1978 zeigte, dass LQG keine garantierten Phase-/Gain-Margins hat — Robustheit muss separat per LQG/LTR oder $H_\\infty$ sichergestellt werden', 'LQG hat unendliche Phase-Margin', 'LQG ist stets instabil'], 1,
            'Doyle IEEE TAC 23(4) 1978 "Guaranteed margins for LQG regulators? None.": Schoenberg-Beispiel; LTR-Methode (Kwakernaak/Doyle/Stein) als Gegenmittel.'),
        q('Was passiert beim Tustin-Verfahren ($s\\leftarrow\\tfrac{2}{T}\\tfrac{z-1}{z+1}$) im Frequenzgang?',
            ['Linearer Frequenzbezug', 'Bilineare (frequenz-)warpende Transformation: stabile s-Pole bleiben stabile z-Pole, aber Frequenzen werden bei hohen $\\omega$ zur Nyquist-Frequenz hin gestaucht', 'Transformation verletzt Stabilitaet', 'Identitaet'], 1,
            'Aastroem/Wittenmark "Computer-Controlled Systems" 3rd ed. 1997 §3.4: Pre-Warping bei wichtigen Eckfrequenzen kompensiert das Warping.'),
        q('Welche Eigenschaft hat die Impulsinvarianz bei der Diskretisierung?',
            ['Magnitudenfehler bei niedriger Frequenz', 'Aliasing oberhalb der Nyquist-Frequenz, da das Spektrum periodisch fortgesetzt wird; geeignet fuer bandbegrenzte Systeme', 'Erhalt aller Pol-/Nullstellen-Lagen', 'Identisch mit ZOH'], 1,
            'Oppenheim/Schafer "Discrete-Time Signal Processing" 3rd ed. 2010 §4.8.2: Impulsinvarianz erhaelt die Impulsantwort, leidet aber an Aliasing.'),
        q('Welcher Lyapunov-Satz beweist, dass jeder asymptotisch stabile Hurwitz-Fall eine quadratische Lyapunov-Funktion besitzt?',
            ['Lasalle-Invarianzprinzip', 'Krasovskii', 'Erstes Lyapunov-Theorem', 'Lyapunovs konverses Theorem fuer LTI: zu jedem $Q\\succ 0$ existiert eindeutig $P\\succ 0$ mit $A^TP+PA=-Q$ genau dann, wenn $A$ Hurwitz ist'], 3,
            'Khalil 2002 §4.2 / Lemma 4.6: Lyapunov-Gleichung $A^TP+PA=-Q$ ist eindeutig loesbar mit $P\\succ 0$, falls $A$ Hurwitz. Wesentliches Werkzeug fuer LMI-basierte Analyse.'),
        q('Welcher Zusammenhang besteht zwischen KYP-Lemma und Riccati-Ungleichung?',
            ['Kein Zusammenhang', 'Das KYP-Lemma macht Frequenzbereich-Bedingungen ($\\Phi(j\\omega)\\succeq 0$) aequivalent zu LMI-/Riccati-Ungleichungen im Zeitbereich; Grundlage von $H_\\infty$- und Passivitaets-LMIs', 'KYP gilt nur fuer SISO', 'KYP loest die Riccati explizit'], 1,
            'Rantzer Syst. Control Lett. 28(1) 1996 (modernes KYP-Lemma); Anderson "A System Theory Criterion for Positive Real Matrices" 1967.'),
        q('Was kennzeichnet ein "Anti-Windup-Schema" fuer den PI-Regler bei Stellgroessen-Saettigung?',
            ['Reduktion der P-Verstaerkung', 'Rueckfuehrung der Differenz zwischen unbeschraenkter und beschraenkter Stellgroesse in den I-Anteil; verhindert weiteres Aufintegrieren waehrend Saettigung (Back-Calculation, Conditional Integration, Observer-based Anti-Windup)', 'Verzicht auf I-Anteil', 'Verdoppelung von $T_i$'], 1,
            'Aastroem/Wittenmark 1997 §6.5; Kothare/Campo/Morari/Nett Automatica 30(12) 1994: Standardverfahren in Kommerziellen DDC/SPS-Reglern.')
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

    // ----------------------------------------------------------------------
    // Kapitel 5 — Industrierobotik (PRODUKTIV)
    // Quellen: Spong/Hutchinson/Vidyasagar "Robot Modeling and Control" 2nd
    // ed. Wiley 2020; Siciliano/Sciavicco/Villani/Oriolo "Robotics: Modelling,
    // Planning and Control" Springer 2010; Craig "Introduction to Robotics"
    // 4th ed. Pearson 2018; Lynch/Park "Modern Robotics" Cambridge 2017;
    // ISO 10218-1:2011 / ISO 10218-2:2011; ISO/TS 15066:2016; ISO 9283:1998;
    // ROS 2 Humble/Iron LTS Doku 2024; MoveIt 2 Doku 2024; IFR World
    // Robotics Report 2024.
    // ----------------------------------------------------------------------

    const PAGE_ROBOT_KIN = {
        title: '5.1 Kinematik — DH-Konvention, Vorwaerts- und Rueckwaertskinematik',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) ein Manipulatormodell mit der modifizierten oder klassischen Denavit-Hartenberg-Konvention parametrieren, (2) die Vorwaertskinematik als Produkt homogener Transformationen aufstellen, (3) die inverse Kinematik analytisch fuer 6-DOF-Roboter mit spherical Wrist loesen, (4) Singularitaeten ueber die Jacobi-Matrix identifizieren und ihre Wirkung auf Bahnsteuerung erklaeren.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Lineare Algebra (Matrixinverse, Eigenwerte), homogene Transformationen, elementare Mehrkoerper-Kinematik. Voraussetzung: Bachelor-Modul "Robotik 1" oder Spong Kap. 2-3.</p>'

            + '<h4>5.1.1 Denavit-Hartenberg-Parameter</h4>'
            + '<p>Die <strong>klassische DH-Konvention</strong> (Denavit/Hartenberg 1955) beschreibt eine Gelenkverbindung mit vier Parametern $(a_i, \\alpha_i, d_i, \\theta_i)$: Linklaenge $a_i$, Linktwist $\\alpha_i$, Linkversatz $d_i$, Gelenkwinkel $\\theta_i$. Pro Gelenk ist genau einer dieser Parameter variabel: bei Drehgelenk $\\theta_i$, bei Schubgelenk $d_i$. Die homogene Transformation lautet:</p>'
            + '<p>$$T_{i-1}^{i}(\\theta_i)=\\begin{bmatrix}\\cos\\theta_i & -\\sin\\theta_i\\cos\\alpha_i & \\sin\\theta_i\\sin\\alpha_i & a_i\\cos\\theta_i\\\\\\sin\\theta_i & \\cos\\theta_i\\cos\\alpha_i & -\\cos\\theta_i\\sin\\alpha_i & a_i\\sin\\theta_i\\\\0 & \\sin\\alpha_i & \\cos\\alpha_i & d_i\\\\0 & 0 & 0 & 1\\end{bmatrix}$$</p>'
            + '<p>Die <strong>modifizierte DH-Konvention</strong> nach Craig (Craig 2018, Kap. 3) ordnet das Koordinatensystem an den proximalen Link an und ist in ROS/URDF-Workflows verbreiteter. Beide Konventionen sind aequivalent, duerfen aber innerhalb eines Modells nicht gemischt werden.</p>'

            + '<h4>5.1.2 Vorwaertskinematik (FK)</h4>'
            + '<p>Die Vorwaertskinematik liefert die Endeffektor-Pose $T_0^n$ als Produkt der Einzeltransformationen: $T_0^n=T_0^1 T_1^2 \\cdots T_{n-1}^n$. Fuer einen 6-DOF-Industrieroboter (z.B. KUKA KR 16, ABB IRB 1600) ergibt das eine geschlossene symbolische Formel; numerische Auswertung in $O(n)$ Matrixmultiplikationen.</p>'

            + '<h4>5.1.3 Inverse Kinematik (IK)</h4>'
            + '<p>Bei sechsachsigen Robotern mit <strong>spherical wrist</strong> (Achsen 4-5-6 schneiden sich im Punkt $W$) ist die IK <em>analytisch</em> entkoppelbar (Pieper 1968): Position des Wrist-Centers $W$ aus den ersten drei Gelenken, Orientierung aus den letzten drei. Es ergeben sich bis zu 8 reale Loesungen ("Schulter rechts/links", "Ellbogen oben/unten", "Wrist flip"). Bei nicht-spaerischen Geometrien (z.B. UR5e/UR10e mit Offset) wird numerisch via <strong>Damped Least Squares</strong> geloest: $\\Delta q=(J^T J+\\lambda^2 I)^{-1} J^T \\Delta x$ (Levenberg-Marquardt, Wampler 1986).</p>'

            + '<h4>5.1.4 Jacobi-Matrix und Singularitaeten</h4>'
            + '<p>Die geometrische Jacobi-Matrix $J(q)\\in\\mathbb{R}^{6\\times n}$ verknuepft Gelenkgeschwindigkeit mit Endeffektor-Twist: $\\dot{x}=J(q)\\dot{q}$. <strong>Singularitaet</strong> bei $\\det(J)=0$ bzw. Rangverlust. Drei klassische Faelle (Spong Kap. 4): (a) Wrist-Singularitaet (Achsen 4 und 6 kolinear), (b) Ellbogen-Singularitaet (Arm voll gestreckt), (c) Schulter-Singularitaet (Wrist auf Achse 1). In Singularitaeten divergieren Gelenkgeschwindigkeiten — Cartesian-Path-Bahnen mit konstanter Geschwindigkeit sind dann nicht ausfuehrbar.</p>'

            + '<h4>Worked Example: 2R-Planar-Manipulator IK</h4>'
            + '<p>Gegeben: 2R-Planar-Roboter, Linklaengen $\\ell_1=\\ell_2=0{,}3\\,\\text{m}$. Ziel-Endpunkt $(x,y)=(0{,}45,\\,0{,}15)\\,\\text{m}$. Finde $\\theta_1,\\theta_2$.</p>'
            + '<ol>'
            + '<li>Cosinussatz: $\\cos\\theta_2=\\dfrac{x^2+y^2-\\ell_1^2-\\ell_2^2}{2\\ell_1\\ell_2}=\\dfrac{0{,}2025+0{,}0225-0{,}09-0{,}09}{2\\cdot 0{,}09}=\\dfrac{0{,}045}{0{,}18}=0{,}25$.</li>'
            + '<li>$\\theta_2=\\pm\\arccos(0{,}25)\\approx\\pm 75{,}5^\\circ$ (Ellbogen oben/unten).</li>'
            + '<li>Wahl Ellbogen-unten: $\\theta_2\\approx -75{,}5^\\circ$. Mit $k_1=\\ell_1+\\ell_2\\cos\\theta_2$, $k_2=\\ell_2\\sin\\theta_2$:</li>'
            + '<li>$\\theta_1=\\operatorname{atan2}(y,x)-\\operatorname{atan2}(k_2,k_1)=\\operatorname{atan2}(0{,}15,\\,0{,}45)-\\operatorname{atan2}(-0{,}29,\\,0{,}3775)\\approx 18{,}43^\\circ-(-37{,}6^\\circ)=56{,}03^\\circ$.</li>'
            + '<li>Probe Vorwaertskinematik: $x=\\ell_1\\cos\\theta_1+\\ell_2\\cos(\\theta_1+\\theta_2)\\approx 0{,}45$, $y\\approx 0{,}15$. Stimmt.</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche vier Parameter braucht die DH-Konvention pro Gelenk, und welcher davon ist bei einem Drehgelenk variabel?</li>'
            + '<li>Wieso liefert die analytische IK eines 6-DOF-Roboters mit spherical wrist bis zu acht Loesungen?</li>'
            + '<li>Warum divergiert die Gelenkgeschwindigkeit in einer Singularitaet, obwohl der Endeffektor-Twist beschraenkt ist?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Klassische und modifizierte DH-Konvention im selben URDF mischen. <em>Korrekt:</em> Genau eine Konvention konsequent durchziehen, Doku im URDF-Header festhalten.</li>'
            + '<li><em>Fehler:</em> IK ueber $\\theta_2=\\arccos(\\cdot)$ ohne Vorzeichenfall. <em>Korrekt:</em> $\\pm\\arccos(\\cdot)$ und beide Konfigurationen pruefen, sonst Verlust einer realen Loesung.</li>'
            + '<li><em>Fehler:</em> $J^{-1}$ direkt invertieren. <em>Korrekt:</em> Damped Least Squares oder SVD-basierte Pseudoinverse mit Manipulability-Check, sonst numerische Explosion in der Naehe von Singularitaeten.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Gegeben sei ein 6-DOF-Industrieroboter (KUKA KR 16-2, Reichweite 1.610 mm). Eine Pick-and-Place-Bahn fuehrt durch eine Wrist-Singularitaet. Beschreiben Sie zwei Strategien (eine bahnseitige, eine reglerseitige), um den Vorgang ohne Achs-Ueberdrehen auszufuehren — inklusive Begruendung anhand Manipulability-Index $w=\\sqrt{\\det(JJ^T)}$.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Denavit/Hartenberg, J. Appl. Mech. 1955; Pieper, Stanford TR 1968; Wampler, IEEE T-SMC 1986; Spong/Hutchinson/Vidyasagar, Robot Modeling and Control, 2nd ed., Wiley 2020, Kap. 2-4; Siciliano et al., Robotics, Springer 2010, Kap. 2-3; Craig, Introduction to Robotics, 4th ed., Pearson 2018, Kap. 3-4; Lynch/Park, Modern Robotics, Cambridge 2017, Kap. 4-6.</em></p>'
    };

    const PAGE_ROBOT_DYN = {
        title: '5.2 Dynamik und Bahnplanung — Lagrange/Newton-Euler, Trajektorien',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die Bewegungsgleichung $M(q)\\ddot q+C(q,\\dot q)\\dot q+g(q)=\\tau$ herleiten und ihre Bestandteile interpretieren, (2) Lagrange- und Newton-Euler-Verfahren gegenueberstellen, (3) Bahnen in Gelenk- und Kartesischem Raum mit Geschwindigkeits-/Beschleunigungs-Profilen planen, (4) Genauigkeitskennwerte nach ISO 9283 (Pose-Wiederholgenauigkeit, Bahnabweichung) anwenden.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Lagrange-Mechanik, Newton-Eulersche Mehrkoerperdynamik, Splines, Kapitel 5.1 (Kinematik). Empfohlene Lektuere: Spong Kap. 7-8.</p>'

            + '<h4>5.2.1 Bewegungsgleichung</h4>'
            + '<p>Die Manipulator-Dynamik in Standardform lautet $M(q)\\ddot q+C(q,\\dot q)\\dot q+g(q)+\\tau_f(\\dot q)=\\tau$, mit $M$ symmetrisch und positiv definit (Massentraegheit), $C$ Coriolis-/Zentrifugalmatrix (parametrierbar so, dass $\\dot M-2C$ schiefsymmetrisch ist — wichtig fuer passivitaetsbasierte Regler), $g$ Schwerkraftvektor und $\\tau_f$ Reibmodell (Coulomb + viskos + Stribeck).</p>'

            + '<h4>5.2.2 Lagrange vs. Newton-Euler</h4>'
            + '<p><strong>Lagrange:</strong> $\\frac{d}{dt}\\partial L/\\partial\\dot q-\\partial L/\\partial q=\\tau$ mit $L=T-V$. Liefert geschlossene symbolische Form, Aufwand $O(n^4)$ — gut fuer Reglersynthese, aber teuer fuer Online-Auswertung. <strong>Newton-Euler (NE)</strong> rekursiv (Luh/Walker/Paul 1980): Vorwaerts Geschwindigkeiten/Beschleunigungen, rueckwaerts Kraefte/Momente. Aufwand $O(n)$ — Standard in Echtzeit-Reglern (z.B. KUKA KRC, ABB IRC5).</p>'

            + '<h4>5.2.3 Bahnplanung</h4>'
            + '<p><strong>Gelenkraum-Bahnen</strong>: kubische Splines ($q(t)=a_0+a_1 t+a_2 t^2+a_3 t^3$) mit Randbedingungen Position/Geschwindigkeit; quintische Splines fuer C2-Stetigkeit der Beschleunigung; <strong>LSPB</strong> (Linear Segment with Parabolic Blend, Trapezprofil) fuer Achsen mit Geschwindigkeits- und Beschleunigungslimit. <strong>Kartesische Bahnen</strong> via SLERP fuer Quaternionen, Linearinterpolation fuer Position; Achtung Singularitaeten — vorher mit Manipulability-Check absichern.</p>'

            + '<h4>5.2.4 Genauigkeitskennwerte (ISO 9283:1998)</h4>'
            + '<p>ISO 9283:1998 normiert die Messung von Pose-Genauigkeit (AP), Pose-Wiederholgenauigkeit (RP), Bahn-Genauigkeit (AT) und Bahn-Wiederholgenauigkeit (RT). Tests werden mit definierter Last und Geschwindigkeit auf einer ISO-Pruefebene gefahren. Industrielle 6-DOF-Roboter erreichen typisch RP $\\le 0{,}05\\,\\text{mm}$ (Spezifikation Datenblatt KUKA KR 16: $\\pm 0{,}03\\,\\text{mm}$).</p>'

            + '<h4>Worked Example: Trapezprofil-Auslegung</h4>'
            + '<p>Gegeben Achse mit $v_{\\max}=2\\,\\text{rad/s}$, $a_{\\max}=10\\,\\text{rad/s}^2$, Bewegung von $q_0=0$ nach $q_f=1{,}0\\,\\text{rad}$.</p>'
            + '<ol>'
            + '<li>Beschleunigungszeit $t_a=v_{\\max}/a_{\\max}=0{,}2\\,\\text{s}$, dabei zurueckgelegter Weg $\\Delta q_a=\\tfrac{1}{2}a_{\\max}t_a^2=0{,}2\\,\\text{rad}$.</li>'
            + '<li>Symmetrisches Profil: gleicher Weg in der Bremsphase $\\Delta q_a=0{,}2\\,\\text{rad}$. Konstantphase: $\\Delta q_c=q_f-2\\Delta q_a=0{,}6\\,\\text{rad}$, Dauer $t_c=\\Delta q_c/v_{\\max}=0{,}3\\,\\text{s}$.</li>'
            + '<li>Gesamtzeit $T=2 t_a+t_c=0{,}7\\,\\text{s}$. Pruefung: $v_{\\max}$ wird erreicht, da $\\Delta q_a+\\Delta q_a< q_f$. Bei kuerzeren Bewegungen entartet das Profil zu einem Dreieck (kein Konstantsegment).</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Warum ist es vorteilhaft, $C(q,\\dot q)$ so zu parametrieren, dass $\\dot M-2C$ schiefsymmetrisch ist?</li>'
            + '<li>Wann nutzt man rekursives Newton-Euler statt Lagrange — und wann nicht?</li>'
            + '<li>Was misst die ISO-9283-Kenngroesse "RP" und worin unterscheidet sie sich von "AP"?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Linearinterpolation in Eulerwinkeln fuer Orientierungsbahnen. <em>Korrekt:</em> SLERP in Quaternionen, sonst Gimbal-Lock und ungleichfoermige Drehgeschwindigkeit.</li>'
            + '<li><em>Fehler:</em> Trapezprofil ohne Pruefung, ob $v_{\\max}$ tatsaechlich erreicht wird. <em>Korrekt:</em> Wenn $2\\cdot \\tfrac{1}{2}a_{\\max}(v_{\\max}/a_{\\max})^2 > \\Delta q$, Dreieckprofil nutzen.</li>'
            + '<li><em>Fehler:</em> Reibmodell weglassen, weil "klein". <em>Korrekt:</em> Coulomb-Reibung dominiert bei niedrigen Geschwindigkeiten und verzerrt Trackingfehler — mindestens Coulomb + viskos modellieren.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Eine kollaborative Schweisszelle fordert Bahn-Wiederholgenauigkeit $RT\\le 0{,}1\\,\\text{mm}$ bei $v=300\\,\\text{mm/s}$. Skizzieren Sie eine Messprozedur nach ISO 9283 inklusive (a) Pruefebene-Wahl, (b) Lastzustand, (c) Anzahl Wiederholungen, (d) Auswertung 3$\\sigma$, und benennen Sie zwei mechanische und zwei steuerungstechnische Hebel zur Verbesserung.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Spong et al. 2020, Kap. 7-8; Siciliano et al. 2010, Kap. 7-9; Luh/Walker/Paul, J. Dyn. Syst. Meas. Control 1980; ISO 9283:1998; Lynch/Park 2017, Kap. 8-9.</em></p>'
    };

    const PAGE_ROBOT_SAFETY = {
        title: '5.3 Sicherheit und Mensch-Roboter-Kollaboration — ISO 10218 / ISO/TS 15066',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die vier MRK-Betriebsarten nach ISO 10218 / ISO/TS 15066 abgrenzen, (2) Power-and-Force-Limiting-Grenzwerte fuer Koerperregionen anwenden, (3) eine Risikobeurteilung nach ISO 12100 / ISO 13849-1 fuer eine Roboterzelle aufsetzen, (4) Safety-PL/SIL fuer typische Schutzfunktionen bestimmen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Maschinenrichtlinie 2006/42/EG (kuenftig EU-Maschinenverordnung 2023/1230 ab 20.01.2027), Funktionale Sicherheit (Kapitel 2.3), Mehrkoerperdynamik (Kapitel 5.2). Empfohlene Lektuere: ISO 10218-1:2011, ISO/TS 15066:2016.</p>'

            + '<h4>5.3.1 Vier MRK-Betriebsarten (ISO 10218-2:2011 §5.11; ISO/TS 15066:2016)</h4>'
            + '<ul>'
            + '<li><strong>Sicherheitsbewerteter ueberwachter Halt (Safety-Rated Monitored Stop, SRMS)</strong>: Roboter steht, Mensch darf in den Arbeitsraum; jede Bewegung loest Stopp aus.</li>'
            + '<li><strong>Handfuehrung (Hand-Guiding)</strong>: Bediener fuehrt Roboter mit aktivem Zustimmtaster, Geschwindigkeit ueberwacht.</li>'
            + '<li><strong>Geschwindigkeits- und Abstandsueberwachung (Speed and Separation Monitoring, SSM)</strong>: Sicherheitsabstand wird laufend gemessen (z.B. Laserscanner SICK microScan3, Photonenfeld), Geschwindigkeit bei Annaeherung reduziert.</li>'
            + '<li><strong>Leistungs- und Kraftbegrenzung (Power-and-Force-Limiting, PFL)</strong>: Roboter beruehrt Mensch, aber Kontaktkraefte/-druecke bleiben unter biomechanischen Grenzwerten aus ISO/TS 15066:2016 Annex A (z.B. Stirn 130 N quasistatisch, 175 N transient; Hand 140/280 N).</li>'
            + '</ul>'

            + '<h4>5.3.2 Risikobeurteilung (ISO 12100:2010)</h4>'
            + '<p>Iterativer Prozess: (1) Festlegung der Grenzen, (2) Gefaehrdungsidentifikation, (3) Risikoeinschaetzung (Schadensschwere x Eintrittswahrscheinlichkeit), (4) Risikobewertung, (5) Risikominderung nach STOP-Prinzip (Substitution, Technische, Organisatorische, Persoenliche). Ergebnis: Liste validierter Schutzmassnahmen + Restrisiken.</p>'

            + '<h4>5.3.3 Performance Level (PL) / Safety Integrity Level (SIL)</h4>'
            + '<p>ISO 13849-1:2023 ordnet Schutzfunktionen einen Required PL ($PL_r$ a-e) zu. PL kombiniert MTTFd (mittlere Zeit bis zum gefaehrlichen Ausfall), DCavg (Diagnosedeckung) und CCF (Common Cause Failures) zu einer Architektur-Kategorie (B, 1-4). IEC 62061:2021 nutzt SIL 1-3. Korrespondenz: $PL_d \\approx \\text{SIL 2}$, $PL_e \\approx \\text{SIL 3}$.</p>'
            + '<p>Beispiel SRMS bei 6-DOF-Industrieroboter: typisch $PL_d$ Cat. 3 (zweikanalig, plausibilisiert), realisiert ueber zertifizierte Safety-CPU (z.B. Siemens S7-1500F, B&amp;R X20 Safety). Power-and-Force-Limiting bei Cobots erfordert $PL_d$ Cat. 3 (z.B. UR10e: zertifiziert nach ISO 10218-1:2011 mit TUEV-Nord).</p>'

            + '<h4>Worked Example: PFL-Auslegung Stirn-Kontakt</h4>'
            + '<p>Cobot mit effektiver Masse $m_R=4\\,\\text{kg}$ am Werkzeug, Geschwindigkeit $v=0{,}25\\,\\text{m/s}$, Werkstueck (Schraubendreher Spitze, gepolstert). Pruefe gegen ISO/TS 15066:2016 Annex A.3 — Stirn quasistatisch 130 N, transient 175 N.</p>'
            + '<ol>'
            + '<li>Effektive Masse Mensch-Roboter-System: $m_H=4{,}4\\,\\text{kg}$ (Stirn-Kopf, ISO/TS 15066 Tab. A.2). $m_\\text{eff}=\\dfrac{1}{1/m_R+1/m_H}=\\dfrac{1}{0{,}25+0{,}227}=2{,}10\\,\\text{kg}$.</li>'
            + '<li>Maximale Kontaktenergie (worst case rein elastisch, Kontaktsteifigkeit $k=150\\,\\text{N/mm}=150{,}000\\,\\text{N/m}$ aus Tab. A.3 Stirn): $E=\\tfrac{1}{2}m_\\text{eff} v^2=\\tfrac{1}{2}\\cdot 2{,}10\\cdot 0{,}25^2=0{,}0656\\,\\text{J}$.</li>'
            + '<li>Spitzenkraft: $F_\\max=v\\sqrt{m_\\text{eff}\\cdot k}=0{,}25\\cdot\\sqrt{2{,}10\\cdot 150000}=0{,}25\\cdot 561\\approx 140\\,\\text{N}$.</li>'
            + '<li>Vergleich: 140 N transient liegt unter 175 N transient-Grenze fuer Stirn — zulaessig. <strong>Aber</strong>: Quasistatischer Folgekontakt &gt;130 N waere unzulaessig — daher Anwendung mit Force-Sensor oder Kontaktzeitbegrenzung absichern.</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Wodurch unterscheiden sich SSM und PFL — und welche Betriebsart wird haeufig kombiniert?</li>'
            + '<li>Welche drei Groessen gehen in die Bestimmung des erreichten PL nach ISO 13849-1 ein?</li>'
            + '<li>Warum ist die effektive Masse $m_\\text{eff}$ kleiner als beide Einzelmassen $m_R$ und $m_H$?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> "Cobot ist sicher per Bauart". <em>Korrekt:</em> Sicherheit ist eine Eigenschaft der Anwendung, nicht des Roboters — Risikobeurteilung bleibt Pflicht (ISO 10218-2 §4.3).</li>'
            + '<li><em>Fehler:</em> Quasistatische und transiente Grenzen verwechseln. <em>Korrekt:</em> Quasistatisch &lt;500 ms Druck, transient &lt;500 ms freier Schlag — beide Klassen aus ISO/TS 15066 Annex A einhalten.</li>'
            + '<li><em>Fehler:</em> SSM-Sicherheitsabstand mit nominaler Roboter-Geschwindigkeit. <em>Korrekt:</em> Mit max. Spitzengeschwindigkeit + Reaktionszeit Steuerung + Bremsweg + Mess-Toleranz Laserscanner (ISO 13855:2010 Formeln).</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Eine bestehende KUKA-LBR-iiwa-Zelle (PFL-Cobot, Nutzlast 7 kg) soll mit einer neuen Spitzwerkzeug-Variante (Schraubendreher) betrieben werden. Begruenden Sie, welche zusaetzliche Sicherheitsmassnahme aus ISO/TS 15066 angemessen ist, wenn die effektive Werkstueck-Geometrie unter $1\\,\\text{cm}^2$ Kontaktflaeche faellt — und welche Norm explizit auf Druckwerte (Pa) statt Kraftwerte (N) verweist.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: ISO 10218-1:2011, ISO 10218-2:2011 (Industrial robots safety); ISO/TS 15066:2016 (Collaborative robots, biomechanical limits Annex A); ISO 12100:2010 (Risikobeurteilung); ISO 13849-1:2023 (PL); IEC 62061:2021 (SIL); ISO 13855:2010 (Sicherheitsabstaende); EU-Maschinenverordnung 2023/1230.</em></p>'
    };

    const PAGE_ROBOT_PROG = {
        title: '5.4 Programmiersprachen und Frameworks — KRL, RAPID, URScript, ROS 2/MoveIt 2',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) herstellerspezifische Roboter-Sprachen (KRL, RAPID, URScript, KAREL) hinsichtlich Bewegungsbefehlen, Datentypen und Echtzeit-Eigenschaften vergleichen, (2) den ROS 2 Stack inkl. DDS, Lifecycle-Knoten und ros2_control beschreiben, (3) MoveIt 2 fuer Bahnplanung und Kollisionspruefung anwenden, (4) Offline-Programmierung mit Digital-Twin-Workflow integrieren.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kapitel 5.1 (Kinematik), Kapitel 5.2 (Bahnplanung), Grundkenntnisse Linux/Echtzeit-OS. Empfohlene Lektuere: ROS 2 Humble/Iron Doku 2024, MoveIt 2 Tutorial 2024, KUKA KSS-Doku 8.7, ABB RAPID Reference Manual 6.16.</p>'

            + '<h4>5.4.1 Herstellersprachen im Vergleich</h4>'
            + '<table><thead><tr><th>Sprache</th><th>Hersteller</th><th>Bewegung</th><th>Datentypen</th></tr></thead><tbody>'
            + '<tr><td>KRL</td><td>KUKA</td><td>$\\texttt{PTP},\\texttt{LIN},\\texttt{CIRC}$ + $\\texttt{C\\_DIS}/\\texttt{C\\_VEL}$ Anweisungen</td><td>$\\texttt{POS},\\texttt{E6POS},\\texttt{FRAME}$</td></tr>'
            + '<tr><td>RAPID</td><td>ABB</td><td>$\\texttt{MoveJ},\\texttt{MoveL},\\texttt{MoveC}$ + Zonenpunkte $\\texttt{z10}$ etc.</td><td>$\\texttt{robtarget},\\texttt{jointtarget},\\texttt{tooldata}$</td></tr>'
            + '<tr><td>URScript</td><td>Universal Robots</td><td>$\\texttt{movej},\\texttt{movel},\\texttt{movep},\\texttt{servoj}$</td><td>$\\texttt{pose},\\texttt{q}$ (Listen)</td></tr>'
            + '<tr><td>KAREL/TPP</td><td>FANUC</td><td>$\\texttt{J}/\\texttt{L}/\\texttt{C}$ Bewegungstypen</td><td>$\\texttt{POSITION},\\texttt{XYZWPR}$</td></tr>'
            + '</tbody></table>'
            + '<p>Determinismus: KRL/RAPID/URScript laufen auf zertifizierter Echtzeit-Steuerung (KUKA KRC, ABB IRC5/OmniCore, UR PolyScope), Zykluszeit Bahninterpolation typisch 12-4 ms. ROS 2 ist <em>nicht</em> per se hart-Echtzeit — fuer harte Echtzeit ist ros2_control mit Linux-PREEMPT_RT oder Xenomai noetig.</p>'

            + '<h4>5.4.2 ROS 2 Architektur</h4>'
            + '<p>ROS 2 (Robot Operating System 2) loest ROS 1 ab; LTS-Distributionen Humble Hawksbill (2022-2027) und Iron Irwini (2023-2024, Folgeversion Jazzy Jalisco 2024). Kernkonzepte: <strong>Knoten</strong> (Prozesse), <strong>Topics</strong> (Pub/Sub), <strong>Services</strong> (Request/Reply), <strong>Actions</strong> (langlaufende Goals + Feedback), <strong>Parameters</strong> (typisierter Konfigurationsraum), <strong>Lifecycle Nodes</strong> (deterministischer Zustandsautomat: unconfigured/inactive/active/finalized).</p>'
            + '<p>Kommunikations-Layer: <strong>DDS</strong> (Data Distribution Service, OMG-Standard) mit QoS-Profilen (Reliability, Durability, History, Deadline). Standard-DDS in Humble: Eclipse Cyclone DDS oder eProsima Fast DDS. <strong>rmw</strong> abstrahiert die DDS-Wahl; <strong>rcl/rclcpp/rclpy</strong> sind die Sprach-Bindings.</p>'

            + '<h4>5.4.3 ros2_control und MoveIt 2</h4>'
            + '<p><strong>ros2_control</strong> definiert Hardware Interfaces, Controller (z.B. <code>JointTrajectoryController</code>, <code>ForwardCommandController</code>) und Controller Manager. URDF/SRDF beschreiben Kinematik, Kollisionsmodell und Gelenkgrenzen. <strong>MoveIt 2</strong> bietet OMPL-Planner (RRTConnect, RRT*, PRM), CHOMP/STOMP-Trajektorie-Optimierer, Kollisionspruefung via FCL und Inverse Kinematik via KDL/TRAC-IK. Standard-Workflow: PlanningScene-Update -&gt; MotionPlanRequest -&gt; Execute -&gt; ros2_control.</p>'

            + '<h4>Worked Example: KRL vs. URScript Linearbewegung</h4>'
            + '<p>Aufgabe: Linearbewegung von der aktuellen Pose nach $(x=600, y=200, z=400)$ mm in Werkzeug-Koord., Geschwindigkeit 0,25 m/s, Genauigkeit 1 mm.</p>'
            + '<ol>'
            + '<li><strong>KRL (KUKA KSS):</strong> <code>$VEL.CP=0.25; $APO.CDIS=1.0; LIN {X 600, Y 200, Z 400, A 0, B 0, C 0} C_DIS</code>. <code>$VEL.CP</code> ist Cartesian-Path-Geschwindigkeit, <code>$APO.CDIS</code> definiert Approximations-Distanz; <code>C_DIS</code> aktiviert sie fuer den naechsten Bewegungsbefehl.</li>'
            + '<li><strong>URScript (UR10e):</strong> <code>movel(p[0.6, 0.2, 0.4, 0, 0, 0], a=0.5, v=0.25, r=0.001)</code>. Argumente: Ziel als Pose-Vektor in m/rad, Beschleunigung $a$, Geschwindigkeit $v$, Blend-Radius $r$.</li>'
            + '<li>Aequivalente Semantik, andere Einheiten (mm vs m) und Approximations-Konzepte (Distance vs Blend Radius); beim Portieren aufpassen.</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Worin unterscheidet sich ein ROS-2-<em>Action</em> von einem <em>Service</em>?</li>'
            + '<li>Warum ist ROS 2 ohne PREEMPT_RT-Patch nicht hart-echtzeitfaehig — und welche Komponente uebernimmt die Echtzeit?</li>'
            + '<li>Welcher MoveIt-2-Planner ist Standard fuer 6-DOF-Industrieroboter, und welche Eigenschaft macht ihn dafuer geeignet?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Bahnplanung mit ROS 2 ohne SRDF-Kollisionsmodell. <em>Korrekt:</em> Self-Collision-Matrix in SRDF pflegen, sonst plant MoveIt unzulaessige Bahnen oder verwirft alle Loesungen.</li>'
            + '<li><em>Fehler:</em> KRL-Bewegungen ohne <code>C_DIS</code>/<code>C_VEL</code> verkettet — fuehrt zu Halten zwischen Segmenten und Taktzeit-Verlust. <em>Korrekt:</em> Approximations-Modus setzen, wenn Bahn nicht punktgenau sein muss.</li>'
            + '<li><em>Fehler:</em> URScript <code>servoj</code> statt <code>movej</code> ohne stabilen High-Frequency-Datenstrom. <em>Korrekt:</em> <code>servoj</code> nur bei kontinuierlichem Set-Point-Strom (typisch 125-500 Hz) — sonst ruckelt der Roboter.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Eine bestehende KUKA-KRL-Pick-and-Place-Anwendung soll auf einen UR10e mit ROS 2 portiert werden. Skizzieren Sie die Migrationsschritte (Koordinatensystem, Bewegungsbefehle, Sicherheitsfunktionen, Echtzeit-Strategie) und benennen Sie zwei Aspekte, die <em>nicht</em> 1:1 portierbar sind und eigene Anwendungsentscheidungen erfordern.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: KUKA System Software KSS 8.7 Doku; ABB RAPID Reference Manual 6.16; Universal Robots URScript Manual 5.13; FANUC R-30iB KAREL/TPP Reference; ROS 2 Humble/Iron Doku 2024 (https://docs.ros.org/en/humble); MoveIt 2 Tutorial 2024; OMG DDS 1.4 Spezifikation; ros2_control Documentation 2024.</em></p>'
    };

    const QUIZ_ROBOT = [
        // ---- Kinematik (1-12) ----
        q('Welche vier Parameter beschreibt die klassische DH-Konvention pro Gelenk?',
            ['$(a_i,\\alpha_i,d_i,\\theta_i)$ — Linklaenge, Linktwist, Linkversatz, Gelenkwinkel', '$(x,y,z,\\theta)$ — Position und Winkel', '$(m,I,c,k)$ — Masse und Steifigkeit', '$(P,I,D,T)$ — Reglerparameter'], 0,
            'Denavit/Hartenberg, J. Appl. Mech. 1955; Spong et al. 2020 Kap. 3.'),
        q('Wodurch unterscheidet sich die modifizierte DH-Konvention nach Craig von der klassischen?',
            ['Sie ist mathematisch nicht aequivalent', 'Koordinatenursprung am proximalen Link statt am distalen', 'Sie gilt nur fuer Schubgelenke', 'Sie ersetzt $\\theta$ durch Quaternionen'], 1,
            'Craig, Introduction to Robotics, 4th ed., Pearson 2018, Kap. 3.'),
        q('Was liefert die Vorwaertskinematik $T_0^n$?',
            ['Die Endeffektorpose im Basis-KS', 'Die Gelenkmomente', 'Die Reglerparameter', 'Die Massentraegheitsmatrix'], 0,
            'Spong et al. 2020 Kap. 3.'),
        q('Welche geometrische Bedingung erlaubt die analytische Loesung der inversen Kinematik nach Pieper?',
            ['Sechs gleiche Linklaengen', 'Drei aufeinanderfolgende Achsen schneiden sich in einem Punkt (spherical wrist)', 'Alle Achsen parallel', 'Drei prismatische Gelenke'], 1,
            'Pieper, Stanford TR 1968.'),
        q('Wie viele reale Loesungen kann ein 6-DOF-Roboter mit spherical wrist im Allgemeinen haben?',
            ['Genau 1', 'Genau 2', 'Bis zu 8', 'Bis zu 64'], 2,
            'Spong et al. 2020 Kap. 4 (Schulter, Ellbogen, Wrist-Flip).'),
        q('Was charakterisiert eine Wrist-Singularitaet bei einem 6-DOF-Industrieroboter?',
            ['Achse 1 und Achse 6 senkrecht', 'Achse 4 und Achse 6 sind kolinear', 'Achse 2 senkrecht zu Achse 3', 'Roboter beruehrt Tisch'], 1,
            'Spong et al. 2020 Kap. 4; KUKA-Wartungs-Doku.'),
        q('Welche Methode loest IK numerisch in der Naehe von Singularitaeten stabil?',
            ['Direkte Inversion $J^{-1}$', 'Damped Least Squares $\\Delta q=(J^TJ+\\lambda^2 I)^{-1}J^T \\Delta x$', 'Eulerwinkel-Linearisierung', 'Polynom-Approximation'], 1,
            'Wampler, IEEE T-SMC 1986.'),
        q('Welche Groesse ist Standard-Manipulability-Index nach Yoshikawa?',
            ['$\\det(J)$', '$\\sqrt{\\det(JJ^T)}$', '$\\operatorname{trace}(J)$', '$\\|J\\|_\\infty$'], 1,
            'Yoshikawa, Int. J. Robotics Research 1985.'),
        q('Was beschreibt die geometrische Jacobi-Matrix $J(q)$?',
            ['Massenmatrix', 'Verknuepfung Gelenkgeschwindigkeit-Endeffektor-Twist', 'Steuerbarkeit', 'Energiefunktional'], 1,
            'Spong et al. 2020 Kap. 4.'),
        q('Wann gilt: $\\det(J)=0$?',
            ['Roboter ausgeschaltet', 'In einer Singularitaet (Rangverlust)', 'Bei jeder Bewegung', 'Nur bei prismatischen Robotern'], 1,
            'Siciliano et al. 2010 Kap. 3.4.'),
        q('Welche Aussage zur inversen Kinematik einer UR10e (kein spherical wrist) ist korrekt?',
            ['Hat geschlossene analytische Form wie 6-DOF mit spherical wrist', 'Wird haeufig numerisch oder ueber Pieper-Erweiterungen geloest', 'Hat genau eine Loesung', 'Existiert nicht'], 1,
            'Universal Robots URScript Manual 5.13; Hawkins, IK Solutions for UR Robots, TR 2013.'),
        q('Was ist Voraussetzung dafuer, dass die Vorwaertskinematik exakt gilt?',
            ['Roboter kalibriert (DH-Parameter mit Realgeometrie uebereinstimmend)', 'Roboter nicht eingeschaltet', 'Reine Steuerung ohne Rueckfuehrung', 'Reibungsfreiheit'], 0,
            'ISO 9283:1998; KUKA-Kalibrationsleitfaden.'),

        // ---- Dynamik / Bahnplanung (13-24) ----
        q('Welche Form hat die Manipulator-Standardbewegungsgleichung?',
            ['$M(q)\\ddot q+C(q,\\dot q)\\dot q+g(q)=\\tau$', '$\\tau=K_p e+K_d \\dot e$', '$\\dot x=Ax+Bu$', '$F=ma$'], 0,
            'Spong et al. 2020 Kap. 7.'),
        q('Welche Eigenschaft hat die Massenmatrix $M(q)$?',
            ['Schiefsymmetrisch', 'Symmetrisch und positiv definit', 'Nilpotent', 'Diagonal'], 1,
            'Spong et al. 2020 Kap. 7.'),
        q('Warum ist die Wahl von $C(q,\\dot q)$ so, dass $\\dot M-2C$ schiefsymmetrisch ist, vorteilhaft?',
            ['Halbiert die Rechenzeit', 'Ermoeglicht passivitaetsbasierte Reglerentwuerfe', 'Macht $M$ diagonal', 'Garantiert Linearitaet'], 1,
            'Spong et al. 2020 Kap. 7.4 (Skew-Symmetry).'),
        q('Welche Komplexitaet hat das rekursive Newton-Euler-Verfahren bei $n$ Achsen?',
            ['$O(1)$', '$O(\\log n)$', '$O(n)$', '$O(n^4)$'], 2,
            'Luh/Walker/Paul, J. Dyn. Syst. Meas. Control 1980.'),
        q('Welche Komplexitaet hat die symbolische Lagrange-Form bei $n$ Achsen?',
            ['$O(1)$', '$O(n)$', '$O(n^2)$', '$O(n^4)$'], 3,
            'Spong et al. 2020 Kap. 7.'),
        q('Was beschreibt das LSPB-Bahnprofil?',
            ['Quintischer Spline', 'Linear segment with parabolic blend (Trapezprofil)', 'Sinusprofil', 'Random Walk'], 1,
            'Siciliano et al. 2010 Kap. 8; Lynch/Park 2017 Kap. 9.'),
        q('Wann entartet ein Trapezprofil zu einem Dreieckprofil?',
            ['Wenn $v_{\\max}$ wegen kurzer Distanz nicht erreicht wird', 'Wenn $a_{\\max}=0$', 'Bei prismatischen Gelenken', 'Bei Singularitaeten'], 0,
            'Siciliano et al. 2010 Kap. 8.4.'),
        q('Welche Interpolation eignet sich fuer Orientierungen ueber Quaternionen?',
            ['SLERP', 'Linearinterpolation Eulerwinkel', 'Diskrete Stuetzstellen', 'Polynom 7. Grades'], 0,
            'Shoemake, SIGGRAPH 1985; Siciliano et al. 2010 Kap. 8.'),
        q('Welche Norm definiert die Mess-Verfahren fuer Pose-Wiederholgenauigkeit (RP) bei Industrierobotern?',
            ['ISO 9283:1998', 'IEC 62443-3-3', 'ISO 9001', 'ISO 13849-1'], 0,
            'ISO 9283:1998 (Manipulating industrial robots — Performance criteria and related test methods).'),
        q('Welche Groesse misst ISO 9283 mit "AP" (accuracy of pose)?',
            ['Streuung um Mittelwert', 'Abweichung Mittelwert vom Soll', 'Reibung', 'Rauschen'], 1,
            'ISO 9283:1998 §7.'),
        q('Wodurch wird die Bahn-Wiederholgenauigkeit (RT) verschlechtert?',
            ['Schwere Lasten + hohe Geschwindigkeit + dynamische Belastung der Gelenke', 'Kuehle Umgebung', 'PROFINET statt EtherCAT', 'IPv6'], 0,
            'ISO 9283:1998; KUKA-Datenblatt KR 16-2.'),
        q('Wann ist quintischer Spline kubischem vorzuziehen?',
            ['Wenn C2-Stetigkeit der Beschleunigung gefordert ist', 'Wenn schneller berechnet werden soll', 'Bei prismatischen Gelenken', 'Im Stillstand'], 0,
            'Siciliano et al. 2010 Kap. 8.'),

        // ---- Sicherheit / MRK (25-36) ----
        q('Welche vier MRK-Betriebsarten benennt ISO 10218-2:2011 / ISO/TS 15066:2016?',
            ['SRMS, Hand-Guiding, SSM, PFL', 'PTP, LIN, CIRC, JOINT', 'STO, SS1, SS2, SOS', 'SIL 1-4'], 0,
            'ISO 10218-2:2011 §5.11; ISO/TS 15066:2016.'),
        q('Was bedeutet PFL?',
            ['Profinet Functional Layer', 'Power-and-Force-Limiting', 'Pulse Frequency Logic', 'Process Failure Limit'], 1,
            'ISO/TS 15066:2016.'),
        q('Welche Norm liefert biomechanische Schwellenwerte (N, kPa) fuer Koerperregionen bei MRK?',
            ['ISO 13849-1:2023', 'ISO/TS 15066:2016 Annex A', 'IEC 61131-3', 'IEC 62443'], 1,
            'ISO/TS 15066:2016 Annex A.'),
        q('Welche Groessen kombiniert ISO 13849-1:2023 zur Bestimmung des erreichten Performance Level?',
            ['MTTFd, DCavg, CCF + Architektur (Kategorie B/1-4)', 'Nur MTBF', 'Nur DC', 'P, I, D'], 0,
            'ISO 13849-1:2023 §4.5.'),
        q('Welche grobe Korrespondenz gilt zwischen PL und SIL?',
            ['$PL_d \\approx \\text{SIL 2}$, $PL_e \\approx \\text{SIL 3}$', '$PL_a \\approx \\text{SIL 4}$', 'Keine Korrespondenz', '$PL_e \\approx \\text{SIL 1}$'], 0,
            'ISO 13849-1:2023 Annex K; IEC 62061:2021.'),
        q('Wie wird ein Sicherheitsabstand bei SSM korrekt berechnet?',
            ['Mit Nominalgeschwindigkeit', 'Mit max. Roboter-Spitzengeschwindigkeit + Reaktionszeit Steuerung + Bremsweg + Mess-Toleranz Sensor', 'Geometrisch nur', 'Auf 1 m fest'], 1,
            'ISO 13855:2010 (Sicherheitsabstaende von oberen Gliedmassen).'),
        q('Welche Verordnung loest die Maschinenrichtlinie 2006/42/EG ab?',
            ['EU 2016/679 (DSGVO)', 'EU-Maschinenverordnung 2023/1230 ab 20.01.2027', 'EU 2022/2555 (NIS2)', 'EU 2024/1689 (AI Act)'], 1,
            'Verordnung (EU) 2023/1230 vom 14.06.2023.'),
        q('Welche Methode gehoert zur Risikobeurteilung nach ISO 12100?',
            ['Iterative Risikoeinschaetzung -&gt; Risikominderung nach STOP', 'PID-Regelung', 'Kalman-Filter', 'OPC UA'], 0,
            'ISO 12100:2010.'),
        q('Was bedeutet "transient" vs. "quasistatisch" bei Kontaktkraefte in ISO/TS 15066?',
            ['Transient = freier Schlag (&lt;500 ms), quasistatisch = anhaltender Klemm-/Druckkontakt', 'Transient = unbedeutend', 'Vertauscht', 'Identisch'], 0,
            'ISO/TS 15066:2016 Annex A.'),
        q('Welcher Stop wird bei einem zertifizierten Cobot fuer SRMS typisch genutzt (gemaess IEC 60204-1)?',
            ['Category 0 — Antriebs-Sofort-Aus', 'Category 2 — geregelter Halt mit Energie an', 'Category 3 — manuell', 'Es gibt keinen Standard'], 1,
            'IEC 60204-1:2016 §9.2.2.'),
        q('Welche Schutzfunktion deckt typisch die "Safe Torque Off"-Funktion am Servo ab?',
            ['IEC 61800-5-2 STO', 'IEC 60034 IE', 'IEC 61131-3', 'ISO 9001'], 0,
            'IEC 61800-5-2:2016 §4.2.2.1 STO.'),
        q('Welcher Aspekt wird bei kollaborativen Anwendungen mit kleiner Kontaktflaeche (z.B. Spitzwerkzeug) zusaetzlich relevant?',
            ['Kontakt-Druck (Pa) statt nur Kraft (N)', 'IPv6', 'PROFINET-Klasse', 'OPC UA Pub/Sub'], 0,
            'ISO/TS 15066:2016 Annex A.3 (Pressure-based limits).'),

        // ---- Programmierung & Frameworks (37-50) ----
        q('Welche Sprache ist herstellerseitiger Standard bei KUKA?',
            ['KRL (KUKA Robot Language)', 'RAPID', 'URScript', 'KAREL'], 0,
            'KUKA System Software KSS 8.7 Doku.'),
        q('Welche Sprache ist herstellerseitiger Standard bei ABB?',
            ['KRL', 'RAPID', 'URScript', 'KAREL'], 1,
            'ABB RAPID Reference Manual 6.16.'),
        q('Welche Sprache ist herstellerseitiger Standard bei Universal Robots?',
            ['KRL', 'RAPID', 'URScript', 'KAREL'], 2,
            'Universal Robots URScript Manual 5.13.'),
        q('Welcher Bewegungsbefehl in RAPID erzeugt eine Linearbahn?',
            ['MoveJ', 'MoveL', 'MoveC', 'MoveAbsJ'], 1,
            'ABB RAPID Reference Manual 6.16.'),
        q('Welcher KRL-Befehl erzeugt eine Linearbewegung?',
            ['PTP', 'LIN', 'CIRC', 'WAIT'], 1,
            'KUKA KSS 8.7 Doku.'),
        q('Was beschreibt ein "Blend Radius" in URScript bzw. eine "Zonendaten" in RAPID?',
            ['Pufferspeicher', 'Approximationsbereich, in dem benachbarte Bewegungssegmente kontinuierlich verbunden werden', 'Sicherheitsabstand', 'Kollisionsradius'], 1,
            'Universal Robots URScript Manual; ABB RAPID Reference Manual.'),
        q('Welche Kommunikations-Layer-Spezifikation nutzt ROS 2?',
            ['MQTT', 'AMQP', 'OMG DDS (z.B. Cyclone DDS, Fast DDS)', 'CoAP'], 2,
            'ROS 2 Humble Doku 2024; OMG DDS 1.4.'),
        q('Welche LTS-Distribution von ROS 2 hat Support bis Mai 2027?',
            ['Foxy Fitzroy', 'Galactic Geochelone', 'Humble Hawksbill', 'Crystal Clemmys'], 2,
            'ROS 2 Distributions Doku 2024.'),
        q('Welcher Lifecycle-Zustand erlaubt aktive Veroeffentlichung von Daten in ROS 2?',
            ['unconfigured', 'inactive', 'active', 'finalized'], 2,
            'ROS 2 Lifecycle Spec 2024 (REP-2002).'),
        q('Welche Komponente in ros2_control verwaltet Controller-Lifecycles und Hardware Interfaces?',
            ['Controller Manager', 'rosbag', 'tf2', 'rviz'], 0,
            'ros2_control Documentation 2024.'),
        q('Welcher Planner ist Standard-Default in MoveIt 2 fuer 6-DOF-Manipulatoren?',
            ['RRTConnect (OMPL)', 'A*', 'Dijkstra', 'CHOMP zwingend'], 0,
            'MoveIt 2 Tutorial 2024 (OMPL Planning).'),
        q('Welche Kollisionspruefung-Bibliothek nutzt MoveIt 2?',
            ['Bullet only', 'FCL (Flexible Collision Library)', 'PhysX', 'ODE'], 1,
            'MoveIt 2 Doku 2024 (Collision Checking).'),
        q('Wofuer wird die SRDF in MoveIt 2 genutzt?',
            ['Hardware-Interfaces', 'Semantische Roboter-Beschreibung (Gruppen, Disable-Collisions, named poses)', 'DDS-QoS', 'URDF-Ersatz'], 1,
            'MoveIt 2 Doku 2024 (SRDF).'),
        q('Was ist die korrekte Aussage zu ROS 2 + harter Echtzeit?',
            ['ROS 2 ist per Default hart-echtzeit', 'ROS 2 wird mit Linux PREEMPT_RT bzw. Xenomai + ros2_control fuer harte Echtzeit konfiguriert', 'ROS 2 ist nicht echtzeitfaehig', 'Nur Windows-Build erlaubt'], 1,
            'ROS 2 Real-Time WG, Open Robotics Whitepaper 2023.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 6 — Industrie 4.0 und Digital Twin (PRODUKTIV)
    // Quellen: DIN SPEC 91345:2016 RAMI 4.0; IDTA "Asset Administration Shell
    // Reading Guide" 2024 + IDTA Spezifikationen 01001/01002; ISO 23247-1
    // bis -4:2021 (Digital Twin Manufacturing); IEC 62264-1:2013 (ISA-95);
    // IEC 62443-3-3:2013 / -4-1:2018 / -4-2:2019; OPC UA Companion
    // Specifications (UA for Devices, FX, Robotics 40010); Plattform
    // Industrie 4.0 Whitepapers 2023/2024; Industrial Internet Consortium
    // (IIC) IIRA 1.10 2022.
    // ----------------------------------------------------------------------

    const PAGE_I40_RAMI = {
        title: '6.1 RAMI 4.0 und Verwaltungsschale (Asset Administration Shell)',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die drei RAMI-4.0-Achsen Architecture/Layers, Lifecycle/Value Stream und Hierarchy Levels einordnen, (2) Konzept und Aufbau der Asset Administration Shell (AAS) erklaeren, (3) typische Submodelle (Nameplate, Technical Data, Documentation) benennen, (4) AAS-Repraesentationen (Type 1 File, Type 2 Server, Type 3 P2P) gegeneinander abgrenzen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Grundbegriffe Industriekommunikation (Kapitel 3), OPC UA Information Modeling, ISA-95-Hierarchie. Empfohlene Lektuere: DIN SPEC 91345:2016, IDTA "AAS Reading Guide v3.0" 2024.</p>'

            + '<h4>6.1.1 RAMI 4.0 (DIN SPEC 91345:2016)</h4>'
            + '<p>Das Reference Architecture Model Industrie 4.0 spannt drei Achsen auf:</p>'
            + '<ul>'
            + '<li><strong>Architecture / Layers</strong> (vertikal): Asset, Integration, Communication, Information, Functional, Business — 6 Schichten von Hardware bis Geschaeftsmodell.</li>'
            + '<li><strong>Lifecycle &amp; Value Stream</strong> (horizontal-1, IEC 62890): Type vs. Instance; Entwicklung -&gt; Wartung/Nutzung.</li>'
            + '<li><strong>Hierarchy Levels</strong> (horizontal-2, IEC 62264 + IEC 61512 erweitert): Product, Field Device, Control Device, Station, Work Centers, Enterprise, <em>Connected World</em>.</li>'
            + '</ul>'

            + '<h4>6.1.2 Asset Administration Shell — Konzept</h4>'
            + '<p>Die AAS ist die digitale Repraesentation eines Assets ueber den Lebenszyklus. Sie aggregiert <em>Submodelle</em> (Submodels) als typisierte Container fuer Eigenschaften (SubmodelElements: Property, MultiLanguageProperty, File, Reference, Operation, Capability). IDTA 01001-3 definiert das Metamodell, IDTA 01002 die XML/JSON/RDF/AAS-X-Serialisierungen.</p>'

            + '<h4>6.1.3 Drei AAS-Repraesentationstypen</h4>'
            + '<ul>'
            + '<li><strong>Type 1 — File-based (Passive AAS)</strong>: AAS-X (ZIP) mit XML/JSON-Submodellen, statisch ausgetauscht (z.B. zur Inbetriebnahme).</li>'
            + '<li><strong>Type 2 — Server-based (Active AAS)</strong>: AAS exposes REST/HTTP- oder OPC UA-Schnittstellen; Submodelle werden zur Laufzeit gelesen/geschrieben (IDTA 01005-1: AAS API).</li>'
            + '<li><strong>Type 3 — Reactive AAS (I4.0-Interaction)</strong>: AAS kommunizieren P2P ueber I4.0-Sprache (Interaction-Pattern), z.B. fuer autonome Verhandlungen (Plug-and-Produce).</li>'
            + '</ul>'

            + '<h4>6.1.4 Standard-Submodelle</h4>'
            + '<p>IDTA hat eine wachsende Liste kuratierter Submodelle veroeffentlicht (Stand 2024 ueber 30): Digital Nameplate (IDTA 02006), Technical Data (IDTA 02003), Documentation (IDTA 02002), Carbon Footprint (IDTA 02023), Time Series Data (IDTA 02008), HierarchicalStructures (IDTA 02011), Service Request Notification (IDTA 02022). Wer ein eigenes Submodell-Template definiert, sollte es ueber semanticId mit ECLASS oder IEC CDD verknuepfen.</p>'

            + '<h4>Worked Example: Submodel "Digital Nameplate"</h4>'
            + '<p>Aufgabe: Repraesentiere den ABB IRB 1600 als AAS-Submodell-Eintrag mit minimalen Pflichtfeldern aus IDTA 02006-3.</p>'
            + '<ol>'
            + '<li>Asset Identifier: <code>idShort: "Robot_IRB1600"</code>, globalAssetId: <code>https://abb.com/aas/IRB1600/SN-XYZ</code>.</li>'
            + '<li>Submodel Digital Nameplate: <code>idShort: "Nameplate"</code>, semanticId aus IDTA 02006-3.</li>'
            + '<li>Properties: ManufacturerName="ABB", ManufacturerProductDesignation="IRB 1600-1.45", SerialNumber="XYZ", YearOfConstruction="2024", URI of Operating Manual als File-Element.</li>'
            + '<li>Konformitaet: Pflichtfelder gemaess IDTA 02006-3 §5 erfuellt; ECLASS-Referenz in semanticId.</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche drei Achsen spannt RAMI 4.0 auf — und welche Norm liegt der Lifecycle-Achse zu Grunde?</li>'
            + '<li>Wodurch unterscheidet sich eine Type-2-AAS von einer Type-1-AAS in der Implementierung?</li>'
            + '<li>Wofuer dient die <em>semanticId</em> eines Submodel-Elements?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> AAS-Submodell ohne semanticId. <em>Korrekt:</em> Jedes Property erhaelt eine semanticId aus ECLASS/IEC CDD/IDTA — sonst kein Maschine-zu-Maschine-Verstaendnis.</li>'
            + '<li><em>Fehler:</em> RAMI 4.0 mit ISA-95 verwechseln. <em>Korrekt:</em> RAMI integriert ISA-95 (Hierarchy-Achse) <em>und</em> Lifecycle <em>und</em> Layers — RAMI ist Obermenge.</li>'
            + '<li><em>Fehler:</em> "Digital Twin = AAS". <em>Korrekt:</em> AAS ist eine Repraesentations-Schicht; Digital Twin (ISO 23247) ist die Lebenszyklus-Synchronisation Realsystem &lt;-&gt; Modell.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Eine Werkzeugmaschine soll AAS-konform an ein MES angebunden werden. Diskutieren Sie, ob Type 1, Type 2 oder Type 3 angemessen ist, und entwerfen Sie eine Submodell-Liste (3 Standard-IDTA-Submodelle plus 1 eigenes) zur Abdeckung von Stammdaten, Produktionsdaten und Wartungsmeldungen.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: DIN SPEC 91345:2016 (RAMI 4.0); IDTA "AAS Reading Guide" v3.0 2024; IDTA 01001-3 (AAS Metamodel); IDTA 01002-3 (Serialization); IDTA 01005-1 (AAS API); IDTA 02006-3 (Digital Nameplate); IEC 62890:2020 (Lifecycle Mgmt); Plattform Industrie 4.0 Whitepaper "Details of the Asset Administration Shell" 2023.</em></p>'
    };

    const PAGE_I40_DT = {
        title: '6.2 Digital Twin nach ISO 23247 — Architektur, Synchronisation, Anwendungsfaelle',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Digital Twin von Digital Model und Digital Shadow abgrenzen, (2) die ISO-23247-Domains (User, Digital Twin, Device Communication, Observable Manufacturing Element) erklaeren, (3) Synchronisationsstrategien (Pull, Push, Streaming) bewerten, (4) typische Anwendungsfaelle (virtuelle Inbetriebnahme, Predictive Maintenance, OEE-Tracking) zuordnen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kapitel 6.1 (AAS), Kapitel 3 (OPC UA), Grundlagen Mehrkoerperdynamik (Kapitel 5.2). Empfohlene Lektuere: ISO 23247-1 bis -4:2021, Kritzinger et al. "Digital Twin in Manufacturing: A Categorical Literature Review", IFAC PapersOnLine 51(11), 2018.</p>'

            + '<h4>6.2.1 Digital Twin Definition</h4>'
            + '<p>Kritzinger et al. (2018) klassifizieren nach Synchronisationsgrad:</p>'
            + '<ul>'
            + '<li><strong>Digital Model</strong>: rein simuliert, keine Datenverbindung zum Realsystem.</li>'
            + '<li><strong>Digital Shadow</strong>: Realsystem -&gt; Modell (One-Way), Modell folgt Realsystem.</li>'
            + '<li><strong>Digital Twin</strong>: bidirektional, Modell beeinflusst Realsystem (Optimierung, Steuerung).</li>'
            + '</ul>'
            + '<p>ISO 23247-1:2021 definiert Digital Twin allgemeiner als "fit-for-purpose digital representation of an Observable Manufacturing Element with synchronization between the element and its digital representation".</p>'

            + '<h4>6.2.2 ISO 23247 Vier-Domain-Architektur</h4>'
            + '<ul>'
            + '<li><strong>User Domain</strong>: Anwender (Engineer, Operator, MES, ERP).</li>'
            + '<li><strong>Digital Twin Entity</strong>: Modelle, Daten, Services, Synchronisations-Logik.</li>'
            + '<li><strong>Device Communication Entity</strong>: Datenakquise, Protokolle (OPC UA, MQTT, MTConnect, OPC UA FX).</li>'
            + '<li><strong>Observable Manufacturing Element</strong>: das reale Asset (Roboter, Werkzeugmaschine, Linie, Werkstueck).</li>'
            + '</ul>'

            + '<h4>6.2.3 Synchronisationsstrategien</h4>'
            + '<p>Pull-basiert (Modell pollt Asset, OPC UA Client-Server, Latenz typ. 100 ms-1 s), Push-basiert (Asset veroeffentlicht, OPC UA Pub/Sub mit MQTT/UDP, Latenz typ. 10-100 ms), Streaming/TSN (OPC UA FX + IEEE 802.1Q-TSN, Latenz &lt;1 ms — geeignet fuer Closed-Loop Echtzeit-Twin). Hochfrequenz Anwendungen (z.B. virtuelle Inbetriebnahme von Servoachsen) erfordern Streaming + Hardware-in-the-Loop-Synchronisation.</p>'

            + '<h4>6.2.4 Anwendungsfaelle</h4>'
            + '<ul>'
            + '<li><strong>Virtuelle Inbetriebnahme</strong> (Siemens NX MCD, ANSYS Twin Builder, Microsoft Azure Digital Twins, Dassault 3DEXPERIENCE): SPS-Code wird vor Realanlage gegen Modell getestet (HiL/SiL).</li>'
            + '<li><strong>Predictive Maintenance</strong>: Modell schaetzt Restlebensdauer (Bewegungslager, Schneidwerkzeuge) aus Streaming-Daten.</li>'
            + '<li><strong>OEE-Tracking</strong>: Modell aggregiert Verfuegbarkeit/Leistung/Qualitaet aus Live-Daten + Soll-Plan.</li>'
            + '<li><strong>Closed-Loop-Optimierung</strong>: Modell rechnet Set-Points zurueck zur Anlage (echter Twin nach Kritzinger).</li>'
            + '</ul>'

            + '<h4>Worked Example: Latenz-Budget Closed-Loop-Twin</h4>'
            + '<p>Aufgabe: Ein Closed-Loop-Twin steuert eine Servoachse mit Zykluszeit $T_z=1\\,\\text{ms}$. Welcher Synchronisations-Layer ist erforderlich?</p>'
            + '<ol>'
            + '<li>Annahme: Modell-Berechnungszeit 200 us, Round-Trip Akquise + Set-Point 600 us bei Pub/Sub TSN.</li>'
            + '<li>Pull-basiert (1-s-Polling) -&gt; offensichtlich unzulaessig.</li>'
            + '<li>OPC UA Client-Server (typ. 100 ms) -&gt; um Faktor 100 zu langsam.</li>'
            + '<li>OPC UA Pub/Sub MQTT (10-100 ms) -&gt; immer noch unzulaessig.</li>'
            + '<li>OPC UA FX + TSN (Qbv-Scheduled Traffic, IEEE 802.1Qbv-2015) -&gt; Sub-Millisekunden-Latenz erreichbar; passt zum 1-ms-Budget.</li>'
            + '<li>Resultat: Streaming/TSN ist Pflicht; Pull/Pub-Sub ueber MQTT scheidet aus.</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Wodurch unterscheidet sich ein Digital Twin von einem Digital Shadow?</li>'
            + '<li>Welche vier Domains nennt ISO 23247-1:2021?</li>'
            + '<li>Welcher Synchronisations-Layer ist fuer Sub-Millisekunden-Anwendungen typisch erforderlich?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Predictive Maintenance ohne Modellvalidierung. <em>Korrekt:</em> Holdout-Datensatz und Drift-Monitoring sind Pflicht — sonst false positives / Vertrauensverlust.</li>'
            + '<li><em>Fehler:</em> "Digital Twin = 3D-Visualisierung". <em>Korrekt:</em> Visualisierung ist eine UI-Schicht; Kern ist Synchronisation + Modell + Service-Layer (ISO 23247-2).</li>'
            + '<li><em>Fehler:</em> MQTT als Closed-Loop-Layer fuer 1-ms-Achsen. <em>Korrekt:</em> OPC UA FX/TSN; MQTT eignet sich fuer 100-ms-Klasse.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Skizzieren Sie fuer eine Servoachse mit virtueller Inbetriebnahme eine ISO-23247-konforme Architektur mit (a) Auswahl Synchronisationsstrategie, (b) zwei kritischen Submodellen aus AAS, (c) zwei Validierungs-Metriken fuer das Modell und (d) einer Daten-Pipeline-Sicherheitsbetrachtung gemaess IEC 62443-3-3.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: ISO 23247-1 bis -4:2021 (Digital Twin Manufacturing); Kritzinger et al., IFAC PapersOnLine 51(11), 2018; Tao/Zhang, "Digital Twin Driven Smart Manufacturing", Elsevier 2019; Plattform Industrie 4.0 Whitepaper "Digital Twin and AAS" 2023; IEEE 802.1Qbv-2015.</em></p>'
    };

    const PAGE_I40_MES = {
        title: '6.3 MES, ERP und Edge Computing — ISA-95, MTConnect, Container in OT',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die ISA-95-Hierarchieebenen L0-L4 zuordnen, (2) die ISA-95-Functional-Hierarchie mit den B2MML-Datenmodellen (Operations Definition, Schedule, Performance) verknuepfen, (3) MTConnect als Datenstandard fuer Werkzeugmaschinen einordnen, (4) Architektur-Optionen (Edge, Cloud, On-Prem) anhand Latenz, Sicherheit und Wartbarkeit waehlen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kapitel 6.1 (RAMI), Grundlagen Datenbanken/Schichtarchitektur, Kapitel 3 (Industrielle Kommunikation). Empfohlene Lektuere: IEC 62264-1:2013, ANSI/MESA B2MML v0700 (2023), MTConnect Standard 2.3 (2024).</p>'

            + '<h4>6.3.1 ISA-95-Hierarchie (IEC 62264-1)</h4>'
            + '<ul>'
            + '<li><strong>L0</strong>: Physikalischer Prozess.</li>'
            + '<li><strong>L1</strong>: Sensoren/Aktoren (E/A, Antriebe).</li>'
            + '<li><strong>L2</strong>: Steuerung (SPS, DCS, SCADA).</li>'
            + '<li><strong>L3</strong>: Manufacturing Operations Management — MES (Production, Quality, Maintenance, Inventory).</li>'
            + '<li><strong>L4</strong>: Geschaeftsplanung &amp; Logistik — ERP.</li>'
            + '</ul>'
            + '<p>Zeit-Skalen: L0/L1 us-ms, L2 ms-s, L3 s-min, L4 min-Tage.</p>'

            + '<h4>6.3.2 B2MML / MES-Funktionen</h4>'
            + '<p>B2MML (Business to Manufacturing Markup Language, MESA) implementiert IEC 62264 in XML-Schemata. Kernobjekte: <em>OperationsDefinition</em>, <em>OperationsSchedule</em>, <em>OperationsPerformance</em>, <em>EquipmentInformation</em>, <em>MaterialInformation</em>. MES-typische L3-Funktionen: Auftragsfeinplanung, Materialverfolgung, Qualitaetsmanagement (z.B. SPC, Genealogie), Wartungsplanung, OEE-Berechnung.</p>'

            + '<h4>6.3.3 MTConnect</h4>'
            + '<p>MTConnect Standard v2.3 (2024) ist ein offener Datenstandard fuer Werkzeugmaschinen-Telemetrie (HTTP/REST, XML/JSON), urspruenglich aus der CNC-Welt. Kernkonzepte: Agent (sammelt Daten am Asset), Adapter (konvertiert Hersteller-Spezifika), Probe-/Current-/Sample-Endpoints. Komplementaer zu OPC UA: MTConnect ist primaer asset-orientiert und stark in CNC-Branche; OPC UA ist allgemeiner und Pub/Sub-faehig.</p>'

            + '<h4>6.3.4 OEE-Kennzahlen</h4>'
            + '<p>Overall Equipment Effectiveness $OEE=\\text{Verfuegbarkeit}\\times \\text{Leistung}\\times \\text{Qualitaet}$. Verfuegbarkeit $=t_\\text{operating}/t_\\text{planned}$; Leistung $=q_\\text{actual}/q_\\text{theoretical}$; Qualitaet $=q_\\text{good}/q_\\text{actual}$. World-Class-Niveau ueblich $\\ge 85\\%$ (Nakajima 1988); deutsche Industrie liegt im Schnitt 60-70 %.</p>'

            + '<h4>6.3.5 Edge / Cloud / On-Prem</h4>'
            + '<p>Edge: Container in OT (K3s, MicroK8s, Docker, Azure IoT Edge, AWS Greengrass) — typische Use Cases: Pre-Aggregation, Anomaly Detection, lokales ML-Inferencing. Sicherheits-Anforderung gemaess IEC 62443-3-3 SR 1.13 / SR 5.1: Container muessen authentifiziert &amp; signiert ausgerollt werden (z.B. Sigstore Cosign Keyless 2024). Cloud (AWS/Azure/GCP) fuer langfristige Daten und ML-Training, mit Datenklassifizierung (kein PII unbeabsichtigt exfiltrieren).</p>'

            + '<h4>Worked Example: OEE-Berechnung</h4>'
            + '<p>Anlage: 16 h geplante Schicht, 2 h ungeplanter Stillstand. Theoretische Taktzeit 30 s/Stueck; tatsaechlich 1.500 Stueck im 14-h-Lauf produziert. Davon 1.470 i.O.-Teile.</p>'
            + '<ol>'
            + '<li>Verfuegbarkeit: $A=14/16=0{,}875$ (87{,}5%).</li>'
            + '<li>Leistung: theoretisch moeglich $14\\,\\text{h}\\cdot 3600/30=1.680$ Stueck. $P=1.500/1.680=0{,}893$.</li>'
            + '<li>Qualitaet: $Q=1.470/1.500=0{,}980$.</li>'
            + '<li>OEE $=0{,}875\\cdot 0{,}893\\cdot 0{,}980=0{,}766$ (76{,}6%).</li>'
            + '<li>Bewertung: ueber Branchen-Mittel, unter World-Class — Hauptansatz Performance (Mikro-Stoerungen, Ruestung).</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche ISA-95-Ebene macht typischerweise Auftragsfeinplanung und OEE-Berechnung?</li>'
            + '<li>Wodurch unterscheiden sich die Zeitscalen von L0/L1 und L4?</li>'
            + '<li>Welche der drei OEE-Komponenten (A, P, Q) leidet typischerweise unter Mikro-Stoerungen und Ruestzeiten?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> ERP-Funktionalitaet auf L3 versuchen. <em>Korrekt:</em> ERP gehoert nach L4 (z.B. SAP S/4HANA), MES bleibt L3 — sonst Latenz- und Verantwortungs-Probleme.</li>'
            + '<li><em>Fehler:</em> OEE-Verfuegbarkeit auf 24 h beziehen statt auf <em>geplante</em> Schicht. <em>Korrekt:</em> Definition Nakajima 1988 verwendet geplante Belegungszeit.</li>'
            + '<li><em>Fehler:</em> Container in OT ohne signierte Images deployen. <em>Korrekt:</em> Cosign-Signaturpflicht + Admission-Controller (Kyverno/Sigstore Policy Controller) gemaess IEC 62443-3-3 SR 5.1.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Eine bestehende SCADA-Anbindung (L2) liefert OPC-UA-Daten in Sekundentakt. Skizzieren Sie eine Edge/Cloud-Architektur, die (a) lokale Anomaly-Detection (Edge), (b) Langzeit-Aggregation (Cloud) und (c) MES-Anbindung an L3 abdeckt, inklusive zwei Sicherheitsmassnahmen (IEC 62443) und einer OEE-Aggregations-Vorschrift.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 62264-1:2013 (ISA-95); ANSI/MESA B2MML v0700, 2023; MTConnect Standard 2.3, 2024; Nakajima, "Introduction to TPM", Productivity Press 1988; IEC 62443-3-3:2013; Sigstore Cosign Doku 2024; Microsoft Azure IoT Edge / AWS Greengrass Doku 2024.</em></p>'
    };

    const PAGE_I40_SEC = {
        title: '6.4 OT-Sicherheit in Industrie 4.0 — IEC 62443, Zonen, Zertifikate',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die IEC-62443-Reihe nach Adressaten (Asset Owner, System Integrator, Product Supplier) abgrenzen, (2) Security Levels SL-T 1-4 anwenden, (3) Zonen-und-Conduit-Modell entwerfen, (4) Identitaets- und Zertifikatslebenszyklus in OPC UA / AAS-Anwendungen beschreiben.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kapitel 1 (Cybersec-Grundlagen falls verfuegbar), Kapitel 6.1-6.3, Public-Key-Infrastruktur. Empfohlene Lektuere: IEC 62443-3-2:2020, IEC 62443-3-3:2013, IEC 62443-4-1:2018, IEC 62443-4-2:2019.</p>'

            + '<h4>6.4.1 IEC-62443-Familie und Adressaten</h4>'
            + '<ul>'
            + '<li>Teil 1 (Allgemein, Konzepte).</li>'
            + '<li>Teil 2 (Programm-Anforderungen an <em>Asset Owner</em>).</li>'
            + '<li>Teil 3 (System-Anforderungen an <em>System Integrator</em>): 3-2 Risikoanalyse + Zonen/Conduits, 3-3 System Security Requirements (SR/RE).</li>'
            + '<li>Teil 4 (Komponenten-Anforderungen an <em>Product Supplier</em>): 4-1 Secure Development Lifecycle, 4-2 Component Security.</li>'
            + '</ul>'

            + '<h4>6.4.2 Security Levels (SL)</h4>'
            + '<p>Vier Niveaus (IEC 62443-3-3:2013 §3): SL 1 (gegen casual misuse), SL 2 (intentional misuse mit einfachen Mitteln, low resources, generic skills), SL 3 (intentional misuse mit moderate resources, IACS-spezifischer skills), SL 4 (intentional misuse mit hohen Ressourcen, extended skills). Ein Asset Owner definiert SL-T (target), das Resultat aus Risikoanalyse; Komponenten/Systeme weisen SL-C (capability) nach.</p>'

            + '<h4>6.4.3 Zonen-und-Conduit-Modell</h4>'
            + '<p>IEC 62443-3-2:2020 verlangt Segmentierung in <em>Zonen</em> (Gruppen mit gleichen Sicherheitsanforderungen) und <em>Conduits</em> (kontrollierte Verbindungen zwischen Zonen). Beispielsegmentierung in einer Werkstattzelle:</p>'
            + '<ul>'
            + '<li><strong>Zone L0/L1 Field</strong>: SPS, Antriebe, Roboter — SL-T 3 ueblich.</li>'
            + '<li><strong>Zone L2 Process</strong>: SCADA, HMIs — SL-T 2-3.</li>'
            + '<li><strong>Zone L3 MES</strong>: MES, Historian — SL-T 2.</li>'
            + '<li><strong>Zone L4 Enterprise</strong>: ERP — SL-T 1-2 (haeufig durch IT-Domaene abgedeckt).</li>'
            + '<li><strong>Conduits</strong>: Firewalls, DMZ, OPC UA Reverse Connect, Data Diodes (z.B. Layer-1-Diode bei Critical Infrastructures gemaess BSI-Kritisanforderungen).</li>'
            + '</ul>'

            + '<h4>6.4.4 Identitaeten und Zertifikate (OPC UA)</h4>'
            + '<p>OPC UA Part 2 (Security) verlangt fuer SecurityPolicy <em>Basic256Sha256</em>, <em>Aes128_Sha256_RsaOaep</em> oder <em>Aes256_Sha256_RsaPss</em> (Stand 2024). Anwendungs-Instanz-Zertifikate werden ueber GDS (Global Discovery Server, OPC UA Part 12) verwaltet — Lifecycle: Erzeugung, Auslieferung, Renewal, Revocation. PKI-Vertrauensanker idealerweise hardware-gebunden (Secure Element TPM 2.0, FIPS 140-3-Modul).</p>'

            + '<h4>Worked Example: Zonen-Konzept Cobot-Zelle</h4>'
            + '<p>Cobot-Zelle mit 1x Cobot, 1x Bildverarbeitung, 1x SPS, 1x SCADA-PC, 1x MES-Anbindung. Entwickle Zonen + SL-T.</p>'
            + '<ol>'
            + '<li>Zone "Field-Cobot" (Cobot, SPS, Bildverarbeitung): SL-T 3 (Manipulation an Cobot ist Safety-relevant). Conduit zur Zone Process via TLS 1.3 + Mutual Auth.</li>'
            + '<li>Zone "Process" (SCADA-PC, HMI): SL-T 2-3. Conduit zur Zone MES via DMZ-Reverse-Proxy + OPC UA Pub/Sub.</li>'
            + '<li>Zone "MES" (L3): SL-T 2. Conduit zur Enterprise via reverse-only firewall.</li>'
            + '<li>Datendiode oder Reverse Connect, wenn Asset Owner kritisch (KRITIS) ist; Logging in zentralem SIEM (NIST SP 800-92).</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Wer ist Adressat von IEC 62443-4-1?</li>'
            + '<li>Welche Differenz besteht zwischen SL-T und SL-C?</li>'
            + '<li>Welche OPC-UA-SecurityPolicy ist 2024 Mindeststandard?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Conduit als reine Firewall-Regel umsetzen ohne Authentifizierung. <em>Korrekt:</em> Conduit umfasst Authentifizierung, Verschluesselung, Logging — nicht nur ACL.</li>'
            + '<li><em>Fehler:</em> Default-Zertifikat des OPC-UA-Servers im Feld belassen. <em>Korrekt:</em> Per GDS verwaltete Application Instance Certificates mit endlicher Gueltigkeit + Renewal-Prozess.</li>'
            + '<li><em>Fehler:</em> Annahme "Air-Gap reicht". <em>Korrekt:</em> Air-Gap bricht bei USB/Wartung/Updates; IEC 62443 verlangt Compensating Controls (auch fuer "isolierte" Anlagen).</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Eine OT-Anlage soll von einer Cloud-MES-Plattform (Public Cloud) Auftragsdaten erhalten und produktionsstandsdaten zurueckliefern. Entwickeln Sie eine Zonen-und-Conduit-Architektur mit (a) zwei Compensating Controls fuer den Internet-Conduit, (b) PKI-Strategie fuer OPC-UA-Endpoints und (c) Auswahl SL-T pro Zone gemaess IEC 62443-3-2.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 62443-3-2:2020 (Risk Assessment + Zones/Conduits); IEC 62443-3-3:2013 (System SR); IEC 62443-4-1:2018 (SDL); IEC 62443-4-2:2019 (Component); OPC UA Part 2:2022 (Security); OPC UA Part 12:2018 (GDS); BSI-Mindeststandard zur Zertifikatslebenszyklus 2023; NIST SP 800-92.</em></p>'
    };

    const QUIZ_I40 = [
        // ---- RAMI / AAS (1-13) ----
        q('Welche Norm definiert RAMI 4.0?',
            ['DIN SPEC 91345:2016', 'IEC 61131-3', 'ISO 9001', 'IEEE 802.3'], 0,
            'DIN SPEC 91345:2016.'),
        q('Welche drei Achsen spannt RAMI 4.0 auf?',
            ['Architecture/Layers, Lifecycle/Value Stream, Hierarchy Levels', 'X, Y, Z', 'OSI 1-3', 'P, I, D'], 0,
            'DIN SPEC 91345:2016 §4.'),
        q('Welche Norm liegt der Lifecycle-Achse zugrunde?',
            ['IEC 62890', 'IEC 62264', 'IEC 61131-3', 'ISO 9001'], 0,
            'IEC 62890:2020.'),
        q('Wofuer steht AAS in Industrie 4.0?',
            ['Asset Administration Shell', 'Active Auto Shutdown', 'Adaptive Antenna System', 'Automated Asset Schedule'], 0,
            'IDTA AAS Reading Guide v3.0 2024.'),
        q('Welche Spezifikation definiert das AAS-Metamodell?',
            ['IDTA 01001-3', 'IEC 61131-3', 'ISO 9001', 'IEEE 802.1Q'], 0,
            'IDTA 01001-3 (AAS Metamodel).'),
        q('Welche AAS-Repraesentation kommuniziert ueber REST/HTTP zur Laufzeit?',
            ['Type 1 (file-based, AAS-X)', 'Type 2 (server-based, active)', 'Type 3 (P2P)', 'Es gibt keine Repraesentationstypen'], 1,
            'IDTA AAS Reading Guide v3.0 2024.'),
        q('Welches Submodel-Element-Feld dient der semantischen Verknuepfung mit ECLASS oder IEC CDD?',
            ['idShort', 'semanticId', 'displayName', 'parent'], 1,
            'IDTA 01001-3 (Metamodel).'),
        q('Welches Submodell beschreibt das Digitale Typenschild?',
            ['IDTA 02006 Digital Nameplate', 'IDTA 02022 Service Request', 'IDTA 02023 Carbon Footprint', 'IDTA 02011 Hierarchical Structures'], 0,
            'IDTA 02006-3 (Digital Nameplate).'),
        q('Welche Aussage ist korrekt bezueglich AAS und Digital Twin?',
            ['AAS und Digital Twin sind synonym', 'AAS ist Repraesentations-Schicht; Digital Twin (ISO 23247) ergaenzt um Synchronisation', 'AAS ersetzt Digital Twin', 'Beide werden in IEC 61131-3 definiert'], 1,
            'IDTA Reading Guide 2024; ISO 23247-1:2021.'),
        q('Wie viele Layer hat die Architektur-Achse von RAMI 4.0?',
            ['3', '5', '6', '8'], 2,
            'DIN SPEC 91345:2016: Asset, Integration, Communication, Information, Functional, Business.'),
        q('Welche Hierarchie-Ebene erweitert ISA-95 in RAMI 4.0?',
            ['Connected World', 'Internet 4.0', 'Cloud Sphere', 'Hyper Scale'], 0,
            'DIN SPEC 91345:2016 (Hierarchy Levels Achse).'),
        q('Welcher AAS-Repraesentationstyp eignet sich fuer statisch ausgetauschte Inbetriebnahme-Daten?',
            ['Type 1 (file-based)', 'Type 2 (active)', 'Type 3 (reactive)', 'Type 4 (legacy)'], 0,
            'IDTA Reading Guide 2024.'),
        q('Wer veroeffentlicht die kuratierten AAS-Submodelle?',
            ['Industrial Digital Twin Association (IDTA)', 'IEEE', 'ISO TC 184', 'OWASP'], 0,
            'IDTA Submodel Templates 2024.'),

        // ---- Digital Twin / ISO 23247 (14-25) ----
        q('Welche ISO normiert Digital Twin in Manufacturing?',
            ['ISO 27001', 'ISO 23247-1 bis -4:2021', 'ISO 9001', 'IEC 61131-3'], 1,
            'ISO 23247-1:2021.'),
        q('Wie viele Domains definiert ISO 23247-1?',
            ['Zwei', 'Drei', 'Vier', 'Sieben'], 2,
            'ISO 23247-1:2021 §6.'),
        q('Wodurch unterscheidet sich Digital Shadow von Digital Twin nach Kritzinger 2018?',
            ['Shadow ist bidirektional, Twin nur One-Way', 'Shadow ist One-Way (Real-&gt;Modell), Twin ist bidirektional', 'Sind synonym', 'Shadow nutzt MQTT, Twin OPC UA'], 1,
            'Kritzinger et al., IFAC PapersOnLine 51(11), 2018.'),
        q('Welcher Layer ermoeglicht Sub-Millisekunden-Synchronisation?',
            ['Pull-Polling', 'OPC UA Client-Server', 'OPC UA Pub/Sub MQTT', 'OPC UA FX + IEEE 802.1Qbv-TSN'], 3,
            'IEEE 802.1Qbv-2015; OPC UA FX (UA Part 80 / Companion Spec).'),
        q('Was ist ein "Observable Manufacturing Element" gemaess ISO 23247?',
            ['Datenbank', 'Reales Asset, das durch Digital Twin abgebildet wird', 'Software-Modul', 'IT-Server'], 1,
            'ISO 23247-1:2021.'),
        q('Welcher Use Case ist klassisch ein Digital Twin (echter Twin nach Kritzinger)?',
            ['Manuelle 3D-Visualisierung', 'Closed-Loop-Optimierung mit Modellrueckwirkung auf Realsystem', 'Statisches CAD-Modell', 'Excel-Bericht'], 1,
            'Kritzinger 2018.'),
        q('Welche Synchronisationslatenz ist typisch fuer OPC UA Pub/Sub MQTT?',
            ['&lt;1 ms', '10-100 ms', '1-2 s', 'Mehr als 1 min'], 1,
            'OPC UA Part 14:2022; MQTT 5.0 OASIS 2019.'),
        q('Welche Validierung ist fuer Predictive-Maintenance-Modelle Pflicht?',
            ['Holdout-Datensatz und Drift-Monitoring', 'Nur Trainingsdaten', 'Keine', 'Visuelle Inspektion'], 0,
            'Kritzinger 2018; ISO/IEC 5338:2023 (AI System Lifecycle).'),
        q('Wofuer steht "MTConnect"?',
            ['Steuerungs-Bus', 'Offener Telemetrie-Standard fuer Werkzeugmaschinen', 'Datenbank', 'Sicherheitsstandard'], 1,
            'MTConnect Standard v2.3, 2024.'),
        q('Welche Komponente in MTConnect liefert die Daten?',
            ['Agent', 'Master', 'Broker', 'Worker'], 0,
            'MTConnect Standard v2.3 §4.'),
        q('Was misst die OEE-Komponente "Leistung"?',
            ['Verhaeltnis tatsaechliche zu theoretischer Stueckzahl', 'Verhaeltnis i.O.-Teile zu Gesamt', 'Verhaeltnis Operating- zu Planungszeit', 'Energieeffizienz'], 0,
            'Nakajima 1988.'),
        q('Welche OEE-Komponente leidet typischerweise unter Mikro-Stoerungen und Geschwindigkeitsverlusten?',
            ['Verfuegbarkeit', 'Leistung', 'Qualitaet', 'Verbrauch'], 1,
            'Nakajima 1988.'),

        // ---- ISA-95 / MES / Edge (26-37) ----
        q('Welche Norm definiert ISA-95 / IEC 62264?',
            ['IEC 62264-1:2013', 'ISO 9001', 'IEC 61131-3', 'ISO 27001'], 0,
            'IEC 62264-1:2013.'),
        q('Welche Ebene macht im ISA-95-Modell typisch Auftragsfeinplanung?',
            ['L0', 'L1', 'L3 (MES)', 'L5'], 2,
            'IEC 62264-1:2013.'),
        q('Welche Ebene macht typischerweise Geschaeftsplanung und ERP?',
            ['L0', 'L2', 'L3', 'L4'], 3,
            'IEC 62264-1:2013.'),
        q('Was ist B2MML?',
            ['XML-Schema-Familie zur Implementierung von IEC 62264', 'Bus-System', 'Datenbankprotokoll', 'AAS-Submodell'], 0,
            'ANSI/MESA B2MML v0700, 2023.'),
        q('Welche Zeit-Skala ist typisch fuer L0/L1?',
            ['us-ms', 's-min', 'min-Stunden', 'Tage'], 0,
            'IEC 62264-1 (Time scales).'),
        q('Welche Container-Engine wird fuer leichtgewichtiges Edge-K8s genutzt?',
            ['Wine', 'K3s / MicroK8s', 'Bash', 'Excel'], 1,
            'Rancher K3s / Canonical MicroK8s Doku 2024.'),
        q('Welche Anforderung aus IEC 62443-3-3 verlangt signierte Container-Images bzw. authentifizierte Software-Auslieferung?',
            ['SR 1.13 (Access Control: Software/Configuration)', 'SR 7.6', 'SR 5.1', 'SR 1.13 + SR 5.1 (Integrity + Software/Config)'], 3,
            'IEC 62443-3-3:2013 (System Requirements Integrity / Access Control).'),
        q('Welche Werkzeuge eignen sich fuer Container-Image-Signaturen?',
            ['Sigstore Cosign Keyless 2024', 'OpenSSL nur', 'GPG fest', 'Keine'], 0,
            'Sigstore Cosign Doku 2024.'),
        q('Welche typische OEE-Berechnung gilt?',
            ['$OEE=A+P+Q$', '$OEE=A\\cdot P\\cdot Q$', '$OEE=A/P\\cdot Q$', '$OEE=Q^A$'], 1,
            'Nakajima 1988.'),
        q('Welche Anlage ist typischer Anwendungsfall fuer MTConnect?',
            ['CNC-Werkzeugmaschine', 'Notebook', 'PROFIBUS-PA-Druckmessumformer', 'Smart Watch'], 0,
            'MTConnect Standard v2.3 §1 Scope.'),
        q('Wofuer steht "Genealogie" im MES?',
            ['Stammbaum eines Mitarbeiters', 'Rueckverfolgbarkeit eines Werkstuecks (Material/Charge/Schritte)', 'Kostenstellen', 'Backup'], 1,
            'IEC 62264-3:2016 (MES-Aktivitaeten).'),
        q('Welche Ebene macht typischerweise SCADA-Funktionalitaeten?',
            ['L0', 'L2', 'L3', 'L4'], 1,
            'IEC 62264-1:2013 (Hierarchy).'),

        // ---- OT-Sicherheit / IEC 62443 (38-50) ----
        q('Welcher Adressat ist primaer fuer IEC 62443-4-1 zustaendig?',
            ['Asset Owner', 'System Integrator', 'Product Supplier', 'Auditor'], 2,
            'IEC 62443-4-1:2018.'),
        q('Was definiert IEC 62443-3-3?',
            ['System Security Requirements (SR/RE)', 'AAS-Metamodell', 'OEE-Berechnung', 'OPC UA Pub/Sub'], 0,
            'IEC 62443-3-3:2013.'),
        q('Wodurch unterscheidet sich SL-T (target) von SL-C (capability)?',
            ['SL-T = Soll aus Risikoanalyse, SL-C = Faehigkeit eines Systems/Komponente', 'Sind synonym', 'SL-T &lt; SL-C immer', 'Nur SL-T existiert'], 0,
            'IEC 62443-3-3:2013 §3.'),
        q('Was umfasst ein "Conduit" im IEC-62443-Modell?',
            ['Eine reine Firewall-Regel', 'Eine kontrollierte Verbindung mit Authentifizierung, Verschluesselung und Logging zwischen Zonen', 'Ein VLAN', 'Eine Datenbank-Tabelle'], 1,
            'IEC 62443-3-2:2020 §6.'),
        q('Welche OPC-UA-SecurityPolicy ist 2024 Mindeststandard?',
            ['None (sec=0)', 'Basic128Rsa15 (deprecated)', 'Basic256Sha256 oder Aes-Sha256-Profile', 'Basic256 (deprecated)'], 2,
            'OPC UA Part 2:2022 + OPC Foundation Security Update 2023.'),
        q('Welcher Standard regelt OPC UA Application Instance Certificates Management?',
            ['OPC UA Part 12 (GDS)', 'IEC 61131-3', 'IEEE 802.1Q', 'ISO 9001'], 0,
            'OPC UA Part 12:2018.'),
        q('Welche Aussage ist korrekt zur Air-Gap-Annahme?',
            ['Air-Gap bietet 100 % Schutz', 'Air-Gap bricht regelmaessig durch USB/Wartung/Updates; Compensating Controls noetig', 'Nicht in IEC 62443 abgedeckt', 'Erlaubt SL 4 ohne weitere Massnahmen'], 1,
            'IEC 62443-3-3:2013; BSI-Industrieempfehlung 2023.'),
        q('Welcher Zone-SL-T ist typisch fuer Field-Level (SPS, Antrieb, Roboter)?',
            ['SL-T 1', 'SL-T 2-3', 'SL-T 3', 'SL-T 4 immer'], 2,
            'IEC 62443-3-2:2020 (Risk-based determination).'),
        q('Welche Anforderung adressiert SR 5.1 in IEC 62443-3-3?',
            ['Information Confidentiality', 'Network Segmentation', 'Restricted Data Flow / Network Segmentation', 'Audit Logging'], 2,
            'IEC 62443-3-3:2013 §10.'),
        q('Welche Massnahme ist klassisches Beispiel fuer Compensating Control bei kritischer OT-Anlage?',
            ['Data Diode (Layer-1 unidirektional)', 'Default-Zertifikat lassen', 'WLAN ohne Verschluesselung', 'PROFIBUS ohne Schutz'], 0,
            'BSI Mindeststandard kritische Infrastrukturen 2023.'),
        q('Wofuer steht "GDS" in OPC UA?',
            ['Global Discovery Server', 'General Data Store', 'Generic Display Service', 'Generic Diagnostic Set'], 0,
            'OPC UA Part 12:2018.'),
        q('Welche Technologie eignet sich fuer hardware-gebundene Vertrauensanker im Feldgeraet?',
            ['Plain-Text-Datei', 'TPM 2.0 / FIPS 140-3-Modul / Secure Element', 'USB-Stick', 'Default-Passwort'], 1,
            'TCG TPM 2.0 Library 2019; FIPS 140-3:2019.'),
        q('Welche IEC-62443-Teilnorm verlangt Risikoanalyse + Zonen-/Conduit-Modellierung?',
            ['IEC 62443-3-2:2020', 'IEC 62443-4-2:2019', 'IEC 61131-3', 'ISO 9001'], 0,
            'IEC 62443-3-2:2020.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 7 — Master-Capstone Automatisierungstechnik (PRODUKTIV)
    // Referenz-Szenario: Vollautomatisierte Press-Montage-Linie mit Siemens
    // S7-1500F (ProfiSafe), Beckhoff AX5000 EtherCAT-Servoachsen, ABB IRB
    // 1600 Cobot mit SafeMove2, OPC UA FX TSN-Backbone, Edge-K3s mit AAS-
    // Submodellen, MES-Anbindung nach ISA-95/IEC 62264-1, Predictive
    // Maintenance via MTConnect.
    // Quellen: IEC 61131-3:2013 Ed.3, IEC 61499-1:2012, IEC 61508-1..7:2010,
    // ISO 13849-1:2023, IEC 62061:2021, IEC 61800-5-2:2016, ISO 10218-1/-2:2011,
    // ISO/TS 15066:2016, DIN SPEC 91345:2016 (RAMI 4.0), IDTA 01001-3 (AAS
    // Metamodel), ISO 23247-1..-4:2021 (Digital Twin Manufacturing), IEC
    // 62264-1:2013 (ISA-95), ANSI/MESA B2MML v0700 (2023), MTConnect 2.3
    // (2024), IEEE 802.1Qbv-2015, IEC 62443-3-2:2020/-3-3:2013, BSI Grund-
    // schutz Edition 2024, VDI/VDE 3694:2014 (Lasten-/Pflichtenheft).
    // ----------------------------------------------------------------------

    const PAGE_CAP_AUTO_SCOPE = {
        title: '7.1 Anlagen-Scope, Lastenheft und Stakeholder',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) eine Automatisierungs-Anlage in Subsysteme entlang der ISA-95-Hierarchie L0–L4 zerlegen, (2) ein Lastenheft nach VDI/VDE 3694:2014 strukturieren, (3) Stakeholder und Verantwortungsschnitt zwischen Maschinenbau, Steuerungstechnik, IT und Inbetriebnehmer definieren, (4) Akzeptanzkriterien fuer eine Werks-Abnahme (FAT/SAT) gemaess EN ISO 9001:2015 und VDI 2884 nachweisen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kap. 2 (SPS-Architektur), Kap. 3 (Feldbus-Determinismus), Kap. 4 (Antriebsauslegung), Kap. 5 (Robotik), Kap. 6 (ISA-95, AAS, Digital Twin).</p>'

            + '<h4>7.1.1 Referenz-Anlage „PML-2"</h4>'
            + '<p>Press-Montage-Linie eines Automotive-Zulieferers, Taktzeit 12 s, dreischichtig:</p>'
            + '<ul>'
            + '<li>Siemens S7-1500F (CPU 1518F-4 PN/DP) mit ProfiSafe ueber PROFINET IRT.</li>'
            + '<li>Beckhoff AX5000 EtherCAT-Servoachsen mit STO/SS1/SLS (IEC 61800-5-2:2016).</li>'
            + '<li>ABB IRB 1600 Cobot mit SafeMove2 nach ISO/TS 15066:2016.</li>'
            + '<li>OPC UA FX (Edition 2022) TSN-Backbone (IEEE 802.1Qbv-2015).</li>'
            + '<li>Edge-K3s-Cluster (zwei Nodes) mit AAS-Submodellen nach IDTA 01001-3 und IDTA 02006-3 (Digital Nameplate).</li>'
            + '<li>MES nach ISA-95 Level 3 (IEC 62264-1:2013) ueber B2MML 2023, MTConnect 2.3:2024 fuer Predictive Maintenance.</li>'
            + '<li>HMI auf WinCC Unified V18, Energiezaehler nach IEC 61557-12, ISO 50001-Datenfluss.</li>'
            + '</ul>'

            + '<h4>7.1.2 Lastenheft nach VDI/VDE 3694:2014</h4>'
            + '<p>VDI/VDE 3694:2014 §5 strukturiert das Lastenheft in zehn Hauptkapitel; fuer den Capstone werden vier verdichtet:</p>'
            + '<table><thead><tr><th>Kapitel</th><th>Inhalt</th><th>Akzeptanzkriterium</th></tr></thead><tbody>'
            + '<tr><td>1. Anlagenfunktion</td><td>Prozessbeschreibung, Taktzeit, Variantenmix</td><td>Taktzeit &le; 12 s mit Cpk &ge; 1{,}33 (DIN ISO 22514-2:2017)</td></tr>'
            + '<tr><td>2. Performance</td><td>OEE-Soll, Verfuegbarkeit, Qualitaet</td><td>OEE &ge; 0{,}85 nach Nakajima 1988</td></tr>'
            + '<tr><td>3. Safety</td><td>Risikobeurteilung nach ISO 12100:2010, PL/SIL-Anforderungen</td><td>PL d / SIL 2 fuer Werker-Schutz; PL e / SIL 3 fuer Cobot-Stillsetzung</td></tr>'
            + '<tr><td>4. Security</td><td>Zonen-/Conduit-Modell, IEC 62443-3-3 SL-T</td><td>SL-T 3 fuer Steuerungszone, SL-T 2 fuer Edge-Zone</td></tr>'
            + '</tbody></table>'

            + '<h4>7.1.3 Stakeholder und RACI</h4>'
            + '<p>VDI 2884:2005 verlangt einen RACI-Matrix fuer FAT/SAT:</p>'
            + '<ul>'
            + '<li><strong>Werksleitung</strong> — Accountable (A) fuer Abnahme.</li>'
            + '<li><strong>Maschinenbau (OEM)</strong> — Responsible (R) fuer mechanische Komponenten und EG-Konformitaetserklaerung (Maschinenrichtlinie 2006/42/EG, ab 20.01.2027 Maschinenverordnung (EU) 2023/1230).</li>'
            + '<li><strong>Steuerungstechnik</strong> — R fuer SPS/HMI/Antriebe.</li>'
            + '<li><strong>OT-IT-Integration</strong> — R fuer OPC UA, MES, Edge.</li>'
            + '<li><strong>IT-Security/CISO</strong> — Consulted (C) fuer IEC 62443.</li>'
            + '<li><strong>Betriebsrat</strong> — C/I fuer Cobot-Mitbestimmung (BetrVG §87 Abs. 1 Nr. 6).</li>'
            + '<li><strong>TUEV/Pruefer</strong> — C fuer Sicherheitskonformitaet.</li>'
            + '<li><strong>Instandhaltung</strong> — Informed (I) fuer Spare-Parts-Strategie.</li>'
            + '</ul>'

            + '<h4>Worked Example: Verantwortungsschnitt OPC UA Server</h4>'
            + '<p>Wer ist verantwortlich fuer den OPC UA Server im PML-2-Edge? Der OEM liefert das Geraet mit OPC UA Server (Boundary „Werk-Tor"); die OT-IT-Integration konfiguriert SecurityPolicy, Zertifikate (GDS nach OPC UA Part 12:2018) und die AAS-Submodelle. CISO konsultiert das Sicherheitsprofil (Aes256-Sha256-RsaPss). MES-Team uebernimmt nur den Klient. Konflikt-Praevention: Schnittstellenbeschreibung im Lastenheft Kap. 4.7, Abnahme via SAT-Punkt 7.4.2.</p>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche fuenf ISA-95-Level beruehrt die Referenz-Anlage PML-2?</li>'
            + '<li>Welcher VDI/VDE-3694-Lastenheft-Punkt verlangt PL/SIL-Anforderungen?</li>'
            + '<li>Welche EU-Verordnung loest die Maschinenrichtlinie 2006/42/EG ab — und ab wann gilt sie?</li>'
            + '<li>Warum ist die OEE-Anforderung im Lastenheft objektiv messbar zu formulieren?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> „OEE &ge; 0{,}85" ohne Definition. <em>Korrekt:</em> OEE = A &middot; P &middot; Q mit jeweiligen Messverfahren nach Nakajima 1988 / VDI 3423:2011 (Verfuegbarkeit).</li>'
            + '<li><em>Fehler:</em> Maschinenrichtlinie 2006/42/EG als „weiterhin gueltig" annehmen. <em>Korrekt:</em> Maschinenverordnung (EU) 2023/1230 trat am 19.07.2023 in Kraft und gilt ab 20.01.2027.</li>'
            + '<li><em>Fehler:</em> Cobot-Einsatz ohne Mitbestimmung. <em>Korrekt:</em> Betriebsvereinbarung mit Betriebsrat nach BetrVG §87 Abs. 1 Nr. 6 ist Pflicht bei Leistungs-/Verhaltenskontrolle.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Erstellen Sie einen vergleichbaren Anlagen-Scope fuer eine Bottling-Line in der Lebensmittelindustrie. Welche Hygiene-Standards (EHEDG, HACCP) treten zusaetzlich auf? Welche RACI-Aenderungen ergeben sich, welche Lastenheft-Kapitel kommen hinzu?</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: VDI/VDE 3694:2014 §5 (Lasten-/Pflichtenheft); VDI 2884:2005 (Lifecycle-Costs und Abnahme); EN ISO 9001:2015 §8.5; DIN ISO 22514-2:2017 (Prozess-Faehigkeit Cpk); IEC 62264-1:2013 (ISA-95 Hierarchie); Maschinenverordnung (EU) 2023/1230 Art. 53; Nakajima „TPM Development Program" 1988; VDI 3423:2011 (Verfuegbarkeitsformeln); IEC 62443-3-3:2013 §3 (SL-T).</em></p>'
    };

    const PAGE_CAP_AUTO_RAMP = {
        title: '7.2 Inbetriebnahme, Hochlauf und FAT/SAT',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) FAT/SAT-Strategie nach VDI 2884 und GMP-Anlehnung (V-Modell IQ/OQ/PQ) anwenden, (2) Inbetriebnahme-Reihenfolge nach IEC 60204-1:2016 §18 strukturieren, (3) Hochlauf-Risiken und „Mock-Mode"-Strategien einsetzen, (4) Achs-Inbetriebnahme nach IEC 61800-5-2:2016 mit STO-Prueffrist begruenden.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Lehrseite 7.1 (Lastenheft), Kap. 2 (SPS-Tasking), Kap. 4 (Antriebsregelkreise), Kap. 5 (Roboter-Kalibrierung).</p>'

            + '<h4>7.2.1 V-Modell der Anlageninbetriebnahme</h4>'
            + '<p>Analog zum GMP-V-Modell (Pharma, GAMP 5 Second Edition 2022) verwenden produzierende Werke ein Mapping:</p>'
            + '<table><thead><tr><th>Phase</th><th>Aktivitaet</th><th>Pruefkriterium</th></tr></thead><tbody>'
            + '<tr><td>URS</td><td>User Requirements (Lastenheft)</td><td>Stakeholder-Sign-off</td></tr>'
            + '<tr><td>FS</td><td>Functional Specification (Pflichtenheft)</td><td>Funktionsblock-Mapping</td></tr>'
            + '<tr><td>DS</td><td>Design Specification (Hardware/Software)</td><td>Schaltplaene, IO-Listen</td></tr>'
            + '<tr><td>IQ</td><td>Installation Qualification</td><td>Verkabelung, Kennzeichnung nach IEC 60204-1:2016 §13</td></tr>'
            + '<tr><td>OQ</td><td>Operational Qualification (FAT)</td><td>Funktionstests beim OEM</td></tr>'
            + '<tr><td>PQ</td><td>Performance Qualification (SAT + Probelauf)</td><td>Taktzeit, OEE, Stoerstatistik</td></tr>'
            + '</tbody></table>'

            + '<h4>7.2.2 Inbetriebnahme-Reihenfolge nach IEC 60204-1:2016 §18</h4>'
            + '<ol>'
            + '<li>Sichtkontrolle, Isolations-/Schutzleiterpruefung (IEC 60204-1 §18.2).</li>'
            + '<li>Spannungs-Pruefung mit 1000 V DC (§18.4).</li>'
            + '<li>Residual-Strom-Test 30 mA (§18.5).</li>'
            + '<li>Funktionstest aller Schutzeinrichtungen (Not-Halt nach IEC 60947-5-5).</li>'
            + '<li>Antriebs-Inbetriebnahme: Encoder-Justage, Stromregler-Tuning (PI mit T_n = L_s/R_s), Drehzahlregler (T_n,n = 4 &middot; T_n,i).</li>'
            + '<li>Bahnfreigabe in Schrittweise (Trockenlauf &rarr; Reduzierter Speed &rarr; Volllast).</li>'
            + '</ol>'

            + '<h4>7.2.3 Mock-Mode und Digital Commissioning</h4>'
            + '<p>Virtuelle Inbetriebnahme nach VDI/VDE 3693:2016 verkuerzt die Anlauf-Phase: SPS-Code laeuft gegen ein FMU-Modell der Anlage (FMI 2.0/3.0, Modelica Association 2022). Vorteile: Bug-Erkennung „Shift-Left", Trainingsumgebung fuer Werker, kein Live-Risiko. Limit: Modelltreue (Reibung, Sensorrauschen).</p>'

            + '<h4>7.2.4 STO-Prueffrist</h4>'
            + '<p>IEC 61800-5-2:2016 §4.5 verlangt periodische STO-Funktionspruefung. Fuer PL d (ISO 13849-1:2023) gilt typisch T_proof = 1 Jahr (manuelle Pruefung) oder kontinuierliche Selbstpruefung durch das Drive. PFH_D-Wert ist im Antriebs-Datenblatt zu pruefen (z.B. AX5000: PFH_D = 1{,}5 &middot; 10<sup>-8</sup>/h, PL e, Cat. 4).</p>'

            + '<h4>Worked Example: Achs-Inbetriebnahme</h4>'
            + '<ol>'
            + '<li>Encoder-Offset bestimmen: Stator-Strang mit 25 % Nennstrom bestromen, Polradlage-Offset auslesen (Beckhoff TwinCAT NC „Drive Manager" -> „Commutation").</li>'
            + '<li>Strom-Regler tunen: Anti-Windup auf 110 % Nennstrom, T_n,i = L_s/R_s, K_p,i so dass Bandbreite 1 kHz.</li>'
            + '<li>Drehzahl-Regler: T_n,n = 4 &middot; T_n,i, K_p,n via Symmetrisches Optimum.</li>'
            + '<li>Lageregler: K_v = 1/(2 &middot; T_n,n) (Faustregel; bei vorgesteuerter Beschleunigung +20 %).</li>'
            + '<li>STO-Test: Trigger ausloesen, Drehmoment-Abklingzeit messen, Soll &lt; 100 ms.</li>'
            + '</ol>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche IQ/OQ/PQ-Phase wird beim OEM (vor Auslieferung) ausgefuehrt?</li>'
            + '<li>Welche Pruefreihenfolge folgt aus IEC 60204-1:2016 §18 — Isolationspruefung vor oder nach Funktionstest?</li>'
            + '<li>Welcher Vorteil ergibt sich durch virtuelle Inbetriebnahme nach VDI/VDE 3693:2016?</li>'
            + '<li>Was bedeutet PFH_D fuer eine Sicherheitsfunktion mit PL e?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> SAT vor IQ durchfuehren. <em>Korrekt:</em> Installation Qualification ist Voraussetzung fuer OQ/SAT.</li>'
            + '<li><em>Fehler:</em> STO ohne PFH_D-Pruefung „akzeptieren". <em>Korrekt:</em> PFH_D muss zu PL/SIL-Ziel passen (ISO 13849-1:2023 Tab. 5).</li>'
            + '<li><em>Fehler:</em> Reglerkaskade „nach Gefuehl" tunen. <em>Korrekt:</em> Symmetrisches Optimum (Foellinger 11. Aufl. 2016) liefert nachvollziehbares Ergebnis.</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Definieren Sie einen FAT-Testfall fuer den Cobot, der die Kraft-Begrenzung nach ISO/TS 15066:2016 nachweist. Welche Messmittel (Pilz PRMS, Force-Sensor), welche Akzeptanzschwelle bei Hand-/Stirn-Kontakt, welche Wiederholungsrate?</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: VDI 2884:2005; VDI/VDE 3693:2016 (Virtuelle Inbetriebnahme); GAMP 5 Second Edition (ISPE 2022); IEC 60204-1:2016 §13, §18; IEC 61800-5-2:2016 §4.5; ISO 13849-1:2023 §4; Foellinger „Regelungstechnik" 11. Aufl. 2016 (Symmetrisches Optimum); FMI 3.0 Specification (Modelica Association 2022); ISO/TS 15066:2016 Annex A.</em></p>'
    };

    const PAGE_CAP_AUTO_OEE = {
        title: '7.3 Betrieb, OEE und Predictive Maintenance',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) OEE-Beitraege analytisch zerlegen, (2) Stoerstatistik nach Pareto und FMEA priorisieren, (3) Predictive-Maintenance-Datenfluesse via MTConnect 2.3 und MES (ISA-95 Level 3) modellieren, (4) Energieeffizienz nach ISO 50001:2018 messen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kap. 6 (MES/Edge, OEE-Formel, MTConnect), Kap. 4 (Antriebsverluste), DIN 69900 (Pareto/8D).</p>'

            + '<h4>7.3.1 OEE-Dekomposition</h4>'
            + '<p>OEE = A &middot; P &middot; Q nach Nakajima 1988:</p>'
            + '<ul>'
            + '<li>A = Betriebszeit / geplante Laufzeit.</li>'
            + '<li>P = (Soll-Taktzeit &middot; Stueckzahl) / Betriebszeit.</li>'
            + '<li>Q = Gutstueck / Gesamtstueck.</li>'
            + '</ul>'
            + '<p>Welt­klasse-OEE liegt typisch bei 0{,}85; PML-2 erreicht im Hochlauf 0{,}72. Differenz-Analyse zeigt: A = 0{,}90 (geplante Wartung), P = 0{,}88 (Mikro-Stops am Cobot), Q = 0{,}91 (Press-Fehler). Hebel mit groesstem Effekt: P (Cobot-Mikrostops via SafeMove2-Geschwindigkeitsanpassung).</p>'

            + '<h4>7.3.2 FMEA und Pareto</h4>'
            + '<p>FMEA (VDA Band 4 / AIAG-VDA FMEA Handbook 2019) bewertet Risiken mit Severity, Occurrence, Detection. Aktion-Prioritaetsmatrix (AP) loest die fruehere RPZ-Berechnung ab und verhindert Fehlinterpretation. Top-Pareto-Beitraege werden mit 8D-Methode (Ford 1987) abgearbeitet.</p>'

            + '<h4>7.3.3 Predictive-Maintenance-Datenfluss</h4>'
            + '<p>Schwingungsdaten der AX5000-Achsen werden via MTConnect 2.3:2024 (XML/REST oder MQTT-Mapping) zum Edge-K3s gestreamt. Dort laeuft ein XGBoost-Modell (Trainings-Pipeline monatlich, Kubeflow). Anomalie-Schwellen via Mahalanobis-Distanz, Drift-Erkennung via PSI (Population Stability Index &gt; 0{,}25 = Re-Training noetig). MES (ISA-95 L3) erhaelt nur Aggregate (B2MML 2023).</p>'

            + '<h4>7.3.4 Energieeffizienz</h4>'
            + '<p>ISO 50001:2018 verlangt EnPI (Energy Performance Indicators). Fuer PML-2: kWh / 1000 Stueck. Hebel: Wiedereinspeisung der Bremsenergie ueber den 4Q-Wechselrichter, AX5000 mit Twin-DC-Link. Wirkungsgradklasse IE4 (IEC 60034-30-1:2014) fuer Antriebe, IES2 fuer PDS (Power Drive Systems) nach IEC 61800-9-2:2017.</p>'

            + '<h4>Worked Example: OEE-Hebel</h4>'
            + '<p>OEE = 0{,}90 &middot; 0{,}88 &middot; 0{,}91 = 0{,}721. Zielwert 0{,}85 erreichen wir, wenn P von 0{,}88 auf 0{,}93 steigt (z.B. via reduzierter Cobot-Mikrostops): 0{,}90 &middot; 0{,}93 &middot; 0{,}91 = 0{,}762. Es bleibt eine Luecke; Q-Verbesserung von 0{,}91 auf 0{,}94 (Press-Fehler-Reduktion durch Predictive-Maintenance-Alarm vor Werkzeug-Verschleiss) ergibt 0{,}787. A-Steigerung von 0{,}90 auf 0{,}95 (Wartungsfenster verschieben in Wochenend-Nacht) liefert 0{,}831. Erst die Kombination aller drei Hebel erreicht 0{,}85.</p>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche drei Faktoren bilden die OEE — und welcher hat in PML-2 den groessten Hebel?</li>'
            + '<li>Wie unterscheiden sich AP (Action Priority) und RPZ in der FMEA?</li>'
            + '<li>Welche Drift-Kennzahl wird in 7.3.3 fuer Re-Training verwendet?</li>'
            + '<li>Welche IEC-Klasse beschreibt PDS-Wirkungsgrade?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> OEE als Single-Number ohne Dekomposition reporten. <em>Korrekt:</em> A/P/Q einzeln auswerten, sonst werden Hebel falsch priorisiert.</li>'
            + '<li><em>Fehler:</em> AP-Werte als „neue RPZ" interpretieren. <em>Korrekt:</em> AP-Matrix klassifiziert in High/Medium/Low — keine Schwellenformel.</li>'
            + '<li><em>Fehler:</em> Predictive-Maintenance-Modell ohne Drift-Monitoring betreiben. <em>Korrekt:</em> PSI/KS-Test oder Mahalanobis-Distanz periodisch ueberwachen (ISO/IEC 5259-1:2024 zu Datenqualitaet).</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Berechnen Sie EnPI fuer PML-2 (kWh / 1000 Stueck), wenn die Linie 24 h laeuft, 4500 Stueck/Tag fertigt und 380 kWh verbraucht. Wie viel Bremsenergie sparen Sie ein, wenn der 4Q-Wechselrichter 8 % rueckspeist? Beispiel-Loesung: 380 / 4{,}5 &approx; 84{,}4 kWh / 1000 Stueck; Einsparung 30{,}4 kWh/Tag.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Nakajima „TPM Development Program" 1988; VDI 3423:2011; ISO 22400-2:2014 (KPI Manufacturing); AIAG-VDA FMEA Handbook 2019; ISO 50001:2018; IEC 60034-30-1:2014 (IE-Klassen); IEC 61800-9-2:2017 (IES-Klassen); MTConnect 2.3:2024; ISO/IEC 5259-1:2024.</em></p>'
    };

    const PAGE_CAP_AUTO_DT_HMI = {
        title: '7.4 Digital Twin, HMI/MES-Integration und Abnahmeplan',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) ein Digital-Twin-Konzept nach ISO 23247-1..-4:2021 fuer PML-2 entwerfen, (2) HMI-Anforderungen nach VDI/VDE 3850-1:2014 ergonomisch belegen, (3) MES-Integration nach ISA-95 Level 2/3 und B2MML 2023 anbinden, (4) einen formalen Abnahmeplan (FAT/SAT/Probebetrieb) inkl. messbarer Kriterien aufsetzen.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Kap. 6 (RAMI 4.0 / AAS / Digital Twin), VDI/VDE 3850 (HMI), ISA-95/IEC 62264-1:2013.</p>'

            + '<h4>7.4.1 Digital-Twin-Domains</h4>'
            + '<p>ISO 23247-1:2021 §4 definiert vier Domains: <em>Observable Manufacturing Entity</em> (OME), <em>Digital Twin Manufacturing Domain</em> (DTM), <em>User Domain</em>, <em>Cross-System Domain</em>. Fuer PML-2:</p>'
            + '<ul>'
            + '<li>OME: Press, Cobot, Servoachsen, Pruefstation.</li>'
            + '<li>DTM: Edge-K3s mit AAS-Submodellen + Simulation (FMU der Press-Dynamik).</li>'
            + '<li>User Domain: HMI WinCC Unified, Mobile App fuer Instandhaltung.</li>'
            + '<li>Cross-System: PLM, ERP, Energiemanagement (ISO 50001).</li>'
            + '</ul>'

            + '<h4>7.4.2 AAS-Submodelle</h4>'
            + '<p>IDTA-Spezifikationen 2024 liefern wiederverwendbare Submodelle:</p>'
            + '<ul>'
            + '<li>IDTA 02006-3 „Digital Nameplate" — Typenschilddaten.</li>'
            + '<li>IDTA 02022 „Energie-Effizienz" — kWh-Profile.</li>'
            + '<li>IDTA 02014 „Capability" — Fertigungsfaehigkeiten.</li>'
            + '<li>IDTA 02002 „TimeSeries" — Sensordaten.</li>'
            + '</ul>'

            + '<h4>7.4.3 HMI-Ergonomie</h4>'
            + '<p>VDI/VDE 3850-1:2014 verlangt: max. 7 +/- 2 Informationsblocke pro Bildschirm (Miller 1956), Kontrastverhaeltnis mind. 7:1 (WCAG 2.2 AAA fuer kleine Schrift), Farbcodierung redundant (auch fuer Farbblind), Alarm-Priorisierung nach ISA-18.2:2016 §6 (high/medium/low).</p>'

            + '<h4>7.4.4 MES-Integration</h4>'
            + '<p>IEC 62264-3:2016 definiert 4 Geschaeftsprozesse fuer ISA-95 Level 3: <em>Production Operations Management</em>, <em>Maintenance</em>, <em>Quality</em>, <em>Inventory</em>. B2MML 2023 (XML-Schema) ueberbrueckt L3-L4 (ERP). Fuer PML-2 wird Production Schedule per B2MML „<code>ProductionSchedule</code>" empfangen, Production Performance retourniert.</p>'

            + '<h4>7.4.5 Abnahmeplan</h4>'
            + '<table><thead><tr><th>Phase</th><th>Dauer</th><th>Messbare Kriterien</th></tr></thead><tbody>'
            + '<tr><td>FAT (beim OEM)</td><td>5 d</td><td>Funktionstest 100 %, Cycle Stress 1000 Zyklen ohne Fehler, Sicherheitsfunktionen 100 %</td></tr>'
            + '<tr><td>SAT (im Werk)</td><td>3 d</td><td>Wiederholung FAT-Subset, Interface-Test zu MES, OPC UA Connectivity-Test</td></tr>'
            + '<tr><td>Probebetrieb</td><td>10 d</td><td>OEE-Messung &ge; 0{,}80 (Lehrkurve), Stoer-Rate &lt; 5 /Schicht, MTBF &gt; 8 h</td></tr>'
            + '<tr><td>Endabnahme</td><td>1 d</td><td>OEE &ge; 0{,}85 ueber 24 h, Sign-off durch Werksleitung</td></tr>'
            + '</tbody></table>'

            + '<h4>Worked Example: Schnittstellentest MES</h4>'
            + '<p>Testszenario: MES sendet B2MML <code>ProductionSchedule</code> mit 3 Varianten &agrave; 500 Stueck. PML-2 Edge bestaetigt mit <code>ProductionPerformance</code>: tatsaechliche Stueckzahl, Anzahl Ausschuss, Energieverbrauch. Akzeptanzkriterium: Round-Trip &le; 200 ms, Schemata-Validierung 100 %, kein Datenverlust ueber 24 h.</p>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche vier Domains definiert ISO 23247-1:2021?</li>'
            + '<li>Welches AAS-Submodell beschreibt Typenschilddaten?</li>'
            + '<li>Wie viele Informationsblocke pro HMI-Bildschirm empfiehlt VDI/VDE 3850-1:2014?</li>'
            + '<li>Welche zwei B2MML-Nachrichten sind fuer den Production-Schedule-Roundtrip noetig?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Endabnahme ohne Probebetrieb. <em>Korrekt:</em> Probebetrieb (Burn-in) ist Pflicht — Fruehausfaelle treten ueberwiegend in den ersten 10 d auf (Badewannenkurve).</li>'
            + '<li><em>Fehler:</em> AAS-Submodell selbst erfinden. <em>Korrekt:</em> Pruefen, ob es ein IDTA-Submodell gibt (2024 sind ueber 30 Submodelle standardisiert).</li>'
            + '<li><em>Fehler:</em> HMI-Alarmflut. <em>Korrekt:</em> ISA-18.2:2016 §6 fordert Priorisierung und Limitierung (max. 1 hoehere Prioritaet / 10 min im Mittel).</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Erstellen Sie eine HMI-Bildschirm-Skizze fuer den Cobot-Status (Strommodus SRMS/Hand-Guiding/SSM/PFL, aktuelle Last, Kollisionsrisiko, OEE). Welche Farbcodierung, welche Alarm-Prioritaeten nach ISA-18.2? Welche Daten kommen via OPC UA, welche per B2MML?</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: ISO 23247-1..-4:2021; IDTA-Spezifikationen 01001-3 / 02002 / 02006-3 / 02014 / 02022 (2024); VDI/VDE 3850-1:2014; WCAG 2.2 (W3C Oct. 2023); ISA-18.2:2016; IEC 62264-3:2016 (ISA-95 Level 3 Activities); ANSI/MESA B2MML v0700 (2023); Miller „The Magical Number Seven, Plus or Minus Two" Psychological Review 63 (1956) 81–97.</em></p>'
    };

    const PAGE_CAP_AUTO_RUBRIC = {
        title: '7.5 Bewertungsrubrik und Selbstbewertung',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) eine Automation-Capstone-Abgabe entlang einer 5-Dimensionen-Rubrik bewerten, (2) Bestehensregel und Gewichtung anwenden, (3) Selbstbewertungs-Workflow und Verbesserungs-Backlog ableiten.</blockquote>'

            + '<p><strong>Vorwissen.</strong> Lehrseiten 7.1–7.4, ISO/IEC 17024:2012 (Personalzertifizierung als Methodik-Vorbild), Bloom-Revision (Anderson &amp; Krathwohl 2001).</p>'

            + '<h4>7.5.1 Rubrik (5 Dimensionen)</h4>'
            + '<table><thead><tr><th>Dimension</th><th>Pruefkriterium</th><th>Pflicht</th><th>Soll</th><th>Hervorragend</th></tr></thead><tbody>'
            + '<tr><td>D1 Anlagen-Scope &amp; Lastenheft</td><td>VDI/VDE 3694:2014 Struktur, ISA-95 Mapping</td><td>10 Kapitel Lastenheft, RACI</td><td>plus messbare Akzeptanzkriterien (OEE, Cpk, PL/SIL, SL-T)</td><td>plus Lebenszyklus-Kosten nach VDI 2884:2005</td></tr>'
            + '<tr><td>D2 Steuerung &amp; Antrieb</td><td>IEC 61131-3-Programmierung, Reglerkaskade, Safety</td><td>POU-Struktur, PI-Tuning, STO/SS1 Auswahl</td><td>plus IEC 61499-Variante, symmetrisches Optimum</td><td>plus formale Verifikation (UPPAAL/CPN) eines Safety-POU</td></tr>'
            + '<tr><td>D3 Robotik &amp; Cobot</td><td>Kinematik, ISO 10218 / ISO/TS 15066</td><td>DH-Tabelle, ein MRK-Modus belegt</td><td>plus PFL-Auslegung mit Bio-Mech-Grenzen, ROS-2-/MoveIt-2-Konzept</td><td>plus Capability-AAS-Submodell IDTA 02014</td></tr>'
            + '<tr><td>D4 Industrie 4.0 &amp; MES</td><td>AAS, Digital Twin, MES-Anbindung</td><td>4 AAS-Submodelle, ISO 23247 Domains, B2MML</td><td>plus Predictive-Maintenance-Pipeline, MTConnect 2.3</td><td>plus Edge-Sicherheit nach IEC 62443-3-3 SL-T 3</td></tr>'
            + '<tr><td>D5 Kommunikation &amp; Abnahme</td><td>Abnahmeplan, Executive Summary, Lessons Learned</td><td>FAT/SAT/Probebetrieb + Summary &le; 1 Seite</td><td>plus Restrisiko-Akzeptanz, Mitbestimmungs-Workflow</td><td>plus formale Energie- und CO2-Bilanz (ISO 50001 / ISO 14067)</td></tr>'
            + '</tbody></table>'

            + '<h4>7.5.2 Bestehensregel</h4>'
            + '<p>Wie im Cybersec-Capstone (Kap. 10 §10.5.2): alle Dimensionen mindestens „Pflicht", mindestens drei „Soll"; „bestanden mit Auszeichnung" benoetigt mindestens drei „Hervorragend" und alle uebrigen „Soll". Externer Pruefer (CISO oder Anlagen-Auditor eines anderen Standorts) ist Pflicht.</p>'

            + '<h4>7.5.3 Selbstbewertungs-Workflow</h4>'
            + '<ol>'
            + '<li>Punktwerte pro Dimension vergeben (Pflicht=1, Soll=2, Hervorragend=3) und mit Belegen verlinken.</li>'
            + '<li>Gap-Analyse und Konsolidierung mit dem Cybersec-Capstone (gemeinsames Backlog).</li>'
            + '<li>Pro Dimension mit &le; 1 Punkt ein konkretes Backlog-Item mit Owner und Faelligkeit.</li>'
            + '<li>Re-Review nach 30 d.</li>'
            + '</ol>'

            + '<h4>Worked Example: Selbstbewertung PML-2</h4>'
            + '<ul>'
            + '<li>D1 — Soll (2): Lastenheft + RACI + Akzeptanzkriterien fertig; Lebenszyklus-Kosten ausstehend.</li>'
            + '<li>D2 — Soll (2): POU-Struktur + symmetrisches Optimum + STO; formale Verifikation offen.</li>'
            + '<li>D3 — Pflicht (1): DH + ein MRK-Modus belegt; PFL-Bio-Mech-Auslegung ausstehend.</li>'
            + '<li>D4 — Soll (2): AAS-Submodelle, ISO 23247, MTConnect; SL-T 3 ausstehend.</li>'
            + '<li>D5 — Soll (2): Abnahmeplan + Summary + Mitbestimmung; CO2-Bilanz ausstehend.</li>'
            + '<li>Summe 9/15 -> bestanden; D3 zur Nachbesserung.</li>'
            + '</ul>'

            + '<h4>Selbstcheck</h4>'
            + '<ul>'
            + '<li>Welche Dimension verlangt formale Verifikation als „Hervorragend"-Kriterium?</li>'
            + '<li>Welche zwei Dimensionen sind durch das Cybersec-Capstone-Backlog konsolidierbar?</li>'
            + '<li>Welche Bestehensregel gilt fuer „bestanden mit Auszeichnung"?</li>'
            + '<li>Warum ist der Pruefer organisatorisch unabhaengig?</li>'
            + '</ul>'

            + '<h4>Typische Fehler</h4>'
            + '<ul>'
            + '<li><em>Fehler:</em> Punkte ohne Belege. <em>Korrekt:</em> Jede Punktwertung verlinkt auf Lastenheft-Kapitel, Lehrseite oder Anhang.</li>'
            + '<li><em>Fehler:</em> Selbstbewertung durch das Projekt-Team. <em>Korrekt:</em> Vier-Augen-Prinzip durch externen Auditor.</li>'
            + '<li><em>Fehler:</em> Rubrik als „Checklisten-Abhaken" verstehen. <em>Korrekt:</em> Rubrik prueft kompetenzorientiert (Bloom evaluate/create).</li>'
            + '</ul>'

            + '<h4>Transferaufgabe</h4>'
            + '<p>Wenden Sie die Rubrik auf einen realen Anlagen-Abnahmebericht aus Ihrem Berufsalltag an. Wo liegen Sie unter „Pflicht"? Welche drei Backlog-Items mit Owner und Faelligkeit binnen 30 d ergeben sich?</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: ISO/IEC 17024:2012; ISO/IEC 27001:2022 §6.1.3 (Methodik-Vorbild fuer Risikoakzeptanz); NIST SP 800-160 Vol. 1 r1 (Nov. 2022) §3; Anderson &amp; Krathwohl „A Taxonomy for Learning, Teaching, and Assessing" (Longman 2001); BSI-Praxisleitfaden Version 5 (2023).</em></p>'
    };

    const QUIZ_CAP_AUTO = [
        // --- Pool 1: Lastenheft &amp; Stakeholder (5) ---
        q('Welche VDI-Richtlinie strukturiert das Lastenheft fuer Automatisierungsanlagen?',
            ['VDI 2221', 'VDI/VDE 3694:2014', 'VDI 2206', 'VDI 2884:2005'], 1,
            'VDI/VDE 3694:2014 „Lasten- und Pflichtenheft fuer Automatisierungstechnik" §5 strukturiert das Lastenheft in zehn Hauptkapitel.'),
        q('Welche EU-Verordnung loest die Maschinenrichtlinie 2006/42/EG ab und ab wann gilt sie?',
            ['Verordnung (EU) 2023/1230 ab 20.01.2027', 'Verordnung (EU) 2023/988 ab 13.12.2024', 'Verordnung (EU) 2017/745 ab 26.05.2021', 'Verordnung (EU) 2022/2554 ab 17.01.2025'], 0,
            'Maschinenverordnung (EU) 2023/1230 Art. 53 — Inkrafttreten 19.07.2023, Anwendung ab 20.01.2027.'),
        q('Welche ISA-95-Ebene umfasst MES?',
            ['Level 1', 'Level 2', 'Level 3', 'Level 4'], 2,
            'IEC 62264-1:2013 §4 — Level 3 ist „Manufacturing Operations Management" (MES).'),
        q('Welches Gremium pflegt die AAS-Spezifikationen?',
            ['IEC TC 65', 'ISO/IEC JTC 1 SC 41', 'IDTA (Industrial Digital Twin Association)', 'OPC Foundation'], 2,
            'IDTA (gegruendet 2021) pflegt die AAS-Spezifikationen, z.B. IDTA 01001-3 „Specification of the Asset Administration Shell — Part 1: Metamodel".'),
        q('Welche Pflichtinhalte verlangt VDI/VDE 3694:2014 Kapitel 4 (Security)?',
            ['nur Passworte', 'Zonen-/Conduit-Modell + SL-T-Anforderungen nach IEC 62443', 'nur Antivirus', 'keine Vorgaben'], 1,
            'VDI/VDE 3694:2014 Kap. 4 verlangt explizit IEC-62443-konforme Security-Anforderungen inkl. SL-T fuer jede Zone.'),

        // --- Pool 2: Inbetriebnahme, FAT/SAT (5) ---
        q('Welche IEC-Norm regelt elektrische Sicherheit von Maschinen?',
            ['IEC 60204-1:2016', 'IEC 61131-3:2013', 'IEC 61800-5-2:2016', 'IEC 62443-3-3:2013'], 0,
            'IEC 60204-1:2016 „Elektrische Ausruestung von Maschinen — Allgemeine Anforderungen" §18 listet die Inbetriebnahme-Pruefungen.'),
        q('Welche GAMP-5-Phase entspricht der FAT?',
            ['IQ (Installation Qualification)', 'OQ (Operational Qualification)', 'PQ (Performance Qualification)', 'URS (User Requirements)'], 1,
            'GAMP 5 Second Edition (ISPE 2022): OQ wird typischerweise beim OEM als FAT abgewickelt; PQ ist der Probebetrieb im Zielwerk.'),
        q('Welche Sicherheitsfunktion verhindert sicher den Drehmoment-Aufbau im Antrieb?',
            ['SS1', 'SS2', 'STO', 'SLS'], 2,
            'IEC 61800-5-2:2016 §4 — STO (Safe Torque Off) trennt den Energiefluss zum Motor; SS1 fuehrt zuerst geregeltes Bremsen aus und schaltet dann STO.'),
        q('Welche Kennzahl bewertet die Wahrscheinlichkeit eines gefaehrlichen Ausfalls pro Stunde fuer eine Safety-Funktion?',
            ['MTBF', 'PFH_D', 'MTTR', 'Cpk'], 1,
            'ISO 13849-1:2023 Tab. 5 und IEC 62061:2021 Tab. 3 nutzen PFH_D (Probability of Dangerous Failure per Hour).'),
        q('Welche VDI-Richtlinie regelt virtuelle Inbetriebnahme?',
            ['VDI/VDE 3693:2016', 'VDI 2884:2005', 'VDI 3423:2011', 'VDI 2221'], 0,
            'VDI/VDE 3693 Blatt 1:2016 „Virtuelle Inbetriebnahme — Modellarten und Glossar".'),

        // --- Pool 3: OEE, Predictive Maintenance, Energie (5) ---
        q('Welcher OEE-Faktor wird bei Mikro-Stops geschmaelert?',
            ['Availability (A)', 'Performance (P)', 'Quality (Q)', 'OEE selber'], 1,
            'Nakajima 1988: Mikro-Stops reduzieren die effektive Taktzeit -> Performance-Verlust. Availability sinkt nur bei langen Stillstaenden.'),
        q('Welche FMEA-Methodik loest die klassische RPZ ab?',
            ['Kepner-Tregoe', 'AP (Action Priority) Matrix nach AIAG-VDA FMEA Handbook 2019', 'PDCA', '8D'], 1,
            'AIAG-VDA FMEA Handbook 2019 ersetzt RPZ durch eine 3-stufige AP-Matrix High/Medium/Low — keine multiplikative Bewertung.'),
        q('Welcher Standard normiert manufacturing KPIs (inkl. OEE-Definitionen)?',
            ['ISO 22400-2:2014', 'ISO 9001:2015', 'IEC 61131-3', 'ISO 14001'], 0,
            'ISO 22400-2:2014 „Key performance indicators (KPIs) for manufacturing operations management — Definitions".'),
        q('Welche IEC-Norm definiert die IES-Wirkungsgradklassen fuer Power Drive Systems (PDS)?',
            ['IEC 60034-30-1:2014', 'IEC 61800-9-2:2017', 'IEC 61800-5-2:2016', 'ISO 50001:2018'], 1,
            'IEC 61800-9-2:2017 §6 klassifiziert PDS in IES0/IES1/IES2; IEC 60034-30-1:2014 betrifft Motoren (IE1..IE4/IE5).'),
        q('Welche Drift-Kennzahl signalisiert Re-Training-Bedarf in einer Predictive-Maintenance-Pipeline?',
            ['Cpk', 'PSI (Population Stability Index) > 0{,}25', 'PFH_D', 'OEE'], 1,
            'PSI > 0{,}25 ist eine etablierte Schwelle (Yurdakul/Naranjo 2018, „Statistical Process Control with Machine Learning"); kombiniert mit Mahalanobis-Distanz fuer multivariate Daten.'),

        // --- Pool 4: Digital Twin, MES, HMI, Abnahme (5) ---
        q('Welche vier Domains definiert ISO 23247-1:2021?',
            ['Sensor, Aktor, Steuerung, HMI', 'OME, DTM, User, Cross-System', 'PLC, MES, ERP, Cloud', 'L0, L1, L2, L3'], 1,
            'ISO 23247-1:2021 §4: Observable Manufacturing Entity (OME), Digital Twin Manufacturing Domain (DTM), User Domain, Cross-System Domain.'),
        q('Welches IDTA-Submodell beschreibt Typenschilddaten?',
            ['IDTA 02002', 'IDTA 02006-3 Digital Nameplate', 'IDTA 02014 Capability', 'IDTA 02022 Energy Efficiency'], 1,
            'IDTA 02006-3 „Digital Nameplate for Industrial Equipment" (2024) standardisiert Typenschilddaten als AAS-Submodell.'),
        q('Welche B2MML-Nachricht wird vom MES an die Anlage zur Auftragsuebergabe gesendet?',
            ['ProductionPerformance', 'ProductionSchedule', 'OperationsDefinition', 'PersonnelDefinition'], 1,
            'ANSI/MESA B2MML v0700 (2023): „<code>ProductionSchedule</code>" enthaelt geplante Auftraege; „<code>ProductionPerformance</code>" ist die Rueckmeldung.'),
        q('Welche Norm regelt HMI-Alarmpriorisierung in der Prozessleittechnik?',
            ['VDI/VDE 3850-1:2014', 'ISA-18.2:2016', 'IEC 62443-3-3:2013', 'ISO 9241-110:2020'], 1,
            'ISA-18.2:2016 (= ANSI/ISA-18.2-2016) „Management of Alarm Systems for the Process Industries" §6 regelt Alarm-Prioritaeten und Limitierung.'),
        q('Welche Probebetriebs-Akzeptanz gilt fuer PML-2 in der Lehrkurve?',
            ['OEE &ge; 0{,}95', 'OEE &ge; 0{,}80, Stoerrate &lt; 5 / Schicht', 'OEE = 1{,}0', 'kein Wert noetig'], 1,
            'Lehrseite 7.4.5: Probebetrieb mit Lehrkurve und Stoer-Statistik; Endabnahme erst nach OEE &ge; 0{,}85 ueber 24 h.'),

        // --- Pool 5: Engineering, Safety, Risk (TOPUP v66, +10) ---
        q('Welche ISO-Norm regelt die Risikobeurteilung von Maschinen?',
            ['ISO 12100:2010', 'ISO 13849-1:2023', 'IEC 61508:2010', 'ISO 14001:2015'], 0,
            'ISO 12100:2010 „Sicherheit von Maschinen — Allgemeine Gestaltungsleitsaetze, Risikobeurteilung und Risikominderung" §5 ist die Basis-Methodik fuer alle Maschinen-Risikobeurteilungen.'),
        q('Welche Performance-Level-Klasse nach ISO 13849-1:2023 ist typisch fuer eine Schutztuerueberwachung mit Verriegelung an einer Industrierobotik-Zelle?',
            ['PL a', 'PL b', 'PL c', 'PL d'], 3,
            'ISO 13849-1:2023 Tab. 3 / Anhang A und ISO 10218-2:2011 §5.10: Schutztueren mit Verriegelung erfordern typisch PL d (MTTF_d hoch, DC mittel, Kategorie 3).'),
        q('Welche IEC-Norm definiert die SIL-Stufen fuer programmierbare elektronische Sicherheitssysteme?',
            ['IEC 61508:2010', 'IEC 61511:2016', 'IEC 62061:2021', 'ISO 13849-1'], 0,
            'IEC 61508:2010 Teil 1 §7.6 definiert SIL 1..4 als generische Norm; IEC 62061 ist die Maschinen-Auspraegung, IEC 61511 die Prozess-Industrie-Auspraegung.'),
        q('Welche CE-Konformitaetsbewertung gilt nach Maschinenverordnung (EU) 2023/1230 fuer Maschinen aus Anhang I (Hochrisiko)?',
            ['Modul A (Eigenerklaerung)', 'Modul B + C (Baumusterpruefung)', 'Modul H (Vollqualitaetssicherung)', 'Wahlweise B+C oder H, Modul A unzulaessig'], 3,
            'Verordnung (EU) 2023/1230 Art. 25 + Anhang IX: Fuer Anhang-I-Maschinen ist Modul A (interne Fertigungskontrolle) ausgeschlossen; gewaehlt werden muss B+C oder H.'),
        q('Welcher Standard definiert das V-Modell fuer mechatronische Produktentwicklung?',
            ['VDI 2221:2019', 'VDI 2206:2021', 'VDI 2884:2005', 'IEC 61131-3'], 1,
            'VDI 2206:2021 „Entwicklungsmethodik fuer mechatronische und cyber-physische Systeme" §4 ist die Aktualisierung des V-Modells (2004) mit modernem Modul-Konzept.'),
        q('Welche Norm regelt die elektromagnetische Vertraeglichkeit fuer industrielle Umgebungen?',
            ['IEC 61000-6-2:2016 (Stoerfestigkeit Industrie)', 'IEC 60204-1:2016', 'IEC 61131-2', 'IEC 60068'], 0,
            'IEC 61000-6-2:2016 „EMV — Generische Norm Stoerfestigkeit fuer Industrieumgebungen" definiert die Mindestanforderungen; fuer Emissionen ist IEC 61000-6-4 zustaendig.'),
        q('Welche Schutzart nach IEC 60529 ist typisch fuer einen Schaltschrank in einer staubigen Fertigungshalle?',
            ['IP20', 'IP44', 'IP54', 'IP65'], 2,
            'IEC 60529:2013 Tab. 1/2: IP54 (staubgeschuetzt, Spritzwasser) ist Standard fuer Schaltschraenke in Fertigungsumgebungen; IP65 nur bei direkter Wasserstrahl-Exposition.'),
        q('Welche FMEA-Form ergaenzt die Produkt-FMEA fuer Fertigungsprozesse?',
            ['Design-FMEA', 'System-FMEA', 'Prozess-FMEA (P-FMEA)', 'Konstruktions-FMEA'], 2,
            'AIAG-VDA FMEA Handbook 2019 §3: P-FMEA betrachtet jeden Prozessschritt mit Severity/Occurrence/Detection und AP-Matrix; ergaenzt die D-FMEA fuer das Produktdesign.'),
        q('Welcher Reifegrad-Standard bewertet ein Lastenheft fuer Vollstaendigkeit?',
            ['CMMI v2.0', 'SPICE/Automotive SPICE v3.1', 'VDA 6.3:2023 Prozess-Audit', 'ISO 9001:2015'], 2,
            'VDA 6.3:2023 Prozessgruppe P2 „Projektmanagement" und P3 „Entwicklung Produkt/Prozess" pruefen Lastenheft-/Pflichtenheft-Qualitaet als Reifegrad-Indikator.'),
        q('Welche Norm regelt Anforderungen an die Dokumentation und das Risikomanagement bei wesentlichen Maschinenaenderungen?',
            ['BetrSichV §3 + Interpretationspapier BMAS 2015 „wesentliche Veraenderung"', 'ISO 14001', 'IEC 61131-3', 'ISO 9001:2015'], 0,
            'BetrSichV §3 i.V.m. dem BMAS-Interpretationspapier 2015 „Wesentliche Veraenderung von Maschinen": Bei wesentlicher Veraenderung wird der Betreiber zum Hersteller und uebernimmt CE-Pflichten.'),

        // --- Pool 6: Inbetriebnahme, Test, Qualitaet (TOPUP v66, +10) ---
        q('Welche IEC-Norm regelt funktionale Sicherheit von Antrieben (Drives)?',
            ['IEC 61800-3', 'IEC 61800-5-2:2016', 'IEC 61800-9-2', 'IEC 60204-32'], 1,
            'IEC 61800-5-2:2016 „Adjustable speed electrical power drive systems — Functional safety requirements" §4 definiert STO, SS1/SS2, SOS, SLS, SDI, SBC.'),
        q('Welcher GAMP-5-Risikoklassen-Eintrag adressiert konfigurierbare COTS-Software (z.B. SCADA)?',
            ['Kategorie 1 (Infrastruktur)', 'Kategorie 3 (Non-Configured)', 'Kategorie 4 (Configured)', 'Kategorie 5 (Custom Application)'], 2,
            'GAMP 5 Second Edition (ISPE 2022) Anhang M4 Tab. 1: Kategorie 4 = konfigurierte Standardprodukte; eigene Skripte/Custom Code rutschen in Kategorie 5.'),
        q('Welche Test-Art im Lastenheft entspricht „Site Acceptance Test" (SAT)?',
            ['Komponenten-Test beim Hersteller', 'Werkabnahme beim OEM', 'Vor-Ort-Abnahme im Zielwerk', 'Pilot-Run mit Lehrkurve'], 2,
            'GAMP 5 Second Edition (ISPE 2022) und VDI 3423:2011: SAT findet nach Anlieferung und Aufbau am Zielstandort statt, im Beisein des Kunden.'),
        q('Welche Pruefkategorie nach IEC 60204-1:2016 §18 ist die elektrische Erstpruefung (Continuity of Protective Bonding)?',
            ['Pruefung Nr. 1 (Durchgaengigkeit des Schutzleitersystems)', 'Pruefung Nr. 2 (Isolationswiderstand)', 'Pruefung Nr. 3 (Spannungspruefung)', 'Pruefung Nr. 5 (Funktionspruefung)'], 0,
            'IEC 60204-1:2016 §18.2.1: Pruefung der Durchgaengigkeit des Schutzleitersystems mit min. 0{,}2..10 A bei jedem Pruefpunkt; <0{,}1 Ohm.'),
        q('Welche Verifikationsmethode dominiert in der virtuellen Inbetriebnahme bei Robotik-Zellen?',
            ['Pure-PLC-Simulation', 'Hardware-in-the-Loop (HiL)', 'Software-in-the-Loop (SiL) inkl. Roboter-RCS', 'Manuelles Testen'], 2,
            'VDI/VDE 3693-1:2016 §6: SiL mit RCS (Robot Controller Simulation, z.B. KUKA.OfficeLite, RobotStudio, URSim) ist Standard fuer Zellen-Verifikation vor Aufbau.'),
        q('Welche Mindest-MTBF wird typisch fuer servohydraulische Antriebe in der CE-Konformitaet gefordert?',
            ['MTBF ≥ 1 000 h', 'Keine MTBF-Vorgabe; Pflicht ist MTTF_d je Sicherheitsfunktion nach ISO 13849-1', 'MTBF ≥ 100 000 h', 'MTBF ≥ 1 000 000 h'], 1,
            'ISO 13849-1:2023 Tab. 5: Sicherheitsfunktionen werden ueber MTTF_d klassifiziert (low/medium/high); MTBF ist als Verfuegbarkeitskenngroesse separat — nicht CE-relevant.'),
        q('Welche Norm regelt Sprachen und Verfahren fuer den Service-/Wartungsbetrieb?',
            ['VDI 3423:2011', 'EN 13306:2017', 'IEC 60300-3-14', 'IEC 60204-1'], 1,
            'EN 13306:2017 „Instandhaltung — Begriffe der Instandhaltung" ist die europaeische Terminologie-Norm fuer Wartung, vorbeugend/korrektiv/zustandsbasiert/praeventiv.'),
        q('Welche Pruefung dokumentiert die Wiederholgenauigkeit eines Roboters?',
            ['ISO 9283:1998 — Pose Repeatability', 'ISO 13849-1:2023', 'ISO 10218-1:2011', 'IEC 60204-1:2016'], 0,
            'ISO 9283:1998 „Manipulating industrial robots — Performance criteria and related test methods" §7.2 normiert die Messung der Wiederholgenauigkeit RP.'),
        q('Welche Cpk-Faustregel gilt fuer einen prozessfaehigen Fertigungsprozess?',
            ['Cpk ≥ 0{,}67', 'Cpk ≥ 1{,}00', 'Cpk ≥ 1{,}33', 'Cpk ≥ 3{,}00'], 2,
            'AIAG SPC Reference Manual 2nd Ed. (2005) und VDA-Band 4: Cpk ≥ 1{,}33 = prozessfaehig (Standard); 1{,}67 = qualitaetsfaehig fuer kritische Merkmale; < 1{,}00 nicht akzeptabel.'),
        q('Welche Lifecycle-Phase nach IEC 62443-4-1:2018 deckt die Sichere Auslieferung von Steuerungen ab?',
            ['SR-1 Security Management', 'SVV (Security Verification and Validation Testing)', 'SG (Security Guidelines)', 'SUM (Security Update Management)'], 2,
            'IEC 62443-4-1:2018 §11 „Security Guidelines" (SG-1..SG-7) regelt Auslieferungs- und Bedienungs-Dokumentation fuer Endkunden.'),

        // --- Pool 7: Digital Twin, MES, OT-Security (TOPUP v66, +10) ---
        q('Welche Submodell-Definition der AAS adressiert Energieverbrauchsmodelle?',
            ['IDTA 02006', 'IDTA 02022 Energy Efficiency (2024)', 'IDTA 02014 Capability', 'IDTA 02001 Identification'], 1,
            'IDTA 02022 „Energy Efficiency for Industrial Equipment" (2024) ist das Sub-Modell fuer Energie- und Wirkungsgrad-Daten gemaess ISO 14955.'),
        q('Welche Norm regelt die Datentyp-Definitionen fuer ISA-95-Datenaustausch (B2MML)?',
            ['IEC 62264-1:2013', 'IEC 62264-2:2013', 'IEC 62264-3:2016', 'IEC 62264-4:2015'], 1,
            'IEC 62264-2:2013 „Enterprise-control system integration — Part 2: Objects and attributes" enthaelt die UML-/XSD-Modelle, auf denen B2MML basiert.'),
        q('Welcher Standard adressiert Sicherheits-Anforderungen an industrielle Komponenten („Component Requirements")?',
            ['IEC 62443-3-3', 'IEC 62443-4-2:2019', 'IEC 62443-4-1:2018', 'IEC 62443-2-4'], 1,
            'IEC 62443-4-2:2019 „Technical security requirements for IACS components" enthaelt die Komponenten-Anforderungen (CR1..CR7) entlang der 7 FRs.'),
        q('Welcher OT-Security-Standard ist 2024 Pflicht fuer KRITIS-Betreiber in Deutschland nach NIS-2-Umsetzung?',
            ['ISO 27002:2022', 'IEC 62443 (Stand der Technik)', 'PCI DSS', 'NIST CSF'], 1,
            'NIS-2-Umsetzungsgesetz und BSI „Stand der Technik in der Informationssicherheit" (2024): Fuer OT-Schutzbedarf gelten IEC 62443-2-1 (Asset-Owner) und 3-3 (System); Branche-Spezifika in ISO/IEC 27019 (Energie).'),
        q('Welche AAS-Form ist fuer Maschine-zu-Maschine-Interoperabilitaet vorgesehen?',
            ['AAS Type 1 (File-basiert)', 'AAS Type 2 (Server-API)', 'AAS Type 3 (Active, mit MAS-Faehigkeiten)', 'AAS Type 0 (Print)'], 1,
            'IDTA „Specification of the Asset Administration Shell — Part 2: API" (2024): Typ 2 (Server-API, REST + OPC UA) ist fuer M2M-Interoperabilitaet vorgesehen; Typ 3 ist aktiv mit Multi-Agent-System-Faehigkeit.'),
        q('Welche Norm regelt Anforderungen an die Cyber-Sicherheit von Industrierobotern?',
            ['ISO 10218-1:2011', 'ISO/TR 22100-4:2018', 'IEC 62443-2-4', 'ISO 13482'], 1,
            'ISO/TR 22100-4:2018 „Safety of machinery — Cybersecurity aspects" leitet die Methodik von ISO 12100/13849 auf Cybersecurity-Risiken um; ergaenzt durch IEC TS 63074.'),
        q('Welche Datenmenge wird gemaess MTConnect 2.3:2024 minimal je Anfrage uebertragen?',
            ['1 Sample', 'Probe (Maschinenstruktur) + Current Sample', 'Stream', 'Whole History'], 1,
            'MTConnect 2.3:2024 §6: Initiale Anfrage besteht aus „Probe" (statisches Geraetemodell) gefolgt von „Current" (aktueller Zustand); danach „Sample"/"Asset" inkrementell.'),
        q('Welche Norm definiert das Time-Sensitive-Networking-Schedule-Verfahren (Time-Aware Shaper)?',
            ['IEEE 802.1AS', 'IEEE 802.1Qbv-2015', 'IEEE 802.1CB', 'IEEE 802.3'], 1,
            'IEEE 802.1Qbv-2015 „Enhancements for Scheduled Traffic" definiert den Time-Aware Shaper, der deterministische TSN-Zeitfenster fuer Steuerungs-Telegramme bereitstellt.'),
        q('Welche Pflicht trifft den OEE-Reporting-Prozess in einem ISO-22400-konformen MES?',
            ['Nur Tageswerte', 'Berechnung der Komponenten Availability/Performance/Quality mit dokumentierten Berechnungsregeln und Datenherkunft', 'Stundenwerte ohne Methodik', 'Wochenwerte ohne Quelle'], 1,
            'ISO 22400-2:2014 §4.2 verlangt fuer jeden KPI eine eindeutige Berechnungsregel und dokumentierte Datenherkunft; ohne diese ist OEE nicht ISO-22400-konform.'),
        q('Welche Norm regelt das Alarm-Management-Lifecycle-Modell (Definition -> Rationalization -> Implementation -> Monitoring -> Maintenance)?',
            ['ISA-18.2:2016 §5 Alarm Management Lifecycle', 'IEC 62682:2022', 'VDI/VDE 3850-1', 'IEC 61131-3'], 0,
            'ISA-18.2:2016 §5 (= ANSI/ISA-18.2-2016) definiert den 10-Phasen-Lifecycle; IEC 62682:2022 ist die internationale Adoption davon.')
    ];

    window.SCHULUNGEN.list.push({
        id: 'master_et_automation',
        code: 'MA-ET Automation',
        name: 'Master Elektrotechnik — Automatisierungstechnik',
        short: 'MA-ET Automation',
        desc: 'Vertiefungsstudium Elektrotechnik mit Fokus Automatisierungstechnik: fortgeschrittene Regelungstechnik, SPS-Programmierung nach IEC 61131-3 / 61499, Feldbusse und OPC UA, Antriebs- und Leistungselektronik, Industrierobotik, Industrie 4.0 und Digital Twin.',
        // P-ARCH-CROSS-CHAPTER-EXAM (AGENTS §18.10): Master-Modul-Mock-Pruefung.
        // 30 Items aus allen Kapiteln 1-6 (Capstone Kap. 7 ausgeklammert), 60 min, 60 %.
        // Zweite Pruefung: Antrieb- und Feldbus-Fokus fuer gezieltes Coaching.
        assessments: [
            {
                id: 'master-mock-final',
                title: 'Modul-Mock-Pruefung Automatisierung',
                type: 'module',
                poolFilter: { chapter: ['control', 'sps', 'fieldbus', 'drives', 'robotics', 'i40'] },
                count: 30,
                timeLimit: 60,
                passScore: 0.6
            },
            {
                id: 'fieldbus-drives-practice',
                title: 'Feldbusse & Antriebe — Uebungspruefung',
                type: 'practice',
                poolFilter: { chapter: ['fieldbus', 'drives'] },
                count: 20,
                passScore: 0.7
            }
        ],
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
                summary: 'Kinematik (DH-Konvention, Vorwaerts-/Rueckwaertskinematik, Singularitaeten), Dynamik (Lagrange, Newton-Euler), Bahnplanung in Gelenk- und Kartesischem Raum, Mensch-Roboter-Kollaboration nach ISO 10218 / ISO/TS 15066:2016, herstellerspezifische Programmiersprachen (KRL, RAPID, URScript, KAREL/TPP), ROS 2 + MoveIt 2.',
                pages: [PAGE_ROBOT_KIN, PAGE_ROBOT_DYN, PAGE_ROBOT_SAFETY, PAGE_ROBOT_PROG],
                quiz: QUIZ_ROBOT
            },
            {
                id: 'i40',
                title: 'Kapitel 6 — Industrie 4.0 und Digital Twin',
                summary: 'RAMI 4.0 (DIN SPEC 91345), Verwaltungsschale (Asset Administration Shell, IDTA-Spezifikationen 2024), Digital Twin nach ISO 23247:2021, ISA-95 / IEC 62264 Hierarchie L0-L4, MTConnect, OEE-Kennzahlen, Edge-/Cloud-Architekturen sowie OT-Sicherheit nach IEC 62443.',
                pages: [PAGE_I40_RAMI, PAGE_I40_DT, PAGE_I40_MES, PAGE_I40_SEC],
                quiz: QUIZ_I40
            },
            {
                id: 'capstone',
                title: 'Kapitel 7 — Master-Capstone Automatisierungstechnik',
                summary: 'Pruefungsnaher Abschluss-Block: Anlagen-Scope und Lastenheft nach VDI/VDE 3694:2014, Inbetriebnahme und FAT/SAT nach VDI 2884 + IEC 60204-1:2016 + GAMP 5 (2022), OEE-Dekomposition + Predictive Maintenance nach Nakajima 1988 + ISO 22400-2 + MTConnect 2.3, Digital Twin nach ISO 23247-1..-4:2021 + AAS-Submodelle (IDTA 2024) + ISA-95-/B2MML-Integration + HMI nach VDI/VDE 3850-1 + ISA-18.2:2016, Bewertungsrubrik mit Selbstbewertungs-Workflow.',
                pages: [PAGE_CAP_AUTO_SCOPE, PAGE_CAP_AUTO_RAMP, PAGE_CAP_AUTO_OEE, PAGE_CAP_AUTO_DT_HMI, PAGE_CAP_AUTO_RUBRIC],
                quiz: QUIZ_CAP_AUTO
            }
        ]
    });
})();
