# LIVING ENGINE — ICM Layer 0
# Agentic AI Lead Generation System · Rume Dominic · Vorem Nigeria
# "A 24/7 living data organism that learns, adapts, and improves every cycle."

## What Makes This Different From a Pipeline

A pipeline runs and stops. This is an AGENT.

Every cycle the agent:
1. Reads its own memory (what worked, what failed)
2. Asks Claude: "What should I change this cycle?"
3. Gets back adjusted targeting, new queries, better scoring rules
4. Runs the pipeline with those adjustments
5. Measures results (open rates, reply rates, conversion)
6. Writes what it learned back to memory
7. Sleeps until next cycle
8. Wakes SMARTER

This is not automation. This is evolution.

## The 9-Stage Living Pipeline

```
01  DISCOVER    SerpAPI + Keepa + GMB → seller brand domains
02  MX-INTEL    DNS MX lookup → fingerprint email provider → filter targets
03  HARVEST     Playwright → extract emails from brand websites + Companies House
04  ENRICH      Hunter.io + Apollo.io + RDAP → verify + enrich contacts
05  SCORE       Claude AI → 0-100 fit score + pain point + provider-specific hook
06  OUTREACH    Claude AI → personalised sequence → Instantly.ai → send
08  MATCH       Claude AI → lead data → exact product on the ascension ladder
09  CONVERT     Claude AI → product-specific sales sequence per lead
07  LEARN       Claude AI → analyse cycle results → update agent memory → improve
```

## The Flywheel: Data → Product → Revenue

The lead engine doesn't just find people. Each lead's signals
(niche, revenue band, pain point, email provider) DECIDE which
product to sell them — and the full ascension path above it.

```
Micro pet seller    → £19.99 book → £97 course → £1,500/mo service
Mid beauty brand    → £1,500/mo email service → £2,000/mo consulting
Large automotive    → £2,000 consulting → £1,200 mastermind → £5,000 speaking
```

The data decides the offer. Automatically. At scale.
This is how leads become £8M.

## Target Email Providers (MX Intelligence)

PRIME TARGETS (small biz owner, pays for email, fast decisions):
- Network Solutions Webmail  → mail.networksolutions.com
- Private Email (Namecheap)  → mx1.privateemail.com
- Titan Email                → smtp.titan.email
- Zoho Mail                  → mx.zoho.com
- GoDaddy Workspace          → smtp.secureserver.net
- Rackspace Email             → mx1.emailsrvr.com
- Fastmail Business           → in1-smtp.messagingengine.com
- IONOS (1&1)                 → mx00.ionos.com
- ProtonMail Business         → mail.protonmail.ch
- SiteGround                  → mx.siteground.com
- cPanel/WHM Self-Hosted      → mail.[theirdomain].com
- 123-Reg (UK)                → mx0.123-reg.co.uk
- Krystal (UK)                → mx.krystal.io
- Hushmail                    → mail.hushmail.com

SKIP: gmail.com, outlook.com, hotmail.com, yahoo.com (wrong profile)

## Agent Memory System

The agent maintains living memory in /memory/:
- memory/agent-state.json      Current config, cycle count, global stats
- memory/niche-performance.json Per-niche reply rates and conversion
- memory/provider-performance.json Per MX provider performance
- memory/query-performance.json Which search queries yield best leads
- memory/learning-log.jsonl    Append-only log of every AI decision

Claude reads these before each cycle and decides what to change.

## Hardening Rules (NON-NEGOTIABLE)
H1. One change at a time — checkpoint every multi-file edit
H2. Secrets in .env ONLY — zero hardcoded credentials
H3. Single source of truth — all DB calls via src/lib/db.js
H4. Rate limit every external API call
H5. robots.txt checked before every domain scrape
H6. try/catch on every async operation
H7. Full audit log — every lead action timestamped in DB
H8. Unsubscribe link in every outbound email

## Stack
Node.js 20 LTS · React 18 + Vite (dashboard) · SQLite (local)
Playwright (scraping) · Claude claude-sonnet-4-6 (AI brain)
SerpAPI · Keepa · Hunter.io · Apollo.io · Instantly.ai
