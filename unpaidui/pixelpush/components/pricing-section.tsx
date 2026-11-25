"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { PixelButton } from "@/components/pixel-button";
import { PixelCluster } from "@/components/pixel-icon";

const EASE = [0.4, 0, 0.2, 1] as const;

const PLANS = [
  {
    label: "Starter",
    title: "Free",
    description: "Everything you need to edit your first videos with AI.",
    cta: "Start for free",
    ctaVariant: "outline" as const,
    featured: false,
    featuresLabel: "Included",
    features: [
      "AI editing in plain language",
      "Auto-captions in 10 languages",
      "720p exports",
      "5 exports per month",
      "2 GB cloud storage",
    ],
  },
  {
    label: "Pro",
    title: "$24",
    price: "/ month",
    description: "The full AI editor for creators and teams shipping video every week.",
    cta: "Start free trial",
    ctaVariant: "inverse" as const,
    featured: true,
    featuresLabel: "Everything in Starter, plus",
    features: [
      "Unlimited 4K exports",
      "Auto-captions in 50+ languages",
      "AI B-roll generation",
      "Brand kits and shared styles",
      "Priority rendering",
      "200 GB cloud storage",
    ],
  },
  {
    label: "Enterprise",
    title: "Let's talk",
    description: "Advanced controls, security, and support for larger video teams.",
    cta: "Get in touch",
    ctaVariant: "outline" as const,
    featured: false,
    featuresLabel: "Everything in Pro, plus",
    features: [
      "SSO and SAML",
      "Custom roles and permissions",
      "Dedicated success manager",
      "Custom AI model tuning",
      "Unlimited cloud storage",
    ],
  },
];

export function PricingSection() {
  const reduced = useReducedMotion();

  const containerVariant = {
    hidden: {},
    visible: { transition: reduced ? {} : { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section id="pricing" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border border-x border-t px-6 py-12 sm:px-10 lg:py-16">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={itemVariant}
            className="text-accent flex items-center gap-2 font-mono text-xs tracking-tight"
          >
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Pricing
          </motion.p>
          <motion.h2
            variants={itemVariant}
            className="text-foreground mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Editing for creators of every size
          </motion.h2>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="border-border grid border border-t-0 md:grid-cols-3"
      >
        {PLANS.map((plan, idx) => {
          const mutedText = plan.featured ? "text-background/60" : "text-muted-foreground";
          return (
            <motion.div
              key={plan.label}
              variants={itemVariant}
              className={`relative flex flex-col p-6 sm:p-8 ${
                plan.featured ? "bg-foreground text-background" : "text-foreground"
              } ${idx < PLANS.length - 1 ? "border-border border-b md:border-r md:border-b-0" : ""}`}
            >
              <PixelCluster
                className={`pointer-events-none absolute top-5 right-5 h-9 w-9 ${
                  plan.featured ? "text-accent" : "text-accent/60"
                }`}
              />
              <p
                className={`font-mono text-xs tracking-tight ${
                  plan.featured ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {plan.label}
              </p>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">{plan.title}</span>
                {plan.price && <span className={`text-sm ${mutedText}`}>{plan.price}</span>}
              </p>
              <p className={`mt-4 min-h-[3rem] text-sm leading-relaxed ${mutedText}`}>
                {plan.description}
              </p>
              <div className="mt-6">
                <PixelButton href="#start" variant={plan.ctaVariant} className="w-full">
                  {plan.cta}
                </PixelButton>
              </div>
              <p
                className={`mt-8 border-t border-dashed pt-6 font-mono text-xs tracking-tight ${
                  plan.featured
                    ? "border-background/20 text-background/60"
                    : "border-border text-muted-foreground"
                }`}
              >
                {plan.featuresLabel}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="text-accent mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span
                      className={`text-sm leading-snug ${
                        plan.featured ? "text-background/90" : "text-foreground/80"
                      }`}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
