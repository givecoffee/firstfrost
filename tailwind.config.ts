// tailwind.config.ts
// Updated Week 4: fontFamily extension + CSS variable references for theme colors.

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Wired to CSS custom properties set in tokens.css
        heading: ["var(--font-heading)"],
        sans:    ["var(--font-body)"],
        mono:    ["var(--font-mono)"],
      },
      colors: {
        frost: {
          50:  "var(--frost-50)",
          100: "var(--frost-100)",
          200: "var(--frost-200)",
          300: "var(--frost-300)",
          400: "var(--frost-400)",
          500: "var(--frost-500)",
          600: "var(--frost-600)",
          700: "var(--frost-700)",
          800: "var(--frost-800)",
          900: "var(--frost-900)",
          950: "var(--frost-950)",
        },
      },
      spacing: {
        touch: "var(--touch-target-min)", // 44px WCAG touch target
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },
    },
  },
  plugins: [],
};

export default config;
