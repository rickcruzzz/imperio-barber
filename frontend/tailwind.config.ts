import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        charcoal: "#141414",
        gold: "#C8A96B",
        ivory: "#F8F4ED",
        smoke: "#A5A29C",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 20% 20%, rgba(200,169,107,0.22), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.08), transparent 30%)",
      },
      boxShadow: {
        premium: "0 20px 40px -20px rgba(200, 169, 107, 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
