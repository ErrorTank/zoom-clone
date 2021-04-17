const { join } = require("path");

module.exports = {
  plugins: [
    require("postcss-import")({
      plugins: [],
      path: ["./node_modules"],
    }),
    require("@tailwindcss/jit")(join(__dirname, "./tailwind.config.js")),
    require("postcss-utilities")(),
    require("precss")(),
  ],
};
