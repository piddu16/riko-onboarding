const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#22C55E",
          hover: "#16A34A",
          deep: "#065F46",
          tint: "#E8F5EC",
        },
        ink: {
          DEFAULT: "#0B1F12",
          secondary: "#0F172A",
          tertiary: "#166534",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          tint: "#F8FAF9",
        },
        slate: colors.slate,
        amber: colors.amber,
        red: colors.red,
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["Inter_400Regular", "System"],
        medium: ["Inter_500Medium"],
        semibold: ["Inter_600SemiBold"],
        bold: ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
