/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function IconicFooter() {
  const currentYear = new Date().getFullYear();
  const shareUrl = "https://rumedominic.com/iconic";
  const shareMsg = encodeURIComponent("🎓 They said AI is not for us. Na lie. Get a FREE AI book + 9-day beginner course (no payment, no coding) — and try live AI now. AI na our own 🌍 " + shareUrl);

  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="relative z-10 pt-0 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-[720px] mx-auto">
            <div className="text-[11px] tracking-[3px] uppercase text-[#C9A24B] font-semibold">Answers</div>
            <h2 className="font-serif font-extrabold text-[27px] md:text-[42px] leading-[1.12] tracking-[-0.3px] my-[14px]">
              Questions, answered
            </h2>
          </div>
          
          <div className="max-w-[820px] mx-auto mt-9 grid gap-3">
            {[
              {
                q: "Is the AI course really free?",
                a: "Yes — 100% free. The book “From Code to Consciousness” and the “Master AI in Nine Days” course cost nothing. No payment, no hidden charges. You only enter your name and email for instant access."
              },
              {
                q: "Do I need a laptop or coding experience?",
                a: "No. It's built for complete beginners and works on your smartphone. No laptop, no tech background, no coding required."
              },
              {
                q: "What will I actually learn?",
                a: "Nine practical days: (1) prompt engineering — get anything from AI, (2) create & edit images, (3) build slides & presentations, (4) build your own chatbot, (5) build AI agents that automate YouTube & social media, (6) write viral content, (7) build simple websites with AI, (8) turn one content into many, (9) start your own small AI business. Videos, editing and automation tools included."
              },
              {
                q: "Can I try AI before signing up?",
                a: "Yes — scroll up to the live AI demo and run it right in your browser, including real Python, before you enrol."
              },
              {
                q: "How long does it take?",
                a: "Nine days. Each day is one short lesson of about 20–30 minutes — beginner to genuinely capable."
              },
              {
                q: "Who is behind this?",
                a: "An initiative of Iconic — Africa's premier recognition platform, led by Amb. Dr. Temisan O. Louis — powered by VOREM Institute of Technology, founded by AI educator Rume Dominic, who has trained over 12,000 young Africans."
              },
              {
                q: "Do I get a certificate?",
                a: "Yes. Complete the nine days to earn your certificate, and the most outstanding graduates are recognised on the Iconic platform."
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-[#131318] border border-[#2C2A33] rounded-lg px-[22px] transition-colors open:border-[#8f7433]" open={i === 0}>
                <summary className="list-none cursor-pointer py-5 font-serif font-bold text-[17px] flex justify-between items-center gap-4 text-[#F5F1E8]">
                  {faq.q}
                  <span className="text-[#C9A24B] text-[24px] font-sans flex-none transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="pb-5 text-[#A79F8E] text-[15px]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Share Strip */}
      <div className="relative z-10 text-center bg-gradient-to-br from-[#141018] to-[#0d0b10] border-y border-[#2C2A33]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="text-[11px] tracking-[3px] uppercase text-[#C9A24B] font-semibold mb-1.5 block">Move the movement</div>
          <h2 className="font-serif font-extrabold text-[27px] md:text-[32px] leading-[1.12] tracking-[-0.3px] mb-2 text-[#F5F1E8]">
            One share can change one life.
          </h2>
          <p className="text-[#EDE7D8] opacity-82 max-w-[560px] mx-auto mb-6">
            Someone in your contacts keeps saying they want to learn AI. Send them this. That's how “AI na our own” becomes true for a whole generation.
          </p>
          
          <div className="flex gap-3 justify-center flex-wrap">
            <a 
              href={`https://wa.me/?text=${shareMsg}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[9px] rounded-lg px-[22px] py-[14px] font-bold text-[14.5px] tracking-[0.3px] transition-transform hover:-translate-y-0.5 bg-[#25D366] text-[#04240f]"
            >
              💬 Share on WhatsApp
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareMsg}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[9px] rounded-lg px-[22px] py-[14px] font-bold text-[14.5px] tracking-[0.3px] transition-transform hover:-translate-y-0.5 bg-[#1c1c22] text-[#F5F1E8] border border-[#2C2A33]"
            >
              Share on X
            </a>
            <button 
              onClick={handleCopy}
              className="inline-flex items-center gap-[9px] rounded-lg px-[22px] py-[14px] font-bold text-[14.5px] tracking-[0.3px] transition-transform hover:-translate-y-0.5 bg-[#1c1c22] text-[#F5F1E8] border border-[#2C2A33]"
            >
              {linkCopied ? "✓ Link copied" : "🔗 Copy link"}
            </button>
          </div>
        </div>
      </div>

      {/* Engine Text */}
      <div className="relative z-10 text-center pt-[34px]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 text-[11px] tracking-[2px] uppercase text-[#A79F8E]">
            Technology &amp; curriculum engine &nbsp;·&nbsp; <b className="text-[#EDE7D8] font-semibold tracking-[1.5px]">VOREM Institute of Technology</b>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2C2A33] mt-11 pt-[34px] pb-[90px]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8f7433] to-transparent opacity-60 mb-[28px]"></div>
          
          <div className="flex justify-between items-center gap-5 flex-wrap">
            <div className="text-[12px] text-[#A79F8E]">
              <span className="font-serif font-extrabold text-[18px] tracking-[0.5px] text-[#F5F1E8] leading-none inline-flex items-baseline">
                IC<span className="text-[#D3132F]">O</span>NIC
              </span> &nbsp; © {currentYear} Iconic International Holdings · <b className="text-[#C9A24B]">Africa's Premier Recognition Platform</b>
            </div>
            <div className="text-[12px] text-[#A79F8E]">
              Powered by VOREM Institute of Technology · <Link href="/" className="text-[#EDE7D8] hover:text-[#C9A24B]">rumedominic.com</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed left-0 right-0 bottom-0 z-20 bg-[rgba(11,11,14,0.92)] backdrop-blur-[8px] border-t border-[#8f7433] p-[12px_16px] flex items-center justify-between gap-3">
        <div className="text-[12.5px] text-[#EDE7D8]">
          <b className="text-[#C9A24B]">Free</b> AI book + 9-day course
        </div>
        <Link 
          href="#claim"
          className="bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold text-[13px] px-[18px] py-[11px] rounded-md uppercase whitespace-nowrap"
        >
          Get free access
        </Link>
      </div>
    </>
  );
}
