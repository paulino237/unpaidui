"use client";

import React from "react";

const ITEMS = [
  "Depuis 2002",
  "ISO 9001",
  "5/5 Note Google Avis",
  "+8 000 projets",
  "85% de réachat",
  "MOS PowerPoint",
];

export function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 sm:py-5 backdrop-blur-sm">
      <div className="flex animate-marquee select-none whitespace-nowrap">
        {/* Strip 1 */}
        <div className="flex items-center shrink-0">
          {ITEMS.map((item, idx) => (
            <div key={`s1-${idx}`} className="flex items-center">
              <span className="font-screamer text-lg sm:text-2xl font-bold uppercase tracking-wider text-white/90 px-6 sm:px-10">
                {item}
              </span>
              <span className="size-2 rounded-full bg-[#01daf6] shadow-[0_0_8px_#01daf6]" />
            </div>
          ))}
        </div>

        {/* Strip 2 (Seamless loop) */}
        <div className="flex items-center shrink-0">
          {ITEMS.map((item, idx) => (
            <div key={`s2-${idx}`} className="flex items-center">
              <span className="font-screamer text-lg sm:text-2xl font-bold uppercase tracking-wider text-white/90 px-6 sm:px-10">
                {item}
              </span>
              <span className="size-2 rounded-full bg-[#01daf6] shadow-[0_0_8px_#01daf6]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
