// src/hooks/useSwipe.ts
// Issue #27 — Swiping Navigation with Gesture Threshold
//
// Custom hook that attaches touch event listeners to a ref element
// and fires callbacks when the horizontal gesture exceeds SWIPE_THRESHOLD_PX.
//
// Threshold tuning:
//   Too low  → accidental swipes from taps / vertical scrolls
//   Too high → gesture feels unresponsive
//   60px landed well across phone and trackpad testing.

import { useEffect, useRef, useCallback } from "react";

export const SWIPE_THRESHOLD_PX = 60;

interface UseSwipeOptions {
  onSwipeLeft?:  () => void;
  onSwipeRight?: () => void;
  /** Override the default 60px threshold */
  threshold?:    number;
  /** Disable the hook without removing the ref */
  disabled?:     boolean;
}

export function useSwipe<T extends HTMLElement = HTMLDivElement>(
  options: UseSwipeOptions
) {
  const { onSwipeLeft, onSwipeRight, threshold = SWIPE_THRESHOLD_PX, disabled } = options;
  const ref        = useRef<T>(null);
  const startX     = useRef<number | null>(null);
  const startY     = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (startX.current === null || startY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - startX.current;
    const deltaY = e.changedTouches[0].clientY - startY.current;

    // Ignore if vertical movement dominates — user is likely scrolling
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      startX.current = null;
      startY.current = null;
      return;
    }

    if (deltaX < -threshold && onSwipeLeft)  onSwipeLeft();
    if (deltaX >  threshold && onSwipeRight) onSwipeRight();

    startX.current = null;
    startY.current = null;
  }, [threshold, onSwipeLeft, onSwipeRight]);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    // passive: true — lets browser start scrolling without waiting for JS
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend",   handleTouchEnd,   { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd, disabled]);

  return ref;
}
