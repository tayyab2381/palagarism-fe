import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        caption: ["10px", { lineHeight: "1.8" }],
        body: ["14px", { lineHeight: "1.56" }],
        "body-lg": ["16px", { lineHeight: "1.5" }],
        subheading: ["18px", { lineHeight: "1.45" }],
        "heading-sm": ["20px", { lineHeight: "1.35" }],
        heading: ["32px", { lineHeight: "1.28" }],
        "heading-lg": ["40px", { lineHeight: "1.25" }],
        "display-sm": ["48px", { lineHeight: "1.12" }],
        display: ["56px", { lineHeight: "1.05" }],
      },
      spacing: {
        section: "80px",
      },
      colors: {
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
        accent: {
          teal: "#14B8A6",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
      },
      maxWidth: {
        page: "1200px",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at top, #EEF2FF 0%, transparent 55%)",
        "gradient-dark":
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(99, 102, 241, 0.12)",
        glow: "0 8px 32px -8px rgba(99, 102, 241, 0.35)",
        "glow-sm": "0 4px 16px -4px rgba(99, 102, 241, 0.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
