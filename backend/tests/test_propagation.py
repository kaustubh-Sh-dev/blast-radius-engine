import pytest
from app.core.graph_engine import GraphEngine
from app.core.propagation import simulate_compromise

def test_package_a_vs_package_b_propagation():
    engine = GraphEngine()
    g = engine.get_graph()

    # Package A: xml-entity-parser (CVSS 9.8 Critical, but leaf)
    sim_a = simulate_compromise(g, "xml-entity-parser")
    assert sim_a.compromisedNode.id == "xml-entity-parser"
    assert sim_a.compromisedNode.vulnerability.cvssScore == 9.8
    assert sim_a.blastRadiusMetrics.affectedApplicationsCount == 1
    assert sim_a.blastRadiusMetrics.productionAppsCompromised == 0
    assert len(sim_a.affectedApplications) == 1
    assert sim_a.affectedApplications[0].applicationId == "legacy-report-generator"
    assert sim_a.affectedApplications[0].tier == "internal"
    assert len(sim_a.affectedApplications[0].paths) == 1
    assert sim_a.affectedApplications[0].paths[0] == [
        "xml-entity-parser",
        "legacy-xml-reader",
        "legacy-report-generator"
    ]

    # Package B: session-crypt-helper (CVSS 5.3 Medium, but foundational choke point)
    sim_b = simulate_compromise(g, "session-crypt-helper")
    assert sim_b.compromisedNode.id == "session-crypt-helper"
    assert sim_b.compromisedNode.vulnerability.cvssScore == 5.3
    assert sim_b.blastRadiusMetrics.affectedApplicationsCount == 3
    assert sim_b.blastRadiusMetrics.productionAppsCompromised == 3
    assert sim_b.blastRadiusMetrics.affectedNodesCount >= 6

    # Verify all 3 Tier-1 applications are affected
    affected_app_ids = {a.applicationId for a in sim_b.affectedApplications}
    assert "payment-gateway" in affected_app_ids
    assert "user-portal" in affected_app_ids
    assert "inventory-api" in affected_app_ids

    # Verify paths exist and are non-empty for every affected application
    for app_impact in sim_b.affectedApplications:
        assert len(app_impact.paths) > 0
        assert len(app_impact.readablePaths) > 0
        assert app_impact.paths[0][0] == "session-crypt-helper"
        assert app_impact.paths[0][-1] == app_impact.applicationId
