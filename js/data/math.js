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
            Eigenwerte: $\\det(A-\\lambda I)=0$
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
                    s: 'Erweitern: $\\dfrac{\\sin(3x)}{x}=3\\cdot\\dfrac{\\sin(3x)}{3x}\\xrightarrow{x\\to 0} 3\\cdot 1 = 3$.<br>$$\\boxed{=3}$$'
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
                    s: 'Gradient: $\\nabla f=(2xy,\\,x^2,\\,1)$.<br>Divergenz: $\\operatorname{div}\\vec F = y + 2y + x = x+3y$.<br>$$\\boxed{\\nabla f=(2xy, x^2, 1),\\quad \\operatorname{div}\\vec F=x+3y}$$'
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
                    s: '$\\operatorname{Res}_{z=1}=\\dfrac{1}{1+1}=\\tfrac12$. $\\operatorname{Res}_{z=-1}=\\dfrac{1}{-1-1}=-\\tfrac12$.<br>Summe: $0$. Nach Residuensatz $\\oint = 2\\pi j\\cdot\\sum\\operatorname{Res}=0$.<br>$$\\boxed{=0}$$'
                }
            ]
        ]
    };
})();
