"use client";

import Link from "next/link";
import { motion } from "motion/react";

function RocketIcon({ className }: { className?: string }) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
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
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function Building2Icon({ className }: { className?: string }) {
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
      <path d="M10 12h4" />
      <path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  note?: string;
  icon: "rocket" | "zap" | "building";
  features: string[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    description: "For individuals and hobbyists",
    price: "$0",
    period: "/mo",
    icon: "rocket",
    features: [
      "50 design generations/month",
      "Basic brand kit",
      "PNG & SVG exports",
      "Email support",
      "1 workspace",
    ],
    cta: "Get started",
  },
  {
    name: "Pro",
    description: "Best for startups and growing teams",
    price: "$99",
    period: "/mo",
    note: "Cancel or pause any time",
    icon: "zap",
    features: [
      "Unlimited design generations",
      "Advanced brand consistency",
      "All export formats + Figma",
      "Priority support & delivery",
      "5 team members",
      "API access",
    ],
    cta: "Upgrade plan",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    price: "Custom",
    period: "",
    icon: "building",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom model training",
      "Dedicated account manager",
      "SSO & advanced security",
      "SLA & on-prem options",
    ],
    cta: "Contact sales",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const Icon =
    plan.icon === "rocket"
      ? RocketIcon
      : plan.icon === "zap"
        ? ZapIcon
        : Building2Icon;

  const card = (
    <div
      className={`relative flex h-full flex-col rounded-3xl bg-background p-6 sm:p-8 ${
        plan.popular ? "" : "border border-foreground/10"
      }`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        {plan.popular && (
          <span className="rounded-full border border-accent/50 bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            Most popular
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight text-foreground">
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-lg text-muted-foreground">{plan.period}</span>
        )}
        {plan.note && (
          <span className="ml-auto text-right text-sm text-muted-foreground">
            {plan.note}
          </span>
        )}
      </div>

      <ul className="my-8 flex-1 space-y-3 border-t border-foreground/10 pt-6">
        {plan.features.map((feat) => (
          <li
            key={feat}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className={`flex h-12 w-full items-center justify-center rounded-full text-sm font-medium transition-opacity hover:opacity-90 ${
          plan.popular
            ? "bg-foreground text-background"
            : "border border-foreground/15 bg-muted/50 text-foreground hover:bg-muted"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );

  if (!plan.popular) return card;

  return (
    <div className="relative">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] rounded-full bg-accent-light opacity-50 blur-3xl"
        animate={{
          x: ["-50%", "-30%", "-70%", "-40%", "-60%", "-50%"],
          y: ["-50%", "-70%", "-30%", "-60%", "-40%", "-50%"],
          scale: [1, 1.2, 0.9, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] rounded-full bg-accent opacity-40 blur-3xl"
        animate={{
          x: ["-50%", "-70%", "-30%", "-60%", "-40%", "-50%"],
          y: ["-50%", "-30%", "-70%", "-40%", "-60%", "-50%"],
          scale: [1, 0.9, 1.15, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      />
      <div className="absolute -inset-px rounded-[1.52rem] bg-gradient-to-br from-accent to-accent-light opacity-25" />
      <div className="relative h-full">{card}</div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="text-4xl font-medium tracking-tight text-foreground">
            Simple, transparent pricing
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg text-muted-foreground">
          Start free and scale as you grow. No hidden fees, no surprises.
        </p>
      </div>
    </section>
  );
}
