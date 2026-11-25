"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "1",
    question: "What services do you actually offer?",
    answer:
      "We focus on brand identity, visual and web design, and content and voice. Whether you need a full rebrand or help refining one part of your presence, we shape a scope that fits where your business is right now.",
  },
  {
    id: "2",
    question: "How long does a typical project take?",
    answer:
      "Most brand and website projects run between four and eight weeks, depending on scope. After our first call we share a clear timeline with milestones so you always know what is happening and what comes next.",
  },
  {
    id: "3",
    question: "What do you need from me to get started?",
    answer:
      "Just an initial brief and a short kickoff call. From there we handle the heavy lifting, checking in at key milestones and only asking for your input where your feedback genuinely moves the work forward.",
  },
  {
    id: "4",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer flexible retainers for continued design, iteration, and support once your project is live, so your brand and website keep evolving alongside your business rather than standing still.",
  },
  {
    id: "5",
    question: "How does pricing and payment work?",
    answer:
      "We quote a fixed price per project based on scope, so there are no surprises. Payment is typically split into an upfront deposit and a final balance on delivery, with retainers billed monthly.",
  },
  {
    id: "6",
    question: "Do you work with clients outside New York?",
    answer:
      "Absolutely. We are based in New York but work with clients around the world, running projects remotely with regular check-ins. Different time zones have never gotten in the way of great work.",
  },
];

const HEADER_WORDS = ["Your", "questions,", "answered."];

export function FaqSection() {
  // Question 1 is open by default as on the original Framer site
  const [openId, setOpenId] = useState<string | null>("1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-[3] flex w-full flex-col items-center justify-center overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 sm:gap-20 lg:px-10">
        {/* Section Header */}
        <div className="flex w-full flex-col gap-4">
          <h2 className="flex flex-wrap gap-x-[0.3em] font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-black">
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 40,
              mass: 1,
              delay: 0.25,
            }}
            className="font-sans text-[15px] font-medium leading-[1.4] tracking-[-0.02em] text-[#605f5f]"
          >
            A quick rundown of how we work and what to expect.
          </motion.p>
        </div>

        {/* 2-Column Row: Left Accordion List, Right Sidebar Card */}
        <div className="flex w-full flex-col items-start justify-between gap-12 lg:flex-row lg:gap-16">
          {/* Left Column: FAQ Accordion List (66% width) */}
          <div className="flex w-full flex-1 flex-col lg:max-w-[66%]">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="flex flex-col border-t border-black/10"
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors md:py-7"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-[18px] font-semibold tracking-[-0.03em] text-black transition-colors group-hover:text-black/70 md:text-[22px]">
                      {faq.question}
                    </span>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-black/60 transition-transform duration-300">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
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
                        <p className="max-w-[620px] pb-6 font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.02em] text-[#605f5f] md:pb-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            {/* Bottom Border */}
            <div className="w-full border-t border-black/10" />
          </div>

          {/* Right Column: FAQ Sidebar Card (approx 24-28% width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 35,
              mass: 1,
            }}
            className="flex w-full flex-col gap-5 lg:w-[28%] lg:max-w-[360px]"
          >
            {/* Studio Image with Noise Layer */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 shadow-sm">
              <Image
                src="https://framerusercontent.com/images/bg90xKt959PXOTphpNCl0tuSDJo.png?width=2400&height=1600"
                alt="Aldena studio work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
              {/* Noise Texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "128px auto",
                }}
              />
            </div>

            {/* Prompt Text */}
            <p className="font-sans text-[15px] font-medium leading-[1.4] tracking-[-0.02em] text-[#605f5f]">
              Still looking for answers or need a good chat?
            </p>

            {/* Contact Button */}
            <div>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 font-sans text-[14px] font-semibold tracking-[-0.02em] text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
