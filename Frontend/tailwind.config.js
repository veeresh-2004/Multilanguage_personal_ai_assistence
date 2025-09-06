/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all JS/TS/React files
  ],
  theme: {
    extend: {},
    screens: {
      sm: '600px', // Change small breakpoint
      md: '800px', // Change medium breakpoint
      lg: '1100px', // Change large breakpoint
      xl: '1400px', // Change extra-large breakpoint
    },
  },
  plugins: [],
};
