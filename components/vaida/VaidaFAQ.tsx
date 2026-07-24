import React from 'react';

const faqs = [
  {
    q: "I am not \"tech-savvy\". Will this be too hard?",
    a: "Not at all. If you can type an email, you can use AI. This course is designed specifically for beginners and explains everything in plain English."
  },
  {
    q: "Do I have to pay for the AI tools?",
    a: "No. The entire course uses the free versions of AI tools like ChatGPT. You don't need to spend a dime to start seeing the benefits."
  },
  {
    q: "Why is Vaida offering this for free?",
    a: "Because true empowerment requires access. Vaida has partnered with Rume Dominic to provide the ultimate AI tools, ensuring the Always ENOUGH community is at the forefront of this shift, not left behind."
  },
  {
    q: "How much time will this take?",
    a: "15 minutes a day for 9 days. It is designed to fit into your existing busy life, not add to your overwhelm."
  }
];

export function VaidaFAQ() {
  return (
    <section className="py-[100px] px-[26px]">
      <div className="max-w-[700px] mx-auto">
        <h2 className="text-center font-serif font-semibold text-[clamp(2rem,4.5vw,3rem)] text-[#7E3B54] mb-[50px] leading-[1.08]">
          Questions?
        </h2>
        
        <div className="flex flex-col gap-[16px]">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-white rounded-[16px] border border-[rgba(246,220,229,0.7)] shadow-[0_4px_14px_rgba(126,59,84,0.04)] overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="p-[22px_26px] font-serif font-semibold text-[1.2rem] text-[#7E3B54] cursor-pointer relative list-none select-none pr-[50px]">
                {faq.q}
                <span className="absolute right-[24px] top-[50%] -translate-y-[50%] text-[1.5rem] font-light text-[#C9738F] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-[26px] pb-[26px] pt-0">
                <p className="text-[#8A7680] text-[1.05rem] leading-[1.6]">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
