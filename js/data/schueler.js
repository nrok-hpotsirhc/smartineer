/*
 * Smartineer Schüler-Bereich — Daten & Generatoren.
 *
 * Struktur:
 *   window.SCHUELER = {
 *     classes: [...]   // Klasse 1–10
 *     subjects: {...}  // Pro (klasse, fach) entweder Generator-Funktion ODER Aufgaben-Pool.
 *   };
 *
 * Generierte Aufgaben (Klasse 1–2):
 *   gen() liefert { q: 'Frage als Plain-Text', a: 'erwartete Antwort als String' }.
 *   Die UI erzeugt Sets von 10 Aufgaben über mehrfaches gen().
 *
 * Vordefinierte Aufgaben (Klasse 3–4):
 *   pool ist ein Array { q, a }. Die UI sampelt 10 zufällige Aufgaben pro Set.
 *
 * WICHTIG: Antworten werden nach Trim verglichen; ggf. Komma → Punkt normalisiert.
 *          Frage-Text ist Plain-Text + KaTeX (über $...$), keine HTML-Tags die State leaken.
 *          Zufallszahlen über Math.random — wenn sich der Bereich ändert, alte Pools
 *          dürfen NICHT die idx-Logik anderer Kategorien stören (eigener Storage-Key).
 */
(function () {
    function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    // ---------- Klasse 1: Mathematik ----------
    // Zahlenraum bis 20, Plus/Minus ohne Zehnerübergang (überwiegend),
    // gelegentliche Aufgaben mit Zehnerübergang als sanfte Steigerung.
    function gen_klasse1_mathe() {
        const op = pick(['+', '+', '-']); // mehr Plus als Minus zu Beginn
        if (op === '+') {
            const a = ri(1, 10);
            const b = ri(1, Math.max(1, 20 - a));
            return { q: `${a} + ${b} = ?`, a: String(a + b) };
        } else {
            const a = ri(2, 20);
            const b = ri(1, a);
            return { q: `${a} − ${b} = ?`, a: String(a - b) };
        }
    }

    // ---------- Klasse 2: Mathematik ----------
    // Zahlenraum bis 100, Plus/Minus mit Zehnerübergang, kleine Einmaleins-Vorübung (×2, ×5, ×10).
    function gen_klasse2_mathe() {
        const r = Math.random();
        if (r < 0.45) {
            // Plus bis 100
            const a = ri(10, 80);
            const b = ri(5, 100 - a);
            return { q: `${a} + ${b} = ?`, a: String(a + b) };
        } else if (r < 0.85) {
            // Minus bis 100
            const a = ri(20, 100);
            const b = ri(5, a - 1);
            return { q: `${a} − ${b} = ?`, a: String(a - b) };
        } else {
            // Vorübung Einmaleins (×2 / ×5 / ×10)
            const f = pick([2, 5, 10]);
            const x = ri(1, 10);
            return { q: `${x} · ${f} = ?`, a: String(x * f) };
        }
    }

    // ---------- Klasse 3: Mathematik (Pool) ----------
    // Schwerpunkt: kleines Einmaleins (1–10) und Geteilt-Aufgaben aus dem 1×1.
    // Plus zusätzlich schriftliche Addition/Subtraktion bis 1000.
    // Aufgaben sollen handschriftlich gerechnet werden — Eingabe nur des Endergebnisses.
    function pool_klasse3_mathe() {
        const out = [];
        // Komplettes kleines 1×1 (1..10) × (1..10) = 100 Multiplikationen
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                out.push({ q: `${i} · ${j} = ?`, a: String(i * j) });
            }
        }
        // Geteilt-Aufgaben aus dem 1×1, glatte Teiler
        for (let i = 2; i <= 10; i++) {
            for (let j = 2; j <= 10; j++) {
                out.push({ q: `${i * j} : ${i} = ?`, a: String(j) });
            }
        }
        // Schriftliche Addition bis 1000 (kleine Auswahl, ergibt sich aus Lehrplan Klasse 3)
        const adds = [
            ['234', '512'], ['145', '378'], ['406', '289'], ['523', '347'],
            ['612', '199'], ['305', '498'], ['247', '356'], ['158', '643'],
            ['419', '274'], ['382', '517']
        ];
        adds.forEach(([x, y]) => out.push({ q: `${x} + ${y} = ?`, a: String(parseInt(x, 10) + parseInt(y, 10)) }));
        // Schriftliche Subtraktion bis 1000
        const subs = [
            ['523', '187'], ['604', '256'], ['710', '345'], ['832', '167'],
            ['905', '478'], ['612', '299'], ['504', '236'], ['781', '345'],
            ['650', '283'], ['419', '128']
        ];
        subs.forEach(([x, y]) => out.push({ q: `${x} − ${y} = ?`, a: String(parseInt(x, 10) - parseInt(y, 10)) }));
        return out;
    }

    // ---------- Mittelstufe: Naturwissenschaften (erweiterte Pools, AGENTS §17) ----------
    // Klasse 5–10: Physik, Chemie, Biologie als kuratierte Pools.
    // Inhalte sind handgeprueft (Standardlehrplaene Mittelstufe DE) und enthalten
    // Formeln via KaTeX ($...$). Antworten sind kurze Strings — die Drill-UI vergleicht
    // ueber `normalize()` (trim, whitespace weg, Komma→Punkt, Kleinschreibung).
    // Endergebnisse werden ohne Einheit eingegeben, die Aufgabe sagt das jeweils.

    // Klasse 5 / 6: NRW-Kernlehrplan Naturwissenschaften (integrierter NW-Unterricht
    // an Gesamtschulen/Realschulen, parallele Faecher am Gymnasium). Schwerpunkte
    // gem. KLP NW SI: Magnetismus, Elektrizitaet, Licht/Schatten, Temperatur,
    // Stoffe & Aggregatzustaende, Wasser/Luft, Optik, Schall, Stofftrennung.

    function natwiTopup(topic, rows) {
        return rows.map(function (row) {
            return { q: topic + ': ' + row[1], a: row[0] };
        });
    }

    function escapeHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function schuelerFormulaFor(item, classId, subject) {
        const q = String(item.q || '').toLowerCase();
        if (subject === 'physik') {
            if (q.includes('geschwindigkeit') || q.includes('$v')) return '<p><strong>Formel.</strong> Geschwindigkeit: $v = \\frac{s}{t}$, Weg: $s = v \\cdot t$, Zeit: $t = \\frac{s}{v}$.</p>';
            if (q.includes('kraft') || q.includes('$f')) return '<p><strong>Formel.</strong> Newton: $F = m \\cdot a$; Gewichtskraft nahe der Erde: $F_G = m \\cdot g$ mit $g \\approx 10\\,\\text{N/kg}$.</p>';
            if (q.includes('dichte') || q.includes('rho') || q.includes('\\rho')) return '<p><strong>Formel.</strong> Dichte: $\\rho = \\frac{m}{V}$, also Masse pro Volumen.</p>';
            if (q.includes('widerstand') || q.includes('ohm') || q.includes('$r')) return '<p><strong>Formel.</strong> Ohmsches Gesetz: $U = R \\cdot I$, daraus $R = \\frac{U}{I}$ und $I = \\frac{U}{R}$.</p>';
            if (q.includes('leistung') || q.includes('$p')) return '<p><strong>Formel.</strong> Leistung: $P = \\frac{W}{t}$; elektrische Leistung: $P = U \\cdot I$.</p>';
            if (q.includes('arbeit') || q.includes('$w=')) return '<p><strong>Formel.</strong> Mechanische Arbeit bei konstanter Kraft: $W = F \\cdot s$.</p>';
            if (q.includes('druck')) return '<p><strong>Formel.</strong> Druck: $p = \\frac{F}{A}$, Kraft pro Flaeche.</p>';
            if (q.includes('ladung') || q.includes('$q')) return '<p><strong>Formel.</strong> Elektrische Ladung: $Q = I \\cdot t$; Spannung als Energie pro Ladung: $U = \\frac{W}{Q}$.</p>';
            if (q.includes('wellenlaenge') || q.includes('lambda') || q.includes('\\lambda')) return '<p><strong>Formel.</strong> Wellengleichung: $c = \\lambda \\cdot f$, also $\\lambda = \\frac{c}{f}$.</p>';
            if (q.includes('halbwertszeit') || q.includes('halbwert')) return '<p><strong>Formel.</strong> Nach $n$ Halbwertszeiten bleibt $N = N_0 \\cdot (\\tfrac{1}{2})^n$.</p>';
            return '<p><strong>Merksatz.</strong> Ordne zuerst Groesse, Einheit und Grundgesetz zu; bei Begriffsfragen ist der praezise Fachbegriff die Loesung.</p>';
        }
        if (subject === 'chemie') {
            if (q.includes('ph')) return '<p><strong>Merksatz.</strong> pH &lt; 7 = sauer, pH = 7 = neutral, pH &gt; 7 = basisch.</p>';
            if (q.includes('neutralisation')) return '<p><strong>Reaktionsschema.</strong> Saeure + Base $\\rightarrow$ Salz + Wasser.</p>';
            if (q.includes('summenformel') || q.includes('formel') || q.includes('symbol')) return '<p><strong>Merksatz.</strong> Eine Summenformel nennt Elementsymbole und Anzahl der Atome, z.B. $H_2O$, $CO_2$, $NaCl$.</p>';
            if (q.includes('oxidation') || q.includes('reduktion') || q.includes('redox')) return '<p><strong>Merksatz.</strong> Oxidation = Elektronenabgabe, Reduktion = Elektronenaufnahme; beides zusammen ist eine Redoxreaktion.</p>';
            if (q.includes('alkan') || q.includes('alken') || q.includes('alkohol') || q.includes('carbonsaeure')) return '<p><strong>Merksatz.</strong> Organische Stoffklassen werden ueber Kohlenstoffgeruest und funktionelle Gruppen erkannt, z.B. Alkane (Einfachbindungen), Alkohole (-OH), Carbonsaeuren (-COOH).</p>';
            return '<p><strong>Merksatz.</strong> Nutze Stoffeigenschaft, Teilchenmodell oder Reaktionsschema; die Antwort ist der eindeutige chemische Fachbegriff bzw. die Formel.</p>';
        }
        if (subject === 'biologie') {
            if (q.includes('dna') || q.includes('rna') || q.includes('gen') || q.includes('transkription') || q.includes('translation')) return '<p><strong>Merksatz.</strong> DNA speichert Information; Transkription erzeugt mRNA; Translation setzt die Information am Ribosom in ein Protein um.</p>';
            if (q.includes('fotosynthese')) return '<p><strong>Schema.</strong> Fotosynthese: Kohlenstoffdioxid + Wasser + Licht $\\rightarrow$ Traubenzucker + Sauerstoff.</p>';
            if (q.includes('oekosystem') || q.includes('nahrung') || q.includes('population') || q.includes('biodiversitaet')) return '<p><strong>Merksatz.</strong> Oekosysteme bestehen aus Lebensraum, Lebewesen, Stoffkreislauf und Energiefluss; Produzenten, Konsumenten und Zersetzer sind zentrale Rollen.</p>';
            if (q.includes('atmung') || q.includes('kreislauf') || q.includes('verdauung') || q.includes('blut')) return '<p><strong>Merksatz.</strong> Organe werden ueber ihre Funktion erkannt: Aufnahme, Transport, Umwandlung oder Ausscheidung von Stoffen.</p>';
            return '<p><strong>Merksatz.</strong> In der Biologie fuehrt die Frage meist von Struktur zu Funktion: Welcher Teil uebernimmt welche Aufgabe?</p>';
        }
        if (subject === 'geschichte') {
            return '<p><strong>Merksatz.</strong> Ordne Ereignis, Jahr, Ort und Akteur zu. Pruefe Ursache &rarr; Verlauf &rarr; Folge und nutze Schluesselbegriffe (z.B. Lehnswesen, Aufklaerung, Reformation, Industrialisierung, Kalter Krieg) als Anker.</p>';
        }
        return '<p><strong>Merksatz.</strong> Nutze die im Unterricht eingefuehrte Regel oder Definition und pruefe das Endergebnis.</p>';
    }

    function schuelerSolutionFor(item, classId, subject) {
        const answer = escapeHtml(item.a);
        const numeric = /^-?[0-9]+(?:[.,][0-9]+)?$/.test(String(item.a));
        const boxed = numeric
            ? '<p>Damit lautet das Endergebnis $$\\boxed{' + answer.replace(/,/g, '{,}') + '}$$</p>'
            : '<p><strong>Endergebnis:</strong> <code>' + answer + '</code></p>';
        return '<p><strong>Musterloesung.</strong> Lies die gesuchte Groesse bzw. den gesuchten Fachbegriff aus der Aufgabenstellung ab und vergleiche ihn mit dem Merksatz.</p>'
            + '<p>Die passende Antwort fuer diese Aufgabe ist <strong>' + answer + '</strong>.</p>'
            + boxed
            + '<p class="text-xs text-slate-500"><em>Quelle: NRW-Kernlehrplan Sekundarstufe I, Naturwissenschaften bzw. Physik/Chemie/Biologie/Geschichte; schuluebliche SI-Lehrbuchkonventionen.</em></p>';
    }

    function enrichSchuelerTrainingItems(items, classId, subject) {
        return items.map(function (item) {
            return Object.assign({}, item, {
                f: item.f || schuelerFormulaFor(item, classId, subject),
                s: item.s || schuelerSolutionFor(item, classId, subject)
            });
        });
    }

    // TOPUP v68: je Klasse 5-10 und Fach Physik/Chemie/Biologie +40 Items.
    // Quellenbasis: NRW-Kernlehrplan Sekundarstufe I Naturwissenschaften 2019,
    // KLP Physik/Chemie/Biologie SI 2019/2022, uebliche SI-Lehrbuchkonventionen.
    const NATWI_TOPUPS = {
        k5: {
            physik: natwiTopup('Klasse 5 Physik', [
                ['magnetfeld', 'Wie heisst der Wirkungsbereich um einen Magneten?'],
                ['feldlinien', 'Wie nennt man die Linien, mit denen man ein Magnetfeld zeichnet?'],
                ['kompass', 'Welches Geraet richtet eine Magnetnadel nach Norden und Sueden aus?'],
                ['nordpol', 'Welcher Magnetpol zeigt bei einer frei drehbaren Magnetnadel ungefaehr nach Norden?'],
                ['suedpol', 'Welcher Magnetpol zieht den Nordpol eines anderen Magneten an?'],
                ['abstossung', 'Was passiert zwischen zwei gleichen Magnetpolen?'],
                ['anziehung', 'Was passiert zwischen Nordpol und Suedpol zweier Magnete?'],
                ['eisen', 'Welches haeufige Metall wird stark von Magneten angezogen?'],
                ['kobalt', 'Welches Metall ist neben Eisen und Nickel ferromagnetisch?'],
                ['ferromagnetisch', 'Wie nennt man Stoffe wie Eisen, Nickel und Kobalt?'],
                ['spannungsquelle', 'Wie nennt man Batterie oder Netzgeraet im Stromkreis?'],
                ['verbraucher', 'Wie nennt man Lampe oder Motor im Stromkreis allgemein?'],
                ['schalter', 'Welches Bauteil oeffnet oder schliesst einen Stromkreis?'],
                ['geschlossen', 'Wie muss ein Stromkreis sein, damit Strom fliesst?'],
                ['offen', 'Wie heisst ein Stromkreis mit Unterbrechung?'],
                ['leiter', 'Wie nennt man einen Stoff, durch den Strom gut fliesst?'],
                ['isolator', 'Wie nennt man einen Stoff, durch den Strom kaum fliesst?'],
                ['kupfer', 'Welches Metall wird oft fuer elektrische Leitungen genutzt?'],
                ['kunststoff', 'Welches Material isoliert haeufig Kabel?'],
                ['stromrichtung', 'Welche Richtung wird technisch von Plus nach Minus angegeben?'],
                ['reihenschaltung', 'Wie heisst eine Schaltung, bei der alle Bauteile hintereinander liegen?'],
                ['parallelschaltung', 'Wie heisst eine Schaltung mit mehreren Stromwegen nebeneinander?'],
                ['kurzschluss', 'Wie heisst eine fast widerstandslose Verbindung zwischen Plus und Minus?'],
                ['sicherung', 'Welches Bauteil unterbricht bei zu grossem Strom den Kreis?'],
                ['selbstleuchter', 'Wie nennt man einen Koerper, der selbst Licht aussendet?'],
                ['lichtquelle', 'Wie nennt man Lampe, Kerze oder Sonne allgemein?'],
                ['transparent', 'Wie nennt man einen Stoff, durch den Licht gut hindurchgeht?'],
                ['opak', 'Wie nennt man einen Stoff, der Licht nicht hindurchlaesst?'],
                ['schatten', 'Was entsteht hinter einem lichtundurchlaessigen Koerper?'],
                ['kernschatten', 'Wie heisst der ganz dunkle Bereich eines Schattens?'],
                ['halbschatten', 'Wie heisst der teilweise beleuchtete Bereich eines Schattens?'],
                ['reflexion', 'Wie nennt man das Zurueckwerfen von Licht an einer Oberflaeche?'],
                ['thermometer', 'Welches Messgeraet misst die Temperatur?'],
                ['celsius', 'Welche Temperaturskala nutzt im Alltag das Symbol $^\\circ$C?'],
                ['0', 'Bei welcher Temperatur in $^\\circ$C gefriert Wasser bei Normaldruck?'],
                ['100', 'Bei welcher Temperatur in $^\\circ$C siedet Wasser bei Normaldruck?'],
                ['temperatur', 'Welche Groesse beschreibt, wie warm oder kalt ein Koerper ist?'],
                ['waerme', 'Wie nennt man Energie, die wegen Temperaturunterschied uebertragen wird?'],
                ['ausdehnung', 'Wie nennt man es, wenn sich Stoffe beim Erwaermen vergroessern?'],
                ['waermeleitung', 'Wie nennt man Waermeuebertragung durch direkten Kontakt in festen Stoffen?']
            ]),
            chemie: natwiTopup('Klasse 5 Chemie', [
                ['fest', 'Welcher Aggregatzustand hat eine feste Form?'],
                ['fluessig', 'Welcher Aggregatzustand passt sich der Gefaessform an?'],
                ['gasfoermig', 'Welcher Aggregatzustand fuellt den ganzen Raum aus?'],
                ['schmelzen', 'Wie heisst der Uebergang von fest zu fluessig?'],
                ['erstarren', 'Wie heisst der Uebergang von fluessig zu fest?'],
                ['verdampfen', 'Wie heisst der Uebergang von fluessig zu gasfoermig?'],
                ['kondensieren', 'Wie heisst der Uebergang von gasfoermig zu fluessig?'],
                ['sublimieren', 'Wie heisst der direkte Uebergang von fest zu gasfoermig?'],
                ['resublimieren', 'Wie heisst der direkte Uebergang von gasfoermig zu fest?'],
                ['schmelzpunkt', 'Wie heisst die Temperatur, bei der ein Stoff schmilzt?'],
                ['siedepunkt', 'Wie heisst die Temperatur, bei der ein Stoff siedet?'],
                ['dichte', 'Welche Stoffeigenschaft vergleicht Masse und Volumen?'],
                ['loeslichkeit', 'Welche Eigenschaft beschreibt, wie gut sich ein Stoff in Wasser loest?'],
                ['brennbarkeit', 'Welche Stoffeigenschaft prueft, ob ein Stoff Feuer faengt?'],
                ['farbe', 'Welche sichtbare Stoffeigenschaft erkennt man mit den Augen?'],
                ['geruch', 'Welche Stoffeigenschaft erkennt man mit der Nase?'],
                ['wasser', 'Welcher Alltagsstoff kommt als Eis, Fluessigkeit und Dampf vor?'],
                ['h2o', 'Welche Summenformel hat Wasser?'],
                ['sauerstoff', 'Welches Gas der Luft brauchen Menschen zum Atmen?'],
                ['stickstoff', 'Welches Gas ist der groesste Anteil der Luft?'],
                ['kohlendioxid', 'Welches Gas entsteht unter anderem beim Ausatmen?'],
                ['wasserdampf', 'Wie nennt man Wasser im gasfoermigen Zustand?'],
                ['luft', 'Wie nennt man das Gasgemisch um die Erde?'],
                ['gemisch', 'Wie nennt man Stoffe, die aus mehreren Reinstoffen zusammengesetzt sind?'],
                ['reinstoff', 'Wie nennt man einen Stoff mit einheitlichen Eigenschaften?'],
                ['homogen', 'Wie nennt man ein Gemisch, dessen Bestandteile man nicht erkennt?'],
                ['heterogen', 'Wie nennt man ein Gemisch, dessen Bestandteile man erkennt?'],
                ['loesung', 'Wie nennt man ein homogenes Gemisch aus geloestem Stoff und Loesungsmittel?'],
                ['suspension', 'Wie nennt man ein heterogenes Gemisch aus Feststoff und Fluessigkeit?'],
                ['filtrieren', 'Mit welchem Verfahren trennt man Sand von Wasser?'],
                ['magnettrennung', 'Mit welchem Verfahren trennt man Eisenspaene aus Sand?'],
                ['sedimentation', 'Wie heisst das Absinken schwerer Teilchen in einer Fluessigkeit?'],
                ['dekantieren', 'Wie nennt man das vorsichtige Abgiessen einer Fluessigkeit vom Bodensatz?'],
                ['salz', 'Welcher Stoff bleibt beim Eindampfen von Salzwasser zurueck?'],
                ['sand', 'Welcher Feststoff bleibt beim Filtrieren von Sandwasser im Filter?'],
                ['zucker', 'Welcher Haushaltsstoff loest sich gut in Wasser und schmeckt suess?'],
                ['mineralwasser', 'Welches Getraenk ist Wasser mit geloesten Mineralstoffen?'],
                ['sauer', 'Wie nennt man den Charakter von Zitronensaft?'],
                ['basisch', 'Wie nennt man den Charakter von Seifenlauge?'],
                ['neutral', 'Wie nennt man reines Wasser im Saeure-Base-Sinn ungefaehr?']
            ]),
            biologie: natwiTopup('Klasse 5 Biologie', [
                ['chlorophyll', 'Wie heisst der gruene Farbstoff in Blaettern?'],
                ['fotosynthese', 'Wie heisst der Vorgang, bei dem Pflanzen Lichtenergie nutzen?'],
                ['licht', 'Welche Energiequelle brauchen Pflanzen fuer die Fotosynthese?'],
                ['wasser', 'Welchen Stoff nehmen Pflanzen mit den Wurzeln auf?'],
                ['kohlendioxid', 'Welches Gas nimmt die Pflanze fuer die Fotosynthese aus der Luft auf?'],
                ['sauerstoff', 'Welches Gas gibt die Pflanze bei der Fotosynthese ab?'],
                ['traubenzucker', 'Welcher Zucker entsteht bei der Fotosynthese als Speicherstoff?'],
                ['wurzel', 'Welcher Pflanzenteil nimmt Wasser und Mineralstoffe auf?'],
                ['stengel', 'Welcher Pflanzenteil traegt Blaetter und Blueten?'],
                ['blatt', 'In welchem Pflanzenteil findet besonders viel Fotosynthese statt?'],
                ['bluete', 'Welcher Pflanzenteil dient der Fortpflanzung?'],
                ['samen', 'Woraus kann eine neue Pflanze keimen?'],
                ['frucht', 'Welcher Pflanzenteil schuetzt oft die Samen?'],
                ['keimung', 'Wie heisst der Beginn des Wachstums aus einem Samen?'],
                ['bestaeubung', 'Wie heisst die Uebertragung von Pollen auf die Narbe?'],
                ['pollen', 'Wie nennt man den Bluetenstaub?'],
                ['bienen', 'Welche Insekten bestaeuben viele Blueten?'],
                ['herz', 'Welches Organ pumpt Blut durch den Koerper?'],
                ['lunge', 'Welches Organ dient dem Atmen?'],
                ['magen', 'In welchem Organ wird Nahrung gesammelt und mit Magensaft vermischt?'],
                ['duenndarm', 'Wo werden viele Naehrstoffe in den Koerper aufgenommen?'],
                ['skelett', 'Wie nennt man alle Knochen zusammen?'],
                ['knochen', 'Aus welchen festen Teilen besteht das Skelett?'],
                ['muskel', 'Welches Gewebe bewegt Knochen durch Zusammenziehen?'],
                ['haut', 'Welches Organ bedeckt den Koerper aussen?'],
                ['insekten', 'Welche Tiergruppe hat sechs Beine?'],
                ['spinnen', 'Welche Tiergruppe hat acht Beine?'],
                ['wirbeltiere', 'Wie nennt man Tiere mit Wirbelsaeule?'],
                ['saeuger', 'Welche Wirbeltiergruppe saeugt ihre Jungen mit Milch?'],
                ['voegel', 'Welche Wirbeltiergruppe hat Federn?'],
                ['fische', 'Welche Wirbeltiergruppe atmet meist mit Kiemen im Wasser?'],
                ['amphibien', 'Welche Wirbeltiergruppe lebt oft erst im Wasser und spaeter an Land?'],
                ['reptilien', 'Welche Wirbeltiergruppe hat trockene Schuppenhaut?'],
                ['pflanzenfresser', 'Wie nennt man Tiere, die hauptsaechlich Pflanzen fressen?'],
                ['fleischfresser', 'Wie nennt man Tiere, die hauptsaechlich andere Tiere fressen?'],
                ['allesfresser', 'Wie nennt man Tiere, die Pflanzen und Tiere fressen?'],
                ['nahrungskette', 'Wie nennt man die Reihenfolge, wer wen frisst?'],
                ['lebensraum', 'Wie nennt man den Ort, an dem eine Art lebt?'],
                ['tarnung', 'Wie nennt man Anpassung durch unauffaellige Farbe oder Form?'],
                ['winterschlaf', 'Wie nennt man den langen Schlaf mancher Tiere im Winter?']
            ])
        },
        k6: {
            physik: natwiTopup('Klasse 6 Physik', [
                ['reflexion', 'Wie nennt man das Zurueckwerfen von Licht?'],
                ['einfallswinkel', 'Wie heisst der Winkel zwischen einfallendem Strahl und Lot?'],
                ['ausfallswinkel', 'Wie heisst der Winkel zwischen reflektiertem Strahl und Lot?'],
                ['spiegel', 'Welche glatte Flaeche reflektiert Licht besonders gut?'],
                ['sammellinse', 'Welche Linse buendelt parallele Lichtstrahlen?'],
                ['zerstreuungslinse', 'Welche Linse zerstreut parallele Lichtstrahlen?'],
                ['brennpunkt', 'Wie heisst der Punkt, in dem Sammellinsen Licht buendeln?'],
                ['brennweite', 'Wie heisst der Abstand zwischen Linse und Brennpunkt?'],
                ['prisma', 'Welcher Glas- oder Kunststoffkoerper zerlegt weisses Licht?'],
                ['dispersion', 'Wie nennt man die Zerlegung von Licht in Farben?'],
                ['spektrum', 'Wie nennt man die Farbfolge des zerlegten Lichts?'],
                ['brechung', 'Wie nennt man die Richtungsaenderung von Licht beim Uebergang in ein anderes Medium?'],
                ['lot', 'Wie nennt man die Hilfslinie senkrecht zur Grenzflaeche?'],
                ['schall', 'Wie nennt man hoerbare mechanische Schwingungen?'],
                ['schwingung', 'Welche Bewegung wiederholt sich regelmaessig um eine Ruhelage?'],
                ['frequenz', 'Welche Groesse gibt Schwingungen pro Sekunde an?'],
                ['hertz', 'Welche Einheit hat die Frequenz?'],
                ['amplitude', 'Welche Groesse beschreibt die maximale Auslenkung einer Schwingung?'],
                ['lautstaerke', 'Welche Wahrnehmung steigt bei groesserer Schallamplitude?'],
                ['tonhoehe', 'Welche Wahrnehmung steigt bei groesserer Frequenz?'],
                ['ultraschall', 'Wie nennt man Schall oberhalb von etwa 20 kHz?'],
                ['infraschall', 'Wie nennt man Schall unterhalb von etwa 16 Hz?'],
                ['echo', 'Wie nennt man reflektierten Schall, den man getrennt hoert?'],
                ['medium', 'Was braucht Schall zur Ausbreitung?'],
                ['vakuum', 'In welchem Raum ohne Teilchen breitet sich Schall nicht aus?'],
                ['waermeleitung', 'Wie nennt man Waermeuebertragung durch direkten Kontakt?'],
                ['konvektion', 'Wie nennt man Waermetransport durch stroemende Fluessigkeiten oder Gase?'],
                ['waermestrahlung', 'Wie nennt man Waermeuebertragung ohne Stofftransport, z.B. von der Sonne?'],
                ['isolator', 'Wie nennt man einen Stoff, der Waerme schlecht leitet?'],
                ['metall', 'Welche Stoffgruppe leitet Waerme meist gut?'],
                ['temperatur', 'Welche Groesse misst ein Thermometer?'],
                ['waermeenergie', 'Welche Energieform wird bei Temperaturunterschieden uebertragen?'],
                ['verdunstung', 'Wie heisst langsames Verdampfen unterhalb des Siedepunkts?'],
                ['kondensation', 'Wie heisst der Uebergang von Dampf zu Fluessigkeit?'],
                ['ausdehnung', 'Wie nennt man die Volumenzunahme beim Erwaermen?'],
                ['waermedaemmung', 'Wie nennt man Massnahmen gegen Waermeverlust?'],
                ['schwarz', 'Welche Farbe nimmt Waermestrahlung besonders stark auf?'],
                ['weiss', 'Welche Farbe reflektiert sichtbares Licht besonders stark?'],
                ['340', 'Wie schnell ist Schall in Luft ungefaehr in m/s?'],
                ['300000000', 'Wie schnell ist Licht im Vakuum ungefaehr in m/s?']
            ]),
            chemie: natwiTopup('Klasse 6 Chemie', [
                ['filtrieren', 'Welches Trennverfahren nutzt Filterpapier?'],
                ['sedimentieren', 'Wie heisst das Absetzen schwerer Teilchen am Boden?'],
                ['dekantieren', 'Wie heisst das Abgiessen einer Fluessigkeit vom Bodensatz?'],
                ['eindampfen', 'Wie gewinnt man Salz aus Salzwasser zurueck?'],
                ['destillation', 'Wie trennt man Fluessigkeiten mit unterschiedlichen Siedepunkten?'],
                ['chromatographie', 'Wie trennt man Farbstoffe auf Papier?'],
                ['magnettrennung', 'Wie trennt man Eisenspaene aus einem Sandgemisch?'],
                ['sieben', 'Wie trennt man Koerner unterschiedlicher Groesse?'],
                ['extraktion', 'Wie nennt man Herausloesen eines Stoffes mit einem Loesungsmittel?'],
                ['loeslichkeit', 'Welche Stoffeigenschaft nutzt man bei Extraktion und Kristallisation?'],
                ['dichte', 'Welche Eigenschaft kann man zur Trennung von Oel und Wasser nutzen?'],
                ['siedepunkt', 'Welche Stoffeigenschaft nutzt die Destillation?'],
                ['schmelzpunkt', 'Welche Stoffeigenschaft gibt an, wann ein Feststoff fluessig wird?'],
                ['reinstoff', 'Wie nennt man einen Stoff mit einheitlicher Zusammensetzung?'],
                ['gemisch', 'Wie nennt man eine Kombination mehrerer Reinstoffe?'],
                ['homogen', 'Wie nennt man ein einheitlich aussehendes Gemisch?'],
                ['heterogen', 'Wie nennt man ein uneinheitlich aussehendes Gemisch?'],
                ['loesung', 'Wie nennt man ein homogenes Gemisch aus Salz und Wasser?'],
                ['suspension', 'Wie nennt man ein Gemisch aus Feststoffteilchen in Fluessigkeit?'],
                ['emulsion', 'Wie nennt man ein Gemisch aus zwei nicht mischbaren Fluessigkeiten?'],
                ['aerosol', 'Wie nennt man fein verteilte Fluessigkeits- oder Feststoffteilchen in Gas?'],
                ['lackmus', 'Welcher Indikator zeigt sauer oder basisch an?'],
                ['indikator', 'Wie nennt man einen Stoff, der durch Farbe den pH-Bereich anzeigt?'],
                ['sauer', 'Wie nennt man eine Loesung mit pH kleiner als 7?'],
                ['basisch', 'Wie nennt man eine Loesung mit pH groesser als 7?'],
                ['neutral', 'Wie nennt man eine Loesung mit pH etwa 7?'],
                ['ph', 'Welche Skala beschreibt sauer, neutral und basisch?'],
                ['element', 'Wie nennt man einen Reinstoff aus nur einer Atomsorte?'],
                ['verbindung', 'Wie nennt man einen Reinstoff aus mehreren Atomsorten in festem Verhaeltnis?'],
                ['atom', 'Wie nennt man ein einzelnes Teilchen eines Elements?'],
                ['molekuel', 'Wie nennt man mehrere fest verbundene Atome?'],
                ['sauerstoff', 'Welches Element hat das Symbol O?'],
                ['wasserstoff', 'Welches Element hat das Symbol H?'],
                ['kohlendioxid', 'Welches Gas hat die Formel CO$_2$?'],
                ['wasser', 'Welcher Stoff hat die Formel H$_2$O?'],
                ['salz', 'Welcher Stoff kristallisiert beim Eindampfen von Salzwasser?'],
                ['kristallisation', 'Wie nennt man die Bildung fester Kristalle aus einer Loesung?'],
                ['filtrat', 'Wie nennt man die Fluessigkeit, die durch den Filter laeuft?'],
                ['rueckstand', 'Wie nennt man den Stoff, der im Filter bleibt?'],
                ['adsorption', 'Wie nennt man Anlagern von Teilchen an einer Oberflaeche?']
            ]),
            biologie: natwiTopup('Klasse 6 Biologie', [
                ['haut', 'Welches Organ schuetzt den Koerper nach aussen?'],
                ['herz', 'Welches Organ pumpt Blut?'],
                ['lunge', 'Welches Organ nimmt Sauerstoff aus der Luft auf?'],
                ['leber', 'Welches Organ produziert Galle?'],
                ['niere', 'Welches Organ filtert Harnstoffe aus dem Blut?'],
                ['magen', 'Welches Organ sammelt Nahrung und mischt sie mit Saeure?'],
                ['duenndarm', 'Wo werden die meisten Naehrstoffe aufgenommen?'],
                ['dickdarm', 'Welcher Darmabschnitt entzieht dem Nahrungsbrei viel Wasser?'],
                ['zwerchfell', 'Welcher Muskel trennt Brust- und Bauchraum und hilft beim Atmen?'],
                ['gelenk', 'Wie nennt man die bewegliche Verbindung zwischen Knochen?'],
                ['wirbelsaeule', 'Welcher Knochenstab schuetzt das Rueckenmark?'],
                ['schaedel', 'Welche Knochen schuetzen das Gehirn?'],
                ['muskeln', 'Welche Organe ziehen sich zusammen und ermoeglichen Bewegung?'],
                ['sehne', 'Was verbindet Muskel und Knochen?'],
                ['baender', 'Was stabilisiert viele Gelenke zwischen Knochen?'],
                ['saeuger', 'Welche Wirbeltiergruppe hat Haare und saeugt Junge?'],
                ['voegel', 'Welche Wirbeltiergruppe hat Federn und legt Eier?'],
                ['fische', 'Welche Wirbeltiergruppe lebt im Wasser und atmet mit Kiemen?'],
                ['amphibien', 'Welche Wirbeltiergruppe macht oft eine Metamorphose vom Wasser- zum Landleben?'],
                ['reptilien', 'Welche Wirbeltiergruppe besitzt trockene Hornschuppen?'],
                ['kiemen', 'Welche Atmungsorgane nutzen Fische?'],
                ['lungenatmung', 'Welche Atmungsform nutzen erwachsene Froesche zusaetzlich zur Hautatmung?'],
                ['wechselwarm', 'Wie nennt man Tiere, deren Koerpertemperatur stark von der Umgebung abhaengt?'],
                ['gleichwarm', 'Wie nennt man Tiere mit fast konstanter Koerpertemperatur?'],
                ['metamorphose', 'Wie heisst die Umwandlung von Kaulquappe zu Frosch?'],
                ['kaulquappe', 'Wie nennt man die Larve des Frosches?'],
                ['laich', 'Wie nennt man Eier von Amphibien im Wasser?'],
                ['oekosystem', 'Wie nennt man Lebensraum plus Lebewesen und ihre Beziehungen?'],
                ['population', 'Wie nennt man alle Individuen einer Art in einem Gebiet?'],
                ['lebensraum', 'Wie nennt man den Ort, an dem eine Art lebt?'],
                ['produzenten', 'Welche Organismen stellen in Oekosystemen Biomasse aus Licht her?'],
                ['konsumenten', 'Welche Organismen fressen andere Lebewesen?'],
                ['zersetzer', 'Welche Organismen bauen tote Biomasse ab?'],
                ['nahrungskette', 'Wie nennt man eine einfache Fraßfolge?'],
                ['nahrungsnetz', 'Wie nennt man viele verknuepfte Nahrungsketten?'],
                ['konkurrenz', 'Wie nennt man Wettbewerb um Nahrung, Raum oder Partner?'],
                ['symbiose', 'Wie nennt man Zusammenleben mit Nutzen fuer beide Arten?'],
                ['parasitismus', 'Wie nennt man Zusammenleben, bei dem eine Art auf Kosten der anderen lebt?'],
                ['praedator', 'Wie nennt man einen Raeuber in einer Raeuber-Beute-Beziehung?'],
                ['beute', 'Wie nennt man das Tier, das vom Raeuber gefressen wird?']
            ])
        },
        k7: {
            physik: natwiTopup('Klasse 7 Physik', [
                ['20', 'Berechne $v$ in m/s: $s=100\\,\\text{m}$, $t=5\\,\\text{s}$.'],
                ['15', 'Berechne $v$ in m/s: $s=150\\,\\text{m}$, $t=10\\,\\text{s}$.'],
                ['72', 'Berechne $s$ in m: $v=8\\,\\text{m/s}$, $t=9\\,\\text{s}$.'],
                ['20', 'Berechne $t$ in s: $s=120\\,\\text{m}$, $v=6\\,\\text{m/s}$.'],
                ['10', 'Wandle $36\\,\\text{km/h}$ in m/s um.'],
                ['54', 'Wandle $15\\,\\text{m/s}$ in km/h um.'],
                ['12', 'Berechne die Kraft in N: $m=4\\,\\text{kg}$, $a=3\\,\\text{m/s}^2$.'],
                ['30', 'Berechne die Gewichtskraft in N: $m=3\\,\\text{kg}$, $g\\approx10\\,\\text{N/kg}$.'],
                ['80', 'Berechne die Gewichtskraft in N: $m=8\\,\\text{kg}$, $g\\approx10\\,\\text{N/kg}$.'],
                ['3', 'Berechne die Dichte in g/cm$^3$: $m=300\\,\\text{g}$, $V=100\\,\\text{cm}^3$.'],
                ['100', 'Berechne die Masse in g: $\\rho=2\\,\\text{g/cm}^3$, $V=50\\,\\text{cm}^3$.'],
                ['30', 'Berechne das Volumen in cm$^3$: $m=90\\,\\text{g}$, $\\rho=3\\,\\text{g/cm}^3$.'],
                ['newton', 'Welche Einheit hat die Kraft?'],
                ['joule', 'Welche Einheit hat Energie?'],
                ['kilogramm', 'Welche SI-Einheit hat die Masse?'],
                ['meter', 'Welche SI-Einheit hat die Strecke?'],
                ['sekunde', 'Welche SI-Einheit hat die Zeit?'],
                ['beschleunigung', 'Welche Groesse beschreibt die Aenderung der Geschwindigkeit pro Zeit?'],
                ['masse', 'Welche Groesse gibt an, wie viel Stoff ein Koerper enthaelt?'],
                ['kraft', 'Welche Groesse kann einen Koerper beschleunigen oder verformen?'],
                ['dichte', 'Welche Groesse ist Masse pro Volumen?'],
                ['reibung', 'Welche Kraft wirkt einer Bewegung zwischen Oberflaechen entgegen?'],
                ['traegheit', 'Welches Prinzip beschreibt, dass Koerper ihren Bewegungszustand beibehalten?'],
                ['hebel', 'Welches einfache Werkzeug nutzt Kraftarm und Lastarm?'],
                ['drehpunkt', 'Wie nennt man den Punkt, um den ein Hebel rotiert?'],
                ['schwerpunkt', 'Wie nennt man den Punkt, an dem man die Gewichtskraft gesammelt denken kann?'],
                ['gleichfoermig', 'Wie nennt man Bewegung mit konstanter Geschwindigkeit?'],
                ['beschleunigt', 'Wie nennt man Bewegung mit veraenderlicher Geschwindigkeit?'],
                ['weg', 'Welche Groesse steht in der Formel $v=s/t$ im Zaehler?'],
                ['zeit', 'Welche Groesse steht in der Formel $v=s/t$ im Nenner?'],
                ['geschwindigkeit', 'Welche Groesse berechnet man mit $s/t$?'],
                ['m/s', 'Welche Einheit passt zu Geschwindigkeit im SI-System?'],
                ['km/h', 'Welche Alltagseinheit nutzt man bei Autogeschwindigkeit?'],
                ['waage', 'Welches Geraet misst im Alltag die Masse?'],
                ['kraftmesser', 'Welches Messgeraet misst eine Kraft?'],
                ['volumen', 'Welche Groesse beschreibt den Rauminhalt eines Koerpers?'],
                ['temperatur', 'Welche Groesse wird mit einem Thermometer gemessen?'],
                ['energie', 'Welche Groesse beschreibt die Faehigkeit, Arbeit zu verrichten?'],
                ['gasfoermig', 'Welcher Aggregatzustand hat keine feste Form und kein festes Volumen?'],
                ['verdampfen', 'Wie heisst der Uebergang von fluessig zu gasfoermig?']
            ]),
            chemie: natwiTopup('Klasse 7 Chemie', [
                ['o2', 'Welche Summenformel hat Sauerstoffgas?'],
                ['h2', 'Welche Summenformel hat Wasserstoffgas?'],
                ['n2', 'Welche Summenformel hat Stickstoffgas?'],
                ['co2', 'Welche Summenformel hat Kohlenstoffdioxid?'],
                ['h2o', 'Welche Summenformel hat Wasser?'],
                ['nacl', 'Welche Summenformel hat Kochsalz?'],
                ['fe', 'Welches Elementsymbol hat Eisen?'],
                ['cu', 'Welches Elementsymbol hat Kupfer?'],
                ['al', 'Welches Elementsymbol hat Aluminium?'],
                ['c', 'Welches Elementsymbol hat Kohlenstoff?'],
                ['s', 'Welches Elementsymbol hat Schwefel?'],
                ['o', 'Welches Elementsymbol hat Sauerstoff?'],
                ['h', 'Welches Elementsymbol hat Wasserstoff?'],
                ['cl', 'Welches Elementsymbol hat Chlor?'],
                ['n', 'Welches Elementsymbol hat Stickstoff?'],
                ['atom', 'Wie nennt man ein einzelnes Teilchen eines Elements?'],
                ['molekuel', 'Wie nennt man einen Verbund mehrerer Atome?'],
                ['element', 'Wie nennt man einen Stoff aus nur einer Atomsorte?'],
                ['verbindung', 'Wie nennt man einen Reinstoff aus mehreren Atomsorten?'],
                ['gemisch', 'Wie nennt man eine Zusammensetzung mehrerer Reinstoffe?'],
                ['loesung', 'Wie nennt man ein homogenes Gemisch aus Salz und Wasser?'],
                ['destillation', 'Welches Verfahren trennt nach unterschiedlichen Siedepunkten?'],
                ['filtration', 'Welches Verfahren trennt Feststoff und Fluessigkeit mit Filter?'],
                ['chromatographie', 'Welches Verfahren trennt Farbstoffe nach Wanderungsgeschwindigkeit?'],
                ['verdampfen', 'Wie heisst der Uebergang fluessig zu gasfoermig?'],
                ['kondensieren', 'Wie heisst der Uebergang gasfoermig zu fluessig?'],
                ['sublimieren', 'Wie heisst der direkte Uebergang fest zu gasfoermig?'],
                ['fest', 'Welcher Aggregatzustand besitzt feste Form und festes Volumen?'],
                ['fluessig', 'Welcher Aggregatzustand besitzt festes Volumen, aber keine feste Form?'],
                ['gasfoermig', 'Welcher Aggregatzustand besitzt weder feste Form noch festes Volumen?'],
                ['dichte', 'Welche Eigenschaft ist Masse pro Volumen?'],
                ['loeslichkeit', 'Welche Eigenschaft gibt an, wie viel Stoff sich loesen kann?'],
                ['siedepunkt', 'Welche Temperatur kennzeichnet das Sieden?'],
                ['schmelzpunkt', 'Welche Temperatur kennzeichnet das Schmelzen?'],
                ['indikator', 'Welcher Stoff zeigt den pH-Bereich durch Farbwechsel?'],
                ['massenerhaltung', 'Welches Gesetz sagt: Gesamtmasse bleibt bei chemischer Reaktion erhalten?'],
                ['teilchenmodell', 'Welches Modell erklaert Aggregatzustaende mit Bewegung kleiner Teilchen?'],
                ['diffusion', 'Wie nennt man selbststaendiges Durchmischen durch Teilchenbewegung?'],
                ['kristall', 'Wie nennt man einen Feststoff mit regelmaessiger Teilchenanordnung?'],
                ['homogen', 'Wie nennt man ein Gemisch, das ueberall gleich aussieht?']
            ]),
            biologie: natwiTopup('Klasse 7 Biologie', [
                ['zelle', 'Wie nennt man die kleinste lebende Einheit?'],
                ['zellkern', 'Welches Zellorganell enthaelt die Erbinformation?'],
                ['zellmembran', 'Welche duenne Huelle begrenzt jede Zelle?'],
                ['zellwand', 'Welche feste Huelle besitzen Pflanzenzellen zusaetzlich?'],
                ['chloroplasten', 'In welchen Zellorganellen findet Fotosynthese statt?'],
                ['vakuole', 'Welcher grosse Speicherraum ist typisch fuer Pflanzenzellen?'],
                ['mitochondrien', 'Welche Zellorganellen liefern Energie durch Zellatmung?'],
                ['cytoplasma', 'Wie nennt man die zaehfluessige Grundsubstanz der Zelle?'],
                ['dna', 'Welches Molekuel speichert Erbinformation?'],
                ['mikroskop', 'Welches Geraet vergroessert kleine Zellen?'],
                ['fotosynthese', 'Welcher Vorgang baut aus CO$_2$ und Wasser Zucker auf?'],
                ['zellatmung', 'Welcher Vorgang setzt aus Zucker Energie frei?'],
                ['glucose', 'Welcher Zucker entsteht bei der Fotosynthese?'],
                ['sauerstoff', 'Welches Gas entsteht bei der Fotosynthese?'],
                ['kohlendioxid', 'Welches Gas wird bei der Fotosynthese aufgenommen?'],
                ['produzent', 'Welche Rolle haben gruene Pflanzen im Oekosystem?'],
                ['konsument', 'Welche Rolle haben Tiere, die andere Lebewesen fressen?'],
                ['zersetzer', 'Welche Rolle haben Pilze und Bakterien beim Abbau toter Stoffe?'],
                ['biotop', 'Wie nennt man den unbelebten Lebensraum eines Oekosystems?'],
                ['biozoenose', 'Wie nennt man die Lebensgemeinschaft aller Arten in einem Biotop?'],
                ['oekosystem', 'Wie nennt man Biotop und Biozoenose zusammen?'],
                ['population', 'Wie nennt man alle Individuen einer Art in einem Gebiet?'],
                ['art', 'Wie nennt man Lebewesen, die fruchtbare Nachkommen miteinander haben koennen?'],
                ['nische', 'Wie nennt man die Rolle und Lebensweise einer Art im Oekosystem?'],
                ['nahrungskette', 'Wie nennt man eine lineare Fraßbeziehung?'],
                ['nahrungsnetz', 'Wie nennt man verknuepfte Nahrungsketten?'],
                ['konkurrenz', 'Wie nennt man Wettbewerb um begrenzte Ressourcen?'],
                ['symbiose', 'Wie nennt man Zusammenleben mit Nutzen fuer beide Partner?'],
                ['parasitismus', 'Wie nennt man Zusammenleben mit Nutzen fuer einen und Schaden fuer den anderen?'],
                ['praedator', 'Wie nennt man den Raeuber?'],
                ['beute', 'Wie nennt man das gefressene Tier?'],
                ['farne', 'Welche Pflanzen vermehren sich mit Sporen?'],
                ['sporen', 'Womit vermehren sich Farne und Moose?'],
                ['samenpflanzen', 'Welche Pflanzen bilden Samen?'],
                ['bestaeubung', 'Wie nennt man Uebertragung von Pollen?'],
                ['befruchtung', 'Wie nennt man Verschmelzung von Ei- und Samenzelle?'],
                ['keimung', 'Wie nennt man den Start des Wachstums aus dem Samen?'],
                ['stickstoff', 'Welchen Naehrstoff mit Symbol N brauchen Pflanzen aus dem Boden?'],
                ['humus', 'Wie nennt man dunkle, organische Bodenbestandteile?'],
                ['biodiversitaet', 'Wie nennt man die Vielfalt der Arten, Gene und Lebensraeume?']
            ])
        },
        k8: {
            physik: natwiTopup('Klasse 8 Physik', [
                ['20', 'Berechne $R$ in $\\Omega$: $U=10\\,\\text{V}$, $I=0{,}5\\,\\text{A}$.'],
                ['2', 'Berechne $I$ in A: $U=12\\,\\text{V}$, $R=6\\,\\Omega$.'],
                ['24', 'Berechne $U$ in V: $R=8\\,\\Omega$, $I=3\\,\\text{A}$.'],
                ['60', 'Berechne $P$ in W: $U=30\\,\\text{V}$, $I=2\\,\\text{A}$.'],
                ['1200', 'Berechne $W$ in J: $P=20\\,\\text{W}$, $t=60\\,\\text{s}$.'],
                ['50', 'Berechne $P$ in W: $W=1000\\,\\text{J}$, $t=20\\,\\text{s}$.'],
                ['150', 'Berechne die Arbeit in J: $F=30\\,\\text{N}$, $s=5\\,\\text{m}$.'],
                ['20', 'Berechne $F$ in N: $W=100\\,\\text{J}$, $s=5\\,\\text{m}$.'],
                ['4', 'Berechne $s$ in m: $W=80\\,\\text{J}$, $F=20\\,\\text{N}$.'],
                ['30', 'Berechne den Gesamtwiderstand in $\\Omega$: $10\\,\\Omega$ und $20\\,\\Omega$ in Reihe.'],
                ['10', 'Berechne den Ersatzwiderstand in $\\Omega$: zwei gleiche $20\\,\\Omega$-Widerstaende parallel.'],
                ['12', 'Berechne $Q$ in C: $I=3\\,\\text{A}$, $t=4\\,\\text{s}$.'],
                ['12', 'Berechne $U$ in V: $W=24\\,\\text{J}$, $Q=2\\,\\text{C}$.'],
                ['spannung', 'Welche Groesse misst man in Volt?'],
                ['stromstaerke', 'Welche Groesse misst man in Ampere?'],
                ['widerstand', 'Welche Groesse misst man in Ohm?'],
                ['ohm', 'Welche Einheit hat der elektrische Widerstand?'],
                ['volt', 'Welche Einheit hat die Spannung?'],
                ['ampere', 'Welche Einheit hat die Stromstaerke?'],
                ['watt', 'Welche Einheit hat die Leistung?'],
                ['joule', 'Welche Einheit hat Arbeit und Energie?'],
                ['reihenschaltung', 'Wie nennt man eine Schaltung mit nur einem Stromweg?'],
                ['parallelschaltung', 'Wie nennt man eine Schaltung mit mehreren Stromwegen?'],
                ['leistung', 'Welche Groesse ist Arbeit pro Zeit?'],
                ['arbeit', 'Welche Groesse berechnet man mit $F\\cdot s$?'],
                ['energieerhaltung', 'Welches Prinzip sagt, dass Energie nur umgewandelt wird?'],
                ['kurzschluss', 'Wie heisst eine Verbindung mit sehr kleinem Widerstand?'],
                ['sicherung', 'Welches Bauteil schuetzt vor zu grossem Strom?'],
                ['schalter', 'Welches Bauteil oeffnet und schliesst den Stromkreis?'],
                ['elektronen', 'Welche Teilchen bewegen sich in metallischen Leitern?'],
                ['pluspol', 'Welcher Pol einer Spannungsquelle hat hoeheres elektrisches Potential?'],
                ['minuspol', 'Von welchem Pol kommen Elektronen im einfachen Metallleiter-Modell?'],
                ['isolator', 'Wie nennt man einen schlechten elektrischen Leiter?'],
                ['leiter', 'Wie nennt man einen guten elektrischen Leiter?'],
                ['kupfer', 'Welches Metall wird oft fuer Leitungen genutzt?'],
                ['transformator', 'Welches Geraet kann Wechselspannungen hoch- oder heruntersetzen?'],
                ['magnetfeld', 'Was entsteht um einen stromdurchflossenen Leiter?'],
                ['elektromagnet', 'Wie nennt man eine stromdurchflossene Spule mit Eisenkern?'],
                ['induktion', 'Wie nennt man das Erzeugen einer Spannung durch Magnetfeldaenderung?'],
                ['generator', 'Welches Geraet wandelt Bewegungsenergie in elektrische Energie?']
            ]),
            chemie: natwiTopup('Klasse 8 Chemie', [
                ['protonen', 'Welche positiv geladenen Teilchen sitzen im Atomkern?'],
                ['neutronen', 'Welche ungeladenen Teilchen sitzen im Atomkern?'],
                ['elektronen', 'Welche negativ geladenen Teilchen befinden sich in der Atomhuelle?'],
                ['atomkern', 'Wo sitzen Protonen und Neutronen?'],
                ['atomhuelle', 'Wo befinden sich Elektronen?'],
                ['ordnungszahl', 'Welche Zahl gibt die Protonenzahl eines Elements an?'],
                ['massenzahl', 'Welche Zahl ist Protonen plus Neutronen?'],
                ['periodensystem', 'Wie nennt man die Ordnung aller Elemente?'],
                ['periode', 'Wie nennt man eine waagerechte Zeile im Periodensystem?'],
                ['gruppe', 'Wie nennt man eine senkrechte Spalte im Periodensystem?'],
                ['alkalimetalle', 'Wie heisst die 1. Hauptgruppe ohne Wasserstoff?'],
                ['halogene', 'Wie heisst die 17. Gruppe mit Fluor, Chlor, Brom und Iod?'],
                ['edelgase', 'Wie heisst die 18. Gruppe mit sehr reaktionstraegen Gasen?'],
                ['sauerstoff', 'Welches Element hat Ordnungszahl 8?'],
                ['kohlenstoff', 'Welches Element hat Ordnungszahl 6?'],
                ['wasserstoff', 'Welches Element hat Ordnungszahl 1?'],
                ['natrium', 'Welches Element hat das Symbol Na?'],
                ['chlor', 'Welches Element hat das Symbol Cl?'],
                ['calcium', 'Welches Element hat das Symbol Ca?'],
                ['magnesium', 'Welches Element hat das Symbol Mg?'],
                ['eisen', 'Welches Element hat das Symbol Fe?'],
                ['kupfer', 'Welches Element hat das Symbol Cu?'],
                ['ion', 'Wie nennt man ein elektrisch geladenes Teilchen?'],
                ['kation', 'Wie nennt man ein positiv geladenes Ion?'],
                ['anion', 'Wie nennt man ein negativ geladenes Ion?'],
                ['ionenbindung', 'Welche Bindung entsteht durch Anziehung von Kationen und Anionen?'],
                ['elektronenschale', 'Wie nennt man Energiebereiche der Elektronen im Schalenmodell?'],
                ['valenzelektronen', 'Wie nennt man Elektronen der aeussersten Schale?'],
                ['dalton', 'Welcher Forscher stellte Atome als Kugeln dar?'],
                ['rutherford', 'Welches Atommodell besitzt Kern und Huelle nach Streuversuch?'],
                ['bohr', 'Welches Atommodell nutzt Elektronenschalen?'],
                ['oxid', 'Welche Stoffklasse entsteht oft bei Reaktion mit Sauerstoff?'],
                ['oxidation', 'Wie nennt man Aufnahme von Sauerstoff oder Elektronenabgabe?'],
                ['reduktion', 'Wie nennt man Sauerstoffabgabe oder Elektronenaufnahme?'],
                ['edelgasregel', 'Welche Regel beschreibt das Ziel voller Aussenschalen?'],
                ['isotope', 'Wie nennt man Atome eines Elements mit verschiedener Neutronenzahl?'],
                ['molekuel', 'Wie nennt man einen Verbund aus Atomen mit Elektronenpaarbindung?'],
                ['na', 'Welches Symbol hat Natrium?'],
                ['cl', 'Welches Symbol hat Chlor?'],
                ['o2', 'Welche Formel hat Sauerstoffgas?']
            ]),
            biologie: natwiTopup('Klasse 8 Biologie', [
                ['lunge', 'Welches Organ nimmt Sauerstoff aus der Atemluft auf?'],
                ['alveolen', 'Wie nennt man Lungenblaeschen?'],
                ['bronchien', 'Wie nennt man die verzweigten Luftwege in der Lunge?'],
                ['zwerchfell', 'Welcher Muskel bewegt sich beim Einatmen nach unten?'],
                ['sauerstoff', 'Welches Gas gelangt aus den Alveolen ins Blut?'],
                ['kohlendioxid', 'Welches Gas gelangt aus dem Blut in die Alveolen?'],
                ['diffusion', 'Wie nennt man Teilchenbewegung vom hohen zum niedrigen Konzentrationsbereich?'],
                ['haemoglobin', 'Welcher rote Blutfarbstoff bindet Sauerstoff?'],
                ['erythrozyten', 'Wie nennt man rote Blutkoerperchen fachlich?'],
                ['leukozyten', 'Wie nennt man weisse Blutkoerperchen fachlich?'],
                ['thrombozyten', 'Wie nennt man Blutplaettchen fachlich?'],
                ['plasma', 'Wie nennt man den fluessigen Anteil des Blutes?'],
                ['herz', 'Welches Organ treibt den Blutkreislauf an?'],
                ['vorhof', 'Wie nennt man eine der oberen Herzkammern?'],
                ['kammer', 'Wie nennt man eine der unteren Herzkammern?'],
                ['arterien', 'Welche Gefaesse fuehren Blut vom Herzen weg?'],
                ['venen', 'Welche Gefaesse fuehren Blut zum Herzen hin?'],
                ['kapillaren', 'Wie nennt man feinste Blutgefaesse fuer Stoffaustausch?'],
                ['lungenkreislauf', 'Welcher Kreislauf fuehrt Blut vom Herzen zur Lunge und zurueck?'],
                ['koerperkreislauf', 'Welcher Kreislauf versorgt Organe und Gewebe?'],
                ['magen', 'Wo wird Nahrung mit Magensaft vermischt?'],
                ['speiseroehre', 'Welcher Schlauch transportiert Nahrung zum Magen?'],
                ['duenndarm', 'Wo findet die meiste Naehrstoffaufnahme statt?'],
                ['dickdarm', 'Wo wird dem Nahrungsbrei Wasser entzogen?'],
                ['leber', 'Welches Organ bildet Galle?'],
                ['galle', 'Welche Fluessigkeit hilft bei der Fettverdauung?'],
                ['bauchspeicheldruese', 'Welches Organ bildet Verdauungsenzyme und Insulin?'],
                ['enzyme', 'Wie nennt man Biokatalysatoren der Verdauung?'],
                ['amylase', 'Welches Enzym spaltet Staerke im Mund?'],
                ['staerke', 'Welcher Kohlenhydrat-Speicherstoff wird durch Amylase gespalten?'],
                ['protein', 'Welcher Naehrstoff besteht aus Aminosaeuren?'],
                ['fett', 'Welcher Naehrstoff liefert besonders viel Energie pro Gramm?'],
                ['resorption', 'Wie nennt man Aufnahme von Naehrstoffen ins Blut?'],
                ['peristaltik', 'Wie nennt man wellenfoermige Darmbewegung?'],
                ['niere', 'Welches Organ bildet Urin?'],
                ['puls', 'Welche Messgroesse zaehlt Herzschlaege pro Minute?'],
                ['blutdruck', 'Welche Groesse misst den Druck in Arterien?'],
                ['insulin', 'Welches Hormon senkt den Blutzucker?'],
                ['glucagon', 'Welches Hormon erhoeht den Blutzucker?'],
                ['atmung', 'Welcher Vorgang versorgt den Koerper mit Sauerstoff?']
            ])
        },
        k9: {
            physik: natwiTopup('Klasse 9 Physik', [
                ['30', 'Berechne $F$ in N: $m=6\\,\\text{kg}$, $a=5\\,\\text{m/s}^2$.'],
                ['4', 'Berechne $a$ in m/s$^2$: $F=20\\,\\text{N}$, $m=5\\,\\text{kg}$.'],
                ['5', 'Berechne $m$ in kg: $F=25\\,\\text{N}$, $a=5\\,\\text{m/s}^2$.'],
                ['200', 'Berechne $E_\\text{kin}$ in J: $m=4\\,\\text{kg}$, $v=10\\,\\text{m/s}$.'],
                ['150', 'Berechne $E_\\text{pot}$ in J: $m=3\\,\\text{kg}$, $h=5\\,\\text{m}$, $g\\approx10\\,\\text{N/kg}$.'],
                ['12', 'Berechne $Q$ in C: $I=4\\,\\text{A}$, $t=3\\,\\text{s}$.'],
                ['6', 'Berechne $U$ in V: $W=18\\,\\text{J}$, $Q=3\\,\\text{C}$.'],
                ['40', 'Berechne $P$ in W: $W=800\\,\\text{J}$, $t=20\\,\\text{s}$.'],
                ['250', 'Berechne $p$ in Pa: $F=100\\,\\text{N}$, $A=0{,}4\\,\\text{m}^2$.'],
                ['2000', 'Berechne den Druck in Pa: $F=200\\,\\text{N}$, $A=0{,}1\\,\\text{m}^2$.'],
                ['traegheit', 'Wie heisst das 1. newtonsche Gesetz als Stichwort?'],
                ['grundgleichung', 'Wie nennt man $F=m\\cdot a$ im Newton-Kontext?'],
                ['wechselwirkung', 'Wie heisst das 3. newtonsche Gesetz als Stichwort?'],
                ['newton', 'Welche Einheit hat Kraft?'],
                ['pascal', 'Welche Einheit hat Druck?'],
                ['joule', 'Welche Einheit hat Energie?'],
                ['coulomb', 'Welche Einheit hat elektrische Ladung?'],
                ['magnetfeld', 'Was entsteht um stromdurchflossene Leiter?'],
                ['induktion', 'Wie nennt man Spannungserzeugung durch Magnetfeldaenderung?'],
                ['spule', 'Welches Bauteil verstaerkt Magnetfelder durch viele Windungen?'],
                ['elektromagnet', 'Wie nennt man eine Spule mit Eisenkern bei Stromfluss?'],
                ['generator', 'Welches Geraet nutzt Induktion zur Stromerzeugung?'],
                ['motor', 'Welches Geraet wandelt elektrische Energie in Bewegung um?'],
                ['energieerhaltung', 'Welches Gesetz gilt fuer Energieumwandlungen in abgeschlossenen Systemen?'],
                ['wirkungsgrad', 'Welche Groesse ist Nutzenergie geteilt durch zugefuehrte Energie?'],
                ['reibung', 'Welche Kraft wandelt Bewegungsenergie oft in Waerme um?'],
                ['schweredruck', 'Wie nennt man Druck in Fluessigkeiten durch Gewichtskraft der Fluessigkeit?'],
                ['auftrieb', 'Welche Kraft wirkt in Fluessigkeiten nach oben?'],
                ['dichte', 'Welche Stoffgroesse entscheidet mit ueber Schwimmen oder Sinken?'],
                ['arbeit', 'Welche Groesse berechnet man mit $W=F\\cdot s$?'],
                ['leistung', 'Welche Groesse berechnet man mit $P=W/t$?'],
                ['kinetisch', 'Wie nennt man Bewegungsenergie?'],
                ['potentiell', 'Wie nennt man Lageenergie im Schwerefeld?'],
                ['beschleunigung', 'Welche Groesse misst Geschwindigkeitsaenderung pro Zeit?'],
                ['inertia', 'Wie heisst Traegheit auf Englisch?'],
                ['normaldruck', 'Wie nennt man den Luftdruck auf Meeresspiegel-Niveau ungefaehr?'],
                ['barometer', 'Welches Messgeraet misst Luftdruck?'],
                ['amperemeter', 'Welches Messgeraet misst Stromstaerke?'],
                ['voltmeter', 'Welches Messgeraet misst Spannung?'],
                ['ohmmeter', 'Welches Messgeraet misst Widerstand?']
            ]),
            chemie: natwiTopup('Klasse 9 Chemie', [
                ['sauer', 'Wie nennt man Loesungen mit pH kleiner als 7?'],
                ['neutral', 'Wie nennt man Loesungen mit pH gleich 7?'],
                ['basisch', 'Wie nennt man Loesungen mit pH groesser als 7?'],
                ['hcl', 'Welche Formel hat Salzsaeure?'],
                ['h2so4', 'Welche Formel hat Schwefelsaeure?'],
                ['hno3', 'Welche Formel hat Salpetersaeure?'],
                ['ch3cooh', 'Welche Formel hat Essigsaeure in Kurzschreibweise?'],
                ['naoh', 'Welche Formel hat Natronlauge?'],
                ['koh', 'Welche Formel hat Kalilauge?'],
                ['ca(oh)2', 'Welche Formel hat Calciumhydroxid? Antwort ohne Leerzeichen.'],
                ['hydroniumion', 'Welches Ion $H_3O^+$ kennzeichnet saure Loesungen?'],
                ['hydroxidion', 'Welches Ion $OH^-$ kennzeichnet basische Loesungen?'],
                ['neutralisation', 'Wie nennt man die Reaktion von Saeure und Base zu Salz und Wasser?'],
                ['salz', 'Welches Produkt entsteht bei Neutralisation neben Wasser?'],
                ['wasser', 'Welches Produkt entsteht bei Neutralisation neben Salz?'],
                ['indikator', 'Welcher Stoff zeigt pH-Bereiche farblich an?'],
                ['lackmus', 'Welcher Indikator wird in einfachen Schulversuchen oft genutzt?'],
                ['phenolphthalein', 'Welcher Indikator ist in basischer Loesung pink?'],
                ['universalindikator', 'Welcher Indikator zeigt viele pH-Werte farbig an?'],
                ['ph', 'Welche Skala reicht grob von 0 bis 14?'],
                ['ionenbindung', 'Welche Bindung liegt in vielen Salzen vor?'],
                ['kation', 'Wie nennt man ein positiv geladenes Ion?'],
                ['anion', 'Wie nennt man ein negativ geladenes Ion?'],
                ['chlorid', 'Wie heisst das Anion Cl$^-$?'],
                ['sulfat', 'Wie heisst das Ion SO$_4^{2-}$?'],
                ['nitrat', 'Wie heisst das Ion NO$_3^-$?'],
                ['carbonat', 'Wie heisst das Ion CO$_3^{2-}$?'],
                ['natriumchlorid', 'Wie heisst Kochsalz chemisch?'],
                ['calciumcarbonat', 'Welcher Stoff ist Hauptbestandteil von Kalkstein?'],
                ['kohlendioxid', 'Welches Gas entsteht oft, wenn Carbonate mit Saeure reagieren?'],
                ['exotherm', 'Wie nennt man eine Reaktion, die Waerme abgibt?'],
                ['endotherm', 'Wie nennt man eine Reaktion, die Waerme aufnimmt?'],
                ['aktivierungsenergie', 'Welche Energie muss zum Start einer Reaktion zugefuehrt werden?'],
                ['katalysator', 'Welcher Stoff beschleunigt Reaktionen, ohne verbraucht zu werden?'],
                ['oxidation', 'Wie nennt man Elektronenabgabe?'],
                ['reduktion', 'Wie nennt man Elektronenaufnahme?'],
                ['redoxreaktion', 'Wie nennt man gekoppelte Oxidation und Reduktion?'],
                ['elektrolyt', 'Wie nennt man eine leitfaehige Loesung mit Ionen?'],
                ['korrosion', 'Wie nennt man langsame Zerstoerung von Metallen durch Reaktionen?'],
                ['edelmetall', 'Wie nennt man ein reaktionstraeges Metall wie Gold?']
            ]),
            biologie: natwiTopup('Klasse 9 Biologie', [
                ['dna', 'Welches Molekuel speichert die Erbinformation?'],
                ['chromosom', 'Wie nennt man stark verpackte DNA im Zellkern?'],
                ['gen', 'Wie nennt man einen DNA-Abschnitt fuer ein Merkmal oder Protein?'],
                ['allel', 'Wie nennt man eine Variante eines Gens?'],
                ['mitose', 'Welche Zellteilung erzeugt genetisch gleiche Koerperzellen?'],
                ['meiose', 'Welche Zellteilung erzeugt Keimzellen mit halbem Chromosomensatz?'],
                ['crossingover', 'Wie nennt man Stueckaustausch zwischen homologen Chromosomen?'],
                ['mutation', 'Wie nennt man eine dauerhafte Veraenderung der DNA?'],
                ['genotyp', 'Wie nennt man die genetische Ausstattung?'],
                ['phaenotyp', 'Wie nennt man das sichtbare Erscheinungsbild eines Merkmals?'],
                ['homozygot', 'Wie nennt man gleiche Allele fuer ein Merkmal?'],
                ['heterozygot', 'Wie nennt man verschiedene Allele fuer ein Merkmal?'],
                ['dominant', 'Wie nennt man ein Allel, das sich im heterozygoten Zustand durchsetzt?'],
                ['rezessiv', 'Wie nennt man ein Allel, das im heterozygoten Zustand verdeckt wird?'],
                ['uniformitaetsregel', 'Welche mendelsche Regel beschreibt gleiche F1-Nachkommen?'],
                ['spaltungsregel', 'Welche mendelsche Regel beschreibt 3:1 in der F2 bei monohybridem Erbgang?'],
                ['keimzelle', 'Wie nennt man Ei- oder Samenzelle?'],
                ['zygote', 'Wie nennt man die befruchtete Eizelle?'],
                ['darwin', 'Wer formulierte die Theorie der natuerlichen Auslese?'],
                ['selektion', 'Wie nennt man natuerliche Auswahl besser angepasster Individuen?'],
                ['anpassung', 'Wie nennt man Merkmale, die Ueberleben oder Fortpflanzung beguenstigen?'],
                ['fitness', 'Welche biologische Groesse meint Fortpflanzungserfolg?'],
                ['fossil', 'Wie nennt man erhaltene Reste oder Spuren frueherer Lebewesen?'],
                ['homologie', 'Wie nennt man Aehnlichkeit wegen gemeinsamer Abstammung?'],
                ['analogie', 'Wie nennt man Aehnlichkeit wegen gleicher Funktion ohne nahe Verwandtschaft?'],
                ['rudiment', 'Wie nennt man zurueckgebildetes Organ mit Evolutionshinweis?'],
                ['isolation', 'Was trennt Populationen und kann Artbildung foerdern?'],
                ['art', 'Wie nennt man eine Gruppe, die fruchtbare Nachkommen erzeugen kann?'],
                ['population', 'Wie nennt man alle Individuen einer Art in einem Gebiet?'],
                ['genpool', 'Wie nennt man Gesamtheit aller Gene einer Population?'],
                ['stammbaum', 'Welche Darstellung zeigt Verwandtschaftsbeziehungen?'],
                ['variation', 'Wie nennt man Unterschiede zwischen Individuen einer Art?'],
                ['rekombination', 'Wie nennt man Neukombination elterlicher Gene?'],
                ['diploid', 'Wie nennt man Zellen mit doppeltem Chromosomensatz?'],
                ['haploid', 'Wie nennt man Zellen mit einfachem Chromosomensatz?'],
                ['46', 'Wie viele Chromosomen hat eine menschliche Koerperzelle?'],
                ['23', 'Wie viele Chromosomen hat eine menschliche Keimzelle?'],
                ['xchromosom', 'Welches Geschlechtschromosom tragen alle Menschen mindestens einmal?'],
                ['ychromosom', 'Welches Geschlechtschromosom bestimmt beim Menschen typischerweise maennliche Entwicklung?'],
                ['protein', 'Welcher Stoff entsteht nach dem Ablesen vieler Gene?']
            ])
        },
        k10: {
            physik: natwiTopup('Klasse 10 Physik', [
                ['rutherford', 'Welches Atommodell erklaert den Streuversuch mit kleinem Kern?'],
                ['bohr', 'Welches Atommodell nutzt Elektronen auf Schalen?'],
                ['alpha', 'Welche Strahlung besteht aus Heliumkernen?'],
                ['beta', 'Welche Strahlung besteht aus Elektronen oder Positronen?'],
                ['gamma', 'Welche Strahlung ist energiereiche elektromagnetische Strahlung?'],
                ['halbwertszeit', 'Wie nennt man die Zeit, nach der die Aktivitaet halbiert ist?'],
                ['becquerel', 'Welche Einheit hat die Aktivitaet radioaktiver Stoffe?'],
                ['sievert', 'Welche Einheit beschreibt Strahlenwirkung auf den Menschen?'],
                ['geigerzaehler', 'Welches Geraet weist ionisierende Strahlung nach?'],
                ['ionisation', 'Wie nennt man das Entfernen oder Hinzufuegen von Elektronen bei Atomen?'],
                ['kernspaltung', 'Wie nennt man Aufspalten schwerer Atomkerne?'],
                ['kernfusion', 'Wie nennt man Verschmelzen leichter Atomkerne?'],
                ['kettenreaktion', 'Wie nennt man sich selbst fortsetzende Kernspaltungen?'],
                ['papier', 'Welches Material schirmt Alphastrahlung meist schon ab?'],
                ['aluminium', 'Welches Material kann Betastrahlung deutlich abschwaechen?'],
                ['blei', 'Welches dichte Material schirmt Gammastrahlung gut ab?'],
                ['brechung', 'Wie nennt man Richtungsaenderung von Licht an einer Grenzflaeche?'],
                ['totalreflexion', 'Wie nennt man vollstaendige Reflexion beim Uebergang ins optisch duennere Medium?'],
                ['sammellinse', 'Welche Linse ist in der Mitte dicker und buendelt Licht?'],
                ['zerstreuungslinse', 'Welche Linse ist in der Mitte duenner und zerstreut Licht?'],
                ['brennweite', 'Wie nennt man Abstand von Linse zu Brennpunkt?'],
                ['reell', 'Wie nennt man ein Bild, das auf einem Schirm auffangbar ist?'],
                ['virtuell', 'Wie nennt man ein Bild, das nicht auf einem Schirm auffangbar ist?'],
                ['beugung', 'Wie nennt man Ausbreitung von Wellen hinter Kanten oder Spalten?'],
                ['interferenz', 'Wie nennt man Ueberlagerung von Wellen?'],
                ['photon', 'Wie nennt man ein Lichtquant?'],
                ['frequenz', 'Welche Wellengroesse gibt Schwingungen pro Sekunde an?'],
                ['wellenlaenge', 'Welche Wellengroesse ist Abstand zweier gleicher Schwingungszustaende?'],
                ['2', 'Berechne $\\lambda$ in m: $c=3\\cdot10^8\\,\\text{m/s}$, $f=1{,}5\\cdot10^8\\,\\text{Hz}$.'],
                ['300000000', 'Berechne $v$ in m/s: $f=1\\cdot10^8\\,\\text{Hz}$, $\\lambda=3\\,\\text{m}$.'],
                ['100000000', 'Berechne $f$ in Hz: $c=3\\cdot10^8\\,\\text{m/s}$, $\\lambda=3\\,\\text{m}$.'],
                ['0.02', 'Berechne die Periodendauer in s: $f=50\\,\\text{Hz}$, $T=1/f$.'],
                ['25', 'Nach einer Halbwertszeit bleiben 50 %, nach zwei Halbwertszeiten wie viel Prozent?'],
                ['12.5', 'Nach drei Halbwertszeiten bleiben wie viel Prozent der Anfangsmenge?'],
                ['atomkern', 'Wo befindet sich fast die gesamte Masse eines Atoms?'],
                ['proton', 'Welches positiv geladene Teilchen sitzt im Kern?'],
                ['neutron', 'Welches ungeladene Teilchen sitzt im Kern?'],
                ['elektron', 'Welches negativ geladene Teilchen befindet sich in der Huelle?'],
                ['energie', 'Welche Groesse eines Photons steigt mit der Frequenz?'],
                ['lichtgeschwindigkeit', 'Welche Konstante verbindet Frequenz und Wellenlaenge im Vakuum?']
            ]),
            chemie: natwiTopup('Klasse 10 Chemie', [
                ['methan', 'Wie heisst das Alkan mit einem Kohlenstoffatom?'],
                ['ethan', 'Wie heisst das Alkan mit zwei Kohlenstoffatomen?'],
                ['propan', 'Wie heisst das Alkan mit drei Kohlenstoffatomen?'],
                ['butan', 'Wie heisst das Alkan mit vier Kohlenstoffatomen?'],
                ['pentan', 'Wie heisst das Alkan mit fuenf Kohlenstoffatomen?'],
                ['hexan', 'Wie heisst das Alkan mit sechs Kohlenstoffatomen?'],
                ['alkane', 'Wie nennt man gesaettigte Kohlenwasserstoffe mit Einfachbindungen?'],
                ['alkene', 'Wie nennt man Kohlenwasserstoffe mit mindestens einer Doppelbindung?'],
                ['alkine', 'Wie nennt man Kohlenwasserstoffe mit mindestens einer Dreifachbindung?'],
                ['methanol', 'Wie heisst der Alkohol mit einem Kohlenstoffatom?'],
                ['ethanol', 'Wie heisst der Alkohol mit zwei Kohlenstoffatomen?'],
                ['propanol', 'Wie heisst ein Alkohol mit drei Kohlenstoffatomen?'],
                ['carbonsaeure', 'Welche Stoffklasse besitzt die Gruppe -COOH?'],
                ['essigsaeure', 'Wie heisst Ethansaeure im Alltag?'],
                ['ameisensaeure', 'Wie heisst Methansaeure im Alltag?'],
                ['ester', 'Welche Stoffklasse entsteht aus Alkohol und Carbonsaeure?'],
                ['hydroxylgruppe', 'Wie heisst die funktionelle Gruppe -OH?'],
                ['carboxylgruppe', 'Wie heisst die funktionelle Gruppe -COOH?'],
                ['carbonylgruppe', 'Wie heisst die funktionelle Gruppe C=O?'],
                ['isomerie', 'Wie nennt man gleiche Summenformel, aber unterschiedliche Struktur?'],
                ['kohlendioxid', 'Welches Gas entsteht bei vollstaendiger Verbrennung von Kohlenwasserstoffen?'],
                ['wasser', 'Welcher Stoff entsteht neben CO$_2$ bei vollstaendiger Verbrennung?'],
                ['polymerisation', 'Wie nennt man Verknuepfung vieler Monomere zu einem Polymer?'],
                ['ethen', 'Wie heisst das einfachste Alken?'],
                ['propen', 'Wie heisst das Alken mit drei Kohlenstoffatomen?'],
                ['homologe reihe', 'Wie nennt man Stoffreihe mit gleicher funktioneller Gruppe und CH$_2$-Unterschieden?'],
                ['gesaettigt', 'Wie nennt man Kohlenwasserstoffe mit nur Einfachbindungen?'],
                ['ungesaettigt', 'Wie nennt man Kohlenwasserstoffe mit Doppel- oder Dreifachbindungen?'],
                ['addition', 'Welche Reaktion lagert Atome an eine Doppelbindung an?'],
                ['substitution', 'Welche Reaktion ersetzt ein Atom oder eine Gruppe durch eine andere?'],
                ['alkanol', 'Wie nennt man Alkohole systematisch als Stoffklasse?'],
                ['hydrophil', 'Wie nennt man wasserliebende Molekuelteile?'],
                ['hydrophob', 'Wie nennt man wassermeidende Molekuelteile?'],
                ['seife', 'Welches Tensid-Salz entsteht aus Fettsaeure und Lauge?'],
                ['tensid', 'Wie nennt man Stoffe mit hydrophilem Kopf und hydrophobem Schwanz?'],
                ['kunststoff', 'Wie nennt man Polymer-Werkstoffe im Alltag?'],
                ['monomer', 'Wie nennt man einen einzelnen Polymer-Baustein?'],
                ['polymer', 'Wie nennt man ein Makromolekuel aus vielen Monomeren?'],
                ['cracken', 'Wie nennt man Spalten langer Kohlenwasserstoffe in kuerzere?'],
                ['erdgas', 'Welcher fossile Brennstoff besteht hauptsaechlich aus Methan?']
            ]),
            biologie: natwiTopup('Klasse 10 Biologie', [
                ['dna', 'Welches Molekuel traegt die Erbinformation?'],
                ['rna', 'Welches Molekuel nutzt meist Uracil statt Thymin?'],
                ['adenin', 'Welche DNA-Base paart mit Thymin?'],
                ['thymin', 'Welche DNA-Base paart mit Adenin?'],
                ['guanin', 'Welche DNA-Base paart mit Cytosin?'],
                ['cytosin', 'Welche DNA-Base paart mit Guanin?'],
                ['uracil', 'Welche Base ersetzt Thymin in RNA?'],
                ['transkription', 'Wie nennt man Umschreiben von DNA in mRNA?'],
                ['translation', 'Wie nennt man Uebersetzen von mRNA in Protein?'],
                ['codon', 'Wie nennt man ein Basentriplett der mRNA?'],
                ['ribosom', 'An welchem Zellbestandteil findet Translation statt?'],
                ['aminosaeuren', 'Aus welchen Bausteinen bestehen Proteine?'],
                ['protein', 'Welches Makromolekuel entsteht bei der Translation?'],
                ['mutation', 'Wie nennt man dauerhafte Veraenderung der Erbinformation?'],
                ['genregulation', 'Wie nennt man Steuerung, wann Gene aktiv sind?'],
                ['plasmid', 'Wie nennt man kleine ringfoermige DNA in Bakterien?'],
                ['pcr', 'Welche Methode vervielfaelt gezielt DNA-Abschnitte?'],
                ['genom', 'Wie nennt man die gesamte Erbinformation eines Lebewesens?'],
                ['chromosom', 'Wie nennt man DNA-Paket im Zellkern?'],
                ['gen', 'Wie nennt man DNA-Abschnitt mit Information fuer ein Produkt?'],
                ['biodiversitaet', 'Wie nennt man Vielfalt von Arten, Genen und Lebensraeumen?'],
                ['artenvielfalt', 'Welche Biodiversitaets-Ebene zaehlt verschiedene Arten?'],
                ['genetische vielfalt', 'Welche Biodiversitaets-Ebene meint Unterschiede im Erbgut?'],
                ['oekosystemvielfalt', 'Welche Biodiversitaets-Ebene meint verschiedene Lebensraeume?'],
                ['invasive art', 'Wie nennt man eingewanderte Art, die heimische Oekosysteme schaedigt?'],
                ['lebensraumverlust', 'Welche Hauptursache bedroht Biodiversitaet global besonders stark?'],
                ['klimawandel', 'Welche globale Veraenderung verschiebt Lebensraeume und Artenareale?'],
                ['naturschutz', 'Wie nennt man Massnahmen zum Erhalt von Arten und Lebensraeumen?'],
                ['nachhaltigkeit', 'Welches Prinzip nutzt Ressourcen so, dass Zukunftschancen erhalten bleiben?'],
                ['rote liste', 'Welche Liste bewertet Gefaehrdung von Arten?'],
                ['genpool', 'Wie nennt man Gesamtheit der Gene einer Population?'],
                ['selektion', 'Wie nennt man unterschiedliche Ueberlebens- und Fortpflanzungschancen?'],
                ['anpassung', 'Wie nennt man Merkmal, das in einer Umwelt vorteilhaft ist?'],
                ['oekologische nische', 'Wie nennt man Rolle und Ansprueche einer Art im Oekosystem?'],
                ['population', 'Wie nennt man alle Individuen einer Art in einem Gebiet?'],
                ['artbildung', 'Wie nennt man Entstehung neuer Arten?'],
                ['isolation', 'Was kann Populationen trennen und Artbildung ermoeglichen?'],
                ['symbiose', 'Wie nennt man Zusammenleben mit Nutzen fuer beide Arten?'],
                ['parasitismus', 'Wie nennt man Zusammenleben zum Schaden eines Partners?'],
                ['trophiestufe', 'Wie nennt man eine Ebene im Nahrungsnetz?']
            ])
        }
    };

    // TOPUP v69: +50 weitere Mittelstufen-Fragen verteilt ueber die vorhandenen
    // Naturwissenschafts-Pools. Sie werden nach den v68-Topups angehaengt.
    const NATWI_EXTRA_V69 = {
        k5: {
            physik: natwiTopup('Klasse 5 Physik Extra', [
                ['magnetnadel', 'Welches Teil im Kompass richtet sich im Erdmagnetfeld aus?'],
                ['batterie', 'Welche Spannungsquelle nutzt man oft im einfachen Schul-Stromkreis?'],
                ['lichtstrahl', 'Wie nennt man eine gedachte gerade Linie fuer die Ausbreitung von Licht?']
            ]),
            chemie: natwiTopup('Klasse 5 Chemie Extra', [
                ['teilchenmodell', 'Welches Modell erklaert Aggregatzustaende durch Bewegung kleinster Teilchen?'],
                ['verdunsten', 'Wie heisst langsames Verdampfen unterhalb des Siedepunktes?'],
                ['loesungsmittel', 'Wie nennt man den Stoff, der einen anderen Stoff loest?']
            ]),
            biologie: natwiTopup('Klasse 5 Biologie Extra', [
                ['narbe', 'Auf welchen Bluetenteil gelangt Pollen bei der Bestaeubung?'],
                ['staubblatt', 'Welcher Bluetenteil bildet Pollen?'],
                ['larve', 'Wie nennt man ein Jugendstadium vieler Insekten?']
            ])
        },
        k6: {
            physik: natwiTopup('Klasse 6 Physik Extra', [
                ['schattenraum', 'Wie nennt man den Raum hinter einem Koerper, in den kein direktes Licht gelangt?'],
                ['waermekapazitaet', 'Welche Eigenschaft beschreibt, wie viel Waerme ein Stoff zum Erwaermen braucht?'],
                ['schallquelle', 'Wie nennt man einen Koerper, der Schall erzeugt?']
            ]),
            chemie: natwiTopup('Klasse 6 Chemie Extra', [
                ['abdampfschale', 'Welches Laborgeraet nutzt man haeufig zum Eindampfen kleiner Loesungsmengen?'],
                ['trichter', 'Welches Laborgeraet haelt beim Filtrieren das Filterpapier?'],
                ['destillat', 'Wie nennt man die bei der Destillation aufgefangene Fluessigkeit?']
            ]),
            biologie: natwiTopup('Klasse 6 Biologie Extra', [
                ['knorpel', 'Welches elastische Gewebe polstert viele Gelenkflaechen?'],
                ['luftroehre', 'Welches Rohr leitet Atemluft vom Kehlkopf zu den Bronchien?'],
                ['naehrstoffe', 'Wie nennt man verwertbare Stoffe aus der Nahrung allgemein?']
            ])
        },
        k7: {
            physik: natwiTopup('Klasse 7 Physik Extra', [
                ['24', 'Berechne $s$ in m: $v=6\\,\\text{m/s}$, $t=4\\,\\text{s}$.'],
                ['25', 'Berechne $v$ in m/s: $s=75\\,\\text{m}$, $t=3\\,\\text{s}$.'],
                ['5', 'Berechne $\\rho$ in g/cm$^3$: $m=250\\,\\text{g}$, $V=50\\,\\text{cm}^3$.']
            ]),
            chemie: natwiTopup('Klasse 7 Chemie Extra', [
                ['mg', 'Welches Elementsymbol hat Magnesium?'],
                ['ag', 'Welches Elementsymbol hat Silber?'],
                ['pb', 'Welches Elementsymbol hat Blei?']
            ]),
            biologie: natwiTopup('Klasse 7 Biologie Extra', [
                ['moose', 'Welche einfache Pflanzengruppe bildet Sporen und keine Blueten?'],
                ['chloroplast', 'Welches Zellorganell enthaelt Chlorophyll?'],
                ['zellulose', 'Aus welchem Stoff besteht die pflanzliche Zellwand hauptsaechlich?']
            ])
        },
        k8: {
            physik: natwiTopup('Klasse 8 Physik Extra', [
                ['5', 'Berechne $I$ in A: $U=15\\,\\text{V}$, $R=3\\,\\Omega$.'],
                ['48', 'Berechne $P$ in W: $U=24\\,\\text{V}$, $I=2\\,\\text{A}$.'],
                ['200', 'Berechne $W$ in J: $F=40\\,\\text{N}$, $s=5\\,\\text{m}$.']
            ]),
            chemie: natwiTopup('Klasse 8 Chemie Extra', [
                ['periodizitaet', 'Wie nennt man regelmaessige Wiederholung von Eigenschaften im Periodensystem?'],
                ['metalle', 'Welche Stoffgruppe leitet Strom und Waerme meist gut?'],
                ['nichtmetalle', 'Welche Stoffgruppe leitet Strom meist schlecht und bildet oft Molekuele?']
            ]),
            biologie: natwiTopup('Klasse 8 Biologie Extra', [
                ['herzklappen', 'Welche Strukturen verhindern Rueckfluss des Blutes im Herzen?'],
                ['gasaustausch', 'Welcher Vorgang findet in den Lungenblaeschen statt?'],
                ['verdauungsenzyme', 'Welche Proteine spalten Naehrstoffe im Verdauungstrakt?']
            ])
        },
        k9: {
            physik: natwiTopup('Klasse 9 Physik Extra', [
                ['500', 'Berechne $E_\\text{kin}$ in J: $m=10\\,\\text{kg}$, $v=10\\,\\text{m/s}$.'],
                ['300', 'Berechne $E_\\text{pot}$ in J: $m=6\\,\\text{kg}$, $h=5\\,\\text{m}$, $g\\approx10\\,\\text{N/kg}$.'],
                ['400', 'Berechne $p$ in Pa: $F=80\\,\\text{N}$, $A=0{,}2\\,\\text{m}^2$.']
            ]),
            chemie: natwiTopup('Klasse 9 Chemie Extra', [
                ['ammoniak', 'Welcher Stoff hat die Formel NH$_3$?'],
                ['chlorwasserstoff', 'Welches Gas bildet in Wasser Salzsaeure?'],
                ['titration', 'Wie nennt man ein Verfahren zur Konzentrationsbestimmung mit Massloesung?']
            ]),
            biologie: natwiTopup('Klasse 9 Biologie Extra', [
                ['codominanz', 'Wie nennt man Erbgang, bei dem zwei Allele gleichzeitig ausgepraegt werden?'],
                ['stammbaum', 'Welche Darstellung nutzt man zur Analyse von Erbgaengen in Familien?'],
                ['mutation', 'Was liefert neben Rekombination neue genetische Variation?']
            ])
        },
        k10: {
            physik: natwiTopup('Klasse 10 Physik Extra', [
                ['6', 'Berechne $\\lambda$ in m: $c=3\\cdot10^8\\,\\text{m/s}$, $f=5\\cdot10^7\\,\\text{Hz}$.'],
                ['6.25', 'Nach vier Halbwertszeiten bleiben wie viel Prozent der Anfangsmenge?']
            ]),
            chemie: natwiTopup('Klasse 10 Chemie Extra', [
                ['polyethen', 'Welcher Kunststoff entsteht aus Ethen-Monomeren?'],
                ['propanon', 'Wie heisst das einfachste Keton mit drei Kohlenstoffatomen?']
            ]),
            biologie: natwiTopup('Klasse 10 Biologie Extra', [
                ['mrna', 'Welche RNA-Form transportiert die Geninformation zum Ribosom?']
            ])
        }
    };

    // TOPUP v70: +50 Naturwissenschafts-Fragen je Klassenstufe 5-10,
    // verteilt auf Physik/Chemie/Biologie und ausgerichtet an Rahmenlehrplan/KLP SI.
    const NATWI_EXTRA_V70 = {
        k5: {
            physik: natwiTopup('Klasse 5 Physik Rahmenplan', [
                ['magnetkraft', 'Welche Kraft zieht Eisennaegel zu einem Magneten?'],
                ['influenz', 'Wie nennt man voruebergehende Magnetisierung durch einen nahen Magneten?'],
                ['feld', 'Welcher Begriff beschreibt den Raum, in dem ein Magnet wirkt?'],
                ['kompassnadel', 'Welches Kompassteil ist selbst ein kleiner Magnet?'],
                ['geschlossen', 'Wie muss ein Stromkreis sein, damit eine Lampe leuchtet?'],
                ['spannung', 'Welche elektrische Groesse treibt Ladungen im Stromkreis an?'],
                ['stromstaerke', 'Welche Groesse beschreibt, wie viel Ladung pro Zeit fliesst?'],
                ['isolator', 'Wie nennt man Glas, Gummi oder trockene Luft im Stromkreis allgemein?'],
                ['leiter', 'Wie nennt man Metalle wie Kupfer im Stromkreis allgemein?'],
                ['schaltplan', 'Wie nennt man eine Zeichnung mit Symbolen fuer elektrische Bauteile?'],
                ['schlagschatten', 'Wie nennt man den sichtbaren Schatten eines Gegenstands auf einer Flaeche?'],
                ['lichtbuendel', 'Wie nennt man viele benachbarte Lichtstrahlen zusammen?'],
                ['geradlinig', 'Wie breitet sich Licht in Luft naeherungsweise aus?'],
                ['reflexion', 'Was passiert mit Licht an einem Spiegel?'],
                ['absorption', 'Wie nennt man Aufnahme von Lichtenergie durch einen Koerper?'],
                ['waermestrahlung', 'Welche Waermeuebertragung funktioniert auch ohne Luft?'],
                ['temperaturdifferenz', 'Was ist die Ursache fuer Waermefluss zwischen zwei Koerpern?']
            ]),
            chemie: natwiTopup('Klasse 5 Chemie Rahmenplan', [
                ['reinstoff', 'Wie nennt man einen Stoff mit einheitlicher Zusammensetzung?'],
                ['stoffgemisch', 'Wie nennt man eine Mischung aus mehreren Reinstoffen?'],
                ['suspension', 'Wie nennt man ein Gemisch aus Feststoffteilchen in einer Fluessigkeit?'],
                ['emulsion', 'Wie nennt man ein Gemisch aus zwei nicht mischbaren Fluessigkeiten?'],
                ['loesung', 'Wie nennt man ein klares Gemisch aus geloestem Stoff und Loesungsmittel?'],
                ['filter', 'Welches Hilfsmittel trennt Feststoffteilchen aus einer Fluessigkeit?'],
                ['sedimentieren', 'Wie nennt man Absinken schwerer Teilchen in einem Gemisch?'],
                ['dekantieren', 'Wie nennt man vorsichtiges Abgiessen einer Fluessigkeit vom Bodensatz?'],
                ['teilchen', 'Aus welchen kleinsten Bausteinen erklaert das Teilchenmodell Stoffe?'],
                ['diffusion', 'Wie nennt man selbststaendige Durchmischung von Teilchen?'],
                ['siedetemperatur', 'Welche Stoffeigenschaft nutzt man beim Destillieren?'],
                ['verdunsten', 'Wie heisst Verdampfen an der Oberflaeche unterhalb des Siedepunktes?'],
                ['kristallisation', 'Wie nennt man Bildung fester Kristalle aus einer Loesung?'],
                ['luft', 'Welches Gasgemisch besteht hauptsaechlich aus Stickstoff und Sauerstoff?'],
                ['sauerstoff', 'Welcher Luftbestandteil ist fuer Verbrennungen wichtig?'],
                ['kohlenstoffdioxid', 'Welches Gas entsteht bei vielen Verbrennungen und truebt Kalkwasser?'],
                ['wasser', 'Welcher Stoff hat bei Normaldruck Schmelzpunkt 0 und Siedepunkt 100 Grad Celsius?']
            ]),
            biologie: natwiTopup('Klasse 5 Biologie Rahmenplan', [
                ['keimung', 'Wie nennt man den Beginn des Wachstums aus einem Samen?'],
                ['wurzelhaare', 'Welche feinen Strukturen vergroessern die Aufnahmeflaeche der Wurzel?'],
                ['sprossachse', 'Welcher Pflanzenteil traegt Blaetter und leitet Wasser?'],
                ['blatt', 'In welchem Pflanzenteil findet besonders viel Fotosynthese statt?'],
                ['chlorophyll', 'Welcher gruene Farbstoff nimmt Licht fuer die Fotosynthese auf?'],
                ['bluete', 'Welches Pflanzenorgan dient der geschlechtlichen Fortpflanzung?'],
                ['frucht', 'Was entsteht nach der Befruchtung oft aus dem Fruchtknoten?'],
                ['samen', 'Welche Struktur enthaelt den Pflanzenembryo und Reservestoffe?'],
                ['wirbeltier', 'Wie nennt man Tiere mit Wirbelsaeule?'],
                ['saeugetier', 'Welche Wirbeltierklasse saeugt ihre Jungen mit Milch?'],
                ['insekt', 'Welche Tiergruppe besitzt sechs Beine und meist drei Koerperabschnitte?'],
                ['kiemen', 'Mit welchem Organ atmen die meisten Fische im Wasser?'],
                ['lunge', 'Mit welchem Organ atmen Saeugetiere und Voegel?'],
                ['gelenk', 'Wie nennt man eine bewegliche Verbindung zwischen Knochen?'],
                ['muskel', 'Welches Organ erzeugt Bewegung durch Zusammenziehen?'],
                ['ernaehrung', 'Welcher Lebensvorgang versorgt Organismen mit Energie und Baustoffen?']
            ])
        },
        k6: {
            physik: natwiTopup('Klasse 6 Physik Rahmenplan', [
                ['einfallslot', 'Wie nennt man die gedachte Senkrechte auf einen Spiegel am Auftreffpunkt?'],
                ['einfallswinkel', 'Welcher Winkel liegt zwischen einfallendem Strahl und Lot?'],
                ['reflexionswinkel', 'Welcher Winkel ist beim Reflexionsgesetz gleich gross wie der Einfallswinkel?'],
                ['sammellinse', 'Welche Linse buendelt paralleles Licht?'],
                ['zerstreuungslinse', 'Welche Linse verteilt paralleles Licht nach aussen?'],
                ['brennpunkt', 'Wie nennt man den Punkt, in dem eine Sammellinse paralleles Licht buendelt?'],
                ['spektrum', 'Wie nennt man die Aufspaltung von weissem Licht in Farben?'],
                ['prisma', 'Welcher Glaskoerper kann weisses Licht in Spektralfarben zerlegen?'],
                ['schwingung', 'Welche Bewegung erzeugt Schall an einer Gitarrensaite?'],
                ['frequenz', 'Welche Groesse bestimmt bei Schall vor allem die Tonhoehe?'],
                ['amplitude', 'Welche Groesse bestimmt bei Schall vor allem die Lautstaerke?'],
                ['ultraschall', 'Wie heisst Schall oberhalb des menschlichen Hoerbereichs?'],
                ['infraschall', 'Wie heisst Schall unterhalb des menschlichen Hoerbereichs?'],
                ['waermeleitung', 'Welche Waermeuebertragung dominiert in Metallen?'],
                ['konvektion', 'Welche Waermeuebertragung erfolgt durch Stroemung in Fluessigkeiten oder Gasen?'],
                ['isolation', 'Wie nennt man Massnahmen, die Waermeuebertragung verringern?'],
                ['thermische ausdehnung', 'Wie nennt man Groesserwerden von Stoffen beim Erwaermen?']
            ]),
            chemie: natwiTopup('Klasse 6 Chemie Rahmenplan', [
                ['filtrat', 'Wie nennt man die Fluessigkeit, die beim Filtrieren durch den Filter laeuft?'],
                ['rueckstand', 'Wie nennt man den Feststoff, der im Filter zurueckbleibt?'],
                ['chromatographie', 'Welches Trennverfahren trennt Farbstoffe nach Wanderungsgeschwindigkeit?'],
                ['destillation', 'Welches Verfahren trennt Fluessigkeiten ueber Verdampfen und Kondensieren?'],
                ['eindampfen', 'Welches Verfahren gewinnt geloesten Feststoff aus einer Loesung?'],
                ['extraktion', 'Wie nennt man Herausloesen eines Stoffes mit geeignetem Loesungsmittel?'],
                ['lackmus', 'Welcher Indikator zeigt saure und basische Loesungen farblich an?'],
                ['indikator', 'Wie nennt man einen Stoff, der pH-Aenderungen durch Farbe zeigt?'],
                ['sauer', 'Wie nennt man eine Loesung mit pH kleiner 7?'],
                ['basisch', 'Wie nennt man eine Loesung mit pH groesser 7?'],
                ['neutral', 'Wie nennt man eine Loesung mit pH 7?'],
                ['stoffeigenschaft', 'Wie nennt man Dichte, Loeslichkeit oder Schmelztemperatur allgemein?'],
                ['nachweisreaktion', 'Wie nennt man eine Reaktion, mit der man einen Stoff erkennt?'],
                ['kalkwasser', 'Womit kann man Kohlenstoffdioxid im Schulversuch nachweisen?'],
                ['branddreieck', 'Welches Modell nennt Brennstoff, Sauerstoff und Zuendtemperatur?'],
                ['zuendtemperatur', 'Welche Temperatur muss ein Brennstoff zum Entzuenden erreichen?'],
                ['loeslichkeit', 'Welche Eigenschaft bestimmt, wie viel Stoff sich in Wasser loest?']
            ]),
            biologie: natwiTopup('Klasse 6 Biologie Rahmenplan', [
                ['wirbelsaeule', 'Welche Knochenkette stuetzt den Ruecken von Wirbeltieren?'],
                ['sehne', 'Welche Struktur verbindet Muskel und Knochen?'],
                ['baender', 'Welche Strukturen stabilisieren Gelenke zwischen Knochen?'],
                ['bronchien', 'Wie heissen die Verzweigungen der Luftroehre in der Lunge?'],
                ['lungenblaeschen', 'Wo findet der Gasaustausch in der Lunge statt?'],
                ['sauerstoff', 'Welcher Stoff wird beim Atmen aus der Luft aufgenommen?'],
                ['kohlenstoffdioxid', 'Welcher Stoff wird beim Ausatmen vermehrt abgegeben?'],
                ['speiseroehre', 'Welche Roehre transportiert Nahrung vom Mund zum Magen?'],
                ['duenndarm', 'Wo werden die meisten Naehrstoffe aufgenommen?'],
                ['dickdarm', 'Welcher Darmabschnitt entzieht dem Nahrungsbrei viel Wasser?'],
                ['omnivore', 'Wie nennt man Tiere, die Pflanzen und Tiere fressen?'],
                ['herbivore', 'Wie nennt man reine Pflanzenfresser?'],
                ['carnivore', 'Wie nennt man Fleischfresser?'],
                ['lebensraum', 'Wie nennt man den Ort, an dem eine Art lebt?'],
                ['anpassung', 'Wie nennt man ein Merkmal, das zum Lebensraum passt?'],
                ['winterschlaf', 'Welche Strategie senkt Stoffwechsel und Aktivitaet im Winter stark?']
            ])
        },
        k7: {
            physik: natwiTopup('Klasse 7 Physik Rahmenplan', [
                ['40', 'Berechne $s$ in m: $v=8\\,\\text{m/s}$, $t=5\\,\\text{s}$.'],
                ['12', 'Berechne $v$ in m/s: $s=96\\,\\text{m}$, $t=8\\,\\text{s}$.'],
                ['9', 'Berechne $t$ in s: $s=72\\,\\text{m}$, $v=8\\,\\text{m/s}$.'],
                ['2', 'Berechne $\\rho$ in g/cm$^3$: $m=180\\,\\text{g}$, $V=90\\,\\text{cm}^3$.'],
                ['120', 'Berechne $m$ in g: $\\rho=3\\,\\text{g/cm}^3$, $V=40\\,\\text{cm}^3$.'],
                ['30', 'Berechne $F$ in N: $m=6\\,\\text{kg}$, $a=5\\,\\text{m/s}^2$.'],
                ['5', 'Berechne $a$ in m/s$^2$: $F=45\\,\\text{N}$, $m=9\\,\\text{kg}$.'],
                ['kraftmesser', 'Welches Messgeraet misst Kraefte?'],
                ['newton', 'Welche Einheit hat die Kraft?'],
                ['kilogramm', 'Welche SI-Einheit hat die Masse?'],
                ['meter', 'Welche SI-Einheit hat die Laenge?'],
                ['sekunde', 'Welche SI-Einheit hat die Zeit?'],
                ['gleichfoermig', 'Wie nennt man Bewegung mit konstanter Geschwindigkeit?'],
                ['beschleunigung', 'Welche Groesse beschreibt Aenderung der Geschwindigkeit pro Zeit?'],
                ['traegheit', 'Welche Eigenschaft laesst Koerper ihren Bewegungszustand beibehalten?'],
                ['reibung', 'Welche Kraft wirkt der Bewegung zwischen Beruehrungsflaechen entgegen?'],
                ['schwerpunkt', 'Wie nennt man den Punkt, an dem man die Gewichtskraft angreifen laesst?']
            ]),
            chemie: natwiTopup('Klasse 7 Chemie Rahmenplan', [
                ['atom', 'Wie nennt man das kleinste Teilchen eines Elements?'],
                ['molekuel', 'Wie nennt man ein Teilchen aus mindestens zwei verbundenen Atomen?'],
                ['element', 'Wie nennt man einen Reinstoff aus nur einer Atomart?'],
                ['verbindung', 'Wie nennt man einen Reinstoff aus mehreren Atomarten in festem Verhaeltnis?'],
                ['reaktion', 'Wie nennt man Stoffumwandlung mit neuen Stoffen?'],
                ['edukte', 'Wie nennt man Ausgangsstoffe einer chemischen Reaktion?'],
                ['produkte', 'Wie nennt man entstehende Stoffe einer chemischen Reaktion?'],
                ['exotherm', 'Wie nennt man eine Reaktion, die Energie abgibt?'],
                ['endotherm', 'Wie nennt man eine Reaktion, die Energie aufnimmt?'],
                ['aktivierungsenergie', 'Welche Energie braucht eine Reaktion zum Starten?'],
                ['katalysator', 'Welcher Stoff senkt Aktivierungsenergie und wird nicht verbraucht?'],
                ['h2o', 'Welche Summenformel hat Wasser?'],
                ['co2', 'Welche Summenformel hat Kohlenstoffdioxid?'],
                ['o2', 'Welche Summenformel hat Sauerstoffgas?'],
                ['n2', 'Welche Summenformel hat Stickstoffgas?'],
                ['nacl', 'Welche Formel hat Kochsalz?'],
                ['massenerhaltung', 'Welches Gesetz sagt, dass Masse bei chemischen Reaktionen erhalten bleibt?']
            ]),
            biologie: natwiTopup('Klasse 7 Biologie Rahmenplan', [
                ['zellkern', 'Welches Zellorganell enthaelt die Erbinformation?'],
                ['zellmembran', 'Welche Struktur grenzt jede Zelle nach aussen ab?'],
                ['cytoplasma', 'Wie nennt man die fluessige Grundsubstanz der Zelle?'],
                ['mitochondrien', 'Welche Zellorganellen stellen viel nutzbare Energie bereit?'],
                ['vakuole', 'Welcher grosse Speicherraum ist typisch fuer Pflanzenzellen?'],
                ['chloroplasten', 'Welche Organellen betreiben Fotosynthese?'],
                ['zellwand', 'Welche feste Struktur gibt Pflanzenzellen Form und Stabilitaet?'],
                ['mikroskop', 'Welches Geraet vergroessert kleine biologische Strukturen?'],
                ['produzenten', 'Welche Organismen stellen im Oekosystem Biomasse aus Lichtenergie her?'],
                ['konsumenten', 'Welche Organismen ernaehren sich von anderen Lebewesen?'],
                ['destruenten', 'Welche Organismen zersetzen tote organische Stoffe?'],
                ['nahrungsnetz', 'Wie nennt man mehrere verknuepfte Nahrungsketten?'],
                ['biotop', 'Wie nennt man den unbelebten Lebensraum einer Lebensgemeinschaft?'],
                ['biozoenose', 'Wie nennt man die Lebensgemeinschaft in einem Biotop?'],
                ['oekosystem', 'Wie nennt man Biotop und Biozoenose zusammen?'],
                ['konkurrenz', 'Wie nennt man Wettbewerb um begrenzte Ressourcen?']
            ])
        },
        k8: {
            physik: natwiTopup('Klasse 8 Physik Rahmenplan', [
                ['4', 'Berechne $I$ in A: $U=20\\,\\text{V}$, $R=5\\,\\Omega$.'],
                ['36', 'Berechne $U$ in V: $R=12\\,\\Omega$, $I=3\\,\\text{A}$.'],
                ['6', 'Berechne $R$ in Ohm: $U=18\\,\\text{V}$, $I=3\\,\\text{A}$.'],
                ['60', 'Berechne $P$ in W: $U=15\\,\\text{V}$, $I=4\\,\\text{A}$.'],
                ['120', 'Berechne $W$ in J: $F=30\\,\\text{N}$, $s=4\\,\\text{m}$.'],
                ['20', 'Berechne $P$ in W: $W=400\\,\\text{J}$, $t=20\\,\\text{s}$.'],
                ['reihenschaltung', 'In welcher Schaltung ist die Stromstaerke durch alle Bauteile gleich?'],
                ['parallelschaltung', 'In welcher Schaltung liegt an jedem Zweig dieselbe Spannung?'],
                ['amperemeter', 'Welches Messgeraet misst die Stromstaerke?'],
                ['voltmeter', 'Welches Messgeraet misst die Spannung?'],
                ['ohm', 'Welche Einheit hat der elektrische Widerstand?'],
                ['watt', 'Welche Einheit hat die Leistung?'],
                ['joule', 'Welche Einheit hat Arbeit und Energie?'],
                ['kurzschluss', 'Wie heisst ein sehr kleiner Widerstand direkt zwischen den Polen?'],
                ['sicherung', 'Welches Bauteil schuetzt vor zu grosser Stromstaerke?'],
                ['energieumwandlung', 'Was geschieht in einem Motor mit elektrischer Energie?'],
                ['wirkungsgrad', 'Welche Groesse vergleicht nutzbare Energie mit zugefuehrter Energie?']
            ]),
            chemie: natwiTopup('Klasse 8 Chemie Rahmenplan', [
                ['proton', 'Welches positiv geladene Teilchen sitzt im Atomkern?'],
                ['neutron', 'Welches ungeladene Teilchen sitzt im Atomkern?'],
                ['elektron', 'Welches negativ geladene Teilchen befindet sich in der Atomhuelle?'],
                ['ordnungszahl', 'Welche Zahl gibt die Protonenzahl eines Elements an?'],
                ['massenzahl', 'Welche Zahl ist Summe aus Protonen und Neutronen?'],
                ['isotop', 'Wie nennt man Atome eines Elements mit unterschiedlicher Neutronenzahl?'],
                ['gruppe', 'Wie nennt man eine senkrechte Spalte im Periodensystem?'],
                ['periode', 'Wie nennt man eine waagerechte Zeile im Periodensystem?'],
                ['edelgase', 'Welche Gruppe ist besonders reaktionstraege?'],
                ['alkalimetalle', 'Welche Gruppe enthaelt Lithium, Natrium und Kalium?'],
                ['halogene', 'Welche Gruppe enthaelt Fluor, Chlor und Brom?'],
                ['ion', 'Wie nennt man ein geladenes Teilchen?'],
                ['kation', 'Wie nennt man ein positiv geladenes Ion?'],
                ['anion', 'Wie nennt man ein negativ geladenes Ion?'],
                ['ionenbindung', 'Welche Bindung entsteht durch Anziehung entgegengesetzt geladener Ionen?'],
                ['elektronenpaarbindung', 'Welche Bindung beruht auf gemeinsam genutzten Elektronenpaaren?'],
                ['metallbindung', 'Welche Bindung erklaert gute elektrische Leitfaehigkeit von Metallen?']
            ]),
            biologie: natwiTopup('Klasse 8 Biologie Rahmenplan', [
                ['zwerchfell', 'Welcher Muskel trennt Brust- und Bauchraum und hilft beim Atmen?'],
                ['diffusion', 'Welcher Transportvorgang bewegt Sauerstoff aus den Alveolen ins Blut?'],
                ['kapillaren', 'Wie heissen die feinsten Blutgefaesse?'],
                ['arterien', 'Welche Gefaesse fuehren Blut vom Herzen weg?'],
                ['venen', 'Welche Gefaesse fuehren Blut zum Herzen hin?'],
                ['herzvorhof', 'Wie nennt man eine obere Herzkammer?'],
                ['herzkammer', 'Wie nennt man eine untere Herzhoehle?'],
                ['plasma', 'Wie heisst der fluessige Anteil des Blutes?'],
                ['leukozyten', 'Welche Blutzellen gehoeren zur Immunabwehr?'],
                ['thrombozyten', 'Welche Blutbestandteile helfen bei der Gerinnung?'],
                ['amylase', 'Welches Enzym beginnt im Mund mit Staerkespaltung?'],
                ['galle', 'Welche Fluessigkeit hilft bei der Fettverdauung?'],
                ['resorption', 'Wie nennt man Aufnahme von Naehrstoffen ins Blut?'],
                ['peristaltik', 'Wie nennt man wellenfoermige Darmbewegungen?'],
                ['glucose', 'Welcher einfache Zucker ist wichtiger Energietraeger?'],
                ['zellatmung', 'Welcher Prozess gewinnt Energie aus Glucose und Sauerstoff?']
            ])
        },
        k9: {
            physik: natwiTopup('Klasse 9 Physik Rahmenplan', [
                ['50', 'Berechne $F$ in N: $m=10\\,\\text{kg}$, $a=5\\,\\text{m/s}^2$.'],
                ['4', 'Berechne $a$ in m/s$^2$: $F=28\\,\\text{N}$, $m=7\\,\\text{kg}$.'],
                ['250', 'Berechne $E_\\text{kin}$ in J: $m=5\\,\\text{kg}$, $v=10\\,\\text{m/s}$.'],
                ['800', 'Berechne $E_\\text{pot}$ in J: $m=8\\,\\text{kg}$, $h=10\\,\\text{m}$, $g\\approx10\\,\\text{N/kg}$.'],
                ['1000', 'Berechne $p$ in Pa: $F=200\\,\\text{N}$, $A=0{,}2\\,\\text{m}^2$.'],
                ['20', 'Berechne $Q$ in C: $I=4\\,\\text{A}$, $t=5\\,\\text{s}$.'],
                ['induktion', 'Wie nennt man Erzeugung einer Spannung durch Aenderung eines Magnetfeldes?'],
                ['lorentzkraft', 'Welche Kraft wirkt auf bewegte Ladungen im Magnetfeld?'],
                ['generator', 'Welche Maschine wandelt Bewegungsenergie in elektrische Energie?'],
                ['transformator', 'Welches Geraet veraendert Wechselspannungen?'],
                ['wechselstrom', 'Welche Stromart aendert periodisch ihre Richtung?'],
                ['gleichstrom', 'Welche Stromart fliesst dauerhaft in eine Richtung?'],
                ['energieerhaltung', 'Welches Prinzip besagt, dass Energie nicht verloren geht?'],
                ['impuls', 'Welche Groesse ist Produkt aus Masse und Geschwindigkeit?'],
                ['druck', 'Welche Groesse beschreibt Kraft pro Flaeche?'],
                ['auftrieb', 'Welche Kraft wirkt in Fluessigkeiten nach oben?'],
                ['archimedes', 'Welches Prinzip erklaert den Auftrieb durch verdraengte Fluessigkeit?']
            ]),
            chemie: natwiTopup('Klasse 9 Chemie Rahmenplan', [
                ['hydroniumion', 'Welches Ion ist typisch fuer saure waessrige Loesungen?'],
                ['hydroxidion', 'Welches Ion ist typisch fuer basische waessrige Loesungen?'],
                ['neutralisation', 'Wie nennt man Reaktion von Saeure und Base zu Salz und Wasser?'],
                ['salz', 'Welcher Stofftyp entsteht aus Kationen und Anionen?'],
                ['indikatorpapier', 'Womit kann man den pH-Bereich schnell abschaetzen?'],
                ['exotherm', 'Wie ist die Neutralisation haeufig energetisch einzuordnen?'],
                ['oxidation', 'Wie nennt man Elektronenabgabe?'],
                ['reduktion', 'Wie nennt man Elektronenaufnahme?'],
                ['redoxreaktion', 'Wie nennt man gekoppelte Oxidation und Reduktion?'],
                ['edukte', 'Wie nennt man Stoffe links vom Reaktionspfeil?'],
                ['produkte', 'Wie nennt man Stoffe rechts vom Reaktionspfeil?'],
                ['elektrolyse', 'Wie nennt man Zerlegung eines Stoffes durch elektrischen Strom?'],
                ['elektrode', 'Wie nennt man einen Leiter, an dem Strom in eine Loesung ein- oder austritt?'],
                ['anode', 'An welcher Elektrode findet Oxidation statt?'],
                ['kathode', 'An welcher Elektrode findet Reduktion statt?'],
                ['korrosion', 'Wie nennt man langsame Zerstoerung von Metallen durch chemische Reaktionen?'],
                ['rost', 'Wie nennt man das Korrosionsprodukt von Eisen in feuchter Luft?']
            ]),
            biologie: natwiTopup('Klasse 9 Biologie Rahmenplan', [
                ['chromosom', 'Wie nennt man verpackte DNA-Struktur im Zellkern?'],
                ['allel', 'Wie nennt man eine Variante eines Gens?'],
                ['genotyp', 'Wie nennt man die genetische Ausstattung eines Merkmals?'],
                ['phaenotyp', 'Wie nennt man das beobachtbare Erscheinungsbild?'],
                ['dominant', 'Wie nennt man ein Allel, das sich im heterozygoten Zustand auspraegt?'],
                ['rezessiv', 'Wie nennt man ein Allel, das im heterozygoten Zustand verdeckt bleibt?'],
                ['homozygot', 'Wie nennt man zwei gleiche Allele?'],
                ['heterozygot', 'Wie nennt man zwei unterschiedliche Allele?'],
                ['mutation', 'Wie nennt man eine dauerhafte Veraenderung der Erbinformation?'],
                ['rekombination', 'Wie nennt man neue Kombination von Erbanlagen bei sexueller Fortpflanzung?'],
                ['selektion', 'Welcher Evolutionsfaktor beguenstigt besser angepasste Merkmale?'],
                ['fitness', 'Welche Groesse beschreibt Fortpflanzungserfolg in der Evolution?'],
                ['fossil', 'Wie nennt man erhaltene Reste oder Spuren frueherer Lebewesen?'],
                ['homologie', 'Wie nennt man Aehnlichkeit durch gemeinsamen Ursprung?'],
                ['analogie', 'Wie nennt man Aehnlichkeit durch gleiche Funktion ohne nahen Ursprung?'],
                ['art', 'Wie nennt man Gruppe von Lebewesen, die fruchtbare Nachkommen erzeugen koennen?']
            ])
        },
        k10: {
            physik: natwiTopup('Klasse 10 Physik Rahmenplan', [
                ['alpha', 'Welche radioaktive Strahlung besteht aus Heliumkernen?'],
                ['beta', 'Welche radioaktive Strahlung besteht aus schnellen Elektronen oder Positronen?'],
                ['gamma', 'Welche radioaktive Strahlung ist elektromagnetisch und sehr energiereich?'],
                ['geigerzaehler', 'Welches Geraet weist ionisierende Strahlung nach?'],
                ['halbwertszeit', 'Welche Zeit halbiert die Anzahl instabiler Kerne?'],
                ['12.5', 'Nach drei Halbwertszeiten bleiben wie viel Prozent einer Probe?'],
                ['kernspaltung', 'Wie nennt man Zerlegung schwerer Atomkerne in leichtere Kerne?'],
                ['kernfusion', 'Wie nennt man Verschmelzung leichter Atomkerne?'],
                ['brechung', 'Wie nennt man Richtungswechsel von Licht beim Medienwechsel?'],
                ['totalreflexion', 'Wie nennt man vollstaendige Reflexion ab einem Grenzwinkel?'],
                ['brennweite', 'Welche Strecke liegt zwischen Linse und Brennpunkt?'],
                ['dioptrie', 'Welche Einheit verwendet man fuer die Brechkraft einer Linse?'],
                ['2', 'Berechne $\\lambda$ in m: $c=3\\cdot10^8\\,\\text{m/s}$, $f=1{,}5\\cdot10^8\\,\\text{Hz}$.'],
                ['60', 'Berechne $f$ in Hz: $c=300\\,\\text{m/s}$, $\\lambda=5\\,\\text{m}$.'],
                ['photoeffekt', 'Welcher Effekt zeigt Licht als Teilchenstrom von Photonen?'],
                ['rutherford', 'Welches Atommodell entstand aus dem Streuversuch mit Goldfolie?'],
                ['bohr', 'Welches Atommodell nutzt Elektronenschalen mit bestimmten Energien?']
            ]),
            chemie: natwiTopup('Klasse 10 Chemie Rahmenplan', [
                ['kohlenwasserstoff', 'Wie nennt man eine Verbindung nur aus Kohlenstoff und Wasserstoff?'],
                ['alkan', 'Welche Stoffklasse besitzt nur C-C-Einfachbindungen?'],
                ['alken', 'Welche Stoffklasse besitzt mindestens eine C-C-Doppelbindung?'],
                ['alkin', 'Welche Stoffklasse besitzt mindestens eine C-C-Dreifachbindung?'],
                ['methan', 'Wie heisst CH$_4$?'],
                ['ethan', 'Wie heisst C$_2$H$_6$?'],
                ['propan', 'Wie heisst C$_3$H$_8$?'],
                ['butan', 'Wie heisst C$_4$H$_{10}$?'],
                ['hydroxylgruppe', 'Welche funktionelle Gruppe kennzeichnet Alkohole?'],
                ['carboxylgruppe', 'Welche funktionelle Gruppe kennzeichnet Carbonsaeuren?'],
                ['ester', 'Welche Stoffklasse entsteht aus Carbonsaeure und Alkohol?'],
                ['polymer', 'Wie nennt man ein Riesenmolekuel aus vielen Wiederholungseinheiten?'],
                ['monomer', 'Wie nennt man einen kleinen Baustein fuer Polymere?'],
                ['kunststoff', 'Wie nennt man ein technisches Polymermaterial allgemein?'],
                ['verbrennung', 'Welche Reaktion von Kohlenwasserstoffen mit Sauerstoff liefert CO$_2$ und Wasser?'],
                ['substitution', 'Wie nennt man Austausch eines Atoms oder einer Gruppe im Molekuel?'],
                ['addition', 'Wie nennt man Anlagerung an eine Doppelbindung?']
            ]),
            biologie: natwiTopup('Klasse 10 Biologie Rahmenplan', [
                ['nukleotid', 'Wie nennt man einen Baustein der DNA?'],
                ['doppelhelix', 'Welche Raumstruktur besitzt DNA nach Watson und Crick?'],
                ['adenin', 'Welche DNA-Base paart mit Thymin?'],
                ['cytosin', 'Welche DNA-Base paart mit Guanin?'],
                ['replikation', 'Wie nennt man Verdopplung der DNA?'],
                ['codon', 'Wie nennt man ein Basentriplett der mRNA?'],
                ['ribosom', 'An welchem Zellort findet Translation statt?'],
                ['protein', 'Was entsteht bei der Translation aus Aminosaeuren?'],
                ['enzym', 'Wie nennt man ein Protein, das Reaktionen beschleunigt?'],
                ['biodiversitaet', 'Wie nennt man Vielfalt von Genen, Arten und Lebensraeumen?'],
                ['oekosystemdienstleistung', 'Wie nennt man Nutzen von Oekosystemen fuer Menschen?'],
                ['habitat', 'Wie nennt man den Lebensraum einer Art?'],
                ['fragmentierung', 'Wie nennt man Zerschneidung von Lebensraeumen in kleine Teile?'],
                ['renaturierung', 'Wie nennt man Wiederherstellung naturnaher Lebensraeume?'],
                ['monitoring', 'Wie nennt man systematische Beobachtung von Arten oder Lebensraeumen?'],
                ['schutzgebiet', 'Welches Gebiet wird rechtlich zum Erhalt von Natur ausgewiesen?']
            ])
        }
    };

    function withNatwiTopup(base, classId, subject) {
        const byClass = NATWI_TOPUPS[classId] || {};
        const extraByClass = NATWI_EXTRA_V69[classId] || {};
        const frameByClass = NATWI_EXTRA_V70[classId] || {};
        return enrichSchuelerTrainingItems(base.concat(byClass[subject] || [], extraByClass[subject] || [], frameByClass[subject] || []), classId, subject);
    }

    function decimalAnswerFromCents(cents) {
        return (cents / 100).toFixed(2).replace(/0$/, '').replace(/\.0$/, '');
    }

    function decimalQuestionFromCents(cents) {
        return decimalAnswerFromCents(cents).replace('.', ',');
    }

    function mathTask(question, answer, formula, work) {
        const finalAnswer = String(answer);
        return {
            q: question,
            a: finalAnswer,
            f: '<p><strong>Formel/Merksatz.</strong> ' + formula + '</p>',
            s: '<p><strong>Musterloesung.</strong> ' + work + '</p>'
                + '<p><strong>Endergebnis:</strong> <code>' + escapeHtml(finalAnswer) + '</code></p>'
                + '<p class="text-xs text-slate-500 dark:text-slate-400">Quelle: Rahmenlehrplan/KLP Mathematik Sekundarstufe I; schuluebliche SI-Konventionen.</p>'
        };
    }

    function pool_k5_mathe() {
        const items = [];
        for (let idx = 1; idx <= 20; idx += 1) {
            const addend = 35 + idx * 4;
            const factor = (idx % 7) + 2;
            const multiplier = (idx % 5) + 3;
            const product = factor * multiplier;
            items.push(mathTask(
                'Berechne: $' + addend + '+' + factor + '\\cdot ' + multiplier + '$.',
                addend + product,
                'Punktrechnung vor Strichrechnung: zuerst Multiplikation, dann Addition.',
                '$' + factor + '\\cdot ' + multiplier + '=' + product + '$, danach $' + addend + '+' + product + '=' + (addend + product) + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const numeratorA = (idx % 4) + 1;
            const numeratorB = (idx % 3) + 1;
            const denominator = numeratorA + numeratorB + (idx % 5) + 2;
            const sum = numeratorA + numeratorB;
            items.push(mathTask(
                'Addiere ohne zu kuerzen: $\\frac{' + numeratorA + '}{' + denominator + '}+\\frac{' + numeratorB + '}{' + denominator + '}$. Gib den Bruch als a/b ein.',
                sum + '/' + denominator,
                'Gleichnamige Brueche addiert man ueber die Zaehler: $\\frac{a}{n}+\\frac{b}{n}=\\frac{a+b}{n}$.',
                '$' + numeratorA + '+' + numeratorB + '=' + sum + '$, der Nenner bleibt $' + denominator + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const centsA = 120 + idx * 7;
            const centsB = 75 + idx * 6;
            const total = centsA + centsB;
            items.push(mathTask(
                'Berechne in Euro: $' + decimalQuestionFromCents(centsA) + '+' + decimalQuestionFromCents(centsB) + '$.',
                decimalAnswerFromCents(total),
                'Bei Dezimalzahlen Komma unter Komma schreiben; im Eingabefeld ist Punkt oder Komma erlaubt.',
                'In Cent: $' + centsA + '+' + centsB + '=' + total + '$ Cent, also $' + decimalQuestionFromCents(total) + '$ Euro.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const length = idx + 5;
            const width = (idx % 6) + 3;
            const area = length * width;
            items.push(mathTask(
                'Ein Rechteck ist $' + length + '\\,\\text{cm}$ lang und $' + width + '\\,\\text{cm}$ breit. Berechne den Flaecheninhalt in cm$^2$.',
                area,
                'Rechteck: $A=a\\cdot b$.',
                '$A=' + length + '\\cdot ' + width + '=' + area + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const centimeters = 12 + idx * 3;
            const millimeters = centimeters * 10;
            items.push(mathTask(
                'Wandle $' + centimeters + '\\,\\text{cm}$ in mm um. Gib nur die Zahl ein.',
                millimeters,
                'Laengeneinheiten: $1\\,\\text{cm}=10\\,\\text{mm}$.',
                '$' + centimeters + '\\cdot 10=' + millimeters + '$.'
            ));
        }
        return items;
    }

    function pool_k6_mathe() {
        const items = [];
        const percentValues = [5, 10, 20, 25, 40, 50, 60, 75, 80, 90];
        for (let idx = 1; idx <= 20; idx += 1) {
            const denominator = (idx % 5) + 2;
            const numerator = Math.min(denominator - 1, (idx % denominator) + 1);
            const base = denominator * (idx + 6);
            const result = base * numerator / denominator;
            items.push(mathTask(
                'Berechne $\\frac{' + numerator + '}{' + denominator + '}$ von $' + base + '$.',
                result,
                'Bruchteil: $\\frac{z}{n}$ von $G$ ist $G:n\\cdot z$.',
                '$' + base + ':' + denominator + '=' + (base / denominator) + '$ und $' + (base / denominator) + '\\cdot ' + numerator + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const percent = percentValues[(idx - 1) % percentValues.length];
            const base = 100 + idx * 20;
            const result = base * percent / 100;
            items.push(mathTask(
                'Berechne $' + percent + '\\%$ von $' + base + '$.',
                result,
                'Prozentwert: $W=\\frac{p}{100}\\cdot G$.',
                '$W=' + percent + ':100\\cdot ' + base + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const left = idx - 16;
            const right = (idx % 9) - 4;
            const result = left - right;
            items.push(mathTask(
                'Berechne mit ganzen Zahlen: $(' + left + ')-(' + right + ')$.',
                result,
                'Subtrahieren einer Zahl bedeutet Addieren der Gegenzahl.',
                '$(' + left + ')-(' + right + ')=' + left + '+(' + (-right) + ')=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const coefficient = (idx % 6) + 2;
            const solution = idx + 3;
            const offset = (idx % 8) + 1;
            const right = coefficient * solution + offset;
            items.push(mathTask(
                'Loese nach $x$: $' + coefficient + 'x+' + offset + '=' + right + '$. Gib nur $x$ ein.',
                solution,
                'Lineare Gleichung: erst umkehren, dann durch den Faktor teilen.',
                '$' + right + '-' + offset + '=' + (right - offset) + '$ und $(' + (right - offset) + '):' + coefficient + '=' + solution + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const base = idx + 6;
            const height = ((idx % 5) + 2) * 2;
            const area = base * height / 2;
            items.push(mathTask(
                'Ein Dreieck hat Grundseite $' + base + '\\,\\text{cm}$ und Hoehe $' + height + '\\,\\text{cm}$. Berechne die Flaeche in cm$^2$.',
                area,
                'Dreieck: $A=\\frac{g\\cdot h}{2}$.',
                '$A=' + base + '\\cdot ' + height + ':2=' + area + '$.'
            ));
        }
        return items;
    }

    function pool_k7_mathe() {
        const items = [];
        for (let idx = 1; idx <= 20; idx += 1) {
            const coefficient = (idx % 7) + 3;
            const solution = idx + 2;
            const offset = (idx % 9) + 4;
            const right = coefficient * solution - offset;
            items.push(mathTask(
                'Loese nach $x$: $' + coefficient + 'x-' + offset + '=' + right + '$. Gib nur $x$ ein.',
                solution,
                'Aequivalenzumformungen veraendern beide Seiten gleich.',
                'Addiere $' + offset + '$: $' + coefficient + 'x=' + (right + offset) + '$. Teile durch $' + coefficient + '$: $x=' + solution + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const unitCount = (idx % 5) + 2;
            const unitPrice = (idx % 6) + 3;
            const targetCount = unitCount + (idx % 7) + 2;
            const result = unitPrice * targetCount;
            items.push(mathTask(
                unitCount + ' Hefte kosten ' + (unitCount * unitPrice) + ' Euro. Was kosten ' + targetCount + ' Hefte bei proportionalem Preis?',
                result,
                'Proportionalitaet: erst Preis pro Stueck bestimmen, dann multiplizieren.',
                'Ein Heft kostet $(' + (unitCount * unitPrice) + ':' + unitCount + ')=' + unitPrice + '$ Euro. $' + targetCount + '\\cdot ' + unitPrice + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const base = 200 + idx * 10;
            const percent = (idx % 5 + 1) * 5;
            const result = base + base * percent / 100;
            items.push(mathTask(
                'Ein Preis von ' + base + ' Euro steigt um ' + percent + ' %. Berechne den neuen Preis.',
                result,
                'Erhoehung: neuer Wert $G_\\text{neu}=G\\cdot(1+\\frac{p}{100})$.',
                '$' + percent + '\\%$ von $' + base + '$ sind $' + (base * percent / 100) + '$. Neuer Preis: $' + base + '+' + (base * percent / 100) + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const slope = (idx % 6) + 1;
            const intercept = (idx % 9) - 4;
            const value = idx + 1;
            const result = slope * value + intercept;
            items.push(mathTask(
                'Gegeben ist $y=' + slope + 'x' + (intercept >= 0 ? '+' + intercept : intercept) + '$. Berechne $y$ fuer $x=' + value + '$.',
                result,
                'Lineare Funktion: $y=mx+b$.',
                '$y=' + slope + '\\cdot ' + value + (intercept >= 0 ? '+' + intercept : intercept) + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const coefficientA = idx + 2;
            const coefficientB = (idx % 8) + 3;
            const sum = coefficientA + coefficientB;
            items.push(mathTask(
                'Fasse zusammen: $' + coefficientA + 'x+' + coefficientB + 'x$. Gib das Ergebnis ohne Leerzeichen ein.',
                sum + 'x',
                'Gleichartige Terme darf man ueber ihre Koeffizienten addieren.',
                '$(' + coefficientA + '+' + coefficientB + ')x=' + sum + 'x$.'
            ));
        }
        return items;
    }

    function pool_k8_mathe() {
        const items = [];
        const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [7, 24, 25], [8, 15, 17]];
        for (let idx = 1; idx <= 20; idx += 1) {
            const slope = (idx % 7) + 1;
            const x1 = idx;
            const y1 = (idx % 5) + 2;
            const x2 = x1 + 3;
            const y2 = y1 + slope * 3;
            items.push(mathTask(
                'Bestimme die Steigung der Geraden durch $P(' + x1 + '|' + y1 + ')$ und $Q(' + x2 + '|' + y2 + ')$.',
                slope,
                'Steigung: $m=\\frac{y_2-y_1}{x_2-x_1}$.',
                '$m=(' + y2 + '-' + y1 + '):(' + x2 + '-' + x1 + ')=' + (y2 - y1) + ':3=' + slope + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const solutionX = idx + 2;
            const solutionY = (idx % 9) + 1;
            const sum = solutionX + solutionY;
            const difference = solutionX - solutionY;
            items.push(mathTask(
                'Loese das Gleichungssystem $x+y=' + sum + '$ und $x-y=' + difference + '$. Gib nur $x$ ein.',
                solutionX,
                'Additionsverfahren: Addiere beide Gleichungen, dann entsteht $2x$.',
                '$(' + sum + ')+(' + difference + ')=2x=' + (sum + difference) + '$, also $x=' + solutionX + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const triple = triples[(idx - 1) % triples.length];
            const scale = Math.floor((idx - 1) / triples.length) + 1;
            const sideA = triple[0] * scale;
            const sideB = triple[1] * scale;
            const hypotenuse = triple[2] * scale;
            items.push(mathTask(
                'Ein rechtwinkliges Dreieck hat Katheten $' + sideA + '$ und $' + sideB + '$. Berechne die Hypotenuse.',
                hypotenuse,
                'Satz des Pythagoras: $a^2+b^2=c^2$.',
                '$c=\\sqrt{' + sideA + '^2+' + sideB + '^2}=' + hypotenuse + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const base = (idx % 5) + 2;
            const exponentA = (idx % 4) + 2;
            const exponentB = (idx % 3) + 1;
            const result = exponentA + exponentB;
            items.push(mathTask(
                'Vereinfache $' + base + '^{' + exponentA + '}\\cdot ' + base + '^{' + exponentB + '}$. Gib nur den neuen Exponenten ein.',
                result,
                'Potenzregel: $a^m\\cdot a^n=a^{m+n}$.',
                'Die Basis ist gleich, deshalb $' + exponentA + '+' + exponentB + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const value = (idx % 9) + 2;
            const result = value * value;
            items.push(mathTask(
                'Bestimme den konstanten Term von $(x+' + value + ')^2$.',
                result,
                'Binomische Formel: $(x+a)^2=x^2+2ax+a^2$.',
                'Der konstante Term ist $a^2=' + value + '^2=' + result + '$.'
            ));
        }
        return items;
    }

    function pool_k9_mathe() {
        const items = [];
        const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]];
        for (let idx = 1; idx <= 20; idx += 1) {
            const rootA = (idx % 8) + 1;
            const rootB = rootA + (idx % 5) + 1;
            items.push(mathTask(
                'Die Gleichung $(x-' + rootA + ')(x-' + rootB + ')=0$ hat zwei Nullstellen. Gib die groessere Nullstelle ein.',
                rootB,
                'Nullproduktregel: Ein Produkt ist null, wenn ein Faktor null ist.',
                '$x-' + rootA + '=0$ oder $x-' + rootB + '=0$. Die groessere Nullstelle ist $' + rootB + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const triple = triples[(idx - 1) % triples.length];
            const scale = Math.floor((idx - 1) / triples.length) + 1;
            const opposite = triple[0] * scale;
            const hypotenuse = triple[2] * scale;
            items.push(mathTask(
                'In einem rechtwinkligen Dreieck gilt zur Winkelposition $\\sin(\\alpha)=\\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$. Gegenkathete $=' + opposite + '$, Hypotenuse $=' + hypotenuse + '$. Gib $\\sin(\\alpha)$ als Bruch a/b ein.',
                opposite + '/' + hypotenuse,
                'Trigonometrie: $\\sin(\\alpha)=\\frac{Gegenkathete}{Hypotenuse}$.',
                '$\\sin(\\alpha)=' + opposite + '/' + hypotenuse + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const red = (idx % 6) + 2;
            const blue = (idx % 5) + 3;
            const total = red + blue;
            items.push(mathTask(
                'In einer Urne liegen ' + red + ' rote und ' + blue + ' blaue Kugeln. Wie gross ist $P(\\text{rot})$? Gib als Bruch a/b ein.',
                red + '/' + total,
                'Laplace-Wahrscheinlichkeit: $P=\\frac{guenstige}{moegliche}$.',
                'Guenstig sind $' + red + '$ rote Kugeln, moeglich sind $' + total + '$ Kugeln.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const original = idx + 6;
            const scale = (idx % 4) + 2;
            const result = original * scale;
            items.push(mathTask(
                'Eine Strecke von ' + original + ' cm wird im Massstab $' + scale + ':1$ vergroessert. Wie lang ist die Bildstrecke in cm?',
                result,
                'Aehnlichkeit: Laengen werden mit dem Massstabsfaktor multipliziert.',
                '$' + original + '\\cdot ' + scale + '=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const center = idx + 5;
            const values = [center - 2, center - 1, center, center + 1, center + 2];
            items.push(mathTask(
                'Berechne den Mittelwert der Werte ' + values.join(', ') + '.',
                center,
                'Mittelwert: Summe der Werte geteilt durch Anzahl der Werte.',
                'Die Werte sind symmetrisch um $' + center + '$; die Summe ist $' + (center * 5) + '$, geteilt durch $5$ ergibt $' + center + '$.'
            ));
        }
        return items;
    }

    function pool_k10_mathe() {
        const items = [];
        const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41]];
        for (let idx = 1; idx <= 20; idx += 1) {
            const start = idx + 4;
            const factor = (idx % 3) + 2;
            const years = (idx % 4) + 2;
            const result = start * Math.pow(factor, years);
            items.push(mathTask(
                'Eine Groesse startet bei ' + start + ' und wird jedes Jahr mit ' + factor + ' multipliziert. Berechne den Wert nach ' + years + ' Jahren.',
                result,
                'Exponentielles Wachstum: $N(t)=N_0\\cdot q^t$.',
                '$N=' + start + '\\cdot ' + factor + '^{' + years + '}=' + result + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const base = (idx % 4) + 2;
            const exponent = (idx % 5) + 2;
            const value = Math.pow(base, exponent);
            items.push(mathTask(
                'Loese $' + base + '^x=' + value + '$. Gib nur $x$ ein.',
                exponent,
                'Gleiche Basis vergleichen: $a^x=a^n \\Rightarrow x=n$.',
                '$' + value + '=' + base + '^{' + exponent + '}$, also $x=' + exponent + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const triple = triples[(idx - 1) % triples.length];
            const scale = Math.floor((idx - 1) / triples.length) + 1;
            const adjacent = triple[1] * scale;
            const hypotenuse = triple[2] * scale;
            items.push(mathTask(
                'In einem rechtwinkligen Dreieck gilt $\\cos(\\alpha)=\\frac{\\text{Ankathete}}{\\text{Hypotenuse}}$. Ankathete $=' + adjacent + '$, Hypotenuse $=' + hypotenuse + '$. Gib als Bruch a/b ein.',
                adjacent + '/' + hypotenuse,
                'Trigonometrie: $\\cos(\\alpha)=\\frac{Ankathete}{Hypotenuse}$.',
                '$\\cos(\\alpha)=' + adjacent + '/' + hypotenuse + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const radius = (idx % 8) + 2;
            const height = (idx % 6) + 3;
            const factor = radius * radius * height;
            items.push(mathTask(
                'Ein Zylinder hat Radius $' + radius + '$ und Hoehe $' + height + '$. Das Volumen ist $V=k\\pi$. Gib $k$ ein.',
                factor,
                'Zylinder: $V=\\pi r^2h$.',
                '$k=r^2h=' + radius + '^2\\cdot ' + height + '=' + factor + '$.'
            ));
        }
        for (let idx = 1; idx <= 20; idx += 1) {
            const rootA = (idx % 7) + 1;
            const rootB = rootA + (idx % 6) + 2;
            const sum = rootA + rootB;
            const product = rootA * rootB;
            items.push(mathTask(
                'Die quadratische Gleichung $x^2-' + sum + 'x+' + product + '=0$ hat zwei positive Loesungen. Gib die kleinere Loesung ein.',
                rootA,
                'Faktorisieren: $x^2-(a+b)x+ab=(x-a)(x-b)$.',
                'Hier gilt $a+b=' + sum + '$ und $ab=' + product + '$. Die kleinere Loesung ist $' + rootA + '$.'
            ));
        }
        return items;
    }

    function pool_k5_physik() {
        return withNatwiTopup([
            { q: 'Welcher Pol eines Magneten zieht den Nordpol eines anderen Magneten an?', a: 'sued' },
            { q: 'Wie nennt man die unsichtbaren Linien um einen Magneten, an denen sich Eisenfeilspaene ausrichten?', a: 'feldlinien' },
            { q: 'Aus welchem Material besteht der Magnetkern der Erde hauptsaechlich?', a: 'eisen' },
            { q: 'Welche drei Bauteile braucht ein einfacher Stromkreis (mind. einer)? Antwort: ___quelle.', a: 'spannung' },
            { q: 'Wie nennt man einen Stoff, der Strom gut leitet (Stichwort)?', a: 'leiter' },
            { q: 'Wie nennt man einen Stoff, der den Strom nicht leitet (Stichwort)?', a: 'isolator' },
            { q: 'Was entsteht, wenn ein lichtundurchlaessiger Koerper im Lichtweg steht?', a: 'schatten' },
            { q: 'Wie nennt man eine Lichtquelle, die selbst leuchtet (Beispiel Sonne, Lampe)?', a: 'selbstleuchter' },
            { q: 'Bei welcher Temperatur (in $^\\circ$C) schmilzt Eis bei Normaldruck?', a: '0' },
            { q: 'Bei welcher Temperatur (in $^\\circ$C) siedet Wasser bei Normaldruck?', a: '100' }
        ], 'k5', 'physik');
    }

    function pool_k5_chemie() {
        return withNatwiTopup([
            { q: 'Welche drei Aggregatzustaende kann Wasser annehmen? Antwort als einer der drei: fest, fluessig oder ___ ?', a: 'gasfoermig' },
            { q: 'Wie heisst der Uebergang von fluessig zu fest (Beispiel: Wasser wird zu Eis)?', a: 'erstarren' },
            { q: 'Wie heisst der Uebergang von fest zu fluessig?', a: 'schmelzen' },
            { q: 'Wie nennt man Wasser im gasfoermigen Zustand (Wort fuer "unsichtbarer Wasserdampf")?', a: 'wasserdampf' },
            { q: 'Welcher Hauptbestandteil unserer Atemluft (in Volumenprozent ca. 78 %) ist gemeint?', a: 'stickstoff' },
            { q: 'Welcher Bestandteil der Luft macht ca. 21 Volumenprozent aus?', a: 'sauerstoff' },
            { q: 'Wie nennt man die Eigenschaft eines Stoffs, sich in Wasser zu loesen (Stichwort)?', a: 'loeslichkeit' },
            { q: 'Wie heisst der Vorgang, wenn Wasser an einer kalten Glasflaeche kleine Troepfchen bildet?', a: 'kondensieren' },
            { q: 'Wie nennt man Gemische, in denen man die Bestandteile mit blossem Auge unterscheiden kann (z.B. Sand und Eisenspaene)?', a: 'heterogen' },
            { q: 'Welcher Reinstoff hat die Summenformel H$_2$O?', a: 'wasser' }
        ], 'k5', 'chemie');
    }

    function pool_k6_physik() {
        return withNatwiTopup([
            { q: 'Wie heisst das Gesetz "Einfallswinkel = Ausfallswinkel" bei Reflexion (Stichwort)?', a: 'reflexion' },
            { q: 'Welches Bauteil buendelt Lichtstrahlen in einem Brennpunkt (Stichwort, Form)?', a: 'sammellinse' },
            { q: 'Aus welchen Farben besteht weisses Licht (Stichwort, das Phaenomen beim Prisma)?', a: 'spektrum' },
            { q: 'Wie nennt man die Zerlegung von weissem Licht in seine Farben?', a: 'dispersion' },
            { q: 'Wie heisst die Einheit der Frequenz (Symbol)?', a: 'hz' },
            { q: 'Welche Groesse beschreibt, wie oft ein Schall pro Sekunde schwingt?', a: 'frequenz' },
            { q: 'Wie nennt man den Bereich, den der Mensch hoeren kann (ca. 16 Hz bis 20 000 Hz)?', a: 'hoerbereich' },
            { q: 'Wie nennt man Schwingungen ueber 20 kHz, die der Mensch nicht mehr hoert?', a: 'ultraschall' },
            { q: 'Wie nennt man die Uebertragung von Waerme durch stroemende Fluessigkeiten oder Gase?', a: 'konvektion' },
            { q: 'Wie nennt man die Uebertragung von Waerme durch direkten Kontakt (z.B. heisser Loeffel in Teetasse)?', a: 'waermeleitung' }
        ], 'k6', 'physik');
    }

    function pool_k6_chemie() {
        return withNatwiTopup([
            { q: 'Mit welchem Trennverfahren trennt man Sand von Wasser (poroeses Material)?', a: 'filtrieren' },
            { q: 'Mit welchem Trennverfahren trennt man Salz aus Salzwasser (Wasser entweicht)?', a: 'eindampfen' },
            { q: 'Mit welchem Trennverfahren trennt man zwei Fluessigkeiten mit unterschiedlichem Siedepunkt?', a: 'destillation' },
            { q: 'Wie nennt man das Verfahren, mit dem man Farbstoffe aus Tinte mit Wasser auf Papier auftrennt?', a: 'chromatographie' },
            { q: 'Wie nennt man Eisen-Sand-Gemische, die man mit einem Magneten trennen kann?', a: 'magnetisch' },
            { q: 'Wie nennt man eine Mischung, in der man die Bestandteile mit blossem Auge nicht unterscheiden kann (z.B. Zuckerwasser)?', a: 'homogen' },
            { q: 'Welcher Haushaltsstoff ist sauer (pH < 7, Beispiel)?', a: 'zitronensaft' },
            { q: 'Welcher Haushaltsstoff ist basisch (pH > 7, Beispiel typisch)?', a: 'seifenlauge' },
            { q: 'Wie nennt man Indikator-Papier, das die Saeurestaerke einer Loesung anzeigt?', a: 'lackmus' },
            { q: 'Welcher Reinstoff besteht aus genau einer Atomsorte (Definition)?', a: 'element' }
        ], 'k6', 'chemie');
    }

    function pool_k5_biologie() {
        return withNatwiTopup([
            { q: 'Wie nennt man den gruenen Farbstoff in Blaettern, der fuer die Fotosynthese gebraucht wird?', a: 'chlorophyll' },
            { q: 'Welches Organ schlaegt im Brustkorb und pumpt das Blut durch den Koerper?', a: 'herz' },
            { q: 'Wie viele Beine hat ein Insekt?', a: '6' },
            { q: 'Wie viele Beine hat eine Spinne?', a: '8' },
            { q: 'Pflanzen brauchen fuer die Fotosynthese: Wasser, Kohlendioxid und ___ ?', a: 'licht' },
            { q: 'Welches Gas atmen wir aus?', a: 'kohlendioxid' },
            { q: 'Welches Gas atmen wir ein (Hauptbestandteil der Atmung)?', a: 'sauerstoff' },
            { q: 'Wie nennt man Tiere, die nur Pflanzen fressen?', a: 'pflanzenfresser' },
            { q: 'Wie nennt man Tiere, die nur Fleisch fressen?', a: 'fleischfresser' },
            { q: 'Aus welchem Material besteht das Skelett eines Menschen?', a: 'knochen' }
        ], 'k5', 'biologie');
    }

    function pool_k6_biologie() {
        return withNatwiTopup([
            { q: 'Wie viele Knochen hat ein erwachsener Mensch (ungefaehre Zahl)?', a: '206' },
            { q: 'Wie nennt man das groesste Organ des Menschen?', a: 'haut' },
            { q: 'In welchem Organ wird Galle produziert?', a: 'leber' },
            { q: 'Welche zwei Hauptgruppen gibt es bei den Wirbeltieren neben Saeugetieren, Voegeln, Reptilien und Amphibien?', a: 'fische' },
            { q: 'Wie heisst der Vorgang, bei dem aus einer Kaulquappe ein Frosch wird?', a: 'metamorphose' },
            { q: 'Was beschreibt eine Nahrungskette: wer frisst ___ ?', a: 'wen' },
            { q: 'Pflanzen produzieren bei der Fotosynthese welches Gas?', a: 'sauerstoff' },
            { q: 'Welches Organ filtert Abfallstoffe aus dem Blut?', a: 'niere' },
            { q: 'Wie heisst der Muskel, der das Atmen unterstuetzt und unterhalb der Lunge liegt?', a: 'zwerchfell' },
            { q: 'Welche Zaehne braucht der Mensch zum Reissen von Nahrung?', a: 'eckzaehne' }
        ], 'k6', 'biologie');
    }

    function pool_k7_physik() {
        return withNatwiTopup([
            { q: 'Berechne die Geschwindigkeit (in m/s): Ein Auto faehrt $s = 200\\,\\text{m}$ in $t = 10\\,\\text{s}$.', a: '20' },
            { q: 'Berechne die zurueckgelegte Strecke (in m): $v = 5\\,\\text{m/s}$, $t = 12\\,\\text{s}$.', a: '60' },
            { q: 'Wandle um: $72\\,\\text{km/h}$ in m/s.', a: '20' },
            { q: 'Wandle um: $10\\,\\text{m/s}$ in km/h.', a: '36' },
            { q: 'Wie heisst die Einheit der Kraft (Symbol)?', a: 'n' },
            { q: 'Berechne die Gewichtskraft auf der Erde (in N) bei $m = 5\\,\\text{kg}$ und $g \\approx 10\\,\\text{N/kg}$.', a: '50' },
            { q: 'Welche physikalische Groesse hat die Einheit Joule?', a: 'energie' },
            { q: 'Berechne die Dichte (in g/cm$^3$): $m = 200\\,\\text{g}$, $V = 50\\,\\text{cm}^3$.', a: '4' },
            { q: 'Wie heisst der Aggregatzustand zwischen fluessig und gasfoermig (Phasenuebergang Verdampfen)?', a: 'gasfoermig' },
            { q: 'Bei welcher Temperatur (in $^\\circ$C) gefriert reines Wasser bei Normaldruck?', a: '0' }
        ], 'k7', 'physik');
    }

    function pool_k7_chemie() {
        return withNatwiTopup([
            { q: 'Welcher Aggregatzustand hat Wasser bei $25^\\circ\\text{C}$ und Normaldruck?', a: 'fluessig' },
            { q: 'Wie heisst der Uebergang von fest zu fluessig?', a: 'schmelzen' },
            { q: 'Wie heisst der Uebergang von fluessig zu gasfoermig?', a: 'verdampfen' },
            { q: 'Wie heisst der direkte Uebergang von fest zu gasfoermig?', a: 'sublimieren' },
            { q: 'Was ist die Summenformel von Wasser?', a: 'h2o' },
            { q: 'Was ist die Summenformel von Kohlendioxid?', a: 'co2' },
            { q: 'Wie nennt man Stoffe, die sich nicht weiter in einfachere Stoffe zerlegen lassen (chemisch)?', a: 'element' },
            { q: 'Wie nennt man eine Mischung, in der man die Bestandteile nicht mehr unterscheiden kann (z.B. Salzwasser)?', a: 'loesung' },
            { q: 'Welche Eigenschaft beschreibt, wie schwer ein Stoff bei gegebenem Volumen ist?', a: 'dichte' },
            { q: 'Wie heisst der Vorgang, bei dem aus einer Loesung das geloeste Salz wieder zurueckgewonnen wird (Wasser verdampft)?', a: 'eindampfen' }
        ], 'k7', 'chemie');
    }

    function pool_k7_biologie() {
        return withNatwiTopup([
            { q: 'Wie heisst die Gesamtheit aller Lebewesen und ihrer Umwelt in einem Gebiet?', a: 'oekosystem' },
            { q: 'Wie nennt man die kleinste lebende Einheit aller Lebewesen?', a: 'zelle' },
            { q: 'In welchem Pflanzenteil findet die Fotosynthese hauptsaechlich statt?', a: 'blatt' },
            { q: 'Wie heisst das Stoffwechselprodukt der Fotosynthese, das wir atmen?', a: 'sauerstoff' },
            { q: 'Welchen Naehrstoff brauchen Pflanzen aus dem Boden, der mit "N" beginnt?', a: 'stickstoff' },
            { q: 'Welche Tiere sind warmbluetig: Saeugetiere oder Reptilien?', a: 'saeugetiere' },
            { q: 'Wie nennt man die Fortpflanzung ohne Befruchtung (z.B. bei manchen Pflanzen, Hefen)?', a: 'ungeschlechtlich' },
            { q: 'Welche Pflanzengruppe vermehrt sich mit Sporen statt Samen (Beispiel: Farne)?', a: 'farne' },
            { q: 'Wie nennt man das Verhaeltnis von Raeuber zu Beute, wenn beide Bestaende sich gegenseitig regulieren?', a: 'raeuber-beute' },
            { q: 'Welche Rolle in einem Oekosystem haben Pilze und Bakterien hauptsaechlich?', a: 'zersetzer' }
        ], 'k7', 'biologie');
    }

    function pool_k8_physik() {
        return withNatwiTopup([
            { q: 'Berechne den elektrischen Widerstand (in $\\Omega$): $U = 12\\,\\text{V}$, $I = 0{,}5\\,\\text{A}$.', a: '24' },
            { q: 'Berechne die Stromstaerke (in A): $U = 230\\,\\text{V}$, $R = 23\\,\\Omega$.', a: '10' },
            { q: 'Wie heisst das Gesetz $U = R \\cdot I$?', a: 'ohmsches gesetz' },
            { q: 'Welche Einheit hat die elektrische Spannung?', a: 'v' },
            { q: 'Welche Einheit hat die elektrische Stromstaerke?', a: 'a' },
            { q: 'Wie schaltet man zwei Widerstaende, damit sich ihre Werte addieren?', a: 'reihe' },
            { q: 'Berechne die Arbeit (in J): $F = 20\\,\\text{N}$, $s = 5\\,\\text{m}$.', a: '100' },
            { q: 'Berechne die Leistung (in W): $W = 600\\,\\text{J}$, $t = 60\\,\\text{s}$.', a: '10' },
            { q: 'Berechne die elektrische Leistung (in W): $U = 12\\,\\text{V}$, $I = 2\\,\\text{A}$.', a: '24' },
            { q: 'Wie heisst das physikalische Prinzip "Energie kann nicht erzeugt oder vernichtet, sondern nur umgewandelt werden"?', a: 'energieerhaltung' }
        ], 'k8', 'physik');
    }

    function pool_k8_chemie() {
        return withNatwiTopup([
            { q: 'Wie heisst das Teilchenmodell, das Atome als unteilbar annahm (nach dem Erfinder)?', a: 'dalton' },
            { q: 'Wie nennt man positiv geladene Teilchen im Atomkern?', a: 'protonen' },
            { q: 'Wie nennt man neutrale Teilchen im Atomkern?', a: 'neutronen' },
            { q: 'Wie nennt man negativ geladene Teilchen in der Atomhuelle?', a: 'elektronen' },
            { q: 'Welche Ordnungszahl hat Sauerstoff im Periodensystem?', a: '8' },
            { q: 'Welche Ordnungszahl hat Kohlenstoff?', a: '6' },
            { q: 'Welche Ordnungszahl hat Wasserstoff?', a: '1' },
            { q: 'Was ist die Summenformel von Kochsalz?', a: 'nacl' },
            { q: 'Welche Stoffklasse entsteht bei der Reaktion eines Metalls mit Sauerstoff?', a: 'oxid' },
            { q: 'Was ist die Summenformel von Methan?', a: 'ch4' }
        ], 'k8', 'chemie');
    }

    function pool_k8_biologie() {
        return withNatwiTopup([
            { q: 'Wie heisst das Hauptorgan der Atmung beim Menschen?', a: 'lunge' },
            { q: 'In welchem Teil der Lunge findet der Gasaustausch statt?', a: 'lungenblaeschen' },
            { q: 'Wie heisst der Muskel zwischen Brust- und Bauchraum, der die Atmung steuert?', a: 'zwerchfell' },
            { q: 'In welchem Organ wird die Nahrung mit Magensaft vermischt?', a: 'magen' },
            { q: 'Wo werden im Verdauungstrakt die meisten Naehrstoffe aufgenommen?', a: 'duenndarm' },
            { q: 'Welches Organ produziert Insulin?', a: 'bauchspeicheldruese' },
            { q: 'Welche Blutzellen transportieren Sauerstoff?', a: 'rote' },
            { q: 'Wie heisst der rote Blutfarbstoff, der Sauerstoff bindet?', a: 'haemoglobin' },
            { q: 'Wie viele Herzkammern hat das menschliche Herz?', a: '4' },
            { q: 'Wie nennt man die Gefaesse, die Blut vom Herzen wegfuehren?', a: 'arterien' }
        ], 'k8', 'biologie');
    }

    function pool_k9_physik() {
        return withNatwiTopup([
            { q: 'Berechne die Kraft (in N): $m = 8\\,\\text{kg}$, $a = 3\\,\\text{m/s}^2$ (2. newtonsches Gesetz).', a: '24' },
            { q: 'Berechne die kinetische Energie (in J): $m = 2\\,\\text{kg}$, $v = 10\\,\\text{m/s}$. ($E_\\text{kin} = \\tfrac{1}{2} m v^2$)', a: '100' },
            { q: 'Berechne die potentielle Energie (in J): $m = 5\\,\\text{kg}$, $h = 2\\,\\text{m}$, $g \\approx 10\\,\\text{N/kg}$.', a: '100' },
            { q: 'Wie heisst das 1. newtonsche Gesetz (Stichwort)?', a: 'traegheit' },
            { q: 'Wie heisst das 3. newtonsche Gesetz (Stichwort)?', a: 'wechselwirkung' },
            { q: 'Welche Einheit hat die elektrische Ladung?', a: 'c' },
            { q: 'Berechne die Ladung (in C): $I = 2\\,\\text{A}$, $t = 5\\,\\text{s}$ ($Q = I \\cdot t$).', a: '10' },
            { q: 'Welche Groesse beschreibt die Energie pro Ladung in einem Stromkreis?', a: 'spannung' },
            { q: 'Wie heisst der Effekt, dass ein stromdurchflossener Leiter ein Magnetfeld erzeugt?', a: 'elektromagnetismus' },
            { q: 'Berechne den Druck (in Pa): $F = 50\\,\\text{N}$, $A = 0{,}5\\,\\text{m}^2$ ($p = F/A$).', a: '100' }
        ], 'k9', 'physik');
    }

    function pool_k9_chemie() {
        return withNatwiTopup([
            { q: 'Welchen pH-Wert hat eine neutrale waessrige Loesung bei $25^\\circ\\text{C}$?', a: '7' },
            { q: 'Ist eine Loesung mit pH 3 sauer, neutral oder basisch?', a: 'sauer' },
            { q: 'Ist eine Loesung mit pH 11 sauer, neutral oder basisch?', a: 'basisch' },
            { q: 'Was ist die Summenformel von Salzsaeure (geloest in Wasser)?', a: 'hcl' },
            { q: 'Was ist die Summenformel von Schwefelsaeure?', a: 'h2so4' },
            { q: 'Was ist die Summenformel von Natronlauge?', a: 'naoh' },
            { q: 'Wie heisst das Produkt einer Neutralisationsreaktion (allgemein, neben Wasser)?', a: 'salz' },
            { q: 'Welches Element ist das haeufigste in der Erdkruste?', a: 'sauerstoff' },
            { q: 'Welche Bindungsart liegt zwischen Na$^+$ und Cl$^-$ in Kochsalz vor?', a: 'ionenbindung' },
            { q: 'Wie heisst das Periodensystem-Element mit dem Symbol "Fe"?', a: 'eisen' }
        ], 'k9', 'chemie');
    }

    function pool_k9_biologie() {
        return withNatwiTopup([
            { q: 'Wie heisst die Traegersubstanz der Erbinformation?', a: 'dna' },
            { q: 'Wie viele Chromosomen hat ein menschlicher Koerperzellkern (diploid)?', a: '46' },
            { q: 'Wie viele Chromosomen hat eine menschliche Keimzelle (haploid)?', a: '23' },
            { q: 'Wie nennt man die Zellteilung, bei der Keimzellen mit halbem Chromosomensatz entstehen?', a: 'meiose' },
            { q: 'Wie nennt man die Zellteilung fuer Wachstum und Regeneration (mit identischem Chromosomensatz)?', a: 'mitose' },
            { q: 'Wer formulierte die Evolutionstheorie durch natuerliche Auslese?', a: 'darwin' },
            { q: 'Wie nennt man Lebewesen, die aus einem gemeinsamen Vorfahren hervorgegangen sind?', a: 'verwandt' },
            { q: 'Welche Bausteine bilden Proteine (Mehrzahl)?', a: 'aminosaeuren' },
            { q: 'Wie heisst der Bauplan fuer ein Protein in der DNA?', a: 'gen' },
            { q: 'Welche Vererbungsregel besagt: Bei reinrassigen Eltern (homozygot) sind alle Nachkommen der F1-Generation gleich?', a: 'uniformitaetsregel' }
        ], 'k9', 'biologie');
    }

    function pool_k10_physik() {
        return withNatwiTopup([
            { q: 'Wie heisst das Atommodell mit Atomkern und Elektronenhuelle (Streuversuch)?', a: 'rutherford' },
            { q: 'Wie heisst das Atommodell mit Elektronenschalen und Quantenspruengen?', a: 'bohr' },
            { q: 'Welche Strahlung besteht aus Heliumkernen?', a: 'alpha' },
            { q: 'Welche Strahlung besteht aus Elektronen?', a: 'beta' },
            { q: 'Welche Strahlung ist elektromagnetisch (kurzwellig, energiereich)?', a: 'gamma' },
            { q: 'Wie heisst die Halbierungszeit der Atomanzahl beim radioaktiven Zerfall?', a: 'halbwertszeit' },
            { q: 'Bei welchem optischen Phaenomen wird ein Lichtstrahl an der Grenzflaeche zweier Medien gebrochen?', a: 'brechung' },
            { q: 'Bei welcher Linsenform wird paralleles Licht in einem Brennpunkt gebuendelt?', a: 'sammellinse' },
            { q: 'Berechne die Wellenlaenge (in m): $c = 3\\cdot 10^8\\,\\text{m/s}$, $f = 1{,}5\\cdot 10^8\\,\\text{Hz}$ ($\\lambda = c/f$).', a: '2' },
            { q: 'Welche physikalische Groesse ist ein Mass fuer den Energieinhalt einer Welle (Stichwort: Frequenz/Wellenlaenge)?', a: 'frequenz' }
        ], 'k10', 'physik');
    }

    function pool_k10_chemie() {
        return withNatwiTopup([
            { q: 'Welches Element bildet das Geruest aller organischen Verbindungen?', a: 'kohlenstoff' },
            { q: 'Wie heisst die einfachste Alkanverbindung (Summenformel CH$_4$)?', a: 'methan' },
            { q: 'Welche Alkanverbindung hat die Summenformel $C_2H_6$?', a: 'ethan' },
            { q: 'Welche Alkanverbindung hat die Summenformel $C_3H_8$?', a: 'propan' },
            { q: 'Welche funktionelle Gruppe macht eine Verbindung zu einem Alkohol?', a: 'oh' },
            { q: 'Wie heisst der Alkohol mit der Summenformel $C_2H_5OH$ (Trivialname)?', a: 'ethanol' },
            { q: 'Wie heisst die funktionelle Gruppe der Carbonsaeuren (Kurzform)?', a: 'cooh' },
            { q: 'Welche Carbonsaeure ist der Hauptbestandteil von Essig?', a: 'essigsaeure' },
            { q: 'Wie nennt man Kohlenwasserstoffe mit nur Einfachbindungen?', a: 'alkane' },
            { q: 'Wie nennt man Kohlenwasserstoffe mit mindestens einer Doppelbindung?', a: 'alkene' }
        ], 'k10', 'chemie');
    }

    function pool_k10_biologie() {
        return withNatwiTopup([
            { q: 'Wie heisst der Abschnitt der DNA, der die Information fuer ein Protein traegt?', a: 'gen' },
            { q: 'Welche Base paart sich in der DNA mit Adenin?', a: 'thymin' },
            { q: 'Welche Base paart sich in der DNA mit Guanin?', a: 'cytosin' },
            { q: 'Welche Base ersetzt in der RNA das Thymin?', a: 'uracil' },
            { q: 'Wie heisst der Vorgang, bei dem aus einer DNA-Vorlage mRNA entsteht?', a: 'transkription' },
            { q: 'Wie heisst der Vorgang, bei dem aus mRNA an den Ribosomen ein Protein entsteht?', a: 'translation' },
            { q: 'Wie nennt man die Vielfalt unterschiedlicher Lebensraeume, Arten und Gene auf der Erde?', a: 'biodiversitaet' },
            { q: 'Was beschreibt eine oekologische Nische?', a: 'lebensweise' },
            { q: 'Wie heisst der Energiefluss in einem Oekosystem (Begriff)?', a: 'nahrungskette' },
            { q: 'Welche Hauptursache fuehrt aktuell global zum Rueckgang der Biodiversitaet (Stichwort)?', a: 'lebensraumverlust' }
        ], 'k10', 'biologie');
    }

    // ---------- Geschichte Klassen 5-10 (Pool) ----------
    // Quellenbasis: NRW-Kernlehrplan Geschichte SI 2019/2020 (Realschule/Gesamtschule/Gymnasium G9),
    // schueluebliche Lehrwerke (Klett "Geschichte und Geschehen", Cornelsen "Forum Geschichte",
    // Westermann "Zeit fuer Geschichte"). Antworten sind Plain-Text (Jahreszahl, Begriff, Name);
    // tolerant via normalize() (trim, Komma->Punkt, Kleinschreibung). Umlaute durch ae/oe/ue/ss
    // ersetzt, damit die Tastatur-Eingabe (z.B. iPad ohne deutsches Layout) zuverlaessig funktioniert.

    function pool_k5_geschichte() {
        // K5: Steinzeit, Aegypten, Antikes Griechenland — Einstieg in Geschichte.
        return enrichSchuelerTrainingItems([
            // --- Steinzeit / Altsteinzeit / Jungsteinzeit ---
            { q: 'Wie nennt man die aelteste Epoche der Menschheitsgeschichte, in der die Menschen als Jaeger und Sammler lebten?', a: 'altsteinzeit' },
            { q: 'In welcher Epoche wurden die Menschen erstmals sesshaft und begannen Ackerbau und Viehzucht?', a: 'jungsteinzeit' },
            { q: 'Aus welchem Material stellten die Menschen der Altsteinzeit die meisten ihrer Werkzeuge her?', a: 'stein' },
            { q: 'Welches Tier wurde in der Jungsteinzeit als erstes vom Menschen domestiziert (Haustier)?', a: 'hund' },
            { q: 'Wie nennt man den Uebergang von Jaegern und Sammlern zu sesshaften Bauern (Fachbegriff)?', a: 'neolithische revolution' },
            { q: 'In welchem Erdteil entwickelte sich die Landwirtschaft zuerst (Region)?', a: 'fruchtbarer halbmond' },
            { q: 'Welches Metall verarbeiteten die Menschen in der Bronzezeit (Hauptbestandteil)?', a: 'kupfer' },
            { q: 'Aus welchen zwei Metallen besteht Bronze?', a: 'kupfer und zinn' },
            { q: 'Wie heisst der beruehmte Eismann aus dem Oetztal (Fund 1991)?', a: 'oetzi' },
            { q: 'Wie nennt man Hoehlenmalereien, die in der Altsteinzeit entstanden (Stichwort)?', a: 'felsmalerei' },

            // --- Aegypten ---
            { q: 'An welchem Fluss entwickelte sich die Hochkultur Aegypten?', a: 'nil' },
            { q: 'Wie hiess der Herrscher im alten Aegypten?', a: 'pharao' },
            { q: 'Wie heissen die monumentalen Grabbauten der aegyptischen Pharaonen?', a: 'pyramiden' },
            { q: 'In welcher Stadt steht die beruehmteste Pyramide Aegyptens?', a: 'gizeh' },
            { q: 'Wie heisst die aegyptische Bilderschrift?', a: 'hieroglyphen' },
            { q: 'Womit konservierten die Aegypter ihre Toten, damit sie im Jenseits weiterleben?', a: 'mumifizierung' },
            { q: 'Wer entzifferte die Hieroglyphen mithilfe des Steins von Rosette (Name)?', a: 'champollion' },
            { q: 'Welche Goettin galt im alten Aegypten als Goettin der Liebe und Mutterschaft?', a: 'isis' },
            { q: 'Wie heisst der Sonnengott der alten Aegypter?', a: 'ra' },
            { q: 'Wie nannten die Aegypter ihren Sonnenkalender mit 365 Tagen (Fachbegriff)?', a: 'sonnenkalender' },
            { q: 'Was schrieben die Aegypter mit Schilf auf? (Material)', a: 'papyrus' },

            // --- Antikes Griechenland ---
            { q: 'In welchem Land entwickelte sich die antike Demokratie zuerst?', a: 'griechenland' },
            { q: 'In welcher griechischen Stadt entstand die erste Demokratie?', a: 'athen' },
            { q: 'Wie nennt man die kleinen, selbststaendigen Stadtstaaten im antiken Griechenland?', a: 'polis' },
            { q: 'Wie nannten die Griechen ihren Stadtberg mit Tempel?', a: 'akropolis' },
            { q: 'In welchem Jahr fanden die ersten Olympischen Spiele der Antike statt (Jahr)?', a: '776 v.chr.' },
            { q: 'Wie hiess der wichtigste Gott im griechischen Pantheon?', a: 'zeus' },
            { q: 'Wie hiess der griechische Philosoph, der Schueler von Sokrates und Lehrer von Aristoteles war?', a: 'platon' },
            { q: 'Wie hiess der Philosoph, dem der Satz "Ich weiss, dass ich nichts weiss" zugeschrieben wird?', a: 'sokrates' },
            { q: 'Wie hiess der griechische Eroberer, der bis nach Indien zog?', a: 'alexander der grosse' },
            { q: 'In welcher Stadt kaempften die Spartaner 480 v.Chr. gegen die Perser?', a: 'thermopylen' },
            { q: 'Wie hiess der erste grosse griechische Dichter (Ilias, Odyssee)?', a: 'homer' },
            { q: 'Wie nannten die Griechen die kriegerischen Sportwettkaempfe zu Ehren von Zeus?', a: 'olympische spiele' },

            // --- Roemisches Reich (Einstieg) ---
            { q: 'In welchem Jahr wurde Rom der Sage nach gegruendet?', a: '753 v.chr.' },
            { q: 'Wer waren laut Sage die Gruender Roms?', a: 'romulus und remus' },
            { q: 'Wie heisst die Regierungsform Roms vor der Kaiserzeit?', a: 'republik' },
            { q: 'Welches Volk eroberte Rom mehrmals fast vollstaendig (Stichwort: Brennus)?', a: 'gallier' },
            { q: 'Wie nannten die Roemer ihre Stadt-Gemeinschaft (lateinischer Begriff)?', a: 'res publica' },
            { q: 'Wer war der erste Kaiser des Roemischen Reiches?', a: 'augustus' },
            { q: 'In welchem Jahr starb Julius Caesar (Jahr)?', a: '44 v.chr.' },
            { q: 'An welchem Fluss errichteten die Roemer den Limes als Grenze zu Germanien?', a: 'rhein' },
            { q: 'Wie heisst das Bauwerk, das die Roemer als Grenzwall errichteten?', a: 'limes' },
            { q: 'In welcher Stadt steht das beruehmte Amphitheater "Kolosseum"?', a: 'rom' },
            { q: 'Welche Sprache sprachen die Roemer?', a: 'latein' },
            { q: 'Wie hiess das wichtigste Verkehrsmittel der Roemer fuer lange Strecken (Bauwerk)?', a: 'roemerstrasse' },
            { q: 'Wer war der germanische Feldherr, der 9 n.Chr. drei roemische Legionen vernichtete?', a: 'arminius' },
            { q: 'In welcher Schlacht 9 n.Chr. verloren die Roemer drei Legionen unter Varus?', a: 'varusschlacht' },
            { q: 'In welchem Jahrhundert teilte sich das Roemische Reich in ein West- und Ostreich (Jahrhundert)?', a: '4. jahrhundert' },
            { q: 'In welchem Jahr endete das Westroemische Reich (Jahr)?', a: '476' },
            { q: 'Welche Religion wurde im Roemischen Reich unter Konstantin erlaubt und spaeter Staatsreligion?', a: 'christentum' }
        ], 'k5', 'geschichte');
    }

    function pool_k6_geschichte() {
        // K6: Roemisches Reich vertieft, Voelkerwanderung, Mittelalter-Einstieg.
        return enrichSchuelerTrainingItems([
            // --- Roemisches Reich vertieft ---
            { q: 'Wie hiess der oberste Beamte der roemischen Republik (Amt, lateinisch)?', a: 'konsul' },
            { q: 'Welche zwei Gesellschaftsschichten standen sich in der fruehen Republik gegenueber?', a: 'patrizier und plebejer' },
            { q: 'Welche Truppe roemischer Berufssoldaten bildete das Rueckgrat des Heeres (Begriff)?', a: 'legion' },
            { q: 'Wie hiess der beruehmteste Feldherr im Buergerkrieg, der 49 v.Chr. den Rubikon ueberschritt?', a: 'caesar' },
            { q: 'Welche Schlacht entschied 31 v.Chr. den Endkampf der Republik fuer Octavian (Ort)?', a: 'actium' },
            { q: 'Was ist die "Pax Romana" (Bedeutung in einem Wort)?', a: 'roemischer frieden' },
            { q: 'Wer war der christenverfolgende Kaiser, der nach dem Brand Roms 64 n.Chr. die Christen beschuldigte?', a: 'nero' },
            { q: 'Welche Religion verbot Kaiser Diokletian um 300 n.Chr. besonders streng?', a: 'christentum' },
            { q: 'Im Toleranzedikt von Mailand 313 erlaubte Kaiser Konstantin welche Religion?', a: 'christentum' },
            { q: 'Wie hiess der Volksstamm, der 410 n.Chr. Rom pluenderte?', a: 'westgoten' },
            { q: 'In welcher Stadt regierte spaeter das Ostroemische Reich (auch Byzanz genannt)?', a: 'konstantinopel' },

            // --- Voelkerwanderung ---
            { q: 'Wie nennt man die Wanderbewegungen germanischer Voelker um 375 n.Chr. (Begriff)?', a: 'voelkerwanderung' },
            { q: 'Welches Reitervolk aus dem Osten loeste 375 n.Chr. die Voelkerwanderung aus?', a: 'hunnen' },
            { q: 'Wer war der gefuerchtete Anfuehrer der Hunnen Mitte des 5. Jahrhunderts?', a: 'attila' },
            { q: 'In welcher Schlacht 451 wurde Attila in Gallien gestoppt (Ort)?', a: 'katalaunische felder' },
            { q: 'Welches germanische Volk gruendete in Spanien sein Reich (Westen)?', a: 'westgoten' },
            { q: 'Welches Volk gruendete unter Theoderich ein Reich in Italien?', a: 'ostgoten' },
            { q: 'Welches germanische Volk eroberte Britannien (Hauptstamm)?', a: 'angelsachsen' },

            // --- Frankenreich / Karl der Grosse ---
            { q: 'Welches germanische Volk gruendete im 5. Jh. das wichtigste Reich auf dem Gebiet des heutigen Frankreich?', a: 'franken' },
            { q: 'Wer war der Begruender des Frankenreichs (um 500 getauft)?', a: 'chlodwig' },
            { q: 'Welches Herrscherhaus folgte 751 den Merowingern?', a: 'karolinger' },
            { q: 'In welchem Jahr wurde Karl der Grosse zum roemischen Kaiser gekroent?', a: '800' },
            { q: 'In welcher Stadt war die Lieblingspfalz Karls des Grossen?', a: 'aachen' },
            { q: 'Welches Volk im Norden Deutschlands eroberte und christianisierte Karl der Grosse?', a: 'sachsen' },
            { q: 'Wie heisst der Vertrag von 843, der das Frankenreich teilte?', a: 'vertrag von verdun' },

            // --- Mittelalter: Lehnswesen, Staende ---
            { q: 'Wie heisst die Gesellschaftsordnung des Mittelalters, in der Land gegen Treuedienst verliehen wurde?', a: 'lehnswesen' },
            { q: 'Wer vergibt im Lehnswesen ein Lehen (Begriff)?', a: 'lehnsherr' },
            { q: 'Wer empfaengt im Lehnswesen ein Lehen?', a: 'vasall' },
            { q: 'Welche drei Staende kannte das Mittelalter (Reihenfolge: Gebet, Schwert, Pflug)?', a: 'klerus adel bauern' },
            { q: 'Welcher Stand besass die meisten Privilegien im Mittelalter (neben Adel)?', a: 'klerus' },
            { q: 'Welche Bevoelkerungsgruppe stellte den groessten Teil der mittelalterlichen Gesellschaft?', a: 'bauern' },
            { q: 'Wie nennt man unfreie Bauern, die zu Frondiensten verpflichtet waren?', a: 'leibeigene' },

            // --- Mittelalter: Kaiser & Papst ---
            { q: 'Wie heisst der beruehmte Streit zwischen Kaiser und Papst um die Bischofsernennung im 11. Jh.?', a: 'investiturstreit' },
            { q: 'Welcher Papst forderte 1077 in Canossa den Bussgang Heinrichs IV.?', a: 'gregor vii.' },
            { q: 'Welcher deutsche Koenig ging 1077 nach Canossa?', a: 'heinrich iv.' },
            { q: 'Welcher Vertrag beendete 1122 den Investiturstreit?', a: 'wormser konkordat' },
            { q: 'Welcher Staufer-Kaiser ertrank 1190 auf dem Dritten Kreuzzug (Beiname Barbarossa)?', a: 'friedrich i.' },

            // --- Mittelalter: Stadt, Hanse, Klosterleben ---
            { q: 'Wie nennt man die ummauerten Siedlungen mit Marktrecht im Mittelalter?', a: 'stadt' },
            { q: 'Welches Recht erhielt eine mittelalterliche Stadt vom Herrscher (Begriff)?', a: 'marktrecht' },
            { q: 'Wie nennt man den Zusammenschluss norddeutscher Kaufmannsstaedte ab dem 12. Jh.?', a: 'hanse' },
            { q: 'Welche Stadt war das Zentrum der Hanse?', a: 'luebeck' },
            { q: 'Wie nennt man die Zusammenschluesse von Handwerkern in einer mittelalterlichen Stadt?', a: 'zunft' },
            { q: 'Welche religioese Gemeinschaft praegte das geistige und wirtschaftliche Leben im Mittelalter (Stichwort)?', a: 'kloster' },
            { q: 'Wie nennt man die Schueler, die in mittelalterlichen Klosterschulen schreiben lernten?', a: 'novizen' },

            // --- Kreuzzuege ---
            { q: 'Wie nennt man die christlichen Feldzuege ins Heilige Land zwischen 1096 und 1291?', a: 'kreuzzuege' },
            { q: 'Welcher Papst rief 1095 in Clermont zum ersten Kreuzzug auf?', a: 'urban ii.' },
            { q: 'Welche Stadt wurde 1099 im Ersten Kreuzzug erobert?', a: 'jerusalem' },
            { q: 'Welcher Ritterorden entstand im Heiligen Land und siedelte spaeter ins Baltikum um?', a: 'deutscher orden' },
            { q: 'In welchem Jahr endete der letzte Kreuzfahrerstaat mit dem Fall von Akkon?', a: '1291' },

            // --- Mittelalterliche Pestepidemie ---
            { q: 'Welche Seuche toetete im 14. Jahrhundert ein Drittel der europaeischen Bevoelkerung?', a: 'pest' },
            { q: 'In welchem Jahr erreichte die grosse Pestwelle ("Schwarzer Tod") Mitteleuropa?', a: '1348' }
        ], 'k6', 'geschichte');
    }

    function pool_k7_geschichte() {
        // K7: Spaetmittelalter, Entdeckungen, Reformation, Absolutismus (Einstieg).
        return enrichSchuelerTrainingItems([
            // --- Spaetmittelalter / Reformation Vorlauf ---
            { q: 'Wer erfand um 1450 den Buchdruck mit beweglichen Lettern?', a: 'gutenberg' },
            { q: 'In welcher Stadt wirkte Gutenberg?', a: 'mainz' },
            { q: 'Wie heisst die geistige Bewegung um 1500, die sich an der Antike orientierte?', a: 'humanismus' },
            { q: 'Wie nennt man die kulturelle Bluetezeit Italiens im 14.-16. Jahrhundert?', a: 'renaissance' },
            { q: 'Welcher Maler malte das beruehmte Bild "Mona Lisa"?', a: 'leonardo da vinci' },
            { q: 'Welcher Bildhauer schuf den David in Florenz?', a: 'michelangelo' },

            // --- Entdeckungen ---
            { q: 'Welcher Seefahrer erreichte 1492 die "neue Welt"?', a: 'kolumbus' },
            { q: 'In wessen Auftrag segelte Kolumbus?', a: 'spanien' },
            { q: 'Welcher Seefahrer umrundete 1519-1522 erstmals die Erde (Expeditionsleiter)?', a: 'magellan' },
            { q: 'Welcher Seefahrer eroeffnete 1498 den Seeweg nach Indien?', a: 'vasco da gama' },
            { q: 'Welcher Vertrag teilte 1494 die "neue Welt" zwischen Spanien und Portugal auf?', a: 'tordesillas' },
            { q: 'Welche zwei grossen Reiche der Inka und Azteken zerstoerten die Spanier (Reich der Azteken in welchem Land)?', a: 'mexiko' },
            { q: 'Wer eroberte 1521 das Reich der Azteken?', a: 'cortes' },
            { q: 'Wer eroberte 1532 das Reich der Inka?', a: 'pizarro' },
            { q: 'Wie heisst der Pflanze-Bedeutende Welthandel zwischen Europa-Amerika-Afrika (Stichwort)?', a: 'dreieckshandel' },
            { q: 'Welche Pflanze brachten die Europaer aus Amerika nach Europa (Hauptnahrungsmittel)?', a: 'kartoffel' },

            // --- Reformation ---
            { q: 'Wer schlug 1517 in Wittenberg seine Thesen an die Kirchentuer?', a: 'luther' },
            { q: 'Wie viele Thesen schlug Luther 1517 an?', a: '95' },
            { q: 'Was kritisierte Luther besonders an der katholischen Kirche (Stichwort)?', a: 'ablasshandel' },
            { q: 'In welcher Stadt wurde Luther 1521 vor dem Reichstag verhoert?', a: 'worms' },
            { q: 'Auf welcher Burg uebersetzte Luther die Bibel ins Deutsche?', a: 'wartburg' },
            { q: 'Welcher Schweizer Reformator wirkte in Genf?', a: 'calvin' },
            { q: 'Welcher Schweizer Reformator wirkte in Zuerich?', a: 'zwingli' },
            { q: 'Welcher Frieden beendete 1555 den Konflikt zwischen Katholiken und Protestanten in Deutschland?', a: 'augsburger religionsfrieden' },
            { q: 'Wie hiess das Prinzip "Wessen Land, dessen Religion" (lateinisch, oder Stichwort)?', a: 'cuius regio eius religio' },

            // --- Dreissigjaehriger Krieg ---
            { q: 'Welcher Krieg von 1618-1648 verwuestete weite Teile Deutschlands?', a: 'dreissigjaehriger krieg' },
            { q: 'Welches Ereignis 1618 in Prag loeste den Krieg aus?', a: 'prager fenstersturz' },
            { q: 'Welcher Frieden beendete 1648 den Dreissigjaehrigen Krieg?', a: 'westfaelischer frieden' },
            { q: 'In welchen Staedten wurde der Westfaelische Frieden verhandelt (eine nennen)?', a: 'muenster' },
            { q: 'Welcher schwedische Koenig fiel 1632 in der Schlacht bei Luetzen?', a: 'gustav adolf' },

            // --- Absolutismus ---
            { q: 'Wie heisst die Regierungsform, bei der der Koenig unbeschraenkt regiert (Stichwort)?', a: 'absolutismus' },
            { q: 'Welcher franzoesische Koenig (1643-1715) ist das beruehmteste Beispiel des Absolutismus?', a: 'ludwig xiv.' },
            { q: 'Welches Schloss liess Ludwig XIV. bauen?', a: 'versailles' },
            { q: 'Welcher Satz wird Ludwig XIV. zugeschrieben (auf Deutsch)?', a: 'der staat bin ich' },
            { q: 'Welche Wirtschaftslehre praegte den Absolutismus (Stichwort)?', a: 'merkantilismus' },
            { q: 'Welcher preussische Koenig fuehrte die allgemeine Schulpflicht ein (1717)?', a: 'friedrich wilhelm i.' },
            { q: 'Welcher preussische Koenig ("der Grosse") regierte 1740-1786?', a: 'friedrich ii.' },
            { q: 'Wie nennt man die "aufgeklaerte" Form des Absolutismus mit reformerischen Zuegen?', a: 'aufgeklaerter absolutismus' },

            // --- Aufklaerung ---
            { q: 'Wie heisst die geistige Bewegung des 18. Jahrhunderts mit Vernunft und Bildung im Zentrum?', a: 'aufklaerung' },
            { q: 'Welcher franzoesische Philosoph schrieb "Vom Gesellschaftsvertrag"?', a: 'rousseau' },
            { q: 'Welcher franzoesische Philosoph kritisierte Kirche und Staat scharf?', a: 'voltaire' },
            { q: 'Welcher deutsche Philosoph schrieb "Beantwortung der Frage: Was ist Aufklaerung?"?', a: 'kant' },
            { q: 'Welche drei Gewalten unterschied Montesquieu (Begriff)?', a: 'gewaltenteilung' },
            { q: 'Welche drei Staatsgewalten gehoeren zur Gewaltenteilung (Einzelantwort: Gesetzgebung)?', a: 'legislative' },
            { q: 'Welche drei Staatsgewalten gehoeren zur Gewaltenteilung (Einzelantwort: ausfuehrende Gewalt)?', a: 'exekutive' },
            { q: 'Welche drei Staatsgewalten gehoeren zur Gewaltenteilung (Einzelantwort: Rechtsprechung)?', a: 'judikative' },

            // --- Amerikanische Unabhaengigkeit ---
            { q: 'In welchem Jahr erklaerten die USA ihre Unabhaengigkeit?', a: '1776' },
            { q: 'Wer war der erste Praesident der USA?', a: 'washington' },
            { q: 'Gegen welche Kolonialmacht erkaempften sich die USA ihre Unabhaengigkeit?', a: 'grossbritannien' }
        ], 'k7', 'geschichte');
    }

    function pool_k8_geschichte() {
        // K8: Franzoesische Revolution, Napoleon, Industrialisierung, Revolution 1848.
        return enrichSchuelerTrainingItems([
            // --- Franzoesische Revolution ---
            { q: 'In welchem Jahr begann die Franzoesische Revolution?', a: '1789' },
            { q: 'Welches Pariser Gefaengnis wurde am 14. Juli 1789 gestuermt?', a: 'bastille' },
            { q: 'Welcher franzoesische Koenig wurde 1793 hingerichtet?', a: 'ludwig xvi.' },
            { q: 'Welche Koenigin wurde 1793 ebenfalls hingerichtet (Vorname Marie ...)?', a: 'marie antoinette' },
            { q: 'Welche drei Ideale stehen im Mittelpunkt der Revolution (auf Deutsch, kommagetrennt)?', a: 'freiheit gleichheit brueder' },
            { q: 'Wie heisst die Erklaerung der Menschen- und Buergerrechte von 1789 (Stichwort)?', a: 'menschenrechte' },
            { q: 'Wie nennt man die radikale Phase der Revolution 1793/94?', a: 'terror' },
            { q: 'Wer war der Anfuehrer des Wohlfahrtsausschusses (Schreckensherrschaft)?', a: 'robespierre' },
            { q: 'Welches Hinrichtungsgeraet wurde zum Symbol der Revolution?', a: 'guillotine' },
            { q: 'Wie hiess die Verfassung Frankreichs von 1791 (Regierungsform)?', a: 'konstitutionelle monarchie' },

            // --- Napoleon ---
            { q: 'Wer kroente sich 1804 in Paris zum Kaiser der Franzosen?', a: 'napoleon' },
            { q: 'In welcher Schlacht 1815 wurde Napoleon endgueltig besiegt?', a: 'waterloo' },
            { q: 'Wie heisst der Vertrag von 1806, mit dem das Heilige Roemische Reich endete?', a: 'rheinbund' },
            { q: 'Welche Reformen brachte Napoleon nach Deutschland (Stichwort: Buergerrecht)?', a: 'code civil' },
            { q: 'Welche grosse Niederlage erlitt Napoleon 1812 in Russland (Stadt)?', a: 'moskau' },
            { q: 'In welcher Schlacht bei Leipzig wurde Napoleon 1813 geschlagen (Begriff)?', a: 'voelkerschlacht' },
            { q: 'Welcher Kongress ordnete Europa 1814/15 neu?', a: 'wiener kongress' },
            { q: 'Wer leitete den Wiener Kongress fuer Oesterreich?', a: 'metternich' },
            { q: 'Welcher Staatenbund entstand nach 1815 in Deutschland?', a: 'deutscher bund' },

            // --- Restauration und Vormaerz ---
            { q: 'Wie nennt man die Wiederherstellung der vorrevolutionaeren Verhaeltnisse nach 1815?', a: 'restauration' },
            { q: 'Wie heisst die Zeit zwischen Wiener Kongress und Revolution 1848 in Deutschland?', a: 'vormaerz' },
            { q: 'Welche Festversammlung 1832 forderte die deutsche Einheit (Ort)?', a: 'hambacher fest' },

            // --- Revolution 1848 ---
            { q: 'In welchem Jahr fand die deutsche Revolution mit Parlament in der Paulskirche statt?', a: '1848' },
            { q: 'In welcher Stadt tagte das erste gesamtdeutsche Parlament 1848?', a: 'frankfurt' },
            { q: 'In welchem Gebaeude tagte das Parlament 1848?', a: 'paulskirche' },
            { q: 'Welchem preussischen Koenig wurde 1849 die Kaiserkrone angeboten (der sie ablehnte)?', a: 'friedrich wilhelm iv.' },
            { q: 'Welche Verfassung schuf die Paulskirche 1849 (Stichwort)?', a: 'paulskirchenverfassung' },

            // --- Industrialisierung ---
            { q: 'In welchem Land begann die Industrielle Revolution um 1750?', a: 'england' },
            { q: 'Welche Maschine ist das Symbol der Industriellen Revolution (von Watt verbessert)?', a: 'dampfmaschine' },
            { q: 'Wer verbesserte 1769 die Dampfmaschine entscheidend?', a: 'watt' },
            { q: 'Welcher Stoff wurde zum wichtigsten Energietraeger der Industrialisierung?', a: 'kohle' },
            { q: 'In welchem deutschen Industriegebiet praegte Kohle/Stahl die Wirtschaft?', a: 'ruhrgebiet' },
            { q: 'Wer baute 1814 die erste betriebsfaehige Dampflokomotive?', a: 'stephenson' },
            { q: 'In welchem Jahr fuhr in Deutschland die erste Eisenbahn (Nuernberg-Fuerth)?', a: '1835' },
            { q: 'Welche neue Stadt-Typ entstand durch die Industrialisierung (Stichwort: Massensiedlung)?', a: 'industriestadt' },
            { q: 'Wie heisst die soziale Lage der Arbeiter im 19. Jh. (Stichwort)?', a: 'soziale frage' },
            { q: 'Welcher Denker schrieb 1848 das "Manifest der Kommunistischen Partei"?', a: 'marx' },
            { q: 'Mit welchem Mitautor schrieb Marx das Kommunistische Manifest?', a: 'engels' },
            { q: 'Welcher deutsche Industrielle praegte den Stahlbau im 19. Jh. (Essen)?', a: 'krupp' },
            { q: 'Welche neue Klasse entstand durch die Industrialisierung neben dem Buergertum?', a: 'arbeiterklasse' },
            { q: 'Welcher Sozialreformer organisierte ab 1864 die internationale Arbeiterbewegung in London (Stichwort)?', a: 'erste internationale' },

            // --- Reichsgruendung 1871 (Einstieg) ---
            { q: 'In welchem Jahr wurde das Deutsche Kaiserreich gegruendet?', a: '1871' },
            { q: 'In welchem Schloss wurde Wilhelm I. 1871 zum Kaiser ausgerufen?', a: 'versailles' },
            { q: 'Welcher preussische Ministerpraesident betrieb die Reichsgruendung?', a: 'bismarck' },
            { q: 'In welchem Krieg 1870/71 siegte Preussen vor der Reichsgruendung?', a: 'deutsch-franzoesischer krieg' },
            { q: 'Welche zwei Provinzen musste Frankreich 1871 an Deutschland abtreten (zusammen, Strichantwort)?', a: 'elsass-lothringen' },
            { q: 'Wie heisst die Politik Bismarcks gegen die katholische Kirche?', a: 'kulturkampf' },
            { q: 'Welche Sozialgesetze fuehrte Bismarck in den 1880er Jahren ein (Oberbegriff)?', a: 'sozialgesetzgebung' }
        ], 'k8', 'geschichte');
    }

    function pool_k9_geschichte() {
        // K9: Kaiserreich, WK1, Weimarer Republik, Anfaenge NS.
        return enrichSchuelerTrainingItems([
            // --- Kaiserreich ---
            { q: 'Wer war der erste deutsche Kaiser ab 1871?', a: 'wilhelm i.' },
            { q: 'Wer war Reichskanzler des Kaiserreichs bis 1890?', a: 'bismarck' },
            { q: 'Welcher Kaiser entliess 1890 Bismarck?', a: 'wilhelm ii.' },
            { q: 'Wie heisst Bismarcks System der Buendnisvertraege zur Sicherung Deutschlands?', a: 'buendnissystem' },
            { q: 'Welches Dreierbuendnis schloss Deutschland 1882 (mit wem, kommagetrennt)?', a: 'oesterreich italien' },
            { q: 'Wie nennt man die deutsche Kolonialpolitik unter Wilhelm II.?', a: 'weltpolitik' },
            { q: 'Welche grosse Flotte baute Deutschland ab 1898 auf (Stichwort)?', a: 'hochseeflotte' },
            { q: 'Welcher Marinerueststreit mit England praegte die Vorkriegszeit (Stichwort)?', a: 'flottenwettruesten' },

            // --- Erster Weltkrieg ---
            { q: 'In welchem Jahr begann der Erste Weltkrieg?', a: '1914' },
            { q: 'Welches Attentat in Sarajewo loeste den Ersten Weltkrieg aus (Opfer)?', a: 'franz ferdinand' },
            { q: 'In welcher Stadt wurde Franz Ferdinand 1914 ermordet?', a: 'sarajewo' },
            { q: 'Welche zwei Buendnisse standen sich 1914 gegenueber (Mittelmaechte vs.)?', a: 'entente' },
            { q: 'In welchem Land lag die wichtigste Westfront-Schlacht 1916 (Verdun)?', a: 'frankreich' },
            { q: 'Wie heisst die grosse franzoesische Festung, die 1916 monatelang umkaempft war?', a: 'verdun' },
            { q: 'Welcher Plan sah einen schnellen Angriff auf Frankreich vor (1914)?', a: 'schlieffen-plan' },
            { q: 'Welche neue Waffe pruefte die Schlacht an der Somme 1916?', a: 'panzer' },
            { q: 'In welchem Jahr traten die USA in den Ersten Weltkrieg ein?', a: '1917' },
            { q: 'In welchem Jahr endete der Erste Weltkrieg?', a: '1918' },
            { q: 'In welchem Wald wurde 1918 der Waffenstillstand unterzeichnet?', a: 'compiegne' },
            { q: 'Wie heisst der Friedensvertrag, der 1919 Deutschland Bedingungen auferlegte?', a: 'versailler vertrag' },
            { q: 'Welche Kriegsschuld-Klausel wurde im Versailler Vertrag festgeschrieben (Artikel-Nummer)?', a: '231' },
            { q: 'Welche grossen Reparationen musste Deutschland nach 1919 zahlen (Stichwort)?', a: 'reparationen' },

            // --- Russische Revolution ---
            { q: 'In welchem Jahr fand die Oktoberrevolution in Russland statt?', a: '1917' },
            { q: 'Wer fuehrte die Bolschewiki an?', a: 'lenin' },
            { q: 'Welche Familie wurde 1918 als Zarenfamilie hingerichtet?', a: 'romanow' },
            { q: 'Welches neue Staatsgebilde entstand 1922 aus Russland?', a: 'sowjetunion' },

            // --- Weimarer Republik ---
            { q: 'In welcher Stadt tagte die deutsche Nationalversammlung 1919?', a: 'weimar' },
            { q: 'Wer war der erste Reichspraesident der Weimarer Republik?', a: 'ebert' },
            { q: 'Welcher Reichspraesident folgte 1925 auf Ebert?', a: 'hindenburg' },
            { q: 'Welcher Putschversuch fand 1920 in Berlin statt (Name)?', a: 'kapp-putsch' },
            { q: 'Welcher Putschversuch fand 1923 in Muenchen statt (Anfuehrer Hitler)?', a: 'hitler-putsch' },
            { q: 'Wie heisst die Inflationskrise 1923 (Stichwort: Wert der Mark)?', a: 'hyperinflation' },
            { q: 'Welcher Politiker stabilisierte 1923/24 die deutsche Waehrung als Reichskanzler?', a: 'stresemann' },
            { q: 'Welche Goldene Zwanziger nennt man die Bluetezeit der Weimarer Republik (Jahre, ab ...)?', a: '1924' },
            { q: 'Welcher Weltwirtschaftskrise begann 1929 in den USA (Stichwort: New York)?', a: 'boersencrash' },
            { q: 'In welchem Jahr begann die grosse Weltwirtschaftskrise?', a: '1929' },

            // --- Aufstieg NS / Machtergreifung ---
            { q: 'In welchem Jahr wurde Hitler zum Reichskanzler ernannt?', a: '1933' },
            { q: 'Wer ernannte Hitler 1933 zum Reichskanzler?', a: 'hindenburg' },
            { q: 'Welche Partei nannte Hitler "NSDAP" (Vollname: Nationalsozialistische ...)?', a: 'nationalsozialistische deutsche arbeiterpartei' },
            { q: 'Welche Gewaltorganisation der NSDAP entstand bereits 1921 (Sturmabteilung)?', a: 'sa' },
            { q: 'Welche Eliteeinheit baute Himmler ab 1929 auf?', a: 'ss' },
            { q: 'Welches Gesetz schaltete 1933 das Parlament aus?', a: 'ermaechtigungsgesetz' },
            { q: 'Welcher Reichstagsbrand 1933 wurde als Vorwand fuer Notverordnungen genutzt (Stadt)?', a: 'berlin' },
            { q: 'Wie nennt man die antijuedischen Gesetze 1935 (Stadt)?', a: 'nuernberger gesetze' },
            { q: 'Welche Reichsweite Pogromnacht fand am 9./10. November 1938 statt?', a: 'reichspogromnacht' },
            { q: 'Wie hiess der Geheime Staatspolizei der NS (Abkuerzung)?', a: 'gestapo' },
            { q: 'Welches Konzentrationslager wurde 1933 als erstes errichtet (bei Muenchen)?', a: 'dachau' },
            { q: 'In welchem Vertrag 1938 erlaubten Frankreich/UK Deutschland die Annexion des Sudetenlands?', a: 'muenchner abkommen' }
        ], 'k9', 'geschichte');
    }

    function pool_k10_geschichte() {
        // K10: WK2, Shoah, geteiltes Deutschland, Kalter Krieg, Wiedervereinigung, Globalisierung.
        return enrichSchuelerTrainingItems([
            // --- Zweiter Weltkrieg ---
            { q: 'In welchem Jahr begann der Zweite Weltkrieg?', a: '1939' },
            { q: 'Mit dem Ueberfall auf welches Land begann der Zweite Weltkrieg?', a: 'polen' },
            { q: 'Welcher Nichtangriffspakt 1939 ermoeglichte den Krieg gegen Polen?', a: 'hitler-stalin-pakt' },
            { q: 'Welches Land erlitt 1940 die Niederlage gegen Deutschland binnen sechs Wochen?', a: 'frankreich' },
            { q: 'Welcher Luftkrieg 1940 gegen Grossbritannien scheiterte (Stichwort)?', a: 'luftschlacht um england' },
            { q: 'In welchem Jahr begann der deutsche Ueberfall auf die Sowjetunion (Unternehmen Barbarossa)?', a: '1941' },
            { q: 'Welche Schlacht 1942/43 markierte die Wende im Osten?', a: 'stalingrad' },
            { q: 'In welcher Konferenz 1942 wurde die "Endloesung" beschlossen?', a: 'wannsee-konferenz' },
            { q: 'Wie nennt man den Voelkermord an den europaeischen Juden?', a: 'shoah' },
            { q: 'Etwa wie viele Juden ermordete der NS-Staat (gerundet in Millionen)?', a: '6' },
            { q: 'Welches Vernichtungslager im besetzten Polen ist das bekannteste Symbol der Shoah?', a: 'auschwitz' },
            { q: 'Mit welcher Landung in der Normandie eroeffneten die Alliierten 1944 die zweite Front?', a: 'd-day' },
            { q: 'Welches Datum ist der D-Day (Tag-Monat-Jahr)?', a: '6.6.1944' },
            { q: 'In welchem Monat 1945 endete der Krieg in Europa?', a: 'mai' },
            { q: 'An welchem Tag 1945 wurde in Berlin die bedingungslose Kapitulation unterzeichnet?', a: '8.5.1945' },
            { q: 'Welche Atombombenstaedte beendeten den Krieg in Asien (Stadt 1)?', a: 'hiroshima' },
            { q: 'Welche Atombombenstaedte beendeten den Krieg in Asien (Stadt 2)?', a: 'nagasaki' },
            { q: 'In welchem Jahr endete der Zweite Weltkrieg endgueltig?', a: '1945' },

            // --- Nachkriegszeit / Besatzung ---
            { q: 'In wie viele Besatzungszonen wurde Deutschland 1945 eingeteilt?', a: '4' },
            { q: 'Welche vier Besatzungsmaechte teilten Deutschland (Mitgliedsland mit eigenem Sektor in Berlin: UdSSR, USA, UK und ...)?', a: 'frankreich' },
            { q: 'In welcher Konferenz 1945 wurde die Nachkriegsordnung beschlossen (Schloss bei Berlin)?', a: 'potsdam' },
            { q: 'In welchen Prozessen 1945/46 wurden NS-Hauptverbrecher angeklagt (Stadt)?', a: 'nuernberg' },

            // --- Zwei deutsche Staaten ---
            { q: 'In welchem Jahr wurden Bundesrepublik und DDR gegruendet?', a: '1949' },
            { q: 'Wer war der erste Bundeskanzler der BRD?', a: 'adenauer' },
            { q: 'Welcher Politiker praegte die Sozialdemokratie der BRD (Wirtschaftswunder)?', a: 'erhard' },
            { q: 'Welcher Staatschef leitete die DDR von 1949 bis 1971?', a: 'ulbricht' },
            { q: 'Welcher Staatschef folgte 1971 in der DDR auf Ulbricht?', a: 'honecker' },
            { q: 'Welche Partei dominierte die DDR?', a: 'sed' },
            { q: 'Wie heisst die Berliner Blockade-Versorgung der West-Sektoren 1948/49?', a: 'luftbruecke' },
            { q: 'Welcher Volksaufstand erschuetterte 1953 die DDR (Datum)?', a: '17. juni' },
            { q: 'In welchem Jahr wurde die Berliner Mauer gebaut?', a: '1961' },
            { q: 'In welche militaerische Allianz trat die BRD 1955 ein?', a: 'nato' },
            { q: 'In welcher Allianz war die DDR Mitglied?', a: 'warschauer pakt' },
            { q: 'Welcher Bundeskanzler praegte die "Ostpolitik" der Annaeherung?', a: 'brandt' },
            { q: 'Wie hiess der Vertrag 1972 zwischen BRD und DDR?', a: 'grundlagenvertrag' },

            // --- Kalter Krieg ---
            { q: 'Wie nennt man den Konflikt USA vs. UdSSR nach 1945?', a: 'kalter krieg' },
            { q: 'Welche Krise 1962 brachte die Welt an den Rand eines Atomkriegs?', a: 'kubakrise' },
            { q: 'Welcher Krieg fuehrte 1965-1973 zu massiver US-Intervention in Suedostasien?', a: 'vietnamkrieg' },
            { q: 'Welche politische Doktrin Reagans pflegte den Ruestungswettlauf der 1980er (Stichwort)?', a: 'sdi' },

            // --- Wiedervereinigung ---
            { q: 'In welchem Jahr fiel die Berliner Mauer?', a: '1989' },
            { q: 'Welcher Tag im November 1989 ist Mauerfall-Datum?', a: '9.11.1989' },
            { q: 'In welchem Jahr wurde Deutschland wiedervereinigt?', a: '1990' },
            { q: 'An welchem Datum 1990 trat die DDR der BRD bei?', a: '3.10.1990' },
            { q: 'Welcher Bundeskanzler praegte die Wiedervereinigung?', a: 'kohl' },
            { q: 'Welcher Vertrag 1990 regelte die internationale Anerkennung der Wiedervereinigung (Format)?', a: 'zwei-plus-vier-vertrag' },
            { q: 'Welcher sowjetische Reformer ermoeglichte die Wiedervereinigung (Glasnost/Perestroika)?', a: 'gorbatschow' },
            { q: 'Wie nannte man die friedliche Revolution in der DDR 1989?', a: 'friedliche revolution' },
            { q: 'Welche Stadt war 1989 ein zentraler Ort der Montagsdemonstrationen?', a: 'leipzig' },

            // --- Europa & Globalisierung ---
            { q: 'In welchem Jahr trat die BRD der Europaeischen Gemeinschaft bei (Gruendungsmitglied: Roemische Vertraege)?', a: '1957' },
            { q: 'Welcher Vertrag begruendete 1992 die Europaeische Union?', a: 'maastricht' },
            { q: 'In welchem Jahr wurde der Euro als Bargeld eingefuehrt?', a: '2002' },
            { q: 'In welchem Jahr fanden die Anschlaege auf das World Trade Center statt?', a: '2001' }
        ], 'k10', 'geschichte');
    }

    // ---------- Klasse 4: Mathematik (Pool) ----------
    // Großes Einmaleins / Halbschriftliches Multiplizieren (zweistellig × einstellig),
    // schriftliche Multiplikation / Division mit Rest, Sachaufgaben (einfach).
    function pool_klasse4_mathe() {
        const out = [];
        // Halbschriftliches Multiplizieren: zweistellig × einstellig
        for (let a = 12; a <= 99; a += 7) {
            for (let b = 2; b <= 9; b++) {
                out.push({ q: `${a} · ${b} = ?`, a: String(a * b) });
            }
        }
        // Schriftliches Dividieren ohne Rest (Klasse 4 üblich)
        const divs = [
            [144, 12], [180, 15], [196, 14], [225, 15], [256, 16], [288, 12],
            [324, 18], [360, 24], [432, 18], [504, 21], [576, 24], [648, 27],
            [225, 9], [343, 7], [432, 8], [486, 6], [539, 7], [612, 9]
        ];
        divs.forEach(([x, y]) => out.push({ q: `${x} : ${y} = ?`, a: String(x / y) }));
        // Schriftliches Dividieren mit Rest (Antwort als "qRr", z.B. 7R3)
        const divsR = [
            [25, 4], [37, 5], [44, 6], [58, 7], [83, 9], [97, 8],
            [125, 12], [148, 11], [167, 13], [199, 14], [221, 15], [253, 16]
        ];
        divsR.forEach(([x, y]) => {
            const q = Math.floor(x / y);
            const r = x - q * y;
            // Antwortformat tolerant: "qRr" oder "q R r"
            out.push({ q: `${x} : ${y} = ?  (Form: ${q >= 1 ? 'ZahlR' : ''}Rest, z.B. 7R3)`, a: `${q}R${r}` });
        });
        // Einfache Sachaufgaben
        out.push(
            { q: 'Eine Tafel Schokolade wiegt 100 g. Wie viel wiegen 7 Tafeln zusammen (in Gramm)?', a: '700' },
            { q: 'In einer Klasse sind 24 Kinder. Sie sollen in 4er-Gruppen eingeteilt werden. Wie viele Gruppen entstehen?', a: '6' },
            { q: 'Ein Auto fährt 60 km in einer Stunde. Wie viele km schafft es in 4 Stunden?', a: '240' },
            { q: 'Anna kauft 3 Hefte zu je 2 Euro und einen Stift für 1 Euro. Was zahlt sie insgesamt (in Euro)?', a: '7' },
            { q: 'Tim hat 1000 g Apfel. Er gibt 350 g ab. Wie viel bleibt (in Gramm)?', a: '650' },
            { q: 'Eine Pizza wird in 8 Stücke geteilt. Wie viele Pizzen brauchen 24 Kinder, wenn jedes 1 Stück bekommt?', a: '3' }
        );
        return out;
    }

    window.SCHUELER = {
        classes: [
            { id: 'k1',  label: 'Klasse 1',  subjects: ['mathe'] },
            { id: 'k2',  label: 'Klasse 2',  subjects: ['mathe'] },
            { id: 'k3',  label: 'Klasse 3',  subjects: ['mathe'] },
            { id: 'k4',  label: 'Klasse 4',  subjects: ['mathe'] },
            { id: 'k5',  label: 'Klasse 5',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie', 'geschichte'] },
            { id: 'k6',  label: 'Klasse 6',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie', 'geschichte'] },
            { id: 'k7',  label: 'Klasse 7',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie', 'geschichte'] },
            { id: 'k8',  label: 'Klasse 8',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie', 'geschichte'] },
            { id: 'k9',  label: 'Klasse 9',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie', 'geschichte'] },
            { id: 'k10', label: 'Klasse 10', subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie', 'geschichte'] }
        ],
        subjects: {
            mathe: { label: 'Mathematik' },
            englisch: { label: 'Englisch' },
            physik: { label: 'Physik' },
            chemie: { label: 'Chemie' },
            biologie: { label: 'Biologie' },
            geschichte: { label: 'Geschichte' }
        },
        // mode: 'generated' → gen() liefert beliebig viele Aufgaben.
        //       'pool'      → 10 Aufgaben werden zufällig aus pool gezogen (ohne Wiederholung im Set).
        //       'stub'      → noch nicht implementiert (UI zeigt Hinweis).
        content: {
            'k1.mathe':  { mode: 'generated', gen: gen_klasse1_mathe,
                           note: 'Zahlenraum bis 20 — Plus und Minus, kleiner Anteil mit Zehnerübergang.' },
            'k2.mathe':  { mode: 'generated', gen: gen_klasse2_mathe,
                           note: 'Zahlenraum bis 100 — Plus, Minus und Vorübung Einmaleins (×2, ×5, ×10).' },
            'k3.mathe':  { mode: 'pool', pool: pool_klasse3_mathe(),
                           note: 'Kleines Einmaleins, Geteilt-Aufgaben, schriftliche Addition/Subtraktion bis 1000. Bitte handschriftlich rechnen, nur Endergebnis eintragen.' },
            'k4.mathe':  { mode: 'pool', pool: pool_klasse4_mathe(),
                           note: 'Halbschriftliches und schriftliches Multiplizieren/Dividieren, Sachaufgaben. Bitte handschriftlich rechnen.' },
            'k5.mathe':  { mode: 'pool', pool: pool_k5_mathe(),
                           note: 'Mathematik Klasse 5: Rechnen mit natuerlichen Zahlen, Bruechen, Dezimalzahlen, Groessen und Rechtecken — 100er Pool mit Training und 10-Fragen-Quiz.' },
            'k5.englisch': { mode: 'stub' },
            'k5.physik':   { mode: 'pool', pool: pool_k5_physik(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Magnetismus, einfacher Stromkreis, Licht & Schatten, Temperatur — erweiterter Rahmenplan-Pool.' },
            'k5.chemie':   { mode: 'pool', pool: pool_k5_chemie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Stoffe & Eigenschaften, Aggregatzustaende, Wasser & Luft — erweiterter Rahmenplan-Pool.' },
            'k5.biologie': { mode: 'pool', pool: pool_k5_biologie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Pflanzen, Tiere und Mensch — Einstieg in die Biologie — erweiterter Rahmenplan-Pool.' },
            'k6.mathe':  { mode: 'pool', pool: pool_k6_mathe(),
                           note: 'Mathematik Klasse 6: Bruchteile, Prozentrechnung, ganze Zahlen, Gleichungen und Dreiecksgeometrie — 100er Pool mit Training und 10-Fragen-Quiz.' },
            'k6.englisch': { mode: 'stub' },
            'k6.physik':   { mode: 'pool', pool: pool_k6_physik(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Optik (Reflexion, Linsen, Farben), Schall, Waermetransport — erweiterter Rahmenplan-Pool.' },
            'k6.chemie':   { mode: 'pool', pool: pool_k6_chemie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Stofftrennung (Filtrieren, Destillieren, Chromatographie), Indikatoren, Reinstoffe — erweiterter Rahmenplan-Pool.' },
            'k6.biologie': { mode: 'pool', pool: pool_k6_biologie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Mensch, Wirbeltiere, oekologische Grundbegriffe — erweiterter Rahmenplan-Pool.' },
            'k7.mathe':  { mode: 'pool', pool: pool_k7_mathe(),
                           note: 'Mathematik Klasse 7: lineare Gleichungen, Proportionalitaet, Prozentrechnung, lineare Funktionen und Terme — 100er Pool mit Training und 10-Fragen-Quiz.' },
            'k7.englisch': { mode: 'stub' },
            'k7.physik':   { mode: 'pool', pool: pool_k7_physik(),
                             note: 'NRW-KLP Physik SI Klasse 7/8: Mechanik-Grundlagen (Geschwindigkeit, Kraft, Dichte, Einheiten) — Endergebnis ohne Einheit eintragen.' },
            'k7.chemie':   { mode: 'pool', pool: pool_k7_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 7/8: Aggregatzustaende, Summenformeln, Stoffeigenschaften — erweiterter Rahmenplan-Pool.' },
            'k7.biologie': { mode: 'pool', pool: pool_k7_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 7/8: Zelle, Oekosystem, Pflanzen vertieft — erweiterter Rahmenplan-Pool.' },
            'k8.mathe':  { mode: 'pool', pool: pool_k8_mathe(),
                           note: 'Mathematik Klasse 8: Steigung, Gleichungssysteme, Pythagoras, Potenzen und binomische Formeln — 100er Pool mit Training und 10-Fragen-Quiz.' },
            'k8.englisch': { mode: 'stub' },
            'k8.physik':   { mode: 'pool', pool: pool_k8_physik(),
                             note: 'NRW-KLP Physik SI Klasse 7/8: Elektrik (Ohmsches Gesetz, Reihen-/Parallelschaltung), Arbeit & Leistung — Endergebnis ohne Einheit.' },
            'k8.chemie':   { mode: 'pool', pool: pool_k8_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 7/8: Atombau, Periodensystem-Grundlagen, einfache Summenformeln — erweiterter Rahmenplan-Pool.' },
            'k8.biologie': { mode: 'pool', pool: pool_k8_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 7/8: Atmung, Verdauung, Blutkreislauf — erweiterter Rahmenplan-Pool.' },
            'k9.mathe':  { mode: 'pool', pool: pool_k9_mathe(),
                           note: 'Mathematik Klasse 9: quadratische Gleichungen, Trigonometrie, Wahrscheinlichkeit, Aehnlichkeit und Statistik — 100er Pool mit Training und 10-Fragen-Quiz.' },
            'k9.englisch': { mode: 'stub' },
            'k9.physik':   { mode: 'pool', pool: pool_k9_physik(),
                             note: 'NRW-KLP Physik SI Klasse 9/10: Newton, Energie, Elektromagnetismus, Druck — Endergebnis ohne Einheit.' },
            'k9.chemie':   { mode: 'pool', pool: pool_k9_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 9/10: pH-Wert, Saeuren & Basen, Neutralisation, Ionenbindung — erweiterter Rahmenplan-Pool.' },
            'k9.biologie': { mode: 'pool', pool: pool_k9_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 9/10: Genetik-Grundlagen (DNA, Mitose, Meiose), Evolution — erweiterter Rahmenplan-Pool.' },
            'k10.mathe': { mode: 'pool', pool: pool_k10_mathe(),
                           note: 'Mathematik Klasse 10: Exponentialfunktionen, Potenzen, Trigonometrie, Koerpergeometrie und quadratische Gleichungen — 100er Pool mit Training und 10-Fragen-Quiz.' },
            'k10.englisch': { mode: 'stub' },
            'k10.physik':   { mode: 'pool', pool: pool_k10_physik(),
                             note: 'NRW-KLP Physik SI Klasse 9/10: Atombau, Radioaktivitaet, Optik — erweiterter Rahmenplan-Pool; Endergebnis ohne Einheit.' },
            'k10.chemie':   { mode: 'pool', pool: pool_k10_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 9/10: Organische Chemie — Einstieg (Alkane, Alkohole, Carbonsaeuren) — erweiterter Rahmenplan-Pool.' },
            'k10.biologie': { mode: 'pool', pool: pool_k10_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 9/10: Molekularbiologie (DNA/RNA, Proteinbiosynthese), Biodiversitaet — erweiterter Rahmenplan-Pool.' },
            'k5.geschichte':  { mode: 'pool', pool: pool_k5_geschichte(),
                                note: 'NRW-KLP Geschichte SI Klasse 5/6: Steinzeit, Altes Aegypten, Antikes Griechenland, Roemisches Reich — Einstieg in die Geschichte.' },
            'k6.geschichte':  { mode: 'pool', pool: pool_k6_geschichte(),
                                note: 'NRW-KLP Geschichte SI Klasse 5/6: Roemisches Reich vertieft, Voelkerwanderung, Mittelalter (Karl der Grosse, Lehnswesen, Stadt, Hanse, Kreuzzuege).' },
            'k7.geschichte':  { mode: 'pool', pool: pool_k7_geschichte(),
                                note: 'NRW-KLP Geschichte SI Klasse 7/8: Renaissance, Entdeckungen, Reformation, Dreissigjaehriger Krieg, Absolutismus, Aufklaerung.' },
            'k8.geschichte':  { mode: 'pool', pool: pool_k8_geschichte(),
                                note: 'NRW-KLP Geschichte SI Klasse 7/8: Franzoesische Revolution, Napoleon, Restauration, 1848, Industrialisierung, Reichsgruendung 1871.' },
            'k9.geschichte':  { mode: 'pool', pool: pool_k9_geschichte(),
                                note: 'NRW-KLP Geschichte SI Klasse 9/10: Kaiserreich, Erster Weltkrieg, Russische Revolution, Weimarer Republik, Aufstieg des Nationalsozialismus.' },
            'k10.geschichte': { mode: 'pool', pool: pool_k10_geschichte(),
                                note: 'NRW-KLP Geschichte SI Klasse 9/10: Zweiter Weltkrieg, Shoah, Nachkriegszeit, geteiltes Deutschland, Kalter Krieg, Wiedervereinigung 1989/90, Globalisierung.' }
        },
        // Antwort-Vergleich (tolerant): trim + Komma->Punkt + Kleinschreibung; "R" Groß/klein egal.
        normalize: function (s) {
            return String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
        }
    };
})();
