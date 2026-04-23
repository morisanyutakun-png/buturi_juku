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
        // Primary body backgrounds (warm paper tones)
        paper: {
          DEFAULT: "#fdfbf5",
          soft: "#f6f2e8",
          muted: "#ebe5d5",
        },
        cream: {
          DEFAULT: "#f6efe2",
          muted: "#e8dfc9",
        },

        // Text colors (ink on paper)
        ink: {
          950: "#0a1528",
          900: "#142341",
          800: "#1e3056",
          700: "#36456a",
          600: "#5a6886",
          500: "#7f8ca6",
          400: "#a9b2c5",
          300: "#cfd5e1",
        },

        // Primary brand — friendly, approachable blue
        brand: {
          DEFAULT: "#3b7cd9",
          soft: "#c5daf5",
          bg: "#e9f0fb",
          deep: "#1f5aa6",
        },
        // Keep accent as alias (less migration pain)
        accent: {
          DEFAULT: "#3b7cd9",
          soft: "#c5daf5",
          deep: "#1f5aa6",
        },

        // Warm coral — for CTAs and emphasis
        warm: {
          DEFAULT: "#e28040",
          soft: "#fbddc4",
          bg: "#fef4eb",
          deep: "#b35f27",
        },

        // Forest green — subtle 森 echo
        forest: {
          DEFAULT: "#597a5b",
          soft: "#d8e4d9",
          bg: "#eff4ef",
          deep: "#2f4b31",
        },

        // Gold — credentials and book accents (darkened for light bg)
        gold: {
          DEFAULT: "#caa34b",
          soft: "#f3e4b6",
          deep: "#8e6c2a",
        },

        // Deep surfaces (used sparingly for dark accent cards)
        navy: {
          900: "#0a1528",
          800: "#142341",
          700: "#1e3056",
          600: "#2e4474",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "'Hiragino Sans'",
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
        "display-lg": [
          "clamp(2.2rem, 5.5vw, 4.2rem)",
          { lineHeight: "1.12", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "clamp(1.8rem, 3.8vw, 2.6rem)",
          { lineHeight: "1.18", letterSpacing: "-0.01em" },
        ],
      },
      boxShadow: {
        soft: "0 10px 30px -15px rgba(31, 90, 166, 0.15)",
        card: "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 18px 40px -30px rgba(10,21,40,0.25)",
        warm: "0 12px 30px -15px rgba(226, 128, 64, 0.35)",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(1400px 700px at 50% -200px, rgba(59,124,217,0.06), transparent 60%), linear-gradient(180deg, #fdfbf5 0%, #f7f2e5 100%)",
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
