'use client';

import React from 'react';
import Link from 'next/link';

export function VaidaSpeaker() {
  return (
    <section id="speaker" className="py-[90px] px-[20px] md:px-[26px] bg-white relative">
      <div className="max-w-[1140px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[40px] md:gap-[60px] items-center">
          
          {/* Left Column: Authority Badge & Bio */}
          <div>
            <span className="inline-block py-[6px] px-[16px] rounded-full bg-[#FDF9F5] border border-[#D9B67C] text-[#856949] font-bold text-[0.75rem] tracking-[0.22em] uppercase mb-[18px]">
              25+ Years Experience · Author · Keynote Speaker
            </span>
            <h2 className="font-serif font-semibold text-[clamp(2rem,4.5vw,3.2rem)] text-[#7E3B54] mb-[20px] leading-[1.08]">
              Meet Vaida V. Stone
            </h2>
            <p className="text-[#4A3B41] text-[1.1rem] font-medium leading-relaxed mb-[16px]">
              An esteemed Educator, Author of <em className="text-[#A64E6E] font-serif">&ldquo;You Are Already Enough&rdquo;</em>, Former Financial Protection Adviser, and International Keynote Speaker dedicated to women 40+.
            </p>
            <p className="text-[#8A7680] text-[1rem] leading-relaxed mb-[24px]">
              For over two and a half decades, Vaida has guided women through the practical and emotional intersections of money, identity, and life transitions. She knows firsthand that money carries a quiet emotional weight — and that true financial security begins when structure meets empathy.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[16px] py-[20px] border-y border-[#F6DCE5] mb-[28px]">
              <div>
                <span className="font-serif font-bold text-[2rem] text-[#7E3B54] block leading-none">25+</span>
                <span className="text-[0.8rem] text-[#8A7680] uppercase tracking-wider font-semibold">Years Experience</span>
              </div>
              <div>
                <span className="font-serif font-bold text-[2rem] text-[#7E3B54] block leading-none">40+</span>
                <span className="text-[0.8rem] text-[#8A7680] uppercase tracking-wider font-semibold">Women Mentored</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-serif font-bold text-[2rem] text-[#7E3B54] block leading-none">Global</span>
                <span className="text-[0.8rem] text-[#8A7680] uppercase tracking-wider font-semibold">Keynote Speaker</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-[14px]">
              <Link
                href="https://calendly.com/vaidastone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-bold text-[0.95rem] py-[14px] px-[28px] rounded-full transition-all duration-300 bg-[#7E3B54] text-white shadow-[0_8px_20px_rgba(126,59,84,0.3)] hover:-translate-y-[2px] hover:bg-[#682F44]"
              >
                Book Vaida for Keynotes &amp; Panels
              </Link>
              <Link
                href="https://always-enough-foundation-d97cg09.gamma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-bold text-[0.95rem] py-[14px] px-[26px] rounded-full transition-all duration-300 border border-[#C9738F] text-[#A64E6E] hover:bg-[#FBEDF1]"
              >
                Explore The Book &amp; Mission
              </Link>
            </div>
          </div>

          {/* Right Column: Signature Speaking Topics */}
          <div className="bg-[#FDF9F5] rounded-[30px] p-[32px] sm:p-[44px] border border-[rgba(201,115,143,0.2)] shadow-[0_15px_45px_rgba(126,59,84,0.06)]">
            <h3 className="font-serif font-bold text-[1.6rem] text-[#7E3B54] mb-[6px]">
              Signature Keynote &amp; Workshop Topics
            </h3>
            <p className="text-[#8A7680] text-[0.92rem] mb-[26px]">
              Tailored presentations for corporate leadership, women&apos;s conferences, financial wellness summits, and private retreats.
            </p>

            <div className="space-y-[20px]">
              <div className="p-[20px] rounded-[20px] bg-white border border-[#F6DCE5] hover:border-[#C9738F] transition-all duration-200 shadow-sm">
                <span className="text-[0.75rem] font-extrabold text-[#C9738F] uppercase tracking-[0.15em] block mb-[4px]">Keynote 01</span>
                <h4 className="font-serif font-bold text-[1.2rem] text-[#4A3B41] mb-[6px]">
                  Financial Courage for Women 40+: Rebuilding Money Systems Without Shame
                </h4>
                <p className="text-[0.88rem] text-[#8A7680]">
                  How capable women can break free from money avoidance, overcome quiet emotional guilt, and build a 20-minute weekly financial architecture that lasts.
                </p>
              </div>

              <div className="p-[20px] rounded-[20px] bg-white border border-[#F6DCE5] hover:border-[#C9738F] transition-all duration-200 shadow-sm">
                <span className="text-[0.75rem] font-extrabold text-[#C9738F] uppercase tracking-[0.15em] block mb-[4px]">Keynote 02</span>
                <h4 className="font-serif font-bold text-[1.2rem] text-[#4A3B41] mb-[6px]">
                  You Are Already Enough: Reclaiming Identity in Seasons of Change
                </h4>
                <p className="text-[0.88rem] text-[#8A7680]">
                  A powerful exploration of self-worth, emotional resilience, and personal leadership for women navigating midlife, career pivots, and major transitions.
                </p>
              </div>

              <div className="p-[20px] rounded-[20px] bg-white border border-[#F6DCE5] hover:border-[#C9738F] transition-all duration-200 shadow-sm">
                <span className="text-[0.75rem] font-extrabold text-[#C9738F] uppercase tracking-[0.15em] block mb-[4px]">Keynote 03</span>
                <h4 className="font-serif font-bold text-[1.2rem] text-[#4A3B41] mb-[6px]">
                  The Psychology of Wealth: When Practical Structure Meets Emotional Peace
                </h4>
                <p className="text-[0.88rem] text-[#8A7680]">
                  Why spreadsheets alone never work — and how uniting financial protection principles with emotional self-awareness creates true, generational financial courage.
                </p>
              </div>
            </div>

            <div className="mt-[28px] pt-[20px] border-t border-[#F6DCE5] flex items-center justify-between flex-wrap gap-4">
              <span className="text-[0.88rem] font-medium text-[#7E3B54] italic">
                &ldquo;We start with you — and let the money follow the woman.&rdquo;
              </span>
              <Link
                href="https://calendly.com/vaidastone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] font-bold text-[#A64E6E] hover:underline flex items-center gap-1"
              >
                Check Speaking Availability →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
