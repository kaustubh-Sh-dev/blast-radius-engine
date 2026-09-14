export const cytoscapeStyles = [
  // Base Node Style
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'color': '#f8fafc',
      'font-size': '11px',
      'font-family': 'Fira Code, monospace',
      'font-weight': '600',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 8,
      'text-wrap': 'wrap',
      'text-max-width': '135px',
      'line-height': 1.25,
      'text-background-opacity': 0.95,
      'text-background-color': '#060a12',
      'text-background-padding': '4px',
      'text-background-shape': 'roundrectangle',
      'background-color': '#131929',
      'border-width': 2,
      'border-color': '#334155',
      'width': 38,
      'height': 38,
      'transition-property': 'background-color, border-color, width, height, opacity',
      'transition-duration': '0.2s'
    }
  },

  // Package Node (Circular, Dark Surface with Cyan/Slate Border)
  {
    selector: 'node[type = "package"]',
    style: {
      'shape': 'ellipse',
      'width': 38,
      'height': 38,
      'border-width': 2,
      'border-color': '#06b6d4',
      'background-color': '#0c1524'
    }
  },

  // Application Node (Rounded Rectangle, Deep Blue with Sky-Blue Border)
  {
    selector: 'node[type = "application"]',
    style: {
      'shape': 'round-rectangle',
      'width': 48,
      'height': 48,
      'border-width': 2.5,
      'border-color': '#38bdf8',
      'background-color': '#0e1c36',
      'font-size': '11.5px',
      'font-weight': '700',
      'color': '#ffffff',
      'text-max-width': '145px',
      'text-background-color': '#081020'
    }
  },

  // Application Production Tier Node (Prominent Sky Blue)
  {
    selector: 'node[tier = "production"]',
    style: {
      'border-color': '#60a5fa',
      'border-width': 3,
      'background-color': '#132347'
    }
  },

  // Base Edge Style (Supplier -> Consumer)
  {
    selector: 'edge',
    style: {
      'width': 1.8,
      'line-color': '#243248',
      'target-arrow-color': '#384d6e',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'arrow-scale': 1.1,
      'transition-property': 'line-color, target-arrow-color, width, opacity',
      'transition-duration': '0.2s'
    }
  },

  // Interactive Selection State
  {
    selector: 'node:selected',
    style: {
      'border-color': '#0ea5e9',
      'border-width': 3.5,
      'z-index': 110
    }
  },

  // Simulation Status: Root Compromised Node (Semantic Red, White Border)
  {
    selector: 'node.compromised-root',
    style: {
      'background-color': '#ef4444',
      'border-color': '#ffffff',
      'border-width': 3.5,
      'width': 50,
      'height': 50,
      'color': '#f87171',
      'font-size': '12px',
      'font-weight': 'bold',
      'text-background-color': '#1a050d',
      'text-background-opacity': 0.98,
      'z-index': 100
    }
  },

  // Simulation Status: Affected Downstream Package (Semantic Warning Amber)
  {
    selector: 'node.affected-downstream',
    style: {
      'background-color': '#f59e0b',
      'border-color': '#fbbf24',
      'border-width': 2.5,
      'width': 42,
      'height': 42,
      'color': '#fbbf24',
      'font-size': '11px',
      'font-weight': 'bold',
      'text-background-color': '#1a1205',
      'z-index': 80
    }
  },

  // Simulation Status: Affected Application (Deep Red & Red Border)
  {
    selector: 'node.affected-app',
    style: {
      'background-color': '#7f1d1d',
      'border-color': '#ef4444',
      'border-width': 3.5,
      'width': 54,
      'height': 54,
      'color': '#f87171',
      'font-size': '12px',
      'font-weight': 'bold',
      'text-background-color': '#1f0710',
      'text-background-opacity': 0.98,
      'z-index': 90
    }
  },

  // Simulation Status: Unaffected Node (Dimmed for High Contrast)
  {
    selector: 'node.unaffected',
    style: {
      'opacity': 0.16,
      'border-color': '#1a2333',
      'background-color': '#090d16',
      'text-background-opacity': 0.4
    }
  },

  // Simulation Status: Highlighted Propagation Edge (Clean Cyan)
  {
    selector: 'edge.highlighted-edge',
    style: {
      'line-color': '#06b6d4',
      'target-arrow-color': '#06b6d4',
      'width': 2.8,
      'opacity': 1.0,
      'arrow-scale': 1.3,
      'z-index': 70
    }
  },

  // Simulation Status: Active Focus Path Edge (Semantic Red Path Tracer)
  {
    selector: 'edge.active-path-edge',
    style: {
      'line-color': '#ef4444',
      'target-arrow-color': '#ef4444',
      'width': 4.0,
      'opacity': 1.0,
      'arrow-scale': 1.45,
      'z-index': 95
    }
  },

  // Simulation Status: Unaffected Edge (Subdued)
  {
    selector: 'edge.unaffected-edge',
    style: {
      'opacity': 0.08,
      'line-color': '#192233',
      'target-arrow-color': '#192233'
    }
  }
];
