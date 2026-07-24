/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export function IconicCurriculum() {
  const days = [
    { day: "Day 1", title: "Talk to AI like a pro", desc: "Prompt engineering — get anything you want out of AI." },
    { day: "Day 2", title: "Create & edit images", desc: "Make and edit pictures with AI — no design skills needed." },
    { day: "Day 3", title: "Slides & presentations", desc: "Build business slides and presentations in minutes." },
    { day: "Day 4", title: "Build your own chatbot", desc: "Create a chatbot for your business or brand." },
    { day: "Day 5", title: "AI agents & automation", desc: "Build AI agents that automate YouTube & social media." },
    { day: "Day 6", title: "Write viral content", desc: "Use AI to write content that spreads." },
    { day: "Day 7", title: "Build websites with AI", desc: "Program and launch simple websites with AI." },
    { day: "Day 8", title: "1 content into many", desc: "Turn one piece of content into dozens." },
    { day: "Day 9", title: "Start your AI business", desc: "Launch your own small AI business." },
  ];

  return (
    <section className="relative z-10 pt-0 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-[720px] mx-auto">
          <div className="text-[11px] tracking-[3px] uppercase text-[#C9A24B] font-semibold">The 9-day path</div>
          <h2 className="font-serif font-extrabold text-[27px] md:text-[42px] leading-[1.12] tracking-[-0.3px] my-[14px]">
            Exactly what you'll learn
          </h2>
          <p className="text-[#EDE7D8] opacity-82 text-[16px]">
            No fluff — real skills. From prompt engineering to chatbots, AI agents, websites and your own AI business. Images, videos, editing and YouTube automation, all included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] mt-[44px]">
          {days.map((d, i) => (
            <div key={i} className="bg-[#131318] border border-[#2C2A33] rounded-lg p-[20px_22px] transition-all duration-300 hover:border-[#8f7433] hover:-translate-y-[2px]">
              <div className="text-[10.5px] tracking-[2px] uppercase text-[#C9A24B] font-bold">{d.day}</div>
              <h3 className="text-[16px] font-bold text-[#F5F1E8] my-2">{d.title}</h3>
              <p className="text-[#A79F8E] text-[13.5px]">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
