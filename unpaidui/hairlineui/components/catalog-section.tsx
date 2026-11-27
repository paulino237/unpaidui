"use client";

import { TemplateCard } from "./template-card";

export function CatalogSection() {
  return (
    <section id="catalog" aria-labelledby="catalog-title" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2
            id="catalog-title"
            className="home-module__06co2W__fade text-balance text-[clamp(31px,4.3vw,46px)] font-medium leading-[1.08] tracking-[-0.035em] text-ink"
          >
            AI made every landing page look the same. <span className="text-ink-6">These don’t.</span>
          </h2>
          <p
            className="home-module__06co2W__fade mt-5 max-w-[36rem] text-pretty text-[17px] leading-[1.6] text-ink-5 sm:text-[18px]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Each template starts from its own idea: its layout, type, product screens and motion are made for that concept. Every one runs as a live demo you can try on any screen before you buy.
          </p>
          <div className="home-module__06co2W__fade mt-4" style={{ "--delay": "160ms" } as React.CSSProperties}>
            <a
              className="group inline-flex h-8 items-center gap-1 rounded-full px-3 text-[14.5px] font-medium text-ink-4 transition-colors duration-150 hover:bg-edge/[0.05] hover:text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35"
              href="/templates"
            >
              All 64 templates
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden={true}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </header>

        <div className="mt-12 sm:mt-16">
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
            <TemplateCard
              slug="turnout"
              name="Turnout"
              desc="Motion-led experiential agency and events studio"
              price="$39"
              className="lg:col-span-3"
              delay={0}
            />
            <TemplateCard
              slug="bounce"
              name="Bounce"
              desc="Online course and cohort landing page"
              price="$39"
              className="lg:col-span-3"
              delay={80}
            />
            <TemplateCard
              slug="encore"
              name="Encore"
              desc="Motion-led email and SMS agency landing page"
              price="$39"
              className="lg:col-span-2"
              delay={160}
            />
            <TemplateCard
              slug="shear"
              name="Shear"
              desc="Motion-led cloud cost SaaS landing page"
              price="$39"
              className="lg:col-span-2"
              delay={0}
            />
            <TemplateCard
              slug="serein"
              name="Serein"
              desc="Brand agency and creative studio landing page"
              price="$39"
              className="sm:max-lg:hidden lg:col-span-2"
              delay={80}
            />
          </ul>

          <div className="home-module__06co2W__fade mt-12 flex flex-col items-center sm:mt-14" style={{ "--delay": "0ms" } as React.CSSProperties}>
            <p className="text-[14px] text-ink-6">Browse by what you’re building</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-surface-2 text-ink-3 hover:bg-surface-3 hover:text-ink" href="/templates?for=ai">
                  AI products<span className="tabular-nums text-ink-7">19</span>
                </a>
              </li>
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-surface-2 text-ink-3 hover:bg-surface-3 hover:text-ink" href="/templates?for=saas">
                  SaaS &amp; dev tools<span className="tabular-nums text-ink-7">16</span>
                </a>
              </li>
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-surface-2 text-ink-3 hover:bg-surface-3 hover:text-ink" href="/templates?for=agency">
                  Agencies &amp; studios<span className="tabular-nums text-ink-7">14</span>
                </a>
              </li>
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-surface-2 text-ink-3 hover:bg-surface-3 hover:text-ink" href="/templates?for=fintech">
                  Fintech &amp; commerce<span className="tabular-nums text-ink-7">4</span>
                </a>
              </li>
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-surface-2 text-ink-3 hover:bg-surface-3 hover:text-ink" href="/templates?for=apps">
                  Apps &amp; courses<span className="tabular-nums text-ink-7">8</span>
                </a>
              </li>
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-surface-2 text-ink-3 hover:bg-surface-3 hover:text-ink" href="/templates?for=dashboard">
                  Dashboards<span className="tabular-nums text-ink-7">3</span>
                </a>
              </li>
              <li>
                <a className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] font-medium outline-none transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-primary/35 bg-primary/[0.08] text-primary hover:bg-primary/[0.13]" href="/templates?free=1">
                  Free<span className="tabular-nums opacity-70">8</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
