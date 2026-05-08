/* Neuronale Netze */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'neural_nets';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Neuronale Netze',
        desc: 'Künstliche Neuronen, Aktivierungsfunktionen, Feedforward-Netze, Backpropagation, Gradientenabstieg, Regularisierung.',
        formulas: `
            <strong>Künstliches Neuron</strong><br>
            $z = \\sum_i w_i x_i + b$, $\\ y = \\phi(z)$<br><br>
            <strong>Aktivierungsfunktionen</strong><br>
            Sigmoid: $\\sigma(z)=1/(1+e^{-z})$, $\\sigma'=\\sigma(1-\\sigma)$<br>
            Tanh: $\\tanh(z)=(e^z-e^{-z})/(e^z+e^{-z})$, $\\tanh'=1-\\tanh^2$<br>
            ReLU: $\\max(0,z)$, Ableitung: $1$ falls $z>0$ sonst $0$<br>
            Softmax: $s_i=e^{z_i}/\\sum_j e^{z_j}$<br><br>
            <strong>Verlustfunktionen</strong><br>
            MSE: $E=\\tfrac{1}{2}(y-t)^2$<br>
            Cross-Entropy (binär): $E=-(t\\ln y + (1-t)\\ln(1-y))$<br>
            Cross-Entropy (kategorial): $E=-\\sum_i t_i \\ln s_i$<br><br>
            <strong>Backpropagation</strong><br>
            $\\delta^{(L)}=\\nabla_a E\\odot \\phi'(z^{(L)})$<br>
            $\\delta^{(l)}=((W^{(l+1)})^T\\delta^{(l+1)})\\odot \\phi'(z^{(l)})$<br>
            $\\partial E/\\partial W^{(l)}=\\delta^{(l)}(a^{(l-1)})^T$, $\\partial E/\\partial b^{(l)}=\\delta^{(l)}$<br><br>
            <strong>Gradient Descent</strong><br>
            $w \\leftarrow w - \\eta\\,\\nabla_w E$<br>
            Adam: adaptive Lernrate aus 1./2. Moment des Gradienten<br><br>
            <strong>Dropout (Inverted)</strong><br>
            Training: $a_i \\leftarrow a_i\\cdot m_i / (1-p)$, $m_i\\sim\\mathrm{Bernoulli}(1-p)$. Inferenz: identisch<br><br>
            <strong>RNN-Update</strong><br>
            $h_t = \\phi(W_h h_{t-1} + W_x x_t + b)$, BPTT durch Zeitachse<br><br>
            <strong>LSTM-Gates</strong><br>
            $f,i,o = \\sigma(\\dots)$, $\\tilde c=\\tanh(\\dots)$, $c_t = f\\odot c_{t-1}+i\\odot\\tilde c$, $h_t=o\\odot \\tanh c_t$<br><br>
            <strong>Self-Attention (Transformer)</strong><br>
            $\\text{Att}(Q,K,V)=\\mathrm{softmax}(QK^T/\\sqrt{d_k})V$<br><br>
            <strong>L1- vs. L2-Regularisierung</strong><br>
            L1 fördert Sparsity (manche $w_i=0$), L2 schrumpft alle gleichmäßig (Weight Decay)
        `,
        levels: [
            // L1
            [
                {
                    q: 'Berechne den Output eines Neurons mit Eingängen $x_1=2,x_2=3$, Gewichten $w_1=0{,}5,w_2=-1$, Bias $b=1$, Aktivierung ReLU.',
                    h: '$z=\\sum w_i x_i+b$, $y=\\max(0,z)$.',
                    s: '$z=0{,}5\\cdot 2 + (-1)\\cdot 3 + 1 = 1-3+1=-1$.<br>$y=\\max(0,-1)=0$.<br>$$\\boxed{y=0}$$ (Neuron inaktiv).'
                },
                {
                    q: 'Sigmoid: berechne $\\sigma(0)$ und $\\sigma\'(0)$.',
                    h: '$\\sigma(0)=1/2$, $\\sigma\'(z)=\\sigma(z)(1-\\sigma(z))$.',
                    s: '$\\sigma(0)=1/(1+1)=0{,}5$. $\\sigma\'(0)=0{,}5\\cdot 0{,}5=0{,}25$.<br>$$\\boxed{\\sigma(0)=0{,}5,\\ \\sigma\'(0)=0{,}25}$$ Maximum der Ableitung bei $z=0$.'
                },
                {
                    q: 'Eine Schicht: $W=\\begin{pmatrix}1&2\\\\-1&0\\end{pmatrix}$, $x=(1,2)^T$, Bias $b=(0,1)^T$, Aktivierung linear. Berechne den Schichtausgang.',
                    h: '$a=Wx+b$.',
                    s: '$Wx=\\begin{pmatrix}1\\cdot 1+2\\cdot 2\\\\ -1\\cdot 1+0\\cdot 2\\end{pmatrix}=\\begin{pmatrix}5\\\\-1\\end{pmatrix}$. $+b=\\begin{pmatrix}5\\\\0\\end{pmatrix}$.<br>$$\\boxed{a=(5,\\ 0)^T}$$'
                },
                {
                    q: 'Ein Output-Neuron mit MSE-Verlust: $E=\\tfrac12(y-t)^2$, $y=wx$. Berechne $\\partial E/\\partial w$ via Kettenregel.',
                    h: 'Kettenregel: $\\partial E/\\partial w = (\\partial E/\\partial y)(\\partial y/\\partial w)$.',
                    s: '$\\partial E/\\partial y = (y-t)$.<br>$\\partial y/\\partial w = x$.<br>$$\\boxed{\\partial E/\\partial w=(y-t)\\,x}$$ Damit Update: $w\\leftarrow w - \\eta(y-t)x$ (Delta-Regel).'
                },
                {
                    q: 'Klassifiziere die Aktivierungsfunktionen nach ihrem Wertebereich: Sigmoid, Tanh, ReLU, Softmax.',
                    h: 'Wertebereich der Funktion bestimmen.',
                    s: '<table class="text-sm"><tr><th>Funktion</th><th>Wertebereich</th></tr><tr><td>Sigmoid</td><td>$(0,1)$</td></tr><tr><td>Tanh</td><td>$(-1,1)$</td></tr><tr><td>ReLU</td><td>$[0,\\infty)$</td></tr><tr><td>Softmax</td><td>$(0,1)$, Summe=1 (Wahrscheinlichkeitsverteilung)</td></tr></table>'
                },
                {
                    q: 'Wieso wird in tiefen Netzen meist ReLU statt Sigmoid eingesetzt?',
                    h: 'Vanishing Gradient.',
                    s: 'Sigmoid sättigt für $|z|\\gg 0$ ($\\sigma\'\\to 0$) $\\Rightarrow$ Gradienten werden in tieferen Schichten exponentiell klein (<strong>Vanishing Gradient</strong>). ReLU hat konstante Ableitung 1 für $z>0$ $\\Rightarrow$ Gradienten klingen nicht ab. Vorteile auch: einfache Berechnung, sparse Aktivierung.<br>Nachteil ReLU: "Dying ReLU" für $z<0$. Lösungen: Leaky ReLU, ELU, GELU.'
                },
                {
                    q: 'Berechne den binären Cross-Entropy-Verlust $E=-(t\\ln y + (1-t)\\ln(1-y))$ für $t=1$ und $y=0{,}9$.',
                    h: 'Nur ein Term aktiv bei One-Hot.',
                    s: '$E = -(1\\cdot \\ln 0{,}9 + 0\\cdot \\ln 0{,}1) = -\\ln 0{,}9 \\approx 0{,}105$.<br>$$\\boxed{E\\approx 0{,}105}$$ Falls $y=0{,}1$ wäre: $E=-\\ln 0{,}1\\approx 2{,}303$ — viel höhere Strafe für sicher-falsche Vorhersage (asymmetrisch).'
                },
                {
                    q: 'Welcher Wertebereich kommt bei Softmax raus, und wie groß ist die Summe der Ausgaben?',
                    h: 'Wahrscheinlichkeitsverteilung.',
                    s: '$s_i = e^{z_i}/\\sum_j e^{z_j} \\in (0,1)$.<br>$\\sum_i s_i = \\sum_i e^{z_i}/\\sum_j e^{z_j} = 1$.<br>$$\\boxed{s_i\\in (0,1),\\ \\sum s_i=1}$$ Daher als Klassifikations-Output (Wahrscheinlichkeitsverteilung über $K$ Klassen) verwendet.'
                },
                {
                    q: 'Was ist Overfitting, und welche zwei Indikatoren erkennt man im Lernkurven-Diagramm?',
                    h: 'Train-Loss vs. Val-Loss-Verlauf.',
                    s: 'Overfitting: Modell lernt Trainingsdaten auswendig statt zu generalisieren.<br>Indikatoren: 1) Trainings-Loss sinkt weiter, während <strong>Validierungs-Loss steigt</strong>. 2) Große Lücke zwischen Trainings-Acc und Val-Acc.<br>Gegenmaßnahmen: Regularisierung (L1/L2), Dropout, Data Augmentation, Early Stopping, mehr Daten, kleineres Modell.'
                },
                {
                    q: 'Wie viele Parameter hat eine Fully-Connected-Schicht mit 100 Eingängen und 50 Ausgängen?',
                    h: 'Gewichte + Biases.',
                    s: 'Gewichte: $100\\cdot 50 = 5000$.<br>Biases: $50$.<br>Gesamt: $5050$ Parameter.<br>$$\\boxed{5050}$$ Allgemein: $n_{in}\\cdot n_{out} + n_{out}$.'
                }
            ],
            // L2
            [
                {
                    q: 'Berechne $\\partial E/\\partial w$ für ein Neuron $y=\\sigma(wx+b)$ mit MSE-Verlust und Eingangs-/Zielwerten $x=2,t=1,w=0{,}5,b=0$.',
                    h: 'Kettenregel: $\\partial E/\\partial w = (y-t)\\sigma\'(z)\\cdot x$.',
                    s: '$z=0{,}5\\cdot 2+0=1$. $y=\\sigma(1)=1/(1+e^{-1})\\approx 0{,}731$.<br>$\\sigma\'(z)=y(1-y)\\approx 0{,}731\\cdot 0{,}269=0{,}197$.<br>$\\partial E/\\partial w=(0{,}731-1)\\cdot 0{,}197\\cdot 2 \\approx -0{,}1059$.<br>$$\\boxed{\\partial E/\\partial w\\approx -0{,}106}$$ Mit $\\eta=0{,}1$: $w\\leftarrow 0{,}5 - 0{,}1\\cdot(-0{,}106)=0{,}511$.'
                },
                {
                    q: 'Softmax + Cross-Entropy: warum vereinfacht sich der Gradient zu $\\partial E/\\partial z_i = s_i - t_i$?',
                    h: 'Direktes Ableiten der Komposition; viele Terme heben sich auf.',
                    s: '$E=-\\sum_k t_k\\ln s_k$. Mit $s_i=e^{z_i}/Z$, $Z=\\sum_j e^{z_j}$:<br>$\\partial s_k/\\partial z_i = s_k(\\delta_{ki}-s_i)$.<br>$\\partial E/\\partial z_i = -\\sum_k t_k \\cdot \\frac{1}{s_k}\\cdot s_k(\\delta_{ki}-s_i) = -\\sum_k t_k(\\delta_{ki}-s_i) = -t_i + s_i\\sum_k t_k$.<br>One-Hot Target: $\\sum t_k = 1$, also $\\partial E/\\partial z_i = s_i - t_i$. ∎<br>$$\\boxed{\\partial E/\\partial z_i = s_i - t_i}$$ Numerisch sehr stabil, deshalb in Frameworks als zusammengefasstes Op.'
                },
                {
                    q: 'Forward-Pass eines 2-Schicht-Netzes: $W^{(1)}=\\begin{pmatrix}1&-1\\\\0&2\\end{pmatrix}$, $b^{(1)}=(0,0)$, ReLU; $W^{(2)}=(1,\\,1)$, $b^{(2)}=0$, linear. Eingang $x=(1,2)^T$.',
                    h: '$z^{(1)}=W^{(1)}x+b^{(1)}$, $a^{(1)}=\\text{ReLU}(z^{(1)})$, $y=W^{(2)}a^{(1)}+b^{(2)}$.',
                    s: '$z^{(1)}=(1\\cdot 1-1\\cdot 2,\\ 0\\cdot 1+2\\cdot 2)^T=(-1,\\ 4)^T$.<br>$a^{(1)}=(\\max(0,-1),\\max(0,4))=(0,4)^T$.<br>$y = 1\\cdot 0 + 1\\cdot 4 = 4$.<br>$$\\boxed{y=4}$$'
                },
                {
                    q: 'Welche Initialisierung empfiehlt sich bei ReLU-Aktivierungen, um den Gradient-Fluss zu erhalten?',
                    h: 'He-Initialisierung.',
                    s: '<strong>He-Initialisierung</strong>: $w \\sim \\mathcal{N}(0,\\ 2/n_{in})$ ($n_{in}$ = Anzahl Eingänge in das Neuron).<br>Begründung: ReLU "halbiert" die Varianz (negative Hälfte abgeschnitten); Faktor 2 kompensiert.<br>Für tanh/sigmoid: <strong>Xavier/Glorot</strong> $w\\sim\\mathcal{N}(0,\\ 1/n_{in})$.'
                },
                {
                    q: 'Erkläre die Idee von L2-Regularisierung und warum sie Overfitting reduziert.',
                    h: 'Strafterm in Verlustfunktion.',
                    s: '$E_{reg}=E + \\lambda\\sum_i w_i^2$ (Weight Decay).<br>Update bekommt Term $-\\eta\\cdot 2\\lambda w$, was Gewichte zur Null hin schrumpft. Ergebnis: glattere Funktionen, weniger Sensitivität gegenüber Rauschen, bessere Generalisierung.<br>Bayesianische Sicht: entspricht Gauss-Prior auf Gewichte (MAP-Schätzung).'
                },
                {
                    q: 'Stochastic Gradient Descent (SGD) mit Mini-Batch-Größe 32: was sind Vor- und Nachteile gegenüber Batch-Gradient-Descent (alles auf einmal)?',
                    h: 'Schätz-Varianz vs. Effizienz vs. Generalisierung.',
                    s: '<strong>Vorteile Mini-Batch</strong>: deutlich schneller (vektorisierte GPU-Operationen), passender Speicherverbrauch, Rauschen im Gradient hilft beim Verlassen schlechter lokaler Minima/Sattelpunkte (impliziter Regularisierungseffekt).<br><strong>Nachteile</strong>: ungenauerer Schätzer pro Schritt, Lernrate sensibel.<br>Empirisch: typische Batchgrößen 32–512; größere Batches benötigen oft proportional größere Lernraten und Warmup-Phasen.'
                },
                {
                    q: 'Inverted Dropout: bei Training-Dropout-Rate $p=0{,}25$, was wird mit den Aktivierungen während Training gemacht und was bei Inferenz?',
                    h: 'Skalierung erfolgt während Training, Inferenz unverändert.',
                    s: '<strong>Training</strong>: Maske $m_i\\sim\\mathrm{Bernoulli}(1-p)=\\mathrm{Bernoulli}(0{,}75)$; $a_i \\leftarrow a_i\\cdot m_i / (1-p) = a_i\\cdot m_i / 0{,}75$.<br>Erwartung pro Aktivierung bleibt gleich: $\\mathbb{E}[a_i\\cdot m_i/(1-p)] = a_i\\cdot 0{,}75/0{,}75 = a_i$.<br><strong>Inferenz</strong>: keinerlei Skalierung, keine Maske $\\Rightarrow$ deterministische, stabile Vorhersage. Vorteil ggü. klassischem Dropout: kein Modellumstellen zur Inferenz nötig.'
                },
                {
                    q: 'L1 vs. L2-Regularisierung: welcher Strafterm, welcher Effekt auf die Gewichte?',
                    h: 'L1: $\\sum|w_i|$. L2: $\\sum w_i^2$.',
                    s: '<strong>L1</strong>: $\\lambda\\sum|w_i|$, Gradient = $\\lambda\\,\\text{sign}(w_i)$ (konstant). Treibt kleine Gewichte exakt auf Null $\\Rightarrow$ <strong>Sparsity</strong> (eingebaute Feature-Auswahl).<br><strong>L2</strong>: $\\lambda\\sum w_i^2$, Gradient = $2\\lambda w_i$ (proportional). Schrumpft alle Gewichte gleichmäßig, aber selten exakt auf 0. Glättere Lösungen.<br>Kombination = Elastic Net: $\\alpha\\|w\\|_1 + (1-\\alpha)\\|w\\|_2^2$.'
                },
                {
                    q: 'Lernrate-Schedule: warum verwendet man Learning-Rate-Decay (z.B. Cosine oder StepLR), und was sind typische Schemata?',
                    h: 'Anfangs grob, später fein.',
                    s: 'Hohe initiale Lernrate $\\eta_0$ erlaubt schnelles Konvergieren in eine Region. Reduktion erlaubt feine Optimierung im Minimum, ohne hin- und herzuspringen.<br>Schemata:<br>• <strong>Step</strong>: $\\eta\\leftarrow \\eta\\cdot \\gamma$ alle $N$ Epochen ($\\gamma=0{,}1$).<br>• <strong>Exponential</strong>: $\\eta_t = \\eta_0 e^{-\\lambda t}$.<br>• <strong>Cosine Annealing</strong>: $\\eta_t = \\eta_{min}+\\tfrac12(\\eta_0-\\eta_{min})(1+\\cos(\\pi t/T))$.<br>• <strong>Warmup + Decay</strong> (Transformer): linear hoch, danach $1/\\sqrt t$ ab.'
                },
                {
                    q: 'Self-Attention: berechne die Aufmerksamkeitsgewichte für $Q=K=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$, $d_k=2$, ohne Wertvektoren ($V=I$).',
                    h: '$\\mathrm{softmax}(QK^T/\\sqrt{d_k})$.',
                    s: '$QK^T = I$ (Einheitsmatrix).<br>Skalierung: $I/\\sqrt 2$.<br>Zeile 1: $\\mathrm{softmax}(1/\\sqrt 2,\\ 0)$. $e^{0{,}707}\\approx 2{,}03$, $e^0=1$, Summe $3{,}03$.<br>Gewichte: $(0{,}67,\\ 0{,}33)$. Analog für Zeile 2.<br>Output: $A V = A$. <strong>Diagonal-Dominanz</strong> ist erwartet: jeder Token ist sich selbst am ähnlichsten.'
                },
                {
                    q: 'Bias-Variance-Tradeoff: wie verändern sich Bias und Variance, wenn man die Modellkomplexität (Anzahl Parameter) erhöht?',
                    h: 'Underfitting vs. Overfitting.',
                    s: 'Geringe Komplexität: hoher Bias (Modell zu simpel, systematischer Fehler), niedrige Variance.<br>Hohe Komplexität: niedriger Bias, hohe Variance (Modell sehr sensitiv auf Trainingsdaten).<br>Ziel: Sweet-Spot wo Total-Error $= \\text{Bias}^2+\\text{Variance}+\\sigma^2$ minimal.<br>Moderne Erkenntnis (Double Descent): bei sehr großen, überparametrisierten Modellen kann der Test-Error nochmal sinken — entgegen klassischer U-Kurve.'
                }
            ],
            // L3
            [
                {
                    q: 'Backpropagation komplett für ein 1-1-1-Netz: $z_1=w_1 x$, $a_1=\\sigma(z_1)$, $z_2=w_2 a_1$, $y=\\sigma(z_2)$, MSE-Verlust. Bilde $\\partial E/\\partial w_1$ und $\\partial E/\\partial w_2$.',
                    h: 'Kettenregel rückwärts: $\\delta_2=(y-t)\\sigma\'(z_2)$, $\\delta_1=\\delta_2 w_2 \\sigma\'(z_1)$.',
                    s: '$E=\\tfrac12(y-t)^2$.<br>$\\delta_2 = \\partial E/\\partial z_2 = (y-t)\\sigma\'(z_2) = (y-t)\\,y(1-y)$.<br>$\\partial E/\\partial w_2 = \\delta_2\\,a_1$.<br>$\\delta_1 = \\delta_2\\cdot w_2 \\cdot \\sigma\'(z_1) = \\delta_2 w_2\\,a_1(1-a_1)$.<br>$\\partial E/\\partial w_1 = \\delta_1\\,x$.<br>$$\\boxed{\\partial E/\\partial w_2=\\delta_2 a_1,\\quad \\partial E/\\partial w_1=\\delta_1 x}$$'
                },
                {
                    q: 'Adam-Optimizer: schreibe die Update-Regel und beschreibe die Rolle der Hyperparameter $\\beta_1, \\beta_2, \\epsilon$.',
                    h: 'Erstes und zweites Moment des Gradienten exponentiell glätten.',
                    s: '$m_t = \\beta_1 m_{t-1}+(1-\\beta_1)g_t$ (1. Moment).<br>$v_t = \\beta_2 v_{t-1}+(1-\\beta_2)g_t^2$ (2. Moment).<br>Bias-Korrektur: $\\hat m_t=m_t/(1-\\beta_1^t)$, $\\hat v_t=v_t/(1-\\beta_2^t)$.<br>Update: $w \\leftarrow w - \\eta\\,\\hat m_t/(\\sqrt{\\hat v_t}+\\epsilon)$.<br>Default: $\\beta_1=0{,}9,\\ \\beta_2=0{,}999,\\ \\epsilon=10^{-8}$. Effekt: Lernrate adaptiv pro Parameter, robust gegenüber Skalierung der Gradienten.'
                },
                {
                    q: 'Universal Approximation Theorem: was sagt das Theorem aus und welche Bedingungen sind nötig?',
                    h: 'Aussage über Mächtigkeit von Feedforward-Netzen.',
                    s: 'Hornik (1989): Ein Feedforward-Netz mit <strong>einer</strong> verborgenen Schicht und nichtlinearer, nichtkonstanter, beschränkter Aktivierung kann jede stetige Funktion auf einem Kompaktum beliebig genau approximieren — vorausgesetzt, ausreichend viele Neuronen.<br>Wichtig: das Theorem garantiert Existenz, aber nicht Lernbarkeit (kein Aussage über Trainings-Algorithmus oder Sample-Efficiency). In der Praxis sind tiefe Netze mit weniger Parametern oft effizienter als sehr breite flache.'
                },
                {
                    q: 'Convolution-Layer: berechne die Output-Größe einer 2D-Convolution mit Input $32\\times 32\\times 3$, $K=64$ Filtern der Größe $5\\times 5$, Padding $P=2$, Stride $S=1$.',
                    h: 'Output-Größe: $(W-F+2P)/S+1$.',
                    s: '$(32-5+2\\cdot 2)/1+1 = 32$. Tiefe = #Filter = 64.<br>$$\\boxed{32\\times 32\\times 64}$$ Padding "same"-Mode hält die räumliche Größe.<br>Anzahl Parameter: $5\\cdot 5\\cdot 3\\cdot 64 + 64 = 4864$.'
                },
                {
                    q: 'Berechne den effektiven Rezeptivbereich (Receptive Field) nach 3 hintereinander geschalteten 3×3-Convolutions (Stride 1).',
                    h: 'Pro 3×3-Conv vergrößert sich der RF um 2 in jeder Richtung.',
                    s: 'Layer 1: $3\\times 3$. Layer 2: $5\\times 5$. Layer 3: $7\\times 7$.<br>Allgemein: $RF_n = RF_{n-1} + (k-1)\\prod_{i<n}s_i$. Drei 3×3-Convs sind parameter-effizienter als eine 7×7 ($3\\cdot 9=27$ vs. $49$ Parameter pro Kanal) bei gleichem RF und mehr Nichtlinearitäten.<br>$$\\boxed{RF=7\\times 7}$$'
                },
                {
                    q: 'Batch-Normalisierung: beschreibe die Operation pro Mini-Batch und ihre Auswirkungen auf Training.',
                    h: 'Standardisieren über Batch-Achse, anschließend lernbare $\\gamma,\\beta$.',
                    s: 'Pro Aktivierung im Mini-Batch:<br>$\\mu_B=\\tfrac1m\\sum x_i$, $\\sigma_B^2=\\tfrac1m\\sum(x_i-\\mu_B)^2$.<br>$\\hat x_i=(x_i-\\mu_B)/\\sqrt{\\sigma_B^2+\\epsilon}$.<br>$y_i = \\gamma\\hat x_i + \\beta$ (lernbar).<br>Effekte: stabilisiert Training (geringerer Internal Covariate Shift), erlaubt höhere Lernraten, hat leichten Regularisierungseffekt durch Batch-Rauschen, reduziert Sensitivität gegen Initialisierung.<br>Im Inferenzmodus werden gleitende Mittelwerte aus Training verwendet.'
                },
                {
                    q: 'RNN Vanishing/Exploding Gradient: warum tritt das Problem in BPTT besonders auf, und welche Architektur löst es?',
                    h: 'Produkt vieler Jacobi-Matrizen über Zeitachse.',
                    s: 'Bei BPTT propagiert der Gradient durch $T$ Zeitschritte: $\\partial L/\\partial h_0 = \\prod_{t=1}^T (\\partial h_t/\\partial h_{t-1})$. Bei wiederholter Multiplikation einer Matrix mit Spektralradius $\\rho$: <br>• $\\rho<1$: Gradient $\\to 0$ (Vanishing) — frühe Schritte unbeeinflusst.<br>• $\\rho>1$: Gradient $\\to\\infty$ (Exploding).<br><strong>Lösung: LSTM/GRU</strong> mit additivem Cell-State und multiplikativen Gates: $c_t = f_t\\odot c_{t-1} + i_t\\odot \\tilde c_t$. Dadurch direkter Pfad ohne Sättigungsmultiplikation; Forget-Gate kann $f_t\\approx 1$ lernen $\\Rightarrow$ konstantes Gradientenfließen ("Constant Error Carousel").<br>Zusätzlich: Gradient Clipping gegen Exploding.'
                },
                {
                    q: 'Transformer Self-Attention vs. RNN: welche Vorteile bei Langzeit-Abhängigkeiten, welche Nachteile bei langen Sequenzen?',
                    h: 'Pfad-Länge vs. Komplexität.',
                    s: '<strong>Vorteile</strong>: jede Position hat $O(1)$ Pfad-Länge zu jeder anderen (RNN: $O(n)$) $\\Rightarrow$ Langzeit-Abhängigkeiten leichter lernbar. Vollständige Parallelisierung (RNN: sequentiell).<br><strong>Nachteile</strong>: Aufmerksamkeit-Matrix ist $n\\times n \\Rightarrow O(n^2)$ Speicher und Zeit pro Layer; bei langen Texten/Bildern teuer.<br>Mitigations: Sparse Attention (Longformer), FlashAttention (Speicher-effiziente Implementierung), Linear Attention (Performer), State-Space-Modelle (Mamba) mit $O(n)$.'
                },
                {
                    q: 'Knowledge Distillation: wie wird ein kleines "Student"-Netz von einem großen "Teacher"-Netz trainiert? Welche Loss-Funktion wird üblicherweise eingesetzt?',
                    h: 'Soft Targets vs. Hard Labels, Temperaturskalierung.',
                    s: 'Teacher liefert Soft-Probabilities $p_T = \\mathrm{softmax}(z_T/T)$ mit Temperatur $T>1$ (verteilt Wahrscheinlichkeitsmasse glatter $\\Rightarrow$ "Dark Knowledge" über Klassenverhältnisse).<br>Loss = $\\alpha\\cdot \\text{CE}(p_S, y)$ (echte Labels) $+ (1-\\alpha)\\cdot T^2\\cdot \\mathrm{KL}(p_T\\|p_S)$ (Soft-Match).<br>Student lernt nicht nur "ist Klasse 5", sondern auch "Klasse 3 ist ähnlicher als Klasse 7" $\\Rightarrow$ bessere Generalisierung als Training nur auf Hard-Labels. Beispiele: DistilBERT (40 % kleiner, 97 % Performance).'
                },
                {
                    q: 'GAN-Verlust (Original Goodfellow): schreibe das Min-Max-Spiel und erkläre Mode Collapse.',
                    h: 'Discriminator vs. Generator, Wasserstein-Variante als Mitigation.',
                    s: 'Original-GAN:<br>$\\min_G\\max_D \\mathbb{E}_{x\\sim p_{data}}[\\log D(x)] + \\mathbb{E}_{z\\sim p_z}[\\log(1-D(G(z)))]$.<br>Discriminator $D$ maximiert Klassifikation echt/fake; Generator $G$ minimiert (will $D$ täuschen).<br><strong>Mode Collapse</strong>: $G$ findet eine kleine Menge Outputs, die $D$ überzeugen, und ignoriert die Diversität von $p_{data}$. Symptom: alle generierten Bilder sehen gleich aus.<br>Mitigation: <em>WGAN-GP</em> (Wasserstein-Loss + Gradient-Penalty), <em>Spectral Norm</em>, Mini-Batch-Discrimination, Unrolled GANs.'
                },
                {
                    q: 'Diffusion-Modelle: skizziere Forward- und Reverse-Prozess. Welcher Loss wird trainiert?',
                    h: 'Schrittweise Rauschen hinzufügen / entfernen.',
                    s: '<strong>Forward</strong>: $q(x_t|x_{t-1}) = \\mathcal{N}(x_t;\\,\\sqrt{1-\\beta_t}\\,x_{t-1},\\,\\beta_t I)$ — fügt schrittweise Gauß-Rauschen hinzu, bis $x_T \\approx \\mathcal{N}(0,I)$ nach $T$ Schritten ($T\\sim 1000$).<br><strong>Reverse</strong>: parametrisiertes Netz $\\epsilon_\\theta(x_t,t)$ lernt, das Rauschen zu schätzen. Sampling: $x_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}}(x_t - \\frac{\\beta_t}{\\sqrt{1-\\bar\\alpha_t}}\\epsilon_\\theta) + \\sigma_t z$.<br><strong>Loss (DDPM, simplified)</strong>: $L = \\mathbb{E}_{t,x_0,\\epsilon}\\|\\epsilon - \\epsilon_\\theta(\\sqrt{\\bar\\alpha_t}x_0+\\sqrt{1-\\bar\\alpha_t}\\epsilon,\\,t)\\|^2$. Sehr stabil im Training (kein Min-Max wie GAN), höchste Bildqualität (Stable Diffusion, DALL-E 3, Sora).'
                }
            ]
        ]
    };
})();
