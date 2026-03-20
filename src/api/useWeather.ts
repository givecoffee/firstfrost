// src/api/useWeather.ts
// Issue #19 — Open-Meteo Weather API integration
//
// React hook wrapping fetchWeather() with loading / error / data lifecycle.
// Fetches once on mount. A future iteration should add a refresh interval.

import { useState, useEffect } from "react";
import { fetchWeather, type WeatherData } from "./weather";

interface UseWeatherState {
  data:    WeatherData | null;
  loading: boolean;
  error:   string | null;
}

interface UseWeatherOptions {
  lat?: number;
  lon?: number;
}

export function useWeather(options: UseWeatherOptions = {}): UseWeatherState {
  const { lat = 47.48, lon = -122.21 } = options;

  const [state, setState] = useState<UseWeatherState>({
    data:    null,
    loading: true,
    error:   null,
  });

  useEffect(() => {
    let cancelled = false;

    setState({ data: null, loading: true, error: null });

    fetchWeather(lat, lon)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load weather";
          setState({ data: null, loading: false, error: message });
        }
      });

    // Cleanup: if the component unmounts mid-fetch, discard the result
    return () => { cancelled = true; };
  }, [lat, lon]);

  return state;
}
