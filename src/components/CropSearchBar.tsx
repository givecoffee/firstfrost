// src/components/CropSearchBar.tsx
// Issue #33 — SearchBar > Working w/ OpenFarm Crop Search
//
// Debounced search input querying OpenFarm /api/v1/crops?filter=<query>.
// In development, filters the openFarmMocks fixtures by name instead.
// Results render in a dropdown list with role="listbox" for screen readers.
// Arrow key navigation and Enter to select are supported.

import { useState, useRef, useEffect, useId } from "react";
import { Search, X, Loader2 }                  from "lucide-react";
import { openFarmMocks }                        from "../api/openFarmMocks";
import { normaliseOpenFarmCrop, type NormalisedCrop } from "../types/plant";
import { cn }                                   from "../utils/cn";

const DEBOUNCE_MS   = 400;
const OPENFARM_BASE = "https://openfarm.cc/api/v1";

// ─── Fetch or mock search ─────────────────────────────────────────────────────

async function searchCrops(query: string): Promise<NormalisedCrop[]> {
  if (!query.trim()) return [];

  // Dev: filter mock fixtures by name
  if (import.meta.env.DEV) {
    await new Promise((r) => setTimeout(r, 200)); // simulate latency
    const q = query.toLowerCase();
    return Object.values(openFarmMocks)
      .filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q))
      .map(normaliseOpenFarmCrop);
  }

  // Prod: live API
  const res = await fetch(
    `${OPENFARM_BASE}/crops?filter=${encodeURIComponent(query.trim())}`
  );
  if (!res.ok) throw new Error(`OpenFarm ${res.status}`);
  const json = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.data as any[]).map((item: any) =>
    normaliseOpenFarmCrop(item.attributes)
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CropSearchBarProps {
  /** Called when the user selects a crop from the results */
  onSelectCrop?: (crop: NormalisedCrop) => void;
  placeholder?:  string;
  className?:    string;
}

export function CropSearchBar({
  onSelectCrop,
  placeholder = "Search crops…",
  className,
}: CropSearchBarProps) {
  const inputId       = useId();
  const listboxId     = useId();
  const timerRef      = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef      = useRef<HTMLInputElement>(null);

  const [query,       setQuery]       = useState("");
  const [results,     setResults]     = useState<NormalisedCrop[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [open,        setOpen]        = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // ── Debounced search ──────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const found = await searchCrops(query);
        setResults(found);
        setOpen(found.length > 0);
        setActiveIndex(-1);
      } catch {
        setResults([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleSelect(crop: NormalisedCrop) {
    onSelectCrop?.(crop);
    setQuery(crop.name);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div className={cn("relative", className)}>
      {/* Input */}
      <div
        className="flex items-center gap-2 rounded-xl border px-3"
        style={{
          borderColor:     "var(--color-border)",
          backgroundColor: "var(--color-surface)",
          minHeight:       "var(--touch-target-min)",
        }}
      >
        {loading
          ? <Loader2 className="w-4 h-4 shrink-0 animate-spin"
              style={{ color: "var(--frost-500)" }} aria-hidden="true" />
          : <Search className="w-4 h-4 shrink-0"
              style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
        }

        <input
          id={inputId}
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length) setOpen(true); }}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          className={cn(
            "flex-1 bg-transparent text-sm outline-none",
            "placeholder:text-[var(--color-text-secondary)]",
          )}
          style={{
            color:      "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
          }}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-[var(--frost-500)] rounded"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" style={{ color: "var(--color-text-muted)" }}
              aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Crop search results"
          className="absolute top-full left-0 right-0 mt-1 z-[var(--z-raised)]
                     rounded-xl border shadow-[var(--shadow-lg)] overflow-hidden"
          style={{
            borderColor:     "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          {results.map((crop, i) => (
            <li
              key={crop.slug}
              id={`${listboxId}-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "flex items-start justify-between gap-3 px-4 py-3 cursor-pointer",
                "transition-colors",
                i === activeIndex
                  ? "bg-[var(--frost-50)]"
                  : "hover:bg-[var(--color-surface-raised)]"
              )}
              onClick={() => handleSelect(crop)}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {crop.name}
                </p>
                {crop.description && (
                  <p
                    className="text-xs mt-0.5 line-clamp-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {crop.description}
                  </p>
                )}
              </div>
              <span
                className="shrink-0 text-xs font-medium mt-0.5 px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--frost-100)",
                  color:           "var(--frost-700)",
                }}
              >
                Use
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
