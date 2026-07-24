import React from 'react';
import Image from 'next/image';

const aiHeroStyles = `
  @keyframes vaidaRise {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatBook {
    0%, 100% { 
      transform: translateY(0px) rotate(-1deg); 
      filter: drop-shadow(0 20px 30px rgba(126,59,84,0.15)); 
    }
    50% { 
      transform: translateY(-15px) rotate(2deg); 
      filter: drop-shadow(0 30px 45px rgba(126,59,84,0.25)); 
    }
  }
`;

export function VaidaAIHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aiHeroStyles }} />
      <section className="pt-[70px] pb-[40px] px-[26px] max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[40px] md:gap-[80px] items-center">
        
        {/* Left Side: Text Content */}
        <div className="text-center lg:text-left z-10 relative">
          <p 
            className="text-[0.82rem] tracking-[0.34em] uppercase text-[#C9738F] font-bold mb-[26px]"
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
            className="text-[1.2rem] text-[#8A7680] max-w-[42ch] mx-auto lg:mx-0 mb-[44px]"
            style={{ animationDelay: '0.75s', animationDuration: '1s', opacity: 0, animation: 'vaidaRise 1s ease forwards' }}
          >
            No coding. No jargon. Just practical skills to boost your career and reclaim your time.
          </p>
          
          <div 
            className="flex flex-wrap justify-center lg:justify-start gap-[30px] md:gap-[50px]"
            style={{ animationDelay: '0.95s', animationDuration: '1s', opacity: 0, animation: 'vaidaRise 1s ease forwards' }}
          >
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-serif font-bold text-[2.2rem] text-[#A64E6E] leading-none mb-[8px]">100%</span>
              <span className="text-[0.85rem] font-bold text-[#8A7680] uppercase tracking-[0.12em]">Beginner Friendly</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-serif font-bold text-[2.2rem] text-[#A64E6E] leading-none mb-[8px]">9</span>
              <span className="text-[0.85rem] font-bold text-[#8A7680] uppercase tracking-[0.12em]">Days</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-serif font-bold text-[2.2rem] text-[#A64E6E] leading-none mb-[8px]">$0</span>
              <span className="text-[0.85rem] font-bold text-[#8A7680] uppercase tracking-[0.12em]">Free for you</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Book Photo */}
        <div 
          style={{ animationDelay: '0.4s', opacity: 0, animation: 'vaidaRise 1.2s ease forwards' }}
          className="w-full z-10 pt-[20px] lg:pt-0"
        >
          <div 
            className="relative w-full aspect-[4/5] max-w-[400px] mx-auto"
            style={{ animation: 'floatBook 6.5s ease-in-out infinite' }}
          >
            {/* Subtle glow behind the book */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F5]/60 to-transparent rounded-[24px] z-20 pointer-events-none mix-blend-overlay"></div>
            <Image 
              src="/vaida-book-photo.jpeg"
              alt="Always ENOUGH - AI Course"
              fill
              priority
              className="object-cover rounded-[24px] shadow-[0_20px_40px_rgba(126,59,84,0.18)] border border-[rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
