import * as basicHelpers from "../helpers/BasicHelpers";
import * as helpers from "../helpers/LinkedArtHelpers";
import * as objectHelpers from "../helpers/ObjectHelpers";
import photo from "../data/mocks/nga-70182.json";

describe("tests the NGA O'Keeffe record", () => {
  it("gets the title", () => {
    expect(helpers.getPrimaryName(photo)).toEqual("Line and Curve");
  });
  it("gets the accession #", () => {
    expect(objectHelpers.getAccessionNumbers(photo)).toEqual(["1987.58.6"]);
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
        begin_of_the_begin: "1927-01-01T00:00:00",
        end_of_the_end: "1927-12-31T00:00:00",
        id: "http://api.nga.gov/art/tms/objects/70182/produced_by/timespan",
        type: "TimeSpan",
      },
    ]);
  });
  it("gets the dimensions statement", () => {
    expect(
      objectHelpers.getDimensionsDescriptions(photo, {
        requestedClassifications: "http://vocab.getty.edu/aat/300266036",
      })
    ).toEqual([
      "overall: 81.2 x 41.2 cm (31 15/16 x 16 1/4 in.) framed: 83.8 x 43.2 x 3.5 cm (33 x 17 x 1 3/8 in.)",
    ]);
  });

  it("gets the rights statement", () => {
    expect(objectHelpers.getRightsStatements(photo)).toEqual(undefined);
  });
  it("gets the copyright statement", () => {
    expect(objectHelpers.getCopyrightStatements(photo)).toEqual(undefined);
  });
  it("gets the rights assertions", () => {
    expect(objectHelpers.getRightsAssertions(photo)).toEqual(undefined);
  });
  it("gets the digital image", () => {
    expect(objectHelpers.getDigitalImages(photo)).toEqual([]);
  });
  it("gets the culture", () => {
    expect(objectHelpers.getCultures(photo)).toEqual(undefined);
  });
  it("gets the descriptions", () => {
    expect(helpers.getDescriptions(photo)).toEqual([]);
  });
  it("gets the acknowledgements", () => {
    expect(objectHelpers.getAcknowledgementStatements(photo)).toEqual([
      "Alfred Stieglitz Collection, Bequest of Georgia O'Keeffe",
    ]);
  });
});
