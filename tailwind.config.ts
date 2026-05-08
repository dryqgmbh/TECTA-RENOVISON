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
        navy: {
          DEFAULT: "#0B1F33",
          50: "#E8EEF4",
          100: "#C5D4E3",
          200: "#9FB8CC",
          300: "#799CB5",
          400: "#52809E",
          500: "#3D6580",
          600: "#2D4D62",
          700: "#1D3548",
          800: "#0E1E2E",
          900: "#0B1F33",
        },
        graphite: {
          DEFAULT: "#1F2937",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        arch: {
          DEFAULT: "#2563FF",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        stone: {
          DEFAULT: "#F4F1EA",
          warm: "#F4F1EA",
          sand: "#D8CBB8",
          offwhite: "#FCFBF8",
        },
        slate: {
          tecta: "#667085",
        },
        success: "#1F8A62",
        amber: { tecta: "#C58A1C" },
        risk: "#C64B4B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
