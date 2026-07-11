# ⚡ LIVING ENGINE
### 24/7 Agentic AI Lead Generation System
**Rume Dominic · Vorem Nigeria · Target: £8,000,000**

---

## What Makes This a Living System

Most lead tools are scripts. This is an **organism**.

After every cycle, Claude reads all performance data and asks itself:
- Which niches are getting replies? → prioritise those
- Which email providers convert? → filter for those
- Is the score threshold too low? → raise it
- What email angle is working? → stick with it
- What's failing? → drop it

Then it writes those decisions to memory and runs the next cycle differently.
**The system gets smarter every week. Without you.**

---

## The 9 Stages

```
01  DISCOVER     SerpAPI + Keepa → Amazon seller brand domains
02  MX-INTEL     FREE DNS lookup → identify email provider → filter targets
03  HARVEST      Playwright → extract emails from brand websites
04  ENRICH       Hunter.io + Apollo.io → verify + enrich contacts
05  SCORE        Claude AI → 0-100 score + provider-specific hook
06  OUTREACH     Claude AI → personalised sequence → Instantly.ai
08  MATCH        Claude AI → lead data → exact product to sell (ascension ladder)
09  CONVERT      Claude AI → product-specific sales sequence
07  LEARN        Claude AI → analyse results → update memory → improve
```

## The Flywheel: How Data Becomes £8M

The engine doesn't just collect leads — it knows what to sell each one.

Every lead carries signals. Those signals decide the product:

```
Lead Signal              →  Matched Entry Product       →  Ascension Path
─────────────────────────────────────────────────────────────────────────
Micro pet seller         →  £19.99 book                 →  course → service
Small beauty brand       →  £97 AI course               →  cohort → service
Mid automotive brand     →  £1,500/mo email service     →  consulting
Large kitchen brand      →  £2,000/mo consulting        →  mastermind → speaking
```

The Product Ladder (`src/products/catalogue.js`):
- Rung 1: Books (£10-40) — your 5 existing titles, the trust builders
- Rung 2: Courses (£97-497) — Vorem LMS transformation
- Rung 3: Services (£1,500-2,300/mo) — email marketing, dropship setup
- Rung 4: Consulting (£2,000/mo) — MCKI enterprise retainer
- Rung 5: Mastermind + Speaking (£1,200-5,000) — the apex

Stage 08 matches each lead to its entry rung. Stage 09 writes the
product-specific sales sequence. The revenue ledger tracks every sale
toward £8M. MRR is calculated automatically.

## The 7 Stages (legacy reference)

```
01  DISCOVER     SerpAPI + Keepa → Amazon seller brand domains
02  MX-INTEL     FREE DNS lookup → identify email provider → filter targets
03  HARVEST      Playwright → extract emails from brand websites
04  ENRICH       Hunter.io + Apollo.io → verify + enrich contacts
05  SCORE        Claude AI → 0-100 score + provider-specific hook
06  OUTREACH     Claude AI → personalised sequence → Instantly.ai
07  LEARN        Claude AI → analyse results → update memory → improve
```

---

## MX Intelligence — The Core Innovation

Every seller's domain has MX records. These records reveal which email service they use.
This is a FREE DNS lookup — no API key needed.

**We ONLY contact sellers using:**
- Network Solutions Webmail → `mail.networksolutions.com`
- Private Email (Namecheap) → `mx1.privateemail.com`
- Titan Email → `smtp.titan.email`
- Zoho Mail → `mx.zoho.com`
- GoDaddy Workspace Email → `smtp.secureserver.net`
- Rackspace Email → `mx1.emailsrvr.com`
- Fastmail Business → `in1-smtp.messagingengine.com`
- IONOS (1&1) → `mx00.ionos.com`
- ProtonMail Business → `mail.protonmail.ch`
- SiteGround → `mx.siteground.com`
- Self-hosted (cPanel/WHM) → `mail.[theirdomain].com`
- 123-Reg (UK) → `mx0.123-reg.co.uk`
- Krystal (UK) → `mx.krystal.io`
- + 15 more premium providers

**We SKIP: gmail, outlook, hotmail, yahoo** — wrong profile, wrong decision speed.

---

## The Agent Memory

Lives in `/memory/`:
```
agent-state.json          Current config — updated every cycle
niche-performance.json    Reply rates by niche — built over time
provider-performance.json Conversion by email provider
learning-log.jsonl        Append-only log — every AI decision, forever
```

After 10 cycles, the agent knows which niches to skip, which providers to prioritise,
and what subject lines are working. After 50 cycles, it's a precision instrument.

---

## Quick Start

```bash
# 1. Unzip in VS Code
# 2. Install
npm install
npm run install:browsers

# 3. Configure
cp .env.example .env
# Add your API keys (see .env.example)

# 4. Initialise
npm run db:init

# 5. Test single cycle
npm run agent:once

# 6. Start living (runs forever on schedule)
npm run agent
```

---

## API Keys Required

| Service        | URL                                           | Cost     | Used For              |
|----------------|-----------------------------------------------|----------|-----------------------|
| Anthropic      | console.anthropic.com/settings/keys           | Per use  | Brain + scoring       |
| SerpAPI        | serpapi.com/manage-api-key                    | $50/mo   | Domain discovery      |
| Hunter.io      | hunter.io/api-keys                            | $49/mo   | Email verification    |
| Apollo.io      | app.apollo.io settings                        | Free+    | Contact enrichment    |
| Keepa          | keepa.com/#!api                               | €19/mo   | Amazon BSR data       |
| Companies House| developer.company-information.service.gov.uk  | FREE     | UK business data      |
| Instantly.ai   | instantly.ai settings                         | $37/mo   | Email sending         |
| DNS (MX)       | Built-in Node.js dns module                   | FREE     | Email provider intel  |

**Total: ~£135/mo → targets 500-2,000 verified leads per month**

---

## The £8M Model

```
Weekly cycle output:
  500 domains discovered
  × 35% MX-filtered as targets     = 175 premium-provider domains
  × 45% email extraction            = 79 emails
  × 75% verified                    = 59 verified leads
  × 70% score ≥65                   = 41 outreached

Monthly (4 cycles):
  164 contacts/mo × 3% reply rate   = 5 replies
  × 40% close rate                  = 2 new clients/mo
  × £1,500/mo average               = £3,000/mo Year 1

Scale trajectory:
  Cycle 10: Agent knows top 3 niches. Focus tightens. Reply rate hits 5%.
  Cycle 20: Provider targeting optimised. 3x conversion.
  Month 12: 8 niches × optimised targeting = 30+ clients × £1,500 = £45,000/mo
  Year 3 + books + courses + consulting = £8M+
```

---

## Hardening Rules

| Rule | Description                                           |
|------|-------------------------------------------------------|
| H1   | One change at a time — checkpoint before every edit  |
| H2   | Secrets in .env only — zero hardcoded credentials    |
| H3   | All DB calls via src/lib/db.js only                  |
| H4   | Rate limiter on every external API call              |
| H5   | robots.txt checked before every domain scrape        |
| H6   | try/catch on every async operation                   |
| H7   | Full audit trail — every action timestamped in DB    |
| H8   | Unsubscribe in every outbound email                  |

---

*Timeless. Generational. Empowering.*
*Rume Dominic — Vorem Nigeria — vorem.co*
