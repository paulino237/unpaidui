"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { KoraLogo } from "./kora-logo";

const NAV_LINKS = [
  { name: "Case studies", href: "#case-study" },
  { name: "Insights", href: "#insights" },
  { name: "About us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Floating Left/Center Navbar Pill */}
        <div className="pointer-events-auto inline-flex items-center gap-6 sm:gap-8 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/95 backdrop-blur-md border border-[#242424]/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-85 transition-opacity"
            aria-label="Kora Home"
          >
            <KoraLogo className="h-3.5 sm:h-4 w-auto text-[#242424]" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium text-[#242424]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#5dc39b] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Floating Right Pill: Book a Call with Koraline Spencer Avatar */}
        <div className="pointer-events-auto hidden md:flex items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-[#242424] hover:bg-black text-white text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>Book a call</span>
            <div className="relative size-7 rounded-full overflow-hidden border border-white/30 shrink-0">
              <Image
                src="https://framerusercontent.com/images/ptzdfa8kamllLFJeEJ6fpHyKaQ.jpg?width=1024&height=1024"
                alt="Koraline Spencer"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="pointer-events-auto md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="size-10 rounded-full bg-white/95 backdrop-blur-md border border-[#242424]/10 flex items-center justify-center text-[#242424] shadow-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 mx-auto max-w-[calc(100vw-2rem)] rounded-3xl bg-white/98 backdrop-blur-xl border border-[#242424]/10 p-6 shadow-2xl">
          <nav className="flex flex-col gap-4 text-sm font-medium text-[#242424]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#5dc39b] transition-colors border-b border-[#242424]/[0.06]"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#242424] text-white font-semibold text-xs shadow-md"
            >
              <span>Book a call</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
