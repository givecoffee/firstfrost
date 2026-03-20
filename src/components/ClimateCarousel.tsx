// src/components/ClimateCarousel.tsx
// Issue #20 — The Climate Carousel
//
// Horizontally scrollable strip of hourly forecast cards.
// Fetches the next 12 hours from the Open-Meteo hourly endpoint.
// The hour closest to now is highlighted with a frost-blue border.
// Scroll is touch-friendly; CSS scroll-snap keeps snapping smooth on mobile.

import { useRef } from "react";
import {
  Sun, Cloud, CloudDrizzle, CloudRain,
  CloudSnow, CloudLightning, Wind,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../utils/cn";
import type { HourlyWeatherPoint } from "../api/weather";

// ─── WMO code → lucide icon ───────────────────────────────────────────────────

function weatherIcon(code: number): LucideIcon {
  if (code === 0)    return Sun;
  if (code <= 3)     return Cloud;
  if (code <= 49)    return Wind;
  if (code <= 67)    return CloudDrizzle;
  if (code <= 69)    return CloudRain;
  if (code <= 79)    return CloudSnow;
  if (code <= 82)    return CloudRain;
  if (code <= 86)    return CloudSnow;
  if (code <= 99)    return CloudLightning;
  return Cloud;
}

function formatHour(isoTime: string): string {
  const d = new Date(isoTime);
  const h = d.getHours();
  if (h === 0)  return "12am";
  if (h === 12) return "12pm";
  return h < 12 ? `${h}am` : `${h - 12}pm`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ClimateCarouselProps {
  hours: HourlyWeatherPoint[];
  className?: string;
}

export function ClimateCarousel({ hours, className }: ClimateCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const now       = new Date();

  // Find the index of the hour closest to current time
  const activeIndex = hours.reduce((closest, point, i) => {
    const diff    = Math.abs(new Date(point.time).getTime() - now.getTime());
    const bestDiff = Math.abs(new Date(hours[closest].time).getTime() - now.getTime());
    return diff < bestDiff ? i : closest;
  }, 0);

  if (hours.length === 0) return null;

  return (
    <section aria-label="Hourly forecast" className={className}>
      <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
        Next 12 Hours
      </p>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 pb-2"
        style={{
          scrollSnapType:    "x mandatory",
          scrollbarWidth:    "none",         // Firefox
          msOverflowStyle:   "none",         // IE/Edge
          WebkitOverflowScrolling: "touch",
        }}
        role="list"
      >
        {hours.map((point, i) => {
          const Icon     = weatherIcon(point.weatherCode);
          const isActive = i === activeIndex;

          return (
            <div
              key={point.time}
              role="listitem"
              aria-label={`${formatHour(point.time)}: ${Math.round(point.tempF)}°F`}
              style={{ scrollSnapAlign: "start" }}
              className={cn(
                "shrink-0 flex flex-col items-center gap-1.5",
                "rounded-xl border bg-[var(--color-surface)] p-3",
                "w-16 min-h-[88px]",
                "transition-all duration-200",
                isActive
                  ? "border-[var(--frost-400)] shadow-[var(--shadow-md)] scale-105"
                  : "border-[var(--color-border)]"
              )}
            >
              <span
                className="text-[11px] font-medium"
                style={{
                  color: isActive
                    ? "var(--frost-600)"
                    : "var(--color-text-secondary)",
                }}
              >
                {formatHour(point.time)}
              </span>

              <Icon
                className="w-5 h-5"
                style={{
                  color: isActive
                    ? "var(--frost-500)"
                    : "var(--color-text-muted)",
                }}
                aria-hidden="true"
              />

              <span
                className="text-sm font-semibold tabular-nums"
                style={{
                  color: isActive
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {Math.round(point.tempF)}°
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
