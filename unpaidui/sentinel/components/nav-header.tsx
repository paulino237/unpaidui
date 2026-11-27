"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-8">
          <Link
            href="#top"
            className="focus-ring group inline-flex items-center gap-2.5"
            aria-label="Sentinel home"
          >
            <span
              className="h-7 w-7 bg-foreground transition-transform duration-300 group-hover:rotate-3 [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
              aria-hidden="true"
            />
            <span className="text-[17px] font-semibold tracking-tight">Sentinel</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <div className="relative group">
              <button
                type="button"
                className="focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium transition-colors text-foreground/80 hover:text-foreground"
              >
                Platform
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </div>
            <Link
              href="#customers"
              className="focus-ring text-foreground/80 hover:text-foreground rounded-md px-3 py-2 text-[13px] font-medium transition-colors"
            >
              Customers
            </Link>
            <Link
              href="#pricing"
              className="focus-ring text-foreground/80 hover:text-foreground rounded-md px-3 py-2 text-[13px] font-medium transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <span
            style={{ "--cut": "9px" } as React.CSSProperties}
            className="inline-flex h-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
          >
            <Link
              href="#sign-in"
              style={{ "--cut": "9px" } as React.CSSProperties}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
            >
              Sign In
            </Link>
          </span>

          <Link
            href="#get-started"
            style={{ "--cut": "9px" } as React.CSSProperties}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-10 px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-foreground text-background hover:bg-foreground/85"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <Link
            href="#get-started"
            style={{ "--cut": "9px" } as React.CSSProperties}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-10 px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-foreground text-background hover:bg-foreground/85"
          >
            Get Started
          </Link>
          <span
            style={{ "--cut": "9px" } as React.CSSProperties}
            className="inline-flex h-10 w-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ "--cut": "9px" } as React.CSSProperties}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full w-full [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </span>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-md px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              Platform
            </Link>
            <Link
              href="#customers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              Pricing
            </Link>
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <Link
                href="#sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
