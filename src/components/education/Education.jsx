import React from 'react';
import { resumeData } from '../../resumeData';

export default function Education() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Education</h2>
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
  educationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  educationItem: {
    padding: '16px',
    background: 'rgba(56, 189, 248, 0.05)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  educationText: {
    color: '#e2e8f0',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.6
  }
};