import React, { useState } from 'react';
import { X, Briefcase, Plus, Trash2 } from 'lucide-react';
import { JobDescription } from '../../types';

interface JobFormModalProps {
  onClose: () => void;
  onSave: (job: JobDescription) => void;
}

export const JobFormModal: React.FC<JobFormModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [type, setType] = useState<JobDescription['type']>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('Senior (5+ Years)');
  const [minYearsExperience, setMinYearsExperience] = useState(5);
  const [salaryRange, setSalaryRange] = useState('$140,000 - $175,000');
  const [education, setEducation] = useState("Bachelor's Degree in CS or equivalent");
  const [description, setDescription] = useState('');
  
  const [requiredSkills, setRequiredSkills] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);
  const [newReqSkill, setNewReqSkill] = useState('');

  const [niceToHaveSkills, setNiceToHaveSkills] = useState<string[]>(['Next.js', 'Docker']);
  const [newNiceSkill, setNewNiceSkill] = useState('');

  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Design and build high-performance web interfaces',
    'Collaborate with product managers and UI designers'
  ]);
  const [newResp, setNewResp] = useState('');

  const handleAddReqSkill = () => {
    if (newReqSkill.trim()) {
      setRequiredSkills([...requiredSkills, newReqSkill.trim()]);
      setNewReqSkill('');
    }
  };

  const handleRemoveReqSkill = (index: number) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index));
  };

  const handleAddNiceSkill = () => {
    if (newNiceSkill.trim()) {
      setNiceToHaveSkills([...niceToHaveSkills, newNiceSkill.trim()]);
      setNewNiceSkill('');
    }
  };

  const handleRemoveNiceSkill = (index: number) => {
    setNiceToHaveSkills(niceToHaveSkills.filter((_, i) => i !== index));
  };

  const handleAddResp = () => {
    if (newResp.trim()) {
      setResponsibilities([...responsibilities, newResp.trim()]);
      setNewResp('');
    }
  };

  const handleRemoveResp = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out the Job Title and Description.');
      return;
    }

    const newJob: JobDescription = {
      id: 'job-' + Date.now(),
      title: title.trim(),
      department,
      location,
      type,
      experienceLevel,
      minYearsExperience: Number(minYearsExperience),
      salaryRange,
      education,
      description: description.trim(),
      requiredSkills,
      niceToHaveSkills,
      responsibilities,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    onSave(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create New Job Requisition</h3>
              <p className="text-xs text-slate-400">Define requirements & skills for automated resume screening</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form id="jobForm" onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="AI & Research">AI & Research</option>
                <option value="Product">Product</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Design">Design</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Min Experience (Years)</label>
              <input
                type="number"
                min={0}
                max={20}
                value={minYearsExperience}
                onChange={(e) => setMinYearsExperience(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description Overview *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role mission, expectations, and core work environment..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Required Skills Section */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Required Technical & Core Skills</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newReqSkill}
                onChange={(e) => setNewReqSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddReqSkill())}
                placeholder="e.g. Python, PyTorch, GraphQL..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddReqSkill}
                className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {requiredSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="flex items-center space-x-1.5 rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/20"
                >
                  <span>{sk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveReqSkill(idx)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Nice to Have Skills */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Nice-to-Have Skills (Bonus Points)</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newNiceSkill}
                onChange={(e) => setNewNiceSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNiceSkill())}
                placeholder="e.g. AWS, Kubernetes..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddNiceSkill}
                className="rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                Add Bonus
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {niceToHaveSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="flex items-center space-x-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700"
                >
                  <span>{sk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveNiceSkill(idx)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 border-t border-slate-800 px-6 py-4 bg-slate-950/60">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white">
            Cancel
          </button>
          <button
            type="submit"
            form="jobForm"
            className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
          >
            <Plus className="w-4 h-4" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>
    </div>
  );
};
