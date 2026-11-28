import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, Sparkles } from "lucide-react";

interface Resource {
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

const RESOURCES: Resource[] = [
  {
    type: "Article",
    date: "12/01/2025",
    title: "Gamification et PowerPoint : mettez du jeu dans vos formations !",
    description: "Comment créer des parcours interactifs et des quiz dynamiques pour captiver vos apprenants sous PowerPoint.",
    image: "/uploads/large_Adobe_Stock_206118370_5ab61dcb89.jpg",
  },
  {
    type: "Cas client",
    date: "18/03/2026",
    title: "Ideuzo - Présentation commerciale",
    description: "Découvrez comment nous avons refondu le support de vente d'Ideuzo pour augmenter leur taux de closing de 35%.",
    image: "/uploads/large_presentation_equipe_0eebf6541e.jpeg",
  },
  {
    type: "Livre blanc",
    date: "Guide pratique",
    title: "Gagner en autonomie sur PowerPoint",
    description: "Les meilleures pratiques de nos designers pour structurer des masques propres et fluidifier la collaboration interne.",
    image: "/uploads/large_Labas_20f4ebe642.jpg",
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#ff61f8]">
            Insights & Guides
          </span>
          <h2 className="mt-2 font-screamer text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            Nos dernières ressources
          </h2>
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#01daf6] hover:text-white transition-colors"
        >
          <span>Voir toutes nos ressources</span>
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {RESOURCES.map((r, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
              <Image
                src={r.image}
                alt={r.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {r.type}
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-white/50">{r.date}</span>
                <h3 className="mt-2 text-lg sm:text-xl font-bold text-white group-hover:text-[#01daf6] transition-colors leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#aca6bd] leading-relaxed line-clamp-2">
                  {r.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                <span>Lire la ressource</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
