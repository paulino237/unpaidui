"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: 24,
    monthlyPrice: 40,
    description: "Perfect for small teams getting started",
    features: [
      "2 Team Members",
      "10GB Storage",
      "Basic Analytics",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: 99,
    monthlyPrice: 120,
    description: "Best for growing teams with advanced needs",
    features: [
      "10 Team Members",
      "50GB Storage",
      "Advanced Analytics",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 125,
    monthlyPrice: 150,
    description: "For large organizations requiring scale",
    features: [
      "Unlimited Members",
      "2TB Storage",
      "Custom Integrations",
      "Dedicated Support",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="w-full bg-background px-6 py-20 sm:py-28 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Choose the perfect plan for your team. Start free and scale as you grow.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium transition-colors ${
                !annual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-foreground/20 transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              aria-checked={annual}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-accent shadow ring-0 transition duration-200 ease-in-out ${
                  annual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                annual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Annual{" "}
              <span className="ml-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => {
            const isPopular = plan.popular;
            const price = annual ? plan.price : plan.monthlyPrice;

            return (
              <div key={plan.name} className="relative flex flex-col">
                {isPopular && (
                  <div className="absolute -inset-1 rounded-[1.2em] bg-accent" aria-hidden="true" />
                )}

                <div
                  className={`relative flex h-full flex-col rounded-2xl bg-frame p-6 sm:p-8 ${
                    isPopular ? "" : "border border-border"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-black">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">/ month</span>
                  </div>

                  <ul className="mb-8 flex flex-col gap-3 text-sm flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground/80">
                        <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition-colors cursor-pointer text-center ${
                      isPopular
                        ? "bg-accent text-black hover:bg-accent/90"
                        : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    Get Started
                  </motion.a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
