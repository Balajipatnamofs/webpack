const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const dev = process.env.NODE_ENV !== "production";

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "styles.css"
  })
];
if (!dev) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "webpack-report.html",
      openAnalyzer: false
    })
  );
}
const common = {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        // use: ['style-loader', 'css-loader']
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
  plugins
};

module.exports = [
  {
    ...common,
    entry: "./src/client",
    output: {
      path: `${__dirname}/client`,
      filename: "[name].bundle.js",
      clean: true
    }
  },
  {
    ...common,
    target: "node",
    entry: "./src/server",
    externals: [nodeExternals()]
  }
];
