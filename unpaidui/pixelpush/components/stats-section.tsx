"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

const stats = [
  { value: "20M+", label: "Videos created" },
  { value: "10x", label: "Faster editing" },
  { value: "180k+", label: "Active creators" },
];

export function StatsSection() {
  const reduced = useReducedMotion();

  const item = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };

  const countAnim = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.7, ease: EASE } } };

  return (
    <motion.section
      aria-label="Pixelpush by the numbers"
      variants={{ hidden: {}, visible: { transition: reduced ? {} : { staggerChildren: 0.12, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8"
    >
      <div className="border-border grid grid-cols-1 border sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={item}
            className={`px-6 py-10 sm:px-8 lg:px-10 lg:py-14 ${i > 0 ? "border-border border-t sm:border-t-0 sm:border-l" : ""}`}
          >
            <span className="block w-fit overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <motion.span
                variants={countAnim}
                className="block w-fit bg-gradient-to-br from-[#ea580c] to-[#fb923c] bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl"
              >
                {stat.value}
              </motion.span>
            </span>
            <p className="mt-4 flex items-center gap-2">
              <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
              <span className="text-muted-foreground font-mono text-xs tracking-tight">{stat.label}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
