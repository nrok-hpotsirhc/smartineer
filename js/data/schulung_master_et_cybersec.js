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

    // ----------------------------------------------------------------------
    // Kapitel 3 — Industrielle Netzsicherheit / OT (PRODUKTIV)
    // Quellen: IEC 62443-Serie (1-1:2009, 2-1:2010, 2-4:2015+A1:2017,
    // 3-2:2020, 3-3:2013, 4-1:2018, 4-2:2019); ISA-99/IEC TR 62443-1-1;
    // ANSI/ISA-95 (IEC 62264) Purdue Reference Model;
    // NIST SP 800-82 Rev. 3 "Guide to OT Security" (Sep. 2023);
    // BSI ICS-Security-Kompendium 2024;
    // ENISA "Good Practices for Security of IoT in OT" (2023);
    // Falliere/Murchu/Chien "W32.Stuxnet Dossier" v1.4, Symantec 2011;
    // Dragos / ESET "Industroyer" Reports 2017; FireEye / Dragos "TRITON"
    // Reports 2017/2018; ESET "Industroyer2" Apr. 2022;
    // CISA Advisories (ICS-CERT) 2020-2025; Claroty Team82 Reports;
    // OPC UA Specification Part 2 "Security Model" v1.05 (2022);
    // PROFINET Security Class 1-3 nach IEC 61784-3-3:2021.
    // ----------------------------------------------------------------------

    const PAGE_OT_VS_IT = {
        title: '3.1 OT vs. IT — Schutzziele, Lebenszyklen, Echtzeit',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die Verschiebung der CIA-Triade in OT-Umgebungen begruenden, (2) das Purdue Enterprise Reference Architecture (PERA) Level 0&ndash;5 erlaeutern, (3) typische Echtzeit-Anforderungen industrieller Steuerungen einordnen, (4) Patch-Restriktionen in OT begruenden.</blockquote>'

            + '<h4>3.1.1 Schutzziele: AIC statt CIA</h4>'
            + '<p>In klassischer IT-Sicherheit gilt die Reihenfolge <em>Confidentiality &gt; Integrity &gt; Availability</em>. In OT/ICS kehrt sich die Prioritaet um: <strong>Availability &gt; Integrity &gt; Confidentiality</strong> (<em>AIC</em>). Begruendung (NIST SP 800-82r3 §2.4): Ausfaelle koennen physische Schaeden, Personenschaeden oder Umweltschaeden ausloesen — Vertraulichkeit von Prozessdaten ist sekundaer. Zusaetzlich kommt <em>Safety</em> als uebergeordnetes Schutzziel hinzu (Functional Safety nach IEC 61508 / IEC 61511).</p>'

            + '<h4>3.1.2 Purdue-Modell (PERA Level 0&ndash;5)</h4>'
            + '<table><thead><tr><th>Level</th><th>Funktion</th><th>Typische Komponenten</th></tr></thead><tbody>'
            + '<tr><td>5</td><td>Enterprise Network</td><td>ERP, Internet, E-Mail</td></tr>'
            + '<tr><td>4</td><td>Site Business Planning</td><td>MES-Reporting, Office-IT pro Standort</td></tr>'
            + '<tr><td>3.5</td><td>iDMZ</td><td>Patch-Server, AV-Update-Relay, Historian-Replica</td></tr>'
            + '<tr><td>3</td><td>Site Operations</td><td>MES, Engineering Workstations, Domain Controller (OT)</td></tr>'
            + '<tr><td>2</td><td>Area Supervisory</td><td>SCADA/HMI, Batch-Server</td></tr>'
            + '<tr><td>1</td><td>Basic Control</td><td>SPS, DCS-Controller, Safety-PLC</td></tr>'
            + '<tr><td>0</td><td>Process</td><td>Sensoren, Aktoren, Antriebe</td></tr>'
            + '</tbody></table>'
            + '<p>Die <strong>Industrial DMZ</strong> (Level 3.5) trennt OT (Level 0&ndash;3) und IT (Level 4&ndash;5). Direkter Datenverkehr zwischen Level 5 und Level 3 ist verboten — alle Verbindungen <em>terminieren</em> in der iDMZ (NIST SP 800-82r3 §5.2; ISA-95 / IEC 62264).</p>'

            + '<h4>3.1.3 Echtzeit-Anforderungen</h4>'
            + '<p>Steuerungstaktzeiten typischer Anlagen (IEC 61784-2:2023, RT-Profile):</p>'
            + '<ul>'
            + '<li><strong>Werkzeugmaschinen / Servoachsen:</strong> 31,25 µs &ndash; 250 µs Zykluszeit, Jitter &lt; 1 µs (Isochronous Real-Time, IRT).</li>'
            + '<li><strong>Verfahrenstechnik (Prozessindustrie):</strong> 100 ms &ndash; 1 s Zykluszeit, weiche Echtzeit.</li>'
            + '<li><strong>Safety-Funktionen (PROFIsafe, CIP Safety, openSAFETY):</strong> Reaktionszeit-Budget meist 100 ms; F-Telegramm + Black-Channel-Prinzip nach IEC 61784-3.</li>'
            + '</ul>'
            + '<p>Konsequenz fuer Security: jede zusaetzliche Latenz durch Verschluesselung, Firewall-Inspection oder Authentifizierung muss <em>im Latenz-Budget</em> bleiben — sonst ist die Sicherheits-Massnahme untragbar.</p>'

            + '<h4>3.1.4 Lebenszyklus und Patch-Restriktionen</h4>'
            + '<p>OT-Lebenszyklen liegen typischerweise bei 15&ndash;30 Jahren (Kraftwerke, Stahlwerke, Pharma). Konsequenzen:</p>'
            + '<ul>'
            + '<li>Hersteller-Support fuer Steuerungs-Firmware oft &lt; Anlagen-Lebenszyklus &rarr; <strong>Compensating Controls</strong> noetig (Netzsegmentation, Application Allowlisting, Industrial Firewalls).</li>'
            + '<li>Patches duerfen nur in geplanten Wartungsfenstern eingespielt werden; vorher Re-Validation der Steuerungsfunktion (oft mehrere Tage Stillstand).</li>'
            + '<li>Asset-Inventory ist Pflicht: ohne valide Inventar-Liste keine Risikoabschaetzung. ENISA &amp; BSI fordern Asset-Discovery via passiver Netzwerkanalyse, da aktives Scanning ICS-Komponenten zum Absturz bringen kann.</li>'
            + '</ul>'
            + '<p>BSI ICS-Security-Kompendium 2024 fordert: Backup &amp; Recovery getestet, dokumentierte Notfallpraxis (M5.7), klare Verantwortung fuer OT-Security (oft Hybridrolle Engineering+IT-Sec).</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: NIST SP 800-82 Rev. 3 (Sep. 2023); ANSI/ISA-95 / IEC 62264; IEC 61784-2:2023, IEC 61784-3:2021; IEC 61508-1:2010; BSI ICS-Security-Kompendium, Stand 2024; ENISA "Good Practices for Security of IoT in OT" 2023.</em></p>'
    };

    const PAGE_IEC62443 = {
        title: '3.2 IEC-62443-Serie: Zonen, Conduits, Security Levels',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die Struktur der IEC-62443-Serie benennen, (2) die sieben Foundational Requirements FR 1&ndash;7 nennen, (3) Security Level SL 1&ndash;4 unterscheiden, (4) eine Zonen-&-Conduit-Architektur nach IEC 62443-3-2 entwerfen.</blockquote>'

            + '<h4>3.2.1 Struktur der Normenreihe</h4>'
            + '<table><thead><tr><th>Teil</th><th>Adressat</th><th>Inhalt</th></tr></thead><tbody>'
            + '<tr><td>62443-1-x</td><td>alle</td><td>Begriffe, Konzepte, Modelle (1-1:2009)</td></tr>'
            + '<tr><td>62443-2-x</td><td>Anlagen-Betreiber</td><td>2-1: ISMS fuer IACS; 2-3: Patch-Management; 2-4: Anforderungen an Service-Provider (2015+A1:2017)</td></tr>'
            + '<tr><td>62443-3-x</td><td>System-Integrator</td><td>3-2:2020 Risikoanalyse / Zonen &amp; Conduits; 3-3:2013 System-Anforderungen pro SL</td></tr>'
            + '<tr><td>62443-4-x</td><td>Komponenten-Hersteller</td><td>4-1:2018 sicherer Entwicklungsprozess; 4-2:2019 Komponenten-Anforderungen</td></tr>'
            + '</tbody></table>'

            + '<h4>3.2.2 Sieben Foundational Requirements (FR)</h4>'
            + '<ol>'
            + '<li><strong>FR 1 — Identification &amp; Authentication Control (IAC):</strong> Wer/was greift zu?</li>'
            + '<li><strong>FR 2 — Use Control (UC):</strong> Welche Aktionen sind erlaubt?</li>'
            + '<li><strong>FR 3 — System Integrity (SI):</strong> Schutz vor unautorisierter Aenderung.</li>'
            + '<li><strong>FR 4 — Data Confidentiality (DC):</strong> Schutz von Informationen vor unbefugter Einsicht.</li>'
            + '<li><strong>FR 5 — Restricted Data Flow (RDF):</strong> Segmentierung, Conduits.</li>'
            + '<li><strong>FR 6 — Timely Response to Events (TRE):</strong> Logging, Detection, Incident Response.</li>'
            + '<li><strong>FR 7 — Resource Availability (RA):</strong> Schutz vor DoS, robuste Kommunikation.</li>'
            + '</ol>'

            + '<h4>3.2.3 Security Levels SL 1&ndash;4</h4>'
            + '<table><thead><tr><th>SL</th><th>Bedrohungsmodell</th><th>Beispiel-Angreifer</th></tr></thead><tbody>'
            + '<tr><td>SL 1</td><td>versehentliche oder zufaellige Vorfaelle</td><td>Bedienfehler, fehlkonfiguriertes Asset</td></tr>'
            + '<tr><td>SL 2</td><td>vorsaetzlich, geringe Mittel, allgemeine Faehigkeiten</td><td>Innentaeter mit Standard-Tools</td></tr>'
            + '<tr><td>SL 3</td><td>vorsaetzlich, moderate Mittel, IACS-spezifische Faehigkeiten</td><td>Hacktivisten, Konkurrenz mit OT-Wissen</td></tr>'
            + '<tr><td>SL 4</td><td>vorsaetzlich, erhebliche Mittel, IACS-spezifisch + Spezialisten-Toolchain</td><td>nation-state Acteur (APT)</td></tr>'
            + '</tbody></table>'
            + '<p>Pro Zone werden drei SL-Werte gefuehrt: <strong>SL-T</strong> (Target, gewuenscht), <strong>SL-C</strong> (Capability, was Komponenten technisch leisten), <strong>SL-A</strong> (Achieved, real erreicht). Ziel: SL-A &ge; SL-T (IEC 62443-3-2:2020 §ZCR 6).</p>'

            + '<h4>3.2.4 Zonen- und Conduit-Modell (62443-3-2)</h4>'
            + '<p>Eine <strong>Zone</strong> ist eine Gruppe logischer und physischer Assets mit gemeinsamen Sicherheitsanforderungen. <strong>Conduits</strong> verbinden Zonen und buendeln den gesamten Datenfluss zwischen ihnen. Risikoanalyse-Schritte nach 62443-3-2:</p>'
            + '<ol>'
            + '<li>System under Consideration (SuC) abgrenzen.</li>'
            + '<li>High-Level Risk Assessment.</li>'
            + '<li>Zone- und Conduit-Aufteilung.</li>'
            + '<li>Detailed Risk Assessment pro Zone/Conduit.</li>'
            + '<li>Cybersecurity Requirements Specification (CRS).</li>'
            + '</ol>'
            + '<p>Beispiel-Conduit-Anforderungen: deny-by-default-Filter in der iDMZ, definierte zugelassene Protokolle (z.B. nur OPC UA Pub/Sub und HTTPS-API), Logging aller queruebergreifenden Verbindungen, technisch erzwungene Einbahn-Stroeme durch <em>Data Diodes</em> bei Lvl 3 &rarr; Lvl 4-Replikation.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: IEC 62443-3-2:2020; IEC 62443-3-3:2013; IEC 62443-4-1:2018; IEC 62443-4-2:2019; ISA-TR84.00.09:2021 (Konvergenz Safety/Security); BSI ICS-Security-Kompendium 2024.</em></p>'
    };

    const PAGE_OT_PROTOCOLS = {
        title: '3.3 Industrieprotokolle und Hardening-Massnahmen',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Klartext- vs. abgesicherte Industrieprotokolle einordnen, (2) OPC UA Security Modes erklaeren, (3) PROFINET Security Class 1&ndash;3 unterscheiden, (4) sinnvolle Hardening-Massnahmen fuer OT-Netze auswaehlen.</blockquote>'

            + '<h4>3.3.1 Protokoll-Landschaft</h4>'
            + '<table><thead><tr><th>Protokoll</th><th>Default-Sicherheit</th><th>Sichere Variante</th></tr></thead><tbody>'
            + '<tr><td>Modbus TCP (Schneider 1979/1999)</td><td>keine — Klartext, keine Auth</td><td>Modbus Security (TLS) seit 2018</td></tr>'
            + '<tr><td>DNP3</td><td>keine</td><td>Secure Authentication v5 nach IEEE 1815-2012</td></tr>'
            + '<tr><td>PROFINET</td><td>keine in Class 1</td><td>Class 2 (signed RPC), Class 3 (TLS, IEC 61784-3-3:2021)</td></tr>'
            + '<tr><td>EtherNet/IP + CIP</td><td>keine</td><td>CIP Security (Vol 8) — TLS+DTLS, Pull-Modell</td></tr>'
            + '<tr><td>OPC UA (IEC 62541)</td><td>konfigurierbar</td><td>Sign &amp; Encrypt mit X.509-Zertifikaten</td></tr>'
            + '<tr><td>S7Comm/S7CommPlus</td><td>S7Comm trivial spoofbar</td><td>S7CommPlus v3+ (Trial-Encryption); offiziell Migration auf OPC UA</td></tr>'
            + '</tbody></table>'

            + '<h4>3.3.2 OPC UA Security</h4>'
            + '<p>OPC UA Part 2 v1.05 (2022) definiert pro Secure-Channel einen <strong>Security Mode</strong>: <em>None</em>, <em>Sign</em>, <em>SignAndEncrypt</em>. Empfohlen ist ausschliesslich <em>SignAndEncrypt</em> mit Profil <code>Basic256Sha256</code> oder <code>Aes256_Sha256_RsaPss</code>. Authentifizierung ueber X.509-Zertifikate (Anwendungs- und User-Zertifikate); Trust Lists pro Server. <strong>OPC UA Pub/Sub</strong> (Part 14, 2018) erlaubt UDP-Multicast und MQTT-Tunneling — fuer schutzbeduerftige Daten zwingend mit Message Security (Symmetric Key Service nach Part 14 §7).</p>'

            + '<h4>3.3.3 PROFINET Security Classes</h4>'
            + '<ul>'
            + '<li><strong>Class 1 (Robustness):</strong> protokollseitige Robustheit gegen Fehlpakete; <em>keine</em> Authentifizierung. Default-Stufe vor 2021.</li>'
            + '<li><strong>Class 2 (Integrity &amp; Authenticity):</strong> signierte RPCs zwischen Engineering, IO-Controller und IO-Device.</li>'
            + '<li><strong>Class 3 (Confidentiality):</strong> Verschluesselung der Anwenderdaten (TLS/DTLS), spezifiziert in IEC 61784-3-3:2021. Voraussetzung: Hardware mit krypto-faehigem ASIC.</li>'
            + '</ul>'

            + '<h4>3.3.4 Hardening-Massnahmen</h4>'
            + '<ol>'
            + '<li><strong>Netzsegmentierung:</strong> VLANs nicht ausreichend — physikalische Separierung oder VLAN+Industrial-Firewall mit Deep Packet Inspection (DPI).</li>'
            + '<li><strong>Industrial Firewalls / Next-Gen-Firewalls:</strong> Modbus-DPI (whitelisting Function-Codes), OPC-UA-Aware Inspection.</li>'
            + '<li><strong>Data Diodes:</strong> physisch unidirektional von Lvl 3 nach Lvl 4 oder von Anlage in iDMZ — keine Rueckkanal moeglich.</li>'
            + '<li><strong>Application Allowlisting:</strong> auf Engineering Workstations und HMIs (z.B. McAfee/Trellix Application Control, Carbon Black, Microsoft AppLocker).</li>'
            + '<li><strong>Asset Discovery / Continuous Monitoring:</strong> passive OT-IDS (Claroty CTD, Nozomi Guardian, Dragos Platform) — kein aktives Scanning.</li>'
            + '<li><strong>Remote-Access:</strong> Jump-Server in iDMZ, MFA, Session-Recording. Direkter VPN-Zugriff von Lieferanten auf SPS ist ein Top-Befund in BSI-Audits 2023/2024.</li>'
            + '<li><strong>Secure Engineering:</strong> Engineering-Workstations gehaertet, kein Internetzugriff, separate Domain — Stuxnet-Lessons-Learned.</li>'
            + '</ol>'

            + '<p class="text-xs text-slate-500"><em>Quellen: OPC UA Specification Part 2 v1.05 (2022); IEC 61784-3-3:2021; IEC 62541:2020; CIP Security Volume 8 v1.13 (2024); Modbus Organization "Modbus Security" Spec (2018); IEEE 1815-2012; NIST SP 800-82r3 §5; BSI ICS-Security-Kompendium 2024 §M5.</em></p>'
    };

    const PAGE_OT_INCIDENTS = {
        title: '3.4 Vorfaelle und Lessons Learned (Stuxnet, Industroyer, TRITON)',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Stuxnet, Industroyer/Industroyer2 und TRITON in Bezug auf Ziel, TTPs und Wirkung beschreiben, (2) MITRE ATT&amp;CK for ICS einordnen, (3) Lessons Learned auf Anlagen-Architektur und Incident Response abbilden.</blockquote>'

            + '<h4>3.4.1 Stuxnet (2010)</h4>'
            + '<p>Erster bekannt gewordener APT-Wurm gegen ICS, attribuiert auf Operation "Olympic Games" (USA/Israel). Ziel: Sabotage iranischer Urananreicherung in Natanz durch Manipulation der Drehzahl von Siemens-S7-300/-400-gesteuerten Zentrifugen. Kombination (Falliere/Murchu/Chien, Symantec 2011 v1.4):</p>'
            + '<ul>'
            + '<li><strong>4 Windows-Zero-Days:</strong> CVE-2010-2568 (LNK), CVE-2010-2729 (Print Spooler), CVE-2010-2743 (Win32k Keyboard Layout), CVE-2010-3338 (Task Scheduler).</li>'
            + '<li><strong>Gestohlene Code-Signing-Zertifikate</strong> Realtek und JMicron fuer signierte Treiber.</li>'
            + '<li><strong>WinCC-Hardcoded-Credentials</strong> (Default-DB-Passwort) fuer SCADA-Zugriff.</li>'
            + '<li><strong>S7-Rootkit:</strong> Zwischen STEP7-Engineering-Tool und S7-CPU eingeschleuster DLL-Hook, der manipulierte Step-7-Bloecke auf der CPU einspielt und beim Auslesen die Originale zurueckliefert (Man-in-the-Middle).</li>'
            + '</ul>'
            + '<p>Wirkung: ca. 1000 Zentrifugen zerstoert. Lessons Learned: USB-Sticks als Bedrohungsvektor fuer Air-Gapped-Anlagen ernst nehmen; Engineering-Software haerten; supply-chain code-signing schuetzen.</p>'

            + '<h4>3.4.2 Industroyer / CRASHOVERRIDE (2016) und Industroyer2 (2022)</h4>'
            + '<p>Erste auf Stromnetz-Protokolle zugeschnittene Malware (Dragos/ESET 2017, attribuiert SANDWORM/GRU 74455). Kernmodule:</p>'
            + '<ul>'
            + '<li>Protokoll-Module fuer <strong>IEC 60870-5-101/104</strong>, <strong>IEC 61850 GOOSE/MMS</strong>, <strong>OPC DA</strong>.</li>'
            + '<li>Wiper-Komponente fuer Windows-Hosts.</li>'
            + '<li>DoS-Modul gegen Siemens SIPROTEC-Schutzrelais (CVE-2015-5374).</li>'
            + '</ul>'
            + '<p>Wirkung: ein-stuendiger Stromausfall in Kiew (Dez. 2016, ~200 MW). <strong>Industroyer2</strong> (April 2022, Ukraine-Krieg) erweiterte das IEC-104-Modul; ESET/CERT-UA verhinderten den Angriff vor Ausfuehrung.</p>'

            + '<h4>3.4.3 TRITON / TRISIS / HatMan (2017)</h4>'
            + '<p>Erste Malware, die <strong>Safety-Instrumented-Systems</strong> angreift (FireEye/Dragos 2017, Mandiant Reports 2018-2020). Ziel: Triconex-SIS in einer petrochemischen Anlage in Saudi-Arabien. TTPs:</p>'
            + '<ul>'
            + '<li>Pivot von IT-Netz ueber Engineering Workstation auf SIS-Engineering-Software (TriStation 1131).</li>'
            + '<li>Ausnutzung undokumentierter Kommandos der Tricon-3008-Firmware, um Kontrollroutine zu modifizieren.</li>'
            + '<li>Logikfehler im Implant fuehrte zum Plant-Shutdown statt zum unbemerkten Override — Vorfall wurde dadurch ueberhaupt erst entdeckt.</li>'
            + '</ul>'
            + '<p>Lessons Learned: Safety-Netz physisch trennen, Engineering-Workstation fuer SIS streng beschraenken, Schreibschutz-Schluesselschalter am Controller aktiv halten.</p>'

            + '<h4>3.4.4 MITRE ATT&amp;CK for ICS</h4>'
            + '<p>MITRE ATT&amp;CK for ICS (Version 14, Okt. 2023) ist die Referenz-Taxonomie fuer ICS-TTPs: 12 Tactics, 96 Techniques, 14 dokumentierte Threat Groups (u.a. SANDWORM, XENOTIME, ELECTRUM). Wichtige Tactics: <em>Initial Access</em>, <em>Execution</em>, <em>Persistence</em>, <em>Evasion</em>, <em>Discovery</em>, <em>Lateral Movement</em>, <em>Collection</em>, <em>Command and Control</em>, <em>Inhibit Response Function</em>, <em>Impair Process Control</em>, <em>Impact</em>.</p>'
            + '<p>Praxis-Empfehlung: Detection-Regeln (Sigma, YARA) gegen ATT&amp;CK-Techniken mappen — beispielsweise T0843 "Program Download" (typisch fuer Stuxnet/TRITON) oder T0857 "System Firmware".</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Symantec "W32.Stuxnet Dossier" v1.4 (2011); Dragos/ESET "Industroyer" Whitepaper (Jun. 2017); ESET "Industroyer2" Apr. 2022; FireEye/Mandiant "TRITON Attribution: Russian GRU-affiliated TsNIIKhM" (2018); MITRE ATT&CK for ICS v14 (Oct. 2023); CISA Advisory ICSA-22-103-04 (Industroyer2); CISA AA22-110A.</em></p>'
    };

    const QUIZ_OT = [
        q('Welche Reihenfolge der Schutzziele gilt typischerweise in OT-/ICS-Umgebungen?',
            ['Availability &gt; Integrity &gt; Confidentiality, ergaenzt um Safety',
             'Confidentiality &gt; Integrity &gt; Availability',
             'Integrity &gt; Confidentiality &gt; Availability',
             'Confidentiality &gt; Availability &gt; Integrity'], 0,
            'NIST SP 800-82r3 §2.4: AIC statt CIA. Safety als uebergeordnetes Ziel (IEC 61508/61511).'),
        q('Was ist der Zweck einer Industrial DMZ (Level 3.5 nach Purdue/ISA-95)?',
            ['Sie terminiert alle Verbindungen zwischen IT (Level 4-5) und OT (Level 0-3) und verhindert direkten Datenverkehr',
             'Sie ist nur ein logisches VLAN ohne Filterung',
             'Sie ersetzt das ERP-System',
             'Sie ist optional und nicht in NIST SP 800-82 gefordert'], 0,
            'NIST SP 800-82r3 §5.2: keine direkten Sessions zwischen Level 5 und Level 3, alle Verbindungen brechen in der iDMZ.'),
        q('Welche Zykluszeit ist fuer isochronous-Real-Time-PROFINET typisch?',
            ['31,25 µs bis 250 µs mit Jitter unter 1 µs',
             '10 ms bis 100 ms',
             '1 s',
             '1 µs ohne Jitter-Anforderung'], 0,
            'IEC 61784-2:2023 RT-Klasse IRT (Class 3) fuer Servoregler-Anwendungen.'),
        q('Warum sind klassische aktive Schwachstellen-Scanner in OT-Netzen problematisch?',
            ['Aktives Probing kann Steuerungen zum Absturz bringen oder Echtzeit verletzen',
             'Sie liefern keine verwertbaren Ergebnisse',
             'Sie verstossen gegen die DSGVO',
             'Sie sind in IEC 62443 verboten'], 0,
            'BSI ICS-Kompendium 2024, ENISA 2023: passive Asset Discovery (z.B. SPAN-Port + Claroty/Nozomi/Dragos) statt aktives Scannen.'),
        q('Welcher Teil der IEC-62443-Serie adressiert Komponenten-Hersteller mit dem Entwicklungsprozess-Standard?',
            ['IEC 62443-4-1:2018', 'IEC 62443-2-1:2010', 'IEC 62443-3-3:2013', 'IEC 62443-1-1:2009'], 0,
            'IEC 62443-4-1:2018 definiert acht Practices (SM, SR, SD, SI, SVV, DM, SUM, SG).'),
        q('Welche Foundational Requirement (FR) deckt Logging, Detection und Incident Response ab?',
            ['FR 6 — Timely Response to Events',
             'FR 1 — Identification & Authentication Control',
             'FR 4 — Data Confidentiality',
             'FR 7 — Resource Availability'], 0,
            'IEC 62443-3-3:2013 §3 listet FR 1-7. FR 6 = TRE.'),
        q('Welche Aussage zu IEC-62443-Security-Levels SL 1-4 ist korrekt?',
            ['SL 4 modelliert nation-state-Acteure mit erheblichen Mitteln und IACS-spezifischer Spezialisten-Toolchain',
             'SL 4 modelliert Bedienfehler',
             'SL 1 schuetzt vor APTs',
             'SL 2 ist nur fuer DMZ-Komponenten'], 0,
            'IEC 62443-3-3:2013 Tabelle SL-Definitionen.'),
        q('Was unterscheidet SL-T, SL-C und SL-A?',
            ['SL-T = gewuenscht (Target), SL-C = technische Faehigkeit (Capability), SL-A = real erreicht (Achieved)',
             'Die drei Werte sind synonym',
             'SL-T ist nur fuer Komponenten relevant',
             'SL-A ist die Mindestanforderung an die DMZ'], 0,
            'IEC 62443-3-2:2020 §ZCR 6: Ziel ist SL-A &ge; SL-T pro Zone/Conduit.'),
        q('Welche Reihenfolge entspricht der Risikoanalyse nach IEC 62443-3-2:2020?',
            ['SuC-Definition &rarr; High-Level RA &rarr; Zonen/Conduits &rarr; Detailed RA &rarr; Cybersecurity Requirements Specification',
             'Pen-Test &rarr; Patch &rarr; Zertifizierung',
             'Threat Modeling &rarr; Patch &rarr; Audit',
             'Asset-Inventory &rarr; AV-Update &rarr; Backup'], 0,
            'IEC 62443-3-2:2020 §ZCR 1-7 in dieser Reihenfolge.'),
        q('Was ist der Hauptzweck eines Conduits in IEC 62443?',
            ['Buendelung und Kontrolle saemtlichen Datenverkehrs zwischen Zonen',
             'Stromversorgung der Steuerungen',
             'Mechanische Trennung des Schaltschranks',
             'Synchronisation der Echtzeit-Uhr'], 0,
            'IEC 62443-1-1:2009 Begriffe; -3-2:2020 Anwendung. Conduit = sichere Roehre fuer Inter-Zone-Verkehr.'),
        q('Welche Sicherheits-Eigenschaft fehlt klassischem Modbus TCP per Default?',
            ['Authentifizierung und Verschluesselung — beide nicht vorgesehen',
             'Adressierung',
             'Funktion-Code-Definition',
             'TCP-Transport'], 0,
            'Modbus TCP (1999) ist Klartext, ohne Auth. Modbus Security Spec (2018) ergaenzt TLS und Rolle "Authorization" via X.509.'),
        q('Welcher Security-Mode ist in OPC UA produktiv zu verwenden?',
            ['SignAndEncrypt mit modernem Profil (z.B. Aes256_Sha256_RsaPss)',
             'None',
             'Sign (ohne Encrypt)',
             'Compatibility'], 0,
            'OPC UA Part 2 v1.05 §6.7. None ist nur fuer Discovery erlaubt; Sign ohne Encrypt schuetzt Vertraulichkeit nicht.'),
        q('Welche PROFINET Security Class fuegt Vertraulichkeit (Verschluesselung) hinzu?',
            ['Class 3', 'Class 1', 'Class 2', 'Class 0'], 0,
            'IEC 61784-3-3:2021: Class 1 Robustness, Class 2 Integrity/Authenticity, Class 3 Confidentiality (TLS).'),
        q('Was war das Hauptziel von Stuxnet (2010)?',
            ['Sabotage von Siemens-S7-Steuerungen iranischer Uranzentrifugen durch Drehzahlmanipulation',
             'Erpressung mit Ransomware',
             'Diebstahl von Geschaeftsgeheimnissen',
             'Cryptomining auf SPS-CPUs'], 0,
            'Symantec "W32.Stuxnet Dossier" v1.4 (2011): Sabotage in Natanz, Manipulation Frequenzumrichter (Vacon, Fararo Paya) ueber S7-Rootkit.'),
        q('Welche Komponente in Stuxnet ermoeglichte das unbemerkte Veraendern der SPS-Logik?',
            ['Ein S7-Rootkit, das im STEP7-Engineering-Tool den Datenstrom manipulierte (Lese-/Schreib-MITM)',
             'Eine Phishing-Mail',
             'Ein Hardware-Implant in der CPU',
             'Ein TLS-Downgrade-Angriff'], 0,
            'Falliere/Murchu/Chien: DLL-Hook in STEP7 lieferte beim Auslesen der SPS-Bloecke die Originale zurueck — typischer "ladder logic bombs"-Angriff.'),
        q('Wer wird als Acteur hinter Industroyer / CRASHOVERRIDE attribuiert?',
            ['SANDWORM (GRU Unit 74455)',
             'Lazarus Group (DPRK)',
             'APT41 (China)',
             'Equation Group'], 0,
            'Dragos/ESET 2017 und CISA AA22-110A: Industroyer2 (Apr. 2022) explizit SANDWORM/GRU 74455.'),
        q('Welche Industrieprotokolle adressiert Industroyer modular?',
            ['IEC 60870-5-101/104, IEC 61850 (GOOSE/MMS) und OPC DA',
             'Modbus TCP und CIP',
             'BACnet und KNX',
             'PROFINET IRT und EtherCAT'], 0,
            'Industroyer-Whitepaper Dragos/ESET 2017: 4 Protokoll-Module + Wiper + SIPROTEC-DoS (CVE-2015-5374).'),
        q('Welche Besonderheit zeichnet TRITON / TRISIS aus?',
            ['Erste Malware, die ein Safety-Instrumented-System (Triconex 3008) angegriffen hat',
             'Erste Ransomware in OT',
             'Erste Air-Gap-uebergreifende Verbreitung',
             'Erste auf Modbus zugeschnittene Malware'], 0,
            'FireEye/Mandiant 2017/2018: Modifikation einer SIS-Routine ueber TriStation-1131-Engineering-Software in einer petrochemischen Anlage in Saudi-Arabien.'),
        q('Welche Schutzmassnahme haette TRITON am wirksamsten verhindert?',
            ['Schreibschutz-Schluesselschalter "Run/Program" am Triconex auf Run gesetzt',
             'Aktivierung von HTTP/2',
             'Wechsel von 100 MBit/s auf Gigabit-Ethernet',
             'Erhoehung der Polling-Rate'], 0,
            'Mandiant TRITON Report: physischer Schluesselschalter haette Programmaenderung blockiert. Gehaert zur Standard-OT-Sicherheitspraxis fuer SIS.'),
        q('Was ist MITRE ATT&CK for ICS v14 (Okt. 2023)?',
            ['Taxonomie aus 12 Tactics, 96 Techniques und dokumentierten ICS-Threat-Groups',
             'Ein kommerzielles SIEM-Produkt',
             'Eine OT-Firewall',
             'Eine Norm zur Funktionalen Sicherheit'], 0,
            'MITRE ATT&CK for ICS v14 (Oct. 2023) — referenziert in NIST CSF 2.0 (Feb. 2024) und IEC-62443-Audits.'),
        q('Welche Massnahme erzwingt Einbahn-Datenfluss aus einer OT-Zone heraus?',
            ['Eine Data-Diode (unidirectional security gateway)',
             'Ein Stateful Inspection Firewall',
             'Ein VPN-Gateway',
             'Ein DNS-Server'], 0,
            'NIST SP 800-82r3 §5.4 und IEC 62443-3-3 SR 5.2 RE 1: Data Diodes als physisch unidirektionaler Conduit.'),
        q('Welche Engineering-Workstation-Massnahme ist Stuxnet-Lesson-Learned?',
            ['Application Allowlisting und kein Internetzugriff fuer Engineering-Hosts',
             'Aktivierung von TLS 1.0 zur Kompatibilitaet',
             'Deaktivierung der Windows-Firewall',
             'Default-Admin-Konto belassen'], 0,
            'BSI ICS-Kompendium 2024 M5.4 / NIST SP 800-82r3 §6.2.5: Engineering-Workstations gehaerten, AppLocker/AppControl, kein Internet, separate Domain.'),
        q('Welche Schutzmassnahme ist gegen passive OT-Anomalie-Erkennung ungeeignet?',
            ['Aktive Nmap-Scans zur Asset-Discovery',
             'SPAN-/Mirror-Port mit passiver Sonde',
             'NetFlow-/IPFIX-Analyse',
             'Application-Layer-Parsing der Industrie-Protokolle'], 0,
            'Aktives Scannen kann ICS-Assets crashen; passive Methoden sind Stand der Praxis (Claroty, Nozomi, Dragos).'),
        q('Was ist der Black-Channel-Ansatz nach IEC 61784-3?',
            ['Funktionale-Safety-Telegramme (z.B. PROFIsafe) werden ueber unsichere Kommunikation transportiert; Sicherheitsfunktion liegt in den Safety-Endpunkten',
             'Eine optische Glasfaserverbindung',
             'Ein verschluesselter Ethernet-Kanal',
             'Ein dediziertes Frequenzband'], 0,
            'IEC 61784-3:2021: Safety-Layer mit CRC, Sequenznummer, Timeout liegt in der Anwendung; das Transport-Netz ("Black Channel") muss nur deterministisch genug sein.'),
        q('Welche Massnahme adressiert FR 5 (Restricted Data Flow) primaer?',
            ['Zonen-/Conduit-Architektur und gefilterte iDMZ',
             'TLS-Verschluesselung von OT-Daten',
             'Multi-Faktor-Authentifizierung am HMI',
             'Backup-Strategie'], 0,
            'IEC 62443-3-3:2013 SR 5.x. FR 5 = RDF. iDMZ + Conduits sind Standardumsetzung.'),
        q('Welche IEC-62443-Norm spezifiziert die Sicherheitsanforderungen an einzelne IACS-Komponenten?',
            ['IEC 62443-4-2:2019', 'IEC 62443-2-4:2015', 'IEC 62443-3-3:2013', 'IEC 62443-1-1:2009'], 0,
            'IEC 62443-4-2:2019 spezifiziert die Anforderungen pro SL fuer Software- und Hardware-Komponenten (Embedded Devices, Network Devices, Host Devices, Software Apps).'),
        q('Welche Rolle hat IEC 62443-2-4:2015+A1:2017?',
            ['Sicherheitsanforderungen an Service-Provider/Integratoren',
             'Komponenten-Zertifizierung',
             'Funktionale Safety',
             'Krypto-Algorithmen'], 0,
            'IEC 62443-2-4 adressiert Anforderungen an Solution-Provider (z.B. Inbetriebnahme, Wartungsdienstleister).'),
        q('Welche Massnahme verhindert Default-Credential-Angriffe in OT am wirksamsten?',
            ['Asset-Inventory mit Pflicht zur Default-Passwort-Aenderung in Inbetriebnahme',
             'Aktivierung von DHCP',
             'Erhoehung der MTU',
             'IPv6-Migration'], 0,
            'NIST SP 800-82r3 §6.2.4 / BSI M5.5: Default-Credentials wechseln, individuelle Konten, MFA wo moeglich.'),
        q('Welche Schwachstelle wurde von Industroyer gegen Siemens SIPROTEC-Schutzrelais ausgenutzt?',
            ['CVE-2015-5374 — DoS in Ethernet-Stack der SIPROTEC-4-Familie',
             'CVE-2017-12741 — SHA-1-Bruch',
             'CVE-2020-15782 — RCE in S7-1500',
             'CVE-2022-25622 — Modbus-Auth-Bypass'], 0,
            'CVE-2015-5374: praeparierte Ethernet-Pakete legen das SIPROTEC-Relais lahm. Industroyer enthielt ein dediziertes Modul.'),
        q('Welcher Standard regelt die Funktionale Sicherheit in der Prozessindustrie?',
            ['IEC 61511 (mit IEC 61508 als Grundnorm)',
             'IEC 27001',
             'ISO 9001',
             'ISO 22000'], 0,
            'IEC 61508-1:2010 generisch; IEC 61511-1:2017 fuer Prozessindustrie (SIS).'),
        q('Welche Konvergenz-Norm verbindet Safety- und Security-Lifecycle?',
            ['ISA-TR84.00.09:2021 (Cybersecurity Related to the Safety Lifecycle)',
             'IEC 60870-5-104',
             'ISO 31000',
             'IEC 61968'], 0,
            'ISA-TR84.00.09:2021 (rev.) verzahnt IEC 61511- mit IEC-62443-Lifecycle.'),
        q('Welcher Punkt ist KEIN Ziel des BSI-ICS-Kompendiums 2024?',
            ['Festlegung kommerzieller Lizenzbedingungen fuer SCADA-Systeme',
             'Hilfestellung zur Schutzbedarfsfeststellung',
             'Massnahmenkatalog M1-M9 fuer ICS',
             'Mapping zu ISO/IEC 27001:2022'], 0,
            'BSI-Kompendium ist normativ-neutral; Lizenzen sind nicht Gegenstand.'),
        q('Welche Eigenschaft hat OPC UA Pub/Sub (Part 14)?',
            ['Ereignis-orientierte UDP-Multicast/MQTT-Publikation, optional mit Symmetric Key Service fuer Message Security',
             'Ausschliesslich TCP-basiert',
             'Erfordert immer X.509-Zertifikate pro Subscriber',
             'Definiert eine SPS-Programmiersprache'], 0,
            'OPC UA Part 14 (2018, rev. 2022): Pub/Sub mit UDP/MQTT/AMQP; Security via SKS oder Brokered Security.'),
        q('Welche Massnahme adressiert den Initial-Access-Vektor "Lieferanten-VPN" in OT-Netzen?',
            ['Jump-Server in iDMZ mit MFA und Session-Recording',
             'Direkter VPN-Tunnel auf SPS',
             'WLAN-Hotspot fuer Servicetechniker',
             'Public-IP fuer das HMI'], 0,
            'BSI-Audits 2023/2024: direkter Lieferanten-VPN ist Top-Befund. Sicherheitsstandard: Bastion-/Jump-Host in iDMZ, MFA, Session-Recording (NIST SP 800-82r3 §6.2.6).'),
        q('Welche ICS-MITRE-ATT&CK-Tactic beschreibt Angriffe, die Steuerprozesse stoeren?',
            ['Impair Process Control', 'Initial Access', 'Persistence', 'Discovery'], 0,
            'MITRE ATT&CK for ICS v14: Tactic TA0106 "Impair Process Control" (z.B. Spoof Reporting Message, Modify Parameter).'),
        q('Welche Massnahme reduziert die Angriffsflaeche eines historians in iDMZ?',
            ['Pull-Modell aus OT in iDMZ statt push-Verbindungen aus IT in OT',
             'Direktes Push aus OT ins Internet',
             'WLAN-basierter Datenabruf',
             'Telnet-Konsole'], 0,
            'Industrial-DMZ-Designs (Cisco/Rockwell CPwE 2024): historian replicates one-way; OT-Quelle pullt nicht aus IT.'),
        q('Welcher Foundational-Requirement-Bereich ist mit "Restricted Data Flow" gemeint?',
            ['FR 5 — Segmentation, Conduit-Filterung, Daten-Diode',
             'FR 4 — Data Confidentiality',
             'FR 6 — Timely Response',
             'FR 7 — Resource Availability'], 0,
            'IEC 62443-3-3:2013 SR 5.x; FR 5 = RDF.'),
        q('Welche Aussage zu DNP3 ist korrekt?',
            ['DNP3 Secure Authentication v5 ist in IEEE 1815-2012 normiert und addiert HMAC-basierte Auth ohne Verschluesselung',
             'DNP3 verwendet TLS standardmaessig seit 1995',
             'DNP3 ist auf Modbus-RTU aufgesetzt',
             'DNP3 hat keine Standardisierung'], 0,
            'IEEE 1815-2012: SAv5 setzt HMAC-SHA-256 ein; Vertraulichkeit ueber zusaetzlichen TLS-Wrap (DNP3-SA + TLS).'),
        q('Welche Eigenschaft hat ein Safety-Schutzschalter "Run/Program/Remote" an Steuerungen wie Triconex / Siemens S7?',
            ['Mechanischer Schluesselschalter blockiert Programmaenderungen, sofern in Run-Position',
             'Reine Software-Funktion',
             'Aktiviert nur das Web-Interface',
             'Wechselt zwischen IPv4 und IPv6'], 0,
            'Standard-OT-Praxis (Mandiant TRITON Lessons): Schluesselschalter haerten gegen unautorisierte Logik-Aenderung.'),
        q('Welche der folgenden Kennziffern ist KEIN Bestandteil von SL-A nach 62443?',
            ['Anzahl Schichten im Purdue-Modell',
             'IAC-Anforderungen tatsaechlich erfuellt',
             'UC-Anforderungen tatsaechlich erfuellt',
             'TRE-Anforderungen tatsaechlich erfuellt'], 0,
            'SL-A ist die je FR pro Zone real erreichte Faehigkeit (FR 1-7). Schichtenzahl gehoert nicht dazu.'),
        q('Welche Empfehlung gibt NIST SP 800-82r3 zu Patch-Management in OT?',
            ['Risikobasierte Priorisierung mit dokumentierter Test- und Wartungsfenster-Planung; "patch when feasible" mit Compensating Controls',
             '24/7-Auto-Update wie in Office-IT',
             'Komplettverzicht auf Patches',
             'Patches nur an Wochenenden ausschliesslich automatisch'], 0,
            'NIST SP 800-82r3 §6.2.10: Patches risikobasiert, in Wartungsfenster, mit Re-Validation und Compensating Controls bei Patch-Verzug.'),
        q('Welche Aussage zu Engineering-Workstations ist nach NIST SP 800-82r3 korrekt?',
            ['Sie sind hochwertige Ziele und gehoeren in eine separate, gehaertete OT-Domain ohne Internetzugang',
             'Sie duerfen direkt im Office-LAN stehen',
             'Sie benoetigen keine Endpoint-Protection',
             'Sie sind als Wegwerfgeraete gedacht'], 0,
            'NIST SP 800-82r3 §6.2.5; BSI M5.4. Engineering-Workstation ist Schluessel zum Tier 1 (z.B. Stuxnet, TRITON, BlackEnergy).'),
        q('Welche Norm regelt Zertifizierung von OT-Komponenten ueber das ISASecure-Programm?',
            ['IEC 62443-4-2 in Verbindung mit 62443-4-1',
             'ISO 9001',
             'IEC 60601',
             'ISO 14001'], 0,
            'ISASecure Component Security Assurance (CSA) basiert auf IEC 62443-4-1 (Prozess) + 62443-4-2 (Komponenten-Anforderungen).'),
        q('Welche Eigenschaft hat IEC 61850 GOOSE?',
            ['Ethernet-Multicast mit harter Echtzeitanforderung (typisch &lt; 4 ms), kein TCP, optional R-GOOSE mit Authentifizierung',
             'Punkt-zu-Punkt seriell mit RS-485',
             'HTTPS-basiert',
             'Modbus-RTU-Kompatibel'], 0,
            'IEC 61850-8-1:2020: GOOSE auf Ethernet-Layer 2, Multicast. Authentifizierung ueber HMAC nach IEC 62351-6 (R-GOOSE).'),
        q('Welche Norm-Familie schuetzt IEC-61850-Kommunikation auf Anwendungsebene?',
            ['IEC 62351 (insbesondere -3 fuer TLS, -4 fuer MMS, -6 fuer GOOSE/SV)',
             'IEC 60870-5-104',
             'ISO 27001',
             'IEC 61131-3'], 0,
            'IEC 62351-Serie deckt Authentizitaet/Vertraulichkeit fuer EVU-Protokolle ab.'),
        q('Welche der folgenden Aussagen zu CIP Security ist korrekt?',
            ['Es ergaenzt EtherNet/IP um TLS, DTLS, X.509-Auth und Pull-Modell-Konfiguration; spezifiziert in CIP Volume 8',
             'Es ersetzt Modbus',
             'Es ist ein Hardware-VPN',
             'Es ist nur fuer Allen-Bradley verfuegbar'], 0,
            'CIP Volume 8 v1.13 (2024). CIP Security ist herstelleruebergreifend (ODVA) und kombiniert Endpoint Identity + Data Integrity + Confidentiality.'),
        q('Welche Massnahme erfuellt FR 7 (Resource Availability) am direktesten?',
            ['DoS-Resistenz, redundante Steuerungen und kontrollierte Ressourcen-Limits',
             'AES-Verschluesselung der Engineering-Daten',
             'Multi-Faktor-Authentifizierung',
             'Logging der HMI-Zugriffe'], 0,
            'IEC 62443-3-3:2013 SR 7.x: u.a. SR 7.1 DoS-Schutz, SR 7.4 Wiederherstellbarkeit, SR 7.5 Notbetrieb.'),
        q('Welche Anforderung der EU-NIS2-Richtlinie ist fuer KRITIS-OT-Betreiber besonders relevant?',
            ['Meldepflichten fuer Sicherheitsvorfaelle innerhalb von 24 h Frueh- und 72 h Folgemeldung',
             'Pflicht zur Open-Source-Veroeffentlichung der Steuerungslogik',
             'Verbot von Cloud-Diensten',
             'Pflicht zur Zertifizierung nach ISO 9001'], 0,
            'NIS2-Richtlinie (EU 2022/2555) Art. 23: 24 h Early Warning, 72 h Incident Notification, 1 Monat Final Report.'),
        q('Welcher Begriff beschreibt die getrennte Engineering-Toolchain mit "Whitelist" zugelassener Programme?',
            ['Application Allowlisting (frueher: Whitelisting)',
             'AV-Signaturen',
             'Cloud-EDR',
             'NAT-Traversal'], 0,
            'NIST SP 800-167; BSI M5.4. Allowlisting (z.B. Trellix Application Control, Microsoft AppLocker, Carbon Black) ist OT-Standard fuer HMI/EWS.'),
        q('Welcher Begriff beschreibt die gemeinsame Pflege von Schutzbedarfen Safety+Security?',
            ['Safety-Security-Co-Engineering nach ISA-TR84.00.09 / IEC 63069',
             'CIA-Triade',
             'AAA-Modell',
             'Bell-LaPadula-Modell'], 0,
            'IEC TR 63069:2019 und ISA-TR84.00.09:2021 verzahnen Safety- und Security-Lifecycle.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 4 — Sichere Softwareentwicklung / S-SDLC (PRODUKTIV)
    // Quellen: NIST SP 800-218 v1.1 "Secure Software Development Framework"
    // (Feb. 2022); NIST SP 800-218A "SSDF for Generative AI" (Apr. 2024);
    // OWASP Top 10:2021; OWASP ASVS 4.0.3 (2023); OWASP SAMM v2.0;
    // Microsoft SDL (Howard/Lipner 2006, aktuelle Practices 2024);
    // Shostack "Threat Modeling: Designing for Security" (2014);
    // Deng et al. "LINDDUN: a privacy threat analysis framework" (2011);
    // ISO/IEC 27034 (Application Security); IEC 62443-4-1:2018;
    // CERT C Coding Standard 2016 + 2020 errata; MISRA C:2012 Amd.4 (2023);
    // CWE Top 25 (2024); SLSA Spec v1.0 (Apr. 2023); in-toto Spec v0.9;
    // Sigstore (Cooperation 2022); CycloneDX 1.6 (2024); SPDX 2.3 / 3.0 (2024);
    // EU Cyber Resilience Act 2024/2847 (CRA); SolarWinds Sunburst (FireEye/
    // Mandiant Dec. 2020); log4shell CVE-2021-44228; xz-utils CVE-2024-3094;
    // CHECKMARX/Snyk State of Open Source Security 2024.
    // ----------------------------------------------------------------------

    const PAGE_SSE_TM = {
        title: '4.1 Threat Modeling — STRIDE, LINDDUN, Attack Trees',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) den Threat-Modeling-Prozess in vier Schritten beschreiben, (2) STRIDE pro Datenflusselement anwenden, (3) LINDDUN fuer Privacy-Threats abgrenzen, (4) Attack Trees aufbauen und gewichten.</blockquote>'

            + '<h4>4.1.1 Vier Fragen nach Shostack</h4>'
            + '<ol>'
            + '<li><em>What are we building?</em> &mdash; System-Skizze mit Data-Flow-Diagramm (DFD), Trust Boundaries einzeichnen.</li>'
            + '<li><em>What can go wrong?</em> &mdash; STRIDE/LINDDUN systematisch je Element.</li>'
            + '<li><em>What are we going to do about it?</em> &mdash; Mitigation pro identifizierter Bedrohung.</li>'
            + '<li><em>Did we do a good job?</em> &mdash; Review, Restrisiko, naechste Iteration.</li>'
            + '</ol>'

            + '<h4>4.1.2 STRIDE</h4>'
            + '<p>Microsoft-Akronym (Howard/Lipner 2006), das fuer jeden Datenfluss/-speicher/-prozess die folgenden Bedrohungsklassen abfragt:</p>'
            + '<table><thead><tr><th>Buchstabe</th><th>Bedrohung</th><th>Verletztes Schutzziel</th></tr></thead><tbody>'
            + '<tr><td>S</td><td>Spoofing</td><td>Authentizitaet</td></tr>'
            + '<tr><td>T</td><td>Tampering</td><td>Integritaet</td></tr>'
            + '<tr><td>R</td><td>Repudiation</td><td>Nichtabstreitbarkeit</td></tr>'
            + '<tr><td>I</td><td>Information Disclosure</td><td>Vertraulichkeit</td></tr>'
            + '<tr><td>D</td><td>Denial of Service</td><td>Verfuegbarkeit</td></tr>'
            + '<tr><td>E</td><td>Elevation of Privilege</td><td>Autorisierung</td></tr>'
            + '</tbody></table>'
            + '<p><strong>STRIDE-per-Element</strong>: External Entity &rarr; S/R; Process &rarr; STRIDE komplett; Data Flow &rarr; T/I/D; Data Store &rarr; T/I/D/R. Das reduziert die Frage-Matrix erheblich (Shostack 2014, §3).</p>'

            + '<h4>4.1.3 LINDDUN fuer Privacy-Threats</h4>'
            + '<p>Deng et al. (KU Leuven) entwickelten LINDDUN als Privacy-Pendant zu STRIDE: <em>Linkability, Identifiability, Non-Repudiation, Detectability, Disclosure of Information, Unawareness, Non-Compliance</em>. Anwendung pro DFD-Element analog zu STRIDE; Fokus liegt auf Datenschutz-Risiken (DSGVO, EU AI Act). Aktuelle Variante: <strong>LINDDUN GO</strong> (2022) mit Karten-/Workshop-Format.</p>'

            + '<h4>4.1.4 Attack Trees und Risiko-Bewertung</h4>'
            + '<p>Schneier 1999. Wurzel: Angreifer-Ziel; AND/OR-Verzweigung in Sub-Ziele bis zu konkreten Aktionen. Knoten lassen sich mit Kosten (USD), Skill (Level 1-5) oder Wahrscheinlichkeit gewichten; minimaler Pfad = leichtester Angriff. Werkzeuge: Microsoft Threat Modeling Tool 2016 (Office365), OWASP Threat Dragon 2.x, IriusRisk.</p>'

            + '<h4>4.1.5 Bewertung mit DREAD/CVSS</h4>'
            + '<p>DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability) ist heuristisch und schwer reproduzierbar &mdash; aktuell empfohlen: <strong>CVSS v4.0</strong> (FIRST Nov. 2023) fuer technische Schwachstellen, <strong>EPSS</strong> fuer Wahrscheinlichkeit, <strong>FAIR</strong> (Open FAIR Body of Knowledge 2024) fuer monetaer-quantitative Risikoanalyse. CISA-KEV-Katalog ergaenzt um Felddaten zur tatsaechlichen Ausnutzung.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Shostack 2014; Howard/Lipner "The Security Development Lifecycle" 2006; Deng et al. 2011, Springer Requirements Engineering 16(1); Schneier "Attack Trees" Dr. Dobb&#39;s Dec. 1999; FIRST CVSS v4.0 Spec 2023; CISA KEV (laufend gepflegt).</em></p>'
    };

    const PAGE_SSE_CODE = {
        title: '4.2 Sichere Coding-Standards und Memory-Safety',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die wichtigsten Memory-Safety-Schwachstellen benennen, (2) MISRA-C und CERT-C einordnen, (3) typische Mitigationen (Stack-Canaries, ASLR, CFI) erklaeren, (4) den Wechsel auf memory-safe-Sprachen (Rust) im Embedded-Kontext bewerten.</blockquote>'

            + '<h4>4.2.1 CWE Top 25 (2024)</h4>'
            + '<p>MITRE/CISA pflegen jaehrlich eine Liste der gefaehrlichsten Software-Schwachstellen, gewichtet nach Anzahl der CVEs und Schwere. Top-Plaetze 2024 (Auswahl):</p>'
            + '<ol>'
            + '<li>CWE-787 Out-of-bounds Write</li>'
            + '<li>CWE-79 Cross-Site Scripting</li>'
            + '<li>CWE-89 SQL Injection</li>'
            + '<li>CWE-416 Use After Free</li>'
            + '<li>CWE-78 OS Command Injection</li>'
            + '<li>CWE-20 Improper Input Validation</li>'
            + '<li>CWE-125 Out-of-bounds Read</li>'
            + '<li>CWE-22 Path Traversal</li>'
            + '</ol>'
            + '<p>Davon sind <strong>CWE-787, -416, -125, -476, -190</strong> klassische Memory-Safety-Bugs &mdash; in C/C++ vermeidbar nur durch Disziplin oder Sprachwechsel.</p>'

            + '<h4>4.2.2 MISRA-C und CERT-C</h4>'
            + '<table><thead><tr><th>Standard</th><th>Zielgruppe</th><th>Charakter</th></tr></thead><tbody>'
            + '<tr><td>MISRA C:2012 (Amd. 4 2023)</td><td>Automotive, Industrie, Medizin</td><td>Coding-Regeln (175+ Rules); Pflicht in ISO 26262 ASIL-A+</td></tr>'
            + '<tr><td>CERT C Coding Standard (2016 + 2020-Errata)</td><td>allgemein sicherheitskritisch</td><td>Schwachstellen-Vermeidung, Mapping auf CWE/CVE</td></tr>'
            + '<tr><td>MISRA C++:2023</td><td>moderne C++17-Codebasen</td><td>aktualisiert MISRA-C++:2008 fuer C++17/20</td></tr>'
            + '<tr><td>AUTOSAR C++14</td><td>Automotive (vor MISRA C++:2023)</td><td>weitgehend in MISRA C++:2023 ueberfuehrt</td></tr>'
            + '</tbody></table>'

            + '<h4>4.2.3 Hardening-Mechanismen</h4>'
            + '<ul>'
            + '<li><strong>Stack-Canaries</strong> (StackGuard 1998 / GCC <code>-fstack-protector-strong</code>): Wert vor Return-Adresse; Mismatch &rarr; Abort.</li>'
            + '<li><strong>ASLR</strong> (Address Space Layout Randomization, PaX 2001): zufaellige Basis fuer Code/Stack/Heap.</li>'
            + '<li><strong>DEP / NX</strong>: Datenseiten nicht ausfuehrbar (W^X).</li>'
            + '<li><strong>RELRO + BIND_NOW</strong>: Linker-Tabellen schreibgeschuetzt.</li>'
            + '<li><strong>FORTIFY_SOURCE=2/3</strong>: Compiler-seitige Bounds-Checks fuer libc-Funktionen.</li>'
            + '<li><strong>Control Flow Integrity (CFI)</strong>: Forward-edge (LLVM CFI, Microsoft CFG) und Backward-edge (Intel CET Shadow Stack, ARM PAC/BTI).</li>'
            + '<li><strong>Sanitizers</strong> in Tests: AddressSanitizer (Serebryany et al. 2012), UndefinedBehaviorSanitizer, ThreadSanitizer, MemorySanitizer.</li>'
            + '</ul>'

            + '<h4>4.2.4 Memory-safe Sprachen im Embedded-Kontext</h4>'
            + '<p>NSA "Software Memory Safety" Cybersecurity Information Sheet (Nov. 2022) und ONCD "Back to the Building Blocks" (Feb. 2024) empfehlen den Wechsel auf <strong>memory-safe languages</strong> (Rust, Go, Swift, Java, C#, Python) wo moeglich. Im Embedded-Bereich:</p>'
            + '<ul>'
            + '<li><strong>Rust</strong> mit <code>no_std</code> + <code>embassy</code>/<code>RTIC</code> fuer Cortex-M; Borrow-Checker schliesst CWE-416/787/125/476 zur Compile-Zeit aus.</li>'
            + '<li><strong>Ada/SPARK</strong> seit Jahrzehnten in Avionik (DO-178C); SPARK 2014 mit formaler Verifikation.</li>'
            + '<li><strong>Linux Kernel</strong> akzeptiert Rust-Module seit 6.1 (Dez. 2022); produktive Treiber ab 6.6 (Okt. 2023).</li>'
            + '</ul>'
            + '<p>Pragmatische Migration: neue Komponenten in Rust, Bestandscode in C++ mit Hardening + Sanitizers; <em>nicht</em> bestehende sicherheitskritische Module umschreiben ohne Re-Validation.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: MITRE/CISA CWE Top 25 (2024); MISRA C:2012 Amd. 4 (2023); SEI CERT C 2016+2020; NSA "Software Memory Safety" CSI Nov. 2022; ONCD Tech-Report Feb. 2024; Microsoft Security Response Center "70% of vulnerabilities are memory safety issues" (BlueHat 2019); Linux Kernel 6.1 Release Notes Dec. 2022.</em></p>'
    };

    const PAGE_SSE_TEST = {
        title: '4.3 SAST, DAST, Fuzzing und SCA',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) statische und dynamische Analyse-Verfahren abgrenzen, (2) Fuzzing-Strategien (mutational vs. structure-aware vs. coverage-guided) unterscheiden, (3) SBOM-Formate (CycloneDX, SPDX) zuordnen, (4) typische SCA-Workflows beschreiben.</blockquote>'

            + '<h4>4.3.1 Static Application Security Testing (SAST)</h4>'
            + '<p>Sucht ohne Programmausfuehrung in Quell-/Bytecode nach Mustern (Taint-Analysen, Datenfluss, abstrakte Interpretation). Etablierte Werkzeuge: <em>CodeQL</em> (GitHub Advanced Security), <em>Semgrep</em>, <em>Coverity</em>, <em>Klocwork</em>, <em>SonarQube</em>, <em>Fortify</em>. Stärken: skaliert auf grosse Codebasen, frueh im SDLC anwendbar. Schwäche: hohe False-Positive-Rate, schlechte Erfassung von semantischen Logikfehlern. ISO/IEC 5055:2021 standardisiert Quality Measures fuer SAST-Berichte.</p>'

            + '<h4>4.3.2 Dynamic Application Security Testing (DAST)</h4>'
            + '<p>Pruft die laufende Applikation black-box ueber HTTP, RPC oder Protokoll-Probes. Etablierte Werkzeuge: <em>OWASP ZAP 2.14+</em>, <em>Burp Suite Pro</em>, <em>Nikto</em>, <em>Acunetix</em>. Erfasst Konfigurationsfehler, Authentifizierungs-Schwaechen, Injection-Pfade. Komplementaer zu SAST &mdash; OWASP empfiehlt beide kombiniert. Subform <strong>IAST</strong> (Interactive AST) nutzt Instrumentierung im Application-Server fuer hoehere Genauigkeit.</p>'

            + '<h4>4.3.3 Fuzzing</h4>'
            + '<table><thead><tr><th>Variante</th><th>Prinzip</th><th>Beispiele</th></tr></thead><tbody>'
            + '<tr><td>Black-box mutational</td><td>Bytes-Flip, kein Coverage-Feedback</td><td>radamsa, peach (Legacy)</td></tr>'
            + '<tr><td>Coverage-guided greybox</td><td>Coverage-Bitmap als Fitness, Genetic-Algorithmus</td><td>AFL++, libFuzzer (LLVM), honggfuzz</td></tr>'
            + '<tr><td>Structure-aware</td><td>Grammatik/Protobuf-Schema</td><td>libprotobuf-mutator, Gramatron, Domato</td></tr>'
            + '<tr><td>Symbolic / Concolic</td><td>SMT-Solver erzeugt deckende Inputs</td><td>KLEE, angr, SAGE</td></tr>'
            + '</tbody></table>'
            + '<p>Industriell-relevant: <strong>OSS-Fuzz</strong> (Google) hat seit 2016 ueber 36 000 Bugs in Open-Source-Software gefunden (Stand 2024). Continuous Fuzzing wird in NIST SP 800-218 v1.1 PW.4.4 explizit empfohlen.</p>'

            + '<h4>4.3.4 Software Composition Analysis (SCA) und SBOMs</h4>'
            + '<p>Moderne Anwendungen bestehen zu 70-90&nbsp;% aus Open-Source-Komponenten (Synopsys OSSRA 2024). SCA-Tools (<em>Snyk</em>, <em>Dependabot</em>, <em>Renovate</em>, <em>OWASP Dependency-Check</em>, <em>Trivy</em>) inventarisieren Abhaengigkeiten, mappen sie auf CVE/Advisory-Datenbanken (NVD, GHSA, OSV) und melden gefaehrdete Versionen. Eine <strong>Software Bill of Materials (SBOM)</strong> ist die maschinen-lesbare Stueckliste.</p>'
            + '<p>Standard-Formate (Wahl ist organisationsabhaengig):</p>'
            + '<ul>'
            + '<li><strong>CycloneDX 1.6</strong> (OWASP, Apr. 2024) &mdash; JSON/XML, breite Tool-Unterstuetzung, VEX/SaaSBOM/HBOM-Erweiterungen.</li>'
            + '<li><strong>SPDX 3.0</strong> (Linux Foundation, Apr. 2024) &mdash; ISO/IEC 5962:2021; modulare Profile (Build, AI, Dataset).</li>'
            + '<li>VEX (Vulnerability Exploitability eXchange, CycloneDX und CSAF) ergaenzt SBOMs um Status-Informationen ("Not affected", "Under investigation").</li>'
            + '</ul>'
            + '<p>EU CRA (2024/2847) und US Executive Order 14028 (2021) machen SBOMs fuer staatliche Beschaffung verbindlich.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: NIST SP 800-218 v1.1 PW.4-PW.7 (Feb. 2022); OWASP ASVS 4.0.3 §1.2; CycloneDX 1.6 Spec (2024); SPDX 3.0 (2024) / ISO/IEC 5962:2021; Google OSS-Fuzz Stats 2024; Synopsys "Open Source Security and Risk Analysis" 2024.</em></p>'
    };

    const PAGE_SSE_SUPPLY = {
        title: '4.4 Supply-Chain-Security, SSDF und Vorfaelle',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) NIST SSDF-Practices den Phasen PO/PS/PW/RV zuordnen, (2) SLSA-Levels einordnen, (3) Sigstore und in-toto erklaeren, (4) Lessons Learned aus SolarWinds, log4shell und xz-utils benennen.</blockquote>'

            + '<h4>4.4.1 NIST SP 800-218 (SSDF v1.1)</h4>'
            + '<p>Vier Practice-Gruppen mit jeweiligen Tasks:</p>'
            + '<ul>'
            + '<li><strong>PO &mdash; Prepare the Organization</strong> (Roles, Toolchain-Schutz, Trainings, Security Requirements).</li>'
            + '<li><strong>PS &mdash; Protect the Software</strong> (Code-Integritaet, Provenance, signierte Releases).</li>'
            + '<li><strong>PW &mdash; Produce Well-Secured Software</strong> (Threat Modeling, Secure Coding, SAST/DAST/Fuzzing, Hardening, peer review).</li>'
            + '<li><strong>RV &mdash; Respond to Vulnerabilities</strong> (Vulnerability Management, Disclosure, Patch Lifecycle).</li>'
            + '</ul>'
            + '<p><strong>NIST SP 800-218A</strong> (Apr. 2024) ergaenzt Practices fuer generative AI-Systeme: Modell-, Daten- und Prompt-Provenance.</p>'

            + '<h4>4.4.2 SLSA &mdash; Supply-chain Levels for Software Artifacts</h4>'
            + '<p>SLSA Spec v1.0 (OpenSSF, Apr. 2023). Stufen <em>Build L1 .. L4</em> mit zunehmenden Anforderungen:</p>'
            + '<table><thead><tr><th>Level</th><th>Anforderung</th></tr></thead><tbody>'
            + '<tr><td>Build L1</td><td>Provenance vorhanden &mdash; Build-Plattform dokumentiert ihren Output (z.B. GitHub Actions provenance attestation).</td></tr>'
            + '<tr><td>Build L2</td><td>Hosted Build-Plattform; signierte Provenance.</td></tr>'
            + '<tr><td>Build L3</td><td>Build-Plattform haltbar gehaertet; Isolation, Non-Falsifiable Provenance.</td></tr>'
            + '</tbody></table>'
            + '<p>Track <em>Source</em> (in v1.1 angekuendigt) wird Versionierungs-Anforderungen erweitern.</p>'

            + '<h4>4.4.3 Sigstore und in-toto</h4>'
            + '<p><strong>Sigstore</strong> (Cooperation 2022) ist ein Public-Good-Service-Stack zum keyless-Signieren: <em>cosign</em> (CLI), <em>Fulcio</em> (kurzlebige X.509 via OIDC), <em>Rekor</em> (transparency log analog Certificate Transparency, RFC 6962). Kein Schluessel-Management noetig &mdash; OIDC-Identitaet (z.B. GitHub Actions, Google Workload Identity) ersetzt klassische PGP-Keys.</p>'
            + '<p><strong>in-toto</strong> (Torres-Arias et al. 2019, NDSS) liefert ein <em>Layout</em> mit erwarteten Pipeline-Schritten und kryptographische <em>Link-Metadaten</em> pro Schritt; Verifikation prueft, dass jeder Schritt von berechtigten Funktionaeren gemaess Layout durchgefuehrt wurde.</p>'

            + '<h4>4.4.4 Vorfaelle &mdash; Lessons Learned</h4>'
            + '<ul>'
            + '<li><strong>SolarWinds Sunburst</strong> (Dez. 2020, FireEye/Mandiant Bericht): Build-System der Orion-Plattform kompromittiert, manipuliertes DLL <code>SolarWinds.Orion.Core.BusinessLayer.dll</code> mit gueltiger Signatur an ~18 000 Kunden ausgeliefert. <em>Lesson:</em> reproducible builds, Build-System-Hardening, Provenance.</li>'
            + '<li><strong>log4shell</strong> (Dez. 2021, CVE-2021-44228, CVSS 10.0): JNDI-Lookup-Funktion in log4j 2 erlaubte RCE durch Logging eines manipulierten Strings (<code>${jndi:ldap://...}</code>). <em>Lesson:</em> Default-Sicheres Verhalten, kontinuierliches SBOM-Monitoring, Verzicht auf JNDI-/EL-Features in Logging-Bibliotheken.</li>'
            + '<li><strong>xz-utils-Backdoor</strong> (Maerz 2024, CVE-2024-3094, CVSS 10.0): boeswillig eingeschleuste Backdoor in liblzma durch Maintainer "Jia Tan" ueber zwei Jahre Social-Engineering. Ziel: sshd-RCE bei systemd-Linkage. <em>Lesson:</em> Maintainer-Diversitaet, Reproduzierbare Builds, kritische Aufmerksamkeit fuer Build-System-Aenderungen.</li>'
            + '<li><strong>npm typosquatting/dependency confusion</strong> (Birsan 2021): unbenutzte Internal-Package-Namen oeffentlich registriert &rarr; Build zog automatisch die boeswillige Version. <em>Lesson:</em> Scope-Locking, Private Registry, Allowlists.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: NIST SP 800-218 v1.1 (Feb. 2022); NIST SP 800-218A (Apr. 2024); SLSA Spec v1.0 (OpenSSF Apr. 2023); Sigstore (Cooperation 2022 IEEE S&P); Torres-Arias et al. "in-toto: Providing farm-to-table guarantees for bits and bytes" USENIX Security 2019; FireEye/Mandiant "Highly Evasive Attacker..." Dec. 2020; CVE-2021-44228; CVE-2024-3094; Birsan "Dependency Confusion" Medium 2021.</em></p>'
    };

    const QUIZ_SSE = [
        q('Welche vier Fragen strukturieren den Threat-Modeling-Prozess nach Shostack?',
            ['What are we building? / What can go wrong? / What do we do about it? / Did we do a good job?',
             'Wer hackt uns? / Wie viel kostet es? / Wann passiert es? / Wer haftet?',
             'Threat / Vulnerability / Exploit / Patch',
             'Plan / Do / Check / Act'], 0,
            'Shostack 2014 §1: vier Fragen als Backbone des Threat-Modeling-Workshops; PDCA ist ISMS-Schleife (ISO 27001), nicht Threat Modeling.'),
        q('Welche Bedrohungsklasse in STRIDE adressiert Authentizitaet?',
            ['S — Spoofing', 'T — Tampering', 'I — Information Disclosure', 'D — Denial of Service'], 0,
            'STRIDE: S=Authentizitaet, T=Integritaet, R=Nichtabstreitbarkeit, I=Vertraulichkeit, D=Verfuegbarkeit, E=Autorisierung.'),
        q('Welche STRIDE-Bedrohungen sind nach STRIDE-per-Element fuer einen Data Flow relevant?',
            ['T (Tampering), I (Information Disclosure), D (Denial of Service)',
             'Alle sechs (S/T/R/I/D/E)',
             'Nur S (Spoofing)',
             'Nur E (Elevation of Privilege)'], 0,
            'Shostack 2014 Tab. 3-1: External Entity = S+R; Process = STRIDE komplett; Data Flow = T/I/D; Data Store = T/I/D/R.'),
        q('Wofuer steht das "L" in LINDDUN?',
            ['Linkability — die Faehigkeit, zwei Beobachtungen demselben Subjekt zuzuordnen',
             'Logging',
             'Latency',
             'Loss of Service'], 0,
            'Deng et al. 2011: L=Linkability, I=Identifiability, N=Non-Repudiation, D=Detectability, D=Disclosure of Information, U=Unawareness, N=Non-Compliance.'),
        q('Welche Variante von LINDDUN nutzt ein Karten-/Workshop-Format fuer agile Teams?',
            ['LINDDUN GO (2022)',
             'LINDDUN PRO',
             'LINDDUN+',
             'LINDDUN-XL'], 0,
            'LINDDUN GO ist die kartenbasierte Schnellvariante (2022); LINDDUN PRO ist die formale Methode.'),
        q('Wofuer eignen sich Attack Trees nach Schneier 1999?',
            ['Strukturierte Zerlegung eines Angreifer-Ziels in Teilziele mit AND/OR-Verzweigung; Gewichtung mit Kosten/Skill/Wahrscheinlichkeit',
             'Modellierung von Datenbank-Schemata',
             'Optimierung von Compiler-Backends',
             'Visualisierung von Performance-Profilen'], 0,
            'Schneier "Attack Trees" Dr. Dobb&#39;s 1999: Wurzel = Goal, Pfade = alternative Angriffe; minimaler Pfad = leichtester Angriff.'),
        q('Welcher Standard ist heute fuer technische Schwachstellen-Bewertung empfohlen?',
            ['CVSS v4.0 (FIRST, Nov. 2023) plus EPSS fuer Exploitwahrscheinlichkeit',
             'DREAD',
             'CIA-Triade',
             'OWASP Top 10'], 0,
            'DREAD ist heuristisch und schwer reproduzierbar; CVSS v4.0 + EPSS sind Standard.'),
        q('Welche Schwachstellen-Klasse fuehrt seit Jahren die CWE Top 25 an?',
            ['CWE-787 Out-of-bounds Write',
             'CWE-79 Cross-Site Scripting',
             'CWE-89 SQL Injection',
             'CWE-352 CSRF'], 0,
            'MITRE/CISA CWE Top 25 (2024): CWE-787 auf Platz 1.'),
        q('Welche der folgenden CWE-Klassen sind ueberwiegend Memory-Safety-Fehler?',
            ['CWE-787, CWE-416, CWE-125, CWE-476, CWE-190',
             'CWE-79, CWE-89, CWE-352, CWE-918',
             'CWE-22, CWE-78, CWE-798, CWE-200',
             'CWE-307, CWE-352, CWE-918, CWE-863'], 0,
            'Klassische Memory-Safety-CWEs: Out-of-bounds Write/Read, Use-After-Free, NULL-Deref, Integer Overflow.'),
        q('Welcher Hardening-Mechanismus erkennt Stack-Buffer-Overflows zur Laufzeit?',
            ['Stack-Canary (z.B. -fstack-protector-strong)',
             'ASLR',
             'NX-Bit',
             'RELRO'], 0,
            'StackGuard 1998 / GCC -fstack-protector-strong: Canary-Wert vor Return-Adresse, Mismatch &rarr; abort.'),
        q('Was bewirkt ASLR?',
            ['Zufaellige Basisadressen fuer Code/Stack/Heap, erschwert ROP/Return-into-libc',
             'Verhindert Race Conditions',
             'Erzwingt Bounds-Checks',
             'Macht Code unausfuehrbar'], 0,
            'PaX 2001 / Linux mainline. ASLR = Address Space Layout Randomization.'),
        q('Welcher Mechanismus implementiert Backward-edge-CFI auf Intel-CPUs?',
            ['Intel CET Shadow Stack (CPL3-Shadow Stack)',
             'AES-NI',
             'SMAP',
             'TSX-NI'], 0,
            'Intel CET (seit Tiger Lake/Sapphire Rapids): Shadow Stack schuetzt Backward-edge; IBT schuetzt Forward-edge.'),
        q('Welche ARMv8.3+ -Erweiterung schuetzt Pointer gegen Manipulation?',
            ['PAC (Pointer Authentication Codes)',
             'TBI (Top Byte Ignore)',
             'PAN (Privileged Access Never)',
             'WXN (Write XOR eXecute Never)'], 0,
            'ARMv8.3-A PAC: kryptographische Signatur in oberen Pointer-Bits, BTI ergaenzt Forward-edge-CFI.'),
        q('Welcher Sanitizer findet Out-of-bounds-/UAF-Bugs zur Laufzeit?',
            ['AddressSanitizer (ASan, Serebryany et al. 2012 USENIX ATC)',
             'ThreadSanitizer',
             'MemorySanitizer',
             'UBSan'], 0,
            'AddressSanitizer instrumentiert Memory-Zugriffe und nutzt Shadow-Memory; UBSan adressiert Undefined Behavior, TSan Race Conditions, MSan uninitialisierte Reads.'),
        q('Welche Standardpflicht ergibt sich aus ISO 26262 ASIL-A+ fuer Quellcode?',
            ['Anwendung von MISRA C:2012 (oder gleichwertig) als Coding-Standard',
             'Pflicht zu Java',
             'Verbot statischer Analyse',
             'Pflicht zur Open-Source-Veroeffentlichung'], 0,
            'MISRA C:2012 (Amd. 4 2023) ist die etablierte Coding-Norm fuer ISO 26262 / IEC 61508 / EN 50128.'),
        q('Was empfiehlt die NSA "Software Memory Safety" Information Sheet (Nov. 2022)?',
            ['Wechsel auf memory-safe Sprachen (Rust, Swift, Go, Java, C#) fuer neuen Code wo moeglich',
             'Verzicht auf Compiler-Optimierung',
             'Komplettverzicht auf C/C++ ab sofort',
             'Backup als ausreichende Mitigation'], 0,
            'NSA CSI Nov. 2022; ONCD "Back to the Building Blocks" Feb. 2024 wiederholt diese Empfehlung.'),
        q('Welche Aussage zu OWASP Top 10:2021 ist korrekt?',
            ['A01:2021 ist Broken Access Control; A03:2021 ist Injection; A06:2021 ist Vulnerable & Outdated Components',
             'A01:2021 ist SQL Injection',
             'A03:2021 ist XSS',
             'A06:2021 ist Insecure Design'], 0,
            'OWASP Top 10:2021: A01 BAC, A02 Crypto Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfig, A06 V&O Components, A07 ID&A Failures, A08 Software & Data Integrity, A09 Logging Failures, A10 SSRF.'),
        q('Welche neue Top-10-Kategorie wurde 2021 gegenueber 2017 explizit hinzugefuegt?',
            ['A04:2021 Insecure Design',
             'A03:2021 Injection',
             'A07:2021 Identification & Authentication Failures',
             'A09:2021 Logging Failures'], 0,
            'A04 Insecure Design ist 2021 neu, basiert auf vermehrten Threat-Modeling-/SAMM-Anforderungen.'),
        q('Welcher OWASP-Standard liefert verifikable Anforderungen fuer Web-/API-Anwendungen?',
            ['OWASP ASVS 4.0.3',
             'OWASP Top 10',
             'OWASP SAMM',
             'OWASP Cheat Sheet Series'], 0,
            'ASVS = Application Security Verification Standard; Top 10 ist Awareness, SAMM ist Reifegrad-Modell.'),
        q('Welcher Begriff beschreibt Coverage-guided Greybox-Fuzzing?',
            ['AFL++ / libFuzzer mit Coverage-Bitmap als Genetik-Fitness',
             'Reines random byte flipping ohne Feedback',
             'Statischer Solver wie KLEE',
             'Manuelles Testdaten-Erstellen'], 0,
            'AFL/AFL++ und libFuzzer nutzen Compiler-instrumentierte Coverage-Bitmaps zur Mutation-Steuerung.'),
        q('Was leistet OSS-Fuzz?',
            ['Continuous Fuzzing kostenfrei fuer relevante OSS-Projekte; >36 000 Bugs gefunden seit 2016',
             'Manuelles Code-Review-Service',
             'Ein DAST-Werkzeug fuer Webapps',
             'Eine SBOM-Generator-CLI'], 0,
            'Google OSS-Fuzz Stats 2024: ~36 000 gefundene Bugs in OSS seit Start 2016.'),
        q('Welche SBOM-Spezifikation ist als ISO/IEC 5962 standardisiert?',
            ['SPDX',
             'CycloneDX',
             'SWID-Tags',
             'PURL'], 0,
            'SPDX 2.2 wurde als ISO/IEC 5962:2021 standardisiert; SPDX 3.0 (Apr. 2024) erweitert um Profile.'),
        q('Welche aktuelle CycloneDX-Version bringt VEX/SaaSBOM/HBOM-Erweiterungen?',
            ['CycloneDX 1.6 (Apr. 2024)',
             'CycloneDX 1.0',
             'CycloneDX 0.9',
             'CycloneDX 2.0'], 0,
            'OWASP CycloneDX 1.6 (Apr. 2024) erweitert Lifecycle-/Service-/Hardware-BOM-Profile.'),
        q('Was beschreibt VEX?',
            ['Vulnerability Exploitability eXchange — Status-Information ergaenzend zu SBOMs ("Not affected", "Under investigation")',
             'Eine alternative Programmiersprache',
             'Ein Hypervisor-Schutz',
             'Ein Fuzzer'], 0,
            'VEX-Formate: CycloneDX VEX und CSAF VEX (CISA). Reduziert SBOM-False-Positives.'),
        q('Welche Practice-Gruppe von NIST SSDF v1.1 deckt "Roles, Toolchain-Schutz, Trainings" ab?',
            ['PO — Prepare the Organization',
             'PS — Protect the Software',
             'PW — Produce Well-Secured Software',
             'RV — Respond to Vulnerabilities'], 0,
            'NIST SP 800-218 v1.1 §2.1: PO bereitet Organisation vor.'),
        q('Welche SSDF-Gruppe enthaelt Tasks fuer Code-Integritaet und signierte Releases?',
            ['PS — Protect the Software',
             'PO',
             'PW',
             'RV'], 0,
            'NIST SP 800-218 v1.1 §2.2: PS deckt Software-Integritaet/Provenance ab.'),
        q('Welche Stufe verlangt SLSA v1.0 fuer "non-falsifiable Provenance"?',
            ['Build Level 3',
             'Build Level 1',
             'Build Level 2',
             'Source Level 1'], 0,
            'SLSA Spec v1.0 (Apr. 2023): Build L3 erfordert hardened Build-Plattform mit non-falsifiable Provenance.'),
        q('Was leistet Sigstore "Fulcio"?',
            ['Stellt kurzlebige X.509-Zertifikate auf Basis von OIDC-Identitaeten aus',
             'Logged signierte Eintraege im Transparency-Log',
             'Generiert SBOMs',
             'Fuehrt Fuzzing durch'], 0,
            'Sigstore Architektur: cosign (Tool), Fulcio (kurzlebige Certs via OIDC), Rekor (Transparency Log).'),
        q('Was ist Rekor im Sigstore-Stack?',
            ['Append-only Transparency-Log fuer signierte Software-Artefakte (analog Certificate Transparency, RFC 6962)',
             'Ein Fuzzer',
             'Ein Linter',
             'Ein Container-Registry'], 0,
            'Rekor ist Merkle-Tree-basiertes Append-only-Log; ermoeglicht Verifikation, dass eine Signatur oeffentlich registriert wurde.'),
        q('Was beschreibt in-toto?',
            ['Layout + Link-Metadata, das jede Pipeline-Stufe kryptographisch bezeugt und beim Endprodukt verifiziert wird',
             'Ein Web-Framework',
             'Ein Threat-Modeling-Tool',
             'Eine Fuzzing-Bibliothek'], 0,
            'Torres-Arias et al. USENIX Security 2019. Kombination Layout (erwartete Schritte) + Links (Beweise).'),
        q('Welche CVE bezieht sich auf log4shell?',
            ['CVE-2021-44228',
             'CVE-2017-5638',
             'CVE-2014-0160',
             'CVE-2024-3094'], 0,
            'CVE-2021-44228 (Dez. 2021): JNDI-RCE in log4j 2.x, CVSS 10.0.'),
        q('Welche Eigenschaft hatte SolarWinds Sunburst (Dez. 2020)?',
            ['Build-System-Kompromittierung; manipuliertes signiertes DLL ueber Standard-Update verteilt',
             'Reine Phishing-Kampagne',
             'Hardware-Implant',
             'BLE-basierter Wurm'], 0,
            'FireEye/Mandiant Dec. 2020: Build-Pipeline kompromittiert, ~18 000 Kunden mit signiertem boeswilligem DLL.'),
        q('Welche CVE bezieht sich auf die xz-utils-Backdoor (Maerz 2024)?',
            ['CVE-2024-3094',
             'CVE-2022-3236',
             'CVE-2023-44487',
             'CVE-2014-6271'], 0,
            'CVE-2024-3094: liblzma-Backdoor mit sshd-RCE-Ziel; Maintainer "Jia Tan" ueber 2 Jahre Social Engineering.'),
        q('Welche Lesson-Learned schlaegt aus der xz-utils-Backdoor besonders durch?',
            ['Maintainer-Diversitaet, reproduzierbare Builds, Aufmerksamkeit fuer Build-System-Aenderungen',
             'Verzicht auf Open-Source',
             'Erhoehung der Zykluszeit',
             'Keine konkreten Konsequenzen'], 0,
            'CVE-2024-3094-Analyse: Single-Maintainer-Pakete ohne Build-Reproduzierbarkeit sind Top-Risiko.'),
        q('Was ist "Dependency Confusion" (Birsan 2021)?',
            ['Veroeffentlichung gleichnamiger interner Package-Namen in oeffentlicher Registry; Build zieht boeswillige Version automatisch',
             'Falsches Package-Manager-Tool',
             'Tippfehler im package.json',
             'Hash-Kollision in npm'], 0,
            'Alex Birsan 2021: namespace-globaler PyPI/npm/GemPaket-Bezug ohne Scope-Lock fuehrt zu automatischer Bevorzugung der oeffentlichen Variante.'),
        q('Welche Gegenmassnahme adressiert Dependency Confusion?',
            ['Scope-Locking, Private-Registry-Mirror und Allowlist',
             'AV-Scan zur Laufzeit',
             'Manuelle Git-Tags',
             'Verzicht auf Dependency-Manager'], 0,
            'NIST SP 800-218 PW.4 / GitHub Security Lab Guidance 2021.'),
        q('Welcher OWASP-Standard quantifiziert organisatorische Reife fuer Application Security?',
            ['OWASP SAMM v2.0',
             'OWASP Top 10',
             'OWASP ASVS',
             'OWASP ZAP'], 0,
            'SAMM = Software Assurance Maturity Model; misst Reifegrad in 5 Business-Funktionen.'),
        q('Was empfiehlt OWASP ASVS 4.0.3 zur Authentifizierung?',
            ['Verbot universeller Default-Passwoerter, MFA fuer privilegierte Konten, NIST-SP-800-63B-konforme Passwoerter',
             'Default-Admin-Konto OK',
             'Single-Factor reicht immer',
             'Keine Vorgaben'], 0,
            'OWASP ASVS V2 (Authentication) referenziert NIST SP 800-63B und MFA fuer L2/L3.'),
        q('Was unterscheidet IAST von SAST/DAST?',
            ['IAST instrumentiert die laufende Anwendung von innen und kombiniert Coverage-Daten mit Datenfluss-Analyse',
             'IAST ist nur statisch',
             'IAST ist ein Cloud-Provider',
             'IAST ist veraltet und durch SAST ersetzt'], 0,
            'OWASP DevSecOps-Guide 2024: Interactive AST liefert hoehere Praezision als reines SAST oder DAST.'),
        q('Welche Massnahme ist aus log4shell als organisatorische Lesson-Learned korrekt?',
            ['Kontinuierliches SBOM-Monitoring und Notfall-Patch-Drehbuch fuer kritische Komponenten',
             'Verbot von Logging',
             'Java vollstaendig ersetzen',
             'Verzicht auf Open Source'], 0,
            'CISA Log4Shell Mitigation Guidance Dec. 2021 / NIST SP 800-218 RV.'),
        q('Welche Massnahme erfuellt CRA-Anforderung Art. 13 (Defined Support Period) am direktesten?',
            ['Veroeffentlichung definierter Sicherheits-Update-Zeitraeume mind. 5 Jahre fuer Produkte mit digitalen Elementen',
             'Open-Source-Komplettveroeffentlichung',
             'Auslagerung des Patch-Managements an einen Dritten',
             'Verzicht auf Updates'], 0,
            'EU CRA 2024/2847 Art. 13: mind. 5 Jahre Sicherheits-Updates fuer "Produkte mit digitalen Elementen", angepasst an Lebensdauer.'),
        q('Welche Eigenschaft hat das CSAF-Format?',
            ['Common Security Advisory Framework (OASIS) — maschinen-lesbare Vendor-Advisories und VEX',
             'CSS-Style fuer Sicherheitsberichte',
             'Ein Fuzzing-Tool',
             'Ein Container-Format'], 0,
            'CSAF 2.0 (OASIS 2022): JSON-Format fuer Advisories, VEX-Profile fuer Exploitability-Status.'),
        q('Welche Aussage zu reproduzierbaren Builds ist korrekt?',
            ['Identische Quellen + identischer Build-Prozess erzeugen byteidentische Artefakte; ermoeglicht unabhaengige Verifikation',
             'Builds sollen pro Maschine variieren',
             'Reproducible Builds verhindern Compiler-Optimierung',
             'Reproducible Builds sind nur fuer Java relevant'], 0,
            'Reproducible-Builds.org / Debian Reproducible Builds Project. NIST SSDF PS.3.1 verweist darauf als Empfehlung.'),
        q('Welche Aussage zu Microsoft SDL ist korrekt?',
            ['Treibt Threat Modeling, Secure Coding, FXCop/CodeQL, Fuzzing und Final Security Review als Pflichtschritte vor Release',
             'Ist auf Windows-Code beschraenkt',
             'Ist seit 2010 nicht mehr aktiv',
             'Ersetzt OWASP ASVS'], 0,
            'Howard/Lipner 2006; aktuell als "Microsoft Security Development Lifecycle Practices" 2024 publiziert.'),
        q('Welcher Begriff beschreibt automatische Erkennung verwundbarer Open-Source-Bibliotheken?',
            ['Software Composition Analysis (SCA)',
             'Static Application Security Testing',
             'Threat Modeling',
             'Fuzzing'], 0,
            'OWASP DevSecOps-Guide 2024: SCA-Tools (Snyk, Dependabot, OWASP Dependency-Check, Trivy).'),
        q('Welche Identitaets-Anbindung nutzt Sigstore Fulcio fuer kurzlebige Certs?',
            ['OpenID Connect (OIDC) — z.B. GitHub Actions, Google Workload Identity',
             'Klassisches PGP',
             'X.509 mit 10 Jahren Laufzeit',
             'Kerberos'], 0,
            'Sigstore Fulcio Spec: OIDC-Token bestaetigt Identity, Cert-Lifetime ~10 Minuten.'),
        q('Welche Variante von SPDX deckt AI-Modelle und Datasets ab?',
            ['SPDX 3.0 mit AI- und Dataset-Profil (Apr. 2024)',
             'SPDX 1.0',
             'SPDX 2.0',
             'SPDX-Lite'], 0,
            'SPDX 3.0 (Linux Foundation, Apr. 2024) modularisiert Profile (Build, AI, Dataset, Security).'),
        q('Welche Aussage zur Memory-Safety in modernem Linux ist korrekt?',
            ['Linux 6.1 (Dez. 2022) akzeptierte Rust als Zweitsprache neben C; produktive Treiber ab 6.6',
             'Linux ist seit 5.0 vollstaendig in Rust',
             'Rust ist im Kernel verboten',
             'Kernel-Module muessen weiterhin in Assembly geschrieben werden'], 0,
            'Linux Kernel 6.1 Release Notes Dez. 2022; Rust-Module ab 6.6 (Okt. 2023) z.B. Apple-AGX-Treiber-Hilfen.'),
        q('Welche Best-Practice nennt OWASP ASVS V14 fuer Konfiguration?',
            ['Sichere Defaults, getrennte Build-/Runtime-Profile, kein Geheimnis im Quellcode',
             'Default-Admin-Konto OK',
             'Klartext-Credentials in Git',
             'Auto-Setup ohne Hardening'], 0,
            'OWASP ASVS 4.0.3 §V14 Configuration: Defaults secure, Secrets-Management, Hardening-Profiles.'),
        q('Welche Zertifizierung wird durch ISO/IEC 27034 adressiert?',
            ['Application Security Lifecycle (Application Security Management Process)',
             'Cloud-Service-Security',
             'Funktionale Safety',
             'Hardware-Krypto-Module'], 0,
            'ISO/IEC 27034 spezifiziert Application-Security-Anforderungen ergaenzend zu ISO 27001.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 5 — Risikomanagement und Compliance (PRODUKTIV)
    // Quellen: DIN EN ISO/IEC 27001:2022 inkl. Anhang A; ISO/IEC 27002:2022
    // (93 Controls in 4 Themengruppen); ISO/IEC 27005:2022 (Information
    // security risk management); ISO 31000:2018 (Risk management — Guidelines);
    // ISO/IEC 27004:2016 (Monitoring/Measurement); BSI-Standards 200-1, 200-2,
    // 200-3, 200-4 (BCM, 2023); BSI IT-Grundschutz-Kompendium Edition 2024;
    // Richtlinie (EU) 2022/2555 (NIS2, in Kraft 16.01.2023, Umsetzungsfrist
    // 17.10.2024); Verordnung (EU) 2024/2847 (Cyber Resilience Act, CRA, im
    // Amtsblatt 20.11.2024, Geltung 11.12.2027); BSI-Kritisverordnung
    // (BSI-KritisV) 2021 + IT-SiG 2.0; FIRST CVSS v4.0 Specification (Nov.
    // 2023); FIRST EPSS Model v3 (2023); CISA Binding Operational Directive
    // 22-01 (Nov. 2021, Known Exploited Vulnerabilities Catalog); Open Group
    // "Open FAIR Body of Knowledge" (O-RT, O-RA) Edition 2024; Caralli et al.
    // "Introducing OCTAVE Allegro" CMU/SEI-2007-TR-012; NIST SP 800-30 r1
    // (Risk Assessment, 2012); NIST SP 800-39 (Risk Management, 2011);
    // ISACA COBIT 2019; ENISA Threat Landscape 2024.
    // ----------------------------------------------------------------------

    const PAGE_RISK_ISMS = {
        title: '5.1 ISO/IEC 27001:2022 — ISMS-Aufbau und Annex A',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die Pflicht-Klauseln 4-10 der ISO/IEC 27001:2022 benennen, (2) den Statement-of-Applicability-Prozess erklaeren, (3) die 93 Controls aus Anhang A vier Themengruppen zuordnen, (4) Unterschiede zur Vorversion 2013 und die Transitionsfrist einordnen.</blockquote>'

            + '<h4>5.1.1 Aufbau der Norm (High-Level Structure)</h4>'
            + '<p>ISO/IEC 27001:2022 folgt der Annex-SL-Struktur, die fuer alle ISO-Managementsystem-Normen einheitlich gilt (auch ISO 9001, ISO 14001, ISO 22301, ISO 45001). Pflichtklauseln:</p>'
            + '<table><thead><tr><th>Klausel</th><th>Titel</th><th>Kerninhalt</th></tr></thead><tbody>'
            + '<tr><td>4</td><td>Kontext der Organisation</td><td>interne/externe Themen, interessierte Parteien, Geltungsbereich, ISMS-Festlegung</td></tr>'
            + '<tr><td>5</td><td>Fuehrung</td><td>Verpflichtung der obersten Leitung, IS-Politik, Rollen und Verantwortlichkeiten</td></tr>'
            + '<tr><td>6</td><td>Planung</td><td>Risikoeinschaetzung und -behandlung, IS-Ziele, Aenderungsplanung (Klausel 6.3 ist neu in 2022)</td></tr>'
            + '<tr><td>7</td><td>Unterstuetzung</td><td>Ressourcen, Kompetenz, Bewusstsein, Kommunikation, dokumentierte Information</td></tr>'
            + '<tr><td>8</td><td>Betrieb</td><td>Operative Planung, Risikobehandlungs-Plan, Umsetzung der Controls</td></tr>'
            + '<tr><td>9</td><td>Bewertung der Leistung</td><td>Monitoring, internes Audit, Management Review</td></tr>'
            + '<tr><td>10</td><td>Verbesserung</td><td>kontinuierliche Verbesserung, Korrekturmassnahmen (Reihenfolge 10.1/10.2 vertauscht ggue. 2013)</td></tr>'
            + '</tbody></table>'
            + '<p>Die Klauseln 4-10 sind <strong>verbindlich</strong>. Das uebergeordnete <em>Plan-Do-Check-Act (PDCA)</em>-Modell ist als Konzept beibehalten, wird in der 2022er Fassung aber nicht mehr explizit als verpflichtende Reihenfolge genannt.</p>'

            + '<h4>5.1.2 Risikobehandlung und Statement of Applicability (SoA)</h4>'
            + '<p>Klausel 6.1.2 verlangt einen dokumentierten <strong>Risikoeinschaetzungs-Prozess</strong> (Identifikation, Analyse, Bewertung) und Klausel 6.1.3 einen <strong>Risikobehandlungs-Prozess</strong> mit den vier Optionen <em>Modify (mitigate), Retain (accept), Avoid, Share (transfer)</em>. Auswahl der Controls erfolgt aus Anhang A (Default-Liste), darf jedoch ergaenzt werden.</p>'
            + '<p>Das <strong>Statement of Applicability (SoA)</strong> dokumentiert je Anhang-A-Control: (a) ob anwendbar, (b) Begruendung der Auswahl bzw. des Ausschlusses, (c) Umsetzungsstatus. Ein SoA ohne Begruendung der Ausschluesse ist eine Major Non-Conformity in Audits.</p>'

            + '<h4>5.1.3 Anhang A — 93 Controls in 4 Themengruppen</h4>'
            + '<p>Annex A in ISO/IEC 27001:2022 verweist auf den vollstaendigen Control-Katalog der ISO/IEC 27002:2022 mit <strong>93 Controls</strong> (vorher: 114 Controls in 14 Bereichen). Strukturreform 2022:</p>'
            + '<table><thead><tr><th>Themengruppe</th><th>Praefix</th><th>Anzahl</th></tr></thead><tbody>'
            + '<tr><td>Organizational Controls</td><td>A.5</td><td>37</td></tr>'
            + '<tr><td>People Controls</td><td>A.6</td><td>8</td></tr>'
            + '<tr><td>Physical Controls</td><td>A.7</td><td>14</td></tr>'
            + '<tr><td>Technological Controls</td><td>A.8</td><td>34</td></tr>'
            + '</tbody></table>'
            + '<p>Insgesamt <strong>11 neue Controls</strong> wurden gegenueber 2013 ergaenzt, u.a. <em>A.5.7 Threat intelligence</em>, <em>A.5.23 Information security for use of cloud services</em>, <em>A.5.30 ICT readiness for business continuity</em>, <em>A.7.4 Physical security monitoring</em>, <em>A.8.9 Configuration management</em>, <em>A.8.10 Information deletion</em>, <em>A.8.11 Data masking</em>, <em>A.8.12 Data leakage prevention</em>, <em>A.8.16 Monitoring activities</em>, <em>A.8.23 Web filtering</em>, <em>A.8.28 Secure coding</em>.</p>'
            + '<p>Jeder Control hat in ISO/IEC 27002:2022 fuenf <strong>Attribute</strong>: <code>#Control type</code> (Preventive/Detective/Corrective), <code>#Information security properties</code> (CIA), <code>#Cybersecurity concepts</code> (Identify/Protect/Detect/Respond/Recover, NIST CSF-Kompatibilitaet), <code>#Operational capabilities</code> und <code>#Security domains</code>. Diese ermoeglichen eine flexible Sicht/Filterung des Katalogs.</p>'

            + '<h4>5.1.4 Zertifizierungsprozess und Auditzyklus</h4>'
            + '<p>Akkreditierte Zertifizierung erfolgt durch eine ISO/IEC 17021-1-akkreditierte Zertifizierungsstelle. Standardablauf:</p>'
            + '<ol>'
            + '<li><strong>Stage 1</strong> (Dokumenten-Pruefung, Readiness Review).</li>'
            + '<li><strong>Stage 2</strong> (vor-Ort/On-Site, Implementierungs-Pruefung).</li>'
            + '<li><strong>Surveillance Audits</strong> jaehrlich (Jahr 1, Jahr 2 nach Erstzertifizierung).</li>'
            + '<li><strong>Re-Zertifizierung</strong> nach drei Jahren.</li>'
            + '</ol>'
            + '<p>Pflicht-Inputs des <strong>Management Reviews</strong> (Klausel 9.3.2): Status frueherer Massnahmen, Aenderungen externer/interner Themen, Feedback Stakeholder, Ergebnisse von Risikobehandlung, Audit-Ergebnisse, Erfuellung der IS-Ziele, Verbesserungsmoeglichkeiten.</p>'

            + '<h4>5.1.5 Transitionsfrist 2013 -> 2022</h4>'
            + '<p>IAF MD 26 (International Accreditation Forum Mandatory Document) legt die Migrationsperiode fest: zertifizierte Organisationen mussten bis spaetestens <strong>31. Oktober 2025</strong> auf ISO/IEC 27001:2022 umstellen. Nach diesem Datum verlieren Zertifikate auf Basis der 2013er-Fassung ihre Gueltigkeit.</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: DIN EN ISO/IEC 27001:2022-11 (Anforderungen, Anhang A); DIN EN ISO/IEC 27002:2022-02 (93 Controls + Attribute); ISO/IEC 27000:2018 (Vokabular); IAF MD 26 Issue 4 (Transition zu 27001:2022); ISO/IEC 17021-1:2015 (Anforderungen an Zertifizierungsstellen).</em></p>'
    };

    const PAGE_RISK_BSI_27005 = {
        title: '5.2 BSI IT-Grundschutz und ISO/IEC 27005:2022',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die BSI-Standards 200-1/200-2/200-3/200-4 abgrenzen, (2) Schutzbedarfsfeststellung und Maximumprinzip beschreiben, (3) den ISO/IEC 27005:2022 Risk-Assessment-Prozess durchlaufen, (4) Mapping BSI Grundschutz &harr; ISO 27001 darstellen.</blockquote>'

            + '<h4>5.2.1 BSI-Standards 200-x</h4>'
            + '<table><thead><tr><th>Standard</th><th>Titel</th><th>Inhalt</th></tr></thead><tbody>'
            + '<tr><td>BSI 200-1</td><td>Managementsysteme fuer Informationssicherheit (ISMS)</td><td>allgemeine ISMS-Anforderungen, kompatibel zu ISO 27001</td></tr>'
            + '<tr><td>BSI 200-2</td><td>IT-Grundschutz-Methodik</td><td>drei Vorgehensweisen: Basis-, Standard-, Kern-Absicherung</td></tr>'
            + '<tr><td>BSI 200-3</td><td>Risikoanalyse auf Basis IT-Grundschutz</td><td>vereinfachte Risikoanalyse fuer hohen/sehr hohen Schutzbedarf</td></tr>'
            + '<tr><td>BSI 200-4</td><td>Business Continuity Management (2023)</td><td>BCMS, abgeloest BSI 100-4 (2009); kompatibel zu ISO 22301</td></tr>'
            + '</tbody></table>'
            + '<p>Drei Vorgehensweisen aus 200-2:</p>'
            + '<ul>'
            + '<li><strong>Basis-Absicherung</strong> &mdash; schneller Einstieg, breit aber flach; nur Basis-Anforderungen aller Bausteine.</li>'
            + '<li><strong>Kern-Absicherung</strong> &mdash; fokussiert auf "Kronjuwelen", besonders kritische Geschaeftsprozesse / Werte.</li>'
            + '<li><strong>Standard-Absicherung</strong> &mdash; vollstaendiger Ansatz, ISO-27001-zertifizierungsfaehig auf Basis IT-Grundschutz.</li>'
            + '</ul>'

            + '<h4>5.2.2 IT-Grundschutz-Kompendium Edition 2024</h4>'
            + '<p>Das Kompendium liefert pro Baustein eine Gefaehrdungslage und Anforderungen (Basis/Standard/erhoehter Schutzbedarf). Bausteinschichten:</p>'
            + '<ul>'
            + '<li><strong>ISMS</strong> (uebergeordnet)</li>'
            + '<li><strong>ORP</strong> &mdash; Organisation und Personal</li>'
            + '<li><strong>CON</strong> &mdash; Konzepte und Vorgehensweisen</li>'
            + '<li><strong>OPS</strong> &mdash; Betrieb</li>'
            + '<li><strong>DER</strong> &mdash; Detektion und Reaktion</li>'
            + '<li><strong>APP</strong> &mdash; Anwendungen</li>'
            + '<li><strong>SYS</strong> &mdash; IT-Systeme</li>'
            + '<li><strong>IND</strong> &mdash; industrielle IT (OT)</li>'
            + '<li><strong>NET</strong> &mdash; Netze und Kommunikation</li>'
            + '<li><strong>INF</strong> &mdash; Infrastruktur</li>'
            + '</ul>'
            + '<p>Edition 2024 (Februar 2024) ergaenzt u.a. Cloud-Bausteine (OPS.2.2, OPS.2.3) und aktualisiert IND-Bausteine an IEC 62443.</p>'

            + '<h4>5.2.3 Schutzbedarfsfeststellung</h4>'
            + '<p>Drei Schutzbedarfskategorien (Klassen) je Schutzziel (Vertraulichkeit, Integritaet, Verfuegbarkeit):</p>'
            + '<table><thead><tr><th>Kategorie</th><th>Schadensauswirkungen</th></tr></thead><tbody>'
            + '<tr><td><strong>normal</strong></td><td>begrenzt und ueberschaubar</td></tr>'
            + '<tr><td><strong>hoch</strong></td><td>betraechtlich</td></tr>'
            + '<tr><td><strong>sehr hoch</strong></td><td>existenzbedrohend, katastrophal</td></tr>'
            + '</tbody></table>'
            + '<p>Vererbungsregeln:</p>'
            + '<ul>'
            + '<li><strong>Maximumprinzip</strong>: Schutzbedarf eines Zielobjekts ist mindestens der hoechste Schutzbedarf eines aufsetzenden Objekts.</li>'
            + '<li><strong>Kumulationseffekt</strong>: viele Objekte mit normalem Schutzbedarf koennen kumuliert "hoch" ergeben.</li>'
            + '<li><strong>Verteilungseffekt</strong>: redundant verteilte Daten koennen einzeln einen geringeren Schutzbedarf haben.</li>'
            + '</ul>'
            + '<p>Bei Schutzbedarf <em>hoch</em> oder <em>sehr hoch</em> wird zusaetzlich die <strong>Risikoanalyse nach BSI 200-3</strong> ueber die Standard-Anforderungen hinaus gefordert.</p>'

            + '<h4>5.2.4 ISO/IEC 27005:2022 — Information Security Risk Management</h4>'
            + '<p>ISO/IEC 27005:2022 ergaenzt 27001 mit konkreten Methoden. Prozess (Klausel 6 ff.):</p>'
            + '<ol>'
            + '<li><strong>Risk Identification</strong> &mdash; <em>Asset-based</em> (Wert &rarr; Bedrohung &rarr; Schwachstelle) oder <em>Event-based</em> (Szenario-zentriert).</li>'
            + '<li><strong>Risk Analysis</strong> &mdash; Likelihood + Consequence &rarr; Risk Level. Qualitativ (Skala 1-5) oder quantitativ (FAIR, monetaer).</li>'
            + '<li><strong>Risk Evaluation</strong> &mdash; Vergleich gegen Risiko-Akzeptanzkriterien.</li>'
            + '<li><strong>Risk Treatment</strong> &mdash; vier Optionen: <em>Modify</em>, <em>Retain</em>, <em>Avoid</em>, <em>Share</em> (Transfer).</li>'
            + '<li><strong>Risk Acceptance</strong> &mdash; Restrisiko (Residual Risk) durch Risikoeigner formell akzeptiert.</li>'
            + '</ol>'
            + '<p>Risikobehandlung produziert den <em>Risk Treatment Plan</em>; der Abgleich mit Anhang A der 27001 produziert das <em>Statement of Applicability</em>.</p>'

            + '<h4>5.2.5 Mapping BSI IT-Grundschutz &harr; ISO/IEC 27001</h4>'
            + '<p>Eine ISO-27001-Zertifizierung auf Basis IT-Grundschutz (Standard-Absicherung) wird vom BSI angeboten. Wesentliche Unterschiede:</p>'
            + '<table><thead><tr><th>Aspekt</th><th>ISO 27001</th><th>BSI Grundschutz</th></tr></thead><tbody>'
            + '<tr><td>Granularitaet</td><td>generisch, Auswahl der Controls offen</td><td>konkrete Anforderungen je Baustein</td></tr>'
            + '<tr><td>Risikoansatz</td><td>frei waehlbar (qualitativ/quantitativ)</td><td>Schutzbedarf + Standard-Vorgehen, fuer hohen Schutzbedarf 200-3</td></tr>'
            + '<tr><td>Geltungsbereich</td><td>Organisations-Scope frei</td><td>Informationsverbund</td></tr>'
            + '<tr><td>Verbreitung</td><td>international</td><td>vor allem D-A-CH; KRITIS, Behoerden</td></tr>'
            + '</tbody></table>'

            + '<p class="text-xs text-slate-500"><em>Quellen: BSI-Standard 200-1 v1.0 / 200-2 v1.0 / 200-3 v1.0 (Okt. 2017) / 200-4 v1.0 (Apr. 2023, BCM); BSI IT-Grundschutz-Kompendium Edition 2024 (Feb. 2024); ISO/IEC 27005:2022-10; BSI-Zertifizierung "ISO 27001 auf Basis von IT-Grundschutz" — Zertifizierungsschema 2024.</em></p>'
    };

    const PAGE_RISK_REGULATIONS = {
        title: '5.3 EU-Regulatorik — NIS2, CRA und nationale Umsetzung',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Geltungsbereich und Fristen von NIS2 und CRA benennen, (2) Pflichten von Geschaeftsleitung und Hersteller einordnen, (3) Meldefristen bei Sicherheitsvorfaellen wiedergeben, (4) Ueberlapp und nationale Umsetzung in DE (KRITIS, IT-SiG 2.0) skizzieren.</blockquote>'

            + '<h4>5.3.1 NIS2-Richtlinie (EU) 2022/2555</h4>'
            + '<p>Die NIS2-Richtlinie ersetzt die NIS-Richtlinie 2016/1148. Wesentliche Eckdaten:</p>'
            + '<ul>'
            + '<li>Inkrafttreten: <strong>16. Januar 2023</strong>.</li>'
            + '<li>Frist nationale Umsetzung: <strong>17. Oktober 2024</strong>.</li>'
            + '<li>Richtlinie (nicht Verordnung) &mdash; Mitgliedstaaten muessen umsetzen (in DE: NIS-2-Umsetzungs- und Cybersicherheitsstaerkungsgesetz, NIS2UmsuCG, parlamentarisches Verfahren 2024-25).</li>'
            + '</ul>'
            + '<p>Geltungsbereich: <strong>18 Sektoren</strong>, geteilt in Anhang I (Sektoren mit hoher Kritikalitaet, z.B. Energie, Verkehr, Finanzen, Gesundheit, Wasser, digitale Infrastruktur, oeffentliche Verwaltung) und Anhang II (sonstige kritische Sektoren, z.B. Post, Abfall, Lebensmittel, Chemie, digitale Anbieter, Forschung).</p>'
            + '<p>Klassifizierung der Einrichtungen nach <strong>Groessen-Schwelle</strong> (Beschaeftigte, Umsatz):</p>'
            + '<table><thead><tr><th>Kategorie</th><th>Schwelle</th><th>Aufsicht</th></tr></thead><tbody>'
            + '<tr><td><strong>wesentlich</strong> (essential)</td><td>gross (&ge;250 MA oder &gt;50 Mio EUR Umsatz) oder bestimmte Anhang-I-Sektoren unabhaengig von Groesse</td><td>ex ante (proaktive Aufsicht)</td></tr>'
            + '<tr><td><strong>wichtig</strong> (important)</td><td>mittel (&ge;50 MA oder &gt;10 Mio EUR Umsatz) und kein wesentlicher Status</td><td>ex post (anlassbezogen)</td></tr>'
            + '</tbody></table>'

            + '<h4>5.3.2 NIS2 — Mindestmassnahmen (Art. 21)</h4>'
            + '<p>Pflicht zur Umsetzung "geeigneter und verhaeltnismaessiger" technischer und organisatorischer Massnahmen, mindestens:</p>'
            + '<ul>'
            + '<li>Risikoanalyse-Konzepte und ISMS-Politik</li>'
            + '<li>Vorfallbewaeltigung (Incident Response)</li>'
            + '<li>Geschaeftskontinuitaet (BCM, Backup-Management, Krisenmanagement)</li>'
            + '<li>Lieferketten-Sicherheit</li>'
            + '<li>Sicherheit in Beschaffung, Entwicklung und Wartung</li>'
            + '<li>Konzepte zur Bewertung der Wirksamkeit</li>'
            + '<li>Cyberhygiene und Schulungen</li>'
            + '<li>Kryptographie und Verschluesselung</li>'
            + '<li>Personalsicherheit, Zugriffskontrolle, Asset Management</li>'
            + '<li>Multi-Faktor-Authentisierung, sichere Sprach-/Video-/Text-Kommunikation</li>'
            + '</ul>'

            + '<h4>5.3.3 NIS2 — Meldepflichten (Art. 23)</h4>'
            + '<p>Bei <em>erheblichen Sicherheitsvorfaellen</em> (signifikant beeintraechtigender Vorfall) gelten gestufte Meldefristen an die nationale CSIRT/zustaendige Behoerde:</p>'
            + '<table><thead><tr><th>Frist</th><th>Inhalt</th></tr></thead><tbody>'
            + '<tr><td><strong>24 Stunden</strong></td><td>Fruehwarnung (early warning), Hinweise auf moegliche rechtswidrige/boesartige Verursachung oder grenzueberschreitende Wirkung</td></tr>'
            + '<tr><td><strong>72 Stunden</strong></td><td>Vorfallmeldung (incident notification) mit Erstbewertung, Schwere, Auswirkung, Indicators of Compromise</td></tr>'
            + '<tr><td><strong>spaetestens 1 Monat</strong></td><td>Abschlussbericht (final report)</td></tr>'
            + '</tbody></table>'
            + '<p>Bei Bedarf werden Zwischenstandsberichte angefordert. Geschaeftsleitungen haften gemaess Art. 20 persoenlich fuer Compliance und muessen in Cybersecurity geschult sein.</p>'

            + '<h4>5.3.4 Sanktionen unter NIS2 (Art. 34, Art. 36)</h4>'
            + '<p>Mitgliedstaaten muessen mindestens vorsehen:</p>'
            + '<ul>'
            + '<li><strong>Wesentliche</strong> Einrichtungen: Bussgeld bis <strong>10 Mio EUR</strong> oder <strong>2&nbsp;%</strong> des weltweiten Vorjahres-Jahresumsatzes (jeweils hoeherer Wert).</li>'
            + '<li><strong>Wichtige</strong> Einrichtungen: Bussgeld bis <strong>7 Mio EUR</strong> oder <strong>1{,}4&nbsp;%</strong> des weltweiten Vorjahres-Jahresumsatzes.</li>'
            + '<li>Persoenliche Haftung der Geschaeftsleitung; Moeglichkeit der voruebergehenden Untersagung der Geschaeftsfuehrung.</li>'
            + '</ul>'

            + '<h4>5.3.5 Cyber Resilience Act — VO (EU) 2024/2847 (CRA)</h4>'
            + '<p>Verordnung (direkte Geltung, keine Umsetzung noetig). Eckdaten:</p>'
            + '<ul>'
            + '<li>Veroeffentlichung im Amtsblatt: <strong>20. November 2024</strong>.</li>'
            + '<li>Geltung der Hauptpflichten: <strong>11. Dezember 2027</strong> (36 Monate nach Inkrafttreten).</li>'
            + '<li>Meldepflichten fuer aktiv ausgenutzte Schwachstellen: ab <strong>11. September 2026</strong>.</li>'
            + '</ul>'
            + '<p>Geltungsbereich: <em>Produkte mit digitalen Elementen (PDE)</em>, also Software- und Hardware-Produkte, deren bestimmungsgemaesse Verwendung eine direkte oder indirekte Datenverbindung umfasst.</p>'
            + '<p>Drei Risikoklassen:</p>'
            + '<table><thead><tr><th>Klasse</th><th>Konformitaet</th><th>Beispiele</th></tr></thead><tbody>'
            + '<tr><td>Default (nicht-kritisch)</td><td>Selbstbewertung</td><td>Mehrheit der Smart-Home-Produkte</td></tr>'
            + '<tr><td>Wichtige PDE Klasse I</td><td>Selbstbewertung mit harmonisierten Normen oder Notified Body</td><td>Passwort-Manager, Netzwerk-Mgmt-Tools, Boot-Manager</td></tr>'
            + '<tr><td>Wichtige PDE Klasse II</td><td>Notified Body verpflichtend</td><td>Hypervisoren, Firewalls, HSMs, Smart Cards mit Sicherheitsfunktion</td></tr>'
            + '<tr><td>Kritische PDE</td><td>Europaeisches Cybersicherheitszertifizierungsschema (z.B. EUCC) auf Stufe "high"</td><td>delegierter Rechtsakt der Kommission</td></tr>'
            + '</tbody></table>'
            + '<p><strong>Art. 13</strong> definiert die Pflichten der Hersteller: Cybersicherheit "by design and by default", Vulnerability Management ueber den gesamten <em>Support Period</em> (mindestens 5 Jahre, sofern Lebensdauer kuerzer entsprechend), kostenlose Sicherheits-Updates, technische Dokumentation, Konformitaetsbewertung, CE-Kennzeichnung, SBOM-Pflege.</p>'
            + '<p><strong>Art. 14</strong> enthaelt die Meldepflichten: aktiv ausgenutzte Schwachstellen <strong>innerhalb 24 h</strong> als Frueh-Hinweis an ENISA und nationale CSIRT, <strong>72 h</strong>-Vorfallmeldung, Abschlussbericht innerhalb 14 Tage nach Bereitstellung der Sicherheitsmassnahme.</p>'

            + '<h4>5.3.6 Nationale Umsetzung in Deutschland</h4>'
            + '<ul>'
            + '<li><strong>BSI-Gesetz (BSIG)</strong> i.V.m. <strong>BSI-Kritisverordnung (BSI-KritisV)</strong> regelt KRITIS-Betreiber.</li>'
            + '<li><strong>IT-Sicherheitsgesetz 2.0 (IT-SiG 2.0, 2021)</strong> erweitert auf "Unternehmen im besonderen oeffentlichen Interesse" (UBI).</li>'
            + '<li><strong>NIS2UmsuCG</strong>: Umsetzungsgesetz NIS2 in DE (Stand Mai 2025: parlamentarisches Verfahren noch nicht abgeschlossen, Frist 17.10.2024 wurde national verfehlt; EU-Vertragsverletzungsverfahren laufen).</li>'
            + '<li>KRITIS-Sektoren in DE: Energie, Wasser, Ernaehrung, IT/TK, Gesundheit, Finanz/Versicherung, Transport/Verkehr, Siedlungsabfallentsorgung, Staat/Verwaltung, Medien/Kultur (KritisDachG-Entwurf 2024).</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Richtlinie (EU) 2022/2555 (NIS2, ABl. L 333 vom 27.12.2022); Verordnung (EU) 2024/2847 (CRA, ABl. L vom 20.11.2024); BSI-Gesetz; BSI-KritisV (2021); IT-SiG 2.0 (Bundesgesetzblatt 2021 Teil I Nr. 25); ENISA Threat Landscape 2024; ENISA NIS2 Implementing Acts (Sektor-Schwellenwerte, 2024).</em></p>'
    };

    const PAGE_RISK_SCORING = {
        title: '5.4 Risiko-Bewertung — CVSS v4.0, EPSS, KEV, FAIR, OCTAVE Allegro',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) den Aufbau von CVSS v4.0 erklaeren und gegen v3.1 abgrenzen, (2) EPSS und KEV als komplementaere Datenquellen einordnen, (3) den FAIR-Faktor-Baum aufstellen, (4) OCTAVE Allegro als asset-zentrierte Methode beschreiben, (5) ISO 31000:2018 Prinzipien wiedergeben.</blockquote>'

            + '<h4>5.4.1 CVSS v4.0 (FIRST, November 2023)</h4>'
            + '<p>Common Vulnerability Scoring System v4.0 ersetzt v3.1 (Juni 2019). Vier Metric-Gruppen:</p>'
            + '<table><thead><tr><th>Gruppe</th><th>Inhalt</th><th>Pflicht?</th></tr></thead><tbody>'
            + '<tr><td><strong>Base</strong></td><td>technische Eigenschaften der Schwachstelle, zeitlich invariant</td><td>ja</td></tr>'
            + '<tr><td><strong>Threat</strong></td><td>aktuelle Exploit-Verfuegbarkeit (Exploit Maturity)</td><td>optional</td></tr>'
            + '<tr><td><strong>Environmental</strong></td><td>organisations-spezifische Anpassung (Asset-Wert, kompensierende Controls)</td><td>optional</td></tr>'
            + '<tr><td><strong>Supplemental</strong></td><td>Zusatz-Information (Safety, Recovery, Provider Urgency, Automatable, ...) — beeinflusst <em>nicht</em> den Score</td><td>optional</td></tr>'
            + '</tbody></table>'
            + '<p>Score-Varianten: <strong>CVSS-B</strong> (nur Base), <strong>CVSS-BT</strong> (Base+Threat), <strong>CVSS-BE</strong> (Base+Environmental), <strong>CVSS-BTE</strong> (alle drei). Empfehlung von FIRST: <em>nicht</em> nur den Base-Score zur Priorisierung verwenden.</p>'
            + '<p>Wichtige Aenderungen zu v3.1:</p>'
            + '<ul>'
            + '<li>Neue Base-Metrik <strong>Attack Requirements (AT)</strong> ergaenzt Attack Complexity (AC).</li>'
            + '<li>Aufspaltung von Impact in <strong>Vulnerable System Impact (VC/VI/VA)</strong> und <strong>Subsequent System Impact (SC/SI/SA)</strong>.</li>'
            + '<li><strong>User Interaction (UI)</strong> mit feinerer Skala: None, Passive, Active.</li>'
            + '<li><em>Scope</em> als Metrik entfaellt (durch VI/VA ↔ SI/SA-Trennung modelliert).</li>'
            + '<li><em>Temporal</em>-Gruppe in <strong>Threat</strong> umbenannt; Remediation Level und Report Confidence entfallen.</li>'
            + '</ul>'
            + '<p>Severity-Bands wie in v3.1 unveraendert: 0.0 None, 0.1-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical.</p>'

            + '<h4>5.4.2 EPSS — Exploit Prediction Scoring System</h4>'
            + '<p>FIRST EPSS Special Interest Group; aktuelles Modell <strong>v3</strong> (2023). EPSS liefert pro CVE eine Wahrscheinlichkeit zwischen 0 und 1, dass die Schwachstelle <strong>innerhalb der naechsten 30 Tage in freier Wildbahn ausgenutzt</strong> wird. Datenquellen: NVD, GreyNoise, AlienVault OTX, Honeypots, Exploit-DBs, Twitter/X-Mentions, GitHub-Trends. Modell: Gradient-Boosted-Trees mit zeitlich gewichteten Features. EPSS-Score und CVSS sind <strong>nicht redundant</strong>: CVSS misst Schwere, EPSS misst Wahrscheinlichkeit.</p>'

            + '<h4>5.4.3 CISA KEV-Katalog</h4>'
            + '<p>Cybersecurity and Infrastructure Security Agency (CISA, USA) pflegt seit November 2021 den <strong>Known Exploited Vulnerabilities Catalog</strong>. Aufnahmekriterien: (1) zugewiesene CVE, (2) glaubwuerdige Belege fuer aktive Ausnutzung, (3) klare Mitigation (Patch, Workaround). Grundlage ist <strong>Binding Operational Directive (BOD) 22-01</strong>: US-Bundesbehoerden muessen KEV-gelistete CVEs binnen vorgegebener Fristen patchen. KEV ergaenzt EPSS um Felddaten zu <em>tatsaechlich</em> ausgenutzten Schwachstellen.</p>'
            + '<p>Empfohlene Triage-Logik (CISA "Stakeholder-Specific Vulnerability Categorization", SSVC): Entscheidung anhand von <em>Exploitation Status</em>, <em>Technical Impact</em>, <em>Automatable</em>, <em>Mission Prevalence</em>.</p>'

            + '<h4>5.4.4 FAIR — Factor Analysis of Information Risk</h4>'
            + '<p>Open Group "Open FAIR Body of Knowledge" (Edition 2024) standardisiert die quantitative, monetaere Risikoanalyse. Grundgleichung:</p>'
            + '<p><strong>Risk = Loss Event Frequency (LEF) &times; Loss Magnitude (LM)</strong></p>'
            + '<p>Faktor-Baum (verkuerzt):</p>'
            + '<ul>'
            + '<li><em>LEF</em> &larr; Threat Event Frequency (TEF) &times; Vulnerability (Vuln)</li>'
            + '<li><em>TEF</em> &larr; Contact Frequency &times; Probability of Action</li>'
            + '<li><em>Vuln</em> &larr; Threat Capability vs. Resistance Strength</li>'
            + '<li><em>LM</em> &larr; Primary Loss + Secondary Loss (Productivity, Response, Replacement, Fines &amp; Judgments, Competitive Advantage, Reputation)</li>'
            + '</ul>'
            + '<p>FAIR liefert Verteilungen (Min, Most-Likely, Max), die ueber <strong>Monte-Carlo-Simulation</strong> aggregiert werden &mdash; Output: Loss-Exceedance-Curve in Geldeinheiten.</p>'

            + '<h4>5.4.5 OCTAVE Allegro</h4>'
            + '<p>Caralli, Stevens, Young, Wilson, CMU/SEI-2007-TR-012 (2007). Eine schlanke, asset-zentrierte, qualitative Methode, die in 8 Schritten 4 Phasen abdeckt:</p>'
            + '<ol>'
            + '<li>Risikomesskriterien aufstellen (Reputation, Finanz, Produktivitaet, Sicherheit, Recht).</li>'
            + '<li>Informations-Assets profilieren.</li>'
            + '<li>Information Asset Container identifizieren (technical, physical, people).</li>'
            + '<li>Bedrohungs-Szenarien (Areas of Concern) entwickeln.</li>'
            + '<li>Bedrohungs-Baum verfeinern.</li>'
            + '<li>Risiken identifizieren.</li>'
            + '<li>Risiken analysieren (Impact-Bewertung gegen Risikomesskriterien).</li>'
            + '<li>Mitigation auswaehlen (Mitigate, Defer, Accept, Transfer).</li>'
            + '</ol>'
            + '<p>Im Vergleich: <em>FAIR</em> ist quantitativ-monetaer und eignet sich fuer Top-Management-Berichte; <em>OCTAVE Allegro</em> ist qualitativ und eignet sich fuer KMU sowie als Workshop-Format.</p>'

            + '<h4>5.4.6 ISO 31000:2018 — Risk Management Principles</h4>'
            + '<p>Generische Risikomanagement-Norm (kein zertifizierungsfaehiges Managementsystem). Kernaussagen:</p>'
            + '<ul>'
            + '<li><strong>Acht Prinzipien</strong>: Integrated, Structured and comprehensive, Customized, Inclusive, Dynamic, Best available information, Human and cultural factors, Continual improvement.</li>'
            + '<li><strong>Framework</strong>: Leadership and commitment, Integration, Design, Implementation, Evaluation, Improvement.</li>'
            + '<li><strong>Process</strong>: Communication and consultation, Scope/Context/Criteria, Risk assessment (Identification &rarr; Analysis &rarr; Evaluation), Risk treatment, Monitoring and review, Recording and reporting.</li>'
            + '</ul>'
            + '<p>ISO 31000 ist die methodische Klammer; <strong>ISO/IEC 27005:2022</strong> ist die fachliche Konkretisierung fuer Informations-Sicherheit; <strong>IEC 31010:2019</strong> liefert Methoden-Katalog (Bow-Tie, FMEA, HAZOP, Monte Carlo, Delphi, ...).</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: FIRST CVSS v4.0 Specification (Nov. 2023); FIRST CVSS v3.1 (Jun. 2019); FIRST EPSS Model v3 (2023); CISA Binding Operational Directive 22-01 (3.11.2021) und KEV-Katalog (laufend); CISA SSVC Decision Tree (2022); Open Group "Open FAIR Body of Knowledge" Ed. 2024 (Standards O-RT, O-RA); Caralli et al. CMU/SEI-2007-TR-012 (OCTAVE Allegro); ISO 31000:2018; IEC 31010:2019.</em></p>'
    };

    const QUIZ_RISK = [
        // -- ISO/IEC 27001:2022 (10) --
        q('Wie viele Controls enthaelt der Anhang A der ISO/IEC 27001:2022?',
            ['93', '114', '133', '88'], 0,
            'ISO/IEC 27001:2022 Anhang A bzw. ISO/IEC 27002:2022: 93 Controls — Reduktion gegenueber 114 in der 2013er-Fassung durch Konsolidierung.'),
        q('In welche vier Themengruppen sind die Controls in ISO/IEC 27002:2022 unterteilt?',
            ['Organizational, People, Physical, Technological',
             'Preventive, Detective, Corrective, Recovery',
             'Identify, Protect, Detect, Respond',
             'Confidentiality, Integrity, Availability, Authenticity'], 0,
            'ISO/IEC 27002:2022 §5-§8: A.5 Organizational (37), A.6 People (8), A.7 Physical (14), A.8 Technological (34).'),
        q('Welches Dokument der ISO 27001 listet alle Anhang-A-Controls inkl. Begruendung der Auswahl bzw. Ausschluesse?',
            ['Statement of Applicability (SoA)',
             'Risk Treatment Plan',
             'Risk Register',
             'Information Security Policy'], 0,
            'ISO/IEC 27001:2022 Klausel 6.1.3 d): SoA dokumentiert Anwendbarkeit, Begruendung und Implementationsstatus jedes Annex-A-Controls.'),
        q('Welcher der folgenden Controls ist in der 2022er-Fassung NEU?',
            ['A.5.7 Threat intelligence',
             'A.5.1 Information security policies',
             'A.6.1 Screening',
             'A.8.1 User end point devices'], 0,
            'ISO/IEC 27002:2022 fuehrt 11 neue Controls ein, u.a. A.5.7 Threat intelligence und A.8.28 Secure coding.'),
        q('Wie viele Attribute ordnet ISO/IEC 27002:2022 jedem Control zu?',
            ['Fuenf (Control type, IS properties, Cybersecurity concepts, Operational capabilities, Security domains)',
             'Drei (CIA)',
             'Vier (Plan, Do, Check, Act)',
             'Zwei (Pflicht, Optional)'], 0,
            'ISO/IEC 27002:2022 §4.2: jedes Control hat fuenf Attribute zur flexiblen Filterung/Sicht.'),
        q('Welche der folgenden ist KEINE der vier Risikobehandlungs-Optionen nach ISO/IEC 27001:2022 / 27005:2022?',
            ['Ignore', 'Modify (Mitigate)', 'Retain (Accept)', 'Avoid'], 0,
            'ISO 27005:2022 §10: Modify, Retain, Avoid, Share. "Ignore" ist keine zulaessige Option — Risiken muessen formell behandelt oder akzeptiert werden.'),
        q('Welche Pflicht-Klauseln muss eine ISO-27001:2022-konforme Organisation umsetzen?',
            ['4 bis 10', '1 bis 10', '5 bis 12', 'nur Anhang A'], 0,
            'ISO/IEC 27001:2022 Klauseln 4-10 sind verbindlich; Klauseln 1-3 sind Einleitung/Normverweise/Begriffe.'),
        q('Wer ist nach ISO 27001 verpflichtet, das Restrisiko (residual risk) formell zu akzeptieren?',
            ['Risk Owner (Risikoeigner)',
             'Auditor',
             'IT-Administrator',
             'Datenschutzbeauftragter'], 0,
            'ISO/IEC 27001:2022 Klausel 6.1.3 f) und 8.3: Genehmigung des Risikobehandlungs-Plans und Akzeptanz des Restrisikos durch den Risikoeigner.'),
        q('Bis wann mussten zertifizierte Organisationen ihre Zertifizierung von ISO/IEC 27001:2013 auf 27001:2022 migrieren?',
            ['31. Oktober 2025', '31. Dezember 2024', '17. Oktober 2024', 'Sofort (15. Oktober 2022)'], 0,
            'IAF MD 26 Issue 4: drei-Jahres-Transition, Stichtag 31.10.2025.'),
        q('Welche der folgenden ist KEINE Pflicht-Eingabe in das Management Review nach ISO 27001:2022 Klausel 9.3.2?',
            ['Anzahl der entwickelten Source-Code-Zeilen',
             'Status frueherer Massnahmen',
             'Audit-Ergebnisse',
             'Erfuellung der IS-Ziele'], 0,
            'Klausel 9.3.2 listet u.a. Massnahmen-Status, externe/interne Aenderungen, Stakeholder-Feedback, Risiko-Ergebnisse, IS-Ziel-Erfuellung, Auditergebnisse — Codezeilen sind nicht relevant.'),

        // -- BSI IT-Grundschutz (8) --
        q('Welcher BSI-Standard beschreibt die IT-Grundschutz-Methodik mit den drei Vorgehensweisen Basis/Standard/Kern-Absicherung?',
            ['BSI 200-2', 'BSI 200-1', 'BSI 200-3', 'BSI 200-4'], 0,
            'BSI-Standard 200-2 (IT-Grundschutz-Methodik) definiert die drei Vorgehensweisen.'),
        q('Welcher BSI-Standard liefert die vereinfachte Risikoanalyse fuer Schutzbedarf "hoch" oder "sehr hoch"?',
            ['BSI 200-3', 'BSI 200-1', 'BSI 200-2', 'BSI 200-4'], 0,
            'BSI-Standard 200-3 (Risikoanalyse auf Basis IT-Grundschutz) wird ueber die Standard-Anforderungen hinaus aktiviert, wenn Schutzbedarf hoch/sehr hoch ist.'),
        q('Welcher BSI-Standard adressiert Business Continuity Management und ersetzt BSI 100-4?',
            ['BSI 200-4 (2023)', 'BSI 200-1', 'BSI 200-2', 'BSI 100-3'], 0,
            'BSI-Standard 200-4 BCM (April 2023, kompatibel zu ISO 22301) ersetzt 100-4 von 2009.'),
        q('Wie viele Schutzbedarfskategorien definiert die BSI-Schutzbedarfsfeststellung?',
            ['Drei (normal, hoch, sehr hoch)',
             'Vier (gering, normal, hoch, sehr hoch)',
             'Fuenf (1-5)',
             'Zwei (kritisch, nicht-kritisch)'], 0,
            'BSI-Standard 200-2: drei Kategorien je Schutzziel — normal, hoch, sehr hoch.'),
        q('Welcher Vererbungseffekt liegt vor, wenn der Schutzbedarf eines Servers hoeher ausfaellt, weil viele normal-schutzbeduerftige Anwendungen auf ihm laufen?',
            ['Kumulationseffekt',
             'Maximumprinzip',
             'Verteilungseffekt',
             'Aggregationsprivileg'], 0,
            'BSI 200-2: Kumulationseffekt — Akkumulation vieler "normaler" Werte ergibt insgesamt einen hoeheren Schutzbedarf.'),
        q('Welche Bausteinschicht des IT-Grundschutz-Kompendiums adressiert industrielle IT (OT)?',
            ['IND', 'SYS', 'NET', 'INF'], 0,
            'IT-Grundschutz-Kompendium Edition 2024: Schicht IND (industrielle IT) bildet OT-spezifische Anforderungen ab, oft im Verbund mit IEC 62443.'),
        q('Auf welcher Bausteinschicht liegen Anforderungen an Anwendungen?',
            ['APP', 'SYS', 'OPS', 'CON'], 0,
            'Schichten: ISMS, ORP, CON, OPS, DER, APP (Anwendungen), SYS (IT-Systeme), IND, NET, INF.'),
        q('Welche Aussage zum Verhaeltnis BSI Grundschutz und ISO 27001 ist korrekt?',
            ['Eine Zertifizierung "ISO 27001 auf Basis IT-Grundschutz" ist beim BSI moeglich',
             'BSI Grundschutz ersetzt ISO 27001 international',
             'BSI Grundschutz ist mit ISO 27001 inkompatibel',
             'ISO 27001 ist eine Untermenge von BSI Grundschutz'], 0,
            'BSI bietet das Zertifizierungsschema "ISO 27001 auf Basis IT-Grundschutz" — Standard-Absicherung erfuellt 27001-Anforderungen.'),

        // -- ISO/IEC 27005:2022 (5) --
        q('Welche Reihenfolge gibt ISO/IEC 27005:2022 fuer die Risikoeinschaetzung vor?',
            ['Risk Identification → Risk Analysis → Risk Evaluation',
             'Risk Treatment → Risk Identification → Risk Acceptance',
             'Risk Avoidance → Risk Mitigation → Risk Acceptance',
             'PDCA → Audit → Review'], 0,
            'ISO/IEC 27005:2022 §7-§9: Identification, Analysis, Evaluation als drei aufeinanderfolgende Schritte.'),
        q('Was ist nach ISO 27005:2022 der Unterschied zwischen "asset-based" und "event-based" Risk Identification?',
            ['Asset-based: Werte→Bedrohungen→Schwachstellen; Event-based: Szenarien zentral',
             'Asset-based: nur quantitativ; Event-based: nur qualitativ',
             'Asset-based: nur fuer KMU; Event-based: nur fuer Konzerne',
             'Asset-based: nur Hardware; Event-based: nur Software'], 0,
            'ISO/IEC 27005:2022 §7.2: zwei zulaessige Ansaetze, mischbar; "asset-based" startet bei Werten, "event-based" bei Szenarien/Ereignissen.'),
        q('Welche Methode ist KEINE explizite Risikobehandlungs-Option nach ISO 27005:2022?',
            ['Outsourcing der Verantwortung an den Anwender',
             'Modify (Mitigate)',
             'Avoid (Vermeiden)',
             'Share (Transfer/Versicherung)'], 0,
            'ISO 27005:2022 §10: Modify, Retain, Avoid, Share — Verantwortung kann nicht an den Endnutzer abgewaelzt werden.'),
        q('Wie wird das Risiko-Niveau in einer qualitativen Analyse typischerweise gebildet?',
            ['Likelihood × Consequence (z.B. Skalen 1-5)',
             'Asset-Wert × Anzahl Mitarbeiter',
             'CVSS × EPSS',
             'CVE-Nummer modulo 100'], 0,
            'ISO 27005:2022 §8: Likelihood und Consequence werden zu einem Risk-Level kombiniert (Matrix oder Multiplikation).'),
        q('Was bezeichnet ISO 27005:2022 als "Residual Risk"?',
            ['Das nach Risikobehandlung verbleibende Risiko',
             'Das urspruengliche Brutto-Risiko',
             'Risiken, die ignoriert werden duerfen',
             'Risiken aus alten Risikoregistern'], 0,
            'Residual Risk = Restrisiko nach Anwendung der Risikobehandlungs-Massnahmen; muss vom Risikoeigner akzeptiert werden.'),

        // -- ISO 31000:2018 (3) --
        q('Wie viele Prinzipien definiert ISO 31000:2018 fuer das Risikomanagement?',
            ['Acht', 'Sechs', 'Zehn', 'Zwoelf'], 0,
            'ISO 31000:2018 §4: acht Prinzipien (Integrated, Structured and comprehensive, Customized, Inclusive, Dynamic, Best available information, Human and cultural factors, Continual improvement).'),
        q('Welche Norm ist NICHT zertifizierungsfaehig (kein Managementsystem-Standard)?',
            ['ISO 31000:2018', 'ISO/IEC 27001:2022', 'ISO 22301:2019', 'ISO 9001:2015'], 0,
            'ISO 31000 gibt Leitlinien (Guidelines) und ist explizit nicht zertifizierungsfaehig — anders als 27001/22301/9001.'),
        q('Welche Norm liefert einen Methoden-Katalog (Bow-Tie, FMEA, HAZOP, Monte Carlo, Delphi, ...) als Ergaenzung zu ISO 31000?',
            ['IEC 31010:2019', 'ISO/IEC 27005:2022', 'ISO 22301:2019', 'ISO 19011:2018'], 0,
            'IEC 31010:2019 "Risk management — Risk assessment techniques" liefert den Methoden-Werkzeugkasten.'),

        // -- NIS2 (EU 2022/2555) (8) --
        q('Bis wann mussten die EU-Mitgliedstaaten die NIS2-Richtlinie in nationales Recht umsetzen?',
            ['17. Oktober 2024', '16. Januar 2023', '01. Januar 2025', '11. Dezember 2027'], 0,
            'Richtlinie (EU) 2022/2555 Art. 41: Umsetzungsfrist 17.10.2024.'),
        q('Welche Klassen von Einrichtungen unterscheidet NIS2?',
            ['Wesentliche (essential) und wichtige (important)',
             'Kritische und nicht-kritische',
             'Anhang I, II und III',
             'Klein, mittel, gross'], 0,
            'NIS2 Art. 3: zwei Kategorien — wesentliche (Annex I + Groesse, oder unabhaengig von Groesse fuer ausgewaehlte Sektoren) und wichtige Einrichtungen.'),
        q('Wie viele Sektoren erfasst NIS2 insgesamt (Anhang I + Anhang II)?',
            ['18', '7', '11', '25'], 0,
            'NIS2 Anhang I (Sektoren mit hoher Kritikalitaet) + Anhang II (sonstige kritische Sektoren) = 18 Sektoren.'),
        q('Welche Frist gilt nach NIS2 Art. 23 fuer die Fruehwarnung (early warning) bei einem erheblichen Sicherheitsvorfall?',
            ['24 Stunden', '72 Stunden', '1 Monat', '6 Stunden'], 0,
            'Art. 23 Abs. 4 a): Fruehwarnung "unverzueglich, in jedem Fall innerhalb von 24 Stunden".'),
        q('Welche Frist gilt nach NIS2 fuer die eigentliche Vorfallmeldung (incident notification) mit Erstbewertung?',
            ['72 Stunden', '24 Stunden', '7 Tage', '14 Tage'], 0,
            'Art. 23 Abs. 4 b): Vorfallmeldung "unverzueglich und in jedem Fall innerhalb von 72 Stunden".'),
        q('Welcher Hoechstbetrag fuer Bussgelder gilt nach NIS2 Art. 34 fuer wesentliche Einrichtungen?',
            ['10 Mio EUR oder 2&nbsp;% des weltweiten Vorjahresumsatzes',
             '20 Mio EUR oder 4&nbsp;% des weltweiten Vorjahresumsatzes',
             '5 Mio EUR fest',
             '500.000 EUR fest'], 0,
            'NIS2 Art. 34 Abs. 4: max(10 Mio EUR, 2&nbsp;% des weltweiten Vorjahresumsatzes) — der hoehere Wert.'),
        q('Welche Massnahme ist NICHT explizit in NIS2 Art. 21 als Mindestmassnahme genannt?',
            ['Werbeanzeigen-Sperre fuer Mitarbeiter',
             'Risikoanalyse-Konzepte und ISMS-Politik',
             'Multi-Faktor-Authentisierung',
             'Lieferketten-Sicherheit'], 0,
            'Art. 21 Abs. 2 zaehlt 10 Mindestmassnahmen auf; Werbeanzeigen-Sperre gehoert nicht dazu.'),
        q('Wer haftet nach NIS2 Art. 20 persoenlich fuer die Compliance der Einrichtung?',
            ['Mitglieder der Geschaeftsleitung (management body)',
             'Datenschutzbeauftragter',
             'Externe Berater',
             'Compliance-Officer ohne Vertretungsmacht'], 0,
            'Art. 20: Geschaeftsleitung muss Risikomassnahmen genehmigen, Umsetzung ueberwachen, persoenlich haften und Schulungen absolvieren.'),

        // -- CRA (EU 2024/2847) (5) --
        q('Welche Art von Rechtsakt ist der EU Cyber Resilience Act?',
            ['Verordnung (direkt geltend)',
             'Richtlinie (umsetzungspflichtig)',
             'Empfehlung (unverbindlich)',
             'Beschluss (Einzelfall)'], 0,
            'VO (EU) 2024/2847 ist eine Verordnung — direkte Geltung ohne nationale Umsetzung.'),
        q('Wann gelten die Hauptpflichten des CRA fuer Hersteller von Produkten mit digitalen Elementen?',
            ['Ab 11. Dezember 2027',
             'Sofort ab Veroeffentlichung 20.11.2024',
             'Ab 17. Oktober 2024',
             'Ab 11. September 2026'], 0,
            'CRA Art. 71: Hauptpflichten 36 Monate nach Inkrafttreten — 11.12.2027.'),
        q('Innerhalb welcher Frist muss ein Hersteller nach CRA Art. 14 eine aktiv ausgenutzte Schwachstelle als Frueh-Hinweis an ENISA und CSIRT melden?',
            ['24 Stunden',
             '72 Stunden',
             '7 Tage',
             '30 Tage'], 0,
            'CRA Art. 14: Frueh-Hinweis innerhalb 24 h, Vorfallmeldung 72 h, Abschlussbericht 14 Tage nach Bereitstellung der Massnahme.'),
        q('Welche Pflicht gehoert zu Art. 13 CRA (Pflichten der Hersteller)?',
            ['Cybersicherheit "by design and by default" inkl. Vulnerability Management ueber den gesamten Support Period',
             'CE-Kennzeichnung verboten',
             'Keine Pflicht zur Bereitstellung von Sicherheitsupdates',
             'Quellcode-Veroeffentlichung verpflichtend'], 0,
            'Art. 13 CRA: Security-by-design, Vuln-Management ueber den Support Period (typisch &ge;5 Jahre), kostenlose Sicherheits-Updates, technische Doku, SBOM.'),
        q('Welche Konformitaetsbewertung gilt fuer "Wichtige PDE Klasse II" nach CRA?',
            ['Notified Body verpflichtend',
             'Selbstbewertung ohne harmonisierte Norm',
             'Nur freiwillig',
             'EU-Cybersicherheitszertifizierung Stufe "high" verpflichtend'], 0,
            'CRA Anhang III/IV: Klasse II (Hypervisoren, Firewalls, HSMs) erfordert verpflichtend einen Notified Body.'),

        // -- CVSS v4.0 (5) --
        q('Wann hat FIRST CVSS v4.0 veroeffentlicht?',
            ['November 2023', 'Juni 2019', 'Maerz 2024', 'Dezember 2021'], 0,
            'FIRST CVSS v4.0 Specification: Veroeffentlichung 1. November 2023; loest schrittweise v3.1 (Juni 2019) ab.'),
        q('Welche Metric-Gruppen unterscheidet CVSS v4.0?',
            ['Base, Threat, Environmental, Supplemental',
             'Base, Temporal, Environmental',
             'Base, Threat, Supplemental',
             'Exploitability, Impact, Scope'], 0,
            'CVSS v4.0: vier Gruppen — die Temporal-Gruppe wurde in "Threat" umbenannt und um "Supplemental" ergaenzt.'),
        q('Welche Base-Metric ist NEU in CVSS v4.0 gegenueber v3.1?',
            ['Attack Requirements (AT)',
             'Attack Vector (AV)',
             'Privileges Required (PR)',
             'Confidentiality Impact (C)'], 0,
            'CVSS v4.0 fuehrt "Attack Requirements (AT)" ergaenzend zu "Attack Complexity (AC)" ein.'),
        q('Welche Aussage zur Scope-Metrik in CVSS v4.0 ist korrekt?',
            ['Sie wurde entfernt; stattdessen unterscheidet v4.0 Vulnerable System Impact (VC/VI/VA) und Subsequent System Impact (SC/SI/SA)',
             'Sie ist Pflicht und ersetzt Attack Vector',
             'Sie wurde umbenannt in "Severity"',
             'Sie kann zwischen 0 und 10 liegen'], 0,
            'CVSS v4.0: Scope entfaellt; Impact-Trennung in Vulnerable System (VC/VI/VA) und Subsequent System (SC/SI/SA) modelliert das ehemalige Scope-Konzept.'),
        q('Welche Score-Variante kombiniert Base + Threat + Environmental?',
            ['CVSS-BTE',
             'CVSS-B',
             'CVSS-BT',
             'CVSS-S'], 0,
            'Notation der CVSS-v4.0-Spec: B (nur Base), BT (Base+Threat), BE (Base+Env.), BTE (alle drei).'),

        // -- EPSS und KEV (3) --
        q('Was misst der EPSS-Score?',
            ['Wahrscheinlichkeit, dass eine CVE in den naechsten 30 Tagen in freier Wildbahn ausgenutzt wird',
             'Schwere einer Schwachstelle',
             'Anzahl der betroffenen Systeme weltweit',
             'CVSS-Score normiert auf 0-1'], 0,
            'FIRST EPSS Model v3 (2023): Wahrscheinlichkeit der Ausnutzung in den naechsten 30 Tagen, basierend auf u.a. NVD, GreyNoise, Honeypot- und Mention-Daten.'),
        q('Welche Behoerde pflegt den Known Exploited Vulnerabilities Catalog?',
            ['CISA (USA)', 'ENISA (EU)', 'BSI (DE)', 'NIST'], 0,
            'CISA pflegt den KEV-Katalog seit November 2021 (BOD 22-01).'),
        q('Welche Aussage beschreibt die Komplementaritaet von CVSS, EPSS und KEV korrekt?',
            ['CVSS misst Schwere, EPSS Wahrscheinlichkeit, KEV liefert Felddaten zu tatsaechlich ausgenutzten Schwachstellen',
             'Alle drei messen dasselbe (Schwere)',
             'KEV ist nur eine Untermenge des EPSS',
             'CVSS ersetzt EPSS und KEV'], 0,
            'Standard-Triage-Logik: CVSS = Schweregrad; EPSS = Wahrscheinlichkeit; KEV = Beleg fuer aktive Ausnutzung.'),

        // -- FAIR und OCTAVE Allegro (3) --
        q('Welche Grundgleichung verwendet FAIR fuer das Risiko?',
            ['Risk = Loss Event Frequency × Loss Magnitude',
             'Risk = Threat × Asset Value',
             'Risk = CVSS × EPSS',
             'Risk = Likelihood + Consequence'], 0,
            'Open FAIR Body of Knowledge (Open Group, Edition 2024): Risk = LEF × LM.'),
        q('Welche Methode wird typischerweise zur Aggregation der FAIR-Verteilungen verwendet?',
            ['Monte-Carlo-Simulation',
             'Lineare Regression',
             'Closed-Form-Loesung',
             'Genetic Algorithms'], 0,
            'FAIR liefert Min/ML/Max-Verteilungen, die ueber Monte-Carlo-Simulation zur Loss-Exceedance-Curve aggregiert werden.'),
        q('Welche Charakterisierung trifft auf OCTAVE Allegro zu?',
            ['Asset-zentriert, qualitativ, 8 Schritte (CMU/SEI 2007)',
             'Quantitativ-monetaer mit Monte-Carlo (CMU/SEI 2007)',
             'Bedrohungs-zentriert, basiert auf MITRE ATT&CK',
             'Compliance-Methode fuer ISO 27001 (BSI 2017)'], 0,
            'Caralli et al. CMU/SEI-2007-TR-012: OCTAVE Allegro ist asset-zentriert, qualitativ, 8 Schritte in 4 Phasen.')
    ];

    // ----------------------------------------------------------------------
    // Kapitel 6 — AI-Security und vertrauenswuerdige Systeme (PRODUKTIV)
    // Quellen: Goodfellow/Shlens/Szegedy "Explaining and Harnessing Adversarial
    // Examples" ICLR 2015 (FGSM); Madry et al. "Towards Deep Learning Models
    // Resistant to Adversarial Attacks" ICLR 2018 (PGD, Adversarial Training);
    // Carlini & Wagner "Towards Evaluating the Robustness of Neural Networks"
    // IEEE S&P 2017 (C&W); Szegedy et al. "Intriguing properties of neural
    // networks" ICLR 2014 (L-BFGS); Cohen/Rosenfeld/Kolter "Certified Adversarial
    // Robustness via Randomized Smoothing" ICML 2019; Shokri et al. "Membership
    // Inference Attacks against Machine Learning Models" IEEE S&P 2017;
    // Fredrikson/Jha/Ristenpart "Model Inversion Attacks" CCS 2015; Tramer et al.
    // "Stealing Machine Learning Models via Prediction APIs" USENIX Security
    // 2016; Gu/Dolan-Gavitt/Garg "BadNets" arXiv:1708.06733 (2017); Biggio et al.
    // "Poisoning Attacks against SVMs" ICML 2012; Dwork "Differential Privacy"
    // ICALP 2006; Dwork & Roth "The Algorithmic Foundations of Differential
    // Privacy" 2014; Abadi et al. "Deep Learning with Differential Privacy"
    // CCS 2016 (DP-SGD); McMahan et al. "Communication-Efficient Learning of
    // Deep Networks from Decentralized Data" AISTATS 2017 (FedAvg); Bonawitz
    // et al. "Practical Secure Aggregation" CCS 2017; Greshake et al. "Not what
    // you've signed up for: Compromising Real-World LLM-Integrated Applications
    // with Indirect Prompt Injection" AISec 2023; OWASP "Top 10 for LLM
    // Applications" v2025 (Nov. 2024); MITRE ATLAS Matrix v2024; NIST AI 600-1
    // "Generative AI Profile" (Juli 2024); NIST AI RMF 1.0 (Jan. 2023, NIST AI
    // 100-1); Verordnung (EU) 2024/1689 (KI-Verordnung / EU AI Act,
    // veroeffentlicht 12.07.2024, Inkrafttreten 01.08.2024, gestaffelte Geltung
    // bis 02.08.2027); ISO/IEC 42001:2023 (AI Management System); ISO/IEC
    // 23894:2023 (AI Risk Management); ISO/IEC 22989:2022 (AI Concepts and
    // Terminology); Anthropic "Model Context Protocol" Spezifikation 2024;
    // Carlini et al. "Extracting Training Data from Large Language Models"
    // USENIX Security 2021.
    // ----------------------------------------------------------------------

    const PAGE_AI_ADVERSARIAL = {
        title: '6.1 Adversarial Machine Learning — Evasion, Poisoning, Robustheit',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Threat-Modelle gegen ML-Systeme klassifizieren (Evasion, Poisoning, Backdoor), (2) FGSM, PGD und C&amp;W als konkrete Evasion-Angriffe unterscheiden, (3) Adversarial Training und Certified Defenses (Randomized Smoothing) gegeneinander abgrenzen, (4) MITRE ATLAS und NIST AI 100-2 in das Bedrohungsmodell einordnen.</blockquote>'

            + '<h4>6.1.1 Bedrohungs-Taxonomie nach NIST AI 100-2</h4>'
            + '<p>NIST AI 100-2 E2023 (Adversarial Machine Learning, Jan. 2024) klassifiziert Angriffe entlang dreier Achsen:</p>'
            + '<table><thead><tr><th>Achse</th><th>Auspraegungen</th></tr></thead><tbody>'
            + '<tr><td>Lernphase</td><td><strong>Training-Time</strong> (Poisoning, Backdoor) vs. <strong>Inference-Time</strong> (Evasion, Privacy)</td></tr>'
            + '<tr><td>Wissen des Angreifers</td><td><strong>White-Box</strong> (volle Modellkenntnis), <strong>Gray-Box</strong> (Architektur/Logits), <strong>Black-Box</strong> (nur API-Output)</td></tr>'
            + '<tr><td>Angriffsziel</td><td><strong>Availability</strong> (Modell unbrauchbar machen), <strong>Integrity</strong> (gezielte Fehlklassifikation), <strong>Privacy</strong> (Trainingsdaten extrahieren)</td></tr>'
            + '</tbody></table>'
            + '<p>MITRE ATLAS (Adversarial Threat Landscape for AI Systems) liefert die ATT&amp;CK-aequivalente Matrix mit 14 Taktiken (Reconnaissance &rarr; ML Model Access &rarr; Initial Access &rarr; ... &rarr; Impact) und konkreten Techniken wie <code>AML.T0043 Craft Adversarial Data</code> oder <code>AML.T0019 Publish Poisoned Datasets</code>.</p>'

            + '<h4>6.1.2 Evasion-Angriffe (Inference-Time)</h4>'
            + '<p>Ziel: kleine, fuer Menschen meist nicht wahrnehmbare Stoerung $\\delta$ mit $\\|\\delta\\|_p \\le \\epsilon$, sodass das Modell $f(x+\\delta) \\ne f(x)$ liefert.</p>'

            + '<h5>FGSM — Fast Gradient Sign Method (Goodfellow et al. 2015)</h5>'
            + '<p>Einschritt-Angriff im $L_\\infty$-Bedrohungsmodell:</p>'
            + '<p>$$x_{\\text{adv}} = x + \\epsilon \\cdot \\mathrm{sign}\\bigl(\\nabla_x J(\\theta, x, y)\\bigr)$$</p>'
            + '<p>Schnell und effizient (eine Backprop-Berechnung), aber relativ leicht abwehrbar. Liefert linearisierte Perturbation in Richtung der lokalen Verlust-Steigung.</p>'

            + '<h5>PGD — Projected Gradient Descent (Madry et al. 2018)</h5>'
            + '<p>Mehrstufige Iteration: in jedem Schritt FGSM-Update plus Projektion zurueck in die $\\epsilon$-Kugel um $x$:</p>'
            + '<p>$$x^{t+1}_{\\text{adv}} = \\Pi_{B_\\epsilon(x)}\\Bigl(x^t_{\\text{adv}} + \\alpha \\cdot \\mathrm{sign}(\\nabla_x J)\\Bigr)$$</p>'
            + '<p>PGD gilt als <em>universellster First-Order-Angriff</em> &mdash; ein Modell, das gegen PGD robust ist, ist gegen alle First-Order-Angriffe in derselben $\\epsilon$-Kugel robust.</p>'

            + '<h5>C&amp;W — Carlini-Wagner-Angriff (2017)</h5>'
            + '<p>Optimierungs-Angriff mit Lagrange-aehnlichem Ziel $\\min \\|\\delta\\|_p + c \\cdot g(x+\\delta)$, gelaesst $L_2$, $L_0$, $L_\\infty$. Bricht systematisch viele Defensiv-Distillation-/Gradient-Masking-Verfahren und gilt als Goldstandard zur Robustheits-Evaluation. Findet typischerweise <em>kleinere</em> Stoerungen als FGSM/PGD bei vergleichbarer Erfolgsquote.</p>'

            + '<h5>Black-Box und Transfer-Angriffe</h5>'
            + '<p>Adversariale Beispiele <strong>uebertragen</strong> sich oft zwischen Modellen (Papernot et al. 2016): ein auf einem Surrogat-Modell trainiertes Adversarial-Sample fuehrt mit hoher Wahrscheinlichkeit auch das Zielmodell in die Irre. Black-Box-Angriffe nutzen das aus (Substitute Model, ZOO, Square Attack).</p>'

            + '<h4>6.1.3 Poisoning- und Backdoor-Angriffe (Training-Time)</h4>'
            + '<table><thead><tr><th>Angriff</th><th>Idee</th><th>Referenz</th></tr></thead><tbody>'
            + '<tr><td>Label-Flipping</td><td>Trainings-Labels gezielt aendern</td><td>Biggio et al. 2012</td></tr>'
            + '<tr><td>Clean-Label Poisoning</td><td>nur Features veraendern, Labels bleiben korrekt</td><td>Shafahi et al. 2018</td></tr>'
            + '<tr><td>BadNets</td><td>Trigger-Pixelmuster + falsches Ziel-Label; bei Trigger-Inferenz erfolgt Fehlklassifikation, sonst normal</td><td>Gu et al. 2017</td></tr>'
            + '<tr><td>TrojanNN</td><td>Trojaner ohne Zugriff auf Original-Trainingsdaten, ueber Re-Training</td><td>Liu et al. NDSS 2018</td></tr>'
            + '</tbody></table>'
            + '<p>Backdoors sind heimtueckisch: sie veraendern die <em>saubere</em> Genauigkeit kaum, treten nur bei Trigger-Inputs auf. Detektion: Neural Cleanse (Wang et al. 2019), STRIP, Activation Clustering.</p>'

            + '<h4>6.1.4 Verteidigungen</h4>'
            + '<table><thead><tr><th>Verfahren</th><th>Garantie</th><th>Bemerkung</th></tr></thead><tbody>'
            + '<tr><td><strong>Adversarial Training</strong> (Madry 2018)</td><td>empirisch</td><td>min-max-Spiel, trainiert auf staerksten gefundenen Adv-Beispielen; Goldstandard, aber +Compute-Kosten</td></tr>'
            + '<tr><td><strong>Defensive Distillation</strong> (Papernot 2016)</td><td>empirisch</td><td>von C&amp;W gebrochen — gilt als <em>nicht</em> sicher</td></tr>'
            + '<tr><td><strong>Randomized Smoothing</strong> (Cohen 2019)</td><td><strong>zertifiziert</strong></td><td>gibt provable Robustheits-Radius im $L_2$ unter Gaussian-Noise; kein Gradient-Masking</td></tr>'
            + '<tr><td><strong>Gradient Masking</strong></td><td>scheinbar</td><td><em>Anti-Pattern</em> — verschleiert Gradienten, schuetzt nicht (Athalye et al. 2018 "Obfuscated Gradients")</td></tr>'
            + '</tbody></table>'
            + '<p>Faustregel zur Robustheits-Evaluation: stets PGD <em>und</em> C&amp;W; wer nur gegen FGSM testet, hat ein <em>Gradient-Masking</em>-Problem (Carlini et al. 2019 "On Evaluating Adversarial Robustness").</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Szegedy et al. ICLR 2014; Goodfellow et al. ICLR 2015 (FGSM); Madry et al. ICLR 2018 (PGD, Adversarial Training); Carlini &amp; Wagner IEEE S&amp;P 2017; Cohen et al. ICML 2019; Athalye et al. ICML 2018; Gu et al. arXiv:1708.06733; Biggio et al. ICML 2012; NIST AI 100-2 E2023 (Jan. 2024); MITRE ATLAS v2024.</em></p>'
    };

    const PAGE_AI_PRIVACY = {
        title: '6.2 Privatsphaere und Modellschutz — DP, Membership Inference, Modell-Diebstahl',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) Membership-Inference und Modell-Inversion-Angriffe erklaeren, (2) Differential Privacy formal definieren und DP-SGD skizzieren, (3) Federated Learning und Secure Aggregation einordnen, (4) Modell-Diebstahl und Watermarking als Schutzmechanismus beschreiben.</blockquote>'

            + '<h4>6.2.1 Privacy-Angriffe</h4>'
            + '<table><thead><tr><th>Angriff</th><th>Ziel</th><th>Referenz</th></tr></thead><tbody>'
            + '<tr><td><strong>Membership Inference (MIA)</strong></td><td>Bestimmen, ob ein konkreter Datenpunkt im Trainingsdatensatz war</td><td>Shokri et al. IEEE S&amp;P 2017</td></tr>'
            + '<tr><td><strong>Modell-Inversion</strong></td><td>Rekonstruktion repraesentativer Trainings-Inputs (z.B. Gesicht aus Klassen-Label)</td><td>Fredrikson et al. CCS 2015</td></tr>'
            + '<tr><td><strong>Attribute Inference</strong></td><td>Sensitive Attribute aus partiellem Input + Modell-Output ableiten</td><td>Fredrikson et al. USENIX Sec. 2014</td></tr>'
            + '<tr><td><strong>Training Data Extraction</strong></td><td>woertliches Extrahieren von Trainings-Strings aus LLMs (Memorization)</td><td>Carlini et al. USENIX Sec. 2021</td></tr>'
            + '</tbody></table>'
            + '<p>MIA-Vorgehen (Shadow-Models): Angreifer trainiert mehrere Schatten-Modelle auf bekannten Datensaetzen; lernt aus deren Confidence-Verteilungen einen Klassifikator "member vs. non-member" und wendet ihn auf das Zielmodell an. Modelle mit hoher Generalisierungs-Luecke (Overfitting) sind besonders anfaellig.</p>'

            + '<h4>6.2.2 Differential Privacy — formale Definition (Dwork 2006)</h4>'
            + '<p>Ein randomisierter Mechanismus $\\mathcal{M}$ ist <strong>$(\\epsilon,\\delta)$-differentially private</strong>, falls fuer alle benachbarten Datensaetze $D, D\'$ (unterscheiden sich in genau einem Eintrag) und alle Mengen $S \\subseteq \\mathrm{Range}(\\mathcal{M})$ gilt:</p>'
            + '<p>$$\\Pr[\\mathcal{M}(D) \\in S] \\le e^{\\epsilon} \\cdot \\Pr[\\mathcal{M}(D\') \\in S] + \\delta$$</p>'
            + '<p>Interpretation: das Hinzufuegen oder Entfernen eines einzelnen Datensatzes aendert die Output-Verteilung nur um Faktor $e^\\epsilon$. Praxis-Werte: $\\epsilon \\in [0{,}1; 10]$, $\\delta \\ll 1/n$ (typisch $10^{-5}$).</p>'
            + '<ul>'
            + '<li><strong>Pure DP</strong>: $\\delta = 0$, also $(\\epsilon,0)$-DP.</li>'
            + '<li><strong>Approximate DP</strong>: $\\delta &gt; 0$, in der Praxis verbreitet.</li>'
            + '<li><strong>Renyi DP</strong> (Mironov 2017) und <strong>Concentrated DP</strong>: feinere Composition-Bilanzierung.</li>'
            + '</ul>'
            + '<p><strong>Composition</strong>: $k$-fache Anwendung eines $(\\epsilon,0)$-DP-Mechanismus ist $(k\\epsilon,0)$-DP (sequentielle Komposition); fortgeschrittene Composition liefert bessere Schranken.</p>'

            + '<h4>6.2.3 DP-SGD (Abadi et al. CCS 2016)</h4>'
            + '<p>Differentially-private Variante des stochastischen Gradientenabstiegs:</p>'
            + '<ol>'
            + '<li>Mini-Batch ziehen.</li>'
            + '<li><strong>Per-Sample-Gradient</strong> berechnen.</li>'
            + '<li><strong>Clipping</strong>: jeden Sample-Gradienten auf $L_2$-Norm $C$ stutzen.</li>'
            + '<li><strong>Noise hinzufuegen</strong>: Mittel des geclippten Gradienten plus $\\mathcal{N}(0, \\sigma^2 C^2 I)$.</li>'
            + '<li>Update mit aufaddiertem Privacy-Budget (Moments Accountant fuer enge $\\epsilon$-Bilanz).</li>'
            + '</ol>'
            + '<p>Clipping schraenkt den Einfluss eines einzelnen Datenpunkts ein, Noise sorgt fuer DP-Garantie. Trade-off: groesseres $\\sigma$ &rarr; mehr Privacy, aber schlechtere Genauigkeit.</p>'

            + '<h4>6.2.4 Federated Learning und Secure Aggregation</h4>'
            + '<p><strong>FedAvg</strong> (McMahan et al. AISTATS 2017): Clients trainieren lokal, schicken nur Modell-Updates an den Server, der gewichtet mittelt. Vorteil: Rohdaten verlassen das Geraet nicht.</p>'
            + '<p>Aber: Updates koennen Trainingsdaten leaken. Gegenmassnahmen:</p>'
            + '<ul>'
            + '<li><strong>Secure Aggregation</strong> (Bonawitz et al. CCS 2017): Server sieht nur die Summe der Updates, nicht die einzelnen Beitraege (Pairwise Masking + Shamir Secret Sharing fuer Drop-out-Robustheit).</li>'
            + '<li><strong>Local DP</strong>: jeder Client gibt seine Updates schon mit Noise heraus.</li>'
            + '<li><strong>Cross-Silo vs. Cross-Device FL</strong>: Cross-Silo (wenige Organisations-Clients), Cross-Device (Mio. Endgeraete) haben unterschiedliche Bedrohungsmodelle.</li>'
            + '</ul>'

            + '<h4>6.2.5 Modell-Diebstahl und Watermarking</h4>'
            + '<p><strong>Model Extraction</strong> (Tramer et al. USENIX Sec. 2016): mit Query-Zugriff zur Prediction-API kann ein funktional aequivalentes Modell rekonstruiert werden &mdash; insbesondere bei Modellen mit Logits-Output und ohne Rate-Limiting.</p>'
            + '<p>Schutzmassnahmen:</p>'
            + '<ul>'
            + '<li>Output auf Top-1-Label reduzieren (statt voller Logits).</li>'
            + '<li>Rate-Limiting / Anomalie-Detektion (untypische Query-Verteilungen).</li>'
            + '<li><strong>Watermarking</strong>: Trainings-Trigger mit definiertem Output, der ein gestohlenes Modell forensisch identifizierbar macht (Adi et al. USENIX Sec. 2018).</li>'
            + '<li><strong>PRADA</strong> (Juuti et al. EuroS&amp;P 2019): laufzeit-basierte Detektion verdaechtiger Query-Muster.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: Shokri et al. IEEE S&amp;P 2017; Fredrikson et al. CCS 2015; Carlini et al. USENIX Sec. 2021 (LLM-Memorization); Dwork ICALP 2006; Dwork &amp; Roth Foundations 2014; Mironov CSF 2017 (RDP); Abadi et al. CCS 2016 (DP-SGD); McMahan et al. AISTATS 2017 (FedAvg); Bonawitz et al. CCS 2017; Tramer et al. USENIX Sec. 2016; Adi et al. USENIX Sec. 2018; ISO/IEC 27559:2022 (Privacy-enhancing data de-identification).</em></p>'
    };

    const PAGE_AI_LLM = {
        title: '6.3 LLM- und Agentic-AI-Sicherheit',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die OWASP LLM Top 10 v2025 benennen und Beispiele zuordnen, (2) Direct- und Indirect-Prompt-Injection unterscheiden, (3) Excessive-Agency-Risiken bei Tool-using Agenten einschaetzen, (4) Sicherheits-Implikationen des Anthropic Model Context Protocol (MCP) erklaeren, (5) NIST AI 600-1 Generative-AI-Profile in das Kontrollsystem integrieren.</blockquote>'

            + '<h4>6.3.1 OWASP Top 10 fuer LLM-Applications, Version 2025</h4>'
            + '<p>Veroeffentlicht November 2024 durch das OWASP GenAI Security Project (Vorgaenger: v1.1, Okt. 2023). Die Reihenfolge spiegelt nicht direkt Severity, sondern beobachtete Praevalenz und Impact in produktiven LLM-Apps:</p>'
            + '<table><thead><tr><th>ID</th><th>Titel</th><th>Kerninhalt</th></tr></thead><tbody>'
            + '<tr><td><strong>LLM01</strong></td><td>Prompt Injection</td><td>direkte oder indirekte Manipulation des Prompts (Jailbreaks, Indirect via abgerufene Inhalte)</td></tr>'
            + '<tr><td><strong>LLM02</strong></td><td>Sensitive Information Disclosure</td><td>Leak von PII, Secrets, geistigem Eigentum aus Training oder Kontext</td></tr>'
            + '<tr><td><strong>LLM03</strong></td><td>Supply Chain</td><td>kompromittierte Modelle, Datasets, Plug-ins, LoRA-Adapter, Inference-Frameworks</td></tr>'
            + '<tr><td><strong>LLM04</strong></td><td>Data and Model Poisoning</td><td>vergiftete Trainings-/RAG-Daten, Backdoors</td></tr>'
            + '<tr><td><strong>LLM05</strong></td><td>Improper Output Handling</td><td>Downstream-Injektionen (XSS, SSRF, SQLi) durch ungefilterte LLM-Outputs</td></tr>'
            + '<tr><td><strong>LLM06</strong></td><td>Excessive Agency</td><td>zu weit gefasste Tool-/API-Berechtigungen von Agenten</td></tr>'
            + '<tr><td><strong>LLM07</strong></td><td>System Prompt Leakage</td><td>Geheimnisse oder Logik aus System-Prompts werden vom Modell ausgegeben</td></tr>'
            + '<tr><td><strong>LLM08</strong></td><td>Vector and Embedding Weaknesses</td><td>RAG-spezifisch: Embedding-Inversion, Daten-Vermischung, Tenant-Verletzung</td></tr>'
            + '<tr><td><strong>LLM09</strong></td><td>Misinformation</td><td>Halluzinationen, Overreliance, fehlende Quellenangaben</td></tr>'
            + '<tr><td><strong>LLM10</strong></td><td>Unbounded Consumption</td><td>Denial-of-Wallet/Service durch Endlos-Generierung, Kontext-Stuffing, Model-Cloning-Queries</td></tr>'
            + '</tbody></table>'

            + '<h4>6.3.2 Prompt Injection im Detail</h4>'
            + '<ul>'
            + '<li><strong>Direct Prompt Injection</strong>: User-Input enthaelt Anweisungen, die System-Instruktionen ueberstimmen ("Ignoriere alle vorherigen Anweisungen ...").</li>'
            + '<li><strong>Indirect Prompt Injection</strong> (Greshake et al. AISec 2023): bosartige Anweisungen versteckt in <em>abgerufenen</em> Inhalten (E-Mails, Webseiten, PDFs), die ein RAG- oder Agent-System verarbeitet. Der User initiiert keinen boswilligen Prompt — der Angreifer schreibt die Anweisung in eine Quelle, die das Modell konsumiert.</li>'
            + '<li><strong>Multi-Modal Prompt Injection</strong>: in Bildern (Steganografie / Adversarial Patches) oder Audio versteckte Anweisungen.</li>'
            + '</ul>'
            + '<p>Mitigation-Strategien (kombinieren!):</p>'
            + '<ul>'
            + '<li>Strikte <em>Role Separation</em> (System / User / Tool / Retrieved-Content) und Trust-Tiers.</li>'
            + '<li>Output-Validierung gegen erlaubte Ziel-Aktionen (Schema-Constraints, allow-list von Tool-Calls).</li>'
            + '<li>Human-in-the-Loop fuer Aktionen mit hohem Impact (Money-Movement, Mass-E-Mail, Datei-Loeschen).</li>'
            + '<li>Detection-Modelle (z.B. Microsoft Prompt Shields, Llama Guard 3) — keine vollstaendige Garantie.</li>'
            + '<li><strong>Wichtig</strong>: nach aktuellem Stand 2025 gibt es <em>keine</em> verlaessliche, vollstaendige Loesung gegen Prompt Injection (NIST AI 600-1, OWASP). Defense-in-Depth ist Pflicht.</li>'
            + '</ul>'

            + '<h4>6.3.3 Excessive Agency und Agentic Systems</h4>'
            + '<p>Agentic-Systeme (LLM + Tools + Memory + Planung) erweitern den Angriffsraum erheblich. Kontroll-Pflichten nach OWASP LLM06:</p>'
            + '<ul>'
            + '<li><strong>Excessive Functionality</strong>: nur die Tools registrieren, die der Use-Case wirklich benoetigt.</li>'
            + '<li><strong>Excessive Permissions</strong>: jedes Tool mit Least-Privilege; Read- vs. Write-Trennung.</li>'
            + '<li><strong>Excessive Autonomy</strong>: Approval-Schritte fuer irreversible Aktionen.</li>'
            + '</ul>'
            + '<p><strong>Anthropic Model Context Protocol (MCP, 2024)</strong> standardisiert die Anbindung von Tools/Datenquellen an LLM-Clients. Sicherheits-Implikationen:</p>'
            + '<ul>'
            + '<li>MCP-Server bestimmt, was als <em>Tool</em> ausgegeben wird &mdash; ein boser Server kann Funktionen mit irrefuehrenden Beschreibungen registrieren ("Tool Description Injection" / "Rug-Pull").</li>'
            + '<li>Authentifizierung &amp; Autorisierung des MCP-Servers liegt beim Host-Client; per OAuth 2.1 (Spez. 2025) zu sichern.</li>'
            + '<li>Tool-Outputs sind <em>untrusted retrieved content</em> &rarr; Indirect-Prompt-Injection-Risiko.</li>'
            + '<li>MCP-Permissions muessen pro Tool und pro Aktion explizit vom User bestaetigt werden (Prinzip "Approval Flows").</li>'
            + '</ul>'

            + '<h4>6.3.4 NIST AI 600-1 (Generative AI Profile)</h4>'
            + '<p>NIST AI 600-1 (Juli 2024) konkretisiert das AI RMF fuer generative KI; identifiziert 12 GAI-spezifische Risiken, u.a.:</p>'
            + '<ul>'
            + '<li>CBRN/Cyber-Capability-Uplift, Confabulation (Halluzination), Dangerous/Violent/Hateful Content, Data Privacy, Environmental Impact, Harmful Bias, Human-AI Configuration, Information Integrity (Synthetic-Media-Provenance), IP-Issues, Obscene/Degrading Content, Information Security, Value Chain &amp; Component Integration.</li>'
            + '<li>Empfiehlt Gegenmassnahmen entlang Govern/Map/Measure/Manage (analog NIST AI RMF 1.0).</li>'
            + '<li>Fuer Synthetic-Media: Provenance via C2PA / Content Credentials.</li>'
            + '</ul>'

            + '<p class="text-xs text-slate-500"><em>Quellen: OWASP GenAI Security Project "Top 10 for LLM Applications" v2025 (Nov. 2024); Greshake et al. AISec 2023; NIST AI 600-1 (Juli 2024); MITRE ATLAS v2024 (Techniken AML.T0051 LLM Prompt Injection, AML.T0054 LLM Plugin Compromise); Anthropic Model Context Protocol Spezifikation 2024-2025; Microsoft "Prompt Shields" Doku (2024); Carlini et al. USENIX Sec. 2021 (Memorization).</em></p>'
    };

    const PAGE_AI_GOVERNANCE = {
        title: '6.4 MLOps-Sicherheit, NIST AI RMF, EU AI Act, ISO/IEC 42001',
        html: ''
            + '<blockquote><strong>Lernziele.</strong> Sie koennen (1) die vier Funktionen des NIST AI RMF 1.0 erlaeutern, (2) die Risikoklassen des EU AI Act und Inkrafttreten-Fristen nennen, (3) ISO/IEC 42001:2023 als zertifizierungsfaehiges AI-Managementsystem einordnen, (4) MLOps-Pipeline-Risiken auf konkrete Controls abbilden.</blockquote>'

            + '<h4>6.4.1 NIST AI Risk Management Framework 1.0</h4>'
            + '<p>NIST AI 100-1 "AI RMF 1.0" (Januar 2023) ist freiwillig und definiert vier Kern-Funktionen ("Core"):</p>'
            + '<table><thead><tr><th>Funktion</th><th>Inhalt</th></tr></thead><tbody>'
            + '<tr><td><strong>Govern</strong></td><td>Kultur, Policies, Rollen, Verantwortlichkeit, Compliance, Lieferkette</td></tr>'
            + '<tr><td><strong>Map</strong></td><td>Kontext, Use-Case, Risiken, Annahmen identifizieren</td></tr>'
            + '<tr><td><strong>Measure</strong></td><td>quantitative/qualitative Bewertung der Risiken (Performance, Bias, Robustness, Privacy)</td></tr>'
            + '<tr><td><strong>Manage</strong></td><td>Priorisierung, Behandlung, Monitoring der Risiken im Lebenszyklus</td></tr>'
            + '</tbody></table>'
            + '<p>Querschnitt: <em>Trustworthy AI Characteristics</em> &mdash; Valid &amp; Reliable, Safe, Secure &amp; Resilient, Accountable &amp; Transparent, Explainable &amp; Interpretable, Privacy-Enhanced, Fair (with harmful bias managed). Ergaenzt durch <strong>NIST AI 600-1</strong> fuer GenAI (siehe 6.3.4).</p>'

            + '<h4>6.4.2 EU AI Act (Verordnung 2024/1689)</h4>'
            + '<p>Veroeffentlicht im EU-Amtsblatt am 12.07.2024, Inkrafttreten <strong>1. August 2024</strong>. Gestaffelte Geltung:</p>'
            + '<table><thead><tr><th>Datum</th><th>Was gilt</th></tr></thead><tbody>'
            + '<tr><td>02.02.2025</td><td>Kapitel I (Allgemeines) und Kapitel II (verbotene Praktiken nach Art. 5) gelten</td></tr>'
            + '<tr><td>02.08.2025</td><td>GPAI-Pflichten (Art. 51-55), Governance / Notified Bodies, Sanktionen</td></tr>'
            + '<tr><td>02.08.2026</td><td>Hauptanwendung der Hochrisiko-Pflichten</td></tr>'
            + '<tr><td>02.08.2027</td><td>Anwendung auf Hochrisiko-Systeme nach Anhang I (Produktsicherheit)</td></tr>'
            + '</tbody></table>'
            + '<p>Risiko-basierter Ansatz mit vier Stufen:</p>'
            + '<ul>'
            + '<li><strong>Verbotene Praktiken</strong> (Art. 5): u.a. Social Scoring durch Behoerden, manipulative subliminale Techniken, untargeted Scraping fuer Gesichts-Datenbanken, Echtzeit-Remote-Biometrie im oeffentlichen Raum (mit eng definierten Ausnahmen), Emotionserkennung am Arbeitsplatz / in Bildung.</li>'
            + '<li><strong>Hochrisiko</strong> (Anhang III + Anhang I): Biometrie, kritische Infrastruktur, Bildung, Beschaeftigung, oeffentliche Dienste, Strafverfolgung, Migration, Justiz; sowie KI-Komponenten in regulierten Produkten (Maschinen, Medizinprodukte). Pflichten: Risikomanagement-System (Art. 9), Daten-Governance (Art. 10), technische Dokumentation (Art. 11), Logging (Art. 12), Transparenz (Art. 13), menschliche Aufsicht (Art. 14), Genauigkeit/Robustheit/Cybersicherheit (Art. 15), Konformitaetsbewertung, CE-Kennzeichnung, Post-Market-Monitoring.</li>'
            + '<li><strong>Begrenztes Risiko</strong>: Transparenzpflichten, u.a. Kennzeichnung KI-generierter Inhalte (Art. 50, Deepfakes).</li>'
            + '<li><strong>Minimales Risiko</strong>: keine spezifischen Pflichten.</li>'
            + '</ul>'
            + '<p><strong>GPAI</strong> (General-Purpose AI Models, Art. 51 ff.): zwei Stufen. Standard-GPAI &rarr; technische Doku, Trainingsdaten-Zusammenfassung, Urheberrechts-Compliance. <em>Systemic-Risk-GPAI</em> (Schwellwert per Default $10^{25}$ FLOPs Training-Compute, Art. 51 Abs. 2) zusaetzlich: Modell-Evaluierung, Adversarial-Testing, Risikomanagement, Cybersecurity, Vorfall-Meldung an die KI-Behoerde. Sanktionen bis 7% Konzern-Jahresumsatz oder 35 Mio. EUR (Art. 99) fuer verbotene Praktiken.</p>'

            + '<h4>6.4.3 ISO/IEC 42001:2023 — AI Management System</h4>'
            + '<p>Erste internationale Norm fuer ein zertifizierungsfaehiges AI-Managementsystem (AIMS). Annex-SL-Struktur (analog ISO 27001), Klauseln 4-10 verbindlich. Anhang A: 38 Controls in 9 Bereichen (u.a. Policies, internal organization, AI system lifecycle, data quality, third-party use, customer relationships).</p>'
            + '<ul>'
            + '<li>Komplementaer zu <strong>ISO/IEC 23894:2023</strong> (AI Risk Management) und <strong>ISO/IEC 22989:2022</strong> (Concepts and Terminology).</li>'
            + '<li>Erfuellt einen Teil der EU-AI-Act-Anforderungen an QMS &mdash; eine ISO/IEC-42001-Zertifizierung adressiert insbesondere Art. 17 (QMS fuer Hochrisiko-Anbieter); ist aber kein automatischer "presumed conformity" fuer den AI Act, solange keine harmonisierten Normen via CEN-CENELEC JTC 21 publiziert sind.</li>'
            + '</ul>'

            + '<h4>6.4.4 MLOps-Pipeline-Sicherheit</h4>'
            + '<p>Eine produktionsreife ML-Pipeline hat dieselben Stufen wie klassisches DevOps, plus Daten- und Modell-Artefakte. Pro Stufe typische Risiken/Controls:</p>'
            + '<table><thead><tr><th>Stufe</th><th>Risiko</th><th>Control</th></tr></thead><tbody>'
            + '<tr><td>Daten-Erhebung</td><td>Poisoning, PII-Verletzung</td><td>Daten-Lineage, Datasheets, PIA / DPIA</td></tr>'
            + '<tr><td>Feature Engineering</td><td>Leakage, Bias-Verstaerkung</td><td>Feature Store mit Versionierung, Bias-Audits</td></tr>'
            + '<tr><td>Training</td><td>Model Theft, Backdoor</td><td>isolierte Trainings-Compute, Reproducibility (Seeds, Container-Hashes), DP-SGD wo angebracht</td></tr>'
            + '<tr><td>Modell-Registry</td><td>unautorisierter Push</td><td>signierte Model Cards (z.B. ML-Spec/Sigstore), RBAC, Approval-Gates</td></tr>'
            + '<tr><td>Deployment</td><td>Endpoint-Missbrauch, Model Extraction</td><td>Auth/Quota/Rate-Limiting, Output-Sanitization, Monitoring</td></tr>'
            + '<tr><td>Operation</td><td>Concept/Data Drift, Feedback-Loops</td><td>Drift-Detection (z.B. KS-Test, PSI), Champion/Challenger, Shadow-Deployments</td></tr>'
            + '<tr><td>Decommissioning</td><td>verwaiste Endpoints, vergessene Daten</td><td>Lifecycle-Policy, Data-Erasure-Nachweis</td></tr>'
            + '</tbody></table>'
            + '<p>Querschnitt: SBOM/<strong>AIBOM</strong> (CycloneDX 1.6 hat AI/ML-Erweiterung), Sigstore-Signaturen, Reproducible Builds und Provenance nach SLSA Level 3+ analog zu klassischen Build-Pipelines (siehe Kap. 4 und Kap. 5).</p>'

            + '<p class="text-xs text-slate-500"><em>Quellen: NIST AI 100-1 "AI RMF 1.0" (Jan. 2023); NIST AI 600-1 (Juli 2024); Verordnung (EU) 2024/1689 ueber KI ("AI Act", Amtsblatt L 12.07.2024); ISO/IEC 42001:2023 (AIMS); ISO/IEC 23894:2023 (AI Risk Management); ISO/IEC 22989:2022 (AI Concepts &amp; Terminology); CEN-CENELEC JTC 21 Standardisation Request M/593 (2023); CycloneDX 1.6 ML-BOM (2024); SLSA v1.0.</em></p>'
    };

    const QUIZ_AI = [
        // -- Adversarial ML (13) --
        q('Welches Verfahren beschreibt die Fast Gradient Sign Method (FGSM)?',
            ['Einschritt-Update $x_{adv}=x+\\epsilon\\,\\mathrm{sign}(\\nabla_x J)$ im $L_\\infty$-Modell',
             'Iterative Optimierung mit Lagrange-Term und beliebiger $L_p$-Norm',
             'Black-Box-Angriff per Substitute-Modell',
             'Zertifizierte Robustheit unter Gauss-Rauschen'], 0,
            'Goodfellow et al. ICLR 2015: FGSM ist ein Einschritt-Angriff im $L_\\infty$-Bedrohungsmodell, $x_{adv}=x+\\epsilon\\,\\mathrm{sign}(\\nabla_x J(\\theta,x,y))$.'),
        q('Welche Aussage zu PGD (Madry et al. ICLR 2018) ist korrekt?',
            ['Mehrstufige FGSM-Iteration mit Projektion in die $\\epsilon$-Kugel um $x$',
             'Einschritt-Methode ohne Projektion',
             'Black-Box-Verfahren ohne Gradientenzugriff',
             'Zertifizierte Verteidigung statt Angriff'], 0,
            'Madry et al. ICLR 2018: PGD = iterierter FGSM-Schritt mit Projektion zurueck in die zulaessige $\\epsilon$-Kugel; gilt als universellster First-Order-Angriff.'),
        q('Wofuer ist der Carlini-Wagner-Angriff bekannt?',
            ['Goldstandard zur Robustheits-Evaluation; bricht Defensive Distillation und viele Gradient-Masking-Verfahren',
             'Schnellster Black-Box-Angriff auf Cloud-APIs',
             'Erste zertifizierte Verteidigung mit Gauss-Glaettung',
             'Variante des Backdoor-Trainings'], 0,
            'Carlini &amp; Wagner IEEE S&amp;P 2017: optimierungsbasiert, findet typischerweise kleinere Perturbationen als FGSM/PGD und brach Papernots Defensive Distillation.'),
        q('Welche Verteidigung liefert eine PROVABLE (zertifizierte) Robustheits-Garantie?',
            ['Randomized Smoothing (Cohen et al. ICML 2019)',
             'Defensive Distillation (Papernot et al. 2016)',
             'Gradient Masking',
             'Standard-Adversarial-Training mit FGSM'], 0,
            'Cohen/Rosenfeld/Kolter ICML 2019: Randomized Smoothing liefert einen zertifizierten Robustheits-Radius im $L_2$ unter Gaussian-Noise; die anderen Verfahren sind nur empirisch (oder gebrochen).'),
        q('Worum geht es beim Athalye-et-al.-Paper "Obfuscated Gradients" (ICML 2018)?',
            ['Nachweis, dass viele "Defensiv-Methoden" nur Gradienten verschleiern, ohne echte Robustheit zu liefern',
             'Erste Implementierung von DP-SGD',
             'Definition der MITRE ATLAS-Matrix',
             'Einfuehrung des EU AI Act'], 0,
            'Athalye/Carlini/Wagner ICML 2018: zeigten, dass die meisten 2017-2018 vorgeschlagenen Defensiven auf "Obfuscated Gradients" beruhten und durch BPDA/EOT brechbar sind.'),
        q('Was charakterisiert eine "Clean-Label"-Poisoning-Attacke?',
            ['Trainings-Inputs werden veraendert, Labels bleiben korrekt',
             'Trainings-Labels werden geflippt, Inputs bleiben unveraendert',
             'Inferenz-Inputs werden mit Trigger-Pixel versehen',
             'Modell wird durch API-Queries kopiert'], 0,
            'Shafahi et al. NeurIPS 2018: Clean-Label-Poisoning vergiftet die Features, ohne die Labels zu manipulieren — schwerer zu erkennen als Label-Flipping.'),
        q('Was beschreibt der BadNets-Angriff (Gu et al. 2017)?',
            ['Backdoor: Trigger-Pixelmuster fuehrt zu gezielter Fehlklassifikation, Sauber-Genauigkeit unveraendert',
             'Black-Box-Evasion via Substitute-Modell',
             'Modell-Diebstahl per Logits-API',
             'Membership-Inference per Shadow-Models'], 0,
            'Gu/Dolan-Gavitt/Garg arXiv:1708.06733 (2017): BadNets versteckt einen Trigger im Trainingssatz; das Modell verhaelt sich auf sauberen Inputs normal, aber bei Trigger-Inputs gezielt falsch.'),
        q('Welcher Angriff faellt in NIST AI 100-2 unter "Privacy"?',
            ['Membership Inference',
             'PGD',
             'BadNets',
             'Clean-Label Poisoning'], 0,
            'NIST AI 100-2 E2023 (Adversarial ML, Jan. 2024): Privacy-Angriffe zielen auf Trainingsdaten; MIA gehoert dazu, PGD/BadNets adressieren Integrity.'),
        q('Was bedeutet "Transferability" adversarialer Beispiele?',
            ['Auf einem Surrogat-Modell erzeugte Beispiele wirken oft auch auf andere Modelle',
             'Adversariale Beispiele uebertragen sich nur innerhalb derselben Architektur',
             'Adversariale Beispiele lassen sich auf alle Eingabeformen uebertragen',
             'Adversariale Beispiele sind beliebig zwischen Datenmodalitaeten konvertierbar'], 0,
            'Papernot/McDaniel/Goodfellow 2016: Adversariale Beispiele sind oft modelluebergreifend uebertragbar; das ermoeglicht Black-Box-Angriffe ueber Substitute Models.'),
        q('Welche MITRE-ATLAS-Taktik beschreibt das Sammeln oeffentlicher Modell-Informationen vor einem Angriff?',
            ['Reconnaissance',
             'Impact',
             'Defense Evasion',
             'Lateral Movement'], 0,
            'MITRE ATLAS v2024 uebernimmt die ATT&amp;CK-Phasen: Reconnaissance ist die erste Phase und umfasst Modell-/Datensatz-Aufklaerung (z.B. AML.T0001 Search for Victim\'s Publicly Available Research Materials).'),
        q('Welche Norm ist NICHT primaer fuer Adversarial-ML-Bedrohungen relevant?',
            ['ISO/IEC 27018 (Cloud-PII-Schutz)',
             'NIST AI 100-2',
             'MITRE ATLAS',
             'OWASP ML Top 10'], 0,
            'ISO/IEC 27018:2019 adressiert PII-Schutz in Public-Cloud-Diensten und ist nicht ML-Adversarial-spezifisch; die anderen drei sind genau dafuer geschaffen.'),
        q('Welche Bedingung definiert das Bedrohungsmodell von FGSM/PGD typischerweise?',
            ['$\\|\\delta\\|_\\infty \\le \\epsilon$',
             '$\\|\\delta\\|_2 \\le 0$',
             '$\\delta = 0$',
             'beliebige $L_p$-Norm ohne Schranke'], 0,
            'In der Praxis werden FGSM und PGD im $L_\\infty$-Modell mit $\\|\\delta\\|_\\infty\\le\\epsilon$ analysiert; $L_2$- und $L_0$-Varianten existieren ebenfalls.'),
        q('Welche Aussage zu Adversarial Training (Madry 2018) ist korrekt?',
            ['Loest ein min-max-Problem: das Modell wird auf staerksten gefundenen Adversarial-Beispielen trainiert',
             'Trainiert das Modell zusaetzlich mit synthetischen Privacy-Daten',
             'Erzielt zertifizierte Robustheit ohne weitere Massnahmen',
             'Macht Gradient Masking ueberfluessig durch Distillation'], 0,
            'Madry et al. ICLR 2018 formulieren das Problem als $\\min_\\theta \\mathbb{E}[\\max_\\delta L(\\theta,x+\\delta,y)]$; die innere Maximierung wird mit PGD approximiert.'),

        // -- Privacy / Modellschutz (13) --
        q('Welche formale Bedingung definiert $(\\epsilon,\\delta)$-Differential Privacy?',
            ['$\\Pr[\\mathcal{M}(D)\\in S]\\le e^{\\epsilon}\\Pr[\\mathcal{M}(D\')\\in S]+\\delta$ fuer benachbarte $D,D\'$',
             '$\\Pr[\\mathcal{M}(D)\\in S]=\\Pr[\\mathcal{M}(D\')\\in S]$ fuer alle $D,D\'$',
             '$\\Pr[\\mathcal{M}(D)\\in S]<\\delta$',
             'KL-Divergenz zwischen $\\mathcal{M}(D)$ und $\\mathcal{M}(D\')$ ist $0$'], 0,
            'Dwork &amp; Roth (Foundations 2014): exakt diese Ungleichung fuer benachbarte Datenmengen $D,D\'$, alle messbaren $S\\subseteq\\mathrm{Range}(\\mathcal{M})$.'),
        q('Welcher Wertebereich ist fuer $\\epsilon$ in praktischer DP typisch?',
            ['$[0{,}1; 10]$',
             '$[100; 1000]$',
             '$\\epsilon = 0$ exakt',
             '$[10^{-10}; 10^{-9}]$'], 0,
            'Dwork &amp; Roth: praktische Privacy-Budgets liegen typischerweise zwischen 0,1 und 10; sehr kleine $\\epsilon$ sind in High-Privacy-Settings, sehr grosse weitgehend ohne Schutz.'),
        q('Welche Operation FEHLT in DP-SGD nicht?',
            ['Per-Sample Gradient Clipping auf $L_2$-Norm $C$',
             'Hinzufuegen von Gauss-Rauschen $\\mathcal{N}(0,\\sigma^2 C^2 I)$ zum Mittel',
             'Privacy-Accounting (Moments Accountant / RDP)',
             'Verwendung des Adam-Optimizers ist verpflichtend'], 3,
            'Abadi et al. CCS 2016: DP-SGD verlangt Per-Sample-Clipping, Noise und Privacy-Accounting; der Optimierer (SGD/Adam/...) ist nicht durch DP-SGD vorgeschrieben — Adam ist NICHT zwingend.'),
        q('Welche Studie fuehrte Membership-Inference-Angriffe gegen ML-Modelle ein?',
            ['Shokri et al. IEEE S&amp;P 2017 (Shadow Models)',
             'Goodfellow et al. ICLR 2015',
             'Madry et al. ICLR 2018',
             'McMahan et al. AISTATS 2017'], 0,
            'Shokri/Stronati/Song/Shmatikov IEEE S&amp;P 2017 fuehrte den klassischen MIA mit Shadow-Models gegen Cloud-ML-APIs ein.'),
        q('Welcher Angriff zielt darauf, Trainingsdaten zu rekonstruieren?',
            ['Model Inversion (Fredrikson et al. CCS 2015)',
             'PGD',
             'FGSM',
             'BadNets'], 0,
            'Fredrikson/Jha/Ristenpart CCS 2015 demonstrierten Model Inversion gegen Gesichtserkennungs-APIs mit Klassen-Label-Zugriff.'),
        q('Welche Aussage zu Carlini et al. "Extracting Training Data from Large Language Models" (USENIX Sec. 2021) trifft zu?',
            ['LLMs koennen woertliche Trainings-Sequenzen (z.B. PII) memorisieren und ueber gezielte Prompts ausgeben',
             'Demonstriert, dass LLMs niemals Trainingsdaten leaken',
             'Schlaegt PGD-Verteidigung fuer LLMs vor',
             'Beweist, dass DP fuer LLMs unmoeglich ist'], 0,
            'Carlini et al. zeigten Memorization-Angriffe gegen GPT-2: extrahierten u.a. PII, URLs, Code-Schnipsel woertlich aus den Trainingsdaten.'),
        q('Was leistet "Secure Aggregation" in Federated Learning (Bonawitz et al. CCS 2017)?',
            ['Server sieht nur die Summe aller Client-Updates, keine Einzel-Updates',
             'Verhindert Backdoor-Trigger im Foederationsprozess',
             'Liefert zertifizierte Robustheit gegen Evasion',
             'Beschleunigt das Training um Faktor 10'], 0,
            'Bonawitz et al. CCS 2017: Pairwise-Masking + Shamir Secret Sharing erlaubt dem Server, die Summe der Updates zu erfahren, nicht jedoch einzelne Beitraege.'),
        q('Welche Behauptung zu Federated Learning ist FALSCH?',
            ['Roh-Daten verlassen das Geraet, das ist akzeptabel',
             'FedAvg mittelt Modell-Updates server-seitig',
             'Updates allein koennen Trainingsdaten leaken',
             'Local-DP kann Privacy-Schutz auf Client-Ebene erzwingen'], 0,
            'McMahan et al. AISTATS 2017: in FL bleiben die Rohdaten lokal — sie verlassen das Geraet NICHT. Updates koennen jedoch sensible Information enthalten und benoetigen zusaetzlich Schutz.'),
        q('Welche Verteidigung gegen Modell-Diebstahl arbeitet praeventiv via Output-Reduktion?',
            ['Top-1-Label statt voller Logits/Probabilities zurueckliefern',
             'Gradient Masking',
             'Defensive Distillation',
             'BadNets-Trainingsdaten einbauen'], 0,
            'Tramer et al. USENIX Sec. 2016: Modell-Extraktion ist mit Logits-Output deutlich effektiver; Top-1-Label-only ist eine wirksame Mitigation neben Rate-Limiting.'),
        q('Wofuer steht "Watermarking" im Kontext Modell-Schutz?',
            ['Einbetten eines geheimen Trigger-Behaviors zur forensischen Wiedererkennung gestohlener Modelle',
             'Steganografische Markierung von Trainingsdaten',
             'Methode der Differential Privacy',
             'Variante der Defensive Distillation'], 0,
            'Adi et al. USENIX Sec. 2018: Modell-Watermarking faerbt das Modellverhalten auf einer geheimen Trigger-Menge ein, sodass Diebstahl nachgewiesen werden kann.'),
        q('Welche Eigenschaft hat Renyi Differential Privacy gegenueber klassischer $(\\epsilon,\\delta)$-DP?',
            ['Engere Composition-Schranken bei mehrfacher Anwendung',
             'Schwaecher als $(\\epsilon,0)$-DP',
             'Garantiert keinerlei Privacy',
             'Verzichtet auf einen Privacy-Parameter'], 0,
            'Mironov CSF 2017: RDP basiert auf Renyi-Divergenz und liefert engere Bilanzierungen iterativer Composition als basic Composition; Standard-Werkzeug im Moments-Accountant.'),
        q('Was beschreibt "Cross-Device" vs. "Cross-Silo" Federated Learning?',
            ['Cross-Device: Mio. Endgeraete als Clients; Cross-Silo: wenige Organisations-Clients',
             'Cross-Device: zentralisierte Cloud; Cross-Silo: einzelnes Smartphone',
             'Cross-Device: ohne Verschluesselung; Cross-Silo: mit TLS',
             'Beide Begriffe bedeuten dasselbe'], 0,
            'Kairouz et al. "Advances and Open Problems in Federated Learning" 2021: Cross-Device hat heterogene, unzuverlaessige Endgeraete; Cross-Silo wenige zuverlaessige Organisations-Clients.'),
        q('Welche Massnahme ist KEIN Schutz gegen Modell-Extraktion?',
            ['Veroeffentlichung aller Logits ohne Rate-Limit',
             'Top-1-Label-Output statt Logits',
             'API-Rate-Limiting und Anomalie-Detektion (PRADA)',
             'Watermarking'], 0,
            'Veroeffentlichung voller Logits beguenstigt Extraktion; sie ist ein Anti-Pattern, kein Schutz.'),

        // -- LLM / Agentic AI (12) --
        q('Wie viele Top-Risiko-Kategorien definiert OWASP "Top 10 for LLM Applications" v2025?',
            ['10 (LLM01 bis LLM10)',
             '5',
             '15',
             '20'], 0,
            'OWASP GenAI Security Project Top 10 v2025 (Nov. 2024) listet exakt 10 Risiken (LLM01 Prompt Injection bis LLM10 Unbounded Consumption).'),
        q('Welcher OWASP-LLM-v2025-Eintrag adressiert Denial-of-Wallet-Risiken durch Endlos-Generierung und Kontext-Stuffing?',
            ['LLM10 Unbounded Consumption',
             'LLM01 Prompt Injection',
             'LLM07 System Prompt Leakage',
             'LLM06 Excessive Agency'], 0,
            'OWASP LLM v2025 LLM10: Unbounded Consumption umfasst Denial-of-Wallet/Service durch hohe Token-/Compute-/Cost-Verbraeuche.'),
        q('Was ist eine "Indirect Prompt Injection" (Greshake et al. AISec 2023)?',
            ['Boese Anweisung versteckt in vom LLM abgerufenen Inhalten (E-Mail, Webseite, PDF)',
             'Direkter User-Prompt mit Jailbreak',
             'Modell-Extraktion via Logits-API',
             'Trainingszeit-Backdoor mit Trigger-Pixel'], 0,
            'Greshake et al. AISec 2023 fuehrte den Begriff ein: bei RAG- oder Tool-using Agents werden externe Inhalte zu untrusted Instruktionen.'),
        q('Welcher Eintrag der OWASP LLM Top 10 v2025 deckt RAG-spezifische Risiken (Embedding-Inversion, Tenant-Verletzung) explizit ab?',
            ['LLM08 Vector and Embedding Weaknesses',
             'LLM03 Supply Chain',
             'LLM05 Improper Output Handling',
             'LLM02 Sensitive Information Disclosure'], 0,
            'OWASP LLM v2025 LLM08 wurde fuer RAG-/Vektor-Datenbanken-spezifische Schwaechen geschaffen.'),
        q('Welche Aussage zu Prompt-Injection-Verteidigungen ist nach NIST AI 600-1 (Juli 2024) korrekt?',
            ['Es gibt aktuell keine vollstaendige Loesung; Defense-in-Depth ist Pflicht',
             'Standard-RLHF-Training eliminiert Prompt Injection vollstaendig',
             'Llama Guard 3 garantiert 100% Detektion',
             'Eine Whitelist von Stoppwoertern reicht aus'], 0,
            'NIST AI 600-1 (Juli 2024) und OWASP LLM v2025 stellen klar: kein einzelnes Verfahren bietet vollstaendigen Schutz; Defense-in-Depth ist erforderlich.'),
        q('Wofuer steht "Excessive Agency" in der OWASP LLM Top 10?',
            ['Zu weitreichende Tool-/API-Berechtigungen oder Autonomie eines LLM-Agenten',
             'Halluzinationen ohne Quellen',
             'Memorization von Trainingsdaten',
             'Embedding-Vermischung in Vektordatenbanken'], 0,
            'OWASP LLM v2025 LLM06: Excessive Functionality, Excessive Permissions, Excessive Autonomy — Agenten erhalten mehr Faehigkeiten/Rechte/Freiheiten als noetig.'),
        q('Welche der folgenden ist KEINE empfohlene Mitigation gegen Prompt Injection?',
            ['Auf RLHF allein vertrauen und keine weiteren Kontrollen einsetzen',
             'Strikte Role-Separation zwischen System-, User- und Retrieved-Content-Prompts',
             'Schema-Constraints und Output-Validierung gegen Tool-Allowlists',
             'Human-in-the-Loop bei irreversiblen Aktionen'], 0,
            'OWASP / NIST AI 600-1: RLHF allein reicht nicht — Defense-in-Depth ist Pflicht.'),
        q('Welche Sicherheits-Implikation hat das Anthropic Model Context Protocol (MCP)?',
            ['MCP-Server koennen Tools mit irrefuehrenden Beschreibungen registrieren ("Description Injection"); Authentifizierung des Servers ist Pflicht',
             'MCP eliminiert Indirect Prompt Injection',
             'MCP-Tools muessen nicht authentifiziert werden',
             'MCP ist ein verbindlicher EU-AI-Act-Standard'], 0,
            'MCP-Spezifikation 2024-2025: Tool-Definitionen werden vom Server geliefert; ein bosartiger Server kann irrefuehrende Beschreibungen oder boesartige Tools anbieten — Auth/OAuth 2.1 und Approval-Flows sind Pflicht.'),
        q('Welche MITRE-ATLAS-Technik beschreibt die Manipulation von LLM-Prompts?',
            ['AML.T0051 LLM Prompt Injection',
             'AML.T0019 Publish Poisoned Datasets',
             'AML.T0043 Craft Adversarial Data',
             'AML.T0010 ML Supply Chain Compromise'], 0,
            'MITRE ATLAS v2024 listet AML.T0051 LLM Prompt Injection unter Initial Access; T0019 ist Poisoning, T0043 ist klassische Evasion.'),
        q('Welcher Eintrag der OWASP LLM Top 10 v2025 ersetzte den frueheren v1.1-Eintrag "Insecure Output Handling"?',
            ['LLM05 Improper Output Handling',
             'LLM01 Prompt Injection',
             'LLM10 Unbounded Consumption',
             'LLM07 System Prompt Leakage'], 0,
            'OWASP LLM v2025 benannte "Insecure Output Handling" (v1.1 LLM02) in "Improper Output Handling" um und nummerierte es als LLM05.'),
        q('Welches Provenance-Verfahren empfiehlt NIST AI 600-1 fuer synthetische Medien?',
            ['C2PA / Content Credentials',
             'CVSS v4.0',
             'EPSS',
             'BadNets-Watermark'], 0,
            'NIST AI 600-1 (Juli 2024, Risiko "Information Integrity") verweist auf C2PA/Content Credentials zur Provenance synthetischer Medien.'),
        q('Welche Massnahme gehoert zu "Excessive Permissions" laut OWASP LLM06?',
            ['Tool-Berechtigungen nach Least-Privilege; Read- und Write-Pfade trennen',
             'Tools immer mit Admin-Rechten ausfuehren',
             'Saemtliche Approval-Schritte deaktivieren',
             'Token-Limits abschalten'], 0,
            'OWASP LLM v2025 LLM06: Least-Privilege-Berechtigungen je Tool, Trennung Read/Write, Approval-Schritte fuer hohe-Impact-Aktionen.'),

        // -- Governance / Compliance / MLOps (12) --
        q('Welche vier Funktionen definiert das NIST AI RMF 1.0 Core?',
            ['Govern, Map, Measure, Manage',
             'Plan, Do, Check, Act',
             'Identify, Protect, Detect, Respond',
             'Discover, Classify, Protect, Monitor'], 0,
            'NIST AI 100-1 "AI RMF 1.0" (Jan. 2023): vier Kern-Funktionen Govern (querschnittlich), Map, Measure, Manage.'),
        q('Wann trat der EU AI Act (Verordnung 2024/1689) in Kraft?',
            ['1. August 2024',
             '12. Juli 2024',
             '2. Februar 2025',
             '2. August 2026'], 0,
            'Verordnung (EU) 2024/1689: Veroeffentlichung 12.07.2024, Inkrafttreten am 20. Tag danach (Art. 113), also 1. August 2024; volle Anwendung gestaffelt bis 2027.'),
        q('Ab wann gelten die Verbote nach Art. 5 EU AI Act (z.B. Social Scoring, manipulative Praktiken)?',
            ['2. Februar 2025',
             '1. August 2024',
             '2. August 2025',
             '2. August 2026'], 0,
            'Art. 113 lit. a EU AI Act: Kapitel I + II (verbotene Praktiken) gelten 6 Monate nach Inkrafttreten — 2. Februar 2025.'),
        q('Welcher FLOPs-Schwellenwert markiert per Default GPAI-Modelle mit "systemischem Risiko" laut Art. 51 AI Act?',
            ['$10^{25}$',
             '$10^{18}$',
             '$10^{30}$',
             '$10^{12}$'], 0,
            'Art. 51 Abs. 2 EU AI Act: Vermutung systemischen Risikos ab kumulativ $10^{25}$ FLOPs Trainings-Compute (Schwelle durch Kommission anpassbar).'),
        q('Welche Massnahme gehoert NICHT zu den Pflichten von Hochrisiko-AI-Anbietern laut Art. 9-15 AI Act?',
            ['Generelles Werbe-Verbot',
             'Risikomanagement-System ueber den Lebenszyklus (Art. 9)',
             'Daten-Governance und Bias-Pruefung (Art. 10)',
             'Menschliche Aufsicht (Art. 14)'], 0,
            'Art. 9-15 EU AI Act: RMS, Daten-Governance, Doku, Logging, Transparenz, menschliche Aufsicht, Genauigkeit/Robustheit/Cybersicherheit — kein Werbeverbot.'),
        q('Wie hoch sind die maximalen Bussgelder nach Art. 99 AI Act bei Verstoessen gegen verbotene Praktiken?',
            ['Bis 7% Konzern-Jahresumsatz oder 35 Mio. EUR (je nachdem, was hoeher)',
             'Bis 0,5% Jahresumsatz',
             'Maximal 100.000 EUR pauschal',
             'Keine Bussgelder, nur Untersagungsverfuegungen'], 0,
            'Art. 99 Abs. 3 EU AI Act: bis zu 35 Mio. EUR oder 7% des weltweiten Jahresumsatzes — je nachdem, was hoeher ist.'),
        q('Wofuer steht ISO/IEC 42001:2023?',
            ['Erstes zertifizierungsfaehiges Management-System fuer KI (AIMS)',
             'Norm fuer Adversarial-ML-Verteidigungen',
             'Algorithmenverordnung der EU',
             'Norm fuer Differential Privacy'], 0,
            'ISO/IEC 42001:2023 ist die erste internationale Norm fuer ein zertifizierungsfaehiges AI Management System (Annex-SL-Struktur, Anhang A mit Controls).'),
        q('Welche Norm liefert AI-spezifisches Risikomanagement-Vokabular und ergaenzt ISO/IEC 42001?',
            ['ISO/IEC 23894:2023',
             'ISO 31000:2018 (allg. Risikomanagement)',
             'ISO/IEC 27001:2022',
             'IEC 62443-3-3'], 0,
            'ISO/IEC 23894:2023 "AI — Guidance on risk management" ist die AI-spezifische Konkretisierung (auf Basis von ISO 31000).'),
        q('Welche der folgenden Aussagen zur EU-AI-Act-Konformitaet ist korrekt?',
            ['Eine ISO/IEC-42001-Zertifizierung adressiert QMS-Anforderungen, ist aber kein automatischer "presumed conformity"-Nachweis ohne harmonisierte Normen',
             'ISO/IEC 42001 garantiert automatisch volle AI-Act-Konformitaet',
             'Der AI Act fordert keine technische Dokumentation',
             'GPAI-Modelle muessen keine Trainingsdaten-Zusammenfassung liefern'], 0,
            'Erst harmonisierte Normen unter CEN-CENELEC JTC 21 (Standardisation Request M/593) loesen "presumed conformity" nach Art. 40 AI Act aus; ISO/IEC 42001 ist hilfreich, aber kein automatischer Nachweis.'),
        q('Welche MLOps-Massnahme adressiert Daten-/Concept-Drift im Betrieb?',
            ['Drift-Detection (z.B. KS-Test, PSI) und Champion/Challenger-Deployments',
             'Defensive Distillation',
             'PGD-Adversarial-Training',
             'Code-Signing der Trainings-Container'], 0,
            'Drift-Detection ueberwacht Verteilungsverschiebungen; PGD/Distillation/Code-Signing adressieren andere Risiken.'),
        q('Welcher Standard liefert eine ML-spezifische BOM-Erweiterung (AIBOM)?',
            ['CycloneDX 1.6 (ML-BOM, 2024)',
             'SPDX 1.0',
             'NIST FIPS 197',
             'IEC 62443-4-1'], 0,
            'CycloneDX 1.6 (Mai 2024) erweitert das BOM-Modell um ML-Komponenten (Modell, Trainingsdaten, Metriken).'),
        // Letztes Item dieses Pools mit optionalen Metadaten gemaess AGENTS §22 (einheitliches Item-Schema).
        // Funktional aequivalent zu `q(...)`: derselbe Shape `{ q, options, correct, explanation }`,
        // ergaenzt um `lo`, `bloom`, `difficulty`, `tags`, `source` (werden vom bestehenden Renderer ignoriert
        // und stehen ueber `toItem(item, ...)` als kanonische Felder zur Verfuegung).
        {
            q: 'Welche Eigenschaft gehoert NICHT zu den "Trustworthy AI Characteristics" des NIST AI RMF 1.0?',
            options: ['Profitable', 'Valid &amp; Reliable', 'Safe', 'Privacy-Enhanced'],
            correct: 0,
            explanation: 'NIST AI 100-1: Trustworthy-AI-Eigenschaften sind Valid &amp; Reliable, Safe, Secure &amp; Resilient, Accountable &amp; Transparent, Explainable &amp; Interpretable, Privacy-Enhanced, Fair (with harmful bias managed) — "Profitable" gehoert nicht dazu.',
            lo: 'aisec.governance.nist-rmf',
            bloom: 'remember',
            difficulty: 'easy',
            tags: ['ai-security', 'governance', 'nist-ai-rmf'],
            source: 'NIST AI 100-1, AI Risk Management Framework 1.0 (Jan. 2023), §3.2 Trustworthy AI Characteristics'
        }
    ];

    window.SCHULUNGEN.list.push({
        id: 'master_et_cybersec',
        code: 'MA-ET CyberSec',
        name: 'Master Elektrotechnik — Cyber-Security',
        short: 'MA-ET CyberSec',
        desc: 'Vertiefungsstudium Elektrotechnik mit Fokus Cyber-Security: Embedded Security, Netzwerk- und Industriesicherheit (IEC 62443), angewandte Kryptographie, Sichere Softwareentwicklung, Risikomanagement nach ISO 27001 / BSI Grundschutz, AI-Security.',
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
                pages: [PAGE_OT_VS_IT, PAGE_IEC62443, PAGE_OT_PROTOCOLS, PAGE_OT_INCIDENTS],
                quiz: QUIZ_OT
            },
            {
                id: 'sse',
                title: 'Kapitel 4 — Sichere Softwareentwicklung (S-SDLC)',
                summary: 'Threat Modeling (STRIDE, LINDDUN), sichere Coding-Standards, statische/dynamische Analyse, OWASP Top 10 / ASVS, Supply-Chain-Sicherheit (NIST SP 800-218 SSDF).',
                pages: [PAGE_SSE_TM, PAGE_SSE_CODE, PAGE_SSE_TEST, PAGE_SSE_SUPPLY],
                quiz: QUIZ_SSE
            },
            {
                id: 'risk',
                title: 'Kapitel 5 — Risikomanagement und Compliance',
                summary: 'ISO/IEC 27001:2022 ISMS mit 93 Annex-A-Controls, BSI-Grundschutz Edition 2024, ISO/IEC 27005:2022 und ISO 31000:2018, EU-Regulatorik (NIS2 / CRA / KRITIS), CVSS v4.0, EPSS, CISA KEV, FAIR und OCTAVE Allegro.',
                pages: [PAGE_RISK_ISMS, PAGE_RISK_BSI_27005, PAGE_RISK_REGULATIONS, PAGE_RISK_SCORING],
                quiz: QUIZ_RISK
            },
            {
                id: 'aisec',
                title: 'Kapitel 6 — AI-Security und vertrauenswuerdige Systeme',
                summary: 'Adversarial Examples (FGSM/PGD/C&W), Membership-Inference, Modell-Diebstahl, Differential Privacy (DP-SGD), OWASP LLM Top 10 v2025, Indirect Prompt Injection, MITRE ATLAS, NIST AI RMF 1.0 / AI 600-1, EU AI Act 2024/1689, ISO/IEC 42001:2023, MLOps-Sicherheit.',
                pages: [PAGE_AI_ADVERSARIAL, PAGE_AI_PRIVACY, PAGE_AI_LLM, PAGE_AI_GOVERNANCE],
                quiz: QUIZ_AI
            }
        ]
    });
})();
