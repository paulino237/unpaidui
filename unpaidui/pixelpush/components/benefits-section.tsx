"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Captions,
  Clapperboard,
  ShieldCheck,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import { PixelatedIcon } from "@/components/pixelated-icon";

const EASE = [0.4, 0, 0.2, 1] as const;

const BENEFITS = [
  {
    title: "Plain-language editing",
    description: "Describe the cut you want and Pixelpush builds the timeline in seconds.",
    icon: WandSparkles,
  },
  {
    title: "Captions in 50+ languages",
    description: "Frame-accurate subtitles generated automatically, ready to restyle.",
    icon: Captions,
  },
  {
    title: "AI B-roll on demand",
    description: "Generate broadcast-ready footage from a prompt, right on your timeline.",
    icon: Clapperboard,
  },
  {
    title: "Lightning-fast exports",
    description: "Render up to 4K with priority queues so you never miss a deadline.",
    icon: Zap,
  },
  {
    title: "Built for teams",
    description: "Share brand kits, styles, and projects with roles and permissions.",
    icon: Users,
  },
  {
    title: "Enterprise-grade security",
    description: "Media encrypted in transit and at rest on SOC 2-compliant infrastructure.",
    icon: ShieldCheck,
  },
];

export function BenefitsSection() {
  const reduced = useReducedMotion();

  const containerVariant = {
    hidden: {},
    visible: { transition: reduced ? {} : { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border border-x px-6 py-12 text-center sm:px-10 lg:py-16">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={itemVariant}
            className="text-accent flex items-center justify-center gap-2 font-mono text-xs tracking-tight"
          >
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Why Pixelpush
          </motion.p>
          <motion.h2
            variants={itemVariant}
            className="text-foreground mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Everything you need{" "}
            <span className="text-muted-foreground">to make great video</span>
          </motion.h2>
        </motion.div>
      </div>

      <div className="border-border overflow-hidden border">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="-m-px grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map((b) => (
            <motion.div
              key={b.title}
              variants={itemVariant}
              className="border-border flex items-start gap-4 border-t border-l border-dotted p-6 sm:p-8"
            >
              <PixelatedIcon icon={b.icon} pixels={18} className="h-12 w-12 shrink-0" />
              <div>
                <h3 className="text-foreground text-base font-semibold tracking-tight">
                  {b.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
