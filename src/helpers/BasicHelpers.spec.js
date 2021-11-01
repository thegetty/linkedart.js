import * as basicHelpers from "./BasicHelpers";
describe("normalizeFieldToArray", () => {
  it("tests check emptyArray with undefined", () => {
    expect(basicHelpers.normalizeFieldToArray(undefined, undefined)).toEqual(
      []
    );
  });
  it("tests check emptyArray with undefined object and key", () => {
    expect(basicHelpers.normalizeFieldToArray(undefined, "test")).toEqual([]);
  });
  it("tests check emptyArray with string as object", () => {
    expect(basicHelpers.normalizeFieldToArray("test", "test")).toEqual([]);
  });
  it("tests check emptyArray with empty object", () => {
    expect(basicHelpers.normalizeFieldToArray({}, "test")).toEqual([]);
  });
  it("tests check emptyArray with  undefined object", () => {
    expect(
      basicHelpers.normalizeFieldToArray({ test: undefined }, "test")
    ).toEqual([]);
  });
  it("tests check emptyArray with empty array", () => {
    expect(basicHelpers.normalizeFieldToArray({ test: [] }, "test")).toEqual(
      []
    );
  });
  it("tests check emptyArray with actual array", () => {
    expect(basicHelpers.normalizeFieldToArray({ test: ["a"] }, "test")).toEqual(
      ["a"]
    );
  });
});

describe("normalizeFieldToArray", () => {
  it("tests check normalizeFieldToArray with undefined", () => {
    expect(basicHelpers.normalizeFieldToArray(undefined, undefined)).toEqual(
      []
    );
  });
  it("tests check normalizeFieldToArray with undefined object and key", () => {
    expect(basicHelpers.normalizeFieldToArray(undefined, "test")).toEqual([]);
  });
  it("tests check normalizeFieldToArray with string as object", () => {
    expect(basicHelpers.normalizeFieldToArray("test", "test")).toEqual([]);
  });
  it("tests check normalizeFieldToArray with empty object", () => {
    expect(basicHelpers.normalizeFieldToArray({}, "test")).toEqual([]);
  });
  it("tests check normalizeFieldToArray with  undefined object", () => {
    expect(
      basicHelpers.normalizeFieldToArray({ test: undefined }, "test")
    ).toEqual([]);
  });
  it("tests check normalizeFieldToArray with a string", () => {
    expect(
      basicHelpers.normalizeFieldToArray({ test: "test" }, "test")
    ).toEqual(["test"]);
  });
  it("tests check normalizeFieldToArray with a number", () => {
    expect(basicHelpers.normalizeFieldToArray({ test: 42 }, "test")).toEqual([
      42,
    ]);
  });
  it("tests check normalizeFieldToArray with an object", () => {
    expect(
      basicHelpers.normalizeFieldToArray({ test: { a: "b" } }, "test")
    ).toEqual([{ a: "b" }]);
  });
  it("tests check normalizeFieldToArray with empty array", () => {
    expect(basicHelpers.normalizeFieldToArray({ test: [] }, "test")).toEqual(
      []
    );
  });
  it("tests check normalizeFieldToArray with actual array", () => {
    expect(basicHelpers.normalizeFieldToArray({ test: ["a"] }, "test")).toEqual(
      ["a"]
    );
  });
});
