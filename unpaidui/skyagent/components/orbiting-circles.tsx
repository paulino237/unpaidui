"use client";

import React from "react";
import { motion } from "motion/react";

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  index?: number;
  startAnimationDelay?: number;
}

export function OrbitingCircles({
  className = "",
  children,
  reverse = false,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  index = 0,
  startAnimationDelay = 0,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const count = React.Children.count(children);

  return (
    <>
      {path && (
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              delay: 0.15 * index + startAnimationDelay,
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="pointer-events-none absolute"
            style={{
              width: 2 * radius,
              height: 2 * radius,
              left: `calc(50% - ${radius}px)`,
              top: `calc(50% - ${radius}px)`,
            }}
          >
            <div
              className={`size-full rounded-full border border-[rgba(0,0,0,0.07)] dark:border-[rgba(249,250,251,0.07)] bg-gradient-to-b from-[rgba(0,0,0,0.05)] from-0% via-[rgba(249,250,251,0.00)] via-54.76% dark:bg-gradient-to-b dark:from-[rgba(249,250,251,0.03)] dark:from-0% dark:via-[rgba(249,250,251,0.00)] dark:via-54.76% ${className}`}
            />
          </motion.div>
        </div>
      )}

      {React.Children.map(children, (child, idx) => {
        const angle = (360 / count) * idx;
        // Fully inline the animation shorthand with direction to avoid CSS cascade conflicts
        const animationValue = `orbit ${calculatedDuration}s linear ${reverse ? "reverse" : "normal"} infinite`;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": 0.98 * radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                animation: animationValue,
                position: "absolute",
              } as React.CSSProperties
            }
            className="z-20 p-1 transform-gpu flex items-center justify-center rounded-full"
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
