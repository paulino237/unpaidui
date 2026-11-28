"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SynthraCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = "SYNTHRA";
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "-1";
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Vertex & Fragment Shaders matching the authentic dark purple / electric violet / cyan aura
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;
      varying vec2 vUv;

      // Simplex 2D noise helpers
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = (st - 0.5) * vec2(aspect, 1.0);

        // Reactivity to pointer and scroll
        vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
        float mouseDist = length(p - mouse);
        float mouseWave = smoothstep(0.8, 0.0, mouseDist) * 0.15;

        float t = uTime * 0.15 + uScroll * 0.4;

        // Multi-octave organic waves
        float n1 = snoise(p * 1.2 + vec2(t * 0.2, t * 0.15));
        float n2 = snoise(p * 2.5 - vec2(t * 0.1, -t * 0.25) + n1 * 0.5);
        float n3 = snoise(p * 4.0 + vec2(-t * 0.3, t * 0.2) + mouseWave);

        float organic = (n1 * 0.5 + n2 * 0.35 + n3 * 0.15);

        // Palette exact from La Boite a Slides
        // Deep purple: #120042 (0.07, 0.0, 0.26)
        // Electric purple: #6630ff (0.4, 0.19, 1.0)
        // Cyan / turquoise: #01daf6 (0.004, 0.85, 0.96)
        // Magenta: #ff61f8 (1.0, 0.38, 0.97)

        vec3 colBase = vec3(0.07, 0.0, 0.26);
        vec3 colElectric = vec3(0.40, 0.19, 1.0);
        vec3 colCyan = vec3(0.004, 0.85, 0.96);
        vec3 colMagenta = vec3(1.0, 0.38, 0.97);

        // Radial glow from center-top
        float radial = 1.0 - length(p - vec2(0.0, 0.2 + sin(t*0.5)*0.1));
        radial = clamp(radial, 0.0, 1.0);

        vec3 color = mix(colBase, colElectric, smoothstep(-0.2, 0.6, organic + radial * 0.4));
        color = mix(color, colCyan, smoothstep(0.3, 0.8, organic) * 0.35);
        color = mix(color, colMagenta, smoothstep(0.4, 0.9, n2) * 0.25);

        // Subtle vignette
        float vignette = smoothstep(1.5, 0.2, length(p));
        color *= vignette * 0.9 + 0.1;

        // Subtle chromatic grain simulation
        float grain = fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.02;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Event listeners
    let mouseTargetX = 0.5;
    let mouseTargetY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let scrollTarget = 0;
    let currentScroll = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseTargetX = e.clientX / window.innerWidth;
      mouseTargetY = 1.0 - e.clientY / window.innerHeight;
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Smooth damp
      currentMouseX += (mouseTargetX - currentMouseX) * 0.05;
      currentMouseY += (mouseTargetY - currentMouseY) * 0.05;
      currentScroll += (scrollTarget - currentScroll) * 0.05;

      uniforms.uTime.value += delta;
      uniforms.uMouse.value.set(currentMouseX, currentMouseY);
      uniforms.uScroll.value = currentScroll;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true" />;
}
