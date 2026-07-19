/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        podium: ['"FSP DEMO - PODIUM Sharp 4.11"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        brandred: "#C1121F",
        brandblack: "#0B0B0B",
        brandgray: "#181818",
      },
    },
  },
  plugins: [],
};
