// Hairline UI · task-card · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

"use client";

import * as React from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { TextMorph } from "./text-morph";

/* ─────────────────────────────────────────────────────────
 * TASK CARD: a list of tasks on a tinted tray, a few lists deep
 *
 *   tray      the card sits on a tray of the list's two colours with
 *             a fine engraved texture; finish the list and a band of
 *             light crosses it once
 *   tick      tap a task: the box fills with the same gradient and
 *             its check draws; then a line travels slowly through the
 *             name and the ink fades behind it as it goes, so the
 *             name greys exactly where it has been crossed
 *   sink      a moment after your last tick the done tasks glide
 *             down under the open ones (and an unticked one rises
 *             back), all in one move, so a run of ticks never
 *             reshuffles under your finger
 *   add       "Add a task" is the field: tap it, type, Enter; the
 *             new task folds in above the done ones and the field
 *             stays open for the next
 *   page      ‹ › move between your lists: the tray changes colour,
 *             the card slides the way you went and eases to its
 *             new height
 *
 * The tasks are yours: pass lists from your store and save in
 * onToggle and onAdd. A tick shows at once; throw or reject and it
 * goes back with a small shake.
 * ───────────────────────────────────────────────────────── */

export interface TaskItem {
  id: string;
  label: string;
  done: boolean;
  /** A short due label, e.g. "Today" or "Fri". */
  due?: string;
  /** Shows the due label in red. */
  late?: boolean;
  /** Who it's on: a small avatar (initials when there's no src). */
  assignee?: { name: string; src?: string };
}

export interface TaskList {
  id: string;
  title: string;
  tasks: TaskItem[];
  /** Where the footer link goes, e.g. the full project. */
  href?: string;
  /** The footer link's words. Defaults to "View all". */
  linkLabel?: string;
  /** The tray's colours: one CSS colour, or two for its gradient. Defaults to pairs of your chart colours. */
  color?: string | [string, string];
}

export interface TaskCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  lists: TaskList[];
  /** The list showing, controlled; or leave it to the card with defaultList. */
  list?: string;
  defaultList?: string;
  onListChange?: (listId: string) => void;
  /** Save a tick or untick. Throw or reject to undo it on screen. */
  onToggle?: (listId: string, taskId: string, done: boolean) => Promise<unknown> | void;
  /** Save a new task; add it to the list you pass back. Without it there's no Add row. */
  onAdd?: (listId: string, label: string) => Promise<unknown> | void;
}

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";
const ROW = 36;
const SETTLE = 1000; // after the last tick, once its strike has finished
const STRIKE = 620;
// Each list's two colours, as pairs of chart colours that sit well together.
const PAIRS: [number, number][] = [
  [1, 3],
  [5, 2],
  [3, 1],
  [2, 5],
  [4, 1],
];

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

const mix = (color: string, amount: number, into = "transparent") => `color-mix(in oklab, ${color} ${amount}%, ${into})`;
const openFirst = (tasks: TaskItem[]) => [...tasks.filter((t) => !t.done), ...tasks.filter((t) => t.done)].map((t) => t.id);
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
const hue = (seed: string) => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `var(--chart-${(h % 5) + 1}, var(--primary))`;
};
const isThenable = (r: unknown): r is Promise<unknown> => !!r && typeof (r as Promise<unknown>).then === "function";

export function TaskCard({ lists, list, defaultList, onListChange, onToggle, onAdd, className = "", style, ...props }: TaskCardProps) {
  const reduced = useReducedMotion();
  const [ownList, setOwnList] = React.useState(defaultList ?? lists[0]?.id ?? "");
  const currentId = list ?? ownList;
  const index = Math.max(0, lists.findIndex((l) => l.id === currentId));
  const current = lists[index];
  const pair = PAIRS[index % PAIRS.length];
  const [color, color2] = Array.isArray(current?.color)
    ? current.color
    : current?.color
      ? [current.color, mix(current.color, 55, "var(--foreground)")]
      : [`var(--chart-${pair[0]}, var(--primary))`, `var(--chart-${pair[1]}, var(--primary))`];

  // A tick shows straight away and holds until your save settles.
  const [pending, setPending] = React.useState<Record<string, boolean>>({});
  const [order, setOrder] = React.useState<Record<string, string[]>>({});
  const [adding, setAdding] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [said, setSaid] = React.useState("");

  const boxRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const addRowRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef(new Map<string, HTMLElement>());
  const flip = React.useRef<Map<string, number> | null>(null);
  const swap = React.useRef<{ dir: number; from: number } | null>(null);
  const seen = React.useRef<{ list: string; ids: Set<string> }>({ list: "", ids: new Set() });
  const settleTimer = React.useRef(0);
  const liveTasks = React.useRef<{ list: string; tasks: TaskItem[] }>({ list: "", tasks: [] });
  const sweepRef = React.useRef<HTMLDivElement>(null);
  const finished = React.useRef<{ list: string; all: boolean } | null>(null);

  const tasks = React.useMemo(() => (current?.tasks ?? []).map((t) => (t.id in pending ? { ...t, done: pending[t.id] } : t)), [current, pending]);
  const byId = new Map(tasks.map((t) => [t.id, t]));

  // The order on screen moves only when it settles; new tasks join the open ones.
  const base = (current && order[current.id]) ?? openFirst(tasks);
  const known = base.filter((id) => byId.has(id));
  const fresh = tasks.filter((t) => !known.includes(t.id)).map((t) => t.id);
  if (fresh.length) {
    const at = known.findIndex((id) => byId.get(id)?.done);
    known.splice(at < 0 ? known.length : at, 0, ...fresh);
  }
  const shown = known.map((id) => byId.get(id)!);
  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const allDone = total > 0 && done === total;

  // Finishing a list sends one band of light across the tray.
  React.useEffect(() => {
    const id = current?.id ?? "";
    const before = finished.current;
    finished.current = { list: id, all: allDone };
    if (!before || before.list !== id || before.all || !allDone || reduced) return;
    sweepRef.current?.animate(
      [
        { transform: "translateX(-100%)", opacity: 0 },
        { opacity: 1, offset: 0.25 },
        { transform: "translateX(100%)", opacity: 0 },
      ],
      { duration: 1300, delay: STRIKE + 200, easing: "cubic-bezier(0.45,0,0.25,1)", fill: "backwards" },
    );
  }, [allDone, current?.id, reduced]);

  React.useLayoutEffect(() => {
    liveTasks.current = { list: current?.id ?? "", tasks };
  });

  React.useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  // Done tasks sink (and undone ones rise) in one glide from where they were.
  const shownKey = known.join("|");
  const listId = current?.id ?? "";
  React.useLayoutEffect(() => {
    const before = flip.current;
    flip.current = null;
    // Rows that arrived since the last render fold in, unless the whole list just changed.
    const ids = shownKey ? shownKey.split("|") : [];
    const same = seen.current.list === listId;
    ids.forEach((id) => {
      const el = rowRefs.current.get(id);
      if (!el || reduced) return;
      if (same && !seen.current.ids.has(id)) {
        el.animate(
          [
            { height: "0px", opacity: 0, transform: "translateY(-6px)" },
            { height: `${ROW}px`, opacity: 1, transform: "none" },
          ],
          { duration: 380, easing: EASE },
        );
        return;
      }
      const from = before?.get(id);
      if (from === undefined) return;
      const delta = from - el.offsetTop;
      if (Math.abs(delta) < 1) return;
      // Rows going down (the done ones) dim as they pass under the rising ones, so the crossing reads as one going behind.
      const keyframes: Keyframe[] =
        delta < 0
          ? [{ transform: `translateY(${delta}px)`, opacity: 1 }, { opacity: 0.45, offset: 0.5 }, { transform: "none", opacity: 1 }]
          : [{ transform: `translateY(${delta}px)` }, { transform: "none" }];
      el.animate(keyframes, { duration: 600, easing: "cubic-bezier(0.65,0,0.35,1)" });
    });
    seen.current = { list: listId, ids: new Set(ids) };
  }, [shownKey, listId, reduced]);

  const settle = (animate: boolean) => {
    window.clearTimeout(settleTimer.current);
    const { list: listId, tasks: now } = liveTasks.current;
    if (!listId) return;
    if (animate) {
      const snapshot = new Map<string, number>();
      rowRefs.current.forEach((el, id) => snapshot.set(id, el.offsetTop));
      flip.current = snapshot;
    }
    setOrder((o) => ({ ...o, [listId]: openFirst(now) }));
  };

  const toggle = (task: TaskItem) => {
    if (!current) return;
    const next = !task.done;
    const listId = current.id;
    // Hold the order on screen until it settles, whatever the tick (or your save) does to the list meanwhile.
    const onScreen = known;
    setOrder((o) => (o[listId] ? o : { ...o, [listId]: onScreen }));
    setPending((p) => ({ ...p, [task.id]: next }));
    const box = rowRefs.current.get(task.id)?.querySelector("[data-box]");
    if (next && box && !reduced)
      box.animate([{ scale: "1" }, { scale: "0.88", offset: 0.4 }, { scale: "1.04", offset: 0.75 }, { scale: "1" }], { duration: 420, easing: "cubic-bezier(0.34,1.36,0.64,1)" });
    setSaid(next ? `${task.label}, done.` : `${task.label}, not done.`);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => settle(true), SETTLE);
    const clear = () =>
      setPending((p) => {
        if (!(task.id in p)) return p;
        const rest = { ...p };
        delete rest[task.id];
        return rest;
      });
    const refuse = () => {
      clear();
      const el = rowRefs.current.get(task.id);
      if (el && !reduced) el.animate([{ translate: "0 0" }, { translate: "-4px 0" }, { translate: "4px 0" }, { translate: "-2px 0" }, { translate: "0 0" }], { duration: 380, easing: "ease-out" });
    };
    let result: unknown;
    try {
      result = onToggle?.(listId, task.id, next);
    } catch {
      refuse();
      return;
    }
    if (isThenable(result)) result.then(clear, refuse);
    else if (onToggle) clear();
  };

  const go = (dir: number) => {
    if (lists.length < 2) return;
    const nextIndex = (index + dir + lists.length) % lists.length;
    const next = lists[nextIndex];
    settle(false);
    setAdding(false);
    setDraft("");
    const box = boxRef.current;
    const content = contentRef.current;
    if (box && content && !reduced) {
      // The old list leaves as a still copy; the new one renders in its place and slides in.
      const ghost = content.cloneNode(true) as HTMLElement;
      ghost.setAttribute("aria-hidden", "true");
      ghost.inert = true;
      Object.assign(ghost.style, { position: "absolute", left: "0", right: "0", top: "0", pointerEvents: "none" });
      box.appendChild(ghost);
      const out = ghost.animate(
        [
          { opacity: 1, transform: "none", filter: "blur(0px)" },
          { opacity: 0, transform: `translateX(${-dir * 28}px)`, filter: "blur(4px)" },
        ],
        { duration: 220, easing: EASE, fill: "forwards" },
      );
      out.onfinish = () => ghost.remove();
      out.oncancel = () => ghost.remove();
      swap.current = { dir, from: box.offsetHeight };
    }
    if (list === undefined) setOwnList(next.id);
    onListChange?.(next.id);
    setSaid(`${next.title}, list ${nextIndex + 1} of ${lists.length}.`);
  };

  React.useLayoutEffect(() => {
    const s = swap.current;
    swap.current = null;
    const box = boxRef.current;
    const content = contentRef.current;
    if (!s || !box || !content) return;
    content.animate(
      [
        { opacity: 0, transform: `translateX(${s.dir * 28}px)`, filter: "blur(4px)" },
        { opacity: 1, transform: "none", filter: "blur(0px)" },
      ],
      { duration: 420, delay: 70, easing: EASE, fill: "backwards" },
    );
    const to = box.offsetHeight;
    if (Math.abs(to - s.from) > 1) box.animate([{ height: `${s.from}px` }, { height: `${to}px` }], { duration: 460, easing: EASE });
  }, [currentId]);

  const submit = () => {
    const label = draft.trim();
    if (!label || !current || busy || !onAdd) return;
    const listId = current.id;
    const refuse = () => {
      setBusy(false);
      if (!reduced) addRowRef.current?.animate([{ translate: "0 0" }, { translate: "-4px 0" }, { translate: "4px 0" }, { translate: "-2px 0" }, { translate: "0 0" }], { duration: 380, easing: "ease-out" });
    };
    let result: unknown;
    try {
      result = onAdd(listId, label);
    } catch {
      refuse();
      return;
    }
    const added = () => {
      setBusy(false);
      setDraft("");
      setSaid(`Added ${label}.`);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    if (isThenable(result)) {
      setBusy(true);
      result.then(added, refuse);
    } else added();
  };

  const status = total === 0 ? "No tasks" : done === total ? "All done" : `${done} of ${total}`;
  const middle = mix(color, 50, color2);
  // Text on the tray picks dark or light from the tray's own colour, keeping a little of its hue, so any theme colour reads.
  const ink = `oklch(from ${middle} clamp(0.2, (0.66 - l) * 100, 0.98) calc(c * 0.5) h)`;
  const checkInk = `oklch(from ${color} clamp(0.2, (0.7 - l) * 100, 0.99) 0 h)`;
  const strikeLine = mix(color, 55, "var(--muted-foreground)");

  return (
    <div
      className={`relative w-full overflow-clip rounded-[26px] p-[5px] ${className}`}
      style={{
        backgroundColor: middle,
        backgroundImage: `repeating-linear-gradient(115deg, ${mix("var(--card)", 16)} 0 1px, transparent 1px 7px), linear-gradient(105deg, ${color}, ${color2})`,
        boxShadow: `inset 0 1px 0 ${mix("var(--card)", 40)}, inset 0 0 0 1px ${mix("var(--foreground)", 10)}`,
        transitionTimingFunction: EASE,
        ...style,
      }}
      {...props}
    >
      <div
        ref={sweepRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ background: `linear-gradient(100deg, transparent 30%, ${mix("var(--card)", 50)} 50%, transparent 70%)` }}
      />
      <div aria-hidden="true" data-natural-width className="grid h-0" style={{ gridTemplateColumns: "minmax(0, 340px)" }} />
      <div
        className="relative rounded-[21px] bg-card text-card-foreground transition-shadow duration-500"
        style={{ boxShadow: `0 0 0 1px ${mix(mix(color, 60, "var(--foreground)"), 26)}`, transitionTimingFunction: EASE }}
      >
        <div ref={boxRef} className="relative overflow-clip rounded-[21px]">
          <div ref={contentRef} className="p-4 pb-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="min-w-0 truncate text-[15px] font-medium tracking-[-0.01em] text-foreground">{current?.title}</h3>
              <p className="shrink-0 text-[12px] text-muted-foreground tabular-nums">
                <TextMorph>{status}</TextMorph>
              </p>
            </div>
            <ul aria-label={current?.title} className="mt-2">
              {shown.map((t) => (
                <li
                  key={t.id}
                  ref={(el) => {
                    if (el) rowRefs.current.set(t.id, el);
                    else rowRefs.current.delete(t.id);
                  }}
                  className="overflow-clip"
                  style={{ height: ROW }}
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={t.done}
                    onClick={() => toggle(t)}
                    className={`group flex h-full w-full cursor-pointer items-center gap-3 rounded-[8px] text-left ${FOCUS}`}
                  >
                    <span
                      aria-hidden="true"
                      data-box
                      className={`relative flex size-[18px] shrink-0 items-center justify-center overflow-clip rounded-[6px] transition-[box-shadow,background-color] duration-200 ${
                        t.done ? "" : "shadow-[inset_0_0_0_1.5px_var(--box-rest)] group-hover:bg-[var(--box-wash)] group-hover:shadow-[inset_0_0_0_1.5px_var(--box-hover)]"
                      }`}
                      style={{
                        ["--box-rest" as string]: mix("var(--foreground)", 24, "var(--border)"),
                        ["--box-hover" as string]: mix("var(--foreground)", 45, "var(--border)"),
                        ["--box-wash" as string]: "var(--muted)",
                      }}
                    >
                      <span
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color2})`, opacity: t.done ? 1 : 0 }}
                      />
                      <svg viewBox="0 0 12 12" className="relative size-3" fill="none">
                        <path
                          d="M2.5 6.2 5 8.6l4.6-5"
                          pathLength={1}
                          stroke={checkInk}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ strokeDasharray: 1, strokeDashoffset: t.done ? 0 : 1, transition: reduced ? "none" : `stroke-dashoffset 300ms ${EASE} ${t.done ? 60 : 0}ms` }}
                        />
                      </svg>
                    </span>
                    {/* The strike: a line travels slowly through the name and the ink fades behind it, exactly as far as it has gone. */}
                    <span className="relative min-w-0">
                      <span className="block truncate text-[13.5px] text-foreground">{t.label}</span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block truncate text-[13.5px] text-muted-foreground"
                        style={{
                          clipPath: t.done ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                          transition: reduced ? "none" : t.done ? `clip-path ${STRIKE}ms cubic-bezier(0.65,0,0.35,1) 160ms` : `clip-path 320ms ${EASE}`,
                        }}
                      >
                        {t.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 top-1/2 h-px origin-left rounded-full"
                        style={{
                          background: strikeLine,
                          transform: t.done ? "none" : "scaleX(0)",
                          transformOrigin: t.done ? "left" : "right",
                          transition: reduced ? "none" : t.done ? `transform ${STRIKE}ms cubic-bezier(0.65,0,0.35,1) 160ms` : `transform 320ms ${EASE}`,
                        }}
                      />
                    </span>
                    <span className="flex-1" />
                    {(t.due || t.assignee) && <Meta task={t} faded={t.done} reduced={reduced} />}
                  </button>
                </li>
              ))}
              {total === 0 && !adding && (
                <li className="flex items-center text-[13px] text-muted-foreground" style={{ height: ROW }}>
                  Nothing here yet.
                </li>
              )}
            </ul>

            {onAdd && (
              <div ref={addRowRef} className="flex items-center gap-3" style={{ height: ROW }}>
                <span
                  aria-hidden="true"
                  className="flex size-[18px] shrink-0 items-center justify-center rounded-[6px] text-muted-foreground"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${mix("var(--foreground)", 14, "var(--border)")}` }}
                >
                  {busy ? (
                    <svg viewBox="0 0 12 12" className="size-3 animate-spin" fill="none">
                      <path d="M6 1.5a4.5 4.5 0 1 1-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <Plus className="size-3" strokeWidth={2.2} />
                  )}
                </span>
                {adding ? (
                  <input
                    ref={inputRef}
                    value={draft}
                    readOnly={busy}
                    aria-label={`New task in ${current?.title ?? "list"}`}
                    placeholder="Add a task"
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submit();
                      } else if (e.key === "Escape") {
                        setDraft("");
                        setAdding(false);
                      }
                    }}
                    onBlur={() => {
                      if (!draft.trim() && !busy) setAdding(false);
                    }}
                    className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-foreground outline-none placeholder:text-muted-foreground sm:text-[13.5px]"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAdding(true);
                      requestAnimationFrame(() => inputRef.current?.focus());
                    }}
                    className={`h-full min-w-0 flex-1 cursor-pointer rounded-[6px] text-left text-[16px] text-muted-foreground transition-colors duration-200 hover:text-foreground sm:text-[13.5px] ${FOCUS}`}
                  >
                    Add a task
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex h-11 items-center justify-between gap-2 pl-4 pr-1.5" style={{ color: ink }}>
        {current?.href ? (
          <a
            href={current.href}
            className={`-mx-1 inline-flex min-w-0 items-center gap-1 rounded-[6px] px-1 text-[12.5px] font-medium transition-opacity duration-200 hover:opacity-75 ${FOCUS}`}
          >
            <span className="truncate">
              <TextMorph>{current.linkLabel ?? "View all"}</TextMorph>
            </span>
            <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
          </a>
        ) : (
          <span className="text-[12.5px] font-medium tabular-nums">
            <TextMorph>{total - done === 0 ? "Nothing left" : `${total - done} left`}</TextMorph>
          </span>
        )}
        {lists.length > 1 && (
          <div className="flex shrink-0 items-center">
            {[-1, 1].map((dir) => {
              const target = lists[(index + dir + lists.length) % lists.length];
              const Icon = dir < 0 ? ChevronLeft : ChevronRight;
              return (
                <button
                  key={dir}
                  type="button"
                  aria-label={`${dir < 0 ? "Previous" : "Next"} list: ${target.title}`}
                  onClick={() => go(dir)}
                  className={`flex size-8 cursor-pointer items-center justify-center rounded-full transition-[background-color,scale] duration-200 hover:bg-[color-mix(in_oklab,currentColor_12%,transparent)] active:scale-[0.92] ${FOCUS}`}
                  style={{ transitionTimingFunction: EASE }}
                >
                  <Icon aria-hidden="true" className="size-4" strokeWidth={2.2} />
                </button>
              );
            })}
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
    </div>
  );
}

function Meta({ task, faded, reduced }: { task: TaskItem; faded: boolean; reduced: boolean }) {
  return (
    <span
      className="flex shrink-0 items-center gap-2"
      style={{ opacity: faded ? 0.4 : 1, transition: reduced ? "none" : `opacity ${STRIKE}ms ease ${faded ? 300 : 0}ms` }}
    >
      {task.due && (
        <span className={`text-[11.5px] tabular-nums ${task.late && !faded ? "font-medium text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>{task.due}</span>
      )}
      {task.assignee &&
        (task.assignee.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={task.assignee.src} alt={task.assignee.name} className="size-5 rounded-full object-cover" />
        ) : (
          <span
            role="img"
            aria-label={task.assignee.name}
            className="flex size-5 items-center justify-center rounded-full text-[9px] font-semibold"
            style={{ background: mix(hue(task.assignee.name), 20, "var(--card)"), color: mix(hue(task.assignee.name), 80, "var(--foreground)") }}
          >
            {initials(task.assignee.name)}
          </span>
        ))}
    </span>
  );
}
