"use client";

import { KineticText } from "./kinetic-text";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

const METRICS: MetricItem[] = [
  {
    value: 1200,
    suffix: "+",
    label: "Présentations Conçues",
    detail: "Pour les plus grands groupes du CAC 40 et scale-ups européennes.",
  },
  {
    value: 99,
    suffix: "%",
    label: "Taux de Satisfaction",
    detail: "Évaluations systématiques post-livraison certifiées ISO 9001.",
  },
  {
    value: 5,
    suffix: "/5",
    label: "Avis Clients Google",
    detail: "Note maximale obtenue sur l'ensemble de nos retours clients.",
  },
  {
    value: 12,
    suffix: " Ans",
    label: "D'Excellence Métier",
    detail: "Pionniers de la présentation haute fidélité en France.",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(ease * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function MetricsSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase font-semibold text-white/80 mb-4">
          <span>Impact Chiffré</span>
        </div>
        <div className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          <KineticText as="h2" highlightWords={["parlent"]}>
            Des résultats et chiffres qui parlent d&apos;eux-mêmes
          </KineticText>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-white/30 transition-colors"
          >
            <div>
              <div className="text-4xl sm:text-5xl font-black uppercase text-[#01daf6] tracking-tight mb-2">
                <Counter target={metric.value} suffix={metric.suffix} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-3">
                {metric.label}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              {metric.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
