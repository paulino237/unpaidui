"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  CheckCircle2,
  Loader2,
  Calendar,
  Terminal,
  TrendingUp,
} from "lucide-react";

const FEATURE_STEPS = [
  {
    id: 0,
    title: "Ask Your AI Agent Directly",
    description:
      "Speak or type your command—let SkyAgent capture your intent. Your request instantly sets the process in motion.",
  },
  {
    id: 1,
    title: "Let SkyAgent Process It",
    description:
      "We prioritize the needs and preferences of our users in our design process.",
  },
  {
    id: 2,
    title: "Receive Instant, Actionable Results",
    description:
      "Our features seamlessly integrate with your existing systems for a smooth experience.",
  },
  {
    id: 3,
    title: "Continuous Improvement",
    description:
      "We are constantly updating and improving our features to provide the best experience.",
  },
];

const CYCLE_DURATION = 5000;

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURE_STEPS.length);
    }, CYCLE_DURATION);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center gap-5 w-full relative"
    >
      {/* Section Header */}
      <div className="border-b border-border w-full p-10 md:p-14">
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance text-primary">
            Simple. Seamless. Smart.
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium text-sm sm:text-base">
            Discover how SkyAgent transforms your commands into action in four
            easy steps
          </p>
        </div>
      </div>

      {/* Main Interactive Showcase */}
      <div className="w-full lg:h-[460px] flex items-center justify-center py-8 lg:py-0">
        <div className="w-full">
          <div className="flex w-full flex-col items-center justify-center max-w-7xl mx-auto">
            <div className="grid h-full grid-cols-5 gap-x-10 px-8 md:px-20 items-center w-full">
              {/* Left 2 Columns: Desktop Vertical Accordion */}
              <div className="col-span-2 w-full h-full hidden lg:flex md:items-center justify-start">
                <div className="w-full flex flex-col gap-5">
                  {FEATURE_STEPS.map((step, idx) => {
                    const isOpen = activeIndex === idx;
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveIndex(idx)}
                        data-state={isOpen ? "open" : "closed"}
                        className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                          isOpen
                            ? "bg-white dark:bg-[#27272A] rounded-lg shadow-[0px_0px_1px_0px_rgba(0,0,0,0.16),0px_1px_2px_-0.5px_rgba(0,0,0,0.16)] dark:shadow-[0px_0px_0px_1px_rgba(249,250,251,0.06),0px_0px_0px_1px_#27272A,0px_1px_2px_-0.5px_rgba(0,0,0,0.24),0px_2px_4px_-1px_rgba(0,0,0,0.24)]"
                            : "rounded-none border-0 opacity-70 hover:opacity-100"
                        }`}
                      >
                        {/* Bottom Progress Bar */}
                        <div
                          className={`absolute overflow-hidden rounded-lg transition-opacity bg-neutral-300/50 dark:bg-neutral-300/20 left-0 right-0 bottom-0 h-0.5 w-full ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {isOpen && (
                            <motion.div
                              key={`progress-${activeIndex}`}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{
                                duration: CYCLE_DURATION / 1000,
                                ease: "linear",
                              }}
                              className="h-full bg-secondary"
                            />
                          )}
                        </div>

                        <h3 className="flex">
                          <button
                            type="button"
                            className="flex h-[45px] flex-1 cursor-pointer items-center justify-between px-4 py-3 outline-none font-semibold text-base sm:text-lg tracking-tight text-left text-primary"
                          >
                            {step.title}
                          </button>
                        </h3>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-4 text-sm text-muted-foreground font-medium leading-relaxed">
                                {step.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 3 Columns: Interactive Preview Frame */}
              <div className="col-span-5 lg:col-span-3 h-[350px] min-h-[260px] w-full">
                <div className="h-full w-full rounded-xl border border-border bg-card/80 dark:bg-[#18181b] p-6 relative overflow-hidden flex items-center justify-center shadow-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />

                  <AnimatePresence mode="wait">
                    {activeIndex === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md flex flex-col gap-4 z-10"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                          <Terminal className="size-3.5 text-secondary" />
                          <span>COMMAND PROMPT</span>
                        </div>
                        <div className="rounded-xl border border-border bg-background p-4 shadow-sm flex items-center justify-between gap-3">
                          <span className="text-sm text-primary font-medium">
                            &ldquo;Schedule Q4 roadmap review with engineering
                            and send prep doc&rdquo;
                          </span>
                          <div className="size-8 rounded-lg bg-secondary text-white flex items-center justify-center shrink-0">
                            <Send className="size-4" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-accent border border-border text-muted-foreground">
                            @engineering
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-accent border border-border text-muted-foreground">
                            Notion Doc
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-accent border border-border text-muted-foreground">
                            Google Calendar
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeIndex === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md flex flex-col gap-3 z-10"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-1">
                          <Loader2 className="size-3.5 animate-spin" />
                          <span>AGENT REASONING...</span>
                        </div>
                        {[
                          "Analyzing 6 team calendars for open slots",
                          "Generating Q4 roadmap summary from Linear",
                          "Preparing invite & Slack notification",
                        ].map((task, i) => (
                          <div
                            key={task}
                            className="rounded-lg border border-border bg-background px-4 py-3 flex items-center justify-between text-xs sm:text-sm text-primary"
                          >
                            <span>{task}</span>
                            <CheckCircle2
                              className={`size-4 ${
                                i < 2
                                  ? "text-emerald-500"
                                  : "text-secondary animate-pulse"
                              }`}
                            />
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeIndex === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md rounded-xl border border-border bg-background p-5 shadow-md z-10 flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                              <Calendar className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-primary">
                                Q4 Roadmap Review
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Thursday, 2:00 PM – 3:00 PM
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                            Confirmed
                          </span>
                        </div>
                        <div className="border-t border-border pt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>6 attendees accepted</span>
                          <span className="text-secondary font-medium">
                            Prep doc attached
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeIndex === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md flex flex-col gap-4 z-10"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                          <TrendingUp className="size-3.5 text-secondary" />
                          <span>CONTINUOUS OPTIMIZATION</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-border bg-background p-4">
                            <p className="text-xs text-muted-foreground">
                              Workflow Accuracy
                            </p>
                            <p className="text-2xl font-semibold text-primary mt-1">
                              99.4%
                            </p>
                          </div>
                          <div className="rounded-xl border border-border bg-background p-4">
                            <p className="text-xs text-muted-foreground">
                              Time Saved / Week
                            </p>
                            <p className="text-2xl font-semibold text-secondary mt-1">
                              14.2 hrs
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile Horizontal Snap Carousel */}
            <div className="col-span-5 flex lg:hidden w-full overflow-x-auto gap-4 px-8 pt-6 pb-2 snap-x snap-mandatory">
              {FEATURE_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`snap-center shrink-0 w-64 text-left p-4 rounded-xl border transition-all ${
                    activeIndex === idx
                      ? "bg-white dark:bg-[#27272A] border-secondary shadow-sm"
                      : "bg-background border-border opacity-70"
                  }`}
                >
                  <h3 className="text-base font-semibold text-primary">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
