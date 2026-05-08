/* Blockchain */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'blockchain';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Blockchain',
        desc: 'Hashketten, Merkle-Trees, Konsensmechanismen (PoW/PoS), Difficulty, kryptografische Signaturen, Smart-Contract-Grundlagen.',
        formulas: `
            <strong>Block-Hash</strong><br>
            $h_n = H(h_{n-1} \\,\\|\\, \\text{Tx-Root}\\,\\|\\,\\text{Nonce}\\,\\|\\,\\dots)$<br><br>
            <strong>Proof of Work</strong><br>
            Finde Nonce mit $H(\\text{Header}\\,\\|\\,\\text{Nonce}) \\le T$ (Target)<br>
            Difficulty $D = \\dfrac{T_{max}}{T}$<br>
            Erwartete Anzahl Hashes: $2^{256}/T \\approx D\\cdot 2^{32}$ (Bitcoin)<br><br>
            <strong>Difficulty-Anpassung</strong><br>
            $D_{neu} = D_{alt}\\cdot \\dfrac{T_{soll}}{T_{ist}}$<br><br>
            <strong>Merkle-Tree</strong><br>
            $H_i=H(T_i)$, paarweise: $H_{ij}=H(H_i\\|H_j)$, bis Root<br>
            Tiefe: $\\log_2 n$, Beweisgröße $O(\\log n)$<br><br>
            <strong>Geburtstagsangriff (Hash-Kollision)</strong><br>
            Erwartete Anzahl Hashes für Kollision: $\\sim \\sqrt{\\pi N/2}$ bei $N=2^n$<br><br>
            <strong>SPV / Light-Client</strong><br>
            Verifiziert nur Header-Kette + Merkle-Inklusionsbeweise (kein voller Zustand)<br><br>
            <strong>Fork-Choice (LMD-GHOST)</strong><br>
            Kette mit größtem Latest-Message-Driven-Subtree-Gewicht (Ethereum 2)<br><br>
            <strong>Payment Channel (Lightning)</strong><br>
            Off-chain Aktualisierung über Commitment-Transactions; On-chain nur Eröffnung & Schluss<br><br>
            <strong>MEV (Maximal Extractable Value)</strong><br>
            Gewinn aus Reordering, Front-/Back-Running, Sandwich-Attacks innerhalb eines Blocks
        `,
        levels: [
            // L1
            [
                {
                    q: 'Was ist eine Blockchain mathematisch betrachtet? Welche Eigenschaft erzeugt die Manipulationssicherheit?',
                    h: 'Verkettete Liste von Blöcken, jeder enthält den Hash des Vorgängers.',
                    s: 'Blockchain = Sequenz $(B_0, B_1, \\dots, B_n)$ mit $B_i$ enthält $h_{i-1}=H(B_{i-1})$.<br>Manipuliert man $B_k$, ändert sich $h_k$, womit alle nachfolgenden Hashes inkonsistent werden $\\Rightarrow$ jede nachträgliche Änderung erfordert Neuberechnung aller folgenden Blöcke (bei PoW + Mehrarbeit).<br>Sicherheit beruht auf <strong>Pre-Image-Resistenz</strong> der Hashfunktion und (beim PoW) wirtschaftlicher Unmöglichkeit der Mehrheits-Hashpower.'
                },
                {
                    q: 'Formuliere die Proof-of-Work-Bedingung.',
                    h: 'Hash unter einem Target. $T$ = numerischer Schwellenwert.',
                    s: '$$H(\\text{Blockheader}\\,\\|\\,\\text{Nonce}) \\le T$$ <br>$H$ = z.B. SHA-256d (doppelter SHA-256 bei Bitcoin). $T$ wird so eingestellt, dass im Mittel alle 10 min ein Block gefunden wird. Miner variieren die Nonce, bis ein passender Hash gefunden wird (Brute-Force).'
                },
                {
                    q: 'Konstruiere den Merkle-Root für 4 Transaktionen $T_1, T_2, T_3, T_4$.',
                    h: 'Blätter hashen, paarweise hashen bis zur Wurzel.',
                    s: '$H_i=H(T_i)$ für $i=1,...,4$.<br>$H_{12}=H(H_1\\|H_2)$, $H_{34}=H(H_3\\|H_4)$.<br>$$\\boxed{R=H(H_{12}\\|H_{34})}$$<br>Vorteil: ein Knoten in der Mitte kann mit nur $\\log_2 n$ Hashes als Bestandteil bewiesen werden (Merkle-Proof).'
                },
                {
                    q: 'Bei Bitcoin liegt die Soll-Blockzeit bei 10 min. Die letzten 2016 Blöcke wurden in 10080 min gefunden. Wie ändert sich die Difficulty?',
                    h: '$D_{neu}=D_{alt}\\cdot T_{soll}/T_{ist}$.',
                    s: '$T_{soll}=2016\\cdot 10=20160\\,\\text{min}$. $T_{ist}=10080\\,\\text{min}$.<br>$D_{neu}=D_{alt}\\cdot 20160/10080=D_{alt}\\cdot 2$.<br>$$\\boxed{\\text{Difficulty verdoppelt sich}}$$ (Begrenzt im Bitcoin-Protokoll auf max Faktor 4 pro Anpassung).'
                },
                {
                    q: 'Welche Rollen erfüllt die digitale Signatur (z.B. ECDSA) in einer Blockchain-Transaktion?',
                    h: 'Authentizität und Integrität.',
                    s: '1) <strong>Authentizität</strong>: Beweis, dass der Sender Inhaber des privaten Schlüssels zur betreffenden Adresse ist (UTXO/Account).<br>2) <strong>Integrität</strong>: Jede Manipulation der Transaktionsdaten ungültigt die Signatur.<br>3) <strong>Nicht-Abstreitbarkeit</strong>: ohne privaten Schlüssel keine gültige Signatur produzierbar.<br>In Bitcoin: ECDSA über secp256k1; Verifikation in jedem Node.'
                },
                {
                    q: 'Was ist der Unterschied zwischen Proof of Work und Proof of Stake bezüglich Energiebedarf und Sicherheit?',
                    h: 'Vergleich Energie, Angriffsvektor, Finalität.',
                    s: '<strong>PoW</strong>: Sicherheit durch Hashing-Aufwand. Energiebedarf hoch (Bitcoin ~150 TWh/a). Angriff: 51 % Hashpower.<br><strong>PoS</strong>: Validatoren werden gewichtet nach Stake; bei Fehlverhalten Slashing. Energiebedarf < 1 % von PoW. Angriff: 33 % (Liveness) bzw. 51-66 % (Safety, je nach Protokoll). Finalität schneller (Casper FFG bei Ethereum: 2 Epochen ≈ 12 min).'
                },
                {
                    q: 'Was enthält der Genesis-Block, und warum ist er besonders?',
                    h: 'Erster Block, kein Vorgänger.',
                    s: 'Genesis-Block (Höhe 0): hardcoded im Protokoll, hat keinen Vorgänger-Hash (Feld auf 0 gesetzt). Enthält bei Bitcoin ein Coinbase-Tx mit dem berühmten Header-Zitat "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks".<br>Besonderheit: bildet den Vertrauensanker — alle nachfolgenden Hashes verketten sich darauf zurück. Manipulation des Genesis erzeugt eine andere Chain (anderes Netzwerk).'
                },
                {
                    q: 'Wie viele Bestätigungen werden bei Bitcoin üblicherweise als sicher angesehen, und was bedeutet das in Minuten?',
                    h: 'Faustregel + Blockzeit.',
                    s: 'Standard: <strong>6 Bestätigungen</strong> $\\Rightarrow 6\\cdot 10\\,\\text{min}=60\\,\\text{min}$.<br>Heuristik: bei Hashpower-Angreifer mit $q\\le 10\\%$ liegt die Erfolgswahrscheinlichkeit eines Reorgs unter $0{,}1\\%$ (Nakamoto-Tabelle).<br>Höhere Beträge ($\\to$ Börsen): 60+ Bestätigungen.'
                },
                {
                    q: 'Was ist eine Coinbase-Transaktion, und welche Felder sind besonders?',
                    h: 'Erste Tx eines Blocks, kein Input.',
                    s: 'Coinbase-Tx: spezielle Tx, die <strong>keinen normalen Input</strong> hat (Input zeigt auf 0×0…0). Sie erzeugt neue Coins als Block-Reward + Tx-Fees als Output an die Adresse des Miners.<br>Das Input-Feld enthält frei wählbare Daten — Miner nutzen es u. a. für extraNonce (siehe L2.4) und Botschaften.<br>Coinbase-Outputs sind 100 Blöcke lang gesperrt (Bitcoin maturity rule).'
                },
                {
                    q: 'Erkläre, wie ein SPV/Light-Client einen Zahlungseingang verifiziert, ohne die gesamte Chain zu speichern.',
                    h: 'Header-Kette + Merkle-Proof.',
                    s: '1) Light-Client speichert nur Block-Header (~80 B/Block, ~4 MB für Bitcoin gesamt).<br>2) Empfängt vom Full Node: Tx + Merkle-Proof (Pfad bis Root).<br>3) Verifiziert: a) PoW jedes Headers, b) Merkle-Proof gegen Root des Blocks, c) Block ist tief genug eingebettet.<br>Vertrauensannahme: ehrliche Mehrheit unter den verbundenen Full Nodes (kann durch Bloom-Filter aufgeweicht werden $\\Rightarrow$ Privatsphäre-Tradeoff).'
                }
            ],
            // L2
            [
                {
                    q: 'Wenn die Hashrate eines Bitcoin-Miners 100 TH/s beträgt und die Difficulty $D=10^{14}$, wie lange dauert es im Erwartungswert, bis er einen Block findet? (Bitcoin: $\\sim D\\cdot 2^{32}$ Hashes pro Block.)',
                    h: 'Erwartete Hashes / Hashrate.',
                    s: 'Erwartete Hashes pro Block: $D\\cdot 2^{32}\\approx 10^{14}\\cdot 4{,}29\\cdot 10^9 = 4{,}29\\cdot 10^{23}$.<br>Hashrate: $10^{14}\\,\\text{H/s}$.<br>$t = 4{,}29\\cdot 10^{23}/10^{14} = 4{,}29\\cdot 10^9 \\,\\text{s}\\approx 136\\,\\text{Jahre}$.<br>$$\\boxed{\\approx 136\\,\\text{Jahre}}$$ (deshalb mining pools).'
                },
                {
                    q: 'Berechne die Tiefe und Beweisgröße eines Merkle-Tree mit 1024 Transaktionen.',
                    h: 'Tiefe $=\\log_2 n$. Inklusionsbeweis: ein Hash pro Ebene.',
                    s: 'Tiefe $=\\log_2 1024=10$.<br>Inklusionsbeweis: 10 Hashes (à 32 Byte SHA-256) = 320 Byte.<br>$$\\boxed{\\text{Tiefe }10,\\ \\text{Beweis }320\\,\\text{B}}$$ Vergleich: Naiv alle Transaktionen senden = MByte.'
                },
                {
                    q: 'Bei einer Hashfunktion mit $n=80$ Bit Ausgabe: wieviele Hashes braucht man im Mittel, um eine Kollision zu finden?',
                    h: 'Geburtstagsschranke $\\sqrt{2^n}=2^{n/2}$.',
                    s: '$2^{40}\\approx 10^{12}$. Mit moderner Hardware in Sekunden machbar $\\Rightarrow$ 80 Bit ist <strong>nicht ausreichend</strong> für Kollisionsresistenz. Mindestens 256-Bit (128 Bit Sicherheit) verwenden.<br>$$\\boxed{\\sim 2^{40}\\,\\text{Hashes}}$$'
                },
                {
                    q: 'Bitcoin-Block: Header enthält 6 Felder à 4 Byte (Version, prev hash 32 B, merkle root 32 B, timestamp 4, bits 4, nonce 4) — 80 Byte. Wie groß ist der Suchraum der Nonce, und warum reicht das oft nicht?',
                    h: 'Nonce ist 32 Bit = $2^{32}$ Werte. Bei sehr hoher Difficulty kann $D\\cdot 2^{32}$ Hashes weit über $2^{32}$ liegen.',
                    s: 'Nonce-Raum: $2^{32}\\approx 4{,}3\\cdot 10^9$. Bei aktueller Difficulty werden $D\\cdot 2^{32}\\gg 2^{32}$ Hashes gebraucht. Lösung: <strong>extraNonce</strong> im Coinbase-Tx-Eingang verändern $\\Rightarrow$ neuer Merkle-Root $\\Rightarrow$ neuer 32-Bit-Suchraum verfügbar. Effektiv quasi unbegrenzt.'
                },
                {
                    q: 'In einem PoS-System mit insgesamt 100 Mio. ETH Stake hält ein Validator 32 ETH. Mit welcher (groben) Wahrscheinlichkeit wird er pro Slot zum Proposer?',
                    h: 'Anteil des Stakes proportional zur Auswahlwahrscheinlichkeit.',
                    s: '$P=32/(10^8)=3{,}2\\cdot 10^{-7}$ pro Slot.<br>Bei 12 s/Slot: $\\sim 7200$ Slots/Tag $\\Rightarrow$ erwartet alle $1/(P\\cdot 7200)\\approx 434$ Tage. Daher arbeiten Validatoren mit aggregierten Diensten und Block-Attestationen statt zu warten.'
                },
                {
                    q: 'UTXO vs. Account-Modell: erkläre den fundamentalen Unterschied und je einen Vorteil.',
                    h: 'Bitcoin (UTXO) vs. Ethereum (Accounts).',
                    s: '<strong>UTXO (Bitcoin)</strong>: Zustand = Menge unverbrauchter Outputs. Tx verbrauchen Inputs und erzeugen Outputs. Vorteil: parallele Validierung, gute Privatsphäre, einfache Off-chain-Konstruktionen (Lightning).<br><strong>Account (Ethereum)</strong>: Zustand = Mapping Adresse → (Balance, Nonce, Storage). Vorteil: einfaches Programmiermodell für Smart Contracts, kompakte Tx (kein UTXO-Management).'
                },
                {
                    q: 'Was ist der Mempool, und welchen Einfluss haben die Tx-Fees auf Block-Inklusion?',
                    h: 'Lokaler Pool ungebestätigter Tx; Miner sortieren nach $\\text{fee}/\\text{vByte}$.',
                    s: 'Mempool: lokaler Speicher jedes Nodes für validierte, aber unbestätigte Tx. Bei Block-Erstellung sortiert der Miner Kandidaten nach <strong>Fee-Rate</strong> (Sat/vByte bzw. Gwei/Gas) absteigend, bis Block voll ist.<br>Konsequenz: in Stoßzeiten dauern Low-Fee-Tx beliebig lange. Replace-by-Fee (RBF, BIP-125) erlaubt nachträgliches Fee-Bumping.'
                },
                {
                    q: 'Warum braucht Ethereum eine Account-Nonce, und wie schützt sie vor Replay-Angriffen?',
                    h: 'Sequenznummer pro Account verhindert Tx-Wiedergabe.',
                    s: 'Jede Tx enthält eine vom Sender erwartete Nonce $n_e$. Der Konsens akzeptiert sie nur, wenn $n_e = n_{state}$ (aktueller Account-Nonce). Nach Inklusion wird $n_{state} \\mathrel{+}= 1$.<br>Effekt: dieselbe signierte Tx ist nur einmal gültig $\\Rightarrow$ kein Replay. Zusätzlich verhindert es Double-Submits beim Pool-Drift.<br>Cross-Chain-Replay (z.B. ETH/ETC nach Fork) wird durch Chain-ID in EIP-155 verhindert.'
                },
                {
                    q: 'Erkläre Eclipse- vs. Sybil-Attacke im P2P-Netzwerk einer Blockchain.',
                    h: 'Sybil: viele Identitäten. Eclipse: Opfer komplett umstellen.',
                    s: '<strong>Sybil-Attacke</strong>: Angreifer erstellt viele Pseudo-Identitäten/Nodes, um Stimmrecht zu manipulieren. PoW/PoS schützen, indem Stimmrecht an Ressourcen (Hashrate/Stake) gekoppelt ist statt an Identitäten.<br><strong>Eclipse-Attacke</strong>: Angreifer kontrolliert <em>alle</em> Peer-Verbindungen eines Opfer-Knotens und filtert dessen Sicht auf das Netz $\\Rightarrow$ Doppel-Spend gegen dieses Opfer möglich.<br>Schutz: viele/anchor Verbindungen, IP-Diversität, Tor-Vermeidung von gleichen ASNs.'
                },
                {
                    q: 'Berechne die theoretischen Bitcoin-Outputs nach 4 Halvings, ausgehend von 50 BTC/Block.',
                    h: 'Geometrische Reihe.',
                    s: '210000 Blöcke pro Halving-Periode. Reward: 50 → 25 → 12,5 → 6,25 → 3,125.<br>Nach 4 Halvings (840000 Blöcke): $210000\\cdot(50+25+12{,}5+6{,}25)=210000\\cdot 93{,}75=19\\,687\\,500\\,\\text{BTC}$.<br>Bis ins Unendliche (Limes): $210000\\cdot 50/(1-0{,}5)=210000\\cdot 100=21\\,000\\,000\\,\\text{BTC}$.<br>$$\\boxed{\\text{Total cap }21\\,\\text{Mio. BTC}}$$'
                },
                {
                    q: 'Was ist eine Soft Fork, was eine Hard Fork? Welche Kompatibilität ergibt sich für alte Nodes?',
                    h: 'Regel-Verschärfung vs. -Erweiterung.',
                    s: '<strong>Soft Fork</strong>: neue Regeln <em>verschärfen</em> die alten. Alte Nodes akzeptieren neue Blöcke weiterhin (rückwärtskompatibel). Beispiel: SegWit (BIP-141).<br><strong>Hard Fork</strong>: neue Regeln <em>weiten</em> Gültigkeit aus oder ändern grundlegend (z.B. Blockgröße, EVM-Opcodes). Alte Nodes lehnen neue Blöcke ab $\\Rightarrow$ Chain-Split, falls nicht alle upgraden. Beispiel: Bitcoin Cash, Ethereum-Merge.'
                }
            ],
            // L3
            [
                {
                    q: 'Quantifiziere die Erfolgswahrscheinlichkeit eines 51%-Angriffs in PoW: Angreifer hat Anteil $q=0{,}3$ Hashpower, ehrliche Miner $p=0{,}7$. Wie groß ist nach Nakamoto die Wahrscheinlichkeit, einen $z=6$ Blöcke alten ehrlichen Block zu überholen?',
                    h: 'Nakamoto Whitepaper: $P(z) \\approx (q/p)^z$ für $q<p$ (vereinfachte Schranke).',
                    s: 'Vereinfacht: $(0{,}3/0{,}7)^6=(0{,}4286)^6\\approx 6{,}2\\cdot 10^{-3}\\approx 0{,}62\\%$.<br>Mit der genauen Poisson-basierten Formel aus dem Whitepaper liegt die Wahrscheinlichkeit etwas höher (≈1.7 %), aber Größenordnung ist konsistent. Daher: bei 6 Bestätigungen ist ein 30%-Angriff praktisch unwahrscheinlich.<br>$$\\boxed{\\sim\\,\\text{einige %}}$$'
                },
                {
                    q: 'Smart Contract Gas: ein Ethereum-Tx hat 21000 Gas-Basis + 50000 Gas Aufruf, baseFee = 30 Gwei, priorityFee = 2 Gwei. Berechne die Kosten in ETH.',
                    h: 'Kosten = GasUsed · (baseFee + tip).',
                    s: 'GasUsed = 71000. Effektiver Preis = 32 Gwei = $32\\cdot 10^{-9}\\,\\text{ETH/Gas}$.<br>Cost = $71000\\cdot 32\\cdot 10^{-9} = 2{,}272\\cdot 10^{-3}\\,\\text{ETH}\\approx 0{,}00227\\,\\text{ETH}$.<br>$$\\boxed{\\approx 0{,}00227\\,\\text{ETH}}$$ Bei ETH-Preis 3000 \\$ ≈ 6,80 \\$.'
                },
                {
                    q: 'Verifiziere einen Merkle-Inklusionsbeweis: Tx-Hash $H_x=h_3$, Pfad $[h_4, h_{12}]$, Reihenfolge "rechts, links". Berechne den behaupteten Root.',
                    h: 'Beim Aufstieg jeden Geschwister-Hash entsprechend der Position konkatenieren und hashen.',
                    s: 'Ebene 1: Geschwister rechts $\\Rightarrow H_{34}=H(h_3\\|h_4)$.<br>Ebene 2: Geschwister links $\\Rightarrow R=H(h_{12}\\|H_{34})$.<br>Vergleiche $R$ mit dem im Block-Header gespeicherten Merkle-Root. Übereinstimmung $\\Rightarrow$ Tx war Bestandteil des Blocks (SPV-Verifikation).'
                },
                {
                    q: 'BLS-Aggregatsignatur: Was bedeutet Aggregation und wie verändert das die Größe einer Multi-Signer-Signatur (z.B. 100 Validatoren)?',
                    h: 'BLS erlaubt das Aufsummieren von Signaturen $\\sigma=\\sum\\sigma_i$ und Public Keys.',
                    s: 'Eine BLS-Aggregat-Signatur $\\sigma=\\sum\\sigma_i$ verifiziert sich gegen $\\text{pk}_{agg}=\\sum \\text{pk}_i$ und das gleiche Nachrichten-Hash.<br>Effekt: 100 ECDSA-Signaturen $\\approx 100\\cdot 64\\,\\text{B}=6400\\,\\text{B}$. BLS aggregiert: <strong>96 B</strong> (BLS12-381) konstant.<br>Dies ermöglicht Ethereum 2.0 die Speicherung tausender Attestationen pro Slot.'
                },
                {
                    q: 'Schreibe den 51%-Doppel-Spend-Angriff als Markovkette: Angreifer und ehrliches Netzwerk sind in einem Wettrennen um $z$ Blöcke. Welcher rekursive Zustand ist relevant?',
                    h: 'Differenz $\\Delta = \\#\\,\\text{ehrlich} - \\#\\,\\text{Angreifer}$. Random Walk; Erfolg, wenn $\\Delta\\le 0$.',
                    s: 'Modellierung: $\\Delta_n$ Differenz nach $n$ Schritten, schreitet pro Schritt um $+1$ (Wahrscheinlichkeit $p$) oder $-1$ (Wahrscheinlichkeit $q$).<br>Gambler-Ruin-Problem: Startwert $\\Delta_0=z$ (Vorsprung der Ehrlichen). Erfolg des Angreifers: erreicht $\\Delta=0$. <br>Lösung: $P_{success} = (q/p)^z$ für $q<p$, sonst $1$.<br>Nakamoto verfeinerte mit Poisson-verteilter Block-Anzahl in fixer Zeit $\\Rightarrow$ explizite Tabelle (Block-Konfirmationen vs. Risiko).'
                },
                {
                    q: 'Erkläre den Unterschied zwischen einem Layer-1 (z.B. Ethereum mainnet) und einem Layer-2 Rollup (Optimistic vs. ZK).',
                    h: 'Skalierung durch Auslagern der Ausführung. Sicherheit durch unterschiedliche Beweisverfahren.',
                    s: '<strong>Layer-1</strong>: alle Nodes verifizieren alle Tx; volle Dezentralität, aber begrenzter Durchsatz (Ethereum ~15 TPS).<br><strong>Optimistic Rollup</strong> (z.B. Arbitrum): Tx werden off-chain ausgeführt, On-chain wird der Zustands-Diff committed. Streitfall durch <em>fraud proofs</em> in einem Challenge-Window (z.B. 7 Tage) anfechtbar.<br><strong>ZK Rollup</strong> (z.B. zkSync, StarkNet): Off-chain-Ausführung wird durch <em>Validity Proof</em> (SNARK/STARK) verifiziert. On-chain prüft nur den Beweis. Vorteile: schnelle Finalität, keine Challenge-Period; Nachteil: höhere Beweis-Erzeugung-Kosten, kompliziertere Toolchain.'
                },
                {
                    q: 'Erkläre einen Atomic Swap zwischen Bitcoin und Litecoin via HTLC. Welche kryptografischen Bausteine sichern Atomarität?',
                    h: 'Hash-Time-Locked Contract: Hash-Lock und Time-Lock auf beiden Chains.',
                    s: '1) Alice wählt Geheimnis $s$, berechnet $H=\\text{SHA-256}(s)$. Sperrt BTC mit Skript: "auszahlen wenn Bob Preimage zu $H$ liefert vor Block $N$, sonst Alice nach $N$".<br>2) Bob sperrt LTC mit demselben $H$, kürzerer Timeout $N\'<N$.<br>3) Alice claimt LTC mit $s$ → veröffentlicht $s$ on-chain.<br>4) Bob extrahiert $s$ und claimt BTC.<br><strong>Atomarität</strong>: entweder beide Swaps gehen durch (über $s$), oder keiner (Refund über Time-Lock). Trustless. Schwachstelle: Free-Option-Risiko und Online-Anforderung.'
                },
                {
                    q: 'Lightning Payment Channel: erkläre Eröffnung, Update und unkooperatives Schließen. Welche Rolle spielen Penalty-Transactions?',
                    h: 'Funding-Tx + Commitment-Tx + Revocation-Keys.',
                    s: '<strong>Eröffnung</strong>: 2-of-2-Multisig-Funding-Tx on-chain (z.B. 1 BTC).<br><strong>Update</strong>: beide signieren neue Commitment-Tx, die den aktuellen Saldo darstellt; alte Commitment-Tx werden durch <em>Revocation-Secrets</em> entwertet.<br><strong>Cooperative Close</strong>: gemeinsam unterschriebene Schluss-Tx.<br><strong>Unilateral Close</strong>: Partei broadcastet ihre Commitment-Tx. Bei alter (unfair) Commitment kann Gegenseite mit Revocation-Secret innerhalb des Timelocks <em>Penalty-Tx</em> einreichen und den gesamten Channel-Saldo beanspruchen.<br>Sicherheit: ständig Watchtower-Service oder eigene Online-Präsenz erforderlich.'
                },
                {
                    q: 'MEV (Maximal Extractable Value): erläutere Sandwich-Attack auf einen DEX-Trade und Mitigations (z.B. Flashbots, Private Mempool, MEV-Boost).',
                    h: 'Front-Run + Back-Run um eine User-Tx.',
                    s: '<strong>Sandwich</strong>: Bot sieht User-Buy in Mempool. Front-Run: kauft das Asset zuerst (höherer Gas-Preis), pumpt Preis auf AMM. User-Buy zahlt schlechteren Preis. Back-Run: Bot verkauft sofort danach. Differenz ist MEV-Gewinn auf Kosten des Users.<br><strong>Mitigations</strong>: 1) <em>Flashbots/MEV-Boost</em> — User sendet Tx in Private-Mempool an Builder, Auktion erlaubt MEV-Internalisierung. 2) <em>Slippage-Limits</em> auf AMMs. 3) <em>CoW Swap</em>, Batch-Auctions, faire Reihenfolge (Threshold-Encryption, Encrypted Mempools wie Shutter Network).'
                },
                {
                    q: 'Account Abstraction (ERC-4337): was ändert sich gegenüber EOAs, und welche Use-Cases werden möglich?',
                    h: 'Smart-Contract-Wallets als First-Class, Bundler/Paymaster.',
                    s: 'EOA (klassisch): privater Schlüssel = Account, fest definierte Signaturlogik (ECDSA/secp256k1), nur ETH zahlt Gas.<br><strong>ERC-4337</strong>: Wallets sind Smart Contracts. UserOperation-Objekte werden über einen <em>Bundler</em> in einen Block eingespeist; <em>Paymaster</em> kann Gas in ERC-20 oder gesponsert bezahlen.<br>Use-Cases: 1) <em>Social Recovery</em> (Multi-Faktor statt Seed-Phrase). 2) <em>Session Keys</em> für Spiele/dApps. 3) <em>Spending Limits</em>, Whitelists. 4) <em>Multisig out of the box</em>. 5) Passwordless via WebAuthn/Passkeys. Erfolgt ohne Hard Fork (Layer auf normaler EVM).'
                }
            ]
        ]
    };
})();
