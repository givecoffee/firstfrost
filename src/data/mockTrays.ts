// src/data/mockTrays.ts
// Typed mock data for the four hydroponic trays.
// Stands in for a real data layer until persistence is implemented.
// Shape matches the HydroTray interface used throughout the indoor view.

export type TrayStatus =
  | "active"
  | "germinating"
  | "harvested"
  | "empty"
  | "maintenance";

export interface HydroTray {
  id:           string;
  name:         string;
  crop:         string;
  status:       TrayStatus;
  /** pH reading — healthy range 5.5–7.0 */
  phLevel?:     number;
  /** Electrical conductivity in mS/cm — indicates nutrient concentration */
  ecLevel?:     number;
  /** ISO date string */
  lastWatered?: string;
  /** Freeform notes — will be persisted in a future iteration */
  notes?:       string;
  /** OpenFarm crop slug for API lookup */
  openFarmSlug?: string;
  /** Days since seeding — drives progress display */
  daysSinceSeeding?: number;
}

export const mockTrays: HydroTray[] = [
  {
    id:                "tray-1",
    name:              "Tray 1",
    crop:              "Butterhead Lettuce",
    status:            "active",
    phLevel:           6.1,
    ecLevel:           1.4,
    lastWatered:       "2026-03-19",
    daysSinceSeeding:  22,
    openFarmSlug:      "lettuce",
    notes:             "NFT system. Day 22. Looking strong — outer leaves ready to harvest.",
  },
  {
    id:                "tray-2",
    name:              "Tray 2",
    crop:              "Sweet Basil",
    status:            "active",
    phLevel:           6.0,
    ecLevel:           1.6,
    lastWatered:       "2026-03-19",
    daysSinceSeeding:  18,
    openFarmSlug:      "basil",
    notes:             "Pinched the tops to encourage bushing. Strong scent.",
  },
  {
    id:                "tray-3",
    name:              "Tray 3",
    crop:              "Arugula",
    status:            "germinating",
    phLevel:           6.2,
    ecLevel:           0.8,
    lastWatered:       "2026-03-18",
    daysSinceSeeding:  3,
    openFarmSlug:      "arugula",
    notes:             "Seeded 3 days ago. First cotyledons emerging — looking good.",
  },
  {
    id:          "tray-4",
    name:        "Tray 4",
    crop:        "Sunflower Microgreens",
    status:      "harvested",
    lastWatered: "2026-03-14",
    notes:       "Harvested last batch. Ready to clean and reseed this week.",
  },
];
