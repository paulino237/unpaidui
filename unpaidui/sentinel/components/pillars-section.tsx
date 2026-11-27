"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PillarsSection() {
  const chamferTopRight = {
    clipPath: "polygon(0 0, calc(100% - 34px) 0, 100% 34px, 100% 100%, 0 100%)",
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
      <div className="max-w-2xl">
        <h2 className="text-balance font-serif text-3xl font-normal leading-[1.12] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]">
          One platform that <span className="font-sans font-semibold tracking-tight">sees</span>,{" "}
          <span className="font-sans font-semibold tracking-tight">stops</span>, and{" "}
          <span className="font-sans font-semibold tracking-tight">seals</span> every threat
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Sentinel collapses your entire security stack into a single system of record — built to
          detect, respond, and prove control without the integration tax.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <div className="bg-border p-px" style={chamferTopRight}>
          <article className="flex h-full flex-col bg-background p-6 sm:p-7" style={chamferTopRight}>
            <h3 className="text-lg font-semibold tracking-tight">Unified signal, zero noise</h3>
            <div className="my-5 border-t border-dotted border-border" />

            <div className="flex h-40 items-center justify-center py-6 sm:py-8">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute h-32 w-32 rounded-full border border-blue-500/20" />
                <span className="absolute h-24 w-24 rounded-full border border-blue-500/30" />
                <span className="absolute h-16 w-16 rounded-full border border-blue-500/40" />
                <span className="absolute h-2 w-2 rounded-full bg-blue-500" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 top-4 right-8 animate-ping" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 top-4 right-8" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-blue-400 bottom-6 left-6" />
                <div
                  className="absolute inset-0 rounded-full border border-transparent border-t-blue-500/60 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
            </div>

            <div className="mb-6 border-t border-dotted border-border" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every alert, log, and identity event flows into one correlated graph — so your team
              chases real threats instead of triaging dashboards.
            </p>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <span className="text-xs font-medium text-muted-foreground">
                Detection · Sentinel Core
              </span>
              <span
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex h-10 w-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
              >
                <Link
                  href="#detection"
                  style={{ "--cut": "9px" } as React.CSSProperties}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full w-full [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
                  aria-label="Learn more about Unified signal, zero noise"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </span>
            </div>
          </article>
        </div>

        <div className="bg-border p-px" style={chamferTopRight}>
          <article className="flex h-full flex-col bg-background p-6 sm:p-7" style={chamferTopRight}>
            <h3 className="text-lg font-semibold tracking-tight">Response in milliseconds</h3>
            <div className="my-5 border-t border-dotted border-border" />

            <div className="flex h-40 items-center justify-center py-6 sm:py-8">
              <div className="flex w-full max-w-[200px] flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-mono">HOST_ISOLATION</span>
                  <span className="font-mono text-emerald-400">0.8ms</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-4/5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-mono">TOKEN_REVOKE</span>
                  <span className="font-mono text-blue-400">1.4ms</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-full rounded-full bg-blue-500" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-mono">FIREWALL_RULE</span>
                  <span className="font-mono text-purple-400">2.1ms</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-2/3 rounded-full bg-purple-500" />
                </div>
              </div>
            </div>

            <div className="mb-6 border-t border-dotted border-border" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Automated playbooks isolate compromised hosts and revoke access the instant a pattern
              matches, long before an analyst opens a ticket.
            </p>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <span className="text-xs font-medium text-muted-foreground">
                Response · Sentinel Flow
              </span>
              <span
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex h-10 w-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
              >
                <Link
                  href="#response"
                  style={{ "--cut": "9px" } as React.CSSProperties}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full w-full [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
                  aria-label="Learn more about Response in milliseconds"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </span>
            </div>
          </article>
        </div>

        <div className="bg-border p-px" style={chamferTopRight}>
          <article className="flex h-full flex-col bg-background p-6 sm:p-7" style={chamferTopRight}>
            <h3 className="text-lg font-semibold tracking-tight">Provable, sealed control</h3>
            <div className="my-5 border-t border-dotted border-border" />

            <div className="flex h-40 items-center justify-center py-6 sm:py-8">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted/40 font-mono text-xs text-foreground shadow-inner">
                  SHA-256
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  0x9f4a...8b1e · Immutable
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                  Cryptographically Verified
                </span>
              </div>
            </div>

            <div className="mb-6 border-t border-dotted border-border" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hardware-backed keys and immutable audit trails keep every action accountable,
              encrypted end to end and ready for any auditor.
            </p>

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <span className="text-xs font-medium text-muted-foreground">
                Governance · Sentinel Vault
              </span>
              <span
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex h-10 w-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
              >
                <Link
                  href="#governance"
                  style={{ "--cut": "9px" } as React.CSSProperties}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full w-full [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
                  aria-label="Learn more about Provable, sealed control"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
