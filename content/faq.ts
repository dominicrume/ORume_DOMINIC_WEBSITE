/**
 * FAQ - written for Answer-Engine Optimisation (AEO/GEO): direct, quotable
 * answers to the questions people (and AI assistants) ask about AI/blockchain
 * builds. Rendered on-page AND emitted as FAQPage JSON-LD for rich results.
 */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Who is Rume Dominic?',
    a: 'Rume Dominic (O’Rume Dominic Uririe) is an AI and blockchain engineer from Warri, Delta State, Nigeria. He founded VOREM, sits on the executive of SIBAN (Nigeria’s national blockchain body), has written five books now stocked at Waterstones in the UK, and was ranked among the 100 Most Influential Young Deltans. He is finishing an MSc in AI and Business Strategy at Aston University in Birmingham.',
  },
  {
    q: 'How do you build AI and Web3 products so fast?',
    a: 'I do not use big agencies or long corporate timelines. I build in a focused way, with modern AI tools and strict standards. A lean setup moves faster and costs less, and you still get a system that runs in the real world, not a demo.',
  },
  {
    q: 'Are you available for freelance engineering or consulting?',
    a: 'I take on a small number of projects at a time. Email me your technical requirements. If it fits what I am working on, we can talk about working together.',
  },
  {
    q: 'What is the VOREM Institute of Technology?',
    a: 'The VOREM Institute of Technology is the teaching side of my work. It gives affordable, practical blockchain and AI training across Africa, from the free “Master AI in 9 Days” start all the way to crypto, DeFi and smart-contract tracks for developers.',
  },
  {
    q: 'Do you work on global teams, or just UK and Africa?',
    a: 'Both. I have worked inside global engineering teams and delivered AI agents and Web3 platforms that run securely in production.',
  },
  {
    q: 'How do I get started?',
    a: 'Send me your requirements through the contact form, or look at my GitHub. I usually reply to technical questions within one to two working days.',
  },
];
