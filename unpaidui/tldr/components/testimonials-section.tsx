"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

interface Testimonial {
  title: string;
  description: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    title: "10 Hours Saved Every Week",
    description:
      "I used to spend hours reading through research papers and articles. Now TLDR gives me the key insights in seconds. It's completely changed how I consume content.",
    name: "Sarah Chen",
    role: "Product Manager at Stripe",
  },
  {
    title: "My Secret Productivity Weapon",
    description:
      "As a busy professional, I don't have time to watch every video or read every article. TLDR lets me stay informed without the time commitment.",
    name: "Marcus Johnson",
    role: "Senior Engineer at Vercel",
  },
  {
    title: "Works With Everything",
    description:
      "Articles, YouTube videos, podcasts, PDFs—TLDR handles it all. One tool for all my summarization needs. The consistency is remarkable.",
    name: "Elena Rodriguez",
    role: "Content Strategist at Notion",
  },
  {
    title: "Actually Useful AI",
    description:
      "Unlike other AI tools that give generic responses, TLDR actually captures what matters. The summaries are accurate and save me from information overload.",
    name: "David Park",
    role: "Research Lead at OpenAI",
  },
  {
    title: "Perfect for Research",
    description:
      "I go through dozens of papers weekly. TLDR helps me quickly identify which ones deserve a deeper read. It's become essential to my workflow.",
    name: "Priya Sharma",
    role: "PhD Candidate at MIT",
  },
];

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < maxScroll - 1);
      setFadeOpacity(Math.min(1, (maxScroll - scrollLeft) / 150));
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const cardWidth =
        (el.children[0] ? (el.children[0] as HTMLElement).offsetWidth : 400) +
        24;
      const currentIndex = Math.round(el.scrollLeft / cardWidth);
      const targetIndex =
        direction === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(testimonials.length - 1, currentIndex + 1);
      el.scrollTo({ left: targetIndex * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background py-16 text-foreground overflow-hidden md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            What People Are Saying
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="cursor-pointer p-3 rounded-md bg-accent text-black transition-all duration-200 hover:scale-110 hover:bg-accent/80 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Scroll left"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="cursor-pointer p-3 rounded-md bg-accent text-black transition-all duration-200 hover:scale-110 hover:bg-accent/80 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Scroll right"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="relative -mx-6 md:mx-0">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-6 md:px-0"
            style={{
              scrollPaddingInline: "1.5rem",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex-none w-[calc(100vw-3rem)] md:w-[25rem] min-h-[28.125rem] bg-muted rounded-2xl p-8 md:p-10 flex flex-col justify-between snap-start"
              >
                <h3 className="text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight text-foreground">
                  {item.title}
                </h3>
                <div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-32 transition-opacity duration-300 hidden md:block"
            style={{
              opacity: fadeOpacity,
              background:
                "linear-gradient(to right, transparent, var(--background))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
