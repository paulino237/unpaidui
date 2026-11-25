"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQ_ITEMS = [
  {
    question: "What is an AI Agent?",
    answer:
      "An AI Agent is an intelligent software assistant that can understand natural language commands, reason through multi-step tasks, interact with your connected tools, and execute workflows autonomously.",
  },
  {
    question: "How does SkyAgent work?",
    answer:
      "SkyAgent connects to your existing workspace apps (calendar, email, CRM, project management), listens to your instructions in plain English, plans the required actions, and executes them in real time.",
  },
  {
    question: "How secure is my data?",
    answer:
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We adhere to SOC 2 Type II, GDPR, and HIPAA compliance standards, and your private workspace data is never used to train external models.",
  },
  {
    question: "Can I integrate my existing tools?",
    answer:
      "Yes! SkyAgent natively integrates with over 100+ popular tools including Slack, GitHub, Notion, Figma, Linear, Google Workspace, HubSpot, and Salesforce.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial that gives you full access to all features. No credit card is required to start your trial, and you can upgrade or cancel at any time.",
  },
  {
    question: "How does SkyAgent save me time?",
    answer:
      "SkyAgent automates repetitive tasks, streamlines workflows, and provides quick solutions to common challenges. This automation and efficiency can save hours of manual work, allowing you to focus on more strategic activities.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="flex flex-col items-center justify-center gap-10 pb-14 w-full relative"
    >
      {/* Header */}
      <div className="border-b border-border w-full p-10 md:p-14">
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium text-sm sm:text-base">
            Answers to common questions about SkyAgent and its features. If you
            have any other questions, please don&apos;t hesitate to contact us.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl w-full mx-auto px-6 sm:px-10">
        <div className="w-full grid gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="grid gap-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-center justify-between text-left border border-border rounded-lg px-4 py-3.5 cursor-pointer transition-all bg-accent/60 hover:bg-accent font-medium text-sm sm:text-base text-primary ${
                    isOpen ? "ring-2 ring-secondary/20 border-secondary/40" : ""
                  }`}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border border-border text-primary rounded-lg bg-accent/40">
                        <p className="text-primary/90 text-sm font-medium leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
