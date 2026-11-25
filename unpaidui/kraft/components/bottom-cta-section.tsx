"use client";

import Link from "next/link";

export function BottomCtaSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-muted/50">
        <div className="relative z-10 px-8 py-12 sm:px-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Get early access
            </h2>
            <p className="mt-3 max-w-md text-lg text-muted-foreground">
              Every week, we ship new AI-powered design features. Join and be
              first in line to shape what we build next.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="you@company.com"
                required
                className="h-12 appearance-none rounded-xl border-0 bg-background px-6 text-foreground shadow-none outline-none ring-0 transition-shadow duration-200 placeholder:text-muted-foreground focus:border-0 focus:shadow-[0_0_20px_rgba(0,0,0,0.08)] sm:min-w-[21.5rem] dark:focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              />
              <button
                type="submit"
                className="h-12 cursor-pointer rounded-full bg-background px-8 font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Join waitlist
              </button>
            </form>
            <p className="mt-4 max-w-xs text-xs text-muted-foreground">
              We respect your inbox. No spam, just product updates.{" "}
              <Link href="#" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-25"
          style={{
            background: "linear-gradient(to left, #333DA7, transparent)",
            maskImage:
              "linear-gradient(to left, black 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, black 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
