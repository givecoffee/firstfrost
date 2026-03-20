// src/api/openFarmMocks.ts
// Issue #30 — Mock-ups mirror the OpenFarm responses
//
// Fixture objects built from real OpenFarm API responses.
// Shape is identical to what the live API returns so the same
// normaliseOpenFarmCrop() function works on both.
//
// Active when import.meta.env.DEV === true (npm run dev).
// Production builds use the live API automatically.

import type { OpenFarmCropAttributes } from "../types/plant";

export const openFarmMocks: Record<string, OpenFarmCropAttributes> = {
  lettuce: {
    name:                "Lettuce",
    slug:                "lettuce",
    binomial_name:       "Lactuca sativa",
    description:
      "Lettuce is a fast-growing annual that thrives in cool weather. Ideal for " +
      "hydroponics and container growing. Harvest outer leaves continuously for a " +
      "cut-and-come-again supply.",
    sun_requirements:    "Partial Sun",
    sowing_method:       "Direct Sow",
    spread:              30,
    row_spacing:         25,
    height:              25,
    tags_array:          ["salad", "fast-growing", "cool-season", "hydroponic"],
    growing_degree_days: 750,
    main_image_path:
      "https://openfarm.cc/assets/missing_image.png",
  },

  basil: {
    name:                "Sweet Basil",
    slug:                "basil",
    binomial_name:       "Ocimum basilicum",
    description:
      "Sweet basil is a warm-season annual herb prized for its aromatic leaves. " +
      "Pinch growing tips regularly to prevent bolting and encourage a bushy form. " +
      "Grows well hydroponically with slightly higher EC than leafy greens.",
    sun_requirements:    "Full Sun",
    sowing_method:       "Transplant",
    spread:              35,
    row_spacing:         30,
    height:              45,
    tags_array:          ["herb", "aromatic", "warm-season", "hydroponic"],
    growing_degree_days: 1200,
    main_image_path:
      "https://openfarm.cc/assets/missing_image.png",
  },

  arugula: {
    name:                "Arugula",
    slug:                "arugula",
    binomial_name:       "Eruca vesicaria",
    description:
      "Arugula is a fast-growing cool-season green with a distinctive peppery flavour. " +
      "One of the quickest crops from seed to harvest — typically 21–40 days. " +
      "Bolts in heat; best grown in spring or autumn.",
    sun_requirements:    "Partial Sun",
    sowing_method:       "Direct Sow",
    spread:              20,
    row_spacing:         15,
    height:              20,
    tags_array:          ["salad", "peppery", "cool-season", "fast-growing"],
    growing_degree_days: 500,
    main_image_path:
      "https://openfarm.cc/assets/missing_image.png",
  },

  kale: {
    name:                "Kale",
    slug:                "kale",
    binomial_name:       "Brassica oleracea var. sabellica",
    description:
      "Kale is a cold-hardy brassica that improves in flavour after a frost. " +
      "Harvest outer leaves to keep the plant producing. One of the most nutrient-dense " +
      "crops per square foot and highly tolerant of Pacific Northwest winters.",
    sun_requirements:    "Full Sun",
    sowing_method:       "Direct Sow",
    spread:              45,
    row_spacing:         45,
    height:              60,
    tags_array:          ["brassica", "cold-hardy", "superfood", "overwintering"],
    growing_degree_days: 1000,
    main_image_path:
      "https://openfarm.cc/assets/missing_image.png",
  },
};
