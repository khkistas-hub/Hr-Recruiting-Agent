import { JobDescription } from '../types';

export const SAMPLE_JOBS: JobDescription[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend & React Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Senior (5+ Years)',
    minYearsExperience: 5,
    salaryRange: '$140,000 - $175,000',
    status: 'Active',
    createdAt: '2026-07-15',
    education: "Bachelor's Degree in Computer Science, Software Engineering, or equivalent experience",
    description: 'We are seeking an exceptional Senior Frontend Engineer to lead the design and development of our modern, scalable web applications. You will collaborate closely with UI/UX designers and backend developers to build lightning-fast, high-converting interfaces using React, TypeScript, TailwindCSS, and modern state management.',
    requiredSkills: [
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'State Management (Redux/Zustand)',
      'REST APIs & GraphQL',
      'Performance Optimization',
      'Jest / Testing Library'
    ],
    niceToHaveSkills: [
      'Next.js',
      'Web Workers / WebAssembly',
      'CI/CD Pipelines',
      'Design Systems (Figma)',
      'WebSockets'
    ],
    responsibilities: [
      'Architect and build resilient, accessible frontend components in React and TypeScript.',
      'Optimize web application performance to achieve sub-second load times and high Lighthouse metrics.',
      'Mentor junior engineers and champion code quality standards via code reviews.',
      'Collaborate with Product and Design teams to craft seamless user experiences.'
    ]
  },
  {
    id: 'job-2',
    title: 'AI / Machine Learning Engineer',
    department: 'AI & Research',
    location: 'Remote (US)',
    type: 'Full-time',
    experienceLevel: 'Mid-Senior (4+ Years)',
    minYearsExperience: 4,
    salaryRange: '$160,000 - $195,000',
    status: 'Active',
    createdAt: '2026-07-20',
    education: "Master's or Ph.D. in Computer Science, Data Science, AI, or Quantitative Field",
    description: 'Join our cutting-edge AI team building generative AI solutions, LLM pipelines, and automated intelligence agents. You will fine-tune open-source models, build robust RAG architectures, deploy vector databases, and integrate LLM APIs into production applications.',
    requiredSkills: [
      'Python',
      'PyTorch / TensorFlow',
      'Large Language Models (LLMs)',
      'LangChain / LlamaIndex',
      'Vector Databases (Pinecone/Weaviate/Chroma)',
      'RAG Architectures',
      'Docker & Kubernetes',
      'FastAPI / Flask'
    ],
    niceToHaveSkills: [
      'Model Fine-Tuning (PEFT/LoRA)',
      'CUDA Optimization',
      'MLflow / Weights & Biases',
      'AWS SageMaker',
      'C++'
    ],
    responsibilities: [
      'Design and deploy retrieval-augmented generation (RAG) pipelines for enterprise search.',
      'Fine-tune foundation models on domain-specific datasets to improve accuracy.',
      'Build low-latency inference APIs with FastAPI and Docker.',
      'Monitor AI performance metrics, hallucinations, and safety guardrails.'
    ]
  },
  {
    id: 'job-3',
    title: 'Lead Product Manager - Enterprise SaaS',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Lead (6+ Years)',
    minYearsExperience: 6,
    salaryRange: '$150,000 - $185,000',
    status: 'Active',
    createdAt: '2026-07-25',
    education: "Bachelor's Degree required; MBA preferred",
    description: 'We are hiring a Lead Product Manager to drive product strategy and execution for our flagship Enterprise SaaS platform. You will discover user needs, prioritize product roadmaps, conduct market analyses, and partner with engineering and sales to launch game-changing features.',
    requiredSkills: [
      'Product Strategy & Roadmap',
      'User Research & Discovery',
      'Agile / Scrum Methodology',
      'Data Analytics (Mixpanel/Amplitude)',
      'SaaS Business Metrics (ARR/CAC/LTV)',
      'Wireframing (Figma)',
      'Cross-Functional Leadership'
    ],
    niceToHaveSkills: [
      'SQL / BigQuery',
      'B2B Enterprise Sales Enablement',
      'API Product Integration',
      'Jira / Confluence'
    ],
    responsibilities: [
      'Define vision, strategy, and feature roadmaps for the enterprise platform.',
      'Analyze customer telemetry and run user interviews to identify high-impact feature opportunities.',
      'Partner with tech leads to deliver sprint milestones on schedule.',
      'Conduct competitive intelligence and present growth reports to executives.'
    ]
  },
  {
    id: 'job-4',
    title: 'Senior Cloud DevOps & Infrastructure Engineer',
    department: 'Infrastructure',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Senior (5+ Years)',
    minYearsExperience: 5,
    salaryRange: '$145,000 - $180,000',
    status: 'Active',
    createdAt: '2026-07-28',
    education: "Bachelor's degree in Computer Science, IT, or equivalent experience",
    description: 'Looking for a Senior DevOps Engineer to modernize, secure, and scale our AWS cloud infrastructure. You will manage Infrastructure as Code (Terraform), maintain Kubernetes clusters, automate CI/CD pipelines, and enforce zero-trust cloud security standards.',
    requiredSkills: [
      'AWS (EC2, EKS, S3, IAM)',
      'Terraform / CloudFormation',
      'Kubernetes & Helm',
      'Docker Containerization',
      'CI/CD (GitHub Actions/GitLab CI)',
      'Linux Administration & Bash',
      'Monitoring (Prometheus/Grafana)'
    ],
    niceToHaveSkills: [
      'Python / Go Scripting',
      'GCP / Azure Cloud',
      'DevSecOps Security Scanning',
      'ArgoCD'
    ],
    responsibilities: [
      'Automate cloud infrastructure provisioning using Terraform and AWS.',
      'Maintain 99.99% availability for multi-region EKS Kubernetes clusters.',
      'Implement automated CI/CD pipelines for seamless microservice deployments.',
      'Establish robust disaster recovery, cloud cost optimization, and SOC2 compliance.'
    ]
  }
];
