import type { Metadata } from 'next';
import { VaidaHeader } from '@/components/vaida/VaidaHeader';
import { VaidaAura } from '@/components/vaida/VaidaAura';
import { VaidaAIHero } from '@/components/vaida/VaidaAIHero';
import { VaidaAIDemo } from '@/components/vaida/VaidaAIDemo';
import { VaidaCurriculum } from '@/components/vaida/VaidaCurriculum';
import { VaidaFAQ } from '@/components/vaida/VaidaFAQ';
import { VaidaCaptureForm } from '@/components/vaida/VaidaCaptureForm';
import { VaidaFooter } from '@/components/vaida/VaidaFooter';

export const metadata: Metadata = {
  title: 'Always ENOUGH™ × RUME DOMINIC | AI Course',
  description: 'Master AI in 9 days. Exclusively for the Always ENOUGH community.',
};

export default function VaidaAIPage() {
  return (
    <div className="text-[#4A3B41] font-sans antialiased bg-transparent min-h-screen relative overflow-hidden">
      <VaidaAura />
      <VaidaHeader variant="ai" />
      <VaidaAIHero />
      <VaidaAIDemo />
      <VaidaCurriculum />
      <VaidaFAQ />
      <VaidaCaptureForm />
      <VaidaFooter />
    </div>
  );
}
