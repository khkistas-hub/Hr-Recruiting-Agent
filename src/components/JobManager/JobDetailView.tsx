import React from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, Upload, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { JobDescription } from '../../types';

interface JobDetailViewProps {
  job: JobDescription;
  candidateCount: number;
  onOpenUploadModal: () => void;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({ job, candidateCount, onOpenUploadModal }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-5">
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              {job.department}
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              {job.status} Requisition
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">{job.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>{job.type} ({job.experienceLevel})</span>
            </div>
            {job.salaryRange && (
              <div className="flex items-center space-x-1 text-emerald-400 font-medium">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{job.salaryRange}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Posted {job.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Upload Action */}
        <button
          onClick={onOpenUploadModal}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition-all hover:scale-[1.02]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Screen Resumes</span>
        </button>
      </div>

      {/* Overview */}
      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
        {job.description}
      </p>

      {/* Required & Nice-to-Have Skills Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-xs text-indigo-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Required Skillset ({job.requiredSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.requiredSkills.map((sk, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-200 border border-indigo-500/30"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-xs text-slate-300">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Nice-to-Have Bonus Skills ({job.niceToHaveSkills.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.niceToHaveSkills.map((sk, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
