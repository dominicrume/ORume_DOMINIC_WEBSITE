/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const phrases = [
  "Learn AI in 9 days — free.",
  "Build with AI.",
  "Earn with AI.",
  "AI na our own. 🌍"
];

export function IconicHero() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const tick = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting && charIndex <= currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, charIndex));
        setCharIndex(prev => prev + 1);
        timeout = setTimeout(tick, 70);
      } else if (isDeleting && charIndex >= 0) {
        setDisplayText(currentPhrase.substring(0, charIndex));
        setCharIndex(prev => prev - 1);
        timeout = setTimeout(tick, 40);
      } else if (!isDeleting && charIndex > currentPhrase.length) {
        setIsDeleting(true);
        timeout = setTimeout(tick, 1400); // pause before deleting
      } else if (isDeleting && charIndex < 0) {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % phrases.length);
        setCharIndex(0);
        timeout = setTimeout(tick, 240); // pause before typing next
      }
    };

    timeout = setTimeout(tick, 70);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className="relative z-10 pt-10 pb-6 lg:pt-14">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6 mb-12">
          <div className="flex flex-col gap-[3px]">
            <span className="font-serif font-extrabold text-[26px] tracking-[0.5px] text-[#F5F1E8] leading-none inline-flex items-baseline">
              IC<span className="text-[#D3132F]">O</span>NIC
            </span>
            <span className="text-[9.5px] tracking-[3.5px] text-[#A79F8E] uppercase font-semibold">
              International Holdings
            </span>
          </div>
          <Link 
            href="#claim" 
            className="hidden md:inline-block text-[12px] tracking-[1px] uppercase text-[#C9A24B] border border-[#8f7433] px-[18px] py-[9px] rounded font-semibold transition-colors duration-200 hover:bg-[#C9A24B] hover:text-[#1a1406]"
          >
            Start free
          </Link>
        </nav>
        
        {/* Hairline divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8f7433] to-transparent opacity-60 mb-12 lg:mb-16"></div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <h1 className="font-serif font-extrabold text-[36px] sm:text-[5vw] lg:text-[64px] leading-[1.03] tracking-[-0.5px]">
              They said AI is<br/>not for us. <em className="italic text-[#C9A24B]">Na lie.</em>
            </h1>
            <div className="font-serif italic text-[#E7C877] text-[17px] sm:text-[2.6vw] lg:text-[22px] mt-[14px] min-h-[1.4em]">
              <span>{displayText}</span><span className="text-[#C9A24B] not-italic animate-pulse">▌</span>
            </div>
            <p className="text-[#EDE7D8] opacity-86 text-[15px] lg:text-[17px] mt-5 max-w-[530px]">
              You've watched the world talk about artificial intelligence like it belongs to someone else. It doesn't. Get the free book <b className="text-[#F5F1E8]">“From Code to Consciousness”</b> and the <b className="text-[#F5F1E8]">“Master AI in Nine Days”</b> course — no coding, no payment, on your phone. An initiative of <b className="text-[#F5F1E8]">Iconic</b>, Africa's premier recognition platform. <b className="text-[#F5F1E8]">12,000+ young Africans</b> already trained.
            </p>
            <div className="flex flex-wrap gap-[14px] items-center mt-[26px]">
              <Link 
                href="#claim" 
                className="bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold text-[15px] rounded-md px-[28px] py-[15px] tracking-[0.4px] uppercase transition-all duration-150 hover:-translate-y-[1px] shadow-[0_16px_34px_-14px_rgba(201,162,75,0.6)] hover:shadow-[0_20px_40px_-14px_rgba(201,162,75,0.8)]"
              >
                Get free access
              </Link>
              <Link 
                href="#try" 
                className="border border-[#2C2A33] text-[#EDE7D8] px-[24px] py-[15px] rounded-md font-semibold text-[14px] transition-colors duration-200 hover:border-[#C9A24B]"
              >
                ▶ Try live AI first
              </Link>
            </div>
          </div>

          {/* Portrait */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[290px] lg:max-w-[380px] aspect-[4/5] rounded-md bg-gradient-to-br from-[#20202a] to-[#101015] border border-[#8f7433] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9),inset_0_0_0_8px_rgba(11,11,14,0.9),inset_0_0_0_9px_rgba(201,162,75,0.35)] overflow-hidden flex items-end">
              <span className="absolute top-[16px] right-[-1px] bg-[#D3132F] text-white text-[9.5px] tracking-[2px] font-bold py-[6px] px-[14px] uppercase z-10 shadow-[0_8px_20px_-8px_rgba(211,19,47,0.7)]">
                Iconic
              </span>
              
              <Image 
                src="/AmbDrTemisanOLouis.jpg" 
                alt="Amb. Dr. Temisan O. Louis" 
                fill 
                className="object-cover" 
                priority
              />

              <div className="relative z-10 w-full p-5 pt-[18px] bg-gradient-to-t from-[rgba(7,7,10,0.95)] via-[rgba(7,7,10,0.6)] to-transparent">
                <div className="font-serif font-bold text-[19px] text-[#F5F1E8]">Amb. Dr. Temisan O. Louis</div>
                <div className="text-[11px] tracking-[1.2px] text-[#C9A24B] uppercase mt-[3px]">President &amp; Founder, Iconic</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
