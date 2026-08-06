import React, { useState } from 'react';
import { X, Upload, FileText, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Candidate, JobDescription } from '../../types';
import { parserService } from '../../services/parserService';

interface ResumeUploaderProps {
  job: JobDescription;
  onClose: () => void;
  onCandidatesAdded: (candidates: Candidate[]) => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ job, onClose, onCandidatesAdded }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setProcessing(true);
    setStatusMessage(`Parsing and analyzing ${files.length} candidate resume(s)...`);

    const newCandidates: Candidate[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const text = await parserService.readFileContent(file);
        const candidate = parserService.parseRawResumeText(text, job.id);
        // Override with filename if name was generic
        if (candidate.name.startsWith('Candidate ')) {
          candidate.name = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        }
        newCandidates.push(candidate);
      }

      onCandidatesAdded(newCandidates);
      setStatusMessage(`Successfully processed ${newCandidates.length} resume(s)!`);
      setTimeout(() => {
        setProcessing(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Error parsing file:', err);
      setStatusMessage('Error parsing file. Please try pasting raw text instead.');
      setProcessing(false);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteText.trim()) return;

    setProcessing(true);
    setStatusMessage('Parsing resume text & running AI screening engine...');

    const candidate = parserService.parseRawResumeText(pasteText, job.id);
    if (candidateName.trim()) candidate.name = candidateName.trim();
    if (candidateEmail.trim()) candidate.email = candidateEmail.trim();

    setTimeout(() => {
      onCandidatesAdded([candidate]);
      setProcessing(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload & Screen Candidate Resumes</h3>
              <p className="text-xs text-slate-400">Target Role: <span className="text-indigo-400 font-semibold">{job.title}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
              activeTab === 'upload'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document Files (.pdf, .txt, .docx)</span>
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center space-x-2 border-b-2 py-3 px-4 text-xs font-semibold transition-all ${
              activeTab === 'paste'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Resume Text</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {processing ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              <p className="text-sm font-semibold text-white">{statusMessage}</p>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Extracting skills, computing fit score, identifying strengths & gaps...</span>
              </div>
            </div>
          ) : activeTab === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileUpload(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-500/10 ring-4 ring-indigo-500/20'
                  : 'border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950/80'
              }`}
              onClick={() => {
                const el = document.getElementById('fileInput') as HTMLInputElement;
                if (el) el.click();
              }}
            >
              <input
                id="fileInput"
                type="file"
                multiple
                accept=".pdf,.txt,.docx,.doc"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 mb-3 ring-1 ring-indigo-500/20">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Drag and drop candidate resumes here</h4>
              <p className="text-xs text-slate-400 mb-4 max-w-sm">
                Supports PDF, Plain Text (.txt), and Word documents. Batch uploads supported.
              </p>
              <button className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500">
                Browse Files
              </button>
            </div>
          ) : (
            <form onSubmit={handlePasteSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Candidate Name (Optional)</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="alex.m@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Paste Resume Text *</label>
                <textarea
                  rows={6}
                  required
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Paste full raw text of resume including work experience, skills, education..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Parse & Evaluate Candidate</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
