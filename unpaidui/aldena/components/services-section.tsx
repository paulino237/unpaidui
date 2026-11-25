"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  price: string;
  description: string;
  bgImage: string;
  wrapImage: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "service-01",
    number: "Service 01",
    title: "Brand Identity",
    price: "$6,000",
    description:
      "A complete visual identity built from strategy up — logo suite, type and color systems, and a flexible design language. We deliver a brand that stays recognizable everywhere while giving each touchpoint room to breathe. Includes a full guidelines document so your team can apply it with confidence.",
    bgImage:
      "https://framerusercontent.com/images/kpBv8nDwHuDnulhZDyTkA5e3jKY.png?width=1200&height=1200",
    wrapImage:
      "https://framerusercontent.com/images/50VoT25sg8sdvPHCkYWMmg2bsI.png?width=1200&height=1200",
  },
  {
    id: "service-02",
    number: "Service 02",
    title: "Visual Design",
    price: "$3,500",
    description:
      "Design work that turns your brand into real, usable assets — packaging, web layouts, social templates, and marketing collateral. We keep every piece coherent so your brand feels considered at every scale. Ideal for studios who have an identity and need it brought to life.",
    bgImage:
      "https://framerusercontent.com/images/dKrf6MyLfXuNHd0WYCeJf3AJYdE.png?width=1200&height=1200",
    wrapImage:
      "https://framerusercontent.com/images/F3Hkc6HIgflzBGzwpmXVz9l988.png?width=1200&height=1200",
  },
  {
    id: "service-03",
    number: "Service 03",
    title: "Content & Voice",
    price: "$2,500",
    description:
      "An editorial voice and content strategy that make your brand sound as intentional as it looks. We define tone guidelines, shape your key messaging, and set up a publishing rhythm your team can sustain. Great for brands with strong visuals but no words to match.",
    bgImage:
      "https://framerusercontent.com/images/o0pbgb2IJo19Cm8jajdjFYuXf0.png?width=1200&height=1200",
    wrapImage:
      "https://framerusercontent.com/images/1jl3akZHz3CwamtA8csVvGKrUAs.png?width=1200&height=1200",
  },
  {
    id: "service-04",
    number: "Service 04",
    title: "Brand Refresh",
    price: "$4,000",
    description:
      "A focused evolution for brands that are close but not quite there — sharpening your identity, tightening the system, and modernizing without losing what people already recognize. We audit what's working, then refine the rest. A lower-commitment path to a brand that feels current.",
    bgImage:
      "https://framerusercontent.com/images/TDcaDM5rdt2pNTvsSasyIoBR8.png?width=1200&height=1200",
    wrapImage:
      "https://framerusercontent.com/images/o2QAfZCLQLRnwjBf4kADwhYWmow.png?width=1200&height=1200",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(1120);

  // Keep track of card width on resize
  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        const w = Math.min(window.innerWidth - 80, 1120);
        setCardWidth(Math.max(320, w));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const gap = 80;
  const totalCards = SERVICES.length;

  const prevSlide = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalCards - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev < totalCards - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="services"
      className="relative z-[3] flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-[#f4f4f4] py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-6 lg:px-10">
        {/* Mobile / Small Screen Header */}
        <div className="mb-8 block w-full max-w-[1120px] md:hidden">
          <p className="font-sans text-[12px] font-semibold tracking-[-0.03em] uppercase text-[#aeaeae]">
            What we offer
          </p>
          <h2 className="mt-2 font-serif text-[32px] font-semibold tracking-[-0.03em] text-black">
            What we offer
          </h2>
          <p className="mt-2 font-sans text-[15px] font-medium leading-[1.3] text-[#605f5f]">
            A focused set of brand, web, and digital design services shaped to
            elevate your presence.
          </p>
        </div>

        {/* 3D Slideshow Frame with Perspective 1200px */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            mass: 1,
          }}
          className="relative w-full overflow-hidden"
          style={{ perspective: 1200 }}
          ref={containerRef}
        >
          {/* Track containing all 4 cards with 3D perspective transforms */}
          <div className="relative flex w-full justify-center py-6">
            <motion.div
              className="flex items-center"
              style={{
                gap: `${gap}px`,
                transformStyle: "preserve-3d",
              }}
              animate={{
                x: `calc(50% - ${cardWidth / 2}px - ${activeIndex * (cardWidth + gap)}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 40,
                mass: 1,
              }}
            >
              {SERVICES.map((service, index) => {
                const isActive = index === activeIndex;
                const isLeft = index < activeIndex;
                const isRight = index > activeIndex;

                return (
                  <motion.div
                    key={service.id}
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      rotateY: isActive ? 0 : isLeft ? 15 : -15,
                      opacity: isActive ? 1 : 0.85,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 35,
                      mass: 1,
                    }}
                    style={{
                      width: `${cardWidth}px`,
                      height: "550px",
                      transformStyle: "preserve-3d",
                    }}
                    className={`group relative flex flex-shrink-0 cursor-pointer overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow duration-300 ${
                      isActive ? "ring-1 ring-black/5" : "hover:opacity-95"
                    }`}
                  >
                    <div className="flex h-full w-full flex-col p-5 md:flex-row md:gap-5">
                      {/* Left Column: Content */}
                      <div className="flex flex-1 flex-col justify-between p-4 md:p-6 lg:p-8">
                        {/* Top Group */}
                        <div className="flex flex-col gap-6 md:gap-8">
                          {/* Label & Title */}
                          <div className="flex flex-col gap-2">
                            <span className="font-sans text-[12px] font-semibold tracking-[-0.03em] uppercase text-[#aeaeae]">
                              What we offer
                            </span>
                            <h3 className="font-sans text-[32px] font-semibold leading-[1.2] tracking-[-0.04em] text-black md:text-[36px]">
                              {service.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="max-w-[440px] font-sans text-[15px] font-medium leading-[1.4] tracking-[-0.02em] text-[#605f5f]">
                            {service.description}
                          </p>
                        </div>

                        {/* Bottom: Price */}
                        <div className="mt-8 flex flex-col gap-1 border-t border-neutral-100 pt-6 md:mt-0">
                          <span className="font-sans text-[12px] font-semibold tracking-[-0.02em] text-[#999999]">
                            Starting at
                          </span>
                          <span className="font-sans text-[36px] font-semibold leading-[1] tracking-[-0.04em] text-black md:text-[40px]">
                            {service.price}
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Media with Dual Artwork Layers */}
                      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black min-h-[280px] md:min-h-full">
                        {/* Top-Right Service Number Pill (Framer exact position) */}
                        <div className="absolute top-5 right-5 z-20 select-none">
                          <span className="font-sans text-[12px] font-semibold tracking-[-0.03em] uppercase text-white/90">
                            {service.number}
                          </span>
                        </div>

                        {/* Layer 1: Background Texture / Art */}
                        <motion.div
                          initial={{ scale: 1.2 }}
                          whileInView={{ scale: 1.0 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 30,
                          }}
                          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                        >
                          <Image
                            src={service.bgImage}
                            alt={`${service.title} background`}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 560px"
                          />
                          {/* Subtle dark vignette */}
                          <div className="absolute inset-0 bg-black/20" />
                        </motion.div>

                        {/* Layer 2: Foreground 3D Centered Artwork */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1.0 : 0.95,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 30,
                          }}
                          className="relative z-10 aspect-square w-[80%] max-w-[360px]"
                        >
                          <Image
                            src={service.wrapImage}
                            alt={service.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Pagination Controls (Framer exact bottom-mid controls: 2 round buttons) */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            <button
              onClick={prevSlide}
              aria-label="Previous service"
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next service"
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
