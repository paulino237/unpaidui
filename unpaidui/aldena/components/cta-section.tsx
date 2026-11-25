"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

export function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Framer parallax convergence:
  // - Video scrolls down by +150px (target: { y: 150 })
  // - "Great Work" flies in from x: -500px -> 0px
  // - "Starts Here" flies in from x: 500px -> 0px
  const videoY = useTransform(scrollYProgress, [0.1, 0.7], [0, 150]);
  const leftTextX = useTransform(scrollYProgress, [0.05, 0.55], [-500, 0]);
  const rightTextX = useTransform(scrollYProgress, [0.05, 0.55], [500, 0]);

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative z-[3] flex h-[100vh] min-h-[720px] w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative flex h-full w-full max-w-[1600px] flex-col items-center justify-center px-6 md:px-10">
        {/* 4 Corner Meta Labels */}
        <div className="pointer-events-none absolute top-10 left-10 z-20 select-none">
          <p className="font-sans text-[14px] font-medium tracking-[-0.03em] text-white/60">
            Since 2016
          </p>
        </div>

        <div className="pointer-events-none absolute top-10 right-10 z-20 select-none">
          <p className="font-sans text-[14px] font-medium tracking-[-0.03em] text-white/60">
            branding & content
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-10 left-10 z-20 select-none">
          <p className="font-sans text-[14px] font-medium tracking-[-0.03em] text-white/60">
            50+ brands shaped
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-10 z-20 select-none">
          <p className="font-sans text-[14px] font-medium tracking-[-0.03em] text-white/60">
            based in new york
          </p>
        </div>

        {/* Central Wrap */}
        <div className="relative flex w-full flex-col items-center justify-center">
          {/* Central 400x400 Video Frame */}
          <motion.div
            style={{ y: videoY }}
            className="relative aspect-square w-[280px] overflow-hidden bg-neutral-950 sm:w-[340px] md:w-[400px]"
          >
            <video
              src="https://assets.mixkit.co/videos/44061/44061-720.mp4"
              poster="https://framerusercontent.com/images/yQdsDc12WdOZw3397ovfStNhCeo.png?width=1280&height=720"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Noise Texture Layer */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-15"
              style={{
                backgroundImage:
                  "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
                backgroundRepeat: "repeat",
                backgroundSize: "128px auto",
              }}
            />
          </motion.div>

          {/* Big Type: Left wing "Great Work" & Right wing "Starts Here" */}
          <div className="pointer-events-none absolute top-1/2 left-0 right-0 z-20 flex -translate-y-1/2 flex-row items-center justify-center gap-10">
            <motion.div
              style={{ x: leftTextX }}
              className="flex flex-1 items-center justify-end overflow-visible"
            >
              <h2 className="font-serif text-[clamp(2.5rem,7.5vw,7rem)] font-semibold leading-none tracking-[-0.03em] whitespace-nowrap text-white text-right">
                Great Work
              </h2>
            </motion.div>

            <motion.div
              style={{ x: rightTextX }}
              className="flex flex-1 items-center justify-start overflow-visible"
            >
              <h2 className="font-serif text-[clamp(2.5rem,7.5vw,7rem)] font-semibold leading-none tracking-[-0.03em] whitespace-nowrap text-white text-left">
                Starts Here
              </h2>
            </motion.div>
          </div>

          {/* Start a project Button positioned directly below video */}
          <div className="absolute -bottom-16 left-1/2 z-20 -translate-x-1/2 sm:-bottom-20">
            <Link
              href="#contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white px-7 py-3 font-sans text-[14px] font-medium tracking-[-0.02em] text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px]">
                Start a project
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
