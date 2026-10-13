import React from 'react';
import { resumeData } from '../../resumeData';

export default function Education() {
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <span style={styles.badge}>EDU</span>
        <h2 style={styles.title}>Education</h2>
      </div>
      <div style={styles.educationList}>
        {resumeData.education.map((item, index) => (
          <div key={index} style={styles.educationItem}>
            <div style={styles.educationText}>{item}</div>
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
  educationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  educationItem: {
    padding: '10px',
    background: 'rgba(2,6,23,0.6)',
    border: '1px solid rgba(56,189,248,0.06)',
    borderRadius: '6px'
  },
  educationText: {
    color: '#e2e8f0',
    fontSize: '14px',
    lineHeight: 1.4
  }
};
