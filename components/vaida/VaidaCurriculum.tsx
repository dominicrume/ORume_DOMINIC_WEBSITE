import React from 'react';

const curriculum = [
  {
    day: "Day 1",
    title: "The Shift",
    desc: "Demystifying AI. Why it's a tool for you, not just tech bros."
  },
  {
    day: "Day 2",
    title: "Your First Prompt",
    desc: "How to talk to AI so it actually listens and understands your voice."
  },
  {
    day: "Day 3",
    title: "The Time Buyer",
    desc: "Automating your most tedious weekly tasks (emails, meal prep, scheduling)."
  },
  {
    day: "Day 4",
    title: "The Negotiator",
    desc: "Using AI to script difficult conversations, set boundaries, and ask for more."
  },
  {
    day: "Day 5",
    title: "The Side Hustle",
    desc: "Ideating and outlining a new income stream in 15 minutes."
  },
  {
    day: "Day 6",
    title: "The Editor",
    desc: "Polishing your resume, bio, or website copy to sound like your highest self."
  },
  {
    day: "Day 7",
    title: "The Strategist",
    desc: "Creating a 90-day execution plan for your biggest current goal."
  },
  {
    day: "Day 8",
    title: "The Sounding Board",
    desc: "Using AI to overcome creative blocks and imposter syndrome."
  },
  {
    day: "Day 9",
    title: "Always ENOUGH",
    desc: "Integrating AI into your daily routine without losing your human magic."
  }
];

export function VaidaCurriculum() {
  return (
    <section className="py-[110px] px-[26px]">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-[50px]">
          <h2 className="font-serif font-semibold text-[clamp(2rem,4.5vw,3rem)] text-[#7E3B54] mb-[14px] leading-[1.08]">
            The 9-Day Blueprint
          </h2>
          <p className="text-[#8A7680] text-[1.05rem] max-w-[52ch] mx-auto">
            15 minutes a day. That&apos;s all it takes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {curriculum.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-[24px] p-[38px_32px] shadow-[0_8px_30px_rgba(126,59,84,0.06)] transition-all duration-300 hover:-translate-y-[8px] hover:shadow-[0_18px_50px_rgba(126,59,84,0.12)] border border-[rgba(246,220,229,0.5)]"
            >
              <span className="inline-block bg-[#FBEDF1] text-[#A64E6E] font-bold text-[0.8rem] uppercase tracking-[0.1em] py-[6px] px-[12px] rounded-full mb-[18px]">
                {item.day}
              </span>
              <h3 className="font-serif font-semibold text-[1.5rem] text-[#7E3B54] mb-[10px]">
                {item.title}
              </h3>
              <p className="text-[#8A7680] text-[0.96rem] leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
