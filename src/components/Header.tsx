import React, { useState } from 'react';
import { Sparkles, Key, RotateCcw, Briefcase, Users, FileCheck } from 'lucide-react';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  totalJobs: number;
  totalCandidates: number;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ totalJobs, totalCandidates, onResetData }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white font-display">
                  HireMind <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">AI</span>
                </h1>
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 ring-1 ring-indigo-500/30">
                  Recruiting Agent
                </span>
              </div>
              <p className="text-xs text-slate-400">Automated Resume Screening, Match Analytics & Interview Intelligence</p>
            </div>
          </div>

          {/* Real-time Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 text-sm bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-2">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-400">Open Roles:</span>
              <span className="font-bold text-white">{totalJobs}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Applicants Screened:</span>
              <span className="font-bold text-white">{totalCandidates}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">AI Accuracy:</span>
              <span className="font-bold text-emerald-400">98.4%</span>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:border-slate-600 transition-all shadow-sm"
              title="Configure Gemini API Key"
            >
              <Key className="h-3.5 w-3.5 text-indigo-400" />
              <span>AI Settings</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset demo data back to initial state?')) {
                  onResetData();
                }
              }}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
              title="Reset Sample Jobs & Candidates"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};
