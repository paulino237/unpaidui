"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";

interface CardItem {
  id: number;
  label: string;
  image: string;
}

interface RotatingCardsProps {
  cards: CardItem[];
  radius?: number;
  duration?: number;
  cardWidth?: number;
  cardHeight?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  autoPlay?: boolean;
  initialRotation?: number;
  showTrackLine?: boolean;
  trackLineOffset?: number;
  cardClassName?: string;
  className?: string;
}

export function RotatingCards({
  cards,
  radius = 360,
  duration = 20,
  cardWidth = 160,
  cardHeight = 190,
  pauseOnHover = true,
  reverse = false,
  autoPlay = true,
  initialRotation = 0,
  showTrackLine = false,
  trackLineOffset = 25,
  cardClassName = "",
  className = "",
}: RotatingCardsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(initialRotation);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const dragStartAngleRef = useRef(0);
  const dragStartRotationRef = useRef(0);

  // Motion value for rotation — spring-smoothed
  const rotationMV = useMotionValue(initialRotation);
  const springRotation = useSpring(rotationMV, {
    damping: 30,
    stiffness: 200,
    mass: 0.5,
  });

  // Mount + preload images
  useEffect(() => {
    setIsMounted(true);
    const hasImages = cards.some((c) => c.image);
    if (!hasImages) {
      setImagesLoaded(true);
      return;
    }
    let cancelled = false;
    Promise.all(
      cards
        .filter((c) => c.image)
        .map(
          (c) =>
            new Promise<void>((res, rej) => {
              const img = new window.Image();
              img.src = c.image;
              img.onload = () => res();
              img.onerror = () => rej();
            })
        )
    )
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setImagesLoaded(true);
      });
    return () => { cancelled = true; };
  }, [cards]);

  // Autoplay rotation loop
  useEffect(() => {
    lastTimeRef.current = null;

    const tick = (now: number) => {
      if (
        lastTimeRef.current !== null &&
        !isHovered &&
        !isDragging &&
        autoPlay &&
        imagesLoaded
      ) {
        const elapsed = Math.min((now - lastTimeRef.current) / 1000, 0.1);
        const delta = (360 / duration) * elapsed * (reverse ? -1 : 1);
        angleRef.current += delta;
        rotationMV.set(angleRef.current);
      }
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, reverse, isHovered, isDragging, autoPlay, imagesLoaded, rotationMV]);

  // Convert pointer position → angle relative to container center
  const getPointerAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  }, []);

  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      const clientX = "clientX" in e ? e.clientX : 0;
      const clientY = "clientY" in e ? e.clientY : 0;
      dragStartAngleRef.current = getPointerAngle(clientX, clientY);
      dragStartRotationRef.current = angleRef.current;
    },
    [getPointerAngle]
  );

  const handleDrag = useCallback(
    (_: unknown, info: { point: { x: number; y: number } }) => {
      if (!isDragging) return;
      const delta =
        getPointerAngle(info.point.x, info.point.y) -
        dragStartAngleRef.current;
      const next = dragStartRotationRef.current + delta;
      angleRef.current = next;
      rotationMV.set(next);
    },
    [isDragging, getPointerAngle, rotationMV]
  );

  const handleDragEnd = useCallback(() => setIsDragging(false), []);

  // Pre-calculate each card's x/y/angle position on the circle
  const positions = useMemo(() => {
    const step = (2 * Math.PI) / cards.length;
    return cards.map((_, i) => {
      const rad = step * i + (initialRotation * Math.PI) / 180;
      return {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
        angle: (rad * 180) / Math.PI,
      };
    });
  }, [cards, radius, initialRotation]);

  // Total canvas size
  const totalW = 2 * radius + cardWidth;
  const totalH = 2 * radius + cardHeight;

  return (
    <div
      ref={containerRef}
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{ width: totalW, height: totalH }}
    >
      {/* Track-line SVG ring */}
      {showTrackLine && (
        <svg
          className="pointer-events-none absolute inset-0"
          width="100%"
          height="100%"
          viewBox={`0 0 ${totalW} ${totalH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={totalW / 2}
            cy={totalH / 2}
            r={radius + trackLineOffset}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        </svg>
      )}

      {/* Inner rotating container — spring-smoothed via motion value */}
      <motion.div
        className="relative w-full h-full"
        style={{ rotate: springRotation, willChange: "transform" }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onPointerDown={handleDragStart as never}
        onDrag={handleDrag as never}
        onDragEnd={handleDragEnd}
      >
        {isMounted &&
          cards.map((card, i) => {
            const pos = positions[i];
            if (!pos) return null;
            return (
              <motion.div
                key={`${card.id}-${cards.length}`}
                className={`absolute overflow-hidden rounded-xl shadow-lg cursor-pointer border border-foreground/10 bg-background text-foreground ${cardClassName}`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  left: "50%",
                  top: "50%",
                  x: pos.x,
                  y: pos.y,
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                  willChange: "transform",
                  // counter-rotate so card stays upright
                  rotate: pos.angle + 90,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: imagesLoaded ? 1 : 0,
                  scale: imagesLoaded ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                onHoverStart={() => pauseOnHover && setIsHovered(true)}
                onHoverEnd={() => pauseOnHover && setIsHovered(false)}
                whileHover={pauseOnHover ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
              >
                <div className="flex h-full flex-col p-2">
                  {/* Image — top flex-1 area, grayscale */}
                  <div className="relative flex-1 overflow-hidden rounded-t-sm rounded-b-full">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      className="object-cover grayscale"
                      sizes="350px"
                    />
                  </div>
                  {/* Label — bottom */}
                  <div className="px-1 pt-3 text-center">
                    <span className="text-sm font-medium">{card.label}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
}
