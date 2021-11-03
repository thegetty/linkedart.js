import * as basicHelpers from "../helpers/BasicHelpers";
import * as helpers from "../helpers/LinkedArtHelpers";
import * as objectHelpers from "../helpers/ObjectHelpers";
import photo from "../data/mocks/vam-e-902-2003.json";

describe("tests the VAM O'Keeffe record", () => {
  it("gets the title", () => {
    expect(helpers.getPrimaryName(photo)).toEqual("Georgia O'Keeffe");
  });
  it("gets the accession #", () => {
    expect(objectHelpers.getAccessionNumbers(photo)).toEqual(["E.902-2003"]);
  });
  it("gets the creators", () => {
    expect(objectHelpers.getCarriedOutBy(photo)).toEqual([
      {
        id: "https://data.vam.ac.uk/Actor/0",
        label: "photographer",
        type: "Actor",
      },
    ]);
  });
  it("gets the creation date", () => {
    expect(objectHelpers.getProductionTimespans(photo)).toEqual([]);
  });
  it("gets the dimensions statement", () => {
    expect(objectHelpers.getDimensionsDescriptions(photo)).toEqual(undefined);
  });
});
