# JOB CARD: Collect

## What Comes In
External traffic metrics and growth platform webhooks (Substack data, Website analytics, Make.com triggers).

## What You Do With It
Parse the metrics. Insert them safely into the local SQLite database (`living-engine.db`).

## What Goes Out
Clean, localized database rows representing the state of the growth systems.

## How You Know You Are Done
The SQLite database contains the updated metrics and the specific step exits with a successful return status.
