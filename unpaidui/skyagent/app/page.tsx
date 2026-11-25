import { HeaderNav } from "@/components/header-nav";
import { HeroSection } from "@/components/hero-section";
import { CompanyShowcase } from "@/components/company-showcase";
import { BentoSection } from "@/components/bento-section";
import { QuoteSection } from "@/components/quote-section";
import { FeaturesSection } from "@/components/features-section";
import { GrowthSection } from "@/components/growth-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto border-x border-border relative min-h-screen bg-background text-foreground">
      {/* Signature Double Vertical Rails (24px inset from outer border-x) */}
      <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10 pointer-events-none" />
      <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10 pointer-events-none" />

      <HeaderNav />

      <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
        <HeroSection />
        <CompanyShowcase />
        <BentoSection />
        <QuoteSection />
        <FeaturesSection />
        <GrowthSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <FooterSection />
      </main>
    </div>
  );
}
