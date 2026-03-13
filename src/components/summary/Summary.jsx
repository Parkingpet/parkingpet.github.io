import React from 'react';
import { resumeData } from '../../resumeData';

export default function Summary() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Professional Summary</h2>
      
      <div style={styles.summaryContent}>
        {resumeData.summary.map((paragraph, index) => (
          <p key={index} style={styles.paragraph}>{paragraph}</p>
        ))}
      </div>

      <h2 style={styles.title}>Core Competencies</h2>
      
      <div style={styles.competenciesGrid}>
        {resumeData.competencies.map((competency, index) => (
          <div 
            key={index} 
            style={styles.competencyTag}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(56, 189, 248, 0.2)';
              e.target.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            }}
          >
            {competency}
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
    margin: '0 0 20px 0',
    fontSize: '32px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '12px'
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '28px'
  },
  paragraph: {
    color: '#e2e8f0',
    margin: '0',
    lineHeight: 1.6,
    fontSize: '18px'
  },
  competenciesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '20px'
  },
  competencyTag: {
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#38bdf8',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden'
  }
};
