"use client";

import { useEffect, useRef } from "react";

export function SeasonSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const isDesktop = window.matchMedia("(min-width: 861px)").matches;
      if (!isDesktop) {
        track.style.removeProperty("--x");
        if (railRef.current) railRef.current.style.removeProperty("--fill");
        return;
      }

      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      pin.style.height = `${maxScroll + window.innerHeight}px`;

      const rect = pin.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / maxScroll));

      track.style.setProperty("--x", `${(-progress * maxScroll).toFixed(1)}px`);
      if (railRef.current) {
        railRef.current.style.setProperty("--fill", progress.toFixed(4));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="season" aria-labelledby="season-label">
      <div className="container season-intro">
        <span id="season-label" className="tag" data-reveal="true">
          What we do
        </span>
        <p className="h2 statement">
          <span className="statement-word" style={{ "--w": "0.000" } as React.CSSProperties}>We </span>
          <span className="statement-word" style={{ "--w": "0.059" } as React.CSSProperties}>design </span>
          <span className="statement-word" style={{ "--w": "0.118" } as React.CSSProperties}>the </span>
          <span className="statement-word" style={{ "--w": "0.176" } as React.CSSProperties}>moments </span>
          <span className="statement-word" style={{ "--w": "0.235" } as React.CSSProperties}>people </span>
          <span className="statement-word" style={{ "--w": "0.294" } as React.CSSProperties}>show </span>
          <span className="statement-word" style={{ "--w": "0.353" } as React.CSSProperties}>up </span>
          <span className="statement-word" style={{ "--w": "0.412" } as React.CSSProperties}>for, </span>
          <span className="statement-word" style={{ "--w": "0.471" } as React.CSSProperties}>then </span>
          <span className="statement-word" style={{ "--w": "0.529" } as React.CSSProperties}>turn </span>
          <span className="statement-word" style={{ "--w": "0.588" } as React.CSSProperties}>each </span>
          <span className="statement-word" style={{ "--w": "0.647" } as React.CSSProperties}>one </span>
          <span className="statement-word" style={{ "--w": "0.706" } as React.CSSProperties}>into </span>
          <span className="statement-word" style={{ "--w": "0.765" } as React.CSSProperties}>a </span>
          <span className="statement-word" style={{ "--w": "0.824" } as React.CSSProperties}>season </span>
          <span className="statement-word" style={{ "--w": "0.882" } as React.CSSProperties}>of </span>
          <span className="statement-word" style={{ "--w": "0.941" } as React.CSSProperties}>content.</span>
        </p>
      </div>

      <div ref={pinRef} className="season-pin">
        <div className="season-sticky">
          <div className="season-rail" aria-hidden="true">
            <span ref={railRef} className="season-rail-fill" />
          </div>

          <ol ref={trackRef} className="season-track">
            {/* Step 1 */}
            <li className="season-step is-wide" data-accent="lime" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="season-when">
                <span className="season-dot" aria-hidden="true" />
                Doors open
              </span>
              <figure className="season-media">
                <img
                  src="/images/feature-line.webp"
                  alt="A line of guests with tote bags queuing outside a white storefront pop-up"
                  width="720"
                  height="720"
                  loading="lazy"
                />
                <figcaption className="season-stat">
                  <span className="season-figure">
                    <span className="nr">
                      <span className="sr-only">18,400</span>
                      <span aria-hidden="true" className="nr-v">
                        <span className="nr-p">18,400</span>
                      </span>
                    </span>
                  </span>
                  <span className="season-stat-label">guests queued in 2026</span>
                </figcaption>
              </figure>
              <div className="season-copy">
                <h3 className="h3 season-title">Built for the line around the block.</h3>
                <p className="season-body">
                  People queue when something feels rare. We design storefronts, signage and early access moments that turn waiting into the first thing people post.
                </p>
              </div>
            </li>

            {/* Step 2 */}
            <li className="season-step is-square" data-accent="iris" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="season-when">
                <span className="season-dot" aria-hidden="true" />
                In the room
              </span>
              <figure className="season-media">
                <img
                  src="/images/work-halfmoon.webp"
                  alt="A model on a lime platform wearing a black puffer jacket"
                  width="720"
                  height="720"
                  loading="lazy"
                />
              </figure>
              <div className="season-copy">
                <h3 className="h3 season-title">A moment worth filming.</h3>
                <p className="season-body">
                  Every lighting cue, plinth and tasting counter is set for the camera in someone&#x27;s hand, not a tripod at the back.
                </p>
              </div>
            </li>

            {/* Step 3 */}
            <li className="season-step is-creators" data-accent="blush" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="season-when">
                <span className="season-dot" aria-hidden="true" />
                The creators
              </span>
              <div className="season-avatars" aria-hidden="true">
                <img src="/images/avatar-mei.webp" alt="" width="112" height="112" loading="lazy" />
                <img src="/images/avatar-daniel.webp" alt="" width="112" height="112" loading="lazy" />
                <img src="/images/avatar-aoife.webp" alt="" width="112" height="112" loading="lazy" />
                <img src="/images/avatar-ravi.webp" alt="" width="112" height="112" loading="lazy" />
              </div>
              <div className="season-copy">
                <h3 className="h3 season-title">Guests who make your reach.</h3>
                <p className="season-body">
                  We don&#x27;t hire rosters. We invite creators who genuinely wear, eat, drink or use the product, then give them reasons to capture it their way.
                </p>
              </div>
            </li>

            {/* Step 4 */}
            <li className="season-step is-video" data-accent="stone" style={{ "--i": 3 } as React.CSSProperties}>
              <span className="season-when">
                <span className="season-dot" aria-hidden="true" />
                48 hours later
              </span>
              <figure className="season-media">
                <img
                  src="/images/feature-creator.webp"
                  alt="A guest laughing with friends at a dinner table while holding a small camera"
                  width="720"
                  height="720"
                  loading="lazy"
                />
                <figcaption className="season-stat">
                  <span className="season-figure">
                    <span className="nr">
                      <span className="sr-only">6.2M</span>
                      <span aria-hidden="true" className="nr-v">
                        <span className="nr-p">6.2M</span>
                      </span>
                    </span>
                  </span>
                  <span className="season-stat-label">organic impressions per run</span>
                </figcaption>
              </figure>
              <div className="season-copy">
                <h3 className="h3 season-title">Every guest leaves with something to post.</h3>
                <p className="season-body">
                  A photo drop before they wake up, vertical cutdowns by Monday morning and raw clips your social team can edit for weeks.
                </p>
              </div>
            </li>

            {/* Step 5 */}
            <li className="season-step is-square" data-accent="iris" style={{ "--i": 4 } as React.CSSProperties}>
              <span className="season-when">
                <span className="season-dot" aria-hidden="true" />
                Month two
              </span>
              <figure className="season-media">
                <img
                  src="/images/hero-runclub.webp"
                  alt="A run club running over a bridge at dawn"
                  width="720"
                  height="720"
                  loading="lazy"
                />
                <figcaption className="season-stat">
                  <span className="season-figure">
                    <span className="nr">
                      <span className="sr-only">100+</span>
                      <span aria-hidden="true" className="nr-v">
                        <span className="nr-p">100+</span>
                      </span>
                    </span>
                  </span>
                  <span className="season-stat-label">members every Sunday</span>
                </figcaption>
              </figure>
              <div className="season-copy">
                <h3 className="h3 season-title">The room becomes a ritual.</h3>
                <p className="season-body">
                  Run clubs and supper series bring the same faces back every week, with hosts and routes your brand keeps.
                </p>
              </div>
            </li>

            {/* Step 6 */}
            <li className="season-step is-report" data-accent="lime" style={{ "--i": 5 } as React.CSSProperties}>
              <span className="season-when">
                <span className="season-dot" aria-hidden="true" />
                Week ten
              </span>
              <div className="season-copy">
                <h3 className="h3 season-title">The turnout report.</h3>
                <p className="season-body">
                  Guests, reach, saves and sales on one page, with what we&#x27;d change next time. Then we plan the next night.
                </p>
                <a className="action action-ink action-md" href="#pricing">
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
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
