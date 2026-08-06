import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { JobDetailView } from './components/JobManager/JobDetailView';
import { JobFormModal } from './components/JobManager/JobFormModal';
import { CandidateCard } from './components/CandidateManager/CandidateCard';
import { ResumeUploader } from './components/CandidateManager/ResumeUploader';
import { CandidateDetailDrawer } from './components/CandidateManager/CandidateDetailDrawer';
import { CandidateRankList } from './components/Leaderboard/CandidateRankList';
import { ComparisonModal } from './components/CandidateManager/ComparisonModal';
import { QuestionGeneratorModal } from './components/Interview/QuestionGeneratorModal';
import { PipelineKanban } from './components/Pipeline/PipelineKanban';

import { JobDescription, Candidate, MatchAnalysis } from './types';
import { storageService } from './services/storageService';
import { aiMatchingService } from './services/aiMatchingService';
import { LayoutGrid, List, Sparkles, Plus, Upload, Filter, Layers } from 'lucide-react';

export function App() {
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [analyses, setAnalyses] = useState<Record<string, MatchAnalysis>>({});

  // View state
  const [activeTab, setActiveTab] = useState<'candidates' | 'pipeline'>('candidates');
  const [viewMode, setViewMode] = useState<'grid' | 'leaderboard'>('grid');

  // Modals state
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [dossierCandidate, setDossierCandidate] = useState<Candidate | null>(null);
  const [questionsCandidate, setQuestionsCandidate] = useState<Candidate | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Initialize data
  useEffect(() => {
    const loadedJobs = storageService.getJobs();
    const loadedCandidates = storageService.getCandidates();
    const loadedAnalyses = storageService.getAnalyses();

    setJobs(loadedJobs);
    setCandidates(loadedCandidates);
    setAnalyses(loadedAnalyses);

    if (loadedJobs.length > 0) {
      setSelectedJobId(loadedJobs[0].id);
    }
  }, []);

  // Run AI analysis for any candidates missing cached analysis for current job
  useEffect(() => {
    if (!selectedJobId) return;

    const currentJob = jobs.find((j) => j.id === selectedJobId);
    if (!currentJob) return;

    const jobCandidates = candidates.filter((c) => c.jobId === selectedJobId);
    let updatedNeeded = false;
    const newAnalyses = { ...analyses };

    const runAnalyses = async () => {
      for (const cand of jobCandidates) {
        const key = `${selectedJobId}_${cand.id}`;
        if (!newAnalyses[key]) {
          const analysisResult = await aiMatchingService.analyzeCandidate(cand, currentJob);
          newAnalyses[key] = analysisResult;
          storageService.saveAnalysis(analysisResult);
          updatedNeeded = true;
        }
      }
      if (updatedNeeded) {
        setAnalyses({ ...newAnalyses });
      }
    };

    runAnalyses();
  }, [selectedJobId, candidates, jobs]);

  // Derived active job and candidate list
  const activeJob = useMemo(() => jobs.find((j) => j.id === selectedJobId), [jobs, selectedJobId]);
  const activeJobCandidates = useMemo(
    () => candidates.filter((c) => c.jobId === selectedJobId),
    [candidates, selectedJobId]
  );

  // Counts by Job
  const candidateCountsByJob = useMemo(() => {
    const counts: Record<string, number> = {};
    candidates.forEach((c) => {
      counts[c.jobId] = (counts[c.jobId] || 0) + 1;
    });
    return counts;
  }, [candidates]);

  // Handlers
  const handleResetData = () => {
    storageService.resetData();
    window.location.reload();
  };

  const handleCreateJob = (newJob: JobDescription) => {
    storageService.addJob(newJob);
    setJobs(storageService.getJobs());
    setSelectedJobId(newJob.id);
  };

  const handleAddCandidates = (newCands: Candidate[]) => {
    newCands.forEach((c) => storageService.addCandidate(c));
    setCandidates(storageService.getCandidates());
  };

  const handleUpdateCandidate = (updated: Candidate) => {
    storageService.updateCandidate(updated);
    setCandidates(storageService.getCandidates());
    if (dossierCandidate && dossierCandidate.id === updated.id) {
      setDossierCandidate(updated);
    }
  };

  const handleToggleCompare = (candidateId: string) => {
    if (selectedForCompare.includes(candidateId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== candidateId));
    } else {
      if (selectedForCompare.length >= 3) {
        alert('You can compare up to 3 candidates side-by-side.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, candidateId]);
    }
  };

  const compareCandidatesList = useMemo(
    () => candidates.filter((c) => selectedForCompare.includes(c.id)),
    [candidates, selectedForCompare]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Header Bar */}
      <Header
        totalJobs={jobs.length}
        totalCandidates={candidates.length}
        onResetData={handleResetData}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          jobs={jobs}
          selectedJobId={selectedJobId}
          onSelectJob={(id) => {
            setSelectedJobId(id);
            setSelectedForCompare([]);
          }}
          onOpenNewJobModal={() => setIsNewJobModalOpen(true)}
          candidateCountsByJob={candidateCountsByJob}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right Content Area */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {activeJob ? (
            <>
              {/* Job Specification Overview Box */}
              <JobDetailView
                job={activeJob}
                candidateCount={activeJobCandidates.length}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
              />

              {/* View Control Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-bold text-white">
                    {activeTab === 'candidates' ? 'Candidate Evaluations & Match Scores' : 'Recruitment Pipeline Board'}
                  </h3>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-indigo-400">
                    {activeJobCandidates.length} Applicants
                  </span>
                </div>

                {activeTab === 'candidates' && (
                  <div className="flex items-center space-x-2">
                    {/* Grid vs Leaderboard Switcher */}
                    <div className="flex items-center space-x-1 rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
                          viewMode === 'grid'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Candidate Cards</span>
                      </button>

                      <button
                        onClick={() => setViewMode('leaderboard')}
                        className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
                          viewMode === 'leaderboard'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <List className="w-3.5 h-3.5" />
                        <span>Ranked Leaderboard</span>
                      </button>
                    </div>

                    {/* Compare Selected Trigger */}
                    {selectedForCompare.length > 0 && (
                      <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:scale-105 transition-all"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Compare ({selectedForCompare.length})</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Candidates Workspace Content */}
              {activeTab === 'pipeline' ? (
                <PipelineKanban
                  candidates={activeJobCandidates}
                  job={activeJob}
                  analyses={analyses}
                  onUpdateStage={(cand, stg) => handleUpdateCandidate({ ...cand, stage: stg })}
                  onOpenDossier={(cand) => setDossierCandidate(cand)}
                />
              ) : viewMode === 'leaderboard' ? (
                <CandidateRankList
                  candidates={activeJobCandidates}
                  analyses={analyses}
                  job={activeJob}
                  selectedForCompare={selectedForCompare}
                  onToggleCompare={handleToggleCompare}
                  onOpenCompareModal={() => setIsCompareModalOpen(true)}
                  onOpenDossier={(cand) => setDossierCandidate(cand)}
                  onOpenInterviewQuestions={(cand) => setQuestionsCandidate(cand)}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {activeJobCandidates.map((cand) => {
                    const analysis = analyses[`${activeJob.id}_${cand.id}`];

                    return (
                      <CandidateCard
                        key={cand.id}
                        candidate={cand}
                        analysis={analysis}
                        isSelectedForCompare={selectedForCompare.includes(cand.id)}
                        onToggleCompare={() => handleToggleCompare(cand.id)}
                        onOpenDossier={() => setDossierCandidate(cand)}
                        onOpenQuestions={() => setQuestionsCandidate(cand)}
                      />
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Sparkles className="w-12 h-12 text-indigo-400 mb-3" />
              <h3 className="text-lg font-bold text-white">No Job Requisition Selected</h3>
              <p className="text-xs text-slate-500 mt-1">Select an open job from the sidebar or create a new job requisition to start.</p>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      {isNewJobModalOpen && (
        <JobFormModal
          onClose={() => setIsNewJobModalOpen(false)}
          onSave={handleCreateJob}
        />
      )}

      {isUploadModalOpen && activeJob && (
        <ResumeUploader
          job={activeJob}
          onClose={() => setIsUploadModalOpen(false)}
          onCandidatesAdded={handleAddCandidates}
        />
      )}

      {dossierCandidate && activeJob && (
        <CandidateDetailDrawer
          candidate={dossierCandidate}
          job={activeJob}
          analysis={analyses[`${activeJob.id}_${dossierCandidate.id}`]}
          onClose={() => setDossierCandidate(null)}
          onUpdateCandidate={handleUpdateCandidate}
          onOpenInterviewQuestions={() => {
            const cand = dossierCandidate;
            setDossierCandidate(null);
            setQuestionsCandidate(cand);
          }}
        />
      )}

      {questionsCandidate && activeJob && (
        <QuestionGeneratorModal
          candidate={questionsCandidate}
          job={activeJob}
          analysis={analyses[`${activeJob.id}_${questionsCandidate.id}`]}
          onClose={() => setQuestionsCandidate(null)}
        />
      )}

      {isCompareModalOpen && activeJob && (
        <ComparisonModal
          candidates={compareCandidatesList}
          analyses={analyses}
          job={activeJob}
          onClose={() => setIsCompareModalOpen(false)}
        />
      )}
    </div>
  );
}
