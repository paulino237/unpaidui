"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Copy, Check } from "lucide-react";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: "General",
    question: "What exactly does Kora do?",
    answer:
      "We help B2B companies between $2M and $50M in revenue grow faster and more predictably. That means diagnosing what is stalling your growth, building the strategy to fix it, and working alongside your team to execute. We are not an agency that runs campaigns. We are a growth partner that works on the systems, processes, and positioning that drive sustainable revenue.",
  },
  {
    category: "General",
    question: "What industries do you work with?",
    answer:
      "We work across B2B industries including SaaS, professional services, fintech, and healthtech. The common thread is companies with a strong product that need help building a repeatable growth engine. Our frameworks are industry-agnostic but we tailor every engagement to your specific market dynamics, competitive landscape, and buyer behavior.",
  },
  {
    category: "Process",
    question: "How is Kora different from a marketing agency?",
    answer:
      "Agencies typically execute specific tactics like paid ads, SEO, or content production. We work upstream of that. We figure out why your growth has stalled, what the highest-leverage opportunities are, and build the strategy and systems to capture them. If you need an agency for execution after that, we can help you find the right one. But most of the time, the problem is not a lack of tactics. It is a lack of clarity on what to prioritize.",
  },
  {
    category: "Process",
    question: "Who on our team would work with Kora?",
    answer:
      "Typically the founder or CEO, plus whoever owns revenue — whether that is a VP of Sales, Head of Marketing, or Chief Revenue Officer. We integrate directly into your existing meetings and workflows rather than creating a separate workstream that drains your team's bandwidth.",
  },
  {
    category: "Results",
    question: "How long before we see results?",
    answer:
      "Most clients see quick wins within the first 30 days — typically from fixing pricing leaks, restructuring outreach sequences, or reprioritizing pipeline. Sustainable compound revenue growth takes 3 to 6 months as systemic improvements take hold.",
  },
  {
    category: "Pricing",
    question: "What happens after the engagement ends?",
    answer:
      "Our entire model is built around capability transfer, not dependency. We document all playbooks, train your leadership and reps, and ensure your internal team fully owns every system we've built together.",
  },
];

const CATEGORIES = ["General", "Pricing", "Process", "Results"];

export function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const filteredItems = FAQ_ITEMS.filter(
    (item) => item.category === selectedCategory
  );

  const handleCopySupport = () => {
    navigator.clipboard.writeText("support@kora.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="faq" className="relative bg-[#f5f5e9] py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Giant Centered Title: FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-semibold text-[#242424] tracking-[-0.04em]">
            FAQ
          </h2>
        </motion.div>

        {/* Centered Accordion Outer Container */}
        <div className="max-w-[780px] mx-auto bg-[#f7f7ed] rounded-[36px] sm:rounded-[44px] p-4 sm:p-6 lg:p-8 border border-[#242424]/[0.05] shadow-lg">
          {/* Centered Category Pills */}
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setOpenIdx(0);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#5dc39b] text-white shadow-sm"
                      : "text-[#616161] hover:text-[#242424] hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={item.question}
                  className="rounded-[24px] bg-white border border-[#242424]/[0.05] overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-base sm:text-[17px] text-[#242424] tracking-tight">
                      {item.question}
                    </span>
                    <div className="size-7 rounded-full bg-[#f5f5e9] flex items-center justify-center shrink-0 text-[#242424]">
                      {isOpen ? (
                        <Minus className="size-3.5 stroke-[2.2]" />
                      ) : (
                        <Plus className="size-3.5 stroke-[2.2]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-[#616161] leading-relaxed font-normal pt-1">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Support Callout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-6 max-w-[780px] mx-auto rounded-[32px] bg-[#f7f7ed] p-6 border border-[#242424]/[0.05] flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          {/* 3 Circular Avatars */}
          <div className="flex -space-x-2 overflow-hidden">
            {[
              "ptzdfa8kamllLFJeEJ6fpHyKaQ.jpg",
              "gU8yKC3ZiCyONDaKr0hgrinSY5U.jpg",
              "akJQe3BhYVaYiW8D7XTtFNAS2A.jpg",
            ].map((img, i) => (
              <div
                key={i}
                className="relative size-10 rounded-full overflow-hidden border-2 border-white shadow-xs"
              >
                <Image
                  src={`https://framerusercontent.com/images/${img}?width=1024&height=1024`}
                  alt="Team support"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center sm:text-left">
            <span className="text-xs text-[#616161] block">
              More questions? Reach out anytime.
            </span>
          </div>

          <button
            onClick={handleCopySupport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#f5f5e9] border border-[#242424]/[0.08] text-xs font-semibold text-[#242424] transition-all shadow-xs cursor-pointer"
          >
            <div className="size-5 rounded-full bg-[#5dc39b]/20 flex items-center justify-center text-[#5dc39b]">
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            </div>
            <span>{copied ? "Copied!" : "support@kora.com"}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
