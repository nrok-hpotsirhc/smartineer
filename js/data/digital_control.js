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
            $\\lim_{k\\to\\infty} f[k]=\\lim_{z\\to 1}(z-1)F(z)$ (sofern Pole innerhalb / auf $|z|=1$)
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
                    s: '$F(z)=\\sum_{k=0}^\\infty z^{-k}=\\dfrac{1}{1-z^{-1}}=\\dfrac{z}{z-1}$ für $|z|>1$.<br>$$\\boxed{\\mathcal{Z}\\{\\sigma[k]\\}=\\dfrac{z}{z-1}}$$'
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
                    s: '$z=e^{sT_s}=e^{(-2+j\\pi/T_s)T_s}=e^{-2 T_s}\\cdot e^{j\\pi}$.<br>$T_s=0{,}5\\Rightarrow e^{-1}\\cdot(-1)\\approx -0{,}368$.<br>$|z|\\approx 0{,}368 < 1\\Rightarrow$ stabil. Imaginärteil $\\pi/T_s$ liegt am Rand des Eindeutigkeitsbereichs ($\\pm \\pi/T_s$ ist die Nyquist-Grenze; höhere Frequenzen werden gefaltet $\\to$ Aliasing).'
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
                    s: '$f_s/2=500\\,\\text{Hz}$, signal über Nyquist. $f_{alias}=|600-1000|=400\\,\\text{Hz}$.<br>Das Signal wird als $400\\,\\text{Hz}$-Komponente erkannt $\\Rightarrow$ Aliasing. Abhilfe: analoges Anti-Aliasing-Filter mit Sperre oberhalb $500\\,\\text{Hz}$.<br>$$\\boxed{f_{alias}=400\\,\\text{Hz}}$$'
                }
            ]
        ]
    };
})();
