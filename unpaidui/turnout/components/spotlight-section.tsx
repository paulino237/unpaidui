"use client";

import { useState } from "react";

interface SpotlightProject {
  id: string;
  num: string;
  name: string;
  kind: string;
  accent: string;
  metric: string;
  title: string;
  stat1Num: string;
  stat1Label: string;
  stat2Num: string;
  stat2Label: string;
  image: string;
  alt: string;
}

const PROJECTS: SpotlightProject[] = [
  {
    id: "halfmoon",
    num: "01",
    name: "Halfmoon",
    kind: "Pop-up",
    accent: "iris",
    metric: "3-day pop-up · 6,200 guests",
    title: "The Cold Room: a three-day puffer pop-up",
    stat1Num: "48",
    stat1Label: "hours to sell out the first drop",
    stat2Num: "1.4M",
    stat2Label: "organic views in two weeks",
    image: "/images/work-halfmoon.webp",
    alt: "A model in a black puffer jacket on a lime platform while guests film her",
  },
  {
    id: "northpaw",
    num: "02",
    name: "Northpaw",
    kind: "Community",
    accent: "lime",
    metric: "Sunday run club · 12 cities",
    title: "Turning a pet care launch into a running habit",
    stat1Num: "12",
    stat1Label: "cities hosting weekly clubs",
    stat2Num: "420k",
    stat2Label: "community video impressions",
    image: "/images/work-northpaw.webp",
    alt: "A golden retriever in a periwinkle bandana leaping ahead of runners",
  },
  {
    id: "saltwork",
    num: "03",
    name: "Saltwork",
    kind: "Pop-up",
    accent: "blush",
    metric: "Dining residency · 3 weeks",
    title: "A salt tasting room with a secret supper club",
    stat1Num: "21",
    stat1Label: "consecutive sold-out nights",
    stat2Num: "850k",
    stat2Label: "saves across social media",
    image: "/images/work-saltwork.webp",
    alt: "A long candlelit dinner table set with minimalist ceramics",
  },
  {
    id: "fernway",
    num: "04",
    name: "Fernway",
    kind: "Launch",
    accent: "lime",
    metric: "12 supper clubs · 4 cities",
    title: "Launching non-alcoholic spirits around a shared table",
    stat1Num: "12",
    stat1Label: "gatherings across 4 hubs",
    stat2Num: "1.1M",
    stat2Label: "views from attendee clips",
    image: "/images/work-fernway.webp",
    alt: "Hands reaching across a long table of colourful dishes",
  },
  {
    id: "orbit",
    num: "05",
    name: "Orbit Coffee",
    kind: "Launch",
    accent: "stone",
    metric: "Tokyo coffee lab · 48 hours",
    title: "A 48-hour pop-up coffee bar in Omotesando",
    stat1Num: "2.4k",
    stat1Label: "drinks pulled over 2 days",
    stat2Num: "620k",
    stat2Label: "hashtag views on TikTok",
    image: "/images/work-orbit.webp",
    alt: "Barista pouring single-origin espresso at a minimalist counter",
  },
];

export function SpotlightSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = PROJECTS[activeIndex];

  return (
    <section className="section spotlight" aria-labelledby="spotlight-title">
      <div className="container">
        <div className="section-head split">
          <div className="services-titles">
            <span className="tag" data-reveal="true">
              Inside the work
            </span>
            <h2 id="spotlight-title" className="h2" data-reveal="true" style={{ "--d": "80ms" } as React.CSSProperties}>
              What a turnout leaves behind.
            </h2>
          </div>
          <p className="lead services-intro" data-reveal="true" style={{ "--d": "160ms" } as React.CSSProperties}>
            The night is the start. Here&#x27;s what each one was still doing weeks later.
          </p>
        </div>

        <div className="showcase" data-running="false" data-reveal="true">
          <div className="showcase-index" role="tablist" aria-label="What a turnout leaves behind." aria-orientation="vertical">
            {PROJECTS.map((p, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`spotlight-tab-${p.id}`}
                  aria-selected={isSelected}
                  aria-controls="spotlight-panel"
                  className={`showcase-tab ${isSelected ? "is-selected" : ""}`}
                  data-accent={p.accent}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="showcase-num">{p.num}</span>
                  <span className="showcase-name">
                    {p.name}
                    <span className="showcase-kind">{p.kind}</span>
                  </span>
                  <span className="showcase-swatch" aria-hidden="true" />
                  {isSelected && <span className="showcase-timer" aria-hidden="true"><span /></span>}
                </button>
              );
            })}
          </div>

          <div className="showcase-card" data-accent={current.accent} id="spotlight-panel" role="tabpanel" aria-labelledby={`spotlight-tab-${current.id}`}>
            <figure className="showcase-media">
              {PROJECTS.map((p, idx) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt={p.alt}
                  aria-hidden={activeIndex !== idx}
                  className={activeIndex === idx ? "is-on" : ""}
                  width="816"
                  height="816"
                  loading="lazy"
                />
              ))}
              <span className="showcase-metric">
                {current.metric}
              </span>
            </figure>

            <div className="showcase-copy">
              <h3 className="h2 showcase-title">
                {current.title}
              </h3>

              <dl className="showcase-results">
                <div className="showcase-result">
                  <dd className="showcase-result-figure">{current.stat1Num}</dd>
                  <dt className="showcase-result-label">{current.stat1Label}</dt>
                </div>

                <div className="showcase-result">
                  <dd className="showcase-result-figure">{current.stat2Num}</dd>
                  <dt className="showcase-result-label">{current.stat2Label}</dt>
                </div>
              </dl>

              <div className="showcase-foot">
                <a className="action action-ink action-md" href="#work">
                  <span className="action-pill">
                    <span className="sr-only">Read the case study</span>
                    <span className="roll" aria-hidden="true">
                      {"Read the case study".split("").map((c, i) => (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
