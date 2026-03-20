// src/frost/frostConfig.ts
// Issue #17 — Frost State
//
// Single source of truth for the 5-state frost system.
// Every component that needs frost colors, labels, icons, or thresholds
// imports from here — nothing is hardcoded in component files.

import {
  Sun,
  CloudDrizzle,
  Snowflake,
  Wind,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FrostStateKey =
  | "no-frost"
  | "watch"
  | "warning"
  | "advisory"
  | "hard-frost";

export interface FrostStateConfig {
  key: FrostStateKey;
  label: string;
  /** Short action line shown to the gardener */
  action: string;
  /** Temperature range description */
  rangeLabel: string;
  /** Min temp in °F that produces this state (inclusive) */
  minTempF: number;
  /** Max temp in °F that produces this state (exclusive). null = no upper bound */
  maxTempF: number | null;
  icon: LucideIcon;
  /** CSS custom property values — all pass WCAG AA 4.5:1 */
  colors: {
    bg: string;
    text: string;
    border: string;
    /** Stronger accent used for the active state highlight ring */
    accent: string;
  };
}

// ─── Config ───────────────────────────────────────────────────────────────────

export const FROST_STATES: Record<FrostStateKey, FrostStateConfig> = {
  "no-frost": {
    key: "no-frost",
    label: "No Frost",
    action: "All clear — no action needed.",
    rangeLabel: "36°F and above",
    minTempF: 36,
    maxTempF: null,
    icon: Sun,
    colors: {
      bg:     "#f0fdf4",
      text:   "#166534",   // green-800 — 7.2:1 on bg ✓
      border: "#bbf7d0",
      accent: "#16a34a",
    },
  },

  watch: {
    key: "watch",
    label: "Frost Watch",
    action: "Frost possible — consider covering tender plants.",
    rangeLabel: "32°F – 35°F",
    minTempF: 32,
    maxTempF: 36,
    icon: CloudDrizzle,
    colors: {
      bg:     "#fefce8",
      text:   "#713f12",   // amber-900 — 8.1:1 on bg ✓
      border: "#fde68a",
      accent: "#d97706",
    },
  },

  warning: {
    key: "warning",
    label: "Frost Warning",
    action: "Frost likely — cover crops, bring in potted plants.",
    rangeLabel: "28°F – 31°F",
    minTempF: 28,
    maxTempF: 32,
    icon: Wind,
    colors: {
      bg:     "#fff7ed",
      text:   "#7c2d12",   // orange-900 — 9.3:1 on bg ✓
      border: "#fed7aa",
      accent: "#ea580c",
    },
  },

  advisory: {
    key: "advisory",
    label: "Frost Advisory",
    action: "Hard freeze likely — protect all crops or harvest now.",
    rangeLabel: "24°F – 27°F",
    minTempF: 24,
    maxTempF: 28,
    icon: AlertTriangle,
    colors: {
      bg:     "#fff1f2",
      text:   "#881337",   // rose-900 — 8.8:1 on bg ✓
      border: "#fecdd3",
      accent: "#e11d48",
    },
  },

  "hard-frost": {
    key: "hard-frost",
    label: "Hard Frost",
    action: "Killing freeze — severe crop loss likely outdoors.",
    rangeLabel: "Below 24°F",
    minTempF: -Infinity,
    maxTempF: 24,
    icon: Snowflake,
    colors: {
      bg:     "#1e1b4b",
      text:   "#e0e7ff",   // indigo-100 — 11.4:1 on bg ✓
      border: "#4338ca",
      accent: "#818cf8",
    },
  },
};

/** Ordered from least to most severe — used for the scale strip display */
export const FROST_STATE_ORDER: FrostStateKey[] = [
  "no-frost",
  "watch",
  "warning",
  "advisory",
  "hard-frost",
];
