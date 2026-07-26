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
      url: MENA_CONFIG.SPOTIFY_LINK,
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
            text: 'Yes, you can still claim the full tech scholarship even if you missed the 3-night live broadcast starting 25 July 2026. While the live cash giveaways have ended, the educational portal remains open for instant registration on this page.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I know this is not a scam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nobody from Mena Obrike\'s team, Rume Dominic\'s team, or Vorem will ever ask you to pay a fee, buy a form, or send money to claim this scholarship. All cash prizes during the 3-night event were disbursed by Menbriks directly to winners\' personal accounts, and all education here is delivered at zero cost.',
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
    <main lang="en-NG" className="min-h-screen bg-gradient-to-b from-[#19052B] via-[#3B0D54] to-[#12031F] text-[#F4F1EA] selection:bg-[#C9A227] selection:text-black font-sans antialiased overflow-x-hidden relative pb-28 sm:pb-32">
      {/* Custom CSS for Music Visualizer Equalizer, Vinyl Rotation & Glows */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spinSlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 14s linear infinite; }
        @keyframes eq1 { 0%, 100% { height: 6px; } 50% { height: 22px; } }
        @keyframes eq2 { 0%, 100% { height: 16px; } 50% { height: 6px; } }
        @keyframes eq3 { 0%, 100% { height: 10px; } 50% { height: 26px; } }
        @keyframes eq4 { 0%, 100% { height: 20px; } 50% { height: 8px; } }
        .animate-eq-1 { animation: eq1 0.7s ease-in-out infinite; }
        .animate-eq-2 { animation: eq2 0.5s ease-in-out infinite 0.15s; }
        .animate-eq-3 { animation: eq3 0.8s ease-in-out infinite 0.3s; }
        .animate-eq-4 { animation: eq4 0.6s ease-in-out infinite 0.1s; }
      `}} />

      {/* GEO & SEO JSON-LD Schema Layer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Background Cyberpunk Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-radial from-[#C9A227]/25 via-[#7B1FA2]/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#C2185B]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-80 h-80 bg-[#00F2FE]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative px-4 pt-10 pb-12 sm:pt-16 sm:pb-16 max-w-5xl mx-auto text-center">
        {/* Top Music Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A227]/50 bg-black/60 px-5 py-2 text-xs sm:text-sm font-black uppercase tracking-widest text-[#FFD700] shadow-[0_0_25px_rgba(201,162,39,0.3)] backdrop-blur-md mb-6 animate-pulse">
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-1 bg-[#C9A227] rounded animate-eq-1" />
            <span className="w-1 bg-[#C9A227] rounded animate-eq-2" />
            <span className="w-1 bg-[#C9A227] rounded animate-eq-3" />
            <span className="w-1 bg-[#C9A227] rounded animate-eq-4" />
          </span>
          <span>OFFICIAL MUSIC × TECH ANTHEM: &ldquo;I AM YOURS&rdquo;</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#F4F1EA] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          MENA OBRIKE <span aria-label="music" className="inline-block text-3xl sm:text-5xl">🎙️</span>
          <span className="text-[#C9A227] mx-1 sm:mx-2">&times;</span> 
          RUME DOMINIC <span aria-label="tech" className="inline-block text-3xl sm:text-5xl">⚡</span>
        </h1>

        <div className="mt-4 flex justify-center">
          <span className="inline-block rounded-full border border-white/20 bg-gradient-to-r from-[#7B1FA2]/40 via-[#C9A227]/30 to-[#7B1FA2]/40 px-6 py-1.5 text-sm sm:text-lg font-black uppercase tracking-wider text-white shadow-lg">
            THE AFRICAN MUSIC &amp; TECH EMPOWERMENT PORTAL
          </span>
        </div>

        <p className="mt-6 text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#C9A227] leading-tight max-w-3xl mx-auto">
          {MENA_CONFIG.CONFIRMED_PAID_COUNT} people were paid live. Now own the skills forever.
        </p>

        {/* Above the fold 3-question instant clarity block */}
        <div className="mt-6 mx-auto max-w-xl rounded-2xl border border-white/20 bg-black/40 p-5 text-left text-xs sm:text-sm space-y-2 backdrop-blur-md shadow-xl">
          <p className="flex items-start gap-2">
            <span className="text-base shrink-0">🔥</span>
            <span><strong className="text-[#FFD700]">Was that real?</strong> Yes, cash was paid live to verified accounts during the broadcast.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-base shrink-0">⚡</span>
            <span><strong className="text-[#FFD700]">Did I miss it?</strong> The live giveaways ended, but the free 3-night tech scholarship just opened.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-base shrink-0">🎓</span>
            <span><strong className="text-[#FFD700]">Can I still get something?</strong> Yes! Stream the anthem below and claim your 100% free scholarship instantly.</span>
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#claim-section"
            className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#C9A227] px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider text-black shadow-[0_0_35px_rgba(201,162,39,0.5)] transition-all active:scale-[0.98] hover:scale-[1.02] hover:brightness-110 min-h-[56px] flex items-center justify-center gap-2"
          >
            <span>⚡ CLAIM MY SCHOLARSHIP — FREE &darr;</span>
          </a>

          <a
            href="#music-section"
            className="w-full sm:w-auto rounded-2xl border-2 border-[#C9A227]/60 bg-black/50 px-6 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#FFD700] shadow-[0_0_20px_rgba(201,162,39,0.2)] transition-all hover:bg-[#C9A227]/10 hover:border-[#C9A227] min-h-[56px] flex items-center justify-center gap-2.5"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-1 bg-[#FFD700] rounded animate-eq-1" />
              <span className="w-1 bg-[#FFD700] rounded animate-eq-3" />
              <span className="w-1 bg-[#FFD700] rounded animate-eq-2" />
            </span>
            <span>STREAM THE ANTHEM &rarr;</span>
          </a>
        </div>
      </section>

      {/* Proof Bar - 4 Stat Blocks, Big Numbers, Music & Tech Icons */}
      <section aria-label="Live Event Proof" className="border-y border-[#C9A227]/40 bg-black/60 backdrop-blur-lg py-8 px-4 shadow-2xl">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate flex items-center justify-center gap-2">
              <span>🎙️</span> {MENA_CONFIG.CONFIRMED_PAID_COUNT}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              PAID LIVE
            </div>
          </div>

          <div className="p-2 border-l border-white/15">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate flex items-center justify-center gap-1.5">
              <span>💰</span> &ne;{MENA_CONFIG.TOTAL_DISBURSED_NGN}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              DISBURSED
            </div>
          </div>

          <div className="p-2 border-t md:border-t-0 md:border-l border-white/15 col-span-2 md:col-span-1">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate flex items-center justify-center gap-2">
              <span>🌍</span> 4 COUNTRIES
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              NG &middot; ZW &middot; RW &middot; UG
            </div>
          </div>

          <div className="p-2 border-t md:border-t-0 border-l border-white/15 col-span-2 md:col-span-1">
            <div className="font-display text-2xl sm:text-4xl font-black text-[#C9A227] tracking-tight truncate flex items-center justify-center gap-2">
              <span>🎧</span> 3 NIGHTS
            </div>
            <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F4F1EA]/80">
              LIVE INTENSIVE
            </div>
          </div>
        </div>
      </section>

      {/* THE VIP MUSIC STREAMING LOUNGE (#music-section) - PLACED PROMINENTLY FOR MUSIC AUDIENCE */}
      <section id="music-section" aria-label="Official Music Anthem" className="py-16 sm:py-20 px-4 max-w-4xl mx-auto">
        <div className="rounded-3xl border-2 border-[#C9A227] bg-gradient-to-b from-black/80 via-[#2D0B4E]/60 to-black/80 p-6 sm:p-12 shadow-[0_0_60px_rgba(201,162,39,0.3)] backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle background glow in card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Spinning Vinyl Visualizer Left Column */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* Outer glowing soundwave rings */}
                <div className="absolute inset-0 rounded-full border border-[#C9A227]/30 animate-ping opacity-30" />
                <div className="absolute -inset-3 rounded-full border border-[#7B1FA2]/50" />
                
                {/* The Vinyl Disc */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#111] via-[#222] to-[#0a0a0a] border-4 border-[#C9A227]/80 shadow-[0_0_35px_rgba(0,0,0,0.9)] flex items-center justify-center animate-spin-slow relative overflow-hidden">
                  {/* Vinyl grooves */}
                  <div className="absolute inset-4 rounded-full border border-white/5" />
                  <div className="absolute inset-8 rounded-full border border-white/10" />
                  <div className="absolute inset-12 rounded-full border border-white/5" />
                  
                  {/* Center Album Art Label */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#C9A227] via-[#7B1FA2] to-[#C2185B] flex flex-col items-center justify-center border-2 border-black shadow-inner p-1 text-center">
                    <span className="font-display text-[10px] sm:text-xs font-black uppercase text-black leading-tight">
                      MENA OBRIKE
                    </span>
                    <span className="font-display text-xs sm:text-sm font-black uppercase text-white leading-none mt-0.5 drop-shadow">
                      I AM YOURS
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFD700] bg-black/60 px-4 py-1.5 rounded-full border border-[#C9A227]/40">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>OFFICIAL HIT ANTHEM</span>
              </div>
            </div>

            {/* Right Column: Title, Equalizer & High-Contrast Streaming Buttons */}
            <div className="md:col-span-7 text-center md:text-left space-y-5">
              <div>
                <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#C9A227]">
                  🎧 STREAM THE SONG THAT LAUNCHED THE REVOLUTION
                </div>
                <h2 className="mt-1 font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_20px_rgba(201,162,39,0.4)] leading-none">
                  &ldquo;I AM YOURS&rdquo;
                </h2>
                <p className="mt-2 font-display text-xl sm:text-2xl font-black uppercase text-[#FFD700] tracking-wide">
                  BY MENA OBRIKE (@MENBRIKS)
                </p>
                <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/80 leading-relaxed">
                  Listen to the powerful anthem of African youth empowerment on your favorite streaming platform while we build your permanent income channel.
                </p>
              </div>

              {/* Simulated Waveform Bar */}
              <div className="rounded-xl border border-white/15 bg-black/50 p-3 sm:p-4 flex items-center justify-between gap-4 shadow-inner">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FFD700]">
                  <span>▶️</span>
                  <span>0:00 / 3:45</span>
                </div>
                <div className="flex items-end justify-center gap-1 flex-1 h-6 px-2 overflow-hidden" aria-hidden="true">
                  {[22, 10, 18, 24, 8, 14, 26, 12, 20, 6, 24, 16, 22, 10, 18, 26, 14, 8, 22, 16].map((h, idx) => (
                    <span
                      key={idx}
                      className="w-1 sm:w-1.5 bg-gradient-to-t from-[#7B1FA2] to-[#C9A227] rounded-full transition-all duration-300"
                      style={{ height: `${h}px`, animation: `eq${(idx % 4) + 1} ${0.5 + (idx % 3) * 0.2}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
                <div className="text-xs font-bold text-[#F4F1EA]/70 uppercase tracking-wider">
                  HIGH DEF 🎧
                </div>
              </div>

              {/* 4 Massive Glowing Streaming Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={MENA_CONFIG.SPOTIFY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] p-4 text-sm sm:text-base font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(29,185,84,0.4)] transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2.5 min-h-[52px]"
                >
                  <span className="text-xl">🎧</span>
                  <span>SPOTIFY</span>
                </a>

                <a
                  href={MENA_CONFIG.APPLE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-gradient-to-r from-[#A238FF] to-[#FF007F] hover:brightness-110 p-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(162,56,255,0.4)] transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2.5 min-h-[52px]"
                >
                  <span className="text-xl">🎵</span>
                  <span>DEEZER / APPLE</span>
                </a>

                <a
                  href={MENA_CONFIG.YOUTUBE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#FF0000] hover:bg-[#ff1a1a] p-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2.5 min-h-[52px]"
                >
                  <span className="text-xl">▶️</span>
                  <span>YOUTUBE VIDEO</span>
                </a>

                <a
                  href={MENA_CONFIG.MENA_TIKTOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border-2 border-[#C9A227] bg-black/80 hover:bg-[#C9A227]/20 p-4 text-sm sm:text-base font-black uppercase tracking-wider text-[#FFD700] shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2.5 min-h-[52px]"
                >
                  <span className="text-xl">📱</span>
                  <span>@MENBRIKS TIKTOK</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story - 3 short paragraphs in Rume Dominic's plain declarative voice */}
      <section aria-label="The Story" className="py-12 sm:py-16 px-4 max-w-3xl mx-auto text-lg sm:text-xl font-normal leading-relaxed space-y-6 text-[#F4F1EA]/90">
        <div className="rounded-2xl border border-white/15 bg-black/40 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl">
          <p className="flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">🌍</span>
            <span>
              Over 3 live nights starting 25 July 2026, real people across Nigeria, Zimbabwe, Rwanda, and Uganda were paid real money during the &ldquo;I Am Yours&rdquo; broadcast. There was no lottery. There were no special connections required. Cash went directly into verified bank accounts.
            </span>
          </p>

          <p className="font-bold text-[#FFD700] flex items-start gap-3 bg-[#C9A227]/10 p-4 rounded-xl border border-[#C9A227]/30">
            <span className="text-2xl shrink-0 mt-0.5">⚡</span>
            <span>
              But cash finishes. Skill does not finish. Money does not flow to where it is needed. It flows through a channel you build. When you build engineering and AI skills, you stop waiting for giveaways and start owning your output.
            </span>
          </p>

          <p className="flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">🤝</span>
            <span>
              Mena Obrike and I partnered to build that permanent channel for you. You do not pay a single Naira, Shilling, or Franc for this training. We removed the tuition fee completely so you can start building your skill today.
            </span>
          </p>
        </div>
      </section>

      {/* The Scholarship - Conversion Block with Maximum Visual Weight & Music Audience Synergy */}
      <section id="claim-section" aria-label="The Rume Dominic Scholarship" className="py-12 sm:py-16 px-4 max-w-4xl mx-auto">
        <div className="rounded-3xl border-2 border-[#C9A227] bg-gradient-to-b from-black/90 via-[#2D0B4E]/50 to-black/90 p-6 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
          <div className="text-center">
            <div className="inline-block rounded-full bg-[#C9A227]/20 border border-[#C9A227]/60 px-4 py-1 text-xs font-black text-[#FFD700] uppercase tracking-widest mb-3">
              🎓 100% FREE TECH SCHOLARSHIP INTENSIVE
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow">
              THE RUME DOMINIC SCHOLARSHIP
            </h2>
            <p className="mt-2 text-base sm:text-xl font-bold uppercase tracking-wide text-[#FFD700]">
              Not an application. Not a waitlist. Claim it and it&apos;s yours.
            </p>
          </div>

          {/* 4 Cards with Music-Audience Synergy Badges */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 p-5 flex items-start gap-4 transition-all duration-300 hover:border-[#C9A227]/60">
              <span className="text-3xl shrink-0" aria-hidden="true">📘</span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#FFD700] mb-0.5">TIER 1 ASSET</div>
                <h3 className="font-bold text-lg text-white">Book: {MENA_CONFIG.BOOK_TITLE}</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Bridging AI and human logic with 51,000+ hours of development engineering insights.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 p-5 flex items-start gap-4 transition-all duration-300 hover:border-[#C9A227]/60">
              <span className="text-3xl shrink-0" aria-hidden="true">🎓</span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#FFD700] mb-0.5">TIER 2 TRAINING</div>
                <h3 className="font-bold text-lg text-white">Course: {MENA_CONFIG.COURSE_NAME}</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Go from total beginner to confident AI automation builder in three intensive nights.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 p-5 flex items-start gap-4 transition-all duration-300 hover:border-[#C9A227]/60">
              <span className="text-3xl shrink-0" aria-hidden="true">🛠️</span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#FFD700] mb-0.5">TIER 3 TOOLS</div>
                <h3 className="font-bold text-lg text-white">Product: {MENA_CONFIG.PRODUCT_NAME}</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/70 leading-normal">
                  Production-ready tools and engineering templates to accelerate your digital output.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#C9A227]/50 bg-gradient-to-r from-[#C9A227]/15 to-transparent p-5 flex items-start gap-4 transition-all duration-300 hover:border-[#C9A227]">
              <span className="text-3xl shrink-0 animate-bounce" aria-hidden="true">💬</span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#FFD700] mb-0.5">LIVE COMMUNITY</div>
                <h3 className="font-bold text-lg text-white">The Room: WhatsApp Mentorship</h3>
                <p className="mt-1 text-xs sm:text-sm text-[#F4F1EA]/80 leading-normal font-semibold">
                  Direct peer accountability and live 3-night intensive updates with Rume &amp; Mena.
                </p>
              </div>
            </div>
          </div>

          {/* Inline Claim Form */}
          <div className="mt-8">
            <MenaClaimForm />
          </div>
        </div>
      </section>

      {/* Want Me in the Room With You (Soft Mentorship Invitation) */}
      <section aria-label="Private Mentorship Cohort" className="py-12 px-4 max-w-2xl mx-auto text-center">
        <div className="rounded-2xl border border-[#C9A227]/30 bg-black/50 p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-[#FFD700]">
            Want me in the room with you?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#F4F1EA]/85">
            If you want direct mentorship where we review your code and architect your AI systems together, I open a small private cohort. You do not need this paid room to succeed with the free tools above. But if you want me in the room with you, you can apply.
          </p>
          <div className="mt-5">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#C9A227] bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#FFD700] hover:bg-[#C9A227]/20 transition-all min-h-[44px]"
            >
              Explore the private mentorship cohort &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Block - 8 Mandatory Questions in Clean Accordion-like Blocks */}
      <section aria-label="Frequently Asked Questions" className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-center text-white mb-10">
          FREQUENTLY ASKED <span className="text-[#C9A227]">QUESTIONS</span>
        </h2>

        <div className="space-y-4">
          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>❓</span> What is the &ldquo;I Am Yours&rdquo; Empowerment Live?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              The &ldquo;I Am Yours&rdquo; Empowerment Live is a 3-night virtual broadcast intensive starting 25 July 2026 where artist Mena Obrike and AI engineer Rume Dominic Uririe disbursed direct financial aid and launched a free pan-African tech scholarship. During the event on TikTok, verified participants received cash prizes directly to their bank accounts.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>🎙️</span> Who is Mena Obrike?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              Mena Obrike (also known as Menbriks) is an African recording artist, philanthropist, and the creator of the hit song &ldquo;I Am Yours&rdquo;. He organized the empowerment broadcast to support youth across Africa with immediate financial relief and long-term educational access.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>⚡</span> Who is Rume Dominic Uririe?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              Rume Dominic Uririe is a Nigerian AI engineer, blockchain architect, author of &ldquo;From Code to Consciousness&rdquo;, and the founder of Vorem. He designed the 3-night AI curriculum and tech scholarship to equip African youth with permanent, high-income engineering skills.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>🎁</span> Is the scholarship really free?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              The Rume Dominic Scholarship is 100% free and open to anyone in Nigeria, Zimbabwe, Rwanda, or Uganda without any application fee or tuition cost. You receive instant access to the book, course, product, and mentoring community immediately upon claiming.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>🌍</span> Who can claim it &mdash; which countries?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              The free tech scholarship can be claimed by anyone residing in Nigeria, Zimbabwe, Rwanda, Uganda, or other African nations. It was specifically built for young adults and music fans seeking practical digital skills without financial barriers.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>📱</span> Do I need a laptop?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              You do not need a laptop to start learning AI, digital marketing, or web automation in the Rume Dominic Scholarship. All core training modules, reading materials, and community mentoring can be completed directly on an Android or iOS smartphone.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-white/30">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>⏳</span> I missed the live. Can I still get the scholarship?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed pl-7">
              Yes, you can still claim the full tech scholarship even if you missed the 3-night live broadcast starting 25 July 2026. While the live cash giveaways have ended, the educational portal remains open for instant registration on this page.
            </p>
          </article>

          <article className="rounded-2xl border-2 border-[#C9A227]/60 bg-black/70 p-6 backdrop-blur-md shadow-lg">
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FFD700] flex items-center gap-2">
              <span>🛡️</span> How do I know this is not a scam?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/95 leading-relaxed pl-7 font-semibold">
              Nobody from Mena Obrike&apos;s team, Rume Dominic&apos;s team, or Vorem will ever ask you to pay a fee, buy a form, or send money to claim this scholarship. All cash prizes during the 3-night event were disbursed by Menbriks directly to winners&apos; personal accounts, and all education here is delivered at zero cost.
            </p>
          </article>
        </div>
      </section>

      {/* Footer - Vorem line appears once, small, as mandated */}
      <footer className="border-t border-white/15 bg-black/90 py-12 px-4 text-center text-xs sm:text-sm text-[#F4F1EA]/60 space-y-4 relative z-10">
        <p className="font-semibold text-[#F4F1EA]/80">
          Training delivered by Vorem, a Rume Dominic company.
        </p>
        <p>
          &copy; {new Date().getFullYear()} Mena Obrike &times; Rume Dominic Uririe. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-2">
          <Link href="/" className="hover:text-[#FFD700] transition-colors min-h-[44px] flex items-center font-bold">
            ← Back to Main Site
          </Link>
          <Link href="/#contact" className="hover:text-[#FFD700] transition-colors min-h-[44px] flex items-center font-bold">
            Contact Support
          </Link>
          <a href={MENA_CONFIG.MENA_TIKTOK} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors min-h-[44px] flex items-center font-bold">
            @MENBRIKS TikTok
          </a>
        </div>
      </footer>

      {/* STICKY FLOATING AUDIO & SCHOLARSHIP BAR (THE STICKY FACTOR!) */}
      <div className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto z-50 bg-black/85 backdrop-blur-2xl border-2 border-[#C9A227] rounded-full p-2 sm:p-2.5 shadow-[0_0_35px_rgba(201,162,39,0.7)] flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 transition-all animate-fade-in">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="flex items-end gap-0.5 h-3 shrink-0" aria-hidden="true">
            <span className="w-1 bg-[#00F2FE] rounded animate-eq-2" />
            <span className="w-1 bg-[#C9A227] rounded animate-eq-1" />
            <span className="w-1 bg-[#FF007F] rounded animate-eq-3" />
          </span>
          <div className="truncate text-left font-sans">
            <div className="text-[10px] sm:text-xs font-black text-[#FFD700] uppercase tracking-wider leading-none">
              🎧 Playing: &ldquo;I Am Yours&rdquo;
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 font-bold truncate mt-0.5">
              Mena Obrike &times; Rume Dominic
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#music-section"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-1.5 text-xs font-bold uppercase text-white transition-all border border-white/20 min-h-[36px]"
          >
            <span>Stream 🎵</span>
          </a>
          <a
            href="#claim-section"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#C9A227] px-4 py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[0_0_15px_rgba(201,162,39,0.6)] hover:scale-105 active:scale-95 transition-all min-h-[36px] whitespace-nowrap"
          >
            <span>⚡ Claim Scholarship</span>
          </a>
        </div>
      </div>
    </main>
  );
}
