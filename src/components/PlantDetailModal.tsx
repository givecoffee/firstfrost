// src/components/PlantDetailModal.tsx
// Issue #32 — Plant Detail Modal
//
// Full-height bottom-sheet showing the complete crop profile for a selected plot.
// Uses Radix UI Dialog for accessible modal behaviour (focus trap, Escape,
// return-focus to trigger on close).
//
// Bottom-sheet pattern:
//   fixed bottom-0, max-height 92dvh, overflow-y auto.
//   dvh = dynamic viewport height — avoids iOS Safari address bar clipping.

import * as Dialog             from "@radix-ui/react-dialog";
import { X, Sun, Sprout, Ruler, Droplets, Tag } from "lucide-react";
import { useOpenFarmCrop }     from "../api/useOpenFarmCrop";
import { cn }                  from "../utils/cn";
import type { OutdoorPlot }    from "../types/plant";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ModalSkeleton() {
  return (
    <div className="space-y-3 animate-pulse p-6" aria-label="Loading crop details">
      <div className="h-5 rounded bg-[var(--color-border)] w-2/3" />
      <div className="h-3 rounded bg-[var(--color-border)] w-full" />
      <div className="h-3 rounded bg-[var(--color-border)] w-5/6" />
      <div className="h-3 rounded bg-[var(--color-border)] w-4/5" />
    </div>
  );
}

// ─── Detail row ───────────────────────────────────────────────────────────────

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 shrink-0"
        style={{ color: "var(--frost-500)" }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
          {label}
        </p>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-primary)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface PlantDetailModalProps {
  plot:          OutdoorPlot | null;
  open:          boolean;
  onOpenChange:  (open: boolean) => void;
}

export function PlantDetailModal({ plot, open, onOpenChange }: PlantDetailModalProps) {
  const { crop, loading } = useOpenFarmCrop(open ? plot?.openFarmSlug : undefined);

  if (!plot) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          style={{ zIndex: "var(--z-overlay)" }}
        />

        {/* Bottom sheet panel */}
        <Dialog.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 rounded-t-2xl",
            "bg-[var(--color-surface)] border-t border-[var(--color-border)]",
            "shadow-[var(--shadow-lg)] overflow-y-auto",
            "focus:outline-none"
          )}
          style={{
            maxHeight: "92dvh",
            zIndex:    "var(--z-modal)",
          }}
          aria-describedby="plant-modal-desc"
        >
          {/* Drag handle affordance */}
          <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
            <div
              className="rounded-full"
              style={{
                width:           "32px",
                height:          "4px",
                backgroundColor: "var(--color-border-strong)",
              }}
            />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-2 pb-4 gap-3">
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                {plot.name}
              </p>
              <Dialog.Title
                className="mt-0.5 text-xl font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color:      "var(--color-text-primary)",
                }}
              >
                {plot.crop}
              </Dialog.Title>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className={cn(
                  "shrink-0 flex items-center justify-center rounded-lg",
                  "w-[var(--touch-target-min)] h-[var(--touch-target-min)]",
                  "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  "hover:bg-[var(--color-surface-raised)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]",
                  "transition-colors"
                )}
                aria-label="Close crop details"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div
            id="plant-modal-desc"
            className="px-5 pb-10 space-y-5"
          >
            {/* Loading skeleton */}
            {loading && <ModalSkeleton />}

            {/* Crop data from OpenFarm */}
            {!loading && crop && (
              <>
                {crop.description && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {crop.description}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {crop.sunRequirements && (
                    <DetailRow
                      icon={<Sun className="w-4 h-4" />}
                      label="Sun Requirements"
                      value={crop.sunRequirements}
                    />
                  )}
                  {crop.sowingMethod && (
                    <DetailRow
                      icon={<Sprout className="w-4 h-4" />}
                      label="Sowing Method"
                      value={crop.sowingMethod}
                    />
                  )}
                  {crop.heightCm && (
                    <DetailRow
                      icon={<Ruler className="w-4 h-4" />}
                      label="Expected Height"
                      value={`${crop.heightCm} cm`}
                    />
                  )}
                  {crop.spreadCm && (
                    <DetailRow
                      icon={<Ruler className="w-4 h-4" />}
                      label="Spread"
                      value={`${crop.spreadCm} cm`}
                    />
                  )}
                </div>

                {crop.tags.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Tag
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "var(--frost-500)" }}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {crop.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: "var(--frost-100)",
                            color:           "var(--frost-700)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* No OpenFarm data fallback */}
            {!loading && !crop && (
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                No crop data available for this plant.
              </p>
            )}

            {/* Divider */}
            <hr style={{ borderColor: "var(--color-border)" }} />

            {/* Plot-specific info */}
            <div className="space-y-4">
              <h3
                className="text-sm font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Plot Info
              </h3>

              {plot.lastWatered && (
                <DetailRow
                  icon={<Droplets className="w-4 h-4" />}
                  label="Last Watered"
                  value={new Date(plot.lastWatered).toLocaleDateString("en-US", {
                    weekday: "long",
                    month:   "long",
                    day:     "numeric",
                  })}
                />
              )}

              {plot.plantedDate && (
                <DetailRow
                  icon={<Sprout className="w-4 h-4" />}
                  label="Planted"
                  value={new Date(plot.plantedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day:   "numeric",
                    year:  "numeric",
                  })}
                />
              )}

              {plot.notes && (
                <div
                  className="rounded-xl border p-3 text-sm"
                  style={{
                    borderColor:     "var(--color-border)",
                    backgroundColor: "var(--color-surface-raised)",
                    color:           "var(--color-text-secondary)",
                  }}
                >
                  {plot.notes}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
