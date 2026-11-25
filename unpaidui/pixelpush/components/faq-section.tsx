"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { PixelButton } from "@/components/pixel-button";

const EASE = [0.4, 0, 0.2, 1] as const;

const FAQS = [
  {
    question: "How does the free trial work?",
    answer:
      "Start on the Pro plan free for 14 days, no credit card required. Cancel anytime and you'll drop to the free Starter plan with all your projects intact.",
  },
  {
    question: "Do I need any editing experience?",
    answer:
      "Not at all. Describe the cut you want in plain language and Pixelpush builds the timeline for you. You can fine-tune anything by hand whenever you like.",
  },
  {
    question: "What export quality and formats are supported?",
    answer:
      "Export up to 4K on Pro in MP4, MOV, and WebM, with presets sized for every social platform so your video is ready to publish.",
  },
  {
    question: "How accurate are the auto-captions?",
    answer:
      "Captions are frame-accurate across 50+ languages and fully editable, so you can restyle them or fix a word in seconds.",
  },
  {
    question: "Where is my footage stored, and is it secure?",
    answer:
      "Your media is encrypted in transit and at rest on SOC 2-compliant infrastructure. Enterprise plans add SSO, SAML, and custom data retention.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes. Share projects, brand kits, and styles across your team, with roles and permissions available on the Pro and Enterprise plans.",
  },
  {
    question: "Do you offer discounts for students or nonprofits?",
    answer:
      "We do. Reach out to our team with proof of status and we'll set you up with a discounted plan.",
  },
  {
    question: "Still have a question?",
    answer:
      "Reach out to our team anytime and a real human will get back to you within one business day.",
  },
];

export function FaqSection() {
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariant = {
    hidden: {},
    visible: { transition: reduced ? {} : { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border grid border border-t-0 lg:grid-cols-[1fr_1.3fr]">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="border-border flex flex-col border-b p-8 sm:p-12 lg:border-r lg:border-b-0"
        >
          <motion.p
            variants={itemVariant}
            className="text-accent flex items-center gap-2 font-mono text-xs tracking-tight"
          >
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            FAQ
          </motion.p>
          <motion.h2
            variants={itemVariant}
            className="text-foreground mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Your questions, answered
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="text-muted-foreground mt-5 max-w-xs text-base leading-relaxed text-pretty"
          >
            For anything else, our team is one message away.
          </motion.p>
          <motion.div variants={itemVariant} className="mt-8">
            <PixelButton href="#start" variant="solid">
              Start for free
            </PixelButton>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col py-6 sm:py-8"
        >
          {FAQS.map((item, idx) => {
            const isOpen = idx === openIndex;
            return (
              <motion.div
                key={item.question}
                variants={itemVariant}
                className="border-border border-t border-dotted first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="focus-ring group flex w-full items-center justify-between gap-6 px-8 py-5 text-left sm:px-12"
                >
                  <span
                    className={`text-base font-medium transition-colors sm:text-lg ${
                      isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE }}
                    className={`shrink-0 transition-colors ${
                      isOpen ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reduced ? { duration: 0 } : { duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground px-8 pb-5 text-sm leading-relaxed text-pretty sm:px-12 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
