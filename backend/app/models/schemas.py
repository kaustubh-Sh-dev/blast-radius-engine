from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class VulnerabilityInfo(BaseModel):
    cveId: Optional[str] = None
    cvssScore: float = 0.0
    cvssSeverity: str = "NONE"  # NONE, LOW, MEDIUM, HIGH, CRITICAL
    summary: Optional[str] = None

class StructuralMetrics(BaseModel):
    downstreamReach: int = 0
    downstreamReachRatio: float = 0.0
    directDependentsCount: int = 0
    transitiveDependentsCount: int = 0
    affectedApplicationsCount: int = 0
    affectedApplicationsRatio: float = 0.0
    bottleneckScore: float = 0.0
    structuralScore: float = 0.0  # 0.0 - 100.0

class GraphNode(BaseModel):
    id: str
    name: str
    version: str
    type: str  # "application" | "package"
    tier: Optional[str] = None  # "production" | "internal" (for applications)
    description: Optional[str] = None
    vulnerability: VulnerabilityInfo
    structuralMetrics: Optional[StructuralMetrics] = None

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    dependencyType: str = "direct"
    specifier: Optional[str] = None

class GraphResponse(BaseModel):
    ecosystem: str
    version: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class PropagationStep(BaseModel):
    fromNodeId: str
    fromNodeName: str
    toNodeId: str
    toNodeName: str
    stepNumber: int

class ApplicationImpact(BaseModel):
    applicationId: str
    applicationName: str
    tier: str
    hopDistance: int
    paths: List[List[str]]  # list of node id paths, e.g. ["session-crypt-helper", "auth-core", "payment-gateway"]
    readablePaths: List[str]  # e.g. "session-crypt-helper -> auth-core -> payment-gateway"
    reason: str

class BlastRadiusMetrics(BaseModel):
    totalEcosystemNodes: int
    affectedNodesCount: int
    affectedNodesRatio: float
    affectedApplicationsCount: int
    totalApplicationsCount: int
    affectedApplicationsRatio: float
    productionAppsCompromised: int
    maxPropagationDepth: int

class SimulationRequest(BaseModel):
    nodeId: str

class SimulationResult(BaseModel):
    compromisedNode: GraphNode
    directDependents: List[GraphNode]
    transitiveDependents: List[GraphNode]
    affectedApplications: List[ApplicationImpact]
    blastRadiusMetrics: BlastRadiusMetrics
    highlightNodeIds: List[str]
    highlightEdgeIds: List[str]

class ExplanationBreakdown(BaseModel):
    nodeId: str
    nodeName: str
    priorityRank: int
    priorityScore: float
    cvssScore: float
    cvssSeverity: str
    structuralScore: float
    affectedAppsCount: int
    affectedNodesCount: int
    summaryHeadline: str
    rationales: List[str]  # Answers to "Why?"
    remediationAction: str

class MitigationRankItem(BaseModel):
    rank: int
    nodeId: str
    nodeName: str
    nodeType: str
    version: str
    cvssScore: float
    cvssSeverity: str
    structuralScore: float
    downstreamReachCount: int
    affectedApplicationsCount: int
    productionAppsCount: int = 0
    internalAppsCount: int = 0
    priorityScore: float
    isChokePoint: bool
    explanationSummary: str

class MitigationRankingResponse(BaseModel):
    rankings: List[MitigationRankItem]
    methodology: Dict[str, Any]

class ScenarioDefinition(BaseModel):
    id: str
    title: str
    description: str
    targetA: str
    targetB: str
    takeaway: str
