"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

const CREATORS = [
  { handle: "@maya.cuts", location: [37.78, -122.44] as [number, number], avatar: "https://i.pravatar.cc/96?img=5" },
  { handle: "@leo.edits", location: [40.71, -74.01] as [number, number], avatar: "https://i.pravatar.cc/96?img=12" },
  { handle: "@noor.films", location: [51.51, -0.13] as [number, number], avatar: "https://i.pravatar.cc/96?img=32" },
  { handle: "@kenji.v", location: [35.68, 139.69] as [number, number], avatar: "https://i.pravatar.cc/96?img=68" },
  { handle: "@ana.reels", location: [-23.55, -46.63] as [number, number], avatar: "https://i.pravatar.cc/96?img=45" },
  { handle: "@priya.shoots", location: [19.08, 72.88] as [number, number], avatar: "https://i.pravatar.cc/96?img=24" },
  { handle: "@sam.motion", location: [-33.87, 151.21] as [number, number], avatar: "https://i.pravatar.cc/96?img=15" },
  { handle: "@diego.frames", location: [19.43, -99.13] as [number, number], avatar: "https://i.pravatar.cc/96?img=52" },
  { handle: "@yuki.lab", location: [1.35, 103.82] as [number, number], avatar: "https://i.pravatar.cc/96?img=60" },
  { handle: "@thabo.makes", location: [-26.2, 28.04] as [number, number], avatar: "https://i.pravatar.cc/96?img=64" },
  { handle: "@freya.north", location: [59.91, 10.75] as [number, number], avatar: "https://i.pravatar.cc/96?img=20" },
  { handle: "@omar.reel", location: [25.2, 55.27] as [number, number], avatar: "https://i.pravatar.cc/96?img=27" },
];

interface MarkerState {
  x: number;
  y: number;
  front: number;
  visible: boolean;
}

function projectMarker(location: [number, number], phi: number): MarkerState {
  const lat = (location[0] * Math.PI) / 180;
  const lon = (location[1] * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(lat);
  const p0 = -cosLat * Math.cos(lon) * 0.8;
  const p1 = Math.sin(lat) * 0.8;
  const p2 = cosLat * Math.sin(lon) * 0.8;

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(0.25);
  const sinTheta = Math.sin(0.25);

  const rx = cosPhi * p0 + sinPhi * p2;
  const ry = sinTheta * sinPhi * p0 + cosTheta * p1 - sinTheta * cosPhi * p2;
  const rz = -(cosTheta * sinPhi) * p0 + sinTheta * p1 + cosTheta * cosPhi * p2;

  return {
    x: (rx + 1) / 2,
    y: (-ry + 1) / 2,
    front: rz / 0.8,
    visible: rz > -0.04,
  };
}

function InteractiveGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDownX = useRef<number | null>(null);
  const pointerOffset = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const reduced = useReducedMotion();
  const [markers, setMarkers] = useState<MarkerState[]>(() =>
    CREATORS.map(() => ({ x: 0.5, y: 0.5, front: -1, visible: false }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isDark = document.documentElement.classList.contains("dark");
    let width = container.offsetWidth || 800;
    let phi = 0;
    let rafId = 0;
    let running = false;

    const onResize = () => {
      if (container) width = container.offsetWidth || 800;
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 1,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 2,
      mapSamples: 20000,
      mapBrightness: isDark ? 1 : 0.5,
      baseColor: isDark ? [0.95, 0.45, 0.12] : [1, 1, 1],
      markerColor: [0.96, 0.45, 0.12],
      glowColor: isDark ? [0.35, 0.18, 0.08] : [0.99, 0.7, 0.42],
      markers: [],
    });

    const tick = () => {
      if (pointerDownX.current === null && !reduced) {
        phi += 0.0035;
      }
      currentRotation.current += (targetRotation.current - currentRotation.current) * 0.1;
      const angle = phi + currentRotation.current;
      globe.update({ phi: angle, width: width * 2, height: width * 2 });

      const projected = CREATORS.map((c) => projectMarker(c.location, angle));
      const placed: MarkerState[] = [];
      const culled = projected.map((m) => {
        if (!m.visible) return m;
        if (placed.some((p) => Math.hypot(p.x - m.x, p.y - m.y) < 0.13)) {
          return { ...m, visible: false };
        }
        placed.push(m);
        return m;
      });
      setMarkers(culled);

      if (running) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !running) {
          running = true;
          rafId = requestAnimationFrame(tick);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      globe.destroy();
    };
  }, [reduced]);

  const handlePointerEnd = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerDownX.current = null;
    e.currentTarget.style.cursor = "grab";
  };

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full cursor-grab touch-none"
        style={{ aspectRatio: "1 / 1" }}
        onPointerDown={(e) => {
          pointerDownX.current = e.clientX - pointerOffset.current;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          if (pointerDownX.current === null) return;
          const delta = e.clientX - pointerDownX.current;
          pointerOffset.current = delta;
          targetRotation.current = delta / 200;
        }}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      />

      {CREATORS.map((creator, i) => {
        const m = markers[i] ?? { x: 0.5, y: 0.5, front: -1, visible: false };
        const t = Math.min(1, Math.max(0, (m.front - -0.05) / 0.3));
        const smooth = t * t * (3 - 2 * t);
        const opacity = m.visible ? smooth : 0;
        const blur = (1 - smooth) * 6;

        return (
          <div
            key={creator.handle}
            className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center"
            style={{
              left: `${100 * m.x}%`,
              top: `${100 * m.y}%`,
              opacity,
              filter: `blur(${blur}px)`,
            }}
          >
            <span className="bg-muted border-border relative z-2 h-9 w-9 shrink-0 overflow-hidden rounded-sm border-2 shadow-sm sm:h-11 sm:w-11">
              <img
                src={creator.avatar}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="border-border bg-background/90 text-foreground relative -left-2 hidden rounded-sm border-2 px-2.5 py-1 font-mono text-xs font-medium tracking-tight shadow-sm backdrop-blur-sm sm:inline-block">
              {creator.handle}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function CreatorsSection() {
  const reduced = useReducedMotion();

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  const containerVariant = {
    hidden: {},
    visible: { transition: reduced ? {} : { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border relative overflow-hidden border border-t-0">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 mx-auto max-w-2xl px-6 pt-16 text-center sm:px-10 sm:pt-20 lg:pt-24"
        >
          <motion.p variants={itemVariant} className="text-accent flex items-center justify-center gap-2 font-mono text-xs tracking-tight">
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Global community
          </motion.p>
          <motion.h2 variants={itemVariant} className="text-foreground mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Creators from all over the world
          </motion.h2>
          <motion.p variants={itemVariant} className="text-muted-foreground mx-auto mt-5 max-w-md text-base leading-relaxed text-pretty sm:text-lg">
            From solo editors to studio teams, Pixelpush powers talented video makers in every timezone.
          </motion.p>
        </motion.div>

        <div className="relative aspect-[5/2] w-full overflow-hidden">
          <div className="absolute top-0 left-1/2 aspect-square w-[min(1100px,112%)] -translate-x-1/2">
            <InteractiveGlobe className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
