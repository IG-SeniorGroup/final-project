/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': '699px',
      // => @media (min-width: 576px) { ... }

      'md': '700px',
      // => @media (min-width: 960px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};

