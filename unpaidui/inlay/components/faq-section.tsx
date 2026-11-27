"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "What is Inlay?",
    a: "A personal page you arrange like a gallery wall. Photos, videos, music, links, products, bookings and a newsletter sit side by side as tiles, at one short address you can put in any bio.",
    col: 0,
    delay: "0ms",
  },
  {
    q: "Is it really free?",
    a: "Yes. Pages, tiles, tips, bookings, products and analytics are free forever. On the Free plan we take 5% of sales; Plus removes that fee and adds your own domain and members-only tiles.",
    col: 0,
    delay: "50ms",
  },
  {
    q: "What can I put on my page?",
    a: "Anything you make or link to: images, video, audio, links with previews, posts from 40+ platforms, digital products, bookings, a newsletter sign-up and plain text.",
    col: 0,
    delay: "100ms",
  },
  {
    q: "How do payments work?",
    a: "Visitors pay with a card, Apple Pay or Google Pay without making an account. The money lands in your Inlay balance, and you move it to your bank or card whenever you like.",
    col: 0,
    delay: "150ms",
  },
  {
    q: "When do I get my money?",
    a: "Instantly, if you want it. Payouts to most banks and debit cards arrive in seconds; the fee is shown before you confirm. You can also schedule a free weekly payout.",
    col: 0,
    delay: "200ms",
  },
  {
    q: "Which countries are supported?",
    a: "Pages work everywhere. Inlay Pay is live in the EU, the UK and the US and is rolling out to more countries; join the early-access list to hear when it reaches you.",
    col: 1,
    delay: "0ms",
  },
  {
    q: "Can I use my own domain?",
    a: "On Plus, yes. Connect a domain you own (noa.studio instead of inlay.me/noa) and we handle certificates and redirects.",
    col: 1,
    delay: "50ms",
  },
  {
    q: "Do you track my visitors?",
    a: "No. Analytics are counted without cookies or fingerprinting, nothing is shared with advertisers, and your page never needs a cookie banner.",
    col: 1,
    delay: "100ms",
  },
  {
    q: "Can I take my page with me?",
    a: "Always. Export your tiles, files, sales history and subscriber list as standard formats at any time, and delete your account in one step.",
    col: 1,
    delay: "150ms",
  },
  {
    q: "Does it work for a band, shop or studio?",
    a: "Yes. A page can have several editors, and Plus adds a business name on receipts and monthly statements for your accountant.",
    col: 1,
    delay: "200ms",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const col0Items = FAQ_ITEMS.map((item, idx) => ({ ...item, globalIdx: idx })).filter(item => item.col === 0);
  const col1Items = FAQ_ITEMS.map((item, idx) => ({ ...item, globalIdx: idx })).filter(item => item.col === 1);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="head start">
          <h2 id="faq-title" className="tw-host h2" data-reveal="none">
            <span>Questions, answered.</span>
          </h2>
        </div>

        <div className="faq-cols">
          <div className="faq-col">
            {col0Items.map((item) => {
              const isOpen = openIndex === item.globalIdx;
              return (
                <div
                  key={item.globalIdx}
                  className="faq-item"
                  data-open={isOpen ? "true" : "false"}
                  data-reveal="true"
                  style={{ "--d": item.delay }}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${item.globalIdx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${item.globalIdx}`}
                      onClick={() => toggleItem(item.globalIdx)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq-a"
                    id={`faq-a-${item.globalIdx}`}
                    role="region"
                    aria-labelledby={`faq-q-${item.globalIdx}`}
                  >
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-col">
            {col1Items.map((item) => {
              const isOpen = openIndex === item.globalIdx;
              return (
                <div
                  key={item.globalIdx}
                  className="faq-item"
                  data-open={isOpen ? "true" : "false"}
                  data-reveal="true"
                  style={{ "--d": item.delay }}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${item.globalIdx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${item.globalIdx}`}
                      onClick={() => toggleItem(item.globalIdx)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" strokeWidth="2">
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq-a"
                    id={`faq-a-${item.globalIdx}`}
                    role="region"
                    aria-labelledby={`faq-q-${item.globalIdx}`}
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
      </div>
    </section>
  );
}
