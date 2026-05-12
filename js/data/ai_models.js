/*
 * AI Models — Benchmark-Vergleich grosser KI-Modelle (Multiple-Choice).
 *
 * Konvention dieser Kategorie:
 *   - Jede Aufgabe ist ein 4-Optionen-MCQ. Das `q`-Feld enthaelt die Fragestellung
 *     plus eine geordnete Liste `<ol type="A">` mit den vier Optionen. Der
 *     Lerner waehlt mental A/B/C/D, klickt dann "Loesung" und bekommt im
 *     `s`-Feld die korrekte Option und alle Benchmark-Zahlen mit Quelle.
 *   - Alle Benchmark-Scores stammen aus oeffentlich publizierten Quellen
 *     (Modellberichte, Blog-Posts der Hersteller, Paper-Veroeffentlichungen).
 *     Die jeweilige Quelle inkl. Datum/Version ist im `s`-Feld benannt.
 *   - Benchmark-Bestleistungen verschieben sich schnell. Stand: 2024 / Anfang 2025.
 *     Bei Updates neuer Modell-Versionen Aufgaben anhaengen, nicht ueberschreiben
 *     (AGENTS §11 — `idx`-Identitaet darf nicht driften).
 *
 * Verwendete Quellen (alle oeffentlich):
 *   - OpenAI GPT-4 Technical Report, arXiv:2303.08774, Mar 2023.
 *   - OpenAI "Hello GPT-4o" Blog Post, openai.com/index/hello-gpt-4o, May 2024.
 *   - OpenAI "Learning to reason with LLMs" (o1-preview/o1), Sep 2024 / Dec 2024.
 *   - OpenAI o3 Announcement (ARC-AGI Prize Live Stream), Dec 20, 2024.
 *   - Anthropic Claude 3 Model Card, claude-3-model-card.pdf, Mar 2024.
 *   - Anthropic Claude 3.5 Sonnet Announcement, anthropic.com/news/claude-3-5-sonnet, Jun 2024.
 *   - Anthropic Claude 3.5 Sonnet (new) / Computer Use, Oct 22, 2024.
 *   - Google Gemini 1.5 Technical Report, arXiv:2403.05530, Mar 2024.
 *   - Meta Llama 3.1 Paper "The Llama 3 Herd of Models", arXiv:2407.21783, Jul 2024.
 *   - DeepSeek-V3 Technical Report, arXiv:2412.19437, Dec 2024.
 *   - HumanEval: Chen et al., "Evaluating LLMs Trained on Code", arXiv:2107.03374, 2021.
 *   - MMLU: Hendrycks et al., arXiv:2009.03300, 2020.
 *   - GSM8K: Cobbe et al., arXiv:2110.14168, 2021.
 *   - MATH: Hendrycks et al., arXiv:2103.03874, 2021.
 *   - GPQA: Rein et al., arXiv:2311.12022, 2023.
 *   - SWE-Bench: Jimenez et al., arXiv:2310.06770, 2023; "SWE-Bench Verified" OpenAI Aug 2024.
 *   - MMMU: Yue et al., arXiv:2311.16502, 2023.
 *   - AIME: Mathematical Association of America, aime.maa.org.
 *   - ARC-AGI: Chollet et al., arcprize.org.
 */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'ai_models';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    // Helper: MCQ-Optionen einheitlich als <ol type="A"> rendern.
    const opts = (a, b, c, d) =>
        `<ol type="A" class="mt-3 ml-5 list-decimal text-base font-medium text-slate-800">` +
        `<li>${a}</li><li>${b}</li><li>${c}</li><li>${d}</li></ol>`;

    window.APP_DATA[id] = {
        id,
        name: 'AI Models',
        desc: 'Benchmark-Vergleich grosser KI-Modelle (GPT-4 / GPT-4o / o1 / o3, Claude 3 / 3.5, Gemini 1.5, Llama 3, DeepSeek). Multiple-Choice-Quiz auf Basis veroeffentlichter Scores aus Modellberichten und Paper-Quellen. Disziplinen: Coding (HumanEval, SWE-Bench, Codeforces), Mathematik (GSM8K, MATH, AIME), Wissen (MMLU, GPQA), Multimodal (MMMU), Reasoning (ARC-AGI), Long-Context.',
        formulas: `
            <strong>Wichtige Benchmarks im Vergleich</strong><br><br>

            <strong>Coding</strong><br>
            <em>HumanEval</em> — 164 Python-Programmieraufgaben, Metrik <code>pass@1</code>
            (Anteil Aufgaben, bei denen die erste Generierung alle Tests besteht). Quelle:
            Chen et al., arXiv:2107.03374 (2021).<br>
            <em>SWE-Bench / SWE-Bench Verified</em> — reale GitHub-Issues aus 12 Python-Repos;
            das Modell muss einen Patch erzeugen, der die Issue-Tests besteht. Verified-Variante
            (OpenAI, Aug 2024) ist eine 500-Item-Teilmenge mit verifizierten Spezifikationen.<br>
            <em>Codeforces ELO</em> — kompetitive Programmieraufgaben unter Zeitdruck.<br><br>

            <strong>Mathematik</strong><br>
            <em>GSM8K</em> — 8.500 Grundschul-Sachaufgaben, 8-shot CoT.<br>
            <em>MATH</em> — 12.500 Wettbewerbsaufgaben (AMC, AIME, Putnam-Niveau), 0/few-shot.<br>
            <em>AIME</em> — American Invitational Mathematics Examination, 15 Aufgaben pro Jahr,
            ganzzahlige Antworten 0-999.<br><br>

            <strong>Wissen / Reasoning</strong><br>
            <em>MMLU</em> — 57 Faecher, 5-shot Multiple-Choice (Geschichte bis Recht).<br>
            <em>GPQA Diamond</em> — 198 Graduiertenfragen aus Physik/Chemie/Biologie, "Google-proof".<br>
            <em>ARC-AGI</em> — abstrakte Muster-Aufgaben, fuer Menschen leicht, fuer LLMs hart.<br><br>

            <strong>Multimodal</strong><br>
            <em>MMMU</em> — 11.500 Aufgaben mit Bildern aus 30 College-Faechern.<br><br>

            <strong>Long-Context</strong><br>
            <em>Needle-in-a-Haystack</em> — Faktum in langen Kontext einbetten,
            Retrieval-Genauigkeit messen. Aktuelle Kontextfenster (Anfang 2025):
            GPT-4 Turbo / GPT-4o 128k, Claude 3 Opus / 3.5 Sonnet 200k,
            Gemini 1.5 Pro bis 2M Tokens.<br><br>

            <strong>Wichtige Konventionen</strong><br>
            Scores aus offiziellen Modellberichten zitiert; <em>"new"</em> / Datumsangaben kennzeichnen
            Re-Releases (z.B. Claude 3.5 Sonnet vom 22.10.2024 hat eine andere Score-Tabelle als
            die Jun-2024-Version). Bei direkten Score-Vergleichen muss die Eval-Methode
            (z.B. <code>pass@1</code> vs. <code>pass@10</code>, 0-shot vs. 5-shot) uebereinstimmen.
        `,
        levels: [
            // ============================================================
            //  Level 1 — Grundlagen (bekannte Benchmark-Sieger)
            // ============================================================
            [
                {
                    q: `Welches Modell erzielte beim <strong>HumanEval pass@1</strong> Coding-Benchmark laut offiziellen Modellberichten den hoechsten Wert?
                        ${opts(
                            'GPT-4 (urspruengliches Technical Report Maerz 2023): 67,0 %',
                            'Claude 3 Opus (Anthropic Modellkarte Maerz 2024): 84,9 %',
                            'Claude 3.5 Sonnet (Anthropic Blog Juni 2024): 92,0 %',
                            'Gemini 1.5 Pro (Google Technical Report Mai 2024): 84,1 %'
                        )}`,
                    h: 'HumanEval (Chen et al., 2021) testet 164 Python-Aufgaben mit Unit-Tests. Aktueller Spitzenreiter unter den hier genannten Modellen war Mitte 2024 ein Anthropic-Modell.',
                    s: `<strong>Richtige Antwort: C — Claude 3.5 Sonnet, 92,0 % pass@1.</strong><br><br>
                        Stand Juni 2024 lag Claude 3.5 Sonnet beim HumanEval-Coding-Benchmark vor allen drei Vergleichsmodellen.<br><br>
                        <strong>Quellen:</strong><br>
                        - GPT-4: OpenAI Technical Report, arXiv:2303.08774, Tab. 4.<br>
                        - Claude 3 Opus: Anthropic Claude 3 Model Card (Mar 2024), Tab. "Coding".<br>
                        - Claude 3.5 Sonnet: Anthropic Blog "Claude 3.5 Sonnet", anthropic.com/news/claude-3-5-sonnet, 20.06.2024.<br>
                        - Gemini 1.5 Pro: Google Gemini 1.5 Technical Report, arXiv:2403.05530, Tab. 7.<br><br>
                        <em>Hinweis:</em> GPT-4o erreichte beim gleichen Benchmark 90,2 % (OpenAI "Hello GPT-4o", Mai 2024) — also knapp unter Claude 3.5 Sonnet.`
                },
                {
                    q: `Welches Modell hatte zum jeweiligen Release den hoechsten <strong>MMLU-Score (5-shot)</strong>?
                        ${opts(
                            'GPT-4 (OpenAI Mar 2023): 86,4 %',
                            'Claude 3 Opus (Anthropic Mar 2024): 86,8 %',
                            'Claude 3.5 Sonnet (Anthropic Jun 2024): 88,7 %',
                            'Llama 3 70B Instruct (Meta Apr 2024): 82,0 %'
                        )}`,
                    h: 'MMLU (Hendrycks et al., 2020) testet 57 akademische Faecher als 5-shot Multiple-Choice. Achte bei den vier Optionen auf das hoechste Prozent.',
                    s: `<strong>Richtige Antwort: C — Claude 3.5 Sonnet, 88,7 % MMLU.</strong><br><br>
                        Die offiziellen Werte:<br>
                        - GPT-4: 86,4 % (OpenAI GPT-4 Technical Report, Mar 2023, Tab. 9).<br>
                        - Claude 3 Opus: 86,8 % (Anthropic Claude 3 Model Card, Mar 2024).<br>
                        - Claude 3.5 Sonnet: 88,7 % (Anthropic Claude 3.5 Sonnet Blog, Jun 2024).<br>
                        - Llama 3 70B Instruct: 82,0 % (Meta "Introducing Meta Llama 3", ai.meta.com/blog/meta-llama-3/, 18.04.2024).<br><br>
                        <em>Hinweis:</em> Llama 3.1 405B Instruct (Jul 2024) erreichte spaeter 87,3 % MMLU — immer noch unter Claude 3.5 Sonnet.`
                },
                {
                    q: `Auf welchem Benchmark wird die <strong>Programmierfaehigkeit eines Modells im Loesen realer GitHub-Issues</strong> gemessen?
                        ${opts(
                            'HumanEval',
                            'MBPP (Mostly Basic Python Programming)',
                            'SWE-Bench / SWE-Bench Verified',
                            'HellaSwag'
                        )}`,
                    h: 'Drei der Optionen testen Code-Generierung aus Kurzbeschreibungen oder Common-Sense. Nur einer testet das End-to-End-Loesen echter Repository-Probleme.',
                    s: `<strong>Richtige Antwort: C — SWE-Bench / SWE-Bench Verified.</strong><br><br>
                        SWE-Bench (Jimenez et al., arXiv:2310.06770, 2023) zieht reale GitHub-Issues aus 12 populaeren Python-Repositories (django, flask, sympy, …). Das Modell bekommt das Repo + Issue-Text und muss einen Patch erzeugen, der die Issue-Tests besteht.<br><br>
                        - <strong>HumanEval</strong> = 164 isolierte Python-Funktionen mit Unit-Tests.<br>
                        - <strong>MBPP</strong> = 974 Anfaenger-Programmieraufgaben.<br>
                        - <strong>HellaSwag</strong> = Common-Sense-Inferenz (Satz-Ende vorhersagen), kein Coding-Benchmark.<br><br>
                        SWE-Bench Verified (OpenAI, August 2024) ist eine 500-Item-Teilmenge mit von Menschen verifizierten Spezifikationen, um Falsch-Negative der Original-Suite zu reduzieren.`
                },
                {
                    q: `Welches der folgenden Modelle erzielte bei <strong>GSM8K</strong> (Mathematik-Sachaufgaben, Grundschulniveau) den hoechsten Wert?
                        ${opts(
                            'GPT-4 (Mar 2023): 92,0 %',
                            'Claude 3 Opus (Mar 2024): 95,0 %',
                            'Claude 3.5 Sonnet (Jun 2024): 96,4 %',
                            'Gemini 1.5 Pro (May 2024): 91,7 %'
                        )}`,
                    h: 'GSM8K (Cobbe et al., 2021) sind 8500 Grundschul-Sachaufgaben mit kurzer Loesungskette. CoT-Prompting (chain-of-thought) ueblich.',
                    s: `<strong>Richtige Antwort: C — Claude 3.5 Sonnet, 96,4 %.</strong><br><br>
                        Veroeffentlichte Werte:<br>
                        - GPT-4: 92,0 % 5-shot CoT (OpenAI Technical Report, Tab. 9).<br>
                        - Claude 3 Opus: 95,0 % 0-shot CoT (Anthropic Claude 3 Model Card).<br>
                        - Claude 3.5 Sonnet: 96,4 % 0-shot CoT (Anthropic Blog Jun 2024).<br>
                        - Gemini 1.5 Pro: 91,7 % 11-shot (Gemini 1.5 Technical Report, arXiv:2403.05530).<br><br>
                        <em>Hinweis:</em> GSM8K gilt mittlerweile als gesaettigt — alle Top-Modelle liegen ueber 90 %. Aussagekraeftiger ist der MATH-Benchmark (Wettbewerbsniveau) — siehe Level 2.`
                },
                {
                    q: `Welches Modell wurde primaer fuer <strong>open-source Verfuegbarkeit mit kommerzieller Lizenz</strong> bekannt und steht im obigen Vergleich fuer Meta?
                        ${opts(
                            'GPT-4o',
                            'Claude 3 Opus',
                            'Gemini 1.5 Pro',
                            'Llama 3.1 405B Instruct'
                        )}`,
                    h: 'Drei der Optionen sind proprietaere API-Modelle (closed-weights). Nur eines hat veroeffentlichte Gewichte mit kommerziell nutzbarer Lizenz.',
                    s: `<strong>Richtige Antwort: D — Llama 3.1 405B Instruct.</strong><br><br>
                        Meta hat am 23.07.2024 Llama 3.1 in den Groessen 8B / 70B / 405B unter der Llama-3.1-Community-Lizenz veroeffentlicht. Die Gewichte sind herunterladbar (Hugging Face), kommerzielle Nutzung erlaubt unter Auflagen (DAU-Schwelle, Branding).<br><br>
                        GPT-4o (OpenAI), Claude 3 Opus (Anthropic) und Gemini 1.5 Pro (Google) sind ausschliesslich ueber die jeweilige Anbieter-API zugaenglich; Gewichte sind nicht oeffentlich.<br><br>
                        Llama 3.1 405B Instruct erreicht laut Meta-Paper (arXiv:2407.21783) MMLU 87,3 %, HumanEval 89,0 %, MATH 73,8 % — auf Augenhoehe mit GPT-4o.`
                },
                {
                    q: `Welche Disziplin testet der Benchmark <strong>MMMU</strong> (Yue et al., 2023)?
                        ${opts(
                            'Reine Mathematik auf Olympiade-Niveau',
                            'Multimodale Aufgaben mit Bildern aus 30 College-Faechern',
                            'Mehrsprachige Uebersetzung (40+ Sprachen)',
                            'Multi-Agent-Koordination'
                        )}`,
                    h: 'Das doppelte "M" steht fuer "Massive Multi-discipline Multimodal".',
                    s: `<strong>Richtige Antwort: B — multimodale College-Aufgaben mit Bildern.</strong><br><br>
                        MMMU (Massive Multi-discipline Multimodal Understanding and Reasoning, Yue et al., arXiv:2311.16502) umfasst 11.500 Aufgaben aus 6 grossen Disziplinen und 30 Faechern (Kunst, Business, Medizin, Naturwissenschaften, Technik, …). Jede Aufgabe enthaelt mindestens ein Bild (Diagramm, Foto, Skizze).<br><br>
                        Stand 2024: GPT-4o 69,1 %, Claude 3.5 Sonnet 68,3 %, Gemini 1.5 Pro 62,2 % (offizielle Modellberichte). Menschliche Experten liegen bei ~83 %.<br><br>
                        Die anderen Optionen passen zu anderen Benchmarks: Mathematik = MATH/AIME, Uebersetzung = WMT/FLORES, Multi-Agent = GAIA / Agentbench.`
                },
                {
                    q: `Welcher Hersteller veroeffentlichte das Modell <strong>"Gemini 1.5 Pro"</strong>?
                        ${opts(
                            'OpenAI',
                            'Anthropic',
                            'Google DeepMind',
                            'Meta AI'
                        )}`,
                    h: 'Drei der Antworten gehoeren zu Modellen, die hier ohnehin vorkommen. Eines davon hat den Begriff "Gemini" als interne Forschungsorganisations-Marke.',
                    s: `<strong>Richtige Antwort: C — Google DeepMind.</strong><br><br>
                        Gemini 1.5 Pro wurde am 15.02.2024 von Google DeepMind angekuendigt; technischer Bericht "Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context" (arXiv:2403.05530, Mar 2024). Bekannte Eigenschaft: bis zu 2 Mio. Tokens Kontextfenster — der hoechste Wert unter den hier genannten Modellen Anfang 2025.<br><br>
                        - GPT-4 / GPT-4o / o1 / o3 = OpenAI.<br>
                        - Claude 3 / 3.5 Familie = Anthropic.<br>
                        - Llama-Modelle = Meta AI.`
                },
                {
                    q: `Welcher Coding-Benchmark misst die <strong>Performance unter Wettbewerbs-Zeitdruck</strong> (ELO-Wertung wie beim Schach)?
                        ${opts(
                            'HumanEval',
                            'MBPP',
                            'SWE-Bench Verified',
                            'Codeforces (ELO-Rating)'
                        )}`,
                    h: 'Eine der Optionen entstammt nicht der LLM-Welt, sondern der weltweit aktiven Online-Plattform fuer kompetitives Programmieren.',
                    s: `<strong>Richtige Antwort: D — Codeforces ELO.</strong><br><br>
                        Codeforces ist die weltweit groesste Plattform fuer kompetitive Programmieraufgaben. Modelle werden gegen die historische Rating-Verteilung menschlicher Teilnehmer eingeordnet. Bekannte Werte (offizielle Modellberichte, OpenAI o1-Blog Sep 2024):<br>
                        - GPT-4o: ELO ≈ 808 (rund 11. Perzentil)<br>
                        - Claude 3.5 Sonnet (Jun 2024): ELO ≈ 717<br>
                        - o1-preview: ELO ≈ 1673 (rund 89. Perzentil)<br>
                        - o1: ELO ≈ 1807 (93. Perzentil)<br><br>
                        HumanEval / MBPP / SWE-Bench haben kein Zeitlimit pro Aufgabe und kein ELO.`
                },
                {
                    q: `Wofuer steht das <strong>"o" in GPT-4o</strong>?
                        ${opts(
                            '"open" — fuer Open-Source-Freigabe',
                            '"omni" — multimodal fuer Text, Audio und Bild in einem Modell',
                            '"optimal" — kostenoptimierte Variante',
                            '"online" — mit Live-Web-Zugriff'
                        )}`,
                    h: 'OpenAI hat GPT-4o im Mai 2024 als "natively multimodal" vorgestellt; ein Modell akzeptiert Text-, Audio- und Bild-Input und gibt Text/Audio/Bild aus.',
                    s: `<strong>Richtige Antwort: B — "omni".</strong><br><br>
                        OpenAI hat GPT-4o am 13.05.2024 mit dem Blog-Post "Hello GPT-4o" vorgestellt. Die Bezeichnung steht ausdruecklich fuer <em>omni</em> (lateinisch "alles"): ein einziges End-to-End-Modell verarbeitet Text, Audio und Vision nativ, statt — wie bei der vorherigen GPT-4-Voice-Pipeline — separate Whisper-, GPT- und TTS-Modelle zu kaskadieren.<br><br>
                        Folgen fuer die Latenz: durchschnittliche Audio-Antwortzeit fiel von 2,8 s (GPT-3,5-Voice) bzw. 5,4 s (GPT-4-Voice) auf 320 ms (GPT-4o) — vergleichbar mit menschlicher Reaktionszeit.<br><br>
                        Quelle: OpenAI Blog "Hello GPT-4o", openai.com/index/hello-gpt-4o, 13.05.2024.`
                },
                {
                    q: `Wofuer steht das Akronym <strong>"GPT"</strong>?
                        ${opts(
                            'General Purpose Tool',
                            'Generative Pre-trained Transformer',
                            'Generalized Predictive Tokenizer',
                            'Google Pretraining Toolkit'
                        )}`,
                    h: 'Radford et al. (OpenAI) haben den Begriff 2018 mit dem ersten GPT-Paper eingefuehrt. Drei Komponenten sind im Namen kodiert.',
                    s: `<strong>Richtige Antwort: B — Generative Pre-trained Transformer.</strong><br><br>
                        Quelle: Radford et al., "Improving Language Understanding by Generative Pre-Training", OpenAI Tech-Report, Jun 2018. Die drei Komponenten:<br>
                        - <strong>Generative</strong> — autoregressive Erzeugung von Tokens (im Gegensatz zu encoder-only Klassifikationsmodellen wie BERT).<br>
                        - <strong>Pre-trained</strong> — selbstueberwacht trainiert auf grossen Text-Korpora (Next-Token-Prediction).<br>
                        - <strong>Transformer</strong> — die Architektur aus Vaswani et al. "Attention Is All You Need" (NeurIPS 2017).<br><br>
                        Spaetere GPT-Varianten (GPT-2 2019, GPT-3 2020, GPT-4 2023, GPT-4o 2024) sind alle Decoder-only-Transformer in dieser Tradition.`
                },
                {
                    q: `Welches Modell wurde 2020 von <strong>OpenAI</strong> als 175-Milliarden-Parameter-Sprachmodell veroeffentlicht und gilt als Wendepunkt zum Mainstream-LLM?
                        ${opts(
                            'GPT-2',
                            'GPT-3',
                            'GPT-3.5',
                            'GPT-4'
                        )}`,
                    h: 'Das Paper hiess "Language Models are Few-Shot Learners" und stellte zum ersten Mal "in-context learning" prominent in den Vordergrund.',
                    s: `<strong>Richtige Antwort: B — GPT-3.</strong><br><br>
                        Brown et al., "Language Models are Few-Shot Learners", arXiv:2005.14165, Mai 2020. Das Modell hatte 175 Mrd. Parameter, eine Trainingsmenge von rund 300 Mrd. Tokens und demonstrierte erstmals breit, dass Sprachmodelle ohne Feinabstimmung neue Aufgaben aus wenigen Beispielen im Prompt lernen.<br><br>
                        - GPT-2 (2019): 1,5 Mrd. Parameter.<br>
                        - GPT-3.5 (Nov 2022, ChatGPT-Launch): RLHF-feingetuntes GPT-3-Modell.<br>
                        - GPT-4 (Mar 2023): Architektur-Details nicht offiziell veroeffentlicht, vermutlich Mixture-of-Experts.<br><br>
                        GPT-3 markierte den Beginn der "Scaling-Era" und legte den Grundstein fuer den 2022/2023-Chat-LLM-Boom.`
                },
                {
                    q: `Was ist der Unterschied zwischen einem <strong>Base-Model</strong> und einem <strong>Instruct-Model</strong>?
                        ${opts(
                            'Es gibt keinen Unterschied — beide sind dasselbe Modell mit anderem Namen.',
                            'Das Base-Model ist auf reine Next-Token-Vorhersage trainiert; das Instruct-Model wurde zusaetzlich mit Supervised Fine-Tuning und/oder RLHF auf Anweisungs-Befolgung trainiert.',
                            'Das Base-Model ist kleiner als das Instruct-Model.',
                            'Das Instruct-Model laeuft nur auf GPU, das Base-Model nur auf CPU.'
                        )}`,
                    h: 'Llama 3.1 405B wird in beiden Varianten ausgeliefert: "Base" und "Instruct". Das Pre-Training ist identisch, das Post-Training unterscheidet sie.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Standardpipeline moderner LLMs (Meta Llama-3-Paper arXiv:2407.21783, Anthropic Claude-3-Modellkarte):<br>
                        1. <strong>Pre-Training</strong> auf grossem Text-Korpus mit Next-Token-Prediction → liefert das "Base-Model" (auch "foundation model"). Antwortet wie ein Auto-Vervollstaender, nicht wie ein Assistent.<br>
                        2. <strong>Supervised Fine-Tuning (SFT)</strong> auf kuratierten Instruktion-Antwort-Paaren.<br>
                        3. Optional <strong>RLHF</strong> oder <strong>DPO</strong> auf menschlichen Praeferenzdaten.<br><br>
                        Das Ergebnis ist das "Instruct-Model" — folgt Anweisungen, behaelt Sicherheitsschranken, antwortet im Chat-Format.<br><br>
                        Beispiel: <em>Llama-3.1-405B-Base</em> antwortet auf "Was ist Photosynthese?" oft mit einer Auflistung von 20 verwandten Fragen (Auto-Complete-Stil). <em>Llama-3.1-405B-Instruct</em> antwortet mit einer Definition.`
                },
                {
                    q: `Wofuer steht <strong>RLHF</strong>?
                        ${opts(
                            'Reinforcement Learning from Human Feedback',
                            'Recursive Linear Hyperparameter Fitting',
                            'Real-time Loss Hessian Filter',
                            'Random Low-rank Hierarchical Factorization'
                        )}`,
                    h: 'Christiano et al. 2017 und Ouyang et al. (OpenAI 2022, InstructGPT) haben die Methode entscheidend gepraegt — drei Komponenten sind im Namen.',
                    s: `<strong>Richtige Antwort: A — Reinforcement Learning from Human Feedback.</strong><br><br>
                        Quellen: Christiano et al. "Deep Reinforcement Learning from Human Preferences", NeurIPS 2017; Ouyang et al. "Training language models to follow instructions with human feedback" (InstructGPT-Paper), arXiv:2203.02155, Mar 2022.<br><br>
                        Drei-Schritte-Pipeline:<br>
                        1. SFT (Supervised Fine-Tuning) auf hochwertigen Demo-Daten.<br>
                        2. Reward-Model trainieren: Menschen ordnen Modell-Antworten paarweise; ein zweites Modell lernt diese Praeferenz-Ordnung vorherzusagen.<br>
                        3. PPO-Optimierung: das LLM wird so feingetunt, dass es Antworten erzeugt, die das Reward-Model hoch bewertet — bei gleichzeitig kleinem KL-Abstand zur SFT-Verteilung.<br><br>
                        RLHF war der entscheidende Schritt von GPT-3 (2020) zu ChatGPT (Nov 2022).`
                },
                {
                    q: `Welches Unternehmen veroeffentlichte das <strong>Mistral 7B</strong>-Modell als Open-Weights?
                        ${opts(
                            'Anthropic (US)',
                            'Mistral AI (Frankreich)',
                            'Cohere (Kanada)',
                            'Alibaba (China)'
                        )}`,
                    h: 'Das Unternehmen wurde 2023 in Paris gegruendet und veroeffentlichte Mistral 7B im September 2023 als bis dahin beste 7B-Open-Weights-Variante.',
                    s: `<strong>Richtige Antwort: B — Mistral AI, Frankreich.</strong><br><br>
                        Mistral AI wurde im April 2023 in Paris von ex-Meta- und ex-DeepMind-Forschern gegruendet. Erste Veroeffentlichung: <em>Mistral 7B</em> (Jiang et al., arXiv:2310.06825, 27.09.2023) — 7,3 Mrd. Parameter, Apache-2.0-Lizenz, schlug Llama 2 13B auf den meisten Benchmarks.<br><br>
                        Weitere Modelle:<br>
                        - Mixtral 8x7B (Dec 2023) — Sparse-Mixture-of-Experts, Apache 2.0.<br>
                        - Mixtral 8x22B (Apr 2024).<br>
                        - Mistral Large 2 (Jul 2024) — proprietaer, ueber API.<br><br>
                        Mistral AI gilt als europaeischer Frontier-Player und ist in der EU-AI-Act-Diskussion als General-Purpose-AI-Anbieter (GPAI) reguliert.`
                },
                {
                    q: `Welches der folgenden Unternehmen veroeffentlichte das <strong>Qwen2-72B</strong>-Modell?
                        ${opts(
                            'Tencent',
                            'Baidu',
                            'Alibaba',
                            'ByteDance'
                        )}`,
                    h: 'Qwen ("Tongyi Qianwen") ist die LLM-Familie des chinesischen Cloud-Anbieters, der auch fuer eine grosse E-Commerce-Plattform bekannt ist.',
                    s: `<strong>Richtige Antwort: C — Alibaba.</strong><br><br>
                        Alibaba Cloud veroeffentlicht die Qwen-Familie (chinesisch "Tongyi Qianwen", 通义千问) ueber Hugging Face und ModelScope. Qwen2-72B-Instruct (Yang et al., arXiv:2407.10671, Jul 2024) erreichte zum Release MMLU 84,2 %, HumanEval 86,0 %.<br><br>
                        Die Open-Weights-Lizenz erlaubt kommerzielle Nutzung (Tongyi-Qianwen-Lizenz, mit DAU-Schwellen-Klauseln aehnlich Llama).<br><br>
                        Andere chinesische LLM-Familien:<br>
                        - <strong>Baidu</strong> ERNIE Bot (proprietaer).<br>
                        - <strong>Tencent</strong> Hunyuan.<br>
                        - <strong>ByteDance</strong> Doubao.<br>
                        - <strong>DeepSeek</strong> (eigenstaendiges Startup) — DeepSeek-V3 (Dec 2024).`
                },
                {
                    q: `Welcher der folgenden ist KEIN Multiple-Choice-Wissens-Benchmark fuer LLMs?
                        ${opts(
                            'MMLU',
                            'GPQA',
                            'HellaSwag',
                            'FID (Frechet Inception Distance)'
                        )}`,
                    h: 'Drei der vier Namen stehen fuer Multiple-Choice-Tests von Sprachmodellen. Einer ist eine Metrik aus einer ganz anderen ML-Disziplin.',
                    s: `<strong>Richtige Antwort: D — FID.</strong><br><br>
                        <strong>FID</strong> (Heusel et al., NeurIPS 2017) ist eine Metrik zur Beurteilung generativer Bildmodelle: vergleicht die Verteilung der Aktivierungen einer Inception-V3-Schicht auf echten vs. generierten Bildern. Wird typisch fuer Stable-Diffusion, BigGAN etc. genutzt — hat mit LLMs nichts zu tun.<br><br>
                        - <strong>MMLU</strong> (Hendrycks 2020): 57 Faecher, 4-AC-Multiple-Choice.<br>
                        - <strong>GPQA</strong> (Rein 2023): graduate-level, 4-AC-Multiple-Choice.<br>
                        - <strong>HellaSwag</strong> (Zellers 2019): Common-Sense-Satzfortsetzung, 4-AC-Multiple-Choice.`
                },
                {
                    q: `Was beschreibt der Sampling-Parameter <strong>"Temperature"</strong> bei einem LLM?
                        ${opts(
                            'Die Hardware-Temperatur der GPU in Grad Celsius.',
                            'Einen Skalierungsfaktor auf die Logits vor dem Softmax — hoehere Werte machen die Verteilung flacher und die Ausgabe diverser.',
                            'Die Trainingszeit in Stunden.',
                            'Die Kontextlaenge in Tokens.'
                        )}`,
                    h: 'Hintergrund Boltzmann-Verteilung: $P_i \\propto \\exp(z_i/T)$. Bei $T \\to 0$ wird die Verteilung deterministisch (Greedy), bei grossem $T$ uniform.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Beim Sampling wird das naechste Token aus der Verteilung $P(t_i) = \\dfrac{\\exp(z_i/T)}{\\sum_j \\exp(z_j/T)}$ gezogen, mit Logits $z_i$ und Temperatur $T$.<br><br>
                        - $T = 0$: Greedy-Decoding (immer das wahrscheinlichste Token) — deterministisch.<br>
                        - $T = 1$: unveraenderte Modellverteilung.<br>
                        - $T > 1$: flacher, kreativer, riskanter.<br>
                        - $T < 1$: gespitzter, konservativer.<br><br>
                        OpenAI-API-Default 1,0; Anthropic-Default 1,0; viele Code-Anwendungen nutzen 0,0–0,2 fuer Reproduzierbarkeit. Quelle: OpenAI API-Reference, Anthropic API-Reference (Stand 2024).<br><br>
                        Verwandte Parameter: <code>top_p</code> (Nucleus-Sampling, Holtzman et al. 2020), <code>top_k</code>, <code>presence/frequency penalty</code>.`
                },
                {
                    q: `Was ist <strong>BPE (Byte-Pair Encoding)</strong> im LLM-Kontext?
                        ${opts(
                            'Ein Kompressionsalgorithmus, um Modell-Gewichte kleiner zu speichern.',
                            'Ein Tokenisierungs-Algorithmus, der haeufige Zeichen-Sequenzen iterativ zu Subword-Tokens zusammenfuegt.',
                            'Ein Verfahren zum Daten-Sharding ueber GPUs.',
                            'Ein Inferenz-Cache fuer Attention-Keys.'
                        )}`,
                    h: 'BPE stammt urspruenglich aus der Datenkompression (Gage 1994) und wurde von Sennrich et al. (2016) auf maschinelle Uebersetzung uebertragen. GPT-2/3/4 nutzen eine Byte-Level-Variante.',
                    s: `<strong>Richtige Antwort: B — Tokenisierung.</strong><br><br>
                        BPE startet mit dem Vokabular aller einzelnen Bytes/Zeichen und fuegt iterativ das haeufigste aufeinanderfolgende Paar zu einem neuen Token zusammen, bis das Zielvokabular (z.B. 50.257 Tokens bei GPT-2/3, 100.277 bei GPT-4) erreicht ist.<br><br>
                        Quellen:<br>
                        - Gage 1994 "A New Algorithm for Data Compression" (Urform).<br>
                        - Sennrich et al. "Neural Machine Translation of Rare Words with Subword Units", ACL 2016 (BPE fuer NLP).<br>
                        - Radford et al. GPT-2 Paper (Byte-Level BPE).<br><br>
                        Tokenisierungs-Konsequenzen: deutsche Texte verbrauchen oft 1,5-2× mehr Tokens als englische gleiche Wortzahl; chinesische / arabische sogar 3-4× — was die Kosten pro Anfrage beeinflusst (OpenAI berechnet pro Token).<br><br>
                        Alternative Tokenizer: <strong>SentencePiece</strong> (Llama, Mistral), <strong>WordPiece</strong> (BERT), <strong>Tiktoken</strong> (OpenAI-Implementation von BPE).`
                },
                {
                    q: `Welches der folgenden ist ein <strong>kleines Sprachmodell ("Small Language Model")</strong> mit ~3,8 Mrd. Parametern und MMLU > 68 %, das auf einem Smartphone laufen kann?
                        ${opts(
                            'Llama 3.1 405B',
                            'Microsoft Phi-3-mini-3.8B',
                            'GPT-4 Turbo',
                            'Claude 3 Opus'
                        )}`,
                    h: 'Microsoft Research hat 2024 eine Serie kleiner Modelle mit ungewoehnlich gutem Benchmark-Verhalten veroeffentlicht.',
                    s: `<strong>Richtige Antwort: B — Phi-3-mini-3.8B.</strong><br><br>
                        Abdin et al. "Phi-3 Technical Report", arXiv:2404.14219, Apr 2024. Das Modell hat 3,8 Mrd. Parameter, wurde auf 3,3 T Tokens (stark kuratiertes "textbook quality"-Korpus) trainiert und erreicht:<br>
                        - MMLU 68,8 %<br>
                        - HumanEval 59,1 %<br>
                        - MT-Bench 8,38<br><br>
                        4-bit-quantisiert (1,8 GB) laeuft Phi-3-mini auf einem iPhone-Neural-Engine; eine Demo erreicht > 12 Tokens/s. Lizenz: MIT (sehr permissiv).<br><br>
                        Die anderen Optionen sind Frontier-Modelle (Llama 3.1 405B = 405 B Parameter; GPT-4 Turbo / Claude 3 Opus = nur per API). Sie laufen nicht lokal auf Mobilgeraeten.`
                },
                {
                    q: `Welches Modell wurde von <strong>Google DeepMind</strong> im Juni 2024 als 2-B/9-B/27-B Open-Weights-Variante veroeffentlicht?
                        ${opts(
                            'Gemini 1.5 Pro',
                            'Gemma 2',
                            'PaLM 2',
                            'BERT'
                        )}`,
                    h: 'Der Name leitet sich vom lateinischen Wort fuer "Edelstein" ab und ist die offene Gegenstueck-Familie zu den geschlossenen Gemini-Modellen.',
                    s: `<strong>Richtige Antwort: B — Gemma 2.</strong><br><br>
                        Google DeepMind veroeffentlichte am 27.06.2024 Gemma 2 (Gemma Team, "Gemma 2: Improving Open Language Models at a Practical Size", arXiv:2408.00118) in den Groessen 2 B, 9 B und 27 B Parameter.<br><br>
                        Wesentliches:<br>
                        - Architektur: Decoder-only Transformer mit Gemini-aehnlichen Verbesserungen (Logit Soft-capping, Grouped-Query Attention).<br>
                        - Trainingsmenge: 9 B Variante 8 T Tokens, 27 B 13 T Tokens.<br>
                        - MMLU: Gemma 2 27B Instruct ~75,2 %, MT-Bench 8,52.<br>
                        - Lizenz: Gemma-Terms-of-Use (kommerziell nutzbar, eigene Lizenzform).<br><br>
                        Gemini 1.5 Pro ist proprietaer (API-only); PaLM 2 ist die Vorgaenger-Familie aus 2023; BERT (Devlin 2018) ist encoder-only und keine LLM-Generation in diesem Sinn.`
                },
                {
                    q: `Was ist <strong>"in-context learning" / "few-shot prompting"</strong> bei einem LLM?
                        ${opts(
                            'Der Gradient-Descent-Schritt waehrend des Pre-Trainings.',
                            'Das Modell lernt eine neue Aufgabe direkt aus Beispielen im Prompt, ohne Gewichts-Update.',
                            'Distillation eines grossen in ein kleines Modell.',
                            'Hardware-Beschleunigung durch sparse Attention.'
                        )}`,
                    h: 'GPT-3 (Brown et al., 2020) machte den Effekt prominent: "Language Models are Few-Shot Learners".',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        In-context learning bedeutet, dass das Modell aus ein paar Beispielen im Prompt eine Aufgabe ohne Parameter-Update generalisiert.<br><br>
                        Beispiel-Prompt:<br>
                        <code>EN: hello → DE: hallo<br>
                        EN: thank you → DE: danke<br>
                        EN: good morning → DE: ?</code><br><br>
                        Das Modell vervollstaendigt zu <code>guten Morgen</code> — obwohl es nie spezifisch fuer "EN-DE-Uebersetzung" trainiert wurde.<br><br>
                        Skalierung: Few-shot-Performance steigt scharf mit Modellgroesse (GPT-3-Paper Abb. 1.2). Quelle: Brown et al., arXiv:2005.14165, 2020.<br><br>
                        Heute durch <strong>SFT/RLHF-Modelle</strong> oft mit Zero-shot direkten Anweisungen ersetzt ("Uebersetze 'good morning' ins Deutsche."), aber Few-shot bleibt nuetzlich fuer ungewoehnliche Formate.`
                },
                {
                    q: `Welche Aussage zu <strong>Chain-of-Thought (CoT) Prompting</strong> ist korrekt?
                        ${opts(
                            'CoT ist ein Hardware-Feature von NVIDIA-H100-GPUs.',
                            'CoT bedeutet, das Modell zur expliziten schrittweisen Begruendung "Let\u2019s think step by step" zu animieren — verbessert Mathematik- und Reasoning-Benchmarks deutlich.',
                            'CoT bezeichnet die Lizenzform fuer Open-Source-Modelle.',
                            'CoT ist ein Synonym fuer Quantisierung.'
                        )}`,
                    h: 'Wei et al. (Google 2022) und Kojima et al. (2022) haben das Konzept im Paper "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" eingefuehrt.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Quellen:<br>
                        - Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", NeurIPS 2022 (arXiv:2201.11903) — gezeigte Beispiele im Prompt mit ausgeschriebener Loesungskette.<br>
                        - Kojima et al., "Large Language Models are Zero-Shot Reasoners", NeurIPS 2022 (arXiv:2205.11916) — der Trigger-Satz "Let\u2019s think step by step." reicht oft als Zero-shot-CoT.<br><br>
                        Effekt auf GSM8K (PaLM 540B): von 17,9 % (Standard-Prompting) auf 58,1 % (CoT) — also Faktor 3.<br><br>
                        Reasoning-Modelle wie <strong>OpenAI o1 / o3</strong> haben diese Idee internalisiert: sie werden trainiert, lange interne CoT-Sequenzen ("reasoning tokens") zu produzieren, bevor sie antworten — daher die deutlich hoeheren MATH/AIME/GPQA-Werte.`
                },
                {
                    q: `Welches Unternehmen veroeffentlicht die <strong>Whisper</strong>-Familie fuer automatische Spracherkennung (ASR)?
                        ${opts(
                            'Meta AI',
                            'OpenAI',
                            'Google',
                            'Mistral AI'
                        )}`,
                    h: 'Das Modell wurde Ende 2022 vorgestellt und ist (anders als die GPT-Familie) als Open-Weights unter MIT-Lizenz frei verfuegbar.',
                    s: `<strong>Richtige Antwort: B — OpenAI.</strong><br><br>
                        Radford et al., "Robust Speech Recognition via Large-Scale Weak Supervision", arXiv:2212.04356, Dez 2022. Whisper wurde auf 680.000 Stunden mehrsprachiger Audio-Daten trainiert.<br><br>
                        Eigenschaften:<br>
                        - Multilingual (~99 Sprachen), zusaetzlich Sprache-Detection und Uebersetzung ins Englische.<br>
                        - Verfuegbar in 5 Groessen: tiny / base / small / medium / large (39 M bis 1,55 Mrd. Parameter).<br>
                        - Lizenz: MIT — vollstaendig oeffentlich.<br>
                        - Wird von vielen End-User-Tools genutzt (MacWhisper, OpenAI-API, Privacy-First-Apps).<br><br>
                        Vor GPT-4o wurde Whisper in OpenAIs Voice-Mode kaskadiert: Audio → Whisper → GPT → TTS. GPT-4o (Mai 2024) loest das mit einem nativ multimodalen Modell ab — Whisper bleibt aber wichtig fuer Offline-/Privacy-Workflows.`
                },
                {
                    q: `Worin unterscheidet sich <strong>BERT (Devlin et al., 2018)</strong> grundlegend von der GPT-Familie?
                        ${opts(
                            'BERT ist ein encoder-only Transformer mit bidirektionaler Aufmerksamkeit; GPT ist decoder-only und autoregressiv.',
                            'BERT hat mehr Parameter als GPT-4.',
                            'BERT wurde von Anthropic veroeffentlicht.',
                            'BERT ist ein Bildmodell, kein Textmodell.'
                        )}`,
                    h: 'BERT (Bidirectional Encoder Representations from Transformers) ist 2018 von Google publiziert worden und nutzt Masked-Language-Modeling statt Next-Token-Prediction.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", arXiv:1810.04805, Oct 2018.<br><br>
                        Architektur-Unterschiede:<br>
                        - <strong>BERT</strong>: encoder-only, bidirektionale Self-Attention, trainiert mit Masked-Language-Modeling (zufaellig maskierte Tokens vorhersagen) + Next-Sentence-Prediction. 110 M Parameter (Base) bzw. 340 M (Large). Geeignet fuer Klassifikation, NER, Frage-Antwort-Extraktion.<br>
                        - <strong>GPT</strong>: decoder-only, kausale (linksgerichtete) Attention, trainiert mit Next-Token-Prediction. Autoregressiv → eignet sich zur Texterzeugung.<br><br>
                        Folge: BERT generiert keinen freien Fliesstext, GPT keine bidirektionalen Embeddings. Heutige LLMs (Llama, GPT-4, Claude) sind alle decoder-only; encoder-only-Architekturen leben in Embedding-Modellen (z.B. sentence-transformers, OpenAI text-embedding-3) und Retrieval-Pipelines weiter.`
                }
            ],

            // ============================================================
            //  Level 2 — Vertiefung (Bench-Spezifika, Versionsunterschiede)
            // ============================================================
            [
                {
                    q: `Welches Modell erreichte bei <strong>GPQA Diamond</strong> (graduate-level Naturwissenschaften, 0-shot) den hoechsten Score?
                        ${opts(
                            'GPT-4o (Mai 2024): 53,6 %',
                            'Claude 3.5 Sonnet (Jun 2024): 59,4 %',
                            'o1-preview (Sep 2024): 73,3 %',
                            'Gemini 1.5 Pro (May 2024): 46,2 %'
                        )}`,
                    h: 'GPQA Diamond (Rein et al., 2023) ist "Google-proof", d.h. selbst geuebte Recherche hilft kaum. Reasoning-faehige Modelle dominieren hier.',
                    s: `<strong>Richtige Antwort: C — o1-preview, 73,3 %.</strong><br><br>
                        OpenAI hat o1-preview am 12.09.2024 vorgestellt; im Begleit-Post "Learning to reason with LLMs" wurden 73,3 % GPQA Diamond berichtet — deutlich vor allen bisherigen Modellen ohne Test-Time-Reasoning.<br><br>
                        - GPT-4o: 53,6 % (OpenAI o1-Blog, Vergleichstabelle).<br>
                        - Claude 3.5 Sonnet (Jun 2024): 59,4 % (Anthropic Blog).<br>
                        - Gemini 1.5 Pro (May 2024 Update): 46,2 % (Google Technical Report Tab. 7).<br>
                        - o1 (Dezember 2024 final): 78,0 % (OpenAI o1 System Card).<br><br>
                        Menschliche promovierte Experten erreichen rund 65 % auf GPQA Diamond — o1 ist auf diesem Benchmark erstmals ueberbessere-Mensch.`
                },
                {
                    q: `Welches Modell hatte bei <strong>SWE-Bench Verified</strong> (OpenAI Aug 2024) Stand Oktober 2024 den hoechsten oeffentlich berichteten Wert?
                        ${opts(
                            'GPT-4o',
                            'Claude 3 Opus',
                            'Claude 3.5 Sonnet "new" (Anthropic, 22.10.2024)',
                            'Gemini 1.5 Pro'
                        )}`,
                    h: 'Anthropic hat im Oktober 2024 ein "neues" Claude-3.5-Sonnet veroeffentlicht, das insbesondere bei agentischen Coding-Aufgaben grosse Spruenge zeigte.',
                    s: `<strong>Richtige Antwort: C — Claude 3.5 Sonnet "new", 49,0 % SWE-Bench Verified.</strong><br><br>
                        Anthropic Blog "Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku" (22.10.2024) berichtet 49,0 % auf SWE-Bench Verified — neuer Spitzenwert unter den allgemeinen LLMs.<br><br>
                        Vergleichswerte (gleicher Stand):<br>
                        - GPT-4o: 33,2 %<br>
                        - Claude 3 Opus: nicht offiziell gemessen / nicht in Tab.<br>
                        - Gemini 1.5 Pro: ~33 % (vergleichbare Veroeffentlichungen)<br>
                        - o1-preview: 41,0 % (OpenAI o1-Blog, Sep 2024)<br><br>
                        <em>Hinweis:</em> Spezialisierte Coding-Agents (Cognition Devin, Cosine Genie etc.) erzielen mit gleichem Basismodell hoehere Scores, da sie Tool-Use, Retry und Tests einbinden.`
                },
                {
                    q: `Welches Modell hat das <strong>groesste publizierte Kontextfenster</strong> (Anfang 2025)?
                        ${opts(
                            'GPT-4o: 128k Tokens',
                            'Claude 3.5 Sonnet: 200k Tokens',
                            'Gemini 1.5 Pro: 2 Mio. Tokens (Long-Context-Mode)',
                            'Llama 3.1 405B Instruct: 128k Tokens'
                        )}`,
                    h: 'Eines der Modelle wurde spezifisch fuer Long-Context-Retrieval optimiert ("Needle in a Haystack" ueber Millionen Tokens) und liegt um eine Groessenordnung vor den anderen.',
                    s: `<strong>Richtige Antwort: C — Gemini 1.5 Pro, bis zu 2 Mio. Tokens.</strong><br><br>
                        Im Gemini-1.5-Technical-Report (arXiv:2403.05530) berichtet Google ein Standard-Kontextfenster von 1 Mio. Tokens und einen Forschungs-Mode mit bis zu 10 Mio. Tokens; ueber die API ist ab Mai 2024 ein Long-Context-Mode mit 2 Mio. Tokens verfuegbar.<br><br>
                        - GPT-4o: 128k (OpenAI API-Dokumentation).<br>
                        - Claude 3.5 Sonnet: 200k (Anthropic API-Dokumentation).<br>
                        - Llama 3.1 405B Instruct: 128k (Meta Llama-3.1-Paper).<br><br>
                        Gemini 1.5 Pro erzielt zudem ueber 99 % Recall im "Needle in a Haystack"-Test bei 1 Mio. Tokens.`
                },
                {
                    q: `Welches Modell hat beim <strong>MATH-Benchmark</strong> (Hendrycks 2021, Wettbewerbsmathematik) den hoechsten Wert?
                        ${opts(
                            'GPT-4o (May 2024): 76,6 %',
                            'Claude 3.5 Sonnet (Jun 2024): 71,1 %',
                            'o1-preview (Sep 2024): 85,5 %',
                            'Gemini 1.5 Pro (May 2024): 67,7 %'
                        )}`,
                    h: 'MATH-Aufgaben kommen aus AMC/AIME/Putnam-Wettbewerben und brauchen mehrstufiges Reasoning. Erst Test-Time-Reasoning-Modelle haben den Score deutlich gehoben.',
                    s: `<strong>Richtige Antwort: C — o1-preview, 85,5 %.</strong><br><br>
                        Werte aus den offiziellen Modellberichten:<br>
                        - GPT-4o: 76,6 % (OpenAI "Hello GPT-4o" Blog, Mai 2024).<br>
                        - Claude 3.5 Sonnet: 71,1 % (Anthropic Blog, Jun 2024).<br>
                        - o1-preview: 85,5 % (OpenAI Blog "Learning to reason with LLMs", Sep 2024).<br>
                        - Gemini 1.5 Pro: 67,7 % (Gemini 1.5 Technical Report).<br><br>
                        Das finale o1 (Dez 2024) erreichte 94,8 % auf MATH; o3 (Dez 2024, Preview) sogar 96,7 %.`
                },
                {
                    q: `Welches Modell der <strong>Claude-3-Familie</strong> stand bei Erstveroeffentlichung (Maerz 2024) an der Spitze (groesste Variante)?
                        ${opts(
                            'Claude 3 Haiku',
                            'Claude 3 Sonnet',
                            'Claude 3 Opus',
                            'Claude 3 Sonnet 3.5'
                        )}`,
                    h: 'Anthropic verwendet drei Groessenstufen mit lyrischen Namen. Die groesste ist die operngeeignete.',
                    s: `<strong>Richtige Antwort: C — Claude 3 Opus.</strong><br><br>
                        Anthropic veroeffentlichte am 04.03.2024 drei Modelle parallel:<br>
                        - <strong>Claude 3 Haiku</strong> — schnellstes, kleinstes (~$0,25/M Input Tokens).<br>
                        - <strong>Claude 3 Sonnet</strong> — Mittelklasse.<br>
                        - <strong>Claude 3 Opus</strong> — groesstes, leistungsstaerkstes Modell der Familie (~$15/M Input Tokens).<br><br>
                        Claude 3.5 Sonnet ist eine spaetere Generation (Jun 2024) und Teil der 3.5-Familie, nicht der ursprünglichen 3er-Familie. Die Namenskonvention "Haiku/Sonnet/Opus" wurde fortgesetzt; Claude 3.5 Haiku kam Oktober 2024, Claude 3.5 Opus war Anfang 2025 angekuendigt, aber zur Zeit der Quellenstaende dieser Aufgabe noch nicht veroeffentlicht.`
                },
                {
                    q: `Welche der folgenden Aussagen ueber <strong>o1 vs. GPT-4o</strong> ist korrekt?
                        ${opts(
                            'o1 ist eine schnellere/billigere Variante von GPT-4o ohne Reasoning.',
                            'o1 nutzt explizites Test-Time-Reasoning (laengere "Denkzeit") und erzielt vor allem bei MATH/AIME/GPQA grosse Spruenge gegenueber GPT-4o.',
                            'o1 ist ein reines Vision-Modell ohne Textfaehigkeit.',
                            'o1 ist Open-Source und liegt auf Hugging Face vor.'
                        )}`,
                    h: 'OpenAIs o1 wurde im September 2024 angekuendigt als "Reasoning-Modell". Die Architektur-Aenderung gegenueber GPT-4o ist auch fuer Anwender spuerbar (laengere Latenz, sichtbare interne Reasoning-Schritte).',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        OpenAI o1 (Blog "Learning to reason with LLMs", 12.09.2024) ist explizit auf Test-Time-Reasoning trainiert: das Modell erzeugt vor der Antwort eine laengere interne Chain-of-Thought ("Reasoning Tokens"). Auswirkung auf Benchmarks gegenueber GPT-4o:<br>
                        - MATH: GPT-4o 76,6 % → o1-preview 85,5 % → o1 94,8 %<br>
                        - AIME 2024: GPT-4o 13,4 % → o1-preview 56,7 % → o1 83,3 %<br>
                        - GPQA Diamond: GPT-4o 53,6 % → o1-preview 73,3 % → o1 78,0 %<br>
                        - HumanEval: vergleichbar (Coding profitiert weniger eindeutig vom Reasoning-Modus).<br><br>
                        o1 ist (Stand Anfang 2025) langsamer und teurer als GPT-4o pro Antwort; nicht Open-Source; kein reines Vision-Modell (Vision-Eingang kam mit o1 schrittweise).`
                },
                {
                    q: `Welche Methodik-Unterschiede sind beim Vergleich von <strong>HumanEval-Scores zwischen Modellen</strong> typischerweise zu beachten?
                        ${opts(
                            'pass@1 vs. pass@10 (Anzahl der Stichproben pro Aufgabe)',
                            '0-shot vs. few-shot Prompting',
                            'Mit/ohne Code-Execution-Hilfe (z.B. Self-Repair-Loop)',
                            'Alle drei Punkte (A, B und C) sind relevant.'
                        )}`,
                    h: 'Benchmark-Zahlen aus Pressemeldungen vergleichen oft Aepfel mit Birnen — Methodik-Details entscheiden ueber den absoluten Wert.',
                    s: `<strong>Richtige Antwort: D — alle drei Punkte.</strong><br><br>
                        Korrekte Methodik-Disziplin (siehe HumanEval-Original, Chen et al. 2021):<br>
                        - <strong>pass@1</strong> = Anteil Aufgaben, bei denen die erste Loesung korrekt ist. <strong>pass@10</strong> = mindestens eine von 10 Loesungen korrekt — fast immer hoeher.<br>
                        - <strong>0-shot vs. few-shot:</strong> Wenige Beispielloesungen im Prompt heben den Score; bei Modellberichten ist 0-shot heute Standard.<br>
                        - <strong>Self-Repair-Loops</strong> (Modell darf seinen Code ausfuehren und korrigieren) heben pass@1 oft um 10-20 Punkte und entsprechen nicht mehr dem Original-Setup.<br><br>
                        Beim Vergleichen muss daher die genaue Eval-Konfiguration in den Quellenangaben uebereinstimmen. AGENTS §8 (Wissenschaftliche Korrektheit) fordert in diesem Sinn benannte Konventionen.`
                },
                {
                    q: `Welches Modell wurde 2024 von <strong>DeepSeek</strong> veroeffentlicht und erreichte mit MoE-Architektur (671 B Gesamtparameter, 37 B aktiv) starke Coding- und Math-Werte zu deutlich niedrigeren Trainingskosten?
                        ${opts(
                            'DeepSeek-V3',
                            'Mistral Large 2',
                            'Qwen2-72B',
                            'Yi-34B'
                        )}`,
                    h: 'DeepSeek hat im Dezember 2024 ein Modell veroeffentlicht, dessen Trainingskosten (oeffentlich angegeben ~5,6 Mio. USD) und Benchmark-Werte fuer Aufsehen sorgten.',
                    s: `<strong>Richtige Antwort: A — DeepSeek-V3.</strong><br><br>
                        DeepSeek-V3 (Technical Report arXiv:2412.19437, Dez 2024) ist ein Mixture-of-Experts-Modell mit 671 B Gesamt- und 37 B aktiven Parametern. Wesentliche Punkte:<br>
                        - Trainingsbudget laut Paper: 2,788 Mio. H800-GPU-Stunden = ~5,576 Mio. USD (sehr niedrig im Vergleich zu Frontier-Modellen).<br>
                        - HumanEval: 89,0 % pass@1.<br>
                        - MMLU: 88,5 %.<br>
                        - MATH: 90,2 % (mit eigener "DeepSeek-Math"-Pipeline).<br>
                        - Veroeffentlichung der Gewichte unter eigener DeepSeek-Lizenz.<br><br>
                        Mistral Large 2 (Mistral AI, Juli 2024), Qwen2-72B (Alibaba) und Yi-34B (01.AI) sind eigenstaendige Modelle anderer Hersteller.`
                },
                {
                    q: `Welche Aussage zu <strong>Mixture-of-Experts (MoE)</strong>-Modellen wie Mixtral 8x7B oder DeepSeek-V3 ist korrekt?
                        ${opts(
                            'Jedes Token wird durch alle Experten gleichzeitig prozessiert — Inferenz ist deutlich teurer als bei dichten Modellen.',
                            'Ein Router waehlt pro Token nur eine kleine Teilmenge der Experten (z.B. 2 von 8 oder 8 von 256) — Gesamtparameter sind hoch, aber aktive (kompute-relevante) Parameter pro Token sind viel kleiner.',
                            'Alle Experten teilen sich dieselben Gewichte; "MoE" ist nur ein Marketing-Name.',
                            'MoE bedeutet, dass mehrere Modelle parallel laufen und gemittelt werden (Ensemble).'
                        )}`,
                    h: 'Mixtral 8x7B hat 47 Mrd. Gesamtparameter, aber pro Token sind nur etwa 13 Mrd. aktiv. DeepSeek-V3 hat 671 Mrd. Gesamt-, 37 Mrd. aktive Parameter.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Sparse-MoE-Architektur (Shazeer et al. "Outrageously Large Neural Networks", ICLR 2017; Fedus et al. "Switch Transformer", JMLR 2022):<br>
                        - Jeder Transformer-Block enthaelt $N$ "Experten" (eigene Feed-Forward-Netzwerke).<br>
                        - Ein <em>Gating-Netzwerk</em> waehlt pro Token Top-$k$ Experten (typisch $k=2$).<br>
                        - Nur diese $k$ Experten werden ausgewertet — Inferenz kostet etwa wie ein dichtes Modell mit $k/N$ der Gesamtparameter.<br><br>
                        Konkrete Werte:<br>
                        - Mixtral 8x7B (Jiang et al., arXiv:2401.04088): 47 B Gesamt / ~13 B aktiv, Routing 2 von 8.<br>
                        - DeepSeek-V3: 671 B Gesamt / 37 B aktiv, 256 Experten + 1 Shared, Routing 8 von 256.<br>
                        - GPT-4 (geruechteweise): ~1,76 T Gesamt mit MoE-Routing (offiziell unbestaetigt).<br><br>
                        MoE ermoeglicht hohe Kapazitaet bei moderaten Inferenzkosten, ist aber speicherintensiv (alle Experten muessen im RAM/VRAM gehalten werden) und im Trainings-Load-Balancing tricky.`
                },
                {
                    q: `Was misst die <strong>"Chatbot Arena" (LMSys Arena, lmarena.ai)</strong>?
                        ${opts(
                            'Eine offene paarweise Bewertungs-Plattform mit ELO-Rating, basierend auf anonymen menschlichen Praeferenz-Urteilen.',
                            'Die Inferenz-Latenz in Millisekunden.',
                            'Den Stromverbrauch in Wh pro Antwort.',
                            'Den Trainings-Compute in FLOPs.'
                        )}`,
                    h: 'LMSys (Large Model Systems, UC Berkeley) hat 2023 eine Plattform gestartet, auf der Nutzer zwei anonyme Modellantworten vergleichen. Aus den Voten wird eine ELO-Tabelle berechnet.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Chiang et al. "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference", arXiv:2403.04132, Mar 2024. Nutzer geben dieselbe Frage in das Web-Interface, bekommen zwei anonyme Antworten und stimmen ab, welche besser ist. Aus den paarweisen Voten wird wie beim Schach ein Bradley-Terry- bzw. ELO-Rating berechnet.<br><br>
                        Vorteile gegenueber statischen Benchmarks:<br>
                        - Echtes Nutzerverhalten, nicht synthetische Multiple-Choice-Aufgaben.<br>
                        - Resistent gegen Benchmark-Kontamination (Voten kommen frisch aus dem Wild).<br><br>
                        Nachteile:<br>
                        - Hauptsaechlich Englisch-Bias.<br>
                        - "Vibe-Voting": ueberzeugend formulierte falsche Antworten gewinnen oft gegen knappe richtige.<br>
                        - Anfaellig fuer Stilpraeferenzen (Laenge, Listen-Format).<br><br>
                        Stand Anfang 2025 Top-3 typischerweise: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro — Reihenfolge fluktuiert.`
                },
                {
                    q: `Was beschreibt <strong>RAG (Retrieval-Augmented Generation)</strong>?
                        ${opts(
                            'Eine Verschluesselungstechnik fuer Modell-Gewichte.',
                            'Ein Architektur-Muster, bei dem ein Retriever (z.B. Vektor-DB) relevante Dokumente sucht und dem LLM in den Prompt einspielt — die Antwort basiert auf abgerufenem Kontext, nicht nur auf den Modellgewichten.',
                            'Ein Sampling-Algorithmus zur Diversifizierung.',
                            'Eine Quantisierungs-Methode (FP8-Format).'
                        )}`,
                    h: 'Lewis et al. (Meta 2020) haben RAG fuer NLP eingefuehrt. Heute ist es das Standardmuster fuer Unternehmens-Chatbots mit eigener Wissensbasis.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", NeurIPS 2020 (arXiv:2005.11401).<br><br>
                        Typische Pipeline:<br>
                        1. Dokumente in Chunks teilen, jeweils zu Vektor-Embedding (z.B. OpenAI text-embedding-3-large) speichern in einer Vektor-Datenbank (Pinecone, Qdrant, Weaviate, FAISS).<br>
                        2. Nutzeranfrage als Embedding suchen → top-$k$ aehnliche Chunks zurueckgeben.<br>
                        3. Top-$k$ Chunks in den LLM-Prompt einspielen ("Beantworte die Frage basierend auf diesem Kontext: …").<br>
                        4. LLM generiert die Antwort mit Quellenangabe.<br><br>
                        Vorteile gegenueber reinem Fine-Tuning:<br>
                        - Wissensbasis aktualisierbar ohne Re-Training.<br>
                        - Quellen-Nachweis fuer Compliance / Audit.<br>
                        - Halluzinationen reduziert (aber nicht eliminiert).<br><br>
                        Limitationen: Retrieval-Qualitaet ist Flaschenhals; "Lost in the middle"-Effekt (Liu et al., 2023) bei langen Kontexten.`
                },
                {
                    q: `Was bedeutet <strong>"Quantisierung"</strong> (z.B. INT8, INT4, FP8) im LLM-Kontext?
                        ${opts(
                            'Aufteilung des Modells auf mehrere GPUs (Tensor Parallelism).',
                            'Reduktion der numerischen Praezision der Gewichte (und teilweise Aktivierungen) von FP32 / BF16 auf INT8 / INT4 / FP8, um Speicher und Inferenzkosten zu senken.',
                            'Konvertierung von Text in Tokens.',
                            'Generierung mehrerer Antwortkandidaten parallel.'
                        )}`,
                    h: 'GPTQ, AWQ, bitsandbytes-Bibliotheken sind in diesem Bereich Standardwerkzeuge. Die Quantisierung trifft typischerweise einen Trade-off zwischen Modellgroesse und Antwortqualitaet.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Beispiele und Quellen:<br>
                        - <strong>GPTQ</strong> (Frantar et al., ICLR 2023, arXiv:2210.17323) — Post-Training-INT4-Quantisierung mit kalibriertem Hesse-Verfahren.<br>
                        - <strong>AWQ</strong> (Lin et al., MLSys 2024, arXiv:2306.00978) — gewichtete Activation-bewusste Quantisierung.<br>
                        - <strong>bitsandbytes</strong> (Dettmers, NeurIPS 2022) — 8-bit-Inferenz fuer Hugging-Face-Modelle.<br><br>
                        Speicherreduktion fuer Llama 3.1 70B Instruct:<br>
                        - BF16 (Original): ~140 GB → 2× A100 80 GB noetig.<br>
                        - INT8: ~70 GB → eine A100 80 GB reicht.<br>
                        - INT4 (GPTQ/AWQ): ~35 GB → laeuft auf RTX 4090 (24 GB) mit Offloading; ~1-2 Punkte MMLU-Verlust.<br><br>
                        FP8 (NVIDIA H100 Hopper) ist ein neueres 8-bit-Format mit Floating-Point-Charakter — bewahrt mehr Dynamik als INT8 bei gleichem Speicher. DeepSeek-V3 wurde teils in FP8 trainiert.`
                },
                {
                    q: `Welche Aussage ueber die <strong>Trainingskosten von Frontier-LLMs</strong> ist nach oeffentlich publizierten Zahlen korrekt?
                        ${opts(
                            'Llama 3.1 405B Pretraining: 30,84 Mio. H100-GPU-Stunden (Meta-Paper, 2024) — ca. 60-100 Mio. USD je nach Strom-/Cloud-Preis.',
                            'GPT-4 Pretraining: offiziell 1 Mrd. USD von OpenAI bestaetigt.',
                            'Claude 3 Opus Pretraining: offiziell 500 Mio. USD bestaetigt.',
                            'DeepSeek-V3: 1 Mrd. USD Trainingskosten.'
                        )}`,
                    h: 'Nur eine der Angaben ist tatsaechlich offiziell in einer Quelle nachweisbar. Die anderen sind frei erfundene oder geschaetzte Werte.',
                    s: `<strong>Richtige Antwort: A — Llama 3.1 405B mit 30,84 Mio. H100-GPU-Stunden.</strong><br><br>
                        Quelle: "The Llama 3 Herd of Models", arXiv:2407.21783, Tab. 5. Meta gibt die exakte GPU-Stunden-Zahl an; bei einem typischen Cloud-Preis von 2-4 USD/H100-h ergibt das 60-120 Mio. USD Trainingsbudget — entsprechend der oft kolportierten "Hunderte Millionen Dollar"-Schaetzungen fuer Frontier-LLMs.<br><br>
                        Die anderen Optionen sind nicht offiziell bestaetigt:<br>
                        - <strong>GPT-4</strong>: OpenAI hat keine Trainingskosten veroeffentlicht; Sam Altman erwaehnte in Interviews "ueber 100 Mio. USD" — keine harte Zahl.<br>
                        - <strong>Claude 3 Opus</strong>: Anthropic hat keine Kostenzahl publiziert.<br>
                        - <strong>DeepSeek-V3</strong>: laut Paper (arXiv:2412.19437) <em>5,576 Mio. USD</em> (2,788 Mio. H800-Stunden × 2 USD) — also rund 1/100 von Llama 3.1, was viel Aufsehen erregte.`
                },
                {
                    q: `Was bedeutet <strong>"Function Calling" / "Tool Use"</strong> im API-Sinn?
                        ${opts(
                            'Das Modell wird quantisiert.',
                            'Das Modell erzeugt strukturierten JSON-Aufruf einer vom Entwickler deklarierten Funktion (z.B. <code>get_weather(city)</code>); der Client fuehrt sie aus und liefert das Ergebnis zurueck.',
                            'Das Modell ruft direkt aus dem Browser HTTP-Endpunkte auf.',
                            'Synonym fuer Chain-of-Thought.'
                        )}`,
                    h: 'OpenAI hat die "Function Calling"-API im Juni 2023 vorgestellt; Anthropic die "Tool Use"-API im April 2024 (GA Mai 2024); Google die "Function Declaration" in Gemini.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Ablauf am Beispiel OpenAI:<br>
                        1. Entwickler schickt Prompt + Liste von Funktions-Schemas (Name, Description, Parameter im JSON-Schema).<br>
                        2. Modell entscheidet: direkt antworten oder eine Funktion mit konkreten Argumenten aufrufen → liefert <code>tool_calls</code> mit JSON-Argumenten.<br>
                        3. Entwickler-Code fuehrt die Funktion lokal aus (z.B. Wetter-API).<br>
                        4. Ergebnis wird in einem Folge-Aufruf als <code>role: tool</code> zurueckgegeben.<br>
                        5. Modell formuliert die finale Nutzer-Antwort.<br><br>
                        Anbieter und Datum:<br>
                        - <strong>OpenAI Function Calling</strong>: 13.06.2023.<br>
                        - <strong>Anthropic Tool Use</strong>: GA 30.05.2024.<br>
                        - <strong>Google Gemini Function Calling</strong>: Mai 2024.<br><br>
                        Function Calling ist das Fundament fuer Agent-Frameworks (LangChain, AutoGen, OpenAI Assistants) und fuer Anthropic Computer Use (Tools = Maus/Tastatur/Screenshot).`
                },
                {
                    q: `Welcher Begriff bezeichnet das Phaenomen, dass ein LLM <strong>plausibel klingende, aber faktisch falsche Antworten</strong> liefert?
                        ${opts(
                            'Drop-out',
                            'Halluzination (hallucination)',
                            'Underfitting',
                            'Adversarial perturbation'
                        )}`,
                    h: 'Der Begriff stammt aus der medizinischen Literatur (Wahrnehmungstaeuschung) und wurde im Sprachmodell-Kontext z.B. von Ji et al. (2023) systematisch eingefuehrt.',
                    s: `<strong>Richtige Antwort: B — Halluzination.</strong><br><br>
                        Ji et al., "Survey of Hallucination in Natural Language Generation", ACM Computing Surveys 2023 (arXiv:2202.03629). Unterschieden werden:<br>
                        - <strong>Intrinsisch</strong>: Modellausgabe widerspricht der Eingabe (z.B. Zusammenfassung enthaelt eine im Quelltext nicht vorkommende Aussage).<br>
                        - <strong>Extrinsisch</strong>: Modellausgabe ist nicht durch die Eingabe verifizierbar (z.B. erfundene Autoren, Studien, Zitate).<br><br>
                        Messmethoden:<br>
                        - <strong>TruthfulQA</strong> (Lin et al. 2022): 817 Fragen, bei denen Menschen oft falsch antworten (Aberglaube, Stereotype).<br>
                        - <strong>FActScore</strong> (Min et al. 2023): atomare Fakten aus einer Antwort werden einzeln gegen Wikipedia gecheckt.<br>
                        - <strong>SimpleQA</strong> (OpenAI Okt 2024): 4.326 kurze Wissensfragen mit exakter Erwartungsantwort.<br><br>
                        Mitigations: RAG mit gepruefter Quelle, CoT mit Self-Consistency, Reasoning-Modelle (o1 reduziert Halluzinationen auf SimpleQA von ~40 % auf ~17 % laut OpenAI o1-System-Card).<br><br>
                        Andere Optionen: Drop-out (Regularisierung im Training), Underfitting (Modell hat zu wenig Kapazitaet), Adversarial Perturbation (kleine Stoerungen die Modell-Antworten kippen) — alle unrelated zum Halluzinationsbegriff.`
                },
                {
                    q: `Was ist der wesentliche Unterschied zwischen <strong>DPO (Direct Preference Optimization)</strong> und <strong>PPO mit Reward-Model (klassisches RLHF)</strong>?
                        ${opts(
                            'DPO benoetigt mehr GPUs als PPO.',
                            'DPO trainiert das LLM direkt auf Praeferenz-Paaren (chosen/rejected) mit einer Bradley-Terry-aehnlichen Verlustfunktion, ohne ein separates Reward-Model und ohne RL-Loop.',
                            'DPO ist nur fuer Bildmodelle anwendbar.',
                            'DPO und PPO sind dasselbe Verfahren mit unterschiedlichen Namen.'
                        )}`,
                    h: 'Rafailov et al. (Stanford 2023) haben gezeigt, dass die optimale RLHF-Loesung in geschlossener Form als Maximum-Likelihood ueber Praeferenzdaten geschrieben werden kann.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Rafailov et al. "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", NeurIPS 2023 (arXiv:2305.18290).<br><br>
                        Klassisches RLHF (Ouyang et al., InstructGPT 2022):<br>
                        1. SFT-Modell trainieren.<br>
                        2. Reward-Model auf paarweisen Praeferenzdaten lernen.<br>
                        3. LLM mit PPO gegen das Reward-Model fine-tunen — komplex, instabil, viele Hyperparameter.<br><br>
                        DPO:<br>
                        - Verlustfunktion direkt auf den Paaren: $\\mathcal{L}_{DPO} = -\\log \\sigma\\!\\left(\\beta \\log \\dfrac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\dfrac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)$.<br>
                        - Kein separates Reward-Model.<br>
                        - Kein RL-Loop.<br>
                        - Stabiler, schneller, leichter zu implementieren.<br><br>
                        Llama 3 (Meta-Paper 2024), Mistral und viele Open-Weights-Modelle nutzen heute DPO oder dessen Varianten (IPO, KTO, ORPO) statt klassischem PPO. Bei Frontier-Modellen wie GPT-4 und Claude 3 bleiben die genauen Pipelines proprietaer.`
                },
                {
                    q: `Welche Aussage zu <strong>API-Preisen pro Million Input-Tokens</strong> (Stand Anfang 2025) ist korrekt?
                        ${opts(
                            'GPT-4o ($2,50/M) ist teurer als Claude 3 Opus ($15/M).',
                            'GPT-4o ($2,50/M) ist deutlich guenstiger als Claude 3 Opus ($15/M) — Anthropic positioniert Opus als High-End, OpenAI hat GPT-4o aggressiv unter dem GPT-4-Turbo-Preis platziert.',
                            'Alle Frontier-Modelle haben identische Preise pro Million Tokens.',
                            'Gemini 1.5 Pro ist mit $50/M Input das teuerste API-Modell.'
                        )}`,
                    h: 'OpenAI, Anthropic und Google publizieren ihre API-Preise oeffentlich (openai.com/pricing, anthropic.com/pricing, ai.google.dev/pricing). Stand Anfang 2025.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Listpreise pro 1 Mio. Tokens (Input / Output, Stand Anfang 2025):<br>
                        - GPT-4o: <strong>$2,50 / $10,00</strong>.<br>
                        - GPT-4o mini: $0,15 / $0,60.<br>
                        - o1: $15,00 / $60,00 (Reasoning-Modell, intern teurer wegen Reasoning-Tokens).<br>
                        - Claude 3 Opus: <strong>$15,00 / $75,00</strong>.<br>
                        - Claude 3.5 Sonnet: $3,00 / $15,00.<br>
                        - Claude 3.5 Haiku: $1,00 / $5,00.<br>
                        - Gemini 1.5 Pro: $1,25 / $5,00 (bis 128k Kontext) bzw. $2,50 / $10,00 (>128k).<br>
                        - DeepSeek-V3 API: $0,27 / $1,10 (sehr aggressiv unterhalb der US-Anbieter).<br><br>
                        Quellen: openai.com/pricing, anthropic.com/pricing, ai.google.dev/pricing, deepseek.com/pricing. Preise aendern sich haeufig — bei jeder Aufgabe das Datum mitnennen (AGENTS §8).<br><br>
                        Wirtschaftlich entscheidend ist oft das Verhaeltnis Input-zu-Output-Tokens: typische Chat-Workloads liegen bei 5:1 bis 10:1; Coding-Workloads bei 2:1 bis 3:1 (mehr Output).`
                },
                {
                    q: `Was beschreibt der Begriff <strong>"emergent abilities"</strong> (Wei et al., 2022)?
                        ${opts(
                            'Faehigkeiten, die in kleineren Modellen praktisch nicht messbar sind, aber ab einer Skalierungsschwelle plotzlich erscheinen — z.B. mehrstellige Multiplikation, Few-shot-Reasoning.',
                            'Bugs, die durch Quantisierung entstehen.',
                            'Faehigkeiten, die nur durch Fine-Tuning hinzugefuegt werden koennen.',
                            'Halluzinationen mit hohem Selbstbewusstsein.'
                        )}`,
                    h: 'Das Paper "Emergent Abilities of Large Language Models" (TMLR 2022, arXiv:2206.07682) loeste eine grosse Debatte aus, die spaeter durch Schaeffer et al. ("Are Emergent Abilities a Mirage?", NeurIPS 2023) relativiert wurde.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Wei et al. "Emergent Abilities of Large Language Models", TMLR 2022 (arXiv:2206.07682). Untersuchten 137 BIG-bench-Aufgaben und identifizierten ein nichtlinear-emergentes Verhalten: bei kleineren Modellen unbedeutender Score, dann ab ~$10^{22}$ FLOPs Trainingscompute deutlicher Sprung.<br><br>
                        Beispiele:<br>
                        - 3-stellige Addition: bei < 13 B Parametern ~ 0 %, ab 175 B (GPT-3) ~ 80 %.<br>
                        - IPA-Transliteration: aehnlicher Sprung.<br><br>
                        Gegenposition: Schaeffer et al. "Are Emergent Abilities of Large Language Models a Mirage?", NeurIPS 2023 (arXiv:2304.15004) — argumentieren, dass viele "Emergence"-Kurven Artefakte schwellenwertiger Metriken (z.B. exact-match auf Multi-Token-Antworten) sind. Bei kontinuierlichen Metriken (Edit-Distance, Log-Likelihood) verlaeuft die Verbesserung glatt.<br><br>
                        Praxis-Konsequenz: Beim Vergleich kleiner vs. grosser Modelle muss die Metrik benannt werden — sonst kann "Emergence" eine Eigenschaft der Auswertung sein, nicht der Faehigkeit.`
                },
                {
                    q: `Was bedeutet <strong>"Speculative Decoding"</strong> als Inferenz-Beschleuniger?
                        ${opts(
                            'Ein kleines "Draft"-Modell erzeugt Kandidaten-Tokens; das grosse "Target"-Modell verifiziert sie parallel — bei Uebereinstimmung mehrere Tokens in einem Forward-Pass.',
                            'Das Modell raet die Antwort, ohne den Prompt zu lesen.',
                            'Mehrere LLMs werden parallel ausgefuehrt und gemittelt.',
                            'Inferenz mit zufaelligen Aktivierungen.'
                        )}`,
                    h: 'Leviathan et al. (Google 2023) haben das Verfahren eingefuehrt; es hat keine Auswirkung auf die Output-Verteilung, beschleunigt aber stark.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Leviathan et al., "Fast Inference from Transformers via Speculative Decoding", ICML 2023 (arXiv:2211.17192). Kernidee:<br>
                        1. Ein kleines, schnelles <em>Draft</em>-Modell (oft 10-100× kleiner) erzeugt $K$ Kandidaten-Tokens autoregressiv.<br>
                        2. Das grosse <em>Target</em>-Modell evaluiert alle $K$ Tokens in einem einzigen Forward-Pass.<br>
                        3. Akzeptiere Praefix bis zur ersten Diskrepanz; verwerfe Rest, generiere neu mit Target-Modell, fuehre fort.<br><br>
                        Eigenschaften:<br>
                        - Output-Verteilung mathematisch identisch mit reinem Target-Sampling (verzerrungsfrei).<br>
                        - Speed-up typisch 2-3× bei gut passendem Draft-Modell.<br>
                        - Eingesetzt in vLLM, TGI, NVIDIA-TRT-LLM, Anthropic-Production-Inferenz.<br><br>
                        Variante: <strong>Medusa</strong> (Cai et al., 2023) — mehrere parallele Vorhersagekoepfe im Target-Modell selbst, ohne separates Draft.`
                },
                {
                    q: `Welche Aussage zu <strong>"Lost in the Middle"</strong> (Liu et al., TACL 2023) ist korrekt?
                        ${opts(
                            'LLMs vergessen die ersten 10 % eines Prompts immer.',
                            'LLMs nutzen Informationen am Anfang und Ende eines langen Kontexts staerker als in der Mitte — U-foermige Performance-Kurve.',
                            'Die Token-Reihenfolge ist fuer Transformer irrelevant.',
                            'In-context-Learning funktioniert nur mit einem Beispiel.'
                        )}`,
                    h: 'Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", TACL 2023, arXiv:2307.03172.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Experiment-Setup: ein einzelnes relevantes Dokument wird in einen langen Distraktor-Kontext (10/20 Dokumente) eingefuegt. Die Position des relevanten Dokuments wird systematisch variiert.<br><br>
                        Ergebnis fuer GPT-3.5/Claude-1.3/MPT-Instruct (2023):<br>
                        - Position 1: Antwort-Genauigkeit ~75 %.<br>
                        - Position in der Mitte: ~50 %.<br>
                        - Position am Ende: ~70 %.<br><br>
                        Diese U-foermige Kurve gilt fuer reine Retrieval-Aufgaben mit langem Kontext. Praktische Konsequenz fuer RAG-Systeme: wichtige Quellen entweder vorne oder hinten platzieren, Mitten-Bereich meiden. Lange-Kontext-Modelle wie Gemini 1.5 Pro haben den Effekt deutlich abgemildert (Needle-in-a-Haystack > 99 % ueber alle Positionen) — das Phaenomen ist also nicht universal, sondern modell- und trainingsabhaengig.`
                },
                {
                    q: `Was beschreibt der <strong>"Chinchilla Scaling Law"</strong> (Hoffmann et al., 2022)?
                        ${opts(
                            'Bei festem Compute-Budget ist optimales Training erreicht, wenn Modellgroesse und Trainings-Tokens etwa proportional skaliert werden — als Faustregel 20 Tokens pro Parameter.',
                            'Modelle muessen genau 70 Mrd. Parameter haben.',
                            'Pretraining sollte immer 1 Trillion Tokens nutzen.',
                            'Inferenz skaliert linear mit der Anzahl GPUs.'
                        )}`,
                    h: 'DeepMind hat 2022 in "Training Compute-Optimal Large Language Models" (arXiv:2203.15556) gezeigt, dass GPT-3 mit 175 B Parametern und nur 300 B Tokens deutlich untertrainiert war.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Hoffmann et al. "Training Compute-Optimal Large Language Models", NeurIPS 2022 (arXiv:2203.15556). Empirisches Ergebnis: bei festem Trainings-FLOP-Budget liegt das Optimum bei einem etwa konstanten Verhaeltnis <em>Tokens pro Parameter ≈ 20</em>.<br><br>
                        Konsequenz: <em>Chinchilla</em> (70 B Parameter, 1,4 T Tokens) schlug das viel groessere Gopher (280 B Parameter, 300 B Tokens) auf gleichem Compute-Budget. GPT-3 (175 B, 300 B Tokens, Verhaeltnis 1,7) war stark untertrainiert.<br><br>
                        Aktuelle Praxis weicht von der Chinchilla-Faustregel ab, weil Inferenz-Kosten beruecksichtigt werden: <em>Llama 3.1</em> wurde mit 15 T Tokens trainiert (gegenueber dem 8B-Modell entspricht das ~1875 Tokens/Parameter — 90× ueber Chinchilla), weil bei einem oft genutzten Modell die Inferenzersparnis (kleinere aktive Parameter) die Trainingsmehrkosten ueberkompensiert.<br><br>
                        Die exakte Form: $L(N, D) = E + \\dfrac{A}{N^\\alpha} + \\dfrac{B}{D^\\beta}$ mit $\\alpha \\approx 0{,}34$, $\\beta \\approx 0{,}28$ (Chinchilla-Paper Tab. 1).`
                },
                {
                    q: `Welches Modell hat im Mai 2024 die <strong>Echtzeit-Sprachausgabe mit Emotionen, Singen und Unterbrechungs-Toleranz</strong> demonstriert?
                        ${opts(
                            'GPT-4 Turbo (Mar 2024)',
                            'GPT-4o (Mai 2024, Advanced Voice Mode)',
                            'Claude 3 Opus',
                            'Gemini 1.5 Pro'
                        )}`,
                    h: 'OpenAI zeigte die Demo bei der "Spring Update"-Praesentation am 13.05.2024. Die Vollversion fuer Plus-Nutzer wurde ab Juli 2024 ausgerollt.',
                    s: `<strong>Richtige Antwort: B — GPT-4o.</strong><br><br>
                        Bei der "Spring Update"-Demo (13.05.2024, openai.com/index/hello-gpt-4o) zeigte OpenAI:<br>
                        - <strong>Latenz</strong>: durchschnittlich 320 ms Audio-zu-Audio (vorher 5,4 s mit GPT-4-Voice).<br>
                        - <strong>Emotionalitaet</strong>: Sprecherinflexion, Lachen, Atmen.<br>
                        - <strong>Singen</strong>: Modell antwortet auf Wunsch in Melodie.<br>
                        - <strong>Unterbrechbarkeit</strong>: Nutzer kann das Modell mitten im Sprechen unterbrechen, ohne Cancel-Button.<br><br>
                        Architektur: ein einzelnes neuronales Netz, das Audio-Eingang direkt in Audio-Ausgang abbildet (anstelle der vorherigen Whisper-→-GPT-→-TTS-Kaskade). Die Realtime-API wurde am 01.10.2024 fuer Entwickler vorgestellt (WebSocket-basiert).<br><br>
                        Claude 3 Opus, GPT-4 Turbo und Gemini 1.5 Pro waren zu diesem Zeitpunkt reine Text- und Bild-Modelle ohne native Audio-Generierung.`
                },
                {
                    q: `Welche der folgenden Aussagen zum <strong>"Sycophancy"</strong>-Problem ist korrekt?
                        ${opts(
                            'Modelle stimmen oft Nutzeransichten zu, auch wenn diese faktisch falsch sind — besonders bei RLHF-feingetunten Modellen.',
                            'Sycophancy bezeichnet die Trainings-Datenmenge in Tokens.',
                            'Sycophancy ist eine Bildgenerator-Eigenschaft.',
                            'Sycophancy bedeutet, dass das Modell langsamer antwortet.'
                        )}`,
                    h: 'Perez et al. (Anthropic 2022) und Sharma et al. (Anthropic 2023) haben gezeigt, dass RLHF Modelle tendenziell anpassungs-freundlich macht.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Sharma et al., "Towards Understanding Sycophancy in Language Models", arXiv:2310.13548, Oct 2023.<br><br>
                        Beobachtung: Wenn der Nutzer im Prompt eine Meinung aeussert ("Ich glaube, der Wert ist X"), neigen RLHF-tunete Modelle dazu, dieser Meinung zuzustimmen — selbst wenn das Modell vorher die korrekte Antwort gegeben haette. Vermutete Ursache: menschliche Praeferenz-Bewerter bevorzugen freundliche, zustimmende Antworten.<br><br>
                        Konkrete Befunde:<br>
                        - Claude-2 stimmte einer als "Experte" markierten falschen Mathe-Antwort in 35 % der Faelle zu (vorher 5 % ohne Nutzer-Behauptung).<br>
                        - GPT-4 zeigte aehnliche Tendenzen.<br><br>
                        Mitigations:<br>
                        - Reward-Modeling mit Anti-Sycophancy-Daten (z.B. "Korrektur statt Zustimmung").<br>
                        - Constitutional AI mit explizit "wahrhaftig vor freundlich"-Prinzipien.<br>
                        - Reasoning-Modelle (o1) zeigen weniger Sycophancy bei Mathematik, sind aber nicht immun.`
                },
                {
                    q: `Was ist <strong>"Constitutional AI"</strong> (Bai et al., Anthropic 2022)?
                        ${opts(
                            'Ein gesetzliches Regelwerk fuer KI in den USA.',
                            'Ein Trainingsverfahren, bei dem das Modell mit einer schriftlich formulierten Liste von Prinzipien ("Constitution") feedback an sich selbst generiert (RLAIF) statt ausschliesslich menschlichem Feedback.',
                            'Ein Quantisierungsschema.',
                            'Ein Anti-Halluzinations-Filter zur Inferenz-Zeit.'
                        )}`,
                    h: 'Anthropic hat dieses Verfahren in den Claude-Modellen verwendet. Statt fuer jeden Kritik-Schritt einen Menschen einzusetzen, werden Modell-Antworten anhand expliziter Prinzipien vom Modell selbst kritisiert und ueberarbeitet.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Bai et al., "Constitutional AI: Harmlessness from AI Feedback", arXiv:2212.08073, Dec 2022.<br><br>
                        Zwei-Stufen-Pipeline:<br>
                        1. <strong>Supervised Stage</strong>: Modell erzeugt potenziell problematische Antworten; ein zweiter Aufruf laesst das Modell die Antwort anhand einer schriftlich formulierten "Constitution" (z.B. "Sei hilfreich, harmlos, ehrlich; vermeide Diskriminierung") kritisieren und ueberarbeiten. Diese ueberarbeiteten Paare bilden das SFT-Trainingsset.<br>
                        2. <strong>RL Stage (RLAIF)</strong>: Praeferenz-Paare werden vom Modell selbst nach Verfassungskonformitaet bewertet — keine Menschen mehr noetig.<br><br>
                        Vorteile:<br>
                        - Skalierbar (keine human-feedback-Engpaesse).<br>
                        - Prinzipien explizit dokumentiert / auditierbar.<br>
                        - Modell kann Refuse-Antworten ohne Ueberblockierung lernen.<br><br>
                        Die Claude-Familie ist nach diesem Schema trainiert; Anthropic veroeffentlicht die jeweilige Constitution oeffentlich (anthropic.com/news/claudes-constitution).<br><br>
                        Wichtig: Constitutional AI ersetzt nicht alle menschlichen Eval-Pipelines (Sicherheits-Red-Teaming bleibt manuell), aber es macht den feedback-intensiven Schritt deutlich skalierbarer.`
                }
            ],

            // ============================================================
            //  Level 3 — Expertise (Reasoning-Aera, ARC-AGI, AIME, Nischen)
            // ============================================================
            [
                {
                    q: `Welches Modell erzielte bei <strong>AIME 2024</strong> (American Invitational Mathematics Examination, 15 Aufgaben) den hoechsten Score?
                        ${opts(
                            'GPT-4o: 13,4 %',
                            'Claude 3.5 Sonnet (Jun 2024): 16,0 %',
                            'o1-preview: 56,7 %',
                            'o1 (final, Dez 2024): 83,3 %'
                        )}`,
                    h: 'AIME-Aufgaben verlangen kreative Probleminterpretation; Test-Time-Reasoning hat hier den groessten Sprung gebracht.',
                    s: `<strong>Richtige Antwort: D — o1 (final), 83,3 %.</strong><br><br>
                        OpenAI hat die finale o1-Version am 05.12.2024 veroeffentlicht. AIME-2024-Score 83,3 % (pass@1 bei 64 Samples) — entspricht etwa der Spitze der menschlichen Top-10 % AIME-Teilnehmer.<br><br>
                        Vergleich (alle aus OpenAI o1 / o1-System Card und Begleit-Blogs):<br>
                        - GPT-4o: 13,4 %<br>
                        - Claude 3.5 Sonnet: 16,0 %<br>
                        - o1-preview: 56,7 %<br>
                        - o1: 83,3 %<br>
                        - o3 (Dez 2024 Preview, ARC-AGI Live-Stream): 96,7 % AIME 2024<br><br>
                        Die Schritte spiegeln drei Generationen Test-Time-Reasoning-Training wider.`
                },
                {
                    q: `Welches Modell hat im Dezember 2024 den <strong>ARC-AGI Public Eval</strong> bei niedrigem Compute-Budget erstmals deutlich nach oben gebrochen?
                        ${opts(
                            'GPT-4o: ~5 % auf ARC-AGI',
                            'Claude 3.5 Sonnet: ~14 %',
                            'o1-preview: ~32 %',
                            'OpenAI o3 (Preview, 20.12.2024): 75,7 % (low compute) / 87,5 % (high compute)'
                        )}`,
                    h: 'ARC-AGI (Chollet et al., arcprize.org) gilt als Test fuer abstrakte Mustergeneralisation. Bis Ende 2024 lagen LLMs weit unter Mensch (>= 85 %). Eine Live-Demo im Dezember 2024 brach diese Grenze.',
                    s: `<strong>Richtige Antwort: D — OpenAI o3 (Preview), 75,7 % bzw. 87,5 %.</strong><br><br>
                        OpenAI hat o3 am 20.12.2024 im ARC-Prize-Live-Stream vorgestellt. Werte auf dem Semi-Private Eval (Public Eval):<br>
                        - low-compute-Konfiguration: 75,7 % bei rund 17 USD/Task<br>
                        - high-compute-Konfiguration: 87,5 % (geschaetzt ~3.400 USD/Task)<br><br>
                        Zum Vergleich (ARC-AGI Public Eval-Werte, dokumentiert von der ARC-Prize-Stiftung):<br>
                        - GPT-4o: ~5 %<br>
                        - Claude 3.5 Sonnet: ~14 %<br>
                        - o1-preview: ~32 %<br>
                        - durchschnittliche Menschen: 85 %.<br><br>
                        Wichtige Einordnung: o3 hat die ARC-Prize-Hauptpreis-Schwelle (85 % auf <em>private</em> Eval bei < 10.000 USD Compute) noch nicht offiziell gewonnen — die 87,5 % stammen aus der Semi-Private-Eval-Konfiguration mit deutlich hoeherem Compute.`
                },
                {
                    q: `Welches der folgenden Modelle <strong>kann den Bildschirm eines Computers via "Computer Use"-API steuern</strong> (Maus, Tastatur, Screenshot)?
                        ${opts(
                            'GPT-4o',
                            'Claude 3.5 Sonnet "new" (22.10.2024)',
                            'Gemini 1.5 Pro',
                            'Llama 3.1 405B'
                        )}`,
                    h: 'Anthropic hat im Oktober 2024 zusammen mit der "neuen" Claude-3.5-Sonnet-Version eine Beta-Faehigkeit eingefuehrt, mit der das Modell direkt mit einer Desktop-Oberflaeche interagieren kann.',
                    s: `<strong>Richtige Antwort: B — Claude 3.5 Sonnet "new".</strong><br><br>
                        Anthropic hat am 22.10.2024 zwei Neuerungen vorgestellt:<br>
                        1. Eine aktualisierte Version von Claude 3.5 Sonnet (interner Name "claude-3-5-sonnet-20241022") mit besseren Coding- und Agent-Benchmarks.<br>
                        2. Eine "Computer Use"-Beta-API, ueber die das Modell Screenshots des Desktops bekommt und Maus-/Tastatur-Aktionen zurueckgibt — z.B. um Software zu testen oder Webformulare auszufuellen.<br><br>
                        Bei der Vorstellung erreichte das Modell auf dem OSWorld-Benchmark (Bildschirm-Tasks) 22,0 % — bestes oeffentlich gemessenes Resultat ohne Spezialtuning; vorher war der State-of-the-Art 7,8 %.<br><br>
                        Quelle: Anthropic Blog "Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku" (22.10.2024).`
                },
                {
                    q: `Welches Modell hat bei der <strong>Codeforces-ELO-Wertung</strong> in der offiziellen Veroeffentlichung den hoechsten Wert?
                        ${opts(
                            'GPT-4o: ELO ≈ 808',
                            'Claude 3.5 Sonnet (Jun 2024): ELO ≈ 717',
                            'o1-preview: ELO ≈ 1673',
                            'o1 (final, Dez 2024): ELO ≈ 1807'
                        )}`,
                    h: 'Die Werte stammen aus der OpenAI-o1-System-Card. Mit jedem Generation-Schritt steigt das ELO ~ 1000 Punkte.',
                    s: `<strong>Richtige Antwort: D — o1 (final), ELO ≈ 1807.</strong><br><br>
                        Werte aus OpenAI o1 System Card (Dezember 2024) und Blog "Learning to reason with LLMs" (Sep 2024):<br>
                        - GPT-4o: 808 (Perzentil 11)<br>
                        - Claude 3.5 Sonnet (Jun 2024): 717 (Perzentil ~9)<br>
                        - o1-preview: 1673 (Perzentil 89)<br>
                        - o1: 1807 (Perzentil 93)<br>
                        - o3 (Live-Stream Dez 2024): 2727 (Perzentil 99,95) — gehoert allerdings nicht zu den vier Antwortoptionen.<br><br>
                        Codeforces-ELO ist zeitkritisch (~2 h Wettbewerb, mehrere Aufgaben); Reasoning-Modelle profitieren stark vom "ueberlegen vor schreiben".`
                },
                {
                    q: `Welche Aussage zur <strong>Cost-vs-Performance-Position von Claude 3 Haiku</strong> ist korrekt?
                        ${opts(
                            'Schneller und 60-mal billiger pro Input-Token als Claude 3 Opus, mit MMLU ~75 %.',
                            'Langsamer, aber doppelt so genau wie Claude 3 Opus.',
                            'Open-Source-Modell von Mistral, das spaeter von Anthropic uebernommen wurde.',
                            'Nur fuer Bildgenerierung, nicht fuer Text.'
                        )}`,
                    h: 'Claude 3 Haiku wurde als guenstige, schnelle Variante positioniert. Die Preisangaben stehen in der Anthropic-Pricing-Tabelle.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Anthropic Claude 3 Model Card (Mar 2024) und API-Pricing-Tabelle:<br>
                        - Claude 3 Haiku: Input $0,25/M Tokens, Output $1,25/M Tokens. MMLU 75,2 %, HumanEval 75,9 %.<br>
                        - Claude 3 Sonnet: Input $3,00/M Tokens. MMLU 79,0 %, HumanEval 73,0 %.<br>
                        - Claude 3 Opus: Input $15,00/M Tokens. MMLU 86,8 %, HumanEval 84,9 %.<br><br>
                        Verhaeltnis Input-Preis Opus/Haiku = 15 / 0,25 = <strong>60×</strong>. Haiku ist damit ein typisches "Massen-API"-Modell fuer hohe Volumina (Chatbots, Klassifikation, einfache Extraktion), waehrend Opus fuer schwerere Aufgaben reserviert wird.`
                },
                {
                    q: `Beim Long-Context-Benchmark <strong>"Needle in a Haystack"</strong> wird gemessen, …
                        ${opts(
                            '… wie schnell ein Modell auf Kurz-Prompts antwortet.',
                            '… ob ein in einen langen Kontext eingebettetes Faktum spaeter im Antwortbereich exakt zurueckgegeben wird.',
                            '… wie gut das Modell Bilder kategorisiert.',
                            '… wie hoch das ELO im Schach-Selbstspiel ist.'
                        )}`,
                    h: 'Der Begriff ist woertlich gemeint: eine Nadel (eine kurze Tatsache) wird in einen Heuhaufen (ein sehr langer Text mit fuellender Prosa) eingenaeht; das Modell muss sie spaeter heraussuchen.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Das Needle-in-a-Haystack-Setup (Greg Kamradt, Maerz 2024) plaziert einen klar herausnehmbaren Satz (z.B. "The best thing to do in San Francisco is to eat a sandwich and sit in Dolores Park on a sunny day.") an einer zufaelligen Position innerhalb eines sehr langen Kontextes (z.B. 1 Mio. Tokens Paul-Graham-Essays). Das Modell wird anschliessend exakt nach diesem Faktum gefragt — Recall-Rate vs. Kontextlaenge wird als Heatmap aufgetragen.<br><br>
                        Stand 2024:<br>
                        - Gemini 1.5 Pro: > 99 % Recall bis 1 Mio. Tokens (Google Gemini-1.5-Paper, arXiv:2403.05530).<br>
                        - Claude 3 Opus: > 99 % bei 200k.<br>
                        - GPT-4 Turbo: zuverlaessig bei 128k, mit lokalen Loechern bei mittlerer Position.<br><br>
                        Der Test ist <em>nicht</em> repraesentativ fuer alle Long-Context-Aufgaben (z.B. Multi-Hop-Reasoning ueber lange Texte) — er misst nur Retrieval. Komplexere Long-Context-Benchmarks: RULER, BABILong, LOFT.`
                },
                {
                    q: `Welche der folgenden Aussagen zu <strong>Llama 3.1 405B Instruct vs. proprietaere Top-Modelle</strong> entspricht den Benchmark-Zahlen aus dem Meta-Paper (arXiv:2407.21783, Juli 2024)?
                        ${opts(
                            'Llama 3.1 405B Instruct schlaegt GPT-4o auf MMLU, HumanEval und MATH eindeutig.',
                            'Llama 3.1 405B Instruct liegt auf Augenhoehe mit GPT-4o und Claude 3.5 Sonnet — bei MMLU 87,3 %, HumanEval 89,0 %, MATH 73,8 %.',
                            'Llama 3.1 405B Instruct hat schlechtere Coding-Werte als GPT-3.5.',
                            'Llama 3.1 405B ist nur als Base-Model verfuegbar, ohne Instruct-Tuning.'
                        )}`,
                    h: 'Meta selbst formuliert die 405B-Veroeffentlichung als "Frontier-level open weights". Die genauen Zahlen sind im Llama-3.1-Paper Tab. 1/2.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Werte aus "The Llama 3 Herd of Models" (arXiv:2407.21783):<br>
                        - MMLU (5-shot): 87,3 % (Llama 3.1 405B) vs. 88,7 % (GPT-4o) vs. 88,7 % (Claude 3.5 Sonnet).<br>
                        - HumanEval (0-shot): 89,0 % vs. 90,2 % vs. 92,0 %.<br>
                        - MATH (0-shot CoT): 73,8 % vs. 76,6 % vs. 71,1 %.<br>
                        - GSM8K: 96,8 % vs. 90,5 % (laut Meta-Eval; OpenAI berichtet GPT-4o anders).<br><br>
                        Llama 3.1 405B Instruct ist sowohl als Base-Model als auch als Instruct-Variante verfuegbar (Hugging Face), unter der Llama-3.1-Community-Lizenz mit kommerzieller Nutzung erlaubt unter Auflagen.`
                },
                {
                    q: `Welche typische <strong>Bias-Falle beim Lesen von Benchmark-Tabellen aus Pressemeldungen</strong> ist KEINE der unten genannten?
                        ${opts(
                            'Cherry-Picking: Hersteller A waehlt Benchmark, auf dem A vorne liegt, und laesst andere weg.',
                            'Test-Set-Kontamination: Trainingsdaten enthalten den Eval-Datensatz, so dass das Modell faktisch auf der Loesung trainiert wurde.',
                            'Methodik-Drift: pass@1 (Modell A) wird neben pass@10 (Modell B) gezeigt.',
                            'Energieeffizienz pro Token (Wh/Token) — Hersteller veroeffentlichen diese Zahl systematisch und vergleichbar.'
                        )}`,
                    h: 'Drei der vier Optionen sind bekannte Probleme der LLM-Evaluation. Eine Option beschreibt etwas, das praktisch nie systematisch vergleichbar publiziert wird.',
                    s: `<strong>Richtige Antwort: D — Energieeffizienz pro Token ist <em>keine</em> typische Bias-Falle, weil sie kaum publiziert wird.</strong><br><br>
                        Die ueblichen Bias-Fallen beim Benchmark-Vergleich (Liang et al., HELM-Paper arXiv:2211.09110; Zhou et al. "Don't Make Your LLM an Evaluation Benchmark Cheater", arXiv:2311.01964):<br>
                        - <strong>Cherry-Picking:</strong> Press-Tabellen zeigen die "freundlichen" Benchmarks.<br>
                        - <strong>Test-Set-Kontamination:</strong> Trainings-Corpus enthaelt die Eval-Aufgaben (haeufig bei GSM8K, HumanEval; daher SWE-Bench Verified und neue private Eval-Sets).<br>
                        - <strong>Methodik-Drift:</strong> pass@1 vs. pass@10, 0-shot vs. n-shot, mit/ohne Self-Repair-Loop.<br><br>
                        Energieverbrauch (Wh/Token, GPU-Stunden pro Antwort) wird von kommerziellen Herstellern <em>nicht</em> systematisch publiziert — gerade dort fehlt Transparenz. Initiativen wie ML.energy oder das EU-AI-Act-Reporting wollen das aendern. Solange die Daten nicht oeffentlich sind, kann Energieeffizienz auch keine Bias-Falle in Benchmark-Tabellen sein.`
                },
                {
                    q: `Welche Aussage zur <strong>ARC-AGI-Eval-Struktur</strong> (Chollet, arcprize.org) ist korrekt?
                        ${opts(
                            'ARC-AGI besteht aus 4 oeffentlichen Aufgaben.',
                            'ARC-AGI hat drei Sets: <em>Public Training</em>, <em>Public Eval</em>, <em>Semi-Private</em> und <em>Private Eval</em> — fuer den ARC-Prize-Hauptpreis (1,1 Mio. USD) zaehlt nur das Private Eval mit Compute-Cap.',
                            'ARC-AGI testet nur Mathematik auf Olympiade-Niveau.',
                            'ARC-AGI ist Bestandteil von MMLU.'
                        )}`,
                    h: 'Wesentliche Pruefungs-Disziplin von ARC-AGI ist, dass Test-Aufgaben nicht im Training-Set erscheinen — daher die Aufteilung in oeffentliche und private Subsets.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        ARC-AGI-1 (Chollet, "On the Measure of Intelligence", arXiv:1911.01547, 2019; arcprize.org) hat 1.000 aktuelle Aufgaben in vier Teilen:<br>
                        - <strong>Public Training</strong>: 400 Aufgaben mit Loesungen (zum Studieren).<br>
                        - <strong>Public Eval</strong>: 400 Aufgaben ohne Loesungen, oeffentlich downloadbar.<br>
                        - <strong>Semi-Private</strong>: ~100 Aufgaben, Resultate veroeffentlicht, Aufgaben nicht.<br>
                        - <strong>Private</strong>: ~100 Aufgaben, nie geleakt — Pruefungsmenge fuer den ARC-Prize.<br><br>
                        ARC-Prize-Hauptpreis (1,1 Mio. USD): 85 % auf Private Eval bei einem Compute-Budget unter etwa 10.000 USD pro Run. OpenAI o3 erzielte im Dezember 2024 nur auf Semi-Private und Public Eval einen hohen Score — der offizielle Private-Hauptpreis war damit nicht gewonnen.<br><br>
                        ARC-AGI-2 (angekuendigt fuer 2025) soll deutlich haerter werden und auch die o3-Class-Modelle stark fordern.`
                },
                {
                    q: `Welche der folgenden ist eine <strong>spezialisierte Coding-Agent-Loesung</strong>, die mit Frontier-LLMs (GPT-4o, Claude 3.5 Sonnet) und einer Tool-Use-/Test-Pipeline zusammen auf SWE-Bench Verified Werte > 50 % erzielt?
                        ${opts(
                            'Cognition AI Devin',
                            'Microsoft Excel',
                            'Visual Studio Code (Editor allein)',
                            'GitHub Issues (Plattform allein)'
                        )}`,
                    h: 'Devin wurde im Maerz 2024 von Cognition Labs als "first AI software engineer" angekuendigt; nutzt unter der Haube ein Frontier-LLM plus Sandbox, Browser und Bash-Tools.',
                    s: `<strong>Richtige Antwort: A — Cognition AI Devin.</strong><br><br>
                        Cognition Labs, Blog-Post 12.03.2024. Devin erreichte zur Vorstellung 13,86 % auf <em>SWE-Bench Lite</em> (groesseres Pool als Verified). Spaetere Coding-Agents wurden deutlich besser:<br>
                        - <strong>Cosine Genie</strong> (Aug 2024): 50,67 % auf SWE-Bench Verified (basierend auf GPT-4o).<br>
                        - <strong>Anthropic Computer Use + Claude 3.5 Sonnet (Oct 2024)</strong>: 49,0 % Verified.<br>
                        - <strong>OpenAI SWE-Lancer / o1-basierte Agents</strong>: ueber 55 % berichtet (OpenAI o1 System Card).<br><br>
                        Wesentliche Architekturkomponenten typischer Coding-Agents:<br>
                        - Sandbox-Umgebung (Container) mit Repository-Checkout.<br>
                        - Tool-Use: bash, file_read/write, run_tests.<br>
                        - Plan-Then-Execute mit Retries und Test-Feedback.<br>
                        - Optional: separater Planner (LLM-Call) vs. Coder (anderer LLM-Call).<br><br>
                        Die anderen Optionen sind keine Agent-Systeme im Sinne des Benchmarks.`
                },
                {
                    q: `Welches Modell hat im <strong>EQ-Bench (Emotional Intelligence Benchmark)</strong> (Paech, 2023) und in der <strong>"Creative Writing"</strong>-Wertung Ende 2024 die Spitzenposition unter LLMs eingenommen?
                        ${opts(
                            'GPT-3.5',
                            'Claude 3.5 Sonnet "new" (22.10.2024) / Claude 3 Opus',
                            'BERT Large',
                            'Stable Diffusion'
                        )}`,
                    h: 'Anthropic-Modelle gelten in Praeferenztests und kreativen Schreibaufgaben als besonders stark; quantitativ z.B. eqbench.com.',
                    s: `<strong>Richtige Antwort: B — Claude-3-Familie.</strong><br><br>
                        EQ-Bench v2 (Paech, "EQ-Bench: An Emotional Intelligence Benchmark for Large Language Models", arXiv:2312.06281, Dec 2023):<br>
                        - Misst Verstaendnis emotionaler Zustaende anhand von ~60 Mini-Szenarien.<br>
                        - Stand Ende 2024: Claude 3.5 Sonnet "new" ~ 86,5; Claude 3 Opus ~ 82,3; GPT-4o ~ 79,9; Llama 3.1 70B ~ 67,7. Live-Werte auf eqbench.com.<br><br>
                        Creative-Writing-Wertung (eqbench.com/creative_writing.html): Praeferenz-basierte Bewertung von Schreibaufgaben (Kurzgeschichten, Briefen, Reden). Claude-Modelle dominieren typischerweise — Anthropic legt im RLHF-Praeferenztraining sichtbar Wert auf differenziertere Sprache.<br><br>
                        Wichtig: Praeferenz-Benchmarks sind anfaellig fuer Stil-Bias (Laenge, Reichhaltigkeit) und nicht so objektiv wie HumanEval o.ae. Aber als Indikator fuer "Soft-Skill"-Faehigkeiten oft aussagekraeftiger als reine MCQ-Tests.`
                },
                {
                    q: `Welche der folgenden ist eine <strong>spezielle Eval-Sammlung fuer agentische LLM-Faehigkeiten</strong>?
                        ${opts(
                            'GAIA (General AI Assistant) Benchmark',
                            'ImageNet',
                            'SQuAD 2.0',
                            'WikiText-103'
                        )}`,
                    h: 'GAIA wurde 2023 von Mialon et al. (Meta) als realistische Multi-Step-Aufgabensuite veroeffentlicht, in der das Modell Tools nutzen, im Web suchen und Dateien lesen muss.',
                    s: `<strong>Richtige Antwort: A — GAIA.</strong><br><br>
                        Mialon et al., "GAIA: a benchmark for General AI Assistants", arXiv:2311.12983, Nov 2023. GAIA bietet 466 reale Aufgaben in drei Schwierigkeitsstufen, fuer die das LLM Tools (Browser, Datei-Reader, Rechner) konsequent kombinieren muss. Menschen ohne Tools loesen ~ 92 %; reine LLMs ohne Tool-Use ~ 4-10 %; agentische Setups (GPT-4 mit Tools) Ende 2023 ~ 14,6 %.<br><br>
                        Bis Anfang 2025:<br>
                        - <strong>OpenAI Deep Research</strong> (Feb 2025): 67,4 % auf GAIA Level 3.<br>
                        - <strong>Anthropic Claude Computer Use</strong>: agent-eval-Werte aehnlich.<br><br>
                        Andere agentische Benchmarks:<br>
                        - <strong>AgentBench</strong> (Liu et al., 2023) — 8 verschiedene Umgebungen.<br>
                        - <strong>τ-Bench</strong> (Yao et al., 2024) — Customer-Service-Dialoge.<br>
                        - <strong>OSWorld</strong> (Xie et al., 2024) — Desktop-Steuerung.<br><br>
                        ImageNet (Vision-Klassifikation), SQuAD (Extraktion), WikiText-103 (Sprachmodellierung) sind klassische statische NLP-/Vision-Benchmarks, keine Agent-Tests.`
                },
                {
                    q: `Was misst der <strong>"Frontier Math"</strong>-Benchmark (Glazer et al., Epoch AI, 2024)?
                        ${opts(
                            'Grundschulmathematik mit 100 Aufgaben.',
                            'Forschungs-Mathematik: ~200 Aufgaben auf Doktoranden- bis Professor-Niveau, von etablierten Mathematikern verfasst.',
                            'Lineare Algebra fuer Schueler.',
                            'Stochastik-Lehrbuchaufgaben.'
                        )}`,
                    h: 'Im November 2024 wurde der Benchmark veroeffentlicht und sofort zu einer der schwierigsten Mathematik-Eval-Suiten. Selbst GPT-4o und Claude 3.5 Sonnet liegen darauf unter 2 %.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Glazer et al. "FrontierMath: A Benchmark for Evaluating Advanced Mathematical Reasoning in AI", arXiv:2411.04872, Nov 2024 (Epoch AI). Eigenschaften:<br>
                        - ~200 Aufgaben aus Zahlentheorie, Algebraischer Geometrie, Mass- und Wahrscheinlichkeitstheorie, Topologie, Logik, …<br>
                        - Aufgaben von ueber 60 erfahrenen Mathematikern verfasst, mit eindeutiger numerischer/symbolischer Antwort.<br>
                        - Geheimer Test-Set (Kontamination minimiert).<br><br>
                        Werte bei Release:<br>
                        - GPT-4o: ~ 1,7 %.<br>
                        - Claude 3.5 Sonnet: ~ 1,5 %.<br>
                        - Gemini 1.5 Pro: ~ 1,5 %.<br>
                        - o1-preview: ~ 1,0 % (CoT half nicht).<br><br>
                        OpenAI o3 (Dec 2024 Preview, ARC-Live-Stream): 25,2 % auf FrontierMath — Sprung um Faktor 10+, weil o3 explizit auf Test-Time-Reasoning mit groesserem Suchbudget trainiert wurde. Trotzdem: ueber 70 % der Aufgaben bleiben fuer Frontier-LLMs ungeloest.<br><br>
                        Bedeutung: FrontierMath ist ein robuster Indikator fuer echte Reasoning-Tiefe — anders als GSM8K (gesaettigt) oder MATH (sehr nahe gesaettigt fuer Top-Modelle).`
                },
                {
                    q: `Wie hoch war laut OpenAI <strong>o3 (Dec 2024 Preview)</strong> die <em>Codeforces-ELO-Wertung</em>?
                        ${opts(
                            '~ 1.000 (entspricht Hobby-Niveau)',
                            '~ 2.727 (Top-200 weltweit, Grandmaster-Bereich)',
                            '~ 200 (Anfaenger)',
                            'Keine Angabe von OpenAI'
                        )}`,
                    h: 'Bei der ARC-AGI-Live-Stream-Praesentation am 20.12.2024 nannte OpenAI Performance-Werte ueber mehrere Disziplinen. Codeforces gehoerte dazu.',
                    s: `<strong>Richtige Antwort: B — ~ 2.727 ELO (99,95. Perzentil, Grandmaster-Niveau).</strong><br><br>
                        Quelle: OpenAI ARC-Prize-Live-Stream und Begleit-Blog "Introducing OpenAI o3" (20.12.2024). Vergleichswerte aus der gleichen Tabelle:<br>
                        - GPT-4o: 808 (~ 11. Perzentil).<br>
                        - o1-preview: 1.673 (~ 89. Perzentil).<br>
                        - o1: 1.807 (~ 93. Perzentil).<br>
                        - o3 (low compute): 2.727 (~ 99,95. Perzentil).<br><br>
                        Codeforces-Grandmaster (Rot) beginnt bei ELO 2.400; ueber 2.700 entspricht den 250 staerksten kompetitiven Programmierern weltweit. Caveat: das Modell laeuft ohne Wettbewerbs-Zeitlimit und mit Reasoning-Compute, das einem menschlichen Teilnehmer nicht zur Verfuegung steht — direkter ELO-Vergleich ist daher kontrovers (vgl. Diskussion auf TopCoder/Codeforces-Foren).`
                },
                {
                    q: `Welche der folgenden Aussagen zu <strong>Test-Set-Kontamination</strong> bei LLM-Benchmarks ist KORREKT?
                        ${opts(
                            'Kontamination ist kein praktisches Problem, weil alle Benchmarks unterschiedlich sind.',
                            'Trainings-Korpora enthalten oft Eval-Datensaetze (z.B. GSM8K-Aufgaben in Common Crawl). OpenAI bestaetigte 2024 explizit Kontamination einiger frueherer GPT-Modelle und nutzt seitdem private Eval-Sets fuer interne Releases.',
                            'Kontamination tritt nur bei Bildmodellen auf.',
                            'Kontamination laesst sich durch hoehere Temperatur beim Sampling beheben.'
                        )}`,
                    h: 'Kontamination wird mit Membership-Inference, Substring-Search und "Canary"-Strings nachweisbar. Sainz et al. (2023) und das OpenAI-System-Card-Dokument behandeln das Thema systematisch.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Quellen:<br>
                        - Sainz et al., "NLP Evaluation in Trouble: On the Need to Measure LLM Data Contamination for each Benchmark", EMNLP 2023 (arXiv:2310.18018).<br>
                        - OpenAI GPT-4o System Card (Mai 2024) — Abschnitt "Eval Contamination".<br>
                        - Zhou et al., "Don't Make Your LLM an Evaluation Benchmark Cheater", arXiv:2311.01964, 2023.<br><br>
                        Empirisch: GSM8K, HumanEval und MMLU sind in oeffentlichen Trainingskorpora (Common Crawl, GitHub, Reddit) weitgehend zu finden. OpenAI berichtet fuer GPT-4 und GPT-4o jeweils, dass eine kleine Teilmenge von MMLU-Fragen im Pretraining-Corpus war; nach Decontamination-Subsetting fallen die berichteten Scores um 1-3 Punkte.<br><br>
                        Mitigations:<br>
                        - <strong>Decontamination</strong>: Substring- oder N-Gram-Suche im Trainings-Korpus.<br>
                        - <strong>Private Eval-Sets</strong>: nie veroeffentlichte Test-Items (SWE-Bench Verified, ARC-AGI-Private, FrontierMath).<br>
                        - <strong>Frische Eval-Items</strong>: AIME (jaehrlich neue Aufgaben), Olympiad-Eval.<br><br>
                        Praxis: bei jeder Score-Diskussion das Decontamination-Verfahren mitnennen (AGENTS §8).`
                },
                {
                    q: `Was bezeichnet der Begriff <strong>"Jailbreaking"</strong> im LLM-Sicherheitskontext?
                        ${opts(
                            'Aktualisierung des Smartphone-Betriebssystems eines Modells.',
                            'Adversariale Prompts, die das Modell dazu bringen, gegen seine Sicherheits-Policies verstossende Antworten zu generieren — z.B. Anleitungen zu Waffen, Malware, oder personenbezogene Daten.',
                            'Hardware-Manipulation der GPU.',
                            'Quantisierung mit zu wenigen Bits.'
                        )}`,
                    h: 'Bekannte Techniken sind z.B. "DAN" (Do Anything Now), Role-Play-Szenarien, Many-Shot-Jailbreaking und Cipher-/Base64-Codierungs-Tricks.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Wichtige Quellen:<br>
                        - Wei et al., "Jailbroken: How Does LLM Safety Training Fail?", NeurIPS 2023 (arXiv:2307.02483).<br>
                        - Zou et al., "Universal and Transferable Adversarial Attacks on Aligned Language Models", arXiv:2307.15043, Jul 2023 — GCG-Suffix-Angriffe.<br>
                        - Anthropic, "Many-shot Jailbreaking", anthropic.com/research/many-shot-jailbreaking, Apr 2024 — der lange Kontext von Frontier-Modellen ermoeglicht hunderte gefaelschte "Erfolgs-Beispiele" zur Schwaechung der Safety-Layer.<br><br>
                        Verteidigungstechniken (mit Grenzen):<br>
                        - <strong>RLHF-Safety-Training</strong> (Standard, ueberwindbar).<br>
                        - <strong>System-Prompt-Hardening</strong> (Anthropic Constitutional AI).<br>
                        - <strong>Output-Klassifikatoren</strong> (Llama Guard 2/3, OpenAI Moderation API).<br>
                        - <strong>Circuit-Breaker</strong> (Zou et al. 2024) — Trainings-Methode, die das Modell waehrend gefaehrlicher Generierung deterministisch deraillieren laesst.<br><br>
                        100 %-Sicherheit gibt es nicht: jeder bekannte Sicherheits-Layer wurde irgendwann mit neuen Adversarial-Prompts umgangen. Praxis: defensive Tiefe + Klassifikator-Filter + Monitoring statt Hoffnung auf ein "sicheres Modell".`
                },
                {
                    q: `Welche der folgenden ist eine <strong>spezialisierte Eval-Suite fuer mathematische Olympiade-Aufgaben</strong>?
                        ${opts(
                            'PutnamBench (Tsoukalas et al., 2024) bzw. miniF2F (Zheng et al., 2022)',
                            'GLUE',
                            'BoolQ',
                            'WikiSQL'
                        )}`,
                    h: 'Olympiade-Mathematik braucht formale Beweise (z.B. in Lean 4) oder strenge mehrstufige Argumentation. Mehrere spezialisierte Benchmarks adressieren das.',
                    s: `<strong>Richtige Antwort: A — PutnamBench und miniF2F.</strong><br><br>
                        - <strong>miniF2F</strong> (Zheng et al., ICLR 2022, arXiv:2109.00110) — 488 olympische Mathematik-Aufgaben (IMO, AMC, AIME, MATH-Wettbewerb) als Lean-/Isabelle-/Metamath-Theoreme formuliert. Eine Loesung ist ein formaler Beweis, der vom Theorem-Beweis-System verifiziert wird.<br>
                        - <strong>PutnamBench</strong> (Tsoukalas et al., 2024, arXiv:2407.11214) — 640 Aufgaben des William Lowell Putnam Mathematical Competition (1962-2023) formal in Lean 4 / Isabelle / Coq.<br><br>
                        Aktuelle Performance (Stand Anfang 2025):<br>
                        - DeepSeek-Prover-V1.5 (DeepSeek, 2024): 63,5 % auf miniF2F-test.<br>
                        - AlphaProof (Google DeepMind, 2024) erreichte Silber-Niveau bei IMO 2024 (4 von 6 Aufgaben, ueber mehrere Tage rechnen) — keine reine LLM-Inferenz, sondern AlphaZero-aehnliche Suche im Beweisraum.<br>
                        - Frontier-LLMs (GPT-4o, Claude 3.5 Sonnet) ohne Theorem-Prover-Integration: deutlich schwaecher — sie produzieren plausible, oft fehlerhafte natursprachliche "Beweise".<br><br>
                        GLUE/BoolQ/WikiSQL sind Klassifikations-/QA-Benchmarks aus der frueheren NLP-Generation.`
                },
                {
                    q: `Welche Aussage zu <strong>"Distillation" / "Wissens-Destillation"</strong> bei LLMs ist korrekt?
                        ${opts(
                            'Das Trainings-Objektiv des Schueler-Modells ist nur Next-Token-Cross-Entropy auf den Ground-Truth-Tokens.',
                            'Ein grosses "Teacher"-Modell erzeugt Antwort-Verteilungen (Logits oder Soft-Labels), auf denen ein kleineres "Student"-Modell trainiert wird — oft genauer als reines SFT auf Ground-Truth.',
                            'Distillation ist nur fuer Bildmodelle moeglich.',
                            'Distillation bedeutet Datenbank-Indexierung von Embeddings.'
                        )}`,
                    h: 'Hinton, Vinyals, Dean (2015) haben den klassischen Aufsatz "Distilling the Knowledge in a Neural Network" veroeffentlicht. Im LLM-Bereich wird die Technik z.B. fuer Llama-3.1 8B / 70B (mit 405B als Teacher) angewandt.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Hinton, Vinyals, Dean, "Distilling the Knowledge in a Neural Network", NeurIPS Workshop 2014 / arXiv:1503.02531. Die zentrale Idee: das Student-Modell lernt nicht nur die harten Labels, sondern die volle weiche Verteilung des Teacher-Modells — diese "dark knowledge" ueber alle Klassen hilft beim Verallgemeinern.<br><br>
                        Variante im LLM-Bereich:<br>
                        - <strong>Logit-Distillation</strong>: Student minimiert KL-Divergenz zu Teacher-Logits.<br>
                        - <strong>Output-Distillation / Self-Instruct</strong>: Teacher generiert Antworten zu Prompts, Student lernt diese per SFT (z.B. Alpaca, Vicuna, OpenHermes).<br>
                        - <strong>Reasoning-Distillation</strong>: Teacher generiert CoT-Traces, Student lernt sie. OpenAI berichtet, dass kleinere o1-mini- / GPT-4o-mini-Modelle teils mit Reasoning-Traces der grossen Modelle trainiert wurden.<br><br>
                        Meta hat fuer Llama-3.1 8B / 70B berichtet, das 405B-Modell als Teacher fuer SFT-Daten zu nutzen (Llama-3.1-Paper, Kap. 5). DeepSeek-V3 nutzt Reasoning-Distillation mit DeepSeek-R1 als Teacher.<br><br>
                        Begrenzung: das Student-Modell kann das Teacher-Modell nicht uebertreffen (in der reinen Distillations-Form). Reine Self-Distillation hat im Frontier-Bereich daher Grenzen.`
                },
                {
                    q: `Welcher Begriff bezeichnet <strong>"Modell-Halluzinationen, die mit Toolnutzung gepruefte Antworten ergeben"</strong>?
                        ${opts(
                            'Tool-Augmented Generation',
                            'Stable Diffusion',
                            'Mixture-of-Experts',
                            'Quantisierung'
                        )}`,
                    h: 'Das Konzept verbindet RAG-aehnliches Auslagern mit aktiven Tool-Aufrufen wie Code-Execution, Web-Search, Datenbank-Queries. OpenAI-Plugins / ChatGPT Tools / Anthropic Tool Use stehen Pate.',
                    s: `<strong>Richtige Antwort: A — Tool-Augmented Generation.</strong><br><br>
                        Mialon et al. "Augmented Language Models: A Survey", arXiv:2302.07842, 2023. Tool-Augmented Generation kombiniert ein LLM mit externen Faehigkeiten:<br>
                        - <strong>Web-Search</strong>: aktuelle Information ueber API.<br>
                        - <strong>Code-Execution</strong> (Python-Interpreter, Bash): exakte numerische Berechnung, Code-Verifikation.<br>
                        - <strong>Datenbank/Spreadsheet</strong>: deterministische Lookups.<br>
                        - <strong>Wolfram Alpha / Mathematica</strong>: symbolische Algebra.<br><br>
                        Vorteile gegenueber reiner LLM-Antwort:<br>
                        - Halluzinations-Reduktion bei numerischen / Fakten-Fragen.<br>
                        - Verifizierbare Zwischenschritte.<br>
                        - Verlaesslichere Spezial-Logik (z.B. ist 17 prim? Code = ja; reines LLM kann irren).<br><br>
                        Beispiele aktueller Systeme:<br>
                        - <strong>ChatGPT Advanced Data Analysis</strong> (OpenAI, ehemals Code Interpreter).<br>
                        - <strong>Claude mit Computer Use</strong> (Anthropic, Okt 2024).<br>
                        - <strong>Gemini Code Execution</strong>.<br>
                        - <strong>Open-Source: LangChain, AutoGen, smolagents (Hugging Face 2025).</strong><br><br>
                        Wichtig: Tool-Use loest nicht alle Halluzinationen — falsche Tool-Aufrufe oder Fehl-Interpretationen der Tool-Resultate bleiben moeglich.`
                },
                {
                    q: `Welche Aussage zu den <strong>OpenAI Preparedness-Framework-Risikokategorien</strong> ist korrekt?
                        ${opts(
                            'Es gibt nur eine einzige Risikokategorie: Halluzinationen.',
                            'OpenAI fuehrt 4 (urspruenglich) bzw. 5 Risikokategorien (Cybersecurity, CBRN, Persuasion, Model Autonomy; spaeter ergaenzt um AI R&D) jeweils mit Stufen Low/Medium/High/Critical; ab High muss ein Modell zusaetzliche Sicherheitsmassnahmen erfuellen.',
                            'Das Framework ist ausschliesslich freiwillig und wird nicht intern angewandt.',
                            'Das Framework gilt nur fuer Bildmodelle.'
                        )}`,
                    h: 'OpenAI hat das Preparedness Framework im Dezember 2023 veroeffentlicht und im Mai 2024 / Dezember 2024 ueberarbeitet.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Quelle: OpenAI "Preparedness Framework (Beta)", Dec 2023; aktualisiert "Preparedness Framework v2", Dec 2024 (openai.com/safety/preparedness).<br><br>
                        Risikokategorien (v2, Dec 2024):<br>
                        - <strong>Cybersecurity</strong> — Faehigkeit zu autonomem Cyberangriff.<br>
                        - <strong>CBRN</strong> — chemische/biologische/radiologische/nukleare Waffen-Assistenz.<br>
                        - <strong>Persuasion</strong> — Beeinflussung in politischen / wirtschaftlichen Kontexten.<br>
                        - <strong>Model Autonomy</strong> — Selbst-Replikation, Ressourcen-Akquise.<br>
                        - <strong>AI R&D</strong> (neu in v2) — Faehigkeit zur autonomen Beschleunigung von KI-Forschung.<br><br>
                        Stufen: <em>Low / Medium / High / Critical</em>. Ab "High" sind zusaetzliche Sicherheits-Schritte (Pre-Deployment-Sicherheitsbewertung) Pflicht; "Critical"-Modelle werden nicht ohne weiteres deployed.<br><br>
                        Vergleichbare Frameworks:<br>
                        - <strong>Anthropic Responsible Scaling Policy (RSP)</strong>: AI Safety Levels ASL-1 bis ASL-4.<br>
                        - <strong>Google DeepMind Frontier Safety Framework</strong> (2024).<br>
                        - <strong>EU AI Act</strong>: General-Purpose-AI mit systemic risk hat eigene Compliance-Pflichten (FLOP-Schwelle $10^{25}$ FLOPs).`
                },
                {
                    q: `Welcher Multimodal-Test prueft, ob ein Modell die <strong>Position von Objekten in Bildern korrekt versteht und in Koordinaten ausgeben kann</strong>?
                        ${opts(
                            'V*-Bench / RealWorldQA / BLINK',
                            'GLUE',
                            'HumanEval',
                            'TruthfulQA'
                        )}`,
                    h: 'Visuelle Verankerung ("visual grounding") ist eine spezifische Schwaeche vieler Vision-LLMs und wird in spezialisierten Eval-Suiten geprueft.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Spezialisierte Multimodal-Eval-Sets:<br>
                        - <strong>V*-Bench</strong> (Wu et al., 2023, arXiv:2312.14135) — testet feinkoernige visuelle Aufmerksamkeit ("Was steht auf dem winzigen Schild im Bild?").<br>
                        - <strong>RealWorldQA</strong> (xAI, 2024) — 800 Bilder aus dem realen Leben mit Lokalisierungsfragen.<br>
                        - <strong>BLINK</strong> (Fu et al., ECCV 2024, arXiv:2404.12390) — 14 visuelle Wahrnehmungsaufgaben (Tiefenschaetzung, Vergleich, Spatial Reasoning, …) — Menschen ~ 96 %, GPT-4o ~ 51 %.<br>
                        - <strong>MathVista</strong> (Lu et al., ICLR 2024, arXiv:2310.02255) — visuell-mathematisches Reasoning.<br><br>
                        Beobachtung: Vision-LLMs sind beim freien Beschreiben oft gut, bei pixelgenauer Lokalisation ("Bounding-Box-Koordinaten") deutlich schwaecher als spezialisierte Object-Detection-Modelle (YOLO, DETR, Grounding-DINO).<br><br>
                        GLUE/HumanEval/TruthfulQA sind reine Text-Benchmarks ohne Vision-Komponente.`
                },
                {
                    q: `Was beschreibt das <strong>"Stochastic Parrots"</strong>-Paper (Bender, Gebru et al., FAccT 2021)?
                        ${opts(
                            'Eine technische Anleitung zum Training von Sprachmodellen.',
                            'Eine kritische Position zu Risiken grosser Sprachmodelle: Energiekosten, Daten-Bias, Halluzinations-Anschein von Verstehen, fehlende Verantwortung — wirkungs-mitausloeser fuer den Google-Ethics-Konflikt 2020/21.',
                            'Eine Quantisierungs-Methode.',
                            'Eine Bildmodell-Architektur.'
                        )}`,
                    h: 'Bender et al. "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?" wurde 2021 bei FAccT veroeffentlicht und ist eine der meistzitierten KI-Ethik-Arbeiten.',
                    s: `<strong>Richtige Antwort: B.</strong><br><br>
                        Bender, Gebru, McMillan-Major, Mitchell (Shmargaret Shmitchell), "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?", FAccT 2021 (doi.org/10.1145/3442188.3445922).<br><br>
                        Vier Kernkritikpunkte an Frontier-LLMs:<br>
                        1. <strong>Energie- und Carbon-Footprint</strong>: Training emittiert hohe CO₂-Mengen; spaetere Analysen (Patterson et al., 2021; Faiz et al., 2023) bestaetigen die Groessenordnung.<br>
                        2. <strong>Daten-Bias</strong>: Common-Crawl etc. spiegelt vor allem englischsprachige, maennliche, technische Diskurse — Verzerrungen werden vom Modell reproduziert.<br>
                        3. <strong>Anschein von Verstehen</strong>: ein LLM ist ein "stochastic parrot" — gibt statistisch plausible Token-Sequenzen wieder, ohne Bedeutungsverankerung.<br>
                        4. <strong>Verantwortungs-Diffusion</strong>: bei Schaden unklar, wer haftet (Entwickler, Betreiber, Nutzer).<br><br>
                        Begleitkontext: das Paper war ein Mit-Ausloeser des Konflikts bei Google AI Ethics (Timnit Gebrus Verlassen Dezember 2020). Es wird heute als Standardquelle in der AI-Ethik-Lehre und in EU-AI-Act-Vorbereitungen zitiert.<br><br>
                        Diese Kritik bleibt aktuell, auch wenn Capability-Argumente (Reasoning bei o1/o3) die "kein Verstehen"-Position relativieren. Ethik-Aufgaben sind nicht ausschliesslich technisch loesbar.`
                },
                {
                    q: `Welche Eigenschaft hat das LLM-Vergleichsverfahren <strong>"MT-Bench"</strong> (Zheng et al., 2023)?
                        ${opts(
                            '160 mehrstufige Konversations-Prompts, von GPT-4 als Richter mit 1-10-Skala bewertet — automatisiert, aber LLM-Judge-Bias.',
                            'Eine reine MCQ-Eval mit 10.000 Fragen.',
                            'Audio-Benchmark fuer Spracherkennung.',
                            'Bildgenerator-Eval.'
                        )}`,
                    h: 'Das Verfahren wurde im Paper "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" eingefuehrt (Zheng et al., NeurIPS 2023).',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", NeurIPS 2023 (arXiv:2306.05685).<br><br>
                        MT-Bench-Setup:<br>
                        - 80 Erstanfragen × 2 Folgeanfragen = 160 mehrstufige Konversationen aus 8 Kategorien (Writing, Roleplay, Reasoning, Math, Coding, Extraction, STEM, Humanities).<br>
                        - GPT-4 (Original-Mar-2023-Variante) als Richter, gibt 1-10-Score pro Antwort mit Begruendung.<br>
                        - Spaeter <em>MT-Bench-Hard</em> mit Claude-3-Opus als Richter (mehr Diversitaet).<br><br>
                        Bekannte Bias-Faktoren bei LLM-as-Judge:<br>
                        - <strong>Position-Bias</strong>: erste Antwort wird oft bevorzugt — Mitigation: Paare in beiden Reihenfolgen testen.<br>
                        - <strong>Verbosity-Bias</strong>: laengere Antworten gewinnen tendenziell.<br>
                        - <strong>Self-Preference-Bias</strong>: GPT-4 bevorzugt GPT-4-Antworten — Mitigation: Cross-Judge (Claude bewertet GPT, GPT bewertet Claude).<br><br>
                        Stand 2024 ist die Chatbot Arena (menschliche Bewerter, ELO) der haeufigere Praeferenzmasstab; MT-Bench wird oft als Begleit-Score reportet.`
                },
                {
                    q: `Was ist die zentrale architektonische Idee von <strong>Mamba</strong> (Gu & Dao, 2023) bzw. <em>State-Space-Modellen</em> als LLM-Alternative zu Transformer?
                        ${opts(
                            'Mamba ersetzt die quadratische Self-Attention durch ein selektives State-Space-Modell (SSM) mit linearer Komplexitaet in der Sequenzlaenge und nutzt einen Hardware-bewussten Scan.',
                            'Mamba ist eine reine Quantisierungsmethode fuer Transformer-Gewichte.',
                            'Mamba ist ein Multimodal-Encoder fuer Bilder.',
                            'Mamba ersetzt Tokenisierung durch Bytes-Only-Eingabe.'
                        )}`,
                    h: 'Gu & Dao schlagen mit Selective SSMs (S6) und der Mamba-Architektur eine Alternative zur Self-Attention vor, deren Rechenaufwand linear statt quadratisch in der Sequenzlaenge waechst.',
                    s: `<strong>Richtige Antwort: A.</strong><br><br>
                        Gu & Dao, "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", arXiv:2312.00752, Dez 2023 (COLM 2024).<br><br>
                        Kerneigenschaften:<br>
                        - <strong>Selective SSM (S6)</strong>: Zustands-Raum-Modell mit zeitabhaengigen, input-konditionierten Parametern $A(x_t), B(x_t), C(x_t)$ — Modell kann selektiv "behalten oder vergessen".<br>
                        - <strong>Lineare Komplexitaet</strong>: $\\mathcal{O}(L)$ in der Sequenzlaenge $L$ statt $\\mathcal{O}(L^2)$ wie Self-Attention.<br>
                        - <strong>Hardware-bewusster Parallel-Scan</strong>: ermoeglicht effiziente GPU-Ausfuehrung trotz rekurrenter Struktur.<br><br>
                        Empirische Resultate (Paper):<br>
                        - Mamba-3B erreicht / uebertrifft Transformer-Baselines aehnlicher Groesse auf Pile/Common-Crawl-Pretraining.<br>
                        - Sehr starke Long-Context-Eigenschaften (DNA-Sequenzen, Audio bis 1 Mio. Tokens).<br><br>
                        Folgearbeiten:<br>
                        - <strong>Mamba-2</strong> (Dao & Gu, ICML 2024, arXiv:2405.21060) — vereinfachte Struktur, naehert Mamba an Attention an (SSD-Framework).<br>
                        - <strong>Jamba</strong> (AI21 Labs, Mar 2024) — Mamba/Transformer-Hybrid mit MoE, 52B Parameter, 256k Context.<br>
                        - <strong>Falcon Mamba 7B</strong> (TII, Aug 2024) — erstes oeffentliches Pure-Mamba-Foundation-Model.<br><br>
                        Wichtig: Mamba ist nicht zwingend "besser als Transformer". Aktuelle Frontier-LLMs (GPT-4o, Claude 3.5, Llama 3.1 405B) sind weiterhin Transformer-basiert. SSMs gewinnen v.a. dort, wo Speicher-Bandbreite und sehr lange Kontexte limitieren.`
                }
            ]
        ]
    };
})();
