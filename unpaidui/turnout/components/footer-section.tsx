"use client";

import { useState } from "react";

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <footer className="footer on-dark">
      <div className="container footer-head">
        <p className="h2 footer-headline">
          <span className="footer-line">Moments people </span>
          <span className="footer-line">show up for.</span>
        </p>

        <form className={`newsletter is-${status}`} noValidate onSubmit={handleSubmit}>
          <p className="newsletter-title">The Afterglow</p>
          <p className="newsletter-body">One short email a month on what filled rooms, and why.</p>
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email address"
            aria-invalid="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="newsletter-button">
            <span className="newsletter-icon" aria-hidden="true">
              <span className="newsletter-spinner" />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="tm">
              <span className="sr-only">Subscribe</span>
              <span aria-hidden="true" className="tm-w">
                <span className="tm-g">S</span>
                <span className="tm-g">u</span>
                <span className="tm-g">b</span>
                <span className="tm-g">s</span>
                <span className="tm-g">c</span>
                <span className="tm-g">r</span>
                <span className="tm-g">i</span>
                <span className="tm-g">b</span>
                <span className="tm-g">e</span>
              </span>
            </span>
          </button>
          <span className="sr-only" role="status">
            {status === "success" ? "Thank you for subscribing!" : ""}
          </span>
        </form>
      </div>

      <div className="container footer-grid">
        <nav className="footer-col" aria-label="Footer">
          <p className="footer-label label">Explore</p>
          <ul className="footer-links">
            <li>
              <a className="footer-link" href="#work">
                Work
              </a>
            </li>
            <li>
              <a className="footer-link" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="footer-link" href="#process">
                Process
              </a>
            </li>
            <li>
              <a className="footer-link" href="#pricing">
                Pricing
              </a>
            </li>
            <li>
              <a className="footer-link" href="#journal">
                Journal
              </a>
            </li>
            <li>
              <a className="footer-link" href="#pricing">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer-col footer-contact">
          <p className="footer-label label">Say hello</p>
          <a className="footer-email" href="mailto:hello@example.com">
            hello@example.com
          </a>
          <a className="footer-phone" href="tel:+15550142290">
            +1 (555) 014-2290
          </a>
          <address className="footer-address">
            <span>Studio 4, 210 Kent Avenue</span>
            <span>Brooklyn, NY 11249</span>
          </address>
        </div>

        <div className="footer-col">
          <p className="footer-label label">Follow</p>
          <ul className="footer-social">
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                  <path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5m0 2.3c0-1.5 1-2.4 2.3-2.4s2.2.9 2.2 2.4V16" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-mark" aria-hidden="true">
        <svg className="mark footer-mark-glyph" width="120" height="120" viewBox="0 0 40 40" aria-hidden="true">
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
        <span className="footer-word">
          {["T", "u", "r", "n", "o", "u", "t"].map((letter, idx) => (
            <span key={idx} style={{ "--i": idx } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </span>
      </div>

      <div className="container footer-base">
        <span>© 2026 Turnout Studio</span>
        <span className="footer-legal">
          <a className="text-link" href="#main">
            Privacy
          </a>
          <a className="text-link" href="#main">
            Terms
          </a>
        </span>
        <a className="footer-top" href="#main">
          Back to top{" "}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5m-6 6 6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
