"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { KoraLogo } from "./kora-logo";

export function FooterSection() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@kora.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-[#f5f5e9] pt-8 sm:pt-14 pb-10 sm:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Circle Expand Animation (Authentic Framer effect) */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0.3 }}
        whileInView={{ scale: 1.2, opacity: 0.85 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] sm:size-[800px] rounded-full bg-[#5dc39b] blur-2xl z-0"
      />

      {/* Outer Container (Authentic Framer rounded box with scale-in) */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0.9 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[1600px] mx-auto bg-[#f7f7ed] rounded-[28px] sm:rounded-[40px] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-8 sm:pb-12 shadow-sm border border-[#242424]/[0.06] overflow-hidden"
      >
        {/* ========================================================
            TIER 1: Top (Logo / Address / Newsletter + Founder Quote)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 sm:pb-20 border-b border-[#242424]/[0.08]">
          {/* Left Column: Brand & Newsletter (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Logo & Physical Address */}
              <a href="#top" aria-label="Home" className="inline-block">
                <KoraLogo className="h-5 w-auto" />
              </a>
              <p className="mt-4 text-xs sm:text-sm text-[#616161] leading-relaxed font-normal">
                2847 Mission Street San Francisco, CA 94110
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-12 sm:mt-16 max-w-[460px]">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#242424] tracking-[-0.02em]">
                Subscribe to our newsletter.
              </h3>

              <form onSubmit={handleSubscribe} className="mt-6">
                <div className="flex items-center bg-white rounded-full p-1.5 pl-5 sm:pl-6 border border-[#242424]/[0.12] shadow-sm focus-within:border-[#5dc39b] transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 bg-transparent text-sm text-[#242424] placeholder:text-[#616161] focus:outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 sm:py-3 rounded-full bg-[#5dc39b] hover:bg-[#52b08a] text-[#242424] font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer shadow-sm"
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              </form>

              <p className="mt-3 text-xs text-[#616161]">
                By subscribing, you agree to our privacy policy.
              </p>
            </div>
          </div>

          {/* Right Column: Founder Quote & Direct Contact (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Authentic Headline with grey contrast */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-semibold tracking-[-0.03em] leading-[1.25]">
                <span className="text-[#616161]">
                  Stalled revenue, leaky funnels, stretched leadership.{" "}
                </span>
                <span className="text-[#242424]">
                  Whatever&apos;s holding you back, let&apos;s solve it.
                </span>
              </h2>

              {/* Founder Profile */}
              <div className="mt-8 flex items-center gap-3.5">
                <div className="relative size-12 sm:size-14 rounded-full overflow-hidden border-[1.5px] border-[#5dc39b] shrink-0 shadow-sm">
                  <Image
                    src="https://framerusercontent.com/images/ptzdfa8kamllLFJeEJ6fpHyKaQ.jpg?width=1024&height=1024"
                    alt="Portrait of Koraline Spencer."
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#242424]">
                    Koraline Spencer
                  </p>
                  <p className="text-xs text-[#616161]">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Direct Communication Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Phone Link Pill */}
              <a
                href="tel:+1-510-895-6500"
                className="inline-flex items-center justify-between sm:justify-start gap-4 px-6 py-3.5 rounded-full bg-white hover:bg-[#fffffa] border border-[#242424]/[0.1] text-sm font-semibold text-[#242424] transition-all duration-200 shadow-sm group"
              >
                <span>(510) 895-6500</span>
                <ArrowUpRight className="size-4 text-[#616161] group-hover:text-[#242424] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Email Copy Pill */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-between sm:justify-start gap-3 p-1.5 pr-6 rounded-full bg-white hover:bg-[#fffffa] border border-[#242424]/[0.1] text-sm font-semibold text-[#242424] transition-all duration-200 shadow-sm cursor-pointer group"
              >
                <div className="size-9 rounded-full bg-[#5dc39b] flex items-center justify-center text-[#242424] shrink-0 transition-transform group-hover:scale-105">
                  {copied ? (
                    <Check className="size-4 text-[#242424]" />
                  ) : (
                    <Copy className="size-4 text-[#242424]" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#242424]">
                    {copied ? "Copied!" : "hello@kora.com"}
                  </span>
                  {!copied && (
                    <span className="text-xs font-normal text-[#616161]">
                      (click to copy)
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            TIER 2: Middle (Socials / Legal / Navigation Links)
           ======================================================== */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 border-b border-[#242424]/[0.08]">
          {/* Sub-group 1: Socials & Legal */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 justify-between">
            {/* Socials */}
            <div>
              <p className="text-xs uppercase tracking-wider text-[#616161] font-semibold mb-4">
                Socials
              </p>
              <div className="flex items-center gap-2.5">
                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X Link"
                  className="size-11 rounded-full bg-white border border-[#242424]/[0.1] flex items-center justify-center text-[#242424] hover:bg-[#5dc39b] hover:border-[#5dc39b] transition-all duration-200 shadow-sm group"
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="size-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M 31.502 0 L 37.636 0 L 24.236 15.315 L 40 36.156 L 27.655 36.156 L 17.987 23.516 L 6.925 36.156 L 0.788 36.156 L 15.121 19.775 L 0 0 L 12.655 0 L 21.393 11.553 L 31.499 0 Z M 29.35 32.485 L 32.748 32.485 L 10.81 3.478 L 7.172 3.478 Z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="size-11 rounded-full bg-white border border-[#242424]/[0.1] flex items-center justify-center text-[#242424] hover:bg-[#5dc39b] hover:border-[#5dc39b] transition-all duration-200 shadow-sm group"
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="size-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M 8.395 4.199 C 8.393 6.517 6.513 8.396 4.195 8.395 C 1.877 8.393 -0.001 6.513 0 4.195 C 0.001 1.877 1.881 -0.001 4.199 0 C 6.517 0.001 8.396 1.881 8.395 4.199 Z M 8.52 11.503 L 0.126 11.503 L 0.126 37.778 L 8.52 37.778 Z M 26.223 11.023 C 21.674 11.023 19.637 13.523 18.5 15.281 L 18.5 11.503 L 10.605 11.503 C 10.709 13.727 10.605 37.778 10.605 37.778 L 18.5 37.778 L 18.5 23.102 C 18.5 22.316 18.557 21.531 18.789 20.941 C 19.418 19.367 20.859 17.727 23.277 17.727 C 26.457 17.727 27.734 20.156 27.734 23.707 L 27.734 37.778 L 35.629 37.778 L 35.629 22.617 C 35.629 14.492 31.293 11.023 26.223 11.023 Z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="size-11 rounded-full bg-white border border-[#242424]/[0.1] flex items-center justify-center text-[#242424] hover:bg-[#5dc39b] hover:border-[#5dc39b] transition-all duration-200 shadow-sm group"
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="size-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M 20 14 C 16.686 14 14 16.686 14 20 C 14 23.314 16.686 26 20 26 C 23.314 26 26 23.314 26 20 C 26 16.686 23.314 14 20 14 Z M 20 10 C 25.523 10 30 14.477 30 20 C 30 25.523 25.523 30 20 30 C 14.477 30 10 25.523 10 20 C 10 14.477 14.477 10 20 10 Z M 32.5 9.5 C 32.5 10.605 31.605 11.5 30.5 11.5 C 29.395 11.5 28.5 10.605 28.5 9.5 C 28.5 8.395 29.395 7.5 30.5 7.5 C 31.605 7.5 32.5 8.395 32.5 9.5 Z M 36 12 C 35.9 7.8 34.7 4.1 30.5 2.9 C 27.4 2 20 2 20 2 C 20 2 12.6 2 9.5 2.9 C 5.3 4.1 4.1 7.8 4 12 C 3.9 15.1 3.9 24.9 4 28 C 4.1 32.2 5.3 35.9 9.5 37.1 C 12.6 38 20 38 20 38 C 20 38 27.4 38 30.5 37.1 C 34.7 35.9 35.9 32.2 36 28 C 36.1 24.9 36.1 15.1 36 12 Z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="size-11 rounded-full bg-white border border-[#242424]/[0.1] flex items-center justify-center text-[#242424] hover:bg-[#5dc39b] hover:border-[#5dc39b] transition-all duration-200 shadow-sm group"
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="size-4 fill-current transition-transform group-hover:scale-110"
                  >
                    <path d="M 23.5 13.5 L 23.5 9.8 C 23.5 8.4 24.3 8 25.5 8 L 29 8 L 29 2 L 24.2 2 C 18.8 2 17.5 6 17.5 9.9 L 17.5 13.5 L 13 13.5 L 13 19.5 L 17.5 19.5 L 17.5 38 L 23.5 38 L 23.5 19.5 L 28.5 19.5 L 29.2 13.5 L 23.5 13.5 Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs uppercase tracking-wider text-[#616161] font-semibold mb-4">
                Legal
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="#legal"
                  className="text-sm font-medium text-[#242424] hover:text-[#5dc39b] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#legal"
                  className="text-sm font-medium text-[#242424] hover:text-[#5dc39b] transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          {/* Sub-group 2: Navigation Pills */}
          <div>
            <p className="text-xs uppercase tracking-wider text-[#616161] font-semibold mb-4">
              Navigation
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Case Studies", href: "#cases" },
                { label: "Insights", href: "#insights" },
                { label: "About us", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#5dc39b] text-[#242424] border border-[#242424]/[0.1] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm group"
                >
                  <span className="size-1.5 rounded-full bg-[#242424] group-hover:scale-125 transition-transform" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            TIER 3: Bottom (Giant Fit-Text 'kora' + Copyright)
           ======================================================== */}
        <div className="pt-10 sm:pt-14 pb-2 flex flex-col lg:flex-row items-end justify-between gap-6">
          {/* Authentic Giant SVG Fit-Text 'kora' in Mint Green */}
          <div className="w-full lg:w-[75%] select-none overflow-hidden">
            <svg
              viewBox="0 0 810 240"
              className="w-full h-auto max-h-[160px] sm:max-h-[220px] lg:max-h-[270px]"
              preserveAspectRatio="xMinYMid meet"
              role="img"
              aria-label="kora"
            >
              <text
                x="0"
                y="195"
                fill="#5dc39b"
                fontFamily="var(--font-manrope), sans-serif"
                fontWeight="700"
                fontSize="260"
                letterSpacing="-0.045em"
              >
                kora
              </text>
            </svg>
          </div>

          {/* Copyright notice aligned to bottom right */}
          <div className="text-[#616161] text-xs sm:text-[13px] font-semibold tracking-[-0.025em] whitespace-nowrap pb-3 sm:pb-5">
            © 2026 Kora All rights reserved.
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
