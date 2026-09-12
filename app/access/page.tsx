import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { AccessGate } from '@/components/AccessGate';

export const metadata: Metadata = {
  title: 'Your instant access',
  description: 'Your free AI course and book from Rume Dominic.',
  robots: { index: false, follow: false },
};

type Props = {
  // Next 15+ resolves request data asynchronously.
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AccessPage({ searchParams }: Props) {
  const source = (await searchParams)?.source;

  let backLink = '/';
  let backText = '← Back to rumedominic.com';

  if (source === 'vaida') {
    backLink = 'https://rumedominic.com/vaida';
    backText = '← Back to Vaida Stone';
  } else if (source === 'iconic') {
    backLink = 'https://www.iconictimesnewspaper.com/';
    backText = '← Back to Iconic Times';
  }

  return (
    <main className="min-h-screen py-20 sm:py-28">
      <Container className="max-w-3xl">
        <AccessGate />

        <p className="mt-10 text-center text-sm">
          <Link href={backLink} className="focus-ring text-blue-glow hover:underline">
            {backText}
          </Link>
        </p>
      </Container>
    </main>
  );
}
