// src/components/FirstFrostHeader.tsx
// Issue #21 — Header for First Frost
//
// App-specific sticky header for the outdoor view.
// Logo/name lockup on the left, live frost state badge on the right.
// Sticky with backdrop-blur so scrolling content doesn't hard-clip under it.

import { Leaf } from "lucide-react";
import { Badge } from "./Badge";
import { getFrostState } from "../frost/frostUtils";
import { FROST_STATES } from "../frost/frostConfig";
import { cn } from "../utils/cn";

interface FirstFrostHeaderProps {
  /** Current temperature in °F — drives the live badge */
  tempF: number;
  className?: string;
}

export function FirstFrostHeader({ tempF, className }: FirstFrostHeaderProps) {
  const stateKey = getFrostState(tempF);
  const state    = FROST_STATES[stateKey];

  // Map frost state key to the Badge variant from Week 4's component library
  const badgeVariantMap: Record<string, Parameters<typeof Badge>[0]["variant"]> = {
    "no-frost":   "frost-none",
    "watch":      "frost-watch",
    "warning":    "frost-warning",
    "advisory":   "frost-advisory",
    "hard-frost": "frost-hard",
  };

  return (
    <header
      className={cn(
        // Sticky positioning with z-index from token scale
        "sticky top-0 z-[var(--z-raised)]",
        // Semi-transparent background + blur so content scrolls cleanly beneath
        "bg-[var(--color-background)]/90 backdrop-blur-sm",
        "border-b border-[var(--color-border)]",
        "px-4 py-3",
        "flex items-center justify-between gap-3",
        className
      )}
    >
      {/* ── Logo lockup ── */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ backgroundColor: "var(--frost-100)" }}
          aria-hidden="true"
        >
          <Leaf className="w-4 h-4" style={{ color: "var(--frost-600)" }} />
        </div>

        <div>
          <h1
            className="text-base font-semibold leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              color:      "var(--color-text-primary)",
            }}
          >
            FirstFrost
          </h1>
          <p
            className="text-[11px] leading-none mt-0.5"
            style={{ color: "var(--color-text-muted)" }}
          >
            Outdoor Garden
          </p>
        </div>
      </div>

      {/* ── Live frost state badge ── */}
      <div aria-live="polite" aria-label={`Frost status: ${state.label}`}>
        <Badge
          variant={badgeVariantMap[stateKey]}
          size="sm"
        >
          {state.label}
        </Badge>
      </div>
    </header>
  );
}
