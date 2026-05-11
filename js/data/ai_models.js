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
                }
            ]
        ]
    };
})();
