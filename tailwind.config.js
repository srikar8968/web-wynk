const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.warmGray,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.amber,
      green: colors.emerald,
      indigo: colors.indigo,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
