import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import GraphCanvas from './components/GraphCanvas';
import InspectorPanel from './components/InspectorPanel';
import {
  fetchGraph,
  fetchScenarios,
  simulateCompromise,
  fetchMitigationRankings,
  fetchExplanation,
  checkHealth
} from './services/api';
import { fallbackData } from './data/fallbackData';

export default function App() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [scenarios, setScenarios] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [activeFocusPath, setActiveFocusPath] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('LOADING'); // 'LOADING' | 'CONNECTED' | 'RECONNECTING' | 'OFFLINE'
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [error, setError] = useState(null);

  // Load ecosystem data (live backend first, deterministic fallback on failure)
  const loadData = useCallback(async (isManualRetry = false) => {
    try {
      if (isManualRetry) {
        setConnectionStatus('RECONNECTING');
      }

      const [graphRes, scenariosRes, rankingsRes] = await Promise.all([
        fetchGraph(),
        fetchScenarios(),
        fetchMitigationRankings()
      ]);

      setGraphData(graphRes);
      setScenarios(scenariosRes);
      setRankings(rankingsRes.rankings || []);
      setConnectionStatus('CONNECTED');
      setIsFallbackMode(false);
      setError(null);

      // Default to Package B (session-crypt-helper) to immediately showcase core thesis
      const defaultTarget = 'session-crypt-helper';
      const defaultNode = graphRes.nodes.find((n) => n.id === defaultTarget);
      if (defaultNode) {
        setSelectedNodeId(defaultTarget);
        setSelectedNode(defaultNode);
        setSelectedScenarioId('scenario-ripple-effect');

        const [simRes, expRes] = await Promise.all([
          simulateCompromise(defaultTarget),
          fetchExplanation(defaultTarget)
        ]);
        setSimulation(simRes);
        setExplanation(expRes);
      }
    } catch (err) {
      console.warn('Backend unavailable, activating deterministic offline fallback mode:', err);
      setConnectionStatus('OFFLINE');
      setIsFallbackMode(true);
      setError(null);

      // Populate deterministic fallback dataset
      setGraphData(fallbackData.graph);
      setScenarios(fallbackData.scenarios);
      setRankings(fallbackData.rankings.rankings || []);

      const defaultTarget = 'session-crypt-helper';
      const defaultNode = fallbackData.graph.nodes.find((n) => n.id === defaultTarget);
      if (defaultNode) {
        setSelectedNodeId(defaultTarget);
        setSelectedNode(defaultNode);
        setSelectedScenarioId('scenario-ripple-effect');
        setSimulation(fallbackData.simulations[defaultTarget] || null);
        setExplanation(fallbackData.explanations[defaultTarget] || null);
      }
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Periodic background health check when running in offline fallback mode
  useEffect(() => {
    if (!isFallbackMode) return;

    const interval = setInterval(async () => {
      const isAlive = await checkHealth();
      if (isAlive) {
        console.info('[Engine] Live FastAPI backend detected. Restoring live connection...');
        loadData(true);
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [isFallbackMode, loadData]);

  const handleSelectNode = async (nodeId) => {
    try {
      setSelectedNodeId(nodeId);
      const targetNode = graphData.nodes.find((n) => n.id === nodeId);
      setSelectedNode(targetNode || null);
      setActiveFocusPath(null);

      if (isFallbackMode) {
        setSimulation(fallbackData.simulations[nodeId] || null);
        setExplanation(fallbackData.explanations[nodeId] || null);
        return;
      }

      // Live simulation and explanation
      const [simRes, expRes] = await Promise.all([
        simulateCompromise(nodeId),
        fetchExplanation(nodeId)
      ]);

      setSimulation(simRes);
      setExplanation(expRes);
    } catch (err) {
      console.warn(`Error querying live API for ${nodeId}, falling back to deterministic dataset:`, err);
      setSimulation(fallbackData.simulations[nodeId] || null);
      setExplanation(fallbackData.explanations[nodeId] || null);
      setConnectionStatus('OFFLINE');
      setIsFallbackMode(true);
    }
  };

  const handleSelectScenario = async (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    if (!scenarioId) return;

    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      // In scenario-ripple-effect, targetB is Package B (the choke point with lower CVSS)
      const target = scenario.targetB || scenario.targetA;
      handleSelectNode(target);
    }
  };

  const handleResetSimulation = () => {
    setSimulation(null);
    setExplanation(null);
    setSelectedNodeId(null);
    setSelectedNode(null);
    setSelectedScenarioId('');
    setActiveFocusPath(null);
  };

  const handleRetryConnection = () => {
    loadData(true);
  };

  return (
    <div className="console-app">
      <Header
        scenarios={scenarios}
        selectedScenarioId={selectedScenarioId}
        onSelectScenario={handleSelectScenario}
        onResetSimulation={handleResetSimulation}
        isSimulating={Boolean(simulation)}
        connectionStatus={connectionStatus}
        isFallbackMode={isFallbackMode}
        onRetryConnection={handleRetryConnection}
      />

      {error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#ff3366', fontFamily: 'var(--font-mono)' }}>
          <h3>ENGINE CONNECTION ERROR</h3>
          <p style={{ marginTop: '10px', color: '#94a3b8' }}>{error}</p>
          <button
            onClick={() => loadData(true)}
            className="btn-cyber-secondary"
            style={{ marginTop: '16px' }}
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="console-body">
          <GraphCanvas
            nodes={graphData.nodes}
            edges={graphData.edges}
            simulation={simulation}
            activeFocusPath={activeFocusPath}
            onNodeSelect={handleSelectNode}
            selectedNodeId={selectedNodeId}
          />

          <InspectorPanel
            selectedNode={selectedNode}
            simulation={simulation}
            explanation={explanation}
            rankings={rankings}
            onSelectNode={handleSelectNode}
            activeFocusPath={activeFocusPath}
            onFocusPath={setActiveFocusPath}
          />
        </div>
      )}
    </div>
  );
}
