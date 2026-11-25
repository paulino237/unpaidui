"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const navLinks = ["Features", "Templates", "Pricing", "Resources"];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-5">
      <span
        className="absolute inset-x-0 top-1/2 h-px bg-white transition-transform duration-300"
        style={{
          transform: open ? "rotate(45deg) translateY(0)" : "translateY(-4px)",
        }}
      />
      <span
        className="absolute inset-x-0 top-1/2 h-px bg-white transition-transform duration-300"
        style={{
          transform: open ? "rotate(-45deg) translateY(0)" : "translateY(4px)",
        }}
      />
    </div>
  );
}

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastY.current && y > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/svg/logo.svg"
                width={120}
                height={34}
                alt="Kraft"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href="#"
                  className="rounded-md px-2.5 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {link}
                </Link>
              </motion.div>
            ))}

            {/* Separator */}
            <div className="mx-3 h-px w-5 rotate-90 bg-white/30" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Link
                href="#"
                className="rounded-md px-2.5 py-1 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                Contact
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link
                href="#"
                className="ml-1 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Join
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-md p-2 text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-1 flex-col justify-center px-8">
              {[...navLinks, "Contact", "Join"].map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Link
                    href="#"
                    className="block py-3 text-5xl font-medium text-white hover:text-white/70"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
