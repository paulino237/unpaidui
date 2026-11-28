// Hairline UI · snowfall · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

/* ─────────────────────────────────────────────────────────
 * SNOWFALL engine: where snow can rest on a shape, and the snow
 *
 *   reading   the wrapped logo is drawn once with every shape in
 *             a flat colour of its own, so each pixel says which
 *             shape is on top; a shape that sits inside another
 *             stands one level in front of it (tiles on a plate)
 *   resting   snow caps the top edge of every level and packs
 *             into narrow gaps between raised shapes, filling
 *             them from the bottom up like a channel
 *   falling   flakes at three depths: far ones pass behind the
 *             logo, near ones blur past in front, the middle
 *             ones land; a full cap sheds from its ends
 *   shaking   the settled snow breaks into clumps that pop up
 *             with the logo and fall away
 *
 * Everything here is in CSS pixels of the canvas, which covers
 * the element plus room above and around it for the snowfall.
 * ───────────────────────────────────────────────────────── */

export type Box = { x: number; y: number; w: number; h: number };

export type SnowLayout = {
  /** Size scale: the geometric mean of the element's sides, in CSS px. */
  s: number;
  /** Grid cell size in CSS px. */
  cell: number;
  /** Mask pixels per grid cell, along each side. */
  k: number;
  gw: number;
  gh: number;
  /** Canvas size in CSS px: exactly gw * cell by gh * cell. */
  cw: number;
  ch: number;
  /** Where the element sits in the canvas. */
  box: Box;
};

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

/* Tuning. Lengths are fractions of s, the element's size. */
const CELLS = 110; // grid cells across s
const CAP_BASE = 0.055; // cap height on the base level (a plate, a wordmark, a button)
const CAP_RAISED = 0.032; // cap height on shapes that stand on another
const GROOVE = 0.075; // gaps between raised shapes up to this wide catch snow
const SPEED = 0.42; // fall speed of the middle flakes, s per second
const GRAVITY = 2.3; // for clumps, s per second squared
const FLOW = 5; // cells of snow per second that a deposit settles in at
const MASS_GROOVE = 30; // cells of snow one grain packs into a gap
const MASS_CAP = 3.6; // cells of snow one grain adds to a cap
const FULL = 0.93; // share of the room that counts as dressed
const MAX_FLAKES = 900;
const MAX_CLUMPS = 1600;

const BACK = 0;
const MID = 1;
const FRONT = 2;

/** Where the canvas sits and how fine the grid is, for an element of this size. */
export function snowLayout(w: number, h: number, dpr: number): SnowLayout {
  const s = Math.sqrt(Math.max(1, w) * Math.max(1, h));
  const cell = clamp(s / CELLS, 0.5, 8);
  const side = clamp(s * 0.35, 24, 180);
  const top = clamp(s * 0.55, 36, 260);
  const bottom = clamp(s * 0.3, 20, 140);
  const gw = Math.ceil((w + side * 2) / cell);
  const gh = Math.ceil((h + top + bottom) / cell);
  let k = clamp(Math.ceil((cell * dpr) / 1.7), 1, 5);
  while (k > 1 && gw * gh * k * k > 1_400_000) k--;
  return { s, cell, k, gw, gh, cw: gw * cell, ch: gh * cell, box: { x: side, y: top, w, h } };
}

/* ── Reading the shape ─────────────────────────────────── */

export type ShapeMap = {
  /** One entry per mask pixel: -1 where nothing is drawn, else how many levels in front of the back the shape stands. */
  level: Int8Array;
  maxLevel: number;
};

const SHAPES = "path,rect,circle,ellipse,polygon,polyline,line,text,use";
const NONRENDER = "defs,symbol,clipPath,mask,pattern,marker";

const idColor = (id: number) => `rgb(${((id & 31) << 3) | 4},${((id >> 5) << 3) | 4},128)`;

function colorAlpha(color: string) {
  const m = /rgba?\(([^)]+)\)/.exec(color);
  if (!m) return color === "transparent" ? 0 : 1;
  const parts = m[1].split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 4) return 1;
  const a = parseFloat(parts[3]);
  return parts[3].endsWith("%") ? a / 100 : a;
}

function paintAlpha(paint: string, doc: Document) {
  if (!paint || paint === "none") return 0;
  const url = /url\(["']?#([^"')]+)["']?\)/.exec(paint);
  if (!url) return colorAlpha(paint);
  const grad = doc.getElementById(url[1]);
  const stops = grad ? grad.querySelectorAll("stop") : null;
  if (!stops || !stops.length) return 1;
  let max = 0;
  stops.forEach((stop) => {
    const cs = getComputedStyle(stop);
    max = Math.max(max, (parseFloat(cs.stopOpacity) || 0) * colorAlpha(cs.stopColor));
  });
  return max;
}

function opacityChain(el: Element, root: Element) {
  let o = 1;
  for (let node: Element | null = el; node; node = node.parentElement) {
    o *= parseFloat(getComputedStyle(node).opacity) || 0;
    if (node === root) break;
  }
  return o;
}

/** Draw the SVG with each visible shape in its own flat colour. Returns how many shapes it drew. */
async function drawSvgIds(ctx: CanvasRenderingContext2D, svg: SVGSVGElement, x: number, y: number, w: number, h: number, box: Box) {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const live = Array.from(svg.querySelectorAll(SHAPES));
  const copies = Array.from(clone.querySelectorAll(SHAPES)) as SVGElement[];
  let id = 0;
  live.forEach((el, i) => {
    const copy = copies[i];
    if (!copy || el.closest(NONRENDER)) return;
    const hide = () => copy.setAttribute("display", "none");
    if (el.closest('[data-snow="ignore"]')) return hide();
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return hide();
    const o = opacityChain(el, svg);
    const fill = o * (parseFloat(cs.fillOpacity) || 0) * paintAlpha(cs.fill, el.ownerDocument) >= 0.5;
    const stroke = (parseFloat(cs.strokeWidth) || 0) > 0 && o * (parseFloat(cs.strokeOpacity) || 0) * paintAlpha(cs.stroke, el.ownerDocument) >= 0.5;
    if (!fill && !stroke) return hide();
    if (id >= 1023) return hide();
    const color = idColor(++id);
    copy.style.setProperty("fill", fill ? color : "none", "important");
    copy.style.setProperty("stroke", stroke ? color : "none", "important");
  });
  if (!id) return 0;
  clone.querySelectorAll("*").forEach((node) => {
    const style = (node as SVGElement).style;
    if (!style) return;
    style.setProperty("opacity", "1", "important");
    style.setProperty("fill-opacity", "1", "important");
    style.setProperty("stroke-opacity", "1", "important");
    style.setProperty("filter", "none", "important");
  });
  if (!clone.getAttribute("viewBox")) clone.setAttribute("viewBox", `0 0 ${box.w} ${box.h}`);
  clone.removeAttribute("class");
  clone.removeAttribute("style");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", String(w));
  clone.setAttribute("height", String(h));
  clone.style.setProperty("shape-rendering", "crispEdges");
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
  await img.decode();
  ctx.drawImage(img, x, y, w, h);
  return id;
}

function drawBox(ctx: CanvasRenderingContext2D, el: Element, x: number, y: number, w: number, h: number, scale: number) {
  const cs = getComputedStyle(el);
  const r = (v: string) => {
    const n = parseFloat(v) || 0;
    return Math.min(v.trim().endsWith("%") ? (n / 100) * Math.min(w, h) : n * scale, w / 2, h / 2);
  };
  ctx.fillStyle = idColor(1);
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, [r(cs.borderTopLeftRadius), r(cs.borderTopRightRadius), r(cs.borderBottomRightRadius), r(cs.borderBottomLeftRadius)]);
  ctx.fill();
}

/**
 * Read the element into a level map at mask resolution. An inline SVG is read shape by shape; an image by its alpha;
 * anything else by its border box and radius.
 */
export async function readShape(target: Element, layout: SnowLayout): Promise<ShapeMap> {
  const { k, gw, gh, cell, box } = layout;
  const w = gw * k;
  const h = gh * k;
  const px = k / cell;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("no 2d context");
  ctx.imageSmoothingEnabled = false;
  const bx = box.x * px;
  const by = box.y * px;
  const bw = box.w * px;
  const bh = box.h * px;
  let count = 0;
  let alphaOnly = false;
  let data: Uint8ClampedArray | null = null;
  try {
    if (target instanceof SVGSVGElement) count = await drawSvgIds(ctx, target, bx, by, bw, bh, box);
    else if (target instanceof HTMLImageElement && target.complete && target.naturalWidth) {
      ctx.drawImage(target, bx, by, bw, bh);
      count = 1;
      alphaOnly = true;
    }
    if (count) data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    count = 0;
  }
  if (!count || !data) {
    ctx.clearRect(0, 0, w, h);
    drawBox(ctx, target, bx, by, bw, bh, px);
    count = 1;
    alphaOnly = true;
    data = ctx.getImageData(0, 0, w, h).data;
  }

  const n = count;
  const ids = new Uint16Array(w * h);
  for (let i = 0, p = 0; i < ids.length; i++, p += 4) {
    if (data[p + 3] < 128) continue;
    const id = alphaOnly ? 1 : ((data[p] >> 3) & 31) | (((data[p + 1] >> 3) & 31) << 5);
    ids[i] = id >= 1 && id <= n ? id : 0;
  }

  // A shape stands on whatever earlier shape most of its outline touches; one that mostly touches nothing is at the back.
  const levels = new Int8Array(n + 1);
  if (n > 1 && n <= 300) {
    const stride = n + 1;
    const votes = new Int32Array(stride * stride);
    const vote = (a: number, b: number) => {
      if (a && (b === 0 || b < a)) votes[a * stride + b]++;
    };
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const a = ids[i];
        if (x + 1 < w && ids[i + 1] !== a) {
          vote(a, ids[i + 1]);
          vote(ids[i + 1], a);
        }
        if (y + 1 < h && ids[i + w] !== a) {
          vote(a, ids[i + w]);
          vote(ids[i + w], a);
        }
      }
    }
    for (let e = 1; e <= n; e++) {
      const none = votes[e * stride];
      let best = 0;
      let bestCount = 0;
      for (let f = 1; f < e; f++) {
        const c = votes[e * stride + f];
        if (c > bestCount) {
          bestCount = c;
          best = f;
        }
      }
      levels[e] = best && bestCount > none ? Math.min(3, levels[best] + 1) : 0;
    }
  }
  const level = new Int8Array(w * h);
  let maxLevel = 0;
  for (let i = 0; i < level.length; i++) {
    const id = ids[i];
    const l = id ? levels[id] : -1;
    level[i] = l;
    if (l > maxLevel) maxLevel = l;
  }
  return { level, maxLevel };
}

/* ── Blur for the mask's shading ──────────────────────── */

function boxBlur(src: Float32Array, w: number, h: number, r: number) {
  const tmp = new Float32Array(src.length);
  const out = new Float32Array(src.length);
  const span = r * 2 + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = 0;
    for (let x = -r; x <= r; x++) sum += src[row + clamp(x, 0, w - 1)];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = sum / span;
      sum += src[row + Math.min(w - 1, x + r + 1)] - src[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = -r; y <= r; y++) sum += tmp[clamp(y, 0, h - 1) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum / span;
      sum += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
  return out;
}

/** Grow (keep = 1) or shrink (keep = 0) a mask by a square of radius r, one axis at a time. */
function morph(src: Uint8Array, w: number, h: number, r: number, keep: 0 | 1) {
  const tmp = new Uint8Array(src.length);
  const out = new Uint8Array(src.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 1 - keep;
      for (let i = Math.max(0, x - r); i <= Math.min(w - 1, x + r); i++) {
        if (src[y * w + i] === keep) {
          v = keep;
          break;
        }
      }
      tmp[y * w + x] = v;
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = 1 - keep;
      for (let i = Math.max(0, y - r); i <= Math.min(h - 1, y + r); i++) {
        if (tmp[i * w + x] === keep) {
          v = keep;
          break;
        }
      }
      out[y * w + x] = v;
    }
  }
  return out;
}

/* ── The simulation ───────────────────────────────────── */

type Run = { x0: number; y0: number; x1: number; y1: number; shed0: number; shed1: number };

export class SnowSim {
  readonly layout: SnowLayout;
  readonly bands: number;
  /** Mask for the renderer, RGBA at gw * k by gh * k: where snow may show, how shaded it is there, and where the shape is. */
  readonly mask: Uint8Array;
  /** Settled snow for the renderer, one byte per cell; the shape's mask clips it. */
  readonly view: Uint8Array;
  /** Snow in the air after a shake, one byte per cell; nothing clips it, since it falls in front. */
  readonly clumpView: Uint8Array;
  /** Flakes for the renderer: x, y, radius, alpha, softness, behind-the-logo, per flake. */
  readonly instances: Float32Array;
  instanceCount = 0;
  viewDirty = true;

  snowing = true;
  intensity = 1;
  keepFalling = false;

  private readonly cells: number;
  private readonly lev: Int8Array;
  private readonly groove: Uint8Array;
  private readonly runOf: Int32Array[];
  private readonly hmax: Float32Array[];
  private readonly runs: Run[] = [];
  private readonly d: Float32Array;
  private readonly pend: Float32Array;
  private readonly owner: Int8Array;
  private readonly inPend: Uint8Array;
  private pendList: number[] = [];
  private readonly edgeCells: Int32Array;
  private readonly edgeNbrs: Int32Array;
  private readonly capacity: number;

  // flakes
  private n = 0;
  private readonly fx = new Float32Array(MAX_FLAKES);
  private readonly fy = new Float32Array(MAX_FLAKES);
  private readonly fvx = new Float32Array(MAX_FLAKES);
  private readonly fvy = new Float32Array(MAX_FLAKES);
  private readonly fterm = new Float32Array(MAX_FLAKES);
  private readonly fr = new Float32Array(MAX_FLAKES);
  private readonly fa = new Float32Array(MAX_FLAKES);
  private readonly fsoft = new Float32Array(MAX_FLAKES);
  private readonly fph = new Float32Array(MAX_FLAKES);
  private readonly ffreq = new Float32Array(MAX_FLAKES);
  private readonly famp = new Float32Array(MAX_FLAKES);
  private readonly fmass = new Float32Array(MAX_FLAKES);
  private readonly fkind = new Int8Array(MAX_FLAKES);
  private readonly fband = new Int8Array(MAX_FLAKES);

  // clumps
  private cn = 0;
  private readonly cx = new Float32Array(MAX_CLUMPS);
  private readonly cy = new Float32Array(MAX_CLUMPS);
  private readonly cvx = new Float32Array(MAX_CLUMPS);
  private readonly cvy = new Float32Array(MAX_CLUMPS);
  private readonly cr = new Float32Array(MAX_CLUMPS);
  private readonly cage = new Float32Array(MAX_CLUMPS);
  private readonly cax = new Float32Array(MAX_CLUMPS);
  private readonly cay = new Float32Array(MAX_CLUMPS);

  private time = 0;
  private acc = 0;
  private ramp = 0;
  private pause = 0;
  private full = false;
  private snowTime = 0;
  private checkTimer = 0;
  private armed = false;
  private clumpsShown = false;
  private stampId = 0;
  private readonly stamp: Int32Array;
  private readonly queue: Int32Array;
  private readonly u: number;
  private readonly v0: number;
  private readonly rate: number;

  constructor(shape: ShapeMap, layout: SnowLayout) {
    this.layout = layout;
    const { gw, gh, k, s, cell } = layout;
    const cells = gw * gh;
    this.cells = cells;
    this.bands = shape.maxLevel + 1;
    this.d = new Float32Array(cells);
    this.pend = new Float32Array(cells);
    this.owner = new Int8Array(cells).fill(-1);
    this.inPend = new Uint8Array(cells);
    this.view = new Uint8Array(cells);
    this.clumpView = new Uint8Array(cells);
    this.stamp = new Int32Array(cells);
    this.queue = new Int32Array(Math.min(cells, 20000));
    this.instances = new Float32Array(MAX_FLAKES * 6);

    // Levels per cell, read at the middle of each cell.
    const mw = gw * k;
    const lev = new Int8Array(cells);
    const half = k >> 1;
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) lev[y * gw + x] = shape.level[(y * k + half) * mw + x * k + half];
    this.lev = lev;

    // Gaps between shapes of one level, over the level behind them, catch snow: the cells a closing of those shapes fills
    // in (grown by half the widest gap, then shrunk back), so the joins where gaps meet count too.
    const reach = Math.max(1, Math.round((GROOVE * CELLS) / 2));
    const groove = new Uint8Array(cells);
    for (let b = 1; b < this.bands; b++) {
      const wall = new Uint8Array(cells);
      for (let c = 0; c < cells; c++) wall[c] = lev[c] >= b ? 1 : 0;
      const closed = morph(morph(wall, gw, gh, reach, 1), gw, gh, reach, 0);
      for (let c = 0; c < cells; c++) if (!wall[c] && closed[c] && lev[c] === b - 1) groove[c] = b + 1;
    }
    this.groove = groove;

    // Top edges of each level, joined into runs that can carry a cap; caps round off towards a run's ends.
    this.runOf = [];
    this.hmax = [];
    for (let b = 0; b < this.bands; b++) {
      const runOf = new Int32Array(cells).fill(-1);
      const hmax = new Float32Array(cells);
      const cap = ((b === 0 ? CAP_BASE : CAP_RAISED) * s) / cell;
      const isLedge = (c: number) => lev[c] >= b && (c < gw || lev[c - gw] < b);
      const stack: number[] = [];
      for (let c0 = 0; c0 < cells; c0++) {
        if (runOf[c0] >= 0 || !isLedge(c0)) continue;
        const id = this.runs.length;
        const members: number[] = [];
        const run: Run = { x0: Infinity, y0: 0, x1: -Infinity, y1: 0, shed0: 0, shed1: 0 };
        runOf[c0] = id;
        stack.push(c0);
        while (stack.length) {
          const c = stack.pop() as number;
          members.push(c);
          const x = c % gw;
          const y = (c - x) / gw;
          if (x < run.x0 || (x === run.x0 && y > run.y0)) {
            run.x0 = x;
            run.y0 = y;
          }
          if (x > run.x1 || (x === run.x1 && y > run.y1)) {
            run.x1 = x;
            run.y1 = y;
          }
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if ((!dx && !dy) || nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
              const nc = ny * gw + nx;
              if (runOf[nc] < 0 && isLedge(nc)) {
                runOf[nc] = id;
                stack.push(nc);
              }
            }
          }
        }
        for (const c of members) {
          const x = c % gw;
          const dx = Math.min(x - run.x0, run.x1 - x);
          hmax[c] = cap * Math.sqrt(Math.min(1, (dx + 0.6) / (cap * 1.15)));
        }
        this.runs.push(run);
      }
      this.runOf.push(runOf);
      this.hmax.push(hmax);
    }

    // The frontmost shapes hide the snow; their cells next to snow borrow its value so it meets them cleanly.
    const front = this.bands - 1;
    const edges: number[] = [];
    const nbrs: number[] = [];
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const c = y * gw + x;
        if (lev[c] !== front) continue;
        const list = [x > 0 ? c - 1 : -1, x < gw - 1 ? c + 1 : -1, y > 0 ? c - gw : -1, y < gh - 1 ? c + gw : -1].map((nc) => (nc >= 0 && lev[nc] < front ? nc : -1));
        if (list.every((nc) => nc < 0)) continue;
        edges.push(c);
        nbrs.push(...list);
      }
    }
    this.edgeCells = Int32Array.from(edges);
    this.edgeNbrs = Int32Array.from(nbrs);

    this.mask = this.buildMask(shape);
    this.capacity = Math.max(1, this.fillStatic(false));

    this.u = clamp(s / CELLS, 1.05, 5);
    this.v0 = clamp(SPEED * s, 46, 190);
    // One flake in the air for about every 420 square pixels of sky, so a small logo gets a light fall, not a blizzard.
    const count = clamp((layout.cw * layout.ch) / 420, 10, 320);
    this.rate = count / (layout.ch / this.v0);
  }

  private buildMask(shape: ShapeMap) {
    const { gw, gh, k } = this.layout;
    const w = gw * k;
    const h = gh * k;
    const L = shape.level;
    const front = this.bands - 1;
    const out = new Uint8Array(w * h * 4);
    const shade = new Float32Array(w * h);
    const radius = Math.max(1, Math.round(k * 1.3));
    for (let m = -1; m < front; m++) {
      let any = false;
      const src = new Float32Array(w * h);
      for (let i = 0; i < src.length; i++) {
        if (L[i] > m) src[i] = 1;
        if (L[i] === m) any = true;
      }
      if (!any) continue;
      const blurred = boxBlur(boxBlur(src, w, h, radius), w, h, radius);
      for (let i = 0; i < src.length; i++) if (L[i] === m) shade[i] = blurred[i];
    }
    for (let i = 0, p = 0; i < L.length; i++, p += 4) {
      const l = L[i];
      out[p] = l < front ? 255 : 0;
      out[p + 1] = l < front ? Math.round(clamp(shade[i] * 1.6, 0, 1) * 255) : 0;
      out[p + 2] = l >= 0 ? 255 : 0;
      out[p + 3] = 255;
    }
    return out;
  }

  /** Dress the shape fully at once (reduced motion), or just count how many cells that takes. */
  fillStatic(apply: boolean) {
    const { gw } = this.layout;
    const t = new Float32Array(this.cells);
    const own = new Int8Array(this.cells).fill(-1);
    for (let c = 0; c < this.cells; c++) {
      const g = this.groove[c];
      if (g) {
        t[c] = 1;
        own[c] = g - 1;
      }
    }
    for (let b = 0; b < this.bands; b++) {
      const runOf = this.runOf[b];
      const hmax = this.hmax[b];
      for (let c = 0; c < this.cells; c++) {
        if (runOf[c] < 0) continue;
        const h = hmax[c];
        for (let r = 1; r <= Math.ceil(h); r++) {
          const cc = c - r * gw;
          if (cc < 0 || this.lev[cc] >= b) break;
          t[cc] = Math.max(t[cc], clamp(h - r + 1, 0, 1));
          if (own[cc] < 0) own[cc] = b;
        }
      }
    }
    let count = 0;
    for (let c = 0; c < this.cells; c++) if (t[c] >= 0.5) count++;
    if (apply) {
      this.d.set(t);
      this.owner.set(own);
      this.n = 0;
      this.cn = 0;
      this.full = true;
      this.viewDirty = true;
      this.buildView();
    }
    return count;
  }

  /* ── Cells ── */

  private filled(c: number, band: number) {
    return this.owner[c] === band && this.d[c] + this.pend[c] >= 0.5;
  }

  private blocked(c: number, band: number) {
    return this.lev[c] >= band || this.filled(c, band);
  }

  private supported(c: number, band: number, inGroove: boolean) {
    const below = c + this.layout.gw;
    if (below >= this.cells) return true;
    if (this.lev[below] >= band || this.filled(below, band)) return true;
    return inGroove && this.groove[below] !== band + 1;
  }

  private addPend(c: number, amount: number, band: number) {
    this.pend[c] += amount;
    this.owner[c] = band;
    if (!this.inPend[c]) {
      this.inPend[c] = 1;
      this.pendList.push(c);
    }
  }

  /** Height of the snow column standing on a ledge if this cell were filled, or -1 when the cell is not over one. */
  private capHeight(c: number, band: number) {
    const { gw } = this.layout;
    const limit = Math.ceil(((CAP_BASE * this.layout.s) / this.layout.cell) * 1.2) + 3;
    let rows = 1;
    let cc = c + gw;
    while (cc < this.cells && rows <= limit) {
      if (this.lev[cc] >= band) return this.runOf[band][cc] >= 0 && rows <= this.hmax[band][cc] + 0.5 ? rows : -1;
      if (!this.filled(cc, band)) return -1;
      rows++;
      cc += gw;
    }
    return -1;
  }

  /** Spread a grain's snow along one row from where it landed; returns what did not fit. */
  private spreadRow(x0: number, row: number, mass: number, band: number, inGroove: boolean, reach: number) {
    const { gw } = this.layout;
    const base = row * gw;
    const ok = (x: number) => {
      if (x < 0 || x >= gw) return false;
      const c = base + x;
      if (this.lev[c] >= band) return false;
      if (inGroove ? this.groove[c] !== band + 1 : this.capHeight(c, band) < 0) return false;
      if (this.owner[c] >= 0 && this.owner[c] !== band && this.d[c] + this.pend[c] > 0.05) return false;
      return this.supported(c, band, inGroove);
    };
    if (!ok(x0)) return mass;
    let left = x0;
    let right = x0;
    const take = (x: number) => {
      const c = base + x;
      const room = 1 - this.d[c] - this.pend[c];
      if (room <= 0.001) return;
      const t = Math.min(room, mass);
      this.addPend(c, t, band);
      mass -= t;
    };
    take(x0);
    for (let i = 1; i <= reach && mass > 0.001; i++) {
      const goLeft = left === x0 - i + 1 && ok(x0 - i);
      const goRight = right === x0 + i - 1 && ok(x0 + i);
      if (!goLeft && !goRight) break;
      if (goLeft) {
        left = x0 - i;
        take(left);
      }
      if (goRight && mass > 0.001) {
        right = x0 + i;
        take(right);
      }
    }
    return mass;
  }

  private deposit(gx: number, gy: number, band: number, mass: number) {
    const { gw } = this.layout;
    this.armed = true;
    if (this.groove[gy * gw + gx] === band + 1) {
      this.pour(gx, gy, band, mass * MASS_GROOVE);
      return;
    }
    let left = mass * MASS_CAP;
    for (let row = gy; row >= 0 && row > gy - 4 && left > 0.001; row--) left = this.spreadRow(gx, row, left, band, false, 1);
  }

  /** Snow in a gap settles like a liquid: into the lowest open cells it can reach, so the level rises evenly. */
  private pour(gx: number, gy: number, band: number, mass: number) {
    const { gw, gh } = this.layout;
    const tag = band + 1;
    const span = Math.round(GROOVE * CELLS) * 4;
    const stamp = ++this.stampId;
    const queue = this.queue;
    const room = (c: number) => 1 - this.d[c] - this.pend[c];
    let head = 0;
    let tail = 0;
    const start = gy * gw + gx;
    queue[tail++] = start;
    this.stamp[start] = stamp;
    while (head < tail && tail < queue.length - 4) {
      const c = queue[head++];
      const x = c % gw;
      const y = (c - x) / gw;
      const next = [x > 0 ? c - 1 : -1, x < gw - 1 ? c + 1 : -1, y < gh - 1 ? c + gw : -1, y > gy ? c - gw : -1];
      for (const n of next) {
        if (n < 0 || this.stamp[n] === stamp) continue;
        const nx = n % gw;
        if (Math.abs(nx - gx) > span || this.groove[n] !== tag || this.lev[n] >= band || room(n) <= 0.02) continue;
        this.stamp[n] = stamp;
        queue[tail++] = n;
      }
    }
    // Lowest first, counting cells further from where the grain fell as a little higher, so the snow mounds slightly
    // where it lands instead of lying dead flat. The mound stays under one row, so a row always fills before the one
    // above it and no pocket is left under an overhang (the bar of an H).
    const found = Array.from(queue.subarray(0, tail));
    const level = (c: number) => ((c / gw) | 0) - Math.min(0.85, Math.abs((c % gw) - gx) * 0.3);
    found.sort((a, b) => level(b) - level(a));
    for (const c of found) {
      const r = room(c);
      if (r <= 0.001) continue;
      const t = Math.min(r, mass);
      this.addPend(c, t, band);
      mass -= t;
      if (mass <= 0.001) break;
    }
  }

  /* ── Flakes ── */

  private addFlake(kind: number, x: number, y: number, band: number) {
    if (this.n >= MAX_FLAKES) return -1;
    const i = this.n++;
    const { u, v0 } = this;
    const s = this.layout.s;
    this.fkind[i] = kind;
    this.fband[i] = band;
    this.fx[i] = x;
    this.fy[i] = y;
    this.fvx[i] = 0;
    this.fph[i] = Math.random() * Math.PI * 2;
    this.ffreq[i] = Math.PI * 2 * (0.22 + Math.random() * 0.32);
    this.fmass[i] = 1;
    if (kind === BACK) {
      this.fr[i] = Math.max(0.7, u * (0.5 + Math.random() * 0.32));
      this.fterm[i] = v0 * (0.52 + Math.random() * 0.14);
      this.fa[i] = 0.42 + Math.random() * 0.2;
      this.fsoft[i] = 0.25;
      this.famp[i] = s * 0.02 * (0.5 + Math.random());
    } else if (kind === FRONT) {
      this.fr[i] = u * (2.5 + Math.random() * 1.9);
      this.fterm[i] = v0 * (1.45 + Math.random() * 0.35);
      this.fa[i] = 0.32 + Math.random() * 0.2;
      this.fsoft[i] = 1;
      this.famp[i] = s * 0.05 * (0.5 + Math.random());
    } else {
      this.fr[i] = Math.max(0.9, u * (0.85 + Math.random() * 0.65));
      this.fterm[i] = v0 * (0.86 + Math.random() * 0.3);
      this.fa[i] = 0.92;
      this.fsoft[i] = 0.12;
      this.famp[i] = s * 0.035 * (0.4 + Math.random());
    }
    this.fvy[i] = this.fterm[i];
    return i;
  }

  private spawn(y: number) {
    const roll = Math.random();
    const x = Math.random() * this.layout.cw;
    if (roll < 0.22) return this.addFlake(BACK, x, y, -1);
    if (roll < 0.3) return this.addFlake(FRONT, x, y, -1);
    // Raised shapes catch more: weight each band by how far forward it stands.
    let total = 0;
    for (let b = 0; b < this.bands; b++) total += b === 0 ? 1.2 : 2.4;
    let pick = Math.random() * total;
    let band = 0;
    for (let b = 0; b < this.bands; b++) {
      pick -= b === 0 ? 1.2 : 2.4;
      if (pick <= 0) {
        band = b;
        break;
      }
    }
    return this.addFlake(MID, x, y, band);
  }

  /** Fill the sky above the element so the first flakes land almost at once. */
  prewarm() {
    const top = this.layout.box.y * 0.95;
    const count = Math.round(this.rate * (top / this.v0) * this.intensity);
    for (let i = 0; i < count; i++) this.spawn(Math.random() * top);
    this.ramp = 1;
  }

  private removeFlake(i: number) {
    const last = --this.n;
    if (i === last) return;
    this.fx[i] = this.fx[last];
    this.fy[i] = this.fy[last];
    this.fvx[i] = this.fvx[last];
    this.fvy[i] = this.fvy[last];
    this.fterm[i] = this.fterm[last];
    this.fr[i] = this.fr[last];
    this.fa[i] = this.fa[last];
    this.fsoft[i] = this.fsoft[last];
    this.fph[i] = this.fph[last];
    this.ffreq[i] = this.ffreq[last];
    this.famp[i] = this.famp[last];
    this.fmass[i] = this.fmass[last];
    this.fkind[i] = this.fkind[last];
    this.fband[i] = this.fband[last];
  }

  private shed(runId: number, gx: number, band: number, mass: number) {
    const run = this.runs[runId];
    let side = gx - run.x0 < run.x1 - gx ? 0 : 1;
    if (Math.random() < 0.25) side = 1 - side;
    if (side === 0) run.shed0 += mass;
    else run.shed1 += mass;
    const stock = side === 0 ? run.shed0 : run.shed1;
    if (stock < 2) return;
    if (side === 0) run.shed0 = 0;
    else run.shed1 = 0;
    const { gw, cell } = this.layout;
    const ex = side === 0 ? run.x0 - 1 : run.x1 + 1;
    const ey = side === 0 ? run.y0 : run.y1;
    const top = ey - Math.ceil(this.hmax[band][ey * gw + (side === 0 ? run.x0 : run.x1)]) - 1;
    if (ex < 0 || ex >= gw || top < 0 || this.lev[top * gw + ex] >= band) return;
    const i = this.addFlake(MID, (ex + 0.5) * cell, (top + 0.5) * cell, band);
    if (i < 0) return;
    this.fmass[i] = stock;
    this.fr[i] *= 1.35;
    this.fvy[i] = this.fterm[i] * 0.3;
    this.fvx[i] = (side === 0 ? -1 : 1) * this.v0 * 0.18;
  }

  /** A grain that rolled off an edge falls on from there. */
  private drop(gx: number, gy: number, band: number, mass: number) {
    const { cell } = this.layout;
    const i = this.addFlake(MID, (gx + 0.5) * cell, (gy + 0.5) * cell, band);
    if (i < 0) return;
    this.fmass[i] = mass;
    this.fvy[i] = this.fterm[i] * 0.25;
    this.famp[i] *= 0.3;
  }

  /** Where a grain comes to rest on a cap or in a gap. */
  private land(i: number, gx: number, gy: number) {
    const { gw } = this.layout;
    const band = this.fband[i];
    let y = gy;
    while (y >= 0 && this.blocked(y * gw + gx, band)) y--;
    if (y < 0) return;
    if (this.groove[y * gw + gx] === band + 1) {
      this.deposit(gx, y, band, this.fmass[i]);
      return;
    }
    // On a cap the grain rolls down whichever side is lower, and off an edge it drops on as a flake.
    for (let step = 0; step < 12 && Math.random() > 0.12; step++) {
      const first = Math.random() < 0.5 ? -1 : 1;
      let moved = false;
      for (const dir of [first, -first]) {
        const nx = gx + dir;
        const ny = y + 1;
        if (nx < 0 || nx >= gw || ny >= this.layout.gh) continue;
        const side = y * gw + nx;
        const down = ny * gw + nx;
        if (this.blocked(side, band) || this.blocked(down, band)) continue;
        if (this.groove[down] === band + 1 || !this.supported(down, band, false)) {
          this.drop(nx, ny, band, this.fmass[i]);
          return;
        }
        gx = nx;
        y = ny;
        moved = true;
        break;
      }
      if (!moved) break;
    }
    const c = y * gw + gx;
    // Find the ledge under the snow.
    let cc = c + gw;
    let rows = 1;
    const limit = Math.ceil(((CAP_BASE * this.layout.s) / this.layout.cell) * 1.2) + 3;
    while (cc < this.cells && rows <= limit && this.lev[cc] < band) {
      if (!this.filled(cc, band)) return;
      cc += gw;
      rows++;
    }
    if (cc >= this.cells || this.lev[cc] < band) return;
    const runId = this.runOf[band][cc];
    if (runId < 0) return;
    if (rows <= this.hmax[band][cc] + 0.5) this.deposit(gx, y, band, this.fmass[i]);
    else this.shed(runId, gx, band, this.fmass[i]);
  }

  private stepFlakes(dt: number) {
    const { gw, gh, cell, cw, ch } = this.layout;
    const wind = this.v0 * (0.06 * Math.sin(this.time * 0.21) + 0.035 * Math.sin(this.time * 0.67 + 1.3));
    const relax = Math.min(1, 2.6 * dt);
    for (let i = this.n - 1; i >= 0; i--) {
      const kind = this.fkind[i];
      const ph = this.fph[i] + this.ffreq[i] * dt;
      this.fph[i] = ph;
      this.fvy[i] += (this.fterm[i] - this.fvy[i]) * relax;
      this.fvx[i] *= 1 - relax;
      const depth = kind === BACK ? 0.55 : kind === FRONT ? 1.5 : 1;
      const vx = wind * depth + this.famp[i] * this.ffreq[i] * Math.cos(ph) + this.fvx[i];
      const x = this.fx[i];
      const y = this.fy[i];
      let nx = x + vx * dt;
      const ny = y + this.fvy[i] * dt;
      if (kind === MID) {
        const band = this.fband[i];
        const cgx = Math.floor(x / cell);
        const cgy = Math.floor(y / cell);
        const ngx = Math.floor(nx / cell);
        const ngy = Math.floor(ny / cell);
        if (cgy >= 0 && cgy < gh && ngx >= 0 && ngx < gw && ngx !== cgx && this.blocked(cgy * gw + ngx, band)) nx = x;
        const gx = Math.floor(nx / cell);
        if (ngy >= 0 && ngy < gh && gx >= 0 && gx < gw) {
          const c = ngy * gw + gx;
          if (this.blocked(c, band)) {
            this.land(i, gx, Math.max(0, cgy));
            this.removeFlake(i);
            continue;
          }
          if (this.groove[c] === band + 1 && this.supported(c, band, true)) {
            this.land(i, gx, ngy);
            this.removeFlake(i);
            continue;
          }
        }
      }
      const r = this.fr[i];
      if (ny - r > ch || nx < -r * 4 || nx > cw + r * 4) {
        this.removeFlake(i);
        continue;
      }
      this.fx[i] = nx;
      this.fy[i] = ny;
    }
  }

  /* ── Clumps ── */

  /** Knock the snow off: it breaks into clumps that pop up with the element and fall away. */
  shake(power = 1) {
    const { gw, gh, cell, s, box } = this.layout;
    const mid = box.x + box.w / 2;
    // Clumps of about three cells across, so the snow breaks into pieces rather than dust.
    for (let y = 0; y < gh - 2; y += 3) {
      for (let x = 0; x < gw - 2; x += 3) {
        let m = 0;
        for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 3; dx++) m += this.d[(y + dy) * gw + x + dx] + this.pend[(y + dy) * gw + x + dx];
        if (m < 1.1 || this.cn >= MAX_CLUMPS) continue;
        const j = this.cn++;
        const px = (x + 1.5) * cell;
        this.cx[j] = px;
        this.cy[j] = (y + 1.5) * cell;
        this.cr[j] = cell * Math.sqrt(m) * 0.82;
        this.cage[j] = 0;
        // The snow lifts as one piece with the element, then each clump drifts its own way as it falls.
        this.cvx[j] = ((Math.random() - 0.5) * 0.08 + ((px - mid) / s) * 0.22) * s * power;
        this.cvy[j] = -s * (0.44 + Math.random() * 0.05) * power;
        this.cax[j] = (Math.random() - 0.5) * 0.9 * s;
        this.cay[j] = (Math.random() - 0.3) * 0.9 * s;
      }
    }
    this.d.fill(0);
    this.pend.fill(0);
    this.owner.fill(-1);
    this.inPend.fill(0);
    this.pendList = [];
    for (const run of this.runs) run.shed0 = run.shed1 = 0;
    this.full = false;
    this.snowTime = 0;
    this.pause = 0.7;
    this.armed = true;
    this.viewDirty = true;
  }

  private stepClumps(dt: number) {
    if (!this.cn) {
      if (this.clumpsShown) {
        this.clumpsShown = false;
        this.viewDirty = true;
      }
      return;
    }
    this.clumpsShown = true;
    const g = GRAVITY * this.layout.s;
    const { ch } = this.layout;
    for (let j = this.cn - 1; j >= 0; j--) {
      const age = (this.cage[j] += dt);
      if (age < 0) continue;
      this.cvy[j] += g * dt;
      if (age > 0.18) {
        this.cvx[j] += this.cax[j] * dt;
        this.cvy[j] += this.cay[j] * dt;
      }
      this.cx[j] += this.cvx[j] * dt;
      this.cy[j] += this.cvy[j] * dt;
      // Powder breaks off as it falls.
      if (age > 0.08 && this.cr[j] > this.layout.cell * 1.6 && Math.random() < dt * 0.9) {
        const i = this.addFlake(FRONT, this.cx[j], this.cy[j], -1);
        if (i >= 0) {
          this.fr[i] = this.u * (0.7 + Math.random() * 0.8);
          this.fa[i] = 0.75;
          this.fsoft[i] = 0.5;
          this.fvy[i] = this.cvy[j] * 0.5;
          this.fvx[i] = this.cvx[j] * 0.6 + (Math.random() - 0.5) * this.v0 * 0.6;
          this.fterm[i] = this.v0 * (0.7 + Math.random() * 0.4);
        }
      }
      const r = this.cr[j] * Math.max(0.55, 1 - 0.35 * age);
      if (this.cy[j] - r > ch) {
        const last = --this.cn;
        this.cx[j] = this.cx[last];
        this.cy[j] = this.cy[last];
        this.cvx[j] = this.cvx[last];
        this.cvy[j] = this.cvy[last];
        this.cr[j] = this.cr[last];
        this.cage[j] = this.cage[last];
        this.cax[j] = this.cax[last];
        this.cay[j] = this.cay[last];
      }
    }
    this.viewDirty = true;
  }

  /* ── Frame ── */

  private flow(dt: number) {
    if (!this.pendList.length) return;
    const step = FLOW * dt;
    let w = 0;
    for (let i = 0; i < this.pendList.length; i++) {
      const c = this.pendList[i];
      const t = Math.min(this.pend[c], step);
      this.pend[c] -= t;
      this.d[c] = Math.min(1, this.d[c] + t);
      if (this.pend[c] > 1e-4) this.pendList[w++] = c;
      else {
        this.pend[c] = 0;
        this.inPend[c] = 0;
      }
    }
    this.pendList.length = w;
    this.viewDirty = true;
  }

  private checkFull(dt: number) {
    if (this.full || !this.snowing) return;
    this.snowTime += dt;
    this.checkTimer += dt;
    if (this.checkTimer < 0.4) return;
    this.checkTimer = 0;
    let count = 0;
    for (let c = 0; c < this.cells; c++) if (this.d[c] >= 0.5) count++;
    if (count >= this.capacity * FULL || this.snowTime > 40) this.full = true;
  }

  private buildView() {
    const v = this.view;
    const d = this.d;
    for (let c = 0; c < this.cells; c++) v[c] = d[c] >= 1 ? 255 : (d[c] * 255) | 0;
    const edges = this.edgeCells;
    const nb = this.edgeNbrs;
    for (let e = 0; e < edges.length; e++) {
      let m = 0;
      for (let j = e * 4; j < e * 4 + 4; j++) {
        const nc = nb[j];
        if (nc >= 0 && v[nc] > m) m = v[nc];
      }
      v[edges[e]] = m;
    }
    const cv = this.clumpView;
    cv.fill(0);
    if (this.cn) {
      const { gw, gh, cell } = this.layout;
      for (let j = 0; j < this.cn; j++) {
        if (this.cage[j] < 0) continue;
        const rc = (this.cr[j] * Math.max(0.55, 1 - 0.35 * this.cage[j])) / cell + 0.5;
        const px = this.cx[j] / cell - 0.5;
        const py = this.cy[j] / cell - 0.5;
        const x0 = Math.max(0, Math.floor(px - rc));
        const x1 = Math.min(gw - 1, Math.ceil(px + rc));
        const y0 = Math.max(0, Math.floor(py - rc));
        const y1 = Math.min(gh - 1, Math.ceil(py + rc));
        const r2 = rc * rc;
        for (let y = y0; y <= y1; y++) {
          for (let x = x0; x <= x1; x++) {
            const dd = ((x - px) * (x - px) + (y - py) * (y - py)) / r2;
            if (dd >= 1) continue;
            const val = Math.min(255, (1.3 * (1 - dd) * 255) | 0);
            const c = y * gw + x;
            if (val > cv[c]) cv[c] = val;
          }
        }
      }
    }
  }

  private writeInstances() {
    const out = this.instances;
    let p = 0;
    for (let i = 0; i < this.n; i++) {
      out[p++] = this.fx[i];
      out[p++] = this.fy[i];
      out[p++] = this.fr[i];
      out[p++] = this.fa[i];
      out[p++] = this.fsoft[i];
      out[p++] = this.fkind[i] === BACK ? 1 : 0;
    }
    this.instanceCount = this.n;
  }

  /** Advance by dt seconds. Returns whether anything is still moving or about to. */
  step(dt: number) {
    this.time += dt;
    const target = this.pause > 0 || !this.snowing ? 0 : this.full ? (this.keepFalling ? 0.35 : 0) : 1;
    this.pause = Math.max(0, this.pause - dt);
    this.ramp += (target - this.ramp) * Math.min(1, (target > this.ramp ? 1.6 : 0.7) * dt);
    if (target === 0 && this.ramp < 0.02) this.ramp = 0;
    this.acc += this.rate * this.intensity * this.ramp * dt;
    while (this.acc >= 1) {
      this.acc -= 1;
      this.spawn(-this.u * 6);
    }
    this.stepFlakes(dt);
    this.stepClumps(dt);
    this.flow(dt);
    this.checkFull(dt);
    if (this.viewDirty) {
      this.buildView();
    }
    this.writeInstances();
    return this.moving();
  }

  moving() {
    return this.n > 0 || this.cn > 0 || this.pendList.length > 0 || this.ramp > 0 || this.pause > 0 || (this.snowing && (!this.full || this.keepFalling));
  }

  /** True once after a snowfall has finished and everything is still. */
  takeSettled() {
    if (!this.armed || this.moving()) return false;
    this.armed = false;
    return true;
  }
}
