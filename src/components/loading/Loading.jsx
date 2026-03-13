import React, { useState, useEffect } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p < 90 ? p + Math.random() * 30 : p);
    }, 100);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
      clearInterval(interval);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div style={styles.loader}>
      <div style={styles.grid} />
      <div style={styles.terminal}>
        <div style={styles.terminalHeader}>root@resume:~$</div>
        <div style={styles.terminalBody}>
          <div>Initializing systems...</div>
          <div>Loading infrastructure...</div>
          <div>Deploying resume data...</div>
          <div style={styles.progress}>
            <div style={{...styles.progressBar, width: `${progress}%`}} />
          </div>
          <div style={styles.blink}>{Math.floor(progress)}% complete_</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loader: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0b1220',
    zIndex: 9999
  },
  grid: {
    position: 'fixed',
    inset: 0,
    background: `
      linear-gradient(90deg, rgba(56,189,248,0.01) 1px, transparent 1px),
      linear-gradient(rgba(56,189,248,0.01) 1px, transparent 1px)`,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    animation: 'gridMove 40s linear infinite'
  },
  terminal: {
    background: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    padding: '24px',
    fontFamily: 'monospace',
    color: '#38bdf8',
    minWidth: '400px'
  },
  terminalHeader: {
    color: '#38bdf8',
    marginBottom: '12px',
    fontSize: '14px',
    fontWeight: 500
  },
  terminalBody: {
    fontSize: '13px',
    lineHeight: 1.6
  },
  progress: {
    background: 'rgba(56, 189, 248, 0.1)',
    height: '4px',
    borderRadius: '2px',
    margin: '12px 0',
    overflow: 'hidden'
  },
  progressBar: {
    background: '#38bdf8',
    height: '100%',
    transition: 'width 0.3s ease'
  },
  blink: {
    animation: 'blink 1s infinite'
  }
};