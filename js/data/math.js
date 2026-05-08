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
            Eigenwerte: $\det(A-\lambda I)=0$<br>
            Cramer: $x_i=\det A_i/\det A$<br>
            Skalarprodukt: $\vec a\cdot\vec b=|\vec a||\vec b|\cos\theta$<br><br>
            <strong>Vektoranalysis</strong><br>
            Rotation: $\operatorname{rot}\vec F=\nabla\times\vec F$<br>
            Stokes: $\oint_{\partial S}\vec F\cdot d\vec r=\iint_S(\nabla\times\vec F)\cdot d\vec A$<br>
            Gauß: $\oiint\vec F\cdot d\vec A=\iiint\nabla\cdot\vec F\,dV$<br><br>
            <strong>Funktionentheorie</strong><br>
            Cauchy-Integralformel: $f(z_0)=\dfrac{1}{2\pi j}\oint_C\dfrac{f(z)}{z-z_0}dz$<br>
            Parseval: $\tfrac{1}{2\pi}\!\int_{-\pi}^{\pi}|f|^2 dx=\tfrac{a_0^2}{4}+\tfrac12\sum(a_n^2+b_n^2)$<br><br>
            <strong>Reihen-Konvergenz</strong><br>
            Quotient: $\lim|a_{n+1}/a_n|<1\Rightarrow$ konvergent<br>
            Wurzel: $\lim\sqrt[n]{|a_n|}<1\Rightarrow$ konvergent
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
                    q: 'Bestimme den Winkel zwischen $\vec a=(1,2,2)$ und $\vec b=(2,0,1)$.',
                    h: '$\cos\theta=\dfrac{\vec a\cdot\vec b}{|\vec a||\vec b|}$.',
                    s: '$\vec a\cdot\vec b = 1\cdot 2+2\cdot 0+2\cdot 1 = 4$.<br>$|\vec a|=\sqrt{1+4+4}=3$, $|\vec b|=\sqrt{4+0+1}=\sqrt 5$.<br>$\cos\theta = 4/(3\sqrt 5)\approx 0{,}596$.<br>$$\boxed{\theta\approx 53{,}4^\circ}$$'
                },
                {
                    q: 'Bilde die Ableitung von $f(x)=\dfrac{x^2}{x+1}$.',
                    h: 'Quotientenregel $(u/v)\'=(u\'v-uv\')/v^2$.',
                    s: '$u=x^2,\ u\'=2x$. $v=x+1,\ v\'=1$.<br>$f\'(x)=\dfrac{2x(x+1)-x^2}{(x+1)^2}=\dfrac{x^2+2x}{(x+1)^2}=\dfrac{x(x+2)}{(x+1)^2}$.<br>$$\boxed{f\'(x)=\dfrac{x(x+2)}{(x+1)^2}}$$'
                },
                {
                    q: 'Zerlege $\dfrac{1}{x(x+1)}$ in Partialbrüche.',
                    h: 'Ansatz $\dfrac{A}{x}+\dfrac{B}{x+1}$, Koeffizientenvergleich.',
                    s: '$1=A(x+1)+Bx$. Bei $x=0$: $A=1$. Bei $x=-1$: $-B=1\Rightarrow B=-1$.<br>$$\boxed{\dfrac{1}{x(x+1)}=\dfrac{1}{x}-\dfrac{1}{x+1}}$$<br>Anwendung: $\int=\ln|x|-\ln|x+1|+C$.'
                },
                {
                    q: 'Löse mit der Cramerschen Regel: $2x+y=5,\ x-y=1$.',
                    h: '$x_i=\det A_i/\det A$ mit $A_i$: $i$-te Spalte durch $\vec b$ ersetzt.',
                    s: '$\det A=\det\!\begin{pmatrix}2&1\\1&-1\end{pmatrix}=-3$.<br>$\det A_x=\det\!\begin{pmatrix}5&1\\1&-1\end{pmatrix}=-6\Rightarrow x=-6/-3=2$.<br>$\det A_y=\det\!\begin{pmatrix}2&5\\1&1\end{pmatrix}=-3\Rightarrow y=-3/-3=1$.<br>$$\boxed{x=2,\ y=1}$$'                }
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
                    s: '$u=x\\Rightarrow u\'=1$. $v\'=e^{-x}\\Rightarrow v=-e^{-x}$.<br>$\\int x e^{-x}dx = -xe^{-x} - \\int(-e^{-x})dx = -xe^{-x} - e^{-x} + C$.<br>$$\\boxed{=-(x+1)e^{-x}+C}$$<br>Kontrolle durch Ableiten: $\\tfrac{d}{dx}[-(x+1)e^{-x}]=-e^{-x}+(x+1)e^{-x}=xe^{-x}$. ✓'
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
                    q: 'Berechne das Doppelintegral $\iint_{\mathbb{R}^2} e^{-(x^2+y^2)}\,dA$ via Polarkoordinaten.',
                    h: '$dA=r\,dr\,d\varphi$, $x^2+y^2=r^2$.',
                    s: '$\int_0^{2\pi}\!\int_0^\infty e^{-r^2} r\,dr\,d\varphi$.<br>Inneres Integral: Substitution $u=r^2$, $du=2r\,dr\Rightarrow \tfrac12\!\int_0^\infty e^{-u}du=\tfrac12$.<br>Äußeres: $2\pi\cdot\tfrac12=\pi$.<br>$$\boxed{=\pi}$$<br>Folgerung: $\int_{-\infty}^\infty e^{-x^2}dx=\sqrt\pi$ (Gauss-Integral).'
                },
                {
                    q: 'Untersuche die Reihe $\sum_{n=1}^\infty \dfrac{n!}{n^n}$ auf Konvergenz mit dem Quotientenkriterium.',
                    h: '$L=\lim_{n\to\infty}|a_{n+1}/a_n|$. Konvergent für $L<1$.',
                    s: '$\dfrac{a_{n+1}}{a_n}=\dfrac{(n+1)!}{(n+1)^{n+1}}\cdot\dfrac{n^n}{n!}=\dfrac{n^n}{(n+1)^n}=\!\left(\dfrac{n}{n+1}\right)^{\!n}$.<br>$\lim_{n\to\infty}\!\left(1-\tfrac{1}{n+1}\right)^{\!n}=1/e\approx 0{,}368<1$.<br>$$\boxed{\text{konvergent}}$$'
                },
                {
                    q: 'Bestimme die Hesse-Matrix von $f(x,y)=x^3+xy^2-3x$ und klassifiziere den kritischen Punkt $(1,0)$.',
                    h: '$\nabla f=0$ liefert kritische Punkte. Hesse $H$, Definitheit über Eigenwerte/Determinante.',
                    s: '$\nabla f=(3x^2+y^2-3,\ 2xy)$. Bei $(1,0)$: $(0,0)$ ✓.<br>$H=\begin{pmatrix}6x & 2y\\ 2y & 2x\end{pmatrix}$. Bei $(1,0)$: $\begin{pmatrix}6&0\\0&2\end{pmatrix}$.<br>EW: $6,2 > 0$ $\Rightarrow$ positiv definit $\Rightarrow$ <strong>lokales Minimum</strong>.<br>$$\boxed{(1,0)\ \text{lokales Minimum}}$$'
                },
                {
                    q: 'Berechne $\int_0^\infty x\,e^{-x^2}\,dx$.',
                    h: 'Substitution $u=x^2$.',
                    s: '$u=x^2\Rightarrow du=2x\,dx$. $\int_0^\infty x e^{-x^2}dx=\tfrac12\!\int_0^\infty e^{-u}du=\tfrac12[-e^{-u}]_0^\infty=\tfrac12$.<br>$$\boxed{=\tfrac12}$$'                }
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
                    q: 'Wende die Cauchy-Integralformel an: $\oint_{|z|=2}\dfrac{e^z}{z-1}\,dz$.',
                    h: '$f(z_0)=\dfrac{1}{2\pi j}\oint\dfrac{f(z)}{z-z_0}dz$, also $\oint=2\pi j\,f(z_0)$, falls $z_0$ innen.',
                    s: '$f(z)=e^z$ analytisch in $|z|\le 2$. $z_0=1$ liegt innerhalb.<br>$\oint = 2\pi j\cdot e^1 = 2\pi e\,j$.<br>$$\boxed{=2\pi e\,j\approx 17{,}08\,j}$$'
                },
                {
                    q: 'Anwendung des Stokes-Theorems: berechne $\oint_C \vec F\cdot d\vec r$ für $\vec F=(-y,x,0)$ über den Einheitskreis in der $xy$-Ebene.',
                    h: 'Stokes: $\oint=\iint_S(\nabla\times\vec F)\cdot d\vec A$. Hier $d\vec A=\hat z\,dA$.',
                    s: '$\nabla\times\vec F=(\partial_y 0-\partial_z x,\,\partial_z(-y)-\partial_x 0,\,\partial_x x-\partial_y(-y))=(0,0,2)$.<br>$(\nabla\times\vec F)\cdot\hat z = 2$. $\iint_S 2\,dA = 2\cdot\pi\cdot 1^2 = 2\pi$.<br>$$\boxed{=2\pi}$$'
                },
                {
                    q: 'Wärmeleitungsgleichung $u_t=u_{xx}$, $0<x<L$, $u(0,t)=u(L,t)=0$, $u(x,0)=\sin(\pi x/L)$. Bestimme $u(x,t)$ via Separation.',
                    h: 'Ansatz $u=X(x)T(t)$. Eigenwerte $\lambda_n=(n\pi/L)^2$.',
                    s: 'Separation: $T\'/T = X\'\'/X = -\lambda$.<br>$X_n(x)=\sin(n\pi x/L)$, $T_n(t)=e^{-(n\pi/L)^2 t}$.<br>Anfangsbedingung passt nur zu $n=1$.<br>$$\boxed{u(x,t)=\sin(\pi x/L)\,e^{-(\pi/L)^2 t}}$$<br>Interpretation: höhere Moden klingen schneller ab.'
                },
                {
                    q: 'Berechne $\int_{-\infty}^\infty \dfrac{1}{1+x^2}\,dx$ mit Hilfe des Residuensatzes (oberer Halbkreis).',
                    h: 'Pol bei $z=j$ in oberer Halbebene. $\operatorname{Res}_{j}=\lim_{z\to j}(z-j)\cdot\dfrac{1}{(z-j)(z+j)}$.',
                    s: '$\operatorname{Res}_{z=j}=\dfrac{1}{2j}$. Halbkreis-Beitrag verschwindet ($|f|\sim 1/R^2$). $\Rightarrow \int = 2\pi j\cdot\dfrac{1}{2j}=\pi$.<br>$$\boxed{=\pi}$$<br>Konsistent mit elementarem Resultat $\arctan x|_{-\infty}^\infty=\pi$.'                }
            ]
        ]
    };
})();
