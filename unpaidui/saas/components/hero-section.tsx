"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

const LOGOS = [
  { name: "Acme Corp", src: "/mock-logos/acmecorp.svg" },
  { name: "Altshift", src: "/mock-logos/altshift.svg" },
  { name: "Biosynthesis", src: "/mock-logos/biosynthesis.svg" },
  { name: "Boltshift", src: "/mock-logos/boltshift.svg" },
  { name: "Capsule", src: "/mock-logos/capsule.svg" },
  { name: "Catalog", src: "/mock-logos/catalog.svg" },
  { name: "Cloudwatch", src: "/mock-logos/cloudwatch.svg" },
  { name: "Commandr", src: "/mock-logos/commandr.svg" },
];

export function HeroSection() {
  return (
    <section className="flex flex-col relative isolate" style={{ colorScheme: "light" }}>
      {/* Background with rounded bottom corners */}
      <div
        className="absolute inset-0 min-[850px]:inset-2.5 bg-cover bg-center bg-no-repeat z-0 brightness-125 rounded-br-4xl rounded-bl-4xl min-[850px]:scale-105 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "url(/BG.jpg)" }}
      />

      {/* Main Hero Header and CTAs */}
      <div className="relative z-10 flex items-start justify-center px-6 pt-64 max-[850px]:pt-32">
        <div className="flex flex-col items-center max-[850px]:items-start text-center max-[850px]:text-left max-w-4xl max-[850px]:w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 pl-4 pr-3 py-1.5 rounded-xl border border-black/10 bg-white text-black text-sm font-medium mb-6 shadow-sm">
            Now Available
            <span className="text-accent">✦</span>
          </div>

          {/* Heading */}
          <h1 className="text-8xl max-[850px]:text-5xl font-medium tracking-tight leading-[1.1] mb-6 text-black">
            <span className="block">Build Faster</span>
            <span className="block">
              Ship with <span className="italic font-serif text-accent">Confidence</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl">
            The modern platform for teams who want to move fast without breaking things
          </p>

          {/* CTA Button */}
          <button
            type="button"
            className="group relative cursor-pointer inline-flex items-center max-[850px]:w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
            tabIndex={0}
          >
            <span className="absolute right-0 inset-y-0 w-[calc(100%-2rem)] max-[850px]:w-full rounded-xl bg-accent" />
            <span className="relative z-10 px-6 py-3.5 rounded-xl bg-black text-white font-medium max-[850px]:flex-1">
              Get Started
            </span>
            <span className="relative -left-px z-10 w-11 h-11 rounded-xl flex items-center justify-center text-black">
              <ArrowDownRight
                className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-45"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>

      {/* Dashboard Preview Mockup with Gradient Fade */}
      <div className="relative z-10 px-6 mt-24 max-[850px]:mt-10">
        <div className="relative max-w-5xl mx-auto">
          <div className="relative bg-white dark:bg-black rounded-2xl overflow-hidden border border-neutral-200/80 shadow-2xl/10 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
            <Image
              alt="Dashboard preview"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto invert dark:invert-0 dark:contrast-100 contrast-125"
              src="/dashboardmock.png"
            />
          </div>
        </div>
      </div>

      {/* Infinite Logo Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 pt-24 pb-16"
      >
        <div className="flex justify-center px-6">
          <div
            className="relative overflow-x-hidden max-w-[1200px] w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            style={{ "--logo-gap": "100px", "--logo-height": "36px" } as React.CSSProperties}
          >
            <div className="flex select-none w-max animate-marquee">
              <ul className="flex items-center" aria-hidden="false">
                {LOGOS.map((logo) => (
                  <li
                    key={logo.name}
                    className="flex-none mr-[var(--logo-gap)] text-[length:var(--logo-height)] leading-none"
                  >
                    <span className="inline-flex items-center invert opacity-60 hover:opacity-100 transition-opacity">
                      <Image
                        alt={logo.name}
                        width={120}
                        height={32}
                        className="h-[1.2em] w-auto"
                        src={logo.src}
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center" aria-hidden="true">
                {LOGOS.map((logo) => (
                  <li
                    key={`${logo.name}-dup`}
                    className="flex-none mr-[var(--logo-gap)] text-[length:var(--logo-height)] leading-none"
                  >
                    <span className="inline-flex items-center invert opacity-60 hover:opacity-100 transition-opacity">
                      <Image
                        alt={logo.name}
                        width={120}
                        height={32}
                        className="h-[1.2em] w-auto"
                        src={logo.src}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
