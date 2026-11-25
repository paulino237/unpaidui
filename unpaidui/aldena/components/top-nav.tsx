"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "#about" },
  { label: "WORKS", href: "#works" },
  { label: "CONTACT", href: "#contact" },
  { label: "BLOG", href: "#blog" },
];

function RollingText({ text, active = false }: { text: string; active?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-[16px] cursor-pointer items-center overflow-hidden font-sans text-[13px] font-semibold tracking-wider uppercase"
    >
      <div className="flex">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: hovered ? "translateY(-16px)" : "translateY(0px)",
              transitionDelay: `${i * 18}ms`,
            }}
          >
            <span
              className={`block h-[16px] leading-[16px] transition-colors ${
                active ? "text-white" : "text-white/90 hover:text-white"
              }`}
            >
              {char}
            </span>
            <span className="block h-[16px] leading-[16px] text-white/50">
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TopNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center pt-8 pb-4">
      {/* Container with soft dark pill backdrop so it stands out cleanly against any background */}
      <div className="flex items-center gap-8 rounded-full border border-white/10 bg-black/40 px-8 py-3 backdrop-blur-md">
        {NAV_ITEMS.map((item, index) => (
          <Link key={item.label} href={item.href}>
            <RollingText text={item.label} active={index === 0} />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function BottomFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      {/* Menu overlay list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-16 left-1/2 flex min-w-[300px] -translate-x-1/2 flex-col items-center gap-3 border border-white/20 bg-black/80 p-8 backdrop-blur-xl"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-sans text-[24px] font-medium tracking-tight text-white/80 transition-colors hover:text-white"
              >
                {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button capsule pill: Menu with 3 lines */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        className="flex h-[38px] w-[58px] cursor-pointer items-center justify-center border border-white/20 bg-black/80 backdrop-blur-md transition-colors hover:border-white/50"
      >
        <div className="flex h-3.5 w-4.5 flex-col justify-between">
          <span
            className={`block h-px w-full bg-white transition-transform duration-300 ${
              isOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-white transition-transform duration-300 ${
              isOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>
    </div>
  );
}
