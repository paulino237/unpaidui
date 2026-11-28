"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#120042]/85 backdrop-blur-md py-3 border-b border-white/10 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <Logo className="h-8 sm:h-9 w-auto text-white transition-transform group-hover:scale-102" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium tracking-wide text-white/80">
            <Link
              href="#works"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              Réalisations
            </Link>
            <Link
              href="#expertises"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              Expertises
            </Link>
            <Link
              href="#quality"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              Méthode & Qualité
            </Link>
            <Link
              href="#resources"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              Ressources
            </Link>
            <Link
              href="#faq"
              className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA & Menu toggle */}
          <div className="flex items-center gap-3">
            <MagneticButton href="#contact" variant="primary" className="text-xs sm:text-[13.5px]">
              <span className="flex items-center gap-1.5">
                <span>Discuter d’un projet</span>
                <ArrowUpRight className="size-4" />
              </span>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex md:hidden size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-[#120042] px-8 pt-28 pb-12 text-white md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 text-2xl font-bold tracking-tight">
            <Link
              href="#works"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#6630ff] transition-colors"
            >
              Réalisations
            </Link>
            <Link
              href="#expertises"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#6630ff] transition-colors"
            >
              Expertises
            </Link>
            <Link
              href="#quality"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#6630ff] transition-colors"
            >
              Méthode & Qualité
            </Link>
            <Link
              href="#resources"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#6630ff] transition-colors"
            >
              Ressources
            </Link>
            <Link
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#6630ff] transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#6630ff] py-3.5 text-base font-semibold text-white shadow-lg"
            >
              <span>Discuter d’un projet</span>
              <ArrowUpRight className="size-5" />
            </Link>
            <p className="text-center text-xs text-white/50">
              Certifié ISO 9001:2015 · Seule agence PowerPoint au monde
            </p>
          </div>
        </div>
      )}
    </>
  );
}
