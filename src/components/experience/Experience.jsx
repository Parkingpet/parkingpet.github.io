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
  job: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #23314d'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  company: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#38bdf8'
  },
  position: {
    fontSize: '16px',
    color: '#94a3b8',
    marginTop: '4px'
  },
  date: {
    fontSize: '14px',
    color: '#64748b',
    whiteSpace: 'nowrap'
  },
  achievements: {
    margin: '0',
    paddingLeft: '20px',
    listStyleType: 'disc'
  },
  achievement: {
    color: '#e2e8f0',
    marginBottom: '8px',
    lineHeight: '1.5'
  }
};