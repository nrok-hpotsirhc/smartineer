/* Kryptographie */
(function () {
    window.APP_DATA = window.APP_DATA || {};
    window.APP_ORDER = window.APP_ORDER || [];
    const id = 'crypto';
    if (!window.APP_ORDER.includes(id)) window.APP_ORDER.push(id);

    window.APP_DATA[id] = {
        id,
        name: 'Kryptographie',
        desc: 'Symmetrische und asymmetrische Verfahren, Zahlentheorie (Modulararithmetik, Eulersche Phi, Erweiterter Euklid), RSA, Diffie-Hellman, Hashfunktionen.',
        formulas: `
            <strong>Modulararithmetik</strong><br>
            $a \\equiv b \\pmod n \\iff n \\mid (a-b)$<br>
            Inverse: $a^{-1}\\bmod n$ existiert genau wenn $\\gcd(a,n)=1$<br>
            Erweiterter Euklid: $\\gcd(a,n)=as+nt$, dann $a^{-1}\\equiv s\\pmod n$<br><br>
            <strong>Eulersche Phi-Funktion</strong><br>
            Primzahl $p$: $\\varphi(p)=p-1$<br>
            Produkt zweier Primzahlen: $\\varphi(pq)=(p-1)(q-1)$<br>
            Eulers Satz: $a^{\\varphi(n)}\\equiv 1\\pmod n$ für $\\gcd(a,n)=1$<br><br>
            <strong>RSA</strong><br>
            $N=pq$, $\\varphi(N)=(p-1)(q-1)$<br>
            Wähle $e$ mit $\\gcd(e,\\varphi)=1$; $d\\equiv e^{-1}\\pmod{\\varphi(N)}$<br>
            Verschlüsseln: $c=m^e\\bmod N$. Entschlüsseln: $m=c^d\\bmod N$<br><br>
            <strong>Diffie-Hellman</strong><br>
            Öffentlich: $p,g$. Alice: $a$, $A=g^a\\bmod p$. Bob: $b$, $B=g^b\\bmod p$.<br>
            Shared Secret: $S=B^a=A^b=g^{ab}\\bmod p$<br><br>
            <strong>Hashfunktionen</strong><br>
            Eigenschaften: Pre-image-, 2nd-pre-image-, Kollisionsresistenz<br>
            Geburtstagsparadoxon: Kollision bei $\\sim 2^{n/2}$ Hashes (Bit-Länge $n$)<br><br>
            <strong>HMAC</strong><br>
            $\\text{HMAC}_K(m) = H((K\\oplus opad)\\,\\|\\,H((K\\oplus ipad)\\,\\|\\,m))$<br><br>
            <strong>AES-Modi (Sicherheits-Stichworte)</strong><br>
            ECB unsicher, CBC braucht zufälligen IV, CTR/GCM dürfen Nonce <em>nie</em> wiederverwenden<br><br>
            <strong>Passwort-KDFs</strong><br>
            PBKDF2/Argon2/scrypt: Salz $s$, Iterationen $t$ $\\Rightarrow$ Brute-Force-Kosten $\\propto t$<br><br>
            <strong>Lattice-Krypto (LWE)</strong><br>
            $b = As + e \\bmod q$, mit Fehlervektor $e$ klein. Sicher gegen Quantenangriffe.
        `,
        levels: [
            // L1
            [
                {
                    q: 'XOR-Stromchiffre: Klartext $M=11001010_2$, Schlüssel $K=10101111_2$. Berechne $C=M\\oplus K$ und verifiziere $C\\oplus K=M$.',
                    h: 'XOR bitweise: gleiche Bits $\\to 0$, ungleiche $\\to 1$. XOR ist selbstinvers.',
                    s: 'M:  1 1 0 0 1 0 1 0<br>K:  1 0 1 0 1 1 1 1<br>C:  0 1 1 0 0 1 0 1<br>Verifikation: C ⊕ K = 11001010 = M.<br>$$\\boxed{C=01100101_2}$$'
                },
                {
                    q: 'Caesar-Chiffre mit Verschiebung 3: verschlüssele "HALLO" (A=0, B=1, ...).',
                    h: '$c_i=(m_i+3)\\bmod 26$.',
                    s: 'H(7)→K(10), A(0)→D(3), L(11)→O(14), L(11)→O(14), O(14)→R(17). <br>$$\\boxed{\\text{KDOOR}}$$'
                },
                {
                    q: 'Berechne $\\varphi(15)$ und $\\varphi(23)$.',
                    h: '$\\varphi(p)=p-1$ für Prim. $\\varphi(pq)=(p-1)(q-1)$ für $p\\neq q$ prim.',
                    s: '$15=3\\cdot 5\\Rightarrow \\varphi(15)=2\\cdot 4=8$.<br>$23$ ist prim $\\Rightarrow \\varphi(23)=22$.<br>$$\\boxed{\\varphi(15)=8,\\ \\varphi(23)=22}$$'
                },
                {
                    q: 'RSA-Setup: $p=3$, $q=11$. Bestimme $N$ und $\\varphi(N)$.',
                    h: '$N=pq$, $\\varphi=(p-1)(q-1)$.',
                    s: '$N=33$, $\\varphi(N)=2\\cdot 10=20$.<br>$$\\boxed{N=33,\\ \\varphi=20}$$'
                },
                {
                    q: 'Berechne $7^3 \\bmod 11$ effizient.',
                    h: '$7^2=49\\equiv 5\\pmod{11}$. Dann $7^3=7^2\\cdot 7\\equiv 5\\cdot 7$.',
                    s: '$5\\cdot 7=35\\equiv 35-33=2\\pmod{11}$.<br>$$\\boxed{7^3\\equiv 2\\pmod{11}}$$'
                },
                {
                    q: 'Welche Eigenschaften definieren eine kryptographische Hashfunktion?',
                    h: 'Drei klassische Forderungen.',
                    s: '1. Pre-Image-Resistenz: zu gegebenem $h$ ist es schwer, ein $m$ mit $H(m)=h$ zu finden.<br>2. Second-Pre-Image-Resistenz: zu gegebenem $m_1$ ist es schwer, $m_2\\neq m_1$ mit gleichem Hash zu finden.<br>3. Kollisionsresistenz: schwer, zwei beliebige $m_1\\neq m_2$ mit $H(m_1)=H(m_2)$ zu finden.<br>Zusätzlich: deterministisch, schnell, lawinenartiger Effekt.'
                },
                {
                    q: 'Berechne $\\gcd(48, 36)$ und $\\gcd(17, 13)$ mit dem Euklidischen Algorithmus.',
                    h: 'Wiederhole $\\gcd(a,b)=\\gcd(b,\\,a\\bmod b)$.',
                    s: '$\\gcd(48,36)$: $48=1\\cdot 36+12$; $36=3\\cdot 12+0$ $\\Rightarrow \\boxed{12}$.<br>$\\gcd(17,13)$: $17=1\\cdot 13+4$; $13=3\\cdot 4+1$; $4=4\\cdot 1+0$ $\\Rightarrow \\boxed{1}$ (teilerfremd).'
                },
                {
                    q: 'Welche Wirkung hat ein Salt bei der Passwort-Speicherung?',
                    h: 'Vorberechnete Tabellen + identische Hashes für identische Passwörter.',
                    s: 'Salt $s$ ist ein zufälliger, pro Account einzigartiger Wert: gespeichert wird $(s,\\ H(s\\,\\|\\,p))$.<br>Wirkung: 1) Rainbow-Tables nutzlos (jede Salz-Variante bräuchte eigene Tabelle); 2) gleiche Passwörter ergeben unterschiedliche Hashes; 3) Brute-Force muss pro Account einzeln laufen.<br>Best Practice: Salz $\\ge 128$ Bit + langsame KDF (Argon2id mit hohem $t$ und Speicher-Hardness).'
                },
                {
                    q: 'Symmetrisch oder asymmetrisch? Ordne zu: AES, RSA, SHA-256, Diffie-Hellman, ECDSA, HMAC.',
                    h: 'Asymmetrisch: zwei Schlüssel (privat/öffentlich). Hashes haben keinen Schlüssel im klassischen Sinn.',
                    s: 'Symmetrisch (geheimer Schlüssel): <strong>AES</strong>, <strong>HMAC</strong> (MAC, keine Verschlüsselung).<br>Asymmetrisch: <strong>RSA</strong>, <strong>Diffie-Hellman</strong>, <strong>ECDSA</strong>.<br>Hashfunktion (kein Schlüssel): <strong>SHA-256</strong>.'
                },
                {
                    q: 'Welche Modi sind authentifizierte Verschlüsselung (AEAD), und warum sind sie heute Standard?',
                    h: 'AEAD = Confidentiality + Integrity in einem Schritt.',
                    s: 'AEAD-Modi: <strong>AES-GCM</strong>, <strong>ChaCha20-Poly1305</strong>, AES-CCM. Sie produzieren neben dem Chiffrat ein Authentifizierungstag, sodass Manipulation erkannt wird.<br>Vorteil gegenüber Encrypt-then-MAC manuell: weniger Implementierungsfehler, ein einziger Schlüssel, Pipeline-Optimierung möglich.<br>TLS 1.3 erlaubt nur noch AEAD-Suites.'
                },
                {
                    q: 'Was besagt das Kerckhoffs-Prinzip, und warum ist es bis heute Leitprinzip moderner Kryptographie?',
                    h: 'Die Sicherheit eines Systems darf ausschließlich vom geheimen Schlüssel abhängen — nicht vom Verfahren.',
                    s: '<strong>Kerckhoffs (1883)</strong>: "Le système doit être pratiquement, sinon mathématiquement, indéchiffrable" — präziser formuliert von Shannon (1949) als "the enemy knows the system".<br>Konsequenzen: 1) Verfahren wird öffentlich beschrieben und peer-reviewt (AES, RSA, ChaCha20). 2) "Security through obscurity" gilt als Anti-Pattern. 3) Schlüssel ist die einzige Geheimnis-Komponente und kann bei Kompromittierung ersetzt werden, ohne das ganze System auszutauschen.<br><em>Quelle:</em> A. Kerckhoffs, "La cryptographie militaire", J. des sciences militaires, Bd. 9, 1883, S. 5–38; C. E. Shannon, "Communication Theory of Secrecy Systems", Bell Syst. Tech. J. 28(4), 1949.'
                },
                {
                    q: 'Was unterscheidet eine Blockchiffre (z.B. AES) von einer Stromchiffre (z.B. ChaCha20)?',
                    h: 'Blockweise feste Größe vs. Schlüsselstrom bitweise XOR.',
                    s: '<strong>Blockchiffre</strong>: arbeitet auf festen Blöcken (AES: 128 Bit) mit einem Schlüssel ($k\\in\\{128,192,256\\}$ Bit). Modi (CBC, CTR, GCM) machen daraus Verschlüsselung beliebiger Länge. Verschlüsselung und Entschlüsselung sind verschiedene Operationen.<br><strong>Stromchiffre</strong>: erzeugt einen pseudozufälligen Schlüsselstrom $z_1 z_2 z_3\\ldots$ und verschlüsselt $c_i = m_i \\oplus z_i$. Symmetrisch (Ver- = Entschlüsselung), bitgenau zuschneidbar, kein Padding nötig. Moderne Beispiele: ChaCha20 (RFC 8439), AES-CTR (technisch ist CTR-Modus eine Stromchiffre auf Basis einer Blockchiffre).<br><em>Quelle:</em> Paar/Pelzl "Understanding Cryptography" 2. Aufl. (2010), Kap. 2 (Stream Ciphers) & Kap. 4 (AES); RFC 8439 (ChaCha20-Poly1305).'
                },
                {
                    q: 'Verschlüssele "KRYPTO" mit der Vigenère-Chiffre und Schlüssel "KEY" (A=0, …, Z=25).',
                    h: 'Buchstabenweise modulo 26 addieren, Schlüssel wiederholt.',
                    s: 'Klartext: K(10) R(17) Y(24) P(15) T(19) O(14)<br>Schlüssel (wiederholt): K(10) E(4) Y(24) K(10) E(4) Y(24)<br>Summen mod 26: 20, 21, 22, 25, 23, 12 = U V W Z X M<br>$$\\boxed{\\text{KRYPTO} \\rightarrow \\text{UVWZXM}}$$<br>Hinweis: Vigenère ist <em>polyalphabetisch</em>, aber bei bekanntem Periodendurchlauf via Kasiski-Test/Friedman-Index gebrochen (Kasiski 1863, Friedman 1922). Heute nur didaktisch relevant.<br><em>Quelle:</em> Stinson/Paterson "Cryptography: Theory and Practice", 4. Aufl. (2018), §1.1.5.'
                },
                {
                    q: 'Warum reicht eine Schlüssellänge von 56 Bit (DES) heute nicht mehr aus? Wie viele Bit empfiehlt NIST 2024 für symmetrische Verfahren?',
                    h: 'Brute Force in Tagen möglich; NIST: mindestens 112 Bit, langfristig 128/256 Bit.',
                    s: 'DES (FIPS 46, 1977) hat 56-Bit-Schlüssel: $2^{56}\\approx 7{,}2\\cdot 10^{16}$ Schlüssel. EFF Deep Crack (1998) faktoriserte einen Schlüssel in 56 Stunden für $\\$250\\,000$; heute genügen wenige Stunden auf einer GPU-Farm bzw. einem ASIC-Cluster.<br>NIST SP 800-57 Part 1 Rev. 5 (2020) empfiehlt: bis 2030 ≥ 112 Bit "Security Strength" (entspricht 3DES-Keying-Option 1 oder AES-128 als Übergang), ab 2031 ≥ 128 Bit (AES-128 oder besser); für langlebige Geheimnisse 192–256 Bit. 3DES ist seit 2024 nicht mehr für neue Anwendungen zugelassen (Disallowed).<br><em>Quelle:</em> NIST SP 800-57 Part 1 Rev. 5, "Recommendation for Key Management", Mai 2020, Tab. 2 & §5.6.2; NIST SP 800-131A Rev. 2.'
                },
                {
                    q: 'Nenne die drei klassischen Schutzziele der Informationssicherheit (CIA-Trias) und ein typisches kryptographisches Primitiv pro Ziel.',
                    h: 'Confidentiality, Integrity, Availability.',
                    s: '<strong>Confidentiality (Vertraulichkeit)</strong>: nur Befugte lesen Daten. Primitive: AES-GCM, ChaCha20-Poly1305, RSA-OAEP.<br><strong>Integrity (Integrität)</strong>: Manipulationen werden erkannt. Primitive: HMAC-SHA-256, Poly1305, digitale Signaturen (ECDSA, Ed25519, Dilithium).<br><strong>Availability (Verfügbarkeit)</strong>: Daten/Dienst sind erreichbar. Krypto trägt indirekt bei (DDoS-resistente Cookies, schwellwert-Signaturen). Erweiterung: oft werden zusätzlich <em>Authenticity</em> (Identitätsnachweis, Signaturen, Zertifikate) und <em>Non-Repudiation</em> (Unleugbarkeit) als eigene Ziele aufgeführt.<br><em>Quelle:</em> ISO/IEC 27000:2018, §3.10; NIST SP 800-12 Rev. 1 (2017), §4.</em>'
                },
                {
                    q: 'Worin unterscheiden sich Nonce, IV (Initialization Vector) und Salt — und wofür brauche ich jeweils <em>Eindeutigkeit</em> bzw. <em>Unvorhersagbarkeit</em>?',
                    h: 'Nonce: einmalig pro Schlüssel; IV: oft zusätzlich zufällig; Salt: einmalig pro Passwort, öffentlich.',
                    s: '<strong>Nonce</strong> (number used once): muss pro Schlüssel <em>einzigartig</em> sein, darf öffentlich sein. AES-GCM: 96-Bit-Nonce, Wiederholung katastrophal (Schlüsselstrom enthüllt). Genügt deterministischer Zähler.<br><strong>IV (Initialization Vector)</strong>: in CBC zusätzlich <em>unvorhersagbar</em> (sonst BEAST-Angriff TLS 1.0). Praktisch: 128-Bit zufällig.<br><strong>Salt</strong>: öffentlicher Eingabewert für Passwort-Hashing/KDF; muss pro Passwort einzigartig sein, um Rainbow-Tables und parallele Angriffe zu verhindern. NIST: ≥ 128 Bit.<br><em>Quelle:</em> NIST SP 800-38D (GCM), §8.2 "Uniqueness Requirement on IVs"; NIST SP 800-132 (PBKDF), §5.1; Rogaway "Nonce-Based Symmetric Encryption", FSE 2004.'
                },
                {
                    q: 'Was ist das Geburtstagsparadoxon (Birthday Paradox), und welche Konsequenz hat es für die Ausgabelänge einer Hashfunktion?',
                    h: 'Kollisionen schon bei $2^{n/2}$ Auswertungen, nicht erst bei $2^n$.',
                    s: 'Wahrscheinlichkeit, dass unter $k$ zufälligen $n$-Bit-Hashwerten eine Kollision auftritt: $P(k)\\approx 1-e^{-k(k-1)/(2\\cdot 2^n)}$. Bei $k\\approx 2^{n/2}$ ist $P\\approx 0{,}5$.<br>Konsequenz: für $n$-Bit-<em>Kollisionsresistenz</em> braucht es Aufwand $\\approx 2^{n/2}$. Daher SHA-256 für 128 Bit Sicherheit, SHA-512 für 256 Bit. SHA-1 (160 Bit) bot nur $2^{80}$ Sicherheit — Stevens et al. zeigten 2017 eine reale Kollision (SHAttered) für $\\approx 2^{63}$.<br><em>Quelle:</em> Menezes/van Oorschot/Vanstone, "Handbook of Applied Cryptography", §2.1.5; Stevens et al. "The first collision for full SHA-1", CRYPTO 2017.'
                },
                {
                    q: 'Was ist der Unterschied zwischen einer Hashfunktion und einem MAC (Message Authentication Code)?',
                    h: 'MAC braucht einen geheimen Schlüssel, Hash nicht.',
                    s: '<strong>Hashfunktion</strong> $H: \\{0,1\\}^*\\to\\{0,1\\}^n$ ist <em>öffentlich</em> und schlüssellos (SHA-256, BLAKE2, SHA-3). Sichert Integrität nur, wenn der Hash über einen authentischen Seitenkanal kommt.<br><strong>MAC</strong> $\\text{MAC}_K: \\{0,1\\}^*\\to\\{0,1\\}^n$ braucht einen geheimen Schlüssel $K$. Nur wer $K$ kennt, kann gültige Tags erzeugen oder prüfen. Beispiele: HMAC-SHA-256 (RFC 2104), KMAC (NIST SP 800-185), Poly1305 (Bernstein 2005, RFC 8439).<br>Folge: ein Hash sichert nicht gegen aktive Angriffe — ein Angreifer kann Nachricht <em>und</em> Hash austauschen. Ein MAC tut das. <em>Daher:</em> niemals SHA-256 zur Authentifizierung von Nachrichten allein verwenden.<br><em>Quelle:</em> Boneh/Shoup "A Graduate Course in Applied Cryptography" v0.6 (2023), §6; RFC 2104 (HMAC).'
                },
                {
                    q: 'Skizziere die Kernschritte des TLS-1.3-Handshakes auf hohem Niveau. Welche kryptographischen Primitive kommen wo zum Einsatz?',
                    h: 'ClientHello → ServerHello → Schlüssel-Ableitung → Authentifizierung → fertig in 1-RTT.',
                    s: '<strong>1-RTT-Handshake (RFC 8446, Aug. 2018):</strong> 1) ClientHello: Random, supported_groups, key_share (z.B. X25519-Public). 2) ServerHello: Random, key_share (X25519-Public). 3) ECDH-Berechnung: gemeinsames Geheimnis $Z=a\\cdot B = b\\cdot A$. 4) HKDF-Ableitung der Traffic-Keys (handshake + application). 5) Server sendet Certificate + CertificateVerify (RSA-PSS, ECDSA oder Ed25519 über Transkript). 6) Client prüft Zertifikatskette gegen Trust Store. 7) Beide senden "Finished" (HMAC über Transkript) → Verbindung steht.<br>Verwendete Primitive: ECDH (X25519/secp256r1), AEAD (AES-GCM oder ChaCha20-Poly1305), HKDF-SHA256/384, Signatur (RSA-PSS/ECDSA/Ed25519), HMAC.<br><em>Quelle:</em> RFC 8446 "TLS 1.3", §2 & §4; NIST SP 800-52 Rev. 2 (Aug. 2019).'
                },
                {
                    q: 'Was ist ein X.509-Zertifikat, und welche Rolle spielen Zertifizierungsstellen (CAs) in einer PKI?',
                    h: 'CA signiert eine Bindung Identität ↔ Public Key.',
                    s: 'Ein <strong>X.509-Zertifikat</strong> (ITU-T X.509 v3 / RFC 5280) bindet eine Identität (Subject, z.B. ein Domainname) an einen öffentlichen Schlüssel, signiert von einer <em>Certificate Authority (CA)</em>. Inhalt: Subject, Issuer, Public Key, Gültigkeitszeitraum, Serial Number, SANs, Extensions, CA-Signatur.<br>Vertrauensmodell: <em>Trust Anchors</em> (Root-CAs) sind im Betriebssystem/Browser vorinstalliert. Ihre Schlüssel signieren Intermediate-CAs, diese signieren End-Entity-Zertifikate. Validierung: Client baut Kette bis zu einem Trust Anchor und prüft Signaturen + Gültigkeit + Sperrstatus (CRL/OCSP).<br>Schwächen: kompromittierte CA → komplettes Vertrauensnetz betroffen (DigiNotar 2011). Gegenmaßnahmen: Certificate Transparency Logs (RFC 6962), HSTS, HPKP (deprecated).<br><em>Quelle:</em> RFC 5280 "Internet X.509 PKI Certificate and CRL Profile" (Mai 2008); CA/Browser Forum Baseline Requirements v2.x; RFC 6962 (Certificate Transparency).'
                },
                {
                    q: 'Was unterscheidet einen Pseudozufallsgenerator (CSPRNG) von einem nicht-kryptographischen PRNG wie <code>Math.random()</code> oder Mersenne-Twister?',
                    h: 'CSPRNG: Ausgabe nicht von echtem Zufall unterscheidbar, Zustand nicht aus Ausgabe rückrechenbar.',
                    s: '<strong>Nicht-kryptographischer PRNG</strong> (Mersenne-Twister, LCG, Xorshift): aus einer kurzen Sequenz lässt sich der interne Zustand rekonstruieren $\\Rightarrow$ alle künftigen Werte vorhersagbar. Schlecht für Schlüssel, Nonces, Tokens.<br><strong>CSPRNG</strong> (z.B. AES-CTR-DRBG, HMAC-DRBG, Hash-DRBG nach NIST SP 800-90A Rev. 1; <code>/dev/urandom</code>, <code>getrandom(2)</code>, Windows <code>BCryptGenRandom</code>): Ausgabe ununterscheidbar von Uniform unter polynomialer Berechnung; Zustand kann nicht aus Ausgabe rückgerechnet werden (Backward Secrecy).<br>Praxisregel: für jedes Krypto-Material ausschließlich CSPRNG des Betriebssystems verwenden; nie eigene PRNGs basteln.<br><em>Quelle:</em> NIST SP 800-90A Rev. 1 (Juni 2015), §7-10; Heninger et al. "Mining Your Ps and Qs", USENIX Security 2012 (Folgen schwacher Zufalls-Initialisierung in eingebetteten Geräten).'
                },
                {
                    q: 'Was bedeutet Perfect Forward Secrecy (PFS), und welche Schlüsselaustauschverfahren bieten sie?',
                    h: 'Kompromittierter Langzeit-Schlüssel ermöglicht <em>nicht</em> Entschlüsselung aufgezeichneten Verkehrs.',
                    s: 'Bei <strong>PFS</strong> wird der Sitzungsschlüssel aus <em>ephemeren</em> (kurzlebigen) Schlüsseln abgeleitet, die nach der Sitzung gelöscht werden. Kompromittiert ein Angreifer später den Langzeit-Schlüssel (z.B. Server-Private-Key), kann er aufgezeichneten Verkehr trotzdem nicht entschlüsseln.<br>Bietet PFS: <em>DHE</em> (ephemeres Diffie-Hellman), <em>ECDHE</em> (ephemeres EC-DH). Beide erzeugen pro Sitzung neue Schlüsselpaare.<br>Bietet KEINE PFS: <em>statisches RSA-Key-Exchange</em> (TLS ≤ 1.2 RSA-Cipher-Suite), bei dem der Client den Premaster-Secret mit dem statischen Server-Public-Key verschlüsselt → Server-Private-Key bricht alles im Nachhinein. Daher in TLS 1.3 verboten.<br><em>Quelle:</em> Diffie/van Oorschot/Wiener "Authentication and authenticated key exchanges", Des. Codes Cryptogr. 2 (1992); RFC 8446 §1.2 (TLS 1.3 forbids non-PFS exchanges).'
                },
                {
                    q: 'Was unterscheidet eine symmetrische von einer asymmetrischen Chiffre, und in welchen Szenarien werden sie kombiniert ("Hybrid-Verschlüsselung")?',
                    h: 'Symmetrisch: ein Schlüssel, schnell. Asymmetrisch: Paar, langsam. Hybrid: KEM/DEM-Prinzip.',
                    s: '<strong>Symmetrisch</strong> (AES, ChaCha20): Sender und Empfänger teilen denselben geheimen Schlüssel $K$. Sehr schnell (~10 GB/s mit AES-NI), aber Schlüsseltransport-Problem: $K$ muss vorab sicher geteilt werden.<br><strong>Asymmetrisch</strong> (RSA, ECC, Kyber): jedes Schlüsselpaar $(pk, sk)$. Verschlüsselung mit $pk$, Entschlüsselung mit $sk$. Löst Schlüsseltransport (öffentlich verteilbar), aber $\\sim 10^3$-fach langsamer pro Byte und limitiert in Nachrichtengröße (RSA-2048: max 256 B).<br><strong>Hybrid (KEM/DEM-Prinzip)</strong>: Sender erzeugt einen zufälligen Session-Key $K_\\text{sess}$, verschlüsselt die Nachricht symmetrisch (DEM = Data Encapsulation Mechanism, z.B. AES-GCM) und transportiert $K_\\text{sess}$ asymmetrisch (KEM = Key Encapsulation Mechanism, z.B. RSA-OAEP, ECIES, ML-KEM). Vorteile: kurze RSA-Operation + voller Symmetrisch-Durchsatz. So funktionieren TLS, S/MIME, PGP, Signal, Age, SSH.<br><em>Quelle:</em> Cramer/Shoup "A Practical Public Key Cryptosystem Provably Secure against Adaptive Chosen Ciphertext Attack", CRYPTO 1998 (KEM/DEM-Formalismus); RFC 8446 §7 (TLS 1.3); Boneh/Shoup "A Graduate Course in Applied Cryptography" (2023), §11.'
                }
            ],
            // L2
            [
                {
                    q: 'Diffie-Hellman: $p=11$, $g=2$, Alice $a=3$, Bob $b=4$. Berechne den geteilten Schlüssel $S$.',
                    h: '$A=g^a\\bmod p$, $B=g^b\\bmod p$, $S=B^a=A^b\\bmod p$.',
                    s: '$A=2^3\\bmod 11=8$. $B=2^4\\bmod 11=16\\bmod 11=5$.<br>Alice: $S=B^a=5^3=125\\bmod 11=125-11\\cdot 11=4$.<br>Bob: $S=A^b=8^4=4096\\bmod 11$. $4096/11=372{,}\\!36\\Rightarrow 372\\cdot 11=4092\\Rightarrow 4096-4092=4$.<br>$$\\boxed{S=4}$$'
                },
                {
                    q: 'Bestimme das modulare Inverse von $7\\bmod 26$ mit dem erweiterten Euklidischen Algorithmus.',
                    h: '$\\gcd(7,26)=1$. Suche $s,t$ mit $7s+26t=1$.',
                    s: 'Euklid: $26=3\\cdot 7+5$; $7=1\\cdot 5+2$; $5=2\\cdot 2+1$; $2=2\\cdot 1+0$.<br>Rückwärts: $1=5-2\\cdot 2 = 5 - 2(7-5)=3\\cdot 5 - 2\\cdot 7 = 3(26-3\\cdot 7)-2\\cdot 7 = 3\\cdot 26 - 11\\cdot 7$.<br>Also $-11\\cdot 7\\equiv 1\\pmod{26}\\Rightarrow 7^{-1}\\equiv -11\\equiv 15\\pmod{26}$.<br>Probe: $7\\cdot 15=105 = 4\\cdot 26 + 1$.<br>$$\\boxed{7^{-1}\\equiv 15\\pmod{26}}$$'
                },
                {
                    q: 'Vollständiges RSA-Beispiel: $p=3$, $q=11$, $e=3$. Berechne $d$ und chiffriere $m=4$.',
                    h: '$\\varphi=20$. $d\\equiv e^{-1}\\pmod{20}$. $c=m^e\\bmod N$.',
                    s: '$3d\\equiv 1\\pmod{20}$. Probieren: $3\\cdot 7=21\\equiv 1$. $\\Rightarrow d=7$.<br>$c=4^3 \\bmod 33 = 64 \\bmod 33 = 64-33=31$.<br>Probe: $c^d\\bmod N = 31^7 \\bmod 33$. Schrittweise: $31\\equiv -2\\pmod{33}$. $(-2)^7=-128 \\equiv -128 + 4\\cdot 33 = -128+132 = 4 = m$.<br>$$\\boxed{d=7,\\ c=31}$$'
                },
                {
                    q: 'Wie groß muss eine SHA-Ausgabe mindestens sein, damit eine Kollisions-Brute-Force im Mittel mind. $2^{64}$ Hashes braucht?',
                    h: 'Geburtstagsparadoxon: Kollision nach $\\sim 2^{n/2}$ Hashes.',
                    s: '$2^{n/2}\\ge 2^{64}\\Rightarrow n\\ge 128$. Praktisch SHA-256 (128-Bit Kollisionssicherheit).<br>$$\\boxed{n=128\\,\\text{Bit minimum (Hashlänge)}}$$'
                },
                {
                    q: 'Schnelle Modulare Exponentiation: berechne $5^{13}\\bmod 7$ via Square-and-Multiply.',
                    h: 'Binärdarstellung Exponent: $13=1101_2$. Quadrieren bei jedem Bit, multiplizieren bei 1-Bit.',
                    s: 'Bit für Bit (MSB→LSB), Akkumulator $r=1$.<br>Bit 1 (1): $r=1^2\\cdot 5=5$.<br>Bit 1 (1): $r=5^2\\cdot 5=125\\bmod 7=125-17\\cdot 7=125-119=6$.<br>Bit 0 (0): $r=6^2 = 36\\bmod 7=1$.<br>Bit 1 (1): $r=1^2\\cdot 5=5$.<br>$$\\boxed{5^{13}\\equiv 5\\pmod 7}$$'
                },
                {
                    q: 'Warum ist ECB-Modus (Electronic Codebook) bei Block-Chiffren unsicher? Welche Modi werden bevorzugt?',
                    h: 'Gleiche Klartextblöcke ergeben gleiche Chiffrate $\\Rightarrow$ Strukturmuster erkennbar.',
                    s: 'ECB: $C_i=E_K(M_i)$ — gleiche Klartextblöcke führen zu gleichen Chiffratblöcken. Bilder erkennt man weiterhin (klassisches Pinguin-Beispiel).<br>Bevorzugte Modi: <strong>CBC</strong> (Verkettung mit IV), <strong>CTR</strong> (Counter, parallelisierbar), <strong>GCM</strong> (CTR + Authentifizierung). GCM ist heute Standard für TLS.'
                },
                {
                    q: 'Warum ist CTR-Nonce-Wiederverwendung katastrophal? Demonstriere mit zwei Klartexten $M_1, M_2$ und identischem Keystream $K$.',
                    h: 'Stromchiffre-Eigenschaft: $C_i = M_i \\oplus K$.',
                    s: 'Bei gleicher Nonce: $C_1=M_1\\oplus K$, $C_2=M_2\\oplus K$.<br>$\\Rightarrow C_1\\oplus C_2 = M_1\\oplus M_2$ — der Keystream verschwindet, die XOR-Summe der Klartexte ist öffentlich!<br>Bei strukturierten Klartexten (ASCII, Header) lassen sich beide aus diesem XOR rekonstruieren (Crib-Dragging). Lesson: Nonce <em>nie</em> wiederverwenden — eindeutige Counter oder Random-96-Bit (GCM) sind Pflicht.'
                },
                {
                    q: 'HMAC: berechne $\\text{HMAC}_K(m)$ schematisch und erkläre, warum naive $H(K\\,\\|\\,m)$ unsicher ist.',
                    h: 'Length-Extension-Angriff bei Merkle-Damgård-Hashes (SHA-1, SHA-256).',
                    s: 'HMAC: $H((K\\oplus opad)\\,\\|\\,H((K\\oplus ipad)\\,\\|\\,m))$ mit $opad=0x5c\\dots$, $ipad=0x36\\dots$.<br>Naive $H(K\\,\\|\\,m)$: Angreifer kennt $H(K\\,\\|\\,m)$ und kann ohne $K$ einen gültigen Tag für $m\\,\\|\\,\\text{padding}\\,\\|\\,m\\\'$ berechnen (Length-Extension), da der interne Hashzustand vorhersehbar fortgesetzt werden kann.<br>HMACs doppelter Hash unterbindet diesen Angriff.'
                },
                {
                    q: 'PBKDF2 vs. Argon2: welche Parameter erhöhen die Brute-Force-Kosten, und welcher KDF ist heute empfohlen?',
                    h: 'Iterationen, Speicher-Hardness, Parallelität.',
                    s: 'PBKDF2: nur Iterationen $t$ (CPU-bound). GPUs/ASICs sind ~1000× schneller als CPUs $\\Rightarrow$ Brute-Force begünstigt.<br>Argon2 (Argon2id empfohlen): zusätzlich Speicher-Hardness $m$ und Parallelität $p$. ASICs/GPUs verlieren Vorteil, weil Speicher teuer ist.<br>OWASP 2024: <strong>Argon2id</strong> (m=19 MiB, t=2, p=1) oder scrypt; PBKDF2-HMAC-SHA-256 mit $\\ge 600\\,000$ Iterationen nur für Legacy.'
                },
                {
                    q: 'ECDSA-Signatur (skizziert): warum führt eine wiederverwendete Nonce $k$ zur Schlüssel-Extraktion?',
                    h: 'Zwei Signaturen $(r,s_1),(r,s_2)$ mit gleichem $r$ ergeben System für $d$.',
                    s: 'ECDSA: $r = (kG)_x\\bmod n$, $s = k^{-1}(H(m)+r d)\\bmod n$.<br>Bei Wiederverwendung: $s_1-s_2 = k^{-1}(H(m_1)-H(m_2))\\Rightarrow k = (H(m_1)-H(m_2))/(s_1-s_2)$. Mit $k$ folgt $d = (s_1 k - H(m_1))/r$.<br>Praxis-Beispiel: PS3-Master-Key 2010 (Sony nutzte konstantes $k$).<br>Empfehlung: deterministisches ECDSA nach RFC 6979 oder Ed25519, das diese Klasse von Bugs ausschließt.'
                },
                {
                    q: 'Berechne den modularen Logarithmus $\\log_2 x \\equiv ?\\pmod{11}$ für $x=8$ via Baby-Step-Giant-Step (oder einfach durch Probieren).',
                    h: '$2^a\\equiv 8\\pmod{11}$. Probieren: $a=1,2,3,...$',
                    s: '$2^1=2$, $2^2=4$, $2^3=8$.<br>$$\\boxed{\\log_2 8\\equiv 3\\pmod{11}}$$ Hinweis: Ordnung von 2 mod 11: $2^{10}=1024\\equiv 1$, also Ordnung teilt 10. Tatsächlich Ordnung 10 (2 ist Primitivwurzel mod 11).'
                },
                {
                    q: 'AES-128 hat 10 Runden. Skizziere eine vollständige Runde und nenne die vier Transformationen.',
                    h: 'SubBytes → ShiftRows → MixColumns → AddRoundKey.',
                    s: 'AES (FIPS 197, 2001) arbeitet auf einem $4\\times 4$-State (16 Byte). Pro Runde:<br>1) <strong>SubBytes</strong>: jedes Byte durch eine S-Box ersetzt (inverse Multiplikation in $GF(2^8)$ + affine Abbildung). Nichtlinear, schützt gegen lineare/differenzielle Kryptanalyse.<br>2) <strong>ShiftRows</strong>: Zeile $i$ wird zyklisch um $i$ Bytes nach links rotiert. Erzeugt Diffusion über Spalten.<br>3) <strong>MixColumns</strong>: jede Spalte wird mit einer festen MDS-Matrix in $GF(2^8)$ multipliziert (Maximum Distance Separable Code, garantiert volle Diffusion). Entfällt in der letzten Runde!<br>4) <strong>AddRoundKey</strong>: XOR mit Rundenschlüssel.<br>Schlüsselplan: Key Expansion erzeugt $N_r+1$ Rundenschlüssel à 128 Bit. AES-128: 10 Runden + initiales AddRoundKey; AES-192: 12; AES-256: 14.<br><em>Quelle:</em> NIST FIPS 197 "Advanced Encryption Standard" (26.11.2001), §5; Daemen/Rijmen "The Design of Rijndael", 2. Aufl. (2020).'
                },
                {
                    q: 'AES-GCM: skizziere die Berechnung des Authentifizierungs-Tags. Welche Rolle spielen $H$, $J_0$ und GHASH?',
                    h: 'GHASH = polynomielle Auswertung in $GF(2^{128})$.',
                    s: 'AES-GCM (NIST SP 800-38D) kombiniert AES-CTR-Verschlüsselung mit einem polynomiellen MAC namens <em>GHASH</em>.<br>1) Hash-Subkey: $H = \\text{AES}_K(0^{128})$.<br>2) Counter-Block-Initialwert $J_0$: bei 96-Bit-IV $J_0 = \\text{IV}\\,\\|\\,0^{31}\\|1$.<br>3) Klartext wird mit Counter-Modus verschlüsselt: $C_i = P_i \\oplus \\text{AES}_K(\\text{inc}_{32}^i(J_0))$.<br>4) GHASH über Associated Data $A$ und Chiffrat $C$: $X = \\sum_{i=1}^m B_i\\cdot H^{m-i+1}$ in $GF(2^{128})$ mit Reduktionspolynom $x^{128}+x^7+x^2+x+1$. Die Blöcke $B_i$ sind $A_1,\\ldots,C_1,\\ldots,\\text{len}(A)\\|\\text{len}(C)$.<br>5) Tag $T = X \\oplus \\text{AES}_K(J_0)$.<br>Sicherheit ist eng an die Eindeutigkeit der Nonce gekoppelt — bei Wiederverwendung lässt sich $H$ und damit ein Forgery rekonstruieren (Joux "Authentication Failures in NIST version of GCM", NIST Workshop 2006).<br><em>Quelle:</em> NIST SP 800-38D "GCM and GMAC" (Nov. 2007), §6-7; McGrew/Viega "The Galois/Counter Mode of Operation" (2004).'
                },
                {
                    q: 'Erkläre den Padding-Oracle-Angriff gegen CBC. Warum sind <em>"MAC then Encrypt"</em>-Konstruktionen besonders anfällig?',
                    h: 'Server verrät über Padding-Fehlermeldung, ob Klartext-Padding gültig ist — Byte für Byte entschlüsselbar.',
                    s: 'CBC entschlüsselt Block für Block: $P_i = D_K(C_i)\\oplus C_{i-1}$. Bei PKCS#7-Padding (RFC 5652) muss der letzte Block mit $n$ Bytes je Wert $n$ enden.<br>Angriff (Vaudenay 2002): Angreifer modifiziert $C_{i-1}$ Byte für Byte und beobachtet, ob der Server "Padding invalid" oder "MAC invalid" meldet (oder unterschiedliche Antwortzeiten). Bei "Padding valid" kennt er das Klartext-Byte modulo des bekannten Pad-Werts. Aufwand: $\\le 256$ Versuche pro Byte $\\Rightarrow$ vollständige Entschlüsselung in $O(L\\cdot 128)$ Anfragen.<br>"MAC then Encrypt" (alt-TLS, IPsec ESP) macht den MAC-Check <em>nach</em> Padding-Strip — Padding-Oracle bleibt offen. "Encrypt then MAC" (IPsec AH, AEAD-Modi) prüft zuerst Integrität, dann Padding — kein Oracle.<br>Reale Angriffe: POODLE (SSL 3.0, 2014), Lucky-13 (TLS, 2013).<br><em>Quelle:</em> S. Vaudenay "Security Flaws Induced by CBC Padding", EUROCRYPT 2002; AlFardan/Paterson "Lucky Thirteen", IEEE S&P 2013; H. Krawczyk "The Order of Encryption and Authentication", CRYPTO 2001.'
                },
                {
                    q: 'Vergleiche das Merkle-Damgård-Konstrukt (SHA-1, SHA-256) mit der Sponge-Konstruktion (SHA-3/Keccak).',
                    h: 'Iterierte Kompressionsfunktion vs. Absorb/Squeeze mit Permutation.',
                    s: '<strong>Merkle-Damgård (1979)</strong>: $h_i = f(h_{i-1}, m_i)$ mit Kompressionsfunktion $f$ und festem IV $h_0$. Padding (Länge am Ende, Merkle-Damgård-Strengthening) sichert gegen einige Erweiterungsangriffe — aber nicht alle: SHA-256 ist <em>length-extension-anfällig</em> ($H(K\\|m)$ darf nicht als MAC verwendet werden!). Genutzt in MD5, SHA-1, SHA-2.<br><strong>Sponge (Bertoni/Daemen/Peeters/Van Assche, 2007)</strong>: Zustand $r+c$ Bit; Absorb-Phase XORt Nachrichtenblöcke in die ersten $r$ Bit und wendet eine Permutation $f$ an; Squeeze-Phase liest beliebig viele $r$-Bit-Blöcke aus. Bei Keccak: $1600$-Bit-State, Permutation Keccak-$f[1600]$. Vorteile: keine Length-Extension, beliebige Ausgabelänge (Shake-128/256), unifiziertes Hash + KDF + Stream.<br><em>Quelle:</em> NIST FIPS 202 "SHA-3 Standard" (Aug. 2015), §5-6; Bertoni et al. "Cryptographic Sponge Functions" Version 0.1 (Jan. 2011).'
                },
                {
                    q: 'HKDF (RFC 5869) hat zwei Stufen: Extract und Expand. Welchen Zweck erfüllt jede Stufe, und warum sind beide nötig?',
                    h: 'Extract gleicht Entropie aus, Expand streckt auf gewünschte Länge.',
                    s: '<strong>Extract</strong>: $\\text{PRK} = \\text{HMAC}(\\text{salt}, \\text{IKM})$. Verwandelt potentiell <em>unausgeglichenes</em> Input-Keying-Material (IKM, z.B. DH-Shared-Secret mit verzerrter Verteilung) in einen <em>pseudozufälligen</em> Schlüssel (PRK). Der Salt darf öffentlich sein und sollte zufällig oder zumindest kontextabhängig sein.<br><strong>Expand</strong>: $T_i = \\text{HMAC}(\\text{PRK}, T_{i-1}\\,\\|\\,\\text{info}\\,\\|\\,i)$, Output = $T_1\\|T_2\\|\\ldots$ bis gewünschte Länge. Liefert <em>mehrere</em> unabhängige Schlüssel aus einem PRK; <code>info</code> trennt Kontext ("client_handshake_traffic", "server_application_traffic").<br>Beide nötig, weil DH-Output zwar 256 Bit lang ist, aber nur ~128 Bit Entropie hat und keine Unabhängigkeit zwischen Bits garantiert. Naives Truncate würde Strukturreste durchreichen. Modell (Krawczyk 2010): Extract = Randomness Extractor, Expand = PRF.<br><em>Quelle:</em> H. Krawczyk "Cryptographic Extraction and Key Derivation: The HKDF Scheme", CRYPTO 2010 / RFC 5869 (Mai 2010).'
                },
                {
                    q: 'Diffie-Hellman: warum ist der Schlüsselaustausch ohne Authentifizierung anfällig für einen Man-in-the-Middle-Angriff, und welche Gegenmaßnahmen gibt es?',
                    h: 'Alice und Bob handeln zwei DH mit Mallory aus, ohne es zu merken.',
                    s: '<strong>Angriff:</strong> Alice $\\to$ Mallory $\\to$ Bob: Mallory fängt Alices Public $A=g^a$ ab und sendet Bob sein eigenes $M=g^m$; analog umgekehrt. Resultat: zwei separate DH-Schlüssel $g^{am}$ (Alice↔Mallory) und $g^{bm}$ (Bob↔Mallory). Mallory liest und re-verschlüsselt jeden Verkehr unmerklich.<br>Ursache: <em>passives</em> DH liefert nur Vertraulichkeit gegen Lauscher, aber keine <em>Authentifizierung</em> der Gegenseite.<br><strong>Gegenmaßnahmen:</strong> 1) Signierter DH: jede Seite signiert ihren DH-Anteil mit Langzeitschlüssel (STS-Protokoll, TLS-Certificate-Verify). 2) PAKE (z.B. SPAKE2, OPAQUE, J-PAKE) — Authentifizierung über gemeinsames Passwort. 3) Vorab-geteilte Schlüssel (TLS-PSK). 4) Identity-basierte Krypto (Boneh-Franklin IBE).<br><em>Quelle:</em> Diffie/Hellman "New Directions in Cryptography", IEEE T-IT 22(6), Nov. 1976; Diffie/van Oorschot/Wiener "Authentication and authenticated key exchanges", DCC 2(2), 1992 (STS-Protokoll).'
                },
                {
                    q: 'Warum ist "Textbook-RSA" $c = m^e\\bmod N$ unsicher, und welches Padding verwendet RSA-OAEP?',
                    h: 'Textbook-RSA ist deterministisch und multiplikativ — RSA-OAEP randomisiert + macht es IND-CCA-sicher.',
                    s: '<strong>Textbook-RSA-Schwächen:</strong> 1) <em>Deterministisch</em>: gleicher Klartext erzeugt gleiches Chiffrat ($\\Rightarrow$ kein semantisches Geheimnis bei kleinem Nachrichtenraum). 2) <em>Multiplikativ</em>: $c_1\\cdot c_2 = (m_1 m_2)^e\\bmod N$ (Hilfe für chosen-ciphertext Angriffe). 3) <em>Kleine Nachricht, kleines $e$</em>: $m < N^{1/e}\\Rightarrow c=m^e$ ohne Modulo $\\Rightarrow$ $m=\\sqrt[e]{c}$ in $\\mathbb{Z}$. 4) Coppersmith-Angriffe für strukturierten Klartext.<br><strong>RSA-OAEP</strong> (Bellare/Rogaway 1994; PKCS#1 v2.x, RFC 8017): kodiere $m$ mit Zufall $r$ als $\\text{EM} = (\\text{maskedSeed}\\|\\text{maskedDB})$ via Mask Generation Function (MGF1 auf SHA-256). Erst dann $c=\\text{EM}^e\\bmod N$. Liefert IND-CCA2-Sicherheit im Random-Oracle-Modell. PKCS#1 v1.5 ist <em>nicht</em> IND-CCA-sicher (Bleichenbacher 1998, ROBOT 2017).<br><em>Quelle:</em> RFC 8017 "PKCS #1 v2.2", §7-8; Bellare/Rogaway "Optimal Asymmetric Encryption", EUROCRYPT 1994; D. Bleichenbacher CRYPTO 1998.'
                },
                {
                    q: 'Was bedeutet der Begriff <em>Sicherheitsniveau</em> ($\\lambda$ Bit) eines Verfahrens, und welches Niveau bieten AES-128, RSA-3072, ECC-256 nach NIST 2024?',
                    h: '$\\lambda$ = Bit-Aufwand des besten bekannten Angriffs. NIST: alle drei rund 128 Bit.',
                    s: '<strong>Sicherheitsniveau</strong> $\\lambda$: Verfahren bietet $\\lambda$ Bit Sicherheit, wenn der beste bekannte Angriff $\\approx 2^\\lambda$ elementare Operationen benötigt.<br>NIST SP 800-57 Pt. 1 Rev. 5, Tab. 2 (2020):<br>$\\bullet$ AES-128: 128 Bit (Brute-Force-Suche).<br>$\\bullet$ AES-192: 192 Bit, AES-256: 256 Bit.<br>$\\bullet$ RSA-2048: ~112 Bit (best NFS-Sieving-Estimate); RSA-3072: ~128 Bit; RSA-7680: ~192 Bit.<br>$\\bullet$ ECC mit 256-Bit-Kurve (P-256, secp256k1, Curve25519): ~128 Bit (Pollard-Rho $O(\\sqrt n)$).<br>$\\bullet$ Hash für 128-Bit-<em>Kollisionsresistenz</em>: SHA-256 (Geburtstag $2^{128}$).<br>Bestimmt durch das schwächste Glied: ein TLS-Handshake mit RSA-2048-Cert (112 Bit) + AES-128-GCM (128 Bit) liefert insgesamt 112 Bit.<br><em>Quelle:</em> NIST SP 800-57 Pt. 1 Rev. 5 (Mai 2020), Tab. 2 & §5.6.1; ENISA "Algorithms, key size and parameters report" 2014.'
                },
                {
                    q: 'Warum ist die SHA-1-Schwäche kein "Theorie-Problem"? Was zeigte SHAttered (2017) konkret?',
                    h: 'Zwei reale PDFs mit identischem SHA-1, aber unterschiedlichem Inhalt.',
                    s: 'SHA-1 (160 Bit) bietet theoretisch $2^{80}$ Kollisionsresistenz. Stevens/Bursztein/Karpman/Albertini/Markov (CRYPTO 2017, "The first collision for full SHA-1", "SHAttered") fanden eine reale Kollision in $\\approx 2^{63}$ Auswertungen (durch identische-Prefix-Kollisionsangriff auf reduzierte Permutationen). Konkret: zwei PDF-Dateien (shattered-1.pdf, shattered-2.pdf, 422 kB) mit unterschiedlichem visuellem Inhalt, aber identischem SHA-1-Hash.<br>Auswirkungen: Git-Commits (bis 2.x), TLS/SSH-Zertifikate, Subversion-Repos. Reaktion: NIST verbot SHA-1-Signaturen ab 2014 für neue Anwendungen (SP 800-131A); CA/Browser Forum hatte SHA-1-Zertifikate bis 1.1.2017 ausgephased. Nachfolger 2020: SHAmbles (Chosen-Prefix-Kollision für $\\$45\\,000$, Leurent/Peyrin).<br><em>Quelle:</em> Stevens et al., CRYPTO 2017 / shattered.io; G. Leurent, T. Peyrin "SHA-1 is a Shambles", USENIX Security 2020.'
                },
                {
                    q: 'AES-NI (Intel/AMD seit 2010): welche Operationen werden in Hardware ausgeführt, und welcher Faktor an Beschleunigung wird typisch erreicht?',
                    h: 'AESENC, AESENCLAST, AESDEC, AESDECLAST, AESKEYGENASSIST, AESIMC. ~5-10× schneller.',
                    s: '<strong>AES-NI</strong> (Westmere 2010 / Bulldozer 2011, Intel SDM Vol. 2A) liefert sechs Instruktionen:<br>$\\bullet$ <code>AESENC</code> / <code>AESENCLAST</code> — eine AES-Runde (mit/ohne MixColumns).<br>$\\bullet$ <code>AESDEC</code> / <code>AESDECLAST</code> — Inverse.<br>$\\bullet$ <code>AESKEYGENASSIST</code> — Schritte des Key Schedule.<br>$\\bullet$ <code>AESIMC</code> — Inverse MixColumns für Equivalent-Inverse-Cipher.<br>Effekte: 1) ~5-10× Durchsatz im Vergleich zu Software-AES; ~3 GB/s pro Kern bei AES-128-CBC, ~6 GB/s bei AES-NI + CLMUL für GCM. 2) Konstantzeit — schützt gegen Cache-Timing-Angriffe (Bernstein 2005, Osvik/Shamir/Tromer 2006), die T-Tabellen-Implementierungen plagen. 3) Pipelining mehrerer paralleler Counter-Mode-Blöcke.<br>Analog: ARMv8 Crypto Extensions (<code>AESE/AESMC</code>, seit 2013), Cortex-A53+.<br><em>Quelle:</em> Intel "AES Instructions Set" Whitepaper, Rev. 3.01 (2012); ARM Architecture Reference Manual ARMv8-A, §C7.2.AES*.'
                },
                {
                    q: 'Was ist eine differenzielle Kryptanalyse (Biham/Shamir, 1990)? Welches Maß bewertet die Resistenz einer S-Box?',
                    h: 'Statistik über Differenzen $(\\Delta P, \\Delta C)$ in Klartext/Chiffrat-Paaren; Differenz-Uniformität $\\delta$.',
                    s: '<strong>Differenzielle Kryptanalyse</strong> (Biham/Shamir CRYPTO 1990): Angreifer wählt Klartextpaare $(P_1,P_2)$ mit fester Eingabe-Differenz $\\Delta P = P_1\\oplus P_2$ und beobachtet die Häufigkeit, mit der eine bestimmte Ausgabe-Differenz $\\Delta C$ entsteht. Wenn ein <em>differenzieller Charakteristik</em> mit Wahrscheinlichkeit $p\\gg 2^{-n}$ existiert, lässt sich mit $\\approx 1/p$ Paaren der Rundenschlüssel der letzten Runde rekonstruieren.<br><strong>S-Box-Resistenz:</strong> Differenz-Uniformität $\\delta = \\max_{a\\neq 0, b}\\#\\{x : S(x)\\oplus S(x\\oplus a) = b\\}$. Klein = gut. AES-S-Box: $\\delta=4$ (optimal wäre $\\delta=2$, AES verwendet Nyberg-Konstruktion über $GF(2^8)$-Inversion).<br>Schwester-Verfahren: <em>lineare Kryptanalyse</em> (Matsui 1993) via lineare Approximationen $\\alpha\\cdot P\\oplus\\beta\\cdot C\\oplus\\gamma\\cdot K=0$ mit Bias $\\varepsilon$. AES wurde von Anfang an so entworfen, dass Vier-Runden-Differentielle/Lineare-Charakteristiken Wahrscheinlichkeit $\\le 2^{-150}$ haben (Wide-Trail-Strategie).<br><em>Quelle:</em> Biham/Shamir "Differential Cryptanalysis of DES-like Cryptosystems", J. Cryptology 4(1), 1991; Matsui "Linear Cryptanalysis Method for DES Cipher", EUROCRYPT 1993; Daemen/Rijmen "The Design of Rijndael" 2. Aufl. (2020), Kap. 8-10.'
                },
                {
                    q: 'Was ist eine Length-Extension-Attacke gegen Merkle-Damgård-Hashes? Beweise, dass SHA-256 als $\\text{MAC}(K,m)=H(K\\|m)$ unsicher ist.',
                    h: 'Angreifer kann $H(K\\|m\\|\\text{pad}\\|m\\prime)$ berechnen, ohne $K$ zu kennen.',
                    s: '<strong>Length-Extension</strong>: Bei Merkle-Damgård ist der Output $h_n$ gleichzeitig der interne Zustand <em>nach</em> Verarbeitung des letzten Blocks. Wer $h_n = H(K\\|m)$ und die Länge $|K|+|m|$ kennt, kann den Hash <em>fortsetzen</em>: $H(K\\|m\\|\\text{glue-pad}\\|m\\prime)$ berechnen, indem er $h_n$ als IV nimmt und $m\\prime$ weiterverarbeitet — ohne $K$ zu kennen.<br><strong>Folge:</strong> "$\\text{MAC}(K,m) = H(K\\|m)$" ist trivial fälschbar. Angreifer sieht $(m, t)$ mit $t=H(K\\|m)$, berechnet $t\\prime = H(K\\|m\\|\\text{pad}\\|m\\prime)$ als $t\\prime = \\text{H-continue}(t, m\\prime)$ und gibt $(m\\|\\text{pad}\\|m\\prime, t\\prime)$ aus — ein gültiges MAC-Paar.<br><strong>Reale Folgen:</strong> Flickr-API 2009 (DKIM-Header-Substitution), Amazon-S3-Signaturen v2.<br><strong>Gegenmaßnahmen:</strong> HMAC (RFC 2104) verschachtelt zweimal: $\\text{HMAC}_K(m)=H((K\\oplus\\text{opad})\\|H((K\\oplus\\text{ipad})\\|m))$. Oder Sponge-basierte Hashes (SHA-3, BLAKE3) — bei ihnen ist der externe Output kürzer als der interne Zustand, daher keine Fortsetzung möglich.<br><em>Quelle:</em> Bellare/Canetti/Krawczyk "Keying Hash Functions for Message Authentication", CRYPTO 1996; RFC 2104; Ferguson/Schneier/Kohno "Cryptography Engineering" (2010), §5.3.'
                },
                {
                    q: 'AES-GCM Nonce-Wiederverwendung: warum ist sie katastrophal, und was sind nonce-misuse-resistente Alternativen?',
                    h: 'Zwei Klartexte mit gleicher Nonce → XOR der Keystreams; $H$ + GHASH rekonstruierbar.',
                    s: '<strong>Schaden bei Nonce-Reuse:</strong> Werden $(P_1, P_2)$ mit identischer Nonce verschlüsselt, ergibt $C_1\\oplus C_2 = P_1\\oplus P_2$ (Counter-Stream hebt sich auf). Mit etwas Klartextstruktur (ASCII, Headers, bekannte Bytes) ist $P_1, P_2$ rekonstruierbar — wie bei jedem Stream-Cipher.<br><strong>Schlimmer:</strong> aus $T_1, T_2$ und bekannten $C_1, C_2, A_1, A_2$ lässt sich der GHASH-Subkey $H$ als Wurzel eines Polynoms in $GF(2^{128})$ ermitteln (Joux 2006). Mit $H$ in der Hand kann Mallory <em>beliebige</em> Nachrichten unter dieser Nonce <em>fälschen</em> — d.h. Integrität ist ebenso verloren wie Vertraulichkeit.<br><strong>Praxisfälle:</strong> Bose/Hoang/Tessaro (EUROCRYPT 2018) zeigten, dass selbst $2^{32}$ zufällige 96-Bit-Nonces unter einem Schlüssel zu Kollisionen ~$2^{-32}$ pro Block führen — bei TLS-Sessions mit Milliarden Records ein reales Risiko.<br><strong>Misuse-resistente Alternativen:</strong> AES-GCM-SIV (RFC 8452, Apr. 2019, Gueron/Lindell): leitet pro Nachricht ein SIV-Nonce-Derivat ab; Wiederverwendung leakt nur Gleichheit, nicht Inhalt. ChaCha20-Poly1305-SIV (Draft). XChaCha20-Poly1305 (192-Bit-Nonce) — kollidiert praktisch nie.<br><em>Quelle:</em> A. Joux "Authentication Failures in NIST version of GCM", NIST Comments 2006; Bose/Hoang/Tessaro EUROCRYPT 2018; RFC 8452 "AES-GCM-SIV" (Apr. 2019).'
                }
            ],
            // L3
            [
                {
                    q: 'RSA-Sicherheit: Faktoreziere $N=143$ und beschreibe, wie damit der private Schlüssel rekonstruiert werden kann (gegeben $e=7$).',
                    h: 'Probedivisionen mit kleinen Primzahlen. Anschließend $d\\equiv e^{-1}\\pmod{\\varphi(N)}$.',
                    s: '$143=11\\cdot 13\\Rightarrow p=11,\\ q=13$.<br>$\\varphi(N)=10\\cdot 12=120$.<br>$d\\equiv 7^{-1}\\pmod{120}$: erw. Euklid: $\\gcd(7,120)=1$, $1=7\\cdot 103 - 120\\cdot 6$. Probe: $7\\cdot 103=721=6\\cdot 120+1$.<br>$$\\boxed{d=103}$$ Folgerung: kennt man die Faktoren von $N$, ist RSA gebrochen $\\Rightarrow$ Sicherheit beruht auf Schwierigkeit der Faktorisierung.'
                },
                {
                    q: 'Wende den Chinesischen Restsatz (CRT) an: löse $x\\equiv 2\\pmod 3$, $x\\equiv 3\\pmod 5$, $x\\equiv 2\\pmod 7$.',
                    h: 'CRT: $x=\\sum a_i M_i y_i\\pmod M$, $M=\\prod m_i$, $M_i=M/m_i$, $y_i=M_i^{-1}\\pmod{m_i}$.',
                    s: '$M=105$. $M_1=35,\\ M_2=21,\\ M_3=15$.<br>$y_1$: $35\\equiv 2\\pmod 3 \\Rightarrow y_1\\cdot 2\\equiv 1\\Rightarrow y_1=2$.<br>$y_2$: $21\\equiv 1\\pmod 5\\Rightarrow y_2=1$.<br>$y_3$: $15\\equiv 1\\pmod 7\\Rightarrow y_3=1$.<br>$x = 2\\cdot 35\\cdot 2 + 3\\cdot 21\\cdot 1 + 2\\cdot 15\\cdot 1 = 140+63+30 = 233$.<br>$233\\bmod 105 = 233-2\\cdot 105 = 23$.<br>$$\\boxed{x\\equiv 23\\pmod{105}}$$'
                },
                {
                    q: 'Hybridverschlüsselung in TLS: warum wird ein symmetrisches Verfahren (z.B. AES-GCM) verwendet, nachdem RSA/ECDH einen Schlüssel ausgehandelt hat?',
                    h: 'Performance-Argument plus Schlüssel-Größe.',
                    s: 'Asymmetrische Verfahren (RSA/ECC) sind 100&ndash;1000× langsamer als AES und auf kleine Datenmengen beschränkt (RSA-2048 max ~245 Byte). Daher: 1) Asym. Schlüsselaustausch / Authentifizierung, 2) gemeinsamer symmetrischer Sitzungsschlüssel, 3) AES-GCM verschlüsselt + authentifiziert die Nutzdaten effizient.<br>Vorteil: Kombination von Sicherheit (PKI) und Geschwindigkeit (symmetrisch).'
                },
                {
                    q: 'ElGamal-Verschlüsselung: $p=23$, $g=5$, privater Schlüssel des Empfängers $x=6$, $h=g^x\\bmod p$. Verschlüssele $m=10$ mit $k=3$.',
                    h: '$h=g^x$. Chiffrat: $(c_1,c_2)=(g^k,\\ m\\cdot h^k)\\bmod p$.',
                    s: 'Public key $h=5^6\\bmod 23$. $5^2=25\\equiv 2$, $5^4\\equiv 4$, $5^6\\equiv 5^4\\cdot 5^2 = 4\\cdot 2 = 8$.<br>$c_1=g^k=5^3=125\\bmod 23 = 125-5\\cdot 23=10$.<br>$h^k=8^3=512\\bmod 23$: $23\\cdot 22=506\\Rightarrow 512-506=6$.<br>$c_2=m\\cdot h^k = 10\\cdot 6 = 60\\bmod 23 = 60-2\\cdot 23 = 14$.<br>$$\\boxed{(c_1,c_2)=(10,\\ 14)}$$ Entschlüsselung: $m=c_2\\cdot c_1^{-x}\\bmod p$.'
                },
                {
                    q: 'Erkläre, warum ECC bei gleicher Sicherheit kleinere Schlüssel erlaubt als RSA, und vergleiche typische Schlüsselgrößen (NIST-Empfehlung).',
                    h: 'Diskreter Logarithmus auf elliptischen Kurven schwerer pro Bit. Vergleichstabelle.',
                    s: 'Beste bekannte Angriffe gegen ECC sind Pollard-Rho mit Aufwand $O(\\sqrt{n})$, während Faktorisierung (RSA) mit GNFS subexponentiell skaliert. Daher genügt ein deutlich kleinerer Modulus.<br>NIST-Vergleich (gleiches Sicherheitsniveau in Bit):<br>128-Bit Sicherheit: AES-128, RSA-3072, ECC-256.<br>192-Bit: AES-192, RSA-7680, ECC-384.<br>256-Bit: AES-256, RSA-15360, ECC-521.<br>$\\Rightarrow$ ECC: kleinere Schlüssel, schnellere Operationen, geringere Bandbreite.'
                },
                {
                    q: 'Quanten-Resilienz: welche heute verbreiteten Verfahren werden durch Shor-Algorithmus gebrochen, welche nicht? Welche Post-Quantum-Kandidaten sind bereits NIST-standardisiert?',
                    h: 'Shor: polynomial für Faktorisierung und diskrete Logarithmen. Symmetrische Verfahren via Grover nur quadratisch betroffen.',
                    s: 'Gebrochen durch Shor: <strong>RSA</strong>, <strong>DH</strong>, <strong>ECC</strong>, <strong>ECDSA</strong> (alle auf Faktorisierung/diskretem Log basierend).<br>Nur quadratisch geschwächt durch Grover: AES, SHA-2/3 — Verdopplung der Schlüssellänge bringt Sicherheit zurück.<br>NIST-PQC-Standards (2024): <strong>ML-KEM (Kyber)</strong> für Schlüsselkapselung, <strong>ML-DSA (Dilithium)</strong> und <strong>SLH-DSA (SPHINCS+)</strong> für Signaturen, <strong>FN-DSA (Falcon)</strong> in Vorbereitung. Migration empfohlen für Langzeit-vertrauliche Daten.'
                },
                {
                    q: 'Schnorr-Signatur: skizziere Signieren und Verifikation. Warum ist sie deterministisch + linear (Vorteil gegenüber ECDSA)?',
                    h: 'Schlüssel $(d, P=dG)$, Signatur $(R,s)$ mit $R=kG$, $e=H(R\\,\\|\\,P\\,\\|\\,m)$, $s=k+ed$.',
                    s: '<strong>Sign:</strong> Wähle $k$ (zufällig oder deterministisch RFC 6979). $R=kG$, $e=H(R\\|P\\|m)$, $s=k+e\\cdot d\\bmod n$. Signatur: $(R,s)$.<br><strong>Verify:</strong> $sG \\stackrel{?}{=} R + eP$.<br>Vorteile: <em>Linearität</em> $\\Rightarrow$ Schlüssel-Aggregation (MuSig), Batch-Verifikation, Threshold-Signaturen einfacher als bei ECDSA. Bitcoin Taproot (BIP-340) nutzt Schnorr seit 2021.<br>Patent abgelaufen 2008.'
                },
                {
                    q: 'Lattice-LWE: erkläre das LWE-Problem und warum es Quanten-resistent ist (Stichworte Worst-Case zu Average-Case-Reduktion).',
                    h: '$b = As+e \\bmod q$ mit kleinem Fehler $e$. Aufgabe: aus $(A,b)$ den Vektor $s$ rekonstruieren.',
                    s: 'LWE-Problem: gegeben $A\\in\\mathbb{Z}_q^{m\\times n}$ und $b=As+e\\bmod q$ mit Gauß-Fehler $e$, finde $s$. Ohne $e$ wäre es lineares Gleichungssystem (trivial); mit Fehler ist es nachweislich so schwer wie kürzeste-Vektor-Probleme (SVP) in Gittern im Worst-Case (Regev 2005).<br>Quanten-resistenz: kein bekannter Quantenalgorithmus bricht SVP polynomial. Shor wirkt nur auf Gruppen mit verborgenen Untergruppen (Faktorisierung, dlog).<br>Anwendung: ML-KEM (Kyber) basiert auf Modul-LWE; Hauptkandidat NIST PQC.'
                },
                {
                    q: 'Zero-Knowledge: erkläre Schnorr-Identifikation als Σ-Protokoll und beweise die drei Eigenschaften (Vollständigkeit, Soundness, Zero-Knowledge).',
                    h: 'Commitment-Challenge-Response: $R=kG$, $c$ Challenge, $s=k+cd$.',
                    s: '<strong>Protokoll:</strong> Prover kennt $d$ mit $P=dG$. 1) Sendet $R=kG$. 2) Verifier sendet zufällige Challenge $c$. 3) Prover antwortet $s=k+cd\\bmod n$. 4) Verifier prüft $sG=R+cP$.<br><strong>Vollständigkeit:</strong> ehrlicher Prover besteht: $sG=(k+cd)G=R+cP$.<br><strong>Soundness:</strong> kann Prover für 2 verschiedene Challenges $c_1\\neq c_2$ gültig antworten, lässt sich $d=(s_1-s_2)/(c_1-c_2)$ extrahieren $\\Rightarrow$ er kennt $d$.<br><strong>Zero-Knowledge (HVZK):</strong> Simulator wählt $s,c$ zufällig und setzt $R=sG-cP$ — Verteilung identisch, ohne $d$.<br>Fiat-Shamir: $c=H(R\\|P\\|m)$ macht es nicht-interaktiv $\\Rightarrow$ Schnorr-Signatur.'
                },
                {
                    q: 'Skizziere CRYSTALS-Kyber (ML-KEM, FIPS 203). Worauf beruht die Sicherheit, und wie sieht der KEM-Ablauf (KeyGen, Encaps, Decaps) aus?',
                    h: 'Modul-LWE über $R_q = \\mathbb{Z}_q[X]/(X^{256}+1)$ mit $q=3329$.',
                    s: '<strong>Sicherheit:</strong> Modul-LWE (M-LWE) im Ring $R_q=\\mathbb{Z}_q[X]/(X^{256}+1)$ mit $q=3329$. ML-KEM-768 ($k=3$, Modul $3\\times 3$) zielt auf NIST-Kategorie 3 ($\\approx$ AES-192).<br><strong>KeyGen:</strong> Wähle Zufallsmatrix $A\\in R_q^{k\\times k}$ aus Public Seed. Sample geheime Vektoren $s,e\\in R_q^k$ aus kleiner CBD-Verteilung. Public Key $t=A s + e\\bmod q$.<br><strong>Encaps:</strong> Sample $r,e_1,e_2$. Berechne $u = A^T r + e_1$, $v = t^T r + e_2 + \\lceil q/2\\rceil\\cdot m$, wobei $m\\in\\{0,1\\}^{256}$ ein zufällig gewähltes "shared secret". Verschlüsselungs-Ciphertext $(u,v)$ wird per FO-Transformation in IND-CCA-Form gebracht. Output: $K=\\text{KDF}(m\\|H(c))$.<br><strong>Decaps:</strong> $m\\prime = \\text{Compress}(v - s^T u)$. Re-Encrypt $m\\prime$ und vergleiche mit empfangenem $c$ (FO-Check) → bei Mismatch: liefere "implicit reject" $K\\prime=\\text{KDF}(z\\|H(c))$ statt Fehler. Schützt gegen CCA.<br><strong>Größen ML-KEM-768:</strong> Public Key 1184 B, Ciphertext 1088 B, Shared Secret 32 B.<br><em>Quelle:</em> NIST FIPS 203 "Module-Lattice-Based Key-Encapsulation Mechanism Standard" (13.8.2024), §6 & Anhang; Bos et al. "CRYSTALS-Kyber: a CCA-Secure Module-Lattice-Based KEM", IEEE EuroS&P 2018.'
                },
                {
                    q: 'CRYSTALS-Dilithium (ML-DSA, FIPS 204): wie funktioniert das Signaturverfahren auf Modul-LWE/SIS-Basis?',
                    h: 'Fiat-Shamir mit Abort: $z=y+c\\cdot s_1$, Rejection-Sampling.',
                    s: 'ML-DSA-65 (NIST Kategorie 3) arbeitet im Ring $R_q$ mit $q=8\\,380\\,417$, $n=256$, Modul-Dimension $(k,\\ell)=(6,5)$.<br><strong>KeyGen:</strong> $A\\leftarrow R_q^{k\\times\\ell}$ aus Seed, sample kurze Geheimnisse $s_1\\in R_q^\\ell$, $s_2\\in R_q^k$. Public $t=A s_1+s_2$, davon werden die High-Bits $t_1$ veröffentlicht (Komprimierung).<br><strong>Sign(m):</strong> Wiederhole: 1) Sample kurzes $y\\in R_q^\\ell$. 2) $w=A y$, $w_1=\\text{HighBits}(w)$. 3) Challenge $c=H(m\\|w_1)\\in B_\\tau$ (sparse $\\pm 1$-Polynom). 4) $z = y + c\\cdot s_1$. 5) <em>Rejection-Sampling</em>: falls $\\|z\\|_\\infty\\ge\\gamma_1-\\beta$ oder $\\|\\text{LowBits}(w-c s_2)\\|_\\infty\\ge\\gamma_2-\\beta$ — verwerfen und neu beginnen. (Sichert Zero-Knowledge: $z$-Verteilung unabhängig von $s_1$.) 6) Hint $h$ ermöglicht Rekonstruktion von $w_1$ aus $t_1$.<br><strong>Verify:</strong> Prüfe $H(m\\|\\text{HighBits}(A z-c t_1\\cdot 2^d, h))=c$ und Normgrenzen für $z$.<br>Sicherheit: M-LWE + M-SIS-Härte. Sigs ~3293 B, Public Key ~1952 B.<br><em>Quelle:</em> NIST FIPS 204 "Module-Lattice-Based Digital Signature Standard" (13.8.2024); Ducas et al. "CRYSTALS-Dilithium: A Lattice-Based Digital Signature Scheme", IACR TCHES 2018(1).'
                },
                {
                    q: 'FALCON (FN-DSA, FIPS 206 Entwurf) und SPHINCS+ (SLH-DSA, FIPS 205): warum hält NIST drei PQC-Signaturverfahren parallel?',
                    h: 'FALCON: NTRU-Gitter, kleine Sigs. SPHINCS+: hash-basiert, konservativer.',
                    s: '<strong>FALCON (FN-DSA):</strong> basiert auf NTRU-Gittern + Gaussian-Sampling (Klein/Babai-Schritt) für GPV-Hash-and-Sign. Signaturgröße ~666 B (Kategorie 1) — kleinste PQC-Sigs. <em>Nachteil:</em> Floating-Point-Sampler ist seitenkanalanfällig, Implementierung subtil.<br><strong>SPHINCS+ (SLH-DSA, FIPS 205, Aug. 2024):</strong> hash-basiert, baut auf WOTS+-Einmal-Signaturen und einer hypertree-Konstruktion auf. Sicherheit beruht <em>ausschließlich</em> auf Pre-Image/Kollisionsresistenz einer Hashfunktion (SHA-256, SHAKE) — keine algebraischen Strukturen, daher konservativste Wahl, falls Lattice-Brüche entdeckt werden. <em>Nachteil:</em> Sigs ~7,8-49 kB, Sign-Zeit ~10-100 ms.<br><strong>Warum drei?</strong> NIST diversifiziert: ML-DSA (Modul-Lattice, schnell, kleine Sigs für Standardgebrauch); FN-DSA (kleinste Sigs für constrained protocols); SLH-DSA (Hash-Backup, falls Lattice-Annahmen brechen). Empfehlung NIST IR 8413 (2022) und FIPS 205/206 Entwürfe (2024).<br><em>Quelle:</em> NIST FIPS 205 "Stateless Hash-Based Digital Signature Standard" (Aug. 2024); FIPS 206 Initial Public Draft "FALCON" (März 2024); NIST IR 8413 "Status Report on the Third Round of the PQC Standardization Process".'
                },
                {
                    q: 'Pohlig-Hellman-Algorithmus: wie lässt sich der diskrete Logarithmus in einer Gruppe mit glatter Ordnung effizient berechnen?',
                    h: 'CRT über Primfaktoren von $|G|$. Aufwand $O(\\sqrt{p_{\\max}})$.',
                    s: '<strong>Setup:</strong> $G=\\langle g\\rangle$ mit Ordnung $n = \\prod p_i^{e_i}$. Gesucht: $x=\\log_g h$, $0\\le x<n$.<br><strong>Algorithmus (Pohlig/Hellman 1978):</strong> Für jeden Primfaktor $p_i^{e_i}$: 1) Setze $g_i = g^{n/p_i^{e_i}}$, $h_i = h^{n/p_i^{e_i}}$. Dann hat $g_i$ Ordnung $p_i^{e_i}$. 2) Bestimme $x \\bmod p_i^{e_i}$ via $e_i$-faches Lösen eines DL-Problems in Ordnung $p_i$ (z.B. Baby-Step-Giant-Step oder Pollard-$\\rho$, Aufwand $O(\\sqrt{p_i})$). 3) Setze Ergebnisse via CRT zu $x \\bmod n$ zusammen.<br><strong>Gesamtaufwand:</strong> $O(\\sum_i e_i\\sqrt{p_i})$ — dominant ist der größte Primfaktor.<br><strong>Folge:</strong> DL ist nur schwer, wenn $n$ einen großen Primfaktor enthält. Daher fordern Elliptische-Kurven-Standards (NIST P-256, secp256k1, Curve25519), dass die Gruppenordnung selbst eine große Primzahl ist (Cofaktor $h$ klein, idealerweise 1). Gegenbeispiel: MOV/Anomalie-Attacken auf "schlechte" Kurven.<br><em>Quelle:</em> Pohlig/Hellman "An Improved Algorithm for Computing Logarithms over $GF(p)$", IEEE T-IT 24(1), 1978; Stinson/Paterson "Cryptography: Theory and Practice", 4. Aufl. (2018), §7.4.'
                },
                {
                    q: 'Pollard-$\\rho$ zur Faktorisierung: skizziere die Methode für $N$ und schätze den Aufwand für eine 1024-Bit-RSA-Zahl ab.',
                    h: 'Iteration $x_{i+1}=x_i^2+c\\bmod N$, Floyd-Zyklusdetektion. Aufwand $O(p^{1/2})$ für kleinsten Faktor $p$.',
                    s: '<strong>Methode (Pollard 1975):</strong> Sei $N=p\\cdot q$. Iteriere $x_{i+1} = f(x_i)\\bmod N$ mit z.B. $f(x)=x^2+1$. Modulo $p$ beobachtet, durchläuft die Folge nach $O(\\sqrt p)$ Schritten einen Zyklus (Geburtstagsphänomen). Floyds Zyklenerkennung: berechne $x$ und $y=f(f(\\cdot))$ parallel; sobald $\\gcd(|x-y|, N)\\in(1,N)$, hat man einen Faktor.<br><strong>Aufwand für 1024-Bit-RSA:</strong> Faktoren $p\\approx q\\approx 2^{512}$. Pollard-$\\rho$ braucht $\\approx \\sqrt{p}\\approx 2^{256}$ Operationen — <em>nicht</em> praktikabel.<br><strong>State-of-the-Art für RSA:</strong> General Number Field Sieve (GNFS) mit Komplexität $\\exp\\big((c+o(1))(\\log N)^{1/3}(\\log\\log N)^{2/3}\\big)$, $c=(64/9)^{1/3}\\approx 1{,}923$ — RSA-768 (232 Dez.) wurde 2009 in ~2000 CPU-Jahren gebrochen (Kleinjung et al.); RSA-1024 gilt nach NIST SP 800-131A Rev. 2 als nicht mehr ausreichend (verboten für neue Anwendungen seit 2014).<br>Pollard-$\\rho$ glänzt eher bei <em>kleinen Faktoren</em> (Smoothness-Tests, Elliptische-Kurven-Faktorisierung).<br><em>Quelle:</em> Pollard "A Monte Carlo method for factorization", BIT 15 (1975); Kleinjung et al. "Factorization of a 768-bit RSA modulus", CRYPTO 2010; NIST SP 800-131A Rev. 2 (März 2019).'
                },
                {
                    q: 'Was ist ein Side-Channel-Angriff? Erkläre Cache-Timing gegen T-Table-AES (Bernstein 2005) und welche Gegenmaßnahmen heute Standard sind.',
                    h: 'Lookup-Tabellen → Cache-Hits/Misses verraten S-Box-Indizes → Schlüsselbits.',
                    s: '<strong>Klassische T-Table-AES-Implementierung:</strong> SubBytes/MixColumns wird über vier 1-kB-Tabellen $T_0,\\ldots,T_3$ realisiert, indiziert durch State-Bytes. Cache-Line-Größe 64 B ⇒ jede Tabelle belegt 16 Lines. Welche Line beim Zugriff bereits im L1-Cache liegt, hängt vom State (und damit vom Schlüssel) ab.<br><strong>Bernstein 2005:</strong> Trainings-/Angriffsphase misst Verschlüsselungs-Latenz für viele bekannte Klartexte über Netz. Latenzunterschiede korrelieren mit S-Box-Indizes der ersten Runde; daraus lassen sich Schlüsselbits separieren. Praktisch: vollständiger AES-128-Key in $\\approx 2^{13}$ Anfragen.<br><strong>Gegenmaßnahmen:</strong> 1) <em>Konstantzeit-Implementierung</em> ohne Tabellen-Lookup: AES-NI (Hardware), Bitsliced-AES (Käsper/Schwabe CHES 2009). 2) <em>Konstantzeit-Programmierung</em>: kein <code>if</code> auf Geheimnisse, kein Array-Index aus Geheimnis, Konstantzeit-Vergleich. 3) <em>Cache-Partitionierung</em> (Intel CAT), Page-Coloring. 4) Masking (Boolean/Arithmetic) gegen DPA.<br><em>Quelle:</em> D. J. Bernstein "Cache-timing attacks on AES" (Apr. 2005); Osvik/Shamir/Tromer "Cache Attacks and Countermeasures", CT-RSA 2006; Käsper/Schwabe "Faster and Timing-Attack Resistant AES-GCM", CHES 2009.'
                },
                {
                    q: 'TLS 1.3 0-RTT: welche Funktion bietet es, und welches grundlegende Sicherheitsproblem wird damit aufgegeben?',
                    h: 'Erste Application-Data schon im ClientHello; verloren: anti-replay garantie für 0-RTT-Daten.',
                    s: '<strong>0-RTT (Zero Round-Trip Time, RFC 8446 §4.2.10):</strong> Nach einer initialen Verbindung kennt der Client ein "Pre-Shared Key Resumption Master Secret" (PSK). Beim Wiederverbinden sendet er bereits im ClientHello sog. <em>Early Data</em>, verschlüsselt mit einem aus PSK abgeleiteten Schlüssel. Ein RTT gespart, nützlich für Latenz-sensitive Anwendungen (CDN, HTTP GET).<br><strong>Sicherheitsverlust:</strong> 1) <em>Replay-Anfälligkeit</em>: Server kann nicht garantieren, dass Early Data nur einmal verarbeitet wurde — Mallory wiederholt einfach das ClientHello. Konsequenz: Early-Data dürfen <em>nur idempotente</em> Operationen ausführen (HTTP GET in der Regel OK, POST nicht). 2) <em>Keine PFS</em> für Early Data: PSK ist langlebig; wird er kompromittiert, lassen sich aufgezeichnete 0-RTT-Bytes nachträglich entschlüsseln. Erst nach dem regulären Handshake-Abschluss bekommen die Bytes wieder PFS.<br><strong>Gegenmaßnahmen:</strong> Server-seitig anti-replay durch Single-Use-Tickets oder Cluster-weiten Bloom-Filter; Anwendung muss Replay tolerieren oder strikt ablehnen.<br><em>Quelle:</em> RFC 8446 §4.2.10 & §8 "0-RTT Security Considerations"; Fischlin/Günther "Replay Attacks on Zero Round-Trip Time", IEEE EuroS&P 2017.'
                },
                {
                    q: 'Bleichenbacher-Angriff (1998) gegen PKCS#1 v1.5: wie funktioniert ein Million-Message-Angriff, und welche modernen Wiederbelebungen existieren?',
                    h: 'Padding-Oracle gegen RSA-Entschlüsselung: TLS-Server verrät "PKCS-conforming" → adaptive Suche.',
                    s: '<strong>PKCS#1 v1.5 Padding:</strong> $\\text{EM} = 00\\|02\\|\\text{PS}\\|00\\|m$ mit $\\text{PS}$ ≥ 8 zufällige Nichtnull-Bytes. Server entschlüsselt $c = \\text{EM}^e\\bmod N$ und prüft die ersten zwei Bytes (00 02).<br><strong>Angriff (Bleichenbacher CRYPTO 1998):</strong> Wähle $c\\prime = c\\cdot s^e\\bmod N$ und sende; Server antwortet "ungültig" oder akzeptiert. "Akzeptiert" verrät: $2B\\le s\\cdot m\\bmod N\\le 3B-1$, $B=2^{8(\\ell-2)}$. Iteratives Verfeinern der Intervalle: $\\sim 10^6$ Anfragen genügen, $m$ vollständig zu extrahieren.<br><strong>Reale Wiederbelebungen:</strong> ROBOT (Böck/Somorovsky/Young 2017, USENIX 2018) — viele TLS-Server (F5 BIG-IP, Citrix, Cisco) waren 19 Jahre nach Bleichenbacher noch anfällig. CAT-Server (CVE-2017-13099). DROWN (Aviram et al. USENIX 2016) erlaubt einen ähnlichen Angriff über parallelen SSL-2.0-Endpoint.<br><strong>Gegenmaßnahmen:</strong> RSA-OAEP statt PKCS#1 v1.5 für Verschlüsselung; in TLS 1.2 konstantzeit-Behandlung beider Pfade ("pseudo-random plaintext" bei Padding-Fehler, RFC 5246 §7.4.7.1); TLS 1.3 entfernt RSA-Key-Exchange komplett.<br><em>Quelle:</em> D. Bleichenbacher "Chosen Ciphertext Attacks Against Protocols Based on the RSA Encryption Standard PKCS #1", CRYPTO 1998; Böck et al. "Return Of Bleichenbacher\u2019s Oracle Threat", USENIX Security 2018.'
                },
                {
                    q: 'Coppersmith-Angriff: wann genügt ein kleiner Exponent oder bekannter Teil der Nachricht, um RSA effizient zu brechen?',
                    h: 'LLL findet kleine Wurzeln eines modularen Polynoms, wenn $|x|<N^{1/d}$.',
                    s: '<strong>Coppersmith-Theorem (1996/1997):</strong> Für ein monisches Polynom $f(x)\\in\\mathbb{Z}[x]$ vom Grad $d$ und Modul $N$ lassen sich alle ganzzahligen Wurzeln $x_0$ mit $|x_0|<N^{1/d}$ in Polynomialzeit finden — via LLL-Reduktion auf einem Gitter der Verschiebungen $x^i f(x)^j N^k$.<br><strong>Anwendungen auf RSA:</strong><br>$\\bullet$ Kleiner Exponent $e=3$ + bekannte Teil-Klartextstruktur: ist $m = m_0 + r$, mit bekanntem $m_0$ und unbekanntem $r<N^{1/3}$, dann liefert $f(r)=(m_0+r)^3-c$ die Wurzel $r$.<br>$\\bullet$ <strong>Håstad-Broadcast (1988):</strong> dieselbe Nachricht an $e$ Empfänger mit gemeinsamem kleinen $e$ verschickt $\\Rightarrow$ via CRT vollständig wiederherstellbar.<br>$\\bullet$ <strong>Partial Key Exposure (Boneh/Durfee/Frankel 1998):</strong> Bei kleinem $d$ ($d<N^{0{,}292}$) liefert LLL den Private Key.<br>$\\bullet$ <strong>Faktorisierung mit teilbekanntem $p$:</strong> kennt man $\\lceil\\log_2 p / 2\\rceil$ obere Bits von $p$, faktorisiert man $N$.<br><strong>Folge:</strong> Niemals $e=3$ ohne OAEP-Padding; nie $d$ klein wählen (Wiener 1990: $d<N^{1/4}/3$ bricht alles per Kettenbruch).<br><em>Quelle:</em> D. Coppersmith "Small solutions to polynomial equations and low-exponent RSA vulnerabilities", J. Cryptology 10(4), 1997; Boneh "Twenty Years of Attacks on the RSA Cryptosystem", Notices AMS 46(2), 1999.'
                },
                {
                    q: 'Bilineare Paarungen: erkläre die Eigenschaften $e:G_1\\times G_2\\to G_T$ und skizziere Boneh-Franklin Identity-Based Encryption (IBE, 2001).',
                    h: 'Bilinearität + Nicht-Entartung. IBE: privater Schlüssel aus Identität-Hash, gemeinsamer Master Secret.',
                    s: '<strong>Bilineare Paarung</strong> $e:G_1\\times G_2\\to G_T$ (alle drei zyklisch, Ordnung $q$ prim):<br>1) <em>Bilinearität:</em> $e(aP, bQ) = e(P,Q)^{ab}$.<br>2) <em>Nicht-Entartung:</em> $e(g_1,g_2)\\neq 1$ für Generatoren.<br>3) Effizient berechenbar (Miller-Schleife, optimal Ate-Pairing auf BLS12-381).<br><strong>Boneh-Franklin IBE (Setup):</strong> Trusted PKG wählt Master-Secret $s\\in\\mathbb{Z}_q$, Master-Public $P_{pub}=sP\\in G_1$. Hashfunktion $H_1:\\{0,1\\}^*\\to G_2$ projiziert eine ID (z.B. "alice@example.com") auf einen Gruppenpunkt.<br><strong>KeyDerivation:</strong> Privater Schlüssel für ID: $d_\\text{ID}=s\\cdot H_1(\\text{ID})$.<br><strong>Encrypt(ID, m):</strong> Wähle Zufall $r$, Chiffrat $c=(rP,\\ m\\oplus H_2(e(P_{pub}, H_1(\\text{ID}))^r))$.<br><strong>Decrypt:</strong> $m = c_2 \\oplus H_2(e(c_1, d_\\text{ID}))$. Korrektheit per Bilinearität: $e(rP, s H_1(\\text{ID}))=e(sP, H_1(\\text{ID}))^r$.<br><strong>Vorteile:</strong> kein Zertifikat nötig, ID = Public Key. <em>Nachteil:</em> PKG kennt alle privaten Schlüssel (Key-Escrow).<br><em>Quelle:</em> D. Boneh, M. Franklin "Identity-Based Encryption from the Weil Pairing", CRYPTO 2001 / SIAM J. Comput. 32(3), 2003.'
                },
                {
                    q: 'Threshold-Signaturen: erkläre FROST (2020) und warum verteilte Signaturen besser sind als Multi-Sig mit $n$ unabhängigen Signaturen.',
                    h: '$t$-of-$n$ ohne $n$ Signaturen on-chain. Distributed Key Generation + zwei Runden.',
                    s: '<strong>Klassische Multi-Sig</strong> (z.B. Bitcoin <code>OP_CHECKMULTISIG</code>): Alle $t$ Signaturen werden einzeln in die Tx geschrieben → linearer Größenanstieg, Signer-Identitäten on-chain sichtbar.<br><strong>Threshold-Signatur (FROST: Komlo/Goldberg, SAC 2020):</strong> Erzeugt einen <em>einzigen</em> Schnorr-/Ed25519-kompatiblen Signatur-Output, der wie eine Standard-Signatur aussieht. Schritte:<br>1) <em>DKG</em> (Distributed Key Generation, Pedersen/GJKR-Verfahren): Jeder Teilnehmer $i$ erhält Shamir-Anteil $s_i$ eines geheimen $s$; Public Key $P=sG$ ist allen bekannt, $s$ niemandem.<br>2) <em>Pre-Round</em> (offline): jeder Signer sendet Nonce-Commitments $(D_i=d_iG, E_i=e_iG)$.<br>3) <em>Sign-Round</em>: Koordinator berechnet aggregierten $R=\\sum_i(D_i+\\rho_i E_i)$, $\\rho_i=H(i,m,B)$. Challenge $c=H(R\\|P\\|m)$. Jeder Signer berechnet $z_i = d_i + \\rho_i e_i + \\lambda_i s_i c$ ($\\lambda_i$ Lagrange-Interpolant). Aggregat $z=\\sum z_i$. Output $(R,z)$ wie eine normale Schnorr-Signatur.<br><strong>Vorteile:</strong> on-chain wie Einzel-Signatur (Privatsphäre + Größe), keine Korrumpierung mit < $t$ Anteilen möglich.<br><em>Quelle:</em> C. Komlo, I. Goldberg "FROST: Flexible Round-Optimized Schnorr Threshold Signatures", SAC 2020 / IETF draft-irtf-cfrg-frost (RFC 9591, Dez. 2024).'
                },
                {
                    q: 'AES-CCM vs. AES-GCM: was sind die Vor- und Nachteile, und in welchen Standards wird welche Variante eingesetzt?',
                    h: 'CCM: CTR + CBC-MAC, sequenziell. GCM: CTR + GHASH, parallelisierbar.',
                    s: '<strong>AES-CCM (NIST SP 800-38C, 2004):</strong> Counter mit CBC-MAC. Tag wird über CBC-MAC der Nachricht (mit speziellen Padding/Längen-Feldern) berechnet, anschließend mit dem ersten Counter-Block verschlüsselt. <em>Vorteile:</em> nutzt nur AES-Verschlüsselung, keine $GF(2^{128})$-Arithmetik, kompakt in Hardware. <em>Nachteile:</em> zweimaliges Durchlaufen der Nachricht (MAC + Verschlüsselung), nicht parallelisierbar; Länge der Nachricht muss vorab bekannt sein. Tag-Länge 4-16 B.<br><strong>AES-GCM (NIST SP 800-38D, 2007):</strong> Counter + GHASH (polynomielle Auswertung in $GF(2^{128})$). <em>Vorteile:</em> hochgradig parallelisierbar (CTR-Blöcke unabhängig, GHASH-Karatsuba), $\\ge 10$ GB/s mit AES-NI + CLMUL. <em>Nachteile:</em> Nonce-Reuse-Katastrophe; CLMUL-freie Implementierung seitenkanalanfällig; Implementation komplexer.<br><strong>Standards:</strong> CCM: IEEE 802.11i (WPA2-CCMP), Bluetooth LE Pairing, IETF Suite B Suite-B-128 (RFC 5288), Zigbee. GCM: TLS 1.2/1.3 (RFC 5288/8446), IPsec ESP (RFC 4106), SSH (RFC 5647), MACsec (IEEE 802.1AE).<br><em>Quelle:</em> NIST SP 800-38C "CCM Mode" (Mai 2004); NIST SP 800-38D "GCM and GMAC" (Nov. 2007); J. Salowey/A. Choudhury/D. McGrew RFC 5288 (Aug. 2008).'
                },
                {
                    q: 'XMSS und LMS: erkläre Hash-basierte <em>stateful</em> Signaturen und warum ihre Zustandsführung sicherheitskritisch ist.',
                    h: 'Merkle-Baum über $2^h$ Einmal-Signaturen; jeder Index nur einmal benutzbar.',
                    s: '<strong>Aufbau (XMSS, RFC 8391, Mai 2018; LMS, RFC 8554, Apr. 2019):</strong> Erzeuge $2^h$ WOTS+-Einmal-Signaturschlüssel. Aus ihren Public Keys $\\text{pk}_0,\\ldots,\\text{pk}_{2^h-1}$ wird ein binärer Merkle-Baum gebaut; die <em>Root</em> ist der öffentliche XMSS/LMS-Schlüssel.<br><strong>Sign(m, i):</strong> Verwende WOTS+-Key Nummer $i$, signiere $H(m)$. Veröffentliche WOTS+-Sig + Authentifikationspfad (Merkle-Branch, $h$ Knoten) zur Root.<br><strong>Verify:</strong> Verifiziere WOTS+-Sig, hashe $\\text{pk}_i$ entlang des Pfades, vergleiche mit Root.<br><strong>State-Kritikalität:</strong> Jeder Index $i$ darf <em>höchstens einmal</em> verwendet werden. WOTS+-Schlüssel zweimal benutzt → ECDSA-Nonce-Reuse-Analog: privater Schlüssel rekonstruierbar via Kombination der zwei Sigs (Hash-Chain-Punkte gemeinsam offengelegt). Bei Backup/Wiederherstellung muss der Counter <em>monoton</em> bleiben — Storage-Fehler bricht alles.<br><strong>Daher</strong> NIST SP 800-208 (Okt. 2020) verlangt strenge Hardware-/Counter-Garantien (HSM, append-only Log). Stateless Alternative: SLH-DSA (SPHINCS+, FIPS 205).<br><em>Quelle:</em> A. Huelsing et al. RFC 8391 "XMSS: eXtended Merkle Signature Scheme" (Mai 2018); D. McGrew et al. RFC 8554 "Leighton-Micali Hash-Based Signatures" (Apr. 2019); NIST SP 800-208 (Okt. 2020).'
                },
                {
                    q: 'PAKE / OPAQUE: warum benötigt man ein passwort-authentifiziertes Schlüsselaustauschverfahren, und welches Sicherheitsproblem klassischer "Hash & Send"-Login-Verfahren wird gelöst?',
                    h: 'Server sieht Passwort nie; offline-Dictionary-Angriff trotz Server-Kompromittierung unmöglich.',
                    s: '<strong>Problem klassischer Logins:</strong> Client schickt Passwort (oder $H(\\text{pw})$) per TLS an Server. (a) Server kennt Klartext oder unsalted Hash → Offline-Bruteforce bei Datenbankleak; (b) Client vertraut PKI vollständig — kompromittierte CA = MITM = Passwort offen; (c) Phishing/Reverse-Proxy unsichtbar.<br><strong>aPAKE (asymmetric Password-Authenticated Key Exchange):</strong> Client und Server etablieren einen <em>gemeinsamen</em> Session-Key, wobei der Server nur einen Passwort-<em>Verifier</em> (kein Passwort, kein Hash davon) speichert. Sicherheit:<br>1) Aktiver MITM ohne Passwort: keine Information leakt — Angreifer kann offline keine Bruteforce versuchen.<br>2) Server-Kompromittierung: Angreifer erbeutet nur den Verifier, mit dem er <em>kein</em> Passwort und keinen Schlüssel raten kann ohne Online-Versuche pro Kandidat (rate-limitierbar).<br>3) Optional augmentiert via OPRF, sodass selbst Server-Operator das Passwort nicht extrahieren kann.<br><strong>OPAQUE (Jarecki/Krawczyk/Xu, EUROCRYPT 2018):</strong> Kombiniert eine Oblivious Pseudorandom Function (OPRF, 3HashDH) mit AKE (z.B. HMQV). Vom IETF CFRG 2020 als empfohlenes aPAKE ausgewählt; in WhatsApp-Backup, Facebook Encrypted Backups und Apple iCloud Account-Reset eingesetzt.<br><em>Quelle:</em> S. Jarecki, H. Krawczyk, J. Xu "OPAQUE: An Asymmetric PAKE Protocol Secure Against Pre-Computation Attacks", EUROCRYPT 2018; IETF CFRG Selection 2020 (draft-irtf-cfrg-opaque).'
                }
            ]
        ]
    };
})();
