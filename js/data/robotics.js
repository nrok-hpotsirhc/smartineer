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
            Singularität: $\\det J = l_1 l_2 \\sin\\theta_2 = 0\\Rightarrow \\theta_2\\in\\{0,\\pi\\}$
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
                    s: 'Drehgelenk: variabel $\\theta_i$, konstant $d_i, a_i, \\alpha_i$.<br>Schubgelenk: variabel $d_i$, konstant $\\theta_i, a_i, \\alpha_i$.<br>$a_i$ Linkenlänge, $\\alpha_i$ Verwindung, $d_i$ Linkenversatz, $\\theta_i$ Gelenkwinkel.'
                }
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
                    s: '$R(\\theta)R(\\phi)=\\begin{pmatrix}c\\theta & -s\\theta\\\\ s\\theta & c\\theta\\end{pmatrix}\\!\\begin{pmatrix}c\\phi & -s\\phi\\\\ s\\phi & c\\phi\\end{pmatrix}$<br>$=\\begin{pmatrix}c\\theta c\\phi - s\\theta s\\phi & -c\\theta s\\phi - s\\theta c\\phi\\\\ s\\theta c\\phi + c\\theta s\\phi & -s\\theta s\\phi + c\\theta c\\phi\\end{pmatrix}=\\begin{pmatrix}c(\\theta+\\phi) & -s(\\theta+\\phi)\\\\ s(\\theta+\\phi) & c(\\theta+\\phi)\\end{pmatrix}=R(\\theta+\\phi)$. ✓'
                }
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
                    s: '$\\beta=\\arctan2(\\sqrt{r_{31}^2+r_{32}^2},\\ r_{33})$.<br>Wenn $\\sin\\beta\\neq 0$: $\\alpha=\\arctan2(r_{23}, r_{13})$, $\\gamma=\\arctan2(r_{32}, -r_{31})$.<br>Wenn $\\beta=0$: Gimbal Lock (Singularität): $\\alpha+\\gamma$ ist nur als Summe bestimmbar; eine Variable kann frei gewählt werden, z.B. $\\gamma=0$, $\\alpha=\\arctan2(r_{21}, r_{11})$.<br>Praxis: Quaternionen vermeiden Gimbal-Lock-Probleme.'
                }
            ]
        ]
    };
})();
