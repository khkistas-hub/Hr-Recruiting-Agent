import { JobDescription, Candidate, MatchAnalysis, InterviewScorecard } from '../types';
import { SAMPLE_JOBS } from '../data/sampleJobs';
import { SAMPLE_CANDIDATES } from '../data/sampleCandidates';

const KEYS = {
  JOBS: 'hiremind_jobs_v1',
  CANDIDATES: 'hiremind_candidates_v1',
  ANALYSES: 'hiremind_analyses_v1',
  SCORECARDS: 'hiremind_scorecards_v1',
  API_KEY: 'hiremind_gemini_api_key'
};

export const storageService = {
  // Jobs
  getJobs(): JobDescription[] {
    const data = localStorage.getItem(KEYS.JOBS);
    if (!data) {
      this.saveJobs(SAMPLE_JOBS);
      return SAMPLE_JOBS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return SAMPLE_JOBS;
    }
  },

  saveJobs(jobs: JobDescription[]): void {
    localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
  },

  addJob(job: JobDescription): void {
    const jobs = this.getJobs();
    jobs.unshift(job);
    this.saveJobs(jobs);
  },

  // Candidates
  getCandidates(): Candidate[] {
    const data = localStorage.getItem(KEYS.CANDIDATES);
    if (!data) {
      this.saveCandidates(SAMPLE_CANDIDATES);
      return SAMPLE_CANDIDATES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return SAMPLE_CANDIDATES;
    }
  },

  saveCandidates(candidates: Candidate[]): void {
    localStorage.setItem(KEYS.CANDIDATES, JSON.stringify(candidates));
  },

  addCandidate(candidate: Candidate): void {
    const candidates = this.getCandidates();
    candidates.unshift(candidate);
    this.saveCandidates(candidates);
  },

  updateCandidate(updated: Candidate): void {
    const candidates = this.getCandidates();
    const idx = candidates.findIndex((c) => c.id === updated.id);
    if (idx !== -1) {
      candidates[idx] = updated;
      this.saveCandidates(candidates);
    }
  },

  deleteCandidate(id: string): void {
    const candidates = this.getCandidates().filter((c) => c.id !== id);
    this.saveCandidates(candidates);
  },

  // Analyses Cache
  getAnalyses(): Record<string, MatchAnalysis> {
    const data = localStorage.getItem(KEYS.ANALYSES);
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  },

  saveAnalysis(analysis: MatchAnalysis): void {
    const analyses = this.getAnalyses();
    const key = `${analysis.jobId}_${analysis.candidateId}`;
    analyses[key] = analysis;
    localStorage.setItem(KEYS.ANALYSES, JSON.stringify(analyses));
  },

  // Interview Scorecards
  getScorecards(): Record<string, InterviewScorecard> {
    const data = localStorage.getItem(KEYS.SCORECARDS);
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  },

  saveScorecard(scorecard: InterviewScorecard): void {
    const cards = this.getScorecards();
    cards[scorecard.candidateId] = scorecard;
    localStorage.setItem(KEYS.SCORECARDS, JSON.stringify(cards));
  },

  // API Key
  getApiKey(): string {
    return localStorage.getItem(KEYS.API_KEY) || '';
  },

  saveApiKey(key: string): void {
    localStorage.setItem(KEYS.API_KEY, key.trim());
  },

  // Reset to default
  resetData(): void {
    localStorage.removeItem(KEYS.JOBS);
    localStorage.removeItem(KEYS.CANDIDATES);
    localStorage.removeItem(KEYS.ANALYSES);
    localStorage.removeItem(KEYS.SCORECARDS);
  }
};
