import { useState } from 'react'

export default function Tools() {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('base64')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

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
        try { setOutput(JSON.stringify(JSON.parse(input), null, 2)) } catch { setOutput('Invalid JSON') }
      },
      minify: () => {
        try { setOutput(JSON.stringify(JSON.parse(input))) } catch { setOutput('Invalid JSON') }
      }
    },
    timestamp: {
      name: 'Timestamp',
      toDate: () => setOutput(new Date(parseInt(input) * 1000).toISOString()),
      toUnix: () => setOutput(Math.floor(new Date(input).getTime() / 1000).toString()),
      now: () => setOutput(Math.floor(Date.now() / 1000).toString())
    },
    hash: {
      name: 'Hash',
      md5: async () => {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
        setOutput(Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join(''))
      }
    },
    regex: {
      name: 'Regex',
      test: () => {
        try {
          const [_, pattern, flags] = input.match(/^\/(.+)\/([gimuy]*)$/) || []
          const regex = new RegExp(pattern || input, flags)
          setOutput(`Matches: ${regex.test(output) ? 'YES' : 'NO'}`)
        } catch { setOutput('Invalid regex') }
      }
    }
  }

  if (!show) {
    return (
      <button onClick={() => setShow(true)} style={styles.fab}>
        <span style={styles.fabIcon}>⚡</span>
      </button>
    )
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <span style={styles.title}>DevOps Tools</span>
          <button onClick={() => setShow(false)} style={styles.close}>×</button>
        </div>
        
        <div style={styles.tabs}>
          {Object.entries(tools).map(([key, tool]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{...styles.tab, ...(active === key ? styles.tabActive : {})}}
            >
              {tool.name}
            </button>
          ))}
        </div>

        <div style={styles.body}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Input..."
            style={styles.textarea}
          />
          
          <div style={styles.actions}>
            {Object.entries(tools[active]).filter(([k]) => k !== 'name').map(([key, fn]) => (
              <button key={key} onClick={fn} style={styles.btn}>
                {key}
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
    </div>
  )
}

const styles = {
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    border: 'none',
    boxShadow: '0 4px 20px rgba(56,189,248,0.4)',
    cursor: 'pointer',
    zIndex: 9998,
    transition: 'transform 0.2s',
  },
  fabIcon: {
    fontSize: '28px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)'
  },
  panel: {
    background: '#0f172a',
    border: '1px solid #38bdf8',
    borderRadius: '12px',
    width: '700px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    boxShadow: '0 0 50px rgba(56,189,248,0.3)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #1e293b',
    background: '#1e293b'
  },
  title: {
    color: '#38bdf8',
    fontSize: '18px',
    fontWeight: '600',
    fontFamily: 'monospace'
  },
  close: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '32px',
    cursor: 'pointer',
    lineHeight: '1',
    padding: 0
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '12px',
    borderBottom: '1px solid #1e293b',
    overflowX: 'auto'
  },
  tab: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid #1e293b',
    borderRadius: '6px',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'monospace',
    whiteSpace: 'nowrap'
  },
  tabActive: {
    background: '#1e293b',
    color: '#38bdf8',
    borderColor: '#38bdf8'
  },
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    overflow: 'auto'
  },
  textarea: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#e2e8f0',
    padding: '12px',
    fontFamily: 'monospace',
    fontSize: '13px',
    minHeight: '120px',
    resize: 'vertical'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  btn: {
    padding: '8px 16px',
    background: '#1e293b',
    border: '1px solid #38bdf8',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'monospace',
    textTransform: 'uppercase'
  }
}
