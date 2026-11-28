"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    id: "01",
    q: "Avec qui travaillez-vous le mieux ?",
    a: "Avec les startups et entreprises en croissance qui ont besoin d’une équipe design senior sans recruter en interne : SaaS, IA, Web3, applications mobiles ou services en ligne. En général, nos clients ont déjà un produit, une levée ou un vrai enjeu business derrière leur marque, leur site ou leur application.",
  },
  {
    id: "02",
    q: "Quelle est votre valeur ajoutée par rapport à une agence classique ?",
    a: "Nous sommes une équipe resserrée de seniors. Pas de chefs de projet intermédiaires, pas de stagiaires sur vos livrables. Vous échangez directement avec les créatifs et les développeurs qui fabriquent votre produit, avec une vitesse d’exécution inégalée.",
  },
  {
    id: "03",
    q: "Êtes-vous une agence de design ou de développement ?",
    a: "Les deux. Notre cœur de métier est le design (stratégie, branding, UX/UI, Product Design), et nous développons nous-mêmes les sites sur Webflow ou Astro. Certains clients nous confient uniquement le design, d’autres tout le projet, de la réflexion à la mise en ligne.",
  },
  {
    id: "04",
    q: "Pouvez-vous nous accompagner sur un produit qui part de zéro ?",
    a: "Oui. On vous aide à cadrer le projet, définir les parcours utilisateurs, concevoir l’expérience puis livrer des maquettes prêtes pour le développement. Selon votre organisation, on porte le projet de bout en bout ou on s’intègre à votre équipe produit existante.",
  },
  {
    id: "05",
    q: "Combien coûte une collaboration avec Rainboow ?",
    a: "Nos prix principaux sont publics : landing page dès 1 500 € HT, identité de marque dès 2 000 € HT, site internet dès 3 000 € HT et Design Partner dès 3 500 € HT par mois. Le reste est chiffré après un premier échange, et le prix est fixé avant de commencer.",
  },
  {
    id: "06",
    q: "Dans quels délais pouvez-vous démarrer ?",
    a: "Rapidement. Lors du premier appel, on fait le point sur votre calendrier et on vous propose une date de démarrage concrète. Si le projet est urgent, dites-le nous dès le départ et on s’organise en conséquence.",
  },
  {
    id: "07",
    q: "Comment travaille-t-on ensemble au quotidien ?",
    a: "On adapte le rythme à votre projet. En général : un point hebdomadaire, des mises à jour régulières et des cycles de validation clairs. Sur les projets plus intenses, on augmente la cadence pour que les décisions se prennent vite. À tout moment, vous savez ce qui avance, ce qui est prêt à valider et ce qui arrive ensuite.",
  },
  {
    id: "08",
    q: "Pouvez-vous collaborer avec notre équipe interne ?",
    a: "Oui, c’est même fréquent. On travaille main dans la main avec les fondateurs, product managers, marketeurs, designers et développeurs. On peut piloter le design en autonomie, renforcer votre équipe ou accompagner vos développeurs sur l’intégration.",
  },
  {
    id: "09",
    q: "Pouvez-vous renforcer l’accompagnement si le projet grandit ?",
    a: "Oui. Si le périmètre évolue, on ajuste l’équipe et le niveau d’accompagnement : lancement produit, levée de fonds, refonte de site ou roadmap plus ambitieuse. Certains clients travaillent avec nous depuis plusieurs années.",
  },
  {
    id: "10",
    q: "Pourquoi passer par Rainboow plutôt que recruter en interne ?",
    a: "Recruter prend du temps, coûte cher et demande du management. Un freelance est idéal pour une mission ponctuelle, mais rarement pour couvrir à la fois stratégie, branding, produit et site. Avec Rainboow, vous avez une équipe senior responsable du résultat, sans avoir à recruter chaque profil.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="sec on-dark bg-black text-[#f4f0ea] py-36 relative z-10" id="faq">
      <div className="wrap max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
        <span className="label micro uppercase tracking-wider text-xs font-bold text-[#8d8697] mb-4 block">
          (Encore des questions ?)
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-20 leading-tight">
          Les questions fréquentes
        </h2>

        <div className="faq divide-y divide-white/10 text-left border-y border-white/10">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={f.id} className="qa">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-8 flex items-center justify-between gap-6 group text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8d8697]">
                      {f.id}
                    </span>
                    <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#ff007f] transition-colors leading-snug">
                      {f.q}
                    </span>
                  </div>

                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-none border border-white/15 transition-all duration-300 ${
                      isOpen ? "bg-white text-black rotate-45" : "bg-white/5 text-white"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-8 pl-14 sm:pl-16 pr-8 text-sm sm:text-base text-[#8d8697] font-medium leading-relaxed animate-in fade-in duration-200">
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
