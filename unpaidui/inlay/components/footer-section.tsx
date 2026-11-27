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
    }, 600);
  };

  const scrollToClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("claim");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" data-dock-hide="true">
      <div className="container">
        <div className="foot-claim" data-reveal="none" style={{ "--len": 12 }}>
          <p className="foot-kicker">Your page is waiting at</p>
          <a className="foot-url" aria-label="Claim inlay.me/you" href="#claim" onClick={scrollToClaim}>
            <span className="foot-domain" aria-hidden="true">
              <span className="foot-ch" style={{ "--i": 0 }}>i</span>
              <span className="foot-ch" style={{ "--i": 1 }}>n</span>
              <span className="foot-ch" style={{ "--i": 2 }}>l</span>
              <span className="foot-ch" style={{ "--i": 3 }}>a</span>
              <span className="foot-ch" style={{ "--i": 4 }}>y</span>
              <span className="foot-ch" style={{ "--i": 5 }}>.</span>
              <span className="foot-ch" style={{ "--i": 6 }}>m</span>
              <span className="foot-ch" style={{ "--i": 7 }}>e</span>
              <span className="foot-ch" style={{ "--i": 8 }}>/</span>
            </span>
            <span className="foot-handle" aria-hidden="true">
              <span className="tm">
                <span className="sr-only">you</span>
                <span aria-hidden="true" className="tm-w">
                  <span className="tm-g">y</span>
                  <span className="tm-g">o</span>
                  <span className="tm-g">u</span>
                </span>
              </span>
            </span>
          </a>
          <a className="btn btn-ink btn-lg" href="#claim" onClick={scrollToClaim}>
            <span className="sr-only">Claim your page</span>
            <span className="roll" aria-hidden="true">
              <span className="roll-c" style={{ "--i": 0 }}><span>C</span><span>C</span></span>
              <span className="roll-c" style={{ "--i": 1 }}><span>l</span><span>l</span></span>
              <span className="roll-c" style={{ "--i": 2 }}><span>a</span><span>a</span></span>
              <span className="roll-c" style={{ "--i": 3 }}><span>i</span><span>i</span></span>
              <span className="roll-c" style={{ "--i": 4 }}><span>m</span><span>m</span></span>
              <span className="roll-c" style={{ "--i": 5 }}><span> </span><span> </span></span>
              <span className="roll-c" style={{ "--i": 6 }}><span>y</span><span>y</span></span>
              <span className="roll-c" style={{ "--i": 7 }}><span>o</span><span>o</span></span>
              <span className="roll-c" style={{ "--i": 8 }}><span>u</span><span>u</span></span>
              <span className="roll-c" style={{ "--i": 9 }}><span>r</span><span>r</span></span>
              <span className="roll-c" style={{ "--i": 10 }}><span> </span><span> </span></span>
              <span className="roll-c" style={{ "--i": 11 }}><span>p</span><span>p</span></span>
              <span className="roll-c" style={{ "--i": 12 }}><span>a</span><span>a</span></span>
              <span className="roll-c" style={{ "--i": 13 }}><span>g</span><span>g</span></span>
              <span className="roll-c" style={{ "--i": 14 }}><span>e</span><span>e</span></span>
            </span>
            <span className="throw" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </a>
        </div>

        <div className="foot-grid">
          <div className="foot-brand">
            <a aria-label="Inlay home" href="/">
              <span className="brand">
                <svg className="mark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="1.5" y="1.5" width="9.5" height="9.5" rx="2.6" fill="currentColor"></rect>
                  <rect className="mark-free" x="13" y="1.5" width="9.5" height="9.5" rx="2.6" fill="var(--ultra)"></rect>
                  <rect x="1.5" y="13" width="9.5" height="9.5" rx="2.6" fill="currentColor"></rect>
                  <rect x="13" y="13" width="9.5" height="9.5" rx="2.6" fill="currentColor"></rect>
                </svg>
                <span className="brand-name">Inlay</span>
              </span>
            </a>
            <form className="foot-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="foot-email" className="foot-form-title">Product notes, once a month.</label>
              <div className="foot-field" data-state={status}>
                <input
                  id="foot-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-describedby="foot-note"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                />
                <button
                  type="submit"
                  className="btn btn-ink btn-sm status-btn"
                  data-state={status}
                  aria-live="polite"
                  disabled={status === "loading"}
                >
                  <span className="status-icon" aria-hidden="true">
                    <span className="spinner" data-on={status === "loading" ? "true" : "false"}></span>
                    <span data-on={status === "success" ? "true" : "false"}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2.6">
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="tm">
                    <span className="sr-only">{status === "success" ? "Subscribed" : "Subscribe"}</span>
                    <span aria-hidden="true" className="tm-w">
                      {status === "success" ? (
                        <>
                          <span className="tm-g">S</span><span className="tm-g">a</span><span className="tm-g">v</span><span className="tm-g">e</span><span className="tm-g">d</span>
                        </>
                      ) : (
                        <>
                          <span className="tm-g">S</span><span className="tm-g">u</span><span className="tm-g">b</span><span className="tm-g">s</span><span className="tm-g">c</span><span className="tm-g">r</span><span className="tm-g">i</span><span className="tm-g">b</span><span className="tm-g">e</span>
                        </>
                      )}
                    </span>
                  </span>
                </button>
              </div>
              <p id="foot-note" className="foot-note" aria-live="polite"></p>
            </form>
          </div>

          <nav className="foot-col" aria-label="Product">
            <p className="foot-col-title">Product</p>
            <ul>
              <li><a className="text-link" href="#build">Pages</a></li>
              <li><a className="text-link" href="#pay">Inlay Pay</a></li>
              <li><a className="text-link" href="#sell">Storefront</a></li>
              <li><a className="text-link" href="#pricing">Pricing</a></li>
            </ul>
          </nav>

          <nav className="foot-col" aria-label="Resources">
            <p className="foot-col-title">Resources</p>
            <ul>
              <li><a className="text-link" href="#showcase">Showcase</a></li>
              <li><a className="text-link" href="#faq">Questions</a></li>
              <li><a className="text-link" href="#">Privacy</a></li>
              <li><a className="text-link" href="#">Terms</a></li>
            </ul>
          </nav>

          <nav className="foot-col" aria-label="Company">
            <p className="foot-col-title">Company</p>
            <ul>
              <li><a className="text-link" href="mailto:hello@inlay.me">Contact</a></li>
              <li><a className="text-link" href="mailto:hello@inlay.me?subject=Press">Press</a></li>
              <li><a className="text-link" href="mailto:hello@inlay.me?subject=Careers">Careers</a></li>
            </ul>
          </nav>
        </div>

        <div className="foot-bottom">
          <p>© 2026 Inlay Labs ApS</p>
          <p className="foot-status">
            <i aria-hidden="true"></i>All systems normal
          </p>
          <ul className="foot-legal">
            <li><a className="text-link" href="#">Privacy</a></li>
            <li><a className="text-link" href="#">Terms</a></li>
          </ul>
          <ul className="foot-social">
            <li>
              <a aria-label="Instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor"></circle>
                </svg>
              </a>
            </li>
            <li>
              <a aria-label="X" href="https://x.com/" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a aria-label="Bluesky" href="https://bsky.app/" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M6.3 4.3C8.6 6 11.1 9.5 12 11.4c.9-1.9 3.4-5.4 5.7-7.1 1.7-1.2 4.3-2.2 4.3.8 0 .6-.3 5-.5 5.7-.7 2.5-3.3 3.1-5.6 2.7 4 .7 5 3 2.8 5.2-4.2 4.3-6-1.1-6.5-2.5l-.2-.5-.2.5c-.5 1.4-2.3 6.8-6.5 2.5-2.2-2.2-1.2-4.5 2.8-5.2-2.3.4-4.9-.2-5.6-2.7C2.3 10.1 2 5.7 2 5.1c0-3 2.6-2 4.3-.8z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
