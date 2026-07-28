import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rume Dominic | Applied AI Engineer & Systems Architect",
  description: "Portfolio of Rume Dominic, Applied AI Engineer & Systems Architect. Expert in LLM orchestration, Agentic Intelligence, and Verifiable AI.",
  keywords: ["AI Engineer", "Applied AI", "Systems Architect", "Agentic Systems", "RAG Pipelines", "Verifiable AI", "Rume Dominic"],
};

export default function PortfolioPage() {
  return (
    <div className="bg-[#0A0F1C] text-blue-100 min-h-screen font-sans selection:bg-[#00E5FF] selection:text-[#0A0F1C]">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-blue-900/50 shadow-[0_0_15px_rgba(0,82,255,0.1)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/portfolio" className="group text-[#00E5FF] font-display font-bold tracking-widest text-2xl flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-all">
            <span className="text-white group-hover:text-blue-100 transition-colors">RUME</span> DOMINIC.
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider text-blue-200">
            <a href="#intro" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] hover:-translate-y-0.5 transition-all">Intro</a>
            <a href="#about" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] hover:-translate-y-0.5 transition-all">About</a>
            <a href="#expertise" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] hover:-translate-y-0.5 transition-all">Expertise</a>
            <a href="#speaking" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] hover:-translate-y-0.5 transition-all">Speaking</a>
            <a href="#works" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] hover:-translate-y-0.5 transition-all">Works</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* INTRO HERO */}
        <section id="intro" className="min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-6 relative overflow-hidden group">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0052FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-[pulse_4s_ease-in-out_infinite] transition-all group-hover:opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-[pulse_5s_ease-in-out_infinite] transition-all group-hover:opacity-20"></div>

          <div className="mb-6 flex items-center space-x-4 relative z-10">
            <span className="h-[2px] w-16 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] transition-all hover:w-24"></span>
            <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">Hello World</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white leading-none tracking-tighter mb-8 relative z-10">
            I am Rume <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00A3FF] to-[#0052FF] hover:opacity-90 transition-opacity">Dominic.</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-200 max-w-3xl font-light leading-relaxed mb-12 relative z-10">
            <strong className="text-[#00E5FF] font-semibold drop-shadow-[0_0_5px_rgba(0,229,255,0.3)]">Applied AI Engineer & Systems Architect.</strong><br/>
            I build production-grade, verifiable Agentic Intelligence and orchestrate the complete lifecycle of enterprise AI from prototype to undeniable market dominance.
          </h2>
          
          <div className="flex gap-6 relative z-10">
            <a href="https://calendly.com/dominicrume/30-mins-strategy-call" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-[#00E5FF] to-[#0052FF] text-white font-bold tracking-widest uppercase text-sm rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,82,255,0.5)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)]">
              Book a Call
            </a>
            <a href="mailto:orumedominic@gmail.com" className="inline-block px-8 py-4 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase text-sm rounded hover:bg-[#00E5FF]/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
              Email Me
            </a>
            <a href="#about" className="inline-block px-8 py-4 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase text-sm rounded hover:bg-[#00E5FF]/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all hidden sm:inline-block">
              Explore Portfolio
            </a>
          </div>
        </section>

        {/* ABOUT & PORTRAIT */}
        <section id="about" className="py-40 bg-[#060A14] relative border-y border-blue-900/30 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Crystalline Picture Container */}
            <div className="flex justify-center md:justify-start">
              <div className="relative group w-full max-w-md aspect-square rounded-2xl p-1 bg-gradient-to-br from-[#00E5FF] to-[#0052FF] shadow-[0_0_40px_rgba(0,82,255,0.3)] transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(0,229,255,0.5)]">
                <div className="w-full h-full bg-[#0A0F1C] rounded-xl overflow-hidden relative">
                  {/* Actual Photo */}
                  <img 
                    src="/rume-portrait.jpg" 
                    alt="Rume Dominic" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal duration-700"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-[#00E5FF]/30 transition-colors duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A0F1C]/80 backdrop-blur-md p-4 rounded-lg border border-blue-500/30 group-hover:border-[#00E5FF]/60 transition-colors duration-500">
                    <p className="text-center font-mono text-[#00E5FF] text-xs tracking-[0.2em] font-bold group-hover:animate-pulse">SYSTEM ARCHITECT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div>
              <div className="mb-8 flex items-center space-x-4">
                <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">The Architecture</span>
                <span className="h-[2px] flex-grow bg-blue-900/50 shadow-[0_0_5px_rgba(0,82,255,0.3)]"></span>
              </div>
              <h3 className="text-3xl md:text-4xl font-light text-white leading-snug mb-8">
                Applied AI Engineer with a demonstrated history of moving AI prototypes into <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0052FF]">reliable, cloud-hosted dominance</strong> across financial automation, subscriber analytics, and enterprise SaaS.
              </h3>
              <p className="text-blue-200 text-lg leading-relaxed mb-8">
                I do not just write code; I orchestrate the entire product ecosystem. Expertise in designing, building, and deploying LLM, RAG, and agentic systems that automate document-heavy workflows, accelerate operational decision-making, and convert raw architecture into measurable balance-sheet value.
              </p>
              <div className="flex gap-4">
                <a href="https://calendly.com/dominicrume/30-mins-strategy-call" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-[#00E5FF]/20 to-transparent border border-[#00E5FF] text-[#00E5FF] font-bold tracking-wider uppercase text-xs rounded hover:bg-[#00E5FF] hover:text-[#0A0F1C] transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.6)]">
                  Book a Call
                </a>
                <a href="mailto:orumedominic@gmail.com" className="px-6 py-3 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-wider uppercase text-xs rounded hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all">
                  Contact Us
                </a>
                <a href="/RUME_DOMINIC_AI_CV.pdf" download className="px-6 py-3 border border-blue-800 text-blue-200 font-bold tracking-wider uppercase text-xs rounded hover:border-white hover:text-white transition-all hidden sm:inline-block hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  Download CV
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="py-40 max-w-7xl mx-auto px-6 relative">
          <div className="mb-20 flex items-center space-x-4">
            <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Core Expertise</span>
            <span className="h-[2px] flex-grow bg-blue-900/50"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "LLM & Agentic Systems", desc: "Orchestrating multi-agent workflows, tool usage, and prompt pipelines for autonomous execution and scale." },
              { title: "Machine Learning (RAG)", desc: "Building high-precision retrieval systems, OCR data extraction, and semantic search architectures." },
              { title: "Verification & Blockchain", desc: "Implementing cryptographic hashing (SHA-256) for tamper-evident documentation and IP provenance." },
              { title: "Product Finalization", desc: "Deploying highly scalable, dockerized SaaS via Google Cloud Run, Vercel, and Next.js architectures." }
            ].map((skill, i) => (
              <div key={i} className="group p-8 rounded-xl bg-[#060A14]/80 backdrop-blur-md border border-blue-900/50 hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_30px_-5px_rgba(0,229,255,0.2)]">
                <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00E5FF] group-hover:to-white transition-all">{skill.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{skill.desc}</p>
                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-[#00E5FF] to-transparent transition-all duration-500 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </section>

        {/* THOUGHT LEADERSHIP & SPEAKING */}
        <section id="speaking" className="py-40 bg-[#060A14] border-y border-blue-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 flex items-center space-x-4">
              <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Speaking & Thought Leadership</span>
              <span className="h-[2px] flex-grow bg-blue-900/50"></span>
            </div>

            <div className="space-y-8">
              
              <div className="group p-8 rounded-xl bg-blue-950/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E5FF]/70 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-500 hover:-translate-x-2 flex flex-col md:flex-row gap-8 items-start md:items-center cursor-default">
                <div className="w-20 h-20 rounded-full bg-[#00E5FF]/10 flex items-center justify-center shrink-0 border border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/20 group-hover:border-[#00E5FF] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-500">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">🎙️</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">BIRMINGHAM UNIVERSITY · MARCH</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">Generative AI Masterclass</h3>
                  <p className="text-blue-200">Delivered an empowering generative AI masterclass for students, business owners, and professionals.</p>
                </div>
              </div>

              <div className="group p-8 rounded-xl bg-blue-950/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#0052FF]/70 hover:shadow-[0_0_30px_rgba(0,82,255,0.15)] transition-all duration-500 hover:-translate-x-2 flex flex-col md:flex-row gap-8 items-start md:items-center cursor-default">
                <div className="w-20 h-20 rounded-full bg-[#0052FF]/10 flex items-center justify-center shrink-0 border border-[#0052FF]/30 group-hover:bg-[#0052FF]/20 group-hover:border-[#0052FF] group-hover:shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all duration-500">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">🏛️</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">UNIVERSITY OF BIRMINGHAM</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-[#0052FF] transition-colors">Frontier Tech X</h3>
                  <p className="text-blue-200">Invited speaker at the prestigious University of Birmingham &quot;Old Joe&quot; for Frontier Tech X, discussing the horizon of Agentic AI and blockchain verification layers.</p>
                </div>
              </div>

              <div className="group p-8 rounded-xl bg-blue-950/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E5FF]/70 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-500 hover:-translate-x-2 flex flex-col md:flex-row gap-8 items-start md:items-center cursor-default">
                <div className="w-20 h-20 rounded-full bg-[#00E5FF]/10 flex items-center justify-center shrink-0 border border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/20 group-hover:border-[#00E5FF] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-500">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">⚡</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">BIRMINGHAM, UK · FEBRUARY</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">AI Dominance Event</h3>
                  <p className="text-blue-200">Hosted and spoke at a massive empowerment event demonstrating how to leverage artificial intelligence for market dominance, with extensive real-life attendance and case studies.</p>
                </div>
              </div>

              <div className="group p-8 rounded-xl bg-blue-950/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#0052FF]/70 hover:shadow-[0_0_30px_rgba(0,82,255,0.15)] transition-all duration-500 hover:-translate-x-2 flex flex-col md:flex-row gap-8 items-start md:items-center cursor-default">
                <div className="w-20 h-20 rounded-full bg-[#0052FF]/10 flex items-center justify-center shrink-0 border border-[#0052FF]/30 group-hover:bg-[#0052FF]/20 group-hover:border-[#0052FF] group-hover:shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all duration-500">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">🌍</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#00E5FF] mb-2 font-bold tracking-widest">LONDON, UK · NOVEMBER</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-[#0052FF] transition-colors">Creator Economy & AI Storytelling</h3>
                  <p className="text-blue-200">Collaborated with Jali and Empower to train creators on integrating artificial intelligence into digital storytelling and media workflows.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WORKS (APPLIED AI SYSTEMS) */}
        <section id="works" className="py-40 max-w-7xl mx-auto px-6 relative">
          <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-[#0052FF] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse"></div>
          
          <div className="mb-20 flex items-center space-x-4 relative z-10">
            <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Selected Applied AI Systems</span>
            <span className="h-[2px] flex-grow bg-blue-900/50 shadow-[0_0_5px_rgba(0,82,255,0.3)]"></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            
            <a href="https://www.veritaport.co.uk/" target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-blue-900/40 hover:border-[#00E5FF]/80 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.3)] p-10 bg-[#060A14]/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:to-[#0052FF]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="text-xs font-mono text-[#00E5FF] mb-3 font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                  AGENTICOS · FASTAPI & NEXT.JS
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00E5FF] transition-all">VeritaPort (Layer-3 Verification)</h3>
                <p className="text-blue-200 text-base leading-relaxed mb-8">
                  Designed a cryptographic verification layer for tamper-evident document integrity, combining SHA-256 hash-chain verification and product-level tamper detection.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">Cryptography</span>
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">Next.js</span>
                </div>
              </div>
            </a>

            <a href="https://app.mattysplace.org.uk/" target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-blue-900/40 hover:border-[#00E5FF]/80 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.3)] p-10 bg-[#060A14]/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:to-[#0052FF]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="text-xs font-mono text-[#00E5FF] mb-3 font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                  PRODUCTION SAAS · HMO MANAGEMENT
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00E5FF] transition-all">Matty&apos;s Place (Tenant Hub)</h3>
                <p className="text-blue-200 text-base leading-relaxed mb-8">
                  Developed an automated property management and tenancy tracking system tailored for Houses in Multiple Occupation (HMO).
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">PropTech</span>
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">Automation</span>
                </div>
              </div>
            </a>

            <a href="https://eaglesden.online/" target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-blue-900/40 hover:border-[#00E5FF]/80 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.3)] p-10 bg-[#060A14]/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:to-[#0052FF]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="text-xs font-mono text-[#00E5FF] mb-3 font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                  VOREM · GOOGLE CLOUD RUN
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00E5FF] transition-all">Eagles Den Analytics</h3>
                <p className="text-blue-200 text-base leading-relaxed mb-8">
                  Built a five-model LLM analytics workflow for subscriber decision-making, including market-signal generation, Paystack billing, Telegram / WhatsApp delivery, and Cloud Run deployment.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">LLM</span>
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">Google Cloud Run</span>
                </div>
              </div>
            </a>

            <a href="https://auditor-dashboard-rume.fly.dev/" target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-blue-900/40 hover:border-[#00E5FF]/80 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(0,229,255,0.3)] p-10 bg-[#060A14]/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:to-[#0052FF]/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="text-xs font-mono text-[#00E5FF] mb-3 font-bold tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                  ASTON UNIVERSITY · MSC RESEARCH
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00E5FF] transition-all">AI Code Quality Auditor</h3>
                <p className="text-blue-200 text-base leading-relaxed mb-8">
                  Built a Python evaluation instrument measuring where AI coding agents fail across hallucination, code complexity, duplication, and security-density indicators, with 600 controlled measurements.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">Python</span>
                  <span className="text-xs font-mono bg-[#0052FF]/10 text-blue-100 px-4 py-2 rounded-full border border-[#0052FF]/30 group-hover:border-[#00E5FF]/50 transition-colors">PyPI</span>
                </div>
              </div>
            </a>

          </div>
        </section>

        {/* CERTIFICATIONS & IP */}
        <section id="certifications" className="py-40 bg-[#060A14] border-t border-blue-900/30 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 flex items-center space-x-4">
              <span className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm font-bold">Certifications & IP</span>
              <span className="h-[2px] flex-grow bg-blue-900/50 shadow-[0_0_5px_rgba(0,82,255,0.3)]"></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-blue-200 text-sm">
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Microsoft Azure</strong> AI Apps & Agents Developer</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">AI Governance</strong> & Responsible AI</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Python</strong> (University of Michigan)</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Cisco</strong> CCNA & CCNP</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Leveraging AI</strong> for Governance, regulation and compliance</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Certified Blockchain Architect</strong> (Blockchain Council)</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Certified Metaverse Expert</strong> (Blockchain Council)</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">UK Patent Application GB2611754.9</strong> (filed 2026, pending), the KYA Framework for verifiable AI accountability and provenance.</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">Author of five books</strong> (published on Amazon, Waterstones uk and Ebay)</p>
              </div>
              <div className="group flex items-start space-x-4 p-5 rounded-xl bg-blue-950/20 border border-blue-900/30 hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:translate-x-1">
                <span className="text-[#00E5FF] font-bold text-xl drop-shadow-[0_0_5px_#00E5FF] group-hover:scale-125 transition-transform duration-300">✦</span>
                <p><strong className="text-white font-bold group-hover:text-[#00E5FF] transition-colors">39+ public speaking engagements</strong> as evidence of communication and knowledge-sharing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <footer id="contact" className="py-40 text-center max-w-5xl mx-auto px-6 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-gradient-to-r from-[#00E5FF] to-[#0052FF] rounded-full mix-blend-screen filter blur-[200px] opacity-20 animate-pulse"></div>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 mb-8 relative z-10 drop-shadow-lg tracking-tight">Ready to build auditable AI?</h2>
          <p className="text-blue-200 mb-16 text-xl max-w-3xl mx-auto leading-relaxed relative z-10 font-light">
            Let&apos;s discuss how we can deploy verifiable, highly-scalable Agentic AI ecosystems for your enterprise without compromising governance or security.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 relative z-10">
            <a href="https://calendly.com/dominicrume/30-mins-strategy-call" target="_blank" rel="noopener noreferrer" className="group inline-block px-12 py-6 bg-gradient-to-r from-[#00E5FF] to-[#0052FF] text-white font-bold tracking-widest uppercase text-sm rounded shadow-[0_0_30px_rgba(0,82,255,0.5)] hover:shadow-[0_0_60px_rgba(0,229,255,0.7)] hover:-translate-y-2 transition-all duration-500">
              <span className="drop-shadow-md">Book a Call</span>
            </a>
            <a href="mailto:orumedominic@gmail.com" className="inline-block px-12 py-6 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase text-sm rounded hover:bg-[#00E5FF]/10 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:-translate-y-2 transition-all duration-500">
              Email Me
            </a>
            <a href="/RUME_DOMINIC_AI_CV.pdf" download className="inline-block px-12 py-6 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase text-sm rounded hover:bg-[#00E5FF]/10 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:-translate-y-2 transition-all duration-500 hidden sm:inline-block">
              Download Full CV
            </a>
          </div>
          
          <div className="mt-24 p-8 rounded-2xl bg-[#060A14]/80 backdrop-blur-md border border-blue-900/40 text-blue-300 text-sm space-y-4 relative z-10 font-mono flex flex-col items-center hover:border-[#00E5FF]/30 transition-colors duration-500">
            <p className="flex flex-wrap justify-center gap-4">
              <a href="mailto:orumedominic@gmail.com" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_#00E5FF] transition-all">orumedominic@gmail.com</a>
              <span className="text-blue-800">|</span>
              <a href="https://linkedin.com/in/dominicrume" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_#00E5FF] transition-all">linkedin.com/in/dominicrume</a>
              <span className="text-blue-800">|</span>
              <a href="https://github.com/dominicrume" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_#00E5FF] transition-all">github.com/dominicrume (29+ repos)</a>
            </p>
            <p className="flex flex-wrap justify-center gap-4 text-blue-400">
              <a href="https://rumedominic.com" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_#00E5FF] transition-all">rumedominic.com</a>
              <span className="text-blue-800">|</span>
              <span>England, UK</span>
              <span className="text-blue-800">|</span>
              <a href="tel:+447402830944" className="hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_#00E5FF] transition-all">+44 7402 830944</a>
            </p>
          </div>
          
          <div className="mt-16 text-xs font-mono text-blue-600 tracking-widest relative z-10 flex items-center justify-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-600"></span>
            © {new Date().getFullYear()} RUME DOMINIC. KYA ARCHITECTURE.
            <span className="w-1 h-1 rounded-full bg-blue-600"></span>
          </div>
        </footer>

      </main>
    </div>
  );
}
