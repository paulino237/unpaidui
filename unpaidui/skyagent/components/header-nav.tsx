"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { SkyAgentLogo } from "./skyagent-logo";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "How it Works", href: "#bento" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function HeaderNav() {
  const [isDark, setIsDark] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      className={`sticky z-50 flex justify-center transition-all duration-300 md:mx-0 mx-0 ${
        hasScrolled ? "top-6" : "top-4"
      }`}
    >
      <div
        className="transition-all duration-300"
        style={{ width: hasScrolled ? "50rem" : "70rem", maxWidth: "100%" }}
      >
        <div
          className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 xl:px-0 ${
            hasScrolled
              ? "px-4 bg-background/75 backdrop-blur-md border border-border shadow-sm mx-4 sm:mx-6"
              : "shadow-none px-7"
          }`}
        >
          <div className="flex h-[56px] items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <SkyAgentLogo className="fill-secondary text-secondary size-7 md:size-10" />
              <p className="text-lg font-semibold text-primary tracking-tight">
                SkyAgent
              </p>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="w-full hidden md:block">
              <ul className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center">
                {NAV_LINKS.map((item) => {
                  const isActive = activeNav === item.label;
                  return (
                    <li
                      key={item.label}
                      className="relative z-10 cursor-pointer h-full flex items-center justify-center"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                          className="absolute inset-0 my-1.5 rounded-full bg-accent/60 border border-border -z-10"
                        />
                      )}
                      <a
                        href={item.href}
                        onClick={() => setActiveNav(item.label)}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 tracking-tight ${
                          isActive
                            ? "text-primary"
                            : "text-primary/60 hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="bg-secondary h-8 hidden md:flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-white w-fit px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] hover:bg-secondary/90 transition-all active:scale-95"
                >
                  Try for free
                </a>
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full h-8 w-8 text-primary"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Moon className="size-4 text-primary" />
                ) : (
                  <Sun className="size-4 text-primary" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden border border-border size-8 rounded-md cursor-pointer flex items-center justify-center text-primary"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="size-4" />
                ) : (
                  <Menu className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 px-2 border-t border-border bg-background/95 backdrop-blur-md rounded-b-2xl flex flex-col gap-3">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-sm font-medium text-primary"
              >
                Home
              </a>
              <a
                href="#bento"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                How it Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Pricing
              </a>
              <div className="pt-2">
                <a
                  href="#"
                  className="bg-secondary h-9 flex items-center justify-center text-sm font-medium rounded-full text-white w-full"
                >
                  Try for free
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
