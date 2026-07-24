import type { Metadata } from 'next';
import { VaidaHeader } from '@/components/vaida/VaidaHeader';
import { VaidaAura } from '@/components/vaida/VaidaAura';
import { VaidaHero } from '@/components/vaida/VaidaHero';
import { VaidaMethod } from '@/components/vaida/VaidaMethod';
import { VaidaCaptureForm } from '@/components/vaida/VaidaCaptureForm';
import { VaidaFooter } from '@/components/vaida/VaidaFooter';

export const metadata: Metadata = {
  title: 'Vaida V. Stone | Always ENOUGH™',
  description: 'Rebuild confidence. Reclaim identity. Create financial courage — in the AI era and beyond.',
};

export default function VaidaHomePage() {
  return (
    <div className="text-[#4A3B41] font-sans antialiased bg-transparent min-h-screen relative overflow-hidden">
      <VaidaAura />
      <VaidaHeader variant="home" />
      <VaidaHero />
      <VaidaMethod />
      <VaidaCaptureForm />
      <VaidaFooter />
    </div>
  );
}
