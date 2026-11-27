"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { TextMorph } from "@/components/text-morph";
import { HeroDitherCanvas } from "@/components/hero-dither";
import Link from "next/link";

interface TemplateInfo {
  slug: string;
  name: string;
  kind: string;
  price: string;
  href: string;
}

interface ShowcaseSet {
  word: string;
  tab: string;
  templates: [TemplateInfo, TemplateInfo, TemplateInfo];
}

const SETS: ShowcaseSet[] = [
  {
    word: "SaaS",
    tab: "SaaS",
    templates: [
      {
        slug: "upshot",
        name: "Upshot",
        kind: "Marketing measurement SaaS",
        price: "$39",
        href: "/template/upshot",
      },
      {
        slug: "notch",
        name: "Notch",
        kind: "Release coordination SaaS",
        price: "$39",
        href: "/template/notch",
      },
      {
        slug: "wilco",
        name: "Wilco",
        kind: "Business travel and expense",
        price: "$39",
        href: "/template/wilco",
      },
    ],
  },
  {
    word: "AI tool",
    tab: "AI tools",
    templates: [
      {
        slug: "fixate",
        name: "Fixate",
        kind: "Attention prediction",
        price: "$39",
        href: "/template/fixate",
      },
      {
        slug: "frank",
        name: "Frank",
        kind: "AI outreach and sales",
        price: "$39",
        href: "/template/frank",
      },
      {
        slug: "daybreak",
        name: "Daybreak",
        kind: "AI marketing and analytics workspace",
        price: "$39",
        href: "/template/daybreak",
      },
    ],
  },
  {
    word: "AI agent",
    tab: "Agents",
    templates: [
      {
        slug: "earshot",
        name: "Earshot",
        kind: "AI receptionist",
        price: "$39",
        href: "/template/earshot",
      },
      {
        slug: "baton",
        name: "Baton",
        kind: "AI automation and agent",
        price: "$39",
        href: "/template/baton",
      },
      {
        slug: "parley",
        name: "Parley",
        kind: "AI support agent",
        price: "$39",
        href: "/template/parley",
      },
    ],
  },
  {
    word: "studio",
    tab: "Studios",
    templates: [
      {
        slug: "oddline",
        name: "Oddline",
        kind: "Social creative studio",
        price: "$39",
        href: "/template/oddline",
      },
      {
        slug: "offscript",
        name: "Offscript",
        kind: "Independent creative studio",
        price: "$39",
        href: "/template/offscript",
      },
      {
        slug: "cutroom",
        name: "Cutroom",
        kind: "Video editing studio",
        price: "$39",
        href: "/template/cutroom",
      },
    ],
  },
  {
    word: "fintech app",
    tab: "Fintech",
    templates: [
      {
        slug: "arclo",
        name: "Arclo",
        kind: "Finance close and fintech",
        price: "$39",
        href: "/template/arclo",
      },
      {
        slug: "keel",
        name: "Keel",
        kind: "Business banking and fintech",
        price: "$39",
        href: "/template/keel",
      },
      {
        slug: "kept",
        name: "Kept",
        kind: "Invoicing and fintech",
        price: "$39",
        href: "/template/kept",
      },
    ],
  },
  {
    word: "dev tool",
    tab: "Dev tools",
    templates: [
      {
        slug: "patch",
        name: "Patch",
        kind: "AI builder and developer tool",
        price: "$39",
        href: "/template/patch",
      },
      {
        slug: "switchyard",
        name: "Switchyard",
        kind: "Feature flag and rollout SaaS",
        price: "$39",
        href: "/template/switchyard",
      },
      {
        slug: "fleck",
        name: "Fleck",
        kind: "Code intelligence and analysis",
        price: "$39",
        href: "/template/fleck",
      },
    ],
  },
];

interface ShowcaseContextType {
  sets: ShowcaseSet[];
  index: number;
  previous: number | null;
  turned: boolean;
  running: boolean;
  select: (idx: number) => void;
  advance: () => void;
  hold: (h: boolean) => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | null>(null);

function useShowcase() {
  const ctx = useContext(ShowcaseContext);
  if (!ctx) throw new Error("Showcase parts must sit inside <HeroShowcase>");
  return ctx;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(REDUCED_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

function ShowcaseTabs() {
  const { sets, index, running, select, advance } = useShowcase();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      const activeBtn = buttonRefs.current[index];
      const container = containerRef.current;
      if (!activeBtn || !container) return;
      setIndicator({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
      const scrollPos = activeBtn.offsetLeft - (container.clientWidth - activeBtn.offsetWidth) / 2;
      container.scrollTo({
        left: scrollPos,
        behavior: window.matchMedia(REDUCED_QUERY).matches ? "auto" : "smooth",
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [index]);

  return (
    <div className="flex justify-center px-3">
      <div
        ref={containerRef}
        role="group"
        aria-label="Show templates for"
        className="relative flex max-w-full overflow-x-auto rounded-full bg-surface-3 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {indicator && (
          <span
            aria-hidden={true}
            className="absolute bottom-1 top-1 overflow-hidden rounded-full bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_1px_rgb(var(--edge-rgb)/0.05)] transition-[left,width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
            style={{ left: indicator.left, width: indicator.width }}
          >
            <span
              key={index}
              className="home-module__06co2W__fill absolute inset-0 bg-primary/[0.07]"
              style={{
                "--span": "4200ms",
                animationPlayState: running ? "running" : "paused",
              } as React.CSSProperties}
              onAnimationEnd={advance}
            />
          </span>
        )}
        {sets.map((set, i) => {
          const isSelected = i === index;
          return (
            <button
              key={set.word}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              type="button"
              aria-pressed={isSelected}
              onClick={() => select(i)}
              className={`relative h-8 shrink-0 whitespace-nowrap rounded-full px-3.5 text-[13.5px] font-medium outline-none transition-colors duration-200 focus-visible:ring-[3px] focus-visible:ring-primary/35 ${
                isSelected
                  ? "text-ink"
                  : "text-ink-6 hover:text-ink-3"
              } ${isSelected && !indicator ? "bg-surface" : ""}`}
            >
              {set.tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const SLOTS = [
  { place: "hidden sm:block left-[-46%] w-[62%]", wait: 0 },
  { place: "left-0 w-full sm:left-[19%] sm:w-[62%] z-10", wait: 70 },
  { place: "hidden sm:block right-[-46%] w-[62%]", wait: 140 },
];

function ShowcaseSlot({ slot }: { slot: number }) {
  const { sets, index, previous, turned, hold } = useShowcase();
  const template = sets[index].templates[slot];
  const prevTemplate = previous !== null ? sets[previous].templates[slot] : null;
  const isCenter = slot === 1;
  const { place, wait } = SLOTS[slot];
  const [settled, setSettled] = useState<number | null>(null);

  const content = (
    <>
      {prevTemplate && settled !== index && (
        <span className="home-module__06co2W__layer">
          <img
            src={`/previews/card/${prevTemplate.slug}.webp`}
            alt=""
            draggable={false}
            className="size-full object-cover object-top"
          />
        </span>
      )}
      <span
        key={index}
        className="home-module__06co2W__layer"
        data-enter={turned ? "" : undefined}
        style={{ "--wait": `${wait}ms` } as React.CSSProperties}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) setSettled(index);
        }}
      >
        <img
          src={`/previews/card/${template.slug}.webp`}
          alt=""
          draggable={false}
          loading="eager"
          fetchPriority={isCenter && !turned ? "high" : "auto"}
          decoding="async"
          className="size-full object-cover object-top"
        />
      </span>
    </>
  );

  const containerClass = `absolute top-0 block aspect-[16/10] overflow-hidden plate-corners-sm bg-surface shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)] ${place}`;

  if (isCenter) {
    return (
      <Link
        href={template.href}
        aria-label={`${template.name}: ${template.kind}`}
        onFocus={() => hold(true)}
        onBlur={() => hold(false)}
        className={`${containerClass} outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span aria-hidden={true} className={containerClass}>
      {content}
    </span>
  );
}

function ShowcaseReadout() {
  const { sets, index } = useShowcase();
  const current = sets[index].templates[1];

  return (
    <p className="mt-5 flex min-w-0 items-center justify-center gap-2 px-4 text-[14px] sm:mt-6 sm:text-[14.5px]">
      <span className="shrink-0 font-medium text-ink">
        <TextMorph>{current.name}</TextMorph>
      </span>
      <span aria-hidden={true} className="text-ink-9">
        ·
      </span>
      <span className="min-w-0 truncate text-ink-5">
        <TextMorph animateWidth={false}>{current.kind}</TextMorph>
      </span>
      <span aria-hidden={true} className="text-ink-9">
        ·
      </span>
      <span className="shrink-0 tabular-nums text-ink-5">
        <TextMorph>{current.price}</TextMorph>
      </span>
    </p>
  );
}

function ShowcasePlate() {
  const { hold } = useShowcase();
  return (
    <div
      onPointerEnter={() => hold(true)}
      onPointerLeave={() => hold(false)}
      className="plate-corners bg-surface-2 overflow-hidden pb-5 pt-3 sm:pb-7 sm:pt-5"
    >
      <ShowcaseTabs />
      <div className="mt-3 px-3 sm:mt-5 sm:px-0">
        <div className="relative aspect-[16/10] sm:aspect-[100/38.75]">
          <ShowcaseSlot slot={0} />
          <ShowcaseSlot slot={1} />
          <ShowcaseSlot slot={2} />
        </div>
      </div>
      <ShowcaseReadout />
    </div>
  );
}

export function HeroSection() {
  const isReduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [turned, setTurned] = useState(false);
  const [holding, setHolding] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-80px 0px -10% 0px" }
    );
    obs.observe(el);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const select = useCallback(
    (idx: number) => {
      if (idx !== index) {
        setPrevious(index);
        setIndex(idx);
        setTurned(true);
      }
    },
    [index]
  );

  const advance = useCallback(() => {
    const nextIdx = (index + 1) % SETS.length;
    select(nextIdx);
  }, [index, select]);

  const running = !isReduced && !holding && inView && visible;

  const currentWord = SETS[index].word;

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20">
      <HeroDitherCanvas />

      <div ref={containerRef}>
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          {/* Badge */}
          <Link
            aria-label="New: 13 Pro landing blocks, Heroes, bentos and CTAs, with All-Access"
            className="group relative inline-flex h-9 max-w-full items-center gap-2.5 rounded-full bg-surface-2 pl-1 pr-3 text-[13px] text-ink-3 outline-none transition-colors duration-200 hover:bg-surface-3 hover:text-ink focus-visible:ring-[3px] focus-visible:ring-primary/35"
            href="/templates/blocks"
          >
            <span
              aria-hidden={true}
              className="relative h-7 w-11 shrink-0 overflow-hidden rounded-full bg-surface shadow-[0_0_0_1px_rgb(var(--edge-rgb)/0.06)]"
            >
              <img
                src="/previews/blocks/pro.webp"
                alt=""
                className="size-full object-cover object-left-top"
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="truncate font-medium text-ink">New: 13 Pro landing blocks</span>
            <span aria-hidden={true} className="hidden text-ink-9 sm:inline">
              ·
            </span>
            <span className="hidden truncate text-ink-6 sm:inline">
              Heroes, bentos and CTAs, with All-Access
            </span>
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
              className="lucide lucide-arrow-right size-3 text-ink-6 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden={true}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          {/* Authentic Heading */}
          <h1 className="mt-7 text-[clamp(34px,9.6vw,44px)] font-medium leading-[1.05] tracking-[-0.045em] text-ink sm:mt-8 sm:text-[62px] lg:text-[72px]">
            <span className="block">
              Make your{" "}
              <span className="block sm:inline">
                <span className="relative inline-block text-primary">
                  <TextMorph duration={520}>{currentWord}</TextMorph>
                </span>
              </span>
            </span>
            <span className="block">look expensive.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-[36rem] text-pretty text-[17px] leading-[1.6] text-ink-5 sm:mt-6 sm:max-w-[39rem] sm:text-[19px]">
            263 free shadcn/ui components for the product, 26 landing blocks for the page (13&nbsp;free), and 64 complete Next.js templates for the whole site, each one live before you buy.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row">
            <Link
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
                  className="lucide lucide-arrow-right size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/ui"
              className="group inline-flex h-11 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-surface-3 px-5 text-[15px] font-medium text-ink transition-[background-color,translate,scale] duration-150 hover:bg-surface-4 active:translate-y-px active:scale-[0.98] outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35"
            >
              Explore components
            </Link>
          </div>
        </div>

        {/* Carousel plate */}
        <div className="mx-auto mt-12 w-full max-w-[1200px] px-4 sm:mt-16 sm:px-6">
          <ShowcaseContext.Provider
            value={{
              sets: SETS,
              index,
              previous,
              turned,
              running,
              select,
              advance,
              hold: setHolding,
            }}
          >
            <ShowcasePlate />
          </ShowcaseContext.Provider>
        </div>
      </div>
    </section>
  );
}
