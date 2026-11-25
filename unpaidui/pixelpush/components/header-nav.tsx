"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./logo";
import { PixelButton } from "./pixel-button";
import { PixelIcon } from "./pixel-icon";

const EASE = [0.4, 0, 0.2, 1] as const;

interface NavChild {
  label: string;
  desc: string;
  href: string;
  icon: string;
}

interface NavCard {
  title: string;
  desc: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  tagline?: string;
  children?: NavChild[];
  cards?: NavCard[];
}

const navItems: NavItem[] = [
  {
    label: "Features",
    href: "#features",
    tagline: "Plain-language editing, captions, and B-roll on a single timeline.",
    children: [
      { label: "AI Editor", desc: "Cut and arrange with plain language", href: "#ai-editor", icon: "wand" },
      { label: "Auto Captions", desc: "Frame-accurate subtitles in 50+ languages", href: "#captions", icon: "captions" },
      { label: "Text to Video", desc: "Generate B-roll from a single prompt", href: "#text-to-video", icon: "type" },
      { label: "Smart Reframe", desc: "Auto-resize for every platform", href: "#reframe", icon: "crop" },
    ],
    cards: [
      { title: "Watch the demo", desc: "See Pixelpush cut a full video in 90 seconds.", href: "#demo" },
      { title: "What's new", desc: "Timeline keyframes, smarter reframe, and more.", href: "#changelog" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Showcase",
    href: "#showcase",
    tagline: "See what creators are shipping with Pixelpush every day.",
    children: [
      { label: "Templates", desc: "Start from a ready-made edit", href: "#templates", icon: "grid" },
      { label: "Creator Stories", desc: "How teams ship faster with Pixelpush", href: "#stories", icon: "user" },
      { label: "Made with Pixelpush", desc: "A gallery of real edits", href: "#gallery", icon: "film" },
    ],
    cards: [
      { title: "Template gallery", desc: "200+ editable starts for every format.", href: "#templates" },
      { title: "Featured creators", desc: "The edits turning heads this month.", href: "#featured" },
    ],
  },
  {
    label: "Resources",
    href: "#resources",
    tagline: "Docs, tutorials, and a community to get you cutting fast.",
    children: [
      { label: "Docs", desc: "Guides and API reference", href: "#docs", icon: "doc" },
      { label: "Tutorials", desc: "Learn the editor in minutes", href: "#tutorials", icon: "cap" },
      { label: "Community", desc: "Join thousands of creators", href: "#community", icon: "chat" },
    ],
    cards: [
      { title: "Read the docs", desc: "Guides, API reference, and quickstarts.", href: "#docs" },
      { title: "Join the community", desc: "Swap tips with 12,000+ video creators.", href: "#community" },
    ],
  },
];

function MegaMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const children = item.children ?? [];
  const cards = item.cards ?? [];

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12">
        {/* Left panel */}
        <div className="border-border relative col-span-3 flex flex-col justify-between border-r border-dashed p-6">
          <div>
            <p className="text-muted-foreground font-mono text-xs tracking-tight">{item.label}</p>
            <p className="text-foreground/80 mt-3 text-sm leading-relaxed">{item.tagline}</p>
          </div>
          <a
            href={item.href}
            onClick={onNavigate}
            className="focus-ring group text-foreground mt-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
          >
            Explore all
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
              <path d="M7 7h10v10" /><path d="M7 17 17 7" />
            </svg>
          </a>
        </div>

        {/* Middle: children */}
        <div className="border-border col-span-6 grid grid-cols-2 gap-px border-r border-dashed">
          {children.map((child) => (
            <a
              key={child.label}
              href={child.href}
              onClick={onNavigate}
              className="focus-ring group flex gap-3 p-5 transition-colors hover:bg-muted/40"
            >
              <span className="text-accent mt-0.5 shrink-0">
                <PixelIcon name={child.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="text-foreground block text-sm font-medium">{child.label}</span>
                <span className="text-muted-foreground mt-0.5 block text-xs leading-relaxed">{child.desc}</span>
              </span>
            </a>
          ))}
        </div>

        {/* Right: cards */}
        <div className="col-span-3 flex flex-col gap-px">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              onClick={onNavigate}
              className="focus-ring group flex flex-1 flex-col justify-between p-5 transition-colors hover:bg-muted/40"
            >
              <span className="text-foreground text-sm font-medium">{card.title}</span>
              <span className="text-muted-foreground mt-2 block text-xs leading-relaxed">{card.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeaderNav() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (i: number) => {
    clearTimeout(closeTimer.current);
    setActiveIndex(i);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveIndex(null), 120);
  };

  const navigate = () => {
    setActiveIndex(null);
    setMobileOpen(false);
  };

  const activeItem = activeIndex !== null ? navItems[activeIndex] : null;
  const hasMegaMenu = activeItem?.children !== undefined;

  return (
    <>
      <span id="top" aria-hidden="true" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 border-b ${
          scrolled || mobileOpen
            ? "bg-background/90 border-border backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
        style={{ opacity: 1 }}
      >
        {/* Nav bar */}
        <div className="relative z-50 mx-auto flex max-w-[1280px] items-center justify-between px-4 h-16 sm:px-6">
          <Logo />

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item, i) => (
              <div
                key={item.label}
                onMouseEnter={() => item.children ? openMenu(i) : setActiveIndex(null)}
                onMouseLeave={closeMenu}
              >
                <a
                  href={item.href}
                  className={`focus-ring flex items-center gap-1 rounded px-3 py-2 text-sm transition-colors ${
                    activeIndex === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                      animate={{ rotate: activeIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </motion.svg>
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a href="#login" className="focus-ring text-muted-foreground hover:text-foreground text-sm transition-colors">
              Log in
            </a>
            <PixelButton href="#start" variant="solid" size="md">
              Start for free
            </PixelButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="focus-ring flex h-9 w-9 items-center justify-center text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.svg key="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}>
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </motion.svg>
              ) : (
                <motion.svg key="menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {hasMegaMenu && activeItem && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="border-border bg-background/95 border-b backdrop-blur-md"
              onMouseEnter={() => { clearTimeout(closeTimer.current); setActiveIndex(activeIndex); }}
              onMouseLeave={closeMenu}
            >
              <MegaMenu item={activeItem} onNavigate={navigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-background pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col overflow-y-auto px-4 py-6 sm:px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={navigate}
                    className="focus-ring text-foreground block border-b border-border py-4 text-xl font-medium transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <a href="#login" onClick={navigate} className="focus-ring text-center text-muted-foreground hover:text-foreground text-sm py-2 transition-colors">
                  Log in
                </a>
                <PixelButton href="#start" variant="solid" size="lg">
                  Start for free
                </PixelButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
