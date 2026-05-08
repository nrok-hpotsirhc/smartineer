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
            Geburtstagsparadoxon: Kollision bei $\\sim 2^{n/2}$ Hashes (Bit-Länge $n$)
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
                }
            ]
        ]
    };
})();
