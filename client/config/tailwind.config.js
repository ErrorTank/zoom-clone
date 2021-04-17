module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.{js,jsx}"],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
