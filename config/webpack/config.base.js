const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

if (!process.env.API_URI) {
  throw new Error("Environment variable API_URI not set");
}

module.exports = ({ sourceDir, distDir }) => ({
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
  entry: {
    app: `${sourceDir}/index.tsx`,
  },
  output: {
    path: distDir,
    publicPath: "/",
  },
  devtool: "",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "/fonts/",
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "/images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                enabled: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: distDir,
    }),
    new HtmlWebpackPlugin({
      filename: `${distDir}/index.html`,
      template: `${sourceDir}/index.html`,
      API_URI: process.env.API_URI,
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      exclude: "node_modules",
      async: false,
    }),
    // PWA plugins
    new WebappWebpackPlugin({
      logo: `${sourceDir}/images/android-chrome.png`,
      prefix: "images/favicons/",
      favicons: {
        appName: "Erocery-Best Online Grocery Store (Pakistan)",
        appDescription: "Erocery is Online Grocery Store in Islamabad & Rawalpindi, Pakistan. We Cover More Than 150 Areas in Rawalpindi and Islamabad. Same Day Delivery Within 3 Hours. Free Delivery on Orders Above Rs 1000.",
        display: "minimal-ui",
        developerURL: null, // prevent retrieving from the nearest package.json
        background: "#ddd",
        start_url: "/",
        theme_color: "#333",
        orientation: "portrait",
      },
    }),
    new webpack.EnvironmentPlugin({
      API_URI: "https://backend.erocery.com/graphql/",
      SERVICE_WORKER_TIMEOUT: "60000",
    }),
  ],
  node: {
    fs: "empty",
    module: "empty",
  },
});
