"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const logosA = [
  { name: "Acme Corp", src: "/mock-logos/acmecorp.svg", href: "#acme" },
  { name: "Boltshift", src: "/mock-logos/boltshift.svg", href: "#boltshift" },
  { name: "Capsule", src: "/mock-logos/capsule.svg", href: "#capsule" },
  { name: "Catalog", src: "/mock-logos/catalog.svg", href: "#catalog" },
  { name: "Cloudwatch", src: "/mock-logos/cloudwatch.svg", href: "#cloudwatch" },
  { name: "Featherdev", src: "/mock-logos/featherdev.svg", href: "#featherdev" },
];

const logosB = [
  { name: "Altshift", src: "/mock-logos/altshift.svg", href: "#altshift" },
  { name: "Biosynthesis", src: "/mock-logos/biosynthesis.svg", href: "#biosynthesis" },
  { name: "Commandr", src: "/mock-logos/commandr.svg", href: "#commandr" },
  { name: "Epicurious", src: "/mock-logos/epicurious.svg", href: "#epicurious" },
  { name: "Focalpoint", src: "/mock-logos/focalpoint.svg", href: "#focalpoint" },
  { name: "Galileo", src: "/mock-logos/galileo.svg", href: "#galileo" },
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LogoSlot({
  logoA,
  logoB,
  index,
}: {
  logoA: { name: string; src: string; href: string };
  logoB: { name: string; src: string; href: string };
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const current = flipped ? logoB : logoA;

  const scheduleFlip = useCallback(() => {
    return setTimeout(() => {
      setFlipped((prev) => !prev);
    }, 3000 + 4000 * Math.random() + 300 * index);
  }, [index]);

  useEffect(() => {
    let timeout = scheduleFlip();
    const interval = setInterval(() => {
      clearTimeout(timeout);
      timeout = scheduleFlip();
    }, 7000 + 3000 * Math.random());

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [scheduleFlip]);

  return (
    <Link
      href={current.href}
      className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl bg-muted/50 px-6 transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={flipped ? "b" : "a"}
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Image
            src={current.src}
            alt={current.name}
            width={120}
            height={40}
            className="h-8 w-auto object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:invert"
          />
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}

export function TrustedBySection() {
  return (
    <section className="py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-85rem)/2+2rem))]">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Trusted by teams who ship faster with Kraft
          </h2>
          <Link
            href="#"
            className="group flex shrink-0 items-center gap-2 text-xl font-medium leading-none text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
          {logosA.map((logo, i) => (
            <LogoSlot
              key={logo.name}
              logoA={logo}
              logoB={logosB[i] ?? logo}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
