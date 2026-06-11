import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        caption: ["11px", { lineHeight: "1.6" }],
        body: ["15px", { lineHeight: "1.6" }],
        "body-lg": ["17px", { lineHeight: "1.55" }],
        subheading: ["19px", { lineHeight: "1.45" }],
        "heading-sm": ["22px", { lineHeight: "1.35" }],
        heading: ["32px", { lineHeight: "1.25" }],
        "heading-lg": ["40px", { lineHeight: "1.2" }],
        "display-sm": ["44px", { lineHeight: "1.15" }],
        display: ["52px", { lineHeight: "1.1" }],
      },
      spacing: {
        section: "72px",
      },
      colors: {
        canvas: "#FAFAF9",
        ink: {
          DEFAULT: "#1C1917",
          muted: "#57534E",
          subtle: "#78716C",
        },
        accent: {
          DEFAULT: "#0D9488",
          light: "#CCFBF1",
          dark: "#0F766E",
          amber: "#D97706",
          rose: "#E11D48",
        },
        line: "#E7E5E4",
        surface: "#FFFFFF",
      },
      maxWidth: {
        page: "1120px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(28, 25, 23, 0.06), 0 8px 24px rgba(28, 25, 23, 0.04)",
        lift: "0 2px 8px rgba(28, 25, 23, 0.08)",
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "14px",
        xl: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
