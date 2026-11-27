"use client";

import { useState } from "react";

const FAQ_DATA = [
  {
    q: "What kind of brands do you work with?",
    a: "Consumer brands with something people can touch, taste or try: fashion, food and drink, beauty, wellness, sport and the occasional app with a real-world habit. Most clients have a launch, a new city or a community they want to grow.",
  },
  {
    q: "How far ahead should we book?",
    a: "Eight to ten weeks is comfortable for a pop-up or launch night. Community programs can start sooner because the first sessions are small. If your date is fixed and close, ask anyway: we keep a little room each season for quick turnarounds.",
  },
  {
    q: "What does a typical budget look like?",
    a: "Single events usually run from $40k to $250k including the build, depending on city, size and how long the doors stay open. Retainers are listed above and cover our team; production costs are quoted per event and approved before we spend them.",
  },
  {
    q: "Do you handle venues, permits and insurance?",
    a: "Yes. We scout and contract venues, file permits, carry event liability insurance and bring our own producers, crew and vendors. You approve the plan; we handle the paperwork.",
  },
  {
    q: "Who owns the content you capture?",
    a: "You do. Every photo, video and edit is delivered with full usage rights for organic and paid channels. Creator content follows the usage terms agreed with each creator up front, and we tell you exactly what they are before anyone posts.",
  },
  {
    q: "Can you run events outside our home city?",
    a: "We work across North America and Europe with local producers in nine cities, and we travel for everything else. Touring formats, where one concept moves city to city, are some of our favourite projects.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container faq-inner">
        <h2 id="faq-title" className="h2 faq-title" data-reveal="true">
          Questions, answered.
        </h2>
        <div className="faq-list">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                data-reveal="true"
                style={{ "--d": `${idx * 60}ms` } as React.CSSProperties}
              >
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-a"
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  inert={!isOpen}
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
