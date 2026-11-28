"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { clsx } from "clsx";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "glass" | "white";
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.1 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-bold tracking-tight rounded-full uppercase transition-all duration-300 will-change-transform";

  const variants = {
    primary:
      "bg-[#6630ff] text-white hover:bg-[#5220df] shadow-[0_4px_24px_rgba(102,48,255,0.4)] hover:shadow-[0_8px_32px_rgba(102,48,255,0.6)]",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15",
    glass:
      "bg-[#120042]/70 hover:bg-[#120042] text-white backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(18,0,66,0.3)]",
    white:
      "bg-white text-[#120042] hover:bg-neutral-100 shadow-[0_4px_20px_rgba(255,255,255,0.3)]",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className={clsx(baseStyles, variants[variant], className)}
    >
      <div className="relative overflow-hidden py-3 px-7">
        <span
          className={clsx(
            "inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isHovered ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          )}
        >
          {children}
        </span>
        <span
          className={clsx(
            "absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
          aria-hidden="true"
        >
          {children}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0 border-0">
      {content}
    </button>
  );
}
