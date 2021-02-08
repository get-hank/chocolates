const path = require("path");

module.exports = {
  entry: {
    icons: "./src/icons/index.tsx",
    ui: "./src/ui.tsx",
    table: "./src/table.tsx",
    payment: "./src/payment.tsx",
    api: "./src/api.tsx",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
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
    "react-router-dom": "react-router-dom",
    "styled-components": "styled-components",
    "react-relay": "react-relay",
    "relay-runtime": "relay-runtime",
    "@auth0/auth0-react": "@auth0/auth0-react",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: ["chocolates", "[name]"],
    libraryTarget: "umd",
    // umdNamedDefine: true,
  },
  // optimization: {
  // splitChunks: {
  // chunks: "all",
  // },
  // },
};
