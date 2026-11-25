"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  projectType: string;
  avatar: string;
  bgColor: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "marcus",
    name: "Marcus Bennett",
    role: "Founder of Northlight Studio",
    projectType: "A Brand Identity Project",
    avatar:
      "https://framerusercontent.com/images/CwRDnaK71gnb49cyGrerAsBcbo.png?width=1200&height=900",
    bgColor: "#ffffff",
    quote:
      "From day one they understood exactly who we wanted to become. The identity they crafted feels bold, timeless, and unmistakably ours—it has completely changed how people recognise and remember us.",
  },
  {
    id: "elena",
    name: "Elena Ruiz",
    role: "Head of Product at Cadence Labs",
    projectType: "A Visual Design Project",
    avatar:
      "https://framerusercontent.com/images/OffbPo1xN9en13sHjYeafadd2w8.png?width=1200&height=900",
    bgColor: "#eeeeee",
    quote:
      "Every screen they touched came back sharper, cleaner, and more considered. The visual system they built gives our product a sense of polish and clarity we simply could not achieve on our own.",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Brand Lead at Veritas Group",
    projectType: "A Content & Voice Project",
    avatar:
      "https://framerusercontent.com/images/soZrFw6hoHsNFJED4LLBoszdMyE.png?width=2400&height=1800",
    bgColor: "#ffffff",
    quote:
      "They found the words we had been struggling to say for years. Our messaging finally sounds human, confident, and consistent—everything we publish now feels like it speaks with one clear voice.",
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card 1 scroll peel-away transform: stays pinned 0 -> 0.25, peels away 0.25 -> 0.50
  const card1Y = useTransform(scrollYProgress, [0.15, 0.45], [0, -850]);
  const card1X = useTransform(scrollYProgress, [0.15, 0.45], [0, 45]);
  const card1Rotate = useTransform(scrollYProgress, [0.15, 0.45], [0, 8]);
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.42, 0.46], [1, 1, 0]);

  // Card 2 scroll peel-away transform: stays pinned 0.45 -> 0.65, peels away 0.65 -> 0.90
  const card2Y = useTransform(scrollYProgress, [0.55, 0.85], [0, -850]);
  const card2X = useTransform(scrollYProgress, [0.55, 0.85], [0, 45]);
  const card2Rotate = useTransform(scrollYProgress, [0.55, 0.85], [0, 8]);
  const card2Opacity = useTransform(scrollYProgress, [0.55, 0.82, 0.86], [1, 1, 0]);

  // Subtitle project name transitions
  const subtitle1Opacity = useTransform(scrollYProgress, [0, 0.42, 0.46], [1, 1, 0]);
  const subtitle2Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.82, 0.86],
    [0, 1, 1, 0]
  );
  const subtitle3Opacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);

  return (
    <section
      id="testimonial"
      ref={containerRef}
      className="relative z-[3] h-[320vh] w-full bg-black"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center">
          {/* Stacked Cards Deck */}
          <div className="relative flex h-[495px] w-full max-w-[742px] items-center justify-center">
            {/* Card 3 (Priya Nair) - Base Card */}
            <div
              style={{ backgroundColor: TESTIMONIALS[2].bgColor }}
              className="absolute inset-0 flex flex-col justify-between p-6 shadow-2xl md:p-8"
            >
              <TestimonialContent testimonial={TESTIMONIALS[2]} />
            </div>

            {/* Card 2 (Elena Ruiz) - Middle Card */}
            <motion.div
              style={{
                y: card2Y,
                x: card2X,
                rotate: card2Rotate,
                opacity: card2Opacity,
                backgroundColor: TESTIMONIALS[1].bgColor,
              }}
              className="absolute inset-0 flex flex-col justify-between p-6 shadow-2xl md:p-8 will-change-transform"
            >
              <TestimonialContent testimonial={TESTIMONIALS[1]} />
            </motion.div>

            {/* Card 1 (Marcus Bennett) - Top Card */}
            <motion.div
              style={{
                y: card1Y,
                x: card1X,
                rotate: card1Rotate,
                opacity: card1Opacity,
                backgroundColor: TESTIMONIALS[0].bgColor,
              }}
              className="absolute inset-0 flex flex-col justify-between p-6 shadow-2xl md:p-8 will-change-transform"
            >
              <TestimonialContent testimonial={TESTIMONIALS[0]} />
            </motion.div>
          </div>

          {/* Bottom Labels Row */}
          <div className="mt-8 flex flex-col items-center gap-2 select-none">
            <span className="font-sans text-[13px] font-semibold tracking-[-0.02em] uppercase text-white/90">
              Hear from our clients
            </span>

            {/* Dynamic Project Type Subtitle */}
            <div className="relative h-5 w-80 text-center">
              <motion.span
                style={{ opacity: subtitle1Opacity }}
                className="absolute inset-0 font-sans text-[13px] font-medium tracking-[-0.02em] text-white/60"
              >
                {TESTIMONIALS[0].projectType}
              </motion.span>
              <motion.span
                style={{ opacity: subtitle2Opacity }}
                className="absolute inset-0 font-sans text-[13px] font-medium tracking-[-0.02em] text-white/60"
              >
                {TESTIMONIALS[1].projectType}
              </motion.span>
              <motion.span
                style={{ opacity: subtitle3Opacity }}
                className="absolute inset-0 font-sans text-[13px] font-medium tracking-[-0.02em] text-white/60"
              >
                {TESTIMONIALS[2].projectType}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialContent({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <>
      {/* Top: SVG Quote Icon and Quote Text */}
      <div className="flex flex-col gap-5">
        {/* Exact Framer Quote SVG */}
        <div className="h-7 w-9 opacity-10">
          <svg
            viewBox="0 0 36.089 28"
            className="h-full w-full fill-black"
            aria-hidden="true"
          >
            <path d="M 0.121 6.125 C 0.121 4.458 0.774 3.042 2.083 1.875 C 3.391 0.625 4.933 0 6.71 0 C 7.457 0 8.251 0.166 9.093 0.5 L 8.953 0.375 L 9.793 0.75 L 9.935 0.75 C 10.215 0.917 10.541 1.125 10.915 1.375 C 10.915 1.458 11.056 1.625 11.336 1.875 C 13.673 3.958 14.654 7.083 14.281 11.25 C 13.907 17.25 10.355 22.667 3.625 27.5 C 3.251 27.834 2.83 28 2.364 28 C 1.615 28 1.008 27.708 0.541 27.125 C -0.3 26.125 -0.16 25.209 0.961 24.375 C 6.475 20.375 9.467 16.042 9.935 11.375 C 8.906 11.958 7.831 12.25 6.71 12.25 C 4.933 12.25 3.392 11.667 2.082 10.5 C 0.775 9.25 0.121 7.792 0.121 6.125 Z M 21.851 6.125 C 21.851 4.458 22.506 3.042 23.814 1.875 C 25.122 0.625 26.665 0 28.441 0 C 29.188 0 29.983 0.166 30.824 0.5 L 30.684 0.375 C 30.964 0.458 31.244 0.583 31.524 0.75 L 31.666 0.75 C 32.039 0.917 32.366 1.125 32.646 1.375 C 32.646 1.458 32.787 1.625 33.067 1.875 C 35.404 3.958 36.385 7.083 36.012 11.25 C 35.638 17.25 32.086 22.667 25.356 27.5 C 24.982 27.834 24.561 28 24.095 28 C 23.347 28 22.786 27.708 22.412 27.125 C 21.478 26.125 21.571 25.209 22.692 24.375 C 28.206 20.375 31.198 16.042 31.666 11.375 C 30.637 11.958 29.563 12.25 28.441 12.25 C 26.665 12.25 25.122 11.667 23.813 10.5 C 22.506 9.25 21.851 7.792 21.851 6.125 Z" />
          </svg>
        </div>

        {/* Quote text in Inter 24px font-semibold */}
        <h4 className="max-w-[580px] font-sans text-[20px] font-semibold leading-[1.35] tracking-[-0.04em] text-black md:text-[24px]">
          {testimonial.quote}
        </h4>
      </div>

      {/* Bottom Profile Row: Name & Role on Left, Square Portrait on Right */}
      <div className="flex items-end justify-between border-t border-black/5 pt-4">
        <div className="flex flex-col gap-1">
          <p className="font-sans text-[17px] font-semibold tracking-[-0.03em] text-black md:text-[18px]">
            {testimonial.name}
          </p>
          <p className="font-sans text-[14px] font-medium tracking-[-0.02em] text-[#605f5f]">
            {testimonial.role}
          </p>
        </div>

        {/* 120x120 High-Res Square Client Portrait */}
        <div className="relative h-[90px] w-[90px] flex-shrink-0 overflow-hidden bg-neutral-200 md:h-[120px] md:w-[120px]">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
      </div>
    </>
  );
}
