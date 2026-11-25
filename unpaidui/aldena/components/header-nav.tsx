"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
];

export function HeaderNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#242424] bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="font-serif text-xl italic tracking-tight text-[#f5f4f0]">
          Aldena
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm tracking-wide text-[#6b6b6b] transition-colors hover:text-[#f5f4f0]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="border border-[#f5f4f0] px-5 py-2 text-sm tracking-wide text-[#f5f4f0] transition-colors hover:bg-[#f5f4f0] hover:text-[#0a0a0a]"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} className="text-[#f5f4f0]" /> : <Menu size={20} className="text-[#f5f4f0]" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#242424] bg-[#0a0a0a] px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base tracking-wide text-[#6b6b6b] transition-colors hover:text-[#f5f4f0]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block border border-[#f5f4f0] px-5 py-2.5 text-sm tracking-wide text-[#f5f4f0]"
            >
              Start a project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
