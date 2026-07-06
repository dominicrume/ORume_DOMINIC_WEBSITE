# Architecture — rumedominic.com

## System shape
```
Visitor
   │
   ▼
[ Next.js 14 App Router @ rumedominic.com ]
   │   app/page.tsx composes 10 sections from content/*.ts
   │
   ├─ Hero / Services / Method / Books / Proof / About        (static, prerendered)
   ├─ Insights ── lib/rss.ts ── Medium RSS (ISR, revalidate 1h, empty-feed safe)
   ├─ Contact ── ContactForm ── POST /api/contact ── lib/brevo ─▶ Brevo "Strategy Calls"
   │           └ CalendlyEmbed ─▶ Calendly scheduling
   ├─ Footer ── NewsletterForm ── POST /api/newsletter ── lib/brevo ─▶ Brevo "Newsletter"
   └─ /master-ai  (rewrite) ─▶ public/master-ai/index.html  (PRESERVED funnel)
```

## Layers (one module, one job)
- **content/** — typed single source of truth. All copy/stats/links live here so
  non-devs edit text without touching JSX. Components are pure renderers of content.
- **components/** — presentational + interactive units. Client components only where
  interactivity is needed (forms, counters, canvas, nav); everything else is server.
- **lib/** — framework-agnostic logic, unit-tested in isolation:
  - `validation.ts` (zod schemas, shared by client guard + API)
  - `brevo.ts` (server-only provider adapter; returns a typed result, never throws)
  - `rss.ts` (parse is pure + testable; fetch wraps it and never throws)
  - `schema.ts` (JSON-LD builders) · `analytics.ts` (`track()` event layer)
- **app/api/** — thin route handlers: validate → call lib → map to HTTP status.

## Data / trust boundaries
- Secrets (`BREVO_API_KEY`) live only in server route handlers via env. Never shipped
  to the client, never `NEXT_PUBLIC_`.
- Every form has a **honeypot** (`company_website`) enforced on both client and server
  (zod `max(0)`), plus zod validation server-side as the source of truth.
- External embeds (YouTube, Calendly) are lazy and `youtube-nocookie`.

## Observability
- `@vercel/analytics` + `lib/analytics.track()` fire named events: `cta_book_call`,
  `contact_submit/success/error`, `newsletter_submit`, service clicks. These feed
  Vercel Analytics and `window.dataLayer` (for any tag manager).

## Quality gates (the Rume standard)
- `npm run verify` = typecheck + 27 Vitest tests + production build.
- `.github/workflows/ci.yml` runs the same on every push/PR.
- Governance box: build exactly the 10 specified sections — no feature hallucination.

## Value ladder (business context — preserved funnel)
- Rung 0 (FREE): Master AI in 9 Days + From Code to Consciousness  → `/master-ai`
- Rung 1 (low): the books (Amazon)
- Rung 2 (core paid): Crypto/DeFi/AI mastery tracks (vorem.co)
- Rung 3 (recurring): mentoring, community
- Rung 4 (high): advisory / done-with-you builds ($10k–$50k)  → the Contact CTA

The homepage's dual CTA maps to the two ends of this ladder: **Book a Strategy Call**
(rung 4) and **Join Vorem Academy** (rung 0).
