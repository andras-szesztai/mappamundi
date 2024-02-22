/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    fontFamily: {
      light: ['fredokaLight', 'sans-serif'],
      medium: ['fredokaMedium', 'sans-serif'],
      bold: ['fredokaBold', 'sans-serif'],
    },
    extend: {
      colors: {
        verdigris: '#00afb9',
        midnightGreen: '#1D545B',
        azure: '#ebfeff',
        sunglow: '#FFC941',
        amaranth: '#E63757',
        crayola: '#F76F8E',
      },
    },
  },
  plugins: [],
};
