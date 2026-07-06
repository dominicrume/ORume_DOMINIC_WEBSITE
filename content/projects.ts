/**
 * Engineering portfolio. Every project is a real, public GitHub repository —
 * assessors and clients can inspect the code. Descriptions are drawn from each
 * repo's own README. github.com/dominicrume (25+ public repos).
 */

export const githubUrl = 'https://github.com/dominicrume';

export type Project = {
  title: string;
  desc: string;
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: 'AI Job Search Agent',
    desc: 'An autonomous pipeline that discovers roles, matches your CV, and drafts brand-voice cover letters, with a human-in-the-loop dashboard so nothing is submitted without approval.',
    stack: ['Claude API', 'Playwright', 'Flask', 'Python'],
    href: 'https://github.com/dominicrume/rume-job-agent-',
  },
  {
    title: 'Brian Store AI',
    desc: 'An AI retail operating system: real-time inventory, early theft and cash-leakage detection, demand forecasting, and QuickBooks sync.',
    stack: ['TypeScript', 'Gemini API', 'QuickBooks'],
    href: 'https://github.com/dominicrume/BRIAN-STORE-AI',
  },
  {
    title: 'Nigerian Tax & Statement Analyser',
    desc: 'A RAG and OCR system that reads bank statements, flags anomalies, and categorises tax, deployed on Google Cloud Run.',
    stack: ['TypeScript', 'RAG', 'OCR', 'Cloud Run'],
    href: 'https://github.com/dominicrume/nigeria-tax-calculator',
  },
  {
    title: 'VOREM Ecosystem',
    desc: 'An AI and blockchain trust layer that makes every transaction and AI decision verifiable, uniting training, an exchange, and investment tools.',
    stack: ['AI', 'Blockchain', 'Web3'],
    href: 'https://github.com/dominicrume/vorem_ecosystem',
  },
  {
    title: 'AI Code Quality Auditor',
    desc: 'Tooling that audits AI-generated code for quality and security issues — the applied side of my MSc research at Aston University.',
    stack: ['Python', 'LLM', 'Security'],
    href: 'https://github.com/dominicrume/ai-code-quality-auditor',
  },
  {
    title: 'MCKI Solutions Platform',
    desc: 'A full-stack university-admissions advisory platform with guided journeys, eligibility pre-checks, and consultation booking.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    href: 'https://github.com/dominicrume/mcki-solution',
  },
];
