import { useEffect, useState, useRef } from 'react'
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
          <Projects />
          <Experience />
          <Education />
          <Clients />
          <DevOpsTools />
          <CLITools />
          <InfrastructureTools />
          <DevOpsCheatSheets />
          <GraphTools />
          <GoogleAITools />
          <MicrosoftTools />
          <MCPRegistries />
          <Footer />
        </div>
      </div>
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
    
    const particles = Array.from({length: 30}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1
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
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return <canvas ref={canvasRef} style={styles.canvas} />
}

function Header() {
  return (
    <div style={styles.header} id="top">
      <h1 style={styles.headerName}>
        <pre style={{...styles.ascii, margin: 0, fontSize: '8px', lineHeight: '8px', color: '#38bdf8', animation: 'glitch 3s infinite'}}>
{resumeData.personal.name}
        </pre>
      </h1>
      <nav style={styles.nav}>
        <a href="/" onClick={(e) => {e.preventDefault(); window.history.pushState(null, '', '/'); window.location.reload()}} style={styles.navLink}>Home</a>
        <a href="#summary" style={styles.navLink}>Summary</a>
        <a href="#competencies" style={styles.navLink}>Competencies</a>
        <a href="#skills" style={styles.navLink}>Technical</a>
        <a href="#tools" style={styles.navLink}>DevOps Tools</a>
        <a href="#projects" style={styles.navLink}>Projects</a>
        <a href="#experience" style={styles.navLink}>Experience</a>
        <a href="#education" style={styles.navLink}>Education</a>
        <a href="#clients" style={styles.navLink}>Clients</a>
      </nav>
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
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href="https://maps.google.com/?q=Oakland+San+Francisco+CA" target="_blank" rel="noopener noreferrer">{resumeData.personal.location}</a></span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href={`tel:${resumeData.personal.phone.replace(/\s/g, '')}`}>{resumeData.personal.phone}</a></span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a></span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href={resumeData.personal.github}>GitHub</a></span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href={resumeData.personal.linkedin}>LinkedIn</a></span>
        <span style={{display: 'inline-block', marginRight: '10px'}}><a href="/Mustafa_McLinn_Resume_2025.pdf" download>Resume PDF</a></span>
      </p>
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
    },
    jwt: {
      name: 'JWT',
      decode: () => {
        try {
          const parts = input.split('.')
          if (parts.length !== 3) throw new Error()
          const payload = JSON.parse(atob(parts[1]))
          setOutput(JSON.stringify(payload, null, 2))
        } catch { setOutput('Invalid JWT') }
      }
    },
    uuid: {
      name: 'UUID',
      generate: () => setOutput(crypto.randomUUID())
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

function MicrosoftTools() {
  const tools = [
    { name: 'Microsoft Intune', url: 'https://intune.microsoft.com', icon: '📱' },
    { name: 'Azure Portal', url: 'https://portal.azure.com', icon: '☁️' },
    { name: 'Entra ID', url: 'https://entra.microsoft.com', icon: '🔐' },
    { name: 'Microsoft 365 Admin', url: 'https://admin.microsoft.com', icon: '⚙️' },
    { name: 'Endpoint Manager', url: 'https://endpoint.microsoft.com', icon: '🖥️' },
    { name: 'Microsoft Graph', url: 'https://graph.microsoft.com', icon: '🔗' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>Microsoft Admin Tools</h2>
      <div style={styles.toolGrid}>
        {tools.map((tool, i) => (
          <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{tool.icon}</span>
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function CLITools() {
  const tools = [
    { name: 'Bash', url: 'https://www.gnu.org/software/bash/', icon: '🖥️' },
    { name: 'PowerShell', url: 'https://github.com/PowerShell/PowerShell', icon: '⚡' },
    { name: 'Git', url: 'https://git-scm.com/', icon: '🔗' },
    { name: 'Docker CLI', url: 'https://docs.docker.com/engine/reference/commandline/cli/', icon: '🚢' },
    { name: 'Kubectl', url: 'https://kubernetes.io/docs/reference/kubectl/', icon: '☸️' },
    { name: 'Terraform', url: 'https://www.terraform.io/docs/cli/', icon: '📄' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>CLI Tools</h2>
      <div style={styles.toolGrid}>
        {tools.map((tool, i) => (
          <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{tool.icon}</span>
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function InfrastructureTools() {
  const tools = [
    { name: 'Ansible', url: 'https://www.ansible.com/', icon: '🤖' },
    { name: 'Chef', url: 'https://www.chef.io/', icon: '👨‍👩‍👧‍👦' },
    { name: 'Prometheus', url: 'https://prometheus.io/', icon: '📊' },
    { name: 'ELK Stack', url: 'https://www.elastic.co/what-is/elk-stack', icon: '🔍' },
    { name: 'Jenkins', url: 'https://www.jenkins.io/', icon: '🔧' },
    { name: 'Jules Prompt', url: 'https://gist.github.com/Parkingpet/jules-prompt', icon: '📝' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>Infrastructure & Automation Tools</h2>
      <div style={styles.toolGrid}>
        {tools.map((tool, i) => (
          <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{tool.icon}</span>
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function DevOpsCheatSheets() {
  const sheets = [
    { name: 'Docker', url: 'https://docs.docker.com/get-started/docker_cheatsheet.pdf', icon: '🐳' },
    { name: 'Kubernetes', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/', icon: '☸️' },
    { name: 'Git', url: 'https://education.github.com/git-cheat-sheet-education.pdf', icon: '🐙' },
    { name: 'Linux Commands', url: 'https://www.guru99.com/linux-commands-cheat-sheet.html', icon: '🐧' },
    { name: 'Bash Scripting', url: 'https://devhints.io/bash', icon: '🐚' },
    { name: 'Vim', url: 'https://vim.rtorr.com/', icon: '📝' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>DevOps Cheat Sheets</h2>
      <div style={styles.toolGrid}>
        {sheets.map((sheet, i) => (
          <a key={i} href={sheet.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{sheet.icon}</span>
            {sheet.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function GraphTools() {
  const tools = [
    { name: 'Grafana', url: 'https://grafana.com/', icon: '📊' },
    { name: 'Datadog', url: 'https://www.datadoghq.com/', icon: '📈' },
    { name: 'New Relic', url: 'https://newrelic.com/', icon: '🔍' },
    { name: 'Splunk', url: 'https://www.splunk.com/', icon: '🔎' },
    { name: 'Kibana', url: 'https://www.elastic.co/kibana', icon: '📉' },
    { name: 'Tableau', url: 'https://www.tableau.com/', icon: '📋' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>Monitoring & Visualization Tools</h2>
      <div style={styles.toolGrid}>
        {tools.map((tool, i) => (
          <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{tool.icon}</span>
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function GoogleAITools() {
  const tools = [
    { name: 'Gemini', url: 'https://gemini.google.com/', icon: '✨' },
    { name: 'Vertex AI', url: 'https://cloud.google.com/vertex-ai', icon: '🤖' },
    { name: 'Google Cloud AI', url: 'https://cloud.google.com/ai', icon: '☁️' },
    { name: 'Bard', url: 'https://bard.google.com/', icon: '💬' },
    { name: 'Google Colab', url: 'https://colab.research.google.com/', icon: '📓' },
    { name: 'TensorFlow', url: 'https://www.tensorflow.org/', icon: '🧠' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>Google AI & ML Tools</h2>
      <div style={styles.toolGrid}>
        {tools.map((tool, i) => (
          <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{tool.icon}</span>
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function MCPRegistries() {
  const registries = [
    { name: 'MCP Registry', url: 'https://github.com/modelcontextprotocol/servers', icon: '📦' },
    { name: 'Smithery', url: 'https://smithery.ai/', icon: '🔨' },
    { name: 'Awesome MCP Servers', url: 'https://github.com/punkpeye/awesome-mcp-servers', icon: '⭐' },
    { name: 'MCP Hub', url: 'https://mcpserverhub.com/', icon: '🌐' }
  ]

  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>MCP Registries</h2>
      <div style={styles.toolGrid}>
        {registries.map((registry, i) => (
          <a key={i} href={registry.url} target="_blank" rel="noopener noreferrer" style={styles.toolLink}>
            <span style={{fontSize: '20px', marginRight: '8px'}}>{registry.icon}</span>
            {registry.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div style={styles.footer}>
      <pre style={styles.ascii}>{`
┌──────────────────────────────────────────────────────────────────────────────┐
│ Teckguy | Independent IT Consulting & Support                                │
│ Website: teckguy.com | Email: mustafa.mclinn@outlook.com | Phone: 510-296-0233 │
│ Services: System Administration | Cloud Infrastructure | DevOps Automation     │
└──────────────────────────────────────────────────────────────────────────────┘
      `}</pre>
      <p style={{marginTop: '16px'}}>Last updated March 2026</p>
      <p><a href="#top">Back to top</a></p>
    </div>
  )
}

const listStyle = {margin: '8px 0 0', paddingLeft: '18px', color: '#e2e8f0'}

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
      linear-gradient(90deg, rgba(56,189,248,0.01) 1px, transparent 1px),
      linear-gradient(rgba(56,189,248,0.01) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
    animation: 'gridMove 40s linear infinite'
  },
  scanline: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(transparent 50%, rgba(56,189,248,0.01) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
    animation: 'scanline 15s linear infinite'
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
  headerName: {
    margin: '0 0 16px 0',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#38bdf8',
    textAlign: 'center',
    letterSpacing: '2px',
    textShadow: '0 0 15px rgba(56,189,248,0.7)'
  },
  nav: {
    marginTop: '14px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    borderBottom: '2px solid #38bdf8',
    justifyContent: 'center'
  },
  navLink: {
    display: 'inline-block',
    padding: '8px 12px',
    border: '1px solid #23314d',
    borderBottom: 'none',
    background: 'rgba(17,28,51,.6)',
    borderRadius: '6px 6px 0 0',
    fontSize: '12px',
    color: '#38bdf8',
    textDecoration: 'none',
    position: 'relative',
    top: '2px'
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
  footer: {
    marginTop: '18px',
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center',
    opacity: .9
  },
  ascii: {
    fontFamily: 'monospace',
    fontSize: '10px',
    lineHeight: '10px',
    whiteSpace: 'pre',
    color: '#94a3b8'
  },
  terminal: {
    background: 'rgba(15,23,42,.9)',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'monospace',
    color: '#38bdf8',
    minWidth: '400px'
  },
  terminalHeader: {
    color: '#38bdf8',
    marginBottom: '10px',
    fontSize: '14px'
  },
  terminalBody: {
    fontSize: '12px',
    lineHeight: '1.4'
  },
  progress: {
    background: 'rgba(56,189,248,0.1)',
    height: '4px',
    borderRadius: '2px',
    margin: '10px 0',
    overflow: 'hidden'
  },
  progressBar: {
    background: '#38bdf8',
    height: '100%',
    transition: 'width 0.3s ease'
  },
  blink: {
    animation: 'blink 1s infinite'
  },
  toolTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px'
  },
  toolTab: {
    padding: '8px 16px',
    background: 'rgba(17,28,51,.6)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px'
  },
  toolTabActive: {
    background: 'rgba(56,189,248,.2)',
    borderColor: '#38bdf8'
  },
  toolBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  toolTextarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    background: 'rgba(11,18,32,.8)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontFamily: 'monospace',
    fontSize: '13px',
    resize: 'vertical'
  },
  toolActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  toolBtn: {
    padding: '8px 16px',
    background: 'rgba(56,189,248,.2)',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px'
  },
  subtitle: {
    margin: '12px 0',
    fontSize: '14px',
    color: '#94a3b8',
    textAlign: 'center'
  },
  badges: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '16px 0'
  },
  meta: {
    fontSize: '13px',
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: '12px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  chip: {
    padding: '6px 12px',
    background: 'rgba(56,189,248,.1)',
    border: '1px solid #23314d',
    borderRadius: '16px',
    fontSize: '12px',
    color: '#38bdf8'
  },
  gridLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  role: {
    marginBottom: '16px'
  },
  roleTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  company: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#38bdf8'
  },
  title: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  date: {
    fontSize: '13px',
    color: '#64748b'
  },
  toolGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  toolLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    background: 'rgba(17,28,51,.6)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    color: '#38bdf8',
    textDecoration: 'none'
  }
}
