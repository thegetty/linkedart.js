import * as objectHelpers from "./ObjectHelpers";

import irises from "../data/mocks/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb.json";

describe("getDimensionsDescription", () => {
  it("gets the correct dimensions description if present", () => {
    expect(objectHelpers.getDimensionsDescription(irises)).toEqual(
      "74.3 × 94.3 cm (29 1/4 × 37 1/8 in.)"
    );
  });
});

describe("getAccessionNumber", () => {
  it("gets the correct accession number= if present", () => {
    expect(objectHelpers.getAccessionNumbers(irises)).toEqual("90.PA.20");
  });
});
