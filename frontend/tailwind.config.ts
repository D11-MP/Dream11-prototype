import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        redGradient: "#CF6868",
        redGradient2: "#FFB2B2",
        yellowGradient: "#F4BF43",
        yellowGradient2: "#FFE099",
        grayGradient: "#E5E5E5",
        grayGradient2: "#AAAAAA",
      },
    },
  },
  plugins: [],
} satisfies Config;
