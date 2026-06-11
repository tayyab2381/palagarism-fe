import type { Config } from "tailwindcss";

// Tailwind configuration — Awesomic design tokens
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        badge: "12px",
        input: "14px",
        "card-sm": "28px",
        card: "36px",
        hero: "48px",
        pill: "10000px",
      },
      colors: {
        obsidian: "#09090b",
        ink: "#18181b",
        graphite: "#3f3f46",
        slate: "#52525b",
        steel: "#71717a",
        ash: "#a1a1aa",
        pebble: "#d4d4d8",
        fog: "#ececee",
        mist: "#f4f4f5",
        snow: "#ffffff",
      },
      maxWidth: {
        page: "1200px",
      },
      boxShadow: {
        cta: "var(--shadow-cta)",
        "card-inset": "var(--shadow-card-inset)",
        "card-drop": "var(--shadow-card-drop)",
      },
    },
  },
  plugins: [],
};

export default config;
