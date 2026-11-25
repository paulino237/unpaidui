"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PixelPlay } from "@/components/logo";

const EASE = [0.4, 0, 0.2, 1] as const;

const METRICS = [
  { id: "quality", label: "Edit quality" },
  { id: "speed", label: "Render speed" },
  { id: "captions", label: "Caption accuracy" },
] as const;

type MetricId = (typeof METRICS)[number]["id"];

const GROUPS = [
  { id: "brand", label: "Pixelpush" },
  { id: "ai", label: "AI video tools" },
  { id: "suite", label: "Creative suites" },
  { id: "legacy", label: "Legacy editors" },
] as const;

type GroupId = (typeof GROUPS)[number]["id"];

const TOOLS: {
  id: string;
  name: string;
  group: GroupId;
  scores: Record<MetricId, number>;
}[] = [
  { id: "imovie", name: "iMovie", group: "legacy", scores: { quality: 44.2, speed: 38, captions: 30.5 } },
  { id: "capcut", name: "CapCut", group: "ai", scores: { quality: 55, speed: 62.4, captions: 68.2 } },
  { id: "finalcut", name: "Final Cut", group: "suite", scores: { quality: 60.3, speed: 58.1, captions: 50.1 } },
  { id: "premiere", name: "Premiere", group: "suite", scores: { quality: 64.1, speed: 55.3, captions: 54 } },
  { id: "descript", name: "Descript", group: "ai", scores: { quality: 67.5, speed: 70, captions: 80.3 } },
  { id: "davinci", name: "DaVinci", group: "suite", scores: { quality: 70.2, speed: 64.2, captions: 52.4 } },
  { id: "runway", name: "Runway", group: "ai", scores: { quality: 76.4, speed: 60.5, captions: 66.1 } },
  { id: "pixelpush", name: "Pixelpush", group: "brand", scores: { quality: 95.1, speed: 92.3, captions: 96.2 } },
];

const Y_TICKS = [25, 50, 75, 100];

function getGroupStyle(group: GroupId) {
  switch (group) {
    case "ai":
      return { fill: "bg-accent", value: "text-black/80", swatch: "bg-accent" };
    case "suite":
      return { fill: "bg-foreground", value: "text-background", swatch: "bg-foreground" };
    case "legacy":
      return { fill: "bg-muted-foreground/35", value: "text-foreground", swatch: "bg-muted-foreground/40" };
    case "brand":
      return { fill: "border-accent bg-background border-2", value: "text-foreground", swatch: "bg-accent" };
  }
}

export function BenchmarkSection() {
  const reduced = useReducedMotion();
  const [metric, setMetric] = useState<MetricId>("quality");
  const chartRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isAnimated = inView || reduced;

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border border-x border-t">
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: reduced ? {} : { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="px-6 pt-16 pb-12 text-center sm:pt-20"
        >
          <motion.p
            variants={itemVariant}
            className="text-accent flex items-center justify-center gap-2 font-mono text-xs tracking-tight"
          >
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Proven performance
          </motion.p>
          <motion.h2
            variants={itemVariant}
            className="text-foreground mx-auto mt-5 mb-10 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Unrivaled quality across complex edits
          </motion.h2>
        </motion.div>
      </div>

      <div className="border-border grid border lg:grid-cols-[240px_1fr]">
        <aside className="border-border flex flex-col justify-between gap-10 border-b p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div>
            <p className="text-foreground text-base font-medium tracking-tight">Benchmark</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {GROUPS.map((g) => (
                <li key={g.id} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className={`h-3 w-3 shrink-0 ${getGroupStyle(g.id).swatch}`} />
                  <span className="text-muted-foreground font-mono text-xs tracking-tight">
                    {g.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-row gap-5 lg:flex-col lg:gap-3">
            {METRICS.map((m) => {
              const active = m.id === metric;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => setMetric(m.id)}
                    aria-pressed={active}
                    className={`focus-ring text-sm tracking-tight transition-colors ${
                      active
                        ? "text-foreground font-medium underline underline-offset-4"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="overflow-x-auto p-5 sm:p-8 pt-12!">
          <div className="min-w-[600px]">
            <div className="flex">
              <div className="relative h-[340px] w-8 shrink-0 sm:h-[420px]">
                {Y_TICKS.map((tick) => (
                  <span
                    key={tick}
                    className="text-muted-foreground absolute -translate-y-1/2 font-mono text-[10px]"
                    style={{ bottom: `${tick}%`, left: 0 }}
                  >
                    {tick}
                  </span>
                ))}
              </div>

              <div ref={chartRef} className="relative h-[340px] flex-1 sm:h-[420px]">
                <div aria-hidden="true" className="absolute inset-0">
                  {Y_TICKS.map((tick) => (
                    <span
                      key={tick}
                      className="border-border absolute inset-x-0 border-t border-dashed"
                      style={{ bottom: `${tick}%` }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex items-end gap-2 sm:gap-3">
                  {TOOLS.map((tool, index) => {
                    const score = tool.scores[metric];
                    const style = getGroupStyle(tool.group);
                    return (
                      <div key={tool.id} className="relative flex h-full flex-1 items-end">
                        <motion.div
                          className={`relative w-full ${style.fill}`}
                          initial={{ height: "0%" }}
                          animate={{ height: isAnimated ? `${score}%` : "0%" }}
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { duration: 0.8, ease: EASE, delay: 0.05 * index }
                          }
                        >
                          {tool.group === "brand" && (
                            <span className="bg-foreground text-background absolute top-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center">
                              <PixelPlay className="h-4 w-4" />
                            </span>
                          )}
                          <span
                            className={`absolute inset-x-0 bottom-2 text-center font-mono text-[11px] font-medium ${style.value}`}
                          >
                            {score.toFixed(1)}
                          </span>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-8 shrink-0" />
              <div className="flex flex-1 gap-2 sm:gap-3">
                {TOOLS.map((tool) => (
                  <span
                    key={tool.id}
                    className={`flex-1 pt-3 text-center font-mono text-[11px] leading-tight tracking-tight ${
                      tool.group === "brand" ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
