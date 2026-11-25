"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform vec2 uCss;
uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uWake;
uniform float uPointerPower;
uniform vec3 uTrailPoints[16];
uniform vec4 uTrailBounds;
uniform float uReach;
uniform float uSeed;
uniform float uGrain;
uniform float uCell;
uniform float uStrength;
uniform float uCeiling;
uniform vec3 uBase;
uniform vec3 uWarm;
uniform vec3 uMid;
uniform vec3 uDeep;
uniform vec3 uSpark;
uniform vec3 uSparkLit;

out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm2(vec2 p) {
  return noise(p) * 0.68 + noise(p * 2.03 + 11.7) * 0.32;
}

float fbm3(vec2 p) {
  return noise(p) * 0.62 + noise(p * 2.03 + 11.7) * 0.27 +
    noise(p * 4.01 + 3.1) * 0.11;
}

float softMin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

const float TRAIL_RADIUS = 250.0;
const float TRAIL_REACH = TRAIL_RADIUS * 1.12;

float toSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0001), 0.0, 1.0);
  return length(pa - ba * h);
}

float glowAt(float dist, float strength, float wobble) {
  float radius = mix(84.0, TRAIL_RADIUS, strength) * wobble;
  float f = clamp(1.0 - dist / radius, 0.0, 1.0);
  float falloff = f * f * (3.0 - 2.0 * f);
  return falloff * falloff * strength;
}

float trailAt(vec2 p, float wobble) {
  vec3 head = uTrailPoints[0];
  float lit = glowAt(length(p - head.xy), head.z, wobble);
  for (int i = 0; i < 15; i++) {
    vec3 a = uTrailPoints[i];
    vec3 b = uTrailPoints[i + 1];
    vec2 pa = p - a.xy;
    vec2 ba = b.xy - a.xy;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0001), 0.0, 1.0);
    lit = max(lit, glowAt(length(pa - ba * h), mix(a.z, b.z, h), wobble));
    lit = max(lit, glowAt(length(p - b.xy), b.z, wobble));
  }
  return lit;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 css = vec2(uv.x, 1.0 - uv.y) * uCss;
  vec2 p = vec2(uv.x * uCss.x / uCss.y, uv.y) + uSeed;

  float reach = toSegment(css, uPointer, uWake);
  float halo = exp(-reach * reach / 52000.0) * uPointerPower;

  vec2 warp = vec2(
    fbm2(p * 0.7 + vec2(0.0, uTime * 0.5)),
    fbm2(p * 0.7 + vec2(4.7, -uTime * 0.4))
  ) - 0.5;
  float lift = fbm3(p * 0.42 + warp * 1.1 + vec2(uTime * 0.3, 0.0)) - 0.5;

  float cap = uCeiling > 0.0 ? uCeiling / uCss.y : 2.0;
  float horizon = softMin(
    uReach + lift * 1.25 + (uv.x - 0.5) * 0.2 + halo * 0.09,
    cap,
    0.1
  );
  float depth = clamp((horizon - uv.y) / max(horizon, 0.0001), 0.0, 1.0);
  float presence = smoothstep(0.0, 0.62, depth);

  float silk = sin(
    (p.x * 1.5 + p.y * 2.3) * 2.6 + warp.x * 7.0 + lift * 9.0 - uTime * 2.4
  );
  float crest = smoothstep(0.15, 1.0, silk);
  float trough = smoothstep(-0.15, -1.0, silk);

  float band = depth + warp.x * 0.7 - crest * 0.2 + trough * 0.1 - halo * 0.1;
  vec3 light = mix(uWarm, uMid, smoothstep(0.1, 0.62, band));
  light = mix(light, uDeep, smoothstep(0.52, 1.02, band + warp.y * 0.5));
  vec3 color = mix(uBase, light, presence);

  float originX = (uCss.x - uCell) * 0.5;
  vec2 grid = vec2(css.x - originX, css.y) / uCell;
  vec2 cell = floor(grid);
  vec2 inCell = fract(grid) * uCell;
  vec2 center = (cell + 0.5) * uCell + vec2(originX, 0.0);
  float seed = hash(cell + 3.1);
  float near = 0.0;
  if (
    uPointerPower > 0.001 &&
    center.x > uTrailBounds.x - TRAIL_REACH &&
    center.y > uTrailBounds.y - TRAIL_REACH &&
    center.x < uTrailBounds.z + TRAIL_REACH &&
    center.y < uTrailBounds.w + TRAIL_REACH
  ) {
    float wobble =
      0.9 + 0.2 * noise(center / 170.0 + vec2(uTime * 1.6, -uTime));
    near = trailAt(center, wobble) * uStrength;
  }
  float shimmer = 0.84 + 0.16 * sin(uTime * 11.0 + seed * 43.0);
  float tile =
    smoothstep(1.0, 2.5, inCell.x) * smoothstep(1.0, 2.5, inCell.y) *
    smoothstep(uCell + 0.5, uCell - 1.0, inCell.x) *
    smoothstep(uCell + 0.5, uCell - 1.0, inCell.y);
  float weight = mix(0.5, 1.0, smoothstep(0.1, 0.95, seed));
  float fill = near * weight * shimmer * tile;
  float lines = min(
    2.0 - smoothstep(0.5, 1.5, inCell.x) - smoothstep(0.5, 1.5, inCell.y),
    1.0
  ) * near;

  vec3 spark = mix(uSpark, uSparkLit, smoothstep(0.55, 1.0, presence));
  color = mix(color, spark, clamp(fill * 0.5 + lines * 0.42, 0.0, 1.0));
  color = mix(color, spark, halo * 0.07 * uStrength);
  color += (hash(gl_FragCoord.xy) - 0.5) * uGrain;
  outColor = vec4(color, 1.0);
}`;

const FRAME_TIME = 1000 / 60;
let scratchCanvas: HTMLCanvasElement | null = null;
let scratchCtx: CanvasRenderingContext2D | null = null;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

function damp(decay: number, dt: number) {
  return 1 - Math.pow(1 - decay, dt / FRAME_TIME);
}

function resolveColor(cssValue: string, target: Float32Array, offset: number) {
  if (!scratchCtx) {
    scratchCanvas = document.createElement("canvas");
    scratchCanvas.width = 1;
    scratchCanvas.height = 1;
    scratchCtx = scratchCanvas.getContext("2d", { willReadFrequently: true });
  }
  if (!scratchCtx) return;
  scratchCtx.clearRect(0, 0, 1, 1);
  scratchCtx.fillStyle = "#000";
  scratchCtx.fillStyle = cssValue.trim();
  scratchCtx.fillRect(0, 0, 1, 1);
  const data = scratchCtx.getImageData(0, 0, 1, 1).data;
  target[offset] = (data[0] ?? 0) / 255;
  target[offset + 1] = (data[1] ?? 0) / 255;
  target[offset + 2] = (data[2] ?? 0) / 255;
}

export function LightField({
  className = "",
  reach = 0.66,
  seed = 0,
}: {
  className?: string;
  reach?: number;
  seed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ceilingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const ceiling = ceilingRef.current;
    if (!container || !ceiling) return;

    const canvas = document.createElement("canvas");
    canvas.className =
      "absolute inset-0 size-full opacity-0 transition-opacity duration-1000";
    canvas.setAttribute("aria-hidden", "true");

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    const buffer = gl.createBuffer();

    const cleanup = () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };

    if (
      !vertShader ||
      !fragShader ||
      !program ||
      !buffer ||
      (gl.attachShader(program, vertShader),
      gl.attachShader(program, fragShader),
      gl.linkProgram(program),
      !gl.getProgramParameter(program, gl.LINK_STATUS))
    ) {
      cleanup();
      return;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uCss = gl.getUniformLocation(program, "uCss");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uWake = gl.getUniformLocation(program, "uWake");
    const uTrailPoints = gl.getUniformLocation(program, "uTrailPoints");
    const uTrailBounds = gl.getUniformLocation(program, "uTrailBounds");
    const uPointerPower = gl.getUniformLocation(program, "uPointerPower");

    // Static floats
    gl.uniform1f(gl.getUniformLocation(program, "uReach"), reach);
    gl.uniform1f(gl.getUniformLocation(program, "uSeed"), seed);
    gl.uniform1f(gl.getUniformLocation(program, "uGrain"), 0.028);
    gl.uniform1f(gl.getUniformLocation(program, "uCell"), 28);
    gl.uniform1f(gl.getUniformLocation(program, "uStrength"), 1);

    const uCeilingLoc = gl.getUniformLocation(program, "uCeiling");

    const colorVars = [
      ["uBase", "--field-base"],
      ["uWarm", "--field-warm"],
      ["uMid", "--field-mid"],
      ["uDeep", "--field-deep"],
      ["uSpark", "--field-spark"],
      ["uSparkLit", "--field-spark-lit"],
    ];
    const colorLocs = colorVars.map(([name]) => gl.getUniformLocation(program, name));
    const currentColors = new Float32Array(3 * colorVars.length);
    const targetColors = new Float32Array(3 * colorVars.length);

    const updateColors = () => {
      const style = getComputedStyle(container);
      colorVars.forEach(([, cssVar], idx) => {
        resolveColor(style.getPropertyValue(cssVar), targetColors, 3 * idx);
      });
    };

    let time = 7.5;
    let animId = 0;
    let lastTime = 0;
    let prevNow = 0;
    let isIntersecting = false;
    let cssW = 1;
    let cssH = 1;
    let targetX = -9999;
    let targetY = -9999;
    let smoothX = -9999;
    let smoothY = -9999;
    let wakeX = -9999;
    let wakeY = -9999;
    let trailAccum = 0;
    const trailPoints = new Float32Array(48).fill(-9999);
    const trailBounds = new Float32Array(4).fill(-9999);
    let mouseX = -9999;
    let mouseY = -9999;
    let targetPower = 0;
    let smoothPower = 0;

    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uCss, cssW, cssH);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uPointer, smoothX, smoothY);
      gl.uniform2f(uWake, wakeX, wakeY);
      gl.uniform3fv(uTrailPoints, trailPoints);
      gl.uniform4fv(uTrailBounds, trailBounds);
      gl.uniform1f(uPointerPower, smoothPower);

      for (let i = 0; i < colorLocs.length; i++) {
        const offset = 3 * i;
        gl.uniform3f(
          colorLocs[i],
          currentColors[offset] ?? 0,
          currentColors[offset + 1] ?? 0,
          currentColors[offset + 2] ?? 0
        );
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const stopLoop = () => {
      cancelAnimationFrame(animId);
      animId = 0;
    };

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const delta = now - lastTime;
      if (delta < FRAME_TIME - 1) return;
      lastTime = now - Math.min(Math.max(delta - FRAME_TIME, 0), FRAME_TIME);
      const dt = Math.min(now - prevNow, 50);
      prevNow = now;

      const colorsChanged = (() => {
        const factor = damp(0.1, dt);
        let changed = false;
        for (let i = 0; i < currentColors.length; i++) {
          const curr = currentColors[i] ?? 0;
          const tgt = targetColors[i] ?? 0;
          if (Math.abs(tgt - curr) > 0.002) {
            currentColors[i] = curr + (tgt - curr) * factor;
            changed = true;
          } else {
            currentColors[i] = tgt;
          }
        }
        return changed;
      })();

      time += 0.001 * dt * 0.11;
      smoothX += (mouseX - smoothX) * damp(0.2, dt);
      smoothY += (mouseY - smoothY) * damp(0.2, dt);
      wakeX += (mouseX - wakeX) * damp(0.035, dt);
      wakeY += (mouseY - wakeY) * damp(0.035, dt);
      smoothPower += (targetPower - smoothPower) * damp(0.05, dt);

      trailAccum += dt;
      while (trailAccum >= 55) {
        trailAccum -= 55;
        trailPoints.copyWithin(3, 0, 45);
      }
      trailPoints[0] = smoothX;
      trailPoints[1] = smoothY;

      const frac = trailAccum / 55;
      trailBounds[0] = smoothX;
      trailBounds[1] = smoothY;
      trailBounds[2] = smoothX;
      trailBounds[3] = smoothY;

      for (let i = 0; i < 16; i++) {
        const offset = 3 * i;
        const decay = i === 0 ? 1 : 1 - (i - 1 + frac) / 15;
        trailPoints[offset + 2] = Math.pow(Math.max(decay, 0), 1.7) * smoothPower;
        const px = trailPoints[offset] ?? 0;
        const py = trailPoints[offset + 1] ?? 0;
        trailBounds[0] = Math.min(trailBounds[0] ?? px, px);
        trailBounds[1] = Math.min(trailBounds[1] ?? py, py);
        trailBounds[2] = Math.max(trailBounds[2] ?? px, px);
        trailBounds[3] = Math.max(trailBounds[3] ?? py, py);
      }

      render();
    };

    const startLoop = () => {
      if (!animId) {
        prevNow = lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    const syncVisibility = () => {
      if (!isIntersecting || document.hidden) {
        stopLoop();
        currentColors.set(targetColors);
        render();
      } else {
        startLoop();
      }
    };

    const resize = () => {
      gl.uniform1f(uCeilingLoc, ceiling.offsetHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cssW = Math.max(1, container.clientWidth);
      cssH = Math.max(1, container.clientHeight);
      const pixelW = Math.round(cssW * dpr);
      const pixelH = Math.round(cssH * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
        gl.viewport(0, 0, pixelW, pixelH);
        render();
      }
    };

    let resizeTimer = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(resize);
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? false;
        syncVisibility();
      },
      { rootMargin: "160px" }
    );

    const mutationObserver = new MutationObserver(() => {
      updateColors();
      if (!animId) {
        if (isIntersecting && !document.hidden) startLoop();
        else {
          currentColors.set(targetColors);
          render();
        }
      }
    });

    let rawX = 0;
    let rawY = 0;
    let hasPointer = false;

    const updatePointer = () => {
      if (!hasPointer) return;
      const rect = container.getBoundingClientRect();
      const relX = rawX - rect.left;
      const relY = rawY - rect.top;
      if (relX < 0 || relY < 0 || relX > rect.width || relY > rect.height) {
        targetPower = 0;
        return;
      }
      if (targetPower === 0 && smoothPower < 0.02) {
        smoothX = relX;
        smoothY = relY;
        wakeX = relX;
        wakeY = relY;
        for (let i = 0; i < 16; i++) {
          trailPoints[3 * i] = relX;
          trailPoints[3 * i + 1] = relY;
        }
      }
      mouseX = relX;
      mouseY = relY;
      targetPower = 1;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        rawX = e.clientX;
        rawY = e.clientY;
        hasPointer = true;
        if (isIntersecting) updatePointer();
      }
    };

    const onScroll = () => {
      if (isIntersecting) updatePointer();
    };

    const onPointerLeave = () => {
      hasPointer = false;
      targetPower = 0;
    };

    updateColors();
    currentColors.set(targetColors);
    container.append(canvas);
    resize();
    canvas.classList.replace("opacity-0", "opacity-100");

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-accent", "style"],
    });

    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stopLoop();
      cancelAnimationFrame(resizeTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onPointerLeave);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      cleanup();
    };
  }, [reach, seed]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-field-base ${className}`}
    >
      <span
        ref={ceilingRef}
        className="absolute bottom-0 left-0 h-(--field-ceiling) w-px"
      />
    </div>
  );
}
