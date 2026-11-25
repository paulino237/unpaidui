import { BottomFloatingMenu } from "@/components/top-nav";
import { HeroSection } from "@/components/hero-section";
import { IntroSection } from "@/components/intro-section";
import { WorksSection } from "@/components/works-section";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { TickerSection } from "@/components/ticker-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { BlogSection } from "@/components/blog-section";
import { CtaSection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <main>
        <HeroSection />
        <IntroSection />
        <WorksSection />
        <ServicesSection />
        <ProcessSection />
        <TickerSection />
        <TestimonialsSection />
        <FaqSection />
        <BlogSection />
        <CtaSection />
      </main>
      <FooterSection />
      <BottomFloatingMenu />
    </div>
  );
}
