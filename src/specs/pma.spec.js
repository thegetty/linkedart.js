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
    expect(objectHelpers.getDimensionsDescriptions(photo)).toEqual([]);
  });
  it("gets the material statement(s)", () => {
    expect(
      objectHelpers.getMaterialStatements(photo, {
        requestedClassifications: "http://vocab.getty.edu/aat/300010358",
      })
    ).toEqual(["Oil on canvas"]);
  });
  it("gets the rights statement", () => {
    expect(objectHelpers.getRightsStatements(photo)).toEqual([]);
  });
  it("gets the copyright statement", () => {
    expect(objectHelpers.getCopyrightStatements(photo)).toEqual([]);
  });
  it("gets the rights assertions", () => {
    expect(objectHelpers.getRightsAssertions(photo)).toEqual([]);
  });
  it("gets the digital image", () => {
    expect(objectHelpers.getDigitalImages(photo)).toEqual([
      "https://philamuseum.org/images/cad/zoomers/1944-95-4.jpg",
    ]);
  });
  it("gets the culture", () => {
    expect(objectHelpers.getCultures(photo)).toEqual([]);
  });
  it("gets the descriptions", () => {
    expect(helpers.getDescriptions(photo)).toEqual([]);
  });
  it("gets the acknowledgements", () => {
    expect(objectHelpers.getAcknowledgementStatements(photo)).toEqual([
      "Gift of Dr. Herman Lorber, 1944",
    ]);
  });
});
