"use client";

import React, { useRef, useEffect } from "react";

export function PixelatedIcon({
  icon: Icon,
  pixels = 28,
  className,
}: {
  icon: React.ComponentType<{
    ref?: React.Ref<SVGSVGElement>;
    strokeWidth?: number;
    className?: string;
  }>;
  pixels?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color = getComputedStyle(svg).color;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", "256");
    clone.setAttribute("height", "256");
    clone.style.color = color;

    const dataUrl =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(new XMLSerializer().serializeToString(clone));

    const offscreen = document.createElement("canvas");
    offscreen.width = pixels;
    offscreen.height = pixels;
    const offCtx = offscreen.getContext("2d");
    const img = new Image();
    let aborted = false;

    const render = () => {
      if (aborted || !offCtx) return;
      const size = Math.round(canvas.getBoundingClientRect().width);
      if (size === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      offCtx.clearRect(0, 0, pixels, pixels);
      offCtx.imageSmoothingEnabled = true;
      offCtx.drawImage(img, 0, 0, pixels, pixels);

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(offscreen, 0, 0, pixels, pixels, 0, 0, size, size);
    };

    img.onload = render;
    img.src = dataUrl;

    const ro = new ResizeObserver(render);
    ro.observe(canvas);

    return () => {
      aborted = true;
      ro.disconnect();
    };
  }, [pixels]);

  return (
    <>
      <Icon
        ref={svgRef}
        strokeWidth={2.25}
        className="pointer-events-none absolute h-0 w-0 opacity-0 text-accent"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={className}
        style={{ imageRendering: "pixelated", aspectRatio: "1 / 1" }}
      />
    </>
  );
}
