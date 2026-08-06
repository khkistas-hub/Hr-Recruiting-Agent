# HireMind AI — Recruiting Agent

**Automated Resume Screening, Match Analytics & Interview Intelligence**

HireMind AI is an AI-powered recruiting assistant that helps HR teams streamline the hiring process end-to-end — from posting a job requisition to screening resumes, scoring candidates, and preparing for interviews. It reduces manual screening effort, standardizes how candidates are evaluated, and gives recruiters clear, actionable insights so they can make faster, more confident hiring decisions.

---

## ✨ Key Features

### 📋 Job Requisition Management
- Create new job requisitions with title, department, location, job type, and minimum years of experience.
- Define a job description overview along with **required technical/core skills** and **nice-to-have (bonus) skills**.
- Track open roles on a central dashboard with live counts of open roles, applicants screened, and AI screening accuracy.

### 📤 Resume Upload & Parsing
- Upload candidate resumes via drag-and-drop (supports **PDF, TXT, and DOCX**, with batch upload support).
- Or paste raw resume text directly, along with optional candidate name and email.
- Automatically extracts candidate details: skills, years of experience, education, and certifications.

### 🧠 AI-Powered Resume Screening
- Compares each candidate's resume against the target role's required and bonus skills.
- Produces a **Skill Match %**, an overall **Match Score %**, and a fit classification (e.g., *Good Fit*, *Unqualified*).
- Generates a concise, human-readable candidate summary explaining the evaluation at a glance.

### 🔍 Strengths & Gaps Analysis
- Highlights **Key Strengths** such as core technical skill alignment, experience seniority, verified certifications, and bonus domain qualifications.
- Flags **Identified Gaps** including missing core skill requirements, years-of-experience shortfalls, and academic requirement divergence.

### 📊 Required Skill Alignment Matrix
- Side-by-side matrix showing each required skill (e.g., Python, PyTorch/TensorFlow, LLMs, LangChain/LlamaIndex, Vector Databases, RAG Architectures, Docker & Kubernetes, FastAPI/Flask) and whether each candidate **Matched** or is **Missing** it.

### ⚖️ Candidate Comparison
- Compare two or more candidates side-by-side against the same role.
- View strengths and gaps in parallel to quickly decide who moves forward.

### 🏆 Ranking & Views
- Toggle between **Candidate Cards** (rich profile view with skills, match %, and actions) and a **Ranked Leaderboard** view.
- Sort and shortlist candidates based on overall job fit.

### 🗂️ Recruitment Pipeline Board
- Kanban-style pipeline board with stages such as **New → Screened → Shortlisted** (and beyond).
- Drag candidates through the hiring pipeline as they progress.

### 💬 Interview Question Generation
- Generate role-specific, AI-crafted interview questions tailored to each candidate's profile and the target job.

### 🗃️ Candidate Dossiers
- Access a detailed dossier per candidate consolidating parsed resume data, scores, strengths/gaps, and interview questions in one place.

---

## 🖥️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Architecture:** Component-based SPA with typed data models (`JobDescription`, candidate types, etc.) and a services layer for AI-driven screening logic

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000/`.

---

## 📁 Project Structure (high level)

```
src/
├── components/       # UI components (pipeline board, candidate cards, modals, etc.)
├── data/             # Sample data (sampleJobs.ts, sampleCandidates.ts)
├── services/         # AI screening / matching logic
├── types/            # Shared TypeScript types (JobDescription, Candidate, etc.)
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🎯 Goal

Give recruiters an AI co-pilot that removes repetitive manual resume review, ensures consistent and unbiased candidate evaluation criteria across a role, and surfaces the right insights — match scores, skill gaps, and interview prep — at exactly the point where a hiring decision needs to be made.

---

## 📌 Status

Actively in development — core screening, comparison, and pipeline features are functional; interview intelligence and reporting features are being expanded.
