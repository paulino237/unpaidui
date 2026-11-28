"use client";

import Image from "next/image";

interface Testimonial {
  avatar?: string;
  initials?: string;
  bg?: string;
  fg?: string;
  role: string;
  headline: string;
  text?: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    avatar: "/img/avatars/maxime.webp",
    role: "Fondateur @ Agence Nuisibles",
    headline: "J’ai enfin trouvé mon agence référence !",
    text: "L’équipe Rainboow a fourni un travail fabuleux. Leur accompagnement de A à Z, leur professionnalisme, implication et recos font que je repasserai par eux pour la création de futurs projets web ! Je recommande vivement leurs services, vous pouvez y aller les yeux fermés !",
    author: "Maxime Doholo",
  },
  {
    avatar: "/img/avatars/jeremy.webp",
    role: "CEO @ Favikon",
    headline: "On a été bluffé par le résultat !",
    author: "Jeremy Boissinot",
  },
  {
    initials: "TG",
    bg: "#ff007f",
    fg: "#0b0710",
    role: "Fondateur d’Académie RH & Avolike",
    headline: "Une équipe au top et à l’écoute",
    text: "Une équipe au top et à l’écoute qui a parfaitement cerné notre projet. Le rendu est au-dessus de nos attentes. Jérémie et Jérôme sont ultra disponibles et à l’écoute des améliorations. Nous ne pensions pas atteindre un tel niveau de réalisation. Ils vont également suivre l’évolution de notre site pour les 6 prochains mois. Foncez, c’est super.",
    author: "Thomas Goupil",
  },
  {
    avatar: "/img/avatars/eimri.webp",
    role: "Head of Marketing @ Yess",
    headline: "By far one of the smoothest and most impressive agency experiences I’ve had.",
    text: "Working with Rainboow was next-level.",
    author: "Eimri Bar",
  },
  {
    initials: "O",
    bg: "#5452e0",
    fg: "#f4f0ea",
    role: "CMO @ Decathlon / Train Me",
    headline: "Equipe agréable et réactive",
    text: "J’ai contacté Rainboow pour la refonte de nos landing pages. Équipe agréable et réactive, très disponible pendant le projet et ensuite dans le suivi. Merci à tous les deux pour votre implication et votre professionnalisme. Je recommande les yeux fermés :)",
    author: "Olivia",
  },
  {
    initials: "KJ",
    bg: "#f1ede6",
    fg: "#0b0710",
    role: "Fondateurs @ Maison Bleue",
    headline: "Le résultat final correspond exactement à ce qu’on imaginait.",
    text: "L’équipe a été super à l’écoute, réactive et force de proposition. L’agence Rainboow a créé notre site web de A à Z. On voulait un site clair, professionnel et qui reflète vraiment notre activité.",
    author: "Klarance & Jonathan",
  },
  {
    avatar: "/img/avatars/caroline.webp",
    role: "CEO @ CaroGorille",
    headline: "Travail ultra rapide, copywriting efficace et design qui convertit dès les premières 24h.",
    author: "Caroline Rousset",
  },
  {
    initials: "B",
    bg: "#ff5735",
    fg: "#0b0710",
    role: "Biked",
    headline: "Une réalisation impeccable.",
    text: "Le design fourni a surpassé nos espérances, offrant une impulsion décisive au lancement de notre projet exactement comme nous l’avions imaginé.",
    author: "L’équipe Biked",
  },
];

export function TestimonialsSection() {
  return (
    <section className="avis on-dark bg-[#0B0710] text-[#f4f0ea] py-36 relative z-10" id="avis">
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <span className="label micro uppercase tracking-wider text-xs font-bold text-[#8d8697] mb-4 block">
          (Avis clients)
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-2xl mx-auto mb-20 leading-tight">
          Ils parlent de leur expérience
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="bg-gradient-to-b from-[#25212c] to-[#15121b] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-2xl object-cover bg-black/20"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg"
                      style={{ backgroundColor: t.bg, color: t.fg }}
                    >
                      {t.initials}
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#8d8697]">
                      {t.role}
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {t.author}
                    </div>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-3 leading-snug">
                  {t.headline}
                </h4>

                {t.text && (
                  <p className="text-sm text-[#8d8697] font-medium leading-relaxed">
                    {t.text}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
