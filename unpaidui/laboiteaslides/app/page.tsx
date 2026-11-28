import React from "react";
import { TopNav } from "@/components/top-nav";
import { HeroSection } from "@/components/hero-section";
import { SynthraCanvas } from "@/components/synthra-canvas";
import { MarqueeTicker } from "@/components/marquee-ticker";
import { TaglineSection } from "@/components/tagline-section";
import { WorksPanoramic } from "@/components/works-panoramic";
import { MetricsSection } from "@/components/metrics-section";
import { ExpertisesSection } from "@/components/expertises-section";
import { LimitsBanner } from "@/components/limits-banner";
import { QualityCertifications } from "@/components/quality-certifications";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { ResourcesSection } from "@/components/resources-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#120042] text-white selection:bg-[#6630ff] selection:text-white">
      {/* 0. Authentic WebGL Reactive Background (#SYNTHRA) */}
      <SynthraCanvas />

      {/* 1. Header & Navigation */}
      <TopNav />

      {/* 2. Hero Section with monumental headings & ambient canvas */}
      <HeroSection />

      {/* 3. Infinite Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Tagline & Client Proof Points */}
      <TaglineSection />

      {/* 5. Panoramic Works Showcase (Safran, Adidas, Marriott, Lipton, etc.) */}
      <WorksPanoramic />

      {/* 6. Core Performance Metrics (0 retard, 96% budget, 85% reachat) */}
      <MetricsSection />

      {/* 7. Interactive Expertises with live hover visual reveal */}
      <ExpertisesSection />

      {/* 8. Callout Banner: Dépassez toutes les limites de PowerPoint */}
      <LimitsBanner />

      {/* 9. Quality & Certifications: ISO 9001, Google Avis 5/5, MOS */}
      <QualityCertifications />

      {/* 10. Customer Testimonials */}
      <TestimonialsSection />

      {/* 11. FAQ Accordion */}
      <FAQAccordion />

      {/* 12. Latest Insights & Resources */}
      <ResourcesSection />

      {/* 13. Monumental Footer & Contact */}
      <Footer />
    </main>
  );
}
