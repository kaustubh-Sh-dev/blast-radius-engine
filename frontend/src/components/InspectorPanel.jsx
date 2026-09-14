import React, { useState } from 'react';
import {
  Layers,
  Route,
  ListOrdered,
  Shield,
  Award,
  AlertTriangle,
  GitPullRequest
} from 'lucide-react';
import ExplanationCard from './ExplanationCard';
import PathViewer from './PathViewer';
import MitigationTable from './MitigationTable';

export default function InspectorPanel({
  selectedNode,
  simulation,
  explanation,
  rankings,
  onSelectNode,
  activeFocusPath,
  onFocusPath
}) {
  const [activeTab, setActiveTab] = useState('layers'); // 'layers' | 'paths' | 'rankings'

  if (!selectedNode) {
    return (
      <aside className="inspector-sidebar">
        <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Shield size={36} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
          <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            No Target Selected
          </div>
          <div style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
            Click any package or application node in the graph, or select a demo scenario to simulate a supply chain compromise.
          </div>
        </div>
      </aside>
    );
  }

  const vuln = selectedNode.vulnerability || {};
  const metrics = selectedNode.structuralMetrics || {};
  const blast = simulation?.blastRadiusMetrics;
  const isApp = selectedNode.type === 'application';

  return (
    <aside className="inspector-sidebar">
      {/* Target Identification Header */}
      <div className="sheet-target-header">
        <div className="sheet-target-title-row">
          <span className="sheet-target-name">{selectedNode.name}</span>
          <span className="sheet-target-type-pill">
            {selectedNode.type} {selectedNode.tier && `· ${selectedNode.tier}`}
          </span>
        </div>
        <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
          v{selectedNode.version}
        </div>
        <div className="sheet-target-desc">{selectedNode.description}</div>
      </div>

      {/* Tabs */}
      <div className="inspector-tabs">
        <button
          className={`tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
          onClick={() => setActiveTab('layers')}
        >
          <Layers size={13} />
          <span>Analysis</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'paths' ? 'active' : ''}`}
          onClick={() => setActiveTab('paths')}
        >
          <Route size={13} />
          <span>Path Trace ({simulation?.affectedApplications?.length || 0})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'rankings' ? 'active' : ''}`}
          onClick={() => setActiveTab('rankings')}
        >
          <ListOrdered size={13} />
          <span>Rankings</span>
        </button>
      </div>

      {/* Tab Content Area: Flat Continuous Investigation Sheet */}
      <div className="tab-content-area">
        {activeTab === 'layers' && (
          <div className="investigation-sheet">
            {/* PRIMARY: Mitigation Priority (The Verdict) */}
            <div className="verdict-block">
              <div className="verdict-header-row">
                <span className="verdict-label">
                  <Award size={13} />
                  MITIGATION PRIORITY
                </span>
                {explanation && (
                  <span
                    className={`verdict-rank-badge ${
                      explanation.priorityRank === 1 ? 'rank-primary-badge' : 'rank-secondary-badge'
                    }`}
                  >
                    RANK #{explanation.priorityRank}
                  </span>
                )}
              </div>

              <div className="verdict-score-row">
                <div className="verdict-hero-score">
                  {explanation ? explanation.priorityScore : '0.0'}
                </div>
                <div className="verdict-scale">/ 100</div>
              </div>

              {explanation?.remediationAction && (
                <div className="verdict-action-text">
                  Action: {explanation.remediationAction}
                </div>
              )}

              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.35 }}>
                Synthesized from CVSS Severity (30%), Application Exposure (40%), Systemic Reach (20%), and Bottleneck Centrality (10%).
              </div>
            </div>

            {/* WHY THIS RANKING: Compact Factual Risk Drivers */}
            <ExplanationCard
              explanation={explanation}
              simulation={simulation}
              selectedNode={selectedNode}
            />

            {/* SECONDARY: Vulnerability Severity & Downstream Impact */}
            <div className="sheet-section">
              <div className="sheet-section-title">
                <span>Vulnerability & Downstream Impact</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SEVERITY + REACH</span>
              </div>

              <div className="metrics-key-grid">
                {/* Base Severity Cell */}
                <div className="metric-data-cell">
                  <span className="cell-caption">Base Vulnerability</span>
                  <div className="cell-value-row">
                    <span className="cell-primary-num">
                      {vuln.cvssScore > 0 ? vuln.cvssScore : '0.0'}
                    </span>
                    <span className={`cvss-tag cvss-tag-${vuln.cvssSeverity || 'NONE'}`}>
                      {vuln.cvssSeverity || 'NONE'}
                    </span>
                  </div>
                  <div className="cell-subtext" style={{ fontFamily: 'var(--font-mono)' }}>
                    {vuln.cveId || 'No known CVE'}
                  </div>
                </div>

                {/* Total Reach Cell */}
                <div className="metric-data-cell">
                  <span className="cell-caption">Total Downstream Reach</span>
                  <div className="cell-value-row">
                    <span className="cell-primary-num">
                      {blast?.affectedNodesCount ?? metrics?.downstreamReach ?? 0}
                    </span>
                    <span className="cell-subtext">components</span>
                  </div>
                  <div className="cell-subtext">
                    {blast ? `${Math.round(blast.affectedNodesRatio * 100)}% of ecosystem` : 'Unsimulated'}
                  </div>
                </div>
              </div>

              {/* Grouped Downstream Summary Row */}
              <div className="impact-summary-row">
                <div className="impact-stat-item">
                  <span
                    className="impact-num"
                    style={{ color: (blast?.productionAppsCompromised || 0) > 0 ? 'var(--color-threat-crit)' : 'var(--text-main)' }}
                  >
                    {blast?.productionAppsCompromised || 0}
                  </span>
                  <span className="impact-label">production apps</span>
                </div>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <div className="impact-stat-item">
                  <span className="impact-num">{simulation?.directDependents?.length || 0}</span>
                  <span className="impact-label">direct deps</span>
                </div>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <div className="impact-stat-item">
                  <span className="impact-num">{simulation?.transitiveDependents?.length || 0}</span>
                  <span className="impact-label">transitive deps</span>
                </div>
              </div>

              {vuln.summary && (
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.35, marginTop: '2px' }}>
                  {vuln.summary}
                </div>
              )}
            </div>

            {/* DEEPER ANALYSIS: Structural Importance & Bottlenecks */}
            <div className="sheet-section" style={{ borderBottom: 'none' }}>
              <div className="sheet-section-title">
                <span>Structural Importance</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>TOPOLOGY</span>
              </div>

              <div className="metrics-key-grid">
                <div className="metric-data-cell">
                  <span className="cell-caption">Structural Score</span>
                  <div className="cell-value-row">
                    <span className="cell-primary-num" style={{ color: 'var(--color-cyan)' }}>
                      {metrics.structuralScore || 0}
                    </span>
                    <span className="cell-subtext">/ 100</span>
                  </div>
                  <div className="cell-subtext">Topology weight</div>
                </div>

                <div className="metric-data-cell">
                  <span className="cell-caption">Bottleneck Centrality</span>
                  <div className="cell-value-row">
                    <span className="cell-primary-num" style={{ fontSize: '1rem' }}>
                      {metrics.bottleneckScore ?? '0.0000'}
                    </span>
                  </div>
                  <div className="cell-subtext">Multiplexed paths</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', padding: '2px 4px' }}>
                <span>Direct Dependents: <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{metrics.directDependentsCount || 0}</strong></span>
                <span>Downstream Reach: <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{metrics.downstreamReach || 0} nodes</strong></span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <PathViewer
            affectedApplications={simulation?.affectedApplications}
            compromisedNodeId={selectedNode.id}
            onFocusPath={onFocusPath}
            activeFocusPath={activeFocusPath}
          />
        )}

        {activeTab === 'rankings' && (
          <MitigationTable
            rankings={rankings}
            selectedNodeId={selectedNode.id}
            onSelectNode={onSelectNode}
          />
        )}
      </div>
    </aside>
  );
}
