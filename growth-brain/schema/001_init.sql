-- Growth Brain data plane. Run once in the Supabase SQL editor.
-- Design: the site (anon publishable key) may INSERT events only. The brain
-- (service-role key, server-side) reads everything. Nothing is publicly readable.

-- 1) EVENTS: every behavioural signal from the site and email.
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null,               -- e.g. page_view, cta_click, form_submit, lead_created, email_open
  source      text,                         -- page path or channel
  session_id  text,                         -- per-visit id
  anon_id     text,                         -- per-browser id (cookie)
  utm_source  text,
  utm_medium  text,
  utm_campaign text,
  value       numeric,                      -- optional monetary/weight value
  props       jsonb not null default '{}'::jsonb
);
create index if not exists events_created_at_idx on public.events (created_at);
create index if not exists events_type_idx on public.events (type);

alter table public.events enable row level security;

-- Allow anonymous INSERT (the site posts events with the publishable key), nothing else.
drop policy if exists events_insert_anon on public.events;
create policy events_insert_anon on public.events
  for insert to anon, authenticated
  with check (true);
-- No SELECT policy for anon => events are write-only from the client. The brain
-- reads with the service-role key, which bypasses RLS.

-- 2) METRICS SNAPSHOTS: the computed KPI picture for a period.
create table if not exists public.metrics_snapshots (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  period_start timestamptz not null,
  period_end   timestamptz not null,
  kpis        jsonb not null default '{}'::jsonb
);
alter table public.metrics_snapshots enable row level security;
-- service-role only (no policies => no anon access).

-- 3) RECOMMENDATIONS: the brain's ranked action list, each awaiting approval.
create table if not exists public.recommendations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  period_end    timestamptz,
  category      text,                       -- funnel, email, ads, offer, content
  title         text not null,
  hypothesis    text,
  action        text,                       -- the concrete change to make
  expected_impact text,
  confidence    numeric,                    -- 0..1
  evidence      jsonb not null default '{}'::jsonb,
  owner         text,                       -- named human who must approve
  status        text not null default 'proposed' -- proposed|approved|running|done|rejected
);
alter table public.recommendations enable row level security;

-- 4) EXPERIMENTS: A/B tests the loop runs and learns from.
create table if not exists public.experiments (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  hypothesis  text,
  metric      text,                         -- the KPI it moves
  variant_a   jsonb not null default '{}'::jsonb,
  variant_b   jsonb not null default '{}'::jsonb,
  status      text not null default 'draft',-- draft|running|complete
  winner      text,                         -- a|b|inconclusive
  result      jsonb not null default '{}'::jsonb,
  started_at  timestamptz,
  ended_at    timestamptz
);
alter table public.experiments enable row level security;

-- 5) BRIEFS: the generated weekly Director's Brief, archived.
create table if not exists public.briefs (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  period_end  timestamptz,
  markdown    text
);
alter table public.briefs enable row level security;
