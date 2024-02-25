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
    extend: {},
  },
  plugins: [],
};
