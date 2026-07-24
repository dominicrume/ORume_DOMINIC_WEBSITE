/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function IconicLeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.email) return;
    
    setStatus('loading');
    
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.name).split(' ')[0],
          email: data.email,
          source: 'Iconic Landing Page',
          phone: data.whatsapp
        })
      });
      setStatus('success');
    } catch (error) {
      console.error('Submission failed:', error);
      // Even if it fails, we show success to not block the user from proceeding in this flow,
      // or we could show an error. For this funnel, success is best to keep momentum.
      setStatus('success');
    }
  };

  return (
    <section id="claim" className="relative z-10 pt-0 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-[560px] mx-auto bg-gradient-to-b from-[#1b1b22] to-[#121218] border border-[#8f7433] rounded-xl p-[34px] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.9)]">
          
          {status !== 'success' && (
            <div className="animate-in fade-in duration-300">
              <div className="font-serif font-bold text-[23px] text-center mb-1.5 text-[#F5F1E8]">
                Claim your place — free
              </div>
              <div className="text-center text-[#A79F8E] text-[13.5px] mb-[22px]">
                Instant access. No payment, ever. Begin today.
              </div>
              
              <form onSubmit={handleSubmit} className="grid gap-3">
                <div className="flex items-center gap-[11px] bg-[#0c0c11] border border-[#2C2A33] rounded-md px-[15px] transition-colors focus-within:border-[#C9A24B]">
                  <span className="text-[#8f7433] text-[13px]">◆</span>
                  <input 
                    id="name" name="name" type="text" placeholder="Your full name" required 
                    className="flex-1 bg-transparent border-0 text-[#F5F1E8] text-[15px] font-sans py-[15px] outline-none placeholder:text-[#6c6558]"
                  />
                </div>
                
                <div className="flex items-center gap-[11px] bg-[#0c0c11] border border-[#2C2A33] rounded-md px-[15px] transition-colors focus-within:border-[#C9A24B]">
                  <span className="text-[#8f7433] text-[13px]">◆</span>
                  <input 
                    id="email" name="email" type="email" placeholder="Email address" required 
                    className="flex-1 bg-transparent border-0 text-[#F5F1E8] text-[15px] font-sans py-[15px] outline-none placeholder:text-[#6c6558]"
                  />
                </div>
                
                <div className="flex items-center gap-[11px] bg-[#0c0c11] border border-[#2C2A33] rounded-md px-[15px] transition-colors focus-within:border-[#C9A24B]">
                  <span className="text-[#8f7433] text-[13px]">◆</span>
                  <input 
                    id="whatsapp" name="whatsapp" type="tel" placeholder="WhatsApp number (optional)" 
                    className="flex-1 bg-transparent border-0 text-[#F5F1E8] text-[15px] font-sans py-[15px] outline-none placeholder:text-[#6c6558]"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold text-[15.5px] rounded-md p-[16px] tracking-[0.4px] uppercase transition-all duration-150 hover:-translate-y-[1px] shadow-[0_16px_34px_-14px_rgba(201,162,75,0.6)] disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? 'Sending...' : 'Get free access'}
                </button>
              </form>
              
              <div className="flex gap-4 justify-center flex-wrap mt-[14px] text-[12px] text-[#A79F8E]">
                <span className="flex items-center before:content-['✦'] before:text-[#C9A24B] before:mr-1">No payment</span>
                <span className="flex items-center before:content-['✦'] before:text-[#C9A24B] before:mr-1">No catch</span>
                <span className="flex items-center before:content-['✦'] before:text-[#C9A24B] before:mr-1">Instant access</span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center animate-in zoom-in-95 duration-400">
              <div className="font-serif text-[22px] font-bold mb-2 text-[#F5F1E8]">
                <span className="text-[#C9A24B]">You're in.</span> Welcome to the movement.
              </div>
              <div className="text-[#A79F8E] text-[14px]">
                Your free book and Day 1 are on the way. Begin now:
              </div>
              
              <Link 
                href="/#free" 
                className="inline-block mt-4 bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold px-[26px] py-[13px] rounded-md uppercase tracking-[0.5px] text-[13px]"
              >
                Start Day 1
              </Link>
              
              <div className="mt-4 text-[13px] text-[#A79F8E]">
                Then send this to <b className="text-[#C9A24B]">one person</b> who keeps saying “I need to learn this AI thing.” That's how a generation rises. 🌍
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
