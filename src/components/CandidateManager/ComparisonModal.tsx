import React from 'react';
import { X, Trophy, CheckCircle2, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import { Candidate, MatchAnalysis, JobDescription } from '../../types';

interface ComparisonModalProps {
  candidates: Candidate[];
  analyses: Record<string, MatchAnalysis>;
  job: JobDescription;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ candidates, analyses, job, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Side-by-Side Candidate Comparison</h3>
              <p className="text-xs text-slate-400">Target Requisition: <span className="text-indigo-400 font-semibold">{job.title}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Matrix Grid */}
        <div className="p-6 space-y-6 overflow-x-auto">
          {/* Header Row of Candidates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((cand) => {
              const analysis = analyses[`${job.id}_${cand.id}`];
              const score = analysis?.overallMatchScore ?? 70;

              return (
                <div key={cand.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3 relative overflow-hidden">
                  {/* Winner Ribbon if Highest Score */}
                  {score >= 85 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-indigo-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md flex items-center space-x-1">
                      <Trophy className="w-3 h-3" />
                      <span>Top Candidate</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">{cand.name}</h4>
                    <p className="text-xs text-slate-400">{cand.title}</p>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-2xl font-black text-emerald-400">{score}%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Match Score</div>
                    </div>
                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                      {analysis?.tier || 'Evaluated'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 pt-1">
                    <div><span className="text-slate-400">Total Experience:</span> <span className="font-bold">{cand.totalYearsExperience} Years</span></div>
                    <div><span className="text-slate-400">Recommendation:</span> <span className="font-semibold text-indigo-300">{analysis?.recommendation}</span></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Required Skill Matrix Comparison */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Skill Alignment Matrix</h4>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 divide-y divide-slate-800/80 overflow-hidden text-xs">
              {job.requiredSkills.map((sk) => (
                <div key={sk} className="grid grid-cols-4 p-3.5 items-center">
                  <div className="font-bold text-slate-200">{sk}</div>
                  {candidates.map((cand) => {
                    const hasSkill = cand.skills.some((s) => s.toLowerCase() === sk.toLowerCase()) || cand.rawResumeText.toLowerCase().includes(sk.toLowerCase());
                    return (
                      <div key={cand.id} className="flex items-center space-x-1.5">
                        {hasSkill ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-emerald-300 font-semibold">Matched</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-rose-400 shrink-0" />
                            <span className="text-rose-400">Missing</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths vs Gaps Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((cand) => {
              const analysis = analyses[`${job.id}_${cand.id}`];

              return (
                <div key={cand.id} className="space-y-3">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2">
                    <h5 className="text-xs font-bold text-emerald-400">Key Strengths</h5>
                    <ul className="space-y-1.5 text-xs">
                      {analysis?.strengths.map((str) => (
                        <li key={str.id} className="text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-emerald-500/10">
                          • {str.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 space-y-2">
                    <h5 className="text-xs font-bold text-amber-400">Identified Gaps</h5>
                    <ul className="space-y-1.5 text-xs">
                      {analysis?.gaps.map((gap) => (
                        <li key={gap.id} className="text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-amber-500/10">
                          • {gap.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 px-6 py-4 bg-slate-950/60">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
