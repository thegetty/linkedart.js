/** @type {import('vite').UserConfig} */
/* eslint-disable no-unused-vars */
import { defineConfig } from "vite";
import { resolve } from "node:path";

import pkg from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.js"),
      name: pkg.name,
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
  esbuild: {
    // @see https://esbuild.github.io/api/#keep-names
    keepNames: true,
    // @see https://esbuild.github.io/api/#minify
    minifyIdentifiers: false,
  },
  plugins: [],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@data": resolve(__dirname, "./src/data"),
      "@mocks": resolve(__dirname, "./__mocks__"),
    },
  },
});
