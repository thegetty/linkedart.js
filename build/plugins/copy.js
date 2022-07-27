import copy from "rollup-plugin-copy";

export const copyPlugin = copy({
  targets: [
    { src: "src/data/aat.json", dest: "constants/" },
    { src: "src/data/constants.json", dest: "constants/" },
  ],
});
