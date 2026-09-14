const API_BASE = "http://localhost:8000/api";

export async function fetchGraph() {
  const res = await fetch(`${API_BASE}/graph`);
  if (!res.ok) throw new Error(`Failed to load ecosystem graph: ${res.statusText}`);
  return res.json();
}

export async function fetchScenarios() {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error(`Failed to load scenarios: ${res.statusText}`);
  return res.json();
}

export async function simulateCompromise(nodeId) {
  const res = await fetch(`${API_BASE}/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeId }),
  });
  if (!res.ok) throw new Error(`Simulation failed for ${nodeId}: ${res.statusText}`);
  return res.json();
}

export async function fetchMitigationRankings() {
  const res = await fetch(`${API_BASE}/mitigation-ranking`);
  if (!res.ok) throw new Error(`Failed to load mitigation rankings: ${res.statusText}`);
  return res.json();
}

export async function fetchExplanation(nodeId) {
  const res = await fetch(`${API_BASE}/explain/${encodeURIComponent(nodeId)}`);
  if (!res.ok) throw new Error(`Failed to load explanation for ${nodeId}: ${res.statusText}`);
  return res.json();
}
