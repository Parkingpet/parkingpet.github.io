import React, { useState } from 'react';

const mcpServers = [
  {
    name: "AWS Documentation MCP",
    description: "Access AWS service documentation and best practices",
    command: "uvx awslabs.aws-documentation-mcp-server@latest",
    category: "Cloud Services",
    status: "Active"
  },
  {
    name: "GitHub MCP Server",
    description: "Interact with GitHub repositories, issues, and pull requests",
    command: "uvx github-mcp-server@latest",
    category: "Version Control",
    status: "Active"
  },
  {
    name: "Docker MCP Server",
    description: "Manage Docker containers, images, and compose files",
    command: "uvx docker-mcp-server@latest",
    category: "Containerization",
    status: "Active"
  },
  {
    name: "Kubernetes MCP Server",
    description: "Deploy and manage Kubernetes clusters and resources",
    command: "uvx kubernetes-mcp-server@latest",
    category: "Orchestration",
    status: "Active"
  },
  {
    name: "Terraform MCP Server",
    description: "Infrastructure as Code management and deployment",
    command: "uvx terraform-mcp-server@latest",
    category: "Infrastructure",
    status: "Active"
  },
  {
    name: "Ansible MCP Server",
    description: "Configuration management and automation playbooks",
    command: "uvx ansible-mcp-server@latest",
    category: "Automation",
    status: "Active"
  },
  {
    name: "Prometheus MCP Server",
    description: "Monitoring, alerting, and metrics collection",
    command: "uvx prometheus-mcp-server@latest",
    category: "Monitoring",
    status: "Active"
  },
  {
    name: "PostgreSQL MCP Server",
    description: "Database management and query execution",
    command: "uvx postgresql-mcp-server@latest",
    category: "Database",
    status: "Active"
  }
];

export default function MCPServers() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.titleSection}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              ...styles.toggleButton,
              transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)'
            }}
            aria-label={isExpanded ? 'Collapse MCP Servers' : 'Expand MCP Servers'}
          >
            ▼
          </button>
          <div style={styles.titleWrap}>
            <span style={styles.badge}>MCP</span>
            <h2 style={styles.title}>MCP Servers</h2>
          </div>
        </div>
      </div>

      {isExpanded && (
        <>
          <p style={styles.description}>
            Model Context Protocol servers for enhanced DevOps automation and infrastructure management
          </p>
          
          <div style={styles.serversGrid}>
            {mcpServers.map((server, index) => (
              <div 
                key={index} 
                style={styles.serverCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.12)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.08)';
                }}
              >
                <div style={styles.serverHeader}>
                  <div style={styles.serverName}>{server.name}</div>
                  <div style={styles.serverStatus}>
                    <span style={styles.statusDot}></span>
                    {server.status}
                  </div>
                </div>
                
                <div style={styles.serverCategory}><span style={styles.categoryBadge}>{server.category}</span></div>
                <div style={styles.serverDescription}>{server.description}</div>
                
                <div style={styles.commandSection}>
                  <div style={styles.commandLabel}><span style={styles.cmdBadge}>CMD</span> Installation Command:</div>
                  <div style={styles.commandText}>{server.command}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.footer}>
            <div style={styles.footerText}>
              <strong>Note:</strong> MCP servers require <code style={styles.code}>uv</code> and <code style={styles.code}>uvx</code> to be installed. 
              Install with: <code style={styles.code}>pip install uv</code> or visit{' '}
              <a 
                href="https://docs.astral.sh/uv/getting-started/installation/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.link}
              >
                uv installation guide
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(9, 13, 22, 0.92)',
    border: '1px solid rgba(56, 189, 248, 0.08)',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '12px'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#38bdf8',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px 8px',
    transition: 'transform 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1
  },
  badge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#00d9ff',
    border: '1px solid rgba(56,189,248,0.14)',
    padding: '6px 8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    borderRadius: '6px'
  },
  title: {
    color: '#38bdf8',
    margin: '0',
    fontSize: '18px',
    fontWeight: 700,
    fontFamily: 'monospace'
  },
  description: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '16px',
    lineHeight: 1.5
  },
  serversGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  serverCard: {
    background: 'rgba(2,6,23,0.65)',
    border: '1px solid rgba(56, 189, 248, 0.06)',
    borderRadius: '8px',
    padding: '14px',
    transition: 'all 0.25s ease',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden'
  },
  serverHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px'
  },
  serverName: {
    color: '#38bdf8',
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '-0.01em'
  },
  serverStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#10b981',
    fontSize: '12px',
    fontWeight: 600
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#10b981',
    boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
  },
  serverCategory: {
    marginBottom: '8px'
  },
  categoryBadge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#ffd580',
    border: '1px solid rgba(245,158,11,0.06)',
    padding: '4px 8px',
    fontFamily: 'monospace',
    fontSize: '12px',
    borderRadius: '6px'
  },
  serverDescription: {
    color: '#e2e8f0',
    fontSize: '13px',
    lineHeight: 1.4,
    marginBottom: '12px'
  },
  commandSection: {
    background: 'rgba(0, 0, 0, 0.35)',
    border: '1px solid rgba(56, 189, 248, 0.06)',
    borderRadius: '6px',
    padding: '10px'
  },
  commandLabel: {
    color: '#93a0b8',
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '6px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  cmdBadge: {
    display: 'inline-block',
    background: '#00121a',
    color: '#cfeffd',
    fontFamily: 'monospace',
    padding: '3px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    border: '1px solid rgba(56,189,248,0.06)'
  },
  commandText: {
    color: '#38bdf8',
    fontSize: '13px',
    fontFamily: 'monospace',
    wordBreak: 'break-all'
  },
  footer: {
    borderTop: '1px solid rgba(56, 189, 248, 0.06)',
    paddingTop: '12px',
    marginTop: '12px'
  },
  footerText: {
    color: '#94a3b8',
    fontSize: '13px',
    lineHeight: 1.5
  },
  code: {
    background: 'rgba(56, 189, 248, 0.06)',
    color: '#38bdf8',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '13px',
    fontFamily: 'monospace'
  },
  link: {
    color: '#38bdf8',
    textDecoration: 'none'
  }
};
