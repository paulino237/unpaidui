"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CornerPlus } from "./corner-plus";
import { animate, useInView } from "motion/react";

function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl tabular-nums">
      {displayValue}
      {suffix}
    </div>
  );
}

const stats = [
  {
    num: 97,
    suffix: "%",
    label: "Reduction in alert noise",
    brand: "Stripe",
    logoStyle: {
      width: "53px",
      height: "22px",
      mask: "url(/logos/stripe_wordmark.svg) center / contain no-repeat",
      WebkitMask: "url(/logos/stripe_wordmark.svg) center / contain no-repeat",
    },
  },
  {
    num: 6,
    suffix: "",
    label: "Tools replaced by one platform",
    brand: "Dropbox",
    logoStyle: {
      width: "96px",
      height: "26px",
      mask: "url(/logos/dropbox_wordmark.svg) center / contain no-repeat",
      WebkitMask: "url(/logos/dropbox_wordmark.svg) center / contain no-repeat",
    },
  },
  {
    num: 10,
    suffix: "x",
    label: "Faster mean time to respond",
    brand: "Spotify",
    logoStyle: {
      width: "73px",
      height: "22px",
      mask: "url(/logos/spotify_wordmark.svg) center / contain no-repeat",
      WebkitMask: "url(/logos/spotify_wordmark.svg) center / contain no-repeat",
    },
  },
];

export function OutcomesSection() {
  return (
    <>
      <section
        id="customers"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10"
      >
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-6">
            <h2 className="text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
              Real outcomes from teams running{" "}
              <span className="font-sans font-semibold tracking-tight">Sentinel</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              From faster detection to a leaner stack, security leaders cut the noise and consolidate
              tooling the moment Sentinel goes live — with full governance from day one.
            </p>
          </div>

          <div className="relative border border-border">
            <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
            <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
            <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
            <CornerPlus className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

            {stats.map((item, idx) => (
              <div
                key={item.label}
                className={`relative flex items-center justify-between gap-6 px-6 py-9 sm:px-8 sm:py-11 ${
                  idx > 0 ? "border-t border-border" : ""
                }`}
              >
                {idx > 0 && (
                  <>
                    <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
                    <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
                  </>
                )}
                <div>
                  <Counter value={item.num} suffix={item.suffix} />
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base">{item.label}</p>
                </div>

                <span
                  role="img"
                  aria-label={item.brand}
                  style={item.logoStyle}
                  className="block bg-foreground opacity-60 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
        <div className="relative border border-border">
          <CornerPlus className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <CornerPlus className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
          <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <CornerPlus className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

          <div className="grid gap-y-8 lg:grid-cols-[1.55fr_1fr]">
            <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <h2 className="text-balance font-serif text-[1.75rem] font-normal leading-[1.22] tracking-[-0.01em] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.2]">
                <span
                  role="img"
                  aria-label="Spotify"
                  style={{
                    height: "0.78em",
                    width: "2.588em",
                    verticalAlign: "-0.02em",
                    mask: "url(/logos/spotify_wordmark.svg) center / contain no-repeat",
                    WebkitMask: "url(/logos/spotify_wordmark.svg) center / contain no-repeat",
                  }}
                  className="mr-[0.34em] inline-block bg-foreground align-middle"
                />
                unified every security signal across cloud, endpoint, and identity — giving each
                team one provable source of truth.
              </h2>
            </div>

            <div className="relative flex flex-col justify-center gap-7 px-6 pb-10 sm:px-10 sm:pb-14 lg:border-l lg:border-border lg:px-12 lg:py-16">
              <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
              <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Spotify replaced six disconnected tools with Sentinel, wiring detection, response,
                and audit into a single governed pipeline — and cut mean time to respond by 10×.
              </p>

              <span
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex h-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] self-start"
              >
                <Link
                  href="#case-study"
                  style={{ "--cut": "9px" } as React.CSSProperties}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
                >
                  Read the case study
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
