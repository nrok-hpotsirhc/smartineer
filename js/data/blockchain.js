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
                },
                {
                    q: 'Nenne und erläutere kurz die drei Sicherheitsanforderungen an eine kryptographische Hashfunktion im Blockchain-Kontext.',
                    h: 'Preimage-, 2nd-Preimage- und Kollisionsresistenz.',
                    s: '<strong>Preimage-Resistenz</strong>: zu gegebenem $y$ ist es schwer, ein $x$ mit $H(x)=y$ zu finden (Einwegfunktion).<br><strong>2nd-Preimage-Resistenz</strong>: zu gegebenem $x_1$ ist es schwer, ein $x_2 \\ne x_1$ mit $H(x_1)=H(x_2)$ zu finden.<br><strong>Kollisionsresistenz</strong>: schwierig, überhaupt irgendein Paar $x_1 \\ne x_2$ mit $H(x_1)=H(x_2)$ zu finden (Geburtstagsschranke $\\sim 2^{n/2}$).<br>Bitcoin nutzt SHA-256d (~128 Bit Kollisionsicherheit), Ethereum keccak-256.<br><em>Quelle:</em> Menezes/van Oorschot/Vanstone, "Handbook of Applied Cryptography", CRC Press 1996/2018, §9.2.'
                },
                {
                    q: 'Welches Problem löst der Konsens einer Blockchain überhaupt? Erkläre das Doppel-Spend-Problem.',
                    h: 'Digitale Bits sind kopierbar — wer entscheidet, welche Tx zuerst gültig war?',
                    s: 'Digitale Münzen sind reine Daten und beliebig kopierbar. Ohne globalen Konsens könnte ein Sender dieselbe Münze parallel an zwei Empfänger versprechen (<strong>Double Spend</strong>). Klassische Lösungen erfordern eine vertrauenswürdige Zentralinstanz (Bank).<br>Nakamoto zeigte 2008, dass eine Kette aus PoW-Blöcken eine zeitliche Totalordnung der Transaktionen erzwingt: die Tx, die zuerst in einen genügend tiefen Block kommt, gilt — alle anderen werden verworfen.<br><em>Quelle:</em> S. Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System", 2008, §2 "Transactions" und §11 "Calculations".'
                },
                {
                    q: 'Welche 6 Felder enthält ein Bitcoin-Blockheader (80 Byte)?',
                    h: 'Version, prev hash, merkle root, time, bits, nonce.',
                    s: 'Bitcoin-Blockheader, 80 Byte fix:<br>1) <code>version</code> (4 B) — Protokoll-Version.<br>2) <code>prev_block_hash</code> (32 B) — SHA-256d des Vorgänger-Headers.<br>3) <code>merkle_root</code> (32 B) — Root des Tx-Merkle-Trees.<br>4) <code>time</code> (4 B) — Unix-Timestamp.<br>5) <code>bits</code> (4 B) — komprimiertes Target $T$ (Difficulty).<br>6) <code>nonce</code> (4 B) — Mining-Suchvariable.<br>Der PoW-Hash wird über genau diese 80 Byte berechnet.<br><em>Quelle:</em> A. Antonopoulos, "Mastering Bitcoin", 2nd ed., O\u2019Reilly 2017, Kap. 9 "The Bitcoin Network" / Kap. 10 "Mining and Consensus".'
                },
                {
                    q: 'Was sind die Bitcoin-Halvings, und wie oft treten sie auf?',
                    h: 'Alle 210000 Blöcke halbiert sich der Block-Reward.',
                    s: 'Im Bitcoin-Protokoll halbiert sich die <strong>Block-Subsidy</strong> alle 210000 Blöcke (≈ alle 4 Jahre). Start: 50 BTC/Block (2009). Halvings: 25 (2012), 12,5 (2016), 6,25 (2020), 3,125 (2024), ...<br>Limit der Reihe: $210000\\cdot 50/(1-1/2) = 21$ Mio. BTC ($\\approx 2140$ vollständig ausgegeben). Danach lebt das Mining nur noch von Transaktionsgebühren.<br><em>Quelle:</em> Bitcoin Core Source, <code>chainparams.cpp</code> / <code>validation.cpp</code> (Konstante <code>SUBSIDY_HALVING_INTERVAL = 210000</code>); Antonopoulos "MTB" Kap. 10.'
                },
                {
                    q: 'Wie wird aus einem öffentlichen ECDSA-Schlüssel eine Bitcoin-Adresse (P2PKH, beginnend mit "1...")?',
                    h: 'HASH160 = RIPEMD-160(SHA-256(PubKey)), dann Base58Check.',
                    s: '1) Public Key $P$ (33 B komprimiert oder 65 B unkomprimiert).<br>2) $h = \\text{RIPEMD-160}(\\text{SHA-256}(P))$ — 20 Byte ("HASH160").<br>3) Prefix-Byte 0x00 (Mainnet) voranstellen: $0x00 \\| h$.<br>4) Checksum: erste 4 Byte von $\\text{SHA-256}(\\text{SHA-256}(\\text{prefix}+h))$ anhängen.<br>5) Base58 codieren $\\Rightarrow$ Adresse beginnt mit "1...".<br><em>Quelle:</em> Bitcoin BIP-13 (Address Format for pay-to-script-hash), Antonopoulos "MTB" Kap. 4 "Keys, Addresses".'
                },
                {
                    q: 'Was unterscheidet asymmetrische Kryptographie (Public-Key) von symmetrischer? Welche Rolle spielt sie in Blockchains?',
                    h: 'Schlüsselpaar (priv, pub); Signieren mit priv, Verifizieren mit pub.',
                    s: 'Symmetrisch (AES, ChaCha20): Sender und Empfänger teilen denselben geheimen Schlüssel.<br>Asymmetrisch (RSA, ECDSA, Ed25519): jeder hat ein Paar $(sk, pk)$; aus $sk$ wird $pk$ effizient berechnet, aber nicht umgekehrt. <strong>Signieren</strong> nutzt $sk$; <strong>Verifizieren</strong> nutzt $pk$.<br>In Blockchains: die <em>Adresse</em> leitet sich aus $pk$ ab; jede Tx wird mit $sk$ signiert; jeder Node kann mit $pk$ prüfen, dass die Tx autorisiert war.<br><em>Quelle:</em> Diffie/Hellman, "New Directions in Cryptography", IEEE T-IT 22(6), 1976; Menezes/Vanstone HAC §1.8 / §11.5.'
                },
                {
                    q: 'Was ist ein Smart Contract auf einer Blockchain wie Ethereum?',
                    h: 'Code, der deterministisch von jedem Node ausgeführt wird.',
                    s: 'Ein Smart Contract ist Programmcode (z.B. EVM-Bytecode aus Solidity/Vyper), der bei Tx-Aufruf von jedem Validator-Node deterministisch ausgeführt wird. Speicherzustand $S$ und Code liegen on-chain. Effekt: Vertragslogik (Transfers, Bedingungen, Schiedsregeln) wird ohne vertrauenswürdige Drittpartei durchgesetzt.<br>Wesentliche Eigenschaften: <em>Deterministisch</em>, <em>Sandboxed</em> (kein Netzzugriff), <em>Gas-bemessen</em> (jeder Opcode kostet Gas, verhindert Endlosschleifen).<br><em>Quelle:</em> N. Szabo, "Smart Contracts" 1996; G. Wood, "Ethereum Yellow Paper" (Berlin/London-Forks).'
                },
                {
                    q: 'Was ist Gas in Ethereum, und wofür ist es da?',
                    h: 'Maßeinheit für Rechenarbeit; bezahlt mit ETH.',
                    s: '<strong>Gas</strong> = Maßeinheit für den Rechenaufwand einer EVM-Operation (z.B. ADD = 3 Gas, SSTORE neu = 20000 Gas). Jede Tx setzt ein Gas-Limit und einen Gas-Preis ($\\text{baseFee}+\\text{tip}$) in Wei.<br>Effekt: 1) <em>DoS-Schutz</em> — Endlosschleifen sind unmöglich, weil sie irgendwann das Gas-Limit reißen und mit OOG (out of gas) revertieren. 2) <em>Preisliche Steuerung</em> — Nachfrage nach Blockraum führt zu höherer baseFee (EIP-1559).<br><em>Quelle:</em> G. Wood, "Ethereum Yellow Paper" Appendix G "Fee Schedule"; EIP-1559 (London-Fork, 5. Aug. 2021).'
                },
                {
                    q: 'Was ist der Unterschied zwischen einem Coin und einem Token in Blockchain-Sprache?',
                    h: 'Coin = native Chain-Währung. Token = Smart-Contract-Asset.',
                    s: '<strong>Coin</strong>: native Krypto-Währung der Chain, durch das Konsensprotokoll selbst gebucht (Bitcoin = BTC, Ethereum = ETH, Solana = SOL). Wird für Gas/Fees gebraucht.<br><strong>Token</strong>: in einem Smart Contract definiertes Asset (ERC-20 für fungible, ERC-721 für NFTs, ERC-1155 hybrid). Lebt als Mapping <code>balance[addr]</code> im Contract-Storage; kein eigenes Konsensverfahren.<br>Beispiel: USDC ist ein ERC-20-Token auf Ethereum; nicht das Konsensprotokoll bucht ihn, sondern der Contract <code>0xA0b8...</code>.<br><em>Quelle:</em> Ethereum ERC-20 (F. Vogelsteller / V. Buterin 2015), ERC-721 (W. Entriken et al. 2018).'
                },
                {
                    q: 'Welche Hashfunktionen verwenden Bitcoin und Ethereum, und warum nicht MD5/SHA-1?',
                    h: 'SHA-256d bzw. keccak-256; ältere Funktionen sind gebrochen.',
                    s: 'Bitcoin: <strong>SHA-256d</strong> = $\\text{SHA-256}(\\text{SHA-256}(x))$ für PoW und Block-/Tx-IDs; HASH160 (SHA-256 + RIPEMD-160) für Adressen.<br>Ethereum: <strong>keccak-256</strong> (Pre-NIST-Variante von SHA-3) für Block-/Tx-Hashes und Adressen ($\\text{addr} = \\text{keccak}(P)[12{:}32]$).<br>MD5 (1992) und SHA-1 (1995) sind <em>kollisionsbruch</em>: Stevens et al. lieferten 2017 die erste SHA-1-Kollision ("SHAttered"); MD5 schon 2004 (Wang et al.). Für Blockchain-Wurzel-Hashes ist Kollisionsresistenz Pflicht.<br><em>Quelle:</em> NIST FIPS 180-4 (SHA-2) und FIPS 202 (SHA-3/Keccak); Stevens/Bursztein/Karpman/Albertini/Markov, "The first collision for full SHA-1", CRYPTO 2017.'
                },
                {
                    q: 'Was ist der Unterschied zwischen einem Full Node und einem Light Node?',
                    h: 'Full Node validiert die gesamte Chain selbst; Light Node verlässt sich auf Header.',
                    s: '<strong>Full Node</strong>: lädt und validiert <em>alle</em> Blöcke und Transaktionen seit dem Genesis (Bitcoin: ~580 GB, Ethereum Archive: > 14 TB). Prüft Konsensregeln selbst — vollständige Vertrauensminimierung.<br><strong>Light Node (SPV)</strong>: speichert nur Block-Header (~4 MB bei Bitcoin) und prüft Inklusion über Merkle-Proofs (siehe L1 oben). Vertrauensannahme: ehrliche Mehrheit unter den verbundenen Full Nodes.<br>Mobile Wallets sind fast immer Light Nodes; Börsen und Miner betreiben Full Nodes.<br><em>Quelle:</em> Nakamoto-Whitepaper §8 "Simplified Payment Verification"; Antonopoulos "MTB" Kap. 8.'
                },
                {
                    q: 'Was ist "Stake" in einem Proof-of-Stake-Protokoll, und wozu dient er?',
                    h: 'Hinterlegtes Kapital, das bei Fehlverhalten gekürzt wird.',
                    s: 'Ein Validator in einem PoS-Protokoll hinterlegt Coins als <strong>Stake</strong> (Ethereum 2.0: 32 ETH Mindesteinsatz). Auswahl als Block-Proposer und Stimmgewicht in Attestationen sind proportional zum Stake.<br>Bei Fehlverhalten (Doppel-Vote, Surround-Vote, Liveness-Versäumnis) verbrennt das Protokoll Teile des Stakes — <strong>Slashing</strong>. Damit liegt die Sicherheit nicht auf Energie (PoW), sondern auf wirtschaftlichem Risiko.<br><em>Quelle:</em> V. Buterin/V. Griffith, "Casper the Friendly Finality Gadget", arXiv:1710.09437, 2017; Ethereum Consensus Specs (Phase 0, 2020).'
                },
                {
                    q: 'Was ist der Unterschied zwischen einer Hot Wallet und einer Cold Wallet?',
                    h: 'Online vs. offline gespeicherter privater Schlüssel.',
                    s: '<strong>Hot Wallet</strong>: privater Schlüssel auf einem Online-Gerät (Browser-Wallet, Mobile-App, Börsen-Account). Komfortabel, aber angreifbar durch Malware/Phishing.<br><strong>Cold Wallet</strong>: privater Schlüssel offline (Hardware-Wallet wie Ledger/Trezor, Paper-Wallet, Air-Gapped-Rechner). Tx werden offline signiert und nur die fertige Signatur übertragen. Empfohlen für größere Beträge.<br>Hybrid: Multi-Sig (z.B. 2-of-3) verteilt Schlüssel auf Hot + Cold + Backup.<br><em>Quelle:</em> Antonopoulos "MTB" Kap. 5 "Wallets"; BIP-32 (HD-Wallets), BIP-39 (Mnemonic Seeds), BIP-44 (Multi-Account Hierarchy).'
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
                },
                {
                    q: 'Berechne das Block-Weight eines SegWit-Bitcoin-Blocks mit 800 kB Base-Data und 1600 kB Witness-Data. Wie wird die 4-MWU-Grenze überschritten?',
                    h: 'Weight = 4·Base + Witness (BIP-141).',
                    s: '$W = 4\\cdot 800 + 1600 = 4800\\,\\text{kWU}=4{,}8\\,\\text{MWU}$.<br>Die SegWit-Block-Weight-Grenze ist <strong>4 MWU</strong> (4 Mio. Weight-Units). Der hypothetische Block ist also <em>ungültig</em>; in der Praxis enthalten reale SegWit-Blöcke max. ca. 1,5–2 MB tatsächlich übertragene Bytes, da Witness-Daten 4-mal günstiger sind als Base-Daten.<br>Effekt: Anreiz, signaturlastige Inputs (Multi-Sig, Schnorr) ins Witness zu verschieben.<br>$$\\boxed{W=4{,}8\\,\\text{MWU} > 4\\,\\text{MWU\\ Limit}}$$<br><em>Quelle:</em> Bitcoin BIP-141 "Segregated Witness (Consensus layer)", P. Wuille / E. Lombrozo / J. Lau 2015; Bitcoin Core <code>consensus.h</code> (<code>MAX_BLOCK_WEIGHT = 4000000</code>).'
                },
                {
                    q: 'Erkläre das EIP-1559-Fee-Modell von Ethereum: baseFee, Priority-Fee, Burn.',
                    h: 'Algorithmische baseFee + Tip. baseFee wird verbrannt.',
                    s: 'Bis Juli 2021: First-Price-Auktion (User bietet Gasprice; alles geht an Miner). Resultat: hohe Volatilität, Overbidding.<br>Mit EIP-1559 (London-Fork, 5. Aug. 2021): Jeder Block hat eine <strong>baseFee</strong>, die deterministisch aus der Auslastung des Vorblocks berechnet wird (Ziel 50 % von 30 M Gas). Sender zahlt $\\text{baseFee}+\\text{tip}$. Die baseFee wird <em>verbrannt</em> (aus dem Umlauf entfernt), nur der Tip geht an den Validator.<br>Effekte: vorhersagbare Fees, deflationärer Druck auf ETH (negative Issuance bei hoher Last).<br><em>Quelle:</em> Ethereum EIP-1559 "Fee market change for ETH 1.0 chain" (Buterin/Conner/Dudley/Slipper/Norden/Bakhta, 2019); Ethereum Yellow Paper Appendix H (post-London).'
                },
                {
                    q: 'Was ist ECDSA-Signatur-Malleability, und wie hat Bitcoin sie behoben?',
                    h: 'Negation der S-Komponente liefert eine zweite gültige Signatur; geändert via BIP-66 / Low-S / SegWit.',
                    s: 'ECDSA-Signatur ist $(r, s)$. Da $-s \\bmod n$ ebenfalls eine gültige Signatur derselben Nachricht ist, kann ein Angreifer die TXID einer broadcastet Tx <em>ändern</em>, ohne die Signatur ungültig zu machen ("Tx-Malleability") — gefährlich für Off-chain-Konstruktionen.<br>Mitigations: 1) <strong>BIP-66</strong> (2015) erzwingt strikte DER-Codierung. 2) <strong>Low-S-Regel</strong> (BIP-146, 2017) akzeptiert nur $s \\le n/2$. 3) <strong>SegWit</strong> (BIP-141, 2017) verlegt die Signatur aus der TXID-Berechnung heraus $\\Rightarrow$ TXID ist signaturunabhängig.<br><em>Quelle:</em> Bitcoin BIP-66 "Strict DER signatures" (P. Wuille 2015), BIP-141 / BIP-143 (SegWit witness commitment).'
                },
                {
                    q: 'Nenne die wichtigsten Slashing-Bedingungen in Ethereum-PoS (Casper FFG / Gasper).',
                    h: 'Double-Vote und Surround-Vote.',
                    s: 'Ein Validator wird geschlitzt, wenn er signiert:<br>1) <strong>Double-Vote</strong> — zwei verschiedene Attestationen für denselben Target-Epoch.<br>2) <strong>Surround-Vote</strong> — Attestation $A_1=(s_1, t_1)$ und $A_2=(s_2, t_2)$ mit $s_1 < s_2 < t_2 < t_1$ (umschließt die andere; verletzt FFG-Sicherheit).<br>3) Proposer-Slashing: zwei verschiedene Block-Proposals in derselben Slot-Position.<br>Konsequenz: sofortiger Verlust von 1 ETH (Min.) bis zum gesamten Stake, plus Ejection.<br><em>Quelle:</em> Buterin/Griffith, "Casper the Friendly Finality Gadget", arXiv:1710.09437, 2017, §4 "Slashing Conditions"; Ethereum Consensus Specs Phase 0 (2020).'
                },
                {
                    q: 'Was bewirken Compact Blocks (BIP-152) für die Block-Propagation in Bitcoin?',
                    h: 'Statt voller Blöcke nur kurze TX-IDs übertragen.',
                    s: 'Ohne BIP-152: ein neu gefundener Bitcoin-Block (~1 MB) wird vollständig zu allen Peers gesendet. Bei langsamen Nodes erhöht das die Wahrscheinlichkeit eines Reorgs (Stale-Rate).<br>Mit <strong>Compact Blocks</strong>: der Sender liefert nur Header + 6-Byte-Short-IDs der Tx; der Empfänger rekonstruiert den Block aus seinem eigenen Mempool. Datenvolumen sinkt auf ~10–20 kB pro Block.<br>Variante "high-bandwidth-mode": Sender pusht den kompakten Block sofort an Top-3-Peers, ohne auf Inv-Roundtrips zu warten.<br><em>Quelle:</em> Bitcoin BIP-152 "Compact Block Relay" (M. Corallo 2016); Bitcoin Core seit 0.13 (2016).'
                },
                {
                    q: 'Was ist das "Nothing-at-Stake"-Problem in naivem Proof-of-Stake, und wie löst Ethereum es?',
                    h: 'Bei Forks kann ein Validator kostenfrei auf beiden Seiten signieren.',
                    s: 'In naivem PoS hat Signieren keine externen Kosten — bei einer Fork-Situation würde ein rationaler Validator auf <em>beiden</em> Forks gleichzeitig signieren, um in jedem Fall belohnt zu werden. Konsequenz: keine eindeutige Chain-Wahl, kein Konsens.<br>Lösung über <strong>Slashing</strong>: doppeltes Signieren konkurrierender Blöcke/Attestationen ist auf der Chain nachweisbar und führt zum Stake-Verlust. Damit ist das "Stimme auf allen Forks"-Verhalten wirtschaftlich verboten.<br><em>Quelle:</em> Buterin "Slasher" Blog 2014; Buterin/Griffith arXiv:1710.09437; Saleh "Blockchain Without Waste: Proof-of-Stake", Rev. Fin. Studies 34(3), 2021.'
                },
                {
                    q: 'Was ist eine Long-Range-Attack in Proof-of-Stake, und wie helfen Weak-Subjectivity-Checkpoints?',
                    h: 'Alte Validatoren mit verkauftem Stake können eine alternative Geschichte rückwirkend signieren.',
                    s: 'Validatoren, die ihren Stake bereits verkauft und sich ausgezahlt haben, können <em>nachträglich</em> mit ihren alten Schlüsseln eine alternative Chain ab einem weit zurückliegenden Punkt signieren. Da kein externer Energieaufwand wie bei PoW nötig ist, ist dieses Re-Signieren kostenlos.<br>Mitigation: <strong>Weak Subjectivity</strong> — jeder neu beitretende Node erhält einen <em>Checkpoint</em> (z.B. Hash eines kürzlichen finalisierten Blocks) aus vertrauenswürdiger Quelle und akzeptiert nur Ketten, die diesen Punkt enthalten. Periodendauer < Bonded-Stake-Withdrawal-Zeitfenster.<br><em>Quelle:</em> V. Buterin, "Proof of Stake: How I Learned to Love Weak Subjectivity", Ethereum Blog 25. Nov. 2014; Ethereum Consensus Specs Phase 0.'
                },
                {
                    q: 'Wie viel ETH werden pro Tag verbrannt, wenn jeder Block 15 Mio. Gas verbraucht und die baseFee konstant 30 Gwei beträgt?',
                    h: '12 s/Block · 86400 s/Tag · 15e6 Gas · 30 Gwei.',
                    s: 'Blöcke pro Tag: $86400/12 = 7200$.<br>Gas pro Tag: $7200 \\cdot 15 \\cdot 10^6 = 1{,}08 \\cdot 10^{11}\\,\\text{Gas}$.<br>baseFee = $30\\,\\text{Gwei} = 30 \\cdot 10^{-9}\\,\\text{ETH/Gas}$.<br>Burn = $1{,}08 \\cdot 10^{11} \\cdot 30 \\cdot 10^{-9} = 3240\\,\\text{ETH/Tag}$.<br>$$\\boxed{\\approx 3240\\,\\text{ETH/Tag}}$$<br>Bei einer Issuance von ca. 2000 ETH/Tag (Beacon-Chain-Validator-Rewards) wäre die Chain netto deflationär ("ultrasound money", post-Merge).<br><em>Quelle:</em> EIP-1559, ultrasound.money Live-Dashboards; Bitfly Beaconcha.in Statistics.'
                },
                {
                    q: 'Bitcoin: warum wird die HASH160-Adresse aus RIPEMD-160(SHA-256(PK)) statt nur SHA-256 oder nur RIPEMD-160 gebildet?',
                    h: 'Zwei unabhängige Hashes — Defense in Depth + 20-Byte-Adresse.',
                    s: '1) <strong>Kürzere Adresse</strong>: RIPEMD-160 liefert 160 Bit = 20 Byte (Base58 ca. 34 Zeichen), während SHA-256 32 Byte = 44 Zeichen ergäbe.<br>2) <strong>Diversität der Hashfamilien</strong>: ein potenzieller Bruch von SHA-256 (Merkle-Damgård, NSA-Design) würde nicht automatisch auch RIPEMD-160 (Davies-Meyer, europäische Lineage RACE) brechen — "belt and suspenders".<br>3) <strong>2nd-Preimage-Sicherheit</strong>: 160-Bit-Hash bietet ca. $2^{80}$ Aufwand gegen Geburtstag — historisch angemessen, heute Grenzfall (daher Bech32/SegWit nutzt 256-Bit-Hash für Skript-Pfade).<br><em>Quelle:</em> Bitcoin BIP-13 / BIP-16; Dobbertin/Bosselaers/Preneel, "RIPEMD-160: A Strengthened Version of RIPEMD", FSE 1996.'
                },
                {
                    q: 'Was ist P2SH (Pay-to-Script-Hash, BIP-16), und welchen Vorteil bietet es gegenüber P2PKH?',
                    h: 'Sender zahlt an den Hash eines Skripts; Empfänger liefert das Skript + Witness beim Ausgeben.',
                    s: 'Bei <strong>P2PKH</strong> commitet die UTXO direkt auf einen Pubkey-Hash; das Spending-Skript ist immer die Form OP_DUP OP_HASH160 ... OP_EQUALVERIFY OP_CHECKSIG.<br>Bei <strong>P2SH</strong> commitet die UTXO auf den Hash eines beliebigen Redeem-Skripts $R$: <code>OP_HASH160 H(R) OP_EQUAL</code>. Erst beim Ausgeben enthüllt der Sender $R$ und liefert dazu passende Inputs.<br>Vorteile: 1) <em>Komplexe Skripte (Multi-Sig, Timelocks) ohne Senderseite</em> — der Sender sieht nur eine "3..."-Adresse. 2) <em>Geringere Größe in UTXO</em>. 3) Vorstufe zu SegWit (P2WSH/P2WPKH "in" P2SH für alte Wallets).<br><em>Quelle:</em> Bitcoin BIP-16 "Pay to Script Hash" (G. Andresen 2012); Antonopoulos "MTB" Kap. 7.'
                },
                {
                    q: 'Bitcoin-Difficulty: erkläre die 4-fach-Begrenzung pro Adjustment und den Grund dafür.',
                    h: 'Schutz gegen extreme Hashrate-Schwankungen.',
                    s: 'Die Difficulty-Adjustment-Formel ist $D_{neu} = D_{alt} \\cdot T_{soll}/T_{ist}$, aber der Bitcoin-Code clampt $T_{ist}$ in $[T_{soll}/4,\\ 4\\cdot T_{soll}]$. Effektiv heißt das: pro Adjustment-Periode (2016 Blöcke) ändert sich die Difficulty maximal um Faktor 4 nach oben oder unten.<br>Zweck: 1) Schutz gegen einen plötzlichen Massive-Hashpower-Anstieg, der sonst die Block-Inter-Arrival-Zeit auf wenige Sekunden drücken würde. 2) Schutz gegen plötzlichen Massive-Hashpower-Drop ("Death Spiral" bei niedriger Difficulty wäre fatal). Beispiel: das chinesische Mining-Ban im Mai 2021 löste die größte Difficulty-Senkung (-27,9 %, Block 689472) aus, blieb aber unter der 4-fach-Grenze.<br><em>Quelle:</em> Bitcoin Core <code>pow.cpp</code> Funktion <code>CalculateNextWorkRequired</code>; Antonopoulos "MTB" Kap. 10.'
                },
                {
                    q: 'Was ist das Stratum-Protokoll bei Bitcoin-Mining-Pools, und welche Aufgabe übernimmt der Pool-Server gegenüber dem Miner?',
                    h: 'TCP/JSON-RPC-basiertes Job-Verteilungs-Protokoll.',
                    s: '<strong>Stratum</strong> (M. Palatinus 2012) ersetzt das ältere <code>getwork</code>. Ablauf:<br>1) Pool-Server konstruiert den vollen Block-Header-Template inklusive Coinbase-Tx (die <em>Pool-Adresse</em> als Output trägt).<br>2) Pool sendet an Miner: <code>mining.notify</code>(jobId, prev-hash, coinbase1, coinbase2, merkle-branches, version, nbits, ntime, cleanjobs).<br>3) Miner variiert <em>extraNonce</em> + Standard-Nonce über $2^{32}$, prüft Hash gegen <em>Share-Difficulty</em> (deutlich niedriger als Netz-Target) und reportet "Shares".<br>4) Findet er einen Hash unter Netz-Target, hat der Pool den Block gewonnen und verteilt den Reward proportional zu eingereichten Shares (PPLNS, PPS+).<br><em>Quelle:</em> M. Palatinus / P. Rusnak, Stratum Mining Protocol v1, slushpool.com Spezifikation (2012); BIP-310 Version-Rolling-Erweiterung.'
                },
                {
                    q: 'Wie groß war historisch die längste Reorg-Tiefe in Bitcoin nach dem Genesis-Block, und warum sind tiefe Reorgs in einer Hashpower-stabilen Chain äußerst selten?',
                    h: 'Bitcoin-Mainnet: max. 4 Blöcke (März 2013, Versions-Inkonsistenz). Wahrscheinlichkeit fällt exponentiell mit Tiefe.',
                    s: 'Im Bitcoin-Mainnet betrug die längste bekannte Reorg-Tiefe seit Genesis <strong>4 Blöcke</strong>, ausgelöst durch eine Konsens-Inkonsistenz zwischen Bitcoin Core 0.7 und 0.8 im März 2013 (BDB-Lock-Limit vs. LevelDB) — kein Angriff, sondern ein Bug.<br>Für ein ehrliches Netz mit Hashpower-Anteil $p$ und Angreifer $q=1-p < 0{,}5$ fällt die Wahrscheinlichkeit eines Reorgs der Tiefe $z$ exponentiell: $P \\approx (q/p)^z$ (Nakamoto §11). Bei realistischen $q < 0{,}3$ ist $P(z=6) < 1\\%$.<br>Andere PoW-Chains mit geringerer Hashpower hatten dagegen historisch tiefe Reorgs: Ethereum Classic (51 %-Angriffe Jan. 2019, mehr als 100 Blöcke; Aug. 2020 mehrfach > 3500 Blöcke), Verge (XVG, 2018) und Bitcoin Gold (2018, 2020).<br><em>Quelle:</em> bitcoin.org Alert Mar 11 2013 (BIP-50 "March 2013 chain fork"); Nakamoto 2008 §11; "Ethereum Classic 51% Attack Post-Mortem", Bitquery / SlowMist Aug. 2020.'
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
                },
                {
                    q: 'Schnorr-Signaturen vs ECDSA: welche fundamentalen Vorteile bringt Schnorr für Bitcoin (Taproot, BIP-340)?',
                    h: 'Linearität: $s = s_1 + s_2$. Aggregation, Batch-Verifikation, Provable Security.',
                    s: 'Schnorr-Signaturen (Schnorr 1989/91, Patent 2008 ausgelaufen) haben drei Eigenschaften, die ECDSA fehlen:<br>1) <strong>Linearität</strong>: $(R_1+R_2, s_1+s_2)$ ist eine gültige Signatur von $\\text{pk}_1+\\text{pk}_2$. Das erlaubt MuSig2 / FROST Multi-Signaturen, die on-chain ununterscheidbar von Einzel-Signaturen sind.<br>2) <strong>Batch-Verifikation</strong>: $n$ Signaturen prüfen in $O(n)$ EC-Skalarmultiplikationen mit $O(\\log n)$ Speedup vs. $n$ Einzel-Verifikationen.<br>3) <strong>Beweisbar sicher</strong> im Random-Oracle-Modell unter DLOG-Annahme (ECDSA hat nur heuristische Sicherheit).<br>BIP-340 (Wuille/Nick/Towns 2020) standardisiert Schnorr über secp256k1 mit X-only Pubkeys. Bestandteil des Taproot-Upgrades (aktiviert Block 709632, Nov. 2021).<br><em>Quelle:</em> C.P. Schnorr, "Efficient Signature Generation by Smart Cards", J. Cryptology 4(3), 1991; Bitcoin BIP-340 / BIP-341 / BIP-342.'
                },
                {
                    q: 'Erkläre Taproot (BIP-341) und MAST (Merkelized Abstract Syntax Trees) — welches Privatsphäre- und Effizienz-Argument verbindet sie?',
                    h: 'Mehrere Spending-Pfade unter einem Pubkey; nur der genutzte Pfad wird offengelegt.',
                    s: '<strong>Taproot</strong> kombiniert: 1) einen <em>Key-Path</em> — eine Schnorr-Signatur unter einem aggregierten Pubkey $Q = P + H(P\\|m)\\cdot G$, wobei $P$ der "ehrliche" gemeinsame Schlüssel ist und $m$ ein Skript-Merkle-Root. 2) einen <em>Script-Path</em> — Spending durch Reveal eines Skripts aus dem MAST.<br><strong>MAST</strong>: Alternative Spending-Pfade werden zu einem Merkle-Baum aggregiert; beim Spending wird nur der gewählte Pfad + sein Merkle-Proof offengelegt.<br>Effekte: <em>Privatsphäre</em> (kooperative Schließung sieht aus wie eine einzige Signatur), <em>Effizienz</em> (große, ungenutzte Skript-Zweige bleiben verborgen), <em>Skalierbarkeit</em> (kleinere Witness-Größe).<br><em>Quelle:</em> BIP-341 "Taproot: SegWit version 1 spending rules" (Wuille/Nick/Towns 2020); BIP-114-Vorläufer (Lau 2016) für MAST.'
                },
                {
                    q: 'Vergleiche zk-SNARK (z.B. Groth16) und zk-STARK in Bezug auf Trusted Setup, Beweisgröße und Quanten-Resistenz.',
                    h: 'Groth16: kleinste Beweise, aber Setup; STARK: kein Setup, größer, post-quantum.',
                    s: '<strong>Groth16</strong> (J. Groth, EUROCRYPT 2016): nicht-interaktive zk-SNARKs auf pairing-fähigen Kurven (BN254/BLS12-381). Beweise ~190 Byte, Verifikation in $O(1)$. <em>Erfordert</em> ein circuit-spezifisches Trusted Setup (toxic waste).<br><strong>PLONK</strong> (Gabizon/Williamson/Ciobotaru, IACR ePrint 2019/953): universelles, updatable Trusted Setup pro Schaltkreis-Größe; Beweise ~500 Byte.<br><strong>zk-STARK</strong> (Ben-Sasson/Bentov/Horesh/Riabzev, ePrint 2018/046): hash-basiert (FRI-Protokoll), <em>kein</em> Trusted Setup, plausibel <em>post-quantum-sicher</em>; Beweise jedoch 50–500 kB groß, Verifikation $O(\\log^2 n)$.<br>Einsatz: zkSync Era nutzt PLONK; StarkNet nutzt STARKs; Filecoin/Zcash Sapling nutzen Groth16.<br><em>Quelle:</em> Groth EUROCRYPT 2016; PLONK ePrint 2019/953; "Scalable, transparent, and post-quantum secure computational integrity" (Ben-Sasson et al.).'
                },
                {
                    q: 'Erkläre den Selfish-Mining-Angriff (Eyal/Sirer 2014). Warum ist die "Majority-is-Honest"-Annahme von Nakamoto nicht ausreichend?',
                    h: 'Angreifer hält private Blöcke zurück und veröffentlicht sie strategisch.',
                    s: 'Setup: Angreifer mit Hashpower-Anteil $\\alpha < 0{,}5$, ehrliches Netz $1-\\alpha$. Strategie: jeder gefundene Block wird <em>privat</em> gehalten. Findet das ehrliche Netz auch einen Block, veröffentlicht der Angreifer schnell, um die ehrliche Arbeit zu vergeuden ("räcen, dann veröffentlichen").<br>Ergebnis (Eyal/Sirer 2014): bei Netzwerk-Sympathie-Parameter $\\gamma=0{,}5$ ist Selfish Mining profitabler als ehrliches Mining bereits ab $\\alpha > 25\\%$ — nicht erst bei $\\alpha > 50\\%$. Bei perfektem Network-Edge ($\\gamma=1$) sogar ab $\\alpha > 0$.<br>Konsequenz: Nakamotos "Sicherheit bei $\\alpha < 50\\%$" gilt nicht in Bezug auf Anreize, sondern nur in Bezug auf Doppel-Spend.<br><em>Quelle:</em> I. Eyal, E. Sirer, "Majority is not Enough: Bitcoin Mining is Vulnerable", FC 2014 / Commun. ACM 61(7), 2018.'
                },
                {
                    q: 'Erkläre Ethereums Casper-FFG-Finalität: warum ist sie "deterministisch" und nicht nur "probabilistisch wie PoW"?',
                    h: 'Zwei-Phasen-Voting: Justify dann Finalize. Slashing blockiert konkurrierende Forks.',
                    s: 'Validatoren stimmen pro Epoche (32 Slots, ~6,4 min) in zwei Schritten:<br>1) <strong>Justify</strong> — Supermajority-Votum (≥ 2/3 Stake) für ein Checkpoint-Paar (Source, Target). Justification "kettet" Checkpoints.<br>2) <strong>Finalize</strong> — wenn ein bereits justifizierter Checkpoint Quelle der nächsten Justification ist, wird er <em>finalisiert</em>.<br>Sicherheits-Theorem (Buterin/Griffith 2017): es gibt keine zwei konfliktären finalisierten Checkpoints, ohne dass mindestens 1/3 des gesamten Stake gleichzeitig slashable wäre. Wirtschaftliche Garantie: Angriff auf Finalität kostet > $\\$10$ Mrd. (bei 30 Mio. gestaketer ETH).<br>Gasper = Casper FFG + LMD-GHOST-Fork-Choice. Liveness unter "partial synchrony", Sicherheit auch bei vollständiger Asynchronie.<br><em>Quelle:</em> Buterin/Griffith arXiv:1710.09437 (2017), §3-5; Gasper-Paper arXiv:2003.03052 (2020).'
                },
                {
                    q: 'BLS-Aggregat-Signaturen auf BLS12-381: skizziere die Mathematik der Verifikation $e(\\sigma, g_2) = e(H(m), pk)$.',
                    h: 'Bilineare Paarung auf elliptischer Kurve mit Embedding-Grad 12.',
                    s: 'BLS12-381 ist eine pairing-freundliche Kurve mit Embedding-Grad 12, Sicherheits-Niveau ca. 117 Bit.<br>Schlüssel: $sk \\in \\mathbb{Z}_q$, $pk = sk \\cdot g_2 \\in G_2$.<br>Signieren: $\\sigma = sk \\cdot H(m) \\in G_1$ mit Hash-zu-Kurve $H: \\{0,1\\}^* \\to G_1$.<br>Verifizieren: $e(\\sigma, g_2) \\stackrel{?}{=} e(H(m), pk)$, weil $e(sk H(m), g_2) = e(H(m), g_2)^{sk} = e(H(m), sk\\,g_2)$.<br>Aggregation: $\\sigma_{agg} = \\sum_i \\sigma_i \\in G_1$ (96 B konstant), $pk_{agg} = \\sum_i pk_i$. Verifikation prüft $e(\\sigma_{agg}, g_2) = \\prod_i e(H(m_i), pk_i)$ — bei gleicher Nachricht: $= e(\\sum H(m_i), pk_{agg})$.<br><em>Quelle:</em> Boneh/Lynn/Shacham, "Short Signatures from the Weil Pairing", J. Cryptology 17(4), 2004; Boneh/Drijvers/Neven, "Compact Multi-Signatures for Smaller Blockchains", ASIACRYPT 2018; IETF Draft <code>draft-irtf-cfrg-bls-signature</code> v05 (2022).'
                },
                {
                    q: 'Was ist eine Verifiable Delay Function (VDF), und wozu wäre sie in einer Blockchain nützlich?',
                    h: 'Sequenzielle Berechnung, die nicht parallelisierbar ist, aber schnell verifizierbar bleibt.',
                    s: 'Eine <strong>VDF</strong> ist eine Funktion $y = f(x, t)$, deren Auswertung mindestens $t$ sequenzielle Schritte benötigt (auch mit beliebig viel Parallelität), während die Verifikation $y$ aus einem kurzen Beweis in $\\operatorname{polylog}(t)$ möglich ist.<br>Konstruktionen: 1) <em>Wesolowski-VDF</em> (EUROCRYPT 2019) auf RSA-/Klassengruppen mit $y = x^{2^t} \\bmod N$. 2) <em>Pietrzak-VDF</em> (ITCS 2019) ähnlich, anderes Beweisverfahren.<br>Blockchain-Anwendungen: 1) <em>Randomness Beacon</em> — verhindert Last-Revealer-Manipulation in PoS-Lotterien (Drand, Solana Proof of History). 2) <em>Faire Leader-Election</em> in Ethereum-2-Sharding-Roadmap. 3) Front-Running-Schutz in Encrypted Mempools (Shutter Network).<br><em>Quelle:</em> Boneh/Bonneau/Bünz/Fisch, "Verifiable Delay Functions", CRYPTO 2018; Wesolowski "Efficient VDFs", EUROCRYPT 2019.'
                },
                {
                    q: 'Erkläre EigenLayer-Restaking: welcher Mehrwert entsteht, und welches systemische Risiko?',
                    h: 'Bereits gestaktes ETH wird "wiederverwendet", um zusätzliche Dienste abzusichern — gemeinsame Slashing-Bedingungen.',
                    s: 'Ethereum-Validatoren weisen ihre Withdrawal-Credentials einem EigenLayer-Smart-Contract zu. Damit unterwerfen sie sich zusätzlichen Slashing-Bedingungen für sogenannte AVS (Actively Validated Services) — z.B. Data-Availability-Committees, Bridges, Oracles, Rollup-Sequencer-Sicherheit.<br>Mehrwert: neue Protokolle erben Ethereum-Sicherheit, ohne eigenes Validator-Set aufbauen zu müssen. Validatoren erzielen zusätzliche Yield.<br>Systemisches Risiko: korrelierte Slashing-Ereignisse können große Stake-Anteile gleichzeitig vernichten (Kontagion). Buterin warnte 2023 vor "über-extending consensus": wenn AVS auf Konsens-Forks angewiesen sind und Validatoren sich uneinig sind, könnte Ethereum-L1 selbst geforkt werden müssen.<br><em>Quelle:</em> Sreeram Kannan et al. "EigenLayer: The Restaking Collective" Whitepaper Feb. 2023; V. Buterin "Don\u2019t overload Ethereum\u2019s consensus", vitalik.eth.limo Mai 2023.'
                },
                {
                    q: 'Beschreibe Cosmos IBC (Inter-Blockchain Communication) und die Rolle von Tendermint-BFT für instant finality.',
                    h: 'Light-Client-basierte Brücke; Tendermint = klassisches PBFT mit ≤ 1/3-Byzantine-Toleranz.',
                    s: '<strong>Tendermint BFT</strong> (Buchman/Kwon/Milosevic 2018): partial-synchronous PBFT-Variante; nach Pre-Vote → Pre-Commit → Commit eines Blocks ist dieser <em>instant final</em>, solange < 1/3 der Validatoren byzantine sind. Keine Reorgs.<br><strong>IBC</strong>: Chain $A$ läuft auf Chain $B$ einen Light-Client (Header + Konsens-Beweis von $A$). Pakete (Tokens, Daten) werden über <em>Channels</em> mit Authentication ("ICS-20" für fungible Tokens) ausgetauscht. Receive-, Acknowledge-, Timeout-Pakete erlauben atomare Cross-Chain-Operations.<br>Effekt: heterogenes Mehrkettensystem ohne zentralisierte Bridge — anders als ein Multi-Sig-Lock-and-Mint-Modell, das in den letzten Jahren > $\\$2$ Mrd. an Bridge-Hacks verloren hat.<br><em>Quelle:</em> Buchman/Kwon/Milosevic, "The Latest Gossip on BFT Consensus", arXiv:1807.04938 (2018); Cosmos ICS-23 / ICS-26 Spezifikationen.'
                },
                {
                    q: 'Wie unterscheidet sich ein DAG-basiertes Ledger (z.B. IOTA Tangle, Hedera Hashgraph) von einer klassischen Blockchain?',
                    h: 'Parallele Tx-Bestätigungen ohne strenge Block-Sequenz.',
                    s: '<strong>Blockchain (linear)</strong>: Tx werden in Blöcken gebündelt, Blöcke sind strikt totalgeordnet; Throughput ist durch Blockgröße/Blockzeit beschränkt.<br><strong>DAG-Ledger</strong>: jede neue Tx referenziert (und damit bestätigt) eine kleine Anzahl früherer Tx; die Topologie ist ein gerichteter azyklischer Graph. Theoretisch beliebig hoher Tx-Parallelismus.<br>Beispiele: <em>IOTA Tangle</em> (Popov 2016) — jede Tx bestätigt zwei Vorgänger über Tip-Selection. <em>Hashgraph</em> (Baird 2016) — Gossip-about-Gossip + virtuelles Voting, asynchron-BFT.<br>Trade-offs: schwierige Konsistenz/Finalitäts-Definition; oft Hilfs-Konstruktionen (Coordinator/Coordicide bei IOTA, Patent-Schutz bei Hashgraph).<br><em>Quelle:</em> S. Popov, "The Tangle", iotatoken.com Whitepaper v1.4.3 (2018); L. Baird, "The Swirlds Hashgraph Consensus Algorithm", Swirlds Tech Report TR-2016-01.'
                },
                {
                    q: 'Was sind Confidential Transactions (Maxwell 2015) und welche Rolle spielen Pedersen Commitments?',
                    h: 'Beträge werden als Pedersen Commitments versteckt, Range-Proof beweist Nichtnegativität.',
                    s: 'In Bitcoin sind UTXO-Beträge öffentlich. <strong>Confidential Transactions</strong> (G. Maxwell, Blockstream Whitepaper 2015) ersetzen den Klartext-Betrag durch ein <em>Pedersen Commitment</em> $C = vH + rG$, wobei $v$ der Betrag, $r$ der Blinding-Faktor und $G, H$ unabhängige Generatoren sind.<br>Eigenschaften: <em>Hiding</em> (kein Rückschluss auf $v$), <em>Binding</em> (Manipulation erfordert Lösen des DLOG), <em>Homomorph</em> ($C_1 + C_2 = (v_1+v_2)H + (r_1+r_2)G$ — Summenprüfung der Tx möglich, ohne Beträge zu kennen).<br>Zusätzlich braucht es einen <strong>Range-Proof</strong> ($0 \\le v < 2^{64}$, sonst Inflation möglich); Bulletproofs (Bünz et al. 2018) reduzierten ihn von ~10 kB auf ~700 B.<br>Einsatz: Monero, Mimblewimble/Grin, Liquid-Network.<br><em>Quelle:</em> G. Maxwell, "Confidential Transactions" elementsproject.org (2015); Bünz/Bootle/Boneh/Poelstra/Wuille/Maxwell, "Bulletproofs", IEEE S&P 2018.'
                },
                {
                    q: 'Was ist das Data-Availability-Problem bei zk-Rollups, und wie lösen es Danksharding (EIP-4844) und externe DA-Layer (Celestia, EigenDA)?',
                    h: 'Ein gültiger ZK-Proof allein reicht nicht — Nutzer brauchen Zustands-Daten zur Anfechtung/Recovery.',
                    s: 'Ein zk-Rollup veröffentlicht on-chain nur einen Zustandsübergang und einen ZK-Beweis seiner Korrektheit. Wenn der Sequencer aber die zugrundeliegenden Tx-Daten <em>geheim hält</em>, können Nutzer ihre eigenen Balances nicht rekonstruieren und nicht selbst aus dem Rollup ausziehen — selbst wenn der Beweis korrekt ist.<br>Lösungen:<br>1) <strong>EIP-4844 / Proto-Danksharding</strong> (Ethereum Cancun-Fork, März 2024): "Blobs" — kurzlebige Datenfelder (~125 kB pro Blob, max 6 pro Block), explizit für Rollup-Daten, ~10x billiger als Calldata, 18-Tage-Retention, geprüft via KZG-Polynom-Commitments.<br>2) <strong>Externe DA-Layer</strong>: Celestia (Tendermint-BFT-Chain mit data-availability sampling) bzw. EigenDA (Restaking-gesicherte Verfügbarkeits-Quoren) — bieten DA als eigenständigen Dienst; Rollups committen nur Hashes on-chain.<br><em>Quelle:</em> EIP-4844 Spezifikation (Buterin/Feist/Beiko et al. 2022); Mustafa Al-Bassam et al. "Fraud and Data Availability Proofs", FC 2021; Celestia-Paper "Lazyledger" arXiv:1905.09274 (2019).'
                },
                {
                    q: 'Was ist ein Atomic-Composability-Verlust in Cross-Rollup-Setups, und welche Architekturen versuchen ihn zu beheben (Shared Sequencer, Based Rollups)?',
                    h: 'Tx über zwei L2s sind nicht in einer einzigen atomaren Operation einschließbar — Race-Conditions, MEV, Latenz.',
                    s: 'Innerhalb eines einzigen Rollups (z.B. Arbitrum) gilt EVM-Atomarität: Tx revertet alle Subaufrufe gemeinsam. Über <em>zwei</em> Rollups hinweg (z.B. Arbitrum + zkSync) ist das nicht mehr gegeben — eine Cross-Rollup-Operation muss als Sequenz separater Tx mit Bridges/Messengern ausgeführt werden, mit unterschiedlichen Finalitätszeiten und MEV-Angriffsfläche dazwischen.<br>Lösungsansätze:<br>1) <strong>Shared Sequencer</strong> (Espresso, Astria): mehrere Rollups teilen sich einen Sequencer, der die Tx-Reihenfolge über Rollup-Grenzen hinweg festlegt — atomare Inklusion möglich, atomare Ausführung nur mit zusätzlicher Conditional-Inclusion-Logik.<br>2) <strong>Based Rollups</strong> (Buterin Mar 2023): L1-Block-Proposer selbst sequenziert die Rollup-Tx — natürliche Komposition mit L1, aber Latenz wie L1.<br>3) <strong>Native Account Abstraction Bridges</strong> mit Pre-Confirmations (Polygon AggLayer, Optimism Superchain).<br><em>Quelle:</em> V. Buterin, "Different types of layer 2s", vitalik.eth.limo Okt. 2023; Espresso Sequencer Whitepaper (2023); Polygon AggLayer Docs (2024).'
                }
            ]
        ]
    };
})();
