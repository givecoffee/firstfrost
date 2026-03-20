// src/components/Card.tsx
// Base card wrapper — purely presentational.
// Applies surface background, border, radius, and shadow from design tokens.

import { cn } from "../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Makes the card a focusable button */
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  const base = cn(
    "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
    "bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
    "transition-shadow duration-150",
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          base,
          "w-full text-left cursor-pointer",
          "hover:shadow-[var(--shadow-md)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--frost-500)]",
          // Minimum 44px touch target
          "min-h-[var(--touch-target-min)]"
        )}
      >
        {children}
      </button>
    );
  }

  return <div className={base}>{children}</div>;
}
