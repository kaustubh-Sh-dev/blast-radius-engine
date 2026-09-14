import pytest
from app.core.graph_engine import GraphEngine
from app.core.structural import compute_structural_metrics

def test_graph_loading():
    engine = GraphEngine()
    g = engine.get_graph()
    assert g.number_of_nodes() > 0
    assert g.number_of_edges() > 0

    apps = engine.get_all_applications()
    pkgs = engine.get_all_packages()
    assert len(apps) == 4
    assert len(pkgs) == 12
    assert "payment-gateway" in apps
    assert "session-crypt-helper" in pkgs
    assert "xml-entity-parser" in pkgs

def test_structural_metrics_computation():
    engine = GraphEngine()
    g = engine.get_graph()
    metrics = compute_structural_metrics(g)
    
    assert "session-crypt-helper" in metrics
    assert "xml-entity-parser" in metrics
    
    m_b = metrics["session-crypt-helper"]
    m_a = metrics["xml-entity-parser"]
    
    # Package B must have significantly greater downstream reach and app exposure than Package A
    assert m_b.downstreamReach > m_a.downstreamReach
    assert m_b.affectedApplicationsCount > m_a.affectedApplicationsCount
    assert m_b.structuralScore > m_a.structuralScore
