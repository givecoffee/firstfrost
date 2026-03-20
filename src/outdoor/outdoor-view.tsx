// src/outdoor/outdoor-view.tsx
// Updated Week 5 — wired up FrostCountdown, ClimateCarousel, FirstFrostHeader,
// and the useWeather hook replacing the Week 3 placeholder shell.

import { useWeather }          from "../api/useWeather";
import { FirstFrostHeader }    from "../components/FirstFrostHeader";
import { FrostCountdown }      from "../components/FrostCountdown";
import { ClimateCarousel }     from "../components/ClimateCarousel";

// Week 3 placeholder stub — will be replaced with real PlantCard grid in Week 6
function PlantCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 h-24 animate-pulse"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function OutdoorView() {
  const { data, loading, error } = useWeather();

  // Fallback temperature while loading — mid-watch state for PNW prototype
  const tempF = data?.current.tempF ?? 34;

  return (
    <>
      {/* Skip link — keyboard accessibility */}
      <a
        href="#outdoor-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50
                   focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg
                   focus:text-[var(--frost-900)] focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="flex flex-col min-h-screen bg-[var(--color-background)]">

        {/* Sticky header — Issue #21 */}
        <FirstFrostHeader tempF={tempF} />

        <main id="outdoor-main" className="flex-1 flex flex-col gap-5 pb-8">

          {/* Loading / error states */}
          {loading && (
            <div className="px-4 pt-4">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] h-36 animate-pulse" />
            </div>
          )}

          {error && (
            <div
              className="mx-4 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              Could not load weather data. Showing last known conditions.
            </div>
          )}

          {/* Frost countdown — Issue #18 */}
          {!loading && (
            <div className="px-4 pt-4">
              <FrostCountdown tempF={tempF} />
            </div>
          )}

          {/* Climate carousel — Issue #20 */}
          {data && data.hourly.length > 0 && (
            <ClimateCarousel hours={data.hourly} />
          )}

          {/* Plant card grid — placeholder until Week 6 */}
          <section aria-label="Garden plots" className="px-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Your Garden
            </p>
            <PlantCardGrid />
          </section>

        </main>
      </div>
    </>
  );
}
