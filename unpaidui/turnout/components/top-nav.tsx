"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Journal", href: "#journal" },
];

export function TopNav() {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [glideStyle, setGlideStyle] = useState<{ transform: string; width: number; opacity: number }>({
    transform: "translateX(0px)",
    width: 0,
    opacity: 0,
  });

  const linksContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linksContainerRef.current) return;
    const parentRect = linksContainerRef.current.getBoundingClientRect();
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
          <a className="nav-brand" href="/" aria-label="Turnout home">
            <span className="brand">
              <svg className="mark" width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
                <rect width="40" height="40" rx="12" fill="var(--lime)" />
                <path
                  d="M6 28c6 2 11-1 14-6s7-11 3-13-8 3-5 8 10 5 16 0"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="brand-name">Turnout</span>
            </span>
          </a>

          <nav aria-label="Main" className="nav-links">
            <ul ref={linksContainerRef} onMouseLeave={handleMouseLeave}>
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
                  <a className="nav-link" href={item.href} onMouseEnter={handleLinkHover}>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-end">
            <a className="nav-cta" href="#pricing">
              Plan an event
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
            <a
              className="action action-lime action-md nav-menu-cta"
              href="#pricing"
              onClick={() => setIsOpen(false)}
            >
              <span className="action-pill">
                <span className="sr-only">Plan an event</span>
                <span className="roll" aria-hidden="true">
                  {"Plan an event".split("").map((char, i) => (
                    <span key={i} className="roll-c" style={{ "--i": i } as React.CSSProperties}>
                      <span>{char === " " ? "\u00A0" : char}</span>
                      <span>{char === " " ? "\u00A0" : char}</span>
                    </span>
                  ))}
                </span>
              </span>
              <span className="action-dot">
                <span className="throw" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
