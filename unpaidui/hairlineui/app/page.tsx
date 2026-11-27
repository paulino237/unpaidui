import { TopNav } from "@/components/top-nav";
import { HeroSection } from "@/components/hero-section";
import { ComponentsSection } from "@/components/components-section";
import { CatalogSection } from "@/components/catalog-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { ClosingSection } from "@/components/closing-section";
import { Footer } from "@/components/footer";
import { ScrollRevealInit } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-surface">
      <ScrollRevealInit />
      <TopNav />
      <main className="flex flex-col gap-28 pb-12 sm:gap-40 sm:pb-20">
        <HeroSection />
        <ComponentsSection />
        <CatalogSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
