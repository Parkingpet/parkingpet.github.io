# DevOps Knowledge Base - Personal How-To Guides

A comprehensive personal knowledge base with practical how-to guides for DevOps tools, infrastructure automation, and cloud operations.

## Table of Contents

- [Infrastructure as Code](#infrastructure-as-code)
- [Container & Orchestration](#container--orchestration)
- [CI/CD Pipelines](#cicd-pipelines)
- [Cloud Platforms](#cloud-platforms)
- [Monitoring & Observability](#monitoring--observability)
- [Security & Access Control](#security--access-control)
- [Database Administration](#database-administration)
- [Networking & DNS](#networking--dns)
- [Scripting & Automation](#scripting--automation)
- [Troubleshooting & Performance](#troubleshooting--performance)

---

## Infrastructure as Code

### Terraform - Infrastructure Provisioning

#### Quick Start

```bash
# Initialize Terraform project
terraform init

# Validate configuration
terraform validate

# Plan changes
terraform plan -out=tfplan

# Apply changes
terraform apply tfplan

# Destroy resources
terraform destroy
```

#### Common Patterns

**AWS EC2 Instance:**
```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "web-server"
  }
}
```

**VPC with Subnets:**
```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}
```

#### State Management

```bash
# List resources in state
terraform state list

# Show specific resource
terraform state show aws_instance.web

# Remove resource from state (without destroying)
terraform state rm aws_instance.web

# Backup state
terraform state pull > terraform.tfstate.backup
```

#### Troubleshooting

```bash
# Enable debug logging
TF_LOG=DEBUG terraform apply

# Refresh state
terraform refresh

# Validate syntax
terraform fmt -check
```

---

### Ansible - Configuration Management

#### Inventory Setup

```ini
# inventory.ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

#### Basic Playbook

```yaml
---
- name: Configure web servers
  hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
    
    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes
```

#### Common Commands

```bash
# Test connectivity
ansible all -i inventory.ini -m ping

# Run playbook
ansible-playbook -i inventory.ini playbook.yml

# Run with verbose output
ansible-playbook -i inventory.ini playbook.yml -vvv

# Run specific tags
ansible-playbook -i inventory.ini playbook.yml --tags "install"

# Dry run
ansible-playbook -i inventory.ini playbook.yml --check
```

#### Useful Modules

```yaml
# Copy files
- name: Copy config
  copy:
    src: /local/path
    dest: /remote/path
    owner: root
    group: root
    mode: '0644'

# Execute commands
- name: Run command
  command: /usr/bin/somecommand

# Install packages
- name: Install packages
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - curl
    - git

# Manage services
- name: Restart service
  service:
    name: nginx
    state: restarted
```

---

### Chef - Infrastructure Automation

#### Recipe Basics

```ruby
# recipes/default.rb
package 'nginx' do
  action :install
end

service 'nginx' do
  action [:enable, :start]
end

template '/etc/nginx/nginx.conf' do
  source 'nginx.conf.erb'
  notifies :restart, 'service[nginx]'
end
```

#### Cookbook Structure

```
my_cookbook/
├── recipes/
│   └── default.rb
├── templates/
│   └── nginx.conf.erb
├── attributes/
│   └── default.rb
└── metadata.rb
```

#### Common Commands

```bash
# Create cookbook
chef generate cookbook my_cookbook

# Test cookbook
chef exec rspec

# Upload to Chef Server
knife cookbook upload my_cookbook

# Apply to node
knife ssh "role:web" "sudo chef-client"
```

---

## Container & Orchestration

### Docker - Containerization

#### Dockerfile Best Practices

```dockerfile
FROM ubuntu:22.04

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy application
COPY . .

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/health || exit 1

# Run application
CMD ["./start.sh"]
```

#### Docker Commands

```bash
# Build image
docker build -t myapp:1.0 .

# Run container
docker run -d -p 8080:8080 --name myapp myapp:1.0

# View logs
docker logs -f myapp

# Execute command in container
docker exec -it myapp bash

# Push to registry
docker tag myapp:1.0 registry.example.com/myapp:1.0
docker push registry.example.com/myapp:1.0

# Clean up
docker system prune -a
```

#### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

---

### Kubernetes - Container Orchestration

#### Deployment Manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
```

#### Service Manifest

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

#### kubectl Commands

```bash
# Apply manifests
kubectl apply -f deployment.yaml

# View deployments
kubectl get deployments

# View pods
kubectl get pods -o wide

# View logs
kubectl logs -f deployment/myapp

# Port forward
kubectl port-forward svc/myapp-service 8080:80

# Scale deployment
kubectl scale deployment myapp --replicas=5

# Update image
kubectl set image deployment/myapp myapp=myapp:2.0

# Rollback
kubectl rollout undo deployment/myapp

# Delete resources
kubectl delete deployment myapp
```

#### Helm - Package Manager

```bash
# Add repository
helm repo add stable https://charts.helm.sh/stable

# Search charts
helm search repo nginx

# Install chart
helm install my-release stable/nginx-ingress

# List releases
helm list

# Upgrade release
helm upgrade my-release stable/nginx-ingress

# Uninstall release
helm uninstall my-release
```

---

## CI/CD Pipelines

### GitHub Actions

#### Basic Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      if: github.ref == 'refs/heads/main'
      run: npm run deploy
```

#### Matrix Strategy

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm test
```

---

### Jenkins - Build Automation

#### Declarative Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        REGISTRY = 'registry.example.com'
        IMAGE_NAME = 'myapp'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/example/repo.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install && npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t ${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }
        
        stage('Push') {
            steps {
                sh 'docker push ${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'kubectl set image deployment/myapp myapp=${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext(
                subject: "Build Failed: ${env.JOB_NAME}",
                body: "Build ${env.BUILD_NUMBER} failed",
                to: "team@example.com"
            )
        }
    }
}
```

---

## Cloud Platforms

### AWS - Amazon Web Services

#### EC2 Instance Management

```bash
# Launch instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name my-key \
  --security-groups my-security-group

# List instances
aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]'

# Stop instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate instance
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

#### S3 Bucket Operations

```bash
# Create bucket
aws s3 mb s3://my-bucket

# Upload file
aws s3 cp file.txt s3://my-bucket/

# Sync directory
aws s3 sync ./local-dir s3://my-bucket/remote-dir

# List objects
aws s3 ls s3://my-bucket/

# Download file
aws s3 cp s3://my-bucket/file.txt ./
```

#### RDS Database Management

```bash
# Create database
aws rds create-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t2.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password mypassword

# List databases
aws rds describe-db-instances

# Create snapshot
aws rds create-db-snapshot \
  --db-instance-identifier mydb \
  --db-snapshot-identifier mydb-snapshot
```

---

### GCP - Google Cloud Platform

#### Compute Engine

```bash
# Create instance
gcloud compute instances create my-instance \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --machine-type=e2-micro

# List instances
gcloud compute instances list

# SSH into instance
gcloud compute ssh my-instance

# Delete instance
gcloud compute instances delete my-instance
```

#### Cloud Storage

```bash
# Create bucket
gsutil mb gs://my-bucket

# Upload file
gsutil cp file.txt gs://my-bucket/

# Sync directory
gsutil -m rsync -r ./local-dir gs://my-bucket/remote-dir

# List objects
gsutil ls gs://my-bucket/
```

---

### Azure - Microsoft Azure

#### Virtual Machines

```bash
# Create resource group
az group create --name myResourceGroup --location eastus

# Create VM
az vm create \
  --resource-group myResourceGroup \
  --name myVM \
  --image UbuntuLTS \
  --admin-username azureuser

# List VMs
az vm list --output table

# Delete VM
az vm delete --resource-group myResourceGroup --name myVM
```

#### Storage Accounts

```bash
# Create storage account
az storage account create \
  --name mystorageaccount \
  --resource-group myResourceGroup

# Create container
az storage container create \
  --account-name mystorageaccount \
  --name mycontainer

# Upload blob
az storage blob upload \
  --account-name mystorageaccount \
  --container-name mycontainer \
  --name myblob \
  --file file.txt
```

---

## Monitoring & Observability

### Prometheus - Metrics Collection

#### Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
  
  - job_name: 'kubernetes'
    kubernetes_sd_configs:
      - role: pod
```

#### PromQL Queries

```promql
# CPU usage
rate(node_cpu_seconds_total[5m])

# Memory usage
node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes

# Request rate
rate(http_requests_total[5m])

# Error rate
rate(http_requests_total{status=~"5.."}[5m])

# Disk usage
node_filesystem_avail_bytes / node_filesystem_size_bytes
```

---

### Grafana - Visualization

#### Dashboard JSON

```json
{
  "dashboard": {
    "title": "System Metrics",
    "panels": [
      {
        "title": "CPU Usage",
        "targets": [
          {
            "expr": "rate(node_cpu_seconds_total[5m])"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "targets": [
          {
            "expr": "node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes"
          }
        ]
      }
    ]
  }
}
```

---

## Security & Access Control

### IAM - Identity & Access Management

#### AWS IAM Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": "arn:aws:ec2:*:*:instance/*"
    }
  ]
}
```

#### Create IAM User

```bash
# Create user
aws iam create-user --user-name myuser

# Attach policy
aws iam attach-user-policy \
  --user-name myuser \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess

# Create access key
aws iam create-access-key --user-name myuser
```

---

### SSL/TLS Certificates

#### Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d example.com

# Renew certificate
sudo certbot renew

# Auto-renewal
sudo systemctl enable certbot.timer
```

---

## Database Administration

### PostgreSQL

#### Connection

```bash
# Connect to database
psql -h localhost -U postgres -d mydb

# List databases
\l

# Connect to database
\c mydb

# List tables
\dt

# Describe table
\d table_name
```

#### Backup & Restore

```bash
# Backup database
pg_dump -U postgres mydb > backup.sql

# Backup all databases
pg_dumpall -U postgres > all_databases.sql

# Restore database
psql -U postgres mydb < backup.sql

# Backup with compression
pg_dump -U postgres -Fc mydb > backup.dump

# Restore compressed backup
pg_restore -U postgres -d mydb backup.dump
```

#### User Management

```sql
-- Create user
CREATE USER myuser WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- Grant table privileges
GRANT SELECT, INSERT, UPDATE ON table_name TO myuser;

-- Revoke privileges
REVOKE ALL PRIVILEGES ON DATABASE mydb FROM myuser;

-- Drop user
DROP USER myuser;
```

---

## Networking & DNS

### DNS Management

#### Route 53 (AWS)

```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name example.com \
  --caller-reference $(date +%s)

# List hosted zones
aws route53 list-hosted-zones

# Create record
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://change-batch.json
```

#### change-batch.json

```json
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "example.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "192.0.2.1"
          }
        ]
      }
    }
  ]
}
```

---

## Scripting & Automation

### Bash Scripting

#### Deployment Script

```bash
#!/bin/bash

set -e

# Configuration
APP_NAME="myapp"
VERSION="${1:-latest}"
REGISTRY="registry.example.com"

echo "Deploying $APP_NAME:$VERSION"

# Build
docker build -t $REGISTRY/$APP_NAME:$VERSION .

# Push
docker push $REGISTRY/$APP_NAME:$VERSION

# Deploy
kubectl set image deployment/$APP_NAME \
  $APP_NAME=$REGISTRY/$APP_NAME:$VERSION

# Verify
kubectl rollout status deployment/$APP_NAME

echo "Deployment complete!"
```

### Python Scripting

#### AWS Automation

```python
import boto3

# Initialize client
ec2 = boto3.client('ec2', region_name='us-east-1')

# List instances
response = ec2.describe_instances()
for reservation in response['Reservations']:
    for instance in reservation['Instances']:
        print(f"Instance: {instance['InstanceId']}, State: {instance['State']['Name']}")

# Start instance
ec2.start_instances(InstanceIds=['i-1234567890abcdef0'])

# Stop instance
ec2.stop_instances(InstanceIds=['i-1234567890abcdef0'])
```

---

## Troubleshooting & Performance

### Common Issues & Solutions

#### Docker Container Won't Start

```bash
# Check logs
docker logs container_name

# Inspect container
docker inspect container_name

# Run with interactive shell
docker run -it image_name /bin/bash

# Check resource limits
docker stats container_name
```

#### Kubernetes Pod Crash Loop

```bash
# Check pod status
kubectl describe pod pod_name

# View logs
kubectl logs pod_name --previous

# Check events
kubectl get events --sort-by='.lastTimestamp'

# Debug with temporary pod
kubectl run -it --rm debug --image=ubuntu --restart=Never -- bash
```

#### High CPU/Memory Usage

```bash
# Linux - top processes
top -b -n 1 | head -20

# Linux - memory usage
free -h

# Linux - disk usage
df -h

# Docker - resource stats
docker stats

# Kubernetes - resource usage
kubectl top nodes
kubectl top pods
```

---

## Quick Reference

### Essential Commands

| Tool | Command | Purpose |
|------|---------|---------|
| Terraform | `terraform apply` | Apply infrastructure changes |
| Ansible | `ansible-playbook playbook.yml` | Run playbook |
| Docker | `docker build -t image:tag .` | Build image |
| kubectl | `kubectl apply -f manifest.yaml` | Deploy to Kubernetes |
| AWS CLI | `aws ec2 describe-instances` | List EC2 instances |
| GCP CLI | `gcloud compute instances list` | List GCP instances |
| Prometheus | `promtool check config` | Validate config |

---

## Resources & References

- [Terraform Documentation](https://www.terraform.io/docs)
- [Ansible Documentation](https://docs.ansible.com)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [AWS Documentation](https://docs.aws.amazon.com)
- [GCP Documentation](https://cloud.google.com/docs)
- [Azure Documentation](https://docs.microsoft.com/azure)

---

**Last Updated:** 2026-03-16  
**Version:** 1.0.0
