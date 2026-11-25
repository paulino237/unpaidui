"use client";

import { motion, useReducedMotion } from "motion/react";
import { Clapperboard, Megaphone, Users } from "lucide-react";
import { PixelatedIcon } from "@/components/pixelated-icon";
import { PixelButton } from "@/components/pixel-button";

const EASE = [0.4, 0, 0.2, 1] as const;

const USE_CASES = [
  {
    label: "For solo creators",
    statement: "Turn raw footage into finished videos in minutes.",
    icon: Clapperboard,
  },
  {
    label: "For marketing teams",
    statement: "Produce on-brand video at scale without an editor.",
    icon: Megaphone,
  },
  {
    label: "For agencies",
    statement: "Deliver more client work without growing the team.",
    icon: Users,
  },
];

export function UseCasesSection() {
  const reduced = useReducedMotion();

  const containerVariant = {
    hidden: {},
    visible: { transition: reduced ? {} : { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border border-x px-6 py-12 sm:px-10 lg:py-16">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={itemVariant}
            className="text-accent flex items-center gap-2 font-mono text-xs tracking-tight"
          >
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Use cases
          </motion.p>
          <motion.h2
            variants={itemVariant}
            className="text-foreground mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            How modern teams make video faster
          </motion.h2>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="border-border grid gap-4 border border-t-0 p-4 sm:gap-5 sm:p-5 md:grid-cols-3 lg:gap-6 lg:p-6"
      >
        {USE_CASES.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariant}
            className="border-border bg-background group flex flex-col border"
          >
            <p className="text-muted-foreground px-6 pt-6 font-mono text-xs tracking-tight">
              {item.label}
            </p>
            <div className="relative my-2 flex aspect-[16/10] items-center justify-center overflow-hidden">
              <PixelatedIcon
                icon={item.icon}
                className="h-36 w-36 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-auto flex flex-col px-6 pt-4 pb-6">
              <h3 className="text-foreground text-xl font-semibold tracking-tight text-balance">
                {item.statement}
              </h3>
              <div className="mt-6">
                <PixelButton href="#demo" variant="solid">
                  Book a demo
                </PixelButton>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
