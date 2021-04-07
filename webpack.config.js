const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(s*)css$/, // match any .scss or .css file,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  output: {
    filename: "[name].[contenthash].js",
    clean: true
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new ESLintPlugin()
  ]
};
