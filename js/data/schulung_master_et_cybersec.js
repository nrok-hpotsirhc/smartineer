/*
 * Schulung: Master Elektrotechnik — Schwerpunkt Cyber-Security.
 *
 * Status: VORBEREITUNG (status: 'preparation', siehe AGENTS §18.9).
 *   - Modulhandbuch-Recherche steht aus. Generisches Skelett auf Basis
 *     verbreiteter deutscher MA-ET-Curricula (FTEI-Empfehlungen, IEEE-CSEC
 *     2017 Cybersecurity Curriculum, ISO/IEC 27001:2022 Anhang A).
 *   - Vor Veroeffentlichung der Inhalte ist ein konkretes Modulhandbuch zu
 *     waehlen (z.B. RWTH Aachen "MA-Elektrotechnik mit Vertiefung Daten-
 *     verarbeitung", TU Muenchen "MA-Elektrotechnik & Informationstechnik
 *     Spez. Cyber Security", KIT, OTH Regensburg). Quellen pflichtmaessig
 *     pro Kapitel: Modulhandbuch, Vorlesungs-Skript / Lehrbuch, Standard.
 *
 * Quellenpool fuer spaetere inhaltliche Pflege (Auswahl):
 *   - Eckert, "IT-Sicherheit", 11. Aufl., De Gruyter Oldenbourg 2023.
 *   - Anderson, "Security Engineering", 3rd ed., Wiley 2020.
 *   - Stallings, "Network Security Essentials", 7th ed., 2023.
 *   - Pohl/Hamann, "Eingebettete Systeme — Engineering und Design",
 *     Hanser 2021.
 *   - DIN EN ISO/IEC 27001:2022, ISO/IEC 27002:2022, IEC 62443-Serie
 *     (Industrial Communication Networks — IT Security), DIN EN ISO 21434
 *     (Automotive Cyber-Security), ETSI EN 303 645 (IoT-Geraete).
 *   - NIST SP 800-Serie (insb. 53r5, 207, 218, 161, 160 Vol. 1 r1).
 *   - BSI IT-Grundschutz-Kompendium 2024.
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    function placeholderPage(title, scope) {
        return {
            title: title,
            html: '<p><strong>In Vorbereitung.</strong> Dieses Kapitel ist Teil des Master-ET-Cyber-Security-Skeletts und enthaelt noch keine ausformulierten Lehrseiten. Inhalte werden quellengestuetzt nachgepflegt (siehe AGENTS.md §18.6 / §18.9).</p>'
                + '<p><strong>Geplanter Scope:</strong></p><ul>'
                + scope.map(s => '<li>' + s + '</li>').join('')
                + '</ul>'
                + '<p><strong>Vorgesehene Quellen:</strong> Modulhandbuch der vom Pflegeteam gewaehlten Hochschule, Eckert "IT-Sicherheit" 11. Aufl. 2023, Stallings "Network Security Essentials" 7. Aufl. 2023, einschlaegige IEC-/ISO-/NIST-/BSI-Standards (siehe Datei-Header).</p>'
        };
    }

    function placeholderQuiz(topic) {
        return [{
            q: 'Platzhalter-Frage fuer den Bereich <strong>' + topic + '</strong>. Dieses Quiz wird im Rahmen der Inhalts-Recherche durch &ge;50 quellenbasierte Fragen ersetzt (AGENTS §18.4).',
            options: ['Inhalt in Vorbereitung — Antwort folgt mit Recherche', 'Distraktor 1 (Platzhalter)', 'Distraktor 2 (Platzhalter)', 'Distraktor 3 (Platzhalter)'],
            correct: 0,
            explanation: 'Platzhalter-Erlaeuterung. Bei Veroeffentlichung wird hier der konkrete Quellenanker stehen (Modulhandbuch-Modulnummer, Standard-Paragraph, Lehrbuch-Seite).'
        }];
    }

    // Quiz-Helper fuer produktiv ausgepflegte Kapitel.
    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    // ----------------------------------------------------------------------
    // Kapitel 1 — Angewandte Kryptographie (PRODUKTIV)
    // Quellen: Eckert "IT-Sicherheit" 11. Aufl. 2023; Stallings "Cryptography
    // and Network Security" 8. Aufl. 2023; NIST FIPS 197 (AES), FIPS 180-4
    // (SHA-2), FIPS 202 (SHA-3), FIPS 186-5 (DSS, 2023), FIPS 203/204/205
    // (PQC, 2024); NIST SP 800-38D (GCM), SP 800-56A r3 (DH/ECDH), SP 800-90A
    // r1 (DRBG), SP 800-131A r2 (Algorithmen-Migration); RFC 5869 (HKDF),
    // RFC 8446 (TLS 1.3), RFC 7748 (X25519/X448), RFC 8032 (EdDSA);
    // BSI TR-02102-1:2024.
    // ----------------------------------------------------------------------

    const PAGE_KRYPTO_SYM = {
        title: '1.1 Symmetrische Kryptographie und Block-Modi',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Nach dieser Einheit koennen Sie (1) Aufbau und Sicherheitsannahmen von AES erlaeutern, (2) die fuenf wichtigsten Block-Modi gegeneinander abgrenzen, (3) den Unterschied zwischen Verschluesselung und Authenticated Encryption (AEAD) erklaeren, (4) typische Implementierungsfehler (IV/Nonce-Reuse, Padding-Oracle) benennen.</blockquote>'

            + '<h4>1.1.1 AES — Aufbau</h4>'
            + '<p>Der <strong>Advanced Encryption Standard</strong> (FIPS 197, urspruengl. 2001, Reaffirmation 2023) ist eine Substitutions-Permutations-Chiffre mit Blocklaenge 128 bit. Schluessellaengen 128, 192, 256 bit ergeben 10, 12 oder 14 Runden. Jede Runde besteht aus den Schritten <code>SubBytes</code> (nichtlineare 8&times;8-S-Box, basiert auf der multiplikativen Inversion in $\\mathrm{GF}(2^8)$ mit Reduktionspolynom $x^8+x^4+x^3+x+1$), <code>ShiftRows</code>, <code>MixColumns</code> (Multiplikation im $\\mathrm{GF}(2^8)$-Vektorraum) und <code>AddRoundKey</code>.</p>'
            + '<p>AES gilt nach &gt;20 Jahren Kryptanalyse weiterhin als sicher. Die schaerfsten bekannten Schluessel-Recovery-Angriffe (Bogdanov/Khovratovich/Rechberger 2011) reduzieren die Komplexitaet von AES-128 von $2^{128}$ auf $\\approx 2^{126{,}1}$ — praktisch irrelevant. BSI TR-02102-1:2024 empfiehlt AES-128 fuer kryptographische Anwendungen mindestens bis 2030+.</p>'

            + '<h4>1.1.2 Block-Modi im Vergleich</h4>'
            + '<table><thead><tr><th>Modus</th><th>Authentizitaet</th><th>Parallelisierbar</th><th>Eigenschaften</th></tr></thead><tbody>'
            + '<tr><td>ECB</td><td>nein</td><td>ja</td><td>Identische Klartextbloecke ergeben identische Chiffratbloecke. <strong>Nie verwenden.</strong></td></tr>'
            + '<tr><td>CBC</td><td>nein</td><td>nur Entschluesselung</td><td>Verkettung mittels XOR. Anfaellig fuer Padding-Oracle-Angriffe (Vaudenay 2002). Erfordert zufaellige IV.</td></tr>'
            + '<tr><td>CTR</td><td>nein</td><td>ja</td><td>Stromchiffre-aehnlich. <strong>Nonce-Reuse</strong> entwertet die Sicherheit komplett (XOR zweier Klartexte exponiert).</td></tr>'
            + '<tr><td>GCM</td><td>ja (AEAD)</td><td>ja</td><td>NIST SP 800-38D. CTR + GHASH (Carter-Wegman-MAC). Standard in TLS 1.2/1.3, IPsec, WPA3.</td></tr>'
            + '<tr><td>XTS</td><td>nein</td><td>ja</td><td>NIST SP 800-38E. Standard fuer Festplatten-Verschluesselung (BitLocker, dm-crypt, FileVault).</td></tr>'
            + '</tbody></table>'

            + '<h4>1.1.3 Authenticated Encryption (AEAD)</h4>'
            + '<p>Reine Verschluesselung garantiert Vertraulichkeit, aber <em>keine</em> Integritaet. Ein Angreifer kann Bits im Chiffrat flippen und der Empfaenger erhaelt einen veraenderten Klartext, ohne dies zu bemerken. <strong>AEAD-Modi</strong> (Authenticated Encryption with Associated Data) bieten Vertraulichkeit + Integritaet + Bindung an Metadaten in einem Schritt. NIST-empfohlen: <strong>AES-GCM</strong> (SP 800-38D) und <strong>AES-CCM</strong> (SP 800-38C). RFC 8439 spezifiziert <strong>ChaCha20-Poly1305</strong> als Alternative ohne Hardware-Beschleunigung — Default in Mobil-/IoT-Stacks und in TLS 1.3.</p>'
            + '<p>Sicherheitsmodell: AEAD-Schemen sind IND-CCA2-sicher, sofern (Schluessel, Nonce) niemals doppelt verwendet wird. Bei AES-GCM mit 96-bit-Nonce erlaubt der Birthday-Bound nach SP 800-38D maximal $2^{32}$ verschluesselte Nachrichten je Schluessel, bevor das Schluesselmaterial rotiert werden muss.</p>'

            + '<h4>1.1.4 Typische Implementierungsfehler</h4>'
            + '<ul>'
            + '<li><strong>Padding-Oracle (CBC):</strong> Eckert §7.5; Vaudenay, EUROCRYPT 2002. Bekanntestes Praxis-Beispiel: POODLE (CVE-2014-3566) gegen SSL 3.0. Gegenmassnahme: konstantzeitiges Pruefen + Encrypt-then-MAC oder direkt AEAD.</li>'
            + '<li><strong>Nonce-Reuse (GCM/CTR):</strong> Joux, NIST 2006. Wenn dieselbe (Schluessel, Nonce) zweimal genutzt wird, erlaubt es nicht nur Klartextrekonstruktion, sondern auch Forgery durch Authentication-Tag-Berechnung.</li>'
            + '<li><strong>Schwache RNGs:</strong> Schluessel/IV aus <code>rand()</code> oder Linear-Kongruenz-Generatoren. Korrekt: SP 800-90A r1 DRBG aus OS-CSPRNG (<code>/dev/urandom</code>, <code>BCryptGenRandom</code>, <code>getrandom(2)</code>).</li>'
            + '<li><strong>Padding/Compression-Oracles (CRIME, BREACH 2012/2013):</strong> niemals vor Verschluesselung komprimieren, wenn Angreifer Klartext mit-injizieren kann.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: FIPS 197 (2001/2023); NIST SP 800-38A/C/D/E; BSI TR-02102-1:2024; Eckert, IT-Sicherheit, 11. Aufl. 2023, Kap. 7; Stallings, Cryptography and Network Security, 8. Aufl. 2023, Kap. 5-7; Vaudenay 2002, EUROCRYPT.</em></p>'
    };

    const PAGE_KRYPTO_ASYM = {
        title: '1.2 Asymmetrische Verfahren und Post-Quantum-Migration',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) RSA und ECC inklusive Schluessellaengen-Empfehlungen quantitativ vergleichen, (2) Forward Secrecy ueber (EC)DHE erklaeren, (3) die NIST-PQC-Standards FIPS 203/204/205 (2024) zuordnen, (4) Hybrid-Schemen fuer den Migrationszeitraum begruenden.</blockquote>'

            + '<h4>1.2.1 RSA</h4>'
            + '<p>RSA (Rivest, Shamir, Adleman 1978) basiert auf der Schwierigkeit der Faktorisierung grosser Zahlen $n=p\\cdot q$. Schluesselgenerierung: zwei Primzahlen $p,q$ mit $p\\neq q$, $n=pq$, $\\varphi(n)=(p-1)(q-1)$, oeffentlicher Exponent $e$ (typisch $2^{16}+1=65537$), privater Exponent $d\\equiv e^{-1}\\pmod{\\varphi(n)}$. Verschluesselung $c=m^e\\bmod n$, Entschluesselung $m=c^d\\bmod n$.</p>'
            + '<p><strong>Padding ist Pflicht.</strong> Schul-RSA ohne Padding ist deterministisch und damit IND-CPA-unsicher. Standards: <strong>OAEP</strong> (RFC 8017) fuer Verschluesselung, <strong>PSS</strong> fuer Signaturen. PKCS#1 v1.5 ist legacy und Bleichenbacher-anfaellig (1998, ROBOT 2017).</p>'
            + '<p>Schluessellaengen (BSI TR-02102-1:2024 / NIST SP 800-131A r2): RSA-2048 nur noch fuer Bestand bis 2030; <strong>RSA-3072 oder &ge;ECC-256</strong> fuer Neuanwendungen. RSA-1024 ist seit 2014 verboten.</p>'

            + '<h4>1.2.2 Elliptic Curve Cryptography</h4>'
            + '<p>ECC nutzt die Diskrete-Logarithmus-Probleme auf elliptischen Kurven $E: y^2=x^3+ax+b$ ueber $\\mathrm{GF}(p)$ oder $\\mathrm{GF}(2^m)$. Vorteil: aequivalente Sicherheit bei deutlich kleineren Schluesseln.</p>'
            + '<table><thead><tr><th>Sicherheitsniveau</th><th>RSA</th><th>ECC</th></tr></thead><tbody>'
            + '<tr><td>112 bit</td><td>2048 bit</td><td>224 bit</td></tr>'
            + '<tr><td>128 bit</td><td>3072 bit</td><td>256 bit</td></tr>'
            + '<tr><td>192 bit</td><td>7680 bit</td><td>384 bit</td></tr>'
            + '<tr><td>256 bit</td><td>15360 bit</td><td>521 bit</td></tr>'
            + '</tbody></table>'
            + '<p>Standardkurven: <strong>NIST P-256/P-384/P-521</strong> (FIPS 186-5, 2023), <strong>Curve25519</strong> (RFC 7748) fuer X25519-Schluesseltausch und <strong>Ed25519</strong> (RFC 8032) fuer Signaturen. Curve25519 vermeidet einige Implementierungsfallen der NIST-Kurven (Twist-Sicherheit, konstantzeit-Implementierung).</p>'

            + '<h4>1.2.3 Diffie-Hellman und Forward Secrecy</h4>'
            + '<p>(EC)DH erlaubt Schluesselvereinbarung ueber unsichere Kanaele. <strong>Ephemeral DH</strong> (DHE/ECDHE) generiert frische Schluessel pro Sitzung — kompromittiertes Langzeit-Schluesselmaterial dechiffriert <em>keine</em> aufgezeichneten Sitzungen mehr (<em>Forward Secrecy</em>, auch <em>Perfect Forward Secrecy</em>). TLS 1.3 (RFC 8446) macht (EC)DHE verpflichtend, statisches RSA-Key-Exchange ist gestrichen.</p>'

            + '<h4>1.2.4 Post-Quantum-Kryptographie</h4>'
            + '<p>Shor 1994: ein hinreichend grosser fehlerkorrigierter Quantencomputer faktorisiert in polynomieller Zeit und bricht damit RSA, DH und ECC. Realistische Bedrohung: <em>Harvest-Now-Decrypt-Later</em> — Angreifer speichert heute Chiffrate und entschluesselt spaeter. Konsequenz: Migrationsbeginn jetzt.</p>'
            + '<p>NIST hat 2024 die ersten PQC-Standards finalisiert:</p>'
            + '<ul>'
            + '<li><strong>FIPS 203 — ML-KEM</strong> (Module-Lattice KEM, basiert auf Kyber): Schluesselkapselung fuer Schluesseltausch.</li>'
            + '<li><strong>FIPS 204 — ML-DSA</strong> (basiert auf Dilithium): Gitter-basierte Signaturen.</li>'
            + '<li><strong>FIPS 205 — SLH-DSA</strong> (Stateless Hash-Based, basiert auf SPHINCS+): konservative Hash-basierte Signatur als Backup.</li>'
            + '</ul>'
            + '<p>Empfehlung BSI/NIST/CNSA 2.0 (2022/2024): <strong>Hybrid-Modus</strong> waehrend der Migration — z.B. X25519+ML-KEM-768 als kombinierter KEM. Bricht eines der beiden Verfahren, schuetzt das andere weiterhin.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: FIPS 186-5 (2023), 203/204/205 (2024); NIST SP 800-56A r3, 800-131A r2, 800-208 (HBS, 2020); BSI TR-02102-1:2024; RFC 7748, 8032, 8017, 8446; Bernstein, Curve25519, PKC 2006; Shor, FOCS 1994.</em></p>'
    };

    const PAGE_KRYPTO_HASH = {
        title: '1.3 Hashes, MACs und digitale Signaturen',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die drei Sicherheitsanforderungen an kryptographische Hashes formal benennen, (2) HMAC und KMAC unterscheiden, (3) Anti-Pattern wie MD5/SHA-1/PKCS#1v1.5 als Negativbeispiele einordnen, (4) ECDSA, Ed25519 und ML-DSA gegeneinander abwaegen.</blockquote>'

            + '<h4>1.3.1 Sicherheitsanforderungen an Hashes</h4>'
            + '<p>Eine kryptographische Hashfunktion $H:\\{0,1\\}^*\\to\\{0,1\\}^n$ muss drei Eigenschaften erfuellen:</p>'
            + '<ol>'
            + '<li><strong>Preimage-Resistenz:</strong> zu gegebenem $h$ ist kein $m$ mit $H(m)=h$ effizient findbar (Aufwand $\\sim 2^n$).</li>'
            + '<li><strong>Second-Preimage-Resistenz:</strong> zu gegebenem $m_1$ ist kein $m_2\\neq m_1$ mit $H(m_1)=H(m_2)$ effizient findbar (Aufwand $\\sim 2^n$).</li>'
            + '<li><strong>Kollisionsresistenz:</strong> kein Paar $(m_1,m_2)$ mit $H(m_1)=H(m_2)$ effizient findbar (Aufwand $\\sim 2^{n/2}$ — Geburtstagsparadoxon).</li>'
            + '</ol>'
            + '<p>Wegen $2^{n/2}$ Kollisions-Bound benoetigt 128-bit-Sicherheit eine Hash-Ausgabe von &ge;256 bit. <strong>SHA-256</strong> (FIPS 180-4) und <strong>SHA-3-256</strong> (FIPS 202) sind Standard. <strong>BLAKE2/3</strong> sind schnellere Alternativen, aber nicht NIST-zugelassen.</p>'

            + '<h4>1.3.2 MD5 und SHA-1 als Negativbeispiel</h4>'
            + '<p>MD5 ist seit 2004 (Wang et al.) und SHA-1 seit 2017 (SHAttered, Stevens et al.) praktisch kollisions-gebrochen. NIST hat SHA-1 in SP 800-131A r2 fuer alle kryptographischen Anwendungen verboten (Endgueltig 2030, fuer Signaturen bereits seit 2013). MD5 ist ausschliesslich noch als Pruefsumme (nicht-kryptographisch) tolerierbar.</p>'

            + '<h4>1.3.3 MACs: HMAC, KMAC, Poly1305</h4>'
            + '<p><strong>HMAC</strong> (RFC 2104, FIPS 198-1): $\\text{HMAC}(K,m) = H((K\\oplus opad)\\,\\|\\,H((K\\oplus ipad)\\,\\|\\,m))$. Sicher unter der Annahme einer pseudozufaelligen Kompressionsfunktion. Standard in TLS, IPsec, JWS.</p>'
            + '<p><strong>KMAC</strong> (NIST SP 800-185, 2016): direkter MAC aus Keccak/SHA-3 ohne den HMAC-Trick — kompakter und schneller. <strong>Poly1305</strong> ist ein One-Time-MAC (Bernstein 2005), kombiniert mit ChaCha20 in RFC 8439.</p>'

            + '<h4>1.3.4 Digitale Signaturen</h4>'
            + '<table><thead><tr><th>Verfahren</th><th>Standard</th><th>Eigenschaften</th></tr></thead><tbody>'
            + '<tr><td>RSA-PSS</td><td>RFC 8017, FIPS 186-5</td><td>Probabilistisch, nachweisbar sicher unter RSA-Annahme.</td></tr>'
            + '<tr><td>ECDSA</td><td>FIPS 186-5</td><td>Klein/schnell. Nonce-Reuse fatal (PlayStation 3 Sony Hack 2010).</td></tr>'
            + '<tr><td>Ed25519/Ed448</td><td>RFC 8032</td><td>Deterministisch (kein Nonce-RNG noetig), konstantzeit, kollisionsfest auch bei Hash-Schwaechen.</td></tr>'
            + '<tr><td>ML-DSA</td><td>FIPS 204 (2024)</td><td>Quanten-resistent, groessere Signaturen (~2.5 KB).</td></tr>'
            + '<tr><td>SLH-DSA</td><td>FIPS 205 (2024)</td><td>Hash-basiert, konservativster Sicherheitsanker, sehr grosse Signaturen (~8-50 KB).</td></tr>'
            + '</tbody></table>'

            + '<p class="text-xs text-slate-500"><em>Quellen: FIPS 180-4, 198-1, 202, 186-5, 204, 205; RFC 2104, 8017, 8032, 8439; NIST SP 800-131A r2, 800-185; Wang et al. CRYPTO 2005 (MD5); Stevens et al. CRYPTO 2017 (SHAttered).</em></p>'
    };

    const PAGE_KRYPTO_PKI = {
        title: '1.4 Schluesselmanagement und PKI',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) den X.509-Zertifikats-Lebenszyklus erlaeutern, (2) HSM- und KMS-Architekturen einordnen, (3) Key-Derivation-Functions HKDF, Argon2 und scrypt unterscheiden, (4) typische PKI-Vorfaelle (DigiNotar, Symantec) als Lehrbeispiele zitieren.</blockquote>'

            + '<h4>1.4.1 X.509 und PKI</h4>'
            + '<p>Eine Public-Key-Infrastruktur bindet einen oeffentlichen Schluessel an eine Identitaet via signierter Zertifikate (X.509 v3, RFC 5280). Hierarchie: <strong>Root-CA</strong> &rarr; Intermediate-CA &rarr; End-Entity. Wider­rufsmechanismen: <strong>CRL</strong> (klassische Sperrlisten) und <strong>OCSP</strong> (Online Certificate Status Protocol, RFC 6960). Da OCSP Privatsphaeren-Probleme bringt, wird in TLS 1.3 <strong>OCSP-Stapling</strong> (RFC 6066) bevorzugt.</p>'
            + '<p>Lehrreiche Vorfaelle: <em>DigiNotar 2011</em> (kompromittierte CA, gefaelschte Google-Zertifikate fuer Iran), <em>Symantec 2017</em> (Browser-Distrust wegen Mis-Issuance). Konsequenz: <strong>Certificate Transparency</strong> (RFC 6962, in Chrome seit 2018 Pflicht).</p>'

            + '<h4>1.4.2 HSM und KMS</h4>'
            + '<p>Schluessel mit hohem Schutzbedarf werden in <strong>Hardware Security Modules</strong> gehalten — physisch gehaertete Geraete, FIPS 140-3 zertifiziert (Level 1-4, je nach Tamper-Schutz). Anwendungen sehen die Schluessel nie im Klartext, sondern senden Operations-Anfragen (sign/decrypt) ueber PKCS#11 oder Cloud-APIs.</p>'
            + '<p><strong>Key Management Systems</strong> (z.B. AWS KMS, Azure Key Vault, HashiCorp Vault) abstrahieren HSMs und implementieren Lifecycle (Generation, Rotation, Audit-Log, Versioning). Wichtig: <em>Envelope Encryption</em> — Daten werden mit kurzlebigen Data-Encryption-Keys (DEKs) chiffriert, die DEKs wiederum mit dem Master-Key (KEK) im KMS.</p>'

            + '<h4>1.4.3 Key-Derivation-Functions</h4>'
            + '<table><thead><tr><th>KDF</th><th>Standard</th><th>Anwendung</th></tr></thead><tbody>'
            + '<tr><td>HKDF</td><td>RFC 5869</td><td>Aus Zufalls- oder DH-Material gleichmaessige Sub-Schluessel ableiten. Default in TLS 1.3, Signal.</td></tr>'
            + '<tr><td>PBKDF2</td><td>RFC 8018</td><td>Legacy-Passwort-KDF. Iterationszahl 2024 mind. 600 000 (OWASP).</td></tr>'
            + '<tr><td>scrypt</td><td>RFC 7914</td><td>Speicher-hart, gegen GPU-/ASIC-Cracking.</td></tr>'
            + '<tr><td>Argon2id</td><td>RFC 9106</td><td>PHC-Sieger 2015. <strong>OWASP-Empfehlung 2024 fuer neue Anwendungen.</strong></td></tr>'
            + '</tbody></table>'

            + '<h4>1.4.4 Schluessel-Lebenszyklus</h4>'
            + '<p>NIST SP 800-57 r5 definiert sechs Phasen: <em>Pre-activation, Active, Suspended, Deactivated, Compromised, Destroyed</em>. Schluessel-Gueltigkeit wird durch <strong>Cryptoperiod</strong> begrenzt — typisch 1-3 Jahre fuer Symmetric-Wrap-Keys, 3-5 Jahre fuer Signatur-Schluessel, &lt;1 Jahr fuer Session-Schluessel.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: RFC 5280, 5869, 6066, 6960, 6962, 7914, 8018, 9106; NIST SP 800-57 r5, FIPS 140-3 (2019); Eckert, IT-Sicherheit, 11. Aufl. 2023, Kap. 9; Mozilla SSL Configuration Guidelines 2024; OWASP Cheat Sheet "Password Storage" 2024.</em></p>'
    };

    const QUIZ_KRYPTO = [
        q('Welches Reduktionspolynom liegt der AES-S-Box im Galoisfeld $\\mathrm{GF}(2^8)$ zugrunde?',
            ['$x^8+x^4+x^3+x+1$', '$x^8+x^7+x^2+x+1$', '$x^8+x^6+x^5+x^4+1$', '$x^8+x^5+x^3+x+1$'], 0,
            'FIPS 197 §4.2: das irreduzible Polynom ist $m(x)=x^8+x^4+x^3+x+1$.'),
        q('Wie viele Runden hat AES-256?', ['10', '12', '14', '16'], 2,
            'FIPS 197 Tabelle 4.1: 10 / 12 / 14 Runden fuer Schluessellaengen 128 / 192 / 256 bit.'),
        q('Welche Aussage zu ECB ist korrekt?',
            ['Liefert IND-CPA-Sicherheit', 'Identische Klartextbloecke ergeben identische Chiffratbloecke', 'Erfordert eine 96-bit-Nonce', 'Bietet Authenticated Encryption'], 1,
            'NIST SP 800-38A; Eckert §7.4.2: ECB ist deterministisch und damit IND-CPA-unsicher; deshalb in keinem modernen Standard mehr empfohlen.'),
        q('Welcher Modus liefert Authenticated Encryption mit Associated Data?',
            ['AES-CBC', 'AES-CTR', 'AES-GCM', 'AES-XTS'], 2,
            'NIST SP 800-38D: GCM kombiniert CTR-Verschluesselung mit GHASH-Authentisierung und ist AEAD.'),
        q('Was ist die maximale empfohlene Anzahl Nachrichten pro AES-GCM-Schluessel mit 96-bit-Nonce vor Schluesselrotation?',
            ['$2^{16}$', '$2^{32}$', '$2^{64}$', '$2^{96}$'], 1,
            'NIST SP 800-38D §8.3: bei zufaellig erzeugten 96-bit-Nonces verlangt der Birthday-Bound Schluesselrotation spaetestens nach $2^{32}$ Nachrichten.'),
        q('Welche Schwachstelle wurde durch POODLE (CVE-2014-3566) ausgenutzt?',
            ['RSA-Schluessellaenge', 'CBC-Padding-Oracle in SSL 3.0', 'GCM-Tag-Truncation', 'ECDH-Schwache-Kurven'], 1,
            'POODLE 2014: SSL-3.0-CBC-Padding-Oracle. Konsequenz: SSL 3.0 wird seitdem in allen Browsern abgeschaltet.'),
        q('Welcher AEAD-Modus wird in TLS 1.3 ohne Hardware-AES-Beschleunigung als bevorzugte Cipher Suite genutzt?',
            ['AES-CCM-8', 'ChaCha20-Poly1305', 'AES-CBC-HMAC-SHA256', '3DES-CBC'], 1,
            'RFC 8446 Anhang B.4: ChaCha20-Poly1305 (RFC 8439) ist Mandatory-to-implement und in mobilen Stacks bevorzugt.'),
        q('Ein Angreifer beobachtet zwei Chiffrate $c_1=m_1\\oplus K$ und $c_2=m_2\\oplus K$ mit demselben CTR-Schluesselstrom $K$. Was kann er berechnen?',
            ['Den Schluessel $K$ direkt', '$m_1\\oplus m_2$', 'Das Authentication-Tag', 'Nichts ohne Quantencomputer'], 1,
            'CTR ohne Authentisierung + Nonce-Reuse: $c_1\\oplus c_2 = m_1\\oplus m_2$. Mit Klartext-Statistik (Crib-Dragging) lassen sich beide Klartexte rekonstruieren.'),
        q('Welche RSA-Schluessellaenge ist 2024 nach BSI TR-02102-1 fuer Neuanwendungen empfohlen?',
            ['1024 bit', '2048 bit', '3072 bit', '15360 bit'], 2,
            'BSI TR-02102-1:2024 §3.5: 3072 bit fuer Neuanwendungen, 2048 bit nur fuer Bestand bis 2030, 1024 bit verboten.'),
        q('Welche ECC-Schluessellaenge entspricht ungefaehr 128 bit Sicherheit?',
            ['160 bit', '224 bit', '256 bit', '384 bit'], 2,
            'NIST SP 800-57 r5 Tab. 2: 256-bit-ECC entspricht 128-bit-symmetrischer Sicherheit.'),
        q('Warum ist Ed25519 gegenueber ECDSA-P-256 oft vorzuziehen?',
            ['Ed25519 nutzt RSA-Faktorisierung', 'Ed25519 ist deterministisch und immun gegen Nonce-Reuse-Bugs', 'Ed25519 ist quantensicher', 'Ed25519 hat kuerzere oeffentliche Schluessel als P-256'], 1,
            'RFC 8032 §5.1.6: EdDSA leitet den Pseudo-Nonce deterministisch aus Schluessel + Nachricht ab, vermeidet so RNG-Schwaechen wie beim PS3-Sony-Hack 2010.'),
        q('Was bezeichnet "Forward Secrecy"?',
            ['Schluessel werden vorausschauend rotiert', 'Kompromittierte Langzeit-Schluessel exponieren keine alten Sitzungen', 'Pakete koennen vorverschickt werden', 'Schluessel werden vor der Authentisierung geprueft'], 1,
            'TLS 1.3 erzwingt (EC)DHE; aufgezeichnete Sitzungen bleiben auch bei spaeterer Schluessel-Kompromittierung vertraulich.'),
        q('Welcher NIST-Standard von 2024 spezifiziert ML-KEM (Kyber)?',
            ['FIPS 197', 'FIPS 202', 'FIPS 203', 'FIPS 205'], 2,
            'FIPS 203 (August 2024): ML-KEM, basiert auf CRYSTALS-Kyber.'),
        q('Welcher NIST-PQC-Standard ist hash-basiert?',
            ['ML-KEM (FIPS 203)', 'ML-DSA (FIPS 204)', 'SLH-DSA (FIPS 205)', 'Falcon'], 2,
            'FIPS 205: SLH-DSA basiert auf SPHINCS+ und ist hash-basiert (konservatives Sicherheitsfundament).'),
        q('Was bedeutet "Harvest-Now-Decrypt-Later"?',
            ['Komprimierung nach der Verschluesselung', 'Heutige Chiffrate werden gespeichert und spaeter mit Quantencomputer entschluesselt', 'Schluessel werden in Erntezeit rotiert', 'Cloud-Schluessel werden lokal gespiegelt'], 1,
            'NIST/CNSA-Begriff: Angreifer speichert heute klassisch verschluesselte Daten, um sie spaeter post-quantum zu brechen — Hauptmotivation fuer Hybrid-Migration.'),
        q('Welche Hash-Ausgabelaenge ist bei 128-bit Kollisions-Sicherheit mindestens noetig?',
            ['128 bit', '192 bit', '256 bit', '512 bit'], 2,
            'Geburtstagsparadoxon: Kollisionen in $\\sim 2^{n/2}$ Versuchen; 256-bit-Hash liefert 128-bit-Kollisions-Sicherheit.'),
        q('Welche Eigenschaft fehlt MD5 nachweislich seit 2004?',
            ['Preimage-Resistenz', 'Second-Preimage-Resistenz', 'Kollisionsresistenz', 'Avalanche-Effekt'], 2,
            'Wang et al., CRYPTO 2005: praktische MD5-Kollisionen in Sekunden. Preimage-Resistenz ist formal noch nicht voll gebrochen.'),
        q('Wann wurden die ersten praktischen SHA-1-Kollisionen veroeffentlicht?',
            ['2005 (theoretisch)', '2017 (SHAttered)', '2020 (Chosen-Prefix)', '2023'], 1,
            'Stevens, Bursztein et al. 2017: erste vollstaendige SHA-1-Kollision (PDF-Beispiele). Chosen-Prefix-Kollision folgte 2020 (SHAmbles).'),
        q('Wie ist HMAC definiert?',
            ['$H(K\\,\\|\\,m)$', '$H(m\\,\\|\\,K)$', '$H((K\\oplus opad)\\,\\|\\,H((K\\oplus ipad)\\,\\|\\,m))$', '$\\mathrm{AES}_K(m)$'], 2,
            'RFC 2104 / FIPS 198-1: ipad=0x3636…, opad=0x5C5C…; verhindert Length-Extension-Angriffe gegen Merkle-Damgard-Hashes.'),
        q('Welcher MAC-Standard kommt mit ChaCha20 zum Einsatz?',
            ['HMAC-SHA1', 'GMAC', 'Poly1305', 'CMAC-AES'], 2,
            'RFC 8439 / RFC 7539: ChaCha20-Poly1305 als AEAD-Konstruktion. Poly1305 ist ein One-Time-MAC nach Bernstein 2005.'),
        q('Welche Padding-Variante ist bei RSA-Verschluesselung 2024 vorzuziehen?',
            ['PKCS#1 v1.5', 'OAEP', 'kein Padding (Schul-RSA)', 'X9.31'], 1,
            'RFC 8017 §7.1: RSAES-OAEP. PKCS#1 v1.5 ist Bleichenbacher-anfaellig (1998, ROBOT 2017) und nur noch fuer Bestand zulaessig.'),
        q('Was unterscheidet OCSP-Stapling von klassischem OCSP?',
            ['Stapling nutzt CRL statt OCSP', 'Server liefert die OCSP-Antwort signiert mit dem TLS-Handshake aus', 'Stapling deaktiviert Certificate Transparency', 'Stapling ersetzt das X.509-Zertifikat'], 1,
            'RFC 6066 §8: Server fragt OCSP-Response selbst ab und liefert sie im TLS-Handshake mit — schuetzt Privatsphaere des Clients und entlastet OCSP-Responder.'),
        q('Welcher Vorfall fuehrte zur Einfuehrung von Certificate Transparency?',
            ['Heartbleed', 'DigiNotar 2011', 'Snowden-Leaks', 'Meltdown'], 1,
            'DigiNotar 2011 (gefaelschte Google-Zertifikate fuer iranische Nutzer) war Hauptmotiv. RFC 6962 erschien 2013.'),
        q('Was ist FIPS 140-3 Level 3 ueblicherweise mit?',
            ['Software-Only-Module', 'Tamper-Evidence', 'Tamper-Resistance mit aktiver Loeschung von Schluesseln', 'Tamper-Detection-Mesh und Umgebungsangriff-Schutz'], 2,
            'FIPS 140-3 Level 3 fordert identitaetsbasierte Authentisierung und tamper-resistente Behaeltnisse mit Zeroization-Mechanismen.'),
        q('Welcher KDF ist OWASP-2024-Empfehlung fuer neue Passwort-Hashing-Anwendungen?',
            ['MD5-Crypt', 'bcrypt', 'PBKDF2-SHA1', 'Argon2id'], 3,
            'OWASP Password Storage Cheat Sheet 2024: Argon2id ist erste Wahl; bcrypt akzeptabel als Fallback. MD5-Crypt und PBKDF2-SHA1 nur noch fuer Legacy.'),
        q('Welche Aussage zu HKDF (RFC 5869) ist richtig?',
            ['HKDF speichert Passwoerter sicher ab', 'HKDF kombiniert Extract- und Expand-Phase um aus Zufallsmaterial gleichmaessige Sub-Schluessel zu erzeugen', 'HKDF ersetzt AES-GCM', 'HKDF ist quantensicher'], 1,
            'RFC 5869: HKDF-Extract verdichtet Eingangs-Entropie, HKDF-Expand erzeugt beliebig viele Sub-Schluessel. Standard-KDF in TLS 1.3 und Signal Protocol.'),
        q('Welche Folge hat Nonce-Reuse bei AES-GCM?',
            ['Nur Verlust von Vertraulichkeit', 'Nur Verlust von Authentizitaet', 'Verlust von Vertraulichkeit UND Faelschungsfaehigkeit fuer beliebige Nachrichten', 'Keine Folge dank GHASH'], 2,
            'Joux 2006: bei Nonce-Reuse wird der Authentication-Key rekonstruierbar — Angreifer kann beliebige Nachrichten mit gueltigem Tag faelschen.'),
        q('Wie hoch ist die OWASP-2024-Mindestanzahl PBKDF2-SHA-256-Iterationen?',
            ['1 000', '10 000', '100 000', '600 000'], 3,
            'OWASP Password Storage Cheat Sheet 2024: PBKDF2-HMAC-SHA-256 mind. 600 000 Iterationen.'),
        q('Welcher Modus wird fuer Festplatten-Verschluesselung (BitLocker, dm-crypt) standardmaessig genutzt?',
            ['CBC', 'CTR', 'GCM', 'XTS'], 3,
            'NIST SP 800-38E spezifiziert AES-XTS fuer Block-orientierte Speichermedien — kein IV pro Block, kein Ciphertext-Expansion.'),
        q('Welche Aussage zu Quantum-Computing-Bedrohungen ist korrekt?',
            ['Grover halbiert die effektive symmetrische Schluessellaenge', 'Shor bricht AES-256 in polynomialer Zeit', 'BB84 ersetzt RSA', 'Quantencomputer brechen SHA-3-256 in $2^{64}$ Schritten'], 0,
            'Grover-Algorithmus (1996): generische Suche in $\\sqrt{N}$. Bedeutet AES-128 effektiv $2^{64}$, AES-256 bleibt $2^{128}$. Shor bricht RSA/ECC, nicht AES.')
    ];

    window.SCHULUNGEN.list.push({
        id: 'master_et_cybersec',
        code: 'MA-ET CyberSec',
        name: 'Master Elektrotechnik — Cyber-Security',
        short: 'MA-ET CyberSec',
        desc: 'Vertiefungsstudium Elektrotechnik mit Fokus Cyber-Security: Embedded Security, Netzwerk- und Industriesicherheit (IEC 62443), angewandte Kryptographie, Sichere Softwareentwicklung, Risikomanagement nach ISO 27001 / BSI Grundschutz, AI-Security.',
        status: 'preparation',
        chapters: [
            {
                id: 'krypto',
                title: 'Kapitel 1 — Angewandte Kryptographie',
                summary: 'Symmetrische und asymmetrische Verfahren, Hash-Funktionen, MACs, digitale Signaturen, Post-Quantum-Migration (FIPS 203/204/205), Schluesselmanagement.',
                pages: [PAGE_KRYPTO_SYM, PAGE_KRYPTO_ASYM, PAGE_KRYPTO_HASH, PAGE_KRYPTO_PKI],
                quiz: QUIZ_KRYPTO
            },
            {
                id: 'embedded',
                title: 'Kapitel 2 — Embedded Security',
                summary: 'Hardware-Sicherheit, Secure Boot, Trusted Execution Environments, Firmware-Update-Verfahren, Side-Channel-Resistenz, IoT-Security nach ETSI EN 303 645.',
                pages: [
                    placeholderPage('Secure Boot und Root-of-Trust', [
                        'Boot-Chain: ROM-Code, Bootloader, OS-Image',
                        'Hardware-Root-of-Trust: TPM 2.0, Secure Element, ARM TrustZone',
                        'Mess- und attestation-basierte Verfahren'
                    ]),
                    placeholderPage('Trusted Execution Environments', [
                        'ARM TrustZone, Intel SGX/TDX, AMD SEV-SNP',
                        'Confidential Computing, Remote Attestation',
                        'Bedrohungsmodell und bekannte Schwachstellen (Foreshadow, ZenBleed)'
                    ]),
                    placeholderPage('Firmware-Update-Sicherheit', [
                        'NIST SP 800-193 Platform Firmware Resiliency',
                        'Signierte Updates, A/B-Partition, Rollback-Schutz',
                        'Over-The-Air (OTA) — TLS, Mutual Auth, Update-Server-Hardening'
                    ]),
                    placeholderPage('Seitenkanal- und Fault-Injection-Angriffe', [
                        'Power-Analyse (SPA, DPA), elektromagnetische Analyse',
                        'Timing-Angriffe, Cache-Side-Channel (Spectre, Meltdown)',
                        'Fault-Injection: Voltage-Glitching, EM-Pulse, Laser',
                        'Gegenmassnahmen: Maskierung, Konstantzeit-Implementierungen, Sensor-Mesh'
                    ])
                ],
                quiz: placeholderQuiz('Embedded Security')
            },
            {
                id: 'industrial',
                title: 'Kapitel 3 — Industrielle Netzsicherheit (OT / IEC 62443)',
                summary: 'OT vs. IT, Bedrohungsmodelle in der Automatisierung, Zonen- und Conduit-Modell, IEC 62443-3-3 System-Anforderungen, Anlagen-Hardening.',
                pages: [
                    placeholderPage('OT vs. IT — Sicherheitsanforderungen', [
                        'Verfuegbarkeit als Top-Schutzziel in OT',
                        'Echtzeit-Anforderungen, Patch-Restriktionen, Lebenszyklus 20+ Jahre',
                        'Purdue-Modell und Zonen 0-5'
                    ]),
                    placeholderPage('IEC 62443-Serie im Ueberblick', [
                        'Teile 1 (Begriffe), 2 (Programme), 3 (System), 4 (Komponenten)',
                        'Security Levels SL 1-4, Foundational Requirements FR 1-7',
                        'Zonen-und-Conduit-Modell nach IEC 62443-3-2'
                    ]),
                    placeholderPage('Protokolle und Hardening', [
                        'Modbus, PROFINET, OPC UA — Sicherheits-Optionen',
                        'Network Segmentation, Data Diodes, Industrial Firewalls',
                        'Anomalie-Erkennung in OT-Netzen (Claroty, Nozomi, Dragos)'
                    ]),
                    placeholderPage('Vorfaelle und Lessons Learned', [
                        'Stuxnet (2010): SCADA + Zero-Day + USB-Verbreitung',
                        'Industroyer/CRASHOVERRIDE (2016), Triton (2017), Industroyer2 (2022)',
                        'Konsequenzen fuer Anlagen-Architektur und Incident Response'
                    ])
                ],
                quiz: placeholderQuiz('Industrielle Netzsicherheit')
            },
            {
                id: 'sse',
                title: 'Kapitel 4 — Sichere Softwareentwicklung (S-SDLC)',
                summary: 'Threat Modeling (STRIDE, LINDDUN), sichere Coding-Standards, statische/dynamische Analyse, OWASP Top 10 / ASVS, Supply-Chain-Sicherheit (NIST SP 800-218 SSDF).',
                pages: [
                    placeholderPage('Threat Modeling', [
                        'STRIDE pro Datenfluss, Anwendung auf Embedded und Cloud',
                        'LINDDUN fuer Privacy-Threats',
                        'Attack Trees, MITRE ATT&CK fuer ICS'
                    ]),
                    placeholderPage('Sichere Coding-Standards', [
                        'CERT C/C++ Coding Standard, MISRA C',
                        'Memory-Safety: Bounds-Checking, Sanitizers, Rust',
                        'CWE Top 25 (2024) und Mitigation-Patterns'
                    ]),
                    placeholderPage('Static / Dynamic Application Security Testing', [
                        'SAST-Werkzeuge (Coverity, CodeQL, SonarQube)',
                        'DAST und Fuzzing (libFuzzer, AFL++)',
                        'Software Composition Analysis (SCA), SBOM (CycloneDX, SPDX)'
                    ]),
                    placeholderPage('Supply-Chain-Security und SSDF', [
                        'NIST SP 800-218 Secure Software Development Framework',
                        'SLSA-Levels, in-toto, sigstore',
                        'Vorfaelle: SolarWinds, log4shell, xz-utils Backdoor (2024)'
                    ])
                ],
                quiz: placeholderQuiz('Sichere Softwareentwicklung')
            },
            {
                id: 'risk',
                title: 'Kapitel 5 — Risikomanagement und Compliance',
                summary: 'ISO/IEC 27001:2022 ISMS, BSI-Grundschutz, NIS2-Richtlinie (EU 2022/2555), Cyber Resilience Act, Risikoanalyse-Methoden, Audits und Zertifizierung.',
                pages: [
                    placeholderPage('ISO/IEC 27001:2022 — ISMS-Aufbau', [
                        'Plan-Do-Check-Act, Statement of Applicability',
                        'Anhang A (93 Controls in 4 Themengruppen)',
                        'Zertifizierungsprozess, interne Audits, Management Review'
                    ]),
                    placeholderPage('BSI IT-Grundschutz', [
                        'Grundschutz-Kompendium 2024, Bausteinkonzept',
                        'Schutzbedarfsfeststellung, Risikoanalyse',
                        'Vergleich mit ISO 27001 (Mapping)'
                    ]),
                    placeholderPage('Regulatorik EU/DE', [
                        'NIS2-Richtlinie (EU 2022/2555), Umsetzung in DE 2024-25',
                        'Cyber Resilience Act (CRA, EU 2024/2847)',
                        'KRITIS-Verordnung, IT-SiG 2.0',
                        'EU AI Act (2024/1689) — Schnittmenge mit Security'
                    ]),
                    placeholderPage('Quantitative und qualitative Risikoanalyse', [
                        'OCTAVE, FAIR (Factor Analysis of Information Risk)',
                        'CVSS v4.0 und CISA KEV-Katalog',
                        'Risk-Treatment-Optionen und Restrisiko'
                    ])
                ],
                quiz: placeholderQuiz('Risikomanagement und Compliance')
            },
            {
                id: 'aisec',
                title: 'Kapitel 6 — AI-Security und vertrauenswuerdige Systeme',
                summary: 'Adversarial Examples, Modell-Diebstahl, Membership-Inference, Prompt-Injection (OWASP LLM Top 10 v2025), MLOps-Security, EU-AI-Act-Pflichten.',
                pages: [
                    placeholderPage('Adversarial ML', [
                        'Evasion-Angriffe (FGSM, PGD, C&W)',
                        'Poisoning, Backdoor-Trigger',
                        'Robustheit: Adversarial Training, Certified Defenses'
                    ]),
                    placeholderPage('Privatsphaere und Modellschutz', [
                        'Membership-Inference, Modell-Inversion',
                        'Differential Privacy, Federated Learning',
                        'Modell-Diebstahl, Watermarking'
                    ]),
                    placeholderPage('LLM- und Agentic-AI-Sicherheit', [
                        'OWASP Top 10 LLM v2025 — Prompt Injection, Excessive Agency',
                        'NIST AI 600-1 (Generative-AI-Profile)',
                        'Anthropic Model Context Protocol — Sicherheits-Implikationen'
                    ]),
                    placeholderPage('MLOps und Compliance', [
                        'CI/CD fuer ML, Modell-Registry, Reproducibility',
                        'EU-AI-Act-Anforderungen an Hochrisiko- und GPAI-Anbieter',
                        'ISO/IEC 42001:2023 — AI Management System'
                    ])
                ],
                quiz: placeholderQuiz('AI-Security')
            }
        ]
    });
})();
