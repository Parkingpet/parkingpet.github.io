import React from 'react';
import { resumeData } from '../../resumeData';

export default function Clients() {
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <span style={styles.badge}>CLIENTS</span>
        <h2 style={styles.title}>Clients</h2>
      </div>

      <div style={styles.clientsList}>
        {resumeData.clients.map((client, index) => (
          <div key={index} style={styles.clientItem}>
            <div style={styles.clientHeader}>
              {client.link ? (
                <a
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.clientLink}
                >
                  <span style={styles.clientBadge}>{client.name}</span>
                </a>
              ) : (
                <span style={styles.clientBadge}>{client.name}</span>
              )}
            </div>

            <div style={styles.clientMeta}>
              <span style={styles.clientYears}>{client.years}</span>
              <span style={styles.clientDescription}>— {client.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(9, 13, 22, 0.92)',
    border: '1px solid rgba(56, 189, 248, 0.12)',
    borderRadius: '8px',
    padding: '12px',
    marginTop: '12px'
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '14px'
  },
  badge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#00d9ff',
    border: '1px solid rgba(56,189,248,0.14)',
    padding: '6px 8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    borderRadius: '6px',
    boxShadow: 'inset 0 -6px 18px rgba(0,0,0,0.4)'
  },
  title: {
    color: '#38bdf8',
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    fontFamily: 'monospace'
  },
  clientsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '12px',
    alignItems: 'stretch'
  },
  clientItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '150px',
    padding: '14px 16px',
    background: 'rgba(2,6,23,0.65)',
    border: '1px solid rgba(56,189,248,0.12)',
    borderRadius: '8px',
    boxShadow: 'inset 0 0 0 1px rgba(56,189,248,0.04)',
    width: '100%',
    boxSizing: 'border-box'
  },
  clientHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  clientBadge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#cfeffd',
    border: '1px solid rgba(56,189,248,0.12)',
    padding: '7px 10px',
    fontFamily: 'monospace',
    fontSize: '13px',
    borderRadius: '6px',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  clientMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: 'auto'
  },
  clientLink: {
    textDecoration: 'none',
    width: '100%',
    display: 'block'
  },
  clientYears: {
    color: '#93a0b8',
    fontSize: '12px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    fontWeight: 600
  },
  clientDescription: {
    color: '#dfeaf7',
    fontSize: '13px',
    lineHeight: 1.45
  }
};
