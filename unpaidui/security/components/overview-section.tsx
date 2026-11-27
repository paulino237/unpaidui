"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const col1 = ["/grid/01.webp", "/grid/04.webp", "/grid/07.webp", "/grid/10.webp"];
const col2 = ["/grid/02.webp", "/grid/05.webp", "/grid/08.webp", "/grid/11.webp"];
const col3 = ["/grid/03.webp", "/grid/06.webp", "/grid/09.webp", "/grid/12.webp"];

const allCols = [col1, col2, col3];

function Tile({ src }: { src: string }) {
  return (
    <div
      style={
        {
          "--cut": "12px",
          clipPath:
            "polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))",
        } as React.CSSProperties
      }
      className="relative aspect-square w-full overflow-hidden bg-[#e6eeff] [filter:saturate(1.15)] [isolation:isolate] dark:bg-[#05122e] dark:[filter:saturate(1.35)]"
    >
      <div
        style={{ backgroundImage: `url(${src})` }}
        className="absolute inset-0 bg-cover bg-center [filter:grayscale(1)_contrast(0.85)_brightness(1.55)] dark:[filter:grayscale(1)_contrast(1.2)_brightness(1.08)]"
      />
      <div className="absolute inset-0 bg-[#3b76ff] mix-blend-color dark:bg-[#1466ff]" />
      <div className="absolute inset-0 bg-[#9bc0ff] opacity-30 mix-blend-multiply dark:bg-[#0a235c] dark:opacity-40" />
      <div className="absolute inset-0 bg-white opacity-25 mix-blend-screen dark:bg-[#4d9bff] dark:opacity-25" />
    </div>
  );
}

function GridTile({
  progress,
  src,
  colIndex,
  pos,
  colLen,
}: {
  progress: MotionValue<number>;
  src: string;
  colIndex: number;
  pos: number;
  colLen: number;
}) {
  const isEven = colIndex % 2 === 0;
  const o = 0.06 + 0.045 * (isEven ? colLen - 1 - pos : pos);
  const entryY = useTransform(
    progress,
    [o, o + 0.3],
    [isEven ? "-90vh" : "90vh", "0vh"],
    { clamp: true }
  );
  const midPoint = Math.floor(colLen / 2);
  const splitY = useTransform(
    progress,
    [0.54, 0.9],
    ["0%", colIndex === 1 ? `${pos < midPoint ? -1 : 1 * 42}%` : "0%"],
    { clamp: true }
  );

  return (
    <motion.div style={{ y: entryY }} className="will-change-transform">
      <motion.div style={{ y: splitY }} className="will-change-transform">
        <Tile src={src} />
      </motion.div>
    </motion.div>
  );
}

export function OverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 0.92], [1, 2.05]);
  const leftColX = useTransform(scrollYProgress, [0.52, 0.92], ["0%", "-55%"]);
  const rightColX = useTransform(scrollYProgress, [0.52, 0.92], ["0%", "55%"]);
  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.86, 0.99],
    [0, 1, 1, 0]
  );

  const textOpacity = useTransform(scrollYProgress, [0.02, 0.14], [0, 1]);
  const textY = useTransform(
    scrollYProgress,
    [0.02, 0.14, 0.6, 0.82],
    [28, 0, 0, -8]
  );
  const btnOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const btnY = useTransform(scrollYProgress, [0.6, 0.8], [16, 0]);
  const btnPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.62 ? "auto" : "none"
  );

  return (
    <section id="platform" ref={containerRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <motion.div
            style={{ scale }}
            className="w-[min(86vw,760px)] will-change-transform"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {allCols.map((col, colIdx) => (
                <motion.div
                  key={colIdx}
                  style={{
                    x: colIdx === 0 ? leftColX : colIdx === 2 ? rightColX : 0,
                  }}
                  className="flex flex-col gap-3 will-change-transform sm:gap-4"
                >
                  {col.map((src, pos) => (
                    <GridTile
                      key={src}
                      progress={scrollYProgress}
                      src={src}
                      colIndex={colIdx}
                      pos={pos}
                      colLen={col.length}
                    />
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <h2 className="text-balance font-serif text-3xl font-normal leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]">
              Total{" "}
              <span className="font-sans font-semibold tracking-tight text-white">
                visibility
              </span>{" "}
              across your entire infrastructure
            </h2>
          </motion.div>

          <motion.div
            style={{
              opacity: btnOpacity,
              y: btnY,
              pointerEvents: btnPointerEvents,
            }}
            className="mt-8 flex flex-col items-center"
          >
            <Link
              href="#platform-details"
              style={{ "--cut": "9px" } as React.CSSProperties}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-10 px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-foreground text-background hover:bg-foreground/85"
            >
              Explore the platform
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
