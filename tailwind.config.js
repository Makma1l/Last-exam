const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    fontFamily: {
      monts: ["Montserrat", "sans-serif"],
    },
    extend: {
      maxWidth: {
        navbar: "1280px",
      },
      height: {
        heroH: "400px",
      },
      color: {
        'cyan-main': '#87CEEB',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
