// src/components/CompactPlantCard.tsx
// Updated Week 8 — tapping a card now opens PlantDetailModal.
// The expand/collapse detail strip from Week 7 is replaced by the modal;
// the card itself becomes a simple trigger button.

import { useState }            from "react";
import {
  Droplets, Sun, Sprout, AlertCircle,
  CheckCircle2, Moon, ChevronRight,
} from "lucide-react";
import { PlantDetailModal }    from "./PlantDetailModal";
import { cn }                  from "../utils/cn";
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

// ─── CompactPlantCard ─────────────────────────────────────────────────────────

interface CompactPlantCardProps {
  plot: OutdoorPlot;
}

export function CompactPlantCard({ plot }: CompactPlantCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { icon: Icon, color, label } = statusConfig[plot.status];

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={cn(
          "w-full text-left rounded-xl border px-4 py-3",
          "bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
          "flex items-center gap-3",
          "min-h-[var(--touch-target-min)]",
          "transition-shadow hover:shadow-[var(--shadow-md)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]"
        )}
        style={{ borderColor: "var(--color-border)" }}
        aria-label={`${plot.crop} in ${plot.name} — ${label}. Tap to view details.`}
        aria-haspopup="dialog"
      >
        {/* Status icon */}
        <Icon className="w-4 h-4 shrink-0" style={{ color }} aria-hidden="true" />

        {/* Name + plot */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
          >
            {plot.crop}
          </p>
          <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
            {plot.name}
          </p>
        </div>

        {/* Last watered */}
        {plot.lastWatered && (
          <span
            className="flex items-center gap-1 text-xs shrink-0"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Droplets className="w-3 h-3" aria-hidden="true" />
            {new Date(plot.lastWatered).toLocaleDateString("en-US", {
              month: "short",
              day:   "numeric",
            })}
          </span>
        )}

        {/* Chevron affordance */}
        <ChevronRight
          className="w-4 h-4 shrink-0"
          style={{ color: "var(--color-text-muted)" }}
          aria-hidden="true"
        />
      </button>

      {/* Detail modal */}
      <PlantDetailModal
        plot={plot}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
