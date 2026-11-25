"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Scan,
  GitFork,
  Hammer,
  BookOpen,
  Play,
  Clock,
  Activity,
  Sliders,
  Headphones,
} from "lucide-react";
import { KoraLogo } from "./kora-logo";

interface PhaseData {
  number: string;
  dotIndex: number;
  title: string;
  icon: typeof Scan;
  description: string;
}

const PHASES: PhaseData[] = [
  {
    number: "01",
    dotIndex: 0,
    title: "Diagnose",
    icon: Scan,
    description:
      "Deep discovery into your market position, funnel economics, team structure, and strategic constraints. We find the real bottleneck, not just the surface symptoms.",
  },
  {
    number: "02",
    dotIndex: 1,
    title: "Design",
    icon: GitFork,
    description:
      "Co-create a focused growth plan with your leadership team. Clear priorities, defined milestones, and a resource model that's realistic and achievable.",
  },
  {
    number: "03",
    dotIndex: 2,
    title: "Build",
    icon: Hammer,
    description:
      "Hands-on execution alongside your team. We don't just advise — we build systems, run experiments, and create the infrastructure your next stage requires.",
  },
  {
    number: "04",
    dotIndex: 3,
    title: "Transfer",
    icon: BookOpen,
    description:
      "Knowledge transfer, documentation, and team upskilling so your capability outlasts the engagement. You own the playbook — we help you write it.",
  },
];

export function HowWeWorkSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="about" className="relative bg-[#f5f5e9] pt-20 sm:pt-28 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PART 1: Demo Video / Showreel Spotlight Card
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden h-[440px] sm:h-[560px] lg:h-[640px] p-8 sm:p-12 lg:p-14 flex flex-col justify-between shadow-2xl group border border-[#242424]/10"
        >
          {/* Photographic Background of 2 collaborators in workshop office */}
          <Image
            src="https://framerusercontent.com/images/qkntRVyDFXSavXk2fE20yVB6CU.jpg?width=2413&height=1609"
            alt="Kora strategic team collaboration overview"
            fill
            sizes="100vw"
            className="object-cover brightness-[0.75] group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

          {/* Top Left: White Kora Emblem */}
          <div className="relative z-10 flex items-center justify-between">
            <KoraLogo
              className="h-4 sm:h-5 w-auto"
              textColor="#ffffff"
              iconBgColor="#ffffff"
            />
          </div>

          {/* Center: Frosted Glass Interactive Play Button */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause video" : "Play overview video"}
              className="size-20 sm:size-24 rounded-full backdrop-blur-md bg-white/25 hover:bg-white/40 border border-white/50 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl group/btn"
            >
              <Play className="size-8 sm:size-9 text-white fill-white translate-x-0.5" />
            </button>
          </div>

          {/* Bottom Left: Duration pill + Heading + Subtitle */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white text-xs font-medium mb-3">
              <Clock className="size-3.5 text-white/90" />
              <span>1:25</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-white tracking-tight leading-tight">
              How we work
            </h3>
            <p className="mt-1.5 text-sm sm:text-base text-white/85 font-normal">
              See our process in under 90 seconds
            </p>
          </div>
        </motion.div>

        {/* ========================================================
            PART 2: Process Heading & Interactive Horizontal Accordion
           ======================================================== */}
        <div className="mt-20 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[850px]"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#242424] tracking-[-0.035em] leading-[1.18] text-balance">
              Most consultancies slow you down with process and overhead.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#616161] font-normal leading-relaxed">
              We built our process to get to revenue impact in weeks, not quarters.
            </p>
          </motion.div>

          <div className="mt-12 bg-[#f7f7ed] rounded-[40px] p-2.5 sm:p-3 border border-[#242424]/[0.05]">
            <div className="flex flex-col lg:flex-row gap-2.5 h-auto lg:h-[400px]">
              {PHASES.map((phase, idx) => {
                const Icon = phase.icon;
                const isActive = activeIdx === idx;

                return (
                  <motion.div
                    key={phase.number}
                    layout
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    transition={{
                      layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                    }}
                    className={`relative rounded-[30px] cursor-pointer overflow-hidden transition-colors duration-500 ${
                      isActive
                        ? "lg:flex-[3] bg-[#242424] text-white shadow-xl"
                        : "lg:flex-[1] bg-white/70 hover:bg-white text-[#242424] hover:shadow-md"
                    } p-6 sm:p-8 flex flex-col justify-between min-h-[220px] lg:min-h-0`}
                  >
                    {/* Active Card Dark Overlay Transition */}
                    <motion.div
                      className="absolute inset-0 bg-[#242424] pointer-events-none rounded-[30px]"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Top Row: Phase / Number & Process Dots */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <span
                          className={`transition-colors duration-300 ${
                            isActive ? "text-white/60" : "text-[#616161]"
                          }`}
                        >
                          Phase
                        </span>
                        <span
                          className={`font-semibold transition-colors duration-300 ${
                            isActive ? "text-white" : "text-[#242424]"
                          }`}
                        >
                          {phase.number}
                        </span>
                      </div>

                      {/* 4 Process Dots */}
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3].map((dotIdx) => {
                          const isDotActive = dotIdx === phase.dotIndex;
                          return (
                            <span
                              key={dotIdx}
                              className={`size-1.5 rounded-full transition-all duration-300 ${
                                isDotActive
                                  ? "bg-[#5dc39b] scale-125"
                                  : isActive
                                  ? "bg-white/30"
                                  : "bg-[#242424]/20"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-10">
                      <div
                        className={`size-10 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                          isActive
                            ? "bg-[#5dc39b] text-white"
                            : "bg-black/[0.05] text-[#242424]"
                        }`}
                      >
                        <Icon className="size-5 stroke-[2.2]" />
                      </div>

                      <h3
                        className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#242424]"
                        }`}
                      >
                        {phase.title}
                      </h3>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: 8 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 8 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="mt-3 text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed font-normal max-w-[420px]"
                          >
                            {phase.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 3: Pipeline Pace Statement & Dark 3-Column Features Card
           ======================================================== */}
        <div className="mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[900px]"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.18]">
              <span className="text-[#242424]">
                We operate at the pace of your pipeline,{" "}
              </span>
              <span className="text-[#8f8f8f] font-normal">
                not a project plan.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 rounded-[32px] sm:rounded-[40px] bg-[#242424] text-white p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 border border-white/[0.08] shadow-2xl"
          >
            <div>
              <div className="size-10 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-5 text-[#5dc39b]">
                <Activity className="size-5 stroke-[2.2]" />
              </div>
              <p className="text-sm sm:text-[14.5px] text-white/80 leading-relaxed font-normal">
                <strong className="text-white font-semibold block mb-1">
                  Performance Tracking.
                </strong>
                Real-time dashboards on every metric that matters. Monthly
                reports on pipeline health, revenue velocity, and ROI.
              </p>
            </div>

            <div>
              <div className="size-10 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-5 text-[#5dc39b]">
                <Sliders className="size-5 stroke-[2.2]" />
              </div>
              <p className="text-sm sm:text-[14.5px] text-white/80 leading-relaxed font-normal">
                <strong className="text-white font-semibold block mb-1">
                  Ongoing Optimization.
                </strong>
                Quarterly reviews to refine what&apos;s working and cut what
                isn&apos;t. Adjust positioning, retune pricing, scale the wins.
              </p>
            </div>

            <div>
              <div className="size-10 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-5 text-[#5dc39b]">
                <Headphones className="size-5 stroke-[2.2]" />
              </div>
              <p className="text-sm sm:text-[14.5px] text-white/80 leading-relaxed font-normal">
                <strong className="text-white font-semibold block mb-1">
                  Support &amp; Training.
                </strong>
                Train new hires on the playbooks, update processes, get answers
                when you need them.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
