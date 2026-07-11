# Stage 01-07 ICM L2 Contracts — Living Engine

## 01-DISCOVER
Input: active_niches from Memory.getState()
Source: SerpAPI Google Search + Keepa bestsellers
Output: rows in domains table (status=pending)
Rules: H4 8 req/min SerpAPI, H6 error wrap

## 02-MX-INTEL
Input: domains WHERE mx_checked=0
Source: Node.js dns.promises.resolveMx() — FREE
Output: domains.mx_provider + mx_tier set
Filter: only 'target' tier proceeds to harvest
Rules: H4 60 lookups/min safe, H6 error wrap

## 03-HARVEST
Input: domains WHERE status=pending AND mx_tier=target
Source: Playwright headless + /contact /about /team pages
Output: leads table with email_source=website
Rules: H4 3.5s delay, H5 robots.txt first, H6 error wrap

## 04-ENRICH
Input: leads WHERE enriched_at IS NULL
Source: Hunter.io verify → Apollo.io person match → DNS MX of email domain
Output: email_verified, first_name, last_name, job_title, email_provider updated
Rules: H4 per-service rate limits, H6 each step isolated

## 05-SCORE
Input: leads WHERE scored_at IS NULL AND email IS NOT NULL
Source: Claude claude-sonnet-4-6 with provider-specific hooks
Output: score 0-100, pain_point, buy_signal, email_hook
Rules: H4 45 req/min Claude, H6 JSON parse error handled

## 06-OUTREACH
Input: leads WHERE status=new AND score >= min_score_threshold (from Memory)
Source: Claude (3-touch sequence) + Instantly.ai (send)
Output: outreach table x3 rows, leads.status=sent
Rules: H4 2s delay, H7 full audit, H8 unsubscribe in every email

## 07-LEARN (THE BRAIN)
Input: Full cycle metrics + Memory snapshot + DB performance data
Source: Claude claude-sonnet-4-6 with Senior Director persona
Output: Directives written to Memory, decisions logged to DB, learning appended to log
Rules: This stage runs EVERY cycle, even learn-only cycles (nightly)
Impact: Next cycle runs with updated config. System improves permanently.
