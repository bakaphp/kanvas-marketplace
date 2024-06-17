import { createTailwindConfig } from '@kanvas/phoenix-rebirth/dist/config/tailwind';

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = createTailwindConfig({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@kanvas/phoenix/dist/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'display-xl': ['8rem', '10.875rem'],
        'display-base': ['6rem', '8.188rem'],
        'display-md': ['4.5rem', '6.125rem'],
        'heading-xl': ['3.75rem', '5.125rem'],
        'heading-lg': ['3rem', '4.063rem'],
        'heading-base': ['2.25rem', '3.063rem'],
        'heading-md': ['1.875rem', '2.563rem'],
        'heading-sm': ['1.5rem', '2.063rem'],
        'heading-xs': ['1.25rem', '1.75rem'],
        'body-lg': ['1.125rem', '1.75rem'],
        'body-base': ['1rem', '1.5rem'],
        'body-md': ['0.875rem', '1.25rem'],
        'caption-md': ['0.75rem', '1rem'],
        'caption-sm': ['0.625rem', '0.875rem'],
      },
      boxShadow: {
        'elevation-0': '1px 2px 3px rgba(0, 0, 0, 0.05)',
        'elevation-1':
          '-4px -4px 6px rgba(0, 0, 0, 0.04), 4px 4px 4px rgba(0, 0, 0, 0.04)',
        'elevation-2':
          '0px 15px 25px rgba(0, 0, 0, 0.06), 0px 5px 10px rgba(0, 0, 0, 0.08)',
        'elevation-3':
          '0px 20px 30px rgba(0, 0, 0, 0.06), 0px 10px 20px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {},
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100% ': { opacity: '0.2' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // @ts-ignore
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          // @ts-ignore
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
});
