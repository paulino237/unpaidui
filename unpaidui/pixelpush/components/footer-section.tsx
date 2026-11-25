"use client";

import { motion, useReducedMotion } from "motion/react";
import { PixelPlay } from "@/components/logo";
import { PixelButton } from "@/components/pixel-button";
import { PixelField } from "@/components/pixel-field";

const MASK = "radial-gradient(125% 105% at 0% 100%, #000 22%, transparent 72%)";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Templates", href: "#templates" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "Tutorials", href: "#tutorials" },
      { label: "Community", href: "#community" },
      { label: "Support", href: "#support" },
    ],
  },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "GitHub", href: "#", icon: GithubIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

export function FooterSection() {
  const reduced = useReducedMotion();

  return (
    <footer className="border-border bg-background relative overflow-hidden border-t">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-2/3 w-3/4 rotate-180 opacity-80 sm:w-1/2 lg:w-2/5"
        style={{ maskImage: MASK, WebkitMaskImage: MASK }}
      >
        <PixelField className="h-full w-full" />
      </div>

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={reduced ? { duration: 0.3 } : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.6fr_1.2fr]">
          <div>
            <h2 className="text-foreground max-w-xs text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Edit video the way you think.
            </h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PixelButton href="#start" variant="solid">
                Start for free
              </PixelButton>
              <PixelButton href="#demo" variant="outline">
                Book a demo
              </PixelButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-accent font-mono text-xs font-medium tracking-tight">
                  {col.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="focus-ring text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="text-accent font-mono text-xs font-medium tracking-tight">
              Stay in the loop
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Product updates and editing tips, once a month. No spam.
            </p>
            <form
              className="mt-5 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@studio.com"
                aria-label="Email address"
                className="focus-ring border-border bg-background text-foreground placeholder:text-muted-foreground h-11 w-full border px-3 text-sm"
              />
              <PixelButton type="submit" variant="solid">
                Subscribe
              </PixelButton>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center gap-2">
              <span className="bg-foreground text-background flex h-6 w-6 items-center justify-center">
                <PixelPlay className="h-3 w-3" />
              </span>
              <span className="text-foreground font-mono text-sm font-semibold tracking-tight">
                Pixelpush
              </span>
            </span>
            <p className="text-muted-foreground text-xs">
              © 2026 Pixelpush. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#privacy"
              className="focus-ring text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="focus-ring text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Terms
            </a>
            <div className="flex items-center gap-3">
              {SOCIALS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="focus-ring text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
