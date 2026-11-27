import { MotionProvider } from "@/components/motion-provider";
import { TopNav } from "@/components/top-nav";
import { HeroSection } from "@/components/hero-section";
import { PaySection } from "@/components/pay-section";
import { StorySection } from "@/components/story-section";
import { ExtrasSection } from "@/components/extras-section";
import { EarlySection } from "@/components/early-section";
import { SellSection } from "@/components/sell-section";
import { ConnectSection } from "@/components/connect-section";
import { BuildSection } from "@/components/build-section";
import { ShowcaseSection } from "@/components/showcase-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <MotionProvider>
      <div className="min-h-screen">
        <TopNav />
        <main id="main">
          <HeroSection />
          <PaySection />
          <StorySection />
          <ExtrasSection />
          <EarlySection />
          <SellSection />
          <ConnectSection />
          <BuildSection />
          <ShowcaseSection />
          <PricingSection />
          <FaqSection />
        </main>
        <FooterSection />
      </div>
    </MotionProvider>
  );
}
