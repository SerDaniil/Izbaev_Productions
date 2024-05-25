import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (
  env: EnvVariables
): WebpackConfiguration & DevServerConfiguration => {
  const isDev = env.mode === "development";

  const config: WebpackConfiguration & DevServerConfiguration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
      clean: true,
      publicPath: "/", // Добавлено для корректного определения путей
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "index.html",
      }),
      isDev && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(obj|fbx|dae)$/,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: env.port ?? 5000,
      open: true,
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:4000",
        "/img": "http://localhost:4000",
      },
    },
  };

  return config;
};
