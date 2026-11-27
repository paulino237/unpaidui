"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [isIn, setIsIn] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsIn(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  // Smooth conveyor belt animation for filmstrip
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;
      velocityRef.current += delta * 0.15;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animFrame: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const deltaMs = Math.min(32, now - lastTime);
      lastTime = now;

      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (halfWidth > 0) {
          velocityRef.current *= 0.92;
          const speed = (0.5 + Math.abs(velocityRef.current) * 0.6) * (deltaMs / 16);
          offsetRef.current -= speed;

          if (offsetRef.current <= -halfWidth) {
            offsetRef.current += halfWidth;
          }
          trackRef.current.style.transform = `translate3d(${offsetRef.current.toFixed(1)}px, 0, 0)`;
        }
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section className={`hero ${isIn ? "is-in" : ""}`} aria-labelledby="hero-title">
      <div className="container hero-top">
        <span className="hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          Now booking spring 2027
        </span>
        <a className="latest" href="#work">
          <span className="latest-thumb">
            <img src="/images/work-halfmoon.webp" alt="" width="96" height="96" />
          </span>
          <span className="latest-copy">
            <span className="latest-label">Just wrapped</span>
            <span className="latest-title">Halfmoon</span>
          </span>
          <span className="arrow-dot arrow-dot-ink" style={{ width: 30, height: 30 }} aria-hidden="true">
            <span className="throw" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </span>
        </a>
      </div>

      <h1 id="hero-title" className={`container display hero-title lines ${isIn ? "is-in" : ""}`}>
        <span className="sr-only">Moments people show up for.</span>
        <span aria-hidden="true">
          <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
            <span>
              <span>Moments </span>
              <span className="capsule" aria-hidden="true" style={{ "--o": 0 } as React.CSSProperties}>
                <img src="/images/hero-popup.webp" alt="" width="240" height="120" style={{ "--k": 0 } as React.CSSProperties} />
                <img src="/images/hero-supper.webp" alt="" width="240" height="120" style={{ "--k": 1 } as React.CSSProperties} />
                <img src="/images/hero-runclub.webp" alt="" width="240" height="120" style={{ "--k": 2 } as React.CSSProperties} />
              </span>
              <span> people</span>
            </span>
          </span>
          <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
            <span>
              <span>show up </span>
              <span className="capsule" aria-hidden="true" style={{ "--o": 1 } as React.CSSProperties}>
                <img src="/images/svc-launch.webp" alt="" width="240" height="120" style={{ "--k": 0 } as React.CSSProperties} />
                <img src="/images/svc-creators.webp" alt="" width="240" height="120" style={{ "--k": 1 } as React.CSSProperties} />
                <img src="/images/svc-community.webp" alt="" width="240" height="120" style={{ "--k": 2 } as React.CSSProperties} />
              </span>
              <span> for.</span>
            </span>
          </span>
        </span>
      </h1>

      <div className="container hero-row">
        <ul className="hero-services">
          <li style={{ "--i": 0 } as React.CSSProperties}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 1.5c.7 4.6 2.2 6.4 6.9 7.6.6.2.6 1 0 1.2-4.7 1.2-6.2 3-6.9 7.6-.1.7-1.1.7-1.2 0-.7-4.6-2.2-6.4-6.9-7.6-.6-.2-.6-1 0-1.2 4.7-1.2 6.2-3 6.9-7.6.1-.7 1.1-.7 1.2 0Z" transform="translate(.6 2.4)" />
            </svg>
            Pop-ups &amp; launches
          </li>
          <li style={{ "--i": 1 } as React.CSSProperties}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 1.5c.7 4.6 2.2 6.4 6.9 7.6.6.2.6 1 0 1.2-4.7 1.2-6.2 3-6.9 7.6-.1.7-1.1.7-1.2 0-.7-4.6-2.2-6.4-6.9-7.6-.6-.2-.6-1 0-1.2 4.7-1.2 6.2-3 6.9-7.6.1-.7 1.1-.7 1.2 0Z" transform="translate(.6 2.4)" />
            </svg>
            Community programs
          </li>
          <li style={{ "--i": 2 } as React.CSSProperties}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 1.5c.7 4.6 2.2 6.4 6.9 7.6.6.2.6 1 0 1.2-4.7 1.2-6.2 3-6.9 7.6-.1.7-1.1.7-1.2 0-.7-4.6-2.2-6.4-6.9-7.6-.6-.2-.6-1 0-1.2 4.7-1.2 6.2-3 6.9-7.6.1-.7 1.1-.7 1.2 0Z" transform="translate(.6 2.4)" />
            </svg>
            Creator trips
          </li>
        </ul>

        <p className="lead hero-lead">
          We design, build and film brand experiences, then turn every one into a season of content your team can post for weeks.
        </p>

        <a className="action action-ink action-lg hero-action" href="#pricing">
          <span className="action-pill">
            <span className="sr-only">Plan an event</span>
            <span className="roll" aria-hidden="true">
              {"Plan an event".split("").map((c, i) => (
                <span key={i} className="roll-c" style={{ "--i": i } as React.CSSProperties}>
                  <span>{c === " " ? "\u00A0" : c}</span>
                  <span>{c === " " ? "\u00A0" : c}</span>
                </span>
              ))}
            </span>
          </span>
          <span className="action-dot">
            <span className="throw" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </span>
        </a>
      </div>

      <div ref={filmstripRef} className="hero-reel">
        <div className="filmstrip">
          <ul ref={trackRef} className="filmstrip-track">
            {/* Copy 1 */}
            <li className="frame" aria-hidden={false} style={{ "--i": 0 } as React.CSSProperties}>
              <img src="/images/hero-popup.webp" alt="A guest laughing as she films a brand pop-up on her phone" width="360" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Pop-up · Brooklyn</span>
            </li>
            <li className="frame is-wide" aria-hidden={false} style={{ "--i": 1 } as React.CSSProperties}>
              <img src="/images/work-halfmoon.webp" alt="A model in a black puffer jacket on a lime platform while guests film her" width="640" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Halfmoon · The Cold Room</span>
            </li>
            <li className="frame" aria-hidden={false} style={{ "--i": 2 } as React.CSSProperties}>
              <img src="/images/hero-supper.webp" alt="A guest raising a glass at a long-table supper club in a greenhouse" width="360" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Supper club · Lisbon</span>
            </li>
            <li className="frame is-wide" aria-hidden={false} style={{ "--i": 3 } as React.CSSProperties}>
              <img src="/images/svc-launch.webp" alt="Guests cheering as confetti falls over a launch stage" width="640" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Launch night · Austin</span>
            </li>
            <li className="frame" aria-hidden={false} style={{ "--i": 4 } as React.CSSProperties}>
              <img src="/images/hero-runclub.webp" alt="A run club crossing a city bridge at sunrise" width="360" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Run club · London</span>
            </li>
            <li className="frame is-wide" aria-hidden={false} style={{ "--i": 5 } as React.CSSProperties}>
              <img src="/images/work-fernway.webp" alt="Hands reaching across a long table of colourful dishes" width="640" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Fernway · 12 dinners</span>
            </li>
            <li className="frame" aria-hidden={false} style={{ "--i": 6 } as React.CSSProperties}>
              <img src="/images/svc-creators.webp" alt="A creator filming a friend jumping into a motel pool" width="360" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Creator trip · Palm Springs</span>
            </li>
            <li className="frame is-wide" aria-hidden={false} style={{ "--i": 7 } as React.CSSProperties}>
              <img src="/images/work-northpaw.webp" alt="A golden retriever in a periwinkle bandana leaping ahead of a group of runners" width="640" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Northpaw · Sunday club</span>
            </li>
            {/* Copy 2 for seamless wrap */}
            <li className="frame" aria-hidden={true} style={{ "--i": 0 } as React.CSSProperties}>
              <img src="/images/hero-popup.webp" alt="" width="360" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Pop-up · Brooklyn</span>
            </li>
            <li className="frame is-wide" aria-hidden={true} style={{ "--i": 1 } as React.CSSProperties}>
              <img src="/images/work-halfmoon.webp" alt="" width="640" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Halfmoon · The Cold Room</span>
            </li>
            <li className="frame" aria-hidden={true} style={{ "--i": 2 } as React.CSSProperties}>
              <img src="/images/hero-supper.webp" alt="" width="360" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Supper club · Lisbon</span>
            </li>
            <li className="frame is-wide" aria-hidden={true} style={{ "--i": 3 } as React.CSSProperties}>
              <img src="/images/svc-launch.webp" alt="" width="640" height="480" loading="eager" draggable="false" />
              <span className="frame-caption">Launch night · Austin</span>
            </li>
            <li className="frame" aria-hidden={true} style={{ "--i": 4 } as React.CSSProperties}>
              <img src="/images/hero-runclub.webp" alt="" width="360" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Run club · London</span>
            </li>
            <li className="frame is-wide" aria-hidden={true} style={{ "--i": 5 } as React.CSSProperties}>
              <img src="/images/work-fernway.webp" alt="" width="640" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Fernway · 12 dinners</span>
            </li>
            <li className="frame" aria-hidden={true} style={{ "--i": 6 } as React.CSSProperties}>
              <img src="/images/svc-creators.webp" alt="" width="360" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Creator trip · Palm Springs</span>
            </li>
            <li className="frame is-wide" aria-hidden={true} style={{ "--i": 7 } as React.CSSProperties}>
              <img src="/images/work-northpaw.webp" alt="" width="640" height="480" loading="lazy" draggable="false" />
              <span className="frame-caption">Northpaw · Sunday club</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
