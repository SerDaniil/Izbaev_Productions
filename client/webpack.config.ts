import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
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
  const mode = process.env.NODE_ENV || "development";
  const devMode = mode === "development";
  const target = devMode ? "web" : "browserslist";
  const devtool = devMode ? "source-map" : undefined;

  const config: WebpackConfiguration & DevServerConfiguration = {
    mode: env.mode ?? "development",
    target,
    devtool,
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      clean: true,
      filename: "./main.js",
      chunkFilename: "[name].bundle.js",
      assetModuleFilename: "assets/[name][ext]",
      publicPath: "/", // Добавлено для корректного определения путей
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: env.port ?? 5000,
      open: true,
      compress: true,
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:4000",
        "/img": "http://localhost:4000",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      devMode && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("postcss-preset-env")],
                },
              },
            },
            "group-css-media-queries-loader",
            {
              loader: "resolve-url-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.woff2?$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg)$/i,
          use: devMode
            ? []
            : [
                {
                  loader: "image-webpack-loader",
                  options: {
                    mozjpeg: {
                      progressive: true,
                    },
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: [0.65, 0.9],
                      speed: 4,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    webp: {
                      quality: 75,
                    },
                  },
                },
              ],
          type: "asset/resource",
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.m?js$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    resolve: {
      modules: ["node_modules", "src"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  };

  return config;
};
