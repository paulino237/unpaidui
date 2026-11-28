export function ServicesSection() {
  const services = [
    {
      num: "01",
      tagline: "Conçus et développés par une seule équipe, sans passation.",
      title: "Sites internet",
      desc: "Pas d’attente côté dev, pas d’allers-retours entre Figma et Slack. Le site en ligne ressemble exactement à la maquette.",
      bgColor: "#f1ede6",
      textColor: "#0b0710",
    },
    {
      num: "02",
      tagline: "On vous accompagne sur toute la croissance de votre site.",
      title: "Partenaire croissance",
      desc: "On part de vos objectifs et on avance avec votre équipe marketing, mois après mois.",
      bgColor: "#5452e0",
      textColor: "#f4f0ea",
    },
    {
      num: "03",
      tagline: "La plupart des agences livrent des fichiers. Nous, on livre des produits.",
      title: "Product Design",
      desc: "On s’intègre à votre façon de travailler, avec vos développeurs, et on livre des interfaces prêtes à développer. Du premier MVP au produit à grande échelle.",
      bgColor: "#ff5735",
      textColor: "#0b0710",
    },
    {
      num: "04",
      tagline: "À l’heure de l’IA, une marque doit se démarquer et travailler deux fois plus.",
      title: "Identité de marque",
      desc: "Tout le secteur a monté d’un cran, et la barre avec lui. Votre marque est la fondation de votre site et de votre produit.",
      bgColor: "#fbc22f",
      textColor: "#0b0710",
    },
    {
      num: "05",
      tagline: "On développe ce qu’on conçoit, dans un code qui vous appartient.",
      title: "Développement sur mesure",
      desc: "En Astro et Next.js, avec un CMS headless comme Sanity pour vos équipes, et un code que Claude Code ou Cursor peuvent faire évoluer via des pull requests que vous validez.",
      bgColor: "#ff007f",
      textColor: "#0b0710",
    },
    {
      num: "06",
      tagline: "On migre votre site vers Framer, Webflow, Astro ou Next.js, depuis WordPress ou ailleurs.",
      title: "Migration de site",
      desc: "Chaque URL est conservée ou redirigée, le contenu est repris et le SEO vérifié page par page.",
      bgColor: "#b61bd1",
      textColor: "#f4f0ea",
    },
  ];

  return (
    <section className="show on-dark bg-[#0B0710] text-[#f4f0ea] py-36 relative z-10" id="services">
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="intro mb-16">
          <span className="label micro uppercase tracking-wider text-xs font-bold text-[#8d8697] mb-4 block">
            (Nos services)
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-2xl leading-tight">
            Une seule équipe, de la marque au produit
          </h2>
          <p className="text-base text-[#8d8697] mt-6 max-w-md font-medium">
            Conçus et développés par une seule équipe, sans passation. Du premier MVP au produit à grande échelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <article
              key={s.num}
              className="pcard rounded-[36px] p-8 sm:p-10 flex flex-col justify-between min-h-[380px] shadow-xl transition-transform hover:-translate-y-1 duration-300"
              style={{
                backgroundColor: s.bgColor,
                color: s.textColor,
              }}
            >
              <div className="top flex justify-between items-start text-xs font-bold uppercase tracking-wider opacity-75 mb-6">
                <span>({s.num})</span>
                <span className="text-right max-w-[65%] line-clamp-2">{s.tagline}</span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4 leading-none">
                  {s.title}
                </h3>
                <p className="text-sm font-medium opacity-85 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
