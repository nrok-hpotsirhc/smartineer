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
            $|G(j\\omega)|_{dB}=20\\log_{10}|G(j\\omega)|$, $\\varphi=\\arg G(j\\omega)$<br><br>
            <strong>Zeitkonstanten / Spezifikationen</strong><br>
            PT1-Anstiegszeit ($10\%\\to 90\%$): $t_r\\approx 2{,}2\\,T$<br>
            PT2-Überschwingen: $\\ddot M_p=\\exp(-\\pi D/\\sqrt{1-D^2})$<br><br>
            <strong>Lead-/Lag-Glied</strong><br>
            $G_{lead}(s)=\\dfrac{1+\\alpha T s}{1+T s}$ mit $\\alpha>1$ (Phasenanhebung)<br><br>
            <strong>Reale D-Glieder (DT1)</strong><br>
            $G_{DT1}(s)=\\dfrac{T_v s}{1+T_1 s}$<br><br>
            <strong>Routh-Hurwitz Schema</strong><br>
            Erste Spalte $>0$ für alle Zeilen $\\Rightarrow$ stabil<br><br>
            <strong>Smith-Prädiktor</strong> (Totzeit-Kompensation)<br>
            $G_{eff}(s)=\\dfrac{G_R}{1+G_R G_{Modell}(1-e^{-T_t s})}$<br><br>
            <strong>Anti-Windup</strong><br>
            Back-Calculation: $u_I\\leftarrow u_I + (u_{sat}-u)/T_t$ während Sättigung
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
                    q: 'Wie groß ist die Anstiegszeit $t_r$ ($10\\,\%\\to 90\\,\%$) eines PT1-Glieds mit $T=0{,}2\\,\\text{s}$?',
                    h: 'Faustformel: $t_r\\approx 2{,}2\\,T$. (Aus $1-e^{-t/T}=0{,}9$ und $0{,}1$.)',
                    s: '$t_{90}=T\\ln 10\\approx 2{,}303\\,T$. $t_{10}=T\\ln(10/9)\\approx 0{,}105\\,T$. $t_r=t_{90}-t_{10}\\approx 2{,}197\\,T$.<br>Mit $T=0{,}2\\,\\text{s}$: $t_r\\approx 0{,}44\\,\\text{s}$.<br>$$\\boxed{t_r\\approx 0{,}44\\,\\text{s}}$$'
                },
                {
                    q: 'Reihenschaltung zweier PT1-Glieder $G_1=\\dfrac{1}{1+s}$ und $G_2=\\dfrac{2}{1+0{,}5\\,s}$. Bestimme $G(s)$ und die DC-Verstärkung.',
                    h: 'Reihe = Multiplikation. DC-Verstärkung: $G(0)$.',
                    s: '$G(s)=G_1 G_2 = \\dfrac{2}{(1+s)(1+0{,}5\\,s)}$.<br>$G(0)=2$.<br>Pole: $-1$ und $-2$ (aus $1+0{,}5\\,s=0\\Rightarrow s=-2$). System ist stabil.<br>$$\\boxed{G(s)=\\dfrac{2}{(1+s)(1+0{,}5\\,s)},\ K=2}$$'
                },
                {
                    q: 'Warum ist der ideale D-Regler $G_D=K_d s$ in der Praxis nicht realisierbar? Welche Realisierung wird stattdessen verwendet?',
                    h: 'Hochfrequenzverstärkung von idealem D wird unendlich.',
                    s: 'Idealer D: $|G_D(j\\omega)|=K_d\\omega\\to\\infty$ für $\\omega\\to\\infty$ $\\Rightarrow$ extreme Rauschverstärkung, kein kausaler Realisierer (Zähler-grad > Nenner-grad).<br>Realer DT1: $G_{DT1}(s)=\\dfrac{T_v s}{1+T_1 s}$ mit $T_1\\ll T_v$ (z.B. $T_1=T_v/10$). Begrenzt die Hochfrequenzverstärkung auf $T_v/T_1$ und macht das Glied physikalisch realisierbar.'
                },
                {
                    q: 'Bestimme die Übertragungsfunktion einer Parallelschaltung von $G_1=\\dfrac{2}{s+1}$ und $G_2=\\dfrac{1}{s}$ (gleicher Eingang, summierende Ausgänge).',
                    h: 'Parallel = Summe. Auf gemeinsamen Nenner bringen.',
                    s: '$G(s)=G_1+G_2 = \\dfrac{2}{s+1}+\\dfrac{1}{s}=\\dfrac{2s+(s+1)}{s(s+1)}=\\dfrac{3s+1}{s(s+1)}$.<br>$$\\boxed{G(s)=\\dfrac{3s+1}{s(s+1)}}$$'                },
                {
                    q: 'Definiere Phasenrand $\\varphi_R$ und Amplitudenrand $A_R$ eines offenen Regelkreises $G_0(j\\omega)$.',
                    h: 'Phasenrand bei Durchtrittsfrequenz $\\omega_d$ ($|G_0|=1$). Amplitudenrand bei Phasenkreuzungsfrequenz $\\omega_\\pi$ ($\\arg G_0=-180°$).',
                    s: 'Phasenrand: $\\varphi_R = 180° + \\arg G_0(j\\omega_d)$ mit $|G_0(j\\omega_d)|=1$.<br>Amplitudenrand: $A_R = 1/|G_0(j\\omega_\\pi)|$ mit $\\arg G_0(j\\omega_\\pi)=-180°$.<br>Faustregel: $\\varphi_R\\ge 45°$ und $A_R\\ge 2$ ($\\approx 6\\,\\text{dB}$). $$\\boxed{\\varphi_R = 180° + \\arg G_0(j\\omega_d)}$$ <em>Quelle:</em> Lunze, Regelungstechnik 1, 11. Aufl., Springer 2020, §16.3.'
                },
                {
                    q: 'Ein PT2-Glied mit $D=0{,}3$ und $\\omega_n=5\\,\\text{rad/s}$. Wie gross ist das maximale Ueberschwingen $M_p$ der Sprungantwort?',
                    h: '$M_p=\\exp(-\\pi D/\\sqrt{1-D^2})$. Faustregel: $D=0{,}3\\Rightarrow M_p\\approx 37\\,\\%$.',
                    s: '$M_p = e^{-\\pi\\,0{,}3/\\sqrt{1-0{,}09}} = e^{-\\pi\\cdot 0{,}3/0{,}954} = e^{-0{,}988}\\approx 0{,}372$.<br>$$\\boxed{M_p \\approx 37{,}2\\,\\%}$$ Bemerkung: $M_p$ haengt nur von $D$ ab, nicht von $\\omega_n$. <em>Quelle:</em> Foellinger, Regelungstechnik, 12. Aufl., VDE Verlag 2022, §6.2 (Sprungantwort des PT2-Gliedes).'
                },
                {
                    q: 'Bestimme die Uebertragungsfunktion $G_R(s)$ eines PD-Reglers mit Glaettung: Zeitbereich $u(t)=K_p e + K_d\\dot e_f$, wobei $e_f$ ueber ein PT1 ($T_1$) gefiltert ist.',
                    h: 'Parallelschaltung: P-Anteil direkt, D-Anteil ueber PT1 differenziert.',
                    s: '$G_R(s) = K_p + K_d s \\cdot \\dfrac{1}{1+T_1 s} = \\dfrac{K_p(1+T_1 s) + K_d s}{1+T_1 s} = \\dfrac{K_p + (K_p T_1 + K_d)s}{1+T_1 s}$.<br>Die Hochfrequenzverstaerkung ist auf $K_p + K_d/T_1$ begrenzt $\\Rightarrow$ kausal und rauschresistent.<br>$$\\boxed{G_R(s)=\\dfrac{K_p + (K_p T_1+K_d)s}{1+T_1 s}}$$ <em>Quelle:</em> Lutz/Wendt, Taschenbuch der Regelungstechnik, 12. Aufl., Europa-Lehrmittel 2021, §7.3 (Realer D-Anteil).'
                },
                {
                    q: 'Bestimme die Eigenfrequenz $\\omega_n$ und Daempfung $D$ aus dem Nenner $s^2 + 6s + 25$ eines PT2.',
                    h: 'Standardform: $s^2 + 2D\\omega_n s + \\omega_n^2$. Koeffizientenvergleich.',
                    s: '$\\omega_n^2 = 25 \\Rightarrow \\omega_n = 5\\,\\text{rad/s}$.<br>$2D\\omega_n = 6 \\Rightarrow D = 6/(2\\cdot 5) = 0{,}6$.<br>$$\\boxed{\\omega_n=5\\,\\text{rad/s},\\ D=0{,}6}$$ $D<1\\Rightarrow$ unterdaempft; Pole bei $s_{1,2}=-3\\pm j 4$. <em>Quelle:</em> Lunze, Regelungstechnik 1, 11. Aufl., Springer 2020, §5.4.'
                },
                {
                    q: 'Wie wirkt sich ein zusaetzliches Integrator-Glied im offenen Kreis (Typ-Erhoehung) auf die stationaere Regelabweichung bei Sprung-, Rampen- und Parabel-Sollwert aus?',
                    h: 'Systemtyp $N$ = Anzahl Pole bei $s=0$. Sprungfehler $=0$ ab $N\\ge 1$, Rampenfehler $=0$ ab $N\\ge 2$, Parabelfehler $=0$ ab $N\\ge 3$.',
                    s: 'Stationaere Regelabweichung im Standard-Regelkreis:<br>Typ $N=0$: Sprung $e_\\infty=1/(1+K_p)$, Rampe/Parabel $\\infty$.<br>Typ $N=1$: Sprung $0$, Rampe $1/K_v$ mit $K_v=\\lim_{s\\to 0}sG_0$, Parabel $\\infty$.<br>Typ $N=2$: Sprung/Rampe $0$, Parabel $1/K_a$ mit $K_a=\\lim_{s\\to 0}s^2 G_0$.<br>$$\\boxed{N\\text{-ter Integrator eliminiert }N\\text{-ten Polynom-Sollwertfehler}}$$ <em>Quelle:</em> Foellinger, Regelungstechnik, 12. Aufl., VDE Verlag 2022, §8.2 (Stationaeres Verhalten).'
                },
                {
                    q: 'Bestimme die Sprungantwort eines Allpass-Gliedes erster Ordnung $G(s) = \\dfrac{1-T s}{1+T s}$ mit $T=1\\,\\text{s}$.',
                    h: 'Allpass: $|G(j\\omega)|=1$ fuer alle $\\omega$. PBZ: $(1-Ts)/(1+Ts) = -1 + 2/(1+Ts)$.',
                    s: '$Y(s)=G(s)/s = \\dfrac{1-Ts}{s(1+Ts)}$.<br>PBZ: $Y(s)=\\dfrac{1}{s}-\\dfrac{2T}{1+Ts}\\Rightarrow y(t) = 1 - 2 e^{-t/T}$.<br>$y(0^+) = -1$ (Sprung in falsche Richtung, sog. <em>undershoot</em>), $y(\\infty)=+1$. $$\\boxed{y(t)=1-2e^{-t/T}}$$ Allpaesse entstehen bei RHS-Nullstellen (z.B. Wasserkraft-Trommel, Boost-Konverter). <em>Quelle:</em> Skogestad &amp; Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §5.5 (RHP zeros and undershoot).'
                },
                {
                    q: 'Bestimme die Polstellen von $G(s) = \\dfrac{1}{s^2+4s+13}$ und gib Eigenfrequenz und Daempfung an.',
                    h: 'Mitternachtsformel mit negativer Diskriminante. Konjugiert komplex.',
                    s: '$s_{1,2} = (-4\\pm\\sqrt{16-52})/2 = -2 \\pm j 3$.<br>Standardform $s^2+2D\\omega_n s+\\omega_n^2$: $\\omega_n^2=13\\Rightarrow \\omega_n=\\sqrt{13}\\approx 3{,}61\\,\\text{rad/s}$, $2D\\omega_n=4\\Rightarrow D=2/\\sqrt{13}\\approx 0{,}555$.<br>$\\omega_d=\\omega_n\\sqrt{1-D^2}=3$.<br>$$\\boxed{s_{1,2}=-2\\pm j 3,\\ D\\approx 0{,}555}$$ <em>Quelle:</em> Lutz/Wendt, Taschenbuch der Regelungstechnik, 12. Aufl., Europa-Lehrmittel 2021, §4.2.'
                },
                {
                    q: 'Bestimme die statische Verstaerkung $K = G(0)$ von $G(s) = \\dfrac{3(s+2)}{(s+1)(s+6)}$.',
                    h: 'Einfach $s=0$ einsetzen.',
                    s: '$K = G(0) = \\dfrac{3\\cdot 2}{1\\cdot 6} = 1$.<br>$$\\boxed{K=1}$$ Bedeutung: bei Sprungeingang strebt der Ausgang stationaer gegen $1$ (DC-Verstaerkung). <em>Quelle:</em> Lunze, Regelungstechnik 1, 11. Aufl., Springer 2020, §5.3 (Stationaeres Verhalten linearer Systeme).'
                },
                {
                    q: 'Anfangswertsatz: bestimme $y(0^+)$ der Sprungantwort von $G(s) = \\dfrac{2s+3}{s+5}$.',
                    h: '$y(0^+)=\\lim_{s\\to\\infty} sY(s)$ mit $Y(s)=G(s)/s$.',
                    s: '$sY(s) = G(s) = \\dfrac{2s+3}{s+5}$.<br>$y(0^+) = \\lim_{s\\to\\infty}\\dfrac{2s+3}{s+5} = \\lim_{s\\to\\infty}\\dfrac{2+3/s}{1+5/s} = 2$.<br>$$\\boxed{y(0^+)=2}$$ Anschaulich: Zaehler-grad = Nenner-grad $\\Rightarrow$ Sprunghoehe $\\ne 0$. <em>Quelle:</em> Foellinger, Laplace-, Fourier- und z-Transformation, 10. Aufl., VDE Verlag 2011, §3.7 (Anfangs- und Endwertsatz).'
                },
                {
                    q: 'Pol-Nullstellen-Plan: bestimme Pole und Nullstellen von $G(s) = \\dfrac{s+1}{(s+2)(s^2+2s+5)}$.',
                    h: 'Nullstellen: Zaehler $=0$. Pole: Nenner $=0$.',
                    s: 'Nullstelle: $s=-1$.<br>Pole: $s=-2$ aus erstem Faktor; $s^2+2s+5=0\\Rightarrow s=-1\\pm j 2$ (konjugiert).<br>$$\\boxed{\\text{Pole: }-2,\\ -1\\pm j 2;\\ \\text{Nullstelle: }-1}$$ Alle Pole in der linken Halbebene $\\Rightarrow$ stabil. <em>Quelle:</em> Aström &amp; Murray, Feedback Systems, 2nd ed., Princeton 2020, §6.3 (Poles, zeros, and transfer functions).'
                },
                {
                    q: 'Wie verschiebt eine Hinzunahme eines PI-Anteils die Bode-Charakteristik gegenueber einem reinen P-Regler bei tiefen Frequenzen?',
                    h: 'PI: $K_p(1+1/(T_n s))$. Tiefe Frequenzen: zusaetzlicher Integrator-Pol bei $s=0$.',
                    s: 'Bei $\\omega\\to 0$: Betrag steigt mit $-20\\,\\text{dB/Dek}$ (Integrator dominant), Phase $-90°$.<br>Oberhalb der PI-Eckfrequenz $\\omega_E=1/T_n$: $G_R\\approx K_p$, Betrag flach, Phase $\\to 0°$.<br>Konsequenz: stationaere Regelabweichung $0$ bei Sprung, aber Phase wird im tiefen Bereich um bis zu $-90°$ verschlechtert $\\Rightarrow$ $\\omega_E\\approx\\omega_d/10$ legen, damit der Phasenrand bei der Durchtrittsfrequenz unbeeintraechtigt bleibt. <em>Quelle:</em> Aström &amp; Hägglund, Advanced PID Control, ISA Press 2006, §3.4 (Frequency response of PI controller).'
                },
                {
                    q: 'Block-Diagramm-Reduktion: Vorwaertszweig $G_1$ in Reihe mit $G_2$, parallel dazu Bypass $G_3$, alles in einer Gegenkopplung mit $H=1$. Gesamtuebertragungsfunktion?',
                    h: 'Vorwaerts gesamt: $G_v = G_1 G_2 + G_3$. Dann Standard-Gegenkopplungs-Formel.',
                    s: '$G_v(s) = G_1(s) G_2(s) + G_3(s)$.<br>$G_w(s) = \\dfrac{G_v}{1+G_v} = \\dfrac{G_1 G_2 + G_3}{1 + G_1 G_2 + G_3}$.<br>$$\\boxed{G_w(s) = \\dfrac{G_1 G_2 + G_3}{1 + G_1 G_2 + G_3}}$$ <em>Quelle:</em> Nise, Control Systems Engineering, 8th ed., Wiley 2019, §5.2 (Block diagram algebra).'
                },
                {
                    q: 'Was bedeutet <em>dominante Pole</em> im Reglerentwurf? Wann ist die Faustregel "Reduzierung auf PT2" zulaessig?',
                    h: 'Pole nahe der imaginaeren Achse praegen das transiente Verhalten. Faustregel: Realteil-Abstand $\\ge 5$.',
                    s: 'Definition: Polpaar mit kleinstem (betragsmaessigem) Realteil = dominantes Polpaar. Pole mit Realteil $\\ge 5\\times$ groesser sind transient vernachlaessigbar.<br>Voraussetzungen fuer PT2-Reduktion: (i) keine RHS-Nullstellen in der Naehe, (ii) Verhaeltnis Realteile $\\ge 5{:}1$, (iii) keine Nullstelle nahe dominantem Pol (sonst Pol-Nullstellen-Kompensation moeglich).<br>Beispiel $G(s)=K/((s+1)(s+10))$: $-1$ dominant, $-10$ ($10\\times$ entfernt) vernachlaessigbar $\\Rightarrow$ Naeherung $G\\approx K/(10(s+1))$. <em>Quelle:</em> Ogata, Modern Control Engineering, 5th ed., Pearson 2010, §5.3 (Dominant closed-loop poles).'
                }
            ],
            // L2
            [
                {
                    q: 'Prüfe die Stabilität des charakteristischen Polynoms $P(s)=s^3+2s^2+s+2=0$ mit Hurwitz.',
                    h: 'Notwendig: $a_i>0$. Hinreichend bei Grad 3: $a_2 a_1 - a_3 a_0 > 0$.',
                    s: '$a_3=1,\\ a_2=2,\\ a_1=1,\\ a_0=2$. Alle positiv.<br>$\\Delta = a_2 a_1 - a_3 a_0 = 2-2 = 0$.<br>$\\Delta=0\\Rightarrow$ <strong>nicht asymptotisch stabil</strong> (Grenzstabil; konjugiert imaginäre Pole bei $\\pm j$).<br>Tatsächlich: $P(s)=(s+2)(s^2+1)\\Rightarrow$ Pole $-2,\\ \\pm j$.'
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
                    h: 'Erste Spalte: alle positiv $\\Rightarrow$ stabil. Zeichenwechsel zählt RHP-Pole.',
                    s: 'Routh-Tableau:<br>$s^4: 1\\quad 3\\quad 5$<br>$s^3: 2\\quad 4$<br>$s^2: (2\\cdot 3-1\\cdot 4)/2 = 1\\quad 5$<br>$s^1: (1\\cdot 4 - 2\\cdot 5)/1 = -6$<br>$s^0: 5$<br>Erste Spalte: $1,2,1,-6,5$ — zwei Vorzeichenwechsel ($+\\to -$, $-\\to +$).<br>$$\\boxed{2\ \\text{Pole in RHP}\\Rightarrow\\text{instabil}}$$'
                },
                {
                    q: 'PI-Regler $G_R(s)=K_p+K_i/s$ mit Strecke $G_S(s)=\\dfrac{1}{1+Ts}$. Welche stationäre Regelabweichung tritt bei Rampensignal $w(t)=t$ auf?',
                    h: 'PI auf PT1 ergibt Regelkreis vom Typ 1; Ramp-Fehler $e_\\infty=1/K_v$ mit $K_v=\\lim_{s\\to 0}sG_0(s)$.',
                    s: '$G_0=G_R G_S=\\dfrac{K_p s+K_i}{s(1+Ts)}$.<br>$K_v=\\lim_{s\\to 0}sG_0(s)=\\lim_{s\\to 0}\\dfrac{K_p s+K_i}{1+Ts}=K_i$.<br>$$\\boxed{e_\\infty=\\dfrac{1}{K_i}}$$ (durch Erhöhung von $K_i$ verkleinerbar; PI eliminiert Sprungfehler vollständig).'
                },
                {
                    q: 'Lead-Glied $G_L(s)=\\dfrac{1+\\alpha T s}{1+T s}$, $\\alpha>1$. Bei welcher Frequenz $\\omega_m$ tritt die maximale Phasenanhebung auf, und wie groß ist sie?',
                    h: '$\\omega_m=1/(T\\sqrt{\\alpha})$ (geometrisches Mittel der Eckfrequenzen). $\\sin\\varphi_{max}=(\\alpha-1)/(\\alpha+1)$.',
                    s: 'Eckfrequenzen: $\\omega_1=1/(\\alpha T)$ (Nullstelle), $\\omega_2=1/T$ (Pol).<br>Maximum bei $\\omega_m=\\sqrt{\\omega_1\\omega_2}=1/(T\\sqrt\\alpha)$.<br>$\\varphi_{max}=\\arctan\\sqrt\\alpha-\\arctan(1/\\sqrt\\alpha)$, äquivalent: $\\sin\\varphi_{max}=\\dfrac{\\alpha-1}{\\alpha+1}$.<br>Beispiel $\\alpha=10$: $\\sin\\varphi_{max}=9/11\\Rightarrow \\varphi_{max}\\approx 54{,}9°$.<br>$$\\boxed{\\omega_m=1/(T\\sqrt\\alpha),\ \\sin\\varphi_{max}=(\\alpha-1)/(\\alpha+1)}$$'
                },
                {
                    q: 'Berechne die Störübertragungsfunktion $G_z(s)=Y(s)/Z(s)$ bei Eingangsstörung der Strecke. Standard-Regelkreis mit $G_R, G_S$.',
                    h: 'Störung am Streckeneingang: $Y=G_S(U+Z)$, $U=-G_R Y$. Auflösen.',
                    s: '$Y=G_S(-G_R Y+Z)\\Rightarrow Y(1+G_R G_S)=G_S Z$.<br>$$\\boxed{G_z(s)=\\dfrac{G_S(s)}{1+G_R(s)G_S(s)}}$$<br>Folgerung: hohe Schleifenverstärkung $\\Rightarrow$ kleine Störempfindlichkeit. Bei tiefen Frequenzen mit Integrator $\\Rightarrow G_z\\to 0$ (perfekte Stör-Unterdrückung).'                },
                {
                    q: 'Stabilitaetspruefung mit Parameter: bestimme den Bereich $K>0$, fuer den $P(s)=s^3+3s^2+(3+K)s+K=0$ stabil ist (Routh-Hurwitz).',
                    h: 'Notwendig: alle Koeffizienten $>0$. Hinreichend (Grad 3): $a_2 a_1 - a_3 a_0 > 0$.',
                    s: 'Alle Koeffizienten $a_3=1,\\ a_2=3,\\ a_1=3+K,\\ a_0=K$ positiv $\\iff K>0$.<br>Hinreichende Bedingung: $a_2 a_1 - a_3 a_0 = 3(3+K) - K = 9+2K > 0$, fuer alle $K>0$ erfuellt.<br>$$\\boxed{K>0 \\Rightarrow \\text{stabil}}$$ <em>Quelle:</em> Routh, A Treatise on the Stability of a Given State of Motion, Macmillan 1877; modern: Foellinger, Regelungstechnik, 12. Aufl., VDE Verlag 2022, §10.3.'
                },
                {
                    q: 'Rueckwaertstransformation: bestimme $h(t)$ aus $H(s)=\\dfrac{1}{s^2+2s+5}$ (Impulsantwort).',
                    h: 'Quadratische Ergaenzung: $s^2+2s+5 = (s+1)^2 + 4$. Korrespondenz $\\dfrac{\\omega}{(s+a)^2+\\omega^2}\\to e^{-at}\\sin\\omega t$.',
                    s: '$H(s) = \\dfrac{1}{(s+1)^2+4} = \\dfrac{1}{2}\\cdot\\dfrac{2}{(s+1)^2+2^2}$.<br>$h(t) = \\tfrac{1}{2} e^{-t}\\sin(2t)$ fuer $t\\ge 0$.<br>$$\\boxed{h(t)=\\tfrac{1}{2}e^{-t}\\sin(2t)}$$ Gedaempfte Schwingung mit $\\omega_d=2$, Huellkurve $\\tfrac{1}{2}e^{-t}$. <em>Quelle:</em> Foellinger, Laplace-, Fourier- und z-Transformation, 10. Aufl., VDE Verlag 2011, Korrespondenztafel C-7.'
                },
                {
                    q: 'Sensitivitaets- und Komplementaerfunktion: zeige $S(s)+T(s)=1$ fuer den Standard-Regelkreis mit Schleifenuebertragung $L(s)=G_R G_S$.',
                    h: '$S=1/(1+L)$ ist Sensitivitaet, $T=L/(1+L)$ ist Fuehrungsuebertragung.',
                    s: '$S+T = \\dfrac{1}{1+L} + \\dfrac{L}{1+L} = \\dfrac{1+L}{1+L} = 1$.<br>$$\\boxed{S+T=1}$$ Folgerung (Bode-Identitaet): Stoerunterdrueckung ($|S|$ klein) und gute Fuehrungsbandbreite ($|T|\\approx 1$) sind komplementaer; bei einer Frequenz kann nicht beides klein sein. <em>Quelle:</em> Skogestad &amp; Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §2.6 (Sensitivity and complementary sensitivity).'
                },
                {
                    q: 'Bandbreite $\\omega_B$ (definiert ueber $|T(j\\omega_B)|=1/\\sqrt 2$): bestimme die Bandbreite des geschlossenen Kreises mit $L(s)=10/s$.',
                    h: '$T=L/(1+L)$. $|T|^2=|L|^2/(1+|L|^2)$ bei reinem Integrator.',
                    s: '$L(j\\omega) = -j\\,10/\\omega$, $|L|=10/\\omega$.<br>$|T|^2 = \\dfrac{100/\\omega^2}{1+100/\\omega^2} = \\dfrac{100}{\\omega^2+100}$.<br>$|T|^2=1/2 \\Rightarrow \\omega^2+100 = 200 \\Rightarrow \\omega_B=10\\,\\text{rad/s}$.<br>$$\\boxed{\\omega_B=10\\,\\text{rad/s}}$$ Allgemein: $\\omega_B\\approx\\omega_d$ (Durchtrittsfrequenz). <em>Quelle:</em> Aström &amp; Murray, Feedback Systems, 2nd ed., Princeton 2020, §10.2 (Bandwidth and performance).'
                },
                {
                    q: 'Lead-Compensator-Auslegung: ein Phasenboost von $\\varphi_{max}=45°$ ist bei $\\omega_m=10\\,\\text{rad/s}$ erforderlich. Bestimme $\\alpha$ und $T$.',
                    h: '$\\sin\\varphi_{max}=(\\alpha-1)/(\\alpha+1)$ und $\\omega_m=1/(T\\sqrt\\alpha)$.',
                    s: '$\\sin 45° \\approx 0{,}707 = (\\alpha-1)/(\\alpha+1)$.<br>$\\alpha-1 = 0{,}707(\\alpha+1)\\Rightarrow 0{,}293\\alpha = 1{,}707\\Rightarrow \\alpha\\approx 5{,}83$.<br>$T = 1/(\\omega_m\\sqrt\\alpha) = 1/(10\\cdot\\sqrt{5{,}83})\\approx 0{,}0414\\,\\text{s}$.<br>$$\\boxed{\\alpha\\approx 5{,}83,\\ T\\approx 0{,}0414\\,\\text{s}}$$ <em>Quelle:</em> Franklin/Powell/Emami-Naeini, Feedback Control of Dynamic Systems, 8th ed., Pearson 2019, §6.7.'
                },
                {
                    q: 'Stelle die DGL $\\ddot y + 3\\dot y + 2y = u$ in Zustandsraumform $\\dot x = Ax+Bu$, $y=Cx$ mit $x_1=y,\\ x_2=\\dot y$ dar.',
                    h: '$\\dot x_1 = x_2$, $\\dot x_2 = \\ddot y$ aus der DGL.',
                    s: '$\\dot x_1 = x_2$.<br>$\\dot x_2 = \\ddot y = -3\\dot y - 2y + u = -2x_1 - 3x_2 + u$.<br>$A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix},\\ B=\\begin{pmatrix}0\\\\1\\end{pmatrix},\\ C=(1,\\,0)$.<br>$$\\boxed{\\dot x = \\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}x + \\begin{pmatrix}0\\\\1\\end{pmatrix}u}$$ (Regelungsnormalform). <em>Quelle:</em> Lunze, Regelungstechnik 2, 9. Aufl., Springer 2020, §3.2 (Regelungsnormalform).'
                },
                {
                    q: 'Pruefe die Steuerbarkeit von $\\dot x = Ax+Bu$ mit $A=\\begin{pmatrix}1&0\\\\0&2\\end{pmatrix}$, $B=\\begin{pmatrix}1\\\\1\\end{pmatrix}$ via Kalman-Matrix.',
                    h: '$\\mathcal C = [B,\\ AB]$. Rang $=n=2$ $\\Rightarrow$ steuerbar.',
                    s: '$AB = \\begin{pmatrix}1\\\\2\\end{pmatrix}$.<br>$\\mathcal C = \\begin{pmatrix}1&1\\\\1&2\\end{pmatrix},\\ \\det\\mathcal C = 2-1 = 1 \\ne 0\\Rightarrow$ Rang $2$.<br>$$\\boxed{\\text{steuerbar (vollstaendig)}}$$ Anschaulich: beide Eigenrichtungen werden vom Eingang beeinflusst. <em>Quelle:</em> Kalman, On the general theory of control systems, IRE Trans. AC 4, 1959; Lunze, Regelungstechnik 2, 9. Aufl., Springer 2020, §3.4.'
                },
                {
                    q: 'Pruefe die Beobachtbarkeit von $A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix},\\ C=(1,\\,0)$ via Beobachtbarkeitsmatrix.',
                    h: '$\\mathcal O = \\begin{pmatrix}C\\\\CA\\end{pmatrix}$. Rang $=n$ $\\Rightarrow$ beobachtbar.',
                    s: '$CA = (0,\\,1)$.<br>$\\mathcal O = \\begin{pmatrix}1&0\\\\0&1\\end{pmatrix} = I$, Rang $2$.<br>$$\\boxed{\\text{beobachtbar (vollstaendig)}}$$ Trennungsprinzip: Beobachter darf unabhaengig vom Regler entworfen werden. <em>Quelle:</em> Kalman, Mathematical Description of Linear Dynamical Systems, J. SIAM Control 1(2), 1963; Lunze, Regelungstechnik 2, 9. Aufl., Springer 2020, §8.2.'
                },
                {
                    q: 'Diskretisiere den kontinuierlichen PT1 $G_c(s)=1/(1+s)$ mittels Tustin (bilineare Transformation) bei Abtastzeit $T_a=0{,}1\\,\\text{s}$.',
                    h: 'Tustin: $s\\leftarrow \\dfrac{2}{T_a}\\dfrac{z-1}{z+1}$.',
                    s: 'Substitution: $s = 20\\cdot (z-1)/(z+1)$.<br>$G_d(z) = \\dfrac{1}{1+20(z-1)/(z+1)} = \\dfrac{z+1}{(z+1)+20(z-1)} = \\dfrac{z+1}{21z-19}$.<br>$$\\boxed{G_d(z) = \\dfrac{z+1}{21z-19}\\approx \\dfrac{0{,}0476(z+1)}{z-0{,}905}}$$ Vorteil Tustin: Stabilitaet vom kontinuierlichen System auf $z$-Ebene uebernommen; nur hochfrequente Frequenzwarping. <em>Quelle:</em> Aström &amp; Wittenmark, Computer-Controlled Systems, 3rd ed., Dover 2011, §8.4 (Tustin approximation).'
                },
                {
                    q: 'Kaskaden-Regelung: warum muss die innere Schleife deutlich schneller sein als die aeussere? Quantifiziere mit dem Bandbreitenverhaeltnis.',
                    h: 'Faustregel: $\\omega_{B,innen} \\ge 5\\cdot\\omega_{B,aussen}$.',
                    s: 'Die aeussere Schleife "sieht" die innere Schleife im interessierenden Frequenzbereich als statisches Element ($T_{innen}\\approx 1$). Dafuer muss die innere Schleife bei der Durchtrittsfrequenz der aeusseren bereits geschlossen sein.<br>Faustregel: $\\omega_{B,innen}\\ge 5\\cdot \\omega_{B,aussen}$ (oft $10\\times$ bei kritischen Anwendungen).<br>Vorteil: schnelle Stoerunterdrueckung der inneren Stoerung (z.B. Lastmoment), Linearisierung nichtlinearer Strecken (z.B. Antriebsstrang).<br>$$\\boxed{\\omega_{B,innen} \\ge 5\\,\\omega_{B,aussen}}$$ <em>Quelle:</em> Aström &amp; Hägglund, Advanced PID Control, ISA Press 2006, §8.2 (Cascade control).'
                },
                {
                    q: 'Routh-Sonderfall: bestimme die Stabilitaet von $P(s) = s^5 + 2s^4 + 2s^3 + 4s^2 + 11s + 10$ (Null in erster Spalte).',
                    h: 'Bei Null in erster Spalte: epsilon-Methode (durch $\\varepsilon\\to 0^+$ ersetzen).',
                    s: 'Routh-Tableau:<br>$s^5: 1\\quad 2\\quad 11$<br>$s^4: 2\\quad 4\\quad 10$<br>$s^3: (2\\cdot 2 - 1\\cdot 4)/2 = 0\\quad (2\\cdot 11 - 1\\cdot 10)/2 = 6$<br>Sonderfall: erster Eintrag $0\\Rightarrow$ ersetze durch $\\varepsilon$.<br>$s^2: (\\varepsilon\\cdot 4 - 2\\cdot 6)/\\varepsilon = 4 - 12/\\varepsilon \\to -\\infty$ fuer $\\varepsilon\\to 0^+$.<br>Erste Spalte: $1,\\ 2,\\ \\varepsilon (\\to 0^+),\\ -\\infty,\\ \\ldots$ — Vorzeichenwechsel $+\\to -\\to +$ $\\Rightarrow$ 2 RHP-Pole.<br>$$\\boxed{\\text{instabil, 2 Pole rechts der imaginaeren Achse}}$$ <em>Quelle:</em> Routh, A Treatise on the Stability of a Given State of Motion, Macmillan 1877; Erweiterung in Foellinger, Regelungstechnik, 12. Aufl., VDE Verlag 2022, §10.3.'
                },
                {
                    q: 'Feedforward (Stoergroessenaufschaltung): Strecke $G_S$ mit additiver Eingangsstoerung $Z$. Wie ist der Feedforward-Pfad $G_{ff}$ zu waehlen, damit die Stoerung am Ausgang verschwindet?',
                    h: 'Mit Stoergroessenmessung: $u = u_{FB} - G_{ff} z$. Ziel: $Y$ unabhaengig von $Z$.',
                    s: '$Y = G_S(u_{FB} + z - G_{ff} z) = G_S u_{FB} + G_S(1-G_{ff}) z$.<br>Stoerung verschwindet $\\iff G_{ff} = 1$ (ideale Kompensation bei Eingangsstoerung).<br>Allgemein bei Stoerung mit Eintrittsfilter $G_z$: $G_{ff} = G_z / G_S$ (kausal nur, wenn $G_S$ nicht hoeher relativ-grad als $G_z$).<br>$$\\boxed{G_{ff} = G_z / G_S}$$ Praxis: Feedforward kompensiert grob (gut bekannte Stoerung), Feedback regelt feinen Rest. <em>Quelle:</em> Aström &amp; Hägglund, Advanced PID Control, ISA Press 2006, §6.5 (Feedforward control).'
                },
                {
                    q: 'Sprungantwort eines PT2 mit Vorhalt-Nullstelle: $G(s) = \\dfrac{1+T_v s}{1+2 D T s + (Ts)^2}$ mit $T=1,\\ D=0{,}7,\\ T_v=2$. Was bewirkt die Nullstelle?',
                    h: 'Nullstelle bei $s = -1/T_v = -0{,}5$. Bringt zusaetzliches Ueberschwingen / aggressiveres Anlaufverhalten.',
                    s: 'Pol-Nullstellen-Plan: Pole bei $-0{,}7\\pm j\\,0{,}714$ ($\\omega_n=1,\\ D=0{,}7$); Nullstelle bei $-0{,}5$ (rechts vom dominanten Pol).<br>Sprungantwort: $y(0^+)=0$ (Relativgrad $1$), aber starke positive Anfangs-Steigung $\\dot y(0^+) = T_v/T^2 = 2$ (statt $0$ ohne Nullstelle).<br>Konsequenz: groesseres Ueberschwingen als PT2 ohne Nullstelle, kuerzere Anstiegszeit, gleicher Endwert $1$.<br>Faustregel: Nullstelle innerhalb des dominanten Polradius $\\Rightarrow$ deutlicher Aggressivitaets-Effekt; Nullstelle weit links $\\Rightarrow$ vernachlaessigbar. <em>Quelle:</em> Franklin/Powell/Emami-Naeini, Feedback Control of Dynamic Systems, 8th ed., Pearson 2019, §3.7 (Effects of zeros and additional poles).'
                }
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
                    h: 'Idee: Modell $\\hat G_0$ ohne Totzeit + Korrektur durch Differenz $\\hat G_0(1-e^{-T_t s})$.',
                    s: 'Effektiver Regelkreis (bei perfektem Modell) hat charakteristisches Polynom $1+G_R\\hat G_0=0$ — die Totzeit $e^{-T_t s}$ erscheint nur in der Vorwärtsdynamik, nicht im Rückführzweig.<br>Damit kann $G_R$ als wäre keine Totzeit vorhanden ausgelegt werden (z.B. nach Betragsoptimum).<br>Voraussetzung: gutes Modell. Bei Modellfehlern $\\Delta\\hat G$ entsteht Stabilitätsproblem $\\Rightarrow$ Robustheitsabschätzung nötig.<br>$$\\boxed{G_R\\text{ entwerfen für totzeitfreie Strecke }\\hat G_0}$$'
                },
                {
                    q: 'Beobachterentwurf (Luenberger): $\\dot x=Ax+Bu$, $y=Cx$ mit $A=\\begin{pmatrix}0&1\\-2&-3\\end{pmatrix}$, $C=(1,\\,0)$. Wähle $L$ so, dass die Beobachterpole bei $-5,-6$ liegen.',
                    h: '$A_{obs}=A-LC$. Char. Polynom mit Wunsch-Polynom $(s+5)(s+6)$ vergleichen.',
                    s: '$L=\\begin{pmatrix}l_1\\l_2\\end{pmatrix}$, $LC=\\begin{pmatrix}l_1&0\\l_2&0\\end{pmatrix}$.<br>$A-LC=\\begin{pmatrix}-l_1&1\\-2-l_2&-3\\end{pmatrix}$.<br>$\\det(sI-(A-LC))=(s+l_1)(s+3)+(2+l_2)=s^2+(l_1+3)s+(3l_1+2+l_2)$.<br>Vergleich mit $s^2+11s+30$: $l_1+3=11\\Rightarrow l_1=8$. $3\\cdot 8+2+l_2=30\\Rightarrow l_2=4$.<br>$$\\boxed{L=(8,\ 4)^T}$$ Beobachterpole sollten $\\sim 2{,}\\dots,5\\times$ schneller als Reglerpole sein (Trennungsprinzip).'
                },
                {
                    q: 'Anti-Windup für PI-Regler mit Stellgrößenbeschränkung $u\\in[u_{min},u_{max}]$: erläutere die Back-Calculation-Methode und gib die zusätzliche Differentialgleichung an.',
                    h: 'Stellsignal nach Sättigung mit nicht-saturiertem vergleichen, Differenz zurückführen auf I-Anteil.',
                    s: 'Standard-PI: $\\dot x_I = K_i e$, $u = K_p e + x_I$, $u_{sat}=\\text{sat}(u)$.<br>Back-Calculation: $\\dot x_I = K_i e + \\dfrac{1}{T_t}(u_{sat}-u)$.<br>Wenn $u=u_{sat}$ (nicht in Sättigung): zusätzlicher Term ist $0$, normaler PI.<br>Sobald $u\\neq u_{sat}$ (Sättigung aktiv): Term $<0$ bzw. $>0$ stoppt das Aufintegrieren des I-Anteils $\\Rightarrow$ kein Wind-up.<br>Tracking-Zeit $T_t$: typischerweise $T_t=\\sqrt{T_n T_v}$ oder $T_t=T_n$ für PI.<br>$$\\boxed{\\dot x_I = K_i e + (u_{sat}-u)/T_t}$$'
                },
                {
                    q: 'IMC (Internal Model Control): Strecke $G_S(s)$ minimalphasig, Wunsch-Filterzeitkonstante $\\lambda$. Gib den IMC-Regler $G_R$ und den äquivalenten klassischen Regler $G_C$ an.',
                    h: 'IMC-Regler: $G_R = G_S^{-1} F$ mit $F(s)=1/(1+\\lambda s)^n$. Klassisch: $G_C=G_R/(1-G_R G_S)$.',
                    // Hint-Leiter (P-LP-HINT-LADDER, AGENTS §5): didaktische Stufung vor dem Schluss-Hinweis `h`.
                    h1: 'Idee von IMC: Der Regler enthaelt explizit ein Streckenmodell $\\hat G_S$. Bei perfekter Modellkenntnis ($\\hat G_S = G_S$) ist der effektive Rueckkopplungspfad nur die Modellabweichung — der Entwurf reduziert sich auf die Wahl eines Filters $F(s)$.',
                    h2: 'Wenn $G_S$ minimalphasig ist (keine RHS-Nullstellen, keine Totzeit), darf invertiert werden: setze $G_R = G_S^{-1} \\cdot F(s)$. $F$ macht $G_R$ kausal und proper — typische Wahl $F(s) = 1/(1+\\lambda s)^n$ mit $n$ so gross, dass Zaehlergrad $\\le$ Nennergrad von $G_R$.',
                    h3: 'Aequivalenter klassischer Regler aus dem IMC-Block-Schaubild durch Block-Algebra: $G_C = G_R / (1 - G_R \\, \\hat G_S)$. Mit perfektem Modell und $G_R = G_S^{-1} F$ kuerzt sich $G_S$ heraus.',
                    s: 'Filterordnung $n$ so wählen, dass $G_R$ kausal ist (Zähler-grad $\\le$ Nenner-grad).<br>$G_R=G_S^{-1}\\cdot\\dfrac{1}{(1+\\lambda s)^n}$.<br>Äquivalenz: $G_C(s)=\\dfrac{G_R(s)}{1-G_R(s)G_S(s)}=\\dfrac{1}{G_S(s)\\,((1+\\lambda s)^n-1)}$.<br>Vorteil: ein einziger Tuning-Parameter $\\lambda$ (Trade-off Performance vs. Robustheit). Für $\\lambda\\to 0$: aggressives Verhalten; für $\\lambda\\to\\infty$: weiches Verhalten.<br>$$\\boxed{G_C(s)=\\dfrac{1}{G_S(s)\\,((1+\\lambda s)^n-1)}}$$',
                    // Beispiel optionaler Metadaten gemaess AGENTS §22 (einheitliches Item-Schema):
                    lo: 'control.imc.equivalence',
                    bloom: 'apply',
                    difficulty: 'L3',
                    tags: ['imc', 'robust-control', 'tuning'],
                    source: 'Skogestad & Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §2.4'
                },
                {
                    q: 'LQR (Linear-Quadratisch-Optimal): Gegeben $\\dot x = Ax + Bu$ und Kostenfunktional $J = \\int_0^\\infty (x^T Q x + u^T R u)\\,dt$ mit $Q\\succeq 0,\\ R\\succ 0$. Gib die optimale Rueckfuehrung $u^*=-Kx$ und die zugehoerige Riccati-Gleichung an.',
                    h: 'Algebraische Riccati-Gleichung (ARE) liefert $P$, dann $K = R^{-1} B^T P$.',
                    s: 'Bellman-Ansatz $V(x) = x^T P x$ mit $P=P^T\\succ 0$ liefert die ARE:<br>$$A^T P + P A - P B R^{-1} B^T P + Q = 0$$ Optimale Rueckfuehrung: $K^* = R^{-1} B^T P$, $u^*(t)=-K^* x(t)$.<br>Geschlossener Kreis $\\dot x = (A-BK^*)x$ ist stabil, sofern $(A,B)$ stabilisierbar und $(A,\\sqrt Q)$ entdeckbar.<br>$$\\boxed{u^* = -R^{-1} B^T P\\,x,\\quad A^T P + PA - PBR^{-1}B^T P + Q = 0}$$ <em>Quelle:</em> Anderson &amp; Moore, Optimal Control: Linear Quadratic Methods, Dover 2007 (Repr.), §3.1; orig. Kalman, ASME J. Basic Eng. 86, 1964.'
                },
                {
                    q: 'Lyapunov-Stabilitaet: zeige, dass das lineare System $\\dot x = Ax$ asymptotisch stabil ist, wenn fuer ein $Q\\succ 0$ die Gleichung $A^T P + P A = -Q$ eine Loesung $P\\succ 0$ besitzt.',
                    h: 'Lyapunov-Funktion $V(x)=x^T P x$. Zeige $\\dot V < 0$ fuer $x\\ne 0$.',
                    s: 'Ansatz $V(x) = x^T P x > 0$ fuer $x\\ne 0$ (da $P\\succ 0$).<br>$\\dot V = \\dot x^T P x + x^T P \\dot x = x^T(A^T P + PA)x = -x^T Q x < 0$ fuer $x\\ne 0$ (da $Q\\succ 0$).<br>$\\Rightarrow$ Trajektorien konvergieren gegen $0$, System asymptotisch stabil.<br>Umkehrung gilt: stabiles $A$ $\\Rightarrow$ Lyapunov-Gleichung hat fuer jedes $Q\\succ 0$ eine eindeutige Loesung $P\\succ 0$.<br>$$\\boxed{A^T P + PA = -Q,\\ P\\succ 0 \\Rightarrow \\dot V = -x^T Q x < 0}$$ <em>Quelle:</em> Khalil, Nonlinear Systems, 3rd ed., Prentice Hall 2002, §4.2 (Linearization and Lyapunov theory).'
                },
                {
                    q: 'Definiere die $H_\\infty$-Norm eines stabilen SISO-Systems $G(s)$ und berechne sie fuer $G(s)=1/(s+1)$.',
                    h: 'Definition: $\\|G\\|_\\infty = \\sup_{\\omega\\in\\mathbb R} |G(j\\omega)|$ (Worst-Case-Verstaerkung).',
                    s: '$|G(j\\omega)| = 1/\\sqrt{\\omega^2+1}$, maximal bei $\\omega=0$: $|G(0)|=1$.<br>$$\\boxed{\\|G\\|_\\infty = 1}$$ Bedeutung: induzierte $L_2\\to L_2$-Norm, d.h. $\\|y\\|_2 \\le \\|G\\|_\\infty \\cdot \\|u\\|_2$ fuer alle $u\\in L_2$. Anwendung: $H_\\infty$-Reglerentwurf minimiert $\\|T_{zw}\\|_\\infty$ (Stoer-Ausgangs-Norm). <em>Quelle:</em> Zhou/Doyle/Glover, Robust and Optimal Control, Prentice Hall 1996, §4.1; Skogestad &amp; Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §4.10.'
                },
                {
                    q: 'Stationaeres Kalman-Filter: Gegeben $\\dot x = Ax + w$, $y = Cx + v$ mit weissem Rauschen $w\\sim\\mathcal N(0,W)$, $v\\sim\\mathcal N(0,V)$. Gib die stationaere Filter-Riccati-Gleichung und den Kalman-Gain $L$ an.',
                    h: 'Dual zu LQR: ARE auf $A^T$, Beobachtungsmatrix $C$, Rauschkovarianzen $W,V$.',
                    s: 'Stationaere Filter-Riccati:<br>$$A P_\\infty + P_\\infty A^T - P_\\infty C^T V^{-1} C P_\\infty + W = 0$$ Kalman-Gain: $L = P_\\infty C^T V^{-1}$.<br>Filtergleichung: $\\dot{\\hat x} = A\\hat x + L(y - C\\hat x)$.<br>Geschlossene Fehlerdynamik $\\dot e = (A-LC) e$ ist asymptotisch stabil, sofern $(A,W^{1/2})$ stabilisierbar und $(A,C)$ entdeckbar.<br>$$\\boxed{L = P_\\infty C^T V^{-1}}$$ <em>Quelle:</em> Kalman, A New Approach to Linear Filtering and Prediction Problems, ASME J. Basic Eng. 82, 1960; Anderson &amp; Moore, Optimal Filtering, Dover 2005, §4.4.'
                },
                {
                    q: 'Allgemeines Nyquist-Stabilitaetskriterium: formuliere $N = Z - P$ und erlaeutere die Terme.',
                    h: 'Konturen-Argument: Nyquist-Kontur umschliesst die rechte $s$-Halbebene; $G_0(s)$ bildet sie auf eine Kurve in der $G_0$-Ebene ab.',
                    s: '$N$ = Anzahl Umlaeufe der Nyquist-Kurve $G_0(j\\omega)$ um den Punkt $-1$ im Uhrzeigersinn (mathematisch positiv).<br>$P$ = Anzahl Pole von $G_0(s)$ in der rechten Halbebene (instabile Pole der offenen Schleife).<br>$Z$ = Anzahl Pole des geschlossenen Kreises $G_w = G_0/(1+G_0)$ in der RHP = Anzahl Nullstellen von $1+G_0$ in der RHP.<br>Stabilitaetskriterium: geschlossener Kreis stabil $\\iff Z = 0 \\iff N = -P$.<br>$$\\boxed{N = Z - P;\\ \\text{stabil}\\iff Z=0}$$ <em>Quelle:</em> Nyquist, Regeneration Theory, Bell System Tech. J. 11, 1932; modern: Foellinger, Regelungstechnik, 12. Aufl., VDE Verlag 2022, §11.4.'
                },
                {
                    q: 'Bode-Sensitivitaets-Integral (Waterbed-Theorem): Was besagt $\\int_0^\\infty \\ln|S(j\\omega)|\\,d\\omega = \\pi\\sum_i \\Re(p_i^{RHP})$ fuer stabile Regelkreise?',
                    h: 'Erhaltungssatz fuer die logarithmische Sensitivitaet.',
                    s: 'Aussage: Die Flaeche unter $\\ln|S(j\\omega)|$ ist konstant — bei stabilem offenen Kreis sogar $0$, sonst proportional zur Summe der Realteile der RHP-Pole.<br>Konsequenz "Waterbed-Effekt": Stoerunterdrueckung ($|S|<1$) in einem Frequenzbereich erkauft sich notwendig Stoerverstaerkung ($|S|>1$) in einem anderen Bereich.<br>Praktisches Limit: Bandbreite mit gutem $|S|\\ll 1$ unterhalb von $\\omega_d/3$, drueberhinaus $|S_{max}|\\le 2$ als Faustregel.<br>$$\\boxed{\\int_0^\\infty \\ln|S(j\\omega)|\\,d\\omega = \\pi\\sum_i\\Re(p_i^{RHP})}$$ <em>Quelle:</em> Bode, Network Analysis and Feedback Amplifier Design, Van Nostrand 1945, Kap. XIV; modern: Skogestad &amp; Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §5.3.'
                },
                {
                    q: 'Sliding Mode Control: System $\\dot x_1 = x_2,\\ \\dot x_2 = f(x) + u$. Definiere die Sliding Surface $s(x) = c x_1 + x_2$ und gib das Schaltgesetz an, das in endlicher Zeit $s=0$ erreicht.',
                    h: 'Schaltgesetz: $u = -f(x) - c x_2 - \\eta\\,\\text{sgn}(s)$. Lyapunov-Funktion $V=s^2/2$.',
                    s: 'Auf der Sliding Surface $s=0$: $x_2 = -c x_1\\Rightarrow \\dot x_1 = -c x_1$, asymptotisch stabil fuer $c>0$.<br>Reaching law: $\\dot V = s\\dot s = s(c\\dot x_1 + \\dot x_2) = s(c x_2 + f(x) + u)$.<br>Wahl $u = -f(x) - c x_2 - \\eta\\,\\text{sgn}(s)$ mit $\\eta > 0$ liefert $\\dot V = -\\eta |s|$.<br>$\\Rightarrow$ Erreichen von $s=0$ in endlicher Zeit $t_r \\le |s(0)|/\\eta$.<br>Nachteil: Chattering (Hochfrequenzschaltung); Abhilfe: Sigmoid statt $\\text{sgn}$, Higher-Order SMC.<br>$$\\boxed{u = -f(x) - c x_2 - \\eta\\,\\text{sgn}(s),\\ \\eta > 0}$$ <em>Quelle:</em> Utkin, Sliding Modes in Control and Optimization, Springer 1992, §2.3; Khalil, Nonlinear Systems, 3rd ed., Prentice Hall 2002, §14.1.'
                },
                {
                    q: 'Gain Scheduling: skizziere das Prinzip am Beispiel einer nichtlinearen Strecke mit Arbeitspunkten $\\{x_1^*, x_2^*, x_3^*\\}$.',
                    h: 'Linearisierung an jedem Arbeitspunkt, Reglerentwurf je Punkt, Interpolation der Reglerparameter.',
                    s: 'Schritt 1: Linearisiere $\\dot x = f(x,u)$ um jeden Arbeitspunkt $x_i^*$: $\\dot{\\tilde x} = A_i\\tilde x + B_i \\tilde u$.<br>Schritt 2: Entwerfe lokalen Regler $K_i$ je Arbeitspunkt (z.B. LQR).<br>Schritt 3: Definiere Scheduling-Variable $\\sigma(t)$ (z.B. Drehzahl, Hoehe, Temperatur). Interpoliere: $K(\\sigma) = \\sum_i \\alpha_i(\\sigma)\\,K_i$ mit Membership-Funktionen $\\alpha_i$.<br>Voraussetzungen: (i) $\\sigma$ langsam veraenderlich gegenueber Reglerdynamik, (ii) lokale Stabilitaetsmargen pro Reglerentwurf, (iii) Hidden-Coupling-Terme ueber $\\dot\\sigma$ pruefen (LPV-Analyse).<br>Anwendung: Flugregelung (Mach + Hoehe), elektrische Antriebe (Drehzahl). <em>Quelle:</em> Rugh &amp; Shamma, Research on gain scheduling, Automatica 36(10), 2000; Khalil, Nonlinear Systems, 3rd ed., Prentice Hall 2002, §13.1.'
                },
                {
                    q: 'MRAC (Model Reference Adaptive Control): Strecke $\\dot y = a y + b u$ mit unbekanntem $a,b>0$. Referenzmodell $\\dot y_m = -a_m y_m + b_m r$. Gib das MIT-Anpassgesetz fuer den Regler $u = \\theta_1 r - \\theta_2 y$ an.',
                    h: 'Lyapunov-basiertes Anpassgesetz: $\\dot\\theta = -\\gamma\\,e\\cdot\\partial e/\\partial\\theta$.',
                    s: 'Regler: $u = \\theta_1 r - \\theta_2 y$.<br>Fehlerdynamik: $\\dot e = -a_m e + (b\\theta_1 - b_m) r - (b\\theta_2 + a - a_m) y$.<br>MIT-Anpassgesetze (Gradientenabstieg auf $J = e^2/2$):<br>$\\dot\\theta_1 = -\\gamma\\,e\\,r$<br>$\\dot\\theta_2 = +\\gamma\\,e\\,y$<br>mit Adaptionsverstaerkung $\\gamma>0$. Lyapunov-basierte Variante (mit Gewichtsmatrix) garantiert globale Stabilitaet bei Persistent-Excitation der Referenz $r(t)$.<br>$$\\boxed{\\dot\\theta_1 = -\\gamma e r,\\ \\dot\\theta_2 = \\gamma e y}$$ <em>Quelle:</em> Aström &amp; Wittenmark, Adaptive Control, 2nd ed., Addison-Wesley 1995, §5.2; Ioannou &amp; Sun, Robust Adaptive Control, Prentice Hall 1996, §6.3.'
                },
                {
                    q: '$H_\\infty$-Loop-Shaping (Glover-McFarlane): erlaeutere das Verfahren in 3 Schritten.',
                    h: 'Pre-/Postfilter zum Formen des offenen Kreises, dann $H_\\infty$-Regler fuer Coprime-Faktor-Robustheit.',
                    s: 'Schritt 1 (Loop Shaping): Waehle Pre-/Postfilter $W_1, W_2$, sodass der geformte offene Kreis $G_s = W_2 G W_1$ den gewuenschten Frequenzgang hat (hoch bei tiefen Frequenzen fuer Stoerunterdrueckung, niedrig bei hohen Frequenzen fuer Robustheit).<br>Schritt 2 ($H_\\infty$-Regler): Bestimme $K_\\infty$ als $H_\\infty$-Optimalloesung fuer das Coprime-Faktor-Robustheitsproblem $\\min_K \\|[K, I]^T (I-GK)^{-1} M^{-1}\\|_\\infty$ mit $G = NM^{-1}$ (Normalized Left Coprime Factorization).<br>Schritt 3 (Implementierung): realer Regler $K = W_1 K_\\infty W_2$.<br>Vorteil: explizite Robustheitsmarge $\\varepsilon_{max} = 1/\\gamma_{min}$ gegen Coprime-Faktor-Stoerungen. <em>Quelle:</em> McFarlane &amp; Glover, A loop shaping design procedure using $H_\\infty$ synthesis, IEEE Trans. AC 37(6), 1992; Skogestad &amp; Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §9.4.'
                },
                {
                    q: 'Balanced Truncation (Modellreduktion): erlaeutere das Verfahren zur Reduktion eines hochdimensionalen LTI-Systems auf reduzierte Ordnung $r$.',
                    h: 'Loese zwei Lyapunov-Gleichungen (Steuerbarkeits- und Beobachtbarkeits-Gramian); transformiere in Balanced Form; trunkiere kleine Hankel-Singulaerwerte.',
                    s: 'Schritt 1: Loese $A P + P A^T + B B^T = 0$ (Steuerbarkeits-Gramian) und $A^T Q + Q A + C^T C = 0$ (Beobachtbarkeits-Gramian).<br>Schritt 2: Balancierungs-Transformation $T$ so, dass $T P T^T = T^{-T} Q T^{-1} = \\Sigma = \\text{diag}(\\sigma_1,\\ldots,\\sigma_n)$ mit $\\sigma_i$ Hankel-Singulaerwerten, absteigend sortiert.<br>Schritt 3: Trunkiere die letzten $n-r$ Komponenten $\\Rightarrow$ reduziertes System $(\\hat A,\\hat B,\\hat C)$ der Ordnung $r$.<br>Fehlerabschaetzung: $\\|G - \\hat G\\|_\\infty \\le 2\\sum_{i=r+1}^n \\sigma_i$. Stabilitaet bleibt erhalten. <em>Quelle:</em> Moore, Principal component analysis in linear systems, IEEE Trans. AC 26(1), 1981; Antoulas, Approximation of Large-Scale Dynamical Systems, SIAM 2005, §7.1.'
                },
                {
                    q: 'Iterative Learning Control (ILC): erlaeutere die Konvergenzbedingung des P-Type-ILC-Updates $u_{k+1}(t) = u_k(t) + L\\,e_k(t)$ fuer ein wiederholtes Tracking-Problem.',
                    h: 'Im Frequenzbereich: $|1 - L\\,G(j\\omega)| < 1$ fuer alle $\\omega$.',
                    s: 'Setup: Strecke $G$ wird wiederholt mit derselben Trajektorie $r(t)$ angeregt; Fehler $e_k = r - y_k$; Eingang fuer naechsten Versuch via $u_{k+1} = u_k + L e_k$.<br>Fehlerdynamik: $e_{k+1} = e_k - L G e_k = (1 - LG) e_k$.<br>Konvergenzbedingung (Frequenzbereich):<br>$$|1 - L(j\\omega) G(j\\omega)| < 1\\quad\\forall\\,\\omega\\in[0,\\omega_N]$$ mit $\\omega_N$ = Nyquist-Frequenz.<br>Optimale Wahl: $L = G^{-1}$ (sofern stabil und kausal); robuste Wahl: $L = \\gamma\\cdot \\hat G^{-1}$ mit Filterung gegen Modellfehler.<br>Konvergenz geometrisch in $\\|1-LG\\|_\\infty$. <em>Quelle:</em> Arimoto/Kawamura/Miyazaki, Bettering operation of robots by learning, J. Robotic Systems 1(2), 1984; Bristow/Tharayil/Alleyne, A survey of iterative learning control, IEEE Control Systems Magazine 26(3), 2006.'
                },
                {
                    q: 'Disturbance Observer (DOB): erlaeutere die Q-Filter-Struktur und gib die Stoeruebertragung an.',
                    h: 'DOB schaetzt unbekannte Eingangsstoerung $d$ via $\\hat d = Q(s) (\\hat G^{-1} y - u)$, kompensiert mit $u_{ges} = u_{Soll} - \\hat d$.',
                    s: 'Struktur: nominales Streckenmodell $\\hat G$, Q-Filter $Q(s)$ mit $|Q(j\\omega)|\\approx 1$ im niederfrequenten Stoerband und $\\to 0$ bei hohen Frequenzen (Tiefpass).<br>Stoerschaetzung: $\\hat d = Q(s) (\\hat G^{-1}(s) y - u)$ — bei perfektem Modell ohne Sensorrauschen ist $\\hat d \\approx Q\\cdot d$.<br>Effektive Stoeruebertragung: $G_{d\\to y} = G\\,(1-Q) / (1 + Q(G/\\hat G - 1))$. Bei $\\hat G = G$: $G_{d\\to y} = G\\,(1-Q)$ $\\Rightarrow$ im Q-Band stark unterdrueckt.<br>Robustheit: $Q\\cdot G\\hat G^{-1}$ muss kausal und proper sein; $Q$-Bandbreite gegen Modellunsicherheit abwaegen.<br>$$\\boxed{G_{d\\to y} = G(1-Q)\\text{ (perfektes Modell)}}$$ <em>Quelle:</em> Ohnishi, A new servo method in mechatronics, Trans. Japan. Soc. Electr. Eng. 107-D, 1987; Chen et al., Disturbance-Observer-Based Control, IEEE Trans. Ind. Electron. 63(2), 2016.'
                },
                {
                    q: 'RGA (Relative Gain Array): erlaeutere die Definition $\\Lambda = G(0) \\circ (G(0)^{-T})$ (Hadamard-Produkt) und ihre Bedeutung fuer die Paarungswahl in MIMO-Systemen.',
                    h: 'RGA-Element $\\lambda_{ij}$: Verhaeltnis statischer Verstaerkung von $u_j\\to y_i$ bei offenen vs. geschlossenen Kreisen der uebrigen Schleifen.',
                    s: 'Definition: $\\Lambda = G(0) \\circ (G(0)^{-T})$ ($\\circ$ = elementweises Hadamard-Produkt).<br>Eigenschaften:<br>(i) Zeilen- und Spaltensummen $=1$.<br>(ii) $\\lambda_{ij}=1$: $u_j\\to y_i$ entkoppelt von uebrigen Schleifen (ideale Paarung).<br>(iii) $\\lambda_{ij}\\approx 0{,}5$: starke Kopplung (vermeiden).<br>(iv) $\\lambda_{ij}<0$: Vorzeichenumkehr bei Schliessen der uebrigen Schleifen $\\Rightarrow$ Paarung verboten (Stabilitaetsrisiko).<br>Bristol-Regel: paare $u_j$ mit $y_i$, fuer das $\\lambda_{ij}$ nahe $1$ und positiv ist.<br>$$\\boxed{\\Lambda = G(0) \\circ G(0)^{-T},\\ \\lambda_{ij}\\to 1\\text{ optimal}}$$ <em>Quelle:</em> Bristol, On a new measure of interaction for multivariable process control, IEEE Trans. AC 11(1), 1966; Skogestad &amp; Postlethwaite, Multivariable Feedback Control, 2nd ed., Wiley 2005, §3.4.'
                }
            ]
        ]
    };
})();
