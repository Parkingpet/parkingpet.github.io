# GraphQL Working Examples

## Complete Working Example: Resume Data Query

### GraphQL Query
```graphql
query GetResumeData {
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
    experience {
      id
      company
      position
      duration
      description
      technologies
      achievements
    }
    skills {
      category
      items
      proficiency
    }
    education {
      institution
      degree
      year
      gpa
    }
    projects {
      name
      description
      technologies
      githubUrl
      liveUrl
    }
  }
}
```

### GraphQL Schema
```graphql
type PersonalInfo {
  name: String!
  title: String!
  email: String!
  phone: String
  location: String!
  github: String
  linkedin: String
}

type Experience {
  id: ID!
  company: String!
  position: String!
  duration: String!
  description: String!
  technologies: [String!]!
  achievements: [String!]!
}

type Skill {
  category: String!
  items: [String!]!
  proficiency: Int!
}

type Education {
  institution: String!
  degree: String!
  year: String!
  gpa: Float
}

type Project {
  name: String!
  description: String!
  technologies: [String!]!
  githubUrl: String
  liveUrl: String
}

type Resume {
  personalInfo: PersonalInfo!
  experience: [Experience!]!
  skills: [Skill!]!
  education: [Education!]!
  projects: [Project!]!
}

type Query {
  resume: Resume!
}
```

### React Implementation with Apollo Client
```javascript
import { useQuery, gql } from '@apollo/client';

const GET_RESUME_DATA = gql`
  query GetResumeData {
    resume {
      personalInfo {
        name
        title
        email
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
  }
`;

export function ResumeComponent() {
  const { loading, error, data } = useQuery(GET_RESUME_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { resume } = data;
  return (
    <div>
      <h1>{resume.personalInfo.name}</h1>
      <p>{resume.personalInfo.title}</p>
      {/* Render experience, skills, etc. */}
    </div>
  );
}
```

### Apollo Client Setup
```javascript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.your-resume-service.com/graphql',
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
```

## Example Response
```json
{
  "data": {
    "resume": {
      "personalInfo": {
        "name": "Mustafa McLinn",
        "title": "DevOps Professional",
        "email": "contact@example.com",
        "phone": "+1-555-0123",
        "location": "San Francisco, CA",
        "github": "https://github.com/parkingpet",
        "linkedin": "https://linkedin.com/in/mustafa"
      },
      "experience": [
        {
          "id": "1",
          "company": "Tech Corp",
          "position": "Senior DevOps Engineer",
          "duration": "2022 - Present",
          "description": "Leading infrastructure automation",
          "technologies": ["Kubernetes", "Docker", "Terraform"],
          "achievements": ["Reduced deployment time by 60%"]
        }
      ],
      "skills": [
        {
          "category": "Cloud Platforms",
          "items": ["AWS", "GCP", "Azure"],
          "proficiency": 95
        }
      ]
    }
  }
}
```
