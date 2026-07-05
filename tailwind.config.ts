import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0908",
        bone: "#f4f1ea",
        smoke: "#1a1815",
        ash: "#8a857d",
        rust: "#b8492a",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        colossal: ["clamp(4rem, 18vw, 22rem)", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
        heroName: ["clamp(3.25rem, 8.5vw, 10rem)", { lineHeight: "0.88", letterSpacing: "-0.035em" }],
        editorial: ["clamp(2.5rem, 8vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        title: ["clamp(1.5rem, 3.5vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        micro: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.65, 0, 0.35, 1)",
        cinema: "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
