"use client";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "CTO at InnovateTech",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    quote:
      "The AI-driven analytics from #QuantumInsights have revolutionized our product development cycle. Insights are now more accurate and faster than ever. A game-changer for tech companies.",
  },
  {
    name: "Samantha Lee",
    role: "Marketing Director at NextGen Solutions",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "Implementing #AIStream's customer prediction model has drastically improved our targeting strategy. Seeing a 50% increase in conversion rates! Highly recommend their solutions.",
  },
  {
    name: "Raj Patel",
    role: "Founder & CEO at StartUp Grid",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    quote:
      "As a startup, we need to move fast and stay ahead. #CodeAI's automated coding assistant helps us do just that. Our development speed has doubled. Essential tool for any startup.",
  },
  {
    name: "Emily Chen",
    role: "Product Manager at Digital Wave",
    avatar: "https://randomuser.me/api/portraits/women/83.jpg",
    quote:
      "#VoiceGen's voice synthesis has made our accessibility features truly stand out. Our users love the natural-sounding audio options. A big step forward in inclusive design.",
  },
  {
    name: "Michael Brown",
    role: "Data Scientist at FinTech Innovations",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    quote:
      "Leveraging #DataCraft's predictive models has given us an edge in financial forecasting. Accuracy is unmatched, and the insights have been invaluable.",
  },
  {
    name: "Linda Wu",
    role: "VP of Operations at LogiChain",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    quote:
      "#SupplyAI's optimization tools have dramatically reduced our logistics costs. Real-time tracking and predictive rerouting saved us thousands.",
  },
  {
    name: "Carlos Gomez",
    role: "Head of R&D at EcoTech",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    quote:
      "Integration with SkyAgent took less than ten minutes and immediately eliminated hours of repetitive manual reporting across our engineering sprints.",
  },
  {
    name: "Aisha Khan",
    role: "Chief Digital Officer at OmniRetail",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    quote:
      "Customer support response times dropped by 65% in the first month. Our team now focuses exclusively on high-touch client relationships.",
  },
  {
    name: "Tom Chen",
    role: "Founder at Startup Hub",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    quote:
      "SkyAgent feels like adding three senior operations engineers to our team overnight. Reliable, transparent, and remarkably fast.",
  },
];

function MarqueeColumn({
  items,
  duration = "35s",
  reverse = false,
}: {
  items: typeof TESTIMONIALS;
  duration?: string;
  reverse?: boolean;
}) {
  return (
    <div
      style={
        {
          "--duration": duration,
          "--gap": "1rem",
        } as React.CSSProperties
      }
      className="group flex overflow-hidden p-2 flex-col [gap:var(--gap)]"
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          style={{
            animationDirection: reverse ? "reverse" : "normal",
          }}
          className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-vertical flex-col group-hover:[animation-play-state:paused]"
        >
          {items.map((item, idx) => (
            <div
              key={`${dup}-${idx}`}
              className="flex w-full cursor-pointer break-inside-avoid flex-col items-start justify-between gap-5 rounded-xl p-5 bg-accent/60 border border-border shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_1px_2px_0px_rgba(15,12,12,0.10)] dark:shadow-[0px_0px_0px_1px_rgba(250,250,250,0.1),0px_8px_12px_-4px_rgba(15,12,12,0.3)]"
            >
              <p className="text-sm text-primary/90 leading-relaxed font-normal">
                {item.quote}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="size-10 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {item.name}
                  </p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const col1 = TESTIMONIALS.slice(0, 3);
  const col2 = TESTIMONIALS.slice(3, 6);
  const col3 = TESTIMONIALS.slice(6, 9);

  return (
    <section
      id="testimonials"
      className="flex flex-col items-center justify-center w-full"
    >
      {/* Header */}
      <div className="border-b border-border w-full p-10 md:p-14">
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance text-primary">
            Empower Your Workflow with AI
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium text-sm sm:text-base">
            Ask your AI Agent for real-time collaboration, seamless
            integrations, and actionable insights to streamline your operations.
          </p>
        </div>
      </div>

      {/* Vertical Marquee Grid */}
      <div className="relative w-full max-w-6xl mx-auto px-6 py-8">
        <div className="relative h-[540px] w-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            <MarqueeColumn items={col1} duration="28s" />
            <div className="hidden md:block">
              <MarqueeColumn items={col2} duration="34s" reverse />
            </div>
            <div className="hidden lg:block">
              <MarqueeColumn items={col3} duration="30s" />
            </div>
          </div>

          {/* Top & Bottom Fade Masks */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 w-full bg-gradient-to-t from-background from-20% z-10" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 w-full bg-gradient-to-b from-background from-20% z-10" />
        </div>
      </div>
    </section>
  );
}
