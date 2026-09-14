import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { cytoscapeStyles } from '../utils/cytoscapeStyles';
import { Maximize2, RotateCcw, Compass } from 'lucide-react';

// Register dagre layout once
try {
  cytoscape.use(dagre);
} catch (e) {
  // Already registered
}

export default function GraphCanvas({
  nodes = [],
  edges = [],
  simulation = null,
  activeFocusPath = null,
  onNodeSelect,
  selectedNodeId
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [layoutDirection, setLayoutDirection] = useState('LR'); // LR = Left to Right (upstream -> downstream apps)

  // Initialize and update Cytoscape instance
  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    const elements = [
      ...nodes.map((n) => ({
        group: 'nodes',
        data: {
          id: n.id,
          label: n.type === 'application' ? `${n.name}` : `${n.id}\nv${n.version}`,
          name: n.name,
          version: n.version,
          type: n.type,
          tier: n.tier || 'internal',
          cvssScore: n.vulnerability?.cvssScore || 0,
          cvssSeverity: n.vulnerability?.cvssSeverity || 'NONE'
        }
      })),
      ...edges.map((e) => ({
        group: 'edges',
        data: {
          id: e.id || `${e.source}->${e.target}`,
          source: e.source,
          target: e.target,
          dependencyType: e.dependencyType || 'direct'
        }
      }))
    ];

    if (!cyRef.current) {
      const cy = cytoscape({
        container: containerRef.current,
        elements,
        style: cytoscapeStyles,
        layout: {
          name: 'dagre',
          rankDir: layoutDirection,
          nodeSep: 65,
          rankSep: 110,
          padding: 60
        },
        minZoom: 0.2,
        maxZoom: 2.5,
        wheelSensitivity: 0.25
      });

      cy.on('tap', 'node', (evt) => {
        const clickedNodeId = evt.target.id();
        onNodeSelect(clickedNodeId);
      });

      cyRef.current = cy;
    } else {
      const cy = cyRef.current;
      cy.elements().remove();
      cy.add(elements);
      cy.layout({
        name: 'dagre',
        rankDir: layoutDirection,
        nodeSep: 65,
        rankSep: 110,
        padding: 60
      }).run();
    }

    return () => {
      // Keep instance alive across re-renders for smooth transitions
    };
  }, [nodes, edges, layoutDirection]);

  // Apply Simulation Highlighting
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Reset all previous classes
    cy.elements().removeClass(
      'compromised-root affected-downstream affected-app unaffected highlighted-edge unaffected-edge active-path-edge'
    );

    if (!simulation) {
      // Default idle state
      return;
    }

    const compId = simulation.compromisedNode?.id;
    const highlightNodeSet = new Set(simulation.highlightNodeIds || []);
    const highlightEdgeSet = new Set(simulation.highlightEdgeIds || []);
    const affectedAppSet = new Set(
      (simulation.affectedApplications || []).map((a) => a.applicationId)
    );

    cy.nodes().forEach((n) => {
      const nid = n.id();
      if (nid === compId) {
        n.addClass('compromised-root');
      } else if (affectedAppSet.has(nid)) {
        n.addClass('affected-app');
      } else if (highlightNodeSet.has(nid)) {
        n.addClass('affected-downstream');
      } else {
        n.addClass('unaffected');
      }
    });

    cy.edges().forEach((e) => {
      const eid = e.id();
      if (highlightEdgeSet.has(eid)) {
        e.addClass('highlighted-edge');
      } else {
        e.addClass('unaffected-edge');
      }
    });

    // If activeFocusPath is provided (e.g. user hovered over an affected app in PathViewer)
    if (activeFocusPath && activeFocusPath.length > 1) {
      for (let i = 0; i < activeFocusPath.length - 1; i++) {
        const u = activeFocusPath[i];
        const v = activeFocusPath[i + 1];
        const edge = cy.edges(`[source = "${u}"][target = "${v}"]`);
        if (edge.length > 0) {
          edge.removeClass('highlighted-edge unaffected-edge').addClass('active-path-edge');
        }
      }
    }
  }, [simulation, activeFocusPath]);

  const handleFit = () => {
    if (cyRef.current) {
      cyRef.current.animate({ fit: { padding: 65 }, duration: 400 });
    }
  };

  const handleToggleOrientation = () => {
    const nextDir = layoutDirection === 'LR' ? 'TB' : 'LR';
    setLayoutDirection(nextDir);
    if (cyRef.current) {
      cyRef.current.layout({
        name: 'dagre',
        rankDir: nextDir,
        nodeSep: 65,
        rankSep: 110,
        padding: 60
      }).run();
    }
  };

  return (
    <div className="canvas-container">
      {/* Top HUD Legend */}
      <div className="canvas-hud-overlay">
        <div className="hud-panel">
          <span style={{ color: '#00f5d4', fontWeight: 700 }}>ECOSYSTEM VIEWPORT</span>
          <div className="hud-legend-item">
            <span className="legend-shape legend-pkg"></span>
            <span>Package</span>
          </div>
          <div className="hud-legend-item">
            <span className="legend-shape legend-app"></span>
            <span>Application</span>
          </div>
          <div className="hud-legend-item">
            <span className="legend-shape legend-compromised"></span>
            <span>Compromised</span>
          </div>
          <div className="hud-legend-item">
            <span className="legend-shape legend-blast"></span>
            <span>Downstream Ripple</span>
          </div>
        </div>
      </div>

      {/* Viewport Canvas */}
      <div ref={containerRef} className="cytoscape-viewport" />

      {/* Bottom Overlay Controls */}
      <div className="canvas-actions-overlay">
        <button className="canvas-action-btn" onClick={handleFit} title="Fit entire graph to screen">
          <Maximize2 size={13} />
          Fit View
        </button>
        <button
          className="canvas-action-btn"
          onClick={handleToggleOrientation}
          title="Toggle layout orientation"
        >
          <Compass size={13} />
          Layout: {layoutDirection === 'LR' ? 'Left-to-Right' : 'Top-to-Bottom'}
        </button>
      </div>
    </div>
  );
}
