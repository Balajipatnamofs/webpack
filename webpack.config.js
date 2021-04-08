const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = () => {
  return {
    devtool: "cheap-module-source-map",
    mode: "production",
    entry: "./src/index.js",
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.(s*)css$/, // match any .scss or .css file,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        /**
         * ESLINT
         * First, run the linter.
         * It's important to do this before Babel processes the JS.
         * Only testing .ts and .tsx files (React code)
         */
        {
          test: /\.(ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                eslintPath: require.resolve("eslint")
              },
              loader: require.resolve("eslint-loader")
            }
          ],
          exclude: /node_modules/
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
      compress: false,
      historyApiFallback: true,
      hot: true,
      port: 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html"
      }),
      new ESLintPlugin()
    ]
  };
};
