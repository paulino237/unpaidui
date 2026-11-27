import { MotionProvider } from "@/components/motion-provider";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProofSection } from "@/components/proof-section";
import { TomorrowSection } from "@/components/tomorrow-section";
import { DevicesSection } from "@/components/devices-section";
import { StormSection } from "@/components/storm-section";
import { StreetSection } from "@/components/street-section";
import { HowSection } from "@/components/how-section";
import { HouseholdsSection } from "@/components/households-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { ClosingSection } from "@/components/closing-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <MotionProvider>
      <div className="min-h-screen">
        <Header />
        <main id="main">
          <HeroSection />
          <ProofSection />
          <TomorrowSection />
          <DevicesSection />
          <StormSection />
          <StreetSection />
          <HowSection />
          <HouseholdsSection />
          <PricingSection />
          <FaqSection />
          <ClosingSection />
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
