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
        background: "var(--background)", // Background color from CSS variables
        foreground: "var(--foreground)", // Foreground color from CSS variables
        redGradient: "#CF6868", // Custom red gradient color
        redGradient2: "#FFB2B2", // Custom secondary red gradient color
        yellowGradient: "#F4BF43", // Custom yellow gradient color
        yellowGradient2: "#FFE099", // Custom secondary yellow gradient color
        grayGradient: "#E5E5E5", // Custom gray gradient color
        grayGradient2: "#AAAAAA", // Custom secondary gray gradient color
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], // Global Poppins font
      },
      gradientColorStops: {
        // Gradient customization using existing colors
        "red-start": "#CF6868",
        "red-end": "#FFB2B2",
        "yellow-start": "#F4BF43",
        "yellow-end": "#FFE099",
        "gray-start": "#E5E5E5",
        "gray-end": "#AAAAAA",
      },
    },
  },
  plugins: [],
} satisfies Config;
