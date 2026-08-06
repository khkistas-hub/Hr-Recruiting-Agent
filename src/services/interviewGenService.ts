import { Candidate, JobDescription, MatchAnalysis, InterviewQuestion, InterviewScorecard } from '../types';

export const interviewGenService = {
  /**
   * Generates custom interview questions tailored specifically to candidate's skills and identified gaps
   */
  generateQuestions(candidate: Candidate, job: JobDescription, analysis: MatchAnalysis): InterviewQuestion[] {
    const questions: InterviewQuestion[] = [];

    // 1. Gap-Targeted Questions (Crucial feature requested by prompt)
    const missingSkills = analysis.skillMatches.filter((s) => !s.matched && s.type === 'Required').map((s) => s.skill);

    if (missingSkills.length > 0) {
      missingSkills.slice(0, 2).forEach((skill, idx) => {
        questions.push({
          id: `q-gap-${idx}`,
          candidateId: candidate.id,
          jobId: job.id,
          category: 'Gap Probe',
          question: `Your resume does not explicitly highlight experience with ${skill}. Have you worked with ${skill} or similar frameworks in production? Can you share how you'd ramp up?`,
          rationale: `Targeted gap probe to verify competence in required skill (${skill}) missing from resume.`,
          expectedAnswerHighlights: [
            `Demonstrates conceptual knowledge of ${skill}`,
            `Cites related tools or transferable skills`,
            `Clear plan for rapid onboarding`
          ],
          targetSkillOrGap: skill
        });
      });
    }

    if (candidate.totalYearsExperience < job.minYearsExperience) {
      questions.push({
        id: 'q-gap-exp',
        candidateId: candidate.id,
        jobId: job.id,
        category: 'Gap Probe',
        question: `This role targets ${job.minYearsExperience}+ years of experience, whereas your background shows ${candidate.totalYearsExperience} years. How have you tackled high-complexity projects early in your career?`,
        rationale: 'Probe for depth of maturity and high velocity execution despite fewer total calendar years.',
        expectedAnswerHighlights: [
          'Highlights accelerated learning curve',
          'Provides specific examples of complex ownership',
          'Demonstrates strong problem-solving initiative'
        ],
        targetSkillOrGap: 'Years of Experience'
      });
    }

    // 2. Technical Deep-Dive Questions
    const topSkills = candidate.skills.slice(0, 3);
    questions.push({
      id: 'q-tech-1',
      candidateId: candidate.id,
      jobId: job.id,
      category: 'Technical Deep-Dive',
      question: `Can you walk us through the architectural design of a critical system you built using ${topSkills[0] || 'your core stack'}? What performance or scalability trade-offs did you make?`,
      rationale: `Evaluates technical mastery and architectural decision making in ${topSkills[0] || 'core stack'}.`,
      expectedAnswerHighlights: [
        'Articulates systemic system architecture clearly',
        'Explains trade-offs (e.g. latency vs consistency, modularity)',
        'Mentions monitoring and error handling'
      ]
    });

    if (topSkills[1]) {
      questions.push({
        id: 'q-tech-2',
        candidateId: candidate.id,
        jobId: job.id,
        category: 'Technical Deep-Dive',
        question: `How do you approach debugging complex, hard-to-reproduce state or performance issues when working with ${topSkills[1]} in a production environment?`,
        rationale: `Assesses troubleshooting methodology and technical depth in ${topSkills[1]}.`,
        expectedAnswerHighlights: [
          'Structured root cause investigation steps',
          'Use of profiling tools and logging telemetry',
          'Preventative measures and testing strategy'
        ]
      });
    }

    // 3. Behavioral & Leadership Questions
    questions.push({
      id: 'q-beh-1',
      candidateId: candidate.id,
      jobId: job.id,
      category: 'Behavioral & Leadership',
      question: `Describe a scenario where requirements for a project changed dramatically mid-sprint or tight deadline. How did you realign with team members and deliver?`,
      rationale: 'Measures adaptability, cross-functional collaboration, and grace under deadline pressure.',
      expectedAnswerHighlights: [
        'STAR method structure (Situation, Task, Action, Result)',
        'Proactive communication with stakeholders',
        'Pragmatic compromise on scope vs quality'
      ]
    });

    // 4. Role Responsibility Verification
    const mainResp = job.responsibilities[0] || 'delivering high-impact project milestones';
    questions.push({
      id: 'q-exp-1',
      candidateId: candidate.id,
      jobId: job.id,
      category: 'Experience Verification',
      question: `A key responsibility in this role involves ${mainResp.toLowerCase()}. Tell us about a past initiative where you drove a similar outcome.`,
      rationale: 'Direct alignment check against the primary job responsibility.',
      expectedAnswerHighlights: [
        'Concrete metric-driven results',
        'Clear ownership of execution',
        'Key lessons learned and impact'
      ]
    });

    return questions;
  },

  /**
   * Creates an empty scorecard template for live interviewer note-taking
   */
  createScorecardTemplate(candidate: Candidate, job: JobDescription, questions: InterviewQuestion[]): InterviewScorecard {
    return {
      id: 'sc-' + Date.now(),
      candidateId: candidate.id,
      jobId: job.id,
      interviewerName: 'HR Recruiter',
      date: new Date().toISOString().split('T')[0],
      overallRating: 4,
      recommendation: 'Hire',
      questions: questions.map((q) => ({ ...q, score: 4, interviewerNotes: '' })),
      generalFeedback: ''
    };
  }
};
