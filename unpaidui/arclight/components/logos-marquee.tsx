"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LOGOS = [
  { name: "Halden", src: "/logos/halden.svg", width: 95, height: 28 },
  { name: "Tessera", src: "/logos/tessera.svg", width: 99, height: 28 },
  { name: "Quillon", src: "/logos/quillon.svg", width: 76, height: 28 },
  { name: "Oakline", src: "/logos/oakline.svg", width: 98, height: 28 },
  { name: "Marlowe", src: "/logos/marlowe.svg", width: 102, height: 28 },
  { name: "Brightwater", src: "/logos/brightwater.svg", width: 138, height: 28 },
];

export function LogosMarquee() {
  return (
    <section aria-label="Trusted by" className="pt-12 sm:pt-14">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:flex lg:justify-between lg:px-6">
          {LOGOS.map((logo, idx) => (
            <li key={logo.name}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Image
                  alt={logo.name}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  className="h-7 w-auto opacity-45 transition-opacity duration-200 hover:opacity-90 dark:invert"
                  priority
                />
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
