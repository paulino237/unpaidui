"use client";

import { useEffect, useRef, useState } from "react";

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [drawA, setDrawA] = useState(0);
  const [drawB, setDrawB] = useState(0);
  const [activePins, setActivePins] = useState([true, true, true, true, true]);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = el.offsetHeight - windowH;

      if (totalDist <= 0) {
        setDrawA(0);
        setDrawB(0);
        return;
      }

      // progress 0 to 1 as it scrolls through the 400vh
      const progress = Math.min(1, Math.max(0, -rect.top / totalDist));

      setIsDark(progress > 0.02);
      setIsAnswered(progress > 0.7);

      // Typical launch line draws between 0.05 and 0.4
      const pA = Math.min(1, Math.max(0, (progress - 0.05) / 0.35));
      const valA = 1 - pA;
      setDrawA(valA);

      // Ours line draws between 0.35 and 0.75
      const pB = Math.min(1, Math.max(0, (progress - 0.35) / 0.4));
      const valB = 1 - pB;
      setDrawB(valB);

      setActivePins([
        pA >= 0.15,
        pA >= 0.35,
        pA >= 0.55,
        pA >= 0.75,
        pA >= 0.95,
      ]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`problem ${isDark ? "is-dark" : ""} ${isAnswered ? "is-answered" : ""}`}
      aria-labelledby="problem-title"
      style={{
        "--draw-a": drawA.toFixed(4),
        "--draw-b": drawB.toFixed(4),
      } as React.CSSProperties}
    >
      <div className="problem-sticky container">
        <div className="problem-head">
          <h2 id="problem-title" className="h1 problem-title" data-static="Most launches are forgotten by Monday.">
            <span className="tm">
              <span className="sr-only">
                {isAnswered ? "Ours are still posting by Friday." : "Most launches are forgotten by Monday."}
              </span>
              <span aria-hidden="true" className="tm-w">
                <span className="tm-g">
                  {isAnswered ? "Ours are still posting by Friday." : "Most launches are forgotten by Monday."}
                </span>
              </span>
            </span>
          </h2>
          <ul className="problem-legend" aria-hidden="true">
            <li className={drawA < 0.9 ? "is-on" : ""}>
              <span className="legend-line is-typical" />
              A typical launch
            </li>
            <li className={drawB < 0.9 ? "is-on" : ""}>
              <span className="legend-line is-ours" />
              With Turnout
            </li>
          </ul>
        </div>

        <div className="chart">
          <svg className="chart-svg" viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
            <line className="chart-day" x1="70" x2="70" y1="20" y2="372" />
            <line className="chart-day" x1="202.5" x2="202.5" y1="20" y2="372" />
            <line className="chart-day" x1="335" x2="335" y1="20" y2="372" />
            <line className="chart-day" x1="467.5" x2="467.5" y1="20" y2="372" />
            <line className="chart-day" x1="600" x2="600" y1="20" y2="372" />
            <line className="chart-day" x1="732.5" x2="732.5" y1="20" y2="372" />
            <line className="chart-day" x1="865" x2="865" y1="20" y2="372" />
            <line className="chart-day" x1="997.5" x2="997.5" y1="20" y2="372" />
            <line className="chart-day" x1="1130" x2="1130" y1="20" y2="372" />
            <line className="chart-base" x1="0" x2="1200" y1="372" y2="372" />
            <path
              className="chart-line is-typical"
              d="M20 364 C60 360 92 300 112 160 S140 66 158 74 S190 170 218 222 S300 300 338 322 S420 352 480 362 S560 370 600 372 L1180 372"
              pathLength={1}
            />
            <path
              className="chart-line is-ours"
              d="M20 342 C60 302 90 240 116 110 S142 30 160 38 S196 130 222 120 S262 70 296 96 S352 160 392 128 S452 92 494 118 S560 170 604 140 S668 100 716 122 S790 170 842 132 S912 104 960 126 S1036 160 1084 120 S1150 104 1180 112"
              pathLength={1}
            />
            <text className="chart-label is-launch" x="70" y="406">Thu</text>
            <text className="chart-label" x="202.5" y="406">Fri</text>
            <text className="chart-label" x="335" y="406">Sat</text>
            <text className="chart-label" x="467.5" y="406">Sun</text>
            <text className="chart-label is-monday" x="600" y="406">Mon</text>
            <text className="chart-label" x="732.5" y="406">Tue</text>
            <text className="chart-label" x="865" y="406">Wed</text>
            <text className="chart-label" x="997.5" y="406">Thu</text>
            <text className="chart-label" x="1130" y="406">Fri</text>
            <text className="chart-sub" x="70" y="430">Launch night</text>
          </svg>

          <ul className="chart-pins">
            <li className={`pin is-up ${activePins[0] ? "is-on" : ""}`} style={{ left: "6%", top: "80.8695652173913%", "--i": 0 } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-card">
                <span className="pin-icon" aria-hidden="true">
                  <span className="swap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-on="true">
                      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                    </svg>
                  </span>
                </span>
                <span className="pin-text">Guest lists full of no-shows</span>
              </span>
            </li>
            <li className={`pin is-down ${activePins[1] ? "is-on" : ""}`} style={{ left: "12.5%", top: "80.8695652173913%", "--i": 1 } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-card">
                <span className="pin-icon" aria-hidden="true">
                  <span className="swap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-on="true">
                      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                    </svg>
                  </span>
                </span>
                <span className="pin-text">Pop-ups that photograph badly</span>
              </span>
            </li>
            <li className={`pin is-up ${activePins[2] ? "is-on" : ""}`} style={{ left: "20.666666666666668%", top: "80.8695652173913%", "--i": 2 } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-card">
                <span className="pin-icon" aria-hidden="true">
                  <span className="swap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-on="true">
                      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                    </svg>
                  </span>
                </span>
                <span className="pin-text">A launch post nobody saves</span>
              </span>
            </li>
            <li className={`pin is-up ${activePins[3] ? "is-on" : ""}`} style={{ left: "31.666666666666664%", top: "80.8695652173913%", "--i": 3 } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-card">
                <span className="pin-icon" aria-hidden="true">
                  <span className="swap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-on="true">
                      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                    </svg>
                  </span>
                </span>
                <span className="pin-text">Creators who post once and vanish</span>
              </span>
            </li>
            <li className={`pin is-up ${activePins[4] ? "is-on" : ""}`} style={{ left: "46.666666666666664%", top: "80.8695652173913%", "--i": 4 } as React.CSSProperties}>
              <span className="pin-dot" aria-hidden="true" />
              <span className="pin-card">
                <span className="pin-icon" aria-hidden="true">
                  <span className="swap">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-on="true">
                      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                    </svg>
                  </span>
                </span>
                <span className="pin-text">Nothing left to post the morning after</span>
              </span>
            </li>
          </ul>

          <span className="chart-end" aria-hidden="true">Still posting · day 9</span>
        </div>

        <p className="h2 problem-answer">Ours are still posting by Friday.</p>
      </div>
    </section>
  );
}
