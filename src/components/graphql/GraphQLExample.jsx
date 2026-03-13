import React, { useState } from 'react';

export default function GraphQLExample() {
  const [activeTab, setActiveTab] = useState('query');

  const graphqlQuery = `query GetResumeData {
  resume {
    personalInfo {
      name
      title
      email
      location
    }
    experience {
      company
      position
      duration
    }
    skills {
      category
      items
    }
  }
}`;

  const exampleResponse = `{
  "data": {
    "resume": {
      "personalInfo": {
        "name": "Mustafa McLinn",
        "title": "DevOps Professional",
        "email": "contact@example.com",
        "location": "San Francisco, CA"
      },
      "experience": [
        {
          "company": "Tech Corp",
          "position": "Senior DevOps Engineer",
          "duration": "2022 - Present"
        }
      ],
      "skills": [
        {
          "category": "Cloud Platforms",
          "items": ["AWS", "GCP", "Azure"]
        }
      ]
    }
  }
}`;

  const reactCode = `import { useQuery, gql } from '@apollo/client';

const GET_RESUME_DATA = gql\`
  query GetResumeData {
    resume {
      personalInfo { name title email }
      experience { company position duration }
      skills { category items }
    }
  }
\`;

export function ResumeComponent() {
  const { loading, error, data } = useQuery(GET_RESUME_DATA);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <h1>{data.resume.personalInfo.name}</h1>
      <p>{data.resume.personalInfo.title}</p>
    </div>
  );
}`;

  const styles = {
    container: {
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '32px',
      marginBottom: '32px',
    },
    title: {
      fontSize: '32px',
      color: '#38bdf8',
      fontWeight: 600,
      marginBottom: '20px',
      fontFamily: 'Inter, Segoe UI, system-ui, sans-serif',
      letterSpacing: '-0.01em'
    },
    description: {
      color: '#cbd5e1',
      marginBottom: '24px',
      fontSize: '14px',
      lineHeight: 1.6,
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
      borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
      paddingBottom: '12px',
    },
    tab: {
      padding: '10px 16px',
      background: 'transparent',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      fontFamily: 'Fira Code, Courier New, monospace',
      borderBottom: '2px solid transparent',
      transition: 'all 0.3s ease',
    },
    tabActive: {
      color: '#38bdf8',
      borderBottomColor: '#38bdf8',
    },
    codeBlock: {
      background: 'rgba(11, 18, 32, 0.6)',
      border: '1px solid rgba(56, 189, 248, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      overflow: 'auto',
      maxHeight: '400px',
    },
    code: {
      fontFamily: 'Fira Code, Courier New, monospace',
      fontSize: '13px',
      color: '#38bdf8',
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    },
    highlight: {
      color: '#10b981',
    },
    string: {
      color: '#f59e0b',
    },
    keyword: {
      color: '#8b5cf6',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>GraphQL Working Example</h3>
      <p style={styles.description}>
        See how to query resume data using GraphQL. Click the tabs below to view the query, response, and React implementation.
      </p>

      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'query' ? styles.tabActive : {}),
          }}
          onClick={() => setActiveTab('query')}
        >
          GraphQL Query
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'response' ? styles.tabActive : {}),
          }}
          onClick={() => setActiveTab('response')}
        >
          Example Response
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'react' ? styles.tabActive : {}),
          }}
          onClick={() => setActiveTab('react')}
        >
          React Implementation
        </button>
      </div>

      <div style={styles.codeBlock}>
        <code style={styles.code}>
          {activeTab === 'query' && graphqlQuery}
          {activeTab === 'response' && exampleResponse}
          {activeTab === 'react' && reactCode}
        </code>
      </div>

      <div style={{ marginTop: '20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
        <p style={{ margin: 0 }}>
          💡 <strong>Tip:</strong> Use Apollo Client to integrate this query into your React components. 
          See the README for full setup instructions.
        </p>
      </div>
    </div>
  );
}
