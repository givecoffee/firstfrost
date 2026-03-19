// src/components/SectionLabel.tsx
// Small uppercase label used above groups of content (e.g. "Outdoor Plots")

import { cn } from "../utils/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-widest",
        "text-[var(--color-text-muted)]",
        className
      )}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </p>
  );
}
