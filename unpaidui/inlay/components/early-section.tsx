"use client";

import { useState } from "react";

export function EarlySection() {
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

  return (
    <section className="section early" aria-labelledby="early-title" data-dock-hide="true">
      <div className="early-floats" aria-hidden="true">
        <span className="early-float" style={{ left: "9%", top: "18%", "--s": 140, "--r": -8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <path d="M12 3.5l7.5 3v5.2c0 4.3-3.1 7.6-7.5 8.8-4.4-1.2-7.5-4.5-7.5-8.8V6.5z"></path>
            <path d="M9 12l2.2 2.2L15.5 10"></path>
          </svg>
        </span>
        <span className="early-float" data-tone="ultra" style={{ left: "20%", top: "64%", "--s": -90, "--r": 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17v3"></path>
            <rect x="4" y="7.5" width="16.5" height="12" rx="2.5"></rect>
            <path d="M16 13.5h1.5"></path>
          </svg>
        </span>
        <span className="early-float" style={{ left: "4%", top: "84%", "--s": 60, "--r": 10 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <circle cx="12" cy="12" r="8.5"></circle>
            <path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z"></path>
          </svg>
        </span>
        <span className="early-float" data-tone="citrine" style={{ left: "30%", top: "8%", "--s": -60, "--r": 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <path d="M13 3L5 13.5h6L10.5 21 19 10.5h-6z"></path>
          </svg>
        </span>
        <span className="early-float" style={{ left: "84%", top: "14%", "--s": 110, "--r": 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <rect x="3" y="5.5" width="18" height="13" rx="2.5"></rect>
            <path d="M3 10h18M7 15h3"></path>
          </svg>
        </span>
        <span className="early-float" style={{ left: "74%", top: "70%", "--s": -120, "--r": -6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <path d="M10 4c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6zM18 14.5c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8z"></path>
          </svg>
        </span>
        <span className="early-float" data-tone="ink" style={{ left: "93%", top: "52%", "--s": 70, "--r": -10 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <rect x="3.5" y="5" width="17" height="15" rx="3"></rect>
            <path d="M3.5 10h17M8 3v4M16 3v4"></path>
          </svg>
        </span>
        <span className="early-float" style={{ left: "66%", top: "6%", "--s": -40, "--r": 5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
            <rect x="4" y="4" width="6" height="6" rx="1.2"></rect>
            <rect x="14" y="4" width="6" height="6" rx="1.2"></rect>
            <rect x="4" y="14" width="6" height="6" rx="1.2"></rect>
            <path d="M14 14h2v2M18 18h2v2h-2M14 20v-2M20 14h0"></path>
          </svg>
        </span>
      </div>

      <div className="container">
        <div className="head early-head">
          <span className="chip" data-reveal="fade">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
              <path d="M10 4c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6zM18 14.5c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8z"></path>
            </svg>
            Early access
          </span>
          <h2 id="early-title" className="tw-host h2" data-reveal="none">
            <span>Inlay Pay is <span className="tw">opening up</span>.</span>
          </h2>
          <p className="lead" data-reveal="true" style={{ "--d": "120ms" }}>
            We&apos;re switching it on country by country. Leave your email and we&apos;ll tell you the day it reaches you.
          </p>

          <form className="early-form" noValidate onSubmit={handleSubmit} data-reveal="true" style={{ "--d": "220ms" }} data-state={status}>
            <label className="sr-only" htmlFor="early-email">Email address</label>
            <input
              id="early-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              aria-describedby="early-note"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              className="btn btn-ultra status-btn"
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
                <span className="sr-only">{status === "success" ? "Added to list" : "Join the list"}</span>
                <span aria-hidden="true" className="tm-w">
                  {status === "success" ? (
                    <>
                      <span className="tm-g">A</span><span className="tm-g">d</span><span className="tm-g">d</span><span className="tm-g">e</span><span className="tm-g">d</span>
                    </>
                  ) : (
                    <>
                      <span className="tm-g">J</span><span className="tm-g">o</span><span className="tm-g">i</span><span className="tm-g">n</span>
                    </>
                  )}
                </span>
                {status !== "success" && (
                  <>
                    <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
                    <span aria-hidden="true" className="tm-w"><span className="tm-g">t</span><span className="tm-g">h</span><span className="tm-g">e</span></span>
                    <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
                    <span aria-hidden="true" className="tm-w"><span className="tm-g">l</span><span className="tm-g">i</span><span className="tm-g">s</span><span className="tm-g">t</span></span>
                  </>
                )}
              </span>
            </button>
          </form>

          <p id="early-note" className="small early-note" aria-live="polite">
            <span className="tm">
              <span className="sr-only">Live now in the EU, the UK and the US.</span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">L</span><span className="tm-g">i</span><span className="tm-g">v</span><span className="tm-g">e</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">n</span><span className="tm-g">o</span><span className="tm-g">w</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">i</span><span className="tm-g">n</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">t</span><span className="tm-g">h</span><span className="tm-g">e</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">E</span><span className="tm-g">U</span><span className="tm-g">,</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">t</span><span className="tm-g">h</span><span className="tm-g">e</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">U</span><span className="tm-g">K</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">a</span><span className="tm-g">n</span><span className="tm-g">d</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">t</span><span className="tm-g">h</span><span className="tm-g">e</span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g"> </span></span>
              <span aria-hidden="true" className="tm-w"><span className="tm-g">U</span><span className="tm-g">S</span><span className="tm-g">.</span></span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
