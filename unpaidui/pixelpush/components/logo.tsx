import React from "react";
import Link from "next/link";

export function PixelPlay({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="2" height="2" />
      <rect x="0" y="2" width="6" height="2" />
      <rect x="0" y="4" width="10" height="2" />
      <rect x="0" y="6" width="14" height="2" />
      <rect x="0" y="8" width="14" height="2" />
      <rect x="0" y="10" width="10" height="2" />
      <rect x="0" y="12" width="6" height="2" />
      <rect x="0" y="14" width="2" height="2" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link
      href="#top"
      className="focus-ring group inline-flex items-center gap-2.5"
      aria-label="Pixelpush home"
    >
      <span className="flex h-7 w-7 items-center justify-center bg-foreground text-background transition-transform duration-300 group-hover:scale-105">
        <PixelPlay className="h-3.5 w-3.5" />
      </span>
      <span className="font-mono text-[17px] font-semibold tracking-tight text-foreground">
        Pixelpush
      </span>
    </Link>
  );
}
