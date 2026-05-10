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
