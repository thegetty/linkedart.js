import * as basicHelpers from "../helpers/BasicHelpers";
import * as helpers from "../helpers/LinkedArtHelpers";
import gold_coin from "../data/mocks/1944.100.51606.json";

describe("tests Basic and LinkedArt helpers using Nomisma data", () => {
  it("gets the title of the object", () => {
    const identifiedBy = basicHelpers.checkEmptyField(
      gold_coin,
      "identified_by"
    );
    const title = helpers.getValueByClassification(
      identifiedBy,
      "aat:300404670"
    );
    expect(title).toEqual(
      "Gold Coin of Philip III Arrhidaeus, Abydus, 323 BCE - 317 BCE. 1944.100.51606"
    );
  });

  it("gets the accession number of the object", () => {
    const identifiedBy = basicHelpers.checkEmptyField(
      gold_coin,
      "identified_by"
    );
    const title = helpers.getValueByClassification(
      identifiedBy,
      "aat:300312355"
    );
    expect(title).toEqual("1944.100.51606");
  });

  it("gets the type (ids) of the object", () => {
    const classifiedAsType = helpers.classificationsByNestedClass(
      gold_coin,
      "aat:300435443"
    );
    const typeIds = classifiedAsType.map((item) => {
      return item.id;
    });
    expect(typeIds).toEqual(["http://nomisma.org/id/stater", "aat:300037222"]);
  });

  it("gets the iiif image of the object", () => {
    const part = basicHelpers.checkEmptyField(gold_coin, "part");
    const frontObject = helpers.classifiedAs(part, "aat:300190703")[0];
    const representation = basicHelpers.checkEmptyField(
      frontObject,
      "representation"
    );
    const digitalImageObject = helpers.classifiedAs(
      representation,
      "aat:300215302"
    )[0];
    expect(digitalImageObject.id).toEqual(
      "http://numismatics.org/collectionimages/19001949/1944/1944.100.51606.obv.width350.jpg"
    );
  });
});
