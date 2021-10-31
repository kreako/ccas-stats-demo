const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
