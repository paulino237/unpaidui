"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Building2, Users2, Clock4, TrendingUp, Zap } from "lucide-react";

export function CaseStudySection() {
  return (
    <section id="case-study" className="relative bg-[#f5f5e9] py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            Main Case Study Bento Outer Frame
           ======================================================== */}
        <div className="rounded-[36px] sm:rounded-[44px] bg-[#f7f7ed] border border-[#242424]/[0.06] p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* ========================================================
                LEFT BENTO COLUMN (6 cols)
               ======================================================== */}
            <div className="lg:col-span-6 flex flex-col gap-5 justify-between">
              {/* Top Metadata Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-[30px] p-7 sm:p-9 shadow-sm border border-[#242424]/[0.05] flex-1 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs text-[#616161] font-medium tracking-wide">
                    March 18, 2026
                  </span>

                  <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#242424] tracking-[-0.03em] leading-[1.22]">
                    How Sitemark broke through an $18M plateau and grew 47% in
                    six months.
                  </h3>
                </div>

                <div className="mt-8 space-y-3.5 pt-6 border-t border-[#242424]/[0.06]">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5e9] text-[#616161]">
                      <Building2 className="size-3.5 text-[#5dc39b]" />
                      <span>Industry</span>
                    </div>
                    <span className="font-semibold text-[#242424]">
                      Enterprise Software
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5e9] text-[#616161]">
                      <Users2 className="size-3.5 text-[#5dc39b]" />
                      <span>Company Size</span>
                    </div>
                    <span className="font-semibold text-[#242424]">
                      450 Employees
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5e9] text-[#616161]">
                      <Clock4 className="size-3.5 text-[#5dc39b]" />
                      <span>Timeline</span>
                    </div>
                    <span className="font-semibold text-[#242424]">
                      6 Months
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Bottom 2 Metrics Cards */}
              <div className="grid grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-[26px] p-6 shadow-sm border border-[#242424]/[0.05] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-baseline">
                      <span className="text-4xl sm:text-5xl font-semibold text-[#242424] tracking-tight">
                        47
                      </span>
                      <span className="text-3xl sm:text-4xl font-semibold text-[#5dc39b] ml-0.5">
                        %
                      </span>
                    </div>
                    <div className="size-8 rounded-full bg-[#f5f5e9] flex items-center justify-center text-[#5dc39b]">
                      <TrendingUp className="size-4 stroke-[2.2]" />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[#616161] leading-relaxed">
                    Revenue growth in 6 months
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-[26px] p-6 shadow-sm border border-[#242424]/[0.05] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-baseline">
                      <span className="text-4xl sm:text-5xl font-semibold text-[#242424] tracking-tight">
                        2.4
                      </span>
                      <span className="text-3xl sm:text-4xl font-semibold text-[#5dc39b] ml-0.5">
                        x
                      </span>
                    </div>
                    <div className="size-8 rounded-full bg-[#f5f5e9] flex items-center justify-center text-[#5dc39b]">
                      <Zap className="size-4 stroke-[2.2]" />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[#616161] leading-relaxed">
                    Pipeline velocity increase
                  </p>
                </motion.div>
              </div>
            </div>

            {/* ========================================================
                RIGHT BENTO COLUMN (6 cols)
               ======================================================== */}
            <div className="lg:col-span-6 flex flex-col gap-5 justify-between">
              {/* Top Services & Quote Dual Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-white rounded-[30px] p-6 sm:p-7 shadow-sm border border-[#242424]/[0.05] grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
              >
                {/* Services Tags */}
                <div>
                  <span className="text-xs text-[#616161] font-semibold block mb-3">
                    Services
                  </span>
                  <div className="flex flex-col gap-2">
                    {["Growth Strategy", "Revenue Operations", "Pricing & Packaging"].map(
                      (service) => (
                        <span
                          key={service}
                          className="inline-block px-3 py-1 rounded-full bg-[#f5f5e9] text-[#242424] text-xs font-medium w-fit"
                        >
                          {service}
                        </span>
                      )
                    )}
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#242424] text-white text-[11px] font-semibold w-fit">
                      +2
                    </span>
                  </div>
                </div>

                {/* David Kim Quote */}
                <div className="sm:border-l sm:border-[#242424]/[0.08] sm:pl-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-1 mb-2.5">
                      {[0, 1, 2, 3, 4].map((dot) => (
                        <span
                          key={dot}
                          className="size-1.5 rounded-full bg-[#5dc39b]"
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-[13px] text-[#242424] font-medium leading-relaxed italic">
                      &ldquo;Kora helped us realize we had a conversion problem,
                      not a capacity problem.&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="relative size-7 rounded-full overflow-hidden border border-[#242424]/10 shrink-0">
                      <Image
                        src="https://framerusercontent.com/images/MI76ZMTeB2Mvtl0tBcBCscmA.jpg?width=1800&height=2400"
                        alt="David Kim"
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#242424]">
                      David Kim
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Middle Sitemark Photo Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative aspect-[16/10] rounded-[30px] overflow-hidden shadow-xl border border-black/10 group"
              >
                <Image
                  src="https://framerusercontent.com/images/qWS4BiNWHU6BsV03nquz3LOXcM.jpeg?width=2400&height=1600"
                  alt="Sitemark Case Study visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/35 pointer-events-none" />

                {/* Centered Sitemark White Emblem */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-wide">
                    <span className="text-white text-3xl font-light">*</span>
                    <span>Sitemark</span>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Full-Width Mint Green Button */}
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                href="#cases"
                className="w-full py-4 rounded-full bg-[#5dc39b] hover:bg-[#4eb48c] text-white font-semibold text-sm sm:text-base text-center transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                View Case Study
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
