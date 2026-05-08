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
            { id: 'k5',  label: 'Klasse 5',  subjects: ['mathe', 'englisch'] },
            { id: 'k6',  label: 'Klasse 6',  subjects: ['mathe', 'englisch'] },
            { id: 'k7',  label: 'Klasse 7',  subjects: ['mathe', 'englisch'] },
            { id: 'k8',  label: 'Klasse 8',  subjects: ['mathe', 'englisch'] },
            { id: 'k9',  label: 'Klasse 9',  subjects: ['mathe', 'englisch'] },
            { id: 'k10', label: 'Klasse 10', subjects: ['mathe', 'englisch'] }
        ],
        subjects: {
            mathe: { label: 'Mathematik' },
            englisch: { label: 'Englisch' }
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
            'k6.mathe':  { mode: 'stub' },
            'k6.englisch': { mode: 'stub' },
            'k7.mathe':  { mode: 'stub' },
            'k7.englisch': { mode: 'stub' },
            'k8.mathe':  { mode: 'stub' },
            'k8.englisch': { mode: 'stub' },
            'k9.mathe':  { mode: 'stub' },
            'k9.englisch': { mode: 'stub' },
            'k10.mathe': { mode: 'stub' },
            'k10.englisch': { mode: 'stub' }
        },
        // Antwort-Vergleich (tolerant): trim + Komma->Punkt + Kleinschreibung; "R" Groß/klein egal.
        normalize: function (s) {
            return String(s).trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
        }
    };
})();
