import React from 'react';

export default function MitigationTable({
  rankings = [],
  selectedNodeId,
  onSelectNode
}) {
  return (
    <div className="leaderboard-container">
      {/* Comparative Finding Callout */}
      <div className="thesis-note">
        <strong>Core Comparative Finding:</strong> Notice how{' '}
        <strong style={{ color: '#fff' }}>session-crypt-helper</strong> (CVSS 5.3 Medium) is ranked{' '}
        <strong style={{ color: 'var(--color-threat-crit)' }}>Priority #1</strong> ahead of{' '}
        <strong style={{ color: '#fff' }}>xml-entity-parser</strong> (CVSS 9.8 Critical).
        Compromising the lower-severity helper ripples through 3 production services, whereas the
        critical parser is isolated to an internal offline tool.
      </div>

      <div className="data-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Package</th>
              <th>CVSS</th>
              <th>Reach</th>
              <th>Apps</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((pkg) => {
              const isSelected = pkg.nodeId === selectedNodeId;
              const isRank1 = pkg.rank === 1;

              return (
                <tr
                  key={pkg.nodeId}
                  className={`leaderboard-row ${isSelected ? 'selected' : ''} ${
                    isRank1 ? 'rank-1-row' : ''
                  }`}
                  onClick={() => onSelectNode(pkg.nodeId)}
                  title="Click to simulate compromise of this package"
                >
                  <td>
                    <span className={`tbl-rank-badge ${isRank1 ? 'tbl-rank-1' : ''}`}>
                      #{pkg.rank}
                    </span>
                  </td>
                  <td>
                    <div className="tbl-pkg-name">{pkg.nodeName}</div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      v{pkg.version}{' '}
                      {pkg.isChokePoint && (
                        <span style={{ color: 'var(--color-threat-med)' }}>• CHOKE POINT</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`cvss-tag cvss-tag-${pkg.cvssSeverity || 'NONE'}`}>
                      {pkg.cvssScore > 0 ? `${pkg.cvssScore} ${pkg.cvssSeverity}` : 'NONE'}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {pkg.downstreamReachCount}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    <span
                      style={{
                        color:
                          pkg.affectedApplicationsCount > 0
                            ? pkg.productionAppsCount > 0
                              ? 'var(--color-threat-crit)'
                              : 'var(--color-threat-low)'
                            : 'var(--text-muted)',
                        fontWeight: 600
                      }}
                    >
                      {pkg.affectedApplicationsCount}
                    </span>
                    {pkg.affectedApplicationsCount > 0 && (
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                        {pkg.productionAppsCount > 0 && (
                          <span style={{ color: 'var(--color-threat-crit)' }}>
                            {pkg.productionAppsCount}p{' '}
                          </span>
                        )}
                        {pkg.internalAppsCount > 0 && (
                          <span>{pkg.internalAppsCount}i</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={`tbl-score ${isRank1 ? 'tbl-score-top' : ''}`}>
                      {pkg.priorityScore}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
