"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { SkyAgentLogo } from "./skyagent-logo";
import { OrbitingCircles } from "./orbiting-circles";
import { OrbitIcons } from "./orbit-icons";

const FOURTH_BENTO_ITEMS = [
  { title: "Bento grid", className: "bg-secondary text-white" },
  { title: "Landing Page", className: "bg-secondary/40 text-white" },
  {
    title: "Add Task",
    className:
      "bg-secondary/20 border border-secondary border-dashed text-secondary",
  },
];

function FourthBentoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>([0, 90, 180]);

  const mouseX = useMotionValue(180);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        const step = Math.max(60, (rect.width - 260) / 2);
        setOffsets(Array.from({ length: 3 }, (_, idx) => idx * step));
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [mouseX]);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
        }
      }}
      onMouseLeave={() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          mouseX.set(rect.width / 2);
        }
      }}
      className="w-full h-full flex flex-col relative overflow-hidden"
    >
      {/* Background alternating grid ticks */}
      <div className="absolute inset-0 flex -z-10 [mask:linear-gradient(180deg,transparent,black_40%,black_40%,transparent)]">
        <div className="w-1/2 h-full flex items-start justify-between">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="w-px h-5 bg-primary/40 first:bg-transparent"
            />
          ))}
        </div>
        <div className="w-1/2 h-full border-x border-border/70 border-dashed flex items-start justify-between">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="w-px h-5 bg-primary/40 first:bg-transparent"
            />
          ))}
        </div>
        <div className="w-1/2 h-full flex items-start justify-between">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="w-px h-5 bg-primary/40 first:bg-transparent"
            />
          ))}
        </div>
        <div className="w-1/2 h-full border-x border-border/70 border-dashed flex items-start justify-between">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="w-px h-5 bg-primary/40 first:bg-transparent"
            />
          ))}
        </div>
      </div>

      {/* Days Header */}
      <div className="absolute top-4 left-0 right-0 flex justify-between max-w-md mx-auto px-8 text-sm text-muted-foreground">
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Mouse-tracking Vertical Line */}
      <motion.div
        style={{ x: smoothX, translateX: "-50%" }}
        className="absolute top-10 w-[2px] h-[calc(100%-80px)] bg-gradient-to-b from-primary dark:from-accent to-transparent z-10 pointer-events-none"
      />

      {/* Mouse-tracking 12:00 AM Pill */}
      <motion.div
        style={{ x: smoothX, translateX: "-50%" }}
        className="absolute top-14 bg-black dark:bg-accent h-6 z-20 flex items-center justify-center text-xs px-2.5 rounded-md shadow-[0px_2.2px_6.6px_0px_rgba(18,43,105,0.04),0px_1.1px_2.2px_0px_rgba(18,43,105,0.08),0px_0px_0px_1.1px_rgba(18,43,105,0.08),0px_1.1px_0px_0px_rgba(255,255,255,0.20)_inset] pointer-events-none"
      >
        <span className="text-white whitespace-nowrap">12:00 AM</span>
      </motion.div>

      {/* Staggered Task Bars */}
      <div className="w-full absolute grid gap-6 top-1/2 -translate-y-1/2 left-6 z-20 pointer-events-none">
        {FOURTH_BENTO_ITEMS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 120 }}
            whileInView={{ opacity: 1, x: offsets[idx] ?? idx * 70 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
              delay: 0.15 * idx,
            }}
            className={`flex items-center h-8 justify-center gap-2 rounded-lg w-[220px] sm:w-[240px] p-2 shadow-sm text-xs font-medium ${item.className}`}
          >
            <span>{item.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BentoSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="bento"
      className="flex flex-col items-center justify-center w-full relative px-5 md:px-10"
    >
      <div className="border-x border-border mx-5 md:mx-10 w-full relative">
        {/* Diagonal Hatch Left & Right Strips */}
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]" />
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]" />

        {/* Section Header */}
        <div className="border-b border-border w-full p-10 md:p-14">
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1 text-primary">
              Empower Your Workflow with AI
            </h2>
            <p className="text-muted-foreground text-center text-balance font-medium text-sm sm:text-base">
              Ask your AI Agent for real-time collaboration, seamless
              integrations, and actionable insights to streamline your
              operations.
            </p>
          </div>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* =====================================================
              CARD 1: Real-time AI Collaboration
             ===================================================== */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="flex flex-col items-start justify-end min-h-[420px] md:min-h-[440px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer"
          >
            <div className="relative flex size-full items-center justify-center h-[300px] overflow-hidden">
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20" />

              <div className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-end justify-end gap-3 w-full"
                >
                  <div className="max-w-[280px] bg-secondary text-white p-4 rounded-2xl rounded-br-sm ml-auto shadow-[0_4px_14px_rgba(59,130,246,0.25)]">
                    <p className="text-xs sm:text-sm leading-relaxed">
                      Hey, I need help scheduling a team meeting that works well
                      for everyone. Any suggestions for finding an optimal time
                      slot?
                    </p>
                  </div>
                  <div className="flex items-center bg-background rounded-full w-fit border border-border flex-shrink-0 overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/79.jpg"
                      alt="User Avatar"
                      className="size-8 rounded-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Agent Response */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start gap-3 w-full"
                >
                  <div className="flex items-center bg-background rounded-full size-9 flex-shrink-0 justify-center shadow-sm border border-border">
                    <SkyAgentLogo className="text-secondary size-4" />
                  </div>
                  <div className="bg-accent/80 backdrop-blur-sm p-4 rounded-2xl rounded-tl-sm border border-border max-w-[290px] transition-all duration-300">
                    {hoveredCard === 1 ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs sm:text-sm text-primary leading-relaxed"
                      >
                        Everyone is free{" "}
                        <span className="text-secondary font-semibold">
                          Tuesday at 2:00 PM
                        </span>
                        . I&apos;ve drafted the calendar invite—send now?
                      </motion.p>
                    ) : (
                      <div className="flex gap-1.5 py-1.5 px-1">
                        <span className="size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="size-2 bg-primary/40 rounded-full animate-bounce" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-6 pt-2">
              <h3 className="text-lg tracking-tighter font-semibold text-primary">
                Real-time AI Collaboration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Experience real-time assistance. Ask your AI Agent to coordinate
                tasks, answer questions, and maintain team alignment.
              </p>
            </div>
          </div>

          {/* =====================================================
              CARD 2: Seamless Integrations (Continuous Orbiting Circles)
             ===================================================== */}
          <div className="flex flex-col items-start justify-end min-h-[420px] md:min-h-[440px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer">
            <div className="relative flex size-full items-center justify-center h-[300px] overflow-hidden">
              {/* Top & bottom fade masks */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-40" />
              <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-40" />

              {/* Single shared container: hub + all orbiting rings share the same stacking context */}
              <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">

                {/* Center SkyAgent Hub — z-30 so icons orbit behind it */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-16 bg-secondary p-2 rounded-full z-30">
                  <SkyAgentLogo className="fill-white text-white size-10" />
                </div>

                <OrbitingCircles
                  index={0}
                  iconSize={60}
                  radius={100}
                  duration={14}
                  reverse
                  speed={1}
                >
                  <OrbitIcons.boat />
                  <OrbitIcons.supabase />
                  <OrbitIcons.figma />
                </OrbitingCircles>

                <OrbitingCircles
                  index={1}
                  iconSize={60}
                  radius={160}
                  duration={18}
                  speed={0.8}
                >
                  <OrbitIcons.workos />
                  <OrbitIcons.runwayml />
                  <OrbitIcons.gemini />
                </OrbitingCircles>

                <OrbitingCircles
                  index={2}
                  iconSize={60}
                  radius={230}
                  duration={22}
                  reverse
                  speed={0.8}
                >
                  <OrbitIcons.vercel />
                  <OrbitIcons.replit />
                  <OrbitIcons.posthog />
                </OrbitingCircles>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-6 pt-2">
              <h3 className="text-lg tracking-tighter font-semibold text-primary">
                Seamless Integrations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unite your favorite tools for effortless connectivity. Boost
                productivity through interconnected workflows.
              </p>
            </div>
          </div>

          {/* =====================================================
              CARD 3: Instant Insight Reporting
             ===================================================== */}
          <div
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="flex flex-col items-start justify-end min-h-[420px] md:min-h-[440px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer"
          >
            <div className="relative flex size-full items-center justify-center h-[300px] pt-8 overflow-hidden">
              <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-background to-transparent z-20" />

              {/* Metric Header */}
              <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tasks Automated
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary tabular-nums">
                    {hoveredCard === 3 ? "2,489" : "1,234"}
                  </span>
                  <span className="text-xs font-medium text-emerald-500">
                    +28.4%
                  </span>
                </div>
              </div>

              {/* Vertical Pulse Beam */}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[2px] h-28 bg-gradient-to-b from-secondary to-transparent z-10" />

              {/* Animated SVG Area Chart */}
              <svg
                width="600"
                height="200"
                viewBox="0 0 600 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full mt-12"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--secondary)"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--secondary)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  d="M 0 157 C 20,153 60,138 100,136 C 120,138 160,153 200,147 C 220,138 260,110 300,104 C 320,106 360,119 400,115 C 420,108 460,98 500,83 L 600 40 L 600,200 L 0,200 Z"
                  fill="url(#lineGradient)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d="M 0 157 C 20,153 60,138 100,136 C 120,138 160,153 200,147 C 220,138 260,110 300,104 C 320,106 360,119 400,115 C 420,108 460,98 500,83 L 600 40"
                  stroke="var(--secondary)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <motion.circle
                  cx="300"
                  cy="104"
                  r="5"
                  fill="var(--secondary)"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </svg>
            </div>

            <div className="flex flex-col gap-2 p-6 pt-2">
              <h3 className="text-lg tracking-tighter font-semibold text-primary">
                Instant Insight Reporting
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transform raw data into clear insights in seconds. Empower
                smarter decisions with real-time, always-learning intelligence.
              </p>
            </div>
          </div>

          {/* =====================================================
              CARD 4: Smart Automation (Exact FourthBentoAnimation)
             ===================================================== */}
          <div className="flex flex-col items-start justify-end min-h-[420px] md:min-h-[440px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer">
            <div className="relative flex size-full items-center justify-center h-[300px] overflow-hidden">
              <FourthBentoAnimation />
            </div>

            <div className="flex flex-col gap-2 p-6 pt-2">
              <h3 className="text-lg tracking-tighter font-semibold text-primary">
                Smart Automation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Set it, forget it. Your AI Agent tackles repetitive tasks so
                you can focus on strategy, innovation, and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
