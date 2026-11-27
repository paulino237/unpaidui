"use client";

import { useEffect, useRef } from "react";
import { CornerPlus } from "./corner-plus";
import { AlertTriangle, Layers } from "lucide-react";

const ASCII_CHARS = " .:-=+*oahkbd#WM".split("");

function AsciiCanvas({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let animId: number;
    let time = 0;

    img.onload = () => {
      const cols = 75;
      const aspect = img.height / img.width;
      const rows = Math.max(1, Math.round(cols * aspect * (5 / 8)));

      const offscreen = document.createElement("canvas");
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const rawLums = new Float32Array(cols * rows);
      let minL = 1;
      let maxL = 0;

      for (let i = 0; i < cols * rows; i++) {
        const lum =
          (0.299 * (imgData[i * 4] ?? 0) +
            0.587 * (imgData[i * 4 + 1] ?? 0) +
            0.114 * (imgData[i * 4 + 2] ?? 0)) /
          255;
        rawLums[i] = lum;
        if (lum < minL) minL = lum;
        if (lum > maxL) maxL = lum;
      }

      const range = maxL - minL || 1;

      const render = () => {
        time += 0.02;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cellW = canvas.width / cols;
        const cellH = canvas.height / rows;

        ctx.font = `${Math.floor(cellH * 1.1)}px monospace`;
        ctx.fillStyle = "#2f80ff";
        ctx.textBaseline = "top";

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = y * cols + x;
            let norm = (rawLums[idx] - minL) / range;
            const wave = Math.sin(x * 0.15 + time) * 0.08;
            norm = Math.max(0, Math.min(1, norm + wave));

            const charIdx = Math.floor(norm * (ASCII_CHARS.length - 1));
            const ch = ASCII_CHARS[charIdx];

            if (norm > 0.15) {
              ctx.globalAlpha = Math.min(0.9, norm * 1.1);
              ctx.fillText(ch, x * cellW, y * cellH);
            }
          }
        }

        animId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [src]);

  return <canvas ref={canvasRef} className="block h-full w-full object-cover" />;
}

export function ComparisonSection() {
  const chamferLarge = {
    clipPath:
      "polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)",
  };

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="lg:order-1">
            <p className="text-sm font-medium text-muted-foreground">The challenge</p>
            <h2 className="mt-5 max-w-2xl text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
              A unified platform gives your team an edge,{" "}
              <span className="font-sans font-semibold tracking-tight">
                but stitching tools together comes with tradeoffs
              </span>
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border border-border/80 bg-background/60 p-6 rounded-lg transition-transform hover:-translate-y-0.5 duration-200">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h3>Alert Fatigue</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Disconnected tools flood your team with noise, burying the signals that actually
                  matter.
                </p>
              </div>

              <div className="border border-border/80 bg-background/60 p-6 rounded-lg transition-transform hover:-translate-y-0.5 duration-200">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Layers className="h-4 w-4 text-blue-500" />
                  <h3>The Coverage Gap</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Every new vendor adds another blind spot, and stitching them together is a
                  long-term burden.
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-square lg:order-2 bg-[#05122e] [filter:saturate(1.35)]"
            style={chamferLarge}
          >
            <div className="absolute inset-0">
              <AsciiCanvas src="/grid/05.webp" />
            </div>
            <div className="absolute inset-0 bg-[#1466ff] mix-blend-color opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-[#0a235c] opacity-30 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="flex items-center">
            <div
              style={{ "--cut": "28px" } as React.CSSProperties}
              className="relative aspect-[4/5] w-full overflow-hidden [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-[#05122e]"
            >
              <div className="absolute inset-0">
                <AsciiCanvas src="/grid/02.webp" />
              </div>
              <div className="absolute inset-0 bg-[#1466ff] mix-blend-color opacity-30 pointer-events-none" />
              <div className="absolute inset-0 bg-[#0a235c] opacity-30 mix-blend-multiply pointer-events-none" />
            </div>
          </div>

          <div className="relative flex flex-col justify-center lg:border-l lg:border-border lg:pl-12">
            <CornerPlus className="left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
            <CornerPlus className="bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Real reviews from real customers
            </p>

            <blockquote className="mt-6 text-balance font-serif text-2xl font-normal leading-relaxed text-foreground sm:text-3xl">
              &ldquo;The flexibility is really what made the difference. Our threat surface shifts
              weekly — I surface a new gap and in two clicks Sentinel already has it covered. That
              is a real advantage when you are moving quickly.&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center font-semibold text-white text-sm">
                OR
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  Olivier Reinaud
                </p>
                <p className="text-xs text-muted-foreground">Co-founder at NetZero</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
