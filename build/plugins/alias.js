/**
 * Define Application aliases
 */
import path from "path";
import { default as aliasPlugin } from "@rollup/plugin-alias";
import { resolver as customResolver } from "./resolver";

const root = path.join(process.cwd(), "src");
const aliasesList = [
  ["~helpers", path.resolve(root, "src/helpers")],
  ["~data", path.resolve(root, "src/data")],
];

export const alias = aliasPlugin({
  entries: [
    ...aliasesList.map(([find, replacement]) => ({ find, replacement })),
  ],
  customResolver,
});
