"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PRICING_PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for individual users",
    buttonText: "Start Free",
    popular: false,
    features: [
      "Custom domain",
      "SEO-optimizations",
      "Auto-generated API docs",
      "Built-in components library",
    ],
  },
  {
    name: "Startup",
    monthlyPrice: 12,
    yearlyPrice: 10,
    description: "Ideal for professionals and small teams",
    buttonText: "Upgrade to Pro",
    popular: true,
    features: [
      "Custom domain",
      "SEO-optimizations",
      "Auto-generated API docs",
      "Built-in components library",
      "E-commerce integration",
      "User authentication system",
      "Multi-language support",
      "Real-time collaboration tools",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 24,
    yearlyPrice: 19,
    description: "Best for large teams and enterprise-level organizations",
    buttonText: "Contact Sales",
    popular: false,
    features: [
      "Custom domain",
      "SEO-optimizations",
      "Auto-generated API docs",
      "Built-in components library",
      "Real-time collaboration tools",
    ],
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 pb-14 w-full relative"
    >
      {/* Header */}
      <div className="border-b border-border w-full p-10 md:p-14">
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance text-primary">
            Pricing that scales with you
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium text-sm sm:text-base">
            Whichever plan you pick, it&apos;s free until you love your docs.
            That&apos;s our promise.
          </p>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="relative flex w-fit items-center rounded-full border border-border p-1 bg-muted/60 dark:bg-[#27272A]">
        {(["monthly", "yearly"] as const).map((tab) => {
          const isActive = billingCycle === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setBillingCycle(tab)}
              className="relative z-[1] px-4 py-1.5 h-8 flex items-center justify-center cursor-pointer text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="pricing-billing-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white dark:bg-[#3F3F46] shadow-sm border border-border/50"
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 capitalize ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab}
                {tab === "yearly" && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary">
                    -20%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid min-[650px]:grid-cols-2 min-[900px]:grid-cols-3 gap-4 w-full max-w-6xl mx-auto px-6">
        {PRICING_PLANS.map((plan) => {
          const price =
            billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          return (
            <div
              key={plan.name}
              className={`rounded-xl grid grid-rows-[180px_auto_1fr] relative h-fit min-[650px]:h-full min-[900px]:h-fit border border-border ${
                plan.popular
                  ? "bg-accent shadow-[0px_61px_24px_-10px_rgba(0,0,0,0.01),0px_34px_20px_-8px_rgba(0,0,0,0.05),0px_15px_15px_-6px_rgba(0,0,0,0.09),0px_4px_8px_-2px_rgba(0,0,0,0.10),0px_0px_0px_1px_rgba(0,0,0,0.08)]"
                  : "bg-background"
              }`}
            >
              {/* Top Price Box */}
              <div className="flex flex-col gap-4 p-4">
                <p className="text-sm font-medium text-primary flex items-center">
                  {plan.name}
                  {plan.popular && (
                    <span className="bg-gradient-to-b from-secondary/50 from-[1.92%] to-secondary to-[100%] text-white h-6 inline-flex w-fit items-center justify-center px-2.5 rounded-full text-xs font-medium ml-2 shadow-[0px_6px_6px_-3px_rgba(0,0,0,0.08),0px_3px_3px_-1.5px_rgba(0,0,0,0.08),0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_0px_0px_1px_rgba(255,255,255,0.12)_inset,0px_1px_0px_0px_rgba(255,255,255,0.12)_inset]">
                      Popular
                    </span>
                  )}
                </p>

                <div className="flex items-baseline mt-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, filter: "blur(5px)", x: 10 }}
                      animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                      exit={{ opacity: 0, filter: "blur(5px)", x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="text-4xl font-semibold text-primary tabular-nums"
                    >
                      ${price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="ml-2 text-sm text-muted-foreground">
                    / month
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex flex-col gap-2 p-4 pt-0">
                <button
                  type="button"
                  className={`h-10 w-full flex items-center justify-center text-sm font-medium tracking-wide rounded-full px-4 cursor-pointer transition-all ease-out active:scale-95 ${
                    plan.popular
                      ? "bg-secondary text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] hover:bg-secondary/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>

              <hr className="border-border dark:border-white/15" />

              {/* Feature Checklist */}
              <div className="p-4">
                <p className="text-sm font-medium text-primary mb-4">
                  Everything in Pro +
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <div className="size-5 rounded-full border flex items-center justify-center bg-muted-foreground/20 border-border shrink-0">
                        <svg
                          width="8"
                          height="7"
                          viewBox="0 0 8 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-primary"
                        >
                          <path
                            d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-primary/90">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
