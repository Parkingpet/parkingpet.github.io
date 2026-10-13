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
            <div style={styles.clientLeft}>
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
    marginBottom: '12px'
  },
  badge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#00d9ff',
    border: '1px solid rgba(56,189,248,0.14)',
    padding: '6px 8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    borderRadius: '6px'
  },
  title: {
    color: '#38bdf8',
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    fontFamily: 'monospace'
  },
  clientsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  clientItem: {
    padding: '10px 12px',
    background: 'rgba(2,6,23,0.65)',
    border: '1px solid rgba(56,189,248,0.06)',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px'
  },
  clientLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  clientBadge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#cfeffd',
    border: '1px solid rgba(56,189,248,0.12)',
    padding: '6px 8px',
    fontFamily: 'monospace',
    fontSize: '13px',
    borderRadius: '6px'
  },
  clientMeta: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  clientLink: {
    textDecoration: 'none'
  },
  clientYears: {
    color: '#93a0b8',
    fontSize: '13px'
  },
  clientDescription: {
    color: '#cbd5e1',
    fontSize: '13px',
    maxWidth: '480px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};
