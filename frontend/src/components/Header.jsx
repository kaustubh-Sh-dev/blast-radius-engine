import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, RefreshCw, Zap, ChevronDown, Check } from 'lucide-react';

export default function Header({
  scenarios = [],
  selectedScenarioId,
  onSelectScenario,
  onResetSimulation,
  isSimulating,
  connectionStatus = 'CONNECTED',
  isFallbackMode = false,
  onRetryConnection
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId);

  const handleSelect = (scenarioId) => {
    onSelectScenario(scenarioId);
    setDropdownOpen(false);
  };

  const getStatusLabel = () => {
    if (connectionStatus === 'LOADING') return 'CONNECTING...';
    if (connectionStatus === 'RECONNECTING') return 'ENGINE RECONNECTING';
    if (connectionStatus === 'OFFLINE') return 'ENGINE OFFLINE';
    if (isSimulating) return 'SIMULATION ACTIVE';
    return 'ENGINE READY';
  };

  return (
    <header className="console-header">
      <div className="brand-section">
        <div className="brand-logo-icon">
          <ShieldAlert size={20} />
        </div>
        <div className="brand-titles">
          <h1>
            Blast Radius Engine
            <span className="brand-badge">PROTOTYPE R1</span>
          </h1>
          <div className="brand-subtitle">
            Open Source Supply Chain Ripple Effect & Risk Prioritization
          </div>
        </div>
      </div>

      {/* Mandatory Simulated Data Disclosure Badge */}
      <div
        className={`simulated-disclosure-badge ${isFallbackMode ? 'fallback-mode' : ''}`}
        title={
          isFallbackMode
            ? 'Notice: Running in offline demo fallback mode with deterministic data.'
            : 'Notice: This dataset is synthetic/curated for reproducible prototype demonstration'
        }
      >
        <span className="sim-dot"></span>
        <span>
          {isFallbackMode
            ? 'OFFLINE DEMO MODE • DETERMINISTIC DATA'
            : 'SIMULATED ECOSYSTEM • DETERMINISTIC DEMO DATA'}
        </span>
      </div>

      <div className="header-controls">
        {/* Custom Dark-Mode Scenario Dropdown */}
        <div className="custom-dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            className={`scenario-dropdown-trigger ${dropdownOpen ? 'open' : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <div className="trigger-label-group">
              <Zap size={13} color="#f59e0b" className="zap-icon" />
              <span className="scenario-prefix">DEMO SCENARIO:</span>
              <span className="scenario-current-title">
                {selectedScenario ? selectedScenario.title : '-- Choose Preset Scenario --'}
              </span>
            </div>
            <ChevronDown size={14} className={`dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="scenario-dropdown-menu" role="listbox">
              <div className="dropdown-menu-header">SELECT PRESET DEMO SCENARIO</div>
              
              <div
                className={`dropdown-menu-item ${!selectedScenarioId ? 'selected' : ''}`}
                onClick={() => handleSelect('')}
                role="option"
                aria-selected={!selectedScenarioId}
              >
                <div className="item-main">
                  <span className="item-title">-- Clear Active Preset --</span>
                  <span className="item-desc">Explore ecosystem graph freely</span>
                </div>
                {!selectedScenarioId && <Check size={14} color="#00f5d4" />}
              </div>

              {scenarios.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <div
                    key={sc.id}
                    className={`dropdown-menu-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(sc.id)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="item-main">
                      <div className="item-title-row">
                        <span className="item-title">{sc.title}</span>
                      </div>
                      <div className="item-desc">
                        {sc.id === 'scenario-ripple-effect'
                          ? 'Package A vs Package B — severity vs systemic reach'
                          : sc.description}
                      </div>
                      {sc.id === 'scenario-ripple-effect' && (
                        <div className="item-tag-row">
                          <span className="tag-a">Package A: CVSS 9.8 (1 App)</span>
                          <span className="tag-vs">vs</span>
                          <span className="tag-b">Package B: CVSS 5.3 (3 Apps)</span>
                        </div>
                      )}
                    </div>
                    {isSelected && <Check size={15} color="#00f5d4" className="check-icon" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          className="btn-cyber-secondary"
          onClick={onResetSimulation}
          title="Clear active compromise simulation and reset graph"
        >
          <RefreshCw size={13} />
          Reset View
        </button>

        {isFallbackMode && onRetryConnection && (
          <button
            className="btn-cyber-secondary"
            onClick={onRetryConnection}
            title="Attempt to reconnect to live FastAPI backend"
            style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.4)' }}
          >
            Reconnect API
          </button>
        )}

        <div
          className={`system-status status-${connectionStatus.toLowerCase()}`}
          title={isFallbackMode ? 'Backend offline (using deterministic fallback data). Click to reconnect.' : 'Backend connection healthy'}
          onClick={isFallbackMode && onRetryConnection ? onRetryConnection : undefined}
          style={isFallbackMode ? { cursor: 'pointer' } : undefined}
        >
          <span className="status-dot"></span>
          <span>{getStatusLabel()}</span>
        </div>
      </div>
    </header>
  );
}
