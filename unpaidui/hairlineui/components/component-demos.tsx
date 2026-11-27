"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Check,
  Lock,
  Unlock,
  Sparkles,
  Send,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  Footprints,
  Flame,
  Mic,
  MicOff,
  Zap,
  SlidersHorizontal,
  Plus,
  Trash2,
  HardDrive,
  Activity,
  ArrowUp,
  ListChecks,
  Brain,
  ShieldAlert,
} from "lucide-react";
import { NumberRoll } from "@/components/number-roll";
import { TextMorph } from "@/components/text-morph";

// -------------------------------------------------------------
// 1. Morphing Chart Demo
// -------------------------------------------------------------
export function MorphingChartDemo() {
  const [tab, setTab] = useState<"Revenue" | "Visitors">("Revenue");
  const [shape, setShape] = useState<"area" | "spline" | "line">("area");

  const revenueData = [35, 52, 44, 68, 59, 82, 75, 96, 88, 110, 104, 128];
  const visitorsData = [12, 19, 15, 27, 24, 38, 32, 45, 41, 56, 50, 64];
  const activeData = tab === "Revenue" ? revenueData : visitorsData;

  const width = 560;
  const height = 210;
  const paddingX = 24;
  const paddingY = 24;

  const maxVal = Math.max(...activeData) * 1.15;
  const points = activeData.map((val, idx) => {
    const x = paddingX + (idx / (activeData.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
    return { x, y, val };
  });

  // Generate smooth cubic bezier SVG curve
  const curveD = useMemo(() => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx.toFixed(1)} ${p0.y.toFixed(1)}, ${mx.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  }, [points]);

  const areaD = `${curveD} L ${points[points.length - 1].x.toFixed(1)} ${height - paddingY} L ${points[0].x.toFixed(1)} ${height - paddingY} Z`;

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(7);
  const hoveredPoint = hoveredIdx !== null ? points[hoveredIdx] : null;

  return (
    <div className="flex w-full max-w-[620px] flex-col rounded-2xl bg-surface p-4 sm:p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-[15px] font-medium text-ink">{tab}</h4>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              2025
            </span>
          </div>
          <p className="mt-0.5 text-[12px] text-ink-6">
            {tab === "Revenue" ? "January to December 2025" : "kept.shop · last 30 days"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-surface-3 p-0.5 shadow-[inset_0_0_0_1px_rgb(var(--edge-rgb)/0.05)]">
            <button
              type="button"
              onClick={() => setTab("Revenue")}
              className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                tab === "Revenue" ? "bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : "text-ink-6 hover:text-ink"
              }`}
            >
              Revenue
            </button>
            <button
              type="button"
              onClick={() => setTab("Visitors")}
              className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                tab === "Visitors" ? "bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : "text-ink-6 hover:text-ink"
              }`}
            >
              Visitors
            </button>
          </div>

          <div className="flex rounded-full bg-surface-3 p-0.5">
            {(["area", "spline"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                className={`rounded-full px-2 py-1 text-[11px] capitalize transition-colors ${
                  shape === s ? "bg-surface text-ink shadow-sm" : "text-ink-6 hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative mt-4 h-52 w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="morph-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={shape === "area" ? 0.35 : 0.05} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={paddingX}
              y1={height - paddingY - ratio * (height - paddingY * 2)}
              x2={width - paddingX}
              y2={height - paddingY - ratio * (height - paddingY * 2)}
              stroke="rgb(var(--edge-rgb)/0.06)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path
            d={areaD}
            fill="url(#morph-glow)"
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

          {/* Main stroke line */}
          <path
            d={curveD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

          {/* Active tracker dot */}
          {hoveredPoint && (
            <g className="transition-transform duration-300 ease-out">
              <line
                x1={hoveredPoint.x}
                y1={paddingY}
                x2={hoveredPoint.x}
                y2={height - paddingY}
                stroke="var(--primary)"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="4.5"
                fill="var(--surface)"
                stroke="var(--primary)"
                strokeWidth="2.5"
              />
            </g>
          )}
        </svg>

        {/* Hover interaction overlay buttons */}
        <div className="absolute inset-0 flex justify-between px-6 pb-6 pt-6">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="flex-1 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
            />
          ))}
        </div>
      </div>

      {/* Footer Readout */}
      <div className="mt-2 flex items-center justify-between border-t border-edge/[0.06] pt-3 text-[12.5px] text-ink-5">
        <span>{hoveredIdx !== null ? `Month ${hoveredIdx + 1}` : "Hover to inspect"}</span>
        <span className="font-mono font-medium text-ink">
          {hoveredPoint ? (tab === "Revenue" ? `$${hoveredPoint.val * 100}` : `${hoveredPoint.val * 120} visits`) : ""}
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Pillar Chart Demo (Cobalt lacquer, range pill, animated bars, dot tracker)
// -------------------------------------------------------------
export function PillarChartDemo() {
  const [rangeId, setRangeId] = useState<"week" | "month" | "year">("week");
  const [selectedIdx, setSelectedIdx] = useState<number>(4);

  const ranges = [
    {
      id: "week",
      label: "W",
      name: "Week",
      total: 48.2,
      change: 12.4,
      bars: [
        { label: "Mon", value: 5.4, detail: "Monday · 5.4 hrs" },
        { label: "Tue", value: 6.8, detail: "Tuesday · 6.8 hrs" },
        { label: "Wed", value: 6.1, detail: "Wednesday · 6.1 hrs" },
        { label: "Thu", value: 7.9, detail: "Thursday · 7.9 hrs" },
        { label: "Fri", value: 9.6, detail: "Friday · 9.6 hrs" },
        { label: "Sat", value: 7.2, detail: "Saturday · 7.2 hrs" },
        { label: "Sun", value: 5.2, detail: "Sunday · 5.2 hrs" },
      ],
    },
    {
      id: "month",
      label: "M",
      name: "Month",
      total: 186.4,
      change: 8.1,
      bars: [
        { label: "W1", value: 36.2, detail: "Week 1 · 36.2 hrs" },
        { label: "W2", value: 44.8, detail: "Week 2 · 44.8 hrs" },
        { label: "W3", value: 41.0, detail: "Week 3 · 41.0 hrs" },
        { label: "W4", value: 49.4, detail: "Week 4 · 49.4 hrs" },
        { label: "W5", value: 15.0, detail: "Week 5 so far · 15.0 hrs" },
      ],
    },
    {
      id: "year",
      label: "Y",
      name: "Year",
      total: 2104,
      change: 21.7,
      bars: [
        { label: "Apr", value: 142, detail: "April · 142 hrs" },
        { label: "May", value: 168, detail: "May · 168 hrs" },
        { label: "Jun", value: 189, detail: "June · 189 hrs" },
        { label: "Jul", value: 174, detail: "July · 174 hrs" },
        { label: "Aug", value: 236, detail: "August · 236 hrs" },
        { label: "Sep", value: 208, detail: "September · 208 hrs" },
        { label: "Oct", value: 194, detail: "October · 194 hrs" },
      ],
    },
  ];

  const currentRange = ranges.find((r) => r.id === rangeId) ?? ranges[0];
  const activeIdx = Math.min(selectedIdx, currentRange.bars.length - 1);
  const selectedBar = currentRange.bars[activeIdx];
  const maxVal = Math.max(...currentRange.bars.map((b) => b.value), 1);

  return (
    <div
      className="relative flex w-full max-w-[380px] flex-col overflow-hidden rounded-[22px] p-5 select-none text-white shadow-xl"
      style={{
        background: "radial-gradient(120% 120% at 50% 0%, #1d4ed8 0%, #0f172a 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 20px 40px -15px rgba(15,23,42,0.6)",
      }}
    >
      {/* Top bar: title + range radio toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-white/90">
          <TrendingUp className="size-3.5 text-white/80" />
          <span>Focus time</span>
        </div>

        <div className="relative inline-flex items-center gap-0.5 rounded-full p-0.5 bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
          {ranges.map((r) => {
            const isSel = r.id === rangeId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setRangeId(r.id as any);
                  setSelectedIdx(2);
                }}
                className={`relative z-10 grid h-6 min-w-6 cursor-pointer place-items-center rounded-full px-2 text-[11px] font-semibold outline-none transition-colors duration-200 ${
                  isSel ? "bg-white text-[#0b0b10] shadow-sm" : "text-white/70 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Readout */}
      <div className="mt-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[34px] font-normal leading-none tracking-[-0.03em] tabular-nums text-white">
            <NumberRoll value={currentRange.total} suffix=" hrs" />
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-400 px-2 py-0.5 text-[11px] font-semibold leading-tight tabular-nums text-[#11140a]">
            <ArrowUpRight className="size-3" strokeWidth={2.6} />
            <NumberRoll value={currentRange.change} suffix="%" />
          </span>
        </div>
        <p className="mt-1.5 h-[18px] text-[12px] tabular-nums text-white/70">
          <TextMorph>{selectedBar.detail}</TextMorph>
        </p>
      </div>

      {/* Pillar Bars with animated fills */}
      <div className="relative mt-4 flex h-[148px] items-end justify-between gap-2.5">
        {currentRange.bars.map((bar, idx) => {
          const isBarSel = idx === activeIdx;
          const ratio = Math.max(0.18, (bar.value / maxVal) * 0.96);
          return (
            <button
              key={bar.label}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              onMouseEnter={() => setSelectedIdx(idx)}
              className="group flex h-full min-w-0 flex-1 cursor-pointer flex-col items-center justify-end gap-2 outline-none"
            >
              <span
                className="relative block w-full max-w-[26px] overflow-hidden rounded-full bg-white/10"
                style={{ height: 108 }}
              >
                <span
                  className="absolute inset-x-0 bottom-0 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    height: `${ratio * 100}%`,
                    background: isBarSel
                      ? "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.92) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 100%)",
                    boxShadow: isBarSel ? "0 0 12px rgba(255,255,255,0.5)" : "none",
                  }}
                />
              </span>
              <span
                className={`text-[10.5px] font-medium transition-colors ${
                  isBarSel ? "text-white font-semibold" : "text-white/55 group-hover:text-white/80"
                }`}
              >
                {bar.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Cookie Consent Demo
// -------------------------------------------------------------
export function CookieConsentDemo() {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [personalization, setPersonalization] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
            <SlidersHorizontal className="size-4" />
          </div>
          <h4 className="text-[14.5px] font-semibold text-ink">Cookie preferences</h4>
        </div>
        {saved && (
          <span className="flex items-center gap-1 text-[11.5px] font-medium text-primary">
            <Check className="size-3" strokeWidth={3} /> Saved
          </span>
        )}
      </div>

      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-5">
        Manage how we use cookies to improve your experience and measure site performance.
      </p>

      <div className="mt-4 space-y-3 divide-y divide-edge/[0.05]">
        {/* Essential */}
        <div className="flex items-center justify-between pt-2 text-[13px]">
          <div>
            <p className="font-medium text-ink">Essential</p>
            <p className="text-[11px] text-ink-6">Required for the site to function</p>
          </div>
          <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[11px] font-medium text-ink-5">
            Always on
          </span>
        </div>

        {/* Analytics */}
        <div className="flex items-center justify-between pt-3 text-[13px]">
          <div>
            <p className="font-medium text-ink">Analytics</p>
            <p className="text-[11px] text-ink-6">Anonymous usage metrics</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={analytics}
            onClick={() => setAnalytics(!analytics)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
              analytics ? "bg-primary" : "bg-surface-3"
            }`}
          >
            <span
              className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                analytics ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Marketing */}
        <div className="flex items-center justify-between pt-3 text-[13px]">
          <div>
            <p className="font-medium text-ink">Marketing</p>
            <p className="text-[11px] text-ink-6">Tailored partner offers</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={marketing}
            onClick={() => setMarketing(!marketing)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
              marketing ? "bg-primary" : "bg-surface-3"
            }`}
          >
            <span
              className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                marketing ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Personalization */}
        <div className="flex items-center justify-between pt-3 text-[13px]">
          <div>
            <p className="font-medium text-ink">Personalization</p>
            <p className="text-[11px] text-ink-6">Remember language and preferences</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={personalization}
            onClick={() => setPersonalization(!personalization)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ${
              personalization ? "bg-primary" : "bg-surface-3"
            }`}
          >
            <span
              className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                personalization ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 rounded-xl bg-surface-3 py-2 text-[12.5px] font-medium text-ink transition-colors hover:bg-surface-4"
        >
          Save preferences
        </button>
        <button
          type="button"
          onClick={() => {
            setAnalytics(true);
            setMarketing(true);
            setPersonalization(true);
            handleSave();
          }}
          className="flex-1 rounded-xl bg-primary py-2 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Activity Heatmap Demo (Matrix of orders / customers)
// -------------------------------------------------------------
export function ActivityHeatmapDemo() {
  const [metric, setMetric] = useState<"orders" | "customers">("orders");

  // Generate 7 rows x 28 cols of activity
  const weeks = 26;
  const days = 7;
  const grid = useMemo(() => {
    const arr: number[][] = [];
    for (let d = 0; d < days; d++) {
      const row: number[] = [];
      for (let w = 0; w < weeks; w++) {
        const seed = (d * 31 + w * 17) % 100;
        const val = metric === "orders" ? (seed > 80 ? 4 : seed > 55 ? 3 : seed > 30 ? 2 : seed > 10 ? 1 : 0) : (seed > 85 ? 4 : seed > 60 ? 3 : seed > 40 ? 2 : seed > 15 ? 1 : 0);
        row.push(val);
      }
      arr.push(row);
    }
    return arr;
  }, [metric]);

  const colors = [
    "bg-edge/[0.08]",
    "bg-emerald-500/30",
    "bg-emerald-500/55",
    "bg-emerald-500/80",
    "bg-emerald-500",
  ];

  return (
    <div className="flex w-full max-w-[620px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-[15px] font-medium text-ink">Kept, Market Street</h4>
          <p className="mt-0.5 text-[12px] text-ink-6">Every day since April</p>
        </div>

        <div className="flex rounded-full bg-surface-3 p-0.5">
          <button
            type="button"
            onClick={() => setMetric("orders")}
            className={`rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors ${
              metric === "orders" ? "bg-surface text-ink shadow-sm" : "text-ink-6 hover:text-ink"
            }`}
          >
            Orders
          </button>
          <button
            type="button"
            onClick={() => setMetric("customers")}
            className={`rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors ${
              metric === "customers" ? "bg-surface text-ink shadow-sm" : "text-ink-6 hover:text-ink"
            }`}
          >
            New customers
          </button>
        </div>
      </div>

      {/* Contribution Grid */}
      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex flex-col gap-1 min-w-[500px]">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1">
              {row.map((lvl, cIdx) => (
                <div
                  key={cIdx}
                  className={`size-3 rounded-[2.5px] transition-colors duration-200 ${colors[lvl]}`}
                  title={`${metric === "orders" ? "Orders" : "Customers"}: ${lvl * 8 + 4}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11.5px] text-ink-6">
        <span>Apr</span>
        <span>Jun</span>
        <span>Aug</span>
        <span>Oct</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {colors.map((c, i) => (
            <span key={i} className={`size-2.5 rounded-[2px] ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Voice Bar Demo (Live audio waveform pill)
// -------------------------------------------------------------
export function VoiceBarDemo() {
  const [active, setActive] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpeaking((prev) => !prev);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full max-w-[540px] items-center justify-center">
      <div className="flex h-12 w-full max-w-[420px] items-center justify-between rounded-full bg-surface px-4 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActive(!active)}
            className={`grid size-8 place-items-center rounded-full transition-colors ${
              active ? "bg-primary text-white" : "bg-surface-3 text-ink-6"
            }`}
          >
            {active ? <Mic className="size-4" /> : <MicOff className="size-4" />}
          </button>

          <span className="text-[13px] font-medium text-ink">
            {active ? (speaking ? "Agent speaking..." : "Listening...") : "Muted"}
          </span>
        </div>

        {/* Dynamic Equalizer Waveform */}
        <div className="flex items-center gap-1">
          {[16, 28, 12, 24, 32, 18, 26, 14, 30, 20].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                active ? "bg-primary" : "bg-edge/20"
              }`}
              style={{
                height: active && speaking ? `${(h * ((i % 3) + 1.2)) / 2}px` : "6px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. Agent Composer Demo
// -------------------------------------------------------------
export function AgentComposerDemo() {
  const [mode, setMode] = useState<"auto" | "ask" | "plan">("auto");
  const [text, setText] = useState("");

  const modes = [
    { id: "auto", name: "Auto", icon: Zap },
    { id: "ask", name: "Ask first", icon: Brain },
    { id: "plan", name: "Plan only", icon: ListChecks },
  ];

  return (
    <div className="flex w-full max-w-[390px] flex-col rounded-2xl bg-surface p-4 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
            <Zap className="size-3.5" />
          </span>
          <span className="text-[13px] font-semibold text-ink">Aurora Agent</span>
        </div>

        <div className="flex rounded-full bg-surface-3 p-0.5">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSel = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id as any)}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  isSel ? "bg-surface text-ink shadow-sm" : "text-ink-6 hover:text-ink"
                }`}
              >
                <Icon className="size-3" />
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 min-h-[90px] rounded-xl bg-surface-2 p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask Aurora to update the pricing plan..."
          className="w-full resize-none bg-transparent text-[13px] text-ink placeholder:text-ink-6 focus:outline-none"
          rows={3}
        />
      </div>

      <div className="mt-3 flex items-center justify-between pt-1">
        <span className="text-[11px] text-ink-6 font-mono">⌘ + Enter to send</span>
        <button
          type="button"
          onClick={() => setText("")}
          className="grid size-7 place-items-center rounded-full bg-primary text-white shadow-sm hover:opacity-90"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. Streak Chain Demo
// -------------------------------------------------------------
export function StreakChainDemo() {
  const [completed, setCompleted] = useState(false);
  const [daysCount, setDaysCount] = useState(14);

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      setDaysCount((c) => c + 1);
    }
  };

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-full bg-amber-500/10 text-amber-500">
            <Flame className="size-4" />
          </div>
          <div>
            <h4 className="text-[14.5px] font-semibold text-ink">
              <NumberRoll value={daysCount} suffix=" day streak" />
            </h4>
            <p className="text-[11px] text-ink-6">Best: 31 days · 2 freezes</p>
          </div>
        </div>
        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-500">
          On track
        </span>
      </div>

      {/* Week day bubbles */}
      <div className="mt-5 flex items-center justify-between gap-1.5">
        {days.map((day, idx) => {
          const isToday = idx === 4;
          const isDone = idx < 4 || (isToday && completed);
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span
                className={`grid size-8 place-items-center rounded-full text-[12px] font-semibold transition-all duration-300 ${
                  isDone
                    ? "bg-amber-500 text-white shadow-[0_2px_8px_rgba(245,158,11,0.35)]"
                    : isToday
                    ? "border-2 border-dashed border-amber-500/60 bg-amber-500/10 text-amber-600"
                    : "bg-surface-3 text-ink-6"
                }`}
              >
                {isDone ? <Check className="size-3.5" strokeWidth={3} /> : day}
              </span>
              <span className="text-[10px] text-ink-6 font-mono">{day}</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={completed}
        onClick={handleComplete}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-medium transition-all ${
          completed
            ? "bg-surface-3 text-ink-5 cursor-default"
            : "bg-primary text-white shadow-sm hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {completed ? (
          <>
            <Check className="size-4 text-emerald-500" strokeWidth={3} />
            Completed for today
          </>
        ) : (
          "Complete today"
        )}
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// 8. Status Capsule Demo (Lock / Unlock production database)
// -------------------------------------------------------------
export function StatusCapsuleDemo() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`size-2.5 rounded-full transition-colors ${
              locked ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            }`}
          />
          <span className="text-[14px] font-semibold text-ink">Production database</span>
        </div>
        <span className="text-[11px] font-mono text-ink-6">eu-central-1</span>
      </div>

      <p className="mt-2 text-[12.5px] text-ink-5">
        Zero-trust lock preventing schema alterations or drops during peak traffic hours.
      </p>

      <div className="mt-5 rounded-xl border border-edge/[0.06] bg-surface-2 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px]">
            {locked ? (
              <Lock className="size-4 text-emerald-500" />
            ) : (
              <Unlock className="size-4 text-amber-500" />
            )}
            <span className="font-medium text-ink">
              {locked ? "Locked against writes" : "Unlocked (Maintenance)"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLocked(!locked)}
            className={`rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
              locked
                ? "bg-surface text-ink shadow-sm hover:bg-surface-3"
                : "bg-emerald-500 text-white hover:opacity-90"
            }`}
          >
            {locked ? "Unlock" : "Lock"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. Afterglow Demo ("Ready to publish" with success glow)
// -------------------------------------------------------------
export function AfterglowDemo() {
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    }, 900);
  };

  return (
    <div className="relative flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center gap-2.5">
        <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </div>
        <div>
          <h4 className="text-[14.5px] font-semibold text-ink">Ready to publish</h4>
          <p className="text-[11.5px] text-ink-6">Gelato Summer Release 2026</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-[12.5px] text-ink-4">
        <div className="flex items-center gap-2">
          <Check className="size-3.5 text-primary" strokeWidth={3} />
          <span>6 new seasonal flavours</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="size-3.5 text-primary" strokeWidth={3} />
          <span>Shop page & nutrition facts</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="size-3.5 text-primary" strokeWidth={3} />
          <span>Customer newsletter scheduled</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePublish}
        disabled={loading}
        className={`relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-2.5 text-[13px] font-medium text-white transition-all ${
          published
            ? "bg-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.5)]"
            : "bg-primary shadow-sm hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {loading ? (
          "Publishing..."
        ) : published ? (
          <>
            <Check className="size-4" strokeWidth={3} />
            Published live!
          </>
        ) : (
          "Publish release"
        )}
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// 10. Snowfall Demo (Canvas gentle snow particles)
// -------------------------------------------------------------
export function SnowfallDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const flakes: Array<{ x: number; y: number; r: number; vy: number; vx: number; alpha: number }> = [];
    for (let i = 0; i < 35; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.8,
        vy: Math.random() * 0.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

      for (const f of flakes) {
        f.y += f.vy;
        f.x += f.vx;
        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative flex h-full min-h-[220px] w-full max-w-[340px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-surface to-surface-2 p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.06)]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="grid size-12 place-items-center rounded-2xl bg-surface-3 shadow-md">
          <svg className="size-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 8H9L12 2Z" />
            <path d="M12 22L9 16H15L12 22Z" />
            <path d="M2 12L8 9V15L2 12Z" />
            <path d="M22 12L16 15V9L22 12Z" />
          </svg>
        </div>
        <p className="mt-3 text-[13.5px] font-medium text-ink">Winter Snowfall</p>
        <p className="text-[11px] text-ink-6">Gentle canvas particles</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. Add To Cart Demo
// -------------------------------------------------------------
export function AddToCartDemo() {
  const [count, setCount] = useState(1);
  const [animating, setAnimating] = useState(false);

  const handleAdd = () => {
    setAnimating(true);
    setCount((c) => c + 1);
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] font-medium uppercase tracking-wider text-ink-6">Featured</span>
        <div className="relative flex items-center">
          <ShoppingBag className="size-4 text-ink-4" />
          <span
            className={`ml-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-white transition-transform ${
              animating ? "scale-125" : "scale-100"
            }`}
          >
            {count}
          </span>
        </div>
      </div>

      <div className="mt-4 flex aspect-[4/3] items-center justify-center rounded-xl bg-surface-2 p-4">
        <div className="text-center">
          <p className="text-[15px] font-medium text-ink">Dune Lounge Chair</p>
          <p className="mt-1 font-mono text-[13px] text-ink-5">$890.00</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-medium text-white shadow-sm transition-transform hover:opacity-90 active:scale-[0.98]"
      >
        <ShoppingBag className="size-4" />
        Add to cart
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// 12. Live Line Chart Demo
// -------------------------------------------------------------
export function LiveLineChartDemo() {
  const [points, setPoints] = useState([680, 720, 690, 810, 750, 890, 840, 920, 880, 950]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(500, Math.min(1150, last + (Math.random() - 0.48) * 80));
        return [...prev.slice(1), Math.round(next)];
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const currentVal = points[points.length - 1];
  const max = 1300;
  const h = 70;
  const w = 260;

  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * w;
      const y = h - (val / max) * h;
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-4 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-ink-5">Relay API · requests</p>
          <p className="text-[20px] font-semibold tracking-tight text-ink tabular-nums">
            <NumberRoll value={currentVal} suffix=" req/s" />
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-medium text-emerald-600">
          Limit: 1,200
        </span>
      </div>

      <div className="relative mt-4 h-[70px] w-full">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full overflow-visible">
          <line x1="0" y1="8" x2={w} y2="8" stroke="rgb(var(--edge-rgb)/0.12)" strokeDasharray="3 3" />
          <path
            d={pathD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          <circle
            cx={w}
            cy={h - (currentVal / max) * h}
            r="3.5"
            fill="var(--primary)"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 13. Task Card Demo
// -------------------------------------------------------------
export function TaskCardDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Audit landing page typography", done: true, tag: "Design" },
    { id: 2, text: "Hook up Stripe webhook handler", done: false, tag: "API" },
    { id: 3, text: "Benchmark CSS paint & LCP score", done: false, tag: "Perf" },
  ]);

  const toggle = (id: number) => {
    setTasks((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-ink">Sprint backlog</h4>
        <span className="text-[11px] font-mono text-ink-6">
          {tasks.filter((t) => t.done).length}/{tasks.length} done
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            className="flex cursor-pointer items-center justify-between rounded-xl bg-surface-2 p-2.5 transition-colors hover:bg-surface-3"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`grid size-4 place-items-center rounded border transition-colors ${
                  task.done
                    ? "border-primary bg-primary text-white"
                    : "border-edge/40 bg-surface"
                }`}
              >
                {task.done && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span
                className={`text-[12.5px] transition-colors ${
                  task.done ? "text-ink-6 line-through" : "text-ink"
                }`}
              >
                {task.text}
              </span>
            </div>
            <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[10px] font-medium text-ink-5">
              {task.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 14. Variant Pick Demo
// -------------------------------------------------------------
export function VariantPickDemo() {
  const [selected, setSelected] = useState(0);
  const variants = [
    { name: "Nordic Oak", color: "#d97706" },
    { name: "Smoked Walnut", color: "#78350f" },
    { name: "Matte Black", color: "#18181b" },
    { name: "Alabaster White", color: "#f4f4f5" },
  ];

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-ink">Finish variant</h4>
        <span className="text-[12px] font-medium text-primary">
          {variants[selected].name}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {variants.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-xl p-1 transition-all ${
              selected === i
                ? "ring-2 ring-primary ring-offset-2 ring-offset-surface"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            <span
              className="block size-full rounded-lg shadow-inner"
              style={{ backgroundColor: v.color }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 15. Activity Rings Demo
// -------------------------------------------------------------
export function ActivityRingsDemo() {
  return (
    <div className="flex w-full max-w-[400px] items-center justify-between rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      {/* Concentric SVG Rings */}
      <div className="relative size-32">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          {/* Ring 1 - Red */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#ef4444"
            strokeWidth="7"
            strokeDasharray="264"
            strokeDashoffset="65"
            strokeLinecap="round"
          />

          {/* Ring 2 - Green */}
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="#22c55e"
            strokeWidth="7"
            strokeDasharray="201"
            strokeDashoffset="45"
            strokeLinecap="round"
          />

          {/* Ring 3 - Cyan */}
          <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="7"
            strokeDasharray="138"
            strokeDashoffset="28"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="space-y-2 text-[12.5px]">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="text-ink-5">Move:</span>
          <span className="font-semibold text-ink">540 / 600 kcal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-emerald-500" />
          <span className="text-ink-5">Exercise:</span>
          <span className="font-semibold text-ink">38 / 30 mins</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-cyan-500" />
          <span className="text-ink-5">Stand:</span>
          <span className="font-semibold text-ink">10 / 12 hrs</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 16. Storage Demo
// -------------------------------------------------------------
export function StorageDemo() {
  const [used, setUsed] = useState(47.2);
  const [trashCleaned, setTrashCleaned] = useState(false);

  const cleanTrash = () => {
    if (!trashCleaned) {
      setUsed((u) => Math.max(10, u - 9.1));
      setTrashCleaned(true);
    }
  };

  return (
    <div className="flex w-full max-w-[420px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="size-4 text-primary" />
          <h4 className="text-[14px] font-semibold text-ink">Cloud storage</h4>
        </div>
        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-500">
          Nearly full
        </span>
      </div>

      <div className="mt-3">
        <p className="text-[18px] font-semibold text-ink tabular-nums">
          <NumberRoll value={used} format={{ maximumFractionDigits: 1 }} suffix=" GB" />
          <span className="text-[13px] font-normal text-ink-6"> of 50 GB used</span>
        </p>

        {/* Multi-color Segment Bar */}
        <div className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-3">
          <span style={{ width: "42%" }} className="bg-cyan-500" />
          <span style={{ width: "33%" }} className="bg-purple-500" />
          <span style={{ width: "19%" }} className="bg-amber-500" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-[11.5px] text-ink-5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-cyan-500" /> Photos (19.8 GB)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-purple-500" /> Video (15.5 GB)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-amber-500" /> Docs (11.9 GB)
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          disabled={trashCleaned}
          onClick={cleanTrash}
          className="flex-1 rounded-xl bg-surface-3 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-surface-4 disabled:opacity-50"
        >
          {trashCleaned ? "Trash is empty" : "Empty trash (-9.1 GB)"}
        </button>
        <button
          type="button"
          className="flex-1 rounded-xl bg-primary py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Upgrade to 1 TB
        </button>
      </div>
    </div>
  );
}
