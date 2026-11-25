"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "How does Kraft generate designs so quickly?",
    answer:
      "Kraft uses a custom-trained multimodal design engine that understands layout hierarchy, typography, and color theory—producing multiple production-ready options in seconds.",
  },
  {
    question: "How does Kraft ensure brand consistency?",
    answer:
      "Kraft learns your brand guidelines—colors, fonts, tone, and style—and applies them automatically to every design. Upload your brand kit once, and Kraft maintains consistency across all outputs.",
  },
  {
    question: "Can I edit or refine designs after generation?",
    answer:
      "Absolutely. You can tweak colors, adjust layouts, change fonts, or request specific modifications using natural language. Kraft understands conversational edits like 'make it more minimal' or 'use a warmer palette.'",
  },
  {
    question: "What export formats does Kraft support?",
    answer:
      "Kraft exports to all major formats including PNG, SVG, PDF, and Figma. You can also push designs directly to your codebase with production-ready React or HTML/CSS components.",
  },
  {
    question: "Is my data and designs secure?",
    answer:
      "Yes. All designs and data are encrypted end-to-end. We never train our models on your proprietary work, and you retain full ownership of everything you create with Kraft.",
  },
];

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="rounded-2xl bg-muted/50"
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-foreground">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0"
        >
          <PlusIcon className="h-5 w-5 text-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-muted-foreground">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="resources"
      className="border-t border-foreground/10 px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-4xl font-medium tracking-tight text-foreground">
              Answers to your questions
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-3">
              {faqs.map((item, i) => (
                <FaqRow
                  key={item.question}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
