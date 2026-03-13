import React, { useState } from 'react';
import { resumeData } from '../../resumeData';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [collapsedTools, setCollapsedTools] = useState({});

  const tools = {
    base64: {
      name: 'Base64',
      encode: () => setOutput(btoa(input)),
      decode: () => {
        try { setOutput(atob(input)) } catch { setOutput('Invalid base64') }
      }
    },
    json: {
      name: 'JSON',
      format: () => {
        try { setOutput(JSON.stringify(JSON.parse(input), null, 2)) } 
        catch { setOutput('Invalid JSON') }
      },
      minify: () => {
        try { setOutput(JSON.stringify(JSON.parse(input))) } 
        catch { setOutput('Invalid JSON') }
      }
    },
    timestamp: {
      name: 'Timestamp',
      toDate: () => setOutput(new Date(parseInt(input) * 1000).toISOString()),
      toUnix: () => setOutput(Math.floor(new Date(input).getTime() / 1000).toString()),
      now: () => setOutput(Math.floor(Date.now() / 1000).toString())
    },
    uuid: {
      name: 'UUID',
      generate: () => setOutput(crypto.randomUUID())
    },
    url: {
      name: 'URL',
      encode: () => setOutput(encodeURIComponent(input)),
      decode: () => {
        try { setOutput(decodeURIComponent(input)) } 
        catch { setOutput('Invalid URL encoding') }
      }
    },
    contact: {
      name: 'Contact',
      email: resumeData.personal.email,
      phone: resumeData.personal.phone,
      copyEmail: () => {
        navigator.clipboard.writeText(resumeData.personal.email);
        alert('Email copied to clipboard!');
      },
      copyPhone: () => {
        navigator.clipboard.writeText(resumeData.personal.phone);
        alert('Phone number copied to clipboard!');
      }
    }
  };

  const handleAction = (action) => {
    try {
      tools[activeTab][action]();
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  const toggleCollapse = (toolKey) => {
    setCollapsedTools(prev => ({
      ...prev,
      [toolKey]: !prev[toolKey]
    }));
  };

  const renderToolContent = () => {
    if (activeTab === 'contact') {
      return (
        <div style={styles.contactContainer}>
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>Email</h3>
            <div style={styles.contactValue}>{tools.contact.email}</div>
            <button 
              onClick={tools.contact.copyEmail}
              style={styles.copyButton}
            >
              Copy Email
            </button>
          </div>
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>Phone</h3>
            <div style={styles.contactValue}>{tools.contact.phone}</div>
            <button 
              onClick={tools.contact.copyPhone}
              style={styles.copyButton}
            >
              Copy Phone
            </button>
          </div>
          <div style={styles.contactNote}>
            <p>Click the copy buttons to copy contact information to clipboard.</p>
            <p>Use these details for professional inquiries and collaboration.</p>
          </div>
        </div>
      );
    }

    const isCollapsed = collapsedTools[activeTab];
    
    return (
      <div style={styles.toolBody}>
        <div style={styles.collapseHeader}>
          <h3 style={styles.toolTitle}>{tools[activeTab].name} Tool</h3>
          <button
            onClick={() => toggleCollapse(activeTab)}
            style={styles.collapseButton}
          >
            {isCollapsed ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input..."
              style={styles.textarea}
            />
            
            <div style={styles.actions}>
              {Object.entries(tools[activeTab])
                .filter(([key]) => key !== 'name')
                .map(([action]) => (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    style={styles.actionButton}
                  >
                    {action}
                  </button>
                ))}
            </div>
            
            <textarea
              value={output}
              readOnly
              placeholder="Output..."
              style={styles.textarea}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {Object.entries(tools).map(([key, tool]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              ...styles.tab,
              ...(activeTab === key ? styles.activeTab : {})
            }}
          >
            {tool.name}
          </button>
        ))}
      </div>
      
      {renderToolContent()}
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
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '8px 16px',
    background: 'rgba(17, 28, 51, 0.6)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px'
  },
  activeTab: {
    background: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38bdf8'
  },
  toolBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  collapseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #23314d'
  },
  toolTitle: {
    margin: 0,
    color: '#38bdf8',
    fontSize: '16px',
    fontWeight: '600'
  },
  collapseButton: {
    padding: '6px 12px',
    background: 'rgba(56, 189, 248, 0.1)',
    border: '1px solid #38bdf8',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '12px'
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    background: 'rgba(11, 18, 32, 0.8)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontFamily: 'monospace',
    fontSize: '13px',
    resize: 'vertical'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  actionButton: {
    padding: '8px 16px',
    background: 'rgba(56, 189, 248, 0.2)',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px'
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  contactCard: {
    background: 'rgba(11, 18, 32, 0.8)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  contactTitle: {
    margin: 0,
    color: '#38bdf8',
    fontSize: '14px',
    fontWeight: '600'
  },
  contactValue: {
    color: '#e2e8f0',
    fontSize: '16px',
    fontFamily: 'monospace',
    padding: '8px',
    background: 'rgba(17, 28, 51, 0.6)',
    borderRadius: '4px',
    border: '1px solid #23314d'
  },
  copyButton: {
    padding: '8px 16px',
    background: 'rgba(56, 189, 248, 0.2)',
    border: '1px solid #38bdf8',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px',
    alignSelf: 'flex-start'
  },
  contactNote: {
    color: '#94a3b8',
    fontSize: '12px',
    fontStyle: 'italic',
    padding: '8px',
    background: 'rgba(17, 28, 51, 0.3)',
    borderRadius: '4px',
    border: '1px solid #23314d'
  }
};