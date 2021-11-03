import * as objectHelpers from "./ObjectHelpers";

import irises from "../data/mocks/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb.json";
import fables from "../data/mocks/f8fd6961-6da3-4c39-94ad-e8e9367fa51b.json";

describe("getDimensionsDescription", () => {
  it("gets the correct dimensions description if present", () => {
    expect(objectHelpers.getDimensionsDescriptions(irises)[0]).toEqual(
      "74.3 × 94.3 cm (29 1/4 × 37 1/8 in.)"
    );
  });
});

describe("getAccessionNumber", () => {
  it("gets the correct accession number if present", () => {
    expect(objectHelpers.getAccessionNumbers(irises)).toEqual(["90.PA.20"]);
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
});
