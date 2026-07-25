
# ROOTS.md — The Soil Check (Root #1: the gate that enforces the other twelve)

> **Read order:** This file is read FIRST, before `CLAUDE.md`, before any rules layer,
> before a single line is written. A scaffold is not "done" until this audit passes.
> Above the soil, every build looks green. This file checks the soil.
>
> **The rule this file exists to kill:** shipping a demo that looks identical to a
> system until production throws the first real storm. By then it's too late to grow roots.

---

## HOW THIS GATE WORKS

1. At **scaffold start**, copy this file into the project root. It is Root #1.
2. Every root below has a **target** (`SOLID` / `PARTIAL` / `N/A-justified`).
3. Six roots are marked **[KILLABLE]** — the ones Rume tends to skip. If any KILLABLE
   root is `MISSING` at ship time, **the scaffold CANNOT be declared done.** No exceptions
   without a written waiver in the Waiver Log at the bottom.
4. The build agent (Claude Code / Antigravity) must fill the **STATUS** and **EVIDENCE**
   columns with a real file path or commit — not a promise. "Will add later" = MISSING.
5. Score at start (target state) and again before ship (actual state). The gap is the work.

**Scoring:** `MISSING (0)` · `PARTIAL (1)` · `SOLID (2)` · max 26.
**Ship tiers:** `0–12 VIBE (blocked)` · `13–20 PILOT` · `21–26 SYSTEM`.
**Hard floor to ship anything client-facing:** all six [KILLABLE] roots ≥ PARTIAL, total ≥ 18.

---

## LAYER 1 — FOUNDATION (how it behaves)

### Root 1 · Defined Behaviour  `[KILLABLE]`
Is behaviour defined in `CLAUDE.md` / `AGENTS.md`, or improvised each run?
- **SOLID:** a governance file states behaviour, rules, boundaries; every session inherits it.
- **TARGET:** SOLID (this is table stakes for ICM — you already do this well)
- **STATUS:** ___  **EVIDENCE:** `path/to/CLAUDE.md`

### Root 2 · Specification First  `[KILLABLE]`
Was the spec written before the code, or discovered after?
- **SOLID:** a written spec/PRD/task file exists and predates the code; "done" defined up front.
- **TARGET:** SOLID (your 17-doc travel platform proves you can — enforce it every time)
- **STATUS:** ___  **EVIDENCE:** `docs/SPEC.md` or `TASK_*.md`

---

## LAYER 2 — STRUCTURE (how it's built)

### Root 3 · Decomposition
Subagents / skills / hooks — decomposed, or one giant prompt?
- **SOLID:** work split into small, named, single-purpose parts, each inspectable alone.
- **TARGET:** SOLID (folders-as-state-machine already gives you this)
- **STATUS:** ___  **EVIDENCE:** stage folders / module list

### Root 4 · Planning
Can it plan and break down tasks, or only react?
- **SOLID:** produces a reviewable plan before acting — steps, order, dependencies.
- **TARGET:** SOLID
- **STATUS:** ___  **EVIDENCE:** plan file / stage table in CLAUDE.md

### Root 5 · Exit Criteria & Gates
Does it know what "done" means, with gates it must pass?
- **SOLID:** explicit "done means" checklist + human/fact gates before shipping.
- **TARGET:** SOLID (your human-gate pattern on Stage 3/4 is exactly this)
- **STATUS:** ___  **EVIDENCE:** gate definitions / `_STATE.json` checks

### Root 6 · Context Management
Is context assembled deliberately, or dumped in?
- **SOLID:** the right context is selected and scoped per task; clean, intentional.
- **TARGET:** SOLID
- **STATUS:** ___  **EVIDENCE:** per-stage CLAUDE.md scoping / retrieval boundaries

---

## LAYER 3 — SAFETY (what happens when it breaks)

### Root 7 · Sandboxing & Isolation  `[KILLABLE]`
Can a failure be contained, or does it spread?
- **SOLID:** failures isolated — a broken part can't corrupt live data or down the system.
- **WHY YOU SKIP IT:** the happy path demos fine, so isolation feels optional. It isn't.
- **TARGET:** SOLID for anything touching real users/money (Eagles Den, MAY_ADAM, Tenant Hub)
- **STATUS:** ___  **EVIDENCE:** read-only raw data / try-catch boundaries / staging env

### Root 8 · Trajectory Review
Can you see how it reached an answer?
- **SOLID:** the path to any output is visible — commits, logs, PRs, reasoning traces.
- **TARGET:** SOLID (git + PR review already gives you this — keep it)
- **STATUS:** ___  **EVIDENCE:** commit history / logging / PR process

### Root 9 · Guardrails  `[KILLABLE]`
Are boundaries enforced, or assumed?
- **SOLID:** boundaries enforced by the system (branch protection, permissions, drafts-only), not trust.
- **WHY YOU SKIP IT:** you're often the only dev, so "I'll just be careful" substitutes for enforcement. Then a teammate or an agent arrives and there's no wall.
- **TARGET:** SOLID (you just did this with IK's branch protection — make it default)
- **STATUS:** ___  **EVIDENCE:** branch rules / permission config / agent guardrails

### Root 10 · Verification Loops  `[KILLABLE]`
Does it check its own work?
- **SOLID:** the system tests / validates / reviews its own output before presenting it.
- **WHY YOU SKIP IT:** the output looks right, so self-checking feels like overhead. It's the difference between "looked right" and "is right."
- **TARGET:** at least PARTIAL everywhere; SOLID for data/financial outputs
- **STATUS:** ___  **EVIDENCE:** tests / validation step / self-review pass

---

## LAYER 4 — GROWTH (how it survives and improves)

### Root 11 · Retrieval / Grounding  `[KILLABLE]`
Is knowledge grounded in real sources, or hallucinated?
- **SOLID:** answers grounded in a retrieval stack / real data; cites or pulls from source.
- **WHY YOU SKIP IT:** the model sounds confident, so grounding feels unnecessary — until it invents a number in front of a client. Ties directly to your locked "no fabricated claims" rule.
- **TARGET:** SOLID for anything factual/client-facing
- **STATUS:** ___  **EVIDENCE:** retrieval layer / source citations / grounding step

### Root 12 · Agentic CI/CD  `[KILLABLE]`
Does it ship through a pipeline, or by hand?
- **SOLID:** changes ship through an automated pipeline with checks; repeatable, logged, reversible.
- **WHY YOU SKIP IT:** hand-pushing is faster on day one. Then there's no record, no rollback, and a bad deploy has no undo.
- **TARGET:** at least PARTIAL (even a GitHub Action running tests on PR counts)
- **STATUS:** ___  **EVIDENCE:** `.github/workflows/` / deploy pipeline

### Root 13 · Feedback & Iteration
Does it improve from feedback, or just repeat?
- **SOLID:** a loop captures outcomes, feeds them back, and the system measurably improves.
- **TARGET:** PARTIAL at launch, SOLID as it matures
- **STATUS:** ___  **EVIDENCE:** feedback capture / WHAT_WORKS.md updates / metrics

---

## THE SIX YOU TEND TO SKIP (your personal watch-list)

These are the [KILLABLE] roots. History says these are the ones that get "added later"
and never do. This file makes "later" impossible — they gate the ship.

| # | Root | The lie you tell yourself | The storm it lets in |
|---|------|---------------------------|----------------------|
| 1 | Defined Behaviour | "I know how it should act" | Next session/agent behaves differently |
| 2 | Specification First | "I'll spec it as I build" | Scope drifts; no definition of done |
| 7 | Sandboxing | "The happy path works" | One failure corrupts live data |
| 9 | Guardrails | "I'll just be careful" | A teammate/agent has no wall to stop them |
| 10 | Verification | "It looks right" | It looked right; it wasn't |
| 11 | Grounding | "The model sounds sure" | It invented a fact in front of a client |

---

## SHIP DECISION

- [ ] All six [KILLABLE] roots are ≥ PARTIAL
- [ ] Total score ≥ 18 (client-facing) or ≥ 13 (internal pilot)
- [ ] Every STATUS has real EVIDENCE (a path/commit), not a promise
- [ ] Any MISSING [KILLABLE] root has a signed waiver below

**Score: ___ / 26  →  Tier: ___  →  Ship: YES / NO**

### Waiver Log
> A KILLABLE root may only ship MISSING with a written reason and a date to fix.
> No waiver = no ship. This log is read at every review.

| Root | Reason shipped without it | Fix-by date | Signed |
|------|---------------------------|-------------|--------|
|      |                           |             |        |

---

*The Soil Check · MCKI Solutions · aligned with ICM (Interpretable Context Methodology).*
*Framework roots credited to Brij Kishore Pandey & Gabriel Millien; enforcement instrument is MCKI's.*
*We don't just build AI. We check whether it survives the storm.*