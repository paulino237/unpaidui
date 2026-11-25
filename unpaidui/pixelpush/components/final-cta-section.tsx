"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PixelButton } from "@/components/pixel-button";
import { PixelCluster } from "@/components/pixel-icon";

const EASE = [0.4, 0, 0.2, 1] as const;

const MASK = "linear-gradient(to top, #000 0%, rgba(0,0,0,0.8) 30%, transparent 72%)";

const AVATARS = [
  "https://i.pravatar.cc/80?img=5",
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=45",
  "https://i.pravatar.cc/80?img=33",
  "https://i.pravatar.cc/80?img=15",
];

const VERTEX_SHADER = `#version 300 es
in vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 iResolution;
uniform float iTime;

out vec4 outColor;

float Step(float a, float threshold) {
  return (a < threshold) ? 0.0 : 1.0;
}

vec4 Mix(vec4 a, vec4 b) {
  return mix(a, b, b.a);
}

float Noise21(vec2 uv) {
  const int w = 64;
  const int s = 32;
  uint a = uint(int(uv.x));
  uint b = uint(int(uv.y));
  a *= 3284157443u; b ^= a << s | a >> (w - s);
  b *= 1911520717u; a ^= b << s | b >> (w - s);
  a *= 2048419325u;
  float rand = float(a) * (3.14159265 / float(~(~0u >> 1)));
  return cos(rand) / 2.0 + 0.5;
}

vec2 Noise22(vec2 uv) {
  vec3 a = fract(uv.xyx * vec3(123.34, 234.34, 345.65));
  a += dot(a, a + 34.45);
  return fract(vec2(a.x * a.y, a.y * a.z));
}

float SmoothNoise(vec2 uv) {
  vec2 id = floor(uv);
  vec2 lv = fract(uv);
  lv = lv * lv * (3.0 - 2.0 * lv);
  float tl = Noise21(id + vec2(0, 1));
  float bl = Noise21(id);
  float tr = Noise21(id + vec2(1, 1));
  float br = Noise21(id + vec2(1, 0));
  return mix(mix(bl, br, lv.x), mix(tl, tr, lv.x), lv.y);
}

float LayerNoise(vec2 uv) {
  float result = 0.0;
  float delta = 0.0;
  float freq = 10.0;
  float amp = 1.0;
  for (float i = 0.0; i < 4.0; i++) {
    result += SmoothNoise(uv * freq) * amp;
    delta += amp;
    amp /= 2.0;
    freq *= 2.0;
  }
  return result / delta;
}

float VoronoiNoise(vec2 uv, float t) {
  vec2 id = floor(uv);
  vec2 lv = fract(uv) - 0.5;
  float minDist = 100.0;
  for (float x = -1.0; x <= 1.0; x++)
  for (float y = -1.0; y <= 1.0; y++) {
    vec2 offs = vec2(x, y);
    vec2 n = Noise22(id + offs);
    vec2 p = offs + sin(n * t) * 0.5;
    minDist = min(minDist, length(lv - p));
  }
  return smoothstep(0.0, 1.0, minDist);
}

vec4 FlameLayer(vec2 uv, float t, vec3 col, float threshold) {
  float layerNoise = LayerNoise(uv + vec2(0.25, -0.5) * t);
  float voronoiNoise = VoronoiNoise(uv * 3.0 + vec2(0.0, -0.25) * t, t);
  float res = layerNoise * mix(layerNoise, voronoiNoise, 0.7);
  res = smoothstep(res, 0.0, uv.y);
  res = Step(res, threshold);
  return vec4(col, res);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
  uv.y += 0.5;
  float pixelSize = 64.0;
  uv -= mod(uv, 1.0 / vec2(pixelSize, pixelSize));
  vec4 col = vec4(0);
  col = Mix(col, FlameLayer(uv, iTime, vec3(0.769, 0.153, 0.153), 0.001));
  col = Mix(col, FlameLayer(uv, iTime, vec3(0.886, 0.345, 0.133), 0.1));
  col = Mix(col, FlameLayer(uv, iTime, vec3(0.914, 0.475, 0.102), 0.5));
  col = Mix(col, FlameLayer(uv, iTime, vec3(0.945, 0.604, 0.067), 0.8));
  col = Mix(col, FlameLayer(uv, iTime, vec3(0.973, 0.729, 0.035), 0.9));
  col = Mix(col, FlameLayer(uv, iTime, vec3(1.0, 0.9, 0.6), 0.99));
  fragColor = col;
}

void main() {
  vec4 c;
  mainImage(c, gl_FragCoord.xy);
  outColor = c;
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
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

function PixelFlameCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "iResolution");
    const timeLoc = gl.getUniformLocation(program, "iTime");

    let rafId = 0;
    let time = 0;
    let lastStamp = 0;
    let running = false;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(resLoc, w, h);
      gl.uniform1f(timeLoc, time);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const tick = (stamp: number) => {
      if (lastStamp === 0) lastStamp = stamp;
      time += ((stamp - lastStamp) / 1000) * 0.4;
      lastStamp = stamp;
      draw();
      if (running) rafId = requestAnimationFrame(tick);
    };

    if (reduced) {
      time = 8;
      draw();
      const ro = new ResizeObserver(draw);
      ro.observe(canvas);
      return () => {
        ro.disconnect();
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      };
    }

    const ro = new ResizeObserver(() => {
      if (!running) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !running) {
          running = true;
          lastStamp = 0;
          rafId = requestAnimationFrame(tick);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export function FinalCtaSection() {
  const reduced = useReducedMotion();
  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="border-border bg-background relative isolate overflow-hidden border px-6 py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{ maskImage: MASK, WebkitMaskImage: MASK }}
        >
          <PixelFlameCanvas className="relative -bottom-6 h-full w-full" />
        </div>

        <PixelCluster className="text-accent/40 pointer-events-none absolute top-5 left-5 h-8 w-8" />
        <PixelCluster className="text-accent/40 pointer-events-none absolute top-5 right-5 h-8 w-8 rotate-90" />

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: reduced ? {} : { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.p variants={itemVariant} className="text-accent flex items-center gap-2 font-mono text-xs tracking-tight">
            <span aria-hidden="true" className="bg-accent h-1.5 w-1.5" />
            Get started
          </motion.p>
          <motion.h2
            variants={itemVariant}
            className="text-foreground mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Make your next video in minutes
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="text-muted-foreground mt-6 max-w-md text-base leading-relaxed text-pretty sm:text-lg"
          >
            Turn raw footage into a finished cut with Pixelpush. Edit in plain language, caption in 50+ languages.
          </motion.p>
          <motion.div
            variants={itemVariant}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <PixelButton href="#start" variant="solid" size="lg">
              Start for free
            </PixelButton>
            <PixelButton href="#demo" variant="outline" size="lg">
              Book a demo
            </PixelButton>
          </motion.div>
          <motion.div
            variants={itemVariant}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <div className="flex -space-x-2.5">
              {AVATARS.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="border-background bg-muted h-9 w-9 rounded-full border-2 object-cover grayscale"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Join <span className="text-foreground font-medium">180k+ creators</span> shipping with Pixelpush
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
