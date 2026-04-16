import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Thrill World brand colors — light mode palette
        thrillBg: "#FAFAF5",
        thrillSurface: "#FFFFFF",
        thrillPurple: "#5B21B6",
        thrillViolet: "#7C3AED",
        thrillOrange: "#F97316",
        thrillSky: "#0EA5E9",
        thrillYellow: "#FFD600",
        thrillText: "#1C1C2E",
        thrillMuted: "#6B7280",
        // Legacy aliases
        thrillCyan: "#0EA5E9",
      },
      fontFamily: {
        display: ["Bebas Neue", "cursive"],
        heading: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        subtle: "0 2px 8px rgba(0,0,0,0.08)",
        "glow-orange": "0 0 30px 0 rgba(249, 115, 22, 0.35)",
        "glow-violet": "0 0 30px 0 rgba(91, 33, 182, 0.30)",
        "glow-yellow": "0 0 30px 0 rgba(255, 214, 0, 0.35)",
        "elevation": "0 20px 40px 0 rgba(91,33,182,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 25px 50px rgba(91,33,182,0.12), 0 0 30px rgba(91,33,182,0.08)",
        "warm": "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(91,33,182,0.4)" },
          "50%":       { opacity: "0.7", boxShadow: "0 0 40px rgba(91,33,182,0.65)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        typewriter: {
          from: { width: "0" },
          to:   { width: "100%" },
        },
        "blink-caret": {
          "0%, 100%": { borderColor: "transparent" },
          "50%":       { borderColor: "#F97316" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(40px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.85)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            textShadow: "0 0 20px #F97316, 0 0 40px rgba(249,115,22,0.5), 0 0 60px rgba(249,115,22,0.25)",
          },
          "20%, 24%, 55%": { textShadow: "none" },
        },
        "particle-drift": {
          "0%":   { transform: "translate(0, 0) scale(1)", opacity: "1" },
          "100%": { transform: "translate(100px, -100px) scale(0)", opacity: "0" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "float":           "float 3s ease-in-out infinite",
        "pulse-glow":      "pulse-glow 2s ease-in-out infinite",
        "spin-slow":       "spin 20s linear infinite",
        "marquee":         "marquee 30s linear infinite",
        "typewriter":      "typewriter 3s steps(40) 1s both",
        "blink-caret":     "blink-caret 0.75s step-end infinite",
        "fade-up":         "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in":         "fade-in 0.6s ease both",
        "slide-in-left":   "slide-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-right":  "slide-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in":        "scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "neon-flicker":    "neon-flicker 3s infinite",
        "particle-drift":  "particle-drift 3s ease-out forwards",
        "shimmer":         "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
