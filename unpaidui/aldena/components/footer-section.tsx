"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Works", href: "#works" },
  { name: "Contact", href: "#contact" },
  { name: "Blog", href: "#blog" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com/lunisdesign" },
  { name: "LinkedIn", href: "https://linkedin.com/company/lunisdesign" },
  { name: "X (Twitter)", href: "https://twitter.com" },
  { name: "Dribbble", href: "https://dribbble.com/lunisdesign" },
];

function RollingText({ text }: { text: string }) {
  return (
    <span className="relative inline-flex items-center overflow-hidden h-[24px] select-none">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block h-[24px] overflow-hidden align-top"
          style={{ letterSpacing: 0 }}
        >
          <span
            className="block leading-[24px] tracking-[-0.02em] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[24px]"
            style={{
              textShadow: "0 24px 0 currentColor",
              transitionDelay: `${i * 12}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative z-[3] w-full bg-[#f4f4f4] text-black overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col px-8 pt-24 pb-0 sm:px-14 sm:pt-28 lg:px-16">
        {/* Top Content Row: Left Form, Middle Dot, Right Links & Contact */}
        <div className="relative flex w-full flex-col justify-between gap-16 md:flex-row md:items-start lg:gap-20">
          {/* Left Column: Stay in the loop */}
          <div className="flex w-full max-w-[420px] flex-col">
            <h3 className="font-sans text-[34px] font-bold tracking-[-0.04em] leading-[1.1] text-black sm:text-[42px]">
              Stay in the loop.
            </h3>
            <p className="mt-2 text-[15px] font-normal leading-[1.4] tracking-[-0.02em] text-[#605f5f]">
              Get the latest news, insights directly to your inbox.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-3.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="h-[48px] w-full border-none bg-[#e6e6e6] px-4 font-sans text-[14px] font-medium tracking-[-0.02em] text-black placeholder:text-[#999999] outline-none"
              />
              <button
                type="submit"
                className="h-[48px] w-full border-none bg-black font-sans text-[13px] font-bold tracking-[0.06em] uppercase text-white transition-colors hover:bg-neutral-800 cursor-pointer text-center"
              >
                {subscribed ? "THANK YOU" : "SUBSCRIBE"}
              </button>
            </form>

            {/* Copyright */}
            <div className="mt-8">
              <a
                href="https://lunisdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11px] font-medium tracking-[0.06em] uppercase text-[#999999] transition-colors hover:text-black"
              >
                DESIGNED BY LUNIS. ALL RIGHTS RESERVED.
              </a>
            </div>
          </div>

          {/* Center Black Dot: Positioned exactly in the middle between columns */}
          <div className="hidden md:flex flex-1 items-center justify-center self-center py-8">
            <div className="h-3.5 w-3.5 rounded-full bg-black" />
          </div>

          {/* Right Column: Navigation, Social & Inquiries */}
          <div className="flex w-full max-w-[460px] flex-col">
            {/* Top Row: Navigation & Social Links */}
            <div className="grid grid-cols-2 gap-12 sm:gap-16">
              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group font-sans text-[15px] font-medium leading-[2.1] text-black tracking-[-0.02em]"
                  >
                    <RollingText text={link.name} />
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-1.5">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-sans text-[15px] font-medium leading-[2.1] text-black tracking-[-0.02em]"
                  >
                    <RollingText text={link.name} />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Row: Contact info */}
            <div className="mt-12 flex flex-col gap-0.5">
              <a
                href="tel:2125550198"
                className="font-sans text-[16px] font-medium tracking-tight text-[#605f5f] transition-colors hover:text-black"
              >
                +1 (212) 555–0198
              </a>
              <a
                href="mailto:hello@aldena.studio"
                className="font-sans text-[30px] font-bold tracking-[-0.04em] leading-[1.15] text-black transition-opacity hover:opacity-75 sm:text-[38px]"
              >
                hello@aldena.studio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Giant Brand Wordmark: "Aldena. Studio" */}
        <div className="relative mt-12 w-full select-none overflow-hidden text-center pb-0">
          <h2 className="font-serif text-[clamp(4.5rem,14.8vw,14rem)] font-normal tracking-[-0.04em] text-[#dedede] leading-[0.82] whitespace-nowrap select-none">
            Aldena. Studio
          </h2>
        </div>
      </div>
    </footer>
  );
}
