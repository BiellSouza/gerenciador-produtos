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
      screens: {
        tela1: '320px',
        tela2: '375px',
        tela3: '425px',
        tela4: '640px',
        tela5: '768px',
        tela6: '1024px',
        tela7: '1280px',
        tela8: '1440px',
      },
    },
  },
  plugins: [],
};
