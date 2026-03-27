import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1a3a5c", // deep navy
          light: "#2563eb",   // steel blue
          accent: "#f59e0b",  // amber/gold
        },
      },
      fontFamily: {
        // Barlow Condensed — headings
        heading: ["var(--font-barlow)", "sans-serif"],
        // DM Sans — body text
        sans: ["var(--font-dm)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
