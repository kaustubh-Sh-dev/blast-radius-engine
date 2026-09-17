// Fail-safe API base URL resolution:
// 1. If VITE_API_BASE_URL is explicitly set, use it.
// 2. If in production build, default to production backend: https://blast-radius-engine.fastapicloud.dev
// 3. Otherwise in local development, default to http://localhost:8000
const rawBase =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://blast-radius-engine.fastapicloud.dev"
    : "http://localhost:8000");

export const API_BASE = `${rawBase.replace(/\/+$/, "")}/api`;

/**
 * Resilient fetch with timeout and exponential backoff retry.
 * Prevents infinite loops and avoids retrying 4xx client errors.
 */
async function fetchWithRetry(url, options = {}, maxRetries = 2, timeoutMs = 5000) {
  let attempt = 0;
  const backoffDelays = [400, 1000];

  while (true) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        return res;
      }

      // If client error (4xx), do not retry — throw immediately
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      clearTimeout(timer);

      const isTimeout = err.name === "AbortError";
      const errorMessage = isTimeout
        ? `Request timed out after ${timeoutMs}ms`
        : err.message || "Network/CORS error";

      // If client error (4xx), do not retry
      if (err.message && err.message.startsWith("HTTP 4")) {
        throw err;
      }

      if (attempt >= maxRetries) {
        throw new Error(`${errorMessage} (after ${attempt + 1} attempts)`);
      }

      const delay = backoffDelays[attempt] || 1000;
      console.warn(`[API] Attempt ${attempt + 1} failed (${errorMessage}). Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }
}

export async function checkHealth() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    clearTimeout(timer);
    return false;
  }
}

export async function fetchGraph() {
  const res = await fetchWithRetry(`${API_BASE}/graph`);
  return res.json();
}

export async function fetchScenarios() {
  const res = await fetchWithRetry(`${API_BASE}/scenarios`);
  return res.json();
}

export async function simulateCompromise(nodeId) {
  const res = await fetchWithRetry(`${API_BASE}/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeId }),
  });
  return res.json();
}

export async function fetchMitigationRankings() {
  const res = await fetchWithRetry(`${API_BASE}/mitigation-ranking`);
  return res.json();
}

export async function fetchExplanation(nodeId) {
  const res = await fetchWithRetry(`${API_BASE}/explain/${encodeURIComponent(nodeId)}`);
  return res.json();
}
