import React, { useState } from 'react';
import { resumeData } from '../../resumeData';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [collapsedTools, setCollapsedTools] = useState({});
  const [collapsedLinks, setCollapsedLinks] = useState({
    quickLinks: true,
    consoles: true,
    azure: true,
    aws: true,
    gcp: true,
    docs: true,
    testing: true,
    registries: true,
    cliCurls: true
  });

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
    sha256: {
      name: 'SHA-256',
      hash: async () => {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(input);
          const hashBuffer = await crypto.subtle.digest('SHA-256', data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          setOutput(hashHex);
        } catch { setOutput('Error generating hash') }
      }
    },
    regex: {
      name: 'Regex',
      test: () => {
        try {
          // ReDoS mitigation: limit pattern and input length
          if (input.length > 1024) throw new Error('Input too long');
          const [pattern, flags] = input.split('\n');
          if (pattern.length > 128) throw new Error('Pattern too long');
          const regex = new RegExp(pattern, flags || '');
          setOutput(regex.test(input) ? 'Match found' : 'No match');
        } catch (e) { setOutput('Error: ' + e.message) }
      },
      match: () => {
        try {
          if (input.length > 1024) throw new Error('Input too long');
          const [pattern, flags] = input.split('\n');
          if (pattern.length > 128) throw new Error('Pattern too long');
          const regex = new RegExp(pattern, flags || 'g');
          const matches = input.match(regex);
          setOutput(matches ? matches.join('\n') : 'No matches');
        } catch (e) { setOutput('Error: ' + e.message) }
      }
    },
    jwt: {
      name: 'JWT Decoder',
      decode: () => {
        try {
          const parts = input.split('.');
          if (parts.length !== 3) throw new Error('Invalid JWT');
          // Handle Base64URL encoding (replace -/_ and add padding)
          const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const pad = base64.length % 4;
          const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
          const payload = JSON.parse(atob(padded));
          setOutput(JSON.stringify(payload, null, 2));
        } catch { setOutput('Invalid JWT token') }
      }
    },
    yaml: {
      name: 'YAML to JSON',
      convert: () => {
        try {
          const lines = input.split('\n');
          const obj = {};
          lines.forEach(line => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key) obj[key] = value;
          });
          setOutput(JSON.stringify(obj, null, 2));
        } catch { setOutput('Error converting YAML') }
      }
    },
    mac: {
      name: 'MAC Formatter',
      colon: () => {
        const clean = input.replace(/[^a-fA-F0-9]/g, '');
        if (clean.length !== 12) { setOutput('Invalid MAC address length'); return; }
        setOutput(clean.match(/.{1,2}/g).join(':').toUpperCase());
      },
      hyphen: () => {
        const clean = input.replace(/[^a-fA-F0-9]/g, '');
        if (clean.length !== 12) { setOutput('Invalid MAC address length'); return; }
        setOutput(clean.match(/.{1,2}/g).join('-').toUpperCase());
      },
      dot: () => {
        const clean = input.replace(/[^a-fA-F0-9]/g, '');
        if (clean.length !== 12) { setOutput('Invalid MAC address length'); return; }
        setOutput(clean.match(/.{1,4}/g).join('.').toLowerCase());
      },
      continuous: () => {
        const clean = input.replace(/[^a-fA-F0-9]/g, '');
        if (clean.length !== 12) { setOutput('Invalid MAC address length'); return; }
        setOutput(clean.toUpperCase());
      }
    },
    ip: {
      name: 'IP Converter',
      binary: () => {
        try {
          const octets = input.split('.');
          if (octets.length !== 4) throw new Error();
          const bin = octets.map(n => parseInt(n).toString(2).padStart(8, '0')).join('.');
          setOutput(bin);
        } catch { setOutput('Invalid IPv4 address') }
      },
      hex: () => {
        try {
          const octets = input.split('.');
          if (octets.length !== 4) throw new Error();
          const hex = octets.map(n => parseInt(n).toString(16).padStart(2, '0')).join('.');
          setOutput(hex.toUpperCase());
        } catch { setOutput('Invalid IPv4 address') }
      },
      decimal: () => {
        try {
          const octets = input.split('.');
          if (octets.length !== 4) throw new Error();
          let dec = 0;
          for (let i = 0; i < 4; i++) {
            dec += parseInt(octets[i]) * Math.pow(256, 3 - i);
          }
          setOutput(dec.toString());
        } catch { setOutput('Invalid IPv4 address') }
      }
    },
    cli: {
      name: 'CLI Commands',
      docker: () => setOutput('docker ps\ndocker build -t image:tag .\ndocker run -d image:tag'),
      kubectl: () => setOutput('kubectl get pods\nkubectl apply -f deployment.yaml\nkubectl logs pod-name'),
      git: () => setOutput('git clone <repo>\ngit checkout -b feature\ngit push origin feature'),
      terraform: () => setOutput('terraform init\nterraform plan\nterraform apply'),
      aws: () => setOutput('aws s3 ls\naws ec2 describe-instances\naws lambda list-functions')
    },
    infrastructure: {
      name: 'Infrastructure',
      ports: () => setOutput('HTTP: 80\nHTTPS: 443\nSSH: 22\nPostgreSQL: 5432\nMongoDB: 27017\nRedis: 6379'),
      cidr: () => setOutput('10.0.0.0/8 - Private\n172.16.0.0/12 - Private\n192.168.0.0/16 - Private'),
      dns: () => setOutput('8.8.8.8 - Google DNS\n1.1.1.1 - Cloudflare DNS\n208.67.222.222 - OpenDNS'),
      ssl: () => setOutput('Generate: openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365')
    },
    subnet: {
      name: 'Subnet Calc',
      calculate: () => {
        try {
          const cidrPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/;
          const match = input.match(cidrPattern);
          if (!match) {
            setOutput('Invalid CIDR format. Use format: 192.168.1.0/24');
            return;
          }

          const octets = match.slice(1, 5).map(Number);
          const prefix = Number(match[5]);

          if (octets.some(o => o > 255 || o < 0) || prefix < 0 || prefix > 32) {
            setOutput('Invalid IP or Prefix. Octets must be 0-255, Prefix 0-32.');
            return;
          }

          const ipNum = (octets[0] << 24 | octets[1] << 16 | octets[2] << 8 | octets[3]) >>> 0;
          const maskNum = (0xffffffff << (32 - prefix)) >>> 0;
          const networkNum = (ipNum & maskNum) >>> 0;
          const broadcastNum = (networkNum | ~maskNum) >>> 0;

          const toIP = (num) => [
            (num >>> 24) & 255,
            (num >>> 16) & 255,
            (num >>> 8) & 255,
            num & 255
          ].join('.');

          const mask = toIP(maskNum);
          const network = toIP(networkNum);
          const broadcast = toIP(broadcastNum);
          const hosts = prefix >= 31 ? 0 : Math.pow(2, 32 - prefix) - 2;
          const firstHost = prefix >= 31 ? 'N/A' : toIP(networkNum + 1);
          const lastHost = prefix >= 31 ? 'N/A' : toIP(broadcastNum - 1);

          setOutput(
            `IP Address: ${octets.join('.')}\n` +
            `Subnet Mask: ${mask}\n` +
            `Network Address: ${network}\n` +
            `Broadcast Address: ${broadcast}\n` +
            `Total Usable Hosts: ${hosts}\n` +
            `Host Range: ${firstHost} - ${lastHost}`
          );
        } catch {
          setOutput('Error calculating subnet');
        }
      }
    },
    devops: {
      name: 'DevOps Tools',
      cicd: () => setOutput('GitHub Actions\nGitLab CI\nJenkins\nCircleCI\nTravis CI'),
      monitoring: () => setOutput('Prometheus\nGrafana\nDatadog\nNew Relic\nElasticsearch'),
      containers: () => setOutput('Docker\nPodman\nContainerd\nCRI-O'),
      orchestration: () => setOutput('Kubernetes\nDocker Swarm\nNomad\nOpenShift')
    },
    msadmin: {
      name: 'MS Admin',
      adcommands: () => setOutput('Get-ADUser -Filter *\nNew-ADUser -Name "User"\nSet-ADUser -Identity user -Title "Title"'),
      powershell: () => setOutput('Get-Process\nGet-Service\nRestart-Computer\nStop-Service -Name ServiceName'),
      exchange: () => setOutput('Get-Mailbox\nNew-Mailbox -Name "User"\nSet-Mailbox -Identity user -ForwardingAddress admin@domain.com'),
      sharepoint: () => setOutput('Connect-PnPOnline -Url https://tenant.sharepoint.com\nGet-PnPList\nNew-PnPList -Title "List"')
    },
    sedawk: {
      name: 'Sed/Awk',
      findReplace: () => {
        try {
          const lines = input.split('\n');
          const [pattern, replacement] = lines.slice(0, 2);
          if (!pattern || !replacement) {
            setOutput('Format: Line 1: pattern to find\nLine 2: replacement text\nLine 3+: text to process');
            return;
          }
          const text = lines.slice(2).join('\n');
          const regex = new RegExp(pattern, 'g');
          setOutput(text.replace(regex, replacement));
        } catch { setOutput('Error: Invalid pattern or replacement') }
      },
      deleteLines: () => {
        try {
          const lines = input.split('\n');
          const pattern = lines[0];
          if (!pattern) {
            setOutput('Format: Line 1: pattern to match\nLine 2+: text to process');
            return;
          }
          const text = lines.slice(1).join('\n');
          const regex = new RegExp(pattern);
          const result = text.split('\n').filter(line => !regex.test(line)).join('\n');
          setOutput(result);
        } catch { setOutput('Error: Invalid pattern') }
      },
      extractFields: () => {
        try {
          const lines = input.split('\n');
          const delimiter = lines[0] || ' ';
          const fieldNum = parseInt(lines[1]) || 1;
          const text = lines.slice(2).join('\n');
          const result = text.split('\n').map(line => {
            const fields = line.split(new RegExp(delimiter));
            return fields[fieldNum - 1] || '';
          }).join('\n');
          setOutput(result);
        } catch { setOutput('Error: Invalid field number or delimiter') }
      },
      countLines: () => {
        try {
          const lines = input.split('\n').filter(l => l.trim());
          setOutput(`Total lines: ${lines.length}\nCharacters: ${input.length}\nWords: ${input.split(/\s+/).filter(w => w).length}`);
        } catch { setOutput('Error counting lines') }
      },
      printLines: () => {
        try {
          const lines = input.split('\n');
          const startLine = parseInt(lines[0]) || 1;
          const endLine = parseInt(lines[1]) || startLine;
          const text = lines.slice(2).join('\n');
          const textLines = text.split('\n');
          const result = textLines.slice(startLine - 1, endLine).join('\n');
          setOutput(result);
        } catch { setOutput('Error: Invalid line numbers') }
      },
      transform: () => {
        try {
          const lines = input.split('\n');
          const operation = lines[0]?.toLowerCase() || 'upper';
          const text = lines.slice(1).join('\n');
          let result = text;
          if (operation === 'upper') result = text.toUpperCase();
          else if (operation === 'lower') result = text.toLowerCase();
          else if (operation === 'reverse') result = text.split('\n').map(l => l.split('').reverse().join('')).join('\n');
          else if (operation === 'trim') result = text.split('\n').map(l => l.trim()).join('\n');
          setOutput(result);
        } catch { setOutput('Error: Invalid operation') }
      }
    },
    downloads: {
      name: 'Downloads',
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
    if (activeTab === 'downloads') {
      return (
        <div style={styles.contactContainer}>
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>Mustafa McLinn Resume 2025 (PDF)</h3>
            <div style={styles.contactNote}>
              <p>Download the official PDF format of the resume.</p>
            </div>
            <a
              href="/Mustafa_McLinn_Resume_2025.pdf"
              download
              style={{...styles.copyButton, textDecoration: 'none', display: 'inline-block'}}
            >
              Download PDF
            </a>
          </div>
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>Mustafa McLinn Resume (TXT)</h3>
            <div style={styles.contactNote}>
              <p>Download the plain text format of the resume for ATS parsing.</p>
            </div>
            <a
              href="/resume.txt"
              download
              style={{...styles.copyButton, textDecoration: 'none', display: 'inline-block'}}
            >
              Download TXT
            </a>
          </div>
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>DevOps Cheat Sheet</h3>
            <div style={styles.contactNote}>
              <p>Download a handy plain-text cheat sheet with useful DevOps commands and tips.</p>
            </div>
            <a
              href="/devops_cheatsheet.txt"
              download
              style={{...styles.copyButton, textDecoration: 'none', display: 'inline-block'}}
            >
              Download Cheat Sheet
            </a>
          </div>
        </div>
      );
    }

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

    // Tools that don't need input (reference/lookup tools)
    const noInputTools = ['cli', 'infrastructure', 'devops', 'msadmin', 'downloads'];
    const needsInput = !noInputTools.includes(activeTab) && activeTab !== 'sedawk';
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
            {needsInput && (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input..."
                style={styles.textarea}
                aria-label="Tool input"
              />
            )}
            
            <div style={styles.actions}>
              {Object.entries(tools[activeTab])
                .filter(([key]) => key !== 'name')
                .map(([action]) => (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    style={styles.actionButton}
                  >
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </button>
                ))}
            </div>
            
            <textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              style={styles.textarea}
              aria-label="Tool output"
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>DevOps Tools & Quick Links</h2>
      
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
      
      <div style={styles.linksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Quick Links</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, quickLinks: !prev.quickLinks }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.quickLinks ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.quickLinks && (
          <div style={styles.linksGrid}>
            <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐳</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Docker</div>
                <div style={styles.linkDesc}>Container platform and registry</div>
              </div>
            </a>

            <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>☸️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Kubernetes</div>
                <div style={styles.linkDesc}>Container orchestration platform</div>
              </div>
            </a>

            <a href="https://www.terraform.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🏗️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Terraform</div>
                <div style={styles.linkDesc}>Infrastructure as Code tool</div>
              </div>
            </a>

            <a href="https://www.ansible.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🤖</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Ansible</div>
                <div style={styles.linkDesc}>Configuration management automation</div>
              </div>
            </a>

            <a href="https://www.jenkins.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔄</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Jenkins</div>
                <div style={styles.linkDesc}>CI/CD automation server</div>
              </div>
            </a>

            <a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📊</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Prometheus</div>
                <div style={styles.linkDesc}>Monitoring and alerting system</div>
              </div>
            </a>

            <a href="https://grafana.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📈</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Grafana</div>
                <div style={styles.linkDesc}>Visualization and analytics platform</div>
              </div>
            </a>

            <a href="https://www.elastic.co/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔍</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Elastic Stack</div>
                <div style={styles.linkDesc}>Search and analytics engine</div>
              </div>
            </a>

            <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🗄️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>PostgreSQL</div>
                <div style={styles.linkDesc}>Advanced open source database</div>
              </div>
            </a>

            <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🍃</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>MongoDB</div>
                <div style={styles.linkDesc}>NoSQL document database</div>
              </div>
            </a>

            <a href="https://www.nginx.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⚡</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>NGINX</div>
                <div style={styles.linkDesc}>Web server and reverse proxy</div>
              </div>
            </a>

            <a href="https://www.linux.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐧</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Linux</div>
                <div style={styles.linkDesc}>Open source operating system</div>
              </div>
            </a>

            <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📝</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Git</div>
                <div style={styles.linkDesc}>Distributed version control system</div>
              </div>
            </a>

            <a href="https://www.gitlab.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🦊</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>GitLab</div>
                <div style={styles.linkDesc}>DevOps platform with CI/CD</div>
              </div>
            </a>

            <a href="https://www.atlassian.com/software/jira" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🎯</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Jira</div>
                <div style={styles.linkDesc}>Issue tracking and project management</div>
              </div>
            </a>

            <a href="https://www.atlassian.com/software/bitbucket" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🪣</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Bitbucket</div>
                <div style={styles.linkDesc}>Git repository management</div>
              </div>
            </a>

            <a href="https://www.hashicorp.com/products/consul" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🗺️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Consul</div>
                <div style={styles.linkDesc}>Service mesh and service discovery</div>
              </div>
            </a>

            <a href="https://www.hashicorp.com/products/vault" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔒</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Vault</div>
                <div style={styles.linkDesc}>Secrets management and encryption</div>
              </div>
            </a>

            <a href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔎</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Splunk</div>
                <div style={styles.linkDesc}>Log analysis and monitoring</div>
              </div>
            </a>

            <a href="https://www.datadoghq.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐕</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Datadog</div>
                <div style={styles.linkDesc}>Cloud monitoring and analytics</div>
              </div>
            </a>

            <a href="https://www.newrelic.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🆕</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>New Relic</div>
                <div style={styles.linkDesc}>Application performance monitoring</div>
              </div>
            </a>

            <a href="https://www.chef.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>👨‍🍳</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Chef</div>
                <div style={styles.linkDesc}>Infrastructure automation platform</div>
              </div>
            </a>

            <a href="https://www.puppet.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🎭</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Puppet</div>
                <div style={styles.linkDesc}>Infrastructure as Code automation</div>
              </div>
            </a>

            <a href="https://www.vagrantup.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🏕️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Vagrant</div>
                <div style={styles.linkDesc}>Development environment automation</div>
              </div>
            </a>

            <a href="https://www.packer.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📦</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Packer</div>
                <div style={styles.linkDesc}>Machine image builder</div>
              </div>
            </a>

            <a href="https://www.openstack.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔥</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>OpenStack</div>
                <div style={styles.linkDesc}>Open source cloud computing</div>
              </div>
            </a>

            <a href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>💻</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>VMware</div>
                <div style={styles.linkDesc}>Virtualization and cloud platform</div>
              </div>
            </a>

            <a href="https://www.redhat.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🎩</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Red Hat</div>
                <div style={styles.linkDesc}>Enterprise Linux and solutions</div>
              </div>
            </a>

            <a href="https://www.ubuntu.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🧡</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Ubuntu</div>
                <div style={styles.linkDesc}>Debian-based Linux distribution</div>
              </div>
            </a>

            <a href="https://www.centos.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⚙️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>CentOS</div>
                <div style={styles.linkDesc}>Community-driven Linux distribution</div>
              </div>
            </a>

            <a href="https://www.apache.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🪶</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Apache</div>
                <div style={styles.linkDesc}>Web server and software foundation</div>
              </div>
            </a>

            <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐬</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>MySQL</div>
                <div style={styles.linkDesc}>Relational database management</div>
              </div>
            </a>

            <a href="https://redis.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔴</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Redis</div>
                <div style={styles.linkDesc}>In-memory data structure store</div>
              </div>
            </a>

            <a href="https://www.rabbitmq.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐰</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>RabbitMQ</div>
                <div style={styles.linkDesc}>Message broker and queue system</div>
              </div>
            </a>

            <a href="https://kafka.apache.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🎵</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Apache Kafka</div>
                <div style={styles.linkDesc}>Distributed event streaming platform</div>
              </div>
            </a>

            <a href="https://www.nginx.com/products/nginx/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⚡</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>NGINX Plus</div>
                <div style={styles.linkDesc}>Advanced load balancing and proxy</div>
              </div>
            </a>

            <a href="https://www.haproxy.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔀</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>HAProxy</div>
                <div style={styles.linkDesc}>Load balancer and proxy server</div>
              </div>
            </a>

            <a href="https://www.docker.com/products/docker-hub" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐳</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Docker Hub</div>
                <div style={styles.linkDesc}>Container image registry</div>
              </div>
            </a>

            <a href="https://helm.sh/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⛵</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Helm</div>
                <div style={styles.linkDesc}>Kubernetes package manager</div>
              </div>
            </a>

            <a href="https://www.argocd.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🏹</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>ArgoCD</div>
                <div style={styles.linkDesc}>GitOps continuous deployment</div>
              </div>
            </a>

            <a href="https://www.fluxcd.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⚡</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Flux</div>
                <div style={styles.linkDesc}>GitOps toolkit for Kubernetes</div>
              </div>
            </a>

            <a href="https://www.istio.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🕸️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Istio</div>
                <div style={styles.linkDesc}>Service mesh for Kubernetes</div>
              </div>
            </a>

            <a href="https://linkerd.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔗</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Linkerd</div>
                <div style={styles.linkDesc}>Lightweight service mesh</div>
              </div>
            </a>

            <a href="https://www.envoyproxy.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📮</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Envoy</div>
                <div style={styles.linkDesc}>Edge and service proxy</div>
              </div>
            </a>

            <a href="https://www.terraform.io/cloud" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>☁️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Terraform Cloud</div>
                <div style={styles.linkDesc}>Managed Terraform service</div>
              </div>
            </a>

            <a href="https://www.pulumi.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>💜</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Pulumi</div>
                <div style={styles.linkDesc}>Infrastructure as Code SDK</div>
              </div>
            </a>

            <a href="https://www.cloudformation.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🏗️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>CloudFormation</div>
                <div style={styles.linkDesc}>AWS infrastructure templates</div>
              </div>
            </a>

            <a href="https://www.sonarqube.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔬</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>SonarQube</div>
                <div style={styles.linkDesc}>Code quality and security analysis</div>
              </div>
            </a>

            <a href="https://www.snyk.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🛡️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Snyk</div>
                <div style={styles.linkDesc}>Developer security platform</div>
              </div>
            </a>

            <a href="https://www.hashicorp.com/products/nomad" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🚀</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Nomad</div>
                <div style={styles.linkDesc}>Workload orchestration platform</div>
              </div>
            </a>

            <a href="https://www.docker.com/products/docker-swarm" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐝</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Docker Swarm</div>
                <div style={styles.linkDesc}>Native Docker orchestration</div>
              </div>
            </a>

            <a href="https://cilium.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐝</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Cilium (eBPF)</div>
                <div style={styles.linkDesc}>eBPF-based Networking & Security</div>
              </div>
            </a>

            <a href="https://wasmedge.org/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🕸️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>WasmEdge</div>
                <div style={styles.linkDesc}>Lightweight WebAssembly runtime</div>
              </div>
            </a>

            <a href="https://backstage.io/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🎭</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Backstage</div>
                <div style={styles.linkDesc}>Open platform for building developer portals</div>
              </div>
            </a>

            <a href="https://python.langchain.com/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🦜</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>LangChain</div>
                <div style={styles.linkDesc}>Building applications with LLMs</div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>CLI Installation Curls</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, cliCurls: !prev.cliCurls }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.cliCurls ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.cliCurls && (
          <div style={styles.linksGrid}>
            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🤖</div>
                <div style={styles.cliName}>OpenAI CLI</div>
              </div>
              <code style={styles.curlCode}>curl https://openai.com/install | bash</code>
              <button onClick={() => navigator.clipboard.writeText('curl https://openai.com/install | bash')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🦙</div>
                <div style={styles.cliName}>Ollama</div>
              </div>
              <code style={styles.curlCode}>curl -fsSL https://ollama.ai/install.sh | sh</code>
              <button onClick={() => navigator.clipboard.writeText('curl -fsSL https://ollama.ai/install.sh | sh')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>⚡</div>
                <div style={styles.cliName}>Vercel CLI</div>
              </div>
              <code style={styles.curlCode}>npm i -g vercel</code>
              <button onClick={() => navigator.clipboard.writeText('npm i -g vercel')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🚀</div>
                <div style={styles.cliName}>Netlify CLI</div>
              </div>
              <code style={styles.curlCode}>npm install -g netlify-cli</code>
              <button onClick={() => navigator.clipboard.writeText('npm install -g netlify-cli')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🐳</div>
                <div style={styles.cliName}>Docker</div>
              </div>
              <code style={styles.curlCode}>curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh</code>
              <button onClick={() => navigator.clipboard.writeText('curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>☸️</div>
                <div style={styles.cliName}>kubectl</div>
              </div>
              <code style={styles.curlCode}>curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"</code>
              <button onClick={() => navigator.clipboard.writeText('curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🏗️</div>
                <div style={styles.cliName}>Terraform</div>
              </div>
              <code style={styles.curlCode}>curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add - && sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"</code>
              <button onClick={() => navigator.clipboard.writeText('curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add - && sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🤖</div>
                <div style={styles.cliName}>AWS CLI</div>
              </div>
              <code style={styles.curlCode}>curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"</code>
              <button onClick={() => navigator.clipboard.writeText('curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🔵</div>
                <div style={styles.cliName}>Google Cloud CLI</div>
              </div>
              <code style={styles.curlCode}>curl https://sdk.cloud.google.com | bash</code>
              <button onClick={() => navigator.clipboard.writeText('curl https://sdk.cloud.google.com | bash')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🔷</div>
                <div style={styles.cliName}>Azure CLI</div>
              </div>
              <code style={styles.curlCode}>curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash</code>
              <button onClick={() => navigator.clipboard.writeText('curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🦀</div>
                <div style={styles.cliName}>Rust</div>
              </div>
              <code style={styles.curlCode}>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh</code>
              <button onClick={() => navigator.clipboard.writeText('curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🐍</div>
                <div style={styles.cliName}>Python (pyenv)</div>
              </div>
              <code style={styles.curlCode}>curl https://pyenv.run | bash</code>
              <button onClick={() => navigator.clipboard.writeText('curl https://pyenv.run | bash')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>📦</div>
                <div style={styles.cliName}>Node.js (nvm)</div>
              </div>
              <code style={styles.curlCode}>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash</code>
              <button onClick={() => navigator.clipboard.writeText('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🎯</div>
                <div style={styles.cliName}>GitHub CLI</div>
              </div>
              <code style={styles.curlCode}>curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg</code>
              <button onClick={() => navigator.clipboard.writeText('curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🔄</div>
                <div style={styles.cliName}>Ansible</div>
              </div>
              <code style={styles.curlCode}>curl https://bootstrap.pypa.io/get-pip.py | python3 && pip install ansible</code>
              <button onClick={() => navigator.clipboard.writeText('curl https://bootstrap.pypa.io/get-pip.py | python3 && pip install ansible')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>⛵</div>
                <div style={styles.cliName}>Helm</div>
              </div>
              <code style={styles.curlCode}>curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash</code>
              <button onClick={() => navigator.clipboard.writeText('curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🦊</div>
                <div style={styles.cliName}>GitLab CLI</div>
              </div>
              <code style={styles.curlCode}>curl -L https://gitlab.com/gitlab-org/cli/-/releases/latest/downloads/glab_linux_amd64.tar.gz | tar xz</code>
              <button onClick={() => navigator.clipboard.writeText('curl -L https://gitlab.com/gitlab-org/cli/-/releases/latest/downloads/glab_linux_amd64.tar.gz | tar xz')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🛡️</div>
                <div style={styles.cliName}>Snyk CLI</div>
              </div>
              <code style={styles.curlCode}>npm install -g snyk</code>
              <button onClick={() => navigator.clipboard.writeText('npm install -g snyk')} style={styles.copyBtn}>Copy</button>
            </div>

            <div style={styles.cliCard}>
              <div style={styles.cliHeader}>
                <div style={styles.cliIcon}>🔍</div>
                <div style={styles.cliName}>jq (JSON)</div>
              </div>
              <code style={styles.curlCode}>curl -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -o jq && chmod +x jq</code>
              <button onClick={() => navigator.clipboard.writeText('curl -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -o jq && chmod +x jq')} style={styles.copyBtn}>Copy</button>
            </div>
          </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Cloud Consoles</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, consoles: !prev.consoles }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.consoles ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.consoles && (
          <div style={styles.linksGrid}>
            <a href="https://console.aws.amazon.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🟠</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>AWS Console</div>
                <div style={styles.linkDesc}>EC2, S3, Lambda, RDS</div>
              </div>
            </a>

            <a href="https://console.aws.amazon.com/iam" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔐</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>AWS IAM</div>
                <div style={styles.linkDesc}>Identity & Access Management</div>
              </div>
            </a>

            <a href="https://console.aws.amazon.com/cloudwatch" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>👁️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>AWS CloudWatch</div>
                <div style={styles.linkDesc}>Monitoring & Logs</div>
              </div>
            </a>

            <a href="https://console.aws.amazon.com/codesuite/codepipeline" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔄</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>AWS CodePipeline</div>
                <div style={styles.linkDesc}>CI/CD Pipeline</div>
              </div>
            </a>

            <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔵</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>GCP Console</div>
                <div style={styles.linkDesc}>Compute, Storage, BigQuery</div>
              </div>
            </a>

            <a href="https://console.cloud.google.com/run" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🏃</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>GCP Cloud Run</div>
                <div style={styles.linkDesc}>Serverless containers</div>
              </div>
            </a>

            <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔷</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Azure Portal</div>
                <div style={styles.linkDesc}>VMs, App Service, SQL</div>
              </div>
            </a>

            <a href="https://dev.azure.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🎯</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Azure DevOps</div>
                <div style={styles.linkDesc}>Pipelines & Repos</div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Azure Products</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, azure: !prev.azure }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.azure ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.azure && (
          <div style={styles.linksGrid}>
          <a href="https://intune.microsoft.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📱</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Microsoft Intune</div>
              <div style={styles.linkDesc}>Device and app management</div>
            </div>
          </a>
          
          <a href="https://entra.microsoft.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Microsoft Entra</div>
              <div style={styles.linkDesc}>Identity and access management</div>
            </div>
          </a>
          
          <a href="https://admin.microsoft.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚙️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Microsoft 365 Admin</div>
              <div style={styles.linkDesc}>Organization administration</div>
            </div>
          </a>

          <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>☁️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Azure Portal</div>
              <div style={styles.linkDesc}>Cloud infrastructure and services</div>
            </div>
          </a>

          <a href="https://learn.microsoft.com/en-us/azure/" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📚</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Azure Documentation</div>
              <div style={styles.linkDesc}>Learning resources and guides</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResourceGroups" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📦</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Resource Groups</div>
              <div style={styles.linkDesc}>Manage resource collections</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Compute%2FvirtualMachines" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🖥️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Virtual Machines</div>
              <div style={styles.linkDesc}>Compute resources</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FstorageAccounts" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>💾</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Storage Accounts</div>
              <div style={styles.linkDesc}>Blob, file, and queue storage</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.DBforPostgreSQL%2Fservers" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🗄️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Azure Database</div>
              <div style={styles.linkDesc}>Managed database services</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🌐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>App Service</div>
              <div style={styles.linkDesc}>Web and mobile apps</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.ContainerRegistry%2Fregistries" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🐳</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Container Registry</div>
              <div style={styles.linkDesc}>Docker image registry</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.ContainerService%2FmanagedClusters" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>☸️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>AKS Kubernetes</div>
              <div style={styles.linkDesc}>Managed Kubernetes service</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.KeyVault%2Fvaults" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔑</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Key Vault</div>
              <div style={styles.linkDesc}>Secrets and encryption keys</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Insights%2Fcomponents" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📊</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Application Insights</div>
              <div style={styles.linkDesc}>Application monitoring</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Network%2FvirtualNetworks" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🌐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Virtual Networks</div>
              <div style={styles.linkDesc}>Network infrastructure</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Network%2FloadBalancers" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚖️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Load Balancers</div>
              <div style={styles.linkDesc}>Distribute traffic</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Network%2FapplicationGateways" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🚪</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Application Gateway</div>
              <div style={styles.linkDesc}>Web traffic management</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Cdn%2Fprofiles" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>CDN Profiles</div>
              <div style={styles.linkDesc}>Content delivery network</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.ServiceBus%2Fnamespaces" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📨</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Service Bus</div>
              <div style={styles.linkDesc}>Messaging service</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Event Hubs</div>
              <div style={styles.linkDesc}>Event streaming platform</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Compute%2FcontainerGroups" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🐳</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Container Instances</div>
              <div style={styles.linkDesc}>Serverless containers</div>
            </div>
          </a>

          <a href="https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Batch%2FbatchAccounts" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚙️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Batch Service</div>
              <div style={styles.linkDesc}>Parallel job processing</div>
            </div>
          </a>
        </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>AWS Products</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, aws: !prev.aws }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.aws ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.aws && (
          <div style={styles.linksGrid}>
          <a href="https://console.aws.amazon.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>☁️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>AWS Management Console</div>
              <div style={styles.linkDesc}>Cloud infrastructure and services</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/ec2" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🖥️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>EC2 Instances</div>
              <div style={styles.linkDesc}>Virtual compute resources</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/s3" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📦</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>S3 Storage</div>
              <div style={styles.linkDesc}>Object storage service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/rds" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🗄️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>RDS Databases</div>
              <div style={styles.linkDesc}>Managed database service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/lambda" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Lambda Functions</div>
              <div style={styles.linkDesc}>Serverless compute</div>
            </div>
          </a>

          <a href="https://docs.aws.amazon.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📚</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>AWS Documentation</div>
              <div style={styles.linkDesc}>Learning resources and guides</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/iam" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>IAM Management</div>
              <div style={styles.linkDesc}>Identity and access control</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/cloudwatch" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📊</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>CloudWatch Monitoring</div>
              <div style={styles.linkDesc}>Monitoring and logging</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/codesuite/codepipeline" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔄</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>CodePipeline CI/CD</div>
              <div style={styles.linkDesc}>Continuous integration and deployment</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/elasticbeanstalk" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🌱</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Elastic Beanstalk</div>
              <div style={styles.linkDesc}>Application deployment service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/vpc" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🌐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>VPC Networking</div>
              <div style={styles.linkDesc}>Virtual private cloud</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/dynamodb" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚙️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>DynamoDB NoSQL</div>
              <div style={styles.linkDesc}>Managed NoSQL database</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/elasticache" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>💾</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>ElastiCache</div>
              <div style={styles.linkDesc}>In-memory caching service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/sqs" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📨</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>SQS Message Queue</div>
              <div style={styles.linkDesc}>Message queuing service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/sns" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📢</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>SNS Notifications</div>
              <div style={styles.linkDesc}>Pub/sub messaging service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/route53" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🌐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Route 53 DNS</div>
              <div style={styles.linkDesc}>Domain name system service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/cloudfront" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>CloudFront CDN</div>
              <div style={styles.linkDesc}>Content delivery network</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/elasticloadbalancing" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚖️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Load Balancing</div>
              <div style={styles.linkDesc}>Distribute traffic across instances</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/ecr" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🐳</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>ECR Container Registry</div>
              <div style={styles.linkDesc}>Docker image registry</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/ecs" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>☸️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>ECS Container Service</div>
              <div style={styles.linkDesc}>Container orchestration</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/secretsmanager" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔑</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Secrets Manager</div>
              <div style={styles.linkDesc}>Manage secrets and credentials</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/kms" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>KMS Encryption</div>
              <div style={styles.linkDesc}>Key management service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/apigateway" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🚪</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>API Gateway</div>
              <div style={styles.linkDesc}>Create and manage APIs</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/states" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔄</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Step Functions</div>
              <div style={styles.linkDesc}>Workflow orchestration</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/batch" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚙️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Batch Service</div>
              <div style={styles.linkDesc}>Batch job processing</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/elasticmapreduce" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📊</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>EMR Big Data</div>
              <div style={styles.linkDesc}>Hadoop and Spark clusters</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/kinesis" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Kinesis Streaming</div>
              <div style={styles.linkDesc}>Real-time data streaming</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/athena" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔍</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Athena Analytics</div>
              <div style={styles.linkDesc}>Query S3 data with SQL</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/redshift" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📈</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Redshift Data Warehouse</div>
              <div style={styles.linkDesc}>Data warehouse service</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/sagemaker" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🤖</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>SageMaker ML</div>
              <div style={styles.linkDesc}>Machine learning platform</div>
            </div>
          </a>

          <a href="https://console.aws.amazon.com/waf" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🛡️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>WAF Security</div>
              <div style={styles.linkDesc}>Web application firewall</div>
            </div>
          </a>
        </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Documentation & Learning</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, docs: !prev.docs }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.docs ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.docs && (
          <div style={styles.linksGrid}>
            <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📚</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>MDN Web Docs</div>
                <div style={styles.linkDesc}>Web technology reference and guides</div>
              </div>
            </a>

            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⚛️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>React Documentation</div>
                <div style={styles.linkDesc}>Official React library docs</div>
              </div>
            </a>

            <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⚡</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Vite Documentation</div>
                <div style={styles.linkDesc}>Next generation build tool</div>
              </div>
            </a>

            <a href="https://graphql.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📊</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>GraphQL Official</div>
                <div style={styles.linkDesc}>Query language for APIs</div>
              </div>
            </a>

            <a href="https://nodejs.org/docs" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🟢</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Node.js Documentation</div>
                <div style={styles.linkDesc}>JavaScript runtime docs</div>
              </div>
            </a>

            <a href="https://typescriptlang.org/docs" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📘</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>TypeScript Documentation</div>
                <div style={styles.linkDesc}>Typed JavaScript language</div>
              </div>
            </a>

            <a href="https://owasp.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🛡️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>OWASP Security</div>
                <div style={styles.linkDesc}>Web application security</div>
              </div>
            </a>

            <a href="https://nist.gov/cybersecurity" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔐</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>NIST Cybersecurity</div>
                <div style={styles.linkDesc}>National cybersecurity standards</div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Testing & Quality Tools</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, testing: !prev.testing }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.testing ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.testing && (
          <div style={styles.linksGrid}>
            <a href="https://postman.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📮</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Postman</div>
                <div style={styles.linkDesc}>API testing and development</div>
              </div>
            </a>

            <a href="https://insomnia.rest" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>😴</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Insomnia</div>
                <div style={styles.linkDesc}>REST client and API testing</div>
              </div>
            </a>

            <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔦</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Lighthouse</div>
                <div style={styles.linkDesc}>Web performance auditing</div>
              </div>
            </a>

            <a href="https://webpagetest.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>⏱️</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>WebPageTest</div>
                <div style={styles.linkDesc}>Website performance testing</div>
              </div>
            </a>

            <a href="https://jestjs.io" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🃏</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Jest Testing</div>
                <div style={styles.linkDesc}>JavaScript testing framework</div>
              </div>
            </a>

            <a href="https://cypress.io" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🌳</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Cypress E2E</div>
                <div style={styles.linkDesc}>End-to-end testing framework</div>
              </div>
            </a>

            <a href="https://snyk.io" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐍</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Snyk Security</div>
                <div style={styles.linkDesc}>Vulnerability scanning</div>
              </div>
            </a>

            <a href="https://sonarqube.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🔍</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>SonarQube</div>
                <div style={styles.linkDesc}>Code quality analysis</div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Package Registries</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, registries: !prev.registries }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.registries ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.registries && (
          <div style={styles.linksGrid}>
            <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📦</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>npm Registry</div>
                <div style={styles.linkDesc}>JavaScript package registry</div>
              </div>
            </a>

            <a href="https://pypi.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐍</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>PyPI</div>
                <div style={styles.linkDesc}>Python package index</div>
              </div>
            </a>

            <a href="https://mvnrepository.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>☕</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Maven Repository</div>
                <div style={styles.linkDesc}>Java package repository</div>
              </div>
            </a>

            <a href="https://rubygems.org" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>💎</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>RubyGems</div>
                <div style={styles.linkDesc}>Ruby package registry</div>
              </div>
            </a>

            <a href="https://crates.io" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🦀</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Cargo Crates</div>
                <div style={styles.linkDesc}>Rust package registry</div>
              </div>
            </a>

            <a href="https://hub.docker.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🐳</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Docker Hub</div>
                <div style={styles.linkDesc}>Container image registry</div>
              </div>
            </a>
          </div>
        )}
      </div>

      <div style={styles.cloudLinksSection}>
        <div style={styles.linksSectionHeader}>
          <h3 style={styles.linksTitle}>Google Cloud Products</h3>
          <button
            onClick={() => setCollapsedLinks(prev => ({ ...prev, gcp: !prev.gcp }))}
            style={styles.collapseButton}
          >
            {collapsedLinks.gcp ? '▼ Expand' : '▲ Collapse'}
          </button>
        </div>
        {!collapsedLinks.gcp && (
          <div style={styles.linksGrid}>
          <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>☁️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>GCP Console</div>
              <div style={styles.linkDesc}>Cloud infrastructure and services</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/compute" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🖥️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Compute Engine</div>
              <div style={styles.linkDesc}>Virtual machine instances</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/storage" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📦</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Storage</div>
              <div style={styles.linkDesc}>Object storage service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/sql" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🗄️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud SQL</div>
              <div style={styles.linkDesc}>Managed database service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/functions" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Functions</div>
              <div style={styles.linkDesc}>Serverless compute</div>
            </div>
          </a>

          <a href="https://cloud.google.com/docs" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📚</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>GCP Documentation</div>
              <div style={styles.linkDesc}>Learning resources and guides</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/iam" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>IAM & Admin</div>
              <div style={styles.linkDesc}>Identity and access management</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/monitoring" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📊</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Monitoring</div>
              <div style={styles.linkDesc}>Monitoring and observability</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/cloud-build" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔨</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Build CI/CD</div>
              <div style={styles.linkDesc}>Continuous integration and deployment</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/run" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🏃</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Run Serverless</div>
              <div style={styles.linkDesc}>Serverless container platform</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/kubernetes" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>☸️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>GKE Kubernetes</div>
              <div style={styles.linkDesc}>Managed Kubernetes service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/firestore" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔥</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Firestore Database</div>
              <div style={styles.linkDesc}>NoSQL document database</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/memorystore" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>💾</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Memorystore Cache</div>
              <div style={styles.linkDesc}>Managed Redis and Memcached</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/pubsub" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📨</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Pub/Sub Messaging</div>
              <div style={styles.linkDesc}>Message queuing service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/dns" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🌐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud DNS</div>
              <div style={styles.linkDesc}>Domain name system service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/net-services/cdn" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud CDN</div>
              <div style={styles.linkDesc}>Content delivery network</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/net-services/loadbalancing" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⚖️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Load Balancing</div>
              <div style={styles.linkDesc}>Distribute traffic across instances</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/artifacts" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🐳</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Artifact Registry</div>
              <div style={styles.linkDesc}>Container and package registry</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/security/secret-manager" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔑</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Secret Manager</div>
              <div style={styles.linkDesc}>Manage secrets and credentials</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/security/kms" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔐</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud KMS</div>
              <div style={styles.linkDesc}>Key management service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/bigquery" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📊</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>BigQuery Analytics</div>
              <div style={styles.linkDesc}>Data warehouse and analytics</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/dataflow" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔄</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Dataflow Processing</div>
              <div style={styles.linkDesc}>Stream and batch processing</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/vertex-ai" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🤖</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Vertex AI ML</div>
              <div style={styles.linkDesc}>Machine learning platform</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/appengine" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🚀</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>App Engine</div>
              <div style={styles.linkDesc}>Managed application platform</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/cloudtasks" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>✅</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Tasks</div>
              <div style={styles.linkDesc}>Task queue service</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/scheduler" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>⏰</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Scheduler</div>
              <div style={styles.linkDesc}>Cron job scheduling</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/security/command-center" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🛡️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Security Command Center</div>
              <div style={styles.linkDesc}>Security and compliance</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/security/dlp" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🔒</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Data Loss Prevention</div>
              <div style={styles.linkDesc}>Protect sensitive data</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/security/cloud-armor" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🛡️</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Armor</div>
              <div style={styles.linkDesc}>DDoS and WAF protection</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/apigee" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>🚪</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Apigee API Management</div>
              <div style={styles.linkDesc}>API platform and gateway</div>
            </div>
          </a>

          <a href="https://console.cloud.google.com/endpoints" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
            <div style={styles.linkIcon}>📡</div>
            <div style={styles.linkContent}>
              <div style={styles.linkName}>Cloud Endpoints</div>
              <div style={styles.linkDesc}>API management service</div>
            </div>
          </a>
        </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(16,185,129,0.03) 100%)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '12px',
    backdropFilter: 'blur(10px)'
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    color: '#38bdf8',
    fontSize: '28px',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56,189,248,0.2)',
    paddingBottom: '8px'
  },
  tabs: {
    display: 'flex',
    gap: '6px',
    marginBottom: '12px',
    flexWrap: 'wrap',
    borderBottom: '2px solid rgba(56,189,248,0.15)',
    paddingBottom: '8px'
  },
  tab: {
    padding: '6px 12px',
    background: 'rgba(56,189,248,0.05)',
    border: '1px solid rgba(56,189,248,0.2)',
    borderRadius: '6px',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease'
  },
  activeTab: {
    background: 'linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(16,185,129,0.1) 100%)',
    borderColor: '#38bdf8',
    color: '#38bdf8',
    boxShadow: '0 0 15px rgba(56,189,248,0.2)'
  },
  toolBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  collapseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    paddingBottom: '6px',
    borderBottom: '1px solid rgba(56,189,248,0.1)'
  },
  toolTitle: {
    margin: 0,
    color: '#38bdf8',
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '-0.01em'
  },
  collapseButton: {
    padding: '6px 10px',
    background: 'rgba(56,189,248,0.1)',
    border: '1px solid rgba(56,189,248,0.3)',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease'
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '10px 12px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.03) 0%, rgba(16,185,129,0.02) 100%)',
    border: '1px solid rgba(56,189,248,0.2)',
    borderRadius: '8px',
    color: '#cbd5e1',
    fontFamily: 'monospace',
    fontSize: '13px',
    resize: 'vertical',
    fontWeight: 400,
    transition: 'all 0.3s ease'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  actionButton: {
    padding: '8px 14px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(16,185,129,0.05) 100%)',
    border: '1px solid rgba(56,189,248,0.3)',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    transition: 'all 0.3s ease'
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  contactCard: {
    background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(16,185,129,0.02) 100%)',
    border: '1px solid rgba(56,189,248,0.2)',
    borderRadius: '8px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  contactTitle: {
    margin: 0,
    color: '#38bdf8',
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '-0.01em'
  },
  contactValue: {
    color: '#cbd5e1',
    fontSize: '14px',
    fontFamily: 'monospace',
    padding: '8px 10px',
    background: 'rgba(56,189,248,0.05)',
    borderRadius: '6px',
    border: '1px solid rgba(56,189,248,0.15)',
    fontWeight: 500
  },
  copyButton: {
    padding: '8px 14px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(16,185,129,0.05) 100%)',
    border: '1px solid rgba(56,189,248,0.3)',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    alignSelf: 'flex-start',
    transition: 'all 0.3s ease'
  },
  contactNote: {
    color: '#94a3b8',
    fontSize: '13px',
    fontStyle: 'italic',
    padding: '10px 12px',
    background: 'rgba(56,189,248,0.05)',
    borderRadius: '6px',
    border: '1px solid rgba(56,189,248,0.15)',
    lineHeight: 1.4
  },
  linksSection: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '2px solid rgba(56,189,248,0.15)'
  },
  linksSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  cloudLinksSection: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '2px solid rgba(56,189,248,0.15)'
  },
  linksTitle: {
    margin: '0',
    color: '#38bdf8',
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '-0.01em'
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '10px'
  },
  linkCard: {
    display: 'flex',
    gap: '10px',
    padding: '12px 14px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(16,185,129,0.02) 100%)',
    border: '1px solid rgba(56,189,248,0.2)',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  linkIcon: {
    fontSize: '18px',
    minWidth: '24px',
    textAlign: 'center'
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  linkName: {
    color: '#38bdf8',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '-0.01em'
  },
  linkDesc: {
    color: '#94a3b8',
    fontSize: '12px',
    lineHeight: 1.3,
    fontWeight: 400
  },
  cliCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px 14px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(16,185,129,0.02) 100%)',
    border: '1px solid rgba(56,189,248,0.2)',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  cliHeader: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '4px'
  },
  cliIcon: {
    fontSize: '18px',
    minWidth: '24px'
  },
  cliName: {
    color: '#38bdf8',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '-0.01em'
  },
  curlCode: {
    background: 'rgba(56,189,248,0.05)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '6px',
    padding: '8px 10px',
    color: '#cbd5e1',
    fontSize: '11px',
    fontFamily: 'monospace',
    overflow: 'auto',
    wordBreak: 'break-all',
    fontWeight: 500,
    lineHeight: 1.4
  },
  copyBtn: {
    padding: '6px 12px',
    background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(16,185,129,0.05) 100%)',
    border: '1px solid rgba(56,189,248,0.3)',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    alignSelf: 'flex-start',
    transition: 'all 0.3s ease'
  }
};