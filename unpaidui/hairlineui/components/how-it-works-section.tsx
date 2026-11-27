"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TextMorph } from "./text-morph";
import { NumberRoll } from "./number-roll";
import { Check } from "lucide-react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(REDUCED_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

function useStepTimer(intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const isReduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || isReduced) return;
    const timer = window.setInterval(() => setStep((s) => s + 1), intervalMs);
    return () => window.clearInterval(timer);
  }, [inView, isReduced, intervalMs]);

  return [ref, step] as const;
}

const TEMPLATES = [
  { slug: "inlay", name: "Inlay" },
  { slug: "tessera", name: "Tessera" },
  { slug: "turnout", name: "Turnout" },
];

const SCREENS = [
  { label: "Desktop", width: 1440, frame: 88 },
  { label: "Tablet", width: 768, frame: 56 },
  { label: "Phone", width: 390, frame: 30 },
];

const BRANDS = [
  { name: "Acme", hex: "#305dde", color: "var(--chart-1)" },
  { name: "Northwind", hex: "#1baf7a", color: "var(--chart-3)" },
  { name: "Yours", hex: "#e8743b", color: "var(--chart-2)" },
];

function ScenePickDirection() {
  const [ref, step] = useStepTimer(2800);
  const curIdx = step % TEMPLATES.length;

  return (
    <div
      ref={ref}
      className="relative aspect-[5/4] overflow-hidden plate-corners-sm bg-surface shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)] bg-[radial-gradient(circle,color-mix(in_srgb,var(--ink)_8%,transparent)_1px,transparent_1px)] bg-[length:14px_14px]"
    >
      <div className="absolute inset-x-[11%] top-[15%] bottom-[22%]">
        {TEMPLATES.map((tmpl, i) => {
          const offset = (i - curIdx + TEMPLATES.length) % TEMPLATES.length;
          return (
            <div
              key={tmpl.slug}
              className="absolute inset-0 overflow-hidden rounded-[12px] bg-surface shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.08)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(${-15 * offset}px) scale(${1 - 0.06 * offset})`,
                opacity: offset === 2 ? 0.55 : 1,
                zIndex: 3 - offset,
              }}
            >
              <img
                src={`/previews/card/${tmpl.slug}.webp`}
                alt=""
                className="size-full object-cover object-top"
                loading="lazy"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-[7%] flex justify-center">
        <span className="inline-flex h-7 items-center gap-2 rounded-full bg-surface pl-2.5 pr-3 text-[12.5px] font-medium text-ink shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
          <span className="size-1.5 rounded-full bg-primary" />
          <TextMorph>{TEMPLATES[curIdx].name}</TextMorph>
        </span>
      </div>
    </div>
  );
}

function SceneScreenSwitcher() {
  const [ref, step] = useStepTimer(2400);
  const curIdx = step % SCREENS.length;
  const activeScreen = SCREENS[curIdx];
  const isPhone = activeScreen.label === "Phone";

  return (
    <div
      ref={ref}
      className="relative aspect-[5/4] overflow-hidden plate-corners-sm bg-surface shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)] bg-[radial-gradient(circle,color-mix(in_srgb,var(--ink)_8%,transparent)_1px,transparent_1px)] bg-[length:14px_14px]"
    >
      <div className="absolute inset-x-0 top-[8%] flex justify-center">
        <div className="relative grid grid-cols-3 rounded-full bg-surface p-[3px] text-[11.5px] font-medium shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
          <span
            aria-hidden={true}
            className="absolute inset-y-[3px] left-[3px] w-[calc((100%-6px)/3)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
            style={{ transform: `translateX(${100 * curIdx}%)` }}
          />
          {SCREENS.map((s, idx) => (
            <span
              key={s.label}
              className={`relative z-10 px-3 py-1 text-center transition-colors duration-300 ${
                idx === curIdx ? "text-surface" : "text-ink-6"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-[14%] left-1/2 top-[24%] -translate-x-1/2 overflow-hidden rounded-[10px] bg-surface shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.1)] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: `${activeScreen.frame}%` }}
      >
        <img
          src="/previews/card/inlay.webp"
          alt=""
          className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${
            isPhone ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
          draggable={false}
        />
        <img
          src="/previews/mobile/inlay.jpg"
          alt=""
          className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${
            isPhone ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="absolute inset-x-0 bottom-[4.5%] flex justify-center font-mono text-[11px] text-primary tabular-nums">
        <NumberRoll value={activeScreen.width} duration={700} />
        <span className="ml-1 text-ink-7">px</span>
      </div>
    </div>
  );
}

function SceneConfigDeploy() {
  const [ref, step] = useStepTimer(1300);
  const phaseIdx = step % 3;
  const brand = BRANDS[Math.floor(step / 3) % BRANDS.length];
  const status = phaseIdx === 0 ? "idle" : phaseIdx === 1 ? "busy" : "done";

  return (
    <div
      ref={ref}
      className="relative aspect-[5/4] overflow-hidden plate-corners-sm bg-surface shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)] bg-[radial-gradient(circle,color-mix(in_srgb,var(--ink)_8%,transparent)_1px,transparent_1px)] bg-[length:14px_14px]"
    >
      <div className="absolute inset-x-[9%] top-[12%] overflow-hidden rounded-[12px] bg-surface font-mono text-[11.5px] leading-[1.9] shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
        <div className="flex items-center justify-between border-b border-edge/[0.06] px-3.5 py-1.5 text-[10.5px] text-ink-7">
          <span>site.config.ts</span>
          <span className="size-1.5 rounded-full bg-ink-10" />
        </div>
        <div className="px-3.5 py-2.5 text-ink-3">
          <p>
            <span className="text-primary">export const</span> site = {"{"}
          </p>
          <p className="pl-4">
            brand:{" "}
            <span className="text-ink">
              &quot;<TextMorph>{brand.name}</TextMorph>&quot;
            </span>
            ,
          </p>
          <p className="flex items-center pl-4">
            accent:{" "}
            <span className="ml-1 text-ink">
              &quot;<TextMorph>{brand.hex}</TextMorph>&quot;
            </span>
            <span
              className="ml-2 size-2.5 rounded-full transition-colors duration-500"
              style={{ background: brand.color }}
            />
          </p>
          <p className="pl-4">
            cta: <span className="text-ink">&quot;Start free&quot;</span>,
          </p>
          <p>{"};"}</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[11%] flex justify-center">
        <span
          className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors duration-500 ${
            status === "done"
              ? "bg-emerald-600 text-white"
              : "bg-ink text-surface"
          }`}
        >
          <span
            className={`grid place-items-center overflow-hidden transition-[width,opacity] duration-500 ${
              status === "idle" ? "w-0 opacity-0" : "w-3.5 opacity-100"
            }`}
          >
            {status === "busy" ? (
              <span className="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
            ) : (
              <Check className="size-3.5" strokeWidth={3} />
            )}
          </span>
          <TextMorph>
            {status === "idle" ? "Deploy" : status === "busy" ? "Deploying" : "Live"}
          </TextMorph>
        </span>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2
            id="how-it-works-title"
            className="home-module__06co2W__fade text-balance text-[clamp(31px,4.3vw,46px)] font-medium leading-[1.08] tracking-[-0.035em] text-ink"
          >
            From live demo to deployed <span className="text-ink-6">in an afternoon.</span>
          </h2>
          <p
            className="home-module__06co2W__fade mt-5 max-w-[36rem] text-pretty text-[17px] leading-[1.6] text-ink-5 sm:text-[18px]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Try any template live, make it yours in one file, and ship it the same day.
          </p>
        </header>

        <div className="mt-12 sm:mt-16">
          <ol className="m-0 grid list-none gap-3 p-0 sm:gap-4 md:grid-cols-3">
            <li
              className="home-module__06co2W__fade plate-corners bg-surface-2 flex flex-col p-2"
              style={{ "--delay": "0ms" } as React.CSSProperties}
            >
              <ScenePickDirection />
              <div className="px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <h3 className="flex items-baseline gap-2.5 text-[17px] font-medium tracking-[-0.015em] text-ink">
                  <span className="font-mono text-[12.5px] tracking-normal text-ink-7">01</span>
                  Pick a direction
                </h3>
                <p className="mt-2 text-pretty text-[15.5px] leading-[1.6] text-ink-5">
                  Every template is a complete, original site: its own concept, copy and motion, not a theme with a new colour.
                </p>
              </div>
            </li>

            <li
              className="home-module__06co2W__fade plate-corners bg-surface-2 flex flex-col p-2"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              <SceneScreenSwitcher />
              <div className="px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <h3 className="flex items-baseline gap-2.5 text-[17px] font-medium tracking-[-0.015em] text-ink">
                  <span className="font-mono text-[12.5px] tracking-normal text-ink-7">02</span>
                  Try it on every screen
                </h3>
                <p className="mt-2 text-pretty text-[15.5px] leading-[1.6] text-ink-5">
                  Each demo runs as a real build. Switch between desktop, tablet and phone before you spend a cent.
                </p>
              </div>
            </li>

            <li
              className="home-module__06co2W__fade plate-corners bg-surface-2 flex flex-col p-2"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              <SceneConfigDeploy />
              <div className="px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <h3 className="flex items-baseline gap-2.5 text-[17px] font-medium tracking-[-0.015em] text-ink">
                  <span className="font-mono text-[12.5px] tracking-normal text-ink-7">03</span>
                  Make it yours, then ship
                </h3>
                <p className="mt-2 text-pretty text-[15.5px] leading-[1.6] text-ink-5">
                  Words, links, prices and colours live in one config file. Change them, deploy anywhere Next.js runs.
                </p>
              </div>
            </li>
          </ol>

          <div className="mt-12 flex flex-col items-center gap-5 sm:mt-14">
            <p className="text-[14px] text-ink-6">What you’ll be editing</p>
            <ul aria-label="Built with" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              <li className="stack-item flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-ink-5 [--icon-on:var(--surface)]" style={{ "--brand": "var(--ink)" } as React.CSSProperties}>
                <svg viewBox="0 0 24 24" className="size-[17px]" aria-hidden={true}><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M9.4 7.6v8.8H8V7.6h1.4Zm0 0 7.3 10.1a10 10 0 0 1-1.1.8L9.4 9.9V7.6Z" fill="var(--icon-on, #fff)"/><path d="M15.9 7.6v6.8h-1.4V7.6h1.4Z" fill="var(--icon-on, #fff)"/></svg>
                Next.js
              </li>
              <li className="stack-item flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-ink-5 [--icon-on:var(--surface)]" style={{ "--brand": "#149eca" } as React.CSSProperties}>
                <svg viewBox="0 0 24 24" className="size-[17px]" aria-hidden={true} fill="none" stroke="currentColor" strokeWidth="1.15"><ellipse cx="12" cy="12" rx="10.4" ry="4.05"/><ellipse cx="12" cy="12" rx="10.4" ry="4.05" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.4" ry="4.05" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.95" fill="currentColor" stroke="none"/></svg>
                React
              </li>
              <li className="stack-item flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-ink-5 [--icon-on:var(--surface)]" style={{ "--brand": "#38bdf8" } as React.CSSProperties}>
                <svg viewBox="0 0 24 24" className="size-[17px]" aria-hidden={true} fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.48 6 12 6ZM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.48 12 7 12Z"/></svg>
                Tailwind CSS
              </li>
              <li className="stack-item flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-ink-5 [--icon-on:var(--surface)]" style={{ "--brand": "#3178c6" } as React.CSSProperties}>
                <svg viewBox="0 0 24 24" className="size-[17px]" aria-hidden={true}><rect width="24" height="24" rx="4" fill="currentColor"/><path d="M7.4 17.5v-7.3h2.6v7.3H7.4Zm0-8.7V6.6h2.6v2.2H7.4Zm8.3 8.8a5 5 0 0 1-2.1-.4 3.7 3.7 0 0 1-1.4-1.2 3.8 3.8 0 0 1-.5-2.1h2.2a2 2 0 0 0 .7 1.4 2.2 2.2 0 0 0 1.5.5c.5 0 .9-.1 1.2-.3a1 1 0 0 0 .5-.9c0-.3-.1-.6-.4-.8a4 4 0 0 0-1.2-.6l-1.3-.4a4 4 0 0 1-2-1.3 3.1 3.1 0 0 1-.6-2 3.2 3.2 0 0 1 .6-2 3.6 3.6 0 0 1 1.6-1.3 5.4 5.4 0 0 1 2.2-.4 5.3 5.3 0 0 1 2.1.4 3.6 3.6 0 0 1 1.5 1.1 3.5 3.5 0 0 1 .5 2h-2.2a2 2 0 0 0-.6-1.3 2 2 0 0 0-1.4-.4c-.5 0-.9.1-1.2.3a1 1 0 0 0-.4.8c0 .3.1.5.3.7.3.2.7.4 1.2.5l1.4.4a4.4 4.4 0 0 1 2.1 1.4c.5.5.7 1.2.7 2a3.3 3.3 0 0 1-.6 2.1 3.7 3.7 0 0 1-1.7 1.3 5.9 5.9 0 0 1-2.4.4Z" fill="var(--icon-on, #fff)"/></svg>
                TypeScript
              </li>
              <li className="stack-item flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-ink-5 [--icon-on:var(--surface)]" style={{ "--brand": "var(--ink)" } as React.CSSProperties}>
                <svg viewBox="0 0 256 256" className="size-[17px]" aria-hidden={true} fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round"><line x1="208" y1="128" x2="128" y2="208"/><line x1="192" y1="40" x2="40" y2="192"/></svg>
                shadcn/ui
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
