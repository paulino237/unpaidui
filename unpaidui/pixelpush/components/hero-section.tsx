"use client";

import { motion, useReducedMotion } from "motion/react";
import { PixelButton } from "./pixel-button";
import { PixelField } from "./pixel-field";

const EASE = [0.4, 0, 0.2, 1] as const;
const MASK_RIGHT = "radial-gradient(125% 105% at 100% 0%, #000 22%, transparent 72%)";

export function HeroSection() {
  const reduced = useReducedMotion();

  const containerAnim = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      };

  const wordAnim = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { y: "115%" }, visible: { y: "0%", transition: { duration: 0.65, ease: EASE } } };

  const words = "Make studio-grade video in minutes, not days.".split(" ");

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduced ? { duration: 0.3 } : { duration: 0.7, ease: EASE }}
          className="border-border bg-background relative overflow-hidden border"
        >
          {/* Pixel field background — top-right */}
          <motion.div
            aria-hidden="true"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduced ? { duration: 0.4 } : { duration: 1, ease: EASE, delay: 0.35 }}
            className="pointer-events-none absolute top-0 right-0 h-2/3 w-2/3 sm:inset-y-0 sm:h-auto sm:w-3/4 lg:w-1/2"
            style={{
              maskImage: MASK_RIGHT,
              WebkitMaskImage: MASK_RIGHT,
              transformOrigin: "top right",
            }}
          >
            <PixelField className="h-full w-full" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: reduced ? {} : { staggerChildren: 0.12, delayChildren: 0.35 } },
            }}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-3xl px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-20"
          >
            {/* Headline — word-by-word reveal */}
            <motion.h1
              variants={{
                hidden: {},
                visible: { transition: reduced ? {} : { staggerChildren: 0.045 } },
              }}
              className="text-foreground text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {words.map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                    <motion.span variants={wordAnim} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={containerAnim}
              className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty"
            >
              Pixelpush is the AI video editor that turns raw footage into finished cuts. Edit in
              plain language, auto-caption in 50+ languages, and generate B-roll on a single
              timeline.
            </motion.p>

            <motion.div
              variants={containerAnim}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <PixelButton href="#start" variant="solid" size="lg">
                Start for free
              </PixelButton>
              <PixelButton href="#demo" variant="outline" size="lg">
                Watch the demo
              </PixelButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
