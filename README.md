# rumedominic.com — Rume Dominic flagship site

Personal brand + lead-generation site for **O'Rume Dominic Uririe (Rume Dominic)** —
Founder of VOREM, blockchain architect, AI engineer, and author. Built spec-first
with strict testing, CI, and observability (the "Rume standard" — no vibe coding).

**Core promise:** *Build AI & Web3 products 5x cheaper and 7x faster with Africa's
top engineers — enterprise-grade security included.*

## Stack
- **Next.js 14** (App Router) + **TypeScript** + **Tailwind** + **Framer Motion**
- **Vitest + Testing Library** (27 tests) · **GitHub Actions** CI
- **Vercel Analytics** + a typed `track()` event layer
- **Brevo** for lead/newsletter capture · **Calendly** for booking
- JSON-LD (Person + Organization + Book), sitemap, robots, dynamic OG image

## Quick start
```bash
cp .env.example .env.local     # fill in the values you have
npm install
npm run dev                    # http://localhost:3000
```

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest suite (27 tests) |
| `npm run verify` | typecheck + test + build (run before every deploy) |

## Project shape
```
app/            layout, page (10 sections), api/contact, api/newsletter,
                sitemap, robots, opengraph-image
components/     Hero, Services, RumeMethod, Books, Proof, Insights, About,
                Contact(+Form, Calendly), Footer(+Newsletter), StatCounter, NodeField
content/        TYPED SINGLE SOURCE OF TRUTH — edit copy here, not in JSX
lib/            analytics, rss (Medium), schema (JSON-LD), brevo, validation (zod)
public/master-ai/  PRESERVED static "Master AI in 9 Days" funnel (served at /master-ai)
__tests__/      Vitest specs
```

## Editing content (no code needed)
All copy, stats, services, books, proof, and links live in `content/*.ts`.
Change text there and the site updates — components render from these files.

- Replace **placeholder testimonials** in `content/proof.ts` (marked
  `placeholder: true`) with real, attributable quotes before launch.
- Drop real **book covers** into `public/books/` and update the `cover`
  path in `content/books.ts`.

## Deploy
See **DEPLOY.md** — Vercel + domain + Brevo + Calendly, step by step.

## Preserved funnel
The original "Master AI in 9 Days" lead magnet is untouched under
`public/master-ai/` and served at `/master-ai`. Its original notes are kept there
as `FUNNEL-README.md` / `FUNNEL-ARCHITECTURE.md` / `FUNNEL-DEPLOY.md`. The homepage
"Join Vorem Academy" CTA links straight to it.
