"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SkyAgentLogo } from "./skyagent-logo";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Story", href: "#" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Company", href: "#" },
      { label: "Product", href: "#" },
      { label: "Press", href: "#" },
      { label: "More", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Press", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Newsletters", href: "#" },
      { label: "More", href: "#" },
    ],
  },
];

function FooterFlickeringTextCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const squareSize = 3;
    const gridGap = 4;
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

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "255, 255, 255" : "15, 23, 42";

      // Create an offscreen mask of "SkyAgent" text
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = w;
      maskCanvas.height = h;
      const mCtx = maskCanvas.getContext("2d");
      if (mCtx) {
        const fontSize = Math.min(w * 0.16, 175);
        mCtx.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        mCtx.textAlign = "center";
        mCtx.textBaseline = "middle";
        mCtx.fillStyle = "#ffffff";
        mCtx.fillText("SkyAgent", w / 2, h / 2 + 10);
      }

      const maskData = mCtx?.getImageData(0, 0, w, h).data;
      const cols = Math.ceil(w / step);
      const rows = Math.ceil(h / step);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * step;
          const y = j * step;
          const pixelIdx = (y * w + x) * 4;
          const isInsideText = maskData ? maskData[pixelIdx + 3] > 80 : false;
          const alpha = isInsideText
            ? 0.25 + Math.random() * 0.45
            : Math.random() * 0.08;
          ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const interval = setInterval(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    }, 120);

    draw();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none size-full" />;
}

export function FooterSection() {
  return (
    <footer id="footer" className="w-full pb-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between p-10 gap-10">
        {/* Left Brand & Compliance Badges */}
        <div className="flex flex-col items-start justify-start gap-y-5 max-w-xs mx-0">
          <Link href="/" className="flex items-center gap-2.5">
            <SkyAgentLogo className="fill-secondary text-secondary size-8" />
            <p className="text-xl font-semibold text-primary tracking-tight">
              SkyAgent
            </p>
          </Link>

          <p className="tracking-tight text-muted-foreground font-medium text-sm leading-relaxed">
            AI assistant designed to streamline your digital workflows and
            handle mundane tasks, so you can focus on what truly matters
          </p>

          {/* Compliance Seals (SOC 2, HIPAA, GDPR) */}
          <div className="flex items-center gap-2.5 pt-1">
            {["SOC 2", "HIPAA", "GDPR"].map((badge) => (
              <div
                key={badge}
                className="size-11 rounded-full border border-border bg-accent/80 flex items-center justify-center shadow-xs"
              >
                <span className="text-[9px] font-bold tracking-tight text-primary/80">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-primary">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1.5 text-[15px]/snug text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>{link.label}</span>
                      <div className="flex size-4 items-center justify-center border border-border rounded translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                        <ChevronRight className="size-3" />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Flickering Grid Wordmark Banner */}
      <div className="w-full h-44 md:h-60 relative mt-10 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-35%" />
        <div className="absolute inset-0 mx-6">
          <FooterFlickeringTextCanvas />
        </div>
      </div>
    </footer>
  );
}
