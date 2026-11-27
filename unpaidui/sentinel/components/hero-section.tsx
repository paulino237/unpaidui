"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroWaves } from "./hero-waves";
import {
  Gauge,
  Radar,
  MonitorSmartphone,
  Cloud,
  BadgeCheck,
  FileText,
  Search,
  Bell,
  ArrowUpRight,
  Shield,
  Laptop,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function HeroSection() {
  const [activeRange, setActiveRange] = useState<"24h" | "7d" | "30d">("24h");

  return (
    <div className="relative [isolation:isolate]">
      <HeroWaves />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% -5%, color-mix(in srgb, var(--foreground) 5%, transparent), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="relative mx-auto flex max-w-2xl flex-col items-center pb-12 pt-32 text-center sm:pt-40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[150%] w-[160%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--background) 0%, color-mix(in srgb, var(--background) 78%, transparent) 45%, transparent 72%)",
              }}
            />

            <h1 className="text-balance font-serif text-4xl font-normal leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]">
              Secure your Enterprise Stack{" "}
              <span className="font-sans font-medium tracking-tight">at AI Speed</span>
            </h1>

            <p className="mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Sentinel gives security teams the building blocks for a unified platform that meets
              complex compliance needs and adapts as fast as threats evolve.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <Link
                href="#get-started"
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-10 px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-foreground text-background hover:bg-foreground/85"
              >
                Get Started
              </Link>
              <span
                style={{ "--cut": "9px" } as React.CSSProperties}
                className="inline-flex h-10 bg-border p-px [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))]"
              >
                <Link
                  href="#talk-to-us"
                  style={{ "--cut": "9px" } as React.CSSProperties}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-ring h-full px-5 [clip-path:polygon(var(--cut)_0,100%_0,100%_calc(100%-var(--cut)),calc(100%-var(--cut))_100%,0_100%,0_var(--cut))] bg-background text-foreground hover:bg-muted"
                >
                  Talk to Us
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/[0.08]">
          <div className="relative flex h-7 items-center border-b border-border/60 px-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="pointer-events-none absolute inset-x-0 text-center text-xs font-normal text-muted-foreground">
              Sentinel
            </span>
          </div>

          <div className="flex h-[560px]">
            <aside className="hidden w-[212px] shrink-0 flex-col border-r border-border/60 bg-muted/20 lg:flex">
              <div className="flex h-14 items-center gap-2.5 border-b border-border/60 px-4">
                <span
                  className="h-6 w-6 bg-foreground [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]"
                  aria-hidden="true"
                />
                <span className="text-[15px] font-semibold tracking-tight">Sentinel</span>
              </div>

              <nav className="flex flex-1 flex-col gap-0.5 p-3">
                <p className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  Workspace
                </p>
                <span className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors bg-foreground/[0.06] font-medium text-foreground cursor-pointer">
                  <Gauge className="h-[15px] w-[15px]" />
                  Overview
                </span>
                <span className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  <Radar className="h-[15px] w-[15px]" />
                  Threats
                </span>
                <span className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  <MonitorSmartphone className="h-[15px] w-[15px]" />
                  Endpoints
                </span>
                <span className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  <Cloud className="h-[15px] w-[15px]" />
                  Cloud
                </span>
                <span className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  <BadgeCheck className="h-[15px] w-[15px]" />
                  Compliance
                </span>
                <span className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
                  <FileText className="h-[15px] w-[15px]" />
                  Reports
                </span>
              </nav>

              <div className="border-t border-border/60 p-3">
                <div className="flex items-center gap-2 px-2 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium leading-none text-foreground">
                      All systems secure
                    </span>
                    <span className="text-[10px] text-muted-foreground">Updated just now</span>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex flex-1 flex-col overflow-hidden bg-muted/10 p-4 sm:p-5">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight">Security Overview</h2>
                  <div className="text-[11px] text-muted-foreground">
                    Last 24 hours · Global
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    <Search className="h-3.5 w-3.5" />
                    <span>Search</span>
                    <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
                  </div>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground hover:text-foreground"
                    aria-label="Notifications"
                  >
                    <Bell className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background font-semibold text-xs">
                    AR
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-3 sm:grid-cols-4">
                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Threats Blocked
                    </span>
                    <Shield className="h-3 w-3 text-muted-foreground/60" />
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl font-semibold tracking-tight">12,847</span>
                    <span className="text-[11px] font-medium text-emerald-500">↗ 14.2%</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Active Endpoints
                    </span>
                    <Laptop className="h-3 w-3 text-muted-foreground/60" />
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl font-semibold tracking-tight">3,204</span>
                    <span className="text-[11px] font-medium text-emerald-500">↗ 2.1%</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Compliance Score
                    </span>
                    <CheckCircle2 className="h-3 w-3 text-muted-foreground/60" />
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl font-semibold tracking-tight">98.6%</span>
                    <span className="text-[11px] font-medium text-emerald-500">↗ 0.8%</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-background p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Avg. Response
                    </span>
                    <Clock className="h-3 w-3 text-muted-foreground/60" />
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl font-semibold tracking-tight">1.2s</span>
                    <span className="text-[11px] font-medium text-emerald-500">↘ 0.3s</span>
                  </div>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1fr]">
                <div className="flex min-h-0 flex-col rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[13px] font-semibold tracking-tight">Threat Activity</h3>
                      <p className="text-[11px] text-muted-foreground">
                        Detections vs. automated responses
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded border border-border/60 p-0.5 text-[11px]">
                      {(["24h", "7d", "30d"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setActiveRange(r)}
                          className={`rounded px-1.5 py-0.5 transition-colors ${
                            activeRange === r
                              ? "bg-foreground text-background font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      Detections
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full border border-foreground/60" />
                      Responses
                    </span>
                  </div>

                  <div className="mt-3 min-h-0 flex-1 text-foreground">
                    <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                      <defs>
                        <linearGradient id="threatFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="40" x2="600" y2="40" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="120" x2="600" y2="120" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="160" x2="600" y2="160" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <path
                        d="M0,165 C40,160 50,150 90,150 C140,150 150,128 190,126 C240,124 250,140 300,132 C350,124 360,104 410,100 C460,96 470,108 510,104 C550,101 570,92 600,90"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.28"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path
                        d="M0,140 C30,130 30,128 60,120 C90,112 100,138 120,135 C150,131 155,98 180,95 C210,92 215,114 240,110 C270,106 280,72 300,70 C330,68 335,88 360,85 C390,82 400,57 420,55 C450,53 455,78 480,75 C510,72 520,42 540,40 C570,38 580,54 600,52 L600,200 L0,200 Z"
                        fill="url(#threatFill)"
                        stroke="none"
                      />
                      <path
                        d="M0,140 C30,130 30,128 60,120 C90,112 100,138 120,135 C150,131 155,98 180,95 C210,92 215,114 240,110 C270,106 280,72 300,70 C330,68 335,88 360,85 C390,82 400,57 420,55 C450,53 455,78 480,75 C510,72 520,42 540,40 C570,38 580,54 600,52"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col rounded-lg border border-border/60 bg-background p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-semibold tracking-tight">Recent Alerts</h3>
                    <span className="flex items-center gap-0.5 text-[11px] font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                      View all
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>

                  <ul className="mt-2 flex min-h-0 flex-1 flex-col divide-y divide-border/50 overflow-hidden">
                    <li className="flex items-center gap-2.5 py-2.5 first:pt-1">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-foreground" aria-hidden="true" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-xs font-medium tracking-tight">Anomalous login from new region</span>
                        <span className="truncate text-[11px] text-muted-foreground">Critical · identity-provider · 2m</span>
                      </span>
                      <span className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Blocked
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 py-2.5 first:pt-1">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-foreground/60" aria-hidden="true" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-xs font-medium tracking-tight">Privilege escalation attempt</span>
                        <span className="truncate text-[11px] text-muted-foreground">High · server-04 · 14m</span>
                      </span>
                      <span className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Contained
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 py-2.5 first:pt-1">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-foreground/35" aria-hidden="true" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-xs font-medium tracking-tight">Expiring TLS certificate</span>
                        <span className="truncate text-[11px] text-muted-foreground">Medium · api-gateway · 1h</span>
                      </span>
                      <span className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Review
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 py-2.5 first:pt-1">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 self-start rounded-full bg-foreground/20" aria-hidden="true" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-xs font-medium tracking-tight">New device enrolled</span>
                        <span className="truncate text-[11px] text-muted-foreground">Low · macbook-pro · 3h</span>
                      </span>
                      <span className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Resolved
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
