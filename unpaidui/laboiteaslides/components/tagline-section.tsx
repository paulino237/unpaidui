"use client";

import { KineticText } from "./kinetic-text";
import { MagneticButton } from "./magnetic-button";

export function TaglineSection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center overflow-hidden">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase font-semibold text-white/80 mb-6">
        <span>Notre Philosophie</span>
      </div>

      <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[1.1] mb-8">
        <KineticText as="h2" highlightWords={["raconter", "marquer"]}>
          Une bonne présentation ne sert pas à montrer, elle sert à raconter et marquer
        </KineticText>
      </div>

      <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed mb-10">
        Nous allions design de niveau Awwwards, psychologie cognitive et rigueur technique pour faire de vos supports de véritables leviers de décision.
      </p>

      <MagneticButton href="#expertises" variant="primary">
        Explorer notre savoir-faire
      </MagneticButton>
    </section>
  );
}
