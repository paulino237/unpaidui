"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Start using our platform immediately with full access to all features. No credit card required. At the end of your trial, choose a plan that fits your needs or continue with our free tier.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at your next billing cycle.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with all major platforms including Slack, Zendesk, Salesforce, HubSpot, Intercom, and 50+ other tools. Our API also allows custom integrations for enterprise customers.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Security is our top priority. We use bank-level encryption (AES-256), are SOC 2 Type II certified, and GDPR compliant. All data is stored in secure, redundant data centers with 99.99% uptime.",
  },
  {
    question: "Do you offer dedicated support?",
    answer:
      "All plans include email support with 24-hour response times. Premium plans get priority support with 4-hour response times. Enterprise customers receive a dedicated success manager and phone support.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Everything you need to know
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Can&apos;t find the answer you&apos;re looking for? Reach out!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 cursor-pointer"
            >
              Get Started
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-xl border border-border bg-frame px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-frame/80 cursor-pointer"
            >
              Contact Support
            </motion.a>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3" role="list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : index);
                  }
                }}
                className="cursor-pointer rounded-2xl bg-frame p-5 shadow-sm sm:p-6 border border-border/40 select-none transition-colors hover:border-border"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
              >
                <div className="flex w-full items-center justify-between gap-4 text-left">
                  <span className="text-base font-medium text-foreground sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-muted-foreground"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {faq.answer}
                      </p>
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
