"use client";

import { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.motion = prefersReduced ? "off" : "on";

    const selector = [
      "[data-reveal]",
      ".lines",
      ".tw-host",
      ".connect-tile",
      ".foot-claim",
      ".js-draw",
      ".hero",
    ].join(", ");

    const updateInView = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const windowH = window.innerHeight;

      elements.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < windowH + 60 && rect.bottom > -60) {
          el.classList.add("is-in");
        }
      });
    };

    updateInView();
    const frameId = requestAnimationFrame(updateInView);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "80px 0px 80px 0px",
      }
    );

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    elements.forEach((el) => {
      if (!el.classList.contains("is-in")) {
        observer.observe(el);
      }
    });

    window.addEventListener("scroll", updateInView, { passive: true });
    window.addEventListener("resize", updateInView, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", updateInView);
      window.removeEventListener("resize", updateInView);
    };
  }, []);

  return <>{children}</>;
}
