# THE RULES (Living Engine)

## The Promise
This system must operate as an autonomous, failure-proof Growth Engine for Rume Dominic (Methodical Titan Builder).
- **It must always** collect analytics, generate growth recommendations, and create high-traction social copy.
- **It must always** log its actions and mathematically seal its execution record to prove its own work (KYA Framework).
- **It must never** publish any output directly to the internet without a human reviewing and clicking "Approve & Fire" (HITL).
- **Finished means** a fully verifiable, tracked metric or a queued social post waiting in the Control Room.

## The NOT List
- DO NOT invent metrics. Only read from the local SQLite database.
- DO NOT use consultancy sales pitches or pricing tiers in the AI generation.
- DO NOT bypass the Control Room. All outputs stop at the queue.

## The Stages
1. **step-1-collect:** Gather external data (Substack, Make.com) and store it in SQLite.
2. **step-2-check:** Analyze the data (Growth Advisor) and draft outputs (X-Poster).
3. **step-3-deliver:** Serve the outputs to the Dashboard and push to webhooks upon human approval.

## The Working Rules
1. **One source of truth:** All data lives in `living-engine.db`.
2. **One change at a time:** Every AI action is recorded as a single event.
3. **Fail loudly:** If an API key is missing or an endpoint is down, throw an error and crash the specific script. Do not guess.
4. **Same input, same output:** Prompts are deterministic.
5. **Secrets stay outside:** No API keys are hardcoded. They live in `.env`.
