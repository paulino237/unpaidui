"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const templates = [
  { title: "Startup Launch Kit", image: "/img/mock1_compressed.webp" },
  { title: "E-commerce Suite", image: "/img/mock5_compressed.webp" },
  { title: "SaaS Dashboard", image: "/img/mock9_compressed.webp" },
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

export function ShowcaseCardsSection() {
  return (
    <section id="templates" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
          Pre-built designs, ready to customize
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl border border-border/25"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              viewport={{ once: true }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-color"
                style={{
                  background:
                    "linear-gradient(135deg, #333DA7 0%, #7388DF 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
          <p className="max-w-md text-lg text-muted-foreground">
            Skip the blank canvas. Start with curated presets crafted for
            specific industries and use cases.
          </p>
          <Link
            href="#"
            className="group flex shrink-0 items-center gap-2 text-xl font-medium leading-none text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
