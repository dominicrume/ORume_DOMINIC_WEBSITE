import { Metadata } from 'next';
import Link from 'next/link';
import { WaitlistForm } from '@/components/kya/WaitlistForm';
import { StickyBuyBar } from '@/components/kya/StickyBuyBar';

export const metadata: Metadata = {
  title: "The KYA Method Stack",
  description: "The production agent stack, already built. One price, once.",
  openGraph: {
    images: ['/opengraph-image'],
    title: "The KYA Method Stack | Rume Dominic",
    description: "The production agent stack, already built. One price, once.",
    type: "website",
    url: "https://rumedominic.com/kya"
  }
};

// The checkout target. A Paystack Payment Page / Payment Link URL is public, not a
// secret, so it follows the same NEXT_PUBLIC_ pattern as the booking and course URLs.
// If it is unset, the price card sends people to the waitlist instead of a dead link,
// so the page is never broken between shipping this and pasting the real URL in.
const PAYSTACK_URL = process.env.NEXT_PUBLIC_PAYSTACK_URL?.trim();

// One source of truth for where "buy" goes and what it says, reused by the hero,
// the price card and the sticky bar so they can never drift apart.
const BUY_HREF = PAYSTACK_URL ?? "#join";
const BUY_CTA = PAYSTACK_URL ? "Get it now" : "Join the list";

export default function KyaProductPage() {
  return (
    <div className="bg-[#0B0E13] text-[#EDF1F6] font-sans antialiased min-h-screen">
      <header className="max-w-[660px] mx-auto px-[22px] pt-[64px] pb-[8px]">
        <div className="text-[12px] tracking-[0.16em] uppercase text-[#E8B44A] font-bold mb-[18px]">
          Founding price · ₦300,000
        </div>
        <h1 className="text-[clamp(34px,7vw,52px)] leading-[1.08] tracking-[-1.4px] font-[800] mb-[18px]">
          You have built the same agent six times.
        </h1>
        <p className="text-[clamp(19px,3.2vw,22px)] leading-[1.5] text-[#93A0B1] mb-[28px]">
          This is the seventh. Already built. Already hardened. Yours today.
        </p>

        <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center">
          <a
            href={BUY_HREF}
            className="focus-ring inline-flex items-center justify-center rounded-xl bg-[#E8B44A] px-[26px] py-[15px] text-[17px] font-bold text-[#0B0E13] no-underline transition-transform hover:-translate-y-[1px]"
          >
            {BUY_CTA} &middot; &#8358;300,000
          </a>
          <a
            href="#whats-inside"
            className="focus-ring inline-flex items-center justify-center rounded-xl border border-[#28313F] px-[26px] py-[15px] text-[17px] font-semibold text-[#EDF1F6] no-underline transition-colors hover:border-[#4A3A11]"
          >
            See what is inside &rarr;
          </a>
        </div>
        <p className="mt-[14px] text-[13px] text-[#93A0B1]">
          One payment, once. 30-day refund, no questions asked.
        </p>
      </header>

      <div className="max-w-[660px] mx-auto px-[22px]">
        <section className="py-[52px] border-b border-[#28313F]">
          <p className="text-[clamp(21px,3.6vw,25px)] leading-[1.45] font-[600] tracking-[-0.3px] mb-[18px]">
            Every agent project starts the same way.
          </p>
          <p className="mb-[18px]">A blank folder. A good idea. Then three weeks of plumbing you have written before.</p>
          <p className="mb-[18px]">
            Retries. Traces. Key handling. The eval loop. Rate limits. The deploy that works on your machine and nowhere else. Prompt injection you remember to think about on day nine.
          </p>
          <p className="mb-[18px]">
            You are not stuck because the work is hard. You are stuck because it is <em className="italic text-[#EDF1F6]">repetitive</em>. The interesting part comes after the plumbing, and you rarely get there, because the plumbing eats the month.
          </p>
          <p className="mb-[18px]">Then the model changes, and you do it again.</p>
        </section>

        <section className="py-[52px] border-b border-[#28313F]">
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            I have shipped this stack 14 times.
          </h2>
          <p className="mb-[18px]">
            Every time, I kept what survived production and deleted what didn&apos;t. What is left is not a tutorial and not a course. It is the working thing, with my opinions already baked in.
          </p>
          <p className="mb-[18px]">You clone it. You add your idea. You ship.</p>
        </section>

        <section id="whats-inside" className="scroll-mt-[20px] py-[52px] border-b border-[#28313F]">
          <div className="text-[12px] tracking-[0.16em] uppercase text-[#E8B44A] font-bold mb-[18px]">
            What&apos;s in the box
          </div>
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            Seven pieces. All of them load-bearing.
          </h2>

          <div className="flex gap-[16px] py-[20px] border-b border-[#28313F]">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">1</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">The scaffold</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                Production agent architecture, wired end to end. Orchestration, tool calling, retries, structured output, streaming. Not a demo: the version that survives a bad Tuesday.
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] py-[20px] border-b border-[#28313F]">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">2</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">The judgment layer</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                The skills and prompts that carry the decisions. Which retry strategy holds under a rate limit at 3am. Where to spend a bigger model and where not to. The failure modes that only show up at volume. This is the part a model cannot generate for you.
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] py-[20px] border-b border-[#28313F]">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">3</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">The eval harness</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                Wired in from the first commit, because evals bolted on later never get written. You will know when a model update breaks you, before your users tell you.
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] py-[20px] border-b border-[#28313F]">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">4</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">Security defaults</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                Keys server-side, never in the client. Per-user rate caps so one loop cannot empty your account overnight. Prompt-injection guards on every tool boundary. Set correctly on day zero, not after the incident.
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] py-[20px] border-b border-[#28313F]">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">5</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">The deployment path</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                Local to live, documented, with the environment handling and cost controls already in place. One command.
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] py-[20px] border-b border-[#28313F]">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">6</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">Lifetime Updates</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                Boilerplates rot. Models change every few weeks. You get every revision, and the note explaining what changed and why.
              </p>
            </div>
          </div>

          <div className="flex gap-[16px] py-[20px] border-b-0">
            <div className="flex-none w-[30px] h-[30px] rounded-[8px] bg-[#1B2230] border border-[#28313F] flex items-center justify-center text-[13px] font-bold text-[#E8B44A]">7</div>
            <div>
              <h3 className="text-[19px] tracking-[-0.2px] font-bold mb-[6px]">The build log</h3>
              <p className="m-0 text-[#93A0B1] text-[16px] leading-[1.55]">
                Short written breakdowns of the decisions behind the code. Not documentation. The reasoning, so you can disagree with me on purpose instead of by accident.
              </p>
            </div>
          </div>
        </section>

        <section className="py-[52px] border-b border-[#28313F]">
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            Yes, you could build this yourself.
          </h2>
          <p className="mb-[18px]">
            Of course you could. That was never in question, and I would not insult you by pretending otherwise.
          </p>
          <p className="text-[clamp(21px,3.6vw,25px)] leading-[1.45] font-[600] tracking-[-0.3px] mb-[18px]">
            You are not buying the code. You are buying the six months.
          </p>
          <p className="mb-[18px]">
            A model will write you a boilerplate in four minutes. What it will not hand you is the list of decisions <em className="italic text-[#EDF1F6]">not to relitigate</em>, the ones that cost me over a decade of engineering and UK patent filings to learn and cost you nothing to inherit.
          </p>
          <p className="mb-[18px]">
            Anyone can learn to cut their own hair. The question is what the first six haircuts look like, and who has to see them.
          </p>
        </section>

        <section className="py-[52px] border-b border-[#28313F]">
          <div className="text-[12px] tracking-[0.16em] uppercase text-[#E8B44A] font-bold mb-[18px]">
            The price
          </div>
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            One payment. Once. Forever.
          </h2>
          <p className="mb-[18px]">
            No seats. No monthly fee. No usage meter running while you sleep. You buy it, you own it, you use it on every project you ever ship.
          </p>

          <div className="bg-[#141922] border border-[#4A3A11] rounded-2xl p-[30px_26px] my-[26px]">
            <div className="flex items-baseline gap-[14px] flex-wrap mb-[6px]">
              <div className="text-[52px] font-extrabold tracking-[-2px] leading-none">₦300,000</div>
            </div>
            <p className="text-[#93A0B1] text-[15px] m-0">
              Founding price. It rises soon and stays there.
            </p>
            <ul className="list-none p-0 mt-[22px]">
              <li className="pl-[26px] relative mb-[10px] text-[#93A0B1] text-[16px] before:content-['✓'] before:absolute before:left-0 before:text-[#5BC08A] before:font-bold">
                <strong className="font-bold text-[#EDF1F6]">All seven pieces</strong>, complete
              </li>
              <li className="pl-[26px] relative mb-[10px] text-[#93A0B1] text-[16px] before:content-['✓'] before:absolute before:left-0 before:text-[#5BC08A] before:font-bold">
                <strong className="font-bold text-[#EDF1F6]">Updates</strong> as models change
              </li>
              <li className="pl-[26px] relative mb-[10px] text-[#93A0B1] text-[16px] before:content-['✓'] before:absolute before:left-0 before:text-[#5BC08A] before:font-bold">
                <strong className="font-bold text-[#EDF1F6]">Commercial use</strong>, ship client work with it
              </li>
              <li className="pl-[26px] relative mb-[10px] text-[#93A0B1] text-[16px] before:content-['✓'] before:absolute before:left-0 before:text-[#5BC08A] before:font-bold">
                <strong className="font-bold text-[#EDF1F6]">30-day refund</strong>, no explanation required
              </li>
            </ul>

            {PAYSTACK_URL ? (
              <>
                <a
                  href={PAYSTACK_URL}
                  className="mt-[26px] block w-full rounded-xl bg-[#E8B44A] px-[24px] py-[17px] text-center text-[18px] font-bold text-[#0B0E13] no-underline transition-transform hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B44A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141922]"
                >
                  Get it now · ₦300,000 →
                </a>
                <p className="mt-[12px] text-center text-[13px] text-[#93A0B1]">
                  Secure checkout by Paystack. Card, bank transfer or USSD.
                </p>
              </>
            ) : (
              <a
                href="#join"
                className="mt-[26px] block w-full rounded-xl bg-[#E8B44A] px-[24px] py-[17px] text-center text-[18px] font-bold text-[#0B0E13] no-underline transition-transform hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B44A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141922]"
              >
                Join the list for the ₦300,000 link →
              </a>
            )}
          </div>

          <p className="text-[#93A0B1] mb-[18px]">
            Compare it honestly: three weeks of your own evenings, at whatever your hour is worth. If that number is under ₦300,000, do not buy this; build it, and you will learn more.
          </p>
        </section>

        <section className="py-[52px] border-b border-[#28313F]">
          <div className="text-[12px] tracking-[0.16em] uppercase text-[#E8B44A] font-bold mb-[18px]">
            The promise
          </div>
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            Two guarantees, and I will honour both.
          </h2>
          <p className="mb-[18px]">
            <strong className="font-bold text-[#EDF1F6]">It is built and shipping now, not a dated promise.</strong> You are buying something that already exists, not a place in a queue.
          </p>
          <p className="mb-[18px]">
            <strong className="font-bold text-[#EDF1F6]">If you buy it and it does not save you the three weeks, tell me within 30 days and I refund you.</strong> No form. No explanation. Reply to the receipt.
          </p>
          <p className="text-[#93A0B1] mb-[18px]">
            I would rather return your money than have you tell one person this was not worth it.
          </p>
        </section>

        <section id="join" className="py-[52px] border-b border-[#28313F]">
          <div className="text-[12px] tracking-[0.16em] uppercase text-[#E8B44A] font-bold mb-[18px]">
            Join the waitlist
          </div>
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            Prefer to buy later?
          </h2>
          <p className="mb-[18px]">
            Leave your email and I will send you the link, and one note before the price rises. One click to leave, any time.
          </p>

          <div className="bg-[#141922] border border-[#28313F] rounded-2xl p-[28px_24px]">
            <WaitlistForm />
            <p className="text-[14px] text-[#93A0B1] mt-[14px] text-center leading-[1.5]">
              Name and email only. No card, no spam, no reselling your address. Leave whenever you like.
            </p>
          </div>
        </section>

        <section className="py-[52px] border-b border-[#28313F]">
          <h2 className="text-[clamp(24px,4.5vw,31px)] leading-[1.2] tracking-[-0.7px] font-[750] mb-[18px]">
            Straight answers
          </h2>

          <details className="border-b border-[#28313F] py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              Is this a course?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              No. It is a working codebase you clone and run. The written breakdowns exist to explain the decisions, not to teach you to code. You can already do that.
            </p>
          </details>

          <details className="border-b border-[#28313F] py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              What stack is it?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              TypeScript, Next.js, Make.com orchestration, and Python agent scripts. It runs seamlessly on Vercel and AWS.
            </p>
          </details>

          <details className="border-b border-[#28313F] py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              Is it locked to one model provider?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              100% provider-agnostic. You can swap OpenAI for Anthropic, or run Llama locally, with a single line of config. This architectural freedom is a core feature of the KYA Method.
            </p>
          </details>

          <details className="border-b border-[#28313F] py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              What if a new model breaks it next month?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              That is what the updates are for. Models change every few weeks; that is the whole reason this exists as a maintained thing and not a one-off download.
            </p>
          </details>

          <details className="border-b border-[#28313F] py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              Can I use it for client work?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              Yes. Unlimited projects, commercial use included. You may not resell the stack itself.
            </p>
          </details>

          <details className="border-b border-[#28313F] py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              Why is it one payment and not a subscription?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              Because you would cancel it, and you would be right to. Tools you use once per project should not bill you every month for the months you are not building.
            </p>
          </details>

          <details className="border-b-0 py-[18px] group">
            <summary className="cursor-pointer font-[650] text-[17px] list-none flex justify-between gap-[14px] [&::-webkit-details-marker]:hidden after:content-['+'] after:text-[#E8B44A] after:font-bold after:flex-none group-open:after:content-['–']">
              When does it ship?
            </summary>
            <p className="mt-[14px] text-[#93A0B1] text-[16px] m-0">
              It has shipped. You get it as soon as you buy.
            </p>
          </details>
        </section>

        <section className="py-[52px]">
          <p className="text-[clamp(21px,3.6vw,25px)] leading-[1.45] font-[600] tracking-[-0.3px] mb-[18px]">
            You already know how to build this.
          </p>
          <p className="mb-[18px]">
            That is exactly why it is worth ₦300,000 to never build it again.
          </p>
          <p className="mb-[18px]">
            <a href="#join" className="text-[#E8B44A] font-bold no-underline">
              Join the waitlist →
            </a>
          </p>
        </section>
      </div>

      <footer className="max-w-[660px] mx-auto px-[22px] py-[40px] pb-[96px] text-[#93A0B1] text-[14px] text-center">
        Rume Dominic · VOREM Institute · hi@rumedominic.com
      </footer>

      <StickyBuyBar href={BUY_HREF} cta={BUY_CTA} />
    </div>
  );
}
