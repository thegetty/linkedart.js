import * as objectHelpers from "./ObjectHelpers";

import irises from "../data/mocks/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb.json";
import beetle from "../data/mocks/a69d5696-70c2-56ed-9f82-fb2e69311e5d.json";

describe("getDimensionsDescription", () => {
  it("gets the correct dimensions description if present", () => {
    expect(objectHelpers.getDimensionsDescription(irises)).toEqual(
      "74.3 × 94.3 cm (29 1/4 × 37 1/8 in.)"
    );
  });
});

describe("getAccessionNumbers", () => {
  it("gets the correct accession number if present", () => {
    expect(objectHelpers.getAccessionNumbers(irises)).toEqual(["90.PA.20"]);
  });
});

describe("getRightsStatements", () => {
  it("gets the correct right statement if present", () => {
    expect(objectHelpers.getRightsStatements(irises)[0].id).toEqual(
      "https://rightsstatements.org/vocab/NoC-US/1.0/"
    );
  });
});

describe("getCopyright", () => {
  it("return empty array if no copyright", () => {
    expect(objectHelpers.getCopyright(irises)).toEqual([]);
  });
});

describe("getRightsAssertions", () => {
  it("gets the correct rightsAssertions if present", () => {
    expect(objectHelpers.getRightsAssertions(beetle)[0]).toEqual(
      "https://rightsstatements.org/vocab/NoC-US/1.0/"
    );
  });
});
