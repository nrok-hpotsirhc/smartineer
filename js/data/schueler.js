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

    // ---------- Mittelstufe: Naturwissenschaften (Skeletons, AGENTS §17) ----------
    // Klasse 5–10: Physik, Chemie, Biologie als kuratierte Pools.
    // Inhalte sind handgeprueft (Standardlehrplaene Mittelstufe DE) und enthalten
    // Formeln via KaTeX ($...$). Antworten sind kurze Strings — die Drill-UI vergleicht
    // ueber `normalize()` (trim, whitespace weg, Komma→Punkt, Kleinschreibung).
    // Endergebnisse werden ohne Einheit eingegeben, die Aufgabe sagt das jeweils.

    function pool_k5_biologie() {
        return [
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
        ];
    }

    function pool_k6_biologie() {
        return [
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
        ];
    }

    function pool_k7_physik() {
        return [
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
        ];
    }

    function pool_k7_chemie() {
        return [
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
        ];
    }

    function pool_k7_biologie() {
        return [
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
        ];
    }

    function pool_k8_physik() {
        return [
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
        ];
    }

    function pool_k8_chemie() {
        return [
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
        ];
    }

    function pool_k8_biologie() {
        return [
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
        ];
    }

    function pool_k9_physik() {
        return [
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
        ];
    }

    function pool_k9_chemie() {
        return [
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
        ];
    }

    function pool_k9_biologie() {
        return [
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
        ];
    }

    function pool_k10_physik() {
        return [
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
        ];
    }

    function pool_k10_chemie() {
        return [
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
        ];
    }

    function pool_k10_biologie() {
        return [
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
        ];
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
            { id: 'k5',  label: 'Klasse 5',  subjects: ['mathe', 'englisch', 'biologie'] },
            { id: 'k6',  label: 'Klasse 6',  subjects: ['mathe', 'englisch', 'biologie'] },
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
            'k5.biologie': { mode: 'pool', pool: pool_k5_biologie(),
                             note: 'Pflanzen, Tiere und Mensch — Einstieg in die Biologie (Skeleton, AGENTS §17.4).' },
            'k6.mathe':  { mode: 'stub' },
            'k6.englisch': { mode: 'stub' },
            'k6.biologie': { mode: 'pool', pool: pool_k6_biologie(),
                             note: 'Mensch, Wirbeltiere, oekologische Grundbegriffe (Skeleton).' },
            'k7.mathe':  { mode: 'stub' },
            'k7.englisch': { mode: 'stub' },
            'k7.physik':   { mode: 'pool', pool: pool_k7_physik(),
                             note: 'Mechanik-Grundlagen (Geschwindigkeit, Kraft, Dichte, Einheiten) — Endergebnis ohne Einheit eintragen.' },
            'k7.chemie':   { mode: 'pool', pool: pool_k7_chemie(),
                             note: 'Aggregatzustaende, Summenformeln, Stoffeigenschaften (Skeleton).' },
            'k7.biologie': { mode: 'pool', pool: pool_k7_biologie(),
                             note: 'Zelle, Oekosystem, Pflanzen vertieft (Skeleton).' },
            'k8.mathe':  { mode: 'stub' },
            'k8.englisch': { mode: 'stub' },
            'k8.physik':   { mode: 'pool', pool: pool_k8_physik(),
                             note: 'Elektrik (Ohmsches Gesetz, Reihen-/Parallelschaltung), Arbeit & Leistung — Endergebnis ohne Einheit.' },
            'k8.chemie':   { mode: 'pool', pool: pool_k8_chemie(),
                             note: 'Atombau, Periodensystem-Grundlagen, einfache Summenformeln (Skeleton).' },
            'k8.biologie': { mode: 'pool', pool: pool_k8_biologie(),
                             note: 'Atmung, Verdauung, Blutkreislauf (Skeleton).' },
            'k9.mathe':  { mode: 'stub' },
            'k9.englisch': { mode: 'stub' },
            'k9.physik':   { mode: 'pool', pool: pool_k9_physik(),
                             note: 'Newton, Energie, Elektromagnetismus, Druck — Endergebnis ohne Einheit.' },
            'k9.chemie':   { mode: 'pool', pool: pool_k9_chemie(),
                             note: 'pH-Wert, Saeuren & Basen, Neutralisation, Ionenbindung (Skeleton).' },
            'k9.biologie': { mode: 'pool', pool: pool_k9_biologie(),
                             note: 'Genetik-Grundlagen (DNA, Mitose, Meiose), Evolution (Skeleton).' },
            'k10.mathe': { mode: 'stub' },
            'k10.englisch': { mode: 'stub' },
            'k10.physik':   { mode: 'pool', pool: pool_k10_physik(),
                             note: 'Atombau, Radioaktivitaet, Optik (Skeleton) — Endergebnis ohne Einheit.' },
            'k10.chemie':   { mode: 'pool', pool: pool_k10_chemie(),
                             note: 'Organische Chemie — Einstieg (Alkane, Alkohole, Carbonsaeuren) (Skeleton).' },
            'k10.biologie': { mode: 'pool', pool: pool_k10_biologie(),
                             note: 'Molekularbiologie (DNA/RNA, Proteinbiosynthese), Biodiversitaet (Skeleton).' }
        },
        // Antwort-Vergleich (tolerant): trim + Komma->Punkt + Kleinschreibung; "R" Groß/klein egal.
        normalize: function (s) {
            return String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
        }
    };
})();
