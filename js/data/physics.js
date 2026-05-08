/* Physik */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'physics';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Physik',
        desc: 'Klassische Mechanik, Elektrodynamik, Schwingungen, Wellen, Thermodynamik &mdash; Grundlage fürs Hardware-Verständnis.',
        formulas: `
            <strong>Kinematik (gerad. konst. Beschleunigung)</strong><br>
            $v=v_0+at$, $s=s_0+v_0 t+\\tfrac12 a t^2$, $v^2-v_0^2=2a\\Delta s$<br><br>
            <strong>Newton</strong><br>
            $\\vec F=m\\vec a$, $\\vec p=m\\vec v$, Impulssatz: $\\vec F=d\\vec p/dt$<br><br>
            <strong>Energie</strong><br>
            $E_{kin}=\\tfrac12 m v^2$, $E_{pot}=mgh$, $W=\\int\\vec F\\cdot d\\vec s$<br><br>
            <strong>Rotation</strong><br>
            $\\vec M=\\vec r\\times\\vec F$, $L=I\\omega$, $E_{rot}=\\tfrac12 I\\omega^2$<br>
            Vollzylinder: $I=\\tfrac12 m r^2$; Kugel: $I=\\tfrac25 mr^2$; Hohlzylinder: $I=mr^2$<br><br>
            <strong>Elektrodynamik</strong><br>
            Coulomb: $F=\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 q_2}{r^2}$<br>
            Lorentz: $\\vec F=q(\\vec E+\\vec v\\times\\vec B)$<br>
            Induktion: $U_{ind}=-\\dfrac{d\\Phi}{dt}$<br><br>
            <strong>Schwingungen</strong><br>
            Federpendel: $\\omega=\\sqrt{k/m}$. Math. Pendel: $\\omega=\\sqrt{g/l}$<br>
            LC-Schwingkreis: $\\omega_0=1/\\sqrt{LC}$<br><br>
            <strong>Thermodynamik</strong><br>
            Ideales Gas: $pV=nRT$. 1. HS: $\\Delta U=Q+W$<br>
            Carnot: $\\eta=1-T_k/T_w$<br><br>
            <strong>Wellen / Optik</strong><br>
            Doppler (akustisch, Quelle bewegt): $f\'=f\\cdot c/(c-v_q)$ (Annäherung)<br>
            Bragg-Reflexion: $2d\\sin\\theta=n\\lambda$<br>
            Brechung (Snellius): $n_1\\sin\\alpha_1=n_2\\sin\\alpha_2$<br><br>
            <strong>Fluiddynamik</strong><br>
            Bernoulli: $p+\\tfrac12\\rho v^2+\\rho g h = \\text{const}$<br>
            Reynolds: $\\mathrm{Re}=\\rho v L/\\eta$ (turbulent ab $\\sim 2300$ in Rohren)<br><br>
            <strong>Wärmeleitung (Fourier)</strong><br>
            $\\dot Q = -\\lambda A\\,dT/dx$<br><br>
            <strong>Festkörper / Quanten</strong><br>
            Photon: $E=hf=hc/\\lambda$. Fermi-Energie: $E_F=\\dfrac{\\hbar^2}{2m}(3\\pi^2 n)^{2/3}$
        `,
        levels: [
            // L1
            [
                {
                    q: 'Ein Auto fährt mit $v_0=108\\,\\text{km/h}$. Es bremst mit $a=-5\\,\\text{m/s}^2$. Berechne den Bremsweg.',
                    h: 'Erst km/h $\\to$ m/s. Dann $v^2=v_0^2+2a\\Delta s$ mit $v=0$.',
                    s: '$v_0=108/3{,}6=30\\,\\text{m/s}$.<br>$0=30^2+2(-5)s\\Rightarrow s=900/10=90\\,\\text{m}$.<br>$$\\boxed{s=90\\,\\text{m}}$$'
                },
                {
                    q: 'Ein Elektron ($|q|=1{,}6\\cdot 10^{-19}\\,\\text{C}$) fliegt mit $v=10^6\\,\\text{m/s}$ senkrecht zu $B=0{,}5\\,\\text{T}$. Berechne den Betrag der Lorentzkraft.',
                    h: '$F=|q|vB\\sin 90°$.',
                    s: '$F=1{,}6\\cdot 10^{-19}\\cdot 10^6\\cdot 0{,}5 = 8\\cdot 10^{-14}\\,\\text{N}$.<br>$$\\boxed{F=8\\cdot 10^{-14}\\,\\text{N}}$$'
                },
                {
                    q: 'Trägheitsmoment eines homogenen Vollzylinders (Masse $m$, Radius $r$) um die Symmetrieachse?',
                    h: 'Standardformel.',
                    s: '$$\\boxed{I=\\tfrac12 m r^2}$$'
                },
                {
                    q: 'Ein Federpendel hat $m=0{,}5\\,\\text{kg}$ und $k=200\\,\\text{N/m}$. Bestimme Eigenfrequenz $\\omega_0$ und Periodendauer $T$.',
                    h: '$\\omega=\\sqrt{k/m}$, $T=2\\pi/\\omega$.',
                    s: '$\\omega_0=\\sqrt{200/0{,}5}=\\sqrt{400}=20\\,\\text{rad/s}$.<br>$T=2\\pi/20\\approx 0{,}314\\,\\text{s}$.<br>$$\\boxed{\\omega_0=20\\,\\text{rad/s},\\ T\\approx 0{,}314\\,\\text{s}}$$'
                },
                {
                    q: 'Coulomb-Kraft zwischen zwei Punktladungen $q_1=q_2=1\\,\\mu\\text{C}$ im Abstand $r=1\\,\\text{m}$ (im Vakuum, $1/(4\\pi\\varepsilon_0)\\approx 8{,}99\\cdot 10^9$).',
                    h: '$F=k q_1 q_2/r^2$ mit $k=1/(4\\pi\\varepsilon_0)$.',
                    s: '$F=8{,}99\\cdot 10^9 \\cdot (10^{-6})^2 / 1^2 = 8{,}99\\cdot 10^{-3}\\,\\text{N}$.<br>$$\\boxed{F\\approx 9\\,\\text{mN}}$$'
                },
                {
                    q: 'Welche Wärmemenge ist nötig, um $1\\,\\text{kg}$ Wasser von $20°\\text{C}$ auf $80°\\text{C}$ zu erwärmen? ($c=4{,}19\\,\\text{kJ/(kg K)}$.)',
                    h: '$Q=mc\\Delta T$.',
                    s: '$Q=1\\cdot 4{,}19\\cdot 10^3\\cdot 60 = 251{,}4\\,\\text{kJ}$.<br>$$\\boxed{Q\\approx 251\\,\\text{kJ}}$$'
                },
                {
                    q: 'Berechne die Energie eines Photons der Wellenlänge $\\lambda=500\\,\\text{nm}$ (sichtbares Grün). $h=6{,}626\\cdot 10^{-34}\\,\\text{Js}$, $c=3\\cdot 10^8\\,\\text{m/s}$.',
                    h: '$E=hc/\\lambda$.',
                    s: '$E=6{,}626\\cdot 10^{-34}\\cdot 3\\cdot 10^8/(500\\cdot 10^{-9})=3{,}98\\cdot 10^{-19}\\,\\text{J}$.<br>$\\div 1{,}6\\cdot 10^{-19}\\approx 2{,}48\\,\\text{eV}$.<br>$$\\boxed{E\\approx 2{,}48\\,\\text{eV}}$$'
                },
                {
                    q: 'Brechung: ein Lichtstrahl tritt aus Luft ($n_1=1{,}0$) in Glas ($n_2=1{,}5$) unter $\\alpha_1=30°$ ein. Berechne den Brechungswinkel $\\alpha_2$.',
                    h: 'Snellius $n_1\\sin\\alpha_1=n_2\\sin\\alpha_2$.',
                    s: '$\\sin\\alpha_2=(1\\cdot 0{,}5)/1{,}5=1/3\\Rightarrow \\alpha_2\\approx 19{,}47°$.<br>$$\\boxed{\\alpha_2\\approx 19{,}5°}$$ (zum Lot hin gebrochen).'
                },
                {
                    q: 'Bernoulli: in einer waagerechten Rohrverengung wird die Strömungsgeschwindigkeit von $v_1=2\\,\\text{m/s}$ auf $v_2=6\\,\\text{m/s}$ erhöht. Wie ändert sich der Druck? ($\\rho=1000\\,\\text{kg/m}^3$).',
                    h: '$\\Delta p = p_2-p_1 = -\\tfrac12\\rho(v_2^2-v_1^2)$.',
                    s: '$\\Delta p = -0{,}5\\cdot 1000\\cdot (36-4)=-16\\,000\\,\\text{Pa}=-16\\,\\text{kPa}$.<br>$$\\boxed{p_2 - p_1 = -16\\,\\text{kPa}}$$ Druck sinkt in Verengung (Hydrodynamisches Paradoxon).'
                },
                {
                    q: 'Reynoldszahl: Wasser strömt mit $v=1\\,\\text{m/s}$ durch ein Rohr mit $L=D=0{,}05\\,\\text{m}$. ($\\rho=1000$, $\\eta=10^{-3}\\,\\text{Pa s}$). Laminar oder turbulent?',
                    h: '$\\mathrm{Re}=\\rho v L/\\eta$, kritisch $\\sim 2300$.',
                    s: '$\\mathrm{Re}=1000\\cdot 1\\cdot 0{,}05/10^{-3}=50\\,000$.<br>$\\gg 2300$, also <strong>turbulent</strong>.<br>$$\\boxed{\\mathrm{Re}=5\\cdot 10^4\\Rightarrow\\text{turbulent}}$$'
                }
            ],
            // L2
            [
                {
                    q: 'Auf eine schiefe Ebene (Neigung $30°$, reibungsfrei) wird ein Klotz $m=2\\,\\text{kg}$ gestellt. Berechne die Beschleunigung entlang der Ebene.',
                    h: 'Hangabtriebskraft: $F=mg\\sin\\alpha$. $a=F/m$.',
                    s: '$a=g\\sin 30°=9{,}81\\cdot 0{,}5=4{,}905\\,\\text{m/s}^2$.<br>$$\\boxed{a\\approx 4{,}9\\,\\text{m/s}^2}$$ (massenunabhängig).'
                },
                {
                    q: 'Berechne die Geschwindigkeit, mit der eine Vollkugel den Endpunkt einer schiefen Ebene (Höhe $h=1\\,\\text{m}$) ohne Schlupf erreicht.',
                    h: 'Energieerhaltung: $mgh=\\tfrac12 mv^2+\\tfrac12 I\\omega^2$, $v=\\omega r$, $I=\\tfrac25 mr^2$.',
                    s: '$mgh=\\tfrac12 mv^2+\\tfrac12\\cdot \\tfrac25 mr^2\\cdot v^2/r^2=\\tfrac12 mv^2(1+\\tfrac25)=\\tfrac{7}{10}mv^2$.<br>$v=\\sqrt{10gh/7}=\\sqrt{10\\cdot 9{,}81\\cdot 1/7}\\approx 3{,}74\\,\\text{m/s}$.<br>$$\\boxed{v\\approx 3{,}74\\,\\text{m/s}}$$ Vergleich: ohne Rollen $v=\\sqrt{2gh}\\approx 4{,}43\\,\\text{m/s}$ (Energie steckt in Rotation).'
                },
                {
                    q: 'Ein LC-Schwingkreis: $L=1\\,\\text{mH}$, $C=1\\,\\mu\\text{F}$. Berechne Resonanzfrequenz $f_0$.',
                    h: '$\\omega_0=1/\\sqrt{LC}$, $f_0=\\omega_0/(2\\pi)$.',
                    s: '$\\omega_0=1/\\sqrt{10^{-3}\\cdot 10^{-6}}=1/\\sqrt{10^{-9}}=\\sqrt{10^9}\\approx 3{,}162\\cdot 10^4\\,\\text{rad/s}$.<br>$f_0\\approx 5033\\,\\text{Hz}\\approx 5\\,\\text{kHz}$.<br>$$\\boxed{f_0\\approx 5\\,\\text{kHz}}$$'
                },
                {
                    q: 'Ein elastischer Stoß: $m_1=2\\,\\text{kg}$ mit $v_1=4\\,\\text{m/s}$ trifft ruhendes $m_2=1\\,\\text{kg}$. Berechne $v_1\',\\,v_2\'$ nach dem Stoß.',
                    h: 'Impuls- und Energieerhaltung. Standardformeln: $v_1\'=\\dfrac{m_1-m_2}{m_1+m_2}v_1$, $v_2\'=\\dfrac{2m_1}{m_1+m_2}v_1$.',
                    s: '$v_1\'=(2-1)/(2+1)\\cdot 4 = 4/3\\approx 1{,}33\\,\\text{m/s}$.<br>$v_2\'=2\\cdot 2/3\\cdot 4 = 16/3\\approx 5{,}33\\,\\text{m/s}$.<br>Kontrolle Impuls: $2\\cdot 4 = 8 = 2\\cdot 4/3 + 1\\cdot 16/3 = 24/3=8$. ✓<br>$$\\boxed{v_1\'\\approx 1{,}33,\\ v_2\'\\approx 5{,}33\\,\\text{m/s}}$$'
                },
                {
                    q: 'Eine Spule mit $N=200$ Windungen umschließt einen magn. Fluss, der sich linear von $0$ auf $0{,}1\\,\\text{Vs}$ in $50\\,\\text{ms}$ ändert. Welche Induktionsspannung tritt auf?',
                    h: 'Faraday: $U=-N\\,d\\Phi/dt$.',
                    s: '$|U|=200\\cdot 0{,}1/0{,}05 = 200\\cdot 2 = 400\\,\\text{V}$.<br>$$\\boxed{|U|=400\\,\\text{V}}$$ Vorzeichen nach Lenzscher Regel: induzierter Strom wirkt der Flussänderung entgegen.'
                },
                {
                    q: 'Ein idealer Carnot-Prozess arbeitet zwischen $T_w=600\\,\\text{K}$ und $T_k=300\\,\\text{K}$. Berechne den Wirkungsgrad.',
                    h: '$\\eta=1-T_k/T_w$ (Temperaturen in Kelvin).',
                    s: '$\\eta=1-300/600=0{,}5=50\\%$.<br>$$\\boxed{\\eta=50\\%}$$ Theoretisches Maximum bei diesen Reservoirtemperaturen.'
                },
                {
                    q: 'Doppler-Effekt: ein Krankenwagen mit Sirene $f=1000\\,\\text{Hz}$ nähert sich mit $v_q=20\\,\\text{m/s}$. Welche Frequenz hört der ruhende Beobachter? ($c=343\\,\\text{m/s}$).',
                    h: '$f\' = f\\cdot c/(c-v_q)$ bei sich nähernder Quelle.',
                    s: '$f\'=1000\\cdot 343/(343-20)=1000\\cdot 343/323\\approx 1062\\,\\text{Hz}$.<br>$$\\boxed{f\'\\approx 1062\\,\\text{Hz}}$$ Höher als $f$ — beim Vorbeifahren springt sie auf $f\'\'=1000\\cdot 343/363\\approx 945\\,\\text{Hz}$.'
                },
                {
                    q: 'Bragg-Reflexion: Röntgenstrahlung mit $\\lambda=0{,}154\\,\\text{nm}$ (Cu-K$\\alpha$) wird an Kristall mit $d=0{,}2\\,\\text{nm}$ gebeugt. Bei welchem Winkel $\\theta$ tritt die 1. Ordnung auf?',
                    h: '$2d\\sin\\theta=n\\lambda$, $n=1$.',
                    s: '$\\sin\\theta=\\lambda/(2d)=0{,}154/0{,}4=0{,}385$.<br>$\\theta\\approx 22{,}65°$.<br>$$\\boxed{\\theta\\approx 22{,}7°}$$ (gemessen vom Kristallplan, nicht vom Lot).'
                },
                {
                    q: 'Wärmeleitung: Wand $A=10\\,\\text{m}^2$, $d=0{,}2\\,\\text{m}$, $\\lambda=0{,}5\\,\\text{W/(m K)}$, $T_i=20°C$, $T_a=0°C$. Berechne den Wärmestrom $\\dot Q$.',
                    h: '$\\dot Q = \\lambda A\\Delta T/d$.',
                    s: '$\\dot Q=0{,}5\\cdot 10\\cdot 20/0{,}2=500\\,\\text{W}$.<br>$$\\boxed{\\dot Q=500\\,\\text{W}}$$ Heizungsleistung, um stationär zu kompensieren.'
                },
                {
                    q: 'Drehimpulserhaltung: Eiskunstläuferin mit $I_1=4\\,\\text{kg m}^2$ und $\\omega_1=2\\,\\text{rad/s}$ zieht Arme an $\\Rightarrow I_2=2\\,\\text{kg m}^2$. Welche Endwinkelgeschwindigkeit, welche Energieänderung?',
                    h: '$L=I\\omega = $ const. $E_{rot}=\\tfrac12 I\\omega^2$.',
                    s: '$\\omega_2 = I_1\\omega_1/I_2 = 4\\cdot 2/2 = 4\\,\\text{rad/s}$.<br>$E_1=\\tfrac12\\cdot 4\\cdot 4=8\\,\\text{J}$, $E_2=\\tfrac12\\cdot 2\\cdot 16=16\\,\\text{J}$.<br>$\\Delta E = +8\\,\\text{J}$ aus Muskelarbeit (Arme gegen Zentrifugalkraft anziehen).<br>$$\\boxed{\\omega_2=4\\,\\text{rad/s},\\ \\Delta E=+8\\,\\text{J}}$$'
                },
                {
                    q: 'Plattenkondensator: $A=0{,}01\\,\\text{m}^2$, $d=1\\,\\text{mm}$, Vakuum. Berechne $C$ und Energie bei $U=100\\,\\text{V}$. ($\\varepsilon_0=8{,}85\\cdot 10^{-12}$).',
                    h: '$C=\\varepsilon_0 A/d$, $W=\\tfrac12 CU^2$.',
                    s: '$C=8{,}85\\cdot 10^{-12}\\cdot 0{,}01/10^{-3}=8{,}85\\cdot 10^{-11}\\,\\text{F}\\approx 88{,}5\\,\\text{pF}$.<br>$W=0{,}5\\cdot 8{,}85\\cdot 10^{-11}\\cdot 10^4 = 4{,}43\\cdot 10^{-7}\\,\\text{J}\\approx 0{,}44\\,\\mu\\text{J}$.<br>$$\\boxed{C\\approx 88{,}5\\,\\text{pF},\\ W\\approx 0{,}44\\,\\mu\\text{J}}$$'
                }
            ],
            // L3
            [
                {
                    q: 'Gedämpfte Schwingung: $m\\ddot x + d\\dot x + kx = 0$. Bestimme Bewegungsgleichung-Kennwerte und Klassifikation für $m=1$, $d=2$, $k=5$.',
                    h: '$\\omega_0=\\sqrt{k/m}$. Dämpfungsmaß $D=d/(2\\sqrt{km})$. $D<1$ unterdämpft, $D=1$ aperiodisch, $D>1$ kriechend.',
                    s: '$\\omega_0=\\sqrt{5}\\approx 2{,}24$.<br>$D=2/(2\\sqrt{5})=1/\\sqrt{5}\\approx 0{,}447 <1$.<br>$\\omega_d=\\omega_0\\sqrt{1-D^2}=\\sqrt{5}\\sqrt{0{,}8}=2$.<br>$$\\boxed{\\text{Unterdämpft};\\ \\omega_d=2\\,\\text{rad/s}}$$ Lösung: $x(t)=e^{-t}(C_1\\cos 2t+C_2\\sin 2t)$.'
                },
                {
                    q: 'Maxwell: bestimme den Verschiebungsstrom $i_v$ in einem Plattenkondensator mit Plattenfläche $A=10^{-3}\\,\\text{m}^2$, in dem $E$ mit $dE/dt = 10^9\\,\\text{V/(m s)}$ steigt. ($\\varepsilon_0=8{,}85\\cdot 10^{-12}$).',
                    h: '$i_v=\\varepsilon_0 A\\,dE/dt$.',
                    s: '$i_v=8{,}85\\cdot 10^{-12}\\cdot 10^{-3}\\cdot 10^9 = 8{,}85\\cdot 10^{-6}\\,\\text{A}\\approx 8{,}85\\,\\mu\\text{A}$.<br>$$\\boxed{i_v\\approx 8{,}85\\,\\mu\\text{A}}$$'
                },
                {
                    q: 'Ein Elektron beschleunigt durch eine Spannung $U=1\\,\\text{kV}$ aus der Ruhe. Berechne (nicht-relativistisch) die Geschwindigkeit. ($m_e=9{,}11\\cdot 10^{-31}\\,\\text{kg}$).',
                    h: 'Energiesatz: $eU=\\tfrac12 m_e v^2$.',
                    s: '$v=\\sqrt{2eU/m_e}=\\sqrt{2\\cdot 1{,}6\\cdot 10^{-19}\\cdot 1000/9{,}11\\cdot 10^{-31}}=\\sqrt{3{,}51\\cdot 10^{14}}\\approx 1{,}87\\cdot 10^7\\,\\text{m/s}$.<br>$$\\boxed{v\\approx 1{,}87\\cdot 10^7\\,\\text{m/s}}\\approx 6\\% c$$ (gerade noch nicht-relativistisch zulässig).'
                },
                {
                    q: 'Stehende Welle auf einer Saite ($L=0{,}5\\,\\text{m}$, beidseitig fest). Welche Eigenfrequenzen treten auf, wenn die Wellengeschwindigkeit $c=300\\,\\text{m/s}$ ist?',
                    h: '$\\lambda_n=2L/n$, $f_n=c/\\lambda_n = nc/(2L)$.',
                    s: '$f_n = n\\cdot 300/(2\\cdot 0{,}5)=n\\cdot 300\\,\\text{Hz}$.<br>Grundfrequenz $f_1=300\\,\\text{Hz}$, Oberschwingungen $f_n=n\\cdot 300\\,\\text{Hz}$.<br>$$\\boxed{f_n=n\\cdot 300\\,\\text{Hz}}$$'
                },
                {
                    q: 'Plancksche Strahlung: berechne die Wellenlänge des Strahlungsmaximums eines schwarzen Körpers bei $T=3000\\,\\text{K}$ (Wiensches Verschiebungsgesetz $\\lambda_{max}T=b$, $b=2{,}898\\cdot 10^{-3}\\,\\text{m K}$).',
                    h: '$\\lambda_{max}=b/T$.',
                    s: '$\\lambda_{max}=2{,}898\\cdot 10^{-3}/3000\\approx 9{,}66\\cdot 10^{-7}\\,\\text{m}\\approx 966\\,\\text{nm}$ (nahes Infrarot).<br>$$\\boxed{\\lambda_{max}\\approx 966\\,\\text{nm}}$$'
                },
                {
                    q: 'Berechne die relativistische kinetische Energie eines Protons mit Geschwindigkeit $v=0{,}8\\,c$. ($m_p c^2 \\approx 938\\,\\text{MeV}$).',
                    h: 'Lorentzfaktor $\\gamma=1/\\sqrt{1-(v/c)^2}$. $E_{kin}=(\\gamma-1)mc^2$.',
                    s: '$\\gamma=1/\\sqrt{1-0{,}64}=1/\\sqrt{0{,}36}=1/0{,}6\\approx 1{,}667$.<br>$E_{kin}=(1{,}667-1)\\cdot 938\\,\\text{MeV}\\approx 625\\,\\text{MeV}$.<br>$$\\boxed{E_{kin}\\approx 625\\,\\text{MeV}}$$ Klassisch wäre $\\tfrac12 m v^2\\approx 300\\,\\text{MeV}$ (deutlich zu wenig).'
                },
                {
                    q: 'Fermi-Energie eines freien Elektronengases in Kupfer ($n=8{,}5\\cdot 10^{28}\\,\\text{m}^{-3}$). Berechne $E_F$ in eV. ($\\hbar=1{,}055\\cdot 10^{-34}\\,\\text{Js}$, $m_e=9{,}11\\cdot 10^{-31}\\,\\text{kg}$).',
                    h: '$E_F=\\dfrac{\\hbar^2}{2m_e}(3\\pi^2 n)^{2/3}$.',
                    s: '$3\\pi^2 n\\approx 29{,}6\\cdot 8{,}5\\cdot 10^{28}\\approx 2{,}52\\cdot 10^{30}$.<br>$(...)^{2/3}\\approx (2{,}52\\cdot 10^{30})^{2/3}\\approx 1{,}85\\cdot 10^{20}\\,\\text{m}^{-2}$.<br>$\\hbar^2/(2m_e)=(1{,}055\\cdot 10^{-34})^2/(2\\cdot 9{,}11\\cdot 10^{-31})\\approx 6{,}10\\cdot 10^{-39}\\,\\text{J m}^2$.<br>$E_F\\approx 6{,}10\\cdot 10^{-39}\\cdot 1{,}85\\cdot 10^{20}\\approx 1{,}13\\cdot 10^{-18}\\,\\text{J}\\approx 7{,}05\\,\\text{eV}$.<br>$$\\boxed{E_F\\approx 7\\,\\text{eV}}$$ (Literaturwert: 7,0 eV ✓).'
                },
                {
                    q: 'Erzwungene gedämpfte Schwingung: System aus L3.1 ($m=1, d=2, k=5$) mit Anregung $F_0\\cos\\omega t$, $F_0=1$. Berechne Resonanzamplitude $A(\\omega)$ und Resonanzfrequenz $\\omega_R$.',
                    h: '$A(\\omega)=F_0/m\\,/\\sqrt{(\\omega_0^2-\\omega^2)^2+(2D\\omega_0\\omega)^2}$. Resonanz $\\omega_R=\\omega_0\\sqrt{1-2D^2}$.',
                    s: '$\\omega_0^2=5$, $D=1/\\sqrt 5$, $2D^2=0{,}4$.<br>$\\omega_R=\\sqrt 5\\cdot\\sqrt{0{,}6}=\\sqrt{3}\\approx 1{,}732$.<br>$A(\\omega_R)=1/(2D\\omega_0\\sqrt{1-D^2})=1/(2\\cdot 1/\\sqrt 5\\cdot\\sqrt 5\\cdot\\sqrt{0{,}8})=1/(2\\sqrt{0{,}8})\\approx 0{,}559$.<br>$$\\boxed{\\omega_R\\approx 1{,}73,\\ A(\\omega_R)\\approx 0{,}56}$$ Verstärkungsfaktor $A/A_0 = A\\cdot k = 2{,}79$.'
                },
                {
                    q: 'Photoelektrischer Effekt: Cäsium hat Austrittsarbeit $W_a=2{,}1\\,\\text{eV}$. Welche maximale Wellenlänge löst Photoelektronen aus, und welche kinetische Energie haben sie bei $\\lambda=300\\,\\text{nm}$?',
                    h: 'Einstein: $hf=W_a+E_{kin,max}$. Grenzwellenlänge: $\\lambda_g=hc/W_a$.',
                    s: '$\\lambda_g = hc/W_a = 1240\\,\\text{eV nm}/2{,}1\\,\\text{eV}\\approx 590\\,\\text{nm}$ (gelb).<br>Bei $\\lambda=300\\,\\text{nm}$: $hf=1240/300\\approx 4{,}13\\,\\text{eV}$.<br>$E_{kin,max}=4{,}13-2{,}1\\approx 2{,}03\\,\\text{eV}$.<br>$$\\boxed{\\lambda_g\\approx 590\\,\\text{nm},\\ E_{kin,max}\\approx 2{,}0\\,\\text{eV}}$$'
                },
                {
                    q: 'Maxwellsche Gleichung in Integralform: leite den verschiebungs-strombasierten Ampère-Maxwell für einen Plattenkondensator ($I_C$ Leitungsstrom, kein Leiter zwischen Platten) im stationären Sinusbetrieb her.',
                    h: '$\\oint H\\,d\\ell=I_{eingeschlossen}+\\varepsilon_0 d\\Phi_E/dt$.',
                    s: 'Zwischen den Platten: $I_{leit}=0$, aber $E$ ändert sich. Mit $E=U/d$ und $U=Q/C$: $\\dot E=\\dot Q/(Cd)=I_C/(Cd)$.<br>Verschiebungsstrom durch Plattenfläche: $I_v=\\varepsilon_0 A\\,dE/dt=\\varepsilon_0 A I_C/(Cd)$. Mit $C=\\varepsilon_0 A/d$ folgt $I_v=I_C$.<br>$\\Rightarrow$ Konsistenz von Ampère-Maxwell: derselbe magnetische Fluss um den Draht wie um den Kondensator-Spalt. Hier ist Maxwells Erweiterung essentiell.'
                },
                {
                    q: 'Quanten-Tunneleffekt: Wahrscheinlichkeit, dass ein Elektron durch eine Rechteckbarriere ($V=10\\,\\text{eV}$, Breite $a=0{,}5\\,\\text{nm}$) tunnelt mit $E=5\\,\\text{eV}$. ($\\hbar=1{,}055\\cdot 10^{-34}$, $m_e=9{,}11\\cdot 10^{-31}$).',
                    h: 'Näherung: $T\\approx \\exp(-2\\kappa a)$ mit $\\kappa=\\sqrt{2m(V-E)}/\\hbar$.',
                    s: '$V-E=5\\,\\text{eV}=8\\cdot 10^{-19}\\,\\text{J}$.<br>$\\kappa=\\sqrt{2\\cdot 9{,}11\\cdot 10^{-31}\\cdot 8\\cdot 10^{-19}}/1{,}055\\cdot 10^{-34}=\\sqrt{1{,}458\\cdot 10^{-48}}/1{,}055\\cdot 10^{-34}\\approx 1{,}21\\cdot 10^{-24}/1{,}055\\cdot 10^{-34}\\approx 1{,}15\\cdot 10^{10}\\,\\text{m}^{-1}$.<br>$2\\kappa a = 2\\cdot 1{,}15\\cdot 10^{10}\\cdot 5\\cdot 10^{-10}=11{,}5$.<br>$T\\approx e^{-11{,}5}\\approx 1{,}0\\cdot 10^{-5}$.<br>$$\\boxed{T\\approx 10^{-5}}$$ Stark abstands-/höhenabhängig (exponentiell). Basis von Tunneldioden, REM-Mikroskop.'
                }
            ]
        ]
    };
})();
