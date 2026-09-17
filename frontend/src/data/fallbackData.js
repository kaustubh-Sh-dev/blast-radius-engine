// DETERMINISTIC DEMO FALLBACK DATA
// This is a pure static fixture generated directly from the backend deterministic ecosystem.
// Zero recalculation or scoring in JS — purely static fallback for hackathon resilience.

export const fallbackData = {
  "graph": {
    "ecosystem": "Enterprise Cloud Commerce Ecosystem (Deterministic Curated Dataset)",
    "version": "1.0.0",
    "nodes": [
      {
        "id": "payment-gateway",
        "name": "Payment Gateway Service",
        "version": "3.2.0",
        "type": "application",
        "tier": "production",
        "description": "Core PCI-DSS compliant credit card and payment processing microservice",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      {
        "id": "user-portal",
        "name": "Customer Web Portal",
        "version": "4.1.0",
        "type": "application",
        "tier": "production",
        "description": "Public customer account authentication, profile and order management dashboard",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      {
        "id": "inventory-api",
        "name": "Inventory & Order API",
        "version": "2.9.1",
        "type": "application",
        "tier": "production",
        "description": "High-throughput warehouse catalog and real-time inventory reservation API",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      {
        "id": "legacy-report-generator",
        "name": "Legacy Fiscal Report Tool",
        "version": "1.0.4",
        "type": "application",
        "tier": "internal",
        "description": "Isolated offline batch script for quarterly archived XML ledger generation",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      {
        "id": "session-crypt-helper",
        "name": "session-crypt-helper (Package B)",
        "version": "2.1.0",
        "type": "package",
        "tier": null,
        "description": "Session encryption and token state persistence utility",
        "vulnerability": {
          "cveId": "SIM-VULN-SESSION-001",
          "cvssScore": 5.3,
          "cvssSeverity": "MEDIUM",
          "summary": "Insecure pseudo-random seed in token generation allowing predictable session fixation and replay attacks"
        },
        "structuralMetrics": {
          "downstreamReach": 6,
          "downstreamReachRatio": 0.4,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 1,
          "affectedApplicationsCount": 3,
          "affectedApplicationsRatio": 0.75,
          "bottleneckScore": 0.0286,
          "structuralScore": 47.7
        }
      },
      {
        "id": "xml-entity-parser",
        "name": "xml-entity-parser (Package A)",
        "version": "0.9.4",
        "type": "package",
        "tier": null,
        "description": "Legacy XML parsing and schema evaluation library",
        "vulnerability": {
          "cveId": "SIM-VULN-XML-001",
          "cvssScore": 9.8,
          "cvssSeverity": "CRITICAL",
          "summary": "Remote Code Execution via unauthenticated XML External Entity (XXE) deserialization and prototype injection"
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0,
          "structuralScore": 15.3
        }
      },
      {
        "id": "auth-core",
        "name": "auth-core",
        "version": "3.4.0",
        "type": "package",
        "tier": null,
        "description": "Central identity abstraction, claims verification and session policy enforcement",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 3,
          "downstreamReachRatio": 0.2,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0238,
          "structuralScore": 29.4
        }
      },
      {
        "id": "oauth-adapter",
        "name": "oauth-adapter",
        "version": "1.8.2",
        "type": "package",
        "tier": null,
        "description": "Federated OpenID Connect and OAuth2 client grant handler",
        "vulnerability": {
          "cveId": "SIM-VULN-OAUTH-001",
          "cvssScore": 3.1,
          "cvssSeverity": "LOW",
          "summary": "Permissive redirect URI wildcard validation during local debug mode"
        },
        "structuralMetrics": {
          "downstreamReach": 1,
          "downstreamReachRatio": 0.067,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0048,
          "structuralScore": 13.0
        }
      },
      {
        "id": "token-validator",
        "name": "token-validator",
        "version": "2.0.1",
        "type": "package",
        "tier": null,
        "description": "Lightweight JWT / HMAC stateless token validation middleware",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.019,
          "structuralScore": 26.5
        }
      },
      {
        "id": "db-pool",
        "name": "db-pool",
        "version": "4.1.0",
        "type": "package",
        "tier": null,
        "description": "Resilient connection pooling and read-replica routing driver",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0095,
          "structuralScore": 25.9
        }
      },
      {
        "id": "sql-sanitizer",
        "name": "sql-sanitizer",
        "version": "1.5.0",
        "type": "package",
        "tier": null,
        "description": "Query parameterization guard and dialect-specific escaping library",
        "vulnerability": {
          "cveId": "SIM-VULN-SQL-001",
          "cvssScore": 7.5,
          "cvssSeverity": "HIGH",
          "summary": "Nested comment delimiter evasion causing parameter bypass in legacy SQL dialects"
        },
        "structuralMetrics": {
          "downstreamReach": 3,
          "downstreamReachRatio": 0.2,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0,
          "structuralScore": 28.0
        }
      },
      {
        "id": "logging-facade",
        "name": "logging-facade",
        "version": "2.2.0",
        "type": "package",
        "tier": null,
        "description": "Structured JSON log formatter with PII redaction filters",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 4,
          "downstreamReachRatio": 0.267,
          "directDependentsCount": 3,
          "transitiveDependentsCount": 1,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0,
          "structuralScore": 30.7
        }
      },
      {
        "id": "cloud-metrics",
        "name": "cloud-metrics",
        "version": "1.0.4",
        "type": "package",
        "tier": null,
        "description": "Prometheus and OpenTelemetry metrics collector",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 1,
          "downstreamReachRatio": 0.067,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0,
          "structuralScore": 12.7
        }
      },
      {
        "id": "json-serializer",
        "name": "json-serializer",
        "version": "3.1.2",
        "type": "package",
        "tier": null,
        "description": "Fast streaming JSON encoder and decoder",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0,
          "structuralScore": 25.3
        }
      },
      {
        "id": "crypto-primitives",
        "name": "crypto-primitives",
        "version": "1.1.0",
        "type": "package",
        "tier": null,
        "description": "Base mathematical primitives for symmetric ciphers and hashing",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 7,
          "downstreamReachRatio": 0.467,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 3,
          "affectedApplicationsCount": 3,
          "affectedApplicationsRatio": 0.75,
          "bottleneckScore": 0.0,
          "structuralScore": 48.7
        }
      },
      {
        "id": "legacy-xml-reader",
        "name": "legacy-xml-reader",
        "version": "0.5.1",
        "type": "package",
        "tier": null,
        "description": "Wrapper adapter for backward-compatible XML format ingestion",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 1,
          "downstreamReachRatio": 0.067,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0048,
          "structuralScore": 13.0
        }
      }
    ],
    "edges": [
      {
        "id": "session-crypt-helper->auth-core",
        "source": "session-crypt-helper",
        "target": "auth-core",
        "dependencyType": "direct",
        "specifier": "^2.0.0"
      },
      {
        "id": "session-crypt-helper->token-validator",
        "source": "session-crypt-helper",
        "target": "token-validator",
        "dependencyType": "direct",
        "specifier": "^2.0.0"
      },
      {
        "id": "xml-entity-parser->legacy-xml-reader",
        "source": "xml-entity-parser",
        "target": "legacy-xml-reader",
        "dependencyType": "direct",
        "specifier": "^0.9.0"
      },
      {
        "id": "auth-core->oauth-adapter",
        "source": "auth-core",
        "target": "oauth-adapter",
        "dependencyType": "direct",
        "specifier": "^3.0.0"
      },
      {
        "id": "auth-core->payment-gateway",
        "source": "auth-core",
        "target": "payment-gateway",
        "dependencyType": "direct",
        "specifier": "^3.2.0"
      },
      {
        "id": "oauth-adapter->user-portal",
        "source": "oauth-adapter",
        "target": "user-portal",
        "dependencyType": "direct",
        "specifier": "^1.8.0"
      },
      {
        "id": "token-validator->user-portal",
        "source": "token-validator",
        "target": "user-portal",
        "dependencyType": "direct",
        "specifier": "^2.0.0"
      },
      {
        "id": "token-validator->inventory-api",
        "source": "token-validator",
        "target": "inventory-api",
        "dependencyType": "direct",
        "specifier": "^2.0.0"
      },
      {
        "id": "db-pool->payment-gateway",
        "source": "db-pool",
        "target": "payment-gateway",
        "dependencyType": "direct",
        "specifier": "^4.0.0"
      },
      {
        "id": "db-pool->inventory-api",
        "source": "db-pool",
        "target": "inventory-api",
        "dependencyType": "direct",
        "specifier": "^4.0.0"
      },
      {
        "id": "sql-sanitizer->db-pool",
        "source": "sql-sanitizer",
        "target": "db-pool",
        "dependencyType": "direct",
        "specifier": "^1.4.0"
      },
      {
        "id": "logging-facade->auth-core",
        "source": "logging-facade",
        "target": "auth-core",
        "dependencyType": "direct",
        "specifier": "^2.0.0"
      },
      {
        "id": "logging-facade->payment-gateway",
        "source": "logging-facade",
        "target": "payment-gateway",
        "dependencyType": "direct",
        "specifier": "^2.1.0"
      },
      {
        "id": "logging-facade->user-portal",
        "source": "logging-facade",
        "target": "user-portal",
        "dependencyType": "direct",
        "specifier": "^2.1.0"
      },
      {
        "id": "cloud-metrics->inventory-api",
        "source": "cloud-metrics",
        "target": "inventory-api",
        "dependencyType": "direct",
        "specifier": "^1.0.0"
      },
      {
        "id": "json-serializer->payment-gateway",
        "source": "json-serializer",
        "target": "payment-gateway",
        "dependencyType": "direct",
        "specifier": "^3.0.0"
      },
      {
        "id": "json-serializer->inventory-api",
        "source": "json-serializer",
        "target": "inventory-api",
        "dependencyType": "direct",
        "specifier": "^3.0.0"
      },
      {
        "id": "crypto-primitives->session-crypt-helper",
        "source": "crypto-primitives",
        "target": "session-crypt-helper",
        "dependencyType": "direct",
        "specifier": "^1.0.0"
      },
      {
        "id": "legacy-xml-reader->legacy-report-generator",
        "source": "legacy-xml-reader",
        "target": "legacy-report-generator",
        "dependencyType": "direct",
        "specifier": "^0.5.0"
      }
    ]
  },
  "scenarios": [
    {
      "id": "scenario-ripple-effect",
      "title": "The Supply Chain Ripple Effect (Core Thesis)",
      "description": "Compares Package A (Critical CVSS in leaf tool) vs Package B (Medium CVSS in foundational auth helper). Demonstrates how downstream reach and structural choke points invert remediation priorities.",
      "targetA": "xml-entity-parser",
      "targetB": "session-crypt-helper",
      "takeaway": "Package A (CVSS 9.8 Critical) affects only 1 internal offline tool. Package B (CVSS 5.3 Medium) ripples through auth-core and token-validator to compromise 3 mission-critical Tier-1 production applications. Package B is mathematically and architecturally ranked Priority #1."
    },
    {
      "id": "scenario-sql-sanitizer",
      "title": "High Severity with Moderate Blast Radius",
      "description": "Examines sql-sanitizer (CVSS 7.5 High) which passes through db-pool to reach Payment Gateway and Inventory API.",
      "targetA": "sql-sanitizer",
      "targetB": "xml-entity-parser",
      "takeaway": "While sql-sanitizer has a lower CVSS than xml-entity-parser (7.5 vs 9.8), its propagation path penetrates direct database connectivity to 2 Tier-1 applications."
    }
  ],
  "rankings": {
    "rankings": [
      {
        "rank": 1,
        "nodeId": "session-crypt-helper",
        "nodeName": "session-crypt-helper (Package B)",
        "nodeType": "package",
        "version": "2.1.0",
        "cvssScore": 5.3,
        "cvssSeverity": "MEDIUM",
        "structuralScore": 47.7,
        "downstreamReachCount": 6,
        "affectedApplicationsCount": 3,
        "productionAppsCount": 3,
        "internalAppsCount": 0,
        "priorityScore": 61.0,
        "isChokePoint": true,
        "explanationSummary": "CRITICAL SYSTEMIC RISK: Affects 3 apps (3 prod) despite MEDIUM CVSS (5.3). Immediate mitigation required."
      },
      {
        "rank": 2,
        "nodeId": "sql-sanitizer",
        "nodeName": "sql-sanitizer",
        "nodeType": "package",
        "version": "1.5.0",
        "cvssScore": 7.5,
        "cvssSeverity": "HIGH",
        "structuralScore": 28.0,
        "downstreamReachCount": 3,
        "affectedApplicationsCount": 2,
        "productionAppsCount": 2,
        "internalAppsCount": 0,
        "priorityScore": 50.5,
        "isChokePoint": false,
        "explanationSummary": "MODERATE RISK: HIGH severity (7.5) affecting 2 application(s)."
      },
      {
        "rank": 3,
        "nodeId": "crypto-primitives",
        "nodeName": "crypto-primitives",
        "nodeType": "package",
        "version": "1.1.0",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 48.7,
        "downstreamReachCount": 7,
        "affectedApplicationsCount": 3,
        "productionAppsCount": 3,
        "internalAppsCount": 0,
        "priorityScore": 45.3,
        "isChokePoint": true,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 48.7 supporting 7 downstream dependencies."
      },
      {
        "rank": 4,
        "nodeId": "xml-entity-parser",
        "nodeName": "xml-entity-parser (Package A)",
        "nodeType": "package",
        "version": "0.9.4",
        "cvssScore": 9.8,
        "cvssSeverity": "CRITICAL",
        "structuralScore": 15.3,
        "downstreamReachCount": 2,
        "affectedApplicationsCount": 1,
        "productionAppsCount": 0,
        "internalAppsCount": 1,
        "priorityScore": 36.1,
        "isChokePoint": false,
        "explanationSummary": "LOCALIZED RISK: High CVSS (9.8), but blast radius is isolated to 1 non-critical internal tool."
      },
      {
        "rank": 5,
        "nodeId": "logging-facade",
        "nodeName": "logging-facade",
        "nodeType": "package",
        "version": "2.2.0",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 30.7,
        "downstreamReachCount": 4,
        "affectedApplicationsCount": 2,
        "productionAppsCount": 2,
        "internalAppsCount": 0,
        "priorityScore": 29.3,
        "isChokePoint": true,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 30.7 supporting 4 downstream dependencies."
      },
      {
        "rank": 6,
        "nodeId": "auth-core",
        "nodeName": "auth-core",
        "nodeType": "package",
        "version": "3.4.0",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 29.4,
        "downstreamReachCount": 3,
        "affectedApplicationsCount": 2,
        "productionAppsCount": 2,
        "internalAppsCount": 0,
        "priorityScore": 28.9,
        "isChokePoint": false,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 29.4 supporting 3 downstream dependencies."
      },
      {
        "rank": 7,
        "nodeId": "token-validator",
        "nodeName": "token-validator",
        "nodeType": "package",
        "version": "2.0.1",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 26.5,
        "downstreamReachCount": 2,
        "affectedApplicationsCount": 2,
        "productionAppsCount": 2,
        "internalAppsCount": 0,
        "priorityScore": 27.4,
        "isChokePoint": false,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 26.5 supporting 2 downstream dependencies."
      },
      {
        "rank": 8,
        "nodeId": "db-pool",
        "nodeName": "db-pool",
        "nodeType": "package",
        "version": "4.1.0",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 25.9,
        "downstreamReachCount": 2,
        "affectedApplicationsCount": 2,
        "productionAppsCount": 2,
        "internalAppsCount": 0,
        "priorityScore": 27.0,
        "isChokePoint": false,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 25.9 supporting 2 downstream dependencies."
      },
      {
        "rank": 9,
        "nodeId": "json-serializer",
        "nodeName": "json-serializer",
        "nodeType": "package",
        "version": "3.1.2",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 25.3,
        "downstreamReachCount": 2,
        "affectedApplicationsCount": 2,
        "productionAppsCount": 2,
        "internalAppsCount": 0,
        "priorityScore": 26.7,
        "isChokePoint": false,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 25.3 supporting 2 downstream dependencies."
      },
      {
        "rank": 10,
        "nodeId": "oauth-adapter",
        "nodeName": "oauth-adapter",
        "nodeType": "package",
        "version": "1.8.2",
        "cvssScore": 3.1,
        "cvssSeverity": "LOW",
        "structuralScore": 13.0,
        "downstreamReachCount": 1,
        "affectedApplicationsCount": 1,
        "productionAppsCount": 1,
        "internalAppsCount": 0,
        "priorityScore": 22.8,
        "isChokePoint": false,
        "explanationSummary": "MODERATE RISK: LOW severity (3.1) affecting 1 application(s)."
      },
      {
        "rank": 11,
        "nodeId": "cloud-metrics",
        "nodeName": "cloud-metrics",
        "nodeType": "package",
        "version": "1.0.4",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 12.7,
        "downstreamReachCount": 1,
        "affectedApplicationsCount": 1,
        "productionAppsCount": 1,
        "internalAppsCount": 0,
        "priorityScore": 13.3,
        "isChokePoint": false,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 12.7 supporting 1 downstream dependencies."
      },
      {
        "rank": 12,
        "nodeId": "legacy-xml-reader",
        "nodeName": "legacy-xml-reader",
        "nodeType": "package",
        "version": "0.5.1",
        "cvssScore": 0.0,
        "cvssSeverity": "NONE",
        "structuralScore": 13.0,
        "downstreamReachCount": 1,
        "affectedApplicationsCount": 1,
        "productionAppsCount": 0,
        "internalAppsCount": 1,
        "priorityScore": 5.5,
        "isChokePoint": false,
        "explanationSummary": "STRUCTURAL CARRIER: No active CVE, but structural score is 13.0 supporting 1 downstream dependencies."
      }
    ],
    "methodology": {
      "formula": "Priority Score = 100 * (0.30 * (CVSS/10) + 0.40 * (WeightedAppImpact) + 0.20 * (DownstreamReachRatio) + 0.10 * (BottleneckNorm))",
      "rationale": "Balances intrinsic flaw severity with blast-radius amplification across mission-critical application infrastructure.",
      "weights": {
        "vulnerabilitySeverity": "30%",
        "applicationExposure": "40%",
        "downstreamReach": "20%",
        "bottleneckCentrality": "10%"
      }
    }
  },
  "simulations": {
    "payment-gateway": {
      "compromisedNode": {
        "id": "payment-gateway",
        "name": "Payment Gateway Service",
        "version": "3.2.0",
        "type": "application",
        "tier": "production",
        "description": "Core PCI-DSS compliant credit card and payment processing microservice",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      "directDependents": [],
      "transitiveDependents": [],
      "affectedApplications": [],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 0,
        "affectedNodesRatio": 0.0,
        "affectedApplicationsCount": 0,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.0,
        "productionAppsCompromised": 0,
        "maxPropagationDepth": 0
      },
      "highlightNodeIds": [
        "payment-gateway"
      ],
      "highlightEdgeIds": []
    },
    "user-portal": {
      "compromisedNode": {
        "id": "user-portal",
        "name": "Customer Web Portal",
        "version": "4.1.0",
        "type": "application",
        "tier": "production",
        "description": "Public customer account authentication, profile and order management dashboard",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      "directDependents": [],
      "transitiveDependents": [],
      "affectedApplications": [],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 0,
        "affectedNodesRatio": 0.0,
        "affectedApplicationsCount": 0,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.0,
        "productionAppsCompromised": 0,
        "maxPropagationDepth": 0
      },
      "highlightNodeIds": [
        "user-portal"
      ],
      "highlightEdgeIds": []
    },
    "inventory-api": {
      "compromisedNode": {
        "id": "inventory-api",
        "name": "Inventory & Order API",
        "version": "2.9.1",
        "type": "application",
        "tier": "production",
        "description": "High-throughput warehouse catalog and real-time inventory reservation API",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      "directDependents": [],
      "transitiveDependents": [],
      "affectedApplications": [],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 0,
        "affectedNodesRatio": 0.0,
        "affectedApplicationsCount": 0,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.0,
        "productionAppsCompromised": 0,
        "maxPropagationDepth": 0
      },
      "highlightNodeIds": [
        "inventory-api"
      ],
      "highlightEdgeIds": []
    },
    "legacy-report-generator": {
      "compromisedNode": {
        "id": "legacy-report-generator",
        "name": "Legacy Fiscal Report Tool",
        "version": "1.0.4",
        "type": "application",
        "tier": "internal",
        "description": "Isolated offline batch script for quarterly archived XML ledger generation",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 0,
          "downstreamReachRatio": 0.0,
          "directDependentsCount": 0,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 0,
          "affectedApplicationsRatio": 0.0,
          "bottleneckScore": 0.0,
          "structuralScore": 0.0
        }
      },
      "directDependents": [],
      "transitiveDependents": [],
      "affectedApplications": [],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 0,
        "affectedNodesRatio": 0.0,
        "affectedApplicationsCount": 0,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.0,
        "productionAppsCompromised": 0,
        "maxPropagationDepth": 0
      },
      "highlightNodeIds": [
        "legacy-report-generator"
      ],
      "highlightEdgeIds": []
    },
    "session-crypt-helper": {
      "compromisedNode": {
        "id": "session-crypt-helper",
        "name": "session-crypt-helper (Package B)",
        "version": "2.1.0",
        "type": "package",
        "tier": null,
        "description": "Session encryption and token state persistence utility",
        "vulnerability": {
          "cveId": "SIM-VULN-SESSION-001",
          "cvssScore": 5.3,
          "cvssSeverity": "MEDIUM",
          "summary": "Insecure pseudo-random seed in token generation allowing predictable session fixation and replay attacks"
        },
        "structuralMetrics": {
          "downstreamReach": 6,
          "downstreamReachRatio": 0.4,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 1,
          "affectedApplicationsCount": 3,
          "affectedApplicationsRatio": 0.75,
          "bottleneckScore": 0.0286,
          "structuralScore": 47.7
        }
      },
      "directDependents": [
        {
          "id": "auth-core",
          "name": "auth-core",
          "version": "3.4.0",
          "type": "package",
          "tier": null,
          "description": "Central identity abstraction, claims verification and session policy enforcement",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 3,
            "downstreamReachRatio": 0.2,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 2,
            "affectedApplicationsRatio": 0.5,
            "bottleneckScore": 0.0238,
            "structuralScore": 29.4
          }
        },
        {
          "id": "token-validator",
          "name": "token-validator",
          "version": "2.0.1",
          "type": "package",
          "tier": null,
          "description": "Lightweight JWT / HMAC stateless token validation middleware",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 2,
            "downstreamReachRatio": 0.133,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 2,
            "affectedApplicationsRatio": 0.5,
            "bottleneckScore": 0.019,
            "structuralScore": 26.5
          }
        }
      ],
      "transitiveDependents": [
        {
          "id": "oauth-adapter",
          "name": "oauth-adapter",
          "version": "1.8.2",
          "type": "package",
          "tier": null,
          "description": "Federated OpenID Connect and OAuth2 client grant handler",
          "vulnerability": {
            "cveId": "SIM-VULN-OAUTH-001",
            "cvssScore": 3.1,
            "cvssSeverity": "LOW",
            "summary": "Permissive redirect URI wildcard validation during local debug mode"
          },
          "structuralMetrics": {
            "downstreamReach": 1,
            "downstreamReachRatio": 0.067,
            "directDependentsCount": 1,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 1,
            "affectedApplicationsRatio": 0.25,
            "bottleneckScore": 0.0048,
            "structuralScore": 13.0
          }
        }
      ],
      "affectedApplications": [
        {
          "applicationId": "user-portal",
          "applicationName": "Customer Web Portal",
          "tier": "production",
          "hopDistance": 2,
          "paths": [
            [
              "session-crypt-helper",
              "auth-core",
              "oauth-adapter",
              "user-portal"
            ],
            [
              "session-crypt-helper",
              "token-validator",
              "user-portal"
            ]
          ],
          "readablePaths": [
            "session-crypt-helper@2.1.0 \u2794 auth-core@3.4.0 \u2794 oauth-adapter@1.8.2 \u2794 user-portal@4.1.0",
            "session-crypt-helper@2.1.0 \u2794 token-validator@2.0.1 \u2794 user-portal@4.1.0"
          ],
          "reason": "Transitively depends on 'session-crypt-helper' across 2 hops via 2 distinct propagation paths."
        },
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 2,
          "paths": [
            [
              "session-crypt-helper",
              "token-validator",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "session-crypt-helper@2.1.0 \u2794 token-validator@2.0.1 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Transitively depends on 'session-crypt-helper' across 2 hops via 1 distinct propagation path."
        },
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 2,
          "paths": [
            [
              "session-crypt-helper",
              "auth-core",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "session-crypt-helper@2.1.0 \u2794 auth-core@3.4.0 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Transitively depends on 'session-crypt-helper' across 2 hops via 1 distinct propagation path."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 6,
        "affectedNodesRatio": 0.4,
        "affectedApplicationsCount": 3,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.75,
        "productionAppsCompromised": 3,
        "maxPropagationDepth": 2
      },
      "highlightNodeIds": [
        "session-crypt-helper",
        "auth-core",
        "inventory-api",
        "oauth-adapter",
        "payment-gateway",
        "token-validator",
        "user-portal"
      ],
      "highlightEdgeIds": [
        "auth-core->oauth-adapter",
        "auth-core->payment-gateway",
        "oauth-adapter->user-portal",
        "session-crypt-helper->auth-core",
        "session-crypt-helper->token-validator",
        "token-validator->inventory-api",
        "token-validator->user-portal"
      ]
    },
    "xml-entity-parser": {
      "compromisedNode": {
        "id": "xml-entity-parser",
        "name": "xml-entity-parser (Package A)",
        "version": "0.9.4",
        "type": "package",
        "tier": null,
        "description": "Legacy XML parsing and schema evaluation library",
        "vulnerability": {
          "cveId": "SIM-VULN-XML-001",
          "cvssScore": 9.8,
          "cvssSeverity": "CRITICAL",
          "summary": "Remote Code Execution via unauthenticated XML External Entity (XXE) deserialization and prototype injection"
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0,
          "structuralScore": 15.3
        }
      },
      "directDependents": [
        {
          "id": "legacy-xml-reader",
          "name": "legacy-xml-reader",
          "version": "0.5.1",
          "type": "package",
          "tier": null,
          "description": "Wrapper adapter for backward-compatible XML format ingestion",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 1,
            "downstreamReachRatio": 0.067,
            "directDependentsCount": 1,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 1,
            "affectedApplicationsRatio": 0.25,
            "bottleneckScore": 0.0048,
            "structuralScore": 13.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "legacy-report-generator",
          "applicationName": "Legacy Fiscal Report Tool",
          "tier": "internal",
          "hopDistance": 2,
          "paths": [
            [
              "xml-entity-parser",
              "legacy-xml-reader",
              "legacy-report-generator"
            ]
          ],
          "readablePaths": [
            "xml-entity-parser@0.9.4 \u2794 legacy-xml-reader@0.5.1 \u2794 legacy-report-generator@1.0.4"
          ],
          "reason": "Transitively depends on 'xml-entity-parser' across 2 hops via 1 distinct propagation path."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 2,
        "affectedNodesRatio": 0.133,
        "affectedApplicationsCount": 1,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.25,
        "productionAppsCompromised": 0,
        "maxPropagationDepth": 2
      },
      "highlightNodeIds": [
        "xml-entity-parser",
        "legacy-report-generator",
        "legacy-xml-reader"
      ],
      "highlightEdgeIds": [
        "legacy-xml-reader->legacy-report-generator",
        "xml-entity-parser->legacy-xml-reader"
      ]
    },
    "auth-core": {
      "compromisedNode": {
        "id": "auth-core",
        "name": "auth-core",
        "version": "3.4.0",
        "type": "package",
        "tier": null,
        "description": "Central identity abstraction, claims verification and session policy enforcement",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 3,
          "downstreamReachRatio": 0.2,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0238,
          "structuralScore": 29.4
        }
      },
      "directDependents": [
        {
          "id": "oauth-adapter",
          "name": "oauth-adapter",
          "version": "1.8.2",
          "type": "package",
          "tier": null,
          "description": "Federated OpenID Connect and OAuth2 client grant handler",
          "vulnerability": {
            "cveId": "SIM-VULN-OAUTH-001",
            "cvssScore": 3.1,
            "cvssSeverity": "LOW",
            "summary": "Permissive redirect URI wildcard validation during local debug mode"
          },
          "structuralMetrics": {
            "downstreamReach": 1,
            "downstreamReachRatio": 0.067,
            "directDependentsCount": 1,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 1,
            "affectedApplicationsRatio": 0.25,
            "bottleneckScore": 0.0048,
            "structuralScore": 13.0
          }
        },
        {
          "id": "payment-gateway",
          "name": "Payment Gateway Service",
          "version": "3.2.0",
          "type": "application",
          "tier": "production",
          "description": "Core PCI-DSS compliant credit card and payment processing microservice",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "auth-core",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "auth-core@3.4.0 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Directly consumes 'auth-core'. Vulnerability executes directly in application context."
        },
        {
          "applicationId": "user-portal",
          "applicationName": "Customer Web Portal",
          "tier": "production",
          "hopDistance": 2,
          "paths": [
            [
              "auth-core",
              "oauth-adapter",
              "user-portal"
            ]
          ],
          "readablePaths": [
            "auth-core@3.4.0 \u2794 oauth-adapter@1.8.2 \u2794 user-portal@4.1.0"
          ],
          "reason": "Transitively depends on 'auth-core' across 2 hops via 1 distinct propagation path."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 3,
        "affectedNodesRatio": 0.2,
        "affectedApplicationsCount": 2,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.5,
        "productionAppsCompromised": 2,
        "maxPropagationDepth": 2
      },
      "highlightNodeIds": [
        "auth-core",
        "oauth-adapter",
        "payment-gateway",
        "user-portal"
      ],
      "highlightEdgeIds": [
        "auth-core->oauth-adapter",
        "auth-core->payment-gateway",
        "oauth-adapter->user-portal"
      ]
    },
    "oauth-adapter": {
      "compromisedNode": {
        "id": "oauth-adapter",
        "name": "oauth-adapter",
        "version": "1.8.2",
        "type": "package",
        "tier": null,
        "description": "Federated OpenID Connect and OAuth2 client grant handler",
        "vulnerability": {
          "cveId": "SIM-VULN-OAUTH-001",
          "cvssScore": 3.1,
          "cvssSeverity": "LOW",
          "summary": "Permissive redirect URI wildcard validation during local debug mode"
        },
        "structuralMetrics": {
          "downstreamReach": 1,
          "downstreamReachRatio": 0.067,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0048,
          "structuralScore": 13.0
        }
      },
      "directDependents": [
        {
          "id": "user-portal",
          "name": "Customer Web Portal",
          "version": "4.1.0",
          "type": "application",
          "tier": "production",
          "description": "Public customer account authentication, profile and order management dashboard",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "user-portal",
          "applicationName": "Customer Web Portal",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "oauth-adapter",
              "user-portal"
            ]
          ],
          "readablePaths": [
            "oauth-adapter@1.8.2 \u2794 user-portal@4.1.0"
          ],
          "reason": "Directly consumes 'oauth-adapter'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 1,
        "affectedNodesRatio": 0.067,
        "affectedApplicationsCount": 1,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.25,
        "productionAppsCompromised": 1,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "oauth-adapter",
        "user-portal"
      ],
      "highlightEdgeIds": [
        "oauth-adapter->user-portal"
      ]
    },
    "token-validator": {
      "compromisedNode": {
        "id": "token-validator",
        "name": "token-validator",
        "version": "2.0.1",
        "type": "package",
        "tier": null,
        "description": "Lightweight JWT / HMAC stateless token validation middleware",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.019,
          "structuralScore": 26.5
        }
      },
      "directDependents": [
        {
          "id": "inventory-api",
          "name": "Inventory & Order API",
          "version": "2.9.1",
          "type": "application",
          "tier": "production",
          "description": "High-throughput warehouse catalog and real-time inventory reservation API",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        },
        {
          "id": "user-portal",
          "name": "Customer Web Portal",
          "version": "4.1.0",
          "type": "application",
          "tier": "production",
          "description": "Public customer account authentication, profile and order management dashboard",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "user-portal",
          "applicationName": "Customer Web Portal",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "token-validator",
              "user-portal"
            ]
          ],
          "readablePaths": [
            "token-validator@2.0.1 \u2794 user-portal@4.1.0"
          ],
          "reason": "Directly consumes 'token-validator'. Vulnerability executes directly in application context."
        },
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "token-validator",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "token-validator@2.0.1 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Directly consumes 'token-validator'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 2,
        "affectedNodesRatio": 0.133,
        "affectedApplicationsCount": 2,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.5,
        "productionAppsCompromised": 2,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "token-validator",
        "inventory-api",
        "user-portal"
      ],
      "highlightEdgeIds": [
        "token-validator->inventory-api",
        "token-validator->user-portal"
      ]
    },
    "db-pool": {
      "compromisedNode": {
        "id": "db-pool",
        "name": "db-pool",
        "version": "4.1.0",
        "type": "package",
        "tier": null,
        "description": "Resilient connection pooling and read-replica routing driver",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0095,
          "structuralScore": 25.9
        }
      },
      "directDependents": [
        {
          "id": "inventory-api",
          "name": "Inventory & Order API",
          "version": "2.9.1",
          "type": "application",
          "tier": "production",
          "description": "High-throughput warehouse catalog and real-time inventory reservation API",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        },
        {
          "id": "payment-gateway",
          "name": "Payment Gateway Service",
          "version": "3.2.0",
          "type": "application",
          "tier": "production",
          "description": "Core PCI-DSS compliant credit card and payment processing microservice",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "db-pool",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "db-pool@4.1.0 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Directly consumes 'db-pool'. Vulnerability executes directly in application context."
        },
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "db-pool",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "db-pool@4.1.0 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Directly consumes 'db-pool'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 2,
        "affectedNodesRatio": 0.133,
        "affectedApplicationsCount": 2,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.5,
        "productionAppsCompromised": 2,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "db-pool",
        "inventory-api",
        "payment-gateway"
      ],
      "highlightEdgeIds": [
        "db-pool->inventory-api",
        "db-pool->payment-gateway"
      ]
    },
    "sql-sanitizer": {
      "compromisedNode": {
        "id": "sql-sanitizer",
        "name": "sql-sanitizer",
        "version": "1.5.0",
        "type": "package",
        "tier": null,
        "description": "Query parameterization guard and dialect-specific escaping library",
        "vulnerability": {
          "cveId": "SIM-VULN-SQL-001",
          "cvssScore": 7.5,
          "cvssSeverity": "HIGH",
          "summary": "Nested comment delimiter evasion causing parameter bypass in legacy SQL dialects"
        },
        "structuralMetrics": {
          "downstreamReach": 3,
          "downstreamReachRatio": 0.2,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0,
          "structuralScore": 28.0
        }
      },
      "directDependents": [
        {
          "id": "db-pool",
          "name": "db-pool",
          "version": "4.1.0",
          "type": "package",
          "tier": null,
          "description": "Resilient connection pooling and read-replica routing driver",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 2,
            "downstreamReachRatio": 0.133,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 2,
            "affectedApplicationsRatio": 0.5,
            "bottleneckScore": 0.0095,
            "structuralScore": 25.9
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 2,
          "paths": [
            [
              "sql-sanitizer",
              "db-pool",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "sql-sanitizer@1.5.0 \u2794 db-pool@4.1.0 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Transitively depends on 'sql-sanitizer' across 2 hops via 1 distinct propagation path."
        },
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 2,
          "paths": [
            [
              "sql-sanitizer",
              "db-pool",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "sql-sanitizer@1.5.0 \u2794 db-pool@4.1.0 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Transitively depends on 'sql-sanitizer' across 2 hops via 1 distinct propagation path."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 3,
        "affectedNodesRatio": 0.2,
        "affectedApplicationsCount": 2,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.5,
        "productionAppsCompromised": 2,
        "maxPropagationDepth": 2
      },
      "highlightNodeIds": [
        "sql-sanitizer",
        "db-pool",
        "inventory-api",
        "payment-gateway"
      ],
      "highlightEdgeIds": [
        "db-pool->inventory-api",
        "db-pool->payment-gateway",
        "sql-sanitizer->db-pool"
      ]
    },
    "logging-facade": {
      "compromisedNode": {
        "id": "logging-facade",
        "name": "logging-facade",
        "version": "2.2.0",
        "type": "package",
        "tier": null,
        "description": "Structured JSON log formatter with PII redaction filters",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 4,
          "downstreamReachRatio": 0.267,
          "directDependentsCount": 3,
          "transitiveDependentsCount": 1,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0,
          "structuralScore": 30.7
        }
      },
      "directDependents": [
        {
          "id": "auth-core",
          "name": "auth-core",
          "version": "3.4.0",
          "type": "package",
          "tier": null,
          "description": "Central identity abstraction, claims verification and session policy enforcement",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 3,
            "downstreamReachRatio": 0.2,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 2,
            "affectedApplicationsRatio": 0.5,
            "bottleneckScore": 0.0238,
            "structuralScore": 29.4
          }
        },
        {
          "id": "payment-gateway",
          "name": "Payment Gateway Service",
          "version": "3.2.0",
          "type": "application",
          "tier": "production",
          "description": "Core PCI-DSS compliant credit card and payment processing microservice",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        },
        {
          "id": "user-portal",
          "name": "Customer Web Portal",
          "version": "4.1.0",
          "type": "application",
          "tier": "production",
          "description": "Public customer account authentication, profile and order management dashboard",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [
        {
          "id": "oauth-adapter",
          "name": "oauth-adapter",
          "version": "1.8.2",
          "type": "package",
          "tier": null,
          "description": "Federated OpenID Connect and OAuth2 client grant handler",
          "vulnerability": {
            "cveId": "SIM-VULN-OAUTH-001",
            "cvssScore": 3.1,
            "cvssSeverity": "LOW",
            "summary": "Permissive redirect URI wildcard validation during local debug mode"
          },
          "structuralMetrics": {
            "downstreamReach": 1,
            "downstreamReachRatio": 0.067,
            "directDependentsCount": 1,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 1,
            "affectedApplicationsRatio": 0.25,
            "bottleneckScore": 0.0048,
            "structuralScore": 13.0
          }
        }
      ],
      "affectedApplications": [
        {
          "applicationId": "user-portal",
          "applicationName": "Customer Web Portal",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "logging-facade",
              "auth-core",
              "oauth-adapter",
              "user-portal"
            ],
            [
              "logging-facade",
              "user-portal"
            ]
          ],
          "readablePaths": [
            "logging-facade@2.2.0 \u2794 auth-core@3.4.0 \u2794 oauth-adapter@1.8.2 \u2794 user-portal@4.1.0",
            "logging-facade@2.2.0 \u2794 user-portal@4.1.0"
          ],
          "reason": "Directly consumes 'logging-facade'. Vulnerability executes directly in application context."
        },
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "logging-facade",
              "auth-core",
              "payment-gateway"
            ],
            [
              "logging-facade",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "logging-facade@2.2.0 \u2794 auth-core@3.4.0 \u2794 payment-gateway@3.2.0",
            "logging-facade@2.2.0 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Directly consumes 'logging-facade'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 4,
        "affectedNodesRatio": 0.267,
        "affectedApplicationsCount": 2,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.5,
        "productionAppsCompromised": 2,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "logging-facade",
        "auth-core",
        "oauth-adapter",
        "payment-gateway",
        "user-portal"
      ],
      "highlightEdgeIds": [
        "auth-core->oauth-adapter",
        "auth-core->payment-gateway",
        "logging-facade->auth-core",
        "logging-facade->payment-gateway",
        "logging-facade->user-portal",
        "oauth-adapter->user-portal"
      ]
    },
    "cloud-metrics": {
      "compromisedNode": {
        "id": "cloud-metrics",
        "name": "cloud-metrics",
        "version": "1.0.4",
        "type": "package",
        "tier": null,
        "description": "Prometheus and OpenTelemetry metrics collector",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 1,
          "downstreamReachRatio": 0.067,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0,
          "structuralScore": 12.7
        }
      },
      "directDependents": [
        {
          "id": "inventory-api",
          "name": "Inventory & Order API",
          "version": "2.9.1",
          "type": "application",
          "tier": "production",
          "description": "High-throughput warehouse catalog and real-time inventory reservation API",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "cloud-metrics",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "cloud-metrics@1.0.4 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Directly consumes 'cloud-metrics'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 1,
        "affectedNodesRatio": 0.067,
        "affectedApplicationsCount": 1,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.25,
        "productionAppsCompromised": 1,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "cloud-metrics",
        "inventory-api"
      ],
      "highlightEdgeIds": [
        "cloud-metrics->inventory-api"
      ]
    },
    "json-serializer": {
      "compromisedNode": {
        "id": "json-serializer",
        "name": "json-serializer",
        "version": "3.1.2",
        "type": "package",
        "tier": null,
        "description": "Fast streaming JSON encoder and decoder",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 2,
          "downstreamReachRatio": 0.133,
          "directDependentsCount": 2,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 2,
          "affectedApplicationsRatio": 0.5,
          "bottleneckScore": 0.0,
          "structuralScore": 25.3
        }
      },
      "directDependents": [
        {
          "id": "inventory-api",
          "name": "Inventory & Order API",
          "version": "2.9.1",
          "type": "application",
          "tier": "production",
          "description": "High-throughput warehouse catalog and real-time inventory reservation API",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        },
        {
          "id": "payment-gateway",
          "name": "Payment Gateway Service",
          "version": "3.2.0",
          "type": "application",
          "tier": "production",
          "description": "Core PCI-DSS compliant credit card and payment processing microservice",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "json-serializer",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "json-serializer@3.1.2 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Directly consumes 'json-serializer'. Vulnerability executes directly in application context."
        },
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 1,
          "paths": [
            [
              "json-serializer",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "json-serializer@3.1.2 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Directly consumes 'json-serializer'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 2,
        "affectedNodesRatio": 0.133,
        "affectedApplicationsCount": 2,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.5,
        "productionAppsCompromised": 2,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "json-serializer",
        "inventory-api",
        "payment-gateway"
      ],
      "highlightEdgeIds": [
        "json-serializer->inventory-api",
        "json-serializer->payment-gateway"
      ]
    },
    "crypto-primitives": {
      "compromisedNode": {
        "id": "crypto-primitives",
        "name": "crypto-primitives",
        "version": "1.1.0",
        "type": "package",
        "tier": null,
        "description": "Base mathematical primitives for symmetric ciphers and hashing",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 7,
          "downstreamReachRatio": 0.467,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 3,
          "affectedApplicationsCount": 3,
          "affectedApplicationsRatio": 0.75,
          "bottleneckScore": 0.0,
          "structuralScore": 48.7
        }
      },
      "directDependents": [
        {
          "id": "session-crypt-helper",
          "name": "session-crypt-helper (Package B)",
          "version": "2.1.0",
          "type": "package",
          "tier": null,
          "description": "Session encryption and token state persistence utility",
          "vulnerability": {
            "cveId": "SIM-VULN-SESSION-001",
            "cvssScore": 5.3,
            "cvssSeverity": "MEDIUM",
            "summary": "Insecure pseudo-random seed in token generation allowing predictable session fixation and replay attacks"
          },
          "structuralMetrics": {
            "downstreamReach": 6,
            "downstreamReachRatio": 0.4,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 1,
            "affectedApplicationsCount": 3,
            "affectedApplicationsRatio": 0.75,
            "bottleneckScore": 0.0286,
            "structuralScore": 47.7
          }
        }
      ],
      "transitiveDependents": [
        {
          "id": "auth-core",
          "name": "auth-core",
          "version": "3.4.0",
          "type": "package",
          "tier": null,
          "description": "Central identity abstraction, claims verification and session policy enforcement",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 3,
            "downstreamReachRatio": 0.2,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 2,
            "affectedApplicationsRatio": 0.5,
            "bottleneckScore": 0.0238,
            "structuralScore": 29.4
          }
        },
        {
          "id": "oauth-adapter",
          "name": "oauth-adapter",
          "version": "1.8.2",
          "type": "package",
          "tier": null,
          "description": "Federated OpenID Connect and OAuth2 client grant handler",
          "vulnerability": {
            "cveId": "SIM-VULN-OAUTH-001",
            "cvssScore": 3.1,
            "cvssSeverity": "LOW",
            "summary": "Permissive redirect URI wildcard validation during local debug mode"
          },
          "structuralMetrics": {
            "downstreamReach": 1,
            "downstreamReachRatio": 0.067,
            "directDependentsCount": 1,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 1,
            "affectedApplicationsRatio": 0.25,
            "bottleneckScore": 0.0048,
            "structuralScore": 13.0
          }
        },
        {
          "id": "token-validator",
          "name": "token-validator",
          "version": "2.0.1",
          "type": "package",
          "tier": null,
          "description": "Lightweight JWT / HMAC stateless token validation middleware",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 2,
            "downstreamReachRatio": 0.133,
            "directDependentsCount": 2,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 2,
            "affectedApplicationsRatio": 0.5,
            "bottleneckScore": 0.019,
            "structuralScore": 26.5
          }
        }
      ],
      "affectedApplications": [
        {
          "applicationId": "user-portal",
          "applicationName": "Customer Web Portal",
          "tier": "production",
          "hopDistance": 3,
          "paths": [
            [
              "crypto-primitives",
              "session-crypt-helper",
              "auth-core",
              "oauth-adapter",
              "user-portal"
            ],
            [
              "crypto-primitives",
              "session-crypt-helper",
              "token-validator",
              "user-portal"
            ]
          ],
          "readablePaths": [
            "crypto-primitives@1.1.0 \u2794 session-crypt-helper@2.1.0 \u2794 auth-core@3.4.0 \u2794 oauth-adapter@1.8.2 \u2794 user-portal@4.1.0",
            "crypto-primitives@1.1.0 \u2794 session-crypt-helper@2.1.0 \u2794 token-validator@2.0.1 \u2794 user-portal@4.1.0"
          ],
          "reason": "Transitively depends on 'crypto-primitives' across 3 hops via 2 distinct propagation paths."
        },
        {
          "applicationId": "inventory-api",
          "applicationName": "Inventory & Order API",
          "tier": "production",
          "hopDistance": 3,
          "paths": [
            [
              "crypto-primitives",
              "session-crypt-helper",
              "token-validator",
              "inventory-api"
            ]
          ],
          "readablePaths": [
            "crypto-primitives@1.1.0 \u2794 session-crypt-helper@2.1.0 \u2794 token-validator@2.0.1 \u2794 inventory-api@2.9.1"
          ],
          "reason": "Transitively depends on 'crypto-primitives' across 3 hops via 1 distinct propagation path."
        },
        {
          "applicationId": "payment-gateway",
          "applicationName": "Payment Gateway Service",
          "tier": "production",
          "hopDistance": 3,
          "paths": [
            [
              "crypto-primitives",
              "session-crypt-helper",
              "auth-core",
              "payment-gateway"
            ]
          ],
          "readablePaths": [
            "crypto-primitives@1.1.0 \u2794 session-crypt-helper@2.1.0 \u2794 auth-core@3.4.0 \u2794 payment-gateway@3.2.0"
          ],
          "reason": "Transitively depends on 'crypto-primitives' across 3 hops via 1 distinct propagation path."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 7,
        "affectedNodesRatio": 0.467,
        "affectedApplicationsCount": 3,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.75,
        "productionAppsCompromised": 3,
        "maxPropagationDepth": 3
      },
      "highlightNodeIds": [
        "crypto-primitives",
        "auth-core",
        "inventory-api",
        "oauth-adapter",
        "payment-gateway",
        "session-crypt-helper",
        "token-validator",
        "user-portal"
      ],
      "highlightEdgeIds": [
        "auth-core->oauth-adapter",
        "auth-core->payment-gateway",
        "crypto-primitives->session-crypt-helper",
        "oauth-adapter->user-portal",
        "session-crypt-helper->auth-core",
        "session-crypt-helper->token-validator",
        "token-validator->inventory-api",
        "token-validator->user-portal"
      ]
    },
    "legacy-xml-reader": {
      "compromisedNode": {
        "id": "legacy-xml-reader",
        "name": "legacy-xml-reader",
        "version": "0.5.1",
        "type": "package",
        "tier": null,
        "description": "Wrapper adapter for backward-compatible XML format ingestion",
        "vulnerability": {
          "cveId": null,
          "cvssScore": 0.0,
          "cvssSeverity": "NONE",
          "summary": null
        },
        "structuralMetrics": {
          "downstreamReach": 1,
          "downstreamReachRatio": 0.067,
          "directDependentsCount": 1,
          "transitiveDependentsCount": 0,
          "affectedApplicationsCount": 1,
          "affectedApplicationsRatio": 0.25,
          "bottleneckScore": 0.0048,
          "structuralScore": 13.0
        }
      },
      "directDependents": [
        {
          "id": "legacy-report-generator",
          "name": "Legacy Fiscal Report Tool",
          "version": "1.0.4",
          "type": "application",
          "tier": "internal",
          "description": "Isolated offline batch script for quarterly archived XML ledger generation",
          "vulnerability": {
            "cveId": null,
            "cvssScore": 0.0,
            "cvssSeverity": "NONE",
            "summary": null
          },
          "structuralMetrics": {
            "downstreamReach": 0,
            "downstreamReachRatio": 0.0,
            "directDependentsCount": 0,
            "transitiveDependentsCount": 0,
            "affectedApplicationsCount": 0,
            "affectedApplicationsRatio": 0.0,
            "bottleneckScore": 0.0,
            "structuralScore": 0.0
          }
        }
      ],
      "transitiveDependents": [],
      "affectedApplications": [
        {
          "applicationId": "legacy-report-generator",
          "applicationName": "Legacy Fiscal Report Tool",
          "tier": "internal",
          "hopDistance": 1,
          "paths": [
            [
              "legacy-xml-reader",
              "legacy-report-generator"
            ]
          ],
          "readablePaths": [
            "legacy-xml-reader@0.5.1 \u2794 legacy-report-generator@1.0.4"
          ],
          "reason": "Directly consumes 'legacy-xml-reader'. Vulnerability executes directly in application context."
        }
      ],
      "blastRadiusMetrics": {
        "totalEcosystemNodes": 16,
        "affectedNodesCount": 1,
        "affectedNodesRatio": 0.067,
        "affectedApplicationsCount": 1,
        "totalApplicationsCount": 4,
        "affectedApplicationsRatio": 0.25,
        "productionAppsCompromised": 0,
        "maxPropagationDepth": 1
      },
      "highlightNodeIds": [
        "legacy-xml-reader",
        "legacy-report-generator"
      ],
      "highlightEdgeIds": [
        "legacy-xml-reader->legacy-report-generator"
      ]
    }
  },
  "explanations": {
    "payment-gateway": {
      "nodeId": "payment-gateway",
      "nodeName": "Payment Gateway Service",
      "priorityRank": 999,
      "priorityScore": 0.0,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 0.0,
      "affectedAppsCount": 0,
      "affectedNodesCount": 0,
      "summaryHeadline": "Priority #999 \u2014 Structural Foundation (0.0 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 0 component(s), propagating transitively to 0 total components across the ecosystem.",
        "Application Exposure: 0 top-level applications reached (isolated leaf or unused branch).",
        "Structural Importance: Has a structural score of 0.0/100, with low pathway multiplexing. Bottleneck Centrality: 0.0.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "user-portal": {
      "nodeId": "user-portal",
      "nodeName": "Customer Web Portal",
      "priorityRank": 999,
      "priorityScore": 0.0,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 0.0,
      "affectedAppsCount": 0,
      "affectedNodesCount": 0,
      "summaryHeadline": "Priority #999 \u2014 Structural Foundation (0.0 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 0 component(s), propagating transitively to 0 total components across the ecosystem.",
        "Application Exposure: 0 top-level applications reached (isolated leaf or unused branch).",
        "Structural Importance: Has a structural score of 0.0/100, with low pathway multiplexing. Bottleneck Centrality: 0.0.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "inventory-api": {
      "nodeId": "inventory-api",
      "nodeName": "Inventory & Order API",
      "priorityRank": 999,
      "priorityScore": 0.0,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 0.0,
      "affectedAppsCount": 0,
      "affectedNodesCount": 0,
      "summaryHeadline": "Priority #999 \u2014 Structural Foundation (0.0 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 0 component(s), propagating transitively to 0 total components across the ecosystem.",
        "Application Exposure: 0 top-level applications reached (isolated leaf or unused branch).",
        "Structural Importance: Has a structural score of 0.0/100, with low pathway multiplexing. Bottleneck Centrality: 0.0.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "legacy-report-generator": {
      "nodeId": "legacy-report-generator",
      "nodeName": "Legacy Fiscal Report Tool",
      "priorityRank": 999,
      "priorityScore": 0.0,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 0.0,
      "affectedAppsCount": 0,
      "affectedNodesCount": 0,
      "summaryHeadline": "Priority #999 \u2014 Structural Foundation (0.0 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 0 component(s), propagating transitively to 0 total components across the ecosystem.",
        "Application Exposure: 0 top-level applications reached (isolated leaf or unused branch).",
        "Structural Importance: Has a structural score of 0.0/100, with low pathway multiplexing. Bottleneck Centrality: 0.0.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "session-crypt-helper": {
      "nodeId": "session-crypt-helper",
      "nodeName": "session-crypt-helper (Package B)",
      "priorityRank": 1,
      "priorityScore": 61.0,
      "cvssScore": 5.3,
      "cvssSeverity": "MEDIUM",
      "structuralScore": 47.7,
      "affectedAppsCount": 3,
      "affectedNodesCount": 6,
      "summaryHeadline": "Priority #1 \u2014 Highest Systemic Threat (61.0 / 100)",
      "rationales": [
        "Vulnerability Severity: MEDIUM (CVSS 5.3/10.0 via SIM-VULN-SESSION-001). Source vulnerability severity is evaluated as-is without modification.",
        "Downstream Blast Radius: Directly consumed by 2 component(s), propagating transitively to 6 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 3 Tier-1 Production service(s) ['Customer Web Portal', 'Inventory & Order API', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 47.7/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0286. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Systemic Inversion: Ranked Priority #1 because widespread production reach (3 mission-critical applications) outweighs raw CVSS score alone."
      ],
      "remediationAction": "IMMEDIATE MITIGATION: Patch or quarantine in the next deployment cycle ahead of higher-CVSS leaf libraries."
    },
    "xml-entity-parser": {
      "nodeId": "xml-entity-parser",
      "nodeName": "xml-entity-parser (Package A)",
      "priorityRank": 4,
      "priorityScore": 36.1,
      "cvssScore": 9.8,
      "cvssSeverity": "CRITICAL",
      "structuralScore": 15.3,
      "affectedAppsCount": 1,
      "affectedNodesCount": 2,
      "summaryHeadline": "Priority #4 \u2014 Localized Critical Severity (36.1 / 100)",
      "rationales": [
        "Vulnerability Severity: CRITICAL (CVSS 9.8/10.0 via SIM-VULN-XML-001). Source vulnerability severity is evaluated as-is without modification.",
        "Downstream Blast Radius: Directly consumed by 1 component(s), propagating transitively to 2 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 1 Internal tool(s) ['Legacy Fiscal Report Tool'].",
        "Structural Importance: Has a structural score of 15.3/100, with low pathway multiplexing. Bottleneck Centrality: 0.0.",
        "Severity Deflation: Despite Critical CVSS 9.8, its blast radius is strictly isolated to 1 internal offline tool with 0 production exposure."
      ],
      "remediationAction": "SCHEDULED REMEDIATION: High technical flaw severity, but blast radius is confined to offline/internal tools."
    },
    "auth-core": {
      "nodeId": "auth-core",
      "nodeName": "auth-core",
      "priorityRank": 6,
      "priorityScore": 28.9,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 29.4,
      "affectedAppsCount": 2,
      "affectedNodesCount": 3,
      "summaryHeadline": "Priority #6 \u2014 Structural Foundation (28.9 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 2 component(s), propagating transitively to 3 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 2 Tier-1 Production service(s) ['Customer Web Portal', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 29.4/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0238. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "oauth-adapter": {
      "nodeId": "oauth-adapter",
      "nodeName": "oauth-adapter",
      "priorityRank": 10,
      "priorityScore": 22.8,
      "cvssScore": 3.1,
      "cvssSeverity": "LOW",
      "structuralScore": 13.0,
      "affectedAppsCount": 1,
      "affectedNodesCount": 1,
      "summaryHeadline": "Priority #10 \u2014 Elevated Risk (22.8 / 100)",
      "rationales": [
        "Vulnerability Severity: LOW (CVSS 3.1/10.0 via SIM-VULN-OAUTH-001). Source vulnerability severity is evaluated as-is without modification.",
        "Downstream Blast Radius: Directly consumed by 1 component(s), propagating transitively to 1 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 1 Tier-1 Production service(s) ['Customer Web Portal'].",
        "Structural Importance: Has a structural score of 13.0/100, with low pathway multiplexing. Bottleneck Centrality: 0.0048.",
        "Balanced Profile: Severity (3.1) combined with reach across 1 application(s)."
      ],
      "remediationAction": "STANDARD SPRINT REMEDIATION: Review dependency upgrade and run regression tests on affected components."
    },
    "token-validator": {
      "nodeId": "token-validator",
      "nodeName": "token-validator",
      "priorityRank": 7,
      "priorityScore": 27.4,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 26.5,
      "affectedAppsCount": 2,
      "affectedNodesCount": 2,
      "summaryHeadline": "Priority #7 \u2014 Structural Foundation (27.4 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 2 component(s), propagating transitively to 2 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 2 Tier-1 Production service(s) ['Customer Web Portal', 'Inventory & Order API'].",
        "Structural Importance: Has a structural score of 26.5/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.019. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "db-pool": {
      "nodeId": "db-pool",
      "nodeName": "db-pool",
      "priorityRank": 8,
      "priorityScore": 27.0,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 25.9,
      "affectedAppsCount": 2,
      "affectedNodesCount": 2,
      "summaryHeadline": "Priority #8 \u2014 Structural Foundation (27.0 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 2 component(s), propagating transitively to 2 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 2 Tier-1 Production service(s) ['Inventory & Order API', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 25.9/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0095. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "sql-sanitizer": {
      "nodeId": "sql-sanitizer",
      "nodeName": "sql-sanitizer",
      "priorityRank": 2,
      "priorityScore": 50.5,
      "cvssScore": 7.5,
      "cvssSeverity": "HIGH",
      "structuralScore": 28.0,
      "affectedAppsCount": 2,
      "affectedNodesCount": 3,
      "summaryHeadline": "Priority #2 \u2014 Elevated Risk (50.5 / 100)",
      "rationales": [
        "Vulnerability Severity: HIGH (CVSS 7.5/10.0 via SIM-VULN-SQL-001). Source vulnerability severity is evaluated as-is without modification.",
        "Downstream Blast Radius: Directly consumed by 1 component(s), propagating transitively to 3 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 2 Tier-1 Production service(s) ['Inventory & Order API', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 28.0/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Balanced Profile: Severity (7.5) combined with reach across 2 application(s)."
      ],
      "remediationAction": "STANDARD SPRINT REMEDIATION: Review dependency upgrade and run regression tests on affected components."
    },
    "logging-facade": {
      "nodeId": "logging-facade",
      "nodeName": "logging-facade",
      "priorityRank": 5,
      "priorityScore": 29.3,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 30.7,
      "affectedAppsCount": 2,
      "affectedNodesCount": 4,
      "summaryHeadline": "Priority #5 \u2014 Structural Foundation (29.3 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 3 component(s), propagating transitively to 4 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 2 Tier-1 Production service(s) ['Customer Web Portal', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 30.7/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "cloud-metrics": {
      "nodeId": "cloud-metrics",
      "nodeName": "cloud-metrics",
      "priorityRank": 11,
      "priorityScore": 13.3,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 12.7,
      "affectedAppsCount": 1,
      "affectedNodesCount": 1,
      "summaryHeadline": "Priority #11 \u2014 Structural Foundation (13.3 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 1 component(s), propagating transitively to 1 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 1 Tier-1 Production service(s) ['Inventory & Order API'].",
        "Structural Importance: Has a structural score of 12.7/100, with low pathway multiplexing. Bottleneck Centrality: 0.0.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "json-serializer": {
      "nodeId": "json-serializer",
      "nodeName": "json-serializer",
      "priorityRank": 9,
      "priorityScore": 26.7,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 25.3,
      "affectedAppsCount": 2,
      "affectedNodesCount": 2,
      "summaryHeadline": "Priority #9 \u2014 Structural Foundation (26.7 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 2 component(s), propagating transitively to 2 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 2 Tier-1 Production service(s) ['Inventory & Order API', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 25.3/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "crypto-primitives": {
      "nodeId": "crypto-primitives",
      "nodeName": "crypto-primitives",
      "priorityRank": 3,
      "priorityScore": 45.3,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 48.7,
      "affectedAppsCount": 3,
      "affectedNodesCount": 7,
      "summaryHeadline": "Priority #3 \u2014 Structural Foundation (45.3 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 1 component(s), propagating transitively to 7 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 3 Tier-1 Production service(s) ['Customer Web Portal', 'Inventory & Order API', 'Payment Gateway Service'].",
        "Structural Importance: Has a structural score of 48.7/100, indicating high downstream reach and structural importance in the dependency ecosystem. Bottleneck Centrality: 0.0. It resides on critical multiplexed paths where multiple downstream services converge.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    },
    "legacy-xml-reader": {
      "nodeId": "legacy-xml-reader",
      "nodeName": "legacy-xml-reader",
      "priorityRank": 12,
      "priorityScore": 5.5,
      "cvssScore": 0.0,
      "cvssSeverity": "NONE",
      "structuralScore": 13.0,
      "affectedAppsCount": 1,
      "affectedNodesCount": 1,
      "summaryHeadline": "Priority #12 \u2014 Structural Foundation (5.5 / 100)",
      "rationales": [
        "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version.",
        "Downstream Blast Radius: Directly consumed by 1 component(s), propagating transitively to 1 total components across the ecosystem.",
        "Mission-Critical Application Exposure: Compromise reaches 1 Internal tool(s) ['Legacy Fiscal Report Tool'].",
        "Structural Importance: Has a structural score of 13.0/100, with low pathway multiplexing. Bottleneck Centrality: 0.0048.",
        "Architectural Importance: No active exploit, but serves as foundational backbone."
      ],
      "remediationAction": "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
    }
  }
};
