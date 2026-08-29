import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal blue palette — identitas pondok (#2735F5)
        primary: {
          50: "#eef1fe",
          100: "#dfe3fd",
          200: "#c2cafb",
          300: "#99a5f9",
          400: "#6a7df6",
          500: "#2735F5",
          600: "#1e27d4",
          700: "#1920a8",
          800: "#161b83",
          900: "#131660",
          950: "#0b0d38",
        },
        navy: "#141a5e",         // primary deep blue (text/heading)
        royal: "#1a2170",        // footer/hero dark blue
        deepsea: "#0b0d38",      // mobile overlay
        bright: "#2735F5",       // accent / button
        accent: "#22c8e6",       // cyan accent (gradients)
        pale: "#f6f8fe",         // body background
        softblue: "#e9edfd",     // card hover
        sand: "#faf7f0",         // warm parchment (pondok)
        sun: "#f5a623",          // gold CTA (hangat)
        mint: "#10b981",         // WA / success
        coral: "#ef4444",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["Fredoka", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      maxWidth: { "8xl": "1400px", "9xl": "1500px" },
      boxShadow: {
        "3d": "0 24px 48px -12px rgba(20,26,94,0.28), 0 8px 16px -6px rgba(20,26,94,0.18)",
        "glow": "0 0 40px rgba(39,53,245,0.45)",
        "card": "0 4px 20px rgba(20,26,94,0.06)",
        "float": "0 20px 40px -15px rgba(39,53,245,0.35)",
        "pop": "0 6px 0 0 rgba(20,26,94,0.9)",
        "soft": "0 4px 20px rgba(20,26,94,0.08)",
        "yellow": "0 4px 15px rgba(245,166,35,0.4)",
        "yellow-lg": "0 6px 20px rgba(245,166,35,0.6)",
        "blue-glow": "0 0 25px rgba(39,53,245,0.4)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
        "7xl": "4rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(.85) translateY(12px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        spinSlow: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        blobMove: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-50px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.9)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marqueeLeft: "marqueeLeft 70s linear infinite",
        marqueeSlow: "marqueeLeft 90s linear infinite",
        ticker: "ticker 28s linear infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
        popIn: "popIn .5s cubic-bezier(.34,1.56,.64,1) both",
        spinSlow: "spinSlow 18s linear infinite",
        blobMove: "blobMove 20s infinite alternate",
        gradientMove: "gradientMove 8s ease infinite",
        pulseRing: "pulseRing 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            "--tw-prose-body": "#475569",
            "--tw-prose-headings": "#002b5e",
            "--tw-prose-lead": "#1f2937",
            "--tw-prose-links": "#2735F5",
            "--tw-prose-bold": "#002b5e",
            "--tw-prose-quotes": "#002b5e",
            "--tw-prose-quote-borders": "#2735F5",
            "--tw-prose-h2": {
              fontSize: "1.875rem",
              marginTop: "0",
              marginBottom: "1.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #f1f5f9",
            },
            "--tw-prose-h3": { fontSize: "1.5rem" },
            "--tw-prose-p": { marginBottom: "1.5rem", lineHeight: "1.75" },
            "--tw-prose-img": {
              borderRadius: "1rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
