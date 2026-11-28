"use client";

import Image from "next/image";
import { KineticText } from "./kinetic-text";
import { MagneticButton } from "./magnetic-button";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden text-center">
      {/* Subtle Background Glow behind headlines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#6630ff]/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-[#01daf6]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Subtitle pill / category */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#62f740] animate-pulse" />
          <span>Agence PowerPoint & Présentations Sur-Mesure</span>
        </motion.div>

        {/* Hero Title with Kinetic Split Text */}
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] mb-6">
          <KineticText as="h1" delay={0.1} stagger={0.05} highlightWords={["avenir"]}>
            Les meilleures idées font l&apos;avenir
          </KineticText>
        </div>

        {/* Hero Subtitle */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/80 uppercase leading-[1.15] mb-10 max-w-4xl">
          <KineticText as="p" delay={0.3} stagger={0.04} highlightWords={["présentées"]} highlightClass="text-[#01daf6]">
            Quand elles sont bien présentées
          </KineticText>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <MagneticButton href="#works" variant="primary" className="text-sm sm:text-base">
            Découvrir nos réalisations
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary" className="text-sm sm:text-base">
            Échanger sur votre projet
          </MagneticButton>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 border-t border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/uploads/avis_google_la_boite_a_slides_d0ae2ffbe8.png"
                alt="Avis Google 5.0"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white/90">Note Google 5.0 / 5</p>
              <p className="text-[11px] text-white/60">Plus de 85 avis certifiés</p>
            </div>
          </div>

          <div className="h-8 w-px bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/uploads/badge_ISO_9001_la_boite_a_slides_f254ee42fa.png"
                alt="Certifié ISO 9001"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white/90">Certifié ISO 9001</p>
              <p className="text-[11px] text-white/60">Management de la qualité</p>
            </div>
          </div>

          <div className="h-8 w-px bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/uploads/badge_microsoft_office_specialist_la_boite_a_slides_7d780287cf.png"
                alt="Microsoft Office Specialist"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white/90">Experts Microsoft</p>
              <p className="text-[11px] text-white/60">Office Specialist certifié</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
