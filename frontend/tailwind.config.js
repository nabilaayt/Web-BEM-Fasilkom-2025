/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "red-900": "#7C1D1D",
        "red-700": "#B91C1C",
      },
      fontFamily: {
        "gotham-bold": ["Gotham Bold", "cursive"],
        "gotham-medium": ["Gotham Medium", "cursive"],
        "gotham-book": ["Gotham Book", "cursive"],
        "cinzel-decorative": ["Cinzel Decorative", "serif"],
        "cinzel": ["Cinzel", "serif"],
      },
      screens: {
        "2k": "2000px",
      },
    },
  },
  plugins: [],
};
