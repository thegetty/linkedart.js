import * as helpers from "../helpers/LinkedArtHelpers";
import * as objectHelpers from "../helpers/ObjectHelpers";
import photo from "../data/mocks/yale-644445c1-f91f-449e-b5f6-08647ee0c38f.json";
import * as constants from "../data/constants.json";

describe("tests the yale record", () => {
  it("gets the title", () => {
    expect(
      helpers.getPrimaryName(photo, {
        requestedClassifications:
          "https://lux-front-tst.collections.yale.edu/data/concept/04468525-e6f3-4aae-9d04-a1cca6b4a2d8",
      })
    ).toEqual("Torosaurus latus");
  });
  it("gets the accession #", () => {
    expect(
      objectHelpers.getAccessionNumbers(photo, {
        requestedClassifications:
          "https://lux-front-tst.collections.yale.edu/data/concept/5020b403-c0cd-400e-b9f9-63aae5f360af",
      })
    ).toEqual([
      "VP.001830",
      "YPM VP 001830",
      "ACCNARRAY.3469|3809.2",
      "Skull #19",
      "ypm:ecatalogue:835577",
    ]);
  });
  it("gets the person who found it", () => {
    expect(
      objectHelpers.getCarriedOutBy(photo, constants.ENCOUNTERED_BY)
    ).toEqual([
      {
        _label: "Collector",
        id: "https://lux-front-tst.collections.yale.edu/data/person/cbe10ead-6035-4dd3-9ce5-4910994b8a43",
        identified_by: [
          {
            classified_as: [
              {
                _label: "Primary Name",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/04468525-e6f3-4aae-9d04-a1cca6b4a2d8",
                type: "Type",
              },
            ],
            content: "John Bell Hatcher",
            language: [
              {
                _label: "French",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/bd559a50-38cd-43a4-94da-b54ae3dec0bb",
                type: "Language",
              },
              {
                _label: "English",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/d735d432-1cdd-460d-ac94-1999bde22f68",
                type: "Language",
              },
              {
                _label: "Portuguese",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/aa47a3fe-ceaf-410d-b8d2-8f4a5ed22a18",
                type: "Language",
              },
              {
                _label: "Dutch",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/3bd83627-fddd-4167-ba2f-b741f2297bb5",
                type: "Language",
              },
            ],
            part: [
              {
                classified_as: [
                  {
                    _label: "First Name",
                    id: "https://lux-front-tst.collections.yale.edu/data/concept/ef2b8dd3-00c6-440b-bc02-b3cdb4d3e721",
                    type: "Type",
                  },
                ],
                content: "John",
                type: "Name",
              },
              {
                classified_as: [
                  {
                    _label: "Middle Name",
                    id: "https://lux-front-tst.collections.yale.edu/data/concept/f557f720-8e7c-47f3-89d5-390ce740a3a5",
                    type: "Type",
                  },
                ],
                content: "Bell",
                type: "Name",
              },
              {
                classified_as: [
                  {
                    _label: "Last Name",
                    id: "https://lux-front-tst.collections.yale.edu/data/concept/a50a5ee1-3852-4077-b592-891bbd258236",
                    type: "Type",
                  },
                ],
                content: "Hatcher",
                type: "Name",
              },
            ],
            type: "Name",
          },
          {
            classified_as: [
              {
                _label: "Primary Name",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/04468525-e6f3-4aae-9d04-a1cca6b4a2d8",
                type: "Type",
              },
            ],
            content: "John B. Hatcher",
            language: [
              {
                _label: "German",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/22641a9b-e7f3-4b18-985b-b0ea6b257584",
                type: "Language",
              },
            ],
            type: "Name",
          },
        ],
        type: "Person",
      },
      {
        _label: "Collector",
        id: "https://lux-front-tst.collections.yale.edu/data/group/a236bcce-e721-4d1a-83f2-fcb233f2f512",
        identified_by: [
          {
            classified_as: [
              {
                _label: "Primary Name",
                id: "https://lux-front-tst.collections.yale.edu/data/concept/04468525-e6f3-4aae-9d04-a1cca6b4a2d8",
                type: "Type",
              },
            ],
            content: "Yale Hatcher 1891 Cretaceous Expedition",
            type: "Name",
          },
        ],
        type: "Group",
      },
    ]);
  });
  it("gets the creation date", () => {
    expect(
      helpers.getFieldPartSubfield(
        photo,
        constants.ENCOUNTERED_BY,
        constants.TIMESPAN
      )
    ).toEqual([
      {
        type: "TimeSpan",
        begin_of_the_begin: "1891-01-01T00:00:00Z",
        end_of_the_end: "1891-12-31T23:59:59Z",
        identified_by: [
          {
            content: "1891",
            type: "Name",
          },
        ],
      },
    ]);
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
    expect(
      objectHelpers.getDigitalImages(photo, {
        requestedClassifications:
          "https://lux-front-tst.collections.yale.edu/data/concept/3a2ed981-70a1-4d7c-a315-b364d4dfc449",
      })
    ).toEqual([]);
  });
  it("gets the descriptions", () => {
    expect(
      helpers.getDescriptions(photo, {
        requestedClassifications:
          "https://lux-front-tst.collections.yale.edu/data/concept/30267c5d-c887-44e4-ac17-3d95f752df6b",
      })
    ).toEqual([
      "Preservation Notes: mounted",
      "Anatomical Notes: skull; femur",
      "Other Attributes: Stratigraphy = Period:Cretaceous, Epoch:Late Cretaceous, Formation:Lance Fm",
      "Identification Notes: Det. Marsh, O. C., 1891. Marsh, Othniel C. 1891. Notice of new vertebrate fossils. American Journal of Science. (3) xlii: 265-269. [p. 266; table p. 266.]",
      "Other Identifications: Triceratops, Torosaurus",
    ]);
  });
});
