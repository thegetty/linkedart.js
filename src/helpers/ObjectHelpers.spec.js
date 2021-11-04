import * as objectHelpers from "./ObjectHelpers";

import irises from "../data/mocks/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb.json";
import beetle from "../data/mocks/a69d5696-70c2-56ed-9f82-fb2e69311e5d.json";
import fables from "../data/mocks/f8fd6961-6da3-4c39-94ad-e8e9367fa51b.json";
import kasten from "../data/mocks/1cd16038-091e-4010-ae07-df95acfce9a4.json";
import triton from "../data/mocks/dff75e58-f8b9-4507-8ab7-5d948451dea7";

describe("getDimensionsDescription", () => {
  it("gets the correct dimensions description if present", () => {
    expect(objectHelpers.getDimensionsDescriptions(irises)[0]).toEqual(
      "74.3 × 94.3 cm (29 1/4 × 37 1/8 in.)"
    );
  });
});

describe("getAccessionNumbers", () => {
  it("gets the correct accession number if present", () => {
    expect(objectHelpers.getAccessionNumbers(irises)).toEqual(["90.PA.20"]);
  });
});

describe("getDigitalImages", () => {
  it("gets the correct image urls if present", () => {
    expect(objectHelpers.getDigitalImages(irises)[0]).toEqual(
      "https://media.getty.edu/iiif/image/e5d29650-11f8-4897-9540-54a9dd65b04f/full/full/0/default.jpg"
    );
  });
});

describe("getRightsStatements", () => {
  it("gets the correct right statement if present", () => {
    expect(objectHelpers.getRightsStatements(irises)).toEqual([
      "No Copyright - United States",
    ]);
  });
});

describe("getCopyrightStatements", () => {
  it("return empty array if no copyright", () => {
    expect(objectHelpers.getCopyrightStatements(kasten)).toEqual([
      "© Barbara Kasten",
    ]);
  });
});

describe("getRightsAssertions", () => {
  it("gets the correct rightsAssertions if present", () => {
    expect(objectHelpers.getRightsAssertions(beetle)[0]).toEqual(
      "https://rightsstatements.org/vocab/NoC-US/1.0/"
    );
  });
});

describe("getAcknowledgements", () => {
  it("gets the correct acknowledgements if present", () => {
    expect(objectHelpers.getAcknowledgementStatements(triton)).toEqual([]);
  });
});

describe("get creators", () => {
  it("gets the creator", () => {
    let creators = objectHelpers.getCarriedOutBy(fables);
    let filtered = [];
    creators.forEach((creator) =>
      filtered.push({
        label: creator._label,
        id: creator.id,
      })
    );
    expect(filtered.length).toEqual(7);

    expect(filtered).toEqual([
      {
        id: "https://data.getty.edu/museum/collection/object/f8fd6961-6da3-4c39-94ad-e8e9367fa51b/production/1663467e-66d8-4170-91b0-2937ba6447e6/unknown-maker",
        label: "Unknown",
      },
      {
        id: "https://data.getty.edu/museum/collection/person/4f6f0d33-2646-4410-93fa-d0ecadf8852a",
        label: "Aesop",
      },
      {
        id: "https://data.getty.edu/museum/collection/person/d7433a2b-feae-4cb8-a5e0-ec14fe1ef308",
        label: "Pope Clement V",
      },
      {
        id: "https://data.getty.edu/museum/collection/person/8bf6aab8-b8f6-416b-b924-7c0020a792f5",
        label: "Avianus",
      },
      {
        id: "https://data.getty.edu/museum/collection/person/c60ea30a-5d9a-4128-abad-ff3714ab8bc5",
        label: "Richard Fitzralph",
      },
      {
        id: "https://data.getty.edu/museum/collection/person/c98e9cea-c658-4a47-b054-df28d11471a1",
        label: "John Mandeville",
      },
      {
        id: "https://data.getty.edu/museum/collection/person/09a22d6e-a6bd-4f22-9062-814328759bee",
        label: "Berengarius Fredoli",
      },
    ]);
  });
});

describe("getCultures", () => {
  it("gets the correct culture(s) if present", () => {
    expect(objectHelpers.getCultures(irises)).toEqual(["Dutch"]);
  });
});

describe("getMaterialStatements", () => {
  it("gets the correct material(s) description if present", () => {
    expect(objectHelpers.getMaterialStatements(irises)).toEqual([
      "Oil on canvas",
    ]);
  });
});

describe("get production information", () => {
  it("gets a single production timespan(s)", () => {
    expect(objectHelpers.getProductionTimespans(irises)).toEqual([
      {
        begin_of_the_begin: "1889-01-01T00:00:00",
        end_of_the_end: "1889-12-31T23:59:59",
        id: "https://data.getty.edu/museum/collection/object/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb/production/timespan",
        identified_by: [
          {
            _label: "Date",
            content: "1889",
            id: "https://data.getty.edu/museum/collection/object/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb/production/timespan/name",
            type: "Name",
          },
        ],
        type: "TimeSpan",
      },
    ]);
  });
  it("gets the timespan(s) in a case where there are multiple productions (in this case, still just one)", () => {
    expect(objectHelpers.getProductionTimespans(fables)).toEqual([
      {
        begin_of_the_begin: "1450-01-01T00:00:00",
        end_of_the_end: "1475-12-31T23:59:59",
        id: "https://data.getty.edu/museum/collection/object/f8fd6961-6da3-4c39-94ad-e8e9367fa51b/production/timespan",
        identified_by: [
          {
            _label: "Date",
            content: "third quarter of 15th century",
            id: "https://data.getty.edu/museum/collection/object/f8fd6961-6da3-4c39-94ad-e8e9367fa51b/production/timespan/name",
            type: "Name",
          },
        ],
        type: "TimeSpan",
      },
    ]);
  });

  it("returns []] if no work type(s)", () => {
    expect(objectHelpers.getWorkTypes(beetle)).toEqual([]);
  });

  it("get the classification(s)", () => {
    expect(objectHelpers.getClassifications(irises)[0].id).toEqual(
      "http://vocab.getty.edu/aat/300033618"
    );
  });
  it("returns [] if no classification(s)", () => {
    expect(objectHelpers.getClassifications(beetle)).toEqual([]);
  });
});
