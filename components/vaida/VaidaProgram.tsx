'use client';

import React from 'react';
import Link from 'next/link';

export function VaidaProgram() {
  return (
    <section id="program" className="py-[100px] px-[20px] md:px-[26px] bg-gradient-to-b from-transparent via-[#FDF9F5] to-transparent relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <span className="inline-block py-[6px] px-[18px] rounded-full bg-[#FBEDF1] border border-[#F6DCE5] text-[#A64E6E] font-bold text-[0.78rem] tracking-[0.25em] uppercase mb-[18px]">
            Flagship Mentorship · Next Cohort: 30 May 2026
          </span>
          <h2 className="font-serif font-semibold text-[clamp(2.2rem,5vw,3.8rem)] text-[#7E3B54] mb-[18px] leading-[1.08]">
            Always ENOUGH™ <span className="italic font-normal block sm:inline">6-Week Financial Reset</span>
          </h2>
          <p className="text-[#8A7680] text-[1.15rem] md:text-[1.25rem] max-w-[62ch] mx-auto leading-relaxed">
            Stop avoiding your bank account. Start owning your money with calm, clarity, and a personal system that fits your real life — without shame or overwhelm.
          </p>
        </div>

        {/* The Target Audience Matrix */}
        <div className="bg-white rounded-[32px] p-[36px] md:p-[56px] shadow-[0_20px_60px_rgba(126,59,84,0.08)] border border-[#F6DCE5] mb-[70px] relative">
          <div className="max-w-[800px] mx-auto text-center mb-[40px]">
            <h3 className="font-serif font-semibold text-[1.8rem] md:text-[2.2rem] text-[#7E3B54] mb-[12px]">
              Designed for the woman who is not &apos;bad with money&apos; — just tired of carrying it alone.
            </h3>
            <p className="text-[#8A7680] text-[1.05rem]">
              You earn, manage life, pay bills, and show up for everyone else — yet quietly feel that your money is not fully under control. You look capable from the outside, but inside, money still creates emotional tension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <div className="p-[28px] rounded-[22px] bg-[#FDF9F5] border border-[rgba(201,115,143,0.15)] text-left">
              <div className="w-[44px] h-[44px] rounded-full bg-[#FBEDF1] text-[#A64E6E] flex items-center justify-center font-bold text-[1.2rem] mb-[16px]">
                01
              </div>
              <h4 className="font-serif font-bold text-[1.2rem] text-[#7E3B54] mb-[8px]">Practical Structure</h4>
              <p className="text-[#8A7680] text-[0.95rem] leading-relaxed">
                You do not need another restrictive budgeting app or spreadsheet you abandon. You need a simple, tailored system you can actually run in under 20 minutes a week.
              </p>
            </div>

            <div className="p-[28px] rounded-[22px] bg-[#FDF9F5] border border-[rgba(201,115,143,0.15)] text-left">
              <div className="w-[44px] h-[44px] rounded-full bg-[#FBEDF1] text-[#A64E6E] flex items-center justify-center font-bold text-[1.2rem] mb-[16px]">
                02
              </div>
              <h4 className="font-serif font-bold text-[1.2rem] text-[#7E3B54] mb-[8px]">Emotional Awareness</h4>
              <p className="text-[#8A7680] text-[0.95rem] leading-relaxed">
                We uncover the behavioral patterns and stories driving your money choices before fixing numbers. No guilt. No shame. Just calm truth and clarity.
              </p>
            </div>

            <div className="p-[28px] rounded-[22px] bg-[#FDF9F5] border border-[rgba(201,115,143,0.15)] text-left">
              <div className="w-[44px] h-[44px] rounded-full bg-[#FBEDF1] text-[#A64E6E] flex items-center justify-center font-bold text-[1.2rem] mb-[16px]">
                03
              </div>
              <h4 className="font-serif font-bold text-[1.2rem] text-[#7E3B54] mb-[8px]">Realistic Habits</h4>
              <p className="text-[#8A7680] text-[0.95rem] leading-relaxed">
                Start your first consistent savings habit with a clear automatic rule so money begins to stay with you, building a stable base for future growth.
              </p>
            </div>
          </div>
        </div>

        {/* The Transformation / Outcomes */}
        <div className="mb-[80px]">
          <div className="text-center mb-[46px]">
            <h3 className="font-serif font-semibold text-[2rem] md:text-[2.6rem] text-[#7E3B54]">
              Three Concrete Outcomes You Can Rely On
            </h3>
            <p className="text-[#8A7680] text-[1.05rem] mt-[8px]">
              Not just motivation or encouragement — tangible shifts that remain after the six weeks end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            <div className="bg-gradient-to-br from-[#FBEDF1] to-[rgba(253,249,245,0.8)] p-[36px_28px] rounded-[26px] border border-[#F6DCE5] relative overflow-hidden group hover:-translate-y-[6px] transition-all duration-300">
              <span className="text-[3rem] font-serif font-bold text-[rgba(201,115,143,0.18)] absolute top-[16px] right-[24px] select-none">
                I
              </span>
              <h4 className="font-serif font-bold text-[1.4rem] text-[#7E3B54] mb-[12px] relative z-10">
                A Personal Money Management System
              </h4>
              <p className="text-[#4A3B41] text-[0.98rem] leading-relaxed relative z-10">
                Tailored specifically to your real life, your responsibilities, and your emotional bandwidth. Simple, realistic, and designed to run effortlessly every week.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FBEDF1] to-[rgba(253,249,245,0.8)] p-[36px_28px] rounded-[26px] border border-[#F6DCE5] relative overflow-hidden group hover:-translate-y-[6px] transition-all duration-300">
              <span className="text-[3rem] font-serif font-bold text-[rgba(201,115,143,0.18)] absolute top-[16px] right-[24px] select-none">
                II
              </span>
              <h4 className="font-serif font-bold text-[1.4rem] text-[#7E3B54] mb-[12px] relative z-10">
                An Automatic Savings Habit
              </h4>
              <p className="text-[#4A3B41] text-[0.98rem] leading-relaxed relative z-10">
                Established with clear, automated rules so that wealth accumulation becomes second nature. Watch your reserves build without constant willpower or second-guessing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FBEDF1] to-[rgba(253,249,245,0.8)] p-[36px_28px] rounded-[26px] border border-[#F6DCE5] relative overflow-hidden group hover:-translate-y-[6px] transition-all duration-300">
              <span className="text-[3rem] font-serif font-bold text-[rgba(201,115,143,0.18)] absolute top-[16px] right-[24px] select-none">
                III
              </span>
              <h4 className="font-serif font-bold text-[1.4rem] text-[#7E3B54] mb-[12px] relative z-10">
                Emotional Peace &amp; Balance
              </h4>
              <p className="text-[#4A3B41] text-[0.98rem] leading-relaxed relative z-10">
                Replace anxiety and avoidance with quiet financial courage. Understand your triggers, eliminate shame, and make everyday financial decisions from a place of strength.
              </p>
            </div>
          </div>
        </div>

        {/* The 6-Week Journey Roadmap */}
        <div className="mb-[80px]">
          <div className="text-center mb-[50px]">
            <span className="inline-block py-[5px] px-[16px] rounded-full bg-[#FBEDF1] text-[#A64E6E] font-bold text-[0.75rem] tracking-[0.22em] uppercase mb-[12px]">
              Step-By-Step Architecture
            </span>
            <h3 className="font-serif font-semibold text-[2rem] md:text-[2.8rem] text-[#7E3B54] mb-[12px]">
              The Journey: Six Weeks. One Meaningful Shift.
            </h3>
            <p className="text-[#8A7680] text-[1.1rem] max-w-[58ch] mx-auto">
              We do not start with a restrictive budget. We start with you — uniting emotional understanding with practical financial structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            <div className="bg-white p-[30px] rounded-[24px] border border-[#F6DCE5] shadow-[0_10px_30px_rgba(126,59,84,0.05)] hover:border-[#C9738F] transition-all duration-300">
              <span className="text-[0.8rem] font-bold text-[#A64E6E] bg-[#FBEDF1] px-[12px] py-[4px] rounded-full inline-block mb-[16px]">Week 01</span>
              <h4 className="font-serif font-bold text-[1.3rem] text-[#7E3B54] mb-[10px]">Your Money Pattern Audit</h4>
              <p className="text-[#8A7680] text-[0.94rem] leading-relaxed">
                Before we change anything practical, we uncover what has really been driving your money behaviour. This gives deep clarity without blame or judgment.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[24px] border border-[#F6DCE5] shadow-[0_10px_30px_rgba(126,59,84,0.05)] hover:border-[#C9738F] transition-all duration-300">
              <span className="text-[0.8rem] font-bold text-[#A64E6E] bg-[#FBEDF1] px-[12px] py-[4px] rounded-full inline-block mb-[16px]">Week 02</span>
              <h4 className="font-serif font-bold text-[1.3rem] text-[#7E3B54] mb-[10px]">Your True Numbers</h4>
              <p className="text-[#8A7680] text-[0.94rem] leading-relaxed">
                We look at your real financial picture in a calm, honest, supportive way. No shame. No drama. Just truth and foundational clarity.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[24px] border border-[#F6DCE5] shadow-[0_10px_30px_rgba(126,59,84,0.05)] hover:border-[#C9738F] transition-all duration-300">
              <span className="text-[0.8rem] font-bold text-[#A64E6E] bg-[#FBEDF1] px-[12px] py-[4px] rounded-full inline-block mb-[16px]">Week 03</span>
              <h4 className="font-serif font-bold text-[1.3rem] text-[#7E3B54] mb-[10px]">Building Your Personal System</h4>
              <p className="text-[#8A7680] text-[0.94rem] leading-relaxed">
                You create your own effortless money routine, spending structure, and automatic savings habit in a way that fits your actual lifestyle and bandwidth.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[24px] border border-[#F6DCE5] shadow-[0_10px_30px_rgba(126,59,84,0.05)] hover:border-[#C9738F] transition-all duration-300">
              <span className="text-[0.8rem] font-bold text-[#A64E6E] bg-[#FBEDF1] px-[12px] py-[4px] rounded-full inline-block mb-[16px]">Week 04</span>
              <h4 className="font-serif font-bold text-[1.3rem] text-[#7E3B54] mb-[10px]">Rewiring the Story</h4>
              <p className="text-[#8A7680] text-[0.94rem] leading-relaxed">
                We explore the beliefs, fears, and emotional loops underneath your money habits so your new practical system has stronger, unbreakable roots.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[24px] border border-[#F6DCE5] shadow-[0_10px_30px_rgba(126,59,84,0.05)] hover:border-[#C9738F] transition-all duration-300">
              <span className="text-[0.8rem] font-bold text-[#A64E6E] bg-[#FBEDF1] px-[12px] py-[4px] rounded-full inline-block mb-[16px]">Week 05</span>
              <h4 className="font-serif font-bold text-[1.3rem] text-[#7E3B54] mb-[10px]">Confident Financial Decisions</h4>
              <p className="text-[#8A7680] text-[0.94rem] leading-relaxed">
                You learn how to respond to spending choices, unexpected surprises, pressure, and economic uncertainty with quiet steadiness and zero panic.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[24px] border border-[#F6DCE5] shadow-[0_10px_30px_rgba(126,59,84,0.05)] hover:border-[#C9738F] transition-all duration-300">
              <span className="text-[0.8rem] font-bold text-[#A64E6E] bg-[#FBEDF1] px-[12px] py-[4px] rounded-full inline-block mb-[16px]">Week 06</span>
              <h4 className="font-serif font-bold text-[1.3rem] text-[#7E3B54] mb-[10px]">Integration &amp; Next Steps</h4>
              <p className="text-[#8A7680] text-[0.94rem] leading-relaxed">
                You bring everything together, review your transformations, and leave with a simple, automated financial architecture for your next 90 days and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Everything Included / Value Stack */}
        <div className="bg-[#7E3B54] text-white rounded-[36px] p-[40px] md:p-[64px] relative overflow-hidden shadow-[0_30px_80px_rgba(126,59,84,0.28)] mb-[80px]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,115,143,0.35)_0%,transparent_70%)] pointer-events-none"></div>
          
          <div className="max-w-[840px] mx-auto relative z-10">
            <div className="text-center mb-[46px]">
              <span className="text-[#F3C6D5] tracking-[0.25em] text-[0.8rem] uppercase font-bold block mb-[10px]">
                Complete Support System · No Filler
              </span>
              <h3 className="font-serif font-semibold text-[2.2rem] md:text-[3rem] leading-[1.1]">
                Everything Included in Your Reset
              </h3>
              <p className="text-[#F6DCE5] opacity-90 text-[1.05rem] mt-[12px]">
                You are not paying for passive information. You are paying for structure, intimate guidance, accountability, and a lasting financial architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] mb-[46px]">
              <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-[24px] rounded-[20px] border border-[rgba(255,255,255,0.15)] flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[1.1rem] text-[#FDF9F5] mb-[4px]">6 Live Group Coaching Sessions</h4>
                  <p className="text-[0.88rem] text-[#E5D0D8]">Weekly 90-min Zoom sessions in an intimate cohort of maximum 8 women.</p>
                </div>
                <span className="text-[0.8rem] font-bold bg-[rgba(255,255,255,0.15)] px-[10px] py-[4px] rounded-full text-[#F3C6D5] shrink-0 ml-2">£900 Value</span>
              </div>

              <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-[24px] rounded-[20px] border border-[rgba(255,255,255,0.15)] flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[1.1rem] text-[#FDF9F5] mb-[4px]">Money Pattern Audit</h4>
                  <p className="text-[0.88rem] text-[#E5D0D8]">Guided process to uncover behavioral drivers before we touch numbers.</p>
                </div>
                <span className="text-[0.8rem] font-bold bg-[rgba(255,255,255,0.15)] px-[10px] py-[4px] rounded-full text-[#F3C6D5] shrink-0 ml-2">£197 Value</span>
              </div>

              <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-[24px] rounded-[20px] border border-[rgba(255,255,255,0.15)] flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[1.1rem] text-[#FDF9F5] mb-[4px]">Always Enough™ Workbook</h4>
                  <p className="text-[0.88rem] text-[#E5D0D8]">Practical tool to track, reflect, and organize your system for years to come.</p>
                </div>
                <span className="text-[0.8rem] font-bold bg-[rgba(255,255,255,0.15)] px-[10px] py-[4px] rounded-full text-[#F3C6D5] shrink-0 ml-2">£97 Value</span>
              </div>

              <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-[24px] rounded-[20px] border border-[rgba(255,255,255,0.15)] flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[1.1rem] text-[#FDF9F5] mb-[4px]">Private Cohort Support Space</h4>
                  <p className="text-[0.88rem] text-[#E5D0D8]">A safe, confidential environment with women in a similar season of life.</p>
                </div>
                <span className="text-[0.8rem] font-bold bg-[rgba(255,255,255,0.15)] px-[10px] py-[4px] rounded-full text-[#F3C6D5] shrink-0 ml-2">£147 Value</span>
              </div>

              <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-[24px] rounded-[20px] border border-[rgba(255,255,255,0.15)] flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[1.1rem] text-[#FDF9F5] mb-[4px]">90-Day Post-Programme Support</h4>
                  <p className="text-[0.88rem] text-[#E5D0D8]">Continued follow-up prompts and accountability to ensure your routine sticks.</p>
                </div>
                <span className="text-[0.8rem] font-bold bg-[rgba(255,255,255,0.15)] px-[10px] py-[4px] rounded-full text-[#F3C6D5] shrink-0 ml-2">£297 Value</span>
              </div>

              <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-[24px] rounded-[20px] border border-[rgba(255,255,255,0.15)] flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[1.1rem] text-[#FDF9F5] mb-[4px]">Session Recordings &amp; Tools</h4>
                  <p className="text-[0.88rem] text-[#E5D0D8]">Full access to session replays within 24 hours to revisit key insights.</p>
                </div>
                <span className="text-[0.8rem] font-bold bg-[rgba(255,255,255,0.15)] px-[10px] py-[4px] rounded-full text-[#F3C6D5] shrink-0 ml-2">£97 Value</span>
              </div>
            </div>

            {/* Price Box & CTA */}
            <div className="bg-white text-[#4A3B41] rounded-[28px] p-[36px_30px] md:p-[44px_40px] text-center shadow-2xl relative">
              <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 bg-[#D9B67C] text-[#2F241B] text-[0.75rem] font-extrabold uppercase px-[16px] py-[5px] rounded-full tracking-[0.15em] shadow-md">
                Only 8 Seats Per Cohort
              </div>

              <p className="text-[#8A7680] text-[0.95rem] uppercase tracking-[0.15em] font-semibold mb-[6px]">
                Total Value: <span className="line-through">£1,735</span>
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-[8px]">
                <span className="text-[0.95rem] font-bold text-[#A64E6E] uppercase tracking-wider">Your Investment:</span>
                <span className="font-serif font-bold text-[3.4rem] md:text-[4rem] text-[#7E3B54] leading-none">£777</span>
              </div>
              <p className="text-[#8A7680] text-[0.95rem] mb-[28px] max-w-[42ch] mx-auto">
                Next Cohort Starts: <strong className="text-[#4A3B41]">30 May 2026</strong> · Online via Zoom · Small group for women 40+
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-[16px]">
                <Link
                  href="https://always-enough-foundation-d97cg09.gamma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-bold text-[1.1rem] py-[18px] px-[40px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-[#C9738F] text-white shadow-[0_12px_30px_rgba(201,115,143,0.4)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(201,115,143,0.5)] text-center"
                >
                  Reserve My Seat Now — £777 →
                </Link>
                <Link
                  href="https://calendly.com/vaidastone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-bold text-[1rem] py-[18px] px-[30px] rounded-full transition-all duration-300 border-2 border-[#F6DCE5] bg-[#FDF9F5] text-[#7E3B54] hover:bg-[#FBEDF1] hover:border-[#C9738F] text-center"
                >
                  Book a Clarity Call First
                </Link>
              </div>

              <p className="text-[#8A7680] text-[0.82rem] mt-[18px] italic">
                *Flexible payment arrangements and confidential inquiries available upon request.
              </p>
            </div>

          </div>
        </div>

        {/* Real Women. Real Shifts. Testimonials */}
        <div className="mb-[80px]">
          <div className="text-center mb-[46px]">
            <h3 className="font-serif font-semibold text-[2rem] md:text-[2.6rem] text-[#7E3B54]">
              Real Women. Real Shifts. Real Relief.
            </h3>
            <p className="text-[#8A7680] text-[1.05rem] mt-[8px]">
              How capable women are experiencing money after the Always Enough™ Reset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
            <div className="bg-white p-[32px] rounded-[24px] border border-[#F6DCE5] shadow-[0_15px_40px_rgba(126,59,84,0.06)] flex flex-col justify-between">
              <p className="text-[#4A3B41] text-[0.98rem] italic leading-relaxed mb-[24px]">
                &ldquo;Vaida shared her knowledge and expertise on money management in a way that truly made sense. Her Mind Loop process helped me become more aware of what&apos;s really happening when I think about money, and it shifted how I relate to it.&rdquo;
              </p>
              <div>
                <span className="font-bold text-[#7E3B54] block">Lolita Reid</span>
                <span className="text-[0.85rem] text-[#8A7680]">Business Coach</span>
              </div>
            </div>

            <div className="bg-white p-[32px] rounded-[24px] border border-[#F6DCE5] shadow-[0_15px_40px_rgba(126,59,84,0.06)] flex flex-col justify-between">
              <p className="text-[#4A3B41] text-[0.98rem] italic leading-relaxed mb-[24px]">
                &ldquo;I thought I needed more money, but what I really needed was a system. This helped me stop guessing and start managing without feeling overwhelmed by spreadsheets.&rdquo;
              </p>
              <div>
                <span className="font-bold text-[#7E3B54] block">L. · Age 52</span>
                <span className="text-[0.85rem] text-[#8A7680]">NHS Professional</span>
              </div>
            </div>

            <div className="bg-white p-[32px] rounded-[24px] border border-[#F6DCE5] shadow-[0_15px_40px_rgba(126,59,84,0.06)] flex flex-col justify-between">
              <p className="text-[#4A3B41] text-[0.98rem] italic leading-relaxed mb-[24px]">
                &ldquo;The emotional part changed everything for me. I finally understood why I kept repeating the same pattern, and that understanding gave me space to change it for good.&rdquo;
              </p>
              <div>
                <span className="font-bold text-[#7E3B54] block">M. · Age 44</span>
                <span className="text-[0.85rem] text-[#8A7680]">Business Owner</span>
              </div>
            </div>
          </div>
          <p className="text-center text-[#8A7680] text-[0.82rem] mt-[20px] italic">
            Names and details shared with permission only. Results are individual and may vary.
          </p>
        </div>

        {/* The 14-Day Promise & Free Starter Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] max-w-[1000px] mx-auto">
          
          {/* Guarantee Box */}
          <div className="bg-gradient-to-br from-[#FDF9F5] to-white p-[36px] rounded-[28px] border-2 border-[#D9B67C] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-[12px] mb-[16px]">
                <div className="w-[48px] h-[48px] rounded-full bg-[#FBEDF1] text-[#A64E6E] flex items-center justify-center text-[1.4rem] font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[1.4rem] text-[#7E3B54]">The 14-Day Promise</h4>
                  <span className="text-[0.8rem] uppercase tracking-wider text-[#856949] font-bold">Risk-Free Guarantee</span>
                </div>
              </div>
              <p className="text-[#4A3B41] text-[0.96rem] leading-relaxed mb-[16px]">
                Attend the first two live sessions. Do the reflection work between them. If you genuinely feel this programme is not right for your season of life, email within 14 days of the start date and you will receive a full refund.
              </p>
              <p className="text-[#8A7680] text-[0.9rem] font-semibold italic">
                No awkwardness. No pressure. I believe women need safety as well as support when making a real investment in themselves.
              </p>
            </div>
          </div>

          {/* Lead Magnet Box */}
          <div className="bg-gradient-to-br from-[#FBEDF1] to-white p-[36px] rounded-[28px] border border-[#F6DCE5] shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-[0.78rem] font-bold text-[#A64E6E] uppercase tracking-[0.18em] block mb-[8px]">
                Not Ready For The Full Program?
              </span>
              <h4 className="font-serif font-bold text-[1.4rem] text-[#7E3B54] mb-[12px]">
                Get the Free Money Clarity Starter Guide for Women 40+
              </h4>
              <p className="text-[#4A3B41] text-[0.95rem] leading-relaxed mb-[22px]">
                Understand where your money stress is really coming from, spot one habit that needs attention, and begin creating foundational clarity without overwhelm.
              </p>
            </div>
            <a
              href="#capture"
              className="inline-block font-bold text-[0.95rem] py-[14px] px-[28px] rounded-full transition-all duration-300 border-2 border-[#C9738F] text-[#7E3B54] hover:bg-[#C9738F] hover:text-white text-center"
            >
              Download the Free Starter Guide →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
