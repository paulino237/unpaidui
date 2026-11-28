import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="foot bg-[#F1EDE6] text-[#0B0710] pt-24 pb-12 relative z-10" data-bg="#f1ede6">
      <div className="wrap max-w-[1440px] mx-auto px-6 lg:px-12">
        <nav className="foot-cols grid grid-cols-2 sm:grid-cols-4 gap-12 pb-20 border-b border-[#0b0710]/10" aria-label="Services">
          <div>
            <p className="micro uppercase text-xs font-bold text-[#8d8697] mb-6">Design</p>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Product Design</Link></li>
              <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">App mobile</Link></li>
              <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Site internet</Link></li>
              <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Landing page</Link></li>
              <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Identité de marque</Link></li>
              <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Pitch deck</Link></li>
            </ul>
          </div>

          <div>
            <p className="micro uppercase text-xs font-bold text-[#8d8697] mb-6">Développement</p>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="#services" className="hover:text-[#5452e0] transition-colors">Webflow</Link></li>
              <li><Link href="#services" className="hover:text-[#5452e0] transition-colors">WordPress</Link></li>
              <li><Link href="#services" className="hover:text-[#5452e0] transition-colors">CMS headless</Link></li>
            </ul>
          </div>

          <div>
            <p className="micro uppercase text-xs font-bold text-[#8d8697] mb-6">Croissance</p>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">SEO</Link></li>
              <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">GEO</Link></li>
              <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">Audit SEO</Link></li>
              <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">CRO</Link></li>
            </ul>
          </div>

          <div>
            <p className="micro uppercase text-xs font-bold text-[#8d8697] mb-6">Rainboow</p>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="#realisations" className="hover:text-[#b61bd1] transition-colors">Projets</Link></li>
              <li><Link href="#offre" className="hover:text-[#b61bd1] transition-colors">Tarifs</Link></li>
              <li><Link href="#manifeste" className="hover:text-[#b61bd1] transition-colors">À propos</Link></li>
              <li><Link href="#faq" className="hover:text-[#b61bd1] transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </nav>

        <div className="bar flex flex-col sm:flex-row justify-between items-center gap-6 py-8 text-xs font-semibold text-[#8d8697]">
          <span>Commandez votre licorne · © 2026 Rainboow</span>
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#0b0710] transition-colors">Accueil</Link>
            <a href="https://cal.com/rainboow/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[#0b0710] transition-colors">Prendre rendez-vous</a>
            <Link href="/" className="hover:text-[#0b0710] transition-colors">Mentions légales</Link>
          </nav>
        </div>

        <div className="w-full pt-8">
          <Image
            src="/img/footer-logo.svg"
            alt="Rainboow"
            width={1440}
            height={280}
            className="w-full h-auto object-contain opacity-90"
          />
        </div>
      </div>
    </footer>
  );
}
