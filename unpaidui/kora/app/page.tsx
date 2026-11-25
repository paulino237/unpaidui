import { HeaderNav } from "@/components/header-nav";
import { HeroSection } from "@/components/hero-section";
import { ComparisonSection } from "@/components/comparison-section";
import { ServicesSection } from "@/components/services-section";
import { HowWeWorkSection } from "@/components/how-we-work-section";
import { TeamSection } from "@/components/team-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CaseStudySection } from "@/components/case-study-section";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { InsightsSection } from "@/components/insights-section";
import { PreFooterCta } from "@/components/pre-footer-cta";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5e9] text-[#242424] selection:bg-[#5dc39b] selection:text-white">
      <HeaderNav />
      <HeroSection />
      <ComparisonSection />
      <ServicesSection />
      <HowWeWorkSection />
      <TeamSection />
      <TestimonialsSection />
      <CaseStudySection />
      <PricingSection />
      <FAQSection />
      <InsightsSection />
      <PreFooterCta />
      <FooterSection />
    </main>
  );
}
