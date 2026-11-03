'use client';

import { useState } from 'react';
import type { Dashboard, RecRow, MoneyDoor } from '@/lib/control-types';

const INK = '#091A2B';
const PANEL = '#0E2A47';
const CARD = '#0c2238';
const RUME = '#3DA9FC';
const WHITE = '#F4F9FF';
const MUTED = '#93A7BD';
const GOOD = '#34D399';
const WARN = '#FBBF24';
const BAD = '#F87171';
const RULE = 'rgba(255,255,255,0.10)';

function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        color,
        border: `1px solid ${color}55`,
        background: `${color}1f`,
        borderRadius: 999,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      {children}
    </span>
  );
}

function statusColor(status: string): string {
  if (status === 'approved' || status === 'done') return GOOD;
  if (status === 'proposed') return WARN;
  if (status === 'running') return RUME;
  return MUTED; // rejected / unknown
}

function Tile({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 16 }}>
      <div style={{ color: MUTED, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>{value}</div>
      {sub ? <div style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{sub}</div> : null}
    </div>
  );
}

function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 34 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: `1px solid ${RULE}`, paddingBottom: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0 }}>{title}</h2>
        <div style={{ marginLeft: 'auto' }}>{right}</div>
      </div>
      {children}
    </section>
  );
}

const btn = (primary = false): React.CSSProperties => ({
  border: primary ? 'none' : `1px solid ${RULE}`,
  background: primary ? RUME : 'transparent',
  color: primary ? '#04121f' : WHITE,
  fontWeight: 700,
  fontSize: 13,
  borderRadius: 10,
  padding: '8px 14px',
  cursor: 'pointer',
});

export function ControlDashboard({ initial, unprotected }: { initial: Dashboard; unprotected: boolean }) {
  const [data, setData] = useState<Dashboard>(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [runOut, setRunOut] = useState<string | null>(null);

  async function refresh() {
    setBusy('refresh');
    try {
      const r = await fetch('/api/control/data', { cache: 'no-store' });
      if (r.ok) setData((await r.json()) as Dashboard);
    } finally {
      setBusy(null);
    }
  }

  async function setStatus(id: string, status: string) {
    setBusy(id);
    try {
      await fetch('/api/control/recommendations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      await refresh();
    } finally {
      setBusy(null);
    }
  }

  async function runNow() {
    setBusy('run');
    setRunOut(null);
    try {
      const r = await fetch('/api/control/run', { method: 'POST' });
      const j = (await r.json()) as { ok?: boolean; brief?: string; reason?: string };
      setRunOut(j.ok ? j.brief ?? 'Run complete.' : `Run did not complete: ${j.reason ?? 'unknown'}`);
      await refresh();
    } catch {
      setRunOut('Run failed to start.');
    } finally {
      setBusy(null);
    }
  }

  const k = data.kpis;
  const missing = data.config.filter((c) => !c.present);
  const doors = data.moneyDoors ?? [];
  const brokenDoors = doors.filter((d) => !d.live);

  return (
    <main style={{ minHeight: '100dvh', background: INK, color: WHITE, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 16px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ width: 30, height: 30, transform: 'rotate(45deg)', border: `2px solid ${RUME}`, borderRadius: 7, background: 'rgba(61,169,252,0.12)' }} />
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Control Center</h1>
            <div style={{ color: MUTED, fontSize: 12 }}>Last refreshed {new Date(data.generatedAt).toLocaleString('en-GB')}</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <button style={btn(false)} onClick={refresh} disabled={busy !== null}>
              {busy === 'refresh' ? 'Refreshing…' : 'Refresh'}
            </button>
            <button style={btn(true)} onClick={runNow} disabled={busy !== null}>
              {busy === 'run' ? 'Running the brain…' : 'Run the brain now'}
            </button>
          </div>
        </div>

        {unprotected ? (
          <div style={{ marginTop: 18, border: `1px solid ${BAD}66`, background: `${BAD}14`, color: '#ffd9d9', borderRadius: 12, padding: '12px 16px', fontSize: 13 }}>
            <b style={{ color: BAD }}>Unprotected.</b> No CONTROL_SECRET is set, so anyone with this link can open the page. Set CONTROL_SECRET in your environment to lock it.
          </div>
        ) : null}

        {/* Money doors: can a visitor actually pay or book? Shown first on purpose. */}
        <Section
          title="Money doors"
          right={
            <Pill color={brokenDoors.length ? BAD : GOOD}>
              {brokenDoors.length ? `${brokenDoors.length} broken` : 'all live'}
            </Pill>
          }
        >
          {brokenDoors.length ? (
            <div style={{ marginBottom: 14, border: `1px solid ${BAD}66`, background: `${BAD}14`, color: '#ffd9d9', borderRadius: 12, padding: '12px 16px', fontSize: 13 }}>
              <b style={{ color: BAD }}>Traffic is arriving at a door that does not open.</b> Until these are live, visitors cannot pay or book no matter how many arrive. Each one tells you exactly what to fix.
            </div>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {doors.map((d: MoneyDoor) => (
              <div
                key={d.id}
                style={{
                  background: CARD,
                  border: `1px solid ${d.live ? RULE : `${BAD}55`}`,
                  borderRadius: 12,
                  padding: '12px 14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <Pill color={d.live ? GOOD : BAD}>{d.live ? 'live' : 'broken'}</Pill>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{d.label}</span>
                  <span style={{ color: MUTED, fontSize: 12, marginLeft: 'auto' }}>{d.target}</span>
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 13, color: d.live ? MUTED : '#ffd9d9' }}>{d.reason}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* System health */}
        <Section title="System health">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            <Tile label="Site" value="Live" sub="rumedominic.com" />
            <Tile label="Auditor (PyPI)" value={data.health.auditorVersion ? `v${data.health.auditorVersion}` : 'n/a'} sub="ai-code-quality-auditor" />
            <Tile label="Open PRs" value={data.health.openPRs ?? 'n/a'} sub="website repo" />
            <Tile
              label="Last commit"
              value={data.health.lastCommit ? data.health.lastCommit.sha : 'n/a'}
              sub={data.health.lastCommit ? data.health.lastCommit.message : undefined}
            />
          </div>
        </Section>

        {/* Switch-on checklist */}
        <Section title="Growth brain, switch-on checklist">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
            {data.config.map((c) => (
              <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 10, background: CARD, border: `1px solid ${RULE}`, borderRadius: 10, padding: '10px 12px' }}>
                <Pill color={c.present ? GOOD : MUTED}>{c.present ? 'on' : 'off'}</Pill>
                <span style={{ fontSize: 13 }}>{c.label}</span>
              </div>
            ))}
          </div>
          {missing.length ? (
            <p style={{ color: MUTED, fontSize: 13, marginTop: 14 }}>
              {missing.length} item{missing.length > 1 ? 's' : ''} left. Set these in your environment, run the schema in Supabase, and add a weekly Vercel Cron on
              <code style={{ color: RUME }}> /api/brain/weekly</code>. Then the loop collects data and briefs you on its own.
            </p>
          ) : (
            <p style={{ color: GOOD, fontSize: 13, marginTop: 14 }}>All set. The brain can run end to end.</p>
          )}
        </Section>

        {/* Growth */}
        <Section title="Growth, last 7 days" right={data.periodLabel ? <span style={{ color: MUTED, fontSize: 12 }}>{data.periodLabel}</span> : null}>
          {data.dataConfigured && k ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                <Tile label="Visitors" value={k.funnel.visitors} />
                <Tile label="Leads" value={k.funnel.leads} sub={`${k.leadConversionPct}% of visitors`} />
                <Tile label="Framework downloads" value={k.funnel.frameworkDownloads} sub={`${k.magnetConversionPct}% of views`} />
                <Tile label="CTA clicks" value={k.funnel.ctaClicks} sub={`${k.ctaClickThroughPct}% click-through`} />
                <Tile label="Calls booked" value={k.funnel.callsBooked} />
                <Tile label="Events recorded" value={k.eventCount} />
              </div>
              {k.eventCount === 0 ? (
                <p style={{ color: MUTED, fontSize: 13, marginTop: 14 }}>Connected, but no events in the window yet. As traffic flows, these fill in.</p>
              ) : null}
            </>
          ) : (
            <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 18, color: MUTED, fontSize: 14 }}>
              The data plane is not connected yet, so there is nothing to measure. Finish the switch-on checklist above and this fills with your real funnel.
            </div>
          )}
        </Section>

        {/* Recommendations */}
        <Section title="Recommendations, awaiting your call">
          {data.recommendations.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.recommendations.map((r: RecRow) => (
                <div key={r.id} style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{r.title}</span>
                    <Pill color={statusColor(r.status)}>{r.status}</Pill>
                    {typeof r.confidence === 'number' ? <span style={{ color: MUTED, fontSize: 12 }}>{Math.round(r.confidence * 100)}% confidence</span> : null}
                    {r.owner ? <span style={{ color: MUTED, fontSize: 12 }}>· owner: {r.owner}</span> : null}
                  </div>
                  {r.hypothesis ? <p style={{ margin: '8px 0 0', fontSize: 13, color: MUTED }}><b style={{ color: WHITE }}>Why:</b> {r.hypothesis}</p> : null}
                  {r.action ? <p style={{ margin: '4px 0 0', fontSize: 13 }}><b>Do this:</b> {r.action}</p> : null}
                  {r.expected_impact ? <p style={{ margin: '4px 0 0', fontSize: 13, color: MUTED }}><b style={{ color: WHITE }}>Expected:</b> {r.expected_impact}</p> : null}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button style={btn(r.status !== 'approved')} onClick={() => setStatus(r.id, 'approved')} disabled={busy !== null}>
                      {busy === r.id ? '…' : 'Approve'}
                    </button>
                    <button style={btn(false)} onClick={() => setStatus(r.id, 'rejected')} disabled={busy !== null}>
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 18, color: MUTED, fontSize: 14 }}>
              No recommendations yet. Press <b style={{ color: WHITE }}>Run the brain now</b> once the data plane is connected, and the ranked moves appear here for you to approve.
            </div>
          )}
        </Section>

        {/* Brief / run output */}
        <Section title="Latest Director's Brief">
          {runOut || data.latestBrief ? (
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                background: PANEL,
                border: `1px solid ${RULE}`,
                borderRadius: 12,
                padding: 18,
                fontSize: 12.5,
                lineHeight: 1.5,
                color: '#DCEAF7',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                overflowX: 'auto',
              }}
            >
              {runOut ?? data.latestBrief}
            </pre>
          ) : (
            <div style={{ background: CARD, border: `1px solid ${RULE}`, borderRadius: 12, padding: 18, color: MUTED, fontSize: 14 }}>
              No brief yet. It is generated when the brain runs.
            </div>
          )}
        </Section>

        <p style={{ color: MUTED, fontSize: 11, marginTop: 40, borderTop: `1px solid ${RULE}`, paddingTop: 16 }}>
          The brain proposes; you dispose. Nothing here is sent, spent, or published without your approval.
        </p>
      </div>
    </main>
  );
}
