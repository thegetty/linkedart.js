import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import json from "eslint-plugin-json";
import globals from "globals";

export default [
  {
    files: ["**/*.json"],
    ...json.configs["recommended"],
    ...eslint.configs.recommended,
  },
  {
    ...eslint.configs.recommended,
    files: ["**/*.{ts,js,json,mjs}"],
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        root: "off",
        ...globals.jest,
        ...globals.node,
        ...globals.es2021,
        // ecmascriptVersion, and sourceType, default is right
      },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prettier/prettier": [
        "error",
        {
          usePrettierrc: true,
          singleAttributePerLine: false,
        },
      ],
    },
  },
];
