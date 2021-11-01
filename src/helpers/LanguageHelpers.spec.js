import * as languageHelpers from "./LanguageHelpers";
import titles from "../data/mocks/titles_lanugages.json";
const defaultObj = {
  id: "https://data.getty.edu/museum/collection/object/5be2eb9f-1b4e-49f6-bfc4-0fc7ab67a1c5/name/08d45f65-b135-4c93-a009-ae5587cca9f2",
  type: "Name",
  _label: "Group Title",
  content: "Lirios",
  classified_as: [
    {
      id: "http://vocab.getty.edu/aat/300417193",
      type: "Type",
      _label: "Titles (General, Names)",
    },
    {
      id: "http://vocab.getty.edu/aat/300417227",
      type: "Type",
      _label: "Alternate Title",
    },
    {
      id: "https://data.getty.edu/museum/ontology/linked-data/tms/object/titles/group-title",
      type: "Type",
      _label: "Group Title",
    },
  ],
  language: [
    {
      id: "http://vocab.getty.edu/aat/300389311",
      type: "Language",
      _label: "Spanish (language)",
    },
  ],
};

describe("Language Helpers: normalize language", () => {
  it("Gets all ID's in an object", () => {
    expect(languageHelpers.normalizeLanguageId(undefined)).toEqual(
      languageHelpers.NO_LANGUAGE
    );
  });

  it("leaves the aat value as is", () => {
    expect(
      languageHelpers.normalizeLanguageId(
        "http://vocab.getty.edu/aat/300389311"
      )
    ).toEqual("http://vocab.getty.edu/aat/300389311");
  });

  it("translates english (ISO url)", () => {
    expect(
      languageHelpers.normalizeLanguageId("http://vocab.getty.edu/language/en")
    ).toEqual("http://vocab.getty.edu/aat/300388277");
  });

  it("translates English (iso code)", () => {
    expect(languageHelpers.normalizeLanguageId("en")).toEqual(
      "http://vocab.getty.edu/aat/300388277"
    );
  });

  it("translates English (iso code) with no lookup map", () => {
    expect(languageHelpers.normalizeLanguageId("en", {})).toEqual(
      "http://vocab.getty.edu/aat/300388277"
    );
  });

  it("translates English (with custom mapping)", () => {
    expect(
      languageHelpers.normalizeLanguageId("english", {
        lookupMap: { english: "http://vocab.getty.edu/aat/300388277" },
      })
    ).toEqual("http://vocab.getty.edu/aat/300388277");
  });

  it("returns the orignial English when not matched", () => {
    expect(languageHelpers.normalizeLanguageId("english")).toEqual("english");
  });
});

describe("Language Helpers: get language id", () => {
  let obj = undefined;
  beforeEach(() => {
    obj = JSON.parse(JSON.stringify(defaultObj));
  });
  it("handles nulls", () => {
    expect(languageHelpers.getLanguageId(undefined)).toEqual([
      languageHelpers.NO_LANGUAGE,
    ]);
  });

  it("handles a single language", () => {
    expect(languageHelpers.getLanguageId(obj)).toEqual([
      "http://vocab.getty.edu/aat/300389311",
    ]);
  });

  it("handles two langauges", () => {
    obj.language.push({
      id: "en",
      type: "Language",
      _label: "English (language)",
    });
    expect(languageHelpers.getLanguageId(obj)).toEqual([
      "http://vocab.getty.edu/aat/300389311",
      "http://vocab.getty.edu/aat/300388277",
    ]);
  });

  it("passes through the lookup map", () => {
    obj.language.push({
      id: "english",
      type: "Language",
      _label: "English (language)",
    });
    expect(
      languageHelpers.getLanguageId(obj, {
        lookupMap: { english: "http://vocab.getty.edu/aat/300388277" },
      })
    ).toEqual([
      "http://vocab.getty.edu/aat/300389311",
      "http://vocab.getty.edu/aat/300388277",
    ]);
  });
});
describe("Language Helpers: does language match", () => {
  let obj = undefined;
  beforeEach(() => {
    obj = JSON.parse(JSON.stringify(defaultObj));
  });

  it("deals with no language specified", () => {
    expect(languageHelpers.doesObjectLanguageMatch(obj)).toEqual(true);
  });

  it("deals with English specified aat (spanish data)", () => {
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300388277"
      )
    ).toEqual(false);
  });
  it("does it match english ISO", () => {
    expect(languageHelpers.doesObjectLanguageMatch(obj, "en")).toEqual(false);
  });

  it("does it match spanish iso", () => {
    expect(languageHelpers.doesObjectLanguageMatch(obj, "es")).toEqual(true);
  });

  it("does it match spanish as a string", () => {
    obj.language = "es";
    expect(languageHelpers.doesObjectLanguageMatch(obj, "es")).toEqual(true);
  });

  it("does it match spanish as a string in an array", () => {
    obj.language = ["es"];
    expect(languageHelpers.doesObjectLanguageMatch(obj, "es")).toEqual(true);
  });

  it("Does it match 'spanish aat'", () => {
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300389311"
      )
    ).toEqual(true);
  });
  it("returns true if it is supposted to includeItemsWithNoLanguage (default)", () => {
    obj.language = [];
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300389311",
        { includeItemsWithNoLanguage: true }
      )
    ).toEqual(true);
  });

  it("returns false if it's not supposted to includeItemsWithNoLanguage", () => {
    obj.language = [];
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300389311",
        { includeItemsWithNoLanguage: false }
      )
    ).toEqual(false);
  });

  it("properly falls back when a fallback language is specified", () => {
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300388277",
        { fallbackLanguage: "es" }
      )
    ).toEqual(true);
  });
});

describe("Language Helpers: does language match with broader data", () => {
  let obj = undefined;
  beforeEach(() => {
    obj = titles;
  });

  it("deals with no language specified", () => {
    expect(languageHelpers.doesObjectLanguageMatch(obj)).toEqual(true);
  });

  it("deals with English specified aat", () => {
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300388277"
      )
    ).toEqual(true);
  });
  it("does it match english ISO", () => {
    expect(languageHelpers.doesObjectLanguageMatch(obj, "en")).toEqual(true);
  });

  it("does it match spanish iso", () => {
    expect(languageHelpers.doesObjectLanguageMatch(obj, "es")).toEqual(true);
  });

  it("Does it match 'spanish aat'", () => {
    expect(
      languageHelpers.doesObjectLanguageMatch(
        obj,
        "http://vocab.getty.edu/aat/300389311"
      )
    ).toEqual(true);
  });
});

describe("test language lookup", () => {
  it("looks up ISO from AAT", () => {
    expect(
      languageHelpers.lookupIsoFromAat("http://vocab.getty.edu/aat/300388412")
    ).toEqual("hi");
  });
  it("looks up ISO from AAT (https)", () => {
    expect(
      languageHelpers.lookupIsoFromAat("https://vocab.getty.edu/aat/300388412")
    ).toEqual("hi");
  });
  it("looks up ISO from AAT (bad code)", () => {
    expect(
      languageHelpers.lookupIsoFromAat("http://vocab.getty.edu/aat/3000000")
    ).toEqual(undefined);
  });

  it("looks up ISO from AAT (undefined)", () => {
    expect(languageHelpers.lookupIsoFromAat()).toEqual(undefined);
  });

  it("looks up the AAT from the ISO code", () => {
    expect(languageHelpers.lookupAatFromIso("hi")).toEqual(
      "http://vocab.getty.edu/aat/300388412"
    );
  });
  it("looks up the AAT from the ISO code (undefined)", () => {
    expect(languageHelpers.lookupAatFromIso()).toEqual(undefined);
  });
  it("looks up the AAT from the ISO code (bad code)", () => {
    expect(languageHelpers.lookupAatFromIso("hrk")).toEqual(undefined);
  });
});
