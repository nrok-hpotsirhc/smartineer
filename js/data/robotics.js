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
                    s: '$T_2 \\cdot p_2 = R_z(90°)(1,0,0)^T = (0,1,0)^T \\Rightarrow$ in homogenen Koord. $(0,1,0,1)^T$.<br>$T_1 \\cdot$ das = $(0+2,1,0,1)^T=(2,1,0,1)^T$.<br>$$\\boxed{p\'=(2,1,0)^T}$$'                },
                {
                    q: 'Definiere die RPY-Konvention (Roll-Pitch-Yaw). Welche Achsen drehen $\\alpha,\\beta,\\gamma$? Wie lautet die Kompositionsmatrix in fest-frame XYZ-Ordnung?',
                    h: 'Roll um $x$, Pitch um $y$, Yaw um $z$.',
                    s: 'Roll $\\alpha$ um $x$-Achse, Pitch $\\beta$ um $y$-Achse, Yaw $\\gamma$ um $z$-Achse. Fest-frame XYZ-Komposition: $$\\boxed{R=R_z(\\gamma)R_y(\\beta)R_x(\\alpha)}$$ Aequivalent zur intrinsischen ZYX-Konvention (Drehung im jeweils bewegten Frame ergibt dieselbe Endorientierung). <em>Quelle:</em> Siciliano/Sciavicco/Villani/Oriolo, Robotics: Modelling, Planning and Control, Springer 2010, §2.4.1.'
                },
                {
                    q: 'Was ist die 4x4-Einheits-Homogenmatrix $I_4$? Welche Pose beschreibt sie?',
                    h: 'Diagonalmatrix mit vier Einsen.',
                    s: '$I_4=\\mathrm{diag}(1,1,1,1)$. Es gilt $R=I_3$ (keine Rotation) und $d=0$ (keine Translation) $\\Rightarrow$ Identitaets-Pose (Koordinatensystem $A=B$). Neutralelement bzgl. Matrixmultiplikation: $T\\cdot I_4=I_4\\cdot T=T$. <em>Quelle:</em> Craig, Introduction to Robotics: Mechanics and Control, 4th ed., Pearson 2018, §2.7.'
                },
                {
                    q: 'Wie viele Freiheitsgrade hat ein 6R-Industrieroboter (sechs Drehgelenke in offener kinematischer Kette)?',
                    h: 'Offene Kette: DOF gleich Summe der Gelenk-DOF.',
                    s: 'Sechs 1-DOF-Drehgelenke in serieller offener Kette: $F=6$. Erlaubt beliebige Pose (Position 3 + Orientierung 3), sofern keine Singularitaet vorliegt. Industriestandard z.B. KUKA KR-Serie, Yaskawa Motoman, Fanuc M-Serie. <em>Quelle:</em> Spong/Hutchinson/Vidyasagar, Robot Modeling and Control, 2nd ed., Wiley 2020, §1.3.'
                },
                {
                    q: 'Berechne $T\\cdot p$ fuer $T=T_x(3)$ (reine Translation um 3 in $x$) und Punkt $p=(1,2,0,1)^T$.',
                    h: 'Reine Translation: $p\'=p+d$.',
                    s: '$p\'=(1+3,\\,2,\\,0,\\,1)^T=(4,2,0,1)^T$. $$\\boxed{p\'=(4,2,0)^T}$$ <em>Quelle:</em> Craig 2018, §2.4.'
                },
                {
                    q: 'Welchen Wert hat $\\det R$ fuer eine Rotationsmatrix $R\\in SO(3)$? Begruende.',
                    h: 'Eigenschaft der Spezial-Orthogonalen Gruppe.',
                    s: 'Aus $R^T R=I$ folgt $(\\det R)^2=1$. Die Spezial-Orthogonale Gruppe $SO(3)$ schraenkt zusaetzlich auf orientierungserhaltende Rotationen ein: $$\\boxed{\\det R=+1}$$ $\\det R=-1$ wuerde eine Spiegelung beschreiben (improper). <em>Quelle:</em> Lynch/Park, Modern Robotics: Mechanics, Planning, and Control, Cambridge University Press 2017, §3.2.1.'
                },
                {
                    q: 'Zylindrischer RPP-Roboter (1 Drehgelenk + 2 Schubgelenke): Wie viele DOF? Welche Form hat sein Workspace?',
                    h: 'RPP = Revolute + Prismatic + Prismatic.',
                    s: 'DOF $=3$. Workspace: Hohlzylinder-Volumen. Das Drehgelenk $\\theta$ rotiert um die Hochachse, ein Schubgelenk verfaehrt vertikal ($z$), ein Schubgelenk radial ($r$). Erreichbar: $r\\in[r_{min},r_{max}]$, $z\\in[z_{min},z_{max}]$, $\\theta\\in[\\theta_{min},\\theta_{max}]$. <em>Quelle:</em> Spong et al. 2020, §1.3.2; ISO 8373:2012 §3.15 (robot manipulator types).'
                },
                {
                    q: 'Welche Quaternion repraesentiert die Identitaets-Rotation (keine Drehung)?',
                    h: 'Achsen-Winkel-Form $q=(\\cos(\\theta/2),\\,\\sin(\\theta/2)\\hat n)$ bei $\\theta=0$.',
                    s: '$q_I=(1,0,0,0)$ (Skalar zuerst). Es gilt $|q_I|=1$ und $R(q_I)=I_3$. Aequivalent: $-q_I=(-1,0,0,0)$ repraesentiert dieselbe Rotation — beide Vorzeichen ergeben durch die Doppeluberlagerung $SU(2)\\to SO(3)$ dieselbe Orientierung. <em>Quelle:</em> Siciliano et al. 2010, §2.4.6.'
                },
                {
                    q: 'Wie viele unabhaengige Komponenten hat eine vollstaendige Pose eines starren Koerpers im 3D-Raum? Welche Repraesentationen sind ueblich?',
                    h: 'Position + Orientierung; Orientierung minimal 3 Komponenten.',
                    s: 'Pose hat $6$ unabhaengige Komponenten: 3 Translation + 3 Rotation. Uebliche Repraesentationen: (a) Position + RPY-Winkel (6 Werte, singulaer bei Gimbal-Lock), (b) Position + Quaternion (7 Werte, redundant aber singularitaeten-frei), (c) Homogenmatrix $T\\in SE(3)$ (16 Werte, davon 6 Freiheitsgrade). <em>Quelle:</em> Lynch/Park 2017, §3.3.'
                },
                {
                    q: 'Warum wird in der Robotik $\\operatorname{atan2}(y,x)$ anstelle von $\\arctan(y/x)$ verwendet?',
                    h: 'Quadranten-Eindeutigkeit, Verhalten bei $x=0$.',
                    s: '$\\arctan(y/x)$ liefert nur das Intervall $(-\\pi/2,\\pi/2)$ und ist bei $x=0$ undefiniert. $\\operatorname{atan2}(y,x)$ liefert den vollen Quadranten-eindeutigen Winkel in $(-\\pi,\\pi]$ und behandelt $x=0$ korrekt (Vorzeichen von $y$ entscheidet). Unverzichtbar fuer inverse Kinematik (Eulerwinkel-Extraktion, $\\theta_1=\\operatorname{atan2}(y,x)$) und Wegeplanung. <em>Quelle:</em> Craig 2018, Anhang A.'
                },
                {
                    q: 'Wie viele DOF hat ein ebener Parallelogramm-Vier-Gelenkmechanismus (4-Bar-Linkage, alle Gelenke 1-DOF-Drehgelenke)?',
                    h: 'Grübler eben: $F=3(n-1)-2j_1$, $n$ inklusive Rahmen.',
                    s: '$n=4$ Glieder (Rahmen + 3 bewegliche), $j_1=4$ Drehgelenke. $F=3\\cdot 3-2\\cdot 4=9-8=1$. $$\\boxed{F=1}$$ Ein einziger Antrieb genuegt. Beispiel: Pantograph, koppelnde Bewegung in zwei Achsen mit nur einem Servo. <em>Quelle:</em> Siciliano et al. 2010, §2.10.'
                },
                {
                    q: 'Welche kinematische Struktur hat ein SCARA-Roboter (4-DOF)? Wozu ist er ausgelegt?',
                    h: 'SCARA = Selective Compliance Assembly Robot Arm. Welche 4 Gelenke?',
                    s: 'SCARA-Struktur: $\\mathrm{RRPR}$. Zwei parallele Drehgelenke (vertikale Drehachsen) fuer planare $xy$-Bewegung, ein Schubgelenk vertikal ($z$), ein Drehgelenk fuer die Werkzeug-Orientierung um $z$. Hohe Steifigkeit in $z$ bei nachgiebigen $xy$-Richtungen — ideal fuer Pick-and-Place in der Elektronikfertigung (Bestueckungsautomaten). <em>Quelle:</em> Spong et al. 2020, §1.3.4; ISO 8373:2012 §3.15.'
                },
                {
                    q: 'Zeige: $R_z(45°)\\cdot R_z(45°)=R_z(90°)$.',
                    h: 'Rotationen um dieselbe Achse addieren sich.',
                    s: 'Mit dem Additionstheorem $R_z(\\theta_1)R_z(\\theta_2)=R_z(\\theta_1+\\theta_2)$ folgt unmittelbar $R_z(45°)R_z(45°)=R_z(90°)$. Numerisch: $R_z(45°)=\\begin{pmatrix}\\sqrt 2/2&-\\sqrt 2/2&0\\\\ \\sqrt 2/2&\\sqrt 2/2&0\\\\ 0&0&1\\end{pmatrix}$; das Quadrat ergibt $\\begin{pmatrix}0&-1&0\\\\1&0&0\\\\0&0&1\\end{pmatrix}=R_z(90°)$. <em>Quelle:</em> Lynch/Park 2017, §3.2.1.'
                },
                {
                    q: 'Was bedeutet „Right-Handed Coordinate System" in der Robotik? Wie pruefst du es schnell mit der Hand?',
                    h: 'Rechte-Hand-Regel: Daumen $=x$, Zeigefinger $=y$, Mittelfinger $=z$.',
                    s: 'Rechtssystem: $\\hat x\\times\\hat y=\\hat z$ (zyklische Vertauschung). Hand-Pruefung: rechte Hand, Daumen entlang $+x$, Zeigefinger entlang $+y$ — der eingebogene Mittelfinger zeigt dann entlang $+z$. ROS, KUKA-KRL, ISO 8373 verwenden ausschliesslich Rechtssysteme. Linkshaendige Systeme (DirectX-Grafik) ergeben $\\det R=-1$ und sind in der Robotik unueblich. <em>Quelle:</em> Craig 2018, §2.1; ISO 8373:2012 §4.1.'
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
                    s: '$w=\\sqrt 3/2,\ x=0{,}5,\ y=z=0$.<br>$x^2=0{,}25,\ y^2=z^2=0$.<br>$R=\\begin{pmatrix}1-2(0+0)&2(0-0)&2(0+0)\\ 2(0+0)&1-2(0{,}25+0)&2(0-2\\cdot \\sqrt 3/2\\cdot 0{,}5)\\ 2(0-0)&2(0+\\sqrt 3/2 \\cdot 0{,}5\\cdot 2)&1-2(0{,}25+0)\\end{pmatrix}$.<br>$=\\begin{pmatrix}1 & 0 & 0\\ 0 & 0{,}5 & -\\sqrt 3/2\\ 0 & \\sqrt 3/2 & 0{,}5\\end{pmatrix}=R_x(60°)$.'                },
                {
                    q: 'Schreibe die Rodrigues-Formel fuer eine Drehung um die Einheits-Achse $\\hat n$ mit Winkel $\\theta$.',
                    h: 'Exponential der Skew-Matrix: $R=e^{[\\hat n]_\\times \\theta}$.',
                    s: 'Rodrigues-Formel: $$\\boxed{R=I+\\sin\\theta\\,[\\hat n]_\\times+(1-\\cos\\theta)\\,[\\hat n]_\\times^2}$$ Aequivalent: $R=\\hat n\\hat n^T+\\cos\\theta(I-\\hat n\\hat n^T)+\\sin\\theta\\,[\\hat n]_\\times$ (zerlegt in Parallel- und Senkrecht-Anteil). Praktisch fuer Quaternion-zu-Matrix-Umrechnung und SO(3)-Exponential-Map. <em>Quelle:</em> Murray/Li/Sastry, A Mathematical Introduction to Robotic Manipulation, CRC Press 1994, §2.2.2.'
                },
                {
                    q: 'Erlaeutere den Unterschied zwischen Spatial Jacobian $J^s$ und Body Jacobian $J^b$.',
                    h: 'Bezugsframe: Welt vs. End-Effektor.',
                    s: 'Spatial Jacobian: $V^s=J^s(\\theta)\\dot\\theta$ — Twist $V^s$ im Weltrahmen. Body Jacobian: $V^b=J^b(\\theta)\\dot\\theta$ — Twist im End-Effektor-Frame. Zusammenhang: $J^s=\\mathrm{Ad}_{T_{sb}}\\,J^b$. Beide haben identischen Rang und identische Singularitaeten ($|\\det J^s|=|\\det J^b|$). Wahl haengt vom Reglerentwurf ab (operationaler Raum vs. Tool-Frame-Kommando). <em>Quelle:</em> Lynch/Park 2017, §5.1.'
                },
                {
                    q: 'Was beschreibt das Manipulability-Ellipsoid $JJ^T$? Wozu nutzt man es im Pose-Entwurf?',
                    h: 'Bild der Einheits-Kugel unter $J$ im Endeffektor-Geschwindigkeitsraum.',
                    s: 'Fuer $\\dot\\theta$ auf der Einheits-Kugel ($\\|\\dot\\theta\\|=1$) liegt $\\dot p=J\\dot\\theta$ auf einem Ellipsoid mit Halbachsen $\\sigma_i$ (Singulaerwerte von $J$). Volumen $\\propto\\sqrt{\\det(JJ^T)}$ (Yoshikawa-Manipulability). Anwendung: Pose mit moeglichst sphaerischem Ellipsoid (Konditionszahl $\\sigma_{max}/\\sigma_{min}\\to 1$) gewaehlt, um isotrope Bewegung und numerische Robustheit zu erreichen. <em>Quelle:</em> Yoshikawa, Foundations of Robotics, MIT Press 1990, §4.5; Siciliano et al. 2010, §3.9.'
                },
                {
                    q: 'Zeige: $\\dot RR^T$ ist stets schiefsymmetrisch.',
                    h: 'Differenziere die Orthogonalitaetsbedingung $RR^T=I$ nach der Zeit.',
                    s: '$\\tfrac{d}{dt}(RR^T)=\\dot R R^T+R\\dot R^T=0\\Rightarrow \\dot R R^T=-R\\dot R^T=-(\\dot R R^T)^T$. Eine Matrix $S$ mit $S=-S^T$ ist schiefsymmetrisch. $$\\boxed{S\\equiv\\dot R R^T=[\\omega]_\\times}$$ definiert den raeumlichen Winkelgeschwindigkeitsvektor $\\omega\\in\\mathbb{R}^3$ (drei unabhaengige Eintraege). <em>Quelle:</em> Lynch/Park 2017, §3.2.2.'
                },
                {
                    q: 'Welche Gelenkstruktur hat der klassische „Stanford Manipulator" (Scheinman 1969)?',
                    h: '6-DOF, ein Schubgelenk, fuenf Drehgelenke.',
                    s: 'Stanford-Manipulator: $\\mathrm{RRPRRR}$ — zwei Schulter-Drehgelenke, ein Schubgelenk (radiale Erweiterung), drei Drehgelenke im Hand-Gelenk (Spherical Wrist). Spaeter Vorbild fuer PUMA. Vorteil: weite Reichweite bei kompakter Basis. Nachteil: Schubgelenk im Mittelarm reduziert Steifigkeit. <em>Quelle:</em> Spong et al. 2020, §1.3.3; Scheinman, Design of a Computer Controlled Manipulator, Stanford AI Memo 92, 1969.'
                },
                {
                    q: 'Ein 3-DOF planarer Roboter ($l_1=l_2=l_3=1$) soll die Pose $(x,y,\\phi)=(1,1,90°)$ erreichen ($\\phi$ Orientierung des Endeffektors). Berechne $\\theta_1,\\theta_2,\\theta_3$ (Ellbogen-Up).',
                    h: 'Trick: erst Handgelenk-Position $p_W=p-l_3(\\cos\\phi,\\sin\\phi)$ ableiten, dann 2-DOF-IK.',
                    s: 'Schritt 1: $p_W=(1,1)-1\\cdot(0,1)=(1,0)$. Schritt 2: 2-DOF-IK mit $p_W=(1,0)$, $l_1=l_2=1$: $\\cos\\theta_2=(1+0-1-1)/(2\\cdot 1\\cdot 1)=-0{,}5\\Rightarrow\\theta_2=\\pm 120°$. Ellbogen-Up $\\theta_2=120°$, $\\sin\\theta_2=\\sqrt 3/2$, $\\theta_1=\\operatorname{atan2}(0,1)-\\operatorname{atan2}(\\sqrt 3/2,\\,1-0{,}5)=0-60°=-60°$. Schritt 3: $\\theta_3=\\phi-\\theta_1-\\theta_2=90°-(-60°)-120°=30°$. $$\\boxed{\\theta=(-60°,\\,120°,\\,30°)}$$ <em>Quelle:</em> Craig 2018, §4.7 (kinematische Entkopplung).'
                },
                {
                    q: 'Schreibe das Hamilton-Produkt zweier Quaternionen $q_1=(w_1,v_1)$ und $q_2=(w_2,v_2)$ in Skalar-/Vektor-Form.',
                    h: 'Skalar-Anteil getrennt, Vektor-Anteil mit Kreuzprodukt.',
                    s: '$$\\boxed{q_1\\otimes q_2=(w_1 w_2-v_1\\cdot v_2,\\ w_1 v_2+w_2 v_1+v_1\\times v_2)}$$ Nicht-kommutativ ($v_1\\times v_2\\neq v_2\\times v_1$). Entspricht der Verkettung zweier Rotationen: $R(q_1)R(q_2)=R(q_1\\otimes q_2)$. <em>Quelle:</em> Siciliano et al. 2010, §2.4.6; Murray/Li/Sastry 1994, Appendix A.'
                },
                {
                    q: 'Zeige, dass $J^+=J^T(JJ^T)^{-1}$ (Rechts-Pseudoinverse, $J\\in\\mathbb{R}^{m\\times n}$, $m<n$, Vollrang $m$) die Loesung $\\dot\\theta=J^+\\dot p$ mit minimaler Norm $\\|\\dot\\theta\\|$ liefert.',
                    h: 'Lagrange-Multiplikator: minimiere $\\tfrac12\\|\\dot\\theta\\|^2$ unter $J\\dot\\theta=\\dot p$.',
                    s: 'Lagrange: $\\mathcal{L}=\\tfrac12\\dot\\theta^T\\dot\\theta+\\lambda^T(\\dot p-J\\dot\\theta)$. Notwendige Bedingung $\\partial\\mathcal{L}/\\partial\\dot\\theta=\\dot\\theta-J^T\\lambda=0\\Rightarrow\\dot\\theta=J^T\\lambda$. Einsetzen in $J\\dot\\theta=\\dot p$: $JJ^T\\lambda=\\dot p\\Rightarrow\\lambda=(JJ^T)^{-1}\\dot p$. Daher $\\dot\\theta=J^T(JJ^T)^{-1}\\dot p=J^+\\dot p$ — diese Konstruktion erzeugt unter allen Loesungen die mit kleinstem $\\|\\dot\\theta\\|$. <em>Quelle:</em> Siciliano et al. 2010, §3.5; Lynch/Park 2017, §6.3.'
                },
                {
                    q: 'Nenne die drei typischen Singularitaetsarten eines 6R-Industrieroboters mit Spherical Wrist.',
                    h: 'Schulter, Ellbogen, Handgelenk.',
                    s: '<strong>Schulter-Singularitaet</strong>: Endeffektor durchquert die Drehachse von Gelenk 1 ($x_E=y_E=0$ in Basis-Koordinaten) — beliebige $\\theta_1$ ergeben dieselbe Position. <br><strong>Ellbogen-Singularitaet</strong>: Arm voll gestreckt ($\\theta_3=0$) oder zusammengeklappt — Verlust einer radialen Geschwindigkeitsrichtung. <br><strong>Handgelenk-Singularitaet</strong>: Achsen von Gelenk 4 und 6 fluchten (z.B. $\\theta_5=0$) — Verlust einer Rotations-DOF (klassische „Gimbal-Lock"). In allen drei Faellen $\\det J=0$, $J^{-1}$ unbeschraenkt; Damped Least Squares (siehe naechste Aufgabe) mildert die Folgen. <em>Quelle:</em> Spong et al. 2020, §4.10; Siciliano et al. 2010, §3.3.'
                },
                {
                    q: 'Was ist ein „Spherical Wrist" und welche Eigenschaft macht ihn algorithmisch wertvoll?',
                    h: 'Drei Drehachsen, die sich in einem Punkt schneiden.',
                    s: 'Spherical Wrist: drei Drehgelenke mit Achsen, die sich in einem einzigen Punkt — dem Handgelenk-Zentrum (wrist center) — schneiden. Daraus folgt direkt das <strong>Pieper-Kriterium</strong>: die inverse Kinematik des 6-DOF-Arms entkoppelt sich in „Position des Handgelenk-Zentrums" (3 Gleichungen fuer $\\theta_1,\\theta_2,\\theta_3$) und „Orientierung des Endeffektors" (3 Gleichungen fuer $\\theta_4,\\theta_5,\\theta_6$). Daher geschlossene Form-IK moeglich. PUMA, KUKA KR-Serie, ABB IRB-Serie nutzen alle ein Spherical Wrist. <em>Quelle:</em> Pieper, The Kinematics of Manipulators under Computer Control, Stanford AI Memo 72, 1968; Craig 2018, §4.4.'
                },
                {
                    q: 'Wann erfuellt ein 6R-Roboter das Pieper-Kriterium, und welche Konsequenz hat das?',
                    h: 'Drei aufeinanderfolgende Achsen schneiden sich in einem Punkt — oder drei aufeinanderfolgende Achsen sind parallel.',
                    s: 'Pieper-Kriterium: drei aufeinanderfolgende Drehachsen schneiden sich in einem Punkt (Spherical Wrist) <strong>oder</strong> drei aufeinanderfolgende Drehachsen sind paarweise parallel. Konsequenz: die inverse Kinematik laesst sich analytisch geschlossen loesen — Position und Orientierung entkoppeln sich, und uebrig bleiben polynomielle Gleichungssysteme niedrigen Grades. Praktisch fast alle 6R-Industrieroboter erfuellen das Kriterium. <em>Quelle:</em> Pieper Stanford AI Memo 72, 1968, Theorem 1; Spong et al. 2020, §4.4.'
                },
                {
                    q: 'Wie lautet die Damped-Least-Squares-(DLS-)Loesung fuer $\\dot\\theta$ und wozu dient der Daempfungsparameter $\\lambda$?',
                    h: 'Modifizierte Pseudoinverse mit $\\lambda^2 I$-Regularisierung.',
                    s: '$$\\boxed{\\dot\\theta=J^T(JJ^T+\\lambda^2 I)^{-1}\\dot p}$$ Aequivalent zur Minimierung von $\\|\\dot p-J\\dot\\theta\\|^2+\\lambda^2\\|\\dot\\theta\\|^2$. Der Parameter $\\lambda>0$ verhindert unbeschraenkte Gelenkgeschwindigkeiten nahe Singularitaeten ($\\sigma_i\\to 0$), opfert dafuer aber etwas Tracking-Genauigkeit. Typisches Schema: variable Daempfung $\\lambda(\\sigma_{min})=\\lambda_{max}$ fuer $\\sigma_{min}<\\sigma_0$, sonst $\\lambda=0$ (Nakamura/Hanafusa 1986). <em>Quelle:</em> Nakamura/Hanafusa, Inverse Kinematics with Singularity Robustness, ASME J. Dyn. Sys. Meas. Control 108(3), 1986; Siciliano et al. 2010, §3.5.4.'
                },
                {
                    q: 'Stelle die kubische Polynom-Trajektorie $\\theta(t)=a_0+a_1 t+a_2 t^2+a_3 t^3$ fuer $\\theta(0)=\\theta_0,\\ \\theta(T)=\\theta_f,\\ \\dot\\theta(0)=\\dot\\theta(T)=0$ auf.',
                    h: 'Vier Randbedingungen, vier Koeffizienten.',
                    s: '$\\theta(0)=\\theta_0\\Rightarrow a_0=\\theta_0$. $\\dot\\theta(0)=a_1=0$. $\\dot\\theta(T)=2a_2 T+3a_3 T^2=0\\Rightarrow a_2=-\\tfrac{3}{2}a_3 T$. Einsetzen in $\\theta(T)=\\theta_f$: $\\theta_0+(-\\tfrac{3}{2}a_3 T)T^2+a_3 T^3=\\theta_f\\Rightarrow -\\tfrac{1}{2}a_3 T^3=\\theta_f-\\theta_0\\Rightarrow a_3=-2(\\theta_f-\\theta_0)/T^3$, $a_2=3(\\theta_f-\\theta_0)/T^2$. $$\\boxed{\\theta(t)=\\theta_0+3\\,\\Delta\\theta\\,(t/T)^2-2\\,\\Delta\\theta\\,(t/T)^3}$$ mit $\\Delta\\theta=\\theta_f-\\theta_0$. <em>Quelle:</em> Craig 2018, §7.3; Spong et al. 2020, §5.3.'
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
                    s: '<strong>Lagrange</strong>: $\\tau=M(q)\\ddot q + C(q,\\dot q)\\dot q + g(q)$. Symbolisch geschlossen, konzeptionell klar (kin. + pot. Energie). Komplexität $O(n^4)$ symbolisch.<br><strong>Newton-Euler (rekursiv)</strong>: vorwärts propagieren von Geschwindigkeit/Beschleunigung, rückwärts Kräfte/Drehmomente. $O(n)$ je Iteration, ideal für Echtzeit-Inverse-Dynamik.<br>In modernen Frameworks (KDL, Pinocchio): Newton-Euler-Rekursion bevorzugt für Echtzeit; Lagrange für analytische Untersuchungen, Linearisierung um Arbeitspunkt, Reglerentwurf.'                },
                {
                    q: 'Erlaeutere die Twist-Darstellung $V=(\\omega,v)\\in\\mathbb{R}^6$ eines starren Koerpers im Raum.',
                    h: 'Winkelgeschwindigkeit plus lineare Geschwindigkeit eines mit dem Koerper bewegten Bezugspunkts.',
                    s: 'Ein Twist (Chasles 1830) parametriert die augenblickliche Bewegung eines starren Koerpers durch eine Schraube: Drehachse $\\hat n$, Winkelgeschwindigkeit $\\omega=\\dot\\theta\\hat n$, Translation $v=-\\omega\\times r+h\\omega$ entlang der Achse ($r$ Achsenpunkt, $h$ Schraubsteigung). Spatial-Twist: $V^s=(\\omega^s, v^s)$ im Weltrahmen. Aequivalente Matrixform: $[V]=\\begin{pmatrix}[\\omega]_\\times & v\\\\ 0 & 0\\end{pmatrix}\\in\\mathfrak{se}(3)$, sodass $\\dot T T^{-1}=[V^s]$. <em>Quelle:</em> Lynch/Park 2017, §3.3.2; Murray/Li/Sastry 1994, §2.3.'
                },
                {
                    q: 'Definiere die Adjoint-Matrix $\\mathrm{Ad}_T$ einer Homogenmatrix $T=(R,d)$ und nenne ihre Anwendung.',
                    h: '6x6 Matrix, transformiert Twists zwischen Frames.',
                    s: '$$\\boxed{\\mathrm{Ad}_T=\\begin{pmatrix}R & 0\\\\ [d]_\\times R & R\\end{pmatrix}\\in\\mathbb{R}^{6\\times 6}}$$ Anwendung: $V^a=\\mathrm{Ad}_{T_{ab}}V^b$ transformiert einen Twist vom Frame $b$ in den Frame $a$. Auch fuer Wrenches (Kraft-Drehmoment-Paare): $F^a=\\mathrm{Ad}_{T_{ab}}^T F^b$ (kontravariant). Multiplikativ: $\\mathrm{Ad}_{T_1 T_2}=\\mathrm{Ad}_{T_1}\\mathrm{Ad}_{T_2}$. <em>Quelle:</em> Lynch/Park 2017, §3.3.2.'
                },
                {
                    q: 'Wie lautet die geschlossene Form fuer $e^{[\\hat n]_\\times \\theta}$ und warum konvergiert die Reihe (Cayley-Hamilton)?',
                    h: 'Aus $\\|\\hat n\\|=1$ folgt $[\\hat n]_\\times^3=-[\\hat n]_\\times$.',
                    s: 'Fuer $\\|\\hat n\\|=1$ gilt nach Cayley-Hamilton $[\\hat n]_\\times^3=-[\\hat n]_\\times$. Die Reihe $e^{[\\hat n]_\\times\\theta}=\\sum_k \\tfrac{\\theta^k}{k!}[\\hat n]_\\times^k$ kollabiert: $$\\boxed{e^{[\\hat n]_\\times\\theta}=I+\\sin\\theta\\,[\\hat n]_\\times+(1-\\cos\\theta)\\,[\\hat n]_\\times^2}$$ (Rodrigues-Formel). Damit ist $\\mathrm{SO}(3)$ als $\\exp(\\mathfrak{so}(3))$ surjektiv abgedeckt — jede Rotation laesst sich durch genau einen Achs-Winkel mit $\\theta\\in[0,\\pi]$ darstellen (bis auf antipodale Mehrdeutigkeit). <em>Quelle:</em> Murray/Li/Sastry 1994, §2.2.2 Prop. 2.8.'
                },
                {
                    q: 'Stelle das klassische Impedance-Control-Gesetz nach Hogan auf. Wozu dient es?',
                    h: 'Soll-Verhalten als virtuelles Masse-Daempfer-Feder-System.',
                    s: 'Ziel: am Endeffektor verhaelt sich der Roboter wie ein Masse-Daempfer-Feder-System: $$\\boxed{M_d\\,\\ddot{\\tilde x}+D_d\\,\\dot{\\tilde x}+K_d\\,\\tilde x=-F_{ext}}$$ mit $\\tilde x=x-x_d$ (Pose-Fehler) und $F_{ext}$ Umgebungskontakt-Wrench. Realisierung: Gelenkmoment $\\tau=J^T\\!\\big(M_d J\\ddot\\theta+\\ldots-F_{ext}\\big)$, kompensiert durch interne Dynamik (Massenmatrix, Coriolis, Gravitation). $M_d, D_d, K_d$ sind 6x6 SPD-Parameter. Wichtig fuer Kontakt-Aufgaben (Schleifen, Assembly, Mensch-Roboter-Kollaboration). <em>Quelle:</em> Hogan, Impedance Control: An Approach to Manipulation Part I-III, ASME J. Dyn. Sys. Meas. Control 107(1), 1985; Siciliano et al. 2010, §9.4.'
                },
                {
                    q: 'Wie lautet das Operational-Space-Inverse-Dynamics-Gesetz nach Khatib und welcher Effekt entsteht am Endeffektor?',
                    h: 'Massenmatrix im operationalen Raum: $\\Lambda(x)=(J M^{-1} J^T)^{-1}$.',
                    s: 'Gelenkmoment: $$\\tau=J^T\\big[\\Lambda(x)F^*+\\mu(x,\\dot x)+p(x)\\big]+(I-J^T\\bar J^T)\\tau_0$$ mit $\\bar J=M^{-1}J^T\\Lambda$ (dynamisch konsistente Pseudoinverse), $\\mu$ Coriolis im operationalen Raum, $p$ Gravitation. Bewirkt am Endeffektor: $\\Lambda\\ddot x=F^*$ — entkoppelte, linearisierte Massenwahrnehmung in jeder kartesischen Achse. Der $\\tau_0$-Term nutzt Redundanz im Nullraum fuer sekundaere Aufgaben (Joint-Limit-Avoidance, Singularitaets-Vermeidung). <em>Quelle:</em> Khatib, A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation, IEEE J. Robotics and Automation RA-3(1), 1987.'
                },
                {
                    q: 'Trapezoidales Geschwindigkeitsprofil zwischen $\\theta_0=0$ und $\\theta_f=2\\,\\text{rad}$ mit $v_{max}=1\\,\\text{rad/s}$ und $a_{max}=2\\,\\text{rad/s}^2$. Bestimme Beschleunigungs-/Konstant-/Bremsphase und Gesamtzeit.',
                    h: 'Pruefe: erreicht der Soll-Weg $v_{max}$? Falls $|\\theta_f-\\theta_0|<v_{max}^2/a_{max}$ wird das Profil dreieckig.',
                    s: 'Pruefung: $v_{max}^2/a_{max}=1/2=0{,}5\\,\\text{rad}<2\\,\\text{rad}\\Rightarrow$ trapezoidal moeglich. Beschleunigungszeit $t_a=v_{max}/a_{max}=0{,}5\\,\\text{s}$, Beschleunigungsweg $\\Delta\\theta_a=\\tfrac12 a_{max}t_a^2=0{,}25\\,\\text{rad}$. Konstantphase: $\\Delta\\theta_v=2-2\\cdot 0{,}25=1{,}5\\,\\text{rad}$, $t_v=\\Delta\\theta_v/v_{max}=1{,}5\\,\\text{s}$. Symmetrische Bremsphase $t_d=0{,}5\\,\\text{s}$. $$\\boxed{T_{total}=t_a+t_v+t_d=0{,}5+1{,}5+0{,}5=2{,}5\\,\\text{s}}$$ <em>Quelle:</em> Spong et al. 2020, §5.4; Craig 2018, §7.5.'
                },
                {
                    q: 'Wie verlaeuft die geschlossene IK eines PUMA-aehnlichen 6R-Roboters mit Spherical Wrist (Pieper-Kriterium erfuellt)?',
                    h: 'Entkopplung: Wrist Center positionsfreundlich, Wrist-Orientierung danach.',
                    s: 'Schritt 1: Wrist Center $p_W=p-d_6\\hat z_E$ (Endeffektor-Position abzueglich Hand-Versatz entlang Tool-z). Schritt 2: Loese $\\theta_1,\\theta_2,\\theta_3$ aus $p_W$ — typisch $\\theta_1=\\operatorname{atan2}(y_W,x_W)$ (zwei Schulter-Loesungen via $\\pm\\pi$), $\\theta_2,\\theta_3$ aus 2-DOF-Planar-IK in der Schulter-Ebene (zwei Ellbogen-Loesungen). Schritt 3: $R_{03}$ aus $\\theta_{1..3}$ berechnen, dann $R_{36}=R_{03}^T R_d$ (Soll-Endrotation $R_d$). $\\theta_4,\\theta_5,\\theta_6$ aus den 9 Eintraegen von $R_{36}$ als ZYZ-Eulerwinkel (zwei Loesungen via Vorzeichen von $\\sin\\theta_5$). Insgesamt bis zu $2\\times 2\\times 2=8$ Konfigurationen. <em>Quelle:</em> Craig 2018, §4.7; Spong et al. 2020, §4.4.'
                },
                {
                    q: 'Beschreibe das Hybrid-Force-Position-Control-Konzept nach Raibert/Craig. Welche Rolle spielt die Auswahl-Matrix $S$?',
                    h: 'Aufgabenraum-Aufteilung in komplementaere Unterraeume.',
                    s: 'Idee: in jeder kartesischen Achse wird entweder Position <strong>oder</strong> Kraft geregelt — nicht beides. Die diagonale Auswahl-Matrix $S=\\mathrm{diag}(s_1,\\ldots,s_6)$ mit $s_i\\in\\{0,1\\}$ partitioniert: Positions-Sollwert wird mit $S$ multipliziert, Kraft-Sollwert mit $I-S$. Steuer-Wrench: $F=S\\,F_{pos}(x-x_d)+(I-S)\\,F_{force}(F_{ext}-F_d)$. Beispiel Schleifen: $z$-Achse Kraft, $x,y$ Position. Voraussetzung: Constraint-Frame an der Kontaktstelle korrekt definiert (Mason 1981: explizite Constraint-Geometrie). <em>Quelle:</em> Raibert/Craig, Hybrid Position/Force Control of Manipulators, ASME J. Dyn. Sys. Meas. Control 102(2), 1981; Siciliano et al. 2010, §9.5.'
                },
                {
                    q: 'Eine Jacobi-Matrix hat Singulaerwerte $\\sigma_1=2,\\ \\sigma_2=0{,}5,\\ \\sigma_3=0{,}01$. Bewerte die Konditionierung und nenne geeignete Massnahmen.',
                    h: 'Konditionszahl $\\kappa=\\sigma_{max}/\\sigma_{min}$, Manipulability $w=\\prod\\sigma_i$.',
                    s: '$\\kappa=2/0{,}01=200$ — nahe-singulaere Konfiguration (Faustregel $\\kappa>100$ kritisch). Manipulability $w=\\sigma_1\\sigma_2\\sigma_3=2\\cdot 0{,}5\\cdot 0{,}01=0{,}01$. Konsequenzen: kleine Endeffektor-Bewegungen in der $u_3$-Richtung verlangen sehr hohe Gelenkgeschwindigkeiten, Messrauschen wird stark verstaerkt, $J^{-1}$ ist numerisch sensitiv. Massnahmen: (a) Damped Least Squares mit $\\lambda\\approx\\sigma_3$, (b) Pose umplanen (out of singularity), (c) Redundanz nutzen (Nullraum-Bewegung), (d) Singularitaet-robuste IK-Bibliotheken (KDL, Pinocchio). <em>Quelle:</em> Nakamura/Hanafusa 1986; Lynch/Park 2017, §6.3.'
                },
                {
                    q: 'Stelle das Bicycle-Modell eines Ackermann-Lenk-Fahrzeugs (Radstand $L$, Lenkwinkel $\\delta$, Hinterrad-Geschwindigkeit $v$) auf.',
                    h: 'Hinterrad als Bezug; momentaner Kruemmungsradius $R=L/\\tan\\delta$.',
                    s: 'Mit Hinterrad-Position $(x,y)$ und Fahrzeug-Orientierung $\\theta$: $\\dot x=v\\cos\\theta,\\ \\dot y=v\\sin\\theta,\\ \\dot\\theta=(v/L)\\tan\\delta$. $$\\boxed{\\dot\\theta=\\tfrac{v}{L}\\tan\\delta}$$ Aequivalenter Kruemmungsradius: $R=L/\\tan\\delta$. Bei $\\delta\\to 90°$ theoretisch $R\\to 0$; praktisch durch Lenkwinkel-Begrenzung $\\delta_{max}\\approx 30°-40°$ minimaler Wendekreis $R_{min}=L/\\tan\\delta_{max}$. Modell ignoriert Schlupf — gueltig fuer langsame Fahrt. <em>Quelle:</em> Siegwart/Nourbakhsh/Scaramuzza, Introduction to Autonomous Mobile Robots, 2nd ed., MIT Press 2011, §3.2.'
                },
                {
                    q: 'Was ist der Zero-Moment Point (ZMP) und welches Stabilitaetskriterium liefert er fuer humanoide Roboter?',
                    h: 'Punkt auf der Bodenflaeche, an dem die horizontale Komponente des Bodenreaktions-Moments verschwindet.',
                    s: 'ZMP: Punkt $P$ auf der Standflaeche, an dem die horizontalen Komponenten des Boden-Reaktions-Moments null sind ($M_x(P)=M_y(P)=0$). Liegt $P$ <strong>innerhalb</strong> des Stuetzpolygons (Convex Hull der Bodenkontaktpunkte), so kippt der Roboter nicht — dynamisches Stabilitaetskriterium nach Vukobratović. Wesentlich strenger als rein statisches Schwerpunkts-Kriterium (Center of Pressure $=$ ZMP nur bei planar liegendem Fuss). Anwendung: ZMP-Trajektorie wird vorab geplant, Schwerpunkts-Trajektorie folgt via Linear-Inverted-Pendulum-Model (Kajita et al. 2003). <em>Quelle:</em> Vukobratović/Borovac, Zero-Moment Point — Thirty Five Years of Its Life, Int. J. Humanoid Robotics 1(1), 2004; Kajita/Hirukawa/Harada/Yokoi, Introduction to Humanoid Robotics, Springer 2014, §3.2.'
                },
                {
                    q: 'Welche zwei Eigenschaften hat die Massenmatrix $M(q)$ in $\\tau=M\\ddot q+C\\dot q+g$, und wie sind $M$ und $C$ ueber die Christoffel-Symbole verknuepft?',
                    h: '$M=M^T>0$. $\\dot M-2C$ schiefsymmetrisch bei Christoffel-Wahl von $C$.',
                    s: '(1) $M(q)=M(q)^T$ symmetrisch positiv definit (folgt aus $T=\\tfrac12\\dot q^T M\\dot q>0$ fuer $\\dot q\\neq 0$). <br>(2) $C(q,\\dot q)$ aus Christoffel-Symbolen erster Art: $$C_{ij}(q,\\dot q)=\\sum_k c_{ijk}\\,\\dot q_k,\\quad c_{ijk}=\\tfrac12\\!\\left(\\tfrac{\\partial M_{ij}}{\\partial q_k}+\\tfrac{\\partial M_{ik}}{\\partial q_j}-\\tfrac{\\partial M_{jk}}{\\partial q_i}\\right)$$ Mit dieser Wahl ist $\\dot M-2C$ <strong>schiefsymmetrisch</strong> — Schluesselresultat fuer Lyapunov-stabile Computed-Torque- und Adaptive-Regler (Passivitaet, Slotine/Li 1987). <em>Quelle:</em> Spong et al. 2020, §6.4; Slotine/Li, On the Adaptive Control of Robot Manipulators, Int. J. Robotics Research 6(3), 1987.'
                },
                {
                    q: 'Beschreibe den Rapidly-Exploring Random Tree (RRT) Pfadplaner in Pseudocode.',
                    h: 'Wachsender Baum aus zufaelligen Sample-Punkten Richtung $x_{rand}$.',
                    s: '<pre><code>RRT(x_init, x_goal, n_max):\n  tree = {x_init}\n  for k = 1..n_max:\n    x_rand = sample_free_space()         # ggf. mit Bias zu x_goal\n    x_near = nearest(tree, x_rand)\n    x_new  = steer(x_near, x_rand, eps)  # max. Schrittweite eps\n    if collision_free(x_near, x_new):\n      tree.add_node(x_new)\n      tree.add_edge(x_near, x_new)\n      if dist(x_new, x_goal) < tol:\n        return path(tree, x_init, x_new)\n  return failure</code></pre> Probabilistisch vollstaendig (LaValle 1998): bei $n\\to\\infty$ findet RRT einen Pfad, falls einer existiert. Erweiterungen: RRT-Connect (bidirektional, Kuffner/LaValle 2000), RRT$^*$ (asymptotisch optimal, Karaman/Frazzoli 2011). <em>Quelle:</em> LaValle, Rapidly-Exploring Random Trees: A New Tool for Path Planning, TR 98-11 Iowa State University, 1998; LaValle, Planning Algorithms, Cambridge 2006, §5.5.'
                },
                {
                    q: 'Welche zwei Normen regeln die Mensch-Roboter-Kollaboration (Cobot-Sicherheit) und welche vier kollaborativen Betriebsarten sind nach ISO/TS 15066 definiert?',
                    h: 'Stop, Hand Guiding, Speed/Separation, Power/Force.',
                    s: 'Normen: <strong>ISO 10218-1/-2:2011</strong> (sicherheitsrelevante Anforderungen an Industrieroboter) und <strong>ISO/TS 15066:2016</strong> (kollaborative Roboter, biomechanische Grenzwerte). Vier kollaborative Betriebsarten: <ol><li><strong>Safety-rated Monitored Stop</strong> — Roboter haelt an, sobald ein Mensch im geteilten Raum ist.</li><li><strong>Hand Guiding</strong> — Bediener fuehrt Roboter manuell, nur mit reduzierter Geschwindigkeit.</li><li><strong>Speed and Separation Monitoring (SSM)</strong> — geschwindigkeitsabhaengiger Sicherheitsabstand $S_p(t)=v_h T_r+v_r T_s+B+C$ (ISO/TS 15066 §5.5.4).</li><li><strong>Power and Force Limiting (PFL)</strong> — Kontakt zulaessig, Kraft/Druck unter Schmerzschwellen aus Anhang A (z.B. Brust 140 N transient, 110 N quasi-statisch).</li></ol> <em>Quelle:</em> ISO 10218-1:2011 §5; ISO/TS 15066:2016 §5.5 und Anhang A.'
                }
            ]
        ]
    };
})();
