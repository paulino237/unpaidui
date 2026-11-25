"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LightField } from "@/components/light-field";

export function CTASection() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[32px]">
          {/* Interactive WebGL LightField */}
          <LightField className="[--field-ceiling:215px] sm:[--field-ceiling:250px] lg:[--field-ceiling:300px]" />

          {/* Grid line overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-size-[28px_28px] bg-top bg-[linear-gradient(to_right,var(--color-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-line)_1px,transparent_1px)] [mask-image:linear-gradient(to_top,black_18%,transparent_82%)]"
          />

          {/* Atmospheric warm radiant glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-20 -bottom-16 top-1/3 bg-[radial-gradient(ellipse_at_bottom,var(--accent)_0%,transparent_70%)] opacity-35 blur-3xl dark:opacity-45"
          />

          <div className="relative mx-auto flex max-w-[760px] flex-col items-center px-5 pt-20 pb-24 text-center sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-44">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="cta-title"
                className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] font-medium tracking-[-0.04em] text-balance text-foreground"
              >
                Give your team one place to talk
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-pretty text-foreground/70 sm:text-xl sm:leading-[1.5]">
                Create a workspace in two minutes. It is free for up to ten members and needs no card.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://app.arclight.example.com/sign-up"
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-black/[0.06] bg-white px-6 text-[15px] leading-none font-medium text-[#0c0c0d] whitespace-nowrap shadow-tile transition-[background-color,scale] duration-200 hover:bg-white/85 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:shadow-none"
                >
                  Start for free
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="mailto:hello@arclight.example.com"
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/50 bg-white/35 px-6 text-[15px] leading-none font-medium text-foreground whitespace-nowrap backdrop-blur-md transition-[background-color,scale] duration-200 hover:bg-white/55 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:bg-black/40 dark:hover:bg-black/55"
                >
                  Talk to sales
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
