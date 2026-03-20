// src/components/HydroponicsDashboard.tsx
// Issue #24 — Hydroponics Dashboard
//
// Summary section at the top of the indoor view.
// Three stat tiles: active tray count, average pH, average EC.
// Stats are derived from trayStats.ts — component stays purely presentational.

import { Layers, FlaskConical, Zap } from "lucide-react";
import { activeTrayCount, averagePh, averageEc, phHealthLabel } from "../data/trayStats";
import { cn } from "../utils/cn";
import type { HydroTray } from "../data/mockTrays";

// ─── Stat tile ────────────────────────────────────────────────────────────────

interface StatTileProps {
  icon:      React.ReactNode;
  label:     string;
  value:     string;
  sublabel?: string;
  accent?:   string;
}

function StatTile({ icon, label, value, sublabel, accent }: StatTileProps) {
  return (
    <div
      className="flex-1 rounded-xl border bg-[var(--color-surface)] p-3 flex flex-col gap-1"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-1.5">
        <span style={{ color: accent ?? "var(--frost-500)" }} aria-hidden="true">
          {icon}
        </span>
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-muted)" }}
        >
          {label}
        </p>
      </div>

      <p
        className="text-2xl font-bold tabular-nums"
        style={{
          fontFamily: "var(--font-heading)",
          color:      "var(--color-text-primary)",
        }}
      >
        {value}
      </p>

      {sublabel && (
        <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

interface HydroponicsDashboardProps {
  trays:     HydroTray[];
  className?: string;
}

export function HydroponicsDashboard({ trays, className }: HydroponicsDashboardProps) {
  const count = activeTrayCount(trays);
  const ph    = averagePh(trays);
  const ec    = averageEc(trays);
  const phStatus = ph !== null ? phHealthLabel(ph) : null;

  return (
    <section
      aria-label="Hydroponics summary"
      className={cn("flex gap-3", className)}
    >
      <StatTile
        icon={<Layers className="w-3.5 h-3.5" />}
        label="Active"
        value={String(count)}
        sublabel={`of ${trays.length} trays`}
        accent="var(--frost-500)"
      />

      <StatTile
        icon={<FlaskConical className="w-3.5 h-3.5" />}
        label="Avg pH"
        value={ph !== null ? String(ph) : "—"}
        sublabel={phStatus?.label}
        accent={phStatus?.ok ? "#16a34a" : "#dc2626"}
      />

      <StatTile
        icon={<Zap className="w-3.5 h-3.5" />}
        label="Avg EC"
        value={ec !== null ? `${ec}` : "—"}
        sublabel="mS/cm"
        accent="var(--season-summer)"
      />
    </section>
  );
}
