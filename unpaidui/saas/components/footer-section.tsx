"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Community", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <footer className="relative pt-36 mt-24 mx-2.5 max-[850px]:mx-0 overflow-hidden">
      {/* Overlapping Top CTA Card */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-5xl px-6 z-20">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Background image blur */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-125 scale-105"
            style={{ backgroundImage: "url(/BG.jpg)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center px-12 py-20 max-[850px]:px-6 max-[850px]:py-12">
            <h2 className="text-5xl max-[850px]:text-3xl text-black font-medium tracking-tight max-w-2xl mb-10 max-[850px]:mb-6">
              Start building something truly amazing today
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex items-center w-full max-w-md bg-white rounded-xl p-1.5 shadow-xl max-[850px]:flex-col max-[850px]:p-3 max-[850px]:gap-3 max-[850px]:max-w-none border border-black/5"
            >
              <div className="flex items-center flex-1 w-full">
                <Mail className="w-5 h-5 text-neutral-400 ml-3 flex-none max-[850px]:ml-1" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="flex-1 px-3 py-2.5 text-sm bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap max-[850px]:w-full max-[850px]:py-3 cursor-pointer"
              >
                {submitted ? "Joined" : "Join Waitlist"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Lime Green Footer Container */}
      <div className="bg-accent rounded-tr-[3rem] rounded-tl-[3rem] pt-80 pb-16 max-[850px]:pt-64">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start justify-between gap-12 max-[850px]:flex-col max-[850px]:gap-10">
            {/* Brand Logo */}
            <Link href="#" className="flex items-center gap-2" aria-label="Circular home">
              <div className="w-8 h-8 rounded-full bg-neutral-900" />
              <span className="text-xl font-semibold text-neutral-900 leading-none">Circular</span>
            </Link>

            {/* Navigation Columns */}
            <nav className="flex gap-16 max-[850px]:gap-10 max-[850px]:flex-wrap" aria-label="Footer navigation">
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-3 min-w-[100px]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900/60">
                    {category}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium text-neutral-900/80 hover:text-neutral-900 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-16 pt-8 border-t border-black/10 flex items-center justify-between gap-4 max-[850px]:flex-col max-[850px]:items-start">
            <p className="text-xs font-medium text-neutral-900/60">
              © 2026 Circular, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium text-neutral-900/70">
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                GitHub
              </Link>
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
