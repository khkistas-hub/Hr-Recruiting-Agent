import { Candidate } from '../types';

export const SAMPLE_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    jobId: 'job-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@techmail.io',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA',
    title: 'Senior Frontend Engineer',
    summary: 'Lead Frontend Developer with 7 years of hands-on experience building high-performance web applications in React, TypeScript, and Redux. Passionate about component design systems, state management, and web performance optimization.',
    totalYearsExperience: 7,
    skills: [
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'Zustand',
      'Redux Toolkit',
      'REST APIs',
      'GraphQL',
      'Jest',
      'React Testing Library',
      'Next.js',
      'Design Systems'
    ],
    experience: [
      {
        company: 'Veloce Software',
        role: 'Staff Frontend Engineer',
        duration: '2022 - Present (3 yrs)',
        highlights: [
          'Architected reusable React/TypeScript UI component library used across 12 product lines.',
          'Reduced core application bundle size by 42% and boosted Web Vitals score from 68 to 96.',
          'Mentored 6 frontend engineers and established automated E2E testing workflows.'
        ]
      },
      {
        company: 'Pulse Digital',
        role: 'Senior React Developer',
        duration: '2019 - 2022 (3 yrs)',
        highlights: [
          'Developed real-time analytics dashboard with React, TypeScript, and WebSockets.',
          'Migrated legacy jQuery codebase to React SPA with modular CSS Modules.'
        ]
      }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2019'
      }
    ],
    certifications: ['AWS Certified Cloud Practitioner', 'Meta Front-End Developer Professional'],
    rawResumeText: `ELENA ROSTOVA
San Francisco, CA | elena.rostova@techmail.io | +1 (555) 234-8901

SUMMARY
Lead Frontend Developer with 7 years of hands-on experience building high-performance web applications in React, TypeScript, and Redux. Passionate about component design systems, state management, and web performance optimization.

SKILLS
React, TypeScript, JavaScript (ES6+), Tailwind CSS, Zustand, Redux Toolkit, REST APIs, GraphQL, Jest, React Testing Library, Next.js, Design Systems.

WORK EXPERIENCE
Staff Frontend Engineer | Veloce Software (2022 - Present)
- Architected reusable React/TypeScript UI component library used across 12 product lines.
- Reduced core application bundle size by 42% and boosted Web Vitals score from 68 to 96.
- Mentored 6 frontend engineers and established automated E2E testing workflows.

Senior React Developer | Pulse Digital (2019 - 2022)
- Developed real-time analytics dashboard with React, TypeScript, and WebSockets.
- Migrated legacy jQuery codebase to React SPA with modular CSS Modules.

EDUCATION
BS in Computer Science | UC Berkeley (2019)`,
    stage: 'Shortlisted',
    appliedDate: '2026-07-28',
    rating: 5,
    notes: [
      {
        id: 'note-1',
        author: 'Sarah Chen (Recruiter)',
        text: 'Outstanding resume matching 95% of required tech stack. Great tenure at Veloce Software.',
        createdAt: '2026-07-29'
      }
    ]
  },
  {
    id: 'cand-2',
    jobId: 'job-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@devstudio.net',
    phone: '+1 (555) 876-5432',
    location: 'Oakland, CA',
    title: 'Frontend Web Developer',
    summary: 'Creative frontend developer with 3.5 years of experience building responsive websites using HTML, CSS, JavaScript, and Vue.js. Learning React and TypeScript.',
    totalYearsExperience: 3.5,
    skills: [
      'JavaScript',
      'HTML5/CSS3',
      'Vue.js',
      'Bootstrap',
      'Sass',
      'Git',
      'REST APIs'
    ],
    experience: [
      {
        company: 'Creative Pixel Agency',
        role: 'Frontend Developer',
        duration: '2023 - Present (2 yrs)',
        highlights: [
          'Built responsive landing pages and client portals using HTML, Sass, and Vue.js.',
          'Integrated WordPress CMS REST APIs into client web applications.'
        ]
      }
    ],
    education: [
      {
        institution: 'San Francisco State University',
        degree: 'Bachelor of Arts',
        field: 'Web Design & Interactive Media',
        year: '2022'
      }
    ],
    certifications: ['Responsive Web Design Certification (freeCodeCamp)'],
    rawResumeText: `MARCUS VANCE
Oakland, CA | marcus.vance@devstudio.net

SUMMARY
Creative frontend developer with 3.5 years of experience building responsive websites using HTML, CSS, JavaScript, and Vue.js. Learning React and TypeScript.

SKILLS
JavaScript, HTML5/CSS3, Vue.js, Bootstrap, Sass, Git, REST APIs.

EXPERIENCE
Frontend Developer | Creative Pixel Agency (2023 - Present)
- Built responsive landing pages and client portals using HTML, Sass, and Vue.js.

EDUCATION
BA in Web Design | SFSU (2022)`,
    stage: 'Screened',
    appliedDate: '2026-08-01',
    rating: 3,
    notes: []
  },
  {
    id: 'cand-3',
    jobId: 'job-2',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@ai-labs.org',
    phone: '+1 (555) 345-6789',
    location: 'Seattle, WA',
    title: 'Senior AI Research Engineer',
    summary: 'AI Research Engineer with a Ph.D. in Machine Learning and 6 years of experience designing RAG pipelines, fine-tuning LLMs, and building production PyTorch pipelines.',
    totalYearsExperience: 6,
    skills: [
      'Python',
      'PyTorch',
      'Large Language Models (LLMs)',
      'LangChain',
      'LlamaIndex',
      'Pinecone',
      'Weaviate',
      'RAG Architectures',
      'Docker',
      'Kubernetes',
      'FastAPI',
      'Model Fine-Tuning (PEFT/LoRA)',
      'AWS SageMaker'
    ],
    experience: [
      {
        company: 'Cognitive Dynamics Labs',
        role: 'Lead ML Engineer',
        duration: '2022 - Present (4 yrs)',
        highlights: [
          'Built enterprise RAG engine serving 5M daily queries with Pinecone and LLaMA-3 models.',
          'Reduced LLM latency by 45% using vLLM quantization and custom CUDA operators.',
          'Published 3 papers on parameter-efficient fine-tuning (PEFT).'
        ]
      }
    ],
    education: [
      {
        institution: 'University of Washington',
        degree: 'Ph.D.',
        field: 'Computer Science (Machine Learning)',
        year: '2020'
      }
    ],
    certifications: ['AWS Certified Machine Learning - Specialty'],
    rawResumeText: `DR. ARIS THORNE
Seattle, WA | aris.thorne@ai-labs.org

SUMMARY
AI Research Engineer with a Ph.D. in Machine Learning and 6 years of experience designing RAG pipelines, fine-tuning LLMs, and building production PyTorch pipelines.

SKILLS
Python, PyTorch, Large Language Models (LLMs), LangChain, LlamaIndex, Pinecone, Weaviate, RAG Architectures, Docker, Kubernetes, FastAPI, Model Fine-Tuning (PEFT/LoRA), AWS SageMaker.

EXPERIENCE
Lead ML Engineer | Cognitive Dynamics Labs (2022 - Present)
- Built enterprise RAG engine serving 5M daily queries with Pinecone and LLaMA-3 models.
- Reduced LLM latency by 45% using vLLM quantization.

EDUCATION
Ph.D. in CS | Univ of Washington (2020)`,
    stage: 'Interview Scheduled',
    appliedDate: '2026-07-22',
    rating: 5,
    notes: [
      {
        id: 'note-2',
        author: 'Dave Miller (Hiring Manager)',
        text: 'Exceptional AI profile. Top tier PhD candidate with strong production deployment experience.',
        createdAt: '2026-07-24'
      }
    ]
  },
  {
    id: 'cand-4',
    jobId: 'job-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@datatech.co',
    phone: '+1 (555) 901-2345',
    location: 'Austin, TX',
    title: 'Data Analyst & ML Specialist',
    summary: 'Data analyst with 3 years of experience in SQL, Python data analysis (Pandas, Scikit-learn), and Tableau reporting. Eager to transition into LLM engineering.',
    totalYearsExperience: 3,
    skills: [
      'Python',
      'SQL',
      'Pandas / NumPy',
      'Scikit-learn',
      'Tableau',
      'FastAPI',
      'Docker'
    ],
    experience: [
      {
        company: 'DataStream Analytics',
        role: 'Senior Data Analyst',
        duration: '2023 - Present (2 yrs)',
        highlights: [
          'Constructed predictive churn models using Python Scikit-learn.',
          'Maintained PostgreSQL data pipelines and executive Tableau dashboards.'
        ]
      }
    ],
    education: [
      {
        institution: 'University of Texas at Austin',
        degree: 'Bachelor of Science',
        field: 'Statistics & Data Science',
        year: '2023'
      }
    ],
    certifications: ['Google Data Analytics Professional Certificate'],
    rawResumeText: `PRIYA SHARMA
Austin, TX | priya.sharma@datatech.co

SUMMARY
Data analyst with 3 years of experience in SQL, Python data analysis (Pandas, Scikit-learn), and Tableau reporting. Eager to transition into LLM engineering.

SKILLS
Python, SQL, Pandas / NumPy, Scikit-learn, Tableau, FastAPI, Docker.

EXPERIENCE
Senior Data Analyst | DataStream Analytics (2023 - Present)
- Constructed predictive churn models using Python Scikit-learn.`,
    stage: 'New',
    appliedDate: '2026-08-02',
    rating: 2,
    notes: []
  },
  {
    id: 'cand-5',
    jobId: 'job-3',
    name: 'Jonathan Sterling',
    email: 'jonathan.sterling@saasexec.com',
    phone: '+1 (555) 432-1098',
    location: 'New York, NY',
    title: 'Senior Product Manager',
    summary: 'Product leader with 8 years of enterprise SaaS experience leading cross-functional teams to build multi-million dollar ARR products. Proven track record in roadmap prioritization, customer discovery, and user metrics.',
    totalYearsExperience: 8,
    skills: [
      'Product Strategy & Roadmap',
      'User Research & Discovery',
      'Agile / Scrum Methodology',
      'Data Analytics (Mixpanel/Amplitude)',
      'SaaS Business Metrics (ARR/CAC/LTV)',
      'Wireframing (Figma)',
      'Cross-Functional Leadership',
      'SQL',
      'Jira / Confluence'
    ],
    experience: [
      {
        company: 'CloudScale SaaS',
        role: 'Principal Product Manager',
        duration: '2021 - Present (4 yrs)',
        highlights: [
          'Spearheaded enterprise analytics suite growth from $4M to $18M ARR in 24 months.',
          'Conducted over 120 customer interview sessions to define product roadmap priorities.',
          'Led 3 cross-functional scrum pods comprising 18 engineers and designers.'
        ]
      }
    ],
    education: [
      {
        institution: 'Columbia University',
        degree: 'Master of Business Administration (MBA)',
        field: 'Technology Management',
        year: '2018'
      },
      {
        institution: 'NYU Stern',
        degree: 'Bachelor of Science',
        field: 'Finance & Marketing',
        year: '2016'
      }
    ],
    certifications: ['Certified Scrum Product Owner (CSPO)', 'Pragmatic Institute Certified (PMC-III)'],
    rawResumeText: `JONATHAN STERLING
New York, NY | jonathan.sterling@saasexec.com

SUMMARY
Product leader with 8 years of enterprise SaaS experience leading cross-functional teams to build multi-million dollar ARR products.

SKILLS
Product Strategy & Roadmap, User Research & Discovery, Agile / Scrum, Mixpanel, Amplitude, SaaS Metrics (ARR/CAC/LTV), Figma, Cross-Functional Leadership, SQL, Jira.

EXPERIENCE
Principal Product Manager | CloudScale SaaS (2021 - Present)
- Spearheaded enterprise analytics suite growth from $4M to $18M ARR.
- Conducted over 120 customer interview sessions.

EDUCATION
MBA | Columbia University (2018)`,
    stage: 'Offer Extended',
    appliedDate: '2026-07-18',
    rating: 5,
    notes: [
      {
        id: 'note-3',
        author: 'VP of Product',
        text: 'Fantastic commercial background and proven SaaS growth metrics. Offer extended!',
        createdAt: '2026-08-01'
      }
    ]
  },
  {
    id: 'cand-6',
    jobId: 'job-4',
    name: 'Vikram Kulkarni',
    email: 'vikram.kulkarni@cloudops.io',
    phone: '+1 (555) 654-3210',
    location: 'Austin, TX',
    title: 'Lead DevOps & Cloud Engineer',
    summary: 'DevOps Architect with 6.5 years specializing in AWS cloud infrastructure, Kubernetes orchestration, Terraform automation, and secure CI/CD pipelines.',
    totalYearsExperience: 6.5,
    skills: [
      'AWS (EC2, EKS, S3, IAM)',
      'Terraform',
      'Kubernetes & Helm',
      'Docker Containerization',
      'CI/CD (GitHub Actions)',
      'Linux Administration',
      'Prometheus / Grafana',
      'Python',
      'ArgoCD'
    ],
    experience: [
      {
        company: 'InfraScale Systems',
        role: 'Senior DevOps Architect',
        duration: '2021 - Present (4 yrs)',
        highlights: [
          'Managed 30+ AWS production accounts across multi-region EKS clusters.',
          'Wrote 10,000+ lines of modular Terraform code achieving zero infrastructure drift.',
          'Reduced cloud infrastructure annual spend by $240,000 using AWS spot instances and automated scaling.'
        ]
      }
    ],
    education: [
      {
        institution: 'University of Texas at Dallas',
        degree: 'Bachelor of Science',
        field: 'Computer Engineering',
        year: '2019'
      }
    ],
    certifications: ['AWS Certified Solutions Architect - Professional', 'Certified Kubernetes Administrator (CKA)'],
    rawResumeText: `VIKRAM KULKARNI
Austin, TX | vikram.kulkarni@cloudops.io

SUMMARY
DevOps Architect with 6.5 years specializing in AWS cloud infrastructure, Kubernetes orchestration, Terraform automation, and secure CI/CD pipelines.

SKILLS
AWS (EC2, EKS, S3, IAM), Terraform, Kubernetes & Helm, Docker, GitHub Actions, Linux, Prometheus, Grafana, Python, ArgoCD.

EXPERIENCE
Senior DevOps Architect | InfraScale Systems (2021 - Present)
- Managed 30+ AWS production accounts across multi-region EKS clusters.
- Wrote 10,000+ lines of modular Terraform code achieving zero infrastructure drift.
- Reduced cloud infrastructure annual spend by $240,000.

CERTIFICATIONS
AWS Solutions Architect Professional | CKA`,
    stage: 'Shortlisted',
    appliedDate: '2026-07-30',
    rating: 5,
    notes: []
  }
];
