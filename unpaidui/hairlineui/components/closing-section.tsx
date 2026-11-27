"use client";

import { useEffect, useRef } from "react";

const TEMPLATE_SLUGS = [
  "maquette", "rough", "fold", "houselight", "mordant", "weft", "keel", "lading",
  "wilco", "baton", "frank", "fleck", "unsent", "heckle", "plinth", "kilowatt",
  "fixate", "earshot", "loupe", "tender", "soak", "firstly", "cubby", "switchyard",
];

const ROW_0 = [
  "maquette", "rough", "fold", "houselight", "mordant", "weft", "keel", "lading",
  "maquette", "rough", "fold", "houselight", "mordant", "weft", "keel", "lading",
];
const ROW_1 = [
  "wilco", "baton", "frank", "fleck", "unsent", "heckle", "plinth", "kilowatt",
  "wilco", "baton", "frank", "fleck", "unsent", "heckle", "plinth", "kilowatt",
];
const ROW_2 = [
  "fixate", "earshot", "loupe", "tender", "soak", "firstly", "cubby", "switchyard",
  "fixate", "earshot", "loupe", "tender", "soak", "firstly", "cubby", "switchyard",
];

export function ClosingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId = 0;
    const updateScroll = () => {
      animId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      el.style.setProperty("--p", p.toFixed(4));
    };

    const handleScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section aria-labelledby="close-title" className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
      <div ref={containerRef} className="relative overflow-hidden plate-corners bg-surface-2">
        <div
          aria-hidden={true}
          className="absolute inset-[-20%] flex flex-col justify-center gap-4 [transform:rotate(-7deg)]"
        >
          {/* Row 0 */}
          <div
            className="flex w-max gap-4"
            style={{
              transform: "translateX(calc(-8% + (var(--p, 0.5) - 0.5) * -260px))",
            }}
          >
            {ROW_0.map((slug, i) => (
              <div
                key={`${slug}-${i}`}
                className="plate-corners-sm h-[150px] w-[240px] shrink-0 overflow-hidden bg-surface shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.06)] sm:h-[175px] sm:w-[280px]"
              >
                <img
                  src={`/previews/card/${slug}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-full object-cover object-top"
                />
              </div>
            ))}
          </div>

          {/* Row 1 */}
          <div
            className="flex w-max gap-4"
            style={{
              transform: "translateX(calc(-18% + (var(--p, 0.5) - 0.5) * 260px))",
            }}
          >
            {ROW_1.map((slug, i) => (
              <div
                key={`${slug}-${i}`}
                className="plate-corners-sm h-[150px] w-[240px] shrink-0 overflow-hidden bg-surface shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.06)] sm:h-[175px] sm:w-[280px]"
              >
                <img
                  src={`/previews/card/${slug}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-full object-cover object-top"
                />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div
            className="flex w-max gap-4"
            style={{
              transform: "translateX(calc(-8% + (var(--p, 0.5) - 0.5) * -260px))",
            }}
          >
            {ROW_2.map((slug, i) => (
              <div
                key={`${slug}-${i}`}
                className="plate-corners-sm h-[150px] w-[240px] shrink-0 overflow-hidden bg-surface shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.06)] sm:h-[175px] sm:w-[280px]"
              >
                <img
                  src={`/previews/card/${slug}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden={true}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 66% at 50% 50%, var(--surface-2) 42%, color-mix(in srgb, var(--surface-2) 90%, transparent) 60%, color-mix(in srgb, var(--surface-2) 35%, transparent) 90%)",
          }}
        />

        <div className="relative flex flex-col items-center px-6 py-24 text-center sm:py-32">
          <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden={true}>
            <defs>
              <linearGradient id="_R_fraulb_bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4b7cff" />
                <stop offset="1" stopColor="#1f3fbf" />
              </linearGradient>
              <linearGradient id="_R_fraulb_rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="0.45" stopColor="#fff" stopOpacity="0.05" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
              </linearGradient>
              <linearGradient id="_R_fraulb_tile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#d6e1ff" />
              </linearGradient>
            </defs>
            <path d="M32 1.5c13.6 0 21.4 0 25.9 4.6 4.6 4.5 4.6 12.3 4.6 25.9s0 21.4-4.6 25.9c-4.5 4.6-12.3 4.6-25.9 4.6s-21.4 0-25.9-4.6C1.5 53.4 1.5 45.6 1.5 32S1.5 10.6 6.1 6.1C10.6 1.5 18.4 1.5 32 1.5Z" fill="url(#_R_fraulb_bg)" />
            <path d="M32 1.5c13.6 0 21.4 0 25.9 4.6 4.6 4.5 4.6 12.3 4.6 25.9s0 21.4-4.6 25.9c-4.5 4.6-12.3 4.6-25.9 4.6s-21.4 0-25.9-4.6C1.5 53.4 1.5 45.6 1.5 32S1.5 10.6 6.1 6.1C10.6 1.5 18.4 1.5 32 1.5Z" transform="translate(32 32) scale(.975) translate(-32 -32)" fill="none" stroke="url(#_R_fraulb_rim)" strokeWidth="1.4" />
            <path d="M16.5 7.5H21.2Q22.4 7.5 22.4 8.7V55.3Q22.4 56.5 21.2 56.5H16.5Q7.5 56.5 7.5 47.5V16.5Q7.5 7.5 16.5 7.5Z" fill="url(#_R_fraulb_tile)" />
            <path d="M42.8 7.5H47.5Q56.5 7.5 56.5 16.5V47.5Q56.5 56.5 47.5 56.5H42.8Q41.6 56.5 41.6 55.3V8.7Q41.6 7.5 42.8 7.5Z" fill="url(#_R_fraulb_tile)" />
            <path d="M26.2 7.5H37.8Q39 7.5 39 8.7V29.5Q39 30.7 37.8 30.7H26.2Q25 30.7 25 29.5V8.7Q25 7.5 26.2 7.5Z" fill="url(#_R_fraulb_tile)" />
            <path d="M26.2 33.3H37.8Q39 33.3 39 34.5V55.3Q39 56.5 37.8 56.5H26.2Q25 56.5 25 55.3V34.5Q25 33.3 26.2 33.3Z" fill="url(#_R_fraulb_tile)" />
          </svg>
          <h2
            id="close-title"
            className="home-module__06co2W__fade mt-8 max-w-2xl text-balance text-[clamp(31px,4.3vw,46px)] font-medium leading-[1.08] tracking-[-0.035em] text-ink"
          >
            Your next landing page, <span className="text-ink-6">already finished.</span>
          </h2>
          <p
            className="home-module__06co2W__fade mt-5 max-w-md text-pretty text-[17px] leading-[1.6] text-ink-5 sm:text-[18px]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Pick a template tonight, make it yours in one file, and ship it by the weekend.
          </p>
          <div
            className="home-module__06co2W__fade mt-8 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            <a
              href="/templates"
              className="group inline-flex h-11 select-none items-center justify-center gap-3 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--primary)_76%,#0b1a4a)] bg-[color-mix(in_srgb,var(--primary)_92%,#0b1a4a)] pl-5 pr-[5px] text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(11,26,74,0.35),0_1px_2px_rgba(16,24,64,0.14)] transition-[background-color,translate,scale] duration-150 hover:bg-primary active:translate-y-px active:scale-[0.98] outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35"
            >
              Browse templates
              <span
                aria-hidden={true}
                className="grid shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_1px_2px_rgba(11,26,74,0.18)] size-[33px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none size-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </a>
            <a
              className="group inline-flex h-11 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-surface px-5 text-[15px] font-medium text-ink shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.07)] transition-[background-color,translate,scale] duration-150 hover:bg-surface-3 active:translate-y-px active:scale-[0.98] outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35"
              href="/#pricing"
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
