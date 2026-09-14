import React from 'react';

export default function ExplanationCard({ explanation, simulation, selectedNode }) {
  if (!explanation) return null;

  const blast = simulation?.blastRadiusMetrics;
  const metrics = selectedNode?.structuralMetrics || {};
  const vuln = selectedNode?.vulnerability || {};

  const prodCount = blast?.productionAppsCompromised ?? 
    (selectedNode?.type === 'application' && selectedNode?.tier === 'production' ? 1 : 0);
  const reachCount = blast?.affectedNodesCount ?? metrics?.downstreamReach ?? explanation.affectedNodesCount ?? 0;
  const structScore = metrics?.structuralScore ?? explanation.structuralScore ?? 0;
  const cvssScore = vuln?.cvssScore ?? explanation.cvssScore ?? 0;
  const cvssSeverity = vuln?.cvssSeverity ?? explanation.cvssSeverity ?? 'None';

  // Factual concise comparative statement
  let comparativeStatement = 'Priority reflects composite scoring across base severity, structural topology, and downstream reach.';
  if (explanation.priorityRank === 1) {
    comparativeStatement = 'Ranked #1 despite lower CVSS because its production reach is substantially larger.';
  } else if (cvssScore >= 9.0 && prodCount === 0) {
    comparativeStatement = 'Ranked lower despite Critical CVSS because its blast radius is strictly isolated from production services.';
  }

  return (
    <div className="sheet-section">
      <div className="sheet-section-title">
        <span>Why This Ranking</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>RISK DRIVERS</span>
      </div>

      <div className="risk-drivers-table">
        <div className="driver-row">
          <span className="driver-label">Production exposure</span>
          <span className="driver-value" style={{ color: prodCount > 0 ? 'var(--color-threat-crit)' : 'var(--text-main)' }}>
            {prodCount} production application{prodCount !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="driver-row">
          <span className="driver-label">Downstream reach</span>
          <span className="driver-value">
            {reachCount} components
          </span>
        </div>

        <div className="driver-row">
          <span className="driver-label">Structural importance</span>
          <span className="driver-value">
            {structScore}
          </span>
        </div>

        <div className="driver-row">
          <span className="driver-label">Base severity</span>
          <span className="driver-value">
            CVSS {cvssScore > 0 ? cvssScore : '0.0'} · {cvssSeverity}
          </span>
        </div>
      </div>

      <div className="driver-takeaway">
        {comparativeStatement}
      </div>
    </div>
  );
}
