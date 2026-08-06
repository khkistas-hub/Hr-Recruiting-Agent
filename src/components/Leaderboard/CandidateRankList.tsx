import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Award, CheckSquare, Square, Layers, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { Candidate, MatchAnalysis, JobDescription } from '../../types';

interface CandidateRankListProps {
  candidates: Candidate[];
  analyses: Record<string, MatchAnalysis>;
  job: JobDescription;
  selectedForCompare: string[];
  onToggleCompare: (candidateId: string) => void;
  onOpenCompareModal: () => void;
  onOpenDossier: (candidate: Candidate) => void;
  onOpenInterviewQuestions: (candidate: Candidate) => void;
}

export const CandidateRankList: React.FC<CandidateRankListProps> = ({
  candidates,
  analyses,
  job,
  selectedForCompare,
  onToggleCompare,
  onOpenCompareModal,
  onOpenDossier,
  onOpenInterviewQuestions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'name'>('score');

  // Filter candidates
  const filteredCandidates = candidates.filter((cand) => {
    const analysis = analyses[`${job.id}_${cand.id}`];
    const matchesSearch =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cand.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedTier === 'All') return true;
    if (selectedTier === 'Top Match') return analysis?.tier === 'Top Match';
    if (selectedTier === 'Good Fit') return analysis?.tier === 'Good Fit';
    if (selectedTier === 'Potential Match') return analysis?.tier === 'Potential Match';
    if (selectedTier === 'Unqualified') return analysis?.tier === 'Unqualified';

    return true;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const analysisA = analyses[`${job.id}_${a.id}`]?.overallMatchScore ?? 0;
    const analysisB = analyses[`${job.id}_${b.id}`]?.overallMatchScore ?? 0;

    if (sortBy === 'score') return analysisB - analysisA;
    if (sortBy === 'experience') return b.totalYearsExperience - a.totalYearsExperience;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      {/* Search, Filter & Comparison Trigger Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-xl">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, skill, or title..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Tier Tabs */}
        <div className="flex items-center space-x-1 rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
          {['All', 'Top Match', 'Good Fit', 'Potential Match'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
                selectedTier === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Compare Trigger */}
        {selectedForCompare.length > 0 && (
          <button
            onClick={onOpenCompareModal}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>Compare Selected ({selectedForCompare.length})</span>
          </button>
        )}
      </div>

      {/* Leaderboard Table / Card List */}
      <div className="space-y-3">
        {sortedCandidates.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold">No candidates match your current search or filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or uploading new applicant resumes.</p>
          </div>
        ) : (
          sortedCandidates.map((candidate, rankIdx) => {
            const analysis = analyses[`${job.id}_${candidate.id}`];
            const isSelected = selectedForCompare.includes(candidate.id);
            const score = analysis?.overallMatchScore ?? 70;

            return (
              <div
                key={candidate.id}
                className={`group relative rounded-2xl border bg-slate-900/90 p-4 shadow-lg transition-all hover:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-center space-x-4">
                  {/* Select Checkbox */}
                  <button
                    onClick={() => onToggleCompare(candidate.id)}
                    className="text-slate-500 hover:text-indigo-400"
                    title="Toggle for head-to-head comparison"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-indigo-400 fill-indigo-500/20" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  {/* Leaderboard Rank Badge */}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm border ${
                    rankIdx === 0 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}>
                    #{rankIdx + 1}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {candidate.name}
                      </h4>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        analysis?.tier === 'Top Match'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                      }`}>
                        {analysis?.tier || 'Evaluated'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {candidate.title} • {candidate.totalYearsExperience} yrs experience • {candidate.email}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {candidate.skills.slice(0, 5).map((sk, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-950 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-800"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side Metrics & Actions */}
                <div className="flex items-center justify-between md:justify-end space-x-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  {/* Match Score Display */}
                  <div className="text-center">
                    <div className={`text-xl font-black ${
                      score >= 84 ? 'text-emerald-400' : score >= 70 ? 'text-indigo-400' : 'text-amber-400'
                    }`}>
                      {score}%
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Match Score</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenInterviewQuestions(candidate)}
                      className="flex items-center space-x-1 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Interview Qs</span>
                    </button>

                    <button
                      onClick={() => onOpenDossier(candidate)}
                      className="flex items-center space-x-1 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-all"
                    >
                      <span>Full Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
