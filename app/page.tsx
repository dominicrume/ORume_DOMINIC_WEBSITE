import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CredibilityBar } from '@/components/CredibilityBar';
import { FreeAccess } from '@/components/FreeAccess';
import { Services } from '@/components/Services';
import { RumeMethod } from '@/components/RumeMethod';
import { Portfolio } from '@/components/Portfolio';
import { Books } from '@/components/Books';
import { Offer } from '@/components/Offer';
import { Proof } from '@/components/Proof';
import { Media } from '@/components/Media';
import { Insights } from '@/components/Insights';
import { Substack } from '@/components/Substack';
import { About } from '@/components/About';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { StickyCTA } from '@/components/StickyCTA';
import { Reveal } from '@/components/Reveal';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <Reveal>
          <FreeAccess />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <RumeMethod />
        </Reveal>
        <Reveal>
          <Portfolio />
        </Reveal>
        <Reveal>
          <Books />
        </Reveal>
        <Reveal>
          <Proof />
        </Reveal>
        <Reveal>
          <Offer />
        </Reveal>
        <Reveal>
          <Media />
        </Reveal>
        {/* Server component (async) - fetches Medium RSS at build/ISR. */}
        <Insights />
        {/* Renders only when NEXT_PUBLIC_SUBSTACK_URL is set. */}
        <Substack />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
