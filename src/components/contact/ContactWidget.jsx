import React, { useState } from 'react';

export default function ContactWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <>
      {isExpanded && (
        <div style={styles.overlay} onClick={() => setIsExpanded(false)} />
      )}
      
      <div style={{
        ...styles.container,
        ...(!isExpanded && styles.collapsedContainer)
      }}>
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            style={styles.floatingButton}
            aria-label="Open Contact Support"
            title="Contact Support"
          >
            ☎
          </button>
        ) : (
          <>
            <div style={styles.header}>
              <h3 style={styles.title}>Contact Support</h3>
              <button
                onClick={() => setIsExpanded(false)}
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
                    <h4 style={styles.optionTitle}>{option.title}</h4>
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
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    pointerEvents: 'auto'
  },
  container: {
    position: 'fixed',
    bottom: '24px',
    left: '24px',
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid #23314d',
    borderRadius: '12px',
    padding: '24px',
    width: '320px',
    zIndex: 1000,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    animation: 'slideUp 0.3s ease-out'
  },
  collapsedContainer: {
    padding: 0,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    width: 'auto'
  },
  floatingButton: {
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
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    padding: 0
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    color: '#e2e8f0',
    margin: 0,
    fontSize: '20px',
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
    transition: 'all 0.2s ease',
    padding: 0
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  optionCard: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '10px',
    padding: '12px',
    transition: 'all 0.3s ease'
  },
  optionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  icon: {
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px'
  },
  optionTitle: {
    color: '#e2e8f0',
    margin: 0,
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  optionDescription: {
    color: '#94a3b8',
    margin: '0 0 10px 0',
    fontSize: '13px',
    lineHeight: 1.5
  },
  callButton: {
    display: 'block',
    width: '100%',
    padding: '8px 10px',
    borderRadius: '6px',
    border: 'none',
    color: '#ffffff',
    fontSize: '12px',
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
    fontSize: '13px',
    margin: '16px 0',
    lineHeight: 1.5
  },
  bottomSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
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
    fontSize: '20px',
    color: '#3b82f6',
    flexShrink: 0
  },
  bottomText: {
    color: '#64748b',
    margin: 0,
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '-0.01em'
  }
};
