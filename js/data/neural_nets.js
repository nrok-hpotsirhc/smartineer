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
                },
                {
                    q: 'Was unterscheidet die <strong>Tanh</strong>- von der Sigmoid-Aktivierung, und warum wird Tanh in versteckten Schichten haeufig bevorzugt?',
                    h: 'Wertebereich und Mittelwert.',
                    s: 'Sigmoid: $\\sigma(x)=1/(1+e^{-x})$, Wertebereich $(0,1)$, Mittelwert $\\approx 0{,}5$.<br>Tanh: $\\tanh(x)=(e^x-e^{-x})/(e^x+e^{-x})$, Wertebereich $(-1,1)$, Mittelwert $\\approx 0$.<br>Tanh ist null-zentriert $\\Rightarrow$ Gradient durchlaeuft positive/negative Werte symmetrisch, beschleunigt Konvergenz in flachen Netzen.<br>Beide saettigen jedoch fuer grosse $|x|$ ($\\sigma\u2019,\\tanh\u2019\\to 0$) und leiden am Vanishing-Gradient-Problem in tiefen Netzen $\\Rightarrow$ in modernen Netzen meist durch ReLU ersetzt.<br>Quelle: Goodfellow, Bengio, Courville "Deep Learning", MIT Press 2016, §6.3.2 (Hidden Units).'
                },
                {
                    q: 'Was ist <strong>Leaky ReLU</strong>, und welches Problem von Standard-ReLU loest sie?',
                    h: 'Negativer Bereich, Dying-ReLU.',
                    s: 'ReLU: $\\mathrm{ReLU}(x)=\\max(0,x)$. Gradient ist exakt $0$ fuer $x<0$ $\\Rightarrow$ <strong>Dying-ReLU</strong>: Neuronen mit dauerhaft negativem Pre-Activation erhalten keinen Lernsignal mehr, bleiben fuer immer inaktiv.<br>Leaky ReLU: $f(x)=x$ fuer $x\\geq 0$, $f(x)=\\alpha x$ fuer $x<0$ (typ. $\\alpha=0{,}01$). Negativer Bereich behaelt kleinen Gradient $\\alpha\\neq 0$, das Neuron kann sich erholen.<br>Varianten: <em>Parametric ReLU (PReLU)</em> lernt $\\alpha$, <em>ELU</em> nutzt $\\alpha(e^x-1)$ fuer $x<0$.<br>Quelle: Maas, Hannun, Ng "Rectifier Nonlinearities Improve Neural Network Acoustic Models", ICML Workshop 2013.'
                },
                {
                    q: 'Welcher Unterschied besteht zwischen <strong>Epoche</strong>, <strong>Batch</strong> und <strong>Iteration</strong>?',
                    h: 'Datendurchlauf, Mini-Batch-Groesse, einzelner Gradientenschritt.',
                    s: '<strong>Epoche:</strong> ein vollstaendiger Durchlauf durch den gesamten Trainingsdatensatz.<br><strong>Batch (Mini-Batch):</strong> Teilmenge der Trainingsdaten, ueber die ein Gradient berechnet wird. Typische Groessen: 32, 64, 128, 256.<br><strong>Iteration:</strong> ein Gewichts-Update, also genau ein Mini-Batch-Forward+Backward+Step.<br>Beispiel: 60.000 Trainingsbilder, Batch-Groesse 100 $\\Rightarrow$ 600 Iterationen pro Epoche.<br>Wahl der Batch-Groesse: gross = stabilerer Gradient + bessere GPU-Auslastung; klein = mehr Rauschen $\\Rightarrow$ regularisierender Effekt, oft bessere Generalisierung.<br>Quelle: Goodfellow et al. "Deep Learning", MIT Press 2016, §8.1.3.'
                },
                {
                    q: 'Was ist eine <strong>Lernrate</strong>, und welche Effekte hat eine zu hohe bzw. zu niedrige Wahl?',
                    h: 'Schrittweite im Gradientenabstieg.',
                    s: 'Update-Regel: $w \\leftarrow w - \\eta\\,\\nabla_w L$. Die Lernrate $\\eta>0$ steuert die Schrittweite.<br><strong>Zu hoch:</strong> Loss oszilliert oder divergiert (Spruenge ueber das Minimum hinweg). Typisches Symptom: NaN-Loss nach wenigen Schritten.<br><strong>Zu niedrig:</strong> sehr langsame Konvergenz, Risiko in flachen Plateaus oder schlechten lokalen Minima haengenzubleiben.<br>Praxiswerte: $10^{-1}$ bis $10^{-5}$, oft mit Schedule (Warmup + Decay) kombiniert. Standardwerte: SGD $0{,}1$, Adam $3\\cdot 10^{-4}$ (Karpathys "magic learning rate").<br>Quelle: Bengio "Practical Recommendations for Gradient-Based Training of Deep Architectures", arXiv:1206.5533, 2012, §3.1.'
                },
                {
                    q: 'Welche Loss-Funktion verwendet man fuer eine <strong>Mehrklassen-Klassifikation</strong> mit Softmax-Output, und wie ist sie definiert?',
                    h: 'Kategoriale Kreuzentropie.',
                    s: 'Kategoriale Kreuzentropie (Cross-Entropy):<br>$$L = -\\sum_{i=1}^{C} y_i \\log \\hat y_i,$$<br>mit $y$ als One-Hot-Label und $\\hat y = \\mathrm{softmax}(z)$.<br>Bei One-Hot-$y$ reduziert sich das auf $L = -\\log \\hat y_{\\text{true}}$ (Negative Log Likelihood der korrekten Klasse).<br>Vorteil gegenueber MSE: Gradient skaliert nicht mit der Saettigung der Softmax $\\Rightarrow$ stabileres Training; $\\partial L/\\partial z_j = \\hat y_j - y_j$ ist sauber linear.<br>Quelle: Bishop "Pattern Recognition and Machine Learning", Springer 2006, §4.3.4 / §5.2.'
                },
                {
                    q: 'Was ist <strong>One-Hot-Encoding</strong>, und wann ist es ungeeignet?',
                    h: 'Sparse Vektor-Repraesentation kategorialer Labels.',
                    s: 'One-Hot: $C$ Klassen werden als $C$-dim Vektor kodiert, in dem genau eine Komponente $1$ ist. Beispiel fuer Klasse 2 bei $C=4$: $(0,1,0,0)$.<br>Ungeeignet, wenn:<br>(a) $C$ sehr gross ist (Vokabular mit 50.000 Tokens $\\Rightarrow$ Embeddings statt One-Hot);<br>(b) Klassen <em>ordinal</em> sind (gering/mittel/hoch) $\\Rightarrow$ besser Ordinal-Encoding;<br>(c) Klassen <em>aehnlich</em> sind (Hund vs. Wolf vs. Auto) $\\Rightarrow$ One-Hot behauptet gleichweite Distanz, was die Semantik nicht abbildet.<br>Loesung in NLP: Word Embeddings (Mikolov et al. word2vec 2013) lernen dichte Vektoren mit semantischer Naehe.<br>Quelle: Goodfellow et al. "Deep Learning", MIT Press 2016, §14.5 (Distributed Representations).'
                },
                {
                    q: 'Warum teilt man Daten in <strong>Trainings-</strong>, <strong>Validierungs-</strong> und <strong>Testset</strong> auf, und welcher typische Split wird verwendet?',
                    h: 'Optimierung vs. Hyperparameter-Wahl vs. unverzerrte Endbewertung.',
                    s: '<strong>Trainingsset:</strong> Modellgewichte werden hieraus gelernt.<br><strong>Validierungsset:</strong> Hyperparameter (Lernrate, Anzahl Layer, Regularisierung) werden hier evaluiert; Modellauswahl + Early Stopping.<br><strong>Testset:</strong> einmalige, unverzerrte Endbewertung auf nie gesehenen Daten — darf NIE fuer Modellwahl benutzt werden, sonst wird auch der Test-Score zu optimistisch.<br>Klassischer Split: 60/20/20 oder 70/15/15. Bei sehr grossen Datensaetzen (Millionen Samples) reichen 98/1/1, da auch 1 % schon zehntausende Test-Samples sind.<br>Bei kleinen Datensaetzen: <strong>k-fache Kreuzvalidierung</strong> (typ. $k=5,10$).<br>Quelle: Hastie, Tibshirani, Friedman "The Elements of Statistical Learning", 2nd ed. Springer 2009, §7.10.'
                },
                {
                    q: 'Was ist <strong>Dropout</strong>, und mit welchem Mechanismus wirkt es regularisierend?',
                    h: 'Zufaelliges Deaktivieren von Neuronen pro Forward-Pass.',
                    s: '<strong>Dropout</strong> (Srivastava et al. 2014): waehrend des Trainings wird jedes Neuron mit Wahrscheinlichkeit $p$ (typ. $0{,}1$-$0{,}5$) unabhaengig auf $0$ gesetzt; die verbleibenden Aktivierungen werden mit $1/(1-p)$ skaliert (Inverted Dropout), damit die erwartete Summe gleich bleibt.<br>Im Inferenzmodus: alle Neuronen aktiv, keine Skalierung noetig.<br><strong>Wirkmechanismus:</strong> verhindert Co-Adaptation einzelner Neuronen — das Netz darf sich nicht auf einzelne Features verlassen $\\Rightarrow$ robustere, redundante Repraesentationen. Aequivalent (approximativ) zu Ensemble von $2^N$ Sub-Netzen.<br>In modernen Transformer-Architekturen oft <strong>nach</strong> der Attention und nach jeder FFN-Schicht.<br>Quelle: Srivastava et al. "Dropout: A Simple Way to Prevent Neural Networks from Overfitting", JMLR 15 (2014), §1-3.'
                },
                {
                    q: 'Warum ist <strong>Daten-Augmentierung</strong> bei Bildern wirkungsvoll, und welche typischen Operationen werden eingesetzt?',
                    h: 'Invarianz erzwingen, Datensatz kuenstlich vergroessern.',
                    s: 'Augmentierung erzeugt aus jedem Bild syntaktisch neue Trainingsbeispiele, deren Label unveraendert bleibt. Das Netz lernt, dass diese Transformationen <em>nicht</em> zur Klasse beitragen $\\Rightarrow$ Invarianz-Lernen.<br>Standard-Operationen fuer ImageNet-aehnliche Aufgaben: horizontaler Flip, RandomCrop mit Padding, Farbjitter (Helligkeit, Kontrast, Saettigung), Rotation $\\pm 15^\\circ$, RandAugment / AutoAugment (gelernte Augmentation-Policy).<br>Fortgeschritten: <strong>Mixup</strong> (Zhang et al. ICLR 2018, lineare Interpolation zweier Bilder + Labels), <strong>CutMix</strong> (Yun ICCV 2019), <strong>RandomErasing</strong> (Zhong AAAI 2020).<br>Wirkung: bei kleinen Datensaetzen +5-15 % Top-1-Accuracy.<br>Quelle: Shorten & Khoshgoftaar "A Survey on Image Data Augmentation for Deep Learning", J. Big Data 6 (2019), §2-4.'
                },
                {
                    q: 'Was ist <strong>Max-Pooling</strong>, und welche Eigenschaften hat es im Vergleich zu Average-Pooling?',
                    h: 'Lokales Maximum statt Mittelwert.',
                    s: 'Max-Pooling: pro Pooling-Region (typ. $2\\times 2$, Stride $2$) wird das maximale Element ausgewaehlt $\\Rightarrow$ Feature-Karte wird raeumlich halbiert.<br><strong>Eigenschaften:</strong> (a) Translation-Invarianz innerhalb der Pooling-Region; (b) hebt starke Aktivierungen hervor ("Feature existiert") und ignoriert schwache; (c) keine lernbaren Parameter.<br>Average-Pooling: mittelt die Region $\\Rightarrow$ gleichmaessiger; eher fuer globale Feature-Zusammenfassung am Netzende (Global Average Pooling, He et al. ResNet 2015).<br>Trend in modernen Architekturen: viele Netze ersetzen Max-Pooling durch <strong>strided Convolutions</strong> (lernbar) oder dispense voellig (z.B. ResNet nutzt Stride-2-Convs).<br>Quelle: Scherer, Mueller, Behnke "Evaluation of Pooling Operations in CNNs for Object Recognition", ICANN 2010.'
                },
                {
                    q: 'Wie viele Parameter hat eine 2D-<strong>Convolutional-Schicht</strong> mit $C_{in}=3$ Eingangskanaelen, $C_{out}=32$ Filtern und Kernel-Groesse $3\\times 3$ (mit Bias)?',
                    h: 'Kernel-Volumen pro Filter, mal Anzahl Filter, plus Bias pro Filter.',
                    s: 'Pro Filter: $3\\times 3 \\times C_{in} = 3\\cdot 3\\cdot 3 = 27$ Gewichte.<br>Bei $C_{out}=32$ Filtern: $27\\cdot 32 = 864$ Gewichte.<br>Plus 1 Bias pro Filter: $+32$.<br>Gesamt: $$\\boxed{864 + 32 = 896 \\text{ Parameter}}$$<br>Allgemein: $(K_h\\cdot K_w\\cdot C_{in} + 1)\\cdot C_{out}$.<br>Zum Vergleich: eine FC-Schicht zwischen einem $32\\times 32\\times 3$-Bild und $32$ Neuronen haette $32\\cdot 32\\cdot 3\\cdot 32 + 32 = 98.336$ Parameter $\\Rightarrow$ Convolutions sind durch <em>Weight Sharing</em> drastisch effizienter.<br>Quelle: LeCun et al. "Gradient-Based Learning Applied to Document Recognition", Proc. IEEE 86(11), 1998, §II-B.'
                },
                {
                    q: 'Was bedeuten <strong>"valid"</strong> und <strong>"same"</strong> Padding in Convolutional-Layern?',
                    h: 'Output-Groesse vs. Eingangs-Groesse.',
                    s: '<strong>Valid Padding ($P=0$):</strong> keine Auffuellung. Output-Groesse: $W_{out} = (W_{in} - K)/S + 1$. Fuer $W_{in}=32, K=3, S=1$: $W_{out}=30$. Raeumliche Aufloesung schrumpft mit jeder Schicht.<br><strong>Same Padding ($P=(K-1)/2$ bei $S=1$):</strong> Eingangs- und Ausgangsgroesse identisch. Fuer $K=3$: $P=1$; fuer $K=5$: $P=2$; fuer $K=7$: $P=3$.<br>Bei $S>1$ ist "same" als "output size = ceil(W_in / S)" definiert.<br>In tiefen Architekturen (VGG, ResNet) ueberwiegend "same", um die raeumliche Information bis zum Pooling/Global-Average-Pooling zu erhalten.<br>Quelle: Dumoulin & Visin "A Guide to Convolution Arithmetic for Deep Learning", arXiv:1603.07285, 2016, §2.3-2.4.'
                },
                {
                    q: 'Was ist eine <strong>Embedding-Schicht</strong>, und wofuer wird sie in NLP eingesetzt?',
                    h: 'Look-up-Tabelle, dichte Vektoren statt One-Hot.',
                    s: 'Eine Embedding-Schicht ist eine Look-up-Matrix $E \\in \\mathbb{R}^{V\\times d}$, wobei $V$ die Vokabulargroesse und $d$ die Embedding-Dimension ist (typ. 128, 256, 512, 4096 fuer LLMs).<br>Eingabe: ganzzahlige Token-IDs $i \\in \\{0,\\dots,V-1\\}$. Ausgabe: $E[i,:] \\in \\mathbb{R}^d$ — eine Zeile der Matrix.<br>Aequivalent zu One-Hot-Vektor mal Matrix, aber implementiert als <em>Gather</em>-Operation $\\Rightarrow$ effizienter, da nur eine Zeile geladen wird.<br>Embeddings werden ueblicherweise <strong>mitgelernt</strong> per Backprop $\\Rightarrow$ semantisch aehnliche Tokens erhalten geometrisch aehnliche Vektoren ($\\cos(\\mathrm{embedding}(\\text{König}), \\mathrm{embedding}(\\text{Queen}))$ hoch).<br>Parameteranzahl: $V\\cdot d$. Bei LLMs (z.B. Llama-3 $V\\approx 128.000, d=4096$): $\\sim 524$ Mio. Parameter allein in der Embedding-Tabelle.<br>Quelle: Mikolov et al. "Distributed Representations of Words and Phrases", NeurIPS 2013, §2.'
                },
                {
                    q: 'Welcher Datensatz wird klassischerweise als <strong>"Hello World"</strong> der Computer Vision verwendet, und welche Baseline-Accuracy ist mit einer einfachen CNN typischerweise erreichbar?',
                    h: 'MNIST handgeschriebene Ziffern.',
                    s: '<strong>MNIST</strong> (LeCun, Cortes, Burges 1998): 60.000 Trainings- und 10.000 Test-Bilder, $28\\times 28$ Graustufen, 10 Klassen (Ziffern 0-9).<br>Baselines:<br>(a) Lineares Modell (Logistic Regression): ca. 92 % Test-Accuracy.<br>(b) Einfache 2-Layer-MLP: ca. 98 %.<br>(c) Klassische LeNet-5 CNN: ca. 99{,}2 %.<br>(d) Moderne CNNs mit Augmentierung: 99{,}7-99{,}8 % (State-of-the-Art seit 2018 nahezu saturiert).<br>MNIST gilt heute als zu einfach fuer Forschungsvergleiche $\\Rightarrow$ <em>Fashion-MNIST</em> (Xiao 2017) oder <em>CIFAR-10/100</em> (Krizhevsky 2009) als Nachfolger; <em>ImageNet</em> (Deng CVPR 2009) als grosse Benchmark mit 1.000 Klassen.<br>Quelle: LeCun, Cortes, Burges "The MNIST Database of Handwritten Digits", 1998 (Webpage); LeNet-5 in Proc. IEEE 86(11), §III.'
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
                },
                {
                    q: 'Was bewirkt <strong>L2-Regularisierung</strong> (Weight Decay) mathematisch, und wie ist sie aequivalent zu einer MAP-Schaetzung?',
                    h: 'Quadratischer Strafterm im Verlust, Gauss-Prior auf Gewichte.',
                    s: 'L2-Regularisierung: $L_{\\text{reg}} = L(w) + \\tfrac{\\lambda}{2} \\|w\\|_2^2$.<br>Gradient: $\\nabla_w L_{\\text{reg}} = \\nabla_w L + \\lambda w$ $\\Rightarrow$ Update-Regel: $w \\leftarrow (1-\\eta\\lambda) w - \\eta \\nabla_w L$ (daher der Name <em>Weight Decay</em>).<br>Wirkung: bestraft grosse Gewichte $\\Rightarrow$ glattere Entscheidungsgrenzen, weniger Overfitting. Typisch $\\lambda \\in [10^{-5},10^{-3}]$.<br><strong>Bayesianische Interpretation:</strong> aequivalent zu MAP-Schaetzung mit Gauss-Prior $w \\sim \\mathcal{N}(0, 1/\\lambda)$. Maximierung der posterioren Wahrscheinlichkeit entspricht Minimierung von $-\\log p(D|w) - \\log p(w)$, was bis auf Konstanten der L2-Form entspricht.<br>L1-Pendant ($\\lambda \\|w\\|_1$): Laplace-Prior, erzeugt <strong>spaerlich besetzte</strong> Loesungen (viele exakt $0$).<br>Quelle: Bishop "Pattern Recognition and Machine Learning", Springer 2006, §3.1.4 / §5.5.1.'
                },
                {
                    q: 'Was ist <strong>Label Smoothing</strong>, und welchen Effekt hat es auf Modellkalibrierung und Generalisierung?',
                    h: 'Soft-Labels statt One-Hot.',
                    s: 'Statt $y$ als One-Hot $\\Rightarrow$ Soft-Label: $\\tilde y_c = (1-\\epsilon)$ fuer die korrekte Klasse, $\\epsilon/(C-1)$ fuer alle anderen. Typisch $\\epsilon = 0{,}1$.<br>Cross-Entropy-Loss wird mit $\\tilde y$ statt $y$ berechnet.<br><strong>Effekte:</strong><br>(a) Verhindert, dass die Softmax-Logits gegen $\\pm\\infty$ getrieben werden, um $p \\to 1$ zu erreichen $\\Rightarrow$ besser kalibrierte Wahrscheinlichkeiten.<br>(b) Reduziert Overfitting, da das Modell nie absolute Sicherheit lernen darf.<br>(c) Verbessert Top-5-Accuracy in ImageNet typ. um $0{,}5-1$ Prozentpunkt.<br>Inzwischen Standard in Transformer-Training (Szegedy et al. "Inception-v3" 2016 hat es eingefuehrt; Vaswani et al. "Attention is All You Need" NeurIPS 2017 nutzt $\\epsilon=0{,}1$).<br>Quelle: Szegedy et al. "Rethinking the Inception Architecture for Computer Vision", CVPR 2016, §7 (Label Smoothing); Mueller, Kornblith, Hinton "When Does Label Smoothing Help?", NeurIPS 2019.'
                },
                {
                    q: 'Was ist eine <strong>Residual-Connection</strong> (ResNet), und welches mathematische Problem loest sie?',
                    h: '$h(x) = F(x) + x$ statt $h(x) = F(x)$.',
                    s: 'Klassisches Netz: jede Schicht lernt eine Abbildung $h(x) = F(x)$. Bei sehr tiefen Netzen ($>50$ Schichten) wird der Gradient durch das Produkt vieler Jacobi-Matrizen verkleinert $\\Rightarrow$ Vanishing-Gradient, paradoxes Phaenomen: das tiefere Netz erzielt <em>schlechtere</em> Trainings-Accuracy als das flachere.<br>ResNet (He et al. CVPR 2016): jede Block-Funktion lernt einen <em>Residual</em> $F(x) = h(x) - x$, sodass $h(x) = F(x) + x$. Der "+ $x$"-Term ist eine Skip-Connection und liefert einen direkten Gradientenpfad: $\\partial h/\\partial x = 1 + \\partial F/\\partial x$ $\\Rightarrow$ Gradient kann nicht verschwinden.<br>Konsequenz: 152-Layer-ResNet trainierbar, ImageNet-Top-5 $3{,}57$ % (Gewinner ILSVRC 2015). Heute Standard-Bauteil aller tiefen Architekturen (Transformer-Block enthaelt zwei Residuals).<br>Quelle: He, Zhang, Ren, Sun "Deep Residual Learning for Image Recognition", CVPR 2016, §3.'
                },
                {
                    q: 'Wo liegt der Unterschied zwischen <strong>Batch Normalization</strong> und <strong>Layer Normalization</strong>, und warum dominiert Layer Norm in Transformern?',
                    h: 'Statistik ueber Batch-Achse vs. ueber Feature-Achse.',
                    s: 'Sei Aktivierungstensor $X \\in \\mathbb{R}^{B \\times \\dots \\times D}$.<br><strong>BatchNorm</strong> (Ioffe & Szegedy ICML 2015): normalisiert pro Feature ueber die Batch-Achse $\\Rightarrow$ Mittelwert/Varianz aus $B$ Beispielen.<br><strong>LayerNorm</strong> (Ba, Kiros, Hinton 2016): normalisiert pro Beispiel ueber die Feature-Achse $\\Rightarrow$ Mittelwert/Varianz aus $D$ Features.<br><strong>Warum Transformer LayerNorm bevorzugen:</strong><br>(a) Sequenzlaengen variieren $\\Rightarrow$ BatchNorm-Statistiken sind unzuverlaessig.<br>(b) BatchNorm haengt von der Batch-Groesse ab; bei sehr grossen Modellen sind Batches pro GPU klein.<br>(c) BatchNorm benoetigt im Inferenzmodus laufende Mittelwerte $\\Rightarrow$ unterschiedliches Train/Test-Verhalten; LayerNorm ist deterministisch.<br>(d) Autoregressive Generierung wuerde BatchNorm an Sequenzpositionen "verraten" (Information Leak).<br>RMSNorm (Zhang & Sennrich 2019) als simplifizierte Variante ohne Mittelwert ist in modernen LLMs (Llama, Mistral) Standard.<br>Quelle: Ba, Kiros, Hinton "Layer Normalization", arXiv:1607.06450, 2016; Ioffe & Szegedy "Batch Normalization", ICML 2015.'
                },
                {
                    q: 'Was ist <strong>Mixup</strong>, und wie ist der Trainings-Loss formal definiert?',
                    h: 'Lineare Interpolation von Bildpaaren und Labels.',
                    s: 'Mixup (Zhang et al. ICLR 2018) zieht pro Trainingsschritt ein Paar $(x_i, y_i)$ und $(x_j, y_j)$ und mischt:<br>$$\\tilde x = \\lambda x_i + (1-\\lambda) x_j,\\quad \\tilde y = \\lambda y_i + (1-\\lambda) y_j,$$<br>mit $\\lambda \\sim \\mathrm{Beta}(\\alpha, \\alpha)$ (typ. $\\alpha=0{,}2-0{,}4$).<br>Der Loss wird auf dem gemischten Beispiel berechnet: $L(\\tilde x, \\tilde y)$.<br><strong>Wirkmechanismus:</strong> erzwingt linear-glatte Entscheidungsfunktion in den Daten $\\Rightarrow$ Robustheit gegen adversarial-aehnliches Rauschen, bessere Kalibrierung, +1-2 % Top-1-Accuracy auf ImageNet.<br>CutMix (Yun et al. ICCV 2019) ist eine raeumliche Variante (Patch-Austausch statt Pixel-Mix).<br>Quelle: Zhang, Cisse, Dauphin, Lopez-Paz "mixup: Beyond Empirical Risk Minimization", ICLR 2018.'
                },
                {
                    q: 'Beschreibe einen <strong>Cosine-Annealing-Learning-Rate-Schedule</strong> mit Warmup, und warum er sich im Transformer-Training durchgesetzt hat.',
                    h: 'Linear hochfahren, dann kosinusfoermig abklingen.',
                    s: '<strong>Warmup-Phase</strong> ueber $T_w$ Schritte: $\\eta(t) = \\eta_{\\max} \\cdot t/T_w$.<br><strong>Cosine-Annealing</strong> fuer $t \\in [T_w, T]$:<br>$$\\eta(t) = \\eta_{\\min} + \\tfrac12 (\\eta_{\\max} - \\eta_{\\min})\\bigl(1 + \\cos\\bigl(\\pi\\,\\tfrac{t-T_w}{T-T_w}\\bigr)\\bigr).$$<br>Verlauf: $\\eta$ klingt glatt von $\\eta_{\\max}$ auf $\\eta_{\\min}$ ab; in flachen Phasen am Anfang und Ende langsam, in der Mitte schneller.<br><strong>Warum durchgesetzt:</strong><br>(a) Warmup verhindert Instabilitaeten von AdamW in den ersten Updates (Gradientenstatistik noch unzuverlaessig).<br>(b) Glattes Abklingen ist empirisch besser als Step-Decay (keine ploetzlichen Loss-Spruenge).<br>(c) Endpunkt $\\eta_{\\min} > 0$ erhaelt Mikro-Anpassungen am Ende.<br>SGDR (Loshchilov & Hutter ICLR 2017) erweitert um <em>Warm Restarts</em> (zyklisches Hochfahren); fuer LLM-Pretraining wird i.d.R. nur ein einziger Cosine-Cycle gefahren.<br>Quelle: Loshchilov & Hutter "SGDR: Stochastic Gradient Descent with Warm Restarts", ICLR 2017; GPT-3-Paper (Brown et al. NeurIPS 2020) §C.'
                },
                {
                    q: 'Was ist <strong>Gradient Clipping</strong>, und welche zwei Varianten gibt es?',
                    h: 'By-Value vs. By-Norm.',
                    s: 'Verhindert Exploding Gradients (typisches RNN-/LLM-Problem).<br><strong>By-Value:</strong> $g_i \\leftarrow \\mathrm{clip}(g_i, -c, c)$ elementweise. Einfach, aber kann Gradient-Richtung verzerren.<br><strong>By-Norm</strong> (uebliche Variante): wenn $\\|g\\|_2 > c$, skaliere $g \\leftarrow c \\cdot g / \\|g\\|_2$. Erhaelt die Gradient-Richtung, begrenzt nur die Schrittweite.<br>Typische Werte: $c = 1{,}0$ in LLMs (GPT, Llama, Mistral), $c = 5{,}0$ in fruehen RNN-Setups.<br>Implementiert in PyTorch via <code>torch.nn.utils.clip_grad_norm_(parameters, max_norm=c)</code>.<br>Wirkung: stabilisiert das Training, insbesondere bei Mixed-Precision-Trainings, wo Gradient-Underflow/Overflow auftreten kann.<br>Quelle: Pascanu, Mikolov, Bengio "On the Difficulty of Training Recurrent Neural Networks", ICML 2013, §3.2; You et al. "Large Batch Optimization for Deep Learning: Training BERT in 76 Minutes", ICLR 2020.'
                },
                {
                    q: 'Was ist <strong>Focal Loss</strong>, und fuer welches Problem wurde sie entwickelt?',
                    h: 'Klassenungleichgewicht, Down-Weighting leichter Beispiele.',
                    s: 'In der Objekterkennung (RetinaNet, Lin et al. ICCV 2017) gibt es pro Bild typischerweise $\\sim 10^5$ Anker-Boxen, von denen die allermeisten Hintergrund (leicht klassifizierbar) sind. Standard-Cross-Entropy wird von diesen dominiert.<br>Focal Loss erweitert binaere Cross-Entropy $\\mathrm{CE} = -\\log(p_t)$ um einen modulierenden Faktor:<br>$$L_{\\text{focal}} = -(1-p_t)^\\gamma \\log(p_t),$$<br>wobei $p_t$ die Wahrscheinlichkeit der korrekten Klasse und $\\gamma \\geq 0$ ein Hyperparameter (typ. $\\gamma=2$).<br>Bei leichten Beispielen ($p_t \\to 1$) geht $(1-p_t)^\\gamma \\to 0$ $\\Rightarrow$ Loss-Beitrag stark reduziert; bei schweren ($p_t \\to 0$) bleibt der Beitrag voll erhalten.<br>Plus optionaler Klassenbalance-Faktor $\\alpha_t$.<br>Effekt: erlaubt One-Stage-Detektoren (RetinaNet), die ohne Two-Stage-Hard-Negative-Mining auskommen, und uebertrifft Faster R-CNN-Genauigkeit bei hoeherer Geschwindigkeit.<br>Quelle: Lin, Goyal, Girshick, He, Dollar "Focal Loss for Dense Object Detection", ICCV 2017.'
                },
                {
                    q: 'Wie berechnet man <strong>Intersection over Union (IoU)</strong> zweier Bounding-Boxes, und ab welchem Schwellwert gilt eine Detektion als "korrekt"?',
                    h: 'Verhaeltnis Schnitt zu Vereinigung.',
                    s: 'IoU = Schnittflaeche / Vereinigungsflaeche.<br>Fuer zwei achsenparallele Boxen $B_1 = (x_1^{(1)}, y_1^{(1)}, x_2^{(1)}, y_2^{(1)})$ und $B_2$:<br>$\\text{Schnitt}_x = \\max(0,\\, \\min(x_2^{(1)}, x_2^{(2)}) - \\max(x_1^{(1)}, x_1^{(2)}))$ (analog $y$).<br>$|B_1 \\cap B_2| = \\text{Schnitt}_x \\cdot \\text{Schnitt}_y$.<br>$|B_1 \\cup B_2| = |B_1| + |B_2| - |B_1 \\cap B_2|$.<br>$$\\boxed{\\mathrm{IoU} = \\frac{|B_1 \\cap B_2|}{|B_1 \\cup B_2|} \\in [0,1].}$$<br><strong>Schwellwerte:</strong><br>- PASCAL VOC: $\\mathrm{IoU} \\geq 0{,}5$ gilt als True Positive (mAP@0.5).<br>- COCO: gemittelt ueber $\\mathrm{IoU} \\in \\{0{,}5, 0{,}55, \\dots, 0{,}95\\}$ (mAP@\\[.5:.95]) $\\Rightarrow$ deutlich strenger.<br>Verallgemeinerungen: GIoU (Rezatofighi CVPR 2019), DIoU/CIoU (Zheng AAAI 2020), die auch nicht-ueberlappende Boxen stetig bestrafen.<br>Quelle: Everingham et al. "The PASCAL Visual Object Classes Challenge", IJCV 88(2), 2010, §4.2; Lin et al. "Microsoft COCO", ECCV 2014.'
                },
                {
                    q: 'Wie funktioniert <strong>Non-Maximum Suppression (NMS)</strong>, und wofuer wird sie in Objektdetektoren benoetigt?',
                    h: 'Iteratives Loeschen redundanter Boxen ueber IoU-Schwelle.',
                    s: 'Objektdetektoren (YOLO, RetinaNet, Faster R-CNN) liefern pro Objekt mehrere ueberlappende Vorhersagen. NMS reduziert sie auf eine pro Objekt:<br><strong>Algorithmus:</strong><br>1. Sortiere alle Boxen absteigend nach Confidence-Score.<br>2. Nimm die Box mit dem hoechsten Score und fuege sie in die Ergebnisliste ein.<br>3. Loesche alle uebrigen Boxen mit $\\mathrm{IoU} > \\tau$ (typ. $\\tau = 0{,}5$) zur soeben gewaehlten Box.<br>4. Wiederhole 2-3, bis keine Boxen mehr uebrig.<br>Klassen-weise: NMS wird pro Klasse separat durchgefuehrt, damit unterschiedliche Klassen sich nicht ausloeschen.<br><strong>Soft-NMS</strong> (Bodla et al. ICCV 2017): statt harten Loeschens den Score abhaengig vom IoU reduzieren ($s_i \\leftarrow s_i \\cdot e^{-\\mathrm{IoU}^2/\\sigma}$) $\\Rightarrow$ besser bei stark ueberlappenden Objekten (Menschenmenge).<br>Moderne End-to-End-Detektoren (DETR, Carion ECCV 2020) verzichten dank Hungarian Matching auf NMS.<br>Quelle: Neubeck & Van Gool "Efficient Non-Maximum Suppression", ICPR 2006; Bodla et al. "Soft-NMS", ICCV 2017.'
                },
                {
                    q: 'Welcher Loss wird beim <strong>Autoencoder</strong> typischerweise minimiert, und was ist die <strong>Latent-Bottleneck</strong>-Architektur?',
                    h: 'Rekonstruktions-Loss, Dimensionsreduktion durch enge Engstelle.',
                    s: 'Ein Autoencoder besteht aus Encoder $f_\\phi: \\mathbb{R}^d \\to \\mathbb{R}^k$ und Decoder $g_\\theta: \\mathbb{R}^k \\to \\mathbb{R}^d$, mit $k \\ll d$ (Bottleneck).<br><strong>Loss:</strong><br>- Fuer kontinuierliche Daten: MSE $L = \\|x - g_\\theta(f_\\phi(x))\\|_2^2$.<br>- Fuer binaere/Bernoulli-Daten: Bernoulli-Cross-Entropy.<br>Der Bottleneck zwingt das Netz, eine kompakte Repraesentation $z = f_\\phi(x)$ zu lernen, die genug Information enthaelt, um $x$ zu rekonstruieren $\\Rightarrow$ nichtlineare Verallgemeinerung der PCA.<br><strong>Varianten:</strong><br>- <em>Denoising Autoencoder</em> (Vincent ICML 2008): Input ist verrauscht, Decoder rekonstruiert das saubere $x$.<br>- <em>Sparse Autoencoder:</em> zusaetzliche L1-Regularisierung auf $z$.<br>- <em>Variational Autoencoder (VAE)</em> (Kingma & Welling ICLR 2014): probabilistisch, ELBO-Loss.<br>- <em>Masked Autoencoder (MAE)</em> (He et al. CVPR 2022): maskiert 75 % der Image-Patches; selbst-ueberwachtes Pretraining fuer ViT.<br>Quelle: Hinton & Salakhutdinov "Reducing the Dimensionality of Data with Neural Networks", Science 313, 2006.'
                },
                {
                    q: 'Welches Trainingsziel verfolgt <strong>SimCLR</strong> als selbst-ueberwachte Methode, und wie ist der NT-Xent-Loss definiert?',
                    h: 'Contrastive Loss: Positive Paare anziehen, negative abstossen.',
                    s: 'SimCLR (Chen et al. ICML 2020) lernt visuelle Repraesentationen ohne Labels:<br>1. Pro Bild $x$ werden zwei zufaellig augmentierte Versionen $\\tilde x_i, \\tilde x_j$ erzeugt (Crop, Color-Jitter, Blur).<br>2. Encoder $f$ + Projection-Head $g$ liefern Embeddings $z_i = g(f(\\tilde x_i))$, normalisiert auf Einheitsspaere.<br>3. <strong>NT-Xent</strong> (Normalized Temperature-Scaled Cross-Entropy) ueber Mini-Batch der Groesse $2N$:<br>$$L_{i,j} = -\\log \\frac{\\exp(\\mathrm{sim}(z_i, z_j)/\\tau)}{\\sum_{k=1, k\\neq i}^{2N} \\exp(\\mathrm{sim}(z_i, z_k)/\\tau)},$$<br>wobei $\\mathrm{sim}(u,v) = u^Tv/(\\|u\\|\\|v\\|)$ Kosinus-Aehnlichkeit und $\\tau \\approx 0{,}1$ Temperatur.<br>Positives Paar $(z_i,z_j)$ soll hohe Aehnlichkeit haben; alle $2N-2$ anderen sind negatives Paar.<br>Nach Training wird $g$ verworfen; $f$ liefert generelle Features fuer Downstream-Tasks (lineare Probe, Fine-Tuning).<br>Ergebnis: SimCLR mit ResNet-50 erreicht 76{,}5 % Top-1 ImageNet linear probe (vergleichbar mit supervised); ohne Labels.<br>Quelle: Chen, Kornblith, Norouzi, Hinton "A Simple Framework for Contrastive Learning of Visual Representations", ICML 2020.'
                },
                {
                    q: 'Wie ist die <strong>sinusoidale Positionskodierung</strong> im Original-Transformer definiert, und welchen Vorteil hat sie gegenueber gelernten Positions-Embeddings?',
                    h: 'Trigonometrische Funktionen mit geometrisch fallender Frequenz.',
                    s: 'Vaswani et al. (NeurIPS 2017) addieren zu jedem Token-Embedding $x_t$ eine Positionsvektor $\\mathrm{PE}_t \\in \\mathbb{R}^d$ mit:<br>$$\\mathrm{PE}_{t,2i} = \\sin\\bigl(t / 10000^{2i/d}\\bigr),\\quad \\mathrm{PE}_{t,2i+1} = \\cos\\bigl(t / 10000^{2i/d}\\bigr).$$<br>Index $i \\in [0, d/2)$ kodiert die Frequenzbande; niedrige Dimensionen oszillieren schnell (feine Positionen), hohe langsam (grobe Positionen).<br><strong>Eigenschaften:</strong><br>(a) Deterministisch (keine Parameter).<br>(b) Modell kann auf laengere Sequenzen extrapolieren als die Trainings-Laenge, da $\\sin/\\cos$ definiert sind.<br>(c) Relative Position $\\mathrm{PE}_{t+k}$ ist linear aus $\\mathrm{PE}_t$ ableitbar (Additionstheoreme) $\\Rightarrow$ Modell kann "k Positionen entfernt" linear darstellen.<br>Alternative: gelernte Embeddings (BERT, GPT-2) — einfacher zu trainieren, aber keine Extrapolation. Moderne LLMs nutzen <em>Rotary Positional Embeddings</em> (RoPE, Su et al. 2021) oder <em>ALiBi</em> (Press et al. ICLR 2022) fuer bessere Laengen-Extrapolation.<br>Quelle: Vaswani et al. "Attention is All You Need", NeurIPS 2017, §3.5.'
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
                },
                {
                    q: 'Was ist <strong>LoRA</strong> (Low-Rank Adaptation), und wie viele zusaetzliche Parameter werden bei einer linearen Schicht $W \\in \\mathbb{R}^{d \\times k}$ mit Rang $r$ trainiert?',
                    h: 'Niedrigrangige Zerlegung des Gewichts-Updates.',
                    s: 'LoRA (Hu et al. ICLR 2022) friert das vortrainierte Gewicht $W_0 \\in \\mathbb{R}^{d\\times k}$ ein und parametrisiert das Update als Niedrigrang-Produkt:<br>$$W = W_0 + \\Delta W = W_0 + B A,\\quad A \\in \\mathbb{R}^{r\\times k},\\ B \\in \\mathbb{R}^{d\\times r},$$<br>mit $r \\ll \\min(d,k)$ (typ. $r \\in \\{4, 8, 16, 64\\}$).<br>Anzahl trainierbarer Parameter: $r\\cdot k + d\\cdot r = r(d+k)$ statt $d\\cdot k$.<br>Beispiel: $d=k=4096, r=8 \\Rightarrow$ LoRA hat $8 \\cdot 8192 = 65.536$ Parameter statt $16{,}77$ Mio. $\\Rightarrow$ Faktor 256 weniger.<br>Initialisierung: $A \\sim \\mathcal{N}(0, \\sigma^2)$, $B = 0$ $\\Rightarrow$ $\\Delta W = 0$ zu Trainingsbeginn, kein Output-Shift.<br>Optional skaliert mit $\\alpha/r$.<br><strong>Vorteile:</strong> (a) nur $\\sim 0{,}1$ % Originalparameter trainierbar; (b) mehrere LoRA-Adapter pro Aufgabe koennen zur Inferenzzeit umgeschaltet werden; (c) im Deployment koennen $W_0 + BA$ in $W$ verschmolzen werden $\\Rightarrow$ keine zusaetzliche Latenz.<br><strong>QLoRA</strong> (Dettmers et al. NeurIPS 2023) kombiniert mit 4-Bit-Quantisierung des Basismodells $\\Rightarrow$ 65-B-Modell auf einer einzigen 48-GB-GPU finetunebar.<br>Quelle: Hu et al. "LoRA: Low-Rank Adaptation of Large Language Models", ICLR 2022; Dettmers et al. "QLoRA", NeurIPS 2023.'
                },
                {
                    q: 'Wie funktioniert der <strong>Vision Transformer (ViT)</strong>, und wieso ist der induktive Bias schwaecher als bei CNNs?',
                    h: 'Bild als Patch-Sequenz, keine raeumliche Lokalitaet eingebaut.',
                    s: 'ViT (Dosovitskiy et al. ICLR 2021):<br>1. Zerlege Bild $H\\times W\\times C$ in $N$ nicht-ueberlappende Patches der Groesse $P\\times P$, typisch $P=16$ $\\Rightarrow$ $N = HW/P^2$.<br>2. Flach + lineares Projektion: jedes Patch $\\to$ Vektor in $\\mathbb{R}^d$. Hinzu $\\mathrm{[CLS]}$-Token am Index 0.<br>3. Lernbare Positions-Embeddings addieren.<br>4. Standard-Transformer-Encoder mit $L$ Schichten, Selbst-Attention ueber alle $N+1$ Tokens.<br>5. Klassifikation aus dem $[\\mathrm{CLS}]$-Vektor via MLP-Head.<br><strong>Induktiver Bias:</strong> CNN-Architekturen tragen <em>Translation-Invarianz</em> und <em>Lokalitaet</em> als Konstruktionsannahme; ViT muss sie aus Daten lernen.<br>$\\Rightarrow$ Auf kleinen Datensaetzen (CIFAR-10) verliert ViT gegen ResNet; auf grossen Datensaetzen (JFT-300M, ImageNet-21k) ueberholt ViT die CNNs, weil schwacher Bias mehr Spielraum laesst, die optimale Repraesentation zu finden.<br>Heutige Standard-Modelle: ViT-B/16, ViT-L/16, DINOv2 (Oquab et al. 2024), CLIP-ViT (Radford et al. ICML 2021).<br>Quelle: Dosovitskiy et al. "An Image is Worth 16x16 Words", ICLR 2021, §3.1.'
                },
                {
                    q: 'Wie ist das <strong>Masked Language Modeling (MLM)</strong>-Trainingsziel von BERT definiert, und warum verwendet BERT eine 80/10/10-Mask-Regel?',
                    h: 'Tokens maskieren, Original vorhersagen; Test/Train-Mismatch reduzieren.',
                    s: '<strong>MLM-Ziel</strong> (Devlin et al. NAACL 2019): in einem Trainings-Satz werden zufaellig 15 % der Tokens ausgewaehlt; das Modell soll deren Original vorhersagen.<br>Verlust: Cross-Entropy nur auf den ausgewaehlten Positionen.<br><strong>80/10/10-Regel</strong> bei den ausgewaehlten 15 %:<br>- 80 % werden durch das Spezialtoken $[\\mathrm{MASK}]$ ersetzt.<br>- 10 % werden durch ein <em>zufaelliges</em> anderes Token ersetzt.<br>- 10 % bleiben <em>unveraendert</em>.<br><strong>Begruendung:</strong><br>(a) Das $[\\mathrm{MASK}]$-Token kommt im Inferenztext nicht vor $\\Rightarrow$ reines Maskieren wuerde einen Train-Test-Mismatch erzeugen.<br>(b) Das zufaellige Ersetzen zwingt das Modell, jeden Token aktiv zu pruefen, statt nur an $[\\mathrm{MASK}]$-Positionen zu arbeiten.<br>(c) Das Unveraendert-Lassen signalisiert dem Modell, dass der Originaltoken "plausibel" sein muss.<br>Im Vergleich zu autoregressivem Training (GPT) lernt MLM <em>bidirektionalen</em> Kontext $\\Rightarrow$ besser fuer Klassifikations-/Verstaendnis-Aufgaben (GLUE), schlechter fuer Generierung.<br>Quelle: Devlin, Chang, Lee, Toutanova "BERT: Pre-training of Deep Bidirectional Transformers", NAACL 2019, §3.1.'
                },
                {
                    q: 'Wie ist die Evidence Lower Bound (<strong>ELBO</strong>) eines Variational Autoencoders aufgebaut, und welche zwei Terme interpretieren wir wie?',
                    h: 'Rekonstruktion + KL-Divergenz zum Prior.',
                    s: 'VAE (Kingma & Welling ICLR 2014) modelliert $p_\\theta(x) = \\int p_\\theta(x|z) p(z)\\,dz$ mit Encoder $q_\\phi(z|x) = \\mathcal{N}(z; \\mu_\\phi(x), \\sigma_\\phi^2(x) I)$ und Standard-Normal-Prior $p(z) = \\mathcal{N}(0,I)$.<br>Die <strong>ELBO</strong> ist eine untere Schranke der Log-Likelihood:<br>$$\\log p_\\theta(x) \\geq \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] - \\mathrm{KL}(q_\\phi(z|x)\\,\\|\\,p(z)).$$<br><strong>Term 1 (Rekonstruktion):</strong> erwartete Log-Likelihood $\\Rightarrow$ Decoder muss $x$ aus $z$ rekonstruieren.<br><strong>Term 2 (Regularisierung):</strong> KL-Divergenz zwingt $q_\\phi(z|x)$ in die Naehe des Priors $\\Rightarrow$ Latent-Raum bleibt strukturiert, samplingfaehig.<br>Bei Gauss-Encoder und -Prior hat die KL eine geschlossene Form:<br>$$\\mathrm{KL} = \\tfrac12 \\sum_i (\\sigma_i^2 + \\mu_i^2 - 1 - \\log \\sigma_i^2).$$<br><strong>Reparametrisierungs-Trick</strong>: $z = \\mu_\\phi(x) + \\sigma_\\phi(x) \\odot \\epsilon,\\ \\epsilon \\sim \\mathcal{N}(0,I)$ macht den Gradient durch das Sampling differenzierbar.<br><strong>$\\beta$-VAE</strong> (Higgins et al. ICLR 2017): Gewichtet KL mit $\\beta$ $\\Rightarrow$ disentangled Repraesentation.<br>Quelle: Kingma & Welling "Auto-Encoding Variational Bayes", ICLR 2014.'
                },
                {
                    q: 'Was ist eine <strong>Mixture-of-Experts</strong>-Schicht (MoE) mit Top-$k$-Routing, und wie viele Parameter werden pro Token aktiv?',
                    h: 'Sparse Routing, conditional computation.',
                    s: 'MoE-Schicht ersetzt eine dichte FFN durch $E$ paralelle Experten-FFNs $\\{f_1,\\dots,f_E\\}$ plus ein Gating-Netzwerk $G(x) \\in \\mathbb{R}^E$.<br>Pro Token $x$:<br>1. Logits $g = W_g x$.<br>2. Top-$k$-Selektion: nur die $k$ Experten mit hoechsten $g_e$ werden aktiv (typ. $k=2$).<br>3. Softmax-Normalisierung ueber die Top-$k$ Logits liefert Gewichte $\\alpha_e$.<br>4. Output: $y = \\sum_{e \\in \\mathrm{TopK}} \\alpha_e\\,f_e(x)$.<br>Bei Mixtral 8x7B (Mistral 2024) ist $E=8$, $k=2$ $\\Rightarrow$ Gesamtparameter $\\sim 47$ Mrd., aber pro Token nur $\\sim 13$ Mrd. aktiv.<br><strong>Load-Balancing-Loss</strong> $L_{\\mathrm{aux}} = E \\cdot \\sum_e f_e \\cdot p_e$ verhindert, dass Routing kollabiert (nur ein Experte wird genutzt). $f_e$ = Anteil Tokens zu Experte $e$; $p_e$ = mittlere Gate-Wahrscheinlichkeit fuer $e$.<br>Vorteile: massive Skalierung der Parameteranzahl ohne proportionalen Compute-Aufwand.<br>Implementierungs-Herausforderung: All-to-All-Kommunikation zwischen GPUs bei Expert-Parallelism (DeepSpeed, FairScale).<br>Quelle: Shazeer et al. "Outrageously Large Neural Networks", ICLR 2017; Fedus et al. "Switch Transformer", JMLR 2022; Jiang et al. "Mixtral of Experts", arXiv:2401.04088, 2024.'
                },
                {
                    q: 'Wie arbeitet <strong>RLHF</strong> mit PPO, und welche drei Modelle sind im Trainings-Loop gleichzeitig im Spiel?',
                    h: 'Policy, Reward-Modell, Reference-Modell, KL-Penalty.',
                    s: 'RLHF (Christiano et al. NeurIPS 2017; Ouyang et al. NeurIPS 2022 fuer InstructGPT) hat drei Phasen:<br><strong>1. Supervised Fine-Tuning (SFT)</strong>: Pretrained Base-Modell wird auf einem demonstrierten Datensatz mit Cross-Entropy weitertrainiert $\\to$ Policy $\\pi^{\\mathrm{SFT}}$.<br><strong>2. Reward Model (RM)</strong>: Menschen bewerten Paare $(y_A, y_B)$ zu einem Prompt $x$. Ein Modell $r_\\phi$ wird mit Bradley-Terry-Loss trainiert: $\\log \\sigma(r_\\phi(x, y_A) - r_\\phi(x, y_B))$ fuer Bevorzugung von $A$.<br><strong>3. PPO-Phase</strong>: Policy $\\pi_\\theta$ wird optimiert mit Reward:<br>$$R(x,y) = r_\\phi(x,y) - \\beta \\cdot \\mathrm{KL}\\bigl(\\pi_\\theta(\\cdot|x)\\,\\|\\,\\pi^{\\mathrm{SFT}}(\\cdot|x)\\bigr).$$<br>Der KL-Strafterm zur fixierten Referenz $\\pi^{\\mathrm{SFT}}$ verhindert, dass die Policy zu weit driftet (Reward-Hacking, Mode-Collapse). Plus PPO-Clipping zur Stabilisierung.<br><strong>Drei Modelle gleichzeitig</strong>: aktive Policy $\\pi_\\theta$, eingefrorene Reference $\\pi^{\\mathrm{SFT}}$, Reward $r_\\phi$. Plus Wert-Funktion $V_\\psi$ fuer PPO-Vorteilsschaetzung $\\Rightarrow$ effektiv vier.<br><strong>Direct Preference Optimization (DPO)</strong> (Rafailov et al. NeurIPS 2023) eliminiert das separate Reward-Modell: Preference-Daten werden direkt in einen geschlossenen Loss eingespeist.<br>Quelle: Ouyang et al. "Training Language Models to Follow Instructions with Human Feedback", NeurIPS 2022, §3.5; Schulman et al. "Proximal Policy Optimization", arXiv:1707.06347, 2017.'
                },
                {
                    q: 'Welche Kern-Idee verfolgt <strong>FlashAttention</strong>, und welche asymptotische Komplexitaet in Memory hat sie im Vergleich zur Standard-Attention?',
                    h: 'IO-Aware Algorithmus, Tiling, kein Materialisieren der $n \\times n$-Matrix.',
                    s: 'Standard-Attention berechnet $S = QK^T \\in \\mathbb{R}^{n\\times n}$, $P = \\mathrm{softmax}(S)$, $O = PV$. Die Materialisierung von $S$ und $P$ erfordert $O(n^2)$ HBM-Memory $\\Rightarrow$ Bottleneck bei langen Sequenzen.<br><strong>FlashAttention</strong> (Dao et al. NeurIPS 2022) ist <em>IO-aware</em>: GPU-Memory hat eine Hierarchie aus langsamem HBM ($\\sim$ 1{,}5 TB/s, 80 GB) und schnellem SRAM ($\\sim$ 19 TB/s, 192 KB pro SM). Der Algorithmus<br>(a) tiled $Q$, $K$, $V$ in Bloecke, die in SRAM passen;<br>(b) berechnet Block-weise Softmax mit Online-Update-Trick (running max/sum) $\\Rightarrow$ vermeidet HBM-Schreibung von $S$ und $P$;<br>(c) realisiert $O(n\\cdot d)$ Memory statt $O(n^2)$.<br>Compute-Komplexitaet bleibt $O(n^2 d)$, aber HBM-Reads/Writes fallen drastisch.<br><strong>FlashAttention-2</strong> (Dao 2023) verbessert Work-Partitioning ueber Threads $\\Rightarrow$ 2x weiteren Speedup, $\\sim 75$ % der theoretischen GPU-FLOPs auf A100.<br><strong>FlashAttention-3</strong> (Shah et al. 2024) nutzt H100-Hardware-Beschleunigung (TMA, FP8) $\\Rightarrow$ 740 TFLOPs FP16 (75 % Peak), 1{,}3 PFLOPs FP8.<br>Quelle: Dao, Fu, Ermon, Rudra, Re "FlashAttention", NeurIPS 2022; Dao "FlashAttention-2", arXiv:2307.08691, 2023.'
                },
                {
                    q: 'Welcher Unterschied besteht zwischen <strong>Multi-Head</strong>, <strong>Multi-Query</strong> und <strong>Grouped-Query Attention</strong>, und welcher Vorteil in der Inferenz ergibt sich?',
                    h: 'Anzahl unabhaengiger K/V-Projektionen, KV-Cache-Groesse.',
                    s: 'Sei $h$ die Anzahl Attention-Heads.<br><strong>Multi-Head Attention (MHA):</strong> jeder Head hat eigene Projektionen $W_Q^{(i)}, W_K^{(i)}, W_V^{(i)}$ $\\Rightarrow$ KV-Cache pro Token: $2 \\cdot h \\cdot d_{\\text{head}}$.<br><strong>Multi-Query Attention (MQA)</strong> (Shazeer 2019): alle Heads teilen sich <em>ein</em> gemeinsames $K, V$ $\\Rightarrow$ KV-Cache: $2 \\cdot d_{\\text{head}}$ (Faktor $h$ kleiner).<br><strong>Grouped-Query Attention (GQA)</strong> (Ainslie et al. EMNLP 2023): Heads werden in $g$ Gruppen aufgeteilt, jede Gruppe teilt sich ein KV-Paar. MHA = GQA mit $g=h$, MQA = GQA mit $g=1$. Typisch $g \\in \\{4, 8\\}$ fuer $h=32$ Heads.<br><strong>Inferenz-Vorteil:</strong> KV-Cache ist der dominante Memory-Verbrauch bei autoregressiver Generierung. Llama-3 70B nutzt $h=64$, $g=8 \\Rightarrow$ KV-Cache ist 8x kleiner als bei MHA, bei vergleichbarer Qualitaet.<br>Praktisch ermoeglicht GQA grosse Kontextfenster (Llama-3 128k) und groessere Batch-Sizes pro GPU.<br>Quelle: Shazeer "Fast Transformer Decoding: One Write-Head is All You Need", arXiv:1911.02150, 2019; Ainslie et al. "GQA", EMNLP 2023.'
                },
                {
                    q: 'Wie funktioniert <strong>Rotary Positional Embedding (RoPE)</strong>, und warum ist es relativ statt absolut?',
                    h: 'Komponentenweise Rotation in $\\mathbb{R}^2$, Inner-Product enthaelt nur die Differenz.',
                    s: 'RoPE (Su et al. arXiv:2104.09864, 2021) wendet eine positionsabhaengige Rotation direkt auf die Query- und Key-Vektoren an, <em>bevor</em> das Skalarprodukt gebildet wird.<br>Fuer Position $m$ und Vektor $\\mathbf{q} \\in \\mathbb{R}^d$ (gerades $d$): teile in $d/2$ Komponenten-Paare $(q_{2i}, q_{2i+1})$ und rotiere jedes Paar um Winkel $m\\theta_i$ mit $\\theta_i = 10000^{-2i/d}$:<br>$$\\begin{pmatrix} q\u2019_{2i} \\\\ q\u2019_{2i+1} \\end{pmatrix} = \\begin{pmatrix} \\cos(m\\theta_i) & -\\sin(m\\theta_i) \\\\ \\sin(m\\theta_i) & \\cos(m\\theta_i) \\end{pmatrix} \\begin{pmatrix} q_{2i} \\\\ q_{2i+1} \\end{pmatrix}.$$<br>Analog $\\mathbf{k}\u2019$ an Position $n$.<br><strong>Schluesseleigenschaft:</strong> $\\langle \\mathbf{q}\u2019_m, \\mathbf{k}\u2019_n \\rangle$ haengt nur von der <em>Differenz</em> $m-n$ ab, nicht von $m$ oder $n$ einzeln (Orthogonalitaet der Rotationsmatrizen). $\\Rightarrow$ Relative Position, ohne extra Bias-Term.<br><strong>Vorteile:</strong> (a) kein zusaetzlicher Parameter; (b) bessere Extrapolation als sinusoidal/lernbar, weiter verbessert durch <em>YaRN</em>/<em>NTK-Scaling</em> fuer Kontextlaengen $>$ Training; (c) numerisch stabil.<br>RoPE ist Standard in Llama, Mistral, Qwen, DeepSeek.<br>Quelle: Su, Lu, Pan, Murtadha, Wen, Liu "RoFormer: Enhanced Transformer with Rotary Position Embedding", Neurocomputing 568, 2024 (arXiv:2104.09864, 2021).'
                },
                {
                    q: 'Wie arbeitet <strong>Mamba</strong> mit Selective State Space Models, und welche Komplexitaet hat es in Sequenzlaenge?',
                    h: 'Lineare RNN-aehnliche Rekursion mit datenabhaengigen Parametern, $O(n)$.',
                    s: 'Klassische State-Space-Modelle (S4, Gu et al. ICLR 2022) folgen $h_t = A h_{t-1} + B x_t$, $y_t = C h_t$ mit zeitinvarianten Matrizen $A, B, C$. Sie sind in $O(n)$ berechenbar (FFT-Konvolution), aber die Parameter sind input-unabhaengig $\\Rightarrow$ koennen Inhalt nicht selektiv ignorieren.<br><strong>Mamba</strong> (Gu & Dao arXiv:2312.00752, 2023): macht $B(x_t)$, $C(x_t)$ und $\\Delta(x_t)$ <em>selektiv</em> (input-abhaengig). Dadurch kann das Modell entscheiden, welche Information in den Zustand uebernommen wird (aehnlich Forget-Gate in LSTM).<br>Diskrete Form:<br>$h_t = \\bar A_t h_{t-1} + \\bar B_t x_t,\\quad y_t = C_t h_t.$<br>Komplexitaet: $O(n d^2)$ Rechen-, $O(n d)$ Speicherbedarf $\\Rightarrow$ linear in $n$, vergleichbar mit RNN, aber durch Selective-Scan-Algorithmus auf GPU effizient parallelisiert.<br><strong>Vorteile gegen Transformer:</strong><br>(a) $O(n)$ statt $O(n^2)$ $\\Rightarrow$ skaliert auf $\\sim 10^6$ Tokens.<br>(b) Konstanter Speicher pro Token (kein KV-Cache).<br>(c) Inferenzdurchsatz $5$x hoeher als Transformer gleicher Groesse.<br><strong>Nachteile:</strong> in Recall-Aufgaben ("finde einen Wert weit zurueck") oft schwaecher als Attention.<br>Hybriden: Jamba (AI21 2024) mischt Mamba und Attention; Mamba-2 (Dao & Gu ICML 2024) vereinheitlicht beide Sichtweisen.<br>Quelle: Gu & Dao "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", arXiv:2312.00752, 2023.'
                },
                {
                    q: 'Wie ist die <strong>Neural-Tangent-Kernel (NTK)</strong>-Theorie motiviert, und welche Aussage macht sie ueber unendlich breite Netze?',
                    h: 'Lazy-Regime, lineares Modell mit Kernel.',
                    s: 'Jacot, Gabriel, Hongler (NeurIPS 2018) zeigen: fuer ein vollverbundenes Netz mit Breite $n \\to \\infty$ und Lazy-Initialisierung verhaelt sich das Training unter Gradient Descent <em>linear</em> um die Initialisierung. Das Modell entspricht einer Kernel-Regression mit dem <strong>Neural Tangent Kernel</strong>:<br>$$\\Theta(x, x\u2019) = \\bigl\\langle \\nabla_\\theta f(x; \\theta_0),\\ \\nabla_\\theta f(x\u2019; \\theta_0) \\bigr\\rangle.$$<br>Wichtigste Aussagen:<br>(a) Im Grenzwert $n \\to \\infty$ ist $\\Theta(x,x\u2019)$ <em>deterministisch</em> (unabhaengig von der Zufalls-Initialisierung) und <em>zeit-invariant</em> waehrend des Trainings.<br>(b) Das Training konvergiert zu einer expliziten geschlossenen Loesung (Kernel-Ridge-Regression).<br>(c) Generalisierungsfehler kann durch das NTK-Spektrum analysiert werden.<br><strong>Bedeutung:</strong> die NTK-Theorie liefert die erste rigorose Konvergenzgarantie fuer ueberparametrisierte Netze. Sie erklaert aber <em>nicht</em> Feature-Learning (bei realen, endlichen Netzen aendern sich die Repraesentationen waehrend des Trainings; im NTK-Regime nicht). Das <em>mean-field</em>-Regime von Mei, Montanari, Nguyen (2018) deckt Feature-Learning ab.<br>Quelle: Jacot, Gabriel, Hongler "Neural Tangent Kernel: Convergence and Generalization in Neural Networks", NeurIPS 2018.'
                },
                {
                    q: 'Was sagt das <strong>Double-Descent</strong>-Phaenomen aus, und wie steht es zur klassischen Bias-Variance-U-Kurve?',
                    h: 'Test-Error hat zweites lokales Maximum genau an der Interpolations-Schwelle.',
                    s: 'Klassische Theorie (Hastie et al. 2009): mit wachsender Modellkomplexitaet faellt der Test-Fehler bis zum Bias-Variance-Sweet-Spot und steigt danach (Overfitting) $\\Rightarrow$ U-foermige Kurve.<br><strong>Empirischer Befund</strong> (Belkin et al. PNAS 2019, Nakkiran et al. ICLR 2020): bei modernen ueberparametrisierten Netzen zeigt der Test-Fehler eine <strong>zweite</strong> Abnahme, nachdem die Modellgroesse die <em>Interpolations-Schwelle</em> ($n_{\\text{Parameter}} \\approx n_{\\text{Train}}$) ueberschreitet. Schematisch: Abfall $\\to$ Maximum bei Interpolation $\\to$ erneuter Abfall im ueberparametrisierten Regime.<br><strong>Ursache:</strong> Bei Interpolation gibt es exakt eine Loesung, die das Trainingsset perfekt fittet $\\Rightarrow$ keine Freiheit, Glaettung zu waehlen. Im ueberparametrisierten Regime gibt es viele perfekte Loesungen; SGD waehlt eine mit <em>minimaler Norm</em> (implizite Regularisierung) $\\Rightarrow$ glattere Loesung mit besserer Generalisierung.<br>Auswirkungen: erklaert, warum 7B-, 70B-, 405B-LLMs nicht overfitten, obwohl sie weit mehr Parameter als Daten haben (im Sinne effektiver Komplexitaet).<br>Quelle: Belkin, Hsu, Ma, Mandal "Reconciling Modern Machine-Learning Practice and the Classical Bias-Variance Trade-off", PNAS 116(32), 2019; Nakkiran et al. "Deep Double Descent", ICLR 2020.'
                },
                {
                    q: 'Was ist <strong>ALiBi</strong> (Attention with Linear Biases), und wie ermoeglicht es Laengen-Extrapolation?',
                    h: 'Statischer linearer Abstands-Bias auf Attention-Logits, kein Positions-Embedding.',
                    s: 'ALiBi (Press, Smith, Lewis ICLR 2022) verzichtet vollstaendig auf Positions-Embeddings (kein additives PE, kein RoPE).<br>Stattdessen wird der Attention-Logit fuer Query an Position $i$ und Key an Position $j$ direkt mit einem linearen Bias modifiziert:<br>$$\\mathrm{attn}_{ij} = \\frac{q_i^T k_j}{\\sqrt{d_k}} - m_h \\cdot |i - j|,$$<br>wobei $m_h > 0$ ein <em>fester</em>, kopfspezifischer Slope ist (typ. $m_h = 2^{-8h/H}$ fuer Head $h$ von $H$).<br>Effekt: weiter entfernte Tokens werden softmax-exponentiell unterdrueckt; jeder Head hat einen anderen "Reichweiten-Schwerpunkt".<br><strong>Laengen-Extrapolation:</strong> da der Bias eine reine Funktion des Abstands $|i-j|$ ist (kein gelernter Parameter pro Position), funktioniert das Modell ohne Anpassung auf Sequenzen, die laenger sind als die Trainingslaenge. Press et al. trainieren auf 1024 Tokens und generalisieren auf 16k+ ohne Perplexitaets-Verschlechterung — das gelingt mit gelerntem PE/Sinus-PE/RoPE nur eingeschraenkt.<br>Eingesetzt in BLOOM (BigScience 2022) und MPT (MosaicML 2023). Llama nutzt RoPE statt ALiBi; beides sind die heute dominanten Alternativen zu klassischen PEs.<br>Quelle: Press, Smith, Lewis "Train Short, Test Long", ICLR 2022.'
                }
            ]
        ]
    };
})();
