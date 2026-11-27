"use client";

import { useEffect, useRef, useState } from "react";
import { TextMorph } from "@/components/text-morph";

const HANDLES = ["noa", "halvor", "riso.club", "kettle", "ama", "plotline"];

const TILES = [
  {
    slot: "a",
    image: "/images/tile-noa.webp",
    alt: "Open studio poster: condensed black type over blue and red halftone dots, Saturday 18 October",
    scatter: { x: 0.035, y: 0.1, r: -7 },
    phone: { x: -0.05, y: 0.1, r: -12 },
  },
  {
    slot: "b",
    image: "/images/tile-nordlys.webp",
    alt: "Poster for the Nordlys jazz festival: heavy black type, a red disc and blue bars",
    scatter: { x: -0.055, y: 0.63, r: 5 },
    phone: { x: 0.13, y: 0.46, r: -5 },
  },
  {
    slot: "c",
    image: "/images/tile-glyph.webp",
    alt: "Process video: a lowercase g drawn with bezier handles",
    scatter: { x: 0.862, y: 0.03, r: 7 },
    phone: { x: 0.8, y: -0.08, r: 9 },
  },
  {
    slot: "d",
    image: "/images/tile-booking.webp",
    alt: "Booking tile: poster critique, 30 minutes, €60, three free slots",
    scatter: { x: 0.1, y: 0.9, r: -5 },
    phone: { x: 0.32, y: 0.04, r: 7 },
  },
  {
    slot: "e",
    image: "/images/tile-font.webp",
    alt: "Product tile: the Grotto Display typeface, six weights, €48",
    scatter: { x: 0.79, y: 0.84, r: -6 },
    phone: { x: 0.5, y: 0.32, r: -6 },
  },
  {
    slot: "f",
    image: "/images/tile-album.webp",
    alt: "Music tile: Low Tide by Halvor, with cover art by Noa",
    scatter: { x: 0.875, y: 0.5, r: 4 },
    phone: { x: 0.66, y: 0.16, r: 11 },
  },
  {
    slot: "g",
    image: "/images/tile-letter.webp",
    alt: "Newsletter tile: Kerning Club, a Sunday letter with 4,280 readers",
    scatter: { x: 0.02, y: 0.41, r: 3 },
    phone: null,
  },
];

const easeCubic = (e: number) =>
  e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;

const clamp = (e: number) => Math.min(1, Math.max(0, e));

export function HeroSection() {
  const [handle, setHandle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [handleIndex, setHandleIndex] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotating handle cycle
  useEffect(() => {
    if (handle || isFocused) return;
    const interval = window.setInterval(() => {
      setHandleIndex((prev) => (prev + 1) % HANDLES.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [handle, isFocused]);

  // Validation
  const trimmed = handle.trim().toLowerCase();
  let statusTone: "idle" | "warn" | "ok" = "idle";
  let statusText = "Free forever. Takes a minute.";

  if (trimmed) {
    if (trimmed.length < 3) {
      statusTone = "warn";
      statusText = "At least three characters";
    } else if (!/^[a-z0-9._]+$/.test(trimmed)) {
      statusTone = "warn";
      statusText = "Letters, numbers, dots and underscores";
    } else if (/^[._]|[._]$/.test(trimmed)) {
      statusTone = "warn";
      statusText = "Start and end with a letter or number";
    } else {
      statusTone = "ok";
      statusText = `inlay.me/${trimmed} looks good`;
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed || statusTone === "warn") {
      setShake(true);
      inputRef.current?.focus();
      return;
    }
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Flying tiles animation system
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<HTMLDivElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLElement | null)[]>([]);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const heroEl = heroRef.current;
    const stageEl = stageRef.current;
    const pfEl = pfRef.current;
    if (!heroEl || !stageEl || !pfEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroEl.dataset.landed = "all";
      return;
    }

    let coords: {
      dx: number;
      dy: number;
      r: number;
      s: number;
      fade: boolean;
      depth: number;
      seed: number;
    }[] = [];
    let scrollRange = 1;
    let targetProgress = 0;
    let currentProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let startTime = 0;
    let animFrame = 0;
    let isIntersecting = true;
    let allLanded = false;
    const lastTransform: string[] = [];

    const measure = () => {
      const isMobile = window.innerWidth < 760;
      const fanRect =
        isMobile && fanRef.current
          ? fanRef.current.getBoundingClientRect()
          : stageEl.getBoundingClientRect();

      const stageBounds = {
        left: isMobile ? fanRect.left : heroEl.getBoundingClientRect().left,
        top: fanRect.top,
        width: isMobile ? fanRect.width : heroEl.clientWidth,
        height: fanRect.height,
      };

      const stageLeft = stageBounds.left + window.scrollX;
      const stageTop = stageBounds.top + window.scrollY;

      coords = TILES.map((tile, idx) => {
        const slot = slotRefs.current[idx];
        if (!slot) {
          return { dx: 0, dy: 0, r: 0, s: 1, fade: true, depth: 1, seed: idx };
        }
        const sRect = slot.getBoundingClientRect();
        const w = sRect.width;
        const h = sRect.height;
        const scatterCfg = isMobile ? tile.phone : tile.scatter;

        if (!scatterCfg || w === 0) {
          return { dx: 0, dy: 0, r: 0, s: 1, fade: true, depth: 1, seed: idx };
        }

        const scale = (isMobile ? 0.6 : 0.78) * (w > 1.4 * h || h > 1.4 * w ? 0.86 : 1);
        const targetX = stageLeft + scatterCfg.x * stageBounds.width + (w * scale) / 2;
        const targetY = stageTop + scatterCfg.y * stageBounds.height + (h * scale) / 2;

        return {
          dx: targetX - (sRect.left + window.scrollX + w / 2),
          dy: targetY - (sRect.top + window.scrollY + h / 2),
          r: scatterCfg.r,
          s: scale,
          fade: false,
          depth: 0.5 + ((37 * idx) % 10) / 10,
          seed: 1.7 * idx,
        };
      });

      scrollRange = Math.max(
        1,
        pfEl.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * (isMobile ? 0.08 : 0.14)
      );
      targetProgress = clamp(window.scrollY / scrollRange);
    };

    const render = (now: number) => {
      animFrame = 0;
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      currentProgress += (targetProgress - currentProgress) * 0.14;
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      smoothMouseX += (mouseX - smoothMouseX) * 0.06;
      smoothMouseY += (mouseY - smoothMouseY) * 0.06;

      let landedCount = 0;

      coords.forEach((coord, idx) => {
        const tileEl = tileRefs.current[idx];
        if (!tileEl) return;

        const introProgress = easeCubic(clamp((elapsed - 150 - 85 * idx) / 750));
        const scrollCurve = clamp((currentProgress - 0.04 * idx) / 0.72);
        const easedScroll = easeCubic(scrollCurve);

        let transformStr: string;
        let opacityVal: number;

        if (coord.fade) {
          opacityVal = clamp((currentProgress - 0.55) / 0.35);
          transformStr = `scale(${0.94 + 0.06 * opacityVal})`;
        } else {
          const invScroll = 1 - easedScroll;
          const floatY = 7 * Math.sin((elapsed / 1000) * 0.9 + coord.seed) * invScroll;
          const floatRot = 0.9 * Math.sin((elapsed / 1000) * 0.6 + coord.seed) * invScroll;
          const parallaxX = 18 * smoothMouseX * coord.depth * invScroll;
          const parallaxY = 12 * smoothMouseY * coord.depth * invScroll;
          const currentScale =
            (coord.s + (1 - coord.s) * easedScroll) * (0.72 + 0.28 * introProgress);
          const currentRot = coord.r * invScroll + floatRot - (1 - introProgress) * 10;
          const posX = (coord.dx * invScroll + parallaxX).toFixed(1);
          const posY = (
            coord.dy * invScroll +
            floatY +
            parallaxY +
            (1 - introProgress) * 40
          ).toFixed(1);

          transformStr = `translate3d(${posX}px, ${posY}px, 0) rotate(${currentRot.toFixed(
            2
          )}deg) scale(${currentScale.toFixed(4)})`;
          opacityVal = introProgress;
        }

        const stateKey = `${transformStr}|${opacityVal.toFixed(3)}`;
        if (lastTransform[idx] !== stateKey) {
          tileEl.style.transform = transformStr;
          tileEl.style.opacity = String(opacityVal);
          lastTransform[idx] = stateKey;
        }

        const isLanded = scrollCurve >= 0.995;
        const slotEl = slotRefs.current[idx];
        if (slotEl && (slotEl.dataset.landed === "true") !== isLanded) {
          slotEl.dataset.landed = String(isLanded);
        }
        if (isLanded) landedCount++;
      });

      const isAllLanded = landedCount === coords.length;
      if (isAllLanded !== allLanded) {
        allLanded = isAllLanded;
        heroEl.dataset.landed = isAllLanded ? "all" : "";
      }
      heroEl.dataset.flying =
        currentProgress > 0.01 && !isAllLanded ? "true" : "false";

      if (isIntersecting) {
        animFrame = requestAnimationFrame(render);
      }
    };

    const triggerRender = () => {
      if (!animFrame && isIntersecting) {
        animFrame = requestAnimationFrame(render);
      }
    };

    const onScroll = () => {
      targetProgress = clamp(window.scrollY / scrollRange);
      triggerRender();
    };

    const onResize = () => {
      measure();
      triggerRender();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) triggerRender();
    });

    observer.observe(heroEl);
    measure();
    heroEl.dataset.ready = "true";
    triggerRender();

    const timer = window.setTimeout(measure, 600);
    document.fonts?.ready.then(measure).catch(() => {});

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animFrame);
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const activeGhost = HANDLES[handleIndex];

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-stage container" ref={stageRef}>
        <div className="hero-copy">
          <a className="chip hero-chip" data-reveal="fade" href="#pay">
            <span className="chip-tag">New</span>
            Inlay Pay is rolling out
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </a>

          <h1
            id="hero-title"
            className="h1 hero-title lines tw-host is-in"
            data-reveal="none"
            style={{ "--tw-d": "620ms" }}
          >
            <span className="line" style={{ "--i": 0 }}>
              <span>Every piece of you,</span>
            </span>
            <span className="line" style={{ "--i": 1 }}>
              <span>on <span className="tw">one page</span>.</span>
            </span>
          </h1>

          <p className="lead hero-lead" data-reveal="true" style={{ "--d": "260ms" }}>
            Your posters, playlists, posts, products and bookings, arranged the way you like, on a page that also gets you paid.
          </p>

          <div className="hero-claim" id="claim" data-reveal="true" style={{ "--d": "380ms" }}>
            <form
              className={`claim ${isFocused ? "is-focused" : ""}`}
              data-status={statusTone}
              onSubmit={handleSubmit}
              noValidate
            >
              <div
                className="claim-box"
                data-shake={shake || undefined}
                onAnimationEnd={() => setShake(false)}
              >
                <label className="claim-field">
                  <span className="claim-domain">inlay.me/</span>
                  <span className="claim-input">
                    <input
                      ref={inputRef}
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""))}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      autoComplete="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      inputMode="url"
                      maxLength={24}
                      aria-label="Choose your handle on inlay.me"
                      aria-describedby="claim-status"
                      aria-invalid={handle ? statusTone === "warn" : undefined}
                    />
                    {!handle && (
                      <span className="claim-ghost" aria-hidden="true">
                        {isFocused ? (
                          <span className="claim-hint">yourname</span>
                        ) : (
                          <TextMorph duration={520}>{activeGhost}</TextMorph>
                        )}
                      </span>
                    )}
                  </span>
                </label>

                <button type="submit" className="btn btn-ink claim-btn">
                  <span className="sr-only">Claim your page</span>
                  <span className="roll" aria-hidden="true">
                    {"Claim your page".split("").map((c, i) => (
                      <span key={i} className="roll-c" style={{ "--i": i }}>
                        <span>{c === " " ? " " : c}</span>
                        <span>{c === " " ? " " : c}</span>
                      </span>
                    ))}
                  </span>
                  <span className="throw" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                  </span>
                </button>
              </div>

              <p className="claim-status" id="claim-status" aria-live="polite">
                <span className="claim-dot" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2.6">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                </span>
                <TextMorph>{statusText}</TextMorph>
              </p>
            </form>
          </div>

          <div className="hero-fan" ref={fanRef} aria-hidden="true"></div>
        </div>
      </div>

      <div className="pf-wrap container">
        <div className="pf" ref={pfRef}>
          <div className="pf-address" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.8">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2.5"></rect>
              <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"></path>
            </svg>
            <span>inlay.me/</span>
            <TextMorph className="pf-handle">{trimmed || "noa"}</TextMorph>
          </div>

          <header className="pf-head">
            <img className="pf-avatar" src="/images/noa-avatar.webp" alt="" width="64" height="64" />
            <div className="pf-who">
              <p className="pf-name">Noa Lindqvist</p>
              <p className="pf-bio">Type designer and poster artist. Copenhagen.</p>
            </div>
            <div className="pf-actions" aria-hidden="true">
              <span className="pf-act">Follow</span>
              <span className="pf-act pf-act-ink">Tip €</span>
            </div>
          </header>

          <div className="pf-grid">
            {TILES.map((tile, idx) => (
              <figure
                key={tile.slot}
                className={`pf-slot pf-${tile.slot}`}
                ref={(node) => {
                  slotRefs.current[idx] = node;
                }}
              >
                <div
                  className="pf-tile"
                  ref={(node) => {
                    tileRefs.current[idx] = node;
                  }}
                >
                  <img
                    src={tile.image}
                    alt={tile.alt}
                    loading={idx < 4 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </figure>
            ))}
            <span className="pf-slot pf-empty pf-x" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </span>
            <span className="pf-slot pf-empty pf-y" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </span>
            <span className="pf-slot pf-empty pf-z" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </span>
          </div>

          <a className="pf-tools" data-dock-hide="true" href="#claim">
            <span className="pf-tools-add">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>{" "}
              Add a tile
            </span>
            {[
              { label: "Photo", path: <><rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect><circle cx="9" cy="10" r="1.8"></circle><path d="M20.5 15.5l-4.5-4.5-8.5 8.5"></path></> },
              { label: "Video", path: <><rect x="3" y="6" width="13" height="12" rx="3"></rect><path d="M16 10.5l5-3v9l-5-3"></path></> },
              { label: "Link", path: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"></path></> },
              { label: "Product", path: <><path d="M5 8h14l-1 12H6z"></path><path d="M9 8V6.5a3 3 0 0 1 6 0V8"></path></> },
              { label: "Booking", path: <><rect x="3.5" y="5" width="17" height="15" rx="3"></rect><path d="M3.5 10h17M8 3v4M16 3v4"></path></> },
            ].map((tool, idx) => (
              <span key={tool.label} className="pf-tool" style={{ "--i": idx }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="1.7">
                  {tool.path}
                </svg>
                <span>{tool.label}</span>
              </span>
            ))}
          </a>
        </div>
      </div>
    </section>
  );
}
