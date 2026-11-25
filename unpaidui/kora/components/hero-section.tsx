"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const AVATAR_URLS = [
  "https://framerusercontent.com/images/CLNNeZ7sGt3ywvDzR7D6Mi3TE.jpg?width=60&height=60",
  "https://framerusercontent.com/images/aqkakFzIkX11TpipSH4MurMn1c.jpg?width=60&height=60",
  "https://framerusercontent.com/images/Y0PKmJR8OR83TST953hq4wrsmtI.jpg?width=60&height=60",
  "https://framerusercontent.com/images/dYAD6XIGC1k0IidBb9wX6b7srM.jpg?width=60&height=60",
  "https://framerusercontent.com/images/ZCltSDBMvX6dGq8gfKZbNA61y0.jpg?width=60&height=60",
];

const HEADLINE_WORDS = [
  "Your",
  "growth",
  "partner",
  "for",
  "companies",
  "ready",
  "to",
  "scale.",
];

const PROBLEM_WORDS = [
  "The",
  "strategies",
  "that",
  "built",
  "your",
  "company",
  "won't",
  "scale",
  "it.",
];

function ScrubWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Scrub window between progress 0.28 and 0.72
  const start = 0.28 + (index / total) * 0.44;
  const end = start + (1 / total) * 0.44 * 0.85;

  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const blur = useTransform(progress, [start, end], ["blur(3px)", "blur(0px)"]);

  return (
    <motion.span
      style={{
        opacity,
        filter: blur,
      }}
      className="inline-block mr-[0.26em] last:mr-0 transition-colors"
    >
      {word}
    </motion.span>
  );
}

export function HeroSection() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progression through this unified Hero + Problem sticky section
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  // Hero Content Exit Transforms (scroll 0.0 -> 0.28)
  const heroContentOpacity = useTransform(scrollYProgress, [0.0, 0.22], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0.0, 0.25], [0, -120]);
  const heroPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.2 ? "none" : "auto"
  );

  // Floral Backdrop Overlay Transforms (Dark & Blur layers fade in)
  const blurOverlayOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);
  const darkOverlayOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 0.48]);

  // Problem Intro Statement (Appears at 0.22, stays pinned through 0.88, exits at 0.96)
  const problemOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.28, 0.86, 0.98],
    [0, 1, 1, 0]
  );
  const problemScale = useTransform(
    scrollYProgress,
    [0.18, 0.28, 0.86, 0.98],
    [0.96, 1, 1, 1.04]
  );

  return (
    <div ref={scrollTrackRef} className="relative h-[280vh] bg-[#f5f5e9]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-3 sm:top-5 h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2.5rem)] max-w-[1560px] mx-auto px-3 sm:px-5">
        {/* Rounded Hero Frame */}
        <div className="relative w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-sm flex flex-col justify-between">
          {/* Base Flower Photographic Backdrop */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://framerusercontent.com/images/IaiFRY4S4OYymE10NQ9ipQb5dwc.jpg?width=2400&height=1350"
              alt="Kora ethereal translucent apricot flower"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center select-none"
            />
          </div>

          {/* Dark Overlay (Activates as user scrolls into Problem Intro) */}
          <motion.div
            style={{ opacity: darkOverlayOpacity }}
            className="absolute inset-0 z-1 bg-[#242424] pointer-events-none"
          />

          {/* Blur Overlay (Backdrop Blur activates over the flower) */}
          <motion.div
            style={{ opacity: blurOverlayOpacity }}
            className="absolute inset-0 z-2 backdrop-blur-md bg-black/25 pointer-events-none"
          />

          {/* ========================================================
              PHASE 1: Hero Foreground Content
             ======================================================== */}
          <motion.div
            style={{
              opacity: heroContentOpacity,
              y: heroContentY,
              pointerEvents: heroPointerEvents,
            }}
            className="relative z-10 px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 flex-1 flex flex-col justify-between"
          >
            {/* Top/Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Headline, Subtext, CTAs */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  {/* H1 Headline with Staggered Word Reveal */}
                  <h1 className="text-[clamp(2.5rem,4.8vw,5.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#fffffa] text-balance max-w-[680px]">
                    {HEADLINE_WORDS.map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, filter: "blur(5px)", y: 6 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.15 + index * 0.06,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        className="inline-block mr-[0.24em] last:mr-0"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="mt-6 text-base sm:text-lg text-white/90 max-w-[480px] font-normal leading-relaxed"
                  >
                    Kora helps leadership teams gain clarity and build systems that scale.
                  </motion.p>

                  {/* Action CTA Group */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8 flex items-center gap-6"
                  >
                    {/* Primary Capsule Button */}
                    <Link
                      href="#services"
                      className="group inline-flex items-center gap-2.5 h-[48px] px-6 rounded-full bg-[#5dc39b] hover:bg-[#52b38c] text-[#fffffa] text-[15px] font-medium shadow-md transition-all duration-200 active:scale-95"
                    >
                      <span>Our Services</span>
                      <span className="size-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
                    </Link>

                    {/* Secondary Inline Link */}
                    <Link
                      href="#pricing"
                      className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#fffffa] hover:text-[#5dc39b] transition-colors group"
                    >
                      <span>Pricing</span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Area: Social Proof Stack & Right Case Study Card */}
            <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row items-end justify-between gap-8">
              {/* Bottom-Left: Social Proof & Client Logos */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex flex-col gap-4 sm:gap-6"
              >
                {/* Stacked Avatars & Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {AVATAR_URLS.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Kora client avatar ${i + 1}`}
                        className="size-8 rounded-full border-2 border-white/80 object-cover shadow-xs"
                        width={32}
                        height={32}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="size-1.5 rounded-full bg-[#5dc39b]"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-white/90 font-medium tracking-tight">
                      Trusted by 50+ companies
                    </p>
                  </div>
                </div>

                {/* Client Logos Row */}
                <div className="flex items-center gap-8 text-white/80">
                  <span className="text-xs uppercase font-bold tracking-[0.2em] font-sans">
                    MILANO
                  </span>
                  <span className="text-sm font-semibold tracking-tight lowercase font-sans">
                    oslo.
                  </span>
                  <span className="text-xs uppercase font-extrabold tracking-[0.18em] font-sans">
                    SAVANNAH
                  </span>
                </div>
              </motion.div>

              {/* Bottom-Right: Floating Sitemark Case Study Card */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="w-full lg:w-auto"
              >
                <Link
                  href="#cases"
                  className="group block bg-[#fffffa] rounded-[24px] p-3 sm:p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-[420px] ml-auto border border-white/40"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Thumbnail Image */}
                    <div className="relative size-20 sm:size-24 rounded-[18px] overflow-hidden shrink-0 bg-neutral-900">
                      <Image
                        src="https://framerusercontent.com/images/qWS4BiNWHU6BsV03nquz3LOXcM.jpeg?width=2400&height=1800"
                        alt="Sitemark case study thumbnail"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-semibold text-white">
                        <span className="text-[#5dc39b] font-bold text-xs">*</span>
                        <span>Sitemark</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#242424] text-[11px] font-medium text-white mb-1.5">
                        New Case Study
                      </span>
                      <p className="text-[13px] font-medium text-[#242424] leading-snug line-clamp-2">
                        How Sitemark broke through an $18M plateau and grew 47% in six months.
                      </p>
                      <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#242424]">
                          47%
                        </span>
                        <span className="text-xs text-neutral-500 font-normal">
                          Revenue growth in 6 months
                        </span>
                        <div className="size-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-[#5dc39b] group-hover:text-white transition-colors">
                          <ArrowRight className="size-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================
              PHASE 2: Problem Statement with Word-by-Word Scroll Scrub
             ======================================================== */}
          <motion.div
            style={{
              opacity: problemOpacity,
              scale: problemScale,
            }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none"
          >
            <div className="max-w-[960px] text-center">
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-[#fffffa] text-balance">
                {PROBLEM_WORDS.map((word, index) => (
                  <ScrubWord
                    key={index}
                    word={word}
                    index={index}
                    total={PROBLEM_WORDS.length}
                    progress={scrollYProgress}
                  />
                ))}
              </h2>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
