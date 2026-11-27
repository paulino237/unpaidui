"use client";

import { useState } from "react";

function NumberTicker({ value }: { value: string }) {
  return (
    <span className="nr">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="nr-v">
        {value.split("").map((char, idx) => {
          if (char === "$" || char === ",") {
            return (
              <span key={idx} className="nr-p">
                {char}
              </span>
            );
          }
          const digit = parseInt(char, 10);
          const targetY = -((20 + digit) * 2);
          return (
            <span key={idx} className="nr-p">
              <span className="nr-d">
                <span className="nr-ghost">{digit}</span>
                <span
                  aria-hidden="true"
                  className="nr-strip"
                  style={{
                    transform: `translateY(${targetY}%)`,
                    transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {[...Array(5)]
                    .flatMap(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                    .map((n, i) => (
                      <span key={i}>{n}</span>
                    ))}
                </span>
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

export function PricingSection() {
  const [billing, setBilling] = useState<"quarterly" | "yearly">("quarterly");

  const isYearly = billing === "yearly";

  const momentPrice = isYearly ? "$5,780" : "$6,800";
  const momentNote = isYearly
    ? "Billed yearly · $69,360 a year"
    : "Billed quarterly · $20,400 a quarter";

  const seasonPrice = isYearly ? "$10,625" : "$12,500";
  const seasonNote = isYearly
    ? "Billed yearly · $127,500 a year"
    : "Billed quarterly · $37,500 a quarter";

  return (
    <section id="pricing" className="section pricing" aria-labelledby="pricing-title">
      <div className="container pricing-grid">
        <div className="pricing-intro">
          <span className="tag" data-reveal="true">
            Pricing
          </span>
          <h2 id="pricing-title" className="h2" data-reveal="true" style={{ "--d": "80ms" } as React.CSSProperties}>
            Pick your pace.
          </h2>

          <div
            className="billing"
            role="radiogroup"
            aria-label="Billing"
            data-reveal="true"
            style={{ "--d": "160ms" } as React.CSSProperties}
            data-billing={billing}
          >
            <span className="billing-thumb" aria-hidden="true" />
            <button
              type="button"
              role="radio"
              aria-checked={!isYearly}
              onClick={() => setBilling("quarterly")}
            >
              Quarterly
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={isYearly}
              onClick={() => setBilling("yearly")}
            >
              Yearly <span className="billing-save">Save 15%</span>
            </button>
          </div>

          <a
            className="custom"
            data-reveal="true"
            style={{ "--d": "220ms" } as React.CSSProperties}
            href="#pricing"
          >
            <span className="custom-photo">
              <img src="/images/team-maya.webp" alt="" width="96" height="96" loading="lazy" />
              <span className="custom-online" aria-hidden="true" />
            </span>
            <span className="custom-copy">
              <strong>Planning a tour or a festival?</strong>
              <span>Let&#x27;s talk</span>
            </span>
            <span className="arrow-dot arrow-dot-ink" style={{ width: 34, height: 34 }} aria-hidden="true">
              <span className="throw" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </span>
          </a>
        </div>

        {/* Plan 1: Moment */}
        <article className="plan" data-reveal="true" style={{ "--d": "120ms" } as React.CSSProperties} aria-labelledby="plan-moment">
          <div className="plan-head">
            <div className="plan-name-row">
              <h3 id="plan-moment" className="plan-name">
                Moment
              </h3>
            </div>
            <p className="plan-audience">One flagship event a quarter, fully produced.</p>
            <p className="plan-price">
              <NumberTicker value={momentPrice} />
              <span className="plan-per">/mo</span>
            </p>
            <p className="plan-note from-left">{momentNote}</p>
          </div>

          <ul className="plan-features is-in js-draw">
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              One event every quarter
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Concept, build and run of show
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Up to 150 guests
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Five creators cast per event
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              48-hour edit, 40 assets
            </li>
          </ul>

          <a className="action action-dark action-md plan-action" href="#pricing">
            <span className="action-pill">
              <span className="sr-only">Book Moment</span>
              <span className="roll" aria-hidden="true">
                {"Book Moment".split("").map((c, i) => (
                  <span key={i} className="roll-c" style={{ "--i": i } as React.CSSProperties}>
                    <span>{c === " " ? "\u00A0" : c}</span>
                    <span>{c === " " ? "\u00A0" : c}</span>
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
        </article>

        {/* Plan 2: Season */}
        <article className="plan is-highlighted on-dark" data-reveal="true" style={{ "--d": "180ms" } as React.CSSProperties} aria-labelledby="plan-season">
          <div className="plan-head">
            <div className="plan-name-row">
              <h3 id="plan-season" className="plan-name">
                Season
              </h3>
              <span className="plan-badge">Most booked</span>
            </div>
            <p className="plan-audience">A moment every month and a community program.</p>
            <p className="plan-price">
              <NumberTicker value={seasonPrice} />
              <span className="plan-per">/mo</span>
            </p>
            <p className="plan-note from-left">{seasonNote}</p>
          </div>

          <ul className="plan-features is-in js-draw">
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              One event every month
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              A weekly community program
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Waitlists and RSVP tools
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              Fifteen creators cast a month
            </li>
            <li>
              <span className="plan-tick">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="draw" pathLength="1" d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              An always-on crew, 150+ assets a month
            </li>
          </ul>

          <a className="action action-light action-md plan-action" href="#pricing">
            <span className="action-pill">
              <span className="sr-only">Book Season</span>
              <span className="roll" aria-hidden="true">
                {"Book Season".split("").map((c, i) => (
                  <span key={i} className="roll-c" style={{ "--i": i } as React.CSSProperties}>
                    <span>{c === " " ? "\u00A0" : c}</span>
                    <span>{c === " " ? "\u00A0" : c}</span>
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
        </article>
      </div>

      <p className="container pricing-fine small" data-reveal="true">
        Retainers cover our team. Production budgets are quoted per event and approved before anything is spent.{" "}
        <span className="tm">
          <span className="sr-only">
            {isYearly
              ? "Yearly retainers renew annually."
              : "Quarterly retainers renew every three months."}
          </span>
          <span aria-hidden="true" className="tm-w">
            {isYearly ? (
              <span className="tm-g">Yearly retainers renew annually.</span>
            ) : (
              <span className="tm-g">Quarterly retainers renew every three months.</span>
            )}
          </span>
        </span>
      </p>
    </section>
  );
}
