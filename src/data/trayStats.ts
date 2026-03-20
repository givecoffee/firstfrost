// src/data/trayStats.ts
// Derived stats helpers for the HydroponicsDashboard.
// Pure functions — no React, no side effects, easy to unit-test later.

import type { HydroTray } from "./mockTrays";

/** Count of trays with status "active" or "germinating" */
export function activeTrayCount(trays: HydroTray[]): number {
  return trays.filter((t) => t.status === "active" || t.status === "germinating").length;
}

/**
 * Average pH across active trays that have a pH reading.
 * Returns null if no trays have pH data.
 */
export function averagePh(trays: HydroTray[]): number | null {
  const readings = trays
    .filter((t) => (t.status === "active" || t.status === "germinating") && t.phLevel !== undefined)
    .map((t) => t.phLevel as number);

  if (readings.length === 0) return null;
  return Math.round((readings.reduce((a, b) => a + b, 0) / readings.length) * 10) / 10;
}

/**
 * Average EC across active trays that have an EC reading.
 * Returns null if no trays have EC data.
 */
export function averageEc(trays: HydroTray[]): number | null {
  const readings = trays
    .filter((t) => (t.status === "active" || t.status === "germinating") && t.ecLevel !== undefined)
    .map((t) => t.ecLevel as number);

  if (readings.length === 0) return null;
  return Math.round((readings.reduce((a, b) => a + b, 0) / readings.length) * 10) / 10;
}

/** Returns a plain-language health label based on pH value */
export function phHealthLabel(ph: number): { label: string; ok: boolean } {
  if (ph < 5.5)  return { label: "Too acidic", ok: false };
  if (ph > 7.0)  return { label: "Too alkaline", ok: false };
  if (ph < 6.0)  return { label: "Slightly low", ok: true };
  if (ph > 6.5)  return { label: "Slightly high", ok: true };
  return { label: "Optimal", ok: true };
}
