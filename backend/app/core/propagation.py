from typing import Dict, Any, List, Set
import networkx as nx
from app.models.schemas import (
    SimulationResult,
    GraphNode,
    ApplicationImpact,
    BlastRadiusMetrics,
    VulnerabilityInfo,
    StructuralMetrics
)

def simulate_compromise(graph: nx.DiGraph, target_node_id: str) -> SimulationResult:
    """
    Layer 3: Downstream Traversal & Propagation Path Reconstruction
    Given a compromised node, computes exact downstream blast radius,
    partitions direct vs transitive dependents, and reconstructs propagation paths
    to every affected application to answer 'Why is this application affected?'
    """
    if not graph.has_node(target_node_id):
        raise ValueError(f"Node '{target_node_id}' not found in ecosystem graph.")

    all_apps = {n for n, d in graph.nodes(data=True) if d.get("type") == "application"}
    total_apps_count = len(all_apps)
    total_nodes_count = graph.number_of_nodes()

    # 1. Reachable descendants (downstream propagation)
    descendants: Set[str] = nx.descendants(graph, target_node_id)

    # 2. Direct dependents (immediate consumers)
    direct_successors: Set[str] = set(graph.successors(target_node_id))

    # 3. Affected applications
    affected_app_ids = descendants.intersection(all_apps)
    # If the compromised node itself is an application
    target_is_app = graph.nodes[target_node_id].get("type") == "application"

    # 4. Transitive dependents (packages that are not direct dependents)
    transitive_node_ids = (descendants - direct_successors) - affected_app_ids

    # 5. Path reconstruction for each affected application
    affected_applications: List[ApplicationImpact] = []
    max_propagation_depth = 0
    highlight_edges: Set[str] = set()

    for app_id in sorted(list(affected_app_ids)):
        app_data = graph.nodes[app_id]
        tier = app_data.get("tier", "internal")

        # Find shortest hop distance
        try:
            shortest_dist = nx.shortest_path_length(graph, source=target_node_id, target=app_id)
        except nx.NetworkXNoPath:
            shortest_dist = 1

        if shortest_dist > max_propagation_depth:
            max_propagation_depth = shortest_dist

        # Find all simple paths (bounded to 10 hops to prevent combinatorial explosion)
        raw_paths = list(nx.all_simple_paths(graph, source=target_node_id, target=app_id, cutoff=10))

        readable_paths: List[str] = []
        for path in raw_paths:
            # Build readable chain e.g. "pkg1 (v1.0) -> pkg2 (v2.0) -> app"
            chain_labels = []
            for node_in_path in path:
                n_info = graph.nodes[node_in_path]
                ver = n_info.get("version", "")
                label = f"{node_in_path}@{ver}" if ver else node_in_path
                chain_labels.append(label)
            readable_paths.append(" ➔ ".join(chain_labels))

            # Collect edges for visual path highlighting
            for i in range(len(path) - 1):
                u, v = path[i], path[i + 1]
                edge_data = graph.get_edge_data(u, v)
                edge_id = edge_data.get("id", f"{u}->{v}") if edge_data else f"{u}->{v}"
                highlight_edges.add(edge_id)

        # Build exact causal reasoning string
        path_count = len(raw_paths)
        if shortest_dist == 1:
            reason = f"Directly consumes '{target_node_id}'. Vulnerability executes directly in application context."
        else:
            reason = (
                f"Transitively depends on '{target_node_id}' across {shortest_dist} hops "
                f"via {path_count} distinct propagation path{'s' if path_count > 1 else ''}."
            )

        affected_applications.append(
            ApplicationImpact(
                applicationId=app_id,
                applicationName=app_data.get("name", app_id),
                tier=tier,
                hopDistance=shortest_dist,
                paths=raw_paths,
                readablePaths=readable_paths,
                reason=reason
            )
        )

    # Sort affected applications: Tier-1 production first, then by hop distance
    affected_applications.sort(
        key=lambda a: (0 if a.tier == "production" else 1, a.hopDistance, a.applicationName)
    )

    # Convert nodes to Pydantic GraphNode objects
    def to_graph_node(nid: str) -> GraphNode:
        nd = graph.nodes[nid]
        vuln = VulnerabilityInfo(**nd.get("vulnerability", {}))
        metrics = nd.get("structuralMetrics")
        if metrics and isinstance(metrics, dict):
            metrics = StructuralMetrics(**metrics)
        return GraphNode(
            id=nd["id"],
            name=nd["name"],
            version=nd.get("version", ""),
            type=nd.get("type", "package"),
            tier=nd.get("tier"),
            description=nd.get("description"),
            vulnerability=vuln,
            structuralMetrics=metrics
        )

    compromised_node = to_graph_node(target_node_id)
    direct_dependents = [to_graph_node(nid) for nid in sorted(list(direct_successors))]
    transitive_dependents = [to_graph_node(nid) for nid in sorted(list(transitive_node_ids))]

    # Calculate blast radius summary metrics
    affected_nodes_count = len(descendants)
    denom = max(1, total_nodes_count - 1)
    affected_nodes_ratio = round(affected_nodes_count / denom, 3)
    affected_apps_ratio = round(len(affected_app_ids) / max(1, total_apps_count), 3)
    production_apps_affected = sum(
        1 for app in affected_applications if app.tier == "production"
    )

    blast_metrics = BlastRadiusMetrics(
        totalEcosystemNodes=total_nodes_count,
        affectedNodesCount=affected_nodes_count,
        affectedNodesRatio=affected_nodes_ratio,
        affectedApplicationsCount=len(affected_app_ids),
        totalApplicationsCount=total_apps_count,
        affectedApplicationsRatio=affected_apps_ratio,
        productionAppsCompromised=production_apps_affected,
        maxPropagationDepth=max_propagation_depth
    )

    # Highlight nodes: compromised node + all descendants
    highlight_nodes = [target_node_id] + sorted(list(descendants))

    return SimulationResult(
        compromisedNode=compromised_node,
        directDependents=direct_dependents,
        transitiveDependents=transitive_dependents,
        affectedApplications=affected_applications,
        blastRadiusMetrics=blast_metrics,
        highlightNodeIds=highlight_nodes,
        highlightEdgeIds=sorted(list(highlight_edges))
    )
