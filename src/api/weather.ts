// src/api/weather.ts
// Issue #19 — Open-Meteo Weather API integration
//
// Free, no-auth weather API. Docs: https://open-meteo.com/en/docs
// Prototype coordinates default to Renton, WA (47.48, -122.21).
// A future location settings screen will make this configurable.

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CurrentWeather {
  tempF: number;
  weatherCode: number;
  windSpeedMph: number;
  /** ISO timestamp of the observation */
  time: string;
}

export interface HourlyWeatherPoint {
  /** ISO timestamp */
  time: string;
  tempF: number;
  weatherCode: number;
}

export interface WeatherData {
  current: CurrentWeather;
  /** Next 12 hours from current time */
  hourly: HourlyWeatherPoint[];
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

/**
 * Fetch current conditions + next 12 hours from Open-Meteo.
 *
 * @param lat  Latitude  (default: Renton, WA)
 * @param lon  Longitude (default: Renton, WA)
 */
export async function fetchWeather(
  lat = 47.48,
  lon = -122.21
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude:          String(lat),
    longitude:         String(lon),
    temperature_unit:  "fahrenheit",
    wind_speed_unit:   "mph",
    current:           "temperature_2m,weathercode,windspeed_10m",
    hourly:            "temperature_2m,weathercode",
    forecast_days:     "1",
    timezone:          "America/Los_Angeles",
  });

  const res = await fetch(`${BASE_URL}?${params}`);

  if (!res.ok) {
    throw new Error(`Open-Meteo error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  // ── Parse current conditions ──
  const current: CurrentWeather = {
    tempF:        json.current.temperature_2m,
    weatherCode:  json.current.weathercode,
    windSpeedMph: json.current.windspeed_10m,
    time:         json.current.time,
  };

  // ── Parse hourly — zip time + temp + code arrays, keep next 12 hours ──
  const now     = new Date();
  const hourly: HourlyWeatherPoint[] = (json.hourly.time as string[])
    .map((time: string, i: number) => ({
      time,
      tempF:       json.hourly.temperature_2m[i] as number,
      weatherCode: json.hourly.weathercode[i]    as number,
    }))
    .filter(({ time }) => new Date(time) >= now)
    .slice(0, 12);

  return { current, hourly };
}

// ─── WMO weather code → human label ──────────────────────────────────────────
// Subset of WMO 4677 codes used by Open-Meteo.

export function weatherCodeLabel(code: number): string {
  if (code === 0)              return "Clear sky";
  if (code <= 3)               return "Partly cloudy";
  if (code <= 49)              return "Foggy";
  if (code <= 59)              return "Drizzle";
  if (code <= 69)              return "Rain";
  if (code <= 79)              return "Snow";
  if (code <= 82)              return "Rain showers";
  if (code <= 86)              return "Snow showers";
  if (code <= 99)              return "Thunderstorm";
  return "Unknown";
}
