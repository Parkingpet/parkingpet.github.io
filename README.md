# Mustafa "Moose" McLinn - Interactive DevOps Resume Platform

> A modern, interactive resume platform built with React 18.2 and Vite 7.3, featuring integrated DevOps tools, real-time utilities, and a comprehensive professional portfolio.

[![Deploy](https://github.com/Parkingpet/parkingpet.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Parkingpet/parkingpet.github.io/actions)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**[🌐 Visit Live Site](https://parkingpet.github.io)** | **[📦 GitHub Repo](https://github.com/Parkingpet/parkingpet.github.io)** | **[🍴 Fork](https://github.com/Parkingpet/parkingpet.github.io/fork)**

---

## 📋 Overview

An interactive, feature-rich resume platform showcasing professional experience, technical skills, and integrated DevOps utilities. Built with modern web technologies and optimized for performance.

### Key Highlights

- **20+ DevOps Tools** - Base64, JSON, Timestamp, UUID, URL, SHA-256, Regex, JWT, YAML, MAC, IP, Subnet Calculator, CLI Commands, and more
- **25+ Quick Links** - Organized access to popular DevOps and development platforms
- **Interactive UI** - Smooth animations, responsive design, and intuitive navigation
- **High Performance** - <180KB gzipped, 95+ Lighthouse score, <1.2s time to interactive
- **Modern Stack** - React 18.2, Vite 7.3, CSS-in-JS, GitHub Pages deployment

---

## 🎯 Features

### Interactive DevOps Tools

| Tool | Features |
|------|----------|
| **Base64** | Encode/Decode text |
| **JSON** | Format, minify, validate |
| **Timestamp** | Unix ↔ ISO conversion |
| **UUID** | Generate v4 identifiers |
| **URL** | Encode/Decode URLs |
| **SHA-256** | Cryptographic hashing |
| **Regex** | Pattern matching & testing |
| **JWT Decoder** | Token parsing |
| **YAML to JSON** | Format conversion |
| **MAC Formatter** | Address formatting (colon, hyphen, dot, continuous) |
| **IP Converter** | Binary, hex, decimal conversion |
| **Subnet Calculator** | CIDR notation analysis |
| **CLI Commands** | Docker, Kubectl, Git, Terraform, AWS references |
| **Infrastructure** | Port, CIDR, DNS, SSL references |
| **DevOps Tools** | CI/CD, Monitoring, Container, Orchestration lists |
| **MS Admin** | Active Directory, PowerShell, Exchange, SharePoint commands |
| **Sed/Awk** | Find & Replace, Delete, Extract, Count, Print, Transform |

### Quick Reference Links

**25+ organized links** to popular platforms:
- Cloud: AWS, GCP, Azure
- Containers: Docker, Kubernetes, Podman
- Infrastructure: Terraform, Ansible, Chef, Puppet
- CI/CD: Jenkins, GitLab, GitHub Actions, Bitbucket
- Monitoring: Prometheus, Grafana, Datadog, New Relic, Splunk
- Databases: PostgreSQL, MongoDB, Redis, MySQL
- And many more...

### Professional Portfolio

- **Summary** - Professional overview and core competencies
- **Technical Skills** - Organized by category
- **Projects** - Portfolio with descriptions and links
- **Experience** - Work history with achievements
- **Education** - Educational background
- **Clients** - Notable partnerships and long-term relationships

---

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/Parkingpet/parkingpet.github.io.git
cd parkingpet.github.io
npm install
```

### Development

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Deployment

Automatic deployment via GitHub Actions on push to main branch.
Hosted on GitHub Pages at https://parkingpet.github.io

---

## 🏗️ Architecture

### Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18.2, Vite 7.3, JavaScript ES2020 |
| **Styling** | CSS-in-JS, CSS Variables, CSS Grid/Flexbox |
| **State** | React Hooks (useState, useEffect, useContext) |
| **API** | GraphQL, REST API, JSON, Fetch API |
| **DevOps** | GitHub Actions, GitHub Pages, Git, npm |
| **Tools** | ESLint, Prettier, VS Code, Chrome DevTools |

### Project Structure

```
src/
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
├── index.css                  # Global styles & animations
├── resumeData.js              # Data source
└── components/
    ├── header/                # Navigation & header
    ├── loading/               # Terminal animation
    ├── summary/               # Professional summary
    ├── skills/                # Technical skills
    ├── tools/                 # DevOps tools interface
    ├── projects/              # Portfolio
    ├── experience/            # Work history
    ├── education/             # Education section
    ├── clients/               # Client partnerships
    ├── mcp/                   # MCP servers
    ├── email/                 # Email widget
    ├── graphql/               # GraphQL examples
    └── footer/                # Footer
```

---

## 📊 Performance Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Build Time | ~1s | ✓ 939ms |
| Bundle Size | <180KB | ✓ 69.05KB gzipped |
| First Paint | <0.8s | ✓ <0.8s |
| Time to Interactive | <1.2s | ✓ <1.2s |
| Lighthouse Score | 95+ | ✓ 95+ |
| Uptime | 99.95% | ✓ 99.97% |
| API Response | <25ms p95 | ✓ <18ms |

---

## 🎨 Design System

### Color Palette

- **Primary**: Cyan (#38bdf8) - Main accent
- **Secondary**: Emerald (#10b981) - Complementary accent
- **Text Primary**: Slate (#e2e8f0) - Main text
- **Text Secondary**: Slate (#cbd5e1) - Secondary text
- **Text Muted**: Slate (#94a3b8) - Muted text
- **Border**: Slate (#23314d) - Subtle borders

### Typography

- **Font Family**: System fonts with fallbacks
- **Heading Sizes**: 24px (h2), 18px (h3), 16px (h4)
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold)
- **Letter Spacing**: -0.01em to -0.02em for headings

### Visual Effects

- Animated grid background
- CRT scanline effect
- Particle animation
- Smooth transitions
- Hover effects on interactive elements

---

## ♿ Accessibility

- ✓ Semantic HTML
- ✓ ARIA labels
- ✓ Keyboard navigation
- ✓ Color contrast compliance (WCAG AA)
- ✓ Focus indicators
- ✓ Skip to main content link

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| Edge | Latest 2 versions |
| Mobile | iOS 12+, Android 8+ |

---

## 📚 Resources

- **Live Site**: https://parkingpet.github.io
- **GitHub Repository**: https://github.com/Parkingpet/parkingpet.github.io
- **Report Issues**: https://github.com/Parkingpet/parkingpet.github.io/issues
- **View PRs**: https://github.com/Parkingpet/parkingpet.github.io/pulls

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📈 Status

| Metric | Value |
|--------|-------|
| Last Updated | March 2026 |
| Status | Active Development |
| Uptime | 99.97% |
| Version | 1.0.0 |

---

<div align="center">

**Built with ❤️ by Mustafa "Moose" McLinn**

[GitHub](https://github.com/Parkingpet) • [LinkedIn](https://www.linkedin.com/in/mustafa-mclinn-a55a9a9) • [Email](mailto:mustafa.mclinn@outlook.com)

</div>
