/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convneience helpers for working with linked.art objects
 */

import { normalizeFieldToArray } from "./BasicHelpers";
import * as linkedArtHelpers from "./LinkedArtHelpers";

const DIMENSION = "dimension";
const IDENTIFIED_BY = "identified_by";
const REFERRED_TO_BY = "referred_to_by";

// TODO: remove once aat.json is added
const aat = {
  DIMENSIONS_DESCRIPTION: "http://vocab.getty.edu/aat/300435430",
  ACCESSION_NUMBERS: "http://vocab.getty.edu/aat/300312355",
  WIDTH: "http://vocab.getty.edu/aat/300055647",
  HEIGHT: "http://vocab.getty.edu/aat/300055644",
  DEPTH: "http://vocab.getty.edu/aat/300072633",
  WEIGHT: "http://vocab.getty.edu/aat/300056240",
};

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT dimensions description
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {string} content of AAT dimensions description
 */
export function getDimensionsDescription(
  submittedResource,
  requestedClassification = aat.DIMENSIONS_DESCRIPTION,
  language = undefined,
  languageOptions = {}
) {
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  return linkedArtHelpers.getValueByClassification(
    referredToBy,
    requestedClassification,
    language,
    languageOptions
  );
}

/**
 * 
 * @param {object|array} submittedResource 
 * @param {|array} requestedClassifications -- array of AAT dimensions attributes
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {object} object with dimensions and values
 */
export function getDimensions(
  submittedResource,
  requestedClassifications = [aat.WIDTH, aat.HEIGHT, aat.DEPTH, aat.WEIGHT],
  language = undefined,
  languageOptions = {}
) {
  const dimensionField = normalizeFieldToArray(submittedResource, DIMENSION);
  let dimensions = {};

  requestedClassifications.forEach((classification) => {
    let value = linkedArtHelpers.getValueByClassification(
      dimensionField,
      classification,
      language,
      languageOptions
    );
    if (value) {
      // if there is a value, add it to return object with the AAT preferred term as key
      let key = Object.keys(aat).find((k) => aat[k] === classification);
      dimensions[key] = value;
    }
  });

  return dimensions;
}

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT accession numbers
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {string} content of AAT dimensions description
 */
export function getAccessionNumbers(
  submittedResource,
  requestedClassification = aat.ACCESSION_NUMBERS,
  language = undefined,
  languageOptions = {}
) {
  const identifiedBy = normalizeFieldToArray(submittedResource, IDENTIFIED_BY);

  return linkedArtHelpers.getValueByClassification(
    identifiedBy,
    requestedClassification,
    language,
    languageOptions
  );
}
