import { Metadata } from 'next';
import { IconicHero } from '@/components/iconic/IconicHero';
import { IconicVibeCheck } from '@/components/iconic/IconicVibeCheck';
import { IconicOffer } from '@/components/iconic/IconicOffer';
import { IconicQuiz } from '@/components/iconic/IconicQuiz';
import { IconicCurriculum } from '@/components/iconic/IconicCurriculum';
import { IconicLeadForm } from '@/components/iconic/IconicLeadForm';
import { IconicFooter } from '@/components/iconic/IconicFooter';

export const metadata: Metadata = {
  title: "Learn AI in 9 Days — Free | Iconic × VOREM",
  description: "They said AI is not for us. Na lie. Try live AI now + get a free 9-day course. AI na our own.",
  keywords: [
    "free AI course", "learn AI", "artificial intelligence for beginners", 
    "AI course Africa", "AI course Nigeria", "learn AI on phone", 
    "AI for beginners no coding", "free AI training", "digital skills Africa", 
    "master AI in 9 days", "try AI online free", "AI course free certificate", 
    "Python for beginners"
  ],
  authors: [{ name: "Iconic International Holdings · VOREM Institute of Technology" }],
  openGraph: {
    type: 'website',
    siteName: 'Iconic',
    title: "Learn AI in 9 Days — Free, for Africa's next generation",
    description: "Free AI book + 9-day course for beginners. Try live AI right now — no coding, no payment. 12,000+ young Africans already trained. AI na our own.",
    url: 'https://rumedominic.com/iconic',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Learn AI in 9 Days — Free | Iconic × VOREM",
    description: "They said AI is not for us. Na lie. Try live AI now + get a free 9-day course. AI na our own. 🌍",
  }
};

export default function IconicPage() {
  return (
    <div className="bg-[#0B0B0E] text-[#F5F1E8] font-sans antialiased overflow-x-hidden min-h-screen">
      {/* Background Aura */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          background: `radial-gradient(720px 460px at 80% -8%, rgba(201,162,75,0.14), transparent 62%), radial-gradient(560px 420px at 5% 8%, rgba(201,162,75,0.06), transparent 60%)`
        }} 
      />

      {/* Main Content */}
      <div className="relative z-10">
        <IconicHero />
        
        {/* Quote Strip */}
        <div className="relative z-10 text-center py-12">
          <div className="max-w-6xl mx-auto px-6">
            <p className="font-serif italic text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto text-[#F5F1E8]">
              “We are not just giving awards; we are building an <span className="text-[#C9A24B]">ecosystem of accountability and excellence.</span>”
            </p>
            <div className="mt-5 text-[11px] tracking-[2.5px] uppercase text-[#A79F8E]">
              — Amb. Dr. Temisan O. Louis · <b className="text-[#C9A24B] font-semibold">President &amp; Founder, Iconic International Holdings</b>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="relative z-10 border-y border-[#2C2A33] bg-gradient-to-b from-[#17171E]/60 to-transparent">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
              <div className="text-center px-2 md:border-r border-[#2C2A33]">
                <div className="font-serif font-extrabold text-2xl md:text-3xl text-[#C9A24B]">54</div>
                <div className="text-[10.5px] tracking-[1.5px] uppercase text-[#A79F8E] mt-2">African nations</div>
              </div>
              <div className="text-center px-2 md:border-r border-[#2C2A33]">
                <div className="font-serif font-extrabold text-2xl md:text-3xl text-[#C9A24B]">9 Days</div>
                <div className="text-[10.5px] tracking-[1.5px] uppercase text-[#A79F8E] mt-2">Beginner to capable</div>
              </div>
              <div className="text-center px-2 md:border-r border-[#2C2A33]">
                <div className="font-serif font-extrabold text-2xl md:text-3xl text-[#C9A24B]">12,000+</div>
                <div className="text-[10.5px] tracking-[1.5px] uppercase text-[#A79F8E] mt-2">Youth trained in AI</div>
              </div>
              <div className="text-center px-2">
                <div className="font-serif font-extrabold text-2xl md:text-3xl text-[#C9A24B]">Free</div>
                <div className="text-[10.5px] tracking-[1.5px] uppercase text-[#A79F8E] mt-2">To begin, for all</div>
              </div>
            </div>
          </div>
        </div>

        <IconicVibeCheck />
        <IconicOffer />
        <IconicQuiz />
        <IconicCurriculum />
        <IconicLeadForm />
        <IconicFooter />
      </div>
    </div>
  );
}
