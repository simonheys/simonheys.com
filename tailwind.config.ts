import type { Config } from 'tailwindcss';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        primary: 'color(var(--primary) / <alpha-value>)',
        'primary-hover': 'color(var(--primary-hover) / <alpha-value>)',
        gray: {
          '0': 'rgb(var(--gray-0))',
          '50': 'rgb(var(--gray-50))',
          '100': 'rgb(var(--gray-100))',
          '150': 'rgb(var(--gray-150))',
          '200': 'rgb(var(--gray-200))',
          '250': 'rgb(var(--gray-250))',
          '300': 'rgb(var(--gray-300))',
          '350': 'rgb(var(--gray-350))',
          '400': 'rgb(var(--gray-400))',
          '450': 'rgb(var(--gray-450))',
          '500': 'rgb(var(--gray-500))',
          '550': 'rgb(var(--gray-550))',
          '600': 'rgb(var(--gray-600))',
          '650': 'rgb(var(--gray-650))',
          '700': 'rgb(var(--gray-700))',
          '750': 'rgb(var(--gray-750))',
          '800': 'rgb(var(--gray-800))',
          '850': 'rgb(var(--gray-850))',
          '900': 'rgb(var(--gray-900))',
          '950': 'rgb(var(--gray-950))',
          '1000': 'rgb(var(--gray-1000))',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0.75rem',
          md: '2rem',
          lg: '3rem',
        },
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
        '8xl': 'var(--text-8xl)',
        '9xl': 'var(--text-9xl)',
      },
    },
  },
  plugins: [],
};
export default config;
