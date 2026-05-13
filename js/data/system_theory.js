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
                    s: 'Kausal: $y(t)$ hängt von $x(t-2)$, also vergangenem Wert.<br>Zeitinvarianz: $x(t-T_0)$ als Eingang ergibt $y_{neu}(t)=x(t-T_0-2)=y(t-T_0)$.<br>$$\\boxed{\\text{Kausal und zeitinvariant}}$$'
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
                    s: '$\\int_0^\\infty e^{-t}dt=[-e^{-t}]_0^\\infty=1<\\infty$.<br>$$\\boxed{\\text{BIBO-stabil}}$$'
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
                    s: '$s^2+5s+6=(s+2)(s+3)=0\\Rightarrow s_{1,2}=-2,-3$.<br>Pol bei $s=-2$ kürzt sich gegen Zähler-Nullstelle (Pol-Nullstellen-Kürzung).<br>Effektiv: $G(s)=1/(s+3)$, einziger Pol $s=-3$ in linker Halbebene.<br>$$\\boxed{\\text{BIBO-stabil}}$$'                },
                {
                    q: 'Bestimme die Sprungantwort $s(t)$ eines LTI-Systems aus der Impulsantwort $h(t)=e^{-2t}\\sigma(t)$.',
                    h: 'Es gilt $s(t)=\\int_{-\\infty}^{t} h(\\tau)\\,d\\tau$.',
                    s: '$s(t)=\\int_0^t e^{-2\\tau}d\\tau = \\tfrac{1}{2}(1-e^{-2t})\\,\\sigma(t)$.<br>Stationärer Endwert: $s(\\infty)=1/2$.<br>$$\\boxed{s(t)=\\tfrac{1}{2}(1-e^{-2t})\\sigma(t)}$$<br><em>Quelle: Oppenheim, Willsky, Nawab, „Signals and Systems", 2nd ed., Pearson 1996, §2.4.</em>'
                },
                {
                    q: 'Berechne die Faltung $\\operatorname{rect}_T(t)*\\operatorname{rect}_T(t)$ zweier Rechteckpulse der Breite $T$ und Höhe 1.',
                    h: 'Geometrische Überlappung; Ergebnis ist eine Dreiecksfunktion.',
                    s: 'Die Überlappung zweier um $\\tau$ versetzter Rechtecke ergibt $\\max(0,\\,T-|\\tau|)$.<br>$$\\boxed{(\\operatorname{rect}_T*\\operatorname{rect}_T)(t)=T\\cdot\\operatorname{tri}(t/T)}$$mit Spitzenwert $T$ bei $t=0$ und linearem Abfall auf $0$ bei $|t|=T$.<br><em>Quelle: Oppenheim et al., „Signals and Systems", 2nd ed., Pearson 1996, §2.2.</em>'
                },
                {
                    q: 'Werte $\\int_{-\\infty}^{\\infty} f(t)\\,\\delta(t-3)\\,dt$ aus für $f(t)=t^2+1$ (Sifting-Eigenschaft).',
                    h: '$\\int f(t)\\delta(t-t_0)\\,dt = f(t_0)$.',
                    s: '$f(3)=3^2+1=10$.<br>$$\\boxed{\\int f(t)\\delta(t-3)\\,dt = 10}$$<br><em>Quelle: Lutz, Wendt, „Taschenbuch der Regelungstechnik", Harri Deutsch, 12. Aufl. 2021, §3.1.</em>'
                },
                {
                    q: 'Prüfe die BIBO-Stabilität für $h(t)=e^{-2t}\\sigma(t)$ über das Integralkriterium.',
                    h: 'BIBO-stabil $\\iff \\int_{-\\infty}^{\\infty}|h(t)|\\,dt < \\infty$.',
                    s: '$\\int_0^\\infty e^{-2t}\\,dt = 1/2 < \\infty$.<br>$$\\boxed{\\text{BIBO-stabil}}$$<br><em>Quelle: Lunze, „Regelungstechnik 1", Springer, 11. Aufl. 2020, §6.1.</em>'
                },
                {
                    q: 'Untersuche, ob das System $y(t)=t\\cdot x(t)$ linear und zeitinvariant ist.',
                    h: 'Superposition trennen, dann Verschiebung testen.',
                    s: 'Linearität: $T\\{ax_1+bx_2\\}=t(ax_1+bx_2)=a\\,t x_1+b\\,t x_2 = aT\\{x_1\\}+bT\\{x_2\\}$ \u2013 <strong>linear</strong>.<br>Zeitinvarianz: $T\\{x(t-T_0)\\}=t\\,x(t-T_0)$, aber $y(t-T_0)=(t-T_0)\\,x(t-T_0)$.<br>Nicht gleich $\\Rightarrow$ <strong>zeitvariant</strong>.<br><em>Quelle: Oppenheim et al., „Signals and Systems", 2nd ed., Pearson 1996, §1.6.</em>'
                },
                {
                    q: 'Untersuche, ob $y(t)=x(t+1)$ kausal ist.',
                    h: 'Kausal: $y(t_0)$ darf nur von $x(t\\le t_0)$ abhängen.',
                    s: '$y(t_0)=x(t_0+1)$ greift auf zukünftigen Eingangswert zurück.<br>$$\\boxed{\\text{Nicht kausal}}$$ Solche Systeme sind nur offline (z.\\,B. Audio-Postprocessing) realisierbar.<br><em>Quelle: Oppenheim et al., „Signals and Systems", 2nd ed., Pearson 1996, §1.6.3.</em>'
                },
                {
                    q: 'Klassifiziere die Stabilität von $G(s)=\\dfrac{1}{s^2+\\omega_0^2}$ mit $\\omega_0>0$.',
                    h: 'Pole auf der imaginären Achse.',
                    s: 'Pole: $s_{1,2}=\\pm j\\omega_0$ \u2013 auf der imaginären Achse.<br>Impulsantwort: $h(t)=\\tfrac{1}{\\omega_0}\\sin(\\omega_0 t)\\sigma(t)$, $\\int|h|dt=\\infty$.<br>$$\\boxed{\\text{Grenzstabil, nicht BIBO-stabil}}$$<br><em>Quelle: Föllinger, „Regelungstechnik", VDE-Verlag, 12. Aufl. 2016, §4.2.</em>'
                },
                {
                    q: 'Wende den Endwertsatz auf $Y(s)=\\dfrac{5}{s(s^2+2s+5)}$ an.',
                    h: '$y_\\infty=\\lim_{s\\to 0}sY(s)$, sofern Pole von $sY(s)$ in offener LHE.',
                    s: '$sY(s)=5/(s^2+2s+5)$. Pole: $s=-1\\pm j2$ (LHE).<br>$\\lim_{s\\to 0}5/(0+0+5)=1$.<br>$$\\boxed{y_\\infty=1}$$<br><em>Quelle: Lutz, Wendt, „Taschenbuch der Regelungstechnik", Harri Deutsch, 12. Aufl. 2021, §3.4.</em>'
                },
                {
                    q: 'Wende den Anfangswertsatz auf $Y(s)=\\dfrac{s}{s^2+1}$ an.',
                    h: '$y(0^+)=\\lim_{s\\to\\infty}sY(s)$.',
                    s: '$sY(s)=s^2/(s^2+1)\\to 1$ für $s\\to\\infty$.<br>$$\\boxed{y(0^+)=1}$$ Probe: $y(t)=\\cos t$, $\\cos 0 = 1$.<br><em>Quelle: Föllinger, „Regelungstechnik", VDE-Verlag, 12. Aufl. 2016, §3.5.</em>'
                },
                {
                    q: 'Bestimme Betrag und Phase von $G(j\\omega)=\\dfrac{1}{1+j\\omega T}$ bei $\\omega = 1/T$.',
                    h: 'PT1-Knickfrequenz.',
                    s: '$|G|=1/\\sqrt{1+1}=1/\\sqrt 2 \\approx 0{,}707$, d.\\,h. $-3{,}01\\,\\text{dB}$.<br>$\\arg G = -\\arctan(1) = -45°$.<br>$$\\boxed{|G|=1/\\sqrt 2,\\ \\varphi=-45°}$$<br><em>Quelle: Lunze, „Regelungstechnik 1", Springer, 11. Aufl. 2020, §8.2 (PT1-Glied).</em>'
                },
                {
                    q: 'Stationäre Sinusantwort: berechne $y(t)$ eines LTI-Systems $G(s)=1/(s+2)$ bei Eingang $x(t)=\\sin(2t)$.',
                    h: '$y(t)=|G(j\\omega)|\\sin(\\omega t+\\arg G(j\\omega))$ im eingeschwungenen Zustand.',
                    s: '$G(j2)=1/(2+j2)=(2-j2)/8=0{,}25-j0{,}25$.<br>$|G(j2)|=\\sqrt{0{,}125}\\approx 0{,}354$, $\\arg G(j2)=-45°=-\\pi/4$.<br>$$\\boxed{y(t)\\approx 0{,}354\\sin(2t-\\pi/4)}$$<br><em>Quelle: Oppenheim et al., „Signals and Systems", 2nd ed., Pearson 1996, §3.2 (Eigenfunktionen-Eigenschaft).</em>'
                },
                {
                    q: 'Bestimme die Übertragungsfunktion zur DGL $\\ddot y + 3\\dot y + 2y = u$ mit Ruhebedingungen $y(0)=\\dot y(0)=0$.',
                    h: 'Laplace-transformieren, nach $Y/U$ auflösen.',
                    s: '$(s^2+3s+2)Y(s)=U(s)$.<br>$$\\boxed{G(s)=\\dfrac{1}{s^2+3s+2}=\\dfrac{1}{(s+1)(s+2)}}$$ Pole $s=-1,-2$ in LHE $\\Rightarrow$ BIBO-stabil.<br><em>Quelle: Föllinger, „Regelungstechnik", VDE-Verlag, 12. Aufl. 2016, §3.4.</em>'
                },
                {
                    q: 'Verschiebungssatz Laplace: berechne $\\mathcal{L}\\{(t-2)\\sigma(t-2)\\}$.',
                    h: '$\\mathcal{L}\\{f(t-a)\\sigma(t-a)\\}=e^{-as}F(s)$.',
                    s: '$\\mathcal{L}\\{t\\sigma(t)\\}=1/s^2$.<br>$$\\boxed{\\mathcal{L}\\{(t-2)\\sigma(t-2)\\}=\\dfrac{e^{-2s}}{s^2}}$$<br>Anwendung u.\\,a. bei Totzeiten in Regelkreisen.<br><em>Quelle: Lutz, Wendt, „Taschenbuch der Regelungstechnik", Harri Deutsch, 12. Aufl. 2021, §3.3.</em>'                }
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
                    s: '$sY(s) = 2/(s+3)$. Pol bei $s=-3$ (LHE).<br>$\\lim_{s\\to 0} 2/(s+3) = 2/3$.<br>$$\\boxed{y_\\infty = 2/3}$$'                },
                {
                    q: 'Berechne die Faltung $h(t)*h(t)$ für $h(t)=e^{-at}\\sigma(t)$ direkt im Zeitbereich.',
                    h: '$(h*h)(t)=\\int_0^t e^{-a\\tau}e^{-a(t-\\tau)}d\\tau$.',
                    s: '$(h*h)(t)=e^{-at}\\int_0^t d\\tau = t\\,e^{-at}\\,\\sigma(t)$.<br>$$\\boxed{(h*h)(t)=t\\,e^{-at}\\sigma(t)}$$ Probe Laplace: $H(s)=1/(s+a)$, $H^2=1/(s+a)^2$, $\\mathcal{L}^{-1}=t e^{-at}\\sigma(t)$. Stimmt überein.<br><em>Quelle: Oppenheim et al., „Signals and Systems", 2nd ed., Pearson 1996, §3.2.</em>'
                },
                {
                    q: 'Routh-Hurwitz: ist das Polynom $p(s)=s^3+2s^2+3s+4$ Hurwitz-stabil?',
                    h: 'Routh-Tafel aufstellen, Vorzeichenwechsel der ersten Spalte zählen.',
                    s: 'Routh-Tafel:<br>$s^3: 1\\ \\ 3$<br>$s^2: 2\\ \\ 4$<br>$s^1: (2\\cdot 3-1\\cdot 4)/2 = 1$<br>$s^0: 4$<br>Erste Spalte $1,2,1,4$ \u2013 alle positiv, keine Vorzeichenwechsel.<br>$$\\boxed{\\text{Hurwitz-stabil}}$$<br><em>Quelle: Lutz, Wendt, „Taschenbuch der Regelungstechnik", Harri Deutsch, 12. Aufl. 2021, §6.2; Routh, „Stability of Motion", London 1877.</em>'
                },
                {
                    q: 'RLC-Reihenkreis (R, L, C in Serie): stelle die Zustandsraumdarstellung mit Zustand $(i_L,\\ u_C)^T$, Eingang $u(t)$, Ausgang $u_C$ auf.',
                    h: 'Kirchhoff: $u = R i_L + L\\dot i_L + u_C$; Kondensatorgleichung $\\dot u_C = i_L/C$.',
                    s: '$L\\dot i_L = -R\\,i_L - u_C + u$, $C\\dot u_C = i_L$.<br>$$\\dot x = \\begin{pmatrix}-R/L & -1/L\\\\ 1/C & 0\\end{pmatrix}x + \\begin{pmatrix}1/L\\\\ 0\\end{pmatrix}u,\\ y = \\begin{pmatrix}0 & 1\\end{pmatrix}x.$$<br><em>Quelle: Lunze, „Regelungstechnik 1", Springer, 11. Aufl. 2020, §4.2 (Modellbildung).</em>'
                },
                {
                    q: 'Bestimme die Brunovsky-(Steuerungs-Normal-)Form von $\\ddot y + 3\\dot y + 2y = u$ mit Zustand $(y,\\dot y)^T$.',
                    h: 'Setze $x_1=y, x_2=\\dot y$.',
                    s: '$\\dot x_1 = x_2$, $\\dot x_2 = -2x_1 - 3x_2 + u$.<br>$$A=\\begin{pmatrix}0 & 1\\\\ -2 & -3\\end{pmatrix},\\ B=\\begin{pmatrix}0\\\\ 1\\end{pmatrix},\\ C=\\begin{pmatrix}1 & 0\\end{pmatrix}.$$<br>Charakteristisches Polynom $s^2+3s+2$ steht direkt in der letzten Zeile von $A$.<br><em>Quelle: Kailath, „Linear Systems", Prentice Hall 1980, §2.2.</em>'
                },
                {
                    q: 'Masse-Feder-Dämpfer $m\\ddot x + d\\dot x + kx = F$ mit $m=1\\,\\text{kg}$, $d=2\\,\\text{Ns/m}$, $k=5\\,\\text{N/m}$: bestimme $\\omega_0$ und Dämpfungsgrad $\\zeta$.',
                    h: 'Normalform $\\ddot x + 2\\zeta\\omega_0\\dot x + \\omega_0^2 x = \\dots$',
                    s: '$\\omega_0=\\sqrt{k/m}=\\sqrt{5}\\approx 2{,}236\\,\\text{rad/s}$.<br>$2\\zeta\\omega_0=d/m=2 \\Rightarrow \\zeta=1/\\omega_0=1/\\sqrt 5\\approx 0{,}447$.<br>$$\\boxed{\\omega_0\\approx 2{,}24\\,\\text{rad/s},\\ \\zeta\\approx 0{,}45}$$ Schwach gedämpft, oszillatorisches Sprungverhalten.<br><em>Quelle: Föllinger, „Regelungstechnik", VDE-Verlag, 12. Aufl. 2016, §4.4 (PT2-Glied).</em>'
                },
                {
                    q: 'PT2-Glied $G(s)=\\omega_0^2/(s^2+2\\zeta\\omega_0 s+\\omega_0^2)$ mit $\\zeta=0{,}5$: bestimme das prozentuale Überschwingen $\\ddot u$ der Sprungantwort.',
                    h: '$\\ddot u = e^{-\\zeta\\pi/\\sqrt{1-\\zeta^2}}$.',
                    s: '$\\zeta=0{,}5\\Rightarrow \\sqrt{1-\\zeta^2}=\\sqrt{0{,}75}\\approx 0{,}866$.<br>Exponent: $-0{,}5\\pi/0{,}866\\approx -1{,}814$.<br>$\\ddot u = e^{-1{,}814}\\approx 0{,}163 = 16{,}3\\,\\%$.<br>$$\\boxed{\\ddot u \\approx 16{,}3\\,\\%}$$<br><em>Quelle: Lunze, „Regelungstechnik 1", Springer, 11. Aufl. 2020, §8.4 (PT2).</em>'
                },
                {
                    q: 'Allpass: $A(s)=\\dfrac{s-a}{s+a}$ mit $a>0$. Bestimme $|A(j\\omega)|$ und $\\arg A(j\\omega)$.',
                    h: 'Zähler und Nenner Spiegelpaare auf der reellen Achse.',
                    s: '$|A(j\\omega)|=\\dfrac{|j\\omega-a|}{|j\\omega+a|}=\\dfrac{\\sqrt{\\omega^2+a^2}}{\\sqrt{\\omega^2+a^2}}=1$ für alle $\\omega$.<br>$\\arg A(j\\omega)=\\arg(j\\omega-a)-\\arg(j\\omega+a)$. Mit $\\arctan(\\omega/a)$-Identitäten: $\\arg A=-2\\arctan(\\omega/a)$.<br>$$\\boxed{|A|=1,\\ \\arg A=-2\\arctan(\\omega/a)}$$ Allpasses tragen nicht zur Amplitudenform bei, verzögern aber Phase.<br><em>Quelle: Skogestad, Postlethwaite, „Multivariable Feedback Control", 2nd ed., Wiley 2005, §5.7.</em>'
                },
                {
                    q: 'Begründe, warum ein nichtminimalphasiges System mit Nullstelle in $s=+a$ ($a>0$) ein „inverse response"-Anfangsverhalten zeigt.',
                    h: 'Zähler-Nullstelle in der rechten Halbebene zerlegt sich in Tiefpass minus Allpass.',
                    s: '$\\frac{s-a}{s+a} = 1 - \\frac{2a}{s+a}$. Sprungantwort enthält Term $-2a\\cdot\\tfrac{1}{a}(1-e^{-at})$, was zunächst negativ läuft, bevor der stationäre Wert positiv erreicht wird.<br>Folge: Stellgrößenbegrenzung der Bandbreite, Bode-Integral-Verschlechterung, klassisches Beispiel: Wasserstandsregelung im Trommelkessel.<br><em>Quelle: Skogestad, Postlethwaite, „Multivariable Feedback Control", 2nd ed., Wiley 2005, §5.4-5.5.</em>'
                },
                {
                    q: 'Zwei Pulse $x_1=\\operatorname{rect}_{T_1}$ und $x_2=\\operatorname{rect}_{T_2}$ mit $T_1, T_2 > 0$: bestimme die zeitliche Dauer und Form von $x_1*x_2$.',
                    h: 'Faltung zweier kausaler Endlichträger-Signale: Dauer = Summe der Dauern.',
                    s: 'Dauer des Träger: $T_1+T_2$. Form: trapezförmig mit Plateau der Breite $|T_1-T_2|$ und Höhe $\\min(T_1,T_2)$ (für ungleiche Dauern); dreieckig falls $T_1=T_2$.<br>Spitzenwert: $\\min(T_1,T_2)$.<br><em>Quelle: Oppenheim et al., „Signals and Systems", 2nd ed., Pearson 1996, §2.2.</em>'
                },
                {
                    q: 'DT-System: $y[n]=x[n]+0{,}5\\,y[n-1]$. Bestimme die z-Übertragungsfunktion und prüfe BIBO-Stabilität.',
                    h: 'z-Transformieren; BIBO-stabil $\\iff$ Pole im offenen Einheitskreis.',
                    s: '$Y(z)=X(z)+0{,}5\\,z^{-1}Y(z)\\Rightarrow H(z)=\\dfrac{Y}{X}=\\dfrac{1}{1-0{,}5\\,z^{-1}}=\\dfrac{z}{z-0{,}5}$.<br>Pol bei $z=0{,}5$, $|0{,}5|<1\\Rightarrow$ <strong>BIBO-stabil</strong>.<br>Impulsantwort: $h[n]=0{,}5^n\\,\\sigma[n]$, $\\sum|h[n]|=1/(1-0{,}5)=2 <\\infty$.<br><em>Quelle: Oppenheim, Schafer, Buck, „Discrete-Time Signal Processing", 2nd ed., Prentice Hall 1999, §3.</em>'
                },
                {
                    q: 'Polplatzierung Skizze: gegeben $A=\\begin{pmatrix}0 & 1\\\\ -2 & -3\\end{pmatrix}$, $B=\\begin{pmatrix}0\\\\ 1\\end{pmatrix}$. Welche Rückführverstärkung $K=(k_1,k_2)$ verschiebt die Pole nach $\\lambda_{1,2}=-2\\pm j$?',
                    h: 'Geschlossene Schleife $A-BK$ in Steuerungsnormalform: $K$ steht direkt im char. Polynom.',
                    s: 'Gewünschtes char. Polynom: $(s+2-j)(s+2+j)=s^2+4s+5$.<br>$A-BK = \\begin{pmatrix}0 & 1\\\\ -(2+k_1) & -(3+k_2)\\end{pmatrix}$, char. Polynom $s^2+(3+k_2)s+(2+k_1)$.<br>Koeffizientenvergleich: $3+k_2=4\\Rightarrow k_2=1$, $2+k_1=5\\Rightarrow k_1=3$.<br>$$\\boxed{K=(3,\\ 1)}$$<br><em>Quelle: Ackermann, „Robust Control", Springer 2002, §6 (Polplatzierungsformel); Lunze „Regelungstechnik 2", Springer, 9. Aufl. 2020, §7.3.</em>'
                },
                {
                    q: 'Beobachterentwurf (Dualität): gleiche Strecke wie L2.10, $C=(1,\\ 0)$. Wähle die Beobachter-Polstellen $\\lambda=-5\\pm j5$ und gib die Beobachter-Verstärkung $L$ an.',
                    h: 'Beobachter-Pole = Eigenwerte von $A-LC$. Dualer Polplatzierungsansatz.',
                    s: 'Gewünschtes char. Polynom: $(s+5)^2+25=s^2+10s+50$.<br>$A-LC = \\begin{pmatrix}-l_1 & 1\\\\ -l_2-2 & -3\\end{pmatrix}$, char. Polynom $s^2+(l_1+3)s+(3l_1+l_2+2)$.<br>$l_1+3=10\\Rightarrow l_1=7$; $3\\cdot 7+l_2+2=50\\Rightarrow l_2=27$.<br>$$\\boxed{L=(7,\\ 27)^T}$$<br><em>Quelle: Luenberger, „Observers for Multivariable Systems", IEEE Trans. Autom. Control AC-11(2), 1966; Lunze „Regelungstechnik 2", Springer, 9. Aufl. 2020, §8.2.</em>'
                },
                {
                    q: 'Internal Model Principle: warum ist für konstante Sollwertfolge ohne bleibende Regelabweichung ein I-Anteil im Regler nötig?',
                    h: 'Das Modell der Störung/Referenz (hier Stufe) muss in der Schleife auftauchen.',
                    s: 'Konstante Referenz $r(t)=R\\sigma(t)$ hat Laplace-Bild $R/s$, also einen Pol in $s=0$. Damit die Regelabweichung $E(s)=R/s\\cdot 1/(1+L(s))$ für $t\\to\\infty$ verschwindet, muss $L(s)$ einen Pol in $s=0$ haben, der den Pol von $R/s$ kompensiert.<br>$$\\boxed{L(s) \\text{ braucht freien Integrator}}$$ Allgemein: jeder Signal-Mode der Referenz/Störung muss in $L$ enthalten sein (Francis-Wonham 1976).<br><em>Quelle: Francis, Wonham, „The internal model principle of control theory", Automatica 12(5), 1976, S. 457-465.</em>'                }
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
                    s: '$\\lVert G_1\\rVert_\\infty = |G_1(0)| = 0{,}5$.<br>$\\lVert G_2\\rVert_\\infty = |G_2(0)| = 0{,}4$.<br>Produkt $= 0{,}2 < 1$.<br>$$\\boxed{\\text{Rückkopplung stabil nach Small-Gain-Theorem}}$$ Hinreichende, aber nicht notwendige Bedingung.'
                },
                {
                    q: 'Modale Zerlegung: bestimme die Zustandstrafo $z=Tx$, die $A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}$ in Diagonalform überführt, und gib das transformierte Modell an.',
                    h: 'EV als Spalten von $T^{-1}$, dann $\\Lambda = T A T^{-1}$ diagonal mit EW.',
                    s: 'EW $\\lambda_1=-1, \\lambda_2=-2$ (siehe L2.2).<br>EV: $v_1=(1,-1)^T$, $v_2=(1,-2)^T$.<br>$T^{-1}=\\begin{pmatrix}1 & 1\\\\ -1 & -2\\end{pmatrix}$, $T = \\begin{pmatrix}2 & 1\\\\ -1 & -1\\end{pmatrix}$ (siehe L3.5).<br>Im neuen System: $\\dot z = \\Lambda z + T B u$, $y = C T^{-1} z$, mit $\\Lambda = \\operatorname{diag}(-1,-2)$. Modes entkoppelt $\\Rightarrow$ einfache Analyse pro Eigen-Mode.'
                },
                {
                    q: 'Minimale Realisierung: ist $A=\\begin{pmatrix}-1&0\\\\0&-2\\end{pmatrix}$, $B=\\begin{pmatrix}1\\\\1\\end{pmatrix}$, $C=\\begin{pmatrix}1&0\\end{pmatrix}$ minimal? Begründe.',
                    h: 'Steuerbarkeit + Beobachtbarkeit prüfen.',
                    s: 'Steuerbarkeit: $AB=(-1,-2)^T$. $\\mathcal{C}=\\begin{pmatrix}1&-1\\\\1&-2\\end{pmatrix}$, $\\det=-1\\neq 0$.<br>Beobachtbarkeit: $CA=(-1,0)$. $\\mathcal{O}=\\begin{pmatrix}1&0\\\\-1&0\\end{pmatrix}$, Rang $1<2$.<br>Mode $x_2$ ist nicht beobachtbar $\\Rightarrow$ <strong>nicht minimal</strong>. Minimale Realisierung hat Ordnung 1: $G(s)=C(sI-A)^{-1}B = 1/(s+1)$.'
                },
                {
                    q: 'Kalman-Zerlegung: erläutere die 4 Subsysteme einer allgemeinen LTI-Realisation.',
                    h: 'Kombinationen aus (un)steuerbar × (un)beobachtbar.',
                    s: 'Jede LTI-Realisation lässt sich (durch Ähnlichkeitstrafo) in 4 Subsysteme zerlegen:<br>1. <strong>Steuerbar & beobachtbar</strong> $(S\\cap B)$: erscheint in $G(s)$, minimal.<br>2. <strong>Steuerbar & nicht-beobachtbar</strong> $(S\\cap \\bar B)$: nicht in $G(s)$, aber zustandsdynamisch erregbar.<br>3. <strong>Nicht-steuerbar & beobachtbar</strong> $(\\bar S\\cap B)$: erscheint in Anfangszustandsantwort, nicht in $G(s)$.<br>4. <strong>Nicht-steuerbar & nicht-beobachtbar</strong> $(\\bar S\\cap \\bar B)$: völlig versteckt.<br>$G(s)$ enthält nur Subsystem 1. Modes aus 2-4 müssen für interne Stabilität zusätzlich stabil sein.'                },
                {
                    q: 'Realisierung aus Markov-Parametern: für die Impulsantwortfolge $h_k=2^{-k}$ ($k\\ge 0$): bestimme den Rang der Hankel-Matrix $H_2=\\begin{pmatrix}h_0 & h_1\\\\ h_1 & h_2\\end{pmatrix}$ und die minimale Systemordnung.',
                    h: 'Hankel-Rang = minimale Ordnung einer LTI-Realisation (Ho-Kalman 1966).',
                    s: '$H_2=\\begin{pmatrix}1 & 1/2\\\\ 1/2 & 1/4\\end{pmatrix}$, $\\det = 1/4-1/4 = 0$, Rang $=1$.<br>Höhere Hankel-Matrizen ebenfalls Rang 1.<br>$$\\boxed{\\text{Minimale Ordnung } n=1}$$ Realisation: $A=1/2$, $B=1$, $C=1$, $H(z)=1/(1-z^{-1}/2)$, das stimmt mit $h_k=(1/2)^k$ überein.<br><em>Quelle: Ho, Kalman, „Effective construction of linear state-variable models from input/output functions", Regelungstechnik 14, 1966, S. 545-548; Kailath, „Linear Systems", Prentice Hall 1980, §6.</em>'
                },
                {
                    q: 'Diskrete Lyapunov-Gleichung: bestimme $P=P^T>0$ aus $A^T P A - P = -I$ für $A=\\begin{pmatrix}0{,}5 & 0\\\\ 0 & 0{,}9\\end{pmatrix}$.',
                    h: 'Diagonales $A\\Rightarrow$ diagonales $P$ ansetzen.',
                    s: 'Ansatz $P=\\operatorname{diag}(p_1,p_2)$.<br>$(0{,}25-1)p_1 = -1\\Rightarrow p_1 = 1/0{,}75 = 4/3$.<br>$(0{,}81-1)p_2 = -1\\Rightarrow p_2 = 1/0{,}19 \\approx 5{,}263$.<br>$$\\boxed{P=\\operatorname{diag}(4/3,\\ 1/0{,}19)}$$ Beide positiv $\\Rightarrow$ asymptotisch stabiles DT-System (Spektralradius $0{,}9<1$).<br><em>Quelle: Antsaklis, Michel, „Linear Systems", McGraw-Hill 1997, §7.2.</em>'
                },
                {
                    q: 'LQR-Skizze: leite aus $J=\\int_0^\\infty (x^T Q x + u^T R u)\\,dt$, $\\dot x=Ax+Bu$ die optimale Rückführung her.',
                    h: 'Algebraische Riccati-Gleichung (CARE).',
                    s: 'Optimaler Regler: $u^*=-Kx$ mit $K=R^{-1}B^T P$, $P=P^T\\succ 0$ Lösung von:<br>$$A^T P + P A - P B R^{-1} B^T P + Q = 0.$$<br>Geschlossener Kreis $\\dot x=(A-BK)x$ ist asymptotisch stabil (für $(A,B)$ stabilisierbar, $(A,\\sqrt Q)$ entdeckbar).<br><em>Quelle: Kalman, „Contributions to the theory of optimal control", Bol. Soc. Mat. Mex. 5, 1960; Anderson, Moore, „Optimal Control: Linear Quadratic Methods", Prentice Hall 1990, §3.</em>'
                },
                {
                    q: 'Bode-Sensitivitäts-Integral („Wasserbett-Effekt"): formuliere und interpretiere das Bode-Integral für ein stabiles, streng-realisierbares offenes $L(s)$ ohne RHE-Pole.',
                    h: '$\\int_0^\\infty \\ln|S(j\\omega)|\\,d\\omega = 0$.',
                    s: '$S(s)=1/(1+L(s))$ Empfindlichkeitsfunktion. Falls $L$ stabil und Grad-Überschuss $\\ge 2$:<br>$$\\int_0^\\infty \\ln|S(j\\omega)|\\,d\\omega = 0.$$<br>Konsequenz: jede Verbesserung $|S|<1$ in einem Frequenzbereich wird durch Verschlechterung $|S|>1$ in einem anderen ausgeglichen. Bei instabilen Polen $p_i$ rechts der Imaginärachse: $\\int\\ln|S|d\\omega = \\pi\\sum\\Re(p_i)>0$ (Striktverschärfung).<br><em>Quelle: Bode, „Network Analysis and Feedback Amplifier Design", Van Nostrand 1945; Doyle, Francis, Tannenbaum, „Feedback Control Theory", Macmillan 1992, §6; Stein, „Respect the unstable", IEEE Control Systems Magazine, Aug. 2003.</em>'
                },
                {
                    q: 'Nyquist-Kriterium: gegeben offene Schleife $L(s)=\\dfrac{K}{s(s+1)(s+2)}$. Bestimme den kritischen Verstärkungsfaktor $K_{krit}$, ab dem die geschlossene Schleife instabil wird.',
                    h: 'Phase $-180°$ und $|L|=1$ gleichzeitig.',
                    s: 'Char. Polynom geschlossen: $s(s+1)(s+2)+K = s^3+3s^2+2s+K$.<br>Routh: $s^3:1,2$; $s^2:3,K$; $s^1:(6-K)/3$; $s^0:K$.<br>Stabilität $\\iff (6-K)/3>0 \\wedge K>0 \\iff 0<K<6$.<br>$$\\boxed{K_{krit}=6}$$ Bei $K=6$ entstehen rein imaginäre Pole bei $s=\\pm j\\sqrt 2$ (Dauerschwingung).<br><em>Quelle: Nyquist, „Regeneration Theory", Bell System Technical Journal 11(1), 1932; Lunze „Regelungstechnik 1", Springer, 11. Aufl. 2020, §10.</em>'
                },
                {
                    q: 'KYP-Lemma (positive Realisierbarkeit): gib die LMI-Charakterisierung für $G(s)=C(sI-A)^{-1}B+D$ positiv-reell an.',
                    h: 'Existenz $P=P^T\\succ 0$ mit Blockmatrix-Bedingung.',
                    s: 'KYP-Lemma (Kalman-Yakubovich-Popov): $G(s)$ positiv-reell $\\iff \\exists P=P^T\\succ 0$ mit<br>$$\\begin{pmatrix}A^T P+PA & PB-C^T\\\\ B^T P-C & -(D+D^T)\\end{pmatrix}\\preceq 0.$$<br>Anwendung u.\\,a. in Passivitäts-basierter Stabilität, adaptiver Regelung und absoluter Stabilität (Lur\u2019e-Systeme nach Popov-Kreiskriterium).<br><em>Quelle: Yakubovich, „Solution of certain matrix inequalities encountered in nonlinear control theory", Soviet Math. Dokl. 5, 1964; Khalil, „Nonlinear Systems", 3rd ed., Prentice Hall 2002, §6.</em>'
                },
                {
                    q: '$H_\\infty$-Norm für PT1: berechne $\\lVert G\\rVert_\\infty$ analytisch für $G(s)=\\dfrac{K}{1+sT}$.',
                    h: '$\\lVert G\\rVert_\\infty = \\sup_\\omega |G(j\\omega)|$. PT1 fällt monoton, Maximum bei $\\omega=0$.',
                    s: '$|G(j\\omega)|=K/\\sqrt{1+\\omega^2 T^2}$, monoton fallend.<br>$$\\boxed{\\lVert G\\rVert_\\infty = |K|}$$ Erweiterung: bei PT2 mit $\\zeta<1/\\sqrt 2$ liegt das Maximum bei $\\omega_r=\\omega_0\\sqrt{1-2\\zeta^2}$ und beträgt $K/(2\\zeta\\sqrt{1-\\zeta^2})$.<br><em>Quelle: Zhou, Doyle, „Essentials of Robust Control", Prentice Hall 1998, §4.</em>'
                },
                {
                    q: 'Steuerungsnormalform (Controllable Canonical Form): überführe $G(s)=\\dfrac{2s+3}{s^2+4s+5}$ in $(A,B,C,D)$-Steuerungsnormalform.',
                    h: 'Standard-Muster: $A$ mit Nenner-Koeffizienten in letzter Zeile, $B=(0,1)^T$.',
                    s: '$G(s)=\\dfrac{2s+3}{s^2+4s+5}$, Grad Zähler $<$ Grad Nenner, $D=0$.<br>$$A=\\begin{pmatrix}0 & 1\\\\ -5 & -4\\end{pmatrix},\\ B=\\begin{pmatrix}0\\\\ 1\\end{pmatrix},\\ C=\\begin{pmatrix}3 & 2\\end{pmatrix},\\ D=0.$$<br>Probe: $C(sI-A)^{-1}B = (3+2s)/(s^2+4s+5)$ stimmt überein.<br><em>Quelle: Kailath, „Linear Systems", Prentice Hall 1980, §2.2; Lunze, „Regelungstechnik 2", Springer, 9. Aufl. 2020, §3.</em>'
                },
                {
                    q: 'Tustin-Diskretisierung: wandle den PI-Regler $G(s)=K_P+K_I/s$ mit $K_P=2$, $K_I=10$, Abtastzeit $T_a=0{,}01\\,\\text{s}$ in einen DT-Regler.',
                    h: 'Bilineare Transformation $s\\leftarrow \\tfrac{2}{T_a}\\tfrac{1-z^{-1}}{1+z^{-1}}$.',
                    s: '$G(z)=K_P+K_I\\cdot \\tfrac{T_a}{2}\\cdot \\tfrac{1+z^{-1}}{1-z^{-1}}$.<br>Mit Werten: $K_I T_a/2 = 0{,}05$.<br>$G(z)=2 + 0{,}05\\cdot\\dfrac{1+z^{-1}}{1-z^{-1}}=\\dfrac{2(1-z^{-1})+0{,}05(1+z^{-1})}{1-z^{-1}}=\\dfrac{2{,}05-1{,}95 z^{-1}}{1-z^{-1}}$.<br>$$\\boxed{u[k]=u[k-1]+2{,}05\\,e[k]-1{,}95\\,e[k-1]}$$<br><em>Quelle: Föllinger, „Lineare Abtastsysteme", Oldenbourg 1990, §5; Aström, Wittenmark, „Computer-Controlled Systems", 3rd ed., Prentice Hall 1997, §8.</em>'
                },
                {
                    q: 'Smith-McMillan-Pole/Nullstellen: erläutere am MIMO-System $G(s)=\\begin{pmatrix}1/(s+1) & 1/(s+1)\\\\ 0 & 1/(s+2)\\end{pmatrix}$, was Pole und Übertragungsnullstellen sind.',
                    h: 'Smith-McMillan-Normalform via elementare Zeilen-/Spalten-Operationen über $\\mathbb{R}[s]$.',
                    s: 'Gemeinsamer Nenner $(s+1)(s+2)$. Zählermatrix nach Multiplikation: $N(s)=\\begin{pmatrix}s+2 & s+2\\\\ 0 & s+1\\end{pmatrix}$. Smith-Form $\\operatorname{diag}(1,(s+1)(s+2))$ über $\\mathbb{R}[s]$.<br>Smith-McMillan: $\\operatorname{diag}(1/((s+1)(s+2)),\\ 1)$.<br>$$\\text{Pole}: \\{-1,-2\\},\\ \\text{Nullstellen}: \\varnothing.$$ Wichtig: Übertragungsnullstellen einer MIMO-Matrix sind <strong>nicht</strong> die Vereinigung der skalaren Nullstellen.<br><em>Quelle: MacFarlane, Karcanias, „Poles and zeros of linear multivariable systems", Int. J. Control 24(1), 1976; Skogestad, Postlethwaite, „Multivariable Feedback Control", 2nd ed., Wiley 2005, §4.5.</em>'
                },
                {
                    q: 'Reduzierte Ordnung via Singulärwertzerlegung der Hankel-Matrix: erkläre die Idee des balancierten Trunkierens.',
                    h: 'Hankel-Singulärwerte = Steuerbar-Energie × Beobachtbar-Energie.',
                    s: 'Lyapunov-Gleichungen $A W_c + W_c A^T + B B^T = 0$ und $A^T W_o + W_o A + C^T C = 0$ liefern Steuerbarkeits-/Beobachtbarkeits-Gramian. Ähnlichkeitstrafo $T$ wählen, sodass $W_c=W_o=\\Sigma=\\operatorname{diag}(\\sigma_1,\\dots,\\sigma_n)$ („balanciert"). $\\sigma_i$ sind die Hankel-Singulärwerte. Trunkieren der Zustände mit kleinen $\\sigma_i$ erzeugt reduziertes Modell $G_r$ mit Fehlergrenze<br>$$\\lVert G-G_r\\rVert_\\infty \\le 2\\sum_{i=r+1}^{n}\\sigma_i.$$<br><em>Quelle: Moore, „Principal component analysis in linear systems", IEEE Trans. AC-26(1), 1981; Glover, „All optimal Hankel-norm approximations", Int. J. Control 39(6), 1984.</em>'
                },
                {
                    q: 'Lur\u2019e-System (Popov-Kreiskriterium): das System bestehe aus stabiler LTI $G(s)$ und sektor-beschränkter Nichtlinearität $\\varphi\\in[0,k]$. Wann ist absolute Stabilität nach Kreiskriterium garantiert?',
                    h: 'Geometrische Bedingung im Nyquist-Plot.',
                    s: 'Kreiskriterium: Die Ortskurve $G(j\\omega)$ muss links vom Vertikalkreis durch $-1/k$ und $\\infty$ (für $k$ einseitig) bzw. außerhalb des Disks $|s+1/k_1+1/k_2|<\\dots$ (zweiseitig) liegen.<br>Strenge Variante (Popov): $\\Re\\{(1+j\\omega q)G(j\\omega)\\}+1/k > 0\\ \\forall\\omega\\ge 0$ für ein $q\\ge 0$. Hinreichend für absolute Stabilität aller $\\varphi$ aus $[0,k]$.<br><em>Quelle: Popov, „Absolute stability of nonlinear systems of automatic control", Avtomatika i Telemekhanika 22(8), 1961; Khalil, „Nonlinear Systems", 3rd ed., Prentice Hall 2002, §7.</em>'
                },
                {
                    q: 'Verzögerungs-Approximation: approximiere die Totzeit $e^{-Ts}$ durch das Padé-Element 1.\\,Ordnung.',
                    h: '$e^{-Ts}\\approx \\dfrac{1-Ts/2}{1+Ts/2}$.',
                    s: 'Erste Padé-Approximation: $e^{-Ts}\\approx \\dfrac{2-Ts}{2+Ts}$. Eigenschaften: nichtminimalphasig (Nullstelle $s=+2/T$), $|\\cdot|=1$ (allpassartig im Pol/Nullen-Spiegel), Phase fällt mit $\\omega$.<br>Höhere Padé-Approximationen $(n,n)$ erhöhen Bandbreite, behalten Allpass-Charakter.<br>Anwendung: Smith-Prädiktor benötigt eine analytische Totzeit-Approximation für reglerinternen Modellaufbau.<br><em>Quelle: Padé, „Sur la représentation approchée d\u2019une fonction par des fractions rationnelles", Ann. Sci. ENS 9, 1892; Aström, Murray, „Feedback Systems", Princeton Univ. Press, 2nd ed. 2021, §13.</em>'                }
            ]
        ]
    };
})();
