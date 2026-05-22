import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "Noto Serif KR", "sans-serif"],
        serif: ["Noto Serif KR", "serif"],
        mono: ["DM Mono", "monospace"],
        display: ["Noto Serif KR", "serif"]
      },
      colors: {
        ark: {
          page: "#F5F2EA",
          card: "#FDFBF5",
          inset: "#EDE9DE",
          ink0: "#18180F",
          ink1: "#3A3A2E",
          ink2: "#6B6858",
          ink3: "#A09C8E",
          ink4: "#C8C4B8",
          red: "#BF4020",
          "red-muted": "#F0E0DA",
          green: "#2A6142",
          "green-muted": "#DFF0E6"
        },
        archive: {
          base: "var(--surface-page)",
          surface: "var(--surface-card)",
          inset: "var(--surface-inset)",
          ink: "var(--ink-0)",
          muted: "var(--ink-3)",
          signal: "var(--accent-red)",
          active: "var(--accent-green)"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontSize: {
        "10": ["0.625rem", { lineHeight: "1.4" }],
        "11": ["0.6875rem", { lineHeight: "1.4" }],
        "13": ["0.8125rem", { lineHeight: "1.6" }],
        "15": ["0.9375rem", { lineHeight: "1.75" }],
        "17": ["1.0625rem", { lineHeight: "1.75" }],
        "26": ["1.625rem", { lineHeight: "1.15" }],
        "36": ["2.25rem", { lineHeight: "1.1" }],
        "52": ["3.25rem", { lineHeight: "1" }]
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "6px"
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem"
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.4s ease both"
      },
      boxShadow: {
        archive: "0 14px 44px rgba(24, 24, 15, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
