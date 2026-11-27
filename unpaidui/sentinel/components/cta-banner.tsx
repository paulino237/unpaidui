"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { AsciiCanvas } from "./ascii-canvas";

export function CtaBanner() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const f =
    "linear-gradient(to right, transparent 0%, black 13%, black 27%, transparent 43%, transparent 57%, black 73%, black 87%, transparent 100%)";
  const m =
    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)";

  return (
    <section className="relative overflow-hidden [isolation:isolate]">
      {mounted && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto h-full max-w-[1440px]">
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maskImage: m,
                WebkitMaskImage: m,
                filter: "brightness(1.3)",
              }}
            >
              <div
                className="h-full w-full"
                style={{
                  maskImage: f,
                  WebkitMaskImage: f,
                }}
              >
                <AsciiCanvas
                  color="#ffffff"
                  intensity={0}
                  elementSize={12}
                  videoUrl="/sample-video-2.mp4"
                  noiseScale={25}
                  hasCursorInteraction={false}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[130%] w-[70%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 50%, transparent 78%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center py-28 text-center sm:py-36 lg:py-44">
          <h2 className="text-balance font-serif text-4xl font-normal leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.75rem]">
            Take control of every threat across your org
          </h2>
          <p className="mt-5 max-w-md text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Unify detection, response, and governance on one platform — and give your team a single
            line of sight from day one.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#get-started"
              style={{ "--cut": "9px" } as React.CSSProperties}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-10 px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-foreground text-background hover:bg-foreground/85"
            >
              Get started
            </Link>
            <span
              style={{ "--cut": "9px" } as React.CSSProperties}
              className="inline-flex h-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
            >
              <Link
                href="#demo"
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
              >
                Book a demo
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
