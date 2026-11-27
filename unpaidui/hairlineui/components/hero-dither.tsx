"use client";

import { useEffect, useRef } from "react";

const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55,
  23, 61, 29, 53, 21,
].map((e) => (e + 0.5) / 64);

const COLOR_A = [48, 93, 222];
const COLOR_B = [85, 166, 218];
const COLOR_C = [137, 111, 222];

const gaussian = (e: number) => Math.exp(-e * e * 2);
const smoothstep = (min: number, max: number, val: number) => {
  const t = Math.max(0, Math.min(1, (val - min) / (max - min)));
  return t * t * (3 - 2 * t);
};

export function HeroDitherCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let renderFn: ((time: number) => void) | null = null;
    let animId = 0;
    let lastTime = 0;
    let simTime = 0;
    let prevSimTime = 0;
    let isIntersecting = false;

    const step = (now: number) => {
      if (now - lastTime >= 80) {
        simTime += Math.min(now - prevSimTime, 100) / 1000;
        prevSimTime = now;
        lastTime = now;
        renderFn?.(simTime);
      }
      animId = requestAnimationFrame(step);
    };

    const toggleLoop = () => {
      cancelAnimationFrame(animId);
      if (prefersReducedMotion.matches) {
        renderFn?.(0);
      } else if (isIntersecting && !document.hidden) {
        lastTime = prevSimTime = performance.now();
        animId = requestAnimationFrame(step);
      }
    };

    const setupDither = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;

      const scale = Math.max(2, Math.ceil(width / 900));
      const cols = Math.ceil(width / scale);
      const rows = Math.ceil(height / scale);
      const isMobile = width < 640;

      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = `${cols * scale}px`;
      canvas.style.height = `${rows * scale}px`;

      const imgData = ctx.createImageData(cols, rows);
      const rowX = new Float32Array(cols);
      const rowY = new Float32Array(rows);
      const rowCenterY = new Float32Array(rows);

      for (let x = 0; x < cols; x++) {
        const t = (x / cols - 0.5) / (isMobile ? 0.49 : 0.36);
        rowX[x] = Math.exp(-Math.pow(t, 4));
      }

      for (let y = 0; y < rows; y++) {
        const t = y / rows;
        rowY[y] = (0.55 + 0.45 * smoothstep(0, 0.14, t)) * (1 - smoothstep(0.58, 0.98, t));
        rowCenterY[y] = Math.exp(-Math.pow((t - 0.39) / 0.38, 6));
      }

      const buf32 = new Uint32Array(imgData.data.buffer);

      renderFn = (timeVal: number) => {
        const data = imgData.data;
        const c = 0.12 * timeVal;

        for (let y = 0; y < rows; y++) {
          const normY = y / rows;
          const theta = normY * Math.PI * 2;
          const m = 0.015 + 0.055 * Math.sin(theta - c);
          const b = 0.985 - 0.06 * Math.sin(0.85 * theta + c + 0.8);
          const yAmp = (isMobile ? 0.19 : 0.125) + 0.025 * Math.sin(theta + c);
          const v = m + yAmp * (0.8 + 0.3 * Math.sin(1.3 * theta + c));
          const k = b - yAmp * (0.8 + 0.3 * Math.cos(theta + c));
          const j = smoothstep(0.25, 0.7, normY);
          const A = smoothstep(0.3, 0.8, normY);

          const startX = Math.min(cols, Math.ceil(cols * Math.max(m + 1.6 * yAmp, v + 0.4 * yAmp)));
          const endX = Math.max(startX, Math.floor(cols * Math.min(b - 1.6 * yAmp, k - 0.45 * yAmp)));

          buf32.fill(0, y * cols + startX, y * cols + endX);

          for (let x = 0; x < cols; x++) {
            if (x === startX && endX > startX) {
              x = endX;
              if (x >= cols) break;
            }

            const normX = x / cols;
            const leftDist = gaussian((normX - m) / yAmp) + 0.32 * gaussian((normX - v) / (0.25 * yAmp));
            const rightDist = gaussian((normX - b) / yAmp) + 0.32 * gaussian((normX - k) / (0.28 * yAmp));
            const intensity =
              Math.min(0.58, 0.48 * Math.max(leftDist, rightDist)) *
              (1 - rowX[x] * rowCenterY[y] * 0.99) *
              rowY[y];

            const idx = (y * cols + x) * 4;
            const bayerThreshold = BAYER[(7 & y) * 8 + (7 & x)];

            if (intensity <= bayerThreshold) {
              data[idx + 3] = 0;
              continue;
            }

            const colorChoice = BAYER[((y + 3) & 7) * 8 + ((x + 5) & 7)];
            const chosen =
              leftDist > rightDist
                ? colorChoice < j
                  ? COLOR_B
                  : COLOR_A
                : colorChoice < A
                ? COLOR_A
                : COLOR_C;

            data[idx] = chosen[0];
            data[idx + 1] = chosen[1];
            data[idx + 2] = chosen[2];
            data[idx + 3] = Math.round((isMobile ? 95 : 125) + 70 * intensity);
          }
        }
        ctx.putImageData(imgData, 0, 0);
      };

      renderFn(prefersReducedMotion.matches ? 0 : simTime);
      container.dataset.ready = "true";
    };

    setupDither();

    const resizeObs = new ResizeObserver(setupDither);
    resizeObs.observe(container);

    const intObs = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      toggleLoop();
    });
    intObs.observe(container);

    prefersReducedMotion.addEventListener("change", toggleLoop);
    document.addEventListener("visibilitychange", toggleLoop);

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      intObs.disconnect();
      prefersReducedMotion.removeEventListener("change", toggleLoop);
      document.removeEventListener("visibilitychange", toggleLoop);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden={true}
      className="HeroBackdrop-module__aDxGNq__backdrop pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
    >
      <div className="HeroBackdrop-module__aDxGNq__fallback" />
      <canvas ref={canvasRef} className="HeroBackdrop-module__aDxGNq__field" />
    </div>
  );
}
