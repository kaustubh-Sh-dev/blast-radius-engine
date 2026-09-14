import json
from pathlib import Path
from typing import Dict, Any, List, Optional
import networkx as nx

from app.models.schemas import GraphNode, GraphEdge, VulnerabilityInfo

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "curated_ecosystem.json"

class GraphEngine:
    def __init__(self, data_path: Optional[Path] = None):
        self.data_path = data_path or DATA_FILE
        self.raw_data: Dict[str, Any] = {}
        self.graph = nx.DiGraph()
        self.load_graph()

    def load_graph(self) -> None:
        with open(self.data_path, "r", encoding="utf-8") as f:
            self.raw_data = json.load(f)

        self.graph.clear()

        # Add nodes
        for node in self.raw_data.get("nodes", []):
            vuln_data = node.get("vulnerability", {})
            self.graph.add_node(
                node["id"],
                id=node["id"],
                name=node["name"],
                version=node.get("version", "1.0.0"),
                type=node.get("type", "package"),
                tier=node.get("tier"),
                description=node.get("description", ""),
                vulnerability=vuln_data
            )

        # Add edges (Supplier -> Consumer)
        for edge in self.raw_data.get("edges", []):
            edge_id = f"{edge['source']}->{edge['target']}"
            self.graph.add_edge(
                edge["source"],
                edge["target"],
                id=edge_id,
                dependencyType=edge.get("dependencyType", "direct"),
                specifier=edge.get("specifier", "")
            )

    def get_graph(self) -> nx.DiGraph:
        return self.graph

    def get_node(self, node_id: str) -> Optional[Dict[str, Any]]:
        if self.graph.has_node(node_id):
            return dict(self.graph.nodes[node_id])
        return None

    def get_all_applications(self) -> List[str]:
        return [
            n for n, d in self.graph.nodes(data=True)
            if d.get("type") == "application"
        ]

    def get_all_packages(self) -> List[str]:
        return [
            n for n, d in self.graph.nodes(data=True)
            if d.get("type") == "package"
        ]

    def export_graph_nodes(self) -> List[GraphNode]:
        nodes_list = []
        for n, d in self.graph.nodes(data=True):
            vuln = VulnerabilityInfo(**d.get("vulnerability", {}))
            metrics = d.get("structuralMetrics")
            nodes_list.append(
                GraphNode(
                    id=d["id"],
                    name=d["name"],
                    version=d["version"],
                    type=d["type"],
                    tier=d.get("tier"),
                    description=d.get("description"),
                    vulnerability=vuln,
                    structuralMetrics=metrics
                )
            )
        return nodes_list

    def export_graph_edges(self) -> List[GraphEdge]:
        edges_list = []
        for u, v, d in self.graph.edges(data=True):
            edges_list.append(
                GraphEdge(
                    id=d.get("id", f"{u}->{v}"),
                    source=u,
                    target=v,
                    dependencyType=d.get("dependencyType", "direct"),
                    specifier=d.get("specifier")
                )
            )
        return edges_list

# Global singleton instance
engine_instance = GraphEngine()

def get_graph_engine() -> GraphEngine:
    return engine_instance
