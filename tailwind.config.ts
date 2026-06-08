import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-clash)", "serif"],
        body: ["var(--font-satoshi)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        ink: "#0A0A0F",
        "ink-soft": "#1A1A2E",
        "ink-muted": "#2D2D44",
        cream: "#F5F3EE",
        "cream-warm": "#EDE9E0",
        accent: "#FF4D6D",
        "accent-warm": "#FF8C42",
        "accent-cool": "#4DFFB4",
        electric: "#6C63FF",
        gold: "#FFD166",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 99, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 99, 255, 0.6)" },
        },
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(at 40% 20%, rgba(108,99,255,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255,77,109,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(77,255,180,0.08) 0px, transparent 50%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
