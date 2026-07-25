'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const heroStyles = `
  @keyframes vaidaRise {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes vaidaMorph {
    0%, 100% { border-radius: 50% 50% 48% 52% / 52% 48% 52% 48%; }
    50% { border-radius: 48% 52% 52% 48% / 48% 52% 48% 52%; }
  }
  
  .vaida-animate-rise {
    opacity: 0;
    animation: vaidaRise 0.9s ease forwards;
  }
  
  .vaida-morph-ring::before {
    content: "";
    position: absolute;
    inset: -18px;
    border-radius: 50% 50% 48% 52% / 52% 48% 52% 48%;
    background: linear-gradient(135deg, #F3C6D5, #D9B67C);
    filter: blur(2px);
    opacity: 0.55;
    animation: vaidaMorph 9s ease-in-out infinite;
  }
  
  .vaida-portrait-shape {
    border-radius: 50% 50% 48% 52% / 52% 48% 52% 48%;
  }
`;

export function VaidaHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      <div className="max-w-[1140px] mx-auto px-[20px] md:px-[26px]">
        <section className="min-h-[92vh] md:min-h-0 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[36px] md:gap-[56px] items-center pt-[40px] md:pt-[40px] pb-[40px] mb-[60px] md:mb-0">
          
          <div className="text-center md:text-left z-10">
            <span 
              className="inline-block text-[0.75rem] md:text-[0.82rem] tracking-[0.22em] md:tracking-[0.28em] uppercase text-[#A64E6E] font-extrabold mb-[18px] px-[14px] py-[5px] rounded-full bg-[#FBEDF1] border border-[#F6DCE5] vaida-animate-rise"
              style={{ animationDelay: '0.2s' }}
            >
              25+ Years Experience · Educator · Keynote Speaker
            </span>
            <h1 className="font-serif font-semibold text-[clamp(2.4rem,7.5vw,4.8rem)] mb-[18px] md:mb-[22px] leading-[1.05] text-[#7E3B54]">
              <span className="block vaida-animate-rise" style={{ animationDelay: '0.35s', animationDuration: '1s' }}>You are</span>
              <span className="block vaida-animate-rise" style={{ animationDelay: '0.55s', animationDuration: '1s' }}>already</span>
              <span className="block vaida-animate-rise text-[#A64E6E] italic" style={{ animationDelay: '0.75s', animationDuration: '1s' }}>enough.</span>
            </h1>
            <p 
              className="text-[1.1rem] md:text-[1.25rem] font-medium text-[#4A3B41] mt-[20px] mb-[10px] max-w-[42ch] mx-auto md:mx-0 vaida-animate-rise leading-relaxed"
              style={{ animationDelay: '0.9s', animationDuration: '1s' }}
            >
              Stop avoiding your bank account. Start owning your money with calm, clarity, and a system that fits your real life.
            </p>
            <p 
              className="text-[0.95rem] text-[#8A7680] mb-0 max-w-[42ch] mx-auto md:mx-0 vaida-animate-rise"
              style={{ animationDelay: '1.0s', animationDuration: '1s' }}
            >
              Rebuild confidence. Reclaim identity. Create financial courage — in the AI era and beyond.
            </p>
            <div 
              className="mt-[28px] md:mt-[34px] flex flex-col sm:flex-row justify-center md:justify-start gap-[14px] vaida-animate-rise"
              style={{ animationDelay: '1.1s', animationDuration: '1s' }}
            >
              <Link 
                href="#program" 
                className="inline-block font-bold text-[0.95rem] md:text-[1.05rem] py-[16px] px-[28px] md:px-[34px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-[#C9738F] text-white shadow-[0_12px_28px_rgba(201,115,143,0.35)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_18px_38px_rgba(201,115,143,0.45)] text-center"
              >
                Explore 6-Week Reset (£777) ↓
              </Link>
              <Link 
                href="https://calendly.com/vaidastone" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-bold text-[0.95rem] md:text-[1.05rem] py-[16px] px-[26px] md:px-[30px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-transparent text-[#7E3B54] hover:bg-[#FBEDF1] hover:-translate-y-[3px] text-center"
              >
                Book Vaida to Speak
              </Link>
            </div>
            
            <div 
              className="mt-[22px] vaida-animate-rise text-center md:text-left"
              style={{ animationDelay: '1.25s', animationDuration: '1s' }}
            >
              <Link 
                href="/vaida/ai" 
                className="inline-flex items-center gap-2 text-[0.88rem] font-bold text-[#A64E6E] bg-[rgba(251,237,241,0.7)] px-[16px] py-[8px] rounded-full border border-[#F6DCE5] hover:bg-[#FBEDF1] hover:border-[#C9738F] transition-all"
              >
                <span>🎁 Member Bonus: Claim Your Free AI Course Gift</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div 
            className="relative vaida-animate-rise vaida-morph-ring max-w-[280px] sm:max-w-[340px] md:max-w-none mx-auto w-full mt-[20px] md:mt-0"
            style={{ animationDelay: '0.6s', animationDuration: '1.1s' }}
          >
            <div className="relative w-full aspect-[4/5] vaida-portrait-shape overflow-hidden shadow-[0_30px_70px_rgba(126,59,84,0.22)]">
              <Image 
                src="/AmbVaidaStone.jpeg" 
                alt="Vaida V. Stone portrait" 
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
