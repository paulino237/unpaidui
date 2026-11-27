"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

const DIGITS_TAPE = Array.from({ length: 50 }, (_, i) => i % 10).join("\n");
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

interface DigitProps {
  digit: number;
  trend: number;
  duration: number;
  reduced: boolean;
  rollIn: boolean;
}

const Digit = React.memo(function Digit({
  digit,
  trend,
  duration,
  reduced,
  rollIn,
}: DigitProps) {
  const [initialPos] = useState(() => 20 + (rollIn ? 0 : digit));
  const currentPos = useRef(initialPos);
  const spanRef = useRef<HTMLSpanElement>(null);

  const applyTransform = useCallback(
    (pos: number, animate: boolean) => {
      const el = spanRef.current;
      if (!el) return;
      el.style.transition = animate
        ? `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
        : "none";
      el.style.transform = `translateY(${(-100 * pos) / 50}%)`;
    },
    [duration]
  );

  useLayoutEffect(() => {
    const cur = currentPos.current;
    const curDigit = ((cur % 10) + 10) % 10;
    if (curDigit === digit) return;

    if (reduced) {
      currentPos.current = 20 + digit;
      applyTransform(currentPos.current, false);
      return;
    }

    let next =
      trend > 0 || (trend === 0 && digit > curDigit)
        ? cur + ((digit - curDigit + 10) % 10)
        : cur - ((curDigit - digit + 10) % 10);

    if (next < 10 || next > 39) {
      const offset = 10 * Math.round((next - 20) / 10);
      const el = spanRef.current;
      if (el?.offsetHeight) {
        let actual = cur;
        try {
          actual =
            -new DOMMatrixReadOnly(getComputedStyle(el).transform).m42 /
            (el.offsetHeight / 50);
        } catch {}
        el.style.transition = "none";
        el.style.transform = `translateY(${(-100 * (actual - offset)) / 50}%)`;
        void el.offsetHeight; // force reflow
      }
      next -= offset;
    }

    currentPos.current = next;
    applyTransform(next, true);
  }, [digit, trend, reduced, applyTransform]);

  return (
    <span className="relative inline-block [clip-path:inset(0)]">
      <span className="invisible">{digit}</span>
      <span
        ref={spanRef}
        aria-hidden="true"
        onTransitionEnd={() => {
          currentPos.current = 20 + (((currentPos.current % 10) + 10) % 10);
          applyTransform(currentPos.current, false);
        }}
        className="absolute inset-x-0 top-0 block whitespace-pre text-center"
        style={{ transform: `translateY(${(-100 * initialPos) / 50}%)` }}
      >
        {DIGITS_TAPE}
      </span>
    </span>
  );
});

function ColEnter({
  enter,
  children,
}: {
  enter: boolean;
  children: React.ReactNode;
}) {
  const [shouldAnimate] = useState(enter);
  return (
    <span
      className={`inline-block ${
        shouldAnimate
          ? "[clip-path:inset(0)] animate-[ui-col-in_500ms_cubic-bezier(0.16,1,0.3,1)_both]"
          : ""
      }`}
    >
      {children}
    </span>
  );
}

const emptySet = new Set<string>();

export interface NumberRollProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  format?: Intl.NumberFormatOptions;
  locales?: string;
  prefix?: string;
  suffix?: string;
  from?: number;
  duration?: number;
  direction?: "up" | "down";
  className?: string;
}

export function NumberRoll({
  value,
  format,
  locales,
  prefix = "",
  suffix = "",
  from,
  duration = 900,
  direction,
  className = "",
  ...rest
}: NumberRollProps) {
  const isReduced = useSyncExternalStore(
    subscribeMotion,
    () => (typeof window !== "undefined" ? window.matchMedia(REDUCED_QUERY).matches : false),
    () => false
  );

  const [displayValue, setDisplayValue] = useState(from ?? value);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setDisplayValue(value));
    return () => cancelAnimationFrame(handle);
  }, [value]);

  const activeLocale = locales ?? (typeof window !== "undefined" ? undefined : "en-US");
  const localeKey = String(activeLocale);

  const formatter = useMemo(
    () => new Intl.NumberFormat(activeLocale, format),
    [activeLocale, format, localeKey]
  );

  const formattedText = `${prefix}${formatter.format(displayValue)}${suffix}`;

  const columns = useMemo(() => {
    const chars = [...formattedText];
    const seenChars = new Map<string, number>();
    let digitIdx = 0;
    const res: Array<{ key: string; char: string; digit: number | null }> = [];

    for (let i = chars.length - 1; i >= 0; i--) {
      const c = chars[i];
      if (/\d/.test(c)) {
        res.push({ key: `d${digitIdx++}`, char: c, digit: Number(c) });
      } else {
        const count = seenChars.get(c) ?? 0;
        seenChars.set(c, count + 1);
        res.push({ key: `s${c}${count}`, char: c, digit: null });
      }
    }
    return res.reverse();
  }, [formattedText]);

  const [state, setState] = useState({
    text: formattedText,
    cols: columns,
    shown: displayValue,
    localeKey,
    snap: false,
    moved: 0,
    entering: emptySet,
    leaving: [] as typeof columns,
  });

  let curState = state;
  if (
    state.text !== formattedText ||
    state.shown !== displayValue ||
    state.localeKey !== localeKey
  ) {
    const prevKeys = new Set(state.cols.map((c) => c.key));
    const nextKeys = new Set(columns.map((c) => c.key));
    const isLocaleOnly = state.localeKey !== localeKey && state.shown === displayValue;

    curState = {
      text: formattedText,
      cols: columns,
      shown: displayValue,
      localeKey,
      snap: isLocaleOnly,
      moved: Math.sign(displayValue - state.shown),
      entering: isLocaleOnly
        ? emptySet
        : new Set(columns.filter((c) => !prevKeys.has(c.key)).map((c) => c.key)),
      leaving:
        isReduced || isLocaleOnly
          ? []
          : state.cols.filter((c) => !nextKeys.has(c.key)),
    };
    setState(curState);
  }

  const snapOrReduced = isReduced || curState.snap;
  const trend =
    direction === "up" ? 1 : direction === "down" ? -1 : curState.moved;

  useEffect(() => {
    if (!state.leaving.length) return;
    const timer = window.setTimeout(() => {
      setState((prev) => ({ ...prev, leaving: [] }));
    }, 420);
    return () => window.clearTimeout(timer);
  }, [state.leaving]);

  return (
    <span className={`inline-flex tabular-nums ${className}`} {...rest}>
      <span className="sr-only">{`${prefix}${formatter.format(value)}${suffix}`}</span>
      <span aria-hidden="true" className="inline-flex items-baseline whitespace-pre">
        {curState.leaving.map((col) => (
          <span
            key={`out-${col.key}`}
            className="inline-block [clip-path:inset(0)] animate-[ui-col-out_400ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
          >
            {col.char}
          </span>
        ))}
        {columns.map((col) => {
          const isEntering = curState.entering.has(col.key);
          return (
            <ColEnter key={col.key} enter={isEntering && !snapOrReduced}>
              {col.digit === null ? (
                col.char
              ) : (
                <Digit
                  digit={col.digit}
                  trend={trend}
                  duration={duration}
                  reduced={snapOrReduced}
                  rollIn={isEntering}
                />
              )}
            </ColEnter>
          );
        })}
      </span>
    </span>
  );
}
