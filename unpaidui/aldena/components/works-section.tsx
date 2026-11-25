"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  year: string;
  description: string;
  bgImage: string;
  thumbnail: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "aster-bloom",
    slug: "aster-bloom",
    title: "Aster Bloom",
    year: "2025",
    description:
      "A botanical identity for a skincare brand rooted in slow, seasonal rituals.",
    bgImage:
      "https://framerusercontent.com/images/WguPM6HPYTluOZxSMcYEgbD8qQU.png?width=2400&height=1350",
    thumbnail:
      "https://framerusercontent.com/images/hH00a4VHWtZ62VAvH51MjlEa1dA.png?width=2400&height=1350",
  },
  {
    id: "nova-grid",
    slug: "nova-grid",
    title: "Nova Grid",
    year: "2024",
    description:
      "A crisp visual system for a data platform that wanted to feel human.",
    bgImage:
      "https://framerusercontent.com/images/dr9Kjuoj8tBkGoVNCxADGYRQc0.png?width=2400&height=1350",
    thumbnail:
      "https://framerusercontent.com/images/t7BA8vHW8KWtPHPdXBrQyM50gE.png?width=2400&height=1350",
  },
  {
    id: "marrow-coffee",
    slug: "marrow-coffee",
    title: "Marrow Coffee",
    year: "2025",
    description:
      "A bold, honest identity for a roaster obsessed with origin and craft.",
    bgImage:
      "https://framerusercontent.com/images/xrJdHryeemb6EZoFAfmzsqvyA.png?width=2400&height=1800",
    thumbnail:
      "https://framerusercontent.com/images/RaLNS4VgX9hxs1sW2xYQzvlrkk.png?width=2400&height=1800",
  },
];

function ProjectShowcase({ project, index }: { project: ProjectItem; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Framer parallax: watermark big type scrolls horizontally along x by -500px as user scrolls through
  const watermarkX = useTransform(scrollYProgress, [0, 1], [150, -350]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[100vh] min-h-[750px] max-h-[1100px] w-full items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1200 }}
    >
      {/* 1. Project Background Image with Spring Zoom entrance and subtle parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 0.5, scale: 1.0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          mass: 1,
          delay: 0.1,
        }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src={project.bgImage}
          alt={`${project.title} background`}
          fill
          priority={index === 0}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* 2. Noise Texture Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-15"
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
          backgroundRepeat: "repeat",
          backgroundSize: "128px auto",
        }}
      />

      {/* 3. Big Type Monumental Watermark Text (Repeated across background with horizontal scroll shift) */}
      <motion.div
        style={{ x: watermarkX }}
        className="pointer-events-none absolute inset-0 z-[2] flex select-none flex-col justify-center overflow-hidden opacity-30 will-change-transform"
      >
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block text-center font-serif text-[clamp(5rem,14vw,13rem)] font-semibold leading-[0.85] tracking-[-0.06em] whitespace-nowrap text-white"
            >
              {project.title}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 4. Central 3D Card with Framer exact 3D tilt entrance: rotateX 45deg -> 0deg, y 100px -> 0px */}
      <motion.div
        initial={{
          opacity: 0,
          rotateX: 45,
          y: 100,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          rotateX: 0,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          mass: 1,
        }}
        style={{
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="group relative z-10 mx-auto w-full max-w-[520px] px-6 sm:w-[480px]"
      >
        <Link
          href={`#${project.slug}`}
          className="block w-full overflow-hidden cursor-pointer"
        >
          {/* Thumbnail Container with Framer zoom-out hover: scale 1.1 -> 1.0 */}
          <div className="relative aspect-square w-full overflow-hidden rounded-none bg-neutral-900">
            <motion.div
              className="relative h-full w-full"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1.0 }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0.2,
              }}
            >
              <Image
                src={project.thumbnail}
                alt={`${project.title} project thumbnail`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 520px"
              />
            </motion.div>
          </div>

          {/* Meta Row below thumbnail */}
          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h4 className="font-serif text-[22px] font-semibold tracking-[-0.03em] text-white">
                {project.title}
              </h4>
              <p className="max-w-[360px] font-sans text-[14px] font-medium leading-[1.35] tracking-[-0.03em] text-white/80">
                {project.description}
              </p>
            </div>
            <span className="font-sans text-[13px] font-semibold tracking-[-0.02em] uppercase text-white/80">
              {project.year}
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function WorksSection() {
  return (
    <section id="works" className="relative z-10 w-full bg-black">
      {PROJECTS.map((project, index) => (
        <ProjectShowcase key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
