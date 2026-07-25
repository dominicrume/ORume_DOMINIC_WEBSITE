import type { Metadata } from 'next';
import { VaidaHeader } from '@/components/vaida/VaidaHeader';
import { VaidaAura } from '@/components/vaida/VaidaAura';
import { VaidaHero } from '@/components/vaida/VaidaHero';
import { VaidaProgram } from '@/components/vaida/VaidaProgram';
import { VaidaSpeaker } from '@/components/vaida/VaidaSpeaker';
import { VaidaMethod } from '@/components/vaida/VaidaMethod';
import { VaidaCaptureForm } from '@/components/vaida/VaidaCaptureForm';
import { VaidaFooter } from '@/components/vaida/VaidaFooter';

export const metadata: Metadata = {
  title: 'Vaida V. Stone | Always ENOUGH™ · 6-Week Financial Reset',
  description: 'Stop avoiding your bank account. Start owning your money with calm, clarity, and a personal system for women 40+.',
};

export default function VaidaHomePage() {
  return (
    <div className="text-[#4A3B41] font-sans antialiased bg-transparent min-h-screen relative overflow-hidden">
      <VaidaAura />
      <VaidaHeader variant="home" />
      <VaidaHero />
      <VaidaProgram />
      <VaidaSpeaker />
      <VaidaMethod />
      <VaidaCaptureForm variant="home" />
      <VaidaFooter />
    </div>
  );
}
