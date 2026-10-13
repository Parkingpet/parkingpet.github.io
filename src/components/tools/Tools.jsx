import React, { useMemo, useState } from 'react';

const toolGroups = {
  infrastructure: {
    title: 'Local + Cloud Systems',
    items: [
      {
        label: 'docker',
        output: 'docker ps\ndocker build -t image:tag .\ndocker run -d image:tag\ndocker compose up -d\ndocker system prune -a'
      },
      {
        label: 'docker-compose',
        output: 'docker compose up -d\ndocker compose logs -f\ndocker compose exec app sh\ndocker compose down --volumes'
      },
      {
        label: 'kubernetes',
        output: 'kubectl get pods -A\nkubectl get nodes\nkubectl logs deploy/my-app\nkubectl port-forward svc/my-service 8080:80\nhelm repo update && helm upgrade --install app ./chart'
      },
      {
        label: 'helm',
        output: 'helm repo add bitnami https://charts.bitnami.com/bitnami\nhelm install my-app bitnami/nginx\nhelm list\nhelm rollback my-app 1'
      },
      {
        label: 'terraform',
        output: 'terraform init\nterraform plan\nterraform apply\nterraform destroy'
      },
      {
        label: 'ansible',
        output: 'ansible -i inventory.ini all -m ping\nansible-playbook site.yml -i inventory.ini\nansible-vault encrypt secrets.yml'
      },
      {
        label: 'aws',
        output: 'aws sts get-caller-identity\naws s3 ls\naws ec2 describe-instances\naws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com'
      },
      {
        label: 'gcloud',
        output: 'gcloud auth list\ngcloud config set project my-project\ngcloud compute instances list\ngcloud container clusters get-credentials cluster-name --zone us-central1-a'
      },
      {
        label: 'azure',
        output: 'az login\naz account show\naz group list\naz aks get-credentials --resource-group rg --name cluster\naz storage account list'
      },
      {
        label: 'systemd',
        output: 'systemctl status nginx\nsystemctl restart nginx\njournalctl -u nginx -f\nsystemctl list-units --type=service --state=running'
      },
      {
        label: 'linux',
        output: 'uptime\nfree -h\ndf -h\nss -tulpn\nhtop\njournalctl -xe'
      }
    ]
  },
  networking: {
    title: 'Networking & Troubleshooting',
    items: [
      {
        label: 'ports',
        output: 'HTTP: 80\nHTTPS: 443\nSSH: 22\nPostgreSQL: 5432\nMongoDB: 27017\nRedis: 6379\nKubernetes API: 6443'
      },
      {
        label: 'cidr',
        output: '10.0.0.0/8 - Private\n172.16.0.0/12 - Private\n192.168.0.0/16 - Private\n10.10.0.0/16 - Internal lab\n172.31.0.0/16 - AWS default'
      },
      {
        label: 'dns',
        output: 'dig example.com\ndig +short example.com\nnslookup example.com\ntraceroute example.com'
      },
      {
        label: 'ssl',
        output: 'openssl s_client -connect example.com:443 -servername example.com\nopenssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365\nopenssl x509 -in cert.pem -text -noout'
      },
      {
        label: 'tcpdump',
        output: 'tcpdump -i any -n -c 50\ntcpdump -i eth0 port 443\ntcpdump -A -s 0 host example.com'
      },
      {
        label: 'curl',
        output: 'curl -I https://example.com\ncurl -v https://example.com\ncurl -fsS https://example.com | jq .'
      }
    ]
  },
  security: {
    title: 'Security & Hardening',
    items: [
      {
        label: 'trivy',
        output: 'trivy image ubuntu:latest\ntrivy fs .\ntrivy config .'
      },
      {
        label: 'nmap',
        output: 'nmap -sV -p- 10.0.0.10\nnmap -sS -sU 10.0.0.0/24\nnmap -A target.example.com'
      },
      {
        label: 'lynis',
        output: 'lynis audit system\nlynis show reports\nlynis --quick --tests-from-group malware,authentication'
      },
      {
        label: 'vault',
        output: 'vault login\nvault kv get secret/app\nvault kv put secret/app username=ops password=supersecret'
      },
      {
        label: 'ssh',
        output: 'ssh-copy-id user@host\nssh -i ~/.ssh/id_rsa user@host\nssh -A user@jumpbox'
      }
    ]
  },
  automation: {
    title: 'Automation & Data',
    items: [
      {
        label: 'git',
        output: 'git clone <repo>\ngit checkout -b feature\ngit status\ngit pull --rebase\ngit push origin feature'
      },
      {
        label: 'github-cli',
        output: 'gh auth login\ngh pr list\ngh workflow run deploy.yml\ngh release create v1.0.0 --generate-notes'
      },
      {
        label: 'restic',
        output: 'restic init\nrestic backup /etc\nrestic snapshots\nrestic restore latest --target /tmp/restore'
      },
      {
        label: 'rclone',
        output: 'rclone config\nrclone sync /local/path remote:bucket\nrclone ls remote:bucket'
      },
      {
        label: 'db',
        output: 'psql "postgresql://user:pass@host:5432/db"\nmysql -u root -p\nmongosh "mongodb://localhost:27017/admin"'
      }
    ]
  }
};

const quickLinks = [
  ['Kubernetes', 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/'],
  ['Helm', 'https://helm.sh/docs/helm/helm/'],
  ['Docker', 'https://docs.docker.com/reference/cli/'],
  ['Terraform', 'https://developer.hashicorp.com/terraform/cli'],
  ['AWS CLI', 'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html'],
  ['Google Cloud', 'https://cloud.google.com/sdk/docs'],
  ['Azure CLI', 'https://learn.microsoft.com/cli/azure/'],
  ['Ansible', 'https://docs.ansible.com/ansible/latest/cli/index.html'],
  ['Trivy', 'https://aquasecurity.github.io/trivy/'],
  ['Vault', 'https://developer.hashicorp.com/vault/docs'],
  ['Restic', 'https://restic.net/documentation/'],
  ['Rclone', 'https://rclone.org/docs/' ]
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState('docker');
  const [output, setOutput] = useState('docker ps\ndocker build -t image:tag .\ndocker run -d image:tag\ndocker compose up -d');

  const allTools = useMemo(
    () => Object.values(toolGroups).flatMap((group) => group.items),
    []
  );

  const handleSelect = (toolLabel) => {
    const tool = allTools.find((entry) => entry.label === toolLabel);
    if (tool) {
      setActiveTool(toolLabel);
      setOutput(tool.output);
    }
  };

  return (
    <div style={styles.container} id="tools">
      <h2 style={styles.title}>DevOps Tools & Quick Links</h2>

      <div style={styles.grid}>
        {Object.entries(toolGroups).map(([groupKey, group]) => (
          <div key={groupKey} style={styles.group}>
            <h3 style={styles.groupTitle}>{group.title}</h3>
            <div style={styles.groupList}>
              {group.items.map((tool) => (
                <button
                  key={tool.label}
                  type="button"
                  style={{
                    ...styles.toolButton,
                    ...(activeTool === tool.label ? styles.toolButtonActive : {})
                  }}
                  onClick={() => handleSelect(tool.label)}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.outputWrap}>
        <div style={styles.outputHeader}>Selected Command Set</div>
        <pre style={styles.output}>{output}</pre>
      </div>

      <div style={styles.linksWrap}>
        <h3 style={styles.groupTitle}>Quick Links</h3>
        <div style={styles.linkGrid}>
          {quickLinks.map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={styles.linkItem}>
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #23314d',
    borderRadius: '6px',
    padding: '12px',
    marginTop: '8px'
  },
  title: {
    color: '#38bdf8',
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
    paddingBottom: '6px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '10px',
    marginTop: '12px'
  },
  group: {
    background: 'rgba(11, 18, 32, 0.6)',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    borderRadius: '6px',
    padding: '10px'
  },
  groupTitle: {
    color: '#38bdf8',
    fontSize: '13px',
    fontWeight: 700,
    margin: '0 0 8px 0',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  },
  groupList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  toolButton: {
    background: 'rgba(17, 28, 51, 0.7)',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    borderRadius: '4px',
    color: '#e2e8f0',
    padding: '6px 8px',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  toolButtonActive: {
    background: 'rgba(56, 189, 248, 0.12)',
    borderColor: '#38bdf8',
    color: '#7ee7ff',
    boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)'
  },
  outputWrap: {
    marginTop: '12px',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    borderRadius: '6px',
    background: 'rgba(2, 6, 23, 0.8)',
    overflow: 'hidden'
  },
  outputHeader: {
    background: 'rgba(56, 189, 248, 0.06)',
    color: '#38bdf8',
    borderBottom: '1px solid rgba(56, 189, 248, 0.12)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    padding: '7px 10px',
    textTransform: 'uppercase'
  },
  output: {
    margin: 0,
    padding: '10px',
    color: '#dbeafe',
    fontSize: '11px',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace'
  },
  linksWrap: {
    marginTop: '12px'
  },
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '8px',
    marginTop: '8px'
  },
  linkItem: {
    display: 'inline-block',
    background: 'rgba(17, 28, 51, 0.7)',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    borderRadius: '4px',
    color: '#7ee7ff',
    padding: '7px 8px',
    fontSize: '11px',
    fontWeight: 600,
    textDecoration: 'none',
    textAlign: 'center'
  }
};
