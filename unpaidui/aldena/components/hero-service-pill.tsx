"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SERVICES = [
  {
    id: "01",
    num: "01/04",
    title: "Brand Identity",
    description: "We believe a brand identity is a body of work, not just a logo.",
  },
  {
    id: "02",
    num: "02/04",
    title: "Visual Design",
    description: "Design systems that stay sharp across every touchpoint.",
  },
  {
    id: "03",
    num: "03/04",
    title: "Content & Voice",
    description: "Words and stories that make your brand sound like itself.",
  },
  {
    id: "04",
    num: "04/04",
    title: "Brand Refresh",
    description: "Repositioned interfaces and motion that bring the brand to life.",
  },
];

export function HeroServicePill() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const intervalTime = 2500; // 2.5s per service (from Framer interval: 2.5)
    const stepTime = 25; // 40 steps/sec

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((c) => (c + 1) % SERVICES.length);
          return 0;
        }
        return prev + (stepTime / intervalTime) * 100;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [currentIdx]);

  const handlePrev = () => {
    setCurrentIdx((c) => (c - 1 + SERVICES.length) % SERVICES.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIdx((c) => (c + 1) % SERVICES.length);
    setProgress(0);
  };

  const service = SERVICES[currentIdx];

  return (
    <div className="relative w-full max-w-[400px] border border-transparent bg-black/60 p-4 backdrop-blur-md">
      {/* Top row: progress bar */}
      <div className="relative mb-2 h-px w-full bg-white/20">
        <div
          className="absolute top-0 bottom-0 left-0 bg-white transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Second row: arrows and index */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="flex h-6 w-6 cursor-pointer items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
              aria-hidden="true"
            >
              <polyline
                points="120 96 152 128 120 160"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="92"
                y1="128"
                x2="152"
                y2="128"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="flex h-6 w-6 cursor-pointer items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <polyline
                points="120 96 152 128 120 160"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="92"
                y1="128"
                x2="152"
                y2="128"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <span className="font-sans text-[12px] font-medium tracking-tight text-white">
          {service.num}
        </span>
      </div>

      {/* Service content with smooth text transition */}
      <div className="relative min-h-[70px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-1.5"
          >
            <h4 className="font-sans text-[20px] font-semibold tracking-[-0.04em] text-white">
              {service.title}
            </h4>
            <p className="font-sans text-[14px] font-medium leading-[1.3] tracking-[-0.03em] text-white/80">
              {service.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
