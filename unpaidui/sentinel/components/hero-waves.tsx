"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { AsciiCanvas } from "./ascii-canvas";

export function HeroWaves() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  const mask =
    "linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <AsciiCanvas
        color="#ffffff"
        intensity={0}
        elementSize={10}
        videoUrl="/sample-video-2.mp4"
        noiseScale={25}
        hasCursorInteraction={true}
        className="opacity-50 dark:opacity-60"
      />
    </motion.div>
  );
}
