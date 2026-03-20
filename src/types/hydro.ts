// src/types/hydro.ts
// Issue #34 — Hydroponic Tray - type definition (define HydroTray)
//
// Single source of truth for all indoor/hydroponic data types.
// Previously defined inline in src/data/mockTrays.ts — extracted here
// so all components import from one place and the type is decoupled
// from the mock data source.

// ─── Status ───────────────────────────────────────────────────────────────────

export type TrayStatus =
  | "active"       // growing, healthy
  | "germinating"  // seeded, not yet established
  | "harvested"    // crop taken, tray empty
  | "empty"        // clean and ready to reseed
  | "maintenance"; // pH/EC adjustment, cleaning, etc.

// ─── Core tray type ───────────────────────────────────────────────────────────

export interface HydroTray {
  id:           string;
  name:         string;
  crop:         string;
  status:       TrayStatus;

  /** pH reading — healthy hydroponic range: 5.5–7.0 */
  phLevel?:     number;

  /** Electrical conductivity in mS/cm — indicates nutrient concentration.
   *  Leafy greens: 0.8–1.6. Herbs: 1.0–1.8. */
  ecLevel?:     number;

  /** ISO date string — last time reservoir was topped up or refreshed */
  lastWatered?: string;

  /** Days elapsed since seeding — drives the progress display */
  daysSinceSeeding?: number;

  /** Freeform notes from the GrowNotebook — persisted separately in future */
  notes?:       string;

  /** OpenFarm crop slug — used by useOpenFarmCrop for crop info lookup */
  openFarmSlug?: string;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────
// Shape returned by the trayStats utility functions used in HydroponicsDashboard.

export interface HydroTrayStats {
  activeCount:  number;
  totalCount:   number;
  averagePh:    number | null;
  averageEc:    number | null;
}

// ─── Status display helpers ───────────────────────────────────────────────────

export const TRAY_STATUS_LABEL: Record<TrayStatus, string> = {
  active:      "Active",
  germinating: "Germinating",
  harvested:   "Harvested",
  empty:       "Empty",
  maintenance: "Maintenance",
};

/** Returns true if this status should be included in active-tray stats */
export function isActiveTray(status: TrayStatus): boolean {
  return status === "active" || status === "germinating";
}
