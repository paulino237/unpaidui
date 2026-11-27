"use client";

import { useEffect, useRef } from "react";

export function HeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h * 0.44;
      const mouse = mouseRef.current;

      const ringCount = 26;
      const baseSpacing = 24;

      for (let i = 2; i <= ringCount; i++) {
        const baseR = i * baseSpacing;
        const distRatio = i / ringCount;
        const alpha = Math.max(
          0.04,
          Math.min(0.28, 0.32 - distRatio * 0.24)
        );

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.35;

        const steps = 180;
        for (let j = 0; j <= steps; j++) {
          const theta = (j / steps) * Math.PI * 2;

          const wave1 = Math.sin(theta * 5 + time * 0.9 + i * 0.25) * 14;
          const wave2 = Math.cos(theta * 8 - time * 0.7 + i * 0.35) * 10;
          const wave3 = Math.sin(theta * 3 + time * 0.45) * 18;
          let r = baseR + wave1 + wave2 + wave3;

          let px = centerX + Math.cos(theta) * r * 1.5;
          let py = centerY + Math.sin(theta) * r * 0.92;

          if (mouse) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const push = (1 - dist / 200) * 28;
              px += (dx / (dist || 1)) * push;
              py += (dy / (dist || 1)) * push;
            }
          }

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 70% 65% at 50% 45%, black 20%, transparent 90%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 65% at 50% 45%, black 20%, transparent 90%)",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
