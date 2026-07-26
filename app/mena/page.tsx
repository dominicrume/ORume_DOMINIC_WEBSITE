import type { Metadata } from 'next';
import Link from 'next/link';
import { MENA_CONFIG } from '@/content/mena';
import { MenaClaimForm } from '@/components/mena/MenaClaimForm';

export const metadata: Metadata = {
  title: 'Mena Obrike × Rume Dominic — "I Am Yours" Empowerment Live | Free IT Scholarship Nigeria, Zimbabwe, Rwanda, Uganda',
  description: `${MENA_CONFIG.CONFIRMED_PAID_COUNT} paid live! Claim your 100% free IT & AI tech scholarship in Nigeria, Zimbabwe, Rwanda, & Uganda. Instant access, zero fees.`,
  alternates: {
    canonical: `${MENA_CONFIG.DOMAIN}/mena`,
  },
  openGraph: {
    title: 'Mena Obrike × Rume Dominic — "I Am Yours" Empowerment Live',
    description: 'Real people got paid live. Now get the permanent engineering skills. Free tech scholarship for Nigeria, Zimbabwe, Rwanda, and Uganda.',
    url: `${MENA_CONFIG.DOMAIN}/mena`,
    siteName: 'Rume Dominic',
    images: [
      {
        url: `${MENA_CONFIG.DOMAIN}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Mena Obrike x Rume Dominic Uririe — Empowerment Live & Tech Scholarship',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mena Obrike × Rume Dominic — Free Tech Scholarship',
    description: 'Real people got paid live. Now get the permanent engineering skills. Free tech scholarship for Nigeria, Zimbabwe, Rwanda, and Uganda.',
    images: [`${MENA_CONFIG.DOMAIN}/opengraph-image`],
  },
  other: {
    'content-language': 'en-NG',
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${MENA_CONFIG.DOMAIN}/#rume`,
      name: 'Rume Dominic Uririe',
      url: MENA_CONFIG.DOMAIN,
      jobTitle: 'AI Engineer & Blockchain Architect',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://vorem.co/#org',
        name: 'Vorem',
      },
    },
    {
      '@type': 'Person',
      '@id': `${MENA_CONFIG.DOMAIN}/#mena`,
      name: 'Mena Obrike',
      alternateName: 'Menbriks',
      sameAs: [MENA_CONFIG.MENA_TIKTOK],
      jobTitle: 'Recording Artist & Creator',
    },
    {
      '@type': 'MusicRecording',
      '@id': `${MENA_CONFIG.DOMAIN}/#i-am-yours`,
      name: 'I Am Yours',
      byArtist: { '@id': `${MENA_CONFIG.DOMAIN}/#mena` },
    },
    {
      '@type': 'Event',
      '@id': `${MENA_CONFIG.DOMAIN}/#event`,
      name: '"I Am Yours" Empowerment Live',
      startDate: '2026-07-25T18:00:00Z',
      endDate: '2026-07-25T22:00:00Z',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'VirtualLocation',
        url: MENA_CONFIG.MENA_TIKTOK,
      },
      organizer: [
        { '@id': `${MENA_CONFIG.DOMAIN}/#mena` },
        { '@id': `${MENA_CONFIG.DOMAIN}/#rume` },
      ],
      description: 'Live financial empowerment and tech scholarship launch across Nigeria, Zimbabwe, Rwanda, and Uganda.',
    },
    {
      '@type': 'Course',
      '@id': `${MENA_CONFIG.DOMAIN}/#course`,
      name: MENA_CONFIG.COURSE_NAME,
      description: 'Go from total beginner to confident AI builder in three intensive nights.',
      provider: {
        '@type': 'Organization',
        '@id': 'https://vorem.co/#org',
        name: 'Vorem',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${MENA_CONFIG.DOMAIN}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the "I Am Yours" Empowerment Live?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The "I Am Yours" Empowerment Live is a 3-night virtual broadcast intensive starting 25 July 2026 where artist Mena Obrike and AI engineer Rume Dominic Uririe disbursed direct financial aid and launched a free pan-African tech scholarship. During the event on TikTok, verified participants received cash prizes directly to their bank accounts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is Mena Obrike?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mena Obrike (also known as Menbriks) is an African recording artist, philanthropist, and the creator of the hit song "I Am Yours". He organized the empowerment broadcast to support youth across Africa with immediate financial relief and long-term educational access.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is Rume Dominic Uririe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rume Dominic Uririe is a Nigerian AI engineer, blockchain architect, author of "From Code to Consciousness", and the founder of Vorem. He designed the 3-night AI curriculum and tech scholarship to equip African youth with permanent, high-income engineering skills.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the scholarship really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Rume Dominic Scholarship is 100% free and open to anyone in Nigeria, Zimbabwe, Rwanda, or Uganda without any application fee or tuition cost. You receive instant access to the book, course, product, and mentoring community immediately upon claiming.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who can claim it — which countries?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The free tech scholarship can be claimed by anyone residing in Nigeria, Zimbabwe, Rwanda, Uganda, or other African nations. It was specifically built for young adults and music fans seeking practical digital skills without financial barriers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need a laptop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You do not need a laptop to start learning AI, digital marketing, or web automation in the Rume Dominic Scholarship. All core training modules, reading materials, and community mentoring can be completed directly on an Android or iOS smartphone.',
          },
        },
        {
          '@type': 'Question',
          name: 'I missed the live. Can I still get the scholarship?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can still claim the full tech scholarship even if you missed the live broadcast on 25 July 2026. While the live cash giveaways have ended, the educational portal remains open for instant registration on this page.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I know this is not a scam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nobody from Mena Obrike\'s team, Rume Dominic\'s team, or Vorem will ever ask you to pay a fee, buy a form, or send money to claim this scholarship. All cash prizes during the event were disbursed by Menbriks directly to winners\' personal accounts, and all education here is delivered at zero cost.',
          },
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://vorem.co/#org',
      name: 'Vorem',
      founder: { '@id': `${MENA_CONFIG.DOMAIN}/#rume` },
    },
  ],
};

export default function MenaLandingPage() {
  return (
    <main lang="en-NG" className="min-h-screen bg-gradient-to-b from-[#2D0B4E] via-[#7B1FA2] to-[#C2185B] text-[#F4F1EA] selection:bg-[#C9A227] selection:text-black font-sans antialiased overflow-x-hidden">
      {/* GEO & SEO JSON-LD Schema Layer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero Section with CSS static mesh */}
      <section className="relative px-4 pt-12 pb-16 sm:pt-20 sm:pb-24 max-w-4xl mx-auto text-center">
        {/* Subtle CSS-only glow mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-radial from-[#C9A227]/20 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-block rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-widest text-[#C9A227] mb-6">
          &ldquo;I Am Yours&rdquo; Empowerment Live &middot; {MENA_CONFIG.EVENT_DATE}
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#F4F1EA] drop-shadow-lg">
          MENA OBRIKE <span className="text-[#C9A227]">&times;</span> RUME DOMINIC URIRIE
        </h1>

        <p className="mt-6 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#C9A227] leading-tight max-w-3xl mx-auto">
          {MENA_CONFIG.CONFIRMED_PAID_COUNT} people were paid live. Now the skills.
        </p>

        {/* Above the fold 3-question instant clarity block for TikTok mobile traffic */}
        <div className="mt-6 mx-auto max-w-xl rounded-xl border border-white/15 bg-black/30 p-4 text-left text-xs sm:text-sm space-y-1.5 backdrop-blur-sm">
          <p>🔥 <strong>Was that real?</strong> Yes, cash was paid live to verified accounts.</p>
          <p>⚡ <strong>Did I miss it?</strong> The live stream ended, but the scholarship just opened.</p>
          <p>🎓 <strong>Can I still get something?</strong> Yes. Claim your 100% free tech scholarship below right now.</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#claim-section"
            className="w-full sm:w-auto rounded-xl bg-[#C9A227] px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider text-black shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-transform active:scale-[0.98] hover:brightness-110 min-h-[54px] flex items-center justify-center"
          >
            CLAIM MY SCHOLARSHIP &mdash; FREE &darr;
          </a>

          <a
            href="#music-section"
            className="w-full sm:w-auto rounded-xl border border-[#F4F1EA]/30 bg-black/20 px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#F4F1EA] transition-colors hover:bg-white/10 min-h-[54px] flex items-center justify-center"
          >
            Stream &ldquo;I Am Yours&rdquo; &rarr;
          </a>
        </div>
      </section>

      {/* Proof Bar - 4 Stat Blocks, Big Numbers, No Decoration */}
      <section aria-label="Live Event Proof" className="border-y border-[#C9A227]/30 bg-black/40 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate">
              {MENA_CONFIG.CONFIRMED_PAID_COUNT}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              PAID LIVE
            </div>
          </div>

          <div className="p-2 border-l border-white/10">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate">
              &ne;{MENA_CONFIG.TOTAL_DISBURSED_NGN}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              DISBURSED
            </div>
          </div>

          <div className="p-2 border-t md:border-t-0 md:border-l border-white/10 col-span-2 md:col-span-1">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate">
              4 COUNTRIES
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              NG &middot; ZW &middot; RW &middot; UG
            </div>
          </div>

          <div className="p-2 border-t md:border-t-0 border-l border-white/10 col-span-2 md:col-span-1">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate">
              3 NIGHTS
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              LIVE INTENSIVE
            </div>
          </div>
        </div>
      </section>

      {/* The Story - 3 short paragraphs in Rume Dominic's plain declarative voice */}
      <section aria-label="The Story" className="py-16 sm:py-20 px-4 max-w-3xl mx-auto text-lg sm:text-xl font-normal leading-relaxed space-y-6 text-[#F4F1EA]/90">
        <p>
          Over 3 live nights starting 25 July 2026, real people across Nigeria, Zimbabwe, Rwanda, and Uganda were paid real money during the &ldquo;I Am Yours&rdquo; broadcast. There was no lottery. There were no special connections required. Cash went directly into verified bank accounts.
        </p>

        <p className="font-bold text-[#C9A227]">
          But cash finishes. Skill does not finish. Money does not flow to where it is needed. It flows through a channel you build. When you build engineering and AI skills, you stop waiting for giveaways and start owning your output.
        </p>

        <p>
          Mena Obrike and I partnered to build that permanent channel for you. You do not pay a single Naira, Shilling, or Franc for this training. We removed the tuition fee completely so you can start building your skill today.
        </p>
      </section>

      {/* The Scholarship - Conversion Block with Maximum Visual Weight */}
      <section id="claim-section" aria-label="The Rume Dominic Scholarship" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
        <div className="rounded-3xl border-2 border-[#C9A227] bg-black/60 p-6 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F4F1EA]">
              THE RUME DOMINIC SCHOLARSHIP
            </h2>
            <p className="mt-2 text-base sm:text-xl font-bold uppercase tracking-wide text-[#C9A227]">
              Not an application. Not a waitlist. Claim it and it&apos;s yours.
            </p>
          </div>

          {/* 4 Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex items-start gap-4">
              <span className="text-3xl shrink-0" aria-hidden="true">📘</span>
              <div>
                <h3 className="font-bold text-lg text-[#F4F1EA]">Book: {MENA_CONFIG.BOOK_TITLE}</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Bridging AI and human logic with 51,000+ hours of development engineering insights.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex items-start gap-4">
              <span className="text-3xl shrink-0" aria-hidden="true">🎓</span>
              <div>
                <h3 className="font-bold text-lg text-[#F4F1EA]">Course: {MENA_CONFIG.COURSE_NAME}</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Go from total beginner to confident AI automation builder in three intensive nights.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex items-start gap-4">
              <span className="text-3xl shrink-0" aria-hidden="true">🛠️</span>
              <div>
                <h3 className="font-bold text-lg text-[#F4F1EA]">Product: {MENA_CONFIG.PRODUCT_NAME}</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Production-ready tools and engineering templates to accelerate your digital output.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex items-start gap-4">
              <span className="text-3xl shrink-0" aria-hidden="true">💬</span>
              <div>
                <h3 className="font-bold text-lg text-[#F4F1EA]">The Bridge Community</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Direct peer accountability, live guidance, and networking with active African builders.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 text-center">
            <div className="text-xl sm:text-2xl font-black tracking-wide text-[#F4F1EA]">
              Worth &pound;{MENA_CONFIG.BUNDLE_VALUE_GBP}. <span className="text-[#C9A227] underline decoration-[#C9A227]/50 underline-offset-4">Yours: &pound;0.</span>
            </div>
          </div>

          {/* Inline Claim Form */}
          <div className="mt-8">
            <MenaClaimForm />
          </div>
        </div>
      </section>

      {/* The Music Section */}
      <section id="music-section" aria-label="The Music" className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-white/15 bg-black/40 p-8 sm:p-10">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-xl bg-gradient-to-tr from-[#C9A227] via-[#7B1FA2] to-[#2D0B4E] flex items-center justify-center border-2 border-[#C9A227]/50 shadow-xl">
            <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black text-center px-2 leading-none">
              I AM<br />YOURS
            </span>
          </div>

          <h2 className="mt-6 font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F1EA]">
            The song that started it all: &ldquo;I Am Yours&rdquo;
          </h2>
          <p className="mt-2 text-sm text-[#F4F1EA]/70">
            By Mena Obrike (@MENBRIKS). Stream the anthem across all major platforms.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={MENA_CONFIG.SPOTIFY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#1DB954] px-5 py-3 text-sm font-black uppercase text-black transition-transform active:scale-95 min-h-[44px] flex items-center"
            >
              🎧 Spotify
            </a>
            <a
              href={MENA_CONFIG.APPLE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-5 py-3 text-sm font-black uppercase text-black transition-transform active:scale-95 min-h-[44px] flex items-center"
            >
              🎵 Apple Music
            </a>
            <a
              href={MENA_CONFIG.YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#FF0000] px-5 py-3 text-sm font-black uppercase text-white transition-transform active:scale-95 min-h-[44px] flex items-center"
            >
              ▶️ YouTube Music
            </a>
            <a
              href={MENA_CONFIG.MENA_TIKTOK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#C9A227] bg-black/60 px-5 py-3 text-sm font-black uppercase text-[#C9A227] transition-transform active:scale-95 min-h-[44px] flex items-center"
            >
              📱 @MENBRIKS TikTok
            </a>
          </div>
        </div>
      </section>

      {/* Want Me in the Room With You (Soft Mentorship Invitation) */}
      <section aria-label="Private Mentorship Cohort" className="py-12 px-4 max-w-2xl mx-auto text-center">
        <div className="rounded-2xl border border-[#C9A227]/20 bg-black/30 p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-[#C9A227]">
            Want me in the room with you?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#F4F1EA]/85">
            If you want direct mentorship where we review your code and architect your AI systems together, I open a small private cohort. You do not need this paid room to succeed with the free tools above. But if you want me in the room with you, you can apply.
          </p>
          <div className="mt-5">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl border border-[#C9A227] bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors min-h-[44px]"
            >
              Explore the private mentorship cohort &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - GEO & SEO Structured with Declarative Standalone Sentences */}
      <section aria-label="Frequently Asked Questions" className="py-16 sm:py-20 px-4 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-center text-[#F4F1EA] mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              What is the &ldquo;I Am Yours&rdquo; Empowerment Live?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              The &ldquo;I Am Yours&rdquo; Empowerment Live is a virtual broadcast event held on 25 July 2026 where artist Mena Obrike and AI engineer Rume Dominic Uririe disbursed direct financial aid and launched a free pan-African tech scholarship. During the event on TikTok, verified participants received cash prizes directly to their bank accounts.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              Who is Mena Obrike?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              Mena Obrike (also known as Menbriks) is an African recording artist, philanthropist, and the creator of the hit song &ldquo;I Am Yours&rdquo;. He organized the empowerment broadcast to support youth across Africa with immediate financial relief and long-term educational access.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              Who is Rume Dominic Uririe?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              Rume Dominic Uririe is a Nigerian AI engineer, blockchain architect, author of &ldquo;From Code to Consciousness&rdquo;, and the founder of Vorem. He designed the 9-day AI curriculum and tech scholarship to equip African youth with permanent, high-income engineering skills.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              Is the scholarship really free?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              The Rume Dominic Scholarship is 100% free and open to anyone in Nigeria, Zimbabwe, Rwanda, or Uganda without any application fee or tuition cost. You receive instant access to the book, course, product, and mentoring community immediately upon claiming.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              Who can claim it &mdash; which countries?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              The free tech scholarship can be claimed by anyone residing in Nigeria, Zimbabwe, Rwanda, Uganda, or other African nations. It was specifically built for young adults and music fans seeking practical digital skills without financial barriers.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              Do I need a laptop?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              You do not need a laptop to start learning AI, digital marketing, or web automation in the Rume Dominic Scholarship. All core training modules, reading materials, and community mentoring can be completed directly on an Android or iOS smartphone.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              I missed the live. Can I still get the scholarship?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
              Yes, you can still claim the full tech scholarship even if you missed the 3-night live broadcast starting 25 July 2026. While the live cash giveaways have ended, the educational portal remains open for instant registration on this page.
            </p>
          </article>

          <article className="rounded-2xl border border-[#C9A227]/40 bg-black/60 p-6">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#C9A227]">
              How do I know this is not a scam?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/90 leading-relaxed font-semibold">
              Nobody from Mena Obrike&apos;s team, Rume Dominic&apos;s team, or Vorem will ever ask you to pay a fee, buy a form, or send money to claim this scholarship. All cash prizes during the 3-night event were disbursed by Menbriks directly to winners&apos; personal accounts, and all education here is delivered at zero cost.
            </p>
          </article>
        </div>
      </section>

      {/* Footer - Vorem line appears once, small, as mandated */}
      <footer className="border-t border-white/10 bg-black/80 py-12 px-4 text-center text-xs sm:text-sm text-[#F4F1EA]/60 space-y-4">
        <p className="font-semibold text-[#F4F1EA]/80">
          Training delivered by Vorem, a Rume Dominic company.
        </p>
        <p>
          &copy; {new Date().getFullYear()} Mena Obrike &times; Rume Dominic Uririe. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 pt-2">
          <Link href="/" className="hover:text-[#C9A227] transition-colors min-h-[44px] flex items-center">
            ← Back to Main Site
          </Link>
          <Link href="/#contact" className="hover:text-[#C9A227] transition-colors min-h-[44px] flex items-center">
            Contact Support
          </Link>
          <a href={MENA_CONFIG.MENA_TIKTOK} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] transition-colors min-h-[44px] flex items-center">
            @MENBRIKS TikTok
          </a>
        </div>
      </footer>
    </main>
  );
}
