// src/indoor/indoor-view.tsx
// Issue #23 — indoor_view.tsx
//
// Full indoor view — mirrors outdoor-view.tsx structure for consistency.
// Sticky header with accessibility settings trigger, then:
//   1. HydroponicsDashboard summary tiles
//   2. List of PlantStatusCards (one per tray)
//   3. GrowNotebook expanding below the selected card

import { useState }                  from "react";
import { Leaf }                       from "lucide-react";
import { HydroponicsDashboard }      from "../components/HydroponicsDashboard";
import { PlantStatusCard }            from "../components/PlantStatusCard";
import { GrowNotebook }              from "../components/GrowNotebook";
import { AccessibilitySettings }     from "../components/AccessibilitySettings";
import { mockTrays }                  from "../data/mockTrays";

export default function IndoorView() {
  const [expandedTrayId, setExpandedTrayId] = useState<string | null>(null);

  function handleToggle(id: string) {
    setExpandedTrayId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {/* Skip link */}
      <a
        href="#indoor-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50
                   focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg
                   focus:text-[var(--frost-900)] focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="flex flex-col min-h-screen bg-[var(--color-background)]">

        {/* ── Sticky header ── */}
        <header
          className="sticky top-0 z-[var(--z-raised)] px-4 py-3
                     flex items-center justify-between gap-3
                     bg-[var(--color-background)]/90 backdrop-blur-sm
                     border-b border-[var(--color-border)]"
        >
          {/* Logo lockup */}
          <div className="flex items-center gap-2">
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
                style={{
                  fontFamily: "var(--font-heading)",
                  color:      "var(--color-text-primary)",
                }}
              >
                FirstFrost
              </h1>
              <p
                className="text-[11px] leading-none mt-0.5"
                style={{ color: "var(--color-text-muted)" }}
              >
                Hydroponics
              </p>
            </div>
          </div>

          {/* Accessibility settings trigger */}
          <AccessibilitySettings />
        </header>

        {/* ── Main content ── */}
        <main id="indoor-main" className="flex-1 flex flex-col gap-5 px-4 pb-8 pt-5">

          {/* Dashboard summary */}
          <HydroponicsDashboard trays={mockTrays} />

          {/* Tray list */}
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
                    <GrowNotebook
                      tray={tray}
                      isOpen={isExpanded}
                    />
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
