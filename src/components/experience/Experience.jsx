import React from 'react';
import { resumeData } from '../../resumeData';

export default function Experience() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Professional Experience</h2>
      {resumeData.experience.map((job, index) => (
        <div key={index} style={styles.job}>
          <div style={styles.jobHeader}>
            <div>
              <div style={styles.company}>{job.company}</div>
              <div style={styles.position}>{job.title}</div>
            </div>
            <div style={styles.date}>{job.date}</div>
          </div>
          <ul style={styles.achievements}>
            {job.achievements.map((achievement, idx) => (
              <li key={idx} style={styles.achievement}>{achievement}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #23314d',
    borderRadius: '6px',
    padding: '12px',
    marginTop: '8px'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '6px'
  },
  job: {
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #23314d'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px'
  },
  company: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#38bdf8',
    letterSpacing: '-0.01em'
  },
  position: {
    fontSize: '14px',
    color: '#94a3b8',
    marginTop: '2px',
    fontWeight: 500
  },
  date: {
    fontSize: '12px',
    color: '#64748b',
    whiteSpace: 'nowrap',
    fontWeight: 500
  },
  achievements: {
    margin: '0',
    paddingLeft: '16px',
    listStyleType: 'disc'
  },
  achievement: {
    color: '#e2e8f0',
    marginBottom: '4px',
    lineHeight: 1.1,
    fontSize: '12px'
  }
};