import React from "react";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-[#0d0030] pt-24 pb-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Call to Action in Footer */}
        <div className="mb-20 pb-20 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#70f74a]">
              Prêt à transformer vos présentations ?
            </span>
            <h2 className="mt-3 font-screamer text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
              Parlons de votre projet
            </h2>
            <p className="mt-4 text-base text-[#aca6bd] max-w-xl">
              Nos consultants et directeurs artistiques vous répondent sous 24h avec un cadrage précis et sans engagement.
            </p>
          </div>

          <a
            href="mailto:contact@laboiteaslides.fr"
            className="inline-flex items-center gap-3 rounded-full bg-[#6630ff] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_30px_rgba(102,48,255,0.45)] transition-all hover:bg-[#7845ff] hover:scale-102 active:scale-98"
          >
            <Mail className="size-5" />
            <span>contact@laboiteaslides.fr</span>
            <ArrowUpRight className="size-5" />
          </a>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 mb-16">
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-1">
            <Logo className="h-10 w-auto text-white mb-6" />
            <p className="text-xs sm:text-sm text-[#aca6bd] leading-relaxed">
              La boite à slides® est l&apos;agence PowerPoint activateur d&apos;impact certifiée ISO 9001:2015.
              Experts de la communication stratégique d&apos;entreprise depuis 2002.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#aca6bd]">
              <li>
                <Link href="#works" className="hover:text-white transition-colors">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="#expertises" className="hover:text-white transition-colors">
                  Expertises
                </Link>
              </li>
              <li>
                <Link href="#quality" className="hover:text-white transition-colors">
                  Méthode & Qualité
                </Link>
              </li>
              <li>
                <Link href="#resources" className="hover:text-white transition-colors">
                  Ressources
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Bureaux */}
          <div>
            <div className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Bureaux
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-[#aca6bd]">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-[#01daf6] mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Paris</strong>
                  <span>14 rue de Soleure, 75005 Paris</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-[#01daf6] mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Lyon</strong>
                  <span>Place Bellecour, 69002 Lyon</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Certifications & Réseaux */}
          <div>
            <div className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Engagements
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-[#aca6bd]">
              <p>Certification ISO 9001:2015 Bureau Veritas</p>
              <p>Microsoft Certified Partner</p>
              <p>Note 5.0 / 5 sur Google Avis</p>
            </div>

            <div className="mt-6 flex items-center gap-4 text-white/70">
              <a
                href="https://www.linkedin.com/company/la-boite-a-slides"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-semibold uppercase tracking-wider border border-white/20 rounded-full px-3 py-1 hover:border-white">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://vimeo.com/laboiteaslides"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Vimeo"
              >
                <span className="text-xs font-semibold uppercase tracking-wider border border-white/20 rounded-full px-3 py-1 hover:border-white">
                  Vimeo
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2026 La boite à slides®. Tous droits réservés.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/80 transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              ISO 9001:2015
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
