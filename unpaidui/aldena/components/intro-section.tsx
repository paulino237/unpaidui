"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

const STATEMENT_P1 =
  "We're a brand and editorial studio for companies that would rather be understood than noticed. We build identities, publications, and content systems with the patience of print.";

const STATEMENT_P2 =
  "Fewer projects, closer attention, work that reads the same on a billboard as it does on a business card.";

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.35, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className="inline-block transition-colors duration-150"
    >
      {word}&nbsp;
    </motion.span>
  );
}

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt for left video card
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Scroll reveal progress for words
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const wordsP1 = STATEMENT_P1.split(" ");
  const wordsP2 = STATEMENT_P2.split(" ");
  const totalWords = wordsP1.length + wordsP2.length;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full overflow-hidden bg-black px-6 py-28 sm:px-12 lg:px-16 lg:py-36"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-16 lg:flex-row lg:items-start lg:gap-24">
        {/* Left Column: 3D Tilting Video Card + Capsule Button */}
        <div className="flex flex-col items-start gap-8">
          {/* Card with 3D tilt perspective */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-[280px] w-[280px] cursor-pointer overflow-hidden bg-black"
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="relative h-full w-full overflow-hidden bg-black"
            >
              {/* Looping muted background video */}
              <video
                src="https://assets.mixkit.co/videos/44061/44061-720.mp4"
                poster="https://framerusercontent.com/images/yQdsDc12WdOZw3397ovfStNhCeo.png?width=1280&height=720"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />

              {/* Noise overlay texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "128px auto",
                }}
              />

              {/* Centered Serif Italic "Aldena" */}
              <div className="absolute inset-0 flex items-center justify-center">
                <em className="font-serif text-[32px] font-normal not-italic italic tracking-[-0.03em] text-white">
                  Aldena
                </em>
              </div>
            </motion.div>
          </div>

          {/* Capsule Button: More About Us */}
          <Link
            href="#about"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-6 py-3 transition-colors duration-300 hover:border-white hover:bg-white"
          >
            <span className="font-sans text-[13px] font-semibold tracking-[-0.03em] uppercase text-white transition-colors duration-300 group-hover:text-black">
              More About Us
            </span>
          </Link>
        </div>

        {/* Right Column: Scroll-reveal Large Statement + Founder attribution */}
        <div className="flex max-w-[960px] flex-1 flex-col gap-14">
          {/* Statement Paragraphs */}
          <div className="font-sans text-[28px] font-semibold leading-[1.25] tracking-[-0.04em] text-white sm:text-[38px] lg:text-[46px] xl:text-[50px]">
            <p className="mb-6">
              {wordsP1.map((word, i) => {
                const start = i / totalWords;
                const end = (i + 1) / totalWords;
                return (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>
            <p>
              {wordsP2.map((word, i) => {
                const idx = wordsP1.length + i;
                const start = idx / totalWords;
                const end = (idx + 1) / totalWords;
                return (
                  <ScrollWord
                    key={idx}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>
          </div>

          {/* Founder Attribution Row */}
          <div className="flex items-center gap-3.5 border-t border-white/10 pt-8">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="https://framerusercontent.com/images/uJBlWSLvyvXecvCjtO3dd7DrJk.png?width=1200&height=900"
                alt="Aldena Rhodes"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[15px] font-medium tracking-[-0.04em] text-white">
                Aldena Rhodes
              </span>
              <span className="font-sans text-[14px] font-medium tracking-[-0.03em] text-white/60">
                Founder &amp; Creative Director
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
