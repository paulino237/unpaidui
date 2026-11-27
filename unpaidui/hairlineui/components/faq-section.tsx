"use client";

import { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 0,
    question: "What does a template cost?",
    answer: "$39 for one template, or $159 for every template in the library, every Pro landing block, and each new one added later. Both are one-time payments: a full refund before you download or install a Pro block, and a fix or a refund if something doesn't work as described. All-Access rises $10 for every 10 templates we add, so today is its lowest price. Rough, Fold, Loupe, Relay, Tempo, Stillform, Fourteen and Index are free with an account."
  },
  {
    id: 1,
    question: "Can I use them for commercial and client projects?",
    answer: "Yes. Unlimited personal, commercial and client projects. The only restriction is you cannot redistribute the raw template files or re-sell them as templates."
  },
  {
    id: 2,
    question: "How does the live demo work?",
    answer: "Every single demo runs on its own isolated build. You can switch between desktop, tablet and phone views, click through interactive flows, and test responsiveness before buying."
  },
  {
    id: 3,
    question: "What stack do the templates use?",
    answer: "Next.js 15+ App Router, React 19, Tailwind CSS v4, Motion (motion/react), and TypeScript. No heavy runtime dependencies, no proprietary animation engines."
  },
  {
    id: 4,
    question: "How do I get the source code?",
    answer: "Instant download as a zip archive and GitHub access. Each template is a standalone Next.js project with its own README and dependencies ready to `pnpm dev`."
  },
  {
    id: 5,
    question: "Are the components really free?",
    answer: "Yes. All 263 standalone components in the component gallery are 100% free to copy into your project using the shadcn CLI or our free MCP server."
  },
  {
    id: 6,
    question: "Do the components work with my shadcn/ui setup?",
    answer: "Yes. They use standard Tailwind CSS classes and read your existing CSS variable theme tokens directly. No conflicts with existing components."
  },
  {
    id: 7,
    question: "Can my coding agent use them?",
    answer: "Yes. Connect Claude Code, Cursor, Codex, Windsurf, or Antigravity to our free MCP server. Your agent can search components and install them directly."
  },
  {
    id: 8,
    question: "How is this different from shadcn/ui blocks?",
    answer: "Hairline UI blocks are motion-first, kinetic, and designed around real interactive scenarios like stateful charts, streaks, and tactile physics."
  },
  {
    id: 9,
    question: "Will new templates and blocks be added?",
    answer: "Yes. New templates and landing blocks are added every two weeks. All-Access customers receive all future additions permanently for free."
  }
];

export function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggle = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="home-module__06co2W__fade text-balance text-[clamp(31px,4.3vw,46px)] font-medium leading-[1.08] tracking-[-0.035em] text-ink">
              Questions, <span className="text-ink-6">answered.</span>
            </h2>
            <p className="home-module__06co2W__fade mt-5 max-w-[30rem] text-pretty text-[17px] leading-[1.6] text-ink-5 sm:text-[18px]">
              Licensing, the stack and downloads, without the fine print. Anything else, ask the person who makes it.
            </p>
            <div className="home-module__06co2W__fade mt-10 plate-corners bg-surface-2 p-6 sm:p-7">
              <div>
                <div className="flex items-center gap-3.5">
                  <img
                    src="/maker.webp"
                    alt="Harvansh"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[15.5px] font-medium tracking-[-0.01em] text-ink">Harvansh</p>
                    <p className="text-[13.5px] text-ink-6">Designs and builds Hairline UI</p>
                  </div>
                </div>
                <div className="mt-4 text-pretty text-[15.5px] leading-[1.6] text-ink-4">
                  I design landing page templates that don&apos;t look like every other site, each built around one idea, plus the free components people stop to play with. Questions before you buy? Message me.
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[14px]">
                  <a
                    href="https://x.com/harvansh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline decoration-edge/20 underline-offset-4 hover:decoration-edge/60"
                  >
                    @harvansh
                  </a>
                  <a
                    href="mailto:support@hairlineui.com"
                    className="font-medium text-ink underline decoration-edge/20 underline-offset-4 hover:decoration-edge/60"
                  >
                    support@hairlineui.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-2">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openItems.includes(item.id);
            return (
              <div
                key={item.id}
                className={`plate-corners-sm transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none ${
                  isOpen
                    ? "bg-surface shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)]"
                    : "hover:bg-edge/[0.035]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${item.id}`}
                    onClick={() => toggle(item.id)}
                    className="plate-corners-sm group flex w-full items-center justify-between gap-6 px-4 py-4 text-left text-[15.5px] font-medium tracking-[-0.01em] text-ink outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 sm:px-5 sm:text-[16px]"
                  >
                    <span>{item.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-chevron-down size-4 shrink-0 transition-[rotate,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                        isOpen ? "rotate-180 text-ink" : "rotate-0 text-ink-6"
                      }`}
                      aria-hidden={true}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-a-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${item.id}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`px-4 pb-5 pr-10 text-[15px] leading-[1.65] text-ink-5 transition-opacity duration-300 motion-reduce:transition-none sm:px-5 sm:pr-12 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
