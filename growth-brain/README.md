# Growth Brain — the self-improving decision layer for the Rume Dominic revenue machine

Senior Principal Director's charter for the ML / data-research / decision system that sits on
top of rumedominic.com and learns from what works.

> Note on this folder: you created a folder named "machine learning , data research and ai
> brain decision maker". Code cannot import a path with spaces and commas, so the real system
> lives here in `growth-brain/`. Same idea, a name the machine can actually use. You can delete
> the old empty folder.

---

## What this is, in one line

A closed loop that watches every click, lead, email and dollar, figures out what is working and
what is not, proposes the next best move, and (once approved) ships it. Then it measures the
result and does it again. The machine gets smarter every week without you in the room.

## What it is NOT (so we build on truth, not hype)

- It is not a magic box that prints money with zero oversight. Ads spend real cash, emails hit
  real people under UK PECR/GDPR, and financial-promotion rules are real. The brain **decides
  and recommends autonomously**. Actions that spend money or contact humans stay **gated behind
  one approval** until a track record earns more autonomy. That is not a brake on growth. It is
  what stops the machine from torching the brand or breaking the law while you sleep.
- It cannot train ML on data that does not exist yet. Today we have almost no behavioural data.
  So Phase 1 is not modelling. It is **instrumentation**: start capturing every event now, so in
  weeks we have something to learn from. Anyone selling you ML on day one is selling you nothing.

## The dogfood advantage

This brain is built to Rume's own standard: **Know Your AgenticAi. Provable, auditable,
accountable.** Every decision it makes is logged with its evidence, every recommendation has a
named human owner, and nothing high-stakes runs without sign-off. The growth engine is itself a
live case study for the product we sell. We eat our own cooking.

---

## Architecture (fits the stack we already run)

```
  SITE + EMAIL + ADS                DATA PLANE              BRAIN                 ACTION
  ------------------                ----------              -----                 ------
  rumedominic.com  ─ events ─▶   Supabase: events  ─┐
  Brevo (opens,clicks) ─ API ─▶  Supabase: email   ─┤
  Vercel Analytics ─────────▶    Supabase: traffic ─┼─▶  Analytics engine ─▶  Claude
  Meta / LinkedIn ads ─ API ─▶   Supabase: spend   ─┘    (funnel, CAC, LTV,     (diagnoses,
  Brevo Deals (pipeline) ───▶    Supabase: deals         ROAS, cohorts)          ranks fixes,
                                                              │                   drafts them)
                                                              ▼                       │
                                        metrics_snapshots  ◀──┘                       ▼
                                        recommendations   ◀──────────────────  proposed actions
                                        experiments       ◀───  A/B tests  ───▶  (human approves)
                                                              │                       │
                                        Director's Brief  ◀───┘                       ▼
                                        (weekly email to    measure result ──▶  ship winner
                                         Rume + team)        feed back into the loop
```

Every box is a table or a small module in this folder. Nothing here needs a new platform. It is
Supabase (already ours), the site's API routes (already ours), and the Anthropic API for the
reasoning layer.

---

## The five phases (this is the path)

### Phase 1 — Instrument (collect the data). SHIPS FIRST.
Capture every meaningful event into Supabase: page views, scroll depth, CTA clicks, form starts
and submits, lead created, which magnet, referrer/UTM. Pull email opens/clicks from Brevo and
ad spend from Meta/LinkedIn. **Status: the site event capture and the `events` table ship in
this build.** Without this, everything downstream is guesswork. With it, the clock starts.

### Phase 2 — Analyse (deterministic, no ML needed).
Compute the numbers that actually matter, on a schedule: funnel conversion at each step, cost
per lead, per-CTA click rates, channel ROAS, cohort retention, weighted pipeline value. Pure
functions in `src/metrics.ts`. This alone tells you where the money leaks, week one.

### Phase 3 — Decide (the AI brain).
A scheduled job feeds the metrics snapshot to Claude with the targets and guardrails, and gets
back a ranked list of recommendations: what is underperforming, the hypothesis for why, the
specific change to make, the expected impact, and a confidence. Each one is logged with its
evidence and needs a human tick to run. `src/brain.ts`.

### Phase 4 — Model (ML, once data is rich enough).
When we have thousands of events, train models that beat rules of thumb: lead scoring (who will
convert), send-time optimisation, subject-line and creative ranking, churn and LTV prediction.
These plug into the same loop as better scores. `models/` (scaffold now, train later).

### Phase 5 — Optimise (closed loop).
Approved experiments run as real A/B tests. The brain reads results, calls significance, and
promotes winners (on approval at first, automatically later for low-risk changes). The system
now improves itself. `src/experiments.ts`.

---

## What runs without you (and what still needs a tap)

| Runs autonomously | Needs your one-click approval |
|---|---|
| Collecting and storing all events | Spending on ads or changing ad budgets |
| Computing weekly metrics | Sending any email to real people |
| Generating recommendations + the Director's Brief | Publishing site copy changes |
| Running the maths on live experiments | Anything touching money or regulated claims |
| Flagging anomalies (a funnel step falls off a cliff) | Promoting an experiment winner (until it earns trust) |

The weekly Director's Brief lands in your inbox with the numbers and a ranked action list. You
skim it, approve what you like, and the machine executes. That is the "see the path without
being in the weeds" experience you asked for.

---

## Guardrails (non-negotiable, they protect the money)

1. Human-in-the-loop for every outward or spending action. The brain proposes; a human disposes.
2. Full audit log. Every decision stored with its inputs and evidence (the KYA standard).
3. Patent is filed, not granted. No copy the brain drafts ever says "patented".
4. No financial-promotion output. The brain never touches investment/trading messaging (FCA).
5. Consent-first. It never proposes emailing anyone who did not opt in. The 24k stays cold-safe.
6. Kill switch. One env flag (`BRAIN_ENABLED=false`) stops all autonomous runs instantly.

---

## Files in this folder

- `README.md` — this charter.
- `config/targets.ts` — the KPIs, north-star metric, and target numbers the brain optimises for.
- `schema/001_init.sql` — the Supabase tables (events, snapshots, recommendations, experiments).
- `src/anthropic.ts` — thin Anthropic Messages API client (the reasoning engine).
- `src/events.ts` — event types shared by site and brain.
- `src/metrics.ts` — pure functions: raw events in, KPIs out. Fully unit-tested.
- `src/brain.ts` — the decision maker: snapshot in, ranked recommendations out.
- `src/report.ts` — the weekly Director's Brief generator.
- `src/pipeline.ts` — orchestrator that runs the whole weekly loop.
- Runtime entry: `app/api/brain/weekly` in the main app (Vercel Cron calls it weekly).
- Site capture: `app/api/events` + a two-line hook in `lib/analytics.ts` (ships in this build).

## To switch it on (what a human does once)
1. Run `schema/001_init.sql` in Supabase.
2. Set env: `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `BRAIN_WEEKLY_SECRET`, `BRAIN_ENABLED=true`.
3. Add a Vercel Cron hitting `/api/brain/weekly` weekly. Done. The loop is alive.
