import os
import json
from pathlib import Path
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.models.schemas import (
    GraphResponse,
    SimulationRequest,
    SimulationResult,
    MitigationRankingResponse,
    ExplanationBreakdown,
    ScenarioDefinition
)
from app.core.graph_engine import get_graph_engine
from app.core.structural import compute_structural_metrics
from app.core.propagation import simulate_compromise
from app.core.priority import calculate_mitigation_rankings
from app.core.explainer import generate_explanation

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-compute structural metrics on load
    engine = get_graph_engine()
    compute_structural_metrics(engine.get_graph())
    yield

app = FastAPI(
    title="Blast Radius Engine API",
    description="Cybersecurity Open Source Supply Chain Risk & Downstream Propagation Analyzer",
    version="1.0.0",
    lifespan=lifespan
)

# Minimal explicit CORS allowlist for production and local development
raw_cors = os.getenv(
    "CORS_ORIGINS",
    "https://blast-radius-engine.vercel.app,http://localhost:5173,http://127.0.0.1:5173,http://localhost:8000,http://127.0.0.1:8000"
)
allowed_origins = [origin.strip() for origin in raw_cors.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """
    Ensure internal server errors return structured JSON with CORS headers
    rather than unhandled proxy-level drops.
    """
    origin = request.headers.get("origin")
    headers = {}
    if origin and origin in allowed_origins:
        headers["Access-Control-Allow-Origin"] = origin
        headers["Access-Control-Allow-Credentials"] = "true"
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
        headers=headers
    )

SCENARIOS_FILE = Path(__file__).resolve().parent / "data" / "scenarios.json"

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "blast-radius-engine"}

@app.get("/api/graph", response_model=GraphResponse)
def get_graph():
    """
    Returns the complete supply chain ecosystem graph.
    Nodes include Layer 1 (Vulnerability) and precomputed Layer 2 (Structural metrics).
    """
    engine = get_graph_engine()
    compute_structural_metrics(engine.get_graph())
    nodes = engine.export_graph_nodes()
    edges = engine.export_graph_edges()
    return GraphResponse(
        ecosystem=engine.raw_data.get("ecosystem", "Ecosystem"),
        version=engine.raw_data.get("version", "1.0.0"),
        nodes=nodes,
        edges=edges
    )

@app.get("/api/scenarios", response_model=List[ScenarioDefinition])
def get_scenarios():
    """
    Returns curated demo scenarios for hackathon presentations.
    """
    if not SCENARIOS_FILE.exists():
        return []
    with open(SCENARIOS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/api/simulate", response_model=SimulationResult)
def simulate(request: SimulationRequest):
    """
    Layer 3: Downstream Impact Simulation.
    Simulates a compromise of the selected node and traces propagation paths
    to all affected downstream components and enterprise applications.
    """
    engine = get_graph_engine()
    g = engine.get_graph()
    if not g.has_node(request.nodeId):
        raise HTTPException(status_code=404, detail=f"Node '{request.nodeId}' not found in ecosystem.")
    
    return simulate_compromise(g, request.nodeId)

@app.get("/api/mitigation-ranking", response_model=MitigationRankingResponse)
def get_mitigation_rankings():
    """
    Layer 4: Mitigation Priority Leaderboard.
    Computes explainable remediation ranking across all packages.
    """
    engine = get_graph_engine()
    g = engine.get_graph()
    return calculate_mitigation_rankings(g)

@app.get("/api/explain/{node_id}", response_model=ExplanationBreakdown)
def get_node_explanation(node_id: str):
    """
    Explainability Engine:
    Answers 'Why?' for the selected node's priority rank and blast radius.
    """
    engine = get_graph_engine()
    g = engine.get_graph()
    if not g.has_node(node_id):
        raise HTTPException(status_code=404, detail=f"Node '{node_id}' not found in ecosystem.")
    
    return generate_explanation(g, node_id)
