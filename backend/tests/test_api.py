from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"

def test_graph_endpoint():
    res = client.get("/api/graph")
    assert res.status_code == 200
    data = res.json()
    assert len(data["nodes"]) == 16
    assert len(data["edges"]) == 19
    # Check that structural metrics are present
    pkg_b = next((n for n in data["nodes"] if n["id"] == "session-crypt-helper"), None)
    assert pkg_b is not None
    assert pkg_b["structuralMetrics"] is not None
    assert pkg_b["structuralMetrics"]["structuralScore"] > 0

def test_scenarios_endpoint():
    res = client.get("/api/scenarios")
    assert res.status_code == 200
    scenarios = res.json()
    assert len(scenarios) >= 2
    assert scenarios[0]["id"] == "scenario-ripple-effect"

def test_simulate_endpoint():
    payload = {"nodeId": "session-crypt-helper"}
    res = client.post("/api/simulate", json=payload)
    assert res.status_code == 200
    sim = res.json()
    assert sim["compromisedNode"]["id"] == "session-crypt-helper"
    assert len(sim["affectedApplications"]) == 3
    assert sim["blastRadiusMetrics"]["productionAppsCompromised"] == 3
    assert len(sim["highlightNodeIds"]) > 0
    assert len(sim["highlightEdgeIds"]) > 0

def test_mitigation_ranking_endpoint():
    res = client.get("/api/mitigation-ranking")
    assert res.status_code == 200
    data = res.json()
    assert len(data["rankings"]) > 0
    top = data["rankings"][0]
    assert top["nodeId"] == "session-crypt-helper"
    assert top["rank"] == 1
    assert "methodology" in data

def test_explain_endpoint():
    res = client.get("/api/explain/session-crypt-helper")
    assert res.status_code == 200
    exp = res.json()
    assert exp["nodeId"] == "session-crypt-helper"
    assert exp["priorityRank"] == 1
    assert len(exp["rationales"]) >= 4
