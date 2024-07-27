import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideLeft: {
          "100%": { transform: "translateX(0%)" },
          "0%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        slideRight: "slideRight 0.5s ease-in-out",
        slideLeft: "slideLeft 0.5s ease-in-out",
      },
      spacing: {
        small: "0.75rem", // => 12px
        medium: "0.875rem", // => 14px
        gutter: "1rem", // => 16px
        normal: "1.25rem", // > 20px
        large: "2.5rem", // => 40px
      },
      colors: {
        primary: "#FCCE02",
        secondary: "#bfdbfe", // blue-200
        light: "#eff6ff", // blue-100
        "text-gray": "#737373",
        "text-black": "#262626",
        "neon-blue": "#00FFFF",
        "neon-green": "#7CFC00",
        "neon-yellow": "#F4FF33",
      },
      padding: {
        "rectangle-small": "0.5rem 1rem",
        "rectangle-normal": "0.75rem 1.25rem",
      },
      fontSize: {
        extraExtraSmall: "0.75rem", // 12px
        extraSmall: "0.875rem", // 14px
        small: "1rem", // 16px
        medium: "1.125rem", // => 20px
        large: "1.875rem", // => 30px
        "very-large": "3rem", // => 48px
        "extra-very-large": "4.5rem", // => 72px
      },
      screens: {
        xs: "420px",
        ls: "482px",
      },
    },
  },
  plugins: [],
};
export default config;
