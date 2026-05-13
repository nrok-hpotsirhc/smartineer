/* Digitale Regelungstechnik */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'digital_control';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Digitale Regelungstechnik',
        desc: 'Abtastung, z-Transformation, zeitdiskrete Übertragungsfunktionen, Diskretisierungsverfahren, Stabilität im Einheitskreis, Differenzengleichungen.',
        formulas: `
            <strong>Abtasttheorem (Shannon)</strong><br>
            $f_s > 2 f_{max}$, $T_s = 1/f_s$<br><br>
            <strong>z-Transformation</strong><br>
            $F(z)=\\sum_{k=0}^{\\infty} f[k]\\,z^{-k}$<br>
            $\\sigma[k]\\leftrightarrow z/(z-1)$<br>
            $a^k\\sigma[k]\\leftrightarrow z/(z-a)$<br>
            $k\\sigma[k]\\leftrightarrow z/(z-1)^2$<br>
            Verschiebung: $f[k-1]\\leftrightarrow z^{-1}F(z)$ (kausal, $f[k]=0$ für $k<0$)<br><br>
            <strong>Diskretisierung</strong><br>
            Vorwärts-Euler: $s\\to (z-1)/T_s$<br>
            Rückwärts-Euler: $s\\to (z-1)/(zT_s)$<br>
            Tustin (Bilinear): $s\\to \\dfrac{2}{T_s}\\dfrac{z-1}{z+1}$<br><br>
            <strong>Stabilität (zeitdiskret)</strong><br>
            System stabil $\\iff$ alle Pole $|z_i|<1$ (innerhalb Einheitskreis)<br><br>
            <strong>Endwertsatz</strong><br>
            $\\lim_{k\\to\\infty} f[k]=\\lim_{z\\to 1}(z-1)F(z)$ (sofern Pole innerhalb / auf $|z|=1$)<br><br>
            <strong>Anfangswertsatz</strong><br>
            $f[0]=\\lim_{z\\to\\infty} F(z)$<br><br>
            <strong>Faltung diskret</strong><br>
            $y[k]=\\sum_{i=0}^{k} h[i]\\,u[k-i]\ \\leftrightarrow\ Y(z)=H(z)U(z)$<br><br>
            <strong>Jury-Kriterium</strong> (notwendige Bedingungen)<br>
            $P(1)>0$, $(-1)^n P(-1)>0$, $|a_0|<a_n$<br><br>
            <strong>ZOH-Äquivalent</strong><br>
            $G(z)=(1-z^{-1})\\,\\mathcal{Z}\\!\\left\\{\\dfrac{G(s)}{s}\\right\\}$<br><br>
            <strong>Bilineare Frequenz-Verzerrung (Pre-Warping)</strong><br>
            $\\omega_d=\\dfrac{2}{T_s}\\tan\\!\\dfrac{\\omega T_s}{2}$<br><br>
            <strong>FIR vs. IIR</strong><br>
            FIR: endliche Impulsantwort, immer stabil, lineare Phase möglich<br>
            IIR: rekursiv, höhere Ordnung an Steilheit erreichbar, ggf. instabil
        `,
        levels: [
            // L1
            [
                {
                    q: 'Ein Audiosignal enthält Frequenzen bis $f_{max}=4\\,\\text{kHz}$. Welche minimale Abtastfrequenz $f_s$ und welche Abtastzeit $T_s$ verhindern Aliasing?',
                    h: 'Shannon: $f_s>2f_{max}$. $T_s=1/f_s$.',
                    s: '$f_s>8\\,\\text{kHz}$. Mit $f_s=8\\,\\text{kHz}$ als Grenze: $T_s=1/8000=125\\,\\mu\\text{s}$.<br>$$\\boxed{f_s>8\\,\\text{kHz},\\ T_s<125\\,\\mu\\text{s}}$$'
                },
                {
                    q: 'Bestimme die z-Transformierte der Folge $f[k]=a^k\\sigma[k]$ über die geometrische Reihe.',
                    h: 'Definition $F(z)=\\sum f[k]z^{-k}$, anschließend geometrische Reihe.',
                    s: '$F(z)=\\sum_{k=0}^\\infty (az^{-1})^k = \\dfrac{1}{1-az^{-1}}$ für $|z|>|a|$.<br>Erweitern: $F(z)=\\dfrac{z}{z-a}$.<br>$$\\boxed{\\mathcal{Z}\\{a^k\\sigma[k]\\}=\\dfrac{z}{z-a}}$$'
                },
                {
                    q: 'Diskretisiere den Integrierer $G(s)=1/s$ mit der Tustin-Regel und Abtastzeit $T_s$.',
                    h: '$s\\to \\dfrac{2}{T_s}\\dfrac{z-1}{z+1}$ einsetzen und auflösen.',
                    s: '$G(z)=\\dfrac{1}{(2/T_s)(z-1)/(z+1)}=\\dfrac{T_s}{2}\\cdot\\dfrac{z+1}{z-1}$.<br>$$\\boxed{G(z)=\\frac{T_s}{2}\\,\\frac{z+1}{z-1}}$$ (entspricht Trapezregel der numerischen Integration).'
                },
                {
                    q: 'Welcher Pol $|z|<1$, $|z|=1$, $|z|>1$ entspricht im Zeitbereich welchem Verhalten? Klassifiziere die Pole $z_1=0{,}5$, $z_2=1$, $z_3=2$.',
                    h: '$z_i^k$ als Folge: für $|z_i|<1$ klingt ab, $|z_i|=1$ konstant/oszillierend, $|z_i|>1$ wächst.',
                    s: '$z_1=0{,}5$: $0{,}5^k\\to 0$ (asymptotisch stabil).<br>$z_2=1$: konstante Folge $1^k=1$ (grenzstabil).<br>$z_3=2$: $2^k\\to\\infty$ (instabil).'
                },
                {
                    q: 'Aus der z-Übertragungsfunktion $G(z)=\\dfrac{Y(z)}{U(z)}=\\dfrac{0{,}5}{z-0{,}8}$, formuliere die Differenzengleichung.',
                    h: 'Im Zähler/Nenner $z$-Potenzen ausschreiben: $(z-0{,}8)Y(z)=0{,}5\\,U(z)$. Verschiebungssatz $z\\,Y\\leftrightarrow y[k+1]$.',
                    s: '$zY-0{,}8Y = 0{,}5\\,U \\Rightarrow y[k+1]-0{,}8 y[k] = 0{,}5\\,u[k]$.<br>Verschoben (kausal): $y[k] = 0{,}8\\,y[k-1] + 0{,}5\\,u[k-1]$.<br>$$\\boxed{y[k]=0{,}8\\,y[k-1]+0{,}5\\,u[k-1]}$$'
                },
                {
                    q: 'Berechne die z-Transformierte des Einheitssprungs $\\sigma[k]$ mit der Definition.',
                    h: 'Geometrische Reihe mit Quotient $z^{-1}$.',
                    s: '$F(z)=\\sum_{k=0}^\\infty z^{-k}=\\dfrac{1}{1-z^{-1}}=\\dfrac{z}{z-1}$ für $|z|>1$.<br>$$\\boxed{\\mathcal{Z}\\{\\sigma[k]\\}=\\dfrac{z}{z-1}}$$'                },
                {
                    q: 'Berechne den Anfangswert $f[0]$ aus $F(z)=\\dfrac{2z}{z-0{,}5}$ über den Anfangswertsatz.',
                    h: 'Anfangswertsatz: $f[0]=\\lim_{z\\to\\infty}F(z)$.',
                    s: '$\\lim_{z\\to\\infty}\\dfrac{2z}{z-0{,}5}=\\lim_{z\\to\\infty}\\dfrac{2}{1-0{,}5/z}=2$.<br>$$\\boxed{f[0]=2}$$'
                },
                {
                    q: 'Diskretisiere $G(s)=\\dfrac{1}{s+a}$ mittels Vorwärts-Euler bei $T_s$.',
                    h: 'Substitution $s\\to (z-1)/T_s$.',
                    s: '$G(z)=\\dfrac{1}{(z-1)/T_s+a}=\\dfrac{T_s}{z-1+aT_s}=\\dfrac{T_s}{z-(1-aT_s)}$.<br>$$\\boxed{G(z)=\\dfrac{T_s}{z-(1-aT_s)}}$$ Stabil nur für $|1-aT_s|<1$, d.h. $0<aT_s<2$ — Vorwärts-Euler ist instabilitätsanfällig bei großem $T_s$.'
                },
                {
                    q: 'Was ist die Ausgangsfolge $y[k]$ einer FIR-Faltung mit Impulsantwort $h=[1, 2, 1]$ und Eingang $u=[1, 0, 0, ...]$?',
                    h: '$y[k]=\\sum h[i]u[k-i]$. Mit $u=\\delta[k]$ ist $y[k]=h[k]$.',
                    s: 'Da $u[k]=\\delta[k]$, ist die Faltungssumme nur für $k=0,1,2$ ungleich Null:<br>$y[0]=h[0]=1$, $y[1]=h[1]=2$, $y[2]=h[2]=1$, $y[k\\ge 3]=0$.<br>$$\\boxed{y=[1,2,1,0,0,\\dots]}$$ (Impulsantwort = Filterkoeffizienten bei FIR).'
                },
                {
                    q: 'Was ist der grundsätzliche Unterschied zwischen FIR- und IIR-Filtern?',
                    h: 'Endlichkeit der Impulsantwort, Rekursion, Stabilität.',
                    s: '<strong>FIR</strong> (Finite Impulse Response): $y[k]=\\sum_{i=0}^{N} b_i u[k-i]$, keine Rückführung. Immer stabil, lineare Phase möglich, ggf. hohe Ordnung.<br><strong>IIR</strong> (Infinite Impulse Response): $y[k]=\\sum b_i u[k-i] - \\sum a_j y[k-j]$ mit Rückführung. Geringere Ordnung für gleiche Steilheit, aber Stabilität explizit prüfen, nichtlineare Phase.<br>Anwendung: FIR für phasenkritische Audio-/Mess-Anwendungen, IIR für effiziente Steilflanken.'                },
                {
                    q: 'Ein analoges Signal mit $f=60\\,\\text{Hz}$ wird mit $f_s=50\\,\\text{Hz}$ abgetastet. Welche Aliasfrequenz $f_a$ erscheint im Basisband?',
                    h: '$f_a=|f-n f_s|$ minimal in $[0, f_s/2]$.',
                    s: 'Spektrumsfaltung: $f_a=|60-50|=10\\,\\text{Hz}$, liegt im Bereich $[0,25]$. $$\\boxed{f_a=10\\,\\text{Hz}}$$ Shannon ($f_s>2f$) verletzt → Spiegelung an $f_s/2=25\\,\\text{Hz}$ in das Basisband.<br><em>Quelle:</em> Oppenheim/Schafer, Discrete-Time Signal Processing, 3rd ed., Pearson 2009, §4.2.'
                },
                {
                    q: 'Bestimme die z-Transformierte der kausalen Folge $f[k]=2^k\\,\\sigma[k]$.',
                    h: 'Korrespondenz $a^k\\sigma[k]\\leftrightarrow z/(z-a)$ mit $|z|>|a|$.',
                    s: '$$F(z)=\\frac{z}{z-2},\\quad |z|>2.$$ Pol $z=2$ ausserhalb des Einheitskreises → $f[k]$ unbeschraenkt wachsend.<br><em>Quelle:</em> Foellinger, Lineare Abtastsysteme, 5. Aufl., Oldenbourg 1990, §2.3.'
                },
                {
                    q: 'Ist die zeitdiskrete Uebertragungsfunktion $H(z)=\\dfrac{z}{z-1{,}1}$ BIBO-stabil?',
                    h: 'BIBO-Stabilitaet $\\iff$ alle Pole $|z_i|<1$.',
                    s: 'Pol bei $z=1{,}1$, $|z|=1{,}1>1$ → ausserhalb des Einheitskreises. $$\\boxed{\\text{instabil}}$$ Impulsantwort $1{,}1^k$ waechst exponentiell.<br><em>Quelle:</em> Franklin/Powell/Workman, Digital Control of Dynamic Systems, 3rd ed., Addison-Wesley 1998, §4.3.'
                },
                {
                    q: 'Bestimme $f[0]$ aus $F(z)=\\dfrac{z}{z-0{,}5}$ mittels Anfangswertsatz.',
                    h: '$f[0]=\\lim_{z\\to\\infty} F(z)$.',
                    s: '$\\lim_{z\\to\\infty}\\dfrac{z}{z-0{,}5}=\\lim_{z\\to\\infty}\\dfrac{1}{1-0{,}5/z}=1$. $$\\boxed{f[0]=1}$$<br><em>Quelle:</em> Aström/Wittenmark, Computer-Controlled Systems, 3rd ed., Prentice Hall 1997, §3.3.'
                },
                {
                    q: 'Berechne den stationaeren Endwert $f_\\infty$ fuer $F(z)=\\dfrac{z}{(z-1)(z-0{,}5)}$ via Endwertsatz.',
                    h: '$f_\\infty=\\lim_{z\\to 1}(z-1)F(z)$ — Pole von $(z-1)F(z)$ muessen in $|z|<1$ liegen.',
                    s: '$(z-1)F(z)=z/(z-0{,}5)$, $\\lim_{z\\to 1} z/(z-0{,}5)=1/0{,}5=2$. $$\\boxed{f_\\infty=2}$$<br><em>Quelle:</em> Foellinger 1990, §2.4.'
                },
                {
                    q: 'Gegeben die Differenzengleichung $y[k]-0{,}5\\,y[k-1]=u[k]$. Bestimme $H(z)=Y(z)/U(z)$.',
                    h: 'Verschiebung: $y[k-1]\\leftrightarrow z^{-1}Y(z)$ (kausal).',
                    s: '$Y(z)(1-0{,}5 z^{-1})=U(z)$. $$\\boxed{H(z)=\\frac{1}{1-0{,}5 z^{-1}}=\\frac{z}{z-0{,}5}}$$ Pol $z=0{,}5<1$ → stabil.<br><em>Quelle:</em> Kuo, Digital Control Systems, 2nd ed., Oxford 1992, §2.6.'
                },
                {
                    q: 'Welcher z-Operator entspricht einer Totzeit von zwei Abtastschritten ($y[k]=u[k-2]$)?',
                    h: 'Jeder Schritt Verzoegerung ist Multiplikation mit $z^{-1}$.',
                    s: '$Y(z)=z^{-2}U(z)$, also $$\\boxed{H(z)=z^{-2}=1/z^2}$$ Zwei Pole im Ursprung; FIR-artige endliche Impulsantwort.<br><em>Quelle:</em> Aström/Wittenmark 1997, §3.2.'
                },
                {
                    q: 'Diskretisiere $G(s)=\\dfrac{1}{s+a}$ via Rueckwaerts-Euler bei Abtastzeit $T_s$. Wie lautet $G(z)$ und wo liegt der Pol?',
                    h: 'Rueckwaerts-Euler: $s\\to (z-1)/(z T_s)$.',
                    s: '$G(z)=\\dfrac{1}{(z-1)/(z T_s)+a}=\\dfrac{z T_s}{(1+aT_s)z-1}$. $$\\boxed{G(z)=\\frac{T_s\\,z}{(1+aT_s)z-1}}$$ Pol $z=1/(1+aT_s)\\in(0,1)$ fuer $a>0$ → Rueckwaerts-Euler ist A-stabil.<br><em>Quelle:</em> Franklin/Powell/Workman 1998, §6.4.'
                },
                {
                    q: 'Bilineares Pre-Warping: zu welcher kontinuierlichen Frequenz $\\omega_d$ muss ein analoger Filter bei $\\omega=10\\,\\text{rad/s}$ und $T_s=0{,}01\\,\\text{s}$ vorgespannt werden?',
                    h: '$\\omega_d=(2/T_s)\\tan(\\omega T_s/2)$.',
                    s: '$\\omega T_s/2 = 0{,}05$, $\\tan(0{,}05)\\approx 0{,}0500$. $\\omega_d=(2/0{,}01)\\cdot 0{,}0500=10{,}0\\,\\text{rad/s}$. $$\\boxed{\\omega_d\\approx 10{,}0\\,\\text{rad/s}}$$ Bei kleinem $\\omega T_s$ vernachlaessigbare Verzerrung — kritisch erst nahe $\\omega\\to\\pi/T_s$.<br><em>Quelle:</em> Oppenheim/Schafer 2009, §7.1.'
                },
                {
                    q: 'Wie viele Bits $N$ braucht ein ADC, um fuer ein vollausgesteuertes Sinussignal mindestens $80\\,\\text{dB}$ SQNR zu erreichen?',
                    h: '$SQNR=6{,}02\\,N+1{,}76\\,\\text{dB}$.',
                    s: '$N\\ge (80-1{,}76)/6{,}02\\approx 12{,}99$. $$\\boxed{N\\ge 13\\,\\text{Bit}}$$ Praxis: 14-Bit-ADC fuer Reserve.<br><em>Quelle:</em> Oppenheim/Schafer 2009, §4.8.'
                },
                {
                    q: 'Ein System wird mit $T_s=1\\,\\text{ms}$ abgetastet. Welche Nyquist-Frequenz $f_N$ ergibt sich?',
                    h: '$f_N=f_s/2=1/(2T_s)$.',
                    s: '$f_s=1000\\,\\text{Hz}$, $f_N=500\\,\\text{Hz}$. $$\\boxed{f_N=500\\,\\text{Hz}}$$ Alle Signalanteile $>500\\,\\text{Hz}$ muessen vor dem ADC durch ein Anti-Aliasing-Filter daempfen werden.<br><em>Quelle:</em> Shannon, "Communication in the Presence of Noise", Proc. IRE 37(1), 1949.'
                },
                {
                    q: 'Welche Aufgabe hat ein analoges Anti-Aliasing-Filter vor dem ADC, und welche Grenzfrequenz waehlt man typischerweise?',
                    h: 'Spiegelung von Frequenzen $f>f_s/2$ verhindern.',
                    s: 'Tiefpass daempft Anteile oberhalb $f_s/2$, damit sie nicht durch $f_a=|f-n f_s|$ in das Basisband zurueckspiegeln. Praxis: $-3\\,\\text{dB}$-Grenze $\\approx 0{,}4\\,f_s$, steiler Roll-Off (Bessel-/Butterworth-Filter $\\ge$ 4. Ordnung), damit bei $f_s/2$ mindestens $40\\,\\text{dB}$ Daempfung erreicht werden.<br><em>Quelle:</em> Franklin/Powell/Workman 1998, §11.4.'
                },
                {
                    q: 'Ist $P(z)=z^2-0{,}5 z+0{,}06$ Schur-stabil (alle Wurzeln $|z|<1$)? Pruefe Jury-Notwendigkeiten und rechne nach.',
                    h: '$P(1)>0$, $(-1)^n P(-1)>0$, $|a_0|<|a_n|$.',
                    s: '$P(1)=0{,}56>0$, $P(-1)=1{,}56>0$ (mit $n=2$ also $>0$), $|a_0|=0{,}06<1=|a_n|$. Wurzeln: $z=0{,}25\\pm\\sqrt{0{,}0625-0{,}06}=0{,}25\\pm 0{,}05\\in\\{0{,}3;\\,0{,}2\\}$, beide $|z|<1$. $$\\boxed{\\text{Schur-stabil}}$$<br><em>Quelle:</em> Jury, Theory and Application of the z-Transform Method, Wiley 1964; Kuo 1992, §6.4.'
                }
            ],
            // L2
            [
                {
                    q: 'Berechne den stationären Endwert der Sprungantwort von $G(z)=\\dfrac{0{,}2 z}{(z-1)(z-0{,}6)}$.',
                    h: '$Y(z)=G(z)\\cdot U(z)$ mit $U(z)=z/(z-1)$. Endwertsatz: $y_\\infty=\\lim_{z\\to 1}(z-1)Y(z)$.',
                    s: '$Y(z) = \\dfrac{0{,}2 z}{(z-1)(z-0{,}6)}\\cdot \\dfrac{z}{z-1}$.<br>$y_\\infty=\\lim_{z\\to 1}(z-1)Y(z)$. Hier hat $Y$ einen doppelten Pol bei $z=1\\Rightarrow y_\\infty\\to\\infty$ (Integralwirkung). Korrekt: System hat selbst Integrator $\\Rightarrow$ Sprungantwort wächst linear.<br>Wenn das System direkt ohne externen Integrator betrachtet wird ($Y=G$, $U(z)=z/(z-1)$), erhält man bei $G$ ohne Pol bei 1 einen endlichen Endwert. Hier: System enthält Pol bei 1, daher kein endlicher stationärer Wert.<br>$$\\boxed{y_\\infty\\to\\infty\\ \\text{(integrierendes Verhalten)}}$$'
                },
                {
                    q: 'Diskretisiere $G(s)=\\dfrac{1}{s+a}$ mittels Rückwärts-Euler bei Abtastzeit $T_s$.',
                    h: 'Substitution $s\\to (z-1)/(z T_s)$.',
                    s: '$G(z)=\\dfrac{1}{(z-1)/(zT_s)+a}=\\dfrac{zT_s}{(z-1)+azT_s}=\\dfrac{zT_s}{z(1+aT_s)-1}$.<br>$$\\boxed{G(z)=\\dfrac{T_s\\,z}{(1+aT_s)\\,z-1}}$$'
                },
                {
                    q: 'Untersuche die Stabilität von $H(z)=\\dfrac{1}{z^2-1{,}2 z+0{,}4}$.',
                    h: 'Pole = Nullstellen des Nenners. Stabil, wenn alle $|z_i|<1$. Mitternachtsformel: $z=(1{,}2\\pm\\sqrt{1{,}44-1{,}6})/2$.',
                    s: 'Diskriminante: $1{,}44-1{,}6=-0{,}16<0\\Rightarrow$ komplexe Pole.<br>$z=(1{,}2\\pm j 0{,}4)/2=0{,}6\\pm j 0{,}2$.<br>$|z|=\\sqrt{0{,}36+0{,}04}=\\sqrt{0{,}4}\\approx 0{,}632 < 1$.<br>$$\\boxed{\\text{Stabil}}$$'
                },
                {
                    q: 'Eine zeitdiskrete Strecke $G(z)=\\dfrac{0{,}1}{z-0{,}9}$ wird mit P-Regler $K_R$ geregelt (Standardregelkreis). Bestimme die Bedingung an $K_R>0$ für Stabilität.',
                    h: 'Char. Gleichung $1+K_R G(z)=0$. Pol des geschlossenen Kreises betragsmäßig $<1$.',
                    s: '$1+\\dfrac{0{,}1 K_R}{z-0{,}9}=0\\Rightarrow z=0{,}9-0{,}1 K_R$.<br>Stabil: $|0{,}9-0{,}1 K_R|<1 \\Rightarrow -1<0{,}9-0{,}1 K_R<1$.<br>Linke Bedingung: $0{,}1 K_R<1{,}9 \\Rightarrow K_R<19$.<br>Rechte: $0{,}1 K_R>-0{,}1\\Rightarrow K_R>-1$ (für $K_R>0$ erfüllt).<br>$$\\boxed{0<K_R<19}$$'
                },
                {
                    q: 'Berechne die Sprungantwort $y[k]$ von $G(z)=\\dfrac{0{,}5}{z-0{,}5}$ über Differenzengleichung mit $u[k]=\\sigma[k]$, $y[-1]=0$.',
                    h: 'Differenzengleichung: $y[k]-0{,}5 y[k-1]=0{,}5\\,u[k-1]$. Iterativ einsetzen.',
                    s: 'k=0: $y[0]=0{,}5\\,y[-1]+0{,}5\\,u[-1]=0$.<br>k=1: $y[1]=0{,}5\\cdot 0+0{,}5\\cdot 1=0{,}5$.<br>k=2: $y[2]=0{,}5\\cdot 0{,}5+0{,}5=0{,}75$.<br>k=3: $y[3]=0{,}5\\cdot 0{,}75+0{,}5=0{,}875$.<br>Allgemein: $y[k]=1-0{,}5^k$ für $k\\ge 1$. Endwert: $y_\\infty=1$.'
                },
                {
                    q: 'Welche Eigenschaft der z-Ebene entspricht der linken s-Halbebene? Wie wird $s=-2+j\\pi/T_s$ unter $z=e^{sT_s}$ abgebildet (Abtastzeit $T_s=0{,}5$)?',
                    h: '$z=e^{sT_s}$. Linke s-Halbebene $\\Re(s)<0$ entspricht $|z|<1$.',
                    s: '$z=e^{sT_s}=e^{(-2+j\\pi/T_s)T_s}=e^{-2 T_s}\\cdot e^{j\\pi}$.<br>$T_s=0{,}5\\Rightarrow e^{-1}\\cdot(-1)\\approx -0{,}368$.<br>$|z|\\approx 0{,}368 < 1\\Rightarrow$ stabil. Imaginärteil $\\pi/T_s$ liegt am Rand des Eindeutigkeitsbereichs ($\\pm \\pi/T_s$ ist die Nyquist-Grenze; höhere Frequenzen werden gefaltet $\\to$ Aliasing).'                },
                {
                    q: 'Bilineares Pre-Warping: ein analoger Filter soll Eckfrequenz $\\omega=2\\pi\\cdot 100\\,\\text{rad/s}$ haben. Berechne die anzusetzende Frequenz $\\omega_d$ vor der Tustin-Diskretisierung bei $T_s=1\\,\\text{ms}$.',
                    h: '$\\omega_d=(2/T_s)\\tan(\\omega T_s/2)$.',
                    s: '$\\omega T_s/2 = 2\\pi\\cdot 100 \\cdot 10^{-3}/2 = 0{,}3142\\,\\text{rad}$.<br>$\\tan(0{,}3142)\\approx 0{,}3249$.<br>$\\omega_d=(2/10^{-3})\\cdot 0{,}3249 = 649{,}9\\,\\text{rad/s}$.<br>Vergleich zu nominal $\\omega=628{,}3\\,\\text{rad/s}$ — Pre-Warping korrigiert um $\\sim 3\\,\%$.<br>$$\\boxed{\\omega_d\\approx 650\\,\\text{rad/s}}$$'
                },
                {
                    q: 'Berechne die diskrete Faltung $y[k]=h[k]*u[k]$ mit $h=[1, 0{,}5]$ und $u=[1, 1, 1, 0, 0, \\dots]$ für $k=0,...,3$.',
                    h: '$y[k]=h[0]u[k]+h[1]u[k-1]$.',
                    s: 'k=0: $1\\cdot 1+0{,}5\\cdot 0 = 1$.<br>k=1: $1\\cdot 1+0{,}5\\cdot 1 = 1{,}5$.<br>k=2: $1\\cdot 1+0{,}5\\cdot 1 = 1{,}5$.<br>k=3: $1\\cdot 0+0{,}5\\cdot 1 = 0{,}5$.<br>$$\\boxed{y=[1,\ 1{,}5,\ 1{,}5,\ 0{,}5,\ 0,\\dots]}$$ Bemerkung: Länge der Faltung = Länge $h$ + Länge $u$ - 1.'
                },
                {
                    q: 'Inverse z-Transformation: bestimme $f[k]$ aus $F(z)=\\dfrac{z}{(z-1)(z-0{,}5)}$ via Partialbruchzerlegung.',
                    h: 'Trick: $F(z)/z$ in Partialbrüche zerlegen, dann mit $z$ multiplizieren und korrespondierende Reihen einsetzen.',
                    s: '$\\dfrac{F(z)}{z}=\\dfrac{1}{(z-1)(z-0{,}5)}=\\dfrac{A}{z-1}+\\dfrac{B}{z-0{,}5}$.<br>$A=1/(1-0{,}5)=2$, $B=1/(0{,}5-1)=-2$.<br>$F(z)=\\dfrac{2z}{z-1}-\\dfrac{2z}{z-0{,}5}$.<br>$f[k]=2-2\\cdot 0{,}5^k$ für $k\\ge 0$.<br>$$\\boxed{f[k]=2(1-0{,}5^k)}$$ Endwert: $f_\\infty=2$.'
                },
                {
                    q: 'Approximiere die Übertragungsfunktion $G(s)=\\dfrac{1}{s+1}$ ZOH-äquivalent bei $T_s=0{,}1\\,\\text{s}$. Vergleiche das Ergebnis mit Tustin und Vorwärts-Euler (Pollagen).',
                    h: 'ZOH: $z=e^{-aT_s}$. Tustin: $z=(1-aT_s/2)/(1+aT_s/2)$. Vorwärts: $z=1-aT_s$.',
                    s: 'ZOH: $z = e^{-0{,}1}\\approx 0{,}905$.<br>Tustin: $z=(1-0{,}05)/(1+0{,}05)\\approx 0{,}9048$.<br>Vorwärts-Euler: $z=1-0{,}1=0{,}9$.<br>Alle drei Pole nahe $0{,}905$; Tustin praktisch identisch zu ZOH bei kleinem $T_s$. Vorwärts-Euler kann bei größerem $T_s$ schnell instabil werden, ZOH und Tustin sind robuster.'                },
                {
                    q: 'Diskretisiere den PI-Regler $G_R(s)=K_p+K_i/s$ mit Tustin bei Abtastzeit $T_s$.',
                    h: 'Tustin: $1/s \\to (T_s/2)(z+1)/(z-1)$.',
                    s: '$G_R(z)=K_p+K_i\\,\\dfrac{T_s}{2}\\dfrac{z+1}{z-1}$. Zusammenfassen: $$\\boxed{G_R(z)=\\frac{(K_p+K_i T_s/2)\\,z-(K_p-K_i T_s/2)}{z-1}}$$ Integrator-Pol $z=1$ bleibt exakt erhalten → stationaere Genauigkeit auf Sprunganregung gesichert.<br><em>Quelle:</em> Aström/Wittenmark 1997, §8.4.'
                },
                {
                    q: 'Entwirf einen Dead-Beat-Regler fuer die Strecke $G_S(z)=\\dfrac{0{,}5}{z-0{,}8}$ so, dass die Fuehrungs-Sprungantwort in genau einem Schritt $r$ erreicht ($G_w(z)=z^{-1}$).',
                    h: 'Aus $G_w=G_R G_S/(1+G_R G_S)=z^{-1}$ folgt $G_R G_S = 1/(z-1)$.',
                    s: '$G_R=\\dfrac{1}{z-1}\\cdot\\dfrac{z-0{,}8}{0{,}5}=\\dfrac{2(z-0{,}8)}{z-1}$. $$\\boxed{G_R(z)=\\frac{2(z-0{,}8)}{z-1}}$$ Reglernullstelle hebt den Streckenpol auf; Integralpol $z=1$ sichert stationaere Genauigkeit. Stellgroessen-Peak in den ersten Schritten gross — Robustheitsnachteil bei Modellfehlern.<br><em>Quelle:</em> Foellinger 1990, §7.6.'
                },
                {
                    q: 'Eine Strecke $G(s)=G_0(s)\\,e^{-T_t s}$ hat Totzeit $T_t$. Skizziere die Smith-Praediktor-Struktur und gib die effektive Schleifenuebertragung an.',
                    h: 'Innerer Korrekturpfad mit Modell $G_0$ ohne Totzeit; Differenz $(G_0-G_0 e^{-T_t s})$ wird zurueckgefuehrt.',
                    s: 'Bei modellgenauem $\\hat G_0=G_0$ verschwindet die Totzeit aus der Schleife: effektive Schleife $C(s)G_0(s)$, geschlossener Kreis $$G_w(s)=\\frac{C(s)G_0(s)}{1+C(s)G_0(s)}\\,e^{-T_t s}.$$ Regler $C$ wird am **totzeitfreien** $G_0$ entworfen; Totzeit erscheint nur multiplikativ am Ausgang. Robust nur bei genauer Totzeitkenntnis — Fehler $\\Delta T_t$ koennen den Kreis destabilisieren.<br><em>Quelle:</em> Smith, "Closer Control of Loops with Dead Time", Chem. Eng. Progress 53(5), 1957; Aström/Wittenmark 1997, §10.5.'
                },
                {
                    q: 'Wandle $\\dot x=a x+b u$ mit $a=-2$, $b=1$ in ZOH-aequivalentes zeitdiskretes Zustandsmodell $x[k+1]=A_d x[k]+B_d u[k]$ bei $T_s=0{,}1\\,\\text{s}$ um.',
                    h: '$A_d=e^{a T_s}$, $B_d=a^{-1}(A_d-1)b$ fuer invertierbares $a$.',
                    s: '$A_d=e^{-0{,}2}\\approx 0{,}819$. $B_d=(-1/2)(0{,}819-1)\\cdot 1=(-0{,}5)(-0{,}181)\\approx 0{,}0906$. $$\\boxed{x[k+1]=0{,}819\\,x[k]+0{,}0906\\,u[k]}$$<br><em>Quelle:</em> Aström/Wittenmark 1997, §3.2.'
                },
                {
                    q: 'Formuliere das zeitdiskrete LQR-Problem mit Strafmatrizen $Q\\succeq 0$, $R\\succ 0$ und nenne die diskrete algebraische Riccati-Gleichung (DARE).',
                    h: 'Kostenfunktional $J=\\sum_{k=0}^{\\infty}(x_k^T Q x_k+u_k^T R u_k)$, $u_k=-K x_k$.',
                    s: 'DARE: $$P=A^T P A - A^T P B(R+B^T P B)^{-1}B^T P A + Q,\\quad P\\succ 0.$$ Optimale Rueckfuehrung: $$\\boxed{K=(R+B^T P B)^{-1}B^T P A}$$ Geschlossener Kreis $A-BK$ hat alle Eigenwerte $|z|<1$, sofern $(A,B)$ stabilisierbar und $(A,Q^{1/2})$ detektierbar.<br><em>Quelle:</em> Anderson/Moore, Optimal Control: Linear Quadratic Methods, Prentice Hall 1990, §2.4.'
                },
                {
                    q: 'FIR-Tiefpass: 3-Punkt-Moving-Average $y[k]=(u[k]+u[k-1]+u[k-2])/3$. Berechne $|H(e^{j\\Omega})|$ bei $\\Omega=0$ und $\\Omega=\\pi$ (DC bzw. Nyquist).',
                    h: '$H(z)=(1+z^{-1}+z^{-2})/3$, $z=e^{j\\Omega}$.',
                    s: '$H(e^{j 0})=(1+1+1)/3=1$. $H(e^{j\\pi})=(1-1+1)/3=1/3\\approx 0{,}333$. $$\\boxed{|H(0)|=1,\\ |H(\\pi)|\\approx 0{,}333}$$ Filter daempft Nyquist um etwa $9{,}5\\,\\text{dB}$ und hat lineare Phase (symmetrische Koeffizienten).<br><em>Quelle:</em> Oppenheim/Schafer 2009, §5.4.'
                },
                {
                    q: 'Bestimme das ZOH-Aequivalent des reinen Integrators $G(s)=1/s$ bei Abtastzeit $T_s$.',
                    h: '$G(z)=(1-z^{-1})\\,\\mathcal Z\\{G(s)/s\\}$ mit $G(s)/s=1/s^2$.',
                    s: '$\\mathcal Z\\{1/s^2\\}=T_s\\,z/(z-1)^2$. $G(z)=(1-z^{-1})\\cdot T_s z/(z-1)^2=T_s/(z-1)$. $$\\boxed{G(z)=\\frac{T_s}{z-1}}$$ Diskreter Integrator mit Pol exakt bei $z=1$ → stationaere Endwertgenauigkeit garantiert.<br><em>Quelle:</em> Franklin/Powell/Workman 1998, §6.5.'
                },
                {
                    q: 'Ein $70\\,\\text{Hz}$-Sinus wird mit $f_s=100\\,\\text{Hz}$ abgetastet. Bei welcher Aliasfrequenz $f_a\\in[0,f_s/2]$ erscheint er?',
                    h: 'Spiegelung: $f_a=|f-n f_s|$ minimal in $[0,f_s/2]$.',
                    s: '$f_s/2=50\\,\\text{Hz}<70\\,\\text{Hz}$: Spiegelung. $f_a=|70-100|=30\\,\\text{Hz}\\in[0,50]$. $$\\boxed{f_a=30\\,\\text{Hz}}$$ Anti-Aliasing-Filter haette $70\\,\\text{Hz}$ vor dem ADC daempfen muessen.<br><em>Quelle:</em> Oppenheim/Schafer 2009, §4.2.'
                },
                {
                    q: 'Die w-Transformation $z=(1+w)/(1-w)$ bildet den Einheitskreis im $z$-Bereich auf welche Halbebene im $w$-Bereich ab? Welche Anwendung folgt daraus?',
                    h: '$|z|=1\\iff \\Re\\{w\\}=0$.',
                    s: '$|z|<1\\iff \\Re\\{w\\}<0$: Einheitskreis ↔ linke $w$-Halbebene. Folge: Schur-Stabilitaet kann via Routh-Hurwitz im $w$-Bereich geprueft werden, Bode-/Wurzelort-Methoden uebertragen sich strukturgleich. Frequenzachse heisst pseudo-Frequenz $\\nu$ und ist nicht periodisch.<br><em>Quelle:</em> Aström/Wittenmark 1997, §10.2; Kuo 1992, §7.5.'
                },
                {
                    q: 'Berechne das ZOH-Aequivalent von $G(s)=\\dfrac{1}{s(s+1)}$ bei $T_s=1\\,\\text{s}$.',
                    h: 'Partialbruch $1/(s^2(s+1))=1/s^2-1/s+1/(s+1)$, dann $G(z)=(1-z^{-1})\\mathcal Z\\{\\cdot\\}$.',
                    s: 'Mit $e^{-1}\\approx 0{,}368$ und $\\mathcal Z\\{1/s^2\\}=z/(z-1)^2$, $\\mathcal Z\\{1/s\\}=z/(z-1)$, $\\mathcal Z\\{1/(s+1)\\}=z/(z-0{,}368)$ ergibt sich nach $(1-z^{-1})$-Multiplikation: $$\\boxed{G(z)=\\frac{0{,}368\\,z+0{,}264}{(z-1)(z-0{,}368)}}$$<br><em>Quelle:</em> Franklin/Powell/Workman 1998, Table 6.1.'
                },
                {
                    q: 'Was beschreibt ein RST-Regler in der digitalen Regelungstechnik, und wie sieht das Stellgesetz aus?',
                    h: 'Zwei-Freiheitsgrad-Struktur mit Polynomen $R(z^{-1})$, $S(z^{-1})$, $T(z^{-1})$.',
                    s: 'Stellgesetz $R(z^{-1})\\,u[k]=T(z^{-1})\\,r[k]-S(z^{-1})\\,y[k]$. $S/R$ ist Feedback, $T/R$ Vorsteuerung — Fuehrungs- und Stoerverhalten unabhaengig projektierbar (2-DoF). Polplatzierung via Diophantine-Gleichung $A R + B S = A_c$ bei Strecke $A(z^{-1})y=B(z^{-1})u$.<br><em>Quelle:</em> Aström/Wittenmark 1997, §10.3.'
                },
                {
                    q: 'Warum koennen IIR-Filter in Festkomma-Implementierung Grenzzyklen (Limit Cycles) zeigen, obwohl die Struktur theoretisch stabil ist?',
                    h: 'Rueckkopplung + Rundung wirkt als nichtlineare Stoerung.',
                    s: 'Festkomma-Rundung nach jeder Multiplikation ist eine nichtlineare Operation; sie kann periodische Restschwingungen erzeugen, die nicht abklingen (Zero-Input-Limit-Cycle). Gegenmittel: groessere Wortbreite im rueckgekoppelten Zweig, Direkt-Form-II-transponiert, Cascade/Parallel-Sections, Dithering, oder FIR statt IIR.<br><em>Quelle:</em> Oppenheim/Schafer 2009, §6.9.'
                },
                {
                    q: 'Ein analoger Regler hat Schleifenbandbreite $\\omega_{BW}=20\\,\\text{rad/s}$. Welche Abtastzeit $T_s$ ist als Faustregel sinnvoll, und warum nicht beliebig klein?',
                    h: 'Faustregel $\\omega_s\\approx 10\\dots 30\\,\\omega_{BW}$.',
                    s: 'Untergrenze: $\\omega_s\\ge 10\\,\\omega_{BW}=200\\,\\text{rad/s}\\Rightarrow T_s\\le 2\\pi/200\\approx 31\\,\\text{ms}$. Praxis $T_s\\approx 10\\,\\text{ms}$ ($\\omega_s\\approx 600\\,\\text{rad/s}$). Obergrenze: bei zu kleinem $T_s$ dominiert Quantisierungsrauschen (relative Stufen $q$ groesser), Festkomma-Rundung im Integrator akkumuliert, Rechenlast skaliert $\\propto 1/T_s$. $$\\boxed{T_s\\approx 5\\dots 30\\,\\text{ms}}$$<br><em>Quelle:</em> Franklin/Powell/Workman 1998, §11.2.'
                }
            ],
            // L3
            [
                {
                    q: 'Diskretisiere mit Tustin den PI-Regler $G_R(s)=K_p+\\dfrac{K_i}{s}$ und gib die Differenzengleichung $u[k]$ an.',
                    h: 'Tustin auf I-Anteil anwenden, dann Inverse $z$-Transformation.',
                    s: '$G_R(z)=K_p+K_i\\cdot \\dfrac{T_s}{2}\\dfrac{z+1}{z-1}=\\dfrac{(K_p+K_i T_s/2)z + (K_i T_s/2 - K_p)}{z-1}$.<br>Mit $a=K_p+K_i T_s/2$, $b=K_i T_s/2 - K_p$: $U(z)(z-1)=(a z + b)E(z)$.<br>Differenzengleichung: $u[k]=u[k-1]+a\\,e[k]+b\\,e[k-1]$.<br>$$\\boxed{u[k]=u[k-1]+(K_p+\\tfrac{K_i T_s}{2})e[k]+(\\tfrac{K_i T_s}{2}-K_p)e[k-1]}$$'
                },
                {
                    q: 'Eine Strecke $G_S(z)=\\dfrac{0{,}3}{z-0{,}7}$ soll Deadbeat-geregelt werden (Endwert in 1 Schritt). Berechne den Regler $G_R(z)$ unter idealen Bedingungen.',
                    h: 'Forderung: $G_w(z)=z^{-1}$ (1 Takt Verzögerung). $G_w=G_R G_S/(1+G_R G_S)$. Auflösen.',
                    s: 'Aus $G_w=z^{-1}$ folgt $G_R G_S = z^{-1}/(1-z^{-1})=1/(z-1)$.<br>$G_R = \\dfrac{1}{(z-1)G_S}=\\dfrac{z-0{,}7}{0{,}3(z-1)}$.<br>$$\\boxed{G_R(z)=\\dfrac{z-0{,}7}{0{,}3(z-1)}}$$ Kommentar: Der Regler enthält explizit die inverse Streckendynamik (Pol-Nullstellen-Kompensation) und einen Integrator $\\Rightarrow$ stationär genau. Achtung: bei Modellfehler nicht robust.'
                },
                {
                    q: 'Untersuche die Stabilität von $P(z)=z^3-1{,}5 z^2+0{,}7 z-0{,}1$ mit dem Jury-Kriterium.',
                    h: 'Jury Grad 3 reduziert auf zwei einfache Bedingungen sowie $|a_0|<a_n$. Notwendig: $P(1)>0$, $(-1)^n P(-1)>0$.',
                    s: '$P(1)=1-1{,}5+0{,}7-0{,}1=0{,}1>0$<br>$P(-1)=-1-1{,}5-0{,}7-0{,}1=-3{,}3$, $(-1)^3 P(-1)=3{,}3>0$<br>$|a_0|=0{,}1<1=a_n$<br>Erweiterte Jury-Bedingung: $|a_0^2-a_n^2|>|a_0 a_2 - a_n a_1|\\Rightarrow |0{,}01-1|>|{-0{,}1\\cdot 0{,}7}-1\\cdot(-1{,}5)|=|{-0{,}07+1{,}5}|=1{,}43$.<br>$0{,}99>1{,}43$? Nein.<br>$$\\boxed{\\text{Nicht stabil}}$$ Mindestens ein Pol auf oder außerhalb des Einheitskreises.'
                },
                {
                    q: 'Bestimme die ZOH-äquivalente Diskretisierung von $G(s)=\\dfrac{1}{s+a}$ bei Abtastzeit $T_s$. ($G(z)=(1-z^{-1})\\,\\mathcal{Z}\\!\\left\\{\\dfrac{G(s)}{s}\\right\\}$.)',
                    h: 'Partialbruchzerlegung von $G(s)/s$, dann tabellarische z-Transformation.',
                    s: '$G(s)/s=\\dfrac{1}{s(s+a)}=\\dfrac{1}{a}\\!\\left(\\dfrac{1}{s}-\\dfrac{1}{s+a}\\right)$.<br>z-Trafo: $\\dfrac{1}{a}\\!\\left(\\dfrac{z}{z-1}-\\dfrac{z}{z-e^{-aT_s}}\\right)$.<br>Multiplizieren mit $(1-z^{-1})=(z-1)/z$:<br>$G(z)=\\dfrac{1}{a}\\!\\left(1-\\dfrac{z-1}{z-e^{-aT_s}}\\right)=\\dfrac{1}{a}\\cdot \\dfrac{1-e^{-aT_s}}{z-e^{-aT_s}}\\cdot z\\,/z$.<br>$$\\boxed{G(z)=\\dfrac{(1-e^{-aT_s})/a}{z-e^{-aT_s}}}$$'
                },
                {
                    q: 'Ein digitales Tiefpassfilter 1. Ordnung soll Grenzfrequenz $f_g=10\\,\\text{Hz}$ bei $T_s=1\\,\\text{ms}$ haben. Bestimme den Filterkoeffizienten $\\alpha$ für $y[k]=\\alpha y[k-1]+(1-\\alpha)u[k]$.',
                    h: 'Zeitkonstante $\\tau=1/(2\\pi f_g)$. Diskretisierung über Vorwärts-Euler/Exponential: $\\alpha = e^{-T_s/\\tau}$ (exakt) oder $\\alpha\\approx 1-T_s/\\tau$.',
                    s: '$\\tau=1/(2\\pi\\cdot 10)\\approx 0{,}01592\\,\\text{s}$.<br>Exakt: $\\alpha=e^{-T_s/\\tau}=e^{-0{,}001/0{,}01592}=e^{-0{,}0628}\\approx 0{,}9391$.<br>Approximation: $\\alpha\\approx 1-T_s/\\tau\\approx 1-0{,}0628=0{,}937$.<br>$$\\boxed{\\alpha\\approx 0{,}94,\\ (1-\\alpha)\\approx 0{,}06}$$'
                },
                {
                    q: 'Welcher Aliasing-Fehler entsteht, wenn ein Signal mit $f=600\\,\\text{Hz}$ mit $f_s=1\\,\\text{kHz}$ abgetastet wird? Geben die Aliasfrequenz an.',
                    h: 'Aliasfrequenz: $f_{alias}=|f - n f_s|$, kleinster nicht-negativer Wert $\\le f_s/2$.',
                    s: '$f_s/2=500\\,\\text{Hz}$, signal über Nyquist. $f_{alias}=|600-1000|=400\\,\\text{Hz}$.<br>Das Signal wird als $400\\,\\text{Hz}$-Komponente erkannt $\\Rightarrow$ Aliasing. Abhilfe: analoges Anti-Aliasing-Filter mit Sperre oberhalb $500\\,\\text{Hz}$.<br>$$\\boxed{f_{alias}=400\\,\\text{Hz}}$$'                },
                {
                    q: 'Entwirf einen FIR-Tiefpass der Ordnung 4 mit Hamming-Fenster, Grenzfrequenz $\\omega_c=\\pi/4$. Welche prinzipielle Vorgehensweise ist anzuwenden?',
                    h: 'Idealer Frequenzgang $\\to$ Inverse DTFT (sinc) $\\to$ Fensterung.',
                    s: '1) Idealer LP: $h_d[n]=\\dfrac{\\omega_c}{\\pi}\\operatorname{sinc}(\\omega_c n/\\pi)$ für $n\\in\\mathbb Z$.<br>2) Truncieren auf $N+1=5$ Werte um $n=0$: $n=-2,...,2$.<br>3) Hamming-Fenster: $w[n]=0{,}54-0{,}46\\cos(2\\pi n/N)$.<br>4) $h[n]=h_d[n]\\cdot w[n]$.<br>5) Verschieben um $N/2=2$ (kausal).<br>Vorteil Hamming gegenüber Rechteck: $\\sim 41\\,\\text{dB}$ Sperrdämpfung statt $21\\,\\text{dB}$ (Gibbs-Reduktion).'
                },
                {
                    q: 'Beobachterentwurf zeitdiskret: System $x[k+1]=A x[k]+B u[k]$, $y[k]=Cx[k]$ mit $A=\\begin{pmatrix}0&1\\-0{,}5&1\\end{pmatrix}$, $C=(1,\\,0)$. Wähle $L$ so, dass die Beobachterpole bei $z=0$ liegen (Deadbeat-Beobachter, n=2 Schritte).',
                    h: '$A_{obs}=A-LC$. Wunsch-Polynom $z^2$ (Pole bei 0).',
                    s: '$L=(l_1,l_2)^T$, $LC=\\begin{pmatrix}l_1&0\\l_2&0\\end{pmatrix}$.<br>$A-LC=\\begin{pmatrix}-l_1&1\\-0{,}5-l_2&1\\end{pmatrix}$.<br>Char. Polynom: $z^2-(1-l_1)z + (-l_1+0{,}5+l_2)$.<br>Wunsch $z^2$: Koeffizient $z^1$: $1-l_1=0\\Rightarrow l_1=1$. Koeffizient $z^0$: $-1+0{,}5+l_2=0\\Rightarrow l_2=0{,}5$.<br>$$\\boxed{L=(1,\ 0{,}5)^T}$$ Beobachterfehler klingt in 2 Schritten ab (Deadbeat).'
                },
                {
                    q: 'PI-Regler für eine zeitdiskrete Strecke: was bedeutet "Pol-Nullstellen-Verkürzung im z-Bereich"? Erläutere bei $G_S(z)=\\dfrac{0{,}5}{z-0{,}8}$ und $G_R(z)=\\dfrac{K(z-0{,}8)}{z-1}$.',
                    h: 'Streckenpol durch Reglernullstelle aufheben.',
                    s: 'Schleife $G_0=G_R G_S = \\dfrac{0{,}5 K(z-0{,}8)}{(z-1)(z-0{,}8)} = \\dfrac{0{,}5 K}{z-1}$.<br>Der langsame Streckenpol $z=0{,}8$ wurde durch die Reglernullstelle bei $z=0{,}8$ exakt kompensiert.<br>Geschlossener Kreis: $G_w=\\dfrac{0{,}5 K}{z-1+0{,}5 K}=\\dfrac{0{,}5 K}{z-(1-0{,}5 K)}$ — einpoliger PT1-äquivalenter Verlauf, Pol bei $z=1-0{,}5K$. Stabil für $0<K<4$, Geschwindigkeit über $K$ einstellbar.<br>Achtung: Bei Modellfehlern bleibt ein "fast-stabiler" Restpol nahe $0{,}8$ erhalten (Cancellation nicht exakt).'
                },
                {
                    q: 'Quantisierungsrauschen: ein 12-Bit-ADC, Eingangsbereich $\\pm 5\\,\\text{V}$. Berechne die Quantisierungsstufe $q$ und das SQNR (in dB) für ein vollausgesteuertes Sinussignal.',
                    h: '$q=\\Delta U/2^N$. $SQNR=6{,}02\\,N+1{,}76\\,\\text{dB}$.',
                    s: '$\\Delta U=10\\,\\text{V}$, $q=10/4096\\approx 2{,}44\\,\\text{mV}$.<br>$SQNR=6{,}02\\cdot 12+1{,}76 = 72{,}24+1{,}76=74\\,\\text{dB}$.<br>$$\\boxed{q\\approx 2{,}44\\,\\text{mV},\ SQNR\\approx 74\\,\\text{dB}}$$'                },
                {
                    q: 'Skalares dlqr: $x[k+1]=0{,}9\\,x[k]+u[k]$, $Q=R=1$. Bestimme die Reglerverstaerkung $K$ ueber DARE und nenne den geschlossenen Pol.',
                    h: 'Skalare DARE: $b^2 p^2 + p(R(1-a^2)-Q b^2)-Q R=0$, dann $K=b p a/(R+b^2 p)$.',
                    s: 'Mit $a=0{,}9$, $b=Q=R=1$: $p^2-0{,}81 p-1=0\\Rightarrow p=(0{,}81+\\sqrt{0{,}6561+4})/2\\approx 1{,}484$. $K=0{,}9\\cdot 1{,}484/(1+1{,}484)\\approx 0{,}538$. Geschlossener Pol: $z_{cl}=a-bK\\approx 0{,}362\\in(0,1)$. $$\\boxed{K\\approx 0{,}538,\\ |z_{cl}|\\approx 0{,}362}$$<br><em>Quelle:</em> Anderson/Moore, Optimal Control: Linear Quadratic Methods, Prentice Hall 1990, §3.2.'
                },
                {
                    q: 'Notiere die Praediktions- und Korrekturgleichungen des zeitdiskreten Kalman-Filters fuer $x[k+1]=A x[k]+w[k]$, $y[k]=C x[k]+v[k]$ mit $w\\sim\\mathcal N(0,Q)$, $v\\sim\\mathcal N(0,R)$.',
                    h: 'Time-Update + Measurement-Update.',
                    s: 'Praediktion (a priori): $\\hat x_{k|k-1}=A\\hat x_{k-1|k-1}$, $P_{k|k-1}=A P_{k-1|k-1}A^T+Q$.<br>Innovation: $\\tilde y_k=y_k-C\\hat x_{k|k-1}$, $S_k=C P_{k|k-1}C^T+R$.<br>Kalman-Verstaerkung: $L_k=P_{k|k-1}C^T S_k^{-1}$.<br>Korrektur (a posteriori): $\\hat x_{k|k}=\\hat x_{k|k-1}+L_k\\tilde y_k$, $P_{k|k}=(I-L_k C)P_{k|k-1}$.<br>Stationaer: $P_\\infty$ aus DARE $P=A P A^T-A P C^T(R+C P C^T)^{-1}C P A^T+Q$.<br><em>Quelle:</em> Kalman, "A New Approach to Linear Filtering and Prediction Problems", ASME J. Basic Eng. 82(1), 1960; Anderson/Moore, Optimal Filtering, Prentice Hall 1979, §4.3.'
                },
                {
                    q: 'Pruefe ueber das Jury-Kriterium die Schur-Stabilitaet von $P(z)=z^3+0{,}2 z^2+0{,}5 z-0{,}1$.',
                    h: 'Notwendige Bedingungen + Jury-Tabelle.',
                    s: 'Notwendig: $P(1)=1{,}6>0$; $-P(-1)=-(-1+0{,}2-0{,}5-0{,}1)=1{,}4>0$; $|a_0|=0{,}1<1=|a_3|$. Jury-Reduktion mit $b_k=a_k-(a_0/a_n)a_{n-k}$: $b_0=1-(-0{,}1)(-0{,}1)=0{,}99$, $b_1=0{,}2-(-0{,}1)(0{,}5)=0{,}25$, $b_2=0{,}5-(-0{,}1)(0{,}2)=0{,}52$. $|b_0|=0{,}99>|b_2|=0{,}52$ → ok. Zweite Reduktion: $c_0\\approx 0{,}717$, $c_1\\approx 0{,}119$, $|c_0|>|c_1|$ → ok. $$\\boxed{P(z)\\ \\text{Schur-stabil}}$$<br><em>Quelle:</em> Jury 1964; Kuo 1992, §6.4.'
                },
                {
                    q: 'Strecke $x[k+1]=\\begin{pmatrix}0&1\\\\-0{,}5&1{,}2\\end{pmatrix}x[k]+\\begin{pmatrix}0\\\\1\\end{pmatrix}u[k]$. Entwirf via Ackermann ein Dead-Beat-Regler $u=-K x$, das alle Pole nach $z=0$ legt.',
                    h: 'Ackermann: $K=(0\\;\\dots\\;1)\\,\\mathcal C^{-1}\\,\\alpha_c(A)$ mit $\\alpha_c(z)=z^2$ (Dead-Beat in 2 Schritten).',
                    s: '$\\mathcal C=[B\\;AB]=\\begin{pmatrix}0&1\\\\1&1{,}2\\end{pmatrix}$, $\\det\\mathcal C=-1$, $\\mathcal C^{-1}=\\begin{pmatrix}-1{,}2&1\\\\1&0\\end{pmatrix}$. $A^2=\\begin{pmatrix}-0{,}5&1{,}2\\\\-0{,}6&0{,}94\\end{pmatrix}$. $K=(0\\;1)\\mathcal C^{-1}A^2=(1\\;0)\\,A^2=(-0{,}5\\;\\;1{,}2)$. $$\\boxed{K=(-0{,}5\\;\\;1{,}2)}$$ Pruefung $A-BK=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ — beide Eigenwerte $z=0$, Dead-Beat in 2 Schritten.<br><em>Quelle:</em> Ackermann, "Der Entwurf linearer Regelungssysteme im Zustandsraum", Regelungstechnik 20(7), 1972; Franklin/Powell/Workman 1998, §8.3.'
                },
                {
                    q: 'Wie wird ein zeitdiskreter Luenberger-Beobachter fuer $x[k+1]=A x[k]+B u[k]$, $y[k]=C x[k]$ aufgesetzt, und welche Eigenwertbedingung gilt fuer den Schaetzfehler?',
                    h: 'Praediktor-Beobachter: $\\hat x[k+1]=A\\hat x[k]+B u[k]+L(y[k]-C\\hat x[k])$.',
                    s: 'Schaetzfehler $e=x-\\hat x$ folgt $e[k+1]=(A-LC)\\,e[k]$. Stabilitaet/Geschwindigkeit ueber Eigenwerte von $A-LC$: innerhalb $|z|<1$, in der Regel **schneller** als die Reglerpole gewaehlt (Faktor 2–5 naeher am Ursprung). Separationsprinzip → Beobachter- und Reglerentwurf bei LTI-Systemen unabhaengig. $L$ via Ackermann angewandt auf duales Paar $(A^T, C^T)$.<br><em>Quelle:</em> Luenberger, "An Introduction to Observers", IEEE TAC 16(6), 1971.'
                },
                {
                    q: 'IMC im z-Bereich: bestimme den IMC-Regler $Q(z)$ fuer $G_S(z)=\\dfrac{0{,}2}{z-0{,}8}$ mit Tiefpassfilter $F(z)=(1-\\lambda)/(z-\\lambda)$, $\\lambda=0{,}5$. Welcher klassische Standardregler $G_R(z)$ entsteht?',
                    h: '$Q=G_S^{-1}F$, dann Aequivalenz $G_R=Q/(1-Q G_S)$.',
                    s: '$G_S^{-1}=(z-0{,}8)/0{,}2=5(z-0{,}8)$. $Q(z)=5(z-0{,}8)\\cdot 0{,}5/(z-0{,}5)=2{,}5(z-0{,}8)/(z-0{,}5)$.<br>$Q G_S=0{,}5/(z-0{,}5)$, $1-Q G_S=(z-1)/(z-0{,}5)$.<br>$G_R=Q/(1-Q G_S)=2{,}5(z-0{,}8)/(z-1)$. $$\\boxed{G_R(z)=\\frac{2{,}5(z-0{,}8)}{z-1}}$$ Pol-Nullstellen-Kompensation der Strecke; Integralpol $z=1$ sichert stationaere Genauigkeit.<br><em>Quelle:</em> Morari/Zafiriou, Robust Process Control, Prentice Hall 1989, §4.3.'
                },
                {
                    q: 'Generalized Predictive Control (GPC): wie lautet das quadratische Kostenfunktional, und wie wird die optimale Stellgroessensequenz analytisch berechnet (ohne Beschraenkungen)?',
                    h: 'Vorhersagehorizont $N$, Stellhorizont $N_u$, Gewichtung $\\lambda$.',
                    s: 'Kosten: $$J=\\sum_{j=1}^{N}(\\hat y[k+j]-r[k+j])^2+\\lambda\\sum_{j=1}^{N_u}\\Delta u[k+j-1]^2.$$ Vorhersage aus CARIMA-Modell, gestapelt $\\hat Y=G\\Delta U+f$ (Schritt-Antwort-Matrix $G$, freie Antwort $f$). Loesung: $$\\boxed{\\Delta U^*=(G^T G+\\lambda I)^{-1}G^T(R-f)}$$ Nur erstes Element $\\Delta u[k]$ wird angewandt (Receding-Horizon); naechster Schritt erneut optimiert. Mit Stell-/Ausgangsbeschraenkungen wird $\\Delta U^*$ aus einem QP gewonnen.<br><em>Quelle:</em> Clarke/Mohtadi/Tuffs, "Generalized Predictive Control", Automatica 23(2), 1987.'
                },
                {
                    q: 'Wie lautet die Nyquist-Stabilitaetsbedingung fuer einen zeitdiskreten Regelkreis mit Schleifenuebertragung $L(z)$? Welcher Pfad wird in der $z$-Ebene durchlaufen?',
                    h: 'Statt $j\\omega$-Achse im $s$-Bereich der Einheitskreis im $z$-Bereich.',
                    s: 'Konturpfad $z=e^{j\\Omega}$, $\\Omega\\in[0,2\\pi)$. Cauchy-Argumentprinzip auf $1+L(z)$: $$N=Z-P,$$ $N$=Uhrzeiger-Umlaeufe von $L(e^{j\\Omega})$ um $-1$, $P$=Pole von $L(z)$ ausserhalb des Einheitskreises, $Z$=geschlossene-Kreis-Pole ausserhalb. Stabil $\\iff Z=0$. Amplituden- und Phasenrand wie im kontinuierlichen Fall, die Frequenzachse ist nun periodisch mit $2\\pi/T_s$.<br><em>Quelle:</em> Aström/Wittenmark 1997, §6.4.'
                },
                {
                    q: 'Begruende die Faustregel $\\omega_s\\approx 10\\dots 20\\,\\omega_{BW}$ als Kompromiss zwischen Phasenreserve, Quantisierung und Rechenlast.',
                    h: 'ZOH-Phasenverzoegerung $-\\omega T_s/2$; Quantisierungsrauschen; Rechenzeit.',
                    s: 'Untergrenze: ZOH bringt Phasenverlust $\\approx -\\omega T_s/2$ ein. Bei $\\omega_s=10\\,\\omega_{BW}$ und $\\omega=\\omega_{BW}$: $-\\omega_{BW}\\cdot \\pi/\\omega_s\\approx -18°$, vertraeglich. Bei $\\omega_s=2\\,\\omega_{BW}$ (Shannon-Minimum) waeren es $-90°$ → Kreis instabil. Obergrenze: bei sehr kleinem $T_s$ dominiert Sensor-Quantisierung $q$, $\\Delta u$-Bildung verstaerkt Rundungsfehler, Rechenlast skaliert $\\propto 1/T_s$. Praxisbereich $10\\dots 20\\,\\omega_{BW}$ balanciert beide Effekte.<br><em>Quelle:</em> Franklin/Powell/Workman 1998, §11.2; Aström/Wittenmark 1997, §7.5.'
                },
                {
                    q: 'Erklaere "Back-Calculation"-Anti-Windup fuer einen zeitdiskreten PID-Regler mit Stellgroessenbegrenzung $u\\in[u_{min},u_{max}]$.',
                    h: 'Integratorrueckschnitt mit Tracking-Zeit $T_t$.',
                    s: 'Reglerausgang $u_R[k]$ wird durch Saettigung gefuehrt: $u[k]=\\mathrm{sat}(u_R[k])$. Differenz $u[k]-u_R[k]$ wird mit Gewicht $T_s/T_t$ in den Integrator zurueckgespeist: $$I[k+1]=I[k]+K_i T_s\\,e[k]+\\frac{T_s}{T_t}\\bigl(u[k]-u_R[k]\\bigr).$$ Im linearen Bereich gleich Null → Standard-Verhalten. Faustregel (Aström/Hägglund): $T_t\\approx \\sqrt{T_i T_d}$. Wirkung: Integrator laeuft nicht weg, schnellere Erholung nach Saettigungsende.<br><em>Quelle:</em> Aström/Hägglund, Advanced PID Control, ISA 2006, §3.5.'
                },
                {
                    q: 'Skizziere die Konstruktionsregeln des Wurzelorts in der $z$-Ebene fuer $1+K\\,L(z)=0$. Was unterscheidet die Konstruktion von der $s$-Ebenen-Variante?',
                    h: 'Identische topologische Regeln, andere Stabilitaetsgrenze.',
                    s: 'Phasenbedingung $\\angle L(z)=180°$, Asymptoten, Verzweigungspunkte, Polabgang — formal identisch zum $s$-Ebenen-Wurzelort. Stabilitaetsgrenze ist jedoch der **Einheitskreis** $|z|=1$ (statt $j$-Achse): Schnittpunkt mit $|z|=1$ liefert kritische Verstaerkung $K_{krit}$ und Eigenfrequenz $\\omega_{krit}=\\arg(z)/T_s$. Eintritt in $|z|<1$ entspricht stabiler, Verlassen instabiler Lage.<br><em>Quelle:</em> Kuo 1992, §8.6; Franklin/Powell/Workman 1998, §7.4.'
                },
                {
                    q: 'Eine kaskadierte Lageregelung hat eine schnelle innere Stromschleife ($T_{s,1}=0{,}1\\,\\text{ms}$) und eine langsame aeussere Lageschleife ($T_{s,2}=1\\,\\text{ms}$). Welche Vorteile bietet Multi-Rate-Sampling, und welche Stabilitaetsfalle muss vermieden werden?',
                    h: 'Effiziente Rechenlastverteilung; Aliasing beim Downsampling.',
                    s: 'Vorteile: schnelle Schleife mit hoher Bandbreite (Stromregler + Anti-Windup), aeussere Schleife mit niedrigerer Rate → Rechenlast reduziert, Sensor-Quantisierungsrauschen wird im aeusseren Loop gemittelt. Stabilitaetsfalle: Downsampling von $T_{s,1}$ auf $T_{s,2}$ ohne **digitales Anti-Aliasing-Filter** erzeugt Alias-Frequenzen $>1/(2T_{s,2})=500\\,\\text{Hz}$, die als Stoerung in die aeussere Schleife einlaufen. Loesung: Mittelung ueber Faktor 10 vor dem Downsampling. Faustregel: aeussere Bandbreite $\\le 1/(10\\,T_{s,2})$.<br><em>Quelle:</em> Aström/Wittenmark 1997, §11.4.'
                },
                {
                    q: 'Schaetze die Amplitudengrenze fuer Zero-Input-Limit-Cycles in $y[k]=\\alpha y[k-1]+u[k]$ ($\\alpha=0{,}9$) bei $b$-Bit-Festkomma ($q=2^{-b}$).',
                    h: 'Jackson-Schranke: $|y_{lc}|\\le q/(2(1-|\\alpha|))$.',
                    s: '$|y_{lc}|\\le q/(2\\cdot 0{,}1)=5q$. Bei $b=16$ ist $q=2^{-16}\\approx 1{,}53\\cdot 10^{-5}$, also $|y_{lc}|\\le 7{,}6\\cdot 10^{-5}$ (rel. zum Vollbereich). Nahe $|\\alpha|\\to 1$ explodiert die Schranke $\\propto 1/(1-|\\alpha|)$. Gegenmittel: doppelte Wortbreite im rueckgekoppelten Zweig, Cascade-/Parallel-Form, Dithering.<br><em>Quelle:</em> Jackson, "An Analysis of Limit Cycles due to Multiplication Rounding in Recursive Digital Filters", Proc. 7th Allerton Conf., 1969; Oppenheim/Schafer 2009, §6.9.'
                },
                {
                    q: 'Identifikation: bestimme die Parameter $\\theta=(a_1,b_1)$ eines ARX-Modells $y[k]+a_1 y[k-1]=b_1 u[k-1]$ aus $N$ Messungen via Least-Squares.',
                    h: 'Regressionsform $y=\\Phi\\theta+\\varepsilon$, dann $\\hat\\theta=(\\Phi^T\\Phi)^{-1}\\Phi^T y$.',
                    s: 'Regressor pro Schritt: $\\varphi[k]=(-y[k-1],\\;u[k-1])^T$. Zielvektor $y=(y[1],\\dots,y[N])^T$, Datenmatrix $\\Phi=(\\varphi[1],\\dots,\\varphi[N])^T\\in\\mathbb R^{N\\times 2}$. Normalgleichung $\\Phi^T\\Phi\\,\\hat\\theta=\\Phi^T y$ liefert $$\\boxed{\\hat\\theta=(\\Phi^T\\Phi)^{-1}\\Phi^T y}.$$ Voraussetzung: $\\Phi$ vollen Spaltenrang (persistente Anregung 2. Ordnung des Eingangs). Konsistent fuer $N\\to\\infty$ bei weissem Rauschen; bei farbigem Rauschen Bias → ARMAX oder IV-Methoden.<br><em>Quelle:</em> Ljung, System Identification: Theory for the User, 2nd ed., Prentice Hall 1999, §7.3.'
                }
            ]
        ]
    };
})();
