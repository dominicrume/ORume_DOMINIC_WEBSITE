import type { Metadata } from 'next';
import { isControlAuthed, gatherDashboard } from '@/lib/control';
import { ControlGate } from '@/components/control/ControlGate';
import { ControlDashboard } from '@/components/control/ControlDashboard';

export const metadata: Metadata = {
  title: 'Control Center',
  robots: { index: false, follow: false },
};

// Always render fresh: this is a live operations view, never cached.
export const dynamic = 'force-dynamic';

export default async function ControlPage() {
  const { authed, isProtected } = await isControlAuthed();
  if (!authed) return <ControlGate />;
  const data = await gatherDashboard();
  return <ControlDashboard initial={data} unprotected={!isProtected} />;
}
