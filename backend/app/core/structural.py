from typing import Dict, Any
import networkx as nx
from app.models.schemas import StructuralMetrics

def compute_structural_metrics(graph: nx.DiGraph) -> Dict[str, StructuralMetrics]:
    """
    Layer 2: Structural Importance
    Computes graph-theoretic structural metrics for all nodes in the ecosystem.
    Independent of vulnerability severity.
    """
    total_nodes = graph.number_of_nodes()
    all_apps = [n for n, d in graph.nodes(data=True) if d.get("type") == "application"]
    total_apps = max(1, len(all_apps))

    # Compute betweenness centrality on the directed graph
    betweenness = nx.betweenness_centrality(graph, normalized=True)

    metrics_map: Dict[str, StructuralMetrics] = {}

    for node_id in graph.nodes():
        node_data = graph.nodes[node_id]
        node_type = node_data.get("type", "package")

        # Reachable downstream nodes (descendants in supplier->consumer graph)
        descendants = nx.descendants(graph, node_id)
        downstream_reach = len(descendants)
        downstream_reach_ratio = downstream_reach / max(1, total_nodes - 1)

        # Direct dependents (out-degree)
        direct_dependents = set(graph.successors(node_id))
        direct_count = len(direct_dependents)

        # Affected applications
        affected_apps = descendants.intersection(all_apps)
        if node_type == "application":
            # An application itself is not its own downstream affected application
            pass
        affected_apps_count = len(affected_apps)
        affected_apps_ratio = affected_apps_count / total_apps

        # Transitive package dependents
        transitive_dependents = descendants - direct_dependents - set(all_apps)
        transitive_count = len(transitive_dependents)

        # Bottleneck score from betweenness
        b_score = round(betweenness.get(node_id, 0.0), 4)

        # Structural score (0.0 to 100.0)
        # Emphasizes systemic reach, direct impact on top-level apps, and structural choke position
        raw_structural = (
            0.40 * downstream_reach_ratio +
            0.40 * affected_apps_ratio +
            0.20 * min(1.0, b_score * 3.0)  # Scale betweenness appropriately for small graphs
        )
        structural_score = round(min(100.0, raw_structural * 100.0), 1)

        metric = StructuralMetrics(
            downstreamReach=downstream_reach,
            downstreamReachRatio=round(downstream_reach_ratio, 3),
            directDependentsCount=direct_count,
            transitiveDependentsCount=transitive_count,
            affectedApplicationsCount=affected_apps_count,
            affectedApplicationsRatio=round(affected_apps_ratio, 3),
            bottleneckScore=b_score,
            structuralScore=structural_score
        )

        metrics_map[node_id] = metric
        # Cache on the graph node
        graph.nodes[node_id]["structuralMetrics"] = metric.model_dump()

    return metrics_map
