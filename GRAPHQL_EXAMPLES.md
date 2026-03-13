# GraphQL Data Examples

This document provides examples of GraphQL queries and responses available from the Mustafa McLinn DevOps Resume site.

## Available Data Structure

The resume site exposes comprehensive professional data through GraphQL, including personal information, skills, experience, projects, education, and client history.

---

## Example Queries

### 1. Get Personal Information

**Query:**
```graphql
query GetPersonalInfo {
  resume {
    personalInfo {
      name
      title
      email
      phone
      location
      github
      linkedin
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "personalInfo": {
        "name": "Mustafa McLinn",
        "title": "Systems Engineer | DevOps | Infrastructure Automation | Cloud Hybrid Operations",
        "email": "mustafa.mclinn@outlook.com",
        "phone": "510 296 0233",
        "location": "Oakland / San Francisco, CA",
        "github": "https://github.com/Parkingpet",
        "linkedin": "https://www.linkedin.com/in/mustafa-mclinn-a55a9a9"
      }
    }
  }
}
```

---

### 2. Get All Skills

**Query:**
```graphql
query GetSkills {
  resume {
    skills {
      category
      items
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "skills": [
        {
          "category": "Operating Systems",
          "items": ["Windows 10/11", "Windows Server", "macOS", "Linux CentOS", "Ubuntu", "CoreOS"]
        },
        {
          "category": "Scripting and Programming",
          "items": ["Bash", "PowerShell", "Python", "Ruby", "Node.js"]
        },
        {
          "category": "Cloud",
          "items": ["AWS EC2", "AWS S3", "AWS IAM", "GCP", "Azure"]
        },
        {
          "category": "DevOps and Automation",
          "items": ["Ansible", "Jenkins", "Terraform", "Chef", "GitLab CI"]
        },
        {
          "category": "Networking",
          "items": ["LAN", "WAN", "VPN", "Firewalls", "VLANs", "Cisco", "HP"]
        },
        {
          "category": "Security",
          "items": ["IAM", "2FA", "Network Security Protocols", "Access Controls"]
        },
        {
          "category": "Databases",
          "items": ["MySQL", "PostgreSQL", "MSSQL", "NoSQL"]
        },
        {
          "category": "Tools",
          "items": ["Jira", "GitHub", "Artifactory", "Splunk", "SCCM", "XenApp"]
        }
      ]
    }
  }
}
```

---

### 3. Get Work Experience

**Query:**
```graphql
query GetExperience {
  resume {
    experience {
      company
      title
      date
      achievements
    }
  }
}
```

**Response (Partial):**
```json
{
  "data": {
    "resume": {
      "experience": [
        {
          "company": "Teckguy",
          "title": "Independent Consultant | System Administration and IT Support",
          "date": "1995 to Present",
          "achievements": [
            "Provided IT consulting and technical support across healthcare, insurance, legal, arts, nonprofit, and MSP environments",
            "Configured and managed HaloPSA and RMM workflows for Flo.Solutions MSP operations",
            "Built and supported ticketing, streaming, NAS, and web solutions for remote and onsite use cases",
            "Managed mixed environment infrastructure for Windows, macOS, and Linux"
          ]
        },
        {
          "company": "RevisionFX",
          "title": "Systems Administrator | Tier I II Support",
          "date": "Feb 2004 to Feb 2024",
          "achievements": [
            "Delivered 24/7 support for global customers across Japan, Russia, India, and other regions",
            "Maintained cloud infrastructure and rolled updates to AWS production environments with zero downtime",
            "Managed EC2 instances, S3 buckets, CloudFront distributions, and Route 53 DNS configurations"
          ]
        },
        {
          "company": "Workday",
          "title": "Systems Engineer",
          "date": "May 2016 to Aug 2017",
          "achievements": [
            "Executed 4,500+ CentOS live upgrades across global production environments with zero downtime",
            "Developed Chef cookbooks and recipes for automated configuration management",
            "Supported team effort resolving DirtyCow security vulnerability across all global datacenters"
          ]
        }
      ]
    }
  }
}
```

---

### 4. Get Projects

**Query:**
```graphql
query GetProjects {
  resume {
    projects {
      company
      title
      link
      achievements
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "projects": [
        {
          "company": "ParkingPet",
          "title": "Smart parking platform concept and public project site",
          "link": "https://github.com/Parkingpet",
          "achievements": [
            "Current GitHub Pages repo used for public facing presence and iteration",
            "React-based resume site with terminal UI, DevOps tools integration, and automated CI/CD deployment",
            "Features animated grid backgrounds, CRT effects, and integrated Base64, JSON, Hash, Regex, and Timestamp tools"
          ]
        },
        {
          "company": "RevisionFX.tech",
          "title": "Technical support and development resources",
          "link": "https://github.com/endorfinized",
          "achievements": [
            "GitHub repository for RevisionFX technical resources and support tools",
            "Development work supporting video plugin infrastructure and customer solutions"
          ]
        }
      ]
    }
  }
}
```

---

### 5. Get Education

**Query:**
```graphql
query GetEducation {
  resume {
    education {
      institution
      degree
      year
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "education": [
        {
          "institution": "Golden Gate University",
          "degree": "Management",
          "year": "2012-2014"
        },
        {
          "institution": "Lincoln University",
          "degree": "Computer Science",
          "year": "2003-2005"
        },
        {
          "institution": "Diablo Valley College",
          "degree": "Computer Science",
          "year": "1999"
        },
        {
          "institution": "Academy of Art University",
          "degree": "3D Modeling",
          "year": "1998"
        },
        {
          "institution": "Southern University",
          "degree": "Electrical Engineering",
          "year": "1993-1994"
        }
      ]
    }
  }
}
```

---

### 6. Get Competencies

**Query:**
```graphql
query GetCompetencies {
  resume {
    competencies
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "competencies": [
        "System Administration and Desktop Support",
        "Cloud Hybrid Computing AWS GCP Azure",
        "Infrastructure Automation Ansible Chef Jenkins",
        "CI CD Pipelines and Deployment Strategies",
        "Network Administration and Security",
        "Scripting Bash PowerShell Python",
        "Virtualization and Containerization Docker Kubernetes",
        "IT Consulting and Solution Architecture"
      ]
    }
  }
}
```

---

### 7. Get Professional Summary

**Query:**
```graphql
query GetSummary {
  resume {
    summary
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "summary": [
        "Infrastructure architect specializing in enterprise-scale hybrid cloud environments (AWS, GCP, Azure). Expert in infrastructure-as-code (Terraform, Ansible, Chef), containerization (Docker, Kubernetes), and CI/CD pipeline design.",
        "Technical depth spans configuration management, container orchestration, infrastructure automation, and cross-platform systems integration. Experienced with infrastructure migrations, multi-environment deployments, and cost optimization through resource consolidation."
      ]
    }
  }
}
```

---

### 8. Get Clients

**Query:**
```graphql
query GetClients {
  resume {
    clients {
      name
      period
      description
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "resume": {
      "clients": [
        {
          "name": "RevisionFX",
          "period": "2004-2024",
          "description": "20-year partnership providing desktop hardware support, production and testing environments, developer-adjacent troubleshooting"
        },
        {
          "name": "Workday",
          "period": "2016-2017",
          "description": "Systems engineering for CentOS upgrades and Chef configuration management"
        },
        {
          "name": "Splunk",
          "period": "2018",
          "description": "Systems engineer maintaining Splunk Cloud services in high-intensity production environment"
        },
        {
          "name": "Flo Solutions",
          "period": "2024-2025",
          "description": "HaloPSA API configuration and Microsoft 365 automation for MSP operations"
        }
      ]
    }
  }
}
```

---

### 9. Complex Query - Full Resume Data

**Query:**
```graphql
query GetFullResume {
  resume {
    personalInfo {
      name
      title
      email
      phone
      location
    }
    summary
    competencies
    skills {
      category
      items
    }
    experience {
      company
      title
      date
      achievements
    }
    projects {
      company
      title
      link
    }
    education {
      institution
      degree
      year
    }
  }
}
```

---

## GraphQL Schema

```graphql
type PersonalInfo {
  name: String!
  title: String!
  email: String!
  phone: String!
  location: String!
  github: String!
  linkedin: String!
}

type Skill {
  category: String!
  items: [String!]!
}

type Experience {
  company: String!
  title: String!
  date: String!
  achievements: [String!]!
}

type Project {
  company: String!
  title: String!
  link: String!
  achievements: [String!]!
}

type Education {
  institution: String!
  degree: String!
  year: String!
}

type Client {
  name: String!
  period: String!
  description: String!
}

type Resume {
  personalInfo: PersonalInfo!
  summary: [String!]!
  competencies: [String!]!
  skills: [Skill!]!
  experience: [Experience!]!
  projects: [Project!]!
  education: [Education!]!
  clients: [Client!]!
}

type Query {
  resume: Resume!
}
```

---

## Integration Examples

### Using Apollo Client (React)

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

const GET_RESUME = gql`
  query GetResume {
    resume {
      personalInfo {
        name
        title
        email
      }
      experience {
        company
        title
        date
      }
      skills {
        category
        items
      }
    }
  }
`;

// Use in React component
const { loading, error, data } = useQuery(GET_RESUME);
```

### Using Fetch API

```javascript
const query = `
  query {
    resume {
      personalInfo {
        name
        title
        email
      }
      experience {
        company
        title
      }
    }
  }
`;

fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Benefits of GraphQL for Resume Data

- **Efficient Queries**: Request only the fields you need
- **Type Safety**: Strongly typed schema prevents errors
- **Real-time Updates**: Subscribe to resume changes
- **API Evolution**: Add new fields without breaking existing queries
- **Developer Experience**: Excellent tooling and documentation

---

For more information, see the [README.md](README.md) GraphQL Integration Guide section.
