import * as basicHelpers from "./BasicHelpers";
describe("checkEmptyArray", () => {
  it("tests check emptyArray with undefined", () => {
    expect(basicHelpers.checkEmptyArray(undefined, undefined)).toEqual([]);
  });
  it("tests check emptyArray with undefined object and key", () => {
    expect(basicHelpers.checkEmptyArray(undefined, "test")).toEqual([]);
  });
  it("tests check emptyArray with string as object", () => {
    expect(basicHelpers.checkEmptyArray("test", "test")).toEqual([]);
  });
  it("tests check emptyArray with empty object", () => {
    expect(basicHelpers.checkEmptyArray({}, "test")).toEqual([]);
  });
  it("tests check emptyArray with  undefined object", () => {
    expect(basicHelpers.checkEmptyArray({ test: undefined }, "test")).toEqual(
      []
    );
  });
  it("tests check emptyArray with empty array", () => {
    expect(basicHelpers.checkEmptyArray({ test: [] }, "test")).toEqual([]);
  });
  it("tests check emptyArray with actual array", () => {
    expect(basicHelpers.checkEmptyArray({ test: ["a"] }, "test")).toEqual([
      "a",
    ]);
  });
});

describe("checkEmptyField", () => {
  it("tests check checkEmptyField with undefined", () => {
    expect(basicHelpers.checkEmptyField(undefined, undefined)).toEqual([]);
  });
  it("tests check checkEmptyField with undefined object and key", () => {
    expect(basicHelpers.checkEmptyField(undefined, "test")).toEqual([]);
  });
  it("tests check checkEmptyField with string as object", () => {
    expect(basicHelpers.checkEmptyField("test", "test")).toEqual([]);
  });
  it("tests check checkEmptyField with empty object", () => {
    expect(basicHelpers.checkEmptyField({}, "test")).toEqual([]);
  });
  it("tests check checkEmptyField with  undefined object", () => {
    expect(basicHelpers.checkEmptyField({ test: undefined }, "test")).toEqual(
      []
    );
  });
  it("tests check checkEmptyField with a string", () => {
    expect(basicHelpers.checkEmptyField({ test: "test" }, "test")).toEqual([
      "test",
    ]);
  });
  it("tests check checkEmptyField with a number", () => {
    expect(basicHelpers.checkEmptyField({ test: 42 }, "test")).toEqual([42]);
  });
  it("tests check checkEmptyField with an object", () => {
    expect(basicHelpers.checkEmptyField({ test: { a: "b" } }, "test")).toEqual([
      { a: "b" },
    ]);
  });
  it("tests check checkEmptyField with empty array", () => {
    expect(basicHelpers.checkEmptyField({ test: [] }, "test")).toEqual([]);
  });
  it("tests check checkEmptyField with actual array", () => {
    expect(basicHelpers.checkEmptyField({ test: ["a"] }, "test")).toEqual([
      "a",
    ]);
  });
});
