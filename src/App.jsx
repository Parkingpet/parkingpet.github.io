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
          <MicrosoftTools />
          <DevOpsTools />
          <CLITools />
          <InfrastructureTools />
          <GraphTools />
          <GoogleAITools />
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
      <h1 style={styles.headerName}>Mustafa "Moose" Mclinn</h1>
      <nav style={styles.nav}>
        <a href="/" onClick={(e) => {e.preventDefault(); window.history.pushState(null, '', '/'); window.location.reload()}} style={styles.navLink}>Home</a>
        <a href="/prompts" onClick={(e) => {e.preventDefault(); window.history.pushState(null, '', '/prompts'); window.location.reload()}} style={styles.navLink}>Prompts</a>
        <a href="#summary" style={styles.navLink}>Summary</a>
        <a href="#competencies" style={styles.navLink}>Competencies</a>
        <a href="#skills" style={styles.navLink}>Technical</a>
        <a href="#tools" style={styles.navLink}>DevOps Tools</a>
        <a href="#projects" style={styles.navLink}>Projects</a>
        <a href="#experience" style={styles.navLink}>Experience</a>
        <a href="#education" style={styles.navLink}>Education</a>
        <a href="#clients" style={styles.navLink}>Clients</a>
      </nav>
      <div style={styles.lcdScreen}>
        <div style={styles.lcdText}>{resumeData.personal.title}</div>
      </div>
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
}
