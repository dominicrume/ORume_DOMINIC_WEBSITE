import React from 'react';

const curriculum = [
  {
    day: "Day 1",
    title: "Prompt Engineering",
    desc: "How to talk to AI to get anything you want."
  },
  {
    day: "Day 2",
    title: "AI Image Creation",
    desc: "How to create and edit pictures with AI."
  },
  {
    day: "Day 3",
    title: "AI Presentations",
    desc: "How to make business slides and presentations."
  },
  {
    day: "Day 4",
    title: "AI Chatbots",
    desc: "How to build your own chatbot for your business."
  },
  {
    day: "Day 5",
    title: "AI Agents & Automation",
    desc: "How to build AI agents to automate YouTube and social media."
  },
  {
    day: "Day 6",
    title: "Viral AI Content",
    desc: "How to write viral content using AI."
  },
  {
    day: "Day 7",
    title: "AI Web Development",
    desc: "How to program & build simple websites with AI."
  },
  {
    day: "Day 8",
    title: "Content Repurposing",
    desc: "How to turn 1 piece of content into many contents."
  },
  {
    day: "Day 9",
    title: "AI Business",
    desc: "How to start your own small AI business."
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
          <p className="text-[#8A7680] text-[1.05rem] max-w-[52ch] mx-auto mb-[14px]">
            15 minutes a day. That&apos;s all it takes.
          </p>
          <p className="text-[#A64E6E] font-medium text-[1.1rem] max-w-[60ch] mx-auto italic">
            So yes — videos, editing, trading tools, YouTube automation... Everything is included.
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
