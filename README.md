# Mustafa McLinn | DevOps Resume Site

[![Deploy](https://github.com/Parkingpet/parkingpet.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Parkingpet/parkingpet.github.io/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/Parkingpet/parkingpet.github.io)

## Live Resume

**[View Interactive Resume](https://parkingpet.github.io)** | **[GitHub Repository](https://github.com/Parkingpet/parkingpet.github.io)**

---

## About Mustafa McLinn

**Systems Engineer | DevOps | Infrastructure Automation | Cloud Hybrid Operations**

Oakland / San Francisco, CA  
mustafa.mclinn@outlook.com  
510 296 0233  

### Professional Summary

Systems and infrastructure engineer with **25+ years** of hands-on experience spanning enterprise IT, cloud operations, DevOps automation, endpoint management, and production support across Windows, Linux, and macOS environments. I build stable platforms, automate repeatable work, and troubleshoot critical issues under pressure.

**Core Strengths:**
- Cloud hybrid operations (AWS, GCP, Azure)
- Configuration management (Ansible, Chef)
- CI/CD pipeline design and implementation
- Scripting and automation (PowerShell, Bash, Python)
- Enterprise infrastructure troubleshooting
- Customer-facing technical support with clear documentation

---

## Resume Site Features

### Terminal-Style Loading Experience
- Authentic CLI boot sequence with real-time progress
- Cyberpunk aesthetic with animated grid background
- Professional DevOps terminal simulation

### Integrated DevOps Toolkit
Built-in tools accessible directly on the resume:
- **Base64** encoder/decoder for data transformation
- **JSON** formatter & minifier for API work
- **Timestamp** converter (Unix to ISO) for log analysis
- **SHA-256** hash generator for security tasks
- **Regex** pattern tester for text processing

### High-Tech Visual Design
- Animated matrix-style grid overlay
- CRT scanline effects for retro-tech feel
- Neon blue accent colors throughout
- Smooth fade transitions and animations
- Mobile-responsive design

---

## Technical Expertise

### Cloud Platforms
- **AWS**: EC2, S3, IAM, CloudFormation
- **Google Cloud Platform**: Compute Engine, Container Registry
- **Microsoft Azure**: Virtual Machines, Active Directory

### DevOps & Automation
- **Configuration Management**: Ansible, Chef, Puppet
- **CI/CD**: Jenkins, GitLab CI, GitHub Actions
- **Infrastructure as Code**: Terraform, CloudFormation
- **Containerization**: Docker, Kubernetes, CoreOS

### Operating Systems
- **Linux**: CentOS, Ubuntu, CoreOS, RedHat
- **Windows**: Server 2016/2019/2022, Windows 10/11
- **macOS**: System administration and support

### Scripting & Programming
- **Shell**: Bash, PowerShell, Zsh
- **Languages**: Python, Ruby, Node.js
- **Automation**: Custom scripts for deployment and monitoring

### Networking & Security
- **Network**: LAN/WAN, VPN, Firewalls, VLANs
- **Hardware**: Cisco, HP networking equipment
- **Security**: IAM, 2FA, access controls, network security protocols

### Databases & Tools
- **Databases**: MySQL, PostgreSQL, MSSQL, NoSQL
- **Monitoring**: Splunk, Nagios, custom dashboards
- **Collaboration**: Jira, GitHub, Artifactory
- **Virtualization**: VMware, Hyper-V, XenApp

---

## Professional Experience Highlights

### Current Role: Independent Consultant (1995 - Present)
**Teckguy | System Administration and IT Support**

- Provide IT consulting across healthcare, insurance, legal, arts, nonprofit, and MSP environments
- Configure and manage HaloPSA and RMM workflows for MSP operations
- Administer Microsoft 365 via Admin Center, Teams, Graph API, and automation
- Build and support ticketing, streaming, NAS, and web solutions
- Manage mixed-environment infrastructure including printers, specialized devices, switches, routers, and hybrid backup strategies

### Recent Corporate Experience

**RevisionFX (Feb 2021 - Feb 2024)**  
*Systems Administrator | Tier I/II Support*
- Delivered 24/7 support for global customers across multiple time zones
- Supported 40+ plugins across 15+ applications on Windows, macOS, and Linux
- Maintained cloud infrastructure and deployed updates to AWS production environments
- Diagnosed complex hardware issues including CUDA GPU and network card problems
- Built automation scripts using PowerShell, Bash, and shell tooling

**Splunk (Jan 2018 - May 2018)**  
*Systems Engineer*
- Maintained Splunk Cloud services in high-intensity production environment
- Resolved complex issues and performed instance rebuilds
- Optimized AWS EC2 stacks for performance and cost efficiency
- Developed automation scripts in Bash, Ruby, and Node.js

**Workday (Apr 2016 - Sep 2017)**  
*Systems Engineer*
- Managed Chef server nodes and supported CentOS upgrades
- Executed 4,500+ CentOS live upgrades across global production environments
- Completed upgrades ahead of schedule with zero downtime
- Created instructional video documentation for self-service upgrades

---

## Education & Certifications

- **Golden Gate University**: Management (2012-2014)
- **Lincoln University**: Computer Science (2003-2005)
- **Diablo Valley College**: Computer Science (1999)
- **Academy of Art University**: 3D Modeling (1998)
- **Southern University**: Electrical Engineering (1993-1994)

---

## Architecture & Tech Stack

### Frontend
```bash
React 18.2          # Modern component architecture
Vite 5.0            # Lightning-fast build tool
JavaScript ES6+     # Modern syntax and features
CSS-in-JS          # Styled components approach
```

### DevOps Pipeline
```bash
GitHub Actions      # Automated CI/CD pipeline
GitHub Pages        # Static site hosting
npm                 # Package management
Vite Build         # Optimized production builds
```

### Development Workflow
```bash
# Local development
npm install         # Install dependencies
npm run dev        # Start development server
npm run build      # Create production build
npm run preview    # Preview production build
```

---

## Project Structure

```
src/
├── App.jsx           # Main application with loading sequence
├── Tools.jsx         # DevOps tools floating panel
├── resumeData.js     # Resume content as structured data
├── main.jsx          # React application entry point
└── index.css         # Global styles and animations

public/
├── resume.txt        # Plain text version
└── favicon.ico       # Site favicon

.github/workflows/
└── deploy.yml        # Automated deployment pipeline

docs/
├── CONTRIBUTING.md   # Contribution guidelines
└── DEPLOYMENT.md     # Deployment instructions
```

---

## Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- Git for version control
- Modern web browser

### Installation
```bash
# Clone the repository
git clone https://github.com/Parkingpet/parkingpet.github.io.git
cd parkingpet.github.io

# Install dependencies
npm install

# Start development server
npm run dev
# Opens http://localhost:5173
```

### Customization
1. **Update Resume Data**: Edit `src/resumeData.js`
2. **Modify Styling**: Update styles in `src/App.jsx`
3. **Add Tools**: Extend the tools object in `src/Tools.jsx`
4. **Change Animations**: Modify `src/index.css`

---

## DevOps Tools Reference

| Tool | Purpose | Use Case | Example |
|------|---------|----------|---------|
| **Base64** | Encode/decode data | API tokens, data transmission | `echo "hello" \| base64` |
| **JSON** | Format & validate | API responses, config files | Pretty-print JSON responses |
| **Timestamp** | Unix to human time | Log analysis, debugging | Convert `1640995200` to `2022-01-01` |
| **Hash** | Generate SHA-256 | File integrity, passwords | Verify file checksums |
| **Regex** | Pattern matching | Log parsing, validation | Extract IPs from logs |

---

## Performance Metrics

- **Build Time**: ~2 seconds
- **Bundle Size**: <100KB gzipped
- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: <1 second on 3G
- **First Contentful Paint**: <0.8s
- **Time to Interactive**: <1.2s

---

## Notable Client Projects

### Long-term Partnerships
- **RevisionFX** (2004-2024): 20-year partnership providing desktop hardware support, production environments, and developer-adjacent troubleshooting
- **Dr. Rathod Dental Office** (2019-2025): X-ray systems, Dentrix support, backups, Server 2022 administration
- **Flo Solutions** (2024-2025): HaloPSA API configuration, Microsoft 365 automation for MSP operations

### Specialized Projects
- **Poor Magazine** (2019-2020): Radio station build, remote studio setup, NAS implementation
- **LANgineers** (2014): Arc SoftSwitch SIP phone deployment for 40+ clients supporting 400+ VoIP phones
- **Dr. Cox Dental Office** (1997-2019): 22-year partnership providing Dentrix database support and digital X-ray systems

---

## Why This Resume Approach?

- **Technical Demonstration**: Shows actual coding and DevOps skills
- **Interactive Experience**: Engages recruiters and hiring managers
- **Modern Architecture**: Demonstrates current technology proficiency
- **Performance Optimized**: Fast loading, mobile-responsive design
- **DevOps Integration**: Built-in tools showcase daily workflow expertise
- **Automated Deployment**: CI/CD pipeline demonstrates DevOps practices
- **Open Source**: Transparent code available for technical review

---

## Deployment & Monitoring

### Automated Deployment
- **Trigger**: Push to `main` branch
- **Build**: Vite production build
- **Deploy**: GitHub Pages automatic deployment
- **Monitoring**: GitHub Actions workflow status

### Performance Monitoring
- Lighthouse CI integration
- Bundle size tracking
- Load time monitoring
- Core Web Vitals tracking

---

## Contributing

Interested in contributing to this resume site template?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-enhancement`
3. Make your changes with clear commit messages
4. Test thoroughly: `npm run build && npm run preview`
5. Submit a pull request with detailed description

---

## License

MIT License - Feel free to use this as a template for your own resume site!

---

## Contact & Collaboration

**Ready to discuss your next DevOps challenge?**

Email: mustafa.mclinn@outlook.com  
Phone: 510 296 0233  
Location: Oakland / San Francisco Bay Area  
GitHub: [View Repository](https://github.com/Parkingpet/parkingpet.github.io)  
Live Site: [parkingpet.github.io](https://parkingpet.github.io)  

---

"Because your resume should be as automated and reliable as your infrastructure."

**Built by a DevOps Engineer, for DevOps Teams**
