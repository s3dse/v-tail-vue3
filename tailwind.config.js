/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,vue}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        navy: {
          100: "#d2dee4",
          200: "#a5bdc9",
          300: "#789cae",
          400: "#4b7b93",
          500: "#1e5a78",
          600: "#184860",
          700: "#123648",
          800: "#0c2430",
          900: "#061218"
        }
      }
    },
  },
  plugins: [],
  prefix: 'tw-'
}

