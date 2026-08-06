import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, Star, ShieldCheck, Briefcase, GraduationCap, Award, MessageSquare, Send, Calendar, MapPin, User, FileText, ChevronRight } from 'lucide-react';
import { Candidate, MatchAnalysis, PipelineStage, JobDescription } from '../../types';

interface CandidateDetailDrawerProps {
  candidate: Candidate;
  job: JobDescription;
  analysis?: MatchAnalysis;
  onClose: () => void;
  onUpdateCandidate: (updated: Candidate) => void;
  onOpenInterviewQuestions: () => void;
}

export const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  candidate,
  job,
  analysis,
  onClose,
  onUpdateCandidate,
  onOpenInterviewQuestions
}) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [stage, setStage] = useState<PipelineStage>(candidate.stage);
  const [rating, setRating] = useState<number>(candidate.rating || 4);

  const handleStageChange = (newStage: PipelineStage) => {
    setStage(newStage);
    onUpdateCandidate({ ...candidate, stage: newStage });
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onUpdateCandidate({ ...candidate, rating: newRating });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: 'note-' + Date.now(),
      author: 'HR Recruiter',
      text: newNoteText.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = {
      ...candidate,
      notes: [newNote, ...candidate.notes]
    };

    onUpdateCandidate(updated);
    setNewNoteText('');
  };

  const STAGES: PipelineStage[] = [
    'New',
    'Screened',
    'Shortlisted',
    'Interview Scheduled',
    'Offer Extended',
    'Hired',
    'Rejected'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center font-black text-lg text-white shadow-lg shadow-indigo-500/20">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
                  {candidate.location}
                </span>
              </div>
              <p className="text-xs text-slate-400">{candidate.title} • {candidate.email} • {candidate.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenInterviewQuestions}
              className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Interview Qs</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Pipeline Stage Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Recruitment Pipeline Stage</label>
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((stg) => (
                <button
                  key={stg}
                  onClick={() => handleStageChange(stg)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    stage === stg
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {stg}
                </button>
              ))}
            </div>
          </div>

          {/* AI Match Overview Metrics */}
          {analysis && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Match Score Breakdown</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-slate-400 font-semibold mr-1">Recruiter Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                  <div className="text-2xl font-black text-emerald-400">{analysis.overallMatchScore}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Overall Fit</div>
                </div>
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3 text-center">
                  <div className="text-2xl font-black text-indigo-400">{analysis.skillMatchPercentage}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Skill Fit</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
                  <div className="text-2xl font-black text-amber-400">{analysis.experienceScore}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Exp Score</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-center">
                  <div className="text-2xl font-black text-slate-200">{analysis.educationScore}%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Edu Score</div>
                </div>
              </div>

              {/* Executive Summary Banner */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                  <span>Executive Recommendation: {analysis.recommendation}</span>
                  <span className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] text-white">{analysis.tier}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{analysis.executiveSummary}</p>
              </div>
            </div>
          )}

          {/* Strengths & Gaps Side-by-Side */}
          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Identified Strengths & Qualifications ({analysis.strengths.length})</span>
                </div>
                <div className="space-y-2">
                  {analysis.strengths.map((str) => (
                    <div key={str.id} className="rounded-lg bg-slate-950/60 p-2.5 border border-emerald-500/20 text-xs">
                      <div className="font-bold text-slate-200">{str.title}</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{str.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gaps */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Identified Gaps & Risks ({analysis.gaps.length})</span>
                </div>
                <div className="space-y-2">
                  {analysis.gaps.map((gap) => (
                    <div key={gap.id} className="rounded-lg bg-slate-950/60 p-2.5 border border-amber-500/20 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{gap.title}</span>
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          gap.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {gap.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{gap.description}</p>
                      <div className="text-[10px] text-indigo-300 pt-1 border-t border-slate-800">
                        <span className="font-semibold">Verification: </span>{gap.recommendedVerification}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Extracted Skills Matrix */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Extracted Skills Matrix</h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map((sk, idx) => {
                const isRequiredMatched = job.requiredSkills.some((r) => r.toLowerCase() === sk.toLowerCase());
                return (
                  <span
                    key={idx}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${
                      isRequiredMatched
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {sk}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Work Experience History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Work History</h4>
            <div className="space-y-3">
              {candidate.experience.map((exp, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-sm">{exp.role}</h5>
                    <span className="text-indigo-400 font-semibold">{exp.duration}</span>
                  </div>
                  <p className="text-slate-400 font-medium">{exp.company}</p>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 pt-1 text-[11px]">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Education</h4>
              {candidate.education.map((edu, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs">
                  <div className="font-bold text-white">{edu.degree} - {edu.field}</div>
                  <div className="text-slate-400">{edu.institution} {edu.year && `(${edu.year})`}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Certifications</h4>
              {candidate.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {candidate.certifications.map((c, idx) => (
                    <span key={idx} className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300 border border-indigo-500/20">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No formal certifications listed.</p>
              )}
            </div>
          </div>

          {/* HR Notes & Evaluation Log */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Internal HR Notes</h4>
            
            <form onSubmit={handleAddNote} className="flex items-center space-x-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add internal interviewer feedback or screening note..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Add Note
              </button>
            </form>

            <div className="space-y-2">
              {candidate.notes.map((note) => (
                <div key={note.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="font-semibold text-indigo-300">{note.author}</span>
                    <span>{note.createdAt}</span>
                  </div>
                  <p className="text-slate-200">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
