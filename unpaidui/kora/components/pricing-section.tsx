"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check, CheckCircle2, Circle } from "lucide-react";

interface PlanData {
  id: string;
  name: string;
  badge?: string;
  pricePrefix: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  ctaText: string;
}

const PLANS: Record<string, PlanData> = {
  sprint: {
    id: "sprint",
    name: "Growth Sprint",
    pricePrefix: "Starts at",
    price: "$2500",
    priceSuffix: "/mo",
    description:
      "A focused, 8-week engagement to diagnose your biggest growth blocker and build the plan to fix it.",
    features: [
      "Full-funnel diagnostic audit",
      "90-day growth roadmap",
      "Weekly strategy sessions",
      "Conversion optimization plan",
      "30-day post-engagement check-in",
    ],
    ctaText: "Get Started",
  },
  partnership: {
    id: "partnership",
    name: "Growth Partnership",
    badge: "Popular",
    pricePrefix: "Starts at",
    price: "$8500",
    priceSuffix: "/mo",
    description:
      "An embedded growth team working alongside leadership to scale revenue across multiple channels.",
    features: [
      "Dedicated senior growth consultant",
      "Bi-weekly sprint execution & reviews",
      "Full CRM & revenue stack architecture",
      "Ongoing positioning & pricing calibration",
      "24/7 Slack access & priority support",
    ],
    ctaText: "Get Started",
  },
  custom: {
    id: "custom",
    name: "Custom",
    pricePrefix: "Get a quote",
    price: "Custom",
    priceSuffix: "",
    description:
      "Tailored enterprise advisory for organizations navigating complex mergers, global expansion, or multi-product shifts.",
    features: [
      "Multi-business unit strategic roadmap",
      "Custom org design & sales enablement",
      "Executive leadership coaching",
      "Board & investor presentation decks",
      "Dedicated principal consultant",
    ],
    ctaText: "Get a quote",
  },
};

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>("sprint");
  const plan = PLANS[selectedPlan];

  return (
    <section id="pricing" className="relative bg-[#f5f5e9] py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            Giant Dark Charcoal Container (#242424)
           ======================================================== */}
        <div className="relative rounded-[36px] sm:rounded-[44px] bg-[#242424] text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-white/[0.06]">
          {/* Top Row: Heading & Social Proof */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/[0.1]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-[-0.035em] leading-[1.15]">
                Pricing for your next stage.
              </h2>
            </motion.div>

            {/* Social Proof Pill (5 Avatars + 5 Mint Dots) */}
            <div className="inline-flex items-center gap-3 self-start md:self-auto">
              <div className="flex -space-x-2 overflow-hidden">
                {[
                  "CLNNeZ7sGt3ywvDzR7D6Mi3TE.jpg",
                  "aqkakFzIkX11TpipSH4MurMn1c.jpg",
                  "Y0PKmJR8OR83TST953hq4wrsmtI.jpg",
                  "dYAD6XIGC1k0IidBb9wX6b7srM.jpg",
                  "ZCltSDBMvX6dGq8gfKZbNA61y0.jpg",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="relative size-7 rounded-full overflow-hidden border-2 border-[#242424]"
                  >
                    <Image
                      src={`https://framerusercontent.com/images/${img}?width=60&height=60`}
                      alt="Client avatar"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((star) => (
                  <span
                    key={star}
                    className="size-1.5 rounded-full bg-[#5dc39b]"
                  />
                ))}
              </div>

              <span className="text-xs font-medium text-white/80">
                Trusted by 50+ companies
              </span>
            </div>
          </div>

          {/* Main 2-Column Pricing Body */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 3 White Plan Selector Pills + Risk Reversal (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {[
                {
                  id: "sprint",
                  name: "Growth Sprint",
                  price: "Starts at $2500/mo",
                },
                {
                  id: "partnership",
                  name: "Growth Partnership",
                  price: "Starts at $8500/mo",
                  badge: "Popular",
                },
                {
                  id: "custom",
                  name: "Custom",
                  price: "Get a quote",
                },
              ].map((item) => {
                const isSelected = selectedPlan === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPlan(item.id)}
                    className={`w-full text-left p-5 rounded-[22px] transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? "bg-[#fffffa] text-[#242424] shadow-lg scale-[1.01] border-transparent"
                        : "bg-[#fffffa]/90 hover:bg-[#fffffa] text-[#242424] border-transparent opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base text-[#242424]">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#5dc39b] text-white uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#616161] mt-0.5 block">
                        {item.price}
                      </span>
                    </div>

                    <div className="size-5 rounded-full flex items-center justify-center text-[#242424]">
                      {isSelected ? (
                        <CheckCircle2 className="size-5 fill-[#242424] text-white" />
                      ) : (
                        <Circle className="size-5 text-[#242424]/30" />
                      )}
                    </div>
                  </button>
                );
              })}

              {/* David Wilson Risk Reversal Callout */}
              <div className="mt-4 pt-6 border-t border-white/10">
                <p className="text-sm text-white/90 font-normal leading-relaxed">
                  All engagements start with a{" "}
                  <strong className="text-[#5dc39b] font-semibold">free</strong>{" "}
                  30-minute discovery call. No commitment required.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="relative size-10 rounded-full overflow-hidden border border-white/30 shrink-0">
                    <Image
                      src="https://framerusercontent.com/images/vT4xPYmbaRCnYfkKyzUAbKKiR0.jpg?width=1024&height=1024"
                      alt="David Wilson"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-white">David Wilson</p>
                    <p className="text-white/60">Head of Client Solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Active Plan Detail Card (7 cols) */}
            <div className="lg:col-span-7 rounded-[32px] bg-[#2a2a2a] p-8 sm:p-12 border border-white/[0.08] shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
                    <div>
                      <span className="text-xs text-white/60 font-medium block">
                        {plan.pricePrefix}
                      </span>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-white">
                          {plan.price}
                        </span>
                        {plan.priceSuffix && (
                          <span className="text-xl sm:text-2xl text-white/60 ml-1 font-light">
                            {plan.priceSuffix}
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#f5f5e9] text-[#242424] hover:bg-white font-semibold text-sm transition-all shadow-md hover:scale-105 active:scale-95 shrink-0"
                    >
                      {plan.ctaText}
                    </a>
                  </div>

                  <p className="mt-6 text-sm text-white/85 leading-relaxed font-normal max-w-[540px]">
                    {plan.description}
                  </p>

                  {/* 5 Inclusions in 2 Columns with Circular Checkmarks */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="size-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#5dc39b] mt-0.5">
                          <Check className="size-3 stroke-[2.8]" />
                        </div>
                        <span className="text-xs sm:text-[13px] text-white/90 font-normal leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
