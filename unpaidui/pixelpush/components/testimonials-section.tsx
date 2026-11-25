"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PixelIcon } from "@/components/pixel-icon";

const EASE = [0.4, 0, 0.2, 1] as const;

const AVATAR_CLIP =
  "polygon(0 24px, 8px 24px, 8px 16px, 16px 16px, 16px 8px, 24px 8px, 24px 0, calc(100% - 24px) 0, calc(100% - 24px) 8px, calc(100% - 16px) 8px, calc(100% - 16px) 16px, calc(100% - 8px) 16px, calc(100% - 8px) 24px, 100% 24px, 100% calc(100% - 24px), calc(100% - 8px) calc(100% - 24px), calc(100% - 8px) calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) calc(100% - 8px), calc(100% - 24px) calc(100% - 8px), calc(100% - 24px) 100%, 24px 100%, 24px calc(100% - 8px), 16px calc(100% - 8px), 16px calc(100% - 16px), 8px calc(100% - 16px), 8px calc(100% - 24px), 0 calc(100% - 24px))";

const PIXEL_STRIP_BG =
  "repeating-linear-gradient(45deg, transparent, transparent 2px, color-mix(in srgb, var(--border) 40%, transparent) 2px, color-mix(in srgb, var(--border) 40%, transparent) 4px)";

const TESTIMONIALS = [
  {
    quote: "Pixelpush cut our turnaround from days to hours. It's like magic.",
    name: "Maya Chen",
    role: "Content Lead",
    company: "Reel Co",
    avatar: "https://i.pravatar.cc/160?img=5",
  },
  {
    quote: "The auto-captions are scary good. Fifty languages, frame-accurate, and zero cleanup before we publish.",
    name: "Diego Santos",
    role: "Head of Video",
    company: "Loop Media",
    avatar: "https://i.pravatar.cc/160?img=12",
  },
  {
    quote: "We replaced three tools with Pixelpush. The whole team edits in plain language now, no timeline wrangling.",
    name: "Aisha Patel",
    role: "Creative Director",
    company: "Studio Nine",
    avatar: "https://i.pravatar.cc/160?img=45",
  },
  {
    quote: "Generating B-roll straight onto the timeline is a game changer. We ship twice the content in half the time.",
    name: "Liam O'Connor",
    role: "Producer",
    company: "Frame Forge",
    avatar: "https://i.pravatar.cc/160?img=15",
  },
  {
    quote: "Onboarding took ten minutes and our editors never looked back. Pixelpush feels like it reads my mind.",
    name: "Yuki Tanaka",
    role: "Creator",
    company: "Channel Yuki",
    avatar: "https://i.pravatar.cc/160?img=33",
  },
];

function PixelAvatar({
  src,
  alt,
  active,
  isDark,
}: {
  src: string;
  alt: string;
  active: boolean;
  isDark: boolean;
}) {
  return (
    <span
      className="bg-background relative block aspect-square w-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-0.5"
      style={{ clipPath: AVATAR_CLIP, WebkitClipPath: AVATAR_CLIP }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover grayscale transition-all duration-500 ${
          active
            ? isDark
              ? "opacity-100 brightness-90 contrast-110"
              : "opacity-100 brightness-105 contrast-95"
            : "opacity-45"
        }`}
      />
      {active && (
        <span
          aria-hidden="true"
          className={`bg-accent absolute inset-0 mix-blend-multiply ${isDark ? "" : "opacity-30"}`}
        />
      )}
    </span>
  );
}

function ProgressBar({ reduced }: { reduced: boolean | null }) {
  if (reduced) {
    return <span className="bg-accent absolute inset-0" />;
  }
  return (
    <motion.span
      className="bg-accent absolute inset-0 origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 10, ease: "linear" }}
    />
  );
}

export function TestimonialsSection() {
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isDark =
    mounted && typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const [active, setActive] = useState(0);

  const advance = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length);

  useEffect(() => {
    if (!reduced) return;
    const id = setTimeout(advance, 10000);
    return () => clearTimeout(id);
  }, [active, reduced]);

  const current = TESTIMONIALS[active];
  if (!current) return null;

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border relative overflow-hidden border">
        {!reduced && (
          <motion.span
            key={active}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            onAnimationComplete={advance}
          />
        )}

        <PixelIcon
          name="quote"
          className="text-accent absolute top-6 left-6 h-9 w-9 sm:top-8 sm:left-8"
        />
        <PixelIcon
          name="quote"
          className="text-accent absolute right-6 bottom-6 hidden h-9 w-9 rotate-180 sm:right-8 sm:bottom-8 sm:block"
        />

        <div className="px-6 pt-14 pb-8 text-center sm:px-10 sm:pt-16 sm:pb-12">
          <span className="text-accent inline-flex items-center justify-center gap-2 font-mono text-xs tracking-tight">
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Loved by video teams everywhere
          </span>

          <div className="mx-auto mt-8 hidden min-h-[170px] max-w-3xl items-center justify-center sm:flex">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={active}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-foreground text-balance text-2xl leading-snug font-semibold tracking-tight sm:text-3xl lg:text-[2rem]"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: reduced ? {} : { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="border-border hidden gap-x-4 gap-y-10 border-t px-6 py-10 sm:grid sm:grid-cols-3 sm:px-10 lg:grid-cols-5"
          style={{ backgroundImage: PIXEL_STRIP_BG }}
        >
          {TESTIMONIALS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <motion.div
                key={item.name}
                variants={itemVariant}
                className="flex flex-col items-center text-center"
              >
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-pressed={isActive}
                  className="focus-ring group w-full max-w-[160px]"
                >
                  <PixelAvatar src={item.avatar} alt={item.name} active={isActive} isDark={isDark} />
                  <span className="bg-border relative mt-4 block h-px w-full overflow-hidden">
                    {isActive && <ProgressBar reduced={reduced} />}
                  </span>
                </button>
                <span className="text-foreground mt-4 font-mono text-sm font-semibold tracking-tight">
                  {item.company}
                </span>
                <span
                  className={`mt-2 text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-muted-foreground text-sm">{item.role}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <div
          className="border-border border-t px-6 py-10 sm:hidden"
          style={{ backgroundImage: PIXEL_STRIP_BG }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-28">
                <PixelAvatar src={current.avatar} alt={current.name} active isDark={isDark} />
              </div>
              <blockquote className="text-foreground mt-6 text-balance text-lg leading-snug font-semibold tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <span className="text-foreground mt-6 font-mono text-sm font-semibold tracking-tight">
                {current.company}
              </span>
              <span className="text-foreground mt-2 text-sm font-medium">{current.name}</span>
              <span className="text-muted-foreground text-sm">{current.role}</span>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-1.5">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={idx === active}
                className="bg-border relative h-1 flex-1 overflow-hidden"
              >
                {idx === active && <ProgressBar reduced={reduced} />}
                {idx < active && <span className="bg-accent/40 absolute inset-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
