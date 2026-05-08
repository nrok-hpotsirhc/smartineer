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
            $G(z)=(1-z^{-1})\\,\\mathcal{Z}\\!\\left\{\\dfrac{G(s)}{s}\\right\}$<br><br>
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
                    s: '<strong>FIR</strong> (Finite Impulse Response): $y[k]=\\sum_{i=0}^{N} b_i u[k-i]$, keine Rückführung. Immer stabil, lineare Phase möglich, ggf. hohe Ordnung.<br><strong>IIR</strong> (Infinite Impulse Response): $y[k]=\\sum b_i u[k-i] - \\sum a_j y[k-j]$ mit Rückführung. Geringere Ordnung für gleiche Steilheit, aber Stabilität explizit prüfen, nichtlineare Phase.<br>Anwendung: FIR für phasenkritische Audio-/Mess-Anwendungen, IIR für effiziente Steilflanken.'                }
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
                    s: 'ZOH: $z = e^{-0{,}1}\\approx 0{,}905$.<br>Tustin: $z=(1-0{,}05)/(1+0{,}05)\\approx 0{,}9048$.<br>Vorwärts-Euler: $z=1-0{,}1=0{,}9$.<br>Alle drei Pole nahe $0{,}905$; Tustin praktisch identisch zu ZOH bei kleinem $T_s$. Vorwärts-Euler kann bei größerem $T_s$ schnell instabil werden, ZOH und Tustin sind robuster.'                }
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
                    s: '$P(1)=1-1{,}5+0{,}7-0{,}1=0{,}1>0$ ✓<br>$P(-1)=-1-1{,}5-0{,}7-0{,}1=-3{,}3$, $(-1)^3 P(-1)=3{,}3>0$ ✓<br>$|a_0|=0{,}1<1=a_n$ ✓<br>Erweiterte Jury-Bedingung: $|a_0^2-a_n^2|>|a_0 a_2 - a_n a_1|\\Rightarrow |0{,}01-1|>|{-0{,}1\\cdot 0{,}7}-1\\cdot(-1{,}5)|=|{-0{,}07+1{,}5}|=1{,}43$.<br>$0{,}99>1{,}43$? Nein.<br>$$\\boxed{\\text{Nicht stabil}}$$ Mindestens ein Pol auf oder außerhalb des Einheitskreises.'
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
                    s: '$\\Delta U=10\\,\\text{V}$, $q=10/4096\\approx 2{,}44\\,\\text{mV}$.<br>$SQNR=6{,}02\\cdot 12+1{,}76 = 72{,}24+1{,}76=74\\,\\text{dB}$.<br>$$\\boxed{q\\approx 2{,}44\\,\\text{mV},\ SQNR\\approx 74\\,\\text{dB}}$$'                }
            ]
        ]
    };
})();
