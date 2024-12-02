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
        page_bg_color: "#F6F6F9",
        font_color: "#131927",
        play_btn_clr: "#E10000",
        authBG: "#D5DBE1",
        authGradient1: "#AB252C",
        authGradient2: "#7F181C",
        authButton: "#E10000",
        plusButton: "#CBFFB8ED",
        plusHover: "#BFFF8DB2",
        minusButton: "#FFC0C0ED",
        minusHover: "#FFA0A0B2",
        bothead: "#FDE8E8",
        letred: "#E10000",
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
        purple: "#5C5CFE",
        pink: "#E94986",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      width: {
        "112": "28rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
