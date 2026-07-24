/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type QuizPath = 'creator' | 'hustler' | 'builder' | 'analyst';

export function IconicQuiz() {
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState<Record<QuizPath, number>>({
    creator: 0,
    hustler: 0,
    builder: 0,
    analyst: 0
  });

  const handleOptionClick = (path: QuizPath) => {
    setTally(prev => ({ ...prev, [path]: prev[path] + 1 }));
    setStep(prev => prev + 1);
  };

  const handlePlayAgain = () => {
    setTally({ creator: 0, hustler: 0, builder: 0, analyst: 0 });
    setStep(0);
  };

  const getWinner = (): QuizPath => {
    return (Object.keys(tally) as QuizPath[]).reduce((a, b) => tally[a] >= tally[b] ? a : b);
  };

  const results: Record<QuizPath, { emoji: string; title: string; desc: React.ReactNode }> = {
    creator: {
      emoji: "🎨",
      title: "The AI Creator",
      desc: "You'll make images, viral content and posts that stop the scroll. Days 2 & 6 are your playground."
    },
    hustler: {
      emoji: "💰",
      title: "The AI Hustler",
      desc: "You'll turn AI into real income — fast. Day 9 helps you launch your own small AI business."
    },
    builder: {
      emoji: "🛠️",
      title: "The AI Builder",
      desc: "You'll build with AI — a chatbot on Day 4, your first website on Day 7."
    },
    analyst: {
      emoji: "📊",
      title: "The AI Analyst",
      desc: "You'll automate the busywork and see what others miss — Day 5's AI agents are your edge."
    }
  };

  return (
    <section className="relative z-10 pt-0 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-[720px] mx-auto">
          <div className="text-[11px] tracking-[3px] uppercase text-[#C9A24B] font-semibold">60-second game</div>
          <h2 className="font-serif font-extrabold text-[27px] md:text-[42px] leading-[1.12] tracking-[-0.3px] my-[14px]">
            What's your AI superpower?
          </h2>
          <p className="text-[#EDE7D8] opacity-82 text-[16px]">
            Answer three quick questions and discover the AI path that fits you — then start it free.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto mt-9 bg-gradient-to-b from-[#17171E] to-[#131318] border border-[#2C2A33] rounded-[14px] p-[30px]">
          
          {/* Progress Bar */}
          <div className="h-[5px] bg-[#07070b] rounded-full overflow-hidden mb-[22px]">
            <div 
              className="h-full bg-gradient-to-r from-[#C9A24B] to-[#E7C877] transition-all duration-300"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          {step === 0 && (
            <div className="animate-in fade-in duration-300">
              <div className="font-serif text-[22px] font-bold mb-[18px]">What excites you most?</div>
              <div className="grid gap-[10px]">
                <button onClick={() => handleOptionClick('creator')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">Creating things people love</button>
                <button onClick={() => handleOptionClick('hustler')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">Making money &amp; opportunities</button>
                <button onClick={() => handleOptionClick('builder')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">Solving problems &amp; building</button>
                <button onClick={() => handleOptionClick('analyst')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">Understanding people &amp; data</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <div className="font-serif text-[22px] font-bold mb-[18px]">Your ideal win this year?</div>
              <div className="grid gap-[10px]">
                <button onClick={() => handleOptionClick('creator')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">A post or brand that goes viral</button>
                <button onClick={() => handleOptionClick('hustler')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">A brand-new income stream</button>
                <button onClick={() => handleOptionClick('builder')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">An app or tool you built</button>
                <button onClick={() => handleOptionClick('analyst')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">Insights that make you the smartest in the room</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-300">
              <div className="font-serif text-[22px] font-bold mb-[18px]">Friends would call you…</div>
              <div className="grid gap-[10px]">
                <button onClick={() => handleOptionClick('creator')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">The creative one</button>
                <button onClick={() => handleOptionClick('hustler')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">The hustler</button>
                <button onClick={() => handleOptionClick('builder')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">The techie</button>
                <button onClick={() => handleOptionClick('analyst')} className="text-left bg-[#0d0d13] border border-[#2C2A33] text-[#F5F1E8] rounded-[9px] px-4 py-[14px] font-sans text-[15px] transition-colors hover:border-[#C9A24B] hover:bg-[#14141c]">The deep thinker</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-in fade-in duration-400">
              <div className="text-[56px] leading-none">{results[getWinner()].emoji}</div>
              <div className="font-serif text-[28px] font-extrabold text-[#C9A24B] mt-[8px] mb-[6px]">
                {results[getWinner()].title}
              </div>
              <div className="text-[#EDE7D8] opacity-85 text-[15.5px] max-w-[440px] mx-auto mb-[18px]">
                {results[getWinner()].desc}
              </div>
              <Link 
                href="#claim" 
                className="inline-block bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold text-[15px] rounded-md px-[28px] py-[15px] tracking-[0.4px] uppercase transition-all duration-150 hover:-translate-y-[1px] shadow-[0_16px_34px_-14px_rgba(201,162,75,0.6)]"
              >
                Start my free 9-day path
              </Link>
              <div className="mt-[14px]">
                <button 
                  onClick={handlePlayAgain}
                  className="text-[12.5px] text-[#A79F8E] cursor-pointer hover:text-[#C9A24B] transition-colors"
                >
                  ↺ Play again
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
