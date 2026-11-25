"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function lerpMap(
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  val: number
) {
  if (inMax === inMin) return outMin;
  return outMin + ((val - inMin) * (outMax - outMin)) / (inMax - inMin);
}

function RevealChar({
  char,
  charIndex,
  charsTotal,
  progress,
}: {
  char: string;
  charIndex: number;
  charsTotal: number;
  progress: MotionValue<number>;
}) {
  const half = Math.ceil(charsTotal / 2);
  const distFromEdge =
    charIndex < half
      ? charIndex
      : half - Math.abs(Math.floor(charsTotal / 2) - charIndex) - 1;

  const scaleStart = lerpMap(0, half, 0.5, 2.1, distFromEdge);
  const yStart = lerpMap(0, half, 0, 60, distFromEdge);
  const rotateStart =
    charIndex < charsTotal / 2
      ? lerpMap(0, half, -4, 0, distFromEdge)
      : lerpMap(0, half, 0, 4, distFromEdge);

  const delay = 0.5 * (charsTotal > 1 ? charIndex / (charsTotal - 1) : 0);

  const localProgress = useTransform(progress, (v) => {
    const span = 1 - delay;
    if (span <= 0) return v;
    return Math.max(0, Math.min(1, (v - delay) / span));
  });

  const eased = useTransform(localProgress, (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  });

  const scale = useTransform(eased, [0, 1], [scaleStart, 1]);
  const y = useTransform(eased, [0, 1], [yStart, 0]);
  const rotate = useTransform(eased, [0, 1], [rotateStart, 0]);
  const blurVal = useTransform(eased, [0, 1], [12, 0]);
  const opacity = useTransform(eased, [0, 1], [0, 1]);
  const filter = useTransform(blurVal, (b) => `blur(${b}px)`);

  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{
        scale,
        y,
        rotate,
        filter,
        opacity,
        transformOrigin: "50% 100%",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function TextRevealSection({
  text = "If you can dream it, you can prompt it into existence.",
  className = "text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl",
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1.4", "start 0.15"],
  });

  const chars = text.split("");

  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="flex min-h-64 items-center justify-center overflow-hidden px-8"
        >
          <p className={`text-center px-8 ${className}`}>
            {chars.map((char, i) => (
              <RevealChar
                key={i}
                char={char}
                charIndex={i}
                charsTotal={chars.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
