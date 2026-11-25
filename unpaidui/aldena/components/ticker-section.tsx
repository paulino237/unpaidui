"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LOGOS = [
  {
    name: "AlphaWave",
    src: "https://framerusercontent.com/images/F7p8ROgFDYQfLQ0LL6N2SKBNzKY.png?width=376&height=96",
    width: 376,
    height: 96,
    aspect: 3.92,
  },
  {
    name: "Boltshift",
    src: "https://framerusercontent.com/images/uppSb7qud9g4SFWc1ZTLTLcVVM.png?width=310&height=96",
    width: 310,
    height: 96,
    aspect: 3.23,
  },
  {
    name: "Capsule",
    src: "https://framerusercontent.com/images/PDI24QzNBd4Uee5rpQJ5MtUPXA.png?width=298&height=96",
    width: 298,
    height: 96,
    aspect: 3.1,
  },
  {
    name: "Codecraft",
    src: "https://framerusercontent.com/images/Ds32hVeQWhn5Nwsxo8deMuuSZdU.png?width=404&height=96",
    width: 404,
    height: 96,
    aspect: 4.21,
  },
  {
    name: "Euphoria",
    src: "https://framerusercontent.com/images/H3FI8vU6VHnW5yaKaKjXrj2co8I.png?width=314&height=96",
    width: 314,
    height: 96,
    aspect: 3.27,
  },
  {
    name: "Frequencii",
    src: "https://framerusercontent.com/images/VzkqlJxScLQy77hQmBsjz2nGc.png?width=354&height=96",
    width: 354,
    height: 96,
    aspect: 3.69,
  },
];

export function TickerSection() {
  return (
    <section className="relative z-[3] flex w-full items-center justify-center overflow-hidden bg-black py-8 sm:py-12 border-y border-white/10">
      <div className="relative flex w-full overflow-hidden select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex flex-nowrap items-center gap-12 sm:gap-16 pr-12 sm:pr-16"
        >
          {/* Repeated twice for seamless infinite marquee loop */}
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="relative flex-shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100"
              style={{
                height: "28px",
                width: `${28 * logo.aspect}px`,
              }}
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                fill
                className="object-contain brightness-0 invert"
                sizes="200px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
