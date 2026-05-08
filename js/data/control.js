/* Regelungstechnik (kontinuierlich) */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'control';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Regelungstechnik',
        desc: 'Übertragungsfunktionen, PID-Regler, Stabilitätsanalyse (Hurwitz, Routh, Nyquist), Bode-Diagramm, Wurzelortskurven.',
        formulas: `
            <strong>Geschlossener Regelkreis</strong><br>
            Gegenkopplung: $G_w = \\dfrac{G(s)}{1+G(s)H(s)}$<br>
            Direkte Gegenkopplung ($H=1$): $G_w = \\dfrac{G}{1+G}$<br><br>
            <strong>PID-Regler</strong><br>
            Zeitbereich: $u(t)=K_p e + K_i\\int e\\,dt + K_d\\dot e$<br>
            Bildbereich: $G_R(s)=K_p+\\dfrac{K_i}{s}+K_d s$<br><br>
            <strong>Standard PT1, PT2, I, D</strong><br>
            $G_{PT1}=\\dfrac{K}{1+Ts}$, $G_{PT2}=\\dfrac{K\\omega_n^2}{s^2+2D\\omega_n s+\\omega_n^2}$<br>
            $G_I=\\dfrac{K_i}{s}$, $G_D=K_d s$<br><br>
            <strong>Hurwitz (Grad 3)</strong><br>
            $a_3 s^3+a_2 s^2+a_1 s+a_0$ stabil $\\iff$ alle $a_i>0$ und $a_2 a_1 - a_3 a_0 > 0$<br><br>
            <strong>Stationäre Werte</strong><br>
            Endwertsatz: $\\lim_{t\\to\\infty}y(t)=\\lim_{s\\to 0} sY(s)$<br>
            Anfangswertsatz: $\\lim_{t\\to 0^+}y(t)=\\lim_{s\\to\\infty} sY(s)$<br><br>
            <strong>Bode</strong><br>
            $|G(j\omega)|_{dB}=20\log_{10}|G(j\omega)|$, $\varphi=\arg G(j\omega)$<br><br>
            <strong>Zeitkonstanten / Spezifikationen</strong><br>
            PT1-Anstiegszeit ($10\%\to 90\%$): $t_r\approx 2{,}2\,T$<br>
            PT2-Überschwingen: $\ddot M_p=\exp(-\pi D/\sqrt{1-D^2})$<br><br>
            <strong>Lead-/Lag-Glied</strong><br>
            $G_{lead}(s)=\dfrac{1+\alpha T s}{1+T s}$ mit $\alpha>1$ (Phasenanhebung)<br><br>
            <strong>Reale D-Glieder (DT1)</strong><br>
            $G_{DT1}(s)=\dfrac{T_v s}{1+T_1 s}$<br><br>
            <strong>Routh-Hurwitz Schema</strong><br>
            Erste Spalte $>0$ für alle Zeilen $\Rightarrow$ stabil<br><br>
            <strong>Smith-Prädiktor</strong> (Totzeit-Kompensation)<br>
            $G_{eff}(s)=\dfrac{G_R}{1+G_R G_{Modell}(1-e^{-T_t s})}$<br><br>
            <strong>Anti-Windup</strong><br>
            Back-Calculation: $u_I\leftarrow u_I + (u_{sat}-u)/T_t$ während Sättigung
        `,
        levels: [
            // L1
            [
                {
                    q: 'Gib die Gesamtübertragungsfunktion $G_w(s)$ einer Gegenkopplung mit Vorwärtszweig $G(s)$ und Rückführung $H(s)$ an. Vereinfache für $H(s)=1$.',
                    h: 'Allg. Formel: $G_w=\\dfrac{\\text{Vorwärts}}{1+\\text{Schleife}}$.',
                    s: '$$G_w(s)=\\frac{G(s)}{1+G(s)H(s)}$$ Für $H(s)=1$: $$G_w(s)=\\frac{G(s)}{1+G(s)}$$'
                },
                {
                    q: 'Bestimme die Übertragungsfunktion $G_R(s)=U(s)/E(s)$ eines PID-Reglers $u(t)=K_p e + K_i\\int e\\,dt + K_d \\dot e$.',
                    h: 'Laplace gliedweise. $\\int\\to 1/s$, $d/dt\\to s$.',
                    s: '$U(s) = K_p E + \\tfrac{K_i}{s}E + K_d s E$.<br>$$\\boxed{G_R(s)=K_p+\\frac{K_i}{s}+K_d s = \\frac{K_d s^2 + K_p s + K_i}{s}}$$'
                },
                {
                    q: 'Ein PT1-Glied $G(s)=\\dfrac{2}{1+0{,}5\\,s}$ wird mit einem Sprung $u(t)=\\sigma(t)$ angeregt. Ermittle den stationären Endwert $y_\\infty$.',
                    h: 'Endwertsatz: $y_\\infty=\\lim_{s\\to 0}sY(s)=\\lim_{s\\to 0}sG(s)U(s)$, $U(s)=1/s$.',
                    s: '$Y(s)=G(s)\\cdot \\tfrac{1}{s}=\\dfrac{2}{s(1+0{,}5\\,s)}$.<br>$y_\\infty=\\lim_{s\\to 0}sY(s)=\\lim_{s\\to 0}\\dfrac{2}{1+0{,}5\\,s}=2$.<br>$$\\boxed{y_\\infty=2}$$ (entspricht der DC-Verstärkung $K=G(0)$).'
                },
                {
                    q: 'Bestimme die Pole von $G(s)=\\dfrac{1}{s^2+3s+2}$ und beurteile die Stabilität.',
                    h: 'Pole = Nullstellen des Nenners. Stabil, wenn alle $\\Re(p_i)<0$.',
                    s: 'Mitternachtsformel: $s=(-3\\pm\\sqrt{9-8})/2=(-3\\pm 1)/2$.<br>$p_1=-1,\\ p_2=-2$. Beide reell und negativ $\\Rightarrow$ stabil.'
                },
                {
                    q: 'Welche Sprungantwort ergibt sich für $G(s)=\\dfrac{K}{1+Ts}$? (Allgemein im Zeitbereich.)',
                    h: '$Y(s)=G(s)/s$, Partialbruchzerlegung, Rücktransformation.',
                    s: '$Y(s)=\\dfrac{K}{s(1+Ts)} = \\dfrac{K}{s}-\\dfrac{KT}{1+Ts}$ (PBZ).<br>Rücktransformation: $y(t)=K - Ke^{-t/T} = K(1-e^{-t/T})$ für $t\\ge0$.<br>$$\\boxed{y(t)=K\\,(1-e^{-t/T})}$$'
                },
                {
                    q: 'Bestimme den Frequenzgang-Betrag $|G(j\\omega)|$ und die Phase $\\varphi(\\omega)$ eines Integrierers $G(s)=K_i/s$.',
                    h: 'Setze $s=j\\omega$ ein.',
                    s: '$G(j\\omega)=\\dfrac{K_i}{j\\omega}=-j\\dfrac{K_i}{\\omega}$.<br>$|G(j\\omega)|=\\dfrac{K_i}{\\omega}$. Phase: $-90^\\circ$ (konstant).<br>Im Bode: -20 dB/Dekade Steigung, durch $\\omega = K_i$ bei 0 dB.'                },
                {
                    q: 'Wie groß ist die Anstiegszeit $t_r$ ($10\,\%\to 90\,\%$) eines PT1-Glieds mit $T=0{,}2\,\text{s}$?',
                    h: 'Faustformel: $t_r\approx 2{,}2\,T$. (Aus $1-e^{-t/T}=0{,}9$ und $0{,}1$.)',
                    s: '$t_{90}=T\ln 10\approx 2{,}303\,T$. $t_{10}=T\ln(10/9)\approx 0{,}105\,T$. $t_r=t_{90}-t_{10}\approx 2{,}197\,T$.<br>Mit $T=0{,}2\,\text{s}$: $t_r\approx 0{,}44\,\text{s}$.<br>$$\boxed{t_r\approx 0{,}44\,\text{s}}$$'
                },
                {
                    q: 'Reihenschaltung zweier PT1-Glieder $G_1=\dfrac{1}{1+s}$ und $G_2=\dfrac{2}{1+0{,}5\,s}$. Bestimme $G(s)$ und die DC-Verstärkung.',
                    h: 'Reihe = Multiplikation. DC-Verstärkung: $G(0)$.',
                    s: '$G(s)=G_1 G_2 = \dfrac{2}{(1+s)(1+0{,}5\,s)}$.<br>$G(0)=2$.<br>Pole: $-1$ und $-2$ (aus $1+0{,}5\,s=0\Rightarrow s=-2$). System ist stabil.<br>$$\boxed{G(s)=\dfrac{2}{(1+s)(1+0{,}5\,s)},\ K=2}$$'
                },
                {
                    q: 'Warum ist der ideale D-Regler $G_D=K_d s$ in der Praxis nicht realisierbar? Welche Realisierung wird stattdessen verwendet?',
                    h: 'Hochfrequenzverstärkung von idealem D wird unendlich.',
                    s: 'Idealer D: $|G_D(j\omega)|=K_d\omega\to\infty$ für $\omega\to\infty$ $\Rightarrow$ extreme Rauschverstärkung, kein kausaler Realisierer (Zähler-grad > Nenner-grad).<br>Realer DT1: $G_{DT1}(s)=\dfrac{T_v s}{1+T_1 s}$ mit $T_1\ll T_v$ (z.B. $T_1=T_v/10$). Begrenzt die Hochfrequenzverstärkung auf $T_v/T_1$ und macht das Glied physikalisch realisierbar.'
                },
                {
                    q: 'Bestimme die Übertragungsfunktion einer Parallelschaltung von $G_1=\dfrac{2}{s+1}$ und $G_2=\dfrac{1}{s}$ (gleicher Eingang, summierende Ausgänge).',
                    h: 'Parallel = Summe. Auf gemeinsamen Nenner bringen.',
                    s: '$G(s)=G_1+G_2 = \dfrac{2}{s+1}+\dfrac{1}{s}=\dfrac{2s+(s+1)}{s(s+1)}=\dfrac{3s+1}{s(s+1)}$.<br>$$\boxed{G(s)=\dfrac{3s+1}{s(s+1)}}$$'                }
            ],
            // L2
            [
                {
                    q: 'Prüfe die Stabilität des charakteristischen Polynoms $P(s)=s^3+2s^2+s+2=0$ mit Hurwitz.',
                    h: 'Notwendig: $a_i>0$. Hinreichend bei Grad 3: $a_2 a_1 - a_3 a_0 > 0$.',
                    s: '$a_3=1,\\ a_2=2,\\ a_1=1,\\ a_0=2$. Alle positiv ✓.<br>$\\Delta = a_2 a_1 - a_3 a_0 = 2-2 = 0$.<br>$\\Delta=0\\Rightarrow$ <strong>nicht asymptotisch stabil</strong> (Grenzstabil; konjugiert imaginäre Pole bei $\\pm j$).<br>Tatsächlich: $P(s)=(s+2)(s^2+1)\\Rightarrow$ Pole $-2,\\ \\pm j$. ✓'
                },
                {
                    q: 'Ein PT2-System $G(s)=\\dfrac{\\omega_n^2}{s^2+2D\\omega_n s+\\omega_n^2}$ hat $\\omega_n=10\\,\\text{rad/s}$ und $D=0{,}5$. Bestimme die Eigenfrequenz $\\omega_d$ der gedämpften Schwingung und die Pole.',
                    h: 'Pole: $s_{1,2}=-D\\omega_n \\pm j\\omega_n\\sqrt{1-D^2}$. $\\omega_d=\\omega_n\\sqrt{1-D^2}$.',
                    s: '$D\\omega_n=5$, $\\omega_n\\sqrt{1-D^2}=10\\sqrt{0{,}75}\\approx 8{,}66$.<br>$$s_{1,2}=-5\\pm j\\,8{,}66$$<br>$$\\omega_d\\approx 8{,}66\\ \\text{rad/s}$$<br>Bemerkung: $D<1\\Rightarrow$ unterdämpft, oszillierende Sprungantwort.'
                },
                {
                    q: 'Ein P-Regler $K_R$ steuert eine Strecke $G_S(s)=\\dfrac{1}{s(s+2)}$ im Standard-Regelkreis. Für welches $K_R$ ist der geschlossene Kreis grenzstabil?',
                    h: 'Char. Polynom $1+K_R G_S=0$ aufstellen, dann Stabilitätsbedingungen prüfen.',
                    s: '$1+\\dfrac{K_R}{s(s+2)}=0\\Rightarrow s^2+2s+K_R=0$.<br>Hurwitz Grad 2: stabil $\\iff a_i>0$, also $K_R>0$. Grenzstabil bei $K_R=0$ (Pol bei 0). Für jedes $K_R>0$ ist das System stabil ($D=1/\\sqrt{K_R}>0$).<br>$$\\boxed{K_R = 0\\text{ (Grenze)};\\ K_R>0 \\Rightarrow \\text{stabil}}$$'
                },
                {
                    q: 'Berechne die stationäre Regelabweichung eines I-freien P-Regelkreises mit $G_R=K_p$, $G_S(s)=\\dfrac{1}{1+Ts}$ bei Sprungstörung am Eingang $W(s)=1/s$.',
                    h: '$E(s)=\\tfrac{1}{1+G_R G_S}W(s)$. Endwertsatz.',
                    s: 'Schleife $G_0=K_p/(1+Ts)$. $E(s)=\\dfrac{1}{1+G_0}\\cdot\\dfrac{1}{s}=\\dfrac{1+Ts}{1+Ts+K_p}\\cdot\\dfrac{1}{s}$.<br>$e_\\infty=\\lim_{s\\to 0}sE(s)=\\dfrac{1}{1+K_p}$.<br>$$\\boxed{e_\\infty=\\dfrac{1}{1+K_p}}$$ (P-Regler an P-Strecke $\\Rightarrow$ bleibende Regelabweichung).'
                },
                {
                    q: 'Bestimme Verstärkungs- und Phasengang von $G(s)=\\dfrac{10}{1+0{,}1\\,s}$ und gib Eckfrequenz an.',
                    h: 'PT1: Eckfrequenz $\\omega_E=1/T$. Bei $\\omega_E$: -3 dB, -45°.',
                    s: '$T=0{,}1\\Rightarrow \\omega_E=10\\,\\text{rad/s}$.<br>DC: $|G(j0)|=10\\Rightarrow 20\\log 10 = 20\\,\\text{dB}$, Phase $0°$.<br>Bei $\\omega_E$: $-3\\,\\text{dB}$ relativ ($\\Rightarrow 17\\,\\text{dB}$ absolut), Phase $-45°$.<br>Asymptote oberhalb $\\omega_E$: $-20\\,\\text{dB/Dek}$, Phase $\\to -90°$.'
                },
                {
                    q: 'Eine Strecke $G_S(s)=\\dfrac{2}{(s+1)(s+3)}$ wird mit P-Regler $K_R$ geregelt. Bestimme $K_R$ so, dass das System ein Dämpfungsmaß $D=0{,}707$ hat.',
                    h: 'Char. Polynom: $s^2+4s+(3+2K_R)=0$. Vergleichen mit $s^2+2D\\omega_n s+\\omega_n^2$.',
                    s: '$2D\\omega_n=4\\Rightarrow \\omega_n=4/(2D)=4/\\sqrt{2}=2\\sqrt{2}\\approx 2{,}83$.<br>$\\omega_n^2=3+2K_R\\Rightarrow K_R=(\\omega_n^2-3)/2=(8-3)/2 = 2{,}5$.<br>$$\\boxed{K_R=2{,}5}$$'                },
                {
                    q: 'Wende das Routh-Schema auf $P(s)=s^4+2s^3+3s^2+4s+5$ an und beurteile Stabilität.',
                    h: 'Erste Spalte: alle positiv $\Rightarrow$ stabil. Zeichenwechsel zählt RHP-Pole.',
                    s: 'Routh-Tableau:<br>$s^4: 1\quad 3\quad 5$<br>$s^3: 2\quad 4$<br>$s^2: (2\cdot 3-1\cdot 4)/2 = 1\quad 5$<br>$s^1: (1\cdot 4 - 2\cdot 5)/1 = -6$<br>$s^0: 5$<br>Erste Spalte: $1,2,1,-6,5$ — zwei Vorzeichenwechsel ($+\to -$, $-\to +$).<br>$$\boxed{2\ \text{Pole in RHP}\Rightarrow\text{instabil}}$$'
                },
                {
                    q: 'PI-Regler $G_R(s)=K_p+K_i/s$ mit Strecke $G_S(s)=\dfrac{1}{1+Ts}$. Welche stationäre Regelabweichung tritt bei Rampensignal $w(t)=t$ auf?',
                    h: 'PI auf PT1 ergibt Regelkreis vom Typ 1; Ramp-Fehler $e_\infty=1/K_v$ mit $K_v=\lim_{s\to 0}sG_0(s)$.',
                    s: '$G_0=G_R G_S=\dfrac{K_p s+K_i}{s(1+Ts)}$.<br>$K_v=\lim_{s\to 0}sG_0(s)=\lim_{s\to 0}\dfrac{K_p s+K_i}{1+Ts}=K_i$.<br>$$\boxed{e_\infty=\dfrac{1}{K_i}}$$ (durch Erhöhung von $K_i$ verkleinerbar; PI eliminiert Sprungfehler vollständig).'
                },
                {
                    q: 'Lead-Glied $G_L(s)=\dfrac{1+\alpha T s}{1+T s}$, $\alpha>1$. Bei welcher Frequenz $\omega_m$ tritt die maximale Phasenanhebung auf, und wie groß ist sie?',
                    h: '$\omega_m=1/(T\sqrt{\alpha})$ (geometrisches Mittel der Eckfrequenzen). $\sin\varphi_{max}=(\alpha-1)/(\alpha+1)$.',
                    s: 'Eckfrequenzen: $\omega_1=1/(\alpha T)$ (Nullstelle), $\omega_2=1/T$ (Pol).<br>Maximum bei $\omega_m=\sqrt{\omega_1\omega_2}=1/(T\sqrt\alpha)$.<br>$\varphi_{max}=\arctan\sqrt\alpha-\arctan(1/\sqrt\alpha)$, äquivalent: $\sin\varphi_{max}=\dfrac{\alpha-1}{\alpha+1}$.<br>Beispiel $\alpha=10$: $\sin\varphi_{max}=9/11\Rightarrow \varphi_{max}\approx 54{,}9°$.<br>$$\boxed{\omega_m=1/(T\sqrt\alpha),\ \sin\varphi_{max}=(\alpha-1)/(\alpha+1)}$$'
                },
                {
                    q: 'Berechne die Störübertragungsfunktion $G_z(s)=Y(s)/Z(s)$ bei Eingangsstörung der Strecke. Standard-Regelkreis mit $G_R, G_S$.',
                    h: 'Störung am Streckeneingang: $Y=G_S(U+Z)$, $U=-G_R Y$. Auflösen.',
                    s: '$Y=G_S(-G_R Y+Z)\Rightarrow Y(1+G_R G_S)=G_S Z$.<br>$$\boxed{G_z(s)=\dfrac{G_S(s)}{1+G_R(s)G_S(s)}}$$<br>Folgerung: hohe Schleifenverstärkung $\Rightarrow$ kleine Störempfindlichkeit. Bei tiefen Frequenzen mit Integrator $\Rightarrow G_z\to 0$ (perfekte Stör-Unterdrückung).'                }
            ],
            // L3
            [
                {
                    q: 'Auslegung nach Betragsoptimum: PT1-Strecke $G_S=\\dfrac{K_S}{1+T_1 s}$ (mit $K_S=2,\\ T_1=0{,}5\\,\\text{s}$) und kleine Verzögerung $T_\\sigma=0{,}05\\,\\text{s}$. Wähle PI-Regler $G_R=K_R\\dfrac{1+T_n s}{T_n s}$ optimal.',
                    h: 'Betragsoptimum (Kessler): $T_n=T_1$ (Pol-Nullstellen-Kompensation), $K_R=\\dfrac{T_1}{2 K_S T_\\sigma}$.',
                    s: 'Schritt 1: Pol kompensieren $\\Rightarrow T_n=T_1=0{,}5\\,\\text{s}$.<br>Schritt 2: $K_R=\\dfrac{T_1}{2K_S T_\\sigma}=\\dfrac{0{,}5}{2\\cdot 2 \\cdot 0{,}05}=\\dfrac{0{,}5}{0{,}2}=2{,}5$.<br>$$\\boxed{T_n=0{,}5\\,\\text{s},\\ K_R=2{,}5}$$ Kommentar: liefert Dämpfung $D\\approx 0{,}707$ und Überschwingen ~4 %.'
                },
                {
                    q: 'Bestimme die Wurzelortskurve (qualitativ): offene Schleife $G_0(s)=\\dfrac{K}{s(s+2)(s+5)}$. Wieviele Äste? Schwerpunkt? Asymptotenwinkel?',
                    h: 'Anzahl Äste = Anzahl Pole. Schwerpunkt $\\sigma=\\dfrac{\\sum p_i - \\sum z_j}{n-m}$. Asymptoten $\\theta_k=\\dfrac{(2k+1)180°}{n-m}$.',
                    s: 'Pole: $0,-2,-5$ (3 Stück), keine Nullstellen ($n-m=3$). 3 Äste.<br>$\\sigma=\\dfrac{0-2-5}{3}=-\\dfrac{7}{3}\\approx -2{,}33$.<br>Asymptotenwinkel: $\\theta_k=60°,\\ 180°,\\ 300°$.<br>Verhalten: Äste streben für $K\\to\\infty$ entlang dieser Asymptoten ins Unendliche. Stabilitätsgrenze bei einem kritischen $K$ (Schnitt der Wurzelortskurve mit der $j\\omega$-Achse).'
                },
                {
                    q: 'Nyquist-Stabilität: offene Schleife $G_0(s)=\\dfrac{K}{s(s+1)(s+10)}$ ist Typ 1 (ein Pol bei 0), keine Pole in der rechten Halbebene. Bestimme das kritische $K_{krit}$ für Grenzstabilität.',
                    h: 'Charakteristische Gleichung: $1+G_0(s)=0$. Substituiere $s=j\\omega$, trenne Real- und Imaginärteil; beide null bei $\\omega_{krit}$.',
                    s: 'Char. Polynom: $s(s+1)(s+10)+K = s^3+11s^2+10s+K = 0$.<br>Hurwitz (Grad 3): $a_2 a_1 - a_3 a_0 > 0 \\Rightarrow 11\\cdot 10 - 1\\cdot K > 0 \\Rightarrow K < 110$.<br>Grenze: $K_{krit}=110$. Bei $K=110$: Pole sind $\\pm j\\sqrt{10}$ (Eigenfrequenz $\\omega_{krit}=\\sqrt{10}\\approx 3{,}16\\,\\text{rad/s}$).<br>$$\\boxed{K_{krit}=110,\\ \\omega_{krit}=\\sqrt{10}}$$'
                },
                {
                    q: 'Auslegung nach Symmetrischem Optimum: I-haltige Strecke $G_S=\\dfrac{K_S}{s(1+T_\\sigma s)}$. Wähle PI-Regler.',
                    h: 'Sym. Optimum: $T_n=4T_\\sigma$, $K_R=\\dfrac{1}{2 K_S T_\\sigma}$.',
                    s: '$T_n=4T_\\sigma$, $K_R=\\dfrac{1}{2K_S T_\\sigma}$.<br>Resultierende Schleife hat Phasenreserve ca. $36{,}9°$, Bandbreite optimal für Folge- und Störverhalten bei integrierender Strecke.<br>$$\\boxed{T_n=4T_\\sigma,\\quad K_R=\\frac{1}{2K_S T_\\sigma}}$$'
                },
                {
                    q: 'Berechne den Phasenrand des offenen Kreises $G_0(s)=\\dfrac{4}{s(s+2)}$.',
                    h: 'Phasenrand $\\varphi_R = 180° + \\arg G_0(j\\omega_d)$ bei $|G_0(j\\omega_d)|=1$ (Durchtrittsfrequenz).',
                    s: '$|G_0(j\\omega)|=\\dfrac{4}{\\omega\\sqrt{\\omega^2+4}}=1$.<br>$\\Rightarrow \\omega^2(\\omega^2+4)=16 \\Rightarrow x^2+4x-16=0$ mit $x=\\omega^2$.<br>$x=(-4+\\sqrt{16+64})/2=(-4+\\sqrt{80})/2\\approx 2{,}47$, also $\\omega_d\\approx 1{,}57\\,\\text{rad/s}$.<br>Phase: $\\arg G_0=-90°-\\arctan(\\omega_d/2)=-90°-\\arctan(0{,}786)\\approx -90°-38{,}2°=-128{,}2°$.<br>$\\varphi_R=180°-128{,}2°=51{,}8°$.<br>$$\\boxed{\\varphi_R\\approx 52°}$$ (gut gedämpftes System).'
                },
                {
                    q: 'Zustandsregler-Auslegung mittels Polplatzierung: System $\\dot x=Ax+Bu$ mit $A=\\begin{pmatrix}0&1\\\\0&-1\\end{pmatrix}$, $B=\\begin{pmatrix}0\\\\1\\end{pmatrix}$. Wähle Rückführvektor $K=[k_1,\\,k_2]$ so, dass die geschlossenen Pole bei $-2,\\ -3$ liegen.',
                    h: '$A_{cl}=A-BK$. Char. Polynom mit Wunsch-Polynom $(s+2)(s+3)$ koeffizientenweise vergleichen.',
                    s: '$A-BK=\\begin{pmatrix}0&1\\\\-k_1&-1-k_2\\end{pmatrix}$.<br>$\\det(sI-A_{cl})=s(s+1+k_2)+k_1=s^2+(1+k_2)s+k_1$.<br>Wunsch: $(s+2)(s+3)=s^2+5s+6$.<br>Vergleich: $1+k_2=5\\Rightarrow k_2=4$, $k_1=6$.<br>$$\\boxed{K=[6,\\ 4]}$$'                },
                {
                    q: 'Smith-Prädiktor: Strecke $G_S(s)=G_0(s)e^{-T_t s}$ mit Totzeit $T_t$. Skizziere den Reglerentwurf, sodass die Totzeit aus der charakteristischen Gleichung verschwindet.',
                    h: 'Idee: Modell $\hat G_0$ ohne Totzeit + Korrektur durch Differenz $\hat G_0(1-e^{-T_t s})$.',
                    s: 'Effektiver Regelkreis (bei perfektem Modell) hat charakteristisches Polynom $1+G_R\hat G_0=0$ — die Totzeit $e^{-T_t s}$ erscheint nur in der Vorwärtsdynamik, nicht im Rückführzweig.<br>Damit kann $G_R$ als wäre keine Totzeit vorhanden ausgelegt werden (z.B. nach Betragsoptimum).<br>Voraussetzung: gutes Modell. Bei Modellfehlern $\Delta\hat G$ entsteht Stabilitätsproblem $\Rightarrow$ Robustheitsabschätzung nötig.<br>$$\boxed{G_R\text{ entwerfen für totzeitfreie Strecke }\hat G_0}$$'
                },
                {
                    q: 'Beobachterentwurf (Luenberger): $\dot x=Ax+Bu$, $y=Cx$ mit $A=\begin{pmatrix}0&1\\-2&-3\end{pmatrix}$, $C=(1,\,0)$. Wähle $L$ so, dass die Beobachterpole bei $-5,-6$ liegen.',
                    h: '$A_{obs}=A-LC$. Char. Polynom mit Wunsch-Polynom $(s+5)(s+6)$ vergleichen.',
                    s: '$L=\begin{pmatrix}l_1\\l_2\end{pmatrix}$, $LC=\begin{pmatrix}l_1&0\\l_2&0\end{pmatrix}$.<br>$A-LC=\begin{pmatrix}-l_1&1\\-2-l_2&-3\end{pmatrix}$.<br>$\det(sI-(A-LC))=(s+l_1)(s+3)+(2+l_2)=s^2+(l_1+3)s+(3l_1+2+l_2)$.<br>Vergleich mit $s^2+11s+30$: $l_1+3=11\Rightarrow l_1=8$. $3\cdot 8+2+l_2=30\Rightarrow l_2=4$.<br>$$\boxed{L=(8,\ 4)^T}$$ Beobachterpole sollten $\sim 2{,}\dots,5\times$ schneller als Reglerpole sein (Trennungsprinzip).'
                },
                {
                    q: 'Anti-Windup für PI-Regler mit Stellgrößenbeschränkung $u\in[u_{min},u_{max}]$: erläutere die Back-Calculation-Methode und gib die zusätzliche Differentialgleichung an.',
                    h: 'Stellsignal nach Sättigung mit nicht-saturiertem vergleichen, Differenz zurückführen auf I-Anteil.',
                    s: 'Standard-PI: $\dot x_I = K_i e$, $u = K_p e + x_I$, $u_{sat}=\text{sat}(u)$.<br>Back-Calculation: $\dot x_I = K_i e + \dfrac{1}{T_t}(u_{sat}-u)$.<br>Wenn $u=u_{sat}$ (nicht in Sättigung): zusätzlicher Term ist $0$, normaler PI.<br>Sobald $u\neq u_{sat}$ (Sättigung aktiv): Term $<0$ bzw. $>0$ stoppt das Aufintegrieren des I-Anteils $\Rightarrow$ kein Wind-up.<br>Tracking-Zeit $T_t$: typischerweise $T_t=\sqrt{T_n T_v}$ oder $T_t=T_n$ für PI.<br>$$\boxed{\dot x_I = K_i e + (u_{sat}-u)/T_t}$$'
                },
                {
                    q: 'IMC (Internal Model Control): Strecke $G_S(s)$ minimalphasig, Wunsch-Filterzeitkonstante $\lambda$. Gib den IMC-Regler $G_R$ und den äquivalenten klassischen Regler $G_C$ an.',
                    h: 'IMC-Regler: $G_R = G_S^{-1} F$ mit $F(s)=1/(1+\lambda s)^n$. Klassisch: $G_C=G_R/(1-G_R G_S)$.',
                    s: 'Filterordnung $n$ so wählen, dass $G_R$ kausal ist (Zähler-grad $\le$ Nenner-grad).<br>$G_R=G_S^{-1}\cdot\dfrac{1}{(1+\lambda s)^n}$.<br>Äquivalenz: $G_C(s)=\dfrac{G_R(s)}{1-G_R(s)G_S(s)}=\dfrac{1}{G_S(s)\,((1+\lambda s)^n-1)}$.<br>Vorteil: ein einziger Tuning-Parameter $\lambda$ (Trade-off Performance vs. Robustheit). Für $\lambda\to 0$: aggressives Verhalten; für $\lambda\to\infty$: weiches Verhalten.<br>$$\boxed{G_C(s)=\dfrac{1}{G_S(s)\,((1+\lambda s)^n-1)}}$$'                }
            ]
        ]
    };
})();
