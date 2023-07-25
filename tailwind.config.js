/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        " purple": "#693AC1",
        darkpurple: "#2C155F",
        lightpurple: "#E6D9FC",
      },
    },
  },
  plugins: [],
};
