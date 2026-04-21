/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          darkest: "#04342C",
          light: "#E1F5EE",
        },
        amber: {
          DEFAULT: "#BA7517",
          light: "#FAEEDA",
          dark: "#633806",
        },
        whatsapp: "#25D366",
        ink: {
          DEFAULT: "#1a1a1a",
          secondary: "#5f5e5a",
          tertiary: "#888780",
        },
        border: {
          DEFAULT: "rgba(0,0,0,0.12)",
          strong: "rgba(0,0,0,0.22)",
        },
        surface: {
          DEFAULT: "#ffffff",
          alt: "#f1efe8",
          bg: "#fafaf7",
        },
      },
      fontFamily: {
        sans: ["System"],
        mono: ["Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
