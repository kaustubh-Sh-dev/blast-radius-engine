from typing import Dict, Any, List
import networkx as nx
from app.models.schemas import ExplanationBreakdown
from app.core.priority import calculate_mitigation_rankings

def generate_explanation(graph: nx.DiGraph, node_id: str) -> ExplanationBreakdown:
    """
    Explainability Engine:
    Answers 'Why?' for every package's mitigation priority ranking.
    Produces human-readable, deterministic justifications decoupling
    Vulnerability Severity, Structural Importance, Downstream Impact, and Mitigation Priority.
    """
    if not graph.has_node(node_id):
        raise ValueError(f"Node '{node_id}' does not exist in the graph.")

    node_data = graph.nodes[node_id]
    vuln = node_data.get("vulnerability", {})
    cvss_score = float(vuln.get("cvssScore", 0.0))
    cvss_severity = vuln.get("cvssSeverity", "NONE")
    cve_id = vuln.get("cveId", "None")

    # Get rankings to find the rank
    rankings_response = calculate_mitigation_rankings(graph)
    rank_item = next((r for r in rankings_response.rankings if r.nodeId == node_id), None)
    rank = rank_item.rank if rank_item else 999
    priority_score = rank_item.priorityScore if rank_item else 0.0

    # Downstream analysis
    descendants = nx.descendants(graph, node_id)
    all_apps = {n: d for n, d in graph.nodes(data=True) if d.get("type") == "application"}
    affected_apps = [all_apps[aid] for aid in descendants if aid in all_apps]
    prod_apps = [a for a in affected_apps if a.get("tier") == "production"]
    int_apps = [a for a in affected_apps if a.get("tier") != "production"]

    direct_dependents = list(graph.successors(node_id))
    structural_metrics = node_data.get("structuralMetrics", {})
    structural_score = structural_metrics.get("structuralScore", 0.0)
    bottleneck_score = structural_metrics.get("bottleneckScore", 0.0)

    rationales: List[str] = []

    # Point 1: Vulnerability Severity (Layer 1)
    if cvss_score > 0:
        rationales.append(
            f"Vulnerability Severity: {cvss_severity} (CVSS {cvss_score}/10.0 via {cve_id}). "
            f"Source vulnerability severity is evaluated as-is without modification."
        )
    else:
        rationales.append(
            "Vulnerability Severity: NONE (CVSS 0.0). No known public CVE recorded for this version."
        )

    # Point 2: Downstream Reach & Impact (Layer 3)
    rationales.append(
        f"Downstream Blast Radius: Directly consumed by {len(direct_dependents)} component(s), "
        f"propagating transitively to {len(descendants)} total components across the ecosystem."
    )

    # Point 3: Application Exposure (Layer 3)
    if len(affected_apps) > 0:
        prod_names = ", ".join([f"'{a.get('name', '')}'" for a in prod_apps])
        int_names = ", ".join([f"'{a.get('name', '')}'" for a in int_apps])
        app_summary_parts = []
        if prod_apps:
            app_summary_parts.append(f"{len(prod_apps)} Tier-1 Production service(s) [{prod_names}]")
        if int_apps:
            app_summary_parts.append(f"{len(int_apps)} Internal tool(s) [{int_names}]")
        rationales.append(
            f"Mission-Critical Application Exposure: Compromise reaches {' and '.join(app_summary_parts)}."
        )
    else:
        rationales.append(
            "Application Exposure: 0 top-level applications reached (isolated leaf or unused branch)."
        )

    # Point 4: Structural Importance & Topology (Layer 2)
    if bottleneck_score > 0.05 or len(affected_apps) >= 2:
        rationales.append(
            f"Structural Importance: Has a structural score of {structural_score}/100, "
            f"indicating high downstream reach and structural importance in the dependency ecosystem. "
            f"Bottleneck Centrality: {bottleneck_score}. "
            f"It resides on critical multiplexed paths where multiple downstream services converge."
        )
    else:
        rationales.append(
            f"Structural Importance: Has a structural score of {structural_score}/100, "
            f"with low pathway multiplexing. Bottleneck Centrality: {bottleneck_score}."
        )

    # Point 5: Synthesis / "Why is it ranked here?" (Layer 4)
    if rank == 1:
        headline = f"Priority #1 — Highest Systemic Threat ({priority_score} / 100)"
        action = "IMMEDIATE MITIGATION: Patch or quarantine in the next deployment cycle ahead of higher-CVSS leaf libraries."
        rationales.append(
            f"Systemic Inversion: Ranked Priority #1 because widespread production reach "
            f"({len(prod_apps)} mission-critical applications) outweighs raw CVSS score alone."
        )
    elif cvss_score >= 9.0 and len(affected_apps) <= 1 and len(prod_apps) == 0:
        headline = f"Priority #{rank} — Localized Critical Severity ({priority_score} / 100)"
        action = "SCHEDULED REMEDIATION: High technical flaw severity, but blast radius is confined to offline/internal tools."
        rationales.append(
            f"Severity Deflation: Despite Critical CVSS {cvss_score}, its blast radius is strictly isolated to "
            f"1 internal offline tool with 0 production exposure."
        )
    elif cvss_score > 0:
        headline = f"Priority #{rank} — Elevated Risk ({priority_score} / 100)"
        action = "STANDARD SPRINT REMEDIATION: Review dependency upgrade and run regression tests on affected components."
        rationales.append(
            f"Balanced Profile: Severity ({cvss_score}) combined with reach across {len(affected_apps)} application(s)."
        )
    else:
        headline = f"Priority #{rank} — Structural Foundation ({priority_score} / 100)"
        action = "CONTINUOUS MONITORING: Maintain zero-day monitoring due to high architectural reach."
        rationales.append(
            "Architectural Importance: No active exploit, but serves as foundational backbone."
        )

    return ExplanationBreakdown(
        nodeId=node_id,
        nodeName=node_data.get("name", node_id),
        priorityRank=rank,
        priorityScore=priority_score,
        cvssScore=cvss_score,
        cvssSeverity=cvss_severity,
        structuralScore=structural_score,
        affectedAppsCount=len(affected_apps),
        affectedNodesCount=len(descendants),
        summaryHeadline=headline,
        rationales=rationales,
        remediationAction=action
    )
