// src/types/plant.ts
// Issue #29 — Implement OpenFarm, update plant.ts
//
// Updated to accurately model the OpenFarm API response shape.
// Previous version had placeholder fields — this maps the real
// data.attributes object returned by the API.
// https://openfarm.cc/api/v1/crops?filter=<slug>

// ─── OpenFarm API types ───────────────────────────────────────────────────────

export interface OpenFarmCropAttributes {
  name:                 string;
  slug:                 string;
  binomial_name?:       string;
  description:          string;
  sun_requirements?:    string;   // e.g. "Full Sun", "Partial Sun"
  sowing_method?:       string;   // e.g. "Direct Sow", "Transplant"
  spread?:              number;   // cm
  row_spacing?:         number;   // cm
  height?:              number;   // cm
  processing_pictures?: number;
  tags_array:           string[];
  growing_degree_days?: number;
  main_image_path?:     string;
}

export interface OpenFarmCropData {
  id:         string;
  type:       "crops";
  attributes: OpenFarmCropAttributes;
}

export interface OpenFarmSearchResponse {
  data: OpenFarmCropData[];
  meta: { total: number };
}

export interface OpenFarmSingleResponse {
  data: OpenFarmCropData;
}

// ─── Internal plant types ─────────────────────────────────────────────────────
// These are the shapes used inside the app after normalising from the API.

export type PlotStatus =
  | "healthy"
  | "needs-water"
  | "needs-attention"
  | "dormant"
  | "harvested";

export interface OutdoorPlot {
  id:             string;
  name:           string;
  crop:           string;
  status:         PlotStatus;
  /** ISO date string */
  plantedDate?:   string;
  /** ISO date string */
  lastWatered?:   string;
  notes?:         string;
  /** OpenFarm slug — used by useOpenFarmCrop to fetch crop details */
  openFarmSlug?:  string;
}

/**
 * Normalised OpenFarm crop — the subset we actually render.
 * Safe to call with a partial API response; missing fields become undefined.
 */
export interface NormalisedCrop {
  name:             string;
  slug:             string;
  description:      string;
  sunRequirements?: string;
  sowingMethod?:    string;
  heightCm?:        number;
  spreadCm?:        number;
  rowSpacingCm?:    number;
  tags:             string[];
  imageUrl?:        string;
}

export function normaliseOpenFarmCrop(raw: OpenFarmCropAttributes): NormalisedCrop {
  return {
    name:             raw.name             ?? "",
    slug:             raw.slug             ?? "",
    description:      raw.description      ?? "",
    sunRequirements:  raw.sun_requirements,
    sowingMethod:     raw.sowing_method,
    heightCm:         raw.height,
    spreadCm:         raw.spread,
    rowSpacingCm:     raw.row_spacing,
    tags:             Array.isArray(raw.tags_array) ? raw.tags_array : [],
    imageUrl:         raw.main_image_path,
  };
}
