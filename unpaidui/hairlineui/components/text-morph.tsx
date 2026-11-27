"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

interface GlyphItem {
  key: number;
  char: string;
  x?: number;
  y?: number;
}

interface LeavingProps {
  glyph: GlyphItem;
  lift: number;
  duration: number;
  onDone: (key: number) => void;
}

function LeavingGlyph({ glyph, lift, duration, onDone }: LeavingProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anim = el.animate(
      [
        { opacity: 1, filter: "blur(0px)", transform: "none" },
        { opacity: 0, filter: "blur(4px)", transform: `translateY(${lift}em)` },
      ],
      { duration: 0.6 * duration, easing: EASING, fill: "forwards" }
    );
    anim.onfinish = () => onDone(glyph.key);
    return () => anim.cancel();
  }, [glyph.key, lift, duration, onDone]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute whitespace-pre"
      style={{ left: glyph.x, top: glyph.y }}
    >
      {glyph.char}
    </span>
  );
}

function lcsDiff(
  prevList: GlyphItem[],
  nextText: string,
  genKey: () => number
): GlyphItem[] {
  const prevChars = prevList.map((g) => g.char);
  const nextChars = Array.from(nextText);
  const fallback = () => nextChars.map((c) => ({ key: genKey(), char: c }));

  if (!prevChars.length || !nextChars.length) return fallback();

  const dp: number[][] = Array.from({ length: prevChars.length + 1 }, () =>
    new Array(nextChars.length + 1).fill(0)
  );

  for (let i = prevChars.length - 1; i >= 0; i--) {
    for (let j = nextChars.length - 1; j >= 0; j--) {
      dp[i][j] =
        prevChars[i] === nextChars[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  if (dp[0][0] < 0.5 * Math.min(prevChars.length, nextChars.length)) {
    return fallback();
  }

  const result: GlyphItem[] = [];
  let i = 0;
  let j = 0;

  while (j < nextChars.length) {
    if (i < prevChars.length && prevChars[i] === nextChars[j]) {
      result.push(prevList[i++]);
      j++;
    } else if (i < prevChars.length && dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      result.push({ key: genKey(), char: nextChars[j++] });
    }
  }

  return result;
}

export interface TextMorphProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  duration?: number;
  direction?: "up" | "down";
  animateWidth?: boolean;
  className?: string;
}

export function TextMorph({
  children,
  duration = 460,
  direction = "up",
  animateWidth = true,
  className = "",
  ...rest
}: TextMorphProps) {
  const isReduced = useSyncExternalStore(
    subscribeMotion,
    () => (typeof window !== "undefined" ? window.matchMedia(REDUCED_QUERY).matches : false),
    () => false
  );

  const keyCounter = useRef(children.length);
  const nextKey = useCallback(() => ++keyCounter.current, []);

  const [glyphs, setGlyphs] = useState<GlyphItem[]>(() =>
    Array.from(children).map((c, i) => ({ key: i + 1, char: c }))
  );
  const [leaving, setLeaving] = useState<GlyphItem[]>([]);

  const containerRef = useRef<HTMLSpanElement>(null);
  const elementMap = useRef(new Map<number, HTMLElement>());
  const prevMetrics = useRef<{ at: Map<number, { x: number; y: number }>; width: number } | null>(
    null
  );

  const lift = direction === "up" ? 0.35 : -0.35;

  useLayoutEffect(() => {
    if (children === glyphs.map((g) => g.char).join("")) return;

    const container = containerRef.current;
    if (!container || isReduced) {
      setLeaving([]);
      setGlyphs(Array.from(children).map((c) => ({ key: nextKey(), char: c })));
      return;
    }

    const contRect = container.getBoundingClientRect();
    const positions = new Map<number, { x: number; y: number }>();
    elementMap.current.forEach((el, key) => {
      const r = el.getBoundingClientRect();
      positions.set(key, { x: r.left - contRect.left, y: r.top - contRect.top });
    });

    prevMetrics.current = { at: positions, width: contRect.width };

    const nextGlyphs = lcsDiff(glyphs, children, nextKey);
    const retainedKeys = new Set(nextGlyphs.map((g) => g.key));

    setLeaving((prev) => [
      ...prev,
      ...glyphs
        .filter((g) => !retainedKeys.has(g.key))
        .map((g) => ({ ...g, ...(positions.get(g.key) ?? { x: 0, y: 0 }) })),
    ]);

    setGlyphs(nextGlyphs);
  }, [children, isReduced, nextKey]);

  useLayoutEffect(() => {
    const metrics = prevMetrics.current;
    const container = containerRef.current;
    if (!metrics || !container) return;
    prevMetrics.current = null;

    const contRect = container.getBoundingClientRect();
    let enterIndex = 0;

    for (const g of glyphs) {
      const el = elementMap.current.get(g.key);
      if (!el) continue;

      const prevPos = metrics.at.get(g.key);
      if (prevPos) {
        const curRect = el.getBoundingClientRect();
        const dx = prevPos.x - (curRect.left - contRect.left);
        const dy = prevPos.y - (curRect.top - contRect.top);
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
            { duration, easing: EASING }
          );
        }
      } else {
        el.animate(
          [
            { opacity: 0, filter: "blur(4px)", transform: `translateY(${lift}em)` },
            { opacity: 1, filter: "blur(0px)", transform: "none" },
          ],
          {
            duration,
            easing: EASING,
            delay: Math.min(16 * enterIndex++, 160),
            fill: "backwards",
          }
        );
      }
    }

    if (animateWidth && Math.abs(metrics.width - contRect.width) > 0.5) {
      container.style.whiteSpace = "nowrap";
      const anim = container.animate(
        [{ width: `${metrics.width}px` }, { width: `${contRect.width}px` }],
        { duration, easing: EASING }
      );
      anim.onfinish = anim.oncancel = () => {
        container.style.whiteSpace = "";
      };
    }
  }, [glyphs, duration, lift, animateWidth]);

  const removeLeaving = useCallback((key: number) => {
    setLeaving((prev) => prev.filter((item) => item.key !== key));
  }, []);

  // Split words by space so whitespace-pre wraps appropriately
  const words: GlyphItem[][] = [];
  for (const g of glyphs) {
    if (g.char !== " " && words.length && words[words.length - 1][0]?.char !== " ") {
      words[words.length - 1].push(g);
    } else {
      words.push([g]);
    }
  }

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      {...rest}
    >
      <span className="sr-only">{children}</span>
      {words.map((word, wIdx) => (
        <span key={wIdx} aria-hidden="true" className="inline-block whitespace-pre">
          {word.map((g) => (
            <span
              key={g.key}
              ref={(el) => {
                if (el) elementMap.current.set(g.key, el);
                else elementMap.current.delete(g.key);
              }}
              className="inline-block"
            >
              {g.char}
            </span>
          ))}
        </span>
      ))}
      {leaving.map((g) => (
        <LeavingGlyph
          key={`out-${g.key}`}
          glyph={g}
          lift={-lift}
          duration={duration}
          onDone={removeLeaving}
        />
      ))}
    </span>
  );
}
