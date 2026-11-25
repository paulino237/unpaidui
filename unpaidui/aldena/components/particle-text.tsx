"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  text?: string;
  className?: string;
}

export function ParticleText({ text = "Aldena Studio", className = "" }: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    const padding = 120; // Framer Xe = 120

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
    let textCanvas: HTMLCanvasElement | null = null;
    let particleShapeCanvas: HTMLCanvasElement | null = null;
    let maskCanvas: HTMLCanvasElement | null = null;

    const mouse = { x: -9999, y: -9999, inside: false };
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Density and particle size configs from Framer
    const radius = 55;
    const strength = 1.8;
    const returnSpeed = 0.12;
    const smoothness = 0.88;

    const createParticleCache = (size: number) => {
      const pCanvas = document.createElement("canvas");
      const pSize = Math.max(1, Math.round(size * dpr));
      pCanvas.width = pSize;
      pCanvas.height = pSize;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        pCtx.fillStyle = "#ffffff";
        pCtx.fillRect(0, 0, pSize, pSize);
      }

      const mCanvas = document.createElement("canvas");
      mCanvas.width = pSize;
      mCanvas.height = pSize;
      const mCtx = mCanvas.getContext("2d");
      if (mCtx) {
        mCtx.fillStyle = "#000000";
        mCtx.fillRect(0, 0, pSize, pSize);
      }

      return { pCanvas, mCanvas, size };
    };

    const rasterizeText = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width < 10 || height < 10) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Canvas dimensions with Xe=120 padding
      canvas.width = Math.floor((width + padding * 2) * dpr);
      canvas.height = Math.floor((height + padding * 2) * dpr);

      // Create text rasterization offscreen canvas
      const off = document.createElement("canvas");
      off.width = Math.floor(width * dpr);
      off.height = Math.floor(height * dpr);
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Font size to fill width prominently:
      // Baskervville font has specific letter widths; width / 5.2 gives massive display size
      const fontSize = Math.floor(width / 5.1);
      offCtx.scale(dpr, dpr);
      offCtx.font = `600 ${fontSize}px var(--font-baskervville), Baskervville, serif`;
      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.letterSpacing = "-0.04em";
      offCtx.fillText(text, width / 2, height / 2);

      textCanvas = off;

      const imgData = offCtx.getImageData(0, 0, off.width, off.height).data;
      particles = [];

      const pSize = Math.max(2, (fontSize / 24) * 0.95);
      const cache = createParticleCache(pSize);
      particleShapeCanvas = cache.pCanvas;
      maskCanvas = cache.mCanvas;

      const pixelStep = Math.max(2, Math.round(2.5 * dpr));
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

    // Wait for fonts to load before rasterizing to ensure exact Baskervville font metric
    if (document.fonts) {
      document.fonts.ready.then(rasterizeText).catch(rasterizeText);
    } else {
      rasterizeText();
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;
    };

    const handlePointerLeave = () => {
      mouse.inside = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", rasterizeText);

    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.setTransform(dpr, 0, 0, dpr, padding * dpr, padding * dpr);
      ctx.clearRect(-padding, -padding, width + padding * 2, height + padding * 2);

      let anyMoving = false;

      // Draw baseline static crisp text
      if (textCanvas) {
        ctx.drawImage(textCanvas, 0, 0, width, height);
      }

      const activeCount = activeParticles.length;
      for (let i = 0; i < activeCount; i++) {
        const p = activeParticles[i];

        if (mouse.inside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radSq = radius * radius;

          if (distSq < radSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / radius;
            const force = norm * norm * strength * 280;
            const dirX = dx / dist;
            const dirY = dy / dist;

            p.vx += dirX * force * dt;
            p.vy += dirY * force * dt;
            p.moving = true;
          }
        }

        if (p.moving) {
          anyMoving = true;
          const retSpeed = returnSpeed * (0.8 + 0.4 * p.seed);
          const sprX = (p.tx - p.x) * (retSpeed * 220);
          const sprY = (p.ty - p.y) * (retSpeed * 220);

          p.vx += sprX * dt;
          p.vy += sprY * dt;

          p.vx *= smoothness;
          p.vy *= smoothness;

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          const distToTarget = (p.x - p.tx) * (p.x - p.tx) + (p.y - p.ty) * (p.y - p.ty);
          if (distToTarget < 0.25 && Math.abs(p.vx) < 0.2 && Math.abs(p.vy) < 0.2) {
            p.x = p.tx;
            p.y = p.ty;
            p.vx = 0;
            p.vy = 0;
            p.moving = false;
          }
        }
      }

      // If particles moved away, mask out the static base text and draw displaced square particles
      if (anyMoving && maskCanvas && particleShapeCanvas) {
        const half = particleShapeCanvas.width / (2 * dpr);

        ctx.globalCompositeOperation = "destination-out";
        for (let i = 0; i < activeCount; i++) {
          const p = activeParticles[i];
          if (p.moving) {
            ctx.drawImage(maskCanvas, p.tx - half, p.ty - half, half * 2, half * 2);
          }
        }

        ctx.globalCompositeOperation = "source-over";
        for (let i = 0; i < activeCount; i++) {
          const p = activeParticles[i];
          if (p.moving) {
            ctx.drawImage(particleShapeCanvas, p.x - half, p.y - half, half * 2, half * 2);
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", rasterizeText);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full overflow-visible touch-pan-y ${className}`}
      style={{ aspectRatio: "5.33" }}
    >
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
    </div>
  );
}
