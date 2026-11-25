"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface InsightArticle {
  tag: string;
  date: string;
  title: string;
  image: string;
}

const ARTICLES: InsightArticle[] = [
  {
    tag: "Technology Selection",
    date: "March 4, 2026",
    title: "Your CRM is not the problem. Your process is.",
    image:
      "https://framerusercontent.com/images/38NpwzghYIptRRbFZ6Soejx3wVY.jpeg?width=2400&height=1347",
  },
  {
    tag: "Implementation",
    date: "March 3, 2026",
    title: "5 growth levers most companies ignore until it is too late.",
    image:
      "https://framerusercontent.com/images/OqCGYrjHIzy11F9CWaDgfYAzKQ.jpg?width=2400&height=1350",
  },
];

export function InsightsSection() {
  return (
    <section id="insights" className="relative bg-[#f5f5e9] py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Subtitle & View All Button (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#242424] tracking-[-0.035em]">
                Insights.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#616161] leading-relaxed font-normal max-w-[320px]">
                Lessons, frameworks, and honest takes on what it actually takes
                to grow.
              </p>
            </div>

            <div className="mt-8 sm:mt-12">
              <a
                href="#insights"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#242424] hover:bg-black text-white text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>View All</span>
                <span className="size-1.5 rounded-full bg-white" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: 2 Editorial Article Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ARTICLES.map((article, idx) => (
              <motion.a
                key={article.title}
                href="#insights"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-[32px] overflow-hidden aspect-[4/5] p-7 flex flex-col justify-between shadow-xl cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35 pointer-events-none" />

                {/* Top: Category Tag */}
                <div className="relative z-10">
                  <span className="inline-block px-3.5 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white text-xs font-medium tracking-wide">
                    {article.tag}
                  </span>
                </div>

                {/* Bottom: Date & Headline */}
                <div className="relative z-10">
                  <span className="text-xs text-white/75 font-normal block mb-2">
                    {article.date}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug group-hover:text-[#5dc39b] transition-colors">
                    {article.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
