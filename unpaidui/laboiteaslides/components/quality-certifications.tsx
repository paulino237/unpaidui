import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export function QualityCertifications() {
  return (
    <section id="quality" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#ff61f8]">
          Garanties & Rigueur
        </span>
        <h2 className="mt-2 font-screamer text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-tight">
          Toujours carrés. Jamais formatés.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[#aca6bd] leading-relaxed">
          Une équipe de spécialistes qui réunit sans concession une culture de la réflexion et le goût de l’inattendu. Ça donne la première agence PowerPoint en France.
        </p>
      </div>

      {/* 3 Certifications Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Card 1: Google Avis 5/5 */}
        <div className="relative flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.05]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <Image
                src="/uploads/Badge_Google_avis_labas_149fc344c9.png"
                alt="Badge Google Avis"
                width={56}
                height={56}
                className="size-14 object-contain"
              />
              <div className="flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-400/20">
                <Star className="size-3.5 fill-current" />
                <span>5.0 / 5</span>
              </div>
            </div>

            <h3 className="font-screamer text-2xl font-bold uppercase text-white tracking-wide">
              5 étoiles Google Avis
            </h3>
            <p className="mt-3 text-sm text-[#aca6bd] leading-relaxed">
              Une satisfaction client unanime. Nos partenaires apprécient notre réactivité, notre sens du détail et l’impact direct de nos présentations sur leurs rendez-vous clés.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/60 font-medium">
            <CheckCircle2 className="size-4 text-[#70f74a]" />
            <span>Avis authentifiés et vérifiés</span>
          </div>
        </div>

        {/* Card 2: ISO 9001 Bureau Veritas */}
        <div className="relative flex flex-col justify-between rounded-[28px] border border-[#6630ff]/40 bg-gradient-to-b from-[#6630ff]/10 to-transparent p-8 backdrop-blur-md transition-all hover:border-[#6630ff]/70 shadow-[0_10px_30px_rgba(102,48,255,0.15)]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <Image
                src="/uploads/Badge_ISO_9001_labas_49c6d38cef.png"
                alt="Badge ISO 9001"
                width={56}
                height={56}
                className="size-14 object-contain"
              />
              <div className="rounded-full bg-[#6630ff]/20 px-3 py-1 text-xs font-semibold text-[#01daf6] border border-[#01daf6]/30">
                Bureau Veritas
              </div>
            </div>

            <h3 className="font-screamer text-2xl font-bold uppercase text-white tracking-wide">
              Certifié ISO 9001:2015
            </h3>
            <p className="mt-3 text-sm text-[#aca6bd] leading-relaxed">
              Seule agence PowerPoint au monde auditée et certifiée ISO 9001. Nos process de gestion de projet, de sécurisation des données et de contrôle qualité garantissent zéro retard.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/60 font-medium">
            <CheckCircle2 className="size-4 text-[#70f74a]" />
            <span>Norme internationale de management de la qualité</span>
          </div>
        </div>

        {/* Card 3: MOS Microsoft Office Specialist */}
        <div className="relative flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.05]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <Image
                src="/uploads/Badge_MOS_labas_83992cf13f.png"
                alt="Badge MOS"
                width={56}
                height={56}
                className="size-14 object-contain"
              />
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 border border-white/15">
                Microsoft Certified
              </div>
            </div>

            <h3 className="font-screamer text-2xl font-bold uppercase text-white tracking-wide">
              Microsoft Office Specialist
            </h3>
            <p className="mt-3 text-sm text-[#aca6bd] leading-relaxed">
              Certification d’élite Microsoft garantissant la maîtrise absolue des fonctionnalités avancées, masques de diapositives, macros et performances techniques PowerPoint.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/60 font-medium">
            <CheckCircle2 className="size-4 text-[#70f74a]" />
            <span>Expertise logicielle certifiée par l’éditeur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
