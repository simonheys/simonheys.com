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
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        accent: "rgb(var(--accent))",
        primary: "rgb(var(--primary))",
        "primary-hover": "rgb(var(--primary-hover))",
        gray: {
          0: "rgb(var(--gray-0))",
          50: "rgb(var(--gray-50))",
          100: "rgb(var(--gray-100))",
          150: "rgb(var(--gray-150))",
          200: "rgb(var(--gray-200))",
          250: "rgb(var(--gray-250))",
          300: "rgb(var(--gray-300))",
          350: "rgb(var(--gray-350))",
          400: "rgb(var(--gray-400))",
          450: "rgb(var(--gray-450))",
          500: "rgb(var(--gray-500))",
          550: "rgb(var(--gray-550))",
          600: "rgb(var(--gray-600))",
          650: "rgb(var(--gray-650))",
          700: "rgb(var(--gray-700))",
          750: "rgb(var(--gray-750))",
          800: "rgb(var(--gray-800))",
          850: "rgb(var(--gray-850))",
          900: "rgb(var(--gray-900))",
          950: "rgb(var(--gray-950))",
          1000: "rgb(var(--gray-1000))",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "0.75rem",
          md: "2rem",
          lg: "3rem",
        },
      },
      //   screens: {
      //     sm: "540px",
      //     md: "720px",
      //     lg: "960px",
      //     xl: "1140px",
      //     "2xl": "1320px",
      //   },
      //   maxWidth: "1600px",
      // },
    },
  },
  plugins: [],
};
export default config;
