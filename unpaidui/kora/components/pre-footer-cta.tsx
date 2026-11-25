"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function PreFooterCta() {
  return (
    <section className="relative bg-[#f5f5e9] py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[36px] sm:rounded-[48px] overflow-hidden min-h-[520px] sm:min-h-[600px] p-8 sm:p-14 lg:p-18 flex flex-col justify-between shadow-2xl border border-white/40"
        >
          {/* Authentic Floral Backdrop (Translucent Apricot Flower on Soft Cyan Blue) */}
          <Image
            src="https://framerusercontent.com/images/IaiFRY4S4OYymE10NQ9ipQb5dwc.jpg?width=2400&height=1350"
            alt="Kora creative floral growth visual"
            fill
            sizes="100vw"
            className="object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Row: Pill Tag */}
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white text-xs font-medium tracking-wide">
              Actionable growth roadmap
            </span>
          </div>

          {/* Main Statement & Floating Testimonial Row */}
          <div className="relative z-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end justify-between">
            {/* Left Headline (7 cols) */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-semibold text-white tracking-[-0.04em] leading-[1.08] text-balance">
                Let&apos;s find your next growth lever.
              </h2>

              <div className="mt-8 sm:mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#242424] hover:bg-[#5dc39b] hover:text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
                >
                  <span>Book a call</span>
                  <ArrowUpRight className="size-4 stroke-[2.2]" />
                </a>
              </div>
            </div>

            {/* Right: Floating Frosted Card with Jennifer Holland Quote (5 cols) */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="backdrop-blur-xl bg-black/45 border border-white/25 rounded-[30px] p-6 sm:p-8 text-white shadow-2xl max-w-[420px]">
                <p className="text-sm text-white/90 leading-relaxed font-normal italic">
                  &ldquo;What sets Kora apart is their commitment to building
                  our capabilities, not creating dependency.&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/20">
                  <div className="relative size-10 rounded-full overflow-hidden border-2 border-white/50 shrink-0">
                    <Image
                      src="https://framerusercontent.com/images/4WbRXwPAFJbnEFjFuWDs7LLC4ds.jpg?width=1800&height=2400"
                      alt="Jennifer Holland"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-white">
                      Jennifer Holland
                    </p>
                    <p className="text-[11px] text-white/70">CFO, Elevance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
