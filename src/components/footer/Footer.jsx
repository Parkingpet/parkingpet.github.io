import React from 'react';

const footerTags = [
  'Systems Engineer',
  'DevOps',
  'Infrastructure Automation',
  'Cloud Hybrid Operations',
  'AWS',
  'Docker',
  'Kubernetes',
  'Python',
  'Linux'
];

export default function Footer() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.tagRow}>
          {footerTags.map((tag, index) => (
            <span key={index} style={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(9, 13, 22, 0.92)',
    border: '1px solid rgba(56, 189, 248, 0.1)',
    borderRadius: '8px',
    padding: '14px 16px',
    marginTop: '12px',
    boxShadow: 'inset 0 1px 0 rgba(148, 163, 184, 0.08)'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tagRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  tag: {
    display: 'inline-block',
    background: '#00121a',
    color: '#9fe9ff',
    border: '1px solid rgba(56, 189, 248, 0.12)',
    borderRadius: '6px',
    padding: '6px 8px',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    boxShadow: 'inset 0 -6px 18px rgba(0,0,0,0.35)'
  }
};
