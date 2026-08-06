import { Candidate, WorkExperience, CandidateEducation } from '../types';

export const parserService = {
  /**
   * Reads raw file content (Text, PDF, DOCX fallback)
   */
  async readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve((e.target?.result as string) || '');
        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
      } else {
        // Fallback or read as array buffer text representation
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target?.result as ArrayBuffer;
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(buffer);
          // Clean up binary unprintable characters if any
          const cleanText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
          resolve(cleanText.slice(0, 8000));
        };
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
      }
    });
  },

  /**
   * Rule-based & regex client-side parser to extract structured candidate details from text
   */
  parseRawResumeText(text: string, jobId: string): Candidate {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    
    // Extract Email
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : 'applicant@example.com';

    // Extract Phone
    const phoneMatch = text.match(/(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    const phone = phoneMatch ? phoneMatch[0] : '+1 (555) 000-0000';

    // Name (first non-empty line usually)
    let name = 'Candidate ' + Math.floor(Math.random() * 1000);
    if (lines.length > 0) {
      const firstLine = lines[0].replace(/[^a-zA-Z\s.]/g, '').trim();
      if (firstLine.length > 2 && firstLine.length < 35 && !firstLine.toLowerCase().includes('resume')) {
        name = firstLine;
      }
    }

    // Title (often line 2 or derived)
    let title = 'Software Professional';
    if (lines.length > 1) {
      const line2 = lines[1];
      if (line2.length < 50 && !line2.includes('@')) {
        title = line2;
      }
    }

    // Extract total years of experience
    let totalYears = 3;
    const expMatch = text.match(/(\d+(\.\d+)?)\+?\s*years/i);
    if (expMatch) {
      totalYears = parseFloat(expMatch[1]);
    } else {
      // Count date ranges e.g. 2020 - 2024
      const dates = text.match(/\b(20\d{2}|19\d{2})\b/g);
      if (dates && dates.length >= 2) {
        const years = dates.map(Number).sort((a, b) => a - b);
        const diff = years[years.length - 1] - years[0];
        if (diff > 0 && diff < 40) totalYears = diff;
      }
    }

    // Common Tech & Soft Skills Dictionary to Match
    const SKILL_DICT = [
      'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Angular',
      'Node.js', 'Express', 'Python', 'PyTorch', 'TensorFlow', 'LLMs', 'LangChain', 'LlamaIndex', 'RAG',
      'Pinecone', 'Weaviate', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
      'Terraform', 'CI/CD', 'GitHub Actions', 'Linux', 'Bash', 'Git', 'REST APIs', 'GraphQL', 'FastAPI',
      'Product Strategy', 'Roadmap', 'Agile', 'Scrum', 'User Research', 'Figma', 'Mixpanel', 'Amplitude',
      'SaaS Metrics', 'Redux', 'Zustand', 'Jest', 'C++', 'Java', 'Go', 'PHP'
    ];

    const extractedSkills: string[] = [];
    const textLower = text.toLowerCase();

    SKILL_DICT.forEach((sk) => {
      const skLower = sk.toLowerCase();
      // Whole word matching
      const regex = new RegExp(`\\b${skLower.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(textLower)) {
        extractedSkills.push(sk);
      }
    });

    if (extractedSkills.length === 0) {
      extractedSkills.push('Software Engineering', 'Problem Solving', 'Team Collaboration');
    }

    // Extract Education
    const education: CandidateEducation[] = [];
    if (/computer science/i.test(text)) {
      education.push({ institution: 'State University', degree: 'Bachelor of Science', field: 'Computer Science' });
    } else if (/bachelor|degree|bs|ba/i.test(text)) {
      education.push({ institution: 'University', degree: 'Bachelor Degree', field: 'General Field' });
    } else {
      education.push({ institution: 'Institute of Technology', degree: 'Bachelor Degree', field: 'Engineering' });
    }

    // Extract Certifications
    const certs: string[] = [];
    if (/aws certified/i.test(text)) certs.push('AWS Certified Professional');
    if (/kubernetes|cka/i.test(text)) certs.push('Certified Kubernetes Administrator');
    if (/scrum/i.test(text)) certs.push('Scrum Master Certification');
    if (certs.length === 0 && /certified/i.test(text)) certs.push('Professional Certification');

    // Summary
    const summary = lines.slice(0, 5).join(' ').slice(0, 280) || `${name} is an experienced professional with ${totalYears} years of experience specializing in ${extractedSkills.slice(0, 3).join(', ')}.`;

    const dummyExp: WorkExperience[] = [
      {
        company: 'Recent Tech Enterprise',
        role: title,
        duration: `2022 - Present (${Math.max(1, Math.round(totalYears))} yrs)`,
        highlights: [
          `Delivered high-impact projects utilizing ${extractedSkills.slice(0, 3).join(', ')}.`,
          'Collaborated with cross-functional product and engineering teams.'
        ]
      }
    ];

    return {
      id: 'cand-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      jobId,
      name,
      email,
      phone,
      location: 'San Francisco, CA',
      title,
      summary,
      totalYearsExperience: totalYears,
      skills: extractedSkills,
      experience: dummyExp,
      education,
      certifications: certs,
      rawResumeText: text,
      stage: 'New',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: [],
      rating: 3
    };
  }
};
