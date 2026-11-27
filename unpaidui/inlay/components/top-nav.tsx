"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Pay", href: "#pay" },
  { label: "Sell", href: "#sell" },
  { label: "Build", href: "#build" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function TopNav() {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [glideStyle, setGlideStyle] = useState<{ transform: string; width: number; opacity: number }>({
    transform: "translateX(0px)",
    width: 0,
    opacity: 0,
  });

  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linksRef.current) return;
    const parentRect = linksRef.current.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();
    const leftOffset = targetRect.left - parentRect.left;
    setGlideStyle({
      transform: `translateX(${leftOffset}px)`,
      width: targetRect.width,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setGlideStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <header className={`nav ${isCompact ? "is-compact" : ""} ${isOpen ? "is-open" : ""}`}>
      <div className="nav-bar">
        <div className="nav-row">
          <a className="nav-brand" aria-label="Inlay home" href="/">
            <span className="brand">
              <svg className="mark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="1.5" y="1.5" width="9.5" height="9.5" rx="2.6" fill="currentColor" />
                <rect className="mark-free" x="13" y="1.5" width="9.5" height="9.5" rx="2.6" fill="var(--ultra)" />
                <rect x="1.5" y="13" width="9.5" height="9.5" rx="2.6" fill="currentColor" />
                <rect x="13" y="13" width="9.5" height="9.5" rx="2.6" fill="currentColor" />
              </svg>
              <span className="brand-name">Inlay</span>
            </span>
          </a>

          <nav aria-label="Main" className="nav-links">
            <ul ref={linksRef} onMouseLeave={handleMouseLeave}>
              <span
                className={`nav-glide ${glideStyle.opacity > 0 ? "is-on" : ""}`}
                style={{
                  transform: glideStyle.transform,
                  width: `${glideStyle.width}px`,
                }}
                aria-hidden="true"
              />
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a className="nav-link" href={item.href} onMouseEnter={handleMouseEnter}>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-end">
            <a className="nav-cta" href="#claim">
              Sign up
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={isOpen}
              aria-controls="nav-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="tm">
                <span className="sr-only">Menu</span>
                <span aria-hidden="true" className="tm-w">
                  <span className="tm-g">M</span>
                  <span className="tm-g">e</span>
                  <span className="tm-g">n</span>
                  <span className="tm-g">u</span>
                </span>
              </span>
              <span className="nav-burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <div className="nav-menu" id="nav-menu" inert={!isOpen}>
          <div className="nav-menu-inner">
            <ul>
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.label} style={{ "--i": idx } as React.CSSProperties}>
                  <a className="nav-menu-link" href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-menu-end">
              <a className="btn btn-ink" href="#claim" onClick={() => setIsOpen(false)}>
                <span className="sr-only">Sign up</span>
                <span className="roll" aria-hidden="true">
                  {"Sign up".split("").map((c, i) => (
                    <span key={i} className="roll-c" style={{ "--i": i } as React.CSSProperties}>
                      <span>{c === " " ? "\u00A0" : c}</span>
                      <span>{c === " " ? "\u00A0" : c}</span>
                    </span>
                  ))}
                </span>
                <span className="throw" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
