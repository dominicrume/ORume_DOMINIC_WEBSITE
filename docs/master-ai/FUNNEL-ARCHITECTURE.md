# Architecture — Master AI Funnel

## The flow
Traffic (your 12,000 audience, social, flier)
        |
        v
[ rumedominic.com/master-ai ]  <- this landing page (capture: name + email)
        |
        v
[ Brevo list + automation ]    <- delivers course + book, runs follow-up sequence
        |
        v
[ vorem.co paid courses ]      <- the money rung (Crypto & DeFi, Crypto & AI, etc.)

## Value ladder
- Rung 0 (FREE): Master AI in 9 Days course + From Code to Consciousness book  <-- THIS PAGE
- Rung 1 (low): other books
- Rung 2 (core paid): Crypto & DeFi Mastery ($99/N139,000), Crypto & AI (N49,000)
- Rung 3 (recurring): mentoring, Eagles Den, community
- Rung 4 (high): advisory / done-with-you

## Engineering rules (Rume standard)
- One source of truth. One module, one job.
- Secrets (Brevo API keys) only in server/.env — NEVER in this HTML.
- Change one thing at a time; keep a git checkpoint before edits.
- Measure: track signups by source so you know which channel converts.
- Real data only — no fake testimonials, metrics, or scarcity.
