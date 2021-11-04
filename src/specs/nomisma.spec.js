import * as basicHelpers from "../helpers/BasicHelpers";
import * as helpers from "../helpers/LinkedArtHelpers";
import * as objectHelpers from "../helpers/ObjectHelpers";
import gold_coin from "../data/mocks/1944.100.51606.json";

describe("tests Basic and LinkedArt helpers using Nomisma data", () => {
  it("gets the title of the object", () => {
    expect(helpers.getPrimaryNames(gold_coin)[0]).toEqual(
      "Gold Coin of Philip III Arrhidaeus, Abydus, 323 BCE - 317 BCE. 1944.100.51606"
    );
  });

  it("gets the creator", () => {
    let creators = objectHelpers.getCarriedOutBy(gold_coin);
    expect(creators.length).toEqual(1);
    expect({ label: creators[0]._label, id: creators[0].id }).toEqual({
      id: "http://nomisma.org/id/philip_iii_arrhidaeus",
      label: "Philip III Arrhidaeus",
    });
  });
  it("gets the accession number of the object", () => {
    expect(objectHelpers.getAccessionNumbers(gold_coin)).toEqual([
      "1944.100.51606",
    ]);
  });

  it("gets the type (ids) of the object", () => {
    const classifiedAsType = helpers.getClassifiedAsWithClassification(
      gold_coin,
      "aat:300435443"
    );
    const typeIds = classifiedAsType.map((item) => {
      return item.id;
    });
    expect(typeIds).toEqual(["http://nomisma.org/id/stater", "aat:300037222"]);
  });
  it("gets the iiif image of one side", () => {
    const part = basicHelpers.normalizeFieldToArray(gold_coin, "part")[0];
    expect(objectHelpers.getDigitalImages(part)).toEqual([
      "http://numismatics.org/collectionimages/19001949/1944/1944.100.51606.obv.width350.jpg",
    ]);
  });
  it("gets the description of one side", () => {
    const part = basicHelpers.normalizeFieldToArray(gold_coin, "part")[0];
    expect(helpers.getDescriptions(part)).toEqual([
      "Head of Athena right wearing Corinthian helmet with crest",
    ]);
  });
  it("gets the iiif image of the object", () => {
    const part = basicHelpers.normalizeFieldToArray(gold_coin, "part");
    const frontObject = helpers.getClassifiedAs(part, "aat:300190703")[0];
    const representation = basicHelpers.normalizeFieldToArray(
      frontObject,
      "representation"
    );
    const digitalImageObject = helpers.getClassifiedAs(
      representation,
      "aat:300215302"
    )[0];
    expect(digitalImageObject.id).toEqual(
      "http://numismatics.org/collectionimages/19001949/1944/1944.100.51606.obv.width350.jpg"
    );
  });

  it("gets the work type(s) of the object", () => {
    expect(objectHelpers.getWorkTypes(gold_coin)[1].id).toEqual(
      "aat:300037222"
    );
  });

  it("returns [] if no classification(s) of the object", () => {
    expect(objectHelpers.getClassifications(gold_coin)).toEqual([]);
  });
});
