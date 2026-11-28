"use client";

import { useState } from "react";
import { KineticText } from "./kinetic-text";
import { MusicString } from "./music-string";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Qu'est-ce qui différencie La Boîte à Slides d'une agence classique ?",
    answer: "Nous combinons une expertise narrative exclusive, des directeurs artistiques dédiés aux enjeux corporate, et une maîtrise technique absolue des outils de présentation (PowerPoint, Keynote, Google Slides, WebGL et VR). De plus, nous sommes certifiés ISO 9001 et Experts Microsoft certifiés.",
  },
  {
    question: "Quels sont vos délais habituels pour créer une présentation ?",
    answer: "Nos délais varient de 48 heures pour les urgences stratégiques (pitch investisseur, réponse à appel d'offres) à plusieurs semaines pour des conventions d'entreprise ou des refontes complètes de chartes graphiques de grands groupes.",
  },
  {
    question: "Pouvons-nous modifier nous-mêmes les slides après la livraison ?",
    answer: "Absolument. Toutes nos créations sont pensées pour être 100% autonomes et modifiables. Nous concevons des masques de diapositives rigoureux, des palettes de couleurs paramétrées et des typographies accessibles pour que vos équipes puissent éditer leurs slides en toute simplicité.",
  },
  {
    question: "Assurez-vous la confidentialité de nos présentations et données ?",
    answer: "La confidentialité est au cœur de notre métier. Nous signons systématiquement des accords de non-divulgation (NDA) stricts avant même la réception de vos éléments, et tous nos processus sont certifiés conformes à la norme qualité ISO 9001.",
  },
  {
    question: "Intervenez-vous également sur des événements en direct ?",
    answer: "Oui, nous accompagnons nos clients en régie événementielle : répétitions d'orateurs, gestion des écrans géants grand format, formats panoramiques et immersifs, et assistance technique sur place pour garantir un déroulement zéro défaut.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase font-semibold text-white/80 mb-4">
          <span>Questions Fréquentes</span>
        </div>
        <div className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          <KineticText as="h2" highlightWords={["réponses"]}>
            Des questions ? Nos réponses en toute transparence
          </KineticText>
        </div>
      </div>

      {/* Accordion List with Vibrating Music Strings */}
      <div className="relative divide-y divide-transparent">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="relative py-4 group">
              {/* Top Interactive Music String for every FAQ item */}
              <MusicString
                height={28}
                strokeColor={isOpen ? "#01daf6" : "rgba(255, 255, 255, 0.15)"}
                className="mb-2"
              />

              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full text-left flex items-start justify-between gap-6 py-3 px-2 rounded-xl transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-white/40">{`0${index + 1}`}</span>
                  <span
                    className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-[#01daf6]" : "text-white group-hover:text-white/90"
                    }`}
                  >
                    {item.question}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45 bg-white/10 border-[#01daf6]" : "rotate-0"
                  }`}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed pl-8 pr-12 pb-4 pt-1">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Bottom String */}
        <MusicString height={28} strokeColor="rgba(255, 255, 255, 0.15)" className="mt-2" />
      </div>
    </section>
  );
}
