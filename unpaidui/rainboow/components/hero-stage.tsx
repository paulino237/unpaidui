"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { CanvasRibbon } from "./canvas-ribbon";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  image?: string;
  url: string;
  bgColor: string;
  textColor: string;
  isCta?: boolean;
}

const projects: ProjectItem[] = [
  {
    id: "01",
    name: "Favikon",
    category: "Site web",
    desc: "Une startup devenue la marque de référence de l'influence marketing. Conversions multipliées par 4.",
    image: "/img/favikon.webp",
    url: "#realisations",
    bgColor: "#5452e0",
    textColor: "#f4f0ea",
  },
  {
    id: "02",
    name: "Académie RH",
    category: "Branding & site web",
    desc: "Partis d'une formation, aujourd'hui plus de 35. Leur marque devait suivre.",
    image: "/img/academie.webp",
    url: "#realisations",
    bgColor: "#fbc22f",
    textColor: "#0b0710",
  },
  {
    id: "03",
    name: "Weward",
    category: "App mobile",
    desc: "Faire évoluer le design d'une app à plus de 30 millions d'utilisateurs.",
    image: "/img/weward.webp",
    url: "#realisations",
    bgColor: "#ff5735",
    textColor: "#0b0710",
  },
  {
    id: "04",
    name: "Buckmoon",
    category: "Site web",
    desc: "Un site enfin à la hauteur du service de l'agence.",
    image: "/img/buckmoon.webp",
    url: "#realisations",
    bgColor: "#f1ede6",
    textColor: "#0b0710",
  },
  {
    id: "05",
    name: "Shipup",
    category: "Site web",
    desc: "La plateforme post-achat de Carrefour et ba&sh. Un site qui le raconte enfin.",
    image: "/img/shipup.webp",
    url: "#realisations",
    bgColor: "#ff007f",
    textColor: "#0b0710",
  },
  {
    id: "06",
    name: "Votre marque",
    category: "Prochaine couleur",
    desc: "Il reste de la place dans le flux. 30 minutes pour parler de votre marque.",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#b61bd1",
    textColor: "#f4f0ea",
    isCta: true,
  },
];

const logos = [
  { name: "Cdiscount", src: "/img/logos/cdiscount.png" },
  { name: "Favikon", src: "/img/logos/favikon.png" },
  { name: "Yess", src: "/img/logos/yess.png" },
  { name: "Coinhouse", src: "/img/logos/coinhouse.png" },
  { name: "Decathlon", src: "/img/logos/decathlon.png" },
  { name: "Carrefour", src: "/img/logos/carrefour.png" },
  { name: "L'Addition", src: "/img/logos/laddition.png" },
  { name: "Waverly Labs", src: "/img/logos/waverly.png" },
  { name: "The Last Treasure", src: "/img/logos/lasttreasure.png" },
  { name: "John Deere", src: "/img/logos/johndeere.png" },
  { name: "Académie RH", src: "/img/logos/academie-rh.png" },
];

export function HeroStage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showCookies, setShowCookies] = useState(true);

  const handleHover = (idx: number | null, pos?: { x: number; y: number }) => {
    setActiveProject(idx);
    if (pos) {
      setMousePos(pos);
    }
  };

  const currentProj = activeProject !== null ? projects[activeProject] : null;

  return (
    <section className="stage relative min-h-screen flex flex-col justify-between pt-36 pb-8 overflow-hidden" id="top" aria-label="Accueil">
      <CanvasRibbon onHoverPoint={handleHover} />

      <div className="copy wrap relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start" id="copy">
        <div>
          <Link
            href="#realisations"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 border border-white/60 backdrop-blur-md text-xs font-semibold text-[#0b0710] hover:bg-white/60 transition-colors mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-pulse" />
            <span>Comment Favikon a x4 ses conversions</span>
          </Link>

          <h1 className="text-5xl sm:text-6xl xl:text-[84px] font-bold tracking-tight text-[#0b0710] leading-[0.98] max-w-2xl">
            Le design au service de votre croissance
          </h1>
        </div>

        <div className="side flex flex-col gap-6 lg:pl-16 lg:pt-8">
          <div className="trust-b flex flex-wrap items-center gap-6">
            <a
              href="https://www.sortlist.be/fr/agency/rainboow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Note de 5 sur 5 sur Sortlist"
              className="inline-flex items-center gap-2.5 text-xs font-bold text-[#0b0710]"
            >
              <Image src="/img/badges/sortlist.png" alt="Sortlist" width={74} height={19} className="h-4 w-auto object-contain" />
              <span className="opacity-40">|</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#fbc22f] text-[#fbc22f]" />
                <span>5 / 5</span>
              </div>
            </a>

            <a
              href="https://finsweet.com/client-first/certification/certified-experts/cf-00461"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
            >
              <Image src="/img/badges/client-first.svg" alt="Certified Agency Client-First" width={160} height={24} className="h-5 w-auto" />
            </a>
          </div>

          <p className="lead text-base sm:text-lg text-[#4a4552] leading-relaxed max-w-lg font-medium">
            Nous créons des marques fortes, des produits digitaux remarquables et des expériences web qui transforment vos ambitions en résultats.
          </p>

          <div className="row flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://cal.com/rainboow/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="button-container group"
            >
              <span className="button is-effect">
                <span className="button-text">Réserver un appel</span>
              </span>
            </a>

            <a
              href="#realisations"
              className="button-container is-white group"
            >
              <span className="button is-white">
                <span className="button-text is-dark">Nos réalisations</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-logos relative z-10 w-full mt-auto pt-16 pb-4" id="htrust">
        <div className="marquee logos overflow-hidden">
          <div className="animate-marquee flex items-center gap-16">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="flex-none flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity">
                <Image
                  src={l.src}
                  alt={l.name}
                  width={120}
                  height={24}
                  className="h-5 sm:h-6 w-auto object-contain brightness-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCookies && (
        <div className="rb-ck fixed bottom-6 left-6 z-40 max-w-[340px] p-5 rounded-3xl bg-white border border-black/10 shadow-2xl text-[#0b0710]">
          <p className="text-xs font-semibold leading-relaxed mb-4 text-[#4a4552]">
            On utilise Google Analytics pour mesurer l’audience du site. Rien d’autre.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCookies(false)}
              className="flex-1 px-4 py-2 rounded-full text-xs font-bold bg-[#f1ede6] text-[#0b0710] hover:bg-black/10 transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={() => setShowCookies(false)}
              className="flex-1 px-4 py-2 rounded-full text-xs font-bold bg-[#0b0710] text-white hover:bg-black/80 transition-colors"
            >
              Accepter
            </button>
          </div>
        </div>
      )}

      <div className="hint absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl pointer-events-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff007f] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff007f]" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-white" id="how">
          Passez votre souris sur le Rainboow
        </span>
      </div>

      {currentProj && (
        <div
          className="card fixed z-50 pointer-events-none transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${Math.min(window.innerWidth - 420, Math.max(20, mousePos.x - 200))}px, ${Math.min(window.innerHeight - 380, Math.max(80, mousePos.y - 180))}px)`,
            backgroundColor: currentProj.bgColor,
            color: currentProj.textColor,
            opacity: 1,
            visibility: "visible",
            width: "380px",
            borderRadius: "30px",
            padding: "16px",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8)",
          }}
        >
          {currentProj.image && (
            <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-black/10">
              <Image
                src={currentProj.image}
                alt={currentProj.name}
                width={380}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {currentProj.isCta && (
            <div className="aspect-[16/10] rounded-2xl mb-4 bg-white/10 flex items-center justify-center">
              <span className="text-4xl font-extrabold tracking-tight">Et vous ?</span>
            </div>
          )}

          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider opacity-70 mb-2">
            <span>({currentProj.id})</span>
            <span>{currentProj.category}</span>
          </div>

          <h3 className="text-3xl font-extrabold tracking-tight mb-2 leading-none">
            {currentProj.name}
          </h3>

          <p className="text-sm font-medium opacity-85 leading-relaxed mb-4">
            {currentProj.desc}
          </p>

          <Link
            href={currentProj.url}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold pointer-events-auto shadow-md"
            style={{
              backgroundColor: currentProj.textColor,
              color: currentProj.bgColor,
            }}
          >
            <span>{currentProj.isCta ? "Réserver un appel" : "Voir le projet"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
