// Hairline UI · snowfall · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

/* ─────────────────────────────────────────────────────────
 * SNOWFALL renderer (WebGL 2)
 *
 *   snow     the settled snow is a coarse field of cells drawn
 *            smooth (a cubic B-spline through the cells, cut at
 *            half), clipped by a fine mask of the shape so it
 *            meets every edge cleanly; lit from above, shaded
 *            where it faces down and where it packs against a
 *            wall, with a fine grain and a few slow glints
 *   flakes   one quad per flake: small crisp ones, large soft
 *            ones close to the eye, far ones hidden by the logo
 *
 * On light pages the snow and flakes get a cool rim, since
 * white on white has no edge of its own.
 * ───────────────────────────────────────────────────────── */

export interface SnowFrame {
  /** Settled snow cells, one byte each, or null when unchanged. */
  view: Uint8Array | null;
  /** Snow in the air after a shake, same grid; uploaded with view. */
  clumps: Uint8Array | null;
  instances: Float32Array;
  count: number;
  /** Canvas size in CSS px. */
  width: number;
  height: number;
  dpr: number;
  light: boolean;
  time: number;
}

export interface SnowRenderer {
  setMask(data: Uint8Array, width: number, height: number): void;
  setGrid(width: number, height: number): void;
  draw(frame: SnowFrame): void;
  dispose(): void;
}

const VERT_FIELD = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG_FIELD = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uD;
uniform sampler2D uC;
uniform sampler2D uM;
uniform vec2 uGrid;
uniform float uLight;
uniform float uTime;
uniform float uDpr;
out vec4 o;

const float TH = 0.42;

vec4 cubicW(float v) {
  vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;
  vec4 s = n * n * n;
  float x = s.x;
  float y = s.y - 4.0 * s.x;
  float z = s.z - 4.0 * s.y + 6.0 * s.x;
  float w = 6.0 - x - y - z;
  return vec4(x, y, z, w) * (1.0 / 6.0);
}

float field(sampler2D tex, vec2 uv) {
  vec2 inv = 1.0 / uGrid;
  vec2 tc = uv * uGrid - 0.5;
  vec2 f = fract(tc);
  tc -= f;
  vec4 xc = cubicW(f.x);
  vec4 yc = cubicW(f.y);
  vec4 c = tc.xxyy + vec2(-0.5, 1.5).xyxy;
  vec4 s = vec4(xc.xz + xc.yw, yc.xz + yc.yw);
  vec4 off = (c + vec4(xc.yw, yc.yw) / s) * inv.xxyy;
  float s0 = texture(tex, off.xz).r;
  float s1 = texture(tex, off.yz).r;
  float s2 = texture(tex, off.xw).r;
  float s3 = texture(tex, off.yw).r;
  float sx = s.x / (s.x + s.y);
  float sy = s.z / (s.z + s.w);
  return mix(mix(s3, s2, sx), mix(s1, s0, sx), sy);
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec4 m = texture(uM, vUv);
  float allowed = smoothstep(0.3, 0.7, m.r);
  float ds = field(uD, vUv);
  float dc = field(uC, vUv);
  float aas = max(fwidth(ds) * 0.85, 0.002);
  float aac = max(fwidth(dc) * 0.85, 0.002);
  float as_ = smoothstep(TH - aas, TH + aas, ds) * allowed;
  float ac = smoothstep(TH - aac, TH + aac, dc);
  bool air = ac > as_;
  float d = air ? dc : ds;
  float aa = air ? aac : aas;
  float a = max(as_, ac);
  if (a < 0.002) { o = vec4(0.0); return; }
  vec2 g = vec2(dFdx(d), dFdy(d));
  float gl = length(g);
  vec2 nrm = gl > 1e-6 ? -g / gl : vec2(0.0, 1.0);
  float edge = 1.0 - smoothstep(TH, TH + 0.3, d);
  float up = clamp(nrm.y, 0.0, 1.0);
  float down = clamp(-nrm.y, 0.0, 1.0);
  vec3 body = vec3(0.93, 0.952, 0.988);
  vec3 cool = vec3(0.64, 0.72, 0.87);
  vec3 col = body;
  col = mix(col, vec3(1.0), edge * up * 0.9);
  col = mix(col, cool, edge * down * 0.5);
  col = mix(col, cool, smoothstep(0.12, 0.9, m.g) * 0.4 * (air ? 0.0 : 1.0));
  vec2 fc = gl_FragCoord.xy;
  col *= 0.982 + 0.036 * hash(floor(fc / (1.2 * uDpr)));
  float h = hash(floor(fc / (1.7 * uDpr)) + 31.7);
  float glint = step(0.9955, h) * (0.5 + 0.5 * sin(uTime * 1.6 + h * 91.0));
  col = mix(col, vec3(1.0), glint * (1.0 - down * edge));
  float rim = (1.0 - smoothstep(TH + aa, TH + aa + 0.1, d)) * uLight;
  col = mix(col, cool * 0.9, rim * 0.55);
  o = vec4(col * a, a);
}`;

const VERT_FLAKE = `#version 300 es
in vec2 aCorner;
in vec4 aA;
in vec2 aB;
uniform vec2 uView;
uniform vec3 uFade;
out vec2 vLocal;
out float vR;
out float vAlpha;
out float vSoft;
out float vOcc;
out vec2 vUv;
void main() {
  float pad = 1.0 + aA.z * aB.x * 0.4;
  vec2 local = aCorner * (aA.z + pad);
  vec2 p = aA.xy + local;
  vLocal = local;
  vR = aA.z;
  vSoft = aB.x;
  vOcc = aB.y;
  float fade = smoothstep(0.0, uFade.x, aA.y) * (1.0 - smoothstep(uView.y - uFade.y, uView.y, aA.y))
    * smoothstep(0.0, uFade.z, aA.x) * smoothstep(0.0, uFade.z, uView.x - aA.x);
  vAlpha = aA.w * fade;
  vUv = p / uView;
  gl_Position = vec4(vUv.x * 2.0 - 1.0, 1.0 - vUv.y * 2.0, 0.0, 1.0);
}`;

const FRAG_FLAKE = `#version 300 es
precision highp float;
in vec2 vLocal;
in float vR;
in float vAlpha;
in float vSoft;
in float vOcc;
in vec2 vUv;
uniform sampler2D uM;
uniform float uLight;
uniform float uDpr;
out vec4 o;
void main() {
  float dist = length(vLocal);
  float aa = 0.7 / uDpr;
  float inner = vR * (1.0 - vSoft * 0.9);
  float a = 1.0 - smoothstep(inner - aa, vR + aa, dist);
  a *= vAlpha;
  if (vOcc > 0.5) a *= 1.0 - texture(uM, vUv).b;
  if (a < 0.003) discard;
  // On light pages a flake is a pale cool dot with a slightly deeper edge; a rim alone would read as a ring on small flakes.
  float edgeTint = smoothstep(vR * 0.2, vR, dist);
  vec3 col = mix(vec3(1.0), vec3(0.6, 0.68, 0.82), uLight * (0.42 + 0.3 * edgeTint) * (1.0 - vSoft * 0.5));
  o = vec4(col * a, a);
}`;

function compile(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const program = gl.createProgram();
  if (!program) throw new Error("program");
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vert],
    [gl.FRAGMENT_SHADER, frag],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("shader");
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "shader");
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
  return program;
}

function texture(gl: WebGL2RenderingContext) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

/** Returns null when WebGL 2 is not available; the element then shows as it is. */
export function createSnowRenderer(canvas: HTMLCanvasElement): SnowRenderer | null {
  const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) return null;
  let fieldProgram: WebGLProgram;
  let flakeProgram: WebGLProgram;
  try {
    fieldProgram = compile(gl, VERT_FIELD, FRAG_FIELD);
    flakeProgram = compile(gl, VERT_FLAKE, FRAG_FLAKE);
  } catch {
    return null;
  }
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  const fu = (name: string) => gl.getUniformLocation(fieldProgram, name);
  const pu = (name: string) => gl.getUniformLocation(flakeProgram, name);
  const field = { d: fu("uD"), c: fu("uC"), m: fu("uM"), grid: fu("uGrid"), light: fu("uLight"), time: fu("uTime"), dpr: fu("uDpr") };
  const flake = { view: pu("uView"), fade: pu("uFade"), m: pu("uM"), light: pu("uLight"), dpr: pu("uDpr") };

  const fieldVao = gl.createVertexArray();
  gl.bindVertexArray(fieldVao);
  const tri = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tri);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(fieldProgram, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const flakeVao = gl.createVertexArray();
  gl.bindVertexArray(flakeVao);
  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aCorner = gl.getAttribLocation(flakeProgram, "aCorner");
  gl.enableVertexAttribArray(aCorner);
  gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0);
  const inst = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, inst);
  let instCapacity = 0;
  const aA = gl.getAttribLocation(flakeProgram, "aA");
  const aB = gl.getAttribLocation(flakeProgram, "aB");
  gl.enableVertexAttribArray(aA);
  gl.vertexAttribPointer(aA, 4, gl.FLOAT, false, 24, 0);
  gl.vertexAttribDivisor(aA, 1);
  gl.enableVertexAttribArray(aB);
  gl.vertexAttribPointer(aB, 2, gl.FLOAT, false, 24, 16);
  gl.vertexAttribDivisor(aB, 1);
  gl.bindVertexArray(null);

  const dTex = texture(gl);
  const cTex = texture(gl);
  const mTex = texture(gl);
  let grid: [number, number] = [1, 1];
  let hasMask = false;

  return {
    setMask(data, width, height) {
      gl.bindTexture(gl.TEXTURE_2D, mTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      hasMask = true;
    },
    setGrid(width, height) {
      grid = [width, height];
      for (const t of [dTex, cTex]) {
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, width, height, 0, gl.RED, gl.UNSIGNED_BYTE, new Uint8Array(width * height));
      }
    },
    draw(frame) {
      const w = Math.max(1, Math.round(frame.width * frame.dpr));
      const h = Math.max(1, Math.round(frame.height * frame.dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (!hasMask) return;
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      if (frame.view) {
        gl.bindTexture(gl.TEXTURE_2D, dTex);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, grid[0], grid[1], gl.RED, gl.UNSIGNED_BYTE, frame.view);
      }
      if (frame.clumps) {
        gl.bindTexture(gl.TEXTURE_2D, cTex);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, grid[0], grid[1], gl.RED, gl.UNSIGNED_BYTE, frame.clumps);
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dTex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, mTex);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, cTex);

      gl.useProgram(fieldProgram);
      gl.uniform1i(field.d, 0);
      gl.uniform1i(field.m, 1);
      gl.uniform1i(field.c, 2);
      gl.uniform2f(field.grid, grid[0], grid[1]);
      gl.uniform1f(field.light, frame.light ? 1 : 0);
      gl.uniform1f(field.time, frame.time);
      gl.uniform1f(field.dpr, frame.dpr);
      gl.bindVertexArray(fieldVao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (frame.count) {
        gl.useProgram(flakeProgram);
        gl.uniform1i(flake.m, 1);
        gl.uniform2f(flake.view, frame.width, frame.height);
        gl.uniform3f(flake.fade, frame.height * 0.08, frame.height * 0.14, frame.width * 0.09);
        gl.uniform1f(flake.light, frame.light ? 1 : 0);
        gl.uniform1f(flake.dpr, frame.dpr);
        gl.bindVertexArray(flakeVao);
        gl.bindBuffer(gl.ARRAY_BUFFER, inst);
        const bytes = frame.count * 24;
        if (bytes > instCapacity) {
          instCapacity = frame.instances.byteLength;
          gl.bufferData(gl.ARRAY_BUFFER, instCapacity, gl.DYNAMIC_DRAW);
        }
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, frame.instances, 0, frame.count * 6);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, frame.count);
      }
      gl.bindVertexArray(null);
      gl.activeTexture(gl.TEXTURE0);
    },
    dispose() {
      gl.deleteTexture(dTex);
      gl.deleteTexture(cTex);
      gl.deleteTexture(mTex);
      gl.deleteBuffer(tri);
      gl.deleteBuffer(quad);
      gl.deleteBuffer(inst);
      gl.deleteVertexArray(fieldVao);
      gl.deleteVertexArray(flakeVao);
      gl.deleteProgram(fieldProgram);
      gl.deleteProgram(flakeProgram);
    },
  };
}
