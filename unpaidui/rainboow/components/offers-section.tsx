"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type OfferKey = "growth" | "partner" | "landing";

interface OfferData {
  key: OfferKey;
  tabLabel: string;
  bg: string;
  dark: boolean;
  title: string;
  pitchSubtitle: string;
  pitchP1: string;
  pitchP2: string;
  kind: string;
  plans: {
    label: string;
    name: string;
    price: string;
    per: string;
    note: string;
    specs: [string, string][];
    meta: [string, string][];
    features?: string[];
  }[];
}

const offersData: Record<OfferKey, OfferData> = {
  growth: {
    key: "growth",
    tabLabel: "Site internet",
    bg: "#fbc22f",
    dark: false,
    title: "Un site qui ramène des clients, avant d'être une marque",
    pitchSubtitle: "Pour les entreprises qui doivent d'abord vendre.",
    pitchP1:
      "Vous n'avez pas encore besoin d'une identité de marque reconnue de tous. Vous avez besoin d'un site qui se trouve sur Google et dans les IA, et qui transforme les visites en rendez-vous.",
    pitchP2:
      "On part de notre système de design, on l'adapte à vos couleurs, et on concentre l'effort là où il rapporte : structure SEO, GEO et conversion.",
    kind: "Site internet",
    plans: [
      {
        label: "Sans identité",
        name: "Site Growth",
        price: "3 000 €",
        per: "HT, à partir de",
        note: "Sur Webflow. En Astro + Sanity : sur devis",
        specs: [
          ["SEO", "Structure pensée Google"],
          ["GEO", "ChatGPT, Perplexity, Gemini"],
          ["Stack", "Webflow (Astro sur devis)"],
          ["Suivi", "Analytics + prise de RDV"],
        ],
        meta: [
          ["Pour qui ?", "PME, startups et entreprises B2B qui ont besoin d'acquisition avant d'avoir besoin d'une marque."],
          ["Ce qui est inclus", "Design adapté à vos couleurs, copywriting orienté conversion, CMS, mentions légales et 404."],
        ],
      },
      {
        label: "Avec identité",
        name: "Site + identité",
        price: "5 000 €",
        per: "HT, à partir de",
        note: "Sur Webflow. En Astro + Sanity : sur devis",
        specs: [
          ["Étape 1", "Identité de marque"],
          ["Étape 2", "Site sur mesure"],
          ["Pistes", "2 à 3 directions"],
          ["SEO / GEO", "Inclus"],
        ],
        meta: [
          ["Pour qui ?", "Startups et entreprises qui veulent une image à la hauteur de leur ambition, et se distinguer dans leur marché."],
          ["L'étape en plus", "Votre identité de marque : 2 à 3 pistes créatives, logo, couleurs, typographies, charte et bannières réseaux."],
          ["Le site", "Un design unique, conçu de zéro à partir de votre nouvelle identité, puis développé et optimisé pour le SEO et le GEO."],
        ],
      },
    ],
  },
  partner: {
    key: "partner",
    tabLabel: "Design Partner",
    bg: "#5452e0",
    dark: true,
    title: "Une équipe design senior, sans recruter",
    pitchSubtitle: "Pour les startups et scale-ups qui livrent en continu.",
    pitchP1:
      "On s'intègre à votre équipe, mois après mois : product design, site, landing pages et marque, au rythme de votre roadmap.",
    pitchP2:
      "Recruter prend du temps, coûte cher et demande du management. Avec Design Partner, vous avez une équipe senior responsable du résultat, sans avoir à recruter chaque profil.",
    kind: "Abonnement mensuel",
    plans: [
      {
        label: "Demi Partner",
        name: "Design Partner",
        price: "3 500 €",
        per: "HT / mois",
        note: "Sans engagement, pause possible",
        specs: [
          ["Démarrage", "En une semaine"],
          ["Engagement", "Aucun, pause possible"],
          ["Équipe", "Designers seniors"],
          ["Périmètre", "Produit, site, marque"],
        ],
        meta: [
          ["Pour qui ?", "Startups et scale-ups, de l'early stage à la série B/C, qui ont un produit et une roadmap."],
          ["Ce qui est inclus", "Product design, sites et landing pages, design system, identité de marque, intégration avec vos développeurs."],
        ],
      },
      {
        label: "Partner complet",
        name: "Design Partner",
        price: "6 000 €",
        per: "HT / mois",
        note: "Sans engagement, pause possible",
        specs: [
          ["Démarrage", "En une semaine"],
          ["Engagement", "Aucun, pause possible"],
          ["Équipe", "Équipe senior dédiée"],
          ["Périmètre", "Produit, site, marque illimité"],
        ],
        meta: [
          ["Pour qui ?", "Scale-ups à fort rythme de delivery cherchant une autonomie produit totale."],
          ["Ce qui est inclus", "Sprints hebdomadaires, validation continue, revues Figma et QA front."],
        ],
      },
    ],
  },
  landing: {
    key: "landing",
    tabLabel: "Landing page",
    bg: "#ff007f",
    dark: false,
    title: "Une page, un objectif, livrée vite",
    pitchSubtitle: "Pour un lancement ou une campagne.",
    pitchP1:
      "Une landing page conçue autour d'une seule action : prendre rendez-vous, s'inscrire, demander une démo.",
    pitchP2:
      "Elle reprend le design de votre site, elle est testée sur tous les écrans et chaque conversion est suivie.",
    kind: "Landing page",
    plans: [
      {
        label: "Sans identité",
        name: "Landing page",
        price: "1 500 €",
        per: "HT / page, à partir de",
        note: "Sur Webflow, à partir de votre identité actuelle",
        specs: [],
        features: [
          "Structure et textes de la page",
          "Maquette desktop et mobile",
          "Développement Webflow et tests sur tous les écrans",
          "Suivi des conversions",
          "Cohérente avec le design de votre site",
        ],
        meta: [
          ["Pour qui ?", "Les équipes qui lancent un produit, une offre ou une campagne payante."],
          ["Le prix", "Fixé avant de commencer, sans surprise."],
          ["La technologie", "Webflow, pour que votre équipe modifie la page sans développeur."],
        ],
      },
      {
        label: "Avec identité",
        name: "Landing + identité",
        price: "3 500 €",
        per: "HT, à partir de",
        note: "Identité de marque, puis la page sur Webflow",
        specs: [],
        features: [
          "Identité de marque : pistes, logo, couleurs, typographies",
          "Structure et textes de la page",
          "Maquette desktop et mobile",
          "Développement Webflow et tests sur tous les écrans",
          "Suivi des conversions",
        ],
        meta: [
          ["Pour qui ?", "Les startups et les nouvelles offres qui partent de zéro."],
          ["L'étape en plus", "L'identité de marque, déclinée ensuite sur la page."],
          ["Le prix", "Fixé avant de commencer, selon le périmètre."],
        ],
      },
    ],
  },
};

export function OffersSection() {
  const [activeTab, setActiveTab] = useState<OfferKey>("growth");
  const [planIndex, setPlanIndex] = useState(0);

  const offer = offersData[activeTab];
  const currentPlan = offer.plans[planIndex] || offer.plans[0];

  const handleTabChange = (key: OfferKey) => {
    setActiveTab(key);
    setPlanIndex(0);
  };

  return (
    <section
      className={`sec offre-sec py-36 transition-colors duration-500 relative z-10 ${
        offer.dark ? "text-[#f4f0ea]" : "text-[#0b0710]"
      }`}
      style={{ backgroundColor: offer.bg }}
      id="offre"
    >
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <span className="label micro uppercase tracking-wider text-xs font-bold opacity-60 mb-8 block">
          (Nos offres)
        </span>

        <div className="switch inline-flex p-1.5 rounded-full bg-black/10 backdrop-blur-md mb-12 shadow-inner">
          {(["growth", "partner", "landing"] as OfferKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleTabChange(k)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === k
                  ? "bg-[#fffaf0] text-[#0b0710] shadow-md"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {offersData[k].tabLabel}
            </button>
          ))}
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto mb-16 leading-tight">
          {offer.title}
        </h2>

        <div className="offer grid lg:grid-cols-[1fr_400px_1fr] gap-12 items-center text-left max-w-5xl mx-auto">
          <div className="pitch space-y-4">
            <h3 className="text-2xl font-bold tracking-tight leading-snug">
              {offer.pitchSubtitle}
            </h3>
            <p className="text-sm sm:text-base font-medium opacity-80 leading-relaxed">
              {offer.pitchP1}
            </p>
            <p className="text-sm sm:text-base font-medium opacity-80 leading-relaxed">
              {offer.pitchP2}
            </p>
          </div>

          <div className="ticket text-[#0b0710] rounded-3xl overflow-hidden shadow-2xl bg-[#fffaf0]">
            <div className="tk tk-a p-6 sm:p-8 border-b-2 border-dashed border-[#e2d9c6]">
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">
                {offer.kind}
              </div>
              <div className="text-2xl font-extrabold tracking-tight mb-4">
                {currentPlan.name}
              </div>

              {offer.plans.length > 1 && (
                <div className="flex bg-[#f3ecdc] p-1 rounded-full mb-6 text-xs font-bold">
                  {offer.plans.map((p, idx) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPlanIndex(idx)}
                      className={`flex-1 py-1.5 rounded-full transition-all ${
                        planIndex === idx
                          ? "bg-white text-[#0b0710] shadow-sm"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none mb-1">
                {currentPlan.price}
              </div>
              <div className="text-xs font-bold opacity-60 mb-6">
                {currentPlan.per}
              </div>

              {currentPlan.specs.length > 0 && (
                <div className="grid grid-cols-2 gap-2 text-xs font-bold mb-4">
                  {currentPlan.specs.map(([k, v]) => (
                    <div key={k} className="bg-[#f3ecdc] p-2.5 rounded-xl">
                      <span className="block opacity-50 uppercase text-[10px] mb-0.5">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentPlan.features && (
                <ul className="space-y-2 text-xs font-semibold mb-4">
                  {currentPlan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#ff5735] to-[#b61bd1] text-white flex items-center justify-center flex-none">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="text-[11px] font-semibold opacity-60">
                {currentPlan.note}
              </div>
            </div>

            <div className="tk tk-b p-6 bg-[#fffaf0] text-center">
              <a
                href="https://cal.com/rainboow/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="button-container w-full"
              >
                <span className="button is-effect w-full">
                  <span className="button-text">Réserver un appel</span>
                </span>
              </a>
            </div>
          </div>

          <div className="meta space-y-6">
            <dl className="space-y-6">
              {currentPlan.meta.map(([title, content]) => (
                <div key={title}>
                  <dt className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
                    {title}
                  </dt>
                  <dd className="text-sm font-semibold opacity-90 leading-relaxed">
                    {content}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
