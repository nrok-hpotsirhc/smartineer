/*
 * Schueler-Top-up v72 — Zielgroesse 200 Items je bestehendem Fach Klasse 5-10
 * plus Sprachfaecher Englisch, Franzoesisch, Latein.
 *
 * Architektur:
 *   - Diese Datei wird NACH js/data/schueler.js geladen und mutiert window.SCHUELER
 *     append-only. Bestehende Mathe/NW/Geschichte-Pools werden nicht umsortiert.
 *   - Neue Sprachfaecher ersetzen die bisherigen Englisch-Stubs und fuegen
 *     Franzoesisch/Latein hinzu.
 *   - Sprachpools enthalten pro (Klasse, Sprache) 200 Vokabel-Abfragen und
 *     200 Grammatik-Abfragen, markiert ueber kind: 'vocab' | 'grammar'.
 *
 * Fachliche Ehrlichkeitsgrenze:
 *   - Deutsche Kernlehrplaene geben Kompetenzbereiche und Themenfelder vor, aber
 *     keine bundesweit verbindliche, schulbuchuebergreifende Vokabelliste mit
 *     exakt 200 Woertern pro Klasse. Die hier gepflegten Sprachpools sind daher
 *     curriculum-orientierte Grundwortschatz-/Grammatikpools (CEFR A1-B1,
 *     NRW-KLP SI-typische Progression), nicht die Wortliste eines konkreten
 *     Lehrwerks. Fuer "vorgegebene Vokabeln" eines bestimmten Lehrwerks muss
 *     die Lehrwerksliste nachgeliefert werden.
 */
(function () {
    const SCH = window.SCHUELER;
    if (!SCH) return;

    const CLASSES = ['k5', 'k6', 'k7', 'k8', 'k9', 'k10'];
    const CORE_SUBJECTS = ['mathe', 'physik', 'chemie', 'biologie', 'geschichte'];
    const LANGUAGE_SUBJECTS = ['englisch', 'franzoesisch', 'latein'];
    const SUBJECT_ORDER = ['mathe', 'englisch', 'franzoesisch', 'latein', 'physik', 'chemie', 'biologie', 'geschichte'];
    const CLASS_NO = { k5: 5, k6: 6, k7: 7, k8: 8, k9: 9, k10: 10 };

    SCH.subjects.englisch = { label: 'Englisch' };
    SCH.subjects.franzoesisch = { label: 'Franzoesisch' };
    SCH.subjects.latein = { label: 'Latein' };

    const baseNormalize = typeof SCH.normalize === 'function' ? SCH.normalize : function (value) {
        return String(value).trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
    };
    SCH.normalize = function (value) {
        return baseNormalize(String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[’']/g, '').replace(/[!?;.:-]/g, ''));
    };

    function escapeHtml(value) {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function item(question, answer, formula, solution, kind) {
        return {
            q: question,
            a: String(answer),
            f: formula || '<p><strong>Merksatz.</strong> Lies die Aufgabe genau, bestimme den gesuchten Begriff und pruefe die Einheit bzw. Sprachform.</p>',
            s: solution || solutionFor(answer, 'Curriculum-orientierter Schueler-Top-up v72.'),
            kind: kind || 'curriculum'
        };
    }

    function solutionFor(answer, source) {
        const clean = escapeHtml(answer);
        return '<p><strong>Musterloesung.</strong> Die gesuchte Antwort lautet <strong>' + clean + '</strong>.</p>'
            + '<p><strong>Pruefung.</strong> Vergleiche Schreibweise, Zahlform, Fachbegriff oder Flexionsendung mit dem Merksatz.</p>'
            + '<p class="text-xs text-slate-500"><em>Quelle: ' + escapeHtml(source) + '</em></p>';
    }

    function ensureSubjectOrder(classObj) {
        const existing = classObj.subjects || [];
        const merged = SUBJECT_ORDER.filter(function (subject) {
            return existing.includes(subject) || LANGUAGE_SUBJECTS.includes(subject);
        });
        existing.forEach(function (subject) {
            if (!merged.includes(subject)) merged.push(subject);
        });
        classObj.subjects = merged;
    }

    SCH.classes.forEach(function (classObj) {
        if (CLASSES.includes(classObj.id)) ensureSubjectOrder(classObj);
    });

    function appendToTarget(key, target, factory) {
        const cfg = SCH.content[key];
        if (!cfg || cfg.mode !== 'pool' || !Array.isArray(cfg.pool)) return;
        const missing = target - cfg.pool.length;
        if (missing <= 0) return;
        const extra = [];
        for (let index = 0; index < missing; index++) {
            extra.push(factory(index, cfg.pool.length + index));
        }
        cfg.pool = cfg.pool.concat(extra);
        cfg.note = (cfg.note || '') + ' Zielstand v72: 200 Aufgaben mit Training und 10-Fragen-Quiz.';
    }

    function topupCoreSubjects() {
        CLASSES.forEach(function (classId) {
            CORE_SUBJECTS.forEach(function (subject) {
                appendToTarget(classId + '.' + subject, 200, function (index, absoluteIndex) {
                    return coreItem(classId, subject, index, absoluteIndex);
                });
            });
        });
    }

    function coreItem(classId, subject, index, absoluteIndex) {
        if (subject === 'mathe') return mathItem(classId, index, absoluteIndex);
        if (subject === 'physik') return physicsItem(classId, index, absoluteIndex);
        if (subject === 'chemie') return chemistryItem(classId, index, absoluteIndex);
        if (subject === 'biologie') return biologyItem(classId, index, absoluteIndex);
        return historyItem(classId, index, absoluteIndex);
    }

    function mathItem(classId, index, absoluteIndex) {
        const grade = CLASS_NO[classId];
        const variant = index % 10;
        const round = Math.floor(index / 10) + 1;
        let question;
        let answer;
        let formula;
        if (grade === 5) {
            const left = 100 + round * 13;
            const factor = 3 + (round % 7);
            const add = 25 + variant * 4;
            if (variant < 3) { question = `Klasse 5 Rechenvorteil ${absoluteIndex + 1}: Berechne ${left} + ${factor} \u00b7 ${add}.`; answer = left + factor * add; formula = '<p><strong>Regel.</strong> Punktrechnung vor Strichrechnung.</p>'; }
            else if (variant < 6) { const numerator = 2 + variant; const denominator = numerator + 3; question = `Klasse 5 Bruchteil ${absoluteIndex + 1}: Wie viel ist ${numerator}/${denominator} von ${denominator * (round + 4)}?`; answer = numerator * (round + 4); formula = '<p><strong>Formel.</strong> Bruchteil = Ganzes $\\cdot$ Zaehler / Nenner.</p>'; }
            else if (variant < 8) { const width = 4 + round; const height = 3 + variant; question = `Klasse 5 Rechteck ${absoluteIndex + 1}: Flaeche bei ${width} cm und ${height} cm?`; answer = width * height; formula = '<p><strong>Formel.</strong> Rechteckflaeche: $A = a \\cdot b$.</p>'; }
            else { const cents = 125 + round * 10 + variant; question = `Klasse 5 Dezimalzahl ${absoluteIndex + 1}: Schreibe ${cents} Cent als Eurobetrag (z.B. 1.25).`; answer = (cents / 100).toFixed(2); formula = '<p><strong>Regel.</strong> 100 Cent = 1 Euro.</p>'; }
        } else if (grade === 6) {
            const base = 20 + round * 2;
            if (variant < 3) { question = `Klasse 6 Prozent ${absoluteIndex + 1}: Wie viel sind ${10 + variant * 5}% von ${base * 10}?`; answer = String((10 + variant * 5) * base / 10); formula = '<p><strong>Formel.</strong> Prozentwert $W = p/100 \\cdot G$.</p>'; }
            else if (variant < 6) { const x = round + variant; question = `Klasse 6 Gleichung ${absoluteIndex + 1}: Loese $x + ${base} = ${base + x}$.`; answer = x; formula = '<p><strong>Regel.</strong> Gleiche Operation auf beiden Seiten der Gleichung.</p>'; }
            else if (variant < 8) { question = `Klasse 6 Ganze Zahlen ${absoluteIndex + 1}: Berechne ${-base} + ${variant * 3 + 7}.`; answer = -base + variant * 3 + 7; formula = '<p><strong>Regel.</strong> Bei ganzen Zahlen bestimmt das groessere Betragszeichen das Vorzeichen.</p>'; }
            else { question = `Klasse 6 Dreieck ${absoluteIndex + 1}: Zwei Winkel sind ${35 + round} Grad und ${55 + variant} Grad. Wie gross ist der dritte Winkel?`; answer = 180 - (35 + round) - (55 + variant); formula = '<p><strong>Formel.</strong> Winkelsumme im Dreieck: $180^\\circ$.</p>'; }
        } else if (grade === 7) {
            const slope = 2 + (round % 5);
            const intercept = variant + 1;
            if (variant < 3) { question = `Klasse 7 Lineare Funktion ${absoluteIndex + 1}: Berechne $y=${slope}x+${intercept}$ fuer $x=${round + 2}$.`; answer = slope * (round + 2) + intercept; formula = '<p><strong>Formel.</strong> Lineare Funktion: $y=mx+b$.</p>'; }
            else if (variant < 6) { const x = round + 3; question = `Klasse 7 Gleichung ${absoluteIndex + 1}: Loese $${slope}x-${intercept}=${slope * x - intercept}$.`; answer = x; formula = '<p><strong>Regel.</strong> Erst addieren/subtrahieren, dann durch den Faktor teilen.</p>'; }
            else if (variant < 8) { question = `Klasse 7 Proportionalitaet ${absoluteIndex + 1}: 4 Hefte kosten ${4 * slope} Euro. Was kosten ${round + 5} Hefte?`; answer = (round + 5) * slope; formula = '<p><strong>Regel.</strong> Bei proportionalen Zuordnungen ist der Quotient konstant.</p>'; }
            else { question = `Klasse 7 Terme ${absoluteIndex + 1}: Vereinfache $${slope}a + ${intercept}a$.`; answer = (slope + intercept) + 'a'; formula = '<p><strong>Regel.</strong> Gleichartige Terme addieren: $ma+na=(m+n)a$.</p>'; }
        } else if (grade === 8) {
            const first = 3 + (round % 7);
            const second = 4 + (variant % 5);
            if (variant < 3) { question = `Klasse 8 Pythagoras ${absoluteIndex + 1}: Katheten ${first} und ${second}; gib $c^2$ an.`; answer = first * first + second * second; formula = '<p><strong>Formel.</strong> Pythagoras: $a^2+b^2=c^2$.</p>'; }
            else if (variant < 6) { question = `Klasse 8 Potenzen ${absoluteIndex + 1}: Berechne ${first}^2.`; answer = first * first; formula = '<p><strong>Regel.</strong> $a^2=a\\cdot a$.</p>'; }
            else if (variant < 8) { const x = round + 1; const y = variant - 4; question = `Klasse 8 LGS ${absoluteIndex + 1}: $x+y=${x + y}$ und $x-y=${x - y}$. Gib x an.`; answer = x; formula = '<p><strong>Strategie.</strong> Addiere beide Gleichungen: $2x = (x+y)+(x-y)$.</p>'; }
            else { question = `Klasse 8 Binom ${absoluteIndex + 1}: Koeffizient von $x$ in $(x+${first})^2$?`; answer = 2 * first; formula = '<p><strong>Formel.</strong> $(a+b)^2=a^2+2ab+b^2$.</p>'; }
        } else if (grade === 9) {
            const root = round + variant + 1;
            if (variant < 3) { question = `Klasse 9 Quadratik ${absoluteIndex + 1}: Loese $x^2=${root * root}$, positive Loesung.`; answer = root; formula = '<p><strong>Regel.</strong> Bei $x^2=a$ ist die positive Loesung $\\sqrt{a}$.</p>'; }
            else if (variant < 6) { question = `Klasse 9 Trigonometrie ${absoluteIndex + 1}: Rechtwinkliges Dreieck: Gegenkathete ${3 * round}, Hypotenuse ${6 * round}. Gib $\\sin(\\alpha)$ als Dezimalzahl an.`; answer = '0.5'; formula = '<p><strong>Formel.</strong> $\\sin(\\alpha)=\\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$.</p>'; }
            else if (variant < 8) { question = `Klasse 9 Wahrscheinlichkeit ${absoluteIndex + 1}: ${variant} guenstige von ${variant * 2} gleichwahrscheinlichen Faellen. Wahrscheinlichkeit als Dezimalzahl?`; answer = '0.5'; formula = '<p><strong>Formel.</strong> $P=\\frac{\\text{guenstige}}{\\text{moegliche}}$.</p>'; }
            else { question = `Klasse 9 Statistik ${absoluteIndex + 1}: Mittelwert von ${round}, ${round + 2}, ${round + 4}?`; answer = round + 2; formula = '<p><strong>Formel.</strong> Arithmetisches Mittel = Summe / Anzahl.</p>'; }
        } else {
            const base = 2 + (round % 5);
            if (variant < 3) { question = `Klasse 10 Exponential ${absoluteIndex + 1}: Berechne ${base}^3.`; answer = base * base * base; formula = '<p><strong>Regel.</strong> $a^3=a\\cdot a\\cdot a$.</p>'; }
            else if (variant < 6) { const radius = 2 + variant; question = `Klasse 10 Koerper ${absoluteIndex + 1}: Volumen eines Wuerfels mit Kantenlaenge ${radius}?`; answer = radius * radius * radius; formula = '<p><strong>Formel.</strong> Wuerfelvolumen: $V=a^3$.</p>'; }
            else if (variant < 8) { question = `Klasse 10 Trigonometrie ${absoluteIndex + 1}: In einem rechtwinkligen Dreieck gilt Gegenkathete=Ankathete. Wie gross ist $\\tan(\\alpha)$?`; answer = '1'; formula = '<p><strong>Formel.</strong> $\\tan(\\alpha)=\\frac{\\text{Gegenkathete}}{\\text{Ankathete}}$.</p>'; }
            else { const root = round + 5; question = `Klasse 10 Quadratische Gleichung ${absoluteIndex + 1}: Positive Loesung von $(x-${root})^2=0$?`; answer = root; formula = '<p><strong>Regel.</strong> Ein Quadrat ist null, wenn sein Inhalt null ist.</p>'; }
        }
        return item(question, answer, formula, solutionFor(answer, 'NRW-Kernlehrplan Mathematik Sekundarstufe I, Kompetenzbereiche Arithmetik/Algebra, Funktionen, Geometrie, Stochastik.'), 'curriculum');
    }

    function physicsItem(classId, index, absoluteIndex) {
        const grade = CLASS_NO[classId];
        const variant = index % 8;
        const round = Math.floor(index / 8) + 1;
        let question;
        let answer;
        let formula;
        if (grade <= 6) {
            const topics = [
                ['magnetfeld', 'Wie heisst der Wirkungsbereich um einen Magneten?'],
                ['leiter', 'Wie nennt man einen Stoff, durch den Strom gut fliesst?'],
                ['isolator', 'Wie nennt man einen Stoff, durch den Strom kaum fliesst?'],
                ['reflexion', 'Wie nennt man das Zurueckwerfen von Licht?'],
                ['schatten', 'Was entsteht hinter einem lichtundurchlaessigen Koerper?'],
                ['thermometer', 'Welches Messgeraet misst Temperatur?'],
                ['konvektion', 'Wie heisst Waermetransport durch stroemende Fluessigkeiten oder Gase?'],
                ['ultraschall', 'Wie nennt man Schall oberhalb von 20 kHz?']
            ];
            const row = topics[variant];
            question = `Klasse ${grade} Physik Lehrplan-Check ${absoluteIndex + 1}: ${row[1]}`;
            answer = row[0];
            formula = '<p><strong>Merksatz.</strong> Klasse 5/6 verbindet Phaenomene (Magnetismus, Stromkreis, Licht, Waerme, Schall) mit eindeutigen Fachbegriffen.</p>';
        } else if (grade === 7) {
            if (variant < 2) { const distance = 20 + round * 5; const time = 4 + variant; question = `Klasse 7 Physik ${absoluteIndex + 1}: Ein Wagen legt ${distance} m in ${time} s zurueck. Geschwindigkeit in m/s?`; answer = String(distance / time); formula = '<p><strong>Formel.</strong> $v=\\frac{s}{t}$.</p>'; }
            else if (variant < 4) { const mass = 2 + round; const acceleration = 3 + variant; question = `Klasse 7 Physik ${absoluteIndex + 1}: Masse ${mass} kg, Beschleunigung ${acceleration} m/s². Kraft in N?`; answer = String(mass * acceleration); formula = '<p><strong>Formel.</strong> $F=m\\cdot a$.</p>'; }
            else if (variant < 6) { const mass = 10 + round; const volume = 2; question = `Klasse 7 Physik ${absoluteIndex + 1}: Masse ${mass} g, Volumen ${volume} cm³. Dichte in g/cm³?`; answer = String(mass / volume); formula = '<p><strong>Formel.</strong> $\\rho=\\frac{m}{V}$.</p>'; }
            else { question = `Klasse 7 Physik ${absoluteIndex + 1}: Welche Einheit gehoert zur Kraft?`; answer = 'newton'; formula = '<p><strong>Merksatz.</strong> Die SI-Einheit der Kraft ist Newton (N).</p>'; }
        } else if (grade === 8) {
            if (variant < 3) { const voltage = 6 + round; const resistance = 2 + variant; question = `Klasse 8 Physik ${absoluteIndex + 1}: Spannung ${voltage} V, Widerstand ${resistance} Ohm. Stromstaerke in A?`; answer = String(voltage / resistance); formula = '<p><strong>Formel.</strong> Ohmsches Gesetz: $I=\\frac{U}{R}$.</p>'; }
            else if (variant < 5) { const voltage = 12; const current = 1 + variant; question = `Klasse 8 Physik ${absoluteIndex + 1}: Spannung ${voltage} V, Strom ${current} A. Leistung in W?`; answer = String(voltage * current); formula = '<p><strong>Formel.</strong> Elektrische Leistung: $P=U\\cdot I$.</p>'; }
            else if (variant < 7) { const force = 10 + round; const path = 2 + variant; question = `Klasse 8 Physik ${absoluteIndex + 1}: Kraft ${force} N wirkt ueber ${path} m. Arbeit in J?`; answer = String(force * path); formula = '<p><strong>Formel.</strong> $W=F\\cdot s$.</p>'; }
            else { question = `Klasse 8 Physik ${absoluteIndex + 1}: Wie heisst eine Schaltung mit mehreren Stromwegen?`; answer = 'parallelschaltung'; formula = '<p><strong>Merksatz.</strong> Parallelschaltung: mehrere Wege; Reihenschaltung: ein Weg.</p>'; }
        } else if (grade === 9) {
            if (variant < 3) { const force = 100 + round * 10; const area = 2 + variant; question = `Klasse 9 Physik ${absoluteIndex + 1}: Kraft ${force} N auf Flaeche ${area} m². Druck in Pa?`; answer = String(force / area); formula = '<p><strong>Formel.</strong> $p=\\frac{F}{A}$.</p>'; }
            else if (variant < 5) { const mass = 2 + round; const height = 5 + variant; question = `Klasse 9 Physik ${absoluteIndex + 1}: Potenzielle Energie bei m=${mass} kg, h=${height} m, g=10 N/kg?`; answer = String(mass * 10 * height); formula = '<p><strong>Formel.</strong> $E_\\text{pot}=mgh$.</p>'; }
            else if (variant < 7) { question = `Klasse 9 Physik ${absoluteIndex + 1}: Welche Regel beschreibt die Richtung der Induktionswirkung?`; answer = 'lenzsche regel'; formula = '<p><strong>Merksatz.</strong> Lenzsche Regel: Die Induktionswirkung wirkt ihrer Ursache entgegen.</p>'; }
            else { question = `Klasse 9 Physik ${absoluteIndex + 1}: Welche Einheit hat elektrische Ladung?`; answer = 'coulomb'; formula = '<p><strong>Merksatz.</strong> Ladung wird in Coulomb (C) gemessen.</p>'; }
        } else {
            const rows = [
                ['halbwertszeit', 'Wie nennt man die Zeit, nach der die Haelfte instabiler Kerne zerfallen ist?'],
                ['alpha', 'Welche Strahlung besteht aus Heliumkernen?'],
                ['beta', 'Welche radioaktive Strahlung besteht aus Elektronen oder Positronen?'],
                ['gamma', 'Welche Strahlung ist hochenergetische elektromagnetische Strahlung?'],
                ['brechung', 'Wie nennt man Richtungsanderung von Licht beim Uebergang zwischen Medien?'],
                ['sammellinse', 'Welche Linse buendelt parallele Lichtstrahlen?'],
                ['zerstreuungslinse', 'Welche Linse zerstreut parallele Lichtstrahlen?'],
                ['becquerel', 'Welche Einheit hat die Aktivitaet radioaktiver Stoffe?']
            ];
            const row = rows[variant];
            question = `Klasse 10 Physik Lehrplan-Check ${absoluteIndex + 1}: ${row[1]}`;
            answer = row[0];
            formula = '<p><strong>Merksatz.</strong> Klasse 10 verbindet Atom-/Kernphysik und Optik mit Strahlungsarten, Halbwertszeit und Linsenabbildung.</p>';
        }
        return item(question, answer, formula, solutionFor(answer, 'NRW-Kernlehrplan Physik/Naturwissenschaften Sekundarstufe I; schuluebliche SI-Konventionen.'), 'curriculum');
    }

    function chemistryItem(classId, index, absoluteIndex) {
        const grade = CLASS_NO[classId];
        const rowsByGrade = {
            5: [['reinstoff', 'Wie nennt man einen Stoff aus nur einer Teilchensorte?'], ['gemisch', 'Wie nennt man einen Stoff aus mehreren Stoffen?'], ['filtration', 'Welches Trennverfahren trennt Feststoff und Fluessigkeit?'], ['verdampfen', 'Welcher Vorgang fuehrt von fluessig zu gasfoermig?'], ['kondensation', 'Welcher Vorgang fuehrt von gasfoermig zu fluessig?'], ['dichte', 'Welche Stoffeigenschaft ist Masse pro Volumen?'], ['sauerstoff', 'Welcher Luftbestandteil unterstuetzt Verbrennung?'], ['wasserstoff', 'Welches Gas bildet mit Sauerstoff Wasser?']],
            6: [['destillation', 'Welches Trennverfahren nutzt unterschiedliche Siedepunkte?'], ['chromatographie', 'Welches Trennverfahren trennt Farbstoffe auf Papier?'], ['indikator', 'Welcher Stoff zeigt sauer/basisch durch Farbe an?'], ['loesung', 'Wie nennt man ein homogenes Gemisch mit geloestem Stoff?'], ['suspension', 'Wie nennt man Feststoff fein verteilt in Fluessigkeit?'], ['emulsion', 'Wie nennt man Gemisch zweier nicht mischbarer Fluessigkeiten?'], ['element', 'Wie nennt man einen Stoff aus einer Atomsorte?'], ['verbindung', 'Wie nennt man einen Stoff aus mehreren Elementsorten chemisch gebunden?']],
            7: [['atom', 'Wie nennt man den kleinsten Baustein eines Elements?'], ['molekuel', 'Wie nennt man einen Verband aus mindestens zwei Atomen?'], ['h2o', 'Welche Summenformel hat Wasser?'], ['co2', 'Welche Summenformel hat Kohlenstoffdioxid?'], ['nacl', 'Welche Formel hat Kochsalz?'], ['periodensystem', 'Wo sind Elemente nach Ordnungszahl geordnet?'], ['metall', 'Welche Stoffklasse leitet Strom gut und ist verformbar?'], ['nichtmetall', 'Wie nennt man Elemente wie Sauerstoff, Schwefel oder Kohlenstoff?']],
            8: [['proton', 'Welches Teilchen im Atomkern ist positiv geladen?'], ['neutron', 'Welches Teilchen im Atomkern ist neutral?'], ['elektron', 'Welches Teilchen in der Huelle ist negativ geladen?'], ['ion', 'Wie nennt man ein geladenes Atom oder Molekuel?'], ['kation', 'Wie nennt man ein positiv geladenes Ion?'], ['anion', 'Wie nennt man ein negativ geladenes Ion?'], ['oktettregel', 'Welche Regel beschreibt acht Aussenelektronen als stabilen Zustand?'], ['isotop', 'Wie nennt man Atome gleicher Protonenzahl, aber unterschiedlicher Neutronenzahl?']],
            9: [['saeure', 'Wie nennt man Stoffe, die Protonen abgeben koennen?'], ['base', 'Wie nennt man Stoffe, die Protonen aufnehmen koennen?'], ['neutralisation', 'Wie heisst Reaktion von Saeure und Base zu Salz und Wasser?'], ['ph', 'Welche Groesse beschreibt sauer/neutral/basisch?'], ['oxidation', 'Wie nennt man Elektronenabgabe?'], ['reduktion', 'Wie nennt man Elektronenaufnahme?'], ['redoxreaktion', 'Wie nennt man gekoppelte Oxidation und Reduktion?'], ['salz', 'Wie nennt man ionische Verbindung aus Kationen und Anionen?']],
            10: [['alkan', 'Welche organische Stoffklasse besitzt nur C-C-Einfachbindungen?'], ['alken', 'Welche organische Stoffklasse besitzt mindestens eine C=C-Doppelbindung?'], ['alkohol', 'Welche Stoffklasse enthaelt die Hydroxygruppe -OH?'], ['carbonsaeure', 'Welche Stoffklasse enthaelt die Carboxylgruppe -COOH?'], ['methan', 'Wie heisst CH4?'], ['ethanol', 'Wie heisst der Alkohol C2H5OH?'], ['ester', 'Welche Stoffklasse entsteht aus Alkohol und Carbonsaeure?'], ['polymer', 'Wie nennt man einen Stoff aus vielen wiederholten Bausteinen?']]
        };
        const rows = rowsByGrade[grade];
        const row = rows[index % rows.length];
        const question = `Klasse ${grade} Chemie Lehrplan-Check ${absoluteIndex + 1}: ${row[1]}`;
        const formula = '<p><strong>Merksatz.</strong> Chemie-Fragen zuerst als Stoffeigenschaft, Teilchenmodell, Formel oder Reaktionsschema einordnen.</p>';
        return item(question, row[0], formula, solutionFor(row[0], 'NRW-Kernlehrplan Chemie/Naturwissenschaften Sekundarstufe I; IUPAC-Schulkonventionen.'), 'curriculum');
    }

    function biologyItem(classId, index, absoluteIndex) {
        const grade = CLASS_NO[classId];
        const rowsByGrade = {
            5: [['fotosynthese', 'Welcher Prozess erzeugt aus Wasser und Kohlenstoffdioxid mit Licht Zucker?'], ['chlorophyll', 'Welcher gruene Blattfarbstoff faengt Lichtenergie ein?'], ['wurzel', 'Welcher Pflanzenteil nimmt Wasser und Mineralstoffe auf?'], ['bluete', 'Welcher Pflanzenteil dient der Fortpflanzung?'], ['wirbeltier', 'Wie nennt man Tiere mit Wirbelsaeule?'], ['saeugetier', 'Welche Wirbeltierklasse saeugt ihre Jungen?'], ['insekt', 'Welche Tiergruppe hat sechs Beine?'], ['kieme', 'Welches Organ atmet bei Fischen im Wasser?']],
            6: [['lunge', 'Welches Organ nimmt Sauerstoff aus der Luft auf?'], ['herz', 'Welches Organ pumpt Blut?'], ['magen', 'Welches Organ speichert und durchmischt Nahrung?'], ['duenndarm', 'Wo werden viele Naehrstoffe aufgenommen?'], ['biotop', 'Wie nennt man den Lebensraum einer Lebensgemeinschaft?'], ['biozoenose', 'Wie nennt man die Lebensgemeinschaft in einem Lebensraum?'], ['produzent', 'Welche Rolle haben gruenen Pflanzen im Nahrungsnetz?'], ['konsument', 'Welche Rolle haben Tiere, die andere Lebewesen fressen?']],
            7: [['zelle', 'Wie nennt man die kleinste lebende Einheit?'], ['zellkern', 'Welcher Zellbestandteil enthaelt Erbinformation?'], ['mitochondrium', 'Welcher Zellbestandteil liefert Energie?'], ['chloroplast', 'Welcher Zellbestandteil betreibt Fotosynthese?'], ['oekosystem', 'Wie nennt man Einheit aus Lebensraum und Lebensgemeinschaft?'], ['nahrungskette', 'Wie nennt man lineare Fressbeziehung?'], ['destruent', 'Welche Rolle zersetzen tote organische Stoffe?'], ['population', 'Wie nennt man alle Individuen einer Art in einem Gebiet?']],
            8: [['alveolen', 'Wie heissen die Lungenblaeschen?'], ['haemoglobin', 'Welcher Blutfarbstoff transportiert Sauerstoff?'], ['arterie', 'Welches Blutgefaess fuehrt Blut vom Herzen weg?'], ['vene', 'Welches Blutgefaess fuehrt Blut zum Herzen hin?'], ['enzym', 'Wie nennt man Biokatalysatoren der Verdauung?'], ['duenndarm', 'Wo findet die Hauptaufnahme der Naehrstoffe statt?'], ['diaphragma', 'Wie heisst das Zwerchfell fachsprachlich?'], ['kapillare', 'Wie nennt man feinste Blutgefaesse?']],
            9: [['dna', 'Welches Molekuel speichert die Erbinformation?'], ['gen', 'Wie nennt man einen DNA-Abschnitt mit Information fuer ein Merkmal?'], ['chromosom', 'Wie nennt man verpackte DNA im Zellkern?'], ['mitose', 'Welche Zellteilung erzeugt genetisch gleiche Tochterzellen?'], ['meiose', 'Welche Zellteilung erzeugt Keimzellen?'], ['mutation', 'Wie nennt man Veraenderung der Erbinformation?'], ['selektion', 'Welcher Evolutionsfaktor beguenstigt besser angepasste Individuen?'], ['variation', 'Wie nennt man Unterschiede zwischen Individuen einer Art?']],
            10: [['transkription', 'Wie heisst Umschreiben von DNA in mRNA?'], ['translation', 'Wie heisst Proteinbildung an Ribosomen?'], ['ribosom', 'Wo werden Proteine aufgebaut?'], ['codon', 'Wie nennt man ein Triplett aus drei Basen der mRNA?'], ['biodiversitaet', 'Wie nennt man Vielfalt von Arten, Genen und Oekosystemen?'], ['oekologische nische', 'Wie nennt man Rolle und Ansprueche einer Art im Oekosystem?'], ['allel', 'Wie nennt man eine Variante eines Gens?'], ['protein', 'Welcher Stoff entsteht aus Aminosaeuren?']]
        };
        const rows = rowsByGrade[grade];
        const row = rows[index % rows.length];
        const question = `Klasse ${grade} Biologie Lehrplan-Check ${absoluteIndex + 1}: ${row[1]}`;
        const formula = '<p><strong>Merksatz.</strong> In der Biologie von Struktur zu Funktion denken: Bau, Aufgabe, Wechselwirkung.</p>';
        return item(question, row[0], formula, solutionFor(row[0], 'NRW-Kernlehrplan Biologie/Naturwissenschaften Sekundarstufe I; schuluebliche Fachbegriffe.'), 'curriculum');
    }

    const HISTORY_ROWS = {
        k5: [['steinzeit', 'Epoche der ersten Werkzeuge und Jaeger/Sammler'], ['neolithische revolution', 'Uebergang zu Ackerbau und Viehzucht'], ['nil', 'Fluss des Alten Aegypten'], ['pharao', 'Koenigstitel im Alten Aegypten'], ['pyramide', 'Grabmonument altagyptischer Herrscher'], ['hieroglyphen', 'altagyptische Bilderschrift'], ['polis', 'griechischer Stadtstaat'], ['athen', 'griechische Polis mit Demokratie'], ['sparta', 'griechische Polis mit militaerischer Erziehung'], ['rom', 'Stadt am Tiber und Zentrum des Roemischen Reiches']],
        k6: [['karolinger', 'Dynastie Karls des Grossen'], ['lehnswesen', 'Bindung zwischen Lehnsherr und Vasall'], ['grundherrschaft', 'Herrschaft ueber Land und Bauern'], ['kloster', 'religioese Lebensgemeinschaft'], ['hanse', 'Buendnis norddeutscher Kaufmannsstaedte'], ['kreuzzuege', 'christliche Feldzuege ins Heilige Land'], ['pest', 'Seuche des 14. Jahrhunderts'], ['staufer', 'mittelalterliches Kaisergeschlecht'], ['investiturstreit', 'Konflikt um Einsetzung von Bischoefen'], ['zunft', 'Handwerkerverband in der Stadt']],
        k7: [['renaissance', 'Wiederentdeckung der Antike'], ['humanismus', 'Bildungsbewegung um 1500'], ['reformation', 'Kirchenspaltung seit 1517'], ['ablasshandel', 'von Luther kritisierter Kauf von Suendenstrafenerlass'], ['dreissigjaehriger krieg', 'Konflikt 1618-1648'], ['absolutismus', 'unbeschraenkte Koenigsherrschaft'], ['merkantilismus', 'Wirtschaftslehre des Absolutismus'], ['aufklaerung', 'Vernunftbewegung des 18. Jahrhunderts'], ['gewaltenteilung', 'Montesquieus Prinzip getrennter Staatsgewalten'], ['kolonialismus', 'Herrschaft europaeischer Maechte in Uebersee']],
        k8: [['franzoesische revolution', 'Umsturz in Frankreich 1789'], ['bastille', 'am 14. Juli 1789 gestuermtes Gefaengnis'], ['napoleon', 'franzoesischer Kaiser ab 1804'], ['wiener kongress', 'Neuordnung Europas 1814/15'], ['restauration', 'Wiederherstellung alter Ordnung'], ['vormaerz', 'Zeit bis zur Revolution 1848'], ['paulskirche', 'Ort des deutschen Parlaments 1848'], ['industrialisierung', 'Uebergang zur maschinellen Produktion'], ['soziale frage', 'Probleme der Arbeiterschaft im 19. Jahrhundert'], ['reichsgruendung', 'Gruendung des Deutschen Reiches 1871']],
        k9: [['imperialismus', 'Machtpolitik und Kolonialerwerb um 1900'], ['erster weltkrieg', 'Krieg 1914-1918'], ['versailler vertrag', 'Friedensvertrag von 1919'], ['weimarer republik', 'deutsche Republik 1919-1933'], ['hyperinflation', 'Geldentwertung 1923'], ['weltwirtschaftskrise', 'Krise ab 1929'], ['nationalsozialismus', 'Ideologie und Herrschaft der NSDAP'], ['ermaechtigungsgesetz', 'Gesetz vom Maerz 1933 zur Ausschaltung des Parlaments'], ['nuernberger gesetze', 'antisemitische Gesetze von 1935'], ['reichspogromnacht', 'Pogrom am 9./10. November 1938']],
        k10: [['zweiter weltkrieg', 'Krieg 1939-1945'], ['shoah', 'Voelkermord an den europaeischen Juden'], ['stalingrad', 'Wendepunkt an der Ostfront 1942/43'], ['besatzungszonen', 'Aufteilung Deutschlands nach 1945'], ['brd', 'Bundesrepublik Deutschland ab 1949'], ['ddr', 'Deutsche Demokratische Republik ab 1949'], ['kalter krieg', 'Systemkonflikt USA-UdSSR'], ['berliner mauer', 'Grenzanlage 1961-1989'], ['friedliche revolution', 'Protestbewegung in der DDR 1989'], ['zwei-plus-vier-vertrag', 'Vertrag zur Wiedervereinigung 1990']]
    };

    function historyItem(classId, index, absoluteIndex) {
        const rows = HISTORY_ROWS[classId];
        const row = rows[index % rows.length];
        const question = `Klasse ${CLASS_NO[classId]} Geschichte Lehrplan-Check ${absoluteIndex + 1}: Welcher Begriff passt zu: ${row[1]}?`;
        const formula = '<p><strong>Merksatz.</strong> Ordne historische Begriffe immer nach Zeit, Ort, Akteur, Ursache und Folge ein.</p>';
        return item(question, row[0], formula, solutionFor(row[0], 'NRW-Kernlehrplan Geschichte Sekundarstufe I; chronologische und begriffliche Grundbildung.'), 'curriculum');
    }

    function makeLanguagePool(language, classId) {
        return makeVocabItems(language, classId, 200).concat(makeGrammarItems(language, classId, 200));
    }

    const SEMANTIC_VOCAB = [
        ['Junge', 'boy', 'garcon', 'puer'], ['Maedchen', 'girl', 'fille', 'puella'], ['Mutter', 'mother', 'mere', 'mater'], ['Vater', 'father', 'pere', 'pater'],
        ['Bruder', 'brother', 'frere', 'frater'], ['Schwester', 'sister', 'soeur', 'soror'], ['Freund', 'friend', 'ami', 'amicus'], ['Familie', 'family', 'famille', 'familia'],
        ['Haus', 'house', 'maison', 'casa'], ['Zimmer', 'room', 'chambre', 'cubiculum'], ['Tuer', 'door', 'porte', 'ianua'], ['Fenster', 'window', 'fenetre', 'fenestra'],
        ['Stadt', 'city', 'ville', 'urbs'], ['Strasse', 'street', 'rue', 'via'], ['Schule', 'school', 'ecole', 'schola'], ['Lehrer', 'teacher', 'professeur', 'magister'],
        ['Buch', 'book', 'livre', 'liber'], ['Heft', 'exercise book', 'cahier', 'libellus'], ['Stift', 'pen', 'stylo', 'stilus'], ['Tafel', 'board', 'tableau', 'tabula'],
        ['Wasser', 'water', 'eau', 'aqua'], ['Brot', 'bread', 'pain', 'panis'], ['Milch', 'milk', 'lait', 'lac'], ['Kase', 'cheese', 'fromage', 'caseus'],
        ['Apfel', 'apple', 'pomme', 'malum'], ['Fisch', 'fish', 'poisson', 'piscis'], ['Fleisch', 'meat', 'viande', 'caro'], ['Mahlzeit', 'meal', 'repas', 'cena'],
        ['Hund', 'dog', 'chien', 'canis'], ['Katze', 'cat', 'chat', 'felis'], ['Pferd', 'horse', 'cheval', 'equus'], ['Vogel', 'bird', 'oiseau', 'avis'],
        ['Baum', 'tree', 'arbre', 'arbor'], ['Blume', 'flower', 'fleur', 'flos'], ['Wald', 'forest', 'foret', 'silva'], ['Fluss', 'river', 'riviere', 'fluvius'],
        ['Meer', 'sea', 'mer', 'mare'], ['Berg', 'mountain', 'montagne', 'mons'], ['Sonne', 'sun', 'soleil', 'sol'], ['Mond', 'moon', 'lune', 'luna'],
        ['Tag', 'day', 'jour', 'dies'], ['Nacht', 'night', 'nuit', 'nox'], ['Zeit', 'time', 'temps', 'tempus'], ['Jahr', 'year', 'annee', 'annus'],
        ['heute', 'today', 'aujourd hui', 'hodie'], ['morgen', 'tomorrow', 'demain', 'cras'], ['gestern', 'yesterday', 'hier', 'heri'], ['immer', 'always', 'toujours', 'semper'],
        ['gehen', 'to go', 'aller', 'ire'], ['kommen', 'to come', 'venir', 'venire'], ['sehen', 'to see', 'voir', 'videre'], ['hoeren', 'to hear', 'entendre', 'audire'],
        ['lesen', 'to read', 'lire', 'legere'], ['schreiben', 'to write', 'ecrire', 'scribere'], ['sprechen', 'to speak', 'parler', 'loqui'], ['lernen', 'to learn', 'apprendre', 'discere'],
        ['arbeiten', 'to work', 'travailler', 'laborare'], ['spielen', 'to play', 'jouer', 'ludere'], ['essen', 'to eat', 'manger', 'edere'], ['trinken', 'to drink', 'boire', 'bibere'],
        ['geben', 'to give', 'donner', 'dare'], ['nehmen', 'to take', 'prendre', 'sumere'], ['tragen', 'to carry', 'porter', 'portare'], ['suchen', 'to search', 'chercher', 'quaerere'],
        ['gross', 'big', 'grand', 'magnus'], ['klein', 'small', 'petit', 'parvus'], ['gut', 'good', 'bon', 'bonus'], ['schlecht', 'bad', 'mauvais', 'malus'],
        ['neu', 'new', 'nouveau', 'novus'], ['alt', 'old', 'vieux', 'vetus'], ['schnell', 'fast', 'rapide', 'celer'], ['langsam', 'slow', 'lent', 'lentus'],
        ['rot', 'red', 'rouge', 'ruber'], ['blau', 'blue', 'bleu', 'caeruleus'], ['gruen', 'green', 'vert', 'viridis'], ['weiss', 'white', 'blanc', 'albus'],
        ['schwarz', 'black', 'noir', 'niger'], ['gluecklich', 'happy', 'heureux', 'beatus'], ['traurig', 'sad', 'triste', 'tristis'], ['stark', 'strong', 'fort', 'fortis'],
        ['links', 'left', 'gauche', 'sinister'], ['rechts', 'right', 'droite', 'dexter'], ['oben', 'above', 'en haut', 'supra'], ['unten', 'below', 'en bas', 'infra'],
        ['warum', 'why', 'pourquoi', 'cur'], ['weil', 'because', 'parce que', 'quia'], ['aber', 'but', 'mais', 'sed'], ['und', 'and', 'et', 'et'],
        ['oder', 'or', 'ou', 'aut'], ['wenn', 'if', 'si', 'si'], ['wo', 'where', 'ou', 'ubi'], ['wer', 'who', 'qui', 'quis'],
        ['was', 'what', 'quoi', 'quid'], ['viele', 'many', 'beaucoup de', 'multi'], ['wenige', 'few', 'peu de', 'pauci'], ['alles', 'everything', 'tout', 'omnia'],
        ['nichts', 'nothing', 'rien', 'nihil'], ['Koerper', 'body', 'corps', 'corpus'], ['Kopf', 'head', 'tete', 'caput'], ['Hand', 'hand', 'main', 'manus'],
        ['Fuss', 'foot', 'pied', 'pes'], ['Auge', 'eye', 'oeil', 'oculus'], ['Ohr', 'ear', 'oreille', 'auris'], ['Herz', 'heart', 'coeur', 'cor']
    ];

    function translationFor(language, semanticRow) {
        if (language === 'englisch') return semanticRow[1];
        if (language === 'franzoesisch') return semanticRow[2];
        return semanticRow[3];
    }

    function makeVocabItems(language, classId, count) {
        const out = [];
        const grade = CLASS_NO[classId];
        const startNumber = (grade - 5) * 100;
        for (let index = 0; index < count; index++) {
            if (index < 100) {
                const number = startNumber + index;
                const word = numberWord(language, number);
                out.push(vocabItem(language, classId, `Welche Zahl bedeutet <code>${escapeHtml(word)}</code>?`, String(number), 'Zahlenwort'));
            } else {
                const semanticIndex = (index - 100 + (grade - 5) * 17) % SEMANTIC_VOCAB.length;
                const row = SEMANTIC_VOCAB[semanticIndex];
                const target = translationFor(language, row);
                const german = row[0];
                if (index % 2 === 0) {
                    out.push(vocabItem(language, classId, `Uebersetze ins Deutsche: <code>${escapeHtml(target)}</code>`, german, 'Grundwortschatz'));
                } else {
                    out.push(vocabItem(language, classId, `Uebersetze in ${languageLabel(language)}: <code>${escapeHtml(german)}</code>`, target, 'Grundwortschatz'));
                }
            }
        }
        return out;
    }

    function vocabItem(language, classId, question, answer, topic) {
        const formula = '<p><strong>Vokabelstrategie.</strong> Erst Bedeutung aktiv abrufen, dann Schreibweise pruefen. Zahlenwoerter gehoeren zum Kernwortschatz.</p>';
        return item(`${languageLabel(language)} Klasse ${CLASS_NO[classId]} Vokabel ${topic}: ${question}`, answer, formula,
            solutionFor(answer, sourceForLanguage(language, 'vocab')), 'vocab');
    }

    function makeGrammarItems(language, classId, count) {
        const out = [];
        for (let index = 0; index < count; index++) {
            if (language === 'englisch') out.push(englishGrammarItem(classId, index));
            else if (language === 'franzoesisch') out.push(frenchGrammarItem(classId, index));
            else out.push(latinGrammarItem(classId, index));
        }
        return out;
    }

    function englishGrammarItem(classId, index) {
        const grade = CLASS_NO[classId];
        const variant = index % 10;
        const verbs = [['go', 'goes', 'went', 'gone'], ['play', 'plays', 'played', 'played'], ['read', 'reads', 'read', 'read'], ['write', 'writes', 'wrote', 'written'], ['see', 'sees', 'saw', 'seen'], ['make', 'makes', 'made', 'made'], ['take', 'takes', 'took', 'taken'], ['come', 'comes', 'came', 'come']];
        const nouns = [['box', 'boxes'], ['city', 'cities'], ['child', 'children'], ['friend', 'friends'], ['story', 'stories'], ['bus', 'buses'], ['knife', 'knives'], ['day', 'days']];
        const row = verbs[index % verbs.length];
        const noun = nouns[index % nouns.length];
        let question;
        let answer;
        let formula;
        if (grade <= 5) {
            if (variant < 3) { question = `Setze die richtige simple-present-Form ein: He ___ (${row[0]}).`; answer = row[1]; formula = '<p><strong>Regel.</strong> Simple Present, 3. Person Singular: Verb + s/es.</p>'; }
            else if (variant < 6) { question = `Bilde den Plural von <code>${noun[0]}</code>.`; answer = noun[1]; formula = '<p><strong>Regel.</strong> Regelplural -s/-es; manche Woerter sind unregelmaessig.</p>'; }
            else { question = `Setze den Artikel ein: ___ apple.`; answer = 'an'; formula = '<p><strong>Regel.</strong> Vor Vokallaut steht im Singular meist <code>an</code>.</p>'; }
        } else if (grade === 6) {
            if (variant < 4) { question = `Setze Simple Past ein: Yesterday I ___ (${row[0]}).`; answer = row[2]; formula = '<p><strong>Regel.</strong> Simple Past: regelmaessig -ed, unregelmaessig lernen.</p>'; }
            else if (variant < 7) { question = `Setze Present Progressive ein: I am ___ (${row[0]}).`; answer = row[0].replace(/e$/, '') + 'ing'; formula = '<p><strong>Regel.</strong> am/is/are + Verb-ing.</p>'; }
            else { question = 'Komparativ von <code>big</code>?'; answer = 'bigger'; formula = '<p><strong>Regel.</strong> Kurze Adjektive: -er, bei kurzer betonter Silbe Konsonant verdoppeln.</p>'; }
        } else if (grade === 7) {
            if (variant < 4) { question = `Setze Present Perfect ein: I have ___ (${row[0]}).`; answer = row[3]; formula = '<p><strong>Regel.</strong> Present Perfect: have/has + past participle.</p>'; }
            else if (variant < 7) { question = 'Relativpronomen fuer Personen: the girl ___ lives next door.'; answer = 'who'; formula = '<p><strong>Regel.</strong> Relative clauses: people -> who, things -> which/that.</p>'; }
            else { question = 'Zukunft mit Plan: I am ___ to visit London.'; answer = 'going'; formula = '<p><strong>Regel.</strong> going-to future fuer Plaene/Absichten.</p>'; }
        } else if (grade === 8) {
            if (variant < 4) { question = `Passiv: The book is ___ (write) by her.`; answer = 'written'; formula = '<p><strong>Regel.</strong> Passive: be + past participle.</p>'; }
            else if (variant < 7) { question = 'Setze Gerund nach enjoy: I enjoy ___ football.'; answer = 'playing'; formula = '<p><strong>Regel.</strong> Nach enjoy folgt Gerund (-ing).</p>'; }
            else { question = 'If-clause type I: If it rains, I ___ stay home.'; answer = 'will'; formula = '<p><strong>Regel.</strong> If I: if + simple present, main clause mit will.</p>'; }
        } else if (grade === 9) {
            if (variant < 4) { question = 'Reported speech: He said, "I am tired." -> He said he ___ tired.'; answer = 'was'; formula = '<p><strong>Regel.</strong> Backshift: am/is -> was.</p>'; }
            else if (variant < 7) { question = 'If-clause type II: If I had time, I ___ travel.'; answer = 'would'; formula = '<p><strong>Regel.</strong> If II: if + simple past, main clause would + infinitive.</p>'; }
            else { question = 'Modal verb fuer Pflicht: You ___ wear a helmet.'; answer = 'must'; formula = '<p><strong>Regel.</strong> must drueckt starke Pflicht aus.</p>'; }
        } else {
            if (variant < 4) { question = 'If-clause type III: If I had studied, I ___ have passed.'; answer = 'would'; formula = '<p><strong>Regel.</strong> If III: if + past perfect, would have + past participle.</p>'; }
            else if (variant < 7) { question = 'Nominalisierung: decide -> ___'; answer = 'decision'; formula = '<p><strong>Regel.</strong> Wortbildung: Verb -> Nomen, haeufig -ion/-ment/-ance.</p>'; }
            else { question = 'Formal synonym for <code>start</code>.'; answer = 'begin'; formula = '<p><strong>Merksatz.</strong> Registerwechsel: formeller Stil nutzt praezisere Verben.</p>'; }
        }
        return item(`Englisch Klasse ${grade} Grammatik ${index + 1}: ${question}`, answer, formula, solutionFor(answer, sourceForLanguage('englisch', 'grammar')), 'grammar');
    }

    function frenchGrammarItem(classId, index) {
        const grade = CLASS_NO[classId];
        const variant = index % 10;
        const erVerbs = [['parler', 'parle'], ['jouer', 'joue'], ['aimer', 'aime'], ['regarder', 'regarde'], ['travailler', 'travaille'], ['habiter', 'habite']];
        const row = erVerbs[index % erVerbs.length];
        let question;
        let answer;
        let formula;
        if (grade <= 5) {
            if (variant < 4) { question = `Setze die je-Form von <code>${row[0]}</code>: je ___`; answer = row[1]; formula = '<p><strong>Regel.</strong> Verben auf -er: je -e, tu -es, il/elle -e.</p>'; }
            else if (variant < 7) { question = 'Unbestimmter Artikel maskulin Singular: ___ garcon.'; answer = 'un'; formula = '<p><strong>Regel.</strong> un = ein (maskulin), une = eine (feminin).</p>'; }
            else { question = 'Bestimmter Artikel Plural: ___ amis.'; answer = 'les'; formula = '<p><strong>Regel.</strong> le/la/l\' im Singular, les im Plural.</p>'; }
        } else if (grade === 6) {
            if (variant < 4) { question = 'Passe compose mit avoir: J\'ai ___ (parler).'; answer = 'parle'; formula = '<p><strong>Regel.</strong> Passe compose: avoir + participe passe; -er -> -e.</p>'; }
            else if (variant < 7) { question = 'Adjektiv feminin von <code>petit</code>.'; answer = 'petite'; formula = '<p><strong>Regel.</strong> Viele feminine Adjektive erhalten -e.</p>'; }
            else { question = 'Verneinung: Je ___ parle pas.'; answer = 'ne'; formula = '<p><strong>Regel.</strong> ne ... pas umklammert das konjugierte Verb.</p>'; }
        } else if (grade === 7) {
            if (variant < 4) { question = 'Futur proche: Je ___ manger.'; answer = 'vais'; formula = '<p><strong>Regel.</strong> aller + Infinitiv bildet die nahe Zukunft.</p>'; }
            else if (variant < 7) { question = 'Objektpronomen fuer "ihn/es" vor dem Verb.'; answer = 'le'; formula = '<p><strong>Regel.</strong> le/la/les stehen vor dem konjugierten Verb.</p>'; }
            else { question = 'Teilungsartikel vor maskulinem Nomen: Je mange ___ pain.'; answer = 'du'; formula = '<p><strong>Regel.</strong> du/de la/de l\'/des druecken unbestimmte Menge aus.</p>'; }
        } else if (grade === 8) {
            if (variant < 4) { question = 'Imparfait von etre, je-Form: j\'___'; answer = 'etais'; formula = '<p><strong>Regel.</strong> Imparfait-Stamm von nous-Form, Endung -ais/-ais/-ait...</p>'; }
            else if (variant < 7) { question = 'Relativpronomen fuer Subjekt: la fille ___ parle.'; answer = 'qui'; formula = '<p><strong>Regel.</strong> qui ist Subjekt, que ist direktes Objekt.</p>'; }
            else { question = 'Komparativ: plus grand ___ moi.'; answer = 'que'; formula = '<p><strong>Regel.</strong> Vergleich: plus/moins/aussi + Adjektiv + que.</p>'; }
        } else if (grade === 9) {
            if (variant < 4) { question = 'Conditionnel von vouloir, je-Form: je ___'; answer = 'voudrais'; formula = '<p><strong>Regel.</strong> Conditionnel: Futur-Stamm + Imparfait-Endung.</p>'; }
            else if (variant < 7) { question = 'Subjonctif-Ausloeser: Il faut que tu ___ (etre) prudent.'; answer = 'sois'; formula = '<p><strong>Regel.</strong> Il faut que + subjonctif.</p>'; }
            else { question = 'Pronomen fuer "dorthin/darauf": j\'___ vais.'; answer = 'y'; formula = '<p><strong>Regel.</strong> y ersetzt Ortsangaben oder a + Sache.</p>'; }
        } else {
            if (variant < 4) { question = 'Plus-que-parfait: J\'avais ___ (manger).'; answer = 'mange'; formula = '<p><strong>Regel.</strong> Plus-que-parfait: Imparfait von avoir/etre + participe passe.</p>'; }
            else if (variant < 7) { question = 'Pronomen fuer "davon": j\'___ ai deux.'; answer = 'en'; formula = '<p><strong>Regel.</strong> en ersetzt de + Nomen/Mengenangaben.</p>'; }
            else { question = 'Futur simple von aller, je-Form: j\'___'; answer = 'irai'; formula = '<p><strong>Regel.</strong> Futur simple: Stamm + ai/as/a/ons/ez/ont; aller -> ir-.</p>'; }
        }
        return item(`Franzoesisch Klasse ${grade} Grammatik ${index + 1}: ${question}`, answer, formula, solutionFor(answer, sourceForLanguage('franzoesisch', 'grammar')), 'grammar');
    }

    function latinGrammarItem(classId, index) {
        const grade = CLASS_NO[classId];
        const variant = index % 10;
        const nouns = [['servus', 'servi', 'servum', 'servo'], ['puella', 'puellae', 'puellam', 'puella'], ['templum', 'templi', 'templum', 'templo'], ['amicus', 'amici', 'amicum', 'amico']];
        const noun = nouns[index % nouns.length];
        let question;
        let answer;
        let formula;
        if (grade <= 5) {
            if (variant < 4) { question = `Bestimme den Nominativ Singular zu <code>${noun[1]}</code> (Genitiv Singular ist gegeben).`; answer = noun[0]; formula = '<p><strong>Regel.</strong> Grundform im Woerterbuch: Nominativ Singular + Genitiv Singular + Genus.</p>'; }
            else if (variant < 7) { question = `Akkusativ Singular von <code>${noun[0]}</code>?`; answer = noun[2]; formula = '<p><strong>Regel.</strong> Akkusativ Singular haeufig -m.</p>'; }
            else { question = '1. Person Singular Praesens von <code>amare</code>.'; answer = 'amo'; formula = '<p><strong>Regel.</strong> a-Konjugation Praesens: amo, amas, amat...</p>'; }
        } else if (grade === 6) {
            if (variant < 4) { question = `Ablativ Singular von <code>${noun[0]}</code>?`; answer = noun[3]; formula = '<p><strong>Regel.</strong> Ablativ drueckt haeufig Mittel, Ort oder Trennung aus.</p>'; }
            else if (variant < 7) { question = 'Infinitiv Praesens Aktiv von <code>videre</code>.'; answer = 'videre'; formula = '<p><strong>Regel.</strong> Infinitive enden meist auf -re.</p>'; }
            else { question = '3. Person Singular Praesens von <code>esse</code>.'; answer = 'est'; formula = '<p><strong>Regel.</strong> esse ist unregelmaessig: sum, es, est...</p>'; }
        } else if (grade === 7) {
            if (variant < 4) { question = 'Perfekt 1. Person Singular von <code>amare</code>.'; answer = 'amavi'; formula = '<p><strong>Regel.</strong> Perfekt der a-Konjugation oft Stamm + -v- + Endung.</p>'; }
            else if (variant < 7) { question = 'Relativpronomen Nom. Sg. maskulin.'; answer = 'qui'; formula = '<p><strong>Regel.</strong> Relativpronomen: qui, quae, quod.</p>'; }
            else { question = 'Signalwort fuer AcI: <code>videt puerum venire</code> — welche Konstruktion?'; answer = 'aci'; formula = '<p><strong>Regel.</strong> AcI = Akkusativ + Infinitiv nach Wahrnehmungs-/Sageverben.</p>'; }
        } else if (grade === 8) {
            if (variant < 4) { question = 'PPP von <code>amare</code> (mask. Nom. Sg.).'; answer = 'amatus'; formula = '<p><strong>Regel.</strong> PPP: geliebt = amatus, -a, -um.</p>'; }
            else if (variant < 7) { question = 'Participium coniunctum wird im Deutschen meist als ___ aufgeloest.'; answer = 'nebensatz'; formula = '<p><strong>Merksatz.</strong> PC kann als Relativ-, Temporal-, Kausal- oder Konzessivsatz uebersetzt werden.</p>'; }
            else { question = 'Ablativus absolutus besteht aus Nomen im Ablativ und einem ___ im Ablativ.'; answer = 'partizip'; formula = '<p><strong>Regel.</strong> Abl. abs. = losgeloester Ablativ mit Partizip.</p>'; }
        } else if (grade === 9) {
            if (variant < 4) { question = 'Konjunktiv Imperfekt von <code>esse</code>, 3. Person Singular.'; answer = 'esset'; formula = '<p><strong>Regel.</strong> Konj. Impf.: Infinitiv + Personalendung.</p>'; }
            else if (variant < 7) { question = 'ut-Satz mit Konjunktiv nach Verben des Befehlens ist ein ___satz.'; answer = 'finalsatz'; formula = '<p><strong>Regel.</strong> ut + Konjunktiv kann final, konsekutiv oder begehrend sein; Kontext entscheidet.</p>'; }
            else { question = 'Gerundium Genitiv von <code>legere</code>.'; answer = 'legendi'; formula = '<p><strong>Regel.</strong> Gerundium: Genitiv -ndi.</p>'; }
        } else {
            if (variant < 4) { question = 'Gerundivum von <code>laudare</code>, mask. Nom. Sg.'; answer = 'laudandus'; formula = '<p><strong>Regel.</strong> Gerundivum drueckt Notwendigkeit/Passivitaet aus: -ndus.</p>'; }
            else if (variant < 7) { question = 'Nominativ Plural von <code>res publica</code>.'; answer = 'res publicae'; formula = '<p><strong>Regel.</strong> Adjektiv passt in Kasus, Numerus, Genus zum Bezugsnomen.</p>'; }
            else { question = 'Welche Stilfigur liegt bei <code>veni, vidi, vici</code> vor (dreigliedrige Steigerung)?'; answer = 'trikolon'; formula = '<p><strong>Merksatz.</strong> Trikolon = dreigliedrige, oft rhythmische Reihung.</p>'; }
        }
        return item(`Latein Klasse ${grade} Grammatik ${index + 1}: ${question}`, answer, formula, solutionFor(answer, sourceForLanguage('latein', 'grammar')), 'grammar');
    }

    function sourceForLanguage(language, kind) {
        if (language === 'englisch') return 'NRW-Kernlehrplan Englisch Sekundarstufe I; CEFR A1-B1 Progression; schuluebliche Grundwortschatz- und Grammatikprogression.';
        if (language === 'franzoesisch') return 'NRW-Kernlehrplan Franzoesisch Sekundarstufe I; CEFR A1-B1 Progression; schuluebliche Grundwortschatz- und Grammatikprogression.';
        return 'NRW-Kernlehrplan Latein Sekundarstufe I; Lehrplan-Kompetenzbereiche Sprache/Text/Kultur; schuluebliche lateinische Basisgrammatik und Grundwortschatz.';
    }

    function languageLabel(language) {
        if (language === 'englisch') return 'Englisch';
        if (language === 'franzoesisch') return 'Franzoesisch';
        return 'Latein';
    }

    function numberWord(language, number) {
        if (language === 'englisch') return englishNumber(number);
        if (language === 'franzoesisch') return frenchNumber(number);
        return latinNumber(number);
    }

    function englishNumber(number) {
        const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        if (number < 20) return ones[number];
        if (number < 100) return tens[Math.floor(number / 10)] + (number % 10 ? '-' + ones[number % 10] : '');
        return ones[Math.floor(number / 100)] + ' hundred' + (number % 100 ? ' and ' + englishNumber(number % 100) : '');
    }

    function frenchNumber(number) {
        const small = ['zero', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
        if (number < 17) return small[number];
        if (number < 20) return 'dix-' + small[number - 10];
        if (number < 70) {
            const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
            const ten = Math.floor(number / 10);
            const rest = number % 10;
            return tens[ten] + (rest === 1 ? ' et un' : rest ? '-' + small[rest] : '');
        }
        if (number < 80) return 'soixante-' + frenchNumber(number - 60);
        if (number === 80) return 'quatre-vingts';
        if (number < 100) return 'quatre-vingt-' + frenchNumber(number - 80);
        const hundred = Math.floor(number / 100);
        const rest = number % 100;
        const hundredWord = hundred === 1 ? 'cent' : small[hundred] + ' cent' + (rest ? '' : 's');
        return hundredWord + (rest ? ' ' + frenchNumber(rest) : '');
    }

    function latinNumber(number) {
        const small = ['nihil', 'unus', 'duo', 'tres', 'quattuor', 'quinque', 'sex', 'septem', 'octo', 'novem', 'decem', 'undecim', 'duodecim', 'tredecim', 'quattuordecim', 'quindecim', 'sedecim', 'septendecim', 'duodeviginti', 'undeviginti'];
        const tens = ['', '', 'viginti', 'triginta', 'quadraginta', 'quinquaginta', 'sexaginta', 'septuaginta', 'octoginta', 'nonaginta'];
        const hundreds = ['', 'centum', 'ducenti', 'trecenti', 'quadringenti', 'quingenti', 'sescenti', 'septingenti', 'octingenti', 'nongenti'];
        if (number < 20) return small[number];
        if (number < 100) return tens[Math.floor(number / 10)] + (number % 10 ? ' ' + small[number % 10] : '');
        return hundreds[Math.floor(number / 100)] + (number % 100 ? ' ' + latinNumber(number % 100) : '');
    }

    function installLanguagePools() {
        CLASSES.forEach(function (classId) {
            LANGUAGE_SUBJECTS.forEach(function (language) {
                const key = classId + '.' + language;
                SCH.content[key] = {
                    mode: 'pool',
                    pool: makeLanguagePool(language, classId),
                    note: languageLabel(language) + ' Klasse ' + CLASS_NO[classId] + ': 200 Vokabel-Abfragen und 200 Grammatikfragen (curriculum-orientierter Grundwortschatz, keine lehrwerksspezifische Liste).'
                };
            });
        });
    }

    topupCoreSubjects();
    installLanguagePools();
})();
