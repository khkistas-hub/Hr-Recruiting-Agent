import React from 'react';
import { Candidate, PipelineStage, JobDescription, MatchAnalysis } from '../../types';
import { ChevronRight, ChevronLeft, Star, MessageSquare } from 'lucide-react';

interface PipelineKanbanProps {
  candidates: Candidate[];
  job: JobDescription;
  analyses: Record<string, MatchAnalysis>;
  onUpdateStage: (candidate: Candidate, newStage: PipelineStage) => void;
  onOpenDossier: (candidate: Candidate) => void;
}

const STAGES: PipelineStage[] = [
  'New',
  'Screened',
  'Shortlisted',
  'Interview Scheduled',
  'Offer Extended',
  'Hired',
  'Rejected'
];

export const PipelineKanban: React.FC<PipelineKanbanProps> = ({
  candidates,
  job,
  analyses,
  onUpdateStage,
  onOpenDossier
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
      {STAGES.map((stage) => {
        const stageCandidates = candidates.filter((c) => c.stage === stage);

        return (
          <div key={stage} className="w-80 shrink-0 flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
            {/* Column Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  stage === 'Offer Extended' || stage === 'Hired'
                    ? 'bg-emerald-400'
                    : stage === 'Rejected'
                    ? 'bg-rose-400'
                    : 'bg-indigo-400'
                }`} />
                <h4 className="text-xs font-bold text-white">{stage}</h4>
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                {stageCandidates.length}
              </span>
            </div>

            {/* Candidate List in Column */}
            <div className="space-y-3 min-h-[400px]">
              {stageCandidates.length === 0 ? (
                <div className="h-32 flex items-center justify-center rounded-xl border border-dashed border-slate-800/80 text-[11px] text-slate-500 italic">
                  No applicants in {stage}
                </div>
              ) : (
                stageCandidates.map((candidate) => {
                  const analysis = analyses[`${job.id}_${candidate.id}`];
                  const score = analysis?.overallMatchScore ?? 70;

                  return (
                    <div
                      key={candidate.id}
                      onClick={() => onOpenDossier(candidate)}
                      className="group rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 shadow-md hover:border-indigo-500/50 hover:shadow-xl transition-all cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {candidate.name}
                          </h5>
                          <p className="text-[11px] text-slate-400 truncate max-w-[170px]">{candidate.title}</p>
                        </div>
                        <span className={`text-xs font-black px-2 py-0.5 rounded-lg border ${
                          score >= 84
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        }`}>
                          {score}%
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 3).map((sk, i) => (
                          <span key={i} className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-slate-300 border border-slate-800">
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Stage Advancement Quick Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]" onClick={(e) => e.stopPropagation()}>
                        <button
                          disabled={STAGES.indexOf(stage) === 0}
                          onClick={() => {
                            const prevStage = STAGES[STAGES.indexOf(stage) - 1];
                            if (prevStage) onUpdateStage(candidate, prevStage);
                          }}
                          className="p-1 text-slate-500 hover:text-slate-200 disabled:opacity-30"
                          title="Move Back"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-slate-400">{candidate.totalYearsExperience} yrs exp</span>

                        <button
                          disabled={STAGES.indexOf(stage) === STAGES.length - 1}
                          onClick={() => {
                            const nextStage = STAGES[STAGES.indexOf(stage) + 1];
                            if (nextStage) onUpdateStage(candidate, nextStage);
                          }}
                          className="p-1 text-slate-500 hover:text-indigo-400 disabled:opacity-30"
                          title="Advance Stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
