"use client";

import { useEffect, useState } from "react";
import { Palette, Sun, Moon } from "lucide-react";

const ACCENTS = [
  { id: "ember", name: "Ember", color: "#f1601f" },
  { id: "rose", name: "Rose", color: "#ec4074" },
  { id: "sky", name: "Sky", color: "#2f7df6" },
  { id: "jade", name: "Jade", color: "#12a37a" },
  { id: "graphite", name: "Graphite", color: "#55534e" },
];

export function ThemeSwitcher() {
  const [accent, setAccent] = useState("ember");
  const [isDark, setIsDark] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("arclight-accent") || "ember";
    const savedTheme = localStorage.getItem("arclight-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;

    setAccent(savedAccent);
    setIsDark(isDarkMode);

    document.documentElement.setAttribute("data-accent", savedAccent);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeAccent = (newAccent: string) => {
    setAccent(newAccent);
    localStorage.setItem("arclight-accent", newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
    setPaletteOpen(false);
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("arclight-theme", nextDark ? "dark" : "light");
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-center gap-2 sm:right-6 sm:bottom-6">
      {/* Accent Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setPaletteOpen(!paletteOpen)}
          aria-haspopup="dialog"
          aria-expanded={paletteOpen}
          aria-label={`Accent color: ${accent}. Change accent color`}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_8px_24px_-12px_rgb(12_12_13/0.25)] transition-[background-color,scale] duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 dark:shadow-none"
        >
          <Palette className="size-[18px]" />
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-card bg-accent transition-colors duration-300"
          />
        </button>

        {paletteOpen && (
          <div className="absolute right-0 bottom-14 z-50 flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-2 shadow-float animate-appear [--appear-y:8px]">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => changeAccent(a.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors hover:bg-muted ${
                  accent === a.id ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className="size-3.5 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                  style={{ backgroundColor: a.color }}
                />
                {a.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dark / Light Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_8px_24px_-12px_rgb(12_12_13/0.25)] transition-[background-color,scale] duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 dark:shadow-none"
      >
        {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
      </button>
    </div>
  );
}
