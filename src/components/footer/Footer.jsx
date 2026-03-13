import React from 'react';

export default function Footer() {
  return (
    <div style={styles.container}>
      <pre style={styles.ascii}>
        {`
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                        Teckguy Consulting                                    │
│                 Independent IT Consulting & Support                          │
│                                                                              │
│  Website: teckguy.com          Email: mustafa.mclinn@outlook.com             │
│  Phone: 510-296-0233                                                        │
│                                                                              │
│  Services: System Administration | Cloud Infrastructure | DevOps Automation  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
        `}
      </pre>
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
    padding: '24px',
    marginTop: '24px',
    textAlign: 'center'
  },
  ascii: {
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: 1.4,
    whiteSpace: 'pre',
    color: '#94a3b8',
    margin: '0 0 20px 0',
    overflow: 'hidden',
    textAlign: 'center'
  },
  info: {
    marginTop: '20px'
  },
  updated: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '0 0 12px 0',
    fontWeight: 500
  },
  backToTop: {
    margin: '0'
  },
  link: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500
  }
};