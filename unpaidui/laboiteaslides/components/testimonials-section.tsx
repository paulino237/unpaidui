import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Teddy G.",
    role: "Directeur de la Communication",
    company: "Groupe Industriel",
    text: "Une collaboration remarquable pour notre convention annuelle. La fluidité des animations et la précision du design ont captivé l’ensemble de nos collaborateurs.",
  },
  {
    name: "Marion T.",
    role: "Head of Marketing",
    company: "SaaS Enterprise",
    text: "La boîte à slides a su traduire des concepts complexes en schémas limpides et percutants. Le template livré est désormais utilisé quotidiennement par nos équipes commerciales.",
  },
  {
    name: "Julie N.",
    role: "Directrice Générale",
    company: "Scale-up",
    text: "Zéro retard, une écoute parfaite et un résultat qui a fait la différence lors de notre levée de fonds. L’ISO 9001 se ressent vraiment dans la rigueur du cadrage.",
  },
  {
    name: "Alexandra V.",
    role: "Responsable Événementiel",
    company: "Groupe Hôtelier",
    text: "La présentation tactile conçue pour nos écrans géants a impressionné nos partenaires. Personne ne croyait que c’était du 100% PowerPoint !",
  },
  {
    name: "Christian L.",
    role: "Directeur Commercial",
    company: "Agroalimentaire",
    text: "Un accompagnement sur-mesure de très haut vol. Les slides sont modernes, impactantes et directement opérationnelles pour nos commerciaux.",
  },
  {
    name: "Eva M.",
    role: "Responsable Marque & Image",
    company: "Mobilité & Énergie",
    text: "Une réactivité exceptionnelle face à nos contraintes de temps. La qualité des rendus 3D et le respect de notre charte graphique ont été irréprochables.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#01daf6]">
          Retours d’expérience
        </span>
        <h2 className="mt-2 font-screamer text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
          Ils nous font confiance
        </h2>
        <p className="mt-4 text-base text-[#aca6bd]">
          Ce que nos clients disent de notre accompagnement et de notre niveau d’exigence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="relative flex flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm sm:text-[14.5px] text-white/85 leading-relaxed italic">
                « {t.text} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-[#aca6bd]">{t.role} · {t.company}</div>
              </div>
              <Quote className="size-5 text-white/20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
