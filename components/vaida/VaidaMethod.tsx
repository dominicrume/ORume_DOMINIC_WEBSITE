'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export function VaidaMethod() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-[34px]');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current.querySelectorAll('.vaida-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1140px] mx-auto px-[26px]">
      
      {/* YOU ARE SEEN */}
      <section className="text-center py-[110px] vaida-reveal opacity-0 translate-y-[34px] transition-all duration-[900ms] cubic-bezier(0.22, 1, 0.36, 1)">
        <p className="text-[0.82rem] tracking-[0.34em] uppercase text-[#C9738F] mb-[22px] font-bold">
          If no one has told you today
        </p>
        <h2 className="font-serif font-semibold text-[clamp(2rem,5vw,3.4rem)] max-w-[20ch] mx-auto italic text-[#7E3B54] leading-[1.08]">
          You have carried more than anyone knows — and you are still standing.
        </h2>
      </section>

      {/* METHOD */}
      <section className="py-[40px] pb-[110px]">
        <div className="text-center mb-[50px] vaida-reveal opacity-0 translate-y-[34px] transition-all duration-[900ms] cubic-bezier(0.22, 1, 0.36, 1)">
          <h2 className="font-serif font-semibold text-[clamp(2rem,4.5vw,3rem)] text-[#7E3B54] leading-[1.08]">
            The Always ENOUGH™ Method
          </h2>
          <p className="text-[#8A7680] max-w-[52ch] mx-auto mt-[14px] text-[1.05rem]">
            Everyone in finance starts with money and wonders why nothing changes. We start with you — and let the money follow the woman.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
          {/* Card 1 */}
          <div className="bg-white rounded-[26px] p-[44px_32px] text-center shadow-[0_12px_40px_rgba(126,59,84,0.08)] relative overflow-hidden group hover:-translate-y-[10px] hover:shadow-[0_28px_60px_rgba(126,59,84,0.16)] transition-all duration-400 vaida-reveal opacity-0 translate-y-[34px] transition-all duration-[900ms] cubic-bezier(0.22, 1, 0.36, 1)">
            <div className="absolute top-0 left-0 right-0 height-[4px] h-[4px] bg-gradient-to-r from-[#F3C6D5] to-[#D9B67C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="w-[72px] h-[72px] mx-auto mb-[22px] rounded-full bg-gradient-to-br from-[#F6DCE5] to-[#FDF9F5] flex items-center justify-center text-[1.8rem] group-hover:scale-[1.12] group-hover:-rotate-6 transition-transform duration-500">
              🕊️
            </div>
            <h3 className="font-serif font-semibold text-[1.9rem] text-[#7E3B54] mb-[12px]">Mind</h3>
            <p className="text-[#8A7680] text-[1rem]">Clarity and confidence that come from within — not from anyone&apos;s permission.</p>
          </div>
          
          {/* Card 2 */}
          <div 
            className="bg-white rounded-[26px] p-[44px_32px] text-center shadow-[0_12px_40px_rgba(126,59,84,0.08)] relative overflow-hidden group hover:-translate-y-[10px] hover:shadow-[0_28px_60px_rgba(126,59,84,0.16)] transition-all duration-400 vaida-reveal opacity-0 translate-y-[34px] transition-all duration-[900ms] cubic-bezier(0.22, 1, 0.36, 1)"
            style={{ transitionDelay: '0.12s' }}
          >
            <div className="absolute top-0 left-0 right-0 height-[4px] h-[4px] bg-gradient-to-r from-[#F3C6D5] to-[#D9B67C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="w-[72px] h-[72px] mx-auto mb-[22px] rounded-full bg-gradient-to-br from-[#F6DCE5] to-[#FDF9F5] flex items-center justify-center text-[1.8rem] group-hover:scale-[1.12] group-hover:-rotate-6 transition-transform duration-500">
              💛
            </div>
            <h3 className="font-serif font-semibold text-[1.9rem] text-[#7E3B54] mb-[12px]">Heart</h3>
            <p className="text-[#8A7680] text-[1rem]">Emotional resilience that carries you forward through every season of change.</p>
          </div>

          {/* Card 3 */}
          <div 
            className="bg-white rounded-[26px] p-[44px_32px] text-center shadow-[0_12px_40px_rgba(126,59,84,0.08)] relative overflow-hidden group hover:-translate-y-[10px] hover:shadow-[0_28px_60px_rgba(126,59,84,0.16)] transition-all duration-400 vaida-reveal opacity-0 translate-y-[34px] transition-all duration-[900ms] cubic-bezier(0.22, 1, 0.36, 1)"
            style={{ transitionDelay: '0.24s' }}
          >
            <div className="absolute top-0 left-0 right-0 height-[4px] h-[4px] bg-gradient-to-r from-[#F3C6D5] to-[#D9B67C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="w-[72px] h-[72px] mx-auto mb-[22px] rounded-full bg-gradient-to-br from-[#F6DCE5] to-[#FDF9F5] flex items-center justify-center text-[1.8rem] group-hover:scale-[1.12] group-hover:-rotate-6 transition-transform duration-500">
              🌿
            </div>
            <h3 className="font-serif font-semibold text-[1.9rem] text-[#7E3B54] mb-[12px]">Money</h3>
            <p className="text-[#8A7680] text-[1rem]">Financial courage that creates real, lasting freedom — on your own terms.</p>
          </div>
        </div>
      </section>

      {/* GIFT / COMMUNITY BONUS */}
      <section className="mb-[60px] vaida-reveal opacity-0 translate-y-[34px] transition-all duration-[900ms] cubic-bezier(0.22, 1, 0.36, 1)">
        <div className="bg-gradient-to-br from-[#FBEDF1] to-[#F6DCE5] rounded-[32px] p-[56px_36px] md:p-[66px_48px] text-center relative overflow-hidden border border-[rgba(201,115,143,0.2)]">
          <div className="absolute text-[14rem] text-[rgba(201,115,143,0.08)] right-[-20px] bottom-[-60px] font-serif leading-none select-none pointer-events-none">
            ✿
          </div>
          <div className="relative z-10 max-w-[700px] mx-auto">
            <span className="inline-block py-[5px] px-[16px] rounded-full bg-white border border-[#F6DCE5] text-[#C9738F] font-extrabold text-[0.75rem] tracking-[0.25em] uppercase mb-[16px]">
              Special Community Collaboration · Member Bonus
            </span>
            <h2 className="font-serif font-semibold text-[clamp(1.8rem,4vw,2.8rem)] text-[#7E3B54] mb-[12px] leading-[1.1]">
              Digital Courage in the AI Era
            </h2>
            <p className="text-[#A64E6E] font-semibold text-[1.05rem] mb-[18px]">
              In Partnership with Rume Dominic &amp; Vorem AI
            </p>
            <p className="text-[#4A3B41] max-w-[54ch] mx-auto mb-[32px] text-[1.05rem] leading-relaxed">
              While mastering your practical and emotional financial foundation is our primary mission, thriving in modern leadership also requires technological courage. As a member of the Always ENOUGH™ community, you receive complimentary access to our collaborative beginner&apos;s AI training course and blueprint.
            </p>
            <Link 
              href="/vaida/ai" 
              className="inline-block font-bold text-[1rem] py-[16px] px-[34px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-[#C9738F] text-white shadow-[0_10px_24px_rgba(201,115,143,0.35)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(201,115,143,0.45)]"
            >
              Explore Your Free AI Bonus Gift →
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
