import {
  getClassifiedAs,
  getClassifiedBy,
  getValueByClassification,
  getValuesByClassification
} from "./LinkedArtHelpers";
import * as helpers from "./LinkedArtHelpers";
import fables from "../data/mocks/f8fd6961-6da3-4c39-94ad-e8e9367fa51b.json";
import irises from "../data/mocks/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb";
import titan from "../data/mocks/dff75e58-f8b9-4507-8ab7-5d948451dea7.json";
import stagBeetle from "../data/mocks/a69d5696-70c2-56ed-9f82-fb2e69311e5d";
import atticFragment from "../data/mocks/dd808888-4dfe-441c-b3d0-ce57c4167c5b";
import jpc from "../data/mocks/jpc.json";

let aat = {
  PREFERRED_TERM: "http://vocab.getty.edu/aat/300404670",
  SEQUENCE_POSITION: "http://vocab.getty.edu/aat/300010269"
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
            type: "Type"
          }
        ]
      }
    ],
    without_classified_id: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [{ _label: "preferred terms", type: "Type" }]
      }
    ],
    no_array_identified_by: {
      type: "Name",
      content: "Young Woman Picking Fruit",
      classified_as: [
        {
          id: "http://vocab.getty.edu/aat/300404670",
          _label: "preferred terms",
          type: "Type"
        }
      ]
    },
    multi_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type"
          },
          {
            id: "http://vocab.getty.edu/aat/300404671",
            _label: "mispreferred terms",
            type: "Type"
          }
        ]
      }
    ],
    two_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type"
          }
        ]
      },
      {
        type: "Name",
        content: "Young Women Plucking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type"
          }
        ]
      }
    ],
    only_one_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type"
          }
        ]
      },
      {
        type: "Name",
        content: "Young Women Plucking Fruit",
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404671",
            _label: "un-preferred terms",
            type: "Type"
          }
        ]
      }
    ],
    object_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: {
          id: "http://vocab.getty.edu/aat/300404670",
          _label: "preferred terms",
          type: "Type"
        }
      }
    ],
    string_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: "http://vocab.getty.edu/aat/300404670"
      }
    ],
    string_array_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_as: ["http://vocab.getty.edu/aat/300404670"]
      }
    ],
    no_classification_identified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit"
      }
    ],
    classified_by: [
      {
        type: "Name",
        content: "Young Woman Picking Fruit",
        classified_by: [
          {
            id: "http://vocab.getty.edu/aat/300404670",
            _label: "preferred terms",
            type: "Type"
          }
        ]
      }
    ]
  };

  test("classifiedBy checks the other classification field", () => {
    let results = getClassifiedBy(
      sampleData.classified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("it works with arrays of resources", () => {
    const results = getClassifiedAs(
      sampleData.identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("It also works with single objects", () => {
    const results = getClassifiedAs(
      sampleData.no_array_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("processes valid data with multiple classifications", () => {
    const results = getClassifiedAs(
      sampleData.multi_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("returns all if there are multiple correct entries", () => {
    const results = getClassifiedAs(
      sampleData.two_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(2);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
    expect(results[1].content).toBe("Young Women Plucking Fruit");
  });

  test("only returns the correct one if there are multiples", () => {
    const results = getClassifiedAs(
      sampleData.only_one_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  test("returns an empty array with a missing classification", () => {
    const results = getClassifiedAs(
      sampleData.no_classification_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(0);
  });

  test("It also works with arrays of string classifications", () => {
    const results = getClassifiedAs(
      sampleData.string_array_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].content).toBe("Young Woman Picking Fruit");
  });

  // Appropriate values for no response
  test("It returns an empty array with an invalid classification", () => {
    const results = getClassifiedAs(
      sampleData.identified_by,
      "http://vocab.getty.edu/aat/not_an_id"
    );
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array with classifications without ids", () => {
    const results = getClassifiedAs(
      sampleData.identified_by,
      "http://vocab.getty.edu/aat/not_an_id"
    );
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array for missing data", () => {
    const results = getClassifiedAs(
      null,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array for missing classifications", () => {
    const results = getClassifiedAs(sampleData.without_classified_id, null);
    expect(results).toHaveLength(0);
  });

  // Inposed constraints (not accepting strings or objects)
  test("It does not work with string classifications", () => {
    const results = getClassifiedAs(
      sampleData.string_identified_by,
      "http://vocab.getty.edu/aat/300404670"
    );
    expect(results).toHaveLength(1);
  });

  test("It does not work with object classifications", () => {
    const results = getClassifiedAs(
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
            id: "http://vocab.getty.edu/aat/300404670"
          }
        ]
      }
    };
    expect(
      getValueByClassification(object.identified_by, aat.PREFERRED_TERM)
    ).toEqual("Rembrandt van Rijn");
  });
  it("finds content with 'or'", () => {
    const object = {
      identified_by: [
        {
          content: "Rembrandt van Rijn",
          classified_as: [
            {
              id: "http://vocab.getty.edu/aat/300404670"
            }
          ]
        },
        {
          content: "Hilma af Klint",
          classified_as: [{ id: "http://local-thesaurus/primary-name" }]
        }
      ]
    };
    expect(
      getValuesByClassification(
        object.identified_by,
        [aat.PREFERRED_TERM, "http://local-thesaurus/primary-name"],
        { operator: "or" }
      )
    ).toEqual(["Rembrandt van Rijn", "Hilma af Klint"]);
  });
  it("finds no content with 'and'", () => {
    const object = {
      identified_by: [
        {
          content: "Rembrandt van Rijn",
          classified_as: [
            {
              id: "http://vocab.getty.edu/aat/300404670"
            }
          ]
        },
        {
          content: "Hilma af Klint",
          classified_as: [{ id: "http://local-thesaurus/primary-name" }]
        }
      ]
    };
    expect(
      getValuesByClassification(
        object.identified_by,
        [aat.PREFERRED_TERM, "http://local-thesaurus/primary-name"],
        { operator: "and" }
      )
    ).toEqual([]);
  });

  it("finds content", () => {
    const object = {
      identified_by: {
        value: 10,
        classified_as: [
          {
            id: "http://vocab.getty.edu/aat/300404670"
          }
        ]
      }
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
            _label: "Sequence Position"
          }
        ],
        unit: {
          id: "http://vocab.getty.edu/aat/300055665",
          type: "MeasurementUnit",
          _label: "numbers"
        }
      }
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
            type: "Type"
          }
        ],
        id: "https://data.getty.edu/research/collections/object/946d57fa-9318-4ac8-829d-2b81eb44db54/tile/d41a1d1c-4d74-4eea-83b3-048971a18674/node/ad36af84-a04c-11ea-bfdd-0a6344088a1e",
        type: "Dimension",
        unit: {
          _label: "degrees",
          id: "https://data.getty.edu/local/thesaurus/angle",
          type: "MeasurementUnit"
        },
        value: 0
      }
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
            id: "not_preferred"
          }
        ]
      }
    };
    expect(
      getValueByClassification(object.identified_by, aat.PREFERRED_TERM)
    ).toBe(undefined);
  });
});

describe("get assigned", () => {
  it("tests undefined", () => {
    expect(helpers.getAssignedBy(undefined, "part_of")).toEqual([]);
  });
  it("tests value", () => {
    expect(helpers.getAssignedBy(titan.produced_by, "part_of").length).toEqual(
      2
    );
    expect(helpers.getAssignedBy(titan.produced_by, "part_of")[0].id).toEqual(
      "https://data.getty.edu/museum/collection/object/dff75e58-f8b9-4507-8ab7-5d948451dea7/production/previous-attribution/07ebbfca-985b-4a07-96ed-8cc7cf0c1ff1/production"
    );
  });

  it("tests an undefined assignment", () => {
    let assigned = helpers.getAssignedBy(jpc);
    let values = getValuesByClassification(
      assigned,
      "http://vocab.getty.edu/aat/300192339"
    ).filter((el) => el != null)[0];
    expect(values).toEqual(8);
  });

  it("gets the previously attributed artist (single)", () => {
    expect(
      helpers.getAssignedBy(atticFragment.produced_by, "part_of")[0]
        .carried_out_by
    ).toEqual([
      {
        _label: "Unknown",
        id: "https://data.getty.edu/museum/collection/person/25936a78-da08-44b5-b237-9bed6da06204",
        type: "Person"
      }
    ]);
  });
});

describe("get attributed", () => {
  it("tests undefined", () => {
    expect(helpers.getAttributedBy(undefined, "identified_by")).toEqual([]);
  });
  it("tests value", () => {
    expect(helpers.getAttributedBy(titan, "identified_by").length).toEqual(1);
    expect(helpers.getAttributedBy(titan, "identified_by")[0].content).toEqual(
      "Triton Blowing a Conch Shell"
    );
  });
});

describe("tests getObjectsClassifiedAsWithClassification", () => {
  it("returns an empty array when passed undefined", () => {
    expect(
      helpers.getObjectsClassifiedAsWithClassification(
        undefined,
        "https://data.getty.edu/local/thesaurus/clearance-level"
      )
    ).toEqual([]);
  });
  it("gets expected object", () => {
    expect(
      helpers.getObjectsClassifiedAsWithClassification(
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
      helpers.getObjectsClassifiedByWithClassification(
        resourceObject,
        "https://data.getty.edu/local/thesaurus/clearance-level",
        "classified_by"
      )
    ).toEqual([resourceObject]);
  });
  it("returns an empty array when nothing matches", () => {
    expect(
      helpers.getObjectsClassifiedAsWithClassification({}, "a_qualifier")
    ).toEqual([]);
  });
});

describe("tests getClassifiedAsWithClassification", () => {
  it("gets expected classification objects", () => {
    let clearanceLevelAs = [
      {
        _label: "DOWNLOAD",
        classified_as: [
          {
            _label: "local clearance level",
            id: "https://data.getty.edu/local/thesaurus/clearance-level",
            type: "Type"
          }
        ],
        id: "https://data.getty.edu/local/thesaurus/clearance/download",
        type: "Type"
      }
    ];
    expect(
      helpers.getClassifiedAsWithClassification(
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
            type: "Type"
          }
        ],
        id: "https://data.getty.edu/local/thesaurus/clearance/download",
        type: "Type"
      }
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
      helpers.getClassifiedByWithClassification(
        resourceObject,
        "https://data.getty.edu/local/thesaurus/clearance-level"
      )
    ).toEqual(clearanceLevelBy);
  });
  it("returns an empty array when nothing matches", () => {
    expect(
      helpers.getClassifiedAsWithClassification({}, "a_qualifier")
    ).toEqual([]);
  });
  it("returns an empty array when passed undefined", () => {
    expect(
      helpers.getClassifiedAsWithClassification(undefined, "a_qualifier")
    ).toEqual([]);
  });
});

describe("tests resourceByClassifications", () => {
  it("gets the expected resource with the AND operator", () => {
    expect(
      helpers.getClassified(titan.referred_to_by, [
        "http://vocab.getty.edu/aat/300435430",
        "http://vocab.getty.edu/aat/300418049"
      ])
    ).toEqual([
      {
        _label: "Dimensions Statement",
        classified_as: [
          {
            _label: "Dimensions Description",
            id: "http://vocab.getty.edu/aat/300435430",
            type: "Type"
          },
          {
            _label: "Brief Text",
            id: "http://vocab.getty.edu/aat/300418049",
            type: "Type"
          }
        ],
        content: "40.6 × 24.1 cm (16 × 9 1/2 in.)",
        id: "https://data.getty.edu/museum/collection/object/dff75e58-f8b9-4507-8ab7-5d948451dea7/dimensions/790c8915-292e-4825-af8b-629dbfb59f8b",
        type: "LinguisticObject"
      }
    ]);
  });
  it("gets the expected resource with the OR operator", () => {
    expect(
      helpers.getClassified(
        titan.referred_to_by,
        [
          "http://vocab.getty.edu/aat/300435430",
          "http://vocab.getty.edu/aat/300418049"
        ],
        { operator: "OR" }
      ).length
    ).toEqual(7);
  });
  it("gets the expected values with the OR operator", () => {
    expect(
      helpers.getValuesByClassification(
        titan.referred_to_by,
        [
          "http://vocab.getty.edu/aat/300435430",
          "http://vocab.getty.edu/aat/300418049"
        ],
        { operator: "OR" }
      )
    ).toEqual([
      "The J. Paul Getty Museum, Los Angeles",
      "Italian",
      "<p>A nude triton displays his rippling, muscular figure as he turns to blow a conch shell announcing a special event. His powerful sculptural form and sense of monumentality derive from ancient Roman sculpture and Renaissance art, especially Michelangelo's Sistine Chapel <i>ignudi</i>, while the use of black and white chalks on blue-gray paper reflects Annibale Carracci's interest in Venetian art of the 1500s.</p><p>Annibale made this drawing as a study for a triton for Agostino Carracci’s fresco, <i>Thetis Borne to the Wedding Chamber of Peleus</i>, also known as Galatea. The Carracci brothers began work on the decoration of the Galleria Farnese in Rome, including this fresco, in 1597. For centuries, this cycle of paintings influenced artists as much as Michelangelo's Sistine ceiling.</p><p>Beginning with drawing from life and understanding anatomy, the Carracci focused on painting the human figure. Their drawings of the nude maintained monumental proportions while broadly sketching the body's essential structure; combining robust energy with soft, rhythmic contours.</p><p>The fragment of an arm on the verso of this drawing was trimmed from a study of a triton now in the Metropolitan Museum of Art, proving that this sheet was once part of a larger one.</p>",
      "40.6 × 24.1 cm (16 × 9 1/2 in.)",
      "Black and white chalk (recto); black chalk (verso) on blue paper",
      "Drawing",
      "No Copyright - United States"
    ]);
  });
  it("returns an empty array if no objects match AND", () => {
    expect(
      helpers.getClassified(titan.identified_by, [
        "http://vocab.getty.edu/aat/300435430",
        "http://vocab.getty.edu/aat/300404670"
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

describe("tests getValuesByClassification", () => {
  it("returns undefined if submittedResource doesn't contain classification", () => {
    expect(
      helpers.getValuesByClassification(
        {},
        "http://vocab.getty.edu/aat/300435430"
      )
    ).toEqual([]);
  });
  it("returns all values that match classification", () => {
    let result = helpers.getValuesByClassification(
      titan.referred_to_by,
      "http://vocab.getty.edu/aat/300418049"
    );
    expect(result).toHaveLength(7);
    expect(result[0]).toEqual("The J. Paul Getty Museum, Los Angeles");
  });
  it("excludes 'values' that match classification, but are undefined", () => {
    let mockValuesArray = [
      {
        classified_as: [{ id: "http://vocab.getty.edu/aat/300418049" }],
        content: "test"
      },
      { classified_as: [{ id: "http://vocab.getty.edu/aat/300418049" }] }
    ];
    expect(
      helpers.getValuesByClassification(
        mockValuesArray,
        "http://vocab.getty.edu/aat/300418049"
      )
    ).toEqual(["test"]);
  });
});

describe("tests getReferredToByClassification", () => {
  it("returns undefined when passed undefined", () => {
    expect(
      helpers.getReferredToByClassification(
        undefined,
        "http://vocab.getty.edu/aat/300055768"
      )
    ).toEqual(undefined);
  });
  it("returns undefined when object has no referred_to_by", () => {
    expect(
      helpers.getReferredToByClassification(
        {},
        "http://vocab.getty.edu/aat/300055768"
      )
    ).toEqual(undefined);
  });
  it("returns the expected value", () => {
    expect(
      helpers.getReferredToByClassification(
        titan,
        "http://vocab.getty.edu/aat/300055768"
      )
    ).toEqual("Italian");
  });
});

describe("removeDuplicatesById", () => {
  it("returns a list with objects of duplicate ids removed", () => {
    const sellers = [
      {
        id: "urn:uuid:1475464c-752a-46b9-bfbe-0ab93a7ee921",
        type: "Group",
        _label: "Grand Central Art Galleries"
      },
      {
        id: "urn:uuid:1475464c-752a-46b9-bfbe-0ab93a7ee921",
        type: "Group",
        _label: "Grand Central Art Galleries"
      }
    ];

    expect(helpers.removeDuplicatesById(sellers)).toEqual([
      {
        id: "urn:uuid:1475464c-752a-46b9-bfbe-0ab93a7ee921",
        type: "Group",
        _label: "Grand Central Art Galleries"
      }
    ]);
  });
});
