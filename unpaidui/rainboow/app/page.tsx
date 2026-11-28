import { SiteHeader } from "@/components/site-header";
import { HeroStage } from "@/components/hero-stage";
import { ManifestoSection } from "@/components/manifesto-section";
import { RealisationsSection } from "@/components/realisations-section";
import { ServicesSection } from "@/components/services-section";
import { OffersSection } from "@/components/offers-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-[#ff007f] selection:text-white">
      <SiteHeader />
      <HeroStage />
      <ManifestoSection />
      <RealisationsSection />
      <ServicesSection />
      <OffersSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <SiteFooter />
      <div className="frame pointer-events-none fixed inset-2.5 z-50 rounded-[22px] border border-[#0b0710]/10 shadow-[0_0_0_30px_#000] hidden md:block" aria-hidden="true" />
    </main>
  );
}
