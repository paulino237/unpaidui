"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  );
}

function PenToolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function PanelsTopLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawScaleY = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleY = useSpring(rawScaleY, { stiffness: 100, damping: 30 });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  return (
    <section ref={ref} className="relative min-h-dvh w-full overflow-hidden">
      {/* Indigo gradient background (replaces WebGL fluid canvas) */}
      <div
        className="pointer-events-none absolute inset-0 -z-5"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 10%, rgba(99,102,241,0.35) 0%, rgba(3,4,10,0) 70%)",
        }}
      />

      {/* Gradient SVG with parallax scroll */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 origin-top scale-125"
        style={{ scaleY, y }}
      >
        <Image
          src="/svg/gradient-fade.svg"
          fill
          className="object-cover object-top dark:-scale-y-100"
          alt=""
          priority
        />
        <div className="from-background absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
      </motion.div>

      {/* Main content */}
      <div className="mx-auto flex min-h-dvh max-w-4xl flex-col items-start justify-center gap-6 px-4 py-20 sm:justify-start sm:gap-0 sm:py-0 sm:pt-40 lg:px-8 lg:pt-68">
        {/* Title */}
        <motion.h1
          className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="block">Design with AI —</span>
          <span className="block">
            the{" "}
            <em className="italic text-white/80">future</em> of creativity
          </span>
        </motion.h1>

        {/* Prompt Studio Card */}
        <motion.div
          className="w-full sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className="relative rounded-[2rem] rounded-b-[2.3rem] border border-black/5 bg-[#f8f8fa] p-3"
            style={{
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.1), 0 4px 16px rgba(124,58,237,0.08)",
            }}
          >
            {/* Textarea */}
            <div className="flex items-start gap-3">
              <textarea
                placeholder="Ask Kraft anything..."
                rows={2}
                className="mx-4 my-2 min-h-[3.75rem] w-full resize-none bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* Toolbar row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* Paperclip */}
                <button className="isolate flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  <PaperclipIcon />
                </button>

                {/* Reasoning */}
                <button className="isolate flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm text-gray-500 shadow-sm transition-colors hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  <LightbulbIcon />
                  <span className="hidden xs:inline">Reasoning</span>
                </button>

                {/* Create Design */}
                <button className="isolate hidden h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm text-gray-500 shadow-sm transition-colors hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:flex">
                  <PenToolIcon />
                  <span>Create Design</span>
                </button>

                {/* Wireframe */}
                <button className="isolate hidden h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm text-gray-500 shadow-sm transition-colors hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:flex">
                  <PanelsTopLeftIcon />
                  <span>Wireframe</span>
                </button>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {/* Mic */}
                <button className="isolate hidden h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:flex">
                  <MicIcon />
                </button>

                {/* Send */}
                <button className="isolate flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/60">
            Kraft can make mistakes, but learns from them.
          </p>
        </motion.div>
      </div>

      {/* Bottom subtitle + scroll arrow */}
      <motion.div
        className="absolute inset-x-0 bottom-24 mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="max-w-sm text-sm text-white/50">
          Kraft uses advanced AI to transform your ideas into stunning designs.
          Just describe what you need.
        </p>
        <div className="text-white/50">
          <ArrowDownIcon />
        </div>
      </motion.div>
    </section>
  );
}
