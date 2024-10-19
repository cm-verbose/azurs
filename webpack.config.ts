import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/ts/script.ts",
  mode: "development",
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
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./src/js/"),
  },
};

export default config;
