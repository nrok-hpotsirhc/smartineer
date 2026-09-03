/*
 * Schueler-Sprachen-Top-up v110 — kuratierte Grammatikaufgaben Klasse 5-10
 * (Arbeitspaket P-DATA-SCHUELER-5-10-PLUS-B)
 *
 * Architektur:
 *   - Wird NACH js/data/schueler_topups_v109.js geladen und erweitert die
 *     Sprachpools (Englisch, Franzoesisch, Latein) append-only.
 *   - Alle Items tragen kind: 'grammar' und section: 'grammar' und landen damit
 *     im bestehenden Grammatik-Abschnitt der Fachkarte (AGENTS §17.3).
 *   - Frage-Stems sind grammatikspezifisch und damit kollisionsarm; exakte
 *     Dubletten und Widersprueche faengt tools/validate.js ab.
 *
 * Fachliche Grundlage:
 *   - Englisch/Franzoesisch: NRW-Kernlehrplaene Sekundarstufe I, CEFR-Progression
 *     A1 (Kl. 5) bis B1 (Kl. 10).
 *   - Latein: NRW-Kernlehrplan Latein SI, Kompetenzbereich Sprache (Formenlehre,
 *     Syntax, Satzwertige Konstruktionen) sowie Stilistik/Metrik in Kl. 10.
 *
 * Ehrlichkeitsgrenze:
 *   - Curriculum-orientiert, nicht lehrwerksspezifisch. Fuer eine konkrete
 *     Lehrwerksprogression (Green Line, Decouvertes, Pontes/Cursus) muss die
 *     autorisierte Liste nachgereicht werden.
 */
(function () {
    const SCH = window.SCHUELER;
    if (!SCH) return;

    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function solutionHtml(answer, note) {
        return (note ? '<p>' + esc(note) + '</p>' : '')
            + '<p>Antwort: <code>' + esc(answer) + '</code></p>';
    }

    const PENDING = {};
    function addGrammar(key, merksatz, rows) {
        const bucket = PENDING[key] || (PENDING[key] = []);
        rows.forEach(function (row) {
            bucket.push({
                q: row[0],
                a: String(row[1]),
                f: merksatz || '',
                s: solutionHtml(row[1], row[2]),
                kind: 'grammar',
                section: 'grammar'
            });
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

    const M = {
        enBasic: '<p><strong>Merksatz.</strong> <em>to be</em>: I am, you are, he/she/it is. <em>to have</em>: I have, he/she/it has. Im Simple Present bekommt die 3. Person Singular ein <code>-s</code>.</p>',
        enPast: '<p><strong>Merksatz.</strong> Regelmaessige Verben bilden das Simple Past mit <code>-ed</code>. Fragen und Verneinungen laufen ueber <em>did</em>; danach steht der Infinitiv ohne <code>-ed</code>.</p>',
        enPerfect: '<p><strong>Merksatz.</strong> Present Perfect = <em>have/has</em> + Past Participle. Signalwoerter: since, for, already, yet, ever, never. <em>ago</em> und <em>yesterday</em> verlangen dagegen Simple Past.</p>',
        enPassive: '<p><strong>Merksatz.</strong> Passiv = Form von <em>to be</em> + Past Participle. Das Objekt des Aktivsatzes wird zum Subjekt des Passivsatzes.</p>',
        enConditional: '<p><strong>Merksatz.</strong> Typ I: if + Simple Present, will + Infinitiv. Typ II: if + Simple Past, would + Infinitiv. Typ III: if + Past Perfect, would have + Past Participle.</p>',
        enAdvanced: '<p><strong>Merksatz.</strong> Formelle Texte bevorzugen Passiv und Verbindungswoerter (however, moreover, therefore). Nach Praepositionen steht immer das Gerund.</p>',

        frBasic: '<p><strong>Merksatz.</strong> <em>etre</em>: je suis, tu es, il est. <em>avoir</em>: j\'ai, tu as, il a. Verneinung klammert das Verb: <em>ne ... pas</em>. Adjektive richten sich in Geschlecht und Zahl nach dem Nomen.</p>',
        frPasse: '<p><strong>Merksatz.</strong> Passe compose = avoir/etre + participe passe. Bewegungs- und Zustandsveraenderungsverben nehmen <em>etre</em>; dann gleicht sich das Partizip dem Subjekt an.</p>',
        frImparfait: '<p><strong>Merksatz.</strong> Imparfait beschreibt Zustaende, Gewohnheiten und Hintergrund; Passe compose nennt die abgeschlossene Einzelhandlung im Vordergrund.</p>',
        frPronoms: '<p><strong>Merksatz.</strong> Objektpronomen stehen vor dem konjugierten Verb. <em>y</em> ersetzt Ortsangaben, <em>en</em> Mengenangaben und Ausdruecke mit <em>de</em>.</p>',
        frSubjonctif: '<p><strong>Merksatz.</strong> Der Subjonctif steht nach Ausdruecken des Wollens, Fuehlens und Muessens (il faut que, bien que, pour que), nicht nach Ausdruecken der Gewissheit.</p>',
        frAdvanced: '<p><strong>Merksatz.</strong> Bedingungssatz Typ 3: si + plus-que-parfait, conditionnel passe. In der indirekten Rede der Vergangenheit wird present zu imparfait und futur zu conditionnel.</p>',

        laForm: '<p><strong>Merksatz.</strong> a-Deklination: -a, -ae, -ae, -am, -a. o-Deklination (m.): -us, -i, -o, -um, -o. Personalendungen Aktiv: -o/-m, -s, -t, -mus, -tis, -nt.</p>',
        laTempus: '<p><strong>Merksatz.</strong> Imperfekt-Kennzeichen <code>-ba-</code>, Perfekt ueber den Perfektstamm mit -i, -isti, -it, -imus, -istis, -erunt. Steigerung: -ior (Komparativ), -issimus (Superlativ).</p>',
        laAci: '<p><strong>Merksatz.</strong> AcI: Subjektsakkusativ + Infinitiv nach Verben des Sagens, Denkens und Wahrnehmens. Infinitiv Praesens = Gleichzeitigkeit, Infinitiv Perfekt = Vorzeitigkeit.</p>',
        laKonjunktiv: '<p><strong>Merksatz.</strong> <em>ut</em> + Konjunktiv leitet Final- und Konsekutivsaetze ein, <em>ne</em> den negierten Finalsatz. Die indirekte Frage steht immer im Konjunktiv.</p>',
        laSyntax: '<p><strong>Merksatz.</strong> Das Gerundivum druckt Notwendigkeit aus. Irrealis der Gegenwart: Konjunktiv Imperfekt, Irrealis der Vergangenheit: Konjunktiv Plusquamperfekt.</p>',
        laStil: '<p><strong>Merksatz.</strong> Der Hexameter hat sechs Versfuesse, ueberwiegend Daktylen (lang-kurz-kurz). Haeufige Stilmittel: Anapher, Chiasmus, Parallelismus, Asyndeton, Hyperbaton.</p>'
    };

    // ============================================================ Englisch
    addGrammar('k5.englisch', M.enBasic, [
        ['Wie lautet die 1. Person Singular von <code>to be</code>?', 'am', 'I am.'],
        ['Wie lautet die 3. Person Singular von <code>to be</code>?', 'is', 'He/she/it is.'],
        ['Wie lautet die 3. Person Singular Praesens von <code>to have</code>?', 'has', 'He has a dog.'],
        ['Welche Endung bekommt das Verb im Simple Present in der 3. Person Singular?', 's', 'She works, he plays.'],
        ['Wie lautet die Verneinung von <code>He works</code> im Simple Present?', 'he does not work', 'Kurzform: he doesn\'t work.'],
        ['Welches Hilfsverb bildet Fragen im Simple Present in der 3. Person Singular?', 'does', 'Does he work?'],
        ['Wie lautet der Plural von <code>child</code>?', 'children', 'Unregelmaessige Pluralform.'],
        ['Wie lautet der Plural von <code>man</code>?', 'men', 'Unregelmaessige Pluralform.'],
        ['Wie lautet der Plural von <code>box</code>?', 'boxes', 'Nach s, x, ch, sh steht -es.'],
        ['Welcher unbestimmte Artikel steht vor <code>apple</code>?', 'an', 'Vor gesprochenem Vokal steht an.'],
        ['Welches Personalpronomen ersetzt <code>Anna and I</code>?', 'we', '1. Person Plural.'],
        ['Welcher Possessivbegleiter gehoert zu <code>he</code>?', 'his', 'His book.'],
        ['Welches Fragewort fragt nach dem Ort?', 'where', 'Where do you live?'],
        ['Welches Fragewort fragt nach dem Grund?', 'why', 'Why are you late?'],
        ['Wie lautet die Kurzform von <code>cannot</code>?', 'can\'t', 'Mit Apostroph geschrieben.'],
        ['Wie lautet der Imperativ von <code>to go</code>?', 'go', 'Der Imperativ ist der reine Infinitiv.'],
        ['Welches Zeichen kennzeichnet den s-Genitiv?', 'apostroph', 'The dog\'s bone.'],
        ['Wie lautet die Verlaufsform (present progressive) von <code>I read</code>?', 'i am reading', 'to be + Verb mit -ing.'],
        ['Welche Praeposition steht vor Wochentagen, zum Beispiel <code>___ Monday</code>?', 'on', 'on Monday, on 3 May.'],
        ['Welche Praeposition steht vor Uhrzeiten, zum Beispiel <code>___ five o\'clock</code>?', 'at', 'at five, at night.']
    ]);
    addGrammar('k6.englisch', M.enPast, [
        ['Wie lautet das Simple Past von <code>to go</code>?', 'went', 'Unregelmaessiges Verb.'],
        ['Wie lautet das Simple Past von <code>to see</code>?', 'saw', 'see - saw - seen.'],
        ['Wie lautet das Simple Past von <code>to buy</code>?', 'bought', 'buy - bought - bought.'],
        ['Welche Endung bekommen regelmaessige Verben im Simple Past?', 'ed', 'work - worked.'],
        ['Wie lautet die Verneinung von <code>She played</code> im Simple Past?', 'she did not play', 'Nach did steht der Infinitiv.'],
        ['Welches Hilfsverb bildet Fragen im Simple Past?', 'did', 'Did you see him?'],
        ['Wie lautet der Komparativ von <code>big</code>?', 'bigger', 'Konsonantverdopplung bei kurzem Vokal.'],
        ['Wie lautet der Superlativ von <code>good</code>?', 'best', 'good - better - best.'],
        ['Wie lautet der Komparativ von <code>expensive</code>?', 'more expensive', 'Ab zwei Silben mit more.'],
        ['Wie lautet das going-to-future von <code>I visit</code>?', 'i am going to visit', 'Fuer geplante Absichten.'],
        ['Welches Wort steht in Verneinungen und Fragen: <code>some</code> oder <code>any</code>?', 'any', 'I don\'t have any money.'],
        ['Wie lautet das Adverb zu <code>quick</code>?', 'quickly', 'Adjektiv + -ly.'],
        ['Wie lautet das Adverb zu <code>good</code>?', 'well', 'Unregelmaessige Adverbform.'],
        ['Welche Praeposition steht vor Monaten, zum Beispiel <code>___ July</code>?', 'in', 'in July, in 2026.'],
        ['Wie lautet das present progressive von <code>they play</code>?', 'they are playing', 'are + Verb mit -ing.'],
        ['Wie lautet das Simple Past von <code>to be</code> in der 1. Person Singular?', 'was', 'I was at home.'],
        ['Wie lautet das Simple Past von <code>to be</code> im Plural?', 'were', 'We were happy.'],
        ['Wie lautet das Past Participle von <code>to write</code>?', 'written', 'write - wrote - written.'],
        ['Wie heisst die Verlaufsform in der Vergangenheit auf Englisch?', 'past progressive', 'was/were + Verb mit -ing.'],
        ['Ergaenze die Subjektfrage: <code>___ broke the window?</code>', 'who', 'In der Subjektfrage steht kein did.']
    ]);
    addGrammar('k7.englisch', M.enPerfect, [
        ['Wie lautet das Present Perfect von <code>I see</code>?', 'i have seen', 'have + Past Participle.'],
        ['Welches Signalwort verlangt Present Perfect: <code>yesterday</code> oder <code>since</code>?', 'since', 'since 2020, for two years.'],
        ['Welches Signalwort verlangt Simple Past: <code>already</code> oder <code>ago</code>?', 'ago', 'two years ago.'],
        ['Wie lautet das will-future von <code>she come</code>?', 'she will come', 'Fuer Vorhersagen und spontane Entschluesse.'],
        ['Ergaenze Typ I: <code>If it rains, I ___ at home.</code>', 'will stay', 'if-Satz im Present, Hauptsatz mit will.'],
        ['Welches Relativpronomen steht fuer Personen?', 'who', 'The man who called.'],
        ['Welches Relativpronomen steht fuer Sachen?', 'which', 'The book which I read.'],
        ['Wie lautet das Past Progressive von <code>he work</code>?', 'he was working', 'was + Verb mit -ing.'],
        ['Welches Modalverb drueckt eine Verpflichtung von aussen aus: <code>must</code> oder <code>can</code>?', 'must', 'You must wear a helmet.'],
        ['Wie lautet die Ersatzform von <code>must</code> im will-future?', 'will have to', 'must hat keine Zukunftsform.'],
        ['Wie lautet die Ersatzform von <code>can</code> im Present Perfect?', 'have been able to', 'can hat kein Partizip.'],
        ['Steht vor <code>money</code> das Wort <code>much</code> oder <code>many</code>?', 'much', 'money ist unzaehlbar.'],
        ['Steht vor <code>water</code> das Wort <code>few</code> oder <code>little</code>?', 'little', 'little bei unzaehlbaren Mengen.'],
        ['Wie lautet das Present Perfect Progressive von <code>I wait</code>?', 'i have been waiting', 'have been + Verb mit -ing.'],
        ['Wie lautet das Past Participle von <code>to speak</code>?', 'spoken', 'speak - spoke - spoken.'],
        ['Wie lautet das Past Participle von <code>to take</code>?', 'taken', 'take - took - taken.'],
        ['Welches Wort leitet einen Zeitsatz ein, nach dem kein <code>will</code> steht?', 'when', 'When he comes, we will start.'],
        ['Ergaenze: <code>I enjoy ___</code> (to swim).', 'swimming', 'Nach enjoy steht das Gerund.'],
        ['Ergaenze: <code>I want ___</code> (go).', 'to go', 'Nach want steht der to-Infinitiv.'],
        ['Wie lautet der Frage-Anhaengsel (question tag) zu <code>You are ready, ___?</code>', 'aren\'t you', 'Positiver Satz, negativer Tag.']
    ]);
    addGrammar('k8.englisch', M.enPassive, [
        ['Wie lautet das Passiv von <code>They build houses</code>?', 'houses are built', 'are + Past Participle.'],
        ['Wie lautet das Passiv von <code>He wrote the letter</code>?', 'the letter was written', 'was + Past Participle.'],
        ['Welches Hilfsverb bildet das englische Passiv?', 'to be', 'Konjugiert in der jeweiligen Zeit.'],
        ['Wie lautet das Past Perfect von <code>I finish</code>?', 'i had finished', 'had + Past Participle.'],
        ['Ergaenze Typ II: <code>If I had time, I ___ you.</code>', 'would help', 'would + Infinitiv.'],
        ['Ergaenze Typ II: <code>If I ___ rich, I would travel.</code>', 'were', 'Im Konditional steht were fuer alle Personen.'],
        ['Wie lautet die indirekte Rede zu <code>He said: "I am tired."</code>?', 'he said he was tired', 'Zeitverschiebung um eine Stufe.'],
        ['Wie heisst die Regel, nach der die Zeit in der indirekten Rede zurueckrueckt?', 'backshift', 'Auch Rueckverschiebung der Zeiten.'],
        ['Ergaenze: <code>He is good at ___</code> (swim).', 'swimming', 'Nach Praepositionen steht das Gerund.'],
        ['Folgt nach <code>decide</code> ein Gerund oder ein Infinitiv?', 'infinitiv', 'He decided to leave.'],
        ['Wie lautet das Past Perfect Progressive von <code>she wait</code>?', 'she had been waiting', 'had been + Verb mit -ing.'],
        ['Auf welche Zeit bezieht sich <code>used to</code>?', 'vergangenheit', 'Frueher gewohnheitsmaessig, heute nicht mehr.'],
        ['Wie lautet das Passiv von <code>You must do it</code>?', 'it must be done', 'Modalverb + be + Past Participle.'],
        ['Welches Relativpronomen ersetzt <code>that</code> im nicht-notwendigen Relativsatz?', 'which', 'Mit Komma abgetrennt.'],
        ['Wie heisst ein Relativsatz, der durch Kommas abgetrennt wird?', 'non-defining', 'Er ist fuer das Verstaendnis nicht noetig.'],
        ['Wie lautet das Past Participle von <code>to break</code>?', 'broken', 'break - broke - broken.'],
        ['Wie lautet das Past Participle von <code>to choose</code>?', 'chosen', 'choose - chose - chosen.'],
        ['Welche Wortstellung hat die indirekte Frage: wie im Aussagesatz oder wie in der Frage?', 'aussagesatz', 'Do you know where he lives?'],
        ['Steht vor einem Zeitraum wie <code>two years</code> das Wort <code>since</code> oder <code>for</code>?', 'for', 'for + Dauer.'],
        ['Steht vor einem Zeitpunkt wie <code>2019</code> das Wort <code>since</code> oder <code>for</code>?', 'since', 'since + Startpunkt.']
    ]);
    addGrammar('k9.englisch', M.enConditional, [
        ['Ergaenze Typ III: <code>If I had known, I ___ you.</code>', 'would have told', 'would have + Past Participle.'],
        ['In welcher Zeit steht der if-Satz im Conditional Typ III?', 'past perfect', 'If I had known ...'],
        ['Ergaenze die indirekte Frage: <code>He asked me where I ___</code> (live).', 'lived', 'Backshift ins Simple Past.'],
        ['Ergaenze die indirekte Aufforderung: <code>She told me ___ quiet.</code> (be)', 'to be', 'tell somebody to do something.'],
        ['Wie lautet das Personenpassiv von <code>They gave me a book</code>?', 'i was given a book', 'Das indirekte Objekt wird Subjekt.'],
        ['Welche Konjunktion leitet einen Konzessivsatz (obwohl) ein?', 'although', 'Although it rained, we went out.'],
        ['Welche Konjunktion drueckt eine Absicht aus (damit)?', 'so that', 'He left early so that he could catch the train.'],
        ['Welche Zeit steht nach <code>by the time</code> beim Rueckblick in die Vergangenheit?', 'past perfect', 'By the time we arrived, he had left.'],
        ['Folgt auf <code>stop</code> in der Bedeutung "aufhoeren zu" ein Gerund oder ein Infinitiv?', 'gerund', 'He stopped smoking.'],
        ['Welche Form bedeutet "sich an etwas Vergangenes erinnern": <code>remember doing</code> oder <code>remember to do</code>?', 'remember doing', 'remember to do = daran denken, etwas zu tun.'],
        ['Wie lautet das Passiv von <code>They have sold the car</code>?', 'the car has been sold', 'has been + Past Participle.'],
        ['Welches Modalverb drueckt eine logische Schlussfolgerung aus (muss wohl)?', 'must', 'He must be at home.'],
        ['Welches Modalverb drueckt Unmoeglichkeit aus (kann nicht sein)?', 'can\'t', 'He can\'t be serious.'],
        ['Wie heisst die Zeitform in <code>I have been living here</code>?', 'present perfect progressive', 'Betont die Dauer bis jetzt.'],
        ['Ergaenze den Hervorhebungssatz: <code>It was John ___ broke the window.</code>', 'who', 'Cleft sentence.'],
        ['Wie heisst die Wortstellung in <code>Never have I seen ...</code>?', 'inversion', 'Nach negativer Einleitung.'],
        ['Bezieht sich <code>I wish + Simple Past</code> auf die Gegenwart oder die Vergangenheit?', 'gegenwart', 'I wish I had more time (jetzt).'],
        ['Ergaenze: <code>I wish I ___ more time.</code> (have)', 'had', 'Unwirklicher Wunsch fuer die Gegenwart.'],
        ['Welche Adjektivendung beschreibt das Gefuehl einer Person: <code>-ed</code> oder <code>-ing</code>?', 'ed', 'I am bored, the film is boring.'],
        ['Wie lautet das Past Participle von <code>to fly</code>?', 'flown', 'fly - flew - flown.']
    ]);
    addGrammar('k10.englisch', M.enAdvanced, [
        ['Ergaenze den mixed conditional: <code>If I had studied, I ___ a doctor now.</code>', 'would be', 'Bedingung Vergangenheit, Folge Gegenwart.'],
        ['Wie lautet die persoenliche Passivkonstruktion zu <code>People say he is rich</code>?', 'he is said to be rich', 'Subjekt + Passiv + Infinitiv.'],
        ['Wie nennt man die Konstruktion <code>It is said that ...</code>?', 'unpersoenliches passiv', 'Ohne genannten Urheber.'],
        ['Was bedeutet das phrasal verb <code>to look after</code>?', 'sich kuemmern', 'to look after somebody.'],
        ['Was bedeutet das phrasal verb <code>to give up</code>?', 'aufgeben', 'He gave up smoking.'],
        ['Was bedeutet das phrasal verb <code>to put off</code>?', 'verschieben', 'The meeting was put off.'],
        ['Welches Verbindungswort drueckt einen Gegensatz aus (jedoch)?', 'however', 'However, the result was different.'],
        ['Welches Verbindungswort drueckt eine Ergaenzung aus (ausserdem)?', 'moreover', 'Moreover, costs increased.'],
        ['Welches Verbindungswort drueckt eine Folge aus (daher)?', 'therefore', 'Therefore, we changed the plan.'],
        ['Welche Diathese bevorzugen formelle und wissenschaftliche Texte im Englischen?', 'passiv', 'Der Handelnde tritt zurueck.'],
        ['Wandle in die indirekte Frage um: <code>What time is it?</code> - <code>Could you tell me what time ___?</code>', 'it is', 'Wortstellung wie im Aussagesatz.'],
        ['Welche Form steht vor einem Gerund: <code>used to</code> oder <code>be used to</code>?', 'be used to', 'I am used to working late.'],
        ['Ergaenze die causative-Konstruktion: <code>I had my car ___</code> (repair).', 'repaired', 'have something done.'],
        ['Welche Zeitform beschreibt eine Handlung, die bis zu einem Zeitpunkt in der Zukunft abgeschlossen ist?', 'future perfect', 'will have + Past Participle.'],
        ['Wie lautet das Future Perfect von <code>I finish</code>?', 'i will have finished', 'By tomorrow I will have finished.'],
        ['Welches Relativpronomen steht im Genitiv?', 'whose', 'The girl whose bag was stolen.'],
        ['Welche Konjunktion bedeutet "sofern nicht"?', 'unless', 'Unless you hurry, we will be late.'],
        ['Folgt auf <code>in spite of</code> ein Gerund oder ein vollstaendiger Satz?', 'gerund', 'In spite of being tired ...'],
        ['Welches Wort ist formeller: <code>buy</code> oder <code>purchase</code>?', 'purchase', 'Register der Schriftsprache.'],
        ['Wie nennt man Gliederungssignale wie <code>firstly, finally, in conclusion</code>?', 'discourse marker', 'Sie strukturieren den Text.']
    ]);

    // ============================================================ Franzoesisch
    addGrammar('k5.franzoesisch', M.frBasic, [
        ['Wie lautet die 1. Person Singular von <code>etre</code>?', 'je suis', 'Ich bin.'],
        ['Wie lautet die 3. Person Singular von <code>etre</code>?', 'il est', 'Er ist.'],
        ['Wie lautet die 1. Person Singular von <code>avoir</code>?', 'j\'ai', 'Ich habe.'],
        ['Wie lautet die 3. Person Plural von <code>avoir</code>?', 'ils ont', 'Sie haben.'],
        ['Wie lautet die 1. Person Singular von <code>parler</code>?', 'je parle', 'Endung -e bei -er-Verben.'],
        ['Wie lautet die 2. Person Plural von <code>parler</code>?', 'vous parlez', 'Endung -ez.'],
        ['Wie lautet der bestimmte Artikel maennlich Singular?', 'le', 'le livre.'],
        ['Wie lautet der bestimmte Artikel weiblich Singular?', 'la', 'la maison.'],
        ['Wie lautet der unbestimmte Artikel maennlich Singular?', 'un', 'un livre.'],
        ['Wie lautet der bestimmte Artikel im Plural?', 'les', 'les livres.'],
        ['Wie lautet die Verneinung von <code>je parle</code>?', 'je ne parle pas', 'ne klammert das Verb.'],
        ['Aus welchen zwei Woertern besteht die einfache Verneinung?', 'ne pas', 'ne ... pas.'],
        ['Welchen Buchstaben haengt man an die meisten Nomen im Plural an?', 's', 'le livre - les livres.'],
        ['Wie lautet die weibliche Form von <code>grand</code>?', 'grande', 'Stummes -e angehaengt.'],
        ['Wie lautet die weibliche Form von <code>heureux</code>?', 'heureuse', '-eux wird zu -euse.'],
        ['Wie lautet das Fragewort fuer "wann"?', 'quand', 'Quand arrives-tu?'],
        ['Wie lautet das Fragewort fuer "wie"?', 'comment', 'Comment vas-tu?'],
        ['Wie heisst die Fragebildung durch Umstellung von Verb und Pronomen?', 'inversion', 'Parles-tu francais?'],
        ['Wie sagt man "Ich heisse ..." auf Franzoesisch?', 'je m\'appelle', 'Reflexives Verb s\'appeler.'],
        ['Wie lautet die 3. Person Singular von <code>aimer</code>?', 'il aime', 'Endung -e.']
    ]);
    addGrammar('k6.franzoesisch', M.frPasse, [
        ['Wie lautet das passe compose von <code>parler</code> in der 1. Person Singular?', 'j\'ai parle', 'avoir + participe passe.'],
        ['Welches Hilfsverb nutzen die meisten Verben im passe compose?', 'avoir', 'j\'ai fait, tu as vu.'],
        ['Nenne ein Verb, das das passe compose mit <code>etre</code> bildet.', 'aller', 'Bewegungsverben nehmen etre.'],
        ['Wie lautet das participe passe von <code>faire</code>?', 'fait', 'j\'ai fait.'],
        ['Wie lautet das participe passe von <code>prendre</code>?', 'pris', 'j\'ai pris.'],
        ['Wie lautet das futur proche von <code>je mange</code>?', 'je vais manger', 'aller + Infinitiv.'],
        ['Wie lautet der Teilungsartikel vor einem maennlichen Nomen?', 'du', 'du pain.'],
        ['Wie lautet der Teilungsartikel vor einem weiblichen Nomen?', 'de la', 'de la soupe.'],
        ['Wie lautet der Possessivbegleiter "mein" vor einem maennlichen Nomen?', 'mon', 'mon livre.'],
        ['Wie lautet der Possessivbegleiter "meine" vor einem weiblichen Nomen?', 'ma', 'ma maison.'],
        ['Wie lautet die 1. Person Singular von <code>aller</code>?', 'je vais', 'Unregelmaessiges Verb.'],
        ['Wie lautet die 1. Person Singular von <code>faire</code>?', 'je fais', 'Unregelmaessiges Verb.'],
        ['Wie lautet die 1. Person Singular von <code>venir</code>?', 'je viens', 'Unregelmaessiges Verb.'],
        ['Was drueckt <code>venir de</code> + Infinitiv aus?', 'unmittelbare vergangenheit', 'Je viens de manger: Ich habe gerade gegessen.'],
        ['Welche Endung bekommt das participe passe bei weiblichem Subjekt und Hilfsverb <code>etre</code>?', 'e', 'Elle est allee.'],
        ['Wo steht <code>pas</code> in der Verneinung des passe compose?', 'zwischen hilfsverb und partizip', 'Je n\'ai pas mange.'],
        ['Wie lautet die Ordnungszahl "erster" in der maennlichen Form?', 'premier', 'le premier jour.'],
        ['Wie sagt man "Es ist drei Uhr"?', 'il est trois heures', 'Uhrzeitangabe mit heures.'],
        ['Wie sagt man "Es regnet"?', 'il pleut', 'Unpersoenliches Verb.'],
        ['Wie lautet der Imperativ von <code>parler</code> in der 2. Person Singular?', 'parle', 'Ohne Schluss-s bei -er-Verben.']
    ]);
    addGrammar('k7.franzoesisch', M.frImparfait, [
        ['Wie lautet das imparfait von <code>parler</code> in der 1. Person Singular?', 'je parlais', 'Endung -ais.'],
        ['Wofuer nutzt man das imparfait: fuer eine Beschreibung oder fuer eine einmalige abgeschlossene Handlung?', 'beschreibung', 'Auch Gewohnheiten und Hintergrund.'],
        ['Wofuer nutzt man das passe compose: fuer eine abgeschlossene Einzelhandlung oder fuer einen Zustand?', 'einzelhandlung', 'Vordergrund der Erzaehlung.'],
        ['Wie lautet das imparfait von <code>etre</code> in der 1. Person Singular?', 'j\'etais', 'Stamm et-.'],
        ['Welches direkte Objektpronomen ersetzt <code>le livre</code>?', 'le', 'Je le lis.'],
        ['Wie lautet das indirekte Objektpronomen der 3. Person Singular?', 'lui', 'Je lui parle.'],
        ['Wo steht das Objektpronomen im Aussagesatz?', 'vor dem verb', 'Je te vois.'],
        ['Wie sagt man "groesser als"?', 'plus grand que', 'Komparativ der Ueberlegenheit.'],
        ['Wie sagt man "der groesste"?', 'le plus grand', 'Superlativ mit bestimmtem Artikel.'],
        ['Wie lautet der unregelmaessige Komparativ von <code>bon</code>?', 'meilleur', 'Nicht plus bon.'],
        ['Wie lautet das futur simple von <code>parler</code> in der 1. Person Singular?', 'je parlerai', 'Infinitiv + Endung -ai.'],
        ['Wie lautet das futur simple von <code>aller</code> in der 1. Person Singular?', 'j\'irai', 'Unregelmaessiger Stamm ir-.'],
        ['Was ersetzt das Pronomen <code>en</code>?', 'mengenangabe', 'Auch Ausdruecke mit de.'],
        ['Was ersetzt das Pronomen <code>y</code>?', 'ortsangabe', 'J\'y vais.'],
        ['Welches Relativpronomen steht als Subjekt?', 'qui', 'L\'homme qui parle.'],
        ['Welches Relativpronomen steht als direktes Objekt?', 'que', 'Le livre que je lis.'],
        ['Wie lautet das Adverb zu <code>lent</code>?', 'lentement', 'Weibliche Form + -ment.'],
        ['Wie lautet die Verneinung fuer "nie"?', 'ne jamais', 'Je ne mange jamais.'],
        ['Wie lautet die Verneinung fuer "nichts"?', 'ne rien', 'Je ne vois rien.'],
        ['Wie lautet das betonte Personalpronomen der 1. Person Singular?', 'moi', 'Pour moi.']
    ]);
    addGrammar('k8.franzoesisch', M.frSubjonctif, [
        ['Wie lautet der conditionnel present von <code>aimer</code> in der 1. Person Singular?', 'j\'aimerais', 'Futur-Stamm + Imparfait-Endung.'],
        ['Wofuer nutzt man den conditionnel vor allem: fuer Hoeflichkeit oder fuer Vergangenheit?', 'hoeflichkeit', 'Je voudrais un cafe.'],
        ['Ergaenze Typ 2: <code>Si j\'avais le temps, je ___</code> (venir).', 'viendrais', 'conditionnel present.'],
        ['Welche Zeit steht nach <code>si</code> im Bedingungssatz Typ 2?', 'imparfait', 'Si j\'avais ...'],
        ['Wie lautet das plus-que-parfait von <code>parler</code> in der 1. Person Singular?', 'j\'avais parle', 'imparfait von avoir + participe passe.'],
        ['Wie lautet der subjonctif present von <code>etre</code> in der 3. Person Singular?', 'qu\'il soit', 'Unregelmaessige Form.'],
        ['Nach welchem Ausdruck steht der subjonctif: <code>il faut que</code> oder <code>il est vrai que</code>?', 'il faut que', 'Notwendigkeit verlangt subjonctif.'],
        ['Wie lautet der subjonctif present von <code>avoir</code> in der 3. Person Singular?', 'qu\'il ait', 'Unregelmaessige Form.'],
        ['Welches Relativpronomen steht nach einer Praeposition, wenn von Personen die Rede ist?', 'qui', 'La personne avec qui je parle.'],
        ['Was ersetzt das Relativpronomen <code>dont</code>?', 'de + nomen', 'Le livre dont je parle.'],
        ['Wie lautet das gerondif von <code>parler</code>?', 'en parlant', 'en + Partizip Praesens.'],
        ['Wie lautet das participe present von <code>finir</code>?', 'finissant', 'Stamm der 1. Person Plural + -ant.'],
        ['Ergaenze das Passiv: <code>La maison est ___</code> (construire).', 'construite', 'Angleichung an das weibliche Subjekt.'],
        ['Mit welchem Hilfsverb bildet man das franzoesische Passiv?', 'etre', 'etre + participe passe.'],
        ['Ergaenze die indirekte Rede im Praesens: <code>Il dit qu\'il ___</code> (venir).', 'vient', 'Keine Zeitverschiebung im Praesens.'],
        ['Ergaenze Typ 1: <code>Si j\'ai le temps, je ___</code> (venir, futur).', 'viendrai', 'si + present, Hauptsatz futur simple.'],
        ['Wie heisst die Zahl 80 auf Franzoesisch?', 'quatre-vingts', 'Mit s, wenn keine Zahl folgt.'],
        ['Wie heisst die Zahl 90 auf Franzoesisch?', 'quatre-vingt-dix', 'Ohne s vor dix.'],
        ['Wie lautet die Ordnungszahl "zweiter"?', 'deuxieme', 'deuxieme oder second.'],
        ['Was bedeutet die Konstruktion <code>ne ... que</code>?', 'nur', 'Je n\'ai que dix euros.']
    ]);
    addGrammar('k9.franzoesisch', M.frAdvanced, [
        ['Wie lautet der conditionnel passe von <code>aimer</code> in der 1. Person Singular?', 'j\'aurais aime', 'conditionnel von avoir + participe passe.'],
        ['Ergaenze Typ 3: <code>Si j\'avais su, je ___</code> (venir).', 'je serais venu', 'conditionnel passe mit etre.'],
        ['Welche Zeit steht nach <code>si</code> im Bedingungssatz Typ 3?', 'plus-que-parfait', 'Si j\'avais su ...'],
        ['Wie lautet der subjonctif passe von <code>faire</code> in der 3. Person Singular?', 'qu\'il ait fait', 'subjonctif von avoir + participe passe.'],
        ['Nenne eine Konjunktion, nach der der subjonctif steht.', 'bien que', 'Auch pour que, avant que.'],
        ['Wie wird <code>je viens</code> in der indirekten Rede der Vergangenheit?', 'il venait', 'present wird imparfait.'],
        ['Wie wird <code>je viendrai</code> in der indirekten Rede der Vergangenheit?', 'il viendrait', 'futur wird conditionnel.'],
        ['Welches Pronomen steht zuerst in <code>Il me le donne</code>?', 'me', 'Indirektes vor direktem Pronomen in der 1./2. Person.'],
        ['In welcher Textsorte begegnet das passe simple vor allem?', 'literarischer text', 'Erzaehlzeit der Schriftsprache.'],
        ['Wie lautet das passe simple von <code>etre</code> in der 3. Person Singular?', 'il fut', 'Unregelmaessige Form.'],
        ['Drueckt das gerondif Gleichzeitigkeit oder Vorzeitigkeit aus?', 'gleichzeitigkeit', 'En marchant, il chantait.'],
        ['Was bedeutet die Konstruktion <code>faire faire</code>?', 'machen lassen', 'Il fait reparer la voiture.'],
        ['Nach welcher Wortart steht das Relativpronomen <code>lequel</code>?', 'praeposition', 'Le stylo avec lequel j\'ecris.'],
        ['Wann gleicht sich das participe passe mit <code>avoir</code> an?', 'vorangestelltes direktes objekt', 'Les livres que j\'ai lus.'],
        ['Wie lautet das Adverb zu <code>vrai</code>?', 'vraiment', 'Weibliche Form + -ment.'],
        ['Wie lautet die Verneinung fuer "niemand"?', 'ne personne', 'Je ne vois personne.'],
        ['Welche Zeit steht nach <code>depuis</code> bei einer bis jetzt andauernden Handlung?', 'praesens', 'J\'habite ici depuis 2020.'],
        ['Wie heisst die Zahl 200 auf Franzoesisch?', 'deux cents', 'Mit s, wenn keine Zahl folgt.'],
        ['Wie lautet der Superlativ des Adverbs <code>bien</code>?', 'le mieux', 'bien - mieux - le mieux.'],
        ['Was bedeutet <code>il y a</code> in einer Zeitangabe wie <code>il y a deux ans</code>?', 'vor', 'Vor zwei Jahren.']
    ]);
    addGrammar('k10.franzoesisch', M.frAdvanced, [
        ['Wie lautet der subjonctif present von <code>faire</code> in der 3. Person Singular?', 'qu\'il fasse', 'Unregelmaessige Form.'],
        ['Wie lautet der subjonctif present von <code>aller</code> in der 3. Person Singular?', 'qu\'il aille', 'Unregelmaessige Form.'],
        ['Wie lautet der subjonctif present von <code>pouvoir</code> in der 3. Person Singular?', 'qu\'il puisse', 'Unregelmaessige Form.'],
        ['Welche Konjunktion mit subjonctif drueckt eine Absicht aus?', 'pour que', 'Pour que tu comprennes.'],
        ['Welche Konjunktion mit subjonctif bedeutet "bevor"?', 'avant que', 'Avant qu\'il parte.'],
        ['Wie lautet das futur anterieur von <code>finir</code> in der 1. Person Singular?', 'j\'aurai fini', 'futur von avoir + participe passe.'],
        ['Was drueckt das futur anterieur aus?', 'vorzeitigkeit in der zukunft', 'Abgeschlossen vor einem Zukunftspunkt.'],
        ['Wie lautet das Passiv im passe compose zu <code>On a construit la maison</code>?', 'la maison a ete construite', 'avoir ete + participe passe.'],
        ['Wie vermeidet man das Passiv im Franzoesischen haeufig?', 'mit on', 'On dit que ...'],
        ['Wie lautet das participe passe von <code>ecrire</code>?', 'ecrit', 'j\'ai ecrit.'],
        ['Wie lautet das participe passe von <code>ouvrir</code>?', 'ouvert', 'j\'ai ouvert.'],
        ['Was bedeutet die Konstruktion <code>etre en train de</code> + Infinitiv?', 'gerade dabei sein', 'Verlaufsform.'],
        ['Welches Fragewort erfragt eine Sache als Subjekt in der gehobenen Sprache?', 'qu\'est-ce qui', 'Qu\'est-ce qui se passe?'],
        ['Wie lautet das Demonstrativpronomen "dieser hier" in der maennlichen Form?', 'celui-ci', 'celui-ci / celui-la.'],
        ['Wie lautet das Possessivpronomen "meiner" in der maennlichen Form?', 'le mien', 'le mien / la mienne.'],
        ['Wie bildet man ein Adverb aus einem Adjektiv auf <code>-ent</code> wie <code>evident</code>?', 'evidemment', '-ent wird zu -emment.'],
        ['Welche Verbform steht nach <code>apres avoir</code>?', 'participe passe', 'Apres avoir mange.'],
        ['Was drueckt <code>apres avoir</code> + participe passe aus?', 'vorzeitigkeit', 'Nachdem er gegessen hatte.'],
        ['Wie lautet die hoefliche Form von <code>je veux</code>?', 'je voudrais', 'conditionnel als Hoeflichkeitsform.'],
        ['Welche Satzstellung nutzt die gehobene Frage ohne Fragewort?', 'inversion', 'Viendrez-vous?']
    ]);

    // ============================================================ Latein
    addGrammar('k5.latein', M.laForm, [
        ['Auf welche Endung endet der Nominativ Singular der a-Deklination?', 'a', 'puella.'],
        ['Auf welche Endung endet der Genitiv Singular der a-Deklination?', 'ae', 'puellae.'],
        ['Auf welche Endung endet der Akkusativ Singular der a-Deklination?', 'am', 'puellam.'],
        ['Auf welche Endung endet der Nominativ Singular der maskulinen o-Deklination?', 'us', 'servus.'],
        ['Auf welche Endung endet der Genitiv Singular der o-Deklination?', 'i', 'servi.'],
        ['Welcher Kasus bezeichnet das Subjekt?', 'nominativ', 'Wer oder was?'],
        ['Welcher Kasus bezeichnet das direkte Objekt?', 'akkusativ', 'Wen oder was?'],
        ['Welcher Kasus bezeichnet den Besitz?', 'genitiv', 'Wessen?'],
        ['Wie lautet die 1. Person Singular Praesens von <code>esse</code>?', 'sum', 'Ich bin.'],
        ['Wie lautet die 3. Person Singular Praesens von <code>esse</code>?', 'est', 'Er/sie/es ist.'],
        ['Wie lautet die 3. Person Plural Praesens von <code>esse</code>?', 'sunt', 'Sie sind.'],
        ['Wie lautet die Personalendung der 1. Person Singular Aktiv?', 'o', 'voco.'],
        ['Wie lautet die Personalendung der 2. Person Singular Aktiv?', 's', 'vocas.'],
        ['Wie lautet die Personalendung der 3. Person Plural Aktiv?', 'nt', 'vocant.'],
        ['Wie lautet die 3. Person Singular Praesens von <code>vocare</code>?', 'vocat', 'Er ruft.'],
        ['Wie viele Konjugationen unterscheidet das Lateinische?', '4', 'a-, e-, konsonantische und i-Konjugation.'],
        ['Wie viele Kasus hat das Lateinische?', '6', 'Inklusive Ablativ und Vokativ.'],
        ['Welcher Kasus nennt Mittel, Ort oder Zeit und fehlt im Deutschen?', 'ablativ', 'gladio: mit dem Schwert.'],
        ['Wozu dient der Vokativ?', 'anrede', 'Marce! - Marcus!'],
        ['Was bedeutet <code>puella</code>?', 'maedchen', 'a-Deklination, feminin.']
    ]);
    addGrammar('k6.latein', M.laTempus, [
        ['Welches Kennzeichen traegt das Imperfekt der a- und e-Konjugation?', 'ba', 'vocabat.'],
        ['Wie lautet die 3. Person Singular Imperfekt von <code>vocare</code>?', 'vocabat', 'Er rief.'],
        ['Wie lautet der Perfektstamm von <code>vocare</code>?', 'vocav', 'vocavi, vocavisti ...'],
        ['Wie lautet die 3. Person Singular Perfekt von <code>vocare</code>?', 'vocavit', 'Er hat gerufen.'],
        ['Wie lautet die Personalendung der 3. Person Plural Perfekt?', 'erunt', 'vocaverunt.'],
        ['Auf welche Endung endet der Genitiv Singular der konsonantischen Deklination?', 'is', 'regis.'],
        ['Auf welche Endung endet der Nominativ Plural der konsonantischen Deklination bei Maskulina?', 'es', 'reges.'],
        ['Wonach richtet sich ein Adjektiv im Lateinischen?', 'nach dem bezugswort', 'In Kasus, Numerus und Genus.'],
        ['Wofuer steht die Abkuerzung KNG?', 'kasus numerus genus', 'KNG-Kongruenz.'],
        ['Wie lautet die 3. Person Singular Perfekt von <code>esse</code>?', 'fuit', 'Er ist gewesen.'],
        ['Wie lautet die 3. Person Singular Imperfekt von <code>esse</code>?', 'erat', 'Er war.'],
        ['Wie lautet die 3. Person Singular Futur I von <code>esse</code>?', 'erit', 'Er wird sein.'],
        ['Auf welche Endung endet der Dativ Singular der o-Deklination?', 'o', 'servo.'],
        ['Auf welche Endung endet der Ablativ Plural der a-Deklination?', 'is', 'puellis.'],
        ['Was bedeutet die Verbindung <code>et ... et</code>?', 'sowohl als auch', 'Doppeltes et.'],
        ['Was bedeutet <code>non solum ... sed etiam</code>?', 'nicht nur sondern auch', 'Steigernde Verbindung.'],
        ['Welches Suffix kennzeichnet den Komparativ?', 'ior', 'altior.'],
        ['Welches Suffix kennzeichnet den Superlativ?', 'issimus', 'altissimus.'],
        ['Wie lautet der Superlativ von <code>magnus</code>?', 'maximus', 'magnus - maior - maximus.'],
        ['Wie lautet der Superlativ von <code>bonus</code>?', 'optimus', 'bonus - melior - optimus.']
    ]);
    addGrammar('k7.latein', M.laAci, [
        ['Wofuer steht die Abkuerzung AcI?', 'accusativus cum infinitivo', 'Akkusativ mit Infinitiv.'],
        ['In welchem Kasus steht das Subjekt eines AcI?', 'akkusativ', 'Subjektsakkusativ.'],
        ['Nenne die Verbgruppe, die typischerweise einen AcI ausloest.', 'verba dicendi', 'Auch verba sentiendi und putandi.'],
        ['Wie lautet der Infinitiv Praesens Aktiv zur Form <code>vocat</code>?', 'vocare', 'Rufen.'],
        ['Wie lautet der Infinitiv Perfekt Aktiv von <code>vocare</code>?', 'vocavisse', 'Gerufen haben.'],
        ['Welches Zeitverhaeltnis drueckt der Infinitiv Praesens im AcI aus?', 'gleichzeitigkeit', 'Zum Praedikat des uebergeordneten Satzes.'],
        ['Welches Zeitverhaeltnis drueckt der Infinitiv Perfekt im AcI aus?', 'vorzeitigkeit', 'Vor dem Praedikat.'],
        ['Wie lautet das PPP von <code>vocare</code> im Nominativ Singular maskulin?', 'vocatus', 'Gerufen worden.'],
        ['Wie lautet das PPA von <code>vocare</code> im Nominativ Singular?', 'vocans', 'Rufend.'],
        ['Welches Zeitverhaeltnis und welche Diathese drueckt das PPP aus?', 'vorzeitigkeit passiv', 'Vorzeitig und passivisch.'],
        ['Aus welchen zwei Bestandteilen besteht ein Ablativus absolutus?', 'ablativ und partizip', 'Beide im Ablativ.'],
        ['Wie lautet das Demonstrativpronomen "dieser" im Nominativ Singular maskulin?', 'hic', 'hic, haec, hoc.'],
        ['Wie lautet das Relativpronomen im Nominativ Singular maskulin?', 'qui', 'qui, quae, quod.'],
        ['Wie lautet das Personalpronomen der 1. Person Singular im Nominativ?', 'ego', 'Ich.'],
        ['Wie lautet das Reflexivpronomen im Akkusativ?', 'se', 'Sich.'],
        ['Wie lautet die Personalendung der 3. Person Singular Passiv Praesens?', 'tur', 'vocatur.'],
        ['Was bedeutet <code>vocatur</code>?', 'er wird gerufen', 'Passiv Praesens.'],
        ['Auf welche Endung endet der Genitiv Singular der u-Deklination?', 'us', 'senatus.'],
        ['Auf welche Endung endet der Genitiv Singular der e-Deklination?', 'ei', 'rei.'],
        ['Was bedeutet <code>res publica</code>?', 'staat', 'Woertlich: oeffentliche Sache.']
    ]);
    addGrammar('k8.latein', M.laKonjunktiv, [
        ['Wie lautet die 3. Person Singular Konjunktiv Praesens Aktiv von <code>vocare</code>?', 'vocet', 'Kennzeichen -e-.'],
        ['Wie lautet die 3. Person Singular Konjunktiv Imperfekt Aktiv von <code>vocare</code>?', 'vocaret', 'Infinitiv + Personalendung.'],
        ['Welche Konjunktion mit Konjunktiv leitet einen Finalsatz ein?', 'ut', 'Damit.'],
        ['Was bedeutet <code>ne</code> mit Konjunktiv?', 'damit nicht', 'Negierter Finalsatz.'],
        ['Wie uebersetzt man <code>cum</code> mit Konjunktiv Imperfekt meist?', 'als', 'cum narrativum.'],
        ['Wie heisst der Konjunktiv im Hauptsatz, der einen Wunsch ausdrueckt?', 'optativ', 'Utinam veniat!'],
        ['Wie lautet die 3. Person Singular Passiv Perfekt von <code>vocare</code>?', 'vocatus est', 'PPP + Form von esse.'],
        ['Wie lautet die 3. Person Singular Passiv Imperfekt von <code>vocare</code>?', 'vocabatur', 'Er wurde gerufen.'],
        ['Wie lautet die 3. Person Singular Plusquamperfekt Aktiv von <code>vocare</code>?', 'vocaverat', 'Er hatte gerufen.'],
        ['Wie lautet die 3. Person Singular Futur II Aktiv von <code>vocare</code>?', 'vocaverit', 'Er wird gerufen haben.'],
        ['Welche Konjunktion leitet einen Konsekutivsatz ein?', 'ut', 'sodass.'],
        ['Welches ankuendigende Wort steht oft im Hauptsatz vor einem Konsekutivsatz?', 'tam', 'Auch ita, tantus, adeo.'],
        ['In welchem Modus steht die indirekte Frage?', 'konjunktiv', 'Immer Konjunktiv.'],
        ['Was bedeutet <code>quid</code>?', 'was', 'Fragepronomen.'],
        ['Welches Zeitverhaeltnis drueckt ein Ablativus absolutus mit PPP aus?', 'vorzeitigkeit', 'Urbe capta: nachdem die Stadt erobert war.'],
        ['Woran erkennt man ein Deponens?', 'passivform aktive bedeutung', 'Nur passivische Formen.'],
        ['Zu welcher Verbgruppe gehoert <code>sequi</code>?', 'deponens', 'sequor, sequi, secutus sum.'],
        ['Welche Wortart ist das Gerundium?', 'verbalsubstantiv', 'Substantivierter Infinitiv.'],
        ['Wie lautet der Genitiv des Gerundiums von <code>vocare</code>?', 'vocandi', 'Des Rufens.'],
        ['Nenne ein Semideponens.', 'audere', 'audeo, audere, ausus sum.']
    ]);
    addGrammar('k9.latein', M.laSyntax, [
        ['Was drueckt das Gerundivum aus?', 'notwendigkeit', 'Muss getan werden.'],
        ['Was bedeutet <code>delenda est</code>?', 'muss zerstoert werden', 'Gerundivum mit esse.'],
        ['Was bedeutet die nd-Form im Genitiv zusammen mit <code>causa</code>?', 'um zu', 'Finaler Ausdruck.'],
        ['In welchem Modus und welcher Zeit steht der Irrealis der Gegenwart?', 'konjunktiv imperfekt', 'Si haberem ...'],
        ['In welchem Modus und welcher Zeit steht der Irrealis der Vergangenheit?', 'konjunktiv plusquamperfekt', 'Si habuissem ...'],
        ['In welchem Modus steht der Realis im Bedingungssatz?', 'indikativ', 'Si venit ...'],
        ['Was regelt die consecutio temporum?', 'zeitverhaeltnis im nebensatz', 'Zeitenfolge nach dem Hauptsatz.'],
        ['Wie uebersetzt man <code>quin</code> nach einem verneinten Ausdruck?', 'dass', 'Non dubito quin ...'],
        ['Wie uebersetzt man ein Relativpronomen am Satzanfang (relativer Satzanschluss)?', 'demonstrativpronomen', 'Qui ... = Dieser ...'],
        ['Was bedeutet <code>quo</code> mit Komparativ und Konjunktiv?', 'damit desto', 'Finaler Komparativsatz.'],
        ['Wie lautet das Partizip Futur Aktiv von <code>vocare</code> im Nominativ Singular maskulin?', 'vocaturus', 'Einer, der rufen wird.'],
        ['Was drueckt die coniugatio periphrastica activa aus?', 'absicht', 'PFA + esse.'],
        ['Nach welcher Verbgruppe steht das Supinum I auf -um?', 'verben der bewegung', 'Venit rogatum.'],
        ['Welche Form ist <code>dictu</code>?', 'supinum ii', 'Bei Adjektiven wie mirabile dictu.'],
        ['In welcher Konstruktion stehen Hauptsaetze der oratio obliqua?', 'aci', 'Indirekte Rede.'],
        ['In welchem Modus stehen Nebensaetze der oratio obliqua?', 'konjunktiv', 'Durchgaengig Konjunktiv.'],
        ['Welches Wort ersetzt der Ablativus comparationis?', 'quam', 'Beim Vergleich.'],
        ['Was drueckt der Dativus finalis aus?', 'zweck', 'auxilio venire.'],
        ['Was bezeichnet der Genitivus partitivus?', 'teil von einer menge', 'multi militum.'],
        ['Was beschreibt der Ablativus qualitatis?', 'eigenschaft', 'vir magna virtute.']
    ]);
    addGrammar('k10.latein', M.laStil, [
        ['Aus wie vielen Versfuessen besteht ein Hexameter?', '6', 'Daher der Name.'],
        ['Welcher Versfuss dominiert im Hexameter?', 'daktylus', 'Ersetzbar durch Spondeus.'],
        ['Aus welcher Silbenfolge besteht ein Daktylus?', 'lang kurz kurz', 'Eine Laenge, zwei Kuerzen.'],
        ['Wie heisst die Wiederholung eines Wortes am Satz- oder Versanfang?', 'anapher', 'Verstaerkende Wiederholung.'],
        ['Wie heisst die ueberkreuzte Wortstellung nach dem Muster AB-BA?', 'chiasmus', 'Kreuzstellung.'],
        ['Wie heisst die gleichlaufende Wortstellung nach dem Muster AB-AB?', 'parallelismus', 'Parallelfuehrung.'],
        ['Wie heisst die Auslassung von Konjunktionen?', 'asyndeton', 'veni, vidi, vici.'],
        ['Wie heisst die Haeufung von Konjunktionen?', 'polysyndeton', 'et ... et ... et.'],
        ['Wie heisst die Sperrung zusammengehoeriger Woerter im Vers?', 'hyperbaton', 'Auch Sperrstellung.'],
        ['Wie heisst die Steigerung mehrerer Glieder?', 'klimax', 'Aufsteigende Reihung.'],
        ['Wie heisst die Verkleinerungsform eines Wortes?', 'deminutiv', 'libellus zu liber.'],
        ['Wer verfasste <code>De bello Gallico</code>?', 'caesar', 'Commentarii, 1. Jh. v. Chr.'],
        ['Wer verfasste die <code>Aeneis</code>?', 'vergil', 'Roemisches Nationalepos.'],
        ['Wer hielt die Reden gegen Catilina?', 'cicero', 'Orationes in Catilinam, 63 v. Chr.'],
        ['Wer verfasste die <code>Metamorphosen</code>?', 'ovid', 'Verwandlungssagen in Hexametern.'],
        ['Wozu dient das historische Praesens?', 'vergegenwaertigung', 'Erhoeht die Lebendigkeit.'],
        ['Welches Zeitverhaeltnis drueckt ein Ablativus absolutus mit PPA aus?', 'gleichzeitigkeit', 'Caesare veniente.'],
        ['In welchem Kasus steht das Praedikatsnomen bei <code>esse</code>?', 'nominativ', 'Marcus consul est.'],
        ['Was bezeichnet eine Litotes?', 'doppelte verneinung', 'non ignoro: ich weiss sehr wohl.'],
        ['Was bezeichnet <code>prosa oratio</code>?', 'ungebundene rede', 'Im Gegensatz zur Dichtung.']
    ]);

    // Kartentext aus dem Pool ableiten, damit die Anzahl nach jeder Erweiterung stimmt.
    function refreshLanguageNotes() {
        const labels = { englisch: 'Englisch', franzoesisch: 'Franzoesisch', latein: 'Latein' };
        ['k5', 'k6', 'k7', 'k8', 'k9', 'k10'].forEach(function (classId) {
            Object.keys(labels).forEach(function (subject) {
                const cfg = SCH.content[classId + '.' + subject];
                if (!cfg || !Array.isArray(cfg.pool)) return;
                const count = function (section) {
                    return cfg.pool.filter(function (it) { return it && it.section === section; }).length;
                };
                cfg.note = labels[subject] + ' Klasse ' + classId.slice(1) + ': '
                    + count('numbers') + ' Zahlen-, ' + count('vocab') + ' Vokabel- und '
                    + count('grammar') + ' Grammatikfragen (curriculum-orientiert nach KLP/CEFR, keine lehrwerksspezifische Liste).';
            });
        });
    }

    flush();
    refreshLanguageNotes();
})();
