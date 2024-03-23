/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cumin: {
          50: "#fef8ee",
          100: "#feeed6",
          200: "#fbdaad",
          300: "#f8bf79",
          400: "#f49a43",
          500: "#f17c1e",
          600: "#e26214",
          700: "#bc4a12",
          800: "#903916",
          900: "#783316",
          950: "#411709",
        },
      },
    },
  },
  plugins: [],
};
