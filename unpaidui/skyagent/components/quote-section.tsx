"use client";

import { motion } from "motion/react";

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="flex flex-col items-center justify-center gap-8 w-full p-10 md:p-16 bg-accent/50 border-y border-border z-20"
    >
      <motion.blockquote
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center"
      >
        <p className="text-xl md:text-2xl tracking-tight leading-relaxed text-primary font-medium text-balance">
          &ldquo;SkyAgent has transformed our daily operations. Tasks that once
          consumed hours now complete in moments, freeing our team to focus on
          creativity and strategic growth.&rdquo;
        </p>
        <footer className="mt-6 flex flex-col items-center">
          <cite className="not-italic font-semibold text-primary text-sm md:text-base">
            Alex Johnson
          </cite>
          <span className="text-xs md:text-sm text-muted-foreground">
            CTO, Innovatech
          </span>
        </footer>
      </motion.blockquote>
    </section>
  );
}
