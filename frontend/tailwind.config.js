/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark -> light green ramp
        forest: {
          950: "#06100b",
          900: "#0a1410",
          800: "#0d1f17",
          700: "#11291e",
          600: "#163528",
          500: "#1d4534",
        },
        moss: {
          400: "#2f6f4f",
          300: "#3f8c64",
        },
        mint: {
          500: "#3ddc84",
          400: "#5ee79a",
          300: "#7cffb2",
        },
        bone: {
          100: "#eef5ef",
          200: "#cfe0d4",
          300: "#9fb6a6",
          400: "#6f8a78",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        terminal:
          "0 30px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(61,220,132,0.08)",
        glow: "0 0 0 1px rgba(61,220,132,0.25), 0 0 30px -8px rgba(61,220,132,0.35)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(61,220,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,220,132,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        blink: "blink 1.05s steps(1) infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
