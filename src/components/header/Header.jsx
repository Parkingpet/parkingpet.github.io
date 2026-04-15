import React from 'react';
import { resumeData } from '../../resumeData';

export default function Header() {
  return (
    <div style={styles.header} id="top">
      <h1 style={styles.headerName}>
        <pre style={{...styles.ascii, margin: 0, fontSize: '12px', lineHeight: '12px', color: '#38bdf8', animation: 'glitch 3s infinite'}}>
          {resumeData.personal.name}
        </pre>
      </h1>
      <nav style={styles.nav}>
        <a href="/" onClick={(e) => {e.preventDefault(); window.history.pushState(null, '', '/'); window.location.reload()}} style={styles.navLink} 
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Home</a>
        <a href="#summary" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Summary</a>
        <a href="#competencies" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Competencies</a>
        <a href="#skills" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Technical</a>
        <a href="#tools" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>DevOps Tools</a>
        <a href="#projects" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Projects</a>
        <a href="#experience" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Experience</a>
        <a href="#education" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Education</a>
        <a href="#clients" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>Clients</a>
        <a href="#mcp-servers" style={styles.navLink}
           onMouseEnter={(e) => {e.target.style.background = 'rgba(56,189,248,0.2)'; e.target.style.borderColor = '#38bdf8';}}
           onMouseLeave={(e) => {e.target.style.background = 'rgba(17,28,51,.6)'; e.target.style.borderColor = '#23314d';}}>MCP Servers</a>
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
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href="https://maps.google.com/?q=Oakland+San+Francisco+CA" target="_blank" rel="noopener noreferrer" style={styles.metaLink}>
            {resumeData.personal.location}
          </a>
        </span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href={`tel:${resumeData.personal.phone.replace(/\s/g, '')}`} style={styles.metaLink}>
            {resumeData.personal.phone}
          </a>
        </span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href={`mailto:${resumeData.personal.email}`} style={styles.metaLink}>
            {resumeData.personal.email}
          </a>
        </span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" style={styles.metaLink}>GitHub</a>
        </span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" style={styles.metaLink}>LinkedIn</a>
        </span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href="./Mustafa_McLinn_Resume_2025.pdf" download style={styles.metaLink}>Resume PDF</a>
        </span>
        <span style={{display: 'inline-block', marginRight: '10px'}}>
          <a href="./resume.txt" download style={styles.metaLink}>Resume TXT</a>
        </span>
      </p>
    </div>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(180deg, rgba(56,189,248,.10), rgba(56,189,248,0))',
    border: '1px solid #23314d',
    borderRadius: '8px',
    padding: '14px 16px 12px',
    boxShadow: '0 10px 30px rgba(0,0,0,.35)'
  },
  headerName: {
    margin: '0 0 8px 0',
    fontSize: '40px',
    fontWeight: 700,
    color: '#38bdf8',
    textAlign: 'center',
    letterSpacing: '-0.02em',
    textShadow: '0 0 15px rgba(56,189,248,0.7)',
    lineHeight: 0.95
  },
  nav: {
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    borderBottom: '2px solid #38bdf8',
    justifyContent: 'center'
  },
  navLink: {
    display: 'inline-block',
    padding: '6px 10px',
    border: '1px solid #23314d',
    borderBottom: 'none',
    background: 'rgba(17,28,51,.6)',
    borderRadius: '3px 3px 0 0',
    fontSize: '12px',
    fontWeight: 500,
    color: '#38bdf8',
    textDecoration: 'none',
    position: 'relative',
    top: '2px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  subtitle: {
    margin: '8px 0 0 0',
    fontSize: '18px',
    fontWeight: 600,
    color: '#10b981',
    textAlign: 'center',
    letterSpacing: '-0.01em'
  },
  badges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '8px 0',
    alignItems: 'center'
  },
  meta: {
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: '8px',
    lineHeight: 1.1
  },
  metaLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  ascii: {
    fontFamily: 'monospace',
    fontSize: '10px',
    lineHeight: '10px',
    whiteSpace: 'pre',
    color: '#94a3b8'
  }
};