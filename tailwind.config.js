/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // all JS/JSX/TSX/HTML files in src
  ], theme: {
    extend: {
      animation: {
        shine: "shine 2.5s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "150%" },
        },
      },
    },
  },
  plugins: [],
}

