"use client";

import { useEffect, useRef } from "react";

interface ParticleHeadingProps {
  text?: string;
  className?: string;
  color?: string;
  aspectRatio?: string;
  fontSize?: string;
  as?: "h1" | "div";
}

export function ParticleHeading({
  text = "Aldena Studio",
  className = "",
  color = "#ffffff",
  aspectRatio = "5.33",
  fontSize = "clamp(3.5rem, 16.5vw, 15rem)",
  as: Component = "h1",
}: ParticleHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    if (!container || !canvas || !textEl) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    const padding = 120;

    interface Particle {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      seed: number;
      moving: boolean;
    }

    let particles: Particle[] = [];
    let activeParticles: Particle[] = [];
    let particleShapeCanvas: HTMLCanvasElement | null = null;

    const mouse = { x: -9999, y: -9999, inside: false };
    let width = 0;
    let height = 0;
    let dpr = 1;

    const radius = 60;
    const strength = 1.6;
    const returnSpeed = 0.11;
    const smoothness = 0.88;

    const createParticleCache = (size: number) => {
      const pCanvas = document.createElement("canvas");
      const pSize = Math.max(1, Math.round(size * dpr));
      pCanvas.width = pSize;
      pCanvas.height = pSize;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        pCtx.fillStyle = color;
        pCtx.fillRect(0, 0, pSize, pSize);
      }
      return { pCanvas, size };
    };

    const updateDimensionsAndParticles = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width < 10 || height < 10) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor((width + padding * 2) * dpr);
      canvas.height = Math.floor((height + padding * 2) * dpr);

      const off = document.createElement("canvas");
      off.width = Math.floor(width * dpr);
      off.height = Math.floor(height * dpr);
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const computed = window.getComputedStyle(textEl);
      const computedSize = parseFloat(computed.fontSize) || width * 0.18;

      offCtx.scale(dpr, dpr);
      offCtx.font = `600 ${computedSize}px var(--font-baskervville), Baskervville, serif`;
      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.letterSpacing = "-0.04em";
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, off.width, off.height).data;
      particles = [];

      const pSize = Math.max(2.5, (computedSize / 26) * 0.95);
      const cache = createParticleCache(pSize);
      particleShapeCanvas = cache.pCanvas;

      const pixelStep = Math.max(2, Math.round(3 * dpr));
      for (let py = 0; py < off.height; py += pixelStep) {
        for (let px = 0; px < off.width; px += pixelStep) {
          const idx = (py * off.width + px) * 4;
          if (imgData[idx + 3] > 80) {
            const rx = px / dpr;
            const ry = py / dpr;
            particles.push({
              x: rx,
              y: ry,
              tx: rx,
              ty: ry,
              vx: 0,
              vy: 0,
              seed: Math.random(),
              moving: false,
            });
          }
        }
      }

      activeParticles = [...particles];
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateDimensionsAndParticles();
      });
    } else {
      updateDimensionsAndParticles();
    }

    const ro = new ResizeObserver(() => {
      updateDimensionsAndParticles();
    });
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;
    };

    const onPointerLeave = () => {
      mouse.inside = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!particleShapeCanvas || activeParticles.length === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const pDrawSize = particleShapeCanvas.width / dpr;
      const rSq = radius * radius;
      const invSmoothness = 1 - smoothness;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(padding, padding);

      for (let i = 0; i < activeParticles.length; i++) {
        const p = activeParticles[i];

        if (mouse.inside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < rSq && dSq > 0.001) {
            const dist = Math.sqrt(dSq);
            const force = (1 - dist / radius) * strength * 8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.moving = true;
          }
        }

        const homeDx = p.tx - p.x;
        const homeDy = p.ty - p.y;
        p.vx += homeDx * returnSpeed;
        p.vy += homeDy * returnSpeed;

        p.vx *= 1 - invSmoothness;
        p.vy *= 1 - invSmoothness;

        p.x += p.vx;
        p.y += p.vy;

        const isDisplaced =
          Math.abs(p.x - p.tx) > 0.1 || Math.abs(p.y - p.ty) > 0.1;
        p.moving = isDisplaced || Math.abs(p.vx) > 0.05 || Math.abs(p.vy) > 0.05;

        ctx.drawImage(
          particleShapeCanvas,
          Math.round(p.x - pDrawSize / 2),
          Math.round(p.y - pDrawSize / 2),
          pDrawSize,
          pDrawSize
        );
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [text, color]);

  return (
    <Component
      ref={containerRef as any}
      className={`relative mx-auto flex w-full items-center justify-center overflow-visible touch-pan-y ${className}`}
      style={{
        aspectRatio,
        margin: 0,
      }}
    >
      {/* Real HTML Text that is ALWAYS huge, crystal clear, responsive & visible */}
      <div
        ref={textRef}
        aria-label={text}
        className="pointer-events-none select-none text-center font-serif font-semibold tracking-[-0.04em]"
        style={{
          color,
          fontSize,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>

      {/* Particle Canvas on top for interactive cursor repulsion */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute block"
        style={{
          left: -120,
          top: -120,
          width: "calc(100% + 240px)",
          height: "calc(100% + 240px)",
        }}
      />
    </Component>
  );
}
