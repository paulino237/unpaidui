"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav fixed top-[22px] left-[max(22px,2vw)] right-[max(22px,2vw)] z-50 flex items-center gap-10 px-6 py-2 rounded-full border border-white/20 bg-white/25 backdrop-blur-xl shadow-2xl">
      <Link href="/" className="logo flex items-center gap-2" aria-label="Rainboow, accueil">
        <Image
          src="/img/logo-mark.png"
          alt="Rainboow"
          width={30}
          height={30}
          className="w-[26px] h-[26px] object-contain"
        />
        <svg className="wm h-4 w-auto text-[#170028]" viewBox="-81 0 1749 304" fill="currentColor" aria-hidden="true">
          <path d="M264.032 72.1895C283.553 72.1895 300.701 75.3749 315.478 81.7461C330.389 88.1175 341.438 98.5564 348.623 113.062C352.554 120.788 354.927 128.719 355.74 136.853C356.554 144.85 356.96 153.594 356.96 163.083V297.899H314.055V268.343C305.839 279.056 296.622 287.283 286.4 293.02C273.251 300.34 256.78 304 236.988 304C221.128 304 207.706 301.017 196.726 295.053C185.745 288.952 177.408 280.886 171.715 270.854C166.157 260.823 163.378 249.775 163.378 237.71C163.378 227.136 165.14 217.647 168.665 209.242C172.19 200.702 177.612 193.382 184.933 187.281C192.253 181.046 201.742 175.962 213.4 172.03C222.212 169.184 232.515 166.608 244.309 164.304C256.238 161.999 269.116 159.898 282.943 158C291.387 156.77 300.053 155.488 308.942 154.159C308.072 142.637 304.762 133.886 299.007 127.905C292.093 120.721 280.435 117.128 264.032 117.128C254.136 117.128 244.579 119.433 235.361 124.042C226.143 128.651 219.704 136.581 216.044 147.833L171.309 133.802C176.731 115.23 187.034 100.318 202.217 89.0664C217.535 77.8151 238.14 72.1895 264.032 72.1895ZM1243.83 72.1836C1265.92 72.1836 1285.17 77.1314 1301.58 87.0273C1317.98 96.9233 1330.72 110.615 1339.81 128.103C1348.89 145.454 1353.43 165.45 1353.43 188.089C1353.43 210.863 1348.82 230.994 1339.6 248.481C1330.52 265.833 1317.78 279.458 1301.37 289.354C1284.97 299.114 1265.79 303.994 1243.83 303.994C1221.87 303.994 1202.69 299.045 1186.28 289.149C1176.4 283.189 1167.85 275.876 1160.63 267.21C1153.37 275.967 1144.76 283.351 1134.8 289.359C1118.39 299.12 1099.21 304 1077.25 304C1055.29 304 1036.11 299.052 1019.71 289.156C1003.3 279.26 990.559 265.636 981.477 248.284C972.53 230.797 968.057 210.733 968.057 188.095C968.057 165.049 972.666 144.851 981.884 127.499C991.102 110.147 1003.91 96.5905 1020.32 86.8301C1036.72 77.0697 1055.7 72.1895 1077.25 72.1895C1099.35 72.1895 1118.6 77.1374 1135 87.0332C1144.91 93.011 1153.48 100.375 1160.72 109.123C1168.09 100.256 1176.81 92.8233 1186.89 86.8242C1203.29 77.0639 1222.27 72.1837 1243.83 72.1836ZM790.861 88.9336C791.532 88.4275 792.208 87.9278 792.895 87.4395C807.128 77.2723 824.684 72.1885 845.561 72.1885C866.301 72.1885 884.263 77.2724 899.446 87.4395C914.765 97.471 926.626 111.23 935.031 128.718C943.436 146.07 947.639 165.862 947.639 188.094C947.639 210.055 943.504 229.779 935.234 247.267C926.965 264.754 915.307 278.582 900.26 288.749C885.212 298.916 867.589 303.999 847.391 303.999C825.972 303.999 808.01 298.916 793.505 288.749C790.428 286.593 787.514 284.27 784.761 281.784V297.899H741.449V5.08594H790.861V88.9336ZM40.291 5.08594C43.1377 5.08594 46.7982 5.22109 51.2715 5.49219C55.745 5.62776 59.8801 6.03508 63.6758 6.71289C80.621 9.28855 94.584 14.9139 105.564 23.5898C116.68 32.2657 124.882 43.2463 130.169 56.5312C135.591 69.6806 138.303 84.3214 138.303 100.453C138.303 124.312 132.27 144.85 120.205 162.066C112.438 173.062 102.002 181.36 88.8975 186.963L142.979 297.898H87.4668L37.8975 195.618H-31.6914V297.898H-80.6973V5.08594H40.291ZM614.57 71.9844C630.838 71.9844 644.259 74.6957 654.833 80.1182C665.407 85.5406 673.811 92.4547 680.047 100.859C686.283 109.264 690.892 118.211 693.874 127.7C696.856 137.19 698.754 146.205 699.567 154.745C700.516 163.15 700.991 169.995 700.991 175.282V297.897H651.376V192.16C651.376 185.247 650.901 177.586 649.952 169.182C649.003 160.777 646.767 152.711 643.242 144.984C639.853 137.122 634.702 130.683 627.788 125.667C621.01 120.651 611.792 118.144 600.134 118.144C593.898 118.144 587.729 119.16 581.629 121.193C575.529 123.227 569.971 126.751 564.955 131.767C560.075 136.647 556.143 143.426 553.161 152.102C550.179 160.642 548.688 171.623 548.688 185.043V297.897H499.072V78.2881H542.791V102.655C548.395 96.0802 554.969 90.3971 562.515 85.6084C576.613 76.5258 593.965 71.9844 614.57 71.9844ZM450.771 297.896H401.766V78.2871H450.771V297.896ZM1405.74 78.2832L1448.65 219.2L1492.16 78.2832H1533.44L1576.75 219.2L1619.86 78.2832H1667.85L1600.75 297.894H1562.52L1512.7 146.81L1463.08 297.894H1424.85L1357.75 77.877L1405.74 78.2832Z" />
        </svg>
      </Link>

      <div className="hidden lg:flex items-center gap-9 text-[15px] font-medium text-[#4a4552]">
        <Link href="/" className="hover:text-[#170028] transition-colors">Accueil</Link>

        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button className="flex items-center gap-1 hover:text-[#170028] transition-colors py-2">
            <span>Services</span>
            <span className="plus text-base font-semibold text-[#8d8697]">+</span>
          </button>

          {servicesOpen && (
            <div className="absolute top-full left-0 mt-2 w-[520px] p-6 bg-[#0B0710]/95 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl text-[#f4f0ea] grid grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8d8697] mb-3">Design</p>
                <ul className="space-y-2 text-[14px]">
                  <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Product Design</Link></li>
                  <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">App mobile</Link></li>
                  <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Site internet</Link></li>
                  <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Landing page</Link></li>
                  <li><Link href="#services" className="hover:text-[#ff007f] transition-colors">Identité de marque</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8d8697] mb-3">Développement</p>
                <ul className="space-y-2 text-[14px]">
                  <li><Link href="#services" className="hover:text-[#5452e0] transition-colors">Webflow</Link></li>
                  <li><Link href="#services" className="hover:text-[#5452e0] transition-colors">WordPress</Link></li>
                  <li><Link href="#services" className="hover:text-[#5452e0] transition-colors">CMS headless</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8d8697] mb-3">Croissance</p>
                <ul className="space-y-2 text-[14px]">
                  <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">SEO</Link></li>
                  <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">GEO</Link></li>
                  <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">Audit SEO</Link></li>
                  <li><Link href="#services" className="hover:text-[#fbc22f] transition-colors">CRO</Link></li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <Link href="#realisations" className="hover:text-[#170028] transition-colors">Projets</Link>
        <Link href="#offre" className="hover:text-[#170028] transition-colors">Tarifs</Link>
        <Link href="#manifeste" className="hover:text-[#170028] transition-colors">À propos</Link>
        <Link href="#faq" className="hover:text-[#170028] transition-colors">Blog</Link>
      </div>

      <div className="hidden sm:flex items-center ml-auto gap-3">
        <div className="flex bg-[#f1ede6] text-[#8a8392] p-1 rounded-full text-xs font-bold shadow-inner">
          <span className="bg-white text-[#170028] px-3 py-1 rounded-full shadow-sm">FR</span>
          <span className="px-3 py-1 hover:text-[#170028] cursor-pointer">EN</span>
        </div>

        <a
          href="https://cal.com/rainboow/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="button-container is-sm group"
        >
          <span className="button is-effect">
            <span className="button-text">Réserver un appel</span>
          </span>
        </a>
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden ml-auto p-2 text-[#170028]"
        aria-label="Toggle menu"
      >
        <span className="sr-only">Menu</span>
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className="w-full h-0.5 bg-current rounded-full" />
          <span className="w-full h-0.5 bg-current rounded-full" />
          <span className="w-full h-0.5 bg-current rounded-full" />
        </div>
      </button>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-3 p-6 bg-[#0b0710]/95 border border-white/10 rounded-3xl backdrop-blur-2xl text-[#f4f0ea] flex flex-col gap-4 shadow-2xl">
          <Link href="#realisations" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">Réalisations</Link>
          <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">Services</Link>
          <Link href="#offre" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">Offres</Link>
          <Link href="#avis" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">Avis</Link>
          <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">FAQ</Link>
          <a
            href="https://cal.com/rainboow/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="button-container mt-2 text-center"
          >
            <span className="button is-effect">
              <span className="button-text">Prendre RDV</span>
            </span>
          </a>
        </div>
      )}
    </nav>
  );
}
