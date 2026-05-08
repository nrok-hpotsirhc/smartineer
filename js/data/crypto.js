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
                    s: 'M:  1 1 0 0 1 0 1 0<br>K:  1 0 1 0 1 1 1 1<br>C:  0 1 1 0 0 1 0 1<br>Verifikation: C ⊕ K = 11001010 = M. ✓<br>$$\\boxed{C=01100101_2}$$'
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
                    s: 'Euklid: $26=3\\cdot 7+5$; $7=1\\cdot 5+2$; $5=2\\cdot 2+1$; $2=2\\cdot 1+0$.<br>Rückwärts: $1=5-2\\cdot 2 = 5 - 2(7-5)=3\\cdot 5 - 2\\cdot 7 = 3(26-3\\cdot 7)-2\\cdot 7 = 3\\cdot 26 - 11\\cdot 7$.<br>Also $-11\\cdot 7\\equiv 1\\pmod{26}\\Rightarrow 7^{-1}\\equiv -11\\equiv 15\\pmod{26}$.<br>Probe: $7\\cdot 15=105 = 4\\cdot 26 + 1$. ✓<br>$$\\boxed{7^{-1}\\equiv 15\\pmod{26}}$$'
                },
                {
                    q: 'Vollständiges RSA-Beispiel: $p=3$, $q=11$, $e=3$. Berechne $d$ und chiffriere $m=4$.',
                    h: '$\\varphi=20$. $d\\equiv e^{-1}\\pmod{20}$. $c=m^e\\bmod N$.',
                    s: '$3d\\equiv 1\\pmod{20}$. Probieren: $3\\cdot 7=21\\equiv 1$. $\\Rightarrow d=7$.<br>$c=4^3 \\bmod 33 = 64 \\bmod 33 = 64-33=31$.<br>Probe: $c^d\\bmod N = 31^7 \\bmod 33$. Schrittweise: $31\\equiv -2\\pmod{33}$. $(-2)^7=-128 \\equiv -128 + 4\\cdot 33 = -128+132 = 4 = m$. ✓<br>$$\\boxed{d=7,\\ c=31}$$'
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
                    s: '$2^1=2$, $2^2=4$, $2^3=8$. ✓<br>$$\\boxed{\\log_2 8\\equiv 3\\pmod{11}}$$ Hinweis: Ordnung von 2 mod 11: $2^{10}=1024\\equiv 1$, also Ordnung teilt 10. Tatsächlich Ordnung 10 (2 ist Primitivwurzel mod 11).'
                }
            ],
            // L3
            [
                {
                    q: 'RSA-Sicherheit: Faktoreziere $N=143$ und beschreibe, wie damit der private Schlüssel rekonstruiert werden kann (gegeben $e=7$).',
                    h: 'Probedivisionen mit kleinen Primzahlen. Anschließend $d\\equiv e^{-1}\\pmod{\\varphi(N)}$.',
                    s: '$143=11\\cdot 13\\Rightarrow p=11,\\ q=13$.<br>$\\varphi(N)=10\\cdot 12=120$.<br>$d\\equiv 7^{-1}\\pmod{120}$: erw. Euklid: $\\gcd(7,120)=1$, $1=7\\cdot 103 - 120\\cdot 6$. Probe: $7\\cdot 103=721=6\\cdot 120+1$. ✓<br>$$\\boxed{d=103}$$ Folgerung: kennt man $N$'s Faktoren, ist RSA gebrochen $\\Rightarrow$ Sicherheit beruht auf Schwierigkeit der Faktorisierung.'
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
                    s: '<strong>Protokoll:</strong> Prover kennt $d$ mit $P=dG$. 1) Sendet $R=kG$. 2) Verifier sendet zufällige Challenge $c$. 3) Prover antwortet $s=k+cd\\bmod n$. 4) Verifier prüft $sG=R+cP$.<br><strong>Vollständigkeit:</strong> ehrlicher Prover besteht: $sG=(k+cd)G=R+cP$. ✓<br><strong>Soundness:</strong> kann Prover für 2 verschiedene Challenges $c_1\\neq c_2$ gültig antworten, lässt sich $d=(s_1-s_2)/(c_1-c_2)$ extrahieren $\\Rightarrow$ er kennt $d$.<br><strong>Zero-Knowledge (HVZK):</strong> Simulator wählt $s,c$ zufällig und setzt $R=sG-cP$ — Verteilung identisch, ohne $d$.<br>Fiat-Shamir: $c=H(R\\|P\\|m)$ macht es nicht-interaktiv $\\Rightarrow$ Schnorr-Signatur.'
                }
            ]
        ]
    };
})();
