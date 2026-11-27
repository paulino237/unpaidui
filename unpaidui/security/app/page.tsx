import { NavHeader } from "@/components/nav-header";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import { OverviewSection } from "@/components/overview-section";
import { PillarsSection } from "@/components/pillars-section";
import { ComparisonSection } from "@/components/comparison-section";
import { OutcomesSection } from "@/components/outcomes-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground antialiased">
      <NavHeader />
      <main id="main-content">
        <HeroSection />
        <LogoTicker />
        <OverviewSection />
        <PillarsSection />
        <ComparisonSection />
        <OutcomesSection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <FooterSection />
    </div>
  );
}
