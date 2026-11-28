"use client";

import { VoiceBar } from "@/components/voice-bar";
import { TaskCard, type TaskList } from "@/components/task-card";
import { Afterglow, type AfterglowHandle } from "@/components/afterglow";
import { Snowfall } from "@/components/snowfall";
import { ActivityRings, type RingDay, type RingGoal } from "@/components/activity-rings";
import { Storage, type StorageKind } from "@/components/storage";
import { CookieConsent } from "@/components/cookie-consent";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Check,
  Lock,
  Unlock,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  Flame,
  Mic,
  MicOff,
  Zap,
  SlidersHorizontal,
  Plus,
  HardDrive,
  ArrowUp,
  ListChecks,
  Brain,
  Paperclip,
  RotateCcw,
  Cookie,
} from "lucide-react";
import { NumberRoll } from "@/components/number-roll";
import { TextMorph } from "@/components/text-morph";

// -------------------------------------------------------------
// 1. Morphing Chart Demo
// -------------------------------------------------------------
export function MorphingChartDemo() {
  const [tab, setTab] = useState<"Revenue" | "Visitors">("Revenue");
  const [shape, setShape] = useState<"area" | "spline">("area");

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

      <div className="relative mt-4 h-52 w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="morph-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={shape === "area" ? 0.35 : 0.05} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

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

          <path
            d={areaD}
            fill="url(#morph-glow)"
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

          <path
            d={curveD}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

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
// 2. Pillar Chart Demo
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
// 3. Cookie Consent Demo (Authentic Hairline Cookie Monster banner + preferences card)
// -------------------------------------------------------------
export function CookieConsentDemo() {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <CookieConsent
        onSave={async (choices) => {
          await new Promise((r) => setTimeout(r, 600));
        }}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 4. Activity Heatmap Demo
// -------------------------------------------------------------
export function ActivityHeatmapDemo() {
  const [metric, setMetric] = useState<"orders" | "customers">("orders");

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
// 5. Voice Bar Demo
// -------------------------------------------------------------
const VOICE_PHRASES = [
  "Set a timer for ten minutes and remind me to check the roast",
  "Draft a reply to Fernhill confirming Friday morning delivery",
  "Summarise the three open blockers before the release review",
];

const ATTACHMENTS = ["launch-notes.md", "q4-metrics.csv", "voice-brief.pdf"];

export function VoiceBarDemo() {
  return (
    <div className="flex w-full max-w-[560px] flex-col items-center justify-center p-2">
      <VoiceBar
        defaultValue="Draft a reply to Fernhill confirming Friday morning delivery"
        placeholder="Draft a reply to Fernhill confirming Friday morning delivery"
        onSubmit={async (prompt) => {
          await new Promise((r) => setTimeout(r, 1200));
        }}
      />
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
// 8. Status Capsule Demo
// -------------------------------------------------------------
export function StatusCapsuleDemo() {
  const [status, setStatus] = useState<"idle" | "working" | "done">("idle");
  const [actionKind, setActionKind] = useState<"lock" | "unlock">("lock");
  const [showLog, setShowLog] = useState(false);

  const lockLog = [
    { id: "a", label: "Front door locked", detail: "Deadbolt · just now", time: "11:02 PM" },
    { id: "b", label: "Motion detected", detail: "Front porch", time: "10:45 PM" },
    { id: "c", label: "Door sensor open", detail: "Front porch", time: "10:38 PM" },
    { id: "d", label: "Unlocked with keypad", detail: "Entry pad", time: "6:14 PM" },
  ];

  const handleLock = () => {
    setActionKind("lock");
    setStatus("working");
    setTimeout(() => {
      setStatus("done");
    }, 1200);
  };

  const handleUnlock = () => {
    setActionKind("unlock");
    setStatus("working");
    setTimeout(() => {
      setStatus("idle");
    }, 1000);
  };

  const title =
    status === "done"
      ? "Front door locked"
      : status === "working"
      ? actionKind === "lock"
        ? "Locking front door"
        : "Unlocking front door"
      : "Front door";

  const subtitle =
    status === "done"
      ? "Deadbolt · just now"
      : status === "working"
      ? "Deadbolt · turning"
      : "Unlocked · Entry pad";

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className={`grid size-8 place-items-center rounded-xl transition-colors ${
              status === "done"
                ? "bg-emerald-500/15 text-emerald-600"
                : "bg-surface-3 text-ink-6"
            }`}
          >
            {status === "done" ? <Lock className="size-4" /> : <Unlock className="size-4" />}
          </span>
          <div>
            <h4 className="text-[14px] font-semibold text-ink">
              <TextMorph>{title}</TextMorph>
            </h4>
            <p className="text-[11.5px] text-ink-6">
              <TextMorph>{subtitle}</TextMorph>
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={status === "working"}
          onClick={status === "done" ? handleUnlock : handleLock}
          className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium transition-all ${
            status === "done"
              ? "bg-surface-3 text-ink hover:bg-surface-4"
              : "bg-primary text-white hover:opacity-90"
          }`}
        >
          {status === "working"
            ? "Working..."
            : status === "done"
            ? "Unlock"
            : "Lock"}
        </button>
      </div>

      <div className="mt-4 border-t border-edge/[0.06] pt-3">
        <button
          type="button"
          onClick={() => setShowLog(!showLog)}
          className="flex w-full items-center justify-between text-[12px] font-medium text-ink-5 hover:text-ink"
        >
          <span>Lock history</span>
          <span className="text-[11px] text-ink-6 font-mono">{showLog ? "Hide" : "Show (4)"}</span>
        </button>

        {showLog && (
          <div className="mt-2.5 space-y-2 text-[11.5px]">
            {lockLog.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-ink-5">
                <div>
                  <p className="font-medium text-ink">{item.label}</p>
                  <p className="text-[10.5px] text-ink-6">{item.detail}</p>
                </div>
                <span className="font-mono text-ink-6">{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. Afterglow Demo
// -------------------------------------------------------------
export function AfterglowDemo() {
  const glowRef = useRef<AfterglowHandle>(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (loading) return;
    setLoading(true);
    await glowRef.current?.play(() => {
      setPublished(true);
    });
    setLoading(false);
    setTimeout(() => setPublished(false), 4000);
  };

  return (
    <div className="flex w-full items-center justify-center p-2">
      <Afterglow ref={glowRef}>
        <div className="relative flex w-[320px] flex-col rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-muted-foreground">Ready to publish</p>
              <h4 className="text-[15px] font-semibold text-foreground">Gelato Summer Release 2026</h4>
            </div>
            {published && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-500">
                Published
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2 text-[12.5px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>6 new seasonal flavours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Shop page & nutrition facts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Customer newsletter scheduled</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePublish}
            disabled={loading}
            className="mt-5 flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary py-2.5 text-[13px] font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {published ? "Release published" : "Publish release"}
          </button>
        </div>
      </Afterglow>
    </div>
  );
}

// -------------------------------------------------------------
// 10. Snowfall Demo
// -------------------------------------------------------------
export function SnowfallDemo() {
  return (
    <div className="flex w-full items-center justify-center p-2">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card/60 p-6 sm:p-8 shadow-sm">
        <Snowfall intensity={1} keepFalling shake>
          <div className="flex cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-2xl bg-surface-2 p-6 shadow-sm transition-transform active:scale-95">
            <svg
              className="size-14 text-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] font-medium text-foreground">Winter Snowfall</span>
            <span className="text-[11px] text-muted-foreground">Tap to shake</span>
          </div>
        </Snowfall>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. Add To Cart Demo
// -------------------------------------------------------------
export function AddToCartDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setCartCount((c) => c + 1);
    setTimeout(() => {
      setAdded(false);
    }, 1600);
  };

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] font-medium uppercase tracking-wider text-ink-6">Featured</span>
        <div className="relative flex items-center">
          <ShoppingBag className="size-4 text-ink-4" />
          <span className="ml-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10.5px] font-semibold text-white">
            <NumberRoll value={cartCount} />
          </span>
        </div>
      </div>

      <div className="mt-4 aspect-square overflow-hidden rounded-[18px] bg-muted shadow-inner">
        <img
          src="/ui-assets/delete-undo/chair.webp"
          alt="Dune lounge chair in terracotta bouclé"
          className="size-full object-cover"
          draggable={false}
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium text-ink">Dune lounge chair</p>
          <p className="text-[12.5px] text-ink-6">Terracotta bouclé</p>
        </div>
        <p className="text-[14px] font-medium tabular-nums text-ink">$1,240</p>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded-full bg-ink text-[13.5px] font-medium text-surface shadow-sm transition-transform hover:opacity-90 active:scale-[0.98]"
      >
        <TextMorph>{added ? "Added to cart" : "Add to cart"}</TextMorph>
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
          <p className="text-[20px] font-semibold tracking-tight text-ink tabular-nums select-none">
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
const INITIAL_TASK_LISTS: TaskList[] = [
  {
    id: "sprint",
    title: "Sprint backlog",
    color: ["var(--chart-1, #3b82f6)", "var(--chart-2, #8b5cf6)"],
    href: "#",
    linkLabel: "View all",
    tasks: [
      { id: "task-1", label: "Audit landing page typography", done: true, due: "Design" },
      { id: "task-2", label: "Hook up Stripe webhook handler", done: false, due: "API" },
      { id: "task-3", label: "Benchmark CSS paint & LCP score", done: false, due: "Perf" },
    ],
  },
];

export function TaskCardDemo() {
  const [lists, setLists] = useState<TaskList[]>(INITIAL_TASK_LISTS);

  const handleToggle = (listId: string, taskId: string, done: boolean) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, done } : t)),
            }
          : l
      )
    );
  };

  const handleAdd = (listId: string, label: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              tasks: [
                ...l.tasks,
                { id: String(Date.now()), label, done: false, due: "Task" },
              ],
            }
          : l
      )
    );
  };

  return (
    <div className="flex w-full items-center justify-center p-2">
      <TaskCard
        lists={lists}
        onToggle={handleToggle}
        onAdd={handleAdd}
      />
    </div>
  );
}

// -------------------------------------------------------------
// 14. Variant Pick Demo
// -------------------------------------------------------------
const VARIANT_IMAGES = [
  { id: "coast", src: "/ui-assets/delete-undo/coast.webp", label: "Coast" },
  { id: "lake", src: "/ui-assets/delete-undo/lake.webp", label: "Lake" },
  { id: "runner", src: "/ui-assets/delete-undo/runner.webp", label: "Runner" },
  { id: "oranges", src: "/ui-assets/delete-undo/oranges.webp", label: "Oranges" },
];

export function VariantPickDemo() {
  const [selectedId, setSelectedId] = useState("coast");
  const selectedImage = VARIANT_IMAGES.find((img) => img.id === selectedId) ?? VARIANT_IMAGES[0];

  return (
    <div className="flex w-full max-w-[340px] flex-col rounded-2xl bg-surface p-5 shadow-[var(--plate-shadow),0_0_0_1px_rgb(var(--edge-rgb)/0.08)]">
      <div className="flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-ink">Photo variant</h4>
        <span className="text-[12px] font-medium text-primary">
          <TextMorph>{selectedImage.label}</TextMorph>
        </span>
      </div>

      <div className="mt-4 aspect-[4/3] overflow-hidden rounded-xl bg-surface-2 shadow-inner">
        <img
          src={selectedImage.src}
          alt={selectedImage.label}
          className="size-full object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          draggable={false}
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {VARIANT_IMAGES.map((img) => {
          const isSel = img.id === selectedId;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedId(img.id)}
              className={`aspect-square overflow-hidden rounded-lg p-0.5 transition-all ${
                isSel
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-surface"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="size-full rounded object-cover"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 15. Activity Rings Demo (Authentic Business metrics: Orders, Revenue, Regulars + 7-Day Picker)
// -------------------------------------------------------------
const GOALS = [
  { id: "orders", label: "Orders", goal: 120, format: { maximumFractionDigits: 0 } },
  { id: "revenue", label: "Revenue", goal: 1200, format: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
  { id: "regulars", label: "Regulars back", goal: 15, format: { maximumFractionDigits: 0 } },
];

const RING_COLORS = [
  "var(--chart-1, var(--primary))",
  "#e8743b",
  "#1baf7a",
];

const DAYS_DATA = [
  { key: "mon", label: "M", title: "Monday 5 October", values: [131, 1284, 17] },
  { key: "tue", label: "T", title: "Tuesday 6 October", values: [98, 912, 11] },
  { key: "wed", label: "W", title: "Wednesday 7 October", values: [142, 1466, 21] },
  { key: "thu", label: "T", title: "Thursday 8 October", values: [87, 845, 9] },
  { key: "fri", label: "F", title: "Friday 9 October", values: [128, 1340, 18] },
  { key: "sat", label: "S", title: "Saturday 10 October", values: [93, 940, 12] },
  { key: "sun", label: "S", title: "Sunday 11 October", values: [64, 620, 8] },
];

const ACTIVITY_GOALS: RingGoal[] = [
  { id: "orders", label: "Orders", goal: 120 },
  { id: "revenue", label: "Revenue", goal: 1200, format: { style: "currency" as const, currency: "USD", maximumFractionDigits: 0 } },
  { id: "regulars", label: "Regulars back", goal: 15 },
];

const ACTIVITY_DAYS: RingDay[] = [
  { key: "mon", label: "M", title: "Monday 5 October", values: [85, 820, 10] },
  { key: "tue", label: "T", title: "Tuesday 6 October", values: [110, 1050, 14] },
  { key: "wed", label: "W", title: "Wednesday 7 October", values: [95, 910, 11] },
  { key: "thu", label: "T", title: "Thursday 8 October", values: [130, 1340, 16] },
  { key: "fri", label: "F", title: "Friday 9 October", values: [142, 1480, 18] },
  { key: "sat", label: "S", title: "Saturday 10 October", values: [null, null, null] },
  { key: "sun", label: "S", title: "Sunday 11 October", values: [null, null, null] },
];

export function ActivityRingsDemo() {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <ActivityRings goals={ACTIVITY_GOALS} days={ACTIVITY_DAYS} defaultValue="fri" locales="en-US" />
    </div>
  );
}

// -------------------------------------------------------------
// 16. Storage Demo (Authentic Hairline Duffel Bag Illustration + storage meter)
// -------------------------------------------------------------
const STORAGE_KINDS: StorageKind[] = [
  { id: "photos", label: "Photos", bytes: 19.8 * 1024 * 1024 * 1024, color: "var(--chart-1, #3b82f6)" },
  { id: "video", label: "Video", bytes: 15.5 * 1024 * 1024 * 1024, color: "var(--chart-2, #8b5cf6)" },
  { id: "docs", label: "Docs", bytes: 11.9 * 1024 * 1024 * 1024, color: "var(--chart-3, #10b981)" },
];

export function StorageDemo() {
  const [used, setUsed] = useState(47.2 * 1024 * 1024 * 1024);
  const [limit, setLimit] = useState(50 * 1024 * 1024 * 1024);

  return (
    <div className="flex w-full items-center justify-center py-2">
      <Storage
        used={used}
        limit={limit}
        kinds={STORAGE_KINDS}
        cleanUpLabel="Empty trash (-9.1 GB)"
        onCleanUp={async () => {
          await new Promise((r) => setTimeout(r, 700));
          setUsed((u) => Math.max(10 * 1024 * 1024 * 1024, u - 9.1 * 1024 * 1024 * 1024));
        }}
        upgradeLabel="Upgrade to 1 TB"
        onUpgrade={async () => {
          await new Promise((r) => setTimeout(r, 700));
          setLimit(1000 * 1024 * 1024 * 1024);
        }}
      />
    </div>
  );
}
