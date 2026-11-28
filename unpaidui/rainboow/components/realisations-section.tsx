import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CaseItem {
  id: string;
  name: string;
  cat: string;
  desc: string;
  img?: string;
  url: string;
  bgColor: string;
  textColor: string;
  isCta?: boolean;
}

const cases: CaseItem[] = [
  {
    id: "01",
    name: "Favikon",
    cat: "Site web",
    desc: "Une startup devenue la marque de référence de l'influence marketing. Conversions multipliées par 4.",
    img: "/img/favikon.webp",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#5452e0",
    textColor: "#f4f0ea",
  },
  {
    id: "02",
    name: "Académie RH",
    cat: "Branding & site web",
    desc: "Partis d'une formation, aujourd'hui plus de 35. Leur marque devait suivre.",
    img: "/img/academie.webp",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#fbc22f",
    textColor: "#0b0710",
  },
  {
    id: "03",
    name: "Weward",
    cat: "App mobile",
    desc: "Faire évoluer le design d'une app à plus de 30 millions d'utilisateurs.",
    img: "/img/weward.webp",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#ff5735",
    textColor: "#0b0710",
  },
  {
    id: "04",
    name: "Buckmoon",
    cat: "Site web",
    desc: "Un site enfin à la hauteur du service de l'agence.",
    img: "/img/buckmoon.webp",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#f1ede6",
    textColor: "#0b0710",
  },
  {
    id: "05",
    name: "Shipup",
    cat: "Site web",
    desc: "La plateforme post-achat de Carrefour et ba&sh. Un site qui le raconte enfin.",
    img: "/img/shipup.webp",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#ff007f",
    textColor: "#0b0710",
  },
  {
    id: "06",
    name: "Votre marque",
    cat: "Prochaine couleur",
    desc: "Il reste de la place dans le flux. 30 minutes pour parler de votre marque.",
    url: "https://cal.com/rainboow/30min",
    bgColor: "#b61bd1",
    textColor: "#f4f0ea",
    isCta: true,
  },
];

export function RealisationsSection() {
  return (
    <section className="sec on-light bg-[#F1EDE6] text-[#0B0710] py-36 relative z-10" id="realisations">
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="svc-intro flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-20">
          <div>
            <span className="label micro uppercase tracking-wider text-xs font-bold text-[#8d8697] mb-4 block">
              (Réalisations)
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Des marques qu’on a fait <span className="bg-gradient-to-r from-[#ff5735] via-[#ff007f] to-[#b61bd1] bg-clip-text text-transparent">grandir</span>
            </h2>
          </div>
          <a
            href="https://cal.com/rainboow/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0710] hover:text-[#ff007f] transition-colors"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="stack space-y-10">
          {cases.map((c, i) => (
            <article
              key={c.id}
              className="scard sticky top-24 rounded-[36px] p-8 sm:p-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center shadow-xl transition-all"
              style={{
                backgroundColor: c.bgColor,
                color: c.textColor,
                zIndex: i + 1,
              }}
            >
              <div className="l flex flex-col justify-between h-full">
                <div>
                  <div className="top flex items-center gap-6 text-xs font-bold uppercase tracking-wider opacity-75 mb-6">
                    <span>({c.id})</span>
                    <span>{c.cat}</span>
                  </div>

                  <h3 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none mb-6">
                    {c.name}
                  </h3>

                  <p className="d text-base sm:text-lg font-medium opacity-85 leading-relaxed max-w-md mb-8">
                    {c.desc}
                  </p>
                </div>

                <a
                  href={c.url}
                  target={c.isCta ? "_blank" : undefined}
                  rel={c.isCta ? "noopener noreferrer" : undefined}
                  className="go inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-bold self-start transition-transform hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: c.textColor,
                    color: c.bgColor,
                  }}
                >
                  <span>{c.isCta ? "Réserver un appel" : "Voir le projet"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="img aspect-[16/10] rounded-3xl overflow-hidden bg-black/10 relative">
                {c.img ? (
                  <Image
                    src={c.img}
                    alt={c.name}
                    width={700}
                    height={440}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/10">
                    <span className="text-5xl sm:text-7xl font-extrabold tracking-tight">Et vous ?</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
