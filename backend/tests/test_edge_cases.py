import math
import pytest
import networkx as nx
from fastapi.testclient import TestClient

from app.main import app
from app.core.structural import compute_structural_metrics
from app.core.priority import calculate_mitigation_rankings
from app.core.propagation import simulate_compromise
from app.core.explainer import generate_explanation

client = TestClient(app)

def test_edge_case_a_empty_graph():
    """A. Empty graph: should produce empty rankings and metrics without exceptions."""
    g = nx.DiGraph()
    metrics = compute_structural_metrics(g)
    ranking_resp = calculate_mitigation_rankings(g)
    assert len(metrics) == 0
    assert len(ranking_resp.rankings) == 0
    assert "formula" in ranking_resp.methodology

def test_edge_case_b_single_node():
    """B. Single node: package node and application node."""
    # Single package
    g_pkg = nx.DiGraph()
    g_pkg.add_node("pkg-solo", id="pkg-solo", name="Solo Package", version="1.0.0",
                   type="package", vulnerability={"cvssScore": 6.0, "cvssSeverity": "MEDIUM"})
    m_pkg = compute_structural_metrics(g_pkg)
    r_pkg = calculate_mitigation_rankings(g_pkg)
    assert len(r_pkg.rankings) == 1
    assert r_pkg.rankings[0].nodeId == "pkg-solo"
    assert r_pkg.rankings[0].downstreamReachCount == 0
    assert r_pkg.rankings[0].affectedApplicationsCount == 0
    # Score is 30% of (6.0/10.0) = 0.18 * 100 = 18.0
    assert r_pkg.rankings[0].priorityScore == 18.0

    # Single application
    g_app = nx.DiGraph()
    g_app.add_node("app-solo", id="app-solo", name="Solo App", version="1.0.0",
                   type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    r_app = calculate_mitigation_rankings(g_app)
    assert len(r_app.rankings) == 0  # Applications are targets, not ranked packages

def test_edge_case_c_simple_ab():
    """C. Simple A -> B: One package consumed directly by one production app."""
    g = nx.DiGraph()
    g.add_node("pkg-a", id="pkg-a", name="Package A", version="1.0.0",
               type="package", vulnerability={"cvssScore": 5.0, "cvssSeverity": "MEDIUM"})
    g.add_node("app-b", id="app-b", name="App B", version="1.0.0",
               type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("pkg-a", "app-b", id="pkg-a->app-b")

    sim = simulate_compromise(g, "pkg-a")
    assert sim.blastRadiusMetrics.affectedNodesCount == 1
    assert sim.blastRadiusMetrics.affectedApplicationsCount == 1
    assert sim.blastRadiusMetrics.productionAppsCompromised == 1
    assert len(sim.affectedApplications) == 1
    assert sim.affectedApplications[0].hopDistance == 1
    assert sim.affectedApplications[0].paths[0] == ["pkg-a", "app-b"]

def test_edge_case_d_linear_abc():
    """D. A -> B -> C: Transitive cascade across multiple hops."""
    g = nx.DiGraph()
    g.add_node("pkg-a", id="pkg-a", name="Package A", version="1.0.0",
               type="package", vulnerability={"cvssScore": 4.0, "cvssSeverity": "MEDIUM"})
    g.add_node("pkg-b", id="pkg-b", name="Package B", version="1.0.0",
               type="package", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_node("app-c", id="app-c", name="App C", version="1.0.0",
               type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("pkg-a", "pkg-b", id="pkg-a->pkg-b")
    g.add_edge("pkg-b", "app-c", id="pkg-b->app-c")

    sim_a = simulate_compromise(g, "pkg-a")
    assert sim_a.blastRadiusMetrics.affectedNodesCount == 2
    assert sim_a.blastRadiusMetrics.maxPropagationDepth == 2
    assert len(sim_a.directDependents) == 1
    assert sim_a.directDependents[0].id == "pkg-b"
    assert len(sim_a.transitiveDependents) == 0  # App C is classified as application impact
    assert sim_a.affectedApplications[0].hopDistance == 2

    sim_b = simulate_compromise(g, "pkg-b")
    assert sim_b.blastRadiusMetrics.affectedNodesCount == 1
    assert sim_b.affectedApplications[0].hopDistance == 1

def test_edge_case_e_branching_graph():
    """E. Branching graph: One package fanning out to multiple applications."""
    g = nx.DiGraph()
    g.add_node("pkg-core", id="pkg-core", name="Core", version="1.0.0",
               type="package", vulnerability={"cvssScore": 8.0, "cvssSeverity": "HIGH"})
    for i in range(3):
        app_id = f"app-{i}"
        g.add_node(app_id, id=app_id, name=f"App {i}", version="1.0.0",
                   type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
        g.add_edge("pkg-core", app_id, id=f"pkg-core->{app_id}")

    sim = simulate_compromise(g, "pkg-core")
    assert sim.blastRadiusMetrics.affectedApplicationsCount == 3
    assert len(sim.affectedApplications) == 3
    assert all(a.hopDistance == 1 for a in sim.affectedApplications)

def test_edge_case_f_merging_graph():
    """F. Merging graph: Multiple packages converging into one shared application."""
    g = nx.DiGraph()
    g.add_node("app-main", id="app-main", name="Main App", version="1.0.0",
               type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    for i in range(3):
        pkg_id = f"pkg-{i}"
        g.add_node(pkg_id, id=pkg_id, name=f"Pkg {i}", version="1.0.0",
                   type="package", vulnerability={"cvssScore": 5.0, "cvssSeverity": "MEDIUM"})
        g.add_edge(pkg_id, "app-main", id=f"{pkg_id}->app-main")

    for i in range(3):
        sim = simulate_compromise(g, f"pkg-{i}")
        assert sim.blastRadiusMetrics.affectedApplicationsCount == 1
        assert sim.affectedApplications[0].applicationId == "app-main"

def test_edge_case_g_disconnected_nodes():
    """G. Disconnected components: Compromise in component 1 should not affect component 2."""
    g = nx.DiGraph()
    # Component 1
    g.add_node("p1", id="p1", name="P1", version="1.0", type="package", vulnerability={"cvssScore": 6.0, "cvssSeverity": "MEDIUM"})
    g.add_node("a1", id="a1", name="A1", version="1.0", type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("p1", "a1", id="p1->a1")
    # Component 2 (Isolated)
    g.add_node("p2", id="p2", name="P2", version="1.0", type="package", vulnerability={"cvssScore": 9.0, "cvssSeverity": "CRITICAL"})
    g.add_node("a2", id="a2", name="A2", version="1.0", type="application", tier="internal", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("p2", "a2", id="p2->a2")

    sim1 = simulate_compromise(g, "p1")
    affected_ids_1 = {a.applicationId for a in sim1.affectedApplications}
    assert "a1" in affected_ids_1
    assert "a2" not in affected_ids_1

def test_edge_case_h_multiple_production_applications():
    """H. Multiple production applications vs internal applications impact weighting."""
    g = nx.DiGraph()
    g.add_node("pkg-prod-heavy", id="pkg-prod-heavy", name="Prod Heavy", version="1.0",
               type="package", vulnerability={"cvssScore": 5.0, "cvssSeverity": "MEDIUM"})
    g.add_node("pkg-int-heavy", id="pkg-int-heavy", name="Int Heavy", version="1.0",
               type="package", vulnerability={"cvssScore": 5.0, "cvssSeverity": "MEDIUM"})

    # 2 production apps for pkg-prod-heavy
    for i in range(2):
        aid = f"prod-app-{i}"
        g.add_node(aid, id=aid, name=aid, version="1.0", type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
        g.add_edge("pkg-prod-heavy", aid, id=f"pkg-prod-heavy->{aid}")

    # 2 internal apps for pkg-int-heavy
    for i in range(2):
        aid = f"int-app-{i}"
        g.add_node(aid, id=aid, name=aid, version="1.0", type="application", tier="internal", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
        g.add_edge("pkg-int-heavy", aid, id=f"pkg-int-heavy->{aid}")

    rankings = calculate_mitigation_rankings(g).rankings
    prod_heavy_rank = next(r for r in rankings if r.nodeId == "pkg-prod-heavy")
    int_heavy_rank = next(r for r in rankings if r.nodeId == "pkg-int-heavy")

    # Prod-heavy package must rank higher and have a higher priority score than internal-heavy
    assert prod_heavy_rank.priorityScore > int_heavy_rank.priorityScore
    assert prod_heavy_rank.rank < int_heavy_rank.rank

def test_edge_case_i_intermediate_applications():
    """I. Application consuming an application (microservice call chain)."""
    g = nx.DiGraph()
    g.add_node("pkg-base", id="pkg-base", name="Base Pkg", version="1.0", type="package",
               vulnerability={"cvssScore": 5.0, "cvssSeverity": "MEDIUM"})
    g.add_node("app-gateway", id="app-gateway", name="Gateway", version="1.0", type="application",
               tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_node("app-backend", id="app-backend", name="Backend", version="1.0", type="application",
               tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("pkg-base", "app-gateway", id="pkg-base->app-gateway")
    g.add_edge("app-gateway", "app-backend", id="app-gateway->app-backend")

    sim = simulate_compromise(g, "pkg-base")
    assert sim.blastRadiusMetrics.affectedApplicationsCount == 2
    app_ids = [a.applicationId for a in sim.affectedApplications]
    assert "app-gateway" in app_ids
    assert "app-backend" in app_ids

def test_edge_case_j_vulnerable_and_non_vulnerable_nodes():
    """J. Vulnerable vs non-vulnerable carrier nodes."""
    g = nx.DiGraph()
    g.add_node("vuln-leaf", id="vuln-leaf", name="Vuln Leaf", version="1.0", type="package",
               vulnerability={"cvssScore": 9.5, "cvssSeverity": "CRITICAL"})
    g.add_node("carrier-node", id="carrier-node", name="Carrier", version="1.0", type="package",
               vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_node("app-main", id="app-main", name="App Main", version="1.0", type="application",
               tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})

    # Carrier connects to app, vuln leaf is isolated
    g.add_edge("carrier-node", "app-main", id="carrier->app")

    rankings = calculate_mitigation_rankings(g).rankings
    carrier_item = next(r for r in rankings if r.nodeId == "carrier-node")
    leaf_item = next(r for r in rankings if r.nodeId == "vuln-leaf")

    assert carrier_item.cvssScore == 0.0
    assert leaf_item.cvssScore == 9.5
    assert carrier_item.affectedApplicationsCount == 1
    assert leaf_item.affectedApplicationsCount == 0

def test_edge_case_k_cvss_zero_and_ten():
    """K & L. Bounds testing for CVSS = 0.0 and CVSS = 10.0."""
    g = nx.DiGraph()
    g.add_node("pkg-zero", id="pkg-zero", name="Zero Pkg", version="1.0", type="package",
               vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_node("pkg-ten", id="pkg-ten", name="Ten Pkg", version="1.0", type="package",
               vulnerability={"cvssScore": 10.0, "cvssSeverity": "CRITICAL"})
    g.add_node("app-target", id="app-target", name="Target", version="1.0", type="application",
               tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("pkg-zero", "app-target", id="zero->app")
    g.add_edge("pkg-ten", "app-target", id="ten->app")

    rankings = calculate_mitigation_rankings(g).rankings
    ten_item = next(r for r in rankings if r.nodeId == "pkg-ten")
    zero_item = next(r for r in rankings if r.nodeId == "pkg-zero")

    assert 0.0 <= zero_item.priorityScore <= 100.0
    assert 0.0 <= ten_item.priorityScore <= 100.0
    assert ten_item.priorityScore > zero_item.priorityScore
    # Difference should strictly reflect the 30% CVSS contribution: 30% of (10 - 0) = 30.0 points
    assert pytest.approx(ten_item.priorityScore - zero_item.priorityScore, 0.2) == 30.0

def test_edge_case_m_missing_invalid_input():
    """M. Missing or invalid input to API endpoints."""
    # Empty body
    r1 = client.post("/api/simulate", json={})
    assert r1.status_code == 422

    # Malformed JSON
    r2 = client.post("/api/simulate", content="not json", headers={"Content-Type": "application/json"})
    assert r2.status_code == 422

    # Incorrect type (integer nodeId instead of string)
    r3 = client.post("/api/simulate", json={"nodeId": 12345})
    # Pydantic may coerce or reject, but node '12345' doesn't exist so it will be 404 or 422
    assert r3.status_code in [404, 422]

def test_edge_case_n_duplicate_data():
    """N. Duplicate edges added to graph should remain idempotent."""
    g = nx.DiGraph()
    g.add_node("p1", id="p1", name="P1", version="1.0", type="package", vulnerability={"cvssScore": 5.0, "cvssSeverity": "MEDIUM"})
    g.add_node("a1", id="a1", name="A1", version="1.0", type="application", tier="production", vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})
    g.add_edge("p1", "a1", id="p1->a1")
    g.add_edge("p1", "a1", id="p1->a1")  # duplicate

    assert g.number_of_edges() == 1
    sim = simulate_compromise(g, "p1")
    assert sim.blastRadiusMetrics.affectedNodesCount == 1

def test_edge_case_o_invalid_node_references():
    """O. Nonexistent nodes return HTTP 404."""
    r_sim = client.post("/api/simulate", json={"nodeId": "completely-unknown-node-xyz"})
    assert r_sim.status_code == 404
    assert "not found" in r_sim.json()["detail"].lower()

    r_exp = client.get("/api/explain/completely-unknown-node-xyz")
    assert r_exp.status_code == 404
    assert "not found" in r_exp.json()["detail"].lower()

def test_edge_case_p_large_graph():
    """P. Large graph (100 nodes, multi-branching) performance and stability."""
    g = nx.DiGraph()
    for i in range(80):
        g.add_node(f"pkg_{i}", id=f"pkg_{i}", name=f"Package {i}", version="1.0.0",
                   type="package", vulnerability={"cvssScore": (i % 10) + 0.5, "cvssSeverity": "MEDIUM"})
    for j in range(20):
        g.add_node(f"app_{j}", id=f"app_{j}", name=f"App {j}", version="1.0.0",
                   type="application", tier="production" if j < 10 else "internal",
                   vulnerability={"cvssScore": 0.0, "cvssSeverity": "NONE"})

    for i in range(70):
        g.add_edge(f"pkg_{i}", f"pkg_{i+1}", id=f"pkg_{i}->pkg_{i+1}")
        if i % 3 == 0:
            g.add_edge(f"pkg_{i}", f"app_{i % 20}", id=f"pkg_{i}->app_{i % 20}")

    metrics = compute_structural_metrics(g)
    assert len(metrics) == 100
    rankings = calculate_mitigation_rankings(g).rankings
    assert len(rankings) == 80

    # Verify no NaN or infinite scores
    for item in rankings:
        assert not math.isnan(item.priorityScore)
        assert not math.isinf(item.priorityScore)
        assert 0.0 <= item.priorityScore <= 100.0

    # Verify simulation runs on deep root node
    sim = simulate_compromise(g, "pkg_0")
    assert sim.blastRadiusMetrics.affectedNodesCount > 0
    assert not math.isnan(sim.blastRadiusMetrics.affectedNodesRatio)
