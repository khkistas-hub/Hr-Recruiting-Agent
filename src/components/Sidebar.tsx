import React from 'react';
import { Plus, Briefcase, MapPin, Layers, Users, Sparkles } from 'lucide-react';
import { JobDescription } from '../types';

interface SidebarProps {
  jobs: JobDescription[];
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  onOpenNewJobModal: () => void;
  candidateCountsByJob: Record<string, number>;
  activeTab: 'candidates' | 'pipeline';
  setActiveTab: (tab: 'candidates' | 'pipeline') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  jobs,
  selectedJobId,
  onSelectJob,
  onOpenNewJobModal,
  candidateCountsByJob,
  activeTab,
  setActiveTab
}) => {
  return (
    <aside className="w-full md:w-80 shrink-0 border-r border-slate-800 bg-slate-900/60 p-5 space-y-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Navigation Mode Tabs */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex items-center justify-center space-x-2 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'candidates'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Screening & Rank</span>
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center justify-center space-x-2 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pipeline Board</span>
          </button>
        </div>

        {/* Job Requisitions Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300 font-bold text-sm">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Open Requisitions</span>
          </div>
          <button
            onClick={onOpenNewJobModal}
            className="flex items-center space-x-1 rounded-lg bg-indigo-600/20 px-2.5 py-1 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Role</span>
          </button>
        </div>

        {/* Job List */}
        <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {jobs.map((job) => {
            const isSelected = job.id === selectedJobId;
            const applicantCount = candidateCountsByJob[job.id] || 0;

            return (
              <div
                key={job.id}
                onClick={() => onSelectJob(job.id)}
                className={`group relative rounded-xl border p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-gradient-to-r from-indigo-950/80 to-slate-900 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className={`text-xs font-bold leading-snug line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {job.title}
                  </h4>
                  <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    {applicantCount} candidates
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-indigo-400 font-medium">{job.department}</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span className="truncate max-w-[100px]">{job.location}</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <span>{job.experienceLevel}</span>
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 border border-slate-800">{job.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar AI Agent Summary Banner */}
      <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-slate-950 p-3.5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autonomous AI Screener</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Select any open requisition to instantly analyze resumes, view strengths & gaps, and generate customized interview questions.
        </p>
      </div>
    </aside>
  );
};
