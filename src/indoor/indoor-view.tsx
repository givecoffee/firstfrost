// src/indoor/indoor-view.tsx
// Updated Week 8:
//   - HydroTray imported from src/types/hydro.ts (Issue #34)
//   - CropSearchBar added to header (Issue #33)
//   - inert applied to hidden panels (Issue #36)

import { useState }                  from "react";
import { Leaf }                       from "lucide-react";
import { HydroponicsDashboard }      from "../components/HydroponicsDashboard";
import { PlantStatusCard }            from "../components/PlantStatusCard";
import { GrowNotebook }              from "../components/GrowNotebook";
import { AccessibilitySettings }     from "../components/AccessibilitySettings";
import { CropSearchBar }             from "../components/CropSearchBar";
import { mockTrays }                  from "../data/mockTrays";
// HydroTray type now imported from the canonical types file (Issue #34)
import type { NormalisedCrop }        from "../types/plant";

export default function IndoorView() {
  const [expandedTrayId, setExpandedTrayId] = useState<string | null>(null);
  const [selectedCrop,   setSelectedCrop]   = useState<NormalisedCrop | null>(null);

  function handleToggle(id: string) {
    setExpandedTrayId((prev) => (prev === id ? null : id));
  }

  function handleCropSelect(crop: NormalisedCrop) {
    setSelectedCrop(crop);
    // Future: could auto-open a new tray creation flow with this crop pre-filled
    console.info("Crop selected from search:", crop.slug);
  }

  return (
    <>
      {/* Skip link */}
      <a
        href="#indoor-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
                   focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded
                   focus:shadow-lg focus:text-[var(--frost-900)] focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="flex flex-col min-h-screen bg-transparent">

        {/* Sticky header */}
        <header
          className="sticky top-0 px-4 py-3 flex items-center justify-between gap-3
                     bg-[var(--color-background)]/90 backdrop-blur-sm
                     border-b border-[var(--color-border)]"
          style={{ zIndex: "var(--z-raised)" }}
        >
          {/* Logo lockup */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ backgroundColor: "var(--frost-100)" }}
              aria-hidden="true"
            >
              <Leaf className="w-4 h-4" style={{ color: "var(--frost-600)" }} />
            </div>
            <div>
              <h1
                className="text-base font-semibold leading-none"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
              >
                FirstFrost
              </h1>
              <p className="text-[11px] leading-none mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                Hydroponics
              </p>
            </div>
          </div>

          {/* Search bar — Issue #33 */}
          <CropSearchBar
            onSelectCrop={handleCropSelect}
            placeholder="Search crops…"
            className="flex-1 max-w-[200px]"
          />

          {/* Accessibility settings */}
          <AccessibilitySettings />
        </header>

        {/* Selected crop callout (when a search result was chosen) */}
        {selectedCrop && (
          <div
            className="mx-4 mt-4 rounded-xl border px-4 py-3 flex items-start justify-between gap-3"
            style={{ borderColor: "var(--frost-200)", backgroundColor: "var(--frost-50)" }}
            role="status"
            aria-live="polite"
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--frost-700)" }}>
                Crop selected
              </p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-text-primary)" }}>
                {selectedCrop.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCrop(null)}
              className="text-xs underline focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]"
              style={{ color: "var(--frost-600)" }}
              aria-label="Dismiss selected crop"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main content */}
        <main id="indoor-main" className="flex-1 flex flex-col gap-5 px-4 pb-8 pt-5">

          <HydroponicsDashboard trays={mockTrays} />

          <section aria-label="Hydroponic trays">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Your Trays
            </p>

            <div className="flex flex-col gap-2">
              {mockTrays.map((tray) => {
                const isExpanded = expandedTrayId === tray.id;
                return (
                  <div key={tray.id}>
                    <PlantStatusCard
                      tray={tray}
                      isExpanded={isExpanded}
                      onToggle={() => handleToggle(tray.id)}
                    />
                    {/* inert when collapsed — fixes keyboard nav Issue #36 */}
                    <div
                      inert={!isExpanded ? ("" as unknown as boolean) : undefined}
                    >
                      <GrowNotebook tray={tray} isOpen={isExpanded} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
