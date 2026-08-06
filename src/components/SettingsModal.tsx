import React, { useState } from 'react';
import { X, Key, CheckCircle, ShieldAlert, Cpu, ExternalLink } from 'lucide-react';
import { storageService } from '../services/storageService';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState(storageService.getApiKey());
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSave = () => {
    storageService.saveApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleTestConnection = async () => {
    if (!apiKey) {
      setTestResult({ success: false, message: 'Please enter a Gemini API Key first.' });
      return;
    }
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: 'Respond with "OK"' }] }] })
        }
      );
      if (res.ok) {
        setTestResult({ success: true, message: 'Successfully connected to Google Gemini API!' });
      } else {
        const data = await res.json();
        setTestResult({
          success: false,
          message: data.error?.message || 'API key error. Please verify key permissions.'
        });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Network error connecting to Gemini API.' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Engine Settings</h3>
              <p className="text-xs text-slate-400">Configure Live Google Gemini API Integration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-indigo-300">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Dual Intelligence Engine Active</span>
            </div>
            <p className="leading-relaxed">
              HireMind AI functions out-of-the-box using a high-precision local NLP semantic engine. Adding a Google Gemini API key enables deep generative AI resume evaluation, custom interview questions, and real-time LLM candidate synthesis.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Key stored locally in browser session</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-indigo-400 hover:underline"
              >
                <span>Get API key from Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {testResult && (
            <div
              className={`rounded-xl p-3.5 text-xs flex items-start space-x-2.5 border ${
                testResult.success
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/60">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50"
          >
            {testing ? 'Testing Connection...' : 'Test Connection'}
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save API Key</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
