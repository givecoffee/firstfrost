// src/components/FrostCountdown.tsx
// Issue #18 — FrostCountdown.tsx + all 5 states
//
// Primary frost status display for the outdoor view.
// Shows the active state prominently and all five states in a compact
// scale strip so the user can see where they sit on the spectrum.

import { FROST_STATES, FROST_STATE_ORDER } from "../frost/frostConfig";
import { getFrostState, getFrostConfig } from "../frost/frostUtils";
import { cn } from "../utils/cn";

interface FrostCountdownProps {
  /** Current temperature in °F */
  tempF: number;
  className?: string;
}

export function FrostCountdown({ tempF, className }: FrostCountdownProps) {
  const activeKey = getFrostState(tempF);
  const active    = getFrostConfig(tempF);
  const Icon      = active.icon;

  return (
    <div
      className={cn("rounded-2xl border p-4 transition-colors duration-500", className)}
      style={{
        backgroundColor: active.colors.bg,
        borderColor:     active.colors.border,
      }}
      // Announce state changes to screen readers
      aria-live="polite"
      aria-label={`Frost status: ${active.label}. ${active.action}`}
    >
      {/* ── Active state header ── */}
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 rounded-full p-2"
          style={{ backgroundColor: active.colors.border }}
          aria-hidden="true"
        >
          <Icon
            className="w-5 h-5"
            style={{ color: active.colors.accent }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: active.colors.text, opacity: 0.7 }}
          >
            Current Frost Status
          </p>
          <h2
            className="mt-0.5 text-xl font-semibold"
            style={{ fontFamily: "var(--font-heading)", color: active.colors.text }}
          >
            {active.label}
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: active.colors.text }}
          >
            {active.action}
          </p>
        </div>

        {/* Current temp */}
        <div className="shrink-0 text-right">
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ color: active.colors.text, fontFamily: "var(--font-heading)" }}
          >
            {Math.round(tempF)}°
          </span>
          <p
            className="text-xs"
            style={{ color: active.colors.text, opacity: 0.6 }}
          >
            {active.rangeLabel}
          </p>
        </div>
      </div>

      {/* ── 5-state scale strip ── */}
      <div
        className="mt-4 flex gap-1"
        role="list"
        aria-label="Frost severity scale"
      >
        {FROST_STATE_ORDER.map((key) => {
          const state     = FROST_STATES[key];
          const isActive  = key === activeKey;
          const StateIcon = state.icon;

          return (
            <div
              key={key}
              role="listitem"
              aria-label={`${state.label}${isActive ? " — current" : ""}`}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 rounded-lg p-1.5 transition-all duration-300",
                isActive ? "opacity-100 scale-105" : "opacity-40"
              )}
              style={
                isActive
                  ? { backgroundColor: state.colors.border }
                  : {}
              }
            >
              <StateIcon
                className="w-3.5 h-3.5"
                style={{ color: isActive ? state.colors.accent : state.colors.text }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] font-medium text-center leading-tight"
                style={{ color: isActive ? state.colors.text : "var(--color-text-muted)" }}
              >
                {state.label.replace("Frost ", "").replace("No ", "None")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
