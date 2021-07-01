import * as basicHelpers from "../helpers/BasicHelpers";
import * as helpers from "../helpers/LinkedArtHelpers";
import photo from "../data/mocks/6401.json";

describe("tests Basic and LinkedArt helpers using O'Keeffe data", () => {
  it("gets the title of the object", () => {
    const identifiedBy = basicHelpers.normalizeFieldToArray(
      photo,
      "identified_by"
    );
    const preferredTerms = helpers.getClassifiedAs(
      identifiedBy,
      "aat:300404670"
    );
    const name = preferredTerms.filter((x) => {
      if (x.type == "Name") {
        return x;
      }
    });
    expect(name[0].value).toEqual("Abiquiu House, Ladder Against Studio Wall");
  });

  it("gets the creator of the object", () => {
    const creatorNames = [];
    const producedBy = photo["produced_by"];
    const consistsOf = basicHelpers.normalizeFieldToArray(
      producedBy,
      "consists_of"
    );
    consistsOf.forEach((item) => {
      const carriedOutBy = basicHelpers.normalizeFieldToArray(
        item,
        "carried_out_by"
      );
      const identifiedBy = basicHelpers.normalizeFieldToArray(
        carriedOutBy[0],
        "identified_by"
      );
      const name = helpers.getValueByClassification(
        identifiedBy,
        "aat:300404670"
      );
      creatorNames.push(name);
    });
    expect(creatorNames).toEqual(["Georgia O'Keeffe"]);
  });

  it("gets the accession number of the object", () => {
    const identifiedBy = basicHelpers.normalizeFieldToArray(
      photo,
      "identified_by"
    );
    const title = helpers.getValueByClassification(
      identifiedBy,
      "aat:300312355"
    );
    expect(title).toEqual("2006.6.1421");
  });

  it("gets the type (ids) of the object", () => {
    const classifiedAsType = basicHelpers.normalizeFieldToArray(
      photo,
      "classified_as"
    );
    const typeIds = classifiedAsType.map((item) => {
      return item.id;
    });
    expect(typeIds).toEqual(["aat:300133025", "aat:300046300"]);
  });

  it("gets the iiif manifest of the object", () => {
    const representation = basicHelpers.normalizeFieldToArray(
      photo,
      "representation"
    );
    let visualItemObjects = representation.filter((x) => {
      if (x.type == "VisualItem") {
        return x;
      }
    });
    const manifests = visualItemObjects.map((item) => {
      return item.id;
    });
    expect(manifests[0]).toEqual(
      "https://iiif.okeeffemuseum.org/image/iiif/2/732891"
    );
  });
});
