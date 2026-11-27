"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const TEXT =
  "Modern teams use our platform to elevate every customer touchpoint, blending human expertise with AI capabilities in a unified system that drives continuous improvement across all channels.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [4, 0]);

  return (
    <span className="mr-2 inline-block lg:mr-3">
      <motion.span
        style={{
          opacity,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = TEXT.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section ref={containerRef} className="w-full bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-3xl font-medium text-left leading-snug tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-snug">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
