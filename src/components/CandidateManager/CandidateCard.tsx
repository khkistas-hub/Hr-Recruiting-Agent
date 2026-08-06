import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, MessageSquare, ChevronRight, CheckSquare, Square, FileText } from 'lucide-react';
import { Candidate, MatchAnalysis } from '../../types';

interface CandidateCardProps {
  candidate: Candidate;
  analysis?: MatchAnalysis;
  isSelectedForCompare: boolean;
  onToggleCompare: () => void;
  onOpenDossier: () => void;
  onOpenQuestions: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  analysis,
  isSelectedForCompare,
  onToggleCompare,
  onOpenDossier,
  onOpenQuestions
}) => {
  const score = analysis?.overallMatchScore ?? 75;
  const tier = analysis?.tier ?? 'Good Fit';

  // Tier Styling Helper
  const getTierBadge = () => {
    switch (tier) {
      case 'Top Match':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Good Fit':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Potential Match':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  const getScoreColor = () => {
    if (score >= 84) return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
    if (score >= 70) return 'text-indigo-400 border-indigo-500/50 bg-indigo-950/40';
    if (score >= 52) return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/50 bg-rose-950/40';
  };

  return (
    <div className={`group relative rounded-2xl border bg-slate-900/90 p-5 shadow-xl transition-all hover:border-slate-700 hover:shadow-2xl flex flex-col justify-between space-y-4 ${
      isSelectedForCompare ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-slate-800'
    }`}>
      {/* Top Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare();
            }}
            className="mt-1 text-slate-500 hover:text-indigo-400 transition-colors"
            title="Select for Head-to-Head Comparison"
          >
            {isSelectedForCompare ? (
              <CheckSquare className="w-5 h-5 text-indigo-400 fill-indigo-500/20" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {candidate.name}
              </h3>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getTierBadge()}`}>
                {tier}
              </span>
            </div>
            <p className="text-xs text-slate-400">{candidate.title} • {candidate.totalYearsExperience} yrs exp</p>
          </div>
        </div>

        {/* Circular Match Score Badge */}
        <div className={`flex flex-col items-center justify-center h-14 w-14 rounded-2xl border shadow-inner ${getScoreColor()}`}>
          <span className="text-lg font-black tracking-tight leading-none">{score}%</span>
          <span className="text-[9px] uppercase tracking-wider font-bold opacity-80 mt-0.5">Match</span>
        </div>
      </div>

      {/* AI Summary Teaser */}
      {analysis?.executiveSummary && (
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          {analysis.executiveSummary}
        </p>
      )}

      {/* Top Matched Skills & Identified Gaps Preview */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px]">
          <span>Skill Match ({analysis?.skillMatchPercentage ?? 75}%)</span>
          <span className="text-slate-500">{candidate.skills.length} extracted skills</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, 4).map((sk, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700"
            >
              {sk}
            </span>
          ))}
          {candidate.skills.length > 4 && (
            <span className="rounded-lg bg-slate-950 px-2 py-0.5 text-[11px] text-slate-500 border border-slate-800">
              +{candidate.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Critical Gap Alert pill if present */}
        {analysis?.gaps && analysis.gaps.length > 0 && (
          <div className="flex items-center space-x-1.5 text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{analysis.gaps[0].title}</span>
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
          {candidate.stage}
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenQuestions}
            className="flex items-center space-x-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
            title="Generate Interview Questions"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interview Qs</span>
          </button>

          <button
            onClick={onOpenDossier}
            className="flex items-center space-x-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-all"
          >
            <span>Dossier</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
