// Hairline UI · snowfall · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

"use client";

import * as React from "react";
import { createSpring, useInteractionActivity, useInteractionReducedMotion, type Spring } from "./ui-interaction-motion";
import { createSnowRenderer, type SnowRenderer } from "./snowfall-gl";
import { readShape, snowLayout, SnowSim } from "./snowfall-sim";

/* ─────────────────────────────────────────────────────────
 * SNOWFALL: snow that settles on whatever you wrap
 *
 *   falling    flakes drift down at three depths around the
 *              element: far ones pass behind it, near ones blur
 *              past in front
 *   settling   snow caps every top edge, rounding off at the
 *              ends; in a logo made of shapes on a plate, the
 *              narrow gaps between them fill from the bottom up
 *   dressed    once it is covered the snowfall thins out and
 *              stops; nothing moves until the next one
 *   shaken     a tap knocks the element: the snow pops up with
 *              it, breaks into clumps and falls away, then it
 *              snows again
 *
 * Inline SVG is read shape by shape, an <img> by its alpha,
 * anything else by its box and corner radius.
 *
 * Reduced motion: the element appears already dressed in snow,
 * with no flakes and no shake.
 * ───────────────────────────────────────────────────────── */

export interface SnowfallProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** What the snow settles on: an inline SVG logo, an image, a button, a card. One element. */
  children: React.ReactNode;
  /** Whether snow is falling. Turn it off and the flakes in the air finish their fall; settled snow stays. */
  snowing?: boolean;
  /** How heavily it snows, 0.25 to 2. */
  intensity?: number;
  /** Keep a light snowfall going once the element is dressed, instead of stopping. */
  keepFalling?: boolean;
  /** Knock the snow off when the element is pressed (pointer, Enter or Space). */
  shake?: boolean;
  /** Called when a snowfall has dressed the element and everything is still. */
  onSettled?: () => void;
}

type Geo = { x: number; y: number; w: number; h: number; dpr: number };

type Engine = {
  sim: SnowSim | null;
  renderer: SnowRenderer | null;
  raf: number;
  last: number;
  light: boolean;
  frame: (now: number) => void;
  paint: () => void;
  wake: () => void;
};

const round = (v: number) => Math.round(v * 2) / 2;

/** Whether the page behind is light, judged from the text colour (dark text, light page). Works for any colour syntax. */
function isLightPage(el: Element) {
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  if (!ctx) return true;
  ctx.fillStyle = getComputedStyle(el).color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

export function Snowfall({
  children,
  snowing = true,
  intensity = 1,
  keepFalling = false,
  shake = true,
  onSettled,
  className = "",
  onPointerDown,
  onKeyDown,
  ...props
}: SnowfallProps) {
  const reduced = useInteractionReducedMotion();
  const { ref: host, active } = useInteractionActivity<HTMLSpanElement>();
  const layer = React.useRef<HTMLSpanElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const jolt = React.useRef<Spring | null>(null);
  const [geo, setGeo] = React.useState<Geo | null>(null);
  const layout = React.useMemo(() => (geo ? snowLayout(geo.w, geo.h, geo.dpr) : null), [geo]);
  const live = React.useRef({ active, reduced, snowing, intensity, keepFalling, onSettled, dpr: 1, cw: 0, ch: 0 });
  const engine = React.useRef<Engine | null>(null);

  React.useEffect(() => {
    live.current = { ...live.current, active, reduced, snowing, intensity: Math.min(2, Math.max(0.25, intensity)), keepFalling, onSettled };
  });

  // The renderer, the frame loop and the shake spring live as long as the component.
  React.useEffect(() => {
    const el = canvas.current;
    const hostEl = host.current;
    if (!el || !hostEl) return;
    const e: Engine = {
      sim: null,
      renderer: createSnowRenderer(el),
      raf: 0,
      last: 0,
      light: isLightPage(hostEl),
      frame: () => {},
      paint: () => {},
      wake: () => {},
    };
    const draw = (time: number, upload: boolean) => {
      const { sim, renderer } = e;
      if (!sim || !renderer) return;
      const L = live.current;
      renderer.draw({
        view: upload || sim.viewDirty ? sim.view : null,
        clumps: upload || sim.viewDirty ? sim.clumpView : null,
        instances: sim.instances,
        count: sim.instanceCount,
        width: L.cw,
        height: L.ch,
        dpr: L.dpr,
        light: e.light,
        time,
      });
      sim.viewDirty = false;
    };
    e.frame = (now) => {
      const { sim } = e;
      const L = live.current;
      if (!sim || !e.renderer) {
        e.raf = 0;
        return;
      }
      const dt = e.last ? Math.min(0.05, (now - e.last) / 1000) : 1 / 60;
      e.last = now;
      sim.snowing = L.snowing;
      sim.intensity = L.intensity;
      sim.keepFalling = L.keepFalling;
      const moving = sim.step(dt);
      draw(now / 1000, false);
      if (sim.takeSettled()) L.onSettled?.();
      if (moving && L.active && !L.reduced) e.raf = requestAnimationFrame(e.frame);
      else {
        e.raf = 0;
        e.last = 0;
      }
    };
    e.paint = () => {
      if (!e.raf) draw(performance.now() / 1000, true);
    };
    e.wake = () => {
      const L = live.current;
      if (e.raf || !e.sim || !e.renderer || !L.active || L.reduced) return;
      e.last = 0;
      e.raf = requestAnimationFrame(e.frame);
    };
    engine.current = e;

    const lost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(e.raf);
      e.raf = 0;
      e.renderer = null;
    };
    el.addEventListener("webglcontextlost", lost);
    const theme = new MutationObserver(() => {
      const light = isLightPage(hostEl);
      if (light === e.light) return;
      e.light = light;
      e.paint();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });

    const spring = createSpring(
      0,
      { stiffness: 560, damping: 15 },
      () => {
        if (layer.current) layer.current.style.translate = `0 ${spring.get().toFixed(2)}px`;
      },
      0.02,
    );
    jolt.current = spring;

    return () => {
      cancelAnimationFrame(e.raf);
      e.raf = 0;
      el.removeEventListener("webglcontextlost", lost);
      theme.disconnect();
      spring.stop();
      e.renderer?.dispose();
      e.renderer = null;
      e.sim = null;
      engine.current = null;
    };
  }, [host]);

  // Measure the wrapped element; the canvas reaches past it on every side for the snowfall.
  React.useEffect(() => {
    const hostEl = host.current;
    const layerEl = layer.current;
    if (!hostEl || !layerEl) return;
    const target = layerEl.firstElementChild ?? layerEl;
    const measure = () => {
      const hr = hostEl.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      const lift = jolt.current?.get() ?? 0;
      const next: Geo = { x: round(tr.left - hr.left), y: round(tr.top - hr.top - lift), w: round(tr.width), h: round(tr.height), dpr: Math.min(2, window.devicePixelRatio || 1) };
      if (next.w < 4 || next.h < 4) return;
      setGeo((p) => (p && p.x === next.x && p.y === next.y && p.w === next.w && p.h === next.h && p.dpr === next.dpr ? p : next));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(hostEl);
    observer.observe(target);
    return () => observer.disconnect();
  }, [host]);

  // Read the shape and start a snowfall whenever the element's size changes.
  React.useEffect(() => {
    const e = engine.current;
    const layerEl = layer.current;
    if (!layout || !geo || !e || !e.renderer || !layerEl) return;
    let cancelled = false;
    const target = layerEl.firstElementChild ?? layerEl;
    readShape(target, layout)
      // Building the simulation is the other half of the work; give the page a frame in between.
      .then((shape) => new Promise<typeof shape>((resolve) => setTimeout(() => resolve(shape), 0)))
      .then((shape) => {
        if (cancelled || !e.renderer) return;
        const L = live.current;
        L.dpr = geo.dpr;
        L.cw = layout.cw;
        L.ch = layout.ch;
        const sim = new SnowSim(shape, layout);
        sim.snowing = L.snowing;
        sim.intensity = L.intensity;
        sim.keepFalling = L.keepFalling;
        e.renderer.setGrid(layout.gw, layout.gh);
        e.renderer.setMask(sim.mask, layout.gw * layout.k, layout.gh * layout.k);
        e.sim = sim;
        if (reduced) {
          sim.fillStatic(true);
          e.paint();
        } else {
          if (L.snowing) sim.prewarm();
          e.paint();
          e.wake();
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      cancelAnimationFrame(e.raf);
      e.raf = 0;
      e.sim = null;
    };
  }, [layout, geo, reduced]);

  // Snow again, or more or less of it, when the props change or it comes back into view.
  React.useEffect(() => {
    engine.current?.wake();
  }, [active, snowing, intensity, keepFalling]);

  const knock = () => {
    const e = engine.current;
    if (!shake || reduced || !e?.sim || !layout) return;
    e.sim.shake();
    jolt.current?.push(-layout.s * 0.55);
    e.wake();
  };

  return (
    <span
      ref={host}
      className={`relative inline-block align-top ${shake && !reduced ? "cursor-pointer" : ""} ${className}`}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.button === 0 && !event.defaultPrevented) knock();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if ((event.key === "Enter" || event.key === " ") && !event.repeat && !event.defaultPrevented) knock();
      }}
      {...props}
    >
      {/* A flex box, so an inline <svg> child sits without the line box's gap under it. */}
      <span ref={layer} className="flex">
        {children}
      </span>
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={layout && geo ? { left: geo.x - layout.box.x, top: geo.y - layout.box.y, width: layout.cw, height: layout.ch } : { display: "none" }}
      />
    </span>
  );
}
