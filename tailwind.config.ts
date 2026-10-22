import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF6",
          100: "#F7F3EB",
          200: "#EFE7D8",
          300: "#E4D6BE",
          400: "#D3BE9B",
          500: "#BF9F6F",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F4ECDC",
          200: "#E8D7B0",
          300: "#DBC284",
          400: "#CEAD58",
          500: "#D4AF37", // Classic luxury gold
          600: "#B89325",
          700: "#92741B",
          800: "#6B5515",
          900: "#49390D",
        },
        noir: {
          900: "#0F1215",
          800: "#171C22",
          700: "#222933",
          600: "#343E4C",
        },
        emerald: {
          900: "#0B231D",
          800: "#12372E",
          700: "#1C4E42",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cormorant Garamond", "Cinzel", "Georgia", "serif"],
        script: ["var(--font-great-vibes)", "Great Vibes", "cursive"],
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        sealPulse: {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))" },
          "50%": { transform: "scale(1.04)", filter: "drop-shadow(0 0 25px rgba(212, 175, 55, 0.7))" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "seal-pulse": "sealPulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
