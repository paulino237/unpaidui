"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown, ArrowDownRight } from "lucide-react";

export function NavHeader() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed shadow-2xl/20 rounded-b-4xl top-2.5 left-1/2 -translate-x-1/2 w-full max-w-5xl max-[1200px]:max-w-2xl bg-frame z-[9998] max-[850px]:top-0 max-[850px]:left-0 max-[850px]:right-0 max-[850px]:translate-x-0 max-[850px]:w-full max-[850px]:max-w-none max-[850px]:rounded-none max-[850px]:rounded-b-4xl max-[850px]:overflow-hidden transition-transform duration-500">
      <div className="h-20 max-[850px]:h-18 flex items-center justify-between px-4 max-[850px]:px-6">
        <Link href="#" className="flex items-center gap-2 ml-4 max-[850px]:ml-0">
          <div className="w-6 h-6 rounded-full bg-foreground" />
          <span className="text-lg font-semibold text-foreground leading-none max-[1200px]:hidden max-[850px]:inline">
            Circular
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 max-[1200px]:gap-0 max-[850px]:hidden">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProductsOpen(!productsOpen);
                setResourcesOpen(false);
              }}
              className="flex items-center gap-1 px-4 py-2 max-[1200px]:px-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5 cursor-pointer"
              aria-expanded={productsOpen}
            >
              Products
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl border border-border bg-frame p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                >
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                >
                  Automation
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                >
                  Integrations
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setResourcesOpen(!resourcesOpen);
                setProductsOpen(false);
              }}
              className="flex items-center gap-1 px-4 py-2 max-[1200px]:px-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5 cursor-pointer"
              aria-expanded={resourcesOpen}
            >
              Resources
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl border border-border bg-frame p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                >
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                >
                  Guides
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-sm rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                >
                  Changelog
                </Link>
              </div>
            )}
          </div>

          <Link
            href="#pricing"
            className="px-4 py-2 max-[1200px]:px-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4 max-[850px]:hidden">
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link href="#" className="group relative inline-flex items-center">
            <span className="absolute right-0 inset-y-0 w-[calc(100%-1.5rem)] rounded-xl bg-accent" />
            <span className="relative z-10 px-5 py-3 rounded-xl bg-foreground text-background text-sm font-medium">
              Try for free
            </span>
            <span className="relative -left-px z-10 w-10 h-10 rounded-xl flex items-center justify-center text-black">
              <ArrowDownRight
                className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45"
                strokeWidth={2}
              />
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hidden max-[850px]:flex items-center justify-center w-10 h-10 cursor-pointer"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-8 h-4 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-foreground origin-center rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground origin-center rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Decorative corner cutouts */}
      <svg
        className="absolute top-0 -left-12.25 rotate-180 text-frame pointer-events-none max-[850px]:hidden"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute top-0 -right-12.25 rotate-90 text-frame pointer-events-none max-[850px]:hidden"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>

      {mobileMenuOpen && (
        <div className="flex flex-col gap-3 px-6 py-5 border-t border-border bg-frame max-[850px]:flex">
          <Link
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-foreground py-2"
          >
            Products
          </Link>
          <Link
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-foreground py-2"
          >
            Resources
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium text-foreground py-2"
          >
            Pricing
          </Link>
          <div className="pt-3 flex flex-col gap-3">
            <Link
              href="#"
              className="text-base font-medium text-foreground/80 py-2"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center py-3 rounded-xl bg-accent text-black font-medium text-center"
            >
              Try for free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
