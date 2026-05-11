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

    // ---------- Mittelstufe: Naturwissenschaften (50er Pools, AGENTS §17) ----------
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

    function withNatwiTopup(base, classId, subject) {
        const byClass = NATWI_TOPUPS[classId] || {};
        return base.concat(byClass[subject] || []);
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
            { q: 'Welcher Aggregatzustand hat Wasser bei $25\\,^\\circ\\text{C}$ und Normaldruck?', a: 'fluessig' },
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
            { q: 'Welchen pH-Wert hat eine neutrale waessrige Loesung bei $25\\,^\\circ\\text{C}$?', a: '7' },
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
            { id: 'k5',  label: 'Klasse 5',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie'] },
            { id: 'k6',  label: 'Klasse 6',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie'] },
            { id: 'k7',  label: 'Klasse 7',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie'] },
            { id: 'k8',  label: 'Klasse 8',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie'] },
            { id: 'k9',  label: 'Klasse 9',  subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie'] },
            { id: 'k10', label: 'Klasse 10', subjects: ['mathe', 'englisch', 'physik', 'chemie', 'biologie'] }
        ],
        subjects: {
            mathe: { label: 'Mathematik' },
            englisch: { label: 'Englisch' },
            physik: { label: 'Physik' },
            chemie: { label: 'Chemie' },
            biologie: { label: 'Biologie' }
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
            'k5.mathe':  { mode: 'stub' },
            'k5.englisch': { mode: 'stub' },
            'k5.physik':   { mode: 'pool', pool: pool_k5_physik(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Magnetismus, einfacher Stromkreis, Licht & Schatten, Temperatur — 50er Pool.' },
            'k5.chemie':   { mode: 'pool', pool: pool_k5_chemie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Stoffe & Eigenschaften, Aggregatzustaende, Wasser & Luft — 50er Pool.' },
            'k5.biologie': { mode: 'pool', pool: pool_k5_biologie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Pflanzen, Tiere und Mensch — Einstieg in die Biologie — 50er Pool.' },
            'k6.mathe':  { mode: 'stub' },
            'k6.englisch': { mode: 'stub' },
            'k6.physik':   { mode: 'pool', pool: pool_k6_physik(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Optik (Reflexion, Linsen, Farben), Schall, Waermetransport — 50er Pool.' },
            'k6.chemie':   { mode: 'pool', pool: pool_k6_chemie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Stofftrennung (Filtrieren, Destillieren, Chromatographie), Indikatoren, Reinstoffe — 50er Pool.' },
            'k6.biologie': { mode: 'pool', pool: pool_k6_biologie(),
                             note: 'NRW-KLP NW SI Klasse 5/6: Mensch, Wirbeltiere, oekologische Grundbegriffe — 50er Pool.' },
            'k7.mathe':  { mode: 'stub' },
            'k7.englisch': { mode: 'stub' },
            'k7.physik':   { mode: 'pool', pool: pool_k7_physik(),
                             note: 'NRW-KLP Physik SI Klasse 7/8: Mechanik-Grundlagen (Geschwindigkeit, Kraft, Dichte, Einheiten) — Endergebnis ohne Einheit eintragen.' },
            'k7.chemie':   { mode: 'pool', pool: pool_k7_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 7/8: Aggregatzustaende, Summenformeln, Stoffeigenschaften — 50er Pool.' },
            'k7.biologie': { mode: 'pool', pool: pool_k7_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 7/8: Zelle, Oekosystem, Pflanzen vertieft — 50er Pool.' },
            'k8.mathe':  { mode: 'stub' },
            'k8.englisch': { mode: 'stub' },
            'k8.physik':   { mode: 'pool', pool: pool_k8_physik(),
                             note: 'NRW-KLP Physik SI Klasse 7/8: Elektrik (Ohmsches Gesetz, Reihen-/Parallelschaltung), Arbeit & Leistung — Endergebnis ohne Einheit.' },
            'k8.chemie':   { mode: 'pool', pool: pool_k8_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 7/8: Atombau, Periodensystem-Grundlagen, einfache Summenformeln — 50er Pool.' },
            'k8.biologie': { mode: 'pool', pool: pool_k8_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 7/8: Atmung, Verdauung, Blutkreislauf — 50er Pool.' },
            'k9.mathe':  { mode: 'stub' },
            'k9.englisch': { mode: 'stub' },
            'k9.physik':   { mode: 'pool', pool: pool_k9_physik(),
                             note: 'NRW-KLP Physik SI Klasse 9/10: Newton, Energie, Elektromagnetismus, Druck — Endergebnis ohne Einheit.' },
            'k9.chemie':   { mode: 'pool', pool: pool_k9_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 9/10: pH-Wert, Saeuren & Basen, Neutralisation, Ionenbindung — 50er Pool.' },
            'k9.biologie': { mode: 'pool', pool: pool_k9_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 9/10: Genetik-Grundlagen (DNA, Mitose, Meiose), Evolution — 50er Pool.' },
            'k10.mathe': { mode: 'stub' },
            'k10.englisch': { mode: 'stub' },
            'k10.physik':   { mode: 'pool', pool: pool_k10_physik(),
                             note: 'NRW-KLP Physik SI Klasse 9/10: Atombau, Radioaktivitaet, Optik — 50er Pool; Endergebnis ohne Einheit.' },
            'k10.chemie':   { mode: 'pool', pool: pool_k10_chemie(),
                             note: 'NRW-KLP Chemie SI Klasse 9/10: Organische Chemie — Einstieg (Alkane, Alkohole, Carbonsaeuren) — 50er Pool.' },
            'k10.biologie': { mode: 'pool', pool: pool_k10_biologie(),
                             note: 'NRW-KLP Biologie SI Klasse 9/10: Molekularbiologie (DNA/RNA, Proteinbiosynthese), Biodiversitaet — 50er Pool.' }
        },
        // Antwort-Vergleich (tolerant): trim + Komma->Punkt + Kleinschreibung; "R" Groß/klein egal.
        normalize: function (s) {
            return String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
        }
    };
})();
