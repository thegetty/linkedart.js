/**
 * Configure the Rollup node resolver
 */
import path from "path";
import resolve from "@rollup/plugin-node-resolve";

export const resolver = resolve({
  extensions: [".js"],
  rootDir: path.join(process.cwd(), "src"),
  moduleDirectories: ["node_modules", "src"],
});
