"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

function FlickeringGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const squareSize = 4;
    const gridGap = 6;
    const step = squareSize + gridGap;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.ceil(canvas.width / step);
    const rows = Math.ceil(canvas.height / step);
    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * 0.25;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "255, 255, 255" : "15, 23, 42";

      const currentCols = Math.ceil(canvas.width / step);
      const currentRows = Math.ceil(canvas.height / step);

      for (let i = 0; i < currentCols; i++) {
        for (let j = 0; j < currentRows; j++) {
          const idx = (i * currentRows + j) % squares.length;
          if (Math.random() < 0.04) {
            squares[idx] = Math.random() * 0.35;
          }
          ctx.fillStyle = `rgba(${baseColor}, ${squares[idx]})`;
          ctx.fillRect(i * step, j * step, squareSize, squareSize);
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none size-full opacity-70"
    />
  );
}

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: (width || 500) * 2,
      height: (width || 500) * 2,
      phi: 0,
      theta: 0.3,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 0.5 : 0.4,
      mapSamples: 16000,
      mapBrightness: isDark ? 1.4 : 1.2,
      baseColor: isDark ? [0.4, 0.4, 0.4] : [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: isDark ? [0.24, 0.24, 0.27] : [1, 1, 1],
      markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
      ],
    });

    let animationFrameId: number;
    const animate = () => {
      if (!pointerInteracting.current) {
        phi += 0.005;
      }
      globe.update({
        phi: phi + r,
        width: (width || 500) * 2,
        height: (width || 500) * 2,
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    const timeout = setTimeout(() => setOpacity(1), 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [isDark, r]);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity, cursor: "grab" }}
      onPointerDown={(e) =>
        updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
      }
      onPointerUp={() => updatePointerInteraction(null)}
      onPointerOut={() => updatePointerInteraction(null)}
      onMouseMove={(e) => updateMovement(e.clientX)}
      onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      className="size-full transition-opacity duration-500 [contain:layout_paint_size]"
    />
  );
}

const SHIELD_MASK_URI =
  "url(\"data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E\")";

export function GrowthSection() {
  return (
    <section
      id="growth"
      className="flex flex-col items-center justify-center w-full relative px-5 md:px-10"
    >
      <div className="border-x border-border mx-5 md:mx-10 w-full relative">
        {/* Diagonal Hatch Left & Right Strips */}
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]" />
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]" />

        {/* Section Header */}
        <div className="border-b border-border w-full p-10 md:p-14">
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance text-primary">
              Built for Secure Growth
            </h2>
            <p className="text-muted-foreground text-center text-balance font-medium text-sm sm:text-base">
              Where advanced security meets seamless scalability—designed to
              protect your data and empower your growth.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x md:divide-y-0 divide-border">
          {/* Card 1: Advanced Task Security */}
          <div className="flex flex-col items-start justify-end gap-2 p-6 min-h-[480px] group">
            <div
              className="relative flex size-full h-[340px] items-center justify-center overflow-hidden transition-all duration-300"
              style={{
                WebkitMaskImage: SHIELD_MASK_URI,
                maskImage: SHIELD_MASK_URI,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            >
              {/* Flickering Grid Canvas */}
              <div className="absolute inset-0">
                <FlickeringGridCanvas />
              </div>

              {/* Shield SVG */}
              <div className="relative z-20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="245"
                  height="282"
                  viewBox="0 0 245 282"
                  className="size-56 sm:size-64 object-contain fill-accent/90 drop-shadow-xl"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M113.664 7.33065C116.025 5.21236 119.082 4.04126 122.25 4.04126C125.418 4.04126 128.475 5.21236 130.836 7.33065C154.045 28.2076 183.028 41.5233 213.948 45.5151C216.984 45.9065 219.781 47.3695 221.839 49.6419C223.897 51.9144 225.081 54.8476 225.178 57.916C226.339 92.0322 217.849 125.781 200.689 155.261C183.529 184.74 158.4 208.746 128.209 224.501C126.368 225.462 124.323 225.962 122.248 225.959C120.173 225.956 118.13 225.45 116.291 224.484C86.0997 208.728 60.971 184.723 43.811 155.244C26.6511 125.764 18.1608 92.015 19.322 57.8988C19.4235 54.8334 20.6091 51.9043 22.6666 49.6354C24.7242 47.3665 27.5195 45.906 30.5524 45.5151C61.4706 41.5281 90.4531 28.2186 113.664 7.34787V7.33065Z"
                  />
                </svg>

                {/* Inner Padlock SVG */}
                <div className="absolute inset-0 flex items-center justify-center -translate-y-4 z-30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 81 80"
                    className="fill-primary/80 group-hover:fill-secondary transition-colors duration-300"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.5 36V28C20.5 22.6957 22.6071 17.6086 26.3579 13.8579C30.1086 10.1071 35.1957 8 40.5 8C45.8043 8 50.8914 10.1071 54.6421 13.8579C58.3929 17.6086 60.5 22.6957 60.5 28V36C62.6217 36 64.6566 36.8429 66.1569 38.3431C67.6571 39.8434 68.5 41.8783 68.5 44V64C68.5 66.1217 67.6571 68.1566 66.1569 69.6569C64.6566 71.1571 62.6217 72 60.5 72H20.5C18.3783 72 16.3434 71.1571 14.8431 69.6569C13.3429 68.1566 12.5 66.1217 12.5 64V44C12.5 41.8783 13.3429 39.8434 14.8431 38.3431C16.3434 36.8429 18.3783 36 20.5 36ZM52.5 28V36H28.5V28C28.5 24.8174 29.7643 21.7652 32.0147 19.5147C34.2652 17.2643 37.3174 16 40.5 16C43.6826 16 46.7348 17.2643 48.9853 19.5147C51.2357 21.7652 52.5 24.8174 52.5 28Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="text-lg tracking-tighter font-semibold text-primary">
              Advanced Task Security
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Safeguard your tasks with state-of-art encryption and secure
              access to your workflow data.
            </p>
          </div>

          {/* Card 2: Scalable for Teams (3D Cobe Globe) */}
          <div className="flex flex-col items-start justify-end gap-2 p-6 min-h-[500px] overflow-hidden">
            <div className="relative flex size-full h-[380px] max-w-lg mx-auto items-center justify-center overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_50%)] -translate-y-12">
              <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] top-16">
                <GlobeCanvas />
              </div>
            </div>

            <h3 className="text-lg tracking-tighter font-semibold text-primary">
              Scalable for Teams
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Grow with your team. Track tasks across multiple workspaces and
              all team members.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
