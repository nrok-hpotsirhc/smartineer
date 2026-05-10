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
                pages: [
                    placeholderPage('Symmetrische Kryptographie und Block-Modi', [
                        'AES-128/192/256 — Aufbau, Substitutionsboxen, MixColumns',
                        'Block-Modi: ECB, CBC, CTR, GCM, XTS und ihre Sicherheitsannahmen',
                        'Authenticated Encryption (AEAD) — GCM, ChaCha20-Poly1305',
                        'Padding-Oracle-Angriffe, Reuse-Risiken bei Nonces'
                    ]),
                    placeholderPage('Asymmetrische Verfahren und Post-Quantum', [
                        'RSA: Schluesselgenerierung, OAEP-Padding, Sicherheitsparameter',
                        'ECC: NIST-P-Kurven, Curve25519, Ed25519',
                        'Diffie-Hellman, ECDH und Forward Secrecy',
                        'NIST PQC (FIPS 203 ML-KEM, 204 ML-DSA, 205 SLH-DSA, 2024) — Hybrid-Schemen'
                    ]),
                    placeholderPage('Hashes, MACs, Signaturen', [
                        'SHA-2, SHA-3, BLAKE2/3 — Konstruktion und Anwendungen',
                        'HMAC vs. KMAC, Konstruktionssicherheit',
                        'Signaturen: ECDSA, Ed25519, ML-DSA',
                        'Anti-Patterns: MD5, SHA-1, RSA-PKCS#1 v1.5'
                    ]),
                    placeholderPage('Schluesselmanagement und PKI', [
                        'X.509-Zertifikate, CA-Hierarchien, OCSP/CRL',
                        'KMS, HSM-Architekturen (FIPS 140-3, Common Criteria)',
                        'Schluesselableitung: HKDF, scrypt, Argon2',
                        'Lifecycle: Generation, Distribution, Rotation, Revocation, Destruction'
                    ])
                ],
                quiz: placeholderQuiz('Angewandte Kryptographie')
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
