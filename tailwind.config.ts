import type { Config } from "tailwindcss";
import fluid, { screens, fontSize, extract } from 'fluid-tailwind'

export default {
  content:{ 
    files: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/locales/**/*.{js,ts}',
  ], extract,
  }, 
  screens,
  fontSize,
  extend: {
    screens: {
      '5xl': '120rem',    // 1920px
      '6xl': '128rem',    // 2048px
      '7xl': '160rem',    // 2560px
      '8xl': '200rem',    // 3200px
      '9xl': '240rem',    // 3840px
    },
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'var(--font-lato)', 'system-ui'],
        roboto: ['var(--font-roboto)', 'system-ui'],
        lato: ['var(--font-lato)', 'system-ui'],
        'noto-jp': ['var(--font-noto-sans-jp)', 'system-ui'],
        oi: ['var(--font-oi)', 'system-ui'],
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
