"use client";

import { useEffect, useRef } from "react";

interface CanvasRibbonProps {
  onHoverPoint?: (index: number | null, pos?: { x: number; y: number }) => void;
  scrollProgress?: number;
}

export function CanvasRibbon({ onHoverPoint, scrollProgress = 0 }: CanvasRibbonProps) {
  const flowRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const flowCanvas = flowRef.current;
    const glowCanvas = glowRef.current;
    if (!flowCanvas || !glowCanvas) return;

    const ctx = flowCanvas.getContext("2d");
    const glowCtx = glowCanvas.getContext("2d");
    if (!ctx || !glowCtx) return;

    const colorStops: [number, string][] = [
      [0, "#fbc22f"],
      [0.28, "#ff5735"],
      [0.57, "#ff007f"],
      [0.88, "#b61bd1"],
      [1, "#b61bd1"],
    ];

    const hexToRgb = (hex: string): [number, number, number] => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];

    const rgbStops = colorStops.map(([stop, hex]) => [stop, hexToRgb(hex)] as [number, [number, number, number]]);

    const colorLookup: [number, number, number][] = [];
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      let idx = 0;
      while (idx < rgbStops.length - 2 && t > rgbStops[idx + 1][0]) idx++;
      const [r1, c1] = rgbStops[idx];
      const [r2, c2] = rgbStops[idx + 1];
      const s = Math.min(1, Math.max(0, (t - r1) / (r2 - r1 || 1)));
      colorLookup.push([
        Math.round(c1[0] + (c2[0] - c1[0]) * s),
        Math.round(c1[1] + (c2[1] - c1[1]) * s),
        Math.round(c1[2] + (c2[2] - c1[2]) * s),
      ]);
    }

    const getColor = (t: number) => {
      const clamped = Math.min(1, Math.max(0, t));
      return colorLookup[(clamped * 255) | 0];
    };

    const rgba = (rgb: [number, number, number], alpha = 1) =>
      `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;

    const lerpColor = (
      c: [number, number, number],
      factor: number,
      target: number
    ): [number, number, number] => [
      Math.round(c[0] + (target - c[0]) * factor),
      Math.round(c[1] + (target - c[1]) * factor),
      Math.round(c[2] + (target - c[2]) * factor),
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;

    const baseArch = (cx: number, cy: number, r: number) => {
      const pts: [number, number][] = [
        [cx - r, cy + height * 1.2],
        [cx - r, cy + height * 0.6],
      ];
      for (let i = 0; i <= 8; i++) {
        const a = Math.PI - (i / 8) * Math.PI;
        pts.push([cx + Math.cos(a) * r, cy - Math.sin(a) * r]);
      }
      pts.push([cx + r, cy + height * 0.6], [cx + r, cy + height * 1.2]);
      return pts;
    };

    const waveNormals: [number, number][] = [
      [-0.6, 0.58],
      [-0.35, 0.58],
      [-0.06, 0.58],
      [0.12, 0.46],
      [0.28, 0.66],
      [0.44, 0.46],
      [0.6, 0.66],
      [0.76, 0.46],
      [0.92, 0.66],
      [1.06, 0.56],
      [1.35, 0.56],
      [1.6, 0.56],
      [1.85, 0.56],
    ];

    const getWavePoints = () =>
      waveNormals.map(([nx, ny]) => [nx * width, (ny + (isMobile ? 0.1 : 0.09)) * height]);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = flowCanvas.clientWidth;
      height = flowCanvas.clientHeight;
      isMobile = width / height < 0.8;

      flowCanvas.width = width * dpr;
      flowCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      glowCanvas.width = Math.ceil(width / 4);
      glowCanvas.height = Math.ceil(height / 4);
    };

    resize();
    window.addEventListener("resize", resize);

    const anim = { p: scrollProgress, t: 0 };
    const splineCount = 420;
    const curvePoints = new Float32Array(splineCount * 4);

    const catmullRom = (p0: number, p1: number, p2: number, p3: number, t: number) =>
      0.5 *
      (2 * p1 +
        (-p0 + p2) * t +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
        (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);

    const computeSpline = () => {
      const radius = isMobile ? width * 1.1 : width * 0.82;
      const archCenterY = (isMobile ? height * 0.87 : height * 0.76) + radius;
      const arch = baseArch(width / 2, archCenterY, radius);
      const wave = getWavePoints();
      const blend = anim.p;

      const interpolated = arch.map((p, i) => [
        p[0] + ((wave[i]?.[0] ?? p[0]) - p[0]) * blend,
        p[1] + ((wave[i]?.[1] ?? p[1]) - p[1]) * blend,
      ]);

      const samples: [number, number][] = [];
      const len = interpolated.length;
      for (let i = 1; i < len - 2; i++) {
        for (let j = 0; j < 40; j++) {
          const t = j / 40;
          samples.push([
            catmullRom(
              interpolated[i - 1][0],
              interpolated[i][0],
              interpolated[i + 1][0],
              interpolated[i + 2][0],
              t
            ),
            catmullRom(
              interpolated[i - 1][1],
              interpolated[i][1],
              interpolated[i + 1][1],
              interpolated[i + 2][1],
              t
            ),
          ]);
        }
      }
      if (interpolated[len - 2]) {
        samples.push([interpolated[len - 2][0], interpolated[len - 2][1]]);
      }

      const dists = [0];
      for (let i = 1; i < samples.length; i++) {
        dists.push(
          dists[i - 1] +
            Math.hypot(
              samples[i][0] - samples[i - 1][0],
              samples[i][1] - samples[i - 1][1]
            )
        );
      }

      const totalDist = dists[dists.length - 1];
      let cursor = 0;
      for (let i = 0; i < splineCount; i++) {
        const targetD = (i / (splineCount - 1)) * totalDist;
        while (cursor < dists.length - 2 && dists[cursor + 1] < targetD) cursor++;
        const frac = (targetD - dists[cursor]) / (dists[cursor + 1] - dists[cursor] || 1);
        curvePoints[i * 4] =
          samples[cursor][0] + (samples[cursor + 1][0] - samples[cursor][0]) * frac;
        curvePoints[i * 4 + 1] =
          samples[cursor][1] + (samples[cursor + 1][1] - samples[cursor][1]) * frac;
      }

      for (let i = 0; i < splineCount; i++) {
        const prev = Math.max(0, i - 1);
        const next = Math.min(splineCount - 1, i + 1);
        const dx = curvePoints[next * 4] - curvePoints[prev * 4];
        const dy = curvePoints[next * 4 + 1] - curvePoints[prev * 4 + 1];
        const mag = Math.hypot(dx, dy) || 1;
        curvePoints[i * 4 + 2] = -dy / mag;
        curvePoints[i * 4 + 3] = dx / mag;
      }
    };

    const particleCount = width * height > 900000 ? 6000 : width * height > 400000 ? 4500 : 3000;
    const progress = new Float32Array(particleCount);
    const rotation = new Float32Array(particleCount);
    const speed = new Float32Array(particleCount);
    const size = new Float32Array(particleCount);
    const colorBias = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      progress[i] = Math.random();
      rotation[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.018 + Math.random() * 0.03;
      size[i] = 0.8 + Math.random() * 1.8;
      colorBias[i] = Math.random() < 0.7 ? 0.82 + Math.random() * 0.2 : Math.random() * 0.8;
    }

    let lastTime = performance.now();
    let animId: number;

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;
      anim.t += dt;

      computeSpline();

      const ribbonThickness = Math.min(width, height) * (0.078 + 0.012 * anim.p);

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      let minX = 1e9;
      let maxX = -1e9;
      for (let i = 0; i < splineCount; i++) {
        const x = curvePoints[i * 4];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
      minX = Math.max(minX - ribbonThickness, -ribbonThickness * 0.5);
      maxX = Math.min(maxX + ribbonThickness, width + ribbonThickness * 0.5);
      const spanX = maxX - minX;

      const makeGradient = (lighten = 0, darken = 0, alpha = 1) => {
        const grad = ctx.createLinearGradient(minX, 0, maxX, 0);
        colorStops.forEach(([stop, hex]) => {
          let c = hexToRgb(hex);
          if (darken) c = lerpColor(c, darken, 0);
          if (lighten) c = lerpColor(c, lighten, 255);
          grad.addColorStop(stop, rgba(c, alpha));
        });
        return grad;
      };

      const strokeSpline = (offset: number, startFrac = 0, endFrac = 1) => {
        ctx.beginPath();
        const startIdx = Math.max(0, (startFrac * (splineCount - 1)) | 0);
        const endIdx = Math.min(splineCount - 1, (endFrac * (splineCount - 1)) | 0);
        for (let i = startIdx; i <= endIdx; i++) {
          const idx = i * 4;
          const px = curvePoints[idx] + curvePoints[idx + 2] * offset;
          const py = curvePoints[idx + 1] + curvePoints[idx + 3] * offset;
          if (i === startIdx) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      };

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < 14; i++) {
        const f = i / 13;
        ctx.lineWidth = ribbonThickness * 2 * (1 - f * 0.86);
        ctx.strokeStyle = i === 0 ? makeGradient(0, 0.12, 0.55) : makeGradient(Math.pow(f, 1.8) * 0.62);
        strokeSpline(-ribbonThickness * 0.32 * f);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 3; i++) {
        const offsetProg = ((anim.t * 0.07 + i / 3) % 1.2) - 0.1;
        for (let j = -4; j <= 4; j++) {
          ctx.strokeStyle = `rgba(255,255,255,${0.09 * (1 - Math.abs(j) / 5)})`;
          ctx.lineWidth = ribbonThickness * (0.9 - Math.abs(j) * 0.08);
          strokeSpline(-ribbonThickness * 0.22, offsetProg + j * 0.012, offsetProg + (j + 1) * 0.012);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particleCount; i++) {
        progress[i] += speed[i] * dt * (0.35 + 0.65 * (1 - anim.p * 0.5));
        if (progress[i] > 1) progress[i] -= 1;
        rotation[i] += dt * 0.22;

        const curveIdx = ((progress[i] * (splineCount - 1)) | 0) * 4;
        const sinRot = Math.sin(rotation[i]);
        const cosRot = Math.cos(rotation[i]);
        const radius = ribbonThickness * colorBias[i];

        const px = curvePoints[curveIdx] + curvePoints[curveIdx + 2] * sinRot * radius;
        const py = curvePoints[curveIdx + 1] + curvePoints[curveIdx + 3] * sinRot * radius;

        const col = lerpColor(
          getColor((px - minX) / spanX),
          0.4 + 0.45 * Math.max(0, cosRot),
          255
        );
        const alpha = Math.min(1, cosRot < 0 ? 0 : 0.12 + 0.45 * cosRot);
        ctx.fillStyle = rgba(col, alpha);

        const sz = size[i] * (1 + 0.35 * cosRot);
        ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
      }

      glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
      glowCtx.drawImage(flowCanvas, 0, 0, glowCanvas.width, glowCanvas.height);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [scrollProgress]);

  return (
    <div id="bg" className="fixed inset-0 pointer-events-none z-0 bg-[#f1ede6]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ff007f12 1px, transparent 1px), linear-gradient(90deg, #ff007f12 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(70% 60% at 50% 55%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 55%, #000, transparent)",
        }}
      />
      <canvas
        id="glow"
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full filter blur-[40px] opacity-70 pointer-events-none"
      />
      <canvas
        id="flow"
        ref={flowRef}
        role="img"
        aria-label="Un flux de particules multicolores qui forme le tube Rainboow"
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-pointer"
        onPointerMove={(e) => {
          if (!onHoverPoint) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const stepWidth = rect.width / 6;
          const index = Math.min(5, Math.max(0, Math.floor(x / stepWidth)));
          onHoverPoint(index, { x: e.clientX, y: e.clientY });
        }}
        onPointerLeave={() => {
          if (onHoverPoint) onHoverPoint(null);
        }}
      />
    </div>
  );
}
