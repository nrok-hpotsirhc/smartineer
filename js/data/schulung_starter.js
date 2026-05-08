/*
 * Smartineer Schulungen — Security+ (SY0-701), CySA+ (CS0-003), PenTest+ (PT0-002)
 *
 * Status: Starter-Pool. Pro Kapitel ca. 12–14 Fragen — die Architektur erlaubt
 * die schrittweise Erweiterung auf das in AGENTS.md §18 geforderte Soll von
 * mindestens 50 Fragen pro Kapitel. Curriculum-Seiten sind eigenständig und
 * inhaltlich abgeschlossen.
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
                    q('Was misst Authentizität?', ['Dass Daten unverändert sind', 'Dass eine Identität echt ist', 'Dass Daten geheim sind', 'Dass Daten verfügbar sind'], 1, 'Authentizität = Echtheit der behaupteten Identität, nachgewiesen durch Faktoren (Wissen/Besitz/Sein).')
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
                    q('Was ist eine Logic Bomb?', ['Code, der bei einem Trigger (Zeit, Event) Schaden auslöst', 'DDoS-Tool', 'Hashfunktion', 'Krypto-Algorithmus'], 0, 'Beispiel: Mitarbeiter platziert verzögerten Lösch-Code, ausgelöst durch Account-Deaktivierung.')
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
                    q('Was ist ein WAF?', ['Wireless Access Federation', 'Web Application Firewall — Layer-7-Inspektion und HTTP-Regelwerk', 'Wide Area Firewall', 'Wired Authentication Framework'], 1, 'WAF schützt vor OWASP-Top-10-Angriffsmustern (SQLi, XSS).')
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
                    q('Welcher RPO-Wert beschreibt die maximale tolerierbare Datenmenge, die verloren gehen darf?', ['0 Stunden bedeutet Daten dürfen verloren gehen', 'RPO = Punkt in der Zeit, bis zu dem Daten wiederhergestellt werden', 'RPO ist immer gleich RTO', 'RPO ist nur für Hardware'], 1, 'RPO definiert „seit wann" Daten unwiederbringlich verloren wären.')
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
                    q('Welche Datenquelle ist optimal für Lateral Movement Detection im AD?', ['Windows-Security-Log (4624 Type 3, 4672, 4769)', 'Browser-Cache', 'Microsoft Word-Logs', 'BIOS-Settings'], 0, 'Logon Type 3 (Network) + Special Privileges (4672) + Kerberos Service Ticket (4769) bilden das Rückgrat.')
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
                    q('Welcher Compensating Control ist KEINE typische Wahl bei Patch-Verzögerung?', ['Mikrosegmentierung', 'IDS/IPS-Signaturen', 'Application-Allowlisting', 'Account-Sharing erweitern'], 3, 'Account-Sharing erhöht das Risiko, ist niemals eine Mitigation.')
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
                    q('Welcher Begriff beschreibt einen ausgewerteten Lessons-Learned-Workshop?', ['Hot Wash / Post-Incident Review', 'Tabletop', 'Red Team', 'Black Box'], 0, 'Direkt nach Incident — strukturiertes Review der IR-Aktivitäten.')
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
                    q('Welche Audit-Frequenz ist für SOC 2 Type II üblich?', ['6–12 Monate Beobachtungszeitraum', 'Stündlich', 'Alle 5 Jahre', 'Einmalig zur Gründung'], 0, 'Type-II-Beobachtungszeitraum typischerweise 6–12 Monate.')
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
                    q('Welche Maßnahme schützt den Tester rechtlich?', ['Schriftliche Genehmigung des Asset-Owners (Authorization-Letter / Get-Out-of-Jail-Card)', 'Interne Slack-Nachricht', 'Verbal nur', 'Tweet'], 0, 'Schriftliche Authorization muss permanent erreichbar sein.')
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
                    q('Welcher Wert ist eine sinnvolle Validierungspraxis bei Scanner-Findings?', ['Manuelle Reproduktion + ggf. PoC-Exploit', 'Blindes Vertrauen', 'Direkt eskalieren ohne Test', 'Ignorieren'], 0, 'False Positives sind teuer — Validierung Pflicht.')
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
                    q('Welche Eigenschaft hat ein Living-off-the-Land-Angriff?', ['Nutzt vorhandene OS-Tools (PowerShell, WMIC, certutil) statt eigener Malware', 'Rein hardware-basiert', 'Nur Kernel-Module', 'Nur Browser'], 0, 'LOLBAS-Project listet missbräuchlich nutzbare Windows-Binaries.')
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
                    q('Welche Information ist bei der Übermittlung sensibler Daten obligatorisch?', ['Verschlüsselte Übertragung (PGP, S/MIME, sicherer Filetransfer)', 'Klartext in Body', 'Cloud-Public-Link', 'FTP'], 0, 'Verschlüsselung Pflicht — auch bei „internen" Reports.')
                ]
            }
        ]
    });
})();
