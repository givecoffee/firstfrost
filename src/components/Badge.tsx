// src/components/Badge.tsx
// Generic badge/chip for labels and status indicators.
// Variant maps to design token color sets.

import { cn } from "../utils/cn";

type BadgeVariant =
  | "default"
  | "frost-none"
  | "frost-watch"
  | "frost-warning"
  | "frost-advisory"
  | "frost-hard"
  | "success"
  | "warning"
  | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--frost-100)] text-[var(--frost-800)] border-[var(--frost-200)]",
  "frost-none":
    "bg-[var(--frost-state-none-bg)] text-[var(--frost-state-none-text)] border-[var(--frost-state-none-border)]",
  "frost-watch":
    "bg-[var(--frost-state-watch-bg)] text-[var(--frost-state-watch-text)] border-[var(--frost-state-watch-border)]",
  "frost-warning":
    "bg-[var(--frost-state-warning-bg)] text-[var(--frost-state-warning-text)] border-[var(--frost-state-warning-border)]",
  "frost-advisory":
    "bg-[var(--frost-state-advisory-bg)] text-[var(--frost-state-advisory-text)] border-[var(--frost-state-advisory-border)]",
  "frost-hard":
    "bg-[var(--frost-state-hard-bg)] text-[var(--frost-state-hard-text)] border-[var(--frost-state-hard-border)]",
  success:
    "bg-green-50 text-green-800 border-green-200",
  warning:
    "bg-amber-50 text-amber-800 border-amber-200",
  muted:
    "bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] border-[var(--color-border)]",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] border font-medium",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-2.5 py-1 text-sm",
        variantClasses[variant],
        className
      )}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </span>
  );
}
