"use client";

import { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure motion is on unless prefers-reduced-motion is set
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.motion = prefersReduced ? "off" : "on";

    const selector = [
      "[data-reveal]",
      ".hero",
      ".lines",
      ".ledger-row",
      ".closing-panel",
      ".footer-mark",
      ".js-draw",
      ".stack-list",
      ".showcase",
      ".work-media",
    ].join(", ");

    const updateInView = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const windowH = window.innerHeight;

      elements.forEach((el) => {
        if (el.classList.contains("is-in")) return;
        const rect = el.getBoundingClientRect();
        // Element is visible or above viewport
        if (rect.top < windowH + 40 && rect.bottom > -40) {
          el.classList.add("is-in");
        }
      });
    };

    // Run immediately and on next frame
    updateInView();
    const frameId = requestAnimationFrame(updateInView);

    // IntersectionObserver for elements as they enter
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
