"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Plus, Minus, TrendingUp, Percent, Award, Briefcase } from "lucide-react";
import { KoraLogo } from "./kora-logo";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  companyLogo?: string;
  isInitialOpen?: boolean;
}

const MORE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "marcus",
    quote:
      "I was skeptical of consultants—we’d been burned before by firms that delivered pretty slides and then disappeared. Kora was different. They rolled up their sleeves, challenged our assumptions, and stayed until the changes actually stuck.",
    author: "Marcus Thompson",
    role: "President, Theo",
    avatar:
      "https://framerusercontent.com/images/Lc4erlgEmXN8fEJjyK8QzjEA3Qo.jpg?width=1800&height=2329",
    companyLogo: "theo",
    isInitialOpen: true,
  },
  {
    id: "david",
    quote:
      "Kora helped us see around corners. When everyone else was telling us to grow headcount, they helped us realize we had a conversion problem, not a capacity problem. That insight alone saved us from making a costly mistake.",
    author: "David Kim",
    role: "VP Strategy, Sitemark",
    avatar:
      "https://framerusercontent.com/images/MI76ZMTeB2Mvtl0tBcBCscmA.jpg?width=1800&height=2400",
  },
  {
    id: "jennifer",
    quote:
      "What sets Kora apart is their commitment to building our capabilities, not creating dependency. A year after our engagement ended, we're still using the frameworks they taught us. That's the mark of a true partner.",
    author: "Jennifer Holland",
    role: "CFO, Elevance",
    avatar:
      "https://framerusercontent.com/images/4WbRXwPAFJbnEFjFuWDs7LLC4ds.jpg?width=1800&height=2400",
  },
];

const STATS = [
  {
    value: "2.4",
    suffix: "x",
    icon: TrendingUp,
    description: "Revenue increase achieved within 18 months.",
  },
  {
    value: "40",
    suffix: "%",
    icon: Percent,
    description: "Average reduction in customer acquisition costs.",
  },
  {
    value: "90",
    suffix: "%",
    icon: Award,
    description: "Client retention rate.",
  },
  {
    value: "12",
    suffix: "+",
    icon: Briefcase,
    description: "Portfolio companies that have raised Series B or beyond.",
  },
];

export function TestimonialsSection() {
  const [openCardId, setOpenCardId] = useState<string>("marcus");

  return (
    <section id="testimonials" className="relative bg-[#f5f5e9] py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Eyebrow Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#242424] tracking-[-0.04em]">
            Testimonials
          </h2>
        </motion.div>

        {/* ========================================================
            PART 1: Featured Testimonial Hero Banner
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[36px] sm:rounded-[44px] overflow-hidden min-h-[520px] sm:min-h-[580px] p-6 sm:p-12 lg:p-14 flex flex-col justify-between shadow-2xl"
        >
          {/* Authentic Background Image: Woman walking on sunlit street */}
          <Image
            src="https://framerusercontent.com/images/F1UsC3Qy2MBxr7spZdOv8SWIZpQ.jpg?width=2400&height=1350"
            alt="Sarah Bouchard in executive environment"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[center_30%] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/35 pointer-events-none" />

          {/* Top-Left Floating Frosted Glass Card */}
          <div className="relative z-10 max-w-[500px] backdrop-blur-xl bg-black/45 border border-white/25 rounded-[30px] p-7 sm:p-9 text-white shadow-2xl transition-transform duration-500 hover:rotate-0 -rotate-1">
            <h3 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight">
              &ldquo;Kora didn’t just give us a strategy—they helped us become a
              more strategic company.&rdquo;
            </h3>
            <p className="mt-3.5 text-sm sm:text-[15px] text-white/80 leading-relaxed font-normal">
              They identified three fundamental issues that we’d been blind to
              for years. Two years later, we’re at $52M and just closed our Series B.
            </p>

            <div className="mt-6 flex items-center gap-3.5 pt-5 border-t border-white/20">
              <div className="relative size-11 rounded-full overflow-hidden border-2 border-white/50 shrink-0">
                <Image
                  src="https://framerusercontent.com/images/IUemvQkLgDMcBDfk0JMW2zfw.jpg?width=1800&height=1719"
                  alt="Sarah Bouchard"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Sarah Bouchard</p>
                <p className="text-xs text-white/70">CEO, Lightspeed</p>
              </div>
            </div>
          </div>

          {/* Bottom-Right Verified Rating Block */}
          <div className="relative z-10 self-end mt-8 flex flex-col items-end text-white">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl sm:text-7xl font-semibold tracking-tighter">
                4.9
              </span>
              <span className="size-2.5 rounded-full bg-[#5dc39b] mb-3 self-center" />
              <span className="text-2xl sm:text-3xl text-white/75 font-light">
                /5
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-white/80 font-medium">
              Based on 300 verified reviews.
            </p>
          </div>
        </motion.div>

        {/* ========================================================
            PART 2: More Testimonials (3 Interactive Cards)
           ======================================================== */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {MORE_TESTIMONIALS.map((t, idx) => {
            const isOpen = openCardId === t.id;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`rounded-[32px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#fffffa] shadow-xl border-[#242424]/10"
                    : "bg-[#f7f7ed] hover:bg-[#fffffa] border-[#242424]/[0.06] shadow-sm"
                }`}
              >
                {/* Top Row: 5 Mint Green Rating Dots & Toggle Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <span
                        key={dot}
                        className="size-2 rounded-full bg-[#5dc39b]"
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setOpenCardId(isOpen ? "" : t.id)
                    }
                    aria-label={isOpen ? "Collapse review" : "Expand review"}
                    className="size-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center text-[#242424] transition-colors cursor-pointer"
                  >
                    {isOpen ? (
                      <Minus className="size-4 stroke-[2.2]" />
                    ) : (
                      <Plus className="size-4 stroke-[2.2]" />
                    )}
                  </button>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-[14.5px] text-[#242424] leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author Footer */}
                <div className="mt-8 pt-5 border-t border-[#242424]/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 rounded-full overflow-hidden shrink-0 border border-[#242424]/10">
                      <Image
                        src={t.avatar}
                        alt={t.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-[#242424]">
                        {t.author}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#616161]">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {t.companyLogo && (
                    <span className="font-serif italic font-bold text-base text-[#242424]/75">
                      {t.companyLogo}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================
            PART 3: Stat Grid (Verified: 2.4x, 40%, 90%, 12+)
           ======================================================== */}
        <div className="mt-14 sm:mt-18 rounded-[36px] bg-[#f7f7ed] border border-[#242424]/[0.06] p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#242424]/[0.08]">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.description}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col justify-between ${
                  idx > 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""
                }`}
              >
                <div className="size-11 rounded-2xl bg-white flex items-center justify-center text-[#242424] shadow-sm mb-6">
                  <Icon className="size-5 stroke-[2.2] text-[#5dc39b]" />
                </div>

                <div>
                  <div className="flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-semibold text-[#242424] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-3xl sm:text-4xl font-semibold text-[#5dc39b] ml-0.5">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-[#616161] leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================
            PART 4: Bottom CTA Banner (Authentic Light Cream Design #fffffa)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 rounded-[36px] bg-[#fffffa] text-[#242424] p-8 sm:p-12 lg:p-14 border border-[#242424]/[0.08] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between"
        >
          {/* Left Zone: Kora Emblem & Statement (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <KoraLogo className="h-4.5 w-auto text-[#242424]" />
            <p className="mt-4 text-sm font-semibold text-[#242424] leading-relaxed max-w-[280px]">
              We&apos;re in the business of making things actually happen for our
              clients.
            </p>
          </div>

          {/* Center Zone: Headline + Koraline Spencer Avatar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <h4 className="text-base sm:text-lg font-semibold text-[#242424] tracking-tight leading-snug">
              &ldquo;I&apos;ve personally led 40+ growth engagements. Let me show you
              what&apos;s possible for yours.&rdquo;
            </h4>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative size-10 rounded-full overflow-hidden border border-[#242424]/10 shrink-0 shadow-sm">
                <Image
                  src="https://framerusercontent.com/images/ptzdfa8kamllLFJeEJ6fpHyKaQ.jpg?width=1024&height=1024"
                  alt="Koraline Spencer"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#242424]">Koraline Spencer</p>
                <p className="text-[#616161]">Founder & CEO</p>
              </div>
            </div>
          </div>

          {/* Right Zone: Dark Pill Book a Call CTA (3 cols) */}
          <div className="lg:col-span-3 flex justify-start lg:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#242424] text-white hover:bg-black font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 shrink-0"
            >
              <span>Book a call</span>
              <ArrowUpRight className="size-4 stroke-[2.2]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
