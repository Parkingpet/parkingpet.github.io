import React from 'react';
import { resumeData } from '../../resumeData';

export default function Skills() {
  const skillEntries = Object.entries(resumeData.skills);
  const mid = Math.ceil(skillEntries.length / 2);
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Technical Skills</h2>
      <div style={styles.grid}>
        <div style={styles.column}>
          {skillEntries.slice(0, mid).map(([category, skills]) => (
            <div key={category} style={styles.skillCategory}>
              <h3 style={styles.categoryTitle}>{category}</h3>
              <p style={styles.skillsList}>{skills}</p>
            </div>
          ))}
        </div>
        <div style={styles.column}>
          {skillEntries.slice(mid).map(([category, skills]) => (
            <div key={category} style={styles.skillCategory}>
              <h3 style={styles.categoryTitle}>{category}</h3>
              <p style={styles.skillsList}>{skills}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #23314d',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 20px 0',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  skillCategory: {
    background: 'rgba(11, 18, 32, 0.5)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    padding: '16px'
  },
  categoryTitle: {
    color: '#38bdf8',
    margin: '0 0 8px 0',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  skillsList: {
    color: '#e2e8f0',
    margin: '0',
    lineHeight: '1.5'
  }
};