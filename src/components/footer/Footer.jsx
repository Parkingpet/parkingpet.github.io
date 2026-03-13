import React from 'react';

export default function Footer() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h3 style={styles.companyName}>Teckguy Consulting</h3>
        <p style={styles.tagline}>Independent IT Consulting & Support</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #23314d',
    borderRadius: '12px',
    padding: '32px 24px',
    marginTop: '24px',
    textAlign: 'center'
  },
  content: {
    marginBottom: '0'
  },
  companyName: {
    color: '#38bdf8',
    fontSize: '24px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    letterSpacing: '-0.01em'
  },
  tagline: {
    color: '#10b981',
    fontSize: '16px',
    fontWeight: 500,
    margin: '0'
  }
};