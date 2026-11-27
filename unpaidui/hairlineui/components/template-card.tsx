"use client";

import { useEffect, useRef, useState } from "react";

export function TemplateCard({
  slug,
  name,
  desc,
  price,
  className = "",
  delay = 0,
}: {
  slug: string;
  name: string;
  desc: string;
  price: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullImgRef = useRef<HTMLImageElement>(null);
  const canHoverRef = useRef(false);

  const [entered, setEntered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    canHoverRef.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const measureDistance = () => {
    if (containerRef.current && fullImgRef.current) {
      setScrollDistance(
        fullImgRef.current.offsetHeight - containerRef.current.offsetHeight
      );
    }
  };

  const isScrolling = active && loaded;

  return (
    <li
      className={`home-module__06co2W__fade ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      <a
        className="plate-corners group block bg-surface-2 p-2 outline-none transition-colors duration-200 hover:bg-surface-3 focus-visible:ring-[3px] focus-visible:ring-primary/35"
        href={`/template/${slug}`}
        onPointerEnter={() => {
          if (canHoverRef.current) {
            setEntered(true);
            if (loaded) measureDistance();
            setActive(true);
          }
        }}
        onPointerLeave={() => setActive(false)}
      >
        <div
          ref={containerRef}
          className="plate-corners-sm relative aspect-[16/10] overflow-hidden bg-surface shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)]"
        >
          <img
            src={`/previews/card/${slug}.webp`}
            alt={`The ${name} landing page template`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          {entered && (
            <img
              ref={fullImgRef}
              src={`/previews/card-full/${slug}.jpg`}
              alt=""
              aria-hidden="true"
              decoding="async"
              onLoad={() => {
                measureDistance();
                setLoaded(true);
              }}
              className={`absolute inset-x-0 top-0 w-full will-change-transform ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translate3d(0, ${isScrolling ? -scrollDistance : 0}px, 0)`,
                transitionProperty: "transform",
                transitionDuration: isScrolling
                  ? `${Math.max(scrollDistance / 450, 1.5)}s`
                  : "0.9s",
                transitionTimingFunction: isScrolling
                  ? "linear"
                  : "cubic-bezier(0.2, 0.7, 0.2, 1)",
              }}
            />
          )}
        </div>
        <div className="px-3 pb-2.5 pt-4 sm:px-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[16px] font-medium tracking-[-0.015em] text-ink">
              {name}
            </h3>
            <span className="text-[14px] tabular-nums text-ink-5">{price}</span>
          </div>
          <p className="mt-1 truncate text-[14px] text-ink-5">{desc}</p>
        </div>
      </a>
    </li>
  );
}
