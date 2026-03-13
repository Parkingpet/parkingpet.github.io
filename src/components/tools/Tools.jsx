import React, { useState } from 'react';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

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
    }
  };

  const handleAction = (action) => {
    try {
      tools[activeTab][action]();
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
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
      
      <div style={styles.toolBody}>
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
      </div>
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
  }
};