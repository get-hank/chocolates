const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "styled-components": "styled-components",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "chocolates",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
};
