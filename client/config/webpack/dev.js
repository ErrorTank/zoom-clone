const merge = require("webpack-merge");
const webpack = require("webpack");
const dotenv = require("dotenv");
const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const env = dotenv.config({ path: join(__dirname, "../../env/dev.env") }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const {
  PATH_PUBLIC,
  COMMON_CONFIG,
  PATH_BUILD,
  HOST,
  PORT,
  PATH_NODE_MODULES,
  PATH_SRC,
} = require("./common.js");

module.exports = merge(COMMON_CONFIG, {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    filename: "js/bundle.js",
    chunkFilename: "js/[name].bundle.js",
    path: PATH_BUILD,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: join(__dirname, "../postcss.config.js"),
              },
            },
          },
        ],
        exclude: [PATH_NODE_MODULES],
        include: [PATH_SRC],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin([{ from: PATH_PUBLIC, to: PATH_BUILD }], {
      ignore: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: join(PATH_PUBLIC, "./index.html"),
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    hot: true,
    open: true,
    host: HOST,
    port: PORT,
    quiet: false,
    inline: true,
    overlay: false,
    compress: true,
    contentBase: PATH_BUILD,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
});
