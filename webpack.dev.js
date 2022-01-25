import { merge } from "webpack-merge";
import { common } from "./webpack.common.js";
export default merge(common, {
  mode: "development",
  devServer: {
    open: true,
    port: 9999,
    hot: true,
    historyApiFallback: true,

  },
});
