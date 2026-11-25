"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";

const steps = [
  {
    title: "Describe",
    description:
      "Tell Kraft what you need. A logo, a landing page, an entire brand—just say it.",
    image: "/img/describe.webp",
  },
  {
    title: "Generate",
    description:
      "Watch as Kraft creates multiple design options, each one production-ready.",
    image: "/img/generate.webp",
  },
  {
    title: "Refine",
    description:
      "Tweak colors, fonts, adjust layouts—Kraft understands natural language edits.",
    image: "/img/refine.webp",
  },
  {
    title: "Ship",
    description:
      "Export to Figma, download assets, or push directly to your codebase. Done.",
    image: "/img/ship.webp",
  },
];

export function ToolsCarouselSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const x = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const updateConstraints = () => {
      if (trackRef.current && wrapperRef.current) {
        setConstraints({
          left: Math.min(
            0,
            -(trackRef.current.scrollWidth - wrapperRef.current.offsetWidth)
          ),
          right: 0,
        });
      }
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <section id="features" className="relative overflow-hidden py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
            From idea to finished design in four simple steps
          </h2>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            cursorX.set(e.clientX - rect.left + 16);
            cursorY.set(e.clientY - rect.top - 16);
          }
        }}
      >
        <motion.div
          ref={trackRef}
          className="flex cursor-grab gap-2.5 pl-4 pr-48 active:cursor-grabbing sm:pl-6 lg:pl-[max(2rem,calc((100vw-85rem)/2+2rem))]"
          style={{ x }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.15}
          dragTransition={{
            power: 0.3,
            timeConstant: 200,
            modifyTarget: (target) =>
              Math.max(constraints.left, Math.min(0, target)),
          }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false);
            let next = x.get() + 0.3 * info.velocity.x;
            if (next > 0) next = 0;
            else if (next < constraints.left) next = constraints.left;
            x.set(next);
          }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="group flex w-80 shrink-0 flex-col rounded-xl bg-muted/50 px-6 pt-6 transition-colors duration-300 hover:bg-foreground sm:w-96 md:w-[26.25rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-2xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-background">
                {step.title}
              </h3>
              <p className="mt-2 text-lg leading-snug tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-background/70">
                {step.description}
              </p>
              <div className="relative mt-6 h-80 w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="scale-90 object-contain object-top grayscale"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 420px"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent md:w-48"
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50 flex items-center justify-center rounded-full border border-foreground/10 bg-background/20 px-4 py-2 text-xs font-medium tracking-tight text-white backdrop-blur-md dark:text-foreground"
          style={{ x: smoothCursorX, y: smoothCursorY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: hovered && !dragging ? 1 : 0,
            scale: hovered && !dragging ? 1 : 0.8,
          }}
          transition={{ duration: 0.15 }}
        >
          Drag
        </motion.div>
      </div>
    </section>
  );
}
