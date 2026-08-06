import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Sparkles, CheckCircle2, Star, Printer, Copy, HelpCircle, ShieldAlert } from 'lucide-react';
import { Candidate, JobDescription, MatchAnalysis, InterviewQuestion, InterviewScorecard } from '../../types';
import { interviewGenService } from '../../services/interviewGenService';

interface QuestionGeneratorModalProps {
  candidate: Candidate;
  job: JobDescription;
  analysis?: MatchAnalysis;
  onClose: () => void;
  onSaveScorecard?: (scorecard: InterviewScorecard) => void;
}

export const QuestionGeneratorModal: React.FC<QuestionGeneratorModalProps> = ({
  candidate,
  job,
  analysis,
  onClose,
  onSaveScorecard
}) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Gap Probe' | 'Technical Deep-Dive' | 'Behavioral & Leadership'>('All');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (analysis) {
      const generated = interviewGenService.generateQuestions(candidate, job, analysis);
      setQuestions(generated);
    }
  }, [candidate, job, analysis]);

  const handleScoreChange = (qId: string, score: number) => {
    setQuestions(questions.map((q) => (q.id === qId ? { ...q, score } : q)));
  };

  const handleNotesChange = (qId: string, notes: string) => {
    setQuestions(questions.map((q) => (q.id === qId ? { ...q, interviewerNotes: notes } : q)));
  };

  const handleCopyQuestions = () => {
    const text = questions
      .map(
        (q, idx) =>
          `${idx + 1}. [${q.category}] ${q.question}\nRationale: ${q.rationale}\nExpected Highlights: ${q.expectedAnswerHighlights.join(', ')}\n`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredQuestions = questions.filter((q) => (activeTab === 'All' ? true : q.category === activeTab));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Role-Specific & Gap-Targeted Interview Generator</h3>
              <p className="text-xs text-slate-400">Candidate: <span className="text-indigo-400 font-semibold">{candidate.name}</span> for {job.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyQuestions}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Sheet'}</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 space-x-1 text-xs">
          {['All', 'Gap Probe', 'Technical Deep-Dive', 'Behavioral & Leadership'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat as any)}
              className={`py-3 px-3.5 font-semibold border-b-2 transition-all ${
                activeTab === cat ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions Body */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 space-y-3 transition-all ${
                q.category === 'Gap Probe'
                  ? 'border-amber-500/30 bg-amber-500/5'
                  : 'border-slate-800 bg-slate-950/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    q.category === 'Gap Probe'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {q.category}
                  </span>
                  {q.targetSkillOrGap && (
                    <span className="text-xs text-slate-400 font-medium">
                      Target: <span className="text-amber-300 font-bold">{q.targetSkillOrGap}</span>
                    </span>
                  )}
                </div>

                {/* Rating score 1-5 */}
                <div className="flex items-center space-x-1 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold mr-1">Score:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => handleScoreChange(q.id, star)}
                      className={`w-3.5 h-3.5 cursor-pointer transition-colors ${
                        star <= (q.score || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Main Question Text */}
              <h4 className="text-sm font-bold text-white leading-relaxed">
                Q{idx + 1}: {q.question}
              </h4>

              {/* Rationale & Expected Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-semibold text-indigo-300 flex items-center space-x-1 text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    <span>AI Interviewer Rationale</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{q.rationale}</p>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center space-x-1 text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Expected Answer Highlights</span>
                  </div>
                  <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                    {q.expectedAnswerHighlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interviewer Live Notes Input */}
              <div className="pt-2">
                <input
                  type="text"
                  value={q.interviewerNotes || ''}
                  onChange={(e) => handleNotesChange(q.id, e.target.value)}
                  placeholder="Record live candidate answer notes or observations during call..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 px-6 py-4 bg-slate-950/60">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            Save & Complete Interview Prep
          </button>
        </div>
      </div>
    </div>
  );
};
