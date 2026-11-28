"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { KineticText } from "./kinetic-text";
import { MagneticButton } from "./magnetic-button";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  image: string;
  year: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "viridien",
    slug: "viridien-changement-de-nom-cgg",
    title: "Changement de marque globale & Keynote",
    client: "Viridien (ex-CGG)",
    category: "Convention & Keynote",
    image: "/uploads/cover_viridien_f57c5aeb1e.webp",
    year: "2024",
  },
  {
    id: "marriott",
    slug: "marriott-pitch-global-corporate",
    title: "Pitch corporate & Direction artistique",
    client: "Marriott Hotels",
    category: "Pitch & Appel d'offres",
    image: "/uploads/cover_marriott_0f0d6e6b52.webp",
    year: "2024",
  },
  {
    id: "safran",
    slug: "safran-convention-annuelle",
    title: "Grand format convention annuelle aéronautique",
    client: "Safran Group",
    category: "Grand Format Event",
    image: "/uploads/cover_safran_18a2873c9f.webp",
    year: "2024",
  },
  {
    id: "kronenbourg",
    slug: "kronenbourg-lancement-produit",
    title: "Lancement de marque & Récit immersif",
    client: "Kronenbourg",
    category: "Brand Narrative",
    image: "/uploads/cover_kronenbourg_62ec22e032.webp",
    year: "2023",
  },
  {
    id: "adidas",
    slug: "adidas-retail-partner-day",
    title: "Retail Partner Showcase & Animation 3D",
    client: "Adidas",
    category: "Retail Showcase",
    image: "/uploads/cover_adidas_d07a119e83.webp",
    year: "2023",
  },
  {
    id: "upciti",
    slug: "upciti-smart-city-pitch-deck",
    title: "Pitch Deck Investisseurs Smart City AI",
    client: "Upciti",
    category: "Levée de fonds",
    image: "/uploads/cover_upciti_2e052ebf89.webp",
    year: "2023",
  },
];

export function WorksPanoramic() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Authentic horizontal scroll translation across the cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="works" ref={targetRef} className="relative h-[300vh]">
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 flex flex-col justify-center h-screen overflow-hidden px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase font-semibold text-white/80 mb-3">
              <span>Études de Cas & Réalisations</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              <KineticText as="h2" highlightWords={["scène"]}>
                Nos créations mises en scène
              </KineticText>
            </div>
          </div>
          <MagneticButton href="#contact" variant="secondary" className="text-xs sm:text-sm">
            Voir toutes les réalisations
          </MagneticButton>
        </div>

        {/* Horizontal Card Track */}
        <div className="relative w-full overflow-visible">
          <motion.div style={{ x }} className="flex gap-6 sm:gap-8 will-change-transform">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="group relative flex-shrink-0 w-[300px] sm:w-[460px] md:w-[560px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:border-white/30"
              >
                {/* Media Wrapper with parallax scale effect */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#120042]/80 backdrop-blur-md text-[11px] font-semibold text-white uppercase tracking-wider">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono text-white/80">
                    {project.year}
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex items-baseline justify-between gap-4 px-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#01daf6] mb-1">
                      {project.client}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white/90 line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-white/40">
                    {`0${index + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-8 flex items-center justify-between text-xs text-white/40 font-mono max-w-7xl mx-auto w-full">
          <span>DÉFILEMENT PANORAMIQUE HORIZONTAL</span>
          <span>6 RÉALISATIONS PHARES</span>
        </div>
      </div>
    </section>
  );
}
