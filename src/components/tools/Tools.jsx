import React, { useState } from 'react';
import { resumeData } from '../../resumeData';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [collapsedTools, setCollapsedTools] = useState({});
  const [collapsedLinks, setCollapsedLinks] = useState({
    quickLinks: true,
    azure: true,
    aws: true,
    gcp: true
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
          const [pattern, flags] = input.split('\n');
          const regex = new RegExp(pattern, flags || '');
          setOutput(regex.test(input) ? 'Match found' : 'No match');
        } catch { setOutput('Invalid regex') }
      },
      match: () => {
        try {
          const [pattern, flags] = input.split('\n');
          const regex = new RegExp(pattern, flags || 'g');
          const matches = input.match(regex);
          setOutput(matches ? matches.join('\n') : 'No matches');
        } catch { setOutput('Invalid regex') }
      }
    },
    jwt: {
      name: 'JWT Decoder',
      decode: () => {
        try {
          const parts = input.split('.');
          if (parts.length !== 3) throw new Error('Invalid JWT');
          const payload = JSON.parse(atob(parts[1]));
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
    const needsInput = !noInputTools.includes(activeTab);
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
            <a href="https://parkingpet.github.io" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🌐</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>View Live Site</div>
                <div style={styles.linkDesc}>Interactive DevOps resume with built-in tools</div>
              </div>
            </a>
            
            <a href="https://github.com/Parkingpet/parkingpet.github.io" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>📦</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>GitHub Repository</div>
                <div style={styles.linkDesc}>Source code and documentation</div>
              </div>
            </a>
            
            <a href="https://github.com/Parkingpet/parkingpet.github.io/fork" target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
              <div style={styles.linkIcon}>🍴</div>
              <div style={styles.linkContent}>
                <div style={styles.linkName}>Fork This Project</div>
                <div style={styles.linkDesc}>Create your own version - Fork at your own risk</div>
              </div>
            </a>

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
          </div>
        )}
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
  sectionTitle: {
    margin: '0 0 24px 0',
    color: '#38bdf8',
    fontSize: '32px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '12px'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    borderBottom: '2px solid rgba(56, 189, 248, 0.2)',
    paddingBottom: '12px'
  },
  tab: {
    padding: '10px 16px',
    background: 'rgba(17, 28, 51, 0.6)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.2s ease'
  },
  activeTab: {
    background: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38bdf8',
    color: '#38bdf8',
    boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)'
  },
  toolBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  collapseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #23314d'
  },
  toolTitle: {
    margin: 0,
    color: '#38bdf8',
    fontSize: '22px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  collapseButton: {
    padding: '8px 12px',
    background: 'rgba(56, 189, 248, 0.1)',
    border: '1px solid #38bdf8',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
    transition: 'all 0.2s ease'
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
    fontSize: '16px',
    resize: 'vertical',
    fontWeight: 400
  },
  actions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  actionButton: {
    padding: '10px 16px',
    background: 'rgba(56, 189, 248, 0.2)',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.2s ease'
  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  contactCard: {
    background: 'rgba(11, 18, 32, 0.8)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  contactTitle: {
    margin: 0,
    color: '#38bdf8',
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  contactValue: {
    color: '#e2e8f0',
    fontSize: '16px',
    fontFamily: 'monospace',
    padding: '10px',
    background: 'rgba(17, 28, 51, 0.6)',
    borderRadius: '4px',
    border: '1px solid #23314d',
    fontWeight: 400
  },
  copyButton: {
    padding: '10px 16px',
    background: 'rgba(56, 189, 248, 0.2)',
    border: '1px solid #38bdf8',
    borderRadius: '6px',
    color: '#38bdf8',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    alignSelf: 'flex-start',
    transition: 'all 0.2s ease'
  },
  contactNote: {
    color: '#94a3b8',
    fontSize: '13px',
    fontStyle: 'italic',
    padding: '12px',
    background: 'rgba(17, 28, 51, 0.3)',
    borderRadius: '4px',
    border: '1px solid #23314d',
    lineHeight: 1.6
  },
  linksSection: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '2px solid rgba(56, 189, 248, 0.3)'
  },
  linksSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  cloudLinksSection: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '2px solid rgba(56, 189, 248, 0.3)'
  },
  linksTitle: {
    margin: '0 0 16px 0',
    color: '#38bdf8',
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px'
  },
  linkCard: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    background: 'rgba(11, 18, 32, 0.8)',
    border: '1px solid #23314d',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  linkIcon: {
    fontSize: '24px',
    minWidth: '32px',
    textAlign: 'center'
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  linkName: {
    color: '#38bdf8',
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  linkDesc: {
    color: '#94a3b8',
    fontSize: '15px',
    lineHeight: 1.4
  }
};