"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PixelButton } from "@/components/pixel-button";
import { PixelIcon } from "@/components/pixel-icon";

const EASE = [0.4, 0, 0.2, 1] as const;

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function FeatureVisual({ src }: { src: string }) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isDark =
    mounted && typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: isDark ? "#0a0a0a" : "#ffffff" }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className={`h-full w-full object-cover grayscale ${
          isDark ? "brightness-90 contrast-110" : "brightness-105 contrast-95"
        }`}
      />
      <span
        aria-hidden="true"
        className={`bg-accent absolute inset-0 mix-blend-multiply ${isDark ? "" : "opacity-30"}`}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(120% 120% at 50% 30%, transparent 40%, rgba(0,0,0,0.55) 100%)"
            : "radial-gradient(120% 120% at 50% 35%, transparent 55%, rgba(255,255,255,0.4) 100%)",
        }}
      />
    </div>
  );
}

function VisualSlider({
  items,
  index,
}: {
  items: React.ReactNode[];
  index: number;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [displayedIndex, setDisplayedIndex] = useState(index);
  const prevIndex = useRef(index);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = useReducedMotion();

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const scheduleTimeout = (cb: () => void, delay: number) => {
    const id = setTimeout(cb, delay);
    timeouts.current.push(id);
    return id;
  };

  useEffect(() => {
    if (prevIndex.current === index) return;
    if (reduced) {
      prevIndex.current = index;
      setDisplayedIndex(index);
      return;
    }

    const grid = gridRef.current;
    const cells = grid ? (Array.from(grid.children) as HTMLElement[]) : [];
    const count = cells.length;
    if (count === 0) {
      prevIndex.current = index;
      setDisplayedIndex(index);
      return;
    }

    clearTimeouts();
    const interval = 350 / count;
    const shuffled = shuffle([...Array(count).keys()]);

    shuffled.forEach((cellIdx, i) => {
      scheduleTimeout(() => {
        const cell = cells[cellIdx];
        if (cell) cell.style.opacity = "1";
      }, i * interval);
    });

    scheduleTimeout(() => {
      prevIndex.current = index;
      setDisplayedIndex(index);
      shuffled.forEach((cellIdx, i) => {
        scheduleTimeout(() => {
          const cell = cells[cellIdx];
          if (cell) cell.style.opacity = "0";
        }, i * interval);
      });
    }, 350);

    return () => clearTimeouts();
  }, [index, reduced]);

  return (
    <div className="absolute inset-0">
      {items.map((item, i) => (
        <div
          key={i}
          aria-hidden={i !== displayedIndex}
          className="absolute inset-0 transition-opacity"
          style={{ opacity: i === displayedIndex ? 1 : 0 }}
        >
          {item}
        </div>
      ))}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(14, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
        }}
      >
        {Array.from({ length: 140 }).map((_, i) => (
          <div
            key={i}
            className="bg-accent opacity-0 transition-opacity duration-150"
            style={{ willChange: "opacity" }}
          />
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Edit in plain language",
    desc: "Describe the change you want and Pixelpush rebuilds the timeline in seconds, no scrubbing required.",
    visual: (
      <FeatureVisual src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80" />
    ),
  },
  {
    title: "Caption in 50+ languages",
    desc: "Frame-accurate subtitles are generated automatically, ready to restyle and export anywhere.",
    visual: (
      <FeatureVisual src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=80" />
    ),
  },
  {
    title: "Generate B-roll instantly",
    desc: "Prompt for the shot you need and drop AI-generated footage straight onto the timeline.",
    visual: (
      <FeatureVisual src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80" />
    ),
  },
];

export function FeaturesSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const advance = () => setActive((prev) => (prev + 1) % FEATURES.length);

  useEffect(() => {
    if (!reduced) return;
    const t = setTimeout(advance, 10000);
    return () => clearTimeout(t);
  }, [active, reduced]);

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border overflow-hidden border">
        <div className="grid lg:grid-cols-2">
          <div className="border-border flex flex-col lg:border-r">
            <motion.div
              variants={
                reduced
                  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                  : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }
              }
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="border-border border-b px-6 py-10 sm:px-10 sm:py-12 lg:px-12"
            >
              <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                AI that{" "}
                <span className="inline-flex translate-y-0.5 items-center">
                  <PixelIcon name="scissors" className="text-accent h-7 w-7 sm:h-8 sm:w-8" />
                </span>{" "}
                cuts with you
              </h2>
              <div className="mt-7">
                <PixelButton href="#features" variant="solid">
                  See how it works
                </PixelButton>
              </div>
            </motion.div>

            <ul className="flex flex-col">
              {FEATURES.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <li key={item.title} className="border-border relative border-b last:border-b-0">
                    <span aria-hidden="true" className="bg-border absolute inset-y-0 left-0 w-px" />
                    {isActive &&
                      (reduced ? (
                        <span aria-hidden="true" className="bg-accent absolute inset-y-0 left-0 w-px" />
                      ) : (
                        <motion.span
                          aria-hidden="true"
                          className="bg-accent absolute inset-y-0 left-0 w-px origin-top"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 10, ease: "linear" }}
                          onAnimationComplete={advance}
                        />
                      ))}
                    <button
                      type="button"
                      onClick={() => setActive(idx)}
                      aria-expanded={isActive}
                      className="focus-ring block w-full px-6 py-5 text-left sm:px-10 lg:px-12"
                    >
                      <h3
                        className={`text-lg font-medium tracking-tight transition-colors ${
                          isActive ? "text-foreground" : "text-foreground/60"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="text-muted-foreground max-w-md pt-2 text-sm leading-relaxed text-pretty">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-muted/30 relative min-h-[340px] overflow-hidden sm:min-h-[460px]">
            <VisualSlider items={FEATURES.map((f) => f.visual)} index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
