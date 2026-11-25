import { NavHeader } from "@/components/nav-header";
import { HeroSection } from "@/components/hero-section";
import { TextRevealSection } from "@/components/text-reveal-section";
import { BentoFeatures } from "@/components/bento-features";
import { TestimonialsSection } from "@/components/testimonials-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-black">
      <NavHeader />
      <main id="main-content" className="w-full">
        <HeroSection />
        <TextRevealSection />
        <BentoFeatures />
        <TestimonialsSection />
        <HowItWorks />
        <PricingSection />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
  );
}
