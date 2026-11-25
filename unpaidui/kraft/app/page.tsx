import { HeaderNav } from "@/components/header-nav";
import { HeroSection } from "@/components/hero-section";
import { TextRevealSection } from "@/components/text-reveal-section";
import { ImageRevealSection } from "@/components/image-reveal-section";
import { TrustedBySection } from "@/components/trusted-by-section";
import { ToolsCarouselSection } from "@/components/tools-carousel-section";
import { ShowcaseCardsSection } from "@/components/showcase-cards-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { BottomCtaSection } from "@/components/bottom-cta-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <>
      <HeaderNav />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <TextRevealSection />
        <ImageRevealSection />
        <TrustedBySection />
        <ToolsCarouselSection />
        <ShowcaseCardsSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <BottomCtaSection />
      </main>
      <FooterSection />
    </>
  );
}
