// src/components/AccessibilitySettings.tsx
// Issue #22 — Accessibility Settings and Compliance
//
// Modal dialog for user accessibility preferences.
// Uses @radix-ui/react-dialog (already in package.json) for accessible modal
// behaviour — focus trap, aria-modal, scroll lock, Escape key.
//
// Preferences persisted to localStorage under "firstfrost-a11y-prefs".
// Applied via CSS classes on <html> so they cascade through the full document.

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings, X, Type, Sun } from "lucide-react";
import { cn } from "../utils/cn";

// ─── Types & constants ────────────────────────────────────────────────────────

type FontSize = "default" | "large" | "xl";

interface A11yPrefs {
  fontSize:      FontSize;
  highContrast:  boolean;
}

const STORAGE_KEY = "firstfrost-a11y-prefs";

const FONT_SIZE_OPTIONS: { value: FontSize; label: string; description: string }[] = [
  { value: "default", label: "Default",     description: "16px base" },
  { value: "large",   label: "Large",       description: "18px base" },
  { value: "xl",      label: "Extra Large", description: "20px base" },
];

// ─── Apply preferences to <html> ─────────────────────────────────────────────

function applyPrefs(prefs: A11yPrefs) {
  const html = document.documentElement;
  html.classList.remove("ff-text-large", "ff-text-xl");
  if (prefs.fontSize === "large") html.classList.add("ff-text-large");
  if (prefs.fontSize === "xl")    html.classList.add("ff-text-xl");

  if (prefs.highContrast) {
    html.classList.add("ff-high-contrast");
  } else {
    html.classList.remove("ff-high-contrast");
  }
}

function loadPrefs(): A11yPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as A11yPrefs;
  } catch { /* ignore */ }
  return { fontSize: "default", highContrast: false };
}

function savePrefs(prefs: A11yPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch { /* ignore */ }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface AccessibilitySettingsProps {
  /** Custom trigger — defaults to a settings icon button */
  trigger?: React.ReactNode;
}

export function AccessibilitySettings({ trigger }: AccessibilitySettingsProps) {
  const [open, setOpen]   = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(loadPrefs);

  // Apply preferences on mount and whenever they change
  useEffect(() => {
    applyPrefs(prefs);
    savePrefs(prefs);
  }, [prefs]);

  function updateFontSize(fontSize: FontSize) {
    setPrefs((p) => ({ ...p, fontSize }));
  }

  function toggleHighContrast() {
    setPrefs((p) => ({ ...p, highContrast: !p.highContrast }));
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* ── Trigger ── */}
      <Dialog.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            className={cn(
              "flex items-center justify-center rounded-lg",
              "w-[var(--touch-target-min)] h-[var(--touch-target-min)]",
              "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
              "hover:bg-[var(--color-surface-raised)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]",
              "transition-colors"
            )}
            aria-label="Open accessibility settings"
          >
            <Settings className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </Dialog.Trigger>

      {/* ── Portal + overlay ── */}
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[var(--z-overlay)]"
          style={{ zIndex: "var(--z-overlay)" }}
        />

        {/* ── Panel ── */}
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[min(92vw,380px)] rounded-2xl shadow-[var(--shadow-lg)]",
            "bg-[var(--color-surface)] border border-[var(--color-border)]",
            "p-6 focus:outline-none",
          )}
          style={{ zIndex: "var(--z-modal)" }}
          aria-describedby="a11y-settings-desc"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
            >
              Accessibility Settings
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center justify-center rounded-lg",
                  "w-8 h-8 text-[var(--color-text-muted)]",
                  "hover:bg-[var(--color-surface-raised)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]"
                )}
                aria-label="Close accessibility settings"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <p
            id="a11y-settings-desc"
            className="text-sm mb-5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Preferences are saved automatically and persist across sessions.
          </p>

          {/* ── Font size ── */}
          <fieldset className="mb-5">
            <legend
              className="flex items-center gap-2 text-sm font-medium mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Type className="w-4 h-4" style={{ color: "var(--frost-500)" }} aria-hidden="true" />
              Text Size
            </legend>

            <div className="flex gap-2">
              {FONT_SIZE_OPTIONS.map((opt) => {
                const isActive = prefs.fontSize === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateFontSize(opt.value)}
                    className={cn(
                      "flex-1 rounded-lg border px-3 py-2 text-center text-sm",
                      "transition-colors focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]",
                      "min-h-[var(--touch-target-min)]",
                      isActive
                        ? "border-[var(--frost-400)] bg-[var(--frost-50)] text-[var(--frost-700)] font-medium"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--frost-300)]"
                    )}
                    aria-pressed={isActive}
                    aria-label={`${opt.label} text size — ${opt.description}`}
                  >
                    <span className="block">{opt.label}</span>
                    <span className="block text-[11px] opacity-70">{opt.description}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* ── High contrast toggle ── */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="high-contrast-toggle"
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--color-text-primary)" }}
            >
              <Sun className="w-4 h-4" style={{ color: "var(--frost-500)" }} aria-hidden="true" />
              High Contrast Mode
            </label>

            <button
              id="high-contrast-toggle"
              type="button"
              role="switch"
              aria-checked={prefs.highContrast}
              onClick={toggleHighContrast}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent",
                "transition-colors focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--frost-500)] focus-visible:ring-offset-2",
                prefs.highContrast
                  ? "bg-[var(--frost-500)]"
                  : "bg-[var(--color-border-strong)]"
              )}
              aria-label={`High contrast mode: ${prefs.highContrast ? "on" : "off"}`}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm",
                  "transform transition-transform duration-200",
                  prefs.highContrast ? "translate-x-5" : "translate-x-0"
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
