/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#F9F9F7',
        'surface': '#FFFFFF',
        'text-main': '#111111',
        'text-muted': '#6E6E6E',
        'border': '#E6E6E6',
      },
      fontFamily: {
        'instrument': ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
