"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { RotatingCards } from "./rotating-cards";

// 11 cards — exact same list and images as the original
const CARDS = [
  { id: 1,  label: "Chrome Extension",  image: "/img/chrome-extension.webp"  },
  { id: 2,  label: "Safari Extension",  image: "/img/safari-extension.webp"  },
  { id: 3,  label: "API Access",        image: "/img/api-access.webp"        },
  { id: 4,  label: "Article Summary",   image: "/img/article-summary.webp"   },
  { id: 5,  label: "Video Summary",     image: "/img/video-summary.webp"     },
  { id: 6,  label: "Podcast Summary",   image: "/img/podcast-summary.webp"   },
  { id: 7,  label: "PDF Summary",       image: "/img/pdf-summary.webp"       },
  { id: 8,  label: "Research Papers",   image: "/img/research-papers.webp"   },
  { id: 9,  label: "Social Threads",    image: "/img/social-threads.webp"    },
  { id: 10, label: "Email Digest",      image: "/img/email-digest.webp"      },
  { id: 11, label: "Book Summary",      image: "/img/book-summary.webp"      },
];

// Blur-in letter-by-letter — exact animation from original JS
function BlurInTitle() {
  const text = "No More Time To Waste";
  return (
    <h1 className="mb-8 text-5xl font-medium tracking-tighter md:text-8xl lg:text-8xl">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: 0.03 * i,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}

export function HeroSection() {
  return (
    <section
      /* Original: relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-6 pt-40 sm:pt-82 */
      className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-6 pt-40 sm:pt-[20.5rem]"
    >
      {/* ── Title + subtitle ── */}
      <div className="relative z-10 mx-auto md:text-center">
        <BlurInTitle />

        <motion.p
          className="text-muted-foreground mx-auto mt-6 max-w-xl text-2xl tracking-tight md:text-3xl"
          style={{ lineHeight: "3rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <span className="text-foreground bg-foreground/5 inline-block rounded-md px-2 py-0.5 leading-10">
            Read less
          </span>{" "}
          &{" "}
          <span className="text-foreground bg-foreground/5 inline-block rounded-full px-4 py-0.5 leading-10">
            know more
          </span>{" "}
          Save{" "}
          <span className="text-foreground bg-foreground/5 inline-block rounded-md px-2 py-0.5 leading-10">
            hours
          </span>{" "}
          every week with AI summaries done right.
        </motion.p>
      </div>

      {/* ── RotatingCards orb — exact params from original ──
          radius=1000, cardWidth=350, cardHeight=275, duration=100,
          initialRotation=-90, showTrackLine, trackLineOffset=25
          Total canvas = 2350 × 2275 → matches original exactly
      ── */}
      <div
        className="relative -mx-6 mt-2 w-screen overflow-hidden"
        style={{
          /* h-100 mobile, responsive via CSS */
          height: "25rem",
          maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      >
        <style>{`
          @media (min-width: 640px)  { .orb-height { height: 31.25rem !important; } }
          @media (min-width: 768px)  { .orb-height { height: 34.375rem !important; } }
          @media (min-width: 1024px) { .orb-height { height: 37.5rem !important; } }
          @media (min-width: 1280px) { .orb-height { height: 43.75rem !important; } }
        `}</style>
        <div
          className="orb-height absolute left-1/2 -translate-x-1/2"
          style={{ top: "6.25rem" }}
        >
          <div className="origin-top scale-[0.6] lg:scale-[0.7] xl:scale-100">
            <RotatingCards
              cards={CARDS}
              radius={1000}
              cardWidth={350}
              cardHeight={275}
              duration={100}
              pauseOnHover
              autoPlay
              initialRotation={-90}
              showTrackLine
              trackLineOffset={25}
              cardClassName="rounded-md"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom CTA block ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pb-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          Turn Hours of Content <br /> Into Fast Insight
        </h2>

        <motion.a
          href="#"
          className="bg-accent group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-md py-3 pl-5 pr-3 font-medium text-black shadow-lg shadow-accent/25 transition-all duration-500 ease-out hover:rounded-[50px] hover:shadow-xl hover:shadow-accent/40 sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Get Started Free</span>
          <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative left-px"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
