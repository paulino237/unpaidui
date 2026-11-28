"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  MorphingChartDemo,
  PillarChartDemo,
  CookieConsentDemo,
  ActivityHeatmapDemo,
  VoiceBarDemo,
  AgentComposerDemo,
  StreakChainDemo,
  StatusCapsuleDemo,
  AfterglowDemo,
  SnowfallDemo,
  AddToCartDemo,
  LiveLineChartDemo,
  TaskCardDemo,
  VariantPickDemo,
  ActivityRingsDemo,
  StorageDemo,
} from "@/components/component-demos";

const COMPONENT_MAP: Record<
  string,
  {
    title: string;
    description: string;
    component: React.ComponentType;
  }
> = {
  "activity-rings": {
    title: "Activity rings",
    description:
      "Three daily goals as concentric rings beside a tight legend, with the week underneath: pick a day and the rings sweep to it.",
    component: ActivityRingsDemo,
  },
  storage: {
    title: "Storage",
    description:
      "A storage meter with Pack and his suitcase: near the limit the case bulges; clean up and he hops down, upgrade and a roomy trunk arrives.",
    component: StorageDemo,
  },
  "cookie-consent": {
    title: "Cookie consent",
    description:
      "A cookie banner with a mascot: every cookie you allow flies to Crumb, who catches it, nibbles it and gets rounder and happier.",
    component: CookieConsentDemo,
  },
  "voice-bar": {
    title: "Voice bar",
    description:
      "A conversational pill with live waveform, cycling prompts, and audio level indicators.",
    component: VoiceBarDemo,
  },
  "status-capsule": {
    title: "Status capsule",
    description:
      "Front door lock card with animated state transitions and expandable lock history drawer.",
    component: StatusCapsuleDemo,
  },
  "add-to-cart": {
    title: "Add to cart",
    description:
      "Product showcase with dynamic counter badge and morphing state feedback.",
    component: AddToCartDemo,
  },
  "live-line-chart": {
    title: "Live line chart",
    description:
      "Rolling API request throughput monitor with rate limit threshold indicator.",
    component: LiveLineChartDemo,
  },
  "task-card": {
    title: "Task card",
    description:
      "Sprint backlog with interactive checkboxes and quick task creator.",
    component: TaskCardDemo,
  },
  snowfall: {
    title: "Snowfall",
    description:
      "Gentle particle physics simulation with organic drift dynamics.",
    component: SnowfallDemo,
  },
  "variant-pick": {
    title: "Variant pick",
    description:
      "Art photography gallery thumbnails with preview and title morphing.",
    component: VariantPickDemo,
  },
  "morphing-chart": {
    title: "Morphing chart",
    description:
      "Interactive SVG area, spline, and line morphing visualization.",
    component: MorphingChartDemo,
  },
  "pillar-chart": {
    title: "Pillar chart",
    description:
      "Animated gradient metric pillars with W/M/Y interval controls.",
    component: PillarChartDemo,
  },
  "activity-heatmap": {
    title: "Activity heatmap",
    description:
      "Dual matrix contribution grid with density color mapping.",
    component: ActivityHeatmapDemo,
  },
  "agent-composer": {
    title: "Agent composer",
    description:
      "Autonomous AI task dispatch modal with granular control modes.",
    component: AgentComposerDemo,
  },
  "streak-chain": {
    title: "Streak chain",
    description:
      "Habit formation streak tracker with flame pulse indicator.",
    component: StreakChainDemo,
  },
  afterglow: {
    title: "Afterglow",
    description:
      "Production readiness verification checklist with release trigger pulse.",
    component: AfterglowDemo,
  },
};

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const data = COMPONENT_MAP[slug];

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-semibold text-ink">Component Not Found</h1>
        <p className="mt-2 text-ink-6">The requested demo does not exist.</p>
        <Link
          href="/#components"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-surface-3 px-4 py-2 text-sm font-medium text-ink hover:bg-surface-4"
        >
          <ArrowLeft className="size-4" /> Back to components
        </Link>
      </div>
    );
  }

  const Comp = data.component;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <Link
          href="/#components"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-6 transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> Components
        </Link>
        <span className="text-xs font-mono uppercase tracking-wider text-ink-6">
          Hairline UI
        </span>
      </header>

      {/* Main Preview Container */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12">
        <div className="mb-8 max-w-lg text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {data.title}
          </h1>
          <p className="mt-2 text-sm text-ink-6">{data.description}</p>
        </div>

        {/* Demo Stage */}
        <div className="flex w-full max-w-3xl items-center justify-center rounded-[28px] border border-border bg-surface/50 p-6 sm:p-12 shadow-sm backdrop-blur-sm">
          <Comp />
        </div>
      </main>
    </div>
  );
}
