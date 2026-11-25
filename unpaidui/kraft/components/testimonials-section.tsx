"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";

interface Testimonial {
  badge: string;
  company: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  stats: { label: string; value: string }[];
}

const testimonials: Testimonial[] = [
  {
    badge: "Design Agency",
    company: "Stellar Creative",
    quote:
      "We've completely transformed our workflow with Kraft. What used to take our team days now happens in hours. The AI understands our brand guidelines perfectly and produces designs that clients love on the first revision.",
    name: "Sarah Chen",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1574108233269-86d1199d28de?q=80&w=774&auto=format&fit=crop",
    stats: [
      { label: "Design Output", value: "10x faster" },
      { label: "Client Revisions", value: "-80%" },
      { label: "Team Size", value: "12 designers" },
    ],
  },
  {
    badge: "Tech Startup",
    company: "Quantum Labs",
    quote:
      "As a startup without a dedicated design team, Kraft has been a game-changer. We ship beautiful marketing materials, pitch decks, and product interfaces without hiring a single designer. The ROI is incredible.",
    name: "Marcus Rodriguez",
    role: "Co-founder & CEO",
    image:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1740&auto=format&fit=crop",
    stats: [
      { label: "Design Cost Savings", value: "$150k/year" },
      { label: "Time to Launch", value: "2 weeks" },
      { label: "Assets Created", value: "500+" },
    ],
  },
  {
    badge: "Enterprise",
    company: "GlobalTech Inc",
    quote:
      "Rolling out Kraft across our marketing team was seamless. The brand consistency features ensure every piece of content—from social posts to annual reports—looks like it came from the same designer. It's remarkable.",
    name: "Roy Park",
    role: "VP of Marketing",
    image:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=870&auto=format&fit=crop",
    stats: [
      { label: "Brand Consistency", value: "99.5%" },
      { label: "Team Members", value: "200+" },
      { label: "Monthly Designs", value: "5,000+" },
    ],
  },
];

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col rounded-3xl p-6 transition-colors duration-300 sm:p-8 lg:flex-row lg:gap-12 lg:p-12 ${
        isActive ? "bg-accent/20" : "bg-muted"
      }`}
    >
      <div className="flex flex-1 flex-col">
        <span className="w-fit rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:px-4 sm:py-1.5 sm:text-sm">
          {testimonial.badge}
        </span>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:mt-6 sm:text-4xl lg:text-5xl">
          {testimonial.company}
        </h3>
        <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/80 sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-3 sm:mt-8">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover lg:hidden"
          />
          <div>
            <p className="text-sm font-medium text-foreground sm:text-base">
              {testimonial.name}
            </p>
            <p className="text-xs leading-snug text-muted-foreground sm:text-sm lg:hidden">
              {testimonial.role}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-medium uppercase text-muted-foreground/60 lg:mt-6">
          {testimonial.company}
        </p>
      </div>

      <div className="hidden flex-col lg:flex lg:w-72">
        <div className="relative h-60 w-40 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
        <div className="mt-2 pt-6">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {testimonial.role}
          </p>
          <p className="mt-1 text-lg font-semibold leading-snug text-foreground">
            {testimonial.name}
          </p>
        </div>

        <div className="mt-6 border-t border-foreground/10 pt-8">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            How they use Kraft
          </p>
          <div className="mt-4 space-y-2">
            {testimonial.stats.map((s) => (
              <div key={s.label} className="flex justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className="text-sm font-semibold text-foreground">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState({ cardWidth: 0, gap: 24 });

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });

  const measure = useCallback(() => {
    if (containerRef.current) {
      setLayout({ cardWidth: containerRef.current.offsetWidth, gap: 24 });
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (layout.cardWidth > 0) {
      x.set(-activeIndex * (layout.cardWidth + layout.gap));
    }
  }, [activeIndex, layout, x]);

  const step = (delta: number) => {
    setActiveIndex((prev) =>
      Math.max(0, Math.min(testimonials.length - 1, prev + delta))
    );
  };

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-7xl">
          <p className="text-4xl font-medium tracking-tight text-foreground">
            Trusted by design teams worldwide
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="mx-auto max-w-7xl">
          <div className="overflow-visible">
            <motion.div
              className="flex"
              style={{ x: smoothX, gap: layout.gap }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.company}
                  className="shrink-0"
                  style={{ width: layout.cardWidth || "90%" }}
                >
                  <TestimonialCard
                    testimonial={t}
                    isActive={i === activeIndex}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.company}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 cursor-pointer rounded-full transition-all ${
                    i === activeIndex
                      ? "w-8 bg-foreground"
                      : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={activeIndex === 0}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={activeIndex === testimonials.length - 1}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
