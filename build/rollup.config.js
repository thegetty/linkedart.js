import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "../package.json";
import { alias, babel, resolver } from "./plugins/index.js";

const external = [...Object.keys(pkg.dependencies)];

const globals = {};

/**
 * The Rollup config with the associated plugins, one for CJS, one for ES6
 */
export default [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
    ],
    external,
    plugins: [json(), commonjs(), alias, resolver, babel, terser()],
  },
  {
    input: "src/index.js",
    output: [
      {
        dir: "dist",
        preserveModules: true,
        format: "es",
      },
    ],
    external,
    plugins: [json(), commonjs(), alias, resolver, babel, terser()],
  },
];
