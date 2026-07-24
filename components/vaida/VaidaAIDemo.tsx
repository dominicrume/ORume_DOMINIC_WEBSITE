'use client';

import React, { useState, useRef } from 'react';

const CANNED_RESPONSES = [
  "Subject: Re: Project Opportunity\n\nHi [Name],\n\nThank you so much for thinking of me for this project! While it sounds like a great initiative, I am currently focusing my bandwidth on projects that align with my current minimum rate of [Rate]. \n\nIf your budget opens up in the future, I'd love to stay in touch. Wishing you the best with the launch!\n\nWarmly,\n[Your Name]",
  "Take a deep breath. You are not an imposter; you are expanding. \n\nEvery time you step into a new level of leadership, your brain will try to protect you by telling you that you don't belong. Thank it for trying to keep you safe, but remind it: You have the receipts. You have done the work. You are exactly where you are supposed to be.\n\nNow go out there and own the room.",
  "Week 1: Clarity & Market Research\n- Define your exact target audience.\n- Interview 3 ideal clients.\n\nWeek 2: The Offer\n- Outline your core offering and price it based on value, not hours.\n\nWeek 3: The System\n- Set up a simple landing page and payment processor.\n\nWeek 4: The Launch\n- Announce to your network. Send 10 direct outreach messages.\n\nYou have everything you need to start. Day 1 is today."
];

export function VaidaAIDemo() {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Use a ref to track if we should stop typing if a new button is clicked
  const activeTypingId = useRef(0);

  const runDemo = async (idx: number) => {
    if (isTyping) return; // Prevent multiple clicks while typing
    setIsTyping(true);
    setHasStarted(true);
    setDisplayText('');
    
    const currentId = Date.now();
    activeTypingId.current = currentId;
    
    const text = CANNED_RESPONSES[idx];
    let currentText = '';
    
    for (let i = 0; i < text.length; i++) {
      // Abort if another click happened (though we blocked it with isTyping, good practice)
      if (activeTypingId.current !== currentId) break;
      
      currentText += text[i];
      setDisplayText(currentText);
      
      // Random delay between 15-45ms for realistic typing
      await new Promise(r => setTimeout(r, 15 + Math.random() * 30));
    }
    
    setIsTyping(false);
  };

  return (
    <section className="py-[60px] px-[26px]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .vaida-cursor {
          display: inline-block;
          width: 8px;
          height: 1.2em;
          background-color: #C9738F;
          vertical-align: text-bottom;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
      `}} />
      
      <div className="max-w-[800px] mx-auto bg-white/70 backdrop-blur-xl border border-white rounded-[24px] shadow-[0_30px_80px_rgba(126,59,84,0.12)] overflow-hidden">
        
        {/* Fake window header */}
        <div className="bg-[#FBEDF1] p-[16px_22px] flex items-center gap-[8px] border-b border-[#F6DCE5]">
          <div className="w-[12px] h-[12px] rounded-full bg-[#C9738F]"></div>
          <div className="w-[12px] h-[12px] rounded-full bg-[#CBA167]"></div>
          <div className="w-[12px] h-[12px] rounded-full bg-[#8A7680]"></div>
        </div>
        
        <div className="p-[30px] md:p-[44px]">
          <p className="text-[#A64E6E] font-bold text-[0.9rem] mb-[16px] uppercase tracking-[0.1em]">
            Ask the AI:
          </p>
          
          <div className="flex flex-col gap-[12px] mb-[30px]">
            <button 
              onClick={() => runDemo(0)}
              disabled={isTyping}
              className={`text-left bg-[#FDF9F5] border border-[#F6DCE5] p-[16px_20px] rounded-[16px] text-[#7E3B54] font-medium text-[1rem] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(126,59,84,0.06)] hover:border-[#C9738F] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              &quot;Write a polite but firm email declining a low-paying gig.&quot;
            </button>
            <button 
              onClick={() => runDemo(1)}
              disabled={isTyping}
              className={`text-left bg-[#FDF9F5] border border-[#F6DCE5] p-[16px_20px] rounded-[16px] text-[#7E3B54] font-medium text-[1rem] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(126,59,84,0.06)] hover:border-[#C9738F] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              &quot;Help me overcome imposter syndrome before this big presentation.&quot;
            </button>
            <button 
              onClick={() => runDemo(2)}
              disabled={isTyping}
              className={`text-left bg-[#FDF9F5] border border-[#F6DCE5] p-[16px_20px] rounded-[16px] text-[#7E3B54] font-medium text-[1rem] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(126,59,84,0.06)] hover:border-[#C9738F] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              &quot;Draft a 30-day plan to launch my side hustle.&quot;
            </button>
          </div>
          
          <div className="bg-[#4A3B41] rounded-[18px] p-[24px] md:p-[32px] min-h-[220px] text-[1.1rem] leading-[1.6] text-white shadow-inner font-mono">
            {!hasStarted ? (
              <span className="text-[#8A7680] font-sans">Select a prompt above to see AI in action...</span>
            ) : (
              <span className="whitespace-pre-wrap font-sans">
                {displayText}
              </span>
            )}
            <span className="vaida-cursor" style={{ display: hasStarted ? 'inline-block' : 'none' }}></span>
          </div>
          
        </div>
      </div>
    </section>
  );
}
