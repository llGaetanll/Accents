const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    // bundle the menu page, this is the window that pops up when we click on the extension icon
    menu: path.join(__dirname, "src", "menu.js"),

    // bundle the modal, this is injected into the page to make the extension work
    modal: path.join(__dirname, "src", "modal.js"),
  },
  output: {
    // output everything to directory named build
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 3000,
  },
  module: {
    // how webpack should handle different file types
    rules: [
      {
        // loads all js and jsx files into babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // allows us to import css files into our components
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // we copy all files from the public directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public"),
        },
      ],
    }),
  ],
};
