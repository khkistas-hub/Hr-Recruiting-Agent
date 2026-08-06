import { Candidate, JobDescription, MatchAnalysis, SkillMatch, GapItem, StrengthItem } from '../types';
import { storageService } from './storageService';

export const aiMatchingService = {
  /**
   * Main candidate analysis function (dual heuristic + optional Gemini live AI call)
   */
  async analyzeCandidate(candidate: Candidate, job: JobDescription): Promise<MatchAnalysis> {
    const apiKey = storageService.getApiKey();

    // If user provided a Gemini API Key, try live Gemini API call, falling back gracefully
    if (apiKey) {
      try {
        const geminiResult = await this.analyzeWithGemini(candidate, job, apiKey);
        if (geminiResult) return geminiResult;
      } catch (err) {
        console.warn('Gemini API call failed or timed out. Falling back to local NLP matching engine:', err);
      }
    }

    // High-precision local heuristic NLP matching engine
    return this.analyzeWithLocalEngine(candidate, job);
  },

  /**
   * Built-in intelligent local matching algorithm
   */
  analyzeWithLocalEngine(candidate: Candidate, job: JobDescription): MatchAnalysis {
    const candidateSkillsLower = new Set(candidate.skills.map((s) => s.toLowerCase()));
    const resumeTextLower = candidate.rawResumeText.toLowerCase();

    // 1. Skill Matching
    const skillMatches: SkillMatch[] = [];
    let matchedRequiredCount = 0;

    job.requiredSkills.forEach((reqSkill) => {
      const skLower = reqSkill.toLowerCase();
      const isMatched = candidateSkillsLower.has(skLower) || resumeTextLower.includes(skLower);
      if (isMatched) matchedRequiredCount++;
      skillMatches.push({
        skill: reqSkill,
        matched: isMatched,
        type: 'Required'
      });
    });

    let matchedNiceCount = 0;
    job.niceToHaveSkills.forEach((niceSkill) => {
      const skLower = niceSkill.toLowerCase();
      const isMatched = candidateSkillsLower.has(skLower) || resumeTextLower.includes(skLower);
      if (isMatched) matchedNiceCount++;
      skillMatches.push({
        skill: niceSkill,
        matched: isMatched,
        type: 'Nice to Have'
      });
    });

    const requiredSkillPercentage = job.requiredSkills.length > 0
      ? (matchedRequiredCount / job.requiredSkills.length) * 100
      : 100;
    
    const niceSkillPercentage = job.niceToHaveSkills.length > 0
      ? (matchedNiceCount / job.niceToHaveSkills.length) * 100
      : 100;

    const skillMatchPercentage = Math.round((requiredSkillPercentage * 0.8) + (niceSkillPercentage * 0.2));

    // 2. Experience Fit Score
    const targetYears = job.minYearsExperience;
    const candYears = candidate.totalYearsExperience;
    let experienceScore = 100;
    if (candYears < targetYears) {
      const diff = targetYears - candYears;
      experienceScore = Math.max(20, Math.round(100 - diff * 22));
    } else if (candYears > targetYears + 7) {
      experienceScore = 95; // slightly overqualified but great
    }

    // 3. Education & Certification Fit
    let educationScore = 80;
    const reqEduLower = job.education.toLowerCase();
    const candEduText = candidate.education.map((e) => `${e.degree} ${e.field} ${e.institution}`).join(' ').toLowerCase();

    if (reqEduLower.includes('ph.d') || reqEduLower.includes('master')) {
      if (candEduText.includes('ph.d') || candEduText.includes('doctorate')) {
        educationScore = 100;
      } else if (candEduText.includes('master') || candEduText.includes('mba') || candEduText.includes('ms')) {
        educationScore = 90;
      } else {
        educationScore = 65;
      }
    } else if (candEduText.includes('bachelor') || candEduText.includes('bs') || candEduText.includes('degree')) {
      educationScore = 95;
    }

    if (candidate.certifications.length > 0) {
      educationScore = Math.min(100, educationScore + 10);
    }

    // 4. Overall Match Score Calculation
    const overallMatchScore = Math.round(
      skillMatchPercentage * 0.55 + experienceScore * 0.30 + educationScore * 0.15
    );

    // 5. Match Tier
    let tier: MatchAnalysis['tier'] = 'Potential Match';
    let recommendation: MatchAnalysis['recommendation'] = 'Hold for Secondary Review';

    if (overallMatchScore >= 84) {
      tier = 'Top Match';
      recommendation = 'Proceed to Interview';
    } else if (overallMatchScore >= 70) {
      tier = 'Good Fit';
      recommendation = 'Proceed to Interview';
    } else if (overallMatchScore >= 52) {
      tier = 'Potential Match';
      recommendation = 'Hold for Secondary Review';
    } else {
      tier = 'Unqualified';
      recommendation = 'Reject Candidate';
    }

    // 6. Strengths Identification
    const strengths: StrengthItem[] = [];
    if (matchedRequiredCount > 0) {
      const topMatched = skillMatches.filter((s) => s.matched && s.type === 'Required').map((s) => s.skill).slice(0, 4);
      strengths.push({
        id: 'str-1',
        category: 'Key Expertise',
        title: 'Core Technical Skill Alignment',
        description: `Candidate possesses critical required technologies: ${topMatched.join(', ')}.`
      });
    }

    if (candYears >= targetYears) {
      strengths.push({
        id: 'str-2',
        category: 'Experience Fit',
        title: 'Strong Experience Seniority',
        description: `${candYears} years of industry experience meets/exceeds the required ${targetYears} years threshold.`
      });
    }

    if (candidate.certifications.length > 0) {
      strengths.push({
        id: 'str-3',
        category: 'Certification Bonus',
        title: 'Verified Professional Certifications',
        description: `Holds recognized credentials: ${candidate.certifications.join(', ')}.`
      });
    }

    if (matchedNiceCount > 0) {
      const niceMatched = skillMatches.filter((s) => s.matched && s.type === 'Nice to Have').map((s) => s.skill);
      strengths.push({
        id: 'str-4',
        category: 'Domain Mastery',
        title: 'Bonus Domain Qualifications',
        description: `Possesses nice-to-have capabilities: ${niceMatched.join(', ')}.`
      });
    }

    // 7. Gaps & Risk Analysis
    const gaps: GapItem[] = [];
    const missingRequired = skillMatches.filter((s) => !s.matched && s.type === 'Required').map((s) => s.skill);

    if (missingRequired.length > 0) {
      gaps.push({
        id: 'gap-1',
        category: 'Missing Tech Skill',
        title: `Missing ${missingRequired.length} Core Skill Requirements`,
        description: `Resume lacks evidence of: ${missingRequired.join(', ')}.`,
        severity: missingRequired.length >= 3 ? 'Critical' : 'Moderate',
        recommendedVerification: `Ask technical deep-dive questions during round 1 interview regarding practical experience with ${missingRequired[0]}.`
      });
    }

    if (candYears < targetYears) {
      const gapYears = targetYears - candYears;
      gaps.push({
        id: 'gap-2',
        category: 'Experience Shortfall',
        title: `Years of Experience Shortfall (${candYears} yrs vs ${targetYears} yrs required)`,
        description: `Candidate has ${gapYears} fewer years of documented experience than requested for the ${job.experienceLevel} level.`,
        severity: gapYears >= 2 ? 'Critical' : 'Moderate',
        recommendedVerification: 'Evaluate depth of past project achievements and velocity during screening call.'
      });
    }

    if (educationScore < 80) {
      gaps.push({
        id: 'gap-3',
        category: 'Education Deficit',
        title: 'Academic Requirement Divergence',
        description: `Job specifies ${job.education}, whereas candidate resume lists ${candidate.education.map((e) => e.degree).join(', ') || 'unspecified degree'}.`,
        severity: 'Minor',
        recommendedVerification: 'Verify equivalent practical experience or bootcamps.'
      });
    }

    // 8. Executive AI Summary
    const executiveSummary = `${candidate.name} is classified as a ${tier} (${overallMatchScore}% Match Score) for ${job.title}. Demonstrates ${skillMatchPercentage}% alignment with required skills with ${candYears} years of experience. ${
      missingRequired.length > 0
        ? `Primary area for interviewer evaluation is missing hands-on background in ${missingRequired.slice(0, 2).join(' & ')}.`
        : `Strong candidate alignment across core technical competencies and background.`
    }`;

    return {
      candidateId: candidate.id,
      jobId: job.id,
      overallMatchScore,
      skillMatchPercentage,
      experienceScore,
      educationScore,
      tier,
      executiveSummary,
      skillMatches,
      strengths,
      gaps,
      analyzedAt: new Date().toISOString(),
      recommendation
    };
  },

  /**
   * Live Gemini 1.5/2.5 Flash Integration Call
   */
  async analyzeWithGemini(candidate: Candidate, job: JobDescription, apiKey: string): Promise<MatchAnalysis | null> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are an expert HR Talent Acquisition AI Agent evaluating a candidate resume against a job description.

JOB TITLE: ${job.title}
JOB DESCRIPTION: ${job.description}
REQUIRED SKILLS: ${job.requiredSkills.join(', ')}
MIN YEARS EXP REQUIRED: ${job.minYearsExperience}

CANDIDATE NAME: ${candidate.name}
CANDIDATE YEARS EXP: ${candidate.totalYearsExperience}
CANDIDATE SKILLS: ${candidate.skills.join(', ')}
RAW RESUME TEXT:
${candidate.rawResumeText.slice(0, 2500)}

Perform an exhaustive evaluation and return ONLY raw JSON matching this structure:
{
  "overallMatchScore": number (0-100),
  "skillMatchPercentage": number (0-100),
  "experienceScore": number (0-100),
  "educationScore": number (0-100),
  "tier": "Top Match" | "Good Fit" | "Potential Match" | "Unqualified",
  "executiveSummary": "string",
  "recommendation": "Proceed to Interview" | "Hold for Secondary Review" | "Reject Candidate",
  "strengths": [
    { "id": "str-1", "category": "Key Expertise", "title": "string", "description": "string" }
  ],
  "gaps": [
    { "id": "gap-1", "category": "Missing Tech Skill" | "Experience Shortfall" | "Education Deficit" | "Risk Flag", "title": "string", "description": "string", "severity": "Critical" | "Moderate" | "Minor", "recommendedVerification": "string" }
  ]
}
`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
      })
    });

    if (!response.ok) return null;

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) return null;

    const parsed = JSON.parse(responseText);

    const localAnalysis = this.analyzeWithLocalEngine(candidate, job);

    return {
      candidateId: candidate.id,
      jobId: job.id,
      overallMatchScore: parsed.overallMatchScore ?? localAnalysis.overallMatchScore,
      skillMatchPercentage: parsed.skillMatchPercentage ?? localAnalysis.skillMatchPercentage,
      experienceScore: parsed.experienceScore ?? localAnalysis.experienceScore,
      educationScore: parsed.educationScore ?? localAnalysis.educationScore,
      tier: parsed.tier ?? localAnalysis.tier,
      executiveSummary: parsed.executiveSummary || localAnalysis.executiveSummary,
      skillMatches: localAnalysis.skillMatches,
      strengths: parsed.strengths || localAnalysis.strengths,
      gaps: parsed.gaps || localAnalysis.gaps,
      analyzedAt: new Date().toISOString(),
      recommendation: parsed.recommendation || localAnalysis.recommendation
    };
  }
};
