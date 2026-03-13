import React from 'react';

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
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>MCP Servers</h2>
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
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.2)';
              e.currentTarget.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            }}
          >
            <div style={styles.serverHeader}>
              <div style={styles.serverName}>{server.name}</div>
              <div style={styles.serverStatus}>
                <span style={styles.statusDot}></span>
                {server.status}
              </div>
            </div>
            
            <div style={styles.serverCategory}>{server.category}</div>
            <div style={styles.serverDescription}>{server.description}</div>
            
            <div style={styles.commandSection}>
              <div style={styles.commandLabel}>Installation Command:</div>
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
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #23314d',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '24px'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 12px 0',
    fontSize: '32px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '12px'
  },
  description: {
    color: '#94a3b8',
    fontSize: '16px',
    marginBottom: '24px',
    lineHeight: 1.6
  },
  serversGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  serverCard: {
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    borderRadius: '10px',
    padding: '20px',
    transition: 'all 0.3s ease',
    cursor: 'default',
    position: 'relative',
    overflow: 'hidden'
  },
  serverHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  serverName: {
    color: '#38bdf8',
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  serverStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#10b981',
    fontSize: '12px',
    fontWeight: 500
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#10b981',
    boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
  },
  serverCategory: {
    color: '#f59e0b',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '8px'
  },
  serverDescription: {
    color: '#e2e8f0',
    fontSize: '14px',
    lineHeight: 1.5,
    marginBottom: '16px'
  },
  commandSection: {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    borderRadius: '6px',
    padding: '12px'
  },
  commandLabel: {
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '6px'
  },
  commandText: {
    color: '#38bdf8',
    fontSize: '13px',
    fontFamily: 'monospace',
    wordBreak: 'break-all'
  },
  footer: {
    borderTop: '1px solid rgba(56, 189, 248, 0.2)',
    paddingTop: '16px',
    marginTop: '20px'
  },
  footerText: {
    color: '#94a3b8',
    fontSize: '14px',
    lineHeight: 1.6
  },
  code: {
    background: 'rgba(56, 189, 248, 0.1)',
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