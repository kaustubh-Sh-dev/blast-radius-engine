import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import GraphCanvas from './components/GraphCanvas';
import InspectorPanel from './components/InspectorPanel';
import {
  fetchGraph,
  fetchScenarios,
  simulateCompromise,
  fetchMitigationRankings,
  fetchExplanation
} from './services/api';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial ecosystem data
  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const [graphRes, scenariosRes, rankingsRes] = await Promise.all([
          fetchGraph(),
          fetchScenarios(),
          fetchMitigationRankings()
        ]);

        setGraphData(graphRes);
        setScenarios(scenariosRes);
        setRankings(rankingsRes.rankings || []);

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
        console.error('Failed to initialize engine:', err);
        setError(err.message || 'Failed to connect to backend engine.');
      } finally {
        setLoading(false);
      }
    }

    initData();
  }, []);

  const handleSelectNode = async (nodeId) => {
    try {
      setSelectedNodeId(nodeId);
      const targetNode = graphData.nodes.find((n) => n.id === nodeId);
      setSelectedNode(targetNode || null);
      setActiveFocusPath(null);

      // Run simulation and explanation
      const [simRes, expRes] = await Promise.all([
        simulateCompromise(nodeId),
        fetchExplanation(nodeId)
      ]);

      setSimulation(simRes);
      setExplanation(expRes);
    } catch (err) {
      console.error(`Error simulating compromise for ${nodeId}:`, err);
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

  return (
    <div className="console-app">
      <Header
        scenarios={scenarios}
        selectedScenarioId={selectedScenarioId}
        onSelectScenario={handleSelectScenario}
        onResetSimulation={handleResetSimulation}
        isSimulating={Boolean(simulation)}
      />

      {error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#ff3366', fontFamily: 'var(--font-mono)' }}>
          <h3>ENGINE CONNECTION ERROR</h3>
          <p style={{ marginTop: '10px', color: '#94a3b8' }}>{error}</p>
          <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#64748b' }}>
            Ensure the FastAPI backend is running on http://localhost:8000
          </p>
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
      <Analytics />
    </div>
  );
}
