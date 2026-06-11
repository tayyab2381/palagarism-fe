import type { Config } from "tailwindcss";

// Tailwind configuration — Awesomic design tokens
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        caption: ["10px", { lineHeight: "1.8" }],
        body: ["14px", { lineHeight: "1.56" }],
        "body-lg": ["16px", { lineHeight: "1.5" }],
        subheading: ["18px", { lineHeight: "1.45" }],
        "heading-sm": ["20px", { lineHeight: "1.35" }],
        heading: ["32px", { lineHeight: "1.28" }],
        "heading-lg": ["40px", { lineHeight: "1.25" }],
        "display-sm": ["56px", { lineHeight: "1.12" }],
        display: ["64px", { lineHeight: "1" }],
      },
      spacing: {
        section: "80px",
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
