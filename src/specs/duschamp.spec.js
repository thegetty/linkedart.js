import * as helpers from "../helpers/LinkedArtHelpers";
import * as objectHelpers from "../helpers/ObjectHelpers";
import duschamp from "../data/mocks/duschamp.json";
import duschamp2 from "../data/mocks/duschamp2.json";

describe("tests the duschamp record", () => {
  it("gets the title", () => {
    expect(helpers.getPrimaryName(duschamp)).toEqual(
      "1 l'intention/2 la crainte/3 désir"
    );
  });
  it("gets the accession #", () => {
    expect(objectHelpers.getAccessionNumbers(duschamp)).toEqual([
      "AM 1997-98 (163)"
    ]);
  });
  it("gets the person who created it", () => {
    expect(objectHelpers.getCarriedOutBy(duschamp)).toEqual([
      "http://data.duchamparchives.org/pma/archive/actor/LCNAF/n80057220"
    ]);
  });
  it("gets the creation date", () => {
    expect(objectHelpers.getProductionTimespans(duschamp)).toEqual([
      {
        begin_of_the_begin: "1912-01-01T00:00:00.000Z",
        end_of_the_end: "1968-01-01T00:00:00.000Z",
        id: "http://data.duchamparchives.org/cp/object/150000000076631/production/timespan",
        label: "1912 - 1968",
        type: "TimeSpan"
      }
    ]);
  });

  it("gets the rights statement", () => {
    expect(objectHelpers.getRightsStatements(duschamp)).toEqual([
      "© Association Marcel Duchamp / Adagp, Paris"
    ]);
  });
  it("gets the copyright statement", () => {
    expect(objectHelpers.getCopyrightStatements(duschamp)).toEqual([]);
  });
  it("gets the dimensions", () => {
    expect(
      objectHelpers.getDimensionsDescriptions(duschamp, {
        requestedClassifications: "aat:300266036"
      })
    ).toEqual(["20 x 15,8 cm"]);
  });
  it("gets the rights assertions", () => {
    expect(objectHelpers.getRightsAssertions(duschamp)).toEqual([]);
  });
  it("gets the digital image", () => {
    expect(objectHelpers.getDigitalImages(duschamp)).toEqual([]);
  });
  it("gets the descriptions", () => {
    expect(helpers.getDescriptions(duschamp)).toEqual([
      'Ensemble de 289 notes originales de Marcel Duchamp. Notes publiées en fac-similé par Paul Matisse dans "Marcel Duchamp, Notes" (Paris, Centre national d\'art et de culture Georges Pompidou, 1980), réparties en 4 sections : "Inframince", "Le Grand Verre", "Projets" et "Jeux de mots".\nentre 1912 et 1968'
    ]);
  });
});

describe("tests the duschamp record(2)", () => {
  it("gets the title", () => {
    expect(helpers.getPrimaryName(duschamp2)).toEqual("50 cc of Paris Air");
  });
  it("gets the accession #", () => {
    expect(objectHelpers.getAccessionNumbers(duschamp2)).toEqual([
      "1950-134-78"
    ]);
  });
  it("gets the person who created it", () => {
    expect(objectHelpers.getCarriedOutBy(duschamp2)).toEqual([
      "http://data.duchamparchives.org/pma/archive/actor/LCNAF/n80057220"
    ]);
  });
  it("gets the creation date", () => {
    expect(objectHelpers.getProductionTimespans(duschamp2)).toEqual([
      {
        begin_of_the_begin: "1919-01-01T00:00:00.000Z",
        end_of_the_end: "1919-01-01T00:00:00.000Z",
        label: "1919",
        type: "TimeSpan"
      }
    ]);
  });

  it("gets the rights statement", () => {
    expect(objectHelpers.getRightsStatements(duschamp2)).toEqual([
      "© Artists Rights Society (ARS), New York / ADAGP, Paris / Succession Marcel Duchamp"
    ]);
  });
  it("gets the copyright statement", () => {
    expect(objectHelpers.getCopyrightStatements(duschamp2)).toEqual([]);
  });
  it("gets the dimensions", () => {
    expect(
      objectHelpers.getDimensionsDescriptions(duschamp2, {
        requestedClassifications: "aat:300266036"
      })
    ).toEqual(["5 1/4 x 2 1/2 inches (13.3 × 6.4 cm)"]);
  });
  it("gets the rights assertions", () => {
    expect(objectHelpers.getRightsAssertions(duschamp2)).toEqual([]);
  });
  it("gets the digital image", () => {
    expect(objectHelpers.getDigitalImages(duschamp2)).toEqual([]);
  });
  it("gets the descriptions", () => {
    expect(helpers.getDescriptions(duschamp2)).toEqual([
      'Duchamp purchased this "empty" ampoule from a pharmacist in Paris as a souvenir for his close friend and patron, Walter C. Arensberg. A vial with nothing in it may be the most insubstantial "work of art" imaginable. From a molecular point of view, air is not considered nothing, but when displayed so carefully in an art museum it seems to be less than one might expect. Its precise meaning was rendered even more unstable in 1949, when the ampoule was accidentally broken and repaired, thus begging the question: Is the air even from Paris anymore?'
    ]);
  });
});
