"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ParticleHeading } from "@/components/particle-heading";
import { HeroServicePill } from "@/components/hero-service-pill";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black px-6 pt-12 pb-10 sm:px-12 lg:px-16">
      {/* Background Image: Colorful Portrait of a Young Woman */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://framerusercontent.com/images/9951CPntYdpWiH0n13bQWSiI.png?width=2400&height=1800"
          alt="Colorful portrait of a young woman"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-20"
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
          backgroundRepeat: "repeat",
          backgroundPosition: "left top",
          backgroundSize: "128px auto",
        }}
      />

      {/* Top spacer (since top navbar was removed) */}
      <div className="h-6" />

      {/* Center Hero Heading: Huge Title that spans the full width */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1600px] items-center justify-center py-6">
        <ParticleHeading
          text="Aldena Studio"
          color="#ffffff"
          aspectRatio="5.33"
          fontSize="clamp(3.5rem, 16.5vw, 15rem)"
        />
      </div>

      {/* Bottom Row Container (Framer: "Bottom") */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-8 border-t border-white/20 pt-8 lg:flex-row lg:items-end"
      >
        {/* Left: Creative Agency + 3 sub-labels */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-[42px] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-[54px] lg:text-[64px]">
            Creative Agency
          </h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <p className="font-sans text-[13px] font-semibold tracking-[-0.02em] uppercase text-white/80">
              Designed to endure.
            </p>
            <p className="font-sans text-[13px] font-semibold tracking-[-0.02em] uppercase text-white/80">
              Rooted in Strategy.
            </p>
            <p className="font-sans text-[13px] font-semibold tracking-[-0.02em] uppercase text-white/80">
              Refined by Craft.
            </p>
          </div>
        </div>

        {/* Right: Dynamic Service Pill that switches every 2.5s */}
        <div className="flex items-center lg:justify-end">
          <HeroServicePill />
        </div>
      </motion.div>
    </section>
  );
}
