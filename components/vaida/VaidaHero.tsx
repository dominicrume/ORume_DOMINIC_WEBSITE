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
      <div className="max-w-[1140px] mx-auto px-[26px]">
        <section className="min-h-[92vh] md:min-h-0 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[36px] md:gap-[56px] items-center py-[24px] md:py-[40px] mb-[60px] md:mb-0">
          
          <div>
            <p 
              className="text-[0.82rem] tracking-[0.34em] uppercase text-[#A64E6E] font-bold mb-[26px] vaida-animate-rise"
              style={{ animationDelay: '0.2s' }}
            >
              Always ENOUGH™ · Mind · Heart · Money
            </p>
            <h1 className="font-serif font-semibold text-[clamp(2.8rem,6.5vw,5rem)] mb-2 leading-[1.08] text-[#7E3B54]">
              <span className="block vaida-animate-rise" style={{ animationDelay: '0.35s', animationDuration: '1s' }}>You are</span>
              <span className="block vaida-animate-rise" style={{ animationDelay: '0.55s', animationDuration: '1s' }}>already</span>
              <span className="block vaida-animate-rise text-[#A64E6E] italic" style={{ animationDelay: '0.75s', animationDuration: '1s' }}>enough.</span>
            </h1>
            <p 
              className="text-[1.2rem] color-[#8A7680] text-[#8A7680] mt-[26px] mb-0 max-w-[34ch] vaida-animate-rise"
              style={{ animationDelay: '0.95s', animationDuration: '1s' }}
            >
              Rebuild confidence. Reclaim identity. Create financial courage — in the AI era and beyond.
            </p>
            <div 
              className="mt-[34px] flex gap-[16px] flex-wrap vaida-animate-rise"
              style={{ animationDelay: '1.15s', animationDuration: '1s' }}
            >
              <Link 
                href="/vaida" 
                className="inline-block font-bold text-[1rem] py-[15px] px-[30px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-[#C9738F] text-white shadow-[0_10px_24px_rgba(201,115,143,0.35)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(201,115,143,0.45)]"
              >
                Book Vaida to speak
              </Link>
              <Link 
                href="/vaida/ai" 
                className="inline-block font-bold text-[1rem] py-[15px] px-[30px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-transparent text-[#A64E6E] hover:bg-[#FBEDF1] hover:-translate-y-[3px]"
              >
                Your free AI gift
              </Link>
            </div>
          </div>

          <div 
            className="relative vaida-animate-rise vaida-morph-ring"
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
