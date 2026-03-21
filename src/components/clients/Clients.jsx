import React from 'react';
import { resumeData } from '../../resumeData';

export default function Clients() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Clients</h2>
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
                  {client.name}
                </a>
              ) : (
                <span style={styles.clientName}>{client.name}</span>
              )}
              <span style={styles.clientYears}>{client.years}</span>
            </div>
            <div style={styles.clientDescription}>{client.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #23314d',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '24px'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 24px 0',
    fontSize: '32px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '12px'
  },
  clientsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  clientItem: {
    padding: '16px',
    background: 'rgba(16, 185, 129, 0.05)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  clientHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    gap: '12px'
  },
  clientLink: {
    color: '#38bdf8',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  clientName: {
    color: '#e2e8f0',
    fontSize: '16px',
    fontWeight: 600
  },
  clientYears: {
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  clientDescription: {
    color: '#cbd5e1',
    fontSize: '14px',
    lineHeight: 1.6
  }
};