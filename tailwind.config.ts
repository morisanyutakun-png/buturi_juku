import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        ink: {
          950: "#05060a",
          900: "#0a0c14",
          800: "#10131d",
          700: "#151a27",
          600: "#1c2233",
        },
        navy: {
          900: "#070c1c",
          800: "#0b1328",
          700: "#132044",
          600: "#1b2d5b",
        },
        paper: {
          DEFAULT: "#f5f5f7",
          muted: "#d4d4d8",
        },
        accent: {
          DEFAULT: "#6ea8ff",
          soft: "#a4c3ff",
          deep: "#3a6bd8",
        },
        gold: {
          DEFAULT: "#e8c57a",
          soft: "#f2d99a",
          deep: "#b88a3e",
        },
        cream: {
          DEFAULT: "#f6efe2",
          muted: "#e8e0cf",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "'Hiragino Kaku Gothic ProN'",
          "'Noto Sans JP'",
          "'Yu Gothic'",
          "Meiryo",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "'Hiragino Mincho ProN'",
          "'Noto Serif JP'",
          "'Yu Mincho'",
          "serif",
        ],
      },
      fontSize: {
        "display-lg": ["clamp(2.4rem, 6vw, 4.4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.9rem, 4vw, 2.8rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      boxShadow: {
        soft: "0 10px 40px -20px rgba(110, 168, 255, 0.25)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(5,6,10,0) 0%, rgba(5,6,10,1) 80%), radial-gradient(circle at 50% 0%, rgba(110,168,255,0.18), transparent 60%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
