import { merge } from "webpack-merge";
import { common } from "./webpack.common.js";
import pkg from 'webpack';
const { CleanPlugin } = pkg;
export default merge(common, {
  mode: "production",
  plugins: [new CleanPlugin()],
});
