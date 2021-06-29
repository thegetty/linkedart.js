import {
  classifiedAs,
  classifiedBy,
  getValueByClassification,
} from "./LinkedArtHelpers";
import * as helpers from "./LinkedArtHelpers";
import fables from "../data/mocks/f8fd6961-6da3-4c39-94ad-e8e9367fa51b.json";
import irises from "../data/mocks/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb";
import titan from "../data/mocks/dff75e58-f8b9-4507-8ab7-5d948451dea7.json";
import stagBeetle from "../data/mocks/a69d5696-70c2-56ed-9f82-fb2e69311e5d";

let aat = {
  PREFERRED_TERM: "http://vocab.getty.edu/aat/300404670",
  SEQUENCE_POSITION: "http://vocab.getty.edu/aat/300010269",
};

describe("classifiedAs", () => {
  const sampleData = {
    identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type",
          },
        ],
      },
    ],
    without_classified_id: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [{ _label: "preferred terms", type: "Type" }],
      },
    ],
    no_array_identified_by: {
      type: "Name",
      content: "Young Woman Picking Fruit",
      classified_as: [
        {
          id: "http://vocab.getty.edu/aat/300404670",
          _label: "preferred terms",
          type: "Type",
        },
      ],
    },
    multi_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type",
          },
          {
            id: "http://vocab.getty.edu/aat/300404671",
            _label: "mispreferred terms",
            type: "Type",
          },
        ],
      },
    ],
    two_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type",
          },
        ],
      },
      {
        type: "Name",
        content: "Young Women Plucking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type",
          },
        ],
      },
    ],
    only_one_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type",
          },
        ],
      },
      {
        type: "Name",
        content: "Young Women Plucking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404671",
            _label: "un-preferred terms",
            type: "Type",
          },
        ],
      },
    ],
    object_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: {
          id: "http://vocab.getty.edu/aat/300404670",
          _label: "preferred terms",
          type: "Type",
        },
      },
    ],
    string_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: "http://vocab.getty.edu/aat/300404670",
      },
    ],
    string_array_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: ["http://vocab.getty.edu/aat/300404670"],
      },
    ],
    no_classification_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
      },
    ],
    classified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_by: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type",
          },
        ],
      },
    ],
  };

  test("classifiedBy checks the other classification field", () => {
    let results = classifiedBy(
      sampleData.classified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("it works with arrays of resources", () => {
    const results = classifiedAs(
      sampleData.identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("It also works with single objects", () => {
    const results = classifiedAs(
      sampleData.no_array_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("processes valid data with multiple classifications", () => {
    const results = classifiedAs(
      sampleData.multi_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("returns all if there are multiple correct entries", () => {
    const results = classifiedAs(
      sampleData.two_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(2);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
    expect(results[1].content).toBe("Young Women Plucking Fruit");
  });

  test("only returns the correct one if there are multiples", () => {
    const results = classifiedAs(
      sampleData.only_one_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("returns an empty array with a missing classification", () => {
    const results = classifiedAs(
      sampleData.no_classification_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(0);
  });

  test("It also works with arrays of string classifications", () => {
    const results = classifiedAs(
      sampleData.string_array_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  // Appropriate values for no response
  test("It returns an empty array with an invalid classification", () => {
    const results = classifiedAs(
      sampleData.identified_by,
      "http://vocab.getty.edu/aat/not_an_id"
    );
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array with classifications without ids", () => {
    const results = classifiedAs(
      sampleData.identified_by,
      "http://vocab.getty.edu/aat/not_an_id"
    );
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array for missing data", () => {
    const results = classifiedAs(null, "http://vocab.getty.edu/aat/300404670");
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array for missing classifications", () => {
    const results = classifiedAs(sampleData.without_classified_id, null);
    expect(results).toHaveLength(0);
  });

  // Inposed constraints (not accepting strings or objects)
  test("It does not work with string classifications", () => {
    const results = classifiedAs(
      sampleData.string_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
  });

  test("It does not work with object classifications", () => {
    const results = classifiedAs(
      sampleData.object_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
  });
});
describe("getValueByClassification", () => {
  it("finds content", () => {
    const object = {
      identified_by: {
        content: "Rembrandt van Rijn",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
          },
        ],
      },
    };
    expect(
      getValueByClassification(object.identified_by, aat.PREFERRED_TERM)
    ).toEqual("Rembrandt van Rijn");
  });

  it("finds content", () => {
    const object = {
      identified_by: {
        value: 10,
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
          },
        ],
      },
    };
    expect(
      getValueByClassification(object.identified_by, aat.PREFERRED_TERM)
    ).toEqual(10);
  });
  it("finds value", () => {
    const list = [
      {
        id: "urn:uuid:2d1e607d-36ae-4006-9e2a-e2e96bd69318",
        type: "Dimension",
        value: 16,
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300010269",
            type: "Type",
            _label: "Sequence Position",
          },
        ],
        unit: {
          id: "http://vocab.getty.edu/aat/300055665",
          type: "MeasurementUnit",
          _label: "numbers",
        },
      },
    ];

    expect(getValueByClassification(list, aat.SEQUENCE_POSITION)).toEqual(16);
  });
  it("finds a value of 0", () => {
    const list = [
      {
        classified_as: [
          {
            _label: "camera bearing",
            id: "https://data.getty.edu/local/thesaurus/camera-bearing",
            type: "Type",
          },
        ],
        id:
          "https://data.getty.edu/research/collections/object/946d57fa-9318-4ac8-829d-2b81eb44db54/tile/d41a1d1c-4d74-4eea-83b3-048971a18674/node/ad36af84-a04c-11ea-bfdd-0a6344088a1e",
        type: "Dimension",
        unit: {
          _label: "degrees",
          id: "https://data.getty.edu/local/thesaurus/angle",
          type: "MeasurementUnit",
        },
        value: 0,
      },
    ];

    expect(
      getValueByClassification(
        list,
        "https://data.getty.edu/local/thesaurus/camera-bearing"
      )
    ).toEqual(0);
  });

  it("returns null if there is no submittedResource", () => {
    const object = {};
    expect(
      getValueByClassification(object.identified_by, aat.PREFERRED_TERM)
    ).toBe(undefined);
  });
  it("returns null if there is no requestedClassification", () => {
    const object = {
      identified_by: {
        _label: "Rembrandt van Rijn",
        classified_as: [
          {
            id: "not_preferred",
          },
        ],
      },
    };
    expect(
      getValueByClassification(object.identified_by, aat.PREFERRED_TERM)
    ).toBe(undefined);
  });
});

describe("get assigned", () => {
  it("tests undefined", () => {
    expect(helpers.getAssigned(undefined, "part_of")).toEqual([]);
  });
  it("tests value", () => {
    expect(helpers.getAssigned(titan.produced_by, "part_of").length).toEqual(2);
    expect(helpers.getAssigned(titan.produced_by, "part_of")[0].id).toEqual(
      "https://data.getty.edu/museum/collection/object/dff75e58-f8b9-4507-8ab7-5d948451dea7/production/previous-attribution/07ebbfca-985b-4a07-96ed-8cc7cf0c1ff1/production"
    );
  });
});

describe("get attributed", () => {
  it("tests undefined", () => {
    expect(helpers.getAttributed(undefined, "identified_by")).toEqual([]);
  });
  it("tests value", () => {
    expect(helpers.getAttributed(titan, "identified_by").length).toEqual(1);
    expect(helpers.getAttributed(titan, "identified_by")[0].content).toEqual(
      "Triton Blowing a Conch Shell"
    );
  });
});

describe("tests objectsByNestedClass", () => {
  it("gets expected object", () => {
    expect(
      helpers.objectsByNestedClass(
        stagBeetle.subject_to,
        "https://data.getty.edu/local/thesaurus/clearance-level"
      )
    ).toEqual(stagBeetle.subject_to);
  });
  it("gets objects from classified_by", () => {
    let resourceObject = JSON.parse(JSON.stringify(stagBeetle.subject_to[0]));
    // change all classifications to use classified_by instead of classified_as
    resourceObject["classified_as"].map((obj) => {
      obj["classified_by"] = obj["classified_as"];
      delete obj["classified_as"];
    });
    // move top level classifications from classified_as to classified_by
    resourceObject["classified_by"] = resourceObject["classified_as"];
    delete resourceObject["classified_as"];
    expect(
      helpers.objectsByNestedClass(
        resourceObject,
        "https://data.getty.edu/local/thesaurus/clearance-level",
        "classified_by"
      )
    ).toEqual([resourceObject]);
  });
  it("returns an empty array when nothing matches", () => {
    expect(helpers.objectsByNestedClass({}, "a_qualifier")).toEqual([]);
  });
});

describe("tests classificationsByNestedClass", () => {
  it("gets expected classification objects", () => {
    let clearanceLevelAs = [
      {
        _label: "DOWNLOAD",
        classified_as: [
          {
            _label: "local clearance level",
            id: "https://data.getty.edu/local/thesaurus/clearance-level",
            type: "Type",
          },
        ],
        id: "https://data.getty.edu/local/thesaurus/clearance/download",
        type: "Type",
      },
    ];
    expect(
      helpers.classificationsByNestedClass(
        stagBeetle.subject_to,
        "https://data.getty.edu/local/thesaurus/clearance-level"
      )
    ).toEqual(clearanceLevelAs);
  });
  it("gets classification objects from classified_by", () => {
    let clearanceLevelBy = [
      {
        _label: "DOWNLOAD",
        classified_by: [
          {
            _label: "local clearance level",
            id: "https://data.getty.edu/local/thesaurus/clearance-level",
            type: "Type",
          },
        ],
        id: "https://data.getty.edu/local/thesaurus/clearance/download",
        type: "Type",
      },
    ];
    let resourceObject = JSON.parse(JSON.stringify(stagBeetle.subject_to[0]));
    // change all classifications to use classified_by instead of classified_as
    resourceObject["classified_as"].map((obj) => {
      obj["classified_by"] = obj["classified_as"];
      delete obj["classified_as"];
    });
    // move top level classifications from classified_as to classified_by
    resourceObject["classified_by"] = resourceObject["classified_as"];
    delete resourceObject["classified_as"];
    expect(
      helpers.classificationsByNestedClass(
        resourceObject,
        "https://data.getty.edu/local/thesaurus/clearance-level",
        "classified_by"
      )
    ).toEqual(clearanceLevelBy);
  });
  it("returns an empty array when nothing matches", () => {
    expect(helpers.classificationsByNestedClass({}, "a_qualifier")).toEqual([]);
  });
});

describe("tests resourceByClassifications", () => {
  it("gets the expected resource with the AND operator", () => {
    expect(
      helpers.resourcesByClassifications(titan.referred_to_by, [
        "http://vocab.getty.edu/aat/300435430",
        "http://vocab.getty.edu/aat/300418049",
      ])
    ).toEqual([
      {
        _label: "Dimensions Statement",
        classified_as: [
          {
            _label: "Dimensions Description",
            id: "http://vocab.getty.edu/aat/300435430",
            type: "Type",
          },
          {
            _label: "Brief Text",
            id: "http://vocab.getty.edu/aat/300418049",
            type: "Type",
          },
        ],
        content: "40.6 × 24.1 cm (16 × 9 1/2 in.)",
        id:
          "https://data.getty.edu/museum/collection/object/dff75e58-f8b9-4507-8ab7-5d948451dea7/dimensions/790c8915-292e-4825-af8b-629dbfb59f8b",
        type: "LinguisticObject",
      },
    ]);
  });
  it("gets the expected resource with the OR operator", () => {
    expect(
      helpers.resourcesByClassifications(
        titan.referred_to_by,
        [
          "http://vocab.getty.edu/aat/300435430",
          "http://vocab.getty.edu/aat/300418049",
        ],
        undefined,
        undefined,
        undefined,
        "OR"
      ).length
    ).toEqual(7);
  });
  it("returns an empty array if no objects match AND", () => {
    expect(
      helpers.resourcesByClassifications(titan.identified_by, [
        "http://vocab.getty.edu/aat/300435430",
        "http://vocab.getty.edu/aat/300404670",
      ])
    ).toEqual([]);
  });
});

describe("tests getObjectParts", () => {
  it("returns an array of parts if available on an object", () => {
    const objectParts = helpers.getObjectParts(fables, "produced_by");
    expect(objectParts.length).toEqual(7);
    expect(objectParts[0].id).toEqual(
      "https://data.getty.edu/museum/collection/object/f8fd6961-6da3-4c39-94ad-e8e9367fa51b/production/1663467e-66d8-4170-91b0-2937ba6447e6"
    );
  });
  it("returns an array of just one part/the requested field if that is what is found", () => {
    const objectPart = helpers.getObjectParts(irises, "produced_by");
    expect(objectPart.length).toEqual(1);
    expect(objectPart[0].id).toEqual(
      "https://data.getty.edu/museum/collection/object/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb/production"
    );
  });
  it("returns an empty erray if no fields match", () => {
    const objectParts = helpers.getObjectParts({}, "produced_by");
    expect(objectParts).toEqual([]);
  });
});