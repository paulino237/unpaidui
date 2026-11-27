"use client";

import { useEffect, useRef } from "react";

const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55,
  23, 61, 29, 53, 21,
].map((e) => (e + 0.5) / 64);

const clamp = (val: number) => Math.min(1, Math.max(0, val));

export function CardDitherCanvas({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const render = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const dotSpacing = Math.max(2, Math.round(5 * dpr));
      const dotSize = Math.max(1, Math.round(3 * dpr));

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getComputedStyle(canvas).color || color;

      // Extract obstacle rectangles from text and buttons in parent
      const parentRect = canvas.getBoundingClientRect();
      const obstacles: { x0: number; y0: number; x1: number; y1: number }[] = [];

      const addRect = (rect: DOMRect) => {
        if (rect.width && rect.height && rect.top < parentRect.bottom && rect.left < parentRect.right) {
          obstacles.push({
            x0: rect.left - parentRect.left,
            y0: rect.top - parentRect.top,
            x1: rect.right - parentRect.left,
            y1: rect.bottom - parentRect.top,
          });
        }
      };

      const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      let node = walker.nextNode();
      while (node) {
        if (node.textContent?.trim()) {
          range.selectNodeContents(node);
          for (const rect of Array.from(range.getClientRects())) {
            addRect(rect);
          }
        }
        node = walker.nextNode();
      }

      for (const el of Array.from(parent.querySelectorAll("*"))) {
        if (el !== canvas && (el instanceof SVGSVGElement || getComputedStyle(el).backgroundColor !== "rgba(0, 0, 0, 0)")) {
          addRect(el.getBoundingClientRect());
        }
      }

      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const normX = x / cols;
          const normY = y / rows;
          let density = Math.pow(
            Math.max(
              clamp(1 - normY / 0.42) * clamp(1 - normX),
              clamp(1 - normX / 0.2) * clamp(1 - normY)
            ),
            1.1
          );

          if (density <= 0) continue;

          // Check distance to closest obstacle
          const ptX0 = (x * dotSpacing) / dpr;
          const ptY0 = (y * dotSpacing) / dpr;
          const ptX1 = (x * dotSpacing + dotSize) / dpr;
          const ptY1 = (y * dotSpacing + dotSize) / dpr;

          let minDist = Infinity;
          for (const obs of obstacles) {
            const dx = Math.max(0, obs.x0 - ptX1, ptX0 - obs.x1);
            const dy = Math.max(0, obs.y0 - ptY1, ptY0 - obs.y1);
            const dist = Math.hypot(dx, dy);
            if (dist === 0) {
              minDist = 0;
              break;
            }
            if (dist < minDist) minDist = dist;
          }

          if (minDist >= 5) {
            density *= clamp((minDist - 5) / 9);
            if (density > BAYER[(y % 8) * 8 + (x % 8)]) {
              ctx.fillRect(x * dotSpacing, y * dotSpacing, dotSize, dotSize);
            }
          }
        }
      }
    };

    render();
    const resizeObs = new ResizeObserver(render);
    resizeObs.observe(parent);

    const mutObs = new MutationObserver(render);
    mutObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    document.fonts?.ready.then(() => render());

    return () => {
      resizeObs.disconnect();
      mutObs.disconnect();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden={true}
      className={`pointer-events-none absolute left-0 top-0 ${className}`}
      style={{ color }}
    />
  );
}
