import pytest
from app.core.graph_engine import GraphEngine
from app.core.priority import calculate_mitigation_rankings
from app.core.explainer import generate_explanation

def test_mitigation_priority_ranking():
    engine = GraphEngine()
    g = engine.get_graph()

    ranking_resp = calculate_mitigation_rankings(g)
    rankings = ranking_resp.rankings

    assert len(rankings) > 0

    # Locate Package A and Package B in the ranking
    pkg_b = next((r for r in rankings if r.nodeId == "session-crypt-helper"), None)
    pkg_a = next((r for r in rankings if r.nodeId == "xml-entity-parser"), None)

    assert pkg_b is not None
    assert pkg_a is not None

    # Core thesis verification: Package B MUST rank higher than Package A
    # Lower rank number = higher remediation priority (Rank 1 is highest priority)
    assert pkg_b.rank < pkg_a.rank
    assert pkg_b.priorityScore > pkg_a.priorityScore
    assert pkg_b.rank == 1  # Package B should be the #1 priority

def test_explanation_engine():
    engine = GraphEngine()
    g = engine.get_graph()

    exp_b = generate_explanation(g, "session-crypt-helper")
    assert exp_b.priorityRank == 1
    assert len(exp_b.rationales) >= 4
    # Verify that the rationales explicitly explain why it's prioritized despite lower CVSS
    full_text = " ".join(exp_b.rationales)
    assert "CVSS 5.3" in full_text
    assert "Tier-1 Production" in full_text
    assert exp_b.remediationAction != ""

    exp_a = generate_explanation(g, "xml-entity-parser")
    assert exp_a.priorityRank > 1
    assert exp_a.cvssScore == 9.8
    assert "internal" in " ".join(exp_a.rationales).lower()
