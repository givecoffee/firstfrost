// src/outdoor/outdoor-view.tsx
// Updated Week 7 — replaced placeholder skeleton with CompactPlantCard grid.
// Mock outdoor plot data lives here for now (future: shared data layer).

import { useWeather }           from "../api/useWeather";
import { FirstFrostHeader }     from "../components/FirstFrostHeader";
import { FrostCountdown }       from "../components/FrostCountdown";
import { ClimateCarousel }      from "../components/ClimateCarousel";
import { CompactPlantCard }     from "../components/CompactPlantCard";
import type { OutdoorPlot }     from "../types/plant";

// ─── Mock outdoor plot data ───────────────────────────────────────────────────
// Moved here from the Week 5 placeholder. Will migrate to a shared
// data layer once persistence is added.

const mockPlots: OutdoorPlot[] = [
  {
    id:            "plot-1",
    name:          "Raised Bed A",
    crop:          "Kale",
    status:        "healthy",
    plantedDate:   "2026-02-15",
    lastWatered:   "2026-03-17",
    openFarmSlug:  "kale",
    notes:         "Curly kale. Growing well despite recent cold snap.",
  },
  {
    id:            "plot-2",
    name:          "Raised Bed B",
    crop:          "Spinach",
    status:        "healthy",
    plantedDate:   "2026-02-20",
    lastWatered:   "2026-03-18",
    openFarmSlug:  "spinach",
  },
  {
    id:            "plot-3",
    name:          "Container Row",
    crop:          "Swiss Chard",
    status:        "needs-water",
    plantedDate:   "2026-03-01",
    lastWatered:   "2026-03-16",
    openFarmSlug:  "swiss-chard",
  },
  {
    id:            "plot-4",
    name:          "Border Bed",
    crop:          "Garlic",
    status:        "dormant",
    plantedDate:   "2025-10-10",
    lastWatered:   "2026-03-10",
    openFarmSlug:  "garlic",
    notes:         "Overwintered. Scapes forming.",
  },
];

// ─── View ─────────────────────────────────────────────────────────────────────

export default function OutdoorView() {
  const { data, loading, error } = useWeather();
  const tempF = data?.current.tempF ?? 34;

  return (
    <>
      <a
        href="#outdoor-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
                   focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded
                   focus:shadow-lg focus:text-[var(--frost-900)] focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="flex flex-col min-h-screen bg-transparent">
        <FirstFrostHeader tempF={tempF} />

        <main id="outdoor-main" className="flex-1 flex flex-col gap-5 pb-12">

          {/* Loading skeleton */}
          {loading && (
            <div className="px-4 pt-4">
              <div
                className="rounded-2xl border h-36 animate-pulse"
                style={{
                  borderColor:     "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              />
            </div>
          )}

          {/* API error */}
          {error && (
            <div
              className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50
                         px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              Could not load weather data. Showing last known conditions.
            </div>
          )}

          {/* Frost countdown */}
          {!loading && (
            <div className="px-4 pt-4">
              <FrostCountdown tempF={tempF} />
            </div>
          )}

          {/* Climate carousel */}
          {data && data.hourly.length > 0 && (
            <ClimateCarousel hours={data.hourly} />
          )}

          {/* Plant card grid — now real CompactPlantCards */}
          <section aria-label="Garden plots" className="px-4">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Your Garden
            </p>
            <div className="flex flex-col gap-2">
              {mockPlots.map((plot) => (
                <CompactPlantCard key={plot.id} plot={plot} />
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
