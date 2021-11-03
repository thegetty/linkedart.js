import * as basicHelpers from "../helpers/BasicHelpers";
import * as helpers from "../helpers/LinkedArtHelpers";
import * as objectHelpers from "../helpers/ObjectHelpers";
import photo from "../data/mocks/pma-49280.json";

describe("tests the PMA O'Keeffe record", () => {
  it("gets the title", () => {
    expect(helpers.getPrimaryName(photo)).toEqual("Peach and Glass");
  });
  it("gets the accession #", () => {
    expect(objectHelpers.getAccessionNumbers(photo)).toEqual(["1944-95-4"]);
  });
  it("gets the creators", () => {
    expect(objectHelpers.getCarriedOutBy(photo)).toEqual([
      {
        _label: "O'Keeffe, Georgia",
        id: "http://vocab.getty.edu/ulan/500018666",
        type: "Actor",
      },
    ]);
  });
  it("gets the creation date", () => {
    expect(objectHelpers.getProductionTimespans(photo)).toEqual([
      {
        _label: "1927",
        id: "https://data.philamuseum.org/work/49280/production/timespan",
        type: "TimeSpan",
      },
    ]);
  });
  it("gets the dimensions statement", () => {
    expect(objectHelpers.getDimensionsDescriptions(photo)).toEqual(undefined);
  });
});
