"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:pt-5 lg:pt-6">
      <div
        data-scrolled={scrolled}
        className="pointer-events-auto w-full max-w-[420px] animate-appear rounded-[26px] bg-nav text-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] ring-1 ring-white/[0.07] transition-shadow duration-300 [--appear-y:-14px] data-[scrolled=true]:shadow-[0_18px_44px_-14px_rgb(0_0_0/0.6)] md:w-auto md:max-w-none"
      >
        <nav aria-label="Primary" className="flex h-13 items-center pr-1.5 pl-4 md:pl-5">
          <Link
            href="#top"
            aria-label="Arclight home"
            className="inline-flex items-center gap-2 rounded-full text-[17px] leading-none font-medium tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring focus-visible:outline-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
              <path
                d="M3.75 17a8.25 8.25 0 0 1 16.5 0"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17" r="3.25" className="fill-accent" />
            </svg>
            Arclight
          </Link>

          <ul
            className="relative ml-6 hidden h-9 items-center md:flex lg:ml-8"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_LINKS.map((link, idx) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative flex h-9 items-center rounded-full px-3.5 text-sm leading-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    hoveredIdx === idx ? "bg-white/[0.1] text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 md:ml-6 lg:ml-8">
            <a
              href="https://app.arclight.example.com/sign-in"
              className="hidden h-9 items-center rounded-full px-3.5 text-sm leading-none text-white/65 transition-colors duration-200 hover:text-white lg:flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="flex h-10 items-center rounded-full bg-white px-4.5 text-sm leading-none font-medium text-[#0c0c0d] transition-[background-color,scale] duration-200 hover:bg-white/85 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get started
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/[0.08] transition-colors duration-200 hover:bg-white/[0.14] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M4 7.5h12"
                  className={`origin-center transition-transform duration-300 ${
                    mobileMenuOpen ? "translate-y-[2.5px] rotate-45" : ""
                  }`}
                />
                <path
                  d="M4 12.5h12"
                  className={`origin-center transition-transform duration-300 ${
                    mobileMenuOpen ? "-translate-y-[2.5px] -rotate-45" : ""
                  }`}
                />
              </svg>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="flex flex-col gap-2 border-t border-white/10 px-5 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 items-center text-sm font-medium text-white/80 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://app.arclight.example.com/sign-in"
              className="flex h-10 items-center text-sm font-medium text-white/80 hover:text-white"
            >
              Sign in
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
