import React from 'react';

export default function EmailWidget() {
  const handleEmailClick = () => {
    const email = 'mustafa.mclinn@outlook.com';
    const subject = 'Sent from my GitHub page';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div style={styles.widget}>
      <div style={styles.header}>
        <h3 style={styles.title}>Get In Touch</h3>
        <div style={styles.icon}>📧</div>
      </div>
      <p style={styles.description}>
        Ready to discuss your next project? Send me an email directly from this page.
      </p>
      <button 
        onClick={handleEmailClick}
        style={styles.button}
        onMouseEnter={(e) => {
          e.target.style.background = styles.buttonHover.background;
          e.target.style.transform = styles.buttonHover.transform;
          e.target.style.boxShadow = styles.buttonHover.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = styles.button.background;
          e.target.style.transform = styles.button.transform;
          e.target.style.boxShadow = styles.button.boxShadow;
        }}
      >
        Send Email
      </button>
      <div style={styles.footer}>
        <small style={styles.footerText}>
          Subject: "Sent from my GitHub page"
        </small>
      </div>
    </div>
  );
}

const styles = {
  widget: {
    background: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(16,185,129,0.1))',
    border: '1px solid #23314d',
    borderRadius: '18px',
    padding: '24px',
    margin: '32px 0',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 600,
    color: '#38bdf8',
    textShadow: '0 0 10px rgba(56,189,248,0.5)'
  },
  icon: {
    fontSize: '32px',
    animation: 'float 3s ease-in-out infinite'
  },
  description: {
    margin: '0 0 24px 0',
    fontSize: '18px',
    color: '#cbd5e1',
    lineHeight: 1.6
  },
  button: {
    background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: 600,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    boxShadow: '0 4px 15px rgba(56,189,248,0.3)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  buttonHover: {
    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(56,189,248,0.5)'
  },
  footer: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(56,189,248,0.2)'
  },
  footerText: {
    color: '#94a3b8',
    fontSize: '14px',
    fontStyle: 'italic'
  }
};