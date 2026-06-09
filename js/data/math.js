/* Höhere Mathematik */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'math';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Höhere Mathematik',
        desc: 'Komplexe Zahlen, Lineare Algebra, Differential- und Integralrechnung, Differentialgleichungen, Fourier- und Laplace-Transformation, Vektoranalysis.',
        formulas: `
            <strong>Komplexe Zahlen</strong><br>
            $z = a + jb = r\\,e^{j\\varphi}$, $r = |z| = \\sqrt{a^2+b^2}$, $\\varphi = \\arg(z)$<br>
            $z_1 z_2 = r_1 r_2\\,e^{j(\\varphi_1+\\varphi_2)}$, $\\overline{z}\\cdot z = |z|^2$<br><br>
            <strong>Ableitungsregeln</strong><br>
            Produkt: $(uv)' = u'v + uv'$<br>
            Quotient: $(u/v)' = (u'v - uv')/v^2$<br>
            Kette: $(f(g(x)))' = f'(g)\\cdot g'(x)$<br><br>
            <strong>Wichtige Integrale</strong><br>
            $\\int x^n\\,dx = \\tfrac{x^{n+1}}{n+1}$ ($n\\neq -1$)<br>
            $\\int \\tfrac{1}{x}dx = \\ln|x|$, $\\int e^{ax}dx = \\tfrac{1}{a}e^{ax}$<br>
            Partielle Integration: $\\int u v'\\,dx = uv - \\int u' v\\,dx$<br><br>
            <strong>DGL 1. Ordnung</strong> $y' + a(x)y = b(x)$:<br>
            $y(x) = e^{-A(x)}\\!\\left[\\int b(x)e^{A(x)}dx + C\\right]$, $A(x)=\\int a\\,dx$<br><br>
            <strong>Laplace-Transformation</strong><br>
            $\\mathcal{L}\\{1\\}=1/s$, $\\mathcal{L}\\{e^{-at}\\}=1/(s+a)$<br>
            $\\mathcal{L}\\{\\sin\\omega t\\}=\\omega/(s^2+\\omega^2)$, $\\mathcal{L}\\{\\cos\\omega t\\}=s/(s^2+\\omega^2)$<br>
            Dämpfung: $\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)$<br>
            Ableitung: $\\mathcal{L}\\{f'\\}=sF(s)-f(0)$<br><br>
            <strong>Lineare Algebra</strong><br>
            $\\det(2\\times2)=ad-bc$, Inverse: $A^{-1}=\\tfrac{1}{\\det A}\\!\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix}$<br>
            Eigenwerte: $\\det(A-\\lambda I)=0$<br>
            Cramer: $x_i=\\det A_i/\\det A$<br>
            Skalarprodukt: $\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta$<br><br>
            <strong>Vektoranalysis</strong><br>
            Rotation: $\\operatorname{rot}\\vec F=\\nabla\\times\\vec F$<br>
            Stokes: $\\oint_{\\partial S}\\vec F\\cdot d\\vec r=\\iint_S(\\nabla\\times\\vec F)\\cdot d\\vec A$<br>
            Gauß: $\\oiint\\vec F\\cdot d\\vec A=\\iiint\\nabla\\cdot\\vec F\\,dV$<br><br>
            <strong>Funktionentheorie</strong><br>
            Cauchy-Integralformel: $f(z_0)=\\dfrac{1}{2\\pi j}\\oint_C\\dfrac{f(z)}{z-z_0}dz$<br>
            Parseval: $\\tfrac{1}{2\\pi}\\!\\int_{-\\pi}^{\\pi}|f|^2 dx=\\tfrac{a_0^2}{4}+\\tfrac12\\sum(a_n^2+b_n^2)$<br><br>
            <strong>Reihen-Konvergenz</strong><br>
            Quotient: $\\lim|a_{n+1}/a_n|<1\\Rightarrow$ konvergent<br>
            Wurzel: $\\lim\\sqrt[n]{|a_n|}<1\\Rightarrow$ konvergent<br>
            Leibniz (alternierend): $a_n\\downarrow 0\\Rightarrow$ konvergent<br><br>

            <strong>Grenzwerte &amp; Reihen</strong><br>
            de l'Hospital: $\\tfrac{0}{0}$ oder $\\tfrac{\\infty}{\\infty}\\Rightarrow\\lim\\tfrac{f}{g}=\\lim\\tfrac{f'}{g'}$<br>
            Geometrisch: $\\sum_{n=0}^\\infty q^n=\\tfrac{1}{1-q}$ ($|q|<1$)<br>
            Arithmetisch: $\\sum_{k=1}^n k=\\tfrac{n(n+1)}{2}$<br>
            $e^x=\\sum\\tfrac{x^k}{k!}$, $\\sin x=x-\\tfrac{x^3}{3!}+\\dots$, $\\cos x=1-\\tfrac{x^2}{2!}+\\dots$<br>
            $\\ln(1+x)=x-\\tfrac{x^2}{2}+\\tfrac{x^3}{3}-\\dots$ ($|x|<1$)<br>
            Gamma: $\\Gamma(n)=(n-1)!$, $\\Gamma(\\tfrac12)=\\sqrt\\pi$<br><br>

            <strong>Funktionentheorie (Zusatz)</strong><br>
            Cauchy-Riemann: $u_x=v_y$, $u_y=-v_x$<br>
            Residuum (Pol Ordnung $m$): $\\operatorname{Res}=\\tfrac{1}{(m-1)!}\\lim\\tfrac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f]$<br><br>

            <strong>Fourier- / z-Transformation</strong><br>
            FT: $\\hat f(\\omega)=\\int f(t)e^{-j\\omega t}dt$; Gauss: $e^{-x^2}\\leftrightarrow\\sqrt\\pi\\,e^{-\\omega^2/4}$<br>
            Rechteck $\\leftrightarrow$ sinc; Abtastung (Nyquist): $f_s>2f_{\\max}$<br>
            z-Transform: $a^n u[n]\\leftrightarrow\\tfrac{z}{z-a}$ ($|z|>|a|$)<br><br>

            <strong>Numerik</strong><br>
            Newton: $x_{n+1}=x_n-\\tfrac{f(x_n)}{f'(x_n)}$<br>
            Simpson: $\\int_a^b f\\approx\\tfrac{h}{3}(f_0+4f_1+f_2)$, $h=\\tfrac{b-a}{2}$<br>
            Gauss-2-Punkt: $\\int_{-1}^1 f\\approx f(-\\tfrac{1}{\\sqrt3})+f(\\tfrac{1}{\\sqrt3})$<br>
            RK4: $y_{n+1}=y_n+\\tfrac{h}{6}(k_1+2k_2+2k_3+k_4)$<br>
            Ausgleich (least squares): $A^T A\\vec x=A^T\\vec b$<br><br>

            <strong>Stochastik</strong><br>
            Bayes: $P(A|B)=\\tfrac{P(B|A)P(A)}{P(B)}$<br>
            ZGS: $\\tfrac{S_n-n\\mu}{\\sigma\\sqrt n}\\xrightarrow{d}\\mathcal N(0,1)$<br>
            ML-Schätzer Exp.-Verteilung: $\\hat\\lambda=1/\\bar x$
        `,
        levels: [
            // ----------------- LEVEL 1 -----------------
            [
                {
                    q: 'Gegeben sind $z_1=3+4j$ und $z_2=1-2j$. Berechne $z_1\\cdot z_2$ und $|z_1|$.',
                    h: '$(a+jb)(c+jd)=(ac-bd)+j(ad+bc)$. $|z|=\\sqrt{a^2+b^2}$. Beachte $j^2=-1$.',
                    s: 'Produkt: $z_1 z_2 = (3+4j)(1-2j) = 3 -6j +4j -8j^2 = 3+8 + (-6+4)j = 11-2j$.<br>Betrag: $|z_1|=\\sqrt{9+16}=\\sqrt{25}=5$.<br>$$\\boxed{z_1 z_2 = 11-2j,\\quad |z_1|=5}$$'
                },
                {
                    q: 'Bringe $z = 1+j$ in Polarform $r\\,e^{j\\varphi}$.',
                    h: '$r=\\sqrt{a^2+b^2}$, $\\varphi=\\arctan(b/a)$ (im I. Quadranten).',
                    s: '$r=\\sqrt{1+1}=\\sqrt{2}$. $\\varphi=\\arctan(1/1)=\\pi/4$.<br>$$z=\\sqrt{2}\\,e^{j\\pi/4}$$<br>Kommentar: bei anderem Quadranten muss $\\arctan$ um $\\pm\\pi$ korrigiert werden (Funktion atan2).'
                },
                {
                    q: 'Bilde die Ableitung von $f(x) = (3x^2+1)\\sin(x)$.',
                    h: 'Produktregel $(uv)\' = u\'v + uv\'$.',
                    s: '$u=3x^2+1\\Rightarrow u\'=6x$. $v=\\sin x \\Rightarrow v\'=\\cos x$.<br>$$f\'(x)=6x\\sin x + (3x^2+1)\\cos x$$'
                },
                {
                    q: 'Berechne $\\int_0^{\\pi/2}\\cos(x)\\,dx$.',
                    h: 'Stammfunktion von $\\cos$ ist $\\sin$. Hauptsatz: $F(b)-F(a)$.',
                    s: '$\\int\\cos x\\,dx=\\sin x +C$.<br>$[\\sin x]_0^{\\pi/2}=\\sin(\\pi/2)-\\sin(0)=1-0=1$.<br>$$\\boxed{=1}$$'
                },
                {
                    q: 'Bestimme die Determinante von $A=\\begin{pmatrix}2&3\\\\1&4\\end{pmatrix}$ und die Inverse $A^{-1}$.',
                    h: '$\\det=ad-bc$. $A^{-1}=\\tfrac{1}{\\det A}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$.',
                    s: '$\\det A = 2\\cdot 4 - 3\\cdot 1 = 8-3=5$.<br>$$A^{-1}=\\tfrac{1}{5}\\begin{pmatrix}4&-3\\\\-1&2\\end{pmatrix}$$<br>Kontrolle: $A\\cdot A^{-1}=I$.'
                },
                {
                    q: 'Berechne $\\lim_{x\\to 0}\\dfrac{\\sin(3x)}{x}$.',
                    h: 'Standard-Grenzwert $\\lim_{u\\to 0}\\sin(u)/u = 1$.',
                    s: 'Erweitern: $\\dfrac{\\sin(3x)}{x}=3\\cdot\\dfrac{\\sin(3x)}{3x}\\xrightarrow{x\\to 0} 3\\cdot 1 = 3$.<br>$$\\boxed{=3}$$'                },
                {
                    q: 'Bestimme den Winkel zwischen $\\vec a=(1,2,2)$ und $\\vec b=(2,0,1)$.',
                    h: '$\\cos\\theta=\\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$.',
                    s: '$\\vec a\\cdot\\vec b = 1\\cdot 2+2\\cdot 0+2\\cdot 1 = 4$.<br>$|\\vec a|=\\sqrt{1+4+4}=3$, $|\\vec b|=\\sqrt{4+0+1}=\\sqrt 5$.<br>$\\cos\\theta = 4/(3\\sqrt 5)\\approx 0{,}596$.<br>$$\\boxed{\\theta\\approx 53{,}4^\\circ}$$'
                },
                {
                    q: 'Bilde die Ableitung von $f(x)=\\dfrac{x^2}{x+1}$.',
                    h: 'Quotientenregel $(u/v)\'=(u\'v-uv\')/v^2$.',
                    s: '$u=x^2,\ u\'=2x$. $v=x+1,\ v\'=1$.<br>$f\'(x)=\\dfrac{2x(x+1)-x^2}{(x+1)^2}=\\dfrac{x^2+2x}{(x+1)^2}=\\dfrac{x(x+2)}{(x+1)^2}$.<br>$$\\boxed{f\'(x)=\\dfrac{x(x+2)}{(x+1)^2}}$$'
                },
                {
                    q: 'Zerlege $\\dfrac{1}{x(x+1)}$ in Partialbrüche.',
                    h: 'Ansatz $\\dfrac{A}{x}+\\dfrac{B}{x+1}$, Koeffizientenvergleich.',
                    s: '$1=A(x+1)+Bx$. Bei $x=0$: $A=1$. Bei $x=-1$: $-B=1\\Rightarrow B=-1$.<br>$$\\boxed{\\dfrac{1}{x(x+1)}=\\dfrac{1}{x}-\\dfrac{1}{x+1}}$$<br>Anwendung: $\\int=\\ln|x|-\\ln|x+1|+C$.'
                },
                {
                    q: 'Löse mit der Cramerschen Regel: $2x+y=5,\ x-y=1$.',
                    h: '$x_i=\\det A_i/\\det A$ mit $A_i$: $i$-te Spalte durch $\\vec b$ ersetzt.',
                    s: '$\\det A=\\det\\!\\begin{pmatrix}2&1\\1&-1\\end{pmatrix}=-3$.<br>$\\det A_x=\\det\\!\\begin{pmatrix}5&1\\1&-1\\end{pmatrix}=-6\\Rightarrow x=-6/-3=2$.<br>$\\det A_y=\\det\\!\\begin{pmatrix}2&5\\1&1\\end{pmatrix}=-3\\Rightarrow y=-3/-3=1$.<br>$$\\boxed{x=2,\ y=1}$$'                },
                {
                    q: 'Formel von de Moivre: berechne $(1+j)^8$ über die Polarform.',
                    h: '$z^n = r^n\\,e^{j n\\varphi}$. Für $1+j$: $r=\\sqrt 2$, $\\varphi=\\pi/4$.',
                    s: '$1+j = \\sqrt 2\\,e^{j\\pi/4}$. Damit $(1+j)^8 = (\\sqrt 2)^8\\,e^{j 8\\pi/4} = 2^4\\,e^{j 2\\pi} = 16\\cdot 1 = 16$.<br>$$\\boxed{(1+j)^8 = 16}$$ <em>Quelle:</em> A. de Moivre "Miscellanea Analytica" (1730); Bronstein/Semendjajew, Taschenbuch der Mathematik, 12. Aufl. (2024) §1.5.2.'
                },
                {
                    q: 'Berechne beide Werte der komplexen Wurzel $\\sqrt{j}$.',
                    h: '$j = e^{j(\\pi/2+2k\\pi)}$, $k=0,1$. Wurzeln: $e^{j(\\pi/4+k\\pi)}$.',
                    s: '$\\sqrt j = e^{j\\pi/4}$ oder $e^{j5\\pi/4}$. Einsetzen: $e^{j\\pi/4}=\\tfrac{\\sqrt 2}{2}(1+j)$ und $e^{j5\\pi/4}=-\\tfrac{\\sqrt 2}{2}(1+j)$.<br>$$\\boxed{\\sqrt j = \\pm\\tfrac{\\sqrt 2}{2}(1+j)}$$ <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §13.'
                },
                {
                    q: 'Löse das LGS via Gauss-Elimination: $x+y+z=6$, $2x-y+z=3$, $x+y-z=0$.',
                    h: 'Zeilenstufenform durch Subtraktion von Vielfachen von Zeile 1.',
                    s: 'Matrix: $\\begin{pmatrix}1&1&1&|&6\\\\2&-1&1&|&3\\\\1&1&-1&|&0\\end{pmatrix}$.<br>$R_2\\!\\leftarrow R_2-2R_1$: $(0,-3,-1\\,|\\,-9)$.<br>$R_3\\!\\leftarrow R_3-R_1$: $(0,0,-2\\,|\\,-6)\\Rightarrow z=3$.<br>$-3y-z=-9\\Rightarrow -3y-3=-9\\Rightarrow y=2$. $x+2+3=6\\Rightarrow x=1$.<br>$$\\boxed{x=1,\\ y=2,\\ z=3}$$ <em>Quelle:</em> Strang, Linear Algebra and Its Applications, 4th ed. (2006), §2.3.'
                },
                {
                    q: 'Bestimme das Kreuzprodukt $\\vec a\\times\\vec b$ für $\\vec a=(1,2,3)$ und $\\vec b=(4,5,6)$.',
                    h: 'Sarrus / Schema $\\vec a\\times\\vec b = (a_2 b_3-a_3 b_2,\\ a_3 b_1-a_1 b_3,\\ a_1 b_2-a_2 b_1)$.',
                    s: '$(2\\cdot 6-3\\cdot 5,\\ 3\\cdot 4-1\\cdot 6,\\ 1\\cdot 5-2\\cdot 4) = (12-15,\\ 12-6,\\ 5-8) = (-3,\\ 6,\\ -3)$.<br>$$\\boxed{\\vec a\\times\\vec b = (-3,\\,6,\\,-3)}$$ Kontrolle: $\\vec a\\cdot(\\vec a\\times\\vec b)=1\\cdot(-3)+2\\cdot 6+3\\cdot(-3)=0$. <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §3.5.1.'
                },
                {
                    q: 'Berechne das Volumen des von $\\vec a=(1,0,0)$, $\\vec b=(1,1,0)$, $\\vec c=(1,1,1)$ aufgespannten Parallelepipeds.',
                    h: 'Spatprodukt $V=|\\det(\\vec a,\\vec b,\\vec c)|$.',
                    s: '$\\det\\!\\begin{pmatrix}1&1&1\\\\0&1&1\\\\0&0&1\\end{pmatrix}=1\\cdot 1\\cdot 1=1$ (obere Dreiecksmatrix). $V=|1|=1$.<br>$$\\boxed{V=1}$$ <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §5.3.'
                },
                {
                    q: 'Berechne $\\det\\!\\begin{pmatrix}1&2&3\\\\0&4&5\\\\1&0&6\\end{pmatrix}$ via Sarrus.',
                    h: 'Sarrus: Summe der drei Hauptdiagonalen minus drei Nebendiagonalen.',
                    s: 'Hauptdiagonalen: $1\\cdot 4\\cdot 6 + 2\\cdot 5\\cdot 1 + 3\\cdot 0\\cdot 0 = 24+10+0 = 34$.<br>Nebendiagonalen: $3\\cdot 4\\cdot 1 + 1\\cdot 5\\cdot 0 + 2\\cdot 0\\cdot 6 = 12+0+0 = 12$.<br>$\\det = 34-12 = 22$.<br>$$\\boxed{\\det = 22}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §4.4.2 (Regel von Sarrus, nur fuer $3\\times 3$ gueltig).'
                },
                {
                    q: 'Partialbruchzerlegung: $\\dfrac{1}{s(s+1)}$.',
                    h: 'Ansatz $\\dfrac{A}{s}+\\dfrac{B}{s+1}$. Koeffizientenvergleich.',
                    s: '$\\dfrac{A}{s}+\\dfrac{B}{s+1}=\\dfrac{A(s+1)+Bs}{s(s+1)}=\\dfrac{(A+B)s+A}{s(s+1)}\\stackrel{!}{=}\\dfrac{1}{s(s+1)}$.<br>$\\Rightarrow A=1$, $A+B=0\\Rightarrow B=-1$.<br>$$\\boxed{\\dfrac{1}{s(s+1)} = \\dfrac{1}{s}-\\dfrac{1}{s+1}}$$ Anwendung: $\\mathcal{L}^{-1}\\{\\cdot\\}=1-e^{-t}$ (Sprungantwort PT1). <em>Quelle:</em> Lutz/Wendt, Taschenbuch der Regelungstechnik, 12. Aufl. (2021), §3.3.'
                },
                {
                    q: 'Berechne $\\int x\\cos(x^2)\\,dx$ via Substitution.',
                    h: '$u=x^2\\Rightarrow du=2x\\,dx$, also $x\\,dx=\\tfrac12 du$.',
                    s: '$\\int x\\cos(x^2)\\,dx = \\tfrac12\\!\\int\\cos u\\,du = \\tfrac12\\sin u + C = \\tfrac12\\sin(x^2)+C$.<br>$$\\boxed{= \\tfrac12\\sin(x^2)+C}$$ Kontrolle: $\\tfrac{d}{dx}\\tfrac12\\sin(x^2) = \\tfrac12\\cos(x^2)\\cdot 2x = x\\cos(x^2)$. <em>Quelle:</em> Heuser, Lehrbuch der Analysis Teil 1, 17. Aufl. (2009), §80.'
                },
                {
                    q: 'Mittelwertsatz der Integralrechnung: berechne den Mittelwert $\\bar f$ von $f(x)=x^2$ auf $[0,3]$.',
                    h: '$\\bar f = \\dfrac{1}{b-a}\\int_a^b f(x)\\,dx$.',
                    s: '$\\bar f = \\dfrac{1}{3}\\!\\int_0^3 x^2\\,dx = \\dfrac{1}{3}\\!\\left[\\dfrac{x^3}{3}\\right]_0^3 = \\dfrac{1}{3}\\cdot 9 = 3$.<br>$$\\boxed{\\bar f = 3}$$ Geometrisch: das Rechteck $3\\times 3$ ueber $[0,3]$ hat dieselbe Flaeche wie $\\int_0^3 x^2 dx = 9$. <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §18.'
                },
                {
                    q: 'Zeige $\\lim_{n\\to\\infty}\\!\\left(1+\\tfrac{1}{n}\\right)^{\\!n} = e$ ueber den binomischen Lehrsatz.',
                    h: 'Binomial: $(1+1/n)^n = \\sum_{k=0}^n\\binom{n}{k}\\tfrac{1}{n^k}$, dann termweise gegen $\\tfrac{1}{k!}$.',
                    s: '$\\binom{n}{k}\\tfrac{1}{n^k} = \\tfrac{n(n-1)\\cdots(n-k+1)}{k!\\,n^k} = \\tfrac{1}{k!}\\cdot\\tfrac{n}{n}\\cdot\\tfrac{n-1}{n}\\cdots\\tfrac{n-k+1}{n}$.<br>Fuer $n\\to\\infty$ konvergiert jeder Faktor $\\tfrac{n-i}{n}\\to 1$, also $\\binom{n}{k}/n^k\\to\\tfrac{1}{k!}$.<br>Damit $(1+1/n)^n\\to\\sum_{k=0}^\\infty\\tfrac{1}{k!} = e$ (per Definition).<br>$$\\boxed{e = \\sum_{k=0}^\\infty\\tfrac{1}{k!} \\approx 2{,}71828}$$ <em>Quelle:</em> L. Euler "Introductio in Analysin Infinitorum" (1748), §122-125; Forster, Analysis 1, §3.'
                },
                {
                    q: 'Bestimme den Konvergenzradius $R$ der Potenzreihe $\\sum_{n=0}^\\infty \\dfrac{x^n}{n!}$.',
                    h: 'Cauchy-Hadamard oder Quotientenkriterium: $1/R=\\lim|a_{n+1}/a_n|$.',
                    s: '$\\left|\\dfrac{a_{n+1}}{a_n}\\right| = \\left|\\dfrac{n!}{(n+1)!}\\right| = \\dfrac{1}{n+1}\\to 0$. Also $1/R=0\\Rightarrow R=\\infty$.<br>$$\\boxed{R = \\infty}$$ Die Reihe konvergiert fuer alle $x\\in\\mathbb R$ und stellt $e^x$ dar. <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §22 (Satz von Cauchy-Hadamard).'
                },
                {
                    q: 'Bestimme den Winkel zwischen $\\vec a = (1,1,0)$ und $\\vec b = (1,0,1)$.',
                    h: '$\\cos\\theta = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$.',
                    s: '$\\vec a\\cdot\\vec b = 1+0+0 = 1$. $|\\vec a|=|\\vec b|=\\sqrt 2$.<br>$\\cos\\theta = \\dfrac{1}{2}\\Rightarrow \\theta = 60^\\circ = \\pi/3$.<br>$$\\boxed{\\theta = 60^\\circ}$$ <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §6.1.'
                },
                {
                    q: 'Berechne die Inverse von $A = \\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$.',
                    h: '$A^{-1} = \\dfrac{1}{\\det A}\\!\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$.',
                    s: '$\\det A = 3\\cdot 4 - 2\\cdot 1 = 10$.<br>$A^{-1} = \\dfrac{1}{10}\\!\\begin{pmatrix}4 & -2\\\\ -1 & 3\\end{pmatrix} = \\begin{pmatrix}0{,}4 & -0{,}2\\\\ -0{,}1 & 0{,}3\\end{pmatrix}$.<br>Kontrolle: $A A^{-1} = I_2$.<br>$$\\boxed{A^{-1} = \\tfrac{1}{10}\\!\\begin{pmatrix}4 & -2\\\\ -1 & 3\\end{pmatrix}}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §4.3.3.'
                },
                {
                    q: 'Berechne $z_1/z_2$ für $z_1=4+2j$, $z_2=1+j$ (mit konjugiert komplexem Erweitern).',
                    h: 'Erweitere mit $\\overline{z_2}$: $\\dfrac{z_1}{z_2}=\\dfrac{z_1\\overline{z_2}}{|z_2|^2}$.',
                    s: '$\\overline{z_2}=1-j$, $|z_2|^2=1^2+1^2=2$.<br>$z_1\\overline{z_2}=(4+2j)(1-j)=4-4j+2j-2j^2=4+2+(-4+2)j=6-2j$.<br>$\\dfrac{z_1}{z_2}=\\dfrac{6-2j}{2}=3-j$.<br>$$\\boxed{z_1/z_2 = 3-j}$$ <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 1, 16. Aufl. (2022), §VII.2.'
                },
                {
                    q: 'Bestimme Betrag und Argument von $z=-1+j$ (Argument im korrekten Quadranten).',
                    h: '$r=\\sqrt{a^2+b^2}$. $z$ liegt im II. Quadranten ($a<0$, $b>0$) — $\\arctan$ um $\\pi$ korrigieren bzw. atan2 nutzen.',
                    s: '$r=\\sqrt{(-1)^2+1^2}=\\sqrt2$.<br>$\\operatorname{atan2}(1,-1)=\\pi-\\arctan(1)=\\pi-\\tfrac{\\pi}{4}=\\tfrac{3\\pi}{4}$.<br>$$\\boxed{r=\\sqrt2,\\ \\varphi=\\tfrac{3\\pi}{4}=135^\\circ}$$ Merke: nur $\\arctan(b/a)$ zu rechnen ergäbe faelschlich $-45^\\circ$. <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §1.5.2.'
                },
                {
                    q: 'Leite $f(x)=\\sin(x^2)$ ab (Kettenregel).',
                    h: 'Aeussere Funktion $\\sin(u)$, innere $u=x^2$. $(f(g))\'=f\'(g)\\cdot g\'$.',
                    s: '$f\'(x)=\\cos(x^2)\\cdot 2x = 2x\\cos(x^2)$.<br>$$\\boxed{f\'(x)=2x\\cos(x^2)}$$ <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §15 (Kettenregel).'
                },
                {
                    q: 'Berechne das bestimmte Integral $\\int_1^2 x^2\\,dx$.',
                    h: 'Stammfunktion $\\tfrac{x^3}{3}$, dann Hauptsatz $F(2)-F(1)$.',
                    s: '$\\left[\\tfrac{x^3}{3}\\right]_1^2=\\tfrac{8}{3}-\\tfrac{1}{3}=\\tfrac{7}{3}$.<br>$$\\boxed{\\int_1^2 x^2\\,dx=\\tfrac{7}{3}\\approx 2{,}33}$$ <em>Quelle:</em> Heuser, Lehrbuch der Analysis Teil 1, 17. Aufl. (2009), §79.'
                },
                {
                    q: 'Berechne $\\int_1^e \\dfrac{1}{x}\\,dx$.',
                    h: 'Stammfunktion von $1/x$ ist $\\ln|x|$.',
                    s: '$[\\ln x]_1^e=\\ln e-\\ln 1=1-0=1$.<br>$$\\boxed{\\int_1^e \\tfrac{1}{x}dx=1}$$ <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §18.'
                },
                {
                    q: 'Berechne $\\lim_{x\\to 0}\\dfrac{e^x-1}{x}$ mit der Regel von de l\'Hospital.',
                    h: 'Form $\\tfrac{0}{0}$: Zaehler und Nenner getrennt ableiten.',
                    s: '$\\tfrac{0}{0}$-Fall. $\\dfrac{(e^x-1)\'}{(x)\'}=\\dfrac{e^x}{1}\\xrightarrow{x\\to 0}1$.<br>$$\\boxed{=1}$$ Dies ist zugleich die Ableitung von $e^x$ bei $x=0$. <em>Quelle:</em> Heuser, Analysis 1, 17. Aufl. (2009), §50 (Regel von de l\'Hospital).'
                },
                {
                    q: 'Bestimme die orthogonale Projektion von $\\vec a=(3,4)$ auf $\\vec b=(1,0)$.',
                    h: '$\\vec a_{\\parallel}=\\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\,\\vec b$.',
                    s: '$\\vec a\\cdot\\vec b=3$, $|\\vec b|^2=1$.<br>$\\vec a_{\\parallel}=3\\cdot(1,0)=(3,0)$.<br>$$\\boxed{\\vec a_{\\parallel}=(3,0)}$$ Geometrisch: der $x$-Anteil von $\\vec a$. <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §6.1.'
                },
                {
                    q: 'Bestimme den Einheitsvektor (normiert) in Richtung $\\vec v=(2,-1,2)$.',
                    h: '$\\hat v=\\vec v/|\\vec v|$.',
                    s: '$|\\vec v|=\\sqrt{4+1+4}=3$.<br>$\\hat v=\\tfrac{1}{3}(2,-1,2)$.<br>$$\\boxed{\\hat v=\\left(\\tfrac23,-\\tfrac13,\\tfrac23\\right)}$$ Kontrolle: $|\\hat v|=\\tfrac13\\sqrt{4+1+4}=1$. <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §3.5.1.'
                },
                {
                    q: 'Berechne das Matrixprodukt $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$.',
                    h: 'Zeile mal Spalte. Die zweite Matrix vertauscht die Spalten.',
                    s: '$\\begin{pmatrix}1\\cdot 0+2\\cdot 1 & 1\\cdot 1+2\\cdot 0\\\\ 3\\cdot 0+4\\cdot 1 & 3\\cdot 1+4\\cdot 0\\end{pmatrix}=\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}$.<br>$$\\boxed{\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}}$$ <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §2.4.'
                },
                {
                    q: 'Ist $A=\\begin{pmatrix}1&2\\\\2&5\\end{pmatrix}$ symmetrisch? Gib $A^T$ an.',
                    h: 'Symmetrisch heißt $A^T=A$, d.h. $a_{ij}=a_{ji}$.',
                    s: '$A^T=\\begin{pmatrix}1&2\\\\2&5\\end{pmatrix}=A$, da $a_{12}=a_{21}=2$.<br>$$\\boxed{A^T=A,\\ \\text{also symmetrisch}}$$ <em>Quelle:</em> Strang, Linear Algebra and Its Applications, 4th ed. (2006), §1.6.'
                },
                {
                    q: 'Berechne die Spur von $A=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$ und nenne ihren Zusammenhang zu den Eigenwerten.',
                    h: '$\\operatorname{tr}A=\\sum a_{ii}$. Es gilt $\\operatorname{tr}A=\\sum\\lambda_i$.',
                    s: '$\\operatorname{tr}A=4+3=7$.<br>Aus $\\lambda^2-7\\lambda+10=0$ folgt $\\lambda_1+\\lambda_2=7=\\operatorname{tr}A$.<br>$$\\boxed{\\operatorname{tr}A=7=\\lambda_1+\\lambda_2}$$ <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §4.2.'
                },
                {
                    q: 'Löse die Exponentialgleichung $2^x=32$.',
                    h: 'Beide Seiten als Potenz zur Basis 2 schreiben oder $\\log_2$ anwenden.',
                    s: '$32=2^5\\Rightarrow x=5$.<br>$$\\boxed{x=5}$$ <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 1, 16. Aufl. (2022), §III.4.'
                },
                {
                    q: 'Vereinfache $\\ln 8-\\ln 2$ mit den Logarithmengesetzen.',
                    h: '$\\ln a-\\ln b=\\ln(a/b)$.',
                    s: '$\\ln 8-\\ln 2=\\ln\\tfrac{8}{2}=\\ln 4=2\\ln 2\\approx 1{,}386$.<br>$$\\boxed{=\\ln 4=2\\ln 2}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §2.5.2.'
                },
                {
                    q: 'Berechne die geometrische Reihe $\\sum_{n=0}^{\\infty}\\left(\\tfrac12\\right)^n$.',
                    h: 'Geometrische Reihe: $\\sum_{n=0}^\\infty q^n=\\dfrac{1}{1-q}$ für $|q|<1$.',
                    s: 'Mit $q=\\tfrac12$: $\\dfrac{1}{1-\\frac12}=2$.<br>$$\\boxed{=2}$$ <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §7.'
                },
                {
                    q: 'Berechne die Summe $\\sum_{k=1}^{100} k$ mit der Gauss-Summenformel.',
                    h: '$\\sum_{k=1}^n k=\\dfrac{n(n+1)}{2}$.',
                    s: '$\\dfrac{100\\cdot 101}{2}=5050$.<br>$$\\boxed{=5050}$$ Historisch: C. F. Gauss als Schüler. <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §1.2.2.'
                },
                {
                    q: 'Leite $f(x)=e^{2x}$ ab.',
                    h: 'Kettenregel: innere Funktion $2x$.',
                    s: '$f\'(x)=e^{2x}\\cdot 2=2e^{2x}$.<br>$$\\boxed{f\'(x)=2e^{2x}}$$ <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §15.'
                },
                {
                    q: 'Bestimme die 3. Ableitung von $f(x)=x^4$.',
                    h: 'Potenzregel mehrfach anwenden.',
                    s: '$f\'=4x^3$, $f\'\'=12x^2$, $f\'\'\'=24x$.<br>$$\\boxed{f\'\'\'(x)=24x}$$ <em>Quelle:</em> Heuser, Analysis 1, 17. Aufl. (2009), §46.'
                },
                {
                    q: 'Löse die quadratische Gleichung $x^2-5x+6=0$.',
                    h: 'Mitternachts-/pq-Formel oder Faktorisierung ($x^2-5x+6=(x-2)(x-3)$).',
                    s: 'Faktorisierung: $(x-2)(x-3)=0\\Rightarrow x_1=2,\\ x_2=3$.<br>Kontrolle (Vieta): $x_1+x_2=5$, $x_1 x_2=6$.<br>$$\\boxed{x_1=2,\\ x_2=3}$$ <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 1, 16. Aufl. (2022), §III.3.'
                },
                {
                    q: 'Entwickle $(2x+1)^3$ mit dem binomischen Lehrsatz / Pascalschem Dreieck.',
                    h: 'Koeffizienten der 3. Zeile: $1,3,3,1$. $(a+b)^3=a^3+3a^2 b+3ab^2+b^3$.',
                    s: 'Mit $a=2x$, $b=1$:<br>$(2x)^3+3(2x)^2\\cdot 1+3(2x)\\cdot 1^2+1^3=8x^3+12x^2+6x+1$.<br>$$\\boxed{8x^3+12x^2+6x+1}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §1.2.5.'
                },
                {
                    q: 'Bestimme alle Lösungen von $\\sin x=\\tfrac12$ im Intervall $[0,2\\pi)$.',
                    h: 'Hauptwert $\\arcsin(1/2)=\\pi/6$; zweite Lösung aus der Symmetrie $\\sin(\\pi-x)=\\sin x$.',
                    s: '$x_1=\\tfrac{\\pi}{6}$ und $x_2=\\pi-\\tfrac{\\pi}{6}=\\tfrac{5\\pi}{6}$.<br>$$\\boxed{x\\in\\left\\{\\tfrac{\\pi}{6},\\ \\tfrac{5\\pi}{6}\\right\\}}$$ <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 1, 16. Aufl. (2022), §III.9.'
                },
                {
                    q: 'Ein Dreieck hat Seiten $a=3$, $b=4$ mit eingeschlossenem Winkel $\\gamma=60^\\circ$. Berechne die Seite $c$ mit dem Kosinussatz.',
                    h: '$c^2=a^2+b^2-2ab\\cos\\gamma$.',
                    s: '$c^2=9+16-2\\cdot 3\\cdot 4\\cos 60^\\circ=25-24\\cdot\\tfrac12=25-12=13$.<br>$c=\\sqrt{13}\\approx 3{,}61$.<br>$$\\boxed{c=\\sqrt{13}\\approx 3{,}61}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §2.6.3.'
                },
                {
                    q: 'Löse das lineare Gleichungssystem $x+y=10$, $x-y=4$ durch Addition/Subtraktion.',
                    h: 'Addiere beide Gleichungen, um $y$ zu eliminieren.',
                    s: 'Addition: $2x=14\\Rightarrow x=7$. Einsetzen: $7+y=10\\Rightarrow y=3$.<br>$$\\boxed{x=7,\\ y=3}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §4.4.1.'
                },
                {
                    q: 'Leite $f(x)=x\\ln x$ ab (Produktregel).',
                    h: 'Produktregel $(uv)\' = u\'v + uv\'$ mit $u=x$, $v=\\ln x$.',
                    s: '$u\' = 1$, $v\' = 1/x$. $f\'(x)=1\\cdot\\ln x+x\\cdot\\tfrac1x=\\ln x+1$.<br>$$\\boxed{f\'(x)=\\ln x+1}$$ <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §15.'
                }
            ],
            // ----------------- LEVEL 2 -----------------
            [
                {
                    q: 'Löse die lineare DGL 1. Ordnung: $y\'(t)+2y(t)=4$, mit $y(0)=1$.',
                    h: 'Ansatz $y=y_h+y_p$. $y_h=K e^{-2t}$, $y_p=$ Konstante.',
                    s: 'Homogen: $\\lambda+2=0\\Rightarrow y_h=Ke^{-2t}$.<br>Partikulär (konst. Störfunktion): $y_p=C$, einsetzen: $0+2C=4\\Rightarrow C=2$.<br>Gesamt: $y(t)=Ke^{-2t}+2$.<br>Anfangswert: $y(0)=K+2=1\\Rightarrow K=-1$.<br>$$\\boxed{y(t)=2-e^{-2t}}$$'
                },
                {
                    q: 'Berechne mittels partieller Integration: $\\int x\\,e^{-x}\\,dx$.',
                    h: '$\\int u\\,v\'dx = uv - \\int u\'v\\,dx$. Wähle $u=x$, $v\'=e^{-x}$.',
                    s: '$u=x\\Rightarrow u\'=1$. $v\'=e^{-x}\\Rightarrow v=-e^{-x}$.<br>$\\int x e^{-x}dx = -xe^{-x} - \\int(-e^{-x})dx = -xe^{-x} - e^{-x} + C$.<br>$$\\boxed{=-(x+1)e^{-x}+C}$$<br>Kontrolle durch Ableiten: $\\tfrac{d}{dx}[-(x+1)e^{-x}]=-e^{-x}+(x+1)e^{-x}=xe^{-x}$.'
                },
                {
                    q: 'Bestimme die Laplace-Transformierte von $f(t)=e^{-3t}\\sin(2t)\\,\\sigma(t)$.',
                    h: '$\\mathcal{L}\\{\\sin\\omega t\\}=\\omega/(s^2+\\omega^2)$. Dämpfungssatz: $f(t)e^{-at}\\rightarrow F(s+a)$.',
                    s: '$\\mathcal{L}\\{\\sin 2t\\}=2/(s^2+4)$. Dämpfung mit $a=3$: $s\\to s+3$.<br>$F(s)=\\dfrac{2}{(s+3)^2+4}=\\dfrac{2}{s^2+6s+13}$.<br>$$\\boxed{F(s)=\\dfrac{2}{s^2+6s+13}}$$'
                },
                {
                    q: 'Bestimme alle Eigenwerte von $A=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$.',
                    h: 'Charakteristisches Polynom: $\\det(A-\\lambda I)=0$.',
                    s: '$\\det\\!\\begin{pmatrix}4-\\lambda & 1\\\\ 2 & 3-\\lambda\\end{pmatrix}=(4-\\lambda)(3-\\lambda)-2 = \\lambda^2-7\\lambda+12-2 = \\lambda^2-7\\lambda+10 = 0$.<br>Mitternachtsformel: $\\lambda=(7\\pm\\sqrt{49-40})/2=(7\\pm 3)/2$.<br>$$\\boxed{\\lambda_1=5,\\ \\lambda_2=2}$$'
                },
                {
                    q: 'Berechne die Taylorreihe von $f(x)=\\ln(1+x)$ um $x_0=0$ bis zur 3. Ordnung.',
                    h: 'Allgemein: $T(x)=\\sum f^{(k)}(0)/k!\\cdot x^k$.',
                    s: '$f(0)=0$. $f\'=1/(1+x)\\Rightarrow f\'(0)=1$.<br>$f\'\'=-1/(1+x)^2\\Rightarrow f\'\'(0)=-1$.<br>$f\'\'\'=2/(1+x)^3\\Rightarrow f\'\'\'(0)=2$.<br>$T(x)=0 + 1\\cdot x + \\tfrac{-1}{2}x^2 + \\tfrac{2}{6}x^3 = x-\\tfrac{x^2}{2}+\\tfrac{x^3}{3}$.<br>$$\\boxed{\\ln(1+x)\\approx x-\\tfrac{x^2}{2}+\\tfrac{x^3}{3}}$$ (gültig für $|x|<1$).'
                },
                {
                    q: 'Berechne den Gradienten und Divergenz von $\\vec F(x,y,z)=(xy,\\,y^2,\\,xz)$ und $f(x,y,z)=x^2 y + z$.',
                    h: '$\\nabla f=(\\partial_x f,\\partial_y f,\\partial_z f)$. $\\operatorname{div}\\vec F=\\partial_x F_x+\\partial_y F_y+\\partial_z F_z$.',
                    s: 'Gradient: $\\nabla f=(2xy,\\,x^2,\\,1)$.<br>Divergenz: $\\operatorname{div}\\vec F = y + 2y + x = x+3y$.<br>$$\\boxed{\\nabla f=(2xy, x^2, 1),\\quad \\operatorname{div}\\vec F=x+3y}$$'                },
                {
                    q: 'Berechne das Doppelintegral $\\iint_{\\mathbb{R}^2} e^{-(x^2+y^2)}\\,dA$ via Polarkoordinaten.',
                    h: '$dA=r\\,dr\\,d\\varphi$, $x^2+y^2=r^2$.',
                    s: '$\\int_0^{2\\pi}\\!\\int_0^\\infty e^{-r^2} r\\,dr\\,d\\varphi$.<br>Inneres Integral: Substitution $u=r^2$, $du=2r\\,dr\\Rightarrow \\tfrac12\\!\\int_0^\\infty e^{-u}du=\\tfrac12$.<br>Äußeres: $2\\pi\\cdot\\tfrac12=\\pi$.<br>$$\\boxed{=\\pi}$$<br>Folgerung: $\\int_{-\\infty}^\\infty e^{-x^2}dx=\\sqrt\\pi$ (Gauss-Integral).'
                },
                {
                    q: 'Untersuche die Reihe $\\sum_{n=1}^\\infty \\dfrac{n!}{n^n}$ auf Konvergenz mit dem Quotientenkriterium.',
                    h: '$L=\\lim_{n\\to\\infty}|a_{n+1}/a_n|$. Konvergent für $L<1$.',
                    s: '$\\dfrac{a_{n+1}}{a_n}=\\dfrac{(n+1)!}{(n+1)^{n+1}}\\cdot\\dfrac{n^n}{n!}=\\dfrac{n^n}{(n+1)^n}=\\!\\left(\\dfrac{n}{n+1}\\right)^{\\!n}$.<br>$\\lim_{n\\to\\infty}\\!\\left(1-\\tfrac{1}{n+1}\\right)^{\\!n}=1/e\\approx 0{,}368<1$.<br>$$\\boxed{\\text{konvergent}}$$'
                },
                {
                    q: 'Bestimme die Hesse-Matrix von $f(x,y)=x^3+xy^2-3x$ und klassifiziere den kritischen Punkt $(1,0)$.',
                    h: '$\\nabla f=0$ liefert kritische Punkte. Hesse $H$, Definitheit über Eigenwerte/Determinante.',
                    s: '$\\nabla f=(3x^2+y^2-3,\ 2xy)$. Bei $(1,0)$: $(0,0)$.<br>$H=\\begin{pmatrix}6x & 2y\\ 2y & 2x\\end{pmatrix}$. Bei $(1,0)$: $\\begin{pmatrix}6&0\\0&2\\end{pmatrix}$.<br>EW: $6,2 > 0$ $\\Rightarrow$ positiv definit $\\Rightarrow$ <strong>lokales Minimum</strong>.<br>$$\\boxed{(1,0)\ \\text{lokales Minimum}}$$'
                },
                {
                    q: 'Berechne $\\int_0^\\infty x\\,e^{-x^2}\\,dx$.',
                    h: 'Substitution $u=x^2$.',
                    s: '$u=x^2\\Rightarrow du=2x\\,dx$. $\\int_0^\\infty x e^{-x^2}dx=\\tfrac12\\!\\int_0^\\infty e^{-u}du=\\tfrac12[-e^{-u}]_0^\\infty=\\tfrac12$.<br>$$\\boxed{=\\tfrac12}$$'                },
                {
                    q: 'Partialbruchzerlegung mit komplexen Polen: $\\dfrac{1}{s^2+2s+2}$ ueber reelle Form.',
                    h: 'Quadratische Ergaenzung: $s^2+2s+2 = (s+1)^2+1$. Korrespondenz $\\mathcal{L}\\{e^{-t}\\sin t\\} = \\dfrac{1}{(s+1)^2+1}$.',
                    s: 'Quadratische Ergaenzung liefert direkt die Form $\\dfrac{1}{(s+1)^2+1}$. Mit Daempfungssatz $\\mathcal{L}\\{e^{-at}f(t)\\} = F(s+a)$ und $\\mathcal{L}\\{\\sin t\\} = 1/(s^2+1)$ folgt:<br>$$\\boxed{\\mathcal{L}^{-1}\\!\\left\\{\\tfrac{1}{s^2+2s+2}\\right\\} = e^{-t}\\sin t\\cdot\\sigma(t)}$$ Anwendung: Sprungantwort schwach gedaempfter Oszillator. <em>Quelle:</em> Papula, Mathematik fuer Ingenieure und Naturwissenschaftler Bd. 2, 16. Aufl. (2024), §VI.3.'
                },
                {
                    q: 'Berechne die Faltung $f*g$ fuer $f(t)=g(t)=\\sigma(t)$ (Einheitssprung) auf $[0,t]$.',
                    h: '$(f*g)(t) = \\int_0^t f(\\tau)g(t-\\tau)\\,d\\tau$.',
                    s: '$\\sigma(\\tau)\\sigma(t-\\tau)=1$ fuer $0\\le\\tau\\le t$ und $t\\ge 0$. Damit $(f*g)(t) = \\int_0^t 1\\,d\\tau = t$.<br>$$\\boxed{(\\sigma*\\sigma)(t) = t\\cdot\\sigma(t)}$$ Kontrolle ueber Laplace: $\\mathcal{L}\\{\\sigma\\}=1/s$, $\\mathcal{L}\\{\\sigma*\\sigma\\}=1/s^2 \\leftrightarrow t\\cdot\\sigma(t)$. <em>Quelle:</em> Foellinger, Laplace-, Fourier- und z-Transformation, 11. Aufl. (2021), §3.5.'
                },
                {
                    q: 'Komplexe Fourier-Reihe: zeige $f(t) = e^{j\\omega_0 t}$ ist seine eigene Fourier-Reihe (Eigenfunktion).',
                    h: 'Komplexe Form $f(t) = \\sum_{n=-\\infty}^\\infty c_n e^{jn\\omega_0 t}$ mit $c_n = \\tfrac{1}{T}\\!\\int_0^T f(t) e^{-jn\\omega_0 t}\\,dt$.',
                    s: 'Mit $f(t) = e^{j\\omega_0 t}$ und $T=2\\pi/\\omega_0$: $c_n = \\tfrac{1}{T}\\int_0^T e^{j(1-n)\\omega_0 t}dt$.<br>Fuer $n=1$: $c_1 = 1$. Fuer $n\\neq 1$: Integrand ist nichttriviale komplexe Exponentialfunktion mit Periode $T$, also Integral $= 0$.<br>$$\\boxed{c_n = \\delta_{n,1},\\ f(t) = e^{j\\omega_0 t}}$$ Interpretation: Komplexe Exponentialfunktionen bilden Eigenbasis linearer zeitinvarianter Systeme. <em>Quelle:</em> Oppenheim/Willsky, Signals and Systems, 2nd ed. (1996), §3.3.'
                },
                {
                    q: 'Inverse Laplace mit zeitlich verschobenem Sprung: $F(s) = \\dfrac{e^{-2s}}{s+1}$.',
                    h: 'Verschiebungssatz: $\\mathcal{L}\\{f(t-a)\\sigma(t-a)\\} = e^{-as}F(s)$.',
                    s: '$\\mathcal{L}^{-1}\\{1/(s+1)\\} = e^{-t}\\sigma(t)$. Verschiebung um $a=2$:<br>$$\\boxed{f(t) = e^{-(t-2)}\\sigma(t-2)}$$ Das Signal ist null fuer $t<2$ und startet bei $t=2$ mit einem PT1-Abklingen. <em>Quelle:</em> Lutz/Wendt, Taschenbuch der Regelungstechnik, 12. Aufl. (2021), §3.3.2.'
                },
                {
                    q: 'Lagrange-Multiplikator: extreme $f(x,y) = x^2+y^2$ unter $x+y=1$.',
                    h: 'Lagrange-Funktion $L = f - \\lambda g$ mit $g(x,y)=x+y-1=0$. Stationaere Punkte aus $\\nabla L = 0$.',
                    s: '$L = x^2+y^2 - \\lambda(x+y-1)$. $\\partial_x L = 2x-\\lambda = 0$, $\\partial_y L = 2y-\\lambda = 0$ liefert $x = y$. Aus $x+y=1$: $x = y = 1/2$.<br>$f(1/2,1/2) = 1/2$.<br>$$\\boxed{\\min f = 1/2 \\text{ bei } (1/2,\\,1/2)}$$ Geometrisch: kleinstes Quadrat des Abstands vom Ursprung zur Geraden $x+y=1$. <em>Quelle:</em> Heuser, Lehrbuch der Analysis Teil 2, 14. Aufl. (2008), §172.'
                },
                {
                    q: 'DGL via Trennung der Variablen: $y\' = x y^2$, $y(0) = 1$.',
                    h: 'Form $\\dfrac{dy}{y^2} = x\\,dx$.',
                    s: '$\\int y^{-2}\\,dy = \\int x\\,dx\\Rightarrow -1/y = x^2/2 + C$.<br>Anfangswert $y(0)=1\\Rightarrow -1 = C$.<br>$-1/y = x^2/2 - 1\\Rightarrow y = \\dfrac{1}{1 - x^2/2} = \\dfrac{2}{2-x^2}$.<br>$$\\boxed{y(x) = \\dfrac{2}{2-x^2}}$$ Loesung existiert fuer $|x|<\\sqrt 2$ (Pol bei $x=\\pm\\sqrt 2$). <em>Quelle:</em> Walter, Gewoehnliche Differentialgleichungen, 7. Aufl. (2000), §1.'
                },
                {
                    q: 'Wronski-Determinante: zeige, dass $y_1 = e^x$, $y_2 = e^{2x}$ linear unabhaengige Loesungen einer linearen DGL 2. Ordnung bilden.',
                    h: '$W(y_1,y_2)(x) = \\det\\!\\begin{pmatrix}y_1 & y_2\\\\ y_1\' & y_2\'\\end{pmatrix}$. $W\\neq 0\\Rightarrow$ linear unabhaengig.',
                    s: '$y_1\' = e^x$, $y_2\' = 2e^{2x}$.<br>$W = \\det\\!\\begin{pmatrix}e^x & e^{2x}\\\\ e^x & 2e^{2x}\\end{pmatrix} = 2e^{3x} - e^{3x} = e^{3x}$.<br>$$\\boxed{W(x) = e^{3x} \\neq 0\\ \\forall x}$$ Damit $y_1, y_2$ Fundamentalsystem; die DGL ist $y\'\' - 3y\' + 2y = 0$. <em>Quelle:</em> Forster, Analysis 2, 11. Aufl. (2017), §13.'
                },
                {
                    q: 'Picard-Lindeloef: gib eine hinreichende Bedingung fuer die eindeutige Loesbarkeit von $y\' = f(x,y)$, $y(x_0) = y_0$ an und pruefe sie fuer $f(x,y) = y^{1/3}$.',
                    h: 'Hinreichend: $f$ stetig + Lipschitz-stetig in $y$. Letzteres ist fuer $y^{1/3}$ in der Naehe von $y=0$ verletzt.',
                    s: 'Satz von Picard-Lindeloef: ist $f$ in einem Rechteck um $(x_0,y_0)$ stetig und Lipschitz-stetig in $y$, so existiert eine eindeutige lokale Loesung.<br>$f(x,y) = y^{1/3}$ ist stetig, aber $\\partial_y f = \\tfrac13 y^{-2/3}\\to\\infty$ bei $y\\to 0$. Damit ist $f$ nicht Lipschitz in $y=0$.<br>Konsequenz: $y\' = y^{1/3}$ mit $y(0)=0$ hat mehrere Loesungen, z.B. $y\\equiv 0$ und $y(x) = (\\tfrac{2x}{3})^{3/2}$.<br>$$\\boxed{\\text{Lipschitz-Bedingung verletzt} \\Rightarrow \\text{Eindeutigkeit verloren}}$$ <em>Quelle:</em> Walter, Gewoehnliche Differentialgleichungen, 7. Aufl. (2000), §6.'
                },
                {
                    q: 'Bestimme Rang, Kern und Bild von $A = \\begin{pmatrix}1 & 2 & 3\\\\ 2 & 4 & 6\\end{pmatrix}$.',
                    h: 'Zeilenstufenform liefert Rang. Kern: $A\\vec x = 0$. Bild: Spaltenraum.',
                    s: 'Zeilen sind linear abhaengig ($R_2 = 2 R_1$). Rang $= 1$.<br>Kern: $x_1 + 2x_2 + 3x_3 = 0$, also $\\ker A = \\operatorname{span}\\{(-2,1,0)^T,(-3,0,1)^T\\}$, $\\dim\\ker = 2$.<br>Bild: $\\operatorname{im} A = \\operatorname{span}\\{(1,2)^T\\}$, $\\dim\\operatorname{im} = 1$.<br>$$\\boxed{\\operatorname{rg} A = 1,\\ \\dim\\ker = 2,\\ \\dim\\operatorname{im} = 1}$$ Dimensionsformel: $\\dim\\ker + \\operatorname{rg} = 3 = \\dim\\mathbb{R}^3$. <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §2.6.'
                },
                {
                    q: 'Wende das Gram-Schmidt-Verfahren auf $\\vec v_1 = (1,1,0)$, $\\vec v_2 = (1,0,1)$ an.',
                    h: '$\\vec u_1 = \\vec v_1$. $\\vec u_2 = \\vec v_2 - \\dfrac{\\langle\\vec v_2,\\vec u_1\\rangle}{\\langle\\vec u_1,\\vec u_1\\rangle}\\vec u_1$. Normieren.',
                    s: '$\\vec u_1 = (1,1,0)$, $|\\vec u_1|^2 = 2$.<br>$\\langle\\vec v_2,\\vec u_1\\rangle = 1$. Projektion: $\\tfrac12(1,1,0) = (\\tfrac12,\\tfrac12,0)$.<br>$\\vec u_2 = (1,0,1) - (\\tfrac12,\\tfrac12,0) = (\\tfrac12,-\\tfrac12,1)$. $|\\vec u_2|^2 = \\tfrac14+\\tfrac14+1 = \\tfrac32$.<br>Normierung: $\\vec e_1 = \\tfrac{1}{\\sqrt 2}(1,1,0)$, $\\vec e_2 = \\sqrt{\\tfrac23}(\\tfrac12,-\\tfrac12,1) = \\tfrac{1}{\\sqrt 6}(1,-1,2)$.<br>$$\\boxed{\\vec e_1 = \\tfrac{1}{\\sqrt 2}(1,1,0),\\ \\vec e_2 = \\tfrac{1}{\\sqrt 6}(1,-1,2)}$$ Kontrolle: $\\langle\\vec e_1,\\vec e_2\\rangle = 0$. <em>Quelle:</em> Strang, Linear Algebra and Its Applications, 4th ed. (2006), §3.4.'
                },
                {
                    q: 'Berechne das Matrix-Exponential $e^{At}$ fuer $A = \\operatorname{diag}(-1,2)$.',
                    h: 'Fuer diagonale $A$: $e^{At} = \\operatorname{diag}(e^{\\lambda_i t})$.',
                    s: '$e^{At} = \\begin{pmatrix}e^{-t} & 0\\\\ 0 & e^{2t}\\end{pmatrix}$.<br>$$\\boxed{e^{At} = \\operatorname{diag}(e^{-t},\\,e^{2t})}$$ Anwendung: Loesung von $\\dot{\\vec x} = A\\vec x$ ist $\\vec x(t) = e^{At}\\vec x(0)$. Bei nicht-diagonalisierbaren Matrizen benoetigt man die Jordan-Normalform (siehe Expertise-Stufe). <em>Quelle:</em> Hirsch/Smale/Devaney, Differential Equations, Dynamical Systems, and an Introduction to Chaos, 3rd ed. (2013), §3.'
                },
                {
                    q: 'Variation der Konstanten: loese $y\' + 2y = e^{-2t}$, $y(0) = 0$.',
                    h: 'Homogen $y_h = K e^{-2t}$. Ansatz $y_p = K(t)e^{-2t}$, einsetzen.',
                    s: 'Homogen: $y_h = K e^{-2t}$.<br>Ansatz $y_p = K(t)e^{-2t}$, $y_p\' = K\'e^{-2t} - 2K e^{-2t}$. Einsetzen: $K\'e^{-2t} - 2K e^{-2t} + 2K e^{-2t} = e^{-2t}\\Rightarrow K\' = 1\\Rightarrow K = t$.<br>$y_p = t e^{-2t}$. Allgemein $y = (t+K_0)e^{-2t}$. Anfangswert $y(0)=K_0=0$.<br>$$\\boxed{y(t) = t\\,e^{-2t}}$$ Bemerkung: Resonanz, da Anregung mit der Eigenfrequenz des homogenen Systems uebereinstimmt. <em>Quelle:</em> Heuser, Lehrbuch der Analysis Teil 2, 14. Aufl. (2008), §139.'
                },
                {
                    q: 'Bestimme Stationaerpunkte und Sattel von $f(x,y) = x^3 - 3xy + y^3$.',
                    h: '$\\nabla f = 0$ liefert stationaere Punkte. Hesse-Determinante entscheidet Typ.',
                    s: '$\\nabla f = (3x^2-3y,\\,3y^2-3x) = 0\\Rightarrow y = x^2,\\,x = y^2$. Einsetzen: $x = x^4\\Rightarrow x(x^3-1) = 0$, also $x \\in\\{0,1\\}$ und $y = x^2$.<br>Stationaer: $(0,0)$ und $(1,1)$.<br>$H = \\begin{pmatrix}6x & -3\\\\ -3 & 6y\\end{pmatrix}$. $\\det H = 36xy - 9$.<br>$(0,0)$: $\\det H = -9 < 0\\Rightarrow$ Sattelpunkt.<br>$(1,1)$: $\\det H = 27 > 0$ und $H_{11} = 6 > 0\\Rightarrow$ lokales Minimum.<br>$$\\boxed{(0,0)\\text{ Sattel},\\ (1,1)\\text{ Min}}$$ <em>Quelle:</em> Forster, Analysis 2, 11. Aufl. (2017), §7.'
                },
                {
                    q: 'Löse die Bernoulli-DGL $y\'+y=y^2$ über die Substitution $z=1/y$.',
                    h: 'Mit $z=y^{-1}$ wird $z\'=-y^{-2}y\'$. Die DGL wird linear in $z$.',
                    s: 'Division durch $y^2$: $y^{-2}y\'+y^{-1}=1$. Mit $z=y^{-1}$, $z\'=-y^{-2}y\'$ folgt $-z\'+z=1$, also $z\'-z=-1$.<br>Homogen $z_h=Ce^{t}$, partikulär $z_p=1$. $z=Ce^{t}+1$.<br>Rücktransformation: $y=\\dfrac{1}{1+Ce^{t}}$.<br>$$\\boxed{y(t)=\\dfrac{1}{1+Ce^{t}}}$$ <em>Quelle:</em> Walter, Gewoehnliche Differentialgleichungen, 7. Aufl. (2000), §2 (Bernoulli).'
                },
                {
                    q: 'Löse $y\'+\\tfrac{1}{x}y=x$ mit dem integrierenden Faktor.',
                    h: 'Integrierender Faktor $\\mu=e^{\\int a\\,dx}=e^{\\int 1/x\\,dx}=x$.',
                    s: '$\\mu=x$. Multiplikation: $xy\'+y=x^2$, also $(xy)\'=x^2$.<br>$xy=\\tfrac{x^3}{3}+C\\Rightarrow y=\\tfrac{x^2}{3}+\\tfrac{C}{x}$.<br>$$\\boxed{y(x)=\\tfrac{x^2}{3}+\\tfrac{C}{x}}$$ <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 2, 16. Aufl. (2024), §V.2.'
                },
                {
                    q: 'Löse die homogene DGL 2. Ordnung $y\'\'-3y\'+2y=0$.',
                    h: 'Charakteristisches Polynom $\\lambda^2-3\\lambda+2=0$, reelle verschiedene Wurzeln.',
                    s: '$\\lambda^2-3\\lambda+2=(\\lambda-1)(\\lambda-2)=0\\Rightarrow\\lambda_1=1,\\lambda_2=2$.<br>$$\\boxed{y(t)=C_1 e^{t}+C_2 e^{2t}}$$ <em>Quelle:</em> Forster, Analysis 2, 11. Aufl. (2017), §13.'
                },
                {
                    q: 'Löse $y\'\'-4y\'+4y=0$ (doppelte Nullstelle).',
                    h: 'Bei doppelter Wurzel $\\lambda$ lautet die zweite Basislösung $t\\,e^{\\lambda t}$.',
                    s: '$\\lambda^2-4\\lambda+4=(\\lambda-2)^2=0\\Rightarrow\\lambda=2$ (doppelt).<br>$$\\boxed{y(t)=(C_1+C_2 t)e^{2t}}$$ Der Faktor $t$ sichert lineare Unabhaengigkeit. <em>Quelle:</em> Walter, Gewoehnliche Differentialgleichungen, 7. Aufl. (2000), §3.'
                },
                {
                    q: 'Bestimme die (komplexen) Eigenwerte von $A=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$.',
                    h: '$\\det(A-\\lambda I)=0$ liefert $\\lambda^2+1=0$.',
                    s: '$\\det\\!\\begin{pmatrix}-\\lambda&-1\\\\1&-\\lambda\\end{pmatrix}=\\lambda^2+1=0\\Rightarrow\\lambda=\\pm j$.<br>$$\\boxed{\\lambda_{1,2}=\\pm j}$$ Interpretation: $A$ ist die $90^\\circ$-Drehmatrix, daher rein imaginäre Eigenwerte. <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §4.3.'
                },
                {
                    q: 'Bestimme $\\mathcal{L}\\{t\\}$ und $\\mathcal{L}\\{t^2\\}$.',
                    h: 'Allgemein $\\mathcal{L}\\{t^n\\}=\\dfrac{n!}{s^{n+1}}$.',
                    s: '$\\mathcal{L}\\{t\\}=\\dfrac{1!}{s^2}=\\dfrac{1}{s^2}$, $\\mathcal{L}\\{t^2\\}=\\dfrac{2!}{s^3}=\\dfrac{2}{s^3}$.<br>$$\\boxed{\\mathcal{L}\\{t\\}=\\tfrac{1}{s^2},\\ \\mathcal{L}\\{t^2\\}=\\tfrac{2}{s^3}}$$ <em>Quelle:</em> Foellinger, Laplace-, Fourier- und z-Transformation, 11. Aufl. (2021), §2.3.'
                },
                {
                    q: 'Wende den Endwertsatz an: bestimme $\\lim_{t\\to\\infty}f(t)$ für $F(s)=\\dfrac{3}{s(s+2)}$.',
                    h: 'Endwertsatz: $\\lim_{t\\to\\infty}f(t)=\\lim_{s\\to 0}sF(s)$ (sofern Pole in der linken Halbebene/Ursprung einfach).',
                    s: '$sF(s)=\\dfrac{3}{s+2}\\xrightarrow{s\\to 0}\\dfrac{3}{2}$.<br>$$\\boxed{\\lim_{t\\to\\infty}f(t)=\\tfrac{3}{2}}$$ Voraussetzung erfüllt: der einzige weitere Pol $s=-2$ liegt links. <em>Quelle:</em> Lutz/Wendt, Taschenbuch der Regelungstechnik, 12. Aufl. (2021), §3.3.4.'
                },
                {
                    q: 'Berechne $\\det\\!\\begin{pmatrix}2&0&1\\\\1&3&2\\\\0&1&1\\end{pmatrix}$ durch Entwicklung nach der 1. Spalte (Laplace-Entwicklung).',
                    h: 'Entwicklung: $\\det=\\sum_i (-1)^{i+1}a_{i1}M_{i1}$ mit Minoren $M_{i1}$.',
                    s: 'Nur $a_{11}=2$ und $a_{21}=1$ sind ungleich 0.<br>$\\det=2\\cdot\\det\\!\\begin{pmatrix}3&2\\\\1&1\\end{pmatrix}-1\\cdot\\det\\!\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix}$.<br>$=2(3-2)-1(0-1)=2\\cdot 1-(-1)=3$.<br>$$\\boxed{\\det=3}$$ <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §3.2 (Laplacescher Entwicklungssatz).'
                },
                {
                    q: 'Bestimme die LU-Zerlegung von $A=\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}$ (ohne Pivotierung).',
                    h: 'Eliminiere $a_{21}$: $\\ell_{21}=a_{21}/a_{11}$. $L$ enthält die Faktoren, $U$ die obere Dreiecksmatrix.',
                    s: '$\\ell_{21}=4/2=2$. $R_2\\leftarrow R_2-2R_1$: $(0,\\,3-2\\cdot 1)=(0,1)$.<br>$U=\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}$, $L=\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}$.<br>$$\\boxed{A=LU,\\ L=\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix},\\ U=\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}}$$ <em>Quelle:</em> Stoer/Bulirsch, Numerische Mathematik 1, 10. Aufl. (2007), §4.1.'
                },
                {
                    q: 'Zeige, dass $Q=\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$ orthogonal ist ($Q^T Q=I$).',
                    h: 'Berechne $Q^T Q$ und nutze $\\sin^2+\\cos^2=1$.',
                    s: '$Q^T Q=\\begin{pmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{pmatrix}\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}=\\begin{pmatrix}\\cos^2+\\sin^2&0\\\\0&\\sin^2+\\cos^2\\end{pmatrix}=I$.<br>$$\\boxed{Q^T Q=I,\\ \\det Q=1}$$ $Q$ ist eine Drehung; orthogonale Matrizen erhalten Längen und Winkel. <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §6.2.'
                },
                {
                    q: 'Berechne die Richtungsableitung von $f(x,y)=x^2+y^2$ im Punkt $(1,1)$ in Richtung $\\vec u=\\tfrac{1}{\\sqrt2}(1,1)$.',
                    h: '$D_{\\vec u}f=\\nabla f\\cdot\\vec u$ (mit normiertem $\\vec u$).',
                    s: '$\\nabla f=(2x,2y)\\big|_{(1,1)}=(2,2)$.<br>$D_{\\vec u}f=(2,2)\\cdot\\tfrac{1}{\\sqrt2}(1,1)=\\tfrac{1}{\\sqrt2}(2+2)=\\tfrac{4}{\\sqrt2}=2\\sqrt2$.<br>$$\\boxed{D_{\\vec u}f=2\\sqrt2\\approx 2{,}83}$$ <em>Quelle:</em> Forster, Analysis 2, 11. Aufl. (2017), §6.'
                },
                {
                    q: 'Bestimme das Taylorpolynom 3. Grades von $e^x$ um $x_0=0$.',
                    h: '$e^x=\\sum x^k/k!$.',
                    s: '$T_3(x)=1+x+\\tfrac{x^2}{2}+\\tfrac{x^3}{6}$.<br>$$\\boxed{e^x\\approx 1+x+\\tfrac{x^2}{2}+\\tfrac{x^3}{6}}$$ Restglied $R_3=\\tfrac{e^\\xi}{24}x^4$. <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §22.'
                },
                {
                    q: 'Gib die Maclaurin-Reihe von $\\sin x$ bis zur 5. Ordnung an.',
                    h: 'Nur ungerade Potenzen, alternierend.',
                    s: '$\\sin x=x-\\tfrac{x^3}{6}+\\tfrac{x^5}{120}-\\dots$.<br>$$\\boxed{\\sin x\\approx x-\\tfrac{x^3}{3!}+\\tfrac{x^5}{5!}}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §7.3.1.'
                },
                {
                    q: 'Gib die Maclaurin-Reihe von $\\cos x$ bis zur 4. Ordnung an.',
                    h: 'Nur gerade Potenzen, alternierend, beginnt mit 1.',
                    s: '$\\cos x=1-\\tfrac{x^2}{2}+\\tfrac{x^4}{24}-\\dots$.<br>$$\\boxed{\\cos x\\approx 1-\\tfrac{x^2}{2!}+\\tfrac{x^4}{4!}}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §7.3.1.'
                },
                {
                    q: 'Untersuche die alternierende Reihe $\\sum_{n=1}^\\infty\\dfrac{(-1)^{n+1}}{n}$ mit dem Leibniz-Kriterium.',
                    h: 'Leibniz: alterniert, $a_n=1/n$ monoton fallend gegen 0 $\\Rightarrow$ konvergent.',
                    s: '$a_n=\\tfrac1n>0$, monoton fallend, $a_n\\to 0$. Damit konvergiert die Reihe (bedingt).<br>Der Grenzwert ist $\\ln 2$.<br>$$\\boxed{\\sum_{n=1}^\\infty\\tfrac{(-1)^{n+1}}{n}=\\ln 2\\approx 0{,}693}$$ Hinweis: nicht absolut konvergent (harmonische Reihe divergiert). <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §7 (Leibniz-Kriterium).'
                },
                {
                    q: 'Berechne $\\int\\dfrac{1}{\\sqrt{1-x^2}}\\,dx$ (trigonometrische Substitution).',
                    h: 'Substitution $x=\\sin t$, $dx=\\cos t\\,dt$, $\\sqrt{1-\\sin^2 t}=\\cos t$.',
                    s: '$\\int\\dfrac{\\cos t}{\\cos t}\\,dt=\\int dt=t+C=\\arcsin x+C$.<br>$$\\boxed{\\int\\tfrac{1}{\\sqrt{1-x^2}}dx=\\arcsin x+C}$$ <em>Quelle:</em> Heuser, Analysis 1, 17. Aufl. (2009), §80.'
                },
                {
                    q: 'Berechne $\\int\\dfrac{1}{x^2-1}\\,dx$ über Partialbrüche.',
                    h: '$\\dfrac{1}{x^2-1}=\\dfrac{1}{(x-1)(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+1}$.',
                    s: '$A=\\tfrac12$, $B=-\\tfrac12$ (Einsetzen $x=1$ bzw. $x=-1$).<br>$\\int=\\tfrac12\\ln|x-1|-\\tfrac12\\ln|x+1|+C=\\tfrac12\\ln\\left|\\dfrac{x-1}{x+1}\\right|+C$.<br>$$\\boxed{\\tfrac12\\ln\\left|\\tfrac{x-1}{x+1}\\right|+C}$$ <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 1, 16. Aufl. (2022), §V.8.'
                },
                {
                    q: 'Berechne die Bogenlänge der Kurve $y=\\tfrac23 x^{3/2}$ über $[0,3]$.',
                    h: '$L=\\int_a^b\\sqrt{1+(y\')^2}\\,dx$. Hier $y\'=x^{1/2}$.',
                    s: '$y\'=\\sqrt x$, $(y\')^2=x$. $L=\\int_0^3\\sqrt{1+x}\\,dx=\\left[\\tfrac23(1+x)^{3/2}\\right]_0^3=\\tfrac23(4^{3/2}-1)=\\tfrac23(8-1)=\\tfrac{14}{3}$.<br>$$\\boxed{L=\\tfrac{14}{3}\\approx 4{,}67}$$ <em>Quelle:</em> Forster, Analysis 2, 11. Aufl. (2017), §5.'
                },
                {
                    q: 'Berechne die Rotation $\\nabla\\times\\vec F$ für $\\vec F=(-y,\\,x,\\,0)$.',
                    h: '$\\nabla\\times\\vec F=(\\partial_y F_z-\\partial_z F_y,\\ \\partial_z F_x-\\partial_x F_z,\\ \\partial_x F_y-\\partial_y F_x)$.',
                    s: '$\\partial_x F_y-\\partial_y F_x=1-(-1)=2$; die ersten beiden Komponenten sind 0.<br>$$\\boxed{\\nabla\\times\\vec F=(0,0,2)}$$ Das Feld rotiert mit konstanter Wirbeldichte um die $z$-Achse. <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §13.2.3.'
                },
                {
                    q: 'Zeige, dass $\\vec F=(2xy,\\,x^2)$ ein Potential besitzt, und bestimme es.',
                    h: 'Konservativ, falls $\\partial_y F_x=\\partial_x F_y$. Potential $\\Phi$ mit $\\nabla\\Phi=\\vec F$.',
                    s: 'Integrabilitätsbedingung: $\\partial_y(2xy)=2x=\\partial_x(x^2)=2x$. $\\checkmark$<br>$\\Phi=\\int 2xy\\,dx=x^2 y+g(y)$. $\\partial_y\\Phi=x^2+g\'(y)\\stackrel{!}{=}x^2\\Rightarrow g\'=0$.<br>$$\\boxed{\\Phi(x,y)=x^2 y+C}$$ <em>Quelle:</em> Forster, Analysis 2, 11. Aufl. (2017), §8.'
                },
                {
                    q: 'Berechne das Linienintegral $\\int_C\\vec F\\cdot d\\vec r$ für $\\vec F=(2xy,\\,x^2)$ vom Punkt $(0,0)$ nach $(1,2)$.',
                    h: 'Das Feld ist konservativ (siehe Potential $\\Phi=x^2 y$). Dann ist das Integral wegunabhängig: $\\Phi(\\text{Ende})-\\Phi(\\text{Start})$.',
                    s: '$\\Phi(x,y)=x^2 y$. $\\int_C\\vec F\\cdot d\\vec r=\\Phi(1,2)-\\Phi(0,0)=1^2\\cdot 2-0=2$.<br>$$\\boxed{=2}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §13.3.1 (Hauptsatz für Kurvenintegrale).'
                },
                {
                    q: 'Berechne das uneigentliche Integral $\\int_1^\\infty\\dfrac{1}{x^2}\\,dx$.',
                    h: 'Grenzwert $\\lim_{R\\to\\infty}\\int_1^R x^{-2}\\,dx$.',
                    s: '$\\int_1^R x^{-2}dx=[-x^{-1}]_1^R=1-\\tfrac1R\\xrightarrow{R\\to\\infty}1$.<br>$$\\boxed{=1}$$ Konvergent, da Exponent $>1$ (Integralkriterium). <em>Quelle:</em> Forster, Analysis 1, 12. Aufl. (2016), §19.'
                },
                {
                    q: 'Bestimme einen Eigenvektor zum Eigenwert $\\lambda=5$ von $A=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$.',
                    h: 'Löse $(A-5I)\\vec v=0$.',
                    s: '$A-5I=\\begin{pmatrix}-1&1\\\\2&-2\\end{pmatrix}$. Aus $-v_1+v_2=0$ folgt $v_2=v_1$.<br>$$\\boxed{\\vec v=\\begin{pmatrix}1\\\\1\\end{pmatrix}}$$ Probe: $A\\vec v=(5,5)^T=5\\vec v$. <em>Quelle:</em> Fischer, Lineare Algebra, 18. Aufl. (2014), §4.3.'
                }
            ],
            // ----------------- LEVEL 3 -----------------
            [
                {
                    q: 'Löse die DGL 2. Ordnung $y\'\'+4y\'+5y=0$ mit $y(0)=1$, $y\'(0)=0$.',
                    h: 'Charakt. Polynom $\\lambda^2+4\\lambda+5=0$. Komplexe Wurzeln $\\lambda=-\\alpha\\pm j\\omega$ ergeben $y=e^{-\\alpha t}(C_1\\cos\\omega t + C_2\\sin\\omega t)$.',
                    s: '$\\lambda^2+4\\lambda+5=0\\Rightarrow \\lambda=(-4\\pm\\sqrt{16-20})/2=-2\\pm j$.<br>$y(t)=e^{-2t}(C_1\\cos t + C_2\\sin t)$.<br>$y(0)=C_1=1$.<br>$y\'(t)=-2e^{-2t}(C_1\\cos t+C_2\\sin t)+e^{-2t}(-C_1\\sin t+C_2\\cos t)$.<br>$y\'(0)=-2C_1+C_2=0\\Rightarrow C_2=2$.<br>$$\\boxed{y(t)=e^{-2t}(\\cos t + 2\\sin t)}$$'
                },
                {
                    q: 'Berechne die inverse Laplace-Transformierte von $F(s)=\\dfrac{s+3}{s^2+2s+5}$.',
                    h: 'Quadratische Ergänzung des Nenners: $s^2+2s+5=(s+1)^2+4$. Zähler so umformen, dass $s+1$ und Konstante getrennt sind.',
                    s: 'Nenner: $(s+1)^2+2^2$.<br>Zähler: $s+3=(s+1)+2$.<br>$F(s)=\\dfrac{s+1}{(s+1)^2+4}+\\dfrac{2}{(s+1)^2+4}$.<br>Mit Korrespondenzen $\\cos\\omega t\\leftrightarrow s/(s^2+\\omega^2)$, $\\sin\\omega t\\leftrightarrow\\omega/(s^2+\\omega^2)$ und Dämpfung $s\\to s+1$:<br>$$\\boxed{f(t)=e^{-t}(\\cos 2t + \\sin 2t)\\,\\sigma(t)}$$'
                },
                {
                    q: 'Bestimme die Fourier-Reihe einer ungeraden, $2\\pi$-periodischen Rechteckfunktion mit $f(x)=1$ für $0<x<\\pi$, $f(x)=-1$ für $-\\pi<x<0$.',
                    h: 'Ungerade Funktion $\\Rightarrow$ nur Sinus-Anteile: $b_n=\\tfrac{2}{\\pi}\\int_0^\\pi f(x)\\sin(nx)dx$.',
                    s: '$b_n=\\tfrac{2}{\\pi}\\int_0^\\pi 1\\cdot\\sin(nx)dx=\\tfrac{2}{\\pi}\\!\\left[-\\tfrac{\\cos(nx)}{n}\\right]_0^\\pi=\\tfrac{2}{n\\pi}(1-\\cos n\\pi)$.<br>$\\cos n\\pi=(-1)^n$, also $1-(-1)^n=0$ (gerade $n$) oder $=2$ (ungerade $n$).<br>$b_n=\\tfrac{4}{n\\pi}$ für ungerade $n$, sonst $0$.<br>$$\\boxed{f(x)=\\sum_{k=0}^{\\infty}\\dfrac{4}{(2k+1)\\pi}\\sin((2k+1)x)}$$'
                },
                {
                    q: 'Diagonalisiere $A=\\begin{pmatrix}2&1\\\\0&3\\end{pmatrix}$, d.h. finde $A=PDP^{-1}$.',
                    h: 'Eigenwerte aus $\\det(A-\\lambda I)=0$. Pro Eigenwert Eigenvektor: $(A-\\lambda I)v=0$. $D$ enthält EW, Spalten von $P$ die EV.',
                    s: 'Eigenwerte: oberes Dreieck $\\Rightarrow \\lambda_1=2,\\lambda_2=3$.<br>$\\lambda=2$: $(A-2I)v=\\begin{pmatrix}0&1\\\\0&1\\end{pmatrix}v=0\\Rightarrow v_1=(1,0)^T$.<br>$\\lambda=3$: $(A-3I)v=\\begin{pmatrix}-1&1\\\\0&0\\end{pmatrix}v=0\\Rightarrow v_2=(1,1)^T$.<br>$P=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$, $D=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$, $P^{-1}=\\begin{pmatrix}1&-1\\\\0&1\\end{pmatrix}$.<br>$$\\boxed{A=PDP^{-1}}$$'
                },
                {
                    q: 'Berechne das Linienintegral $\\oint_C \\vec F\\cdot d\\vec r$ für $\\vec F=(y,-x)$ über den Einheitskreis (positiv orientiert) mittels Satz von Green.',
                    h: 'Green: $\\oint(P\\,dx+Q\\,dy)=\\iint_D(\\partial_x Q-\\partial_y P)\\,dA$.',
                    s: '$P=y$, $Q=-x$. $\\partial_x Q=-1$, $\\partial_y P=1$. Integrand: $-1-1=-2$.<br>$\\iint_D -2\\,dA = -2\\cdot \\pi r^2 = -2\\pi$ (Einheitskreis $r=1$).<br>$$\\boxed{=-2\\pi}$$<br>Kommentar: das Vorzeichen kennzeichnet ein im Uhrzeigersinn drehendes Vektorfeld bei positiv orientiertem Weg.'
                },
                {
                    q: 'Berechne mit Residuensatz $\\oint_{|z|=2}\\dfrac{1}{z^2-1}\\,dz$.',
                    h: '$\\dfrac{1}{z^2-1}=\\dfrac{1}{(z-1)(z+1)}$. Beide Pole liegen im Kreis. Residuum bei einfachem Pol: $\\operatorname*{Res}_{z=z_0}f=\\lim_{z\\to z_0}(z-z_0)f(z)$.',
                    s: '$\\operatorname{Res}_{z=1}=\\dfrac{1}{1+1}=\\tfrac12$. $\\operatorname{Res}_{z=-1}=\\dfrac{1}{-1-1}=-\\tfrac12$.<br>Summe: $0$. Nach Residuensatz $\\oint = 2\\pi j\\cdot\\sum\\operatorname{Res}=0$.<br>$$\\boxed{=0}$$'                },
                {
                    q: 'Wende die Cauchy-Integralformel an: $\\oint_{|z|=2}\\dfrac{e^z}{z-1}\\,dz$.',
                    h: '$f(z_0)=\\dfrac{1}{2\\pi j}\\oint\\dfrac{f(z)}{z-z_0}dz$, also $\\oint=2\\pi j\\,f(z_0)$, falls $z_0$ innen.',
                    s: '$f(z)=e^z$ analytisch in $|z|\\le 2$. $z_0=1$ liegt innerhalb.<br>$\\oint = 2\\pi j\\cdot e^1 = 2\\pi e\\,j$.<br>$$\\boxed{=2\\pi e\\,j\\approx 17{,}08\\,j}$$'
                },
                {
                    q: 'Anwendung des Stokes-Theorems: berechne $\\oint_C \\vec F\\cdot d\\vec r$ für $\\vec F=(-y,x,0)$ über den Einheitskreis in der $xy$-Ebene.',
                    h: 'Stokes: $\\oint=\\iint_S(\\nabla\\times\\vec F)\\cdot d\\vec A$. Hier $d\\vec A=\\hat z\\,dA$.',
                    s: '$\\nabla\\times\\vec F=(\\partial_y 0-\\partial_z x,\\,\\partial_z(-y)-\\partial_x 0,\\,\\partial_x x-\\partial_y(-y))=(0,0,2)$.<br>$(\\nabla\\times\\vec F)\\cdot\\hat z = 2$. $\\iint_S 2\\,dA = 2\\cdot\\pi\\cdot 1^2 = 2\\pi$.<br>$$\\boxed{=2\\pi}$$'
                },
                {
                    q: 'Wärmeleitungsgleichung $u_t=u_{xx}$, $0<x<L$, $u(0,t)=u(L,t)=0$, $u(x,0)=\\sin(\\pi x/L)$. Bestimme $u(x,t)$ via Separation.',
                    h: 'Ansatz $u=X(x)T(t)$. Eigenwerte $\\lambda_n=(n\\pi/L)^2$.',
                    s: 'Separation: $T\'/T = X\'\'/X = -\\lambda$.<br>$X_n(x)=\\sin(n\\pi x/L)$, $T_n(t)=e^{-(n\\pi/L)^2 t}$.<br>Anfangsbedingung passt nur zu $n=1$.<br>$$\\boxed{u(x,t)=\\sin(\\pi x/L)\\,e^{-(\\pi/L)^2 t}}$$<br>Interpretation: höhere Moden klingen schneller ab.'
                },
                {
                    q: 'Berechne $\\int_{-\\infty}^\\infty \\dfrac{1}{1+x^2}\\,dx$ mit Hilfe des Residuensatzes (oberer Halbkreis).',
                    h: 'Pol bei $z=j$ in oberer Halbebene. $\\operatorname{Res}_{j}=\\lim_{z\\to j}(z-j)\\cdot\\dfrac{1}{(z-j)(z+j)}$.',
                    s: '$\\operatorname{Res}_{z=j}=\\dfrac{1}{2j}$. Halbkreis-Beitrag verschwindet ($|f|\\sim 1/R^2$). $\\Rightarrow \\int = 2\\pi j\\cdot\\dfrac{1}{2j}=\\pi$.<br>$$\\boxed{=\\pi}$$<br>Konsistent mit elementarem Resultat $\\arctan x|_{-\\infty}^\\infty=\\pi$.'                },
                {
                    q: 'Spektralsatz: diagonalisiere die symmetrische Matrix $A = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ orthogonal, d.h. $A = Q\\Lambda Q^T$ mit $Q^T Q = I$.',
                    h: 'Bei symmetrischer reeller Matrix sind Eigenwerte reell und Eigenvektoren orthogonal waehlbar.',
                    s: '$\\det(A-\\lambda I) = (2-\\lambda)^2 - 1 = 0\\Rightarrow \\lambda \\in\\{1,3\\}$.<br>$\\lambda = 3$: $(A-3I)v = \\begin{pmatrix}-1&1\\\\1&-1\\end{pmatrix}v = 0\\Rightarrow v_1 = \\tfrac{1}{\\sqrt 2}(1,1)^T$.<br>$\\lambda = 1$: $(A-I)v = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}v = 0\\Rightarrow v_2 = \\tfrac{1}{\\sqrt 2}(1,-1)^T$.<br>Kontrolle: $v_1\\cdot v_2 = 0$.<br>$Q = \\tfrac{1}{\\sqrt 2}\\!\\begin{pmatrix}1 & 1\\\\ 1 & -1\\end{pmatrix}$, $\\Lambda = \\operatorname{diag}(3,1)$.<br>$$\\boxed{A = Q\\Lambda Q^T}$$ <em>Quelle:</em> Spektralsatz fuer symmetrische Matrizen; Fischer, Lineare Algebra, 18. Aufl. (2014), §7.4.'
                },
                {
                    q: 'Bestimme die Singulaerwertzerlegung (SVD) von $A = \\begin{pmatrix}3 & 0\\\\ 4 & 0\\end{pmatrix}$.',
                    h: '$A = U\\Sigma V^T$. Singulaerwerte: $\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$.',
                    s: '$A^T A = \\begin{pmatrix}25 & 0\\\\ 0 & 0\\end{pmatrix}\\Rightarrow \\lambda_1=25,\\lambda_2=0$. Singulaerwerte $\\sigma_1 = 5,\\sigma_2 = 0$.<br>$V$ aus EV von $A^T A$: $v_1 = (1,0)^T$, $v_2 = (0,1)^T\\Rightarrow V = I_2$.<br>$U$-Spalten: $u_1 = A v_1/\\sigma_1 = \\tfrac15(3,4)^T$. $u_2$ orthogonal: $\\tfrac15(-4,3)^T$.<br>$U = \\tfrac15\\!\\begin{pmatrix}3 & -4\\\\ 4 & 3\\end{pmatrix}$, $\\Sigma = \\begin{pmatrix}5 & 0\\\\ 0 & 0\\end{pmatrix}$.<br>$$\\boxed{A = U\\Sigma V^T,\\ \\operatorname{rg} A = 1}$$ <em>Quelle:</em> Strang, Linear Algebra and Its Applications, 4th ed. (2006), §6.7; Originalarbeit Eckart/Young, Psychometrika 1 (1936) 211.'
                },
                {
                    q: 'Bestimme die Jordan-Normalform von $A = \\begin{pmatrix}2 & 1\\\\ 0 & 2\\end{pmatrix}$ und gib $e^{At}$ an.',
                    h: 'Eigenwert $\\lambda=2$ mit algebraischer Vielfachheit 2 und geometrischer 1. Jordan-Block $J = \\lambda I + N$, $N$ nilpotent.',
                    s: '$\\lambda = 2$ doppelt, nur ein EV $(1,0)^T$. Damit $J = \\begin{pmatrix}2&1\\\\0&2\\end{pmatrix}$ (selbst schon Jordan-Form).<br>$e^{Jt} = e^{2t}e^{Nt}$ mit $N = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$, $N^2 = 0$, also $e^{Nt} = I+Nt = \\begin{pmatrix}1&t\\\\0&1\\end{pmatrix}$.<br>$$\\boxed{e^{At} = e^{2t}\\!\\begin{pmatrix}1 & t\\\\ 0 & 1\\end{pmatrix}}$$ Erkenntnis: nicht-diagonalisierbare Anteile fuehren zu polynomialen Faktoren $t^k e^{\\lambda t}$. <em>Quelle:</em> Hirsch/Smale/Devaney, Differential Equations, Dynamical Systems and an Introduction to Chaos, 3rd ed. (2013), §6; Originalarbeit C. Jordan "Traite des Substitutions et des Equations Algebriques" (1870).'
                },
                {
                    q: 'Banachscher Fixpunktsatz: zeige, dass $T: \\mathbb R\\to\\mathbb R$, $Tx = \\tfrac12\\cos x$, einen eindeutigen Fixpunkt besitzt.',
                    h: 'Pruefe Kontraktion: $|Tx - Ty| \\le L|x-y|$ mit $L<1$.',
                    s: 'Mittelwertsatz: $|Tx - Ty| = \\tfrac12|\\cos x - \\cos y| \\le \\tfrac12|\\sin\\xi|\\cdot|x-y| \\le \\tfrac12|x-y|$. Lipschitz-Konstante $L = 1/2 < 1$.<br>$\\mathbb R$ ist vollstaendig, $T$ Kontraktion. Banach-Fixpunktsatz $\\Rightarrow$ genau ein Fixpunkt $x^*$ mit $x^* = \\tfrac12\\cos x^*$ (numerisch $x^*\\approx 0{,}4502$).<br>Iteration $x_{n+1} = Tx_n$ konvergiert geometrisch mit $|x_n - x^*| \\le \\dfrac{L^n}{1-L}|x_1 - x_0|$.<br>$$\\boxed{\\exists!\\ x^*:\\ x^* = \\tfrac12\\cos x^*}$$ <em>Quelle:</em> S. Banach, Fund. Math. 3 (1922) 133-181; Werner, Funktionalanalysis, 8. Aufl. (2018), §V.5.'
                },
                {
                    q: 'Plancherel-Identitaet: zeige fuer $f\\in L^2(\\mathbb R)$ mit Fourier-Trafo $\\hat f(\\omega) = \\int f(t)e^{-j\\omega t}dt$, dass $\\int|f(t)|^2 dt = \\tfrac{1}{2\\pi}\\!\\int|\\hat f(\\omega)|^2 d\\omega$.',
                    h: 'Parseval-Plancherel: Energieerhaltung. Beweisidee ueber Skalarprodukt im Schwartz-Raum + Dichtheitsargument.',
                    s: 'Im Schwartz-Raum $\\mathcal S(\\mathbb R)$ folgt die Identitaet aus $\\langle f,g\\rangle = \\tfrac{1}{2\\pi}\\langle\\hat f,\\hat g\\rangle$ durch direktes Einsetzen der Fourier-Inversion $f(t) = \\tfrac{1}{2\\pi}\\!\\int\\hat f(\\omega)e^{j\\omega t}d\\omega$ und Fubini.<br>Setze $g = f$: $\\|f\\|_2^2 = \\tfrac{1}{2\\pi}\\|\\hat f\\|_2^2$.<br>$\\mathcal S$ liegt dicht in $L^2$, stetige Fortsetzung gibt Plancherel-Satz auf ganz $L^2$.<br>$$\\boxed{\\|f\\|_{L^2}^2 = \\tfrac{1}{2\\pi}\\|\\hat f\\|_{L^2}^2}$$ Interpretation: Signalenergie ist im Zeit- und Frequenzbereich gleich. <em>Quelle:</em> M. Plancherel, Rend. Circ. Mat. Palermo 30 (1910) 289-335; Reed/Simon, Methods of Modern Mathematical Physics I, rev. ed. (1980), §IX.1.'
                },
                {
                    q: 'd\'Alembert-Loesung der Wellengleichung: $u_{tt} = c^2 u_{xx}$ auf $\\mathbb R$, $u(x,0) = f(x)$, $u_t(x,0) = 0$. Bestimme $u(x,t)$.',
                    h: 'Faktorisierung des Differentialoperators: $\\partial_t^2 - c^2\\partial_x^2 = (\\partial_t - c\\partial_x)(\\partial_t + c\\partial_x)$. Charakteristiken $x \\pm ct = \\text{const}$.',
                    s: 'Allgemeine Loesung: $u(x,t) = F(x-ct) + G(x+ct)$.<br>Anfangsbedingungen: $u(x,0) = F(x)+G(x) = f(x)$. $u_t(x,0) = -cF\'(x) + cG\'(x) = 0\\Rightarrow F\'=G\'\\Rightarrow F-G$ konstant. Wahl $F = G$ liefert $F = G = f/2$.<br>$$\\boxed{u(x,t) = \\tfrac12[f(x-ct) + f(x+ct)]}$$ Bedeutung: Anfangswelle laeuft als zwei gleichgrosse Wellen mit Geschwindigkeit $c$ in beide Richtungen. <em>Quelle:</em> J. d\'Alembert, Hist. Acad. Roy. Sci. Berlin (1747); Evans, Partial Differential Equations, 2nd ed. (2010), §2.4.'
                },
                {
                    q: 'Konstruktion der Green-Funktion: loese $-u\'\'(x) = f(x)$ auf $[0,1]$ mit $u(0) = u(1) = 0$.',
                    h: 'Green-Funktion $G(x,\\xi)$ erfuellt $-G_{xx} = \\delta(x-\\xi)$, $G(0,\\xi) = G(1,\\xi) = 0$. Loesung: $u(x) = \\int_0^1 G(x,\\xi) f(\\xi)\\,d\\xi$.',
                    s: 'Ansatz: $G(x,\\xi) = A(\\xi) x$ fuer $x<\\xi$, $G(x,\\xi) = B(\\xi)(1-x)$ fuer $x>\\xi$.<br>Stetigkeit bei $x=\\xi$: $A\\xi = B(1-\\xi)$.<br>Sprung der Ableitung: $G_x(\\xi^+) - G_x(\\xi^-) = -B - A = -1\\Rightarrow A+B = 1$.<br>Loesung: $A = 1-\\xi$, $B = \\xi$.<br>$$\\boxed{G(x,\\xi) = \\begin{cases}x(1-\\xi),& x\\le\\xi\\\\ \\xi(1-x),& x>\\xi\\end{cases}}$$ Symmetrie $G(x,\\xi)=G(\\xi,x)$ folgt aus Selbstadjungiertheit von $-d^2/dx^2$. <em>Quelle:</em> G. Green, "Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism" (1828); Evans, PDE, 2nd ed. (2010), §2.2.4.'
                },
                {
                    q: 'Cooley-Tukey FFT: zeige, dass die DFT der Laenge $N=2^k$ mit $O(N\\log N)$ Operationen statt $O(N^2)$ berechnet werden kann.',
                    h: 'Aufspalten der DFT in gerade und ungerade Indizes, rekursiv. Drehfaktor $\\omega_N = e^{-2\\pi j/N}$.',
                    s: '$X_k = \\sum_{n=0}^{N-1} x_n\\omega_N^{nk}$. Aufspalten in $n = 2m$ und $n = 2m+1$:<br>$X_k = \\sum_{m=0}^{N/2-1} x_{2m}\\omega_{N/2}^{mk} + \\omega_N^k\\sum_{m=0}^{N/2-1} x_{2m+1}\\omega_{N/2}^{mk}$.<br>Damit zwei DFTs der Laenge $N/2$ + $N$ Multiplikationen. Rekursion: $T(N) = 2T(N/2) + cN\\Rightarrow T(N) = O(N\\log_2 N)$.<br>Beispiel $N=1024$: $5120$ vs. $10^6$ Operationen.<br>$$\\boxed{T(N) = O(N\\log N)}$$ <em>Quelle:</em> J. W. Cooley & J. W. Tukey, Math. Comp. 19 (1965) 297-301; Quarteroni/Sacco/Saleri, Numerical Mathematics, 2nd ed. (2007), §10.9.'
                },
                {
                    q: 'KKT-Bedingungen: loese $\\min x^2+y^2$ unter $x+y\\ge 1$, $x\\ge 0$, $y\\ge 0$.',
                    h: 'Lagrange $L = f - \\sum\\mu_i g_i$. KKT: primale Zulaessigkeit, $\\mu_i\\ge 0$, $\\mu_i g_i = 0$ (Komplementaritaet), $\\nabla_x L = 0$.',
                    s: '$f$ konvex, Bedingung $1-x-y \\le 0$ linear $\\Rightarrow$ KKT notwendig und hinreichend.<br>$L = x^2+y^2 - \\mu_1(x+y-1) - \\mu_2 x - \\mu_3 y$. Stationaer: $2x = \\mu_1+\\mu_2$, $2y = \\mu_1+\\mu_3$.<br>Aktive Restriktion: $x+y = 1$ und $x,y > 0\\Rightarrow \\mu_2 = \\mu_3 = 0\\Rightarrow x = y = \\mu_1/2$. Aus $x+y=1$: $\\mu_1 = 1$, $x = y = 1/2$.<br>$f_{\\min} = 1/2$.<br>$$\\boxed{(x,y) = (1/2,\\,1/2),\\ f_{\\min} = 1/2}$$ <em>Quelle:</em> H. W. Kuhn & A. W. Tucker, Proc. 2nd Berkeley Symp. (1951) 481-492; Boyd & Vandenberghe, Convex Optimization (2004), §5.5.'
                },
                {
                    q: 'Newton-Verfahren: bestimme $\\sqrt 2$ auf 6 signifikante Stellen mit Startwert $x_0 = 1$.',
                    h: 'Iteration: $x_{n+1} = x_n - f(x_n)/f\'(x_n)$ fuer $f(x) = x^2-2$. Quadratische Konvergenz.',
                    s: '$f\'(x) = 2x$. Iteration: $x_{n+1} = \\tfrac12(x_n + 2/x_n)$.<br>$x_0 = 1$.<br>$x_1 = (1+2)/2 = 1{,}5$.<br>$x_2 = (1{,}5 + 4/3)/2 = 1{,}41667$.<br>$x_3 = (1{,}41667 + 2/1{,}41667)/2 = 1{,}414216$.<br>$x_4 = 1{,}414214$ (Stabil).<br>$$\\boxed{\\sqrt 2 \\approx 1{,}414214}$$ Fehler halbiert sich logarithmisch: $|x_n-x^*|\\sim 10^{-2^n}$ (quadratisch). <em>Quelle:</em> I. Newton, "De analysi per aequationes numero terminorum infinitas" (1669); Stoer/Bulirsch, Numerische Mathematik 1, 10. Aufl. (2007), §5.3.'
                },
                {
                    q: 'Itos Lemma: bestimme $dY$ fuer $Y = X^2$, wobei $dX = \\mu\\,dt + \\sigma\\,dW$.',
                    h: 'Itos Lemma: $dY = \\partial_x f\\,dX + \\tfrac12\\partial_{xx}f\\,(dX)^2$ mit $(dW)^2 = dt$.',
                    s: '$f(x) = x^2$, $\\partial_x f = 2x$, $\\partial_{xx} f = 2$.<br>$(dX)^2 = \\sigma^2(dW)^2 + O(dt^2) = \\sigma^2 dt$.<br>$dY = 2X(\\mu\\,dt + \\sigma\\,dW) + \\tfrac12\\cdot 2\\cdot\\sigma^2\\,dt = (2X\\mu + \\sigma^2)\\,dt + 2X\\sigma\\,dW$.<br>$$\\boxed{dY = (2X\\mu + \\sigma^2)\\,dt + 2X\\sigma\\,dW}$$ Der zusaetzliche Term $\\sigma^2 dt$ unterscheidet stochastische von gewoehnlicher Kettenregel. <em>Quelle:</em> K. Ito, Proc. Imp. Acad. Tokyo 20 (1944) 519-524; Oeksendal, Stochastic Differential Equations, 6th ed. (2003), §4.1.'
                },
                {
                    q: 'Eulersche Differentialgleichung der Variationsrechnung: bestimme das Extremalfunktional fuer $J[y] = \\int_0^1((y\')^2 + y^2)\\,dx$ mit $y(0) = 0$, $y(1) = 1$.',
                    h: 'Euler-Lagrange: $\\dfrac{\\partial L}{\\partial y} - \\dfrac{d}{dx}\\dfrac{\\partial L}{\\partial y\'} = 0$ mit $L = (y\')^2 + y^2$.',
                    s: '$\\partial L/\\partial y = 2y$, $\\partial L/\\partial y\' = 2y\'$. Euler-Lagrange: $2y - 2y\'\' = 0\\Rightarrow y\'\' - y = 0$.<br>Allgemein: $y = A e^x + B e^{-x}$.<br>Randbedingungen: $A+B = 0$, $A e + B/e = 1\\Rightarrow A = 1/(e - 1/e) = e/(e^2-1)$, $B = -A$.<br>$$\\boxed{y(x) = \\dfrac{e^x - e^{-x}}{e - e^{-1}} = \\dfrac{\\sinh x}{\\sinh 1}}$$ Geometrisch: Loesung minimiert eine quadratische Form (Sobolev-Norm in $H^1$). <em>Quelle:</em> L. Euler, "Methodus Inveniendi Lineas Curvas Maximi Minimive Proprietate Gaudentes" (1744); Gelfand/Fomin, Calculus of Variations (1963), §3.'
                },
                {
                    q: 'Sobolev-Einbettung in 1D: zeige, dass jede Funktion $u\\in H^1(0,1)$ stetig ist und die Abschaetzung $\\|u\\|_\\infty \\le C\\|u\\|_{H^1}$ gilt.',
                    h: '$H^1(0,1) = W^{1,2}(0,1)$: Funktionen mit schwacher Ableitung in $L^2$. Hauptsatz der Differential- und Integralrechnung gilt fast ueberall.',
                    s: 'Fuer $u\\in C^1[0,1]$: $u(x) = u(y) + \\int_y^x u\'(s)\\,ds$. Integration ueber $y$ liefert $u(x) = \\int_0^1 u(y)\\,dy + \\int_0^1\\!\\int_y^x u\'(s)\\,ds\\,dy$.<br>Cauchy-Schwarz: $|u(x)| \\le \\|u\\|_{L^2} + \\|u\'\\|_{L^2}\\cdot\\sqrt 1 \\le \\sqrt 2\\|u\\|_{H^1}$.<br>Dichteargument: $C^1[0,1]$ ist dicht in $H^1(0,1)$; Limesfunktionen sind stetige Repraesentanten.<br>$$\\boxed{H^1(0,1)\\hookrightarrow C[0,1],\\ \\|u\\|_\\infty \\le \\sqrt 2\\|u\\|_{H^1}}$$ Bemerkung: Einbettung versagt in hoeheren Dimensionen ($H^1\\not\\subset C$ in $\\mathbb R^2$). <em>Quelle:</em> S. L. Sobolev, Mat. Sb. 4 (1938) 471-497; Adams/Fournier, Sobolev Spaces, 2nd ed. (2003), §4.12.'
                },
                {
                    q: 'Spektralradius und Krylov-Verfahren: zeige fuer das konjugierte Gradientenverfahren (CG) bei symmetrisch positiv definiter $A$, dass nach $k$ Iterationen der Fehler in der Energie-Norm durch $\\le 2\\!\\left(\\dfrac{\\sqrt\\kappa - 1}{\\sqrt\\kappa + 1}\\right)^{\\!k}\\!\\|e_0\\|_A$ beschraenkt ist, wobei $\\kappa = \\lambda_{\\max}/\\lambda_{\\min}$.',
                    h: 'CG minimiert ueber Krylov-Raum $\\mathcal K_k(A, r_0) = \\operatorname{span}\\{r_0, Ar_0,\\ldots, A^{k-1}r_0\\}$. Konvergenzanalyse via Tschebyscheff-Polynomen $T_k$.',
                    s: 'CG bestimmt $x_k \\in x_0 + \\mathcal K_k$ mit minimaler Energie-Norm $\\|x-x_k\\|_A$. Fehler $e_k = x - x_k$ ist Polynom in $A$ vom Grad $k$ angewandt auf $e_0$: $e_k = p_k(A)e_0$ mit $p_k(0) = 1$.<br>Spektralabschaetzung: $\\|e_k\\|_A \\le \\min_{p_k(0)=1}\\max_{\\lambda\\in[\\lambda_{\\min},\\lambda_{\\max}]}|p_k(\\lambda)|\\cdot\\|e_0\\|_A$.<br>Tschebyscheff-Polynom $T_k$ loest das Minimax-Problem: $\\max|p_k| = 1/T_k\\!\\left(\\tfrac{\\lambda_{\\max}+\\lambda_{\\min}}{\\lambda_{\\max}-\\lambda_{\\min}}\\right)$.<br>Mit $T_k(\\cosh\\theta) = \\cosh(k\\theta)$ und $\\cosh\\theta = (\\kappa+1)/(\\kappa-1)$ folgt $1/T_k \\le 2\\!\\left(\\tfrac{\\sqrt\\kappa-1}{\\sqrt\\kappa+1}\\right)^k$.<br>$$\\boxed{\\|e_k\\|_A \\le 2\\!\\left(\\tfrac{\\sqrt\\kappa-1}{\\sqrt\\kappa+1}\\right)^{\\!k}\\!\\|e_0\\|_A}$$ Konsequenz: Vorkonditionierung zielt auf Reduktion von $\\kappa$. <em>Quelle:</em> M. R. Hestenes & E. Stiefel, J. Res. Nat. Bur. Stand. 49 (1952) 409-436; Saad, Iterative Methods for Sparse Linear Systems, 2nd ed. (2003), §6.11.'
                },
                {
                    q: 'Löse das DGL-System $\\dot{\\vec x}=A\\vec x$ mit $A=\\begin{pmatrix}0&1\\\\-2&-3\\end{pmatrix}$ über den Eigenwert-Ansatz.',
                    h: 'Eigenwerte aus $\\det(A-\\lambda I)=0$, dann $\\vec x=\\sum C_i e^{\\lambda_i t}\\vec v_i$.',
                    s: '$\\det\\!\\begin{pmatrix}-\\lambda&1\\\\-2&-3-\\lambda\\end{pmatrix}=\\lambda^2+3\\lambda+2=(\\lambda+1)(\\lambda+2)=0\\Rightarrow\\lambda_1=-1,\\lambda_2=-2$.<br>$\\lambda=-1$: $(A+I)\\vec v=0\\Rightarrow\\vec v_1=(1,-1)^T$. $\\lambda=-2$: $\\vec v_2=(1,-2)^T$.<br>$$\\boxed{\\vec x(t)=C_1 e^{-t}\\!\\begin{pmatrix}1\\\\-1\\end{pmatrix}+C_2 e^{-2t}\\!\\begin{pmatrix}1\\\\-2\\end{pmatrix}}$$ Beide Eigenwerte negativ $\\Rightarrow$ stabiler Knoten. <em>Quelle:</em> Hirsch/Smale/Devaney, Differential Equations, Dynamical Systems and an Introduction to Chaos, 3rd ed. (2013), §3.'
                },
                {
                    q: 'Bestimme eine partikuläre Lösung von $y\'\'+y=\\cos(2t)$ mit dem Ansatz vom Typ der rechten Seite.',
                    h: 'Da $2\\neq\\pm 1$ (keine Resonanz): Ansatz $y_p=A\\cos(2t)$.',
                    s: '$y_p=A\\cos 2t$, $y_p\'\'=-4A\\cos 2t$. Einsetzen: $-4A+A=-3A\\stackrel{!}{=}1\\Rightarrow A=-\\tfrac13$.<br>$$\\boxed{y_p(t)=-\\tfrac13\\cos(2t)}$$ Allgemein: $y=C_1\\cos t+C_2\\sin t-\\tfrac13\\cos 2t$. <em>Quelle:</em> Papula, Mathematik fuer Ingenieure Bd. 2, 16. Aufl. (2024), §V.3.'
                },
                {
                    q: 'Bestimme die partikuläre Lösung von $y\'\'+\\omega^2 y=\\cos(\\omega t)$ (Resonanzfall).',
                    h: 'Anregung mit Eigenfrequenz $\\Rightarrow$ Ansatz mit Faktor $t$: $y_p=t(a\\cos\\omega t+b\\sin\\omega t)$.',
                    s: 'Der Standard-Ansatz versagt (homogene Lösung). Mit $y_p=\\dfrac{t}{2\\omega}\\sin(\\omega t)$ folgt nach zweimaligem Ableiten $y_p\'\'+\\omega^2 y_p=\\cos(\\omega t)$.<br>$$\\boxed{y_p(t)=\\dfrac{t}{2\\omega}\\sin(\\omega t)}$$ Die Amplitude wächst linear mit $t$ — physikalische Resonanz. <em>Quelle:</em> Lutz/Wendt, Taschenbuch der Regelungstechnik, 12. Aufl. (2021), §4.2.'
                },
                {
                    q: 'Bestimme die Laurent-Reihe von $f(z)=\\dfrac{1}{z(z-1)}$ im Kreisring $0<|z|<1$.',
                    h: 'Partialbrüche $-\\tfrac1z+\\tfrac{1}{z-1}$, dann $\\tfrac{1}{z-1}=-\\tfrac{1}{1-z}=-\\sum z^n$.',
                    s: '$f(z)=-\\dfrac1z+\\dfrac{1}{z-1}=-\\dfrac1z-\\dfrac{1}{1-z}=-\\dfrac1z-\\sum_{n=0}^\\infty z^n$.<br>$$\\boxed{f(z)=-\\dfrac1z-1-z-z^2-\\dots}$$ Hauptteil $-1/z$, Residuum bei $z=0$ ist $-1$. <em>Quelle:</em> Jänich, Funktionentheorie, 6. Aufl. (2004), §7.'
                },
                {
                    q: 'Berechne das Residuum von $f(z)=\\dfrac{e^z}{z^2}$ bei $z=0$ (Pol 2. Ordnung).',
                    h: 'Pol der Ordnung 2: $\\operatorname{Res}=\\lim_{z\\to 0}\\dfrac{d}{dz}\\!\\left[z^2 f(z)\\right]$.',
                    s: '$z^2 f=e^z$. $\\dfrac{d}{dz}e^z=e^z\\big|_{z=0}=1$.<br>$$\\boxed{\\operatorname{Res}_{z=0}\\dfrac{e^z}{z^2}=1}$$ Alternativ: Laurent-Koeffizient von $1/z$ in $\\tfrac{1}{z^2}(1+z+\\dots)$ ist 1. <em>Quelle:</em> Jänich, Funktionentheorie, 6. Aufl. (2004), §8.'
                },
                {
                    q: 'Prüfe mit den Cauchy-Riemann-Gleichungen, ob $f(z)=z^2$ holomorph ist, und gib $f\'(z)$ an.',
                    h: 'Schreibe $f=u+jv$ mit $z=x+jy$. CR: $u_x=v_y$, $u_y=-v_x$.',
                    s: '$z^2=(x^2-y^2)+j(2xy)$, also $u=x^2-y^2$, $v=2xy$.<br>$u_x=2x=v_y=2x$ $\\checkmark$; $u_y=-2y=-v_x=-2y$ $\\checkmark$.<br>$f$ ist überall holomorph, $f\'(z)=u_x+jv_x=2x+j2y=2z$.<br>$$\\boxed{f\'(z)=2z}$$ <em>Quelle:</em> Jänich, Funktionentheorie, 6. Aufl. (2004), §5.'
                },
                {
                    q: 'Berechne $\\int_{-\\infty}^{\\infty}\\dfrac{\\cos x}{1+x^2}\\,dx$ mit dem Residuensatz (Jordan-Lemma).',
                    h: 'Betrachte $\\dfrac{e^{jz}}{1+z^2}$ im oberen Halbkreis; Pol bei $z=j$.',
                    s: '$\\operatorname{Res}_{z=j}\\dfrac{e^{jz}}{(z-j)(z+j)}=\\dfrac{e^{j\\cdot j}}{2j}=\\dfrac{e^{-1}}{2j}$.<br>Jordan-Lemma: Halbkreisbeitrag verschwindet. $\\int=2\\pi j\\cdot\\dfrac{e^{-1}}{2j}=\\dfrac{\\pi}{e}$.<br>Realteil liefert das Cosinus-Integral (Sinus-Anteil ist 0, ungerade).<br>$$\\boxed{\\int_{-\\infty}^\\infty\\dfrac{\\cos x}{1+x^2}dx=\\dfrac{\\pi}{e}\\approx 1{,}156}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §15.3 (Jordansches Lemma).'
                },
                {
                    q: 'Berechne die Fourier-Transformierte der Gauss-Funktion $f(x)=e^{-x^2}$ (Konvention $\\hat f(\\omega)=\\int f(x)e^{-j\\omega x}dx$).',
                    h: 'Quadratische Ergänzung im Exponenten oder DGL-Methode; das Ergebnis ist wieder eine Gauss-Funktion.',
                    s: '$\\hat f(\\omega)=\\int_{-\\infty}^\\infty e^{-x^2-j\\omega x}dx$. Quadratische Ergänzung: $-x^2-j\\omega x=-(x+\\tfrac{j\\omega}{2})^2-\\tfrac{\\omega^2}{4}$.<br>Mit $\\int e^{-u^2}du=\\sqrt\\pi$ folgt $\\hat f(\\omega)=\\sqrt\\pi\\,e^{-\\omega^2/4}$.<br>$$\\boxed{\\hat f(\\omega)=\\sqrt\\pi\\,e^{-\\omega^2/4}}$$ Die Gauss-Funktion ist (bis auf Skalierung) ein Fixpunkt der Fourier-Transformation. <em>Quelle:</em> Bracewell, The Fourier Transform and Its Applications, 3rd ed. (2000), Ch. 6.'
                },
                {
                    q: 'Bestimme die Fourier-Transformierte des Rechteckimpulses $\\operatorname{rect}(t)=1$ für $|t|<\\tfrac12$, sonst 0.',
                    h: '$\\hat f(\\omega)=\\int_{-1/2}^{1/2}e^{-j\\omega t}\\,dt$.',
                    s: '$\\hat f(\\omega)=\\left[\\dfrac{e^{-j\\omega t}}{-j\\omega}\\right]_{-1/2}^{1/2}=\\dfrac{e^{j\\omega/2}-e^{-j\\omega/2}}{j\\omega}=\\dfrac{2\\sin(\\omega/2)}{\\omega}=\\operatorname{sinc}\\!\\left(\\tfrac{\\omega}{2}\\right)$.<br>$$\\boxed{\\hat f(\\omega)=\\dfrac{\\sin(\\omega/2)}{\\omega/2}}$$ Rechteck im Zeitbereich $\\leftrightarrow$ sinc im Frequenzbereich. <em>Quelle:</em> Oppenheim/Willsky, Signals and Systems, 2nd ed. (1996), §4.3.'
                },
                {
                    q: 'Bestimme die z-Transformierte der Folge $x[n]=a^n\\,u[n]$ und ihren Konvergenzbereich.',
                    h: '$X(z)=\\sum_{n=0}^\\infty (az^{-1})^n$ ist eine geometrische Reihe.',
                    s: '$X(z)=\\sum_{n=0}^\\infty a^n z^{-n}=\\dfrac{1}{1-az^{-1}}=\\dfrac{z}{z-a}$ für $|az^{-1}|<1$.<br>$$\\boxed{X(z)=\\dfrac{z}{z-a},\\ |z|>|a|}$$ Pol bei $z=a$; ROC außerhalb. <em>Quelle:</em> Oppenheim/Schafer, Discrete-Time Signal Processing, 3rd ed. (2010), §3.2.'
                },
                {
                    q: 'Berechne die diskrete Faltung $y=x*h$ für $x=[1,2,3]$ und $h=[1,1]$.',
                    h: '$y[n]=\\sum_k x[k]h[n-k]$. Ergebnislänge $=3+2-1=4$.',
                    s: '$y[0]=1\\cdot 1=1$.<br>$y[1]=1\\cdot 1+2\\cdot 1=3$.<br>$y[2]=2\\cdot 1+3\\cdot 1=5$.<br>$y[3]=3\\cdot 1=3$.<br>$$\\boxed{y=[1,3,5,3]}$$ Kontrolle: $\\sum y=12=(\\sum x)(\\sum h)=6\\cdot 2$. <em>Quelle:</em> Oppenheim/Schafer, Discrete-Time Signal Processing, 3rd ed. (2010), §2.3.'
                },
                {
                    q: 'Ein Signal hat die maximale Frequenz $f_{\\max}=4\\,\\text{kHz}$. Wie hoch muss die Abtastrate nach dem Abtasttheorem mindestens sein, und was passiert bei Unterabtastung?',
                    h: 'Nyquist-Shannon: $f_s>2f_{\\max}$.',
                    s: '$f_s>2\\cdot 4\\,\\text{kHz}=8\\,\\text{kHz}$. Praktisch wählt man $f_s\\gtrsim 2{,}5 f_{\\max}$ wegen nicht-idealer Filter.<br>Bei $f_s<2f_{\\max}$ tritt <strong>Aliasing</strong> auf: hohe Frequenzen falten sich als niederfrequente Scheinsignale in das Basisband ($f_\\text{alias}=|f-k f_s|$).<br>$$\\boxed{f_s>8\\,\\text{kHz}}$$ <em>Quelle:</em> C. E. Shannon, Proc. IRE 37 (1949) 10-21; Oppenheim/Schafer, 3rd ed. (2010), §4.2.'
                },
                {
                    q: 'Bestimme die Eigenwerte und Eigenfunktionen des Sturm-Liouville-Problems $-y\'\'=\\lambda y$, $y(0)=y(\\pi)=0$.',
                    h: 'Allgemeine Lösung $y=A\\cos(\\sqrt\\lambda x)+B\\sin(\\sqrt\\lambda x)$; Randbedingungen einsetzen.',
                    s: '$y(0)=0\\Rightarrow A=0$. $y(\\pi)=B\\sin(\\sqrt\\lambda\\,\\pi)=0\\Rightarrow\\sqrt\\lambda\\,\\pi=n\\pi$.<br>$$\\boxed{\\lambda_n=n^2,\\ y_n(x)=\\sin(nx),\\ n=1,2,\\dots}$$ Die $y_n$ bilden eine Orthogonalbasis (Fourier-Sinus-Reihe). <em>Quelle:</em> Evans, Partial Differential Equations, 2nd ed. (2010), §6.5.'
                },
                {
                    q: 'Löse die Transportgleichung $u_t+c\\,u_x=0$, $u(x,0)=f(x)$ mit der Charakteristikenmethode.',
                    h: 'Entlang $\\dfrac{dx}{dt}=c$ ist $u$ konstant. Charakteristiken: $x-ct=\\text{const}$.',
                    s: 'Auf den Geraden $x-ct=\\xi$ gilt $\\dfrac{d}{dt}u(x(t),t)=u_t+c u_x=0$, also $u$ konstant.<br>Anfangswert: $u=f(\\xi)=f(x-ct)$.<br>$$\\boxed{u(x,t)=f(x-ct)}$$ Die Anfangsform läuft unverzerrt mit Geschwindigkeit $c$ nach rechts. <em>Quelle:</em> Evans, Partial Differential Equations, 2nd ed. (2010), §2.1.'
                },
                {
                    q: 'Führe einen Runge-Kutta-Schritt 4. Ordnung (RK4) für $y\'=y$, $y(0)=1$, Schrittweite $h=0{,}1$ aus.',
                    h: '$k_1=f(t_n,y_n)$, $k_2=f(t_n+\\tfrac h2,y_n+\\tfrac h2 k_1)$, $k_3$ analog mit $k_2$, $k_4=f(t_n+h,y_n+hk_3)$; $y_{n+1}=y_n+\\tfrac h6(k_1+2k_2+2k_3+k_4)$.',
                    s: '$f=y$. $k_1=1$; $k_2=1+0{,}05\\cdot 1=1{,}05$; $k_3=1+0{,}05\\cdot 1{,}05=1{,}0525$; $k_4=1+0{,}1\\cdot 1{,}0525=1{,}10525$.<br>$y_1=1+\\tfrac{0{,}1}{6}(1+2{,}1+2{,}105+1{,}10525)=1+0{,}0105171=1{,}1051708$.<br>Exakt: $e^{0{,}1}=1{,}1051709$.<br>$$\\boxed{y_1\\approx 1{,}105171\\ (\\text{Fehler}\\sim 10^{-7})}$$ <em>Quelle:</em> Stoer/Bulirsch, Numerische Mathematik 1, 10. Aufl. (2007), §7.2.'
                },
                {
                    q: 'Approximiere $\\int_0^2 x^2\\,dx$ mit der Simpson-Regel (ein Intervall, $n=2$ Stützstellen-Schritte).',
                    h: 'Simpson: $\\int_a^b f\\approx\\dfrac{h}{3}(f_0+4f_1+f_2)$, $h=\\tfrac{b-a}{2}$.',
                    s: '$h=1$, Stützstellen $x=0,1,2$ mit $f=0,1,4$.<br>$\\int\\approx\\tfrac13(0+4\\cdot 1+4)=\\tfrac83\\approx 2{,}667$.<br>$$\\boxed{=\\tfrac83}$$ Simpson integriert Polynome bis Grad 3 exakt — daher hier exakt. <em>Quelle:</em> Stoer/Bulirsch, Numerische Mathematik 1, 10. Aufl. (2007), §3.1.'
                },
                {
                    q: 'Berechne $\\int_{-1}^{1}x^2\\,dx$ mit der 2-Punkt-Gauss-Legendre-Quadratur.',
                    h: 'Knoten $\\pm\\tfrac{1}{\\sqrt3}$, Gewichte je 1: $\\int_{-1}^1 f\\approx f(-\\tfrac{1}{\\sqrt3})+f(\\tfrac{1}{\\sqrt3})$.',
                    s: '$f(\\pm\\tfrac{1}{\\sqrt3})=\\tfrac13$. Summe $=\\tfrac13+\\tfrac13=\\tfrac23$.<br>Exakt: $\\int_{-1}^1 x^2 dx=\\tfrac23$.<br>$$\\boxed{=\\tfrac23}$$ Die 2-Punkt-Regel integriert Polynome bis Grad 3 exakt. <em>Quelle:</em> Quarteroni/Sacco/Saleri, Numerical Mathematics, 2nd ed. (2007), §9.2.'
                },
                {
                    q: 'Gib die Konvergenzrate des Gradientenabstiegs für eine quadratische Form $f(\\vec x)=\\tfrac12\\vec x^T A\\vec x$ ($A$ symm. pos. def.) mit optimaler Schrittweite an.',
                    h: 'Mit Konditionszahl $\\kappa=\\lambda_{\\max}/\\lambda_{\\min}$ kontrahiert der Fehler je Schritt.',
                    s: 'Pro Schritt gilt für die optimale (exakte Linien-)Schrittweite $\\dfrac{f(\\vec x_{k+1})}{f(\\vec x_k)}\\le\\left(\\dfrac{\\kappa-1}{\\kappa+1}\\right)^2$.<br>$$\\boxed{\\text{Kontraktionsfaktor}=\\left(\\tfrac{\\kappa-1}{\\kappa+1}\\right)^2}$$ Schlecht konditioniert ($\\kappa\\gg 1$) $\\Rightarrow$ langsame Konvergenz; Vorkonditionierung reduziert $\\kappa$. <em>Quelle:</em> Boyd & Vandenberghe, Convex Optimization (2004), §9.3.'
                },
                {
                    q: 'Bestimme über die Lagrange-Dualität das Minimum von $f(x)=x^2$ unter $x\\ge 1$ und prüfe starke Dualität.',
                    h: 'Lagrange $L(x,\\lambda)=x^2-\\lambda(x-1)$, $\\lambda\\ge 0$. Duale Funktion $g(\\lambda)=\\min_x L$.',
                    s: '$\\partial_x L=2x-\\lambda=0\\Rightarrow x=\\lambda/2$. $g(\\lambda)=\\tfrac{\\lambda^2}{4}-\\lambda(\\tfrac\\lambda2-1)=-\\tfrac{\\lambda^2}{4}+\\lambda$.<br>$\\max_{\\lambda\\ge 0}g$: $g\'=-\\tfrac\\lambda2+1=0\\Rightarrow\\lambda=2$, $g(2)=1$.<br>Primal: $\\min x^2$ bei $x=1$ ist $1$. $p^*=d^*=1$.<br>$$\\boxed{p^*=d^*=1\\ (\\text{starke Dualität, da konvex})}$$ <em>Quelle:</em> Boyd & Vandenberghe, Convex Optimization (2004), §5.2.'
                },
                {
                    q: 'Ein Test hat Sensitivität $99\\%$ und Spezifität $95\\%$; die Prävalenz der Krankheit ist $1\\%$. Berechne mit dem Satz von Bayes $P(\\text{krank}\\mid\\text{positiv})$.',
                    h: '$P(K\\mid+)=\\dfrac{P(+\\mid K)P(K)}{P(+\\mid K)P(K)+P(+\\mid\\bar K)P(\\bar K)}$.',
                    s: '$P(+\\mid K)=0{,}99$, $P(K)=0{,}01$, $P(+\\mid\\bar K)=1-0{,}95=0{,}05$, $P(\\bar K)=0{,}99$.<br>$P(K\\mid+)=\\dfrac{0{,}99\\cdot 0{,}01}{0{,}99\\cdot 0{,}01+0{,}05\\cdot 0{,}99}=\\dfrac{0{,}0099}{0{,}0594}\\approx 0{,}167$.<br>$$\\boxed{P(\\text{krank}\\mid\\text{positiv})\\approx 16{,}7\\%}$$ Trotz guter Testgüte ist der positive Vorhersagewert wegen niedriger Prävalenz klein. <em>Quelle:</em> Georgii, Stochastik, 5. Aufl. (2015), §3.3.'
                },
                {
                    q: 'Formuliere den zentralen Grenzwertsatz und gib die standardisierte Größe für die Summe $S_n=\\sum_{i=1}^n X_i$ unabhängig identisch verteilter $X_i$ mit $E[X_i]=\\mu$, $\\operatorname{Var}(X_i)=\\sigma^2$ an.',
                    h: 'Standardisieren: Erwartungswert abziehen, durch Standardabweichung der Summe teilen.',
                    s: '$E[S_n]=n\\mu$, $\\operatorname{Var}(S_n)=n\\sigma^2$. Die standardisierte Größe ist $Z_n=\\dfrac{S_n-n\\mu}{\\sigma\\sqrt n}$.<br>$$\\boxed{Z_n=\\dfrac{S_n-n\\mu}{\\sigma\\sqrt n}\\xrightarrow{d}\\mathcal N(0,1)}$$ Konvergenz in Verteilung gegen die Standardnormalverteilung. <em>Quelle:</em> Georgii, Stochastik, 5. Aufl. (2015), §5.2 (Zentraler Grenzwertsatz von Lindeberg-Lévy).'
                },
                {
                    q: 'Bestimme den Maximum-Likelihood-Schätzer für den Parameter $\\lambda$ einer Exponentialverteilung aus einer Stichprobe $x_1,\\dots,x_n$.',
                    h: 'Likelihood $L(\\lambda)=\\prod\\lambda e^{-\\lambda x_i}$; Log-Likelihood ableiten und Null setzen.',
                    s: '$\\ell(\\lambda)=n\\ln\\lambda-\\lambda\\sum x_i$. $\\dfrac{d\\ell}{d\\lambda}=\\dfrac n\\lambda-\\sum x_i\\stackrel{!}{=}0$.<br>$\\hat\\lambda=\\dfrac{n}{\\sum x_i}=\\dfrac{1}{\\bar x}$.<br>$$\\boxed{\\hat\\lambda_{\\text{ML}}=\\dfrac{1}{\\bar x}}$$ Zweite Ableitung $-n/\\lambda^2<0$ bestätigt das Maximum. <em>Quelle:</em> Casella & Berger, Statistical Inference, 2nd ed. (2002), §7.2.'
                },
                {
                    q: 'Stelle die Normalengleichungen der linearen Ausgleichsrechnung (least squares) für $A\\vec x\\approx\\vec b$ auf und begründe sie geometrisch.',
                    h: 'Minimiere $\\|A\\vec x-\\vec b\\|^2$. Der Residuenvektor steht senkrecht auf dem Spaltenraum von $A$.',
                    s: 'Minimierung von $\\|A\\vec x-\\vec b\\|^2$ führt auf $\\nabla=2A^T(A\\vec x-\\vec b)=0$.<br>$$\\boxed{A^T A\\,\\vec x=A^T\\vec b}$$ Geometrisch: $A\\hat{\\vec x}$ ist die orthogonale Projektion von $\\vec b$ auf den Spaltenraum von $A$; das Residuum $\\vec b-A\\hat{\\vec x}$ steht senkrecht darauf ($A^T(\\vec b-A\\hat{\\vec x})=0$). Für vollen Spaltenrang: $\\hat{\\vec x}=(A^T A)^{-1}A^T\\vec b$. <em>Quelle:</em> Strang, Linear Algebra and Its Applications, 4th ed. (2006), §3.3.'
                },
                {
                    q: 'Berechne $\\Gamma(5)$ und $\\Gamma(\\tfrac12)$ (Gamma-Funktion).',
                    h: '$\\Gamma(n)=(n-1)!$ für $n\\in\\mathbb N$; $\\Gamma(\\tfrac12)=\\sqrt\\pi$ folgt aus dem Gauss-Integral.',
                    s: '$\\Gamma(5)=4!=24$.<br>$\\Gamma(\\tfrac12)=\\int_0^\\infty t^{-1/2}e^{-t}dt$; Substitution $t=u^2$ liefert $2\\int_0^\\infty e^{-u^2}du=\\sqrt\\pi$.<br>$$\\boxed{\\Gamma(5)=24,\\ \\Gamma(\\tfrac12)=\\sqrt\\pi}$$ <em>Quelle:</em> Bronstein/Semendjajew, 12. Aufl. (2024), §8.2.5.'
                }
            ]
        ]
    };
})();
