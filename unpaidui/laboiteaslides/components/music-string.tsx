"use client";

import { useRef, useState, useEffect } from "react";

interface MusicStringProps {
  className?: string;
  strokeColor?: string;
  height?: number;
}

export function MusicString({
  className = "",
  strokeColor = "rgba(18, 0, 66, 0.2)",
  height = 40,
}: MusicStringProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [controlY, setControlY] = useState(height / 2);
  const [controlX, setControlX] = useState(500);

  const isInteracting = useRef(false);
  const animFrame = useRef<number | null>(null);
  const velocity = useRef(0);
  const currentY = useRef(height / 2);
  const baseY = height / 2;

  // Spring oscillation simulation when released
  const releaseSpring = () => {
    isInteracting.current = false;
    let amp = currentY.current - baseY;
    let freq = 0.45;
    let decay = 0.92;
    let step = 0;

    const oscillate = () => {
      step += 1;
      amp *= decay;
      const offset = amp * Math.cos(step * freq);
      currentY.current = baseY + offset;
      setControlY(currentY.current);

      if (Math.abs(amp) > 0.3) {
        animFrame.current = requestAnimationFrame(oscillate);
      } else {
        currentY.current = baseY;
        setControlY(baseY);
      }
    };

    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(oscillate);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    isInteracting.current = true;
    if (animFrame.current) cancelAnimationFrame(animFrame.current);

    const relX = (e.clientX - rect.left) / rect.width;
    const relY = e.clientY - rect.top;

    // Constrain string displacement
    const clampedY = Math.max(0, Math.min(height, relY));
    currentY.current = clampedY;
    setControlX(relX * 1000);
    setControlY(clampedY);
  };

  const onPointerLeave = () => {
    if (isInteracting.current) {
      releaseSpring();
    }
  };

  const onPointerDown = () => {
    isInteracting.current = true;
  };

  const onPointerUp = () => {
    releaseSpring();
  };

  useEffect(() => {
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-visible select-none ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        style={{ touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <path
          d={`M 0 ${baseY} Q ${controlX} ${controlY} 1000 ${baseY}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
        />
      </svg>
    </div>
  );
}
