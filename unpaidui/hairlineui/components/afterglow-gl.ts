// Hairline UI · afterglow · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

/* ─────────────────────────────────────────────────────────
 * AFTERGLOW renderer (WebGL 2)
 *
 * One full-screen triangle; everything is worked out per pixel
 * from the time and the distance to the centre of the wave:
 *
 *   front    a thin white-hot line, warm light running ahead
 *            of it with a rose fringe, clear blue behind
 *   wake     the air it passed through keeps a little light,
 *            and fine dust twinkles in it, then both fade
 *   rim      the edge of the element lights up as the front
 *            reaches it and holds an iridescent glow a moment
 *
 * Each pixel knows when the front passed it (the reach curve
 * inverted), so the wake and the rim fade in the order the
 * light went through, and the far corner glows last.
 *
 * Dark surfaces add the light (the canvas is screened over the
 * element); light surfaces get it as colour, since white light
 * on white has nothing to show.
 * ───────────────────────────────────────────────────────── */

export type RGB = readonly [number, number, number];

export interface GlowFrame {
  /** Element size in CSS px. */
  width: number;
  height: number;
  /** Canvas size in device px. */
  pixelWidth: number;
  pixelHeight: number;
  /** Corner radius in CSS px. */
  radius: number;
  /** Centre of the wave and its radius at the start and the end, CSS px. */
  cx: number;
  cy: number;
  r0: number;
  rmax: number;
  /** Width of the band of light, CSS px. */
  band: number;
  /** ms since the start, how long the front takes, how long it all takes. */
  time: number;
  front: number;
  total: number;
  light: boolean;
  warm: RGB;
  mid: RGB;
  cool: RGB;
  seed: number;
}

export interface AfterglowRenderer {
  draw(frame: GlowFrame): void;
  clear(): void;
  lost(): boolean;
  dispose(): void;
}

const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uSize;
uniform vec2 uPix;
uniform float uRadius;
uniform vec2 uCenter;
uniform float uR0;
uniform float uRmax;
uniform float uBand;
uniform float uTime;
uniform float uFront;
uniform float uTotal;
uniform float uLight;
uniform float uSeed;
uniform vec3 uWarm;
uniform vec3 uMid;
uniform vec3 uCool;
out vec4 o;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i + uSeed);
  float b = hash(i + vec2(1.0, 0.0) + uSeed);
  float c = hash(i + vec2(0.0, 1.0) + uSeed);
  float d = hash(i + vec2(1.0, 1.0) + uSeed);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float sdBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

// How far the front has got (0 to 1) after a share k of its time: fast out, long slow tail.
float reach(float k) {
  float c = clamp(k, 0.0, 1.0);
  return 1.0 - (1.0 - c) * (1.0 - c) * (1.0 - c);
}

// When the front got to distance d, in ms (reach inverted).
float passedAt(float d) {
  float k = clamp((d - uR0) / max(uRmax - uR0, 1.0), 0.0, 1.0);
  return (1.0 - pow(1.0 - k, 1.0 / 3.0)) * uFront;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uPix.y - gl_FragCoord.y) * (uSize / uPix);
  vec2 rel = p - uCenter;
  float d = length(rel);
  vec2 dir = rel / max(d, 0.001);
  float t = uTime;
  float u = t / uFront;

  // The front, with a slow wobble along it so it's never a drawn circle.
  float R = uR0 + (uRmax - uR0) * reach(u);
  // The wobble grows with the ring, so a small ring near its start stays round.
  float wob = (vnoise(dir * 2.2 + vec2(t * 0.0005, 3.1)) - 0.5) * min(uBand * 0.34, R * 0.14 + 1.0);
  float s = R + wob - d;
  float x = s / uBand;
  float env = smoothstep(0.0, 0.06, u) * (1.0 - smoothstep(0.42, 1.0, u));
  float rays = 0.78 + 0.44 * vnoise(dir * 9.0 + vec2(1.7, t * 0.0008));

  // Ahead: gold close to the front, a faint rose fringe further out.
  float ahead = x < 0.0 ? exp(x / 0.24) : 0.0;
  float fringe = x < 0.0 ? exp(-pow((x + 0.42) / 0.22, 2.0)) : 0.0;
  // The front: a thin white-hot line.
  float core = exp(-pow(s / (uBand * 0.022 + 0.9), 2.0));
  // Behind: a narrow band of clear sky, then dark.
  float sky = x > 0.0 ? exp(-pow((x - 0.12) / 0.13, 2.0)) : 0.0;
  float dusk = x > 0.0 ? exp(-pow((x - 0.45) / 0.35, 2.0)) : 0.0;

  bool light = uLight > 0.5;
  vec3 hot = light ? mix(uWarm, uMid, 0.4) : vec3(1.0, 0.97, 0.92);
  vec3 col = (uWarm * ahead * 0.95 + uMid * fringe * 0.22) * rays
    + hot * core * 1.15
    + (uCool * sky * 0.8 + uCool * dusk * 0.1) * mix(1.0, rays, 0.5);
  col *= env;

  // The wake: what the light passed through holds a little of it.
  float age = t - passedAt(d - wob);
  float behind = step(0.0, s);
  float haze = behind * exp(-max(age, 0.0) / 320.0);
  col += mix(uCool, uMid, 0.3) * haze * 0.06;

  // Dust in the wake, sparse and uneven, twinkling, brightest close behind the front.
  float cell = 6.0;
  vec2 c = floor(p / cell);
  vec2 sp = (c + 0.2 + 0.6 * vec2(hash(c + 11.3), hash(c + 27.9))) * cell;
  float rad = 0.28 + 0.5 * pow(hash(c + 3.7), 2.0);
  float star = step(0.83, hash(c * 1.37 + 4.1)) * (1.0 - smoothstep(rad * 0.4, rad + 0.5, length(p - sp))) * (0.35 + 0.65 * hash(c + 6.4));
  float tw = 0.45 + 0.55 * sin(t * (0.006 + 0.01 * hash(c + 8.8)) + 6.2832 * hash(c + 1.1));
  float dust = behind * exp(-max(age, 0.0) / 560.0) * smoothstep(0.0, 0.05, x) * (0.4 + sky * 0.8 + dusk * 0.5);
  vec3 dustCol = light ? mix(uCool, uMid, step(0.5, hash(c + 5.5))) : vec3(1.0);
  col += dustCol * star * tw * dust;

  // The rim lights as the front reaches it and keeps an iridescent glow for a moment.
  vec2 hs = uSize * 0.5;
  float e = max(-sdBox(p - hs, hs, uRadius), 0.0);
  float lit = smoothstep(-0.6, 0.0, x) * exp(-max(age, 0.0) / 820.0);
  float h = 0.5 + 0.5 * sin(atan(p.y - hs.y, p.x - hs.x) + t * 0.0016);
  vec3 rimCol = h < 0.5 ? mix(uWarm, uMid, h * 2.0) : mix(uMid, uCool, h * 2.0 - 1.0);
  col += rimCol * (exp(-e / 1.1) * 0.85 + exp(-e / 16.0) * 0.22) * lit;

  col *= 1.0 - smoothstep(uTotal - 520.0, uTotal, t);
  col = max(col, 0.0);
  float peak = max(col.r, max(col.g, col.b));
  if (light) {
    float a = clamp(peak, 0.0, 1.0) * 0.74;
    o = vec4(peak > 0.0001 ? col / peak * a : vec3(0.0), a);
  } else {
    col = col / (1.0 + col * 0.3);
    o = vec4(min(col, 1.0), clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0));
  }
}`;

const UNIFORMS = ["uSize", "uPix", "uRadius", "uCenter", "uR0", "uRmax", "uBand", "uTime", "uFront", "uTotal", "uLight", "uSeed", "uWarm", "uMid", "uCool"] as const;
type UniformName = (typeof UNIFORMS)[number];

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** A renderer on this canvas, or null where WebGL 2 isn't available (the element still blurs and glints). */
export function createAfterglowRenderer(canvas: HTMLCanvasElement): AfterglowRenderer | null {
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false });
  if (!gl) return null;
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const loc = Object.fromEntries(UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<UniformName, WebGLUniformLocation | null>;

  return {
    draw(f) {
      if (gl.isContextLost()) return;
      gl.viewport(0, 0, f.pixelWidth, f.pixelHeight);
      gl.useProgram(program);
      gl.uniform2f(loc.uSize, f.width, f.height);
      gl.uniform2f(loc.uPix, f.pixelWidth, f.pixelHeight);
      gl.uniform1f(loc.uRadius, f.radius);
      gl.uniform2f(loc.uCenter, f.cx, f.cy);
      gl.uniform1f(loc.uR0, f.r0);
      gl.uniform1f(loc.uRmax, f.rmax);
      gl.uniform1f(loc.uBand, f.band);
      gl.uniform1f(loc.uTime, f.time);
      gl.uniform1f(loc.uFront, f.front);
      gl.uniform1f(loc.uTotal, f.total);
      gl.uniform1f(loc.uLight, f.light ? 1 : 0);
      gl.uniform1f(loc.uSeed, f.seed);
      gl.uniform3f(loc.uWarm, f.warm[0], f.warm[1], f.warm[2]);
      gl.uniform3f(loc.uMid, f.mid[0], f.mid[1], f.mid[2]);
      gl.uniform3f(loc.uCool, f.cool[0], f.cool[1], f.cool[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    clear() {
      if (gl.isContextLost()) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
    lost: () => gl.isContextLost(),
    dispose() {
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
