/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'red-900': '#7C1D1D',
        'red-700': '#B91C1C',
      }
    },
  },
  plugins: [],
}