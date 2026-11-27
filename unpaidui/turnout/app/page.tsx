import { MotionProvider } from "@/components/motion-provider";
import { TopNav } from "@/components/top-nav";
import { HeroSection } from "@/components/hero-section";
import { LogosSection } from "@/components/logos-section";
import { WorkSection } from "@/components/work-section";
import { ProblemSection } from "@/components/problem-section";
import { SeasonSection } from "@/components/season-section";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { CompareSection } from "@/components/compare-section";
import { SpotlightSection } from "@/components/spotlight-section";
import { VoicesSection } from "@/components/voices-section";
import { TeamSection } from "@/components/team-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { JournalSection } from "@/components/journal-section";
import { ClosingSection } from "@/components/closing-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <MotionProvider>
      <TopNav />
      <div className="page">
        <main id="main">
          <HeroSection />
          <LogosSection />
          <WorkSection />
          <ProblemSection />
          <SeasonSection />
          <ServicesSection />
          <ProcessSection />
          <CompareSection />
          <SpotlightSection />
          <VoicesSection />
          <TeamSection />
          <PricingSection />
          <FaqSection />
          <JournalSection />
          <ClosingSection />
        </main>
      </div>
      <FooterSection />
    </MotionProvider>
  );
}
