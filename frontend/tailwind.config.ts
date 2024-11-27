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
        authBG: "#D5DBE1",
        authGradient1: "#AB252C",
        authGradient2: "#7F181C",
        authButton: "#E10000",
      },
      spacing: {
        "1/2": "50%",
        "1/8": "12.5%",
        "1/4": "25%",
        "3/4": "75%",
        "1/10": "10%",
        "3/5": "60%",
        "2/5": "40%",
        "1/20": "5%",
        "1/15": "6.6666667%",
        "1/12": "8.3333333%",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      gradientColorStops: {
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
