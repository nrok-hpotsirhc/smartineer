/*
 * Smartineer Schulungen — SecurityX (CAS-005) / CASP+
 *
 * Quelle: CompTIA CAS-005 SecurityX Exam Objectives (Stand 2025/2026), NIST SP 800-207,
 *         NIST SP 800-160 v1r1, NIST SP 800-61 r2, MITRE ATT&CK v15+, ISO/IEC 27001:2022,
 *         offizielle Vorfallsanalysen (CISA, ENISA, GAO).
 * Aufbau: 4 Kapitel (= offizielle Domänen mit aktualisierter Gewichtung CAS-005),
 *         pro Kapitel: Curriculum-Seiten + Quiz-Pool.
 *
 * WICHTIG: Wissenschaftliche Korrektheit — alle Fakten gegen mind. eine Standardquelle
 *          verifiziert. Bei Konventions-Mehrdeutigkeit Quelle benannt.
 */
(function () {
    window.SCHULUNGEN = window.SCHULUNGEN || { list: [] };

    const CURRICULUM = {
        // ============================== KAPITEL 1: GRC ==============================
        ch1_pages: [
            {
                title: 'Modul 1.1 — Governance-Frameworks',
                html: `
<p>Governance, Risk and Compliance (GRC) bildet mit <strong>20 % Gewichtung</strong> in CAS-005 (vs. 15 % in CAS-004) den strategischen Rahmen. Ein SecurityX-Architekt übersetzt Geschäftsziele in messbare technische Kontrollen.</p>
<h4>Zentrale Frameworks</h4>
<ul>
<li><strong>ISO/IEC 27001:2022</strong> — ISMS (Information Security Management System). Plan-Do-Check-Act-Zyklus, Annex-A-Controls (93 in 2022, vs. 114 in 2013).</li>
<li><strong>NIST CSF 2.0 (2024)</strong> — sechs Funktionen: Govern, Identify, Protect, Detect, Respond, Recover. Govern wurde 2024 als eigene Funktion ergänzt.</li>
<li><strong>NIST RMF (SP 800-37 r2)</strong> — sieben Schritte: Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor.</li>
<li><strong>COBIT 2019</strong> — Governance- und Management-Objectives für Enterprise IT.</li>
<li><strong>ISO 31000:2018</strong> — prinzipienbasiertes Risikomanagement (kein Compliance-Checklisten-Ansatz).</li>
</ul>
<h4>SABSA × TOGAF</h4>
<p>SABSA (Sherwood Applied Business Security Architecture) liefert sechs Schichten (Contextual → Operational) mal sechs W-Fragen — bidirektionale Traceability von Geschäftsziel zu kryptografischer Kontrolle. TOGAF deckt Enterprise-Architektur (Business/Data/Application/Technology) über die ADM ab. Sicherheit wird in die ADM-Phasen B–F eingebettet.</p>`
            },
            {
                title: 'Modul 1.2 — Risikomanagement & Quantifizierung',
                html: `
<h4>Quantitative Risikoformeln</h4>
<ul>
<li><strong>SLE</strong> (Single Loss Expectancy) = AV × EF (Asset Value × Exposure Factor)</li>
<li><strong>ALE</strong> (Annualized Loss Expectancy) = SLE × ARO (Annualized Rate of Occurrence)</li>
<li><strong>ROSI</strong> (Return on Security Investment) = (ALE_vorher − ALE_nachher − Maßnahmenkosten) / Maßnahmenkosten</li>
</ul>
<h4>Risk-Treatment-Optionen (ISO 31000)</h4>
<ol>
<li><strong>Risk Avoidance</strong> — Aktivität einstellen.</li>
<li><strong>Risk Mitigation/Modification</strong> — Kontrollen einführen.</li>
<li><strong>Risk Transfer/Sharing</strong> — Cyber-Versicherung, Outsourcing.</li>
<li><strong>Risk Acceptance</strong> — formal dokumentiert (Risk Register, Sign-off durch Risk Owner).</li>
</ol>
<h4>FAIR (Factor Analysis of Information Risk)</h4>
<p>Open-Group-Standard zur monetären Quantifizierung. Loss Event Frequency × Loss Magnitude. Wird zunehmend für CISO-Boardberichte gefordert.</p>`
            },
            {
                title: 'Modul 1.3 — Compliance & Datenschutz',
                html: `
<h4>Regulatorische Frameworks (Stand 2025/2026)</h4>
<ul>
<li><strong>DSGVO/GDPR</strong> — bis 4 % Jahresumsatz oder 20 Mio. €. Art. 33: 72-h-Meldepflicht. Art. 32: Stand der Technik (Pseudonymisierung, Verschlüsselung).</li>
<li><strong>NIS2-Richtlinie (EU)</strong> — Umsetzungsfrist 17.10.2024. Erweitert Sektoren erheblich, Geldbußen bis 10 Mio. € oder 2 % Jahresumsatz.</li>
<li><strong>DORA</strong> (Digital Operational Resilience Act) — gilt seit 17.01.2025 für Finanzsektor in der EU.</li>
<li><strong>PCI-DSS v4.0.1</strong> (2024) — Karteninhaberdaten, MFA, Logging.</li>
<li><strong>HIPAA / HITECH</strong> — US-Gesundheitswesen.</li>
<li><strong>EU AI Act</strong> (2024 verabschiedet, schrittweise gültig 2025/2026/2027) — Risikoklassen, Transparenzpflichten.</li>
</ul>
<h4>Datenklassifizierung</h4>
<p>Public → Internal → Confidential → Restricted/Secret. Klassifizierung steuert Kontrollintensität (Verschlüsselung, DLP, Zugriff).</p>`
            },
            {
                title: 'Modul 1.4 — Third-Party Risk Management',
                html: `
<h4>Vendor Risk (TPRM)</h4>
<p>Lieferketten-Angriffe (SolarWinds 2020, Kaseya 2021, MOVEit 2023, Drift/Salesforce 2025) sind das dominante Enterprise-Risiko. Kontrollen:</p>
<ul>
<li><strong>SOC 2 Type II</strong> — operative Effektivität über 6–12 Monate (vs. Type I = Design-Snapshot).</li>
<li><strong>SOC 1 (SSAE 18)</strong> — Finanzberichts-relevante Kontrollen.</li>
<li><strong>Vertragliche Security-SLAs</strong> — Notification within X hours, Right-to-Audit, Subcontractor-Disclosure.</li>
<li><strong>SBOM</strong> (Software Bill of Materials) — SPDX/CycloneDX, EO 14028 (US, 2021) machte SBOMs verpflichtend.</li>
<li><strong>SLSA-Framework</strong> (Supply-chain Levels for Software Artifacts) — Build-Provenienz.</li>
</ul>
<h4>Fallbeispiel: Target (2013)</h4>
<p>HVAC-Lieferant Fazio Mechanical Services wurde via Spear-Phishing kompromittiert; Angreifer nutzten dessen legitimen Ariba-Zugang. Fehlende Mikrosegmentierung erlaubte lateralen Schwenk ins POS-Netzwerk → BlackPOS RAM-Scraping → 40 Mio. Karten + 70 Mio. Datensätze. 200+ Mio. USD Folgekosten. Lehre: Vendor-MFA, Mikrosegmentierung, SOC-Alarmtriagierung.</p>`
            }
        ],

        // ========================== KAPITEL 2: ARCHITECTURE ==========================
        ch2_pages: [
            {
                title: 'Modul 2.1 — Zero Trust Architecture (NIST SP 800-207)',
                html: `
<h4>Kernaussage</h4>
<p><em>Never trust, always verify.</em> Vertrauen ist nie implizit (auch nicht durch Netzwerkstandort). Jeder Zugriff wird kontinuierlich anhand <strong>Identität, Gerätestatus, Kontext</strong> evaluiert.</p>
<h4>Komponenten</h4>
<ul>
<li><strong>Policy Engine (PE)</strong> — entscheidet (allow/deny) basierend auf Trust-Algorithmen.</li>
<li><strong>Policy Administrator (PA)</strong> — etabliert/beendet Sessions auf Basis der PE-Entscheidung.</li>
<li><strong>Policy Enforcement Point (PEP)</strong> — setzt durch (am Daten-Path).</li>
<li>Together: PE + PA = <strong>Policy Decision Point (PDP)</strong>.</li>
</ul>
<h4>Vertrauensquellen (Inputs der PE)</h4>
<p>CDM (Continuous Diagnostics & Mitigation), Industry-Compliance, Threat-Intel-Feeds, Activity-Logs, Data-Access-Policies, Enterprise-PKI, ID-Management, SIEM.</p>
<h4>SASE / SSE</h4>
<p>SASE (Gartner 2019) = SD-WAN + Security-Stack (CASB, SWG, ZTNA, FWaaS) als Cloud-Service. SSE (2021) = SASE ohne Networking-Anteil. Praxis: ZTNA löst klassisches VPN ab.</p>`
            },
            {
                title: 'Modul 2.2 — Cloud-Sicherheitsmodelle',
                html: `
<h4>Shared Responsibility</h4>
<p>IaaS → Kunde verantwortet OS aufwärts. PaaS → Kunde verantwortet Daten und Konfiguration. SaaS → Kunde verantwortet Daten/Identität/Zugriff.</p>
<h4>CCM (Cloud Controls Matrix v4) der CSA</h4>
<p>197 Controls über 17 Domänen (Stand v4). Mapping zu ISO 27001, NIST 800-53, PCI-DSS, BSI C5.</p>
<h4>Cloud-Schutzschichten</h4>
<ul>
<li><strong>CASB</strong> (Cloud Access Security Broker) — Visibility, Compliance, DLP, Threat-Protection für SaaS.</li>
<li><strong>CSPM</strong> (Cloud Security Posture Management) — Misconfiguration-Erkennung in IaaS/PaaS (z. B. öffentliche S3-Buckets).</li>
<li><strong>CWPP</strong> (Cloud Workload Protection Platform) — Container/VM-Hardening, Runtime-Protection.</li>
<li><strong>CNAPP</strong> — konsolidiert CSPM + CWPP + CIEM + IaC-Scanning (Gartner-Konzept seit 2021).</li>
</ul>
<h4>Schlüssel-Hosting</h4>
<ul>
<li><strong>BYOK</strong> (Bring Your Own Key) — Kunde generiert, Cloud-KMS speichert.</li>
<li><strong>HYOK</strong> (Hold Your Own Key) — Schlüssel verbleibt on-prem; Cloud-Apps rufen externe Crypto-API.</li>
<li><strong>Confidential Computing</strong> — Daten in Use durch hardwarebasierte TEEs (Intel SGX, AMD SEV-SNP, Arm CCA).</li>
</ul>`
            },
            {
                title: 'Modul 2.3 — Formale Sicherheitsmodelle',
                html: `
<table>
<tr><th>Modell</th><th>Schutzziel</th><th>Axiome</th></tr>
<tr><td>Bell-LaPadula (1973)</td><td>Vertraulichkeit</td><td>No Read Up (Simple Security), No Write Down (* Property)</td></tr>
<tr><td>Biba (1977)</td><td>Integrität</td><td>No Read Down (Simple Integrity), No Write Up (* Integrity)</td></tr>
<tr><td>Clark-Wilson (1987)</td><td>Integrität / Transaktionen</td><td>CDIs werden nur über TPs durch authentifizierte Subjekte verändert; Separation of Duties</td></tr>
<tr><td>Brewer-Nash (Chinese Wall)</td><td>Konfliktvermeidung</td><td>Dynamische Zugriffsrechte basierend auf vorherigen Zugriffen</td></tr>
<tr><td>Lattice-Based Access Control</td><td>MAC</td><td>Subjekte/Objekte bekommen Labels (z. B. {Secret, Crypto}); Zugriff nur wenn Label-Lattice dominiert</td></tr>
</table>
<p>CASP+ verlangt das Wissen, <em>welches</em> Modell für ein gegebenes Geschäftsproblem (Militär: BLP; Finanzbuchhaltung: Biba/Clark-Wilson; Beratung: Brewer-Nash) gewählt wird.</p>`
            },
            {
                title: 'Modul 2.4 — ICS/SCADA & OT-Sicherheit',
                html: `
<h4>Purdue-Modell (ISA-99/IEC 62443)</h4>
<p>5 Ebenen: Level 0 (Sensoren/Aktoren) → Level 1 (PLCs/RTUs) → Level 2 (HMI/SCADA) → Level 3 (MES) → Level 4 (Enterprise IT). Zwischen L3 und L4 sitzt die <strong>industrielle DMZ</strong>.</p>
<h4>Stuxnet (2010) — Lehre</h4>
<p>Air-Gap allein reicht nicht. Stuxnet nutzte 4 Zero-Days (u. a. CVE-2010-2568 LNK, CVE-2010-2729 Print Spooler) und USB-Sticks. Manipulierte Siemens-PLCs (S7-315/S7-417), variierte Frequenzen (1410 → 2 → 1064 Hz) zur Zerstörung von Zentrifugen. Tarnung gegenüber WinCC-HMI durch Ersetzen der Sensor-Reads.</p>
<h4>Mitigation</h4>
<ul>
<li><strong>Application Whitelisting</strong> auf Engineering Workstations.</li>
<li><strong>Data Diodes</strong> (unidirektionale Gateways) zwischen OT und IT.</li>
<li><strong>Signierte PLC-Programme</strong> + Hardware Root-of-Trust.</li>
<li><strong>USB-Sanitizing-Kioske</strong> vor OT-Zone.</li>
<li><strong>Anomalie-Detection</strong> für ICS-Protokolle (Modbus, DNP3, S7, Profinet).</li>
</ul>`
            }
        ],

        // ========================== KAPITEL 3: ENGINEERING ==========================
        ch3_pages: [
            {
                title: 'Modul 3.1 — Kryptografie-Grundlagen für CASP+',
                html: `
<h4>Symmetrisch vs. asymmetrisch (aktuelle Stand-2026-Empfehlungen)</h4>
<ul>
<li><strong>AES-GCM-256</strong> — Massendatenverschlüsselung; AEAD (kombinierte Auth+Confidentiality).</li>
<li><strong>ChaCha20-Poly1305</strong> — schneller in Software ohne AES-NI; Standard in TLS 1.3.</li>
<li><strong>RSA-3072</strong> oder <strong>ECC P-256/P-384</strong> — Schlüsselaustausch / Signaturen. RSA-2048 wird ab 2030 nach NIST SP 800-131A r3 ausgemustert.</li>
<li><strong>Ed25519</strong> — moderne EdDSA-Signatur, kein Side-Channel über Nonce.</li>
</ul>
<h4>Hashes</h4>
<p>SHA-256 / SHA-3-256 sind Standard. <strong>SHA-1</strong> seit 2017 (SHAttered) gebrochen, NIST SP 800-131A: nicht mehr für Signaturen. Passwort-Hashing: <strong>Argon2id</strong> (Gewinner Password Hashing Competition 2015), Fallback bcrypt/scrypt — niemals nur SHA/MD5.</p>
<h4>Perfect Forward Secrecy (PFS)</h4>
<p>ECDHE bei TLS-Handshake → kompromittierter Server-Privatkey gefährdet keine archivierten Sessions. RSA-Key-Exchange in TLS 1.3 abgeschafft.</p>
<h4>Post-Quantum-Kryptografie (NIST PQC)</h4>
<p>FIPS 203 (ML-KEM, basiert auf Kyber, 2024 final), FIPS 204 (ML-DSA / Dilithium), FIPS 205 (SLH-DSA / SPHINCS+). Hybride Modi (z. B. X25519+ML-KEM) sind 2025/2026 in TLS-Drafts (RFC 9794+, Cloudflare/Google rollten X25519-Kyber768 bereits 2023 aus).</p>`
            },
            {
                title: 'Modul 3.2 — PKI & Schlüsselverwaltung',
                html: `
<h4>Hierarchie</h4>
<p>Root-CA <em>offline</em> → Intermediate-CA(s) → Issuing-CA(s) → End-Entity-Zertifikate.</p>
<h4>Validierungsmechanismen</h4>
<ul>
<li><strong>CRL</strong> (RFC 5280) — Revocation-Listen, periodisch.</li>
<li><strong>OCSP</strong> (RFC 6960) — Echtzeit-Abfrage; <strong>OCSP-Stapling</strong> (RFC 6961) reduziert Privacy-Issue.</li>
<li><strong>CT</strong> (Certificate Transparency, RFC 6962) — öffentliche Append-Only-Logs.</li>
</ul>
<h4>HSMs</h4>
<p>FIPS 140-3 Level 1–4. Level 3 ist Enterprise-Standard (Tamper-Evidence + Identity-based-Auth). Cloud-HSM (AWS CloudHSM, Azure Dedicated HSM) ermöglicht Single-Tenant-Krypto.</p>
<h4>mTLS & SPIFFE</h4>
<p>Mutual TLS für Service-zu-Service. SPIFFE/SPIRE liefert kurzlebige X.509-SVIDs für Workloads — Identity statt Network-Zone.</p>`
            },
            {
                title: 'Modul 3.3 — Secure SDLC / DevSecOps',
                html: `
<h4>Shift Left</h4>
<ul>
<li><strong>SAST</strong> (Static AST) — z. B. SonarQube, Semgrep, CodeQL. Findet Pattern-basiert Bugs im Source.</li>
<li><strong>DAST</strong> (Dynamic AST) — z. B. OWASP ZAP, Burp. Testet laufende Applikation.</li>
<li><strong>IAST</strong> — Hybrid, Agent in der Runtime.</li>
<li><strong>SCA</strong> (Software Composition Analysis) — OSS-Abhängigkeiten + CVEs (Snyk, Dependabot, Renovate).</li>
<li><strong>Secret-Scanning</strong> — gitleaks, TruffleHog. Geheimnisse niemals committen.</li>
<li><strong>IaC-Scan</strong> — Checkov, tfsec, KICS für Terraform/Kubernetes-Manifeste.</li>
</ul>
<h4>SLSA & Reproducible Builds</h4>
<p>SLSA Level 1–4 beschreibt Build-Integrität. Reproducible Builds verhindern, dass kompromittierte Build-Pipelines unbemerkt Backdoors einbringen (vgl. SolarWinds 2020).</p>
<h4>Threat Modeling</h4>
<p><strong>STRIDE</strong> (Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation), <strong>PASTA</strong>, <strong>LINDDUN</strong> (Privacy). Diagrammatisch über Data Flow Diagrams.</p>`
            },
            {
                title: 'Modul 3.4 — Hardware- & Side-Channel-Sicherheit',
                html: `
<h4>Spectre / Meltdown (CVE-2017-5753, -5715, -5754)</h4>
<p>Speculative-Execution-Side-Channel über Cache-Timing. Meltdown bricht User-Kernel-Isolation (primär Intel). Spectre v1/v2 betrifft Intel/AMD/Arm. Mitigation: KPTI (Linux), Microcode-Updates, Retpolines, IBRS/IBPB.</p>
<h4>Hardware Root-of-Trust</h4>
<ul>
<li><strong>TPM 2.0</strong> (ISO/IEC 11889) — Mainboard-Chip, hält Volume Master Keys (BitLocker), PCR-Messungen für Measured Boot.</li>
<li><strong>UEFI Secure Boot</strong> — verifiziert Bootloader-Signaturen.</li>
<li><strong>Apple T2 / Secure Enclave</strong>, <strong>Pluton</strong> (Microsoft/AMD/Intel/Qualcomm).</li>
<li><strong>TEE</strong>: SGX, TrustZone, AMD SEV-SNP, Intel TDX (Intel SGX wurde 2022 in Consumer-CPUs deprecated, lebt aber im Server-Segment fort).</li>
</ul>
<h4>Side-Channel-Klassen</h4>
<p>Timing, Power-Analysis (DPA, CPA), EM-Emanationen, akustische, Cache (Flush+Reload, Prime+Probe). Gegenmaßnahmen: Constant-Time-Code, Masking, Blinding (RSA).</p>`
            }
        ],

        // ========================== KAPITEL 4: OPERATIONS ==========================
        ch4_pages: [
            {
                title: 'Modul 4.1 — SOC, SIEM & SOAR',
                html: `
<h4>SOC-Reifegrade</h4>
<p>Level 1 (Triage) → Level 2 (Incident-Investigation) → Level 3 (Threat Hunting / Forensics) → Level 4 (Strategic).</p>
<h4>SIEM</h4>
<p>Splunk, Microsoft Sentinel, IBM QRadar, Elastic Security. Use-Cases via Sigma-Rules (vendor-neutral). Data-Lake-Trend (Snowflake, BigQuery) ergänzt SIEM für günstigere Long-term-Retention.</p>
<h4>SOAR</h4>
<p>Splunk SOAR, Tines, XSOAR. Playbooks orchestrieren Standardreaktionen (Quarantine-Host, Block-IP, Reset-Password). MTTR-Reduktion ist Kernmetrik.</p>
<h4>UEBA</h4>
<p>User & Entity Behavior Analytics — ML-basierte Baseline + Anomalie-Detection. Insider-Threats und Account-Takeover-Indikatoren.</p>
<h4>Detection-Engineering</h4>
<p>MITRE ATT&CK als TTP-Map → Sigma-Rules → SIEM-Detection → Validation via Atomic Red Team / Caldera.</p>`
            },
            {
                title: 'Modul 4.2 — Incident Response (NIST SP 800-61 r2)',
                html: `
<h4>Lifecycle</h4>
<ol>
<li><strong>Preparation</strong> — Playbooks, Tools, Communication-Plan, Backups.</li>
<li><strong>Detection & Analysis</strong> — IoCs, Triagierung, Severity-Klassifizierung.</li>
<li><strong>Containment, Eradication & Recovery</strong> — kurz/lang-Containment, Root-Cause-Beseitigung, restore-from-clean.</li>
<li><strong>Post-Incident</strong> — Lessons Learned, Metriken, Update der Playbooks.</li>
</ol>
<h4>Order of Volatility (RFC 3227)</h4>
<p>CPU-Register/Cache → RAM → Network State / Routing-Tabellen → laufende Prozesse → Disk → externe Logs → Backup-Medien. <em>Niemals zuerst neustarten</em> — RAM-Image hat Priorität.</p>
<h4>Containment-Patterns</h4>
<ul>
<li>Logische Isolation: Switch-Port-Disable, ACL, EDR-Network-Isolation.</li>
<li>Physische Isolation: Kabel ziehen (zerstört aber Netzwerk-Forensik).</li>
<li>Quarantine-VLAN bei massenhafter Infektion.</li>
</ul>
<h4>Ransomware-Spezifika</h4>
<p>Modern: Double Extortion (Verschlüsselung + Daten-Leak). Indikatoren: <code>vssadmin delete shadows</code>, <code>wmic shadowcopy</code>, plötzliches Egress-Volumen, neuartige Mutex-Namen. CISA-StopRansomware-Guide 2023 als Referenz.</p>`
            },
            {
                title: 'Modul 4.3 — Threat Hunting & Threat Intelligence',
                html: `
<h4>Pyramid of Pain (David Bianco)</h4>
<p>Hashes → IPs → Domains → Network/Host-Artefacts → Tools → <strong>TTPs</strong>. Je höher in der Pyramide, desto schmerzhafter für Angreifer, desto wertvoller für Verteidiger.</p>
<h4>Hunting-Hypothesen</h4>
<p>Beispiel: „Beaconing aus dem User-VLAN nach außen mit jitter < 10 % und Intervall 60 s deutet auf Cobalt-Strike-C2." → Suche per Sigma-Rule auf NetFlow/Zeek-Logs.</p>
<h4>Threat-Intel-Standards</h4>
<ul>
<li><strong>STIX 2.1</strong> — strukturierte Repräsentation (JSON).</li>
<li><strong>TAXII 2.1</strong> — Transport.</li>
<li><strong>MISP</strong> — Open-Source-Sharing-Platform.</li>
<li><strong>OSINT</strong>: Shodan, Censys, VirusTotal, AlienVault OTX.</li>
</ul>
<h4>MITRE ATT&CK Matrix</h4>
<p>Enterprise-Matrix: 14 Tactics × ~200 Techniques × ~700 Sub-Techniques (Stand v15). Tactics decken den gesamten Kill-Chain ab: Reconnaissance → Resource Development → Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Lateral Movement → Collection → Command and Control → Exfiltration → Impact.</p>`
            },
            {
                title: 'Modul 4.4 — Forensik & Recovery',
                html: `
<h4>Akquisition</h4>
<ul>
<li><strong>Memory</strong>: WinPMem, LiME, AVML. Tool: Volatility 3 für Analyse.</li>
<li><strong>Disk</strong>: dd / dcfldd / FTK Imager. <strong>Hash-Verifikation</strong> (SHA-256) — Chain-of-Custody.</li>
<li><strong>Network</strong>: PCAP via tcpdump/Wireshark, NetFlow/Zeek-Logs.</li>
<li><strong>Cloud</strong>: AWS CloudTrail, Azure Activity-Log, GCP Audit-Logs.</li>
</ul>
<h4>Artefakt-Quellen Windows</h4>
<p>Master-File-Table (\\$MFT), Registry-Hives (NTUSER.DAT, SOFTWARE, SYSTEM), Event-Logs (.evtx), Prefetch (.pf), Amcache.hve, ShimCache, USN-Journal, Browser-History, LNK-Files, Jump-Lists.</p>
<h4>BCDR</h4>
<p>RTO (Recovery Time Objective), RPO (Recovery Point Objective), MTD (Maximum Tolerable Downtime). 3-2-1-1-0-Backup-Regel: 3 Kopien, 2 Medientypen, 1 offsite, 1 immutable/offline, 0 Fehler beim Restore-Test.</p>
<h4>Key-Lessons aus Recovery-Failures</h4>
<p>Maersk (NotPetya 2017): einzig überlebende DC-Replik in Ghana → 10 Tage Wiederaufbau. Lesson: Geo-redundante immutable Backups + Tabletop-Exercises.</p>`
            }
        ]
    };

    // Hilfsfunktion: knappes, scientifically sound Q-Objekt
    function q(question, options, correct, explanation) {
        return { q: question, options: options, correct: correct, explanation: explanation };
    }

    const QUIZZES = {
        // ============== KAPITEL 1 — GRC (50 Fragen) ==============
        ch1: [
            q('Welcher Anteil entfällt in CAS-005 (SecurityX) auf die Domäne Governance, Risk and Compliance?',
                ['10 %', '15 %', '20 %', '25 %'], 2,
                'CAS-005 hebt GRC von 15 % (CAS-004) auf 20 % an, was die strategische Bedeutung des SecurityX-Profils widerspiegelt.'),
            q('Was ist der Hauptunterschied zwischen einem SOC 2 Type I und Type II Report?',
                ['Type I prüft mehr Kontrollen als Type II', 'Type II prüft die operative Effektivität über einen Zeitraum (typ. 6–12 Monate), Type I nur das Design zum Stichtag', 'Type I betrifft Hardware, Type II betrifft Software', 'Type I ist für interne Audits, Type II für externe'], 1,
                'Type I = Design-Snapshot. Type II = operative Effektivität über Beobachtungszeitraum durch unabhängigen Prüfer (AICPA SSAE 18).'),
            q('Quantitatives Risiko: Asset-Wert 200.000 €, Exposure-Faktor 25 %, ARO = 0,2. Wie hoch ist die ALE?',
                ['10.000 €', '40.000 €', '50.000 €', '5.000 €'], 0,
                'SLE = 200.000 × 0,25 = 50.000 €. ALE = SLE × ARO = 50.000 × 0,2 = 10.000 €.'),
            q('Welche Risk-Treatment-Option entspricht dem Abschluss einer Cyber-Versicherung?',
                ['Risk Avoidance', 'Risk Mitigation', 'Risk Transfer', 'Risk Acceptance'], 2,
                'Versicherung verschiebt finanzielle Konsequenzen (Risk Transfer/Sharing) auf eine dritte Partei. Das Risiko selbst bleibt bestehen.'),
            q('Welcher NIST CSF 2.0-Funktion wurde 2024 als eigene Funktion ergänzt?',
                ['Recover', 'Govern', 'Detect', 'Identify'], 1,
                'CSF 2.0 (2024) ergänzt "Govern" als sechste Funktion neben Identify, Protect, Detect, Respond, Recover.'),
            q('Welche Frist nennt Art. 33 DSGVO für die Meldung einer personenbezogenen Datenschutzverletzung an die Aufsichtsbehörde?',
                ['24 Stunden', '48 Stunden', '72 Stunden', '7 Tage'], 2,
                'Art. 33 DSGVO: ohne unangemessene Verzögerung, möglichst binnen 72 h nach Bekanntwerden.'),
            q('Was beschreibt die SBOM korrekt?',
                ['Logfile-Format für SIEM', 'Strukturierte Liste aller Software-Komponenten und Abhängigkeiten eines Produkts', 'Backup-Strategie nach 3-2-1', 'IDS-Signaturdatenbank'], 1,
                'SBOM (Software Bill of Materials) als SPDX/CycloneDX-Format; durch US-EO 14028 (2021) im Bundessektor verpflichtend.'),
            q('Welches EU-Regelwerk gilt seit dem 17.01.2025 verbindlich für den Finanzsektor und definiert IKT-Risikoanforderungen?',
                ['NIS2', 'DORA', 'eIDAS 2.0', 'ePrivacy-Verordnung'], 1,
                'DORA (Digital Operational Resilience Act, Verordnung 2022/2554) gilt seit 17.01.2025 in der gesamten EU für Finanzunternehmen.'),
            q('Welche maximale Geldbuße sieht Art. 83 Abs. 5 DSGVO bei schweren Verstößen vor?',
                ['10 Mio. € oder 2 % des weltweiten Jahresumsatzes', '20 Mio. € oder 4 % des weltweiten Jahresumsatzes', '50 Mio. €', '100 Mio. €'], 1,
                'Bei besonders schweren Verstößen (Art. 83(5)) bis 20 Mio. € oder 4 % des weltweiten Vorjahresumsatzes — der höhere Betrag gilt.'),
            q('Welches Framework bietet bidirektionale Traceability von Geschäftszielen zu kryptografischen Komponenten über sechs Schichten?',
                ['TOGAF', 'SABSA', 'COBIT 2019', 'ITIL 4'], 1,
                'SABSA (Sherwood Applied Business Security Architecture): Contextual → Conceptual → Logical → Physical → Component → Operational, gekreuzt mit den 6 W-Fragen.'),
            q('Bei Target 2013: Welcher Vektor erlaubte den initialen Zugang?',
                ['Direkter Bruteforce auf POS-Terminals', 'Spear-Phishing eines HVAC-Drittanbieters (Fazio)', 'SQL-Injection in der E-Commerce-Plattform', 'Diebstahl eines Admin-Laptops'], 1,
                'Spear-Phishing-Mail bei Fazio Mechanical Services (HVAC). Die kompromittierten Lieferantencredentials erlaubten Zugang zum Ariba-Lieferantenportal.'),
            q('Welcher Konflikt-basierte Zugriffskontroll-Ansatz wird typischerweise für Wirtschaftsprüfungen / Beratungen eingesetzt?',
                ['Bell-LaPadula', 'Biba', 'Clark-Wilson', 'Brewer-Nash (Chinese Wall)'], 3,
                'Brewer-Nash (Chinese Wall) verwaltet dynamisch Zugriffsrechte basierend auf bisherigen Klienten-Engagements zur Vermeidung von Interessenkonflikten.'),
            q('Welche Aussage zu ISO/IEC 27001:2022 stimmt?',
                ['Annex A enthält 114 Controls wie in der 2013er-Version', 'Annex A wurde auf 93 Controls in vier Themen umstrukturiert', 'Die Norm verlangt jährliche externe Audits durch eine staatliche Stelle', 'PDCA-Zyklus wurde durch DMAIC ersetzt'], 1,
                'ISO/IEC 27001:2022 hat 93 Annex-A-Controls in vier Themen: Organizational, People, Physical, Technological.'),
            q('Welcher Ansatz ist KEINE legitime Risk-Treatment-Option nach ISO 31000?',
                ['Risk Avoidance', 'Risk Mitigation', 'Risk Acceptance', 'Risk Ignoring (Ignorieren)'], 3,
                'Ignorieren ist keine zulässige Behandlungsoption — Risiken müssen identifiziert und bewusst behandelt werden, auch Akzeptanz erfordert formale Dokumentation.'),
            q('Welches Quantifizierungsmodell wird zunehmend für CISO-Boardberichte zur monetären Risikobewertung herangezogen?',
                ['CVSS', 'FAIR', 'OWASP Risk Rating', 'DREAD'], 1,
                'FAIR (Factor Analysis of Information Risk, Open-Group-Standard) liefert monetäre Verlustverteilungen über Loss Event Frequency × Loss Magnitude.'),
            q('Welche Formel berechnet ROSI?',
                ['ROSI = ALE × ARO', 'ROSI = (ALE_vorher − ALE_nachher − Maßnahmenkosten) / Maßnahmenkosten', 'ROSI = SLE × EF', 'ROSI = Kosten / Schaden'], 1,
                'Return on Security Investment ist die normalisierte Differenz der erwarteten jährlichen Verluste minus Maßnahmenkosten, geteilt durch Maßnahmenkosten.'),
            q('Welche Klausel in Vendor-Verträgen ist essenziell, um auch bei Sub-Outsourcing Visibility zu behalten?',
                ['Non-disclosure Agreement', 'Subcontractor-Disclosure / Right-to-Audit', 'Data Processing Agreement Light', 'NDA Tier-2'], 1,
                'Right-to-Audit + verpflichtende Subcontractor-Disclosure verhindern intransparente Lieferketten (4. Partei-Risiko).'),
            q('Welches Modell fokussiert auf strikte Funktionstrennung (Separation of Duties) durch Constrained Data Items und Transformation Procedures?',
                ['Bell-LaPadula', 'Biba', 'Clark-Wilson', 'Lattice-Based Access Control'], 2,
                'Clark-Wilson (1987) fordert, dass CDIs nur über validierte TPs durch zertifizierte Subjekte verändert werden — typisch für Finanztransaktionen.'),
            q('Welche EU-Richtlinie weitet ab Oktober 2024 den Geltungsbereich von Cybersecurity-Pflichten auf zahlreiche neue Sektoren (z. B. Lebensmittel, Postdienste) aus?',
                ['NIS1', 'NIS2', 'GDPR', 'eIDAS'], 1,
                'NIS2 (Richtlinie (EU) 2022/2555), nationale Umsetzungsfrist 17.10.2024. Erheblich erweiterter Sektoranwendungsbereich + Sanktionsregime.'),
            q('Was ist der primäre Zweck eines Risk Registers?',
                ['Mitarbeiter-Performance bewerten', 'Identifizierte Risiken mit Owner, Bewertung, Behandlung und Status zentral dokumentieren', 'Audit-Logs zu speichern', 'Patch-Status zu erfassen'], 1,
                'Risk Register ist das zentrale GRC-Artefakt: Risiko-ID, Beschreibung, Wahrscheinlichkeit, Auswirkung, Owner, Treatment, Status, Reviewdatum.'),
            q('Welcher Standard adressiert speziell die Sicherheit industrieller Steuerungssysteme?',
                ['ISO 27001', 'IEC 62443', 'NIST SP 800-53', 'PCI-DSS'], 1,
                'IEC 62443 (ehem. ISA-99) ist die internationale Norm-Familie für IT-Sicherheit in industriellen Automatisierungs- und Steuerungssystemen.'),
            q('Welche EU-Verordnung trat 2024 für Künstliche-Intelligenz-Systeme in Kraft und führt risikoklassenbasierte Pflichten ein?',
                ['eIDAS 2.0', 'EU AI Act', 'GDPR-Update 2024', 'Cyber Resilience Act'], 1,
                'EU AI Act (Verordnung 2024/1689) wurde 2024 verabschiedet; Pflichten greifen schrittweise 2025–2027 nach Risikoklassen (verboten / hochriskant / begrenzt / minimal).'),
            q('Welche Rolle hat ein Data Protection Officer (DPO) nach DSGVO?',
                ['Operative Verschlüsselung von Daten', 'Beratung, Überwachung der DSGVO-Compliance, Anlaufstelle für Aufsichtsbehörde', 'IT-Helpdesk', 'Marketing-Genehmigung'], 1,
                'Art. 39 DSGVO: Beratung, Überwachung, Risikoorientierung, Kooperation mit der Aufsichtsbehörde. Unabhängig, weisungsfrei in Datenschutzfragen.'),
            q('Welcher PCI-DSS v4.0-Anforderungsbereich verlangt explizit MFA für alle Zugriffe auf das Karteninhaberdaten-Umfeld?',
                ['Requirement 1', 'Requirement 8', 'Requirement 11', 'Requirement 12'], 1,
                'PCI-DSS v4.0 Requirement 8 (Identity & Authentication): MFA für sämtliche nicht-konsolen-basierten Zugriffe auf das CDE und Admin-Zugriffe.'),
            q('Welche Methode ist KEIN qualitatives Risikoanalyse-Werkzeug?',
                ['Heat Map (5×5)', 'Risk Matrix', 'Monte-Carlo-Simulation', 'Delphi-Methode'], 2,
                'Monte-Carlo-Simulation ist quantitativ (stochastische Modellierung von Verteilungen). Heat Map, Risk Matrix, Delphi sind qualitativ.'),
            q('Welche Anforderung an die Aufbewahrung digitaler Beweise stellt die Chain of Custody?',
                ['Beweise dürfen nur 24 h gespeichert werden', 'Lückenlose Dokumentation, wer wann mit dem Beweis was gemacht hat', 'Beweise müssen verschlüsselt werden', 'Beweise nur in der Cloud lagern'], 1,
                'Chain of Custody = lückenlose, manipulationssichere Dokumentation jedes Zugriffs zur gerichtlichen Verwertbarkeit (RFC 3227 + nationale StPO).'),
            q('Welcher Begriff beschreibt das Risiko, dass eine 4. Partei (Sub-Lieferant des Lieferanten) unbemerkt sensible Daten verarbeitet?',
                ['Insider-Threat', 'Fourth-Party-Risk', 'Shadow IT', 'Bring-Your-Own-Device'], 1,
                'Fourth-Party-Risk wird durch SOC-2-Type-II-Reports, vertragliche Subcontractor-Disclosure und Continuous-Monitoring-Tools (BitSight, SecurityScorecard) adressiert.'),
            q('Welche Aussage zu Risk Acceptance ist korrekt?',
                ['Risk Acceptance benötigt keine Dokumentation', 'Akzeptanz muss formal durch den Risk Owner mit klarem Mandat erfolgen', 'Nur die IT darf Risiken akzeptieren', 'Akzeptanz hebt die Risiken automatisch auf'], 1,
                'Akzeptiertes Restrisiko muss im Risk Register dokumentiert und durch den verantwortlichen Risk Owner (mit Geschäftsmandat) gegengezeichnet werden.'),
            q('Welcher Standard liefert konkrete Kontrollen für US-Bundesinformationssysteme und ist die meistgemappte Control-Bibliothek?',
                ['NIST SP 800-53', 'NIST SP 800-30', 'NIST SP 800-160', 'NIST SP 1800-25'], 0,
                'NIST SP 800-53 r5 (2020) — Control-Katalog mit 20 Familien (AC, AU, AT, ...) und über 1000 Sub-Controls. Häufigster Cross-Mapping-Anker.'),
            q('Welcher GRC-Aspekt wird durch SOC 1 (SSAE 18) primär adressiert?',
                ['Cybersecurity Controls', 'Finanzberichts-relevante Kontrollen (ICFR)', 'Datenschutz', 'Verfügbarkeit'], 1,
                'SOC 1 prüft Kontrollen, die Auswirkungen auf die Finanzberichterstattung des Servicekunden haben (ICFR — Internal Controls over Financial Reporting).'),
            q('Welcher RMF-Schritt (NIST SP 800-37 r2) folgt nach „Implement Controls"?',
                ['Categorize', 'Select', 'Assess', 'Authorize'], 2,
                'Reihenfolge: Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor.'),
            q('Welche FAIR-Größe quantifiziert die jährliche Häufigkeit eines Verlustereignisses?',
                ['Loss Magnitude', 'Loss Event Frequency (LEF)', 'Probable Loss Magnitude', 'Single Loss Expectancy'], 1,
                'FAIR teilt Risiko in LEF (Frequency) × LM (Magnitude). LEF = TEF × Vulnerability.'),
            q('Welche Datenklassifizierung erfordert in der Regel Verschlüsselung at-rest UND in-transit sowie strikte DLP-Kontrollen?',
                ['Public', 'Internal', 'Confidential / Restricted', 'Anonymized'], 2,
                'Höhere Klassen (Confidential/Restricted/Secret) erzwingen Verschlüsselung in beiden Zuständen plus DLP, MFA und Audit-Logging.'),
            q('Welche Klausel im Vertrag mit einem Cloud-Provider sichert die Möglichkeit eigener Compliance-Audits?',
                ['Right-to-Audit-Klausel', 'Force-Majeure-Klausel', 'Liability-Cap', 'Auto-Renewal-Klausel'], 0,
                'Right-to-Audit erlaubt direkt oder via unabhängigem Prüfer Einsicht in Kontrollen — kritisch für regulierte Branchen (PCI, HIPAA, BaFin).'),
            q('Welche Phase des PDCA-Zyklus entspricht der ISMS-internen Audit-Phase?',
                ['Plan', 'Do', 'Check', 'Act'], 2,
                'PDCA: Plan = Risikobehandlungsplan, Do = Umsetzung, Check = interne Audits & Management Review, Act = Korrekturmaßnahmen.'),
            q('Welcher SBOM-Standard wird von der Linux Foundation unter dem CycloneDX-Konkurrenzformat geführt?',
                ['SPDX', 'STIX', 'TAXII', 'OSCAL'], 0,
                'SPDX (ISO/IEC 5962:2021) und CycloneDX (OWASP) sind die zwei dominanten SBOM-Formate.'),
            q('Welche Eigenschaft kennzeichnet die GDPR-Rolle des „Auftragsverarbeiters" (Processor)?',
                ['Bestimmt Zwecke und Mittel der Verarbeitung', 'Verarbeitet personenbezogene Daten ausschließlich nach dokumentierter Weisung des Verantwortlichen', 'Ist immer im EU-Raum ansässig', 'Hat keine Meldepflicht bei Breaches'], 1,
                'Art. 28 DSGVO: der Auftragsverarbeiter handelt strikt weisungsgebunden und meldet Vorfälle „unverzüglich" an den Verantwortlichen.'),
            q('Welche Maßnahme entspricht „Pseudonymisierung" nach Art. 4 Nr. 5 DSGVO?',
                ['Vollständige Anonymisierung', 'Trennung der identifizierenden Information durch zusätzliche, getrennt aufbewahrte Daten', 'Hashing mit SHA-1', 'Verschlüsselung mit DES'], 1,
                'Pseudonymisierung: Daten ohne Zusatzinfo nicht mehr zuordenbar, mit der Zusatzinfo aber re-identifizierbar (vs. Anonymisierung = irreversibel).'),
            q('Welche Eigenschaft trennt eine private Cloud (NIST SP 800-145) von einer Community Cloud?',
                ['Hardware-Standort', 'Eine Community Cloud wird von mehreren Organisationen mit gemeinsamen Anforderungen genutzt, eine private Cloud nur von einer', 'Private Clouds nutzen kein Internet', 'Community Clouds sind nur in der EU erlaubt'], 1,
                'NIST SP 800-145 unterscheidet Private/Community/Public/Hybrid nach Zugehörigkeit der Konsumenten.'),
            q('Welcher Compliance-Bericht ist für SaaS-Anbieter im US-Markt typischerweise Mindestanforderung großer Enterprise-Kunden?',
                ['SOC 2 Type II', 'PCI-DSS Self-Assessment Questionnaire A', 'NIS1', 'TISAX'], 0,
                'SOC 2 Type II (AICPA) zu den Trust Service Criteria Security/Availability/Confidentiality/Privacy/Processing Integrity ist Quasi-Standard für SaaS-Vendor-Reviews.'),
            q('Welche Legalbasis nach Art. 6 DSGVO erfordert eine ausdrückliche, freiwillige, informierte und unmissverständliche Erklärung?',
                ['Vertragserfüllung', 'Berechtigtes Interesse', 'Einwilligung', 'Rechtliche Verpflichtung'], 2,
                'Art. 6(1)(a) i.V.m. Art. 7 DSGVO: nachweisbar, jederzeit widerrufbar, Kopplungsverbot.'),
            q('Welcher Audit-Typ stellt nach AICPA SSAE 18 Datenschutz, Vertraulichkeit und Verfügbarkeit eines Service-Anbieters fest?',
                ['SOC 1', 'SOC 2', 'SOC 3', 'SOC for Cybersecurity'], 1,
                'SOC 2 fokussiert auf Trust Service Criteria; SOC 3 ist eine öffentlich verteilbare Kurzfassung von SOC 2.'),
            q('Welche Methode quantifiziert systematisch Geschäftsauswirkung im Rahmen einer BCM-/BIA-Analyse?',
                ['MTD, RTO, RPO, MAO', 'CVSS, EPSS, KEV', 'STRIDE, DREAD', 'OWASP Risk Rating'], 0,
                'Business-Impact-Analyse arbeitet mit MTD (Maximum Tolerable Downtime), RTO (Recovery Time), RPO (Recovery Point), MAO (Maximum Acceptable Outage).'),
            q('Welche Klausel verpflichtet einen Cloud-Anbieter zur Mitwirkung bei DSGVO-Anfragen Betroffener?',
                ['Data Processing Agreement (DPA)', 'NDA', 'EULA', 'SOW'], 0,
                'Art. 28 DSGVO + Art. 13/15-21: das DPA muss Mitwirkungspflichten bei Auskunfts-, Lösch-, Berichtigungs- und Datenübertragbarkeitsrechten regeln.'),
            q('Welche EU-Verordnung adressiert ab Dezember 2027 Cybersecurity-Anforderungen für Produkte mit digitalen Elementen (Hard-/Software)?',
                ['NIS2', 'DORA', 'Cyber Resilience Act (CRA)', 'eIDAS 2.0'], 2,
                'CRA (VO (EU) 2024/2847, in Kraft 10.12.2024, Hauptpflichten ab 11.12.2027) verpflichtet Hersteller zu Security-by-Design, CVD-Prozessen und Update-Pflichten.'),
            q('Welche Eigenschaft erlaubt EU-Standardvertragsklauseln (SCC 2021) als Transfermechanismus nach Schrems II?',
                ['Sie ersetzen die DSGVO', 'Sie sind Vertragsklauseln + Transfer Impact Assessment + ggf. zusätzliche Maßnahmen wie Verschlüsselung', 'Sie gelten nur für EU-EU-Transfers', 'Sie gelten unbefristet ohne TIA'], 1,
                'Nach Schrems II (C-311/18, 2020) müssen SCCs durch ein Transfer Impact Assessment (TIA) und ggf. zusätzliche technische Maßnahmen (E2E-Verschlüsselung, Key-Hosting in der EU) ergänzt werden.'),
            q('Welcher CIS-Control-Bereich adressiert primär Inventarisierung von Hard- und Software (CIS Controls v8)?',
                ['Control 1 & 2', 'Control 5', 'Control 14', 'Control 17'], 0,
                'CIS Controls v8: Control 1 = Inventory of Enterprise Assets, Control 2 = Inventory of Software Assets — Grundlage jedes IT-Sicherheitsprogramms.'),
            q('Welche Risikometrik kombiniert CVSS-Score mit Wahrscheinlichkeit aktueller Exploitierung?',
                ['EPSS', 'KEV', 'CWSS', 'CVSS-BTE'], 0,
                'EPSS (Exploit Prediction Scoring System) von FIRST liefert eine 30-Tages-Wahrscheinlichkeit aktiver Exploitation, ergänzt CVSS-Severity.'),
            q('Welcher Aspekt unterscheidet eine Compliance-Anforderung von einer Sicherheits-Best-Practice?',
                ['Compliance ist immer höher priorisiert', 'Compliance ist rechtlich/vertraglich verbindlich, Best-Practice ist empfehlenden Charakters', 'Best-Practice ist meist gesetzlich verankert', 'Beide sind synonym'], 1,
                'Compliance = Erfüllung verbindlicher Vorgaben (Gesetz, Vertrag, Standard); Best-Practice = empfohlene, branchenübliche Vorgehensweise — beides ergänzt sich.')
        ],

        // ============== KAPITEL 2 — Architecture (50 Fragen) ==============
        ch2: [
            q('Welches NIST-Dokument definiert die Zero Trust Architecture?',
                ['SP 800-53', 'SP 800-171', 'SP 800-207', 'SP 800-61'], 2,
                'NIST Special Publication 800-207 (2020) ist das Referenzdokument für ZTA; definiert PE, PA, PEP, Trust-Algorithmen.'),
            q('Welche Kernaussage prägt Zero Trust?',
                ['Trust internal, verify external', 'Never trust, always verify', 'Trust until breach', 'Trust based on IP only'], 1,
                'ZTA-Maxime: implizites Vertrauen (z. B. durch Netzwerkstandort) wird abgeschafft; jede Anfrage wird kontinuierlich verifiziert.'),
            q('Welche ZTA-Komponente trifft die Zugriffsentscheidung?',
                ['Policy Enforcement Point (PEP)', 'Policy Engine (PE)', 'Identity Provider (IdP)', 'Web Application Firewall (WAF)'], 1,
                'Policy Engine (PE) trifft die Entscheidung; Policy Administrator (PA) etabliert die Session; PEP setzt sie auf dem Daten-Pfad durch.'),
            q('Was unterscheidet HYOK von BYOK in Cloud-KMS-Architekturen?',
                ['HYOK ist günstiger als BYOK', 'Bei HYOK verlässt der Schlüssel niemals die Kunden-Infrastruktur, bei BYOK wird er in das Cloud-KMS importiert', 'BYOK ist nur für TLS, HYOK für Disk-Encryption', 'HYOK nutzt symmetrische, BYOK asymmetrische Keys'], 1,
                'HYOK = on-prem Key, Cloud ruft externe Crypto-API. BYOK = Kunde generiert, Cloud-KMS hält und benutzt — Cloud-Anbieter kann theoretisch zugreifen.'),
            q('Welche Cloud-Sicherheitsklasse identifiziert öffentlich exponierte S3-Buckets oder fehlkonfigurierte IAM-Policies?',
                ['CASB', 'CSPM', 'CWPP', 'EDR'], 1,
                'CSPM (Cloud Security Posture Management) erkennt Misconfigurations in IaaS/PaaS. CASB = SaaS-Visibility. CWPP = Workload-Runtime. EDR = Endpunkt.'),
            q('Welche Komponente integriert CSPM, CWPP, CIEM und IaC-Scanning?',
                ['SASE', 'CNAPP', 'CASB', 'XDR'], 1,
                'CNAPP (Cloud-Native Application Protection Platform) — Gartner-Konzept seit 2021 — vereint Posture, Workload, Identity, IaC.'),
            q('Welche Stuxnet-Eigenschaft demonstriert die Schwäche reiner Air-Gap-Verteidigung?',
                ['DDoS gegen DNS', 'Verbreitung über USB-Sticks und vier Zero-Day-Exploits', 'SQL-Injection in WinCC', 'Phishing-Mails an SCADA-Operatoren'], 1,
                'Stuxnet überwand Air-Gap durch USB-Sticks und nutzte u. a. CVE-2010-2568 (LNK), CVE-2010-2729 (Print Spooler), 2 weitere Zero-Days.'),
            q('Welche Ebene des Purdue-Modells beherbergt typischerweise PLCs und RTUs?',
                ['Level 0', 'Level 1', 'Level 3', 'Level 4'], 1,
                'Level 1 = Basic Control (PLCs, RTUs). Level 0 = physische Sensoren/Aktoren. Level 3 = MES. Level 4 = Enterprise IT.'),
            q('Welche Zugriffskontrolle ist auf Lattice-Strukturen mit Sicherheitslabels und Dominanz-Relationen aufgebaut?',
                ['DAC', 'MAC', 'RBAC', 'ABAC'], 1,
                'Mandatory Access Control (MAC) — Subjekte/Objekte erhalten Labels, Zugriff nur wenn die Subjekt-Klasse die Objekt-Klasse im Lattice dominiert (vgl. Bell-LaPadula).'),
            q('Welche Eigenschaft beschreibt Bell-LaPadulas „Star Property" (* Property)?',
                ['No Read Up', 'No Write Down', 'No Read Down', 'No Write Up'], 1,
                'Bell-LaPadula schützt Vertraulichkeit: * Property = No Write Down (verhindert Geheimnis-Abfluss in niedrigere Klassen).'),
            q('Welche Eigenschaft schützt Biba die Daten-Integrität?',
                ['No Read Up', 'No Write Up', 'No Read Down', 'Discretionary Override'], 1,
                'Biba: * Integrity Axiom = No Write Up (verhindert, dass weniger vertrauenswürdige Subjekte hochintegre Daten verfälschen).'),
            q('Was bezeichnet SASE laut Gartner-Konzept (2019)?',
                ['Reine Endpoint-Lösung', 'Cloud-natives Konstrukt aus SD-WAN + Security-Stack (CASB, SWG, ZTNA, FWaaS)', 'Hardware-Firewall mit AI', 'Backup-Konzept'], 1,
                'SASE (Secure Access Service Edge) bündelt Networking (SD-WAN) und Security (CASB, SWG, ZTNA, FWaaS) als Cloud-Service.'),
            q('Welche Architektur löst klassische Site-to-Site-VPNs zunehmend ab?',
                ['ZTNA', 'PPTP', 'IPSec-Hub', 'Frame-Relay'], 0,
                'Zero Trust Network Access (ZTNA, oft als Teil von SASE/SSE) ersetzt VPN durch identitätsbasierten, applikationsspezifischen Zugriff.'),
            q('Welche Hardware-Komponente ist die typische Verankerung des BitLocker Volume Master Keys auf Endgeräten?',
                ['HSM', 'TPM 2.0', 'Smartcard', 'YubiKey'], 1,
                'TPM 2.0 (ISO/IEC 11889) auf dem Mainboard versiegelt den VMK an die Hardware; HSM ist serverseitig, Smartcards/YubiKeys sind benutzergebunden.'),
            q('Bei Spectre v1 (CVE-2017-5753) wird welcher CPU-Mechanismus missbraucht?',
                ['Out-of-Order Execution durch Branch Prediction (Speculative Execution)', 'DMA durch Firewire', 'TLB-Flush', 'AES-NI-Bypass'], 0,
                'Spectre nutzt Speculative Execution mit Branch-Prediction; spekulative Loads hinterlassen messbare Cache-Spuren über Side-Channels.'),
            q('Welche Cloud-Computing-Variante ermöglicht Berechnungen auf verschlüsselten Daten ohne vorherige Entschlüsselung?',
                ['TLS 1.3', 'Homomorphe Verschlüsselung', 'AES-GCM', 'TDE'], 1,
                'Homomorphe Verschlüsselung (z. B. CKKS, BFV, BGV; aktuelle Bibliotheken: Microsoft SEAL, OpenFHE) erlaubt Operationen auf Chiffretexten.'),
            q('Welcher Cloud-Service-Modus erfordert die größte Eigenverantwortung für OS-Patching durch den Kunden?',
                ['SaaS', 'PaaS', 'IaaS', 'FaaS'], 2,
                'IaaS: Cloud-Anbieter stellt nur Hypervisor/Hardware. Kunde verantwortet OS, Middleware, Anwendung und Daten — inklusive Patches.'),
            q('Welche Cloud-Sicherheitsklasse fokussiert auf Runtime-Schutz von Containern und VMs?',
                ['CASB', 'CSPM', 'CWPP', 'CIEM'], 2,
                'CWPP (Cloud Workload Protection Platform) — Hardening, EDR-Funktionen, Container-Security während des Betriebs.'),
            q('Welcher Standard ist die Kerntechnologie für Trusted-Execution-Environments auf modernen Intel-Server-CPUs?',
                ['SGX (Software Guard Extensions)', 'AMT', 'PUF', 'SEV-SNP'], 0,
                'Intel SGX bleibt im Server-Segment (Xeon Scalable) als TEE relevant; im Consumer-Bereich seit 12th Gen deprecated. Konkurrent: AMD SEV-SNP.'),
            q('Was ist die zentrale Schwäche eines flachen Enterprise-Netzwerks ohne Mikrosegmentierung?',
                ['Hohe Latenz', 'Ungebremste laterale Bewegung nach erfolgreichem Initial Access', 'Mehr Hardware-Bedarf', 'Geringere Bandbreite'], 1,
                'Lateral Movement ist der Killer (NotPetya, WannaCry, Target). Mikrosegmentierung schränkt Ost-West-Traffic auf zwingend nötige Pfade ein.'),
            q('Welcher Mechanismus liefert kurzlebige X.509-Identitäten für Workloads in Service-Meshes?',
                ['SPIFFE / SPIRE', 'Kerberos', 'NTLM', 'RADIUS'], 0,
                'SPIFFE definiert SVIDs (X.509 oder JWT) als Workload-Identity; SPIRE ist die Referenzimplementierung. Standard in Istio, Consul, Cilium.'),
            q('Welcher Fall demonstriert prominent Cross-VM-Side-Channel-Risiken?',
                ['Heartbleed', 'Spectre / Meltdown', 'Equifax-Breach', 'Stuxnet'], 1,
                'Spectre/Meltdown (2018) durchbrachen Isolations-Annahmen zwischen VMs/Containern auf demselben Host und erzwangen Microcode/OS-Patches.'),
            q('Was beschreibt eine Industrial DMZ (iDMZ) im Purdue-Modell?',
                ['Firewall zwischen L0 und L1', 'Pufferzone zwischen Operational Technology (L3) und Enterprise IT (L4)', 'Backup-Netzwerk', 'WLAN-Zone für Engineering-Mobile'], 1,
                'Die iDMZ liegt zwischen L3 (Operations) und L4 (Enterprise). Hosts wie Patch-Server, Historian-Replicas, Anti-Virus-Distribution Points dürfen niemals direkt auf L0–L2 zugreifen.'),
            q('Welche Architektur ist primär durch SOLAR / Stuxnet als Mahnung etabliert?',
                ['Defense-in-Depth über mehrere Schichten + Application Whitelisting in OT', 'Reine Hardware-Firewall', 'Single-Sign-On überall', 'Vollständige Cloud-Migration'], 0,
                'Stuxnet zeigte: Air-Gap reicht nicht. Notwendig sind Application Whitelisting auf Engineering Workstations + signierte PLC-Programme + Device-Control.'),
            q('Welche IETF-Konvention dokumentiert OCSP-Stapling?',
                ['RFC 5246', 'RFC 6066 / RFC 6961', 'RFC 8446', 'RFC 5280'], 1,
                'OCSP-Stapling als TLS-Extension wurde in RFC 6066 (Status_request) eingeführt und in RFC 6961 (Multiple Certificate Status Request) erweitert.'),
            q('Welche Netzwerkarchitektur isoliert sensible Workloads physisch vom Internet?',
                ['Triple-Tier-Web-Architecture', 'Air-Gapped Network', 'Reverse Proxy', 'Virtual LAN'], 1,
                'Air-Gap = physisch keine Netzwerkverbindung. Reicht aber nicht (Stuxnet via USB) — flankierende Device-Control nötig.'),
            q('Welche der folgenden Aussagen zu Mikrosegmentierung ist falsch?',
                ['Kann via SDN/Overlay umgesetzt werden', 'Reduziert Lateral-Movement signifikant', 'Erfordert vollständige Disk-Verschlüsselung', 'Lässt sich oft mit Identity-aware Proxies kombinieren'], 2,
                'Disk-Verschlüsselung ist orthogonal zur Mikrosegmentierung. Mikrosegmentierung adressiert Netzwerkflüsse, nicht Storage at Rest.'),
            q('Welcher Standard adressiert die Anforderungen an OT-Sicherheit nach Reifegraden (Security Levels SL1–SL4)?',
                ['NIST SP 800-82 r3', 'IEC 62443-3-3', 'PCI-DSS', 'NIS2'], 1,
                'IEC 62443-3-3 spezifiziert System-Security-Requirements und Capability-Security-Levels (SL1 bis SL4) für industrielle Steuerungssysteme.'),
            q('Welche Komponente eines Confidential-Computing-Setups ist die zentrale Vertrauensbasis?',
                ['BIOS-Passwort', 'Hardware-attestiertes TEE (z. B. Intel TDX, AMD SEV-SNP, Arm CCA)', 'Antivirus', 'Application-Layer-Encryption'], 1,
                'TEEs liefern Memory-Encryption + Remote-Attestation; ohne attestierte Hardware-Vertrauensbasis ist Confidential Computing nutzlos.'),
            q('Welche Eigenschaft ist KEIN Inhalt von NIST SP 800-207 (Zero Trust)?',
                ['Per-Session Access Decision', 'Continuous Authentication & Authorization', 'Implicit trust based on internal IP range', 'Granular Resource Authentication'], 2,
                'Implicit trust ist genau die Anti-Doktrin von ZTA. NIST SP 800-207 fordert ausdrücklich kein Vertrauen aufgrund Netzwerkstandort.'),
            q('Welche Cloud-Bereitstellung kombiniert öffentliche und private Komponenten mit datengebundener Workload-Platzierung?',
                ['Hybrid Cloud', 'Community Cloud', 'Multi-Tenant', 'Private Cloud'], 0,
                'NIST SP 800-145: Hybrid Cloud = Komposition aus zwei oder mehr eigenständigen Clouds, die durch standardisierte Technologie verbunden sind.'),
            q('Welche Sicherheitsschicht in einer Web-Architektur untersucht und blockiert HTTP-Requests anhand von OWASP-Top-10-Mustern?',
                ['IDS', 'WAF', 'CASB', 'IPS'], 1,
                'WAF (Web Application Firewall, OWASP CRS, ModSecurity, AWS WAF, Cloudflare) inspiziert L7-Traffic, schützt gegen Injection, XSS, RCE-Versuche.'),
            q('Welche Microservice-Architekturkomponente reguliert Service-zu-Service-Traffic und implementiert mTLS automatisch?',
                ['API-Gateway', 'Service Mesh (z. B. Istio, Linkerd)', 'CI/CD-Pipeline', 'Reverse Proxy'], 1,
                'Service Meshes injizieren Sidecar-Proxies (Envoy) und liefern mTLS, Telemetrie, Traffic-Splitting ohne Anwendungs-Codeänderung.'),
            q('Welcher Standard codiert Identitäts-Föderation auf Basis von XML mit Assertions zwischen IdP und SP?',
                ['OAuth 2.0', 'OIDC', 'SAML 2.0', 'Kerberos'], 2,
                'SAML 2.0 (OASIS 2005) — XML-basierte Assertions; in Enterprise-SSO weit verbreitet (vs. OIDC = JSON/JWT auf OAuth 2.0).'),
            q('Welche Eigenschaft hat OpenID Connect gegenüber reinem OAuth 2.0?',
                ['OIDC ist langsamer', 'OIDC ergänzt OAuth 2.0 um Authentifizierungs-Layer (ID-Token als signiertes JWT)', 'OIDC ersetzt TLS', 'OIDC arbeitet ohne Tokens'], 1,
                'OAuth 2.0 ist Authorization-Framework. OIDC fügt einen ID-Token (signiertes JWT) hinzu und definiert UserInfo-Endpoint — dadurch echte Authentifizierung.'),
            q('Welche Eigenschaft beschreibt FIDO2 / WebAuthn (W3C/FIDO Alliance)?',
                ['Symmetrische Shared Secrets über E-Mail', 'Phishing-resistente Public-Key-Authentifizierung an Origin gebunden', 'Reine SMS-OTP', 'PIN-basierte Single-Factor-Auth'], 1,
                'WebAuthn bindet Credential an Origin (Domain) und nutzt Hardware-Token; resistent gegen klassische Phishing-Proxies (kein Reuse jenseits Origin).'),
            q('Welche Architektur trennt das Anwendungsdaten-Backend von der Web-Schicht und positioniert eine DMZ-Web-Tier?',
                ['Single-Tier', 'Two-Tier', 'Three-Tier (Presentation/Logic/Data)', 'Mesh-Architektur'], 2,
                'Klassisches Three-Tier: Presentation (DMZ), Application/Logic (interne Zone), Data (geschützteste Zone) — Defense-in-Depth-Standard.'),
            q('Welche Komponente ist im IPSec-VPN für die Schlüssel-Aushandlung zuständig?',
                ['ESP', 'AH', 'IKEv2', 'L2TP'], 2,
                'IKEv2 (RFC 7296) handelt SAs (Security Associations) und Schlüssel aus; ESP/AH sind die Datenpfad-Protokolle.'),
            q('Welche TLS-Version wurde 2018 standardisiert und entfernt RSA-Key-Exchange sowie statische DH?',
                ['TLS 1.0', 'TLS 1.2', 'TLS 1.3', 'TLS 2.0'], 2,
                'RFC 8446 (TLS 1.3, 2018): nur AEAD, ECDHE/DHE-Forward-Secrecy, kürzerer Handshake (1-RTT, 0-RTT optional).'),
            q('Welche Eigenschaft beschreibt eine Air-Gap-Schwäche, die Stuxnet historisch ausnutzte?',
                ['Hohe Latenz', 'Wechseldatenträger / USB-Brücke zwischen IT und OT', 'Fehlende Bandbreite', 'GPU-Limitation'], 1,
                'Stuxnet wurde via präparierter USB-Sticks in air-gapped Anlagen eingeschleust → USB-Sanitizing-Kioske + Application Whitelisting sind Standardgegenmaßnahmen.'),
            q('Welche Architektur-Komponente erzwingt Identity-aware Access an Stelle eines klassischen VPN?',
                ['Site-to-Site IPSec', 'ZTNA-Broker (z. B. Identity-aware Proxy)', 'Static Routing', 'NAT-Gateway'], 1,
                'ZTNA-Broker (z. B. Google BeyondCorp / IAP, Cloudflare Access, Zscaler Private Access) authentifizieren pro Request anhand Identität + Device-Posture.'),
            q('Welche Aussage zu DNSSEC ist korrekt?',
                ['DNSSEC verschlüsselt Anfragen', 'DNSSEC liefert Authentizität & Integrität von DNS-Antworten via Signaturkette', 'DNSSEC ersetzt TLS', 'DNSSEC ist nur in DNS over HTTPS aktiv'], 1,
                'DNSSEC (RFC 4033 ff.) signiert Records; schützt nicht die Vertraulichkeit (dafür DoT/DoH).'),
            q('Welche Architektur ist ein typisches Pattern zum Schutz öffentlicher APIs gegen Bot-Traffic, Volumetric-DDoS und Injection?',
                ['CDN + WAF + Rate-Limiting + API-Gateway', 'Reines Reverse-Proxy', 'Single Layer-3-Firewall', 'IPS-only'], 0,
                'Defense-in-Depth: CDN (DDoS-Absorption), WAF (L7-Inspection), Rate-Limit/Quota, API-Gateway (Auth, Schema-Validation).'),
            q('Welche TPM-Funktion misst und versiegelt den Boot-Pfad an PCR-Werte?',
                ['Measured Boot mit PCR-Extends', 'Direct Memory Access', 'I/O-MMU', 'CPU-Hyperthreading'], 0,
                'TPM 2.0: jeder Boot-Schritt extendiert PCRs (PCR_Extend = SHA(PCR_old || measurement)); Sealing bindet Secrets an PCR-Zustand.'),
            q('Welche Eigenschaft hat eine Hardware-Backed Key in Apple Secure Enclave / Android StrongBox?',
                ['Schlüssel verlässt das Secure Element nicht und ist OS-/Root-resistent', 'Schlüssel liegt im RAM des Anwendungsprozesses', 'Schlüssel ist im Backup enthalten', 'Schlüssel kann frei exportiert werden'], 0,
                'Hardware-backed Keys sind in einem dedizierten Secure-Element-Chip; Operationen finden dort statt — Root-Zugriff erlaubt keine Extraktion.'),
            q('Welche Architekturschicht eines CASB ist API-Mode (vs. Forward-Proxy)?',
                ['API-Mode liest direkt SaaS-Tenant-APIs für nachgelagerte Compliance/DLP', 'API-Mode arbeitet inline am Endpoint', 'API-Mode ersetzt SAML', 'API-Mode ist VPN-basiert'], 0,
                'API-Mode-CASB (z. B. Microsoft Defender for Cloud Apps, Netskope) integriert via SaaS-API → asynchrone Discovery + Remediation; Forward-Proxy = inline TLS-Termination.'),
            q('Welche Cloud-Risikoklasse adressiert IAM-Berechtigungs-Sprawl in komplexen AWS/Azure/GCP-Umgebungen?',
                ['CSPM', 'CIEM', 'CWPP', 'CASB'], 1,
                'CIEM (Cloud Infrastructure Entitlement Management) analysiert IAM-Permissions, identifiziert über-privilegierte Identitäten und schlägt Least-Privilege-Empfehlungen vor.'),
            q('Welche Architektur-Eigenschaft ist KEIN Bestandteil eines klassischen DMZ-Designs?',
                ['Bastion-Host', 'Reverse-Proxy', 'Direkter Internetzugriff auf interne Datenbanken', 'Multi-Layer-Firewall'], 2,
                'Eine DMZ ist gerade dazu da, direkten Internetzugriff auf interne Systeme zu verhindern. Datenbanken liegen niemals in der DMZ.'),
            q('Welche Aussage zu Mikrosegmentierung mit Identity-aware Policies ist korrekt?',
                ['Sie nutzt nur IP-Listen', 'Sie kombiniert Workload-Identity, Tags/Labels und Layer-7-Attribute zu Policies', 'Sie ersetzt MFA', 'Sie funktioniert nur on-prem'], 1,
                'Moderne Mikrosegmentierung (Illumio, Cisco ACI, NSX, Calico, Cilium) entscheidet anhand Workload-Identity (SPIFFE), Labels und L7-Kontext — nicht nur IP/Port.')
        ],

        // ============== KAPITEL 3 — Engineering (50 Fragen) ==============
        ch3: [
            q('Welcher AEAD-Cipher ist in TLS 1.3 (RFC 8446) MUSS-Pflicht?',
                ['AES-CBC-HMAC', 'AES-GCM oder ChaCha20-Poly1305', 'RC4-MD5', '3DES-EDE'], 1,
                'TLS 1.3 erlaubt nur AEAD-Suites: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256 (+ AES_128_CCM*).'),
            q('Welcher Algorithmus ist NIST-Standard für PQC-Key-Encapsulation (FIPS 203)?',
                ['ECDH P-384', 'ML-KEM (Kyber)', 'RSA-4096', 'X25519'], 1,
                'FIPS 203 (August 2024) standardisierte ML-KEM, basierend auf CRYSTALS-Kyber (Modul-LWE-Problem).'),
            q('Welcher Algorithmus ist NIST-Standard für PQC-Digitalsignaturen (FIPS 204)?',
                ['Ed25519', 'ML-DSA (Dilithium)', 'RSA-PSS', 'ECDSA P-521'], 1,
                'FIPS 204 (2024) standardisierte ML-DSA (CRYSTALS-Dilithium). Zusätzlich FIPS 205: SLH-DSA / SPHINCS+ (Hash-based).'),
            q('Welche Eigenschaft garantiert Perfect Forward Secrecy?',
                ['Servers signieren jedes Paket', 'Ephemere Schlüsselaustausche (ECDHE/DHE)', 'AES-256 ohne Modus', 'Statische pre-shared Keys'], 1,
                'PFS verlangt ephemere Diffie-Hellman-Varianten (ECDHE/DHE). TLS 1.3 erzwingt PFS by design (kein RSA-Key-Exchange mehr).'),
            q('Welcher Hash-Algorithmus wird für reine Passwort-Speicherung empfohlen?',
                ['MD5', 'SHA-1', 'Argon2id', 'CRC32'], 2,
                'Argon2id (Gewinner Password Hashing Competition 2015, RFC 9106) — speicherhart, kombiniert Argon2i + Argon2d, resistent gegen GPU/ASIC-Angriffe.'),
            q('Welche RFC definiert OCSP?',
                ['RFC 5246', 'RFC 6960', 'RFC 8446', 'RFC 5280'], 1,
                'RFC 6960 standardisiert das Online Certificate Status Protocol; löst statisches CRL-Polling für Echtzeit-Validierung ab.'),
            q('Welche FIPS 140-3-Stufe wird typischerweise als Enterprise-HSM-Mindeststandard genannt?',
                ['Level 1', 'Level 2', 'Level 3', 'Level 4'], 2,
                'Level 3: Identity-based Authentication, Tamper-Evidence/Response, definierte physische Sicherheit. Level 4 = höchster, militärisch.'),
            q('Welche Schwachstelle wurde durch CVE-2021-44228 weltweit bekannt?',
                ['Heartbleed', 'Log4Shell', 'Shellshock', 'Spectre v2'], 1,
                'CVE-2021-44228 = Log4Shell in Apache Log4j 2.x; ungesichertes JNDI-Lookup führt zu RCE über LDAP/RMI.'),
            q('Welche Sofortmaßnahme blockiert Log4Shell-Exploits, ohne sofort zu patchen?',
                ['Setzen von log4j.formatMsgNoLookups=true', 'Disable von TCP/443', 'Wechsel auf Java 7', 'Disable IPv6'], 0,
                'log4j.formatMsgNoLookups=true (in Log4j 2.10+) deaktiviert JNDI-Lookups und stoppt den Exploit-Vektor; Patch auf 2.17+ ist die echte Lösung.'),
            q('Welche Krypto-Eigenschaft erreicht die Verbindung von Verschlüsselung und Authentizität in einem Schritt?',
                ['HMAC alone', 'AEAD (Authenticated Encryption with Associated Data)', 'CMAC alone', 'Bcrypt'], 1,
                'AEAD: Confidentiality + Integrity + optional Associated Data. AES-GCM, ChaCha20-Poly1305, AES-CCM, AES-OCB.'),
            q('Welche der folgenden Bibliotheken implementieren Homomorphe Verschlüsselung?',
                ['OpenSSL', 'Microsoft SEAL / OpenFHE', 'BoringSSL', 'mbedTLS'], 1,
                'Microsoft SEAL und OpenFHE sind weit verbreitete HE-Bibliotheken (BFV, BGV, CKKS). OpenSSL/BoringSSL/mbedTLS sind klassische TLS-Stacks.'),
            q('Welche Mitigation gegen Spectre v2 reduziert Branch-Target-Injection auf Linux?',
                ['Retpolines / IBRS / IBPB', 'KPTI', 'AddressSanitizer', 'NX-Bit'], 0,
                'Spectre v2 wird durch Retpolines (Compiler-Fix) und Microcode-Features IBRS/IBPB/STIBP gemildert. KPTI mildert Meltdown.'),
            q('Welcher Standard adressiert Software-Lieferketten-Integrität durch Build-Provenienz?',
                ['SPIFFE', 'SLSA', 'OAuth', 'SCIM'], 1,
                'SLSA (Supply-chain Levels for Software Artifacts, OpenSSF) definiert Reifegrade von Build-Integrität (Level 1–4).'),
            q('Welche STRIDE-Kategorie deckt Identitätsfälschung ab?',
                ['Spoofing', 'Tampering', 'Repudiation', 'Elevation of Privilege'], 0,
                'Spoofing = Identitätsbetrug (gefälschte User/Service). Tampering = Modifikation, Repudiation = Abstreiten, Information Disclosure, DoS, EoP.'),
            q('Welche Methodik adressiert Privacy-Threats systematisch?',
                ['STRIDE', 'PASTA', 'LINDDUN', 'DREAD'], 2,
                'LINDDUN (Linkability, Identifiability, Non-repudiation, Detectability, Disclosure of information, Unawareness, Non-compliance) ist Privacy-fokussiert.'),
            q('Welcher SCM-Hook verhindert versehentlich committierte Geheimnisse vor dem Push?',
                ['post-receive', 'pre-commit mit gitleaks/TruffleHog', 'commit-msg', 'Merge'], 1,
                'pre-commit-Hooks (z. B. via pre-commit-Framework + gitleaks/TruffleHog/detect-secrets) blockieren API-Keys, Tokens, Privatkey-Header.'),
            q('Welche Schwachstellenklasse wird durch parametrisierte Queries (Prepared Statements) eliminiert?',
                ['XSS', 'CSRF', 'SQL-Injection', 'Open Redirect'], 2,
                'Parametrisierte Statements trennen Code und Daten; Eingaben werden niemals als SQL-Code interpretiert. SQLMap & Co. greifen ins Leere.'),
            q('Welche der folgenden Bibliotheken liefert ein modernes, hochabstrahiertes Krypto-API mit safe-defaults?',
                ['libsodium', 'OpenSSL EVP_*', 'PolarSSL', 'cryptlib'], 0,
                'libsodium (NaCl-Fork) bietet idiomatische, missbrauchsresistente Funktionen wie crypto_secretbox(), crypto_box(), Argon2id-Wrapper.'),
            q('Welche Aussage zu RSA-2048 stimmt für 2025/2026?',
                ['Wird laut NIST SP 800-131A r3 ab 2030 als sicher eingestuft', 'Wird ab 2030 für neue Schlüsselgenerierung deprecated', 'Wurde 2024 von Quantum-Computern gebrochen', 'Ist für Code-Signing verboten'], 1,
                'NIST SP 800-131A r3 plant Disallow für RSA-2048-Generierung ab 2030 (für signature-generation und Encryption); Migration auf RSA-3072+ oder ECC.'),
            q('Was ist der Hauptzweck eines TPM 2.0 Attestation Identity Keys (AIK)?',
                ['Datei-Verschlüsselung', 'Beweis der TPM-Authentizität gegenüber Remote-Verifier ohne EK direkt offenzulegen', 'Bootloader-Replacement', 'Smartcard-Emulation'], 1,
                'AIK ist ein TPM-internes Schlüsselpaar zur Attestation; signiert Quote-Strukturen über PCRs für Remote-Attestation.'),
            q('Welche Eigenschaft beschreibt einen Reproducible Build?',
                ['Build kann offline durchgeführt werden', 'Identischer Source + identische Build-Umgebung erzeugen byte-identische Artefakte', 'Build erzeugt automatisch SBOM', 'Build ist deterministisch nur in Java'], 1,
                'Reproducible Builds (reproducible-builds.org) sind unabhängig verifizierbar — jede Diskrepanz signalisiert Manipulation in der Pipeline.'),
            q('Welche Klasse von TLS-Schwachstellen wurde durch BEAST, Lucky 13 und POODLE adressiert?',
                ['RNG-Schwächen', 'Padding-Oracle / Timing-Attacks bei CBC-Mode', 'Symmetric-Key-Größe', 'Implementation Bugs in Schedulern'], 1,
                'BEAST (CVE-2011-3389), Lucky 13 (CVE-2013-0169), POODLE (CVE-2014-3566) zielen alle auf CBC-Padding-Oracles bzw. Timing-Channels.'),
            q('Welche Eigenschaft hat MAC-then-Encrypt vs. Encrypt-then-MAC?',
                ['MAC-then-Encrypt ist sicherer', 'Encrypt-then-MAC ist die kryptografisch empfohlene Reihenfolge (verhindert Padding-Oracles)', 'Beide sind identisch', 'Encrypt-then-MAC ist ineffizienter'], 1,
                'Encrypt-then-MAC + AEAD ist Best Practice (Krawczyk 2001). TLS 1.0–1.2 nutzte MAC-then-Encrypt — eine Quelle vieler Angriffe (BEAST, Lucky 13).'),
            q('Welche der folgenden ist eine spezifische Mitigation gegen Pass-the-Hash-Angriffe in Active Directory?',
                ['Disable IPv6', 'LSASS-Schutz (Credential Guard, RestrictedAdmin, LAPS)', 'WAF-Regeln', 'EDR-Logging allein'], 1,
                'Credential Guard (VBS-isoliertes LSASS), RestrictedAdmin RDP, Local Administrator Password Solution (LAPS) und Tier-0/1/2-Modell sind die etablierten PtH-Mitigations.'),
            q('Welche Schwachstelle ermöglicht das Auslesen von OpenSSL-Heap-Speicher inkl. Privatkey über ein TLS-Heartbeat-Paket?',
                ['Shellshock', 'Heartbleed (CVE-2014-0160)', 'POODLE', 'Logjam'], 1,
                'Heartbleed: fehlende Bounds-Check in tls1_process_heartbeat → bis zu 64 KB Memory-Disclosure pro Anfrage. Mitigation: OpenSSL 1.0.1g, Zertifikatsrotation.'),
            q('Welche Eigenschaft ist KEIN Bestandteil eines Hardware-Security-Module-Designs nach FIPS 140-3?',
                ['Tamper-Evidence', 'Identity-based Authentication (Level 3+)', 'Cloud-Streaming der Schlüssel', 'Logische und physische Sicherheitskontrollen'], 2,
                'Schlüssel verlassen ein FIPS-zertifiziertes HSM nicht im Klartext — kein „Streaming". Operationen geschehen innerhalb des Cryptographic Boundary.'),
            q('Was beschreibt Confidential Computing am genausten?',
                ['Verschlüsselung in Transit', 'Verschlüsselung at Rest', 'Schutz von Daten in Use mittels TEE und Remote-Attestation', 'Backup-Strategie'], 2,
                'Confidential Computing (Confidential Computing Consortium) schützt Data-in-Use durch hardwarebasierte Trusted Execution Environments mit Attestation.'),
            q('Welche Eigenschaft hat Ed25519 gegenüber ECDSA P-256?',
                ['Schnellere Signatur, kein Risiko durch nonce-misuse, deterministisch', 'Kürzere Schlüssel, aber schwächere Sicherheit', 'Funktioniert nur in TLS 1.0', 'Erfordert RSA-Padding'], 0,
                'Ed25519 (RFC 8032): deterministische Signaturen (kein RNG-Risiko wie bei Sony PS3 ECDSA-Disaster), schneller, simpleres API.'),
            q('Welche Klasse von Bibliotheken liefert kryptografische Misuse-resistant APIs?',
                ['Tink (Google)', 'OpenSSL EVP', 'WolfSSL', 'PKCS#11-Wrapper'], 0,
                'Google Tink (jetzt unter Apache-Foundation Tink Crypto Library) bietet abstrahierte Primitiven (AeadAead, MacAead, ...) mit safe defaults und Key-Rotation.'),
            q('Welche Komponente eines CI/CD-Hardenings adressiert Build-Layer-Manipulation à la SolarWinds?',
                ['Reproducible Builds + SBOM + signierte Artefakte (Sigstore/Cosign)', 'Statisches IP-Whitelisting auf Workstations', 'Disable IPv6', 'Cloud-Migration der DBs'], 0,
                'Sigstore/Cosign signieren Container-Images; SBOMs (SPDX/CycloneDX) dokumentieren Komponenten; reproducible Builds verifizieren Integrität.'),
            q('Welche AES-Betriebsart liefert Authenticated Encryption with Associated Data (AEAD)?',
                ['AES-CBC', 'AES-ECB', 'AES-GCM', 'AES-CTR'], 2,
                'AES-GCM kombiniert CTR-Mode mit GHASH-MAC zu AEAD (NIST SP 800-38D). AES-CCM (SP 800-38C) ist die zweite NIST-AEAD-Variante.'),
            q('Welche Schwäche hat AES-ECB im Vergleich zu CBC/GCM?',
                ['Zu langsam', 'Identische Klartextblöcke ergeben identische Chiffretextblöcke (Mustererhalt)', 'Erfordert RSA-Key', 'Funktioniert nur mit IV=0'], 1,
                'ECB-Mode codiert jeden Block unabhängig — Mustererhalt (vgl. „ECB-Pinguin"). NIST SP 800-38A erlaubt ECB praktisch nicht für sensible Daten.'),
            q('Welche Aussage zu Argon2id (RFC 9106) ist korrekt?',
                ['Schneller als SHA-256, daher gut für Passwörter', 'Memory-hard, time-hard, GPU/ASIC-resistent — empfohlen für Passwort-Hashing', 'Symmetrische Verschlüsselung', 'Nur für JWT-Signaturen'], 1,
                'Argon2id ist RFC 9106 (2021) Standard für Password Hashing — kombiniert Argon2i (Side-Channel-Resistenz) und Argon2d (GPU-Resistenz).'),
            q('Welche Eigenschaft hat HKDF (RFC 5869)?',
                ['Verschlüsselung großer Daten', 'Extract-then-Expand Key Derivation aus IKM und Salt', 'RSA-Signatur', 'AES-Modus'], 1,
                'HKDF: HKDF-Extract → starkes pseudozufälliges Keymaterial; HKDF-Expand → variable Output-Länge. In TLS 1.3, Signal, Noise eingesetzt.'),
            q('Welche Eigenschaft beschreibt Forward Secrecy korrekt?',
                ['Alle Sessions teilen einen langfristigen Schlüssel', 'Kompromittierung des langfristigen Schlüssels gefährdet keine archivierten Session-Schlüssel', 'Nur RSA-Static erlaubt FS', 'FS ist nur bei symmetrischer Krypto möglich'], 1,
                'PFS basiert auf ephemeralen DH/ECDH-Schlüsseln (DHE/ECDHE). Server-Privatkey-Leak kompromittiert keine Vergangenheits-Sessions.'),
            q('Welche Variante von ECDSA hat ein historisches Nonce-Reuse-Risiko (Sony PS3 2010)?',
                ['Ed25519', 'Klassisches ECDSA mit nicht-deterministischem k', 'EdDSA-Ed448', 'RSA-PSS'], 1,
                'ECDSA verlangt einen frisch zufälligen k pro Signatur; Reuse erlaubt Privatkey-Recovery. RFC 6979 (deterministisches k) und Ed25519 lösen dies.'),
            q('Welche Hash-Familie ist FIPS-180-4 sowie SHA-3-Standard parallel?',
                ['SHA-2 + SHA-3', 'MD5 + SHA-1', 'RIPEMD-160 + Whirlpool', 'BLAKE2 + Skein'], 0,
                'NIST hält SHA-2 (FIPS 180-4) und SHA-3 (FIPS 202, Keccak) parallel. SHA-3 ist algorithmisch fundamental anders (Sponge), kein Drop-in-Ersatz nötig.'),
            q('Welche TLS-Erweiterung verhindert Privacy-Leak bei OCSP-Server-Abfragen?',
                ['SNI', 'OCSP Stapling (status_request)', 'ALPN', 'ESNI'], 1,
                'OCSP-Stapling lässt den Server selbst den OCSP-Response anhängen — Client muss nicht mehr direkt mit der CA kommunizieren.'),
            q('Welche Schwäche von TLS 1.0/1.1 führte zur Deprecation in RFC 8996 (2021)?',
                ['Fehlende AEAD-Cipher und schwache MACs (CBC-MAC-Konstruktionen, Padding-Oracles)', 'Zu langer Handshake', 'Fehlende SNI', 'Kein UDP-Support'], 0,
                'BEAST (CBC), POODLE (SSL 3.0/TLS 1.0 Padding), Lucky13 — RFC 8996 verbietet TLS 1.0/1.1 endgültig.'),
            q('Welche Eigenschaft macht ChaCha20-Poly1305 für mobile Endgeräte attraktiv?',
                ['Hardware-Beschleunigung in jedem Smartphone', 'Hohe Software-Performance ohne dediziertes AES-NI', 'Symmetrisch und gleichzeitig asymmetrisch', 'Keine Authentication'], 1,
                'ChaCha20-Poly1305 (RFC 8439) ist konstantzeit, schnell in reiner Software, ideal auf ARM ohne AES-NI/Crypto-Extensions.'),
            q('Welcher Zertifikats-Profil-Standard wird in TLS-PKIs verwendet?',
                ['X.509 v3 (RFC 5280)', 'PGP', 'GnuPG-WoT', 'OpenSSH-CA'], 0,
                'X.509 v3 mit Extensions wie KeyUsage, ExtendedKeyUsage, SubjectAltName ist Standard für TLS — vereinheitlicht durch RFC 5280 und CA/Browser Forum BR.'),
            q('Welche Komponente eines HSM erfüllt FIPS 140-3 Level 3?',
                ['Identity-based Operator Auth, Tamper-Evidence + Tamper-Response', 'Software-Only-Crypto', 'Browser-basierte Verwaltung', 'Cloud-Sync ohne Auth'], 0,
                'FIPS 140-3 Level 3 verlangt Identity-based Auth, Tamper-Evidence und aktive Tamper-Response (z. B. Schlüssel-Zeroization).'),
            q('Welche Operation in PKCS#11 lädt einen Schlüssel in eine Session?',
                ['C_OpenSession', 'C_FindObjects + C_GetAttributeValue', 'C_Login', 'C_Logout'], 1,
                'PKCS#11-Standard: nach C_OpenSession + C_Login wird mit C_FindObjects der Key-Handle gefunden, ohne den Schlüssel selbst aus dem HSM zu exfiltrieren.'),
            q('Welche Eigenschaft hat Sigstore (Cosign / Fulcio / Rekor)?',
                ['Statische SBOM-Datei', 'Keyless Signing mit kurzlebigen X.509-Zertifikaten via OIDC + transparenter Append-only Log', 'GPG-Web-of-Trust', 'PGP-Replikation'], 1,
                'Sigstore: Cosign als CLI, Fulcio als CA mit OIDC-Auth (z. B. GitHub), Rekor als transparenter Audit-Log — jeder Build ist nachprüfbar.'),
            q('Welche Methode adressiert „Threat Modeling" mit Fokus auf Privacy?',
                ['STRIDE', 'LINDDUN', 'PASTA', 'TARA'], 1,
                'LINDDUN (KU Leuven): Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance.'),
            q('Welcher Side-Channel-Typ basiert auf gemessenen Cache-Zugriffszeiten?',
                ['Power-Analyse', 'EM-Emission', 'Timing/Cache-Side-Channel (FLUSH+RELOAD, PRIME+PROBE)', 'Akustische Analyse'], 2,
                'FLUSH+RELOAD und PRIME+PROBE inferieren Speicherzugriffsmuster anderer Prozesse — Basis von Spectre, Meltdown, RSA-CRT-Leaks.'),
            q('Welche Eigenschaft hat Constant-Time-Krypto-Code?',
                ['Schneller als variabler Code', 'Ausführungszeit ist datenunabhängig — verhindert Timing-Side-Channels', 'Benötigt mehr Speicher', 'Funktioniert nur auf ARM'], 1,
                'Constant-Time-Pfade (z. B. mempick / x25519 / curve25519-donna) verhindern, dass Schlüssel über Timing-Variationen leaken.'),
            q('Welche Komponente einer DevSecOps-Pipeline blockiert PRs bei kritischen CVEs in Abhängigkeiten?',
                ['Container-Registry', 'SCA mit Policy-as-Code (z. B. OPA/Conftest, Snyk Policies)', 'Reverse Proxy', 'Helm-Templates'], 1,
                'SCA (Software Composition Analysis) mit Pipeline-Gating — z. B. Snyk, Dependabot, Renovate, Trivy + OPA Conftest.'),
            q('Welche Eigenschaft beschreibt SLSA-Level-3 (Supply-chain Levels for Software Artifacts)?',
                ['Lokaler Build ohne Provenienz', 'Gehärteter Build-Service mit nicht-fälschbarer Build-Provenienz und isolierten Builds', 'Crypto-Random-Build', 'Reine Cloud-Build ohne Authentifizierung'], 1,
                'SLSA L3: gehärteter Build, nicht-fälschbare Provenance (z. B. via Sigstore + in-toto), isoliert, aber noch keine zwei-Personen-Reviews wie L4.')
        ],

        // ============== KAPITEL 4 — Operations (50 Fragen) ==============
        ch4: [
            q('Welcher NIST-Lifecycle-Schritt folgt unmittelbar auf Detection & Analysis?',
                ['Recovery', 'Containment, Eradication & Recovery', 'Post-Incident Activity', 'Preparation'], 1,
                'NIST SP 800-61 r2: Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity.'),
            q('Welche Beweis-Ressource hat nach RFC 3227 die höchste Volatilität?',
                ['Backup-Medien', 'Festplatten', 'CPU-Register und Cache', 'externe Logs'], 2,
                'Order of Volatility: CPU-Register/Cache → RAM → Network State → laufende Prozesse → Disk → Backup-Medien.'),
            q('Welcher Befehl ist ein klassischer Ransomware-Indikator auf Windows?',
                ['ipconfig /flushdns', 'vssadmin delete shadows /all /quiet', 'netstat -an', 'systeminfo'], 1,
                'vssadmin delete shadows verhindert lokale Schattenkopien-Wiederherstellung — Standardvorgehen aller modernen Ransomware (WannaCry, Ryuk, Conti, LockBit).'),
            q('Welcher Befehl identifiziert offene Sockets unter Linux am detailliertesten?',
                ['ifconfig', 'ss -ltunp', 'ping', 'route'], 1,
                'ss (Iproute2) ist Nachfolger von netstat; -l listening, -t TCP, -u UDP, -n numerisch, -p Prozess.'),
            q('Welche Pyramid-of-Pain-Stufe ist für Verteidiger am wertvollsten?',
                ['File-Hashes', 'IPs', 'Domains', 'TTPs (Tactics, Techniques, Procedures)'], 3,
                'TTPs sind für Angreifer am schwersten zu ändern — Detektion auf TTP-Ebene ist nachhaltigste Verteidigung (David Bianco 2013).'),
            q('Welche der folgenden ist eine MITRE ATT&CK-Tactic, KEINE Technique?',
                ['Spearphishing Attachment', 'Initial Access', 'Pass the Hash', 'OS Credential Dumping'], 1,
                'Initial Access ist eine Tactic (Spalte). Spearphishing Attachment, Pass the Hash, OS Credential Dumping sind Techniques/Sub-Techniques.'),
            q('Welche Standard-Codierungssprache für SIEM-agnostische Detection-Regeln?',
                ['YARA', 'Sigma', 'Suricata-Rules', 'Snort-Rules'], 1,
                'Sigma ist vendor-neutral und wird per Converter (sigmac/pySigma) auf Splunk SPL, KQL, Elastic, Sentinel, Chronicle gemappt.'),
            q('Welcher Standard liefert Angriffs-Indikatoren in JSON-strukturierter Form (Threat Intel)?',
                ['STIX 2.1', 'TAXII 2.1', 'OpenIOC', 'CybOX'], 0,
                'STIX 2.1 (Structured Threat Information eXpression) ist die Datenstruktur; TAXII 2.1 ist das Transportprotokoll.'),
            q('Welche Forensik-Suite analysiert Memory-Dumps multi-OS-fähig?',
                ['Wireshark', 'Volatility 3', 'EnCase Imager', 'Autopsy'], 1,
                'Volatility 3 — De-facto-Standard für RAM-Forensik; analysiert Windows/Linux/macOS-Dumps via Plugins (pslist, malfind, netscan, ...).'),
            q('Welche Backup-Regel beinhaltet immutable und offline gehaltene Kopien?',
                ['3-2-1', '3-2-1-1-0', 'RAID 5', 'Hot/Cold-Site'], 1,
                '3-2-1-1-0: 3 Kopien, 2 Medientypen, 1 offsite, 1 immutable/offline, 0 Fehler beim Restore-Test (Veeam-Erweiterung der klassischen Regel).'),
            q('Welche EDR-Funktion isoliert einen Host Netzwerk-seitig ohne ihn herunterzufahren?',
                ['Network Containment', 'Disk Quarantine', 'Memory Wipe', 'Windows Defender SmartScreen'], 0,
                'Network Containment / Network Isolation ist Standard-Feature in CrowdStrike Falcon, Defender for Endpoint, SentinelOne.'),
            q('Welche Datei ist primäre Quelle für USB-Geräte-Forensik unter Windows?',
                ['SAM', 'NTUSER.DAT', 'SYSTEM-Hive (USBSTOR-Schlüssel)', 'Prefetch'], 2,
                'HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR speichert Vendor, Produkt, Seriennummer, Anschlusszeitpunkte aller USB-Massenspeicher.'),
            q('Welche Aussage zu Cloud-Logs trifft am genausten zu?',
                ['AWS CloudTrail loggt nur API-Calls, nicht Service-Logs', 'AWS CloudTrail erfasst sämtliche AWS-API-Aufrufe (Management + ggf. Data Events)', 'CloudTrail ist standardmäßig deaktiviert für Management Events', 'CloudTrail-Logs werden lokal auf EC2 gespeichert'], 1,
                'CloudTrail erfasst Management Events standardmäßig in jeder Region; Data Events (S3-Object-Level, Lambda-Invocations) müssen explizit aktiviert werden.'),
            q('Welche Maßnahme verkürzt MTTR im SOC am effektivsten?',
                ['Mehr Mitarbeiter ohne Playbooks einstellen', 'Automatisierte SOAR-Playbooks für Standardvorfälle', 'Manuelle Excel-Trackings', 'Wöchentliche All-Hands-Meetings'], 1,
                'SOAR-Playbooks reduzieren Analyst-Toil bei wiederholbaren Tasks (Phishing-Triagierung, IoC-Enrichment, Quarantine-Host) drastisch.'),
            q('Was ist NotPetya (2017) primär klassifiziert?',
                ['Ransomware', 'Wiper-Malware (gefakte Ransomware)', 'Spyware', 'Adware'], 1,
                'NotPetya war ein Wiper, getarnt als Ransomware — der Salsa20-Schlüssel wurde nicht persistiert, Recovery war unmöglich. Initialvektor: M.E.Doc-Update (Ukraine).'),
            q('Welcher Initialvektor verbreitete WannaCry (Mai 2017)?',
                ['EternalBlue (SMBv1, MS17-010)', 'EternalRomance (Office)', 'Heartbleed', 'Log4Shell'], 0,
                'WannaCry nutzte den NSA-Leak EternalBlue (CVE-2017-0144, SMBv1 Buffer Overflow) zur Wurm-Verbreitung. Patch MS17-010 lag bereits 2 Monate vor.'),
            q('Welcher Begriff beschreibt Daten-Exfiltration als zweite Druckschiene moderner Ransomware?',
                ['Single Extortion', 'Double Extortion', 'Triple Extortion', 'Quadruple Extortion'], 1,
                'Double Extortion: Verschlüsselung + Veröffentlichungsdrohung. Triple Extortion ergänzt DDoS oder direktes Kunden-Kontaktieren.'),
            q('Welche Verbindung beobachtet ein Analyst typischerweise bei DNS-Tunneling?',
                ['Große ICMP-Pakete', 'Periodische, kleine DNS-TXT-Anfragen mit Base64-Strings', 'IRC auf Port 6667', 'TFTP auf Port 69'], 1,
                'DNS-Tunneling kodiert Daten in TXT/CNAME-Records, da DNS-Egress fast immer erlaubt ist und selten tief inspiziert wird (Iodine, dnscat2 als Tools).'),
            q('Welcher Open-Source-Stack liefert komplette SIEM-Funktionen?',
                ['Suricata + Wireshark', 'Elastic Stack (Elastic Security) oder Wazuh', 'Mimikatz + Cobalt Strike', 'Apache Tomcat'], 1,
                'Elastic Security (ehem. Elastic SIEM/EDR) und Wazuh sind etablierte Open-Source-SIEM-Plattformen mit Detection-Rules, ML, Case-Management.'),
            q('Welcher Befehl erzeugt ein forensisches Disk-Image mit Hash-Verifikation auf Linux?',
                ['cp', 'dd if=/dev/sda of=/mnt/case01.img conv=noerror,sync; gefolgt von sha256sum', 'rsync', 'mv'], 1,
                'dd (oder dcfldd / ewfacquire / FTK Imager) plus dual-Hash (MD5+SHA-256) ist Standard. dcfldd kann Hash on-the-fly berechnen.'),
            q('Welche Active-Directory-Forensik-Quelle dokumentiert Anmeldeaktivitäten?',
                ['Security-Event-Log (Event ID 4624 Successful Logon, 4625 Failed)', 'Application-Log', 'System-Log', 'Forwarded Events'], 0,
                'Event ID 4624 (Successful Logon, mit Logon-Type), 4625 (Failed) sind das Rückgrat der AD-Forensik (zusammen mit 4768/4769/4776 für Kerberos/NTLM).'),
            q('Welcher Logon-Type signalisiert Pass-the-Hash über NTLM remote?',
                ['Type 2 (Interactive)', 'Type 3 (Network)', 'Type 10 (RemoteInteractive)', 'Type 11 (CachedInteractive)'], 1,
                'Logon-Type 3 = Network. Pass-the-Hash erfolgt via NTLM-Auth zu remoten Diensten (SMB, WMI). Korreliert mit fehlendem korrespondierenden interaktiven Logon.'),
            q('Welche Aussage zu Kerberos Golden Ticket ist korrekt?',
                ['Erfordert Kompromittierung des KRBTGT-Kontoschlüssels in der Domäne', 'Wird durch ein einfaches Passwort-Reset aufgehoben', 'Ist kein TGT-Forging', 'Gilt nur 10 Minuten'], 0,
                'Golden Ticket = mit KRBTGT-Hash forged TGT, beliebig lang gültig. Mitigation: doppelter KRBTGT-Reset (zwei Resets im Abstand der TGT-Lifetime).'),
            q('Welcher Begriff bezeichnet Angreifer, die persistent verdeckt operieren und meist staatlich unterstützt sind?',
                ['Script-Kiddie', 'Hacktivist', 'APT (Advanced Persistent Threat)', 'Insider'], 2,
                'APT-Gruppen (z. B. APT28/Fancy Bear, APT29/Cozy Bear, Lazarus, APT41) — langfristige, ressourcenstarke, oft nation-state-gestützte Operationen.'),
            q('Welcher Frame ist Standard-Werkzeug für Adversary-Emulation und Post-Exploitation?',
                ['nmap', 'Wireshark', 'Cobalt Strike / Sliver / Mythic', 'Putty'], 2,
                'Cobalt Strike (kommerziell), Sliver, Mythic, Brute Ratel — C2-Frameworks für Red-Team-Übungen und leider auch für Angreifer.'),
            q('Welche Einheit ist NIST SP 800-61-konformer „Containment"-Schritt vor Eradication?',
                ['Sofortiger Reboot', 'Logische Netzwerk-Isolation des kompromittierten Hosts', 'Patches einspielen', 'Backup-Restore'], 1,
                'Containment kommt vor Eradication. Reboot zerstört RAM-Beweise. Patch / Restore gehören in spätere Phasen.'),
            q('Welcher Cloud-Service erfasst Ressourcen-Konfigurationsänderungen (Drift Detection) in AWS?',
                ['AWS CloudWatch', 'AWS Config', 'AWS GuardDuty', 'AWS WAF'], 1,
                'AWS Config zeichnet Konfigurations-Snapshots auf, ermöglicht Compliance-Rules und Detect von Drift gegenüber Baselines.'),
            q('Welche Aussage zu UEBA stimmt am besten?',
                ['UEBA ersetzt SIEM vollständig', 'UEBA ergänzt SIEM um ML-basierte Anomalieerkennung in Benutzer- und Entitätsverhalten', 'UEBA ist ein Backup-Tool', 'UEBA ist ein Patchmanagement-System'], 1,
                'UEBA modelliert Baselines (Logon-Zeit, Geo, Datenzugriff) und identifiziert Abweichungen — komplementär zum signaturbasierten SIEM.'),
            q('Welche Datei in Windows enthält Programmausführungsspuren (auch nach Löschung der Binary)?',
                ['Pagefile.sys', 'Amcache.hve / ShimCache (AppCompatCache)', 'NTUSER.DAT', 'BOOTMGR'], 1,
                'Amcache.hve (Win 8+) und ShimCache sind zentrale Persistenz-Artefakte für Programmausführung — selbst bei deinstallierter Binary auswertbar.'),
            q('Welcher Standard adressiert speziell Cloud-Forensik-Herausforderungen?',
                ['NIST SP 800-53', 'NIST SP 800-86', 'NIST IR 8006 / Cloud Forensics Reference Architecture', 'PCI-DSS'], 2,
                'NIST IR 8006 sowie der Cloud Security Alliance Cloud Forensics Capability Maturity Model adressieren multi-tenant, ephemeral, jurisdictional Forensik-Probleme.'),
            q('Welche Phase im NIST-IR-Lifecycle dokumentiert Lessons Learned und Prozessverbesserungen?',
                ['Preparation', 'Detection & Analysis', 'Containment', 'Post-Incident Activity'], 3,
                'NIST SP 800-61 r2: Post-Incident Activity inkl. Lessons-Learned-Meeting, Erweiterung von Playbooks, ggf. KPI-Anpassungen.'),
            q('Welcher MITRE-ATT&CK-Tactic-Code beschreibt „Initial Access"?',
                ['TA0001', 'TA0005', 'TA0010', 'TA0040'], 0,
                'MITRE ATT&CK Enterprise-Matrix: TA0001 Initial Access. TA0005 Defense Evasion, TA0010 Exfiltration, TA0040 Impact.'),
            q('Welche ATT&CK-Technique-ID adressiert „Phishing: Spearphishing Attachment"?',
                ['T1059', 'T1566.001', 'T1110', 'T1486'], 1,
                'T1566.001 = Phishing/Spearphishing Attachment. T1059 Command Scripting, T1110 Brute Force, T1486 Data Encrypted for Impact (Ransomware).'),
            q('Welche Technik beschreibt „Pass-the-Hash" auf Windows?',
                ['T1003', 'T1550.002 (Use Alternate Authentication Material: Pass the Hash)', 'T1486', 'T1059'], 1,
                'T1550.002. Erfordert NTLM-Hash; mitigiert durch Credential Guard, KB2871997, Tier-Modell, LAPS.'),
            q('Welche Eigenschaft hat ein SOAR-System gegenüber reinem SIEM?',
                ['Reine Suchfunktion', 'Orchestrierung + Automatisierung von Response-Playbooks (Block IP, Disable Account, Quarantine Host)', 'Nur Reporting', 'Backup-Funktion'], 1,
                'SOAR (Security Orchestration, Automation and Response) automatisiert Playbooks — typisch z. B. Splunk SOAR, Cortex XSOAR, Tines, Torq.'),
            q('Welche Eigenschaft hat ein EDR (Endpoint Detection & Response)?',
                ['Signaturbasierte AV-Erkennung allein', 'Telemetrie-Sammlung + Verhaltensanalyse + Response-Funktionen auf Endpunkt-Ebene', 'IDS-Sensor im Netz', 'Reine Hardware-Firewall'], 1,
                'EDR (z. B. CrowdStrike Falcon, MS Defender, SentinelOne) sammelt Prozess-/File-/Network-Telemetrie und erlaubt Containment (Isolate Host).'),
            q('Welcher CVSS-v3.1-Schweregrad gilt für Score 9.0–10.0?',
                ['Low', 'Medium', 'High', 'Critical'], 3,
                'CVSS v3.1: 0.0 None, 0.1–3.9 Low, 4.0–6.9 Medium, 7.0–8.9 High, 9.0–10.0 Critical.'),
            q('Welche CVSS-Metrik beschreibt, ob ein Angriff aus dem Internet ausführbar ist?',
                ['AV (Attack Vector)', 'AC (Attack Complexity)', 'PR (Privileges Required)', 'UI (User Interaction)'], 0,
                'AV:N (Network) = remote über das Internet; AV:A (Adjacent), AV:L (Local), AV:P (Physical).'),
            q('Welche Liste pflegt CISA für aktiv ausgenutzte Schwachstellen?',
                ['NVD', 'KEV (Known Exploited Vulnerabilities) Catalog', 'EPSS', 'CWE'], 1,
                'CISA KEV listet aktiv ausgenutzte CVEs mit Patch-Deadlines für Bundesbehörden (BOD 22-01) — auch für Privatwirtschaft als Priorisierungs-Anker.'),
            q('Welche Datenschutzverletzung der Pflicht zur Aufrechterhaltung von Logs verstößt typischerweise gegen DSGVO Art. 32?',
                ['Logs ohne Aufbewahrungsfrist auf Public Buckets', 'TLS-Logs lokal gespeichert', 'Verschlüsselte Audit-Logs in HSM', 'WORM-Backups offline'], 0,
                'Public Buckets ohne Aufbewahrungslimit verstoßen gegen Art. 32 (Stand der Technik) und Art. 5 (Speicherbegrenzung).'),
            q('Welche Eigenschaft hat ein Honeypot?',
                ['Produktivsystem mit echten Daten', 'Kontrolliert exponierte Falle ohne legitimen Geschäftsverkehr — jeder Zugriff ist verdächtig', 'Backup-System', 'CDN-Edge-Knoten'], 1,
                'Honeypots (z. B. T-Pot, Cowrie, OpenCanary) erzeugen lautlose Hochsignal-Detection: kein legitimer Traffic = jeder Connect ist Indikator.'),
            q('Welche Methode reduziert Alarm-Müdigkeit (Alert Fatigue) in einem SOC am wirksamsten?',
                ['Mehr Alarme aktivieren', 'Risikobasierte Tuning, Use-Case-Pflege, automatische Triage über SOAR', 'Logs verwerfen', 'Alarme deaktivieren'], 1,
                'Tuning + Use-Case-Lifecycle + SOAR-Automation reduzieren False-Positives. Use-Cases sollten messbare KPIs haben (TP-Rate, MTTR).'),
            q('Welcher Backup-Standard schützt am robustesten gegen Ransomware?',
                ['Online-Backup im selben AD-Domain', '3-2-1-1-0-Regel mit air-gapped/immutable Copy', 'Tagesendspeicherung lokal', 'Snapshot allein'], 1,
                '3-2-1-1-0: 3 Kopien, 2 Medien, 1 offsite, 1 air-gapped/immutable, 0 Errors im Restore-Test. Immutability via Object-Lock/WORM oder Tape-Vault.'),
            q('Welche Phase eines BIA bestimmt zulässige Datenverlustfenster?',
                ['MTD', 'RTO', 'RPO', 'MAO'], 2,
                'RPO (Recovery Point Objective) = maximaler Datenverlust in Zeiteinheit. RTO = Wiederanlaufzeit. MTD = Maximum Tolerable Downtime.'),
            q('Welche Eigenschaft hat eine Tabletop-Exercise (TTX)?',
                ['Live-Cyberangriff', 'Diskussionsbasierte Übung an Hand eines Szenarios — keine technische Disruption', 'Reines Penetration Testing', 'Hardware-Failover-Test'], 1,
                'TTX trainiert Entscheidungswege, Eskalationsketten und Kommunikation — typischerweise 2–4h, ohne Produktionsimpact.'),
            q('Welcher Indikator unterscheidet IoCs von TTPs (nach Pyramid of Pain)?',
                ['IoCs sind teurer für Angreifer als TTPs', 'TTPs (Tactics/Techniques/Procedures) sind für Angreifer am teuersten zu ändern, IoCs (Hashes/IPs) am billigsten', 'Beide sind identisch', 'Nur TTPs sind in SIEM detektierbar'], 1,
                'David Bianco Pyramid of Pain: Hash → IP → Domain → Network/Host Artifact → Tools → TTPs (oben am teuersten zu ändern).'),
            q('Welche Eigenschaft hat eine Threat-Hunting-Hypothese?',
                ['Sie ist signaturbasiert', 'Sie ist eine testbare Annahme über Angreifer-Verhalten in der eigenen Telemetrie', 'Sie ersetzt SIEM-Suchen', 'Sie ist nur am SOC-Manager-Dashboard verfügbar'], 1,
                'Hypothesengetriebenes Threat Hunting (z. B. Sqrrl/Splunk PEAK Framework) formuliert ATT&CK-basierte Hypothesen, validiert sie an Telemetrie.'),
            q('Welche Maßnahme entspricht „Containment" eines Ransomware-Vorfalls auf einem Server?',
                ['Vollständige Datenwiederherstellung', 'Netzwerk-Isolation (Quarantine), Account-Deaktivierung, Snapshots ziehen', 'Patch installieren', 'AV-Signatur aktualisieren'], 1,
                'Containment fokussiert auf Schadensbegrenzung: Host isolieren, Privileg-Konten sperren, forensische Snapshots vor Wiederherstellung sichern.'),
            q('Welcher Log-Aufbewahrungs-Standard ist Mindestempfehlung in PCI-DSS v4.0 für Audit-Trails?',
                ['30 Tage', '6 Monate', '1 Jahr (mind. 3 Monate sofort verfügbar)', '5 Jahre online'], 2,
                'PCI-DSS v4.0 Req. 10.5.1: mindestens 1 Jahr Audit-Trails, davon mindestens 3 Monate sofort verfügbar ("immediately available").')
        ]
    };

    // Aufbau der Schulung
    window.SCHULUNGEN.list.push({
        id: 'securityx',
        code: 'CAS-005',
        name: 'CompTIA SecurityX (CASP+)',
        short: 'SecurityX',
        desc: 'Expert-Level Cybersecurity: Architektur, Engineering, Operations, GRC. Vollständig ausgearbeitete Schulung — gemäß den offiziellen CAS-005 Exam Objectives, NIST SPs und MITRE ATT&CK.',
        chapters: [
            {
                id: 'grc',
                title: 'Kapitel 1 — Governance, Risk & Compliance (20 %)',
                summary: 'Strategische Steuerung, Frameworks (ISO 27001:2022, NIST CSF 2.0, RMF, COBIT, ISO 31000), Risikoquantifizierung, Datenschutzregulierung (DSGVO, NIS2, DORA, EU AI Act, PCI-DSS v4), Third-Party Risk Management.',
                pages: CURRICULUM.ch1_pages,
                quiz: QUIZZES.ch1
            },
            {
                id: 'architecture',
                title: 'Kapitel 2 — Security Architecture (27 %)',
                summary: 'Zero Trust (NIST SP 800-207), SASE/SSE/ZTNA, Cloud-Sicherheit (CASB/CSPM/CWPP/CNAPP), formale Modelle (Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash), ICS/SCADA (IEC 62443, Purdue-Modell, Stuxnet-Lessons).',
                pages: CURRICULUM.ch2_pages,
                quiz: QUIZZES.ch2
            },
            {
                id: 'engineering',
                title: 'Kapitel 3 — Security Engineering (31 %)',
                summary: 'Moderne Kryptografie (TLS 1.3, AEAD, ECDHE, PQC: ML-KEM/ML-DSA/SLH-DSA), PKI (CRL/OCSP/CT), Secure SDLC (SAST/DAST/IAST/SCA), SLSA, STRIDE/LINDDUN, Hardware-Sicherheit (TPM 2.0, TEE), Side-Channel-Mitigation.',
                pages: CURRICULUM.ch3_pages,
                quiz: QUIZZES.ch3
            },
            {
                id: 'operations',
                title: 'Kapitel 4 — Security Operations (22 %)',
                summary: 'SOC/SIEM/SOAR/UEBA, Detection-Engineering mit MITRE ATT&CK + Sigma, NIST SP 800-61 r2 IR-Lifecycle, Order of Volatility (RFC 3227), Threat Hunting, Forensik (Volatility 3, Windows-Artefakte), 3-2-1-1-0 BCDR.',
                pages: CURRICULUM.ch4_pages,
                quiz: QUIZZES.ch4
            }
        ]
    });
})();
