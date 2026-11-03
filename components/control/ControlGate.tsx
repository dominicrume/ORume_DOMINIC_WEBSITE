'use client';

import { useState } from 'react';

const INK = '#091A2B';
const PANEL = '#0E2A47';
const RUME = '#3DA9FC';
const MUTED = '#93A7BD';

export function ControlGate() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/control/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const j = (await res.json().catch(() => ({}))) as { reason?: string };
      setError(j.reason === 'no_secret_set' ? 'No CONTROL_SECRET is set on the server.' : 'Wrong password.');
    } catch {
      setError('Could not reach the server.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: INK,
        color: '#F4F9FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        padding: 16,
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: '100%',
          maxWidth: 360,
          background: PANEL,
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 28,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            transform: 'rotate(45deg)',
            border: `2px solid ${RUME}`,
            borderRadius: 8,
            background: 'rgba(61,169,252,0.12)',
            marginBottom: 18,
          }}
        />
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Control Center</h1>
        <p style={{ color: MUTED, fontSize: 13, marginTop: 6 }}>Enter the control password to continue.</p>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            marginTop: 18,
            padding: '11px 13px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            background: '#071423',
            color: '#F4F9FF',
            fontSize: 15,
          }}
        />
        {error ? <p style={{ color: '#F87171', fontSize: 13, marginTop: 10 }}>{error}</p> : null}
        <button
          type="submit"
          disabled={busy || !secret}
          style={{
            width: '100%',
            marginTop: 16,
            padding: '11px 13px',
            borderRadius: 10,
            border: 'none',
            background: RUME,
            color: '#04121f',
            fontWeight: 700,
            fontSize: 15,
            cursor: busy ? 'default' : 'pointer',
            opacity: busy || !secret ? 0.6 : 1,
          }}
        >
          {busy ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </main>
  );
}
