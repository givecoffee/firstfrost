// src/frost/frostUtils.ts
// Pure utility — no React, no side effects.
// Derives a FrostStateKey from a temperature in °F.

import { FROST_STATES, type FrostStateKey } from "./frostConfig";

/**
 * Given a temperature in °F, returns the corresponding FrostStateKey.
 *
 * Thresholds (NWS/USDA definitions):
 *   >= 36°F  → no-frost
 *   32–35°F  → watch
 *   28–31°F  → warning
 *   24–27°F  → advisory
 *   < 24°F   → hard-frost
 */
export function getFrostState(tempF: number): FrostStateKey {
  if (tempF >= FROST_STATES["no-frost"].minTempF)  return "no-frost";
  if (tempF >= FROST_STATES["watch"].minTempF)     return "watch";
  if (tempF >= FROST_STATES["warning"].minTempF)   return "warning";
  if (tempF >= FROST_STATES["advisory"].minTempF)  return "advisory";
  return "hard-frost";
}

/**
 * Returns the FrostStateConfig for a given temperature.
 * Convenience wrapper so callers don't need to import both functions.
 */
export function getFrostConfig(tempF: number) {
  return FROST_STATES[getFrostState(tempF)];
}
