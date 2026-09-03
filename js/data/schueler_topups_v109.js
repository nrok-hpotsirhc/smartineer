/*
 * Schueler-Top-up v109 — kuratierte Zusatzaufgaben Klasse 5-10
 * (Arbeitspaket P-DATA-SCHUELER-5-10-PLUS)
 *
 * Architektur:
 *   - Wird NACH js/data/schueler.js und js/data/schueler_200_topups.js geladen und
 *     erweitert window.SCHUELER append-only. Bestehende Items werden weder
 *     umsortiert noch veraendert (Schueler-Progress haengt an stableQid({q,a})).
 *   - Jede Aufgabe liefert {q, a, f, s}; Deutsch-Items tragen zusaetzlich das
 *     section-Feld (AGENTS §17.4), alle anderen Faecher werden von der UI-
 *     Heuristik (deriveSection in js/app/schueler.jsx) eingeordnet.
 *   - Fragen sind Plain-Text/HTML ohne User-Input, Antworten kurze Strings.
 *
 * Fachliche Grundlage (jeweils aktuelle Fassung):
 *   - NRW-Kernlehrplaene Sekundarstufe I: Mathematik, Deutsch, Naturwissenschaften
 *     (Kl. 5/6), Physik, Chemie, Biologie, Geschichte.
 *   - Fachliche Standardwerke fuer Zahlwerte: CODATA/NIST-Konstanten (g, c),
 *     IUPAC-Nomenklatur (Summenformeln), gaengige Schulbuchkonventionen fuer
 *     Rundungen (pi = 3.14, g = 9.81 N/kg), sofern in der Frage benannt.
 *
 * Ehrlichkeitsgrenze:
 *   - Kernlehrplaene geben Kompetenzen und Themenfelder vor, keine verbindliche
 *     Aufgabenliste. Die Auswahl ist curriculum-orientiert, nicht lehrwerksgleich.
 */
(function () {
    const SCH = window.SCHUELER;
    if (!SCH) return;

    // ---------------------------------------------------------------- normalize
    // P-DATA-SCHUELER-NORMALIZE-DECIMAL (v109): Bis v108 entfernte die
    // Normalisierung erst alle Punkte und wandelte danach Kommas in Punkte um.
    // Folge: die hinterlegte Antwort "0.5" wurde zu "05", die Schuelereingabe
    // "0,5" aber zu "0.5" — Dezimalantworten konnten nie uebereinstimmen.
    // Fix: Dezimaltrenner zwischen zwei Ziffern wird geschuetzt und einheitlich
    // auf "." normiert; alle uebrigen Satzzeichen fallen wie bisher weg.
    const DECIMAL_GUARD = '\u0001';
    const previousNormalize = typeof SCH.normalize === 'function' ? SCH.normalize : null;
    SCH.normalize = function (value) {
        const guarded = String(value == null ? '' : value)
            .replace(/(\d)\s*[.,]\s*(?=\d)/g, '$1' + DECIMAL_GUARD);
        const folded = previousNormalize ? previousNormalize(guarded) : guarded.trim().toLowerCase();
        return folded.split(DECIMAL_GUARD).join('.');
    };

    // ---------------------------------------------------------------- Helfer
    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function solutionHtml(answer, note) {
        const raw = String(answer);
        const numeric = /^-?\d+(?:\.\d+)?$/.test(raw);
        const head = note ? '<p>' + esc(note) + '</p>' : '';
        return head + (numeric
            ? '<p>$$\\boxed{' + esc(raw) + '}$$</p>'
            : '<p>Antwort: <code>' + esc(raw) + '</code></p>');
    }

    const PENDING = {};
    function add(key, merksatz, rows, section) {
        const bucket = PENDING[key] || (PENDING[key] = []);
        rows.forEach(function (row) {
            const entry = {
                q: row[0],
                a: String(row[1]),
                f: merksatz || '',
                s: solutionHtml(row[1], row[2])
            };
            if (section) entry.section = section;
            bucket.push(entry);
        });
    }

    function dedupKey(question) {
        return String(question || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function flush() {
        Object.keys(PENDING).forEach(function (key) {
            const cfg = SCH.content[key];
            if (!cfg || cfg.mode !== 'pool' || !Array.isArray(cfg.pool)) return;
            const seen = new Set(cfg.pool.map(function (it) { return dedupKey(it && it.q); }));
            const fresh = [];
            PENDING[key].forEach(function (it) {
                const k = dedupKey(it.q);
                if (!k || seen.has(k)) return;
                seen.add(k);
                fresh.push(it);
            });
            if (fresh.length) cfg.pool = cfg.pool.concat(fresh);
        });
    }

    // Merksatz-Bausteine
    const M = {
        rechnen: '<p><strong>Regel.</strong> Klammern vor Punktrechnung vor Strichrechnung. Einheiten immer mitfuehren und am Ende pruefen.</p>',
        groessen: '<p><strong>Merksatz.</strong> Umrechnungszahlen: 1 km = 1000 m, 1 m = 100 cm, 1 t = 1000 kg, 1 h = 60 min, 1 min = 60 s.</p>',
        flaeche: '<p><strong>Formeln.</strong> Rechteck $A = a\\cdot b$, Quadrat $A = a^2$, Dreieck $A = \\tfrac{1}{2} g\\cdot h$, Quader $V = a\\cdot b\\cdot c$.</p>',
        teiler: '<p><strong>Merksatz.</strong> ggT ueber gemeinsame Primfaktoren mit kleinstem Exponenten, kgV mit groesstem Exponenten. Quersummenregel: durch 3 bzw. 9 teilbar, wenn die Quersumme es ist.</p>',
        bruch: '<p><strong>Regeln.</strong> Addieren nur mit gleichem Nenner. Multiplizieren: Zaehler mal Zaehler, Nenner mal Nenner. Dividieren: mit dem Kehrbruch multiplizieren.</p>',
        prozent: '<p><strong>Formeln.</strong> Prozentwert $W = \\tfrac{p}{100}\\cdot G$, Prozentsatz $p = \\tfrac{W}{G}\\cdot 100$, Zinsen $Z = \\tfrac{p}{100}\\cdot K$.</p>',
        winkel: '<p><strong>Merksatz.</strong> Winkelsumme im Dreieck 180 Grad, im Viereck 360 Grad, im Vollkreis 360 Grad.</p>',
        gleichung: '<p><strong>Regel.</strong> Aequivalenzumformung: dieselbe Rechenoperation auf beiden Seiten. Variablen auf eine Seite, Zahlen auf die andere.</p>',
        potenz: '<p><strong>Potenzgesetze.</strong> $a^m\\cdot a^n = a^{m+n}$, $a^m : a^n = a^{m-n}$, $a^0 = 1$, $(a^m)^n = a^{m\\cdot n}$.</p>',
        pythagoras: '<p><strong>Satz des Pythagoras.</strong> Im rechtwinkligen Dreieck gilt $a^2 + b^2 = c^2$ mit der Hypotenuse $c$.</p>',
        kreis: '<p><strong>Formeln.</strong> Kreisumfang $U = 2\\pi r$, Kreisflaeche $A = \\pi r^2$, Zylinder $V = \\pi r^2 h$.</p>',
        quadratisch: '<p><strong>p-q-Formel.</strong> $x_{1,2} = -\\tfrac{p}{2} \\pm \\sqrt{(\\tfrac{p}{2})^2 - q}$. Scheitelform $y = (x-d)^2 + e$ hat den Scheitel $S(d\\,|\\,e)$.</p>',
        trigo: '<p><strong>Merksatz.</strong> $\\sin\\alpha = \\tfrac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$, $\\cos\\alpha = \\tfrac{\\text{Ankathete}}{\\text{Hypotenuse}}$, $\\tan\\alpha = \\tfrac{\\text{Gegenkathete}}{\\text{Ankathete}}$.</p>',
        stochastik: '<p><strong>Merksatz.</strong> Laplace: $P = \\tfrac{\\text{guenstige}}{\\text{moegliche}}$. Pfadregel: entlang eines Pfades multiplizieren, ueber Pfade addieren. $P(\\bar{A}) = 1 - P(A)$.</p>',
        koerper: '<p><strong>Formeln.</strong> Kugel $V = \\tfrac{4}{3}\\pi r^3$, $O = 4\\pi r^2$; Kegel $V = \\tfrac{1}{3}\\pi r^2 h$; Pyramide $V = \\tfrac{1}{3}G\\cdot h$.</p>',
        exponential: '<p><strong>Merksatz.</strong> Wachstum $B(t) = B_0\\cdot q^t$. Wachstumsfaktor $q = 1 + \\tfrac{p}{100}$, Zerfallsfaktor $q &lt; 1$. Der Logarithmus loest $q^x = b$ nach $x$ auf.</p>',

        wortart: '<p><strong>Merksatz.</strong> Nomen benennen, Verben tun, Adjektive beschreiben, Pronomen vertreten, Praepositionen ordnen zu, Konjunktionen verbinden.</p>',
        satzbau: '<p><strong>Merksatz.</strong> Subjekt: Wer oder was? Praedikat: Was geschieht? Objekt: Wen/Wem/Wessen? Adverbiale: Wann, wo, wie, warum?</p>',
        rechtschreib: '<p><strong>Merksatz.</strong> Nomen und Substantivierungen gross. Nach kurzem betontem Vokal folgt haeufig ein Doppelkonsonant, nach langem Vokal steht oft ein Dehnungs-h.</p>',
        schreiben: '<p><strong>Merksatz.</strong> Sachtexte sind knapp, gegliedert und im Praesens. Argumente bestehen aus Behauptung, Begruendung und Beispiel.</p>',
        literatur: '<p><strong>Merksatz.</strong> Achte auf Gattung (Epik, Lyrik, Dramatik), Aufbau, Figuren, Erzaehlperspektive und sprachliche Bilder.</p>',
        medien: '<p><strong>Merksatz.</strong> Pruefe bei jeder Quelle Urheber, Datum, Absicht und Belegbarkeit. Nachricht und Kommentar sind zu trennen.</p>',

        stoffe: '<p><strong>Merksatz.</strong> Aggregatzustaende: fest, fluessig, gasfoermig. Uebergaenge: schmelzen, erstarren, verdampfen, kondensieren, sublimieren.</p>',
        waerme: '<p><strong>Merksatz.</strong> Waerme ist Energie. Die meisten Stoffe dehnen sich beim Erwaermen aus. Wasser gefriert bei 0 Grad Celsius und siedet bei 100 Grad Celsius (Normaldruck).</p>',
        magnet: '<p><strong>Merksatz.</strong> Ungleichnamige Pole ziehen sich an, gleichnamige stossen sich ab. Ferromagnetisch sind vor allem Eisen, Nickel und Cobalt.</p>',
        stromkreis: '<p><strong>Merksatz.</strong> Strom fliesst nur im geschlossenen Stromkreis. Leiter leiten, Isolatoren nicht. Ein Schalter unterbricht den Kreis.</p>',
        optik: '<p><strong>Merksatz.</strong> Licht breitet sich geradlinig aus. Reflexionsgesetz: Einfallswinkel gleich Reflexionswinkel. Beim Uebergang in ein anderes Medium wird Licht gebrochen.</p>',
        akustik: '<p><strong>Merksatz.</strong> Schall entsteht durch Schwingungen und braucht ein Medium. Frequenz bestimmt die Tonhoehe, Amplitude die Lautstaerke.</p>',
        mechanik: '<p><strong>Formeln.</strong> $F = m\\cdot g$, $\\rho = \\tfrac{m}{V}$, $p = \\tfrac{F}{A}$, $W = F\\cdot s$, $P = \\tfrac{W}{t}$. Hebelgesetz: $F_1\\cdot l_1 = F_2\\cdot l_2$.</p>',
        elektrik: '<p><strong>Formeln.</strong> Ohmsches Gesetz $U = R\\cdot I$, Leistung $P = U\\cdot I$. Reihenschaltung: gleiche Stromstaerke, Widerstaende addieren sich. Parallelschaltung: gleiche Spannung.</p>',
        energie: '<p><strong>Formeln.</strong> $E_{kin} = \\tfrac{1}{2}mv^2$, $E_{pot} = m\\cdot g\\cdot h$, Wirkungsgrad $\\eta = \\tfrac{E_{nutz}}{E_{zu}}$. Energie bleibt in einem abgeschlossenen System erhalten.</p>',
        kern: '<p><strong>Merksatz.</strong> Alphastrahlung sind Heliumkerne, Betastrahlung Elektronen, Gammastrahlung energiereiche Photonen. Nach jeder Halbwertszeit halbiert sich die Aktivitaet.</p>',
        felder: '<p><strong>Merksatz.</strong> Ein Strom erzeugt ein Magnetfeld, eine Aenderung des Magnetfeldes erzeugt eine Spannung (Induktion). Am Transformator gilt $\\tfrac{U_1}{U_2} = \\tfrac{N_1}{N_2}$.</p>',

        trennung: '<p><strong>Merksatz.</strong> Trennverfahren nutzen Stoffeigenschaften: Filtrieren (Teilchengroesse), Eindampfen und Destillieren (Siedetemperatur), Chromatografie (Loeslichkeit), Magnetscheidung (Magnetismus).</p>',
        reaktion: '<p><strong>Merksatz.</strong> Edukte reagieren zu Produkten. Exotherme Reaktionen geben Energie ab, endotherme nehmen sie auf. Die Atomzahl bleibt auf beiden Seiten gleich.</p>',
        atombau: '<p><strong>Merksatz.</strong> Der Kern enthaelt Protonen (positiv) und Neutronen (neutral), die Huelle Elektronen (negativ). Ordnungszahl = Protonenzahl. Hauptgruppennummer = Zahl der Aussenelektronen.</p>',
        bindung: '<p><strong>Merksatz.</strong> Metall + Nichtmetall gibt eine Ionenbindung, Nichtmetall + Nichtmetall eine Atombindung. Metalle bilden ein Gitter aus Rumpfionen und Elektronengas.</p>',
        saeure: '<p><strong>Merksatz.</strong> Saure Loesungen enthalten Oxonium-Ionen, alkalische Hydroxid-Ionen. pH 7 ist neutral; je pH-Stufe aendert sich die Konzentration um den Faktor 10.</p>',
        organik: '<p><strong>Merksatz.</strong> Alkane $C_nH_{2n+2}$, Alkene mit Doppelbindung, Alkohole mit Hydroxylgruppe, Carbonsaeuren mit Carboxylgruppe. Alkohol + Saeure ergibt einen Ester.</p>',

        tiere: '<p><strong>Merksatz.</strong> Wirbeltierklassen: Fische, Amphibien, Reptilien, Voegel, Saeugetiere. Voegel und Saeugetiere sind gleichwarm, die uebrigen wechselwarm.</p>',
        pflanze: '<p><strong>Merksatz.</strong> Fotosynthese: Kohlenstoffdioxid und Wasser werden mit Lichtenergie zu Traubenzucker und Sauerstoff. Ort sind die Chloroplasten.</p>',
        mensch: '<p><strong>Merksatz.</strong> Verdauung zerlegt Naehrstoffe, das Blut transportiert sie. Das Herz hat vier Kammern; der Gasaustausch findet in den Lungenblaeschen statt.</p>',
        zelle: '<p><strong>Merksatz.</strong> Pflanzen- und Tierzelle haben Zellkern, Zytoplasma und Membran. Nur die Pflanzenzelle hat Zellwand, Vakuole und Chloroplasten.</p>',
        oeko: '<p><strong>Merksatz.</strong> Produzenten bauen auf, Konsumenten fressen, Destruenten bauen ab. Von Stufe zu Stufe gehen rund 90 Prozent der Energie verloren.</p>',
        genetik: '<p><strong>Merksatz.</strong> DNA-Basenpaarung A-T und G-C. Koerperzellen sind diploid (46), Keimzellen haploid (23). Mitose erhaelt den Chromosomensatz, Meiose halbiert ihn.</p>',
        evolution: '<p><strong>Merksatz.</strong> Variation, Selektion und Vererbung treiben die Evolution. Homologe Organe zeigen gemeinsame Abstammung, analoge nur gleiche Funktion.</p>',

        steinzeit: '<p><strong>Merksatz.</strong> Altsteinzeit: Jaeger und Sammler, nomadisch. Jungsteinzeit (neolithische Revolution): Ackerbau, Viehzucht, Sesshaftigkeit, Vorratshaltung.</p>',
        antike: '<p><strong>Merksatz.</strong> Aegypten am Nil mit Pharao und Hieroglyphen; Griechenland mit Polis und Demokratie in Athen; Rom mit Republik, Kaiserzeit und Limes.</p>',
        mittelalter: '<p><strong>Merksatz.</strong> Lehnswesen und Grundherrschaft ordnen die Gesellschaft. Kaiser und Papst streiten um die Vorherrschaft; Staedte, Zuenfte und Hanse gewinnen an Gewicht.</p>',
        neuzeit: '<p><strong>Merksatz.</strong> Humanismus, Buchdruck und Entdeckungen leiten die Neuzeit ein. Reformation ab 1517, Dreissigjaehriger Krieg bis 1648, danach Absolutismus und Aufklaerung.</p>',
        revolution: '<p><strong>Merksatz.</strong> 1789 Franzoesische Revolution, 1804-1815 Napoleon, 1815 Wiener Kongress, 1848 Paulskirche, Industrialisierung und soziale Frage, 1871 Reichsgruendung.</p>',
        weltkriege: '<p><strong>Merksatz.</strong> 1914-1918 Erster Weltkrieg, 1919 Versailler Vertrag, 1919-1933 Weimarer Republik, ab 1933 NS-Diktatur mit Gleichschaltung und Verfolgung.</p>',
        nachkrieg: '<p><strong>Merksatz.</strong> 1939-1945 Zweiter Weltkrieg und Shoah, 1949 Gruendung von BRD und DDR, 1961 Mauerbau, 1989 Mauerfall, 1990 Wiedervereinigung.</p>'
    };

    // ================================================================ Klasse 5
    add('k5.mathe', M.rechnen, [
        ['Berechne 7 &middot; 8 + 6 &middot; 4.', '80', 'Zuerst beide Produkte, dann addieren.'],
        ['Berechne 120 - 4 &middot; 15.', '60', 'Punkt vor Strich: 4 mal 15 ist 60.'],
        ['Berechne geschickt: 12 &middot; 25.', '300', '12 mal 25 ist 3 mal (4 mal 25) und damit 3 mal 100.'],
        ['Berechne 1 000 000 : 1 000.', '1000', 'Beim Teilen durch 1000 wandert das Komma um drei Stellen.'],
        ['Wie heisst das Ergebnis einer Division?', 'quotient', 'Summe, Differenz, Produkt, Quotient sind die vier Ergebnisnamen.'],
        ['Wie heisst das Ergebnis einer Multiplikation?', 'produkt', 'Die Faktoren ergeben das Produkt.'],
        ['Berechne das arithmetische Mittel von 4, 8, 9 und 11.', '8', 'Summe 32, geteilt durch 4 Werte.']
    ]);
    add('k5.mathe', M.groessen, [
        ['Wie viele Minuten sind 3 Stunden und 25 Minuten?', '205', '3 mal 60 plus 25.'],
        ['Wie viele Sekunden hat eine Viertelstunde?', '900', '15 Minuten mal 60 Sekunden.'],
        ['Schreibe 3 km 45 m in Meter.', '3045', '3 km sind 3000 m.'],
        ['Wie viele Kilogramm sind 5 t?', '5000', '1 t entspricht 1000 kg.'],
        ['Schreibe 250 g in Kilogramm als Dezimalzahl.', '0,25', '250 geteilt durch 1000.'],
        ['Runde 4 728 auf volle Hunderter.', '4700', 'Die Zehnerstelle 2 rundet ab.']
    ]);
    add('k5.mathe', M.flaeche, [
        ['Berechne den Umfang eines Rechtecks mit a = 12 cm und b = 7 cm in cm.', '38', 'U ist 2 mal (12 plus 7).'],
        ['Berechne die Flaeche eines Quadrats mit der Seitenlaenge 9 cm in Quadratzentimetern.', '81', '9 mal 9.'],
        ['Berechne das Volumen eines Wuerfels mit der Kantenlaenge 4 cm in Kubikzentimetern.', '64', '4 mal 4 mal 4.'],
        ['Wie viele Ecken hat ein Quader?', '8', 'Ein Quader hat 8 Ecken, 12 Kanten und 6 Flaechen.']
    ]);
    add('k5.mathe', M.teiler, [
        ['Bestimme den groessten gemeinsamen Teiler von 24 und 36.', '12', 'Gemeinsame Teiler sind 1, 2, 3, 4, 6 und 12.'],
        ['Bestimme das kleinste gemeinsame Vielfache von 6 und 8.', '24', 'Vielfache von 8: 8, 16, 24 — 24 ist auch durch 6 teilbar.'],
        ['Zerlege 84 in Primfaktoren. Schreibe im Format 2*2*3*7.', '2*2*3*7', '84 ist 2 mal 42, 42 ist 2 mal 21, 21 ist 3 mal 7.']
    ]);

    add('k5.deutsch', M.wortart, [
        ['Welche Wortart ist das Wort <code>schnell</code>?', 'adjektiv', 'Adjektive beschreiben, wie etwas ist.'],
        ['Welche Wortart ist das Wort <code>und</code>?', 'konjunktion', 'Konjunktionen verbinden Woerter oder Saetze.'],
        ['Welche Wortart ist das Wort <code>er</code>?', 'pronomen', 'Pronomen stehen stellvertretend fuer ein Nomen.'],
        ['Welche Wortart ist das Wort <code>unter</code>?', 'praeposition', 'Praepositionen bestimmen Ort, Zeit oder Art.'],
        ['Wie lautet der Plural von <code>das Kind</code>?', 'kinder', 'Der Plural wird hier mit -er gebildet.']
    ], 'sprache');
    add('k5.deutsch', M.satzbau, [
        ['In welchem Kasus steht <code>des Hundes</code>?', 'genitiv', 'Der Genitiv antwortet auf Wessen?'],
        ['Wie nennt man die Satzglieder, die Ort, Zeit oder Art angeben?', 'adverbiale', 'Adverbiale Bestimmungen beantworten Wann, Wo, Wie und Warum.'],
        ['In welcher Zeitform steht <code>ich werde lesen</code>?', 'futur i', 'Futur I bildet man mit werden und dem Infinitiv.']
    ], 'sprache');
    add('k5.deutsch', M.rechtschreib, [
        ['Welches Satzzeichen steht am Ende eines Fragesatzes?', 'fragezeichen', 'Fragesaetze schliessen mit einem Fragezeichen.'],
        ['Wie nennt man die Schreibung <code>nn</code> im Wort <code>Sonne</code>?', 'doppelkonsonant', 'Nach kurzem betontem Vokal folgt haeufig ein Doppelkonsonant.'],
        ['Wie schreibt man ein Verb, das nach <code>das</code> steht, zum Beispiel <code>das Laufen</code>?', 'gross', 'Substantivierte Verben werden grossgeschrieben.']
    ], 'rechtschreibung');
    add('k5.deutsch', M.schreiben, [
        ['Wie heisst der erste Teil einer Erzaehlung, der Ort, Zeit und Figuren einfuehrt?', 'einleitung', 'Danach folgen Hauptteil mit Hoehepunkt und Schluss.'],
        ['Wie nennt man den Teil einer Erzaehlung, in dem die Spannung bis zum Hoehepunkt steigt?', 'hauptteil', 'Im Hauptteil wird der Konflikt entfaltet.']
    ], 'schreiben');
    add('k5.deutsch', M.literatur, [
        ['Wie nennt man die Schlussformel im Maerchen, zum Beispiel <em>und wenn sie nicht gestorben sind</em>?', 'schlussformel', 'Maerchen nutzen feste Eingangs- und Schlussformeln.'],
        ['Welche Zahl kommt in Maerchen besonders haeufig vor?', '3', 'Drei Wuensche, drei Aufgaben, drei Brueder.'],
        ['Wie heisst die Lehre am Ende einer Fabel?', 'moral', 'Die Moral fasst die uebertragbare Einsicht zusammen.'],
        ['Wie nennt man ein Gespraech zwischen zwei Figuren im Text?', 'dialog', 'Ein Selbstgespraech heisst dagegen Monolog.']
    ], 'literatur');
    add('k5.deutsch', M.medien, [
        ['Wie heisst das bekannteste deutsche Nachschlagewerk zur Rechtschreibung?', 'duden', 'Im Woerterbuch pruefst du Schreibung, Trennung und Bedeutung.'],
        ['Wie nennt man eine kurze, sachliche Nachricht in der Zeitung?', 'meldung', 'Eine Meldung beantwortet knapp die W-Fragen.'],
        ['Was solltest du bei einer Information aus dem Internet zuerst pruefen?', 'quelle', 'Ohne belegbare Quelle bleibt eine Information ungesichert.']
    ], 'medien');

    add('k5.physik', M.waerme, [
        ['Mit welchem Geraet misst man die Temperatur?', 'thermometer', 'Die Anzeige beruht meist auf der Ausdehnung von Fluessigkeiten.'],
        ['Bei welcher Temperatur in Grad Celsius gefriert reines Wasser?', '0', 'Der Schmelzpunkt liegt bei 0 Grad Celsius.'],
        ['Bei welcher Temperatur in Grad Celsius siedet Wasser bei Normaldruck?', '100', 'Bei geringerem Luftdruck siedet Wasser frueher.'],
        ['Was passiert mit den meisten Stoffen beim Erwaermen: ausdehnen oder zusammenziehen?', 'ausdehnen', 'Deshalb haben Bruecken Dehnungsfugen.'],
        ['Wie nennt man den Uebergang von fest nach fluessig?', 'schmelzen', 'Der Rueckweg heisst erstarren.'],
        ['Wie nennt man den Uebergang von fluessig nach gasfoermig?', 'verdampfen', 'Der Rueckweg heisst kondensieren.']
    ]);
    add('k5.physik', M.magnet, [
        ['Welcher Pol einer frei drehbaren Magnetnadel zeigt nach Norden?', 'nordpol', 'Deshalb heisst er magnetischer Nordpol.'],
        ['Was passiert mit zwei gleichnamigen Magnetpolen: anziehen oder abstossen?', 'abstossen', 'Ungleichnamige Pole ziehen sich dagegen an.'],
        ['Welches haeufige Metall wird von einem Magneten stark angezogen?', 'eisen', 'Auch Nickel und Cobalt sind ferromagnetisch.']
    ]);
    add('k5.physik', M.stromkreis, [
        ['Wie muss ein Stromkreis sein, damit Strom fliessen kann: offen oder geschlossen?', 'geschlossen', 'Ein Schalter oeffnet oder schliesst den Kreis.'],
        ['Welches Bauteil unterbricht einen Stromkreis gezielt?', 'schalter', 'Er trennt die Leiterbahn.'],
        ['Wie nennt man Stoffe, die den elektrischen Strom gut leiten?', 'leiter', 'Metalle sind gute Leiter.'],
        ['Wie nennt man Stoffe, die den elektrischen Strom praktisch nicht leiten?', 'isolator', 'Kunststoff und Gummi isolieren.']
    ]);
    add('k5.physik', M.optik, [
        ['Wie breitet sich Licht in einem gleichmaessigen durchsichtigen Stoff aus?', 'geradlinig', 'Deshalb entstehen scharfe Schatten.'],
        ['Wie nennt man den vollstaendig dunklen Bereich hinter einem Koerper bei einer punktfoermigen Lichtquelle?', 'kernschatten', 'Bei mehreren Lichtquellen entsteht zusaetzlich Halbschatten.'],
        ['Wie nennt man die Farbfolge, die entsteht, wenn weisses Licht durch ein Prisma faellt?', 'spektrum', 'Die Zerlegung heisst Dispersion.'],
        ['Wie nennt man einen Koerper, der selbst Licht aussendet?', 'lichtquelle', 'Beleuchtete Koerper werfen Licht nur zurueck.']
    ]);
    add('k5.physik', M.mechanik, [
        ['Welche Groesse gibt an, wie viel Stoff ein Koerper enthaelt, und wird in Kilogramm gemessen?', 'masse', 'Die Masse bleibt auch auf dem Mond gleich.'],
        ['Mit welchem Geraet misst man Kraefte?', 'kraftmesser', 'Er nutzt die Dehnung einer Feder.'],
        ['Wie heisst die Einheit der Kraft?', 'newton', 'Ein Newton entspricht etwa der Gewichtskraft von 100 g.']
    ]);

    add('k5.chemie', M.stoffe, [
        ['Nenne die drei Aggregatzustaende in der Reihenfolge zunehmender Teilchenbewegung.', 'fest fluessig gasfoermig', 'Im Gas bewegen sich die Teilchen am schnellsten.'],
        ['Wie nennt man den direkten Uebergang von fest nach gasfoermig?', 'sublimieren', 'Trockeneis sublimiert bei Raumtemperatur.'],
        ['Wie nennt man einen Stoff, der nur aus einer Teilchensorte besteht?', 'reinstoff', 'Alles andere ist ein Stoffgemisch.'],
        ['Wie nennt man ein Gemisch aus einer Fluessigkeit und darin schwebenden Feststoffteilchen?', 'suspension', 'Beispiel: aufgewirbelter Schlamm in Wasser.'],
        ['Wie nennt man ein Gemisch aus zwei nicht mischbaren Fluessigkeiten?', 'emulsion', 'Beispiel: Milch oder Vinaigrette.']
    ]);
    add('k5.chemie', M.trennung, [
        ['Mit welchem Trennverfahren trennst du Sand von Wasser?', 'filtrieren', 'Der Filter haelt die groesseren Teilchen zurueck.'],
        ['Mit welchem Trennverfahren gewinnst du Salz aus Salzwasser?', 'eindampfen', 'Das Wasser verdampft, das Salz bleibt zurueck.'],
        ['Mit welchem Trennverfahren trennst du Alkohol von Wasser?', 'destillieren', 'Genutzt wird die unterschiedliche Siedetemperatur.'],
        ['Womit trennst du Eisenspaene von Sand?', 'magnet', 'Nur das Eisen ist ferromagnetisch.']
    ]);
    add('k5.chemie', M.reaktion, [
        ['Welches Gas ist mit etwa 78 Prozent der Hauptbestandteil der Luft?', 'stickstoff', 'Sauerstoff folgt mit rund 21 Prozent.'],
        ['Wie viel Prozent Sauerstoff enthaelt die Luft ungefaehr?', '21', 'Dazu kommen Edelgase und Kohlenstoffdioxid.'],
        ['Welches Gas wird fuer eine Verbrennung benoetigt?', 'sauerstoff', 'Ohne Sauerstoff erlischt die Flamme.'],
        ['Ein Feuer braucht Brennstoff, Sauerstoff und was noch?', 'zuendtemperatur', 'Faellt eine der drei Bedingungen weg, erlischt das Feuer.'],
        ['Womit darf ein Fettbrand auf keinen Fall geloescht werden?', 'wasser', 'Es kommt zur Fettexplosion; stattdessen abdecken.'],
        ['Welche Flamme des Gasbrenners ist heisser: die leuchtende oder die rauschende?', 'rauschende', 'Bei geoeffneter Luftzufuhr verbrennt das Gas vollstaendig.']
    ]);
    add('k5.chemie', M.stoffe, [
        ['Wie lautet die chemische Formel von Wasser?', 'h2o', 'Zwei Wasserstoffatome und ein Sauerstoffatom.'],
        ['Bei welcher Temperatur in Grad Celsius hat Wasser seine groesste Dichte?', '4', 'Diese Anomalie schuetzt Gewaesser im Winter.'],
        ['Wie nennt man Stoffe, die sich in Wasser aufloesen?', 'loeslich', 'Salz ist loeslich, Sand nicht.']
    ]);

    add('k5.biologie', M.tiere, [
        ['Wie viele Beine hat ein Insekt?', '6', 'Der Koerper besteht aus Kopf, Brust und Hinterleib.'],
        ['Wie viele Beine hat eine Spinne?', '8', 'Spinnen sind keine Insekten.'],
        ['Wie nennt man Tiere mit gleichbleibender Koerpertemperatur?', 'gleichwarm', 'Voegel und Saeugetiere sind gleichwarm.'],
        ['Wie nennt man Tiere mit wechselnder Koerpertemperatur?', 'wechselwarm', 'Fische, Amphibien und Reptilien sind wechselwarm.'],
        ['Zu welcher Wirbeltierklasse gehoert der Frosch?', 'amphibien', 'Amphibien leben im Wasser und an Land.'],
        ['Zu welcher Wirbeltierklasse gehoert die Eidechse?', 'reptilien', 'Reptilien haben eine Hornschuppenhaut.'],
        ['Womit atmen Fische?', 'kiemen', 'Kiemen nehmen im Wasser geloesten Sauerstoff auf.'],
        ['Wie nennt man die Umwandlung von der Kaulquappe zum Frosch?', 'metamorphose', 'Auch Schmetterlinge durchlaufen eine Metamorphose.'],
        ['Welches Saeugetier legt Eier?', 'schnabeltier', 'Es gehoert zu den Kloakentieren.']
    ]);
    add('k5.biologie', M.pflanze, [
        ['Welcher Pflanzenteil nimmt Wasser und Naehrsalze auf?', 'wurzel', 'Wurzelhaare vergroessern die Oberflaeche.'],
        ['In welchem Pflanzenteil findet die Fotosynthese vor allem statt?', 'blatt', 'Dort sitzen die meisten Chloroplasten.'],
        ['Welcher Farbstoff faerbt Blaetter gruen?', 'chlorophyll', 'Er nimmt die Lichtenergie auf.'],
        ['Welches Gas geben Pflanzen bei der Fotosynthese ab?', 'sauerstoff', 'Er entsteht aus der Spaltung von Wasser.'],
        ['Welches Gas nehmen Pflanzen bei der Fotosynthese auf?', 'kohlenstoffdioxid', 'Es liefert den Kohlenstoff fuer den Traubenzucker.'],
        ['Wie nennt man die Uebertragung von Pollen auf die Narbe?', 'bestaeubung', 'Insekten und Wind sind typische Ueberbringer.']
    ]);
    add('k5.biologie', M.mensch, [
        ['Welches Organ pumpt das Blut durch den Koerper?', 'herz', 'Es schlaegt in Ruhe rund 70-mal pro Minute.'],
        ['Wie viele Zaehne hat ein erwachsener Mensch mit Weisheitszaehnen?', '32', 'Das Milchgebiss hat 20 Zaehne.'],
        ['Welches Sinnesorgan nimmt Schall auf?', 'ohr', 'Das Trommelfell wird durch Schall in Schwingung versetzt.'],
        ['Wie viele Sinne werden klassisch unterschieden?', '5', 'Sehen, Hoeren, Riechen, Schmecken, Tasten.']
    ]);

    add('k5.geschichte', M.steinzeit, [
        ['Wie nennt man die aeltere Steinzeit mit einem Fachbegriff?', 'altsteinzeit', 'Fachlich auch Palaeolithikum.'],
        ['Welches Gestein war in der Altsteinzeit der wichtigste Werkstoff fuer Klingen?', 'feuerstein', 'Feuerstein bricht mit scharfen Kanten.'],
        ['Lebten die Menschen der Altsteinzeit sesshaft oder nomadisch?', 'nomadisch', 'Sie folgten den Tierherden und dem Pflanzenangebot.'],
        ['Welche Neuerung kennzeichnet die Jungsteinzeit vor allem?', 'sesshaftigkeit', 'Ackerbau und Viehzucht ermoeglichten feste Siedlungen.'],
        ['Wie heisst die beruehmte Hoehle in Frankreich mit altsteinzeitlichen Malereien?', 'lascaux', 'Die Malereien sind rund 17 000 Jahre alt.']
    ]);
    add('k5.geschichte', M.antike, [
        ['An welchem Fluss lag das alte Aegypten?', 'nil', 'Die jaehrliche Nilflut duengte die Felder.'],
        ['Wie hiess der Herrscher im alten Aegypten?', 'pharao', 'Er galt als Mittler zu den Goettern.'],
        ['Wie heisst die Bilderschrift der alten Aegypter?', 'hieroglyphen', 'Sie wurde auf Stein und Papyrus geschrieben.'],
        ['Wer entzifferte die Hieroglyphen mithilfe des Steins von Rosette?', 'champollion', 'Jean-Francois Champollion gelang dies 1822.'],
        ['Wie heisst der griechische Stadtstaat?', 'polis', 'Jede Polis hatte eigene Gesetze.'],
        ['In welcher griechischen Stadt entstand die erste Demokratie?', 'athen', 'Ab dem 5. Jahrhundert v. Chr. entschied die Volksversammlung.'],
        ['Welche griechische Stadt war fuer ihre harte Kriegererziehung bekannt?', 'sparta', 'Die Erziehung hiess Agoge.'],
        ['Wo fanden die antiken griechischen Spiele statt?', 'olympia', 'Sie waren dem Zeus geweiht.'],
        ['Wer war der Lehrer Alexanders des Grossen?', 'aristoteles', 'Aristoteles war Schueler Platons.'],
        ['In welchem Jahr v. Chr. wurde Rom der Sage nach gegruendet?', '753', 'Merkspruch: 753 — Rom schluepft aus dem Ei.'],
        ['Wer wurde 44 v. Chr. in Rom ermordet?', 'caesar', 'Die Verschwoerer fuerchteten seine Alleinherrschaft.'],
        ['Wie hiess der erste roemische Kaiser?', 'augustus', 'Er regierte ab 27 v. Chr.'],
        ['Wie heisst die roemische Grenzbefestigung in Germanien?', 'limes', 'Der Obergermanisch-Raetische Limes ist Weltkulturerbe.'],
        ['In welchem Jahr n. Chr. verloren die Roemer die Schlacht im Teutoburger Wald?', '9', 'Drei Legionen des Varus wurden vernichtet.']
    ]);

    // ================================================================ Klasse 6
    add('k6.mathe', M.bruch, [
        ['Kuerze 18/24 vollstaendig. Schreibe im Format a/b.', '3/4', 'Beide Zahlen durch 6 teilen.'],
        ['Berechne 1/2 + 1/3. Schreibe im Format a/b.', '5/6', 'Hauptnenner 6: 3/6 plus 2/6.'],
        ['Berechne 2/3 &middot; 3/4. Schreibe im Format a/b.', '1/2', 'Zaehler mal Zaehler, Nenner mal Nenner, dann kuerzen.'],
        ['Berechne 3/4 : 1/2. Schreibe im Format a/b.', '3/2', 'Mit dem Kehrbruch 2/1 multiplizieren.'],
        ['Schreibe 0,75 als vollstaendig gekuerzten Bruch im Format a/b.', '3/4', '75/100 durch 25 kuerzen.'],
        ['Schreibe 3/5 als Dezimalzahl.', '0,6', '3 geteilt durch 5.']
    ]);
    add('k6.mathe', M.prozent, [
        ['Wie viel Prozent entsprechen dem Bruch 1/4?', '25', '1/4 ist 25/100.'],
        ['Berechne 20 Prozent von 350.', '70', '350 geteilt durch 5.'],
        ['Ein Pullover kostet 40 Euro und wird um 15 Prozent reduziert. Wie hoch ist der neue Preis in Euro?', '34', '15 Prozent von 40 sind 6 Euro Rabatt.']
    ]);
    add('k6.mathe', M.winkel, [
        ['Wie gross ist der Vollwinkel in Grad?', '360', 'Der gestreckte Winkel misst 180 Grad.'],
        ['Wie nennt man einen Winkel zwischen 90 und 180 Grad?', 'stumpfer winkel', 'Unter 90 Grad heisst er spitz.'],
        ['Wie gross ist die Winkelsumme im Dreieck in Grad?', '180', 'Das gilt fuer jedes ebene Dreieck.'],
        ['Wie gross ist die Winkelsumme im Viereck in Grad?', '360', 'Ein Viereck laesst sich in zwei Dreiecke zerlegen.']
    ]);
    add('k6.mathe', M.flaeche, [
        ['Berechne die Flaeche eines Dreiecks mit g = 12 cm und h = 5 cm in Quadratzentimetern.', '30', 'Die Haelfte von 12 mal 5.'],
        ['Berechne die Flaeche eines Parallelogramms mit a = 8 cm und h = 6 cm in Quadratzentimetern.', '48', 'Grundseite mal Hoehe.'],
        ['Berechne das Volumen eines Quaders mit 5 cm, 4 cm und 3 cm in Kubikzentimetern.', '60', 'Laenge mal Breite mal Hoehe.']
    ]);
    add('k6.mathe', M.teiler, [
        ['Ist 4 536 durch 9 teilbar? Antworte mit ja oder nein.', 'ja', 'Die Quersumme ist 18 und damit durch 9 teilbar.'],
        ['Ist 1 234 durch 3 teilbar? Antworte mit ja oder nein.', 'nein', 'Die Quersumme 10 ist nicht durch 3 teilbar.']
    ]);
    add('k6.mathe', M.rechnen, [
        ['Berechne -7 + 12.', '5', 'Auf dem Zahlenstrahl 12 Schritte nach rechts.'],
        ['Berechne 5 - 9.', '-4', 'Das Ergebnis liegt links von der Null.'],
        ['Welche Zahl ist groesser: -3 oder -5?', '-3', 'Je weiter rechts auf dem Zahlenstrahl, desto groesser.']
    ]);

    add('k6.deutsch', M.satzbau, [
        ['Wie heisst ein Satz, der ohne weiteren Satz bestehen kann?', 'hauptsatz', 'Er ist grammatisch selbststaendig.'],
        ['Wie nennt man den Satzteil, der im Dativ steht?', 'dativobjekt', 'Es antwortet auf Wem?'],
        ['Welche Satzart ist <em>Geh nach Hause!</em>?', 'aufforderungssatz', 'Aufforderungssaetze enden oft mit Ausrufezeichen.']
    ], 'sprache');
    add('k6.deutsch', M.wortart, [
        ['Wie heisst die Steigerungsform <code>am schoensten</code>?', 'superlativ', 'Die Stufen sind Positiv, Komparativ, Superlativ.'],
        ['Wie heisst die Vergleichsstufe <code>schoener</code>?', 'komparativ', 'Sie vergleicht zwei Groessen.']
    ], 'sprache');
    add('k6.deutsch', M.rechtschreib, [
        ['Welches Satzzeichen steht zwischen einem Begleitsatz und der folgenden woertlichen Rede?', 'doppelpunkt', 'Danach folgen die Anfuehrungszeichen.'],
        ['Wie nennt man das stumme h in <code>Bahn</code>?', 'dehnungs-h', 'Es zeigt den langen Vokal an.'],
        ['Wie schreibt man das Wort nach <code>beim</code> in <code>beim Laufen</code>?', 'gross', 'Der Infinitiv ist hier substantiviert.']
    ], 'rechtschreibung');
    add('k6.deutsch', M.literatur, [
        ['Wie nennt man eine einzelne Zeile in einem Gedicht?', 'vers', 'Mehrere Verse bilden eine Strophe.'],
        ['Wie nennt man einen Block aus mehreren Versen?', 'strophe', 'Strophen gliedern das Gedicht.'],
        ['Wie heisst das Reimschema aabb?', 'paarreim', 'Zwei aufeinanderfolgende Verse reimen sich.'],
        ['Wie heisst das Reimschema abab?', 'kreuzreim', 'Die Reime sind verschraenkt.'],
        ['Wie heisst das Reimschema abba?', 'umarmender reim', 'Ein Reimpaar umschliesst ein anderes.'],
        ['Wie nennt man ein sprachliches Bild mit dem Wort <em>wie</em>?', 'vergleich', 'Ohne <em>wie</em> spricht man von einer Metapher.']
    ], 'literatur');
    add('k6.deutsch', M.schreiben, [
        ['In welcher Zeitform schreibt man eine Inhaltsangabe?', 'praesens', 'Auch die Nacherzaehlung des Inhalts bleibt im Praesens.'],
        ['Wie ist der Stil eines Berichts: sachlich oder spannend?', 'sachlich', 'Ein Bericht informiert nuechtern und ohne Wertung.']
    ], 'schreiben');
    add('k6.deutsch', M.medien, [
        ['Wie nennt man die gesetzlich vorgeschriebene Angabe, wer eine Webseite betreibt?', 'impressum', 'Es hilft bei der Bewertung der Quelle.'],
        ['Wie nennt man Werbung, die als redaktioneller Beitrag getarnt ist?', 'schleichwerbung', 'Sie ist in Deutschland unzulaessig.']
    ], 'medien');
    add('k6.deutsch', M.schreiben, [
        ['Wie nennt man die Kernaussage eines Absatzes?', 'hauptgedanke', 'Beim Markieren suchst du den Hauptgedanken je Abschnitt.'],
        ['Welche Methode ordnet Textinformationen grafisch als Aeste um ein Zentrum an?', 'mindmap', 'Sie hilft beim Sammeln und Gliedern.']
    ], 'lesen');

    add('k6.physik', M.optik, [
        ['Wie schnell ist Licht im Vakuum ungefaehr in Kilometern pro Sekunde?', '300000', 'Exakt 299 792 458 m/s.'],
        ['Wie lautet das Reflexionsgesetz? Der Einfallswinkel ist gleich dem ...', 'reflexionswinkel', 'Beide werden zum Lot gemessen.'],
        ['Welche Linsenform buendelt paralleles Licht?', 'sammellinse', 'Sie ist in der Mitte dicker als am Rand.'],
        ['Welche Linsenform zerstreut paralleles Licht?', 'zerstreuungslinse', 'Sie ist in der Mitte duenner als am Rand.'],
        ['Wie heisst der Punkt, in dem sich parallele Strahlen hinter einer Sammellinse treffen?', 'brennpunkt', 'Sein Abstand zur Linse ist die Brennweite.'],
        ['Wie nennt man die Richtungsaenderung des Lichts beim Uebergang von Luft in Wasser?', 'brechung', 'Deshalb erscheint ein Stab im Wasser geknickt.'],
        ['Wie nennt man ein Bild, das man auf einem Schirm auffangen kann?', 'reelles bild', 'Ein virtuelles Bild laesst sich nicht auffangen.'],
        ['Wie viele Grundfarben hat die additive Farbmischung?', '3', 'Rot, Gruen und Blau ergeben zusammen Weiss.'],
        ['Wie nennt man den teilweise beleuchteten Bereich hinter einem Koerper bei ausgedehnter Lichtquelle?', 'halbschatten', 'Der voellig dunkle Teil ist der Kernschatten.']
    ]);
    add('k6.physik', M.akustik, [
        ['Wie schnell ist Schall in Luft bei 20 Grad Celsius ungefaehr in Metern pro Sekunde?', '343', 'In Wasser ist Schall deutlich schneller.'],
        ['Wodurch entsteht Schall?', 'schwingung', 'Der schwingende Koerper regt die Luft an.'],
        ['Wie heisst die Einheit der Frequenz?', 'hertz', 'Ein Hertz ist eine Schwingung pro Sekunde.'],
        ['Welche Groesse bestimmt die Tonhoehe?', 'frequenz', 'Hohe Frequenz bedeutet hohen Ton.'],
        ['Welche Groesse bestimmt die Lautstaerke eines Tons?', 'amplitude', 'Grosse Amplitude bedeutet laut.'],
        ['Kann sich Schall im Vakuum ausbreiten? Antworte mit ja oder nein.', 'nein', 'Schall braucht ein Traegermedium.'],
        ['Wie nennt man einen durch Reflexion zurueckgeworfenen Schall?', 'echo', 'Das Ohr trennt Echos ab etwa 0,1 Sekunden Abstand.'],
        ['Wie nennt man Schall oberhalb von 20 000 Hertz?', 'ultraschall', 'Er wird in Medizin und Technik genutzt.'],
        ['Wie viele Hertz betraegt die obere Hoergrenze eines jungen Menschen ungefaehr?', '20000', 'Die Grenze sinkt mit dem Alter.']
    ]);

    add('k6.chemie', M.reaktion, [
        ['Wie heisst die Reaktion eines Stoffes mit Sauerstoff?', 'oxidation', 'Eine Verbrennung ist eine schnelle Oxidation.'],
        ['Welcher Stoff entsteht bei der vollstaendigen Verbrennung von Kohlenstoff?', 'kohlenstoffdioxid', 'Bei Sauerstoffmangel entsteht giftiges Kohlenstoffmonoxid.'],
        ['Welcher Stoff entsteht bei der Reaktion von Wasserstoff mit Sauerstoff?', 'wasser', 'Die Reaktion ist stark exotherm.'],
        ['Wie heisst der Nachweis fuer Wasserstoff?', 'knallgasprobe', 'Ein pfeifender Knall zeigt Wasserstoff an.'],
        ['Womit weist man Kohlenstoffdioxid nach?', 'kalkwasser', 'Kalkwasser truebt sich durch Calciumcarbonat.'],
        ['Wie nennt man die Ausgangsstoffe einer chemischen Reaktion?', 'edukte', 'Sie stehen links im Reaktionsschema.'],
        ['Wird bei einer exothermen Reaktion Energie aufgenommen oder abgegeben?', 'abgegeben', 'Endotherme Reaktionen nehmen Energie auf.'],
        ['Wie nennt man einen Stoff, der eine Reaktion beschleunigt, ohne verbraucht zu werden?', 'katalysator', 'Er senkt die Aktivierungsenergie.']
    ]);
    add('k6.chemie', M.trennung, [
        ['Welches Trennverfahren nutzt unterschiedliche Siedetemperaturen?', 'destillation', 'Der leichter fluechtige Stoff verdampft zuerst.'],
        ['Welches Trennverfahren trennt Farbstoffe auf Papier nach ihrer Loeslichkeit?', 'chromatografie', 'Das Laufmittel wandert unterschiedlich weit.'],
        ['Wie nennt man eine gleichmaessige Mischung, in der die Bestandteile nicht unterscheidbar sind?', 'homogenes gemisch', 'Salzloesung und Luft sind homogen.'],
        ['Wie nennt man ein Gemisch aus zwei oder mehr Metallen?', 'legierung', 'Messing ist eine Legierung aus Kupfer und Zink.']
    ]);
    add('k6.chemie', M.stoffe, [
        ['Welche Dichte hat Wasser bei 4 Grad Celsius in Gramm pro Kubikzentimeter?', '1', 'Das entspricht 1000 kg pro Kubikmeter.'],
        ['Wie lautet die Formel von Kohlenstoffdioxid?', 'co2', 'Ein Kohlenstoffatom, zwei Sauerstoffatome.'],
        ['Aus wie vielen Atomen besteht ein Wassermolekuel?', '3', 'Zwei Wasserstoff- und ein Sauerstoffatom.'],
        ['In welchem Wasser bewegen sich die Teilchen schneller: in warmem oder in kaltem?', 'warmem', 'Hoehere Temperatur bedeutet groessere Teilchenbewegung.'],
        ['Wie nennt man die selbststaendige Durchmischung von Stoffen ohne Ruehren?', 'diffusion', 'Sie beruht auf der Teilchenbewegung.'],
        ['Wie nennt man die maximale Menge eines Stoffes, die sich in Wasser loesen laesst?', 'loeslichkeit', 'Sie haengt stark von der Temperatur ab.']
    ]);

    add('k6.biologie', M.mensch, [
        ['Wie viele Knochen hat ein erwachsener Mensch ungefaehr?', '206', 'Ein Neugeborenes hat mehr, da Knochen noch verwachsen.'],
        ['Wie heisst die bewegliche Verbindung zwischen zwei Knochen?', 'gelenk', 'Knorpel und Gelenkfluessigkeit verringern die Reibung.'],
        ['Wie nennt man zwei Muskeln, die gegensaetzlich arbeiten?', 'gegenspieler', 'Beispiel: Bizeps und Trizeps.'],
        ['Welches Organ filtert das Blut und bildet Harn?', 'niere', 'Der Mensch hat zwei Nieren.'],
        ['In welchem Organ wird die Nahrung angesaeuert und durchmischt?', 'magen', 'Die Salzsaeure toetet zugleich viele Keime ab.'],
        ['In welchem Darmabschnitt werden die Naehrstoffe hauptsaechlich aufgenommen?', 'duenndarm', 'Zotten vergroessern die Oberflaeche stark.'],
        ['Wie heisst die Lebensphase der koerperlichen Geschlechtsreifung?', 'pubertaet', 'Hormone steuern die Veraenderungen.'],
        ['Welche Blutzellen transportieren Sauerstoff?', 'rote blutkoerperchen', 'Sie enthalten Haemoglobin.']
    ]);
    add('k6.biologie', M.oeko, [
        ['Wie nennt man die Pflanzen am Anfang einer Nahrungskette?', 'produzenten', 'Sie bauen organische Stoffe selbst auf.'],
        ['Wie nennt man Tiere, die andere Lebewesen fressen, in der Nahrungskette?', 'konsumenten', 'Man unterscheidet Konsumenten erster und zweiter Ordnung.'],
        ['Wie nennt man Bakterien und Pilze, die Totes zersetzen?', 'destruenten', 'Sie schliessen den Stoffkreislauf.'],
        ['Wie nennt man das Zusammenleben zweier Arten zum Vorteil beider?', 'symbiose', 'Beispiel: Flechte aus Pilz und Alge.'],
        ['Wie nennt man die verzweigte Darstellung mehrerer Nahrungsketten?', 'nahrungsnetz', 'Es bildet die Realitaet besser ab als eine einzelne Kette.']
    ]);
    add('k6.biologie', M.pflanze, [
        ['Welche Energieform treibt die Fotosynthese an?', 'licht', 'Chlorophyll wandelt Lichtenergie chemisch um.'],
        ['Welchen Zucker bauen Pflanzen bei der Fotosynthese auf?', 'traubenzucker', 'Fachlich Glucose.'],
        ['Welcher Bluetenteil lockt mit Farbe und Duft Insekten an?', 'bluetenblaetter', 'Nektar dient als Lockmittel.'],
        ['Wie heisst das weibliche Bluetenorgan aus Narbe, Griffel und Fruchtknoten?', 'stempel', 'Das maennliche Organ ist das Staubblatt.'],
        ['Wie nennt man die jahreszeitliche Wanderung vieler Vogelarten?', 'vogelzug', 'Sie folgt dem Nahrungsangebot.']
    ]);

    add('k6.geschichte', M.mittelalter, [
        ['Wer wurde im Jahr 800 in Rom zum Kaiser gekroent?', 'karl der grosse', 'Papst Leo III. vollzog die Kroenung.'],
        ['Wie nennt man das mittelalterliche System aus Lehnsherr und Lehnsmann?', 'lehnswesen', 'Der Lehnsmann erhielt Land gegen Treue und Dienst.'],
        ['Wie heisst der erste Stand der mittelalterlichen Staendeordnung?', 'klerus', 'Danach folgen Adel und Bauern beziehungsweise Buerger.'],
        ['Wie heisst der Streit zwischen Kaiser und Papst um die Einsetzung von Bischoefen?', 'investiturstreit', 'Er endete 1122 im Wormser Konkordat.'],
        ['In welchem Jahr ging Heinrich IV. nach Canossa?', '1077', 'Er bat Papst Gregor VII. um Aufhebung des Kirchenbanns.'],
        ['In welchem Jahr begann der erste Kreuzzug?', '1096', 'Aufgerufen hatte Papst Urban II. 1095 in Clermont.'],
        ['Welche Stadt war das Hauptziel der Kreuzzuege?', 'jerusalem', 'Sie wurde 1099 erobert.'],
        ['Welcher Staufer-Kaiser trug den Beinamen Barbarossa?', 'friedrich i', 'Er regierte von 1152 bis 1190.'],
        ['Wie heisst der Zusammenschluss norddeutscher Handelsstaedte im Mittelalter?', 'hanse', 'Luebeck war ihr Vorort.'],
        ['Welche Seuche wuetete ab 1347 in Europa?', 'pest', 'Sie kostete etwa ein Drittel der Bevoelkerung das Leben.'],
        ['Wie heisst der Zusammenschluss von Handwerkern eines Gewerbes in der Stadt?', 'zunft', 'Zuenfte regelten Ausbildung, Preise und Qualitaet.'],
        ['Nach wie vielen Jahren galt ein in die Stadt gefluechteter Leibeigener nach der Regel als frei?', '1', 'Ein Jahr und ein Tag — daher: Stadtluft macht frei.'],
        ['Welche Erfindung um 1450 verbreitete Texte erstmals massenhaft?', 'buchdruck', 'Johannes Gutenberg nutzte bewegliche Metalllettern.'],
        ['Wie heisst die Urkunde von 1215, die englischen Adligen Rechte gegenueber dem Koenig sicherte?', 'magna carta', 'Sie gilt als fruehes Verfassungsdokument.'],
        ['Wie lautet der bekannte Wahlspruch der Benediktiner auf Latein?', 'ora et labora', 'Bete und arbeite.'],
        ['Wie heisst der Baustil mit Spitzbogen, Strebepfeilern und hohen Fenstern?', 'gotik', 'Er loeste ab dem 12. Jahrhundert die Romanik ab.'],
        ['Wie heisst der Baustil mit Rundbogen und dicken Mauern?', 'romanik', 'Typisch sind kleine Fenster und wuchtige Bauten.'],
        ['Wie nennt man die Nordmaenner, die ab dem 8. Jahrhundert Kuesten ueberfielen?', 'wikinger', 'Sie waren zugleich Haendler und Siedler.'],
        ['In welchem Jahr wurde das Frankenreich im Vertrag von Verdun geteilt?', '843', 'Die Enkel Karls des Grossen teilten das Reich in drei Teile.'],
        ['Welcher Kaiser erliess 1356 die Goldene Bulle?', 'karl iv', 'Sie regelte die Koenigswahl durch sieben Kurfuersten.']
    ]);

    // ================================================================ Klasse 7
    add('k7.mathe', M.gleichung, [
        ['Loese die Gleichung 3x + 7 = 25.', '6', '18 geteilt durch 3.'],
        ['Loese die Gleichung 5x - 12 = 3x + 8.', '10', '2x = 20.'],
        ['Fasse zusammen: 4a + 3b - 2a + b. Schreibe im Format 2a+4b.', '2a+4b', 'Nur gleichartige Glieder zusammenfassen.'],
        ['Multipliziere aus: 3(x + 4). Schreibe im Format 3x+12.', '3x+12', 'Jeden Summanden mit 3 multiplizieren.'],
        ['Wie heisst die Zahl vor der Variablen im Term 7x?', 'koeffizient', 'x ist die Variable, 7 der Koeffizient.'],
        ['Berechne (-4) &middot; (-6).', '24', 'Minus mal Minus ergibt Plus.'],
        ['Berechne (-18) : 3.', '-6', 'Ungleiche Vorzeichen ergeben ein negatives Ergebnis.'],
        ['Berechne 2 hoch 5.', '32', '2 fuenfmal mit sich selbst multipliziert.']
    ]);
    add('k7.mathe', M.prozent, [
        ['Berechne die Jahreszinsen fuer 1 200 Euro bei 3 Prozent in Euro.', '36', '3 Prozent von 1200.'],
        ['Ein Kapital von 800 Euro bringt in einem Jahr 24 Euro Zinsen. Wie hoch ist der Zinssatz in Prozent?', '3', '24 geteilt durch 800 mal 100.'],
        ['Ein Preis steigt von 50 auf 60 Euro. Um wie viel Prozent?', '20', '10 Euro Zuwachs bezogen auf 50 Euro.'],
        ['Ein Preis faellt von 80 auf 60 Euro. Um wie viel Prozent?', '25', '20 Euro Abnahme bezogen auf 80 Euro.']
    ]);
    add('k7.mathe', M.rechnen, [
        ['Wie heisst eine Zuordnung, bei der der Quotient der zugeordneten Werte konstant bleibt?', 'proportional', 'Der Graph ist eine Ursprungsgerade.'],
        ['Wie heisst eine Zuordnung, bei der das Produkt der zugeordneten Werte konstant bleibt?', 'antiproportional', 'Der Graph ist eine Hyperbel.'],
        ['Sechs Arbeiter brauchen 12 Tage. Wie viele Tage brauchen acht Arbeiter bei gleicher Leistung?', '9', 'Antiproportional: 6 mal 12 geteilt durch 8.']
    ]);
    add('k7.mathe', M.winkel, [
        ['Wie gross ist jeder Innenwinkel im gleichseitigen Dreieck in Grad?', '60', '180 Grad geteilt durch 3.'],
        ['Wie heisst der Schnittpunkt der Mittelsenkrechten eines Dreiecks?', 'umkreismittelpunkt', 'Er hat zu allen Ecken denselben Abstand.'],
        ['Wie heisst der Schnittpunkt der Winkelhalbierenden eines Dreiecks?', 'inkreismittelpunkt', 'Er hat zu allen Seiten denselben Abstand.'],
        ['Wie heisst der Schnittpunkt der Seitenhalbierenden eines Dreiecks?', 'schwerpunkt', 'Er teilt jede Seitenhalbierende im Verhaeltnis 2 zu 1.'],
        ['Wie viele Kongruenzsaetze fuer Dreiecke gibt es?', '4', 'SSS, SWS, WSW und SSW.']
    ]);

    add('k7.deutsch', M.satzbau, [
        ['Wie lautet <em>Man baut das Haus</em> im Passiv Praesens?', 'das haus wird gebaut', 'Passiv mit werden plus Partizip II.'],
        ['In welchem Modus steht <em>wenn ich Zeit haette</em>?', 'konjunktiv ii', 'Der Konjunktiv II zeigt Nichtwirkliches.'],
        ['Wie heisst der Nebensatz, der ein Nomen naeher bestimmt?', 'relativsatz', 'Er wird mit der, die, das oder welcher eingeleitet.'],
        ['Welche Wortart ist das Wort <code>sehr</code>?', 'adverb', 'Adverbien bestimmen Verben, Adjektive oder Saetze naeher.'],
        ['Wie nennt man ein Wort, das aus mehreren Woertern zusammengesetzt ist, zum Beispiel Haustuer?', 'kompositum', 'Das letzte Glied bestimmt Genus und Wortart.']
    ], 'sprache');
    add('k7.deutsch', M.rechtschreib, [
        ['Welches Satzzeichen steht vor der Konjunktion <code>sondern</code>?', 'komma', 'Auch vor aber und doch steht ein Komma.'],
        ['Wie schreibt man <code>im Allgemeinen</code>: das zweite Wort gross oder klein?', 'gross', 'Substantivierte Adjektive werden grossgeschrieben.']
    ], 'rechtschreibung');
    add('k7.deutsch', M.schreiben, [
        ['Wie nennt man eine Behauptung, die mit Begruendung und Beispiel gestuetzt wird?', 'argument', 'Aufbau: These, Begruendung, Beispiel.'],
        ['Wie heisst der mittlere Teil eines vollstaendigen Arguments?', 'begruendung', 'Sie verbindet These und Beispiel.'],
        ['Wie nennt man einen Text, in dem man einen eigenen Standpunkt begruendet vertritt?', 'stellungnahme', 'Sie bereitet die spaetere Eroerterung vor.']
    ], 'schreiben');
    add('k7.deutsch', M.literatur, [
        ['Wie nennt man ein erzaehlendes Gedicht mit dramatischem Geschehen?', 'ballade', 'Sie vereint Epik, Lyrik und Dramatik.'],
        ['Wie nennt man die entscheidende Wende in einer Kurzgeschichte?', 'wendepunkt', 'Danach ist die Ausgangslage veraendert.'],
        ['Wie beginnt eine Kurzgeschichte typischerweise?', 'unvermittelt', 'Ohne Vorgeschichte, mitten im Geschehen.'],
        ['Wie endet eine Kurzgeschichte typischerweise?', 'offen', 'Die Deutung bleibt beim Leser.'],
        ['Wie nennt man das sprechende Ich in einem Gedicht?', 'lyrisches ich', 'Es ist nicht mit dem Autor gleichzusetzen.']
    ], 'literatur');
    add('k7.deutsch', M.medien, [
        ['Wie nennt man eine Aussage, die sich ueberpruefen und belegen laesst?', 'fakt', 'Fakten sind unabhaengig von der Sichtweise pruefbar.'],
        ['Wie nennt man eine persoenliche Bewertung in einem Text?', 'meinung', 'Sie muss von Fakten getrennt kenntlich sein.'],
        ['Wie heisst ein Zeitungstext, der ausdruecklich die Meinung des Autors vertritt?', 'kommentar', 'Er ist als Meinungstext gekennzeichnet.'],
        ['Wie heisst ein lebendiger, miterlebter Zeitungstext mit Szenen und Eindruecken?', 'reportage', 'Sie verbindet Fakten mit Anschaulichkeit.']
    ], 'medien');

    add('k7.physik', M.mechanik, [
        ['Wie gross ist die Gewichtskraft von 1 kg auf der Erde in Newton? Runde auf zwei Nachkommastellen.', '9,81', 'Ortsfaktor g ist rund 9,81 N/kg.'],
        ['Berechne die Gewichtskraft von 5 kg mit g = 9,81 N/kg in Newton.', '49,05', '5 mal 9,81.'],
        ['Wie lautet die Formel fuer die Dichte? Schreibe im Format m/V.', 'm/v', 'Masse geteilt durch Volumen.'],
        ['Ein Koerper hat 200 g und 250 Kubikzentimeter. Wie gross ist die Dichte in g pro Kubikzentimeter?', '0,8', '200 geteilt durch 250.'],
        ['Welche Dichte hat Wasser in Kilogramm pro Kubikmeter?', '1000', 'Das entspricht 1 g pro Kubikzentimeter.'],
        ['Wie lautet die Formel fuer den Druck? Schreibe im Format F/A.', 'f/a', 'Kraft geteilt durch Flaeche.'],
        ['Wie heisst die Einheit des Drucks?', 'pascal', 'Ein Pascal ist ein Newton pro Quadratmeter.'],
        ['Eine Kraft von 200 N wirkt auf 0,5 Quadratmeter. Wie gross ist der Druck in Pascal?', '400', '200 geteilt durch 0,5.'],
        ['Wie heisst das Gesetz Kraft mal Kraftarm gleich Last mal Lastarm?', 'hebelgesetz', 'Es beschreibt das Drehmomentgleichgewicht.'],
        ['An einem Hebel wirken F1 = 20 N bei l1 = 30 cm. Wie gross ist F2 bei l2 = 10 cm in Newton?', '60', '20 mal 30 geteilt durch 10.'],
        ['Wie nennt man eine Rolle, die nur die Richtung der Kraft aendert?', 'feste rolle', 'Sie spart keine Kraft.'],
        ['Um welchen Faktor verringert eine lose Rolle die noetige Zugkraft?', '2', 'Dafuer verdoppelt sich der Weg.'],
        ['Wie nennt man die Kraft, die einer Bewegung entgegenwirkt?', 'reibung', 'Sie wandelt Bewegungsenergie in Waerme um.'],
        ['Welche Reibung ist groesser: Haftreibung oder Gleitreibung?', 'haftreibung', 'Deshalb ist das Losfahren schwerer als das Weiterschieben.'],
        ['Wer formulierte das Gesetz zum Auftrieb in Fluessigkeiten?', 'archimedes', 'Der Auftrieb entspricht der Gewichtskraft der verdraengten Fluessigkeit.'],
        ['Wie lautet die Formel fuer mechanische Arbeit? Schreibe im Format F*s.', 'f*s', 'Kraft mal Weg in Kraftrichtung.'],
        ['Wie heisst die Einheit der Arbeit?', 'joule', 'Ein Joule ist ein Newtonmeter.'],
        ['Berechne die Arbeit, wenn 50 N ueber 4 m wirken, in Joule.', '200', '50 mal 4.'],
        ['Wie heisst die Einheit der Leistung?', 'watt', 'Ein Watt ist ein Joule pro Sekunde.'],
        ['Berechne die Leistung, wenn 600 J in 30 s verrichtet werden, in Watt.', '20', '600 geteilt durch 30.'],
        ['Was spart man laut der Goldenen Regel der Mechanik nicht ein?', 'arbeit', 'Kraftersparnis wird durch laengeren Weg erkauft.']
    ]);

    add('k7.chemie', M.atombau, [
        ['Wie heisst das kleinste Teilchen eines chemischen Elements?', 'atom', 'Es besteht aus Kern und Huelle.'],
        ['Welche Teilchen befinden sich im Atomkern?', 'protonen und neutronen', 'Elektronen umgeben den Kern.'],
        ['Welche Ladung traegt ein Elektron?', 'negativ', 'Protonen sind positiv, Neutronen neutral.'],
        ['Was gibt die Ordnungszahl eines Elements an?', 'protonenzahl', 'Im neutralen Atom ist sie gleich der Elektronenzahl.'],
        ['Wie heisst das Element mit dem Symbol Fe?', 'eisen', 'Vom lateinischen ferrum.'],
        ['Wie heisst das Element mit dem Symbol Na?', 'natrium', 'Es steht in der ersten Hauptgruppe.'],
        ['Wie lautet das Elementsymbol von Kalium?', 'k', 'Vom lateinischen kalium.'],
        ['Wie nennt man die senkrechten Spalten im Periodensystem?', 'gruppen', 'Elemente einer Gruppe haben aehnliche Eigenschaften.'],
        ['Wie nennt man die waagerechten Zeilen im Periodensystem?', 'perioden', 'Die Periodennummer gibt die Zahl der Schalen an.'],
        ['Wie heisst die Gruppe der Elemente mit voll besetzter Aussenschale?', 'edelgase', 'Sie sind sehr reaktionstraege.'],
        ['Wie heisst die erste Hauptgruppe?', 'alkalimetalle', 'Sie reagieren heftig mit Wasser.'],
        ['Wie heisst die siebte Hauptgruppe?', 'halogene', 'Dazu gehoeren Fluor, Chlor, Brom und Iod.'],
        ['Wie viele Elektronen fasst die erste Schale?', '2', 'Die zweite Schale fasst 8 Elektronen.'],
        ['Wie viele Aussenelektronen hat Sauerstoff?', '6', 'Sauerstoff steht in der sechsten Hauptgruppe.']
    ]);
    add('k7.chemie', M.bindung, [
        ['Wie lautet die Verhaeltnisformel von Natriumchlorid?', 'nacl', 'Ein Natrium-Ion je Chlorid-Ion.'],
        ['Ergaenze die Reaktionsgleichung __ H2 + O2 zu __ H2O. Wie lautet der erste Koeffizient?', '2', 'Es gilt 2 H2 + O2 ergibt 2 H2O.'],
        ['Wie heisst die Bindung zwischen einem Metall und einem Nichtmetall?', 'ionenbindung', 'Elektronen werden uebertragen.'],
        ['Wie heisst die Bindung zwischen zwei Nichtmetallen?', 'atombindung', 'Elektronenpaare werden gemeinsam genutzt.'],
        ['Wie nennt man ein positiv geladenes Ion?', 'kation', 'Es ist zur Kathode hin gewandert.'],
        ['Wie nennt man ein negativ geladenes Ion?', 'anion', 'Es hat Elektronen aufgenommen.']
    ]);

    add('k7.biologie', M.zelle, [
        ['Wer beschrieb 1665 erstmals Zellen unter dem Mikroskop?', 'hooke', 'Robert Hooke untersuchte Korkgewebe.'],
        ['Welches Bauteil hat nur die Pflanzenzelle und gibt ihr Stabilitaet?', 'zellwand', 'Sie besteht aus Cellulose.'],
        ['Wo liegt die Erbinformation einer Zelle?', 'zellkern', 'Dort liegt die DNA in Chromosomen.'],
        ['Wie heissen die Zellorganellen, die Energie bereitstellen?', 'mitochondrien', 'Dort laeuft die Zellatmung ab.'],
        ['In welchen Zellorganellen laeuft die Fotosynthese ab?', 'chloroplasten', 'Sie enthalten Chlorophyll.'],
        ['Wie heisst die Zellteilung, die zwei identische Tochterzellen erzeugt?', 'mitose', 'Der Chromosomensatz bleibt erhalten.'],
        ['Wie nennt man einen Verband gleichartiger Zellen?', 'gewebe', 'Mehrere Gewebe bilden ein Organ.'],
        ['Wie nennt man Lebewesen ohne echten Zellkern?', 'prokaryoten', 'Dazu zaehlen Bakterien.']
    ]);
    add('k7.biologie', M.pflanze, [
        ['Wie heisst das zweite Produkt der Fotosynthese neben dem Traubenzucker?', 'sauerstoff', 'Er stammt aus der Spaltung von Wasser.'],
        ['Wie heisst der Gegenprozess der Fotosynthese in der Zelle?', 'zellatmung', 'Traubenzucker wird unter Sauerstoffverbrauch abgebaut.'],
        ['Wie nennt man die Wasserabgabe ueber die Blaetter?', 'transpiration', 'Sie erzeugt den Sog im Wasserleitgewebe.'],
        ['Wie heissen die regelbaren Oeffnungen im Blatt fuer den Gasaustausch?', 'spaltoeffnungen', 'Schliesszellen steuern sie.']
    ]);
    add('k7.biologie', M.oeko, [
        ['Wie nennt man die Gesamtheit aller Lebewesen eines Lebensraums?', 'biozoenose', 'Zusammen mit dem Biotop bildet sie das Oekosystem.'],
        ['Wie nennt man den unbelebten Teil eines Oekosystems?', 'biotop', 'Boden, Wasser, Klima gehoeren dazu.'],
        ['Wie nennt man Umweltfaktoren wie Licht, Temperatur und Wasser?', 'abiotische faktoren', 'Biotische Faktoren gehen von Lebewesen aus.'],
        ['Wie nennt man ein Zusammenleben, bei dem nur ein Partner profitiert und der andere geschaedigt wird?', 'parasitismus', 'Beispiel: Zecke und Wirt.'],
        ['Wie viel Prozent der Energie gehen von einer Trophiestufe zur naechsten ungefaehr verloren?', '90', 'Daher sind Nahrungsketten kurz.'],
        ['Wie nennt man die Anreicherung von Schadstoffen entlang der Nahrungskette?', 'bioakkumulation', 'Endkonsumenten sind am staerksten belastet.'],
        ['Wie nennt man die Rolle einer Art im Oekosystem mit allen Anspruechen?', 'oekologische nische', 'Zwei Arten koennen dieselbe Nische dauerhaft nicht teilen.']
    ]);

    add('k7.geschichte', M.neuzeit, [
        ['In welchem Jahr erreichte Kolumbus Amerika?', '1492', 'Er suchte den westlichen Seeweg nach Indien.'],
        ['Wie heisst die geistige Bewegung der Renaissance, die den Menschen ins Zentrum stellte?', 'humanismus', 'Vorbild waren antike Texte.'],
        ['Wer malte die Mona Lisa?', 'leonardo da vinci', 'Er war zugleich Ingenieur und Naturforscher.'],
        ['Wessen Expedition umsegelte ab 1519 erstmals die Erde?', 'magellan', 'Er selbst starb 1521 auf den Philippinen.'],
        ['Welches Reich eroberte Cortes 1521?', 'aztekenreich', 'Die Hauptstadt Tenochtitlan wurde zerstoert.'],
        ['Welche Erfindung verbreitete die Reformation besonders schnell?', 'buchdruck', 'Flugschriften erreichten binnen Wochen ganz Europa.'],
        ['In welchem Jahr veroeffentlichte Luther seine 95 Thesen?', '1517', 'Sie richteten sich gegen den Ablasshandel.'],
        ['Gegen welche kirchliche Praxis richteten sich Luthers Thesen vor allem?', 'ablasshandel', 'Suendenerlass gegen Geldzahlung.'],
        ['Auf welcher Burg uebersetzte Luther das Neue Testament ins Deutsche?', 'wartburg', 'Dort lebte er 1521/22 als Junker Joerg.'],
        ['In welchem Jahr endete der Dreissigjaehrige Krieg?', '1648', 'Er hatte 1618 in Boehmen begonnen.'],
        ['Wie heisst der Friedensschluss von 1648?', 'westfaelischer frieden', 'Verhandelt in Muenster und Osnabrueck.'],
        ['Welcher lateinische Grundsatz von 1555 gab dem Landesherrn das Recht, die Konfession zu bestimmen?', 'cuius regio eius religio', 'Augsburger Religionsfrieden.'],
        ['Wie hiess der franzoesische Sonnenkoenig?', 'ludwig xiv', 'Er regierte von 1643 bis 1715.'],
        ['Wo residierte Ludwig XIV. ab 1682?', 'versailles', 'Der Hof diente der Kontrolle des Adels.'],
        ['Wie heisst die Wirtschaftslehre des Absolutismus mit Exportfoerderung und Importzoellen?', 'merkantilismus', 'Ziel war ein Ueberschuss an Edelmetall.'],
        ['Welcher preussische Koenig erhielt den Beinamen der Grosse?', 'friedrich ii', 'Er regierte von 1740 bis 1786.'],
        ['Wer formulierte den Wahlspruch der Aufklaerung <em>Habe Mut, dich deines eigenen Verstandes zu bedienen</em>?', 'kant', 'Immanuel Kant, 1784.'],
        ['Wer entwickelte die Lehre von der Gewaltenteilung?', 'montesquieu', 'Legislative, Exekutive und Judikative.'],
        ['In welchem Jahr erklaerten die dreizehn Kolonien ihre Unabhaengigkeit?', '1776', 'Am 4. Juli 1776 in Philadelphia.'],
        ['Wer gab gemeinsam mit d Alembert die franzoesische Enzyklopaedie heraus?', 'diderot', 'Sie erschien ab 1751.']
    ]);

    // ================================================================ Klasse 8
    add('k8.mathe', M.gleichung, [
        ['Im Gleichungssystem 2x + y = 10 und y = 4: Wie gross ist x?', '3', 'Einsetzungsverfahren: 2x = 6.'],
        ['Loese das System x + y = 10 und x - y = 2. Wie gross ist x?', '6', 'Additionsverfahren: 2x = 12.'],
        ['Multipliziere aus: (x + 3)(x + 5). Schreibe im Format x^2+8x+15.', 'x^2+8x+15', 'Jedes Glied mit jedem multiplizieren.'],
        ['Wende die erste binomische Formel auf (a + b)^2 an. Schreibe im Format a^2+2ab+b^2.', 'a^2+2ab+b^2', 'Merke: erstes Quadrat, doppeltes Produkt, zweites Quadrat.'],
        ['Faktorisiere x^2 - 9. Schreibe im Format (x+3)(x-3).', '(x+3)(x-3)', 'Dritte binomische Formel.']
    ]);
    add('k8.mathe', M.pythagoras, [
        ['Berechne die Hypotenuse bei a = 3 cm und b = 4 cm in Zentimetern.', '5', 'Wurzel aus 9 plus 16.'],
        ['Berechne die fehlende Kathete bei c = 13 cm und a = 5 cm in Zentimetern.', '12', 'Wurzel aus 169 minus 25.'],
        ['In welchem Dreieck gilt der Satz des Pythagoras?', 'rechtwinklig', 'Nur dort gilt a^2 + b^2 = c^2.'],
        ['Wie gross ist der Winkel an der Kreislinie im Thaleskreis in Grad?', '90', 'Satz des Thales.'],
        ['Berechne die Wurzel aus 144.', '12', '12 mal 12 ergibt 144.']
    ]);
    add('k8.mathe', M.potenz, [
        ['Fasse 2^3 &middot; 2^4 als eine Potenz zusammen. Schreibe im Format 2^7.', '2^7', 'Exponenten addieren.'],
        ['Fasse x^6 : x^2 als eine Potenz zusammen. Schreibe im Format x^4.', 'x^4', 'Exponenten subtrahieren.'],
        ['Berechne 3 hoch 0.', '1', 'Jede Potenz mit Exponent 0 ergibt 1.']
    ]);
    add('k8.mathe', M.kreis, [
        ['Berechne den Umfang eines Kreises mit r = 5 cm mit pi = 3,14 in Zentimetern.', '31,4', '2 mal 3,14 mal 5.'],
        ['Berechne die Flaeche eines Kreises mit r = 10 cm mit pi = 3,14 in Quadratzentimetern.', '314', '3,14 mal 100.'],
        ['Berechne das Volumen eines Zylinders mit r = 2 cm und h = 10 cm mit pi = 3,14 in Kubikzentimetern.', '125,6', '3,14 mal 4 mal 10.'],
        ['Wie viele Symmetrieachsen hat ein Quadrat?', '4', 'Zwei Mittelsenkrechte und zwei Diagonalen.']
    ]);
    add('k8.mathe', M.prozent, [
        ['Berechne die einfachen Zinsen fuer 1 000 Euro bei 5 Prozent nach zwei Jahren in Euro.', '100', 'Ohne Zinseszins: 50 Euro pro Jahr.'],
        ['Berechne den Endwert von 1 000 Euro bei 5 Prozent Zinseszins nach zwei Jahren in Cent.', '110250', '1000 mal 1,05 mal 1,05 sind 1102,50 Euro.']
    ]);

    add('k8.deutsch', M.satzbau, [
        ['Wie heisst die Probe, bei der man Satzglieder an den Satzanfang stellt?', 'umstellprobe', 'Was gemeinsam verschoben wird, ist ein Satzglied.'],
        ['Welche Sprachebene nutzt Ausdruecke wie <em>Alter, krass</em>?', 'umgangssprache', 'Sie ist situationsgebunden und informell.'],
        ['Wie nennt man den Wortschatz einer Berufsgruppe?', 'fachsprache', 'Sie ermoeglicht praezise Verstaendigung.'],
        ['Wie nennt man ein aus einer anderen Sprache uebernommenes Wort ohne Anpassung?', 'fremdwort', 'Angepasste Woerter heissen Lehnwoerter.']
    ], 'sprache');
    add('k8.deutsch', M.rechtschreib, [
        ['Wie schreibt man <code>Rad fahren</code>: getrennt oder zusammen?', 'getrennt', 'Nomen und Verb bleiben getrennt.'],
        ['Welche Schreibung folgt in <code>Fluss</code> auf den kurzen betonten Vokal?', 'ss', 'Nach langem Vokal oder Diphthong steht dagegen das scharfe s, zum Beispiel in Fuss.']
    ], 'rechtschreibung');
    add('k8.deutsch', M.schreiben, [
        ['Wie heisst eine Eroerterung, die nur eine Position entfaltet?', 'lineare eroerterung', 'Sie steigert die Argumente bis zum staerksten.'],
        ['Wie heisst eine Eroerterung mit Pro- und Contra-Seite?', 'dialektische eroerterung', 'Sie endet mit einer begruendeten Synthese.'],
        ['In welcher Reihenfolge ordnet man Argumente in der Eroerterung?', 'steigernd', 'Das staerkste Argument steht zuletzt.'],
        ['Wie heisst die Zeile im Geschaeftsbrief, die das Thema nennt?', 'betreff', 'Sie steht ohne das Wort Betreff.']
    ], 'schreiben');
    add('k8.deutsch', M.literatur, [
        ['Wie viele Akte hat ein klassisches Drama nach Freytag?', '5', 'Exposition, steigende Handlung, Hoehepunkt, fallende Handlung, Katastrophe.'],
        ['Was steht im dritten Akt des klassischen Dramas?', 'hoehepunkt', 'Dort faellt die entscheidende Wendung.'],
        ['Wie heisst der Umschwung der Handlung im Drama?', 'peripetie', 'Sie leitet die fallende Handlung ein.'],
        ['Wie nennt man ein Selbstgespraech einer Figur auf der Buehne?', 'monolog', 'Er macht innere Konflikte hoerbar.'],
        ['Wie heisst der ungluecklich endende Schluss einer Tragoedie?', 'katastrophe', 'In der Komoedie steht dort die Loesung.']
    ], 'literatur');
    add('k8.deutsch', M.medien, [
        ['Wie nennt man bewusst verbreitete Falschmeldungen?', 'fake news', 'Sie zielen auf Reichweite und Emotion.'],
        ['Wie nennt man den Effekt, dass Algorithmen vor allem passende Meinungen anzeigen?', 'filterblase', 'Gegenmittel ist bewusste Quellenvielfalt.'],
        ['Wie nennt man wiederholte Beleidigungen und Blossstellungen im Netz?', 'cybermobbing', 'Es ist strafrechtlich relevant.'],
        ['Wie heisst die EU-Verordnung zum Schutz personenbezogener Daten?', 'dsgvo', 'In Kraft seit 25. Mai 2018.'],
        ['Wie nennt man die Absicht eines Textes, den Leser zu einer Handlung zu bewegen?', 'appellfunktion', 'Neben Information und Ausdruck eine der Textfunktionen.']
    ], 'medien');

    add('k8.physik', M.elektrik, [
        ['Wie heisst die Einheit der elektrischen Stromstaerke?', 'ampere', 'Formelzeichen I.'],
        ['Wie heisst die Einheit der elektrischen Spannung?', 'volt', 'Formelzeichen U.'],
        ['Wie heisst die Einheit des elektrischen Widerstands?', 'ohm', 'Formelzeichen R.'],
        ['Wie lautet das ohmsche Gesetz? Schreibe im Format U=R*I.', 'u=r*i', 'Umgestellt: R = U/I.'],
        ['Berechne den Widerstand bei U = 12 V und I = 2 A in Ohm.', '6', '12 geteilt durch 2.'],
        ['Berechne die Stromstaerke bei U = 230 V und R = 46 Ohm in Ampere.', '5', '230 geteilt durch 46.'],
        ['Wie gross ist der Gesamtwiderstand von 10 Ohm und 20 Ohm in Reihe in Ohm?', '30', 'In Reihe addieren sich die Widerstaende.'],
        ['Wie gross ist der Gesamtwiderstand zweier 10-Ohm-Widerstaende parallel in Ohm?', '5', 'Bei gleichen Widerstaenden halbiert sich der Wert.'],
        ['Wie verhaelt sich die Stromstaerke in einer Reihenschaltung: ueberall gleich oder verschieden?', 'gleich', 'Die Spannungen teilen sich auf.'],
        ['Wie verhaelt sich die Spannung in einer Parallelschaltung: gleich oder verschieden?', 'gleich', 'Die Stroeme teilen sich auf.'],
        ['Wie lautet die Formel der elektrischen Leistung? Schreibe im Format P=U*I.', 'p=u*i', 'Einheit Watt.'],
        ['Berechne die Leistung bei 230 V und 0,5 A in Watt.', '115', '230 mal 0,5.'],
        ['Wie viele Joule entsprechen einer Kilowattstunde?', '3600000', '1000 W mal 3600 s.'],
        ['Welche Netzspannung hat das deutsche Haushaltsnetz in Volt?', '230', 'Bei 50 Hertz Wechselspannung.'],
        ['Ab welcher Stromstaerke in Milliampere wird Wechselstrom fuer den Menschen lebensgefaehrlich?', '50', 'Herzkammerflimmern ist moeglich.'],
        ['Welche Schutzeinrichtung schaltet bei einem Fehlerstrom sofort ab?', 'fi-schutzschalter', 'Fachlich Residual Current Device.'],
        ['Wie heisst die Sicherung, deren Draht bei Ueberlast schmilzt?', 'schmelzsicherung', 'Sie unterbricht den Stromkreis dauerhaft.'],
        ['Was entsteht um einen stromdurchflossenen Leiter?', 'magnetfeld', 'Die Feldlinien verlaufen kreisfoermig.'],
        ['Wie nennt man die Erzeugung einer Spannung durch Bewegung eines Leiters im Magnetfeld?', 'induktion', 'Grundlage von Generator und Transformator.']
    ]);

    add('k8.chemie', M.reaktion, [
        ['Wie nennt man die Abgabe von Elektronen bei einer Reaktion?', 'oxidation', 'Der Stoff wird oxidiert.'],
        ['Wie nennt man die Aufnahme von Elektronen bei einer Reaktion?', 'reduktion', 'Oxidation und Reduktion laufen stets gemeinsam ab.'],
        ['Wie nennt man eine Reaktion mit Elektronenuebergang?', 'redoxreaktion', 'Sie besteht aus Oxidation und Reduktion.'],
        ['Wie nennt man den langsamen Zerstoerungsprozess von Eisen an feuchter Luft?', 'korrosion', 'Es entsteht Eisenoxidhydrat, also Rost.'],
        ['Welche zwei Stoffe braucht Eisen zum Rosten?', 'sauerstoff und wasser', 'Salz beschleunigt den Vorgang.'],
        ['Welches Reduktionsmittel reduziert Eisenerz im Hochofen?', 'kohlenstoffmonoxid', 'Es entsteht aus Koks und Sauerstoff.']
    ]);
    add('k8.chemie', M.bindung, [
        ['Wie lautet die Verhaeltnisformel von Magnesiumoxid?', 'mgo', 'Magnesium gibt zwei Elektronen ab.'],
        ['Wie lautet die Verhaeltnisformel von Calciumchlorid?', 'cacl2', 'Calcium gibt zwei Elektronen ab, Chlor nimmt je eines auf.'],
        ['Wie viele Elektronen gibt ein Natriumatom ab?', '1', 'Es erreicht damit die Edelgaskonfiguration von Neon.'],
        ['Wie viele Elektronen nimmt ein Chloratom auf?', '1', 'Es erreicht damit die Konfiguration von Argon.'],
        ['Wie heisst die regelmaessige Anordnung der Ionen in einem Salz?', 'ionengitter', 'Daher sind Salze hart und sproede.'],
        ['Welche Teilchen ermoeglichen die Leitfaehigkeit einer Salzloesung?', 'ionen', 'Sie sind in Loesung frei beweglich.'],
        ['Wie heisst die Bindung in einem Metall?', 'metallbindung', 'Rumpfionen in einem Elektronengas.'],
        ['Wie nennt man die frei beweglichen Elektronen im Metall?', 'elektronengas', 'Sie erklaeren Leitfaehigkeit und Verformbarkeit.'],
        ['Welches Metall leitet elektrischen Strom am besten?', 'silber', 'Kupfer folgt dicht dahinter und ist guenstiger.']
    ]);
    add('k8.chemie', M.saeure, [
        ['Wie lautet die Formel von Schwefelsaeure?', 'h2so4', 'Sie ist eine zweiprotonige Saeure.'],
        ['Wie lautet die Formel von Natronlauge beziehungsweise Natriumhydroxid?', 'naoh', 'In Wasser entstehen Natrium- und Hydroxid-Ionen.'],
        ['Wie heisst die Reaktion einer Saeure mit einer Lauge?', 'neutralisation', 'Es entstehen Wasser und ein Salz.'],
        ['Welchen pH-Wert hat eine neutrale Loesung?', '7', 'Darunter sauer, darueber alkalisch.']
    ]);

    add('k8.biologie', M.mensch, [
        ['Welches Enzym im Speichel spaltet Staerke?', 'amylase', 'Deshalb schmeckt lang gekautes Brot suess.'],
        ['Welche Saeure sorgt im Magen fuer ein saures Milieu?', 'salzsaeure', 'Sie aktiviert Pepsin und toetet Keime.'],
        ['Welches Organ bildet die Gallenfluessigkeit?', 'leber', 'Gespeichert wird sie in der Gallenblase.'],
        ['Welches Organ produziert Insulin?', 'bauchspeicheldruese', 'Insulin senkt den Blutzuckerspiegel.'],
        ['Wie heissen die Ausstuelpungen der Duenndarmwand?', 'zotten', 'Sie vergroessern die Oberflaeche enorm.'],
        ['Wie viele Kammern und Vorhoefe hat das menschliche Herz zusammen?', '4', 'Zwei Vorhoefe und zwei Kammern.'],
        ['Wie heisst der Kreislauf zwischen Herz und Lunge?', 'lungenkreislauf', 'Der Koerperkreislauf versorgt die uebrigen Organe.'],
        ['Welches Blutgefaess fuehrt Blut vom Herzen weg?', 'arterie', 'Venen fuehren Blut zum Herzen zurueck.'],
        ['Wie heisst der rote Blutfarbstoff?', 'haemoglobin', 'Er bindet Sauerstoff reversibel.'],
        ['Wo findet der Gasaustausch in der Lunge statt?', 'lungenblaeschen', 'Fachlich Alveolen.'],
        ['Wie heisst der wichtigste Atemmuskel?', 'zwerchfell', 'Es senkt sich beim Einatmen.']
    ]);
    add('k8.biologie', M.mensch, [
        ['Wie nennt man einen koerperfremden Stoff, der eine Immunantwort ausloest?', 'antigen', 'Antikoerper passen dazu wie Schluessel und Schloss.'],
        ['Welche Zellen bilden Antikoerper?', 'b-lymphozyten', 'Sie reifen zu Plasmazellen heran.'],
        ['Wie nennt man den Impfschutz durch abgeschwaechte oder abgetoetete Erreger?', 'aktive immunisierung', 'Der Koerper bildet selbst Antikoerper.'],
        ['Wie nennt man die Gabe fertiger Antikoerper?', 'passive immunisierung', 'Sie wirkt sofort, aber nur kurz.'],
        ['Wirken Antibiotika gegen Viren? Antworte mit ja oder nein.', 'nein', 'Antibiotika wirken nur gegen Bakterien.'],
        ['Wie heissen die Immunzellen, die Eindringlinge aufnehmen und verdauen?', 'fresszellen', 'Fachlich Makrophagen.'],
        ['Wie heissen die Zellen, die eine Zweitinfektion schnell abwehren?', 'gedaechtniszellen', 'Sie begruenden die Immunitaet.']
    ]);

    add('k8.geschichte', M.revolution, [
        ['In welchem Jahr begann die Franzoesische Revolution?', '1789', 'Am 14. Juli wurde die Bastille gestuermt.'],
        ['Welches Gefaengnis wurde am 14. Juli 1789 gestuermt?', 'bastille', 'Es galt als Symbol koeniglicher Willkuer.'],
        ['Welcher Stand trug in Frankreich die Hauptlast der Steuern?', 'dritter', 'Adel und Klerus waren weitgehend befreit.'],
        ['Wie lautet das dritte Wort der Losung <em>Freiheit, Gleichheit, ...</em>?', 'bruederlichkeit', 'Franzoesisch fraternite.'],
        ['Wer fuehrte die Schreckensherrschaft von 1793/94 an?', 'robespierre', 'Er wurde 1794 selbst hingerichtet.'],
        ['In welchem Jahr kroente sich Napoleon zum Kaiser?', '1804', 'Die Kroenung fand in Notre-Dame statt.'],
        ['Wie heisst das 1804 eingefuehrte Gesetzbuch Napoleons?', 'code civil', 'Es sicherte Rechtsgleichheit und Eigentum.'],
        ['In welchem Jahr fand die Voelkerschlacht bei Leipzig statt?', '1813', 'Napoleon wurde entscheidend geschlagen.'],
        ['Welcher Kongress ordnete Europa 1815 neu?', 'wiener kongress', 'Ziel waren Restauration und Gleichgewicht.'],
        ['Wer leitete den Wiener Kongress?', 'metternich', 'Der oesterreichische Staatskanzler.'],
        ['In welchem Jahr fand das Hambacher Fest statt?', '1832', 'Erste grosse Demonstration fuer Einheit und Freiheit.'],
        ['In welchem Jahr tagte die Nationalversammlung in der Frankfurter Paulskirche?', '1848', 'Sie beriet eine gesamtdeutsche Verfassung.'],
        ['Welche Maschine wurde zum Motor der Industrialisierung?', 'dampfmaschine', 'Sie machte Fabriken standortunabhaengig.'],
        ['Wer verbesserte 1769 die Dampfmaschine entscheidend?', 'watt', 'James Watt fuehrte den separaten Kondensator ein.'],
        ['In welchem Land begann die Industrialisierung?', 'england', 'Kohle, Kapital und Kolonien beguenstigten sie.'],
        ['Wie nennt man die Massenarmut breiter Schichten im fruehen 19. Jahrhundert?', 'pauperismus', 'Er war Kern der sozialen Frage.'],
        ['Wer verfasste 1848 gemeinsam mit Engels das Kommunistische Manifest?', 'marx', 'Karl Marx und Friedrich Engels.'],
        ['In welchem Jahr wurde das Deutsche Kaiserreich gegruendet?', '1871', 'Am 18. Januar 1871.'],
        ['Wo wurde das Deutsche Kaiserreich ausgerufen?', 'versailles', 'Im Spiegelsaal des Schlosses.'],
        ['Wer wurde 1871 erster Reichskanzler?', 'bismarck', 'Otto von Bismarck praegte die Innen- und Aussenpolitik.']
    ]);

    // ================================================================ Klasse 9
    add('k9.mathe', M.quadratisch, [
        ['Loese x^2 = 49. Nenne die positive Loesung.', '7', 'Die zweite Loesung ist -7.'],
        ['Loese x^2 - 5x + 6 = 0. Nenne die groessere Loesung.', '3', 'Die Loesungen sind 2 und 3.'],
        ['Wie gross ist der Term unter der Wurzel der p-q-Formel fuer p = -6 und q = 8?', '1', '(-3)^2 minus 8 ergibt 1.'],
        ['Wie viele Loesungen hat eine quadratische Gleichung, wenn die Diskriminante null ist?', '1', 'Es gibt eine doppelte Loesung.'],
        ['Wie lautet die x-Koordinate des Scheitelpunkts von y = (x - 3)^2 + 2?', '3', 'Scheitel S(3|2).'],
        ['Ist die Parabel y = -2x^2 nach oben oder nach unten geoeffnet?', 'unten', 'Ein negativer Streckfaktor oeffnet nach unten.'],
        ['Berechne die Wurzel aus 0,25.', '0,5', '0,5 mal 0,5 ergibt 0,25.'],
        ['Berechne 2 hoch -3 als Dezimalzahl.', '0,125', 'Das ist 1 geteilt durch 8.']
    ]);
    add('k9.mathe', M.trigo, [
        ['Berechne sin(30 Grad).', '0,5', 'Merkwert im halben gleichseitigen Dreieck.'],
        ['Berechne cos(60 Grad).', '0,5', 'cos(60) entspricht sin(30).'],
        ['Berechne tan(45 Grad).', '1', 'Gegen- und Ankathete sind gleich lang.'],
        ['Welcher Quotient ergibt den Sinus? Schreibe im Format Gegenkathete/Hypotenuse.', 'gegenkathete/hypotenuse', 'Der Kosinus nutzt Ankathete durch Hypotenuse.'],
        ['In einem rechtwinkligen Dreieck ist die Gegenkathete 6 und die Hypotenuse 10. Wie gross ist der Sinus?', '0,6', '6 geteilt durch 10.']
    ]);
    add('k9.mathe', M.stochastik, [
        ['Wie viele Ergebnisse hat der zweifache Muenzwurf?', '4', 'KK, KZ, ZK, ZZ.'],
        ['Wie gross ist die Wahrscheinlichkeit fuer eine Sechs beim Wuerfeln? Schreibe im Format a/b.', '1/6', 'Ein guenstiges von sechs moeglichen Ergebnissen.'],
        ['Wie gross ist die Wahrscheinlichkeit fuer zweimal Kopf beim zweifachen Muenzwurf? Schreibe im Format a/b.', '1/4', 'Pfadregel: 1/2 mal 1/2.'],
        ['Wie heisst die Regel, nach der man entlang eines Pfades multipliziert?', 'produktregel', 'Ueber verschiedene Pfade wird addiert.'],
        ['Berechne den Mittelwert von 3, 7, 8, 10 und 12.', '8', 'Summe 40 geteilt durch 5.'],
        ['Berechne den Median von 3, 7, 8, 10 und 12.', '8', 'Der mittlere Wert der geordneten Liste.'],
        ['Wie gross ist die Wahrscheinlichkeit des Gegenereignisses zu p = 0,3?', '0,7', '1 minus 0,3.']
    ]);

    add('k9.deutsch', M.schreiben, [
        ['Wie nennt man einen formellen Brief mit Anschrift, Betreff, Anrede und Grussformel?', 'geschaeftsbrief', 'Die Bewerbung ist ein Geschaeftsbrief.'],
        ['Welche DIN-Norm regelt die Gestaltung von Geschaeftsbriefen?', 'din 5008', 'Sie legt Raender, Felder und Abstaende fest.'],
        ['Wie heisst der Lebenslauf, der Stationen in Spalten und Zeilen auflistet?', 'tabellarischer lebenslauf', 'Ueblich ist die antichronologische Reihenfolge.']
    ], 'schreiben');
    add('k9.deutsch', M.literatur, [
        ['Wie nennt man eine mittellange Erzaehlung um eine unerhoerte Begebenheit?', 'novelle', 'Der Begriff stammt von Goethe.'],
        ['Wie heisst das zentrale Dingsymbol der Novelle nach Paul Heyse?', 'falke', 'Daher die Falkentheorie.'],
        ['Wie nennt man einen Erzaehler, der alles weiss und kommentiert?', 'auktorialer erzaehler', 'Er steht ueber der Handlung.'],
        ['Welche Erzaehlperspektive zeigt das Geschehen nur aus der Sicht einer Figur?', 'personaler erzaehler', 'Der Leser weiss nicht mehr als die Figur.']
    ], 'literatur');
    add('k9.deutsch', M.wortart, [
        ['Wie nennt man eine regional gebundene Sprachvariante?', 'dialekt', 'Zum Beispiel Bairisch oder Plattdeutsch.'],
        ['Wie nennt man die Sprachvariante einer sozialen Gruppe?', 'soziolekt', 'Jugendsprache ist ein Beispiel.'],
        ['Wie nennt man ein aus dem Englischen uebernommenes Wort?', 'anglizismus', 'Zum Beispiel Download oder Meeting.']
    ], 'sprache');
    add('k9.deutsch', M.literatur, [
        ['Wie nennt man eine Frage, auf die keine Antwort erwartet wird?', 'rhetorische frage', 'Sie lenkt die Zustimmung des Publikums.'],
        ['Wie nennt man eine starke Uebertreibung als Stilmittel?', 'hyperbel', 'Zum Beispiel <em>ein Meer von Traenen</em>.'],
        ['Wie nennt man einen bildhaften Ausdruck ohne das Wort <em>wie</em>?', 'metapher', 'Zum Beispiel <em>Zahn der Zeit</em>.'],
        ['Wie nennt man die Wiederholung eines Wortes am Satzanfang?', 'anapher', 'Sie verstaerkt den Rhythmus.']
    ], 'literatur');
    add('k9.deutsch', M.medien, [
        ['Wie nennt man gezielte, einseitige Meinungsbeeinflussung durch Staaten oder Parteien?', 'propaganda', 'Sie arbeitet mit Feindbildern und Emotion.'],
        ['Wie nennt man die systematische Ueberpruefung von Behauptungen?', 'faktencheck', 'Redaktionen belegen dabei jede Aussage.'],
        ['Wie nennt man taeuschend echte, mit KI erzeugte Video- oder Tonaufnahmen?', 'deepfake', 'Sie erschweren die Quellenpruefung erheblich.'],
        ['Wie nennt man die Uebernahme fremder Texte ohne Quellenangabe?', 'plagiat', 'Zitate muessen immer belegt werden.']
    ], 'medien');

    add('k9.physik', M.energie, [
        ['Wie lautet die Formel der kinetischen Energie? Schreibe im Format 0.5*m*v^2.', '0.5*m*v^2', 'Die Geschwindigkeit geht quadratisch ein.'],
        ['Berechne die Hoehenenergie von 2 kg in 10 m Hoehe mit g = 9,81 N/kg in Joule.', '196,2', '2 mal 9,81 mal 10.'],
        ['Wie heisst der Satz, nach dem Energie in einem abgeschlossenen System konstant bleibt?', 'energieerhaltungssatz', 'Energie wird nur umgewandelt.'],
        ['Welchen Wirkungsgrad in Prozent haette eine ideale Maschine?', '100', 'Real gibt es immer Reibungsverluste.'],
        ['Von 800 J zugefuehrter Energie sind 200 J nutzbar. Wie gross ist der Wirkungsgrad in Prozent?', '25', '200 geteilt durch 800 mal 100.'],
        ['Wie gross ist der Luftdruck auf Meereshoehe ungefaehr in Hektopascal?', '1013', 'Das entspricht 1013 hPa Normaldruck.'],
        ['Wie nennt man den Druck in einer Fluessigkeit durch ihr Eigengewicht?', 'schweredruck', 'Er waechst linear mit der Tiefe.'],
        ['Wie lautet die Formel des Schweredrucks? Schreibe im Format rho*g*h.', 'rho*g*h', 'Dichte mal Ortsfaktor mal Hoehe.'],
        ['Nach wem ist das Prinzip der gleichmaessigen Druckausbreitung in Fluessigkeiten benannt?', 'pascal', 'Grundlage der hydraulischen Presse.']
    ]);
    add('k9.physik', M.kern, [
        ['Welche der drei Strahlungsarten ionisiert am staerksten?', 'alphastrahlung', 'Sie hat aber die geringste Reichweite.'],
        ['Welche Strahlungsart durchdringt Blei am staerksten?', 'gammastrahlung', 'Sie ist elektromagnetische Strahlung.'],
        ['Woraus besteht Alphastrahlung?', 'heliumkerne', 'Zwei Protonen und zwei Neutronen.'],
        ['Woraus besteht Betastrahlung?', 'elektronen', 'Bei Beta-plus-Zerfall sind es Positronen.'],
        ['Wie nennt man die Zeit, nach der die Haelfte der Kerne zerfallen ist?', 'halbwertszeit', 'Sie ist fuer jedes Nuklid charakteristisch.'],
        ['Wie viel Prozent des Ausgangsbestandes sind nach zwei Halbwertszeiten noch vorhanden?', '25', 'Die Haelfte der Haelfte.'],
        ['Wie heisst die Einheit der Aktivitaet?', 'becquerel', 'Ein Zerfall pro Sekunde.'],
        ['Wie heisst die Einheit der Energiedosis?', 'gray', 'Ein Joule pro Kilogramm.'],
        ['Wie heisst die Einheit der Aequivalentdosis?', 'sievert', 'Sie beruecksichtigt die biologische Wirksamkeit.'],
        ['Wie nennt man die Spaltung schwerer Atomkerne?', 'kernspaltung', 'Sie wird in Kernkraftwerken genutzt.'],
        ['Wie nennt man die Verschmelzung leichter Atomkerne?', 'kernfusion', 'Sie ist die Energiequelle der Sonne.'],
        ['Welches Element wird in klassischen Kernkraftwerken gespalten?', 'uran', 'Genutzt wird vor allem Uran-235.']
    ]);

    add('k9.chemie', M.saeure, [
        ['Welches Ion macht eine waessrige Loesung sauer?', 'h3o+', 'Das Oxonium-Ion.'],
        ['Welches Ion macht eine waessrige Loesung alkalisch?', 'oh-', 'Das Hydroxid-Ion.'],
        ['Welche Farbe zeigt Universalindikator bei pH 7?', 'gruen', 'Sauer ist rot, alkalisch blau.'],
        ['Wie lautet die Formel von Salzsaeure?', 'hcl', 'Chlorwasserstoff in Wasser geloest.'],
        ['Wie lautet die Formel von Salpetersaeure?', 'hno3', 'Ihre Salze heissen Nitrate.'],
        ['Wie heissen die Salze der Schwefelsaeure?', 'sulfate', 'Zum Beispiel Calciumsulfat im Gips.'],
        ['Wie heissen die Salze der Kohlensaeure?', 'carbonate', 'Zum Beispiel Calciumcarbonat im Kalk.'],
        ['Um welchen Faktor aendert sich die Oxonium-Konzentration je pH-Stufe?', '10', 'Der pH-Wert ist logarithmisch.'],
        ['Wie heisst das Verfahren zur Konzentrationsbestimmung mit Massloesung und Indikator?', 'titration', 'Der Aequivalenzpunkt wird bestimmt.'],
        ['Welches Gas entsteht, wenn eine Saeure mit einem unedlen Metall reagiert?', 'wasserstoff', 'Nachweis durch die Knallgasprobe.']
    ]);
    add('k9.chemie', M.organik, [
        ['Wie heisst das einfachste Alkan?', 'methan', 'Formel CH4.'],
        ['Wie lautet die Summenformel von Ethan?', 'c2h6', 'Zwei Kohlenstoff- und sechs Wasserstoffatome.'],
        ['Wie lautet die allgemeine Summenformel der Alkane?', 'cnh2n+2', 'Alkene haben CnH2n.'],
        ['Welche funktionelle Gruppe kennzeichnet Alkohole?', 'hydroxylgruppe', 'Sie besteht aus O und H.'],
        ['Wie lautet die Formel von Ethanol?', 'c2h5oh', 'Trinkalkohol.'],
        ['Wie heissen Kohlenwasserstoffe mit einer Doppelbindung?', 'alkene', 'Beispiel: Ethen.'],
        ['Womit weist man eine Kohlenstoff-Doppelbindung nach?', 'bromwasser', 'Die Braunfaerbung verschwindet.'],
        ['Wie nennt man Molekuele mit gleicher Summenformel, aber unterschiedlicher Struktur?', 'isomere', 'Beispiel: Butan und Isobutan.'],
        ['Welche Stoffklasse entsteht aus einem Alkohol und einer Carbonsaeure?', 'ester', 'Die Reaktion heisst Veresterung.']
    ]);

    add('k9.biologie', M.genetik, [
        ['Wie viele Chromosomen hat eine menschliche Koerperzelle?', '46', '23 Paare, davon ein Geschlechtschromosomenpaar.'],
        ['Wie viele Chromosomen hat eine menschliche Keimzelle?', '23', 'Der Chromosomensatz ist haploid.'],
        ['Wie heisst die Zellteilung, die Keimzellen erzeugt?', 'meiose', 'Sie halbiert den Chromosomensatz.'],
        ['Wer begruendete mit Kreuzungsversuchen an Erbsen die Vererbungsregeln?', 'mendel', 'Gregor Mendel, 1866 veroeffentlicht.'],
        ['Wie nennt man das aeussere Erscheinungsbild eines Merkmals?', 'phaenotyp', 'Der Genotyp ist die genetische Ausstattung.'],
        ['Wie nennt man ein Lebewesen mit zwei gleichen Allelen eines Gens?', 'homozygot', 'Bei ungleichen Allelen heterozygot.'],
        ['Welches Zahlenverhaeltnis zeigt der dominant-rezessive Erbgang in der zweiten Tochtergeneration?', '3:1', 'Drei Merkmalstraeger auf einen rezessiven.'],
        ['Mit welcher Base paart sich Adenin in der DNA?', 'thymin', 'Zwei Wasserstoffbruecken.'],
        ['Mit welcher Base paart sich Guanin in der DNA?', 'cytosin', 'Drei Wasserstoffbruecken.'],
        ['Wer beschrieb 1953 gemeinsam mit Crick die DNA-Doppelhelix?', 'watson', 'Grundlage waren Daten von Rosalind Franklin.'],
        ['Wie nennt man eine dauerhafte Veraenderung des Erbguts?', 'mutation', 'Sie ist Grundlage der genetischen Variabilitaet.'],
        ['Welche Blutgruppe des AB0-Systems gilt als Universalspender?', '0', 'Erythrozyten tragen keine A- oder B-Antigene.'],
        ['Wie nennt man einen Erbgang, bei dem beide Allele im Phaenotyp sichtbar sind?', 'kodominant', 'Beispiel: Blutgruppe AB.']
    ]);
    add('k9.biologie', M.evolution, [
        ['Wer formulierte die Evolutionstheorie der natuerlichen Selektion?', 'darwin', 'Charles Darwin, 1859.'],
        ['Wie nennt man Organe gleicher Herkunft mit unterschiedlicher Funktion?', 'homologe organe', 'Zum Beispiel Fledermausfluegel und Menschenhand.'],
        ['Wie nennt man Organe gleicher Funktion mit unterschiedlicher Herkunft?', 'analoge organe', 'Zum Beispiel Insekten- und Vogelfluegel.'],
        ['Wie nennt man funktionslos gewordene Reste von Organen?', 'rudimente', 'Beispiel: Blinddarmfortsatz.'],
        ['Wie heisst die Grundeinheit des Nervensystems?', 'neuron', 'Es besteht aus Zellkoerper, Dendriten und Axon.'],
        ['Wie heisst die Kontaktstelle zwischen zwei Nervenzellen?', 'synapse', 'Die Uebertragung erfolgt chemisch.'],
        ['Wie heisst das elektrische Signal, das entlang des Axons wandert?', 'aktionspotenzial', 'Es folgt dem Alles-oder-nichts-Prinzip.']
    ]);

    add('k9.geschichte', M.weltkriege, [
        ['In welchem Jahr begann der Erste Weltkrieg?', '1914', 'Kriegsausbruch Ende Juli und Anfang August.'],
        ['In welcher Stadt wurde der oesterreichische Thronfolger 1914 ermordet?', 'sarajevo', 'Attentat auf Franz Ferdinand am 28. Juni.'],
        ['Wie nennt man die erstarrte Kriegsform an der Westfront ab 1915?', 'stellungskrieg', 'Grabensysteme statt Bewegungskrieg.'],
        ['Welche Schlacht des Jahres 1916 dauerte rund zehn Monate?', 'verdun', 'Sie gilt als Sinnbild der Materialschlacht.'],
        ['In welchem Jahr endete der Erste Weltkrieg?', '1918', 'Waffenstillstand am 11. November.'],
        ['Wie heisst der Friedensvertrag von 1919?', 'versailler vertrag', 'Unterzeichnet am 28. Juni 1919.'],
        ['Welcher Artikel des Versailler Vertrags begruendete die Reparationen mit der Kriegsschuld?', '231', 'Er wurde in Deutschland als Kriegsschuldartikel bekaempft.'],
        ['Wer war der erste Reichspraesident der Weimarer Republik?', 'ebert', 'Friedrich Ebert, ab 1919.'],
        ['In welchem Jahr erreichte die Hyperinflation in Deutschland ihren Hoehepunkt?', '1923', 'Beendet durch die Rentenmark.'],
        ['Wie heisst der gescheiterte Muenchner Putschversuch Hitlers von 1923?', 'hitlerputsch', 'Auch Hitler-Ludendorff-Putsch.'],
        ['Welcher Aussenminister der Weimarer Republik erhielt 1926 den Friedensnobelpreis?', 'stresemann', 'Fuer die Verstaendigungspolitik von Locarno.'],
        ['Welcher Artikel der Weimarer Verfassung erlaubte dem Reichspraesidenten Notverordnungen?', '48', 'Er hoehlte ab 1930 das Parlament aus.'],
        ['In welchem Jahr begann die Weltwirtschaftskrise?', '1929', 'Boersenkrach in New York im Oktober.'],
        ['In welchem Jahr wurde Hitler zum Reichskanzler ernannt?', '1933', 'Am 30. Januar 1933.'],
        ['Wie heisst das Gesetz von 1933, das der Regierung die Gesetzgebung uebertrug?', 'ermaechtigungsgesetz', 'Es beseitigte die Gewaltenteilung.'],
        ['Wie nennt man die Ausschaltung aller unabhaengigen Institutionen durch die NSDAP?', 'gleichschaltung', 'Laender, Parteien, Verbaende und Presse.'],
        ['In welchem Jahr wurden die Nuernberger Gesetze erlassen?', '1935', 'Sie entrechteten die juedische Bevoelkerung.'],
        ['Wie werden die Novemberpogrome von 1938 auch genannt?', 'reichspogromnacht', 'Frueher irrefuehrend Reichskristallnacht.'],
        ['Wie hiess die Geheime Staatspolizei im NS-Staat kurz?', 'gestapo', 'Instrument von Ueberwachung und Terror.'],
        ['Wie hiess der letzte deutsche Kaiser?', 'wilhelm ii', 'Er dankte 1918 ab.']
    ]);

    // ================================================================ Klasse 10
    add('k10.mathe', M.exponential, [
        ['Berechne 2 hoch 10.', '1024', 'Verdopplung in zehn Schritten.'],
        ['Loese 2 hoch x gleich 32.', '5', '2 hoch 5 ergibt 32.'],
        ['Wie heisst die Umkehrfunktion der Exponentialfunktion?', 'logarithmus', 'Er loest die Gleichung nach dem Exponenten auf.'],
        ['Berechne den Zehnerlogarithmus von 1000.', '3', '10 hoch 3 ergibt 1000.'],
        ['Ein Kapital waechst jaehrlich um 5 Prozent. Wie lautet der Wachstumsfaktor?', '1,05', 'q ist 1 plus p/100.'],
        ['Ein Bestand halbiert sich pro Zeitschritt. Wie lautet der Zerfallsfaktor?', '0,5', 'Ein Faktor kleiner 1 bedeutet Abnahme.'],
        ['Berechne die Wurzel aus 2 auf drei Nachkommastellen.', '1,414', 'Eine irrationale Zahl.'],
        ['Wie nennt man Zahlen, die sich nicht als Bruch zweier ganzer Zahlen schreiben lassen?', 'irrational', 'Beispiele: Wurzel 2 und pi.'],
        ['Berechne 25 hoch 0,5.', '5', 'Der Exponent 0,5 ist die Quadratwurzel.']
    ]);
    add('k10.mathe', M.koerper, [
        ['Berechne das Volumen einer Kugel mit r = 3 cm mit pi = 3,14 in Kubikzentimetern.', '113,04', '4/3 mal 3,14 mal 27.'],
        ['Berechne die Oberflaeche einer Kugel mit r = 2 cm mit pi = 3,14 in Quadratzentimetern.', '50,24', '4 mal 3,14 mal 4.'],
        ['Berechne das Volumen eines Kegels mit r = 3 cm und h = 4 cm mit pi = 3,14 in Kubikzentimetern.', '37,68', 'Ein Drittel mal Grundflaeche mal Hoehe.'],
        ['Berechne das Volumen einer Pyramide mit Grundflaeche 24 Quadratzentimetern und h = 5 cm in Kubikzentimetern.', '40', 'Ein Drittel mal 24 mal 5.']
    ]);
    add('k10.mathe', M.trigo, [
        ['Wie heisst der Satz a^2 = b^2 + c^2 - 2bc &middot; cos(alpha)?', 'kosinussatz', 'Er verallgemeinert den Satz des Pythagoras.'],
        ['Berechne sin(90 Grad).', '1', 'Maximalwert der Sinusfunktion.'],
        ['Berechne cos(0 Grad).', '1', 'Maximalwert der Kosinusfunktion.'],
        ['Wie gross ist die Periode der Sinusfunktion in Grad?', '360', 'Nach 360 Grad wiederholt sich der Verlauf.'],
        ['Ein Baum wirft 12 m Schatten, ein 2 m hoher Stab 1,5 m. Wie hoch ist der Baum in Metern?', '16', 'Strahlensatz: 12 mal 2 geteilt durch 1,5.']
    ]);
    add('k10.mathe', M.stochastik, [
        ['Wie gross ist die Wahrscheinlichkeit fuer mindestens einmal Kopf bei drei Muenzwuerfen? Schreibe im Format a/b.', '7/8', 'Gegenereignis dreimal Zahl hat 1/8.']
    ]);

    add('k10.deutsch', M.schreiben, [
        ['Wie nennt man das Schreiben eines Textes auf Grundlage mehrerer vorgegebener Materialien?', 'materialgestuetztes schreiben', 'Zentrale Kompetenz im Abschlussjahrgang.'],
        ['Wie nennt man die Angabe im Text, die eine Aussage auf eine Quelle zurueckfuehrt?', 'beleg', 'Ohne Beleg bleibt eine Aussage unbegruendet.'],
        ['Welches Zeichen kennzeichnet ein woertliches Zitat?', 'anfuehrungszeichen', 'Zusaetzlich wird die Fundstelle genannt.'],
        ['Wie heisst das Verzeichnis aller verwendeten Quellen am Textende?', 'literaturverzeichnis', 'Es ist alphabetisch geordnet.']
    ], 'schreiben');
    add('k10.deutsch', M.literatur, [
        ['Wie heisst die literarische Stroemung von etwa 1770 bis 1785?', 'sturm und drang', 'Gefuehl und Genie stehen im Zentrum.'],
        ['Wie heisst die Epoche der Vernunft im 18. Jahrhundert?', 'aufklaerung', 'Leitbegriff ist die Muendigkeit des Menschen.'],
        ['Wer schrieb die Tragoedie <em>Faust</em>?', 'goethe', 'Erster Teil 1808 erschienen.'],
        ['Wer schrieb das Drama <em>Die Raeuber</em>?', 'schiller', 'Urauffuehrung 1782 in Mannheim.'],
        ['Wie nennt man eine Tragoedie mit buergerlichen Hauptfiguren?', 'buergerliches trauerspiel', 'Beispiel: Emilia Galotti.'],
        ['Wie uebersetzt man den aristotelischen Begriff Katharsis ins Deutsche?', 'reinigung', 'Gemeint ist die Laeuterung durch Furcht und Mitleid.'],
        ['Nenne eine der drei Einheiten des klassischen Dramas.', 'zeit', 'Einheit von Ort, Zeit und Handlung.'],
        ['Wie nennt man ein Gedicht aus 14 Versen mit fester Strophenform?', 'sonett', 'Zwei Quartette und zwei Terzette.'],
        ['Wie heisst das Versmass mit der Folge unbetont-betont?', 'jambus', 'Der Trochaeus ist umgekehrt.'],
        ['Wie heisst das Versmass mit der Folge betont-unbetont?', 'trochaeus', 'Typisch fuer Volkslieder.'],
        ['Wie nennt man die Verbindung zweier Gegensaetze wie <em>bittersuess</em>?', 'oxymoron', 'Ein Widerspruch in einer Wendung.'],
        ['Wie nennt man die Vermenschlichung von Dingen oder Naturerscheinungen?', 'personifikation', 'Zum Beispiel <em>die Sonne lacht</em>.'],
        ['Wie nennt man den Zeilensprung, bei dem ein Satz ueber das Versende hinausgeht?', 'enjambement', 'Er erzeugt Spannung und Tempo.']
    ], 'literatur');
    add('k10.deutsch', M.medien, [
        ['Wie nennt man die begruendete Beurteilung von Medienangeboten?', 'medienkritik', 'Sie prueft Absicht, Machart und Wirkung.'],
        ['Wie nennt man einen kurzen Text, der Inhalt und Ergebnis eines laengeren Textes zusammenfasst?', 'abstract', 'Er steht in wissenschaftlichen Arbeiten vorn.']
    ], 'medien');

    add('k10.physik', M.felder, [
        ['Welches Bauteil wandelt Wechselspannung in eine andere Wechselspannung um?', 'transformator', 'Er nutzt die Induktion.'],
        ['Wie lautet das Uebersetzungsverhaeltnis am Transformator? U1 zu U2 verhaelt sich wie ...', 'n1/n2', 'Windungszahlverhaeltnis.'],
        ['Ein Trafo hat 1000 Windungen primaer, 100 sekundaer und 230 V primaer. Wie gross ist die Sekundaerspannung in Volt?', '23', '230 geteilt durch 10.'],
        ['Welche Groesse wird bei der Hochspannungsuebertragung klein gehalten, um Verluste zu senken?', 'stromstaerke', 'Verluste wachsen mit dem Quadrat der Stromstaerke.'],
        ['Welche Frequenz hat das deutsche Stromnetz in Hertz?', '50', 'Europaweit einheitlich 50 Hz.']
    ]);
    add('k10.physik', M.optik, [
        ['Wie nennt man das Ausloesen von Elektronen aus einer Metalloberflaeche durch Licht?', 'fotoeffekt', 'Er belegt den Teilchencharakter des Lichts.'],
        ['Wer erklaerte 1905 den Fotoeffekt mit Lichtquanten?', 'einstein', 'Dafuer erhielt er 1921 den Nobelpreis.'],
        ['Wie berechnet man die Energie eines Photons? Schreibe im Format h*f.', 'h*f', 'Plancksches Wirkungsquantum mal Frequenz.'],
        ['Wie nennt man das Doppelverhalten des Lichts als Welle und als Teilchen?', 'welle-teilchen-dualismus', 'Er gilt auch fuer Materie.'],
        ['Wie nennt man die Ueberlagerung zweier Wellen?', 'interferenz', 'Sie kann verstaerkend oder ausloeschend sein.'],
        ['Wie nennt man die Ausbreitung von Wellen in den geometrischen Schattenraum hinter einem Spalt?', 'beugung', 'Sie ist ein Wellenphaenomen.'],
        ['Wie gross ist die Lichtgeschwindigkeit im Vakuum gerundet in Metern pro Sekunde?', '300000000', 'Exakt 299 792 458 m/s.']
    ]);
    add('k10.physik', M.kern, [
        ['Wie lautet die Formel der Masse-Energie-Aequivalenz? Schreibe im Format E=m*c^2.', 'e=m*c^2', 'Grundlage des Massendefekts.'],
        ['Wie nennt man Protonen und Neutronen gemeinsam?', 'nukleon', 'Ihre Summe ist die Massenzahl.'],
        ['Wie nennt man Atome mit gleicher Protonenzahl, aber unterschiedlicher Neutronenzahl?', 'isotope', 'Sie sind chemisch nahezu gleich.'],
        ['Wie viele Neutronen enthaelt der Kern von Kohlenstoff-14?', '8', '14 minus 6 Protonen.'],
        ['Wie heisst die Altersbestimmung organischer Funde mit Kohlenstoff-14?', 'radiokarbonmethode', 'Nutzbar bis rund 50 000 Jahre.'],
        ['Wie gross ist die Halbwertszeit von Kohlenstoff-14 ungefaehr in Jahren?', '5730', 'Standardwert der Radiokarbondatierung.'],
        ['Welches Material schirmt Gammastrahlung besonders gut ab?', 'blei', 'Hohe Dichte und Ordnungszahl.']
    ]);

    add('k10.chemie', M.organik, [
        ['Wie heisst das Alkan mit drei Kohlenstoffatomen?', 'propan', 'Formel C3H8.'],
        ['Wie heisst das Alkan mit vier Kohlenstoffatomen?', 'butan', 'Formel C4H10.'],
        ['Wie lautet die Summenformel von Propan?', 'c3h8', 'Nach der Regel CnH2n+2.'],
        ['Wie heisst die funktionelle Gruppe -COOH?', 'carboxylgruppe', 'Kennzeichen der Carbonsaeuren.'],
        ['Wie heisst die Saeure, die Speiseessig sauer macht?', 'essigsaeure', 'Systematisch Ethansaeure.'],
        ['Wie lautet die Formel von Essigsaeure?', 'ch3cooh', 'Auch als C2H4O2 schreibbar.'],
        ['Wie nennt man die Rueckreaktion der Veresterung mit Wasser?', 'hydrolyse', 'Ester wird wieder zu Saeure und Alkohol.'],
        ['Wie nennt man lange Molekuelketten aus vielen gleichen Bausteinen?', 'polymere', 'Grundlage der Kunststoffe.'],
        ['Wie heisst der einzelne Grundbaustein eines Polymers?', 'monomer', 'Beispiel: Ethen fuer Polyethen.'],
        ['Wie nennt man Kunststoffe, die sich beim Erwaermen verformen lassen?', 'thermoplaste', 'Duroplaste bleiben dagegen fest.'],
        ['Wie heisst Traubenzucker fachsprachlich?', 'glucose', 'Ein Einfachzucker.'],
        ['Wie lautet die Summenformel von Glucose?', 'c6h12o6', 'Gleiche Formel wie Fructose.'],
        ['Womit weist man Staerke nach?', 'iodprobe', 'Es entsteht eine tiefblaue Faerbung.'],
        ['Wie heissen die Bausteine der Proteine?', 'aminosaeuren', 'Es gibt 20 proteinogene Aminosaeuren.'],
        ['Wie heisst die Bindung zwischen zwei Aminosaeuren?', 'peptidbindung', 'Sie entsteht unter Wasserabspaltung.'],
        ['Aus welchem dreiwertigen Alkohol bestehen Fette?', 'glycerin', 'Verestert mit drei Fettsaeuren.'],
        ['Welches Produkt entsteht bei der Verseifung von Fett mit Lauge?', 'seife', 'Die Salze der Fettsaeuren.'],
        ['Wie nennt man Molekuele mit einem wasserliebenden und einem wasserabweisenden Teil?', 'amphiphil', 'Grundlage der Waschwirkung.']
    ]);

    add('k10.biologie', M.genetik, [
        ['Wie heisst das Umschreiben eines DNA-Abschnitts in mRNA?', 'transkription', 'Sie findet im Zellkern statt.'],
        ['Wie heisst die Uebersetzung der mRNA in eine Aminosaeurekette?', 'translation', 'Sie findet am Ribosom statt.'],
        ['Aus wie vielen Basen besteht ein Codon?', '3', 'Ein Basentriplett codiert eine Aminosaeure.'],
        ['An welchem Zellorganell findet die Translation statt?', 'ribosom', 'Aus rRNA und Proteinen aufgebaut.'],
        ['Wie heisst die identische Verdopplung der DNA?', 'replikation', 'Sie verlaeuft semikonservativ.'],
        ['Welches Enzym verknuepft bei der Replikation neue Nukleotide?', 'dna-polymerase', 'Sie arbeitet in 5-nach-3-Richtung.'],
        ['Wie heissen Enzyme, die DNA an definierten Sequenzen schneiden?', 'restriktionsenzyme', 'Werkzeug der Gentechnik.'],
        ['Wie heisst das Verfahren zur Vervielfaeltigung von DNA im Labor?', 'pcr', 'Polymerase-Kettenreaktion.'],
        ['Wie heisst die aus der Bakterienabwehr stammende Genschere?', 'crispr', 'CRISPR/Cas9 wurde 2020 mit dem Nobelpreis geehrt.'],
        ['Wie nennt man ein Lebewesen, das ein artfremdes Gen traegt?', 'transgen', 'Grundlage gentechnisch veraenderter Organismen.']
    ]);
    add('k10.biologie', M.oeko, [
        ['Wie nennt man die Vielfalt der Arten, Gene und Oekosysteme zusammen?', 'biodiversitaet', 'Sie ist Grundlage stabiler Oekosysteme.'],
        ['Wie nennt man Arten, die durch den Menschen in neue Gebiete gelangen?', 'neobiota', 'Sie koennen heimische Arten verdraengen.'],
        ['Wie nennt man Arten, deren Vorkommen den Zustand eines Lebensraums anzeigt?', 'zeigerarten', 'Beispiel: Flechten als Anzeiger fuer Luftqualitaet.'],
        ['Welches Gas ist der wichtigste vom Menschen verursachte Treibhausgasanteil?', 'kohlenstoffdioxid', 'Vor allem aus der Verbrennung fossiler Energietraeger.'],
        ['Wie nennt man die Gesamtheit der Mikroorganismen im menschlichen Darm?', 'mikrobiom', 'Es beeinflusst Verdauung und Immunsystem.'],
        ['Wie nennt man die erbliche Anpassung einer Art ueber viele Generationen?', 'adaptation', 'Ergebnis von Variation und Selektion.'],
        ['Wie nennt man die Entstehung neuer Arten?', 'artbildung', 'Fachlich Speziation.'],
        ['Wie nennt man Artbildung durch raeumliche Trennung von Populationen?', 'allopatrisch', 'Gegensatz: sympatrische Artbildung.']
    ]);

    add('k10.geschichte', M.nachkrieg, [
        ['Mit dem Ueberfall auf welches Land begann der Zweite Weltkrieg?', 'polen', 'Am 1. September 1939.'],
        ['In welchem Jahr begann der Zweite Weltkrieg?', '1939', 'Er endete in Europa 1945.'],
        ['Wie hiess der deutsche Angriff auf die Sowjetunion 1941?', 'unternehmen barbarossa', 'Beginn am 22. Juni 1941.'],
        ['Welche Schlacht 1942/43 gilt als Wendepunkt an der Ostfront?', 'stalingrad', 'Die 6. Armee kapitulierte Anfang 1943.'],
        ['In welchem Jahr landeten die Alliierten in der Normandie?', '1944', 'D-Day am 6. Juni 1944.'],
        ['In welchem Jahr kapitulierte Deutschland bedingungslos?', '1945', 'Am 8. Mai 1945.'],
        ['Wie heisst die Konferenz von 1942 zur Organisation des Voelkermords?', 'wannseekonferenz', 'Am 20. Januar 1942 in Berlin.'],
        ['Wie nennt man den Voelkermord an den europaeischen Juden mit hebraeischem Begriff?', 'shoah', 'Auch Holocaust genannt.'],
        ['Wie viele Millionen Juden wurden im Holocaust ermordet?', '6', 'Rund sechs Millionen Menschen.'],
        ['Wie heisst das groesste deutsche Vernichtungslager im besetzten Polen?', 'auschwitz', 'Befreit am 27. Januar 1945.'],
        ['Wer veruebte am 20. Juli 1944 das Attentat auf Hitler?', 'stauffenberg', 'Claus Schenk Graf von Stauffenberg.'],
        ['Wie heissen die Verfahren gegen die Hauptkriegsverbrecher ab 1945?', 'nuernberger prozesse', 'Grundlage des modernen Voelkerstrafrechts.'],
        ['In welchem Jahr wurde das Grundgesetz verkuendet?', '1949', 'Am 23. Mai 1949.'],
        ['In welchem Jahr wurde die Berliner Mauer gebaut?', '1961', 'Beginn am 13. August 1961.'],
        ['Wie heisst die Krise von 1962 um sowjetische Raketen auf Kuba?', 'kubakrise', 'Sie brachte die Welt an den Rand eines Atomkriegs.'],
        ['Welcher Bundeskanzler stand fuer die neue Ostpolitik?', 'brandt', 'Willy Brandt, Kanzler ab 1969.'],
        ['In welchem Jahr fiel die Berliner Mauer?', '1989', 'Am 9. November 1989.'],
        ['In welchem Jahr wurde Deutschland wiedervereinigt?', '1990', 'Am 3. Oktober 1990.'],
        ['Wie heisst der Vertrag von 1990 mit den vier Siegermaechten?', 'zwei-plus-vier-vertrag', 'Er regelte die aussenpolitischen Bedingungen der Einheit.'],
        ['In welchem Jahr wurde der Euro als Bargeld eingefuehrt?', '2002', 'Am 1. Januar 2002.'],
        ['Wie heisst der Vertrag von 1992, mit dem die Europaeische Union gegruendet wurde?', 'maastricht', 'Vertrag von Maastricht.']
    ]);

    flush();
})();
