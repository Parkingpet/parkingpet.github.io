import React from 'react';
import { resumeData } from '../../resumeData';

export default function Projects() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} style={styles.project}>
          <div style={styles.projectHeader}>
            <div>
              <div style={styles.company}>{project.company}</div>
              <div style={styles.projectTitle}>{project.title}</div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                  View Project →
                </a>
              )}
            </div>
          </div>
          <ul style={styles.achievements}>
            {project.achievements.map((achievement, idx) => (
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
    borderRadius: '8px',
    padding: '16px',
    marginTop: '12px'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 12px 0',
    fontSize: '28px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '8px'
  },
  project: {
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #23314d'
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px'
  },
  company: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#38bdf8',
    letterSpacing: '-0.01em'
  },
  projectTitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginTop: '4px',
    fontWeight: 500
  },
  projectLink: {
    fontSize: '12px',
    color: '#10b981',
    textDecoration: 'none',
    marginTop: '6px',
    display: 'inline-block',
    fontWeight: 500
  },
  achievements: {
    margin: '0',
    paddingLeft: '18px',
    listStyleType: 'disc'
  },
  achievement: {
    color: '#e2e8f0',
    marginBottom: '6px',
    lineHeight: 1.2,
    fontSize: '13px'
  }
};