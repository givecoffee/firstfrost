// src/components/PlantStatusCard.tsx
// Issue #26 — Plant Status Card
//
// Per-tray card for the indoor view.
// Composes the Week 4 Card component as its base — inherits hover shadow,
// focus ring, and 44px min touch target for free.
// Shows: tray name, crop, status badge, pH, EC, last watered, expand chevron.

import { ChevronDown, ChevronUp, Droplets, FlaskConical } from "lucide-react";
import { Card }  from "./Card";
import { Badge } from "./Badge";
import { cn }    from "../utils/cn";
import type { HydroTray, TrayStatus } from "../data/mockTrays";

// ─── Status → Badge variant mapping ──────────────────────────────────────────

const statusBadgeVariant: Record<TrayStatus, Parameters<typeof Badge>[0]["variant"]> = {
  active:      "success",
  germinating: "warning",
  harvested:   "muted",
  empty:       "muted",
  maintenance: "warning",
};

const statusLabel: Record<TrayStatus, string> = {
  active:      "Active",
  germinating: "Germinating",
  harvested:   "Harvested",
  empty:       "Empty",
  maintenance: "Maintenance",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface PlantStatusCardProps {
  tray:       HydroTray;
  isExpanded: boolean;
  onToggle:   () => void;
}

export function PlantStatusCard({ tray, isExpanded, onToggle }: PlantStatusCardProps) {
  const Chevron = isExpanded ? ChevronUp : ChevronDown;

  return (
    <Card
      onClick={onToggle}
      className="p-4"
    >
      {/* ── Top row: name + status badge ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {tray.name}
          </p>
          <h3
            className="mt-0.5 text-base font-semibold truncate"
            style={{
              fontFamily: "var(--font-heading)",
              color:      "var(--color-text-primary)",
            }}
          >
            {tray.crop}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <Badge variant={statusBadgeVariant[tray.status]} size="sm">
            {statusLabel[tray.status]}
          </Badge>
          <Chevron
            className="w-4 h-4"
            style={{ color: "var(--color-text-muted)" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Stats row: pH, EC, last watered ── */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {tray.phLevel !== undefined && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
            pH{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>
              {tray.phLevel}
            </strong>
          </span>
        )}

        {tray.ecLevel !== undefined && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            EC{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>
              {tray.ecLevel} mS/cm
            </strong>
          </span>
        )}

        {tray.lastWatered && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
            {new Date(tray.lastWatered).toLocaleDateString("en-US", {
              month: "short",
              day:   "numeric",
            })}
          </span>
        )}

        {tray.daysSinceSeeding !== undefined && (
          <span
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Day{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>
              {tray.daysSinceSeeding}
            </strong>
          </span>
        )}
      </div>
    </Card>
  );
}
