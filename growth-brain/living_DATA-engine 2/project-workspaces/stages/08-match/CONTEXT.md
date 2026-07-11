# Stage 08-09: SALES ENGINE — ICM L2 Contracts

## Stage 08: MATCH (data → product)
Input:  leads WHERE scored_at IS NOT NULL AND not yet matched
Source: Claude claude-sonnet-4-6 + src/products/catalogue.js
Process:
  1. Classify revenue band (micro/small/mid/large) from est_rev_month
  2. Submit lead signals + full product ladder to Claude
  3. Claude returns entry product + ascension path + LTV + hook + objection
Output: sales_matches table row
Logic:
  - micro/unknown revenue → BOOK (£10-40) entry
  - small revenue → COURSE (£97-497) entry
  - mid revenue → SERVICE (£1,500-2,300) entry
  - large revenue → CONSULTING/MASTERMIND entry
Rules: H4 45 req/min Claude, H6 JSON parse handled, H7 audit logged

## Stage 09: CONVERT (product → sales sequence)
Input:  sales_matches WHERE sequenced=0
Source: Claude claude-sonnet-4-6 + product type → sales frame
Process:
  1. Look up matched product + its sales psychology frame
  2. Generate 3-email sequence matched to product TYPE:
     - book → soft, curiosity-led
     - course → transformation-focused
     - service → ROI-focused
     - consulting → authority + scarcity
  3. Use the primary_hook + pre-empt the objection from Stage 08
Output: sales_sequences table (3 rows per match)
Rules: H4 rate limited, H7 audit, H8 unsubscribe in every email

## Revenue Ledger
When a lead converts (manual or webhook from Instantly/Stripe):
  POST /api/sales/record → revenue_ledger row
The £8M tracker sums this table.
MRR = sum of recurring='monthly' rows.
