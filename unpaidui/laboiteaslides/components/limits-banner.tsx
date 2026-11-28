import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function LimitsBanner() {
  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-r from-[#6630ff]/30 via-[#120042] to-[#01daf6]/25 p-8 sm:p-14 text-center backdrop-blur-xl shadow-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md mb-6">
          <Sparkles className="size-3.5 text-[#ff61f8]" />
          <span>Innovation PowerPoint</span>
        </div>

        <h2 className="font-screamer text-3xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Dépassez toutes les limites de PowerPoint
        </h2>

        <p className="mt-6 text-base sm:text-xl font-light text-[#aca6bd] max-w-2xl mx-auto leading-relaxed">
          Une expérience aussi bluffante, vous n’êtes pas prêt de l’oublier. Votre public non plus.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#120042] shadow-xl transition-all hover:bg-white/90 hover:scale-102 active:scale-98"
          >
            <span>Démarrer un projet</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
