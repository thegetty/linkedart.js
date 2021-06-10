/**
 * Configure Babel
 */
import { default as babelPlugin } from "@rollup/plugin-babel";

export const babel = babelPlugin({
  exclude: "./node_modules/**",
  extensions: [".js"],
  babelHelpers: "bundled",
});
