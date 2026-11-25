"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface RevealImage {
  src: string;
  alt: string;
}

const defaultImages: RevealImage[] = Array.from({ length: 12 }, (_, i) => ({
  src: `/img/mock${i + 1}_compressed.webp`,
  alt: `Kraft design ${i + 1}`,
}));

function RevealCard({
  image,
  colIndex,
}: {
  image: RevealImage;
  colIndex: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const config =
    colIndex === 0
      ? { xFrom: "-400%", origin: "0% 50%", scaleXFrom: 6, scaleYFrom: 0.3, blurFrom: 10 }
      : colIndex === 1
        ? { xFrom: "0%", origin: "50% 50%", scaleXFrom: 0.7, scaleYFrom: 0.7, blurFrom: 5 }
        : { xFrom: "400%", origin: "100% 50%", scaleXFrom: 6, scaleYFrom: 0.3, blurFrom: 10 };

  const x = useTransform(scrollYProgress, [0, 0.5], [config.xFrom, "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5], [config.scaleXFrom, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 0.5], [config.scaleYFrom, 1]);
  const blurVal = useTransform(scrollYProgress, [0, 0.5], [config.blurFrom, 0]);
  const filter = useTransform(blurVal, (b) => `blur(${b}px)`);

  return (
    <figure ref={ref} className="column__item">
      <motion.div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-xl will-change-transform"
        style={{
          transformOrigin: config.origin,
          x,
          opacity,
          scaleX,
          scaleY,
          filter,
        }}
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image.src})` }}
          role="img"
          aria-label={image.alt}
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color"
          style={{
            background: "linear-gradient(135deg, #333DA7 0%, #7388DF 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </figure>
  );
}

export function ImageRevealSection({
  images = defaultImages,
  className = "",
}: {
  images?: RevealImage[];
  className?: string;
}) {
  const columns: RevealImage[][] = [[], [], []];
  images.forEach((img, i) => {
    columns[i % 3].push(img);
  });

  return (
    <section className={`-mt-24 overflow-hidden ${className}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-4 sm:px-6 md:gap-6 lg:gap-8 lg:px-8">
        {columns.map((col, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col gap-4 md:gap-6 lg:gap-8"
          >
            {col.map((img, i) => (
              <RevealCard
                key={`col${colIndex}-${i}`}
                image={img}
                colIndex={colIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
