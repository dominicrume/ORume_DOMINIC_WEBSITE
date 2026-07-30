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
    title: 'Local 7B LLM Email Processor',
    desc: 'A personal tool I built because I hate managing my inbox. It runs on a local 7B model hosted with Ollama. It deletes spam, leaves normal messages unread, and flags receipts for my paperless pipeline to process automatically.',
    stack: ['Python', 'Ollama', 'Local LLM'],
    href: 'https://github.com/dominicrume',
  },
  {
    title: 'AI Job Search Agent',
    desc: 'An autonomous pipeline I engineered to discover roles and draft cover letters using Claude. I built a human-in-the-loop dashboard so nothing submits without my explicit approval.',
    stack: ['Claude API', 'Playwright', 'Flask', 'Python'],
    href: 'https://github.com/dominicrume/rume-job-agent-',
  },
  {
    title: 'Brian Store AI',
    desc: 'I built this retail operating system to handle real-time inventory and early theft detection. It syncs directly with QuickBooks and runs on Gemini.',
    stack: ['TypeScript', 'Gemini API', 'QuickBooks'],
    href: 'https://github.com/dominicrume/BRIAN-STORE-AI',
  },
  {
    title: 'Nigerian Tax & Statement Analyser',
    desc: 'A RAG and OCR system I deployed on Google Cloud Run. It reads bank statements, flags anomalies, and categorises tax.',
    stack: ['TypeScript', 'RAG', 'OCR', 'Cloud Run'],
    href: 'https://github.com/dominicrume/nigeria-tax-calculator',
  },
  {
    title: 'AI Code Quality Auditor',
    desc: 'The applied side of my MSc research at Aston University. I built this tooling to audit AI-generated code for quality and security vulnerabilities.',
    stack: ['Python', 'LLM', 'Security'],
    href: 'https://github.com/dominicrume/ai-code-quality-auditor',
  }
];
