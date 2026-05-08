/*
 * Smartineer Schulungen — Security+ (SY0-701), CySA+ (CS0-003), PenTest+ (PT0-002)
 *
 * Status: Vollständig gemäß AGENTS.md §18.4 / §18.6.
 *  - Pro Kapitel ≥ 50 Quiz-Fragen (Soll erfüllt).
 *  - Pro Kapitel ≥ 4 Curriculum-Seiten (Soll erfüllt).
 *  - 3 Schulungen × 4 Kapitel × 50 Fragen = 600 Fragen, 48 Lehrseiten.
 *
 * Quellen: Offizielle CompTIA Exam Objectives (SY0-701, CS0-003, PT0-002),
 *          NIST SPs, OWASP, MITRE ATT&CK, CIS Controls v8.
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    // ============================================================
    //  Security+ (SY0-701)
    // ============================================================
    window.SCHULUNGEN.list.push({
        id: 'security_plus',
        code: 'SY0-701',
        name: 'CompTIA Security+',
        short: 'Security+',
        desc: 'Foundation-Level Cybersecurity. Vier Domänen: General Concepts, Threats/Vulns/Mitigations, Architecture, Operations.',
        chapters: [
            {
                id: 'concepts',
                title: 'Kapitel 1 — General Security Concepts',
                summary: 'CIA-Triade, Kontrollkategorien (technisch/administrativ/physisch — präventiv/detektiv/korrigierend), Zero Trust Grundlagen, Change Management.',
                pages: [{
                    title: 'Sicherheits-Grundbegriffe',
                    html: `<h4>CIA + erweiterte Schutzziele</h4>
<ul><li><strong>Confidentiality</strong> — Verschlüsselung, Access Control.</li>
<li><strong>Integrity</strong> — Hashing, digitale Signaturen.</li>
<li><strong>Availability</strong> — Redundanz, BCDR.</li>
<li>+ <strong>Authenticity</strong>, <strong>Non-Repudiation</strong>.</li></ul>
<h4>Kontroll-Kategorien</h4>
<p>Technisch (Firewall, EDR), administrativ (Policies, Schulung), physisch (Schloss, Wache, Kamera).
Wirkung: präventiv, detektiv, korrigierend, abschreckend, kompensierend, leitend.</p>
<h4>Change Management</h4>
<p>RFC → CAB → Test → Approval → Deployment → Post-implementation Review. Standard, Normal und Emergency Changes (ITIL 4).</p>`
                }, {
                    title: 'Authentication, Authorization, Accounting (AAA)',
                    html: `<h4>Faktor-Klassen</h4>
<ul><li>Something you <strong>know</strong> — Passwort, PIN.</li>
<li>Something you <strong>have</strong> — Smartcard, FIDO2-Token, TOTP-App.</li>
<li>Something you <strong>are</strong> — Biometrie (Fingerprint, Iris, Face).</li>
<li>Something you <strong>do</strong> — Tastaturanschlag, Maus-Verhalten.</li>
<li>Somewhere you <strong>are</strong> — Geolocation/IP-Bereich.</li></ul>
<h4>MFA-Hierarchie</h4>
<p>Phishing-Resistenz: <strong>FIDO2/WebAuthn</strong> > Smartcard > Push-with-Number-Match > TOTP > SMS-OTP. SMS ist heute schwach (SIM-Swapping).</p>
<h4>Authorization-Modelle</h4>
<ul><li>DAC (Discretionary) — Owner entscheidet.</li>
<li>MAC (Mandatory) — Labels, System erzwingt.</li>
<li>RBAC — Rolle &rarr; Berechtigungen.</li>
<li>ABAC — attributbasiert (User, Resource, Context).</li></ul>
<h4>Accounting</h4>
<p>Zentrales Audit-Logging (RADIUS, TACACS+, syslog), unveränderbarer Audit-Trail. Ohne Accounting keine Forensik.</p>`
                }, {
                    title: 'Kryptografische Grundlagen',
                    html: `<h4>Symmetrisch</h4>
<p>AES-128/256 (FIPS 197). Modi: GCM (AEAD, empfohlen), CTR, CBC mit HMAC. Niemals ECB für sensitive Daten (Mustererhalt).</p>
<h4>Asymmetrisch</h4>
<p>RSA ≥ 2048 Bit (3072 ab 2030 nach NIST SP 800-131A r3), ECDSA P-256/P-384, Ed25519. Schlüsselaustausch via ECDHE für Forward Secrecy.</p>
<h4>Hashing</h4>
<p>SHA-256, SHA-3-256. Niemals MD5 oder SHA-1 für Sicherheit. Passwort-Hashing: <strong>Argon2id</strong> (RFC 9106), bcrypt, scrypt — niemals reines SHA.</p>
<h4>Digitale Signatur vs. MAC</h4>
<p>MAC (HMAC, GMAC) liefert Integrität + Authentizität mit gemeinsamem Schlüssel — keine Non-Repudiation. Digitale Signatur (privater Schlüssel des Senders) liefert Non-Repudiation.</p>
<h4>PKI-Lifecycle</h4>
<p>CSR → Issuance → Distribution → Use → Renewal/Revocation (CRL/OCSP) → Destruction. CA-Hierarchie: Offline-Root → Issuing-CAs.</p>`
                }, {
                    title: 'Zero Trust & Modernisierung',
                    html: `<h4>Zero Trust Tenets (NIST SP 800-207)</h4>
<ol><li>Alle Datenquellen und Computing-Services sind Ressourcen.</li>
<li>Alle Kommunikation wird unabhängig vom Netzwerkstandort gesichert.</li>
<li>Zugriff erfolgt pro Session, niemals dauerhaft.</li>
<li>Zugriff wird durch dynamische Policy bestimmt (Identity, Device-Health, Kontext).</li>
<li>Asset-Integrität wird kontinuierlich überwacht.</li>
<li>Authentifizierung und Authorization sind dynamisch und werden vor Zugriff erzwungen.</li>
<li>Soviel Information wie möglich über Zustand wird gesammelt und genutzt.</li></ol>
<h4>Komponenten</h4>
<p><strong>PE</strong> (Policy Engine) entscheidet, <strong>PA</strong> (Policy Administrator) konfiguriert, <strong>PEP</strong> (Policy Enforcement Point) setzt durch.</p>
<h4>SSE / SASE</h4>
<p>Cloud-natives Security-Bundle (SWG, CASB, ZTNA, FWaaS, DLP) — ersetzt klassische VPN/Perimeter-Architektur. ZTNA öffnet Anwendungen identitätsbasiert ohne Vollnetz-Zugang.</p>`
                }],
                quiz: [
                    q('Welche drei Kontrollkategorien werden in SY0-701 unterschieden?', ['Technisch, administrativ, physisch', 'Hard, soft, medium', 'Network, host, application', 'Internal, external, hybrid'], 0, 'Kategorien (Art) vs. Wirkung (preventive/detective/corrective/...).'),
                    q('Eine Kamera mit Schild „Sie werden gefilmt" wirkt primär ...', ['präventiv', 'detektiv', 'abschreckend (deterrent)', 'kompensierend'], 2, 'Sichtbare Kameras + Schild signalisieren Risiko und schrecken ab.'),
                    q('Was bedeutet das „I" in CIA?', ['Identity', 'Integrity', 'Inspection', 'Isolation'], 1, 'Confidentiality, Integrity, Availability.'),
                    q('Welche Kontrolle ist eine kompensierende Kontrolle?', ['Verschlüsselung der Disks', 'Mikrosegmentierung als Ersatz für nicht patchbare Legacy-Server', 'Schulung der Mitarbeiter', 'Backups'], 1, 'Kompensierend = Ersatzmaßnahme, wenn die primäre Kontrolle nicht umsetzbar ist.'),
                    q('Was ist Non-Repudiation?', ['Daten sind verfügbar', 'Eine Aktion kann nicht plausibel abgestritten werden', 'Datenintegrität ist gewährleistet', 'Daten sind vertraulich'], 1, 'Erreicht durch digitale Signaturen + lückenloses Audit-Logging.'),
                    q('Welche Komponente eines CAB?', ['Compliance Auditor Board', 'Change Advisory Board (genehmigt nicht-trivialen Changes)', 'Cyber Attack Bot', 'Critical Application Baseline'], 1, 'Im Change-Management formales Gremium für Risikobewertung von Changes.'),
                    q('Welcher Change-Typ erfordert kein vollständiges CAB?', ['Standard Change', 'Emergency Change ohne Kontrolle', 'Major Change', 'Catastrophic Change'], 0, 'Standard Changes sind vorgenehmigt, niedriges Risiko, repetitiv (z. B. Drucker installieren).'),
                    q('Welche Art von Kontrolle ist ein Awareness-Training?', ['Technisch', 'Administrativ', 'Physisch', 'Logisch'], 1, 'Administrativ (auch „managerial"). Policies, Schulungen, Verfahren.'),
                    q('Welcher Begriff beschreibt das Mindestmaß an Berechtigungen, das ein User für seinen Job braucht?', ['Need-to-know', 'Least Privilege', 'Separation of Duties', 'Defense in Depth'], 1, 'Least Privilege = nur das Notwendige. Need-to-know ist verwandt, aber datenbezogen.'),
                    q('Was ist Defense in Depth?', ['Eine Firewall reicht', 'Mehrere überlappende Schutzschichten', 'Air-Gap', 'Single Sign-On'], 1, 'Mehrschichtige Verteidigung — Versagen einer Schicht kompromittiert nicht das Gesamtsystem.'),
                    q('Welche Kontrolle ist primär detektiv?', ['Türschloss', 'Verschlüsselung', 'IDS/SIEM', 'Backup'], 2, 'Intrusion Detection und SIEM erkennen Vorgänge nach ihrem Eintreten.'),
                    q('Was misst Authentizität?', ['Dass Daten unverändert sind', 'Dass eine Identität echt ist', 'Dass Daten geheim sind', 'Dass Daten verfügbar sind'], 1, 'Authentizität = Echtheit der behaupteten Identität, nachgewiesen durch Faktoren (Wissen/Besitz/Sein).'),
                    q('Welcher Authentifizierungsfaktor ist phishing-resistent?', ['SMS-OTP', 'TOTP-App', 'FIDO2/WebAuthn', 'Sicherheitsfrage'], 2, 'WebAuthn bindet Credential an Origin (Domain) — Reverse-Proxy-Phishing schlägt fehl.'),
                    q('Welche AAA-Komponente liefert das Audit-Logging?', ['Authentication', 'Authorization', 'Accounting', 'Availability'], 2, 'AAA = Authentication, Authorization, Accounting. Accounting = wer hat wann was getan.'),
                    q('Welche Konvention beschreibt RBAC?', ['Owner-basiert', 'Rollen-basiert', 'Attributbasiert', 'Lattice-basiert'], 1, 'RBAC weist Berechtigungen über Rollen zu, nicht direkt an User.'),
                    q('Welcher AES-Modus ist AEAD und in TLS 1.3 zugelassen?', ['AES-ECB', 'AES-GCM', 'AES-CFB ohne MAC', 'AES-OFB'], 1, 'AES-GCM kombiniert CTR + GHASH-MAC zu Authenticated Encryption.'),
                    q('Welche RSA-Schlüsselgröße ist 2026 das absolute Minimum?', ['1024 Bit', '2048 Bit', '512 Bit', '768 Bit'], 1, 'NIST SP 800-131A r3: RSA-2048 bis 2030, danach RSA-3072+.'),
                    q('Welcher Algorithmus liefert Forward Secrecy in TLS 1.3?', ['Statisches RSA-Key-Exchange', 'ECDHE / DHE', 'AES-CBC', 'SHA-256'], 1, 'Ephemerale Diffie-Hellman-Schlüsselaustausche garantieren PFS.'),
                    q('Welcher Algorithmus ist für Passwort-Hashing aktuell empfohlen?', ['MD5', 'SHA-256', 'Argon2id', 'CRC32'], 2, 'Argon2id (RFC 9106): memory-hard, GPU-resistent. bcrypt/scrypt sind akzeptable Alternativen.'),
                    q('Welche PKI-Komponente listet widerrufene Zertifikate?', ['CRL', 'CSR', 'CT-Log', 'CRT-DB'], 0, 'Certificate Revocation List (RFC 5280). OCSP ist die Echtzeit-Variante.'),
                    q('Welcher MFA-Faktor ist am schwächsten?', ['FIDO2-Hardware-Token', 'Push-with-Number-Match', 'SMS-OTP', 'TOTP-App'], 2, 'SMS ist anfällig für SIM-Swapping und SS7-Angriffe; NIST SP 800-63B stuft es als restricted ein.'),
                    q('Welche Eigenschaft hat eine digitale Signatur, die ein MAC nicht hat?', ['Schnellere Berechnung', 'Non-Repudiation über Public-Key-Verifikation', 'Symmetrischer Schlüssel', 'Geringere Schlüsselgröße'], 1, 'MAC nutzt Shared-Key — beide Parteien können MACs erzeugen — keine Non-Repudiation.'),
                    q('Welche AAA-Konvention beschreibt ein RADIUS-Server?', ['VPN-Konzentrator', 'Zentrale Authentifizierungs-/Autorisierungs-/Accounting-Instanz', 'Reverse Proxy', 'Reine DNS'], 1, 'RADIUS (RFC 2865) ist Standard für 802.1X, VPN, WLAN-Auth.'),
                    q('Welcher RFC definiert TLS 1.3?', ['RFC 5246', 'RFC 8446', 'RFC 6101', 'RFC 9000'], 1, 'TLS 1.3 = RFC 8446 (2018). RFC 5246 = TLS 1.2. RFC 9000 = QUIC.'),
                    q('Welche Eigenschaft beschreibt Need-to-know?', ['Maximaler Zugriff für alle', 'Zugriff nur auf Daten, die zur Aufgabenerfüllung nötig sind', 'Zugriff für Admins immer', 'Zugriff nur für Auditoren'], 1, 'Need-to-know fokussiert auf Daten-Zugriff; Least Privilege auf Berechtigungen.'),
                    q('Was beschreibt Separation of Duties?', ['Trennung kritischer Aufgaben auf mehrere Personen, um Betrug zu verhindern', 'Trennung von Hard- und Software', 'Trennung von Dev und Test', 'Trennung von Storage'], 0, 'SoD = z. B. Anforderer ≠ Genehmiger ≠ Ausführer. Standard im Finance/Procurement.'),
                    q('Welcher Begriff beschreibt das Prinzip, kritische Aufgaben rotativ zu vergeben?', ['Job Rotation', 'Cross-Training', 'Mandatory Vacation', 'Dual Control'], 0, 'Job Rotation deckt Insider-Fraud auf (verschwindet, wenn ein anderer die Position übernimmt).'),
                    q('Welche Praxis ist Mandatory Vacation?', ['Erzwungener Urlaub kritischer Mitarbeiter, um verborgene Manipulationen aufzudecken', 'Krankenstandsplanung', 'Tarifrecht', 'Schichtplanung'], 0, 'Während Abwesenheit übernehmen Vertreter — verborgene Schemata werden sichtbar.'),
                    q('Welche Eigenschaft hat Defense in Depth?', ['Eine starke Schicht reicht', 'Mehrere unabhängige Schutzschichten', 'Reine Hardware-Verteidigung', 'Reine Cloud-Verteidigung'], 1, 'Versagen einer Schicht kompromittiert nicht das Gesamtsystem.'),
                    q('Welcher Begriff beschreibt das Setzen mehrerer paralleler Kontrollen mit unterschiedlichen Mechanismen?', ['Defense in Diversity', 'Single Layer', 'Air Gap allein', 'Reverse Proxy allein'], 0, 'Defense in Diversity = unterschiedliche Hersteller/Mechanismen, um homogene Schwachstellen zu vermeiden.'),
                    q('Welcher Begriff beschreibt eine kompensierende Kontrolle?', ['Ersatzmaßnahme, wenn die primäre Kontrolle nicht implementierbar ist', 'Doppelte Backups', 'TLS-Erweiterung', 'Hardware-Update'], 0, 'Z. B. Mikrosegmentierung statt Patch für nicht-patchbares Legacy.'),
                    q('Was ist ein Standard Change?', ['Pre-approved, low-risk, repetitiver Change', 'Notfall-Change', 'Major Change', 'Strategischer Change'], 0, 'ITIL 4: Standard Changes benötigen kein CAB — sie folgen einem zugelassenen Verfahren.'),
                    q('Welche Phase folgt im Change Mgmt nach Approval?', ['Test', 'Deployment', 'Post-Implementation Review', 'Backout'], 1, 'Approval → Deployment → Post-Implementation Review. Backout-Plan ist im Change-Record dokumentiert.'),
                    q('Welche Eigenschaft hat ein Backout-Plan?', ['Doku zur sicheren Rückabwicklung eines Changes bei Fehlschlag', 'Marketing-Plan', 'Produktroadmap', 'Capex-Plan'], 0, 'Pflicht im Change-Record. Ohne Backout-Plan keine Production-Approval.'),
                    q('Welche Eigenschaft hat ein Detective Control?', ['Verhindert Vorfälle', 'Erkennt Vorfälle (Logs, IDS, Anomaly-Detection)', 'Behebt Schäden', 'Schreckt Angreifer ab'], 1, 'Detective = Erkennen. Preventive = Verhindern.'),
                    q('Welche Kontrolle ist eine Directive Control?', ['Policy / Standard / Verfahren', 'Hardware-Firewall', 'Backup', 'Patch'], 0, 'Directive ("leitend") = formale Vorgabe (Policy, Procedure).'),
                    q('Welche Eigenschaft hat eine Corrective Control?', ['Korrigiert Schaden nach Vorfall (Restore aus Backup, Patch nach Exploit)', 'Verhindert Schaden', 'Erkennt Schaden', 'Schreckt ab'], 0, 'Corrective = nach Eintritt des Vorfalls.'),
                    q('Welche Eigenschaft hat eine Recovery Control?', ['Stellt Betrieb wieder her (BCDR, Backup-Restore)', 'Verhindert Schaden', 'Erkennt Schaden', 'Schreckt ab'], 0, 'Recovery ist Subkategorie von Corrective — fokussiert auf Wiederherstellung.'),
                    q('Welche Eigenschaft hat ein Deterrent Control?', ['Verhindert Angriff durch Abschreckung (Schild, Gesetzeshinweis)', 'Erkennt Angriff', 'Behebt Schaden', 'Stellt Betrieb wieder her'], 0, 'Deterrent = Abschreckung, signalisiert Risiko/Strafe.'),
                    q('Welche Eigenschaft beschreibt einen Trust Boundary?', ['Grenze zwischen Zonen unterschiedlichen Vertrauens, an der validiert/autorisiert werden muss', 'Backup-Schwelle', 'TLS-Zertifikatsfrist', 'Patch-Fenster'], 0, 'Threat-Modeling-Konzept: an jeder Trust Boundary muss authentifiziert + validiert werden.'),
                    q('Welcher Begriff beschreibt das Risiko, dass ein User über Rollenwechsel hinweg über-privilegiert bleibt?', ['Permission Creep / Privilege Creep', 'Rollback', 'Forking', 'Replay'], 0, 'Mitigation: regelmäßige Access Reviews / Recertification.'),
                    q('Welche Praxis erzwingt Privilegien nur für definierte Zeitfenster?', ['Just-in-Time-Access (JIT) / Privileged Access Management', 'Static SSH-Keys', 'Local Admin-Privilege für alle', 'Default-Allow-Firewall'], 0, 'JIT-Zugänge (z. B. Azure PIM, BeyondTrust) reduzieren standing privileges drastisch.'),
                    q('Was ist ein Privileged Access Management (PAM)?', ['Zentrale Lösung zur Verwaltung, Rotation und Audit privilegierter Konten', 'Backup-Tool', 'CDN', 'WAF'], 0, 'PAM-Vendoren: CyberArk, Delinea, BeyondTrust, HashiCorp Vault.'),
                    q('Welche Anforderung leitet sich aus PCI-DSS für privilegierte Zugriffe ab?', ['MFA + Session-Logging', 'Klartext-Passwörter', 'Open SSH', 'Verbot von Logging'], 0, 'PCI-DSS v4 Req. 8 + 10: MFA + lebenslanges Audit-Log für CDE-Zugriffe.'),
                    q('Welche Compliance-Konzepte adressiert SoC 2?', ['Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy', 'IT-Service-Mgmt', 'Reine Datenschutzprüfung', 'Reine Cloud-Prüfung'], 0, 'AICPA-Standard für Service-Organisationen.'),
                    q('Welche Datenklasse erfordert höchste Schutzstufe?', ['Public', 'Internal', 'Restricted/Confidential', 'Anonymized'], 2, 'Restricted/Confidential erfordert Verschlüsselung, MFA, DLP, Audit-Logging.'),
                    q('Welcher Begriff beschreibt die formale Risikoakzeptanz?', ['Risk Acceptance mit dokumentiertem Sign-off des Risk Owners', 'Risk Ignoring', 'Risk Hiding', 'Risk Forgetting'], 0, 'ISO 31000: Acceptance ist legitim, aber muss formal dokumentiert sein.'),
                    q('Welche Kontrolle ist KEINE administrative Kontrolle?', ['Acceptable Use Policy', 'Background Check', 'Verschlüsselung der Festplatten', 'Awareness-Training'], 2, 'Festplatten-Verschlüsselung ist technisch.'),
                    q('Welche Praxis schreibt Acceptable Use Policy vor?', ['Erlaubte und unzulässige Nutzung von Unternehmens-IT', 'Backup-Schedule', 'TLS-Cipher', 'BIOS-Passwort'], 0, 'AUP ist administrative Kontrolle und Voraussetzung für arbeitsrechtliche Sanktionierung.'),
                    q('Welche Eigenschaft hat ein Security Baseline?', ['Mindest-Härtungsstandard für Systeme', 'Marketing-Broschüre', 'Sales-Plan', 'Cloud-Region'], 0, 'CIS Benchmarks, STIGs sind etablierte Baselines.')
                ]
            },
            {
                id: 'threats',
                title: 'Kapitel 2 — Threats, Vulnerabilities & Mitigations',
                summary: 'Threat-Actors, Angriffsvektoren, Malware-Klassen, Social Engineering, Mitigation-Patterns.',
                pages: [{
                    title: 'Bedrohungslandschaft',
                    html: `<h4>Threat Actors</h4>
<ul><li>Nation-State (APT) — hochressourciert, Spionage/Sabotage.</li>
<li>Organized Crime — Ransomware, Banking-Trojans.</li>
<li>Hacktivists — Ideologie.</li>
<li>Insider Threats (malicious / unintentional).</li>
<li>Script-Kiddies, Competitors, Shadow IT.</li></ul>
<h4>Malware-Klassen</h4>
<p>Virus, Worm, Trojan, RAT, Rootkit, Bootkit, Logic Bomb, Spyware, Adware, Ransomware, Wiper, Cryptominer, Keylogger.</p>
<h4>Social Engineering</h4>
<p>Phishing, Spear-Phishing, Whaling, Vishing, Smishing, Pretexting, Baiting, Tailgating, Watering-Hole.</p>
<h4>Mitigations</h4>
<p>Patch-Management, Segmentation, MFA, Email-Filter (DMARC/DKIM/SPF), Awareness, Application Allowlisting.</p>`
                }, {
                    title: 'Application-Layer-Angriffe',
                    html: `<h4>OWASP Top 10 (2021)</h4>
<ol><li>A01 Broken Access Control</li><li>A02 Cryptographic Failures</li><li>A03 Injection (SQLi, OS-Cmd, LDAP)</li><li>A04 Insecure Design</li><li>A05 Security Misconfiguration</li><li>A06 Vulnerable & Outdated Components</li><li>A07 Identification & Authentication Failures</li><li>A08 Software & Data Integrity Failures (Supply-Chain)</li><li>A09 Security Logging & Monitoring Failures</li><li>A10 Server-Side Request Forgery (SSRF)</li></ol>
<h4>Supply-Chain</h4>
<p>SolarWinds (2020), 3CX (2023), XZ-Utils-Backdoor (2024). Mitigation: SBOM (CycloneDX/SPDX), signierte Artefakte (Sigstore), Reproducible Builds, Pinning.</p>
<h4>Race Conditions / TOCTOU</h4>
<p>Time-of-Check vs. Time-of-Use — Attacker manipuliert Resource zwischen Check und Use. Mitigation: atomic operations, file-locks, capability-based access.</p>`
                }, {
                    title: 'Netzwerk- und kryptografische Angriffe',
                    html: `<h4>On-Path-Angriff (Man-in-the-Middle)</h4>
<p>ARP-Spoofing, DHCP-Spoofing, Rogue-AP, ICMP-Redirect. Mitigation: 802.1X, DHCP-Snooping, Dynamic ARP Inspection, BPDU-Guard.</p>
<h4>DNS-Angriffe</h4>
<ul><li>Cache-Poisoning (Kaminsky 2008) — DNSSEC mitigiert.</li><li>DNS-Tunneling — Exfil via TXT/CNAME-Records.</li><li>NXDOMAIN-Hijacking via Typo-Squatting.</li></ul>
<h4>TLS/SSL-Angriffe</h4>
<p>POODLE (SSL 3.0), BEAST (TLS 1.0 CBC), CRIME/BREACH (Compression), Heartbleed (CVE-2014-0160). Mitigation: TLS 1.2 (mit AEAD) oder TLS 1.3.</p>
<h4>Replay & Downgrade</h4>
<p>Replay-Schutz via Nonce/Sequence-Number, Downgrade-Schutz via TLS_FALLBACK_SCSV und HSTS.</p>`
                }, {
                    title: 'Operationelle Bedrohungen',
                    html: `<h4>Hardware-Bedrohungen</h4>
<ul><li>Malicious USB (Rubber Ducky, BadUSB) — emulieren HID-Tastatur.</li><li>Cold Boot Attack — RAM-Reste auslesbar nach Reboot.</li><li>Evil Maid — physischer Zugriff in Hotel/Gebäude.</li><li>Hardware-Implants (Supermicro-Vorwürfe, Fake-Cisco).</li></ul>
<h4>Cloud-spezifische Bedrohungen</h4>
<p>S3-Bucket-Misconfig, IAM-Privilege-Escalation, OAuth-Token-Theft, Shadow-IT, IMDS-Abuse (SSRF gegen 169.254.169.254).</p>
<h4>Mobile</h4>
<p>Jailbreak/Rooting umgeht Plattform-Sandbox, Side-Loading, Sideloaded malicious certs (MDM-Phishing).</p>
<h4>OT/ICS-Bedrohungen</h4>
<p>Stuxnet (2010), TRITON (2017), Industroyer2 (2022). Modbus, DNP3, S7 sind ohne Auth/Crypto designed — Segmentierung ist Pflicht (Purdue-Modell).</p>`
                }],
                quiz: [
                    q('Was ist eine SYN-Flood?', ['UDP-Reflection', 'TCP-Half-Open-Sessions zur Erschöpfung von Server-Ressourcen', 'ICMP-Flood', 'DNS-Cache-Vergiftung'], 1, 'Mitigation: SYN-Cookies, Rate-Limiting, SYN-Proxy.'),
                    q('Welche E-Mail-Standards verhindern Spoofing?', ['SPF, DKIM, DMARC', 'POP3, IMAP, SMTP', 'TLS, SSL, S/MIME', 'PGP, GPG, OPENPGP'], 0, 'SPF prüft Sender-IP, DKIM signiert, DMARC bündelt + Reporting.'),
                    q('Was ist Whaling?', ['Phishing gegen C-Level / hochrangige Ziele', 'Massenphishing', 'Telefon-Phishing', 'SMS-Phishing'], 0, 'Whaling = gezielt gegen Executives. Vishing = Voice. Smishing = SMS.'),
                    q('Welche Malware-Klasse löscht Daten ohne Recovery-Möglichkeit?', ['Ransomware', 'Wiper', 'Trojan', 'Spyware'], 1, 'Wiper (z. B. NotPetya, Olympic Destroyer) — keine Recovery-Funktion, oft als Ransomware getarnt.'),
                    q('Was ist Tailgating?', ['Folgen einer berechtigten Person durch eine Sicherheitstür', 'Beifahrer im Auto', 'TCP-Session-Hijacking', 'WLAN-Sniffing'], 0, 'Mitigation: Mantraps, Sicherheitspersonal, Awareness.'),
                    q('SQL-Injection wird im Code primär verhindert durch ...', ['Längeren Verbindungs-Timeout', 'Parameterisierte Statements / Prepared Statements', 'Mehr RAM', 'IPv6'], 1, 'Trennung von Code und Daten verhindert Injection.'),
                    q('Was ist ein Zero-Day?', ['Bekannte, noch nicht gepatchte Schwachstelle', 'Schwachstelle, die dem Hersteller noch nicht bekannt oder noch ungepatched ist (0 Tage Vorwarnung)', 'IPv6-Schwachstelle', 'Air-Gap-Lücke'], 1, '0-Day = Hersteller hatte noch keine Zeit zu patchen.'),
                    q('Welcher Indikator deutet auf Domain Generation Algorithm (DGA)?', ['Statische C2-IP', 'Hohe Anzahl NXDOMAIN-Antworten zu pseudo-zufälligen Domains', 'TLS 1.3', 'IPv6-Routing'], 1, 'DGA generiert massenhaft Pseudo-Domains; nur wenige sind beim Angreifer registriert → viele NXDOMAIN.'),
                    q('Was ist ein Watering-Hole-Angriff?', ['Direkter Phishing per Mail', 'Angreifer kompromittiert eine Website, die das Opfer regelmäßig besucht', 'WLAN-Spoofing', 'USB-Drop'], 1, 'Indirekter Angriff über vertrauenswürdige Drittseiten; APT-typisch.'),
                    q('Welche Malware-Eigenschaft beschreibt einen Wurm?', ['Manuelle Verbreitung', 'Eigenständige Selbstreplikation über Netzwerk', 'Erfordert User-Klick', 'Verschlüsselt nur Dokumente'], 1, 'Wurm verbreitet sich autonom (z. B. WannaCry über SMBv1).'),
                    q('Welche Kontrolle adressiert Insider-Threats am direktesten?', ['DDoS-Schutz', 'UEBA + Separation of Duties + Privileged Access Management', 'Antivirus', 'TLS 1.3'], 1, 'Insider werden durch Verhaltensanalyse, Funktionstrennung und PAM/JIT-Access erschwert.'),
                    q('Was ist Pretexting?', ['Vortäuschen eines plausiblen Kontexts (z. B. „IT-Support"), um Informationen zu erlangen', 'TLS-Handshake', 'Backup-Strategie', 'Hashing-Algorithmus'], 0, 'Klassische Social-Engineering-Technik.'),
                    q('Was ist eine Logic Bomb?', ['Code, der bei einem Trigger (Zeit, Event) Schaden auslöst', 'DDoS-Tool', 'Hashfunktion', 'Krypto-Algorithmus'], 0, 'Beispiel: Mitarbeiter platziert verzögerten Lösch-Code, ausgelöst durch Account-Deaktivierung.'),
                    q('Welche OWASP-Top-10-2021-Position hat Broken Access Control?', ['A01', 'A03', 'A05', 'A10'], 0, 'Broken Access Control wurde 2021 auf Platz 1 hochgestuft.'),
                    q('Welche OWASP-Top-10-Position adressiert Server-Side Request Forgery?', ['A05', 'A10', 'A07', 'A03'], 1, 'SSRF wurde in 2021 als A10 neu aufgenommen.'),
                    q('Was beschreibt eine TOCTOU-Schwachstelle?', ['Time-of-Check vs. Time-of-Use — Race-Condition zwischen Validierung und Nutzung', 'TLS-Renegotiation', 'Backup-Window', 'Hash-Kollision'], 0, 'Klassische Race-Condition; CWE-367.'),
                    q('Welcher Angriff macht ARP-Einträge im Switch-Subnet falsch?', ['ARP-Spoofing', 'DNS-Spoofing', 'TLS-Replay', 'OAuth-Phishing'], 0, 'Mitigation: Dynamic ARP Inspection (Cisco), Statische ARP, 802.1X.'),
                    q('Welcher TLS-Angriff war primär CBC-bezogen in TLS 1.0?', ['BEAST', 'POODLE', 'Heartbleed', 'Logjam'], 0, 'BEAST nutzte CBC-Initialvektor in TLS 1.0; gemildert durch RC4 oder TLS 1.1+.'),
                    q('Welche CVE-Nummer gehört zu Heartbleed?', ['CVE-2014-0160', 'CVE-2017-5754', 'CVE-2021-44228', 'CVE-2019-19781'], 0, 'OpenSSL Heartbeat-Extension Out-of-bounds-Read.'),
                    q('Welche CVE-Nummer gehört zu Log4Shell?', ['CVE-2021-44228', 'CVE-2014-0160', 'CVE-2020-1472', 'CVE-2017-0144'], 0, 'Log4j JNDI-Lookup-RCE, Dezember 2021.'),
                    q('Welche CVE-Nummer gehört zu EternalBlue (SMBv1)?', ['CVE-2017-0144', 'CVE-2014-0160', 'CVE-2021-44228', 'CVE-2019-0708'], 0, 'EternalBlue — Exploit von WannaCry/NotPetya.'),
                    q('Welche Eigenschaft hat ein Rootkit?', ['Versteckt Präsenz auf Kernel- oder Boot-Ebene', 'Sperrt Daten und fordert Lösegeld', 'Spioniert Tastatureingaben', 'Sendet Werbung'], 0, 'Kernel-Rootkits manipulieren Syscalls; Bootkits laufen vor dem OS.'),
                    q('Welche Eigenschaft hat ein RAT?', ['Remote Access Trojan — ermöglicht interaktive Fernsteuerung', 'Backup-Tool', 'TLS-Library', 'Hashing-Algorithmus'], 0, 'RATs (z. B. njRAT, Quasar, AsyncRAT) — erlauben Filetransfer, Webcam, Keylog.'),
                    q('Welche Eigenschaft hat Spyware?', ['Sammelt User-Aktivitätsdaten ohne Zustimmung', 'Löscht Daten unwiederbringlich', 'Verschlüsselt Daten und fordert Lösegeld', 'Sendet DDoS-Tränen'], 0, 'Browser-Telemetrie ohne Consent kann ebenfalls als Spyware klassifiziert werden.'),
                    q('Welche Eigenschaft hat ein Bootkit gegenüber einem Rootkit?', ['Wird vor dem OS-Kernel geladen (MBR/UEFI/Boot-Sektor)', 'Wird nur im Browser ausgeführt', 'Benötigt Admin-Rechte zur Laufzeit nicht', 'Funktioniert nur online'], 0, 'Bootkit überlebt Reinstallation; Mitigation: Secure Boot, Measured Boot.'),
                    q('Welche Eigenschaft hat eine Cryptojacker-Malware?', ['Nutzt Opfer-CPU/GPU heimlich für Krypto-Mining', 'Verschlüsselt Dateien', 'Löscht Logs', 'Sendet Spam'], 0, 'Indikator: ungewöhnlich hohe CPU/GPU-Last, häufig in JavaScript (CoinHive) oder Container-Workloads.'),
                    q('Welcher Indikator deutet auf Phishing-Webseite?', ['Punycode-Homoglyph in der Domain', 'TLS 1.3', 'IPv6-Adresse', 'Lange URL allein'], 0, 'IDN-Homograph (xn--...): paypal.com vs. paypаl.com (kyrillisches a).'),
                    q('Welcher Standard adressiert Spoofing-Schutz für E-Mail-Headers?', ['DMARC + DKIM + SPF', 'TLS 1.2', 'IPsec', 'WPA3'], 0, 'SPF (envelope-from), DKIM (signiert Header/Body), DMARC (Policy + Reporting).'),
                    q('Welche Eigenschaft hat DKIM?', ['Kryptografische Signatur des E-Mail-Headers/Body über DNS-publizierten Schlüssel', 'IP-Whitelist', 'Reverse-DNS-Prüfung', 'Greylisting'], 0, 'DKIM-RFC 6376; Public Key liegt im DNS als TXT-Record.'),
                    q('Welche Eigenschaft hat SPF?', ['Erlaubte Sender-IPs einer Domain in DNS', 'Signiert Body', 'Prüft TLS', 'Macht Greylisting'], 0, 'SPF-RFC 7208 — IP-basierte Envelope-From-Prüfung.'),
                    q('Welche Eigenschaft hat DMARC?', ['Policy + Reporting auf Basis von SPF/DKIM-Alignment', 'Hardware-Schutz', 'TLS-Erweiterung', 'Backup'], 0, 'DMARC-RFC 7489 (informational); aggregierte rua-/forensische ruf-Reports.'),
                    q('Welche Eigenschaft hat Vishing?', ['Voice-/Telefon-basiertes Phishing', 'SMS-Phishing', 'Email-Phishing', 'Watering-Hole'], 0, 'Vishing — Voice + Phishing. Häufig kombiniert mit Caller-ID-Spoofing.'),
                    q('Welche Eigenschaft hat Smishing?', ['SMS-basiertes Phishing', 'Voice-Phishing', 'Watering-Hole', 'Whaling'], 0, 'SMS + Phishing. Kurze Links, oft mit URL-Shortenern.'),
                    q('Welche Eigenschaft hat Pharming?', ['Manipulation der DNS-Auflösung, um Opfer auf Fake-Sites umzuleiten', 'CDN-Optimierung', 'TLS-Pinning', 'WAF-Bypass'], 0, 'Lokales Hosts-File oder DNS-Server-Hijack — Opfer wird umgeleitet ohne Klick.'),
                    q('Welche Eigenschaft hat Typosquatting?', ['Registrieren ähnlich aussehender Domains für Phishing', 'Backup-Strategie', 'Patch-Methode', 'TLS-Pinning'], 0, 'gooogle.com, paypa1.com — oft mit IDN/Homoglyph kombiniert.'),
                    q('Welche Mitigation reduziert Macro-basierte Phishing-Angriffe?', ['Disable Office-Macros + Mark-of-the-Web (MOTW) durchsetzen', 'IPv6 deaktivieren', 'Mehr DNS-Server', 'TLS 1.0 erzwingen'], 0, 'MOTW kennzeichnet aus dem Internet bezogene Files; Office blockiert Macros automatisch.'),
                    q('Welche Mitigation adressiert USB-basierte HID-Angriffe (BadUSB)?', ['USB-Port-Kontrolle (Whitelist via DeviceID), USBGuard, BIOS-Disable', 'TLS 1.3', 'IPv6', 'WAF'], 0, 'Hardware-IDs allein nicht ausreichend (kann gespoofed werden); USB-Disabling oder Hardware-Whitelist.'),
                    q('Welche Eigenschaft hat eine Living-off-the-Land-Attack?', ['Nutzung legitimer OS-Tools (PowerShell, certutil, wmic) statt eigener Malware', 'Reine Hardware-Attacke', 'Reine Cloud-Attacke', 'Reine WLAN-Attacke'], 0, 'LOLBAS-Project listet missbräuchlich nutzbare Windows-Binaries; Detection via Process-Lineage.'),
                    q('Welche Mitigation begrenzt PowerShell-Missbrauch?', ['Constrained Language Mode + Script Block Logging + AMSI', 'TLS 1.0 erzwingen', 'IPv6 deaktivieren', 'NTP-Server tauschen'], 0, 'PowerShell 5+ ScriptBlockLogging + AMSI-Integration deckt Obfuskation auf.'),
                    q('Welche Eigenschaft hat eine Supply-Chain-Attack?', ['Kompromittierung legitimer Software/Lieferant, die dann Endkunden infiziert', 'Lokaler Phishing-Angriff', 'WLAN-Crack', 'Cloud-Misconfig'], 0, 'SolarWinds, 3CX, XZ-Utils, Kaseya — hohe Reichweite, vertrauenswerte Quelle.'),
                    q('Welche Mitigation adressiert Supply-Chain-Risiken?', ['SBOM (CycloneDX/SPDX) + signierte Artefakte (Sigstore) + Reproducible Builds', 'Mehr Bandbreite', 'IPv6 deaktivieren', 'NTP-Server tauschen'], 0, 'SBOM-Pflicht in EU-CRA, US-EO 14028.'),
                    q('Welche Eigenschaft hat ein Indicator of Compromise (IoC)?', ['Bekannter forensischer Artefakt (Hash, IP, Domain) eines erfolgten Angriffs', 'Behavior-Pattern', 'Pen-Test-Tool', 'Threat-Modeling-Diagramm'], 0, 'IoC altert schnell; IoA (Behavior) ist robuster.'),
                    q('Welche Eigenschaft hat ein TTP?', ['Tactics, Techniques, Procedures — Verhaltensmuster eines Threat Actors', 'Hash', 'IP', 'Domain'], 0, 'TTPs sind schwer zu ändern (Pyramid of Pain — oberste Stufe).'),
                    q('Welcher Begriff beschreibt einen Indicator of Attack (IoA)?', ['Verhaltensbasierter Indikator eines laufenden/versuchten Angriffs', 'Hash', 'IP', 'Domain'], 0, 'IoA fokussiert auf TTPs, nicht auf Artefakte.'),
                    q('Welche Mitigation reduziert Ransomware-Risiko am wirksamsten?', ['Offline/immutable Backups + Awareness + EDR + MFA + Patching', 'Mehr DNS-Server', 'IPv6 deaktivieren', 'Disable IPv4'], 0, 'CISA #StopRansomware Guide — Mehrfachmaßnahmen, kein Einzelpatch.'),
                    q('Welche Eigenschaft hat Double Extortion?', ['Daten werden vor Verschlüsselung exfiltriert und Lösegeld doppelt erpresst (Schlüssel + Verschwiegenheit)', 'Reines Lösegeld', 'Nur Backup-Löschung', 'Nur Hardware-Sabotage'], 0, 'Standard-Vorgehen seit Maze (2019); Triple Extortion ergänzt DDoS-Druck.'),
                    q('Welche Eigenschaft hat eine Wiper-Malware?', ['Zerstört Daten ohne Recovery-Option (NotPetya, Olympic Destroyer, Industroyer2)', 'Verschlüsselt mit Recovery-Schlüssel', 'Sendet nur Spam', 'Mined nur Krypto'], 0, 'Häufig als Ransomware getarnt; Ziel ist Sabotage.'),
                    q('Welche Eigenschaft hat eine Drive-By-Compromise?', ['Browser-Exploit beim Besuch einer kompromittierten Webseite', 'Phishing per Mail', 'WLAN-Sniffing', 'USB-Drop'], 0, 'MITRE T1189 — Browser/Plugin-Schwachstelle wird automatisch ausgenutzt.'),
                    q('Welche Eigenschaft hat ein Maliciously Crafted Document?', ['Office-/PDF-Datei mit Macro/Exploit, der bei Öffnen Code ausführt', 'Reine Textdatei', 'Reines Bild', 'Audio-Format'], 0, 'PDF-JavaScript, Office-Macros, OLE-Objekte, RTF-Exploits.'),
                    q('Welche Eigenschaft hat eine BEC (Business Email Compromise)?', ['Identitätsbetrug per E-Mail gegen Geschäftsführung/Finanz, oft ohne Malware', 'Reine technische Lateral Movement', 'WLAN-Crack', 'Cloud-Patch'], 0, 'FBI IC3: BEC verursachte 2023 mehr Schaden als Ransomware. Mitigation: Out-of-Band-Verifikation, Genehmigungsworkflow.')
                ]
            },
            {
                id: 'arch_sec',
                title: 'Kapitel 3 — Security Architecture',
                summary: 'Netzwerk-Topologien, Cloud-Modelle, Hardening, Datenschutzkonzepte.',
                pages: [{
                    title: 'Architektur-Bausteine',
                    html: `<h4>Netzwerksegmentierung</h4>
<ul><li>VLANs, VRFs, Firewalls, Microsegmentation.</li>
<li>DMZ — exponierte Services hinter zweiter Firewall.</li>
<li>Screened Subnet als modernerer Begriff.</li></ul>
<h4>Cloud Service Models</h4>
<p>SaaS ⊃ PaaS ⊃ IaaS — Verantwortung nach unten zunehmend beim Kunden.</p>
<h4>Datenschutz-Konzepte</h4>
<ul><li>Data at Rest: FDE, TDE.</li><li>Data in Transit: TLS 1.3, IPsec.</li><li>Data in Use: TEE, Confidential Computing.</li></ul>
<h4>Hardening</h4>
<p>Disable unused services, secure baselines (CIS Benchmarks), Patch-Lifecycle, signierte Bootkette.</p>`
                }, {
                    title: 'Identity & Access Architecture',
                    html: `<h4>Federation</h4>
<p>SAML 2.0 (XML, Enterprise), OAuth 2.0/2.1 (Authorization-Framework), OpenID Connect (Identity-Layer auf OAuth). SCIM (RFC 7644) für User-Provisioning.</p>
<h4>SSO</h4>
<p>IdP (Okta, Entra ID, PingFederate, Keycloak) → SP. Reduziert Passwort-Wiederverwendung; erhöht Impact bei IdP-Kompromittierung → MFA + Conditional Access Pflicht.</p>
<h4>Conditional Access</h4>
<ul><li>Signale: User-Risk, Sign-in-Risk, Device-Compliance, Location, App.</li><li>Aktionen: Block, MFA fordern, Session-Limit.</li></ul>
<h4>Directory Services</h4>
<p>Active Directory (LDAP/Kerberos), Azure Entra ID (Cloud-native), LDAP-RFC 4511. Tier-Modell: Tier 0 (DCs) ≠ Tier 1 (Server) ≠ Tier 2 (Workstations).</p>`
                }, {
                    title: 'Resilience & Recovery',
                    html: `<h4>Hochverfügbarkeit</h4>
<ul><li>Active-Active vs. Active-Passive.</li><li>Load-Balancer (Layer 4 vs. Layer 7).</li><li>Anycast für globale Lastverteilung.</li></ul>
<h4>Backup-Strategie 3-2-1-1-0</h4>
<p>3 Kopien, 2 Medien, 1 offsite, 1 immutable/offline, 0 Backup-Fehler bei Restore-Test.</p>
<h4>Site-Typen</h4>
<table><tr><th>Typ</th><th>RTO</th><th>Kosten</th></tr><tr><td>Hot</td><td>Minuten</td><td>Hoch</td></tr><tr><td>Warm</td><td>Stunden</td><td>Mittel</td></tr><tr><td>Cold</td><td>Tage</td><td>Niedrig</td></tr></table>
<h4>BCP/DRP</h4>
<p>BCP = Business Continuity (Prozesse), DRP = Disaster Recovery (IT). BIA bestimmt RTO/RPO. Übungen: Tabletop, Walkthrough, Simulation, Parallel, Full-Interruption.</p>`
                }, {
                    title: 'Mobile, IoT, OT, Embedded',
                    html: `<h4>Mobile</h4>
<p>MDM/UEM (Intune, Jamf, Workspace ONE). BYOD vs. COPE vs. CYOD. Container/Workspace trennt privat von geschäftlich.</p>
<h4>IoT-Sicherheit</h4>
<ul><li>Default-Credentials ändern.</li><li>Firmware signiert + automatisch updaten (EU-CRA-Pflicht).</li><li>Segmentation in eigenes IoT-VLAN.</li><li>NIST IR 8259 — Foundational Cybersecurity Activities.</li></ul>
<h4>OT/ICS (Purdue-Modell)</h4>
<p>Level 0 (Sensoren/Aktoren) … Level 5 (Enterprise). DMZ zwischen Level 3 und 4. Strikte Asymmetrie: IT → OT erlaubt, OT → IT minimal. IEC 62443 Industrial Cybersecurity.</p>
<h4>Embedded-Constraints</h4>
<p>Geringer RAM/Flash, oft kein TLS-Stack — LwM2M, CoAP-DTLS, OSCORE als leichte Alternativen.</p>`
                }],
                quiz: [
                    q('Welcher Anwendungsfall ist klassisch für TPM?', ['VPN-Routing', 'Speichern des BitLocker-Volume-Master-Keys gebunden an die Hardware', 'WAF-Funktion', 'DNS-Auflösung'], 1, 'TPM versiegelt Schlüssel an PCR-Werte; ausgebaute Disk in fremder Hardware ist unlesbar.'),
                    q('Welcher Verschlüsselungsbegriff schützt Daten gegen physischen Diebstahl der Festplatten?', ['TLS', 'DEP', 'Full Disk Encryption (FDE) bzw. Transparent Data Encryption (TDE)', 'Homomorphic Encryption'], 2, 'Data at Rest. Homomorph adressiert Data in Use.'),
                    q('Was ist eine DMZ?', ['Demilitarized Zone — entkoppelter Subnetz-Bereich für extern erreichbare Dienste', 'Disaster Mitigation Zone', 'Direct Memory Zone', 'Domain Multipath Zone'], 0, 'Modernere Bezeichnung: Screened Subnet.'),
                    q('Welche Hardening-Quelle liefert konkrete Baseline-Configs für OS und Software?', ['CIS Benchmarks', 'OWASP Top 10', 'PCI-DSS', 'CCM'], 0, 'CIS (Center for Internet Security) Benchmarks — branchenüblicher Hardening-Standard.'),
                    q('Welche Cloud-Variante hat die größte Kundenverantwortung?', ['SaaS', 'PaaS', 'IaaS', 'FaaS'], 2, 'IaaS: Kunde verantwortet OS, Patches, App, Daten.'),
                    q('Welche Maßnahme reduziert Lateral Movement im LAN?', ['Mehr Bandbreite', 'Mikrosegmentierung + Host-Firewalls + Identity-aware Proxies', 'IPv6', 'Disable IPv4'], 1, 'Mikrosegmentierung schränkt Ost-West-Traffic auf benötigte Pfade ein.'),
                    q('Welche Verschlüsselung ist heutiger Standard für VPN-Site-to-Site?', ['PPTP', 'L2TP ohne IPsec', 'IPsec mit IKEv2', 'GRE allein'], 2, 'IPsec/IKEv2 oder WireGuard. PPTP ist gebrochen, GRE bietet keine Verschlüsselung.'),
                    q('Welcher Mechanismus schützt eine WLAN-WPA3-Verbindung vor Offline-Wörterbuchangriffen?', ['SAE (Simultaneous Authentication of Equals)', 'WEP', 'PSK ohne Salt', 'TKIP'], 0, 'WPA3 nutzt SAE/Dragonfly statt PSK-Handshake — resistent gegen Offline-Brute-Force.'),
                    q('Welcher Cloud-Schutz erkennt missbräuchliche Berechtigungen über Cloud-Plattformen?', ['CIEM', 'CDN', 'CRC', 'CSP-VPN'], 0, 'Cloud Infrastructure Entitlement Management — Identity-Posture in Multi-Cloud.'),
                    q('Welche Eigenschaft hat ein Reverse Proxy gegenüber einem Forward Proxy?', ['Beschleunigt nur DNS', 'Steht vor Servern, terminiert Verbindungen von Clients ins Internet zur Server-Site', 'Ist immer öffentlich gestellt', 'Lehnt jeglichen TLS ab'], 1, 'Forward = vor Clients (egress). Reverse = vor Servern (ingress).'),
                    q('Welche Policy ist Voraussetzung für DLP?', ['Datenklassifizierung', 'Mehr Bandbreite', 'Mehr Kabel', 'IPv6-only'], 0, 'Ohne Klassifizierungs-Schema kennt DLP keine Trigger.'),
                    q('Welcher Standard adressiert Container-Image-Signaturen?', ['Sigstore / Cosign', 'PPTP', 'NTP', 'TFTP'], 0, 'Sigstore (OpenSSF) liefert keyless signing für OCI-Images via Fulcio + Rekor.'),
                    q('Was ist ein WAF?', ['Wireless Access Federation', 'Web Application Firewall — Layer-7-Inspektion und HTTP-Regelwerk', 'Wide Area Firewall', 'Wired Authentication Framework'], 1, 'WAF schützt vor OWASP-Top-10-Angriffsmustern (SQLi, XSS).'),
                    q('Welche Identity-Federation-Sprache nutzt SAML?', ['JSON', 'XML', 'YAML', 'Protobuf'], 1, 'SAML 2.0 ist XML-basiert (OASIS-Standard, 2005).'),
                    q('Welche Sprache nutzt OIDC für ID-Tokens?', ['XML', 'JWT (JSON)', 'Protobuf', 'YAML'], 1, 'OpenID Connect baut auf OAuth 2.0 + JWT als ID-Token auf.'),
                    q('Welche Eigenschaft hat OAuth 2.0?', ['Authorization-Framework für delegierten Zugriff (RFC 6749)', 'Authentifizierungs-Protokoll', 'Backup-Format', 'TLS-Erweiterung'], 0, 'OAuth allein liefert KEINE Identität — dafür ist OIDC zuständig.'),
                    q('Welche Eigenschaft hat SCIM?', ['User-Provisioning-Protokoll über REST (RFC 7644)', 'Backup-Protokoll', 'TLS-Erweiterung', 'WLAN-Standard'], 0, 'SCIM automatisiert JML (Joiner/Mover/Leaver) zwischen IdP und SaaS.'),
                    q('Was ist Zero Trust nach NIST SP 800-207?', ['Architektur-Modell, in dem kein impliziter Trust auf Netzwerkebene besteht und jede Anfrage validiert wird', 'VPN-Variante', 'Cloud-Provider', 'Backup-Methode'], 0, 'NIST SP 800-207 (2020): zentrale Tenets siehe Kapitel-Seite.'),
                    q('Welche Komponente erzwingt Zero-Trust-Policies an der Verbindung?', ['PEP (Policy Enforcement Point)', 'PDP', 'PA', 'PE'], 0, 'PEP setzt durch; PE/PDP entscheidet; PA konfiguriert.'),
                    q('Welche Eigenschaft hat ZTNA?', ['Identitätsbasierter App-Zugang ohne Vollnetz-Zugang — ersetzt klassisches VPN', 'WLAN-Standard', 'Backup-Methode', 'TLS-Cipher'], 0, 'ZTNA liefert App-spezifische Tunnels nach Auth + Posture-Check.'),
                    q('Welche Eigenschaft hat SASE?', ['Secure Access Service Edge — Cloud-Bundle aus SD-WAN, ZTNA, SWG, CASB, FWaaS, DLP', 'Lokales Backup', 'BIOS-Update', 'WLAN-Standard'], 0, 'Gartner-Begriff (2019); SSE ist die Security-Teilmenge.'),
                    q('Welche Eigenschaft hat CASB?', ['Cloud Access Security Broker — Sichtbarkeit + Kontrolle für SaaS-Nutzung', 'Reverse Proxy für OnPrem', 'WLAN-Authenticator', 'Backup-Tool'], 0, 'CASB-Modi: API-Modus, Forward-Proxy, Reverse-Proxy, Inline.'),
                    q('Welche Eigenschaft hat eine SWG?', ['Secure Web Gateway — URL-Filter, Malware-Scan, TLS-Inspection für ausgehenden Web-Traffic', 'WLAN-Authenticator', 'Backup-Tool', 'IPSec-Endpunkt allein'], 0, 'Cloud-SWGs ersetzen klassische Forward-Proxies.'),
                    q('Welche Eigenschaft hat IPsec im Tunnel-Modus?', ['Verschlüsselt das gesamte IP-Paket inklusive Original-Header', 'Verschlüsselt nur Payload', 'Verschlüsselt nur Layer-2', 'Verschlüsselt nur DNS'], 0, 'Tunnel-Modus = neuer IP-Header + verschlüsseltes ursprüngliches Paket. Standard für Site-to-Site.'),
                    q('Welche IKEv2-Eigenschaft ist gegenüber IKEv1 deutlich besser?', ['MOBIKE (Mobility), schnellere Rekeying, einfachere Handshakes', 'Schwächere Crypto', 'Disable Crypto', 'Reine UDP-Nutzung'], 0, 'IKEv2 (RFC 7296) hat moderneren MOBIKE-Support — ideal für mobile Endpunkte.'),
                    q('Welche Eigenschaft hat WireGuard?', ['Schlanker, opinionated VPN-Stack mit fester Cipher-Auswahl (ChaCha20-Poly1305, Curve25519)', 'IPsec-Erweiterung', 'WLAN-Standard', 'Backup-Tool'], 0, 'WireGuard (RFC 8439-Cipher); deutlich kleinerer Code als IPsec/OpenVPN.'),
                    q('Welche Eigenschaft hat 802.1X?', ['Port-basierte Netzwerk-Zugangskontrolle mit EAP-Authentifizierung', 'WLAN-Verschlüsselung', 'TLS-Erweiterung', 'Backup-Standard'], 0, 'IEEE 802.1X-2020. EAP-TLS ist die sicherste Variante.'),
                    q('Welche EAP-Variante ist phishing-resistent und passwortlos?', ['EAP-TLS (mit Client-Zertifikat)', 'EAP-MD5', 'EAP-PEAP-MSCHAPv2', 'EAP-LEAP'], 0, 'EAP-TLS verwendet Client-Zertifikate; PEAP+MSCHAPv2 ist anfällig für Hash-Crack.'),
                    q('Welche WPA3-Eigenschaft schützt vor Offline-Wörterbuchangriffen?', ['SAE (Simultaneous Authentication of Equals / Dragonfly)', 'TKIP', 'WEP', 'PSK ohne Salt'], 0, 'SAE ersetzt PSK-Handshake — keine offline-bruteforce-bare PMK-Hash-Capture.'),
                    q('Welche Eigenschaft hat WPA3-Enterprise mit Suite-B?', ['192-Bit-Sicherheit, GCMP-256, ECDHE-P-384', 'TKIP', 'Reines WEP', 'Reines PSK'], 0, 'Für Behrden-/CNSA-Anforderungen.'),
                    q('Welcher Standard adressiert Container-Image-Signaturen?', ['Sigstore / Cosign', 'PPTP', 'NTP', 'TFTP'], 0, 'Sigstore (OpenSSF) liefert keyless signing für OCI-Images via Fulcio + Rekor.'),
                    q('Welche Eigenschaft hat ein SBOM?', ['Liste aller in einer Software enthaltenen Komponenten und deren Versionen', 'Backup-Datei', 'Cloud-Region-Liste', 'TLS-Cipher-Liste'], 0, 'SBOM-Formate: CycloneDX, SPDX, SWID. Pflicht in EU-CRA und US-EO 14028.'),
                    q('Welche Eigenschaft hat Immutable Infrastructure?', ['Server werden niemals modifiziert, sondern komplett ersetzt (z. B. über Images)', 'Server werden manuell gepatcht', 'Server haben SSH offen', 'Server sind Pets'], 0, 'Cattle-not-Pets-Prinzip; reduziert Configuration-Drift.'),
                    q('Welche Eigenschaft hat Infrastructure-as-Code?', ['Deklarative/imperative Beschreibung der Infrastruktur in versionierten Files (Terraform, CloudFormation, Pulumi)', 'Manuelle Konfiguration', 'Reine GUI-Konfiguration', 'BIOS-Update'], 0, 'IaC ermöglicht Reviews, Drift-Detection und Rollback.'),
                    q('Welche Eigenschaft hat ein Service Mesh (Istio/Linkerd)?', ['Sidecar-Proxy-Architektur für mTLS, Observability, Traffic-Policy zwischen Microservices', 'WLAN-Standard', 'Backup-System', 'BIOS-Update'], 0, 'Service-Mesh trennt App-Logik von Cross-Cutting-Concerns wie mTLS.'),
                    q('Welche Eigenschaft hat mTLS?', ['Beide Seiten authentifizieren sich über X.509-Zertifikate', 'Nur Server authentifiziert sich', 'Nur Client authentifiziert sich', 'Reine Verschlüsselung ohne Auth'], 0, 'Mutual TLS — Standard in Service-Meshes und Zero-Trust-Architekturen.'),
                    q('Welche Eigenschaft hat Confidential Computing?', ['Verschlüsselung von Data in Use innerhalb einer TEE (SGX, SEV-SNP, TDX)', 'Verschlüsselung in Transit', 'Verschlüsselung at Rest', 'Reines Hashing'], 0, 'Confidential Computing Consortium; Anwendungsbeispiel: Secure Enclaves für Schlüsselverwaltung.'),
                    q('Welche Eigenschaft hat eine Hardware Security Module (HSM)?', ['Dediziertes Hardware-Gerät für Schlüsselgenerierung/-speicherung mit FIPS 140-3-Zertifizierung', 'Reine Software-Bibliothek', 'CDN', 'Backup-Tool'], 0, 'HSM (Thales, Utimaco, AWS CloudHSM) — Schlüssel verlassen niemals die Hardware.'),
                    q('Welche FIPS-140-3-Stufe erfordert tamper-evident-Coatings?', ['Level 1', 'Level 2', 'Level 3', 'Level 4'], 1, 'Level 2 fordert tamper-evident; Level 3 tamper-resistant; Level 4 tamper-active.'),
                    q('Welche Eigenschaft hat ein TPM?', ['Trusted Platform Module — Hardware-Root-of-Trust für Plattform-Integrität (TCG-Spec, ISO/IEC 11889)', 'Reine Software-Library', 'WLAN-Modul', 'Backup-Festplatte'], 0, 'TPM 2.0 ist Standard. Speichert PCRs, schlüssel-versiegelte Daten, EK/SRK.'),
                    q('Welche Eigenschaft hat Secure Boot?', ['Prüft Signaturen der Boot-Kette gegen UEFI-Vendor-Schlüssel', 'Verschlüsselt Disk', 'Patch-Mechanismus', 'WLAN-Auth'], 0, 'UEFI Secure Boot blockiert nicht-signierte Bootloader/Kernel.'),
                    q('Welche Eigenschaft hat Measured Boot?', ['Boot-Komponenten werden gehashed und in TPM-PCRs gespeichert; Remote Attestation möglich', 'Verschlüsselung der Disk', 'Backup', 'WLAN-Auth'], 0, 'Ermöglicht Attestation gegen externe Verifier.'),
                    q('Welche Eigenschaft hat Microsegmentation?', ['Granulare Netzwerk-Isolation auf Workload-/Identity-Ebene statt VLAN', 'Reine Hardware-Firewall', 'Reine Cloud-Konstruktion', 'Reine WLAN-Konstruktion'], 0, 'Microsegmentation (z. B. Illumio, VMware NSX) — Ost-West-Traffic-Kontrolle.'),
                    q('Welche Eigenschaft hat eine Bastion-Host?', ['Gehärteter Sprungserver für administrativen Zugang in segmentierte Zonen', 'WAF', 'CDN', 'Backup-Server'], 0, 'Bastion / Jumphost — zentralisiert privilegierten Access (Logging, MFA).'),
                    q('Welche Eigenschaft hat ein Privileged Access Workstation (PAW)?', ['Dediziertes, gesperrtes Endgerät für administrative Tätigkeiten ohne Internet-/Mail-Zugang', 'Reines Test-Notebook', 'BYOD', 'Reines Mobile'], 0, 'Microsoft Tier-Modell: PAW = Tier-0/1-Admin-Endgerät.'),
                    q('Welche Eigenschaft hat eine Honeypot?', ['Gerät/System ohne legitime Funktion, das Angreifer anlockt und beobachtet', 'Backup-System', 'WAF', 'CDN'], 0, 'Low-Interaction (Cowrie, Dionaea) vs. High-Interaction. Detection-Werkzeug.'),
                    q('Welche Eigenschaft hat eine Honeynet?', ['Mehrere vernetzte Honeypots, oft ein ganzes Subnetz', 'Backup-Netz', 'WLAN-Standard', 'CDN'], 0, 'Honeynet Project ist seit 1999 bekannt.'),
                    q('Welche Eigenschaft hat Canary-Tokens?', ['Versteckte Indikatoren (Files, AWS-Keys, DNS-Lookups), die bei Zugriff Alarm auslösen', 'Reine Backup-Schemata', 'Reine TLS-Cipher', 'WLAN-Standard'], 0, 'Thinkst Canary-Tokens — leichte Tripwires gegen Lateral Movement.'),
                    q('Welche Eigenschaft hat ein Air-Gapped Network?', ['Physische Trennung von externen Netzen', 'Reine Logische Trennung via VLAN', 'Reines TLS-Tunneling', 'Reine WLAN-Isolation'], 0, 'Stuxnet zeigte: Air-Gap allein ist nicht unverletzlich (USB-Vektor).'),
                    q('Welche Eigenschaft hat ein One-Way-Diode (Data Diode)?', ['Hardware-Komponente, die Datenfluss nur in eine Richtung erlaubt (z. B. von OT zu IT-Monitoring)', 'WLAN-Standard', 'Backup-Tool', 'Reine Software-Firewall'], 0, 'Data Diodes (Owl, Waterfall) sind Standard in Critical Infrastructure und Defense.')
                ]
            },
            {
                id: 'sec_ops',
                title: 'Kapitel 4 — Security Operations',
                summary: 'Logging, Monitoring, IR-Grundlagen, Vulnerability Management.',
                pages: [{
                    title: 'Operativer Betrieb',
                    html: `<h4>Logging</h4>
<p>Zentrale Sammlung über Syslog, Windows Event Forwarding (WEF), OpenTelemetry. Aufbewahrungsfristen nach Compliance.</p>
<h4>Vulnerability Management</h4>
<p>CVSS v3.1 / v4.0, Patch-Lifecycle, EPSS für Priorisierung, KEV-Catalog (CISA Known Exploited Vulns).</p>
<h4>Incident Response Basics</h4>
<p>Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned.</p>
<h4>Backups</h4>
<p>3-2-1-1-0; immutable; getestete Restores; air-gapped.</p>`
                }, {
                    title: 'Detection-Stack',
                    html: `<h4>SIEM</h4>
<p>Splunk, Microsoft Sentinel, Elastic Security, Chronicle, IBM QRadar. Aufgaben: Normalisierung, Korrelation, Alerting, Dashboards, Compliance-Reporting.</p>
<h4>EDR/XDR</h4>
<p>Process-Tree, Memory-Scanning, Behavioral-Analytics, automated Response. XDR korreliert Endpoint + Email + Identity + Cloud.</p>
<h4>NDR (Network Detection & Response)</h4>
<p>Zeek/Bro, Suricata, Corelight, Vectra. Beaconing-Detection, DNS-Tunneling, Lateral Movement über Flow-Analytics.</p>
<h4>UEBA</h4>
<p>User/Entity Behavior Analytics — Baselines, Abweichungen markieren (Impossible Travel, Off-hours-Logon, ungewöhnlicher Datenzugriff).</p>`
                }, {
                    title: 'Hardening-Lifecycle',
                    html: `<h4>Baselines</h4>
<ul><li>CIS Benchmarks pro OS/Plattform.</li><li>DISA STIGs (Defense Information Systems Agency).</li><li>Microsoft Security Baselines (SCM/Intune).</li></ul>
<h4>Patch-Management</h4>
<p>Inventory → Detection → Test (Dev/Stage) → Deployment → Verification. SLA nach Severity (z. B. Critical ≤ 7 Tage, High ≤ 30 Tage).</p>
<h4>Configuration-Mgmt</h4>
<p>Ansible, Puppet, Chef, DSC, GPO. Drift-Detection vergleicht Soll- vs. Ist-Zustand.</p>
<h4>Secrets-Management</h4>
<p>HashiCorp Vault, AWS Secrets Manager, Azure Key Vault. Rotation + dynamic credentials. Niemals Secrets in Git committen — Pre-Commit-Hooks (gitleaks, trufflehog).</p>`
                }, {
                    title: 'Compliance & Datenschutz',
                    html: `<h4>Frameworks</h4>
<table><tr><th>Framework</th><th>Fokus</th></tr><tr><td>NIST CSF 2.0</td><td>Cybersecurity-Framework (Govern, Identify, Protect, Detect, Respond, Recover)</td></tr><tr><td>ISO 27001:2022</td><td>ISMS, zertifizierbar</td></tr><tr><td>SOC 2</td><td>Service-Organisationen, Trust Service Criteria</td></tr><tr><td>PCI-DSS v4</td><td>Kartendaten</td></tr><tr><td>HIPAA</td><td>US-Gesundheitsdaten</td></tr></table>
<h4>Datenschutz</h4>
<ul><li>DSGVO (EU): 72-h-Meldepflicht (Art. 33), DSFA (Art. 35), DPO (Art. 37).</li><li>NIS2-RL (2022/2555) — Pflicht ab 18.10.2024 in nationale Gesetze.</li><li>DORA (EU 2022/2554) — Finanzsektor, ab 17.01.2025.</li><li>EU-CRA (Cyber Resilience Act, 2024) — Produkthaftung mit digitalen Elementen.</li></ul>
<h4>Privacy by Design</h4>
<p>Datenminimierung, Pseudonymisierung, Anonymisierung, Encryption, Access Control by Default.</p>`
                }],
                quiz: [
                    q('Was bedeutet CVSS?', ['Common Vulnerability Scoring System', 'Cyber Vulnerability Standard', 'Critical Virus Signature System', 'Compliance Verification Standard'], 0, 'CVSS v3.1 / v4.0: 0–10-Score zur Priorisierung.'),
                    q('Welcher Katalog listet aktiv ausgenutzte Schwachstellen?', ['CISA KEV (Known Exploited Vulnerabilities)', 'OWASP Top 10', 'NIST CSF', 'ISO 27002'], 0, 'CISA KEV ist Top-Priorität für Patch-Reihenfolge.'),
                    q('Welcher EPSS-Wert sagt etwas über die Wahrscheinlichkeit aktiver Ausnutzung aus?', ['Yes — Exploit Prediction Scoring System (FIRST.org)', 'No', 'Nur theoretisch', 'Nur für Webapps'], 0, 'EPSS ergänzt CVSS durch wahrscheinlichkeitsbasiertes Ranking.'),
                    q('Welche Eigenschaft hat ein immutables Backup?', ['Kann nicht überschrieben oder gelöscht werden während der Retention', 'Wird täglich überschrieben', 'Wird verschlüsselt mit dem Produktivkey', 'Liegt nur lokal'], 0, 'Object-Lock / WORM verhindert Manipulation auch durch Admins/Ransomware.'),
                    q('Welcher Logon-Type indiziert RDP unter Windows?', ['Type 2', 'Type 3', 'Type 10 (RemoteInteractive)', 'Type 11'], 2, 'Logon Type 10 = RDP. Type 2 = lokal, Type 3 = network/SMB, Type 11 = cached.'),
                    q('Was ist die NIST-IR-Phase nach Detection?', ['Containment', 'Recovery', 'Lessons Learned', 'Preparation'], 0, 'Containment kommt vor Eradication und Recovery (NIST SP 800-61 r2).'),
                    q('Welcher Befehl listet aktive Verbindungen unter Windows?', ['ipconfig', 'netstat -ano', 'tracert', 'arp'], 1, '-a all, -n numerisch, -o PID — zur Korrelation mit tasklist.'),
                    q('Welche Komponente löst SIEM-Alarme zu Aktionen über Playbooks aus?', ['SOAR', 'WAF', 'CDN', 'IPAM'], 0, 'SOAR (Security Orchestration, Automation, Response).'),
                    q('Welche RTO-Definition ist korrekt?', ['Maximale tolerierbare Wiederherstellungszeit', 'Maximaler tolerierbarer Datenverlust', 'Mean-Time-to-Failure', 'Mean-Time-Between-Failures'], 0, 'RTO = Time. RPO = Datenverlust-Zeitfenster.'),
                    q('Welche Kontrolle reduziert Risiko durch alte SSH-Schlüssel?', ['Reguläre Rotation + zentralisiertes Key-Inventory + Just-in-Time-Zugriff', 'Mehr WAF-Regeln', 'IPv6 deaktivieren', 'NTP-Server tauschen'], 0, 'SSH-Key-Rotation, Sudo-Logging, Bastion-Hosts, JIT-Access (z. B. Teleport, BeyondTrust).'),
                    q('Welcher Begriff beschreibt das automatische Sammeln von Compliance-Beweisen aus Live-Systemen?', ['Continuous Compliance', 'Pen-Testing', 'Threat Modeling', 'Pivoting'], 0, 'Continuous Compliance / Continuous Control Monitoring (CCM-Tools).'),
                    q('Was ist die korrekte erste Aktion bei aktiver Ransomware-Verschlüsselung?', ['Server logisch isolieren (Containment)', 'Sofort Backup einspielen', 'Neustarten', 'Komplette Festplatte formatieren'], 0, 'Containment vor Eradication. Restore auf nicht-bereinigtem System wird sofort wieder verschlüsselt.'),
                    q('Welcher RPO-Wert beschreibt die maximale tolerierbare Datenmenge, die verloren gehen darf?', ['0 Stunden bedeutet Daten dürfen verloren gehen', 'RPO = Punkt in der Zeit, bis zu dem Daten wiederhergestellt werden', 'RPO ist immer gleich RTO', 'RPO ist nur für Hardware'], 1, 'RPO definiert „seit wann“ Daten unwiederbringlich verloren wären.'),
                    q('Welcher Standard regelt das forensische Vorgehen?', ['NIST SP 800-86', 'PCI-DSS', 'ISO 9001', 'HIPAA'], 0, 'NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response.'),
                    q('Welche Reihenfolge entspricht der NIST-IR-Lifecycle (SP 800-61 r2)?', ['Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident', 'Detection → Recovery → Preparation', 'Recovery → Detection → Containment', 'Containment → Preparation → Detection'], 0, 'NIST 800-61 r2 ist Standard.'),
                    q('Welche Reihenfolge entspricht SANS PICERL?', ['Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned', 'Beliebige Reihenfolge', 'Recovery zuerst', 'Lessons Learned zuerst'], 0, 'SANS-Variante des NIST-Lifecycles.'),
                    q('Welche RFC-Nummer beschreibt Order of Volatility?', ['RFC 3227', 'RFC 5246', 'RFC 8446', 'RFC 9000'], 0, 'RFC 3227 — Guidelines for Evidence Collection and Archiving.'),
                    q('Welche Volatility-Reihenfolge ist korrekt (höchste zuerst)?', ['CPU-Register → Cache → RAM → Network State → Disk → Backups', 'Disk → RAM', 'Backups zuerst', 'RAM → Cache → CPU'], 0, 'RFC 3227.'),
                    q('Welche Eigenschaft hat ein Chain of Custody?', ['Lückenlose Dokumentation der Beweisübergabe inkl. Hashes, Zeitstempel, Personen', 'Backup-Strategie', 'Patch-Schedule', 'TLS-Cipher-Liste'], 0, 'Pflicht für forensische Verwertbarkeit.'),
                    q('Welcher Hash-Algorithmus ist Standard für Disk-Imaging?', ['SHA-256 (oft kombiniert mit MD5)', 'CRC32', 'XOR', 'Adler-32'], 0, 'SHA-256 primär; MD5 als zusätzlicher Sanity-Check.'),
                    q('Welcher Befehl erzeugt RAM-Image auf Linux?', ['LiME / AVML', 'cp /dev/random', 'tar -cvf', 'mv /tmp'], 0, 'LiME (Linux Memory Extractor); AVML von Microsoft.'),
                    q('Welcher Befehl erzeugt Disk-Image auf Linux?', ['dd / dcfldd / dc3dd', 'cp', 'mv', 'tar'], 0, 'dcfldd/dc3dd ergänzen dd um Hashing on-the-fly.'),
                    q('Welche Eigenschaft hat Volatility Framework?', ['Memory-Forensik für RAM-Dumps (Windows/Linux/macOS)', 'Disk-Imaging-Tool', 'Network-Sniffer', 'TLS-Inspector'], 0, 'Volatility 3 ist aktuelle Generation.'),
                    q('Welche Eigenschaft hat ein SIEM?', ['Zentrale Log-Sammlung, Normalisierung, Korrelation und Alerting', 'Disk-Imager', 'Memory-Forensik', 'Reine Backup-Lösung'], 0, 'Security Information and Event Management.'),
                    q('Welche Eigenschaft hat SOAR?', ['Security Orchestration, Automation, Response — Playbook-Automation auf SIEM-Alarme', 'Memory-Forensik', 'Reines Backup', 'Reines DNS-Tool'], 0, 'SOAR (z. B. Splunk SOAR, Microsoft Sentinel Playbooks, XSOAR).'),
                    q('Welche Eigenschaft hat ein EDR?', ['Endpoint Detection & Response — Telemetrie + Behavior + Quarantine auf Endpoints', 'Reiner Antivirus', 'Backup', 'WAF'], 0, 'CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne.'),
                    q('Welche Eigenschaft hat XDR?', ['Extended Detection & Response — Korrelation über Endpoint + Mail + Identity + Cloud', 'Reines EDR', 'Reine Firewall', 'WAF'], 0, 'XDR korreliert mehrere Telemetrie-Quellen.'),
                    q('Welche Eigenschaft hat MTTD?', ['Mean Time to Detect — mittlere Zeit bis zur Erkennung eines Vorfalls', 'Mean Time to Deploy', 'Mean Time to Drift', 'Mean Time to Disable'], 0, 'Standard-IR-Metrik.'),
                    q('Welche Eigenschaft hat MTTR?', ['Mean Time to Respond/Remediate — mittlere Zeit bis zur Behebung', 'Mean Time to Reboot', 'Mean Time to Restart', 'Mean Time to Reconfigure'], 0, 'In IR/SecOps oft auch MTTR = Mean Time to Recovery.'),
                    q('Welche Eigenschaft hat Dwell Time?', ['Zeit zwischen initialer Kompromittierung und Detection', 'Zeit zwischen Detection und Recovery', 'Backup-Frequenz', 'Patch-Zyklus'], 0, 'Mandiant M-Trends 2024: globaler Median ~10 Tage.'),
                    q('Welche Eigenschaft hat ein DLP-System?', ['Data Loss Prevention — erkennt/blockiert sensitive Datenflüsse (Email, Web, Endpoint)', 'Backup-Tool', 'CDN', 'WLAN-Authenticator'], 0, 'Voraussetzung: Datenklassifikation.'),
                    q('Welche Eigenschaft hat ein FIM-System?', ['File Integrity Monitoring — erkennt unautorisierte Änderungen an kritischen Files', 'Backup', 'CDN', 'Reverse Proxy'], 0, 'OSSEC, Tripwire, Wazuh, Auditd. PCI-DSS-Pflicht.'),
                    q('Welche Eigenschaft hat ein Honeypot?', ['Gerät/System ohne legitime Funktion, das Angreifer anlockt', 'Backup', 'CDN', 'WLAN'], 0, 'Niedrig- vs. hoch-interaktive Honeypots.'),
                    q('Welche RFC-Nummer regelt Syslog?', ['RFC 5424', 'RFC 5246', 'RFC 8446', 'RFC 9000'], 0, 'RFC 5424 (2009) — Syslog-Protokoll.'),
                    q('Welche Eigenschaft hat ein Logon Type 3?', ['Network-Logon (z. B. SMB, IIS)', 'Interactive', 'RDP', 'Service'], 0, 'Type 2 = lokal, 3 = network, 4 = batch, 5 = service, 10 = RDP.'),
                    q('Welche Eigenschaft hat ein Logon Type 10?', ['RemoteInteractive (RDP)', 'Lokal', 'Service', 'Batch'], 0, 'RDP-Sessions gegen Domain-Controller — Tier-0-Indikator.'),
                    q('Welche Eigenschaft hat ein 4624-Event?', ['Successful Logon (Windows-Security-Log)', 'Logon-Failure', 'Account-Lockout', 'Password-Change'], 0, '4625 = Failed Logon. 4740 = Lockout.'),
                    q('Welche Eigenschaft hat ein 4672-Event?', ['Special Privileges Assigned (Admin-Rechte)', 'Reine User-Logon', 'Service-Start', 'Group-Change'], 0, 'Indikator für Tier-0/1-Zugriffe.'),
                    q('Welche Eigenschaft hat ein 4769-Event?', ['Kerberos Service Ticket Requested — wichtig für Kerberoasting-Detection', 'TGT-Request', 'Logon', 'Logoff'], 0, '4768 = TGT, 4769 = Service-Ticket.'),
                    q('Welche Mitigation reduziert Kerberoasting?', ['gMSA (Group Managed Service Accounts) mit langen, automatisch rotierten Passwörtern', 'Disable Kerberos', 'Reines NTLM', 'Klartext-Passwörter'], 0, 'gMSA + AES-Keys + langes Passwort = praktisch nicht crackbar.'),
                    q('Welche Mitigation reduziert Pass-the-Hash?', ['Credential Guard + LAPS + Tier-Modell + Disable NTLM wo möglich', 'Reines TLS', 'Reines IPv6', 'Reines DNS'], 0, 'Microsoft-Empfehlung; Credential Guard isoliert LSASS via VBS.'),
                    q('Welche Eigenschaft hat ein Golden Ticket?', ['Gefälschter TGT mit dem KRBTGT-Hash der Domain — ermöglicht Domain-weite Persistenz', 'Reine User-Anmeldung', 'TLS-Token', 'OAuth-Token'], 0, 'Mitigation: KRBTGT zweimal rotieren, Tier-0 schützen.'),
                    q('Welche Eigenschaft hat ein Silver Ticket?', ['Gefälschter Service-Ticket für einen spezifischen Service — NTLM/AES-Hash des Service-Accounts', 'Domain-weiter Ticket', 'TLS-Cookie', 'OAuth-Token'], 0, 'Silver-Ticket ist begrenzter Scope als Golden Ticket.'),
                    q('Welche Eigenschaft hat DCSync?', ['Replikations-API-Missbrauch (GetNCChanges) zum Auslesen aller Domain-Hashes', 'WLAN-Crack', 'TLS-Replay', 'CSRF'], 0, 'Mitigation: Replikations-Rechte nur Tier-0 + Detection über 4662.'),
                    q('Welche Eigenschaft hat ein KEV-Catalog?', ['CISA-Liste aktiv ausgenutzter Schwachstellen', 'Backup-Format', 'TLS-Cipher-Liste', 'WLAN-Standard'], 0, 'CISA Known Exploited Vulnerabilities — höchste Priorität für Patches.'),
                    q('Welche Eigenschaft hat EPSS?', ['Exploit Prediction Scoring System (FIRST.org) — Wahrscheinlichkeit aktiver Ausnutzung', 'Backup-Format', 'TLS-Cipher', 'WLAN-Standard'], 0, 'EPSS ergänzt CVSS um Exploitability-Wahrscheinlichkeit.'),
                    q('Welche Eigenschaft hat ein CVE?', ['Eindeutige Kennung einer konkreten Schwachstelle (MITRE)', 'Schwachstellen-Klasse', 'Backup-Format', 'Crypto-Standard'], 0, 'CVE = Common Vulnerabilities and Exposures.'),
                    q('Welche Eigenschaft hat ein CWE?', ['Schwachstellen-Klassifikation/Typ-Katalog (z. B. CWE-79 XSS)', 'Konkrete Schwachstelle', 'Backup', 'Crypto-Standard'], 0, 'CWE = Common Weakness Enumeration. CWE Top 25 als Subset.'),
                    q('Welche Eigenschaft hat NIST CSF 2.0?', ['Sechs Funktionen: Govern, Identify, Protect, Detect, Respond, Recover', 'Fünf Funktionen', 'Reines Cloud-Framework', 'Backup-Standard'], 0, 'CSF 2.0 (Februar 2024) fügte „Govern“ hinzu.'),
                    q('Welche Eigenschaft hat ISO 27001:2022?', ['ISMS-Standard mit 93 Controls in vier Themen (Organizational, People, Physical, Technological)', 'Reine ITIL', 'Reine Cloud-Norm', 'Reines QM-System'], 0, 'ISO 27001:2022 reduzierte Annex-A-Controls von 114 auf 93.')
                ]
            }
        ]
    });

    // ============================================================
    //  CySA+ (CS0-003)
    // ============================================================
    window.SCHULUNGEN.list.push({
        id: 'cysa_plus',
        code: 'CS0-003',
        name: 'CompTIA CySA+',
        short: 'CySA+',
        desc: 'Cybersecurity Analyst — vier Domänen: Security Operations, Vulnerability Management, Incident Response, Reporting & Communication.',
        chapters: [
            {
                id: 'sec_ops',
                title: 'Kapitel 1 — Security Operations',
                summary: 'Detection, Threat Hunting, MITRE ATT&CK, Sigma, SIEM-Patterns.',
                pages: [{
                    title: 'Analytisches Toolkit',
                    html: `<h4>MITRE ATT&CK</h4>
<p>14 Tactics × ~200 Techniques. Mapping von Detections und Hunts gegen die Matrix.</p>
<h4>Detection-Engineering</h4>
<p>Hypothese → Sigma-Rule → SIEM-Detection → Atomic-Red-Team-Validation → Tuning.</p>
<h4>Beaconing-Detection</h4>
<p>Konstantes Intervall mit Jitter < 20 % und kleine Payloads → C2-Verdacht (Cobalt Strike, Sliver, Mythic).</p>
<h4>EDR-Telemetrie</h4>
<p>Process-Tree, Command-Line, Module-Loads, ETW, AMSI, Sysmon Event IDs (1, 3, 7, 11, 13, 22).</p>`
                }, {
                    title: 'Threat Hunting Methodik',
                    html: `<h4>Hunt-Modelle</h4>
<ul><li><strong>PEAK</strong> (Prepare, Execute, Act with Knowledge) — SANS-Framework.</li><li><strong>TaHiTI</strong> — Targeted Hunting integrating Threat Intelligence.</li><li><strong>Sqrrl-Loop</strong> — Hypothesis → Investigation → Uncover → Inform.</li></ul>
<h4>Hypothesen-Quellen</h4>
<p>Threat-Intel-Reports, ATT&CK Top-Techniques (Red-Canary), Crown-Jewels-Analyse, Anomalien aus SIEM-Baselines.</p>
<h4>Pyramid of Pain (David Bianco)</h4>
<ol><li>Hash-Werte (trivial)</li><li>IPs</li><li>Domains</li><li>Network/Host Artefakte</li><li>Tools</li><li>TTPs (am schmerzhaftesten für Angreifer)</li></ol>
<h4>Diamond Model</h4>
<p>Adversary, Capability, Infrastructure, Victim — vier Knoten, Pivot-Punkte für Investigations.</p>`
                }, {
                    title: 'Log-Quellen & Telemetrie',
                    html: `<h4>Endpoint</h4>
<p>Windows-Security-Log, Sysmon, PowerShell ScriptBlock-Log, AMSI, ETW, Defender-Events, auditd, eBPF (Falco), unified Apple Log.</p>
<h4>Netzwerk</h4>
<p>NetFlow/IPFIX/sFlow, Zeek (conn.log, dns.log, http.log, ssl.log), Suricata, Firewall-Logs, Proxy-Logs.</p>
<h4>Identity</h4>
<p>Entra ID Sign-in/Audit-Logs, AD 4624/4625/4768/4769/4672, IdP-Logs (Okta, Auth0), MFA-Logs.</p>
<h4>Cloud</h4>
<p>AWS CloudTrail + GuardDuty, Azure Activity + Defender, GCP Cloud Audit Logs, Kubernetes-Audit, OCI-Audit.</p>
<h4>Application</h4>
<p>Web-Server-Access-Logs, App-Logs (strukturiert mit OpenTelemetry), DB-Audit, WAF-Logs, API-Gateway-Logs.</p>`
                }, {
                    title: 'SOC-Workflows',
                    html: `<h4>Tier-Modell</h4>
<ul><li><strong>Tier 1</strong> Triage — Erstbewertung, einfache Eskalationen.</li><li><strong>Tier 2</strong> Investigation — tiefere Analyse, Containment.</li><li><strong>Tier 3</strong> Hunt/IR — spezialisierte Forensik, Threat Hunting.</li></ul>
<h4>Alert Fatigue</h4>
<p>Tuning-Strategie: Use-Case-Reviews, Detection-as-Code in Git, CI-Tests gegen Goldsamples, Severity-Buckets, Alert-Konsolidierung in Cases.</p>
<h4>Continuous Validation</h4>
<p>Atomic Red Team (Red Canary), Caldera (MITRE), Stratus Red Team (Cloud), AttackIQ, SafeBreach — BAS (Breach & Attack Simulation).</p>
<h4>Purple Teaming</h4>
<p>Iteratives Red+Blue — Detection-Gaps live identifizieren, Sigma-Regeln entwickeln, MITRE-Heatmap aktualisieren.</p>`
                }],
                quiz: [
                    q('Welches Sysmon-Event-ID erfasst Process Creation?', ['1', '3', '11', '22'], 0, 'ID 1 = ProcessCreate. 3 = NetworkConnect. 11 = FileCreate. 22 = DnsQuery.'),
                    q('Welcher Indikator deutet auf C2-Beaconing?', ['Hochvolumiger Burst-Traffic', 'Konstantes Intervall mit geringem Jitter und kleinen Payloads', 'Massive ICMP-Pakete', 'Random TLS Renegotiations'], 1, 'Beaconing = periodischer Heartbeat (z. B. Cobalt-Strike default 60s ± Jitter).'),
                    q('Welche MITRE-ATT&CK-Tactic deckt Anfangs-Kompromittierung ab?', ['Initial Access', 'Persistence', 'Lateral Movement', 'Impact'], 0, 'Initial Access = Phishing, Exploit Public-Facing App, Drive-By, Trusted Relationship.'),
                    q('Welche EDR-Funktion zeigt Eltern-Kind-Beziehung der Prozesse?', ['Process Tree / Process Lineage', 'Disk Image', 'Memory Dump', 'TLS Inspection'], 0, 'Crucial gegen Living-off-the-Land (z. B. winword.exe → powershell.exe).'),
                    q('Welche Datei-Erweiterung wird oft für PowerShell-Empire genutzt?', ['.lnk', '.ps1', '.bat', '.exe'], 1, 'Aber auch obfuscated als -EncodedCommand und unauffällige Container.'),
                    q('Welcher Begriff beschreibt regelbasierte vendor-neutrale Detection?', ['YARA', 'Sigma', 'Suricata', 'Snort'], 1, 'Sigma → SIEM-Backend (Splunk SPL, KQL, ES|QL, Chronicle).'),
                    q('Welcher Standard transportiert Threat-Intel zwischen Organisationen?', ['STIX/TAXII', 'TLS', 'NTP', 'Syslog'], 0, 'STIX = Datenformat. TAXII = Transport.'),
                    q('Welche Sysmon-ID 22 erfasst?', ['DNS Queries', 'Network Connections', 'Process Creation', 'Registry Edits'], 0, 'Sysmon v10+: Event ID 22 DnsQuery. Sehr hilfreich für DNS-Tunneling-Detection.'),
                    q('Welcher Begriff beschreibt eine Hypothesengetriebene proaktive Suche nach Bedrohungen?', ['Threat Hunting', 'Threat Modeling', 'Penetration Testing', 'Risk Assessment'], 0, 'Threat Hunting beginnt vor einem Alarm — basierend auf Hypothesen aus Threat Intel.'),
                    q('Welche AT&CK-Tactic wird durch das Tool Mimikatz typischerweise unterstützt?', ['Credential Access', 'Defense Evasion', 'Discovery', 'Collection'], 0, 'Mimikatz dumpt Credentials aus LSASS — TA0006 Credential Access (T1003 OS Credential Dumping).'),
                    q('Welcher Begriff beschreibt einen bewährten Pattern (Indikator) in YARA-Regeln?', ['Sigma', 'Strings + Condition', 'Pcap', 'Sysmon-XML'], 1, 'YARA-Regeln basieren auf Strings/Bytes + Condition (boolesche Logik).'),
                    q('Welcher Ansatz adressiert False Positives systematisch?', ['Tuning + Allowlist + Detection-as-Code-Reviews', 'Mehr Hardware', 'WAF deaktivieren', 'IDS abschalten'], 0, 'Detection-as-Code (Versionierung in Git, CI-Tests gegen Goldsamples) ist Best Practice.'),
                    q('Welcher Befehl ermittelt Listening-Ports auf Linux?', ['ss -tulnp', 'route -n', 'ifconfig', 'ping -c 4'], 0, 'ss -tulnp listet TCP/UDP listening Ports inkl. PIDs.'),
                    q('Welche Datenquelle ist optimal für Lateral Movement Detection im AD?', ['Windows-Security-Log (4624 Type 3, 4672, 4769)', 'Browser-Cache', 'Microsoft Word-Logs', 'BIOS-Settings'], 0, 'Logon Type 3 (Network) + Special Privileges (4672) + Kerberos Service Ticket (4769) bilden das Rückgrat.'),
                    q('Welche ATT&CK-Tactic adressiert Persistence?', ['TA0003', 'TA0001', 'TA0006', 'TA0010'], 0, 'TA0003 Persistence; TA0001 Initial Access; TA0006 Credential Access; TA0010 Exfiltration.'),
                    q('Welche ATT&CK-Tactic adressiert Privilege Escalation?', ['TA0004', 'TA0002', 'TA0006', 'TA0008'], 0, 'TA0004 Privilege Escalation. TA0008 Lateral Movement.'),
                    q('Welche ATT&CK-Tactic adressiert Defense Evasion?', ['TA0005', 'TA0001', 'TA0010', 'TA0011'], 0, 'TA0005 Defense Evasion (z. B. T1070 Indicator Removal).'),
                    q('Welche ATT&CK-Tactic adressiert Command & Control?', ['TA0011', 'TA0001', 'TA0010', 'TA0040'], 0, 'TA0011 Command and Control (Beaconing, Web-Service-Abuse, Encrypted Channel).'),
                    q('Welche ATT&CK-Technique beschreibt Phishing?', ['T1566', 'T1059', 'T1078', 'T1110'], 0, 'T1566 Phishing; T1566.001 Spearphishing Attachment; T1566.002 Spearphishing Link.'),
                    q('Welche ATT&CK-Technique beschreibt Brute Force?', ['T1110', 'T1059', 'T1078', 'T1190'], 0, 'T1110 mit Sub-Techniques (Password Guessing, Spraying, Stuffing, Cracking).'),
                    q('Welche ATT&CK-Technique beschreibt Valid Accounts?', ['T1078', 'T1059', 'T1110', 'T1190'], 0, 'T1078 — Default, Domain, Local, Cloud Accounts.'),
                    q('Welche ATT&CK-Technique beschreibt Exploit Public-Facing Application?', ['T1190', 'T1078', 'T1110', 'T1566'], 0, 'T1190 — RCE in exponierter App.'),
                    q('Welche ATT&CK-Technique beschreibt Command and Scripting Interpreter?', ['T1059', 'T1078', 'T1110', 'T1190'], 0, 'T1059 mit Sub-Techniques (.001 PowerShell, .003 cmd, .004 Unix Shell, .005 Visual Basic, .006 Python).'),
                    q('Welche Sysmon-ID erfasst Network Connection?', ['3', '1', '11', '22'], 0, 'ID 3 NetworkConnect.'),
                    q('Welche Sysmon-ID erfasst Image Loaded (DLL)?', ['7', '1', '11', '22'], 0, 'ID 7 ImageLoad — wichtig für DLL-Sideloading-Detection.'),
                    q('Welche Sysmon-ID erfasst File Create?', ['11', '1', '3', '22'], 0, 'ID 11 FileCreate.'),
                    q('Welche Sysmon-ID erfasst Registry Set Value?', ['13', '1', '3', '22'], 0, 'ID 13 RegistryEvent (Value Set).'),
                    q('Welche Sysmon-ID erfasst File Stream Created (Mark-of-the-Web)?', ['15', '1', '3', '22'], 0, 'ID 15 FileCreateStreamHash — erfasst NTFS-ADS, häufig MOTW.'),
                    q('Welcher Begriff beschreibt das systematische Modellieren von Bedrohungen vor Implementierung?', ['Threat Modeling (STRIDE, PASTA, LINDDUN)', 'Threat Hunting', 'Pen-Testing', 'Red Teaming'], 0, 'STRIDE = Microsoft. PASTA = risikobasiert. LINDDUN = Privacy-fokussiert.'),
                    q('Welche Komponente von STRIDE adressiert Repudiation?', ['R — Audit-Logging, digitale Signaturen', 'S Spoofing', 'T Tampering', 'I Information Disclosure'], 0, 'STRIDE = Spoofing, Tampering, Repudiation, Info-Disclosure, DoS, Elevation of Privilege.'),
                    q('Welche Komponente von STRIDE adressiert Tampering?', ['T — Integritätsschutz (Hashing, Signaturen, RBAC)', 'S', 'R', 'D'], 0, 'Tampering = unautorisierte Manipulation.'),
                    q('Welcher Begriff beschreibt das Pyramid-of-Pain-Top?', ['TTPs (Tactics, Techniques, Procedures)', 'IPs', 'Hashes', 'Domains'], 0, 'TTPs sind am schmerzhaftesten für Angreifer zu ändern.'),
                    q('Welcher Begriff beschreibt die unterste Pyramid-of-Pain-Stufe?', ['Hash-Werte (trivial zu ändern)', 'TTPs', 'Tools', 'Network Artifacts'], 0, 'Hashes sind nach einer Datei-Änderung sofort obsolet.'),
                    q('Welche Eigenschaft hat das Diamond Model?', ['Vier Knoten: Adversary, Capability, Infrastructure, Victim', 'Drei Knoten', 'Fünf Knoten', 'Sieben Knoten'], 0, 'Diamond Model of Intrusion Analysis (Caltagirone et al., 2013).'),
                    q('Welche Eigenschaft hat die Cyber Kill Chain (Lockheed Martin)?', ['Sieben Phasen: Recon, Weaponization, Delivery, Exploit, Install, C2, Actions on Objectives', 'Fünf Phasen', 'Drei Phasen', 'Zehn Phasen'], 0, 'Lockheed-Martin Kill-Chain-Modell (2011).'),
                    q('Welche Komponente in der Kill Chain folgt auf Delivery?', ['Exploitation', 'Recon', 'Install', 'C2'], 0, 'Recon → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objectives.'),
                    q('Welcher Begriff beschreibt einen Indicator of Compromise (IoC)?', ['Bekannter forensischer Artefakt eines Angriffs', 'Verhaltensmuster', 'Pen-Test-Tool', 'Backup-Strategie'], 0, 'IoCs altern schnell.'),
                    q('Welcher Begriff beschreibt einen Indicator of Attack (IoA)?', ['Verhaltensbasierter Indikator eines laufenden Angriffs', 'Hash', 'IP', 'Domain'], 0, 'IoA = TTPs / Verhalten.'),
                    q('Welche Eigenschaft hat ein Sigma-Rule?', ['Vendor-neutrale, YAML-basierte Detection-Logik für Logs', 'Memory-Forensik', 'TLS-Cipher-Liste', 'Backup-Format'], 0, 'Sigma kompiliert in Splunk SPL, KQL, ES|QL, Chronicle UDM.'),
                    q('Welche Eigenschaft hat eine YARA-Rule?', ['Pattern-Matching für Files/Memory (Strings + Condition)', 'Network-Detection', 'Reine Backup-Methode', 'TLS-Cipher'], 0, 'YARA = de-facto-Standard für Malware-Klassifikation.'),
                    q('Welche Eigenschaft hat eine Suricata-Rule?', ['Network-IDS/IPS-Regel mit PCAP-/Flow-Bezug', 'Memory-Forensik', 'Reine Backup-Methode', 'TLS-Cipher'], 0, 'Suricata-Regelsyntax ähnelt Snort, mit ET-Open/Pro Rule-Sets.'),
                    q('Welcher Begriff beschreibt das automatische Sammeln von Threat-Intel-Daten?', ['STIX/TAXII (OASIS-Standards)', 'TLS', 'NTP', 'Syslog'], 0, 'STIX 2.1 = Datenformat (JSON), TAXII 2.1 = Transport (HTTPS-API).'),
                    q('Welche Eigenschaft hat ein TIP?', ['Threat Intelligence Platform — Aggregiert, dedupliziert, korreliert IoCs/IoAs', 'Backup-Tool', 'Reine WLAN-Lösung', 'Reine Cloud-Auth'], 0, 'OpenCTI, MISP, Anomali ThreatStream.'),
                    q('Welche Eigenschaft hat MISP?', ['Open-Source Threat Intel Platform mit Community-Sharing', 'Reine SIEM-Lösung', 'Reines Backup', 'Reine Hardware-Firewall'], 0, 'MISP = Malware Information Sharing Platform; Sektoren-ISACs nutzen MISP-Communities.'),
                    q('Welche Eigenschaft hat OpenCTI?', ['Threat Intel Platform mit STIX-2.1-nativer Datenmodellierung', 'Reine Backup-Lösung', 'Reine Firewall', 'Reine WLAN'], 0, 'OpenCTI ist Filigran-Open-Source-Projekt.'),
                    q('Welche Eigenschaft hat ein TLP-Marking?', ['Traffic Light Protocol — RED/AMBER/GREEN/CLEAR für Sharing-Restriktionen', 'Backup-Format', 'TLS-Cipher', 'WLAN-Standard'], 0, 'FIRST.org TLP 2.0 (2022) ersetzte WHITE durch CLEAR.'),
                    q('Welche Eigenschaft hat eine Detection-as-Code-Pipeline?', ['Versionierte Detection-Regeln in Git mit CI-Tests gegen Sample-Logs', 'Manuelle Regel-Pflege', 'Reine UI-Konfiguration', 'BIOS-Updates'], 0, 'Ermöglicht Reviews, Rollback, Coverage-Tracking.'),
                    q('Welcher Begriff beschreibt einen kontrollierten Angriff zur Validierung der Detection?', ['Atomic Red Team / Caldera / Stratus Red Team', 'Reines Pentest', 'Reines Backup', 'Reine Cloud-Migration'], 0, 'BAS-Tools simulieren ATT&CK-Techniques in Production-Settings.'),
                    q('Welche Eigenschaft hat Purple Teaming?', ['Iterative Red+Blue-Zusammenarbeit zur Detection-Verbesserung', 'Reines Red Team', 'Reines Blue Team', 'Reines Audit'], 0, 'Live-Walkthrough mit MITRE-Mapping; Sigma-Regeln werden gemeinsam entwickelt.'),
                    q('Welche Eigenschaft hat ein UEBA?', ['User/Entity Behavior Analytics — Anomalie-Detection auf Basis individueller Baselines', 'WAF', 'CDN', 'Reine Firewall'], 0, 'Beispiele: Impossible Travel, Off-Hours-Logon, ungewöhnliche Datenmengen.'),
                    q('Welche Eigenschaft hat ein Lookback-Search?', ['Retroaktive Suche über alte Logs nach neuen IoCs/IoAs', 'Reines Live-Streaming', 'Reines Backup', 'BIOS-Update'], 0, 'Wichtig nach IoC-Release: Wurden wir in den letzten 90 Tagen kompromittiert?')
                ]
            },
            {
                id: 'vuln_mgmt',
                title: 'Kapitel 2 — Vulnerability Management',
                summary: 'Scanning-Methoden, Priorisierung, Compensating Controls, Remediation-Workflows.',
                pages: [{
                    title: 'Vulnerability Lifecycle',
                    html: `<h4>Scanning</h4>
<ul><li>Authenticated/Credentialed vs. Unauthenticated.</li>
<li>Network-based, Host-based, Container/Cloud-Image.</li>
<li>Tools: Nessus/Tenable, Qualys, Rapid7 InsightVM, OpenVAS, Trivy (Container).</li></ul>
<h4>Prioritization</h4>
<p>CVSS + EPSS + Asset-Criticality + Exploit-Availability (KEV). Heat-Map-Visualisierung.</p>
<h4>Compensating Controls</h4>
<p>Wenn Patch nicht möglich (Legacy/SCADA): Mikrosegmentierung, IPS-Signaturen, Read-Only-Modi, Monitoring-Erhöhung.</p>`
                }, {
                    title: 'CVSS-Vektoren im Detail',
                    html: `<h4>CVSS v3.1 Base Metrics</h4>
<ul><li><strong>AV</strong> Attack Vector: Network/Adjacent/Local/Physical</li><li><strong>AC</strong> Attack Complexity: Low/High</li><li><strong>PR</strong> Privileges Required: None/Low/High</li><li><strong>UI</strong> User Interaction: None/Required</li><li><strong>S</strong> Scope: Unchanged/Changed</li><li><strong>C/I/A</strong> Impact je: None/Low/High</li></ul>
<h4>Severity-Ranges</h4>
<table><tr><th>Score</th><th>Severity</th></tr><tr><td>0.0</td><td>None</td></tr><tr><td>0.1–3.9</td><td>Low</td></tr><tr><td>4.0–6.9</td><td>Medium</td></tr><tr><td>7.0–8.9</td><td>High</td></tr><tr><td>9.0–10.0</td><td>Critical</td></tr></table>
<h4>CVSS v4.0 Neuerungen</h4>
<p>Granularere Threat-Metrics (CVSS-BTE), Supplemental-Metrics (Safety, Automatable), bessere Differenzierung niedriger Komplexität.</p>
<h4>Kontextualisierung</h4>
<p>EPSS (Wahrscheinlichkeit der Ausnutzung), KEV (aktiv ausgenutzt), Asset-Kritikalität, Erreichbarkeit (extern vs. intern), Compensating Controls.</p>`
                }, {
                    title: 'Patch-Management & SLAs',
                    html: `<h4>Lifecycle</h4>
<ol><li>Inventory (CMDB, SBOM, Asset-Discovery)</li><li>Detection (Scanner + Vendor-Advisories + KEV-Feed)</li><li>Risk Assessment (CVSS + EPSS + Kontext)</li><li>Test (Dev/Stage)</li><li>Deployment (gestaffelt: Pilot → Production)</li><li>Verification (Re-Scan)</li><li>Documentation</li></ol>
<h4>Beispiel-SLAs</h4>
<table><tr><th>Severity</th><th>Internet-facing</th><th>Internal</th></tr><tr><td>Critical (KEV)</td><td>≤ 7 Tage</td><td>≤ 14 Tage</td></tr><tr><td>Critical</td><td>≤ 14 Tage</td><td>≤ 30 Tage</td></tr><tr><td>High</td><td>≤ 30 Tage</td><td>≤ 60 Tage</td></tr><tr><td>Medium</td><td>≤ 90 Tage</td><td>≤ 180 Tage</td></tr></table>
<h4>Maintenance Windows</h4>
<p>Geplante Fenster mit Change-Approval. Out-of-Band-Patching für KEV/Zero-Days. Backout-Plan immer dokumentiert.</p>`
                }, {
                    title: 'Cloud- und Container-VM',
                    html: `<h4>Cloud-Posture</h4>
<p><strong>CSPM</strong> (Cloud Security Posture Management): Wiz, Prisma Cloud, Defender for Cloud, AWS Security Hub. Identifiziert Misconfigurations gegen CIS-Benchmarks.</p>
<h4>Container-Image-Scanning</h4>
<p>Trivy, Grype, Snyk, Clair. Pipeline-Integration: Build → Scan → Sign (Cosign) → Push → Admission Control (Kyverno, OPA Gatekeeper, Cosign-Verify).</p>
<h4>Runtime-VM</h4>
<p>Falco, Tetragon, Sysdig Secure — eBPF-basierte Detection von ungewöhnlichen Syscalls in Containern.</p>
<h4>IaC-Scanning</h4>
<p>Checkov, tfsec, KICS, Terrascan — finden Misconfigurations in Terraform/CloudFormation/K8s-Manifests vor dem Deployment (Shift-Left).</p>`
                }],
                quiz: [
                    q('Welcher Scan-Typ liefert die genauesten Resultate?', ['Unauthenticated', 'Credentialed (Authenticated)', 'External nur', 'Passiv allein'], 1, 'Credentialed Scans haben OS-Zugriff, sehen installierte Patches, Konfiguration, Software-Versionen — wesentlich akkurater.'),
                    q('Welche Schwachstellenklasse beschreibt CWE-79?', ['SQL Injection', 'Cross-Site Scripting', 'Buffer Overflow', 'Race Condition'], 1, 'CWE-79 = XSS. CWE-89 = SQLi. CWE-787/120 = Buffer-Issues.'),
                    q('Welche Aktion ist bei einem nicht patchbaren Legacy-System korrekt?', ['Risiko ignorieren', 'Formale Exception + kompensierende Kontrollen', 'System abschalten ohne Begründung', 'Patch zwingend ausrollen'], 1, 'Risk Acceptance + Mikrosegmentierung + IPS + Monitoring.'),
                    q('Welche Eigenschaft hat EPSS gegenüber CVSS?', ['Liefert eine wahrscheinlichkeitsbasierte Exploit-Erwartung', 'Ersetzt CVSS', 'Ist nur für Cloud relevant', 'Funktioniert nur für Webanwendungen'], 0, 'EPSS (FIRST.org) ergänzt CVSS — beide werden kombiniert.'),
                    q('Welche Tool-Klasse scannt Container-Images auf bekannte CVEs?', ['Trivy / Grype / Snyk', 'Nmap allein', 'Wireshark', 'Suricata'], 0, 'Container-Scanner inspizieren Layer-Inhalte gegen Vulnerability-DBs.'),
                    q('Was ist eine SLA-relevante Metrik im Vuln-Mgmt?', ['Mean-Time-to-Remediate (MTTR) nach Severity', 'TTL für ARP', 'Hop-Count', 'MTU-Wert'], 0, 'MTTR pro Severity ist Standard-KPI in Patch-SLAs.'),
                    q('Welcher Standard listet aktiv ausgenutzte Vulns?', ['CISA KEV', 'OWASP Top 10', 'CWE Top 25', 'PCI-DSS'], 0, 'KEV = Known Exploited Vulnerabilities. Höchste Patch-Priorität.'),
                    q('Welche Eigenschaft hat ein agentenloser vs. agent-basierter Scan?', ['Agentenlos = einfacher zu verteilen, weniger Tiefe; Agent = höhere Visibility, mehr Wartung', 'Identisch', 'Agent ist immer schlechter', 'Agentenlos ist immer schlechter'], 0, 'Trade-off: Visibility vs. Operational-Overhead.'),
                    q('Welche Quelle dokumentiert kategorisierte Software-Schwachstellen?', ['CWE (Common Weakness Enumeration)', 'CVE allein', 'NVD-only', 'CIS allein'], 0, 'CWE klassifiziert Schwachstellen-TYPEN; CVE listet konkrete Instanzen.'),
                    q('Welche Tools führen zugleich Vulnerability-Scanning und Asset-Discovery?', ['Tenable Nessus / Qualys / Rapid7', 'PuTTY', 'Notepad++', 'Excel'], 0, 'Enterprise-Vuln-Mgmt-Plattformen kombinieren Asset-Discovery + Scanning + Reporting.'),
                    q('Was bedeutet ein Score CVSS 9.8 typischerweise?', ['Critical, oft Remote-Code-Execution ohne Auth', 'Niedriges Risiko', 'Nur Information', 'Nicht ausnutzbar'], 0, '9.0–10.0 = Critical (CVSS v3.1).'),
                    q('Welcher Compensating Control ist KEINE typische Wahl bei Patch-Verzögerung?', ['Mikrosegmentierung', 'IDS/IPS-Signaturen', 'Application-Allowlisting', 'Account-Sharing erweitern'], 3, 'Account-Sharing erhöht das Risiko, ist niemals eine Mitigation.'),
                    q('Welche CVSS-v3.1-Metrik beschreibt Attack Vector Network?', ['AV:N — Schwachstelle ist remote über Netzwerk ausnutzbar', 'AV:L lokal', 'AV:P physisch', 'AV:A adjacent'], 0, 'AV:N gibt höchsten Score-Beitrag.'),
                    q('Welche CVSS-v3.1-Metrik beschreibt User Interaction Required?', ['UI:R — User-Klick/Aktion nötig', 'UI:N keine Interaktion', 'UI:P passiv', 'UI:A automatisch'], 0, 'UI:R reduziert Score gegenüber UI:N.'),
                    q('Welche CVSS-v3.1-Metrik beschreibt Privileges Required None?', ['PR:N — keine Auth nötig', 'PR:L low', 'PR:H high', 'PR:U user'], 0, 'PR:N erhöht Score deutlich.'),
                    q('Welcher CVSS-Score-Range entspricht Critical?', ['9.0–10.0', '7.0–8.9', '4.0–6.9', '0.1–3.9'], 0, 'CVSS v3.1 Severity-Mapping.'),
                    q('Welcher CVSS-Score-Range entspricht High?', ['7.0–8.9', '9.0–10.0', '4.0–6.9', '0.1–3.9'], 0, 'High = 7.0–8.9.'),
                    q('Welche Eigenschaft hat CVSS Temporal/Threat Score (v3.1) bzw. Threat Score (v4.0)?', ['Berücksichtigt Exploit-Verfügbarkeit, Remediation-Level, Report-Confidence', 'Reine Hardware-Metrik', 'Reine Cloud-Metrik', 'Reine WLAN-Metrik'], 0, 'Threat-Score altert mit Zeit (Exploit publiziert, Patch released).'),
                    q('Welche Eigenschaft hat CVSS Environmental Score?', ['Anpassung an die spezifische Umgebung (Asset-Kritikalität, Compensating Controls)', 'Reine Hardware-Metrik', 'Reine Cloud-Metrik', 'Reine WLAN-Metrik'], 0, 'Environmental erlaubt site-spezifische CIA-Anforderungen.'),
                    q('Welche Eigenschaft hat CVSS v4.0 gegenüber v3.1?', ['Granulare Threat-Metrics, Supplemental Metrics (Safety, Automatable, Recovery)', 'Reine Vereinfachung', 'Reine Hardware-Erweiterung', 'Reine Cloud-Erweiterung'], 0, 'CVSS v4.0 (FIRST, 2023) erweitert das Modell.'),
                    q('Welche Eigenschaft hat ein KEV-Eintrag?', ['Bestätigt aktiv in-the-wild ausgenutzte Schwachstelle (CISA)', 'Theoretisches Risiko', 'Reine Cloud-Lookups', 'Reine WLAN-Lookups'], 0, 'KEV erfordert evidence of active exploitation.'),
                    q('Welche Eigenschaft hat US BOD 22-01?', ['Pflicht für US-FCEB, KEV-Einträge in vorgegebener Frist zu beheben', 'Reine Cloud-Anweisung', 'Reine Hardware-Norm', 'Reine WLAN-Norm'], 0, 'CISA Binding Operational Directive 22-01 (2021).'),
                    q('Welche Eigenschaft hat ein authenticated Scan?', ['Scanner authentifiziert sich am Ziel und liest interne Konfiguration', 'Reiner Port-Scan', 'Reiner Banner-Grab', 'Reiner DNS-Lookup'], 0, 'Authenticated Scans haben deutlich niedrigere False-Positive-Rate.'),
                    q('Welche Eigenschaft hat ein non-credentialed Scan?', ['Reine Außen-Sicht ohne Login — sieht nur Netzwerk-Banner', 'Volle Konfigurations-Sicht', 'Reines IaC-Scan', 'Reines Container-Scan'], 0, 'Wertvoll als Realitätscheck (Was sieht ein Angreifer?), aber unvollständig.'),
                    q('Welche Eigenschaft hat ein passive Scan?', ['Beobachtet vorhandenen Traffic ohne aktive Pakete (z. B. Tenable Nessus Passive Vulnerability Scanner)', 'Reine Brute-Force', 'Reines DNS-Tunneling', 'Reine Cloud-Disable'], 0, 'Wichtig für OT-Umgebungen, in denen aktive Scans Probleme verursachen können.'),
                    q('Welche Eigenschaft hat ein active Scan?', ['Sendet Probe-Pakete an das Ziel und wertet Antworten aus', 'Reines Sniffen', 'Reine Cloud-Disable', 'Reines BIOS-Update'], 0, 'Standard für Enterprise-IT.'),
                    q('Welche Eigenschaft hat ein Agent-basierter Scan?', ['Lokal installierter Agent meldet Konfiguration und Software-Stand', 'Reiner Port-Scan ohne Agent', 'Reines Sniffen', 'Reines DNS-Lookup'], 0, 'Vorteile: keine Auth-Probleme; Nachteile: Wartung, Performance-Impact.'),
                    q('Welche Eigenschaft hat ein Agentless Scan?', ['Scan über Netzwerk + Auth-Credentials ohne lokalen Agent', 'Reines Sniffen', 'Reine Cloud-Disable', 'Reines BIOS-Update'], 0, 'Schneller zu deployen; abhängig von Credentials.'),
                    q('Welche Eigenschaft hat ein Internal Scan?', ['Scan aus dem internen Netz — zeigt das, was ein authentifizierter Angreifer sähe', 'Reine Außensicht', 'Reines Cloud', 'Reines WLAN'], 0, 'Wichtig für Lateral-Movement-Risiken.'),
                    q('Welche Eigenschaft hat ein External Scan?', ['Scan von außerhalb des Perimeters — zeigt das, was ein Internet-Angreifer sähe', 'Reine Innensicht', 'Reines Cloud', 'Reines WLAN'], 0, 'PCI-DSS schreibt regelmäßige ASV-External-Scans vor.'),
                    q('Welche Eigenschaft hat eine ASV?', ['Approved Scanning Vendor — PCI-zertifizierter Anbieter für External Scans', 'Reine Cloud-Auth', 'Reine WLAN-Auth', 'Reine BIOS-Norm'], 0, 'PCI-DSS Req. 11.3 fordert quartalsweise ASV-Scans.'),
                    q('Welche Eigenschaft hat ein SAST?', ['Static Application Security Testing — Quellcode-Analyse vor Compilation', 'Dynamic-Test', 'Reine Cloud', 'Reines WLAN'], 0, 'Beispiele: SonarQube, Semgrep, Checkmarx, Fortify.'),
                    q('Welche Eigenschaft hat ein DAST?', ['Dynamic Application Security Testing — Test der laufenden Anwendung von außen', 'Static-Test', 'Reine Cloud', 'Reines WLAN'], 0, 'Beispiele: OWASP ZAP, Burp Suite, Acunetix, Invicti.'),
                    q('Welche Eigenschaft hat ein IAST?', ['Interactive AST — Agent in der App kombiniert SAST/DAST-Sicht zur Laufzeit', 'Reines SAST', 'Reines DAST', 'Reines BIOS-Update'], 0, 'IAST nutzt Telemetrie aus der App + Test-Traffic.'),
                    q('Welche Eigenschaft hat ein SCA?', ['Software Composition Analysis — erkennt verwundbare Open-Source-Bibliotheken', 'Reine Hardware-Analyse', 'Reine Cloud-Analyse', 'Reine WLAN'], 0, 'Snyk, Mend, Black Duck, Dependabot, Renovate.'),
                    q('Welche Eigenschaft hat eine SBOM?', ['Liste aller Komponenten/Versionen einer Software (CycloneDX, SPDX, SWID)', 'Reine Backup-Datei', 'Reine Cloud-Region-Liste', 'Reine WLAN-Liste'], 0, 'EU-CRA und US-EO 14028 schreiben SBOMs vor.'),
                    q('Welche Eigenschaft hat ein VEX-Dokument?', ['Vulnerability Exploitability eXchange — Vendor erklärt, ob ein CVE ihr Produkt betrifft', 'Reine SBOM-Erweiterung', 'Reines IaC-Format', 'Reines TLS-Format'], 0, 'VEX (NTIA, OASIS CSAF) reduziert Triage-Aufwand.'),
                    q('Welche Eigenschaft hat ein CSAF-Dokument?', ['Common Security Advisory Framework — maschinenlesbares Vendor-Advisory-Format', 'Reines TLS-Format', 'Reines Backup-Format', 'Reines WLAN-Format'], 0, 'OASIS CSAF 2.0 (2022). Ersetzt CVRF.'),
                    q('Welche Eigenschaft hat ein CWE-79?', ['Cross-Site Scripting (XSS)', 'SQL Injection', 'Buffer Overflow', 'Race Condition'], 0, 'CWE-89 = SQLi. CWE-787/120 = Buffer-Issues. CWE-362 = Race.'),
                    q('Welche Eigenschaft hat ein CWE-89?', ['SQL Injection', 'XSS', 'Buffer Overflow', 'Race Condition'], 0, 'Klassische Injection-Schwachstelle.'),
                    q('Welche Eigenschaft hat ein CWE-787?', ['Out-of-bounds Write — oft Teil von Memory-Corruption-Exploits', 'XSS', 'SQL Injection', 'CSRF'], 0, 'CWE Top 25 2023: Platz 1.'),
                    q('Welche Eigenschaft hat ein CWE-352?', ['Cross-Site Request Forgery (CSRF)', 'XSS', 'SQLi', 'Buffer Overflow'], 0, 'CWE-352 = CSRF. Mitigation: SameSite, Anti-CSRF-Tokens.'),
                    q('Welche Eigenschaft hat ein CWE-22?', ['Path Traversal', 'XSS', 'SQLi', 'CSRF'], 0, 'CWE-22 — z. B. ../../etc/passwd. Mitigation: Canonicalization, Allowlist.'),
                    q('Welche Eigenschaft hat ein CWE-918?', ['Server-Side Request Forgery (SSRF)', 'XSS', 'CSRF', 'Buffer Overflow'], 0, 'SSRF-Angriffe gegen interne Endpoints (z. B. IMDS).'),
                    q('Welche Eigenschaft hat ein CWE-94?', ['Code Injection', 'XSS', 'CSRF', 'SQLi'], 0, 'CWE-94 — generische Code-Injection (z. B. eval, Server-Side Template Injection).'),
                    q('Welche Eigenschaft hat ein CWE-502?', ['Deserialization of Untrusted Data', 'XSS', 'CSRF', 'SQLi'], 0, 'CWE-502 — RCE-häufig bei Java/Python-Deserialization.'),
                    q('Welche Eigenschaft hat ein CWE-798?', ['Use of Hard-coded Credentials', 'XSS', 'CSRF', 'SQLi'], 0, 'CWE-798 — typischer Finding in IoT-Firmware.'),
                    q('Welche Eigenschaft hat ein OWASP A05 (2021)?', ['Security Misconfiguration', 'Broken Access Control', 'Injection', 'SSRF'], 0, 'Misconfig: default-creds, offene Ports, Debug-Modus.'),
                    q('Welche Eigenschaft hat ein OWASP A06 (2021)?', ['Vulnerable & Outdated Components', 'XSS', 'Broken Access Control', 'SSRF'], 0, 'Veraltete Libraries, ungepatchte Komponenten.')
                ]
            },
            {
                id: 'ir',
                title: 'Kapitel 3 — Incident Response & Management',
                summary: 'IR-Lifecycle, Forensik, Playbooks, Tabletop Exercises.',
                pages: [{
                    title: 'IR Praxis',
                    html: `<h4>Lifecycle (NIST 800-61 r2)</h4>
<ol><li>Preparation</li><li>Detection & Analysis</li><li>Containment, Eradication, Recovery</li><li>Post-Incident Activity</li></ol>
<h4>Order of Volatility (RFC 3227)</h4>
<p>CPU/Cache → RAM → Network → Disk → Backups.</p>
<h4>Indicators</h4>
<p>IoCs (Hashes, IPs, Domains) vs. IoAs (Behavior, TTPs). Playbooks pro Kategorie (Phishing, Ransomware, Malware, Insider).</p>`
                }, {
                    title: 'Forensik-Toolkit',
                    html: `<h4>Disk-Forensik</h4>
<ul><li>Acquisition: dd, dcfldd, dc3dd, FTK Imager, EnCase.</li><li>Analyse: Autopsy/SleuthKit, X-Ways, EnCase, Plaso/log2timeline.</li><li>Carving: scalpel, foremost, photorec.</li></ul>
<h4>Memory-Forensik</h4>
<p>Acquisition: WinPMem, FTK Imager, LiME, AVML. Analyse: Volatility 3, Rekall. Findings: laufende Prozesse, injizierter Code, Network-Connections, Mimikatz-Spuren.</p>
<h4>Network-Forensik</h4>
<p>PCAP-Analyse mit Wireshark, NetworkMiner, Brim/Zeek. Flow-Forensik mit Arkime/Moloch. NetFlow-Records aus Netzwerk-Devices.</p>
<h4>Cloud-Forensik</h4>
<p>AWS CloudTrail, Azure Activity, GCP Audit. Snapshots für EBS/Disk; isolated security account; immutable storage für Logs.</p>
<h4>Container-Forensik</h4>
<p>Sysdig Inspect, Falco-Logs, runtime-snapshots, eBPF-Tracing. Persistente Logging-Pipeline ist Pflicht (Container leben kurz).</p>`
                }, {
                    title: 'Containment-Strategien',
                    html: `<h4>Logisch vs. Physisch</h4>
<ul><li>Logisch: VLAN-Move, Firewall-Block, EDR-Network-Isolation, IAM-Disable.</li><li>Physisch: Kabel ziehen, Power-Off (zerstört RAM-Beweise!).</li></ul>
<h4>Short-term vs. Long-term Containment</h4>
<p>Short-term: schnelle Isolation des betroffenen Systems. Long-term: Hardening + Rebuild + saubere Wiedereinbindung.</p>
<h4>Eradication</h4>
<p>Malware entfernen, kompromittierte Konten löschen, Persistence-Mechanismen (Scheduled Tasks, Services, AutoRuns, WMI-Subscriptions) auditieren.</p>
<h4>Recovery-Strategie</h4>
<p>Restore aus letztem sauberen Backup. Bei Ransomware: niemals zahlen ohne Notfall-Notwendigkeit. Phased Bring-up mit Monitoring.</p>
<h4>Lessons Learned</h4>
<p>Hot Wash binnen 2 Wochen; Aktionen mit Owner + Frist; Tabletop-Update mit neuen Szenarien; Detection-Regeln nachschärfen.</p>`
                }, {
                    title: 'Spezial-Playbooks',
                    html: `<h4>Ransomware-Playbook</h4>
<ol><li>Isolation infizierter Hosts.</li><li>Identifikation Ransomware-Familie (ID Ransomware, NoMoreRansom).</li><li>Backup-Integrität prüfen (immutable / offline).</li><li>Rechtliche Pflichten: DSGVO Art. 33 (72h), NIS2 24h Initial / 72h Update / 1 Monat Final.</li><li>CISA/BSI/Strafverfolgung benachrichtigen.</li><li>Restore + Forensik parallel.</li></ol>
<h4>BEC-Playbook</h4>
<p>Mailbox-Forensik (Inbox-Rules, Forwarding, Auditlog), Refund-/Recall-Versuch der Überweisung, FBI IC3 / LKA, Conditional Access nachschärfen, Awareness-Booster.</p>
<h4>Insider-Threat-Playbook</h4>
<p>HR + Legal einbeziehen, Beweissicherung mit Chain of Custody, Daten-Exfil-Pfade prüfen (USB, Personal-Cloud, Email-Forwarding), Leaver-Process-Audit.</p>
<h4>Cloud-Account-Compromise-Playbook</h4>
<p>Sofort: MFA reset, Sessions invalidieren, IAM-Keys rotieren, CloudTrail-Trail audit, IMDS-Abfragen prüfen, Tags/Resource-Drift, Costs-Anomalie.</p>`
                }],
                quiz: [
                    q('Welche Phase folgt auf Detection & Analysis?', ['Containment, Eradication, Recovery', 'Preparation', 'Lessons Learned', 'Hardening'], 0, 'Reihenfolge nach NIST SP 800-61 r2.'),
                    q('Welches Beweis ist am volatilsten?', ['Festplatte', 'CPU-Register', 'Backup', 'Cloud-Log'], 1, 'CPU-Register/Cache ändern sich in Mikrosekunden.'),
                    q('Welcher Befehl erzeugt RAM-Image auf Linux?', ['LiME / AVML', 'cp /dev/random', 'tar -cvf', 'mv /tmp'], 0, 'LiME (Linux Memory Extractor) ist Standard. AVML von Microsoft auch.'),
                    q('Welche Eigenschaft hat ein IoC vs. IoA?', ['IoC = bekannter Artefakt; IoA = Verhaltensmuster', 'identisch', 'IoA ist nur statisch', 'IoC ist nur dynamisch'], 0, 'IoCs altern schnell, IoAs (TTPs) sind robuster (Pyramid of Pain).'),
                    q('Welche Aktion zerstört flüchtige Beweise?', ['Logische Isolation', 'Hard Power-Off', 'EDR Quarantine', 'Disk-Imaging'], 1, 'Power-Off löscht RAM. Logische Isolation bleibt — RAM-Dump zuerst.'),
                    q('Welche Tabletop-Übung ist primär eine Diskussion ohne System-Eingriffe?', ['Tabletop / TTX', 'Red Team', 'Purple Team', 'Black Box Pentest'], 0, 'TTX = Tabletop Exercise. Diskussion auf Papier, IR-Plan-Validierung.'),
                    q('Welcher Begriff bezeichnet das Sammeln strukturierter forensischer Beweise inkl. Hashes?', ['Chain of Custody', 'WAF Rule', 'Honeynet', 'Sinkhole'], 0, 'Lückenlose Dokumentation der Beweismittelübergabe.'),
                    q('Welche Kombination ist Standard für Disk-Image-Verifikation?', ['MD5+SHA-256 (Dual-Hash)', 'CRC32 only', 'SHA-1 allein', 'XOR Checksum'], 0, 'Doppel-Hash schützt vor Hash-Kollisionen; SHA-256 ist primär.'),
                    q('Welcher Indikator deutet auf Datenexfiltration?', ['Plötzlich erhöhter Egress-Traffic zu unbekannter IP', 'Höherer CPU-Verbrauch ohne Netzwerk', 'Mehr USB-Geräte angeschlossen', 'Mehr DNS-Anfragen ans interne DNS'], 0, 'Großvolumige Egress-Spitzen sind klassischer Indikator. Auch DNS-Tunneling möglich.'),
                    q('Welcher Container-Forensik-Aspekt ist besonders herausfordernd?', ['Ephemerale Container — Beweise verschwinden bei Stop', 'TLS', 'IPv6', 'DNS'], 0, 'Container leben kurz; Forensik braucht persistente Logging-Pipeline (Falco, Sysdig, eBPF).'),
                    q('Welcher Standard regelt das forensische Vorgehen?', ['NIST SP 800-86', 'PCI-DSS', 'OWASP Top 10', 'ISO 9001'], 0, 'NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response.'),
                    q('Welche Kommunikation während eines Vorfalls ist kritisch?', ['Out-of-Band (z. B. Telefon, dediziertes Messenger), nicht über kompromittierte Email-Systeme', 'Über das primäre Email-System', 'Auf Twitter/X', 'Per Pager allein'], 0, 'Out-of-Band-Kommunikation, falls Email-Server kompromittiert ist.'),
                    q('Welcher Begriff beschreibt einen ausgewerteten Lessons-Learned-Workshop?', ['Hot Wash / Post-Incident Review', 'Tabletop', 'Red Team', 'Black Box'], 0, 'Direkt nach Incident — strukturiertes Review der IR-Aktivitäten.'),
                    q('Welche DSGVO-Frist gilt für Meldung an Aufsichtsbehörde nach Datenschutzverletzung?', ['72 Stunden ab Kenntnis (Art. 33)', '24 Stunden', '1 Woche', '30 Tage'], 0, 'DSGVO Art. 33 — 72 Stunden, sofern möglich; sonst Begründung mit Verzögerung.'),
                    q('Welche NIS2-Frist gilt für Initial Notification?', ['24 Stunden ab Kenntnis erheblicher Vorfall', '72 Stunden', '1 Woche', '30 Tage'], 0, 'NIS2 (RL 2022/2555): 24h initial, 72h Update, 1 Monat Final-Report.'),
                    q('Welche DORA-Frist gilt für Initial Notification an zuständige Behörde?', ['4 Stunden für major ICT-related incidents in Finanzsektor', '24 Stunden', '72 Stunden', '7 Tage'], 0, 'DORA RTS sieht initial bis 4h, intermediate bis 72h, final bis 1 Monat.'),
                    q('Welche US-Behörde nimmt Cyber-Incident-Reports von Critical Infrastructure?', ['CISA (CIRCIA)', 'FBI allein', 'NIST', 'NSA'], 0, 'CIRCIA (2022): 72h Substantial Incident, 24h Ransom-Payment.'),
                    q('Welcher Begriff beschreibt eine Tabletop-Exercise?', ['Diskussions-basierte Übung des IR-Plans ohne Live-Eingriff', 'Live-Pen-Test', 'Hardware-Test', 'Reine Backup-Übung'], 0, 'TTX validiert Plan, Rollen, Eskalationspfade.'),
                    q('Welcher Begriff beschreibt einen Walk-Through?', ['Rollenspielartige IR-Plan-Durchsprache mit Schritt-für-Schritt-Abgleich', 'Reines Tabletop', 'Live-Pen-Test', 'Reine Backup-Übung'], 0, 'Detaillierter als TTX, weniger invasiv als Simulation.'),
                    q('Welcher Begriff beschreibt eine Simulation/Functional Exercise?', ['IR-Test mit Live-Systemen, kontrolliertem Szenario, ohne Production-Impact', 'Reines Tabletop', 'Reine TTX', 'Reine Backup-Übung'], 0, 'Näher an Realität als TTX/Walk-Through.'),
                    q('Welcher Begriff beschreibt einen Full-Interruption-Test?', ['BCP/DR-Übung mit echtem Failover auf DR-Site', 'Reines TTX', 'Reine Walk-Through', 'Reines Backup'], 0, 'Höchste Validität, größtes Risiko — nur für reife Organisationen.'),
                    q('Welche Eigenschaft hat ein Communications-Plan im IR?', ['Out-of-Band-Kanäle, Stakeholder-Liste, Sprachregelung, Rechtsabteilung', 'Reines technisches Diagramm', 'Reine Marketing-Liste', 'Reine Hardware-Liste'], 0, 'Inkl. PR, Legal, Behrden, Kunden, Mitarbeiter, Vendor.'),
                    q('Welche Eigenschaft hat ein CSIRT?', ['Computer Security Incident Response Team — Organisationseinheit für IR', 'Reine Marketing-Einheit', 'Reine Backup-Einheit', 'Reine Hardware-Einheit'], 0, 'CSIRT ist Synonym für CERT in Unternehmen.'),
                    q('Welche Eigenschaft hat ein CERT?', ['Computer Emergency Response Team — oft national/sektoriell (CERT-Bund, US-CERT)', 'Reine Marketing-Einheit', 'Reine Backup-Einheit', 'Reine Hardware-Einheit'], 0, 'Nationale CERTs koordinieren Sektoren-Vorfälle.'),
                    q('Welche Eigenschaft hat ein War-Room?', ['Dedizierter physischer/virtueller Raum für IR-Koordination', 'Reines Marketing', 'Reine Backup-Strategie', 'Reine Hardware-Liste'], 0, 'War-Room bündelt Stakeholder + Bildschirme + Telco-Kanäle.'),
                    q('Welche Eigenschaft hat ein Runbook?', ['Schritt-für-Schritt-Anleitung für standardisierten Vorfall-Response', 'Marketing-Broschüre', 'Reine Hardware-Doku', 'Reine TLS-Cipher-Liste'], 0, 'Runbook = konkrete Aktionen; Playbook = umfassende Strategie.'),
                    q('Welche Eigenschaft hat ein Playbook?', ['Strategische Vorgehensweise für Vorfall-Klasse — oft mehrere Runbooks bundling', 'Reine Hardware-Doku', 'Reine TLS-Cipher-Liste', 'Reines Marketing'], 0, 'Phishing-Playbook, Ransomware-Playbook, BEC-Playbook.'),
                    q('Welche Eigenschaft hat ein Hot Wash?', ['Lessons-Learned-Meeting binnen 1–2 Wochen nach IR-Abschluss', 'Reine Hardware-Reinigung', 'Reine TLS-Renew', 'Reines BIOS-Update'], 0, 'Direktes Feedback während Erinnerungen frisch sind.'),
                    q('Welche Eigenschaft hat ein After-Action-Report?', ['Schriftlicher IR-Abschlussbericht mit Findings, Ursache, Aktionen', 'Reine Hardware-Doku', 'Reine TLS-Cipher-Liste', 'Reines Marketing'], 0, 'AAR ist Pflicht für Compliance/Audit.'),
                    q('Welche Eigenschaft hat ein Root-Cause-Analysis?', ['Strukturierte Analyse der Grundursache (5 Whys, Fishbone, Bow-Tie)', 'Reine Hardware-Diagnose', 'Reine TLS-Renew', 'Reines BIOS-Update'], 0, 'RCA verhindert Wiederholungen; Action-Items mit Owner+Frist.'),
                    q('Welche Eigenschaft hat eine 5-Whys-Analyse?', ['Iteratives Hinterfragen der Ursachen, bis die Root Cause gefunden ist', 'Reine Hardware-Diagnose', 'Reine TLS-Cipher-Liste', 'Reines BIOS-Update'], 0, 'Toyota-Methode; einfach, aber wirksam.'),
                    q('Welche Eigenschaft hat ein E-Discovery?', ['Rechtsrelevante elektronische Beweis-Sammlung für Litigation', 'Reine Marketing-Aktivität', 'Reine Hardware-Diagnose', 'Reine TLS-Renew'], 0, 'E-Discovery folgt EDRM-Lifecycle (Identification, Preservation, ..., Production).'),
                    q('Welche Eigenschaft hat ein Litigation Hold?', ['Pflicht zur Sicherung relevanter Daten bei drohender Klage', 'Reine Marketing-Aktivität', 'Reine Hardware-Reinigung', 'Reine TLS-Renew'], 0, 'Spoliation kann zu Sanktionen führen.'),
                    q('Welche Eigenschaft hat ein Order of Volatility?', ['Reihenfolge der Beweis-Sicherung von höchst-volatil zu persistent', 'Reine Cloud-Reihenfolge', 'Reine Hardware-Reihenfolge', 'Reine WLAN-Reihenfolge'], 0, 'RFC 3227.'),
                    q('Welche Eigenschaft hat ein Memory-Image vor Disk-Image (Reihenfolge)?', ['RAM zuerst (volatiler), dann Disk', 'Disk zuerst', 'Egal', 'Backups zuerst'], 0, 'RAM verschwindet bei Power-Off.'),
                    q('Welche Eigenschaft hat ein Write-Blocker?', ['Hardware/Software, das Schreibzugriffe auf Beweis-Medien verhindert', 'Reine Backup-Funktion', 'Reine Cloud-Funktion', 'Reine WLAN-Funktion'], 0, 'Pflicht für forensische Disk-Imaging-Integrität.'),
                    q('Welche Eigenschaft hat ein Bit-by-Bit-Image?', ['Vollständige Sektor-genaue Kopie inkl. Slack-Space und gelöschter Bereiche', 'Reine logische Kopie', 'Reine Datei-Kopie', 'Reine Backup-Kopie'], 0, 'dd / dcfldd / dc3dd / FTK Imager erstellen forensisch valide Images.'),
                    q('Welche Eigenschaft hat ein Slack Space?', ['Ungenutzter Bereich am Ende eines Clusters — kann alte Daten enthalten', 'Reine Cloud-Region', 'Reine WLAN-Region', 'Reines Backup'], 0, 'Wichtig in der Forensik für versteckte/gelöschte Daten.'),
                    q('Welche Eigenschaft hat ein Unallocated Space?', ['Bereich, in dem gelöschte Dateien noch wiederherstellbar sein können', 'Reine Cloud-Region', 'Reine WLAN-Region', 'Reines Backup'], 0, 'File-Carving-Tools (PhotoRec, Scalpel) durchsuchen Unallocated Space.'),
                    q('Welche Eigenschaft hat ein Hashing in der Forensik?', ['Bestätigt Integrität des Beweis-Images (typisch SHA-256)', 'Reines Backup', 'Reines TLS', 'Reines DNS'], 0, 'Hash-Wert wird vor + nach Imaging berechnet und dokumentiert.'),
                    q('Welche Eigenschaft hat ein Timeline Analysis?', ['Chronologische Rekonstruktion von Datei-/Event-Aktivitäten', 'Reines Backup', 'Reines TLS', 'Reines DNS'], 0, 'Plaso/log2timeline + Timesketch sind Standard-Tools.'),
                    q('Welche Eigenschaft hat MAC-Times?', ['Modified, Accessed, Created — Datei-Metadaten-Zeiten', 'Reine Cloud-Region', 'Reine WLAN-Region', 'Reines Backup'], 0, 'Auch MFT-Einträge auf NTFS liefern detailliertere Zeitstempel.'),
                    q('Welche Eigenschaft hat ein USN-Journal?', ['NTFS-Update-Sequence-Number-Journal — protokolliert Datei-Änderungen', 'Reine Cloud-Region', 'Reine WLAN-Region', 'Reines Backup'], 0, 'Wichtig für Forensik nach Anti-Forensik-Versuchen.'),
                    q('Welche Eigenschaft hat ein Anti-Forensik?', ['Techniken zur Behinderung der Forensik (Log-Löschung, Timestomping, Wiping)', 'Reine Verteidigung', 'Reines Backup', 'Reine WLAN'], 0, 'Mitigation: zentrale Logs, Forwarding, Immutable Storage.'),
                    q('Welche Eigenschaft hat Timestomping?', ['Manipulation von Datei-Zeitstempeln zur Vertäuschung von Spuren', 'Reine Cloud-Methode', 'Reine WLAN-Methode', 'Reines Backup'], 0, 'Detection: MFT-Zeitstempel inkonsistent mit USN-Journal.'),
                    q('Welche Eigenschaft hat ein Steganografie-Indikator?', ['Versteckte Daten in Bildern/Audio (LSB-Manipulation, Container)', 'Reine TLS-Methode', 'Reine WLAN-Methode', 'Reines Backup'], 0, 'Tools: stegoVeritas, zsteg, OpenStego. Detection schwer.'),
                    q('Welche Eigenschaft hat ein Data Exfiltration via DNS?', ['Daten werden in TXT/A-Records / DNS-Queries codiert und an attacker-controlled Authoritative Server gesendet', 'Reine Cloud-Methode', 'Reine WLAN-Methode', 'Reines Backup'], 0, 'Detection: ungewöhnlich lange/random DNS-Labels, hohe Query-Rate.'),
                    q('Welche Eigenschaft hat ein Data Exfiltration via ICMP?', ['Daten in ICMP-Echo-Payloads codiert (z. B. icmpsh, ptunnel)', 'Reine Cloud-Methode', 'Reine WLAN-Methode', 'Reines Backup'], 0, 'Mitigation: ICMP-Egress-Filter, Tiefen-Inspektion.'),
                    q('Welche Eigenschaft hat ein Data Exfiltration via HTTPS?', ['Daten in TLS-verschlüsselten Streams an legitime Cloud-Services (z. B. Pastebin, GitHub Gist, Telegram-Bot, Discord-Webhook)', 'Reine WLAN-Methode', 'Reine Backup-Methode', 'Reines TLS-Disable'], 0, 'Detection: TLS-Inspektion, unbekannte/uncategorized Domains, Cloud-DLP.'),
                    q('Welche Eigenschaft hat ein Living-off-Trusted-Sites?', ['Exfil oder C2 über Cloud-Dienste mit gutem Reputations-Score', 'Reine Hardware-Methode', 'Reines BIOS', 'Reines Backup'], 0, 'Pastebin, AWS S3, Discord, Telegram, GitHub Pages, OneDrive sind häufig genutzt.')
                ]
            },
            {
                id: 'reporting',
                title: 'Kapitel 4 — Reporting & Communication',
                summary: 'Berichtswesen für technische und Executive-Zielgruppen, KPIs, Compliance-Mapping.',
                pages: [{
                    title: 'Berichts-Architektur',
                    html: `<h4>Stakeholder-Mapping</h4>
<ul><li>Executive (C-Level): Risiko, Geschäftsauswirkung, Budget.</li>
<li>Operations: Konkrete IoCs, Hosts, Aktionen.</li>
<li>Compliance: Mapping zu Rahmenwerken (PCI, HIPAA, NIS2).</li></ul>
<h4>Metriken</h4>
<p>MTTD, MTTR, Dwell Time, Number of Incidents, False-Positive-Rate, Patch-Compliance, Phishing-Click-Rate.</p>
<h4>Compliance-Reports</h4>
<p>SOC 2, ISO 27001, PCI-DSS — automatisierte Beweissammlung aus Cloud-Logs/Endpoint/SIEM.</p>`
                }, {
                    title: 'KPI-Katalog',
                    html: `<h4>Detection-KPIs</h4>
<table><tr><th>KPI</th><th>Ziel</th></tr><tr><td>MTTD</td><td>Min/Std (kontextabhängig)</td></tr><tr><td>MTTR</td><td>Std/Tage</td></tr><tr><td>Dwell Time</td><td>< 7 Tage anstreben</td></tr><tr><td>FP-Rate</td><td>< 10 %</td></tr><tr><td>True-Positive-Rate</td><td>maximal</td></tr><tr><td>Coverage (ATT&CK)</td><td>messbar via Heatmap</td></tr></table>
<h4>Vulnerability-KPIs</h4>
<p>Time-to-Patch nach Severity, KEV-Compliance-Rate, Asset-Coverage, Number of Critical Vulns Outstanding.</p>
<h4>People/Process-KPIs</h4>
<p>Phishing-Click-Rate, Phishing-Report-Rate, Awareness-Training-Compliance, On-call-Response-Time.</p>
<h4>Compliance-KPIs</h4>
<p>Audit-Findings (offen vs. geschlossen), Control-Test-Pass-Rate, Risk-Register-Volume, Risk-Heatmap-Trend.</p>`
                }, {
                    title: 'Audience-Tailoring',
                    html: `<h4>C-Level / Board</h4>
<ul><li>1–2 Seiten Executive Summary.</li><li>Sprache: Risiko, Wahrscheinlichkeit, Auswirkung in Euro/USD.</li><li>Visualisierung: Heatmap, Trendlinie, Top-Risiken.</li><li>Empfehlungen: strategisch, budgetbezogen.</li></ul>
<h4>Operations / SOC</h4>
<p>Detaillierte IoCs (Hashes, IPs, Domains), Hosts, Sigma-Regeln, MITRE-IDs, Container-IDs.</p>
<h4>Auditor / Compliance</h4>
<p>Mapping zu Controls (NIST 800-53, ISO 27001, PCI-DSS Req., SOC 2 TSC). Beweise: Logs, Screenshots, Policies, Test-Results, OSCAL-Files.</p>
<h4>Externe Stakeholder</h4>
<p>Kunden, Partner, Behörden, Medien. Inhalt redacted; Sprachregelung mit PR/Legal abgestimmt.</p>`
                }, {
                    title: 'Compliance-Frameworks',
                    html: `<h4>NIST CSF 2.0</h4>
<p>Sechs Funktionen (Govern, Identify, Protect, Detect, Respond, Recover) × 23 Categories. Tier-Modell für Reife (Partial → Adaptive).</p>
<h4>ISO 27001:2022</h4>
<p>ISMS mit 93 Annex-A-Controls in vier Themen (Organizational 37, People 8, Physical 14, Technological 34). Risk-Treatment-Plan + SoA (Statement of Applicability).</p>
<h4>PCI-DSS v4.0</h4>
<p>12 Requirements + Customized Approach. Pflicht ab 31.03.2025 voll wirksam. Targeted Risk Analysis für customized controls.</p>
<h4>SOC 2 (AICPA)</h4>
<p>Trust Service Criteria: Security (mandatory), Availability, Processing Integrity, Confidentiality, Privacy. Type I (Punkt-in-Zeit) vs. Type II (6–12 Monate Beobachtung).</p>
<h4>EU-Regulierung</h4>
<ul><li>DSGVO/GDPR — Datenschutz-Verordnung.</li><li>NIS2 — Cybersecurity für essentielle/wichtige Sektoren.</li><li>DORA — Finanzsektor-Resilienz.</li><li>EU AI Act — KI-Risikoklassen.</li><li>EU CRA (Cyber Resilience Act) — Produkthaftung mit digitalen Elementen.</li></ul>`
                }],
                quiz: [
                    q('Welche Metrik misst die Zeit von Detection bis Containment?', ['MTTR (in IR-Kontext)', 'MTBF', 'MTTF', 'TTL'], 0, 'Mean Time to Respond/Remediate.'),
                    q('Was ist Dwell Time?', ['Zeit zwischen initialer Kompromittierung und Detection', 'Backup-Frequenz', 'Patch-Zyklus', 'Reboot-Zeit'], 0, 'Mandiant M-Trends 2024: globaler Median ~10 Tage.'),
                    q('Welche Sprache eignet sich für ein Executive Summary?', ['Detailliertes IDS-Log', 'Geschäftsorientiert: Risiko, finanzielle Auswirkung, strategische Empfehlungen', 'CLI-Befehle', 'Hex-Dumps'], 1, 'C-Level entscheidet über Budget — geschäftliche Konsequenzen sind relevant.'),
                    q('Welche Praxis ist beim Vendor-Reporting Pflicht?', ['Konsistente, vergleichbare KPIs (MTTD/MTTR/Patch-SLA-Erfüllung)', 'Roh-Logs ohne Kontext', 'Nur Screenshots', 'Reine PowerPoint-Folien ohne Daten'], 0, 'Standardisierte KPIs sind Vertragsgrundlage.'),
                    q('Welche Zielgruppe braucht IoCs/Hashes konkret?', ['Operations / SOC-Analyst', 'CFO', 'Marketing', 'Empfangspersonal'], 0, 'Technische Details gehören in technische Berichte.'),
                    q('Welche Compliance-Mappingsprache ist verbreitet?', ['OSCAL (NIST)', 'SQL', 'XAML', 'TCL'], 0, 'Open Security Controls Assessment Language — strukturierte Compliance-Daten.'),
                    q('Welche False-Positive-Rate ist Idealziel?', ['Minimal, ohne True Positives zu unterdrücken', '50 %', '90 %', '100 %'], 0, 'Tuning-Ziel: niedrige FP-Rate ohne Alert-Fatigue, ohne TPs zu verlieren.'),
                    q('Welche Phishing-KPI ist Standard?', ['Click-Rate + Report-Rate', 'Anzahl gesendeter Mails allein', 'Datenmenge', 'IP-Adressen'], 0, 'Click-Rate sinkt, Report-Rate steigt mit Awareness-Reife.'),
                    q('Welcher Bericht-Typ ist für Behörden bei DSGVO-Verstoß notwendig?', ['Notification innerhalb 72 h gemäß Art. 33', 'Jährlicher Sustainability-Report', 'Vendor-Newsletter', 'Marketing-Brief'], 0, 'Art. 33 DSGVO 72-h-Meldepflicht.'),
                    q('Welche Diagrammart visualisiert Risiken nach Wahrscheinlichkeit × Auswirkung?', ['Heat Map / Risk Matrix', 'Pie Chart', 'Line Chart', 'Histogram'], 0, '5×5-Heat Maps sind GRC-Standard.'),
                    q('Welcher Communication-Channel ist während eines aktiven Incidents bevorzugt?', ['Out-of-Band (separater Messenger / Telefon)', 'Über das kompromittierte E-Mail-System', 'Twitter', 'Public Slack-Channel'], 0, 'Wenn Email-Server kompromittiert sein könnten — andere Kanäle wählen.'),
                    q('Welche Eigenschaft hat OSCAL?', ['Maschinenlesbares NIST-Format zur Beschreibung von Controls und Assessments', 'Backup-Format', 'TLS-Standard', 'Cloud-Provider-API'], 0, 'OSCAL = Open Security Controls Assessment Language.'),
                    q('Welche Audit-Frequenz ist für SOC 2 Type II üblich?', ['6–12 Monate Beobachtungszeitraum', 'Stündlich', 'Alle 5 Jahre', 'Einmalig zur Gründung'], 0, 'Type-II-Beobachtungszeitraum typischerweise 6–12 Monate.'),
                    q('Welche Eigenschaft hat ein SOC 2 Type I?', ['Punkt-in-Zeit-Bewertung der Control-Implementierung', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Type I = Design der Controls. Type II = Operating Effectiveness über Zeit.'),
                    q('Welche Eigenschaft haben SOC 2 Trust Service Criteria?', ['Security (mandatory) + optional Availability, Processing Integrity, Confidentiality, Privacy', 'Reine Hardware-Liste', 'Reine Cloud-Liste', 'Reine WLAN-Liste'], 0, 'AICPA TSC 2017 (revised 2022).'),
                    q('Welche Eigenschaft hat NIST CSF 2.0?', ['Sechs Funktionen: Govern (neu), Identify, Protect, Detect, Respond, Recover', 'Fünf Funktionen', 'Reine Cloud-Norm', 'Reine ITIL'], 0, 'CSF 2.0 (Februar 2024).'),
                    q('Welche NIST-CSF-Funktion ist neu in 2.0?', ['Govern', 'Detect', 'Respond', 'Recover'], 0, 'Govern adressiert Strategie, Risiko-Mgmt, Cybersecurity-Supply-Chain.'),
                    q('Welche Eigenschaft hat ISO 27001:2022?', ['ISMS-Standard mit 93 Annex-A-Controls in 4 Themen', 'Reine ITIL', 'Reine Cloud-Norm', 'Reines QM-System'], 0, 'ISO 27001:2022 ersetzte 2013er-Version.'),
                    q('Welche Eigenschaft hat ein Statement of Applicability (SoA)?', ['Dokumentiert, welche Annex-A-Controls anwendbar/nicht anwendbar sind und warum', 'Reine Hardware-Liste', 'Reine Cloud-Liste', 'Reine WLAN-Liste'], 0, 'SoA ist Pflichtdokument für ISO-27001-Zertifizierung.'),
                    q('Welche Eigenschaft hat ISO 27002:2022?', ['Implementierungs-Guide zu den 93 Annex-A-Controls', 'Zertifizierbare Norm', 'Reine Cloud-Norm', 'Reine ITIL'], 0, 'ISO 27002:2022 ist begleitender Guide; selbst nicht zertifizierbar.'),
                    q('Welche Eigenschaft hat ein Risk-Register?', ['Zentrale Liste aller identifizierten Risiken mit Owner, Wahrscheinlichkeit, Auswirkung, Treatment', 'Reine Hardware-Liste', 'Reine Cloud-Liste', 'Reine WLAN-Liste'], 0, 'ISO 31000 / NIST RMF erforderlich.'),
                    q('Welche Risk-Treatment-Optionen gibt es nach ISO 31000?', ['Avoid, Reduce/Mitigate, Transfer, Accept', 'Nur Avoid', 'Nur Accept', 'Nur Mitigate'], 0, 'Vier Standard-Optionen.'),
                    q('Welche Eigenschaft hat Risk Transfer?', ['Verlagerung des Risikos via Vertrag (Versicherung, Outsourcing, Indemnification)', 'Reine Eliminierung', 'Reine Akzeptanz', 'Reine Mitigation'], 0, 'Cyber-Insurance ist klassisches Beispiel.'),
                    q('Welche Eigenschaft hat Risk Avoidance?', ['Aktivität ganz unterlassen, um Risiko zu vermeiden', 'Reine Akzeptanz', 'Reine Mitigation', 'Reines Transfer'], 0, 'Z. B. nicht in einen Markt eintreten oder Service nicht anbieten.'),
                    q('Welche Eigenschaft hat Inherent Risk?', ['Risiko ohne Controls', 'Risiko mit Controls', 'Risiko nach Mitigation', 'Reine Akzeptanz'], 0, 'Inherent vs. Residual.'),
                    q('Welche Eigenschaft hat Residual Risk?', ['Risiko, das nach Anwendung der Controls verbleibt', 'Risiko ohne Controls', 'Reine Akzeptanz', 'Reine Mitigation'], 0, 'Akzeptanz erfordert formale Sign-off des Risk Owners.'),
                    q('Welche Eigenschaft hat eine Heatmap im Risk-Reporting?', ['Visualisierung Wahrscheinlichkeit × Auswirkung in Farb-Matrix', 'Reine Hardware-Diagnose', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'GRC-Standard 5×5 oder 4×4 Heatmaps.'),
                    q('Welche Eigenschaft hat ein Crown-Jewels-Analyse?', ['Identifikation der wichtigsten Assets/Daten/Prozesse', 'Reine Hardware-Liste', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Voraussetzung für risk-based Prioritization von Schutzmaßnahmen.'),
                    q('Welche Eigenschaft hat ein BIA?', ['Business Impact Analysis — quantifiziert Auswirkung von Ausfällen pro Prozess', 'Reine Hardware-Liste', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'BIA bestimmt RTO/RPO pro Prozess.'),
                    q('Welche Eigenschaft hat ein RTO?', ['Recovery Time Objective — maximale tolerierbare Wiederherstellungszeit', 'Recovery Point Objective', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'RTO bezieht sich auf die Zeit.'),
                    q('Welche Eigenschaft hat ein RPO?', ['Recovery Point Objective — maximaler tolerierbarer Datenverlust (Zeitfenster)', 'Recovery Time Objective', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'RPO bezieht sich auf den Datenverlust.'),
                    q('Welche Eigenschaft hat ein MTD?', ['Maximum Tolerable Downtime — oberste Grenze, ab der das Geschäft existenzgefährdend leidet', 'Reine Hardware-Diagnose', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'RTO < MTD.'),
                    q('Welche Eigenschaft hat ein WRT?', ['Work Recovery Time — Zeit nach Restore, bis Service betriebsbereit', 'Reine Hardware-Diagnose', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'RTO + WRT < MTD.'),
                    q('Welche Eigenschaft hat ein PCI-DSS v4.0?', ['12 Requirements + Customized Approach + Targeted Risk Analysis', 'Reine ISO-Norm', 'Reine NIS2-Norm', 'Reine GDPR-Norm'], 0, 'PCI-DSS v4.0 (März 2022); voll wirksam ab 31.03.2025.'),
                    q('Welche Eigenschaft hat NIS2?', ['EU-Cybersecurity-RL für essentielle/wichtige Sektoren mit Vorstandshaftung', 'Reine US-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'NIS2 (RL 2022/2555) — Umsetzung bis 17.10.2024.'),
                    q('Welche Eigenschaft hat DORA?', ['EU-VO 2022/2554 — Digital Operational Resilience für Finanzsektor, ab 17.01.2025', 'Reine US-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'DORA harmonisiert ICT-Risiko-Mgmt im Finanzsektor.'),
                    q('Welche Eigenschaft hat EU AI Act?', ['Risikobasierte KI-Regulierung mit Verboten für Unacceptable Risk und strengen Pflichten für High Risk', 'Reine US-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'EU AI Act (VO 2024/1689) — gestaffelt anwendbar ab 2025–2027.'),
                    q('Welche Eigenschaft hat EU CRA?', ['Cyber Resilience Act — Produkthaftung für Software/Hardware mit digitalen Elementen', 'Reine US-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'EU CRA (in Kraft 2024); Pflichten gelten ab 2026/2027.'),
                    q('Welche Eigenschaft hat HIPAA?', ['US-Gesundheitsdatenschutz mit Privacy + Security Rule', 'Reine EU-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'HIPAA (1996), HITECH (2009).'),
                    q('Welche Eigenschaft hat GLBA?', ['US-Finanzdatenschutz für Banken/Versicherungen', 'Reine EU-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'Gramm-Leach-Bliley Act (1999).'),
                    q('Welche Eigenschaft hat FERPA?', ['US-Bildungsdatenschutz', 'Reine EU-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'Family Educational Rights and Privacy Act.'),
                    q('Welche Eigenschaft hat SOX?', ['Sarbanes-Oxley Act — US-Finanzberichts-Compliance, ICFR-Anforderungen', 'Reine EU-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'SOX (2002) reagierte auf Enron/WorldCom.'),
                    q('Welche Eigenschaft hat ein OSCAL?', ['Open Security Controls Assessment Language — NIST-Standard für maschinenlesbare Compliance-Daten', 'Reines Backup-Format', 'Reines TLS-Format', 'Reines WLAN-Format'], 0, 'Reduziert manuelle Audit-Arbeit drastisch.'),
                    q('Welche Eigenschaft hat ein Continuous Compliance / Continuous Control Monitoring?', ['Automatische, kontinuierliche Beweissammlung aus Live-Systemen', 'Reine jährliche Prüfung', 'Reine Hardware-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Drata, Vanta, Tugboat Logic, AuditBoard sind etablierte Anbieter.'),
                    q('Welche Eigenschaft hat ein Privacy Impact Assessment (DPIA)?', ['DSGVO Art. 35 — strukturierte Risikobewertung für hochriskante Verarbeitungen', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'DPIA ist Pflicht für High-Risk Processing.'),
                    q('Welche Eigenschaft hat ein DPO?', ['Data Protection Officer — DSGVO Art. 37, unabhängige Rolle für Datenschutz-Compliance', 'Reine IT-Rolle', 'Reine HR-Rolle', 'Reine PR-Rolle'], 0, 'Pflicht für Behörden + Unternehmen mit hochriskanter Verarbeitung.'),
                    q('Welche Eigenschaft hat ein Data Subject Request (DSR)?', ['DSGVO-Anfrage zu Auskunft, Berichtigung, Löschung, Datenübertragbarkeit', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Antwort innerhalb 1 Monat (verlängerbar auf 3).'),
                    q('Welche Eigenschaft hat ein Right to be Forgotten?', ['DSGVO Art. 17 — Recht auf Löschung personenbezogener Daten', 'Reine US-Regelung', 'Reine Cloud-Funktion', 'Reine WLAN-Funktion'], 0, 'Mit Ausnahmen (z. B. gesetzliche Aufbewahrung).'),
                    q('Welche Eigenschaft hat ein Privacy by Design?', ['Datenschutz von Anfang an in System-Design integriert', 'Reine spätere Ergänzung', 'Reine Hardware-Funktion', 'Reine Cloud-Funktion'], 0, 'DSGVO Art. 25.'),
                    q('Welche Eigenschaft hat ein Pseudonymisierung?', ['Daten werden so umgewandelt, dass Identität nur mit zusätzlicher Information herstellbar ist', 'Vollständige Anonymisierung', 'Reine Hardware-Funktion', 'Reine Cloud-Funktion'], 0, 'DSGVO unterscheidet pseudonymisiert (re-identifizierbar) vs. anonymisiert (unwiederbringlich).'),
                    q('Welche Eigenschaft hat ein Data Minimization?', ['Nur die zur Aufgabe notwendigen Daten erheben/verarbeiten', 'Maximal viele Daten sammeln', 'Reine Hardware-Funktion', 'Reine Cloud-Funktion'], 0, 'DSGVO-Grundprinzip Art. 5(1)(c).')
                ]
            }
        ]
    });

    // ============================================================
    //  PenTest+ (PT0-002)
    // ============================================================
    window.SCHULUNGEN.list.push({
        id: 'pentest_plus',
        code: 'PT0-002',
        name: 'CompTIA PenTest+',
        short: 'PenTest+',
        desc: 'Offensive Security: Planning & Scoping, Information Gathering, Attacks & Exploits, Reporting & Communication.',
        chapters: [
            {
                id: 'planning',
                title: 'Kapitel 1 — Planning & Scoping',
                summary: 'Rules of Engagement, juristische Rahmenbedingungen, Cloud-Provider-Policies.',
                pages: [{
                    title: 'Vorbereitung',
                    html: `<h4>Rules of Engagement (RoE)</h4>
<ul><li>Scope (IPs, Domains, Apps, ausgenommene Ziele)</li><li>Zeitfenster, Methoden</li><li>Eskalations-Pfad bei kritischen Findings</li><li>Daten-Handling, NDA</li></ul>
<h4>Cloud-Pentest</h4>
<p>AWS/Azure/GCP haben spezifische Policies. DoS oft verboten oder genehmigungspflichtig. Shared-Tenancy darf nicht beeinträchtigt werden.</p>
<h4>Methodologien</h4>
<p>OSSTMM, PTES, NIST SP 800-115, OWASP WSTG, MITRE ATT&CK Adversary Emulation.</p>`
                }, {
                    title: 'Vertragsgrundlagen',
                    html: `<h4>Dokumenten-Stack</h4>
<ol><li><strong>MSA</strong> (Master Services Agreement) — langfristiger Rahmen.</li><li><strong>SOW</strong> (Statement of Work) — konkretes Engagement.</li><li><strong>RoE</strong> — Operative Regeln.</li><li><strong>NDA</strong> — Vertraulichkeit.</li><li><strong>Authorization Letter</strong> („Get-Out-of-Jail-Card“) — schriftliche Erlaubnis vom Asset-Owner.</li></ol>
<h4>Engagement-Typen</h4>
<table><tr><th>Typ</th><th>Wissen</th><th>Realität</th></tr><tr><td>Black Box</td><td>kein Vorwissen</td><td>externer Angreifer</td></tr><tr><td>Grey Box</td><td>teilweise (z. B. Standard-User)</td><td>Insider-Risiko</td></tr><tr><td>White Box</td><td>vollständig (Code, Architektur)</td><td>Code-Review</td></tr></table>
<h4>Goal-Based vs. Compliance</h4>
<p>Goal-Based = definierte Ziele (Domain Admin, exfiltrate Crown-Jewels). Compliance-Pen = PCI-DSS Req. 11.4 (jährlich + nach signifikanten Änderungen).</p>`
                }, {
                    title: 'Recht & Ethik',
                    html: `<h4>Rechtsrahmen DACH</h4>
<ul><li>§ 202a/b/c StGB („Hackerparagraph“) — Ausspähen, Abfangen, Vorbereitung.</li><li>§ 303a/b StGB — Datenveränderung, Computersabotage.</li><li>BDSG / DSGVO — personenbezogene Daten.</li><li>NIS2-Umsetzungsgesetz, KRITIS-Verordnungen.</li></ul>
<h4>USA</h4>
<p>CFAA (Computer Fraud and Abuse Act, 18 U.S.C. § 1030). Diverse Bundesstaaten haben strengere Cybercrime-Statutes.</p>
<h4>EU</h4>
<p>RL 2013/40/EU (Cybercrime), DSGVO, NIS2, EU CRA.</p>
<h4>Ethik-Codex</h4>
<p>EC-Council, (ISC)², OffSec, CompTIA verlangen Code-of-Ethics-Anerkennung. Kernpunkte: Authorization, Vertraulichkeit, do-no-harm, Berichtspflicht.</p>
<h4>Bug-Bounty-Programme</h4>
<p>Safe-Harbor-Klausel (z. B. ISO/IEC 29147 — Vulnerability Disclosure, ISO/IEC 30111 — Vulnerability Handling). HackerOne, Bugcrowd, Intigriti definieren konkrete Spielregeln.</p>`
                }, {
                    title: 'Scoping-Praxis',
                    html: `<h4>Asset-Inventarisierung</h4>
<p>IPs/Domains/URLs/Apps/Container-Image-Repos/Cloud-Accounts. Externe vs. interne Ziele explizit kennzeichnen.</p>
<h4>Time-Boxing</h4>
<ul><li>Zeitfenster (Start/Ende)</li><li>Tageszeiten (z. B. nur außerhalb Geschäftszeiten)</li><li>Behandlungs-Window für Re-Tests</li></ul>
<h4>Out-of-Scope-Liste</h4>
<p>Konkrete IP-/Hostnamen-Ausschlüsse, ggf. ganze Subnetze (Production-Datenbanken, Legacy-SCADA, Drittanbieter-SaaS, externe APIs ohne Genehmigung).</p>
<h4>Stop-Conditions</h4>
<ul><li>Kritisches Finding mit aktiver Drittparteibedrohung.</li><li>Service-Ausfall durch Test verursacht.</li><li>Personenbezogene Daten Dritter unerwartet eingesehen.</li><li>Beweis Dritter aktiv laufender Kompromittierung.</li></ul>
<h4>Communication-Plan</h4>
<p>Tagesreporting, Critical-Findings-Hotline, Status-Calls, Final-Read-out-Meeting.</p>`
                }],
                quiz: [
                    q('Welches Dokument fixiert den erlaubten Scope einer Pen-Engagement?', ['Rules of Engagement (RoE)', 'NDA allein', 'Service-Level Agreement', 'CISO-Calendar'], 0, 'RoE ist verbindlich für Scope, Timing, Eskalation.'),
                    q('Welche Einschränkung gilt häufig in Cloud-Pentests?', ['DoS-Tests sind oft verboten oder erlaubnispflichtig', 'TLS ist verboten', 'Nmap ist verboten', 'Browser-Tools sind verboten'], 0, 'AWS/Azure/GCP haben strikte AUPs — DoS schädigt Multi-Tenant-Infrastruktur.'),
                    q('Welche Methodologie ist webapp-spezifisch?', ['OWASP WSTG', 'OSSTMM', 'PTES', 'NIST 800-30'], 0, 'OWASP Web Security Testing Guide — Standard für Web-Apps.'),
                    q('Was ist eine Black-Box-Engagement?', ['Tester hat keine Vorabinfos außer dem Scope', 'Tester hat vollen Source-Zugriff', 'Tester ist intern angestellt', 'Tester hat Admin-Rechte'], 0, 'Black = blind. White = vollständige Info. Grey = teilweise.'),
                    q('Welche Vereinbarung schützt sensible Erkenntnisse?', ['NDA', 'TLS', 'Patch-Schedule', 'WAF-Rule'], 0, 'Non-Disclosure Agreement. Pflicht bei jedem ernsthaften Pentest.'),
                    q('Welche Informationsart erfordert besondere Vorsicht im Reporting?', ['Personenbezogene Daten und Klartext-Credentials', 'Open-Source-Versionsnummern', 'Server-IP', 'TLS-Cipher-Liste'], 0, 'PII / Credentials müssen redacted oder verschlüsselt übertragen werden.'),
                    q('Was ist „Out-of-Scope"?', ['Ziele/Methoden, die explizit NICHT getestet werden dürfen', 'Veraltete Tools', 'Cloud-Region', 'Compliance-Status'], 0, 'Out-of-Scope-Verstöße können rechtliche Konsequenzen haben.'),
                    q('Welcher Eskalationspfad ist Pflicht?', ['Sofortmeldung kritischer Findings (z. B. aktive Breaches Dritter, Lebensgefahr) an benannten Ansprechpartner', 'Erst am Engagement-Ende melden', 'Nur an die IT', 'Nur wenn der Kunde fragt'], 0, 'Im RoE explizit definiert.'),
                    q('Welche Methodologie ist NIST-Standard für Vulnerability/Pen-Tests?', ['NIST SP 800-115', 'NIST SP 800-53', 'NIST CSF', 'NIST AI RMF'], 0, '800-115 = Technical Guide to Information Security Testing and Assessment.'),
                    q('Was ist „Goal-Based Pentesting"?', ['Testen mit definierten Zielen (z. B. Domain Admin)', 'Stündlicher Scan', 'Reine Compliance-Erfüllung', 'Marketing-Test'], 0, 'Goal-Based ≈ Adversary-Emulation, oft mit MITRE ATT&CK Mapping.'),
                    q('Welcher Vertrag legt erlaubte Aktionen rechtlich fest?', ['Master Services Agreement / Statement of Work', 'PDF-Newsletter', 'Sales-Lead-Liste', 'Support-Ticket'], 0, 'MSA + SOW + RoE + NDA bilden den vollständigen Rahmen.'),
                    q('Welche Maßnahme schützt den Tester rechtlich?', ['Schriftliche Genehmigung des Asset-Owners (Authorization-Letter / Get-Out-of-Jail-Card)', 'Interne Slack-Nachricht', 'Verbal nur', 'Tweet'], 0, 'Schriftliche Authorization muss permanent erreichbar sein.'),
                    q('Welche Methodologie ist webapp-spezifisch und Kapitel-strukturiert?', ['OWASP WSTG v4.2', 'OSSTMM', 'NIST SP 800-115', 'PTES'], 0, 'OWASP Web Security Testing Guide v4.2 deckt 11 Kategorien.'),
                    q('Welche Methodologie ist OSI-Layer-orientiert?', ['OSSTMM v3', 'OWASP WSTG', 'PTES', 'NIST SP 800-115'], 0, 'OSSTMM (Open Source Security Testing Methodology Manual) deckt physische, drahtlose, Telecom, Daten, Human-Channel.'),
                    q('Welche Methodologie definiert sieben Phasen?', ['PTES (Pre-engagement Interactions, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, Reporting)', 'OSSTMM', 'OWASP WSTG', 'NIST CSF'], 0, 'PTES Penetration Testing Execution Standard.'),
                    q('Welche Methodologie ist mobile-app-spezifisch?', ['OWASP MASTG (Mobile Application Security Testing Guide)', 'OSSTMM', 'PTES', 'NIST 800-115'], 0, 'MASTG mit MASVS-Verifizierung (L1, L2, R).'),
                    q('Welche Methodologie ist API-spezifisch?', ['OWASP API Security Top 10 (2023)', 'OSSTMM', 'PTES', 'OWASP WSTG'], 0, 'API Top 10 2023: BOLA, Broken Auth, BOPLA, Unrestricted Resource Consumption, BFLA, ...'),
                    q('Welche OWASP-API-Top-10-Position adressiert Broken Object Level Authorization?', ['API1', 'API3', 'API5', 'API10'], 0, 'BOLA = klassischer IDOR-Angriff in APIs.'),
                    q('Welche Methodologie adressiert Adversary Emulation?', ['MITRE ATT&CK + CALDERA', 'Reine OWASP', 'Reine OSSTMM', 'Reine NIST CSF'], 0, 'Adversary Emulation imitiert spezifische Threat Actors (APT29, FIN7).'),
                    q('Welche Eigenschaft hat ein Goal-Based Pentest?', ['Definierte Erfolgs-Ziele (Domain Admin, Exfil von Crown Jewels)', 'Reines Compliance-Häkchen', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung'], 0, 'Goal-based ist realistischer als reine Vulnerability-Auflistung.'),
                    q('Welche Eigenschaft hat ein Compliance Pentest?', ['Erfüllt regulatorische Anforderung (z. B. PCI-DSS Req. 11.4)', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Compliance-getrieben, oft minimal-invasiv.'),
                    q('Welche Eigenschaft hat ein Red Team Engagement?', ['Realistische Adversary-Simulation über Wochen/Monate, mit Stealth, gegen reife Blue Teams', 'Reine Vulnerability-Suche', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung'], 0, 'Red Team testet Detection-/Response-Reife, nicht nur Schwachstellen.'),
                    q('Welche Eigenschaft hat ein Purple Team?', ['Iterative Red+Blue-Zusammenarbeit zur Detection-Verbesserung', 'Reines Red Team', 'Reines Blue Team', 'Reines Audit'], 0, 'Purple = Live-Kollaboration, nicht nachgelagert.'),
                    q('Welche Eigenschaft hat ein TIBER-EU?', ['Threat Intelligence Based Ethical Red-teaming für Finanzsektor', 'Reine Cloud-Norm', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'EZB-Framework, Test mit echter Threat-Intel-Grundlage.'),
                    q('Welche Eigenschaft hat ein CBEST?', ['UK-FCA-Framework für Threat-Intel-led Red Teaming im Finanzsektor', 'Reine Cloud-Norm', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'Bank of England + FCA + CREST koordinieren CBEST.'),
                    q('Welche Eigenschaft hat ein DORA TLPT?', ['EU-DORA Threat-Led Penetration Test — Pflicht für signifikante Finanzentitäten alle 3 Jahre', 'Reine Cloud-Norm', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'DORA RTS 2024 referenziert TIBER-EU-Methodik.'),
                    q('Welche Eigenschaft hat ein PCI-DSS Req. 11.4?', ['Pflicht zu Penetration Testing extern + intern, jährlich und nach signifikanten Änderungen', 'Reine Cloud-Norm', 'Reine ISO-Norm', 'Reine WLAN-Norm'], 0, 'Voraussetzung: Methodik dokumentiert (z. B. NIST SP 800-115).'),
                    q('Welche Pflicht-Häufigkeit fordert PCI-DSS für Pentest?', ['Jährlich + nach signifikanten Änderungen', 'Monatlich', 'Quartalsweise', 'Alle 5 Jahre'], 0, 'Quartalsweise sind nur ASV-External-Vuln-Scans (Req. 11.3).'),
                    q('Welche Pflicht-Häufigkeit fordert PCI-DSS für ASV-Scans?', ['Quartalsweise (extern) + nach signifikanten Änderungen', 'Jährlich', 'Monatlich', 'Alle 5 Jahre'], 0, 'PCI-DSS Req. 11.3.2.'),
                    q('Welche Eigenschaft hat ein Bug-Bounty?', ['Crowdsourced Vuln-Entdeckung mit gestaffelter Belohnung', 'Reine Compliance-Prüfung', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung'], 0, 'HackerOne, Bugcrowd, Intigriti, YesWeHack, Synack.'),
                    q('Welche Eigenschaft hat ein Safe-Harbor-Statement?', ['Rechtliche Zusicherung, dass Researcher bei Einhaltung der Regeln nicht verklagt werden', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Disclose.io standardisiert Safe-Harbor-Sprache.'),
                    q('Welche Eigenschaft hat ein Coordinated Vulnerability Disclosure?', ['Strukturierter Prozess zwischen Reporter und Vendor mit Frist und Embargo (ISO/IEC 29147)', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'CVD ersetzt das veraltete „Responsible Disclosure“-Wording.'),
                    q('Welche Eigenschaft hat ein 90-Tage-Disclosure (Project Zero)?', ['Standard-Frist für Vendor-Patch vor Public Disclosure', 'Reine ISO-Norm', 'Reine PCI-Norm', 'Reine HIPAA-Norm'], 0, 'Google Project Zero, viele andere Researcher folgen 90+30-Tage-Modell.'),
                    q('Welche Eigenschaft hat ein Engagement Pre-Briefing?', ['Kick-off-Meeting mit Stakeholdern über Scope, RoE, Communication, Eskalation', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Pflicht für klare Erwartungshaltung.'),
                    q('Welche Eigenschaft hat ein Engagement Read-out?', ['Final-Meeting zur Vorstellung der Findings + Q&A mit Stakeholdern', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Read-out vor offiziellem Bericht erhöht Verständnis.'),
                    q('Welche Eigenschaft hat ein Re-Test?', ['Erneuter gezielter Test der Findings nach Remediation', 'Reine Compliance-Prüfung', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung'], 0, 'Verifikation, dass Patches die Findings tatsächlich schließen.'),
                    q('Welche Eigenschaft hat ein Threat Modeling im Scoping?', ['Vorabanalyse, welche TTPs realistisch sind und welche Ziele relevant sind', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'STRIDE / PASTA / Attack-Trees als Hilfsmittel.'),
                    q('Welcher Cloud-Provider verlangt explizite Genehmigung für ALLE Pentest-Aktionen?', ['Heutige AWS-Policy: Customer Penetration Testing erlaubt ohne präemptive Genehmigung für definierte Services; gewisse Aktivitäten weiterhin verboten/eingeschränkt', 'Generelles Verbot', 'Reine Cloud-Disable', 'Reine WLAN-Disable'], 0, 'AWS aktualisiert die Customer Support Policy für Penetration Testing regelmäßig — vor jedem Engagement Policy lesen.'),
                    q('Welche Aktion ist bei AWS-Pentest typischerweise verboten?', ['DoS/DDoS, Port-Flooding, DNS-Hijacking, Phishing gegen AWS-Mitarbeiter', 'Vuln-Scanning eigener EC2', 'IAM-Audit', 'CloudTrail-Auswertung'], 0, 'AWS Customer Support Policy for Penetration Testing.'),
                    q('Welche Aktion ist bei Azure-Pentest typischerweise verboten?', ['DoS gegen Shared-Infrastructure, Port-Flooding, Compromise von Microsoft-Services', 'Vuln-Scanning eigener VMs', 'Azure AD Audit', 'Defender-Auswertung'], 0, 'Microsoft Azure Penetration Testing Rules of Engagement.'),
                    q('Welche Eigenschaft hat ein Engagement Letter?', ['Schriftliche Vereinbarung, die Scope, Limitationen, Verantwortlichkeiten und Vertraulichkeit fixiert', 'Reine Marketing-Broschüre', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung'], 0, 'Engagement Letter ist juristisches Rückgrat.'),
                    q('Welche Eigenschaft hat ein § 202c StGB?', ['DE-Strafnorm „Vorbereiten des Ausspähens und Abfangens von Daten“ („Hackertools-Paragraph“)', 'Reine US-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'Rechtfertigung erfolgt über dokumentierte Authorization.'),
                    q('Welche Eigenschaft hat ein CFAA?', ['US-Computer Fraud and Abuse Act, 18 U.S.C. § 1030', 'Reine EU-Regelung', 'Reine ISO-Norm', 'Reine PCI-Norm'], 0, 'CFAA reguliert unauthorized access in den USA.'),
                    q('Welche Eigenschaft hat ein Computer-Misuse Act 1990?', ['UK-Strafnorm gegen unautorisierten Zugriff', 'Reine US-Regelung', 'Reine EU-Regelung', 'Reine ISO-Norm'], 0, 'CMA 1990 mit Updates bis 2015; aktuelle Reform-Diskussion.'),
                    q('Welche Eigenschaft hat ein Convention on Cybercrime (Budapest)?', ['Internationaler Vertrag des Europarats zur Bekämpfung von Cybercrime', 'Reine US-Regelung', 'Reine EU-VO', 'Reine ISO-Norm'], 0, 'Budapest-Konvention (2001) mit erstem Zusatzprotokoll (2003) und zweitem (2022).'),
                    q('Welche Eigenschaft hat ein NDA?', ['Non-Disclosure Agreement — Vertraulichkeitsverpflichtung', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'NDA ist Pflicht; auch Mitarbeiter des Auftragnehmers müssen Bonding haben.'),
                    q('Welche Eigenschaft hat ein MSA?', ['Master Services Agreement — langfristiger Rahmenvertrag', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'MSA + SOWs erlauben mehrere Engagements ohne neue MSA-Verhandlung.'),
                    q('Welche Eigenschaft hat ein SOW?', ['Statement of Work — konkretes Engagement-Detail (Scope, Deliverables, Termine, Preise)', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'SOW ist projektspezifisch.'),
                    q('Welche Eigenschaft hat ein Liability-Cap im SOW?', ['Maximaler Schadensersatz, der vertraglich begrenzt wird', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Standard-Klausel; oft Cap = Vertragsvolumen × 1–3.')
                ]
            },
            {
                id: 'recon',
                title: 'Kapitel 2 — Information Gathering & Vulnerability Scanning',
                summary: 'OSINT, aktive/passive Reconnaissance, Scanner-Strategien, Validation.',
                pages: [{
                    title: 'Reconnaissance',
                    html: `<h4>Passiv vs. Aktiv</h4>
<ul><li>Passiv: Shodan, Censys, crt.sh, DNS-History, GitHub-Leaks, Wayback-Machine.</li>
<li>Aktiv: Nmap, masscan, RustScan, Fingerprint-Tools (whatweb, Wappalyzer).</li></ul>
<h4>Nmap-Cheat</h4>
<table><tr><th>Switch</th><th>Bedeutung</th></tr>
<tr><td>-sS</td><td>SYN/Stealth</td></tr><tr><td>-sT</td><td>TCP-Connect</td></tr><tr><td>-sU</td><td>UDP</td></tr><tr><td>-sV</td><td>Service-Version</td></tr><tr><td>-O</td><td>OS-Detection</td></tr><tr><td>-A</td><td>Aggressive (sV+O+Script+Trace)</td></tr><tr><td>-T0…T5</td><td>Timing</td></tr></table>
<h4>Validation</h4>
<p>Scanner-Findings müssen durch manuelle Reproduktion verifiziert werden — gegen False Positives.</p>`
                }, {
                    title: 'OSINT-Techniken',
                    html: `<h4>Mitarbeiter & Org</h4>
<p>LinkedIn (Org-Charts, Tech-Stack), GitHub (Code-Leaks, Secrets), StackOverflow, Konferenz-Talks, Pitch-Decks. theHarvester, Maltego, SpiderFoot automatisieren OSINT-Sammlung.</p>
<h4>Domain & Subdomain</h4>
<p>crt.sh (CT-Logs), Subfinder, Amass, dnsx, Assetfinder, Chaos-DB (Project Discovery), Shodan, Censys.</p>
<h4>Cloud-Infrastruktur</h4>
<p>S3-Bucket-Discovery (Bucket Stream, S3Scanner), GCS-Buckets, Azure-Blob, GCP-Storage. CloudEnum für Multi-Cloud-Discovery. Tipp: Bucket-Naming-Konvention raten (Brand-Names, dev/stage/prod).</p>
<h4>Code & Secrets</h4>
<p>GitHub-Search-Operators, Gitleaks/TruffleHog, Trufflehog Enterprise, GitHound. Pastebin/PasteHunter, Public Postman/Insomnia Workspaces, leaked .env-Files in archive.org.</p>
<h4>Personnel</h4>
<p>HaveIBeenPwned-API, DeHashed, IntelX, breach-DBs (mit Vorsicht und Legalität!). Zur Bewertung der Re-Use-Risiken.</p>`
                }, {
                    title: 'Aktive Reconnaissance',
                    html: `<h4>Port-Scanning-Strategien</h4>
<ul><li>Discovery: -sn (Ping), -PR (ARP, lokal), -PS/-PA (TCP-SYN/ACK), -PE (ICMP-Echo).</li><li>SYN-Scan: -sS (default als root), Stealth-modus.</li><li>UDP: -sU (langsam, viele Antworten implizit).</li><li>TCP-Connect: -sT (kein root nötig, lauter).</li></ul>
<h4>Nmap-Skripting</h4>
<p>NSE (Nmap Scripting Engine) mit Kategorien: auth, brute, default, discovery, dos, exploit, external, fuzzer, intrusive, malware, safe, version, vuln. Aufruf: --script=vuln,safe.</p>
<h4>Web-Fingerprinting</h4>
<p>WhatWeb, Wappalyzer, Webanalyze (CLI), HTTPx (Project Discovery). Erkennen CMS/Frameworks/Versionen für CVE-Mapping.</p>
<h4>SMB/RPC-Enum</h4>
<p>enum4linux-ng, smbclient, rpcclient, ldapsearch. Findet Shares, User, Domain-Info bei schwacher Konfiguration.</p>
<h4>Cloud-Metadata-Probing</h4>
<p>Bei SSRF: 169.254.169.254 (AWS, GCP, Azure-IMDS). IMDSv2 erfordert PUT-Token.</p>`
                }, {
                    title: 'Vulnerability Identification',
                    html: `<h4>Vuln-Scanner</h4>
<p>Nessus (Tenable), Qualys, Rapid7 InsightVM, OpenVAS/Greenbone, Nuclei (template-driven), Nexpose. Cloud: ScoutSuite, Prowler, CloudSploit, Cartography.</p>
<h4>Web-Vuln-Scanner</h4>
<p>OWASP ZAP, Burp Suite (Pro), Acunetix, Invicti, Nikto, w3af. Wichtig: Authentifizierte Scans für Behind-Auth-Endpunkte.</p>
<h4>API-Testing</h4>
<p>Postman + Newman, OpenAPI-/Swagger-Spec-Parsing, Akto, APIsec. Zielt auf BOLA/BFLA/IDOR/Mass Assignment.</p>
<h4>Container & K8s</h4>
<p>Trivy (Image+IaC+SBOM), Grype, Kube-Hunter, Kubescape, kube-bench (CIS K8s). Helm-Charts auf Defaults prüfen.</p>
<h4>Validation & Triage</h4>
<p>Findings nach Reproduktion gewichten. Bei Black-Box: Service-Stabilität, keine Datenexfil ohne Genehmigung. Bei Cloud: Read-only-Validation bevor schreibender Zugriff.</p>`
                }],
                quiz: [
                    q('Welcher Nmap-Switch macht einen Stealth-SYN-Scan?', ['-sS', '-sT', '-sU', '-sX'], 0, '-sS sendet SYN, sieht Antwort, sendet RST — Handshake nicht abgeschlossen.'),
                    q('Welche Quelle liefert öffentliche TLS-Zertifikate als OSINT?', ['crt.sh / Certificate Transparency Logs', 'IPFS', 'NTP-Pool', 'BIOS-Update-Server'], 0, 'CT-Logs (RFC 6962) sind durchsuchbar via crt.sh — Subdomain-Discovery.'),
                    q('Welcher Begriff beschreibt rein passives Sammeln öffentlicher Quellen?', ['OSINT', 'Pivoting', 'Privilege Escalation', 'Lateral Movement'], 0, 'Open Source Intelligence — keine Pakete an das Ziel.'),
                    q('Welcher Scanner ist auf hohe Geschwindigkeit (Gbit/s) optimiert?', ['masscan / RustScan', 'Notepad', 'PuTTY', 'WinRAR'], 0, 'masscan kann ganze IPv4-Adressräume in Minuten scannen.'),
                    q('Welche Eigenschaft hat -sV bei Nmap?', ['Versions-Detection auf offenen Ports', 'Stealth-Modus', 'Disable-Logging', 'OS-Fingerprint'], 0, 'Probt Banner und matcht gegen nmap-service-probes.'),
                    q('Welcher Befehl zeigt DNS-Subdomains aktiv via Wordlist?', ['amass / dnsx / subfinder', 'PuTTY', 'WinSCP', 'Notepad'], 0, 'Subdomain-Enumeration-Tools (Project Discovery + OWASP Amass).'),
                    q('Welche OSINT-Quelle zeigt historische Webseiten-Versionen?', ['Wayback Machine (archive.org)', 'Shodan', 'crt.sh', 'NVD'], 0, 'Wayback Machine — historische Snapshots, oft mit veralteten endpoints/secrets.'),
                    q('Was ist Banner-Grabbing?', ['Service-Identifikation über Antwort-Banner', 'Web-Banner-Werbung', 'OSINT-Methode', 'WAF-Evasion'], 0, 'z. B. SSH-Version, HTTP-Server-Header.'),
                    q('Welche Eigenschaft hat -T4 in Nmap?', ['Aggressive Timing — schneller, lauter', 'Sehr langsam', 'Disable Scripts', 'Privilegien-Escalation'], 0, 'Timing-Templates T0–T5 (paranoid bis insane).'),
                    q('Welche Tool-Klasse erkennt Tech-Stacks von Webseiten?', ['Wappalyzer / WhatWeb', 'PuTTY', 'Wireshark', 'Volatility'], 0, 'Erkennt Frameworks, CMS, Versionen.'),
                    q('Welche Discover-Methode ist passiv?', ['DNS-Zone-Transfer-Versuch', 'Shodan-Suche', 'Nmap-Scan', 'NSE-Script'], 1, 'Shodan = passiv. Zone-Transfer = aktiv (DNS-Anfrage).'),
                    q('Welcher Wert ist eine sinnvolle Validierungspraxis bei Scanner-Findings?', ['Manuelle Reproduktion + ggf. PoC-Exploit', 'Blindes Vertrauen', 'Direkt eskalieren ohne Test', 'Ignorieren'], 0, 'False Positives sind teuer — Validierung Pflicht.'),
                    q('Welcher Nmap-Switch macht UDP-Scan?', ['-sU', '-sT', '-sS', '-sX'], 0, 'UDP-Scans sind langsam wegen Rate-Limits und impliziter „open|filtered“-Antworten.'),
                    q('Welcher Nmap-Switch macht OS-Detection?', ['-O', '-sO', '-sV', '-A'], 0, '-O nutzt TCP/IP-Stack-Fingerprints (TTL, Window-Size, Options).'),
                    q('Welcher Nmap-Switch kombiniert sV, O, NSE-default und Traceroute?', ['-A (Aggressive)', '-sS', '-sn', '-Pn'], 0, '-A ist laut, aber liefert maximale Info pro Scan.'),
                    q('Welcher Nmap-Switch überspringt Host-Discovery (Ping)?', ['-Pn', '-sn', '-PR', '-PS'], 0, '-Pn behandelt alle Targets als online — wichtig hinter ICMP-Filtering.'),
                    q('Welcher Nmap-Switch macht reine Host-Discovery ohne Port-Scan?', ['-sn', '-Pn', '-sS', '-sU'], 0, '-sn (früher -sP) — Ping-Sweep.'),
                    q('Welcher Nmap-Switch erhöht Verbosity?', ['-v / -vv / -vvv', '-q', '-s', '-T'], 0, 'Mehr -v = mehr Detail in Konsolen-Ausgabe.'),
                    q('Welche Nmap-Output-Form ist greppable?', ['-oG', '-oN normal', '-oX XML', '-oA all'], 0, '-oG ist Legacy-Format, oft kombiniert mit awk/grep. -oA schreibt alle drei Formate.'),
                    q('Welcher Wert hat eine Nmap-Aggressive-Timing-Stufe T4?', ['Schnelles Scanning auf zuverlässigen Netzen, default für LAN-Scans', 'Sehr langsam', 'Disable Scripts', 'Privilege Escalation'], 0, 'T4 ist Standard für CTF/Lab. T3 ist Default. T0/T1 = paranoid für IDS-Evasion.'),
                    q('Welcher Nmap-Switch ist NSE-Aufruf?', ['--script=<name>', '-sN', '-sP', '-Pn'], 0, 'NSE-Skripte erweitern Nmap deutlich (z. B. ssl-enum-ciphers, http-shellshock, smb-vuln-ms17-010).'),
                    q('Welche Nmap-Skript-Kategorie umfasst sicherheitsrelevante Tests?', ['vuln', 'safe', 'discovery', 'auth'], 0, 'vuln testet bekannte Schwachstellen — oft intrusive.'),
                    q('Welche Tool-Klasse erkennt Subdomain-Takeover?', ['Subjack, Subzy, Nuclei takeover-Templates', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Erkennt dangling DNS-Records auf nicht-claimed Cloud-Services.'),
                    q('Welche Tool-Klasse macht template-basierte Schwachstellen-Detection?', ['Nuclei (Project Discovery)', 'Reines Nmap', 'Reines Wireshark', 'Reines PuTTY'], 0, 'Nuclei mit YAML-Templates für CVEs, Misconfigs, Exposures.'),
                    q('Welche Tool-Klasse ist HTTP-fokussierter Probe?', ['HTTPx (Project Discovery)', 'Reines DNS-Lookup', 'Reines Volatility', 'Reines BIOS-Update'], 0, 'HTTPx prüft HTTP/HTTPS-Status, Title, Tech-Stack, TLS-Cert auf Massen-URL-Listen.'),
                    q('Welche Tool-Klasse macht Web-Endpoint-Enumeration?', ['ffuf, gobuster, dirsearch, feroxbuster', 'Reines DNS-Lookup', 'Reines Volatility', 'Reines BIOS-Update'], 0, 'Wordlist-basierte Brute-Force-Discovery von Pfaden, VHosts, Parameter.'),
                    q('Welche Tool-Klasse macht JS-File-Discovery & Endpoint-Extraction?', ['LinkFinder, JSFinder, getJS, hakrawler', 'Reines DNS-Lookup', 'Reines Volatility', 'Reines BIOS-Update'], 0, 'JS-Files enthalten oft API-Endpoints und Secrets.'),
                    q('Welche Tool-Klasse fingerprintet Web-Tech-Stack?', ['WhatWeb, Wappalyzer, Webanalyze, BuiltWith', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Erkennt Frameworks, CMS, Versionen für CVE-Mapping.'),
                    q('Welche Tool-Klasse macht WAF-Detection?', ['wafw00f, identYwaf', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Identifiziert WAF-Hersteller (Cloudflare, AWS WAF, Akamai, Imperva).'),
                    q('Welche Tool-Klasse macht TLS-Cipher-Audit?', ['testssl.sh, sslyze, nmap ssl-enum-ciphers', 'Reines Nmap-PortScan', 'Reines Wireshark', 'Reines Volatility'], 0, 'Prüft TLS-Versionen, Cipher, Heartbleed, Logjam, FREAK, ROBOT.'),
                    q('Welche Tool-Klasse macht Cloud-Account-Audit (read-only)?', ['ScoutSuite, Prowler, CloudSploit, Pacu', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Pacu kann auch offensive Aktionen — nur mit Genehmigung!'),
                    q('Welche Tool-Klasse macht K8s-Pen-Test?', ['Kube-Hunter, Kubescape, kube-bench, KubiScan', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Kube-Hunter sucht aktiv nach K8s-Schwachstellen; kube-bench prüft CIS-K8s-Benchmark.'),
                    q('Welche Tool-Klasse macht Container-Image-Audit?', ['Trivy, Grype, Snyk, Clair, Anchore', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'CVE + Misconfig + Secret-Scanning in einem Tool (Trivy).'),
                    q('Welche Tool-Klasse macht IaC-Audit?', ['Checkov, tfsec, KICS, Terrascan, Snyk IaC', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Shift-Left: findet Misconfigs vor Deployment.'),
                    q('Welche Tool-Klasse macht Secret-Scanning in Repos?', ['Gitleaks, TruffleHog, Detect-Secrets, GitGuardian', 'Reines Nmap', 'Reines Wireshark', 'Reines Volatility'], 0, 'Pre-Commit-Hooks + CI-Integration sind Best Practice.'),
                    q('Welche Eigenschaft hat ein Banner-Grabbing?', ['Service-Identifikation über Antwort-Banner (z. B. SSH-Version, HTTP-Server-Header)', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Tools: nmap -sV, netcat, curl, telnet.'),
                    q('Welche Eigenschaft hat ein Banner-Grabbing mit netcat?', ['nc <ip> <port> + manuelle Eingabe (z. B. HEAD / HTTP/1.0)', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Manuelles Banner-Grabbing umgeht Service-Detection-Heuristiken.'),
                    q('Welche Eigenschaft hat ein DNS-Zonen-Transfer (AXFR)?', ['Anfrage für komplette Zonen-Replikation — in Misconfig oft öffentlich möglich', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'dig @<ns> <domain> AXFR. Liefert oft viele interne Hostnamen.'),
                    q('Welche Eigenschaft hat ein Reverse-DNS-Lookup?', ['IP → Hostname-Auflösung über PTR-Records', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Wichtig für Discovery von Gegenüberhostnamen.'),
                    q('Welche Eigenschaft hat ein Forward-DNS-Brute-Force?', ['Wordlist gegen <wort>.<domain> mit dnsx/subfinder/amass', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Lässt sich über Wildcard-DNS verifizieren.'),
                    q('Welche Eigenschaft hat ein DNS-Wildcard?', ['*.<domain> antwortet für beliebige Subdomains — Brute-Force liefert dann Trash', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Erkennen via Random-Subdomain-Probe.'),
                    q('Welche Eigenschaft hat ein OSINT via crt.sh?', ['Suche über Certificate-Transparency-Logs, liefert oft alle TLS-aktivierten Subdomains', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'crt.sh ist passive, friert auch interne Hosts auf, wenn deren Cert public ist.'),
                    q('Welche Eigenschaft hat ein Shodan-Suche?', ['Index aller Internet-erreichbaren Services + Banner', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Shodan ist passiv — keine Pakete an das Ziel.'),
                    q('Welche Eigenschaft hat ein Censys-Suche?', ['Alternative zu Shodan, mit detaillierter TLS-Cert-Analyse', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Censys hat tieferen Cert-/JARM-Fokus.'),
                    q('Welche Eigenschaft hat ein FOFA?', ['China-zentrierter Internet-Asset-Suchmaschinen-Service', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Alternative zu Shodan/Censys; oft mit anderen Beobachtungen.'),
                    q('Welche Eigenschaft hat ein ZoomEye?', ['Weitere China-zentrierte Internet-Asset-Suchmaschine', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'ZoomEye ist Knownsec.'),
                    q('Welche Eigenschaft hat ein Have-I-Been-Pwned-API?', ['Prüfung, ob E-Mail/Hash in bekannten Breaches enthalten ist', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Troy Hunt; respektiert Privacy via k-Anonymity.'),
                    q('Welche Eigenschaft hat ein Wayback-Machine?', ['archive.org — historische Snapshots, oft mit veralteten Endpunkten/Secrets', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Tools: waybackurls, gau, hakrawler integrieren Wayback.'),
                    q('Welche Eigenschaft hat ein GitHub-Dorking?', ['Suche nach Secrets in öffentlichen Repos via Operators (filename:, extension:, language:)', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'Klassische Suchen: filename:.env, extension:pem, language:python AWS_SECRET.'),
                    q('Welche Eigenschaft hat ein Google-Dorking?', ['Suche nach exposed Files/Dirs via site:, inurl:, intitle:, filetype:', 'Reine Cloud-Operation', 'Reine WLAN-Operation', 'Reines BIOS-Update'], 0, 'GHDB (Google Hacking Database) listet bekannte Dorks.')
                ]
            },
            {
                id: 'attacks',
                title: 'Kapitel 3 — Attacks & Exploits',
                summary: 'Web-, Netzwerk-, Wireless-, Cloud-, Social-Engineering-Angriffe.',
                pages: [{
                    title: 'Exploitation',
                    html: `<h4>Web-Top</h4>
<ul><li>SQLi (CWE-89) — sqlmap, parameterisierte Statements als Fix.</li>
<li>XSS (CWE-79) — Output-Encoding, CSP.</li>
<li>SSRF (CWE-918) — gefährlich in Cloud (IMDS-Abuse: 169.254.169.254). IMDSv2 erzwingen!</li>
<li>IDOR — Object-Level-Authorization fehlt.</li>
<li>RCE — Deserialization, Template-Injection.</li></ul>
<h4>Netzwerk</h4>
<p>SMB-Relay, Pass-the-Hash/Ticket, Kerberoasting, AS-REP-Roasting, NTLM-Downgrade.</p>
<h4>Wireless</h4>
<p>WPA2-Handshake-Capture + Crack (hashcat), Rogue-AP, Evil-Twin, KRACK (CVE-2017-13077).</p>
<h4>Cloud</h4>
<p>IMDS-Stehlen, S3-Misconfig, IAM-Privilege-Escalation, OAuth-Phishing.</p>`
                }, {
                    title: 'Active Directory Angriffe',
                    html: `<h4>Recon im AD</h4>
<p>BloodHound + SharpHound, ADRecon, PingCastle. Identifiziert Pfade zu Domain Admin via Graph-Analyse.</p>
<h4>Credential-Angriffe</h4>
<ul><li><strong>Kerberoasting</strong> (T1558.003) — Service-Ticket-Hashes mit hashcat -m 13100 cracken. Mitigation: gMSA + 25+ Zeichen-Passwörter.</li><li><strong>AS-REP-Roasting</strong> (T1558.004) — User mit „Does not require Kerberos preauth“. hashcat -m 18200.</li><li><strong>DCSync</strong> (T1003.006) — GetNCChanges-Replikation — Domain-Hashes.</li><li><strong>DCShadow</strong> (T1207) — Fake-DC injiziert AD-Änderungen.</li><li><strong>Pass-the-Hash</strong> (T1550.002) — NTLM-Hash als Credential.</li><li><strong>Pass-the-Ticket</strong> (T1550.003) — Kerberos-Ticket re-use.</li><li><strong>Golden Ticket</strong> — KRBTGT-Hash fälscht TGT.</li><li><strong>Silver Ticket</strong> — Service-Account-Hash fälscht Service-Ticket.</li></ul>
<h4>Trust-Abuse</h4>
<p>SID-History-Injection, Bidirectional Trusts, Cross-Forest-Privilege-Escalation. PrintNightmare (CVE-2021-34527), ZeroLogon (CVE-2020-1472), PetitPotam (CVE-2021-36942).</p>
<h4>LAPS / Tier-Modell</h4>
<p>LAPS rotiert lokale Admin-Passwörter (jetzt Windows-LAPS). Tier-Modell trennt Tier 0 (DC, ADCS) / Tier 1 (Server) / Tier 2 (Workstations) administrativ.</p>`
                }, {
                    title: 'Cloud- & Container-Angriffe',
                    html: `<h4>AWS</h4>
<ul><li>SSRF auf 169.254.169.254 — IMDSv1 liefert Credentials, IMDSv2 erzwingt Token.</li><li>S3-Bucket-Misconfig (Public ACL, Bucket-Policy, ListBucket).</li><li>IAM-PrivEsc (Pacu) — PassRole, AssumeRole, iam:*-Wildcards.</li><li>CloudShell-Token-Abuse, SSO-Misuse.</li></ul>
<h4>Azure</h4>
<p>Managed-Identity-Token aus IMDS, OAuth-Token-Theft (Adv. AAD-Phishing via TokenSmith/AADInternals), Conditional-Access-Bypass, Storage-Account-SAS-Leak, App-Reg-Misconfig.</p>
<h4>GCP</h4>
<p>Default-Service-Accounts, Workload-Identity-Misconfig, gcloud-credentials-Theft, OAuth-Scopes.</p>
<h4>Container Escape</h4>
<p>Privileged Container, hostPath-Mount, capabilities (CAP_SYS_ADMIN), Docker-Socket-Mount, Kernel-Exploits (Dirty COW, Dirty Pipe). runC-CVE-2019-5736, CVE-2024-21626.</p>
<h4>K8s-Angriffe</h4>
<p>Etcd-Direct-Access, Kubelet-AnonAuth, RBAC-Misconfig (cluster-admin, get-pods-all-namespaces), Service-Account-Token-Abuse, Workload-Identity-Cross-Pod-Reading.</p>`
                }, {
                    title: 'Social Engineering & Physical',
                    html: `<h4>Phishing-Frameworks</h4>
<p>GoPhish, King Phisher, Evilginx2 (Reverse-Proxy mit MFA-Bypass via Session-Cookie-Theft), Modlishka. Pretexts: Quartals-Update, IT-Support, HR-Dokument.</p>
<h4>OAuth-Phishing</h4>
<p>Consent-Phishing: Angreifer registriert App, sendet Consent-Link. Nach Zustimmung: Mailbox-Lesen, Files-Lesen ohne Passwort. Mitigation: Verified-Publisher, Admin-Consent, App-Risk-Score.</p>
<h4>MFA-Bypass-Techniken</h4>
<ul><li>Reverse-Proxy-Phishing (Evilginx2)</li><li>MFA-Fatigue (Push-Bombing)</li><li>SIM-Swapping</li><li>SS7-Angriffe gegen SMS-OTP</li><li>Stolen Session Cookies (Pass-the-Cookie)</li></ul>
<h4>Physical</h4>
<p>Tailgating, Lock-Picking, RFID-Cloning (Proxmark3), USB-Drops (Rubber Ducky, Bash Bunny), DropBox in Meetingräumen, Wi-Fi-Pineapple in Empfangsbereich.</p>
<h4>Mitigations</h4>
<p>Mantraps, Visitor-Logs, Awareness-Training, FIDO2-Hardware-Keys (phishing-resistent), Number-Match-Push, Conditional Access mit Compliance-Check.</p>`
                }],
                quiz: [
                    q('Welche SQLi-Mitigation ist die effektivste im Code?', ['Parameterisierte Statements', 'Mehr WAF-Regeln allein', 'Längere Strings', 'TLS 1.3'], 0, 'Trennung Code/Daten in der DB-Schicht.'),
                    q('Welcher Angriff zielt auf AWS-Instance-Metadata?', ['SSRF gegen 169.254.169.254 mit IMDSv1', 'DNS-Spoofing', 'TLS-Replay', 'Logjam'], 0, 'IMDSv2 (token-basiert) blockiert klassische SSRF.'),
                    q('Welche Eigenschaft hat Kerberoasting?', ['Auslesen von Service-Ticket-Hashes für SPN-Accounts mit schwachen Passwörtern', 'TLS-Replay', 'XSS-Exfil', 'CSRF auf API'], 0, 'Mimikatz/Rubeus + hashcat. Mitigation: lange/random Service-Account-Passwords (gMSA).'),
                    q('Welche Schwachstelle wurde von WPA2-KRACK ausgenutzt?', ['Re-Installation des Pairwise Transient Keys während des 4-Way-Handshake', 'WPS-Bug', 'WPA2-Salting', 'EAPOL-Logging'], 0, 'CVE-2017-13077. Patch beim Client (Wpa_supplicant, hostapd).'),
                    q('Welche XSS-Variante speichert Payload persistent?', ['Stored / Persistent', 'Reflected', 'DOM-based', 'Self'], 0, 'Stored = im Backend gespeichert, jedem Besucher ausgeliefert. Schwerwiegendste Variante.'),
                    q('Welcher Angriff missbraucht NTLM-Authentifizierung gegen einen anderen Dienst?', ['SMB Relay / NTLM Relay', 'Pass-the-Ticket', 'CSRF', 'Open Redirect'], 0, 'Mitigation: SMB Signing, EPA, LDAP Channel Binding.'),
                    q('Welche Tool-Klasse cracket WPA2-Handshakes?', ['hashcat / aircrack-ng', 'Wireshark', 'Nmap', 'PuTTY'], 0, 'Wordlist + Rules; GPU-beschleunigt mit hashcat.'),
                    q('Was ist Pass-the-Hash?', ['Authentifizierung mit dem NTLM-Hash ohne Klartext-Passwort', 'TLS-Handshake', 'OAuth-Refresh', 'Hashing-Algorithmus'], 0, 'NTLM-Hash dient als Credential-Equivalent. Mitigation: Credential Guard, LAPS, Tier-Modell.'),
                    q('Was ist CSRF?', ['Cross-Site Request Forgery — Browser sendet ungewollte Authenticated-Request', 'Common Service Restart Function', 'Cross-Site Resource File', 'Cross-Server Routing Frame'], 0, 'Mitigation: SameSite=strict, Anti-CSRF-Tokens, Origin/Referer-Check.'),
                    q('Welcher Angriff erzwingt Klartext-Authentifizierung über NTLM-Downgrade?', ['Responder / LLMNR/NBT-NS-Poisoning', 'TLS Client-Hello-Replay', 'Cookie-Injection', 'Mass-Assignment'], 0, 'Disable LLMNR + NBT-NS, mDNS einschränken.'),
                    q('Welche OWASP-Top-10-Position ist „Broken Access Control"?', ['A01:2021', 'A05', 'A10', 'A03'], 0, 'In OWASP Top 10 2021 ist Broken Access Control auf Platz 1.'),
                    q('Welche Eigenschaft hat ein Living-off-the-Land-Angriff?', ['Nutzt vorhandene OS-Tools (PowerShell, WMIC, certutil) statt eigener Malware', 'Rein hardware-basiert', 'Nur Kernel-Module', 'Nur Browser'], 0, 'LOLBAS-Project listet missbräuchlich nutzbare Windows-Binaries.'),
                    q('Welche CVE adressiert ZeroLogon?', ['CVE-2020-1472', 'CVE-2017-0144', 'CVE-2021-44228', 'CVE-2014-0160'], 0, 'Netlogon Elevation — leerer ClientCredential umgeht Authentifizierung.'),
                    q('Welche CVE adressiert PrintNightmare?', ['CVE-2021-34527', 'CVE-2020-1472', 'CVE-2017-0144', 'CVE-2014-0160'], 0, 'Windows Print Spooler RCE.'),
                    q('Welche CVE adressiert PetitPotam?', ['CVE-2021-36942', 'CVE-2020-1472', 'CVE-2017-0144', 'CVE-2014-0160'], 0, 'EFSRPC-Coercion zu NTLM-Relay gegen ADCS.'),
                    q('Welche CVE adressiert ProxyShell?', ['CVE-2021-34473 + 34523 + 31207', 'CVE-2020-1472', 'CVE-2017-0144', 'CVE-2014-0160'], 0, 'Exchange-Server-RCE-Chain (2021).'),
                    q('Welche CVE adressiert ProxyLogon?', ['CVE-2021-26855 + 26857 + 26858 + 27065', 'CVE-2020-1472', 'CVE-2017-0144', 'CVE-2014-0160'], 0, 'HAFNIUM-Exchange-Angriffe (März 2021).'),
                    q('Welche CVE adressiert Log4Shell?', ['CVE-2021-44228', 'CVE-2020-1472', 'CVE-2017-0144', 'CVE-2014-0160'], 0, 'Log4j-2 JNDI-Lookup-RCE (Dezember 2021).'),
                    q('Welche CVE adressiert Spring4Shell?', ['CVE-2022-22965', 'CVE-2021-44228', 'CVE-2020-1472', 'CVE-2014-0160'], 0, 'Spring-Framework Class-Loader-Manipulation.'),
                    q('Welche CVE adressiert Follina?', ['CVE-2022-30190', 'CVE-2021-44228', 'CVE-2020-1472', 'CVE-2014-0160'], 0, 'MSDT-RCE über Office-Documents.'),
                    q('Welche CVE adressiert MOVEit-Transfer?', ['CVE-2023-34362', 'CVE-2021-44228', 'CVE-2020-1472', 'CVE-2014-0160'], 0, 'SQL-Injection in MOVEit Transfer (Cl0p-Ransomware-Welle 2023).'),
                    q('Welche CVE adressiert Citrix Bleed?', ['CVE-2023-4966', 'CVE-2021-44228', 'CVE-2020-1472', 'CVE-2014-0160'], 0, 'NetScaler ADC/Gateway Session-Token-Leak.'),
                    q('Welche Eigenschaft hat eine Mass Assignment Vulnerability?', ['Framework bindet ungetrustete User-Inputs an Modell-Felder, die nicht freigegeben sind', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'OWASP API Top 10 2023 — BOPLA. Mitigation: Allowlist-Felder.'),
                    q('Welche Eigenschaft hat eine BOLA?', ['Broken Object Level Authorization — IDOR in APIs', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'OWASP API Top 10 2023 #1.'),
                    q('Welche Eigenschaft hat eine BFLA?', ['Broken Function Level Authorization — Admin-Endpoint ohne Rolle-Check', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'OWASP API Top 10 2023 #5.'),
                    q('Welche Eigenschaft hat eine HTTP Request Smuggling?', ['Inkonsistente Behandlung von Content-Length/Transfer-Encoding zwischen Frontend/Backend', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'CL.TE / TE.CL / TE.TE Varianten — erlauben Cache-Poisoning, Auth-Bypass.'),
                    q('Welche Eigenschaft hat eine HTTP Response Splitting?', ['Injection von CRLF in HTTP-Header führt zu zwei Responses', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Mitigation: Newline-Filter in Header-Setzern.'),
                    q('Welche Eigenschaft hat eine Server-Side Template Injection (SSTI)?', ['User-Input wird in Template-Engine evaluiert (Jinja2, Twig, Velocity, Freemarker)', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Tools: tplmap. Mitigation: Sandboxing, kontextsensitive Escapes.'),
                    q('Welche Eigenschaft hat eine XML External Entity (XXE)?', ['XML-Parser ladet externe Entities (file://, http://) — SSRF/File-Read möglich', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'CWE-611. Mitigation: External-Entity-Resolution disable.'),
                    q('Welche Eigenschaft hat eine Insecure Deserialization?', ['Untrusted-Daten werden zu Objekten deserialisiert — Gadgets führen zu RCE (ysoserial)', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'CWE-502. ysoserial generiert Java-/Net-Gadgets.'),
                    q('Welche Eigenschaft hat ein Race Condition Exploit?', ['Konkurrente Anfragen umgehen Validierungs-/Authorization-Checks (TOCTOU)', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Tools: Burp Repeater + Turbo-Intruder; „Single-Packet-Attack“ (HTTP/2).'),
                    q('Welche Eigenschaft hat ein Pass-the-Hash?', ['Authentifizierung mit dem NTLM-Hash ohne Klartext-Passwort', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Mitigation: Credential Guard, LAPS, Tier-Modell.'),
                    q('Welche Eigenschaft hat ein Pass-the-Ticket?', ['Re-use eines Kerberos-TGT/Service-Tickets durch Angreifer', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Rubeus dump + ptt; Mitigation: Tier-Modell + DC-Logon-Restrictions.'),
                    q('Welche Eigenschaft hat ein Pass-the-Cookie?', ['Session-Cookie-Theft erlaubt MFA-Bypass', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Cookie-Theft via Infostealer (Lumma, RedLine, Vidar) ist 2023+ Standard-Initial-Access.'),
                    q('Welche Eigenschaft hat ein OAuth Device-Code-Phishing?', ['Angreifer triggert Device-Authorization-Flow, sendet User-Code an Opfer, das auf eigenem Microsoft-Login eintippt', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Mitigation: Conditional Access blockiert Device-Code-Flow für nicht-erlaubte Apps.'),
                    q('Welche Eigenschaft hat ein Sliver/Mythic-C2?', ['Open-Source-C2-Frameworks für Red-Team-Operations', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Sliver = BishopFox, Mythic = SpecterOps. Cobalt-Strike-Alternativen.'),
                    q('Welche Eigenschaft hat ein Cobalt Strike?', ['Kommerzielles Adversary-Simulation-Framework, häufig auch missbraucht', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Beacon mit Sleep + Jitter; Malleable-C2-Profile.'),
                    q('Welche Eigenschaft hat ein Empire/Starkiller?', ['PowerShell/.NET-basiertes Post-Exploitation-Framework', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Empire ist Open-Source; Starkiller ist Web-UI.'),
                    q('Welche Eigenschaft hat ein BloodHound?', ['Graph-basierte AD-Recon — zeigt Pfade zu Domain Admin', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'SharpHound sammelt; BloodHound visualisiert; ne4j als DB.'),
                    q('Welche Eigenschaft hat ein Mimikatz?', ['Credential-Dumping aus LSASS, Kerberos-Ticket-Manipulation, DPAPI-Decryption', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Benjamin Delpy. Standard für Credential-Access.'),
                    q('Welche Eigenschaft hat ein Rubeus?', ['.NET-Tool für Kerberos-Ticket-Operations (Roasting, S4U, Pass-the-Ticket)', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Rubeus + Mimikatz für AD-Operations; SpecterOps.'),
                    q('Welche Eigenschaft hat ein Impacket?', ['Python-Library + Tools (psexec.py, smbclient.py, secretsdump.py, ntlmrelayx.py) für SMB/AD-Operationen', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'SecureAuth Impacket. Standard für Lateral Movement.'),
                    q('Welche Eigenschaft hat ein CrackMapExec / NetExec?', ['Swiss-Army-Knife für Pentests in AD-Umgebungen (SMB, WinRM, MSSQL, LDAP, RDP)', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'NetExec ist der maintained Fork seit 2023.'),
                    q('Welche Eigenschaft hat ein Responder?', ['LLMNR/NBT-NS/MDNS-Poisoning + NTLM-Hash-Capture', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Trustedsec Responder. Mitigation: LLMNR/NBT-NS disable.'),
                    q('Welche Eigenschaft hat ein NTLM-Relay?', ['Weiterleitung capturter NTLM-Authentifizierung an anderen Service ohne Crack', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'ntlmrelayx.py von Impacket. Mitigation: SMB-Signing, EPA, LDAP Channel Binding.'),
                    q('Welche Eigenschaft hat ein Metasploit?', ['Modulares Exploitation-Framework (msfconsole) mit Auxiliary, Exploit, Post', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Rapid7 Metasploit ist de-facto-Standard für Exploit-Test.'),
                    q('Welche Eigenschaft hat ein Meterpreter?', ['In-Memory-Payload mit Channels, Pivoting, Process-Migration', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Meterpreter ist Standard-Metasploit-Payload für Post-Exploitation.'),
                    q('Welche Eigenschaft hat ein sqlmap?', ['Automatisierte SQL-Injection-Detection und Exploitation', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'Sucht Boolean/Time/Error/UNION-basierte SQLi.'),
                    q('Welche Eigenschaft hat ein Burp Suite?', ['Web-Proxy + Scanner + Repeater + Intruder für Web-App-Pentest', 'Reine TLS-Cipher', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, 'PortSwigger; Pro-Version mit aktivem Scanner und Collaborator.')
                ]
            },
            {
                id: 'reporting_pen',
                title: 'Kapitel 4 — Reporting & Communication',
                summary: 'Risiko-orientiertes Reporting, Re-Test, Knowledge Transfer.',
                pages: [{
                    title: 'Berichts-Lifecycle',
                    html: `<h4>Struktur</h4>
<ol><li>Executive Summary (1–2 Seiten, Geschäftsrisiko)</li>
<li>Methodology (Scope, RoE, Methodologien)</li>
<li>Findings (Severity-sortiert, mit PoC und Mitigation)</li>
<li>Strategic Recommendations</li>
<li>Anhang (Tools, Logs, Hashes)</li></ol>
<h4>Severity-Mapping</h4>
<p>CVSS allein reicht nicht — Geschäftsauswirkung gewichten.</p>
<h4>Re-Test</h4>
<p>Nach Remediation: erneuter gezielter Test, dokumentierter Status (Fixed / Risk Accepted / Open).</p>`
                }, {
                    title: 'Finding-Schreibweise',
                    html: `<h4>Finding-Template</h4>
<ul><li><strong>Title</strong> — prägnant, action-oriented.</li><li><strong>Severity</strong> — CVSS-Score + Business-Risk.</li><li><strong>Description</strong> — Was, Wo, Wie.</li><li><strong>Impact</strong> — konkrete Konsequenzen (Daten-Exfil, Privilege-Escalation, Service-Disruption).</li><li><strong>Reproduction Steps</strong> — nummerierte Schritte mit konkreten URLs/Befehlen.</li><li><strong>Evidence</strong> — Screenshots, HTTP-Requests, Log-Excerpts (redacted).</li><li><strong>Remediation</strong> — konkrete Code-/Konfigurations-Empfehlung mit Standards-Referenz (CWE, OWASP).</li><li><strong>References</strong> — CVE, vendor-Advisory, NIST/MITRE-IDs.</li></ul>
<h4>Sprache</h4>
<p>Aktiv, klar, ohne Fachjargon (oder mit Glossar). Keine sensationellen Adjektive („katastrophal“, „verheerend“). Faktenbasiert mit klarer Trennung Beobachtung vs. Interpretation.</p>
<h4>Severity-Differenzierung</h4>
<table><tr><th>CVSS</th><th>Aber: Kontext</th></tr><tr><td>9.8 RCE</td><td>nur intern erreichbar → effektiv High statt Critical</td></tr><tr><td>4.0 Info-Disclosure</td><td>betrifft kritische API-Keys → effektiv High</td></tr></table>`
                }, {
                    title: 'Mitigation Patterns',
                    html: `<h4>Standard-Mitigations</h4>
<ul><li><strong>SQLi</strong> — Parameterisierte Queries, ORM, Input-Allowlist, WAF als Defense-in-Depth.</li><li><strong>XSS</strong> — Output-Encoding kontextsensitiv, CSP, HttpOnly + Secure Cookies, SameSite=strict.</li><li><strong>CSRF</strong> — Anti-CSRF-Tokens, SameSite, Origin/Referer-Check.</li><li><strong>SSRF</strong> — Egress-Filter, IMDSv2, Allowlist von Ziel-IPs, Disable internal-Networks.</li><li><strong>IDOR / BOLA</strong> — Server-side Authorization-Check pro Object-Access, niemals client-side.</li><li><strong>Auth Failures</strong> — Rate-Limit, MFA, Account-Lockout, secure Password-Reset, Phishing-Resistente Faktoren.</li></ul>
<h4>Defense in Depth</h4>
<p>Eine Mitigation reicht nicht. Beispiel SSRF: IMDSv2 + Egress-Filter + Web-Application-Firewall + WAF-DLP-Rule auf 169.254.169.254.</p>
<h4>Kompensierende Kontrollen</h4>
<p>Wenn Patch nicht umsetzbar (Legacy-System, Vendor-Lock-in): Mikrosegmentierung, IPS-Signature, Application-Allowlisting, Read-Only-Mode, Erhöhung des Monitorings.</p>`
                }, {
                    title: 'Knowledge-Transfer & Re-Test',
                    html: `<h4>Read-out-Meeting</h4>
<ul><li>1–2 Stunden, Stakeholder gemischt (Tech + Mgmt).</li><li>Top-Findings live gezeigt (Demo statt Screenshot).</li><li>Kontext zu Threat-Landscape und Trend.</li><li>Q&A.</li></ul>
<h4>Workshops</h4>
<p>Bei größeren Engagements separate Tech-Workshops mit Dev/Ops, in denen Code-Snippets gemeinsam geprüft werden. Erhöht Remediation-Quality drastisch.</p>
<h4>Re-Test-Pflicht</h4>
<p>Re-Test nach Remediation. Findings als <strong>Fixed</strong> (verifiziert), <strong>Partial Fix</strong> (Mitigation aber nicht voll), <strong>Risk Accepted</strong> (mit formalem Sign-off), <strong>Open</strong> (nicht behoben).</p>
<h4>Lessons Learned fürs Programm</h4>
<p>Wiederkehrende Patterns (z. B. fehlende Output-Encoding) als systemisches Problem behandeln — Awareness, Threat-Modeling-Reife, Secure-Coding-Trainings.</p>
<h4>Documentation Hygiene</h4>
<p>Reports verschlüsselt übermitteln (PGP, S/MIME, dedizierte sichere Plattform). Versionierung mit Datum + Hash. Aufbewahrung gemäß NDA-Frist; Sicherer Lebensende mit Crypto-Erase.</p>`
                }],
                quiz: [
                    q('Welche Sektion gehört zu Beginn eines C-Level-Reports?', ['Executive Summary', 'Hex-Dumps', 'CLI-Befehle', 'Tool-Logs'], 0, 'C-Level-Audience erwartet 1–2-seitige Zusammenfassung.'),
                    q('Welche Severity-Bewertung ist nur quantitativ?', ['CVSS-Score', 'Geschäftsauswirkung', 'Reputationsschaden', 'Compliance-Strafe'], 0, 'CVSS ist standardisiert quantitativ (Score 0–10).'),
                    q('Welcher Status nach erfolgter Mitigation?', ['Fixed (verifiziert) / Risk Accepted / Open', 'Forgotten', 'Renamed', 'Backed up'], 0, 'Klare Status-Kategorien für Tracking.'),
                    q('Welcher Bestandteil ist im Anhang sinnvoll?', ['Detaillierte PoC-Schritte und Hashes', 'Marketing-Slides', 'Leerseiten', 'Tabellenkalender'], 0, 'Anhang enthält Reproduzierbarkeits-Details.'),
                    q('Welche Kommunikationsform ist angemessen für aktive kritische Findings?', ['Sofortmeldung an Eskalations-Kontakt aus RoE', 'Erst im Abschlussbericht erwähnen', 'Im LinkedIn-Post', 'Via Newsletter'], 0, 'Critical-Findings-Eskalation ist im RoE festgelegt.'),
                    q('Welche Eigenschaft hat ein gutes Finding?', ['Reproduzierbar, mit Risiko-Bewertung und konkreter Mitigation', 'Vage Beschreibung ohne PoC', 'Nur Screenshots', 'Nur Tool-Output'], 0, 'Finding muss vom Kunden umgesetzt werden können.'),
                    q('Welche Best Practice gilt für Klartext-Credentials in Reports?', ['Redacted oder verschlüsselt übertragen', 'Im Klartext einbetten', 'Per öffentlicher Mail', 'In sozialen Medien'], 0, 'Mindestens partielle Maskierung; ggf. PGP-verschlüsselte Übermittlung.'),
                    q('Welche Metrik visualisiert Findings nach Schwere?', ['Severity-Heatmap / Pareto-Chart', 'Kreisdiagramm der Fonts', 'Histogram der Schriftgrößen', 'Word-Cloud'], 0, 'Heatmap (Likelihood × Impact) und Pareto sind etabliert.'),
                    q('Welcher Dokumenten-Typ liefert dem Entwickler konkrete Code-Mitigation?', ['Technical Findings mit Code-Snippets und Standards-Referenz (CWE/OWASP)', 'Executive Summary', 'Marketing Brief', 'Vendor-Slides'], 0, 'Technische Empfänger brauchen Code-Level-Detail.'),
                    q('Was ist eine Re-Test-Phase?', ['Erneuter gezielter Test nach Remediation', 'Wiederholtes Marketing', 'Backup-Test', 'Hardware-Refresh'], 0, 'Verifiziert, dass Patches die Findings tatsächlich schließen.'),
                    q('Welche Praxis verbessert das Knowledge-Transfer mit dem Kunden?', ['Workshops und Live-Walkthrough der Findings', 'Nur PDF-Versand', 'Email allein', 'Roh-Dump aller Logs'], 0, 'Verständnis erhöht Remediation-Quality.'),
                    q('Welche Information ist bei der Übermittlung sensibler Daten obligatorisch?', ['Verschlüsselte Übertragung (PGP, S/MIME, sicherer Filetransfer)', 'Klartext in Body', 'Cloud-Public-Link', 'FTP'], 0, 'Verschlüsselung Pflicht — auch bei „internen" Reports.'),
                    q('Welche Eigenschaft hat ein Executive Summary?', ['1–2-seitige Zusammenfassung mit Risiko, Auswirkung, Top-Empfehlungen für C-Level', 'Detail-Logs', 'Reine Hashlist', 'Reine Tool-Output'], 0, 'C-Level entscheidet über Budget; Sprache muss geschäftsorientiert sein.'),
                    q('Welche Eigenschaft hat ein Risk-Heatmap?', ['Visualisierung Wahrscheinlichkeit × Auswirkung', 'Reine Hardware-Liste', 'Reine Cloud-Region', 'Reine WLAN-Region'], 0, '5×5 oder 4×4 Heatmap, Standard im GRC.'),
                    q('Welche Eigenschaft hat ein CVSS Base Score?', ['Quantitativer 0–10-Score basierend auf intrinsischen Eigenschaften', 'Reine Cloud-Metrik', 'Reine WLAN-Metrik', 'Reine BIOS-Metrik'], 0, 'CVSS v3.1 / v4.0 Base Metrics.'),
                    q('Welche Eigenschaft hat ein CVSS Environmental Score?', ['Anpassung an spezifische Umgebung (Asset-Kritikalität, Compensating Controls)', 'Reine Hardware-Metrik', 'Reine Cloud-Metrik', 'Reine WLAN-Metrik'], 0, 'Erlaubt site-spezifische Bewertung.'),
                    q('Welche Eigenschaft hat ein CVSS Temporal Score (v3.1)?', ['Berücksichtigt Exploit-Verfügbarkeit, Remediation-Level, Report-Confidence', 'Reine Hardware-Metrik', 'Reine Cloud-Metrik', 'Reine WLAN-Metrik'], 0, 'In v4.0 als Threat Score umbenannt.'),
                    q('Welche Eigenschaft hat ein DREAD-Modell?', ['Risiko-Bewertung mit Damage, Reproducibility, Exploitability, Affected Users, Discoverability', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'DREAD ist subjektiver als CVSS, wird oft ergänzend genutzt.'),
                    q('Welche Eigenschaft hat ein OWASP Risk Rating?', ['Likelihood + Impact in 0–9-Skalen, mehrere Faktoren', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'OWASP Risk Rating Methodology, hilfreich für Web-Apps.'),
                    q('Welche Eigenschaft hat ein PoC?', ['Proof of Concept — minimaler Beweis, dass die Schwachstelle ausnutzbar ist', 'Reine Cloud-Region', 'Reine WLAN-Region', 'Reines BIOS-Update'], 0, 'PoC sollte sichere/non-destructive Ausnutzung zeigen.'),
                    q('Welche Eigenschaft hat ein PoV?', ['Proof of Vulnerability — Beweis, dass die Schwachstelle existiert (ohne aktive Ausnutzung)', 'Reine Cloud-Region', 'Reine WLAN-Region', 'Reines BIOS-Update'], 0, 'Bei sensitiven Systemen PoV statt PoC.'),
                    q('Welche Eigenschaft hat ein Status Fixed?', ['Remediation umgesetzt und im Re-Test verifiziert', 'Reine Annahme', 'Reine Backup-Strategie', 'Reine Cloud-Operation'], 0, 'Verifikation ist Pflicht; Vendor-Selbstauskunft reicht nicht.'),
                    q('Welche Eigenschaft hat ein Status Risk Accepted?', ['Risiko-Owner hat formal ohne Remediation akzeptiert (mit Begründung + Frist)', 'Reine Annahme', 'Reine Backup-Strategie', 'Reine Cloud-Operation'], 0, 'Im Risk-Register dokumentiert; Periodic-Review.'),
                    q('Welche Eigenschaft hat ein Status Open?', ['Finding nicht behoben und nicht akzeptiert — weiter im Tracking', 'Reine Annahme', 'Reine Backup-Strategie', 'Reine Cloud-Operation'], 0, 'Open-Findings müssen bei Folge-Engagements explizit berücksichtigt werden.'),
                    q('Welche Eigenschaft hat ein Compensating Control?', ['Original-Mitigation nicht umsetzbar; Ersatzmaßnahme reduziert Risiko', 'Reine Annahme', 'Reine Backup-Strategie', 'Reine Cloud-Operation'], 0, 'Beispiel: Mikrosegmentierung statt Patch für Legacy.'),
                    q('Welche Eigenschaft hat ein Re-Test?', ['Erneuter gezielter Test der Findings nach Remediation', 'Reine Compliance-Prüfung', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung'], 0, 'Verifikation, dass Patches die Findings tatsächlich schließen.'),
                    q('Welche Eigenschaft hat ein Wash-up Meeting?', ['Operatives Abschluss-Meeting nach Engagement-Ende, gemeinsame Lessons Learned', 'Reine Hardware-Reinigung', 'Reine Cloud-Operation', 'Reine WLAN-Operation'], 0, 'Wash-up für Engagement-Team intern; Read-out für Kunden.'),
                    q('Welche Eigenschaft hat ein Quality-Review im Bericht-Lifecycle?', ['Zweit-Prüfung des Berichts vor Abgabe (Peer-Review, Senior-Review)', 'Reine Hardware-Reinigung', 'Reine Cloud-Operation', 'Reine WLAN-Operation'], 0, 'Standard im professionellen Pen-Testing.'),
                    q('Welche Eigenschaft hat ein Engagement-Watermark im Bericht?', ['Klar erkennbares Branding/Wasserzeichen pro Bericht (Kunde + Datum)', 'Reine Hardware-Reinigung', 'Reine Cloud-Operation', 'Reine WLAN-Operation'], 0, 'Verhindert Re-Use ohne Erlaubnis und führt bei Leak zu Rückverfolgbarkeit.'),
                    q('Welche Eigenschaft hat ein Bericht-Versand via PGP?', ['Asymmetrische Verschlüsselung mit Empfänger-Public-Key (RFC 4880)', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'PGP/GPG ist Standard für E-Mail-Verschlüsselung.'),
                    q('Welche Eigenschaft hat ein Bericht-Versand via S/MIME?', ['X.509-Cert-basierte E-Mail-Verschlüsselung + Signatur', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'S/MIME häufiger in Enterprise-Umgebungen mit AD/Entra-ID-Issuance.'),
                    q('Welche Eigenschaft hat ein Bericht-Hash für Integrität?', ['SHA-256-Hash als Anhang/Signatur, um Manipulation zu erkennen', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Bericht + Hash + Versanddatum dokumentieren.'),
                    q('Welche Eigenschaft hat ein Findings-Tracker?', ['Persistente Liste aller Findings mit Status, Owner, Frist, History', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Jira, ServiceNow, dedizierte VM-Plattformen unterstützen Tracking.'),
                    q('Welche Eigenschaft hat ein Pentest-as-a-Service?', ['Kontinuierliche Pen-Testing-Plattformen mit Dashboard, Findings-Tracking, Re-Tests on demand', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Cobalt.io, Synack, HackerOne PTaaS, Bugcrowd.'),
                    q('Welche Eigenschaft hat ein Continuous Pentesting?', ['Laufende Tests über längere Phase, oft mit gestaffelten Scopes', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Ergänzt punktuelle jährliche Pentests.'),
                    q('Welche Eigenschaft hat ein Bug-Bounty-Programm?', ['Crowdsourced kontinuierliche Vuln-Discovery mit Belohnung', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'Ergänzt Pentests; nicht Ersatz.'),
                    q('Welche Eigenschaft hat ein Vulnerability Disclosure Program (VDP)?', ['Strukturierter Prozess für Externe, Schwachstellen sicher zu melden', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'ISO/IEC 29147; safe-harbor-Klausel.'),
                    q('Welche Eigenschaft hat ein Security.txt?', ['RFC 9116 — standardisierter Pfad /.well-known/security.txt mit Kontaktinfos', 'Reine Hardware-Prüfung', 'Reine Cloud-Prüfung', 'Reine WLAN-Prüfung'], 0, 'security.txt enthält Contact, Expires, Encryption, Acknowledgments, Policy.'),
                    q('Welche Eigenschaft hat ein Bug-Bounty-Triage?', ['Erstprüfung gemeldeter Findings (Reproduktion, Severity, Duplicate-Check) vor Vendor-Hand-off', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'HackerOne/Bugcrowd bieten managed-triage als Service.'),
                    q('Welche Eigenschaft hat eine Vulnerability-Coordination-Frist?', ['Definierter Zeitraum bis Public Disclosure (oft 90+30 Tage)', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Project Zero (Google), CERT/CC, ZDI nutzen variierende Fristen.'),
                    q('Welche Eigenschaft hat ein Embargo?', ['Vereinbarung, eine Schwachstelle bis Patch-Release nicht öffentlich zu machen', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Embargo bricht bei aktiver Ausnutzung in-the-wild.'),
                    q('Welche Eigenschaft hat eine CSIRT-Coordination?', ['Vermittlung zwischen Reporter und Vendor, oft national (CERT/CC, BSI, JPCERT/CC)', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Nationale CSIRTs koordinieren komplexe Multi-Vendor-Disclosures.'),
                    q('Welche Eigenschaft hat eine Customer-Notification?', ['Information betroffener Kunden über Schwachstelle, Risiko, Mitigation, Patch-Verfügbarkeit', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Pflicht in vielen Jurisdiktionen bei Datenschutz-/Sicherheits-Vorfällen.'),
                    q('Welche Eigenschaft hat ein Public Disclosure?', ['Öffentliche Veröffentlichung der Schwachstelle nach Patch-Release oder Frist-Ablauf', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Standard via Vendor-Advisory + CVE-Eintrag.'),
                    q('Welche Eigenschaft hat ein Coordinated Vulnerability Disclosure (CVD)?', ['ISO/IEC 29147 — abgestimmter Prozess Reporter zu Vendor', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'CVD ersetzt das veraltete Responsible Disclosure.'),
                    q('Welche Eigenschaft hat ein Vulnerability Handling (ISO/IEC 30111)?', ['Vendor-internes Verfahren zur Aufnahme/Triage/Behebung von Schwachstellen', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'ISO/IEC 30111:2019.'),
                    q('Welche Eigenschaft hat ein PSIRT?', ['Product Security Incident Response Team — Vendor-Einheit für Produkt-Schwachstellen', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'PSIRT-Maturity-Framework von FIRST.org.'),
                    q('Welche Eigenschaft hat ein FIRST?', ['Forum of Incident Response and Security Teams — globale CSIRT/PSIRT-Community', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'FIRST.org pflegt CVSS, EPSS, TLP, Service-Frameworks.'),
                    q('Welche Eigenschaft hat ein Lessons-Learned-Loop?', ['Findings dieses Engagements informieren nächste Threat-Modeling-/Pentest-Runden', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Ohne Loop keine Maturity-Steigerung.'),
                    q('Welche Eigenschaft hat eine Engagement-Retention?', ['Aufbewahrungsfrist für Berichte/Beweise gemäß NDA + gesetzlichen Vorgaben', 'Reine TLS-Norm', 'Reine ISO-Norm', 'Reine Cloud-Norm'], 0, 'Nach Frist sicherer Crypto-Erase.')
                ]
            }
        ]
    });
})();
