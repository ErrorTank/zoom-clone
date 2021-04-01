const merge = require("webpack-merge");
const webpack = require("webpack");
const dotenv = require("dotenv");
const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const InlineSourcePlugin = require("html-webpack-inline-source-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const env = dotenv.config({ path: join(__dirname, "../../env/prod.env") })
  .parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const {
  PATH_PUBLIC,
  COMMON_CONFIG,
  PATH_DIST,
  PATH_NODE_MODULES,
  PATH_SRC,
} = require("./common.js");

module.exports = merge(COMMON_CONFIG, {
  mode: "production",
  bail: true,
  devtool: "cheap-module-source-map",
  output: {
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].chunk.js",
    path: PATH_DIST,
  },
  optimization: {
    runtimeChunk: "single",
    concatenateModules: true,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        terserOptions: {
          verbose: true,
          beautify: false,
          comments: false,
          warnings: false,
          compress: {
            ecma: 5,
            loops: true,
            dead_code: true,
            computed_props: true,
            conditionals: true,
            unsafe_math: true,
            unsafe_regexp: false,
            unsafe_proto: true,
            unsafe_undefined: true,
            unsafe_Function: true,
            unused: true,
            booleans: true,
            sequences: true,
            drop_console: true,
          },
          output: {
            ecma: 5,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: PATH_PUBLIC, to: PATH_DIST }], {
      ignore: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: join(PATH_PUBLIC, "./index.html"),
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      inlineSource: "runtime~.+\\.js",
    }),
    new InlineSourcePlugin(),
    new PreloadWebpackPlugin({
      as(entry) {
        if (/\.css$/.test(entry)) return "style";
        if (/\.(woff|woff2|otf|ttf|eot)$/.test(entry)) return "font";
        return "script";
      },
      rel: "preload",
      include: "initial",
      exclude: "runtime",
      fileBlacklist: [/\.map$/, /runtime.*.js/],
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
      chunkFilename: "static/css/[name].[contenthash].chunk.css",
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      filename: "[path].gz[query]",
      algorithm: "gzip",
    }),
    new BundleAnalyzerPlugin({ analyzerMode: "static" }),
  ],
});
