// src/components/CompactPlantCard.tsx
// Issue #31 — Compact Plant Card
//
// The primary outdoor garden card. Compact footprint so 4 cards fit
// on a single screen without scrolling. Tapping expands an inline
// detail strip with OpenFarm crop data (description, sun, sowing method).
// Loading skeleton prevents layout shift while the API call resolves.

import { useState }         from "react";
import { ChevronDown, ChevronUp, Droplets, Sun, Sprout, AlertCircle,
         CheckCircle2, Moon } from "lucide-react";
import { useOpenFarmCrop }   from "../api/useOpenFarmCrop";
import { cn }                from "../utils/cn";
import type { OutdoorPlot, PlotStatus } from "../types/plant";

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<
  PlotStatus,
  { icon: React.ElementType; color: string; label: string }
> = {
  healthy:           { icon: CheckCircle2, color: "#16a34a", label: "Healthy" },
  "needs-water":     { icon: Droplets,     color: "#2563eb", label: "Needs Water" },
  "needs-attention": { icon: AlertCircle,  color: "#d97706", label: "Attention" },
  dormant:           { icon: Moon,         color: "#94a3b8", label: "Dormant" },
  harvested:         { icon: Sprout,       color: "#7c3aed", label: "Harvested" },
};

// ─── Detail strip skeleton ────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="mt-3 space-y-2 animate-pulse" aria-label="Loading crop details">
      <div className="h-3 rounded bg-[var(--color-border)] w-full" />
      <div className="h-3 rounded bg-[var(--color-border)] w-4/5" />
      <div className="h-3 rounded bg-[var(--color-border)] w-3/5" />
    </div>
  );
}

// ─── Detail strip ─────────────────────────────────────────────────────────────

interface DetailStripProps {
  slug: string | undefined;
}

function DetailStrip({ slug }: DetailStripProps) {
  const { crop, loading, error } = useOpenFarmCrop(slug);

  if (!slug) {
    return (
      <p className="mt-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
        No crop data linked. Add an OpenFarm slug to see growing info.
      </p>
    );
  }

  if (loading) return <DetailSkeleton />;

  if (error || !crop) {
    return (
      <p className="mt-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
        Crop info unavailable right now.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {crop.description && (
        <p
          className="text-xs leading-relaxed line-clamp-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {crop.description}
        </p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {crop.sunRequirements && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Sun className="w-3 h-3" aria-hidden="true" />
            {crop.sunRequirements}
          </span>
        )}
        {crop.sowingMethod && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Sprout className="w-3 h-3" aria-hidden="true" />
            {crop.sowingMethod}
          </span>
        )}
        {crop.heightCm && (
          <span
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Height: {crop.heightCm}cm
          </span>
        )}
      </div>

      {crop.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {crop.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: "var(--frost-100)",
                color:           "var(--frost-700)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CompactPlantCard ─────────────────────────────────────────────────────────

interface CompactPlantCardProps {
  plot: OutdoorPlot;
}

export function CompactPlantCard({ plot }: CompactPlantCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { icon: Icon, color, label } = statusConfig[plot.status];
  const Chevron = expanded ? ChevronUp : ChevronDown;

  return (
    <div
      className="rounded-xl border bg-[var(--color-surface)] shadow-[var(--shadow-sm)]
                 transition-shadow hover:shadow-[var(--shadow-md)]"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* ── Main row — always visible ── */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left px-4 py-3 flex items-center gap-3
                   min-h-[var(--touch-target-min)]
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-[var(--frost-500)] rounded-xl"
        aria-expanded={expanded}
        aria-label={`${plot.crop} in ${plot.name} — ${label}. ${expanded ? "Collapse" : "Expand"} details.`}
      >
        {/* Status icon */}
        <Icon
          className="w-4 h-4 shrink-0"
          style={{ color }}
          aria-hidden="true"
        />

        {/* Crop + plot name */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{
              color:      "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {plot.crop}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            {plot.name}
          </p>
        </div>

        {/* Last watered */}
        {plot.lastWatered && (
          <span
            className="flex items-center gap-1 text-xs shrink-0 mr-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Droplets className="w-3 h-3" aria-hidden="true" />
            {new Date(plot.lastWatered).toLocaleDateString("en-US", {
              month: "short",
              day:   "numeric",
            })}
          </span>
        )}

        {/* Expand chevron */}
        <Chevron
          className="w-4 h-4 shrink-0"
          style={{ color: "var(--color-text-muted)" }}
          aria-hidden="true"
        />
      </button>

      {/* ── Expandable detail strip ── */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!expanded}
      >
        <div
          className="px-4 pb-4 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <DetailStrip slug={plot.openFarmSlug} />
        </div>
      </div>
    </div>
  );
}
