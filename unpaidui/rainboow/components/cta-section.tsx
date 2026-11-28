import Link from "next/link";

export function CtaSection() {
  return (
    <section className="sec cta on-light bg-[#FF5735] text-[#0B0710] py-36 relative z-10" data-bg="#ff5735">
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <span className="label micro uppercase tracking-wider text-xs font-bold opacity-60 mb-6 block">
          (Vous ne trouvez pas votre réponse ?)
        </span>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto mb-12 leading-[1.05]">
          Un projet en tête ? On en parle 30 minutes.
        </h2>

        <div className="row flex flex-wrap items-center justify-center gap-4">
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

          <Link
            href="#realisations"
            className="button-container is-white group"
          >
            <span className="button is-white">
              <span className="button-text is-dark">Voir nos projets</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
