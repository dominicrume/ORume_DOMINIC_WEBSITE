import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] text-[#F3F6FC] py-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#CBA167]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-[#C9738F]/15 rounded-full blur-[100px] pointer-events-none"></div>

      <Container className="max-w-4xl relative z-10 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold mb-6">
          Navigation Portal · Rume Dominic
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-4">
          Looking for Something Special?
        </h1>
        <p className="text-muted max-w-xl mx-auto text-base sm:text-lg mb-12">
          We couldn’t find that exact link, but you’re in the right place. Select your destination below to claim your access or explore our collaborations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* Vaida Stone Card */}
          <GlassCard accent="gold" className="flex flex-col justify-between p-6 hover:border-gold/60 transition-all duration-300">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9738F] block mb-2">
                Collaboration · Always ENOUGH™
              </span>
              <h2 className="font-display text-2xl font-bold text-paper mb-2">
                Vaida V. Stone
              </h2>
              <p className="text-sm text-muted mb-6">
                Rebuild confidence, reclaim identity, and access the exclusive 9-Day AI Blueprint & Gift Pack for the Always ENOUGH community.
              </p>
            </div>
            <Link 
              href="/vaida"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#C9738F] to-[#7E3B54] px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] text-center w-full"
            >
              Enter Vaida Stone’s Portal →
            </Link>
          </GlassCard>

          {/* Iconic Times / Temisan Card */}
          <GlassCard accent="blue" className="flex flex-col justify-between p-6 hover:border-blue-glow/60 transition-all duration-300">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-glow block mb-2">
                Collaboration · Iconic Times
              </span>
              <h2 className="font-display text-2xl font-bold text-paper mb-2">
                Ambassador Dr. Temisan Louis
              </h2>
              <p className="text-sm text-muted mb-6">
                Explore the official AI & Media collaboration with Ambassador Dr. Temisan O. Louis and the Iconic Times Newspaper.
              </p>
            </div>
            <Link 
              href="/iconic"
              className="inline-flex items-center justify-center rounded-xl border border-blue-glow/40 bg-blue-glow/10 px-5 py-3 text-sm font-bold text-paper shadow-lg transition-all hover:bg-blue-glow/20 hover:border-blue-glow text-center w-full"
            >
              Enter Iconic Times Portal →
            </Link>
          </GlassCard>

          {/* Instant Access Card */}
          <GlassCard accent="gold" className="flex flex-col justify-between p-6 hover:border-gold/60 transition-all duration-300">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
                Free Resources · VOREM
              </span>
              <h2 className="font-display text-2xl font-bold text-paper mb-2">
                Free AI Course & Book
              </h2>
              <p className="text-sm text-muted mb-6">
                Claim instant access to &ldquo;Master AI in 9 Days&rdquo; and download the bestselling book &ldquo;From Code to Consciousness&rdquo;.
              </p>
            </div>
            <Link 
              href="/access"
              className="inline-flex items-center justify-center rounded-xl bg-gold-metallic px-5 py-3 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110 text-center w-full"
            >
              Claim Instant Access →
            </Link>
          </GlassCard>

          {/* Rume Dominic Root Portfolio Card */}
          <GlassCard accent="gold" className="flex flex-col justify-between p-6 hover:border-gold/60 transition-all duration-300">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted block mb-2">
                Principal AI & Blockchain Engineering
              </span>
              <h2 className="font-display text-2xl font-bold text-paper mb-2">
                Rume Dominic Portfolio
              </h2>
              <p className="text-sm text-muted mb-6">
                Build AI and Web3 products 5x more capital-efficient, 7x faster, and 10x clearer with enterprise-grade engineering.
              </p>
            </div>
            <Link 
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-paper shadow-lg transition-all hover:bg-white/10 hover:border-white/40 text-center w-full"
            >
              Visit rumedominic.com →
            </Link>
          </GlassCard>

        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-muted hover:text-gold transition-colors underline">
            ← Return to Main Homepage
          </Link>
        </div>
      </Container>
    </main>
  );
}
