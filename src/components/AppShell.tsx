// src/components/AppShell.tsx
// Issues #27 & #28 — Swiping Navigation + Background Gradient on Swipe
//
// Top-level container that:
//   1. Holds the active view index (0 = outdoor, 1 = indoor)
//   2. Listens for swipe gestures via useSwipe and updates the active view
//   3. Slides views with CSS transform: translateX (smooth, no router needed)
//   4. Transitions a full-screen background gradient between outdoor/indoor palettes
//
// Gradient transition rules:
//   - Both gradients use linear-gradient with the same stop count
//     so CSS can interpolate between them smoothly.
//   - The gradient lives behind the view content (z-index: 0).
//   - Views sit on top with a transparent background.

import { useState }     from "react";
import { useSwipe }     from "../hooks/useSwipe";
import OutdoorView      from "../outdoor/outdoor-view";
import IndoorView       from "../indoor/indoor-view";

// ─── Gradient definitions ─────────────────────────────────────────────────────
// Must have the same structure for CSS transition to work between them.

const GRADIENTS = {
  outdoor:
    "linear-gradient(160deg, #eef6fb 0%, #d4eaf6 40%, #e8f5e9 100%)",
  indoor:
    "linear-gradient(160deg, #1a2a1a 0%, #0d1f0d 40%, #1b2838 100%)",
} as const;

// ─── View tab indicator ───────────────────────────────────────────────────────

function ViewIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-50"
      role="tablist"
      aria-label="Views"
    >
      {["Outdoor", "Indoor"].map((label, i) => (
        <div
          key={label}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={label}
          className="transition-all duration-300 rounded-full"
          style={{
            width:           i === activeIndex ? "20px" : "8px",
            height:          "8px",
            backgroundColor: i === activeIndex
              ? "var(--frost-500)"
              : "var(--color-border-strong)",
          }}
        />
      ))}
    </div>
  );
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

export default function AppShell() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = outdoor, 1 = indoor

  const swipeRef = useSwipe<HTMLDivElement>({
    onSwipeLeft:  () => setActiveIndex(1),
    onSwipeRight: () => setActiveIndex(0),
  });

  const gradient = activeIndex === 0 ? GRADIENTS.outdoor : GRADIENTS.indoor;

  return (
    // Full-screen container — gradient transitions on view change
    <div
      ref={swipeRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background:  gradient,
        transition:  "background 600ms ease",
      }}
    >
      {/*
        Sliding view track:
        Two views sit side by side (200% wide total).
        translateX shifts by -100% to show the indoor view.
      */}
      <div
        className="flex w-[200%] min-h-screen transition-transform duration-400 ease-in-out"
        style={{
          transform: activeIndex === 0 ? "translateX(0)" : "translateX(-50%)",
        }}
        aria-live="polite"
      >
        {/* Outdoor view — left panel */}
        <div
          className="w-1/2 min-h-screen"
          aria-hidden={activeIndex !== 0}
          inert={activeIndex !== 0 ? ("" as unknown as boolean) : undefined}
        >
          <OutdoorView />
        </div>

        {/* Indoor view — right panel */}
        <div
          className="w-1/2 min-h-screen"
          aria-hidden={activeIndex !== 1}
          inert={activeIndex !== 1 ? ("" as unknown as boolean) : undefined}
        >
          <IndoorView />
        </div>
      </div>

      {/* Dot indicator */}
      <ViewIndicator activeIndex={activeIndex} />
    </div>
  );
}
