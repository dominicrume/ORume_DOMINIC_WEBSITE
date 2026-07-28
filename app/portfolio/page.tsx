import React from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="bg-[#0A0F1C] text-blue-100 min-h-screen font-sans selection:bg-[#00E5FF] selection:text-[#0A0F1C]">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-blue-900/50 shadow-[0_0_15px_rgba(0,82,255,0.1)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/portfolio" className="text-[#00E5FF] font-display font-bold tracking-widest text-2xl flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
            <span className="text-white">RUME</span> DOMINIC.
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider text-blue-200">
            <a href="#intro" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] transition-all">Intro</a>
            <a href="#about" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] transition-all">About</a>
            <a href="#expertise" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] transition-all">Expertise</a>
            <a href="#speaking" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] transition-all">Speaking</a>
            <a href="#works" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] transition-all">Works</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* INTRO HERO */}
        <section id="intro" className="min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-6 relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0052FF] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>

          <div className="mb-4 flex items-center space-x-4 relative z-10">
            <span className="h-[2px] w-12 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"></span>
            <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">Hello World</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white leading-none tracking-tighter mb-8 relative z-10">
            I am Rume <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0052FF]">Dominic.</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-2xl font-light leading-relaxed mb-12 relative z-10">
            An Applied AI Engineer & Systems Architect. I build production-grade, verifiable Agentic Intelligence.
          </p>
          <div className="flex gap-6 relative z-10">
            <a href="https://calendly.com/dominicrume/30-mins-strategy-call" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-[#00E5FF] to-[#0052FF] text-white font-bold tracking-widest uppercase text-sm rounded hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,82,255,0.5)]">
              Book a Call
            </a>
            <a href="#about" className="inline-block px-8 py-4 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase text-sm rounded hover:bg-[#00E5FF]/10 transition-colors">
              Explore Portfolio
            </a>
          </div>
        </section>

        {/* ABOUT & PORTRAIT */}
        <section id="about" className="py-32 bg-[#060A14] relative border-y border-blue-900/30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Crystalline Picture Container */}
            <div className="flex justify-center md:justify-start">
              <div className="relative group w-full max-w-md aspect-square rounded-2xl p-1 bg-gradient-to-br from-[#00E5FF] to-[#0052FF] shadow-[0_0_40px_rgba(0,82,255,0.3)] transition-transform hover:scale-[1.02]">
                <div className="w-full h-full bg-[#0A0F1C] rounded-xl overflow-hidden relative">
                  {/* Actual Photo */}
                  <img 
                    src="/rume-portrait.jpg" 
                    alt="Rume Dominic" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal duration-500"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A0F1C]/80 backdrop-blur-md p-4 rounded-lg border border-blue-500/30">
                    <p className="text-center font-mono text-[#00E5FF] text-xs tracking-[0.2em] font-bold">SYSTEM ARCHITECT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div>
              <div className="mb-8 flex items-center space-x-4">
                <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">About</span>
                <span className="h-[2px] flex-grow bg-blue-900/50"></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-snug mb-8">
                Applied AI Engineer with a demonstrated history of moving AI prototypes into <strong className="font-bold text-[#00E5FF]">reliable, cloud-hosted services</strong> across financial document automation, paid-subscriber analytics, and housing operations SaaS.
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-8">
                Expertise in designing, building, and deploying LLM, RAG, and agentic systems that automate document-heavy workflows, accelerate operational decision-making, and convert business requirements into measurable value.
              </p>
              <div className="flex gap-4">
                <a href="https://calendly.com/dominicrume/30-mins-strategy-call" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-wider uppercase text-xs rounded hover:bg-[#00E5FF] hover:text-[#0A0F1C] transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                  Book a Call
                </a>
                <a href="/RUME_DOMINIC_AI_CV.pdf" download className="px-6 py-3 border border-blue-800 text-blue-200 font-bold tracking-wider uppercase text-xs rounded hover:border-white hover:text-white transition-all">
                  Download CV
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="py-32 max-w-7xl mx-auto px-6 relative">
          <div className="mb-16 flex items-center space-x-4">
            <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Core Expertise</span>
            <span className="h-[2px] flex-grow bg-blue-900/50"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "LLM & Agentic Systems", desc: "Orchestrating multi-agent workflows, tool usage, and prompt pipelines for autonomous execution." },
              { title: "Machine Learning (RAG & NLP)", desc: "Building high-precision retrieval systems, OCR data extraction, and semantic search architectures." },
              { title: "Verification & Blockchain", desc: "Implementing cryptographic hashing (SHA-256) for tamper-evident documentation and IP tracking." },
              { title: "FastAPI, Next.js & Cloud", desc: "Deploying highly scalable, dockerized microservices via Google Cloud Run and Vercel." }
            ].map((skill, i) => (
              <div key={i} className="group p-8 rounded-xl bg-blue-950/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all hover:-translate-y-2 shadow-lg">
                <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">{skill.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* THOUGHT LEADERSHIP & SPEAKING (NEW SECTION) */}
        <section id="speaking" className="py-32 bg-[#060A14] border-y border-blue-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 flex items-center space-x-4">
              <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Speaking & Training</span>
              <span className="h-[2px] flex-grow bg-blue-900/50"></span>
            </div>

            <div className="space-y-8">
              
              <div className="p-8 rounded-xl bg-blue-950/30 border border-blue-800/50 hover:border-[#0052FF] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 flex items-center justify-center shrink-0 border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                  <span className="text-2xl">🎙️</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">BIRMINGHAM, UK · RECENT</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Generative AI Masterclass</h3>
                  <p className="text-blue-200">Delivered an empowering training event focused on the practical implementation of Generative AI, providing real-world proofs and actionable strategies for attendees in Birmingham.</p>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-blue-950/30 border border-blue-800/50 hover:border-[#0052FF] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-[#0052FF]/20 flex items-center justify-center shrink-0 border border-[#0052FF]/50 shadow-[0_0_15px_rgba(0,82,255,0.2)]">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">UNIVERSITY OF BIRMINGHAM · MARCH</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Frontier Tech X (Old World Green)</h3>
                  <p className="text-blue-200">Invited speaker at the prestigious University of Birmingham &quot;Big Old Joe&quot; for Frontier Tech X, discussing the horizon of Agentic AI and blockchain verification layers.</p>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-blue-950/30 border border-blue-800/50 hover:border-[#0052FF] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 flex items-center justify-center shrink-0 border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">BIRMINGHAM, UK · FEBRUARY</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">AI Dominance Event</h3>
                  <p className="text-blue-200">Hosted and spoke at a massive empowerment event demonstrating how to leverage artificial intelligence for market dominance, with extensive real-life attendance and case studies.</p>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-blue-950/30 border border-blue-800/50 hover:border-[#0052FF] transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-[#0052FF]/20 flex items-center justify-center shrink-0 border border-[#0052FF]/50 shadow-[0_0_15px_rgba(0,82,255,0.2)]">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">LONDON, UK</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Creator Economy & AI Storytelling</h3>
                  <p className="text-blue-200">Collaborated with Jali and Empower to train creators on integrating artificial intelligence into digital storytelling and media workflows.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WORKS (APPLIED AI SYSTEMS) */}
        <section id="works" className="py-32 max-w-7xl mx-auto px-6 relative">
          <div className="absolute right-0 top-1/2 w-64 h-64 bg-[#0052FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
          
          <div className="mb-16 flex items-center space-x-4 relative z-10">
            <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Selected Applied AI Systems</span>
            <span className="h-[2px] flex-grow bg-blue-900/50"></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            
            <a href="https://auditor-dashboard-rume.fly.dev/" target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-blue-900/50 hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all p-8 bg-blue-950/10 backdrop-blur-sm">
              <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold">ASTON UNIVERSITY · MSC RESEARCH</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">AI Code Quality Auditor</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                Built a Python evaluation instrument measuring where AI coding agents fail across hallucination, code complexity, duplication, and security-density indicators, with 600 controlled measurements.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">Python</span>
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">PyPI</span>
              </div>
            </a>

            <a href="https://eaglesden.online/" target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-blue-900/50 hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all p-8 bg-blue-950/10 backdrop-blur-sm">
              <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold">VOREM · GOOGLE CLOUD RUN</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">Eagles Den Analytics</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                Built a five-model LLM analytics workflow for subscriber decision-making, including market-signal generation, Paystack billing, Telegram / WhatsApp delivery, and Cloud Run deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">LLM</span>
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">Google Cloud Run</span>
              </div>
            </a>

            <a href="https://github.com/dominicrume/TENANT-HUB" target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-blue-900/50 hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all p-8 bg-blue-950/10 backdrop-blur-sm">
              <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold">GITHUB · PUBLIC REPO</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">Tenant Hub (HMO)</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                Developed an automated property management and tenancy tracking system tailored for Houses in Multiple Occupation (HMO).
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">PropTech</span>
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">Automation</span>
              </div>
            </a>

            <a href="https://www.veritaport.co.uk/" target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-blue-900/50 hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all p-8 bg-blue-950/10 backdrop-blur-sm">
              <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold">AGENTICOS · FASTAPI & NEXT.JS</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">VeritaPort (Layer-3 Verification)</h3>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                Designed a cryptographic verification layer for tamper-evident document integrity, combining SHA-256 hash-chain verification and product-level tamper detection.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">Cryptography</span>
                <span className="text-xs bg-[#0052FF]/20 text-blue-100 px-3 py-1 rounded-full border border-[#0052FF]/30">Next.js</span>
              </div>
            </a>

          </div>
        </section>

        {/* CERTIFICATIONS & IP */}
        <section id="certifications" className="py-32 bg-[#060A14] border-t border-blue-900/30 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 flex items-center space-x-4">
              <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Certifications & IP</span>
              <span className="h-[2px] flex-grow bg-blue-900/50"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-blue-200 text-sm">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF]">✦</span>
                <p><strong className="text-white font-bold">UK Patent Application GB2611754.9</strong> (filed 2026, pending), the KYA Framework for verifiable AI accountability.</p>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF]">✦</span>
                <p><strong className="text-white font-bold">Microsoft Azure</strong> AI Apps & Agents Developer.</p>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF]">✦</span>
                <p><strong className="text-white font-bold">AI Governance</strong> & Responsible AI.</p>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF]">✦</span>
                <p><strong className="text-white font-bold">Author of five books</strong> (published on Amazon, Waterstones UK and Ebay).</p>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF]">✦</span>
                <p><strong className="text-white font-bold">Enterprise System Architecture</strong> & Workflow Orchestration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <footer id="contact" className="py-32 text-center max-w-4xl mx-auto px-6 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[500px] h-[500px] bg-gradient-to-r from-[#00E5FF] to-[#0052FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-8 relative z-10 drop-shadow-md">Ready to build auditable AI?</h2>
          <p className="text-blue-200 mb-12 text-lg relative z-10">
            Let&apos;s discuss how we can deploy verifiable, scalable Agentic AI systems for your enterprise without compromising governance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <a href="https://calendly.com/dominicrume/30-mins-strategy-call" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-5 bg-gradient-to-r from-[#00E5FF] to-[#0052FF] text-white font-bold tracking-widest uppercase text-sm rounded shadow-[0_0_30px_rgba(0,82,255,0.5)] hover:scale-105 transition-all">
              Book a Call
            </a>
            <a href="/RUME_DOMINIC_AI_CV.pdf" download className="inline-block px-10 py-5 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase text-sm rounded hover:bg-[#00E5FF]/10 transition-colors">
              Download Full CV
            </a>
          </div>
          <div className="mt-16 text-blue-300 text-sm space-y-3 relative z-10 font-mono flex flex-col items-center">
            <p className="flex flex-wrap justify-center gap-3">
              <a href="mailto:orumedominic@gmail.com" className="hover:text-[#00E5FF] transition-colors">orumedominic@gmail.com</a>
              <span className="text-blue-800">|</span>
              <a href="https://linkedin.com/in/dominicrume" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">linkedin.com/in/dominicrume</a>
              <span className="text-blue-800">|</span>
              <a href="https://github.com/dominicrume" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">github.com/dominicrume (29+ repos)</a>
            </p>
            <p className="flex flex-wrap justify-center gap-3 text-blue-400">
              <a href="https://rumedominic.com" className="hover:text-[#00E5FF] transition-colors">rumedominic.com</a>
              <span className="text-blue-800">|</span>
              <span>England, UK</span>
              <span className="text-blue-800">|</span>
              <a href="tel:+447402830944" className="hover:text-[#00E5FF] transition-colors">+44 7402 830944</a>
            </p>
          </div>
          <div className="mt-16 text-xs font-mono text-blue-600 tracking-widest relative z-10">
            © {new Date().getFullYear()} RUME DOMINIC. KYA ARCHITECTURE.
          </div>
        </footer>

      </main>
    </div>
  );
}
