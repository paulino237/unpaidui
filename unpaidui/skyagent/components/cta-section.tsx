"use client";

import Image from "next/image";

export function CTASection() {
  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full p-6"
    >
      <div className="w-full">
        <div className="h-[400px] overflow-hidden shadow-xl w-full border border-border rounded-xl bg-secondary relative z-20">
          <Image
            src="/agent-cta-background.png"
            alt="Agent CTA Background"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-right md:object-center"
          />

          <div className="absolute inset-0 -top-28 md:-top-36 flex flex-col items-center justify-center px-6">
            <h2 className="text-white text-4xl md:text-7xl font-medium tracking-tighter max-w-xs md:max-w-xl text-center">
              Automate. Simplify. Thrive
            </h2>

            <div className="absolute bottom-10 flex flex-col items-center justify-center gap-2.5">
              <a
                href="#pricing"
                className="bg-white text-black font-semibold text-sm h-10 w-fit px-5 rounded-full flex items-center justify-center shadow-md hover:bg-white/90 transition-all active:scale-95"
              >
                Start Your 30-Day Free Trial Today
              </a>
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                Cancel anytime, no questions asked
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
