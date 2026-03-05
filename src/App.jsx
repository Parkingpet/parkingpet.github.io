import { useEffect, useState, useRef } from 'react'
import Tools from './Tools'
import { resumeData } from './resumeData'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p < 90 ? p + Math.random() * 30 : p)
    }, 100)

    setTimeout(() => {
      setProgress(100)
      setTimeout(() => setLoading(false), 500)
      clearInterval(interval)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div style={styles.loader}>
        <div style={styles.grid} />
        <div style={styles.terminal}>
          <div style={styles.terminalHeader}>root@resume:~$</div>
          <div style={styles.terminalBody}>
            <div>Initializing systems...</div>
            <div>Loading infrastructure...</div>
            <div>Deploying resume data...</div>
            <div style={styles.progress}>
              <div style={{...styles.progressBar, width: `${progress}%`}} />
            </div>
            <div style={styles.blink}>{Math.floor(progress)}% complete_</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={styles.grid} />
      <div style={styles.scanline} />
      <ParticleBackground />
      <div style={styles.content}>
        <div style={styles.container}>
          <Header />
          <Summary />
          <Competencies />
          <Skills />
          <DevOpsTools />
          <Projects />
          <Experience />
          <Education />
          <Clients />
          <Footer />
        </div>
      </div>
      <Tools />
    </>
  )
}

function ParticleBackground() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const particles = Array.from({length: 50}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5
    }))
    
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 18, 32, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#38bdf8'
      ctx.globalAlpha = 0.3
      
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = '#38bdf8'

      // Optimize: Avoid allocating new arrays with slice in animation loop
      // Optimize: Use squared distance to avoid expensive Math.sqrt calls
      const len = particles.length
      for (let i = 0; i < len; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          // 150 * 150 = 22500
          if (dx * dx + dy * dy < 22500) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    let animationFrameId = requestAnimationFrame(animate)
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return <canvas ref={canvasRef} style={styles.canvas} />
}

function Header() {
  return (
    <div style={styles.header} id="top">
      <h1 style={styles.h1}>{resumeData.personal.name}</h1>
      <p style={styles.subtitle}>{resumeData.personal.title}</p>
      
      <div style={styles.badges}>
        <img src="https://img.shields.io/badge/Experience-25%2B_Years-38bdf8?style=flat-square" alt="Experience" />
        <img src="https://img.shields.io/badge/AWS-Cloud-FF9900?logo=amazon-aws&logoColor=white&style=flat-square" alt="AWS" />
        <img src="https://img.shields.io/badge/Docker-Container-2496ED?logo=docker&logoColor=white&style=flat-square" alt="Docker" />
        <img src="https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes&logoColor=white&style=flat-square" alt="Kubernetes" />
        <img src="https://img.shields.io/badge/Python-Automation-3776AB?logo=python&logoColor=white&style=flat-square" alt="Python" />
        <img src="https://img.shields.io/badge/Linux-Systems-FCC624?logo=linux&logoColor=black&style=flat-square" alt="Linux" />
      </div>
      
      <p style={styles.meta}>
        <span style={{display: 'inline-block', marginRight: '10px'}}>{resumeData.personal.location}</span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>{resumeData.personal.phone}</span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a></span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href={resumeData.personal.github}>GitHub</a></span>
      </p>
      <nav style={styles.nav}>
        <a href="#summary" style={styles.navLink}>Summary</a>
        <a href="#competencies" style={styles.navLink}>Competencies</a>
        <a href="#skills" style={styles.navLink}>Technical</a>
        <a href="#tools" style={styles.navLink}>DevOps Tools</a>
        <a href="#projects" style={styles.navLink}>Projects</a>
        <a href="#experience" style={styles.navLink}>Experience</a>
        <a href="#education" style={styles.navLink}>Education</a>
        <a href="#clients" style={styles.navLink}>Clients</a>
      </nav>
    </div>
  )
}

function Summary() {
  return (
    <div style={styles.section} id="summary">
      <h2 style={styles.h2}>Professional Summary</h2>
      {resumeData.summary.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

function Competencies() {
  return (
    <div style={styles.section} id="competencies">
      <h2 style={styles.h2}>Core Competencies</h2>
      <div style={styles.chips}>
        {resumeData.competencies.map((comp, i) => (
          <span key={i} style={styles.chip}>{comp}</span>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const skillEntries = Object.entries(resumeData.skills)
  const mid = Math.ceil(skillEntries.length / 2)
  
  return (
    <div style={styles.section} id="skills">
      <h2 style={styles.h2}>Technical Skills</h2>
      <div style={styles.gridLayout}>
        <div>
          {skillEntries.slice(0, mid).map(([key, value]) => (
            <p key={key}><b>{key}</b><br/>{value}</p>
          ))}
        </div>
        <div>
          {skillEntries.slice(mid).map(([key, value]) => (
            <p key={key}><b>{key}</b><br/>{value}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

const listStyle = {margin: '8px 0 0', paddingLeft: '18px', color: '#e2e8f0'}

function DevOpsTools() {
  const [activeTab, setActiveTab] = useState('base64')
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
      sha256: async () => {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
        setOutput(Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join(''))
      }
    },
    regex: {
      name: 'Regex',
      test: () => {
        try {
          const [_, pattern, flags] = input.match(/^\/(.*)\/([gimuy]*)$/) || []
          const regex = new RegExp(pattern || input, flags)
          setOutput(`Test string: "${output}" - Match: ${regex.test(output) ? 'YES' : 'NO'}`)
        } catch { setOutput('Invalid regex') }
      }
    }
  }

  return (
    <div style={styles.section} id="tools">
      <h2 style={styles.h2}>DevOps Tools</h2>
      
      <div style={styles.toolTabs}>
        {Object.entries(tools).map(([key, tool]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{...styles.toolTab, ...(activeTab === key ? styles.toolTabActive : {})}}
          >
            {tool.name}
          </button>
        ))}
      </div>

      <div style={styles.toolBody}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Input..."
          style={styles.toolTextarea}
        />
        
        <div style={styles.toolActions}>
          {Object.entries(tools[activeTab]).filter(([k]) => k !== 'name').map(([key, fn]) => (
            <button key={key} onClick={fn} style={styles.toolBtn}>
              {key}
            </button>
          ))}
        </div>

        <textarea
          value={output}
          readOnly
          placeholder="Output..."
          style={styles.toolTextarea}
        />
      </div>
    </div>
  )
}

function Projects() {
  return (
    <div style={styles.section} id="projects">
      <h2 style={styles.h2}>Projects</h2>
      {resumeData.projects.map((project, i) => (
        <div key={i} style={styles.role}>
          <div style={styles.roleTop}>
            <div>
              <div style={styles.company}>{project.company}</div>
              <div style={styles.title}>{project.title}</div>
            </div>
            <div style={styles.date}>
              <a href={project.link}>Repo</a>
            </div>
          </div>
          <ul style={listStyle}>
            {project.achievements.map((achievement, j) => (
              <li key={j}>{achievement}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Experience() {
  return (
    <div style={styles.section} id="experience">
      <h2 style={styles.h2}>Professional Experience</h2>
      {resumeData.experience.map((job, i) => (
        <div key={i} style={styles.role}>
          <div style={styles.roleTop}>
            <div>
              <div style={styles.company}>{job.company}</div>
              <div style={styles.title}>{job.title}</div>
            </div>
            <div style={styles.date}>{job.date}</div>
          </div>
          <ul style={listStyle}>
            {job.achievements.map((achievement, j) => (
              <li key={j}>{achievement}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Education() {
  return (
    <div style={styles.section} id="education">
      <h2 style={styles.h2}>Education</h2>
      <div style={styles.role}>
        <ul style={listStyle}>
          {resumeData.education.map((edu, i) => (
            <li key={i}>{edu}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Clients() {
  return (
    <div style={styles.section} id="clients">
      <h2 style={styles.h2}>Consulting Clients</h2>
      <div style={styles.role}>
        <ul style={listStyle}>
          {resumeData.clients.map((client, i) => (
            <li key={i}>{client}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div style={styles.footer}>
      <p>Last updated March 2026</p>
      <p><a href="#top">Back to top</a></p>
    </div>
  )
}

const styles = {
  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.5
  },
  loader: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0b1220',
    zIndex: 9999
  },
  grid: {
    position: 'fixed',
    inset: 0,
    background: `
      linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px),
      linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    animation: 'gridMove 20s linear infinite'
  },
  scanline: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(transparent 50%, rgba(56,189,248,0.02) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
    animation: 'scanline 8s linear infinite'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 0.8s ease-out'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '36px 22px 60px',
    color: '#e2e8f0',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
    lineHeight: 1.55
  },
  header: {
    background: 'linear-gradient(180deg, rgba(56,189,248,.10), rgba(56,189,248,0))',
    border: '1px solid #23314d',
    borderRadius: '18px',
    padding: '22px 22px 18px',
    boxShadow: '0 10px 30px rgba(0,0,0,.35)'
  },
  h1: {
    margin: '0 0 6px',
    fontSize: '34px',
    letterSpacing: '.2px',
    color: '#38bdf8'
  },
  subtitle: {
    margin: '0 0 10px',
    color: '#e2e8f0',
    fontSize: '16px'
  },
  meta: {
    margin: 0,
    color: '#94a3b8',
    fontSize: '14px'
  },
  'meta span': {
    display: 'inline-block',
    marginRight: '10px'
  },
  nav: {
    marginTop: '14px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  navLink: {
    display: 'inline-block',
    padding: '8px 10px',
    border: '1px solid #23314d',
    background: 'rgba(17,28,51,.6)',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#38bdf8',
    textDecoration: 'none'
  },
  section: {
    marginTop: '22px',
    background: 'rgba(15,23,42,.65)',
    border: '1px solid #23314d',
    borderRadius: '18px',
    padding: '18px 18px 8px',
    boxShadow: '0 10px 26px rgba(0,0,0,.35)'
  },
  h2: {
    margin: '0 0 10px',
    fontSize: '18px',
    color: '#38bdf8',
    letterSpacing: '.2px'
  },
  gridLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    margin: '8px 0 10px'
  },
  chip: {
    background: '#15213b',
    border: '1px solid #23314d',
    borderRadius: '999px',
    padding: '7px 10px',
    fontSize: '13px',
    color: '#e2e8f0'
  },
  role: {
    padding: '14px 14px 12px',
    border: '1px solid #23314d',
    borderRadius: '16px',
    background: 'rgba(17,28,51,.55)',
    marginBottom: '12px'
  },
  roleTop: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '8px'
  },
  company: {
    fontWeight: 700,
    color: '#e2e8f0'
  },
  title: {
    color: '#94a3b8',
    fontWeight: 600
  },
  date: {
    color: '#94a3b8',
    fontSize: '13px',
    whiteSpace: 'nowrap'
  },
  footer: {
    marginTop: '18px',
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center',
    opacity: .9
  },
  terminal: {
    background: 'rgba(15,23,42,0.95)',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    width: '500px',
    maxWidth: '90vw',
    boxShadow: '0 0 50px rgba(56,189,248,0.3)',
    fontFamily: 'monospace',
    overflow: 'hidden'
  },
  terminalHeader: {
    background: '#1e293b',
    padding: '12px 16px',
    color: '#38bdf8',
    borderBottom: '1px solid #38bdf8',
    fontSize: '14px'
  },
  terminalBody: {
    padding: '20px',
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: '1.8'
  },
  progress: {
    height: '4px',
    background: '#1e293b',
    borderRadius: '2px',
    margin: '16px 0',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)',
    transition: 'width 0.3s ease',
    boxShadow: '0 0 10px #38bdf8'
  },
  blink: {
    color: '#38bdf8',
    animation: 'blink 1s step-end infinite'
  },
  toolTabs: {
    display: 'flex',
    gap: '4px',
    padding: '12px',
    borderBottom: '1px solid #1e293b',
    overflowX: 'auto'
  },
  toolTab: {
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
  toolTabActive: {
    background: '#1e293b',
    color: '#38bdf8',
    borderColor: '#38bdf8'
  },
  toolBody: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
    overflow: 'auto'
  },
  toolTextarea: {
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
  toolActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  toolBtn: {
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
