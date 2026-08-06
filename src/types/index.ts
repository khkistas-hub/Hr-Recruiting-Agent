export type PipelineStage = 'New' | 'Screened' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Extended' | 'Hired' | 'Rejected';

export interface JobRequirement {
  id: string;
  category: 'Required Skill' | 'Nice to Have' | 'Experience' | 'Education' | 'Certification';
  title: string;
  weight: 'High' | 'Medium' | 'Low';
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experienceLevel: string;
  minYearsExperience: number;
  salaryRange?: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  education: string;
  responsibilities: string[];
  createdAt: string;
  status: 'Active' | 'Draft' | 'Closed';
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface CandidateEducation {
  institution: string;
  degree: string;
  field: string;
  year?: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  totalYearsExperience: number;
  skills: string[];
  experience: WorkExperience[];
  education: CandidateEducation[];
  certifications: string[];
  rawResumeText: string;
  stage: PipelineStage;
  appliedDate: string;
  notes: CandidateNote[];
  rating?: number; // 1-5 HR rating
}

export interface CandidateNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface SkillMatch {
  skill: string;
  matched: boolean;
  type: 'Required' | 'Nice to Have';
  level?: string;
}

export interface GapItem {
  id: string;
  category: 'Missing Tech Skill' | 'Experience Shortfall' | 'Education Deficit' | 'Missing Certification' | 'Risk Flag';
  title: string;
  description: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  recommendedVerification: string;
}

export interface StrengthItem {
  id: string;
  category: 'Key Expertise' | 'Experience Fit' | 'Certification Bonus' | 'Domain Mastery';
  title: string;
  description: string;
}

export interface MatchAnalysis {
  candidateId: string;
  jobId: string;
  overallMatchScore: number; // 0 - 100
  skillMatchPercentage: number; // 0 - 100
  experienceScore: number; // 0 - 100
  educationScore: number; // 0 - 100
  tier: 'Top Match' | 'Good Fit' | 'Potential Match' | 'Unqualified';
  executiveSummary: string;
  skillMatches: SkillMatch[];
  strengths: StrengthItem[];
  gaps: GapItem[];
  analyzedAt: string;
  recommendation: 'Proceed to Interview' | 'Hold for Secondary Review' | 'Reject Candidate';
}

export interface InterviewQuestion {
  id: string;
  candidateId: string;
  jobId: string;
  category: 'Technical Deep-Dive' | 'Behavioral & Leadership' | 'Gap Probe' | 'Experience Verification';
  question: string;
  rationale: string;
  expectedAnswerHighlights: string[];
  targetSkillOrGap?: string;
  score?: number; // 1-5
  interviewerNotes?: string;
}

export interface InterviewScorecard {
  id: string;
  candidateId: string;
  jobId: string;
  interviewerName: string;
  date: string;
  overallRating: number; // 1 - 5
  recommendation: 'Strong Hire' | 'Hire' | 'Weak Hire' | 'Do Not Hire';
  questions: InterviewQuestion[];
  generalFeedback: string;
}
