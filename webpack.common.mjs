import CircularDependencyPlugin from "circular-dependency-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export const common = {
  target: 'web',
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve("./build"),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
      {
        test: /\.tsx$/i,
        use: ["ts-loader"]
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], //注意顺序
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|svg|jpe?g)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.mjs', ".js", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false
    })
  ],
};
