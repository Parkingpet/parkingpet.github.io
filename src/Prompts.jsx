import { useRef, useEffect } from 'react'

export default function Prompts() {
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

  const prompts = [
    { title: 'DevOps Code Review', description: 'Review infrastructure code for best practices', url: 'https://gist.github.com/Parkingpet/devops-code-review' },
    { title: 'AWS Architecture', description: 'Design scalable AWS infrastructure', url: 'https://gist.github.com/Parkingpet/aws-architecture' },
    { title: 'Kubernetes Deployment', description: 'Deploy and manage Kubernetes clusters', url: 'https://gist.github.com/Parkingpet/k8s-deployment' },
    { title: 'CI/CD Pipeline', description: 'Build automated deployment pipelines', url: 'https://gist.github.com/Parkingpet/cicd-pipeline' },
    { title: 'Security Hardening', description: 'Secure infrastructure and applications', url: 'https://gist.github.com/Parkingpet/security-hardening' },
    { title: 'Monitoring & Logging', description: 'Setup observability and alerting', url: 'https://gist.github.com/Parkingpet/monitoring-logging' },
    { title: 'Terraform IaC', description: 'Infrastructure as Code with Terraform', url: 'https://gist.github.com/Parkingpet/terraform-iac' },
    { title: 'Ansible Automation', description: 'Configuration management automation', url: 'https://gist.github.com/Parkingpet/ansible-automation' }
  ]

  return (
    <>
      <div style={styles.grid} />
      <div style={styles.scanline} />
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.content}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.h1}>Prompt Repository</h1>
            <p style={styles.subtitle}>DevOps & Infrastructure Automation Prompts</p>
            <a href="/" style={styles.backLink}>← Back to Resume</a>
          </div>

          <div style={styles.section}>
            <h2 style={styles.h2}>Available Prompts</h2>
            <div style={styles.promptGrid}>
              {prompts.map((prompt, i) => (
                <a key={i} href={prompt.url} target="_blank" rel="noopener noreferrer" style={styles.promptCard}>
                  <h3 style={styles.promptTitle}>{prompt.title}</h3>
                  <p style={styles.promptDesc}>{prompt.description}</p>
                  <span style={styles.promptLink}>View Gist →</span>
                </a>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            <p>Last updated March 2026</p>
            <p><a href="/">Back to Resume</a></p>
          </div>
        </div>
      </div>
    </>
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
    boxShadow: '0 10px 30px rgba(0,0,0,.35)',
    marginBottom: '22px'
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
  backLink: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '14px'
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
  promptGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginTop: '16px'
  },
  promptCard: {
    display: 'block',
    padding: '16px',
    background: 'rgba(17,28,51,.55)',
    border: '1px solid #23314d',
    borderRadius: '12px',
    color: '#e2e8f0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  promptTitle: {
    margin: '0 0 8px',
    fontSize: '16px',
    color: '#38bdf8',
    fontWeight: 600
  },
  promptDesc: {
    margin: '0 0 12px',
    fontSize: '14px',
    color: '#94a3b8'
  },
  promptLink: {
    display: 'inline-block',
    color: '#38bdf8',
    fontSize: '13px',
    fontWeight: 500
  },
  footer: {
    marginTop: '36px',
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center',
    opacity: .9
  }
}
