"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, X } from "lucide-react";
import { KoraLogo } from "./kora-logo";

const BEFORE_ITEMS = [
  "Hiring more reps to fix a conversion problem.",
  "Pipeline that looks full but never closes.",
  "Pricing based on what competitors charge.",
  "Every quarter starts from zero.",
];

const AFTER_ITEMS = [
  "Every dollar of spend tied to revenue.",
  "Pipeline that converts predictably.",
  "Pricing built on what customers will pay.",
  "Compounding growth, quarter over quarter.",
];

export function ComparisonSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progression through the Comparison section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section Header enter/settle choreography
  const headerOpacity = useTransform(scrollYProgress, [0.0, 0.15], [0.4, 1]);
  const headerY = useTransform(scrollYProgress, [0.0, 0.15], [20, 0]);

  // Before Card subtle scale down as After card stacks over it
  const beforeScale = useTransform(scrollYProgress, [0.3, 0.75], [1, 0.96]);

  // After Card translation: enters from below (115%) to perfectly stacked (0%)
  const afterY = useTransform(scrollYProgress, [0.25, 0.75], ["115%", "0%"]);
  const afterShadow = useTransform(
    scrollYProgress,
    [0.25, 0.75],
    [
      "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
      "0 25px 60px -15px rgba(0, 0, 0, 0.22)",
    ]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f5f5e9] min-h-[240vh]"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden">
        {/* Section Heading */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-8 sm:mb-10 max-w-[640px]"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.035em] text-[#242424] leading-tight">
            What changes{" "}
            <span className="text-[#616161] font-normal">
              when you work with us.
            </span>
          </h2>
        </motion.div>

        {/* Interactive Cards Stacking Stage */}
        <div className="relative w-full max-w-[460px] sm:max-w-[490px] h-[480px] sm:h-[500px]">
          {/* ========================================================
              CARD 1: BEFORE (Base Layer)
             ======================================================== */}
          <motion.div
            style={{ scale: beforeScale }}
            className="absolute inset-0 rounded-[36px] sm:rounded-[40px] bg-[#f7f7ed] p-7 sm:p-9 border border-black/[0.06] shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Label & Logo */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#737373]">
                  BEFORE
                </span>
                <KoraLogo
                  className="h-3.5 w-auto opacity-50"
                  textColor="#616161"
                  iconBgColor="#616161"
                />
              </div>

              {/* Card Title */}
              <h3 className="mt-5 text-[22px] sm:text-2xl font-semibold text-[#242424] tracking-[-0.025em] leading-snug">
                Guessing what grows revenue.
              </h3>

              {/* Items List */}
              <div className="mt-6 flex flex-col divide-y divide-black/[0.06]">
                {BEFORE_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="size-5 sm:size-5.5 rounded-full bg-[#242424] text-white flex items-center justify-center shrink-0">
                      <X className="size-3 stroke-[2.5]" />
                    </div>
                    <span className="text-[14px] sm:text-[14.5px] text-[#404040] font-normal leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 2: AFTER (Sliding Overlayer)
             ======================================================== */}
          <motion.div
            style={{
              y: afterY,
              boxShadow: afterShadow,
            }}
            className="absolute inset-0 rounded-[36px] sm:rounded-[40px] bg-[#5dc39b] text-white p-7 sm:p-9 flex flex-col justify-between z-10"
          >
            <div>
              {/* Top Row: Label & Logo */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
                  AFTER
                </span>
                <KoraLogo
                  className="h-3.5 w-auto"
                  textColor="#fffffa"
                  iconBgColor="#ffffff"
                />
              </div>

              {/* Card Title */}
              <h3 className="mt-5 text-[22px] sm:text-2xl font-semibold text-white tracking-[-0.025em] leading-snug">
                Knowing exactly what moves the number.
              </h3>

              {/* Items List */}
              <div className="mt-6 flex flex-col divide-y divide-white/20">
                {AFTER_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="size-5 sm:size-5.5 rounded-full bg-white text-[#5dc39b] flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                    <span className="text-[14px] sm:text-[14.5px] text-white/95 font-medium leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
