import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Biru cerah & friendly (tidak gelap)
        primary: {
          50: "#eef7ff",
          100: "#d9edff",
          200: "#bce0ff",
          300: "#8ecdff",
          400: "#59b1ff",
          500: "#3392fb",
          600: "#1f74ef",
          700: "#155cdc",
          800: "#164cb0",
          900: "#18428b",
          950: "#142a5c",
        },
        // Navy lebih terang dari sebelumnya
        navy: "#173a6b",
        accent: "#22c8e6",
        sun: "#ffb020",
        mint: "#2fd48c",
      },
      fontFamily: {
        display: ["Fredoka", "Baloo 2", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "3d": "0 24px 48px -12px rgba(31,116,239,0.28), 0 8px 16px -6px rgba(23,58,107,0.18)",
        "glow": "0 0 40px rgba(51,146,251,0.45)",
        "card": "0 10px 32px rgba(23,58,107,0.10)",
        "float": "0 20px 40px -15px rgba(31,116,239,0.35)",
        "pop": "0 6px 0 0 rgba(23,58,107,0.9)",
        "soft": "0 4px 20px rgba(23,58,107,0.08)",
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      animation: {
        float: "float 6s ease-in-out infinite",
        shine: "shine 2s linear infinite",
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-left-slow": "marquee-left 70s linear infinite",
        ticker: "ticker 28s linear infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
        "pop-in": "pop-in .5s cubic-bezier(.34,1.56,.64,1) both",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-18px)" } },
        shine: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: { "0%, 100%": { transform: "rotate(-2deg)" }, "50%": { transform: "rotate(2deg)" } },
        "pop-in": { "0%": { opacity: "0", transform: "scale(.85) translateY(12px)" }, "100%": { opacity: "1", transform: "scale(1) translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
