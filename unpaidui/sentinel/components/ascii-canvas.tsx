"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform sampler2D uFontTexture;
  uniform float uCharCount;
  uniform vec3 uColor;
  uniform bool uInvert;
  uniform float uScale;
  uniform float uSize;
  uniform float uSpeed;
  uniform float uHasMouse;
  uniform float uIntensity;
  uniform float uInteractIntensity;
  uniform float uWaveTension;
  uniform float uWaveTwist;
  uniform sampler2D uVideoTexture;
  uniform bool uHasVideo;

  varying vec2 vUv;

  #define PI 3.14159265359
  #define TAU 6.28318530718

  float flowField(vec2 p, float t) {
    return sin(p.x + sin(p.y + t * 0.1)) * sin(p.y * p.x * 0.1 + t * 0.2);
  }

  vec2 computeField(vec2 p, float t) {
    vec2 ep = vec2(0.05, 0.0);
    vec2 result = vec2(0.0);
    float tension = uWaveTension;
    float twist = uWaveTwist;

    for (int i = 0; i < 10; i++) {
      float t0 = flowField(p, t);
      float t1 = flowField(p + ep.xy, t);
      float t2 = flowField(p + ep.yx, t);
      vec2 gradient = vec2((t1 - t0), (t2 - t0)) / ep.xx;
      vec2 tangent = vec2(-gradient.y, gradient.x);

      p += tangent * tension + gradient * 0.005;
      p.x += sin(t * 0.25) * twist;
      p.y += cos(t * 0.25) * twist;
      result = gradient;
    }

    return result;
  }

  vec3 getDistortion(vec2 coord) {
      vec2 aspect;

      if(uResolution.x > uResolution.y) {
          aspect = vec2(uResolution.x / uResolution.y, 1.0);
      } else {
          aspect = vec2(uResolution.y / uResolution.x, 1.0);
      }

      vec2 uv0 = coord.xy / uResolution.xy * aspect;
      vec2 muv = uMouse.xy / uResolution.xy * aspect;

      float speed = uSpeed;
      float noiseTime = uTime * speed;

      vec2 diff = uv0 - muv;
      float distance = length(diff);

      float radius = 0.5;
      float interaction = 1.0 - smoothstep(0.0, radius, distance);

      vec2 p = uv0 * uScale;
      float interactStrength = uInteractIntensity * uHasMouse;

      vec2 direction = distance > 0.0 ? diff / distance : vec2(0.0);
      vec2 mouseDistort = direction * interaction * interactStrength;
      p += mouseDistort;
      p.x += sin(uTime * 3.0) * interaction * interactStrength * 0.5;
      p.y += cos(uTime * 3.0) * interaction * interactStrength * 0.5;

      vec2 field = vec2(0.0);
      if (uIntensity != 0.0) {
        field = computeField(p, noiseTime);
      }

      float val = length(field) * uIntensity;
      val = clamp(val, 0.0, 1.0);

      vec2 totalDisplacement = mouseDistort + field * 0.5 * uIntensity;

      return vec3(val, totalDisplacement);
  }

  void main() {
      float gridSize = uSize;

      vec2 pix = vUv * uResolution;
      vec2 snappedMuv = floor(pix / gridSize) * gridSize;

      vec3 distData = getDistortion(snappedMuv);
      float intensity = distData.x;
      vec2 displacement = distData.yz;

      vec3 col;
      if (uHasVideo) {
        vec2 videoUV = snappedMuv / uResolution;
        vec2 distortedVideoUV = videoUV + (displacement * 0.1);

        col = texture2D(uVideoTexture, distortedVideoUV).rgb;
      } else {
        col = vec3(intensity);
      }

      float gray = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;

      if (uInvert) {
        gray = 1.0 - gray;
      }

      float charIndex = floor(gray * (uCharCount - 1.0));
      charIndex = clamp(charIndex, 0.0, uCharCount - 1.0);

      vec2 cellUV = fract(pix / gridSize);

      float charWidth = 1.0 / uCharCount;
      vec2 atlasUV = vec2((cellUV.x * charWidth) + (charIndex * charWidth), cellUV.y);

      vec4 fontSample = texture2D(uFontTexture, atlasUV);
      float alpha = fontSample.a;

      vec3 targetColor = uHasVideo ? col : uColor * (gray + 0.1);
      vec3 finalColor = targetColor * alpha;

      gl_FragColor = vec4(finalColor, alpha);
  }
`;

function createFontTexture(chars: string, size = 64) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const len = chars.length;
  const totalWidth = len * size;
  canvas.width = totalWidth;
  canvas.height = size;

  ctx.clearRect(0, 0, totalWidth, size);
  ctx.font = `bold ${size}px monospace`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < len; i++) {
    const ch = chars[i] ?? " ";
    ctx.fillText(ch, i * size + size / 2, size / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

interface AsciiMeshProps {
  characters: string;
  color: string;
  invert: boolean;
  scale: number;
  size: number;
  speed: number;
  hasMouse: boolean;
  intensity: number;
  interactionIntensity: number;
  waveTension: number;
  waveTwist: number;
  videoUrl?: string;
  active: boolean;
}

function AsciiMesh({
  characters,
  color,
  invert,
  scale,
  size,
  speed,
  hasMouse,
  intensity,
  interactionIntensity,
  waveTension,
  waveTwist,
  videoUrl,
  active,
}: AsciiMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size: S, viewport: M, gl, invalidate } = useThree();
  const mouseRef = useRef<THREE.Vector2 | null>(null);
  const fontTextureRef = useRef<THREE.Texture | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const charList = characters.length > 0 ? characters : " ";

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(S.width, S.height) },
      uFontTexture: { value: null as THREE.Texture | null },
      uCharCount: { value: charList.length },
      uColor: { value: new THREE.Color(color) },
      uInvert: { value: invert },
      uScale: { value: scale },
      uSize: { value: size },
      uSpeed: { value: speed },
      uHasMouse: { value: 0 },
      uIntensity: { value: intensity },
      uInteractIntensity: { value: interactionIntensity },
      uWaveTension: { value: waveTension },
      uWaveTwist: { value: waveTwist },
      uVideoTexture: { value: null as THREE.Texture | null },
      uHasVideo: { value: false },
    }),
    []
  );

  useEffect(() => {
    const texture = createFontTexture(charList);
    fontTextureRef.current = texture;
    return () => {
      texture.dispose();
      fontTextureRef.current = null;
    };
  }, [charList]);

  useEffect(() => {
    if (!videoUrl) {
      videoTextureRef.current = null;
      return;
    }
    const video = document.createElement("video");
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.src = videoUrl;

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    videoTextureRef.current = texture;
    videoElementRef.current = video;

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadedmetadata", tryPlay);
    tryPlay();
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("pointermove", tryPlay, { once: true });

    return () => {
      video.pause();
      texture.dispose();
      video.removeAttribute("src");
      video.load();
      videoTextureRef.current = null;
      videoElementRef.current = null;
    };
  }, [videoUrl]);

  useEffect(() => {
    const video = videoElementRef.current;
    if (video) {
      if (active) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [active, videoUrl]);

  useEffect(() => {
    const dom = gl.domElement;
    const win = dom.ownerDocument?.defaultView;
    if (!active || !hasMouse || interactionIntensity === 0 || !win) return;

    let lastX = NaN;
    let lastY = NaN;
    const resetMouse = () => {
      if (mouseRef.current) {
        mouseRef.current = null;
        invalidate();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const { clientX: a, clientY: o, pointerType: l } = e;
      if ("touch" === l || (a === lastX && o === lastY)) return;
      lastX = a;
      lastY = o;
      const rect = dom.getBoundingClientRect();
      if (
        !rect.width ||
        !rect.height ||
        a < rect.left ||
        a > rect.right ||
        o < rect.top ||
        o > rect.bottom
      ) {
        resetMouse();
      } else {
        mouseRef.current ??= new THREE.Vector2();
        mouseRef.current.set(
          ((a - rect.left) * S.width) / rect.width,
          ((rect.bottom - o) * S.height) / rect.height
        );
        invalidate();
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      if (e.pointerType !== "touch" && !e.relatedTarget) {
        resetMouse();
      }
    };

    win.addEventListener("pointermove", handlePointerMove, { capture: true, passive: true });
    win.addEventListener("pointerout", handlePointerOut, true);
    win.addEventListener("blur", resetMouse);

    return () => {
      win.removeEventListener("pointermove", handlePointerMove, true);
      win.removeEventListener("pointerout", handlePointerOut, true);
      win.removeEventListener("blur", resetMouse);
      mouseRef.current = null;
    };
  }, [active, hasMouse, interactionIntensity, gl, S.width, S.height, invalidate]);

  useFrame((state) => {
    if (materialRef.current) {
      const u = materialRef.current.uniforms;
      u.uTime.value = state.clock.elapsedTime;
      u.uResolution.value.set(S.width, S.height);
      u.uColor.value.set(color);
      u.uInvert.value = invert;
      u.uScale.value = scale;
      u.uSize.value = size;
      u.uSpeed.value = speed;
      u.uHasMouse.value = hasMouse && mouseRef.current ? 1 : 0;
      u.uIntensity.value = intensity;
      u.uInteractIntensity.value = interactionIntensity;
      u.uWaveTension.value = waveTension;
      u.uWaveTwist.value = waveTwist;
      u.uCharCount.value = charList.length;

      if (fontTextureRef.current) {
        u.uFontTexture.value = fontTextureRef.current;
      }
      if (videoTextureRef.current) {
        u.uVideoTexture.value = videoTextureRef.current;
        u.uHasVideo.value = true;
      } else {
        u.uVideoTexture.value = null;
        u.uHasVideo.value = false;
      }

      if (mouseRef.current) {
        if (u.uMouse.value.distanceToSquared(mouseRef.current) > 0.01) {
          u.uMouse.value.lerp(mouseRef.current, 0.1);
        } else {
          u.uMouse.value.copy(mouseRef.current);
        }
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[M.width, M.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

interface AsciiCanvasProps {
  characters?: string;
  color?: string;
  invert?: boolean;
  noiseScale?: number;
  elementSize?: number;
  speed?: number;
  hasCursorInteraction?: boolean;
  intensity?: number;
  interactionIntensity?: number;
  waveTension?: number;
  waveTwist?: number;
  className?: string;
  videoUrl?: string;
}

export function AsciiCanvas({
  characters = " .:-+*=%@#",
  color = "#ffffff",
  invert = false,
  noiseScale = 2,
  elementSize = 16,
  speed = 1,
  hasCursorInteraction = true,
  intensity = 1,
  interactionIntensity = 1,
  waveTension = 0.5,
  waveTwist = 0.1,
  className = "",
  videoUrl,
}: AsciiCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry?.isIntersecting ?? true);
      },
      { rootMargin: "120px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full cursor-text overflow-hidden ${className}`}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <AsciiMesh
          characters={characters}
          color={color}
          invert={invert}
          scale={noiseScale}
          size={elementSize}
          speed={speed}
          hasMouse={hasCursorInteraction}
          intensity={intensity}
          interactionIntensity={interactionIntensity}
          waveTension={waveTension}
          waveTwist={waveTwist}
          videoUrl={videoUrl}
          active={active}
        />
      </Canvas>
    </div>
  );
}
