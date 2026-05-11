/* Robotik */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'robotics';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Robotik',
        desc: 'Kinematik (vorwärts/invers), DH-Parameter, homogene Transformationen, Jacobi-Matrix, Singularitäten, Manipulator-Dynamik.',
        formulas: `
            <strong>Grübler-Kutzbach (DOF)</strong><br>
            Räumlich: $F = 6(n-1) - \\sum_{i}(6-f_i)$<br>
            Eben: $F = 3(n-1) - 2 j_1 - j_2$ ($j_1$: 1-DOF-Gelenke)<br><br>
            <strong>Rotationsmatrizen</strong><br>
            $R_z(\\theta)=\\begin{pmatrix}\\cos\\theta & -\\sin\\theta & 0\\\\ \\sin\\theta & \\cos\\theta & 0\\\\ 0&0&1\\end{pmatrix}$<br>
            $R^TR = I$, $\\det R=1$<br><br>
            <strong>Homogene Transformation</strong><br>
            $T=\\begin{pmatrix}R & d\\\\ 0 & 1\\end{pmatrix}\\in\\mathbb{R}^{4\\times 4}$<br>
            Inverse: $T^{-1}=\\begin{pmatrix}R^T & -R^T d\\\\ 0 & 1\\end{pmatrix}$<br><br>
            <strong>DH-Konvention</strong><br>
            $A_i=R_z(\\theta_i)T_z(d_i)T_x(a_i)R_x(\\alpha_i)$<br><br>
            <strong>Vorwärtskinematik 2-DOF planar</strong><br>
            $x = l_1 c_1 + l_2 c_{12},\\ y = l_1 s_1 + l_2 s_{12}$<br><br>
            <strong>Jacobi (planar 2-Arm)</strong><br>
            $J=\\begin{pmatrix}-l_1 s_1-l_2 s_{12} & -l_2 s_{12}\\\\ l_1 c_1+l_2 c_{12} & l_2 c_{12}\\end{pmatrix}$<br>
            Singularität: $\\det J = l_1 l_2 \\sin\\theta_2 = 0\\Rightarrow \\theta_2\\in\{0,\\pi\}$<br><br>
            <strong>Rotationen — RPY (Roll-Pitch-Yaw)</strong><br>
            $R=R_z(\\gamma)R_y(\\beta)R_x(\\alpha)$<br><br>
            <strong>Quaternion</strong> $q=(w,x,y,z)$, $|q|=1$<br>
            $R(q)=\\begin{pmatrix}1-2(y^2+z^2) & 2(xy-wz) & 2(xz+wy)\\ 2(xy+wz) & 1-2(x^2+z^2) & 2(yz-wx)\\ 2(xz-wy) & 2(yz+wx) & 1-2(x^2+y^2)\\end{pmatrix}$<br><br>
            <strong>Skew-Matrix / Winkelgeschwindigkeit</strong><br>
            $[\\omega]_\\times=\\begin{pmatrix}0 & -\\omega_z & \\omega_y\\ \\omega_z & 0 & -\\omega_x\\ -\\omega_y & \\omega_x & 0\\end{pmatrix}$, $\\dot R=[\\omega]_\\times R$<br><br>
            <strong>Statische Kräfte</strong> (Kraft-Drehmoment-Dualität)<br>
            $\\tau = J^T F$<br><br>
            <strong>Pseudoinverse (redundante Roboter)</strong><br>
            $J^+ = J^T(JJ^T)^{-1}$ (rechts), $\\dot\\theta = J^+\\dot p$<br><br>
            <strong>Differenziell mobile Roboter (Differential Drive)</strong><br>
            $v=(v_R+v_L)/2$, $\\omega=(v_R-v_L)/L$ ($L$ Spurweite)
        `,
        levels: [
            // L1
            [
                {
                    q: 'Ein ebener Roboterarm hat 3 Glieder und 3 Drehgelenke (alle 1-DOF) zwischen Basis und Endeffektor. Bestimme den Freiheitsgrad mittels Grübler-Kutzbach.',
                    h: 'Eben: $F=3(n-1)-2 j_1$. $n$ inkl. Basis.',
                    s: '$n=4$ (3 Glieder + 1 Basis), $j_1=3$.<br>$F=3(4-1)-2\\cdot 3 = 9-6 = 3$.<br>$$\\boxed{F=3}$$ (passt: $x,y$ Position und Orientierung).'
                },
                {
                    q: 'Berechne die Endeffektor-Position $(x,y)$ eines planaren 2-Arm-Roboters mit $l_1=l_2=1$, $\\theta_1=30°$, $\\theta_2=60°$.',
                    h: 'Vorwärtskinematik: $x = l_1\\cos\\theta_1 + l_2\\cos(\\theta_1+\\theta_2)$, analog $y$.',
                    s: '$\\cos 30°=\\sqrt{3}/2\\approx 0{,}866$, $\\sin 30°=0{,}5$.<br>$\\cos 90°=0,\\ \\sin 90°=1$.<br>$x=1\\cdot 0{,}866+1\\cdot 0=0{,}866$. $y=1\\cdot 0{,}5+1\\cdot 1=1{,}5$.<br>$$\\boxed{(x,y)=(0{,}866,\\ 1{,}5)}$$'
                },
                {
                    q: 'Schreibe die homogene Transformationsmatrix $T$ für eine reine Translation um $(d_x,d_y,d_z)$.',
                    h: '4x4 Matrix mit $R=I$ und Translationsvektor $d$.',
                    s: '$$T=\\begin{pmatrix}1 & 0 & 0 & d_x\\\\ 0 & 1 & 0 & d_y\\\\ 0 & 0 & 1 & d_z\\\\ 0 & 0 & 0 & 1\\end{pmatrix}$$'
                },
                {
                    q: 'Schreibe die Rotationsmatrix $R_z(90°)$ um die z-Achse.',
                    h: '$R_z(\\theta)$ Standardform; $\\cos 90°=0$, $\\sin 90°=1$.',
                    s: '$$R_z(90°)=\\begin{pmatrix}0 & -1 & 0\\\\ 1 & 0 & 0\\\\ 0 & 0 & 1\\end{pmatrix}$$ Anschaulich: x-Achse wird zur y-Achse.'
                },
                {
                    q: 'Berechne die Inverse $T^{-1}$ einer homogenen Transformation $T=\\begin{pmatrix}R&d\\\\0&1\\end{pmatrix}$.',
                    h: 'Direkt einsetzen, nicht numerisch invertieren: $T^{-1}=\\begin{pmatrix}R^T & -R^T d\\\\0 & 1\\end{pmatrix}$.',
                    s: '$$T^{-1}=\\begin{pmatrix}R^T & -R^T d\\\\ 0 & 1\\end{pmatrix}$$ Effizient, da $R^{-1}=R^T$ bei orthogonalen Rotationsmatrizen ($\\det R=1$).'
                },
                {
                    q: 'Wie lauten die DH-Parameter $(\\theta,d,a,\\alpha)$ für ein Drehgelenk vs. Schubgelenk allgemein?',
                    h: 'Bei einem Drehgelenk ist $\\theta$ variabel; bei einem Schubgelenk ist $d$ variabel; übrige Parameter sind konstant.',
                    s: 'Drehgelenk: variabel $\\theta_i$, konstant $d_i, a_i, \\alpha_i$.<br>Schubgelenk: variabel $d_i$, konstant $\\theta_i, a_i, \\alpha_i$.<br>$a_i$ Linkenlänge, $\\alpha_i$ Verwindung, $d_i$ Linkenversatz, $\\theta_i$ Gelenkwinkel.'                },
                {
                    q: 'Wie viele Freiheitsgrade hat ein starrer Körper im Raum? Wie viele in der Ebene? Begründe.',
                    h: 'Position + Orientierung.',
                    s: 'Räumlich: 3 Translationen $(x,y,z)$ + 3 Rotationen (Roll, Pitch, Yaw) = $\\boxed{6}$ DOF.<br>Eben: 2 Translationen + 1 Rotation = $\\boxed{3}$ DOF.<br>Industrieroboter benötigen i.d.R. mind. 6 DOF, um beliebige Pose im Raum erreichen zu können.'
                },
                {
                    q: 'Berechne die Rotationsmatrix für RPY-Winkel $(\\alpha,\\beta,\\gamma)=(0°, 90°, 0°)$ (Pitch um $y$-Achse).',
                    h: '$R_y(90°)$ einsetzen.',
                    s: '$\\cos 90°=0,\ \\sin 90°=1$.<br>$$R=R_y(90°)=\\begin{pmatrix}0 & 0 & 1\\ 0 & 1 & 0\\ -1 & 0 & 0\\end{pmatrix}$$Anschaulich: $z$-Achse wird zur $x$-Achse.'
                },
                {
                    q: 'Welche Form hat der Arbeitsraum (Workspace) eines planaren 2-Arm-Roboters mit $l_1=l_2=l$?',
                    h: 'Maximaler Reichweite-Radius vs. Minimum.',
                    s: 'Maximalradius: $r_{max}=l_1+l_2=2l$ (gestreckt).<br>Minimalradius: $r_{min}=|l_1-l_2|=0$ (eingeklappt).<br>$\\Rightarrow$ Workspace ist eine <strong>Kreisscheibe</strong> mit Radius $2l$ um die Basis.<br>Bei $l_1\\neq l_2$: Kreisring zwischen $|l_1-l_2|$ und $l_1+l_2$.'
                },
                {
                    q: 'Berechne $T = T_1\\cdot T_2$ mit $T_1$ = Translation $(2,0,0)$ und $T_2$ = Rotation $R_z(90°)$. Wende auf $p_2 = (1,0,0,1)^T$ an.',
                    h: 'Im selben Frame interpretiert: zuerst $T_2$ angewendet, dann $T_1$.',
                    s: '$T_2 \\cdot p_2 = R_z(90°)(1,0,0)^T = (0,1,0)^T \\Rightarrow$ in homogenen Koord. $(0,1,0,1)^T$.<br>$T_1 \\cdot$ das = $(0+2,1,0,1)^T=(2,1,0,1)^T$.<br>$$\\boxed{p\'=(2,1,0)^T}$$'                }
            ],
            // L2
            [
                {
                    q: 'Inverse Kinematik: planarer 2-Arm-Roboter mit $l_1=l_2=1$, Zielposition $(x,y)=(1,\\,1)$. Berechne $\\theta_1,\\theta_2$ (Ellbogen-Up-Lösung).',
                    h: '$\\cos\\theta_2=(x^2+y^2-l_1^2-l_2^2)/(2l_1 l_2)$. $\\theta_1=\\operatorname{atan2}(y,x)-\\operatorname{atan2}(l_2 \\sin\\theta_2,\\ l_1+l_2\\cos\\theta_2)$.',
                    s: '$x^2+y^2=2$. $\\cos\\theta_2=(2-1-1)/(2\\cdot 1\\cdot 1)=0\\Rightarrow \\theta_2=\\pm 90°$.<br>Wähle $\\theta_2=+90°$ (Ellbogen-Up). $\\sin\\theta_2=1$.<br>$\\theta_1=\\operatorname{atan2}(1,1)-\\operatorname{atan2}(1\\cdot 1,\\ 1+0)=45°-45°=0°$.<br>$$\\boxed{\\theta_1=0°,\\ \\theta_2=90°}$$ Zweite Lösung: $\\theta_2=-90°$, $\\theta_1=90°$.'
                },
                {
                    q: 'Berechne die Jacobi-Matrix $J(\\theta_1,\\theta_2)$ des 2-DOF-Planarroboters und werte sie bei $\\theta_1=0,\\theta_2=\\pi/2$, $l_1=l_2=1$ aus.',
                    h: 'Ableitung der Vorwärtskinematik nach den Gelenkvariablen.',
                    s: '$J=\\begin{pmatrix}-l_1 s_1-l_2 s_{12} & -l_2 s_{12}\\\\ l_1 c_1+l_2 c_{12} & l_2 c_{12}\\end{pmatrix}$.<br>Bei $\\theta_1=0,\\theta_2=\\pi/2$: $s_1=0,c_1=1,s_{12}=1,c_{12}=0$.<br>$$J=\\begin{pmatrix}-1 & -1\\\\ 1 & 0\\end{pmatrix}$$<br>$\\det J = -1\\cdot 0 - (-1)\\cdot 1 = 1$ ($\\neq 0$, keine Singularität).'
                },
                {
                    q: 'Bestimme die Singularitäten des planaren 2-Arm-Roboters.',
                    h: '$\\det J = l_1 l_2 \\sin\\theta_2$. Singulär wenn 0.',
                    s: '$\\det J = 0 \\iff \\sin\\theta_2=0 \\iff \\theta_2 \\in \\{0, \\pi\\}$.<br>Anschauung: voll gestreckter ($\\theta_2=0$) oder zusammengeklappter ($\\theta_2=\\pi$) Arm. In dieser Konfiguration ist Bewegung in radialer Richtung verloren ($\\dot x$ einseitig nicht erzeugbar).'
                },
                {
                    q: 'Komposition: gegeben Rotation $R_z(90°)$ gefolgt von Translation $(0,2,0)$. Wie wirkt diese Komposition $T = T_{trans}\\cdot T_{rot}$ auf den Punkt $p=(1,0,0)^T$?',
                    h: 'Erweitere $p$ zu homogenen Koordinaten $(p,1)^T$, multipliziere von links.',
                    s: 'Rotation: $R_z(90°)\\cdot(1,0,0)^T=(0,1,0)^T$. <br>Anschließende Translation $+ (0,2,0)$: $(0,3,0)^T$.<br>$$\\boxed{p\'=(0,3,0)^T}$$ Hinweis: Reihenfolge zählt; $T_{rot}\\cdot T_{trans}$ ergibt einen anderen Punkt.'
                },
                {
                    q: 'Berechne die Geschwindigkeit des Endeffektors für den 2-DOF-Planarroboter bei $\\dot\\theta_1=1\\,\\text{rad/s}$, $\\dot\\theta_2=0$, im Konfigurationspunkt aus Aufgabe L2.2.',
                    h: '$\\dot p = J\\cdot \\dot\\theta$.',
                    s: 'Mit $J=\\begin{pmatrix}-1 & -1\\\\ 1 & 0\\end{pmatrix}$, $\\dot\\theta=(1,0)^T$: $\\dot p = (-1, 1)^T\\,\\text{m/s}$.<br>$$\\boxed{\\dot p = (-1,\\ 1)^T\\,\\text{m/s}}$$'
                },
                {
                    q: 'Verifiziere, dass $R(\\theta)R(\\phi) = R(\\theta+\\phi)$ für 2D-Rotationsmatrizen gilt.',
                    h: 'Standard 2D-Rotationsmatrix multiplizieren und Additionstheoreme nutzen.',
                    s: '$R(\\theta)R(\\phi)=\\begin{pmatrix}c\\theta & -s\\theta\\\\ s\\theta & c\\theta\\end{pmatrix}\\!\\begin{pmatrix}c\\phi & -s\\phi\\\\ s\\phi & c\\phi\\end{pmatrix}$<br>$=\\begin{pmatrix}c\\theta c\\phi - s\\theta s\\phi & -c\\theta s\\phi - s\\theta c\\phi\\\\ s\\theta c\\phi + c\\theta s\\phi & -s\\theta s\\phi + c\\theta c\\phi\\end{pmatrix}=\\begin{pmatrix}c(\\theta+\\phi) & -s(\\theta+\\phi)\\\\ s(\\theta+\\phi) & c(\\theta+\\phi)\\end{pmatrix}=R(\\theta+\\phi)$.'                },
                {
                    q: 'Statisches Gleichgewicht: planarer 2-Arm-Roboter ($l_1=l_2=1$) hält am Endeffektor eine Last $F=(0,-10)^T\\,\\text{N}$. Konfiguration $\\theta_1=0°,\\theta_2=90°$. Welche Gelenkdrehmomente $\\tau$ sind nötig?',
                    h: '$\\tau=J^T F$ mit $J$ aus L2.2.',
                    s: '$J=\\begin{pmatrix}-1 & -1\\ 1 & 0\\end{pmatrix}$, $J^T=\\begin{pmatrix}-1 & 1\\ -1 & 0\\end{pmatrix}$.<br>$\\tau=J^T F = \\begin{pmatrix}-1 & 1\\ -1 & 0\\end{pmatrix}\\begin{pmatrix}0\\-10\\end{pmatrix}=\\begin{pmatrix}-10\\ 0\\end{pmatrix}\\,\\text{Nm}$.<br>$$\\boxed{\\tau_1=-10\\,\\text{Nm},\ \\tau_2=0\\,\\text{Nm}}$$ Interpretation: zur Last beiträgt nur Gelenk 1 (Hebelarm); Gelenk 2 erzeugt in dieser Konfiguration keinen Moment-Beitrag in $y$-Richtung.'
                },
                {
                    q: 'Schiefsymmetrische Matrix: bestimme $[\\omega]_\\times$ für $\\omega=(1,2,3)^T$ und verifiziere $[\\omega]_\\times v = \\omega\\times v$ für $v=(0,0,1)^T$.',
                    h: '$[\\omega]_\\times=\\begin{pmatrix}0&-\\omega_z&\\omega_y\\ \\omega_z&0&-\\omega_x\\ -\\omega_y&\\omega_x&0\\end{pmatrix}$.',
                    s: '$[\\omega]_\\times=\\begin{pmatrix}0&-3&2\\ 3&0&-1\\ -2&1&0\\end{pmatrix}$.<br>$[\\omega]_\\times v = (2,-1,0)^T$. Direkt: $\\omega\\times v=(1,2,3)\\times(0,0,1)=(2\\cdot 1-3\\cdot 0,\ 3\\cdot 0-1\\cdot 1,\ 1\\cdot 0-2\\cdot 0)=(2,-1,0)^T$.'
                },
                {
                    q: 'Inverse Kinematik mit Redundanz: ein 3-DOF planarer Roboter ($l_1=l_2=l_3=1$) erreicht $(x,y)=(2,0)$. Wieso existieren unendlich viele Lösungen, und wie wird typischerweise eine ausgewählt?',
                    h: '3 Gelenke vs. 2 Aufgabe-DOF $\\Rightarrow$ 1-dimensionale Lösungsmenge.',
                    s: 'Aufgabenraum 2D, Konfigurationsraum 3D $\\Rightarrow$ Nullraum-Dimension $= 1$. Es gibt eine 1-Parameter-Schar $\\theta(s)$ von Lösungen.<br>Typische Auswahlkriterien (Sekundärziele): minimale Gelenkbewegung, mittlere Gelenkstellung (Joint-Limits), maximale Manipulability, Vermeidung von Hindernissen.<br>Mathematisch: $\\dot\\theta = J^+\\dot p + (I-J^+ J)\\dot\\theta_0$ — der Nullraum-Term $(I-J^+ J)\\dot\\theta_0$ erlaubt sekundäre Bewegungen ohne Endeffektor-Auswirkung.'
                },
                {
                    q: 'Konvertiere die Quaternion $q = (\\cos 30°, \\sin 30°, 0, 0)$ (Drehung 60° um $x$-Achse) in eine Rotationsmatrix.',
                    h: '$R(q)$-Formel mit $w=\\cos 30°,\ x=\\sin 30°$.',
                    s: '$w=\\sqrt 3/2,\ x=0{,}5,\ y=z=0$.<br>$x^2=0{,}25,\ y^2=z^2=0$.<br>$R=\\begin{pmatrix}1-2(0+0)&2(0-0)&2(0+0)\\ 2(0+0)&1-2(0{,}25+0)&2(0-2\\cdot \\sqrt 3/2\\cdot 0{,}5)\\ 2(0-0)&2(0+\\sqrt 3/2 \\cdot 0{,}5\\cdot 2)&1-2(0{,}25+0)\\end{pmatrix}$.<br>$=\\begin{pmatrix}1 & 0 & 0\\ 0 & 0{,}5 & -\\sqrt 3/2\\ 0 & \\sqrt 3/2 & 0{,}5\\end{pmatrix}=R_x(60°)$.'                }
            ],
            // L3
            [
                {
                    q: 'Stelle die DH-Tabelle eines planaren 2-Arm-Roboters auf (Gliedlängen $l_1, l_2$, beide Drehgelenke parallel zur z-Achse).',
                    h: '4 Spalten: $\\theta_i, d_i, a_i, \\alpha_i$. Beide Gelenke planar $\\Rightarrow \\alpha=0$.',
                    s: '<table class="text-sm"><thead><tr><th>i</th><th>$\\theta_i$</th><th>$d_i$</th><th>$a_i$</th><th>$\\alpha_i$</th></tr></thead><tbody><tr><td>1</td><td>$\\theta_1$</td><td>0</td><td>$l_1$</td><td>0</td></tr><tr><td>2</td><td>$\\theta_2$</td><td>0</td><td>$l_2$</td><td>0</td></tr></tbody></table>Die einzelnen $A_i=R_z(\\theta_i)T_x(l_i)$.<br>Endmatrix: $T=A_1 A_2$.'
                },
                {
                    q: 'Beweise: Die Inverse einer Rotationsmatrix ist gleich ihrer Transponierten ($R^{-1}=R^T$).',
                    h: 'Eigenschaft orthogonaler Matrizen. $R^TR=I$ aus Spaltenorthogonalität herleiten.',
                    s: 'Spalten von $R$ sind paarweise orthonormale Basisvektoren $e_i$.<br>$(R^T R)_{ij} = e_i^T e_j = \\delta_{ij}\\Rightarrow R^TR=I$.<br>Multiplizieren von links mit $R^{-1}$: $R^{-1}R^TR=R^{-1}I\\Rightarrow R^T=R^{-1}$. ∎'
                },
                {
                    q: 'Bestimme die Manipulability $w=\\sqrt{\\det(J J^T)}$ eines 2-DOF Roboters mit $l_1=l_2=1$ und $\\theta_2=60°$.',
                    h: 'Für quadratisches $J$: $w=|\\det J|=l_1 l_2 |\\sin\\theta_2|$.',
                    s: '$w=1\\cdot 1\\cdot \\sin 60°=\\sqrt{3}/2\\approx 0{,}866$.<br>$$\\boxed{w\\approx 0{,}866}$$ Maximum $w=1$ bei $\\theta_2=90°$ (optimaler Manipulationspunkt).'
                },
                {
                    q: 'Bestimme die geometrische Jacobi-Matrix $J=[J_v;\\,J_\\omega]$ eines 1-DOF planaren Drehgelenks (Drehachse $z_0$, Gelenkursprung im Ursprung) bezüglich des Endpunkts $p=(l\\cos\\theta, l\\sin\\theta, 0)$.',
                    h: 'Drehgelenk: $J_{v,i}=z_{i-1}\\times(p-p_{i-1})$, $J_{\\omega,i}=z_{i-1}$.',
                    s: '$z_0=(0,0,1)^T$, $p-p_0=p$. $z_0\\times p = (-l\\sin\\theta,\\ l\\cos\\theta,\\ 0)^T$.<br>$J=\\begin{pmatrix}-l\\sin\\theta\\\\ l\\cos\\theta\\\\ 0\\\\ 0\\\\ 0\\\\ 1\\end{pmatrix}$ (6x1).'
                },
                {
                    q: 'Inverse Dynamik: 1-DOF Drehgelenk (Trägheitsmoment $I$, masseloses Glied der Länge $l$, Punktmasse $m$ am Ende) im Schwerefeld $g$. Stelle die Bewegungsgleichung auf.',
                    h: 'Lagrange: $\\tau=\\dfrac{d}{dt}\\dfrac{\\partial L}{\\partial \\dot\\theta}-\\dfrac{\\partial L}{\\partial\\theta}$, $L=T-V$.',
                    s: 'Gesamtträgheit um Drehachse: $J_{ges}=I+ml^2$.<br>Kin. Energie: $T=\\tfrac12 J_{ges}\\dot\\theta^2$.<br>Pot. Energie (Bezugsniveau Drehachse, Winkel zur Senkrechten): $V=mgl\\cos\\theta$ (umgekehrtes Pendel: $-mgl\\cos\\theta$). Hier hängend: $V=-mgl\\cos\\theta$.<br>$L=\\tfrac12 J_{ges}\\dot\\theta^2 + mgl\\cos\\theta$.<br>$\\partial L/\\partial \\dot\\theta=J_{ges}\\dot\\theta$, $d/dt=J_{ges}\\ddot\\theta$.<br>$\\partial L/\\partial\\theta=-mgl\\sin\\theta$.<br>$$\\boxed{\\tau = (I+ml^2)\\ddot\\theta + mgl\\sin\\theta}$$'
                },
                {
                    q: 'Welche EulerWinkel-Konvention $(Z-Y-Z)$ ergibt sich aus der Rotationsmatrix $R$? Beschreibe die Inversion und Vorsicht bei Singularitäten.',
                    h: '$Z-Y-Z$: $R = R_z(\\alpha)R_y(\\beta)R_z(\\gamma)$. Aus Matrixelementen $r_{33}, r_{31}, r_{32}, r_{13}, r_{23}$ ablesen.',
                    s: '$\\beta=\\arctan2(\\sqrt{r_{31}^2+r_{32}^2},\\ r_{33})$.<br>Wenn $\\sin\\beta\\neq 0$: $\\alpha=\\arctan2(r_{23}, r_{13})$, $\\gamma=\\arctan2(r_{32}, -r_{31})$.<br>Wenn $\\beta=0$: Gimbal Lock (Singularität): $\\alpha+\\gamma$ ist nur als Summe bestimmbar; eine Variable kann frei gewählt werden, z.B. $\\gamma=0$, $\\alpha=\\arctan2(r_{21}, r_{11})$.<br>Praxis: Quaternionen vermeiden Gimbal-Lock-Probleme.'                },
                {
                    q: 'Pseudoinverse-Lösung für einen redundanten Roboter: $J=\\begin{pmatrix}1&0&1\\0&1&1\\end{pmatrix}\\in\\mathbb{R}^{2\\times 3}$, gewünschte Endgeschwindigkeit $\\dot p=(1,1)^T$. Berechne $\\dot\\theta = J^+\\dot p$.',
                    h: '$J^+ = J^T(JJ^T)^{-1}$. Liefert minimal-norm-Lösung.',
                    s: '$JJ^T=\\begin{pmatrix}1&0&1\\0&1&1\\end{pmatrix}\\!\\begin{pmatrix}1&0\\0&1\\1&1\\end{pmatrix}=\\begin{pmatrix}2&1\\1&2\\end{pmatrix}$.<br>$\\det=3$, $(JJ^T)^{-1}=\\tfrac13\\!\\begin{pmatrix}2&-1\\-1&2\\end{pmatrix}$.<br>$J^+ = J^T(JJ^T)^{-1}=\\begin{pmatrix}1&0\\0&1\\1&1\\end{pmatrix}\\!\\cdot\\!\\tfrac13\\!\\begin{pmatrix}2&-1\\-1&2\\end{pmatrix}=\\tfrac13\\!\\begin{pmatrix}2&-1\\-1&2\\1&1\\end{pmatrix}$.<br>$\\dot\\theta=J^+\\!\\begin{pmatrix}1\\1\\end{pmatrix}=\\tfrac13\\!\\begin{pmatrix}1\\ 1\\ 2\\end{pmatrix}$.<br>$$\\boxed{\\dot\\theta\\approx(0{,}333,\ 0{,}333,\ 0{,}667)^T}$$'
                },
                {
                    q: 'Differential-Drive-Roboter: linkes Rad $v_L=0{,}3\\,\\text{m/s}$, rechtes Rad $v_R=0{,}5\\,\\text{m/s}$, Spurweite $L=0{,}4\\,\\text{m}$. Berechne lineare und Winkelgeschwindigkeit sowie Krümmungsradius.',
                    h: '$v=(v_R+v_L)/2$, $\\omega=(v_R-v_L)/L$, $R=v/\\omega$.',
                    s: '$v=0{,}4\\,\\text{m/s}$.<br>$\\omega=(0{,}5-0{,}3)/0{,}4=0{,}5\\,\\text{rad/s}$.<br>$R=v/\\omega=0{,}4/0{,}5=0{,}8\\,\\text{m}$.<br>$$\\boxed{v=0{,}4\\,\\text{m/s},\ \\omega=0{,}5\\,\\text{rad/s},\ R=0{,}8\\,\\text{m}}$$'
                },
                {
                    q: 'Singulärwertzerlegung der Jacobi-Matrix: Welche praktische Bedeutung haben die Singulärwerte $\\sigma_i$ einer Jacobi-Matrix in der Robotik?',
                    h: 'Verstärkungsfaktoren in den Hauptrichtungen.',
                    s: 'SVD: $J=U\\Sigma V^T$. Singulärwerte $\\sigma_1\\ge\\sigma_2\\ge\\dots\\ge 0$.<br>$\\sigma_{max}$: maximaler Verstärkungsfaktor von Gelenkgeschwindigkeit zu Endeffektor-Geschwindigkeit (entlang $u_1$-Richtung).<br>$\\sigma_{min}$: minimaler — wenn $\\to 0$: Singularität.<br>Konditionszahl $\\kappa=\\sigma_{max}/\\sigma_{min}$ misst Isotropie der Manipulation. $\\kappa=1$ idealer Operationspunkt; $\\kappa\\gg 1$ schlecht konditioniert (numerisch sensitiv).<br>Anwendung: Damped Least Squares $\\dot\\theta=J^T(JJ^T+\\lambda^2 I)^{-1}\\dot p$ vermeidet Probleme nahe Singularitäten durch $\\lambda>0$.'
                },
                {
                    q: 'Newton-Euler-Rekursion vs. Lagrange-Formulierung — was sind die wesentlichen Unterschiede für die Berechnung der Roboterdynamik?',
                    h: 'Effizienz, Anschaulichkeit, Implementierung.',
                    s: '<strong>Lagrange</strong>: $\\tau=M(q)\\ddot q + C(q,\\dot q)\\dot q + g(q)$. Symbolisch geschlossen, konzeptionell klar (kin. + pot. Energie). Komplexität $O(n^4)$ symbolisch.<br><strong>Newton-Euler (rekursiv)</strong>: vorwärts propagieren von Geschwindigkeit/Beschleunigung, rückwärts Kräfte/Drehmomente. $O(n)$ je Iteration, ideal für Echtzeit-Inverse-Dynamik.<br>In modernen Frameworks (KDL, Pinocchio): Newton-Euler-Rekursion bevorzugt für Echtzeit; Lagrange für analytische Untersuchungen, Linearisierung um Arbeitspunkt, Reglerentwurf.'                }
            ]
        ]
    };
})();
