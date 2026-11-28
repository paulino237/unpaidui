// Hairline UI · afterglow · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

"use client";

import * as React from "react";
import { createAfterglowRenderer, type AfterglowRenderer, type RGB } from "./afterglow-gl";

/* ─────────────────────────────────────────────────────────
 * AFTERGLOW: light runs through an element when something worked
 *
 *   rise     the light comes out of the control you pressed and
 *            spreads across the element: a horizon rising
 *            through a card, a streak along a pill, a ring
 *            from the middle of a round tile
 *   change   your update runs at once, under an exact copy of
 *            the old content; the light dissolves that copy
 *            grain by grain just behind its bright line, so each
 *            old line turns into the new one in its own place as
 *            the light passes, and what didn't change never moves
 *   glint    as the content clears, only the text that changed
 *            catches the light, rippling out from your press
 *   afterglow  the edge keeps an iridescent glow a moment,
 *            the far side last, and fades
 *
 * One call: ref.play(update). The app keeps its own state, its
 * own buttons and its own API.
 *
 * Reduced motion: the update runs at once, with no light.
 * ───────────────────────────────────────────────────────── */

export type AfterglowOrigin = "press" | "center" | "top" | "bottom" | "left" | "right" | { x: number; y: number };

export interface AfterglowHandle {
  /**
   * Runs the light. `update` is called once, straight away, under a copy of the old content
   * that the light then dissolves: set your new state there and it appears where the light passes.
   * Resolves when the light has gone.
   */
  play: (update?: () => void, options?: { origin?: AfterglowOrigin }) => Promise<void>;
}

export interface AfterglowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** One element: a card, a pill, a tile, a row. The light takes its shape and corner radius. */
  children: React.ReactNode;
  ref?: React.Ref<AfterglowHandle>;
  /** Where the light starts. "press" is the control last pressed inside, else the focused one, else the bottom edge. */
  origin?: AfterglowOrigin;
  /** Warm light ahead of the front, the fringe, the clear light behind it. Any CSS colours. */
  colors?: readonly [string, string, string];
  /** Let the text that changed catch the light as the content clears. */
  glint?: boolean;
  /** Called when the light has gone. */
  onFinish?: () => void;
}

const FRONT = 1100;
const TOTAL = 2000;
const PEAK_BLUR = 4;
const BLUR_IN = 240;
const BLUR_OUT = 700;
/** The dissolve runs this far behind the bright line, and takes this much of the band to finish (both × band). */
const LAG = 0.22;
const DEPTH = 0.6;
const GLINT = 820;
const PRESS_MEMORY = 15000;
const DEFAULT_COLORS = ["#ffb347", "#ff4f8b", "#3d8bff"] as const;
const PRESSABLE = 'button, a, input, select, textarea, label, summary, [role="button"], [role="switch"], [role="checkbox"], [role="tab"], [role="menuitem"]';

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () => React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

let probe: CanvasRenderingContext2D | null = null;
/** Any CSS colour as 0–1 RGB, read back from a 1px canvas. */
function toRgb(color: string, fallback: RGB): RGB {
  probe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!probe) return fallback;
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = "#000";
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
  return a === 0 ? fallback : [r / 255, g / 255, b / 255];
}

/** A light surface has dark text on it. Judged from the element's own text colour, so a dark card on a light page counts as dark. */
function isLightSurface(el: Element) {
  const [r, g, b] = toRgb(getComputedStyle(el).color, [0, 0, 0]);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.55;
}

function parseRadius(value: string, w: number, h: number) {
  const first = value.trim().split(/\s+/)[0] ?? "0";
  const n = parseFloat(first) || 0;
  return clamp(first.endsWith("%") ? (n / 100) * Math.min(w, h) : n, 0, Math.min(w, h) / 2);
}

let grain: string | null = null;
/** A 64px tile of random alpha: the grain the old content dissolves through. Made once, on first use. */
function grainTile() {
  if (grain !== null) return grain;
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return (grain = "");
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) img.data[i * 4 + 3] = Math.round(Math.random() ** 0.55 * 255);
  ctx.putImageData(img, 0, 0);
  return (grain = c.toDataURL());
}

/** A still copy of the element as it is, laid exactly over it: inert, unnamed, hidden from assistive tech. */
function makeGhost(el: HTMLElement) {
  const ghost = el.cloneNode(true) as HTMLElement;
  for (const n of [ghost, ...Array.from(ghost.querySelectorAll<HTMLElement>("[id], [name]"))]) {
    n.removeAttribute("id");
    n.removeAttribute("name");
  }
  const from = el.querySelectorAll("canvas");
  ghost.querySelectorAll("canvas").forEach((c, i) => {
    try {
      c.getContext("2d")?.drawImage(from[i], 0, 0);
    } catch {}
  });
  ghost.setAttribute("aria-hidden", "true");
  ghost.inert = true;
  Object.assign(ghost.style, {
    position: "absolute",
    left: `${el.offsetLeft}px`,
    top: `${el.offsetTop}px`,
    width: `${el.offsetWidth}px`,
    height: `${el.offsetHeight}px`,
    minWidth: "0",
    maxWidth: "none",
    margin: "0",
    zIndex: "5",
    pointerEvents: "none",
    transition: "none",
  });
  return ghost;
}

type Leaf = { el: HTMLElement; text: string };

/** Every element that holds only text, keyed by its path from the root, skipping hidden and screen-reader-only text. */
function readLeaves(root: HTMLElement) {
  const out = new Map<string, Leaf>();
  const walk = (el: Element, path: string) => {
    if (!(el instanceof HTMLElement) || el.getAttribute("aria-hidden") === "true") return;
    const kids = el.children;
    if (kids.length === 0) {
      const text = el.textContent?.trim();
      if (text && el.offsetWidth > 1 && el.offsetHeight > 1) out.set(path, { el, text });
      return;
    }
    for (let i = 0; i < kids.length; i++) walk(kids[i], `${path}/${i}${kids[i].tagName}`);
  };
  walk(root, "");
  return out;
}

/** A band of the light's colours runs through the letters once, in the direction the light travelled. */
function glintText(el: HTMLElement, delay: number, rightward: boolean, light: boolean, colors: readonly [string, string, string]) {
  if (getComputedStyle(el).backgroundImage !== "none") return;
  const [warm, mid, cool] = colors;
  const stops = light ? [cool, mid, warm] : [cool, "#fff", warm, mid];
  const band = (rightward ? stops : [...stops].reverse()).map((c, i, all) => `${c} ${Math.round(36 + (i * 26) / Math.max(1, all.length - 1))}%`);
  const s = el.style;
  const saved = [s.backgroundImage, s.backgroundSize, s.backgroundRepeat, s.backgroundClip, s.webkitBackgroundClip, s.webkitTextFillColor];
  s.backgroundImage = `linear-gradient(100deg, currentColor 0 30%, ${band.join(", ")}, currentColor 68% 100%)`;
  s.backgroundSize = "300% 100%";
  s.backgroundRepeat = "no-repeat";
  s.backgroundClip = "text";
  s.webkitBackgroundClip = "text";
  s.webkitTextFillColor = "transparent";
  const [from, to] = rightward ? ["100% 0", "0% 0"] : ["0% 0", "100% 0"];
  const a = el.animate([{ backgroundPosition: from }, { backgroundPosition: to }], { duration: GLINT, delay, easing: "cubic-bezier(0.45, 0, 0.2, 1)", fill: "both" });
  const restore = () => {
    a.cancel();
    [s.backgroundImage, s.backgroundSize, s.backgroundRepeat, s.backgroundClip, s.webkitBackgroundClip, s.webkitTextFillColor] = saved;
  };
  a.onfinish = restore;
  return restore;
}

type Settings = { origin: AfterglowOrigin; colors: readonly [string, string, string]; glint: boolean; onFinish?: () => void; reduced: boolean };

type Run = {
  el: HTMLElement;
  start: number;
  w: number;
  h: number;
  pw: number;
  ph: number;
  radius: number;
  light: boolean;
  cx: number;
  cy: number;
  r0: number;
  rmax: number;
  band: number;
  seed: number;
  rgb: [RGB, RGB, RGB];
  ghost: HTMLElement | null;
  far: number;
  blur: number;
  before: Map<string, Leaf> | null;
  mutated: boolean;
  observer: MutationObserver | null;
  resolve: () => void;
};

type Press = { el: Element | null; x: number; y: number; at: number };

function createEngine(getRoot: () => HTMLDivElement | null, getSettings: () => Settings) {
  let renderer: AfterglowRenderer | null | undefined;
  let canvas: HTMLCanvasElement | null = null;
  let raf = 0;
  let warmTimer = 0;
  let run: Run | null = null;
  let press: Press | null = null;
  const styled = new Map<HTMLElement, [string, string, string]>();
  const glints = new Set<() => void>();

  /** The wrapped element: the first child that isn't our canvas. */
  const subject = () => {
    const root = getRoot();
    if (!root) return null;
    for (const c of Array.from(root.children)) if (c instanceof HTMLElement && c !== canvas) return c;
    return null;
  };

  const dropCanvas = () => {
    renderer?.dispose();
    canvas?.remove();
    canvas = null;
  };

  /** The canvas is ours, not React's: a context that was lost or released can't come back on the same canvas. */
  const ensureRenderer = () => {
    if (renderer && !renderer.lost()) return renderer;
    if (renderer === null) return null;
    const root = getRoot();
    if (!root) return null;
    dropCanvas();
    canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, { position: "absolute", left: "0", top: "0", zIndex: "10", pointerEvents: "none", display: "none" });
    root.appendChild(canvas);
    renderer = createAfterglowRenderer(canvas);
    if (!renderer) dropCanvas();
    return renderer;
  };

  /** Blur and dim what's inside the element and its ghost, not their boxes: the card's edge stays crisp. */
  const writeBlur = (els: (HTMLElement | null)[], blur: number) => {
    const targets = els.flatMap((el) => (!el ? [] : el.children.length ? Array.from(el.children) : [el]));
    const on = blur > 0.05;
    for (const k of targets) {
      if (!(k instanceof HTMLElement)) continue;
      let saved = styled.get(k);
      if (!saved) {
        saved = [k.style.filter, k.style.opacity, k.style.willChange];
        styled.set(k, saved);
        k.style.willChange = "filter, opacity";
      }
      k.style.filter = on ? `blur(${blur.toFixed(2)}px)` : saved[0];
      k.style.opacity = on ? String(1 - 0.22 * (blur / PEAK_BLUR)) : saved[1];
    }
  };

  const restoreStyles = () => {
    for (const [k, [filter, opacity, willChange]] of styled) {
      k.style.filter = filter;
      k.style.opacity = opacity;
      k.style.willChange = willChange;
    }
    styled.clear();
  };

  const resolveOrigin = (kind: AfterglowOrigin, el: HTMLElement, w: number, h: number) => {
    if (typeof kind === "object") return { x: clamp(kind.x, 0, 1) * w, y: clamp(kind.y, 0, 1) * h };
    if (kind === "center") return { x: w / 2, y: h / 2 };
    if (kind === "top") return { x: w / 2, y: 0 };
    if (kind === "bottom") return { x: w / 2, y: h };
    if (kind === "left") return { x: 0, y: h / 2 };
    if (kind === "right") return { x: w, y: h / 2 };
    const box = el.getBoundingClientRect();
    const sx = box.width / w || 1;
    const sy = box.height / h || 1;
    const centreOf = (t: Element) => {
      const r = t.getBoundingClientRect();
      return { x: (r.left + r.width / 2 - box.left) / sx, y: (r.top + r.height / 2 - box.top) / sy, big: r.width * r.height > 0.4 * box.width * box.height };
    };
    if (press && performance.now() - press.at < PRESS_MEMORY) {
      // Out of the control you pressed; from the exact point when the whole element is the control.
      if (press.el?.isConnected && el.contains(press.el)) {
        const c = centreOf(press.el);
        if (!c.big) return c;
      }
      return { x: press.x, y: press.y };
    }
    const active = document.activeElement;
    if (active && active !== el && el.contains(active)) return centreOf(active);
    return { x: w / 2, y: h };
  };

  const finish = (interrupted: boolean) => {
    const r = run;
    if (!r) return;
    run = null;
    cancelAnimationFrame(raf);
    raf = 0;
    r.ghost?.remove();
    r.observer?.disconnect();
    restoreStyles();
    renderer?.clear();
    if (canvas) canvas.style.display = "none";
    r.resolve();
    if (!interrupted) getSettings().onFinish?.();
  };

  /** Radius of the front after t ms, and when it reaches distance d (the same curve as the shader). */
  const frontAt = (r: Run, t: number) => r.r0 + (r.rmax - r.r0) * easeOut(clamp(t / FRONT, 0, 1));
  const reachesAt = (r: Run, d: number) => (1 - Math.cbrt(1 - clamp((d - r.r0) / Math.max(1, r.rmax - r.r0), 0, 1))) * FRONT;

  const glintChanges = (r: Run, t: number) => {
    const before = r.before;
    r.before = null;
    r.observer?.disconnect();
    r.observer = null;
    if (!before) return;
    const box = r.el.getBoundingClientRect();
    const sx = box.width / r.w || 1;
    const sy = box.height / r.h || 1;
    const changed: { el: HTMLElement; dist: number; dx: number }[] = [];
    for (const [key, leaf] of readLeaves(r.el)) {
      if (before.get(key)?.text === leaf.text) continue;
      const b = leaf.el.getBoundingClientRect();
      const x = (b.left + b.width / 2 - box.left) / sx - r.cx;
      const y = (b.top + b.height / 2 - box.top) / sy - r.cy;
      changed.push({ el: leaf.el, dist: Math.hypot(x, y), dx: x });
    }
    if (!changed.length) return;
    const { colors } = getSettings();
    for (const c of changed.slice(0, 16)) {
      // Each new value catches the light as soon as the dissolve has finished over it.
      const delay = Math.max(40, reachesAt(r, c.dist + (LAG + DEPTH) * r.band) - t + 60);
      const stop = glintText(c.el, delay, c.dx >= 0, r.light, colors);
      if (stop) {
        glints.add(stop);
        window.setTimeout(() => glints.delete(stop), delay + GLINT + 50);
      }
    }
  };

  const frame = (now: number) => {
    const r = run;
    if (!r) return;
    const t = Math.max(0, now - r.start);
    if (r.before && (r.mutated ? t >= 32 : t >= 300)) glintChanges(r, t);
    r.blur = t < BLUR_IN ? PEAK_BLUR * easeIn(t / BLUR_IN) : PEAK_BLUR * (1 - easeOut(Math.min(1, (t - BLUR_IN) / BLUR_OUT)));
    // The old content dissolves just behind the bright line: solid ahead of it, grain fading to nothing
    // over the next stretch, gone where the light has passed.
    if (r.ghost) {
      const edge = frontAt(r, t) - LAG * r.band;
      const inner = edge - DEPTH * r.band;
      if (inner > r.far) {
        r.ghost.remove();
        r.ghost = null;
      } else {
        const at = `circle at ${r.cx.toFixed(1)}px ${r.cy.toFixed(1)}px`;
        const solid = `radial-gradient(${at}, transparent ${Math.max(0, edge).toFixed(1)}px, #000 ${Math.max(0.5, edge + 0.5).toFixed(1)}px)`;
        const fade = `radial-gradient(${at}, transparent ${Math.max(0, inner).toFixed(1)}px, #000 ${Math.max(0.5, edge).toFixed(1)}px)`;
        const tile = grainTile();
        const st = r.ghost.style;
        st.maskImage = st.webkitMaskImage = tile ? `${solid}, url(${tile}), ${fade}` : `${solid}, ${fade}`;
        st.maskSize = st.webkitMaskSize = tile ? "100% 100%, 64px 64px, 100% 100%" : "100% 100%, 100% 100%";
        st.maskRepeat = st.webkitMaskRepeat = tile ? "no-repeat, repeat, no-repeat" : "no-repeat, no-repeat";
        st.maskComposite = tile ? "add, intersect, add" : "add, add";
        st.setProperty("-webkit-mask-composite", tile ? "source-over, source-in, source-over" : "source-over, source-over");
      }
    }
    writeBlur([r.el, r.ghost], r.blur);
    renderer?.draw({
      width: r.w,
      height: r.h,
      pixelWidth: r.pw,
      pixelHeight: r.ph,
      radius: r.radius,
      cx: r.cx,
      cy: r.cy,
      r0: r.r0,
      rmax: r.rmax,
      band: r.band,
      time: t,
      front: FRONT,
      total: TOTAL,
      light: r.light,
      warm: r.rgb[0],
      mid: r.rgb[1],
      cool: r.rgb[2],
      seed: r.seed,
    });
    if (t >= TOTAL) return finish(false);
    raf = requestAnimationFrame(frame);
  };

  /** Compile the light ahead of time, when a hand comes near, so the first frame doesn't wait for it. */
  const warm = () => {
    if (renderer !== undefined || warmTimer || getSettings().reduced) return;
    warmTimer = window.setTimeout(() => {
      warmTimer = 0;
      ensureRenderer();
    }, 0);
  };

  return {
    warm,
    notePress(target: EventTarget | null, clientX: number, clientY: number) {
      const el = subject();
      if (!el || !(target instanceof Element)) return;
      const box = el.getBoundingClientRect();
      const control = target.closest(PRESSABLE);
      press = {
        el: control && el.contains(control) ? control : target,
        x: (clientX - box.left) * (el.offsetWidth / (box.width || 1)),
        y: (clientY - box.top) * (el.offsetHeight / (box.height || 1)),
        at: performance.now(),
      };
      warm();
    },
    notePressedKey(target: EventTarget | null) {
      const el = subject();
      if (!el || !(target instanceof Element) || !el.contains(target)) return;
      const box = el.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      press = { el: target, x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top, at: performance.now() };
      warm();
    },
    play(update?: () => void, options?: { origin?: AfterglowOrigin }) {
      finish(true);
      const s = getSettings();
      const el = subject();
      const w = el?.offsetWidth ?? 0;
      const h = el?.offsetHeight ?? 0;
      if (!el || s.reduced || !w || !h) {
        update?.();
        return Promise.resolve();
      }
      const cs = getComputedStyle(el);
      const o = resolveOrigin(options?.origin ?? s.origin, el, w, h);
      // The wave's centre sits behind the press point, away from the middle, so the front leaves the
      // control as a gentle arc: a horizon in a card, a streak in a pill, a ring from the centre.
      const short = Math.min(w, h);
      const dx = o.x - w / 2;
      const dy = o.y - h / 2;
      const len = Math.hypot(dx, dy);
      const push = len < short * 0.12 ? 0 : short * 0.45 + Math.max(w, h) * 0.08;
      const cx = o.x + (len ? dx / len : 0) * push;
      const cy = o.y + (len ? dy / len : 0) * push;
      const band = clamp(short * (push ? 0.5 : 0.36), 36, 170);
      const far = Math.max(Math.hypot(cx, cy), Math.hypot(cx - w, cy), Math.hypot(cx, cy - h), Math.hypot(cx - w, cy - h));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const pw = Math.max(1, Math.round(w * dpr));
      const ph = Math.max(1, Math.round(h * dpr));
      const light = isLightSurface(el);
      if (ensureRenderer() && canvas) {
        if (canvas.width !== pw) canvas.width = pw;
        if (canvas.height !== ph) canvas.height = ph;
        Object.assign(canvas.style, {
          display: "block",
          left: `${el.offsetLeft}px`,
          top: `${el.offsetTop}px`,
          width: `${w}px`,
          height: `${h}px`,
          borderRadius: cs.borderRadius,
          mixBlendMode: light ? "normal" : "screen",
        });
      }
      const [warm, mid, cool] = s.colors;
      const before = s.glint ? readLeaves(el) : null;
      // The old content, frozen, over the new: nothing visibly changes until the light dissolves it.
      const ghost = update ? makeGhost(el) : null;
      if (ghost) el.after(ghost);
      update?.();
      return new Promise<void>((resolve) => {
        run = {
          el,
          start: performance.now(),
          w,
          h,
          pw,
          ph,
          radius: parseRadius(cs.borderTopLeftRadius, w, h),
          light,
          cx,
          cy,
          r0: push,
          rmax: far + band * 1.4,
          far,
          band,
          seed: Math.random() * 97,
          rgb: [toRgb(warm, [1, 0.7, 0.28]), toRgb(mid, [1, 0.31, 0.55]), toRgb(cool, [0.24, 0.55, 1])],
          ghost,
          blur: 0,
          before,
          mutated: false,
          observer: null,
          resolve,
        };
        if (before) {
          const r = run;
          r.observer = new MutationObserver(() => {
            r.mutated = true;
            writeBlur([r.el, r.ghost], r.blur);
          });
          r.observer.observe(el, { childList: true, subtree: true, characterData: true });
        }
        raf = requestAnimationFrame(frame);
      });
    },
    dispose() {
      finish(true);
      window.clearTimeout(warmTimer);
      warmTimer = 0;
      for (const stop of glints) stop();
      glints.clear();
      dropCanvas();
      renderer = undefined;
    },
  };
}

type Engine = ReturnType<typeof createEngine>;

export function Afterglow({
  children,
  ref,
  origin = "press",
  colors = DEFAULT_COLORS,
  glint = true,
  onFinish,
  className = "",
  onPointerDownCapture,
  onPointerEnter,
  onKeyDownCapture,
  ...props
}: AfterglowProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const settings = React.useRef<Settings>({ origin, colors, glint, onFinish, reduced });
  const engineRef = React.useRef<Engine | null>(null);

  React.useLayoutEffect(() => {
    settings.current = { origin, colors, glint, onFinish, reduced };
  });

  const engine = React.useCallback(
    () => (engineRef.current ??= createEngine(() => rootRef.current, () => settings.current)),
    [],
  );

  React.useEffect(
    () => () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    },
    [],
  );

  React.useImperativeHandle(ref, () => ({ play: (update, options) => engine().play(update, options) }), [engine]);

  return (
    <div
      ref={rootRef}
      className={`relative isolate ${className}`}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (e.pointerType === "mouse") engine().warm();
      }}
      onPointerDownCapture={(e) => {
        onPointerDownCapture?.(e);
        engine().notePress(e.target, e.clientX, e.clientY);
      }}
      onKeyDownCapture={(e) => {
        onKeyDownCapture?.(e);
        if (e.key === "Enter" || e.key === " ") engine().notePressedKey(e.target);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
