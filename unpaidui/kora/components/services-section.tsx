"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Compass,
  TrendingUp,
  Cpu,
  Zap,
  Tag,
  ArrowRight,
} from "lucide-react";

interface ServiceData {
  id: string;
  count: string;
  category: string;
  icon: typeof Compass;
  heading: string;
  description: string;
  subservices: string[];
  image: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: "go-to-market-service",
    count: "01",
    category: "Go-to-Market",
    icon: Compass,
    heading: "Launches that land and scale.",
    description:
      "Whether you're launching a new product or entering a new segment, we design the GTM motion that lands and scales.",
    subservices: [
      "Launch Strategy & Execution",
      "ICP & Persona Development",
      "Messaging & Value Proposition",
      "Channel Selection & Activation",
      "Partner & Alliance Programs",
      "Market Entry Playbooks",
    ],
    image:
      "https://framerusercontent.com/images/OqCGYrjHIzy11F9CWaDgfYAzKQ.jpg?width=2400&height=1800",
    quote: '"Kora designed something that actually made our brand stronger."',
    authorName: "James Martin",
    authorRole: "CEO, Hamilton",
    authorAvatar:
      "https://framerusercontent.com/images/BP9PfINr3O04BI5y3ieM8tzir1c.jpg?width=120&height=120",
  },
  {
    id: "growth-strategy-service",
    count: "02",
    category: "Growth Strategy",
    icon: TrendingUp,
    heading: "Strategy that turns ambition into revenue.",
    description:
      "We build the roadmap that gets you from where you are to where the revenue needs to be.",
    subservices: [
      "Market Sizing & Opportunity Mapping",
      "Revenue Goal Architecture",
      "Competitive Positioning",
      "Growth Modeling & Forecasting",
      "Channel Strategy",
      "Quarterly Planning Sprints",
    ],
    image:
      "https://framerusercontent.com/images/3NdwQXmM1SRuYwMwOwL4wEa9Y.jpg?width=2399&height=1800",
    quote:
      '"Kora didn’t just give us a strategy—they helped us become a more strategic company."',
    authorName: "Sarah Bouchard",
    authorRole: "Founder & CEO, Lightspeed",
    authorAvatar:
      "https://framerusercontent.com/images/mAVFdgGkoAuNgor7naAnOLpKiIs.jpg?width=120&height=120",
  },
  {
    id: "revenue-operations-service",
    count: "03",
    category: "Revenue Operations",
    icon: Cpu,
    heading: "Systems that make revenue predictable.",
    description:
      "Your pipeline has leaks. We find them, fix them, and build the systems that keep revenue flowing predictably.",
    subservices: [
      "Pipeline Architecture",
      "CRM & Tech Stack Optimization",
      "Lead Scoring & Qualification",
      "Funnel Analytics & Reporting",
      "Handoff Process Design",
      "Revenue Forecasting Dashboards",
    ],
    image:
      "https://framerusercontent.com/images/NF5tRpn3xrpV81CGf1SDQo60Lk.jpg?width=2400&height=1800",
    quote:
      '"Kora helped us realize we had a conversion problem, not a capacity problem."',
    authorName: "David Kim",
    authorRole: "VP Strategy, Sitemark",
    authorAvatar:
      "https://framerusercontent.com/images/MI76ZMTeB2Mvtl0tBcBCscmA.jpg?width=120&height=120",
  },
  {
    id: "sales-optimization-service",
    count: "04",
    category: "Sales Optimization",
    icon: Zap,
    heading: "Sales teams that close faster and bigger.",
    description:
      "We restructure how your team sells so every rep closes faster, bigger, and more consistently.",
    subservices: [
      "Sales Process Redesign",
      "Team Structure & Hiring",
      "Compensation & Incentive Design",
      "Win/Loss Analysis",
      "Deal Acceleration Playbooks",
      "Sales Enablement & Training",
    ],
    image:
      "https://framerusercontent.com/images/Xg3naOB3jlkrgVdI79zfTGmUpxo.jpg?width=2400&height=1800",
    quote:
      '"What sets Kora apart is their commitment to building our capabilities."',
    authorName: "Jennifer Holland",
    authorRole: "CFO, Elevance",
    authorAvatar:
      "https://framerusercontent.com/images/OLuRkG9gyMPQXSy4xo8GQM2EmU.jpg?width=120&height=120",
  },
  {
    id: "pricing-packaging-service",
    count: "05",
    category: "Pricing & Packaging",
    icon: Tag,
    heading: "Pricing that captures what you're actually worth.",
    description:
      "Most companies leave 20-40% on the table with bad pricing. We fix that with data-backed packaging that captures real value.",
    subservices: [
      "Pricing Model Design",
      "Willingness-to-Pay Research",
      "Expansion Revenue Strategy",
      "Discount & Negotiation Frameworks",
    ],
    image:
      "https://framerusercontent.com/images/qkntRVyDFXSavXk2fE20yVB6CU.jpg?width=2400&height=1800",
    quote:
      '"Kora challenged our assumptions, and stayed until the changes actually stuck"',
    authorName: "Marcus Thompson",
    authorRole: "President, Theo",
    authorAvatar:
      "https://framerusercontent.com/images/bHZPgCMyonDjkoqqgaJSh43gsI.jpg?width=120&height=120",
  },
];

const TICKS = ["0M", "2M", "4M", "6M", "8M", "10M", "12M", "14M"];

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#f5f5e9] pt-20 sm:pt-28 pb-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PART 1: Section Eyebrow, Statement & Bar Graph
           ======================================================== */}
        <div className="mb-24 sm:mb-32">
          {/* Eyebrow Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-semibold text-[#242424] tracking-[-0.04em] mb-12 sm:mb-16"
          >
            Services.
          </motion.h2>

          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[960px]"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-[-0.035em] text-[#242424] leading-[1.2]">
              Within six months of working with Kora, clients experienced an{" "}
              <span className="text-[#5dc39b]">
                average 47% increase in annual revenue
              </span>{" "}
              based on pre and post-engagement performance.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-[#737373] font-normal">
              *Across B2B clients with $5M to $50M in annual revenue over a standard 6-month engagement.
            </p>
          </motion.div>

          {/* Growth Bar Graph */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-14 sm:mt-16 relative"
          >
            {/* Bars Area with vertical grid guidelines */}
            <div className="relative pt-6 pb-2">
              {/* Background Vertical Grid Dotted Lines */}
              <div className="absolute inset-0 flex justify-between pointer-events-none">
                {TICKS.map((_, i) => (
                  <div
                    key={i}
                    className="h-full border-r border-dashed border-neutral-300/80"
                  />
                ))}
              </div>

              {/* Bar 1: With Kora ($14.2M avg ARR) */}
              <div className="relative z-10 mb-3.5">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="h-12 sm:h-13 bg-[#5dc39b] rounded-xl sm:rounded-2xl flex items-center justify-between px-5 sm:px-6 shadow-sm overflow-hidden"
                >
                  <span className="text-[14px] sm:text-[15px] font-medium text-white whitespace-nowrap">
                    With Kora
                  </span>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-white whitespace-nowrap">
                    $14.2M avg ARR
                  </span>
                </motion.div>
              </div>

              {/* Bar 2: Without ($9.6M avg ARR) ~67.6% */}
              <div className="relative z-10">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "67.6%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="h-12 sm:h-13 bg-[#e6e6e6] rounded-xl sm:rounded-2xl flex items-center justify-between px-5 sm:px-6 shadow-xs overflow-hidden"
                >
                  <span className="text-[14px] sm:text-[15px] font-medium text-[#242424] whitespace-nowrap">
                    Without
                  </span>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#242424] whitespace-nowrap">
                    $9.6M avg ARR
                  </span>
                </motion.div>
              </div>
            </div>

            {/* X-Axis Numbers */}
            <div className="flex justify-between pt-3 text-[12px] sm:text-[13px] font-medium text-[#737373] select-none border-t border-neutral-300/60 mt-1">
              {TICKS.map((tick, i) => (
                <span
                  key={i}
                  className={`text-center ${
                    i === 0 ? "text-left" : i === TICKS.length - 1 ? "text-right" : ""
                  }`}
                >
                  {tick}
                </span>
              ))}
            </div>

            {/* Axis Label */}
            <p className="text-center mt-5 text-[12px] sm:text-[13px] font-medium text-[#737373] tracking-wide">
              Annual Recurring Revenue ($M)
            </p>
          </motion.div>
        </div>

        {/* ========================================================
            PART 2: Sticky Stacking Service Cards (01 to 05)
           ======================================================== */}
        <div className="relative space-y-8 sm:space-y-12">
          {SERVICES_DATA.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                style={{ zIndex: index + 1 }}
                className="sticky top-16 sm:top-20 pt-4 sm:pt-6"
              >
                {/* Outer Service Card Frame */}
                <div className="rounded-[32px] sm:rounded-[40px] bg-[#f5f5e9] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-black/[0.04] overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 p-3 sm:p-4">
                    {/* Left Panel: Content & Information */}
                    <div className="lg:col-span-6 bg-[#fffffa] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xs">
                      <div>
                        {/* Header Row: Category Badge & Index */}
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f0] border border-black/[0.04]">
                            <Icon className="size-3.5 text-[#242424]" />
                            <span className="text-xs font-semibold text-[#242424]">
                              {service.category}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-medium text-[#737373] tracking-wider">
                            {service.count}
                          </span>
                        </div>

                        {/* Heading */}
                        <h3 className="mt-8 text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-[#242424] tracking-[-0.03em] leading-[1.18]">
                          {service.heading}
                        </h3>

                        {/* Description */}
                        <p className="mt-4 text-[14.5px] sm:text-base text-[#616161] leading-relaxed font-normal">
                          {service.description}
                        </p>

                        {/* Sub Services Section */}
                        <div className="mt-10 sm:mt-12">
                          <span className="text-xs uppercase font-medium tracking-wider text-[#737373]">
                            What we offer
                          </span>
                          <div className="mt-3.5 flex flex-wrap gap-2">
                            {service.subservices.map((sub, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-block px-3.5 py-1.5 rounded-full bg-[#f5f5f0] text-xs font-medium text-[#242424] hover:bg-neutral-200/70 transition-colors"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action CTA Button */}
                      <div className="mt-10 sm:mt-12">
                        <Link
                          href="#contact"
                          className="w-full h-13 sm:h-14 rounded-full bg-[#5dc39b] hover:bg-[#52b38c] text-[#fffffa] text-[15px] font-medium flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] shadow-md group"
                        >
                          <span>Get Started</span>
                          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Panel: Photographic Imagery & Testimonial Quote */}
                    <div className="lg:col-span-6 relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-full bg-neutral-900">
                      <Image
                        src={service.image}
                        alt={service.heading}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-center select-none"
                      />

                      {/* Subtle Vignette Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Frosted Testimonial Quote Card (Pinned Bottom-Right) */}
                      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 left-4 sm:left-auto max-w-[380px] rounded-[24px] backdrop-blur-md bg-black/35 border border-white/20 p-5 sm:p-6 text-white shadow-xl">
                        {/* Rating Dots */}
                        <div className="flex items-center gap-1.5 mb-2.5">
                          {[...Array(5)].map((_, dotIdx) => (
                            <span
                              key={dotIdx}
                              className="size-1.5 rounded-full bg-[#5dc39b]"
                            />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <p className="text-[13px] sm:text-[14px] font-normal leading-relaxed text-white/95">
                          {service.quote}
                        </p>

                        {/* Author Credentials */}
                        <div className="mt-4 flex items-center gap-3">
                          <img
                            src={service.authorAvatar}
                            alt={service.authorName}
                            className="size-9 rounded-full object-cover border border-white/40 shadow-xs"
                            width={36}
                            height={36}
                          />
                          <div>
                            <p className="text-xs sm:text-[13px] font-semibold text-white leading-tight">
                              {service.authorName}
                            </p>
                            <p className="text-[11px] text-white/75 font-normal mt-0.5">
                              {service.authorRole}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
