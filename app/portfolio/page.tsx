import React from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="bg-[#0f0f0f] text-gray-300 min-h-screen font-sans selection:bg-[#eabe7b] selection:text-[#0f0f0f]">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/portfolio" className="text-[#eabe7b] font-display font-bold tracking-widest text-xl">
            RUME.
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <a href="#intro" className="hover:text-[#eabe7b] transition-colors">Intro</a>
            <a href="#about" className="hover:text-[#eabe7b] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#eabe7b] transition-colors">Expertise</a>
            <a href="#experience" className="hover:text-[#eabe7b] transition-colors">Experience</a>
            <a href="#works" className="hover:text-[#eabe7b] transition-colors">Works</a>
            <a href="#certifications" className="hover:text-[#eabe7b] transition-colors">IP & Certs</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* INTRO HERO */}
        <section id="intro" className="min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-6">
          <div className="mb-4 flex items-center space-x-4">
            <span className="h-[2px] w-12 bg-[#eabe7b]"></span>
            <span className="text-[#eabe7b] font-mono tracking-widest uppercase text-sm">Hello World</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white mb-12">
            I am Rume Dominic.<br />
            An Applied AI<br />
            Engineer.
          </h1>
          
          <ul className="flex flex-wrap gap-6 font-mono text-sm uppercase tracking-widest text-gray-500">
            <li><a href="https://linkedin.com/in/dominicrume" target="_blank" rel="noreferrer" className="hover:text-[#eabe7b] transition-colors">LinkedIn</a></li>
            <li><a href="https://github.com/dominicrume" target="_blank" rel="noreferrer" className="hover:text-[#eabe7b] transition-colors">GitHub</a></li>
            <li><a href="mailto:orumedominic@gmail.com" className="hover:text-[#eabe7b] transition-colors">Email</a></li>
            <li><a href="https://rumedominic.com" target="_blank" rel="noreferrer" className="hover:text-[#eabe7b] transition-colors">Website</a></li>
          </ul>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-32 bg-[#141414]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-[#0f0f0f] border border-gray-800 flex items-center justify-center p-12">
               {/* Placeholder for Photo, using a stylized AI block since we don't have the photo */}
               <div className="w-full h-full border border-[#eabe7b]/20 flex flex-col items-center justify-center text-[#eabe7b]/50 space-y-4">
                  <div className="w-24 h-24 border border-[#eabe7b]/50 rounded-full flex items-center justify-center mb-4">
                     <span className="text-4xl font-display text-[#eabe7b]">R</span>
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase">System Architect</span>
               </div>
            </div>
            
            <div>
              <div className="mb-8 flex items-center space-x-4">
                <span className="text-[#eabe7b] font-mono tracking-widest uppercase text-sm">About</span>
                <span className="h-[2px] flex-grow bg-gray-800"></span>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light mb-12">
                Applied AI Engineer with a demonstrated history of moving AI prototypes into reliable, cloud-hosted services across financial-document automation, paid-subscriber analytics, and housing-operations SaaS. 
                <br /><br />
                Expertise in designing, building, and deploying LLM, RAG, and agentic systems that automate document-heavy workflows, accelerate operational decision-making, and convert business requirements into measurable value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-8 py-4 bg-[#eabe7b] text-[#0f0f0f] font-bold tracking-wide uppercase text-sm hover:bg-white transition-colors text-center">
                  Book a call
                </a>
                <a href="/RUME_DOMINIC_AI_CV.pdf" download className="px-8 py-4 border border-[#eabe7b] text-[#eabe7b] font-bold tracking-wide uppercase text-sm hover:bg-[#eabe7b] hover:text-[#0f0f0f] transition-colors text-center">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="py-32 max-w-7xl mx-auto px-6">
          <div className="mb-16 flex items-center space-x-4">
            <span className="text-[#eabe7b] font-mono tracking-widest uppercase text-sm">Expertise</span>
            <span className="h-[2px] flex-grow bg-gray-800"></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white text-xl font-display font-bold mb-4">LLM & Agentic Systems</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Production agents with tool use, planning and memory; RAG design; LangChain, LangGraph, CrewAI; hallucination & latency tradeoffs.</p>
            </div>
            <div>
              <h3 className="text-white text-xl font-display font-bold mb-4">Machine Learning</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Classification, regression, forecasting, anomaly detection; model evaluation and benchmarking; PyTorch, TensorFlow, MLOps concepts.</p>
            </div>
            <div>
              <h3 className="text-white text-xl font-display font-bold mb-4">Programming & Frameworks</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Python (production-grade), TypeScript / JavaScript, SQL; FastAPI, Next.js, Flask; Docker, CI/CD, PyPI packaging.</p>
            </div>
            <div>
              <h3 className="text-white text-xl font-display font-bold mb-4">Cloud & Data</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Google Cloud Run, Azure, Vercel, AWS; Snowflake, Supabase; OCR pipelines; API & Payment integrations (Paystack).</p>
            </div>
            <div>
              <h3 className="text-white text-xl font-display font-bold mb-4">Verification & Blockchain</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Cryptographic verification, SHA-256 audit chains, on-chain anchoring (Polygon), tamper-evident records for AI accountability.</p>
            </div>
            <div>
              <h3 className="text-white text-xl font-display font-bold mb-4">Delivery & Governance</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Requirements gathering, stakeholder workshops, STRIDE threat modelling, FAIR risk scoring.</p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-32 bg-[#141414]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 flex items-center space-x-4">
              <span className="text-[#eabe7b] font-mono tracking-widest uppercase text-sm">Experience</span>
              <span className="h-[2px] flex-grow bg-gray-800"></span>
            </div>

            <div className="space-y-16 border-l-2 border-gray-800 pl-8 ml-4 relative">
              
              <div className="relative">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-[#eabe7b] border-4 border-[#141414]"></span>
                <h4 className="text-2xl font-display font-bold text-white mb-2">AI Engineer, Enterprise Applications</h4>
                <div className="text-[#eabe7b] font-mono text-sm mb-4">MCKI Solutions, UK · Nov 2025 – Present</div>
                <ul className="space-y-3 text-gray-400 text-sm list-disc pl-4 marker:text-gray-600">
                  <li>Delivers enterprise AI applications end to end, moving selected LLM prototypes into client-facing, cloud-hosted tools across student-routing, document-processing, and housing workflows.</li>
                  <li>Reduced manual support queries by 40% by building a custom AI Student Gateway.</li>
                  <li>Built and deployed a web application achieving a consistent 90+ Lighthouse score on Google Cloud Run.</li>
                  <li>Reduced content-production time by 70% through a governed AI publishing engine syncing WordPress blogs.</li>
                  <li>Built a high-accuracy OCR system (98% precision) automating tax calculations.</li>
                </ul>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-gray-600 border-4 border-[#141414]"></span>
                <h4 className="text-2xl font-display font-bold text-white mb-2">AI Liaison & Advisor (Advisory)</h4>
                <div className="text-[#eabe7b] font-mono text-sm mb-4">Simera Global / YTube Booster Pro, UK · Feb 2026 – Present</div>
                <ul className="space-y-3 text-gray-400 text-sm list-disc pl-4 marker:text-gray-600">
                  <li>Advises on AI workflow design for regional business pipelines, covering CrewAI / LangGraph orchestration.</li>
                  <li>Implements KYA verification layers and secure cross-border data handling for autonomous-agent use cases.</li>
                </ul>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-gray-600 border-4 border-[#141414]"></span>
                <h4 className="text-2xl font-display font-bold text-white mb-2">AI / ML Engineer</h4>
                <div className="text-[#eabe7b] font-mono text-sm mb-4">Vorem · Sept 2017 – Oct 2025</div>
                <ul className="space-y-3 text-gray-400 text-sm list-disc pl-4 marker:text-gray-600">
                  <li>Created, deployed, and maintained AI products across education, analytics, and workflow automation.</li>
                  <li>Delivered supervised-autonomy quantitative FX / crypto signal system with a nine-module architecture.</li>
                  <li>Monitored AI solutions in production, optimising through automated workflows.</li>
                  <li>Delivered technical training to 12,000+ learners via Vorem institute of technology.</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* WORKS */}
        <section id="works" className="py-32 max-w-7xl mx-auto px-6">
          <div className="mb-16 flex items-center space-x-4">
            <span className="text-[#eabe7b] font-mono tracking-widest uppercase text-sm">Selected Applied AI Systems</span>
            <span className="h-[2px] flex-grow bg-gray-800"></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <div className="group border border-gray-800 hover:border-[#eabe7b] transition-colors p-8 bg-[#141414]">
              <div className="text-xs font-mono text-gray-500 mb-2">Aston University · MSc Research</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#eabe7b] transition-colors">AI Code Quality Auditor</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Built a Python evaluation instrument measuring where AI coding agents fail across hallucination, code complexity, duplication, and security-density indicators, with 600 controlled measurements.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">Python</span>
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">PyPI</span>
              </div>
            </div>

            <div className="group border border-gray-800 hover:border-[#eabe7b] transition-colors p-8 bg-[#141414]">
              <div className="text-xs font-mono text-gray-500 mb-2">Vorem · Google Cloud Run</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#eabe7b] transition-colors">Eagles Den Analytics</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Built a five-model LLM analytics workflow for subscriber decision-making, including market-signal generation, Paystack billing, Telegram / WhatsApp delivery, and Cloud Run deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">LLM</span>
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">Google Cloud Run</span>
              </div>
            </div>

            <div className="group border border-gray-800 hover:border-[#eabe7b] transition-colors p-8 bg-[#141414]">
              <div className="text-xs font-mono text-gray-500 mb-2">Google Cloud Run · public repo</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#eabe7b] transition-colors">Tax & Statement Analyser</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Developed a RAG and OCR workflow that extracts transactions, classifies tax categories, flags anomalies, and grounds retrieval against regulatory documents.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">RAG</span>
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">OCR</span>
              </div>
            </div>

            <div className="group border border-gray-800 hover:border-[#eabe7b] transition-colors p-8 bg-[#141414]">
              <div className="text-xs font-mono text-gray-500 mb-2">AgenticOS · FastAPI & Next.js</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#eabe7b] transition-colors">VeritaPort (Layer-3 Verification)</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Designed a cryptographic verification layer for tamper-evident document integrity, combining SHA-256 hash-chain verification and product-level tamper detection.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">Cryptography</span>
                <span className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full border border-gray-800">Next.js</span>
              </div>
            </div>

          </div>
        </section>

        {/* CERTIFICATIONS & IP */}
        <section id="certifications" className="py-32 bg-[#141414]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 flex items-center space-x-4">
              <span className="text-[#eabe7b] font-mono tracking-widest uppercase text-sm">Certifications & IP</span>
              <span className="h-[2px] flex-grow bg-gray-800"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-300 text-sm">
              <div className="flex items-start space-x-3">
                <span className="text-[#eabe7b] mt-1">✦</span>
                <p><strong className="text-white font-medium">UK Patent Application GB2611754.9</strong> (filed 2026, pending), the KYA Framework for verifiable AI accountability.</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#eabe7b] mt-1">✦</span>
                <p><strong className="text-white font-medium">Microsoft Azure</strong> AI Apps & Agents Developer.</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#eabe7b] mt-1">✦</span>
                <p><strong className="text-white font-medium">AI Governance</strong> & Responsible AI.</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#eabe7b] mt-1">✦</span>
                <p><strong className="text-white font-medium">Author of five books</strong> (published on Amazon, Waterstones UK and Ebay).</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#eabe7b] mt-1">✦</span>
                <p><strong className="text-white font-medium">Certified Blockchain Architect</strong> & Metaverse Expert (Blockchain Council).</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#eabe7b] mt-1">✦</span>
                <p><strong className="text-white font-medium">MSc Artificial Intelligence & Business Strategy</strong>, Aston University, UK.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <footer id="contact" className="py-32 text-center max-w-4xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">Ready to build auditable AI?</h2>
          <p className="text-gray-400 mb-12">
            Let&apos;s discuss how we can deploy verifiable, scalable Agentic AI systems for your enterprise without compromising governance.
          </p>
          <a href="mailto:orumedominic@gmail.com" className="inline-block px-10 py-5 bg-[#eabe7b] text-[#0f0f0f] font-bold tracking-wide uppercase text-sm hover:bg-white transition-colors">
            Say Hello
          </a>
          <div className="mt-32 text-gray-600 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Rume Dominic. All rights reserved.
          </div>
        </footer>

      </main>
    </div>
  );
}
