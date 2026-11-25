"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  [124, 45, 18],
  [154, 52, 18],
  [194, 65, 12],
  [234, 88, 12],
  [249, 115, 22],
  [251, 146, 60],
  [253, 186, 116],
];
const DEFAULT_COLOR = [249, 115, 22];

export function PixelField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const initialTime = 1000 * Math.random();
    let time = initialTime;
    let lastStamp = 0;
    let running = true;
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let offsetX = 0;
    let cells: { a: number; t: number }[] = [];
    let speedCount = 1;

    const calcProb = (c: number, r: number) =>
      Math.pow(c / Math.max(1, cols - 1), 1.7) *
      Math.pow(1 - r / Math.max(1, rows - 1), 1.1);

    const pickCell = (idx: number) => {
      const cell = cells[idx];
      if (cell) {
        cell.t =
          Math.random() < calcProb(idx % cols, Math.floor(idx / cols))
            ? 0.45 + 0.55 * Math.random()
            : 0;
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      cells.forEach((cell, idx) => {
        if (cell.a < 0.01) return;
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        let r = 0.18 * col + initialTime;
        let n = 0.18 * row;
        for (let e = 1; e < 6; e++) {
          r += (1 / e) * Math.sin(e * n + t);
          n += (1 / e) * Math.cos(e * r + t);
        }
        let noise = (0.5 + 0.5 * Math.sin(r + n) - 0.5) * 1.2 + 0.5;
        noise = Math.max(0, Math.min(1, noise));

        const palIdx = Math.floor(noise * (PALETTE.length - 1));
        const nextIdx = Math.min(palIdx + 1, PALETTE.length - 1);
        const frac = noise * (PALETTE.length - 1) - palIdx;
        const c1 = PALETTE[palIdx] ?? DEFAULT_COLOR;
        const c2 = PALETTE[nextIdx] ?? DEFAULT_COLOR;

        const red = Math.round(c1[0] + (c2[0] - c1[0]) * frac);
        const green = Math.round(c1[1] + (c2[1] - c1[1]) * frac);
        const blue = Math.round(c1[2] + (c2[2] - c1[2]) * frac);

        const x1 = Math.round(offsetX + 30 * col);
        const x2 = Math.round(offsetX + (col + 1) * 30);
        const y1 = Math.round(30 * row);
        const y2 = Math.round((row + 1) * 30);

        ctx.globalAlpha = Math.min(1, cell.a);
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (timestamp: number) => {
      if (lastStamp === 0) lastStamp = timestamp;
      time += (timestamp - lastStamp) * 0.00035;
      lastStamp = timestamp;

      for (let i = 0; i < speedCount; i++) {
        pickCell(Math.floor(Math.random() * cells.length));
      }
      cells.forEach((c) => {
        c.a += (c.t - c.a) * 0.07;
      });

      draw(time);
      if (running) animId = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / 30);
      rows = Math.ceil(height / 30);
      offsetX = width - 30 * cols;
      speedCount = Math.max(1, Math.round(cols * rows * 0.006));
      cells = Array.from({ length: cols * rows }, (_, idx) => {
        const prob =
          Math.random() < calcProb(idx % cols, Math.floor(idx / cols))
            ? 0.45 + 0.55 * Math.random()
            : 0;
        return { a: prob, t: prob };
      });
      draw(initialTime);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    animId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
