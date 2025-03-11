import { defineConfig, configDefaults } from "vitest/config";
import { mergeConfig } from "vite";
import viteConfig from "./vite.config.mjs";

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      environment: "jsdom",
      globals: true,
      outputDiffLines: 5000,
      outputDiffMaxLines: 40000,
      outputDiffMaxSize: 50000,
      outputTruncateLength: 50000,
      exclude: [...configDefaults.exclude],
    },
  }),
);
