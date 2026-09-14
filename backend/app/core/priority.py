from typing import List, Dict, Any
import networkx as nx
from app.models.schemas import MitigationRankItem, MitigationRankingResponse
from app.core.structural import compute_structural_metrics

def calculate_mitigation_rankings(graph: nx.DiGraph) -> MitigationRankingResponse:
    """
    Layer 4: Mitigation Priority Ranking
    Integrates:
      1. Vulnerability Severity (CVSS)
      2. Structural Importance (Topology & Bottlenecks)
      3. Downstream Reach & Critical Application Penetration
    Produces an explainable, deterministic leaderboard.
    """
    # Ensure structural metrics are populated
    compute_structural_metrics(graph)

    packages = [
        (n, d) for n, d in graph.nodes(data=True)
        if d.get("type") == "package"
    ]

    all_apps = {n: d for n, d in graph.nodes(data=True) if d.get("type") == "application"}
    total_prod_apps = sum(1 for d in all_apps.values() if d.get("tier") == "production")
    total_int_apps = sum(1 for d in all_apps.values() if d.get("tier") != "production")
    max_app_weight = max(1.0, (1.5 * total_prod_apps) + (0.5 * total_int_apps))

    ranked_items = []

    for node_id, data in packages:
        vuln = data.get("vulnerability", {})
        cvss_score = float(vuln.get("cvssScore", 0.0))
        cvss_severity = vuln.get("cvssSeverity", "NONE")

        metrics = data.get("structuralMetrics", {})
        downstream_reach = metrics.get("downstreamReach", 0)
        downstream_ratio = metrics.get("downstreamReachRatio", 0.0)
        bottleneck_score = metrics.get("bottleneckScore", 0.0)
        structural_score = metrics.get("structuralScore", 0.0)

        # Count affected applications and tier breakdown
        descendants = nx.descendants(graph, node_id)
        affected_apps = [all_apps[aid] for aid in descendants if aid in all_apps]
        affected_apps_count = len(affected_apps)
        prod_apps_count = sum(1 for a in affected_apps if a.get("tier") == "production")
        int_apps_count = sum(1 for a in affected_apps if a.get("tier") != "production")

        weighted_app_impact = ((1.5 * prod_apps_count) + (0.5 * int_apps_count)) / max_app_weight

        # Priority calculation formula
        # If node has no vulnerability, base cvss is 0.0
        v_norm = cvss_score / 10.0
        b_norm = min(1.0, bottleneck_score * 3.0)

        # Formula: 30% CVSS + 40% Application Exposure + 20% Downstream Reach + 10% Bottleneck
        composite_score = (
            0.30 * v_norm +
            0.40 * weighted_app_impact +
            0.20 * downstream_ratio +
            0.10 * b_norm
        )
        priority_score = round(composite_score * 100.0, 1)

        is_choke = bottleneck_score > 0.05 or (affected_apps_count >= 2 and downstream_reach >= 4)

        # Summary bullet
        if cvss_score > 0:
            if affected_apps_count >= 3:
                summary = (
                    f"CRITICAL SYSTEMIC RISK: Affects {affected_apps_count} apps ({prod_apps_count} prod) "
                    f"despite {cvss_severity} CVSS ({cvss_score}). Immediate mitigation required."
                )
            elif affected_apps_count == 1 and int_apps_count == 1:
                summary = (
                    f"LOCALIZED RISK: High CVSS ({cvss_score}), but blast radius is isolated to "
                    f"1 non-critical internal tool."
                )
            else:
                summary = (
                    f"MODERATE RISK: {cvss_severity} severity ({cvss_score}) affecting "
                    f"{affected_apps_count} application(s)."
                )
        else:
            summary = (
                f"STRUCTURAL CARRIER: No active CVE, but structural score is {structural_score} "
                f"supporting {downstream_reach} downstream dependencies."
            )

        ranked_items.append({
            "nodeId": node_id,
            "nodeName": data.get("name", node_id),
            "nodeType": data.get("type", "package"),
            "version": data.get("version", "1.0.0"),
            "cvssScore": cvss_score,
            "cvssSeverity": cvss_severity,
            "structuralScore": structural_score,
            "downstreamReachCount": downstream_reach,
            "affectedApplicationsCount": affected_apps_count,
            "productionAppsCount": prod_apps_count,
            "internalAppsCount": int_apps_count,
            "priorityScore": priority_score,
            "isChokePoint": is_choke,
            "explanationSummary": summary
        })

    # Sort packages strictly by Priority Score descending (highest score first)
    # Deterministic secondary tie-breaking: affected apps, CVSS score, then alphabetically by package name
    ranked_items.sort(
        key=lambda x: (
            -x["priorityScore"],
            -x["affectedApplicationsCount"],
            -x["cvssScore"],
            x["nodeName"].lower(),
            x["nodeId"]
        )
    )

    # Assign 1-indexed ranks
    final_rankings: List[MitigationRankItem] = []
    for idx, item in enumerate(ranked_items, start=1):
        final_rankings.append(MitigationRankItem(rank=idx, **item))

    methodology = {
        "formula": "Priority Score = 100 * (0.30 * (CVSS/10) + 0.40 * (WeightedAppImpact) + 0.20 * (DownstreamReachRatio) + 0.10 * (BottleneckNorm))",
        "rationale": "Balances intrinsic flaw severity with blast-radius amplification across mission-critical application infrastructure.",
        "weights": {
            "vulnerabilitySeverity": "30%",
            "applicationExposure": "40%",
            "downstreamReach": "20%",
            "bottleneckCentrality": "10%"
        }
    }

    return MitigationRankingResponse(rankings=final_rankings, methodology=methodology)
