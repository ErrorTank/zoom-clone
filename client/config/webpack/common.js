const { join } = require("path");
const dotenv = require("dotenv");
const env = dotenv.config({ path: join(__dirname, "../../env/.env") }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


const PATH_SRC = join(__dirname, "../../src");
const PATH_BUILD = join(__dirname, "../../build");
const PATH_DIST = join(__dirname, "../../dist");
const PATH_PUBLIC = join(__dirname, "../../public");
const PATH_SRC_INDEX = join(PATH_SRC, "./react/index.jsx");
const PATH_NODE_MODULES = join(__dirname, "../../node_modules");
const HOST = "localhost";
const PORT = 2000;

exports.PATH_SRC = PATH_SRC;
exports.PATH_DIST = PATH_DIST;
exports.PATH_BUILD = PATH_BUILD;
exports.PATH_PUBLIC = PATH_PUBLIC;
exports.PATH_SRC_INDEX = PATH_SRC_INDEX;
exports.PATH_NODE_MODULES = PATH_NODE_MODULES;
exports.HOST = HOST;
exports.PORT = PORT;

exports.COMMON_CONFIG = {
  entry: {
    loader: ["@babel/polyfill", PATH_SRC_INDEX],
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: PATH_SRC,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: "svg-react-loader",
      },
      {
        test: /\.(bmp|jpe?g|png|gif)$/i,
        loader: "url-loader",
        options: {
          name: "static/images/[name].[hash:8].[ext]",
          limit: 10000,
        },
      },
    ],
  },
};
