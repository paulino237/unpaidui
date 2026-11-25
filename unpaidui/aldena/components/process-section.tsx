"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface StepItem {
  number: string;
  title: string;
  duration: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "001",
    title: "Discovery",
    duration: "1–2 weeks",
    description:
      "We start by getting under the skin of your business — interviewing stakeholders, auditing your current brand, and mapping the competitive landscape. The goal is a clear, shared understanding of where you are and where you want to go.",
  },
  {
    number: "002",
    title: "Strategy",
    duration: "1 week",
    description:
      "With the research in hand, we define the strategic foundation — your positioning, messaging, and the core idea that will guide every decision going forward. No fluff, just clear direction.",
  },
  {
    number: "003",
    title: "Design",
    duration: "2–3 weeks",
    description:
      "This is where the vision takes shape. We explore directions, refine the details, and craft a distinctive visual system that sets you apart. We share work in progress and iterate closely with your team.",
  },
  {
    number: "004",
    title: "Development",
    duration: "2–4 weeks",
    description:
      "We bring the designs to life with clean, performant build work. Every interaction is considered and tested across devices to ensure a seamless experience for your audience.",
  },
  {
    number: "005",
    title: "Launch",
    duration: "1 week",
    description:
      "With everything polished and approved, we prepare for a smooth launch. We handle the final checks, hand over all assets with clear documentation, and ensure you're confident moving forward.",
  },
];

const HEADER_WORDS = ["A", "refined", "process", "built", "on", "clarity."];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative z-[3] flex w-full flex-col items-center justify-center overflow-hidden bg-black py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16 px-6 sm:gap-20 lg:px-10">
        {/* Section Header with Word-by-Word Reveal */}
        <div className="w-full max-w-[1120px]">
          <h2 className="flex flex-wrap gap-x-[0.3em] font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
            {HEADER_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.001, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                  mass: 1,
                  delay: 0.1 + i * 0.05,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Process Steps List */}
        <div className="flex w-full max-w-[1120px] flex-col">
          {STEPS.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={step.number}
                className="flex flex-col border-t border-white/15"
              >
                <div
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`group relative flex w-full cursor-pointer flex-col py-6 transition-opacity duration-300 md:py-8 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* Step Header Row */}
                  <div className="flex w-full items-center justify-between gap-4">
                    {/* Number Column */}
                    <div className="w-[20%] min-w-[50px] md:w-[15%]">
                      <span className="font-sans text-[13px] font-semibold tracking-[-0.02em] uppercase text-white/80 md:text-[14px]">
                        {step.number}
                      </span>
                    </div>

                    {/* Title Column */}
                    <div className="flex-1 md:w-[58%] md:flex-none">
                      <h4 className="font-sans text-[20px] font-semibold tracking-[-0.04em] text-white md:text-[24px]">
                        {step.title}
                      </h4>
                    </div>

                    {/* Duration Column (Right-aligned) */}
                    <div className="flex flex-1 justify-end">
                      <span className="font-sans text-[13px] font-semibold tracking-[-0.02em] text-white/80 md:text-[14px]">
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Body */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 250,
                          damping: 30,
                          mass: 1,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 flex w-full items-start gap-4">
                          {/* Left Spacer to align under Title */}
                          <div className="hidden w-[15%] flex-shrink-0 md:block" />

                          {/* Description Text */}
                          <p className="max-w-[620px] font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.02em] text-white/75">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
          {/* Bottom Border */}
          <div className="w-full border-t border-white/15" />
        </div>
      </div>
    </section>
  );
}
