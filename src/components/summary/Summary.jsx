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

      <div id="competencies">
        <h2 style={styles.title}>Core Competencies</h2>

        <div style={styles.competenciesGrid}>
          {resumeData.competencies.map((competency, index) => (
            <div
              key={index}
              style={styles.competencyTag}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(56, 189, 248, 0.18)';
                e.target.style.borderColor = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = 'rgba(56, 189, 248, 0.25)';
              }}
            >
              {competency}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(9, 13, 22, 0.92)',
    border: '1px solid rgba(56, 189, 248, 0.12)',
    borderRadius: '8px',
    padding: '12px 12px 10px',
    marginTop: '8px',
    boxShadow: 'inset 0 1px 0 rgba(148, 163, 184, 0.08)'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
    paddingBottom: '6px'
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '10px'
  },
  paragraph: {
    color: '#e2e8f0',
    margin: '0',
    lineHeight: 1.3,
    fontSize: '13px'
  },
  competenciesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '7px',
    marginBottom: '4px'
  },
  competencyTag: {
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: '5px',
    padding: '7px 9px',
    color: '#38bdf8',
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'center',
    transition: 'all 0.2s ease',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden'
  }
};
