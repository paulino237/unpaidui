"use client";

import { useEffect } from "react";

export function ScrollRevealInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll(".home-module__06co2W__fade");
    const vh = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0.92 * vh) {
        (el as HTMLElement).dataset.reveal = "wait";
      } else {
        (el as HTMLElement).dataset.reveal = "in";
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => {
      if ((el as HTMLElement).dataset.reveal === "wait") {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
