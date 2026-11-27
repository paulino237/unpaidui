"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useSyncExternalStore,
} from "react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const m = window.matchMedia(REDUCED_QUERY);
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

interface Glyph {
  key: number;
  char: string;
  x?: number;
  y?: number;
}

function OutGlyph({
  glyph,
  lift,
  duration,
  onDone,
}: {
  glyph: Glyph;
  lift: number;
  duration: number;
  onDone: (key: number) => void;
}) {
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
      className="tm-out"
      style={{ left: glyph.x, top: glyph.y }}
    >
      {glyph.char}
    </span>
  );
}

function diffGlyphs(
  prev: Glyph[],
  nextStr: string,
  genKey: () => number
): Glyph[] {
  const prevChars = prev.map((g) => g.char);
  const nextChars = Array.from(nextStr);
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

  const result: Glyph[] = [];
  let i = 0;
  let j = 0;
  while (j < nextChars.length) {
    if (i < prevChars.length && prevChars[i] === nextChars[j]) {
      result.push(prev[i++]);
      j++;
    } else if (i < prevChars.length && dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      result.push({ key: genKey(), char: nextChars[j++] });
    }
  }

  return result;
}

export function TextMorph({
  children: text,
  duration = 460,
  direction = "up",
  animateWidth = true,
  className = "",
  ...props
}: {
  children: string;
  duration?: number;
  direction?: "up" | "down";
  animateWidth?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false);
  const keyGen = useRef(text.length);
  const nextKey = useCallback(() => ++keyGen.current, []);

  const [currentGlyphs, setCurrentGlyphs] = useState<Glyph[]>(() =>
    Array.from(text).map((char, idx) => ({ key: idx + 1, char }))
  );
  const [outgoingGlyphs, setOutgoingGlyphs] = useState<Glyph[]>([]);

  const containerRef = useRef<HTMLSpanElement>(null);
  const glyphDomMap = useRef<Map<number, HTMLSpanElement>>(new Map());
  const prevMeasure = useRef<{ at: Map<number, { x: number; y: number }>; width: number } | null>(null);

  const lift = direction === "up" ? 0.35 : -0.35;

  useLayoutEffect(() => {
    if (text === currentGlyphs.map((g) => g.char).join("")) return;
    const container = containerRef.current;
    if (!container || reduced) {
      setOutgoingGlyphs([]);
      setCurrentGlyphs(Array.from(text).map((c) => ({ key: nextKey(), char: c })));
      return;
    }

    const rect = container.getBoundingClientRect();
    const at = new Map<number, { x: number; y: number }>();
    glyphDomMap.current.forEach((el, key) => {
      const gRect = el.getBoundingClientRect();
      at.set(key, { x: gRect.left - rect.left, y: gRect.top - rect.top });
    });
    prevMeasure.current = { at, width: rect.width };

    const nextGlyphs = diffGlyphs(currentGlyphs, text, nextKey);
    const retainedKeys = new Set(nextGlyphs.map((g) => g.key));

    setOutgoingGlyphs((prev) => [
      ...prev,
      ...currentGlyphs
        .filter((g) => !retainedKeys.has(g.key))
        .map((g) => ({ ...g, ...(at.get(g.key) ?? { x: 0, y: 0 }) })),
    ]);

    setCurrentGlyphs(nextGlyphs);
  }, [text, reduced, nextKey]);

  useLayoutEffect(() => {
    const measure = prevMeasure.current;
    const container = containerRef.current;
    if (!measure || !container) return;
    prevMeasure.current = null;

    const currRect = container.getBoundingClientRect();
    let delayCounter = 0;

    for (const g of currentGlyphs) {
      const el = glyphDomMap.current.get(g.key);
      if (!el) continue;
      const prevPos = measure.at.get(g.key);

      if (prevPos) {
        const elRect = el.getBoundingClientRect();
        const dx = prevPos.x - (elRect.left - currRect.left);
        const dy = prevPos.y - (elRect.top - currRect.top);
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
            delay: Math.min(16 * delayCounter++, 160),
            fill: "backwards",
          }
        );
      }
    }

    if (animateWidth && Math.abs(measure.width - currRect.width) > 0.5) {
      container.style.whiteSpace = "nowrap";
      const anim = container.animate(
        [{ width: `${measure.width}px` }, { width: `${currRect.width}px` }],
        { duration, easing: EASING }
      );
      anim.onfinish = anim.oncancel = () => {
        container.style.whiteSpace = "";
      };
    }
  }, [currentGlyphs, duration, lift, animateWidth]);

  const removeOutgoing = useCallback((key: number) => {
    setOutgoingGlyphs((prev) => prev.filter((g) => g.key !== key));
  }, []);

  const words: Glyph[][] = [];
  for (const g of currentGlyphs) {
    if (g.char !== " " && words.length && words[words.length - 1][0]?.char !== " ") {
      words[words.length - 1].push(g);
    } else {
      words.push([g]);
    }
  }

  return (
    <span ref={containerRef} className={`tm ${className}`} {...props}>
      <span className="sr-only">{text}</span>
      {words.map((w, wIdx) => (
        <span key={wIdx} aria-hidden="true" className="tm-w">
          {w.map((g) => (
            <span
              key={g.key}
              ref={(node) => {
                if (node) glyphDomMap.current.set(g.key, node);
                else glyphDomMap.current.delete(g.key);
              }}
              className="tm-g"
            >
              {g.char}
            </span>
          ))}
        </span>
      ))}
      {outgoingGlyphs.map((g) => (
        <OutGlyph
          key={`out-${g.key}`}
          glyph={g}
          lift={-lift}
          duration={duration}
          onDone={removeOutgoing}
        />
      ))}
    </span>
  );
}
