# Blast Radius Engine — Open Source Supply Chain Risk & Downstream Propagation Analyzer

> **Manipal Hackathon 2026** — Cybersecurity Track: *"Open Source Supply Chains: The Ripple Effect"*

## Core Thesis
A dependency's security importance is **not determined solely by its raw CVSS vulnerability severity**. A lower-severity dependency (e.g. CVSS 5.3 Medium) can be far more critical to remediate if compromising it cascades across foundational infrastructure to poison mission-critical production applications.

---

## The Four Distinct Layers
The Blast Radius Engine strictly decouples measurement from recommendation across four explicit layers:

| Layer | Dimension | Measurement | Description |
|---|---|---|---|
| **Layer 1** | **Vulnerability Severity** | CVSS Base Score (0.0 - 10.0) | Public, unmodified CVE severity score & vectors. |
| **Layer 2** | **Structural Importance** | Graph Centrality & Choke Points | Systemic reach, in/out degree, and betweenness bottleneck score across the ecosystem. |
| **Layer 3** | **Downstream Impact** | Concrete Reachability | Direct dependents, transitive consumers, affected enterprise applications, and exact propagation paths. |
| **Layer 4** | **Mitigation Priority** | Explainable Synthesis (0 - 100) | Composite risk index ranking packages with explicit natural-language justifications answering **"Why?"**. |

---

## Hackathon Demo Scenario: The Ripple Effect

| Metric | Package A: `xml-entity-parser` | Package B: `session-crypt-helper` |
|---|---|---|
| **Raw CVSS Severity** | **9.8 (CRITICAL)** RCE | **5.3 (MEDIUM)** Session entropy |
| **Downstream Reach** | 2 total nodes | **6 total nodes** |
| **Affected Applications** | 1 Internal Offline Tool (`legacy-report-generator`) | **3 Tier-1 Production Services** (`payment-gateway`, `user-portal`, `inventory-api`) |
| **Structural Position** | Isolated leaf branch | Central choke point for authentication & token state |
| **Engine Mitigation Rank** | **Priority #4** (Score: 36.1) | **Priority #1** (Score: 60.8) |
| **Remediation Action** | Scheduled maintenance (isolated impact) | **Immediate Patch / Quarantine** |

---

## Technology Stack
- **Frontend**: React 19, Vite, Cytoscape.js (`cytoscape-dagre`), Lucide React
- **Backend**: Python 3.14, FastAPI, NetworkX, Uvicorn, Pydantic v2

---

## How to Run

### 1. Backend Server
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000
```
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 2. Frontend Application
```bash
cd frontend
npm install
npm run dev -- --port 5173
```
- Web Console: [http://localhost:5173](http://localhost:5173)

### 3. Run Automated Tests
```bash
python -m pytest -v
```
All 11 unit & integration tests verify:
- Graph loading and node classification
- Structural centrality metrics calculation
- Package A vs Package B propagation path reconstruction
- Mitigation priority formula and explainability generation
- All FastAPI REST endpoints
