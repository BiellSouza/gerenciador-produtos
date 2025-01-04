/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0CC89C",
        secondary: "#26544F",
        terciary: "#fff",
        background: "#2D2727"
      },
      animation: {
        spin: "spin 4s linear infinite", // Define a rotação contínua
      },
    },
  },
  plugins: [],
};
