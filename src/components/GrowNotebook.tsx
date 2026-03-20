// src/components/GrowNotebook.tsx
// Issue #25 — Grow Notebook (within Inside interface)
//
// Expandable notes editor that appears below the selected PlantStatusCard.
// Animates open/closed with a max-height CSS transition.
// Notes live in component state for now — persistence is a future issue.

import { useState, useId } from "react";
import { NotebookPen, X } from "lucide-react";
import { cn } from "../utils/cn";
import type { HydroTray } from "../data/mockTrays";

const MAX_CHARS = 500;

interface GrowNotebookProps {
  tray:      HydroTray;
  isOpen:    boolean;
  className?: string;
}

export function GrowNotebook({ tray, isOpen, className }: GrowNotebookProps) {
  const textareaId = useId();
  const [notes, setNotes]     = useState(tray.notes ?? "");
  const [saved, setSaved]     = useState(false);
  const remaining             = MAX_CHARS - notes.length;

  function handleSave() {
    // Future: persist to data layer here
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClear() {
    setNotes("");
    setSaved(false);
  }

  return (
    // max-height transition — animates between 0 and a large fixed value
    // overflow: hidden keeps content invisible when collapsed
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
      aria-hidden={!isOpen}
    >
      <div
        className="rounded-b-xl border border-t-0 bg-[var(--color-surface-raised)] p-4"
        style={{ borderColor: "var(--color-border)" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-2 mb-3">
          <NotebookPen
            className="w-4 h-4"
            style={{ color: "var(--frost-500)" }}
            aria-hidden="true"
          />
          <h4
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Grow Notebook — {tray.crop}
          </h4>
        </div>

        {/* ── Textarea ── */}
        <label htmlFor={textareaId} className="sr-only">
          Notes for {tray.crop}
        </label>
        <textarea
          id={textareaId}
          value={notes}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              setNotes(e.target.value);
              setSaved(false);
            }
          }}
          rows={4}
          placeholder="Add notes about this tray — watering observations, growth progress, issues…"
          className={cn(
            "w-full resize-none rounded-lg border px-3 py-2 text-sm",
            "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
            "placeholder:text-[var(--color-text-muted)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]",
            "transition-colors"
          )}
          style={{
            borderColor:  "var(--color-border)",
            fontFamily:   "var(--font-body)",
            fontSize:     "var(--text-sm)",
            lineHeight:   "1.6",
          }}
        />

        {/* ── Footer: char count + actions ── */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <span
            className="text-xs"
            style={{
              color: remaining < 50
                ? "#dc2626"
                : "var(--color-text-muted)",
            }}
            aria-live="polite"
            aria-label={`${remaining} characters remaining`}
          >
            {remaining} remaining
          </span>

          <div className="flex items-center gap-2">
            {notes.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 py-1 text-xs",
                  "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]",
                  "min-h-[var(--touch-target-min)]"
                )}
                aria-label="Clear notes"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium",
                "bg-[var(--frost-500)] text-white",
                "hover:bg-[var(--frost-600)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)] focus-visible:ring-offset-2",
                "transition-colors min-h-[var(--touch-target-min)]",
                saved && "bg-green-600 hover:bg-green-700"
              )}
              aria-label={saved ? "Notes saved" : "Save notes"}
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
