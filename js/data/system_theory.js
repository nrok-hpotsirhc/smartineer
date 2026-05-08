/* Systemtheorie */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'system_theory';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Systemtheorie',
        desc: 'LTI-Systeme, Linearität, Zeitinvarianz, Kausalität, Stabilität (BIBO), Faltung, Zustandsraum, Steuerbarkeit/Beobachtbarkeit.',
        formulas: `
            <strong>System-Eigenschaften</strong><br>
            Linear: $T\\{\\alpha x_1+\\beta x_2\\}=\\alpha T\\{x_1\\}+\\beta T\\{x_2\\}$<br>
            Zeitinvariant: $T\\{x(t-T_0)\\}=y(t-T_0)$<br>
            Kausal: $y(t_0)$ hängt nur von $x(t\\le t_0)$ ab<br>
            BIBO-stabil: $\\int_{-\\infty}^{\\infty}|h(t)|\\,dt < \\infty$<br><br>
            <strong>Faltung</strong><br>
            $(f*g)(t)=\\int_{-\\infty}^{\\infty}f(\\tau)g(t-\\tau)\\,d\\tau$<br>
            $f(t)*\\delta(t-T)=f(t-T)$<br>
            Faltungssatz: $\\mathcal{L}\\{f*g\\}=F(s)G(s)$<br><br>
            <strong>Zustandsraum (LTI)</strong><br>
            $\\dot x = Ax+Bu,\\ y=Cx+Du$<br>
            Übertragungsfunktion: $G(s)=C(sI-A)^{-1}B+D$<br>
            Steuerbarkeit: $\\operatorname{rank}[B,\\,AB,\\,A^2 B,\\,\\dots,\\,A^{n-1}B]=n$<br>
            Beobachtbarkeit: $\\operatorname{rank}[C^T,\\,A^T C^T,\\,\\dots]^T=n$<br><br>
            <strong>Pol-Stabilität</strong><br>
            Stabil $\\iff$ alle Pole bzw. EW von $A$ in linker Halbebene<br><br>
            <strong>Frequenzgang</strong><br>
            $G(j\\omega) = |G(j\\omega)|\\,e^{j\\arg G(j\\omega)}$, sinusförmiges Eingangs $\\Rightarrow$ sinusförmiges Ausgangs (gleiche Frequenz)<br><br>
            <strong>Faltungs-Eigenschaften</strong><br>
            kommutativ $f*g=g*f$, assoziativ, distributiv, $\\delta$ neutral<br><br>
            <strong>Stabilitäts-Margin</strong><br>
            Phasenrand $\\varphi_R = 180° + \\arg G(j\\omega_d)$ bei $|G(j\\omega_d)|=1$<br>
            Amplitudenrand $A_R = 1/|G(j\\omega_\\pi)|$ bei $\\arg G(j\\omega_\\pi)=-180°$<br><br>
            <strong>Small-Gain-Theorem</strong><br>
            Rückkopplung von $G_1, G_2$ stabil, falls $\\lVert G_1\\rVert_\\infty \\cdot \\lVert G_2\\rVert_\\infty < 1$
        `,
        levels: [
            // L1
            [
                {
                    q: 'Untersuche, ob das System $y(t)=3 x(t)+2$ linear ist.',
                    h: 'Superposition prüfen: $T\\{ax_1+bx_2\\}\\stackrel{?}{=}aT\\{x_1\\}+bT\\{x_2\\}$.',
                    s: '$T\\{ax_1+bx_2\\}=3(ax_1+bx_2)+2=3ax_1+3bx_2+2$.<br>$aT\\{x_1\\}+bT\\{x_2\\}=a(3x_1+2)+b(3x_2+2)=3ax_1+3bx_2+2(a+b)$.<br>Unterschied: $2$ vs. $2(a+b)$. <strong>Nicht linear</strong> (affines System wegen Offset $+2$).'
                },
                {
                    q: 'Untersuche, ob das System $y(t)=x(t-2)$ kausal und zeitinvariant ist.',
                    h: 'Kausal: $y(t_0)$ braucht nur $x(t\\le t_0)$. Zeitinvarianz: Verschiebung von $x$ um $T_0$ ergibt Verschiebung von $y$ um $T_0$.',
                    s: 'Kausal: $y(t)$ hängt von $x(t-2)$, also vergangenem Wert. ✓<br>Zeitinvarianz: $x(t-T_0)$ als Eingang ergibt $y_{neu}(t)=x(t-T_0-2)=y(t-T_0)$. ✓<br>$$\\boxed{\\text{Kausal und zeitinvariant}}$$'
                },
                {
                    q: 'Bestimme die Faltung $(f*\\delta)(t)$ mit $\\delta(t-T_0)$.',
                    h: 'Siebeigenschaft des Dirac-Impulses.',
                    s: 'Definition: $\\int f(\\tau)\\delta(t-T_0-\\tau)d\\tau$. Argument null bei $\\tau=t-T_0$.<br>$$\\boxed{(f*\\delta_{T_0})(t)=f(t-T_0)}$$ Reine Verschiebung um $T_0$.'
                },
                {
                    q: 'Wie lauten die Standardgleichungen eines LTI-Systems im Zustandsraum?',
                    h: 'Erste Gleichung beschreibt Zustandsdynamik, zweite den Ausgang.',
                    s: '$\\dot x(t)=Ax(t)+Bu(t)$ (Zustandsdifferentialgleichung)<br>$y(t)=Cx(t)+Du(t)$ (Ausgangsgleichung)<br>$x$ Zustandsvektor, $u$ Eingang, $y$ Ausgang. $A,B,C,D$ system-, eingangs-, ausgangs-, durchgriffs-Matrizen.'
                },
                {
                    q: 'Bestimme die Übertragungsfunktion $G(s)$ aus dem Zustandsraum mit $A=-2$, $B=1$, $C=3$, $D=0$ (skalar).',
                    h: '$G(s)=C(sI-A)^{-1}B+D$.',
                    s: '$G(s)=3\\cdot \\dfrac{1}{s-(-2)}\\cdot 1=\\dfrac{3}{s+2}$.<br>$$\\boxed{G(s)=\\dfrac{3}{s+2}}$$'
                },
                {
                    q: 'Ein System hat Impulsantwort $h(t)=e^{-t}\\sigma(t)$. Ist es BIBO-stabil?',
                    h: 'BIBO: $\\int|h(t)|dt < \\infty$.',
                    s: '$\\int_0^\\infty e^{-t}dt=[-e^{-t}]_0^\\infty=1<\\infty$. ✓<br>$$\\boxed{\\text{BIBO-stabil}}$$'
                },
                {
                    q: 'Welche Frequenz hat der Ausgang eines LTI-Systems mit Eingangs $u(t) = \\sin(5t)$? Begründe.',
                    h: 'Eigenschaft sinusförmiger LTI-Antwort.',
                    s: 'LTI-Systeme haben sinus-treue Eigenschaft: bei sinusförmigem Eingang (Frequenz $\\omega$) ist der eingeschwungene Ausgang ebenfalls sinusförmig mit <strong>gleicher Frequenz</strong> $\\omega=5\\,\\text{rad/s}$. Lediglich Amplitude und Phase ändern sich gemäß $|G(j\\omega)|$ bzw. $\\arg G(j\\omega)$.'
                },
                {
                    q: 'Beweise die Kommutativität der Faltung: $f*g=g*f$.',
                    h: 'Substitution $\\tau\' = t-\\tau$.',
                    s: '$(f*g)(t)=\\int f(\\tau)g(t-\\tau)d\\tau$. Substitution $\\tau\'=t-\\tau$, $d\\tau\'=-d\\tau$:<br>$=\\int f(t-\\tau\')g(\\tau\')d\\tau\' = (g*f)(t)$. ∎'
                },
                {
                    q: 'Untersuche, ob das System $y(t)=x^2(t)$ linear ist.',
                    h: 'Superposition prüfen.',
                    s: '$T\\{ax_1+bx_2\\}=(ax_1+bx_2)^2=a^2 x_1^2+2ab x_1 x_2+b^2 x_2^2$.<br>$aT\\{x_1\\}+bT\\{x_2\\}=a x_1^2+b x_2^2$.<br>$\\neq$ allgemein. <strong>Nicht linear</strong> (memoryless nichtlineare Funktion).'
                },
                {
                    q: 'Bestimme die Pole von $G(s)=\\dfrac{s+2}{s^2+5s+6}$ und beurteile die Stabilität.',
                    h: 'Nenner-Nullstellen.',
                    s: '$s^2+5s+6=(s+2)(s+3)=0\\Rightarrow s_{1,2}=-2,-3$.<br>Pol bei $s=-2$ kürzt sich gegen Zähler-Nullstelle (Pol-Nullstellen-Kürzung).<br>Effektiv: $G(s)=1/(s+3)$, einziger Pol $s=-3$ in linker Halbebene.<br>$$\\boxed{\\text{BIBO-stabil}}$$'
                }
            ],
            // L2
            [
                {
                    q: 'Berechne die Faltung $(f*g)(t)$ für $f(t)=\\sigma(t)$ und $g(t)=e^{-t}\\sigma(t)$.',
                    h: '$\\int_0^t 1\\cdot e^{-(t-\\tau)}d\\tau$ (kausal).',
                    s: 'Da beide für $t<0$ verschwinden: $(f*g)(t)=\\int_0^t e^{-(t-\\tau)}d\\tau = e^{-t}\\int_0^t e^\\tau d\\tau = e^{-t}(e^t-1)=1-e^{-t}$ für $t\\ge 0$.<br>$$\\boxed{(f*g)(t)=(1-e^{-t})\\sigma(t)}$$ (Sprungantwort eines PT1).'
                },
                {
                    q: 'Bestimme die Eigenwerte und damit die Stabilität von $A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}$.',
                    h: '$\\det(A-\\lambda I)=0$.',
                    s: '$\\det\\begin{pmatrix}-\\lambda & 1\\\\ -2 & -3-\\lambda\\end{pmatrix}=\\lambda(\\lambda+3)+2=\\lambda^2+3\\lambda+2=(\\lambda+1)(\\lambda+2)=0$.<br>$\\lambda_1=-1,\\lambda_2=-2\\Rightarrow$ stabil.'
                },
                {
                    q: 'Untersuche die Steuerbarkeit von $A=\\begin{pmatrix}0&1\\\\0&-1\\end{pmatrix}$, $B=\\begin{pmatrix}0\\\\1\\end{pmatrix}$.',
                    h: 'Steuerbarkeitsmatrix $\\mathcal{C}=[B,\\,AB]$. Vollrang $n=2$ erforderlich.',
                    s: '$AB=\\begin{pmatrix}0&1\\\\0&-1\\end{pmatrix}\\begin{pmatrix}0\\\\1\\end{pmatrix}=\\begin{pmatrix}1\\\\-1\\end{pmatrix}$.<br>$\\mathcal{C}=\\begin{pmatrix}0&1\\\\1&-1\\end{pmatrix}$. $\\det=0\\cdot(-1)-1\\cdot 1=-1\\neq 0$. Vollrang.<br>$$\\boxed{\\text{Steuerbar}}$$'
                },
                {
                    q: 'Aus $G(s)=\\dfrac{1}{s^2+3s+2}$ generiere eine Zustandsraum-Realisierung in Regelungsnormalform.',
                    h: 'Standard: $\\dot x_1=x_2$, $\\dot x_2=-a_0 x_1 - a_1 x_2 + u$, $y=b_0 x_1+\\dots$.',
                    s: 'Mit $a_0=2,\\ a_1=3,\\ b_0=1$:<br>$A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}$, $B=\\begin{pmatrix}0\\\\1\\end{pmatrix}$, $C=\\begin{pmatrix}1&0\\end{pmatrix}$, $D=0$.'
                },
                {
                    q: 'Untersuche, ob das System $y(t)=t\\,x(t)$ zeitinvariant ist.',
                    h: 'Verschiebe Eingang um $T_0$ und vergleiche mit verschobenem Ausgang.',
                    s: 'Eingang verschoben: $T\\{x(t-T_0)\\}=t\\,x(t-T_0)$.<br>Ausgang verschoben: $y(t-T_0)=(t-T_0)\\,x(t-T_0)$.<br>$t\\,x(t-T_0) \\neq (t-T_0)x(t-T_0)$ allgemein.<br>$$\\boxed{\\text{Nicht zeitinvariant (zeitvariabel wegen explizitem }t\\text{).}}$$'
                },
                {
                    q: 'Berechne die Impulsantwort des Systems mit Übertragungsfunktion $G(s)=\\dfrac{1}{s+5}$ und gib den Wert bei $t=0{,}2\\,\\text{s}$ an.',
                    h: '$h(t)=\\mathcal{L}^{-1}\\{G(s)\\}$.',
                    s: '$h(t)=e^{-5t}\\sigma(t)$.<br>$h(0{,}2)=e^{-1}\\approx 0{,}368$.<br>$$\\boxed{h(0{,}2)\\approx 0{,}368}$$'
                },
                {
                    q: 'Berechne die statische Verstärkung von $G(s)=\\dfrac{4(s+1)}{s^2+3s+2}$.',
                    h: 'Endwertsatz / $G(0)$.',
                    s: '$K_s = \\lim_{s\\to 0} G(s) = G(0) = \\dfrac{4\\cdot 1}{0+0+2} = 2$.<br>$$\\boxed{K_s = 2}$$ Bedeutung: bei Sprung-Eingang Höhe $1$ stellt sich stationär $y_\\infty = 2$ ein.'
                },
                {
                    q: 'Frequenzgang: berechne $|G(j\\omega)|$ und $\\arg G(j\\omega)$ für $G(s)=1/(s+1)$ bei $\\omega = 1\\,\\text{rad/s}$.',
                    h: '$s=j\\omega$ einsetzen.',
                    s: '$G(j\\cdot 1) = 1/(1+j) = (1-j)/2$.<br>$|G| = 1/\\sqrt{1^2+1^2} = 1/\\sqrt 2 \\approx 0{,}707$ (-3 dB).<br>$\\arg G = -\\arctan(1/1) = -45°$.<br>$$\\boxed{|G|\\approx 0{,}707,\\ \\arg G = -45°}$$ Eckfrequenz des PT1.'
                },
                {
                    q: 'Beobachtbarkeit prüfen: $A=\\begin{pmatrix}-1&0\\\\0&-2\\end{pmatrix}$, $C=\\begin{pmatrix}1&0\\end{pmatrix}$.',
                    h: '$\\mathcal{O}=\\begin{pmatrix}C\\\\CA\\end{pmatrix}$.',
                    s: '$CA=\\begin{pmatrix}1&0\\end{pmatrix}\\begin{pmatrix}-1&0\\\\0&-2\\end{pmatrix}=\\begin{pmatrix}-1&0\\end{pmatrix}$.<br>$\\mathcal{O}=\\begin{pmatrix}1&0\\\\-1&0\\end{pmatrix}$, $\\det=0\\Rightarrow$ Rang $=1<2$.<br>$$\\boxed{\\text{Nicht beobachtbar}}$$ Mode $x_2$ (EW $-2$) ist von $C$ nicht messbar.'
                },
                {
                    q: 'Endwertsatz: berechne $\\lim_{t\\to\\infty} y(t)$ für $Y(s) = \\dfrac{2}{s(s+3)}$.',
                    h: '$\\lim_{t\\to\\infty} y(t) = \\lim_{s\\to 0} sY(s)$ (falls Pole von $sY(s)$ in LHE).',
                    s: '$sY(s) = 2/(s+3)$. Pol bei $s=-3$ (LHE). ✓<br>$\\lim_{s\\to 0} 2/(s+3) = 2/3$.<br>$$\\boxed{y_\\infty = 2/3}$$'
                }
            ],
            // L3
            [
                {
                    q: 'Berechne die Übertragungsfunktion eines Zustandsraummodells mit $A=\\begin{pmatrix}-1&1\\\\0&-2\\end{pmatrix}$, $B=\\begin{pmatrix}0\\\\1\\end{pmatrix}$, $C=\\begin{pmatrix}1&0\\end{pmatrix}$, $D=0$.',
                    h: '$G(s)=C(sI-A)^{-1}B$.',
                    s: '$sI-A=\\begin{pmatrix}s+1 & -1\\\\ 0 & s+2\\end{pmatrix}$. Determinante: $(s+1)(s+2)$.<br>Inverse: $\\dfrac{1}{(s+1)(s+2)}\\begin{pmatrix}s+2 & 1\\\\ 0 & s+1\\end{pmatrix}$.<br>$(sI-A)^{-1}B=\\dfrac{1}{(s+1)(s+2)}\\begin{pmatrix}1\\\\ s+1\\end{pmatrix}$.<br>$C\\cdot$ ergibt: $G(s)=\\dfrac{1}{(s+1)(s+2)}=\\dfrac{1}{s^2+3s+2}$.'
                },
                {
                    q: 'Faltungssatz anwenden: berechne $h(t)*h(t)$ für $h(t)=e^{-at}\\sigma(t)$ mittels Laplace.',
                    h: '$\\mathcal{L}\\{h*h\\}=H(s)^2$, dann inverse Laplace.',
                    s: '$H(s)=1/(s+a)$, $H^2=1/(s+a)^2$.<br>$\\mathcal{L}^{-1}\\{1/(s+a)^2\\}=t e^{-at}\\sigma(t)$.<br>$$\\boxed{(h*h)(t)=t\\,e^{-at}\\sigma(t)}$$'
                },
                {
                    q: 'Beobachtbarkeit prüfen: $A=\\begin{pmatrix}1&1\\\\0&2\\end{pmatrix}$, $C=\\begin{pmatrix}1&0\\end{pmatrix}$.',
                    h: 'Beobachtbarkeitsmatrix $\\mathcal{O}=\\begin{pmatrix}C\\\\ CA\\end{pmatrix}$. Vollrang nötig.',
                    s: '$CA=\\begin{pmatrix}1&0\\end{pmatrix}\\begin{pmatrix}1&1\\\\0&2\\end{pmatrix}=\\begin{pmatrix}1&1\\end{pmatrix}$.<br>$\\mathcal{O}=\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$, $\\det=1\\neq 0\\Rightarrow$ vollrang.<br>$$\\boxed{\\text{Beobachtbar}}$$'
                },
                {
                    q: 'Lyapunov-Stabilität: Bestimme, ob das System $\\dot x=Ax$ mit $A=\\begin{pmatrix}0&1\\\\-1&-2\\end{pmatrix}$ asymptotisch stabil ist, durch Lösen von $A^T P+PA=-I$.',
                    h: 'Asymptotisch stabil $\\iff \\exists P=P^T>0$ mit $A^TP+PA=-I$.',
                    s: 'Ansatz $P=\\begin{pmatrix}p_1 & p_2\\\\ p_2 & p_3\\end{pmatrix}$.<br>$A^TP=\\begin{pmatrix}0 & -1\\\\ 1 & -2\\end{pmatrix}\\!P=\\begin{pmatrix}-p_2 & -p_3\\\\ p_1-2p_2 & p_2-2p_3\\end{pmatrix}$.<br>$PA=\\begin{pmatrix}-p_2 & p_1-2p_2\\\\ -p_3 & p_2-2p_3\\end{pmatrix}$.<br>Summe = $-I$:<br>(1,1): $-2p_2=-1\\Rightarrow p_2=0{,}5$<br>(2,2): $2p_2-4p_3=-1\\Rightarrow 1-4p_3=-1\\Rightarrow p_3=0{,}5$<br>(1,2)=(2,1): $p_1-2p_2-p_3=0\\Rightarrow p_1=2\\cdot 0{,}5+0{,}5=1{,}5$.<br>$P=\\begin{pmatrix}1{,}5 & 0{,}5\\\\ 0{,}5 & 0{,}5\\end{pmatrix}$. EW: char. Pol. $\\lambda^2-2\\lambda+(0{,}75-0{,}25)=\\lambda^2-2\\lambda+0{,}5=0$, $\\lambda=1\\pm\\sqrt{0{,}5}$. Beide positiv $\\Rightarrow P\\succ 0$.<br>$$\\boxed{\\text{Asymptotisch stabil}}$$'
                },
                {
                    q: 'Berechne die Lösung $x(t)$ des freien Systems $\\dot x=Ax$, $x(0)=x_0$, mit $A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}$ über Matrix-Exponential (diagonalisieren).',
                    h: '$x(t)=e^{At}x_0$, mit $e^{At}=Pe^{Dt}P^{-1}$ für diagonalisierbares $A=PDP^{-1}$.',
                    s: 'EW $\\lambda_1=-1,\\lambda_2=-2$ (siehe L2.2).<br>EV: $(A+I)v_1=0\\Rightarrow v_1=(1,-1)^T$. $(A+2I)v_2=0\\Rightarrow v_2=(1,-2)^T$.<br>$P=\\begin{pmatrix}1&1\\\\-1&-2\\end{pmatrix}$, $\\det P=-1$, $P^{-1}=\\begin{pmatrix}2&1\\\\-1&-1\\end{pmatrix}$.<br>$e^{At}=P\\begin{pmatrix}e^{-t}&0\\\\0&e^{-2t}\\end{pmatrix}P^{-1}$.<br>Für $x_0=(1,0)^T$: $P^{-1}x_0=(2,-1)^T$, $e^{Dt}P^{-1}x_0=(2e^{-t},-e^{-2t})^T$, $x(t)=(2e^{-t}-e^{-2t},\\ -2e^{-t}+2e^{-2t})^T$.'
                },
                {
                    q: 'Energie-Definitionen: Wann ist ein Signal energie- bzw. leistungsbegrenzt? Klassifiziere $x(t)=e^{-|t|}$ und $x(t)=\\cos(\\omega_0 t)$.',
                    h: 'Energie: $E=\\int|x|^2 dt < \\infty$. Leistung: $P=\\lim_T (1/T)\\int_{-T/2}^{T/2}|x|^2 dt < \\infty$.',
                    s: '$e^{-|t|}$: $E=\\int_{-\\infty}^{\\infty}e^{-2|t|}dt=2\\int_0^\\infty e^{-2t}dt=1<\\infty$. <strong>Energiesignal.</strong> $P=0$.<br>$\\cos\\omega_0 t$: $E=\\infty$ (periodisch). $P=\\lim_T (1/T)\\int (1+\\cos 2\\omega_0 t)/2\\,dt=1/2$. <strong>Leistungssignal.</strong>'
                },
                {
                    q: 'Bestimme Phasen- und Amplitudenrand für $G(s)=\\dfrac{1}{s(s+1)^2}$ in offener Schleife (Daumenwerte: Durchtrittsfrequenz, $\\omega_\\pi$).',
                    h: 'Phasenrand bei $|G|=1$; Amplitudenrand bei Phase $-180°$.',
                    s: 'Phase: $\\arg G(j\\omega) = -90°-2\\arctan(\\omega)$.<br>$-180°$ bei $-2\\arctan\\omega = -90° \\Rightarrow \\omega_\\pi = 1\\,\\text{rad/s}$.<br>$|G(j1)| = 1/(1\\cdot (\\sqrt 2)^2) = 1/2$. $A_R = 1/0{,}5 = 2$ ($6\\,\\text{dB}$).<br>Durchtrittsfrequenz: $|G(j\\omega_d)|=1$. Numerisch $\\omega_d \\approx 0{,}68$. $\\arg G(j 0{,}68)\\approx -90°-2\\cdot 34{,}2°=-158{,}4°$, $\\varphi_R \\approx 21{,}6°$.<br>Schwacher Phasenrand $\\Rightarrow$ in Praxis Lead-Glied zur Stabilisierung.'
                },
                {
                    q: 'Small-Gain-Theorem: stabilisiere die Rückkopplung von $G_1(s)=\\dfrac{0{,}5}{s+1}$ und $G_2(s)=\\dfrac{0{,}8}{s+2}$.',
                    h: '$\\lVert G\\rVert_\\infty = \\sup_\\omega |G(j\\omega)|$. Für PT1 beim Maximum bei $\\omega=0$.',
                    s: '$\\lVert G_1\\rVert_\\infty = |G_1(0)| = 0{,}5$.<br>$\\lVert G_2\\rVert_\\infty = |G_2(0)| = 0{,}4$.<br>Produkt $= 0{,}2 < 1$. ✓<br>$$\\boxed{\\text{Rückkopplung stabil nach Small-Gain-Theorem}}$$ Hinreichende, aber nicht notwendige Bedingung.'
                },
                {
                    q: 'Modale Zerlegung: bestimme die Zustandstrafo $z=Tx$, die $A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}$ in Diagonalform überführt, und gib das transformierte Modell an.',
                    h: 'EV als Spalten von $T^{-1}$, dann $\\Lambda = T A T^{-1}$ diagonal mit EW.',
                    s: 'EW $\\lambda_1=-1, \\lambda_2=-2$ (siehe L2.2).<br>EV: $v_1=(1,-1)^T$, $v_2=(1,-2)^T$.<br>$T^{-1}=\\begin{pmatrix}1 & 1\\\\ -1 & -2\\end{pmatrix}$, $T = \\begin{pmatrix}2 & 1\\\\ -1 & -1\\end{pmatrix}$ (siehe L3.5).<br>Im neuen System: $\\dot z = \\Lambda z + T B u$, $y = C T^{-1} z$, mit $\\Lambda = \\operatorname{diag}(-1,-2)$. Modes entkoppelt $\\Rightarrow$ einfache Analyse pro Eigen-Mode.'
                },
                {
                    q: 'Minimale Realisierung: ist $A=\\begin{pmatrix}-1&0\\\\0&-2\\end{pmatrix}$, $B=\\begin{pmatrix}1\\\\1\\end{pmatrix}$, $C=\\begin{pmatrix}1&0\\end{pmatrix}$ minimal? Begründe.',
                    h: 'Steuerbarkeit + Beobachtbarkeit prüfen.',
                    s: 'Steuerbarkeit: $AB=(-1,-2)^T$. $\\mathcal{C}=\\begin{pmatrix}1&-1\\\\1&-2\\end{pmatrix}$, $\\det=-1\\neq 0$. ✓<br>Beobachtbarkeit: $CA=(-1,0)$. $\\mathcal{O}=\\begin{pmatrix}1&0\\\\-1&0\\end{pmatrix}$, Rang $1<2$. ✗<br>Mode $x_2$ ist nicht beobachtbar $\\Rightarrow$ <strong>nicht minimal</strong>. Minimale Realisierung hat Ordnung 1: $G(s)=C(sI-A)^{-1}B = 1/(s+1)$.'
                },
                {
                    q: 'Kalman-Zerlegung: erläutere die 4 Subsysteme einer allgemeinen LTI-Realisation.',
                    h: 'Kombinationen aus (un)steuerbar × (un)beobachtbar.',
                    s: 'Jede LTI-Realisation lässt sich (durch Ähnlichkeitstrafo) in 4 Subsysteme zerlegen:<br>1. <strong>Steuerbar & beobachtbar</strong> $(S\\cap B)$: erscheint in $G(s)$, minimal.<br>2. <strong>Steuerbar & nicht-beobachtbar</strong> $(S\\cap \\bar B)$: nicht in $G(s)$, aber zustandsdynamisch erregbar.<br>3. <strong>Nicht-steuerbar & beobachtbar</strong> $(\\bar S\\cap B)$: erscheint in Anfangszustandsantwort, nicht in $G(s)$.<br>4. <strong>Nicht-steuerbar & nicht-beobachtbar</strong> $(\\bar S\\cap \\bar B)$: völlig versteckt.<br>$G(s)$ enthält nur Subsystem 1. Modes aus 2-4 müssen für interne Stabilität zusätzlich stabil sein.'
                }
            ]
        ]
    };
})();
