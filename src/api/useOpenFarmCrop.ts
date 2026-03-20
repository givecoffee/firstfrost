// src/api/useOpenFarmCrop.ts
// Issue #29 — Implement OpenFarm, update plant.ts
//
// Hook that accepts a crop slug and returns normalised crop data.
// In-memory cache prevents re-fetching the same slug in a session.
// Falls back to openFarmMocks in development (import.meta.env.DEV).

import { useState, useEffect } from "react";
import { openFarmMocks }       from "./openFarmMocks";
import {
  normaliseOpenFarmCrop,
  type NormalisedCrop,
  type OpenFarmSingleResponse,
} from "../types/plant";

// ─── In-memory cache ──────────────────────────────────────────────────────────
// Keyed by slug. Populated on first fetch; reused for subsequent calls.
const cropCache = new Map<string, NormalisedCrop>();

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseOpenFarmCropResult {
  crop:    NormalisedCrop | null;
  loading: boolean;
  error:   string | null;
}

export function useOpenFarmCrop(slug: string | undefined): UseOpenFarmCropResult {
  const [state, setState] = useState<UseOpenFarmCropResult>({
    crop:    null,
    loading: !!slug,
    error:   null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ crop: null, loading: false, error: null });
      return;
    }

    // Return cached result immediately if available
    const cached = cropCache.get(slug);
    if (cached) {
      setState({ crop: cached, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ crop: null, loading: true, error: null });

    async function load() {
      try {
        let normalised: NormalisedCrop;

        // ── Development: use mock fixtures ────────────────────────────────────
        if (import.meta.env.DEV && openFarmMocks[slug!]) {
          // Simulate a short network delay so loading states are visible in dev
          await new Promise((r) => setTimeout(r, 300));
          normalised = normaliseOpenFarmCrop(openFarmMocks[slug!]);
        } else {
          // ── Production: hit the real OpenFarm API ─────────────────────────
          const url = `https://openfarm.cc/api/v1/crops/${encodeURIComponent(slug!)}`;
          const res = await fetch(url);

          if (res.status === 404) {
            if (!cancelled) setState({ crop: null, loading: false, error: null });
            return;
          }

          if (!res.ok) {
            throw new Error(`OpenFarm ${res.status}: ${res.statusText}`);
          }

          const json: OpenFarmSingleResponse = await res.json();
          normalised = normaliseOpenFarmCrop(json.data.attributes);
        }

        cropCache.set(slug!, normalised);
        if (!cancelled) setState({ crop: normalised, loading: false, error: null });

      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load crop data";
          setState({ crop: null, loading: false, error: message });
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return state;
}
