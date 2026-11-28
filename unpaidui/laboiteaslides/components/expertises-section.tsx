"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "motion/react";
import { KineticText } from "./kinetic-text";
import { MagneticButton } from "./magnetic-button";

interface ExpertiseItem {
  id: string;
  slug: string;
  label: string;
  badge: string;
  description: string;
  image: string;
}

const EXPERTISES: ExpertiseItem[] = [
  {
    id: "presentations",
    slug: "presentations-powerpoint-sur-mesure",
    label: "Présentations",
    badge: "Keynotes & Pitch decks",
    description: "Conception narrative, design graphique percutant et animation haute fidélité pour vos rendez-vous stratégiques.",
    image: "/uploads/cover_presentation_cce0768c67.webp",
  },
  {
    id: "communication",
    slug: "communication-360-et-motion-design",
    label: "Communication 360",
    badge: "Branding & Motion",
    description: "Déclinaison globale de votre identité de marque, chartes graphiques évolutives et vidéos percutantes.",
    image: "/uploads/cover_communication_f0d1ea0294.webp",
  },
  {
    id: "navigation",
    slug: "navigation-app-like-interactive",
    label: "Navigation App Like",
    badge: "Expérience interactive",
    description: "Transformez vos présentations PowerPoint en véritables applications tactiles ergonomiques et captivantes.",
    image: "/uploads/cover_navigation_app_like_04cfbc17c1.webp",
  },
  {
    id: "vr",
    slug: "seminaires-et-evenements-vr",
    label: "Séminaire VR",
    badge: "Immersion 3D",
    description: "Dispositifs événementiels immersifs et expériences de réalité virtuelle pour marquer durablement les esprits.",
    image: "/uploads/cover_seminaire_vr_740c0cb1b6.webp",
  },
  {
    id: "ia",
    slug: "solutions-ia-et-automatisation",
    label: "Solutions IA",
    badge: "Productivité augmentée",
    description: "Workflows assistés par intelligence artificielle et intégration sur-mesure pour accélérer vos équipes.",
    image: "/uploads/cover_solutions_ia_30dca4ae28.webp",
  },
];

export function ExpertisesSection() {
  const [activeExpertise, setActiveExpertise] = useState<ExpertiseItem | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Mouse spring tracking for floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateSpring = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 160, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRotate = useSpring(rotateSpring, springConfig);

  const onMouseMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // Center offset
    mouseX.set(relX);
    mouseY.set(relY);

    // Tilt based on horizontal velocity
    const tilt = (e.movementX || 0) * 0.4;
    rotateSpring.set(Math.max(-12, Math.min(12, tilt)));
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={onMouseMove}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible select-none"
    >
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase font-semibold text-white/80 mb-4">
          <span>Expertises & Métiers</span>
        </div>
        <div className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
          <KineticText as="h2" highlightWords={["impactantes"]}>
            Des expertises pointues pour des présentations impactantes
          </KineticText>
        </div>
      </div>

      {/* Floating Image Preview (authentic _route__image physics) */}
      {activeExpertise && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            rotate: smoothRotate,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed pointer-events-none z-30 w-80 sm:w-96 h-52 sm:h-60 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/20 hidden md:block"
        >
          <Image
            src={activeExpertise.image}
            alt={activeExpertise.label}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120042]/90 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">
              {activeExpertise.badge}
            </span>
          </div>
        </motion.div>
      )}

      {/* Interactive List */}
      <div className="divide-y divide-white/10 border-y border-white/10">
        {EXPERTISES.map((item, idx) => {
          const isCurrent = activeExpertise?.id === item.id;
          return (
            <div
              key={item.id}
              onPointerEnter={() => setActiveExpertise(item)}
              onPointerLeave={() => setActiveExpertise(null)}
              className="group relative py-8 sm:py-10 transition-colors duration-300 hover:bg-white/[0.03] px-4 -mx-4 rounded-xl cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="text-sm font-mono text-white/40 tracking-wider">
                    {`0${idx + 1}`}
                  </span>
                  <div>
                    <h3
                      className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-3 ${
                        isCurrent ? "text-[#01daf6]" : "text-white"
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-xl line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start md:self-auto">
                  <span className="text-xs uppercase font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 group-hover:bg-[#6630ff] group-hover:text-white transition-colors duration-300">
                    {item.badge}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/50 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <MagneticButton href="#contact" variant="primary" className="text-sm sm:text-base">
          En savoir plus sur nos méthodologies
        </MagneticButton>
      </div>
    </section>
  );
}
