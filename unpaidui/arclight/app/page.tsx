import { NavHeader } from "@/components/nav-header";
import { HeroSection } from "@/components/hero-section";
import { LogosMarquee } from "@/components/logos-marquee";
import { FeaturesSection } from "@/components/features-section";
import { WorkflowSection } from "@/components/workflow-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { MetricsSection } from "@/components/metrics-section";
import { CustomersSection } from "@/components/customers-section";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground" id="top">
      <NavHeader />
      <main>
        <HeroSection />
        <LogosMarquee />
        <FeaturesSection />
        <WorkflowSection />
        <IntegrationsSection />
        <MetricsSection />
        <CustomersSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
      <ThemeSwitcher />
    </div>
  );
}
