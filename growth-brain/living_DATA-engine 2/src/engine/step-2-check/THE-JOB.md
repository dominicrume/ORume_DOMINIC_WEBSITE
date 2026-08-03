# JOB CARD: Check

## What Comes In
Raw analytics data and historical social post records from the local SQLite database.

## What You Do With It
Pass the data into the AI models (GrowthAdvisor and X-Poster) to generate new recommendations or social copy. Ensure the AI rigorously follows the "Methodical Titan Builder" persona rules and formatting restrictions (The NOT list).

## What Goes Out
Drafted social posts and actionable growth insights.

## How You Know You Are Done
The drafted AI outputs are successfully queued into the `hitl_queue` (Control Room) table in SQLite, flagged as `PENDING_REVIEW`.
