# DEPLOY — rumedominic.com

Ship the flagship Next.js site to Vercel and wire up the domain, Brevo, and Calendly.
Run `npm run verify` (typecheck + tests + build) before every deploy.

## STEP 0 — the domain (do this first)
rumedominic.com may currently show a parked/registrar page. Point it at Vercel:
- Vercel → Project → **Settings → Domains** → add `rumedominic.com` and `www`.
- In your registrar (Namecheap), set the records Vercel shows:
  - `A` record `@` → the IP Vercel gives you, **or**
  - the `CNAME`/nameserver option Vercel recommends.
- Until DNS resolves to Vercel, nothing shows. This is a dashboard fix, not code.

## STEP 1 — deploy to Vercel
Option A (Git — recommended):
1. Push this repo to GitHub.
2. Vercel → **New Project** → import the repo. Framework auto-detects Next.js.
3. Add the environment variables from STEP 2, then **Deploy**.

Option B (CLI):
```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## STEP 2 — environment variables (Vercel → Settings → Environment Variables)
| Key | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://rumedominic.com` | canonical/OG/sitemap; no trailing slash |
| `NEXT_PUBLIC_CALENDLY_URL` | `https://calendly.com/rumedominic/strategy-call` | your real Calendly link |
| `BREVO_API_KEY` | `xkeysib-…` | **secret** — server only, never `NEXT_PUBLIC_` |
| `BREVO_CONTACT_LIST_ID` | `4` | Brevo → Contacts → Lists → (numeric id) |
| `BREVO_NEWSLETTER_LIST_ID` | `5` | separate list for the footer newsletter |

The site builds and deploys **without** the Brevo keys — the forms return success
and simply don't persist until keys are added (so you can launch, then wire leads).

## STEP 2b — Elastic (log shipping, optional)
Server logs (lead captures, provider failures, brain runs) ship to Elasticsearch
in ECS format when these are set — locally in `.env.local`, on Vercel in project
settings, and on Cloud Run via the `ELASTIC_URL` / `ELASTIC_API_KEY` GitHub
Actions secrets (already wired in `.github/workflows/deploy-gcp.yml`):

| Key | Example | Notes |
|---|---|---|
| `ELASTIC_URL` | `https://xyz.es.us-central1.gcp.elastic-cloud.com` | Elasticsearch endpoint (Elastic Cloud → deployment page) |
| `ELASTIC_API_KEY` | `base64key==` | **secret** — Stack Management → API keys |
| `ELASTIC_DATASET` | `rumedominic.site` | optional; logs land in `logs-<dataset>-default` |

Unset = shipping disabled; logs still print to the console (Cloud Run/Vercel logs).
The growth-brain engine ships its Winston logs the same way — set the same keys in
`growth-brain/living_DATA-engine 2/.env` (dataset `rumedominic.growth-brain`).
View everything in Kibana → Discover / Observability → Logs.

## STEP 3 — Brevo (lead capture)
1. Create a free Brevo account → **Contacts → Lists** → create two lists
   ("Strategy Calls", "Newsletter"). Note their numeric IDs.
2. **SMTP & API → API Keys** → create a key → set it as `BREVO_API_KEY`.
3. (Optional) Automation: on new contact in "Strategy Calls" → email you a
   notification and/or send the lead an intro. Redeploy after setting the vars.

## STEP 4 — Calendly (booking)
Create your event type, copy the scheduling URL, set `NEXT_PUBLIC_CALENDLY_URL`.
The inline widget on the Contact section picks it up automatically.

## STEP 5 — before launch (content polish)
- `content/proof.ts` → replace placeholder testimonials with real quotes.
- `public/books/` → add real cover images; update paths in `content/books.ts`.
- Confirm social links in `content/site.ts` (X, LinkedIn, Medium, YouTube).

## STEP 6 — verify live
- `/` renders, stats animate, CTAs work.
- `/master-ai` serves the preserved funnel (rewrite in `next.config.mjs`).
- `/sitemap.xml`, `/robots.txt`, and the OG image (`/opengraph-image`) resolve.
- Run Lighthouse — target ≥95 on all four scores.

## The preserved funnel
`public/master-ai/` is the original static "Master AI in 9 Days" page, served at
`/master-ai`. Its own deploy notes (Brevo endpoint wiring for that page) live in
`public/master-ai/FUNNEL-DEPLOY.md`.
