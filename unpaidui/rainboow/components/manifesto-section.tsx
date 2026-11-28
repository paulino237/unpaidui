export function ManifestoSection() {
  return (
    <section className="sec manifesto on-light bg-white text-[#0b0710] py-36 relative z-10" id="manifeste">
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12">
        <span className="label micro uppercase tracking-wider text-xs font-bold text-[#8d8697] mb-8 block">
          (Ce qu’on fait)
        </span>

        <p className="m text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] max-w-5xl mb-20">
          Nous concevons des expériences digitales qui ont du sens, captent l’attention et génèrent de vrais résultats pour votre entreprise. Sites, produits et marques, conçus et développés par une seule équipe, sans passation.
        </p>

        <div className="stat grid sm:grid-cols-3 gap-12 pt-12 border-t border-[#0b0710]/10">
          <div>
            <b className="grad text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#ff5735] via-[#ff007f] to-[#b61bd1] bg-clip-text text-transparent block mb-2">
              50+
            </b>
            <span className="micro text-xs font-bold uppercase tracking-wider text-[#4a4552]">
              entreprises et startups en croissance
            </span>
          </div>

          <div>
            <b className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0b0710] block mb-2">
              5
            </b>
            <span className="micro text-xs font-bold uppercase tracking-wider text-[#4a4552]">
              note sur Sortlist
            </span>
          </div>

          <div>
            <b className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0b0710] block mb-2">
              15+
            </b>
            <span className="micro text-xs font-bold uppercase tracking-wider text-[#4a4552]">
              ans d’expérience du fondateur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
