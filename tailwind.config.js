// tailwind.config.js
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Dongle", "Helvetica"],
        text: ["Open Sans", "Helvetica"],
      },
      colors: {
        primary: colors.sky["800"],
        secondary: colors.gray["200"],
        button: colors.sky["500"],
        error: colors.red["500"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
