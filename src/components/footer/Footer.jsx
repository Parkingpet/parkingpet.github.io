import React from 'react';

export default function Footer() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h3 style={styles.companyName}>Teckguy Consulting</h3>
        <p style={styles.tagline}>Independent IT Consulting & Support</p>
        
        <div style={styles.contactInfo}>
          <a href="mailto:mustafa.mclinn@outlook.com" style={styles.contactLink}>
            mustafa.mclinn@outlook.com
          </a>
          <span style={styles.separator}>•</span>
          <a href="tel:510-296-0233" style={styles.contactLink}>
            510-296-0233
          </a>
        </div>
        
        <p style={styles.services}>
          System Administration | Cloud Infrastructure | DevOps Automation
        </p>
      </div>
      
      <div style={styles.info}>
        <p style={styles.updated}>Last updated March 2026</p>
        <p style={styles.backToTop}>
          <a href="#top" style={styles.link}>Back to top</a>
        </p>
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
    marginBottom: '24px'
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
    margin: '0 0 20px 0'
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    margin: '0 0 16px 0',
    flexWrap: 'wrap'
  },
  contactLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'color 0.3s ease'
  },
  separator: {
    color: '#94a3b8',
    fontSize: '16px'
  },
  services: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: '0',
    fontWeight: 500
  },
  info: {
    borderTop: '1px solid #23314d',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  updated: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: '0',
    fontWeight: 500
  },
  backToTop: {
    margin: '0'
  },
  link: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'color 0.3s ease'
  }
};