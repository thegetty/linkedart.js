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
        type: "Actor"
      }
    ]);
  });
  it("gets the creation date", () => {
    expect(objectHelpers.getProductionTimespans(photo)).toEqual([]);
  });
  it("gets the dimensions statement", () => {
    expect(objectHelpers.getDimensionsDescriptions(photo)).toEqual([]);
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
      "http://media.vam.ac.uk/media/thira/collection_images/2006BB/2006BB4563.jpg",
      "http://media.vam.ac.uk/media/thira/collection_images/2006AF/2006AF5252.jpg"
    ]);
  });
  it("gets the culture", () => {
    expect(objectHelpers.getCultures(photo)).toEqual([]);
  });
  it("gets the acknowledgements", () => {
    expect(objectHelpers.getAcknowledgementStatements(photo)).toEqual([
      "Gift of the Georgia O'Keeffe Foundation"
    ]);
  });
  it("gets the descriptions", () => {
    expect(
      helpers
        .getDescriptions(photo)[0]
        .startsWith(
          "Alfred Stieglitz (1864-1946) was a pioneer of modern photography"
        )
    ).toBe(true);
  });
  it("gets the material statement(s)", () => {
    expect(
      objectHelpers.getMaterialStatements(photo, {
        requestedClassifications: "http://vocab.getty.edu/aat/300010358"
      })
    ).toEqual(["Gelatin-silver print"]);
  });
});
