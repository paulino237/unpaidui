"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const TESTIMONIALS = [
  {
    quote:
      "This platform completely transformed how our support team operates. Response times dropped by 60% and customer satisfaction is at an all-time high.",
    name: "Jennifer Walsh",
    title: "VP of Customer Success @ Commandr",
    avatar:
      "https://images.unsplash.com/photo-1600481453173-55f6a844a4ea?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#a8d946",
    company: "Commandr",
  },
  {
    quote:
      "From onboarding to full deployment, the entire process was seamless. Our team productivity increased by 40% and we couldn't be happier with the results.",
    name: "Michael Torres",
    title: "Head of Operations @ Interlock",
    avatar:
      "https://images.unsplash.com/photo-1530466015235-1d47696ea847?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#a8d946",
    company: "Interlock",
  },
  {
    quote:
      "The AI-powered insights brought our customer strategy to life. Every interaction now feels personalized yet scalable for our growing user base.",
    name: "Amanda Chen",
    title: "CX Director @ Focalpoint",
    avatar:
      "https://images.unsplash.com/photo-1705408115324-6bd2cbfa4d93?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#a8d946",
    company: "Focalpoint",
  },
  {
    quote:
      "Outstanding platform and support team. They helped us implement automation two weeks ahead of schedule with zero compromises on quality.",
    name: "David Patterson",
    title: "CEO @ Acme Corp",
    avatar:
      "https://images.unsplash.com/photo-1564172556663-2bef9580fc44?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#a8d946",
    company: "Acme Corp",
  },
];

const COMPANIES = [
  { name: "Commandr", logo: "/mock-logos/commandr.svg" },
  { name: "Interlock", logo: "/mock-logos/interlock.svg" },
  { name: "Focalpoint", logo: "/mock-logos/focalpoint.svg" },
  { name: "Acme Corp", logo: "/mock-logos/acmecorp.svg" },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-frame border-t border-b border-accent/15 px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-4xl leading-tight font-medium text-neutral-900 sm:text-5xl lg:mb-20 lg:text-6xl dark:text-neutral-50">
          Trusted by teams worldwide
        </h2>

        <div className="mb-16 grid gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-12">
          {/* Avatar Tabs */}
          <div className="flex items-center justify-start gap-4 lg:gap-6" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{
                  scale: active === i ? 1.1 : 0.9,
                  opacity: active === i ? 1 : 0.6,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative cursor-pointer select-none"
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
              >
                <div
                  className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                  style={{ backgroundColor: active === i ? t.color : undefined }}
                >
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="h-8 w-8 rounded-full object-cover grayscale sm:h-12 sm:w-12 lg:h-16 lg:w-16"
                  />
                </div>

                {active === i && (
                  <svg
                    className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90 pointer-events-none"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke={t.color}
                      strokeWidth="1.5"
                      opacity="0.2"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke={t.color}
                      strokeWidth="1.5"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 10, ease: "linear" }}
                      strokeLinecap="round"
                      key={`progress-${active}`}
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>

          {/* Active Quote Panel */}
          <div className="flex flex-col justify-center" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              {TESTIMONIALS[active] && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <blockquote className="mb-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                    “{TESTIMONIALS[active].quote}”
                  </blockquote>
                  <div className="text-base font-medium text-neutral-900 sm:text-lg dark:text-neutral-100">
                    {TESTIMONIALS[active].name},{" "}
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {TESTIMONIALS[active].title}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Company Logos below */}
        <div className="flex items-center justify-between gap-6 lg:gap-8 border-t border-border/40 pt-10">
          {COMPANIES.map((c, i) => {
            const isMatch = TESTIMONIALS[active]?.company === c.name;
            return (
              <motion.div
                key={c.name}
                animate={{ scale: isMatch ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <Image
                  src={c.logo}
                  alt={`${c.name} logo`}
                  width={120}
                  height={40}
                  className={`h-8 w-auto object-contain brightness-0 dark:invert transition-all duration-300 sm:h-10 ${
                    isMatch ? "opacity-100" : "opacity-40"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
