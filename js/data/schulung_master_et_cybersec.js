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

    // ----------------------------------------------------------------------
    // Kapitel 2 — Embedded Security (PRODUKTIV)
    // Quellen: Eckert "IT-Sicherheit" 11. Aufl. 2023, Kap. 11 (Embedded);
    // Anderson "Security Engineering" 3rd ed. 2020, Kap. 18 (Tamper Resistance),
    // Kap. 20 (Side Channels); NIST SP 800-147B (BIOS Resiliency 2014),
    // SP 800-155 (BIOS Integrity Measurement Guidelines), SP 800-193
    // (Platform Firmware Resiliency, 2018), SP 800-90B (Entropy Sources, 2018);
    // ETSI EN 303 645 v3.1.3 (2024) Cyber Security for Consumer IoT;
    // ARM TrustZone Reference Manual; Intel SGX Developer Reference;
    // AMD SEV-SNP Whitepaper Rev. 1.55 (2023); Kocher 1996 (Timing),
    // Kocher/Jaffe/Jun 1999 (DPA); CVE-2017-5753/5715/5754 (Spectre/Meltdown);
    // Tang/Sethumadhavan/Stolfo 2017 (CLKSCREW); Bulck/Piessens/Strackx 2018
    // (Foreshadow, USENIX Security); Murdock et al. 2020 (Plundervolt);
    // Lipp et al. 2021 (PLATYPUS); Common Criteria PP-0084 (Smart Card).
    // ----------------------------------------------------------------------

    const PAGE_EMB_BOOT = {
        title: '2.1 Secure Boot und Hardware Root-of-Trust',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) eine vollstaendige Boot-Chain aus ROM-Code, Bootloader und OS beschreiben, (2) einen <em>Hardware</em>-Root-of-Trust (RoT) gegen Software-RoT abgrenzen, (3) Measured Boot von Verified Boot unterscheiden, (4) Funktion und Schutzziele eines TPM 2.0 nach ISO/IEC 11889:2015 erklaeren.</blockquote>'

            + '<h4>2.1.1 Boot-Chain und Vertrauenskette</h4>'
            + '<p>Eine sichere Boot-Chain folgt dem Prinzip <em>Chain-of-Trust</em>: jede Stufe verifiziert die naechste, bevor sie ausgefuehrt wird. Typische Reihenfolge auf modernen ARM-/x86-Plattformen:</p>'
            + '<ol>'
            + '<li><strong>Boot-ROM</strong> — unveraenderlich (Mask-ROM), enthaelt den ersten Code nach Reset und einen oeffentlichen Schluessel-Hash (<em>OTP-Fuses</em>).</li>'
            + '<li><strong>First-Stage-Bootloader (FSBL)</strong> — laedt aus Flash, wird vom ROM gegen den Fuse-Hash verifiziert.</li>'
            + '<li><strong>Second-Stage-Bootloader</strong> (z.B. U-Boot, GRUB, Windows Boot Manager) — vom FSBL signiert und geprueft.</li>'
            + '<li><strong>Kernel + initramfs</strong> — bei Linux z.B. <em>dm-verity</em>-geschuetzte Root-Partition.</li>'
            + '</ol>'
            + '<p>Die <strong>UEFI Secure Boot</strong>-Spezifikation (UEFI 2.10, 2024) implementiert diese Kette mit einer Hierarchie aus Plattform-Schluessel (PK), Key Exchange Key (KEK), Allowed Database (db) und Forbidden Database (dbx).</p>'

            + '<h4>2.1.2 Verified Boot vs. Measured Boot</h4>'
            + '<table><thead><tr><th>Merkmal</th><th>Verified Boot</th><th>Measured Boot</th></tr></thead><tbody>'
            + '<tr><td>Pruefzeitpunkt</td><td>vor Ausfuehrung — Halt bei Mismatch</td><td>nachtraeglich, Hash wird ins TPM-PCR erweitert</td></tr>'
            + '<tr><td>Reaktion</td><td>Boot-Abbruch / Recovery</td><td>Boot laeuft; Manipulation faellt bei Remote Attestation auf</td></tr>'
            + '<tr><td>Beispiele</td><td>Android Verified Boot 2.0, UEFI Secure Boot</td><td>TCG PC Client Spec, Intel TXT, Linux IMA</td></tr>'
            + '</tbody></table>'

            + '<h4>2.1.3 Trusted Platform Module (TPM 2.0)</h4>'
            + '<p>TPM 2.0 (ISO/IEC 11889:2015, TCG TPM Library Spec 1.59 / 2024) ist ein passiver Krypto-Coprozessor mit folgenden Kernfunktionen:</p>'
            + '<ul>'
            + '<li><strong>Platform Configuration Registers (PCR):</strong> 24 Slots, ausschliesslich erweiterbar via $\\mathrm{PCR}_i \\leftarrow H(\\mathrm{PCR}_i \\,\\|\\, \\text{measurement})$. Reset nur bei Plattform-Reset.</li>'
            + '<li><strong>Endorsement Key (EK)</strong> — herstellerseitig, eindeutig, signiert vom Hersteller-CA. Niemals exportierbar.</li>'
            + '<li><strong>Storage Root Key (SRK)</strong> — Wurzel der Sealing-Hierarchie.</li>'
            + '<li><strong>Sealing</strong>: Daten an PCR-Werte binden — Entschluesselung nur, wenn Plattform identisch gebootet wurde (Grundlage von BitLocker, LUKS-TPM).</li>'
            + '<li><strong>Quote / Attestation</strong>: signierter PCR-Snapshot, dient als Nachweis fuer Remote-Verifizierer.</li>'
            + '</ul>'
            + '<p>Praxis-Falle: TPM 2.0-Sniffing-Angriff (Hudson 2021) — bei diskretem TPM ueber den LPC-/SPI-Bus laesst sich der BitLocker-Volume-Master-Key abgreifen, wenn keine TPM+PIN-Konfiguration aktiv ist. Mitigation: TPM in CPU integrieren (fTPM/PTT) oder PIN/Passphrase erzwingen.</p>'

            + '<h4>2.1.4 ARM TrustZone und Secure Element</h4>'
            + '<p><strong>ARM TrustZone</strong> (seit ARMv7-A, in ARMv8-A erweitert um Secure-EL3) partitioniert die CPU in <em>Normal World</em> und <em>Secure World</em>. Der Wechsel erfolgt ueber den <code>SMC</code>-Befehl und einen <em>Secure Monitor</em>. Memory-Bus und Cache sind durch ein <em>NS-Bit</em> getrennt — der Normal World hat <em>kein</em> Bus-Zugriff auf Secure-Speicher.</p>'
            + '<p><strong>Secure Element (SE)</strong> nach Common Criteria EAL5+ (PP-0084-2014, BSI) ist ein autonomer Chip mit eigenem Krypto-Coprozessor und manipulationsgeschuetztem Speicher (Beispiele: NXP A71CH, Infineon OPTIGA Trust M, Microchip ATECC608B). Anwendung: ePass, eUICC, Mobile-Payment, Industrie-IoT-Identitaeten.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: ISO/IEC 11889:2015 (TPM 2.0); TCG TPM Library Spec 1.59, 2024; UEFI Specification 2.10, 2024; ARM Architecture Reference Manual ARMv8-A, Issue I.a (2023); BSI PP-0084-2014; Anderson 2020 §18; Eckert 2023 §11.4; Hudson, "Sniffing BitLocker Keys from a TPM", DEFCON 29, 2021.</em></p>'
    };

    const PAGE_EMB_TEE = {
        title: '2.2 Trusted Execution Environments und Confidential Computing',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) das TEE-Bedrohungsmodell beschreiben, (2) Intel SGX, AMD SEV-SNP und ARM CCA gegeneinander abgrenzen, (3) Remote Attestation in Grundzuegen erklaeren, (4) bekannte TEE-Angriffe und ihre Mitigation einordnen.</blockquote>'

            + '<h4>2.2.1 Was ist ein TEE?</h4>'
            + '<p>Ein <strong>Trusted Execution Environment</strong> (GlobalPlatform TEE System Architecture v1.3, 2022) ist eine isolierte Ausfuehrungsumgebung mit den Sicherheitseigenschaften: <em>Code-Integritaet</em>, <em>Daten-Vertraulichkeit</em>, <em>Daten-Integritaet</em>, <em>Attestierbarkeit</em>. Bedrohungsmodell: ein vollstaendig kompromittiertes OS (Hypervisor, Kernel, BIOS) darf TEE-Inhalte weder lesen noch manipulieren — nur denial-of-service ist erlaubt.</p>'

            + '<h4>2.2.2 Vergleich der wichtigsten TEEs</h4>'
            + '<table><thead><tr><th>Plattform</th><th>Granularitaet</th><th>Speicher-Schutz</th><th>Attestation</th></tr></thead><tbody>'
            + '<tr><td>Intel SGX (Skylake+)</td><td>Enclave (Prozess-Subset)</td><td>EPC verschluesselt durch MEE bzw. ab Ice Lake durch Total Memory Encryption mit MK-TME</td><td>EPID/DCAP, Quoting Enclave</td></tr>'
            + '<tr><td>Intel TDX (Sapphire Rapids+)</td><td>Trust Domain (vollstaendige VM)</td><td>SEAM-Modul, Memory Encryption mit Ephemeral Keys</td><td>Quote-Service-Enclave (DCAP)</td></tr>'
            + '<tr><td>AMD SEV-SNP (Milan+)</td><td>VM</td><td>AES-128-XEX pro VM, Reverse-Map-Table gegen Remap-Angriffe</td><td>VLEK/VCEK + AMD-CA</td></tr>'
            + '<tr><td>ARM CCA / Realm (ARMv9-A)</td><td>Realm-VM</td><td>Granule Protection Tables (GPT) + Memory Encryption</td><td>Realm Management Monitor</td></tr>'
            + '</tbody></table>'

            + '<h4>2.2.3 Remote Attestation</h4>'
            + '<p>Remote Attestation beweist einem Verifizierer, <em>welcher</em> Code in <em>welcher</em> Konfiguration im TEE laeuft. Standardablauf: das TEE generiert einen Quote = Signatur ueber (Mess-Wert des geladenen Codes, optional Nonce des Verifizierers, Plattform-Identitaet). Der Verifizierer prueft die Signatur gegen die Hersteller-CA und vergleicht den Mess-Wert mit einem erwarteten Hash (<em>Reference Value</em>, RFC 9334 RATS).</p>'
            + '<p>RFC 9334 (RATS, 2023) standardisiert das Architektur-Modell: Attester &rarr; Verifier &rarr; Relying Party. EAT (Entity Attestation Token, RFC 9711, 2024) definiert ein CBOR/JWT-Format fuer Quotes.</p>'

            + '<h4>2.2.4 Bekannte Angriffe</h4>'
            + '<ul>'
            + '<li><strong>Foreshadow / L1TF</strong> (Bulck et al., USENIX Security 2018): Spectre-Variante gegen SGX, exponiert L1-Cache-Inhalte. Mitigation: L1D-Flush bei Enclave-Exit (Microcode + Kernel).</li>'
            + '<li><strong>Plundervolt</strong> (Murdock et al., S&amp;P 2020): Undervolting ueber MSR <code>0x150</code> erzeugt Faults in SGX-Multiplikation. Mitigation: Microcode 0xE0 deaktiviert User-Voltage-Control.</li>'
            + '<li><strong>SGAxe / CrossTalk</strong> (2020): Diebstahl von SGX-Attestation-Keys ueber Microarchitectural Data Sampling.</li>'
            + '<li><strong>CacheOut, Aepic Leak</strong> (2020/2022): Cache- bzw. APIC-basierte Datenleaks gegen SGX.</li>'
            + '<li>Intel hat Server-SGX (Coffee Lake/Skylake-SP) als Reaktion eingestellt; auf Ice Lake-SP+ ist SGX wieder verfuegbar mit groesserer Enclave-Page-Cache (EPC) und gehaerteter Microarchitektur.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Intel SGX Developer Reference 2.20 (2024); Intel TDX Module Spec 1.5 (2023); AMD SEV-SNP Whitepaper Rev. 1.55 (2023); ARM CCA Architecture Spec DEN0125 (2023); GlobalPlatform TEE System Architecture v1.3, 2022; RFC 9334 RATS, 2023; RFC 9711 EAT, 2024.</em></p>'
    };

    const PAGE_EMB_FW = {
        title: '2.3 Sichere Firmware-Updates und Plattform-Resilienz',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die drei Schutzziele aus NIST SP 800-193 nennen, (2) ein A/B-Update-Schema mit Rollback-Schutz beschreiben, (3) typische OTA-Sicherheitsanforderungen aus ETSI EN 303 645 zitieren, (4) Anti-Rollback-Mechanismen im Detail erlaeutern.</blockquote>'

            + '<h4>2.3.1 NIST SP 800-193 Platform Firmware Resiliency</h4>'
            + '<p>SP 800-193 (Mai 2018) formuliert drei <strong>Schutzziele</strong> fuer Plattform-Firmware:</p>'
            + '<ol>'
            + '<li><strong>Protection</strong> — Firmware und kritische Daten sind vor unautorisierter Aenderung geschuetzt (Write-Protect, signierte Updates, Anti-Rollback-Counter).</li>'
            + '<li><strong>Detection</strong> — Korruption wird zuverlaessig erkannt (Integritaets-Pruefung beim Boot, Cryptographic Hashes).</li>'
            + '<li><strong>Recovery</strong> — Eine kompromittierte Firmware kann automatisch in einen vertrauenswuerdigen Zustand zurueckgefuehrt werden (Golden Image, Watchdog-Recovery).</li>'
            + '</ol>'

            + '<h4>2.3.2 A/B-Update mit Rollback-Schutz</h4>'
            + '<p>Bei A/B-Updates existieren zwei vollstaendige Slots; das System bootet wechselweise. Standardablauf:</p>'
            + '<ol>'
            + '<li>Slot A laeuft, Slot B wird beschrieben.</li>'
            + '<li>Bootloader markiert Slot B als <em>active+trial</em>.</li>'
            + '<li>Reboot in Slot B; nach erfolgreichem Boot setzt eine Anwendung das <em>healthy</em>-Flag.</li>'
            + '<li>Watchdog-Recovery: bleibt das Flag aus, bootet Slot A.</li>'
            + '</ol>'
            + '<p><strong>Anti-Rollback</strong>: ein monoton steigender Versionscounter im OTP-Fuse oder TPM-Monotonic-Counter verhindert, dass ein signiertes, aber alteresFirmware-Image mit bekannten Schwachstellen erneut geflasht werden kann (Android Verified Boot 2.0 §rollback_index; UEFI <code>SetVariable</code>+<code>EFI_VARIABLE_NON_VOLATILE</code> mit Authenticated Variable).</p>'

            + '<h4>2.3.3 OTA-Anforderungen aus ETSI EN 303 645 v3.1.3</h4>'
            + '<p>ETSI EN 303 645 v3.1.3 (2024) formuliert fuer Consumer-IoT u.a. die Anforderungen <em>5.3-7</em> (Updates):</p>'
            + '<ul>'
            + '<li>Updates muessen ueber einen <strong>vertrauenswuerdigen Kanal</strong> uebertragen werden (TLS 1.2+).</li>'
            + '<li>Authentizitaet und Integritaet der Update-Pakete sind kryptographisch zu pruefen.</li>'
            + '<li>Geraete sollen ueber Updates informieren und sie automatisiert anwenden koennen.</li>'
            + '<li>Definierter <strong>Defined Support Period</strong> muss veroeffentlicht werden — Cyber Resilience Act (EU 2024/2847) macht dies in der EU verbindlich (Art. 13, mind. 5 Jahre).</li>'
            + '</ul>'

            + '<h4>2.3.4 Kryptographische Update-Verifikation</h4>'
            + '<p>Empfohlenes Schema (BSI TR-02102-1:2024 + NIST SP 800-193): RSA-PSS &ge; 3072 bit oder ECDSA P-256/P-384 / EdDSA. Hashes: SHA-256 oder SHA-3-256. Fuer langlebige Geraete ab 2025 zusaetzlich Hybrid-Signaturen mit ML-DSA (FIPS 204) zur Vorbereitung auf PQC-Migration.</p>'
            + '<p>Praxis-Faelle:</p>'
            + '<ul>'
            + '<li><strong>BootHole</strong> (CVE-2020-10713): Buffer-Overflow im GRUB2-Configfile-Parser, umgeht UEFI Secure Boot. Patch erforderte Massen-dbx-Update.</li>'
            + '<li><strong>LogoFAIL</strong> (Binarly 2023): Image-Parser-Bugs in UEFI-Firmware ermoeglichen Code-Execution vor OS-Start.</li>'
            + '<li><strong>BlackLotus</strong> (ESET 2023): erste In-the-Wild-UEFI-Bootkit, das UEFI Secure Boot via CVE-2022-21894 umging.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: NIST SP 800-193 (2018); ETSI EN 303 645 v3.1.3 (2024); EU Cyber Resilience Act 2024/2847; BSI TR-02102-1:2024; Android Verified Boot 2.0 Reference (AOSP); UEFI Specification 2.10 (2024); CVE-2020-10713 BootHole; Binarly LogoFAIL Report Dec. 2023; ESET BlackLotus Analysis Mar. 2023.</em></p>'
    };

    const PAGE_EMB_SCA = {
        title: '2.4 Seitenkanal- und Fault-Injection-Angriffe',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) passive (SPA, DPA, EM, Timing, Cache) von aktiven (Fault-Injection) Angriffen unterscheiden, (2) das Grundprinzip der Differential Power Analysis erklaeren, (3) Konstantzeit-Implementierungen begruenden, (4) Spectre-Klassen einordnen.</blockquote>'

            + '<h4>2.4.1 Passive Seitenkanaele</h4>'
            + '<p>Klassifikation nach Anderson 2020, §20:</p>'
            + '<table><thead><tr><th>Kanal</th><th>Quelle</th><th>Angriff</th><th>Mitigation</th></tr></thead><tbody>'
            + '<tr><td>Power</td><td>Stromaufnahme</td><td>SPA, DPA (Kocher/Jaffe/Jun 1999)</td><td>Maskierung, Hiding, Dual-Rail-Logik</td></tr>'
            + '<tr><td>EM</td><td>elektromagnetische Abstrahlung</td><td>EMA, near-field-Probing</td><td>Schirmung, Layout-Rauschen</td></tr>'
            + '<tr><td>Timing</td><td>variable Laufzeit</td><td>Kocher 1996; Lucky 13 (CVE-2013-0169)</td><td>Konstantzeit-Code, blinding</td></tr>'
            + '<tr><td>Cache</td><td>Cache-Hit/Miss</td><td>Flush+Reload, Prime+Probe</td><td>Cache-Partitioning, Konstantzeit-Tabellen</td></tr>'
            + '<tr><td>Mikroarchitektur</td><td>Branch-Predictor, Speculative Execution</td><td>Spectre v1/v2/v4, Meltdown</td><td>LFENCE/IBRS/STIBP/SSBD-Microcode, Retpoline, KPTI</td></tr>'
            + '<tr><td>Acoustic / Photonic</td><td>Schall, Photonen</td><td>Genkin/Shamir 2014, PLATYPUS 2021</td><td>Filterung, Sensor-Erkennung</td></tr>'
            + '</tbody></table>'

            + '<h4>2.4.2 Differential Power Analysis (DPA)</h4>'
            + '<p>Grundidee (Kocher/Jaffe/Jun, CRYPTO 1999): bei einem Krypto-Algorithmus mit unbekanntem Schluessel $k$ und vielen bekannten Klartexten $p_i$ wird fuer jeden $p_i$ die Stromkurve $T_i(t)$ aufgenommen. Fuer eine Hypothese $\\hat{k}$ wird ein <em>Selektionsbit</em> $s_i = f(p_i,\\hat{k})$ berechnet (z.B. ein Bit der ersten S-Box-Ausgabe). Korrelation:</p>'
            + '<p>$$\\Delta(t) = \\frac{1}{|S_1|}\\sum_{i\\in S_1} T_i(t) - \\frac{1}{|S_0|}\\sum_{i\\in S_0} T_i(t)$$</p>'
            + '<p>Fuer richtiges $\\hat{k}$ entsteht ein scharfer Peak; fuer falsches $\\hat{k}$ rauscht $\\Delta(t)$ um Null. Heute ueblich: <strong>CPA</strong> (Brier/Clavier/Olivier 2004) mit Pearson-Korrelation gegen ein Power-Modell (Hamming-Weight oder Hamming-Distance).</p>'

            + '<h4>2.4.3 Konstantzeit-Implementierungen</h4>'
            + '<p>Eine Funktion ist <em>konstantzeit</em>, wenn ihre Ausfuehrungszeit und ihr Speicherzugriffsmuster <strong>nicht</strong> vom geheimen Eingang abhaengen. Pflicht-Patterns:</p>'
            + '<ul>'
            + '<li><strong>Keine geheimnis-abhaengigen Branches</strong>. Statt <code>if (k_bit) acc = mul(acc, x);</code> wird konditionsfrei mit Maskierung gerechnet.</li>'
            + '<li><strong>Keine geheimnis-abhaengigen Speicherzugriffe</strong>. AES-T-Tables sind cache-anfaellig (Bernstein 2005); modern: Bit-Slicing oder AES-NI / ARMv8-Crypto-Instructions.</li>'
            + '<li><strong>Konstantzeit-Vergleiche</strong>: <code>memcmp</code> ist verboten — stattdessen <code>volatile</code>-XOR-OR-Akkumulator.</li>'
            + '</ul>'
            + '<p>Tooling: <code>ct-verif</code>, <code>dudect</code>, <code>ctgrind</code>, Coq-Beweis fuer HACL*.</p>'

            + '<h4>2.4.4 Fault-Injection</h4>'
            + '<ul>'
            + '<li><strong>Voltage-Glitching</strong>: kurze Spannungseinbrueche skippen Instruktionen — Boneh/DeMillo/Lipton 1997 zeigte, dass <em>eine</em> fehlerhafte RSA-CRT-Signatur den geheimen Schluessel via $\\gcd$ enthuellt. Mitigation: Doppel-Berechnung + Verifikation.</li>'
            + '<li><strong>Clock-Glitching</strong>: zu kurze Taktperioden verursachen Setup-Time-Verletzungen.</li>'
            + '<li><strong>EM- und Laser-Pulse</strong>: lokal begrenzte Bit-Flips; Common-Criteria-EAL5+ schreibt aktive Sensoren und Doppel-Logic vor.</li>'
            + '<li><strong>Rowhammer</strong> (Kim et al., ISCA 2014): DRAM-Bit-Flips durch wiederholten Zugriff auf Nachbarzeilen — uebertragen auf Speicher-Integritaet (CVE-2018-9442 Drammer auf Android).</li>'
            + '<li><strong>CLKSCREW</strong> (Tang/Sethumadhavan/Stolfo, USENIX 2017): Software-induziertes Glitching durch DVFS-Manipulation.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Kocher 1996 (Timing, CRYPTO); Kocher/Jaffe/Jun 1999 (DPA, CRYPTO); Brier/Clavier/Olivier 2004 (CPA, CHES); Boneh/DeMillo/Lipton 1997 (Bellcore-Attack); Anderson 2020 §20; CVE-2017-5753/5715/5754 (Spectre/Meltdown); Bulck et al. 2018 (Foreshadow); Murdock et al. 2020 (Plundervolt); Kim et al. 2014 (Rowhammer); Lipp et al. 2021 (PLATYPUS).</em></p>'
    };

    const QUIZ_EMB = [
        q('Was ist die Aufgabe des Boot-ROM in einer Hardware-Root-of-Trust?',
            ['Es enthaelt unveraenderlichen ersten Code und einen Hash des erlaubten Bootloader-Schluessels',
             'Es speichert den privaten Signaturschluessel des Herstellers',
             'Es fuehrt das vollstaendige Betriebssystem aus',
             'Es ersetzt den TPM bei deaktivierter Hardware'], 0,
            'Boot-ROM ist Mask-ROM, kann nicht ueberschrieben werden, und verifiziert die naechste Stufe gegen einen OTP-Fuse-Hash. Private Schluessel verlassen niemals die HSM-Infrastruktur des Herstellers (Eckert 2023 §11.4).'),
        q('Wodurch unterscheiden sich Verified Boot und Measured Boot grundlegend?',
            ['Verified Boot bricht bei Mismatch ab, Measured Boot setzt den Boot fort und protokolliert in PCRs',
             'Verified Boot benoetigt zwingend ein TPM, Measured Boot nicht',
             'Measured Boot verschluesselt die Firmware, Verified Boot signiert sie',
             'Beide Begriffe sind synonym'], 0,
            'TCG PC Client Spec 1.6: Measured Boot erweitert nur PCRs, Boot laeuft weiter. Manipulation faellt erst durch Remote Attestation auf. Verified Boot (Android 2.0, UEFI Secure Boot) bricht den Boot ab.'),
        q('Welcher PCR-Wert ist typisch fuer den UEFI-Boot-Manager nach TCG PC Client Spec?',
            ['PCR 4', 'PCR 0', 'PCR 7', 'PCR 16'], 0,
            'TCG PC Client Platform Firmware Profile 1.06 §3.3.3.1: PCR 4 = Boot Manager Code; PCR 0 = SRTM/CRTM, PCR 7 = Secure Boot Policy, PCR 16 = Debug.'),
        q('Was beweist eine TPM-Attestation gegenueber einem Remote-Verifizierer?',
            ['Welche Komponenten in welcher Reihenfolge geladen wurden, signiert vom Endorsement-Key-Pfad',
             'Dass der Benutzer ein gueltiges Passwort eingegeben hat',
             'Dass die Festplatte nicht ausgetauscht wurde',
             'Dass das Geraet online ist'], 0,
            'TPM-Quote ist signierter PCR-Snapshot. Authentizitaet ueber EK-Zertifikat des Herstellers (TCG TPM Library Spec 1.59 §16; RFC 9334 RATS).'),
        q('Welche Eigenschaft eines TPM-PCR ist sicherheitskritisch?',
            ['Es ist nur durch Extend-Operation veraenderbar und resettet ausschliesslich beim Plattform-Reset',
             'Es kann jederzeit zurueckgesetzt werden',
             'Es ist exportierbar in andere TPMs',
             'Es speichert Klartext-Konfigurationsdateien'], 0,
            'PCR-Extend: $\\mathrm{PCR}\\leftarrow H(\\mathrm{PCR}\\,\\|\\,\\text{m})$. Append-only, Reset nur bei Plattform-Reset (TCG TPM Library Spec 1.59 §17.5).'),
        q('Welcher Angriff zielt auf diskrete TPMs ueber den LPC-/SPI-Bus?',
            ['TPM-Sniffing zur Extraktion des BitLocker-VMK ohne PIN',
             'Differential Fault Analysis am TPM-Speicher',
             'Spectre-Variante 2',
             'Cold-Boot-Angriff auf den TPM'], 0,
            'Hudson 2021 (DEFCON 29): unverschluesselter LPC-Bus ermoeglicht Sniffen des Volume-Master-Keys, sofern keine PIN/Pre-Boot-Authentication aktiv ist. Mitigation: fTPM oder PIN.'),
        q('Worin partitioniert ARM TrustZone die CPU?',
            ['Normal World und Secure World, getrennt durch ein NS-Bit auf System-Bus und Cache',
             'Hypervisor- und Gast-Kontext via Stage-2-MMU',
             'Big- und LITTLE-Cores',
             'Application Processor und DSP'], 0,
            'TrustZone (ARMv8-A): NS-Bit propagiert ueber AXI-Bus; Secure-Memory ist fuer Normal-World nicht zugreifbar. Wechsel ueber Secure Monitor Call (SMC) (ARM ARMv8-A Reference Manual Issue I.a §D5).'),
        q('Was charakterisiert ein Common-Criteria-EAL5+-Secure-Element?',
            ['Hardware-Manipulationsschutz, evaluierter Lebenszyklus, oft mit aktiver Sensorik gegen Fault-Injection',
             'Reine Software-Loesung in einer Enclave',
             'Cloud-basierter Schluesselspeicher',
             'Optionaler Modus eines Standard-Mikrocontrollers'], 0,
            'CC EAL5+ verlangt semi-formale Designmethodik und umfassende Vulnerability-Analyse. PP-0084-2014 (BSI) ist das Standard-Schutzprofil fuer Smart Cards / SE.'),
        q('Welches Schutzziel adressiert "Detection" in NIST SP 800-193?',
            ['Zuverlaessige Erkennung von Firmware-Korruption beim Boot',
             'Verhinderung jeglicher Aenderung an der Firmware',
             'Automatische Wiederherstellung nach Manipulation',
             'Verschluesselung der Firmware-Updates'], 0,
            'SP 800-193 §3 nennt drei Ziele: Protection, Detection, Recovery. Detection = Integritaets-Pruefung beim Boot.'),
        q('Was leistet ein Anti-Rollback-Counter im Firmware-Update?',
            ['Er verhindert das Flashen einer aelteren, signierten Version mit bekannter Schwachstelle',
             'Er beschleunigt das Update durch Caching',
             'Er prueft die Bandbreite des OTA-Kanals',
             'Er ersetzt die Signatur des Update-Pakets'], 0,
            'Monoton steigender Versionscounter im OTP-Fuse oder TPM-Monotonic-Counter. AVB 2.0 §rollback_index; UEFI Authenticated Variable.'),
        q('Welches Signaturverfahren empfiehlt BSI TR-02102-1:2024 fuer langlebige Embedded-Firmware?',
            ['ECDSA P-256/P-384, EdDSA oder RSA-PSS &ge; 3072 bit; perspektivisch Hybrid mit ML-DSA',
             'RSA-1024 mit PKCS#1 v1.5',
             'DSA-1024 mit SHA-1',
             'Ungeprueft, da Firmware ohnehin Read-Only'], 0,
            'BSI TR-02102-1:2024 Tabelle 1.2.1 empfiehlt RSA-PSS &ge; 3072, ECDSA P-256+, EdDSA. Fuer PQC-Vorbereitung Hybrid mit ML-DSA (FIPS 204).'),
        q('Welche EU-Verordnung verpflichtet Hersteller zu definierten Support-Zeitraeumen fuer vernetzte Produkte?',
            ['Cyber Resilience Act (EU 2024/2847)',
             'eIDAS 2.0 (EU 2024/1183)',
             'Digital Services Act (EU 2022/2065)',
             'GDPR (EU 2016/679)'], 0,
            'CRA Art. 13 verpflichtet zu mindestens 5 Jahren Sicherheits-Updates ab Inverkehrbringen, mit Anpassung an erwartete Produktlebensdauer.'),
        q('Was war die Wirkung von BootHole (CVE-2020-10713)?',
            ['Buffer-Overflow im GRUB2-Configfile-Parser umgeht UEFI Secure Boot',
             'Speicher-Verschluesselung in SEV ist gebrochen',
             'TPM-2.0-Quotes lassen sich faelschen',
             'AES-NI fuehrt Side-Channel-Leaks aus'], 0,
            'CVE-2020-10713 (Eclypsium Jul 2020): Buffer-Overflow in <code>grub.cfg</code>-Parser ermoeglicht Code vor OS-Start trotz Secure Boot. Massen-dbx-Update notwendig.'),
        q('Was war BlackLotus (2023)?',
            ['Erstes In-the-Wild-UEFI-Bootkit, das UEFI Secure Boot umging (CVE-2022-21894)',
             'Eine Spectre-Variante der Apple-M2-CPU',
             'Backdoor in xz-utils',
             'Cisco-IOS-Schwachstelle'], 0,
            'ESET-Analyse Mar. 2023: BlackLotus nutzte CVE-2022-21894 (Baton Drop) gegen den Windows-Bootloader; Secure Boot effektiv ausgehebelt.'),
        q('Was beschreibt das TEE-Bedrohungsmodell laut GlobalPlatform?',
            ['Auch ein vollstaendig kompromittiertes OS darf TEE-Daten weder lesen noch manipulieren',
             'Das TEE schuetzt nur gegen Netzwerk-Angreifer',
             'Das TEE ist nur gegen physikalische Angriffe ausgelegt',
             'Das TEE benoetigt einen vertrauenswuerdigen Hypervisor'], 0,
            'GlobalPlatform TEE System Architecture v1.3 (2022): Bedrohungsmodell schliesst kompromittierten Hypervisor/Kernel ein; nur DoS ist erlaubt.'),
        q('Welche Granularitaet hat eine Intel-SGX-Enclave?',
            ['Subset eines User-Prozesses (geladene Code/Daten-Pages im EPC)',
             'Vollstaendige virtuelle Maschine',
             'Komplette physische Maschine',
             'Container im Sinne von Docker'], 0,
            'SGX schuetzt Enclave-Pages im EPC; der Rest des Prozesses bleibt im Normal World. TDX/SEV/CCA hingegen schuetzen ganze VMs.'),
        q('Was unterscheidet AMD SEV-SNP von SEV-ES?',
            ['SEV-SNP fuegt Reverse Map Table und Memory-Integritaet gegen Remap- und Replay-Angriffe hinzu',
             'SEV-SNP ersetzt AES durch ChaCha20',
             'SEV-SNP verzichtet auf Memory Encryption',
             'SEV-SNP benoetigt kein Attestation-Verfahren'], 0,
            'AMD SEV-SNP Whitepaper Rev. 1.55 (2023): RMP schuetzt vor Remap-Attacken durch Hypervisor; Integritaet wird kryptographisch gesichert.'),
        q('Was bedeutet Foreshadow (L1TF) im SGX-Kontext?',
            ['Spekulativer Lesezugriff exponiert Enclave-Daten ueber den L1-Cache',
             'EPID-Schluessel werden direkt vom Hersteller-Server geleakt',
             'SGX-Enclaves crashen bei jedem Page-Fault',
             'Memory Encryption ist mathematisch gebrochen'], 0,
            'Bulck et al., USENIX Security 2018: L1 Terminal Fault liest spekulativ aus L1-Cache, umgeht SGX-Isolierung. Mitigation: L1D-Flush bei Enclave-Exit.'),
        q('Was tut Plundervolt (CVE-2019-11157)?',
            ['Software-Undervolting ueber MSR 0x150 erzeugt Faults in SGX-Multiplikation',
             'Es liest direkt den Endorsement-Key aus',
             'Es flasht die UEFI-Firmware',
             'Es bricht Memory Encryption durch Brute Force'], 0,
            'Murdock et al., S&P 2020: Voltage-Glitching ueber MSR 0x150 setzt Multiplikations-Bits falsch. Microcode 0xE0 deaktiviert User-Voltage-Control.'),
        q('Welche Komponente in RFC 9334 (RATS) fordert die Vertrauensentscheidung an?',
            ['Relying Party', 'Attester', 'Verifier', 'Endorser'], 0,
            'RFC 9334 §3: Attester erzeugt Evidence, Verifier prueft sie gegen Reference Values, Relying Party trifft Trust-Entscheidung anhand der Attestation Result.'),
        q('Was beschreibt EAT (RFC 9711, 2024)?',
            ['Ein CBOR/JWT-Token-Format fuer Attestation Evidence',
             'Eine Hardware-Spezifikation fuer TPMs',
             'Ein Side-Channel-Resistenz-Profil',
             'Eine Memory-Encryption-Spezifikation'], 0,
            'RFC 9711 Entity Attestation Token: standardisiertes Claim-Set in CWT/JWT-Form fuer Quotes aus TEEs/TPMs.'),
        q('Welche der folgenden Mitigationen wurde gegen Spectre v2 (CVE-2017-5715) eingefuehrt?',
            ['Retpoline und IBRS/STIBP', 'KPTI / Page Table Isolation', 'Cache-Line-Padding', 'AES-NI-Aktivierung'], 0,
            'Spectre v2 = Branch Target Injection. Mitigation: Retpoline (Compiler), IBRS+STIBP (Microcode/Kernel). KPTI mitigiert Meltdown (CVE-2017-5754), nicht Spectre v2.'),
        q('Was ist Memory-Encryption-Engine (MEE) im Original-SGX (Skylake)?',
            ['AES-CTR mit Integritaets-Tag fuer den Enclave Page Cache',
             'AES-XTS ohne Authentifikation',
             'ChaCha20-Stream im Hauptspeicher',
             'Memory-Mapping ohne Verschluesselung'], 0,
            'Intel SGX Explained (Costan/Devadas 2016, IACR ePrint): MEE verschluesselt EPC mit AES-CTR und schuetzt Integritaet ueber Carter-Wegman-MAC + Merkle-Tree.'),
        q('Welche Massnahme erschwert Differential Power Analysis am wirksamsten?',
            ['Boolesche Maskierung der S-Box-Eingaben mit zufaelligen Masken pro Ausfuehrung',
             'Erhoehung der Taktfrequenz',
             'Konstantzeit-Vergleich der Tags',
             'Speicherung der Schluessel in EEPROM statt RAM'], 0,
            'Maskierung ($x \\oplus m$ statt $x$) entkoppelt Stromsignal vom geheimen Wert; Standard-Mitigation gegen DPA (Anderson §20.3, NIST IR 8214A).'),
        q('Worin besteht das Power-Modell "Hamming-Distance" bei CPA-Angriffen?',
            ['Stromaufnahme ist proportional zur Anzahl der Bit-Aenderungen zwischen zwei Zustaenden',
             'Stromaufnahme ist konstant unabhaengig vom Datum',
             'Stromaufnahme ist proportional zur Schluessellaenge',
             'Stromaufnahme variiert nur in Adressleitungen'], 0,
            'Brier/Clavier/Olivier 2004 (CHES): in CMOS-Logik dominiert dynamische Verlustleistung; sie skaliert mit der Hamming-Distance zwischen vorherigem und neuem Register-Zustand.'),
        q('Warum ist `memcmp(a, b, n)` fuer kryptographische Tag-Vergleiche unsicher?',
            ['Die Laufzeit haengt von der Position des ersten unterschiedlichen Bytes ab — Timing-Leak',
             'memcmp gibt eine falsche Ordnung zurueck',
             'memcmp ist nicht thread-safe',
             'memcmp ueberschreibt den Stack'], 0,
            'Klassisches Timing-Leak (Lucky 13, CVE-2013-0169 in TLS-MAC). Korrekt: konstantzeit-Vergleich mit XOR-OR-Akkumulator.'),
        q('Was ist Bit-Slicing im Kontext einer AES-Implementierung?',
            ['Parallele Berechnung der S-Box ueber Boolean Logic ohne datenabhaengige Tabellenzugriffe',
             'Aufteilung des Schluessels in n Teile fuer Multi-Party-Computation',
             'Sequentielle Verarbeitung Bit-fuer-Bit',
             'Speichern des Klartextes in mehreren Sektoren'], 0,
            'Matsui 2007 / Kasper-Schwabe 2009: Bit-Slicing umgeht Cache-Side-Channels (Bernstein 2005), da keine geheimnis-abhaengigen Adressen entstehen.'),
        q('Welcher Angriff nutzt zwischenzeilige DRAM-Bit-Flips aus?',
            ['Rowhammer (Kim et al. 2014)', 'Spectre v4 (Speculative Store Bypass)', 'Foreshadow', 'BootHole'], 0,
            'Kim et al., ISCA 2014: wiederholter Zugriff auf Aggressor-Rows induziert Bit-Flips in Victim-Rows. Drammer (CVE-2018-9442) zeigte Privilege Escalation auf Android.'),
        q('Was ist die Boneh-DeMillo-Lipton-Attacke?',
            ['Eine fehlerhafte RSA-CRT-Signatur enthuellt den privaten Schluessel via gcd-Berechnung',
             'Eine Cache-Side-Channel-Variante von AES',
             'Ein Reverse-Engineering-Tool fuer Smart Cards',
             'Ein Timing-Angriff auf ECDSA'], 0,
            'Boneh/DeMillo/Lipton 1997 ("Bellcore-Attack"): aus signierter und faulty signierter Nachricht laesst sich $p$ via $\\gcd(s-s_f^{e}, N)$ extrahieren. Mitigation: Signaturverifikation vor Ausgabe.'),
        q('Welche Spectre-Variante adressiert KPTI vorrangig?',
            ['Keine — KPTI ist Mitigation gegen Meltdown, nicht Spectre',
             'Spectre v1 (Bounds Check Bypass)',
             'Spectre v2 (Branch Target Injection)',
             'Spectre v4 (Speculative Store Bypass)'], 0,
            'KPTI = Kernel Page Table Isolation, Mitigation gegen Meltdown (CVE-2017-5754). Spectre-Mitigationen sind Retpoline, IBRS, LFENCE, SSBD.'),
        q('Was bedeutet "Secure Boot" auf UEFI-Plattformen technisch?',
            ['Bootloader und Treiber muessen Signaturen aus der db-Datenbank tragen, dbx blockt widerrufene Hashes',
             'Boot wird durch ein Passwort geschuetzt',
             'Es wird ausschliesslich Linux geladen',
             'Es deaktiviert die UEFI-Shell'], 0,
            'UEFI 2.10 §32: Secure Boot prueft Bootloader-Signaturen gegen db, blockt Eintraege aus dbx; PK/KEK regeln, wer db/dbx aktualisieren darf.'),
        q('Welche Anforderung formuliert ETSI EN 303 645 v3.1.3 zur Default-Konfiguration?',
            ['Keine universellen Default-Passwoerter; geraetespezifisch oder vom Nutzer beim Setup gesetzt',
             'Default-Passwort "admin/admin" ist akzeptabel, wenn dokumentiert',
             'Geraete duerfen ohne Authentifizierung ausgeliefert werden',
             'Default-Konfiguration ist nicht Teil der Norm'], 0,
            'EN 303 645 §5.1: keine universellen Default-Passwoerter (Provision 5.1-1). Reaktion auf Mirai-Botnet 2016.'),
        q('Welcher Zweck steht hinter der Foundational Requirement FR 1 in IEC 62443-3-3?',
            ['Identifikations- und Authentifizierungs-Kontrolle (IAC)',
             'Use-Control',
             'System-Integritaet',
             'Daten-Vertraulichkeit'], 0,
            'IEC 62443-3-3:2013 §3 listet FR 1=IAC, FR 2=UC, FR 3=SI, FR 4=DC, FR 5=RDF, FR 6=TRE, FR 7=RA. Frage adressiert FR 1.'),
        q('Welche Schwachstelle ermoeglichte Stuxnet (2010) den Angriff auf Siemens-S7-Steuerungen?',
            ['Hardcoded-Default-Credentials in WinCC + mehrere Windows-Zero-Days + signierte Treiber mit gestohlenen Zertifikaten',
             'Reine Brute-Force-Attacke auf Modbus',
             'OPC-UA-Authentifizierungsfehler',
             'BLE-Pairing-Bug'], 0,
            'Falliere/Murchu/Chien Symantec 2011: Stuxnet kombinierte 4 Windows-0-Days, gestohlene Realtek/JMicron-Code-Signing-Zertifikate, hartcodierte WinCC-Passwoerter. WinCC-Hash damals als "Schmuckstueck" bekannt.'),
        q('Was beschreibt die Mitigation "Constant-Time Cryptography"?',
            ['Ausfuehrungszeit und Speicherzugriffsmuster sind unabhaengig vom geheimen Eingang',
             'Eine feste maximale Latenz pro Aufruf',
             'Aktiver Watchdog-Timer im Krypto-Modul',
             'CPU-Affinitaet auf einen einzigen Core'], 0,
            'Konstantzeit bedeutet: keine secret-dependent branches und keine secret-dependent memory accesses. HACL*, BoringSSL und libsodium implementieren konsequent konstantzeit.'),
        q('Was ist CLKSCREW (Tang/Sethumadhavan/Stolfo, USENIX 2017)?',
            ['Software-induzierter Fault-Injection-Angriff via DVFS-Manipulation auf Smartphones',
             'Power-Analyse mit klassischem Oszilloskop',
             'EM-Probing mit Near-Field-Antenne',
             'Cold-Boot-Variante gegen Mobile-DRAM'], 0,
            'CLKSCREW manipuliert Voltage/Frequency-Regler via Kernel-Treiber, erzeugt Setup-Time-Verletzungen und extrahiert Schluessel aus TrustZone TAs. Mitigation: privilegierter Zugriff auf DVFS-Knobs.'),
        q('Welche Eigenschaft hat ein Authenticated-Variable-Eintrag in UEFI?',
            ['Nur durch signierte EFI_VARIABLE_AUTHENTICATION_2-Header aenderbar',
             'Frei beschreibbar von jedem User-Mode-Programm',
             'Im RAM gehalten und beim Reboot verloren',
             'Verschluesselt, aber unsigniert'], 0,
            'UEFI 2.10 §8.2: Authenticated Variables erfordern PKCS#7-Signatur ueber EFI_TIME-Counter zur Replay-Verhinderung. Basis fuer dbx-Updates.'),
        q('Welcher Vorfall zeigte 2024, dass Supply-Chain-Backdoors auch in System-Bibliotheken vorkommen?',
            ['xz-utils-Backdoor (CVE-2024-3094) in liblzma',
             'log4shell (CVE-2021-44228)',
             'Heartbleed (CVE-2014-0160)',
             'Shellshock (CVE-2014-6271)'], 0,
            'CVE-2024-3094 (Maerz 2024): boeswillig eingeschleuste Backdoor im xz-utils-Build via "Jia Tan"-Maintainer; Ziel war sshd-RCE bei Distros mit systemd-Linkage.'),
        q('Was leistet ARM Confidential Compute Architecture (CCA)?',
            ['Schafft VM-isolierte "Realms" mit Memory Encryption und Granule Protection Tables',
             'Ersetzt TrustZone vollstaendig in ARMv9-A',
             'Beschleunigt AES-CBC um Faktor 4',
             'Stellt Big-LITTLE-Scheduling-Support bereit'], 0,
            'ARM CCA Architecture Specification DEN0125 (2023): Realm Management Extension (RME) fuegt Realm-VMs zusaetzlich zu Secure/Normal World hinzu.'),
        q('Welche Aussage zu Memory-Encryption-Schluessel-Rotation ist korrekt?',
            ['Bei AMD SEV-SNP wird der VM-Encryption-Key beim Provisioning gesetzt; SNP fuegt monoton steigenden Counter hinzu',
             'Schluessel werden bei jedem Speicherzugriff neu erzeugt',
             'Schluessel sind weltweit fuer alle SEV-VMs identisch',
             'Memory Encryption verwendet RSA-2048'], 0,
            'AMD SEV-SNP Whitepaper Rev. 1.55: pro VM ein AES-Schluessel, ASID-gebunden. SNP verbessert Replay-Schutz via RMP/IDB.'),
        q('Wie verhindert man Cache-Side-Channels bei AES-Implementierungen am wirksamsten?',
            ['Hardware-Befehle (AES-NI / ARMv8-Crypto) oder Bit-Slicing statt T-Tables',
             'Erhoehung der Schluessellaenge auf 256 bit',
             'Verschluesselung mit doppeltem AES (3AES)',
             'Padding aller Tabellen auf 4 KB'], 0,
            'Bernstein 2005: T-Tables in DRAM/Cache erzeugen geheimnisabhaengige Adressmuster. Mitigation: AES-NI / ARMv8-AESE/AESD oder Bit-Slicing (Kasper-Schwabe 2009).'),
        q('Welche Eigenschaft fordert NIST SP 800-90B fuer Hardware-Entropie-Quellen?',
            ['Minimum-Entropy-Schaetzung mit Online-Health-Tests (RCT, APT)',
             'Reine Pseudozufallszahlen aus Linear Congruential Generator',
             'Verzicht auf Online-Tests zur Performancesteigerung',
             'Mindestens 1024 bit Block-Output'], 0,
            'SP 800-90B (2018) fordert Entropie-Schaetzung nach min-entropy-Modell + Repetition Count Test (RCT) + Adaptive Proportion Test (APT) als Health-Tests.'),
        q('Welche Schwachstellenklasse gehoert zu den CWE Top 25 (2024) und betrifft Embedded-Code besonders?',
            ['CWE-787 Out-of-bounds Write',
             'CWE-200 Information Exposure',
             'CWE-352 CSRF',
             'CWE-307 Repeated Authentication Attempts'], 0,
            'MITRE/CISA CWE Top 25 (2024): CWE-787 Out-of-bounds Write fuehrt die Liste an; in C/C++ -lastigem Embedded-Code besonders haeufig (Buffer Overflow).'),
        q('Was bedeutet "Tamper-Resistant" im Sinne von Common Criteria PP-0084?',
            ['Mechanische, elektrische und chemische Manipulation muss erkannt oder verhindert werden, sensitive Daten loeschen sich bei Erkennung',
             'Das Geraet darf nicht geoeffnet werden ohne Werkzeug',
             'Sensoren melden Aenderungen an einen Cloud-Server',
             'Schluessel werden in Klartext per OTA gesendet'], 0,
            'PP-0084-2014 §A: aktive Sensoren (Mesh, Lichtsensor, Temperatur) erkennen Manipulation; sensitive Daten werden gel\u00f6scht oder Chip wird unbrauchbar gemacht.'),
        q('Welcher Angriff nutzt Lautsprecher-/Mikrofon-Emissionen elektronischer Bauteile?',
            ['Akustische Kryptanalyse (Genkin/Shamir/Tromer 2014)',
             'PLATYPUS (2021) ueber Energiezaehler',
             'Foreshadow ueber L1-Cache',
             'BadUSB ueber Firmware-Replace'], 0,
            'Genkin/Shamir/Tromer 2014 (CRYPTO): Schaltreglergeraeusche eines Laptops verraten RSA-Schluessel-Bits ueber Hochfrequenz-Mikrofone.'),
        q('Welche Eigenschaft hat eine ARM TrustZone "Trusted Application" (TA)?',
            ['Laeuft im Secure World, kommuniziert mit Normal-World-Clients ueber GlobalPlatform TEE Client API',
             'Laeuft im Hypervisor-Modus',
             'Wird vom Linux-Userspace direkt geladen',
             'Hat vollen Zugriff auf den Normal-World-Speicher'], 0,
            'GlobalPlatform TEE Client API v1.0 + TrustZone: TAs im Secure World, Clients (CA) im Normal World. SMC-basiertes Marshalling.'),
        q('Welcher Standard regelt zukuenftig den Mindest-Sicherheitslevel vernetzter Produkte in der EU?',
            ['Cyber Resilience Act (Verordnung EU 2024/2847)',
             'Funkanlagenrichtlinie RED 2014/53/EU (allein)',
             'Maschinenverordnung 2023/1230 (allein)',
             'GDPR (EU 2016/679)'], 0,
            'CRA verabschiedet Okt. 2024, Inkrafttreten Dez. 2024, Anwendung 36 Monate spaeter. Definiert horizontale Cybersecurity-Anforderungen fuer "Produkte mit digitalen Elementen".'),
        q('Welche Aussage zu eFuses ist korrekt?',
            ['Sie sind one-time-programmable und werden typischerweise fuer Root-of-Trust-Hashes und Lifecycle-States verwendet',
             'Sie sind beliebig oft umprogrammierbar wie Flash',
             'Sie werden beim Reset zurueckgesetzt',
             'Sie sind ausschliesslich fuer Debug-Pins'], 0,
            'eFuses (Antifuses) brennen einen einzelnen Bit-Zustand permanent. Standard-Anwendungen: Root-Public-Key-Hash, Lifecycle (Test/Manuf/Production), JTAG-Lock.'),
        q('Welcher Spectre-Schutzmechanismus auf x86 isoliert User- und Kernel-Speicher physisch?',
            ['KPTI / Page Table Isolation', 'Retpoline', 'IBRS', 'STIBP'], 0,
            'KPTI separiert Page-Tables von User- und Kernel-Mode, sodass spekulativer Lesezugriff (Meltdown, CVE-2017-5754) keine Kernel-Adressen mehr trifft. Retpoline/IBRS/STIBP adressieren Spectre v2.'),
        q('Welche der folgenden Massnahmen ist NACH IEC 62443-4-1 Teil eines sicheren Entwicklungsprozesses fuer Embedded-Komponenten?',
            ['Threat Modeling, Secure Coding, Vulnerability Management und Patch-Management ueber den Produktlebenszyklus',
             'Ausschliesslich Penetration-Testing am Ende der Entwicklung',
             'Verschluesselung nur des Source-Codes im Repository',
             'Verzicht auf Updates ab Markteinfuehrung'], 0,
            'IEC 62443-4-1:2018 fordert acht Practices: Security Management, Specification, Design, Implementation, Verification & Validation, Defect Management, Update Management, Security Guidelines.')
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
                pages: [PAGE_EMB_BOOT, PAGE_EMB_TEE, PAGE_EMB_FW, PAGE_EMB_SCA],
                quiz: QUIZ_EMB
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
