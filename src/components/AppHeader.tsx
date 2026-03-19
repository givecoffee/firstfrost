// src/components/AppHeader.tsx
// Shared top-of-screen header used by both outdoor and indoor views.
// Accepts a title, optional subtitle, and an optional right-side action slot.

import { cn } from "../utils/cn";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AppHeader({ title, subtitle, action, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "px-4 pt-6 pb-4 flex items-start justify-between gap-3",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <h1
          className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-0.5 text-sm text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0 flex items-center mt-1">
          {action}
        </div>
      )}
    </header>
  );
}
