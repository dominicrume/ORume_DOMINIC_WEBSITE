import React from 'react';

export function VaidaAIHero() {
  return (
    <section className="text-center pt-[70px] pb-[40px] px-[26px]">
      <p 
        className="text-[0.82rem] tracking-[0.34em] uppercase text-[#C9738F] font-bold mb-[26px] vaida-animate-rise"
        style={{ animationDelay: '0.2s', opacity: 0, animation: 'vaidaRise 0.9s ease forwards' }}
      >
        Exclusively for the Always ENOUGH™ Community
      </p>
      
      <h1 className="font-serif font-semibold text-[clamp(2.8rem,6.5vw,5rem)] mb-[22px] leading-[1.08] text-[#7E3B54]">
        <span 
          className="block"
          style={{ animationDelay: '0.35s', animationDuration: '1s', opacity: 0, animation: 'vaidaRise 1s ease forwards' }}
        >
          Master AI in
        </span>
        <span 
          className="block text-[#A64E6E] italic"
          style={{ animationDelay: '0.55s', animationDuration: '1s', opacity: 0, animation: 'vaidaRise 1s ease forwards' }}
        >
          9 days.
        </span>
      </h1>
      
      <p 
        className="text-[1.2rem] text-[#8A7680] max-w-[42ch] mx-auto mb-[44px]"
        style={{ animationDelay: '0.75s', animationDuration: '1s', opacity: 0, animation: 'vaidaRise 1s ease forwards' }}
      >
        No coding. No jargon. Just practical skills to boost your career and reclaim your time.
      </p>
      
      <div 
        className="flex flex-wrap justify-center gap-[30px] md:gap-[60px]"
        style={{ animationDelay: '0.95s', animationDuration: '1s', opacity: 0, animation: 'vaidaRise 1s ease forwards' }}
      >
        <div className="flex flex-col items-center">
          <span className="font-serif font-bold text-[2.2rem] text-[#A64E6E] leading-none mb-[8px]">100%</span>
          <span className="text-[0.85rem] font-bold text-[#8A7680] uppercase tracking-[0.12em]">Beginner Friendly</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-serif font-bold text-[2.2rem] text-[#A64E6E] leading-none mb-[8px]">9</span>
          <span className="text-[0.85rem] font-bold text-[#8A7680] uppercase tracking-[0.12em]">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-serif font-bold text-[2.2rem] text-[#A64E6E] leading-none mb-[8px]">$0</span>
          <span className="text-[0.85rem] font-bold text-[#8A7680] uppercase tracking-[0.12em]">Free for you</span>
        </div>
      </div>
    </section>
  );
}
