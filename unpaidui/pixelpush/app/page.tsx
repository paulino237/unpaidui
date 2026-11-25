import { HeaderNav } from "@/components/header-nav";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { CreatorsSection } from "@/components/creators-section";
import { FeaturesSection } from "@/components/features-section";
import { BenefitsSection } from "@/components/benefits-section";
import { BenchmarkSection } from "@/components/benchmark-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { UseCasesSection } from "@/components/use-cases-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { FooterSection } from "@/components/footer-section";

function PixelDivider() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8" aria-hidden="true">
      <div className="border-border h-16 border-x pixel-pattern" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <HeaderNav />
      <main id="main-content">
        <HeroSection />
        <PixelDivider />
        <StatsSection />
        <CreatorsSection />
        <PixelDivider />
        <FeaturesSection />
        <BenefitsSection />
        <PixelDivider />
        <BenchmarkSection />
        <PixelDivider />
        <TestimonialsSection />
        <UseCasesSection />
        <PixelDivider />
        <PricingSection />
        <FaqSection />
        <PixelDivider />
        <FinalCtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
