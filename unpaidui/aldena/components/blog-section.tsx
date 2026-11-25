"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface BlogPost {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  role: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "the-art-of-white-space-in-modern-interfaces",
    category: "Design",
    date: "Jun 2, 2026",
    title: "The art of white space in designing user interfaces",
    excerpt:
      "Understanding how negative space shapes user experience and visual hierarchy.",
    image:
      "https://framerusercontent.com/images/rnAwUwI9QEUlWFS2AfAcBqfS2E.png?width=1200&height=800",
    author: "Claire Smith",
    role: "Senior Designer",
  },
  {
    slug: "building-a-brand-voice-that-lasts",
    category: "Branding",
    date: "Jun 9, 2026",
    title: "Building a brand voice that lasts for our clients",
    excerpt:
      "How to define a tone of voice that stays consistent as your company grows.",
    image:
      "https://framerusercontent.com/images/GFfZxqU7yP7bDfc4SYK6oTjxhP0.png?width=1200&height=900",
    author: "Marcus Bennett",
    role: "Brand Strategist",
  },
  {
    slug: "designing-for-performance-from-day-one",
    category: "Development",
    date: "Jun 16, 2026",
    title: "Designing for performance from day one",
    excerpt:
      "Why speed is a design decision long before it becomes an engineering one.",
    image:
      "https://framerusercontent.com/images/yvaxkMMXh26b1c0HcnRgQxBeYE.png?width=1200&height=800",
    author: "Elena Ruiz",
    role: "Marketing Lead",
  },
];

const HEADER_WORDS = ["From", "the", "studio."];

export function BlogSection() {
  return (
    <section
      id="blog"
      className="relative z-[3] flex w-full flex-col items-center justify-center overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-16 px-6 sm:gap-20 lg:px-10">
        {/* Centered Section Header */}
        <div className="flex w-full max-w-[800px] flex-col items-center text-center">
          <h2 className="flex flex-wrap justify-center gap-x-[0.3em] font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-black">
            {HEADER_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.001, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                  mass: 1,
                  delay: 0.1 + i * 0.05,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 40,
              mass: 1,
              delay: 0.25,
            }}
            className="mt-4 font-sans text-[15px] font-medium leading-[1.4] tracking-[-0.02em] text-[#605f5f]"
          >
            Essays, notes, and perspectives on brand, design, and the craft of
            telling better stories.
          </motion.p>
        </div>

        {/* 3-Column Blog Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 35,
            mass: 1,
          }}
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`#${post.slug}`}
              className="group flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Image Container with Noise Layer */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Noise Texture Layer */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "url(https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px auto",
                  }}
                />

                {/* Top-Left Category & Date Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 select-none">
                  <span className="font-sans text-[12px] font-semibold tracking-[-0.02em] uppercase text-white">
                    {post.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span className="font-sans text-[12px] font-medium tracking-[-0.02em] text-white/80">
                    {post.date}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between pt-5">
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.3] tracking-[-0.03em] text-black transition-colors group-hover:text-black/70 md:text-[22px]">
                    {post.title}
                  </h3>
                  <p className="font-sans text-[14px] font-normal leading-[1.5] tracking-[-0.02em] text-[#605f5f]">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author row */}
                <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3">
                  <span className="font-sans text-[12px] font-medium text-[#999999]">
                    {post.author} · {post.role}
                  </span>
                  <span className="font-sans text-[12px] font-semibold tracking-[-0.02em] text-black underline underline-offset-4 transition-transform group-hover:translate-x-0.5">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
