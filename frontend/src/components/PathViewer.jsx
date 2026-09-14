import React from 'react';
import { Route, Server, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PathViewer({
  affectedApplications = [],
  compromisedNodeId,
  onFocusPath,
  activeFocusPath
}) {
  if (!affectedApplications || affectedApplications.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
        <ShieldCheck size={32} style={{ margin: '0 auto 10px', color: 'var(--color-success)', opacity: 0.7 }} />
        <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          No Applications Affected Downstream
        </div>
        <div style={{ fontSize: '0.74rem', marginTop: '4px', lineHeight: 1.4 }}>
          Compromising this package is isolated from top-level application services.
        </div>
      </div>
    );
  }

  const prodCount = affectedApplications.filter((a) => a.tier === 'production').length;
  const intCount = affectedApplications.filter((a) => a.tier !== 'production').length;

  return (
    <div className="path-trace-container">
      {/* Trace Header */}
      <div className="path-trace-head">
        <span>AFFECTED APPLICATIONS ({affectedApplications.length})</span>
        <span>
          <span style={{ color: 'var(--color-threat-crit)', fontWeight: 700 }}>
            {prodCount} PROD
          </span>
          {' · '}
          <span style={{ color: 'var(--color-threat-low)', fontWeight: 600 }}>
            {intCount} INTERNAL
          </span>
        </span>
      </div>

      {/* Applications & Propagation Chains */}
      {affectedApplications.map((app) => (
        <div key={app.applicationId} className="path-app-entry">
          <div className="app-entry-header">
            <div className="app-entry-title">
              <Server
                size={13}
                color={app.tier === 'production' ? 'var(--color-threat-crit)' : 'var(--text-muted)'}
              />
              <span>{app.applicationName}</span>
            </div>
            <span className={`app-tier-tag tag-tier-${app.tier}`}>
              {app.tier === 'production' ? 'Tier-1 Production' : 'Internal'}
            </span>
          </div>

          <div className="app-entry-reason">{app.reason}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '4px' }}>
            {app.paths?.map((path, pIdx) => {
              const isFocused =
                activeFocusPath && JSON.stringify(activeFocusPath) === JSON.stringify(path);

              return (
                <div
                  key={pIdx}
                  className={`path-chain-item ${isFocused ? 'focused' : ''}`}
                  onMouseEnter={() => onFocusPath(path)}
                  onMouseLeave={() => onFocusPath(null)}
                  title="Hover to highlight propagation path on graph"
                >
                  <Route size={11} color={isFocused ? 'var(--color-threat-crit)' : 'var(--color-cyan)'} />
                  {path.map((stepNodeId, sIdx) => {
                    const isRoot = stepNodeId === compromisedNodeId;
                    const isDest = sIdx === path.length - 1;

                    return (
                      <React.Fragment key={sIdx}>
                        <span
                          className={`chain-step ${
                            isRoot ? 'step-root' : isDest ? 'step-app' : ''
                          }`}
                        >
                          {stepNodeId}
                        </span>
                        {sIdx < path.length - 1 && (
                          <ArrowRight size={10} className="chain-arrow" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
