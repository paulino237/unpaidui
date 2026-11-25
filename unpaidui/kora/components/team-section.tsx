"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { KoraLogo } from "./kora-logo";

interface TeamMember {
  number: string;
  name: string;
  role: string;
  image: string;
}

const TEAM_MEMBERS_COL1: TeamMember[] = [
  {
    number: "01",
    name: "Koraline Spencer",
    role: "Founder & CEO",
    image:
      "https://framerusercontent.com/images/ptzdfa8kamllLFJeEJ6fpHyKaQ.jpg?width=1024&height=1024",
  },
  {
    number: "03",
    name: "James Okoro",
    role: "Senior Growth Consultant",
    image:
      "https://framerusercontent.com/images/akJQe3BhYVaYiW8D7XTtFNAS2A.jpg?width=1024&height=1024",
  },
  {
    number: "05",
    name: "David Wilson",
    role: "Head of Client Solutions",
    image:
      "https://framerusercontent.com/images/vT4xPYmbaRCnYfkKyzUAbKKiR0.jpg?width=1024&height=1024",
  },
];

const TEAM_MEMBERS_COL2: TeamMember[] = [
  {
    number: "02",
    name: "Priya Sharma",
    role: "Head of Growth Strategy",
    image:
      "https://framerusercontent.com/images/gU8yKC3ZiCyONDaKr0hgrinSY5U.jpg?width=1024&height=1024",
  },
  {
    number: "04",
    name: "Alex Tanaka",
    role: "Growth Operations Lead",
    image:
      "https://framerusercontent.com/images/gJRsKq8nmNa966w6uRWMJoB7p90.jpg?width=1024&height=1024",
  },
  {
    number: "06",
    name: "Rachel Andersen",
    role: "Revenue Strategist",
    image:
      "https://framerusercontent.com/images/HSDuVqMhSgRPV5plzbPZvxsh3c.jpg?width=1024&height=1024",
  },
];

function TeamCard({
  member,
  isHovered,
  onHover,
  onLeave,
}: {
  member: TeamMember;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group cursor-pointer border-b border-white/[0.25] py-4 sm:py-5 transition-all duration-300"
    >
      {/* Floating Off-White Hover Pill Background */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.98,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-1 -inset-x-3 sm:-inset-x-4 bg-[#fffffa] rounded-full shadow-lg pointer-events-none z-0"
      />

      {/* Member Content Row */}
      <div className="relative z-10 flex items-center justify-between px-2 sm:px-3">
        {/* Left: Avatar + Name + Role */}
        <div className="flex items-center gap-3.5 sm:gap-4.5">
          <div className="relative size-12 sm:size-14 rounded-full overflow-hidden shrink-0 border-2 border-white/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              fill
              sizes="(max-width: 640px) 48px, 56px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h3
              className={`text-base sm:text-lg font-semibold tracking-tight transition-colors duration-300 ${
                isHovered ? "text-[#242424]" : "text-[#fffffa]"
              }`}
            >
              {member.name}
            </h3>
            <p
              className={`text-xs font-normal transition-colors duration-300 ${
                isHovered ? "text-[#616161]" : "text-[#fffffa]/75"
              }`}
            >
              {member.role}
            </p>
          </div>
        </div>

        {/* Right: Number + Plus Icon Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span
            className={`text-xs font-medium transition-colors duration-300 ${
              isHovered ? "text-[#616161]" : "text-[#fffffa]/60"
            }`}
          >
            {member.number}
          </span>

          <div
            className={`size-8 sm:size-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? "bg-[#242424] text-white scale-105"
                : "bg-[#fffffa] text-[#242424] shadow-sm"
            }`}
          >
            <Plus
              className={`size-3.5 stroke-[2.2] transition-transform duration-300 ${
                isHovered ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamSection() {
  const [hoveredNumber, setHoveredNumber] = useState<string | null>(null);

  return (
    <section id="team" className="relative bg-[#f5f5e9] py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            Mint Green Outer Container (#5dc39b)
           ======================================================== */}
        <div className="relative bg-[#5dc39b] rounded-[36px] sm:rounded-[44px] px-6 sm:px-12 lg:px-16 py-16 sm:py-24 overflow-hidden shadow-xl">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.08] rounded-full blur-[120px] pointer-events-none" />

          {/* Header Row: White Logo & Headline */}
          <div className="relative z-10 max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <KoraLogo
                className="h-4 sm:h-4.5 w-auto"
                textColor="#fffffa"
                iconBgColor="#fffffa"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold tracking-[-0.035em] leading-[1.12]"
            >
              <span className="text-[#fffffa]">Meet the team </span>
              <span className="text-[#fffffa]/75 font-normal">
                behind the growth.
              </span>
            </motion.h2>
          </div>

          {/* ========================================================
              Team Members 2-Column Grid on Desktop
             ======================================================== */}
          <div className="relative z-10 mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-2 gap-x-10 sm:gap-x-14 gap-y-2">
            {/* Left Column (01, 03, 05) */}
            <div className="flex flex-col">
              {TEAM_MEMBERS_COL1.map((member) => (
                <TeamCard
                  key={member.number}
                  member={member}
                  isHovered={hoveredNumber === member.number}
                  onHover={() => setHoveredNumber(member.number)}
                  onLeave={() => setHoveredNumber(null)}
                />
              ))}
            </div>

            {/* Right Column (02, 04, 06) */}
            <div className="flex flex-col">
              {TEAM_MEMBERS_COL2.map((member) => (
                <TeamCard
                  key={member.number}
                  member={member}
                  isHovered={hoveredNumber === member.number}
                  onHover={() => setHoveredNumber(member.number)}
                  onLeave={() => setHoveredNumber(null)}
                />
              ))}
            </div>
          </div>

          {/* ========================================================
              Bottom Hiring Banner: "Join us, we're hiring."
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 mt-16 sm:mt-24 rounded-[30px] sm:rounded-[36px] bg-[#4eb48c] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 overflow-hidden border border-white/20 shadow-lg"
          >
            {/* Left Image with dynamic Framer perspective tilt */}
            <div className="w-full lg:w-1/2 relative aspect-[16/10] sm:aspect-[16/9] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.01] rotate-1">
              <Image
                src="https://framerusercontent.com/images/vJ0BOWZIknJPSUQfc9t1XTrJIE.jpeg?width=2400&height=1600"
                alt="Kora team collaboration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right: Text and Apply Now Capsule CTA with white dot indicator */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-[#fffffa] tracking-tight leading-[1.2]">
                Join us, we&apos;re hiring.
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#fffffa]/85 leading-relaxed font-normal max-w-[480px]">
                We’re looking for highly ambitious and talented people to help us
                drive real growth.
              </p>

              <div className="mt-6 sm:mt-8">
                <a
                  href="mailto:jobs@kora.com"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#242424] text-white hover:bg-black font-medium text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <span>Apply Now</span>
                  <span className="size-2 rounded-full bg-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
