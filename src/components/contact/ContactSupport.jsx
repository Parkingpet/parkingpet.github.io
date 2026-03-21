import React, { useState } from 'react';

export default function ContactSupport() {
  const [isOpen, setIsOpen] = useState(true);

  const supportOptions = [
    {
      icon: '☎',
      title: 'Emergency Support',
      description: '24/7 Technical Emergency Line',
      buttonText: 'Call (510) 422-6366',
      link: 'tel:(510)422-6366',
      color: '#ef4444',
      borderColor: '#dc2626'
    },
    {
      icon: '📅',
      title: 'Schedule Appointment',
      description: 'Book consultation or service',
      buttonText: 'Call (925) 709-6110',
      link: 'tel:(925)709-6110',
      color: '#3b82f6',
      borderColor: '#2563eb'
    },
    {
      icon: '💬',
      title: 'Live Virtual Support 24/7',
      description: 'Start a conversation with our Tier 1 Support',
      buttonText: 'Call (415) 300-8810',
      link: 'tel:(415)300-8810',
      color: '#10b981',
      borderColor: '#059669'
    }
  ];

  if (!isOpen) {
    return (
      <div style={styles.collapsedContainer}>
        <button
          onClick={() => setIsOpen(true)}
          style={styles.expandButton}
          aria-label="Open Contact Support"
        >
          ☎
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Contact Support</h2>
        <button
          onClick={() => setIsOpen(false)}
          style={styles.closeButton}
          aria-label="Close Contact Support"
        >
          ✕
        </button>
      </div>

      <div style={styles.optionsContainer}>
        {supportOptions.map((option, index) => (
          <div key={index} style={styles.optionCard}>
            <div style={styles.optionHeader}>
              <span style={{ ...styles.icon, color: option.color }}>
                {option.icon}
              </span>
              <h3 style={styles.optionTitle}>{option.title}</h3>
            </div>
            <p style={styles.optionDescription}>{option.description}</p>
            <a
              href={option.link}
              style={{
                ...styles.callButton,
                backgroundColor: option.color,
                borderColor: option.borderColor
              }}
            >
              {option.icon} {option.buttonText}
            </a>
          </div>
        ))}
      </div>

      <p style={styles.footer}>Available 24/7 for support</p>

      <div style={styles.bottomSection}>
        <div style={styles.phoneIcon}>☎</div>
        <p style={styles.bottomText}>Secure • Reliable • Professional</p>
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
    maxWidth: '600px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    color: '#e2e8f0',
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  closeButton: {
    background: '#e2e8f0',
    border: 'none',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1e293b',
    fontWeight: 600,
    transition: 'all 0.2s ease'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px'
  },
  optionCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '10px',
    padding: '16px',
    transition: 'all 0.3s ease'
  },
  optionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  icon: {
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionTitle: {
    color: '#e2e8f0',
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  optionDescription: {
    color: '#94a3b8',
    margin: '0 0 12px 0',
    fontSize: '14px',
    lineHeight: 1.5
  },
  callButton: {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    letterSpacing: '-0.01em'
  },
  footer: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: '14px',
    margin: '16px 0',
    lineHeight: 1.5
  },
  bottomSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(148, 163, 184, 0.2)'
  },
  phoneIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '2px solid #3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#3b82f6'
  },
  bottomText: {
    color: '#64748b',
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '-0.01em'
  },
  collapsedContainer: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1000
  },
  expandButton: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '2px solid #3b82f6',
    background: 'rgba(15, 23, 42, 0.9)',
    color: '#3b82f6',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  }
};
