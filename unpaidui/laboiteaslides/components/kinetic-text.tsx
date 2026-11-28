"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { clsx } from "clsx";

interface KineticTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export function KineticText({
  children,
  className,
  as: Component = "div",
  delay = 0,
  stagger = 0.035,
  highlightWords = [],
  highlightClass = "text-[#6630ff]",
}: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const words = children.split(" ");

  return (
    <Component ref={ref as any} className={clsx("inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline flex-wrap">
        {words.map((word, i) => {
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === word.toLowerCase().replace(/[^a-zA-Z0-9àâäéèêëîïôöùûüç]/g, "")
          );

          return (
            <span
              key={i}
              className="inline-block overflow-hidden align-top mr-[0.28em] py-[0.08em] -my-[0.08em]"
            >
              <motion.span
                className={clsx("inline-block will-change-transform", isHighlighted && highlightClass)}
                initial={{ y: "115%", rotateZ: 3, opacity: 0 }}
                animate={
                  isInView
                    ? { y: "0%", rotateZ: 0, opacity: 1 }
                    : { y: "115%", rotateZ: 3, opacity: 0 }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1], // Authentic Awwwards ease::out curve
                  delay: delay + i * stagger,
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
