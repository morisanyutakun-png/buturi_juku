import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.15rem",
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

        // Text colors (ink on paper) — tuned so 500/600 hit WCAG AA on paper
        ink: {
          950: "#0a1528",
          900: "#142341",
          800: "#1e3056",
          700: "#36456a",
          600: "#4f5d7a",
          500: "#606e8a",
          400: "#7c8aa3",
          300: "#aab3c5",
        },

        // Primary brand — friendly, approachable blue
        brand: {
          DEFAULT: "#3b7cd9",
          soft: "#c5daf5",
          bg: "#e9f0fb",
          deep: "#1f5aa6",
        },
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

        // Gold — credentials and book accents
        gold: {
          DEFAULT: "#caa34b",
          soft: "#f3e4b6",
          deep: "#8e6c2a",
        },

        // Deep surfaces
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
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "'SF Mono'",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        tight: "-0.015em",
        wide: "0.02em",
        wider: "0.08em",
        widest: "0.32em",
      },
      fontSize: {
        // Apple-style display sizes — clamp lifted on the low end so mobile hits a comfortably large size
        "display-2xl": [
          "clamp(2.85rem, 7vw, 5.6rem)",
          { lineHeight: "1.12", letterSpacing: "-0.025em", fontWeight: "500" },
        ],
        "display-xl": [
          "clamp(2.55rem, 6vw, 4.6rem)",
          { lineHeight: "1.18", letterSpacing: "-0.022em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5.2vw, 4rem)",
          { lineHeight: "1.2", letterSpacing: "-0.018em" },
        ],
        "display-md": [
          "clamp(1.95rem, 3.6vw, 2.5rem)",
          { lineHeight: "1.32", letterSpacing: "-0.012em" },
        ],
        "display-sm": [
          "clamp(1.45rem, 2.4vw, 1.7rem)",
          { lineHeight: "1.45", letterSpacing: "-0.008em" },
        ],
      },
      boxShadow: {
        // Apple-like layered shadows (light, refined)
        soft: "0 1px 2px rgba(10,21,40,0.04), 0 12px 28px -20px rgba(10,21,40,0.18)",
        card: "0 1px 0 rgba(255,255,255,0.75) inset, 0 1px 2px rgba(10,21,40,0.04), 0 24px 48px -28px rgba(10,21,40,0.22)",
        warm: "0 1px 2px rgba(179,95,39,0.12), 0 14px 32px -16px rgba(226,128,64,0.32)",
        ring: "0 0 0 1px rgba(20,35,65,0.06), 0 1px 2px rgba(10,21,40,0.04)",
        elevate:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 2px 8px rgba(10,21,40,0.06), 0 32px 64px -28px rgba(10,21,40,0.28)",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(1400px 700px at 50% -200px, rgba(59,124,217,0.06), transparent 60%), linear-gradient(180deg, #fdfbf5 0%, #f7f2e5 100%)",
        "hairline-x":
          "linear-gradient(to right, transparent, rgba(20,35,65,0.12), transparent)",
        "hairline-y":
          "linear-gradient(to bottom, transparent, rgba(20,35,65,0.12), transparent)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(10px)", filter: "blur(2px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        revealUp: "revealUp 0.7s cubic-bezier(0.2,0.7,0.2,1) both",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring-soft": "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
